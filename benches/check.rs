use criterion::{BenchmarkId, Criterion, Throughput, criterion_group, criterion_main};

#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{scalar, ct_scalar, dispatched_check, dispatched_ct_check};

const SIZES: &[usize] = &[16, 32, 64, 256, 1024, 4096];

/// Pre-encode `size` bytes to valid lowercase hex for use as check input.
fn make_hex(size: usize) -> Vec<u8> {
    let input: Vec<u8> = (0u8..=(size as u8).wrapping_sub(1))
        .cycle()
        .take(size)
        .collect();
    let mut hex = vec![0u8; size * 2];
    better_hex::encode_to_slice(&input, &mut hex).unwrap();
    hex
}

#[cfg(feature = "_bench_internals")]
fn bench_check(c: &mut Criterion) {
    let mut group = c.benchmark_group("check");

    for &size in SIZES {
        // check input is the hex string; throughput is measured in *input* bytes.
        let hex = make_hex(size);
        let hex_len = hex.len() as u64;

        group.throughput(Throughput::Bytes(hex_len));

        group.bench_with_input(BenchmarkId::new("scalar", size), &size, |b, _| {
            b.iter(|| scalar::check(std::hint::black_box(hex.as_slice())))
        });

        group.bench_with_input(BenchmarkId::new("ct_scalar", size), &size, |b, _| {
            b.iter(|| ct_scalar::check(std::hint::black_box(hex.as_slice())))
        });

        #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon", size), &size, |b, _| {
            b.iter(|| {
                better_hex::bench_internals::neon::check(std::hint::black_box(hex.as_slice()))
            })
        });

        #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon_ct", size), &size, |b, _| {
            b.iter(|| {
                better_hex::bench_internals::neon::ct_check(std::hint::black_box(hex.as_slice()))
            })
        });

        group.bench_with_input(BenchmarkId::new("dispatched", size), &size, |b, _| {
            b.iter(|| dispatched_check(std::hint::black_box(hex.as_slice())))
        });

        group.bench_with_input(BenchmarkId::new("dispatched_ct", size), &size, |b, _| {
            b.iter(|| dispatched_ct_check(std::hint::black_box(hex.as_slice())))
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
