//! Convenience traits for hex encoding and decoding.
//!
//! [`ToHex`] provides hex encoding via [`write_hex`](ToHex::write_hex) (any
//! [`fmt::Write`] sink) and [`encode_hex`](ToHex::encode_hex) (any
//! [`HexTarget`](crate::HexTarget), zero-copy).
//!
//! [`FromHex`] provides [`from_hex`](FromHex::from_hex) for constructing types
//! from hex strings.

use crate::display::write_hex_to;
use crate::error::Error;
use crate::hex_target::{self, HexTarget};
use core::fmt;

/// Trait for types that can be hex-encoded.
///
/// Automatically implemented for all types that implement `AsRef<[u8]>`.
///
/// # Examples
///
/// ```rust
/// use better_hex::ToHex;
///
/// let mut buf = String::new();
/// [0xde, 0xad_u8].write_hex(&mut buf, false).unwrap();
/// assert_eq!(buf, "dead");
///
/// let s: String = [0xde, 0xad_u8].encode_hex().unwrap();
/// assert_eq!(s, "dead");
/// ```
pub trait ToHex {
    /// Write hex encoding into any [`fmt::Write`] sink.
    ///
    /// If `upper` is `true`, uses uppercase hex characters (`A-F`).
    /// Uses a 256-byte stack buffer to batch `write_str` calls.
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result;

    /// Encode to lowercase hex into any [`HexTarget`] (zero-copy).
    ///
    /// Returns `None` if the target cannot hold `self.len() * 2` bytes.
    /// This is the fastest encoding path — SIMD writes directly into the
    /// target's internal buffer with no intermediate copies.
    fn encode_hex<T: HexTarget>(&self) -> Option<T>;

    /// Encode to uppercase hex into any [`HexTarget`] (zero-copy).
    fn encode_hex_upper<T: HexTarget>(&self) -> Option<T>;
}

impl<S: AsRef<[u8]>> ToHex for S {
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        write_hex_to::<256, W>(self.as_ref(), w, upper)
    }

    fn encode_hex<T: HexTarget>(&self) -> Option<T> {
        hex_target::encode_to(self.as_ref())
    }

    fn encode_hex_upper<T: HexTarget>(&self) -> Option<T> {
        hex_target::encode_upper_to(self.as_ref())
    }
}

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
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

#[cfg(feature = "alloc")]
impl FromHex for alloc::vec::Vec<u8> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode(hex)
    }
}

impl<const N: usize> FromHex for [u8; N] {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode_to_array(hex)
    }
}
