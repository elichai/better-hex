#![no_std]
#![warn(missing_docs)]
//! Fast, constant-time hex encoding and decoding with SIMD and `const fn`.
//!
//! # Features
//!
//! - **Constant-time** — all operations use branchless arithmetic w.r.t. input data values
//! - **SIMD** — x86 (SSSE3/AVX2/AVX-512BW/AVX-512 VBMI), AArch64 (NEON), WASM (SIMD128)
//! - **`const fn`** — compile-time encode, decode, and validation via
//!   [`HexStr::const_encode_lower`] / [`const_encode_upper`][HexStr::const_encode_upper] /
//!   [`const_from_hex`][HexStr::const_from_hex] / [`const_decode`][HexStr::const_decode],
//!   plus the free functions [`const_decode_to_array`] and [`const_check`]
//! - **Stack strings** — [`HexStr<N>`][HexStr] with zero heap allocation
//! - **Extensible** — [`HexTarget`] trait for custom output types
//!
//! # Acknowledgments
//!
//! Algorithms and API design draw from the following sources:
//!
//! - **[const-hex](https://github.com/danipopes/const-hex)** (DaniPopes) — SSSE3/AVX2 SIMD
//!   encode; `const fn` encode; stack-hex buffer design — MIT OR Apache-2.0
//! - **[faster-hex](https://github.com/nervosnetwork/faster-hex)** (Nervos Foundation) —
//!   x86 `pshufb` nibble-LUT encode — MIT
//! - **[hex](https://github.com/KokaKiwi/rust-hex)** (KokaKiwi) — `FromHex`/`ToHex` trait
//!   API; scalar decode LUT — MIT OR Apache-2.0
//! - **[base16ct](https://github.com/RustCrypto/formats/tree/master/base16ct)** (RustCrypto) —
//!   constant-time scalar arithmetic (Steve "Sc00bz" Thomas's ConstTimeEncoding) — MIT OR
//!   Apache-2.0
//! - **[hex-conservative](https://github.com/rust-bitcoin/hex-conservative)** (rust-bitcoin) —
//!   `no_std` display formatting patterns — CC0 1.0
//! - **[data-encoding](https://github.com/ia0/data-encoding)** (Julien Cretin) —
//!   allocation-free / `no_std` encoding design — MIT
//!
//! Algorithm references:
//! - Daniel Lemire, "Fast hexadecimal decoding" (2023) —
//!   subtract-1 + `pshufb` classification used in the x86 decode path:
//!   <https://lemire.me/blog/2023/12/22/fast-hexadecimal-decoding/>
//! - Wojciech Muła & Daniel Langdale — SIMD nibble-decode (min-of-two-paths)
//!   used in the NEON and WASM decode backends
//! - Steve "Sc00bz" Thomas, ConstTimeEncoding —
//!   branchless arithmetic for the scalar backend:
//!   <https://tobtu.com/dectobase16ct.php>

#[cfg(any(feature = "alloc", test))]
extern crate alloc;

#[cfg(feature = "std")]
extern crate std;

mod backend;
mod decode;
mod display;
mod encode;
mod error;
mod hex_str;
mod maybe_uninit;
mod platform;
mod prefix;
mod traits;

#[cfg(feature = "serde")]
#[doc(hidden)]
pub mod serde_impl;

#[cfg(feature = "serde")]
#[doc(inline)]
pub use serde_impl as serde;

pub use decode::{check, decode, decode_to_slice};
pub use display::{HexDisplay, display};
#[cfg(feature = "alloc")]
pub use encode::encode_string;
pub use encode::{encode, encode_to_slice, encode_to_slice_upper, encode_upper};
pub use error::Error;
pub use hex_str::{HexStr, const_check, const_decode_to_array};
pub use prefix::{NoPrefix, Prefix, WithPrefix};
pub use traits::{FromHex, HexTarget, ToHex};

/// A [`HexStr`] with a `"0x"` prefix.
pub type PrefixedHexStr<const N: usize> = HexStr<N, WithPrefix>;

/// Backend internals for benchmarks and fuzz targets.
///
/// Not part of the public API — semver-exempt. Only available when
/// the `_bench_internals` feature is enabled.
#[cfg(feature = "_bench_internals")]
#[doc(hidden)]
pub mod bench_internals {
    pub use crate::backend::{InvalidEncoding, scalar};

    #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
    pub use crate::backend::neon;

    #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
    pub use crate::backend::x86;

    #[cfg(all(not(feature = "disable-simd"), target_arch = "wasm32", target_feature = "simd128"))]
    pub use crate::backend::wasm;

    pub use crate::backend::{check as dispatched_check, decode as dispatched_decode, encode as dispatched_encode};
}
