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

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            b.iter(|| dispatched_check(black_box(bufs.next())))
        });
    }

    group.finish();
}

#[cfg(not(feature = "_bench_internals"))]
fn bench_check(_c: &mut Criterion) {
    panic!("Re-run with --features _bench_internals");
}

criterion_group!(benches, bench_check);
criterion_main!(benches);
