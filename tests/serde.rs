//! Round-trip serde tests for `better_hex::serde` and all submodules.
//!
//! This test file requires `--features serde` to compile; it is skipped
//! (via `cfg`) when the feature is not active.

#![cfg(all(feature = "serde", feature = "alloc"))]

use serde::{Deserialize, Serialize};

// ── test structs ──────────────────────────────────────────────────────────────

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithVec {
    #[serde(with = "better_hex::serde")]
    data: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithArray {
    #[serde(with = "better_hex::serde")]
    data: [u8; 4],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithArray32 {
    #[serde(with = "better_hex::serde")]
    hash: [u8; 32],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithUpper {
    #[serde(with = "better_hex::serde::upper")]
    data: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithUpperArray {
    #[serde(with = "better_hex::serde::upper")]
    data: [u8; 4],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithPrefixed {
    #[serde(with = "better_hex::serde::prefixed")]
    data: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithPrefixedArray {
    #[serde(with = "better_hex::serde::prefixed")]
    data: [u8; 4],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithUpperPrefixed {
    #[serde(with = "better_hex::serde::upper_prefixed")]
    data: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithUpperPrefixedArray {
    #[serde(with = "better_hex::serde::upper_prefixed")]
    data: [u8; 4],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithCt {
    #[serde(with = "better_hex::serde::ct")]
    data: [u8; 4],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithCtArray32 {
    #[serde(with = "better_hex::serde::ct")]
    secret: [u8; 32],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithCtUpper {
    #[serde(with = "better_hex::serde::ct::upper")]
    data: [u8; 4],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithCtPrefixed {
    #[serde(with = "better_hex::serde::ct::prefixed")]
    data: [u8; 4],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct WithCtUpperPrefixed {
    #[serde(with = "better_hex::serde::ct::upper_prefixed")]
    data: [u8; 4],
}

// ── mixed struct (the canonical Tx example) ───────────────────────────────────

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct Tx {
    #[serde(with = "better_hex::serde")]
    hash: [u8; 4],
    #[serde(with = "better_hex::serde::ct")]
    secret_key: [u8; 4],
    #[serde(with = "better_hex::serde::prefixed")]
    address: Vec<u8>,
}

// ── better_hex::serde (lowercase, no prefix, fast) ───────────────────────────

#[test]
fn roundtrip_vec_lowercase() {
    let original = WithVec {
        data: vec![0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"deadbeef"}"#);
    let decoded: WithVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn roundtrip_array_lowercase() {
    let original = WithArray {
        data: [0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"deadbeef"}"#);
    let decoded: WithArray = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn roundtrip_array32() {
    let mut hash = [0u8; 32];
    for (i, b) in hash.iter_mut().enumerate() {
        *b = i as u8;
    }
    let original = WithArray32 { hash };
    let json = serde_json::to_string(&original).unwrap();
    // {"hash":"<64 hex chars>"} = 1+6+1+1+64+1+1 = 75 bytes
    assert_eq!(json.len(), 75);
    let decoded: WithArray32 = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn empty_vec_lowercase() {
    let original = WithVec { data: vec![] };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":""}"#);
    let decoded: WithVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn all_zeros_lowercase() {
    let original = WithVec { data: vec![0u8; 16] };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"00000000000000000000000000000000"}"#);
    let decoded: WithVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn all_0xff_lowercase() {
    let original = WithVec { data: vec![0xffu8; 4] };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"ffffffff"}"#);
    let decoded: WithVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn deserialize_uppercase_input_with_lowercase_module() {
    // The decode path accepts mixed case — serde::deserialize handles uppercase input.
    let json = r#"{"data":"DEADBEEF"}"#;
    let decoded: WithVec = serde_json::from_str(json).unwrap();
    assert_eq!(decoded.data, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn deserialize_invalid_hex_returns_error() {
    let json = r#"{"data":"ZZZZ"}"#;
    let result: Result<WithVec, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for invalid hex");
}

#[test]
fn deserialize_odd_length_returns_error() {
    let json = r#"{"data":"abc"}"#;
    let result: Result<WithVec, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for odd-length hex");
}

#[test]
fn deserialize_wrong_array_length_returns_error() {
    // Array is [u8; 4] = 8 hex chars; "deadbeefaa" is 5 bytes = 10 hex chars
    let json = r#"{"data":"deadbeefaa"}"#;
    let result: Result<WithArray, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for wrong array length");
}

// ── better_hex::serde::upper ─────────────────────────────────────────────────

#[test]
fn roundtrip_vec_upper() {
    let original = WithUpper {
        data: vec![0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"DEADBEEF"}"#);
    let decoded: WithUpper = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn roundtrip_array_upper() {
    let original = WithUpperArray {
        data: [0x0a, 0x0b, 0x0c, 0x0d],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0A0B0C0D"}"#);
    let decoded: WithUpperArray = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── better_hex::serde::prefixed ───────────────────────────────────────────────

#[test]
fn roundtrip_vec_prefixed() {
    let original = WithPrefixed {
        data: vec![0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0xdeadbeef"}"#);
    let decoded: WithPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn roundtrip_array_prefixed() {
    let original = WithPrefixedArray {
        data: [0xca, 0xfe, 0xba, 0xbe],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0xcafebabe"}"#);
    let decoded: WithPrefixedArray = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn prefixed_missing_prefix_returns_error() {
    let json = r#"{"data":"deadbeef"}"#;
    let result: Result<WithPrefixed, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for missing 0x prefix");
}

#[test]
fn prefixed_empty_vec() {
    let original = WithPrefixed { data: vec![] };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0x"}"#);
    let decoded: WithPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── better_hex::serde::upper_prefixed ────────────────────────────────────────

#[test]
fn roundtrip_vec_upper_prefixed() {
    let original = WithUpperPrefixed {
        data: vec![0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0xDEADBEEF"}"#);
    let decoded: WithUpperPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn roundtrip_array_upper_prefixed() {
    let original = WithUpperPrefixedArray {
        data: [0x01, 0x23, 0x45, 0x67],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0x01234567"}"#);
    let decoded: WithUpperPrefixedArray = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── better_hex::serde::ct ─────────────────────────────────────────────────────

#[test]
fn ct_roundtrip_array() {
    let original = WithCt {
        data: [0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"deadbeef"}"#);
    let decoded: WithCt = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn ct_roundtrip_array32() {
    let secret = [0xabu8; 32];
    let original = WithCtArray32 { secret };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, format!(r#"{{"secret":"{}"}}"#, "ab".repeat(32)));
    let decoded: WithCtArray32 = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn ct_output_matches_fast_output() {
    // CT encode must produce the same hex string as the fast path.
    let data = [0xde, 0xad, 0xbe, 0xef];
    let fast = WithArray { data };
    let ct = WithCt { data };
    let fast_json = serde_json::to_string(&fast).unwrap();
    let ct_json = serde_json::to_string(&ct).unwrap();
    assert_eq!(
        fast_json, ct_json,
        "CT and fast serialization must produce identical output"
    );
}

#[test]
fn ct_deserialize_invalid_hex_returns_error() {
    let json = r#"{"data":"GGGG"}"#;
    let result: Result<WithCt, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for invalid hex");
}

#[test]
fn ct_deserialize_wrong_length_returns_error() {
    // [u8; 4] = 8 hex chars; providing 10 should error.
    let json = r#"{"data":"deadbeefaa"}"#;
    let result: Result<WithCt, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for wrong array length");
}

// ── better_hex::serde::ct::upper ──────────────────────────────────────────────

#[test]
fn ct_upper_roundtrip() {
    let original = WithCtUpper {
        data: [0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"DEADBEEF"}"#);
    let decoded: WithCtUpper = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── better_hex::serde::ct::prefixed ──────────────────────────────────────────

#[test]
fn ct_prefixed_roundtrip() {
    let original = WithCtPrefixed {
        data: [0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0xdeadbeef"}"#);
    let decoded: WithCtPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn ct_prefixed_missing_prefix_returns_error() {
    let json = r#"{"data":"deadbeef"}"#;
    let result: Result<WithCtPrefixed, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for missing 0x prefix");
}

// ── better_hex::serde::ct::upper_prefixed ────────────────────────────────────

#[test]
fn ct_upper_prefixed_roundtrip() {
    let original = WithCtUpperPrefixed {
        data: [0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0xDEADBEEF"}"#);
    let decoded: WithCtUpperPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── mixed struct Tx ───────────────────────────────────────────────────────────

#[test]
fn tx_roundtrip() {
    let tx = Tx {
        hash: [0x01, 0x02, 0x03, 0x04],
        secret_key: [0xde, 0xad, 0xbe, 0xef],
        address: vec![0xca, 0xfe],
    };
    let json = serde_json::to_string(&tx).unwrap();
    assert_eq!(
        json,
        r#"{"hash":"01020304","secret_key":"deadbeef","address":"0xcafe"}"#
    );
    let decoded: Tx = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, tx);
}

// ── ct Vec<u8> tests ─────────────────────────────────────────────────────────

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct CtHexVec {
    #[serde(with = "better_hex::serde::ct")]
    data: Vec<u8>,
}

#[test]
fn ct_deserialize_invalid_returns_error() {
    let json = r#"{"data":"zzzz"}"#;
    let result = serde_json::from_str::<CtHexVec>(json);
    assert!(result.is_err());
}

#[test]
fn ct_deserialize_odd_length() {
    let json = r#"{"data":"abc"}"#;
    let result = serde_json::from_str::<CtHexVec>(json);
    assert!(result.is_err());
}

#[test]
fn ct_vec_roundtrip() {
    let original = CtHexVec {
        data: vec![0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"deadbeef"}"#);
    let decoded: CtHexVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── prefixed/upper_prefixed Vec<u8> roundtrips ────────────────────────────────

#[test]
fn prefixed_vec_roundtrip() {
    let original = WithPrefixed { data: vec![0xde, 0xad] };
    let json = serde_json::to_string(&original).unwrap();
    assert!(json.contains("0xdead"));
    let decoded: WithPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn upper_prefixed_vec_roundtrip() {
    let original = WithUpperPrefixed { data: vec![0xde, 0xad] };
    let json = serde_json::to_string(&original).unwrap();
    assert!(json.contains("0xDEAD"));
    let decoded: WithUpperPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn ct_upper_vec_roundtrip() {
    let original = WithCtUpper {
        data: [0xab, 0xcd, 0xef, 0x01],
    };
    let json = serde_json::to_string(&original).unwrap();
    let decoded: WithCtUpper = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn ct_prefixed_vec_roundtrip() {
    let original = WithCtPrefixed {
        data: [0xab, 0xcd, 0xef, 0x01],
    };
    let json = serde_json::to_string(&original).unwrap();
    let decoded: WithCtPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── all 256 byte values ───────────────────────────────────────────────────────

#[test]
fn all_byte_values_roundtrip() {
    let data: Vec<u8> = (0u8..=255).collect();
    let original = WithVec { data };
    let json = serde_json::to_string(&original).unwrap();
    let decoded: WithVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn all_byte_values_ct_roundtrip() {
    // Use a smaller fixed-size array for CT test.
    let data = [0x00, 0x7f, 0x80, 0xff];
    let original = WithCt { data };
    let json = serde_json::to_string(&original).unwrap();
    let decoded: WithCt = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── boundary conditions ───────────────────────────────────────────────────────

#[test]
fn large_vec_roundtrip() {
    // Cross the 128-byte chunk boundary (256 hex chars = 1 full stack buffer).
    let data: Vec<u8> = (0u8..=255).chain(0u8..=255).collect(); // 512 bytes
    let original = WithVec { data };
    let json = serde_json::to_string(&original).unwrap();
    let decoded: WithVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn single_byte_vec() {
    let original = WithVec { data: vec![0xab] };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"ab"}"#);
    let decoded: WithVec = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// ── visitor expecting() paths — triggered by wrong JSON type ─────────────────

#[test]
fn hex_visitor_expecting_no_prefix_wrong_type() {
    // Passing a JSON integer triggers the visitor's `expecting()` message.
    let json = r#"{"data":42}"#;
    let result: Result<WithVec, _> = serde_json::from_str(json);
    let err = result.unwrap_err();
    assert!(err.to_string().contains("hex string"), "got: {err}");
}

#[test]
fn hex_visitor_expecting_with_prefix_wrong_type() {
    // WithPrefixed uses HexVisitor { prefix: true }.
    let json = r#"{"data":42}"#;
    let result: Result<WithPrefixed, _> = serde_json::from_str(json);
    let err = result.unwrap_err();
    assert!(err.to_string().contains("0x"), "got: {err}");
}

#[test]
fn ct_hex_visitor_expecting_no_prefix_wrong_type() {
    let json = r#"{"data":42}"#;
    let result: Result<WithCt, _> = serde_json::from_str(json);
    let err = result.unwrap_err();
    assert!(err.to_string().contains("hex string"), "got: {err}");
}

#[test]
fn ct_hex_visitor_expecting_with_prefix_wrong_type() {
    let json = r#"{"data":42}"#;
    let result: Result<WithCtPrefixed, _> = serde_json::from_str(json);
    let err = result.unwrap_err();
    assert!(err.to_string().contains("0x"), "got: {err}");
}

// ── [u8; N] via CT path — error cases ────────────────────────────────────────

#[test]
fn ct_array_odd_length_returns_error() {
    // [u8; 4] expects 8 hex chars; odd-length input hits the odd-length branch.
    let json = r#"{"data":"abc"}"#;
    let result: Result<WithCt, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for odd-length hex for [u8; N]");
}

#[test]
fn ct_array_invalid_chars_returns_error() {
    let json = r#"{"data":"gggggggg"}"#;
    let result: Result<WithCt, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for invalid hex chars for [u8; N]");
}

#[test]
fn array_wrong_length_fast_path_returns_error() {
    // [u8; 4] expects 8 hex chars; 6 chars = wrong length, hits fast-path error.
    let json = r#"{"data":"deadbe"}"#;
    let result: Result<WithArray, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for too-short hex for [u8; 4]");
}

// ── CtHexDisplayAdapter with prefix=true and upper=true ──────────────────────

#[test]
fn ct_upper_prefixed_serialization_format() {
    // Explicitly verify both upper=true and prefix=true in the CT adapter.
    let original = WithCtUpperPrefixed {
        data: [0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"0xDEADBEEF"}"#);
    let decoded: WithCtUpperPrefixed = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn ct_upper_prefixed_wrong_length_error() {
    let json = r#"{"data":"0xdeadbeefaa"}"#;
    let result: Result<WithCtUpperPrefixed, _> = serde_json::from_str(json);
    assert!(result.is_err(), "expected error for wrong length in ct::upper_prefixed");
}
