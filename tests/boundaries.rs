//! Tests at SIMD chunk boundary lengths.
//!
//! SIMD backends process data in chunks (16 for NEON/SSSE3/WASM, 32 for AVX2).
//! These tests exercise exact boundaries, one below, and one above to catch
//! off-by-one errors in the chunk/tail transition.

const BOUNDARY_SIZES: &[usize] = &[
    0, 1, 2,
    15, 16, 17,
    31, 32, 33,
    63, 64, 65,
    127, 128, 129,
    255, 256, 257,
];

#[test]
fn encode_decode_roundtrip_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let hex = better_hex::encode(&input);
        assert_eq!(hex.len(), size * 2, "encode length wrong for size {size}");
        let decoded = better_hex::decode(&hex).unwrap();
        assert_eq!(decoded, input, "roundtrip failed for size {size}");
    }
}

#[test]
fn encode_upper_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let hex = better_hex::encode_upper(&input);
        assert_eq!(hex.len(), size * 2);
        for b in hex.bytes() {
            assert!(
                matches!(b, b'0'..=b'9' | b'A'..=b'F'),
                "unexpected char 0x{b:02x} at size {size}"
            );
        }
    }
}

#[test]
fn check_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let hex = better_hex::encode(&input);
        assert!(better_hex::check(hex.as_bytes()), "check failed for size {size}");
    }
}

#[test]
fn decode_invalid_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        if size < 2 { continue; }
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let mut hex = better_hex::encode(&input).into_bytes();
        *hex.last_mut().unwrap() = b'G';
        let result = better_hex::decode(&hex);
        assert!(result.is_err(), "should fail for corrupted size {size}");
    }
}
