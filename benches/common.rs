use rand_core::{Rng, SeedableRng};
use rand_xoshiro::Xoshiro256PlusPlus;
use std::mem::MaybeUninit;
use std::ops::Range;

pub const BENCH_SIZES: &[usize] = &[
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 256, 16384,
];

const SEED: u64 = 0x7f4a_7c15_9e37_79b9;
const MAX_ALLOC: usize = 16 * 1024 * 1024; // 16 MiB
const MAX_BUFFERS: usize = 64 * 1024;
pub struct Buffers {
    buffers: Vec<Box<[u8]>>,
    index: usize,
}

pub struct JsonHexTemplate {
    buf: Vec<u8>,
    hex_range: Range<usize>,
}

#[allow(dead_code)]
impl Buffers {
    pub fn new(size: usize) -> Self {
        let mut rng = Xoshiro256PlusPlus::seed_from_u64(SEED);
        let count = buffer_count(size);
        let buffers = (0..count)
            .map(|_| {
                let mut buf = vec![0u8; size];
                rng.fill_bytes(&mut buf);
                buf.into_boxed_slice()
            })
            .collect();
        Self { buffers, index: 0 }
    }

    /// Hex-encoded buffers for decode/check benches.
    ///
    /// Alternates lower- and upper-case buffers: every `next()` call returns
    /// a buffer whose case differs from the previous call's. Decode/check
    /// backends take the case-fold at runtime, so the reported throughput
    /// is an average over both paths. If you need a pure-lower or pure-upper
    /// measurement, generate a dedicated buffer set.
    pub fn new_hex(size: usize) -> Self {
        let mut rng = Xoshiro256PlusPlus::seed_from_u64(SEED);
        let count = buffer_count(size * 2);
        let buffers = (0..count)
            .enumerate()
            .map(|(idx, _)| {
                let mut buf = vec![0u8; size];
                rng.fill_bytes(&mut buf);
                if idx % 2 == 0 {
                    better_hex::encode::<String>(&buf)
                } else {
                    better_hex::encode_upper::<String>(&buf)
                }
                .unwrap()
                .into_bytes()
                .into_boxed_slice()
            })
            .collect();
        Self { buffers, index: 0 }
    }

    pub fn next(&mut self) -> &[u8] {
        let buf = &self.buffers[self.index];
        self.index = (self.index + 1) % self.buffers.len();
        buf
    }

    pub fn next_array<const N: usize>(&mut self) -> &[u8; N] {
        self.next().as_array().unwrap()
    }
}

fn buffer_count(bytes_per_buffer: usize) -> usize {
    (MAX_ALLOC / bytes_per_buffer.max(1)).clamp(2, MAX_BUFFERS)
}

#[allow(dead_code)]
pub fn as_uninit_mut(bytes: &mut [u8]) -> &mut [MaybeUninit<u8>] {
    // SAFETY: `MaybeUninit<u8>` has the same layout as `u8`; widening an
    // initialized `u8` slice to uninitialized storage is valid.
    unsafe { &mut *(bytes as *mut [u8] as *mut [MaybeUninit<u8>]) }
}

#[allow(dead_code)]
impl JsonHexTemplate {
    pub fn new(hex_len: usize) -> Self {
        let prefix = b"{\"data\":\"";
        let suffix = b"\"}";
        let hex_start = prefix.len();
        let hex_end = hex_start + hex_len;

        let mut buf = Vec::with_capacity(prefix.len() + hex_len + suffix.len());
        buf.extend_from_slice(prefix);
        buf.resize(hex_end, b'0');
        buf.extend_from_slice(suffix);

        Self {
            buf,
            hex_range: hex_start..hex_end,
        }
    }

    pub fn update<'a>(&'a mut self, hex: &[u8]) -> &'a [u8] {
        assert_eq!(hex.len(), self.hex_range.len());
        self.buf[self.hex_range.clone()].copy_from_slice(hex);
        &self.buf
    }
}
