use criterion::{Criterion, criterion_group, criterion_main};

#[cfg(feature = "alloc")]
use criterion::{BenchmarkId, Throughput};
#[cfg(feature = "alloc")]
use std::hint::black_box;
#[cfg(feature = "alloc")]
mod common;

#[cfg(feature = "alloc")]
fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        // encode::<String> — zero-copy via HexTarget
        group.bench_function(BenchmarkId::new("hex_target_string", size), |b| {
            b.iter(|| {
                let s: Result<String, _> = better_hex::encode(black_box(bufs.next()));
                let _ = black_box(s);
            });
        });
    }

    group.finish();
}

#[cfg(not(feature = "alloc"))]
fn bench_encode(_c: &mut Criterion) {
    panic!("Re-run with --features alloc");
}

// Serde benchmarks — only with serde feature
#[cfg(all(feature = "alloc", feature = "serde"))]
fn bench_serde(c: &mut Criterion) {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    struct FastHex {
        #[serde(with = "better_hex::serde")]
        data: Vec<u8>,
    }

    #[derive(Serialize, Deserialize)]
    struct CtHex {
        #[serde(with = "better_hex::serde::ct")]
        data: Vec<u8>,
    }

    let mut group = c.benchmark_group("serde");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        // Serialize fast
        group.bench_function(BenchmarkId::new("serialize_fast", size), |b| {
            b.iter(|| {
                let val = FastHex { data: bufs.next().to_vec() };
                serde_json::to_string(black_box(&val)).unwrap()
            });
        });

        // Serialize CT
        group.bench_function(BenchmarkId::new("serialize_ct", size), |b| {
            b.iter(|| {
                let val = CtHex { data: bufs.next().to_vec() };
                serde_json::to_string(black_box(&val)).unwrap()
            });
        });

        // Deserialize fast
        let fast_json = serde_json::to_string(&FastHex { data: bufs.next().to_vec() }).unwrap();
        group.bench_function(BenchmarkId::new("deserialize_fast", size), |b| {
            b.iter(|| serde_json::from_str::<FastHex>(black_box(&fast_json)).unwrap());
        });

        // Deserialize CT
        let ct_json = serde_json::to_string(&CtHex { data: bufs.next().to_vec() }).unwrap();
        group.bench_function(BenchmarkId::new("deserialize_ct", size), |b| {
            b.iter(|| serde_json::from_str::<CtHex>(black_box(&ct_json)).unwrap());
        });
    }

    group.finish();
}

#[cfg(all(feature = "alloc", feature = "serde"))]
criterion_group!(benches, bench_encode, bench_serde);
#[cfg(all(feature = "alloc", not(feature = "serde")))]
criterion_group!(benches, bench_encode);
#[cfg(not(feature = "alloc"))]
criterion_group!(benches, bench_encode);
criterion_main!(benches);
