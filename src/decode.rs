//! Hex decoding and validation — public free functions.
//!
//! All decoding goes through [`FromHex`] trait implementations.
//! The free functions here are thin wrappers for ergonomics.

use crate::error::Error;
use crate::traits::FromHex;
use crate::{backend, maybe_uninit};

/// Decode hex into any type that implements [`FromHex`].
///
/// Accepts hex characters in either case (`[0-9a-fA-F]`), including
/// arbitrary mixings of upper and lower case in the same input. The
/// encode side, by contrast, always produces a single canonical case
/// (see [`encode`](crate::encode) and [`encode_upper`](crate::encode_upper)).
///
/// # Examples
///
/// ```rust
/// // Decode to Vec<u8>
/// let bytes: Vec<u8> = better_hex::decode("deadbeef").unwrap();
///
/// // Decode to fixed-size array
/// let arr: [u8; 4] = better_hex::decode("deadbeef").unwrap();
///
/// // Mixed case is accepted.
/// let mixed: [u8; 4] = better_hex::decode("DeAdBeEf").unwrap();
/// assert_eq!(mixed, [0xde, 0xad, 0xbe, 0xef]);
/// ```
pub fn decode<T: FromHex>(input: impl AsRef<[u8]>) -> Result<T, T::Error> {
    T::from_hex(input)
}

/// Decode hex `input` into a caller-provided `output` buffer.
///
/// Accepts upper, lower, and mixed case hex characters (`[0-9a-fA-F]`).
///
/// Returns [`Error::InvalidLength`] if `input.len() != output.len() * 2`.
/// Returns [`Error::InvalidEncoding`] if any byte in `input` is not a valid hex character.
///
/// # Output on error
///
/// On `Err`, the contents of `output` are **unspecified** — some or all bytes
/// may have been overwritten with partially-decoded data. This is deliberate:
/// the decoder processes every byte without early exit to guarantee
/// constant-time behavior w.r.t. input data values. Callers must not rely
/// on `output` contents after a failed decode.
#[inline]
pub fn decode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    // SAFETY: `MaybeUninit<u8>` has the same layout as `u8`; the pointer cast
    // preserves the slice length. Treating initialized `u8` as `MaybeUninit<u8>`
    // is always valid (widening the validity invariant). The backend will
    // overwrite every element on success.
    let mu_output = maybe_uninit::slice_as_uninit_mut(output);
    backend::decode(input, mu_output)?;
    Ok(output)
}

/// Check if `input` is a valid hex string.
///
/// Returns `true` iff `input` has even length and every byte is in
/// `[0-9a-fA-F]`. Both cases and any mix of them are accepted —
/// validity is purely a function of the byte set, not the case.
#[inline]
pub fn check(input: &[u8]) -> bool {
    input.len().is_multiple_of(2) && backend::check(input)
}

/// Internal: decode hex into a fixed-size array using the backend directly.
/// Used by the `FromHex` impl for `[u8; N]`.
pub(crate) fn decode_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error> {
    let mut out = maybe_uninit::uninit_array::<N>();
    backend::decode(input, &mut out)?;
    // SAFETY: backend initialized all N bytes on Ok.
    Ok(unsafe { maybe_uninit::transpose(out).assume_init() })
}
