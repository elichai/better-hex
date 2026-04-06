use criterion::{Criterion, criterion_group, criterion_main};

#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{ct_scalar, dispatched_ct_encode, dispatched_encode, scalar};
#[cfg(feature = "_bench_internals")]
use core::mem::MaybeUninit;
#[cfg(feature = "_bench_internals")]
use criterion::{BenchmarkId, Throughput};
#[cfg(feature = "_bench_internals")]
use std::hint::black_box;
#[cfg(feature = "_bench_internals")]
mod common;

#[cfg(feature = "_bench_internals")]
fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        let mut output: Vec<MaybeUninit<u8>> = vec![MaybeUninit::uninit(); size * 2];

        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            b.iter(|| scalar::encode::<false>(black_box(bufs.next()), black_box(output.as_mut_slice())))
        });

        group.bench_function(BenchmarkId::new("ct_scalar", size), |b| {
            b.iter(|| ct_scalar::encode::<false>(black_box(bufs.next()), black_box(output.as_mut_slice())))
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            b.iter(|| {
                better_hex::bench_internals::neon::encode::<false>(
                    black_box(bufs.next()),
                    black_box(output.as_mut_slice()),
                )
            })
        });

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            b.iter(|| dispatched_encode::<false>(black_box(bufs.next()), black_box(output.as_mut_slice())))
        });

        group.bench_function(BenchmarkId::new("dispatched_ct", size), |b| {
            b.iter(|| dispatched_ct_encode::<false>(black_box(bufs.next()), black_box(output.as_mut_slice())))
        });
    }

    group.finish();
}

#[cfg(not(feature = "_bench_internals"))]
fn bench_encode(_c: &mut Criterion) {
    panic!("Re-run with --features _bench_internals");
}

criterion_group!(benches, bench_encode);
criterion_main!(benches);
