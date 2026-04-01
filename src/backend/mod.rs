//! Backend dispatch layer.
//!
//! Selects the best available backend at compile time (and, for x86, at
//! runtime) and exposes a uniform internal API.
//!
//! ## Feature flag
//!
//! `disable-simd` disables all SIMD and always uses the scalar backend.
//!
//! ## Dispatch order
//!
//! | Target          | Detection        | Priority                  |
//! |-----------------|------------------|---------------------------|
//! | aarch64 (NEON)  | compile-time     | baseline on aarch64       |
//! | x86/x86_64      | runtime (std) or `cpufeatures` (no_std) | AVX-512BW > AVX2 > SSSE3 > scalar |
//! | wasm32 (SIMD128)| compile-time     | when `target_feature="simd128"` |
//! | everything else | —                | scalar fallback           |
//!
//! The inner backend functions work with `MaybeUninit<u8>` output buffers
//! to avoid unnecessary zeroing.

pub mod ct_scalar;
pub mod scalar;

// Conditionally compile SIMD submodules.
#[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
pub mod neon;

#[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
pub mod x86;

#[cfg(all(not(feature = "disable-simd"), target_arch = "wasm32", target_feature = "simd128"))]
pub mod wasm;

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
pub fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            scalar::encode::<UPPER>(input, output);
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::encode::<UPPER>(input, output);
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            // Runtime detection: prefer AVX-512BW, then AVX2, then SSSE3, then scalar.
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx512bw") {
                        // SAFETY: we just confirmed AVX-512BW is available.
                        unsafe { x86::encode_avx512::<UPPER>(input, output) }
                    } else if std::is_x86_feature_detected!("avx2") {
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
                    cpufeatures::new!(cpuid_avx512bw, "avx512bw");
                    cpufeatures::new!(cpuid_avx2, "avx2");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx512bw = cpuid_avx512bw::init();
                    if token_avx512bw.get() {
                        // SAFETY: we just confirmed AVX-512BW is available.
                        unsafe { x86::encode_avx512::<UPPER>(input, output) }
                    } else {
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
pub fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            scalar::decode(input, output)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::decode(input, output)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx512bw") {
                        // SAFETY: we just confirmed AVX-512BW is available.
                        unsafe { x86::decode_avx512(input, output) }
                    } else if std::is_x86_feature_detected!("avx2") {
                        // SAFETY: we just confirmed AVX2 is available.
                        unsafe { x86::decode_avx2(input, output) }
                    } else if std::is_x86_feature_detected!("ssse3") {
                        // SAFETY: we just confirmed SSSE3 is available.
                        unsafe { x86::decode_ssse3(input, output) }
                    } else {
                        scalar::decode(input, output)
                    }
                } else {
                    cpufeatures::new!(cpuid_avx512bw, "avx512bw");
                    cpufeatures::new!(cpuid_avx2, "avx2");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx512bw = cpuid_avx512bw::init();
                    if token_avx512bw.get() {
                        // SAFETY: we just confirmed AVX-512BW is available.
                        unsafe { x86::decode_avx512(input, output) }
                    } else {
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
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::decode(input, output)
        } else {
            scalar::decode(input, output)
        }
    }
}

/// Constant-time encode. SIMD encode is already CT (register LUT, no
/// memory-indexed lookups). Only the scalar fallback differs: `ct_scalar`
/// uses branchless arithmetic instead of a lookup table.
#[inline]
pub fn ct_encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            ct_scalar::encode::<UPPER>(input, output);
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::encode::<UPPER>(input, output);
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx512bw") {
                        unsafe { x86::encode_avx512::<UPPER>(input, output) }
                    } else if std::is_x86_feature_detected!("avx2") {
                        unsafe { x86::encode_avx2::<UPPER>(input, output) }
                    } else if std::is_x86_feature_detected!("ssse3") {
                        unsafe { x86::encode_ssse3::<UPPER>(input, output) }
                    } else {
                        ct_scalar::encode::<UPPER>(input, output);
                    }
                } else {
                    cpufeatures::new!(cpuid_avx512bw, "avx512bw");
                    cpufeatures::new!(cpuid_avx2, "avx2");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx512bw = cpuid_avx512bw::init();
                    if token_avx512bw.get() {
                        unsafe { x86::encode_avx512::<UPPER>(input, output) }
                    } else {
                        let token_avx2 = cpuid_avx2::init();
                        if token_avx2.get() {
                            unsafe { x86::encode_avx2::<UPPER>(input, output) }
                        } else {
                            let token_ssse3 = cpuid_ssse3::init();
                            if token_ssse3.get() {
                                unsafe { x86::encode_ssse3::<UPPER>(input, output) }
                            } else {
                                ct_scalar::encode::<UPPER>(input, output);
                            }
                        }
                    }
                }
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::encode::<UPPER>(input, output);
        } else {
            ct_scalar::encode::<UPPER>(input, output);
        }
    }
}

/// Constant-time decode. Uses CT SIMD variants (no early return, error
/// accumulation) with `ct_scalar` as the scalar fallback.
/// Returns `Error::InvalidEncoding` (not `InvalidChar`) on failure.
#[inline]
pub fn ct_decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            ct_scalar::decode(input, output)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::ct_decode(input, output)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx512bw") {
                        unsafe { x86::ct_decode_avx512(input, output) }
                    } else if std::is_x86_feature_detected!("avx2") {
                        unsafe { x86::ct_decode_avx2(input, output) }
                    } else if std::is_x86_feature_detected!("ssse3") {
                        unsafe { x86::ct_decode_ssse3(input, output) }
                    } else {
                        ct_scalar::decode(input, output)
                    }
                } else {
                    cpufeatures::new!(cpuid_avx512bw, "avx512bw");
                    cpufeatures::new!(cpuid_avx2, "avx2");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx512bw = cpuid_avx512bw::init();
                    if token_avx512bw.get() {
                        unsafe { x86::ct_decode_avx512(input, output) }
                    } else {
                        let token_avx2 = cpuid_avx2::init();
                        if token_avx2.get() {
                            unsafe { x86::ct_decode_avx2(input, output) }
                        } else {
                            let token_ssse3 = cpuid_ssse3::init();
                            if token_ssse3.get() {
                                unsafe { x86::ct_decode_ssse3(input, output) }
                            } else {
                                ct_scalar::decode(input, output)
                            }
                        }
                    }
                }
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::ct_decode(input, output)
        } else {
            ct_scalar::decode(input, output)
        }
    }
}

/// Constant-time check. Uses CT SIMD variants (no early return) with
/// `ct_scalar` as the scalar fallback.
#[inline]
pub fn ct_check(input: &[u8]) -> bool {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            ct_scalar::check(input)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::ct_check(input)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx512bw") {
                        unsafe { x86::ct_check_avx512(input) }
                    } else if std::is_x86_feature_detected!("ssse3") {
                        unsafe { x86::ct_check_ssse3(input) }
                    } else {
                        ct_scalar::check(input)
                    }
                } else {
                    cpufeatures::new!(cpuid_avx512bw, "avx512bw");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx512bw = cpuid_avx512bw::init();
                    if token_avx512bw.get() {
                        unsafe { x86::ct_check_avx512(input) }
                    } else {
                        let token_ssse3 = cpuid_ssse3::init();
                        if token_ssse3.get() {
                            unsafe { x86::ct_check_ssse3(input) }
                        } else {
                            ct_scalar::check(input)
                        }
                    }
                }
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::ct_check(input)
        } else {
            ct_scalar::check(input)
        }
    }
}

/// Check if every byte in `input` is a valid hex ASCII character.
#[inline]
pub fn check(input: &[u8]) -> bool {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            scalar::check(input)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::check(input)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            cfg_if::cfg_if! {
                if #[cfg(feature = "std")] {
                    if std::is_x86_feature_detected!("avx512bw") {
                        // SAFETY: we just confirmed AVX-512BW is available.
                        unsafe { x86::check_avx512(input) }
                    } else if std::is_x86_feature_detected!("ssse3") {
                        // SAFETY: we just confirmed SSSE3 is available.
                        unsafe { x86::check_ssse3(input) }
                    } else {
                        scalar::check(input)
                    }
                } else {
                    cpufeatures::new!(cpuid_avx512bw, "avx512bw");
                    cpufeatures::new!(cpuid_ssse3, "ssse3");
                    let token_avx512bw = cpuid_avx512bw::init();
                    if token_avx512bw.get() {
                        // SAFETY: we just confirmed AVX-512BW is available.
                        unsafe { x86::check_avx512(input) }
                    } else {
                        let token_ssse3 = cpuid_ssse3::init();
                        if token_ssse3.get() {
                            // SAFETY: we just confirmed SSSE3 is available.
                            unsafe { x86::check_ssse3(input) }
                        } else {
                            scalar::check(input)
                        }
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
