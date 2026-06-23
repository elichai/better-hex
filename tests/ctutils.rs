#![cfg(feature = "ctutils")]

use better_hex::ctutils;

fn assert_choice(choice: ctutils::Choice, expected: bool) {
    assert_eq!(choice.to_u8(), u8::from(expected));
}

#[test]
fn ctutils_does_not_collapse_result_discriminants() {
    let source = include_str!("../src/ctutils.rs");
    assert!(!source.contains("choice_from_result"));
    assert!(!source.contains(".is_ok() as u8"));
    assert!(!source.contains("CtHexTarget"));
    assert!(!source.contains("CtFromHex"));
    assert!(!source.contains("pub fn encode<"));
    assert!(!source.contains("pub fn encode_upper<"));
    assert!(!source.contains("pub fn decode<"));
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

    assert_choice(ctutils::encode_to_slice(&input, &mut output), true);
    assert_eq!(&output, b"deadbeef");

    assert_choice(ctutils::encode_to_slice_upper(&input, &mut output), true);
    assert_eq!(&output, b"DEADBEEF");

    let mut short = [0u8; 7];
    assert_choice(ctutils::encode_to_slice(&input, &mut short), false);
}

#[test]
fn const_check_returns_choice() {
    const VALID_CHECK: ctutils::Choice = ctutils::const_check(b"deadBEEF");
    const INVALID_CHECK: ctutils::Choice = ctutils::const_check(b"abc");

    assert_eq!(VALID_CHECK.to_u8(), 1);
    assert_eq!(INVALID_CHECK.to_u8(), 0);
}
