use crate::arch;
use crate::error::Error;

/// Encode bytes to lowercase hex into `output`. Returns the hex string.
pub fn encode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    arch::encode::<false>(input, output);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Encode bytes to uppercase hex into `output`. Returns the hex string.
pub fn encode_to_slice_upper<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    arch::encode::<true>(input, output);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Encode bytes to a lowercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode(input: &[u8]) -> alloc::string::String {
    let mut buf = alloc::vec![0u8; input.len() * 2];
    arch::encode::<false>(input, &mut buf);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}

/// Encode bytes to an uppercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode_upper(input: &[u8]) -> alloc::string::String {
    let mut buf = alloc::vec![0u8; input.len() * 2];
    arch::encode::<true>(input, &mut buf);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}
