use better_hex::{HexStr, PrefixedHexStr, WithPrefix};

#[test]
fn hex_str_size_no_prefix() {
    assert_eq!(core::mem::size_of::<HexStr<4>>(), 8);
    assert_eq!(core::mem::size_of::<HexStr<32>>(), 64);
    assert_eq!(core::mem::size_of::<HexStr<1>>(), 2);
    assert_eq!(core::mem::size_of::<HexStr<0>>(), 0);
}

#[test]
fn hex_str_size_with_prefix() {
    assert_eq!(core::mem::size_of::<PrefixedHexStr<4>>(), 10);
    assert_eq!(core::mem::size_of::<PrefixedHexStr<32>>(), 66);
    assert_eq!(core::mem::size_of::<PrefixedHexStr<0>>(), 2);
}

#[test]
fn encode_lower() {
    let hex: HexStr<4> = HexStr::encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(hex.as_str(), "deadbeef");
}

#[test]
fn encode_upper() {
    let hex: HexStr<4> = HexStr::encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(hex.as_str(), "DEADBEEF");
}

#[test]
fn encode_lower_prefixed() {
    let hex: PrefixedHexStr<4> = HexStr::encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(hex.as_str(), "0xdeadbeef");
}

#[test]
fn encode_upper_prefixed() {
    let hex: PrefixedHexStr<2> = HexStr::encode_upper(&[0xab, 0xcd]);
    assert_eq!(hex.as_str(), "0xABCD");
}

#[test]
fn as_bytes() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(hex.as_bytes(), b"abcd");
}

#[test]
fn as_bytes_prefixed() {
    let hex: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(hex.as_bytes(), b"0xabcd");
}

#[test]
fn decode_roundtrip() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let hex: HexStr<4> = HexStr::encode_lower(&input);
    assert_eq!(hex.decode(), input);
}

#[test]
fn decode_roundtrip_upper() {
    let input = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];
    let hex: HexStr<8> = HexStr::encode_upper(&input);
    assert_eq!(hex.decode(), input);
}

#[test]
fn zero() {
    let hex: HexStr<4> = HexStr::zero();
    assert_eq!(hex.as_str(), "00000000");
}

#[test]
fn zero_prefixed() {
    let hex: PrefixedHexStr<2> = HexStr::zero();
    assert_eq!(hex.as_str(), "0x0000");
}

#[test]
fn len_const() {
    assert_eq!(HexStr::<4>::LEN, 8);
    assert_eq!(PrefixedHexStr::<4>::LEN, 10);
    assert_eq!(HexStr::<0>::LEN, 0);
    assert_eq!(PrefixedHexStr::<0>::LEN, 2);
}

#[test]
fn display_trait() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(format!("{hex}"), "abcd");
}

#[test]
fn deref_to_str() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s: &str = &hex;
    assert_eq!(s, "abcd");
}

#[test]
fn partial_eq_str() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(hex, *"abcd");
}

#[test]
fn from_str() {
    let hex: HexStr<4> = "deadbeef".parse().unwrap();
    assert_eq!(hex.decode(), [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_str_invalid() {
    let err = "deadbeeG".parse::<HexStr<4>>().unwrap_err();
    assert!(matches!(err, better_hex::Error::InvalidChar { .. }));
}

#[test]
fn from_str_wrong_length() {
    let err = "deadbe".parse::<HexStr<4>>().unwrap_err();
    assert!(matches!(err, better_hex::Error::InvalidLength { .. }));
}

#[test]
fn const_encode_lower() {
    const HEX: HexStr<4> = HexStr::<4>::const_encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(HEX.as_str(), "deadbeef");
}

#[test]
fn const_encode_upper() {
    const HEX: HexStr<4> = HexStr::<4>::const_encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(HEX.as_str(), "DEADBEEF");
}

#[test]
fn const_decode_to_array() {
    const BYTES: [u8; 4] = match better_hex::const_decode_to_array(b"deadbeef") {
        Ok(b) => b,
        Err(_) => panic!("decode failed"),
    };
    assert_eq!(BYTES, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn const_decode_uppercase() {
    const BYTES: [u8; 2] = match better_hex::const_decode_to_array(b"ABCD") {
        Ok(b) => b,
        Err(_) => panic!("decode failed"),
    };
    assert_eq!(BYTES, [0xab, 0xcd]);
}

#[test]
fn const_check() {
    const VALID: bool = better_hex::const_check(b"deadbeef");
    const INVALID: bool = better_hex::const_check(b"deadbeeG");
    const ODD: bool = better_hex::const_check(b"abc");
    const { assert!(VALID) };
    const { assert!(!INVALID) };
    const { assert!(!ODD) };
}

#[test]
fn const_encode_zero_len() {
    const HEX: HexStr<0> = HexStr::<0>::const_encode_lower(&[]);
    assert_eq!(HEX.as_str(), "");
}

// ── LowerHex / UpperHex fmt impls ─────────────────────────────────────────────

#[test]
fn lower_hex_fmt_normalizes_to_lowercase() {
    // Encode as upper, then format via {:x} — must produce lowercase.
    let hex: HexStr<4> = HexStr::encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    let s = format!("{hex:x}");
    assert_eq!(s, "deadbeef");
}

#[test]
fn upper_hex_fmt_normalizes_to_uppercase() {
    // Encode as lower, then format via {:X} — must produce uppercase.
    let hex: HexStr<4> = HexStr::encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    let s = format!("{hex:X}");
    assert_eq!(s, "DEADBEEF");
}

#[test]
fn lower_hex_fmt_no_prefix() {
    // LowerHex impl strips any prefix — only outputs the hex digits.
    let hex: PrefixedHexStr<2> = HexStr::encode_upper(&[0xab, 0xcd]);
    let s = format!("{hex:x}");
    assert_eq!(s, "abcd");
}

#[test]
fn upper_hex_fmt_no_prefix() {
    let hex: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s = format!("{hex:X}");
    assert_eq!(s, "ABCD");
}

// ── Debug impl ────────────────────────────────────────────────────────────────

#[test]
fn debug_no_prefix() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s = format!("{hex:?}");
    assert_eq!(s, r#"HexStr("abcd")"#);
}

#[test]
fn debug_with_prefix() {
    let hex: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s = format!("{hex:?}");
    assert_eq!(s, r#"HexStr("0xabcd")"#);
}

// ── AsRef impls ───────────────────────────────────────────────────────────────

#[test]
fn as_ref_str() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s: &str = hex.as_ref();
    assert_eq!(s, "abcd");
}

#[test]
fn as_ref_bytes() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let b: &[u8] = hex.as_ref();
    assert_eq!(b, b"abcd");
}

#[test]
fn as_ref_str_prefixed() {
    let hex: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s: &str = hex.as_ref();
    assert_eq!(s, "0xabcd");
}

// ── PartialEq<HexStr> and zero() with prefix ─────────────────────────────────

#[test]
fn partial_eq_hex_str() {
    let a: HexStr<4> = HexStr::encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    let b: HexStr<4> = HexStr::encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    let c: HexStr<4> = HexStr::encode_upper(&[0x00, 0x11, 0x22, 0x33]);
    assert_eq!(a, b);
    assert_ne!(a, c);
}

#[test]
fn partial_eq_prefixed() {
    let a: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let b: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(a, b);
}

#[test]
fn zero_with_prefix() {
    let hex: HexStr<4, WithPrefix> = HexStr::zero();
    assert_eq!(hex.as_str(), "0x00000000");
    assert_eq!(hex.decode(), [0u8; 4]);
}

// ── PrefixedHexStr encode/decode roundtrip ───────────────────────────────────

#[test]
fn prefixed_encode_decode_roundtrip() {
    let input = [0xca, 0xfe, 0xba, 0xbe];
    let lower: PrefixedHexStr<4> = HexStr::encode_lower(&input);
    let upper: PrefixedHexStr<4> = HexStr::encode_upper(&input);
    assert_eq!(lower.as_str(), "0xcafebabe");
    assert_eq!(upper.as_str(), "0xCAFEBABE");
    assert_eq!(lower.decode(), input);
    assert_eq!(upper.decode(), input);
}
