use better_hex::ct;

#[test]
fn ct_encode_lower_matches_fast() {
    let input: Vec<u8> = (0..=255).collect();
    let mut ct_out = vec![0u8; 512];
    let mut fast_out = vec![0u8; 512];
    ct::encode_lower(&input, &mut ct_out).unwrap();
    better_hex::encode_to_slice(&input, &mut fast_out).unwrap();
    assert_eq!(ct_out, fast_out);
}

#[test]
fn ct_encode_upper_matches_fast() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let mut ct_out = [0u8; 8];
    let mut fast_out = [0u8; 8];
    ct::encode_upper(&input, &mut ct_out).unwrap();
    better_hex::encode_to_slice_upper(&input, &mut fast_out).unwrap();
    assert_eq!(ct_out, fast_out);
}

#[test]
fn ct_decode_matches_fast() {
    let hex = b"deadbeef0123456789abcdef";
    let mut ct_out = [0u8; 12];
    let mut fast_out = [0u8; 12];
    ct::decode(hex, &mut ct_out).unwrap();
    better_hex::decode_to_slice(hex, &mut fast_out).unwrap();
    assert_eq!(ct_out, fast_out);
}

#[test]
fn ct_decode_to_array() {
    let result: [u8; 4] = ct::decode_to_array(b"DeAdBeEf").unwrap();
    assert_eq!(result, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn ct_decode_invalid_returns_invalid_encoding() {
    let mut out = [0u8; 2];
    let err = ct::decode(b"abGH", &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::InvalidEncoding);
}

#[test]
fn ct_decode_wrong_length() {
    let mut out = [0u8; 1];
    let err = ct::decode(b"abc", &mut out).unwrap_err();
    assert!(matches!(err, better_hex::Error::InvalidLength { .. }));
}

#[test]
fn ct_check_valid() {
    assert!(ct::check(b"deadbeef"));
    assert!(ct::check(b"DEADBEEF"));
    assert!(ct::check(b"0123456789abcdefABCDEF"));
}

#[test]
fn ct_check_invalid() {
    assert!(!ct::check(b"deadbeeG"));
    assert!(!ct::check(b"zz"));
}

#[test]
fn ct_check_empty() {
    assert!(ct::check(b""));
}

#[test]
fn ct_encode_empty() {
    let mut out = [];
    ct::encode_lower(&[], &mut out).unwrap();
}

#[test]
fn ct_roundtrip_boundaries() {
    for size in [0, 1, 15, 16, 17, 31, 32, 33, 63, 64, 65, 255, 256, 257] {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let mut hex_buf = vec![0u8; size * 2];
        ct::encode_lower(&input, &mut hex_buf).unwrap();
        let mut decoded = vec![0u8; size];
        ct::decode(&hex_buf, &mut decoded).unwrap();
        assert_eq!(decoded, input, "CT roundtrip failed at size {size}");
    }
}
