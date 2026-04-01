# SIMD Backends Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add SIMD-accelerated hex encode/decode/check for AArch64 (NEON), x86 (SSSE3/AVX2), and WASM (SIMD128), with runtime CPU detection for x86 and compile-time selection for NEON/WASM.

**Architecture:** Each SIMD backend is a separate module under `src/backend/` exposing the same three functions (`encode`, `decode`, `check`) with `MaybeUninit` output buffers. `src/backend/mod.rs` dispatches to the best available backend at runtime (x86) or compile time (NEON/WASM). All backends process data in SIMD-width chunks and fall back to the scalar backend for tail bytes. Existing tests (84 + proptests) remain the correctness oracle — the public API is unchanged.

**Tech Stack:** `core::arch::aarch64` (NEON), `core::arch::x86_64` (SSSE3/AVX2), `core::arch::wasm32` (SIMD128), `cfg-if`, `cpufeatures` (no_std x86 detection).

---

## File Structure

```
src/backend/
  mod.rs          — dispatch: runtime (x86) or compile-time (NEON/WASM) selection
  scalar.rs       — existing scalar fallback (unchanged)
  neon.rs         — AArch64 NEON encode/decode/check (16 bytes at a time)
  x86.rs          — x86 SSSE3 encode/decode/check (16 bytes at a time)
                    + AVX2 encode/decode/check (32 bytes at a time)
  wasm.rs         — WASM SIMD128 encode/decode/check (16 bytes at a time)
Cargo.toml        — add cpufeatures dependency
```

---

### Task 1: Dispatch Infrastructure + cpufeatures

**Files:**
- Modify: `Cargo.toml`
- Modify: `src/backend/mod.rs`

This task sets up the runtime/compile-time dispatch without adding any SIMD code yet. After this, the crate still uses scalar but the dispatch framework is in place.

- [ ] **Step 1: Add cpufeatures dependency to Cargo.toml**

Add under `[dependencies]`:
```toml
[target.'cfg(all(not(feature = "std"), any(target_arch = "x86", target_arch = "x86_64")))'.dependencies]
cpufeatures = "0.2"
```

- [ ] **Step 2: Rewrite `src/backend/mod.rs` with full dispatch**

```rust
//! Backend dispatch layer.
//!
//! Selects the best available SIMD backend at runtime (x86) or compile time
//! (AArch64 NEON, WASM SIMD128). Falls back to the scalar backend when no
//! SIMD is available or when the `force-generic` feature is enabled.
//!
//! All backend functions take `MaybeUninit<u8>` output buffers.

pub(crate) mod scalar;

#[cfg(all(
    not(feature = "force-generic"),
    target_arch = "aarch64",
    target_feature = "neon"
))]
pub(crate) mod neon;

#[cfg(all(
    not(feature = "force-generic"),
    any(target_arch = "x86", target_arch = "x86_64"),
))]
pub(crate) mod x86;

#[cfg(all(
    not(feature = "force-generic"),
    target_arch = "wasm32",
    target_feature = "simd128"
))]
pub(crate) mod wasm;

use crate::error::Error;
use core::mem::MaybeUninit;

// CPU feature detection for x86.
// With std: use is_x86_feature_detected! (has cfg!(target_feature) fast path).
// Without std: use cpufeatures crate.
#[cfg(all(
    not(feature = "force-generic"),
    any(target_arch = "x86", target_arch = "x86_64"),
))]
mod detect {
    cfg_if::cfg_if! {
        if #[cfg(feature = "std")] {
            pub(super) fn has_ssse3() -> bool {
                std::arch::is_x86_feature_detected!("ssse3")
            }
            pub(super) fn has_avx2() -> bool {
                std::arch::is_x86_feature_detected!("avx2")
            }
        } else {
            cpufeatures::new!(cpuid_ssse3, "ssse3");
            cpufeatures::new!(cpuid_avx2, "avx2");
            pub(super) fn has_ssse3() -> bool { cpuid_ssse3::get() }
            pub(super) fn has_avx2() -> bool { cpuid_avx2::get() }
        }
    }
}

/// Encode `input` bytes as hex into `output` (MaybeUninit).
#[inline]
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    cfg_if::cfg_if! {
        if #[cfg(feature = "force-generic")] {
            scalar::encode::<UPPER>(input, output);
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            // NEON is baseline on AArch64 — no runtime check needed.
            neon::encode::<UPPER>(input, output);
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            if detect::has_avx2() {
                // SAFETY: we just verified AVX2 support.
                unsafe { x86::encode_avx2::<UPPER>(input, output) }
            } else if detect::has_ssse3() {
                // SAFETY: we just verified SSSE3 support.
                unsafe { x86::encode_ssse3::<UPPER>(input, output) }
            } else {
                scalar::encode::<UPPER>(input, output);
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::encode::<UPPER>(input, output);
        } else {
            scalar::encode::<UPPER>(input, output);
        }
    }
}

/// Decode hex `input` into `output` (MaybeUninit).
#[inline]
pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    cfg_if::cfg_if! {
        if #[cfg(feature = "force-generic")] {
            scalar::decode(input, output)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::decode(input, output)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            if detect::has_avx2() {
                unsafe { x86::decode_avx2(input, output) }
            } else if detect::has_ssse3() {
                unsafe { x86::decode_ssse3(input, output) }
            } else {
                scalar::decode(input, output)
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::decode(input, output)
        } else {
            scalar::decode(input, output)
        }
    }
}

/// Check if every byte in `input` is valid hex ASCII.
#[inline]
pub(crate) fn check(input: &[u8]) -> bool {
    cfg_if::cfg_if! {
        if #[cfg(feature = "force-generic")] {
            scalar::check(input)
        } else if #[cfg(all(target_arch = "aarch64", target_feature = "neon"))] {
            neon::check(input)
        } else if #[cfg(any(target_arch = "x86", target_arch = "x86_64"))] {
            if detect::has_ssse3() {
                unsafe { x86::check_ssse3(input) }
            } else {
                scalar::check(input)
            }
        } else if #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))] {
            wasm::check(input)
        } else {
            scalar::check(input)
        }
    }
}
```

- [ ] **Step 3: Create stub backend modules**

Create `src/backend/neon.rs`:
```rust
//! AArch64 NEON hex backend (stub — implemented in Task 2).
```

Create `src/backend/x86.rs`:
```rust
//! x86 SSSE3/AVX2 hex backend (stub — implemented in Task 3).
```

Create `src/backend/wasm.rs`:
```rust
//! WASM SIMD128 hex backend (stub — implemented in Task 4).
```

- [ ] **Step 4: Verify it compiles and all tests still pass**

Run: `cargo test`
Expected: all 84 tests + 1 doctest pass (scalar path unchanged)

Run: `cargo check --no-default-features`
Expected: compiles (no_std, scalar fallback)

Run: `cargo check --features force-generic`
Expected: compiles (force scalar)

- [ ] **Step 5: Commit**

```bash
git add Cargo.toml src/backend/
git commit -m "feat: SIMD dispatch infrastructure with cpufeatures"
```

---

### Task 2: AArch64 NEON Backend

**Files:**
- Modify: `src/backend/neon.rs`

This is the first SIMD backend and testable locally (aarch64 machine). All existing tests serve as the correctness oracle since the dispatch now routes to NEON.

**NEON encode algorithm (16 bytes → 32 hex chars):**
1. Load 16 input bytes via `vld1q_u8`
2. Load 16-byte hex LUT into a NEON register
3. Split nibbles: `lo = input & 0x0F`, `hi = input >> 4`
4. Lookup both nibbles: `vqtbl1q_u8(lut, lo)`, `vqtbl1q_u8(lut, hi)`
5. Interleave: `vzipq_u8(hi_chars, lo_chars)` → two 16-byte results
6. Store 32 bytes via `vst1q_u8`
7. Scalar fallback for tail (< 16 bytes)

**NEON decode algorithm (32 hex chars → 16 bytes), Mula-Langdale Algorithm #3 adapted to NEON:**
1. Load 32 input bytes (two `vld1q_u8`)
2. For each 16-byte half, compute nibble values via saturating arithmetic:
   - Digit path: `saturating_sub(byte + 0xC6, 6) - 0xF0`
   - Letter path: `saturating_add((byte & 0xDF) - 'A', 10)`
   - Merge: `min(digit, letter)`
3. Validate: `saturating_add(nibble, 112)` — if > 0x7F, invalid
4. Pack nibble pairs: deinterleave with `vuzpq_u8`, then `(hi << 4) | lo`
5. Scalar fallback for tail

**NEON check algorithm (16 bytes at a time):**
1. For each 16-byte chunk, check three ranges with unsigned comparisons:
   - `'0' <= byte <= '9'`
   - `'A' <= byte <= 'F'`
   - `'a' <= byte <= 'f'`
2. OR validity masks, reduce with `vminvq_u8`
3. Scalar fallback for tail

- [ ] **Step 1: Implement `src/backend/neon.rs`**

```rust
//! AArch64 NEON hex encoding and decoding backend.
//!
//! Processes 16 input bytes at a time using 128-bit NEON registers.
//!
//! # Encode algorithm
//!
//! Uses `vqtbl1q_u8` (NEON table lookup) with a 16-byte hex character table
//! held in a register. For each 16-byte chunk:
//! 1. Split bytes into high/low nibbles
//! 2. Look up each nibble in the register LUT → two vectors of hex chars
//! 3. Interleave with `vzipq_u8` → 32 bytes of hex output
//!
//! # Decode algorithm
//!
//! Uses Mula-Langdale Algorithm #3 adapted to NEON intrinsics.
//! Converts ASCII hex chars to nibble values via saturating arithmetic
//! (no memory LUT), validates in the same pass, then packs nibble pairs
//! into output bytes.
//!
//! # Check algorithm
//!
//! Uses unsigned range comparisons (`vcgeq_u8` / `vcleq_u8`) to test
//! three ranges ('0'-'9', 'A'-'F', 'a'-'f') in parallel, OR the masks,
//! and reduce with `vminvq_u8`.

use crate::backend::scalar;
use crate::error::Error;
use core::arch::aarch64::*;
use core::mem::MaybeUninit;

/// NEON hex encoder. Processes 16 input bytes per iteration.
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2);

    let lut = if UPPER {
        *b"0123456789ABCDEF"
    } else {
        *b"0123456789abcdef"
    };
    // SAFETY: all operations use NEON intrinsics which are safe on aarch64
    // when target_feature = "neon" (guaranteed by cfg gate on this module).
    unsafe {
        let hex_lut = vld1q_u8(lut.as_ptr());
        let mask_0f = vdupq_n_u8(0x0F);

        let mut i = 0;
        let simd_end = input.len() & !15; // round down to 16-byte boundary

        while i < simd_end {
            let chunk = vld1q_u8(input.as_ptr().add(i));
            let lo_nib = vandq_u8(chunk, mask_0f);
            let hi_nib = vshrq_n_u8::<4>(chunk);
            let lo_chars = vqtbl1q_u8(hex_lut, lo_nib);
            let hi_chars = vqtbl1q_u8(hex_lut, hi_nib);
            // Interleave: [hi0, lo0, hi1, lo1, ...] — vzipq returns two halves
            let zipped = vzipq_u8(hi_chars, lo_chars);
            vst1q_u8(output.as_mut_ptr().add(i * 2).cast::<u8>(), zipped.0);
            vst1q_u8(output.as_mut_ptr().add(i * 2 + 16).cast::<u8>(), zipped.1);
            i += 16;
        }

        // Tail: remaining < 16 bytes handled by scalar
        if i < input.len() {
            scalar::encode::<UPPER>(&input[i..], &mut output[i * 2..]);
        }
    }
}

/// NEON hex decoder using Mula-Langdale Algorithm #3.
///
/// Processes 32 hex input bytes (16 output bytes) per iteration.
/// Validates and converts in a single pass using saturating arithmetic.
pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2);
    debug_assert!(input.len().is_multiple_of(2));

    unsafe {
        let mut i = 0;
        let simd_end = input.len() & !31; // round down to 32-byte (16 output) boundary

        while i < simd_end {
            let v0 = vld1q_u8(input.as_ptr().add(i));
            let v1 = vld1q_u8(input.as_ptr().add(i + 16));

            let (nib0, ok0) = decode_chunk_neon(v0);
            let (nib1, ok1) = decode_chunk_neon(v1);

            // Check validity: vmaxvq_u8 returns the max byte. If any nibble
            // was > 0x7F (invalid), the max of the validation vector will be > 0x7F.
            if ok0 > 0x7F || ok1 > 0x7F {
                // Fall back to scalar to get the exact error position.
                return scalar::decode(&input[i..], &mut output[i / 2..]);
            }

            // Deinterleave nibbles: vuzpq_u8 separates even/odd indexed bytes.
            // n0 has the high nibbles from v0 and v1 (at even positions),
            // n1 has the low nibbles (at odd positions).
            let n0_pairs = vuzpq_u8(nib0, nib1);
            let hi = n0_pairs.0;
            let lo = n0_pairs.1;
            let packed = vorrq_u8(vshlq_n_u8::<4>(hi), lo);

            vst1q_u8(output.as_mut_ptr().add(i / 2).cast::<u8>(), packed);
            i += 32;
        }

        // Tail
        if i < input.len() {
            scalar::decode(&input[i..], &mut output[i / 2..])?;
        }
    }
    Ok(())
}

/// Decode one 16-byte NEON vector of hex ASCII into nibble values.
///
/// Returns `(nibbles, max_validation_byte)`. If `max_validation_byte > 0x7F`,
/// at least one input byte was not valid hex.
///
/// Uses Mula-Langdale Algorithm #3:
/// - Digit path: `saturating_sub(byte + 0xC6, 6) - 0xF0` → 0-9 for '0'-'9'
/// - Letter path: `saturating_add((byte & 0xDF) - 'A', 10)` → 10-15 for 'A'-'F'/'a'-'f'
/// - Merge: `min(digit, letter)`
/// - Validate: `saturating_add(nibble, 112)` — MSB set if nibble > 15
#[inline]
unsafe fn decode_chunk_neon(v: uint8x16_t) -> (uint8x16_t, u8) {
    // Digit path: maps '0'-'9' → 0-9, others → values > 15
    let c6 = vdupq_n_u8(0xC6);
    let six = vdupq_n_u8(6);
    let f0 = vdupq_n_u8(0xF0);
    let digit = vsubq_u8(vqsubq_u8(vaddq_u8(v, c6), six), f0);

    // Letter path: case-fold to uppercase, then maps 'A'-'F' → 10-15
    let mask_df = vdupq_n_u8(0xDF);
    let ascii_a = vdupq_n_u8(b'A');
    let ten = vdupq_n_u8(10);
    let folded = vandq_u8(v, mask_df);
    let alpha = vqaddq_u8(vsubq_u8(folded, ascii_a), ten);

    // Merge: pick whichever path gave a valid nibble (0-15)
    let nibbles = vminq_u8(digit, alpha);

    // Validate: add 112 — if nibble <= 15, result <= 127 (MSB clear).
    // If nibble > 15 (invalid), saturating add pushes MSB high.
    let validation = vqaddq_u8(nibbles, vdupq_n_u8(112));
    let max_byte = vmaxvq_u8(validation);

    (nibbles, max_byte)
}

/// NEON hex check: validates 16 bytes at a time using range comparisons.
pub(crate) fn check(input: &[u8]) -> bool {
    unsafe {
        let mut i = 0;
        let simd_end = input.len() & !15;

        while i < simd_end {
            let v = vld1q_u8(input.as_ptr().add(i));
            if !check_chunk_neon(v) {
                return false;
            }
            i += 16;
        }

        // Tail
        scalar::check(&input[i..])
    }
}

/// Check one 16-byte vector: returns true if all bytes are valid hex.
///
/// Tests three unsigned ranges in parallel:
/// - `'0' <= b <= '9'` → digit
/// - `'A' <= b <= 'F'` → uppercase letter
/// - `'a' <= b <= 'f'` → lowercase letter
///
/// ORs the three validity masks. `vminvq_u8(mask)` reduces to the minimum
/// lane: 0xFF if all valid, 0x00 if any invalid.
#[inline]
unsafe fn check_chunk_neon(v: uint8x16_t) -> bool {
    let is_digit = vandq_u8(
        vcgeq_u8(v, vdupq_n_u8(b'0')),
        vcleq_u8(v, vdupq_n_u8(b'9')),
    );
    let is_upper = vandq_u8(
        vcgeq_u8(v, vdupq_n_u8(b'A')),
        vcleq_u8(v, vdupq_n_u8(b'F')),
    );
    let is_lower = vandq_u8(
        vcgeq_u8(v, vdupq_n_u8(b'a')),
        vcleq_u8(v, vdupq_n_u8(b'f')),
    );
    let valid = vorrq_u8(vorrq_u8(is_digit, is_upper), is_lower);
    vminvq_u8(valid) == 0xFF
}
```

- [ ] **Step 2: Run all existing tests — they now exercise NEON on this aarch64 machine**

Run: `cargo test`
Expected: all 84 tests + 1 doctest pass (NEON backend exercised via dispatch)

Run: `cargo test --features force-generic`
Expected: all pass (scalar fallback forced, proving feature flag works)

- [ ] **Step 3: Commit**

```bash
git add src/backend/neon.rs
git commit -m "feat: AArch64 NEON backend — encode/decode/check 16 bytes at a time"
```

---

### Task 3: x86 SSSE3 + AVX2 Backend

**Files:**
- Modify: `src/backend/x86.rs`

**SSSE3 encode (16 bytes → 32 hex chars):** Same algorithm as NEON but using `_mm_shuffle_epi8` for the LUT lookup and `_mm_unpacklo/hi_epi8` for interleaving.

**AVX2 encode (32 bytes → 64 hex chars):** Same algorithm but 256-bit. After `_mm256_unpacklo/hi_epi8`, needs `_mm256_permute2x128_si256` to fix cross-lane ordering.

**SSSE3 decode:** Lemire 2023 subtract-1 + `pshufb` classification. `_mm_maddubs_epi16` with `0x0110` for nibble packing, `_mm_packus_epi16` to narrow.

**AVX2 decode:** Same as SSSE3 but 256-bit, with `_mm256_permute4x64_epi64` for lane fixup after pack.

All functions are `#[target_feature(enable = "...")]` and `unsafe` — the dispatch in mod.rs checks features before calling.

- [ ] **Step 1: Implement `src/backend/x86.rs`**

```rust
//! x86 SSSE3 and AVX2 hex encoding and decoding backend.
//!
//! # Encode algorithm (SSSE3/AVX2)
//!
//! Uses `pshufb` (`_mm_shuffle_epi8` / `_mm256_shuffle_epi8`) as a 16-entry
//! register LUT for nibble-to-ASCII conversion. Split input bytes into high/low
//! nibbles, look up each, then interleave with `punpckl/hbw`.
//!
//! AVX2 requires `_mm256_permute2x128_si256` after interleaving because
//! `_mm256_unpacklo/hi_epi8` operate within 128-bit lanes.
//!
//! # Decode algorithm (Lemire 2023)
//!
//! Subtract 1 from all input bytes, use the high nibble of `(byte - 1)` as a
//! 4-bit hash key into a `pshufb` table for simultaneous validation and
//! nibble rebasing. Pack nibble pairs with `pmaddubsw` using constant `0x0110`
//! (high_nibble * 16 + low_nibble), then `packuswb` to 8-bit.
//!
//! # Check algorithm
//!
//! Uses the Mula-Langdale signed-overflow trick: bias bytes so valid hex chars
//! fall in a range detectable via `_mm_cmpgt_epi8`, then `_mm_movemask_epi8`
//! to get a bitmask.

#[cfg(target_arch = "x86")]
use core::arch::x86::*;
#[cfg(target_arch = "x86_64")]
use core::arch::x86_64::*;

use crate::backend::scalar;
use crate::error::Error;
use core::mem::MaybeUninit;

// --- SSSE3 Encode ---

/// SSSE3 hex encoder. Processes 16 input bytes per iteration.
///
/// # Safety
/// Caller must verify SSSE3 is available (`is_x86_feature_detected!("ssse3")`).
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn encode_ssse3<const UPPER: bool>(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) {
    debug_assert_eq!(output.len(), input.len() * 2);

    let lut = if UPPER {
        _mm_loadu_si128(b"0123456789ABCDEF".as_ptr().cast())
    } else {
        _mm_loadu_si128(b"0123456789abcdef".as_ptr().cast())
    };
    let mask_0f = _mm_set1_epi8(0x0F);

    let mut i = 0;
    let simd_end = input.len() & !15;

    while i < simd_end {
        let chunk = _mm_loadu_si128(input.as_ptr().add(i).cast());
        let lo_nib = _mm_and_si128(chunk, mask_0f);
        let hi_nib = _mm_and_si128(_mm_srli_epi16(chunk, 4), mask_0f);
        let lo_chars = _mm_shuffle_epi8(lut, lo_nib);
        let hi_chars = _mm_shuffle_epi8(lut, hi_nib);
        let pair_lo = _mm_unpacklo_epi8(hi_chars, lo_chars);
        let pair_hi = _mm_unpackhi_epi8(hi_chars, lo_chars);
        _mm_storeu_si128(output.as_mut_ptr().add(i * 2).cast(), pair_lo);
        _mm_storeu_si128(output.as_mut_ptr().add(i * 2 + 16).cast(), pair_hi);
        i += 16;
    }

    if i < input.len() {
        scalar::encode::<UPPER>(&input[i..], &mut output[i * 2..]);
    }
}

// --- AVX2 Encode ---

/// AVX2 hex encoder. Processes 32 input bytes per iteration.
///
/// # Safety
/// Caller must verify AVX2 is available.
#[target_feature(enable = "avx2")]
pub(crate) unsafe fn encode_avx2<const UPPER: bool>(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) {
    debug_assert_eq!(output.len(), input.len() * 2);

    let lut128 = if UPPER {
        _mm_loadu_si128(b"0123456789ABCDEF".as_ptr().cast())
    } else {
        _mm_loadu_si128(b"0123456789abcdef".as_ptr().cast())
    };
    let lut = _mm256_broadcastsi128_si256(lut128);
    let mask_0f = _mm256_set1_epi8(0x0F);

    let mut i = 0;
    let avx2_end = input.len() & !31;

    while i < avx2_end {
        let chunk = _mm256_loadu_si256(input.as_ptr().add(i).cast());
        let lo_nib = _mm256_and_si256(chunk, mask_0f);
        let hi_nib = _mm256_and_si256(_mm256_srli_epi16(chunk, 4), mask_0f);
        let lo_chars = _mm256_shuffle_epi8(lut, lo_nib);
        let hi_chars = _mm256_shuffle_epi8(lut, hi_nib);

        // Interleave within 128-bit lanes, then fix cross-lane order
        let interleaved_lo = _mm256_unpacklo_epi8(hi_chars, lo_chars);
        let interleaved_hi = _mm256_unpackhi_epi8(hi_chars, lo_chars);
        let out0 = _mm256_permute2x128_si256(interleaved_lo, interleaved_hi, 0x20);
        let out1 = _mm256_permute2x128_si256(interleaved_lo, interleaved_hi, 0x31);

        _mm256_storeu_si256(output.as_mut_ptr().add(i * 2).cast(), out0);
        _mm256_storeu_si256(output.as_mut_ptr().add(i * 2 + 32).cast(), out1);
        i += 32;
    }

    // Tail: use SSSE3 for remaining >= 16 bytes, then scalar
    let ssse3_end = input.len() & !15;
    if i < ssse3_end {
        encode_ssse3::<UPPER>(&input[i..], &mut output[i * 2..]);
    } else if i < input.len() {
        scalar::encode::<UPPER>(&input[i..], &mut output[i * 2..]);
    }
}

// --- SSSE3 Decode (Lemire 2023) ---

/// SSSE3 hex decoder using Lemire's 2023 subtract-1 + pshufb classification.
///
/// # Safety
/// Caller must verify SSSE3 is available.
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn decode_ssse3(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2);
    debug_assert!(input.len().is_multiple_of(2));

    // Validation table: for each high-nibble hash key of (byte - 1), this
    // value added to (byte - 1) should produce a negative result (MSB set)
    // for valid hex chars, and non-negative for invalid.
    let delta_check = _mm_setr_epi8(
        -16, -32, -47, 71, 58, -96, 26, -128, 0, 0, 0, 0, 0, 0, 0, 0,
    );
    // Rebase table: for each hash key, the value to add to (byte - 1) to
    // get the nibble value (0-15).
    let delta_rebase = _mm_setr_epi8(
        0, 0, -48 + 1, -48 + 1, -55 + 1, 0, -87 + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    );
    let mask_0f = _mm_set1_epi8(0x0F);
    let pack_mult = _mm_set1_epi16(0x0110);

    let mut i = 0;
    let simd_end = input.len() & !31; // 32 hex chars = 16 output bytes

    while i < simd_end {
        let v0 = _mm_loadu_si128(input.as_ptr().add(i).cast());
        let v1 = _mm_loadu_si128(input.as_ptr().add(i + 16).cast());

        let (nib0, ok0) = decode_chunk_ssse3(v0, delta_check, delta_rebase, mask_0f);
        let (nib1, ok1) = decode_chunk_ssse3(v1, delta_check, delta_rebase, mask_0f);

        // Validate: movemask on the check vectors. All bits must be 0 (no MSB set).
        if (ok0 | ok1) != 0 {
            return scalar::decode(&input[i..], &mut output[i / 2..]);
        }

        // Pack nibble pairs: hi*16 + lo via pmaddubsw
        let packed0 = _mm_maddubs_epi16(nib0, pack_mult);
        let packed1 = _mm_maddubs_epi16(nib1, pack_mult);
        let bytes = _mm_packus_epi16(packed0, packed1);

        _mm_storeu_si128(output.as_mut_ptr().add(i / 2).cast(), bytes);
        i += 32;
    }

    if i < input.len() {
        scalar::decode(&input[i..], &mut output[i / 2..])?;
    }
    Ok(())
}

/// Decode one 16-byte chunk using Lemire 2023 algorithm.
/// Returns (nibble_values, movemask). movemask != 0 means invalid.
#[inline]
#[target_feature(enable = "ssse3")]
unsafe fn decode_chunk_ssse3(
    v: __m128i,
    delta_check: __m128i,
    delta_rebase: __m128i,
    mask_0f: __m128i,
) -> (__m128i, i32) {
    let ones = _mm_set1_epi8(1);
    let vm1 = _mm_sub_epi8(v, ones);
    let hash_key = _mm_and_si128(_mm_srli_epi16(vm1, 4), mask_0f);

    let check_val = _mm_add_epi8(_mm_shuffle_epi8(delta_check, hash_key), vm1);
    let nibbles = _mm_add_epi8(_mm_shuffle_epi8(delta_rebase, hash_key), vm1);

    let mask = _mm_movemask_epi8(check_val);
    (nibbles, mask)
}

// --- AVX2 Decode ---

/// AVX2 hex decoder. Processes 64 hex chars (32 output bytes) per iteration.
///
/// # Safety
/// Caller must verify AVX2 is available.
#[target_feature(enable = "avx2")]
pub(crate) unsafe fn decode_avx2(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2);
    debug_assert!(input.len().is_multiple_of(2));

    let delta_check_128 = _mm_setr_epi8(
        -16, -32, -47, 71, 58, -96, 26, -128, 0, 0, 0, 0, 0, 0, 0, 0,
    );
    let delta_rebase_128 = _mm_setr_epi8(
        0, 0, -48 + 1, -48 + 1, -55 + 1, 0, -87 + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    );
    let delta_check = _mm256_broadcastsi128_si256(delta_check_128);
    let delta_rebase = _mm256_broadcastsi128_si256(delta_rebase_128);
    let mask_0f = _mm256_set1_epi8(0x0F);
    let ones = _mm256_set1_epi8(1);
    let pack_mult = _mm256_set1_epi16(0x0110);

    let mut i = 0;
    let avx2_end = input.len() & !63; // 64 hex chars = 32 output bytes

    while i < avx2_end {
        let v0 = _mm256_loadu_si256(input.as_ptr().add(i).cast());
        let v1 = _mm256_loadu_si256(input.as_ptr().add(i + 32).cast());

        let vm0 = _mm256_sub_epi8(v0, ones);
        let vm1 = _mm256_sub_epi8(v1, ones);

        let hk0 = _mm256_and_si256(_mm256_srli_epi16(vm0, 4), mask_0f);
        let hk1 = _mm256_and_si256(_mm256_srli_epi16(vm1, 4), mask_0f);

        let check0 = _mm256_add_epi8(_mm256_shuffle_epi8(delta_check, hk0), vm0);
        let check1 = _mm256_add_epi8(_mm256_shuffle_epi8(delta_check, hk1), vm1);

        let mask0 = _mm256_movemask_epi8(check0);
        let mask1 = _mm256_movemask_epi8(check1);
        if (mask0 | mask1) != 0 {
            return scalar::decode(&input[i..], &mut output[i / 2..]);
        }

        let nib0 = _mm256_add_epi8(_mm256_shuffle_epi8(delta_rebase, hk0), vm0);
        let nib1 = _mm256_add_epi8(_mm256_shuffle_epi8(delta_rebase, hk1), vm1);

        let packed0 = _mm256_maddubs_epi16(nib0, pack_mult);
        let packed1 = _mm256_maddubs_epi16(nib1, pack_mult);
        let bytes = _mm256_packus_epi16(packed0, packed1);
        // Fix lane ordering: packus works within 128-bit lanes
        let fixed = _mm256_permute4x64_epi64(bytes, 0b11_01_10_00);

        _mm256_storeu_si256(output.as_mut_ptr().add(i / 2).cast(), fixed);
        i += 64;
    }

    // Tail: SSSE3 for >= 32 chars remaining, then scalar
    if i < input.len() {
        decode_ssse3(&input[i..], &mut output[i / 2..])?;
    }
    Ok(())
}

// --- SSSE3 Check ---

/// SSSE3 hex check using Mula-Langdale signed-overflow trick.
///
/// # Safety
/// Caller must verify SSSE3 is available.
#[target_feature(enable = "ssse3")]
pub(crate) unsafe fn check_ssse3(input: &[u8]) -> bool {
    // Signed overflow check:
    // Digits: bias by 0xB0, threshold at i8::MIN + 10 = -118
    // Letters: AND with 0xDF (case-fold), bias by 0xC1, threshold at i8::MIN + 6 = -122
    let bias_digit = _mm_set1_epi8(0xB0u8 as i8);
    let threshold_digit = _mm_set1_epi8(-118i8);
    let case_fold = _mm_set1_epi8(0xDFu8 as i8);
    let bias_letter = _mm_set1_epi8(0xC1u8 as i8);
    let threshold_letter = _mm_set1_epi8(-122i8);

    let mut i = 0;
    let simd_end = input.len() & !15;

    while i < simd_end {
        let v = _mm_loadu_si128(input.as_ptr().add(i).cast());

        let digit_biased = _mm_add_epi8(v, bias_digit);
        let digit_valid = _mm_cmpgt_epi8(digit_biased, threshold_digit);

        let folded = _mm_and_si128(v, case_fold);
        let letter_biased = _mm_add_epi8(folded, bias_letter);
        let letter_valid = _mm_cmpgt_epi8(letter_biased, threshold_letter);

        let valid = _mm_or_si128(digit_valid, letter_valid);
        if _mm_movemask_epi8(valid) != 0xFFFF {
            return false;
        }
        i += 16;
    }

    scalar::check(&input[i..])
}
```

- [ ] **Step 2: Cross-compile check for x86_64**

We can't run x86 tests on this aarch64 machine, but we can verify compilation:

Run: `cargo check --target x86_64-unknown-linux-gnu` (requires target installed)
If target not installed: `rustup target add x86_64-unknown-linux-gnu` first.

Expected: compiles without errors

Also verify aarch64 still works:
Run: `cargo test`
Expected: all tests pass (NEON path, x86 module not compiled)

- [ ] **Step 3: Commit**

```bash
git add src/backend/x86.rs
git commit -m "feat: x86 SSSE3/AVX2 backend — encode/decode/check"
```

---

### Task 4: WASM SIMD128 Backend

**Files:**
- Modify: `src/backend/wasm.rs`

Same algorithms as NEON/SSSE3 adapted to WASM SIMD128 intrinsics. Key differences:
- `u8x16_swizzle` for LUT lookup (runtime indices, like `pshufb`/`tbl`)
- `u8x16_shuffle` with compile-time indices for interleave/deinterleave
- No `maddubs` equivalent → deinterleave + `(hi << 4) | lo` for nibble packing
- No 8-bit multiply → `(sr6 << 3) + sr6` for `*9` in unhex

- [ ] **Step 1: Implement `src/backend/wasm.rs`**

```rust
//! WASM SIMD128 hex encoding and decoding backend.
//!
//! # Key differences from x86/NEON
//!
//! - `u8x16_swizzle` for runtime-index LUT lookup (like `pshufb`/`tbl`).
//!   Out-of-range indices (>= 16) produce 0 (unlike x86 `pshufb`).
//! - `u8x16_shuffle` for compile-time interleave/deinterleave patterns.
//! - No `pmaddubsw` equivalent → pack nibbles via deinterleave + shift + OR.
//! - No 8-bit multiply → `*9` decomposed as `(x << 3) + x`.

use crate::backend::scalar;
use crate::error::Error;
use core::arch::wasm32::*;
use core::mem::MaybeUninit;

/// WASM SIMD128 hex encoder. Processes 16 input bytes per iteration.
///
/// # Safety
/// Requires `target_feature = "simd128"` (checked by cfg gate on this module).
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2);

    let lut = if UPPER {
        v128_load(b"0123456789ABCDEF".as_ptr().cast())
    } else {
        v128_load(b"0123456789abcdef".as_ptr().cast())
    };
    let mask_0f = u8x16_splat(0x0F);

    let mut i = 0;
    let simd_end = input.len() & !15;

    while i < simd_end {
        let chunk = v128_load(input.as_ptr().add(i).cast());
        let lo_nib = v128_and(chunk, mask_0f);
        let hi_nib = u8x16_shr(chunk, 4);
        let lo_chars = u8x16_swizzle(lut, lo_nib);
        let hi_chars = u8x16_swizzle(lut, hi_nib);

        // Interleave with compile-time shuffle indices:
        // hex_lo takes bytes 0-7 from hi interleaved with bytes 0-7 from lo
        let hex_lo = u8x16_shuffle::<0,16, 1,17, 2,18, 3,19, 4,20, 5,21, 6,22, 7,23>(
            hi_chars, lo_chars,
        );
        let hex_hi = u8x16_shuffle::<8,24, 9,25, 10,26, 11,27, 12,28, 13,29, 14,30, 15,31>(
            hi_chars, lo_chars,
        );

        v128_store(output.as_mut_ptr().add(i * 2).cast(), hex_lo);
        v128_store(output.as_mut_ptr().add(i * 2 + 16).cast(), hex_hi);
        i += 16;
    }

    if i < input.len() {
        scalar::encode::<UPPER>(&input[i..], &mut output[i * 2..]);
    }
}

/// WASM SIMD128 hex decoder using Mula-Langdale Algorithm #3.
///
/// Processes 32 hex input bytes (16 output bytes) per iteration.
/// Nibble packing uses deinterleave + shift + OR (no `maddubs` in WASM).
pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2);
    debug_assert!(input.len().is_multiple_of(2));

    let mut i = 0;
    let simd_end = input.len() & !31;

    while i < simd_end {
        let v0 = v128_load(input.as_ptr().add(i).cast());
        let v1 = v128_load(input.as_ptr().add(i + 16).cast());

        let (nib0, ok0) = decode_chunk_wasm(v0);
        let (nib1, ok1) = decode_chunk_wasm(v1);

        if ok0 != 0 || ok1 != 0 {
            return scalar::decode(&input[i..], &mut output[i / 2..]);
        }

        // Deinterleave: extract even-indexed (hi) and odd-indexed (lo) nibbles
        let hi = u8x16_shuffle::<0,2,4,6,8,10,12,14, 16,18,20,22,24,26,28,30>(nib0, nib1);
        let lo = u8x16_shuffle::<1,3,5,7,9,11,13,15, 17,19,21,23,25,27,29,31>(nib0, nib1);
        let packed = v128_or(u8x16_shl(hi, 4), lo);

        v128_store(output.as_mut_ptr().add(i / 2).cast(), packed);
        i += 32;
    }

    if i < input.len() {
        scalar::decode(&input[i..], &mut output[i / 2..])?;
    }
    Ok(())
}

/// Decode one 16-byte WASM vector using Mula-Langdale Algorithm #3.
/// Returns (nibbles, bitmask). bitmask != 0 means invalid.
#[inline]
fn decode_chunk_wasm(v: v128) -> (v128, u16) {
    let c6 = u8x16_splat(0xC6);
    let six = u8x16_splat(6);
    let f0 = u8x16_splat(0xF0);
    let digit = u8x16_sub(u8x16_sub_sat(u8x16_add(v, c6), six), f0);

    let mask_df = u8x16_splat(0xDF);
    let ascii_a = u8x16_splat(b'A');
    let ten = u8x16_splat(10);
    let folded = v128_and(v, mask_df);
    let alpha = u8x16_add_sat(u8x16_sub(folded, ascii_a), ten);

    let nibbles = u8x16_min(digit, alpha);
    let validation = u8x16_add_sat(nibbles, u8x16_splat(112));
    let mask = u8x16_bitmask(validation);

    (nibbles, mask)
}

/// WASM SIMD128 hex check using range comparisons.
pub(crate) fn check(input: &[u8]) -> bool {
    let mut i = 0;
    let simd_end = input.len() & !15;

    while i < simd_end {
        let v = v128_load(input.as_ptr().add(i).cast());
        let is_digit = v128_and(u8x16_ge(v, u8x16_splat(b'0')), u8x16_le(v, u8x16_splat(b'9')));
        let is_upper = v128_and(u8x16_ge(v, u8x16_splat(b'A')), u8x16_le(v, u8x16_splat(b'F')));
        let is_lower = v128_and(u8x16_ge(v, u8x16_splat(b'a')), u8x16_le(v, u8x16_splat(b'f')));
        let valid = v128_or(v128_or(is_digit, is_upper), is_lower);
        if !u8x16_all_true(valid) {
            return false;
        }
        i += 16;
    }

    scalar::check(&input[i..])
}
```

- [ ] **Step 2: Cross-compile check for wasm32**

Run: `rustup target add wasm32-unknown-unknown` (if not installed)
Run: `RUSTFLAGS="-C target-feature=+simd128" cargo check --target wasm32-unknown-unknown --no-default-features`
Expected: compiles

Also verify native still works:
Run: `cargo test`
Expected: all tests pass

- [ ] **Step 3: Commit**

```bash
git add src/backend/wasm.rs
git commit -m "feat: WASM SIMD128 backend — encode/decode/check"
```

---

### Task 5: Cross-backend Property Tests

**Files:**
- Modify: `tests/properties.rs`
- Modify: `src/backend/mod.rs` (expose backends for testing)

Add property tests that compare SIMD backends against the scalar oracle. On aarch64, this exercises NEON vs scalar. On x86, it exercises SSSE3/AVX2 vs scalar. The key insight: `force-generic` gives us the scalar oracle, and the default gives us SIMD, so we can compare by running both.

However, we can't call both backends from the same test binary easily. Instead, we expose `scalar::encode`/`scalar::decode` under a `#[cfg(test)]` gate and compare directly.

- [ ] **Step 1: Expose scalar backend for test comparison**

In `src/backend/mod.rs`, add at the bottom:

```rust
/// Re-export scalar functions for cross-backend testing.
#[cfg(test)]
pub(crate) use scalar as scalar_ref;
```

In `src/lib.rs`, add:

```rust
/// Expose backend internals for integration tests.
#[cfg(test)]
pub mod test_internals {
    pub use crate::backend::scalar;
}
```

- [ ] **Step 2: Add cross-backend property tests**

Add to `tests/properties.rs`:

```rust
    #[test]
    fn encode_matches_scalar_oracle(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        use core::mem::MaybeUninit;

        let hex_len = input.len() * 2;
        let mut simd_out = vec![MaybeUninit::<u8>::uninit(); hex_len];
        let mut scalar_out = vec![MaybeUninit::<u8>::uninit(); hex_len];

        // SIMD path (whatever the default backend is)
        better_hex::encode_to_slice(&input, &mut vec![0u8; hex_len]).unwrap();

        // Scalar path
        better_hex::test_internals::scalar::encode::<false>(&input, &mut scalar_out);

        let simd_hex = better_hex::encode(&input);
        let scalar_hex: Vec<u8> = scalar_out.iter().map(|m| unsafe { m.assume_init() }).collect();
        prop_assert_eq!(simd_hex.as_bytes(), &scalar_hex[..]);
    }

    #[test]
    fn decode_matches_scalar_oracle(input in proptest::collection::vec(any::<u8>(), 0..256)) {
        let hex = better_hex::encode(&input);
        let hex_bytes = hex.as_bytes();

        // SIMD decode
        let simd_result = better_hex::decode(hex_bytes);

        // Scalar decode
        let mut scalar_out = vec![core::mem::MaybeUninit::<u8>::uninit(); input.len()];
        let scalar_result = better_hex::test_internals::scalar::decode(hex_bytes, &mut scalar_out);

        match (simd_result, scalar_result) {
            (Ok(simd_vec), Ok(())) => {
                let scalar_vec: Vec<u8> = scalar_out.iter().map(|m| unsafe { m.assume_init() }).collect();
                prop_assert_eq!(&simd_vec, &scalar_vec);
            }
            (Err(_), Err(_)) => {} // both failed, ok
            (a, b) => prop_assert!(false, "mismatch: SIMD={a:?}, scalar={b:?}"),
        }
    }

    #[test]
    fn check_matches_scalar_oracle(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let simd_result = better_hex::check_raw(&input);
        let scalar_result = better_hex::test_internals::scalar::check(&input);
        prop_assert_eq!(simd_result, scalar_result);
    }
```

- [ ] **Step 3: Run cross-backend tests**

Run: `cargo test --test properties`
Expected: all property tests pass (NEON matches scalar on this aarch64 machine)

- [ ] **Step 4: Commit**

```bash
git add src/backend/mod.rs src/lib.rs tests/properties.rs
git commit -m "test: cross-backend property tests — SIMD vs scalar oracle"
```

---

### Task 6: Boundary-length Tests

**Files:**
- Modify: `tests/decode.rs` or new `tests/boundaries.rs`

Test inputs at exact SIMD chunk boundaries to catch off-by-one errors in the chunk/tail transition.

- [ ] **Step 1: Create `tests/boundaries.rs`**

```rust
//! Tests at SIMD chunk boundary lengths.
//!
//! SIMD backends process data in chunks of 16 (NEON/SSSE3/WASM) or 32 (AVX2)
//! bytes. These tests exercise the exact boundary, one below, and one above
//! to catch off-by-one errors in the chunk/tail transition.

const BOUNDARY_SIZES: &[usize] = &[
    0, 1, 2,
    15, 16, 17,     // NEON/SSSE3/WASM chunk boundary
    31, 32, 33,     // AVX2 chunk boundary (encode)
    63, 64, 65,     // AVX2 decode boundary (64 hex chars = 32 bytes)
    127, 128, 129,
    255, 256, 257,
];

#[test]
fn encode_decode_roundtrip_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let hex = better_hex::encode(&input);
        assert_eq!(hex.len(), size * 2, "encode length wrong for size {size}");
        let decoded = better_hex::decode(&hex).unwrap();
        assert_eq!(decoded, input, "roundtrip failed for size {size}");
    }
}

#[test]
fn encode_upper_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let hex = better_hex::encode_upper(&input);
        assert_eq!(hex.len(), size * 2);
        for b in hex.bytes() {
            assert!(
                matches!(b, b'0'..=b'9' | b'A'..=b'F'),
                "unexpected char 0x{b:02x} at size {size}"
            );
        }
    }
}

#[test]
fn check_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let hex = better_hex::encode(&input);
        assert!(better_hex::check(hex.as_bytes()), "check failed for size {size}");
    }
}

#[test]
fn decode_invalid_at_boundaries() {
    for &size in BOUNDARY_SIZES {
        if size < 2 { continue; }
        // Create valid hex then corrupt the last byte
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let mut hex = better_hex::encode(&input).into_bytes();
        *hex.last_mut().unwrap() = b'G'; // corrupt
        let result = better_hex::decode(&hex);
        assert!(result.is_err(), "should fail for corrupted size {size}");
    }
}
```

- [ ] **Step 2: Run boundary tests**

Run: `cargo test --test boundaries -v`
Expected: all pass

- [ ] **Step 3: Commit**

```bash
git add tests/boundaries.rs
git commit -m "test: SIMD boundary-length tests at chunk edges"
```
