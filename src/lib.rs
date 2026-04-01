#![no_std]
#![warn(missing_docs)]
//! Fast hex encoding/decoding with SIMD, const fn, and constant-time support.

#[cfg(feature = "alloc")]
extern crate alloc;

#[cfg(feature = "std")]
extern crate std;

mod backend;
pub mod ct;
mod decode;
mod display;
mod encode;
mod error;
mod hex_str;
mod hex_target;
mod maybe_uninit;
mod prefix;
mod traits;

pub use decode::{check, check_raw, decode_to_array, decode_to_slice};
pub use display::{HexDisplay, display};
pub use encode::{encode_to_slice, encode_to_slice_upper};
pub use error::Error;
pub use hex_str::{HexStr, const_check, const_decode_to_array};
pub use hex_target::{HexTarget, encode_to, encode_upper_to};
pub use prefix::{NoPrefix, Prefix, WithPrefix};
pub use traits::{FromHex, ToHex};

#[cfg(feature = "alloc")]
pub use decode::decode;
#[cfg(feature = "alloc")]
pub use encode::{encode, encode_upper};

/// A [`HexStr`] with a `"0x"` prefix.
pub type PrefixedHexStr<const N: usize> = HexStr<N, WithPrefix>;

/// Backend internals for benchmarks and fuzz targets.
#[doc(hidden)]
pub mod bench_internals {
    pub use crate::backend::{scalar, ct_scalar};

    #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
    pub use crate::backend::neon;

    #[cfg(any(target_arch = "x86", target_arch = "x86_64"))]
    pub use crate::backend::x86;

    #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))]
    pub use crate::backend::wasm;

    pub use crate::backend::{
        encode as dispatched_encode,
        decode as dispatched_decode,
        check as dispatched_check,
        ct_encode as dispatched_ct_encode,
        ct_decode as dispatched_ct_decode,
        ct_check as dispatched_ct_check,
    };
}
