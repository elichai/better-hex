#![no_std]
#![warn(missing_docs)]
//! Fast hex encoding/decoding with SIMD, const fn, and constant-time support.

#[cfg(feature = "alloc")]
extern crate alloc;

#[cfg(feature = "std")]
extern crate std;

mod error;
mod prefix;

pub use error::Error;
pub use prefix::{NoPrefix, Prefix, WithPrefix};

// Modules — will be uncommented as implemented:
// mod arch;
// mod decode;
// mod display;
// mod encode;
// mod hex_str;
