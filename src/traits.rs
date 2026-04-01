//! Convenience traits for hex encoding and decoding.
//!
//! [`ToHex`] provides hex encoding via [`write_hex`](ToHex::write_hex) (any
//! [`fmt::Write`] sink) and [`encode_hex`](ToHex::encode_hex) (any
//! [`HexTarget`](crate::HexTarget), zero-copy).
//!
//! [`FromHex`] provides [`from_hex`](FromHex::from_hex) for constructing types
//! from hex strings — including `Vec<u8>`, `[u8; N]`, `heapless::Vec`, and
//! `arrayvec::ArrayVec`.

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
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result;

    /// Encode to lowercase hex into any [`HexTarget`] (zero-copy).
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error>;

    /// Encode to uppercase hex into any [`HexTarget`] (zero-copy).
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error>;
}

impl<S: AsRef<[u8]>> ToHex for S {
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        if upper {
            write_hex_to::<true, 128, W>(self.as_ref(), w)
        } else {
            write_hex_to::<false, 128, W>(self.as_ref(), w)
        }
    }

    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        hex_target::encode_to(self.as_ref())
    }

    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
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

// --- Core impls ---

#[cfg(feature = "alloc")]
impl FromHex for alloc::vec::Vec<u8> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode::decode_vec(hex.as_ref())
    }
}

impl<const N: usize> FromHex for [u8; N] {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode::decode_array(hex.as_ref())
    }
}

// --- heapless::Vec impl ---

#[cfg(feature = "heapless")]
impl<const N: usize> FromHex for heapless::Vec<u8, N> {
    type Error = Error;

    /// Decode hex into a `heapless::Vec<u8, N>`.
    ///
    /// Returns [`Error::InvalidLength`] if the decoded output would exceed
    /// capacity `N`, or if the input has odd length.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        let hex = hex.as_ref();
        if !hex.len().is_multiple_of(2) {
            return Err(Error::InvalidLength { expected: hex.len() + 1, got: hex.len() });
        }
        let out_len = hex.len() / 2;
        if out_len > N {
            return Err(Error::InvalidLength { expected: N * 2, got: hex.len() });
        }
        let mut out = heapless::Vec::<u8, N>::new();
        // SAFETY: heapless 0.8 — as_mut_ptr() points to [MaybeUninit<u8>; N].
        // We decode into [0..out_len), then set_len.
        let spare = unsafe {
            core::slice::from_raw_parts_mut(
                out.as_mut_ptr().cast::<core::mem::MaybeUninit<u8>>(),
                N,
            )
        };
        crate::backend::decode(hex, &mut spare[..out_len])?;
        unsafe { out.set_len(out_len) };
        Ok(out)
    }
}

// --- arrayvec::ArrayVec impl ---

#[cfg(feature = "arrayvec")]
impl<const N: usize> FromHex for arrayvec::ArrayVec<u8, N> {
    type Error = Error;

    /// Decode hex into an `arrayvec::ArrayVec<u8, N>`.
    ///
    /// Returns [`Error::InvalidLength`] if the decoded output would exceed
    /// capacity `N`, or if the input has odd length.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        let hex = hex.as_ref();
        if !hex.len().is_multiple_of(2) {
            return Err(Error::InvalidLength { expected: hex.len() + 1, got: hex.len() });
        }
        let out_len = hex.len() / 2;
        if out_len > N {
            return Err(Error::InvalidLength { expected: N * 2, got: hex.len() });
        }
        let mut out = arrayvec::ArrayVec::<u8, N>::new();
        // SAFETY: arrayvec 0.7 — as_mut_ptr() points to [MaybeUninit<u8>; N].
        let spare = unsafe {
            core::slice::from_raw_parts_mut(
                out.as_mut_ptr().cast::<core::mem::MaybeUninit<u8>>(),
                N,
            )
        };
        crate::backend::decode(hex, &mut spare[..out_len])?;
        // SAFETY: backend wrote out_len valid bytes.
        unsafe { out.set_len(out_len) };
        Ok(out)
    }
}
