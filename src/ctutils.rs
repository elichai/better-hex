//! [`Choice`]-returning wrappers for the top-level API.
//!
//! These functions report ordinary success/failure as a single [`Choice`] bit.
//! Functions that produce encoded or decoded data write through
//! caller-provided output slices.
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

#[inline]
fn choice_from_even_len(len: usize) -> Choice {
    Choice::from_u64_eq((len & 1) as u64, 0)
}

#[inline]
fn decode_to_uninit(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Choice {
    if input.len() != output.len() * 2 {
        return Choice::FALSE;
    }

    // The backend returns the raw error accumulator (`0` iff valid); building the
    // `Choice` from it here keeps the validity bit out of any `Result` / `bool`
    // discriminant before the constant-time barrier.
    Choice::from_u64_eq(backend::decode_accum_no_length_check(input, output), 0)
}

/// Encode bytes to lowercase hex into `output`, returning whether it succeeded.
///
/// Returns [`Choice::TRUE`] when `output.len() == input.len() * 2`, and
/// [`Choice::FALSE`] otherwise. On success, `output` contains lowercase hex
/// ASCII. On failure, `output` contents are unspecified.
#[inline]
pub fn encode_to_slice(input: &[u8], output: &mut [u8]) -> Choice {
    if output.len() != input.len() * 2 {
        return Choice::FALSE;
    }

    backend::encode_no_length_check(input, maybe_uninit::slice_as_uninit_mut(output), false);
    Choice::TRUE
}

/// Encode bytes to uppercase hex into `output`, returning whether it succeeded.
///
/// Returns [`Choice::TRUE`] when `output.len() == input.len() * 2`, and
/// [`Choice::FALSE`] otherwise. On success, `output` contains uppercase hex
/// ASCII. On failure, `output` contents are unspecified.
#[inline]
pub fn encode_to_slice_upper(input: &[u8], output: &mut [u8]) -> Choice {
    if output.len() != input.len() * 2 {
        return Choice::FALSE;
    }

    backend::encode_no_length_check(input, maybe_uninit::slice_as_uninit_mut(output), true);
    Choice::TRUE
}

/// Decode hex `input` into `output`, returning whether it succeeded.
///
/// Returns [`Choice::FALSE`] if the input length is wrong or any byte is not
/// in `[0-9a-fA-F]`. On failure, `output` contents are unspecified, matching
/// [`crate::decode_to_slice`].
#[inline]
pub fn decode_to_slice(input: &[u8], output: &mut [u8]) -> Choice {
    decode_to_uninit(input, maybe_uninit::slice_as_uninit_mut(output))
}

/// Check if `input` is valid hex, returning a [`Choice`].
///
/// Returns [`Choice::TRUE`] iff `input` has even length and every byte is in
/// `[0-9a-fA-F]`.
#[inline]
pub fn check(input: &[u8]) -> Choice {
    choice_from_even_len(input.len()) & Choice::from_u64_eq(backend::check_accum(input), 0)
}

/// Compile-time hex validity check returning a [`Choice`].
///
/// Returns [`Choice::TRUE`] iff `input` has even length and every byte is in
/// `[0-9a-fA-F]`.
#[inline]
pub const fn const_check(input: &[u8]) -> Choice {
    let len_ok = Choice::from_u64_eq((input.len() & 1) as u64, 0);
    let bytes_ok = Choice::from_u64_eq(crate::backend::scalar::check_inner(input) as u64, 0);
    len_ok.and(bytes_ok)
}
