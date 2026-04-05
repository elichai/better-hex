//! Hex encoding — public free functions.
//!
//! - [`encode_to_slice`] / [`encode_to_slice_upper`] — encode into a caller-provided `&mut [u8]`.
//! - [`encode`] / [`encode_upper`] — encode into any [`HexTarget`](crate::HexTarget).

use crate::{backend, error::Error, maybe_uninit, traits::HexTarget};

/// Encode `input` into a caller-provided `output` buffer, returning `&mut str`.
#[inline]
fn encode_to_slice_inner<'a, const UPPER: bool>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
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
#[inline]
pub fn encode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_to_slice_inner::<false>(input, output)
}

/// Encode bytes to uppercase hex into `output`. Returns the hex string.
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
#[inline]
pub fn encode_to_slice_upper<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_to_slice_inner::<true>(input, output)
}

/// Encode bytes to lowercase hex into any [`HexTarget`].
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
/// ```
pub fn encode<T: HexTarget>(input: &[u8]) -> Result<T, T::Error> {
    T::encode_hex(input)
}

/// Encode bytes to uppercase hex into any [`HexTarget`].
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode_upper(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub fn encode_upper<T: HexTarget>(input: &[u8]) -> Result<T, T::Error> {
    T::encode_hex_upper(input)
}

/// Encode bytes to a lowercase hex `String`.
///
/// Convenience wrapper around [`encode`] for the common `String` case.
///
/// # Examples
///
/// ```rust
/// let s = better_hex::encode_string(&[0xde, 0xad]);
/// assert_eq!(s, "dead");
/// ```
#[cfg(feature = "alloc")]
pub fn encode_string(input: &[u8]) -> alloc::string::String {
    let Ok(s) = encode(input);
    s
}
