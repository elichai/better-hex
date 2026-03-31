use crate::arch;
use crate::error::Error;

/// Decode hex `input` into `output`. Returns the written bytes.
pub fn decode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    if !input.len().is_multiple_of(2) {
        return Err(Error::OddLength);
    }
    let expected = input.len() / 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    arch::decode(input, output)?;
    Ok(output)
}

/// Decode hex to a fixed-size byte array.
pub fn decode_to_array<const N: usize>(input: impl AsRef<[u8]>) -> Result<[u8; N], Error> {
    let input = input.as_ref();
    if !input.len().is_multiple_of(2) {
        return Err(Error::OddLength);
    }
    if input.len() / 2 != N {
        return Err(Error::InvalidLength { expected: N * 2, got: input.len() });
    }
    let mut out = [0u8; N];
    arch::decode(input, &mut out)?;
    Ok(out)
}

/// Decode hex to a `Vec<u8>`.
#[cfg(feature = "alloc")]
pub fn decode(input: impl AsRef<[u8]>) -> Result<alloc::vec::Vec<u8>, Error> {
    let input = input.as_ref();
    if !input.len().is_multiple_of(2) {
        return Err(Error::OddLength);
    }
    let mut out = alloc::vec![0u8; input.len() / 2];
    arch::decode(input, &mut out)?;
    Ok(out)
}

/// Check if `input` is a valid hex string (even length + all hex chars).
pub fn check(input: &[u8]) -> bool {
    input.len().is_multiple_of(2) && arch::check(input)
}

/// Check if all bytes in `input` are valid hex ASCII characters (no length check).
pub fn check_raw(input: &[u8]) -> bool {
    arch::check(input)
}
