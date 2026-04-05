#![no_std]
#![warn(missing_docs)]
//! Fast hex encoding/decoding with SIMD, `const fn`, and constant-time support.
//!
//! # Features
//!
//! - **SIMD** — x86 (SSSE3/AVX2/AVX-512BW), AArch64 (NEON), WASM (SIMD128)
//! - **`const fn`** — compile-time encode, decode, and validation
//! - **Stack strings** — [`HexStr<N>`][HexStr] with zero heap allocation
//! - **Constant-time** — branchless scalar and SIMD paths in [`ct`]
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
//!   branchless arithmetic for the `ct_scalar` backend:
//!   <https://tobtu.com/dectobase16ct.php>

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
mod maybe_uninit;
mod prefix;
mod traits;
mod platform;

#[cfg(feature = "serde")]
#[doc(hidden)]
pub mod serde_impl;

#[cfg(feature = "serde")]
#[doc(inline)]
pub use serde_impl as serde;

pub use decode::{check, decode, decode_to_slice};
pub use display::{HexDisplay, display};
pub use encode::{encode, encode_to_slice, encode_to_slice_upper, encode_upper};
#[cfg(feature = "alloc")]
pub use encode::encode_string;
pub use error::Error;
pub use hex_str::{HexStr, const_check, const_decode_to_array};
pub use prefix::{NoPrefix, Prefix, WithPrefix};
pub use traits::{FromHex, HexTarget, ToHex};

/// A [`HexStr`] with a `"0x"` prefix.
pub type PrefixedHexStr<const N: usize> = HexStr<N, WithPrefix>;

/// Backend internals for benchmarks and fuzz targets.
#[doc(hidden)]
pub mod bench_internals {
    pub use crate::backend::{ct_scalar, scalar};

    #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
    pub use crate::backend::neon;

    #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
    pub use crate::backend::x86;

    #[cfg(all(not(feature = "disable-simd"), target_arch = "wasm32", target_feature = "simd128"))]
    pub use crate::backend::wasm;

    pub use crate::backend::{
        check as dispatched_check, ct_check as dispatched_ct_check, ct_decode as dispatched_ct_decode,
        ct_encode as dispatched_ct_encode, decode as dispatched_decode, encode as dispatched_encode,
    };
}
