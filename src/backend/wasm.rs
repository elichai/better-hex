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
//! saturating addition. On failure, the scalar backend is invoked on the
//! remaining input to produce a precise error. Nibbles are
//! packed by deinterleaving (shuffle to separate even/odd positions), then
//! shifting and ORing.
//!
//! # Validation (`check`)
//!
//! Three range checks (`0-9`, `a-f`, `A-F`) are ORed together and reduced
//! with `u8x16_all_true`.

use super::InvalidEncoding;
use crate::backend::scalar;
use core::arch::wasm32::*;

/// Lower-case hex lookup table: nibble value 0..15 → ASCII `'0'..'f'`.
const HEX_LOWER: [u8; 16] = *b"0123456789abcdef";
/// Upper-case hex lookup table: nibble value 0..15 → ASCII `'0'..'F'`.
const HEX_UPPER: [u8; 16] = *b"0123456789ABCDEF";

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
pub(crate) unsafe fn encode<const UPPER: bool>(src: *const u8, dst: *mut u8, byte_len: usize) {
    let table = if UPPER { &HEX_UPPER } else { &HEX_LOWER };

    // Load the 16-byte hex LUT into a SIMD register.
    // SAFETY: `table` is a 16-byte aligned array; reading it as v128 is valid.
    let lut = unsafe { v128_load(table.as_ptr().cast()) };
    let mask_lo = u8x16_splat(0x0F);

    let chunks = byte_len / 16;
    for i in 0..chunks {
        // SAFETY: `i * 16 + 16 <= byte_len` so src read and dst write are in bounds.
        unsafe {
            let chunk = v128_load(src.add(i * 16).cast());

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

            let out_ptr = dst.add(i * 32);
            v128_store(out_ptr.cast(), out0);
            v128_store(out_ptr.add(16).cast(), out1);
        }
    }

    // Tail: delegate remaining bytes to scalar.
    let done = chunks * 16;
    // SAFETY: `src.add(done)` valid for `byte_len - done` reads,
    // `dst.add(done * 2)` valid for `(byte_len - done) * 2` writes.
    unsafe { scalar::encode_inner::<UPPER>(src.add(done), dst.add(done * 2), byte_len - done) };
}

/// Decode hex-encoded `input` into `output`, using SIMD128 for 32-byte chunks.
///
/// Processes all chunks without short-circuiting on invalid input (constant-time),
/// accumulating errors across the entire input before returning.
///
/// # Safety
///
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
pub(crate) unsafe fn decode(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), InvalidEncoding> {
    let hex_len = byte_len * 2;
    let mut err_accum: u16 = 0;

    let chunks = hex_len / 32;
    for i in 0..chunks {
        let hex_off = i * 32;
        let byte_off = i * 16;

        // Load two 16-byte halves of the 32-byte hex input.
        // SAFETY: `hex_off + 32 <= hex_len` and `byte_off + 16 <= byte_len`.
        let nib0 = unsafe { v128_load(src.add(hex_off).cast()) };
        let nib1 = unsafe { v128_load(src.add(hex_off + 16).cast()) };

        let (nibbles0, ok0) = decode_nibbles(nib0);
        let (nibbles1, ok1) = decode_nibbles(nib1);

        err_accum |= ok0 | ok1;

        // Pack nibbles: deinterleave even (hi) and odd (lo) positions from the
        // two 16-byte nibble vectors, then combine with shift + OR.
        let hi = u8x16_shuffle::<0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30>(nibbles0, nibbles1);
        let lo = u8x16_shuffle::<1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31>(nibbles0, nibbles1);
        let packed = v128_or(u8x16_shl(hi, 4), lo);

        // SAFETY: `byte_off + 16 <= byte_len`.
        unsafe {
            v128_store(dst.add(byte_off).cast(), packed);
        }
    }

    // Tail: delegate remaining bytes to scalar.
    let consumed_hex = chunks * 32;
    let consumed_bytes = chunks * 16;
    if consumed_hex < hex_len {
        let tail_byte_len = byte_len - consumed_bytes;
        // SAFETY: same pointer validity as above.
        if unsafe { scalar::decode_inner(src.add(consumed_hex), dst.add(consumed_bytes), tail_byte_len) }.is_err() {
            err_accum |= 1;
        }
    }

    if err_accum != 0 {
        return Err(InvalidEncoding);
    }

    Ok(())
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
/// for 16-byte chunks.
///
/// Processes all chunks without short-circuiting (constant-time).
/// Returns `true` iff all bytes are in `[0-9a-fA-F]`.
pub(crate) fn check(input: &[u8]) -> bool {
    let mut all_valid = true;

    let chunks = input.len() / 16;
    for i in 0..chunks {
        let src = &input[i * 16..];

        // SAFETY: at least 16 bytes remain.
        let v = unsafe { v128_load(src.as_ptr().cast()) };

        // Range check: three sub-ranges ORed together.
        let is_digit = v128_and(u8x16_ge(v, u8x16_splat(b'0')), u8x16_le(v, u8x16_splat(b'9')));
        let is_upper = v128_and(u8x16_ge(v, u8x16_splat(b'A')), u8x16_le(v, u8x16_splat(b'F')));
        let is_lower = v128_and(u8x16_ge(v, u8x16_splat(b'a')), u8x16_le(v, u8x16_splat(b'f')));

        let is_hex = v128_or(v128_or(is_digit, is_upper), is_lower);

        all_valid &= u8x16_all_true(is_hex);
    }

    // Tail: delegate remaining bytes to scalar.
    let done = chunks * 16;
    scalar::check(&input[done..]) & all_valid
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::test_support::exercise_backend;

    #[test]
    fn wasm_matches_scalar_oracle() {
        exercise_backend(
            |input, output| unsafe { encode::<false>(input.as_ptr(), output.as_mut_ptr().cast(), input.len()) },
            |input, output| unsafe { encode::<true>(input.as_ptr(), output.as_mut_ptr().cast(), input.len()) },
            |input, output| unsafe {
                decode(input.as_ptr(), output.as_mut_ptr().cast(), output.len())
                    .map_err(|_| crate::error::Error::InvalidEncoding)
            },
            check,
        );
    }
}
