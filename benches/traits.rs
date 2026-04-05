use criterion::{Criterion, criterion_group, criterion_main};

#[cfg(feature = "alloc")]
use criterion::{BenchmarkId, Throughput};
#[cfg(feature = "alloc")]
use std::hint::black_box;
#[cfg(feature = "alloc")]
mod common;

#[cfg(feature = "alloc")]
fn bench_encode_to(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode_to");

    for &size in common::BENCH_SIZES {
        let input = common::make_bytes(size);
        group.throughput(Throughput::Bytes(size as u64));

        // encode_to::<String> — zero-copy via HexTarget
        group.bench_with_input(BenchmarkId::new("hex_target_string", size), &input, |b, input| {
            b.iter(|| {
                let s: Result<String, _> = better_hex::encode_to(black_box(input));
                let _ = black_box(s);
            });
        });

        // encode() — the existing alloc path
        group.bench_with_input(BenchmarkId::new("encode_alloc", size), &input, |b, input| {
            b.iter(|| black_box(better_hex::encode(black_box(input))));
        });
    }

    group.finish();
}

#[cfg(not(feature = "alloc"))]
fn bench_encode_to(_c: &mut Criterion) {
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
        let data = common::make_bytes(size);
        group.throughput(Throughput::Bytes(size as u64));

        // Serialize fast
        let fast = FastHex { data: data.clone() };
        group.bench_with_input(BenchmarkId::new("serialize_fast", size), &fast, |b, val| {
            b.iter(|| serde_json::to_string(black_box(val)).unwrap());
        });

        // Serialize CT
        let ct = CtHex { data: data.clone() };
        group.bench_with_input(BenchmarkId::new("serialize_ct", size), &ct, |b, val| {
            b.iter(|| serde_json::to_string(black_box(val)).unwrap());
        });

        // Deserialize fast
        let json_fast = serde_json::to_string(&FastHex { data: data.clone() }).unwrap();
        group.bench_with_input(BenchmarkId::new("deserialize_fast", size), &json_fast, |b, json| {
            b.iter(|| serde_json::from_str::<FastHex>(black_box(json)).unwrap());
        });

        // Deserialize CT
        let json_ct = serde_json::to_string(&CtHex { data: data.clone() }).unwrap();
        group.bench_with_input(BenchmarkId::new("deserialize_ct", size), &json_ct, |b, json| {
            b.iter(|| serde_json::from_str::<CtHex>(black_box(json)).unwrap());
        });
    }

    group.finish();
}

#[cfg(all(feature = "alloc", feature = "serde"))]
criterion_group!(benches, bench_encode_to, bench_serde);
#[cfg(all(feature = "alloc", not(feature = "serde")))]
criterion_group!(benches, bench_encode_to);
#[cfg(not(feature = "alloc"))]
criterion_group!(benches, bench_encode_to);
criterion_main!(benches);
