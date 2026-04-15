//! Valgrind-based constant-time verification.
//!
//! Calls backend functions directly (bypassing the dispatch `map_err`)
//! with poisoned input. Any data-dependent branch triggers a Valgrind error.
//!
//! Run with:
//! ```sh
//! cargo test --features ct-test --test ct_valgrind --release --no-run
//! valgrind --tool=memcheck --error-exitcode=1 --leak-check=no \
//!     target/release/deps/ct_valgrind-*
//! ```

#![cfg(feature = "ct-test")]

use crabgrind::memcheck;
use std::ffi::c_void;

use better_hex::bench_internals::{InvalidEncoding, scalar};

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

// ── Helpers ──────────────────────────────────────────────────────────────────

type EncodeFn = unsafe fn(*const u8, *mut u8, usize);
type DecodeFn = unsafe fn(*const u8, *mut u8, usize) -> Result<(), InvalidEncoding>;
type CheckFn = unsafe fn(&[u8]) -> bool;

/// Test that an encode function is CT for sizes 0..=512.
fn test_encode_ct(encode: EncodeFn) {
    for size in 0..=512 {
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let mut output = vec![0u8; size * 2];

        poison(&input);
        poison(&output);
        unsafe { encode(input.as_ptr(), output.as_mut_ptr(), size) };
    }
}

/// Test that a decode function is CT for valid inputs at sizes 0..=512.
fn test_decode_ct(decode: DecodeFn) {
    for size in 0..=512 {
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let hex = better_hex::encode_string(&input);
        let hex_bytes = hex.into_bytes();
        let mut output = vec![0u8; size];

        poison(&hex_bytes);
        poison(&output);
        let mut res = unsafe { decode(hex_bytes.as_ptr(), output.as_mut_ptr(), size) };
        unpoison(&mut res);
        res.unwrap();
    }
}

/// Test that a decode function processes all bytes (invalid at every position).
fn test_decode_invalid_ct(decode: DecodeFn) {
    for size in 1..=512 {
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let hex = better_hex::encode_string(&input);
        let valid_hex = hex.into_bytes();

        for corrupt_pos in 0..valid_hex.len() {
            let mut hex_bytes = valid_hex.clone();
            hex_bytes[corrupt_pos] = 0xFF;
            let mut output = vec![0u8; size];

            poison(&hex_bytes);
            poison(&output);
            let mut res = unsafe { decode(hex_bytes.as_ptr(), output.as_mut_ptr(), size) };
            unpoison(&mut res);
            res.unwrap_err();
        }
    }
}

/// Test that a check function is CT for sizes 0..=512.
fn test_check_ct(check: CheckFn) {
    for size in 0..=512 {
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let hex = better_hex::encode_string(&input);
        let hex_bytes = hex.into_bytes();

        poison(&hex_bytes);
        let mut valid = unsafe { check(&hex_bytes) };
        unpoison(&mut valid);
        assert!(valid, "check failed on valid input of size {}", size);
    }
}

#[test]
fn scalar_encode_lower() {
    test_encode_ct(scalar::encode::<false>);
}

#[test]
fn scalar_encode_upper() {
    test_encode_ct(scalar::encode::<true>);
}

#[test]
fn scalar_decode() {
    test_decode_ct(scalar::decode);
}

#[test]
fn scalar_decode_invalid() {
    test_decode_invalid_ct(scalar::decode);
}

#[test]
fn scalar_check() {
    test_check_ct(scalar::check);
}

#[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
mod neon_ct {
    use super::*;

    #[test]
    fn encode_lower() {
        test_encode_ct(neon::encode::<false>);
    }

    #[test]
    fn encode_upper() {
        test_encode_ct(neon::encode::<true>);
    }

    #[test]
    fn decode() {
        test_decode_ct(neon::decode);
    }

    #[test]
    fn decode_invalid() {
        test_decode_invalid_ct(neon::decode);
    }

    #[test]
    fn check() {
        test_check_ct(neon::check);
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
            test_encode_ct(x86::encode_ssse3::<false>);
        }
    }
    #[test]
    fn encode_upper() {
        if has_ssse3() {
            test_encode_ct(x86::encode_ssse3::<true>);
        }
    }
    #[test]
    fn decode() {
        if has_ssse3() {
            test_decode_ct(x86::decode_ssse3);
        }
    }
    #[test]
    fn decode_invalid() {
        if has_ssse3() {
            test_decode_invalid_ct(x86::decode_ssse3);
        }
    }
    #[test]
    fn check() {
        if has_ssse3() {
            test_check_ct(x86::check_ssse3);
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
            test_encode_ct(x86::encode_avx2::<false>);
        }
    }
    #[test]
    fn encode_upper() {
        if has_avx2() {
            test_encode_ct(x86::encode_avx2::<true>);
        }
    }
    #[test]
    fn decode() {
        if has_avx2() {
            test_decode_ct(x86::decode_avx2);
        }
    }
    #[test]
    fn decode_invalid() {
        if has_avx2() {
            test_decode_invalid_ct(x86::decode_avx2);
        }
    }
    #[test]
    fn check() {
        if has_avx2() {
            test_check_ct(x86::check_avx2);
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
            test_encode_ct(x86::encode_avx512::<false>);
        }
    }
    #[test]
    fn encode_upper() {
        if has_avx512vbmi() {
            test_encode_ct(x86::encode_avx512::<true>);
        }
    }
    #[test]
    fn decode() {
        if has_avx512bw() {
            test_decode_ct(x86::decode_avx512);
        }
    }
    #[test]
    fn decode_invalid() {
        if has_avx512bw() {
            test_decode_invalid_ct(x86::decode_avx512);
        }
    }
    #[test]
    fn check() {
        if has_avx512bw() {
            test_check_ct(x86::check_avx512);
        }
    }
}

/// Test HexStr operations with poisoned data at multiple sizes.
mod hex_str_ct {
    use super::*;
    use better_hex::HexStr;

    macro_rules! test_hex_str {
        ($n:literal) => {{
            let input: [u8; $n] = core::array::from_fn(|i| (i as u8).wrapping_mul(37));

            // from_hex: poison the hex bytes, construct HexStr.
            let mut hex = [0u8; $n * 2];
            better_hex::encode_to_slice(&input, &mut hex).unwrap();
            poison(&hex);
            let mut result = HexStr::<$n>::from_hex(hex);
            unpoison(&mut result);
            assert!(result.is_some(), "from_hex failed at N={}", $n);

            // const_from_hex: same but const path.
            poison(&hex);
            let mut result = HexStr::<$n>::const_from_hex(hex);
            unpoison(&mut result);
            assert!(result.is_some(), "const_from_hex failed at N={}", $n);

            // decode: poison the HexStr internals, decode back.
            let hex_str = HexStr::<$n>::encode_lower(&input);
            poison(hex_str.as_bytes());
            let mut decoded = hex_str.decode();
            unpoison(&mut decoded);
            assert_eq!(decoded, input, "decode mismatch at N={}", $n);
        }};
    }

    #[test]
    fn hex_str_ct() {
        test_hex_str!(1);
        test_hex_str!(2);
        test_hex_str!(4);
        test_hex_str!(8);
        test_hex_str!(16);
        test_hex_str!(32);
        test_hex_str!(64);
    }
}
