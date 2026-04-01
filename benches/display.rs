use criterion::{BenchmarkId, Criterion, Throughput, black_box, criterion_group, criterion_main};

const SIZES: &[usize] = &[4, 32, 64, 256, 1024, 4096, 16384];

fn bench_display(c: &mut Criterion) {
    let mut group = c.benchmark_group("display");

    for &size in SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        group.throughput(Throughput::Bytes(size as u64));

        // format! — allocates String via fmt::Formatter
        group.bench_with_input(BenchmarkId::new("format", size), &input, |b, input| {
            b.iter(|| format!("{}", better_hex::display(black_box(input.as_slice()))));
        });

        // write! to a pre-allocated String — reuses allocation
        group.bench_with_input(BenchmarkId::new("write_reuse", size), &input, |b, input| {
            use core::fmt::Write;
            let mut buf = String::with_capacity(size * 2 + 16);
            b.iter(|| {
                buf.clear();
                write!(buf, "{}", better_hex::display(black_box(input.as_slice()))).unwrap();
                black_box(&buf);
            });
        });

        // Compare: direct encode (no fmt overhead)
        group.bench_with_input(BenchmarkId::new("encode_direct", size), &input, |b, input| {
            b.iter(|| better_hex::encode(black_box(input)));
        });
    }

    group.finish();
}

criterion_group!(benches, bench_display);
criterion_main!(benches);
