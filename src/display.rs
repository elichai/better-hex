use core::fmt;

use crate::backend;

/// Default hex buffer size for fmt-based encoding.
/// Each iteration writes up to `DEFAULT_FMT_BUF` hex characters
/// (encoding `DEFAULT_FMT_BUF / 2` input bytes).
const DEFAULT_FMT_BUF: usize = 512;

/// Returns a value that implements `Display`, `LowerHex`, and `UpperHex`
/// for the given byte data.
///
/// Accepts both references and owned data:
/// ```
/// use better_hex::display;
/// // Borrowing:
/// let s = format!("{}", display(&[0xde, 0xad]));
/// // Owning:
/// let d = display(vec![0xde, 0xad]);
/// let s = format!("{}", d);
/// ```
pub fn display<T: AsRef<[u8]>>(data: T) -> HexDisplay<T> {
    HexDisplay(data)
}

/// Opaque type implementing hex formatting traits for byte data.
///
/// Created by [`display()`]. Implements `Display`, `LowerHex`, and `UpperHex`.
pub struct HexDisplay<T>(T);

impl<T: AsRef<[u8]>> fmt::Display for HexDisplay<T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt::LowerHex::fmt(self, f)
    }
}

impl<T: AsRef<[u8]>> fmt::LowerHex for HexDisplay<T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // The '#' flag in format strings (e.g., "{:#x}") requests a "0x" prefix.
        if f.alternate() {
            f.write_str("0x")?;
        }
        encode_to_fmt::<DEFAULT_FMT_BUF>(self.0.as_ref(), f, false)
    }
}

impl<T: AsRef<[u8]>> fmt::UpperHex for HexDisplay<T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // The '#' flag in format strings (e.g., "{:#X}") requests a "0x" prefix.
        if f.alternate() {
            f.write_str("0x")?;
        }
        encode_to_fmt::<DEFAULT_FMT_BUF>(self.0.as_ref(), f, true)
    }
}

/// Write hex encoding of `input` through a `fmt::Formatter`, using a
/// `[u8; BUF]` stack buffer to batch `write_str` calls.
///
/// `BUF` is the hex output buffer size (must be even). Each iteration
/// encodes up to `BUF / 2` input bytes, producing up to `BUF` hex
/// characters, and writes them as a single `&str` slice.
///
/// Generic over `BUF` to allow benchmarking different buffer sizes.
pub(crate) fn encode_to_fmt<const BUF: usize>(
    input: &[u8],
    f: &mut fmt::Formatter<'_>,
    upper: bool,
) -> fmt::Result {
    debug_assert!(BUF.is_multiple_of(2), "BUF must be even");
    let mut buf = [0u8; BUF];
    let chunk_size = BUF / 2;

    for chunk in input.chunks(chunk_size) {
        let hex_buf = &mut buf[..chunk.len() * 2];
        if upper {
            backend::encode::<true>(chunk, hex_buf);
        } else {
            backend::encode::<false>(chunk, hex_buf);
        }
        debug_assert!(
            hex_buf.iter().all(|b: &u8| b.is_ascii()),
            "encode produced non-ASCII bytes"
        );
        // SAFETY: encode writes valid hex ASCII, which is valid UTF-8.
        let s = unsafe { core::str::from_utf8_unchecked(hex_buf) };
        f.write_str(s)?;
    }
    Ok(())
}
