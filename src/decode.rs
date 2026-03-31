//! Hex decoding and validation — public free functions.
//!
//! All decoding functions share a common pattern:
//! 1. Validate input length (must be even, and match expected output size).
//! 2. Delegate to [`crate::backend::decode`] for the actual byte conversion.
//! 3. Return the output or an [`Error`].

use crate::{backend, maybe_uninit};
use crate::error::Error;

/// Validate that `input_len` is even and equals `expected`.
/// Returns `Err(InvalidLength)` on mismatch.
fn check_decode_len(input_len: usize, expected: usize) -> Result<(), Error> {
    if input_len != expected {
        return Err(Error::InvalidLength {
            expected,
            got: input_len,
        });
    }
    Ok(())
}

/// Decode hex `input` into `output`. Returns the written bytes.
///
/// Returns [`Error::InvalidLength`] if `input.len() != output.len() * 2`.
/// Returns [`Error::InvalidChar`] if any byte in `input` is not a valid hex character.
pub fn decode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    check_decode_len(input.len(), output.len() * 2)?;
    // SAFETY: the backend writes only valid bytes into the output buffer.
    let mu_output = unsafe { &mut *(output as *mut [u8] as *mut [core::mem::MaybeUninit<u8>]) };
    backend::decode(input, mu_output)?;
    Ok(output)
}

/// Decode hex to a fixed-size byte array.
///
/// Returns [`Error::InvalidLength`] if `input.len() != 2 * N`.
/// Returns [`Error::InvalidChar`] if any byte is not valid hex.
pub fn decode_to_array<const N: usize>(input: impl AsRef<[u8]>) -> Result<[u8; N], Error> {
    let input = input.as_ref();
    check_decode_len(input.len(), N * 2)?;
    let mut out = maybe_uninit::array::<N>();
    backend::decode(input, &mut out)?;
    let out = maybe_uninit::transpose(out);
    // SAFETY: the backend returns an error if any byte is invalid hex, so all `out` bytes are initialized at this point.
    Ok(unsafe { out.assume_init() })
}

/// Decode hex to a `Vec<u8>`.
///
/// Returns [`Error::InvalidLength`] if the input has odd length.
/// Returns [`Error::InvalidChar`] if any byte is not valid hex.
#[cfg(feature = "alloc")]
pub fn decode(input: impl AsRef<[u8]>) -> Result<alloc::vec::Vec<u8>, Error> {
    let input = input.as_ref();
    if !input.len().is_multiple_of(2) {
        return Err(Error::InvalidLength {
            expected: input.len() + 1,
            got: input.len(),
        });
    }
    let len = input.len() / 2;
    let mut out = alloc::vec::Vec::with_capacity(len);
    backend::decode(input, &mut out.spare_capacity_mut()[..len])?;
    // SAFETY: the backend writes exactly `len` bytes into the output buffer, so it's safe to set the length to `len` here.
    unsafe { out.set_len(len) };
    Ok(out)
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
