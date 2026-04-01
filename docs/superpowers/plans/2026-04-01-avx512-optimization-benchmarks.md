# AVX-512, Optimizations & Comparison Benchmarks

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add AVX-512 encode/decode/check backend, investigate and close the mid-range encode performance gap vs const-hex, and add comprehensive comparison benchmarks against const-hex/faster-hex/hex covering all public APIs (encode, decode, check, fmt, serde).

**Architecture:** AVX-512 backend in `src/backend/x86.rs` alongside existing SSSE3/AVX2, with dispatch priority AVX-512 > AVX2 > SSSE3 > scalar. Comparison benchmarks in a separate `benches/compare.rs` file with feature-gated dependencies on competing crates. Optimization work focuses on the NEON/x86 encode paths where const-hex leads at mid-range sizes (64-1024 bytes).

**Tech Stack:** `core::arch::x86_64` (AVX-512BW/VL), criterion, const-hex/faster-hex/hex as dev-dependencies behind feature flags.

**Note:** AVX-512 can only be cross-compile checked on this aarch64 machine, not run. The comparison benchmarks run natively (NEON) and via Rosetta (x86).

---

## File Structure

```
src/backend/
  x86.rs              — add AVX-512 encode/decode/check functions
  mod.rs              — add AVX-512 to dispatch (AVX-512 > AVX2 > SSSE3 > scalar)
benches/
  compare.rs          — comprehensive comparison vs const-hex/faster-hex/hex
Cargo.toml            — add comparison crate dev-deps behind feature flags
```

---

### Task 1: AVX-512 Encode

**Files:**
- Modify: `src/backend/x86.rs`

AVX-512BW encode processes 64 input bytes → 128 hex chars per iteration using 512-bit registers. Same algorithm as AVX2 but wider.

Key instructions:
- `_mm512_shuffle_epi8` — 512-bit pshufb (works within 128-bit lanes)
- `_mm512_broadcastsi128_si512` — broadcast hex LUT to all 4 lanes
- `_mm512_unpacklo/hi_epi8` — interleave (within 128-bit lanes)
- `_mm512_permutex2var_epi8` — cross-lane byte permute (AVX-512VBMI, optional)
  OR `_mm512_permutexvar_epi64` for lane fixup

Since `_mm512_permutex2var_epi8` requires VBMI (not baseline AVX-512), use `_mm512_permutexvar_epi64` for the lane fixup after interleaving, similar to the AVX2 `permute2x128` pattern but for 4 lanes.

- [ ] **Step 1: Add `encode_avx512` function to `src/backend/x86.rs`**

```rust
/// AVX-512BW hex encoder. Processes 64 input bytes (128 hex chars) per iteration.
///
/// Same pshufb-LUT algorithm as SSSE3/AVX2 but using 512-bit registers.
/// After unpacklo/hi, needs a 64-bit permute to fix cross-lane ordering
/// (AVX-512 unpack operates within 128-bit lanes like AVX2).
///
/// # Safety
/// Caller must verify AVX-512BW is available.
#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn encode_avx512<const UPPER: bool>(
    input: &[u8],
    output: &mut [MaybeUninit<u8>],
) {
    debug_assert_eq!(output.len(), input.len() * 2);

    unsafe {
        let lut = if UPPER {
            _mm512_broadcast_i32x4(_mm_loadu_si128(b"0123456789ABCDEF".as_ptr().cast()))
        } else {
            _mm512_broadcast_i32x4(_mm_loadu_si128(b"0123456789abcdef".as_ptr().cast()))
        };
        let mask_lo = _mm512_set1_epi8(0x0F);

        // Lane fixup indices for the 8 qwords after unpack interleaving.
        // unpacklo/hi on 512-bit work within each 128-bit lane, producing:
        //   lane0: [lo_interleave_0_7], lane1: [lo_interleave_16_23],
        //   lane2: [lo_interleave_32_39], lane3: [lo_interleave_48_55]
        // and similarly for hi. We need to reassemble as:
        //   [lane0_lo, lane0_hi, lane1_lo, lane1_hi, lane2_lo, lane2_hi, lane3_lo, lane3_hi]
        let perm_lo = _mm512_setr_epi64(0, 4, 1, 5, 2, 6, 3, 7);

        let mut i = 0usize;
        let simd_end = input.len() & !63;

        while i < simd_end {
            let chunk = _mm512_loadu_si512(input.as_ptr().add(i).cast());
            let lo_nib = _mm512_and_si512(chunk, mask_lo);
            let hi_nib = _mm512_and_si512(_mm512_srli_epi16(chunk, 4), mask_lo);
            let lo_chars = _mm512_shuffle_epi8(lut, lo_nib);
            let hi_chars = _mm512_shuffle_epi8(lut, hi_nib);

            let interleaved_lo = _mm512_unpacklo_epi8(hi_chars, lo_chars);
            let interleaved_hi = _mm512_unpackhi_epi8(hi_chars, lo_chars);

            // Fix cross-lane ordering.
            let out0 = _mm512_permutexvar_epi64(perm_lo, interleaved_lo);
            let out1 = _mm512_permutexvar_epi64(perm_lo, interleaved_hi);

            let out_ptr = output.as_mut_ptr().add(i * 2).cast::<__m512i>();
            _mm512_storeu_si512(out_ptr, out0);
            _mm512_storeu_si512(out_ptr.add(1), out1);
            i += 64;
        }

        // Tail: AVX2 for >= 32 remaining, then SSSE3, then scalar.
        if i < input.len() {
            encode_avx2::<UPPER>(&input[i..], &mut output[i * 2..]);
        }
    }
}
```

- [ ] **Step 2: Cross-compile check**

Run: `cargo check --target x86_64-apple-darwin`
Expected: compiles (function exists but not yet called from dispatch)

- [ ] **Step 3: Commit**

```bash
git add src/backend/x86.rs
git commit -m "feat: AVX-512BW encode — 64 bytes per iteration"
```

---

### Task 2: AVX-512 Decode

**Files:**
- Modify: `src/backend/x86.rs`

AVX-512 decode using the Lemire 2023 algorithm at 512-bit width. Processes 128 hex chars → 64 output bytes per iteration.

Same `const SHORT_CIRCUIT: bool` pattern as SSSE3/AVX2.

- [ ] **Step 1: Add `decode_chunk_512` and `decode_avx512_inner` to x86.rs**

The decode chunk function follows the same Lemire pattern: subtract-1, hash key, pshufb check/rebase, maddubs pack, packus narrow, permute fixup.

Key difference from AVX2: after `_mm512_packus_epi16`, need `_mm512_permutexvar_epi64` to fix the lane ordering (packus operates within 128-bit lanes).

```rust
#[inline]
#[target_feature(enable = "avx512bw")]
unsafe fn decode_chunk_512(
    chunk: __m512i,
    delta_check: __m512i,
    delta_rebase: __m512i,
    one: __m512i,
    mask_hi: __m512i,
    weights: __m512i,
) -> (__m512i, u64) {
    let vm1 = _mm512_sub_epi8(chunk, one);
    let hash_key = _mm512_and_si512(_mm512_srli_epi16(vm1, 4), mask_hi);
    let check = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_check, hash_key));
    let nibbles = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_rebase, hash_key));

    // Validation: movepi8_mask gets one bit per byte where MSB is set.
    let mask = _mm512_movepi8_mask(check);

    let packed16 = _mm512_maddubs_epi16(nibbles, weights);
    let packed8 = _mm512_packus_epi16(packed16, packed16);
    // Fix lane ordering from packus.
    let perm = _mm512_setr_epi64(0, 4, 1, 5, 2, 6, 3, 7);
    let result = _mm512_permutexvar_epi64(perm, packed8);

    (result, mask)
}
```

The inner decode function processes 128 hex chars (two 512-bit loads) → 64 output bytes per iteration, fusing the two movemask results with OR before checking.

Add public wrappers: `decode_avx512` and `ct_decode_avx512`.

- [ ] **Step 2: Cross-compile check**

Run: `cargo check --target x86_64-apple-darwin`

- [ ] **Step 3: Commit**

```bash
git add src/backend/x86.rs
git commit -m "feat: AVX-512BW decode — Lemire 2023 at 512-bit, 64 output bytes/iter"
```

---

### Task 3: AVX-512 Check + Dispatch Integration

**Files:**
- Modify: `src/backend/x86.rs` — add `check_avx512_inner`, `check_avx512`, `ct_check_avx512`
- Modify: `src/backend/mod.rs` — add AVX-512 to dispatch

- [ ] **Step 1: Add AVX-512 check function to x86.rs**

Reuse the Lemire delta_check validation at 512-bit width:

```rust
#[inline]
#[target_feature(enable = "avx512bw")]
unsafe fn check_avx512_inner<const SHORT_CIRCUIT: bool>(input: &[u8]) -> bool {
    unsafe {
        let delta_check = _mm512_broadcast_i32x4(decode_delta_check_128());
        let one = _mm512_set1_epi8(1);
        let mask_hi = _mm512_set1_epi8(0x0F);

        let mut i = 0usize;
        let mut err_accum = 0u64;
        let simd_end = input.len() & !63;

        while i < simd_end {
            let chunk = _mm512_loadu_si512(input.as_ptr().add(i).cast());
            let vm1 = _mm512_sub_epi8(chunk, one);
            let hash_key = _mm512_and_si512(_mm512_srli_epi16(vm1, 4), mask_hi);
            let check = _mm512_add_epi8(vm1, _mm512_shuffle_epi8(delta_check, hash_key));
            let mask = _mm512_movepi8_mask(check);

            if SHORT_CIRCUIT {
                if mask != 0 { return false; }
            } else {
                err_accum |= mask;
            }

            i += 64;
        }

        if SHORT_CIRCUIT {
            if i < input.len() { return check_ssse3(&input[i..]); }
            true
        } else {
            let tail_ok = if i < input.len() { ct_check_ssse3(&input[i..]) } else { true };
            tail_ok && err_accum == 0
        }
    }
}

#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn check_avx512(input: &[u8]) -> bool {
    unsafe { check_avx512_inner::<true>(input) }
}

#[target_feature(enable = "avx512bw")]
pub(crate) unsafe fn ct_check_avx512(input: &[u8]) -> bool {
    unsafe { check_avx512_inner::<false>(input) }
}
```

- [ ] **Step 2: Update dispatch in mod.rs**

In each of the 6 dispatch functions (`encode`, `decode`, `check`, `ct_encode`, `ct_decode`, `ct_check`), add AVX-512BW as the highest priority before AVX2 in the x86 runtime detection:

```rust
if std::is_x86_feature_detected!("avx512bw") {
    unsafe { x86::encode_avx512::<UPPER>(input, output) }
} else if std::is_x86_feature_detected!("avx2") {
    ...
```

Also add to cpufeatures no_std path:
```rust
cpufeatures::new!(cpuid_avx512bw, "avx512bw");
```

- [ ] **Step 3: Cross-compile check + native tests**

Run: `cargo check --target x86_64-apple-darwin`
Run: `cargo test` (aarch64 — AVX-512 code not compiled)
Run: `cargo test --target x86_64-apple-darwin` (Rosetta — may not have AVX-512, falls back to AVX2)

- [ ] **Step 4: Commit**

```bash
git add src/backend/x86.rs src/backend/mod.rs
git commit -m "feat: AVX-512BW check + dispatch integration (AVX-512 > AVX2 > SSSE3)"
```

---

### Task 4: Comparison Benchmark Suite

**Files:**
- Modify: `Cargo.toml` — add comparison crate deps behind feature flags
- Create: `benches/compare.rs` — comprehensive comparison benchmarks

This benchmarks every public API path against const-hex, faster-hex, and the hex crate. Feature-gated so the deps are optional.

- [ ] **Step 1: Add comparison deps to Cargo.toml**

Add features:
```toml
_bench_const_hex = ["dep:const-hex"]
_bench_faster_hex = ["dep:faster-hex"]
_bench_hex = ["dep:hex"]
```

Add deps:
```toml
const-hex = { version = "1", optional = true }
faster-hex = { version = "0.10", optional = true }
hex = { version = "0.4", optional = true }
```

Add bench target:
```toml
[[bench]]
name = "compare"
harness = false
```

- [ ] **Step 2: Create `benches/compare.rs`**

Benchmark matrix covering ALL public APIs:

**Encode:**
- `encode(&bytes) -> String` (better-hex vs const-hex vs faster-hex vs hex)
- `encode_to_slice(&bytes, &mut buf) -> &str` (better-hex vs const-hex vs faster-hex)
- Sizes: 1, 4, 16, 32, 64, 128, 256, 512, 1024, 4096, 16384

**Decode:**
- `decode(&hex) -> Vec<u8>` (all four crates)
- `decode_to_slice(&hex, &mut buf)` (better-hex vs const-hex vs faster-hex)
- `decode_to_array::<N>(&hex) -> [u8; N]` (better-hex vs const-hex)
- Same sizes

**Check/Validate:**
- `check(&hex) -> bool` (better-hex vs const-hex)
- Same sizes

**fmt::Display:**
- `format!("{}", display(&bytes))` (better-hex vs const-hex)
- `write!(&mut buf, "{}", display(&bytes))` with pre-allocated buffer
- Same sizes

**Serde (requires serde feature on all crates):**
- `serde_json::to_string(&wrapper)` (better-hex serde vs const-hex serde)
- `serde_json::from_str(&json)` (better-hex serde vs const-hex serde)
- Sizes: 16, 64, 256, 1024

**Tail-inducing sizes** (expose SIMD boundary behavior):
- 15, 17, 31, 33, 63, 65, 100, 127, 129, 255, 257, 500, 1023

All benchmarks set `Throughput::Bytes` for GB/s reporting.

Use `cfg` gates so each comparison crate is optional:
```rust
#[cfg(feature = "_bench_const_hex")]
group.bench_with_input(BenchmarkId::new("const_hex", size), &input, |b, input| { ... });
```

- [ ] **Step 3: Run comparison benchmarks**

```bash
cargo bench --features _bench_internals,_bench_const_hex,_bench_faster_hex,_bench_hex,serde --bench compare
```

- [ ] **Step 4: Commit**

```bash
git add Cargo.toml benches/compare.rs
git commit -m "bench: comprehensive comparison vs const-hex, faster-hex, hex crate"
```

---

### Task 5: Investigate and Fix Encode Mid-Range Gap

**Files:**
- Modify: `src/backend/neon.rs` (if optimization found)
- Modify: `src/backend/x86.rs` (if optimization found)

The comparison benchmarks from earlier showed const-hex ~5-10% faster on `encode_to_slice` at 64-1024 bytes. The investigation agent found the decode gap was caused by redundant `vmaxvq_u8` (fixed). For encode, the remaining gap may be due to:

1. **Loop structure** — const-hex may use a tighter loop or different unrolling
2. **Store pattern** — const-hex uses an `Output` trait with pointer-advancing writes vs our index-based approach
3. **Tail handling** — different scalar fallback strategies

This task is investigative — read the comparison benchmark results from Task 4, profile the encode path, and apply any optimizations found.

- [ ] **Step 1: Run encode_to_slice comparison at problem sizes**

```bash
cargo bench --features _bench_const_hex --bench compare -- "encode_to_slice/(64|128|256|512|1024)"
```

Capture the exact numbers.

- [ ] **Step 2: Profile with `cargo-asm` or `perf`**

Compare the generated assembly for our NEON encode vs const-hex's. Look for:
- Extra instructions in our loop body
- Different unrolling (does LLVM unroll differently?)
- Store pattern differences

- [ ] **Step 3: Apply optimizations and re-benchmark**

If a concrete optimization is found, apply it, re-run the comparison, and verify the gap closes.

- [ ] **Step 4: Commit any improvements**

```bash
git add src/backend/
git commit -m "perf: [describe the optimization]"
```
