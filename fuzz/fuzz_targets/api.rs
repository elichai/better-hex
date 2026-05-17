#![cfg_attr(not(miri), no_main)]

#[cfg(miri)]
mod miri_replay;

use better_hex::{Error, const_check, const_decode_to_array, decode_to_slice, encode_to_slice, encode_to_slice_upper};
use libfuzzer_sys::arbitrary::{self, Arbitrary};
use libfuzzer_sys::fuzz_target;

#[derive(Arbitrary, Debug)]
struct Input {
    data: Vec<u8>,
    output_len: u8,
}

fuzz_target!(|input: Input| {
    let data = &input.data;
    let out_len = input.output_len as usize;

    let lower = check_roundtrips(data);
    check_length_errors(data, &lower, out_len);
    check_array_decode_length(out_len);
});

fn check_roundtrips(data: &[u8]) -> Vec<u8> {
    let lower = encode(data, false);
    let upper = encode(data, true);

    assert!(const_check(&lower), "const_check rejected lowercase hex");
    assert_const_decode_samples(&lower, data);

    let mut decoded = vec![0u8; data.len()];
    let result = decode_to_slice(&lower, &mut decoded).expect("decode_to_slice failed");
    assert_eq!(result, data, "lower roundtrip mismatch");

    let mut decoded_upper = vec![0u8; data.len()];
    let result = decode_to_slice(&upper, &mut decoded_upper).expect("decode_to_slice (upper) failed");
    assert_eq!(result, data, "upper roundtrip mismatch");

    lower
}

fn check_length_errors(data: &[u8], hex: &[u8], out_len: usize) {
    let correct_hex_len = checked_hex_len(data);

    let mut encoded = vec![0u8; out_len];
    let result = encode_to_slice(data, &mut encoded);
    if out_len == correct_hex_len {
        result.expect("encode failed with correct length");
    } else {
        assert!(
            matches!(result, Err(Error::InvalidLength { .. })),
            "encode should fail with wrong length, got {result:?}"
        );
    }

    let mut decoded = vec![0u8; out_len];
    let result = decode_to_slice(hex, &mut decoded);
    if out_len == data.len() {
        result.expect("decode failed with correct length");
    } else {
        assert!(
            matches!(result, Err(Error::InvalidLength { .. })),
            "decode should fail with wrong length, got {result:?}"
        );
    }
}

fn check_array_decode_length(out_len: usize) {
    let hex_input: Vec<u8> = (0..out_len).map(|i| b"0123456789abcdef"[i % 16]).collect();
    let result = better_hex::decode::<[u8; 4]>(&hex_input);
    if out_len == 8 {
        result.expect("decode::<[u8; 4]> failed with correct length");
    } else {
        assert!(
            matches!(result, Err(Error::InvalidLength { .. })),
            "decode::<[u8; 4]> should fail with wrong length, got {result:?}"
        );
    }
}

fn assert_const_decode_samples(hex: &[u8], data: &[u8]) {
    match data.len() {
        0 => assert_const_decode::<0>(hex, data),
        1 => assert_const_decode::<1>(hex, data),
        4 => assert_const_decode::<4>(hex, data),
        16 => assert_const_decode::<16>(hex, data),
        32 => assert_const_decode::<32>(hex, data),
        _ => {}
    }
}

fn assert_const_decode<const N: usize>(hex: &[u8], data: &[u8]) {
    let decoded = const_decode_to_array::<N>(hex).expect("const_decode failed");
    assert_eq!(decoded.as_slice(), data, "const_decode roundtrip mismatch");
}

fn encode(data: &[u8], upper: bool) -> Vec<u8> {
    let mut encoded = vec![0u8; checked_hex_len(data)];
    if upper {
        encode_to_slice_upper(data, &mut encoded).expect("encode_to_slice_upper failed");
    } else {
        encode_to_slice(data, &mut encoded).expect("encode_to_slice failed");
    }
    encoded
}

fn checked_hex_len(data: &[u8]) -> usize {
    data.len().checked_mul(2).expect("hex length overflow")
}

#[cfg(miri)]
fn main() {
    miri_replay::replay("corpus/api");
}
