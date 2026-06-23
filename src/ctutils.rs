//! [`Choice`]-returning wrappers for the top-level API.
//!
//! These functions collapse the ordinary success/error result into a single
//! [`Choice`] bit. Use the buffer-oriented functions when you need encoded or
//! decoded data; the generic [`encode`], [`encode_upper`], and [`decode`]
//! wrappers are status-only and discard the value that the ordinary API would
//! return.
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

use crate::{FromHex, HexTarget};

pub use ctutils_dep::Choice;

#[inline]
fn choice_from_result<T, E>(result: Result<T, E>) -> Choice {
    Choice::from_u8_lsb(result.is_ok() as u8)
}

/// Encode bytes to lowercase hex into `output`, returning whether it succeeded.
///
/// Returns [`Choice::TRUE`] when `output.len() == input.as_ref().len() * 2`,
/// and [`Choice::FALSE`] otherwise. On success, `output` contains lowercase
/// hex ASCII. On failure, `output` contents are unspecified.
#[inline]
pub fn encode_to_slice(input: impl AsRef<[u8]>, output: &mut [u8]) -> Choice {
    choice_from_result(crate::encode_to_slice(input, output))
}

/// Encode bytes to uppercase hex into `output`, returning whether it succeeded.
///
/// Returns [`Choice::TRUE`] when `output.len() == input.as_ref().len() * 2`,
/// and [`Choice::FALSE`] otherwise. On success, `output` contains uppercase
/// hex ASCII. On failure, `output` contents are unspecified.
#[inline]
pub fn encode_to_slice_upper(input: impl AsRef<[u8]>, output: &mut [u8]) -> Choice {
    choice_from_result(crate::encode_to_slice_upper(input, output))
}

/// Report whether lowercase hex encoding into `T` would succeed.
///
/// This is the [`Choice`]-returning counterpart of [`crate::encode`], but it
/// is status-only: the encoded `T` is discarded. For data-producing code,
/// prefer [`encode_to_slice`] or the ordinary [`crate::encode`] API.
#[inline]
pub fn encode<T: HexTarget>(input: impl AsRef<[u8]>) -> Choice {
    choice_from_result(crate::encode::<T>(input))
}

/// Report whether uppercase hex encoding into `T` would succeed.
///
/// This is the [`Choice`]-returning counterpart of [`crate::encode_upper`],
/// but it is status-only: the encoded `T` is discarded. For data-producing
/// code, prefer [`encode_to_slice_upper`] or the ordinary
/// [`crate::encode_upper`] API.
#[inline]
pub fn encode_upper<T: HexTarget>(input: impl AsRef<[u8]>) -> Choice {
    choice_from_result(crate::encode_upper::<T>(input))
}

/// Decode hex `input` into `output`, returning whether it succeeded.
///
/// Returns [`Choice::FALSE`] if the input length is wrong or any byte is not
/// in `[0-9a-fA-F]`. On failure, `output` contents are unspecified, matching
/// [`crate::decode_to_slice`].
#[inline]
pub fn decode_to_slice(input: impl AsRef<[u8]>, output: &mut [u8]) -> Choice {
    choice_from_result(crate::decode_to_slice(input, output))
}

/// Report whether decoding hex `input` into `T` would succeed.
///
/// This is the [`Choice`]-returning counterpart of [`crate::decode`], but it
/// is status-only: the decoded `T` is discarded. For data-producing code,
/// prefer [`decode_to_slice`] or the ordinary [`crate::decode`] API.
#[inline]
pub fn decode<T: FromHex>(input: impl AsRef<[u8]>) -> Choice {
    choice_from_result(crate::decode::<T>(input))
}

/// Check if `input` is valid hex, returning a [`Choice`].
///
/// Returns [`Choice::TRUE`] iff `input` has even length and every byte is in
/// `[0-9a-fA-F]`.
#[inline]
pub fn check(input: impl AsRef<[u8]>) -> Choice {
    Choice::from_u8_lsb(crate::check(input) as u8)
}

/// Compile-time hex validity check returning a [`Choice`].
///
/// Returns [`Choice::TRUE`] iff `input` has even length and every byte is in
/// `[0-9a-fA-F]`.
#[inline]
pub const fn const_check(input: &[u8]) -> Choice {
    Choice::from_u8_lsb(crate::const_check(input) as u8)
}

/// Report whether compile-time decoding into `[u8; N]` would succeed.
///
/// This is the [`Choice`]-returning counterpart of
/// [`crate::const_decode_to_array`], but it is status-only: the decoded array
/// is discarded.
#[inline]
pub const fn const_decode_to_array<const N: usize>(input: &[u8]) -> Choice {
    Choice::from_u8_lsb(crate::const_decode_to_array::<N>(input).is_ok() as u8)
}
