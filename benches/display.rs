use criterion::{Criterion, criterion_group, criterion_main};

#[cfg(feature = "alloc")]
use criterion::{BenchmarkId, Throughput};
#[cfg(feature = "alloc")]
use std::hint::black_box;
#[cfg(feature = "alloc")]
mod common;

#[cfg(feature = "alloc")]
fn bench_display(c: &mut Criterion) {
    let mut group = c.benchmark_group("display");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        // format! — allocates String via fmt::Formatter
        group.bench_function(BenchmarkId::new("format", size), |b| {
            b.iter(|| format!("{}", better_hex::display(black_box(bufs.next()))));
        });

        // write! to a pre-allocated String — reuses allocation
        group.bench_function(BenchmarkId::new("write_reuse", size), |b| {
            use core::fmt::Write;
            let mut buf = String::with_capacity(size * 2 + 16);
            b.iter(|| {
                buf.clear();
                write!(buf, "{}", better_hex::display(black_box(bufs.next()))).unwrap();
                black_box(&buf);
            });
        });

        // Compare: direct encode (no fmt overhead)
        group.bench_function(BenchmarkId::new("encode_direct", size), |b| {
            b.iter(|| better_hex::encode(black_box(bufs.next())));
        });
    }

    group.finish();
}

#[cfg(not(feature = "alloc"))]
fn bench_display(_c: &mut Criterion) {
    panic!("Re-run with --features alloc");
}

criterion_group!(benches, bench_display);
criterion_main!(benches);
