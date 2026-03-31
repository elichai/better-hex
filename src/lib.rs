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
pub use prefix::{NoPrefix, Prefix, WithPrefix};

#[cfg(feature = "alloc")]
pub use decode::decode;
#[cfg(feature = "alloc")]
pub use encode::{encode, encode_upper};

// Modules — will be uncommented as implemented:
// mod display;
// mod hex_str;
