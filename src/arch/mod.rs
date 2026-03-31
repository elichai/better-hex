pub(crate) mod generic;

use crate::error::Error;

#[inline]
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [u8]) {
    generic::encode::<UPPER>(input, output);
}

#[inline]
pub(crate) fn decode(input: &[u8], output: &mut [u8]) -> Result<(), Error> {
    generic::decode(input, output)
}

#[inline]
pub(crate) fn check(input: &[u8]) -> bool {
    generic::check(input)
}
