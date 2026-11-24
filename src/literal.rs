//! Implementation details of [`crate::hex!`].
//!
//! **These helpers are not constant-time.** Prefix handling and newline removal
//! use data-dependent branches and memory accesses. The macro evaluates them
//! only at compile time; direct runtime calls have no constant-time guarantee.

const fn content(input: &str) -> &[u8] {
    let mut bytes = input.as_bytes();
    while let [b'\r' | b'\n', rest @ ..] = bytes {
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
            len += (!matches!(byte, b'\r' | b'\n')) as usize;
        }
        assert!(
            (len - start).is_multiple_of(2),
            "hex!: odd number of hex digits in an input"
        );
    }
    len
}

/// Remove prefixes and line endings. **Not constant-time.**
pub const fn strip<const N: usize>(mut strings: &[&str]) -> [u8; N] {
    let mut output = [0; N];
    let mut written = 0;
    while let Some((string, rest)) = strings.split_first() {
        strings = rest;
        let mut bytes = content(string);
        while let Some((&byte, rest)) = bytes.split_first() {
            bytes = rest;
            if !matches!(byte, b'\r' | b'\n') {
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
/// **This macro's parser is not constant-time.** Prefix handling and newline
/// removal use data-dependent branches and memory accesses. This is an explicit
/// exception to the crate's constant-time codec guarantees.
///
/// The macro forces parsing and decoding to happen at compile time, even inside
/// an ordinary function. No input parsing runs at runtime. Compilation time has
/// no constant-time guarantee. The hidden normalization helpers are also not
/// constant-time if called directly at runtime. Use [`crate::decode`] or
/// [`crate::decode_to_slice`] for runtime decoding under the crate's documented
/// timing guarantees.
///
/// # Input syntax
///
/// Accepts adjacent string literals (including raw strings), or comma-separated
/// expressions that evaluate to `&str` at compile time. A trailing comma is
/// allowed with the expression syntax. The decoded inputs are concatenated.
///
/// Each input accepts mixed-case ASCII hex digits and an optional leading
/// `0x` or `0X` prefix. CR (`\r`) and LF (`\n`) are ignored, including before
/// the prefix and between a byte's digits. The prefix itself must be contiguous.
/// Spaces, tabs, colons, and all other non-hex characters are rejected.
/// Multiline strings must therefore contain no indentation.
///
/// Each input must contain an even number of hex digits after removing its
/// prefix and line endings. Digits cannot pair across input boundaries.
/// Empty inputs and inputs containing only a prefix or line endings contribute
/// no bytes. An empty invocation produces `[u8; 0]`.
///
/// Evaluation is forced at compile time, even inside ordinary functions.
/// Runtime variables are not accepted. No features or allocation are required.
///
/// ```
/// use better_hex::hex;
///
/// const INPUT: &str = "0xdead";
/// const BYTES: [u8; 4] = hex!(INPUT, concat!("BE", "EF"));
/// assert_eq!(BYTES, [0xde, 0xad, 0xbe, 0xef]);
/// assert_eq!(hex!("de" "AD"), [0xde, 0xad]);
/// assert_eq!(hex!(r#"
/// 00010203
/// 04050607
/// "#), [0, 1, 2, 3, 4, 5, 6, 7]);
/// let empty: [u8; 0] = hex!();
/// assert_eq!(empty, []);
/// ```
///
/// Code using [`hex-literal`] can retain the `hex!` name with
/// `use better_hex::hex;`. The input rules above apply:
/// spaces, tabs, and colons must be removed or replaced with line endings.
///
/// [`hex-literal`]: https://docs.rs/hex-literal/1.1.0/hex_literal/
///
/// Invalid input fails to compile in ordinary expressions too:
///
/// ```compile_fail
/// let _ = better_hex::hex!("00 11");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("00\t11");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("00:11");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("ab_cd");
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
/// Digits cannot pair across input boundaries, including const expressions:
///
/// ```compile_fail
/// const INPUT: &str = "a";
/// let _ = better_hex::hex!(INPUT, "b");
/// ```
///
/// ```compile_fail
/// let _ = better_hex::hex!("0x1");
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

    use super::{content, strip, stripped_len};
    use crate::{Error, const_decode_to_array};
    use alloc::{format, string::String, vec};
    use proptest::prelude::*;

    fn formatted(bytes: &[u8], prefix: &str, line_ending: &str, uppercase: bool) -> String {
        let hex = if uppercase {
            ::hex::encode_upper(bytes)
        } else {
            ::hex::encode(bytes)
        };
        let mut input = format!("{line_ending}{prefix}");
        for digit in hex.chars() {
            input.push(digit);
            input.push_str(line_ending);
        }
        input
    }

    proptest! {
        #[test]
        fn content_matches_string_oracle(
            leading in "[\r\n]{0,4}",
            prefix in prop::sample::select(vec!["", "0x", "0X", "0\nx", "0\rx", "0x0x", " 0x", "\t0X", ":0x"]),
            tail in prop_oneof!["(?s:.{0,32})", "[0-9A-Fa-f\r\n :\t]{0,32}"],
        ) {
            let input = format!("{leading}{prefix}{tail}");
            let expected = input.trim_start_matches(['\r', '\n']);
            let expected = expected.strip_prefix("0x")
                .or_else(|| expected.strip_prefix("0X"))
                .unwrap_or(expected);
            prop_assert_eq!(content(&input), expected.as_bytes());
        }

        #[test]
        fn normalization_preserves_bytes_across_inputs(
            bytes in any::<[u8; 32]>(),
            split in 0usize..=32,
            prefixes in prop::array::uniform2(prop::sample::select(vec!["", "0x", "0X"])),
            uppercase in any::<[bool; 2]>(),
            line_ending in prop::sample::select(vec!["", "\r", "\n", "\r\n"]),
        ) {
            let first = formatted(&bytes[..split], prefixes[0], line_ending, uppercase[0]);
            let second = formatted(&bytes[split..], prefixes[1], line_ending, uppercase[1]);
            let inputs = [first.as_str(), second.as_str()];
            prop_assert_eq!(stripped_len(&inputs), 64);
            let normalized = strip::<64>(&inputs);
            prop_assert_eq!(const_decode_to_array::<32>(&normalized), Ok(bytes));
        }

        #[test]
        fn normalization_preserves_invalid_characters_for_decoder(
            bytes in any::<[u8; 32]>(),
            // Avoid creating a valid leading 0x prefix with the corruption.
            position in 2usize..64,
            invalid in prop::sample::select(vec![b' ', b'\t', b':', b'_', b'/', b'G', b'x', b'X', b'\0', b'\x0b', b'\x0c']),
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
        ) {
            let input = ::hex::encode(bytes);
            let (first, second) = input.split_at(split_byte * 2 + 1);
            prop_assert!(std::panic::catch_unwind(|| stripped_len(&[first, second])).is_err());
        }
    }
}
