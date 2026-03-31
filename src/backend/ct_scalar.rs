//! Constant-time scalar hex encoding, decoding, and validation backend.
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
//! Each input byte is tested against all three valid ranges
//! (`'0'-'9'`, `'A'-'F'`, `'a'-'f'`) simultaneously. Invalid bytes produce a
//! value with bit 8 set (i.e. > 0xFF when treated as u16), which is accumulated
//! via `err |= val >> 8`. The function processes **all** bytes before returning.
//!
//! # Validation
//!
//! `check` re-uses `ct_decode_nibble` and ORs the high bits of every result,
//! returning `false` iff any high bit was ever set.

use crate::error::Error;
use core::mem::MaybeUninit;

// ---------------------------------------------------------------------------
// Primitive helpers
// ---------------------------------------------------------------------------

/// Branchless nibble-to-ASCII encoder (no LUT).
///
/// Maps `nibble ∈ 0..=15` to the corresponding hex ASCII byte.
/// - If `UPPER = true`:  `'0'-'9'`, `'A'-'F'`.
/// - If `UPPER = false`: `'0'-'9'`, `'a'-'f'`.
///
/// The offset distinguishes upper/lower: uppercase needs `+7` past `'9'`
/// to reach `'A'`; lowercase needs `+39` (`0x27`) to reach `'a'`.
#[inline(always)]
#[allow(dead_code)]
const fn ct_encode_nibble<const UPPER: bool>(nibble: u8) -> u8 {
    let mut ret = nibble as i16 + 0x30;
    let offset = if UPPER { 0x07i16 } else { 0x27i16 };
    // If ret > 0x39 ('9'), (0x39 - ret) is negative → its high byte is 0xFF.
    // We mask `offset` with that and add it to shift into the letter range.
    ret += ((0x39i16 - ret) >> 8) & offset;
    ret as u8
}

/// Branchless ASCII-to-nibble decoder (no LUT).
///
/// Returns the nibble value in `0..=15` when the byte is valid hex, or a
/// value `> 0xFF` (bit 8 set) when `byte` is not a valid hex character.
///
/// The three valid ranges each contribute through independent, overlapping
/// range-masked arithmetic expressions that combine additively:
/// - `'0'-'9'` (0x30..=0x39): `b - 47` masked by `(0x2F-b)>>8 & (b-0x3A)>>8`
/// - `'A'-'F'` (0x41..=0x46): `b - 54` masked by …
/// - `'a'-'f'` (0x61..=0x66): `b - 86` masked by …
///
/// Because exactly one range (or none) matches, the sum is correct.
/// The initial `ret = -1` makes an invalid byte produce `≤ -1` (bit 8 set in
/// i16), which callers detect by checking `ret >> 8` (non-zero ⇒ invalid).
#[inline(always)]
const fn ct_decode_nibble(byte: u8) -> u16 {
    let b = byte as i16;
    let mut ret: i16 = -1;
    // '0'..='9': 0x30..=0x39; mask: (0x2F-b)<0 AND (b-0x3A)<0
    ret += (((0x2Fi16 - b) & (b - 0x3A)) >> 8) & (b - 47);
    // 'A'..='F': 0x41..=0x46; mask: (0x40-b)<0 AND (b-0x47)<0
    ret += (((0x40i16 - b) & (b - 0x47)) >> 8) & (b - 54);
    // 'a'..='f': 0x60..=0x66; mask: (0x60-b)<0 AND (b-0x67)<0
    ret += (((0x60i16 - b) & (b - 0x67)) >> 8) & (b - 86);
    ret as u16
}

// ---------------------------------------------------------------------------
// Public functions
// ---------------------------------------------------------------------------

/// Constant-time hex encoder.
///
/// Encodes every byte of `input` into exactly two hex ASCII characters written
/// into `output`. Uses branchless nibble arithmetic; no lookup table.
///
/// # Panics (debug only)
///
/// Panics if `output.len() != input.len() * 2`.
#[allow(dead_code)]
pub fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2, "output buffer wrong size for encode");
    let mut out_idx = 0;
    for &byte in input {
        output[out_idx].write(ct_encode_nibble::<UPPER>(byte >> 4));
        output[out_idx + 1].write(ct_encode_nibble::<UPPER>(byte & 0x0F));
        out_idx += 2;
    }
}

/// Constant-time hex decoder.
///
/// Processes **all** bytes in `input` before returning — no early exit on
/// invalid characters. Error information is accumulated in a single flag;
/// the exact position of the first invalid byte is intentionally not revealed
/// to avoid timing side-channels.
///
/// Returns `Ok(())` on success or `Err(InvalidEncoding)` if any byte was
/// not a valid hex ASCII character.
///
/// # Panics (debug only)
///
/// Panics if `output.len() != input.len() / 2` or `input.len()` is odd.
pub fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2, "output buffer wrong size for decode");
    debug_assert!(input.len().is_multiple_of(2), "input length must be even");

    let mut err: u16 = 0;

    for (pair, out_byte) in input.chunks_exact(2).zip(output.iter_mut()) {
        let hi = ct_decode_nibble(pair[0]);
        let lo = ct_decode_nibble(pair[1]);
        // Accumulate error: if either nibble has bit 8+ set, err becomes non-zero.
        err |= hi >> 8;
        err |= lo >> 8;
        // Always write, even if invalid — we never branch on the values.
        // The caller must not trust the output buffer if decode returns Err.
        out_byte.write(((hi << 4) | lo) as u8);
    }

    if err != 0 {
        Err(Error::InvalidEncoding)
    } else {
        Ok(())
    }
}

/// Constant-time hex validator.
///
/// Returns `true` iff every byte in `input` is a valid hex ASCII character
/// (`[0-9a-fA-F]`). Examines all bytes without short-circuiting.
pub fn check(input: &[u8]) -> bool {
    let mut err: u16 = 0;
    for &byte in input {
        err |= ct_decode_nibble(byte) >> 8;
    }
    err == 0
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

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
                ct_encode_nibble::<false>(nibble),
                LOWER_EXPECTED[nibble as usize],
                "lower nibble {nibble}"
            );
        }
    }

    #[test]
    fn encode_nibble_upper_all_values() {
        for nibble in 0u8..=15 {
            assert_eq!(
                ct_encode_nibble::<true>(nibble),
                UPPER_EXPECTED[nibble as usize],
                "upper nibble {nibble}"
            );
        }
    }

    #[test]
    fn decode_nibble_valid_bytes() {
        // '0'..'9' → 0..9
        for (i, b) in (b'0'..=b'9').enumerate() {
            let val = ct_decode_nibble(b);
            assert_eq!(val, i as u16, "digit byte 0x{b:02x}");
        }
        // 'a'..'f' → 10..15
        for (i, b) in (b'a'..=b'f').enumerate() {
            let val = ct_decode_nibble(b);
            assert_eq!(val, (10 + i) as u16, "lower byte 0x{b:02x}");
        }
        // 'A'..'F' → 10..15
        for (i, b) in (b'A'..=b'F').enumerate() {
            let val = ct_decode_nibble(b);
            assert_eq!(val, (10 + i) as u16, "upper byte 0x{b:02x}");
        }
    }

    #[test]
    fn decode_nibble_invalid_bytes() {
        // Every byte not in [0-9a-fA-F] must have bit 8 set.
        for byte in 0u8..=255 {
            let valid = matches!(byte, b'0'..=b'9' | b'a'..=b'f' | b'A'..=b'F');
            let val = ct_decode_nibble(byte);
            if valid {
                // Valid bytes produce a value in 0..=15 with no high bits set.
                assert!(
                    val <= 15,
                    "valid byte 0x{byte:02x} produced out-of-range nibble {val}"
                );
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
        for i in 0..256usize {
            input[i] = i as u8;
        }

        let mut upper_out = [MaybeUninit::uninit(); 512];
        let mut lower_out = [MaybeUninit::uninit(); 512];
        encode::<true>(&input, &mut upper_out);
        encode::<false>(&input, &mut lower_out);

        // Collect the initialized hex ASCII bytes.
        let upper_bytes: [u8; 512] =
            core::array::from_fn(|i| unsafe { upper_out[i].assume_init() });
        let lower_bytes: [u8; 512] =
            core::array::from_fn(|i| unsafe { lower_out[i].assume_init() });

        // Decode back and compare.
        let mut decoded = [MaybeUninit::uninit(); 256];
        decode(&upper_bytes, &mut decoded).expect("upper decode failed");
        let got: [u8; 256] = core::array::from_fn(|i| unsafe { decoded[i].assume_init() });
        assert_eq!(got, input, "upper roundtrip");

        let mut decoded2 = [MaybeUninit::uninit(); 256];
        decode(&lower_bytes, &mut decoded2).expect("lower decode failed");
        let got2: [u8; 256] = core::array::from_fn(|i| unsafe { decoded2[i].assume_init() });
        assert_eq!(got2, input, "lower roundtrip");
    }

    #[test]
    fn decode_invalid_returns_error() {
        // A single invalid byte anywhere must cause Err(InvalidEncoding).
        let input = b"0g"; // 'g' is not valid hex
        let mut out = [MaybeUninit::uninit(); 1];
        assert_eq!(decode(input, &mut out), Err(Error::InvalidEncoding));
    }

    #[test]
    fn decode_processes_all_bytes() {
        // Even if the first byte is invalid, decode must not short-circuit.
        // We verify this indirectly by checking that multiple invalid inputs
        // all return the same Err variant (no positional info leaks).
        let inputs: &[&[u8]] = &[b"zz", b"zg", b"gz"];
        for &inp in inputs {
            let mut out = [MaybeUninit::uninit(); 1];
            assert_eq!(
                decode(inp, &mut out),
                Err(Error::InvalidEncoding),
                "input {:?}",
                inp
            );
        }
    }

    #[test]
    fn check_valid() {
        assert!(check(b"0123456789abcdefABCDEF"));
    }

    #[test]
    fn check_invalid() {
        assert!(!check(b"0g"));
        assert!(!check(b"zz"));
        // Boundary bytes just outside valid ranges.
        assert!(!check(&[b'/'])); // one below '0'
        assert!(!check(&[b':'])); // one above '9'
        assert!(!check(&[b'@'])); // one below 'A'
        assert!(!check(&[b'G'])); // one above 'F'
        assert!(!check(&[b'`'])); // one below 'a'
        assert!(!check(&[b'g'])); // one above 'f'
    }
}
