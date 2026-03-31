//! WASM SIMD128 hex backend (stub — delegates to scalar until implemented).
use crate::backend::scalar;
use crate::error::Error;
use core::mem::MaybeUninit;

pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    scalar::encode::<UPPER>(input, output);
}

pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    scalar::decode(input, output)
}

pub(crate) fn check(input: &[u8]) -> bool {
    scalar::check(input)
}
