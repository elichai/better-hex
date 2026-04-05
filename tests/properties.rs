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
    #[test]
    fn roundtrip_encode_decode(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode(&input).unwrap();
        let decoded: Vec<u8> = better_hex::decode(&hex).unwrap();
        prop_assert_eq!(&decoded, &input);
    }

    #[test]
    fn encode_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode(&input).unwrap();
        for b in hex.bytes() {
            prop_assert!(
                matches!(b, b'0'..=b'9' | b'a'..=b'f'),
                "unexpected char: {} (0x{:02x})", b as char, b
            );
        }
    }

    #[test]
    fn encode_upper_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex: String = better_hex::encode_upper(&input).unwrap();
        for b in hex.bytes() {
            prop_assert!(
                matches!(b, b'0'..=b'9' | b'A'..=b'F'),
                "unexpected char: {} (0x{:02x})", b as char, b
            );
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
    fn hex_str_roundtrip(input in proptest::collection::vec(any::<u8>(), 32..=32)) {
        let arr: [u8; 32] = input.try_into().unwrap();
        let hex: better_hex::HexStr<32> = better_hex::HexStr::encode_lower(&arr);
        prop_assert_eq!(hex.decode(), arr);
    }

    #[test]
    fn decode_rejects_invalid(input in proptest::collection::vec(any::<u8>(), 2..64)) {
        // Random bytes are very unlikely to be valid hex
        if !better_hex::check(&input) {
            prop_assert!(better_hex::decode::<Vec<u8>>(&input).is_err());
        }
    }

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

    #[test]
    fn encode_matches_scalar_oracle(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        // Compare the dispatched (possibly SIMD) encode against scalar directly
        let dispatched: String = better_hex::encode(&input).unwrap();

        let hex_len = input.len() * 2;
        let mut scalar_out = vec![core::mem::MaybeUninit::<u8>::uninit(); hex_len];
        better_hex::bench_internals::scalar::encode::<false>(&input, &mut scalar_out);
        let scalar_hex: Vec<u8> = scalar_out.iter().map(|m| unsafe { m.assume_init() }).collect();

        prop_assert_eq!(dispatched.as_bytes(), &scalar_hex[..]);
    }

    #[test]
    fn decode_matches_scalar_oracle(input in proptest::collection::vec(any::<u8>(), 0..256)) {
        let hex: String = better_hex::encode(&input).unwrap();
        let hex_bytes = hex.as_bytes();

        let dispatched: Result<Vec<u8>, _> = better_hex::decode(hex_bytes);

        let mut scalar_out = vec![core::mem::MaybeUninit::<u8>::uninit(); input.len()];
        let scalar_result = better_hex::bench_internals::scalar::decode(hex_bytes, &mut scalar_out);

        match (dispatched, scalar_result) {
            (Ok(d_vec), Ok(())) => {
                let s_vec: Vec<u8> = scalar_out.iter().map(|m| unsafe { m.assume_init() }).collect();
                prop_assert_eq!(&d_vec, &s_vec);
            }
            (Err(_), Err(_)) => {}
            (a, b) => prop_assert!(false, "mismatch: dispatched={a:?}, scalar={b:?}"),
        }
    }

    #[test]
    fn check_matches_scalar_oracle(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let dispatched = better_hex::check(
            &input.iter().copied().chain(if input.len() % 2 == 1 { Some(b'0') } else { None }).collect::<Vec<_>>()
        );
        let scalar = better_hex::bench_internals::scalar::check(&input);
        // check() requires even length, scalar::check does not — only compare when even
        if input.len().is_multiple_of(2) {
            prop_assert_eq!(dispatched, scalar);
        }
    }

    #[test]
    fn ct_encode_matches_fast(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let fast: String = better_hex::encode(&input).unwrap();
        let mut ct_out = vec![0u8; input.len() * 2];
        let ct = better_hex::ct::encode_lower(&input, &mut ct_out).unwrap();
        prop_assert_eq!(ct, fast.as_str());
    }

    #[test]
    fn ct_decode_matches_fast(input in proptest::collection::vec(any::<u8>(), 0..256)) {
        let hex: String = better_hex::encode(&input).unwrap();
        let fast: Vec<u8> = better_hex::decode(&hex).unwrap();
        let mut ct_out = vec![0u8; input.len()];
        better_hex::ct::decode(hex.as_bytes(), &mut ct_out).unwrap();
        prop_assert_eq!(&ct_out, &fast);
    }

    #[test]
    fn ct_check_matches_fast(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let ct_result = better_hex::ct::check(&input);
        let scalar = better_hex::bench_internals::scalar::check(&input);
        prop_assert_eq!(ct_result, scalar);
    }
}
