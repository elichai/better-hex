//! AArch64 NEON hex encoding, decoding, and validation backend.
//!
//! Processes 16 bytes at a time (encode/check) or 32 hex characters at a time
//! (decode), falling back to the scalar backend for any remaining tail bytes.
//!
//! # Encoding algorithm
//!
//! 1. Load a 16-byte hex character LUT (`0123456789abcdef` or uppercase) into
//!    a NEON register.
//! 2. Main loop processes 32 bytes (2x16) per iteration for reduced loop
//!    overhead. For each 16-byte chunk of input:
//!    a. Split each byte into high nibble (`byte >> 4`) and low nibble
//!       (`byte & 0x0F`).
//!    b. Use `vqtbl1q_u8` (table lookup) to convert each nibble to its
//!       ASCII hex character.
//!    c. Interleave the high and low nibble results with `vzipq_u8` so
//!       that each input byte produces two adjacent hex characters.
//!    d. Store the resulting 32 bytes to the output buffer.
//! 3. Handle a remaining aligned 16-byte chunk if present.
//! 4. For the final < 16 bytes, if the remaining tail is >= 4 bytes and the
//!    total input is >= 16 bytes, use an overlapping NEON read of the last 16
//!    input bytes (the overlapping portion produces identical output, so the
//!    overwrite is harmless). Tiny tails (< 4 bytes) or inputs < 16 bytes fall
//!    back to scalar, as scalar is cheaper for very short sequences.
//!
//! # Decoding algorithm (Mula-Langdale variant)
//!
//! Processes 32 hex ASCII bytes (two 16-byte NEON vectors) into 16 output bytes
//! per iteration:
//!
//! 1. **Digit path**: For each byte, compute
//!    `saturating_sub(byte.wrapping_add(0xC6), 6) - 0xF0`. This yields nibble
//!    values 0-9 for ASCII digits `'0'`-`'9'`, and garbage (>= 16) for
//!    non-digit characters.
//!    Explanation: `'0'` is 0x30; `0x30 + 0xC6 = 0xF6` (wrapping u8).
//!    `saturating_sub(0xF6, 6) = 0xF0`, then `0xF0 - 0xF0 = 0`. For `'9'`
//!    (0x39): `0x39 + 0xC6 = 0xFF`, `sat_sub(0xFF, 6) = 0xF9`,
//!    `0xF9 - 0xF0 = 9`.
//!
//! 2. **Letter path**: Case-fold with `byte & 0xDF` (clears bit 5), then
//!    compute `saturating_add((folded - 'A'), 10)`. This yields 10-15 for
//!    `'A'`-`'F'` / `'a'`-`'f'`, and values >= 16 for non-letter characters
//!    (because `'G'` and above produce 16+).
//!
//! 3. **Merge**: `vminq_u8(digit_result, alpha_result)` — the valid path
//!    always produces a value in 0-15, while the invalid path produces >= 16,
//!    so `min` selects the correct one.
//!
//! 4. **Validate**: `vqaddq_u8(nibbles, splat(0x70))` — saturating add of 112.
//!    Valid nibbles (0-15) become 112-127 (MSB clear). Invalid nibbles (>= 16)
//!    saturate or wrap to >= 128 (MSB set). Check the max element with
//!    `vmaxvq_u8`; if the high bit is set, there is at least one invalid
//!    character. In that case, fall back to scalar decoding for exact error
//!    position reporting.
//!
//! 5. **Pack**: Use `vuzpq_u8` to deinterleave odd/even nibbles (hi nibbles
//!    and lo nibbles into separate vectors), then `(hi << 4) | lo` to combine
//!    them into output bytes.
//!
//! 6. Tail bytes (< 32) are handled by the scalar fallback.
//!
//! # Check algorithm
//!
//! For each 16-byte chunk, performs three range checks:
//! - `'0' <= byte <= '9'`
//! - `'A' <= byte <= 'F'`
//! - `'a' <= byte <= 'f'`
//!
//! OR the three masks together; every lane should be 0xFF if valid. Reduce
//! with `vminvq_u8` — if the result is 0xFF, all bytes were valid. Otherwise,
//! at least one byte was outside all three ranges and the input is invalid.
//!
//! Tail bytes (< 16) are handled by the scalar fallback.

#![allow(clippy::doc_overindented_list_items)]

use crate::backend::{ct_scalar, scalar};
use crate::error::Error;
use core::arch::aarch64::*;
use core::mem::MaybeUninit;

/// NEON hex encoder — processes 32 input bytes (producing 64 hex chars) per
/// main loop iteration using 2x-unrolled table lookup. A single remaining
/// 16-byte chunk is handled separately, and the final < 16 bytes use an
/// overlapping NEON read (re-encoding the last 16 bytes) when the tail is
/// >= 4 bytes and the total input is >= 16 bytes; otherwise scalar is used.
pub fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2, "output buffer wrong size for encode");

    let lut_bytes: [u8; 16] = if UPPER {
        *b"0123456789ABCDEF"
    } else {
        *b"0123456789abcdef"
    };

    // SAFETY: Loading a constant 16-byte array into a NEON register.
    let lut = unsafe { vld1q_u8(lut_bytes.as_ptr()) };
    let mask_lo = unsafe { vdupq_n_u8(0x0F) };

    let in_base = input.as_ptr();
    let out_base = output.as_mut_ptr().cast::<u8>();
    let len = input.len();
    let mut i = 0usize;

    // Process 32 bytes (2x16) per iteration to reduce loop overhead
    // and give the OoO engine more independent work per iteration.
    let simd_end_2x = len / 32 * 32;
    while i < simd_end_2x {
        unsafe {
            // Load two 16-byte chunks.
            let chunk_a = vld1q_u8(in_base.add(i));
            let chunk_b = vld1q_u8(in_base.add(i + 16));

            // Process chunk A.
            let hi_a = vshrq_n_u8::<4>(chunk_a);
            let lo_a = vandq_u8(chunk_a, mask_lo);
            let hi_hex_a = vqtbl1q_u8(lut, hi_a);
            let lo_hex_a = vqtbl1q_u8(lut, lo_a);
            let zipped_a = vzipq_u8(hi_hex_a, lo_hex_a);

            // Process chunk B.
            let hi_b = vshrq_n_u8::<4>(chunk_b);
            let lo_b = vandq_u8(chunk_b, mask_lo);
            let hi_hex_b = vqtbl1q_u8(lut, hi_b);
            let lo_hex_b = vqtbl1q_u8(lut, lo_b);
            let zipped_b = vzipq_u8(hi_hex_b, lo_hex_b);

            // Store all 64 output bytes.
            let out = out_base.add(i * 2);
            vst1q_u8(out, zipped_a.0);
            vst1q_u8(out.add(16), zipped_a.1);
            vst1q_u8(out.add(32), zipped_b.0);
            vst1q_u8(out.add(48), zipped_b.1);
        }
        i += 32;
    }

    // Handle a remaining 16-byte chunk if `len % 32 >= 16`.
    // (There can be at most one, since the 2x loop handles pairs.)
    if i + 16 <= len {
        unsafe {
            let chunk = vld1q_u8(in_base.add(i));
            let hi_nibbles = vshrq_n_u8::<4>(chunk);
            let lo_nibbles = vandq_u8(chunk, mask_lo);
            let hi_hex = vqtbl1q_u8(lut, hi_nibbles);
            let lo_hex = vqtbl1q_u8(lut, lo_nibbles);
            let zipped = vzipq_u8(hi_hex, lo_hex);
            let out = out_base.add(i * 2);
            vst1q_u8(out, zipped.0);
            vst1q_u8(out.add(16), zipped.1);
        }
        i += 16;
    }

    // Handle the final < 16 bytes. Use an overlapping NEON read of the last
    // 16 input bytes when the tail is >= 4 bytes (worth the SIMD overhead)
    // and the total input is >= 16 bytes (so the overlap is valid). For
    // tiny tails (< 4 bytes) the scalar path is cheaper.
    if i < len {
        let remaining = len - i;
        if remaining >= 4 && len >= 16 {
            unsafe {
                let chunk = vld1q_u8(in_base.add(len - 16));
                let hi_nibbles = vshrq_n_u8::<4>(chunk);
                let lo_nibbles = vandq_u8(chunk, mask_lo);
                let hi_hex = vqtbl1q_u8(lut, hi_nibbles);
                let lo_hex = vqtbl1q_u8(lut, lo_nibbles);
                let zipped = vzipq_u8(hi_hex, lo_hex);
                let out = out_base.add((len - 16) * 2);
                vst1q_u8(out, zipped.0);
                vst1q_u8(out.add(16), zipped.1);
            }
        } else {
            scalar::encode::<UPPER>(&input[i..], &mut output[i * 2..]);
        }
    }
}

/// Inner NEON hex decoder, parameterised by `SHORT_CIRCUIT`.
///
/// - `SHORT_CIRCUIT = true` (fast path): on validation failure, returns early
///   to `scalar::decode` from the failing chunk onward to produce the exact
///   `InvalidChar` error with byte and index.
/// - `SHORT_CIRCUIT = false` (CT path): accumulates error bits across all
///   chunks, processes every byte, and returns `Error::InvalidEncoding` at the
///   end if any invalid character was seen. Tail bytes use `ct_scalar::decode`.
///
/// See module-level documentation for the full algorithm description.
fn decode_inner<const SHORT_CIRCUIT: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2, "output buffer wrong size for decode");
    debug_assert!(input.len().is_multiple_of(2), "input length must be even");

    let simd_end = input.len() / 32 * 32;
    let mut i = 0usize;
    let mut err: u8 = 0;

    // Hoist all broadcast constants out of the loop so LLVM doesn't need to
    // prove them loop-invariant. These are used by decode_nibbles_with_consts
    // and the validation step.
    let c_c6 = unsafe { vdupq_n_u8(0xC6) };
    let c_six = unsafe { vdupq_n_u8(6) };
    let c_f0 = unsafe { vdupq_n_u8(0xF0) };
    let c_df = unsafe { vdupq_n_u8(0xDF) };
    let c_a = unsafe { vdupq_n_u8(b'A') };
    let c_ten = unsafe { vdupq_n_u8(10) };
    let c_validate = unsafe { vdupq_n_u8(0x70) };

    while i < simd_end {
        let v0 = unsafe { vld1q_u8(input.as_ptr().add(i)) };
        let v1 = unsafe { vld1q_u8(input.as_ptr().add(i + 16)) };

        let nib0 = decode_nibbles_with_consts(v0, c_c6, c_six, c_f0, c_df, c_a, c_ten);
        let nib1 = decode_nibbles_with_consts(v1, c_c6, c_six, c_f0, c_df, c_a, c_ten);

        // Validate: saturating add with 0x70 (112). Valid nibbles (0-15)
        // → 112-127 (MSB clear). Invalid (>= 16) → >= 128 (MSB set).
        // Fuse two check vectors with vorrq_u8 BEFORE the horizontal reduce,
        // halving the number of expensive cross-lane vmaxvq_u8 operations.
        let check0 = unsafe { vqaddq_u8(nib0, c_validate) };
        let check1 = unsafe { vqaddq_u8(nib1, c_validate) };
        let combined_check = unsafe { vorrq_u8(check0, check1) };
        let chunk_err = unsafe { vmaxvq_u8(combined_check) } & 0x80;

        if SHORT_CIRCUIT {
            if chunk_err != 0 {
                return scalar::decode(&input[i..], &mut output[i / 2..]).map_err(|e| match e {
                    Error::InvalidChar { byte, index } => Error::InvalidChar { byte, index: index + i },
                    other => other,
                });
            }
        } else {
            err |= chunk_err;
        }

        // Pack: deinterleave hi/lo nibbles, then combine.
        let deinterleaved = unsafe { vuzpq_u8(nib0, nib1) };
        let combined = unsafe { vorrq_u8(vshlq_n_u8::<4>(deinterleaved.0), deinterleaved.1) };

        let out_ptr = output.as_mut_ptr().cast::<u8>().wrapping_add(i / 2);
        unsafe { vst1q_u8(out_ptr, combined) };

        i += 32;
    }

    if i < input.len() {
        if SHORT_CIRCUIT {
            scalar::decode(&input[i..], &mut output[i / 2..]).map_err(|e| match e {
                Error::InvalidChar { byte, index } => Error::InvalidChar { byte, index: index + i },
                other => other,
            })?;
        } else {
            if ct_scalar::decode(&input[i..], &mut output[i / 2..]).is_err() {
                err |= 0x80;
            }
        }
    }

    if !SHORT_CIRCUIT && err != 0 {
        return Err(Error::InvalidEncoding);
    }

    Ok(())
}

/// NEON hex decoder — fast path with early exit and exact error position.
///
/// On validation failure within a SIMD chunk, falls back to scalar decoding
/// from the start of that chunk to produce the exact `InvalidChar` error with
/// the correct byte and index.
pub fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    decode_inner::<true>(input, output)
}

/// Constant-time NEON hex decoder — processes all bytes, no early exit.
///
/// Accumulates error bits across all chunks and returns `Error::InvalidEncoding`
/// at the end if any invalid character was encountered. Does not reveal the
/// position of the invalid character.
pub fn ct_decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    decode_inner::<false>(input, output)
}

/// Decode a 16-byte NEON vector of hex ASCII characters into nibble values,
/// using pre-hoisted broadcast constants to avoid redundant `vdupq_n_u8` calls
/// inside the hot loop.
///
/// Uses two parallel paths (digit and letter) merged with `vminq_u8`.
#[inline(always)]
fn decode_nibbles_with_consts(
    v: uint8x16_t,
    c_c6: uint8x16_t,
    c_six: uint8x16_t,
    c_f0: uint8x16_t,
    c_df: uint8x16_t,
    c_a: uint8x16_t,
    c_ten: uint8x16_t,
) -> uint8x16_t {
    let shifted = unsafe { vaddq_u8(v, c_c6) };
    let clamped = unsafe { vqsubq_u8(shifted, c_six) };
    let digit = unsafe { vsubq_u8(clamped, c_f0) };

    let folded = unsafe { vandq_u8(v, c_df) };
    let alpha_offset = unsafe { vsubq_u8(folded, c_a) };
    let alpha = unsafe { vqaddq_u8(alpha_offset, c_ten) };

    unsafe { vminq_u8(digit, alpha) }
}

/// NEON hex validator — checks that every byte in `input` is a valid hex
/// ASCII character, processing 16 bytes at a time.
///
/// Performs three parallel range checks (`'0'`-`'9'`, `'A'`-`'F'`,
/// `'a'`-`'f'`) per 16-byte chunk and OR-combines them. If all bytes are
/// valid, every lane is 0xFF; we reduce with `vminvq_u8` to check.
///
/// See module-level documentation for the full algorithm description.
/// Inner NEON hex check, parameterised by `SHORT_CIRCUIT`.
///
/// - `SHORT_CIRCUIT = true`: returns false on the first invalid chunk.
/// - `SHORT_CIRCUIT = false` (CT): accumulates validity across all chunks,
///   checks at the end. Tail uses `ct_scalar::check`.
fn check_inner<const SHORT_CIRCUIT: bool>(input: &[u8]) -> bool {
    let simd_end = input.len() / 16 * 16;
    let mut i = 0usize;
    let mut all_valid = true;

    while i < simd_end {
        // SAFETY: `i + 16 <= input.len()`.
        let v = unsafe { vld1q_u8(input.as_ptr().add(i)) };

        let ge_0 = unsafe { vcgeq_u8(v, vdupq_n_u8(b'0')) };
        let le_9 = unsafe { vcleq_u8(v, vdupq_n_u8(b'9')) };
        let is_digit = unsafe { vandq_u8(ge_0, le_9) };

        let ge_a_upper = unsafe { vcgeq_u8(v, vdupq_n_u8(b'A')) };
        let le_f_upper = unsafe { vcleq_u8(v, vdupq_n_u8(b'F')) };
        let is_upper = unsafe { vandq_u8(ge_a_upper, le_f_upper) };

        let ge_a_lower = unsafe { vcgeq_u8(v, vdupq_n_u8(b'a')) };
        let le_f_lower = unsafe { vcleq_u8(v, vdupq_n_u8(b'f')) };
        let is_lower = unsafe { vandq_u8(ge_a_lower, le_f_lower) };

        let valid = unsafe { vorrq_u8(vorrq_u8(is_digit, is_upper), is_lower) };
        let min_val = unsafe { vminvq_u8(valid) };

        if SHORT_CIRCUIT {
            if min_val != 0xFF {
                return false;
            }
        } else {
            all_valid &= min_val == 0xFF;
        }

        i += 16;
    }

    // Tail
    if i < input.len() {
        let tail_ok = if SHORT_CIRCUIT {
            scalar::check(&input[i..])
        } else {
            ct_scalar::check(&input[i..])
        };
        all_valid &= tail_ok;
    }

    all_valid
}

/// Fast-path hex check (short-circuits on first invalid byte).
pub fn check(input: &[u8]) -> bool {
    check_inner::<true>(input)
}

/// Constant-time hex check (processes all bytes, no early return).
pub fn ct_check(input: &[u8]) -> bool {
    check_inner::<false>(input)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::test_support::exercise_backend;

    #[test]
    fn neon_matches_scalar_oracle() {
        exercise_backend(encode::<false>, encode::<true>, decode, ct_decode, check, ct_check);
    }
}
