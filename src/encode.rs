//! Hex encoding — public free functions.
//!
//! The slice-based functions (`encode_to_slice`, `encode_to_slice_upper`)
//! encode into a caller-provided `&mut [u8]` buffer.
//!
//! The allocating functions (`encode`, `encode_upper`) delegate to
//! [`encode_to::<String>()`](crate::encode_to) via the [`HexTarget`](crate::HexTarget) trait,
//! ensuring a single implementation for all String-producing paths.

use crate::{backend, error::Error};
use core::{mem::MaybeUninit, slice, str};

/// Encode `input` into a caller-provided `output` buffer, returning `&mut str`.
///
/// The output must be exactly `input.len() * 2` bytes long.
fn encode_to_slice_inner<'a, const UPPER: bool>(
    input: &[u8],
    output: &'a mut [u8],
) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength {
            expected,
            got: output.len(),
        });
    }
    // SAFETY: `MaybeUninit<u8>` has the same layout as `u8`. The backend
    // overwrites every element.
    let uninit =
        unsafe { slice::from_raw_parts_mut(output.as_mut_ptr().cast::<MaybeUninit<u8>>(), output.len()) };
    backend::encode::<UPPER>(input, uninit);
    debug_assert!(output.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
    // SAFETY: hex ASCII is valid UTF-8.
    Ok(unsafe { str::from_utf8_unchecked_mut(output) })
}

/// Encode bytes to lowercase hex into `output`. Returns the hex string.
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
pub fn encode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_to_slice_inner::<false>(input, output)
}

/// Encode bytes to uppercase hex into `output`. Returns the hex string.
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
pub fn encode_to_slice_upper<'a>(
    input: &[u8],
    output: &'a mut [u8],
) -> Result<&'a mut str, Error> {
    encode_to_slice_inner::<true>(input, output)
}

/// Encode bytes to a lowercase hex `String`.
///
/// Delegates to [`encode_to::<String>()`](crate::encode_to) — the same
/// zero-copy [`HexTarget`](crate::HexTarget) path.
#[cfg(feature = "alloc")]
pub fn encode(input: &[u8]) -> alloc::string::String {
    // encode_to::<String> always succeeds (String has unlimited capacity).
    crate::hex_target::encode_to(input).expect("String allocation failed")
}

/// Encode bytes to an uppercase hex `String`.
///
/// Delegates to [`encode_upper_to::<String>()`](crate::encode_upper_to).
#[cfg(feature = "alloc")]
pub fn encode_upper(input: &[u8]) -> alloc::string::String {
    crate::hex_target::encode_upper_to(input).expect("String allocation failed")
}
