//! Tests for [`ToHex`] and [`FromHex`] traits.

use better_hex::{FromHex, ToHex};

#[test]
fn to_hex_write_hex_lowercase() {
    let data = [0xde, 0xad, 0xbe, 0xef];
    let mut buf = String::new();
    data.write_hex(&mut buf, false).unwrap();
    assert_eq!(buf, "deadbeef");
}

#[test]
fn to_hex_write_hex_uppercase() {
    let data = [0xde, 0xad, 0xbe, 0xef];
    let mut buf = String::new();
    data.write_hex(&mut buf, true).unwrap();
    assert_eq!(buf, "DEADBEEF");
}

#[test]
fn encode_hex_convenience() {
    let data = vec![0xca, 0xfe];
    let lower: String = data.encode_hex().unwrap();
    let upper: String = data.encode_hex_upper().unwrap();
    assert_eq!(lower, "cafe");
    assert_eq!(upper, "CAFE");
}

#[test]
fn to_hex_empty() {
    let data: &[u8] = &[];
    let mut buf = String::new();
    data.write_hex(&mut buf, false).unwrap();
    assert_eq!(buf, "");
}

#[test]
fn encode_hex_single_byte() {
    let data = [0x00_u8];
    let hex: String = data.encode_hex().unwrap();
    assert_eq!(hex, "00");
}

#[test]
fn encode_hex_all_bytes() {
    let data: Vec<u8> = (0u8..=255).collect();
    let hex: String = data.encode_hex().unwrap();
    assert_eq!(hex.len(), 512);
    assert_eq!(&hex[0..2], "00");
    assert_eq!(&hex[510..512], "ff");
}

#[test]
fn from_hex_vec() {
    let result = Vec::<u8>::from_hex("deadbeef").unwrap();
    assert_eq!(result, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_hex_array() {
    let result = <[u8; 4]>::from_hex("deadbeef").unwrap();
    assert_eq!(result, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_hex_array_wrong_length() {
    let result = <[u8; 4]>::from_hex("dead");
    assert!(result.is_err());
}

#[test]
fn from_hex_vec_odd_length() {
    let result = Vec::<u8>::from_hex("abc");
    assert!(result.is_err());
}

#[test]
fn from_hex_invalid_char() {
    let result = Vec::<u8>::from_hex("zzzz");
    assert!(result.is_err());
}

#[test]
fn from_hex_empty() {
    let result = Vec::<u8>::from_hex("").unwrap();
    assert!(result.is_empty());
}

#[test]
fn from_hex_mixed_case() {
    let result = Vec::<u8>::from_hex("DeAdBeEf").unwrap();
    assert_eq!(result, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_hex_accepts_str_ref() {
    let hex_string = String::from("cafe");
    let result = Vec::<u8>::from_hex(&hex_string).unwrap();
    assert_eq!(result, vec![0xca, 0xfe]);
}

#[test]
fn from_hex_accepts_bytes() {
    let result = Vec::<u8>::from_hex(b"cafe" as &[u8]).unwrap();
    assert_eq!(result, vec![0xca, 0xfe]);
}

#[test]
fn to_hex_roundtrip() {
    let original: Vec<u8> = (0u8..=255).collect();
    let hex: String = original.encode_hex().unwrap();
    let decoded = Vec::<u8>::from_hex(&hex).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn write_hex_appends_to_existing() {
    let mut buf = String::from("prefix:");
    [0xab_u8].write_hex(&mut buf, false).unwrap();
    assert_eq!(buf, "prefix:ab");
}
