//! Backend dispatch layer.
//!
//! Selects the best available backend at compile time (and, for x86, at
//! runtime) and exposes a uniform internal API.
//!
//! ## Feature flag
//!
//! `force-generic` disables all SIMD and always uses the scalar backend.
//!
//! ## Dispatch order
//!
//! | Target          | Detection        | Priority                  |
//! |-----------------|------------------|---------------------------|
//! | aarch64 (NEON)  | compile-time     | baseline on aarch64       |
//! | x86/x86_64      | runtime (std) or `cpufeatures` (no_std) | AVX2 > SSSE3 > scalar |
//! | wasm32 (SIMD128)| compile-time     | when `target_feature="simd128"` |
//! | everything else | —                | scalar fallback           |
//!
//! The inner backend functions work with `MaybeUninit<u8>` output buffers
//! to avoid unnecessary zeroing.

pub mod scalar;
pub(crate) mod ct_scalar;

// Conditionally compile SIMD submodules.
#[cfg(all(
    not(feature = "force-generic"),
    target_arch = "aarch64",
    target_feature = "neon"
))]
pub(crate) mod neon;

#[cfg(all(
    not(feature = "force-generic"),
    any(target_arch = "x86", target_arch = "x86_64")
))]
pub(crate) mod x86;

#[cfg(all(
    not(feature = "force-generic"),
    target_arch = "wasm32",
    target_feature = "simd128"
))]
pub(crate) mod wasm;

use crate::error::Error;
use core::mem::MaybeUninit;

/// Encode `input` bytes as hex into an uninitialized `output` buffer.
///
/// After a successful return, all `output[..input.len() * 2]` elements are
/// initialized with valid hex ASCII bytes.
///
/// # Panics (debug only)
///
/// Panics if `output.len() != input.len() * 2`.
#[inline]
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    cfg_if::cfg_if! {
        if #[cfg(feature = "force-generic")] {
            scalar::encode::<UPPER>(input, output);
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::encode::<UPPER>(input, output);
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            // Runtime detection: prefer AVX2, then SSSE3, then scalar.
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx2") {
                        // SAFETY: we just confirmed AVX2 is available.
                        unsafe { x86::encode_avx2::<UPPER>(input, output) }
                    } else if std::is_x86_feature_detected!("ssse3") {
                        // SAFETY: we just confirmed SSSE3 is available.
                        unsafe { x86::encode_ssse3::<UPPER>(input, output) }
                    } else {
                        scalar::encode::<UPPER>(input, output);
                    }
                } else {
                    // no_std: use cpufeatures crate for runtime detection.
                    cpufeatures::new!(cpuid_avx2, "avx2");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx2 = cpuid_avx2::init();
                    if token_avx2.get() {
                        // SAFETY: we just confirmed AVX2 is available.
                        unsafe { x86::encode_avx2::<UPPER>(input, output) }
                    } else {
                        let token_ssse3 = cpuid_ssse3::init();
                        if token_ssse3.get() {
                            // SAFETY: we just confirmed SSSE3 is available.
                            unsafe { x86::encode_ssse3::<UPPER>(input, output) }
                        } else {
                            scalar::encode::<UPPER>(input, output);
                        }
                    }
                }
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::encode::<UPPER>(input, output);
        } else {
            scalar::encode::<UPPER>(input, output);
        }
    }
}

/// Decode hex `input` into `output`.
///
/// Returns `Ok(())` on success or `Err(InvalidChar { .. })` on the first
/// invalid hex character.
///
/// # Panics (debug only)
///
/// Panics if `output.len() != input.len() / 2` or input length is odd.
#[inline]
pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    cfg_if::cfg_if! {
        if #[cfg(feature = "force-generic")] {
            scalar::decode(input, output)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::decode(input, output)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx2") {
                        // SAFETY: we just confirmed AVX2 is available.
                        unsafe { x86::decode_avx2(input, output) }
                    } else if std::is_x86_feature_detected!("ssse3") {
                        // SAFETY: we just confirmed SSSE3 is available.
                        unsafe { x86::decode_ssse3(input, output) }
                    } else {
                        scalar::decode(input, output)
                    }
                } else {
                    cpufeatures::new!(cpuid_avx2, "avx2");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx2 = cpuid_avx2::init();
                    if token_avx2.get() {
                        // SAFETY: we just confirmed AVX2 is available.
                        unsafe { x86::decode_avx2(input, output) }
                    } else {
                        let token_ssse3 = cpuid_ssse3::init();
                        if token_ssse3.get() {
                            // SAFETY: we just confirmed SSSE3 is available.
                            unsafe { x86::decode_ssse3(input, output) }
                        } else {
                            scalar::decode(input, output)
                        }
                    }
                }
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::decode(input, output)
        } else {
            scalar::decode(input, output)
        }
    }
}

/// Check if every byte in `input` is a valid hex ASCII character.
#[inline]
pub(crate) fn check(input: &[u8]) -> bool {
    cfg_if::cfg_if! {
        if #[cfg(feature = "force-generic")] {
            scalar::check(input)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::check(input)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("ssse3") {
                        // SAFETY: we just confirmed SSSE3 is available.
                        unsafe { x86::check_ssse3(input) }
                    } else {
                        scalar::check(input)
                    }
                } else {
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_ssse3 = cpuid_ssse3::init();
                    if token_ssse3.get() {
                        // SAFETY: we just confirmed SSSE3 is available.
                        unsafe { x86::check_ssse3(input) }
                    } else {
                        scalar::check(input)
                    }
                }
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::check(input)
        } else {
            scalar::check(input)
        }
    }
}
