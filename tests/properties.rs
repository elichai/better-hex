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
