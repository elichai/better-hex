#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{ct_scalar, dispatched_ct_decode, dispatched_decode, scalar};
#[cfg(feature = "_bench_internals")]
use core::mem::MaybeUninit;
#[cfg(feature = "_bench_internals")]
use criterion::{BenchmarkId, Throughput};
use criterion::{Criterion, criterion_group, criterion_main};
#[cfg(feature = "_bench_internals")]
use std::hint::black_box;
#[cfg(feature = "_bench_internals")]
mod common;

/// Pre-encode `size` bytes of input to valid lowercase hex, returning the hex
/// string as a `Vec<u8>`.
#[cfg(feature = "_bench_internals")]
fn make_hex(size: usize) -> Vec<u8> {
    let input = common::make_bytes(size);
    let mut hex = vec![0u8; size * 2];
    better_hex::encode_to_slice(&input, &mut hex).unwrap();
    hex
}

#[cfg(feature = "_bench_internals")]
fn bench_decode(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode");

    for &size in common::BENCH_SIZES {
        let hex = make_hex(size);
        let mut output: Vec<MaybeUninit<u8>> = vec![MaybeUninit::uninit(); size];

        // Throughput is measured in *output* (decoded) bytes.
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_with_input(BenchmarkId::new("scalar", size), &size, |b, _| {
            b.iter(|| scalar::decode(black_box(hex.as_slice()), black_box(output.as_mut_slice())).unwrap())
        });

        group.bench_with_input(BenchmarkId::new("ct_scalar", size), &size, |b, _| {
            b.iter(|| ct_scalar::decode(black_box(hex.as_slice()), black_box(output.as_mut_slice())).unwrap())
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon", size), &size, |b, _| {
            b.iter(|| {
                better_hex::bench_internals::neon::decode(black_box(hex.as_slice()), black_box(output.as_mut_slice()))
                    .unwrap()
            })
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon_ct", size), &size, |b, _| {
            b.iter(|| {
                better_hex::bench_internals::neon::ct_decode(
                    black_box(hex.as_slice()),
                    black_box(output.as_mut_slice()),
                )
                .unwrap()
            })
        });

        group.bench_with_input(BenchmarkId::new("dispatched", size), &size, |b, _| {
            b.iter(|| dispatched_decode(black_box(hex.as_slice()), black_box(output.as_mut_slice())).unwrap())
        });

        group.bench_with_input(BenchmarkId::new("dispatched_ct", size), &size, |b, _| {
            b.iter(|| dispatched_ct_decode(black_box(hex.as_slice()), black_box(output.as_mut_slice())).unwrap())
        });
    }

    group.finish();
}

#[cfg(not(feature = "_bench_internals"))]
fn bench_decode(_c: &mut Criterion) {
    panic!("Re-run with --features _bench_internals");
}

criterion_group!(benches, bench_decode);
criterion_main!(benches);
