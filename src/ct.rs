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
fn encode_inner<'a, const UPPER: bool>(
    input: &[u8],
    output: &'a mut [u8],
) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    let uninit = unsafe {
        core::slice::from_raw_parts_mut(
            output.as_mut_ptr().cast::<MaybeUninit<u8>>(),
            output.len(),
        )
    };
    backend::ct_encode::<UPPER>(input, uninit);
    debug_assert!(output.iter().all(|b| b.is_ascii()), "ct encode produced non-ASCII");
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
        return Err(Error::InvalidLength { expected, got: input.len() });
    }
    let uninit = unsafe {
        core::slice::from_raw_parts_mut(
            output.as_mut_ptr().cast::<MaybeUninit<u8>>(),
            output.len(),
        )
    };
    backend::ct_decode(input, uninit)?;
    Ok(output)
}

/// Decode hex to a fixed-size byte array (constant-time).
///
/// Returns [`Error::InvalidLength`] if `input.len() != 2 * N`.
pub fn decode_to_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error> {
    let expected = N * 2;
    if input.len() != expected {
        return Err(Error::InvalidLength { expected, got: input.len() });
    }
    let mut out: [MaybeUninit<u8>; N] = maybe_uninit::uninit_array();
    backend::ct_decode(input, &mut out)?;
    Ok(unsafe { maybe_uninit::transpose(out).assume_init() })
}

/// Check if all bytes are valid hex characters (constant-time).
///
/// Processes all bytes even if an early one is invalid.
pub fn check(input: &[u8]) -> bool {
    backend::ct_check(input)
}
