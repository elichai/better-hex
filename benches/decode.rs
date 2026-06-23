#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{dispatched_decode, scalar};
#[cfg(feature = "_bench_internals")]
use criterion::{BenchmarkId, Throughput};
use criterion::{Criterion, criterion_group, criterion_main};
#[cfg(feature = "_bench_internals")]
use std::hint::black_box;
#[cfg(feature = "_bench_internals")]
mod common;

#[cfg(feature = "_bench_internals")]
fn bench_decode(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new_hex(size);
        let mut output: Vec<u8> = vec![0; size];

        // Throughput is measured in *input* (hex) bytes to match `check.rs`
        // so GB/s figures are directly comparable between decode and check.
        group.throughput(Throughput::Bytes((size * 2) as u64));

        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            b.iter(|| {
                let input = black_box(bufs.next());
                let out = black_box(&mut output);
                assert!(unsafe { scalar::decode(input.as_ptr(), out.as_mut_ptr(), out.len()) }.to_bool_vartime());
            })
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            b.iter(|| {
                let input = black_box(bufs.next());
                let out = black_box(&mut output);
                assert!(
                    unsafe { better_hex::bench_internals::neon::decode(input.as_ptr(), out.as_mut_ptr(), out.len()) }
                        .to_bool_vartime()
                );
            })
        });

        #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
        {
            use better_hex::bench_internals::x86;
            if std::is_x86_feature_detected!("ssse3") {
                group.bench_function(BenchmarkId::new("ssse3", size), |b| {
                    b.iter(|| {
                        let input = black_box(bufs.next());
                        let out = black_box(&mut output);
                        assert!(
                            unsafe { x86::decode_ssse3(input.as_ptr(), out.as_mut_ptr(), out.len()) }.to_bool_vartime()
                        );
                    })
                });
            }
            if std::is_x86_feature_detected!("avx2") {
                group.bench_function(BenchmarkId::new("avx2", size), |b| {
                    b.iter(|| {
                        let input = black_box(bufs.next());
                        let out = black_box(&mut output);
                        assert!(
                            unsafe { x86::decode_avx2(input.as_ptr(), out.as_mut_ptr(), out.len()) }.to_bool_vartime()
                        );
                    })
                });
            }
            if std::is_x86_feature_detected!("avx512bw") {
                group.bench_function(BenchmarkId::new("avx512", size), |b| {
                    b.iter(|| {
                        let input = black_box(bufs.next());
                        let out = black_box(&mut output);
                        assert!(
                            unsafe { x86::decode_avx512(input.as_ptr(), out.as_mut_ptr(), out.len()) }
                                .to_bool_vartime()
                        );
                    })
                });
            }
        }

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            let out_mu = common::as_uninit_mut(&mut output);
            b.iter(|| dispatched_decode(black_box(bufs.next()), black_box(out_mu)).unwrap())
        });
    }

    group.finish();
}

criterion_group!(benches, bench_decode);
criterion_main!(benches);
