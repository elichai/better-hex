//! Hex encoding — public free functions.
//!
//! - [`encode_to_slice`] / [`encode_to_slice_upper`] — encode into a caller-provided `&mut [u8]`.
//! - [`encode`] / [`encode_upper`] — encode into any [`HexTarget`](crate::HexTarget).

use crate::{backend, error::Error, maybe_uninit, traits::HexTarget};

/// Encode `input` into a caller-provided `output` buffer, returning `&mut str`.
#[inline]
fn encode_to_slice_inner<'a>(input: &[u8], output: &'a mut [u8], upper: bool) -> Result<&'a mut str, Error> {
    backend::encode(input, maybe_uninit::slice_as_uninit_mut(output), upper)?;
    // SAFETY: backend wrote valid hex ASCII (valid UTF-8) into every byte.
    Ok(unsafe { maybe_uninit::bytes_to_hex_str_mut(output) })
}

/// Encode bytes to lowercase hex into `output`. Returns the hex string.
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
#[inline]
pub fn encode_to_slice(input: impl AsRef<[u8]>, output: &mut [u8]) -> Result<&mut str, Error> {
    encode_to_slice_inner(input.as_ref(), output, false)
}

/// Encode bytes to uppercase hex into `output`. Returns the hex string.
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
#[inline]
pub fn encode_to_slice_upper(input: impl AsRef<[u8]>, output: &mut [u8]) -> Result<&mut str, Error> {
    encode_to_slice_inner(input.as_ref(), output, true)
}

/// Encode bytes to lowercase hex into any [`HexTarget`].
///
/// Dispatches to the SIMD backend matching the running CPU (x86 runtime
/// feature detection; AArch64 / WASM compile-time selection). With the
/// `disable-simd` feature, or on targets without a SIMD backend, falls
/// back to the constant-time scalar path. See the
/// [crate-level performance note](crate#performance-const-fn-vs-runtime-apis).
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
/// ```
pub fn encode<T: HexTarget>(input: impl AsRef<[u8]>) -> Result<T, T::Error> {
    T::encode_hex(input)
}

/// Encode bytes to uppercase hex into any [`HexTarget`].
///
/// Same SIMD dispatch as [`encode`]; only the digit case differs.
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode_upper(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub fn encode_upper<T: HexTarget>(input: impl AsRef<[u8]>) -> Result<T, T::Error> {
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
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
pub fn encode_string(input: impl AsRef<[u8]>) -> alloc::string::String {
    let Ok(s) = encode(input);
    s
}
