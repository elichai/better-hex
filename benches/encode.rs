use criterion::{BenchmarkId, Criterion, Throughput, criterion_group, criterion_main};
use core::mem::MaybeUninit;

#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{scalar, ct_scalar, dispatched_encode, dispatched_ct_encode};

const SIZES: &[usize] = &[16, 32, 64, 256, 1024, 4096];

#[cfg(feature = "_bench_internals")]
fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode");

    for &size in SIZES {
        let input: Vec<u8> = (0u8..=(size as u8).wrapping_sub(1))
            .cycle()
            .take(size)
            .collect();
        let mut output: Vec<MaybeUninit<u8>> = vec![MaybeUninit::uninit(); size * 2];

        group.throughput(Throughput::Bytes(size as u64));

        group.bench_with_input(BenchmarkId::new("scalar", size), &size, |b, _| {
            b.iter(|| {
                scalar::encode::<false>(
                    std::hint::black_box(&input),
                    std::hint::black_box(output.as_mut_slice()),
                )
            })
        });

        group.bench_with_input(BenchmarkId::new("ct_scalar", size), &size, |b, _| {
            b.iter(|| {
                ct_scalar::encode::<false>(
                    std::hint::black_box(&input),
                    std::hint::black_box(output.as_mut_slice()),
                )
            })
        });

        #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon", size), &size, |b, _| {
            b.iter(|| {
                better_hex::bench_internals::neon::encode::<false>(
                    std::hint::black_box(&input),
                    std::hint::black_box(output.as_mut_slice()),
                )
            })
        });

        group.bench_with_input(BenchmarkId::new("dispatched", size), &size, |b, _| {
            b.iter(|| {
                dispatched_encode::<false>(
                    std::hint::black_box(&input),
                    std::hint::black_box(output.as_mut_slice()),
                )
            })
        });

        group.bench_with_input(BenchmarkId::new("dispatched_ct", size), &size, |b, _| {
            b.iter(|| {
                dispatched_ct_encode::<false>(
                    std::hint::black_box(&input),
                    std::hint::black_box(output.as_mut_slice()),
                )
            })
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
