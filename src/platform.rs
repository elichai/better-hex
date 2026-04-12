//! Platform detection for backend dispatch.
//!
//! [`detect()`] returns the best available SIMD backend as a [`Platform`] enum
//! variant.
//!
//! On targets where the SIMD level is known at compile time (aarch64+NEON,
//! wasm32+simd128, x86+avx512bw, or `disable-simd`), `detect()` returns a
//! constant — no atomic load, no branch. Only x86/x86_64 without a
//! compile-time-known top-tier feature falls through to runtime CPUID,
//! cached in an [`AtomicU8`].

/// Detected SIMD platform for backend dispatch.
///
/// Variants are `#[cfg]`-gated so only platforms reachable on the current
/// target exist.
#[repr(u8)]
#[derive(Clone, Copy, PartialEq, Eq)]
#[allow(dead_code)] // Scalar is constructed inside cfg_if which the lint can't see through.
pub(crate) enum Platform {
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

/// Return the best available platform.
///
/// On platforms where the SIMD level is known at compile time (aarch64+NEON,
/// wasm32+simd128, x86+avx512bw, or `disable-simd`), this returns a constant
/// with zero runtime overhead — no atomic load, no branch.
///
/// Only x86/x86_64 without compile-time avx512bw goes through the cached
/// atomic path (CPUID on first call, then a single relaxed load thereafter).
#[inline(always)]
pub(crate) fn detect() -> Platform {
    cfg_if::cfg_if! {
        if #[cfg(feature = "disable-simd")] {
            Platform::Scalar
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            Platform::Neon
        } else if #[cfg(all(
            any(target_arch = "x86", target_arch = "x86_64"),
            target_feature = "avx512bw",
        ))] {
            // Highest x86 tier known at compile time — nothing higher to probe.
            Platform::Avx512bw
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            runtime::detect()
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            Platform::Wasm
        } else {
            Platform::Scalar
        }
    }
}

/// Runtime detection machinery (x86/x86_64 only, when CPUID is needed)
#[cfg(all(
    not(feature = "disable-simd"),
    any(target_arch = "x86", target_arch = "x86_64"),
    not(target_feature = "avx512bw"),
))]
mod runtime {
    use super::Platform;
    use core::sync::atomic::{AtomicU8, Ordering};

    type CachedPlatform = Option<Platform>;

    const fn cached_platform_to_u8(p: CachedPlatform) -> u8 {
        // SAFETY: `CachedPlatform` is `Option<Platform>`, and `Platform` is `#[repr(u8)]` with valid discriminants.
        // This will fail compilation if `Option<Platform>` ever has a non-`u8` representation
        unsafe { core::mem::transmute::<CachedPlatform, u8>(p) }
    }
    // SAFETY: Requires that `v` is only ever written by `cached_platform_to_u8` with valid `CachedPlatform` values
    const unsafe fn u8_to_cached_platform(v: u8) -> CachedPlatform {
        // SAFETY: `v` is only ever written by `cached_platform_to_u8` with valid `CachedPlatform` values.
        // This will fail compilation if `Option<Platform>` ever has a non-`u8` representation
        unsafe { core::mem::transmute::<u8, CachedPlatform>(v) }
    }

    static CACHED: AtomicU8 = AtomicU8::new(cached_platform_to_u8(None));

    /// Cached runtime CPUID detection. First call probes and caches;
    /// subsequent calls are a single relaxed atomic load.
    #[inline(always)]
    pub(super) fn detect() -> Platform {
        // SAFETY: `CACHED` is initialized to `None` and only ever written by `detect_impl()` with a valid `Platform` discriminant.
        let p = unsafe { u8_to_cached_platform(CACHED.load(Ordering::Relaxed)) };
        if let Some(p) = p {
            return p;
        }
        let p = detect_impl();
        CACHED.store(cached_platform_to_u8(Some(p)), Ordering::Relaxed);
        p
    }

    #[cold]
    #[inline(never)]
    fn detect_impl() -> Platform {
        // avx512bw at compile time is handled in detect() directly.
        // Lower compile-time tiers (avx2, ssse3) still need runtime probes
        // because a higher tier might be available on the actual CPU.
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
}
