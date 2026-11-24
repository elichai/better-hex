// Literal parsing is evaluated at compile time; it need not be constant-time.
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
