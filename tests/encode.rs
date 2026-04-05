#[test]
fn encode_empty() {
    let mut out = [];
    better_hex::encode_to_slice(&[], &mut out).unwrap();
}

#[test]
fn encode_single_byte() {
    let mut out = [0u8; 2];
    let s = better_hex::encode_to_slice(&[0xab], &mut out).unwrap();
    assert_eq!(s, "ab");
}

#[test]
fn encode_upper_single_byte() {
    let mut out = [0u8; 2];
    let s = better_hex::encode_to_slice_upper(&[0xab], &mut out).unwrap();
    assert_eq!(s, "AB");
}

#[test]
fn encode_multiple_bytes() {
    let mut out = [0u8; 8];
    let s = better_hex::encode_to_slice(&[0xde, 0xad, 0xbe, 0xef], &mut out).unwrap();
    assert_eq!(s, "deadbeef");
}

#[test]
fn encode_all_zeros() {
    let mut out = [0u8; 6];
    let s = better_hex::encode_to_slice(&[0, 0, 0], &mut out).unwrap();
    assert_eq!(s, "000000");
}

#[test]
fn encode_all_ff() {
    let mut out = [0u8; 4];
    let s = better_hex::encode_to_slice(&[0xff, 0xff], &mut out).unwrap();
    assert_eq!(s, "ffff");
}

#[test]
fn encode_output_too_short() {
    let mut out = [0u8; 3];
    let err = better_hex::encode_to_slice(&[0xab, 0xcd], &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::InvalidLength { expected: 4, got: 3 });
}

#[test]
fn encode_every_nibble_value() {
    let input = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];
    let mut out = [0u8; 16];
    let s = better_hex::encode_to_slice(&input, &mut out).unwrap();
    assert_eq!(s, "0123456789abcdef");
}

#[test]
#[cfg(feature = "alloc")]
fn encode_string() {
    let Ok(s) = better_hex::encode::<String>(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(s, "deadbeef");
}

#[test]
#[cfg(feature = "alloc")]
fn encode_upper_string() {
    let Ok(s) = better_hex::encode_upper::<String>(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(s, "DEADBEEF");
}

#[test]
#[cfg(feature = "alloc")]
fn encode_empty_string() {
    let Ok(s) = better_hex::encode::<String>(&[]);
    assert_eq!(s, "");
}
