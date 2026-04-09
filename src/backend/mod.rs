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
//! | x86/x86_64      | runtime, cached in `AtomicU8` | AVX-512BW > AVX2 > SSSE3 > scalar |
//! | wasm32 (SIMD128)| compile-time     | when `target_feature="simd128"` |
//! | everything else | —                | scalar fallback                 |
//!
//! The inner backend functions work with `MaybeUninit<u8>` output buffers
//! to avoid unnecessary zeroing.

pub mod ct_scalar;
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

/// Dispatch to the detected platform.
///
/// x86 SIMD arms are `unsafe` because the backend functions carry
/// `#[target_feature]`. Safety: [`platform::detect()`] only returns an x86
/// variant after confirming the CPU supports the required feature set.
macro_rules! dispatch {
    (
        scalar: $scalar:expr,
        neon: $neon:expr,
        ssse3: $ssse3:expr,
        avx2: $avx2:expr,
        avx512: $avx512:expr,
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
            Platform::Avx512bw => $avx512,
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
pub fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
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
        scalar: unsafe { scalar::encode::<UPPER>(src, dst, byte_len) },
        neon: unsafe { neon::encode::<UPPER>(src, dst, byte_len) },
        ssse3: unsafe { x86::encode_ssse3::<UPPER>(src, dst, byte_len) },
        avx2: unsafe { x86::encode_avx2::<UPPER>(src, dst, byte_len) },
        avx512: unsafe { x86::encode_avx512::<UPPER>(src, dst, byte_len) },
        wasm: unsafe { wasm::encode::<UPPER>(src, dst, byte_len) },
    );
    Ok(())
}

/// Decode hex `input` into `output`.
///
/// Returns `Ok(())` on success, `Err(InvalidChar { .. })` on the first
/// invalid hex character, or `Err(InvalidLength)` if the buffer sizes
/// are wrong.
#[inline]
pub fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    if input.len() != output.len() * 2 {
        return Err(Error::InvalidLength {
            expected: output.len() * 2,
            got: input.len(),
        });
    }
    let src = input.as_ptr();
    let byte_len = output.len();
    let dst = output.as_mut_ptr().cast::<u8>();
    // SAFETY: `src` and `dst` derived from valid, non-overlapping slice borrows.
    // The length check above guarantees `byte_len = input.len() / 2`, so src
    // is readable for `byte_len * 2` bytes and dst writable for `byte_len`.
    dispatch!(
        scalar: unsafe { scalar::decode(src, dst, byte_len) },
        neon: unsafe { neon::decode(src, dst, byte_len) },
        ssse3: unsafe { x86::decode_ssse3(src, dst, byte_len) },
        avx2: unsafe { x86::decode_avx2(src, dst, byte_len) },
        avx512: unsafe { x86::decode_avx512(src, dst, byte_len) },
        wasm: unsafe { wasm::decode(src, dst, byte_len) },
    )
}

/// Constant-time encode. SIMD encode is already CT (register LUT, no
/// memory-indexed lookups). Only the scalar fallback differs: `ct_scalar`
/// uses branchless arithmetic instead of a lookup table.
///
/// Returns `Err(InvalidLength)` if `output.len() != input.len() * 2`.
#[inline]
pub fn ct_encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    if output.len() != input.len() * 2 {
        return Err(Error::InvalidLength {
            expected: input.len() * 2,
            got: output.len(),
        });
    }
    let byte_len = input.len();
    let src = input.as_ptr();
    let dst = output.as_mut_ptr().cast::<u8>();
    // SAFETY: same as `encode` — valid, non-overlapping slice-derived pointers.
    dispatch!(
        scalar: unsafe { ct_scalar::encode::<UPPER>(src, dst, byte_len) },
        neon: unsafe { neon::encode::<UPPER>(src, dst, byte_len) },
        ssse3: unsafe { x86::encode_ssse3::<UPPER>(src, dst, byte_len) },
        avx2: unsafe { x86::encode_avx2::<UPPER>(src, dst, byte_len) },
        avx512: unsafe { x86::encode_avx512::<UPPER>(src, dst, byte_len) },
        wasm: unsafe { wasm::encode::<UPPER>(src, dst, byte_len) },
    );
    Ok(())
}

/// Constant-time decode. Uses CT SIMD variants (no early return, error
/// accumulation) with `ct_scalar` as the scalar fallback.
/// Returns `Error::InvalidEncoding` (not `InvalidChar`) on failure, or
/// `Err(InvalidLength)` if the buffer sizes are wrong.
#[inline]
pub fn ct_decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    if input.len() != output.len() * 2 {
        return Err(Error::InvalidLength {
            expected: output.len() * 2,
            got: input.len(),
        });
    }
    let byte_len = output.len();
    let src = input.as_ptr();
    let dst = output.as_mut_ptr().cast::<u8>();
    // SAFETY: same as `decode` — valid, non-overlapping slice-derived pointers.
    dispatch!(
        scalar: unsafe { ct_scalar::decode(src, dst, byte_len) },
        neon: unsafe { neon::ct_decode(src, dst, byte_len) },
        ssse3: unsafe { x86::ct_decode_ssse3(src, dst, byte_len) },
        avx2: unsafe { x86::ct_decode_avx2(src, dst, byte_len) },
        avx512: unsafe { x86::ct_decode_avx512(src, dst, byte_len) },
        wasm: unsafe { wasm::ct_decode(src, dst, byte_len) },
    )
}

/// Constant-time check. Uses CT SIMD variants (no early return) with
/// `ct_scalar` as the scalar fallback.
#[inline]
pub fn ct_check(input: &[u8]) -> bool {
    dispatch!(
        scalar: ct_scalar::check(input),
        neon: neon::ct_check(input),
        ssse3: unsafe { x86::ct_check_ssse3(input) },
        avx2: unsafe { x86::ct_check_avx2(input) },
        avx512: unsafe { x86::ct_check_avx512(input) },
        wasm: wasm::ct_check(input),
    )
}

/// Check if every byte in `input` is a valid hex ASCII character.
#[inline]
pub fn check(input: &[u8]) -> bool {
    dispatch!(
        scalar: scalar::check(input),
        neon: neon::check(input),
        ssse3: unsafe { x86::check_ssse3(input) },
        avx2: unsafe { x86::check_avx2(input) },
        avx512: unsafe { x86::check_avx512(input) },
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

    fn scalar_encode<const UPPER: bool>(input: &[u8]) -> alloc::vec::Vec<u8> {
        let mut out = alloc::vec![0u8; input.len() * 2];
        // SAFETY: pointers derived from valid slices with correct lengths.
        unsafe { scalar::encode::<UPPER>(input.as_ptr(), out.as_mut_ptr(), input.len()) };
        out
    }

    /// Exercise a SIMD backend's encode/decode/check against the scalar oracle
    /// for every size in 0..=512.
    pub(crate) fn exercise_backend<EL, EU, D, CD, C, CC>(
        encode_lower: EL,
        encode_upper: EU,
        decode: D,
        ct_decode: CD,
        check: C,
        ct_check: CC,
    ) where
        EL: Fn(&[u8], &mut [MaybeUninit<u8>]),
        EU: Fn(&[u8], &mut [MaybeUninit<u8>]),
        D: Fn(&[u8], &mut [MaybeUninit<u8>]) -> Result<(), Error>,
        CD: Fn(&[u8], &mut [MaybeUninit<u8>]) -> Result<(), Error>,
        C: Fn(&[u8]) -> bool,
        CC: Fn(&[u8]) -> bool,
    {
        for size in 0..=MAX_SIZE {
            let input = make_input(size);
            let hex_len = size * 2;
            let expected_lower = scalar_encode::<false>(&input);
            let expected_upper = scalar_encode::<true>(&input);

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

            // Decode (fast path)
            let mut decoded = alloc::vec![MaybeUninit::uninit(); size];
            decode(&expected_lower, &mut decoded).unwrap_or_else(|e| panic!("decode failed at size {size}: {e}"));
            let dec: alloc::vec::Vec<u8> = decoded.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(dec, input, "decode mismatch at size {size}");

            // Decode (CT path)
            let mut ct_decoded = alloc::vec![MaybeUninit::uninit(); size];
            ct_decode(&expected_lower, &mut ct_decoded)
                .unwrap_or_else(|e| panic!("ct decode failed at size {size}: {e}"));
            let ct_dec: alloc::vec::Vec<u8> = ct_decoded.iter().map(|m| unsafe { m.assume_init() }).collect();
            assert_eq!(ct_dec, input, "ct decode mismatch at size {size}");

            // Check (both paths)
            assert!(check(&expected_lower), "check rejected valid hex at size {size}");
            assert!(ct_check(&expected_lower), "ct_check rejected valid hex at size {size}");

            // Invalid input: inject bad byte and verify error
            if hex_len >= 4 {
                let bad_index = hex_len / 2 + 1; // somewhere in the middle
                let mut invalid = expected_lower.clone();
                invalid[bad_index] = b'G';

                let mut inv_out = alloc::vec![MaybeUninit::uninit(); size];
                assert_eq!(
                    decode(&invalid, &mut inv_out),
                    Err(Error::InvalidChar {
                        byte: b'G',
                        index: bad_index
                    }),
                    "decode wrong error at size {size}"
                );

                let mut inv_ct_out = alloc::vec![MaybeUninit::uninit(); size];
                assert_eq!(
                    ct_decode(&invalid, &mut inv_ct_out),
                    Err(Error::InvalidEncoding),
                    "ct_decode wrong error at size {size}"
                );

                assert!(!check(&invalid), "check accepted invalid hex at size {size}");
                assert!(!ct_check(&invalid), "ct_check accepted invalid hex at size {size}");
            }
        }
    }
}
