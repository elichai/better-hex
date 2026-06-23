#![cfg(feature = "ctutils")]

use better_hex::{HexStr, PrefixedHexStr, ctutils};

fn assert_choice(choice: ctutils::Choice, expected: bool) {
    assert_eq!(choice.to_u8(), u8::from(expected));
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
