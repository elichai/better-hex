//! Exhaustive size-loop tests: exercise every public API at sizes 0..=512.
//!
//! This single file replaces the per-feature test files (encode.rs, decode.rs,
//! boundaries.rs, hex_target.rs, traits.rs, ct.rs) by testing all APIs in a
//! uniform loop over every input size from 0 to 512 bytes.

#![cfg(feature = "alloc")]

use better_hex::{FromHex, HexTarget, ToHex};
use core::fmt::Write;

const MAX: usize = 512;

/// Deterministic test input for a given size.
fn make_input(size: usize) -> Vec<u8> {
    (0..size).map(|i| ((i as u8).wrapping_mul(37)).wrapping_add(11)).collect()
}

// ── encode_to_slice / decode_to_slice roundtrip ─────────────────────────────

#[test]
fn roundtrip_encode_decode_to_slice() {
    for size in 0..=MAX {
        let input = make_input(size);
        let hex_len = size * 2;
        let mut hex = vec![0u8; hex_len];
        better_hex::encode_to_slice(&input, &mut hex).unwrap();
        let mut decoded = vec![0u8; size];
        better_hex::decode_to_slice(&hex, &mut decoded).unwrap();
        assert_eq!(decoded, input, "roundtrip failed at size {size}");
    }
}

#[test]
fn roundtrip_encode_upper_decode_to_slice() {
    for size in 0..=MAX {
        let input = make_input(size);
        let mut hex = vec![0u8; size * 2];
        better_hex::encode_to_slice_upper(&input, &mut hex).unwrap();
        let mut decoded = vec![0u8; size];
        better_hex::decode_to_slice(&hex, &mut decoded).unwrap();
        assert_eq!(decoded, input, "upper roundtrip failed at size {size}");
    }
}

// ── encode::<String> / decode::<Vec<u8>> roundtrip ──────────────────────────

#[test]
fn roundtrip_encode_string_decode_vec() {
    for size in 0..=MAX {
        let input = make_input(size);
        let hex: String = better_hex::encode(&input).unwrap();
        assert_eq!(hex.len(), size * 2, "encode length wrong at size {size}");
        let decoded: Vec<u8> = better_hex::decode(&hex).unwrap();
        assert_eq!(decoded, input, "String/Vec roundtrip failed at size {size}");
    }
}

// ── CT encode/decode roundtrip ──────────────────────────────────────────────

#[test]
fn roundtrip_ct_lower() {
    for size in 0..=MAX {
        let input = make_input(size);
        let mut hex = vec![0u8; size * 2];
        better_hex::ct::encode_lower(&input, &mut hex).unwrap();
        let mut decoded = vec![0u8; size];
        better_hex::ct::decode(&hex, &mut decoded).unwrap();
        assert_eq!(decoded, input, "CT lower roundtrip failed at size {size}");
    }
}

#[test]
fn roundtrip_ct_upper() {
    for size in 0..=MAX {
        let input = make_input(size);
        let mut hex = vec![0u8; size * 2];
        better_hex::ct::encode_upper(&input, &mut hex).unwrap();
        let mut decoded = vec![0u8; size];
        better_hex::ct::decode(&hex, &mut decoded).unwrap();
        assert_eq!(decoded, input, "CT upper roundtrip failed at size {size}");
    }
}

// ── check / ct::check ───────────────────────────────────────────────────────

#[test]
fn check_valid_at_all_sizes() {
    for size in 0..=MAX {
        let input = make_input(size);
        let hex: String = better_hex::encode(&input).unwrap();
        assert!(better_hex::check(hex.as_bytes()), "check rejected valid hex at size {size}");
        assert!(better_hex::ct::check(hex.as_bytes()), "ct::check rejected valid hex at size {size}");
    }
}

// ── ToHex trait ─────────────────────────────────────────────────────────────

#[test]
fn to_hex_write_hex_all_sizes() {
    for size in 0..=MAX {
        let input = make_input(size);
        let expected: String = better_hex::encode(&input).unwrap();

        let mut buf = String::new();
        input.as_slice().write_hex(&mut buf, false).unwrap();
        assert_eq!(buf, expected, "write_hex lower mismatch at size {size}");

        buf.clear();
        input.as_slice().write_hex(&mut buf, true).unwrap();
        let expected_upper: String = better_hex::encode_upper(&input).unwrap();
        assert_eq!(buf, expected_upper, "write_hex upper mismatch at size {size}");
    }
}

#[test]
fn to_hex_encode_hex_all_sizes() {
    for size in 0..=MAX {
        let input = make_input(size);
        let expected: String = better_hex::encode(&input).unwrap();
        let via_trait: String = input.as_slice().encode_hex().unwrap();
        assert_eq!(via_trait, expected, "encode_hex mismatch at size {size}");
    }
}

// ── FromHex for Vec<u8> ─────────────────────────────────────────────────────

#[test]
fn from_hex_vec_all_sizes() {
    for size in 0..=MAX {
        let input = make_input(size);
        let hex: String = better_hex::encode(&input).unwrap();
        let decoded = Vec::<u8>::from_hex(&hex).unwrap();
        assert_eq!(decoded, input, "FromHex<Vec> failed at size {size}");
    }
}

// ── ct::FromHex for Vec<u8> ─────────────────────────────────────────────────

#[test]
fn ct_from_hex_vec_all_sizes() {
    for size in 0..=MAX {
        let input = make_input(size);
        let hex: String = better_hex::encode(&input).unwrap();
        let decoded = <Vec<u8> as better_hex::ct::FromHex>::from_hex(&hex).unwrap();
        assert_eq!(decoded, input, "ct::FromHex<Vec> failed at size {size}");
    }
}

// ── FromHex for [u8; N] — representative sizes ──────────────────────────────

macro_rules! test_from_hex_array {
    ($($n:expr),+ $(,)?) => { $(
        paste::item! {
            #[test]
            fn [< from_hex_array_ $n >]() {
                let input = make_input($n);
                let arr: [u8; $n] = input.as_slice().try_into().unwrap();
                let hex: String = better_hex::encode(&arr).unwrap();
                let decoded: [u8; $n] = better_hex::decode(&hex).unwrap();
                assert_eq!(decoded, arr);
                let ct_decoded: [u8; $n] = better_hex::ct::decode_to(&hex).unwrap();
                assert_eq!(ct_decoded, arr);
            }
        }
    )+ };
}

// Can't use paste — let's just write them out. We need a few representative sizes.
#[test]
fn from_hex_array_sizes() {
    macro_rules! check_array {
        ($n:expr) => {{
            let input = make_input($n);
            let hex: String = better_hex::encode(&input).unwrap();
            let decoded: [u8; $n] = better_hex::decode(&hex).unwrap();
            assert_eq!(&decoded[..], &input[..], "FromHex<[u8; {}]> failed", $n);
            let ct: [u8; $n] = better_hex::ct::decode_to(&hex).unwrap();
            assert_eq!(&ct[..], &input[..], "ct::FromHex<[u8; {}]> failed", $n);
        }};
    }
    check_array!(0);
    check_array!(1);
    check_array!(2);
    check_array!(4);
    check_array!(8);
    check_array!(15);
    check_array!(16);
    check_array!(17);
    check_array!(31);
    check_array!(32);
    check_array!(33);
    check_array!(64);
    check_array!(128);
    check_array!(255);
    check_array!(256);
    check_array!(512);
}

// ── HexTarget for String ────────────────────────────────────────────────────

#[test]
fn hex_target_string_all_sizes() {
    for size in 0..=MAX {
        let input = make_input(size);
        let s: String = <String as HexTarget>::encode_hex(&input).unwrap();
        assert_eq!(s.len(), size * 2, "HexTarget<String> length wrong at size {size}");
        let upper: String = <String as HexTarget>::encode_hex_upper(&input).unwrap();
        assert_eq!(upper.len(), size * 2);
    }
}

// ── HexTarget for HexStr<N> — representative sizes ──────────────────────────

#[test]
fn hex_str_roundtrip_sizes() {
    use better_hex::HexStr;
    macro_rules! check_hex_str {
        ($n:expr) => {{
            let input = make_input($n);
            let arr: [u8; $n] = input.as_slice().try_into().unwrap();
            let hex: HexStr<$n> = HexStr::encode_lower(&arr);
            assert_eq!(hex.decode(), arr, "HexStr<{}> roundtrip failed", $n);
            let upper: HexStr<$n> = HexStr::encode_upper(&arr);
            assert_eq!(upper.decode(), arr, "HexStr<{}> upper roundtrip failed", $n);
        }};
    }
    check_hex_str!(0);
    check_hex_str!(1);
    check_hex_str!(2);
    check_hex_str!(4);
    check_hex_str!(8);
    check_hex_str!(15);
    check_hex_str!(16);
    check_hex_str!(17);
    check_hex_str!(31);
    check_hex_str!(32);
    check_hex_str!(33);
    check_hex_str!(64);
    check_hex_str!(128);
    check_hex_str!(255);
    check_hex_str!(256);
}

// ── Display formatting ──────────────────────────────────────────────────────

#[test]
fn display_all_sizes() {
    for size in 0..=MAX {
        let input = make_input(size);
        let expected: String = better_hex::encode(&input).unwrap();
        let expected_upper: String = better_hex::encode_upper(&input).unwrap();

        let d = format!("{}", better_hex::display(&input));
        assert_eq!(d, expected, "Display mismatch at size {size}");

        let x = format!("{:x}", better_hex::display(&input));
        assert_eq!(x, expected, "LowerHex mismatch at size {size}");

        let upper = format!("{:X}", better_hex::display(&input));
        assert_eq!(upper, expected_upper, "UpperHex mismatch at size {size}");

        let alt_lower = format!("{:#x}", better_hex::display(&input));
        assert_eq!(alt_lower, format!("0x{expected}"), "alt LowerHex mismatch at size {size}");

        let alt_upper = format!("{:#X}", better_hex::display(&input));
        assert_eq!(alt_upper, format!("0x{expected_upper}"), "alt UpperHex mismatch at size {size}");
    }
}

// ── heapless ────────────────────────────────────────────────────────────────

#[cfg(feature = "heapless")]
#[test]
fn heapless_all_sizes() {
    const CAP: usize = 1024;
    for size in 0..=MAX.min(CAP / 2) {
        let input = make_input(size);
        // HexTarget for heapless::String
        let hex: heapless::String<CAP> = better_hex::encode(&input).unwrap();
        assert_eq!(hex.len(), size * 2, "heapless::String encode length at size {size}");

        // FromHex for heapless::Vec
        let decoded: heapless::Vec<u8, CAP> = better_hex::decode(hex.as_str()).unwrap();
        assert_eq!(&decoded[..], &input[..], "heapless::Vec roundtrip at size {size}");
    }
}

// ── arrayvec ────────────────────────────────────────────────────────────────

#[cfg(feature = "arrayvec")]
#[test]
fn arrayvec_all_sizes() {
    const CAP: usize = 1024;
    for size in 0..=MAX.min(CAP / 2) {
        let input = make_input(size);
        // HexTarget for arrayvec::ArrayString
        let hex: arrayvec::ArrayString<CAP> = better_hex::encode(&input).unwrap();
        assert_eq!(hex.len(), size * 2, "ArrayString encode length at size {size}");

        // FromHex for arrayvec::ArrayVec
        let decoded: arrayvec::ArrayVec<u8, CAP> = better_hex::decode(hex.as_str()).unwrap();
        assert_eq!(&decoded[..], &input[..], "ArrayVec roundtrip at size {size}");
    }
}

// ── serde (all 8 modules) ───────────────────────────────────────────────────

#[cfg(feature = "serde")]
mod serde_exhaustive {
    use super::make_input;
    use serde::{Deserialize, Serialize};

    const MAX: usize = super::MAX;

    macro_rules! serde_vec_roundtrip {
        ($name:ident, $mod:literal) => {
            #[derive(Serialize, Deserialize, Debug, PartialEq)]
            struct $name {
                #[serde(with = $mod)]
                data: Vec<u8>,
            }
        };
    }

    serde_vec_roundtrip!(Fast, "better_hex::serde");
    serde_vec_roundtrip!(Upper, "better_hex::serde::upper");
    serde_vec_roundtrip!(Prefixed, "better_hex::serde::prefixed");
    serde_vec_roundtrip!(UpperPrefixed, "better_hex::serde::upper_prefixed");
    serde_vec_roundtrip!(Ct, "better_hex::serde::ct");
    serde_vec_roundtrip!(CtUpper, "better_hex::serde::ct::upper");
    serde_vec_roundtrip!(CtPrefixed, "better_hex::serde::ct::prefixed");
    serde_vec_roundtrip!(CtUpperPrefixed, "better_hex::serde::ct::upper_prefixed");

    macro_rules! test_serde_module {
        ($test_name:ident, $ty:ident) => {
            #[test]
            fn $test_name() {
                for size in 0..=MAX {
                    let data = make_input(size);
                    let original = $ty { data };
                    let json = serde_json::to_string(&original)
                        .unwrap_or_else(|e| panic!("serialize failed at size {size}: {e}"));
                    let decoded: $ty = serde_json::from_str(&json)
                        .unwrap_or_else(|e| panic!("deserialize failed at size {size}: {e}"));
                    assert_eq!(decoded, original, "{} roundtrip failed at size {size}", stringify!($ty));
                }
            }
        };
    }

    test_serde_module!(fast_roundtrip, Fast);
    test_serde_module!(upper_roundtrip, Upper);
    test_serde_module!(prefixed_roundtrip, Prefixed);
    test_serde_module!(upper_prefixed_roundtrip, UpperPrefixed);
    test_serde_module!(ct_roundtrip, Ct);
    test_serde_module!(ct_upper_roundtrip, CtUpper);
    test_serde_module!(ct_prefixed_roundtrip, CtPrefixed);
    test_serde_module!(ct_upper_prefixed_roundtrip, CtUpperPrefixed);
}
