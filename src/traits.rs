//! Convenience traits for hex encoding and decoding.
//!
//! [`ToHex`] provides [`write_hex`](ToHex::write_hex) which writes hex through
//! any [`fmt::Write`] sink, plus convenience methods
//! [`to_hex_string`](ToHex::to_hex_string) and
//! [`to_upper_hex_string`](ToHex::to_upper_hex_string) (requires `alloc`).
//!
//! [`FromHex`] provides [`from_hex`](FromHex::from_hex) for constructing types
//! from hex strings.
//!
//! # Blanket implementations
//!
//! - `impl<T: AsRef<[u8]>> ToHex for T` — covers `&[u8]`, `Vec<u8>`, `[u8; N]`, etc.
//! - `impl FromHex for Vec<u8>` (requires `alloc`)
//! - `impl<const N: usize> FromHex for [u8; N]`

use crate::error::Error;
use core::fmt;

/// Trait for types that can be hex-encoded.
///
/// Automatically implemented for all types that implement `AsRef<[u8]>`
/// (byte slices, `Vec<u8>`, arrays, etc.).
///
/// # Examples
///
/// ```rust
/// use better_hex::ToHex;
///
/// let mut buf = String::new();
/// [0xde, 0xad_u8].write_hex(&mut buf, false).unwrap();
/// assert_eq!(buf, "dead");
/// ```
pub trait ToHex {
    /// Write the hex encoding of this value into a [`fmt::Write`] sink.
    ///
    /// If `upper` is `true`, uses uppercase hex characters (`A-F`);
    /// otherwise uses lowercase (`a-f`).
    ///
    /// Uses the SIMD encode path internally, flushing through a 256-byte stack
    /// buffer to keep `write_str` call count low.
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result;

    /// Encode to a lowercase hex [`String`](alloc::string::String).
    ///
    /// Equivalent to calling `write_hex` into a fresh `String`.
    #[cfg(feature = "alloc")]
    fn to_hex_string(&self) -> alloc::string::String {
        let mut s = alloc::string::String::new();
        // fmt::Write on String is infallible.
        self.write_hex(&mut s, false)
            .expect("fmt::Write on String is infallible");
        s
    }

    /// Encode to an uppercase hex [`String`](alloc::string::String).
    ///
    /// Equivalent to calling `write_hex` with `upper = true` into a fresh `String`.
    #[cfg(feature = "alloc")]
    fn to_upper_hex_string(&self) -> alloc::string::String {
        let mut s = alloc::string::String::new();
        // fmt::Write on String is infallible.
        self.write_hex(&mut s, true)
            .expect("fmt::Write on String is infallible");
        s
    }
}

/// Blanket impl: anything that can be viewed as `&[u8]` can be hex-encoded.
///
/// This covers `&[u8]`, `Vec<u8>`, `[u8; N]`, `Box<[u8]>`, and any other
/// type that implements `AsRef<[u8]>`.
impl<T: AsRef<[u8]>> ToHex for T {
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        write_hex_to_fmt_write(self.as_ref(), w, upper)
    }
}

/// Internal: write hex encoding of `input` through any [`fmt::Write`].
///
/// Uses a 256-byte stack buffer so that at most `BUF_SIZE / 2 = 128` input
/// bytes are encoded per iteration and flushed with a single `write_str` call.
/// This reduces virtual dispatch overhead while keeping stack usage modest.
fn write_hex_to_fmt_write<W: fmt::Write>(input: &[u8], w: &mut W, upper: bool) -> fmt::Result {
    use crate::backend;

    const BUF_SIZE: usize = 256;
    let mut buf = [MaybeUninit::<u8>::uninit(); BUF_SIZE];
    let chunk_size = BUF_SIZE / 2; // 128 input bytes -> 256 hex chars

    for chunk in input.chunks(chunk_size) {
        let hex_len = chunk.len() * 2;
        let hex_buf = &mut buf[..hex_len];
        if upper {
            backend::encode::<true>(chunk, hex_buf);
        } else {
            backend::encode::<false>(chunk, hex_buf);
        }
        // SAFETY: the backend just wrote `hex_len` bytes of valid hex ASCII
        // (which is valid UTF-8) into `hex_buf`.
        let s = unsafe {
            let initialized =
                core::slice::from_raw_parts(hex_buf.as_ptr().cast::<u8>(), hex_len);
            core::str::from_utf8_unchecked(initialized)
        };
        w.write_str(s)?;
    }
    Ok(())
}

use core::mem::MaybeUninit;

/// Trait for types that can be constructed from hex-encoded data.
///
/// # Examples
///
/// ```rust
/// use better_hex::FromHex;
///
/// let bytes = Vec::<u8>::from_hex("deadbeef").unwrap();
/// assert_eq!(bytes, [0xde, 0xad, 0xbe, 0xef]);
///
/// let arr = <[u8; 4]>::from_hex("deadbeef").unwrap();
/// assert_eq!(arr, [0xde, 0xad, 0xbe, 0xef]);
/// ```
pub trait FromHex: Sized {
    /// The error type returned on decode failure.
    type Error;

    /// Decode a hex string into `Self`.
    ///
    /// Accepts any type that can be viewed as `&[u8]`: `&str`, `&[u8]`,
    /// `String`, `Vec<u8>`, etc.
    ///
    /// Returns an error if the input contains non-hex characters, has odd
    /// length, or does not match the expected output size.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

/// Decode hex into a `Vec<u8>`.
///
/// Returns [`Error::InvalidLength`] if the input has odd length.
/// Returns [`Error::InvalidChar`] if any byte is not a valid hex character.
#[cfg(feature = "alloc")]
impl FromHex for alloc::vec::Vec<u8> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode(hex)
    }
}

/// Decode hex into a fixed-size byte array `[u8; N]`.
///
/// Returns [`Error::InvalidLength`] if `hex.len() != 2 * N`.
/// Returns [`Error::InvalidChar`] if any byte is not a valid hex character.
impl<const N: usize> FromHex for [u8; N] {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode_to_array(hex)
    }
}
