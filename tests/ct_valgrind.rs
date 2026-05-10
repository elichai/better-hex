//! Valgrind-based constant-time verification.
//!
//! Calls backend `*_inner` functions directly with poisoned input, then
//! unpoisons the *raw error accumulator* before any comparison. The public
//! `*_inner` contract: returns 0 iff all input bytes are valid hex, nonzero
//! otherwise. The validity bit is the documented public CT scope (see the
//! README) — by unpoisoning the accumulator at the test boundary we declare
//! it observable, which lets memcheck flag *only* genuine content-dependent
//! branches inside the SIMD code paths.
//!
//! Run with:
//! ```sh
//! cargo test --features ct-test --test ct_valgrind --release --no-run
//! valgrind --tool=memcheck --error-exitcode=1 --leak-check=no \
//!     target/release/deps/ct_valgrind-*
//! ```

#![cfg(feature = "ct-test")]

use crabgrind::memcheck;
use rand_core::{Rng, SeedableRng};
use rand_xoshiro::Xoshiro256PlusPlus;
use std::ffi::c_void;
use std::fmt::Debug;

use better_hex::bench_internals::scalar;

#[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
use better_hex::bench_internals::neon;

#[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
use better_hex::bench_internals::x86;

fn poison(data: &[u8]) {
    memcheck::mark_memory(
        data.as_ptr().cast::<c_void>(),
        data.len(),
        memcheck::MemState::Undefined,
    )
    .unwrap_or(())
}

fn unpoison<T: ?Sized>(val: &mut T) {
    let len = std::mem::size_of_val(val);
    let ptr = val as *mut T as *mut c_void;
    memcheck::mark_memory(ptr, len, memcheck::MemState::Defined).unwrap_or(())
}

/// Test that an encode function is CT for sizes 0..=512.
#[inline(always)]
fn test_encode_ct(encode: unsafe fn(*const u8, *mut u8, usize, bool), upper: bool) {
    let mut rng = Xoshiro256PlusPlus::seed_from_u64(0xdeadbeaf);
    let mut input = Vec::with_capacity(512);
    let mut output = vec![0u8; 1024];
    for size in 0..=512 {
        input.resize(size, 0);
        rng.fill_bytes(&mut input);
        output.resize(size * 2, 0);
        poison(&input);
        poison(&output);
        unsafe {
            encode(input.as_ptr(), output.as_mut_ptr(), size, upper);
        }
    }
}

/// Test that a `decode_inner` is CT for valid inputs at sizes 0..=512.
///
/// Calls the inner directly; `decode_inner` returns the raw error accumulator
/// (`u8`/`i32`/`u64` depending on backend). We unpoison it, then assert
/// `accum == T::default()` (i.e. zero) — declaring the validity bit
/// observable while keeping the input-content bits poisoned.
#[inline(always)]
fn test_decode_ct<T>(decode: unsafe fn(*const u8, *mut u8, usize) -> T)
where
    T: PartialEq + Default + Copy + Debug,
{
    let mut rng = Xoshiro256PlusPlus::seed_from_u64(0xdeadbeaf);
    let mut input = Vec::with_capacity(512);
    let mut output = vec![0u8; 512];
    for size in 0..=512 {
        input.resize(size, 0);
        rng.fill_bytes(&mut input);
        let hex = better_hex::encode_string(&input);
        let hex_bytes = hex.into_bytes();
        output.resize(size, 0);

        poison(&hex_bytes);
        poison(&output);
        let mut accum = unsafe { decode(hex_bytes.as_ptr(), output.as_mut_ptr(), size) };
        unpoison(&mut accum);
        assert_eq!(
            accum,
            T::default(),
            "decode_inner reported error on valid input of size {size}"
        );
    }
}

/// Test that a `decode_inner` processes all bytes (invalid at every position).
#[inline(always)]
fn test_decode_invalid_ct<T>(decode: unsafe fn(*const u8, *mut u8, usize) -> T)
where
    T: PartialEq + Default + Copy + Debug,
{
    let mut rng = Xoshiro256PlusPlus::seed_from_u64(0xdeadbeaf);
    let mut input = Vec::with_capacity(512);
    let mut output = vec![0u8; 512];
    for size in 1..=512 {
        input.resize(size, 0);
        rng.fill_bytes(&mut input);
        let hex = better_hex::encode_string(&input);
        let valid_hex = hex.into_bytes();

        for corrupt_pos in 0..valid_hex.len() {
            let mut hex_bytes = valid_hex.clone();
            hex_bytes[corrupt_pos] = 0xFF;
            output.resize(size, 0);

            poison(&hex_bytes);
            poison(&output);
            let mut accum = unsafe { decode(hex_bytes.as_ptr(), output.as_mut_ptr(), size) };
            unpoison(&mut accum);
            assert_ne!(
                accum,
                T::default(),
                "decode_inner missed invalid byte at pos {corrupt_pos} (size {size})"
            );
        }
    }
}

/// Test that a `check_inner` is CT for sizes 0..=512.
fn test_check_ct<F, T>(check: F)
where
    F: Fn(&[u8]) -> T,
    T: PartialEq + Default + Copy + Debug,
{
    let mut rng = Xoshiro256PlusPlus::seed_from_u64(0xdeadbeaf);
    let mut input = Vec::with_capacity(512);
    for size in 0..=512 {
        input.resize(size, 0);
        rng.fill_bytes(&mut input);
        let hex = better_hex::encode_string(&input);
        let hex_bytes = hex.into_bytes();

        poison(&hex_bytes);
        let mut accum = check(&hex_bytes);
        unpoison(&mut accum);
        assert_eq!(
            accum,
            T::default(),
            "check_inner reported error on valid input of size {size}"
        );
    }
}

/// Test that a `check_inner` processes all bytes (invalid at every position).
///
/// A short-circuit implementation that returns on the first invalid byte
/// would leak the position via timing, and Valgrind would flag the branch
/// on poisoned data.
#[inline(always)]
fn test_check_invalid_ct<T>(check: unsafe fn(&[u8]) -> T)
where
    T: PartialEq + Default + Copy + Debug,
{
    let mut rng = Xoshiro256PlusPlus::seed_from_u64(0xdeadbeaf);
    let mut input = Vec::with_capacity(512);
    for size in 1..=512 {
        input.resize(size, 0);
        rng.fill_bytes(&mut input);
        let hex = better_hex::encode_string(&input);
        let valid_hex = hex.into_bytes();

        for corrupt_pos in 0..valid_hex.len() {
            let mut hex_bytes = valid_hex.clone();
            hex_bytes[corrupt_pos] = 0xFF;

            poison(&hex_bytes);
            let mut accum = unsafe { check(&hex_bytes) };
            unpoison(&mut accum);
            assert_ne!(
                accum,
                T::default(),
                "check_inner accepted invalid byte at pos {corrupt_pos} (size {size})"
            );
        }
    }
}

#[test]
fn scalar_encode_lower() {
    test_encode_ct(scalar::encode, false);
}

#[test]
fn scalar_encode_upper() {
    test_encode_ct(scalar::encode, true);
}

#[test]
fn scalar_decode() {
    test_decode_ct(scalar::decode_inner);
}

#[test]
fn scalar_decode_invalid() {
    test_decode_invalid_ct(scalar::decode_inner);
}

#[test]
fn scalar_check() {
    test_check_ct(scalar::check_inner);
}

#[test]
fn scalar_check_invalid() {
    test_check_invalid_ct(scalar::check_inner);
}

#[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
mod neon_ct {
    use super::*;

    #[test]
    fn encode_lower() {
        test_encode_ct(neon::encode, false);
    }

    #[test]
    fn encode_upper() {
        test_encode_ct(neon::encode, true);
    }

    #[test]
    fn decode() {
        test_decode_ct(neon::decode_inner);
    }

    #[test]
    fn decode_invalid() {
        test_decode_invalid_ct(neon::decode_inner);
    }

    #[test]
    fn check() {
        test_check_ct(neon::check_inner);
    }

    #[test]
    fn check_invalid() {
        test_check_invalid_ct(neon::check_inner);
    }
}

#[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
mod ssse3_ct {
    use super::*;

    fn has_ssse3() -> bool {
        std::is_x86_feature_detected!("ssse3")
    }

    #[test]
    fn encode_lower() {
        if has_ssse3() {
            test_encode_ct(x86::encode_ssse3, false);
        }
    }
    #[test]
    fn encode_upper() {
        if has_ssse3() {
            test_encode_ct(x86::encode_ssse3, true);
        }
    }
    #[test]
    fn decode() {
        if has_ssse3() {
            test_decode_ct(x86::decode_ssse3_inner);
        }
    }
    #[test]
    fn decode_invalid() {
        if has_ssse3() {
            test_decode_invalid_ct(x86::decode_ssse3_inner);
        }
    }
    #[test]
    fn check() {
        if has_ssse3() {
            test_check_ct(x86::check_ssse3_inner);
        }
    }
    #[test]
    fn check_invalid() {
        if has_ssse3() {
            test_check_invalid_ct(x86::check_ssse3_inner);
        }
    }
}

#[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
mod avx2_ct {
    use super::*;

    fn has_avx2() -> bool {
        std::is_x86_feature_detected!("avx2")
    }

    #[test]
    fn encode_lower() {
        if has_avx2() {
            test_encode_ct(x86::encode_avx2, false);
        }
    }
    #[test]
    fn encode_upper() {
        if has_avx2() {
            test_encode_ct(x86::encode_avx2, true);
        }
    }
    #[test]
    fn decode() {
        if has_avx2() {
            test_decode_ct(x86::decode_avx2_inner);
        }
    }
    #[test]
    fn decode_invalid() {
        if has_avx2() {
            test_decode_invalid_ct(x86::decode_avx2_inner);
        }
    }
    #[test]
    fn check() {
        if has_avx2() {
            test_check_ct(x86::check_avx2_inner);
        }
    }
    #[test]
    fn check_invalid() {
        if has_avx2() {
            test_check_invalid_ct(x86::check_avx2_inner);
        }
    }
}

#[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
mod avx512_ct {
    use super::*;

    fn has_avx512bw() -> bool {
        std::is_x86_feature_detected!("avx512bw")
    }
    fn has_avx512vbmi() -> bool {
        std::is_x86_feature_detected!("avx512vbmi")
    }

    #[test]
    fn encode_lower() {
        if has_avx512vbmi() {
            test_encode_ct(x86::encode_avx512, false);
        }
    }
    #[test]
    fn encode_upper() {
        if has_avx512vbmi() {
            test_encode_ct(x86::encode_avx512, true);
        }
    }
    #[test]
    fn decode() {
        if has_avx512bw() {
            test_decode_ct(x86::decode_avx512_inner);
        }
    }
    #[test]
    fn decode_invalid() {
        if has_avx512bw() {
            test_decode_invalid_ct(x86::decode_avx512_inner);
        }
    }
    #[test]
    fn check() {
        if has_avx512bw() {
            test_check_ct(x86::check_avx512_inner);
        }
    }
    #[test]
    fn check_invalid() {
        if has_avx512bw() {
            test_check_invalid_ct(x86::check_avx512_inner);
        }
    }
}

/// Test HexStr operations with poisoned data at multiple sizes.
///
/// `HexStr::from_hex` returns `Option<HexStr<N>>` whose discriminant *is* the
/// validity bit — making it a publicly-observable result of the operation
/// (per the CT scope documented in the README). We therefore exercise
/// validation via `check` / `const_check`, unpoison the resulting bool
/// (declaring the validity bit observable), and only then perform the
/// unchecked `HexStr` construction. `HexStr::decode` is exercised directly:
/// its internal `Result` is discarded behind `unwrap_unchecked`, which lets
/// the compiler eliminate the residual discriminant branch.
mod hex_str_ct {
    use super::*;
    use better_hex::HexStr;

    macro_rules! test_hex_str {
        ($rng:ident, $n:literal) => {{
            let mut input = [0u8; $n];
            $rng.fill_bytes(&mut input);

            // SIMD-dispatched `check` is CT for valid hex: poison hex,
            // unpoison only the resulting validity bit before any conditional.
            let mut hex = [0u8; $n * 2];
            better_hex::encode_to_slice(&input, &mut hex).unwrap();
            poison(&hex);
            let mut valid = better_hex::check(&hex);
            unpoison(&mut valid);
            assert!(valid, "check failed at N={}", $n);
            // SAFETY: `hex` was just produced by `encode_to_slice`, valid hex ASCII.
            let _: HexStr<$n> = unsafe { HexStr::<$n>::from_hex_unchecked(hex) };

            // const_check goes through the scalar branchless path.
            poison(&hex);
            let mut valid = better_hex::const_check(&hex);
            unpoison(&mut valid);
            assert!(valid, "const_check failed at N={}", $n);

            // decode: poison the HexStr internals, decode back.
            // HexStr::decode uses unwrap_unchecked internally so the residual
            // dispatch discriminant check is eliminated by the optimizer.
            let hex_str = HexStr::<$n>::encode_lower(&input);
            poison(hex_str.as_bytes());
            let mut decoded = hex_str.decode();
            unpoison(&mut decoded);
            assert_eq!(decoded, input, "decode mismatch at N={}", $n);
        }};
    }

    #[test]
    fn hex_str_ct() {
        let mut rng = Xoshiro256PlusPlus::seed_from_u64(0xdeadbeaf);
        test_hex_str!(rng, 1);
        test_hex_str!(rng, 2);
        test_hex_str!(rng, 4);
        test_hex_str!(rng, 8);
        test_hex_str!(rng, 16);
        test_hex_str!(rng, 32);
        test_hex_str!(rng, 64);
    }
}
