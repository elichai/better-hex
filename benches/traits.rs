use criterion::{Criterion, criterion_group, criterion_main};

#[cfg(feature = "alloc")]
use criterion::{BenchmarkId, Throughput};
#[cfg(feature = "alloc")]
use std::hint::black_box;
#[cfg(feature = "alloc")]
mod common;

#[cfg(feature = "alloc")]
fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("to_hex");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        // encode::<String> — zero-copy via HexTarget
        group.bench_function(BenchmarkId::new("hex_target_string", size), |b| {
            b.iter(|| better_hex::encode::<String>(black_box(bufs.next())).unwrap());
        });
    }

    group.finish();
}

#[cfg(all(feature = "alloc", feature = "serde"))]
mod serde_bench {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize)]
    pub struct SliceWrap<'a> {
        #[serde(with = "better_hex::serde")]
        pub data: &'a [u8],
    }

    #[derive(Deserialize)]
    pub struct VecWrap {
        #[serde(with = "better_hex::serde")]
        pub data: Vec<u8>,
    }

    #[derive(Serialize)]
    pub struct ArraySerializeWrap<'a, const N: usize> {
        #[serde(with = "better_hex::serde")]
        pub data: &'a [u8; N],
    }

    #[derive(Deserialize)]
    pub struct ArrayDeserializeWrap<const N: usize> {
        #[serde(with = "better_hex::serde")]
        pub data: [u8; N],
    }
}

// Serde benchmarks — only with serde feature.
#[cfg(all(feature = "alloc", feature = "serde"))]
fn bench_serde_vec(c: &mut Criterion) {
    use serde_bench::{SliceWrap, VecWrap};

    let mut group = c.benchmark_group("serde_vec");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        let mut hex_bufs = common::Buffers::new_hex(size);
        let mut json = common::JsonHexTemplate::new(size * 2);
        let mut out = Vec::with_capacity(size * 2 + 32);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("serialize", size), |b| {
            b.iter(|| {
                out.clear();
                let val = SliceWrap {
                    data: black_box(bufs.next()),
                };
                serde_json::to_writer(black_box(&mut out), black_box(&val)).unwrap();
                black_box(out.as_slice());
            });
        });

        group.bench_function(BenchmarkId::new("deserialize", size), |b| {
            b.iter(|| {
                let json = json.update(hex_bufs.next());
                let val = serde_json::from_slice::<VecWrap>(black_box(json)).unwrap();
                black_box(val.data.as_slice());
            });
        });
    }

    group.finish();
}

#[cfg(all(feature = "alloc", feature = "serde"))]
fn bench_serde_array(c: &mut Criterion) {
    let mut group = c.benchmark_group("serde_array");

    bench_serde_array_size::<1>(&mut group);
    bench_serde_array_size::<4>(&mut group);
    bench_serde_array_size::<16>(&mut group);
    bench_serde_array_size::<32>(&mut group);
    bench_serde_array_size::<256>(&mut group);

    group.finish();
}

#[cfg(all(feature = "alloc", feature = "serde"))]
fn bench_serde_array_size<const N: usize>(group: &mut criterion::BenchmarkGroup<'_, criterion::measurement::WallTime>) {
    use serde_bench::{ArrayDeserializeWrap, ArraySerializeWrap};

    let mut bufs = common::Buffers::new(N);
    let mut hex_bufs = common::Buffers::new_hex(N);
    let mut json = common::JsonHexTemplate::new(N * 2);
    let mut out = Vec::with_capacity(N * 2 + 32);
    group.throughput(Throughput::Bytes(N as u64));

    group.bench_function(BenchmarkId::new("serialize", N), |b| {
        b.iter(|| {
            out.clear();
            let val = ArraySerializeWrap {
                data: black_box(bufs.next_array::<N>()),
            };
            serde_json::to_writer(black_box(&mut out), black_box(&val)).unwrap();
            black_box(out.as_slice());
        });
    });

    group.bench_function(BenchmarkId::new("deserialize", N), |b| {
        b.iter(|| {
            let json = json.update(hex_bufs.next());
            let val = serde_json::from_slice::<ArrayDeserializeWrap<N>>(black_box(json)).unwrap();
            black_box(&val.data);
        });
    });
}

#[cfg(all(feature = "alloc", feature = "serde"))]
criterion_group!(benches, bench_encode, bench_serde_vec, bench_serde_array);
#[cfg(not(feature = "serde"))]
criterion_group!(benches, bench_encode);
criterion_main!(benches);
