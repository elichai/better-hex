use crate::backend;
use crate::error::Error;

/// Encode bytes to lowercase hex into `output`. Returns the hex string.
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
pub fn encode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    backend::encode::<false>(input, output);
    debug_assert!(output.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Encode bytes to uppercase hex into `output`. Returns the hex string.
///
/// Returns [`Error::InvalidLength`] if `output.len() != input.len() * 2`.
pub fn encode_to_slice_upper<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    backend::encode::<true>(input, output);
    debug_assert!(output.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Encode bytes to a lowercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode(input: &[u8]) -> alloc::string::String {
    let mut buf = alloc::vec![0u8; input.len() * 2];
    backend::encode::<false>(input, &mut buf);
    debug_assert!(buf.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}

/// Encode bytes to an uppercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode_upper(input: &[u8]) -> alloc::string::String {
    let mut buf = alloc::vec![0u8; input.len() * 2];
    backend::encode::<true>(input, &mut buf);
    debug_assert!(buf.iter().all(|b| b.is_ascii()), "encode produced non-ASCII bytes");
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}
