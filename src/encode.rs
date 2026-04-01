//! Hex encoding — public free functions.
//!
//! The slice-based functions (`encode_to_slice`, `encode_to_slice_upper`)
//! encode into a caller-provided `&mut [u8]` buffer.
//!
//! The allocating functions (`encode`, `encode_upper`) delegate to
//! [`encode_to::<String>()`](crate::encode_to) via the [`HexTarget`](crate::HexTarget) trait.

use crate::{backend, error::Error, maybe_uninit};

/// Encode `input` into a caller-provided `output` buffer, returning `&mut str`.
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
    backend::encode::<UPPER>(input, maybe_uninit::slice_as_uninit_mut(output));
    // SAFETY: backend wrote valid hex ASCII (valid UTF-8) into every byte.
    Ok(unsafe { maybe_uninit::bytes_to_hex_str_mut(output) })
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
/// Delegates to [`HexTarget::encode_hex`](crate::HexTarget::encode_hex) on `String`.
#[cfg(feature = "alloc")]
pub fn encode(input: &[u8]) -> alloc::string::String {
    let Ok(s) = crate::hex_target::encode_to(input);
    s
}

/// Encode bytes to an uppercase hex `String`.
///
/// Delegates to [`HexTarget::encode_hex_upper`](crate::HexTarget::encode_hex_upper) on `String`.
#[cfg(feature = "alloc")]
pub fn encode_upper(input: &[u8]) -> alloc::string::String {
    let Ok(s) = crate::hex_target::encode_upper_to(input);
    s
}
