#![no_main]

use better_hex::{
    const_check, const_decode_to_array, decode_to_slice, encode_to_slice, encode_to_slice_upper,
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

    // 2. const_check / const_decode_to_array agree with runtime encode
    {
        let mut encoded = vec![0u8; hex_len];
        let hex = encode_to_slice(data, &mut encoded).expect("encode_to_slice failed");
        assert!(const_check(hex.as_bytes()), "const_check rejected valid hex");

        // const_decode_to_array is generic over N, so we can only call it for
        // fixed sizes. Test a few common ones when the input happens to match.
        match data.len() {
            1 => {
                let decoded = const_decode_to_array::<1>(hex.as_bytes()).expect("const_decode failed");
                assert_eq!(&decoded, data, "const_decode roundtrip mismatch (N=1)");
            }
            4 => {
                let decoded = const_decode_to_array::<4>(hex.as_bytes()).expect("const_decode failed");
                assert_eq!(&decoded, data, "const_decode roundtrip mismatch (N=4)");
            }
            16 => {
                let decoded = const_decode_to_array::<16>(hex.as_bytes()).expect("const_decode failed");
                assert_eq!(&decoded, data, "const_decode roundtrip mismatch (N=16)");
            }
            32 => {
                let decoded = const_decode_to_array::<32>(hex.as_bytes()).expect("const_decode failed");
                assert_eq!(&decoded, data, "const_decode roundtrip mismatch (N=32)");
            }
            _ => {}
        }
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
