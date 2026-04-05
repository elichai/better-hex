#![no_main]

use better_hex::{ct, decode_to_slice, encode_to_slice, Error};
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
    let correct_hex_len = data.len() * 2;

    // encode_to_slice with potentially wrong output size
    {
        let mut buf = vec![0u8; out_len];
        let result = encode_to_slice(data, &mut buf);
        if out_len == correct_hex_len {
            result.expect("encode failed with correct length");
        } else {
            assert!(
                matches!(result, Err(Error::InvalidLength { .. })),
                "encode should fail with wrong length, got {result:?}"
            );
        }
    }

    // decode_to_slice with potentially wrong output size
    {
        let mut hex = vec![0u8; correct_hex_len];
        encode_to_slice(data, &mut hex).unwrap();

        let mut buf = vec![0u8; out_len];
        let result = decode_to_slice(&hex, &mut buf);
        if out_len == data.len() {
            result.expect("decode failed with correct length");
        } else {
            assert!(
                matches!(result, Err(Error::InvalidLength { .. })),
                "decode should fail with wrong length, got {result:?}"
            );
        }
    }

    // ct::decode with potentially wrong output size
    {
        let mut hex = vec![0u8; correct_hex_len];
        encode_to_slice(data, &mut hex).unwrap();

        let mut buf = vec![0u8; out_len];
        let result = ct::decode(&hex, &mut buf);
        if out_len == data.len() {
            result.expect("ct::decode failed with correct length");
        } else {
            assert!(
                matches!(result, Err(Error::InvalidLength { .. })),
                "ct::decode should fail with wrong length, got {result:?}"
            );
        }
    }

    // decode::<[u8; 4]> with various input lengths
    {
        let hex_input: Vec<u8> = (0..out_len)
            .map(|i| b"0123456789abcdef"[i % 16])
            .collect();
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
});
