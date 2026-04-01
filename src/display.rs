//! Display-based hex formatting.
//!
//! Provides [`display()`] which wraps any `AsRef<[u8]>` in a [`HexDisplay`]
//! that implements `Display`, `LowerHex`, and `UpperHex`. Formatting uses a
//! stack buffer to batch `write_str` calls through `fmt::Formatter`.

use crate::{backend, maybe_uninit};
use core::fmt;
use core::mem::MaybeUninit;

/// Default hex buffer size for fmt-based encoding (in hex output bytes).
/// Each iteration processes `BUF / 2` input bytes.
const DEFAULT_BUF: usize = 256;

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
        write_hex_to::<false, DEFAULT_BUF, _>(self.0.as_ref(), f)
    }
}

impl<T: AsRef<[u8]>> fmt::UpperHex for HexDisplay<T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            f.write_str("0x")?;
        }
        write_hex_to::<true, DEFAULT_BUF, _>(self.0.as_ref(), f)
    }
}

/// Write hex encoding of `input` through any [`fmt::Write`] sink.
///
/// Uses a `[MaybeUninit<u8>; BUF]` stack buffer. Each iteration encodes
/// `BUF / 2` input bytes into `BUF` hex characters, then flushes via a
/// single `write_str` call.
///
/// `UPPER` selects lowercase vs uppercase at compile time (no branch in loop).
/// `BUF` is the hex output buffer size in bytes (must be even; generic for benchmarking).
pub(crate) fn write_hex_to<const UPPER: bool, const BUF: usize, W: fmt::Write>(input: &[u8], w: &mut W) -> fmt::Result {
    debug_assert!(BUF >= 2 && BUF.is_multiple_of(2), "BUF must be even and >= 2");
    let mut buf = [MaybeUninit::<u8>::uninit(); BUF];
    let chunk_size = BUF / 2;

    let mut pos = 0;
    // Full chunks.
    while pos + chunk_size <= input.len() {
        backend::encode::<UPPER>(&input[pos..pos + chunk_size], &mut buf);
        // SAFETY: backend initialized BUF bytes of valid hex ASCII.
        let s = unsafe { maybe_uninit::assume_init_str(&buf) };
        w.write_str(s)?;
        pos += chunk_size;
    }

    // Remainder (< chunk_size bytes).
    if pos < input.len() {
        let rest = &input[pos..];
        let hex_len = rest.len() * 2;
        backend::encode::<UPPER>(rest, &mut buf[..hex_len]);
        // SAFETY: backend initialized hex_len bytes of valid hex ASCII.
        let s = unsafe { maybe_uninit::assume_init_str(&buf[..hex_len]) };
        w.write_str(s)?;
    }

    Ok(())
}
