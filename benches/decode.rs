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

        // Throughput is measured in *output* (decoded) bytes.
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            b.iter(|| {
                let input = black_box(bufs.next());
                let out = black_box(&mut output);
                assert!(unsafe { scalar::decode(input.as_ptr(), out.as_mut_ptr(), out.len()) }.is_ok());
            })
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            b.iter(|| {
                let input = black_box(bufs.next());
                let out = black_box(&mut output);
                assert!(
                    unsafe { better_hex::bench_internals::neon::decode(input.as_ptr(), out.as_mut_ptr(), out.len()) }
                        .is_ok()
                );
            })
        });

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            let out_mu = unsafe { &mut *(output.as_mut_slice() as *mut [u8] as *mut [core::mem::MaybeUninit<u8>]) };
            b.iter(|| dispatched_decode(black_box(bufs.next()), black_box(out_mu)).unwrap())
        });
    }

    group.finish();
}

criterion_group!(benches, bench_decode);
criterion_main!(benches);
