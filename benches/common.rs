use rand_core::{Rng, SeedableRng};
use rand_xoshiro::Xoshiro256PlusPlus;

pub const BENCH_SIZES: &[usize] = &[
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 64, 256, 1024, 16384,
];

const SEED: u64 = 0x7f4a_7c15_9e37_79b9;
const MAX_ALLOC: usize = 16 * 1024 * 1024; // 16 MiB
pub struct Buffers {
    buffers: Vec<Box<[u8]>>,
    index: usize,
}

#[allow(dead_code)]
impl Buffers {
    pub fn new(size: usize) -> Self {
        let mut rng = Xoshiro256PlusPlus::seed_from_u64(SEED);
        let count = (MAX_ALLOC / size).max(2);
        let buffers = (0..count)
            .map(|_| {
                let mut buf = vec![0u8; size];
                rng.fill_bytes(&mut buf);
                buf.into_boxed_slice()
            })
            .collect();
        Self { buffers, index: 0 }
    }

    pub fn new_hex(size: usize) -> Self {
        let mut rng = Xoshiro256PlusPlus::seed_from_u64(SEED);
        let count = (MAX_ALLOC / (size * 2)).max(2);
        let buffers = (0..count)
            .map(|_| {
                let mut buf = vec![0u8; size];
                rng.fill_bytes(&mut buf);
                better_hex::encode::<String>(&buf)
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
}
