//! [`Choice`]-returning wrappers for the top-level API.
//!
//! These functions report ordinary success/failure as a single [`Choice`] bit.
//! Use the buffer-oriented functions when you need encoded or decoded data;
//! the generic [`encode`], [`encode_upper`], and [`decode`] wrappers are
//! status-only and discard the value that the ordinary API would return.
//!
//! The success bit is observable by design. Do not convert it to `bool` until
//! the point where your protocol is allowed to branch on success or failure.
//!
//! # Examples
//!
//! ```rust
//! let mut bytes = [0u8; 4];
//! let ok = better_hex::ctutils::decode_to_slice(b"deadbeef", &mut bytes);
//! assert_eq!(ok.to_u8(), 1);
//! assert_eq!(bytes, [0xde, 0xad, 0xbe, 0xef]);
//! ```

use crate::{backend, maybe_uninit};
use core::mem::MaybeUninit;

pub use ctutils_dep::Choice;

/// A type whose hex-encoding status can be reported as a [`Choice`].
///
/// This trait backs the status-only [`encode`] and [`encode_upper`] wrappers.
/// It is implemented for the same built-in target families as
/// [`crate::HexTarget`]. Downstream target types can implement this trait
/// directly; there is intentionally no blanket [`crate::HexTarget`] impl,
/// since that would require converting the ordinary `Result` API.
pub trait CtHexTarget {
    /// Return whether encoding `input` into `Self` would succeed.
    fn ct_encode_status(input: &[u8]) -> Choice;
}

/// A type whose hex-decoding status can be reported as a [`Choice`].
///
/// This trait backs the status-only [`decode`] wrapper. It is implemented for
/// the same built-in source families as [`crate::FromHex`]. Downstream source
/// types can implement this trait directly; there is intentionally no blanket
/// [`crate::FromHex`] impl, since that would require converting the ordinary
/// `Result` API.
pub trait CtFromHex {
    /// Return whether decoding `input` into `Self` would succeed.
    fn ct_decode_status(input: &[u8]) -> Choice;
}

#[inline]
fn choice_from_status(status: backend::Status) -> Choice {
    Choice::from_u8_lsb(status.to_u8())
}

#[inline]
fn choice_from_usize_eq(x: usize, y: usize) -> Choice {
    Choice::from_u64_eq(x as u64, y as u64)
}

#[inline]
#[cfg(any(feature = "heapless", feature = "arrayvec"))]
fn choice_from_usize_le(x: usize, y: usize) -> Choice {
    Choice::from_u64_le(x as u64, y as u64)
}

#[inline]
fn choice_from_even_len(len: usize) -> Choice {
    Choice::from_u64_eq((len & 1) as u64, 0)
}

#[inline]
fn choice_from_decoded_len_eq<const N: usize>(len: usize) -> Choice {
    Choice::from_u128_eq(len as u128, (N as u128) * 2)
}

#[inline]
#[cfg(any(feature = "heapless", feature = "arrayvec"))]
fn choice_from_decoded_len_le_capacity(len: usize, cap: usize) -> Choice {
    choice_from_even_len(len) & choice_from_usize_le(len / 2, cap)
}

#[inline]
fn decode_to_uninit(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Choice {
    if input.len() != output.len() * 2 {
        return Choice::FALSE;
    }

    choice_from_status(backend::decode_status_no_length_check(input, output))
}

#[inline]
fn decode_to_fixed_array<const N: usize>(input: &[u8]) -> Choice {
    choice_from_decoded_len_eq::<N>(input.len()) & choice_from_status(backend::check_status(input))
}

#[cfg(any(feature = "heapless", feature = "arrayvec"))]
#[inline]
fn decode_to_fixed_capacity<const CAP: usize>(input: &[u8]) -> Choice {
    choice_from_decoded_len_le_capacity(input.len(), CAP) & choice_from_status(backend::check_status(input))
}

/// Encode bytes to lowercase hex into `output`, returning whether it succeeded.
///
/// Returns [`Choice::TRUE`] when `output.len() == input.as_ref().len() * 2`,
/// and [`Choice::FALSE`] otherwise. On success, `output` contains lowercase
/// hex ASCII. On failure, `output` contents are unspecified.
#[inline]
pub fn encode_to_slice(input: impl AsRef<[u8]>, output: &mut [u8]) -> Choice {
    let input = input.as_ref();
    if output.len() != input.len() * 2 {
        return Choice::FALSE;
    }

    backend::encode_no_length_check(input, maybe_uninit::slice_as_uninit_mut(output), false);
    Choice::TRUE
}

/// Encode bytes to uppercase hex into `output`, returning whether it succeeded.
///
/// Returns [`Choice::TRUE`] when `output.len() == input.as_ref().len() * 2`,
/// and [`Choice::FALSE`] otherwise. On success, `output` contains uppercase
/// hex ASCII. On failure, `output` contents are unspecified.
#[inline]
pub fn encode_to_slice_upper(input: impl AsRef<[u8]>, output: &mut [u8]) -> Choice {
    let input = input.as_ref();
    if output.len() != input.len() * 2 {
        return Choice::FALSE;
    }

    backend::encode_no_length_check(input, maybe_uninit::slice_as_uninit_mut(output), true);
    Choice::TRUE
}

/// Report whether lowercase hex encoding into `T` would succeed.
///
/// This is the [`Choice`]-returning counterpart of [`crate::encode`], but it
/// is status-only: the encoded `T` is discarded. For data-producing code,
/// prefer [`encode_to_slice`] or the ordinary [`crate::encode`] API.
#[inline]
pub fn encode<T: CtHexTarget>(input: impl AsRef<[u8]>) -> Choice {
    T::ct_encode_status(input.as_ref())
}

/// Report whether uppercase hex encoding into `T` would succeed.
///
/// This is the [`Choice`]-returning counterpart of [`crate::encode_upper`],
/// but it is status-only: the encoded `T` is discarded. For data-producing
/// code, prefer [`encode_to_slice_upper`] or the ordinary
/// [`crate::encode_upper`] API.
#[inline]
pub fn encode_upper<T: CtHexTarget>(input: impl AsRef<[u8]>) -> Choice {
    T::ct_encode_status(input.as_ref())
}

/// Decode hex `input` into `output`, returning whether it succeeded.
///
/// Returns [`Choice::FALSE`] if the input length is wrong or any byte is not
/// in `[0-9a-fA-F]`. On failure, `output` contents are unspecified, matching
/// [`crate::decode_to_slice`].
#[inline]
pub fn decode_to_slice(input: impl AsRef<[u8]>, output: &mut [u8]) -> Choice {
    let output = maybe_uninit::slice_as_uninit_mut(output);
    decode_to_uninit(input.as_ref(), output)
}

/// Report whether decoding hex `input` into `T` would succeed.
///
/// This is the [`Choice`]-returning counterpart of [`crate::decode`], but it
/// is status-only: the decoded `T` is discarded. For data-producing code,
/// prefer [`decode_to_slice`] or the ordinary [`crate::decode`] API.
#[inline]
pub fn decode<T: CtFromHex>(input: impl AsRef<[u8]>) -> Choice {
    T::ct_decode_status(input.as_ref())
}

/// Check if `input` is valid hex, returning a [`Choice`].
///
/// Returns [`Choice::TRUE`] iff `input` has even length and every byte is in
/// `[0-9a-fA-F]`.
#[inline]
pub fn check(input: impl AsRef<[u8]>) -> Choice {
    let input = input.as_ref();
    let len_ok = choice_from_even_len(input.len());
    let bytes_ok = choice_from_status(backend::check_status(input));
    len_ok & bytes_ok
}

/// Compile-time hex validity check returning a [`Choice`].
///
/// Returns [`Choice::TRUE`] iff `input` has even length and every byte is in
/// `[0-9a-fA-F]`.
#[inline]
pub const fn const_check(input: &[u8]) -> Choice {
    let len_ok = Choice::from_u64_eq((input.len() & 1) as u64, 0);
    let bytes_ok = Choice::from_u16_nz(crate::backend::scalar::check_inner(input)).not();
    len_ok.and(bytes_ok)
}

/// Report whether compile-time decoding into `[u8; N]` would succeed.
///
/// This is the [`Choice`]-returning counterpart of
/// [`crate::const_decode_to_array`], but it is status-only: the decoded array
/// is discarded.
#[inline]
pub const fn const_decode_to_array<const N: usize>(input: &[u8]) -> Choice {
    let len_ok = Choice::from_u128_eq(input.len() as u128, (N as u128) * 2);
    let bytes_ok = Choice::from_u16_nz(crate::backend::scalar::check_inner(input)).not();
    len_ok.and(bytes_ok)
}

impl<const N: usize, P: crate::Prefix> CtHexTarget for crate::HexStr<N, P> {
    #[inline]
    fn ct_encode_status(input: &[u8]) -> Choice {
        choice_from_usize_eq(input.len(), N)
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl CtHexTarget for alloc::string::String {
    #[inline]
    fn ct_encode_status(_input: &[u8]) -> Choice {
        Choice::TRUE
    }
}

#[cfg(feature = "heapless")]
#[cfg_attr(docsrs, doc(cfg(feature = "heapless")))]
impl<const CAP: usize> CtHexTarget for heapless::String<CAP> {
    #[inline]
    fn ct_encode_status(input: &[u8]) -> Choice {
        choice_from_usize_le(input.len(), CAP / 2)
    }
}

#[cfg(feature = "arrayvec")]
#[cfg_attr(docsrs, doc(cfg(feature = "arrayvec")))]
impl<const CAP: usize> CtHexTarget for arrayvec::ArrayString<CAP> {
    #[inline]
    fn ct_encode_status(input: &[u8]) -> Choice {
        choice_from_usize_le(input.len(), CAP / 2)
    }
}

impl<const N: usize> CtFromHex for [u8; N] {
    #[inline]
    fn ct_decode_status(input: &[u8]) -> Choice {
        decode_to_fixed_array::<N>(input)
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl CtFromHex for alloc::vec::Vec<u8> {
    #[inline]
    fn ct_decode_status(input: &[u8]) -> Choice {
        choice_from_even_len(input.len()) & choice_from_status(backend::check_status(input))
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl CtFromHex for alloc::borrow::Cow<'_, [u8]> {
    #[inline]
    fn ct_decode_status(input: &[u8]) -> Choice {
        <alloc::vec::Vec<u8> as CtFromHex>::ct_decode_status(input)
    }
}

#[cfg(feature = "heapless")]
#[cfg_attr(docsrs, doc(cfg(feature = "heapless")))]
impl<const CAP: usize> CtFromHex for heapless::Vec<u8, CAP> {
    #[inline]
    fn ct_decode_status(input: &[u8]) -> Choice {
        decode_to_fixed_capacity::<CAP>(input)
    }
}

#[cfg(feature = "arrayvec")]
#[cfg_attr(docsrs, doc(cfg(feature = "arrayvec")))]
impl<const CAP: usize> CtFromHex for arrayvec::ArrayVec<u8, CAP> {
    #[inline]
    fn ct_decode_status(input: &[u8]) -> Choice {
        decode_to_fixed_capacity::<CAP>(input)
    }
}
