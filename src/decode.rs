use crate::backend;
use crate::error::Error;

/// Decode hex `input` into `output`. Returns the written bytes.
///
/// Returns [`Error::InvalidLength`] if `input.len()` is not exactly
/// `output.len() * 2`.
pub fn decode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    let expected = output.len() * 2;
    if input.len() != expected {
        return Err(Error::InvalidLength { expected, got: input.len() });
    }
    backend::decode(input, output)?;
    Ok(output)
}

/// Decode hex to a fixed-size byte array.
///
/// Returns [`Error::InvalidLength`] if `input.len()` is not exactly `2 * N`.
pub fn decode_to_array<const N: usize>(input: impl AsRef<[u8]>) -> Result<[u8; N], Error> {
    let input = input.as_ref();
    let expected = N * 2;
    if input.len() != expected {
        return Err(Error::InvalidLength { expected, got: input.len() });
    }
    let mut out = [0u8; N];
    backend::decode(input, &mut out)?;
    Ok(out)
}

/// Decode hex to a `Vec<u8>`.
///
/// Returns [`Error::InvalidLength`] if the input has odd length.
#[cfg(feature = "alloc")]
pub fn decode(input: impl AsRef<[u8]>) -> Result<alloc::vec::Vec<u8>, Error> {
    let input = input.as_ref();
    if !input.len().is_multiple_of(2) {
        return Err(Error::InvalidLength { expected: input.len() & !1, got: input.len() });
    }
    let mut out = alloc::vec![0u8; input.len() / 2];
    backend::decode(input, &mut out)?;
    Ok(out)
}

/// Check if `input` is a valid hex string (even length + all hex chars).
pub fn check(input: &[u8]) -> bool {
    input.len().is_multiple_of(2) && backend::check(input)
}

/// Check if all bytes in `input` are valid hex ASCII characters (no length check).
pub fn check_raw(input: &[u8]) -> bool {
    backend::check(input)
}
