//! Scalar hex encoding, decoding, and validation backend.
//!
//! All operations use branchless arithmetic — no lookup tables (eliminating
//! cache-timing side channels) and no data-dependent early returns (preventing
//! timing oracles on secret key material).
//!
//! # Encoding
//!
//! Nibble-to-ASCII conversion is done with a conditional add:
//! ```text
//! ret = nibble + 0x30      // '0' for nibble=0 … '9' for nibble=9
//! if ret > '9':            // i.e. nibble >= 10
//!     ret += 0x07 (upper) or 0x27 (lower)   // land on 'A'/'a'
//! ```
//! The branch-free form propagates the sign bit of `(0x39 - ret)` as a mask.
//!
//! # Decoding
//!
//! Each input byte is case-folded (`b & !0x20`) to merge upper/lowercase letter
//! ranges, then tested against two ranges (`'0'-'9'` and `'A'-'F'`/`'a'-'f'`).
//! Invalid bytes produce a value with bit 8 set (i.e. > 0xFF when treated as
//! u16), which is accumulated via `err |= val >> 8`. The function processes
//! **all** bytes before returning.
//!
//! # Validation
//!
//! `check` re-uses `decode_nibble` and ORs the high bits of every result,
//! returning `false` iff any high bit was ever set.

/// Branchless nibble-to-ASCII encoder (no LUT).
///
/// Maps `nibble ∈ 0..=15` to the corresponding hex ASCII byte.
/// - If `offset == 0x07`: `'0'-'9'`, `'A'-'F'` (uppercase).
/// - If `offset == 0x27`: `'0'-'9'`, `'a'-'f'` (lowercase).
///
/// The offset distinguishes upper/lower: uppercase needs `+7` past `'9'`
/// to reach `'A'`; lowercase needs `+39` (`0x27`) to reach `'a'`.
#[inline(always)]
#[allow(dead_code)]
const fn encode_nibble(nibble: u8, offset: u8) -> u8 {
    debug_assert!(
        offset == 0x07 || offset == 0x27,
        "offset must be 0x07 for upper or 0x27 for lower"
    );
    let mut ret = nibble as i16 + 0x30;
    // If ret > 0x39 ('9'), (0x39 - ret) is negative → its high byte is 0xFF.
    // We mask `offset` with that and add it to shift into the letter range.
    ret += ((0x39i16 - ret) >> 8) & (offset as i16);
    ret as u8
}

/// Branchless ASCII-to-nibble decoder with case-folding (no LUT).
///
/// Returns the nibble value in `0..=15` when the byte is valid hex, or a
/// value `> 0xFF` (bit 8 set) when `byte` is not a valid hex character.
///
/// Uses a case-fold trick (`b & !0x20`) to merge uppercase and lowercase
/// letter ranges into a single check, reducing three range tests to two:
/// - `'0'-'9'` (0x30..=0x39): `b - 47` masked by `(0x2F-b)>>8 & (b-0x3A)>>8`
/// - `'A'-'F'` / `'a'-'f'`: fold via `upper = b & !0x20`, then `upper - 54`
///   masked by `(0x40-upper)>>8 & (upper-0x47)>>8`
///
/// The initial `ret = -1` makes an invalid byte produce `≤ -1` (bit 8 set in
/// i16), which callers detect by checking `ret >> 8` (non-zero ⇒ invalid).
#[inline(always)]
const fn decode_nibble(byte: u8) -> u16 {
    let b = byte as i16;
    let upper = b & !0x20; // 'a'-'f' → 'A'-'F', digits unchanged
    let mut ret: i16 = -1;
    // '0'..='9': 0x30..=0x39
    ret += (((0x2Fi16 - b) & (b - 0x3A)) >> 8) & (b - 47);
    // 'A'-'F' + 'a'-'f' via case-fold
    ret += (((0x40i16 - upper) & (upper - 0x47)) >> 8) & (upper - 54);
    ret as u16
}

/// Constant-time hex encoder.
///
/// Encodes every byte of `input` into exactly two hex ASCII characters written
/// into `output`. Uses branchless nibble arithmetic; no lookup table.
///
/// # Safety
///
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len * 2` bytes.
/// - The `src[..byte_len]` and `dst[..byte_len * 2]` regions must not overlap.
#[inline]
#[allow(dead_code)]
pub const unsafe fn encode_inner(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize, upper: bool) {
    // 0x07 for upper, 0x27 for lower; passed to `encode_nibble` to select case.
    let offset = if upper { 0x07 } else { 0x27 };
    while byte_len != 0 {
        // SAFETY: `i < byte_len` so `src.add(i)` is in bounds for reads
        // and `dst.add(i * 2 + {0,1})` is in bounds for writes.
        unsafe {
            let byte = src.read();
            src = src.add(1);
            dst.write(encode_nibble(byte >> 4, offset));
            dst = dst.add(1);
            dst.write(encode_nibble(byte & 0x0F, offset));
            dst = dst.add(1);
            byte_len -= 1;
        }
    }
}

/// See [`encode_inner`].
///
/// # Safety
///
/// Same requirements as [`encode_inner`].
#[allow(dead_code)]
pub const unsafe fn encode(src: *const u8, dst: *mut u8, byte_len: usize, upper: bool) {
    unsafe { encode_inner(src, dst, byte_len, upper) }
}

/// Constant-time hex decoder.
///
/// Processes **all** bytes before returning — no early exit on invalid
/// characters. Error information is accumulated in a single flag; the exact
/// position of the first invalid byte is intentionally not revealed to avoid
/// timing side-channels.
///
/// Returns a status that is valid/success iff every byte was valid hex ASCII.
///
/// All elements of `dst[..byte_len]` are initialized on return (even on `Err`).
///
/// # Safety
///
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[inline(always)]
pub const unsafe fn decode(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize) -> super::Status {
    let mut err: u8 = 0;

    while byte_len != 0 {
        // SAFETY: `i < byte_len` so `src.add(i * 2 + {0,1})` is in bounds
        // for reads and `dst.add(i)` is in bounds for writes.
        let hi = decode_nibble(unsafe { src.read() });
        src = unsafe { src.add(1) };
        let lo = decode_nibble(unsafe { src.read() });
        src = unsafe { src.add(1) };
        err |= (hi >> 8) as u8;
        err |= (lo >> 8) as u8;
        unsafe { dst.write(((hi << 4) | lo) as u8) };
        dst = unsafe { dst.add(1) };
        byte_len -= 1;
    }

    super::Status::from_u8_error_accum(err)
}

/// Constant-time hex validator returning the backend status.
///
/// Returns the default/zero status iff every byte in `input` is a valid hex
/// ASCII character.
/// Used by SIMD backends to compose tail validation, and by CT tests to
/// observe the validity bit only after explicit unpoisoning (avoiding an
/// internal `== 0` branch on poisoned data).
#[inline]
#[doc(hidden)]
pub const fn check(mut input: &[u8]) -> super::Status {
    let mut err: u16 = 0;
    while let Some((&byte, rest)) = input.split_first() {
        // `decode_nibble` returns 0..=15 for valid bytes and a value with
        // bit 8 set for invalid ones. Shift right to isolate the error bit
        // — otherwise valid nibbles (e.g. 'd' → 13) would make `err != 0`.
        err |= decode_nibble(byte) >> 8;
        input = rest;
    }
    super::Status::from_u16_error_accum(err)
}

#[cfg(test)]
mod tests {
    use super::*;

    // Expected lowercase hex digits for nibbles 0..=15.
    const LOWER_EXPECTED: [u8; 16] = *b"0123456789abcdef";
    // Expected uppercase hex digits for nibbles 0..=15.
    const UPPER_EXPECTED: [u8; 16] = *b"0123456789ABCDEF";

    #[test]
    fn encode_nibble_lower_all_values() {
        for nibble in 0u8..=15 {
            assert_eq!(
                encode_nibble(nibble, 0x27),
                LOWER_EXPECTED[nibble as usize],
                "lower nibble {nibble}"
            );
        }
    }

    #[test]
    fn encode_nibble_upper_all_values() {
        for nibble in 0u8..=15 {
            assert_eq!(
                encode_nibble(nibble, 0x07),
                UPPER_EXPECTED[nibble as usize],
                "upper nibble {nibble}"
            );
        }
    }

    #[test]
    fn decode_nibble_valid_bytes() {
        // '0'..'9' → 0..9
        for (i, b) in (b'0'..=b'9').enumerate() {
            let val = decode_nibble(b);
            assert_eq!(val, i as u16, "digit byte 0x{b:02x}");
        }
        // 'a'..'f' → 10..15
        for (i, b) in (b'a'..=b'f').enumerate() {
            let val = decode_nibble(b);
            assert_eq!(val, (10 + i) as u16, "lower byte 0x{b:02x}");
        }
        // 'A'..'F' → 10..15
        for (i, b) in (b'A'..=b'F').enumerate() {
            let val = decode_nibble(b);
            assert_eq!(val, (10 + i) as u16, "upper byte 0x{b:02x}");
        }
    }

    #[test]
    fn decode_nibble_invalid_bytes() {
        // Every byte not in [0-9a-fA-F] must have bit 8 set.
        for byte in 0u8..=255 {
            let valid = byte.is_ascii_hexdigit();
            let val = decode_nibble(byte);
            if valid {
                // Valid bytes produce a value in 0..=15 with no high bits set.
                assert!(val <= 15, "valid byte 0x{byte:02x} produced out-of-range nibble {val}");
            } else {
                // Invalid bytes must signal error via high bit.
                assert!(
                    (val >> 8) != 0,
                    "invalid byte 0x{byte:02x} did not set high bit (got {val})"
                );
            }
        }
    }

    #[test]
    fn encode_roundtrip() {
        // Build all 256 input bytes.
        let mut input = [0u8; 256];
        for (i, item) in input.iter_mut().enumerate() {
            *item = i as u8;
        }

        let mut upper_out = [0u8; 512];
        let mut lower_out = [0u8; 512];
        // SAFETY: pointers derived from fixed-size arrays with correct lengths.
        unsafe {
            encode(input.as_ptr(), upper_out.as_mut_ptr(), input.len(), true);
            encode(input.as_ptr(), lower_out.as_mut_ptr(), input.len(), false);
        }

        // Decode back and compare.
        let mut decoded = [0u8; 256];
        // SAFETY: pointers derived from fixed-size arrays with correct lengths.
        assert!(
            unsafe { decode(upper_out.as_ptr(), decoded.as_mut_ptr(), decoded.len()) }.to_bool_vartime(),
            "upper decode failed"
        );
        assert_eq!(decoded, input, "upper roundtrip");

        let mut decoded2 = [0u8; 256];
        // SAFETY: pointers derived from fixed-size arrays with correct lengths.
        assert!(
            unsafe { decode(lower_out.as_ptr(), decoded2.as_mut_ptr(), decoded2.len()) }.to_bool_vartime(),
            "lower decode failed"
        );
        assert_eq!(decoded2, input, "lower roundtrip");
    }

    #[test]
    fn decode_invalid_returns_error() {
        // A single invalid byte anywhere must mark the status invalid.
        let input = b"0g"; // 'g' is not valid hex
        let mut out = [0u8; 1];
        // SAFETY: pointers derived from valid arrays with correct lengths.
        assert!(!unsafe { decode(input.as_ptr(), out.as_mut_ptr(), out.len()) }.to_bool_vartime());
    }

    #[test]
    fn decode_processes_all_bytes() {
        // Even if the first byte is invalid, decode must not short-circuit.
        // We verify this indirectly by checking that multiple invalid inputs
        // all return the same Err variant (no positional info leaks).
        let inputs: &[&[u8]] = &[b"zz", b"zg", b"gz"];
        for &inp in inputs {
            let mut out = [0u8; 1];
            // SAFETY: all inputs are 2 bytes, out is 1 byte.
            assert!(
                !unsafe { decode(inp.as_ptr(), out.as_mut_ptr(), out.len()) }.to_bool_vartime(),
                "input {:?}",
                inp
            );
        }
    }

    #[test]
    fn check_valid() {
        assert!(check(b"0123456789abcdefABCDEF").to_bool_vartime());
    }

    #[test]
    fn check_invalid() {
        assert!(!check(b"0g").to_bool_vartime());
        assert!(!check(b"zz").to_bool_vartime());
        // Boundary bytes just outside valid ranges.
        assert!(!check(b"/").to_bool_vartime()); // one below '0'
        assert!(!check(b":").to_bool_vartime()); // one above '9'
        assert!(!check(b"@").to_bool_vartime()); // one below 'A'
        assert!(!check(b"G").to_bool_vartime()); // one above 'F'
        assert!(!check(b"`").to_bool_vartime()); // one below 'a'
        assert!(!check(b"g").to_bool_vartime()); // one above 'f'
    }
}
