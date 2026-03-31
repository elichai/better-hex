//! Display-based hex formatting.
//!
//! Provides [`display()`] which wraps any `AsRef<[u8]>` in a [`HexDisplay`]
//! that implements `Display`, `LowerHex`, and `UpperHex`. Formatting uses a
//! stack buffer (see [`DEFAULT_FMT_BUF`]) to batch `write_str` calls through
//! `fmt::Formatter`, keeping the number of virtual dispatches low.

use core::fmt;

use crate::backend;

/// Default hex buffer size (in bytes of hex output) for fmt-based encoding.
///
/// Each iteration encodes up to `DEFAULT_FMT_BUF / 2` input bytes, producing
/// up to `DEFAULT_FMT_BUF` hex characters in a stack-allocated buffer, then
/// flushes them through a single `write_str` call.
///
/// 512 means we process 256 input bytes per iteration — a good balance between
/// stack usage and reducing virtual dispatch overhead on `fmt::Write`.
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
    let mut buf = [core::mem::MaybeUninit::<u8>::uninit(); BUF];
    let chunk_size = BUF / 2;

    for chunk in input.chunks(chunk_size) {
        let hex_len = chunk.len() * 2;
        let hex_buf = &mut buf[..hex_len];
        if upper {
            backend::encode::<true>(chunk, hex_buf);
        } else {
            backend::encode::<false>(chunk, hex_buf);
        }
        // SAFETY: the backend just initialized `hex_len` bytes with valid
        // hex ASCII, which is valid UTF-8.
        let s = unsafe {
            let initialized = core::slice::from_raw_parts(hex_buf.as_ptr().cast::<u8>(), hex_len);
            debug_assert!(initialized.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
            core::str::from_utf8_unchecked(initialized)
        };
        f.write_str(s)?;
    }
    Ok(())
}
