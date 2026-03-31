//! AArch64 NEON hex encoding, decoding, and validation backend.
//!
//! Processes 16 bytes at a time (encode/check) or 32 hex characters at a time
//! (decode), falling back to the scalar backend for any remaining tail bytes.
//!
//! # Encoding algorithm
//!
//! 1. Load a 16-byte hex character LUT (`0123456789abcdef` or uppercase) into
//!    a NEON register.
//! 2. For each 16-byte chunk of input:
//!    a. Split each byte into high nibble (`byte >> 4`) and low nibble
//!       (`byte & 0x0F`).
//!    b. Use `vqtbl1q_u8` (table lookup) to convert each nibble to its ASCII
//!       hex character.
//!    c. Interleave the high and low nibble results with `vzipq_u8` so that
//!       each input byte produces two adjacent hex characters.
//!    d. Store the resulting 32 bytes to the output buffer.
//! 3. Any remaining bytes (< 16) are handled by the scalar fallback.
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

use crate::backend::scalar;
use crate::error::Error;
use core::arch::aarch64::*;
use core::mem::MaybeUninit;

/// NEON hex encoder — processes 16 input bytes (producing 32 hex chars) per
/// iteration using table lookup, with a scalar tail.
///
/// See module-level documentation for the full algorithm description.
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(
        output.len(),
        input.len() * 2,
        "output buffer wrong size for encode"
    );

    let lut_bytes: [u8; 16] = if UPPER {
        *b"0123456789ABCDEF"
    } else {
        *b"0123456789abcdef"
    };

    // SAFETY: Loading a constant 16-byte array into a NEON register.
    let lut = unsafe { vld1q_u8(lut_bytes.as_ptr()) };
    let mask_lo = unsafe { vdupq_n_u8(0x0F) };

    let mut i = 0usize;
    let simd_end = input.len() / 16 * 16;

    while i < simd_end {
        // SAFETY: `i + 16 <= input.len()` because `i < simd_end` and
        // `simd_end` is a multiple of 16 not exceeding `input.len()`.
        let chunk = unsafe { vld1q_u8(input.as_ptr().add(i)) };

        // Split each byte into high and low nibbles.
        let hi_nibbles = unsafe { vshrq_n_u8::<4>(chunk) };
        let lo_nibbles = unsafe { vandq_u8(chunk, mask_lo) };

        // Table-lookup: convert nibble values (0-15) to hex ASCII characters.
        let hi_hex = unsafe { vqtbl1q_u8(lut, hi_nibbles) };
        let lo_hex = unsafe { vqtbl1q_u8(lut, lo_nibbles) };

        // Interleave so that for input byte at position k, the output is
        // [hi_hex[k], lo_hex[k]] at positions [2k, 2k+1].
        // vzipq_u8 produces two 16-byte vectors:
        //   .0 = interleave low halves, .1 = interleave high halves
        let zipped = unsafe { vzipq_u8(hi_hex, lo_hex) };

        // SAFETY: Writing 32 bytes (two 16-byte stores) to `output` at
        // offset `i * 2`. Since `i + 16 <= input.len()` and
        // `output.len() == input.len() * 2`, we have
        // `i * 2 + 32 <= output.len()`.
        let out_ptr = output.as_mut_ptr().cast::<u8>().wrapping_add(i * 2);
        unsafe {
            vst1q_u8(out_ptr, zipped.0);
            vst1q_u8(out_ptr.add(16), zipped.1);
        }

        i += 16;
    }

    // Scalar fallback for remaining bytes.
    if i < input.len() {
        scalar::encode::<UPPER>(&input[i..], &mut output[i * 2..]);
    }
}

/// NEON hex decoder using the Mula-Langdale algorithm — processes 32 hex
/// characters (two 16-byte vectors) into 16 output bytes per iteration, with
/// a scalar tail.
///
/// On validation failure within a SIMD chunk, falls back to scalar decoding
/// from the start of that chunk to produce the exact `InvalidChar` error with
/// the correct byte and index.
///
/// See module-level documentation for the full algorithm description.
pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    debug_assert_eq!(
        output.len(),
        input.len() / 2,
        "output buffer wrong size for decode"
    );
    debug_assert!(input.len() % 2 == 0, "input length must be even");

    let simd_end = input.len() / 32 * 32;
    let mut i = 0usize;

    while i < simd_end {
        // SAFETY: `i + 32 <= input.len()` because `i < simd_end` and
        // `simd_end` is a multiple of 32 not exceeding `input.len()`.
        let v0 = unsafe { vld1q_u8(input.as_ptr().add(i)) };
        let v1 = unsafe { vld1q_u8(input.as_ptr().add(i + 16)) };

        let nib0 = decode_nibbles(v0);
        let nib1 = decode_nibbles(v1);

        // Validate: saturating add with 0x70 (112). Valid nibbles (0-15)
        // produce 112-127 (MSB=0). Invalid nibbles (>= 16) produce >= 128
        // (MSB=1). We check the maximum across both vectors.
        let validate_threshold = unsafe { vdupq_n_u8(0x70) };
        let check0 = unsafe { vqaddq_u8(nib0, validate_threshold) };
        let check1 = unsafe { vqaddq_u8(nib1, validate_threshold) };
        let max0 = unsafe { vmaxvq_u8(check0) };
        let max1 = unsafe { vmaxvq_u8(check1) };

        if (max0 | max1) & 0x80 != 0 {
            // At least one invalid character in this 32-byte chunk.
            // Fall back to scalar for the rest to get the exact error position.
            return scalar::decode(&input[i..], &mut output[i / 2..]);
        }

        // Pack: deinterleave nibbles. vuzpq_u8 on [nib0, nib1] produces:
        //   .0 = even-indexed nibbles (hi nibbles): nib0[0], nib0[2], ..., nib1[0], nib1[2], ...
        //   .1 = odd-indexed nibbles (lo nibbles):  nib0[1], nib0[3], ..., nib1[1], nib1[3], ...
        let deinterleaved = unsafe { vuzpq_u8(nib0, nib1) };
        let hi = deinterleaved.0;
        let lo = deinterleaved.1;
        let combined = unsafe { vorrq_u8(vshlq_n_u8::<4>(hi), lo) };

        // SAFETY: Writing 16 bytes to `output` at offset `i / 2`.
        // Since `i + 32 <= input.len()` and `output.len() == input.len() / 2`,
        // we have `i / 2 + 16 <= output.len()`.
        let out_ptr = output.as_mut_ptr().cast::<u8>().wrapping_add(i / 2);
        unsafe {
            vst1q_u8(out_ptr, combined);
        }

        i += 32;
    }

    // Scalar fallback for remaining bytes.
    if i < input.len() {
        scalar::decode(&input[i..], &mut output[i / 2..])?;
    }

    Ok(())
}

/// Decode a 16-byte NEON vector of hex ASCII characters into nibble values
/// (0-15 for valid characters, >= 16 for invalid ones).
///
/// Uses two parallel paths (digit and letter) merged with `vminq_u8`.
#[inline(always)]
fn decode_nibbles(v: uint8x16_t) -> uint8x16_t {
    // --- Digit path ---
    // For '0' (0x30): 0x30 + 0xC6 = 0xF6 (wrapping), sat_sub(0xF6, 6) = 0xF0, 0xF0 - 0xF0 = 0
    // For '9' (0x39): 0x39 + 0xC6 = 0xFF (wrapping), sat_sub(0xFF, 6) = 0xF9, 0xF9 - 0xF0 = 9
    // For non-digits the result is garbage (typically >= 16).
    let offset_c6 = unsafe { vdupq_n_u8(0xC6) };
    let six = unsafe { vdupq_n_u8(6) };
    let f0 = unsafe { vdupq_n_u8(0xF0) };

    let shifted = unsafe { vaddq_u8(v, offset_c6) }; // wrapping add
    let clamped = unsafe { vqsubq_u8(shifted, six) }; // saturating sub
    let digit = unsafe { vsubq_u8(clamped, f0) }; // wrapping sub

    // --- Letter path ---
    // Case-fold by clearing bit 5: 'a'-'f' -> 'A'-'F'.
    // Then subtract 'A' and add 10.
    // For 'A' (0x41): (0x41 & 0xDF) = 0x41, 0x41 - 0x41 = 0, sat_add(0, 10) = 10
    // For 'F' (0x46): (0x46 & 0xDF) = 0x46, 0x46 - 0x41 = 5, sat_add(5, 10) = 15
    // For 'G' (0x47): 0x47 - 0x41 = 6, sat_add(6, 10) = 16 (invalid, >= 16)
    let case_mask = unsafe { vdupq_n_u8(0xDF) };
    let cap_a = unsafe { vdupq_n_u8(b'A') };
    let ten = unsafe { vdupq_n_u8(10) };

    let folded = unsafe { vandq_u8(v, case_mask) };
    let alpha_offset = unsafe { vsubq_u8(folded, cap_a) }; // wrapping sub
    let alpha = unsafe { vqaddq_u8(alpha_offset, ten) }; // saturating add

    // Merge: min picks the valid path (0-15) over garbage (>= 16).
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
pub(crate) fn check(input: &[u8]) -> bool {
    let simd_end = input.len() / 16 * 16;
    let mut i = 0usize;

    while i < simd_end {
        // SAFETY: `i + 16 <= input.len()`.
        let v = unsafe { vld1q_u8(input.as_ptr().add(i)) };

        // Range check: '0' (0x30) <= byte <= '9' (0x39)
        let ge_0 = unsafe { vcgeq_u8(v, vdupq_n_u8(b'0')) };
        let le_9 = unsafe { vcleq_u8(v, vdupq_n_u8(b'9')) };
        let is_digit = unsafe { vandq_u8(ge_0, le_9) };

        // Range check: 'A' (0x41) <= byte <= 'F' (0x46)
        let ge_a_upper = unsafe { vcgeq_u8(v, vdupq_n_u8(b'A')) };
        let le_f_upper = unsafe { vcleq_u8(v, vdupq_n_u8(b'F')) };
        let is_upper = unsafe { vandq_u8(ge_a_upper, le_f_upper) };

        // Range check: 'a' (0x61) <= byte <= 'f' (0x66)
        let ge_a_lower = unsafe { vcgeq_u8(v, vdupq_n_u8(b'a')) };
        let le_f_lower = unsafe { vcleq_u8(v, vdupq_n_u8(b'f')) };
        let is_lower = unsafe { vandq_u8(ge_a_lower, le_f_lower) };

        // Combine: at least one range must match for each byte.
        let valid = unsafe { vorrq_u8(vorrq_u8(is_digit, is_upper), is_lower) };

        // Reduce: if all lanes are 0xFF, min is 0xFF. Otherwise, there is
        // at least one zero lane (invalid byte).
        let min_val = unsafe { vminvq_u8(valid) };
        if min_val != 0xFF {
            return false;
        }

        i += 16;
    }

    // Scalar fallback for remaining bytes.
    if i < input.len() {
        return scalar::check(&input[i..]);
    }

    true
}
