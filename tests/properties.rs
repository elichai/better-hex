use proptest::prelude::*;

proptest! {
    #[test]
    fn roundtrip_encode_decode(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
        let decoded = better_hex::decode(&hex).unwrap();
        prop_assert_eq!(&decoded, &input);
    }

    #[test]
    fn encode_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
        for b in hex.bytes() {
            prop_assert!(
                matches!(b, b'0'..=b'9' | b'a'..=b'f'),
                "unexpected char: {} (0x{:02x})", b as char, b
            );
        }
    }

    #[test]
    fn encode_upper_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode_upper(&input);
        for b in hex.bytes() {
            prop_assert!(
                matches!(b, b'0'..=b'9' | b'A'..=b'F'),
                "unexpected char: {} (0x{:02x})", b as char, b
            );
        }
    }

    #[test]
    fn encode_length(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
        prop_assert_eq!(hex.len(), input.len() * 2);
    }

    #[test]
    fn check_accepts_encoded(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
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
            prop_assert!(better_hex::decode(&input).is_err());
        }
    }
}
