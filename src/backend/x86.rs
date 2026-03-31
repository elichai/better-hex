//! x86 SSSE3/AVX2 hex backend (stub — delegates to scalar until implemented).
use crate::backend::scalar;
use crate::error::Error;
use core::mem::MaybeUninit;

#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn encode_ssse3<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    scalar::encode::<UPPER>(input, output);
}

#[target_feature(enable = "avx2")]
pub(crate) unsafe fn encode_avx2<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    scalar::encode::<UPPER>(input, output);
}

#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn decode_ssse3(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    scalar::decode(input, output)
}

#[target_feature(enable = "avx2")]
pub(crate) unsafe fn decode_avx2(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    scalar::decode(input, output)
}

#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn check_ssse3(input: &[u8]) -> bool {
    scalar::check(input)
}
