//! x86 SSSE3/AVX2 hex backend.
//!
//! # Encoding
//!
//! Uses the `pshufb` (`_mm_shuffle_epi8`) instruction as a parallel 4-bit LUT
//! lookup. A 16-byte register holds the hex alphabet (`0-9a-f` or `0-9A-F`),
//! and nibbles extracted from input bytes serve as shuffle indices.
//!
//! **SSSE3 path** — processes 16 input bytes → 32 hex chars per iteration:
//! 1. Load a 16-byte chunk.
//! 2. Split each byte into high nibble (`>> 4 & 0x0F`) and low nibble (`& 0x0F`).
//! 3. `pshufb(lut, nibble)` maps each nibble to its hex character.
//! 4. `punpcklbw` / `punpckhbw` interleave high-then-low for correct ordering.
//! 5. Store 32 bytes.
//!
//! **AVX2 path** — processes 32 input bytes → 64 hex chars per iteration, same
//! algorithm but 256-bit. After `vpunpcklbw`/`vpunpckhbw`, a
//! `vperm2i128` fixup is needed because AVX2 unpack operates within
//! 128-bit lanes.
//!
//! # Decoding (Lemire 2023)
//!
//! Based on Daniel Lemire's SIMD hex decoding described in:
//! <https://lemire.me/blog/2023/12/22/fast-hexadecimal-decoding/>
//!
//! The key insight is to subtract 1 from each byte, then use the high nibble
//! of the result as a hash key into two `pshufb` lookup tables:
//!
//! - **`delta_check`**: adds a bias such that valid hex chars end up with
//!   MSB clear, invalid chars get MSB set → `pmovmskb` detects errors.
//! - **`delta_rebase`**: adds a bias that converts the char directly to its
//!   nibble value (0–15).
//!
//! After validation, `pmaddubsw` with `{1, 16}` packs adjacent nibble pairs
//! into bytes, and `packuswb` compresses 16-bit words back to bytes.
//!
//! # Check
//!
//! Reuses the Lemire `delta_check` validation table from the decode path:
//! for each 16-byte chunk, compute the check value and verify
//! `pmovmskb == 0` (all MSBs clear means all chars valid). Falls back to
//! scalar for the sub-16-byte tail.

#[cfg(target_arch = "x86")]
use core::arch::x86::*;
#[cfg(target_arch = "x86_64")]
use core::arch::x86_64::*;

use crate::backend::ct_scalar;
use crate::backend::scalar;
use crate::error::Error;
use core::mem::MaybeUninit;

/// Hex-encode `input` into `output` using SSSE3 `pshufb` for the hot loop.
///
/// Processes 16 input bytes (→ 32 hex chars) per iteration, then delegates
/// any remaining tail bytes to the scalar backend.
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn encode_ssse3<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2, "output buffer wrong size for encode");

    // SAFETY: all intrinsics below require SSSE3, guaranteed by #[target_feature].
    // Pointer arithmetic is safe because we stay within the bounds checked by
    // `simd_end` (rounded down to a multiple of 16).
    unsafe {
        let lut = if UPPER {
            _mm_loadu_si128(b"0123456789ABCDEF".as_ptr().cast())
        } else {
            _mm_loadu_si128(b"0123456789abcdef".as_ptr().cast())
        };
        let mask_lo = _mm_set1_epi8(0x0F);

        let mut i = 0usize;
        let simd_end = input.len() & !15; // round down to multiple of 16

        while i < simd_end {
            let chunk = _mm_loadu_si128(input.as_ptr().add(i).cast());

            // Split nibbles.
            let lo = _mm_and_si128(chunk, mask_lo);
            let hi = _mm_and_si128(_mm_srli_epi16(chunk, 4), mask_lo);

            // LUT lookup: convert nibbles to hex ASCII.
            let hex_lo = _mm_shuffle_epi8(lut, lo);
            let hex_hi = _mm_shuffle_epi8(lut, hi);

            // Interleave: high nibble char first, then low nibble char.
            let out0 = _mm_unpacklo_epi8(hex_hi, hex_lo);
            let out1 = _mm_unpackhi_epi8(hex_hi, hex_lo);

            // Store 32 bytes (two __m128i).
            let out_ptr = output.as_mut_ptr().add(i * 2).cast::<__m128i>();
            _mm_storeu_si128(out_ptr, out0);
            _mm_storeu_si128(out_ptr.add(1), out1);

            i += 16;
        }

        // Scalar tail.
        if i < input.len() {
            let input_tail = unsafe { input.get_unchecked(i..) };
            let output_tail = unsafe { output.get_unchecked_mut(i * 2..) };
            scalar::encode::<UPPER>(input_tail, output_tail);
        }
    }
}

/// Hex-encode `input` into `output` using AVX2 for the hot loop.
///
/// Processes 32 input bytes (→ 64 hex chars) per iteration, then falls
/// through to [`encode_ssse3`] for the 16–31 byte middle range, and finally
/// to scalar for the sub-16-byte tail.
///
/// ## Cross-lane fixup
///
/// AVX2 `vpunpcklbw`/`vpunpckhbw` operate independently on each 128-bit
/// lane, producing an interleaving that is correct *within* each lane but
/// in the wrong lane order. `vperm2i128` with imm8 = `0x20` (lo-lo) and
/// `0x31` (hi-hi) reassembles the two halves correctly.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[target_feature(enable = "avx2")]
pub(crate) unsafe fn encode_avx2<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2, "output buffer wrong size for encode");

    // SAFETY: all intrinsics below require AVX2, guaranteed by #[target_feature].
    unsafe {
        let lut = if UPPER {
            _mm256_broadcastsi128_si256(_mm_loadu_si128(b"0123456789ABCDEF".as_ptr().cast()))
        } else {
            _mm256_broadcastsi128_si256(_mm_loadu_si128(b"0123456789abcdef".as_ptr().cast()))
        };
        let mask_lo = _mm256_set1_epi8(0x0F);

        let mut i = 0usize;
        let simd_end = input.len() & !31; // round down to multiple of 32

        while i < simd_end {
            let chunk = _mm256_loadu_si256(input.as_ptr().add(i).cast());

            // Split nibbles.
            let lo = _mm256_and_si256(chunk, mask_lo);
            let hi = _mm256_and_si256(_mm256_srli_epi16(chunk, 4), mask_lo);

            // LUT lookup.
            let hex_lo = _mm256_shuffle_epi8(lut, lo);
            let hex_hi = _mm256_shuffle_epi8(lut, hi);

            // Interleave within lanes.
            let interleaved_lo = _mm256_unpacklo_epi8(hex_hi, hex_lo);
            let interleaved_hi = _mm256_unpackhi_epi8(hex_hi, hex_lo);

            // Cross-lane fixup: reassemble the correct byte order.
            // interleaved_lo has: [lane0_lo_interleave | lane1_lo_interleave]
            // interleaved_hi has: [lane0_hi_interleave | lane1_hi_interleave]
            // We need: [lane0_lo | lane0_hi] then [lane1_lo | lane1_hi]
            let out0 = _mm256_permute2x128_si256(interleaved_lo, interleaved_hi, 0x20);
            let out1 = _mm256_permute2x128_si256(interleaved_lo, interleaved_hi, 0x31);

            // Store 64 bytes (two __m256i).
            let out_ptr = output.as_mut_ptr().add(i * 2).cast::<__m256i>();
            _mm256_storeu_si256(out_ptr, out0);
            _mm256_storeu_si256(out_ptr.add(1), out1);

            i += 32;
        }

        // Tail: fall through to SSSE3 for any remaining 16+ bytes, then scalar.
        if i < input.len() {
            let input_tail = unsafe { input.get_unchecked(i..) };
            let output_tail = unsafe { output.get_unchecked_mut(i * 2..) };
            encode_ssse3::<UPPER>(input_tail, output_tail);
        }
    }
}

/// Build the `delta_check` table for the Lemire SSSE3 hex-decode algorithm.
///
/// Given a byte `v` from the hex input, we compute `vm1 = v - 1` and use
/// `(vm1 >> 4) & 0x0F` as a hash key into this table. Adding the looked-up
/// delta to `vm1` yields a value whose MSB is clear for valid hex characters
/// and set for invalid ones.
///
/// The table entries are derived by analyzing which `vm1 >> 4` buckets the
/// three valid hex ranges (`'0'-'9'`, `'A'-'F'`, `'a'-'f'`) hash into after
/// the subtract-one step, then choosing constants that place valid chars in
/// the non-negative (MSB-clear) range of signed i8 arithmetic.
#[target_feature(enable = "ssse3")]
unsafe fn decode_delta_check_128() -> __m128i {
    _mm_setr_epi8(
        -16,  // hash 0
        -32,  // hash 1
        -47,  // hash 2 — unused bucket, set to reject
        71,   // hash 3 — digits '0'-'9' map here (vm1 = 0x2F..0x38)
        58,   // hash 4 — uppercase 'A'-'F' (vm1 = 0x40..0x45)
        -96,  // hash 5
        26,   // hash 6 — lowercase 'a'-'f' (vm1 = 0x60..0x65)
        -128, // hash 7
        0, 0, 0, 0, 0, 0, 0, 0,
    )
}

/// Build the `delta_rebase` table for the Lemire SSSE3 hex-decode algorithm.
///
/// After the same hashing step as [`decode_delta_check_128`], adding this
/// table's value to `vm1` yields the actual nibble value (0–15) for valid
/// hex characters.
///
/// - Digits `'0'-'9'`: `vm1` is `0x2F..0x38`, we need result `0..9`,
///   so delta = `-(0x30 - 1)` = `-47` = `-48 + 1`.
/// - Uppercase `'A'-'F'`: `vm1` is `0x40..0x45`, we need `10..15`,
///   so delta = `-(0x41 - 1) + 10` = `-54` = `-55 + 1`.
/// - Lowercase `'a'-'f'`: `vm1` is `0x60..0x65`, we need `10..15`,
///   so delta = `-(0x61 - 1) + 10` = `-86` = `-87 + 1`.
#[target_feature(enable = "ssse3")]
unsafe fn decode_delta_rebase_128() -> __m128i {
    _mm_setr_epi8(
        0,
        0,
        -48 + 1, // hash 2: digits '0'-'7' (vm1 high nibble = 2)
        -48 + 1, // hash 3: digits '8'-'9' (vm1 high nibble = 3)
        -55 + 1, // hash 4: uppercase 'A'-'F'
        0,
        -87 + 1, // hash 6: lowercase 'a'-'f'
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    )
}

/// Decode a single 128-bit register (16 hex chars → 8 output bytes) using
/// the Lemire algorithm. Returns `(packed_bytes, check_vector)`.
///
/// The `check_vector` has MSB set in each lane where the input byte was
/// invalid. Callers should OR multiple check vectors together and do a
/// single `_mm_movemask_epi8` at the end — this halves the number of
/// expensive horizontal-reduce operations per iteration.
///
/// # Safety
///
/// Caller must ensure SSSE3 is available.
#[inline]
#[target_feature(enable = "ssse3")]
unsafe fn decode_chunk_128(
    chunk: __m128i,
    delta_check: __m128i,
    delta_rebase: __m128i,
    one: __m128i,
    mask_hi: __m128i,
    weights: __m128i,
) -> (__m128i, __m128i) {
    let vm1 = _mm_sub_epi8(chunk, one);
    let hash_key = _mm_and_si128(_mm_srli_epi16(vm1, 4), mask_hi);

    // check has MSB set for invalid bytes.
    let check = _mm_add_epi8(vm1, _mm_shuffle_epi8(delta_check, hash_key));
    let nibbles = _mm_add_epi8(vm1, _mm_shuffle_epi8(delta_rebase, hash_key));

    // Pack nibble pairs: hi*16 + lo via pmaddubsw, then narrow to u8.
    let packed16 = _mm_maddubs_epi16(nibbles, weights);
    let packed8 = _mm_packus_epi16(packed16, packed16);

    (packed8, check)
}

/// Hex-decode `input` into `output` using SSSE3.
///
/// Processes 32 hex chars (two `__m128i` loads → 16 output bytes) per
/// iteration. When `SHORT_CIRCUIT` is true, falls back to scalar on the first
/// invalid chunk for precise error reporting. When `SHORT_CIRCUIT` is false,
/// processes the entire input without branching on validity (constant-time),
/// then returns an error if any invalid byte was detected.
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[inline]
#[target_feature(enable = "ssse3")]
unsafe fn decode_ssse3_inner<const SHORT_CIRCUIT: bool>(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2, "output buffer wrong size for decode");
    debug_assert!(input.len() % 2 == 0, "input length must be even");

    // SAFETY: all intrinsics below require SSSE3, guaranteed by #[target_feature].
    unsafe {
        let delta_check = decode_delta_check_128();
        let delta_rebase = decode_delta_rebase_128();
        // Hoist constants out of the loop.
        let one = _mm_set1_epi8(1);
        let mask_hi = _mm_set1_epi8(0x0F);
        let weights = _mm_set1_epi16(0x0110);

        let mut i = 0usize;
        let mut o = 0usize;
        let mut err_accum = 0i32;
        let simd_end = input.len() & !31;

        while i < simd_end {
            let chunk0 = _mm_loadu_si128(input.as_ptr().add(i).cast());
            let chunk1 = _mm_loadu_si128(input.as_ptr().add(i + 16).cast());

            let (decoded0, check0) = decode_chunk_128(chunk0, delta_check, delta_rebase, one, mask_hi, weights);
            let (decoded1, check1) = decode_chunk_128(chunk1, delta_check, delta_rebase, one, mask_hi, weights);

            // Fuse: OR check vectors first, then a single movemask.
            // This halves the number of movemask operations per iteration.
            let combined_check = _mm_or_si128(check0, check1);
            let mask = _mm_movemask_epi8(combined_check);

            if SHORT_CIRCUIT {
                if mask != 0 {
                    return scalar::decode(input, output);
                }
            } else {
                err_accum |= mask;
            }

            _mm_storel_epi64(output.as_mut_ptr().add(o).cast(), decoded0);
            _mm_storel_epi64(output.as_mut_ptr().add(o + 8).cast(), decoded1);

            i += 32;
            o += 16;
        }

        if i < input.len() {
            let input_tail = unsafe { input.get_unchecked(i..) };
            let output_tail = unsafe { output.get_unchecked_mut(o..) };
            if SHORT_CIRCUIT {
                scalar::decode(input_tail, output_tail).map_err(|e| match e {
                    Error::InvalidChar { byte, index } => Error::InvalidChar { byte, index: index + i },
                    other => other,
                })?;
            } else {
                if ct_scalar::decode(input_tail, output_tail).is_err() {
                    err_accum |= 1;
                }
            }
        }

        if !SHORT_CIRCUIT && err_accum != 0 {
            return Err(Error::InvalidEncoding);
        }

        Ok(())
    }
}

/// Hex-decode `input` into `output` using SSSE3.
///
/// On validation failure, falls back to scalar for precise error position.
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[inline]
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn decode_ssse3(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    // SAFETY: caller guarantees SSSE3.
    unsafe { decode_ssse3_inner::<true>(input, output) }
}

/// Constant-time hex-decode `input` into `output` using SSSE3.
///
/// Processes all chunks without short-circuiting on invalid input.
/// Returns `Err(Error::InvalidEncoding)` if any byte was invalid.
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[inline]
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn ct_decode_ssse3(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    // SAFETY: caller guarantees SSSE3.
    unsafe { decode_ssse3_inner::<false>(input, output) }
}

/// Decode a single 256-bit register (32 hex chars → 16 output bytes) using
/// the Lemire algorithm, AVX2 variant.
///
/// Same as [`decode_chunk_128`] but for 256-bit AVX2 registers.
/// Returns `(packed_bytes, check_vector)`. The `packed_bytes` has the 16
/// decoded bytes after a lane-crossing permute fixup. Caller ORs check
/// vectors then does a single `_mm256_movemask_epi8`.
///
/// # Safety
///
/// Caller must ensure AVX2 is available.
#[inline]
#[target_feature(enable = "avx2")]
unsafe fn decode_chunk_256(
    chunk: __m256i,
    delta_check: __m256i,
    delta_rebase: __m256i,
    one: __m256i,
    mask_hi: __m256i,
    weights: __m256i,
) -> (__m256i, __m256i) {
    let vm1 = _mm256_sub_epi8(chunk, one);
    let hash_key = _mm256_and_si256(_mm256_srli_epi16(vm1, 4), mask_hi);

    let check = _mm256_add_epi8(vm1, _mm256_shuffle_epi8(delta_check, hash_key));
    let nibbles = _mm256_add_epi8(vm1, _mm256_shuffle_epi8(delta_rebase, hash_key));

    let packed16 = _mm256_maddubs_epi16(nibbles, weights);
    let packed8 = _mm256_packus_epi16(packed16, packed16);
    // Fix cross-lane ordering from packuswb.
    let result = _mm256_permute4x64_epi64(packed8, 0b_11_01_10_00);

    (result, check)
}

/// Hex-decode `input` into `output` using AVX2.
///
/// Processes 64 hex chars (two `__m256i` loads → 32 output bytes) per
/// iteration. When `SHORT_CIRCUIT` is true, falls back to scalar on the first
/// invalid chunk. When `SHORT_CIRCUIT` is false, processes all chunks without
/// branching on validity (constant-time).
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[inline]
#[target_feature(enable = "avx2")]
unsafe fn decode_avx2_inner<const SHORT_CIRCUIT: bool>(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2, "output buffer wrong size for decode");
    debug_assert!(input.len() % 2 == 0, "input length must be even");

    // SAFETY: all intrinsics below require AVX2 (implies SSSE3),
    // guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm256_broadcastsi128_si256(decode_delta_check_128());
        let delta_rebase = _mm256_broadcastsi128_si256(decode_delta_rebase_128());
        let one = _mm256_set1_epi8(1);
        let mask_hi = _mm256_set1_epi8(0x0F);
        let weights = _mm256_set1_epi16(0x0110);

        let mut i = 0usize;
        let mut o = 0usize;
        let mut err_accum = 0i32;
        let simd_end = input.len() & !63;

        while i < simd_end {
            let chunk0 = _mm256_loadu_si256(input.as_ptr().add(i).cast());
            let chunk1 = _mm256_loadu_si256(input.as_ptr().add(i + 32).cast());

            let (decoded0, check0) = decode_chunk_256(chunk0, delta_check, delta_rebase, one, mask_hi, weights);
            let (decoded1, check1) = decode_chunk_256(chunk1, delta_check, delta_rebase, one, mask_hi, weights);

            let combined_check = _mm256_or_si256(check0, check1);
            let mask = _mm256_movemask_epi8(combined_check);

            if SHORT_CIRCUIT {
                if mask != 0 {
                    return scalar::decode(input, output);
                }
            } else {
                err_accum |= mask;
            }

            // Store low 16 bytes of each decoded __m256i.
            let out_ptr = output.as_mut_ptr().add(o);
            _mm_storeu_si128(out_ptr.cast(), _mm256_castsi256_si128(decoded0));
            _mm_storeu_si128(out_ptr.add(16).cast(), _mm256_castsi256_si128(decoded1));

            i += 64;
            o += 32;
        }

        // Tail: fall through to SSSE3, then scalar.
        if i < input.len() {
            let input_tail = unsafe { input.get_unchecked(i..) };
            let output_tail = unsafe { output.get_unchecked_mut(o..) };
            if SHORT_CIRCUIT {
                decode_ssse3(input_tail, output_tail).map_err(|e| match e {
                    Error::InvalidChar { byte, index } => Error::InvalidChar { byte, index: index + i },
                    other => other,
                })?;
            } else {
                if ct_decode_ssse3(input_tail, output_tail).is_err() {
                    err_accum |= 1;
                }
            }
        }

        if !SHORT_CIRCUIT && err_accum != 0 {
            return Err(Error::InvalidEncoding);
        }

        Ok(())
    }
}

/// Hex-decode `input` into `output` using AVX2.
///
/// Falls through to [`decode_ssse3`] for the tail. On validation failure,
/// falls back to scalar for precise error position.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[inline]
#[target_feature(enable = "avx2")]
pub(crate) unsafe fn decode_avx2(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    // SAFETY: caller guarantees AVX2.
    unsafe { decode_avx2_inner::<true>(input, output) }
}

/// Constant-time hex-decode `input` into `output` using AVX2.
///
/// Processes all chunks without short-circuiting on invalid input.
/// Falls through to [`ct_decode_ssse3`] for the tail.
/// Returns `Err(Error::InvalidEncoding)` if any byte was invalid.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[inline]
#[target_feature(enable = "avx2")]
pub(crate) unsafe fn ct_decode_avx2(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    // SAFETY: caller guarantees AVX2.
    unsafe { decode_avx2_inner::<false>(input, output) }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using SSSE3 SIMD.
///
/// Reuses the Lemire `delta_check` validation from the decode path: for
/// each 16-byte chunk, computes `vm1 + shuffle(delta_check, hash_key)` and
/// checks that `pmovmskb == 0` (all MSBs clear ⇒ all chars valid).
/// Falls back to scalar for the sub-16-byte tail.
///
/// When `SHORT_CIRCUIT` is true, returns `false` immediately on the first
/// invalid chunk. When `SHORT_CIRCUIT` is false, accumulates validity across
/// all chunks without early exit (constant-time).
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[inline]
#[target_feature(enable = "ssse3")]
unsafe fn check_ssse3_inner<const SHORT_CIRCUIT: bool>(input: &[u8]) -> bool {
    // SAFETY: all intrinsics below require SSSE3, guaranteed by #[target_feature].
    unsafe {
        let delta_check = decode_delta_check_128();
        let one = _mm_set1_epi8(1);
        let mask_hi = _mm_set1_epi8(0x0F);

        let mut i = 0usize;
        let mut all_valid = true;
        let simd_end = input.len() & !15;

        while i < simd_end {
            let chunk = _mm_loadu_si128(input.as_ptr().add(i).cast());

            let vm1 = _mm_sub_epi8(chunk, one);
            let hash_key = _mm_and_si128(_mm_srli_epi16(vm1, 4), mask_hi);
            let check = _mm_add_epi8(vm1, _mm_shuffle_epi8(delta_check, hash_key));

            if SHORT_CIRCUIT {
                if _mm_movemask_epi8(check) != 0 {
                    return false;
                }
            } else {
                all_valid &= _mm_movemask_epi8(check) == 0;
            }

            i += 16;
        }

        // Tail.
        let input_tail = unsafe { input.get_unchecked(i..) };
        let tail_valid = if SHORT_CIRCUIT {
            scalar::check(input_tail)
        } else {
            ct_scalar::check(input_tail)
        };

        all_valid & tail_valid
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using SSSE3 SIMD.
///
/// Returns `false` immediately upon encountering the first invalid chunk.
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[inline]
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn check_ssse3(input: &[u8]) -> bool {
    // SAFETY: caller guarantees SSSE3.
    unsafe { check_ssse3_inner::<true>(input) }
}

/// Constant-time check whether every byte in `input` is a valid hex ASCII
/// character, using SSSE3 SIMD.
///
/// Processes all chunks without short-circuiting on invalid input.
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[inline]
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn ct_check_ssse3(input: &[u8]) -> bool {
    // SAFETY: caller guarantees SSSE3.
    unsafe { check_ssse3_inner::<false>(input) }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX2 SIMD.
///
/// Reuses the Lemire `delta_check` validation from the decode path: for
/// each 32-byte chunk, broadcasts the 128-bit delta_check table to 256 bits
/// and computes `vm1 + shuffle(delta_check, hash_key)`, checking that
/// `_mm256_movemask_epi8 == 0` (all MSBs clear ⇒ all chars valid).
/// Falls back to `check_ssse3` / `ct_check_ssse3` for the sub-32-byte tail.
///
/// When `SHORT_CIRCUIT` is true, returns `false` immediately on the first
/// invalid chunk. When `SHORT_CIRCUIT` is false, accumulates validity across
/// all chunks without early exit (constant-time).
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[inline]
#[target_feature(enable = "avx2")]
unsafe fn check_avx2_inner<const SHORT_CIRCUIT: bool>(input: &[u8]) -> bool {
    // SAFETY: all intrinsics below require AVX2, guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm256_broadcastsi128_si256(decode_delta_check_128());
        let one = _mm256_set1_epi8(1);
        let mask_hi = _mm256_set1_epi8(0x0F);

        let mut i = 0usize;
        let mut err_accum = 0i32;
        let simd_end = input.len() & !31;

        while i < simd_end {
            let chunk = _mm256_loadu_si256(input.as_ptr().add(i).cast());

            let vm1 = _mm256_sub_epi8(chunk, one);
            let hash_key = _mm256_and_si256(_mm256_srli_epi16(vm1, 4), mask_hi);
            let check = _mm256_add_epi8(vm1, _mm256_shuffle_epi8(delta_check, hash_key));

            let mask = _mm256_movemask_epi8(check);
            if SHORT_CIRCUIT {
                if mask != 0 {
                    return false;
                }
            } else {
                err_accum |= mask;
            }

            i += 32;
        }

        // Tail: fall through to SSSE3/scalar.
        let input_tail = unsafe { input.get_unchecked(i..) };
        let tail_valid = if SHORT_CIRCUIT {
            check_ssse3(input_tail)
        } else {
            ct_check_ssse3(input_tail)
        };

        if SHORT_CIRCUIT {
            tail_valid
        } else {
            (err_accum == 0) & tail_valid
        }
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX2 SIMD.
///
/// Returns `false` immediately upon encountering the first invalid chunk.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[inline]
#[target_feature(enable = "avx2")]
pub(crate) unsafe fn check_avx2(input: &[u8]) -> bool {
    // SAFETY: caller guarantees AVX2.
    unsafe { check_avx2_inner::<true>(input) }
}

/// Constant-time check whether every byte in `input` is a valid hex ASCII
/// character, using AVX2 SIMD.
///
/// Processes all chunks without short-circuiting on invalid input.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[inline]
#[target_feature(enable = "avx2")]
pub(crate) unsafe fn ct_check_avx2(input: &[u8]) -> bool {
    // SAFETY: caller guarantees AVX2.
    unsafe { check_avx2_inner::<false>(input) }
}

/// Hex-encode `input` into `output` using AVX-512BW for the hot loop.
///
/// Processes 64 input bytes (→ 128 hex chars) per iteration, then falls
/// through to [`encode_avx2`] for the 32–63 byte middle range, and finally
/// down through SSSE3/scalar for smaller tails.
///
/// ## Cross-lane fixup
///
/// AVX-512 `vpunpcklbw`/`vpunpckhbw` operate independently on each 128-bit
/// lane (four lanes in a 512-bit register), producing an interleaving that is
/// correct *within* each lane but in the wrong lane order.
/// `vpermq` (`_mm512_permutexvar_epi64`) with indices `[0,4,1,5,2,6,3,7]`
/// reassembles the four lanes correctly (same idea as AVX2's `vperm2i128`
/// but generalized for 4 lanes).
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn encode_avx512<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2, "output buffer wrong size for encode");

    // SAFETY: all intrinsics below require AVX-512BW (implies AVX-512F),
    // guaranteed by #[target_feature].
    unsafe {
        let lut = {
            let lut128 = if UPPER {
                _mm_loadu_si128(b"0123456789ABCDEF".as_ptr().cast())
            } else {
                _mm_loadu_si128(b"0123456789abcdef".as_ptr().cast())
            };
            _mm512_broadcast_i32x4(lut128)
        };
        let mask_lo = _mm512_set1_epi8(0x0F);
        // Cross-lane fixup permutation: [0,4,1,5,2,6,3,7] as qword indices.
        let perm_idx = _mm512_setr_epi64(0, 4, 1, 5, 2, 6, 3, 7);

        let mut i = 0usize;
        let simd_end = input.len() & !63; // round down to multiple of 64

        while i < simd_end {
            let chunk = _mm512_loadu_si512(input.as_ptr().add(i).cast());

            // Split nibbles.
            let lo = _mm512_and_si512(chunk, mask_lo);
            let hi = _mm512_and_si512(_mm512_srli_epi16(chunk, 4), mask_lo);

            // LUT lookup.
            let hex_lo = _mm512_shuffle_epi8(lut, lo);
            let hex_hi = _mm512_shuffle_epi8(lut, hi);

            // Interleave within 128-bit lanes.
            let interleaved_lo = _mm512_unpacklo_epi8(hex_hi, hex_lo);
            let interleaved_hi = _mm512_unpackhi_epi8(hex_hi, hex_lo);

            // Cross-lane fixup: reassemble the correct byte order.
            let out0 = _mm512_permutexvar_epi64(perm_idx, interleaved_lo);
            let out1 = _mm512_permutexvar_epi64(perm_idx, interleaved_hi);

            // Store 128 bytes (two __m512i).
            let out_ptr = output.as_mut_ptr().add(i * 2).cast::<__m512i>();
            _mm512_storeu_si512(out_ptr.cast(), out0);
            _mm512_storeu_si512(out_ptr.add(1).cast(), out1);

            i += 64;
        }

        // Tail: fall through to AVX2 for any remaining 32+ bytes, then SSSE3, then scalar.
        if i < input.len() {
            let input_tail = unsafe { input.get_unchecked(i..) };
            let output_tail = unsafe { output.get_unchecked_mut(i * 2..) };
            encode_avx2::<UPPER>(input_tail, output_tail);
        }
    }
}

/// Decode a single 512-bit register (64 hex chars → 32 output bytes) using
/// the Lemire algorithm, AVX-512BW variant.
///
/// Returns `(packed_bytes, mask)` where `mask` is a `u64` bitmask from
/// `_mm512_movepi8_mask` — one bit per byte, set if that byte was invalid.
/// Callers OR multiple masks together, then branch once.
///
/// # Safety
///
/// Caller must ensure AVX-512BW is available.
#[inline]
#[target_feature(enable = "avx512bw")]
unsafe fn decode_chunk_512(
    chunk: __m512i,
    delta_check: __m512i,
    delta_rebase: __m512i,
    one: __m512i,
    mask_hi: __m512i,
    weights: __m512i,
    perm_idx: __m512i,
) -> (__m512i, u64) {
    let vm1 = _mm512_sub_epi8(chunk, one);
    let hash_key = _mm512_and_si512(_mm512_srli_epi16(vm1, 4), mask_hi);

    let check = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_check, hash_key));
    let nibbles = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_rebase, hash_key));

    // movepi8_mask: one bit per byte, set if MSB is set (invalid).
    let mask = _mm512_movepi8_mask(check);

    // Pack nibble pairs: hi*16 + lo via pmaddubsw, then narrow to u8.
    let packed16 = _mm512_maddubs_epi16(nibbles, weights);
    let packed8 = _mm512_packus_epi16(packed16, packed16);
    // Fix cross-lane ordering from packuswb.
    let result = _mm512_permutexvar_epi64(perm_idx, packed8);

    (result, mask)
}

/// Hex-decode `input` into `output` using AVX-512BW.
///
/// Processes 128 hex chars (two `__m512i` loads → 64 output bytes) per
/// iteration. When `SHORT_CIRCUIT` is true, falls back to scalar on the first
/// invalid chunk. When `SHORT_CIRCUIT` is false, processes all chunks without
/// branching on validity (constant-time).
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[inline]
#[target_feature(enable = "avx512bw")]
unsafe fn decode_avx512_inner<const SHORT_CIRCUIT: bool>(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2, "output buffer wrong size for decode");
    debug_assert!(input.len() % 2 == 0, "input length must be even");

    // SAFETY: all intrinsics below require AVX-512BW (implies AVX-512F),
    // guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm512_broadcast_i32x4(decode_delta_check_128());
        let delta_rebase = _mm512_broadcast_i32x4(decode_delta_rebase_128());
        let one = _mm512_set1_epi8(1);
        let mask_hi = _mm512_set1_epi8(0x0F);
        let weights = _mm512_set1_epi16(0x0110);
        // Cross-lane fixup for packuswb: [0,4,1,5,2,6,3,7].
        let perm_idx = _mm512_setr_epi64(0, 4, 1, 5, 2, 6, 3, 7);

        let mut i = 0usize;
        let mut o = 0usize;
        let mut err_accum = 0u64;
        let simd_end = input.len() & !127;

        while i < simd_end {
            let chunk0 = _mm512_loadu_si512(input.as_ptr().add(i).cast());
            let chunk1 = _mm512_loadu_si512(input.as_ptr().add(i + 64).cast());

            let (decoded0, mask0) =
                decode_chunk_512(chunk0, delta_check, delta_rebase, one, mask_hi, weights, perm_idx);
            let (decoded1, mask1) =
                decode_chunk_512(chunk1, delta_check, delta_rebase, one, mask_hi, weights, perm_idx);

            // Fuse: OR masks, then a single branch.
            let combined_mask = mask0 | mask1;

            if SHORT_CIRCUIT {
                if combined_mask != 0 {
                    return scalar::decode(input, output);
                }
            } else {
                err_accum |= combined_mask;
            }

            // Store low 32 bytes of each decoded __m512i.
            let out_ptr = output.as_mut_ptr().add(o);
            _mm256_storeu_si256(out_ptr.cast(), _mm512_castsi512_si256(decoded0));
            _mm256_storeu_si256(out_ptr.add(32).cast(), _mm512_castsi512_si256(decoded1));

            i += 128;
            o += 64;
        }

        // Tail: fall through to AVX2, then SSSE3, then scalar.
        if i < input.len() {
            let input_tail = unsafe { input.get_unchecked(i..) };
            let output_tail = unsafe { output.get_unchecked_mut(o..) };
            if SHORT_CIRCUIT {
                decode_avx2(input_tail, output_tail).map_err(|e| match e {
                    Error::InvalidChar { byte, index } => Error::InvalidChar { byte, index: index + i },
                    other => other,
                })?;
            } else {
                if ct_decode_avx2(input_tail, output_tail).is_err() {
                    err_accum |= 1;
                }
            }
        }

        if !SHORT_CIRCUIT && err_accum != 0 {
            return Err(Error::InvalidEncoding);
        }

        Ok(())
    }
}

/// Hex-decode `input` into `output` using AVX-512BW.
///
/// Falls through to [`decode_avx2`] for the tail. On validation failure,
/// falls back to scalar for precise error position.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[inline]
#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn decode_avx512(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    // SAFETY: caller guarantees AVX-512BW.
    unsafe { decode_avx512_inner::<true>(input, output) }
}

/// Constant-time hex-decode `input` into `output` using AVX-512BW.
///
/// Processes all chunks without short-circuiting on invalid input.
/// Falls through to [`ct_decode_avx2`] for the tail.
/// Returns `Err(Error::InvalidEncoding)` if any byte was invalid.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[inline]
#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn ct_decode_avx512(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    // SAFETY: caller guarantees AVX-512BW.
    unsafe { decode_avx512_inner::<false>(input, output) }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX-512BW SIMD.
///
/// Reuses the Lemire `delta_check` validation: for each 64-byte chunk,
/// computes `vm1 + shuffle(delta_check, hash_key)` and checks that
/// `_mm512_movepi8_mask == 0` (all MSBs clear ⇒ all chars valid).
/// Falls back to AVX2/SSSE3/scalar for any remaining tail.
///
/// When `SHORT_CIRCUIT` is true, returns `false` immediately on the first
/// invalid chunk. When `SHORT_CIRCUIT` is false, accumulates validity across
/// all chunks without early exit (constant-time).
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[inline]
#[target_feature(enable = "avx512bw")]
unsafe fn check_avx512_inner<const SHORT_CIRCUIT: bool>(input: &[u8]) -> bool {
    // SAFETY: all intrinsics below require AVX-512BW, guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm512_broadcast_i32x4(decode_delta_check_128());
        let one = _mm512_set1_epi8(1);
        let mask_hi = _mm512_set1_epi8(0x0F);

        let mut i = 0usize;
        let mut all_valid = true;
        let simd_end = input.len() & !63;

        while i < simd_end {
            let chunk = _mm512_loadu_si512(input.as_ptr().add(i).cast());

            let vm1 = _mm512_sub_epi8(chunk, one);
            let hash_key = _mm512_and_si512(_mm512_srli_epi16(vm1, 4), mask_hi);
            let check = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_check, hash_key));

            if SHORT_CIRCUIT {
                if _mm512_movepi8_mask(check) != 0 {
                    return false;
                }
            } else {
                all_valid &= _mm512_movepi8_mask(check) == 0;
            }

            i += 64;
        }

        // Tail: fall through to AVX2/SSSE3/scalar.
        let input_tail = unsafe { input.get_unchecked(i..) };
        let tail_valid = if SHORT_CIRCUIT {
            check_avx2(input_tail)
        } else {
            ct_check_avx2(input_tail)
        };

        all_valid & tail_valid
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX-512BW SIMD.
///
/// Returns `false` immediately upon encountering the first invalid chunk.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[inline]
#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn check_avx512(input: &[u8]) -> bool {
    // SAFETY: caller guarantees AVX-512BW.
    unsafe { check_avx512_inner::<true>(input) }
}

/// Constant-time check whether every byte in `input` is a valid hex ASCII
/// character, using AVX-512BW SIMD.
///
/// Processes all chunks without short-circuiting on invalid input.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[inline]
#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn ct_check_avx512(input: &[u8]) -> bool {
    // SAFETY: caller guarantees AVX-512BW.
    unsafe { check_avx512_inner::<false>(input) }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::test_support::exercise_backend;

    cpufeatures::new!(has_ssse3, "ssse3");
    cpufeatures::new!(has_avx2, "avx2");
    cpufeatures::new!(has_avx512bw, "avx512bw");

    #[test]
    fn ssse3_matches_scalar_oracle() {
        let available = cfg!(target_feature = "ssse3") || has_ssse3::init().get();
        if !available {
            return;
        }
        assert!(cfg!(miri) || has_ssse3::init().get());

        exercise_backend(
            |input, output| unsafe { encode_ssse3::<false>(input, output) },
            |input, output| unsafe { encode_ssse3::<true>(input, output) },
            |input, output| unsafe { decode_ssse3(input, output) },
            |input, output| unsafe { ct_decode_ssse3(input, output) },
            |input| unsafe { check_ssse3(input) },
            |input| unsafe { ct_check_ssse3(input) },
        );
    }

    #[test]
    fn avx2_matches_scalar_oracle() {
        let available = cfg!(target_feature = "avx2") || has_avx2::init().get();
        if !available {
            return;
        }
        assert!(cfg!(miri) || has_avx2::init().get());

        exercise_backend(
            |input, output| unsafe { encode_avx2::<false>(input, output) },
            |input, output| unsafe { encode_avx2::<true>(input, output) },
            |input, output| unsafe { decode_avx2(input, output) },
            |input, output| unsafe { ct_decode_avx2(input, output) },
            |input| unsafe { check_avx2(input) },
            |input| unsafe { ct_check_avx2(input) },
        );
    }

    #[test]
    fn avx512_matches_scalar_oracle() {
        let available = cfg!(target_feature = "avx512bw") || has_avx512bw::init().get();
        if !available {
            return;
        }
        assert!(cfg!(miri) || has_avx512bw::init().get());

        exercise_backend(
            |input, output| unsafe { encode_avx512::<false>(input, output) },
            |input, output| unsafe { encode_avx512::<true>(input, output) },
            |input, output| unsafe { decode_avx512(input, output) },
            |input, output| unsafe { ct_decode_avx512(input, output) },
            |input| unsafe { check_avx512(input) },
            |input| unsafe { ct_check_avx512(input) },
        );
    }
}
