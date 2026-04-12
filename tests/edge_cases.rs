//! Edge-case tests not covered by the exhaustive size loop:
//! error display/variants, invalid-input handling, HexStr type properties,
//! const fns, display formatting, prefix types, container overflow, serde errors.

use better_hex::{Error, HexStr, NoPrefix, Prefix, PrefixedHexStr, WithPrefix};

// ── Error types ─────────────────────────────────────────────────────────────

#[test]
fn error_display_and_equality() {
    assert_eq!(Error::InvalidEncoding.to_string(), "invalid hex encoding");
    assert_eq!(
        Error::InvalidLength { expected: 64, got: 40 }.to_string(),
        "invalid length: expected 64, got 40"
    );
    assert_eq!(Error::InvalidEncoding, Error::InvalidEncoding);
    assert_ne!(Error::InvalidEncoding, Error::InvalidLength { expected: 0, got: 0 });
}

// ── Prefix types ────────────────────────────────────────────────────────────

#[test]
fn prefix_type_properties() {
    assert_eq!(core::mem::size_of::<NoPrefix>(), 0);
    assert_eq!(NoPrefix::LEN, 0);
    assert_eq!(core::mem::size_of::<WithPrefix>(), 2);
    assert_eq!(WithPrefix::LEN, 2);
    assert_eq!(zerocopy::IntoBytes::as_bytes(&WithPrefix::VALUE), b"0x");
}

// ── Invalid-input handling ──────────────────────────────────────────────────

#[test]
fn decode_error_paths() {
    // Odd length
    let mut out = [0u8; 1];
    assert!(matches!(
        better_hex::decode_to_slice(b"abc", &mut out),
        Err(Error::InvalidLength { .. })
    ));

    // Invalid char
    let mut out = [0u8; 2];
    assert_eq!(
        better_hex::decode_to_slice(b"abGH", &mut out).unwrap_err(),
        Error::InvalidEncoding
    );

    // Wrong output size
    let mut out = [0u8; 3];
    assert!(matches!(
        better_hex::decode_to_slice(b"aabb", &mut out),
        Err(Error::InvalidLength { .. })
    ));

    // Boundary chars just outside valid hex ranges
    for &byte in b"/:@G`g" {
        let mut out = [0u8; 1];
        assert!(better_hex::decode_to_slice(&[b'0', byte], &mut out).is_err());
    }

    // check rejects odd length
    assert!(!better_hex::check(b"abc"));

    // encode wrong output size
    let mut buf = [0u8; 3];
    assert!(matches!(
        better_hex::encode_to_slice(&[0xab, 0xcd], &mut buf),
        Err(Error::InvalidLength { expected: 4, got: 3 })
    ));

    // Processes all bytes (invalid at start and end → same error)
    #[cfg(feature = "alloc")]
    {
        let mut hex = better_hex::encode_string(&[0u8; 32]);
        let bytes = unsafe { hex.as_bytes_mut() };
        bytes[0] = b'Z';
        bytes[63] = b'Z';
        let mut out = [0u8; 32];
        assert_eq!(
            better_hex::decode_to_slice(bytes, &mut out).unwrap_err(),
            Error::InvalidEncoding
        );
    }
}

#[cfg(feature = "alloc")]
#[test]
fn from_hex_vec_odd_length() {
    assert!(better_hex::decode::<Vec<u8>>(b"abc").is_err());
}

// ── HexStr ──────────────────────────────────────────────────────────────────

#[test]
fn hex_str_type_properties() {
    // Sizes
    assert_eq!(HexStr::<4>::LEN, 8);
    assert_eq!(HexStr::<0>::LEN, 0);
    assert_eq!(PrefixedHexStr::<4>::LEN, 10);
    assert_eq!(PrefixedHexStr::<0>::LEN, 2);
    assert_eq!(core::mem::size_of::<HexStr<4>>(), 8);
    assert_eq!(core::mem::size_of::<PrefixedHexStr<4>>(), 10);

    // zero()
    assert_eq!(HexStr::<4>::zero().as_str(), "00000000");
    assert_eq!(PrefixedHexStr::<4>::zero().as_str(), "0x00000000");

    // Deref, AsRef
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s: &str = &hex;
    assert_eq!(s, "abcd");
    assert_eq!(&*hex, "abcd");
    let sr: &str = hex.as_ref();
    assert_eq!(sr, "abcd");
    let br: &[u8] = hex.as_ref();
    assert_eq!(br, b"abcd");

    // PartialEq<str>
    assert_eq!(hex, *"abcd");

    // Debug
    assert_eq!(format!("{hex:?}"), r#"HexStr("abcd")"#);
    let prefixed: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(format!("{prefixed:?}"), r#"HexStr("0xabcd")"#);

    // FromStr
    let parsed: HexStr<4> = "deadbeef".parse().unwrap();
    assert_eq!(parsed.decode(), [0xde, 0xad, 0xbe, 0xef]);
    assert!(matches!(
        "deadbeeG".parse::<HexStr<4>>(),
        Err(Error::InvalidEncoding)
    ));
    assert!(matches!(
        "deadbe".parse::<HexStr<4>>(),
        Err(Error::InvalidLength { .. })
    ));

    // Prefixed roundtrip
    let input = [0xca, 0xfe, 0xba, 0xbe];
    let p_lower: PrefixedHexStr<4> = HexStr::encode_lower(&input);
    let p_upper: PrefixedHexStr<4> = HexStr::encode_upper(&input);
    assert_eq!(p_lower.as_str(), "0xcafebabe");
    assert_eq!(p_upper.as_str(), "0xCAFEBABE");
    assert_eq!(p_lower.decode(), input);
    assert_eq!(p_upper.decode(), input);
}

#[test]
fn prefixed_hex_str_from_str_roundtrip() {
    // PrefixedHexStr must round-trip through its own textual form.
    let input = [0xca, 0xfe, 0xba, 0xbe];
    let hex: PrefixedHexStr<4> = HexStr::encode_lower(&input);
    let s = hex.as_str();
    assert_eq!(s, "0xcafebabe");
    let parsed: PrefixedHexStr<4> = s.parse().unwrap();
    assert_eq!(parsed, hex);
    assert_eq!(parsed.decode(), input);

    // Uppercase roundtrip
    let hex_upper: PrefixedHexStr<4> = HexStr::encode_upper(&input);
    let parsed_upper: PrefixedHexStr<4> = hex_upper.as_str().parse().unwrap();
    assert_eq!(parsed_upper.decode(), input);
}

#[test]
fn prefixed_hex_str_from_str_errors() {
    // Missing prefix (too short)
    assert_eq!(
        "cafebabe".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidLength { expected: 10, got: 8 }
    );
    // Wrong prefix
    assert_eq!(
        "1xcafebabe".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidEncoding
    );
    // Invalid hex after valid prefix
    assert_eq!(
        "0xcafebaGe".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidEncoding
    );
    // Bare hex without prefix but correct hex-only length
    assert_eq!(
        "deadbeef".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidLength { expected: 10, got: 8 }
    );
}

#[test]
fn missized_fixed_containers_are_rejected() {
    assert_eq!(
        better_hex::encode::<HexStr<4>>(&[0xabu8]).unwrap_err(),
        Error::InvalidLength { expected: 8, got: 2 }
    );
    assert_eq!(
        better_hex::encode::<PrefixedHexStr<4>>(&[0xabu8]).unwrap_err(),
        Error::InvalidLength { expected: 8, got: 2 }
    );
    assert_eq!(
        better_hex::decode::<[u8; 4]>(b"ab").unwrap_err(),
        Error::InvalidLength { expected: 8, got: 2 }
    );
}

// ── HexStr const fns ────────────────────────────────────────────────────────

#[test]
fn hex_str_const_fns() {
    const LOWER: HexStr<4> = HexStr::<4>::const_encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    const UPPER: HexStr<4> = HexStr::<4>::const_encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(LOWER.as_str(), "deadbeef");
    assert_eq!(UPPER.as_str(), "DEADBEEF");

    const BYTES: [u8; 4] = match better_hex::const_decode_to_array(b"deadbeef") {
        Ok(b) => b,
        Err(_) => panic!(),
    };
    assert_eq!(BYTES, [0xde, 0xad, 0xbe, 0xef]);

    const UPPER_DEC: [u8; 2] = match better_hex::const_decode_to_array(b"ABCD") {
        Ok(b) => b,
        Err(_) => panic!(),
    };
    assert_eq!(UPPER_DEC, [0xab, 0xcd]);

    const { assert!(better_hex::const_check(b"deadbeef")) };
    const { assert!(!better_hex::const_check(b"deadbeeG")) };
    const { assert!(!better_hex::const_check(b"abc")) };

    const EMPTY: HexStr<0> = HexStr::<0>::const_encode_lower(&[]);
    assert_eq!(EMPTY.as_str(), "");
}

// ── Display edge cases ──────────────────────────────────────────────────────

#[test]
fn display_edge_cases() {
    // Empty
    assert_eq!(format!("{}", better_hex::display(&[] as &[u8])), "");
    assert_eq!(format!("{:#x}", better_hex::display(&[] as &[u8])), "0x");
    assert_eq!(format!("{:#X}", better_hex::display(&[] as &[u8])), "0x");

    // Owned data
    assert_eq!(format!("{}", better_hex::display(vec![0xde, 0xad])), "dead");
}

#[cfg(feature = "alloc")]
#[test]
fn display_chunk_boundary() {
    let data128: Vec<u8> = (0u8..128).collect();
    assert_eq!(format!("{}", better_hex::display(&data128)).len(), 256);
    let data129: Vec<u8> = (0u8..=128).collect();
    assert_eq!(format!("{}", better_hex::display(&data129)).len(), 258);
}

// ── Container capacity overflow ─────────────────────────────────────────────

#[cfg(feature = "heapless")]
#[test]
fn heapless_capacity_overflow() {
    // encode: 3 bytes → 6 hex chars, but capacity is 4
    assert_eq!(
        better_hex::encode::<heapless::String<4>>(&[0xab, 0xcd, 0xef]).unwrap_err(),
        Error::InvalidLength { expected: 4, got: 6 }
    );
    // decode: "aabbcc" → 3 bytes, but capacity is 2
    assert_eq!(
        better_hex::decode::<heapless::Vec<u8, 2>>(b"aabbcc").unwrap_err(),
        Error::InvalidLength { expected: 2, got: 3 }
    );
}

#[cfg(feature = "arrayvec")]
#[test]
fn arrayvec_capacity_overflow() {
    // encode: 3 bytes → 6 hex chars, but capacity is 4
    assert_eq!(
        better_hex::encode::<arrayvec::ArrayString<4>>(&[0xab, 0xcd, 0xef]).unwrap_err(),
        Error::InvalidLength { expected: 4, got: 6 }
    );
    // decode: "aabbcc" → 3 bytes, but capacity is 2
    assert_eq!(
        better_hex::decode::<arrayvec::ArrayVec<u8, 2>>(b"aabbcc").unwrap_err(),
        Error::InvalidLength { expected: 2, got: 3 }
    );
}

#[cfg(feature = "heapless")]
#[test]
fn heapless_oversized_container_ok() {
    // Variable-length containers with more capacity than needed should succeed.
    let s: heapless::String<100> = better_hex::encode(&[0xab]).unwrap();
    assert_eq!(&*s, "ab");
    let v: heapless::Vec<u8, 100> = better_hex::decode(b"ab").unwrap();
    assert_eq!(&*v, &[0xab]);
}

#[cfg(feature = "arrayvec")]
#[test]
fn arrayvec_oversized_container_ok() {
    // Variable-length containers with more capacity than needed should succeed.
    let s: arrayvec::ArrayString<100> = better_hex::encode(&[0xab]).unwrap();
    assert_eq!(&*s, "ab");
    let v: arrayvec::ArrayVec<u8, 100> = better_hex::decode(b"ab").unwrap();
    assert_eq!(&*v, &[0xab]);
}

// ── Serde error paths ───────────────────────────────────────────────────────

#[cfg(all(feature = "serde", feature = "alloc"))]
#[test]
fn serde_error_paths() {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug)]
    struct W {
        #[serde(with = "better_hex::serde")]
        data: Vec<u8>,
    }
    #[derive(Serialize, Deserialize, Debug)]
    struct A {
        #[serde(with = "better_hex::serde")]
        data: [u8; 4],
    }
    #[derive(Serialize, Deserialize, Debug)]
    struct P {
        #[serde(with = "better_hex::serde::prefixed")]
        data: Vec<u8>,
    }

    // Invalid hex / odd length / wrong array length
    assert!(serde_json::from_str::<W>(r#"{"data":"ZZZZ"}"#).is_err());
    assert!(serde_json::from_str::<W>(r#"{"data":"abc"}"#).is_err());
    assert!(serde_json::from_str::<A>(r#"{"data":"deadbeefaa"}"#).is_err());
    assert!(serde_json::from_str::<P>(r#"{"data":"deadbeef"}"#).is_err()); // missing prefix

    // Wrong JSON type → expecting() message
    assert!(
        serde_json::from_str::<W>(r#"{"data":42}"#)
            .unwrap_err()
            .to_string()
            .contains("hex string")
    );
    assert!(
        serde_json::from_str::<P>(r#"{"data":42}"#)
            .unwrap_err()
            .to_string()
            .contains("0x")
    );

    // Uppercase input accepted by lowercase module
    let decoded: W = serde_json::from_str(r#"{"data":"DEADBEEF"}"#).unwrap();
    assert_eq!(decoded.data, [0xde, 0xad, 0xbe, 0xef]);
}
