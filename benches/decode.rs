#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::{ct_scalar, dispatched_ct_decode, dispatched_decode, scalar};
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

/// Per-nibble casefold decoder (pre-SWAR): the casefold nibble function with a
/// simple per-byte loop. This was the ct_scalar implementation before SWAR was added.
/// Kept here to measure SWAR improvement over the per-nibble baseline.
#[cfg(feature = "_bench_internals")]
#[inline(always)]
const fn ct_decode_nibble_casefold(byte: u8) -> u16 {
    let b = byte as i16;
    let upper = b & !0x20;
    let mut ret: i16 = -1;
    ret += (((0x2Fi16 - b) & (b - 0x3A)) >> 8) & (b - 47);
    ret += (((0x40i16 - upper) & (upper - 0x47)) >> 8) & (upper - 54);
    ret as u16
}

#[cfg(feature = "_bench_internals")]
#[inline(never)]
unsafe fn ct_decode_casefold(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), better_hex::Error> {
    unsafe {
        let mut err: u16 = 0;
        for i in 0..byte_len {
            let hi = ct_decode_nibble_casefold(src.add(i * 2).read());
            let lo = ct_decode_nibble_casefold(src.add(i * 2 + 1).read());
            err |= hi >> 8;
            err |= lo >> 8;
            dst.add(i).write(((hi << 4) | lo) as u8);
        }
        if err != 0 {
            Err(better_hex::Error::InvalidEncoding)
        } else {
            Ok(())
        }
    }
}

/// Full decode loop using the 3-range nibble decoder, matching the structure of
/// `ct_scalar::decode` but with the old nibble function. Used to measure the
/// isolated effect of switching from 3-range to casefold nibble decoding.
#[cfg(feature = "_bench_internals")]
#[inline(never)]
unsafe fn ct_decode_3range(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), better_hex::Error> {
    let mut err: u16 = 0;
    for i in 0..byte_len {
        let hi = ct_decode_nibble_3range(unsafe { src.add(i * 2).read() });
        let lo = ct_decode_nibble_3range(unsafe { src.add(i * 2 + 1).read() });
        err |= hi >> 8;
        err |= lo >> 8;
        unsafe { dst.add(i).write(((hi << 4) | lo) as u8) };
    }
    if err != 0 {
        Err(better_hex::Error::InvalidEncoding)
    } else {
        Ok(())
    }
}

/// 2x-unrolled casefold per-nibble: processes 2 output bytes (4 nibbles) per
/// iteration for better ILP. Same algorithm as ct_casefold but with manual
/// unrolling to give the CPU 4 independent nibble computations to pipeline.
#[cfg(feature = "_bench_internals")]
#[inline(never)]
unsafe fn ct_decode_casefold_unrolled(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), better_hex::Error> {
    unsafe {
        let mut err: u16 = 0;
        let pairs_end = byte_len & !1;
        let mut i = 0usize;

        while i < pairs_end {
            let h0 = ct_decode_nibble_casefold(src.add(i * 2).read());
            let l0 = ct_decode_nibble_casefold(src.add(i * 2 + 1).read());
            let h1 = ct_decode_nibble_casefold(src.add(i * 2 + 2).read());
            let l1 = ct_decode_nibble_casefold(src.add(i * 2 + 3).read());
            err |= (h0 | l0 | h1 | l1) >> 8;
            dst.add(i).write(((h0 << 4) | l0) as u8);
            dst.add(i + 1).write(((h1 << 4) | l1) as u8);
            i += 2;
        }

        // Handle odd trailing byte
        if i < byte_len {
            let hi = ct_decode_nibble_casefold(src.add(i * 2).read());
            let lo = ct_decode_nibble_casefold(src.add(i * 2 + 1).read());
            err |= (hi | lo) >> 8;
            dst.add(i).write(((hi << 4) | lo) as u8);
        }

        if err != 0 {
            Err(better_hex::Error::InvalidEncoding)
        } else {
            Ok(())
        }
    }
}

/// SWAR u64 decode: processes 8 hex chars per u64 iteration using carry-safe
/// byte-parallel arithmetic. Faster than per-nibble at ≥4 bytes on aarch64
/// and ≥24 bytes on x86, but has a validation gap (accepts `:;<=>?@`).
/// Kept here for benchmarking only — NOT used in production ct_scalar.
#[cfg(feature = "_bench_internals")]
#[inline(never)]
unsafe fn ct_decode_swar(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), better_hex::Error> {
    const H: u64 = u64::from_ne_bytes([0x80; 8]);
    const ONES: u64 = u64::from_ne_bytes([0x01; 8]);
    const LO_NIBBLES: u64 = u64::from_ne_bytes([0x0F; 8]);
    const CASE_FOLD: u64 = u64::from_ne_bytes([0xDF; 8]);

    #[inline(always)]
    fn decode_nibbles(v: u64) -> (u64, u64) {
        let sub = ((v | H).wrapping_sub(u64::from_ne_bytes([0x30; 8]))) & !H;
        let folded = sub & CASE_FOLD;
        let is_letter = (folded >> 4) & ONES;
        let nibbles = folded.wrapping_sub(is_letter * 7);
        let invalid = nibbles & !LO_NIBBLES;
        (nibbles, invalid)
    }

    #[inline(always)]
    fn pack(nibbles: u64) -> u32 {
        let hi = (nibbles & 0x000F_000F_000F_000F) << 4;
        let lo = (nibbles >> 8) & 0x000F_000F_000F_000F;
        let combined = hi | lo;
        let b0 = combined as u8;
        let b1 = (combined >> 16) as u8;
        let b2 = (combined >> 32) as u8;
        let b3 = (combined >> 48) as u8;
        u32::from_le_bytes([b0, b1, b2, b3])
    }

    unsafe {
        let mut err: u64 = 0;
        let swar_end = byte_len & !3;
        let mut inp = src.cast::<u64>();
        let inp_end = src.add(swar_end * 2).cast::<u64>();
        let mut out = dst.cast::<u32>();

        while inp < inp_end {
            let v = u64::from_le(inp.read_unaligned());
            let (nibbles, invalid) = decode_nibbles(v);
            err |= invalid;
            out.write_unaligned(pack(nibbles));
            inp = inp.add(1);
            out = out.add(1);
        }

        let mut src_tail = inp.cast::<u8>();
        let mut dst_tail = out.cast::<u8>();
        let src_end = src.add(byte_len * 2);
        while src_tail < src_end {
            let hi = ct_decode_nibble_casefold(src_tail.read());
            let lo = ct_decode_nibble_casefold(src_tail.add(1).read());
            err |= (hi >> 8) as u64;
            err |= (lo >> 8) as u64;
            dst_tail.write(((hi << 4) | lo) as u8);
            src_tail = src_tail.add(2);
            dst_tail = dst_tail.add(1);
        }

        if err != 0 {
            Err(better_hex::Error::InvalidEncoding)
        } else {
            Ok(())
        }
    }
}

/// Agent's improved SWAR: better validation (ge10/ge11 gap detection + hi_err)
/// and OR-shift cascade pack. 16 ALU ops for decode, 9 for pack.
#[cfg(feature = "_bench_internals")]
#[inline(never)]
unsafe fn ct_decode_agent_swar(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), better_hex::Error> {
    const ONES: u64 = u64::from_ne_bytes([0x01; 8]);
    const H: u64 = u64::from_ne_bytes([0x80; 8]);
    const LO_NIBBLES: u64 = u64::from_ne_bytes([0x0F; 8]);

    #[inline(always)]
    fn decode_nibbles(v: u64) -> (u64, u64) {
        let t = ((v | H) - (ONES * 0x30)) & !H;
        let fold = t & !(ONES << 5);
        let ge10 = (t + (ONES * 0x76)) & H;
        let ge11 = (fold + (ONES * 0x6F)) & H;
        let correction = (ge11 >> 7) * 7;
        let result = fold - correction;
        let nibbles = result & LO_NIBBLES;
        let err1 = result & !LO_NIBBLES;
        let gap_err = ge10 ^ ge11;
        let hi_err = v & H;
        (nibbles, err1 | gap_err | hi_err)
    }

    #[inline(always)]
    fn pack(nibbles: u64) -> u32 {
        let combined = ((nibbles << 4) | (nibbles >> 8)) & 0x00FF_00FF_00FF_00FF;
        let t1 = combined | (combined >> 8);
        let t2 = t1 & 0x0000_FFFF_0000_FFFF;
        let t3 = t2 | (t2 >> 16);
        t3 as u32
    }

    unsafe {
        let mut err: u64 = 0;
        let swar_end = byte_len & !3;
        let mut inp = src.cast::<u64>();
        let inp_end = src.add(swar_end * 2).cast::<u64>();
        let mut out = dst.cast::<u32>();

        while inp < inp_end {
            let v = u64::from_le(inp.read_unaligned());
            let (nibbles, invalid) = decode_nibbles(v);
            err |= invalid;
            out.write_unaligned(pack(nibbles));
            inp = inp.add(1);
            out = out.add(1);
        }

        let mut src_tail = inp.cast::<u8>();
        let mut dst_tail = out.cast::<u8>();
        let src_end = src.add(byte_len * 2);
        while src_tail < src_end {
            let hi = ct_decode_nibble_casefold(src_tail.read());
            let lo = ct_decode_nibble_casefold(src_tail.add(1).read());
            err |= (hi >> 8) as u64;
            err |= (lo >> 8) as u64;
            dst_tail.write(((hi << 4) | lo) as u8);
            src_tail = src_tail.add(2);
            dst_tail = dst_tail.add(1);
        }

        if err != 0 {
            Err(better_hex::Error::InvalidEncoding)
        } else {
            Ok(())
        }
    }
}

/// Variable-shift Lemire table lookup: uses the (byte-1)>>4 hash to index
/// into two packed u64 tables (delta_check + delta_rebase) via variable shift.
/// ~9 ops per nibble, serial dependency chain.
#[cfg(feature = "_bench_internals")]
#[allow(dead_code)] // Reference implementation kept for comparison with the _ct variant.
#[inline(always)]
const fn ct_decode_nibble_varshift(byte: u8) -> u16 {
    // Lemire delta_rebase: entries at indices 2,3,4,6; rest=0
    const REBASE: u64 = 0x00AA_00CA_D1D1_0000u64;
    // Lemire delta_check: entries at indices 3,4,6 are the key valid ones
    // index 0: -16=0xF0, 1: -32=0xE0, 2: -47=0xD1, 3: 71=0x47
    // 4: 58=0x3A, 5: -96=0xA0, 6: 26=0x1A, 7: -128=0x80
    const CHECK: u64 = 0x801A_A03A_47D1_E0F0u64;

    let vm1 = byte.wrapping_sub(1);
    let index = (vm1 >> 4) as u64;
    let shift = index << 3; // index * 8

    let rebase_delta = ((REBASE >> shift) & 0xFF) as u8;
    let check_delta = ((CHECK >> shift) & 0xFF) as u8;

    let nibble = vm1.wrapping_add(rebase_delta);
    let check = vm1.wrapping_add(check_delta);

    // Valid if check < 0x80 (MSB clear) AND nibble <= 15
    if (check & 0x80) != 0 || nibble > 15 {
        0xFF00 | nibble as u16 // set error bits
    } else {
        nibble as u16
    }
}

/// Non-branching version of the variable-shift approach for fair CT comparison.
#[cfg(feature = "_bench_internals")]
#[inline(always)]
const fn ct_decode_nibble_varshift_ct(byte: u8) -> u16 {
    const REBASE: u64 = 0x00AA_00CA_D1D1_0000u64;
    const CHECK: u64 = 0x801A_A03A_47D1_E0F0u64;

    let vm1 = byte.wrapping_sub(1);
    let index = (vm1 >> 4) as u64;
    let shift = index << 3;

    let rebase_delta = ((REBASE >> shift) & 0xFF) as u8;
    let check_delta = ((CHECK >> shift) & 0xFF) as u8;

    let nibble = vm1.wrapping_add(rebase_delta);
    let check = vm1.wrapping_add(check_delta);

    // Branchless: OR error bits if check MSB set
    let err = ((check as u16) >> 7) << 8; // 0x100 if invalid, 0 if valid
    nibble as u16 | err
}

#[cfg(feature = "_bench_internals")]
#[inline(never)]
unsafe fn ct_decode_varshift(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), better_hex::Error> {
    unsafe {
        let mut err: u16 = 0;
        for i in 0..byte_len {
            let hi = ct_decode_nibble_varshift_ct(src.add(i * 2).read());
            let lo = ct_decode_nibble_varshift_ct(src.add(i * 2 + 1).read());
            err |= hi >> 8;
            err |= lo >> 8;
            dst.add(i).write(((hi << 4) | lo) as u8);
        }
        if err != 0 {
            Err(better_hex::Error::InvalidEncoding)
        } else {
            Ok(())
        }
    }
}

#[cfg(feature = "_bench_internals")]
#[inline(always)]
fn call(
    decode_fn: unsafe fn(*const u8, *mut u8, usize) -> Result<(), better_hex::Error>,
    input: &[u8],
    output: &mut [u8],
) -> Result<(), better_hex::Error> {
    assert_eq!(
        input.len(),
        output.len() * 2,
        "input length must be twice output length"
    );
    // SAFETY: `decode_fn` requires valid pointers and length; these come from valid slices.
    // The backend will overwrite every element on success.
    unsafe { decode_fn(input.as_ptr(), output.as_mut_ptr().cast(), output.len()) }
}

#[cfg(feature = "_bench_internals")]
fn bench_decode(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode");

    for &size in common::BENCH_SIZES {
        let mut bufs = common::Buffers::new_hex(size);
        let mut output: Vec<u8> = vec![0; size];

        // Throughput is measured in *output* (decoded) bytes.
        group.throughput(Throughput::Bytes(size as u64));

        group.bench_function(BenchmarkId::new("scalar", size), |b| {
            b.iter(|| call(scalar::decode, black_box(bufs.next()), black_box(&mut output)).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_scalar", size), |b| {
            b.iter(|| call(ct_scalar::decode, black_box(bufs.next()), black_box(&mut output)).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_casefold", size), |b| {
            b.iter(|| call(ct_decode_casefold, black_box(bufs.next()), black_box(&mut output)).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_unrolled", size), |b| {
            b.iter(|| {
                call(
                    ct_decode_casefold_unrolled,
                    black_box(bufs.next()),
                    black_box(&mut output),
                )
                .unwrap()
            })
        });

        group.bench_function(BenchmarkId::new("ct_swar", size), |b| {
            b.iter(|| call(ct_decode_swar, black_box(bufs.next()), black_box(&mut output)).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_agent_swar", size), |b| {
            b.iter(|| call(ct_decode_agent_swar, black_box(bufs.next()), black_box(&mut output)).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_varshift", size), |b| {
            b.iter(|| call(ct_decode_varshift, black_box(bufs.next()), black_box(&mut output)).unwrap())
        });

        group.bench_function(BenchmarkId::new("ct_3range", size), |b| {
            b.iter(|| call(ct_decode_3range, black_box(bufs.next()), black_box(&mut output)).unwrap())
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon", size), |b| {
            b.iter(|| {
                call(
                    better_hex::bench_internals::neon::decode,
                    black_box(bufs.next()),
                    black_box(&mut output),
                )
                .unwrap()
            })
        });

        #[cfg(all(not(feature = "disable-simd"), target_arch = "aarch64", target_feature = "neon"))]
        group.bench_function(BenchmarkId::new("neon_ct", size), |b| {
            b.iter(|| {
                call(
                    better_hex::bench_internals::neon::ct_decode,
                    black_box(bufs.next()),
                    black_box(&mut output),
                )
                .unwrap()
            })
        });

        group.bench_function(BenchmarkId::new("dispatched", size), |b| {
            let out_mu = unsafe { &mut *(output.as_mut_slice() as *mut [u8] as *mut [core::mem::MaybeUninit<u8>]) };
            b.iter(|| dispatched_decode(black_box(bufs.next()), black_box(out_mu)).unwrap())
        });

        group.bench_function(BenchmarkId::new("dispatched_ct", size), |b| {
            let out_mu = unsafe { &mut *(output.as_mut_slice() as *mut [u8] as *mut [core::mem::MaybeUninit<u8>]) };
            b.iter(|| dispatched_ct_decode(black_box(bufs.next()), black_box(out_mu)).unwrap())
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
