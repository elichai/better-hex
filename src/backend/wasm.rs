//! WASM SIMD128 hex backend.
//!
//! Uses the stable `core::arch::wasm32` SIMD128 intrinsics (available since
//! Rust 1.54) to encode, decode, and validate hex strings 16 bytes at a time.
//!
//! # Encoding algorithm
//!
//! Each 16-byte input chunk is split into high and low nibbles, looked up
//! through a hex LUT via `u8x16_swizzle`, and interleaved with
//! `u8x16_shuffle` to produce 32 hex ASCII bytes. Any trailing bytes that
//! don't fill a full 16-byte chunk are handled by the scalar backend.
//!
//! # Decoding algorithm
//!
//! Uses a branchless variant of the Mula–Langdale nibble-decode approach:
//! two parallel paths (digit and alpha) produce candidate nibble values,
//! merged via `u8x16_min`. Validation detects out-of-range nibbles via
//! saturating addition; error bits are OR-accumulated across the whole
//! input and the function returns a non-zero [`Status`] (with no position) if
//! anything tripped — the SIMD pass keeps decoding all chunks rather than
//! short-circuiting on first failure. Scalar is only invoked on the
//! trailing `byte_len % 16` bytes that don't fill a 16-byte chunk. Nibbles
//! are packed by deinterleaving (shuffle to separate even/odd positions),
//! then shifting and ORing.
//!
//! # Validation (`check`)
//!
//! Three range checks (`0-9`, `a-f`, `A-F`) are ORed together, inverted, and
//! reduced with `u8x16_bitmask` into the backend status accumulator.

use super::Status;
use crate::backend::scalar;
use core::arch::wasm32::*;

#[inline(always)]
fn hex_lut(upper: bool) -> v128 {
    let table = if upper {
        *b"0123456789ABCDEF"
    } else {
        *b"0123456789abcdef"
    };
    // SAFETY: `table` is a 16-byte array; reading it as v128 is valid.
    unsafe { v128_load(table.as_ptr().cast()) }
}

/// Encode `input` bytes as hex into `output`, using SIMD128 for 16-byte chunks.
///
/// After return every element of `dst[..byte_len * 2]` is initialised
/// with a valid hex ASCII byte.
///
/// # Safety
///
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len * 2` bytes.
/// - The `src[..byte_len]` and `dst[..byte_len * 2]` regions must not overlap.
pub unsafe fn encode(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize, upper: bool) {
    let lut = hex_lut(upper);
    let mask_lo = u8x16_splat(0x0F);

    while byte_len >= 16 {
        // SAFETY: `byte_len >= 16` so src read and dst write are in bounds.
        unsafe {
            let chunk = v128_load(src.cast());

            // Split each byte into high and low nibbles.
            let lo_nibbles = v128_and(chunk, mask_lo);
            let hi_nibbles = u8x16_shr(chunk, 4);

            // LUT lookup: nibble → ASCII hex character.
            let lo_ascii = u8x16_swizzle(lut, lo_nibbles);
            let hi_ascii = u8x16_swizzle(lut, hi_nibbles);

            // Interleave: for each byte position k, output[2k] = hi_ascii[k],
            // output[2k+1] = lo_ascii[k].
            let out0 = u8x16_shuffle::<0, 16, 1, 17, 2, 18, 3, 19, 4, 20, 5, 21, 6, 22, 7, 23>(hi_ascii, lo_ascii);
            let out1 =
                u8x16_shuffle::<8, 24, 9, 25, 10, 26, 11, 27, 12, 28, 13, 29, 14, 30, 15, 31>(hi_ascii, lo_ascii);

            v128_store(dst.cast(), out0);
            v128_store(dst.add(16).cast(), out1);

            src = src.add(16);
            dst = dst.add(32);
        }
        byte_len -= 16;
    }

    // Tail: delegate remaining bytes to scalar.
    // SAFETY: `src` valid for `byte_len` reads, `dst` valid for `byte_len * 2` writes.
    unsafe { scalar::encode_inner(src, dst, byte_len, upper) };
}

/// Decode hex-encoded `input` into `output`, using SIMD128 for 32-byte chunks.
///
/// Processes all chunks without short-circuiting on invalid input (constant-time),
/// accumulating errors across the entire input before returning the raw
/// error accumulator.
///
/// # Safety
///
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
pub unsafe fn decode(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize) -> Status {
    let mut err_accum: u16 = 0;

    // WASM SIMD128: 16 output bytes per iteration (32 hex chars).
    while byte_len >= 16 {
        // Load two 16-byte halves of the 32-byte hex input.
        // SAFETY: `byte_len >= 16` so `src` is valid for 32 hex bytes and
        // `dst` is valid for 16 output bytes.
        let nib0 = unsafe { v128_load(src.cast()) };
        let nib1 = unsafe { v128_load(src.add(16).cast()) };

        let (nibbles0, ok0) = decode_nibbles(nib0);
        let (nibbles1, ok1) = decode_nibbles(nib1);

        err_accum |= ok0 | ok1;

        // Pack nibbles: deinterleave even (hi) and odd (lo) positions from the
        // two 16-byte nibble vectors, then combine with shift + OR.
        let hi = u8x16_shuffle::<0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30>(nibbles0, nibbles1);
        let lo = u8x16_shuffle::<1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31>(nibbles0, nibbles1);
        let packed = v128_or(u8x16_shl(hi, 4), lo);

        // SAFETY: `byte_len >= 16`, so `dst` is valid for 16 writes here, and
        // advancing `src` by 32 / `dst` by 16 keeps both in bounds for the
        // remaining `byte_len - 16` iterations (caller's contract).
        unsafe {
            v128_store(dst.cast(), packed);
            src = src.add(32);
            dst = dst.add(16);
        }
        byte_len -= 16;
    }

    // Tail: delegate remaining bytes to scalar.
    if byte_len > 0 {
        // SAFETY: same pointer validity as above.
        return Status::from_u16_error_accum(err_accum).or(unsafe { scalar::decode(src, dst, byte_len) });
    }

    Status::from_u16_error_accum(err_accum)
}

/// Decode 16 hex-ASCII bytes in `v` into nibble values, returning the nibble
/// vector and a bitmask (`u16`) where a non-zero value indicates at least one
/// invalid hex byte (`u8x16_bitmask` of the out-of-range check).
#[inline(always)]
fn decode_nibbles(v: v128) -> (v128, u16) {
    // Digit path: '0'..'9' → 0..9
    let digit = u8x16_sub(
        u8x16_sub_sat(u8x16_add(v, u8x16_splat(0xC6)), u8x16_splat(6)),
        u8x16_splat(0xF0),
    );

    // Alpha path: 'A'..'F' / 'a'..'f' → 10..15
    let upper = v128_and(v, u8x16_splat(0xDF));
    let alpha = u8x16_add_sat(u8x16_sub(upper, u8x16_splat(b'A')), u8x16_splat(10));

    // Merge: valid nibbles are 0..15; pick the smaller of the two paths.
    let nibbles = u8x16_min(digit, alpha);

    // Validate: any nibble > 15 means the byte was not valid hex.
    // Adding 112 (== 128 - 16) to a value 0..15 stays ≤ 127; anything ≥ 16
    // wraps to ≥ 128. Check that the high bit is never set (== all ≤ 127).
    let check = u8x16_add_sat(nibbles, u8x16_splat(112));
    // `u8x16_bitmask` extracts the MSB of each lane into a u16.
    // Non-zero means at least one nibble was out of range (invalid hex byte).
    let err_bits = u8x16_bitmask(check);

    (nibbles, err_bits)
}

/// Check if every byte in `input` is a valid hex ASCII character, using SIMD128
/// for 16-byte chunks, returning the backend status.
///
/// Processes all chunks without short-circuiting (constant-time).
/// Returns zero iff all bytes are in `[0-9a-fA-F]`.
pub fn check(mut input: &[u8]) -> Status {
    let mut err_accum: u16 = 0;

    while input.len() >= 16 {
        // SAFETY: `input.len() >= 16` so the pointer is valid for 16 reads.
        let v = unsafe { v128_load(input.as_ptr().cast()) };

        let is_digit = v128_and(u8x16_ge(v, u8x16_splat(b'0')), u8x16_le(v, u8x16_splat(b'9')));
        let is_upper = v128_and(u8x16_ge(v, u8x16_splat(b'A')), u8x16_le(v, u8x16_splat(b'F')));
        let is_lower = v128_and(u8x16_ge(v, u8x16_splat(b'a')), u8x16_le(v, u8x16_splat(b'f')));

        let is_hex = v128_or(v128_or(is_digit, is_upper), is_lower);
        let invalid = v128_xor(is_hex, u8x16_splat(0xFF));
        err_accum |= u8x16_bitmask(invalid);

        // SAFETY: `input.len() >= 16` checked above.
        input = unsafe { input.get_unchecked(16..) };
    }

    Status::from_u16_error_accum(err_accum).or(scalar::check(input))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::test_support::exercise_backend;

    #[test]
    fn wasm_matches_scalar_oracle() {
        exercise_backend(
            |input, output| unsafe { encode(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), false) },
            |input, output| unsafe { encode(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), true) },
            |input, output| unsafe {
                if decode(input.as_ptr(), output.as_mut_ptr().cast(), output.len()).to_bool_vartime() {
                    Ok(())
                } else {
                    Err(crate::error::Error::InvalidEncoding)
                }
            },
            |input| check(input).to_bool_vartime(),
        );
    }
}
