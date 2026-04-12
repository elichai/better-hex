//! Property-based tests covering all public APIs.
//!
//! These tests verify algebraic properties (roundtrips, output invariants,
//! cross-path equivalence) over random inputs.

#![cfg(feature = "alloc")]

use proptest::prelude::*;

/// Naive reference encoder — the simplest possible implementation.
fn naive_encode_lower(input: &[u8]) -> Vec<u8> {
    let mut out = Vec::with_capacity(input.len() * 2);
    for &byte in input {
        out.push(b"0123456789abcdef"[(byte >> 4) as usize]);
        out.push(b"0123456789abcdef"[(byte & 0x0f) as usize]);
    }
    out
}

/// Naive reference decoder.
fn naive_decode(input: &[u8]) -> Option<Vec<u8>> {
    if !input.len().is_multiple_of(2) {
        return None;
    }
    let mut out = Vec::with_capacity(input.len() / 2);
    for pair in input.chunks_exact(2) {
        let hi = naive_nibble(pair[0])?;
        let lo = naive_nibble(pair[1])?;
        out.push((hi << 4) | lo);
    }
    Some(out)
}

fn naive_nibble(b: u8) -> Option<u8> {
    match b {
        b'0'..=b'9' => Some(b - b'0'),
        b'a'..=b'f' => Some(b - b'a' + 10),
        b'A'..=b'F' => Some(b - b'A' + 10),
        _ => None,
    }
}

proptest! {
    // ── roundtrip ────────────────────────────────────────────────────────────

    #[test]
    fn roundtrip_encode_decode(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode(&input).unwrap();
        let decoded: Vec<u8> = better_hex::decode(&hex).unwrap();
        prop_assert_eq!(&decoded, &input);
    }

    // ── output invariants ────────────────────────────────────────────────────

    #[test]
    fn encode_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode(&input).unwrap();
        for b in hex.bytes() {
            prop_assert!(matches!(b, b'0'..=b'9' | b'a'..=b'f'));
        }
    }

    #[test]
    fn encode_upper_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode_upper(&input).unwrap();
        for b in hex.bytes() {
            prop_assert!(matches!(b, b'0'..=b'9' | b'A'..=b'F'));
        }
    }

    #[test]
    fn encode_length(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode(&input).unwrap();
        prop_assert_eq!(hex.len(), input.len() * 2);
    }

    #[test]
    fn check_accepts_encoded(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode(&input).unwrap();
        prop_assert!(better_hex::check(hex.as_bytes()));
    }

    #[test]
    fn decode_rejects_invalid(input in proptest::collection::vec(any::<u8>(), 2..64)) {
        if !better_hex::check(&input) {
            prop_assert!(better_hex::decode::<Vec<u8>>(&input).is_err());
        }
    }

    // ── naive oracle ─────────────────────────────────────────────────────────

    #[test]
    fn encode_matches_naive(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let library: String = better_hex::encode(&input).unwrap();
        let naive = naive_encode_lower(&input);
        prop_assert_eq!(library.as_bytes(), &naive[..]);
    }

    #[test]
    fn decode_matches_naive(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode(&input).unwrap();
        let library: Vec<u8> = better_hex::decode(&hex).unwrap();
        let naive = naive_decode(hex.as_bytes()).unwrap();
        prop_assert_eq!(&library, &naive);
    }

    // ── display ──────────────────────────────────────────────────────────────

    #[test]
    fn display_matches_encode(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let encoded: String = better_hex::encode(&input).unwrap();
        let displayed = format!("{}", better_hex::display(&input));
        prop_assert_eq!(displayed, encoded);
    }

    #[test]
    fn display_upper_matches_encode_upper(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let encoded: String = better_hex::encode_upper(&input).unwrap();
        let displayed = format!("{:X}", better_hex::display(&input));
        prop_assert_eq!(displayed, encoded);
    }

    // ── invalid-input decode ─────────────────────────────────────────────────

    /// Arbitrary even-length byte slices: library and naive decoder must agree.
    #[test]
    fn decode_arbitrary_matches_naive(input in proptest::collection::vec(any::<u8>(), 0..512)
                                         .prop_filter("even length", |v| v.len() % 2 == 0))
    {
        let lib_result = better_hex::decode::<Vec<u8>>(&input);
        let naive_result = naive_decode(&input);
        match (lib_result, naive_result) {
            (Ok(lib), Some(naive)) => prop_assert_eq!(lib, naive),
            (Err(_), None) => { /* both agree it's invalid */ }
            (Ok(lib), None) => {
                prop_assert!(false, "library accepted input that naive rejects: {:?} -> {:?}", &input, lib);
            }
            (Err(e), Some(naive)) => {
                prop_assert!(false, "library rejected input that naive accepts: {:?} -> {:?}, err: {}", &input, naive, e);
            }
        }
    }

    /// For valid hex, inject an invalid byte at each position -> must get InvalidEncoding.
    #[test]
    fn decode_injected_invalid_byte(input in proptest::collection::vec(any::<u8>(), 1..64),
                                    inject_offset in 0usize..128)
    {
        let hex: String = better_hex::encode(&input).unwrap();
        let hex_bytes = hex.as_bytes();
        if hex_bytes.is_empty() {
            return Ok(());
        }
        let pos = inject_offset % hex_bytes.len();
        let mut bad = hex_bytes.to_vec();
        bad[pos] = b'Z'; // never a valid hex char
        let result = better_hex::decode::<Vec<u8>>(&bad);
        prop_assert!(result.is_err(), "decode should reject invalid byte at pos {}", pos);
        prop_assert_eq!(result.unwrap_err(), better_hex::Error::InvalidEncoding);
    }

    /// HexStr::from_str with arbitrary strings.
    #[test]
    fn hex_str_from_str_arbitrary(s in "\\PC{0,20}") {
        let result = s.parse::<better_hex::HexStr<8>>();
        // Must either succeed with valid round-trip, or fail.
        match result {
            Ok(hex) => {
                // If it parsed, the decoded bytes re-encoded must match.
                let decoded = hex.decode();
                let re_encoded: better_hex::HexStr<8> = better_hex::HexStr::encode_lower(&decoded);
                // The input might have been uppercase, so compare case-insensitively.
                prop_assert_eq!(hex.as_str().to_ascii_lowercase(), re_encoded.as_str().to_ascii_lowercase());
            }
            Err(_) => { /* rejection is fine */ }
        }
    }

    /// PrefixedHexStr::from_str with arbitrary strings.
    #[test]
    fn prefixed_hex_str_from_str_arbitrary(s in "\\PC{0,24}") {
        let result = s.parse::<better_hex::PrefixedHexStr<8>>();
        match result {
            Ok(hex) => {
                // If it parsed, must start with "0x" and the hex body must round-trip.
                prop_assert!(hex.as_str().starts_with("0x"), "parsed PrefixedHexStr missing 0x prefix");
                let decoded = hex.decode();
                let re_encoded: better_hex::PrefixedHexStr<8> = better_hex::HexStr::encode_lower(&decoded);
                prop_assert_eq!(hex.as_str().to_ascii_lowercase(), re_encoded.as_str().to_ascii_lowercase());
            }
            Err(_) => { /* rejection is fine */ }
        }
    }

    // ── serde ────────────────────────────────────────────────────────────────

    #[test]
    #[cfg(feature = "serde")]
    fn serde_roundtrip_vec(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        use serde::{Serialize, Deserialize};
        #[derive(Serialize, Deserialize, PartialEq, Debug)]
        struct W { #[serde(with = "better_hex::serde")] data: Vec<u8> }

        let original = W { data: input };
        let json = serde_json::to_string(&original).unwrap();
        let decoded: W = serde_json::from_str(&json).unwrap();
        prop_assert_eq!(decoded, original);
    }

}
