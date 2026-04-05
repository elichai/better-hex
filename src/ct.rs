//! Constant-time hex operations for cryptographic contexts.
//!
//! All functions in this module guarantee:
//! - No lookup tables in memory (branchless arithmetic or register-only SIMD LUTs)
//! - No data-dependent branches
//! - Error accumulation without early return (no timing leak on error position)
//! - NOT constant-time w.r.t. input *length* (only w.r.t. data *values*)
//!
//! On platforms with SIMD support, the encode path reuses the fast register-based
//! LUT approach (inherently CT). The decode/check paths use the same SIMD
//! algorithms but with error accumulation instead of early returns.

use crate::backend;
use crate::error::Error;
use crate::maybe_uninit;
use core::mem::MaybeUninit;

/// Encode bytes to lowercase hex (constant-time).
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
pub fn encode_lower<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_inner::<false>(input, output)
}

/// Encode bytes to uppercase hex (constant-time).
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
pub fn encode_upper<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_inner::<true>(input, output)
}

/// Shared implementation for CT encode.
fn encode_inner<'a, const UPPER: bool>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength {
            expected,
            got: output.len(),
        });
    }
    // SAFETY: `MaybeUninit<u8>` has the same layout as `u8`; pointer and length
    // come from a valid `&mut [u8]`. Treating initialized bytes as `MaybeUninit`
    // is always valid (widening the validity invariant). The backend will
    // overwrite every element.
    let uninit =
        unsafe { core::slice::from_raw_parts_mut(output.as_mut_ptr().cast::<MaybeUninit<u8>>(), output.len()) };
    backend::ct_encode::<UPPER>(input, uninit);
    debug_assert!(output.iter().all(|b| b.is_ascii()), "ct encode produced non-ASCII");
    // SAFETY: ct_encode wrote valid hex ASCII into every byte of `output`.
    // Hex ASCII is a subset of valid UTF-8.
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Decode hex to bytes (constant-time).
///
/// Returns `Error::InvalidEncoding` if any byte is not valid hex.
/// Does **not** report which position was invalid — that would leak
/// timing information.
///
/// Returns [`Error::InvalidLength`] if `input.len() != output.len() * 2`.
pub fn decode<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    let expected = output.len() * 2;
    if input.len() != expected {
        return Err(Error::InvalidLength {
            expected,
            got: input.len(),
        });
    }
    // SAFETY: `MaybeUninit<u8>` has the same layout as `u8`; pointer and length
    // come from a valid `&mut [u8]`. Treating initialized bytes as `MaybeUninit`
    // is always valid (widening the validity invariant). The backend will
    // overwrite every element on success.
    let uninit =
        unsafe { core::slice::from_raw_parts_mut(output.as_mut_ptr().cast::<MaybeUninit<u8>>(), output.len()) };
    backend::ct_decode(input, uninit)?;
    Ok(output)
}

/// Trait for types that can be constructed from hex-encoded data
/// using constant-time decoding.
///
/// This is the constant-time counterpart of [`crate::FromHex`].
///
/// # Examples
///
/// ```rust
/// use better_hex::ct::FromHex;
///
/// let arr = <[u8; 4]>::from_hex(b"deadbeef").unwrap();
/// assert_eq!(arr, [0xde, 0xad, 0xbe, 0xef]);
/// ```
pub trait FromHex: Sized {
    /// The error type returned on decode failure.
    type Error;

    /// Decode a hex string into `Self` using constant-time operations.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

impl<const N: usize> FromHex for [u8; N] {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        let hex = hex.as_ref();
        let expected = N * 2;
        if hex.len() != expected {
            return Err(Error::InvalidLength {
                expected,
                got: hex.len(),
            });
        }
        let mut out: [MaybeUninit<u8>; N] = maybe_uninit::uninit_array();
        backend::ct_decode(hex, &mut out)?;
        // SAFETY: ct_decode returned Ok, guaranteeing all N bytes are initialized.
        Ok(unsafe { maybe_uninit::transpose(out).assume_init() })
    }
}

#[cfg(feature = "alloc")]
impl FromHex for alloc::vec::Vec<u8> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        let hex = hex.as_ref();
        if !hex.len().is_multiple_of(2) {
            return Err(Error::InvalidLength {
                expected: hex.len() + 1,
                got: hex.len(),
            });
        }
        let out_len = hex.len() / 2;
        let mut out = alloc::vec::Vec::with_capacity(out_len);
        backend::ct_decode(hex, &mut out.spare_capacity_mut()[..out_len])?;
        // SAFETY: ct_decode initialized all out_len bytes on Ok.
        unsafe { out.set_len(out_len) };
        Ok(out)
    }
}

/// Decode hex into any type that implements [`FromHex`] (constant-time).
///
/// # Examples
///
/// ```rust
/// let arr: [u8; 4] = better_hex::ct::decode_to(b"deadbeef").unwrap();
/// assert_eq!(arr, [0xde, 0xad, 0xbe, 0xef]);
/// ```
pub fn decode_to<T: FromHex>(input: impl AsRef<[u8]>) -> Result<T, T::Error> {
    T::from_hex(input)
}

/// Check if all bytes are valid hex characters (constant-time).
///
/// Processes all bytes even if an early one is invalid.
pub fn check(input: &[u8]) -> bool {
    backend::ct_check(input)
}
