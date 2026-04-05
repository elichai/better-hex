#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{ct_scalar, dispatched_check, dispatched_ct_check, scalar};
#[cfg(feature = "_bench_internals")]
use criterion::{BenchmarkId, Throughput};
use criterion::{Criterion, criterion_group, criterion_main};
#[cfg(feature = "_bench_internals")]
use std::hint::black_box;
#[cfg(feature = "_bench_internals")]
mod common;

/// Pre-encode `size` bytes to valid lowercase hex for use as check input.
#[cfg(feature = "_bench_internals")]
fn make_hex(size: usize) -> Vec<u8> {
    let input = common::make_bytes(size);
    let mut hex = vec![0u8; size * 2];
    better_hex::encode_to_slice(&input, &mut hex).unwrap();
    hex
}

#[cfg(feature = "_bench_internals")]
fn bench_check(c: &mut Criterion) {
    let mut group = c.benchmark_group("check");

    for &size in common::BENCH_SIZES {
        // check input is the hex string; throughput is measured in *input* bytes.
        let hex = make_hex(size);
        let hex_len = hex.len() as u64;

        group.throughput(Throughput::Bytes(hex_len));

        group.bench_with_input(BenchmarkId::new("scalar", size), &size, |b, _| {
            b.iter(|| scalar::check(black_box(hex.as_slice())))
        });

        group.bench_with_input(BenchmarkId::new("ct_scalar", size), &size, |b, _| {
            b.iter(|| ct_scalar::check(black_box(hex.as_slice())))
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon", size), &size, |b, _| {
            b.iter(|| better_hex::bench_internals::neon::check(black_box(hex.as_slice())))
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon_ct", size), &size, |b, _| {
            b.iter(|| better_hex::bench_internals::neon::ct_check(black_box(hex.as_slice())))
        });

        group.bench_with_input(BenchmarkId::new("dispatched", size), &size, |b, _| {
            b.iter(|| dispatched_check(black_box(hex.as_slice())))
        });

        group.bench_with_input(BenchmarkId::new("dispatched_ct", size), &size, |b, _| {
            b.iter(|| dispatched_ct_check(black_box(hex.as_slice())))
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
