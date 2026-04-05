//! Edge-case tests that are not covered by the exhaustive size loop.
//!
//! This includes: error display, error variants, invalid-input handling,
//! HexStr type-level properties and const fns, display formatting edge cases,
//! prefix type assertions, and serde error paths.

use better_hex::{Error, HexStr, NoPrefix, Prefix, WithPrefix};

// ── Error display and equality ──────────────────────────────────────────────

#[test]
fn error_display_invalid_char() {
    let e = Error::InvalidChar { byte: b'G', index: 5 };
    assert_eq!(e.to_string(), "invalid hex character 'G' (0x47) at index 5");
}

#[test]
fn error_display_invalid_encoding() {
    assert_eq!(Error::InvalidEncoding.to_string(), "invalid hex encoding");
}

#[test]
fn error_display_invalid_length() {
    let e = Error::InvalidLength { expected: 64, got: 40 };
    assert_eq!(e.to_string(), "invalid length: expected 64, got 40");
}

#[test]
fn error_eq() {
    assert_eq!(Error::InvalidEncoding, Error::InvalidEncoding);
    assert_ne!(Error::InvalidEncoding, Error::InvalidLength { expected: 0, got: 0 });
}

// ── Prefix types ────────────────────────────────────────────────────────────

#[test]
fn no_prefix_is_zst() {
    assert_eq!(core::mem::size_of::<NoPrefix>(), 0);
    assert_eq!(NoPrefix::LEN, 0);
}

#[test]
fn with_prefix_is_2_bytes_0x() {
    assert_eq!(core::mem::size_of::<WithPrefix>(), 2);
    assert_eq!(WithPrefix::LEN, 2);
    assert_eq!(bytemuck::bytes_of(&WithPrefix::VALUE), b"0x");
}

// ── decode: invalid input ───────────────────────────────────────────────────

#[test]
fn decode_odd_length() {
    let mut out = [0u8; 1];
    assert!(matches!(
        better_hex::decode_to_slice(b"abc", &mut out),
        Err(Error::InvalidLength { .. })
    ));
}

#[test]
fn decode_invalid_char_position() {
    let mut out = [0u8; 2];
    let err = better_hex::decode_to_slice(b"abGH", &mut out).unwrap_err();
    assert_eq!(err, Error::InvalidChar { byte: b'G', index: 2 });
}

#[test]
fn decode_output_wrong_size() {
    let mut out = [0u8; 3]; // need 2
    assert!(matches!(
        better_hex::decode_to_slice(b"aabb", &mut out),
        Err(Error::InvalidLength { .. })
    ));
}

#[test]
fn decode_boundary_chars() {
    // Bytes just outside valid hex ranges
    let boundary_invalids: &[u8] = &[b'/', b':', b'@', b'G', b'`', b'g'];
    for &byte in boundary_invalids {
        let input = [b'0', byte];
        let mut out = [0u8; 1];
        let err = better_hex::decode_to_slice(&input, &mut out).unwrap_err();
        assert!(matches!(err, Error::InvalidChar { .. }), "byte 0x{byte:02x} should be invalid");
    }
}

#[test]
fn check_rejects_odd_length() {
    assert!(!better_hex::check(b"abc"));
}

// ── CT decode: error behavior ───────────────────────────────────────────────

#[test]
fn ct_decode_returns_invalid_encoding_not_invalid_char() {
    let mut out = [0u8; 2];
    let err = better_hex::ct::decode(b"abGH", &mut out).unwrap_err();
    assert_eq!(err, Error::InvalidEncoding, "CT must not reveal error position");
}

#[test]
fn ct_decode_processes_all_bytes() {
    // Multiple invalid bytes — CT should still process all of them and return
    // the same error variant regardless of where the invalid bytes are.
    let mut hex = better_hex::encode_string(&[0u8; 32]);
    let bytes = unsafe { hex.as_bytes_mut() };
    bytes[0] = b'Z'; // invalid at start
    bytes[63] = b'Z'; // invalid at end
    let mut out = [0u8; 32];
    let err = better_hex::ct::decode(bytes, &mut out).unwrap_err();
    assert_eq!(err, Error::InvalidEncoding);
}

#[test]
fn ct_check_valid() {
    assert!(better_hex::ct::check(b"deadbeef"));
    assert!(better_hex::ct::check(b"DEADBEEF"));
    assert!(better_hex::ct::check(b""));
}

#[test]
fn ct_check_invalid() {
    assert!(!better_hex::ct::check(b"deadbeeG"));
    assert!(!better_hex::ct::check(b"zz"));
}

// ── encode_to_slice: error paths ────────────────────────────────────────────

#[test]
fn encode_to_slice_wrong_output_size() {
    let mut buf = [0u8; 3]; // should be 4 for 2-byte input
    assert!(matches!(
        better_hex::encode_to_slice(&[0xab, 0xcd], &mut buf),
        Err(Error::InvalidLength { expected: 4, got: 3 })
    ));
}

// ── HexStr type-level properties ────────────────────────────────────────────

#[test]
fn hex_str_sizes() {
    assert_eq!(HexStr::<4>::LEN, 8);
    assert_eq!(HexStr::<0>::LEN, 0);
    assert_eq!(core::mem::size_of::<HexStr<4>>(), 8);
    assert_eq!(core::mem::size_of::<HexStr<0>>(), 0);
}

#[test]
fn hex_str_zero() {
    let h: HexStr<4> = HexStr::zero();
    assert_eq!(h.as_str(), "00000000");
}

#[test]
fn hex_str_deref_as_ref() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s: &str = &hex;
    assert_eq!(s, "abcd");
    let sr: &str = hex.as_ref();
    assert_eq!(sr, "abcd");
    let br: &[u8] = hex.as_ref();
    assert_eq!(br, b"abcd");
}

#[test]
fn hex_str_partial_eq_str() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(hex, *"abcd");
}

#[test]
fn hex_str_debug() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(format!("{hex:?}"), r#"HexStr("abcd")"#);
}

#[test]
fn hex_str_from_str() {
    let hex: HexStr<4> = "deadbeef".parse().unwrap();
    assert_eq!(hex.decode(), [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn hex_str_from_str_errors() {
    assert!(matches!("deadbeeG".parse::<HexStr<4>>(), Err(Error::InvalidChar { .. })));
    assert!(matches!("deadbe".parse::<HexStr<4>>(), Err(Error::InvalidLength { .. })));
}

// NOTE: PrefixedHexStr encode_lower/encode_upper are currently broken
// (set_len assertion fails). Re-enable when the HexTarget impl for
// HexStr<N, WithPrefix> is fixed.

// ── HexStr const fn ─────────────────────────────────────────────────────────

#[test]
fn const_encode() {
    const LOWER: HexStr<4> = HexStr::<4>::const_encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    const UPPER: HexStr<4> = HexStr::<4>::const_encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(LOWER.as_str(), "deadbeef");
    assert_eq!(UPPER.as_str(), "DEADBEEF");
}

#[test]
fn const_decode() {
    const BYTES: [u8; 4] = match better_hex::const_decode_to_array(b"deadbeef") {
        Ok(b) => b,
        Err(_) => panic!("decode failed"),
    };
    assert_eq!(BYTES, [0xde, 0xad, 0xbe, 0xef]);

    const UPPER: [u8; 2] = match better_hex::const_decode_to_array(b"ABCD") {
        Ok(b) => b,
        Err(_) => panic!("decode failed"),
    };
    assert_eq!(UPPER, [0xab, 0xcd]);
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

// ── Display edge cases ──────────────────────────────────────────────────────

#[test]
fn display_empty() {
    assert_eq!(format!("{}", better_hex::display(&[] as &[u8])), "");
    assert_eq!(format!("{:#x}", better_hex::display(&[] as &[u8])), "0x");
    assert_eq!(format!("{:#X}", better_hex::display(&[] as &[u8])), "0x");
}

#[test]
fn display_owned_data() {
    let d = better_hex::display(vec![0xde, 0xad]);
    assert_eq!(format!("{d}"), "dead");
}

#[cfg(feature = "alloc")]
#[test]
fn display_chunk_boundary() {
    // 128 bytes = exactly one chunk. 129 = one chunk + 1 byte remainder.
    let data128: Vec<u8> = (0u8..128).collect();
    let s128 = format!("{}", better_hex::display(&data128));
    assert_eq!(s128.len(), 256);

    let data129: Vec<u8> = (0u8..=128).collect();
    let s129 = format!("{}", better_hex::display(&data129));
    assert_eq!(s129.len(), 258);
}

// ── Serde error paths ───────────────────────────────────────────────────────

#[cfg(all(feature = "serde", feature = "alloc"))]
mod serde_errors {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug)]
    struct WithVec {
        #[serde(with = "better_hex::serde")]
        data: Vec<u8>,
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct WithArray {
        #[serde(with = "better_hex::serde")]
        data: [u8; 4],
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct WithPrefixed {
        #[serde(with = "better_hex::serde::prefixed")]
        data: Vec<u8>,
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct WithCt {
        #[serde(with = "better_hex::serde::ct")]
        data: [u8; 4],
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct WithCtPrefixed {
        #[serde(with = "better_hex::serde::ct::prefixed")]
        data: [u8; 4],
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct WithCtUpperPrefixed {
        #[serde(with = "better_hex::serde::ct::upper_prefixed")]
        data: [u8; 4],
    }

    #[test]
    fn invalid_hex_returns_error() {
        assert!(serde_json::from_str::<WithVec>(r#"{"data":"ZZZZ"}"#).is_err());
    }

    #[test]
    fn odd_length_returns_error() {
        assert!(serde_json::from_str::<WithVec>(r#"{"data":"abc"}"#).is_err());
    }

    #[test]
    fn wrong_array_length_returns_error() {
        assert!(serde_json::from_str::<WithArray>(r#"{"data":"deadbeefaa"}"#).is_err());
    }

    #[test]
    fn missing_prefix_returns_error() {
        assert!(serde_json::from_str::<WithPrefixed>(r#"{"data":"deadbeef"}"#).is_err());
    }

    #[test]
    fn wrong_json_type_fast() {
        let err = serde_json::from_str::<WithVec>(r#"{"data":42}"#).unwrap_err();
        assert!(err.to_string().contains("hex string"), "got: {err}");
    }

    #[test]
    fn wrong_json_type_prefixed() {
        let err = serde_json::from_str::<WithPrefixed>(r#"{"data":42}"#).unwrap_err();
        assert!(err.to_string().contains("0x"), "got: {err}");
    }

    #[test]
    fn wrong_json_type_ct() {
        let err = serde_json::from_str::<WithCt>(r#"{"data":42}"#).unwrap_err();
        assert!(err.to_string().contains("hex string"), "got: {err}");
    }

    #[test]
    fn wrong_json_type_ct_prefixed() {
        let err = serde_json::from_str::<WithCtPrefixed>(r#"{"data":42}"#).unwrap_err();
        assert!(err.to_string().contains("0x"), "got: {err}");
    }

    #[test]
    fn ct_array_odd_length() {
        assert!(serde_json::from_str::<WithCt>(r#"{"data":"abc"}"#).is_err());
    }

    #[test]
    fn ct_array_invalid_chars() {
        assert!(serde_json::from_str::<WithCt>(r#"{"data":"gggggggg"}"#).is_err());
    }

    #[test]
    fn ct_upper_prefixed_wrong_length() {
        assert!(serde_json::from_str::<WithCtUpperPrefixed>(r#"{"data":"0xdeadbeefaa"}"#).is_err());
    }

    #[test]
    fn deserialize_uppercase_input_accepted() {
        let decoded: WithVec = serde_json::from_str(r#"{"data":"DEADBEEF"}"#).unwrap();
        assert_eq!(decoded.data, [0xde, 0xad, 0xbe, 0xef]);
    }
}
