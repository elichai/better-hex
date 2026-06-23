#![cfg(feature = "ctutils")]

use better_hex::{HexStr, PrefixedHexStr, ctutils};

fn assert_choice(choice: ctutils::Choice, expected: bool) {
    assert_eq!(choice.to_u8(), u8::from(expected));
}

#[test]
fn ctutils_does_not_collapse_result_discriminants() {
    let source = include_str!("../src/ctutils.rs");
    assert!(!source.contains("choice_from_result"));
    assert!(!source.contains(".is_ok() as u8"));
    assert!(!source.contains("crate::encode::<"));
    assert!(!source.contains("crate::encode_upper::<"));
    assert!(!source.contains("crate::decode::<"));
    assert!(!source.contains("crate::check("));
    assert!(!source.contains("crate::const_check("));
    assert!(!source.contains("crate::const_decode_to_array::<"));
    assert!(!source.contains("alloc::vec!"));
    assert!(!source.contains("decode_error_accum"));
    assert!(!source.contains("check_error_accum"));
}

#[test]
fn check_returns_choice() {
    assert_choice(ctutils::check(b"deadBEEF"), true);
    assert_choice(ctutils::check(b"abc"), false);
    assert_choice(ctutils::check(b"deadZEEF"), false);
}

#[test]
fn decode_to_slice_writes_output_and_reports_choice() {
    let mut output = [0u8; 4];
    assert_choice(ctutils::decode_to_slice(b"DeAdBeEf", &mut output), true);
    assert_eq!(output, [0xde, 0xad, 0xbe, 0xef]);

    assert_choice(ctutils::decode_to_slice(b"deadbeeZ", &mut output), false);
    assert_choice(ctutils::decode_to_slice(b"dead", &mut output), false);
}

#[test]
fn encode_to_slice_writes_output_and_reports_choice() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let mut output = [0u8; 8];

    assert_choice(ctutils::encode_to_slice(input, &mut output), true);
    assert_eq!(&output, b"deadbeef");

    assert_choice(ctutils::encode_to_slice_upper(input, &mut output), true);
    assert_eq!(&output, b"DEADBEEF");

    let mut short = [0u8; 7];
    assert_choice(ctutils::encode_to_slice(input, &mut short), false);
}

#[test]
fn generic_wrappers_report_success_without_returning_values() {
    assert_choice(ctutils::decode::<[u8; 4]>(b"deadbeef"), true);
    assert_choice(ctutils::decode::<[u8; 4]>(b"dead"), false);
    assert_choice(ctutils::decode::<[u8; 4]>(b"deadbeeZ"), false);

    assert_choice(ctutils::encode::<HexStr<2>>([0xab, 0xcd]), true);
    assert_choice(ctutils::encode::<HexStr<4>>([0xab, 0xcd]), false);
    assert_choice(ctutils::encode_upper::<PrefixedHexStr<2>>([0xab, 0xcd]), true);
}

#[cfg(feature = "alloc")]
#[test]
fn generic_alloc_wrappers_report_status() {
    use std::borrow::Cow;

    assert_choice(ctutils::encode::<String>(b"hello"), true);
    assert_choice(ctutils::decode::<Vec<u8>>(b"68656c6c6f"), true);
    assert_choice(ctutils::decode::<Vec<u8>>(b"68656c6c6"), false);
    assert_choice(ctutils::decode::<Cow<'static, [u8]>>(b"68656c6c6f"), true);
}

#[cfg(feature = "heapless")]
#[test]
fn generic_heapless_wrappers_report_capacity_status() {
    assert_choice(ctutils::encode::<heapless::String<8>>(b"abcd"), true);
    assert_choice(ctutils::encode::<heapless::String<8>>(b"abcde"), false);

    assert_choice(ctutils::decode::<heapless::Vec<u8, 4>>(b"deadbeef"), true);
    assert_choice(ctutils::decode::<heapless::Vec<u8, 3>>(b"deadbeef"), false);
    assert_choice(ctutils::decode::<heapless::Vec<u8, 4>>(b"deadbeeZ"), false);
}

#[cfg(feature = "arrayvec")]
#[test]
fn generic_arrayvec_wrappers_report_capacity_status() {
    assert_choice(ctutils::encode::<arrayvec::ArrayString<8>>(b"abcd"), true);
    assert_choice(ctutils::encode::<arrayvec::ArrayString<8>>(b"abcde"), false);

    assert_choice(ctutils::decode::<arrayvec::ArrayVec<u8, 4>>(b"deadbeef"), true);
    assert_choice(ctutils::decode::<arrayvec::ArrayVec<u8, 3>>(b"deadbeef"), false);
    assert_choice(ctutils::decode::<arrayvec::ArrayVec<u8, 4>>(b"deadbeeZ"), false);
}

#[test]
fn const_helpers_return_choice() {
    const VALID_CHECK: ctutils::Choice = ctutils::const_check(b"deadBEEF");
    const INVALID_CHECK: ctutils::Choice = ctutils::const_check(b"abc");
    const VALID_DECODE: ctutils::Choice = ctutils::const_decode_to_array::<4>(b"deadbeef");
    const INVALID_DECODE: ctutils::Choice = ctutils::const_decode_to_array::<4>(b"dead");

    assert_eq!(VALID_CHECK.to_u8(), 1);
    assert_eq!(INVALID_CHECK.to_u8(), 0);
    assert_eq!(VALID_DECODE.to_u8(), 1);
    assert_eq!(INVALID_DECODE.to_u8(), 0);
}
