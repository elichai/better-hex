//! Backend dispatch layer.
//!
//! Selects the best available backend at compile time (and, for x86, at
//! runtime via [`platform::detect()`]) and exposes a uniform internal API.
//!
//! ## Feature flag
//!
//! `disable-simd` disables all SIMD and always uses the scalar backend.
//!
//! ## Dispatch order
//!
//! | Target          | Detection        | Priority                        |
//! |-----------------|------------------|---------------------------------|
//! | aarch64 (NEON)  | compile-time     | baseline on aarch64             |
//! | x86/x86_64      | runtime, cached in `AtomicU8` | AVX-512 VBMI > AVX-512BW > AVX2 > SSSE3 > scalar |
//! | wasm32 (SIMD128)| compile-time     | when `target_feature="simd128"` |
//! | everything else | —                | scalar fallback                 |
//!
//! The inner backend functions work with `MaybeUninit<u8>` output buffers
//! to avoid unnecessary zeroing.

pub mod scalar;

// Conditionally compile SIMD submodules.
#[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
pub mod neon;

#[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
pub mod x86;

#[cfg(all(not(feature = "disable-simd"), target_arch = "wasm32", target_feature = "simd128"))]
pub mod wasm;

use crate::error::Error;
use crate::platform::{self, Platform};
use core::mem::MaybeUninit;

/// Backend-level decode error (zero-size, no position info).
#[doc(hidden)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct InvalidEncoding;

/// Dispatch to the detected platform.
///
/// x86 SIMD arms are `unsafe` because the backend functions carry
/// `#[target_feature]`. Safety: [`platform::detect()`] only returns an x86
/// variant after confirming the CPU supports the required feature set.
///
/// Three forms:
/// - `avx512bw:` only — both AVX-512 tiers use it (VBMI inherits BW).
/// - `avx512vbmi:` only — VBMI tier uses it, BW tier falls back to `avx2:`.
/// - Both `avx512bw:` and `avx512vbmi:` — each tier gets its own expression.
macro_rules! dispatch {
    // avx512bw only: VBMI inherits the same expression.
    (
        scalar: $scalar:expr,
        neon: $neon:expr,
        ssse3: $ssse3:expr,
        avx2: $avx2:expr,
        avx512bw: $avx512bw:expr,
        wasm: $wasm:expr $(,)?
    ) => {
        dispatch!(
            scalar: $scalar,
            neon: $neon,
            ssse3: $ssse3,
            avx2: $avx2,
            avx512bw: $avx512bw,
            avx512vbmi: $avx512bw,
            wasm: $wasm,
        )
    };
    // avx512vbmi only: BW tier falls back to $avx2.
    (
        scalar: $scalar:expr,
        neon: $neon:expr,
        ssse3: $ssse3:expr,
        avx2: $avx2:expr,
        avx512vbmi: $avx512vbmi:expr,
        wasm: $wasm:expr $(,)?
    ) => {
        dispatch!(
            scalar: $scalar,
            neon: $neon,
            ssse3: $ssse3,
            avx2: $avx2,
            avx512bw: $avx2,
            avx512vbmi: $avx512vbmi,
            wasm: $wasm,
        )
    };
    // Both tiers provided explicitly.
    (
        scalar: $scalar:expr,
        neon: $neon:expr,
        ssse3: $ssse3:expr,
        avx2: $avx2:expr,
        avx512bw: $avx512bw:expr,
        avx512vbmi: $avx512vbmi:expr,
        wasm: $wasm:expr $(,)?
    ) => {
        match platform::detect() {
            Platform::Scalar => $scalar,
            #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
            Platform::Neon => $neon,
            #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
            Platform::Ssse3 => $ssse3,
            #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
            Platform::Avx2 => $avx2,
            #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
            Platform::Avx512bw => $avx512bw,
            #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
            Platform::Avx512vbmi => $avx512vbmi,
            #[cfg(all(not(feature = "disable-simd"), target_arch = "wasm32", target_feature = "simd128"))]
            Platform::Wasm => $wasm,
        }
    };
}

/// Encode `input` bytes as hex into an uninitialized `output` buffer.
///
/// After a successful return, all `output[..input.len() * 2]` elements are
/// initialized with valid hex ASCII bytes.
///
/// Returns `Err(InvalidLength)` if `output.len() != input.len() * 2`.
#[inline]
pub fn encode(input: &[u8], output: &mut [MaybeUninit<u8>], upper: bool) -> Result<(), Error> {
    if output.len() != input.len() * 2 {
        return Err(Error::InvalidLength {
            expected: input.len() * 2,
            got: output.len(),
        });
    }
    let src = input.as_ptr();
    let dst = output.as_mut_ptr().cast::<u8>();
    let byte_len = input.len();
    // SAFETY: `src` and `dst` derived from valid, non-overlapping slice borrows.
    // The length check above guarantees `dst` is writable for `byte_len * 2`
    // bytes. CPU feature requirements are satisfied by `platform::detect()`
    // only returning a variant after confirming support.
    dispatch!(
        scalar: unsafe { scalar::encode(src, dst, byte_len, upper) },
        neon: unsafe { neon::encode(src, dst, byte_len, upper) },
        ssse3: unsafe { x86::encode_ssse3(src, dst, byte_len, upper) },
        avx2: unsafe { x86::encode_avx2(src, dst, byte_len, upper) },
        avx512vbmi: unsafe { x86::encode_avx512(src, dst, byte_len, upper) },
        wasm: unsafe { wasm::encode(src, dst, byte_len, upper) },
    );
    Ok(())
}

/// Decode hex `input` into `output` without checking lengths.
///
/// `pub(crate)` so internal callers (e.g. [`HexStr::decode`]) can reach the
/// raw inner [`Result`] without the [`Error`]-mapping `match` that
/// [`decode`] adds. That match would otherwise be a data-dependent branch
/// (the validity bit lives in the discriminant), and bypassing it lets
/// callers like `HexStr::decode` use `unwrap_unchecked` to give the
/// optimizer enough information to remove the discriminant load entirely.
///
/// Caller must guarantee `input.len() == output.len() * 2` — debug-checked.
///
/// [`HexStr::decode`]: crate::HexStr::decode
#[inline]
pub(crate) fn decode_no_length_check(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), InvalidEncoding> {
    debug_assert_eq!(input.len(), output.len() * 2);
    let src = input.as_ptr();
    let byte_len = output.len();
    let dst = output.as_mut_ptr().cast::<u8>();
    // SAFETY: `src` and `dst` derived from valid, non-overlapping slice borrows.
    // The caller-guaranteed length relationship makes src readable for
    // `byte_len * 2` bytes and dst writable for `byte_len`. CPU feature
    // requirements are satisfied by `platform::detect()` only returning a
    // variant after confirming support.
    dispatch!(
        scalar: unsafe { scalar::decode(src, dst, byte_len) },
        neon: unsafe { neon::decode(src, dst, byte_len) },
        ssse3: unsafe { x86::decode_ssse3(src, dst, byte_len) },
        avx2: unsafe { x86::decode_avx2(src, dst, byte_len) },
        avx512bw: unsafe { x86::decode_avx512(src, dst, byte_len) },
        wasm: unsafe { wasm::decode(src, dst, byte_len) },
    )
}

/// Decode hex `input` into `output`.
///
/// Returns `Ok(())` on success, `Err(InvalidEncoding)` on invalid hex,
/// or `Err(InvalidLength)` if the buffer sizes are wrong.
pub fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    if input.len() != output.len() * 2 {
        return Err(Error::InvalidLength {
            expected: output.len() * 2,
            got: input.len(),
        });
    }
    decode_no_length_check(input, output).map_err(|InvalidEncoding| Error::InvalidEncoding)
}

/// Check if every byte in `input` is a valid hex ASCII character.
#[inline(never)]
pub fn check(input: &[u8]) -> bool {
    dispatch!(
        scalar: scalar::check(input),
        neon: neon::check(input),
        ssse3: unsafe { x86::check_ssse3(input) },
        avx2: unsafe { x86::check_avx2(input) },
        avx512bw: unsafe { x86::check_avx512(input) },
        wasm: wasm::check(input),
    )
}

#[cfg(test)]
#[allow(dead_code)]
pub(crate) mod test_support {
    use super::scalar;
    use crate::error::Error;
    use core::mem::MaybeUninit;

    const MAX_SIZE: usize = 512;

    /// Deterministic input bytes for a given size.
    pub(crate) fn make_input(size: usize) -> alloc::vec::Vec<u8> {
        (0..size)
            .map(|i| ((i as u8).wrapping_mul(37)).wrapping_add(11))
            .collect()
    }

    fn scalar_encode(input: &[u8], upper: bool) -> alloc::vec::Vec<u8> {
        let mut out = alloc::vec![0u8; input.len() * 2];
        // SAFETY: pointers derived from valid slices with correct lengths.
        unsafe { scalar::encode(input.as_ptr(), out.as_mut_ptr(), input.len(), upper) };
        out
    }

    /// Exercise a SIMD backend's encode/decode/check against the scalar oracle
    /// for every size in 0..=512.
    pub(crate) fn exercise_backend<EL, EU, D, C>(encode_lower: EL, encode_upper: EU, decode: D, check: C)
    where
        EL: Fn(&[u8], &mut [MaybeUninit<u8>]),
        EU: Fn(&[u8], &mut [MaybeUninit<u8>]),
        D: Fn(&[u8], &mut [MaybeUninit<u8>]) -> Result<(), Error>,
        C: Fn(&[u8]) -> bool,
    {
        for size in 0..=MAX_SIZE {
            let input = make_input(size);
            let hex_len = size * 2;
            let expected_lower = scalar_encode(&input, false);
            let expected_upper = scalar_encode(&input, true);

            // Encode lower
            let mut lower_out = alloc::vec![MaybeUninit::uninit(); hex_len];
            encode_lower(&input, &mut lower_out);
            let lower: alloc::vec::Vec<u8> = lower_out.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(lower, expected_lower, "lower encode mismatch at size {size}");

            // Encode upper
            let mut upper_out = alloc::vec![MaybeUninit::uninit(); hex_len];
            encode_upper(&input, &mut upper_out);
            let upper: alloc::vec::Vec<u8> = upper_out.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(upper, expected_upper, "upper encode mismatch at size {size}");

            // Decode
            let mut decoded = alloc::vec![MaybeUninit::uninit(); size];
            decode(&expected_lower, &mut decoded).unwrap_or_else(|e| panic!("decode failed at size {size}: {e}"));
            let dec: alloc::vec::Vec<u8> = decoded.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(dec, input, "decode mismatch at size {size}");

            // Check
            assert!(check(&expected_lower), "check rejected valid hex at size {size}");

            // Invalid input: inject bad byte and verify error
            if hex_len >= 4 {
                let bad_index = hex_len / 2 + 1; // somewhere in the middle
                let mut invalid = expected_lower.clone();
                invalid[bad_index] = b'G';

                let mut inv_out = alloc::vec![MaybeUninit::uninit(); size];
                assert_eq!(
                    decode(&invalid, &mut inv_out),
                    Err(Error::InvalidEncoding),
                    "decode wrong error at size {size}"
                );

                assert!(!check(&invalid), "check accepted invalid hex at size {size}");
            }
        }
    }
}

/// SIMD chunk boundary tests — ensures no invalid byte is missed at
/// the transitions between SIMD chunks and scalar tail processing.
#[cfg(test)]
mod boundary_tests {
    extern crate alloc;
    use alloc::vec;
    use alloc::vec::Vec;
    use core::mem::MaybeUninit;

    use super::{check, decode, encode};
    use crate::error::Error;

    /// SIMD chunk boundary sizes: just below, at, and just above the
    /// 16-byte (SSSE3/NEON), 32-byte (AVX2), 64-byte, and 128-byte marks.
    const BOUNDARY_SIZES: [usize; 12] = [15, 16, 17, 31, 32, 33, 63, 64, 65, 127, 128, 129];

    fn make_bytes(size: usize) -> Vec<u8> {
        (0..size).map(|i| (i as u8).wrapping_mul(0x9D)).collect()
    }

    fn encode_hex(input: &[u8]) -> Vec<u8> {
        let mut out = vec![MaybeUninit::uninit(); input.len() * 2];
        encode(input, &mut out, false).expect("encode failed");
        out.iter().map(|m| unsafe { m.assume_init() }).collect()
    }

    #[test]
    fn decode_invalid_byte_at_every_position_boundary_sizes() {
        for &size in &BOUNDARY_SIZES {
            let input = make_bytes(size);
            let hex = encode_hex(&input);
            let hex_len = hex.len();

            // Baseline: valid hex decodes correctly.
            let mut out = vec![MaybeUninit::uninit(); size];
            decode(&hex, &mut out).unwrap_or_else(|e| panic!("decode failed at size {size}: {e}"));
            let decoded: Vec<u8> = out.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(decoded, input, "decode mismatch at size {size}");

            assert!(check(&hex), "check rejected valid hex at size {size}");

            // Inject invalid byte at every position.
            for pos in 0..hex_len {
                let mut bad = hex.clone();
                bad[pos] = b'Z';

                let mut d_out = vec![MaybeUninit::uninit(); size];
                let res = decode(&bad, &mut d_out);
                assert!(res.is_err(), "decode accepted invalid byte at pos {pos} (size {size})");
                assert_eq!(
                    res,
                    Err(Error::InvalidEncoding),
                    "decode wrong error at pos {pos} (size {size})"
                );

                assert!(!check(&bad), "check accepted invalid byte at pos {pos} (size {size})");
            }
        }
    }

    #[test]
    fn encode_decode_roundtrip_boundary_sizes() {
        for &size in &BOUNDARY_SIZES {
            let input = make_bytes(size);
            let hex_len = size * 2;

            // Lower-case roundtrip
            let mut lower = vec![MaybeUninit::uninit(); hex_len];
            encode(&input, &mut lower, false).expect("encode lower failed");
            let lower_hex: Vec<u8> = lower.iter().map(|m| unsafe { m.assume_init() }).collect();
            let mut dec = vec![MaybeUninit::uninit(); size];
            decode(&lower_hex, &mut dec).unwrap_or_else(|e| panic!("roundtrip(lower) failed at {size}: {e}"));
            let result: Vec<u8> = dec.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(result, input, "lower roundtrip mismatch at size {size}");

            // Upper-case roundtrip
            let mut upper = vec![MaybeUninit::uninit(); hex_len];
            encode(&input, &mut upper, true).expect("encode upper failed");
            let upper_hex: Vec<u8> = upper.iter().map(|m| unsafe { m.assume_init() }).collect();
            let mut dec2 = vec![MaybeUninit::uninit(); size];
            decode(&upper_hex, &mut dec2).unwrap_or_else(|e| panic!("roundtrip(upper) failed at {size}: {e}"));
            let result2: Vec<u8> = dec2.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(result2, input, "upper roundtrip mismatch at size {size}");
        }
    }

    /// Test every position in a large input — no assumptions about SIMD
    /// chunk sizes. If the implementation changes its chunk widths, this
    /// test still covers every boundary.
    #[test]
    fn decode_invalid_at_every_position_large() {
        const DECODED_LEN: usize = 256;
        const HEX_LEN: usize = DECODED_LEN * 2;

        let input = make_bytes(DECODED_LEN);
        let hex = encode_hex(&input);
        assert_eq!(hex.len(), HEX_LEN);

        for pos in 0..HEX_LEN {
            let mut bad = hex.clone();
            bad[pos] = b'Z';

            let mut d_out = vec![MaybeUninit::uninit(); DECODED_LEN];
            let res = decode(&bad, &mut d_out);
            assert!(res.is_err(), "decode missed invalid byte at pos {pos}");
            assert_eq!(res, Err(Error::InvalidEncoding), "decode wrong error at pos {pos}");

            assert!(!check(&bad), "check missed invalid byte at pos {pos}");
        }
    }
}
