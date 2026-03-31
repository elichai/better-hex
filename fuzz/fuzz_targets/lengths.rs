#![no_main]

use better_hex::{ct, decode_to_array, decode_to_slice, encode_to_slice, Error};
use libfuzzer_sys::arbitrary;
use libfuzzer_sys::arbitrary::Arbitrary;
use libfuzzer_sys::fuzz_target;

#[derive(Arbitrary, Debug)]
struct Input {
    data: Vec<u8>,
    output_len: u8,
}

fuzz_target!(|input: Input| {
    let data = &input.data;
    let out_len = input.output_len as usize;
    let correct_encode_len = data.len() * 2;

    // --- encode_to_slice with potentially wrong output size ---
    {
        let mut buf = vec![0u8; out_len];
        let result = encode_to_slice(data, &mut buf);
        if out_len == correct_encode_len {
            assert!(result.is_ok(), "encode_to_slice unexpectedly failed with correct length");
        } else {
            match result {
                Err(Error::InvalidLength { expected, got }) => {
                    assert_eq!(expected, correct_encode_len, "encode wrong expected length");
                    assert_eq!(got, out_len, "encode wrong got length");
                }
                Err(e) => panic!("encode_to_slice returned unexpected error: {e:?}"),
                Ok(_) => panic!("encode_to_slice succeeded with wrong output length {out_len} (expected {correct_encode_len})"),
            }
        }
    }

    // --- decode_to_slice with potentially wrong output size ---
    // Build a valid hex string from data to use as decode input.
    {
        let mut hex = vec![0u8; correct_encode_len];
        encode_to_slice(data, &mut hex).unwrap();

        // Decode into a buffer of `out_len` bytes (correct would be data.len()).
        let mut buf = vec![0u8; out_len];
        let result = decode_to_slice(&hex, &mut buf);
        if out_len == data.len() {
            assert!(result.is_ok(), "decode_to_slice unexpectedly failed with correct length");
        } else {
            match result {
                Err(Error::InvalidLength { .. }) => {}
                Err(e) => panic!("decode_to_slice returned unexpected error: {e:?}"),
                Ok(_) => panic!(
                    "decode_to_slice succeeded with wrong output length {out_len} (correct {})",
                    data.len()
                ),
            }
        }
    }

    // --- decode_to_array::<4> with various input lengths ---
    // correct input length for 4-byte output is 8 hex chars.
    {
        // Build an input of `out_len` bytes (we reuse output_len as input length here).
        // Fill it with valid hex bytes so that length is the only variable.
        let hex_input: Vec<u8> = (0..out_len)
            .map(|i| b"0123456789abcdef"[i % 16])
            .collect();
        let result = decode_to_array::<4>(&hex_input);
        if out_len == 8 {
            assert!(result.is_ok(), "decode_to_array::<4> failed with correct length 8");
        } else {
            match result {
                Err(Error::InvalidLength { expected, got }) => {
                    assert_eq!(expected, 8, "decode_to_array expected should be 8");
                    assert_eq!(got, out_len, "decode_to_array got mismatch");
                }
                Err(e) => panic!("decode_to_array::<4> returned unexpected error: {e:?}"),
                Ok(_) => panic!(
                    "decode_to_array::<4> succeeded with wrong input length {out_len} (expected 8)"
                ),
            }
        }
    }

    // --- ct::decode with potentially wrong output size ---
    {
        let mut hex = vec![0u8; correct_encode_len];
        encode_to_slice(data, &mut hex).unwrap();

        let mut buf = vec![0u8; out_len];
        let result = ct::decode(&hex, &mut buf);
        if out_len == data.len() {
            assert!(result.is_ok(), "ct::decode unexpectedly failed with correct length");
        } else {
            match result {
                Err(Error::InvalidLength { .. }) => {}
                Err(e) => panic!("ct::decode returned unexpected error: {e:?}"),
                Ok(_) => panic!(
                    "ct::decode succeeded with wrong output length {out_len} (correct {})",
                    data.len()
                ),
            }
        }
    }
});
