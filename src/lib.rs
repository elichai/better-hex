#![no_std]
#![warn(missing_docs)]
//! Fast hex encoding/decoding with SIMD, const fn, and constant-time support.

#[cfg(feature = "alloc")]
extern crate alloc;

#[cfg(feature = "std")]
extern crate std;

mod arch;
mod decode;
mod encode;
mod error;
mod prefix;

pub use decode::{check, check_raw, decode_to_array, decode_to_slice};
pub use encode::{encode_to_slice, encode_to_slice_upper};
pub use error::Error;
pub use hex_str::{const_check, const_decode_to_array, HexStr};
pub use prefix::{NoPrefix, Prefix, WithPrefix};

/// A [`HexStr`] with a `"0x"` prefix.
pub type PrefixedHexStr<const N: usize> = HexStr<N, WithPrefix>;

#[cfg(feature = "alloc")]
pub use decode::decode;
#[cfg(feature = "alloc")]
pub use encode::{encode, encode_upper};

mod hex_str;

mod display;
pub use display::display;
