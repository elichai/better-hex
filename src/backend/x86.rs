//! x86 SSSE3/AVX2 hex backend.
//!
//! # Encoding
//!
//! Uses the `pshufb` (`_mm_shuffle_epi8`) instruction as a parallel 4-bit LUT
//! lookup. A 16-byte register holds the hex alphabet (`0-9a-f` or `0-9A-F`),
//! and nibbles extracted from input bytes serve as shuffle indices.
//!
//! **SSSE3 path** — processes 16 input bytes → 32 hex chars per iteration:
//! 1. Load a 16-byte chunk.
//! 2. Split each byte into high nibble (`>> 4 & 0x0F`) and low nibble (`& 0x0F`).
//! 3. `pshufb(lut, nibble)` maps each nibble to its hex character.
//! 4. `punpcklbw` / `punpckhbw` interleave high-then-low for correct ordering.
//! 5. Store 32 bytes.
//!
//! **AVX2 path** — processes 32 input bytes → 64 hex chars per iteration, same
//! algorithm but 256-bit. After `vpunpcklbw`/`vpunpckhbw`, a
//! `vperm2i128` fixup is needed because AVX2 unpack operates within
//! 128-bit lanes.
//!
//! # Decoding (Lemire 2023)
//!
//! Based on Daniel Lemire's SIMD hex decoding described in:
//! <https://lemire.me/blog/2023/12/22/fast-hexadecimal-decoding/>
//!
//! The key insight is to subtract 1 from each byte, then use the high nibble
//! of the result as a hash key into two `pshufb` lookup tables:
//!
//! - **`delta_check`**: adds a bias such that valid hex chars end up with
//!   MSB clear, invalid chars get MSB set → `pmovmskb` detects errors.
//! - **`delta_rebase`**: adds a bias that converts the char directly to its
//!   nibble value (0–15).
//!
//! After validation, `pmaddubsw` with `{1, 16}` packs adjacent nibble pairs
//! into bytes, and `packuswb` compresses 16-bit words back to bytes.
//!
//! # Check
//!
//! Reuses the Lemire `delta_check` validation table from the decode path:
//! for each 16-byte chunk, compute the check value and verify
//! `pmovmskb == 0` (all MSBs clear means all chars valid). Falls back to
//! scalar for the sub-16-byte tail.

#[cfg(target_arch = "x86")]
use core::arch::x86::*;
#[cfg(target_arch = "x86_64")]
use core::arch::x86_64::*;

use super::InvalidEncoding;
use crate::backend::scalar;

#[inline(always)]
unsafe fn hex_lut(upper: bool) -> __m128i {
    let lo = i64::from_le_bytes(*b"01234567");
    let hi = if upper {
        i64::from_le_bytes(*b"89ABCDEF")
    } else {
        i64::from_le_bytes(*b"89abcdef")
    };
    unsafe { _mm_set_epi64x(hi, lo) }
}

/// Hex-encode `input` into `output` using SSSE3 `pshufb` for the hot loop.
///
/// Processes 16 input bytes (→ 32 hex chars) per iteration, then delegates
/// any remaining tail bytes to the scalar backend.
///
/// # Safety
///
/// - The CPU must support SSSE3 (caller must have `#[target_feature(enable = "ssse3")]`).
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len * 2` bytes.
/// - The `src[..byte_len]` and `dst[..byte_len * 2]` regions must not overlap.
#[inline(always)]
unsafe fn encode_ssse3_inner(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize, upper: bool) {
    // SAFETY: all intrinsics below require SSSE3, guaranteed by #[target_feature].
    // Pointer arithmetic stays within the bounds guaranteed by the caller.
    unsafe {
        let lut = hex_lut(upper);
        let mask_lo = _mm_set1_epi8(0x0F);

        while byte_len >= 16 {
            let chunk = _mm_loadu_si128(src.cast());

            // Split nibbles.
            let lo = _mm_and_si128(chunk, mask_lo);
            let hi = _mm_and_si128(_mm_srli_epi16(chunk, 4), mask_lo);

            // LUT lookup: convert nibbles to hex ASCII.
            let hex_lo = _mm_shuffle_epi8(lut, lo);
            let hex_hi = _mm_shuffle_epi8(lut, hi);

            // Interleave: high nibble char first, then low nibble char.
            let out0 = _mm_unpacklo_epi8(hex_hi, hex_lo);
            let out1 = _mm_unpackhi_epi8(hex_hi, hex_lo);

            // Store 32 bytes (two __m128i).
            _mm_storeu_si128(dst.cast(), out0);
            _mm_storeu_si128(dst.add(16).cast(), out1);

            src = src.add(16);
            dst = dst.add(32);
            byte_len -= 16;
        }

        // Scalar tail.
        if byte_len > 0 {
            scalar::encode_inner(src, dst, byte_len, upper);
        }
    }
}

/// Thin wrapper around [`encode_ssse3_inner`]; see that function for details.
///
/// # Safety
///
/// Same as [`encode_ssse3_inner`].
#[target_feature(enable = "ssse3")]
pub unsafe fn encode_ssse3(src: *const u8, dst: *mut u8, byte_len: usize, upper: bool) {
    unsafe { encode_ssse3_inner(src, dst, byte_len, upper) }
}

/// Hex-encode `input` into `output` using AVX2 for the hot loop.
///
/// Processes 32 input bytes (→ 64 hex chars) per iteration, then falls
/// through to [`encode_ssse3_inner`] for the 16–31 byte middle range, and finally
/// to scalar for the sub-16-byte tail.
///
/// ## Cross-lane fixup
///
/// AVX2 `vpunpcklbw`/`vpunpckhbw` operate independently on each 128-bit
/// lane, producing an interleaving that is correct *within* each lane but
/// in the wrong lane order. `vperm2i128` with imm8 = `0x20` (lo-lo) and
/// `0x31` (hi-hi) reassembles the two halves correctly.
///
/// # Safety
///
/// - The CPU must support AVX2 (caller must have `#[target_feature(enable = "avx2")]`).
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len * 2` bytes.
/// - The `src[..byte_len]` and `dst[..byte_len * 2]` regions must not overlap.
#[inline(always)]
unsafe fn encode_avx2_inner(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize, upper: bool) {
    // SAFETY: all intrinsics below require AVX2, guaranteed by #[target_feature].
    unsafe {
        let lut = _mm256_broadcastsi128_si256(hex_lut(upper));
        let mask_lo = _mm256_set1_epi8(0x0F);

        while byte_len >= 32 {
            let chunk = _mm256_loadu_si256(src.cast());

            // Split nibbles.
            let lo = _mm256_and_si256(chunk, mask_lo);
            let hi = _mm256_and_si256(_mm256_srli_epi16(chunk, 4), mask_lo);

            // LUT lookup.
            let hex_lo = _mm256_shuffle_epi8(lut, lo);
            let hex_hi = _mm256_shuffle_epi8(lut, hi);

            // Interleave within lanes.
            let interleaved_lo = _mm256_unpacklo_epi8(hex_hi, hex_lo);
            let interleaved_hi = _mm256_unpackhi_epi8(hex_hi, hex_lo);

            // Cross-lane fixup: reassemble the correct byte order.
            // interleaved_lo has: [lane0_lo_interleave | lane1_lo_interleave]
            // interleaved_hi has: [lane0_hi_interleave | lane1_hi_interleave]
            // We need: [lane0_lo | lane0_hi] then [lane1_lo | lane1_hi]
            let out0 = _mm256_permute2x128_si256(interleaved_lo, interleaved_hi, 0x20);
            let out1 = _mm256_permute2x128_si256(interleaved_lo, interleaved_hi, 0x31);

            // Store 64 bytes (two __m256i).
            _mm256_storeu_si256(dst.cast(), out0);
            _mm256_storeu_si256(dst.add(32).cast(), out1);

            src = src.add(32);
            dst = dst.add(64);
            byte_len -= 32;
        }

        // Tail: fall through to SSSE3 for any remaining 16+ bytes, then scalar.
        if byte_len > 0 {
            encode_ssse3_inner(src, dst, byte_len, upper);
        }
    }
}

/// Thin wrapper around [`encode_avx2_inner`]; see that function for details.
///
/// # Safety
///
/// Same as [`encode_avx2_inner`].
#[target_feature(enable = "avx2")]
pub unsafe fn encode_avx2(src: *const u8, dst: *mut u8, byte_len: usize, upper: bool) {
    unsafe { encode_avx2_inner(src, dst, byte_len, upper) }
}

/// Build the `delta_check` table for the Lemire SSSE3 hex-decode algorithm.
///
/// Given a byte `v` from the hex input, we compute `vm1 = v - 1` and use
/// `(vm1 >> 4) & 0x0F` as a hash key into this table. Adding the looked-up
/// delta to `vm1` yields a value whose MSB is clear for valid hex characters
/// and set for invalid ones.
///
/// The table entries are derived by analyzing which `vm1 >> 4` buckets the
/// three valid hex ranges (`'0'-'9'`, `'A'-'F'`, `'a'-'f'`) hash into after
/// the subtract-one step, then choosing constants that place valid chars in
/// the non-negative (MSB-clear) range of signed i8 arithmetic.
///
/// # Safety
///
/// - The CPU must support SSSE3 (caller must have `#[target_feature(enable = "ssse3")]`).
#[inline(always)]
unsafe fn decode_delta_check_128() -> __m128i {
    // SAFETY: caller guarantees SSSE3.
    unsafe {
        _mm_setr_epi8(
            -16,  // hash 0
            -32,  // hash 1
            -47,  // hash 2 — unused bucket, set to reject
            71,   // hash 3 — digits '0'-'9' map here (vm1 = 0x2F..0x38)
            58,   // hash 4 — uppercase 'A'-'F' (vm1 = 0x40..0x45)
            -96,  // hash 5
            26,   // hash 6 — lowercase 'a'-'f' (vm1 = 0x60..0x65)
            -128, // hash 7
            0, 0, 0, 0, 0, 0, 0, 0,
        )
    }
}

/// Build the `delta_rebase` table for the Lemire SSSE3 hex-decode algorithm.
///
/// After the same hashing step as [`decode_delta_check_128`], adding this
/// table's value to `vm1` yields the actual nibble value (0–15) for valid
/// hex characters.
///
/// - Digits `'0'-'9'`: `vm1` is `0x2F..0x38`, we need result `0..9`,
///   so delta = `-(0x30 - 1)` = `-47` = `-48 + 1`.
/// - Uppercase `'A'-'F'`: `vm1` is `0x40..0x45`, we need `10..15`,
///   so delta = `-(0x41 - 1) + 10` = `-54` = `-55 + 1`.
/// - Lowercase `'a'-'f'`: `vm1` is `0x60..0x65`, we need `10..15`,
///   so delta = `-(0x61 - 1) + 10` = `-86` = `-87 + 1`.
///
/// # Safety
///
/// - The CPU must support SSSE3 (caller must have `#[target_feature(enable = "ssse3")]`).
#[inline(always)]
unsafe fn decode_delta_rebase_128() -> __m128i {
    // SAFETY: caller guarantees SSSE3.
    unsafe {
        _mm_setr_epi8(
            0,
            0,
            -48 + 1, // hash 2: digits '0'-'7' (vm1 high nibble = 2)
            -48 + 1, // hash 3: digits '8'-'9' (vm1 high nibble = 3)
            -55 + 1, // hash 4: uppercase 'A'-'F'
            0,
            -87 + 1, // hash 6: lowercase 'a'-'f'
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
        )
    }
}

/// Decode a single 128-bit register (16 hex chars → 8 output bytes) using
/// the Lemire algorithm. Returns `(packed_bytes, check_vector)`.
///
/// The `check_vector` has MSB set in each lane where the input byte was
/// invalid. Callers should OR multiple check vectors together and do a
/// single `_mm_movemask_epi8` at the end — this halves the number of
/// expensive horizontal-reduce operations per iteration.
///
/// # Safety
///
/// - The CPU must support SSSE3 (caller must have `#[target_feature(enable = "ssse3")]`).
#[inline(always)]
unsafe fn decode_chunk_128(
    chunk: __m128i,
    delta_check: __m128i,
    delta_rebase: __m128i,
    one: __m128i,
    mask_hi: __m128i,
    weights: __m128i,
) -> (__m128i, __m128i) {
    // SAFETY: caller guarantees SSSE3.
    unsafe {
        let vm1 = _mm_sub_epi8(chunk, one);
        let hash_key = _mm_and_si128(_mm_srli_epi16(vm1, 4), mask_hi);

        // check has MSB set for invalid bytes.
        let check = _mm_add_epi8(vm1, _mm_shuffle_epi8(delta_check, hash_key));
        let nibbles = _mm_add_epi8(vm1, _mm_shuffle_epi8(delta_rebase, hash_key));

        // Pack nibble pairs: hi*16 + lo via pmaddubsw, then narrow to u8.
        let packed16 = _mm_maddubs_epi16(nibbles, weights);
        let packed8 = _mm_packus_epi16(packed16, packed16);

        (packed8, check)
    }
}

/// Hex-decode `input` into `output` using SSSE3.
///
/// Processes 32 hex chars (two `__m128i` loads → 16 output bytes) per
/// iteration. Accumulates error bits across all chunks without branching
/// on validity (constant-time), then returns an error if any invalid byte
/// was detected.
///
/// # Safety
///
/// - The CPU must support SSSE3 (caller must have `#[target_feature(enable = "ssse3")]`).
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[inline(always)]
unsafe fn decode_ssse3_inner(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize) -> i32 {
    // SAFETY: all intrinsics below require SSSE3, guaranteed by #[target_feature].
    unsafe {
        let delta_check = decode_delta_check_128();
        let delta_rebase = decode_delta_rebase_128();
        let one = _mm_set1_epi8(1);
        let mask_hi = _mm_set1_epi8(0x0F);
        let weights = _mm_set1_epi16(0x0110);
        let mut err_accum = 0i32;

        // SSSE3: 16 output bytes per iteration (32 hex chars).
        while byte_len >= 16 {
            let chunk0 = _mm_loadu_si128(src.cast());
            let chunk1 = _mm_loadu_si128(src.add(16).cast());

            let (decoded0, check0) = decode_chunk_128(chunk0, delta_check, delta_rebase, one, mask_hi, weights);
            let (decoded1, check1) = decode_chunk_128(chunk1, delta_check, delta_rebase, one, mask_hi, weights);

            let combined_check = _mm_or_si128(check0, check1);
            err_accum |= _mm_movemask_epi8(combined_check);

            _mm_storel_epi64(dst.cast(), decoded0);
            _mm_storel_epi64(dst.add(8).cast(), decoded1);

            src = src.add(32);
            dst = dst.add(16);
            byte_len -= 16;
        }

        if byte_len > 0 {
            err_accum |= i32::from(scalar::decode_inner(src, dst, byte_len));
        }

        err_accum
    }
}

/// Hex-decode `input` into `output` using SSSE3.
///
/// Processes all chunks without short-circuiting on invalid input.
/// Returns `Err(InvalidEncoding)` if any byte was invalid.
///
/// # Safety
///
/// - The CPU must support SSSE3.
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[target_feature(enable = "ssse3")]
pub unsafe fn decode_ssse3(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), InvalidEncoding> {
    // SAFETY: caller guarantees SSSE3 and pointer validity.
    if unsafe { decode_ssse3_inner(src, dst, byte_len) } != 0 {
        Err(InvalidEncoding)
    } else {
        Ok(())
    }
}

/// Decode a single 256-bit register (32 hex chars → 16 output bytes) using
/// the Lemire algorithm, AVX2 variant.
///
/// Same as [`decode_chunk_128`] but for 256-bit AVX2 registers.
/// Returns `(packed_bytes, check_vector)`. The `packed_bytes` has the 16
/// decoded bytes after a lane-crossing permute fixup. Caller ORs check
/// vectors then does a single `_mm256_movemask_epi8`.
///
/// # Safety
///
/// - The CPU must support AVX2 (caller must have `#[target_feature(enable = "avx2")]`).
#[inline(always)]
unsafe fn decode_chunk_256(
    chunk: __m256i,
    delta_check: __m256i,
    delta_rebase: __m256i,
    one: __m256i,
    mask_hi: __m256i,
    weights: __m256i,
) -> (__m256i, __m256i) {
    // SAFETY: caller guarantees AVX2.
    unsafe {
        let vm1 = _mm256_sub_epi8(chunk, one);
        let hash_key = _mm256_and_si256(_mm256_srli_epi16(vm1, 4), mask_hi);

        let check = _mm256_add_epi8(vm1, _mm256_shuffle_epi8(delta_check, hash_key));
        let nibbles = _mm256_add_epi8(vm1, _mm256_shuffle_epi8(delta_rebase, hash_key));

        let packed16 = _mm256_maddubs_epi16(nibbles, weights);
        let packed8 = _mm256_packus_epi16(packed16, packed16);
        // Fix cross-lane ordering from packuswb.
        let result = _mm256_permute4x64_epi64(packed8, 0b_11_01_10_00);

        (result, check)
    }
}

/// Hex-decode `input` into `output` using AVX2.
///
/// Processes 64 hex chars (two `__m256i` loads → 32 output bytes) per
/// iteration. Accumulates error bits across all chunks without branching
/// on validity (constant-time).
///
/// # Safety
///
/// - The CPU must support AVX2 (caller must have `#[target_feature(enable = "avx2")]`).
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[inline(always)]
unsafe fn decode_avx2_inner(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize) -> i32 {
    // SAFETY: all intrinsics below require AVX2 (implies SSSE3),
    // guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm256_broadcastsi128_si256(decode_delta_check_128());
        let delta_rebase = _mm256_broadcastsi128_si256(decode_delta_rebase_128());
        let one = _mm256_set1_epi8(1);
        let mask_hi = _mm256_set1_epi8(0x0F);
        let weights = _mm256_set1_epi16(0x0110);
        let mut err_accum = 0i32;

        // AVX2: 32 output bytes per iteration (64 hex chars).
        while byte_len >= 32 {
            let chunk0 = _mm256_loadu_si256(src.cast());
            let chunk1 = _mm256_loadu_si256(src.add(32).cast());

            let (decoded0, check0) = decode_chunk_256(chunk0, delta_check, delta_rebase, one, mask_hi, weights);
            let (decoded1, check1) = decode_chunk_256(chunk1, delta_check, delta_rebase, one, mask_hi, weights);

            let combined_check = _mm256_or_si256(check0, check1);
            err_accum |= _mm256_movemask_epi8(combined_check);

            _mm_storeu_si128(dst.cast(), _mm256_castsi256_si128(decoded0));
            _mm_storeu_si128(dst.add(16).cast(), _mm256_castsi256_si128(decoded1));

            src = src.add(64);
            dst = dst.add(32);
            byte_len -= 32;
        }

        // Tail: fall through to SSSE3, then scalar.
        if byte_len > 0 {
            err_accum |= decode_ssse3_inner(src, dst, byte_len);
        }

        err_accum
    }
}

/// Hex-decode `input` into `output` using AVX2.
///
/// Processes all chunks without short-circuiting on invalid input.
/// Falls through to [`decode_ssse3`] for the tail.
/// Returns `Err(InvalidEncoding)` if any byte was invalid.
///
/// # Safety
///
/// - The CPU must support AVX2.
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[target_feature(enable = "avx2")]
pub unsafe fn decode_avx2(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), InvalidEncoding> {
    // SAFETY: caller guarantees AVX2 and pointer validity.
    if unsafe { decode_avx2_inner(src, dst, byte_len) } != 0 {
        Err(InvalidEncoding)
    } else {
        Ok(())
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using SSSE3 SIMD.
///
/// Reuses the Lemire `delta_check` validation from the decode path: for
/// each 16-byte chunk, computes `vm1 + shuffle(delta_check, hash_key)` and
/// checks that `pmovmskb == 0` (all MSBs clear ⇒ all chars valid).
/// Falls back to scalar for the sub-16-byte tail.
///
/// Accumulates validity across all chunks without early exit (constant-time).
///
/// # Safety
///
/// - The CPU must support SSSE3 (caller must have `#[target_feature(enable = "ssse3")]`).
#[inline(always)]
unsafe fn check_ssse3_inner(mut input: &[u8]) -> bool {
    // SAFETY: all intrinsics below require SSSE3, guaranteed by #[target_feature].
    unsafe {
        let delta_check = decode_delta_check_128();
        let one = _mm_set1_epi8(1);
        let mask_hi = _mm_set1_epi8(0x0F);
        let mut all_valid = true;

        while input.len() >= 16 {
            let chunk = _mm_loadu_si128(input.as_ptr().cast());

            let vm1 = _mm_sub_epi8(chunk, one);
            let hash_key = _mm_and_si128(_mm_srli_epi16(vm1, 4), mask_hi);
            let check = _mm_add_epi8(vm1, _mm_shuffle_epi8(delta_check, hash_key));

            all_valid &= _mm_movemask_epi8(check) == 0;

            // SAFETY: `input.len() >= 16` checked above.
            input = input.get_unchecked(16..);
        }

        all_valid & scalar::check(input)
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using SSSE3 SIMD.
///
/// Processes all chunks without short-circuiting on invalid input.
///
/// # Safety
///
/// Caller must ensure the CPU supports SSSE3.
#[target_feature(enable = "ssse3")]
pub unsafe fn check_ssse3(input: &[u8]) -> bool {
    // SAFETY: caller guarantees SSSE3.
    unsafe { check_ssse3_inner(input) }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX2 SIMD.
///
/// Reuses the Lemire `delta_check` validation from the decode path: for
/// each 32-byte chunk, broadcasts the 128-bit delta_check table to 256 bits
/// and computes `vm1 + shuffle(delta_check, hash_key)`, checking that
/// `_mm256_movemask_epi8 == 0` (all MSBs clear ⇒ all chars valid).
/// Falls back to `check_ssse3` for the sub-32-byte tail.
///
/// Accumulates validity across all chunks without early exit (constant-time).
///
/// # Safety
///
/// - The CPU must support AVX2 (caller must have `#[target_feature(enable = "avx2")]`).
#[inline(always)]
unsafe fn check_avx2_inner(mut input: &[u8]) -> bool {
    // SAFETY: all intrinsics below require AVX2, guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm256_broadcastsi128_si256(decode_delta_check_128());
        let one = _mm256_set1_epi8(1);
        let mask_hi = _mm256_set1_epi8(0x0F);
        let mut err_accum = 0i32;

        while input.len() >= 32 {
            let chunk = _mm256_loadu_si256(input.as_ptr().cast());

            let vm1 = _mm256_sub_epi8(chunk, one);
            let hash_key = _mm256_and_si256(_mm256_srli_epi16(vm1, 4), mask_hi);
            let check = _mm256_add_epi8(vm1, _mm256_shuffle_epi8(delta_check, hash_key));

            err_accum |= _mm256_movemask_epi8(check);

            // SAFETY: `input.len() >= 32` checked above.
            input = input.get_unchecked(32..);
        }

        (err_accum == 0) & check_ssse3_inner(input)
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX2 SIMD.
///
/// Processes all chunks without short-circuiting on invalid input.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX2.
#[target_feature(enable = "avx2")]
pub unsafe fn check_avx2(input: &[u8]) -> bool {
    // SAFETY: caller guarantees AVX2.
    unsafe { check_avx2_inner(input) }
}

/// Hex-encode `input` into `output` using AVX-512 VBMI for the hot loop.
///
/// Processes 64 input bytes (→ 128 hex chars) per iteration, then falls
/// through to [`encode_avx2_inner`] for the 32–63 byte middle range, and finally
/// down through SSSE3/scalar for smaller tails.
///
/// ## Byte-level interleaving via `vpermi2b`
///
/// After the nibble-split and `vpshufb` LUT lookup, `hex_hi[i]` holds the
/// hex char for the high nibble of input byte `i`, and `hex_lo[i]` the low.
/// A single `_mm512_permutex2var_epi8` interleaves them into the correct
/// output order `[hex_hi[0], hex_lo[0], hex_hi[1], hex_lo[1], …]` — replacing
/// the `vpunpcklbw`/`vpunpckhbw` + two `vpermt2q` fixups needed without VBMI.
///
/// # Safety
///
/// - The CPU must support AVX-512BW + VBMI
///   (caller must have `#[target_feature(enable = "avx512bw,avx512vbmi")]`).
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len * 2` bytes.
/// - The `src[..byte_len]` and `dst[..byte_len * 2]` regions must not overlap.
#[inline(always)]
unsafe fn encode_avx512_inner(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize, upper: bool) {
    // SAFETY: all intrinsics below require AVX-512BW + VBMI,
    // guaranteed by #[target_feature].
    unsafe {
        let lut = _mm512_broadcast_i32x4(hex_lut(upper));
        let mask_lo = _mm512_set1_epi8(0x0F);
        // Byte-level interleave indices for vpermi2b.
        // For input byte k, output position 2k gets hex_hi[k] (index k, from first source)
        // and position 2k+1 gets hex_lo[k] (index 64+k, from second source).
        // idx0 covers input bytes 0..31 → output bytes 0..63.
        // idx1 covers input bytes 32..63 → output bytes 64..127.
        const INTERLEAVE_LO: [i8; 64] = {
            let mut a = [0i8; 64];
            let mut i = 0;
            while i < 32 {
                a[i * 2] = i as i8;
                a[i * 2 + 1] = (64 + i) as i8;
                i += 1;
            }
            a
        };
        const INTERLEAVE_HI: [i8; 64] = {
            let mut a = [0i8; 64];
            let mut i = 0;
            while i < 32 {
                a[i * 2] = (32 + i) as i8;
                a[i * 2 + 1] = (96 + i) as i8;
                i += 1;
            }
            a
        };
        let idx0 = _mm512_loadu_si512(INTERLEAVE_LO.as_ptr().cast());
        let idx1 = _mm512_loadu_si512(INTERLEAVE_HI.as_ptr().cast());

        while byte_len >= 64 {
            let chunk = _mm512_loadu_si512(src.cast());

            // Split nibbles.
            let lo = _mm512_and_si512(chunk, mask_lo);
            let hi = _mm512_and_si512(_mm512_srli_epi16(chunk, 4), mask_lo);

            // LUT lookup.
            let hex_lo = _mm512_shuffle_epi8(lut, lo);
            let hex_hi = _mm512_shuffle_epi8(lut, hi);

            // Byte-level interleave: one cross-lane permute per output register.
            let out0 = _mm512_permutex2var_epi8(hex_hi, idx0, hex_lo);
            let out1 = _mm512_permutex2var_epi8(hex_hi, idx1, hex_lo);

            _mm512_storeu_si512(dst.cast(), out0);
            _mm512_storeu_si512(dst.add(64).cast(), out1);

            src = src.add(64);
            dst = dst.add(128);
            byte_len -= 64;
        }

        // Tail: fall through to AVX2 for any remaining 32+ bytes, then SSSE3, then scalar.
        if byte_len > 0 {
            encode_avx2_inner(src, dst, byte_len, upper);
        }
    }
}

/// Thin wrapper around [`encode_avx512_inner`]; see that function for details.
///
/// # Safety
///
/// Same as [`encode_avx512_inner`].
#[target_feature(enable = "avx512bw,avx512vbmi")]
pub unsafe fn encode_avx512(src: *const u8, dst: *mut u8, byte_len: usize, upper: bool) {
    unsafe { encode_avx512_inner(src, dst, byte_len, upper) }
}

/// Decode a single 512-bit register (64 hex chars → 32 output bytes) using
/// the Lemire algorithm, AVX-512BW variant.
///
/// Returns `(packed_bytes, mask)` where `packed_bytes` is a `__m256i` with
/// 32 decoded bytes, and `mask` is a `u64` bitmask from
/// `_mm512_movepi8_mask` — one bit per byte, set if that byte was invalid.
/// Callers OR multiple masks together, then branch once.
///
/// # Safety
///
/// - The CPU must support AVX-512BW (caller must have `#[target_feature(enable = "avx512bw")]`).
#[inline(always)]
unsafe fn decode_chunk_512(
    chunk: __m512i,
    delta_check: __m512i,
    delta_rebase: __m512i,
    one: __m512i,
    mask_hi: __m512i,
    weights: __m512i,
) -> (__m256i, u64) {
    // SAFETY: caller guarantees AVX-512BW.
    unsafe {
        let vm1 = _mm512_sub_epi8(chunk, one);
        let hash_key = _mm512_and_si512(_mm512_srli_epi16(vm1, 4), mask_hi);

        let check = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_check, hash_key));
        let nibbles = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_rebase, hash_key));

        // movepi8_mask: one bit per byte, set if MSB is set (invalid).
        let mask = _mm512_movepi8_mask(check);

        // Pack nibble pairs: hi*16 + lo via pmaddubsw, then truncate to u8.
        let packed16 = _mm512_maddubs_epi16(nibbles, weights);
        // vpmovwb: truncate 32×i16 → 32×u8 directly into a __m256i.
        // No cross-lane permute needed (replaces packuswb + vpermq fixup).
        let result = _mm512_cvtepi16_epi8(packed16);

        (result, mask)
    }
}

/// Hex-decode `input` into `output` using AVX-512BW.
///
/// Processes 128 hex chars (two `__m512i` loads → 64 output bytes) per
/// iteration. Accumulates error bits across all chunks without branching
/// on validity (constant-time).
///
/// # Safety
///
/// - The CPU must support AVX-512BW (caller must have `#[target_feature(enable = "avx512bw")]`).
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[inline(always)]
unsafe fn decode_avx512_inner(mut src: *const u8, mut dst: *mut u8, mut byte_len: usize) -> u64 {
    // SAFETY: all intrinsics below require AVX-512BW (implies AVX-512F),
    // guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm512_broadcast_i32x4(decode_delta_check_128());
        let delta_rebase = _mm512_broadcast_i32x4(decode_delta_rebase_128());
        let one = _mm512_set1_epi8(1);
        let mask_hi = _mm512_set1_epi8(0x0F);
        let weights = _mm512_set1_epi16(0x0110);
        let mut err_accum = 0u64;

        // AVX-512: 64 output bytes per iteration (128 hex chars).
        while byte_len >= 64 {
            let chunk0 = _mm512_loadu_si512(src.cast());
            let chunk1 = _mm512_loadu_si512(src.add(64).cast());

            let (decoded0, mask0) = decode_chunk_512(chunk0, delta_check, delta_rebase, one, mask_hi, weights);
            let (decoded1, mask1) = decode_chunk_512(chunk1, delta_check, delta_rebase, one, mask_hi, weights);

            err_accum |= mask0 | mask1;

            _mm256_storeu_si256(dst.cast(), decoded0);
            _mm256_storeu_si256(dst.add(32).cast(), decoded1);

            src = src.add(128);
            dst = dst.add(64);
            byte_len -= 64;
        }

        // Tail: fall through to AVX2, then SSSE3, then scalar.
        if byte_len > 0 {
            // i32 → u64: non-zero error is preserved (zero-extends).
            err_accum |= decode_avx2_inner(src, dst, byte_len) as u64;
        }

        err_accum
    }
}

/// Hex-decode `input` into `output` using AVX-512BW.
///
/// Processes all chunks without short-circuiting on invalid input.
/// Falls through to [`decode_avx2`] for the tail.
/// Returns `Err(InvalidEncoding)` if any byte was invalid.
///
/// # Safety
///
/// - The CPU must support AVX-512BW.
/// - `src` must be [valid](core::ptr#safety) for reads of `byte_len * 2` bytes.
/// - `dst` must be [valid](core::ptr#safety) for writes of `byte_len` bytes.
/// - The `src[..byte_len * 2]` and `dst[..byte_len]` regions must not overlap.
#[target_feature(enable = "avx512bw")]
pub unsafe fn decode_avx512(src: *const u8, dst: *mut u8, byte_len: usize) -> Result<(), InvalidEncoding> {
    // SAFETY: caller guarantees AVX-512BW and pointer validity.
    if unsafe { decode_avx512_inner(src, dst, byte_len) } != 0 {
        Err(InvalidEncoding)
    } else {
        Ok(())
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX-512BW SIMD.
///
/// Reuses the Lemire `delta_check` validation: for each 64-byte chunk,
/// computes `vm1 + shuffle(delta_check, hash_key)` and checks that
/// `_mm512_movepi8_mask == 0` (all MSBs clear ⇒ all chars valid).
/// Falls back to AVX2/SSSE3/scalar for any remaining tail.
///
/// Accumulates validity across all chunks without early exit (constant-time).
///
/// # Safety
///
/// - The CPU must support AVX-512BW (caller must have `#[target_feature(enable = "avx512bw")]`).
#[inline(always)]
unsafe fn check_avx512_inner(mut input: &[u8]) -> bool {
    // SAFETY: all intrinsics below require AVX-512BW, guaranteed by #[target_feature].
    unsafe {
        let delta_check = _mm512_broadcast_i32x4(decode_delta_check_128());
        let one = _mm512_set1_epi8(1);
        let mask_hi = _mm512_set1_epi8(0x0F);
        let mut all_valid = true;

        while input.len() >= 64 {
            let chunk = _mm512_loadu_si512(input.as_ptr().cast());

            let vm1 = _mm512_sub_epi8(chunk, one);
            let hash_key = _mm512_and_si512(_mm512_srli_epi16(vm1, 4), mask_hi);
            let check = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_check, hash_key));

            all_valid &= _mm512_movepi8_mask(check) == 0;

            // SAFETY: `input.len() >= 64` checked above.
            input = input.get_unchecked(64..);
        }

        all_valid & check_avx2_inner(input)
    }
}

/// Check whether every byte in `input` is a valid hex ASCII character,
/// using AVX-512BW SIMD.
///
/// Processes all chunks without short-circuiting on invalid input.
///
/// # Safety
///
/// Caller must ensure the CPU supports AVX-512BW.
#[target_feature(enable = "avx512bw")]
pub unsafe fn check_avx512(input: &[u8]) -> bool {
    // SAFETY: caller guarantees AVX-512BW.
    unsafe { check_avx512_inner(input) }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::test_support::exercise_backend;

    cpufeatures::new!(has_ssse3, "ssse3");
    cpufeatures::new!(has_avx2, "avx2");
    cpufeatures::new!(has_avx512bw, "avx512bw");
    cpufeatures::new!(has_avx512vbmi, "avx512vbmi");

    #[test]
    fn ssse3_matches_scalar_oracle() {
        let available = cfg!(target_feature = "ssse3") || has_ssse3::init().get();
        if !available {
            return;
        }
        assert!(cfg!(miri) || has_ssse3::init().get());

        exercise_backend(
            |input, output| unsafe { encode_ssse3(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), false) },
            |input, output| unsafe { encode_ssse3(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), true) },
            |input, output| unsafe {
                decode_ssse3(input.as_ptr(), output.as_mut_ptr().cast(), output.len())
                    .map_err(|_| crate::error::Error::InvalidEncoding)
            },
            |input| unsafe { check_ssse3(input) },
        );
    }

    #[test]
    fn avx2_matches_scalar_oracle() {
        let available = cfg!(target_feature = "avx2") || has_avx2::init().get();
        if !available {
            return;
        }
        assert!(cfg!(miri) || has_avx2::init().get());

        exercise_backend(
            |input, output| unsafe { encode_avx2(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), false) },
            |input, output| unsafe { encode_avx2(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), true) },
            |input, output| unsafe {
                decode_avx2(input.as_ptr(), output.as_mut_ptr().cast(), output.len())
                    .map_err(|_| crate::error::Error::InvalidEncoding)
            },
            |input| unsafe { check_avx2(input) },
        );
    }

    /// Tests decode and check at the AVX-512BW tier (no VBMI required).
    /// Encode is tested separately in [`avx512vbmi_matches_scalar_oracle`]
    /// since it requires VBMI; here we fall through to AVX2 encode.
    #[test]
    fn avx512bw_matches_scalar_oracle() {
        let available = cfg!(target_feature = "avx512bw") || has_avx512bw::init().get();
        if !available {
            return;
        }
        assert!(cfg!(miri) || has_avx512bw::init().get());

        exercise_backend(
            |input, output| unsafe { encode_avx2(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), false) },
            |input, output| unsafe { encode_avx2(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), true) },
            |input, output| unsafe {
                decode_avx512(input.as_ptr(), output.as_mut_ptr().cast(), output.len())
                    .map_err(|_| crate::error::Error::InvalidEncoding)
            },
            |input| unsafe { check_avx512(input) },
        );
    }

    /// Tests encode at the AVX-512 VBMI tier (requires VBMI for `vpermi2b`).
    /// Decode and check are already covered by [`avx512bw_matches_scalar_oracle`].
    #[test]
    fn avx512vbmi_matches_scalar_oracle() {
        let available = cfg!(target_feature = "avx512vbmi") || has_avx512vbmi::init().get();
        if !available {
            return;
        }
        assert!(cfg!(miri) || has_avx512vbmi::init().get());

        exercise_backend(
            |input, output| unsafe { encode_avx512(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), false) },
            |input, output| unsafe { encode_avx512(input.as_ptr(), output.as_mut_ptr().cast(), input.len(), true) },
            |input, output| unsafe {
                decode_avx512(input.as_ptr(), output.as_mut_ptr().cast(), output.len())
                    .map_err(|_| crate::error::Error::InvalidEncoding)
            },
            |input| unsafe { check_avx512(input) },
        );
    }
}
