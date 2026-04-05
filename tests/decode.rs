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
#[cfg(feature = "alloc")]
fn decode_vec() {
    let v = better_hex::decode("deadbeef").unwrap();
    assert_eq!(v, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
#[cfg(feature = "alloc")]
fn decode_vec_empty() {
    let v = better_hex::decode("").unwrap();
    assert!(v.is_empty());
}

#[test]
#[cfg(feature = "alloc")]
fn decode_vec_odd() {
    assert!(better_hex::decode("abc").is_err());
}

#[test]
#[cfg(feature = "alloc")]
fn decode_to_vec() {
    let v: Vec<u8> = better_hex::decode_to("deadbeef").unwrap();
    assert_eq!(v, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn decode_to_array() {
    let a: [u8; 4] = better_hex::decode_to("deadbeef").unwrap();
    assert_eq!(a, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
#[cfg(feature = "alloc")]
fn invalid_char_index_after_simd_chunk() {
    // 64 hex chars = 32 bytes output. Put invalid byte at position 33.
    let mut hex = better_hex::encode(&[0u8; 32]).into_bytes();
    hex[33] = b'G';
    let mut out = [0u8; 32];
    match better_hex::decode_to_slice(&hex, &mut out) {
        Err(better_hex::Error::InvalidChar { byte: b'G', index: 33 }) => {}
        other => panic!("expected InvalidChar at index 33, got {other:?}"),
    }
}

#[test]
#[cfg(feature = "alloc")]
fn invalid_char_index_in_tail() {
    // 34 hex chars = 17 bytes output. Put invalid byte at position 33 (in the tail).
    let mut hex = better_hex::encode(&[0u8; 17]).into_bytes();
    hex[33] = b'G';
    let mut out = [0u8; 17];
    match better_hex::decode_to_slice(&hex, &mut out) {
        Err(better_hex::Error::InvalidChar { byte: b'G', index: 33 }) => {}
        other => panic!("expected InvalidChar at index 33, got {other:?}"),
    }
}

#[test]
#[cfg(feature = "alloc")]
fn ct_decode_processes_all_bytes() {
    // Put invalid bytes at start and end — CT should process all
    let mut hex = better_hex::encode(&[0u8; 32]).into_bytes();
    hex[0] = b'G';
    hex[63] = b'G';
    let mut out = [0u8; 32];
    // CT decode should still return InvalidEncoding (not crash or skip tail)
    assert_eq!(
        better_hex::ct::decode(&hex, &mut out).unwrap_err(),
        better_hex::Error::InvalidEncoding,
    );
}
