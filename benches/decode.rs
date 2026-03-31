use criterion::{criterion_group, criterion_main, Criterion};

fn bench_decode(c: &mut Criterion) {
    let input = vec![0xabu8; 64];
    let hex = better_hex::encode(&input);
    c.bench_function("decode/64", |b| b.iter(|| better_hex::decode(hex.as_bytes())));
}

criterion_group!(benches, bench_decode);
criterion_main!(benches);
