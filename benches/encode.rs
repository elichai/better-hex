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
fn call(encode_fn: unsafe fn(*const u8, *mut u8, usize, bool), input: &[u8], output: &mut [u8], upper: bool) {
    assert_eq!(
        output.len(),
        input.len() * 2,
        "output length must be twice input length"
    );
    // SAFETY: pointers derived from valid slices with correct lengths.
    unsafe { encode_fn(input.as_ptr(), output.as_mut_ptr(), input.len(), upper) }
}

#[cfg(feature = "_bench_internals")]
fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        let mut output: Vec<u8> = vec![0; size * 2];

        group.throughput(Throughput::Bytes(size as u64));

        for &upper in &[false, true] {
            let case = if upper { "upper" } else { "lower" };

            group.bench_function(BenchmarkId::new(format!("scalar_{case}"), size), |b| {
                b.iter(|| call(scalar::encode, black_box(bufs.next()), black_box(&mut output), upper))
            });

            #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
            group.bench_function(BenchmarkId::new(format!("neon_{case}"), size), |b| {
                b.iter(|| {
                    call(
                        better_hex::bench_internals::neon::encode,
                        black_box(bufs.next()),
                        black_box(&mut output),
                        upper,
                    )
                })
            });

            #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
            {
                use better_hex::bench_internals::x86;
                if std::is_x86_feature_detected!("ssse3") {
                    group.bench_function(BenchmarkId::new(format!("ssse3_{case}"), size), |b| {
                        b.iter(|| call(x86::encode_ssse3, black_box(bufs.next()), black_box(&mut output), upper))
                    });
                }
                if std::is_x86_feature_detected!("avx2") {
                    group.bench_function(BenchmarkId::new(format!("avx2_{case}"), size), |b| {
                        b.iter(|| call(x86::encode_avx2, black_box(bufs.next()), black_box(&mut output), upper))
                    });
                }
                if std::is_x86_feature_detected!("avx512vbmi") {
                    group.bench_function(BenchmarkId::new(format!("avx512vbmi_{case}"), size), |b| {
                        b.iter(|| call(x86::encode_avx512, black_box(bufs.next()), black_box(&mut output), upper))
                    });
                }
            }

            group.bench_function(BenchmarkId::new(format!("dispatched_{case}"), size), |b| {
                let out_mu = unsafe { &mut *(output.as_mut_slice() as *mut [u8] as *mut [core::mem::MaybeUninit<u8>]) };
                b.iter(|| dispatched_encode(black_box(bufs.next()), black_box(out_mu), upper).unwrap())
            });
        }
    }

    group.finish();
}

criterion_group!(benches, bench_encode);
criterion_main!(benches);
