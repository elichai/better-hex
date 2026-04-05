//! Runtime platform detection with atomic caching.
//!
//! [`detect()`] returns the best available SIMD backend as a [`Platform`] enum
//! variant. The result is cached in an [`AtomicU8`] so subsequent calls are a
//! single relaxed load + branch.

use core::sync::atomic::{AtomicU8, Ordering};

/// Detected SIMD platform for backend dispatch.
///
/// Variants are `#[cfg]`-gated so only platforms reachable on the current
/// target exist. `Uninit` is the sentinel stored in the atomic before the
/// first detection.
#[repr(u8)]
#[derive(Clone, Copy, PartialEq, Eq)]
#[allow(dead_code)] // Scalar is constructed inside cfg_if which the lint can't see through.
pub(crate) enum Platform {
    /// Not yet detected. Discriminant **must** be 0 so the zero-initialized
    /// atomic starts in this state.
    Uninit = 0,
    Scalar,
    #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
    Neon,
    #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
    Ssse3,
    #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
    Avx2,
    #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
    Avx512bw,
    #[cfg(all(not(feature = "disable-simd"), target_arch = "wasm32", target_feature = "simd128"))]
    Wasm,
}

static CACHED: AtomicU8 = AtomicU8::new(Platform::Uninit as u8);
impl Platform {
    #[inline(always)]
    fn load() -> Self {
        // SAFETY: `CACHED` is initialized to `Uninit as u8` (== 0) and only
        // ever written by `store()` with a valid `Platform` discriminant.
        unsafe { core::mem::transmute::<u8, Self>(CACHED.load(Ordering::Relaxed)) }
    }
    #[inline(always)]
    fn store(self) {
        CACHED.store(self as u8, Ordering::Relaxed);
    }
}

/// Return the best available platform, caching the result in an atomic.
#[inline]
pub(crate) fn detect() -> Platform {
    let p = Platform::load();
    if p != Platform::Uninit {
        return p;
    }
    detect_cold()
}

#[cold]
#[inline(never)]
fn detect_cold() -> Platform {
    let p = detect_impl();
    p.store();
    p
}

fn detect_impl() -> Platform {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            Platform::Scalar
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            Platform::Neon
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            detect_x86()
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            Platform::Wasm
        } else {
            Platform::Scalar
        }
    }
}

#[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
fn detect_x86() -> Platform {
    cfg_if::cfg_if! {
        if #[cfg(feature = "std")] {
            if std::is_x86_feature_detected!("avx512bw") {
                Platform::Avx512bw
            } else if std::is_x86_feature_detected!("avx2") {
                Platform::Avx2
            } else if std::is_x86_feature_detected!("ssse3") {
                Platform::Ssse3
            } else {
                Platform::Scalar
            }
        } else {
            cpufeatures::new!(cpuid_avx512bw, "avx512bw");
            cpufeatures::new!(cpuid_avx2, "avx2");
            cpufeatures::new!(cpuid_ssse3, "ssse3");
            if cpuid_avx512bw::init().get() {
                Platform::Avx512bw
            } else if cpuid_avx2::init().get() {
                Platform::Avx2
            } else if cpuid_ssse3::init().get() {
                Platform::Ssse3
            } else {
                Platform::Scalar
            }
        }
    }
}
