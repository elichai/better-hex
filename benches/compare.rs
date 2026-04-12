// Comparison benchmark: better-hex vs const-hex, faster-hex, hex
//
// Enable comparison crates via features:
//   --features _bench_const_hex,_bench_faster_hex,_bench_hex
//
// serde groups also require --features serde (and serde_json is a dev-dep).

use criterion::{Criterion, criterion_group, criterion_main};

#[cfg(feature = "alloc")]
use criterion::{BenchmarkId, Throughput};
#[cfg(feature = "alloc")]
use std::hint::black_box;
#[cfg(feature = "alloc")]
mod common;

// ---------------------------------------------------------------------------
// Group: encode_alloc
// ---------------------------------------------------------------------------

#[cfg(feature = "alloc")]
fn bench_encode_alloc(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode_alloc");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| better_hex::encode::<String>(black_box(bufs.next())));
        });

        #[cfg(feature = "_bench_const_hex")]
        group.bench_function(BenchmarkId::new("const_hex", size), |b| {
            b.iter(|| const_hex::encode(black_box(bufs.next())));
        });

        #[cfg(feature = "_bench_faster_hex")]
        group.bench_function(BenchmarkId::new("faster_hex", size), |b| {
            b.iter(|| faster_hex::hex_string(black_box(bufs.next())));
        });

        #[cfg(feature = "_bench_hex")]
        group.bench_function(BenchmarkId::new("hex", size), |b| {
            b.iter(|| hex::encode(black_box(bufs.next())));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: encode_to_slice
// ---------------------------------------------------------------------------

#[cfg(feature = "alloc")]
fn bench_encode_to_slice(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode_to_slice");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        let mut dst = vec![0u8; size * 2];
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| {
                // Discard the &mut str return to avoid a lifetime escape in FnMut.
                better_hex::encode_to_slice(black_box(bufs.next()), black_box(dst.as_mut_slice())).unwrap();
            });
        });

        #[cfg(feature = "_bench_const_hex")]
        group.bench_function(BenchmarkId::new("const_hex", size), |b| {
            b.iter(|| const_hex::encode_to_slice(black_box(bufs.next()), black_box(dst.as_mut_slice())));
        });

        #[cfg(feature = "_bench_faster_hex")]
        group.bench_function(BenchmarkId::new("faster_hex", size), |b| {
            b.iter(|| {
                faster_hex::hex_encode(black_box(bufs.next()), black_box(dst.as_mut_slice())).unwrap();
            });
        });

        #[cfg(feature = "_bench_base16ct")]
        group.bench_function(BenchmarkId::new("base16ct_lower", size), |b| {
            b.iter(|| {
                base16ct::lower::encode_str(black_box(bufs.next()), black_box(dst.as_mut_slice())).unwrap();
            });
        });

        #[cfg(feature = "_bench_base16ct")]
        group.bench_function(BenchmarkId::new("base16ct_upper", size), |b| {
            b.iter(|| {
                base16ct::upper::encode_str(black_box(bufs.next()), black_box(dst.as_mut_slice())).unwrap();
            });
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: decode_alloc
// ---------------------------------------------------------------------------

#[cfg(feature = "alloc")]
fn bench_decode_alloc(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode_alloc");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new_hex(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| better_hex::decode::<Vec<u8>>(black_box(bufs.next())));
        });

        // const_hex::decode accepts AsRef<[u8]>, so pass the hex bytes directly.
        #[cfg(feature = "_bench_const_hex")]
        group.bench_function(BenchmarkId::new("const_hex", size), |b| {
            b.iter(|| const_hex::decode(black_box(bufs.next())));
        });

        // faster_hex has no allocating decode API, so we allocate inside the loop
        // to match better_hex's Vec allocation overhead (this is "decode_alloc").
        #[cfg(feature = "_bench_faster_hex")]
        group.bench_function(BenchmarkId::new("faster_hex", size), |b| {
            b.iter(|| {
                let mut dst = vec![0u8; size];
                faster_hex::hex_decode(black_box(bufs.next()), black_box(&mut dst)).unwrap();
                dst
            });
        });

        // hex::decode accepts AsRef<[u8]>.
        #[cfg(feature = "_bench_hex")]
        group.bench_function(BenchmarkId::new("hex", size), |b| {
            b.iter(|| hex::decode(black_box(bufs.next())));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: decode_to_slice
// ---------------------------------------------------------------------------

#[cfg(feature = "alloc")]
fn bench_decode_to_slice(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode_to_slice");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new_hex(size);
        let mut dst = vec![0u8; size];
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| {
                // Discard the &[u8] return to avoid a lifetime escape in FnMut.
                better_hex::decode_to_slice(black_box(bufs.next()), black_box(dst.as_mut_slice())).unwrap();
            });
        });

        // const_hex::decode_to_slice accepts AsRef<[u8]>.
        #[cfg(feature = "_bench_const_hex")]
        group.bench_function(BenchmarkId::new("const_hex", size), |b| {
            b.iter(|| const_hex::decode_to_slice(black_box(bufs.next()), black_box(dst.as_mut_slice())));
        });

        #[cfg(feature = "_bench_faster_hex")]
        group.bench_function(BenchmarkId::new("faster_hex", size), |b| {
            b.iter(|| faster_hex::hex_decode(black_box(bufs.next()), black_box(dst.as_mut_slice())));
        });

        #[cfg(feature = "_bench_base16ct")]
        group.bench_function(BenchmarkId::new("base16ct", size), |b| {
            b.iter(|| {
                base16ct::mixed::decode(black_box(bufs.next()), black_box(dst.as_mut_slice())).unwrap();
            });
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: check
// ---------------------------------------------------------------------------

#[cfg(feature = "alloc")]
fn bench_check(c: &mut Criterion) {
    let mut group = c.benchmark_group("check");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new_hex(size);
        // Throughput over the hex input (2× the original bytes).
        let hex_len = (size * 2) as u64;
        group.throughput(Throughput::Bytes(hex_len));

        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| better_hex::check(black_box(bufs.next())));
        });

        // const_hex::check accepts AsRef<[u8]>.
        #[cfg(feature = "_bench_const_hex")]
        group.bench_function(BenchmarkId::new("const_hex", size), |b| {
            b.iter(|| const_hex::check(black_box(bufs.next())));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: display_format
// ---------------------------------------------------------------------------

#[cfg(feature = "alloc")]
fn bench_display_format(c: &mut Criterion) {
    let mut group = c.benchmark_group("display_format");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| format!("{}", better_hex::display(black_box(bufs.next()))));
        });

        // Use const_hex::display so both sides go through format! + Display,
        // making this an apples-to-apples comparison of display overhead.
        #[cfg(feature = "_bench_const_hex")]
        group.bench_function(BenchmarkId::new("const_hex", size), |b| {
            b.iter(|| format!("{}", const_hex::display(black_box(bufs.next()))));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: serde_serialize / serde_deserialize
// ---------------------------------------------------------------------------

#[cfg(all(feature = "alloc", feature = "serde"))]
mod serde_bench {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    pub struct BetterHexWrap {
        #[serde(with = "better_hex::serde")]
        pub data: Vec<u8>,
    }

    #[cfg(feature = "_bench_const_hex")]
    #[derive(Serialize, Deserialize)]
    pub struct ConstHexWrap {
        #[serde(with = "const_hex::serde")]
        pub data: Vec<u8>,
    }
}

#[cfg(all(feature = "alloc", feature = "serde"))]
fn bench_serde_serialize(c: &mut Criterion) {
    use serde_bench::BetterHexWrap;

    let mut group = c.benchmark_group("serde_serialize");
    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| {
                let val = BetterHexWrap {
                    data: bufs.next().to_vec(),
                };
                serde_json::to_string(black_box(&val)).unwrap()
            });
        });

        #[cfg(feature = "_bench_const_hex")]
        {
            use serde_bench::ConstHexWrap;
            group.bench_function(BenchmarkId::new("const_hex", size), |b| {
                b.iter(|| {
                    let val = ConstHexWrap {
                        data: bufs.next().to_vec(),
                    };
                    serde_json::to_string(black_box(&val)).unwrap()
                });
            });
        }
    }

    group.finish();
}

#[cfg(all(feature = "alloc", feature = "serde"))]
fn bench_serde_deserialize(c: &mut Criterion) {
    use serde_bench::BetterHexWrap;

    let mut group = c.benchmark_group("serde_deserialize");
    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new(size);
        group.throughput(Throughput::Bytes(size as u64));

        // Pre-build JSON strings outside the measurement loop.
        let bh_json = serde_json::to_string(&BetterHexWrap {
            data: bufs.next().to_vec(),
        })
        .unwrap();
        group.bench_function(BenchmarkId::new("better_hex", size), |b| {
            b.iter(|| serde_json::from_str::<BetterHexWrap>(black_box(&bh_json)).unwrap());
        });

        #[cfg(feature = "_bench_const_hex")]
        {
            use serde_bench::ConstHexWrap;
            let ch_json = serde_json::to_string(&ConstHexWrap {
                data: bufs.next().to_vec(),
            })
            .unwrap();
            group.bench_function(BenchmarkId::new("const_hex", size), |b| {
                b.iter(|| serde_json::from_str::<ConstHexWrap>(black_box(&ch_json)).unwrap());
            });
        }
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// criterion_group / criterion_main
// ---------------------------------------------------------------------------

#[cfg(all(feature = "alloc", feature = "serde"))]
criterion_group!(
    benches,
    bench_encode_alloc,
    bench_encode_to_slice,
    bench_decode_alloc,
    bench_decode_to_slice,
    bench_check,
    bench_display_format,
    bench_serde_serialize,
    bench_serde_deserialize,
);

#[cfg(all(feature = "alloc", not(feature = "serde")))]
criterion_group!(
    benches,
    bench_encode_alloc,
    bench_encode_to_slice,
    bench_decode_alloc,
    bench_decode_to_slice,
    bench_check,
    bench_display_format,
);

#[cfg(not(feature = "alloc"))]
fn bench_compare_requires_alloc(_c: &mut Criterion) {
    panic!("Re-run with --features alloc");
}

#[cfg(not(feature = "alloc"))]
criterion_group!(benches, bench_compare_requires_alloc);

criterion_main!(benches);
