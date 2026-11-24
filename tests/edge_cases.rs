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
    assert_eq!(bytemuck::bytes_of(&WithPrefix::VALUE), b"0x");
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
        assert!(better_hex::decode_to_slice([b'0', byte], &mut out).is_err());
    }

    // check rejects odd length
    assert!(!better_hex::check(b"abc"));

    // encode wrong output size
    let mut buf = [0u8; 3];
    assert!(matches!(
        better_hex::encode_to_slice([0xab, 0xcd], &mut buf),
        Err(Error::InvalidLength { expected: 4, got: 3 })
    ));

    // Processes all bytes (invalid at start and end → same error)
    #[cfg(feature = "alloc")]
    {
        let mut bytes = better_hex::encode_string([0u8; 32]).into_bytes();
        bytes[0] = b'Z';
        bytes[63] = b'Z';
        let mut out = [0u8; 32];
        assert_eq!(
            better_hex::decode_to_slice(&bytes, &mut out).unwrap_err(),
            Error::InvalidEncoding
        );
    }
}

/// Prove that decode processes **all** bytes, not just up to the first error.
///
/// Strategy: decode valid input to get a reference output. Then for each hex
/// position, inject an invalid byte and decode again. Every output byte whose
/// corresponding hex pair was still valid must match the reference — proving
/// the decoder did not skip any work after encountering the invalid byte.
#[test]
fn decode_processes_all_bytes_proof() {
    // Use a non-trivial input so the decoded bytes are not all zeros.
    const N: usize = 32;
    let input: [u8; N] = {
        use rand_core::{Rng, SeedableRng};
        use rand_xoshiro::Xoshiro256PlusPlus;
        let mut rng = Xoshiro256PlusPlus::seed_from_u64(0xdeadbeaf);
        let mut buf = [0u8; N];
        rng.fill_bytes(&mut buf);
        buf
    };

    // Encode to hex and decode to get the reference output.
    let hex_str: better_hex::HexStr<N> = better_hex::HexStr::encode_lower(&input);
    let hex_bytes = hex_str.as_ref() as &[u8];
    let hex_len = hex_bytes.len(); // 64

    let mut reference = [0u8; N];
    better_hex::decode_to_slice(hex_bytes, &mut reference).expect("valid hex must decode");
    assert_eq!(reference, input);

    // For every hex position, inject an invalid byte and verify the output.
    for inject_pos in 0..hex_len {
        let mut bad_hex = [0u8; N * 2];
        bad_hex.copy_from_slice(hex_bytes);
        bad_hex[inject_pos] = b'Z'; // not a valid hex char

        let mut output = [0xFFu8; N]; // fill with sentinel
        let result = better_hex::decode_to_slice(bad_hex, &mut output);
        assert_eq!(
            result.unwrap_err(),
            Error::InvalidEncoding,
            "expected InvalidEncoding at inject_pos={inject_pos}"
        );

        // The affected decoded byte is at inject_pos / 2.
        let affected_byte = inject_pos / 2;

        // Every output byte EXCEPT the affected one must match the reference.
        for i in 0..N {
            if i == affected_byte {
                continue; // this byte's pair had the invalid char — skip it
            }
            assert_eq!(
                output[i], reference[i],
                "output mismatch at byte {i} when invalid char injected at hex pos {inject_pos}: \
                 got 0x{:02x}, expected 0x{:02x} — decoder may have stopped early",
                output[i], reference[i]
            );
        }
    }
}

#[cfg(feature = "alloc")]
#[test]
fn from_hex_vec_odd_length() {
    assert_eq!(
        better_hex::decode::<Vec<u8>>(b"abc").unwrap_err(),
        Error::InvalidLength { expected: 2, got: 3 }
    );
}

#[cfg(feature = "alloc")]
#[test]
fn alloc_container_traits_roundtrip() {
    use better_hex::{FromHex, ToHex};
    use std::borrow::Cow;

    let raw = [0xde, 0xad, 0xbe, 0xef];
    let vec_val = raw.to_vec();
    let boxed: Box<[u8]> = raw.into();
    let cow_borrowed: Cow<'_, [u8]> = Cow::Borrowed(&raw);
    let cow_owned: Cow<'_, [u8]> = Cow::Owned(vec_val.clone());

    for (lower, upper) in [
        (
            vec_val.encode_hex::<String>().unwrap(),
            vec_val.encode_hex_upper::<String>().unwrap(),
        ),
        (
            boxed.encode_hex::<String>().unwrap(),
            boxed.encode_hex_upper::<String>().unwrap(),
        ),
        (
            cow_borrowed.encode_hex::<String>().unwrap(),
            cow_borrowed.encode_hex_upper::<String>().unwrap(),
        ),
        (
            cow_owned.encode_hex::<String>().unwrap(),
            cow_owned.encode_hex_upper::<String>().unwrap(),
        ),
    ] {
        assert_eq!(lower, "deadbeef");
        assert_eq!(upper, "DEADBEEF");
    }

    let mut out = String::new();
    boxed.write_hex(&mut out, false).unwrap();
    assert_eq!(out, "deadbeef");
    out.clear();
    cow_borrowed.write_hex(&mut out, true).unwrap();
    assert_eq!(out, "DEADBEEF");

    let decoded_box = Box::<[u8]>::from_hex("DeAdBeEf").unwrap();
    assert_eq!(&*decoded_box, &raw);
    let decoded_cow = Cow::<[u8]>::from_hex("DeAdBeEf").unwrap();
    assert!(matches!(decoded_cow, Cow::Owned(_)));
    assert_eq!(&*decoded_cow, &raw);
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

    // PartialEq<str> and PartialEq<&str>
    assert_eq!(hex, *"abcd");
    assert_eq!(hex, "abcd");

    // Hash, Ord, Borrow<str> (usable as HashMap / BTreeMap key looked up by &str)
    let mut map = std::collections::HashMap::new();
    map.insert(hex, 42u32);
    assert_eq!(map.get("abcd"), Some(&42));
    let mut btree = std::collections::BTreeMap::new();
    let hex_lo: HexStr<2> = HexStr::encode_lower(&[0x00, 0x01]);
    btree.insert(hex, 2u32);
    btree.insert(hex_lo, 1u32);
    assert_eq!(btree.get("0001"), Some(&1));
    assert!(hex_lo < hex);

    // Debug
    assert_eq!(format!("{hex:?}"), r#"HexStr("abcd")"#);
    let prefixed: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(format!("{prefixed:?}"), r#"HexStr("0xabcd")"#);

    // FromStr
    let parsed: HexStr<4> = "deadbeef".parse().unwrap();
    assert_eq!(parsed.decode(), [0xde, 0xad, 0xbe, 0xef]);
    assert!(matches!("deadbeeG".parse::<HexStr<4>>(), Err(Error::InvalidEncoding)));
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
    // Missing prefix (bare hex without "0x" is 2 bytes short)
    assert_eq!(
        "cafebabe".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidLength { expected: 10, got: 8 }
    );
    // Wrong prefix
    assert_eq!(
        "1xcafebabe".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidEncoding
    );
    // Uppercase "0X" prefix is rejected (FromStr matches "0x" verbatim)
    assert_eq!(
        "0Xcafebabe".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidEncoding
    );
    // Invalid hex after valid prefix
    assert_eq!(
        "0xcafebaGe".parse::<PrefixedHexStr<4>>().unwrap_err(),
        Error::InvalidEncoding
    );
}

#[test]
fn prefixed_hex_str_from_hex_takes_unprefixed_bytes() {
    let p = PrefixedHexStr::<4>::from_hex(*b"deadbeef").unwrap();
    assert_eq!(p, "0xdeadbeef");
    assert_eq!(p.decode(), [0xde, 0xad, 0xbe, 0xef]);

    const CP: PrefixedHexStr<4> = PrefixedHexStr::<4>::const_from_hex(*b"DEADBEEF").unwrap();
    assert_eq!(CP, "0xDEADBEEF");
    assert_eq!(CP.const_decode(), [0xde, 0xad, 0xbe, 0xef]);
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

// ── HexStr from_hex / const_from_hex (runtime) ─────────────────────────────

#[test]
fn hex_str_from_hex_runtime() {
    // from_hex: valid input
    let hex = HexStr::<4>::from_hex(*b"deadbeef");
    assert!(hex.is_some());
    assert_eq!(hex.unwrap().decode(), [0xde, 0xad, 0xbe, 0xef]);

    // from_hex: invalid input
    assert!(HexStr::<4>::from_hex(*b"deadbeeG").is_none());

    // const_from_hex at runtime
    let hex = HexStr::<4>::const_from_hex(*b"DEADBEEF");
    assert!(hex.is_some());
    assert_eq!(hex.unwrap().decode(), [0xde, 0xad, 0xbe, 0xef]);

    // const_from_hex: invalid
    assert!(HexStr::<4>::const_from_hex(*b"ZZZZZZZZ").is_none());

    // const_encode_lower/upper at runtime (not const context)
    let lower = HexStr::<4>::const_encode_lower(&[0xca, 0xfe, 0xba, 0xbe]);
    assert_eq!(lower.as_str(), "cafebabe");
    let upper = HexStr::<4>::const_encode_upper(&[0xca, 0xfe, 0xba, 0xbe]);
    assert_eq!(upper.as_str(), "CAFEBABE");

    // Various sizes
    let h1 = HexStr::<1>::from_hex(*b"ab");
    assert_eq!(h1.unwrap().decode(), [0xab]);
    let h16 = HexStr::<16>::from_hex(*b"000102030405060708090a0b0c0d0e0f");
    assert_eq!(h16.unwrap().decode()[0], 0x00);
    assert_eq!(h16.unwrap().decode()[15], 0x0f);
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

    // Owned data & Copy/Clone on borrowed HexDisplay
    assert_eq!(format!("{}", better_hex::display(vec![0xde, 0xad])), "dead");
    let d = better_hex::display([0xde, 0xad]);
    let d_copy = d;
    assert_eq!(format!("{d}"), format!("{d_copy}"));
}

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
    // odd length rejected consistently before capacity check
    assert_eq!(
        better_hex::decode::<heapless::Vec<u8, 2>>(b"abcdefg").unwrap_err(),
        Error::InvalidLength { expected: 6, got: 7 }
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
    // odd length rejected consistently before capacity check
    assert_eq!(
        better_hex::decode::<arrayvec::ArrayVec<u8, 2>>(b"abcdefg").unwrap_err(),
        Error::InvalidLength { expected: 6, got: 7 }
    );
}

#[cfg(feature = "heapless")]
#[test]
fn heapless_oversized_container_ok() {
    use better_hex::ToHex;
    // Variable-length containers with more capacity than needed should succeed.
    let s: heapless::String<100> = better_hex::encode([0xab]).unwrap();
    assert_eq!(&*s, "ab");
    let v: heapless::Vec<u8, 100> = better_hex::decode(b"ab").unwrap();
    assert_eq!(&*v, &[0xab]);
    let re: heapless::String<100> = v.encode_hex().unwrap();
    assert_eq!(&*re, "ab");
    let re_upper: heapless::String<100> = v.encode_hex_upper().unwrap();
    assert_eq!(&*re_upper, "AB");
}

#[cfg(feature = "arrayvec")]
#[test]
fn arrayvec_oversized_container_ok() {
    use better_hex::ToHex;
    // Variable-length containers with more capacity than needed should succeed.
    let s: arrayvec::ArrayString<100> = better_hex::encode([0xab]).unwrap();
    assert_eq!(&*s, "ab");
    let v: arrayvec::ArrayVec<u8, 100> = better_hex::decode(b"ab").unwrap();
    assert_eq!(&*v, &[0xab]);
    let re: arrayvec::ArrayString<100> = v.encode_hex().unwrap();
    assert_eq!(&*re, "ab");
    let re_upper: arrayvec::ArrayString<100> = v.encode_hex_upper().unwrap();
    assert_eq!(&*re_upper, "AB");
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

    // Box<[u8]> roundtrip
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    struct B {
        #[serde(with = "better_hex::serde")]
        data: Box<[u8]>,
    }
    let b_orig = B {
        data: Box::from([0xde, 0xad, 0xbe, 0xef]),
    };
    let b_json = serde_json::to_string(&b_orig).unwrap();
    assert_eq!(b_json, r#"{"data":"deadbeef"}"#);
    assert_eq!(serde_json::from_str::<B>(&b_json).unwrap(), b_orig);

    // Large fixed array (> 512 bytes) hits streaming serialize fallback
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    struct Large {
        #[serde(with = "better_hex::serde::prefixed")]
        data: [u8; 600],
    }
    let large = Large { data: [0xab; 600] };
    let large_json = serde_json::to_string(&large).unwrap();
    assert_eq!(serde_json::from_str::<Large>(&large_json).unwrap(), large);
}

#[cfg(all(feature = "serde", feature = "heapless"))]
#[test]
fn serde_heapless_vec_roundtrip() {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    struct H {
        #[serde(with = "better_hex::serde")]
        data: heapless::Vec<u8, 8>,
    }
    let mut data = heapless::Vec::new();
    data.extend_from_slice(&[0xde, 0xad, 0xbe, 0xef]).unwrap();
    let orig = H { data };
    let json = serde_json::to_string(&orig).unwrap();
    assert_eq!(json, r#"{"data":"deadbeef"}"#);
    assert_eq!(serde_json::from_str::<H>(&json).unwrap(), orig);
}

#[cfg(all(feature = "serde", feature = "arrayvec"))]
#[test]
fn serde_arrayvec_roundtrip() {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    struct Av {
        #[serde(with = "better_hex::serde::upper_prefixed")]
        data: arrayvec::ArrayVec<u8, 8>,
    }
    let mut data = arrayvec::ArrayVec::new();
    data.try_extend_from_slice(&[0xde, 0xad, 0xbe, 0xef]).unwrap();
    let orig = Av { data };
    let json = serde_json::to_string(&orig).unwrap();
    assert_eq!(json, r#"{"data":"0xDEADBEEF"}"#);
    assert_eq!(serde_json::from_str::<Av>(&json).unwrap(), orig);
}
