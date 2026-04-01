// Comparison benchmark: better-hex vs const-hex, faster-hex, hex
//
// Enable comparison crates via features:
//   --features _bench_const_hex,_bench_faster_hex,_bench_hex
//
// serde groups also require --features serde (and serde_json is a dev-dep).

use criterion::{BenchmarkId, Criterion, Throughput, black_box, criterion_group, criterion_main};

// ---------------------------------------------------------------------------
// Input sizes
// ---------------------------------------------------------------------------

const SIZES: &[usize] = &[4, 32, 64, 256, 1024, 4096, 16384];

const TAIL_SIZES: &[usize] = &[4, 15, 17, 31, 33, 63, 65, 127, 129, 255, 257, 1023, 4096, 16384];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

fn make_bytes(size: usize) -> Vec<u8> {
    (0u8..=255).cycle().take(size).collect()
}

fn make_hex_bytes(size: usize) -> Vec<u8> {
    let input = make_bytes(size);
    let mut hex = vec![0u8; size * 2];
    better_hex::encode_to_slice(&input, &mut hex).unwrap();
    hex
}

// ---------------------------------------------------------------------------
// Group: encode_alloc
// ---------------------------------------------------------------------------

fn bench_encode_alloc(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode_alloc");

    for &size in SIZES {
        let input = make_bytes(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_with_input(BenchmarkId::new("better_hex", size), &input, |b, inp| {
            b.iter(|| better_hex::encode(black_box(inp)));
        });

        #[cfg(feature = "_bench_const_hex")]
        group.bench_with_input(BenchmarkId::new("const_hex", size), &input, |b, inp| {
            b.iter(|| const_hex::encode(black_box(inp)));
        });

        #[cfg(feature = "_bench_faster_hex")]
        group.bench_with_input(BenchmarkId::new("faster_hex", size), &input, |b, inp| {
            b.iter(|| faster_hex::hex_string(black_box(inp)));
        });

        #[cfg(feature = "_bench_hex")]
        group.bench_with_input(BenchmarkId::new("hex", size), &input, |b, inp| {
            b.iter(|| hex::encode(black_box(inp)));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: encode_to_slice
// ---------------------------------------------------------------------------

fn bench_encode_to_slice(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode_to_slice");

    for &size in TAIL_SIZES {
        let input = make_bytes(size);
        let mut dst = vec![0u8; size * 2];
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_with_input(BenchmarkId::new("better_hex", size), &input, |b, inp| {
            b.iter(|| {
                // Discard the &mut str return to avoid a lifetime escape in FnMut.
                let _ = better_hex::encode_to_slice(black_box(inp), black_box(dst.as_mut_slice()));
            });
        });

        #[cfg(feature = "_bench_const_hex")]
        group.bench_with_input(BenchmarkId::new("const_hex", size), &input, |b, inp| {
            b.iter(|| const_hex::encode_to_slice(black_box(inp), black_box(dst.as_mut_slice())));
        });

        #[cfg(feature = "_bench_faster_hex")]
        group.bench_with_input(BenchmarkId::new("faster_hex", size), &input, |b, inp| {
            b.iter(|| {
                let _ = faster_hex::hex_encode(black_box(inp), black_box(dst.as_mut_slice()));
            });
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: decode_alloc
// ---------------------------------------------------------------------------

fn bench_decode_alloc(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode_alloc");

    for &size in SIZES {
        let hex = make_hex_bytes(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_with_input(BenchmarkId::new("better_hex", size), &hex, |b, h| {
            b.iter(|| better_hex::decode(black_box(h)));
        });

        // const_hex::decode accepts AsRef<[u8]>, so pass the hex bytes directly.
        #[cfg(feature = "_bench_const_hex")]
        group.bench_with_input(BenchmarkId::new("const_hex", size), &hex, |b, h| {
            b.iter(|| const_hex::decode(black_box(h.as_slice())));
        });

        // faster_hex::hex_decode takes (src: &[u8], dst: &mut [u8]) — no alloc variant.
        // We allocate outside the loop and decode into that pre-zeroed buffer.
        #[cfg(feature = "_bench_faster_hex")]
        {
            let mut dst = vec![0u8; size];
            group.bench_with_input(BenchmarkId::new("faster_hex", size), &hex, |b, h| {
                b.iter(|| faster_hex::hex_decode(black_box(h.as_slice()), black_box(dst.as_mut_slice())));
            });
        }

        // hex::decode accepts AsRef<[u8]>.
        #[cfg(feature = "_bench_hex")]
        group.bench_with_input(BenchmarkId::new("hex", size), &hex, |b, h| {
            b.iter(|| hex::decode(black_box(h.as_slice())));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: decode_to_slice
// ---------------------------------------------------------------------------

fn bench_decode_to_slice(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode_to_slice");

    for &size in TAIL_SIZES {
        let hex = make_hex_bytes(size);
        let mut dst = vec![0u8; size];
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_with_input(BenchmarkId::new("better_hex", size), &hex, |b, h| {
            b.iter(|| {
                // Discard the &[u8] return to avoid a lifetime escape in FnMut.
                let _ = better_hex::decode_to_slice(black_box(h.as_slice()), black_box(dst.as_mut_slice()));
            });
        });

        // const_hex::decode_to_slice accepts AsRef<[u8]>.
        #[cfg(feature = "_bench_const_hex")]
        group.bench_with_input(BenchmarkId::new("const_hex", size), &hex, |b, h| {
            b.iter(|| const_hex::decode_to_slice(black_box(h.as_slice()), black_box(dst.as_mut_slice())));
        });

        #[cfg(feature = "_bench_faster_hex")]
        group.bench_with_input(BenchmarkId::new("faster_hex", size), &hex, |b, h| {
            b.iter(|| faster_hex::hex_decode(black_box(h.as_slice()), black_box(dst.as_mut_slice())));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: check
// ---------------------------------------------------------------------------

fn bench_check(c: &mut Criterion) {
    let mut group = c.benchmark_group("check");

    for &size in SIZES {
        // Throughput over the hex input (2× the original bytes).
        let hex = make_hex_bytes(size);
        let hex_len = hex.len() as u64;
        group.throughput(Throughput::Bytes(hex_len));

        group.bench_with_input(BenchmarkId::new("better_hex", size), &hex, |b, h| {
            b.iter(|| better_hex::check(black_box(h.as_slice())));
        });

        // const_hex::check accepts AsRef<[u8]>.
        #[cfg(feature = "_bench_const_hex")]
        group.bench_with_input(BenchmarkId::new("const_hex", size), &hex, |b, h| {
            b.iter(|| const_hex::check(black_box(h.as_slice())));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: display_format
// ---------------------------------------------------------------------------

fn bench_display_format(c: &mut Criterion) {
    let mut group = c.benchmark_group("display_format");

    const DISPLAY_SIZES: &[usize] = &[16, 64, 256, 1024, 4096];

    for &size in DISPLAY_SIZES {
        let input = make_bytes(size);
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_with_input(BenchmarkId::new("better_hex", size), &input, |b, inp| {
            b.iter(|| format!("{}", better_hex::display(black_box(inp.as_slice()))));
        });

        // const_hex exposes a Buffer<N> for stack-based formatting, but also
        // implements Display for its encode result via the encode() function.
        // The idiomatic display path uses format! with the string from encode().
        #[cfg(feature = "_bench_const_hex")]
        group.bench_with_input(BenchmarkId::new("const_hex", size), &input, |b, inp| {
            b.iter(|| const_hex::encode(black_box(inp.as_slice())));
        });
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// Group: serde_serialize / serde_deserialize
// ---------------------------------------------------------------------------

#[cfg(feature = "serde")]
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

#[cfg(feature = "serde")]
fn bench_serde_serialize(c: &mut Criterion) {
    use serde_bench::BetterHexWrap;

    let mut group = c.benchmark_group("serde_serialize");
    const SERDE_SIZES: &[usize] = &[16, 64, 256, 1024];

    for &size in SERDE_SIZES {
        let data: Vec<u8> = (0..size).map(|i| (i & 0xff) as u8).collect();
        group.throughput(Throughput::Bytes(size as u64));

        let bh_val = BetterHexWrap { data: data.clone() };
        group.bench_with_input(BenchmarkId::new("better_hex", size), &bh_val, |b, val| {
            b.iter(|| serde_json::to_string(black_box(val)).unwrap());
        });

        #[cfg(feature = "_bench_const_hex")]
        {
            use serde_bench::ConstHexWrap;
            let ch_val = ConstHexWrap { data: data.clone() };
            group.bench_with_input(BenchmarkId::new("const_hex", size), &ch_val, |b, val| {
                b.iter(|| serde_json::to_string(black_box(val)).unwrap());
            });
        }
    }

    group.finish();
}

#[cfg(feature = "serde")]
fn bench_serde_deserialize(c: &mut Criterion) {
    use serde_bench::BetterHexWrap;

    let mut group = c.benchmark_group("serde_deserialize");
    const SERDE_SIZES: &[usize] = &[16, 64, 256, 1024];

    for &size in SERDE_SIZES {
        let data: Vec<u8> = (0..size).map(|i| (i & 0xff) as u8).collect();
        group.throughput(Throughput::Bytes(size as u64));

        // Pre-build JSON strings outside the measurement loop.
        let bh_json = serde_json::to_string(&BetterHexWrap { data: data.clone() }).unwrap();
        group.bench_with_input(BenchmarkId::new("better_hex", size), &bh_json, |b, json| {
            b.iter(|| serde_json::from_str::<BetterHexWrap>(black_box(json)).unwrap());
        });

        #[cfg(feature = "_bench_const_hex")]
        {
            use serde_bench::ConstHexWrap;
            let ch_json = serde_json::to_string(&ConstHexWrap { data: data.clone() }).unwrap();
            group.bench_with_input(BenchmarkId::new("const_hex", size), &ch_json, |b, json| {
                b.iter(|| serde_json::from_str::<ConstHexWrap>(black_box(json)).unwrap());
            });
        }
    }

    group.finish();
}

// ---------------------------------------------------------------------------
// criterion_group / criterion_main
// ---------------------------------------------------------------------------

#[cfg(feature = "serde")]
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

#[cfg(not(feature = "serde"))]
criterion_group!(
    benches,
    bench_encode_alloc,
    bench_encode_to_slice,
    bench_decode_alloc,
    bench_decode_to_slice,
    bench_check,
    bench_display_format,
);

criterion_main!(benches);
