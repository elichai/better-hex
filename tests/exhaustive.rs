//! Exhaustive size-loop tests: exercise every public API at sizes 0..=512.

#![cfg(feature = "alloc")]

use better_hex::{FromHex, HexTarget, ToHex};
use core::fmt::Write;

const MAX: usize = 512;

/// Deterministic test input for a given size.
fn make_input(size: usize) -> Vec<u8> {
    (0..size).map(|i| ((i as u8).wrapping_mul(37)).wrapping_add(11)).collect()
}

// ── Core roundtrips (encode/decode, CT, check, traits, display) ─────────────

#[test]
fn roundtrip_all_apis() {
    for size in 0..=MAX {
        let input = make_input(size);
        let hex_len = size * 2;

        // encode_to_slice / decode_to_slice — lower
        let mut hex_buf = vec![0u8; hex_len];
        better_hex::encode_to_slice(&input, &mut hex_buf).unwrap();
        let mut dec_buf = vec![0u8; size];
        better_hex::decode_to_slice(&hex_buf, &mut dec_buf).unwrap();
        assert_eq!(dec_buf, input, "slice roundtrip (lower) failed at size {size}");

        // encode_to_slice / decode_to_slice — upper
        better_hex::encode_to_slice_upper(&input, &mut hex_buf).unwrap();
        better_hex::decode_to_slice(&hex_buf, &mut dec_buf).unwrap();
        assert_eq!(dec_buf, input, "slice roundtrip (upper) failed at size {size}");

        // encode::<String> / decode::<Vec<u8>>
        let hex: String = better_hex::encode(&input).unwrap();
        assert_eq!(hex.len(), hex_len);
        let decoded: Vec<u8> = better_hex::decode(&hex).unwrap();
        assert_eq!(decoded, input, "String/Vec roundtrip failed at size {size}");

        // CT encode/decode — lower and upper
        let mut ct_hex = vec![0u8; hex_len];
        better_hex::ct::encode_lower(&input, &mut ct_hex).unwrap();
        let mut ct_dec = vec![0u8; size];
        better_hex::ct::decode(&ct_hex, &mut ct_dec).unwrap();
        assert_eq!(ct_dec, input, "CT lower roundtrip failed at size {size}");

        better_hex::ct::encode_upper(&input, &mut ct_hex).unwrap();
        better_hex::ct::decode(&ct_hex, &mut ct_dec).unwrap();
        assert_eq!(ct_dec, input, "CT upper roundtrip failed at size {size}");

        // check / ct::check
        assert!(better_hex::check(hex.as_bytes()), "check failed at size {size}");
        assert!(better_hex::ct::check(hex.as_bytes()), "ct::check failed at size {size}");

        // FromHex for Vec<u8> and ct::FromHex for Vec<u8>
        let from_hex_vec = Vec::<u8>::from_hex(&hex).unwrap();
        assert_eq!(from_hex_vec, input, "FromHex<Vec> at size {size}");
        let ct_from_hex_vec = <Vec<u8> as better_hex::ct::FromHex>::from_hex(&hex).unwrap();
        assert_eq!(ct_from_hex_vec, input, "ct::FromHex<Vec> at size {size}");

        // ToHex — write_hex + encode_hex (lower and upper)
        let expected_upper: String = better_hex::encode_upper(&input).unwrap();

        let mut buf = String::new();
        input.as_slice().write_hex(&mut buf, false).unwrap();
        assert_eq!(buf, hex, "write_hex lower at size {size}");
        buf.clear();
        input.as_slice().write_hex(&mut buf, true).unwrap();
        assert_eq!(buf, expected_upper, "write_hex upper at size {size}");

        let trait_lower: String = input.as_slice().encode_hex().unwrap();
        assert_eq!(trait_lower, hex, "encode_hex at size {size}");
        let trait_upper: String = input.as_slice().encode_hex_upper().unwrap();
        assert_eq!(trait_upper, expected_upper, "encode_hex_upper at size {size}");

        // HexTarget for String (lower + upper)
        let ht: String = <String as HexTarget>::encode_hex(&input).unwrap();
        assert_eq!(ht.len(), hex_len);
        let ht_upper: String = <String as HexTarget>::encode_hex_upper(&input).unwrap();
        assert_eq!(ht_upper.len(), hex_len);

        // Display (all 5 format modes)
        assert_eq!(format!("{}", better_hex::display(&input)), hex);
        assert_eq!(format!("{:x}", better_hex::display(&input)), hex);
        assert_eq!(format!("{:X}", better_hex::display(&input)), expected_upper);
        assert_eq!(format!("{:#x}", better_hex::display(&input)), format!("0x{hex}"));
        assert_eq!(format!("{:#X}", better_hex::display(&input)), format!("0x{expected_upper}"));
    }
}

// ── FromHex for [u8; N] — representative sizes (requires const generics) ────

#[test]
fn from_hex_array_sizes() {
    fn check<const N: usize>() {
        let input = make_input(N);
        let hex: String = better_hex::encode(&input).unwrap();
        let decoded: [u8; N] = better_hex::decode(&hex).unwrap();
        assert_eq!(&decoded[..], &input[..]);
        let ct: [u8; N] = better_hex::ct::decode_to(&hex).unwrap();
        assert_eq!(&ct[..], &input[..]);
    }
    check::<0>(); check::<1>(); check::<2>(); check::<4>(); check::<8>();
    check::<15>(); check::<16>(); check::<17>(); check::<31>(); check::<32>(); check::<33>();
    check::<64>(); check::<128>(); check::<255>(); check::<256>(); check::<512>();
}

// ── HexStr<N> roundtrip — representative sizes ─────────────────────────────

#[test]
fn hex_str_roundtrip_sizes() {
    use better_hex::{HexStr, PrefixedHexStr};
    fn check<const N: usize>() {
        let input = make_input(N);
        let arr: [u8; N] = input.as_slice().try_into().unwrap();
        let lower: HexStr<N> = HexStr::encode_lower(&arr);
        assert_eq!(lower.decode(), arr);
        let upper: HexStr<N> = HexStr::encode_upper(&arr);
        assert_eq!(upper.decode(), arr);
        // Prefixed variants
        let p_lower: PrefixedHexStr<N> = HexStr::encode_lower(&arr);
        assert_eq!(p_lower.decode(), arr);
        assert!(p_lower.as_str().starts_with("0x"));
        let p_upper: PrefixedHexStr<N> = HexStr::encode_upper(&arr);
        assert_eq!(p_upper.decode(), arr);
        assert!(p_upper.as_str().starts_with("0x"));
    }
    check::<0>(); check::<1>(); check::<2>(); check::<4>(); check::<8>();
    check::<15>(); check::<16>(); check::<17>(); check::<31>(); check::<32>(); check::<33>();
    check::<64>(); check::<128>(); check::<255>(); check::<256>();
}

// ── heapless ────────────────────────────────────────────────────────────────

#[cfg(feature = "heapless")]
#[test]
fn heapless_all_sizes() {
    const CAP: usize = 1024;
    for size in 0..=MAX.min(CAP / 2) {
        let input = make_input(size);
        let hex: heapless::String<CAP> = better_hex::encode(&input).unwrap();
        assert_eq!(hex.len(), size * 2);
        let _upper: heapless::String<CAP> = better_hex::encode_upper(&input).unwrap();
        let decoded: heapless::Vec<u8, CAP> = better_hex::decode(hex.as_str()).unwrap();
        assert_eq!(&decoded[..], &input[..]);
    }
}

// ── arrayvec ────────────────────────────────────────────────────────────────

#[cfg(feature = "arrayvec")]
#[test]
fn arrayvec_all_sizes() {
    const CAP: usize = 1024;
    for size in 0..=MAX.min(CAP / 2) {
        let input = make_input(size);
        let hex: arrayvec::ArrayString<CAP> = better_hex::encode(&input).unwrap();
        assert_eq!(hex.len(), size * 2);
        let _upper: arrayvec::ArrayString<CAP> = better_hex::encode_upper(&input).unwrap();
        let decoded: arrayvec::ArrayVec<u8, CAP> = better_hex::decode(hex.as_str()).unwrap();
        assert_eq!(&decoded[..], &input[..]);
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
