use criterion::{Criterion, criterion_group, criterion_main};

#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{dispatched_encode, scalar};
#[cfg(feature = "_bench_internals")]
use criterion::{BenchmarkId, Throughput};
#[cfg(feature = "_bench_internals")]
use std::hint::black_box;
#[cfg(feature = "_bench_internals")]
mod common;

#[cfg(feature = "_bench_internals")]
#[inline(always)]
fn call(encode_fn: unsafe fn(*const u8, *mut u8, usize), input: &[u8], output: &mut [u8]) {
    assert_eq!(
        output.len(),
        input.len() * 2,
        "output length must be twice input length"
    );
    // SAFETY: pointers derived from valid slices with correct lengths.
    unsafe { encode_fn(input.as_ptr(), output.as_mut_ptr(), input.len()) }
}

#[cfg(feature = "_bench_internals")]
fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        let mut output: Vec<u8> = vec![0; size * 2];

        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            b.iter(|| call(scalar::encode::<false>, black_box(bufs.next()), black_box(&mut output)))
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            b.iter(|| {
                call(
                    better_hex::bench_internals::neon::encode::<false>,
                    black_box(bufs.next()),
                    black_box(&mut output),
                )
            })
        });

        #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
        {
            use better_hex::bench_internals::x86;
            if std::is_x86_feature_detected!("ssse3") {
                group.bench_function(BenchmarkId::new("ssse3", size), |b| {
                    b.iter(|| call(x86::encode_ssse3::<false>, black_box(bufs.next()), black_box(&mut output)))
                });
            }
            if std::is_x86_feature_detected!("avx2") {
                group.bench_function(BenchmarkId::new("avx2", size), |b| {
                    b.iter(|| call(x86::encode_avx2::<false>, black_box(bufs.next()), black_box(&mut output)))
                });
            }
            if std::is_x86_feature_detected!("avx512bw") {
                group.bench_function(BenchmarkId::new("avx512", size), |b| {
                    b.iter(|| call(x86::encode_avx512::<false>, black_box(bufs.next()), black_box(&mut output)))
                });
            }
        }

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            let out_mu = unsafe { &mut *(output.as_mut_slice() as *mut [u8] as *mut [core::mem::MaybeUninit<u8>]) };
            b.iter(|| dispatched_encode::<false>(black_box(bufs.next()), black_box(out_mu)).unwrap())
        });
    }

    group.finish();
}

criterion_group!(benches, bench_encode);
criterion_main!(benches);
