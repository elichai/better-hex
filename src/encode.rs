//! Hex encoding — public free functions.
//!
//! All functions delegate to [`crate::backend::encode`] for the actual byte
//! conversion, then handle length validation and the `&[u8]` → `&str` step.

use crate::{backend, error::Error};
use core::{mem::MaybeUninit, slice, str};

/// Shared implementation for [`encode_to_slice`] and [`encode_to_slice_upper`].
///
/// Validates output length, encodes via the backend into a `MaybeUninit` view
/// of the output buffer, then returns the result as `&mut str`.
fn encode_to_slice_inner<'a, const UPPER: bool>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength {
            expected,
            got: output.len(),
        });
    }
    // SAFETY: `MaybeUninit<u8>` has the same layout as `u8`. The backend
    // overwrites every element, so re-interpreting initialized memory as
    // maybe-uninit is fine.
    let uninit = unsafe { slice::from_raw_parts_mut(output.as_mut_ptr().cast::<MaybeUninit<u8>>(), output.len()) };
    backend::encode::<UPPER>(input, uninit);
    debug_assert!(output.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
    // SAFETY: the backend writes only hex ASCII bytes (`[0-9a-fA-F]`),
    // all of which are valid single-byte UTF-8.
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
pub fn encode_to_slice_upper<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_to_slice_inner::<true>(input, output)
}

/// Shared implementation for [`encode`] and [`encode_upper`].
///
/// Allocates a `Vec` with the right capacity, encodes into its spare
/// capacity, then converts to `String` without re-validation.
#[cfg(feature = "alloc")]
fn encode_string<const UPPER: bool>(input: &[u8]) -> alloc::string::String {
    let hex_len = input.len() * 2;
    let mut buf = alloc::vec::Vec::<u8>::with_capacity(hex_len);
    backend::encode::<UPPER>(input, &mut buf.spare_capacity_mut()[..hex_len]);
    // SAFETY: the backend writes exactly `hex_len` valid hex ASCII bytes.
    unsafe { buf.set_len(hex_len) };
    debug_assert!(buf.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
    // SAFETY: hex ASCII bytes are valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}

/// Encode bytes to a lowercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode(input: &[u8]) -> alloc::string::String {
    encode_string::<false>(input)
}

/// Encode bytes to an uppercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode_upper(input: &[u8]) -> alloc::string::String {
    encode_string::<true>(input)
}
