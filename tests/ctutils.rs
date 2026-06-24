#![cfg(feature = "ctutils")]

use better_hex::ctutils;

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

/// Exercise the SIMD chunk loops (16/32/64-byte) and the scalar tail, not just
/// the short scalar-only path the other tests hit. This is what would catch a
/// wrong cast or a broken `*_accum` wrapper in the dispatched backends.
#[test]
fn covers_simd_chunk_sizes() {
    for n in [16usize, 31, 32, 47, 64, 100] {
        let bytes: Vec<u8> = (0..n).map(|i| (i as u8).wrapping_mul(7)).collect();

        let mut hex = vec![0u8; n * 2];
        assert_choice(ctutils::encode_to_slice(&bytes, &mut hex), true);
        assert_choice(ctutils::check(&hex), true);

        let mut out = vec![0u8; n];
        assert_choice(ctutils::decode_to_slice(&hex, &mut out), true);
        assert_eq!(out, bytes);

        // Corrupt one byte anywhere -> invalid for both check and decode.
        let mut bad = hex.clone();
        bad[n] = b'Z';
        assert_choice(ctutils::check(&bad), false);
        assert_choice(ctutils::decode_to_slice(&bad, &mut out), false);
    }
}
