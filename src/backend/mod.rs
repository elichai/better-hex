//! Backend dispatch layer.
//!
//! This module selects the best available backend (currently scalar-only;
//! SIMD backends will be added later) and exposes a uniform internal API.
//!
//! The inner backend functions work with `MaybeUninit<u8>` output buffers
//! to avoid unnecessary zeroing. This module provides safe wrappers that
//! handle the `assume_init` step for callers that pass regular `&mut [u8]`.

pub(crate) mod scalar;

use crate::error::Error;
use core::mem::MaybeUninit;

/// Encode `input` bytes as hex into an uninitialized `output` buffer.
///
/// After a successful return, all `output[..input.len() * 2]` elements are
/// initialized with valid hex ASCII bytes.
///
/// # Panics (debug only)
///
/// Panics if `output.len() != input.len() * 2`.
#[inline]
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    scalar::encode::<UPPER>(input, output);
}

/// Decode hex `input` into `output`.
///
/// Returns `Ok(())` on success or `Err(InvalidChar { .. })` on the first
/// invalid hex character.
///
/// # Panics (debug only)
///
/// Panics if `output.len() != input.len() / 2` or input length is odd.
#[inline]
pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    scalar::decode(input, output)
}

/// Check if every byte in `input` is a valid hex ASCII character.
#[inline]
pub(crate) fn check(input: &[u8]) -> bool {
    scalar::check(input)
}
