#![no_main]

use better_hex::{
    ct, decode_to_slice, encode_to_slice, encode_to_slice_upper,
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

    // 2. CT encode -> CT decode must roundtrip
    {
        let mut encoded = vec![0u8; hex_len];
        let hex = ct::encode_lower(data, &mut encoded).expect("ct::encode_lower failed");
        let mut decoded = vec![0u8; data.len()];
        let result = ct::decode(hex.as_bytes(), &mut decoded).expect("ct::decode failed");
        assert_eq!(result, data, "ct roundtrip mismatch");
    }

    // 3. CT encode must equal fast encode
    {
        let mut fast_enc = vec![0u8; hex_len];
        let mut ct_enc = vec![0u8; hex_len];
        encode_to_slice(data, &mut fast_enc).expect("encode_to_slice failed");
        ct::encode_lower(data, &mut ct_enc).expect("ct::encode_lower failed");
        assert_eq!(fast_enc, ct_enc, "fast encode != ct encode");
    }

    // 4. Upper encode -> decode must roundtrip
    {
        let mut encoded = vec![0u8; hex_len];
        let hex = encode_to_slice_upper(data, &mut encoded).expect("encode_to_slice_upper failed");
        let mut decoded = vec![0u8; data.len()];
        let result = decode_to_slice(hex.as_bytes(), &mut decoded).expect("decode_to_slice (upper) failed");
        assert_eq!(result, data, "upper roundtrip mismatch");
    }
});
