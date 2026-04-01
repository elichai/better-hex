//! Hex decoding and validation — public free functions.
//!
//! All decoding goes through [`FromHex`] trait implementations.
//! The free functions here are thin wrappers for ergonomics.

use crate::error::Error;
use crate::traits::FromHex;
use crate::{backend, maybe_uninit};

/// Decode hex into any type that implements [`FromHex`].
///
/// # Examples
///
/// ```rust
/// // Decode to Vec<u8>
/// let bytes: Vec<u8> = better_hex::decode_to("deadbeef").unwrap();
///
/// // Decode to fixed-size array
/// let arr: [u8; 4] = better_hex::decode_to("deadbeef").unwrap();
/// ```
pub fn decode_to<T: FromHex>(input: impl AsRef<[u8]>) -> Result<T, T::Error> {
    T::from_hex(input)
}

/// Decode hex to a `Vec<u8>`.
///
/// Convenience wrapper for `decode_to::<Vec<u8>>()`.
#[cfg(feature = "alloc")]
pub fn decode(input: impl AsRef<[u8]>) -> Result<alloc::vec::Vec<u8>, Error> {
    decode_to(input)
}

/// Decode hex to a fixed-size byte array.
///
/// Convenience wrapper for `decode_to::<[u8; N]>()`.
pub fn decode_to_array<const N: usize>(input: impl AsRef<[u8]>) -> Result<[u8; N], Error> {
    decode_to(input)
}

/// Decode hex `input` into a caller-provided `output` buffer.
///
/// Returns [`Error::InvalidLength`] if `input.len() != output.len() * 2`.
/// Returns [`Error::InvalidChar`] if any byte in `input` is not a valid hex character.
pub fn decode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    if input.len() != output.len() * 2 {
        return Err(Error::InvalidLength {
            expected: output.len() * 2,
            got: input.len(),
        });
    }
    // SAFETY: MaybeUninit<u8> has the same layout as u8; backend overwrites every element.
    let mu_output = unsafe { &mut *(output as *mut [u8] as *mut [core::mem::MaybeUninit<u8>]) };
    backend::decode(input, mu_output)?;
    Ok(output)
}

/// Check if `input` is a valid hex string (even length and all hex chars).
pub fn check(input: &[u8]) -> bool {
    input.len().is_multiple_of(2) && backend::check(input)
}

/// Check if all bytes in `input` are valid hex ASCII characters (no length check).
///
/// Unlike [`check`], this does not require even length — it only validates
/// that every byte is in `[0-9a-fA-F]`.
pub fn check_raw(input: &[u8]) -> bool {
    backend::check(input)
}

/// Internal: decode hex into a fixed-size array using the backend directly.
/// Used by the `FromHex` impl for `[u8; N]`.
pub(crate) fn decode_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error> {
    if input.len() != N * 2 {
        return Err(Error::InvalidLength {
            expected: N * 2,
            got: input.len(),
        });
    }
    let mut out = maybe_uninit::uninit_array::<N>();
    backend::decode(input, &mut out)?;
    // SAFETY: backend initialized all N bytes on Ok.
    Ok(unsafe { maybe_uninit::transpose(out).assume_init() })
}
