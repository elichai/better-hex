use rand_core::{Rng, SeedableRng};
use rand_xoshiro::Xoshiro256PlusPlus;

pub const BENCH_SIZES: &[usize] = &[
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 64, 256, 1024, 4096, 16384,
];

const BASE_SEED: u64 = 0x7f4a_7c15_9e37_79b9;
const SIZE_MIX: u64 = 0xbf58_476d_1ce4_e5b9;

pub fn make_bytes(size: usize) -> Vec<u8> {
    let seed = BASE_SEED ^ (size as u64).wrapping_mul(SIZE_MIX);
    let mut rng = Xoshiro256PlusPlus::seed_from_u64(seed);
    let mut bytes = vec![0u8; size];
    rng.fill_bytes(&mut bytes);
    bytes
}
