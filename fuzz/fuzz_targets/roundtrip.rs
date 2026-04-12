#![no_main]

use better_hex::{
    decode_to_slice, encode_to_slice, encode_to_slice_upper,
};
use libfuzzer_sys::fuzz_target;

fuzz_target!(|data: &[u8]| {
    let hex_len = data.len() * 2;

    // 1. encode (lower) -> decode must roundtrip
    {
        let mut encoded = vec![0u8; hex_len];
        let hex = encode_to_slice(data, &mut encoded).expect("encode_to_slice failed");
        let mut decoded = vec![0u8; data.len()];
        let result = decode_to_slice(hex.as_bytes(), &mut decoded).expect("decode_to_slice failed");
        assert_eq!(result, data, "lower roundtrip mismatch");
    }

    // 2. encode again -> decode must roundtrip (was CT path, now single path)
    {
        let mut encoded = vec![0u8; hex_len];
        let hex = encode_to_slice(data, &mut encoded).expect("encode_to_slice failed");
        let mut decoded = vec![0u8; data.len()];
        let result = decode_to_slice(hex.as_bytes(), &mut decoded).expect("decode_to_slice failed");
        assert_eq!(result, data, "roundtrip mismatch");
    }

    // 3. Upper encode -> decode must roundtrip
    {
        let mut encoded = vec![0u8; hex_len];
        let hex = encode_to_slice_upper(data, &mut encoded).expect("encode_to_slice_upper failed");
        let mut decoded = vec![0u8; data.len()];
        let result = decode_to_slice(hex.as_bytes(), &mut decoded).expect("decode_to_slice (upper) failed");
        assert_eq!(result, data, "upper roundtrip mismatch");
    }
});
