//! Implementation details of [`crate::hex!`].
//!
//! **These helpers are not constant-time.** Prefix handling and separator removal
//! use data-dependent branches and memory accesses. The macro evaluates them
//! only at compile time; direct runtime calls have no constant-time guarantee.

const fn is_separator(byte: u8) -> bool {
    matches!(byte, b' ' | b'\t' | b'\r' | b'\n' | b'_')
}

const fn content(input: &str) -> &[u8] {
    let mut bytes = input.as_bytes();
    while let [byte, rest @ ..] = bytes
        && is_separator(*byte)
    {
        bytes = rest;
    }
    match bytes {
        [b'0', b'x' | b'X', rest @ ..] => rest,
        _ => bytes,
    }
}

/// Compute the normalized input length. **Not constant-time.**
pub const fn stripped_len(mut strings: &[&str]) -> usize {
    let mut len = 0usize;
    while let Some((string, rest)) = strings.split_first() {
        strings = rest;
        let start = len;
        let mut bytes = content(string);
        while let Some((&byte, rest)) = bytes.split_first() {
            bytes = rest;
            len += (!is_separator(byte)) as usize;
        }
        assert!(
            (len - start).is_multiple_of(2),
            "hex!: odd number of hex digits in an input"
        );
    }
    len
}

/// Remove prefixes and separators. **Not constant-time.**
pub const fn strip<const N: usize>(mut strings: &[&str]) -> [u8; N] {
    let mut output = [0; N];
    let mut written = 0;
    while let Some((string, rest)) = strings.split_first() {
        strings = rest;
        let mut bytes = content(string);
        while let Some((&byte, rest)) = bytes.split_first() {
            bytes = rest;
            if !is_separator(byte) {
                output[written] = byte;
                written += 1;
            }
        }
    }
    assert!(written == N, "hex!: incorrect output length");
    output
}

/// Decode hexadecimal strings into a `[u8; N]` at compile time.
///
/// # Timing
///
/// **This macro works only at compile time.** It rejects runtime inputs and
/// forces all parsing and decoding into constant evaluation, even when invoked
/// inside an ordinary function. No parser runs at runtime. Making this parser
/// constant-time would therefore not improve the running program's timing
/// guarantees.
///
/// Its compile-time parser is intentionally **not constant-time**: prefix
/// handling and separator removal use data-dependent branches and memory accesses.
/// This is an explicit exception to the crate's constant-time codec guarantees.
/// Compilation time has no constant-time guarantee. The hidden normalization
/// helpers also have no constant-time guarantee if called directly at runtime.
/// Use [`crate::decode`] or [`crate::decode_to_slice`] for runtime decoding under
/// the crate's documented timing guarantees.
///
/// # Input syntax
///
/// Accepts adjacent string literals (including raw strings), or comma-separated
/// expressions that evaluate to `&str` at compile time. A trailing comma is
/// allowed with the expression syntax. The decoded inputs are concatenated.
///
/// Each input accepts mixed-case ASCII hex digits and an optional leading
/// `0x` or `0X` prefix. Spaces, tabs, CR (`\r`), LF (`\n`), and underscores
/// are ignored, including before the prefix and between a byte's digits.
/// The prefix itself must be contiguous. Colons and all other non-hex characters
/// are rejected.
///
/// Each input must contain an even number of hex digits after removing its
/// prefix and separators. The remaining digits are paired from left to right;
/// separator positions do not mark byte boundaries. Digits cannot pair across
/// input boundaries. Empty inputs and inputs containing only a prefix or
/// separators contribute no bytes. An empty invocation produces `[u8; 0]`.
///
/// Evaluation is forced at compile time, even inside ordinary functions.
/// Runtime variables are not accepted. No features or allocation are required.
///
/// # Examples
///
/// ```
/// use better_hex::hex;
///
/// // Spaces and underscores make byte groups easier to read.
/// const PACKET: [u8; 6] = hex!("0x0201 0200_0700");
/// assert_eq!(PACKET, [0x02, 0x01, 0x02, 0x00, 0x07, 0x00]);
///
/// // Multiline input can be indented.
/// const MULTILINE: [u8; 6] = hex!("
///     0201 0200
///     0700
/// ");
/// assert_eq!(MULTILINE, PACKET);
///
/// // Const expressions and adjacent literals are also supported.
/// const HEADER: &str = "0201";
/// assert_eq!(hex!(HEADER, "0200_0700"), PACKET);
/// assert_eq!(hex!("0201" "0200" "0700"), PACKET);
///
/// // Separators do not mark byte boundaries: "0 201" becomes "0201".
/// assert_eq!(hex!("0 201"), [0x02, 0x01]);
/// ```
///
/// An odd total number of hex digits is **rejected at compile time**. No zero
/// padding or partial byte is produced:
///
/// ```compile_fail
/// let _ = better_hex::hex!("201"); // Three digits: rejected, not [0x02, 0x01].
/// ```
///
/// Code using [`hex-literal`] can retain the `hex!` name with
/// `use better_hex::hex;`. The input rules above apply:
/// colons must be removed or replaced with supported separators.
///
/// [`hex-literal`]: https://docs.rs/hex-literal/1.1.0/hex_literal/
///
/// Invalid input fails to compile in ordinary expressions too:
///
/// ```compile_fail
/// let _ = better_hex::hex!("00:11");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("00\u{00a0}11");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("АА"); // Cyrillic letters
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("00\x0b11"); // Vertical tab
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("00\x0c11"); // Form feed
/// ```
///
/// Prefixes are allowed only once at the start of each input:
///
/// ```compile_fail
/// let _ = better_hex::hex!("0x0x12");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("120x34");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("0\nx12");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("0_x12");
/// ```
///
/// Digits cannot pair across input boundaries, including const expressions:
///
/// ```compile_fail
/// const INPUT: &str = "a";
/// let _ = better_hex::hex!(INPUT, "b");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("00", "a", "b"); // A valid first input changes nothing.
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("00" "a" "b");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("0x2_01"); // Separators do not count as hex digits.
/// ```
///
/// Runtime variables and byte strings are not accepted:
///
/// ```compile_fail
/// let INPUT: &str = "abcd";
/// let _ = better_hex::hex!(INPUT);
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!(b"abcd");
/// ```
///
/// Invalid hex is rejected even in unused generic functions:
///
/// ```compile_fail
/// fn unused<T>() {
///     let _ = better_hex::hex!("gg");
/// }
/// ```
#[macro_export]
macro_rules! hex {
    ($($s:literal)*) => { $crate::hex!(@decode $($s),*) };
    ($($s:expr),+ $(,)?) => { $crate::hex!(@decode $($s),*) };
    (@decode $($s:expr),*) => {{
        const STRINGS: &[&::core::primitive::str] = &[$($s),*];
        const LEN: ::core::primitive::usize = $crate::literal::stripped_len(STRINGS);
        const HEX: [::core::primitive::u8; LEN] = $crate::literal::strip(STRINGS);
        const BYTES: [::core::primitive::u8; LEN / 2] = match $crate::const_decode_to_array(&HEX) {
            ::core::result::Result::Ok(bytes) => bytes,
            ::core::result::Result::Err(_) => ::core::panic!("hex!: invalid hex character"),
        };
        BYTES
    }};
}

#[cfg(test)]
mod tests {
    #[cfg(panic = "unwind")]
    extern crate std;

    use super::{content, is_separator, strip, stripped_len};
    use crate::{Error, const_decode_to_array};
    use alloc::{format, string::String, vec, vec::Vec};
    use proptest::prelude::*;
    use proptest::test_runner::TestCaseResult;

    fn formatted(bytes: &[u8]) -> impl Strategy<Value = (String, String)> + use<> {
        let hex = ::hex::encode(bytes);
        let len = hex.len();
        (
            Just(hex),
            prop::sample::select(vec!["", "0x", "0X"]),
            prop::collection::vec("[ \t\r\n_]{0,3}", len + 2),
            prop::collection::vec(any::<bool>(), len),
        )
            .prop_map(|(hex, prefix, gaps, uppercase)| {
                let mut input = format!("{}{prefix}{}", gaps[0], gaps[1]);
                let mut expected = String::new();
                for (i, digit) in hex.chars().enumerate() {
                    let digit = if uppercase[i] {
                        digit.to_ascii_uppercase()
                    } else {
                        digit
                    };
                    input.push(digit);
                    input.push_str(&gaps[i + 2]);
                    expected.push(digit);
                }
                (input, expected)
            })
    }

    fn normalization_inputs() -> impl Strategy<Value = (Vec<u8>, Vec<(String, String)>)> {
        prop::sample::select(vec![0, 1, 2, 3, 8, 32, 64])
            .prop_flat_map(|len| {
                (
                    prop::collection::vec(any::<u8>(), len),
                    prop::collection::vec(0usize..=len, 0..8),
                )
            })
            .prop_flat_map(|(bytes, mut ends)| {
                ends.sort_unstable();
                if !bytes.is_empty() || !ends.is_empty() {
                    ends.push(bytes.len());
                }
                let mut start = 0;
                let inputs: Vec<_> = ends
                    .into_iter()
                    .map(|end| {
                        let input = formatted(&bytes[start..end]);
                        start = end;
                        input
                    })
                    .collect();
                (Just(bytes), inputs)
            })
    }

    fn check_normalization<const N: usize, const DIGITS: usize>(
        inputs: &[&str],
        expected: &str,
        bytes: &[u8],
    ) -> TestCaseResult {
        prop_assert_eq!(stripped_len(inputs), DIGITS);
        let normalized = strip::<DIGITS>(inputs);
        prop_assert_eq!(normalized.as_slice(), expected.as_bytes());
        let decoded = const_decode_to_array::<N>(&normalized).unwrap();
        prop_assert_eq!(decoded.as_slice(), bytes);
        Ok(())
    }

    #[test]
    fn separator_classification_is_exact_for_every_byte() {
        for byte in u8::MIN..=u8::MAX {
            assert_eq!(is_separator(byte), b" \t\r\n_".contains(&byte), "{byte:#04x}");
        }
    }

    #[test]
    fn preserves_every_invalid_ascii_character_at_each_digit_position() {
        for byte in 0u8..=0x7f {
            if byte.is_ascii_hexdigit() || b" \t\r\n_".contains(&byte) {
                continue;
            }
            for expected in [[byte, b'0'], [b'1', byte]] {
                let digits = core::str::from_utf8(&expected).unwrap();
                for prefix in ["", "0x", "0X"] {
                    let input = format!(" _{prefix}{digits}\t");
                    assert_eq!(stripped_len(&[&input]), 2);
                    assert_eq!(strip::<2>(&[&input]), expected);
                    assert_eq!(const_decode_to_array::<1>(&expected), Err(Error::InvalidEncoding));
                }
            }
        }
    }

    #[test]
    fn preserves_utf8_bytes_for_decoder_rejection() {
        // Each payload has an even byte count, so parity cannot mask rejection.
        for payload in ["é", "€0", "🦀"] {
            for digits in [
                format!("{payload}0011"),
                format!("00{payload}11"),
                format!("0011{payload}"),
            ] {
                for prefix in ["", "0x", "0X"] {
                    let input = format!(" _{prefix}{digits}\t");
                    assert_eq!(stripped_len(&[&input]), digits.len());
                    match digits.len() {
                        6 => {
                            let normalized = strip::<6>(&[&input]);
                            assert_eq!(normalized.as_slice(), digits.as_bytes());
                            assert_eq!(const_decode_to_array::<3>(&normalized), Err(Error::InvalidEncoding));
                        }
                        8 => {
                            let normalized = strip::<8>(&[&input]);
                            assert_eq!(normalized.as_slice(), digits.as_bytes());
                            assert_eq!(const_decode_to_array::<4>(&normalized), Err(Error::InvalidEncoding));
                        }
                        _ => unreachable!(),
                    }
                }
            }
        }
    }

    #[cfg(panic = "unwind")]
    #[test]
    fn rejects_odd_last_input_after_valid_inputs() {
        for first in ["", "0x", " _\t\r\n", "00"] {
            assert!(std::panic::catch_unwind(|| stripped_len(&[first, "a"])).is_err());
        }
    }

    proptest! {
        #[test]
        fn content_matches_string_oracle(
            leading in "[ \t\r\n_]{0,4}",
            prefix in prop::sample::select(vec!["", "0x", "0X", "0\nx", "0_x", "0 x", "0\tx", "0x0x", " 0x", "\t0X", ":0x"]),
            tail in prop_oneof!["(?s:.{0,32})", "[0-9A-Fa-f\r\n_ :\t]{0,32}"],
        ) {
            let input = format!("{leading}{prefix}{tail}");
            let expected = input.trim_start_matches([' ', '\t', '\r', '\n', '_']);
            let expected = expected.strip_prefix("0x")
                .or_else(|| expected.strip_prefix("0X"))
                .unwrap_or(expected);
            prop_assert_eq!(content(&input), expected.as_bytes());
        }

        #[test]
        fn normalization_preserves_bytes_across_inputs(
            (bytes, formatted) in normalization_inputs(),
        ) {
            let inputs: Vec<_> = formatted.iter().map(|(input, _)| input.as_str()).collect();
            let expected: String = formatted.iter().map(|(_, digits)| digits.as_str()).collect();
            match bytes.len() {
                0 => check_normalization::<0, 0>(&inputs, &expected, &bytes)?,
                1 => check_normalization::<1, 2>(&inputs, &expected, &bytes)?,
                2 => check_normalization::<2, 4>(&inputs, &expected, &bytes)?,
                3 => check_normalization::<3, 6>(&inputs, &expected, &bytes)?,
                8 => check_normalization::<8, 16>(&inputs, &expected, &bytes)?,
                32 => check_normalization::<32, 64>(&inputs, &expected, &bytes)?,
                64 => check_normalization::<64, 128>(&inputs, &expected, &bytes)?,
                _ => unreachable!(),
            }
        }

        #[test]
        fn normalization_preserves_invalid_characters_for_decoder(
            bytes in any::<[u8; 32]>(),
            // Avoid creating a valid leading 0x prefix with the corruption.
            position in 2usize..64,
            invalid in prop::sample::select(vec![b':', b'/', b'G', b'x', b'X', b'\0', b'\x0b', b'\x0c']),
        ) {
            let mut input = ::hex::encode(bytes).into_bytes();
            input[position] = invalid;
            let input = String::from_utf8(input).unwrap();
            prop_assert_eq!(stripped_len(&[&input]), 64);
            let normalized = strip::<64>(&[&input]);
            prop_assert_eq!(normalized.as_slice(), input.as_bytes());
            prop_assert_eq!(const_decode_to_array::<32>(&normalized), Err(Error::InvalidEncoding));
        }

        // Expected panics cannot be caught on panic=abort targets such as WASI.
        #[cfg(panic = "unwind")]
        #[test]
        fn rejects_odd_inputs_even_when_total_length_is_even(
            bytes in any::<[u8; 32]>(),
            split_byte in 0usize..32,
            before in prop::collection::vec(prop::sample::select(vec!["", "0x", " _\t\r\n", "00", "0X_abcd"]), 0..8),
            between in prop::collection::vec(prop::sample::select(vec!["", "0x", " _\t\r\n", "00", "0X_abcd"]), 0..8),
            after in prop::collection::vec(prop::sample::select(vec!["", "0x", " _\t\r\n", "00", "0X_abcd"]), 0..8),
        ) {
            let input = ::hex::encode(bytes);
            let (first, second) = input.split_at(split_byte * 2 + 1);
            let first = format!("0x{first} _\n");
            let second = format!(" 0X_{second}\t");
            let inputs: Vec<_> = before.into_iter().chain([first.as_str()])
                .chain(between).chain([second.as_str()]).chain(after).collect();
            prop_assert!(std::panic::catch_unwind(|| stripped_len(&inputs)).is_err());
        }
    }
}
