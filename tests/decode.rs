#[test]
fn decode_empty() {
    let mut out = [];
    better_hex::decode_to_slice(b"", &mut out).unwrap();
}

#[test]
fn decode_single_byte() {
    let mut out = [0u8; 1];
    better_hex::decode_to_slice(b"ab", &mut out).unwrap();
    assert_eq!(out, [0xab]);
}

#[test]
fn decode_uppercase() {
    let mut out = [0u8; 1];
    better_hex::decode_to_slice(b"AB", &mut out).unwrap();
    assert_eq!(out, [0xab]);
}

#[test]
fn decode_mixed_case() {
    let mut out = [0u8; 2];
    better_hex::decode_to_slice(b"aB1f", &mut out).unwrap();
    assert_eq!(out, [0xab, 0x1f]);
}

#[test]
fn decode_odd_length() {
    let mut out = [0u8; 1];
    let err = better_hex::decode_to_slice(b"abc", &mut out).unwrap_err();
    assert!(matches!(err, better_hex::Error::InvalidLength { .. }));
}

#[test]
fn decode_invalid_char() {
    let mut out = [0u8; 2];
    let err = better_hex::decode_to_slice(b"abGH", &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::InvalidChar { byte: b'G', index: 2 });
}

#[test]
fn decode_output_wrong_size() {
    let mut out = [0u8; 1];
    let err = better_hex::decode_to_slice(b"abcd", &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::InvalidLength { expected: 2, got: 4 });
}

#[test]
fn decode_to_array_works() {
    let result: [u8; 4] = better_hex::decode_to_array("deadbeef").unwrap();
    assert_eq!(result, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn check_valid() {
    assert!(better_hex::check(b"deadbeef"));
    assert!(better_hex::check(b"DEADBEEF"));
    assert!(better_hex::check(b"0123456789abcdefABCDEF"));
}

#[test]
fn check_invalid() {
    assert!(!better_hex::check(b"deadbeeG"));
    assert!(!better_hex::check(b"abc"));
}

#[test]
fn check_raw_valid() {
    assert!(better_hex::check_raw(b"abc"));
    assert!(better_hex::check_raw(b"0123456789abcdefABCDEF"));
}

#[test]
fn check_raw_invalid() {
    assert!(!better_hex::check_raw(b"abcG"));
}

#[test]
fn decode_boundary_chars() {
    let mut out = [0u8; 1];
    // Just below '0'
    assert!(better_hex::decode_to_slice(b"/0", &mut out).is_err());
    // Just above '9'
    assert!(better_hex::decode_to_slice(b":0", &mut out).is_err());
    // Just below 'A'
    assert!(better_hex::decode_to_slice(b"@0", &mut out).is_err());
    // Just above 'F'
    assert!(better_hex::decode_to_slice(b"G0", &mut out).is_err());
    // Just below 'a'
    assert!(better_hex::decode_to_slice(b"`0", &mut out).is_err());
    // Just above 'f'
    assert!(better_hex::decode_to_slice(b"g0", &mut out).is_err());
}

#[test]
fn decode_vec() {
    let v = better_hex::decode("deadbeef").unwrap();
    assert_eq!(v, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn decode_vec_empty() {
    let v = better_hex::decode("").unwrap();
    assert!(v.is_empty());
}

#[test]
fn decode_vec_odd() {
    assert!(better_hex::decode("abc").is_err());
}
