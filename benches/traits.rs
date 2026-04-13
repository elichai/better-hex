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

// Serde benchmarks — only with serde feature
#[cfg(all(feature = "alloc", feature = "serde"))]
fn bench_serde(c: &mut Criterion) {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    struct HexWrap {
        #[serde(with = "better_hex::serde")]
        data: Vec<u8>,
    }

    let mut group = c.benchmark_group("serde");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("serialize", size), |b| {
            b.iter(|| {
                let val = HexWrap {
                    data: bufs.next().to_vec(),
                };
                serde_json::to_string(black_box(&val)).unwrap()
            });
        });

        let json = serde_json::to_string(&HexWrap {
            data: bufs.next().to_vec(),
        })
        .unwrap();
        group.bench_function(BenchmarkId::new("deserialize", size), |b| {
            b.iter(|| serde_json::from_str::<HexWrap>(black_box(&json)).unwrap());
        });
    }

    group.finish();
}

#[cfg(feature = "serde")]
criterion_group!(benches, bench_encode, bench_serde);
#[cfg(not(feature = "serde"))]
criterion_group!(benches, bench_encode);
criterion_main!(benches);
