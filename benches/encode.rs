use criterion::{criterion_group, criterion_main, Criterion};

fn bench_encode(c: &mut Criterion) {
    let input = vec![0xabu8; 64];
    c.bench_function("encode/64", |b| b.iter(|| better_hex::encode(&input)));
}

criterion_group!(benches, bench_encode);
criterion_main!(benches);
