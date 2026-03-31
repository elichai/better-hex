use criterion::{criterion_group, criterion_main, Criterion};

fn bench_check(c: &mut Criterion) {
    let input = vec![0xabu8; 64];
    let hex = better_hex::encode(&input);
    c.bench_function("check/64", |b| b.iter(|| better_hex::check(hex.as_bytes())));
}

criterion_group!(benches, bench_check);
criterion_main!(benches);
