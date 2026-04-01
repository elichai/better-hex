//! Extensible output trait for hex encoding.
//!
//! [`HexTarget`] allows any string-like type to be used as the output of hex
//! encoding. Each implementor handles its own buffer management internally,
//! so the trait itself is safe — no `MaybeUninit` exposed in the interface.
//!
//! The crate provides implementations for:
//! - [`String`] (feature `alloc`) — infallible (heap-allocated)
//! - [`heapless::String<CAP>`] (feature `heapless`) — fails if `CAP < bytes.len() * 2`
//! - [`arrayvec::ArrayString<CAP>`] (feature `arrayvec`) — same

use crate::backend;
#[cfg(any(feature = "heapless", feature = "arrayvec"))]
use crate::error::Error;
#[cfg(feature = "arrayvec")]
use core::mem::MaybeUninit;

/// A type that can be constructed by hex-encoding raw bytes into it.
///
/// Each implementor manages its own internal buffer. The SIMD encode path
/// writes directly into the target's memory — no intermediate copies.
///
/// # Examples
///
/// ```rust
/// use better_hex::HexTarget;
///
/// let s = String::encode_hex(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
///
/// let s = String::encode_hex_upper(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub trait HexTarget: Sized {
    /// Error returned when the target cannot hold the encoded output
    /// (e.g., fixed-capacity buffer too small).
    type Error;

    /// Encode `bytes` as lowercase hex into a new instance of `Self`.
    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error>;

    /// Encode `bytes` as uppercase hex into a new instance of `Self`.
    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error>;
}

/// Encode bytes to lowercase hex into any [`HexTarget`].
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode_to(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
/// ```
pub fn encode_to<T: HexTarget>(input: &[u8]) -> Result<T, T::Error> {
    T::encode_hex(input)
}

/// Encode bytes to uppercase hex into any [`HexTarget`].
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode_upper_to(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub fn encode_upper_to<T: HexTarget>(input: &[u8]) -> Result<T, T::Error> {
    T::encode_hex_upper(input)
}

#[cfg(feature = "alloc")]
impl HexTarget for alloc::string::String {
    /// `String` allocation is infallible (barring OOM which panics).
    type Error = core::convert::Infallible;

    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error> {
        Ok(encode_string::<false>(bytes))
    }

    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        Ok(encode_string::<true>(bytes))
    }
}

#[cfg(feature = "alloc")]
fn encode_string<const UPPER: bool>(input: &[u8]) -> alloc::string::String {
    let hex_len = input.len() * 2;
    let mut buf = alloc::vec::Vec::<u8>::with_capacity(hex_len);
    backend::encode::<UPPER>(input, &mut buf.spare_capacity_mut()[..hex_len]);
    // SAFETY: encode_into_spare wrote exactly hex_len valid hex ASCII bytes.
    unsafe { buf.set_len(hex_len) };
    debug_assert!(buf.iter().all(|b| b.is_ascii()));
    // SAFETY: hex ASCII is valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}

#[cfg(feature = "heapless")]
impl<const CAP: usize> HexTarget for heapless::String<CAP> {
    type Error = Error;

    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error> {
        encode_heapless::<CAP, false>(bytes)
    }

    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        encode_heapless::<CAP, true>(bytes)
    }
}

/// Encode into a `heapless::String<CAP>`. Verified against heapless 0.8.
#[cfg(feature = "heapless")]
fn encode_heapless<const CAP: usize, const UPPER: bool>(
    input: &[u8],
) -> Result<heapless::String<CAP>, Error> {
    let hex_len = input.len() * 2;
    if hex_len > CAP {
        return Err(Error::InvalidLength { expected: CAP, got: hex_len });
    }
    let mut vec = heapless::Vec::<u8, CAP>::new();
    backend::encode::<UPPER>(input, vec.spare_capacity_mut());
    unsafe { vec.set_len(hex_len) };
    // SAFETY: encode_into_spare wrote exactly hex_len valid hex ASCII bytes.
    Ok(unsafe {heapless::String::from_utf8_unchecked(vec)})
}

#[cfg(feature = "arrayvec")]
impl<const CAP: usize> HexTarget for arrayvec::ArrayString<CAP> {
    type Error = Error;

    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error> {
        encode_arrayvec::<CAP, false>(bytes)
    }

    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        encode_arrayvec::<CAP, true>(bytes)
    }
}

/// Encode into an `arrayvec::ArrayString<CAP>`. Verified against arrayvec 0.7.
#[cfg(feature = "arrayvec")]
fn encode_arrayvec<const CAP: usize, const UPPER: bool>(
    input: &[u8],
) -> Result<arrayvec::ArrayString<CAP>, Error> {
    let hex_len = input.len() * 2;
    if hex_len > CAP {
        return Err(Error::InvalidLength { expected: CAP, got: hex_len });
    }
    let mut s = arrayvec::ArrayString::<CAP>::new();
    // SAFETY: arrayvec 0.7 — as_mut_ptr() returns *mut u8 to the backing
    // [MaybeUninit<u8>; CAP]. We write into [0..hex_len) then set_len.
    let spare = unsafe {
        core::slice::from_raw_parts_mut(s.as_mut_ptr().cast::<MaybeUninit<u8>>(), CAP)
    };
    backend::encode::<UPPER>(input, spare);
    unsafe { s.set_len(hex_len) };
    Ok(s)
}
