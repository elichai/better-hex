#![no_main]

use better_hex::{HexStr, PrefixedHexStr};
use core::str::FromStr;
use libfuzzer_sys::fuzz_target;

// Test HexStr::<N>::from_str and PrefixedHexStr::<N>::from_str with
// arbitrary string input, and verify round-trip on success.
fuzz_target!(|data: &str| {
    // --- HexStr (no prefix) ---

    macro_rules! test_hex_str {
        ($n:literal) => {
            if let Ok(hs) = HexStr::<$n>::from_str(data) {
                // from_str succeeded: the decoded bytes must re-encode to the
                // same hex content (modulo case — decode is case-insensitive,
                // but encode_lower produces lowercase).
                let decoded = hs.decode();
                let re_encoded = HexStr::<$n>::encode_lower(&decoded);
                // Lowercasing the original must match the re-encoded form.
                let original_lower: String = hs.as_str().to_ascii_lowercase();
                assert_eq!(
                    re_encoded.as_str(),
                    original_lower.as_str(),
                    "HexStr<{}> roundtrip mismatch",
                    $n,
                );
            }
        };
    }

    test_hex_str!(1);
    test_hex_str!(4);
    test_hex_str!(16);
    test_hex_str!(32);

    // --- PrefixedHexStr (with "0x" prefix) ---

    macro_rules! test_prefixed_hex_str {
        ($n:literal) => {
            if let Ok(hs) = PrefixedHexStr::<$n>::from_str(data) {
                let decoded = hs.decode();
                let re_encoded = PrefixedHexStr::<$n>::encode_lower(&decoded);
                let original_lower: String = hs.as_str()[..2].to_owned()
                    + &hs.as_str()[2..].to_ascii_lowercase();
                assert_eq!(
                    re_encoded.as_str(),
                    original_lower.as_str(),
                    "PrefixedHexStr<{}> roundtrip mismatch",
                    $n,
                );
            }
        };
    }

    test_prefixed_hex_str!(1);
    test_prefixed_hex_str!(4);
    test_prefixed_hex_str!(16);
    test_prefixed_hex_str!(32);
});
