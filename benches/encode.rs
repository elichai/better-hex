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
    unsafe {
        encode_fn(
            black_box(input.as_ptr()),
            black_box(output.as_mut_ptr()),
            black_box(input.len()),
            black_box(upper),
        )
    }
}

#[cfg(feature = "_bench_internals")]
fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        let mut output: Vec<u8> = vec![0; size * 2];

        group.throughput(Throughput::Bytes(size as u64));

        // Alternate upper/lower per iteration to cover both code paths in a
        // single bench, halving case count without losing coverage.
        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            let mut upper = false;
            b.iter(|| {
                upper = !upper;
                call(scalar::encode, bufs.next(), &mut output, upper)
            })
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            let mut upper = false;
            b.iter(|| {
                upper = !upper;
                call(
                    better_hex::bench_internals::neon::encode,
                    bufs.next(),
                    &mut output,
                    upper,
                )
            })
        });

        #[cfg(all(not(feature = "disable-simd"), any(target_arch = "x86", target_arch = "x86_64")))]
        {
            use better_hex::bench_internals::x86;
            if std::is_x86_feature_detected!("ssse3") {
                group.bench_function(BenchmarkId::new("ssse3", size), |b| {
                    let mut upper = false;
                    b.iter(|| {
                        upper = !upper;
                        call(x86::encode_ssse3, bufs.next(), &mut output, upper)
                    })
                });
            }
            if std::is_x86_feature_detected!("avx2") {
                group.bench_function(BenchmarkId::new("avx2", size), |b| {
                    let mut upper = false;
                    b.iter(|| {
                        upper = !upper;
                        call(x86::encode_avx2, bufs.next(), &mut output, upper)
                    })
                });
            }
            if std::is_x86_feature_detected!("avx512vbmi") {
                group.bench_function(BenchmarkId::new("avx512vbmi", size), |b| {
                    let mut upper = false;
                    b.iter(|| {
                        upper = !upper;
                        call(x86::encode_avx512, bufs.next(), &mut output, upper)
                    })
                });
            }
        }

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            let mut upper = false;
            let out_mu = common::as_uninit_mut(&mut output);
            b.iter(|| {
                upper = !upper;
                dispatched_encode(bufs.next(), out_mu, upper).unwrap()
            })
        });
    }

    group.finish();
}

criterion_group!(benches, bench_encode);
criterion_main!(benches);
