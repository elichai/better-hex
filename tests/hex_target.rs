//! Tests for [`HexTarget`] trait and [`encode_to`]/[`encode_upper_to`].

#[test]
fn encode_to_string_lowercase() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let result: Result<String, _> = better_hex::encode_to(&input);
    assert_eq!(result, Ok("deadbeef".to_string()));
}

#[test]
fn encode_to_string_uppercase() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let result: Result<String, _> = better_hex::encode_upper_to(&input);
    assert_eq!(result, Ok("DEADBEEF".to_string()));
}

#[test]
fn encode_to_string_empty() {
    let input: [u8; 0] = [];
    let result: Result<String, _> = better_hex::encode_to(&input);
    assert_eq!(result, Ok(String::new()));
}

#[test]
fn encode_to_string_single_byte() {
    let input = [0xff];
    let result: Result<String, _> = better_hex::encode_to(&input);
    assert_eq!(result, Ok("ff".to_string()));
}

#[test]
fn encode_to_string_all_zeros() {
    let input = [0u8; 32];
    let result: Result<String, _> = better_hex::encode_to(&input);
    assert_eq!(result, Ok("0".repeat(64)));
}

#[test]
fn encode_to_string_matches_encode() {
    let input: Vec<u8> = (0u8..=255).collect();
    let via_encode = better_hex::encode(&input);
    let via_encode_to: String = better_hex::encode_to(&input).unwrap();
    assert_eq!(via_encode, via_encode_to);
}

#[test]
fn encode_upper_to_string_matches_encode_upper() {
    let input: Vec<u8> = (0u8..=255).collect();
    let via_encode = better_hex::encode_upper(&input);
    let via_encode_to: String = better_hex::encode_upper_to(&input).unwrap();
    assert_eq!(via_encode, via_encode_to);
}

#[test]
fn encode_to_large_input() {
    let input = vec![0xab; 4096];
    let result: String = better_hex::encode_to(&input).unwrap();
    assert_eq!(result.len(), 8192);
    assert!(result.chars().all(|c| c == 'a' || c == 'b'));
}

/// `String::try_with_hex_len` always succeeds (heap-allocated), so `encode_to`
/// on a `String` target never returns `None` regardless of size.
#[test]
fn encode_to_string_never_returns_none() {
    let input = [0u8; 1];
    let result: Result<String, _> = better_hex::encode_to(&input);
    assert!(result.is_ok());
}

/// Roundtrip: encode_to then decode_to_array.
#[test]
fn encode_to_roundtrip() {
    let original = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];
    let hex: String = better_hex::encode_to(&original).unwrap();
    let decoded = better_hex::decode_to_array::<8>(&hex).unwrap();
    assert_eq!(decoded, original);
}
