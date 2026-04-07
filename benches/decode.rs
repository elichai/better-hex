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

/// Original 3-range constant-time nibble decoder, before it was replaced by the
/// case-fold variant in `ct_scalar`. Tests each hex range independently:
/// `'0'-'9'`, `'A'-'F'`, `'a'-'f'` — three masked adds vs two in the casefold
/// version. Kept here to benchmark the regression/improvement from the switch.
#[cfg(feature = "_bench_internals")]
#[inline(always)]
const fn ct_decode_nibble_3range(byte: u8) -> u16 {
    let b = byte as i16;
    let mut ret: i16 = -1;
    ret += (((0x2Fi16 - b) & (b - 0x3A)) >> 8) & (b - 47); // '0'-'9'
    ret += (((0x40i16 - b) & (b - 0x47)) >> 8) & (b - 54); // 'A'-'F'
    ret += (((0x60i16 - b) & (b - 0x67)) >> 8) & (b - 86); // 'a'-'f'
    ret as u16
}

/// Full decode loop using the 3-range nibble decoder, matching the structure of
/// `ct_scalar::decode` but with the old nibble function. Used to measure the
/// isolated effect of switching from 3-range to casefold nibble decoding.
#[cfg(feature = "_bench_internals")]
#[inline(never)]
fn ct_decode_3range(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), better_hex::Error> {
    let mut err: u16 = 0;
    for (pair, out_byte) in input.chunks_exact(2).zip(output.iter_mut()) {
        let hi = ct_decode_nibble_3range(pair[0]);
        let lo = ct_decode_nibble_3range(pair[1]);
        err |= hi >> 8;
        err |= lo >> 8;
        out_byte.write(((hi << 4) | lo) as u8);
    }
    if err != 0 {
        Err(better_hex::Error::InvalidEncoding)
    } else {
        Ok(())
    }
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

        group.bench_function(BenchmarkId::new("ct_3range", size), |b| {
            b.iter(|| ct_decode_3range(black_box(bufs.next()), black_box(output.as_mut_slice())).unwrap())
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
                better_hex::bench_internals::neon::ct_decode(black_box(bufs.next()), black_box(output.as_mut_slice()))
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
