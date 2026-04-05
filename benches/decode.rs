#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{ct_scalar, dispatched_ct_decode, dispatched_decode, scalar};
#[cfg(feature = "_bench_internals")]
use core::mem::MaybeUninit;
#[cfg(feature = "_bench_internals")]
use criterion::{BenchmarkId, Throughput};
use criterion::{Criterion, criterion_group, criterion_main};
#[cfg(feature = "_bench_internals")]
use std::hint::black_box;
#[cfg(feature = "_bench_internals")]
mod common;

/// Case-fold nibble decoder (jedisct1-style): merges upper/lower into one range check.
#[cfg(feature = "_bench_internals")]
#[inline(always)]
const fn ct_decode_nibble_casefold(byte: u8) -> u16 {
    let b = byte as i16;
    let upper = b & !0x20; // 'a'-'f' → 'A'-'F'
    let mut ret: i16 = -1;
    ret += (((0x2Fi16 - b) & (b - 0x3A)) >> 8) & (b - 47); // '0'-'9'
    ret += (((0x40i16 - upper) & (upper - 0x47)) >> 8) & (upper - 54); // 'A'-'F' + 'a'-'f'
    ret as u16
}

/// Decode loop using the case-fold nibble decoder, for benchmarking against `ct_scalar::decode`.
#[cfg(feature = "_bench_internals")]
#[inline(never)]
fn ct_decode_casefold(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) -> Result<(), better_hex::Error> {
    let mut err: u16 = 0;
    for (pair, out_byte) in input.chunks_exact(2).zip(output.iter_mut()) {
        let hi = ct_decode_nibble_casefold(pair[0]);
        let lo = ct_decode_nibble_casefold(pair[1]);
        err |= hi >> 8;
        err |= lo >> 8;
        out_byte.write(((hi << 4) | lo) as u8);
    }
    if err != 0 { Err(better_hex::Error::InvalidEncoding) } else { Ok(()) }
}

#[cfg(feature = "_bench_internals")]
fn bench_decode(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new_hex(size);
        let mut output: Vec<MaybeUninit<u8>> = vec![MaybeUninit::uninit(); size];

        // Throughput is measured in *output* (decoded) bytes.
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            b.iter(|| scalar::decode(black_box(bufs.next()), black_box(output.as_mut_slice())).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_scalar", size), |b| {
            b.iter(|| ct_scalar::decode(black_box(bufs.next()), black_box(output.as_mut_slice())).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_casefold", size), |b| {
            b.iter(|| ct_decode_casefold(black_box(bufs.next()), black_box(output.as_mut_slice())).unwrap())
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            b.iter(|| {
                better_hex::bench_internals::neon::decode(black_box(bufs.next()), black_box(output.as_mut_slice()))
                    .unwrap()
            })
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon_ct", size), |b| {
            b.iter(|| {
                better_hex::bench_internals::neon::ct_decode(
                    black_box(bufs.next()),
                    black_box(output.as_mut_slice()),
                )
                .unwrap()
            })
        });

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            b.iter(|| dispatched_decode(black_box(bufs.next()), black_box(output.as_mut_slice())).unwrap())
        });

        group.bench_function(BenchmarkId::new("dispatched_ct", size), |b| {
            b.iter(|| dispatched_ct_decode(black_box(bufs.next()), black_box(output.as_mut_slice())).unwrap())
        });
    }

    group.finish();
}

#[cfg(not(feature = "_bench_internals"))]
fn bench_decode(_c: &mut Criterion) {
    panic!("Re-run with --features _bench_internals");
}

criterion_group!(benches, bench_decode);
criterion_main!(benches);
