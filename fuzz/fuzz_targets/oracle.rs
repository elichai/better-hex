#![cfg_attr(not(miri), no_main)]

#[cfg(miri)]
mod miri_replay;

mod oracle_support;

use better_hex::bench_internals::{dispatched_check, dispatched_decode, dispatched_encode, scalar};
use libfuzzer_sys::fuzz_target;
use oracle_support::{
    assert_decode_matches, assert_encode_matches, is_hex_ascii, naive_decode, naive_encode, scalar_decode,
    scalar_encode,
};

fuzz_target!(|data: &[u8]| {
    let expected_lower = naive_encode(data, false);
    let expected_upper = naive_encode(data, true);

    assert_encode_matches("scalar lower", data, &expected_lower, false, scalar_encode);
    assert_encode_matches("scalar upper", data, &expected_upper, true, scalar_encode);
    assert_encode_matches("dispatched lower", data, &expected_lower, false, |d, o, u| {
        dispatched_encode(d, o, u).unwrap();
    });
    assert_encode_matches("dispatched upper", data, &expected_upper, true, |d, o, u| {
        dispatched_encode(d, o, u).unwrap();
    });

    // Backend check functions validate character class only; public length checks live in api.rs.
    let all_hex = is_hex_ascii(data);
    assert_eq!(scalar::check(data), all_hex, "scalar check disagrees");
    assert_eq!(dispatched_check(data), all_hex, "dispatched check disagrees");

    // Per-backend fuzzing: run every tier the host CPU actually supports.
    // Without this, only the single top-tier backend gets exercised — a
    // regression in SSSE3 on an AVX-512 host would stay hidden.
    #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
    {
        use better_hex::bench_internals::x86;
        if std::is_x86_feature_detected!("ssse3") {
            assert_encode_matches("ssse3 lower", data, &expected_lower, false, |d, o, u| unsafe {
                x86::encode_ssse3(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
            });
            assert_encode_matches("ssse3 upper", data, &expected_upper, true, |d, o, u| unsafe {
                x86::encode_ssse3(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
            });
            assert_eq!(unsafe { x86::check_ssse3(data) }, all_hex, "ssse3 check disagrees");
        }
        if std::is_x86_feature_detected!("avx2") {
            assert_encode_matches("avx2 lower", data, &expected_lower, false, |d, o, u| unsafe {
                x86::encode_avx2(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
            });
            assert_encode_matches("avx2 upper", data, &expected_upper, true, |d, o, u| unsafe {
                x86::encode_avx2(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
            });
            assert_eq!(unsafe { x86::check_avx2(data) }, all_hex, "avx2 check disagrees");
        }
        if std::is_x86_feature_detected!("avx512bw") {
            assert_eq!(unsafe { x86::check_avx512(data) }, all_hex, "avx512 check disagrees");
        }
        if std::is_x86_feature_detected!("avx512vbmi") {
            assert_encode_matches("avx512 lower", data, &expected_lower, false, |d, o, u| unsafe {
                x86::encode_avx512(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
            });
            assert_encode_matches("avx512 upper", data, &expected_upper, true, |d, o, u| unsafe {
                x86::encode_avx512(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
            });
        }
    }
    #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
    {
        use better_hex::bench_internals::neon;
        assert_encode_matches("neon lower", data, &expected_lower, false, |d, o, u| unsafe {
            neon::encode(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
        });
        assert_encode_matches("neon upper", data, &expected_upper, true, |d, o, u| unsafe {
            neon::encode(d.as_ptr(), o.as_mut_ptr().cast(), d.len(), u);
        });
        assert_eq!(neon::check(data), all_hex, "neon check disagrees");
    }

    // Decode: only on even-length inputs
    if data.len() % 2 != 0 {
        return;
    }

    let naive_result = naive_decode(data);

    assert_decode_matches("scalar", data, &naive_result, scalar_decode);
    assert_decode_matches("dispatched", data, &naive_result, dispatched_decode);

    #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
    {
        use better_hex::bench_internals::x86;
        if std::is_x86_feature_detected!("ssse3") {
            assert_decode_matches("ssse3", data, &naive_result, |hex, out| unsafe {
                x86::decode_ssse3(hex.as_ptr(), out.as_mut_ptr().cast(), out.len())
                    .map_err(|_| better_hex::Error::InvalidEncoding)
            });
        }
        if std::is_x86_feature_detected!("avx2") {
            assert_decode_matches("avx2", data, &naive_result, |hex, out| unsafe {
                x86::decode_avx2(hex.as_ptr(), out.as_mut_ptr().cast(), out.len())
                    .map_err(|_| better_hex::Error::InvalidEncoding)
            });
        }
        if std::is_x86_feature_detected!("avx512bw") {
            assert_decode_matches("avx512", data, &naive_result, |hex, out| unsafe {
                x86::decode_avx512(hex.as_ptr(), out.as_mut_ptr().cast(), out.len())
                    .map_err(|_| better_hex::Error::InvalidEncoding)
            });
        }
    }
    #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
    {
        use better_hex::bench_internals::neon;
        assert_decode_matches("neon", data, &naive_result, |hex, out| unsafe {
            neon::decode(hex.as_ptr(), out.as_mut_ptr().cast(), out.len())
                .map_err(|_| better_hex::Error::InvalidEncoding)
        });
    }
});

#[cfg(miri)]
fn main() {
    miri_replay::replay("corpus/oracle");
}
