//! Tests for [`HexTarget`] trait and [`encode`]/[`encode_upper`].

#![cfg(feature = "alloc")]

#[test]
fn encode_string_lowercase() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let result: Result<String, _> = better_hex::encode(&input);
    assert_eq!(result, Ok("deadbeef".to_string()));
}

#[test]
fn encode_string_uppercase() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let result: Result<String, _> = better_hex::encode_upper(&input);
    assert_eq!(result, Ok("DEADBEEF".to_string()));
}

#[test]
fn encode_string_empty() {
    let input: [u8; 0] = [];
    let result: Result<String, _> = better_hex::encode(&input);
    assert_eq!(result, Ok(String::new()));
}

#[test]
fn encode_string_single_byte() {
    let input = [0xff];
    let result: Result<String, _> = better_hex::encode(&input);
    assert_eq!(result, Ok("ff".to_string()));
}

#[test]
fn encode_string_all_zeros() {
    let input = [0u8; 32];
    let result: Result<String, _> = better_hex::encode(&input);
    assert_eq!(result, Ok("0".repeat(64)));
}

#[test]
fn encode_large_input() {
    let input = vec![0xab; 4096];
    let result: String = better_hex::encode(&input).unwrap();
    assert_eq!(result.len(), 8192);
    assert!(result.chars().all(|c| c == 'a' || c == 'b'));
}

/// `String` allocation is infallible (barring OOM which panics), so `encode`
/// on a `String` target never returns an error regardless of size.
#[test]
fn encode_string_never_returns_err() {
    let input = [0u8; 1];
    let result: Result<String, _> = better_hex::encode(&input);
    assert!(result.is_ok());
}

/// Roundtrip: encode then decode_to.
#[test]
fn encode_roundtrip() {
    let original = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];
    let hex: String = better_hex::encode(&original).unwrap();
    let decoded: [u8; 8] = better_hex::decode(&hex).unwrap();
    assert_eq!(decoded, original);
}

#[cfg(feature = "heapless")]
mod heapless_tests {
    use better_hex::HexTarget;

    #[test]
    fn heapless_string_encode_hex() {
        let s = heapless::String::<8>::encode_hex(&[0xde, 0xad]).unwrap();
        assert_eq!(s.as_str(), "dead");
    }

    #[test]
    fn heapless_string_encode_hex_upper() {
        let s = heapless::String::<8>::encode_hex_upper(&[0xde, 0xad]).unwrap();
        assert_eq!(s.as_str(), "DEAD");
    }

    #[test]
    fn heapless_string_capacity_overflow() {
        let err = heapless::String::<3>::encode_hex(&[0xde, 0xad]);
        assert!(err.is_err());
    }

    #[test]
    fn heapless_string_empty() {
        let s = heapless::String::<0>::encode_hex(&[]).unwrap();
        assert_eq!(s.as_str(), "");
    }

    #[test]
    fn heapless_string_exact_capacity() {
        let s = heapless::String::<4>::encode_hex(&[0xab, 0xcd]).unwrap();
        assert_eq!(s.as_str(), "abcd");
    }
}

#[cfg(feature = "arrayvec")]
mod arrayvec_tests {
    use better_hex::HexTarget;

    #[test]
    fn arrayvec_string_encode_hex() {
        let s = arrayvec::ArrayString::<8>::encode_hex(&[0xde, 0xad]).unwrap();
        assert_eq!(s.as_str(), "dead");
    }

    #[test]
    fn arrayvec_string_encode_hex_upper() {
        let s = arrayvec::ArrayString::<8>::encode_hex_upper(&[0xde, 0xad]).unwrap();
        assert_eq!(s.as_str(), "DEAD");
    }

    #[test]
    fn arrayvec_string_capacity_overflow() {
        let err = arrayvec::ArrayString::<3>::encode_hex(&[0xde, 0xad]);
        assert!(err.is_err());
    }

    #[test]
    fn arrayvec_string_empty() {
        let s = arrayvec::ArrayString::<0>::encode_hex(&[]).unwrap();
        assert_eq!(s.as_str(), "");
    }
}
