//! Scalar (non-SIMD) hex encoding and decoding backend.
//!
//! # Encoding algorithm
//!
//! Uses a 16-byte lookup table (`HEX_LOWER` / `HEX_UPPER`) indexed by
//! nibble value. For each input byte:
//! 1. High nibble: `table[byte >> 4]` → first hex character.
//! 2. Low nibble:  `table[byte & 0x0F]` → second hex character.
//!
//! This is the simplest and most portable approach. SIMD backends (added later)
//! use the same algorithm but with `pshufb`/`tbl`/`swizzle` to process 16+ bytes
//! at once with the lookup table held in a SIMD register.
//!
//! # Decoding algorithm
//!
//! Uses a 256-byte lookup table (`DECODE_LUT`) that maps each ASCII byte to
//! its nibble value (0–15) or `NIL` (0xFF) for invalid characters. For each
//! pair of input hex characters:
//! 1. `hi = DECODE_LUT[pair[0]]`, `lo = DECODE_LUT[pair[1]]`
//! 2. If either is `NIL`, return `InvalidChar` error.
//! 3. Combine: `(hi << 4) | lo` → one output byte.
//!
//! # Constant-time considerations
//!
//! This backend is **not** constant-time: it uses memory-indexed lookup tables
//! (susceptible to cache-timing side channels) and returns early on the first
//! invalid character. The `ct` module (added later) provides constant-time
//! alternatives using branchless arithmetic.

use crate::error::Error;

/// 16-byte lookup table mapping nibble values (0–15) to lowercase ASCII hex
/// characters (`b'0'..=b'9'`, `b'a'..=b'f'`).
///
/// Indexed by `byte >> 4` (high nibble) or `byte & 0x0f` (low nibble).
const HEX_LOWER: [u8; 16] = *b"0123456789abcdef";

/// Same as `HEX_LOWER` but with uppercase letters (`b'A'..=b'F'`).
const HEX_UPPER: [u8; 16] = *b"0123456789ABCDEF";

/// Sentinel value stored in `DECODE_LUT` for bytes that are not valid hex characters.
const NIL: u8 = u8::MAX;

/// 256-byte lookup table mapping ASCII byte values to nibble values (0–15).
///
/// # Algorithm
///
/// For each of the three valid hex character ranges:
/// - `b'0'..=b'9'` → maps to `0..=9`
/// - `b'a'..=b'f'` → maps to `10..=15`
/// - `b'A'..=b'F'` → maps to `10..=15`
///
/// All other entries are `NIL` (`0xFF`), allowing callers to detect invalid
/// characters by comparing the lookup result against `NIL`.
///
/// Both uppercase and lowercase letters map to the same nibble values,
/// so decoding is case-insensitive.
const DECODE_LUT: [u8; 256] = {
    let mut lut = [NIL; 256];
    // b'0' (0x30) ..= b'9' (0x39) → 0..=9
    let mut i = 0u8;
    loop {
        lut[b'0'.wrapping_add(i) as usize] = i;
        if i == 9 {
            break;
        }
        i += 1;
    }
    // b'a' (0x61) ..= b'f' (0x66) → 10..=15
    // b'A' (0x41) ..= b'F' (0x46) → 10..=15
    let mut i = 0u8;
    loop {
        lut[b'a'.wrapping_add(i) as usize] = 10 + i;
        lut[b'A'.wrapping_add(i) as usize] = 10 + i;
        if i == 5 {
            break;
        }
        i += 1;
    }
    lut
};

/// Scalar hex encoder using a 16-byte lookup table.
///
/// # Algorithm
///
/// For each input byte, splits it into a high nibble (`byte >> 4`) and a low
/// nibble (`byte & 0x0F`), then indexes into `HEX_LOWER` or `HEX_UPPER` to
/// produce two ASCII hex characters.
///
/// # Safety
///
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len * 2` bytes.
/// - The `src[..byte_len]` and `dst[..byte_len * 2]` regions must not overlap.
#[inline]
pub unsafe fn encode_inner<const UPPER: bool>(src: *const u8, dst: *mut u8, byte_len: usize) {
    let table = if UPPER { HEX_UPPER } else { HEX_LOWER };
    for i in 0..byte_len {
        // SAFETY: `i < byte_len` so `src.add(i)` is in bounds for reads
        // and `dst.add(i * 2 + {0,1})` is in bounds for writes.
        let byte = unsafe { src.add(i).read() };
        unsafe { dst.add(i * 2).write(table[usize::from(byte >> 4)]) };
        unsafe { dst.add(i * 2 + 1).write(table[usize::from(byte & 0x0f)]) };
    }
}

/// See [`encode_inner`].
pub unsafe fn encode<const UPPER: bool>(src: *const u8, dst: *mut u8, byte_len: usize) {
    unsafe { encode_inner::<UPPER>(src, dst, byte_len) }
}

/// Scalar hex decoder using a 256-byte lookup table.
///
/// # Algorithm
///
/// For each pair of input hex ASCII bytes, looks up both in `DECODE_LUT`.
/// If either maps to `NIL`, returns `InvalidChar` with the offending byte
/// and its index. Otherwise combines the two nibbles: `(hi << 4) | lo`.
///
/// All elements of `dst[..byte_len]` are initialized on `Ok`.
///
/// # Safety
///
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[inline]
pub unsafe fn decode_inner(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), Error> {
    for i in 0..byte_len {
        // SAFETY: `i < byte_len` so `src.add(i * 2 + {0,1})` is in bounds
        // for reads and `dst.add(i)` is in bounds for writes.
        let b0 = unsafe { src.add(i * 2).read() };
        let b1 = unsafe { src.add(i * 2 + 1).read() };
        let hi = DECODE_LUT[b0 as usize];
        let lo = DECODE_LUT[b1 as usize];
        if (hi | lo) == NIL {
            // Determine which nibble was invalid for the error message.
            if hi == NIL {
                return Err(Error::InvalidChar { byte: b0, index: i * 2 });
            }
            return Err(Error::InvalidChar { byte: b1, index: i * 2 + 1 });
        }
        unsafe { dst.add(i).write((hi << 4) | lo) };
    }
    Ok(())
}

/// See [`decode_inner`].
pub unsafe fn decode(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), Error> {
    unsafe { decode_inner(src, dst, byte_len) }
}

/// Check if every byte in `input` is a valid hex ASCII character.
///
/// Uses `DECODE_LUT`: a byte is valid iff its LUT entry is not `NIL`.
#[inline]
pub fn check(input: &[u8]) -> bool {
    input.iter().all(|&b| DECODE_LUT[b as usize] != NIL)
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Verify `DECODE_LUT` maps digits correctly.
    #[test]
    fn decode_lut_digits() {
        for (i, ch) in (b'0'..=b'9').enumerate() {
            assert_eq!(DECODE_LUT[ch as usize], i as u8, "LUT wrong for '{}'", ch as char);
        }
    }

    /// Verify `DECODE_LUT` maps lowercase letters correctly.
    #[test]
    fn decode_lut_lowercase() {
        for (i, ch) in (b'a'..=b'f').enumerate() {
            assert_eq!(
                DECODE_LUT[ch as usize],
                (10 + i) as u8,
                "LUT wrong for '{}'",
                ch as char
            );
        }
    }

    /// Verify `DECODE_LUT` maps uppercase letters correctly.
    #[test]
    fn decode_lut_uppercase() {
        for (i, ch) in (b'A'..=b'F').enumerate() {
            assert_eq!(
                DECODE_LUT[ch as usize],
                (10 + i) as u8,
                "LUT wrong for '{}'",
                ch as char
            );
        }
    }

    /// Verify `DECODE_LUT` rejects all non-hex bytes.
    #[test]
    fn decode_lut_rejects_non_hex() {
        for byte in 0..=255u8 {
            let expected_valid = byte.is_ascii_hexdigit();
            let is_valid = DECODE_LUT[byte as usize] != NIL;
            assert_eq!(
                is_valid,
                expected_valid,
                "LUT mismatch for byte 0x{byte:02x} ('{}'), expected valid={expected_valid} got valid={is_valid}",
                if byte.is_ascii_graphic() { byte as char } else { '.' }
            );
        }
    }

    /// Verify boundary bytes just outside valid hex ranges are rejected.
    #[test]
    fn decode_lut_boundaries() {
        // Just below '0'
        assert_eq!(DECODE_LUT[b'/' as usize], NIL);
        // Just above '9'
        assert_eq!(DECODE_LUT[b':' as usize], NIL);
        // Just below 'A'
        assert_eq!(DECODE_LUT[b'@' as usize], NIL);
        // Just above 'F'
        assert_eq!(DECODE_LUT[b'G' as usize], NIL);
        // Just below 'a'
        assert_eq!(DECODE_LUT[b'`' as usize], NIL);
        // Just above 'f'
        assert_eq!(DECODE_LUT[b'g' as usize], NIL);
    }
}
