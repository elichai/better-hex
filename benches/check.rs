#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{dispatched_check, scalar};
#[cfg(feature = "_bench_internals")]
use criterion::{BenchmarkId, Throughput};
use criterion::{Criterion, criterion_group, criterion_main};
#[cfg(feature = "_bench_internals")]
use std::hint::black_box;
#[cfg(feature = "_bench_internals")]
mod common;

#[cfg(feature = "_bench_internals")]
fn bench_check(c: &mut Criterion) {
    let mut group = c.benchmark_group("check");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new_hex(size);
        // check input is the hex string; throughput is measured in *input* bytes.
        let hex_len = (size * 2) as u64;

        group.throughput(Throughput::Bytes(hex_len));

        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            b.iter(|| scalar::check(black_box(bufs.next())))
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            b.iter(|| better_hex::bench_internals::neon::check(black_box(bufs.next())))
        });

        #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
        {
            use better_hex::bench_internals::x86;
            if std::is_x86_feature_detected!("ssse3") {
                group.bench_function(BenchmarkId::new("ssse3", size), |b| {
                    b.iter(|| unsafe { x86::check_ssse3(black_box(bufs.next())) })
                });
            }
            if std::is_x86_feature_detected!("avx2") {
                group.bench_function(BenchmarkId::new("avx2", size), |b| {
                    b.iter(|| unsafe { x86::check_avx2(black_box(bufs.next())) })
                });
            }
            if std::is_x86_feature_detected!("avx512bw") {
                group.bench_function(BenchmarkId::new("avx512", size), |b| {
                    b.iter(|| unsafe { x86::check_avx512(black_box(bufs.next())) })
                });
            }
        }

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            b.iter(|| dispatched_check(black_box(bufs.next())))
        });
    }

    group.finish();
}

criterion_group!(benches, bench_check);
criterion_main!(benches);
