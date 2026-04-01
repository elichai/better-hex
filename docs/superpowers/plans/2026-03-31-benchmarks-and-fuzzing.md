# Benchmarks & Fuzzing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add criterion benchmarks for all backend configurations (scalar, CT scalar, NEON, NEON-CT) across multiple input sizes, plus cargo-fuzz targets that test each backend against a naive oracle and exercise error paths with mismatched lengths.

**Architecture:** Benchmarks use criterion via `[[bench]]` targets. To benchmark individual backends directly (not just the dispatched path), we expose backend functions through `#[doc(hidden)]` modules gated on a `_bench_internals` feature. Fuzz targets use `cargo-fuzz` with `libfuzzer`, calling each backend directly via the same internals feature.

**Tech Stack:** `criterion` (benchmarks), `cargo-fuzz` / `libfuzzer-sys` (fuzzing), existing `proptest` (property tests already exist).

---

## File Structure

```
benches/
  encode.rs           — encode benchmarks: scalar, ct_scalar, NEON, NEON-CT, dispatched
  decode.rs           — decode benchmarks: same matrix
  check.rs            — check benchmarks: same matrix
fuzz/
  Cargo.toml          — fuzz workspace
  fuzz_targets/
    encode_oracle.rs  — fuzz encode: all backends vs naive oracle
    decode_oracle.rs  — fuzz decode: all backends vs naive oracle + invalid input
    roundtrip.rs      — fuzz encode→decode roundtrip across backends
    lengths.rs        — fuzz mismatched/invalid lengths across all public APIs
Cargo.toml            — add criterion, _bench_internals feature
src/lib.rs            — expose bench internals under feature gate
src/backend/mod.rs    — pub bench-only re-exports
```

---

### Task 1: Expose Backend Internals for Benchmarks/Fuzzing

**Files:**
- Modify: `Cargo.toml`
- Modify: `src/lib.rs`
- Modify: `src/backend/mod.rs`

We need benchmarks and fuzz targets to call individual backend functions directly (scalar, ct_scalar, neon, etc.) — not just the dispatched path. We add a `_bench_internals` feature that exposes these.

- [ ] **Step 1: Add criterion dep and feature to Cargo.toml**

Add to `[features]`:
```toml
_bench_internals = []
```

Add to `[dev-dependencies]`:
```toml
criterion = { version = "0.5", default-features = false }
```

Add bench harness config:
```toml
[[bench]]
name = "encode"
harness = false

[[bench]]
name = "decode"
harness = false

[[bench]]
name = "check"
harness = false
```

- [ ] **Step 2: Expose backend internals in `src/lib.rs`**

Add at the end of `src/lib.rs`:

```rust
/// Backend internals exposed for benchmarks and fuzz targets.
/// Not part of the public API — do not rely on this.
#[cfg(any(feature = "_bench_internals", test))]
#[doc(hidden)]
pub mod bench_internals {
    pub use crate::backend::{scalar, ct_scalar};

    #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
    pub use crate::backend::neon;

    #[cfg(any(target_arch = "x86", target_arch = "x86_64"))]
    pub use crate::backend::x86;

    #[cfg(all(target_arch = "wasm32", target_feature = "simd128"))]
    pub use crate::backend::wasm;

    pub use crate::backend::{
        encode as dispatched_encode,
        decode as dispatched_decode,
        check as dispatched_check,
        ct_encode as dispatched_ct_encode,
        ct_decode as dispatched_ct_decode,
        ct_check as dispatched_ct_check,
    };
}
```

Also replace the existing `test_internals` with `bench_internals`:

```rust
// Remove the old test_internals, the bench_internals covers it (gated on test too).
```

Update `tests/properties.rs` to use `bench_internals` instead of `test_internals`.

- [ ] **Step 3: Make backend modules conditionally public**

In `src/backend/mod.rs`, change the SIMD module visibility to be `pub` when the feature is enabled. The simplest way — change:

```rust
pub(crate) mod neon;
```
to:
```rust
#[cfg(any(feature = "_bench_internals", test))]
pub mod neon;
#[cfg(not(any(feature = "_bench_internals", test)))]
pub(crate) mod neon;
```

Actually this is ugly with duplication. Simpler: just make them all `pub` — they're inside `backend` which is private (`mod backend` in lib.rs), so they're only reachable via `bench_internals`. Just change all `pub(crate) mod` to `pub mod` in mod.rs.

- [ ] **Step 4: Verify**

Run: `cargo test` — all 114 tests pass
Run: `cargo check --features _bench_internals` — compiles

- [ ] **Step 5: Commit**

```bash
git add Cargo.toml src/lib.rs src/backend/mod.rs tests/properties.rs
git commit -m "feat: expose backend internals for benchmarks and fuzzing"
```

---

### Task 2: Encode Benchmarks

**Files:**
- Create: `benches/encode.rs`

Benchmark matrix:
- **Backends**: scalar, ct_scalar, NEON (if aarch64), NEON-CT, dispatched, dispatched-CT
- **Sizes**: 16, 32, 64, 256, 1024, 4096 bytes
- **Case**: lower only (upper uses the same code path, just different LUT)

Each benchmark allocates the output buffer once, then calls the backend encode in the measurement loop.

- [ ] **Step 1: Create `benches/encode.rs`**

```rust
use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use core::mem::MaybeUninit;

const SIZES: &[usize] = &[16, 32, 64, 256, 1024, 4096];

fn make_input(size: usize) -> Vec<u8> {
    (0..size).map(|i| (i & 0xFF) as u8).collect()
}

fn bench_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode");

    for &size in SIZES {
        let input = make_input(size);
        group.throughput(Throughput::Bytes(size as u64));

        // Dispatched (default backend — NEON on aarch64, SSSE3/AVX2 on x86)
        group.bench_with_input(BenchmarkId::new("dispatched", size), &input, |b, input| {
            let mut out = vec![MaybeUninit::uninit(); size * 2];
            b.iter(|| {
                better_hex::bench_internals::dispatched_encode::<false>(
                    black_box(input),
                    black_box(&mut out),
                );
            });
        });

        // Dispatched CT
        group.bench_with_input(BenchmarkId::new("dispatched_ct", size), &input, |b, input| {
            let mut out = vec![MaybeUninit::uninit(); size * 2];
            b.iter(|| {
                better_hex::bench_internals::dispatched_ct_encode::<false>(
                    black_box(input),
                    black_box(&mut out),
                );
            });
        });

        // Scalar (LUT)
        group.bench_with_input(BenchmarkId::new("scalar", size), &input, |b, input| {
            let mut out = vec![MaybeUninit::uninit(); size * 2];
            b.iter(|| {
                better_hex::bench_internals::scalar::encode::<false>(
                    black_box(input),
                    black_box(&mut out),
                );
            });
        });

        // CT Scalar (arithmetic)
        group.bench_with_input(BenchmarkId::new("ct_scalar", size), &input, |b, input| {
            let mut out = vec![MaybeUninit::uninit(); size * 2];
            b.iter(|| {
                better_hex::bench_internals::ct_scalar::encode::<false>(
                    black_box(input),
                    black_box(&mut out),
                );
            });
        });

        // NEON (aarch64 only)
        #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
        group.bench_with_input(BenchmarkId::new("neon", size), &input, |b, input| {
            let mut out = vec![MaybeUninit::uninit(); size * 2];
            b.iter(|| {
                better_hex::bench_internals::neon::encode::<false>(
                    black_box(input),
                    black_box(&mut out),
                );
            });
        });
    }

    group.finish();
}

criterion_group!(benches, bench_encode);
criterion_main!(benches);
```

- [ ] **Step 2: Run benchmarks**

Run: `cargo bench --features _bench_internals --bench encode`
Expected: benchmark results for all backends at all sizes

- [ ] **Step 3: Commit**

```bash
git add benches/encode.rs
git commit -m "bench: encode benchmarks — scalar, ct_scalar, NEON, dispatched"
```

---

### Task 3: Decode Benchmarks

**Files:**
- Create: `benches/decode.rs`

Same matrix as encode but for decode. Uses pre-encoded hex as input.

- [ ] **Step 1: Create `benches/decode.rs`**

```rust
use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use core::mem::MaybeUninit;

const SIZES: &[usize] = &[16, 32, 64, 256, 1024, 4096];

fn make_hex_input(byte_size: usize) -> Vec<u8> {
    let bytes: Vec<u8> = (0..byte_size).map(|i| (i & 0xFF) as u8).collect();
    better_hex::encode(&bytes).into_bytes()
}

fn bench_decode(c: &mut Criterion) {
    let mut group = c.benchmark_group("decode");

    for &size in SIZES {
        let hex = make_hex_input(size);
        // Throughput is in terms of output bytes (decoded)
        group.throughput(Throughput::Bytes(size as u64));

        // Dispatched
        group.bench_with_input(BenchmarkId::new("dispatched", size), &hex, |b, hex| {
            let mut out = vec![MaybeUninit::uninit(); size];
            b.iter(|| {
                better_hex::bench_internals::dispatched_decode(
                    black_box(hex),
                    black_box(&mut out),
                ).unwrap();
            });
        });

        // Dispatched CT
        group.bench_with_input(BenchmarkId::new("dispatched_ct", size), &hex, |b, hex| {
            let mut out = vec![MaybeUninit::uninit(); size];
            b.iter(|| {
                better_hex::bench_internals::dispatched_ct_decode(
                    black_box(hex),
                    black_box(&mut out),
                ).unwrap();
            });
        });

        // Scalar
        group.bench_with_input(BenchmarkId::new("scalar", size), &hex, |b, hex| {
            let mut out = vec![MaybeUninit::uninit(); size];
            b.iter(|| {
                better_hex::bench_internals::scalar::decode(
                    black_box(hex),
                    black_box(&mut out),
                ).unwrap();
            });
        });

        // CT Scalar
        group.bench_with_input(BenchmarkId::new("ct_scalar", size), &hex, |b, hex| {
            let mut out = vec![MaybeUninit::uninit(); size];
            b.iter(|| {
                better_hex::bench_internals::ct_scalar::decode(
                    black_box(hex),
                    black_box(&mut out),
                ).unwrap();
            });
        });

        // NEON
        #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
        {
            group.bench_with_input(BenchmarkId::new("neon", size), &hex, |b, hex| {
                let mut out = vec![MaybeUninit::uninit(); size];
                b.iter(|| {
                    better_hex::bench_internals::neon::decode(
                        black_box(hex),
                        black_box(&mut out),
                    ).unwrap();
                });
            });

            // NEON CT
            group.bench_with_input(BenchmarkId::new("neon_ct", size), &hex, |b, hex| {
                let mut out = vec![MaybeUninit::uninit(); size];
                b.iter(|| {
                    better_hex::bench_internals::neon::ct_decode(
                        black_box(hex),
                        black_box(&mut out),
                    ).unwrap();
                });
            });
        }
    }

    group.finish();
}

criterion_group!(benches, bench_decode);
criterion_main!(benches);
```

- [ ] **Step 2: Run benchmarks**

Run: `cargo bench --features _bench_internals --bench decode`

- [ ] **Step 3: Commit**

```bash
git add benches/decode.rs
git commit -m "bench: decode benchmarks — scalar, ct_scalar, NEON, NEON-CT, dispatched"
```

---

### Task 4: Check Benchmarks

**Files:**
- Create: `benches/check.rs`

- [ ] **Step 1: Create `benches/check.rs`**

```rust
use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};

const SIZES: &[usize] = &[16, 32, 64, 256, 1024, 4096];

fn make_hex_input(byte_size: usize) -> Vec<u8> {
    let bytes: Vec<u8> = (0..byte_size).map(|i| (i & 0xFF) as u8).collect();
    better_hex::encode(&bytes).into_bytes()
}

fn bench_check(c: &mut Criterion) {
    let mut group = c.benchmark_group("check");

    for &size in SIZES {
        let hex = make_hex_input(size);
        group.throughput(Throughput::Bytes(hex.len() as u64));

        group.bench_with_input(BenchmarkId::new("dispatched", size), &hex, |b, hex| {
            b.iter(|| better_hex::bench_internals::dispatched_check(black_box(hex)));
        });

        group.bench_with_input(BenchmarkId::new("dispatched_ct", size), &hex, |b, hex| {
            b.iter(|| better_hex::bench_internals::dispatched_ct_check(black_box(hex)));
        });

        group.bench_with_input(BenchmarkId::new("scalar", size), &hex, |b, hex| {
            b.iter(|| better_hex::bench_internals::scalar::check(black_box(hex)));
        });

        group.bench_with_input(BenchmarkId::new("ct_scalar", size), &hex, |b, hex| {
            b.iter(|| better_hex::bench_internals::ct_scalar::check(black_box(hex)));
        });

        #[cfg(all(target_arch = "aarch64", target_feature = "neon"))]
        {
            group.bench_with_input(BenchmarkId::new("neon", size), &hex, |b, hex| {
                b.iter(|| better_hex::bench_internals::neon::check(black_box(hex)));
            });

            group.bench_with_input(BenchmarkId::new("neon_ct", size), &hex, |b, hex| {
                b.iter(|| better_hex::bench_internals::neon::ct_check(black_box(hex)));
            });
        }
    }

    group.finish();
}

criterion_group!(benches, bench_check);
criterion_main!(benches);
```

- [ ] **Step 2: Run**

Run: `cargo bench --features _bench_internals --bench check`

- [ ] **Step 3: Commit**

```bash
git add benches/check.rs
git commit -m "bench: check benchmarks — scalar, ct_scalar, NEON, NEON-CT, dispatched"
```

---

### Task 5: Fuzz Setup + Encode Oracle Target

**Files:**
- Create: `fuzz/Cargo.toml`
- Create: `fuzz/fuzz_targets/encode_oracle.rs`

- [ ] **Step 1: Initialize cargo-fuzz**

Run: `cargo fuzz init` (creates `fuzz/` directory with Cargo.toml)

Then edit `fuzz/Cargo.toml` to add the `_bench_internals` feature on the better-hex dependency:

```toml
[dependencies]
libfuzzer-sys = "0.4"

[dependencies.better-hex]
path = ".."
features = ["_bench_internals"]
```

- [ ] **Step 2: Create `fuzz/fuzz_targets/encode_oracle.rs`**

Tests every available backend's encode against a naive oracle:

```rust
#![no_main]
use libfuzzer_sys::fuzz_target;
use core::mem::MaybeUninit;

/// Naive reference encoder — the simplest possible implementation.
fn naive_encode_lower(input: &[u8]) -> Vec<u8> {
    let mut out = Vec::with_capacity(input.len() * 2);
    for &byte in input {
        out.push(b"0123456789abcdef"[(byte >> 4) as usize]);
        out.push(b"0123456789abcdef"[(byte & 0x0f) as usize]);
    }
    out
}

fuzz_target!(|data: &[u8]| {
    let expected = naive_encode_lower(data);
    let hex_len = data.len() * 2;

    // Scalar
    let mut scalar_out = vec![MaybeUninit::uninit(); hex_len];
    better_hex::bench_internals::scalar::encode::<false>(data, &mut scalar_out);
    let scalar: Vec<u8> = scalar_out.iter().map(|m| unsafe { m.assume_init() }).collect();
    assert_eq!(scalar, expected, "scalar encode mismatch");

    // CT Scalar
    let mut ct_out = vec![MaybeUninit::uninit(); hex_len];
    better_hex::bench_internals::ct_scalar::encode::<false>(data, &mut ct_out);
    let ct: Vec<u8> = ct_out.iter().map(|m| unsafe { m.assume_init() }).collect();
    assert_eq!(ct, expected, "ct_scalar encode mismatch");

    // Dispatched
    let mut disp_out = vec![MaybeUninit::uninit(); hex_len];
    better_hex::bench_internals::dispatched_encode::<false>(data, &mut disp_out);
    let disp: Vec<u8> = disp_out.iter().map(|m| unsafe { m.assume_init() }).collect();
    assert_eq!(disp, expected, "dispatched encode mismatch");

    // Dispatched CT
    let mut disp_ct_out = vec![MaybeUninit::uninit(); hex_len];
    better_hex::bench_internals::dispatched_ct_encode::<false>(data, &mut disp_ct_out);
    let disp_ct: Vec<u8> = disp_ct_out.iter().map(|m| unsafe { m.assume_init() }).collect();
    assert_eq!(disp_ct, expected, "dispatched ct encode mismatch");

    // Upper case: just verify dispatched matches scalar (not vs naive)
    let mut upper_disp = vec![MaybeUninit::uninit(); hex_len];
    let mut upper_scalar = vec![MaybeUninit::uninit(); hex_len];
    better_hex::bench_internals::dispatched_encode::<true>(data, &mut upper_disp);
    better_hex::bench_internals::scalar::encode::<true>(data, &mut upper_scalar);
    let ud: Vec<u8> = upper_disp.iter().map(|m| unsafe { m.assume_init() }).collect();
    let us: Vec<u8> = upper_scalar.iter().map(|m| unsafe { m.assume_init() }).collect();
    assert_eq!(ud, us, "upper dispatched vs scalar mismatch");
});
```

- [ ] **Step 3: Smoke test**

Run: `cargo fuzz run encode_oracle -- -max_total_time=10`
Expected: runs for 10 seconds without crashes

- [ ] **Step 4: Commit**

```bash
git add fuzz/
git commit -m "fuzz: encode oracle — all backends vs naive reference"
```

---

### Task 6: Decode Oracle Fuzz Target

**Files:**
- Create: `fuzz/fuzz_targets/decode_oracle.rs`

Tests decode with both valid hex (encode→decode roundtrip) and arbitrary bytes (may be invalid). All backends must agree on Ok/Err and produce identical output.

- [ ] **Step 1: Create `fuzz/fuzz_targets/decode_oracle.rs`**

```rust
#![no_main]
use libfuzzer_sys::fuzz_target;
use core::mem::MaybeUninit;

fn naive_decode(input: &[u8]) -> Result<Vec<u8>, ()> {
    if input.len() % 2 != 0 { return Err(()); }
    let mut out = Vec::with_capacity(input.len() / 2);
    for pair in input.chunks_exact(2) {
        let hi = nibble(pair[0]).ok_or(())?;
        let lo = nibble(pair[1]).ok_or(())?;
        out.push((hi << 4) | lo);
    }
    Ok(out)
}

fn nibble(b: u8) -> Option<u8> {
    match b {
        b'0'..=b'9' => Some(b - b'0'),
        b'a'..=b'f' => Some(b - b'a' + 10),
        b'A'..=b'F' => Some(b - b'A' + 10),
        _ => None,
    }
}

fuzz_target!(|data: &[u8]| {
    // Skip odd lengths for backend calls (they require even input)
    if data.len() % 2 != 0 { return; }
    let out_len = data.len() / 2;

    let naive = naive_decode(data);

    // Scalar
    let mut s_out = vec![MaybeUninit::uninit(); out_len];
    let s_res = better_hex::bench_internals::scalar::decode(data, &mut s_out);

    // CT Scalar
    let mut ct_out = vec![MaybeUninit::uninit(); out_len];
    let ct_res = better_hex::bench_internals::ct_scalar::decode(data, &mut ct_out);

    // Dispatched
    let mut d_out = vec![MaybeUninit::uninit(); out_len];
    let d_res = better_hex::bench_internals::dispatched_decode(data, &mut d_out);

    // Dispatched CT
    let mut dc_out = vec![MaybeUninit::uninit(); out_len];
    let dc_res = better_hex::bench_internals::dispatched_ct_decode(data, &mut dc_out);

    // All must agree on Ok/Err
    match &naive {
        Ok(expected) => {
            assert!(s_res.is_ok(), "scalar should succeed");
            assert!(ct_res.is_ok(), "ct_scalar should succeed");
            assert!(d_res.is_ok(), "dispatched should succeed");
            assert!(dc_res.is_ok(), "dispatched_ct should succeed");

            let s: Vec<u8> = s_out.iter().map(|m| unsafe { m.assume_init() }).collect();
            let ct: Vec<u8> = ct_out.iter().map(|m| unsafe { m.assume_init() }).collect();
            let d: Vec<u8> = d_out.iter().map(|m| unsafe { m.assume_init() }).collect();
            let dc: Vec<u8> = dc_out.iter().map(|m| unsafe { m.assume_init() }).collect();

            assert_eq!(&s, expected, "scalar decode mismatch");
            assert_eq!(&ct, expected, "ct_scalar decode mismatch");
            assert_eq!(&d, expected, "dispatched decode mismatch");
            assert_eq!(&dc, expected, "dispatched_ct decode mismatch");
        }
        Err(()) => {
            assert!(s_res.is_err(), "scalar should fail");
            assert!(ct_res.is_err(), "ct_scalar should fail");
            assert!(d_res.is_err(), "dispatched should fail");
            assert!(dc_res.is_err(), "dispatched_ct should fail");
        }
    }

    // Also test check agreement
    let naive_valid = naive.is_ok();
    assert_eq!(better_hex::bench_internals::scalar::check(data), naive_valid);
    assert_eq!(better_hex::bench_internals::ct_scalar::check(data), naive_valid);
    assert_eq!(better_hex::bench_internals::dispatched_check(data), naive_valid);
    assert_eq!(better_hex::bench_internals::dispatched_ct_check(data), naive_valid);
});
```

- [ ] **Step 2: Smoke test**

Run: `cargo fuzz run decode_oracle -- -max_total_time=10`

- [ ] **Step 3: Commit**

```bash
git add fuzz/fuzz_targets/decode_oracle.rs
git commit -m "fuzz: decode oracle — all backends vs naive, valid + invalid input"
```

---

### Task 7: Roundtrip + Length Mismatch Fuzz Targets

**Files:**
- Create: `fuzz/fuzz_targets/roundtrip.rs`
- Create: `fuzz/fuzz_targets/lengths.rs`

- [ ] **Step 1: Create `fuzz/fuzz_targets/roundtrip.rs`**

```rust
#![no_main]
use libfuzzer_sys::fuzz_target;

fuzz_target!(|data: &[u8]| {
    // Encode then decode — must roundtrip
    let hex = better_hex::encode(data);
    let decoded = better_hex::decode(&hex).unwrap();
    assert_eq!(decoded, data, "roundtrip failed");

    // Same for CT path
    let mut ct_hex = vec![0u8; data.len() * 2];
    better_hex::ct::encode_lower(data, &mut ct_hex).unwrap();
    let mut ct_decoded = vec![0u8; data.len()];
    better_hex::ct::decode(&ct_hex, &mut ct_decoded).unwrap();
    assert_eq!(ct_decoded, data, "CT roundtrip failed");

    // CT encode must match fast encode
    assert_eq!(ct_hex, hex.as_bytes(), "CT encode != fast encode");

    // Upper roundtrip
    let hex_upper = better_hex::encode_upper(data);
    let decoded_upper = better_hex::decode(&hex_upper).unwrap();
    assert_eq!(decoded_upper, data, "upper roundtrip failed");
});
```

- [ ] **Step 2: Create `fuzz/fuzz_targets/lengths.rs`**

Exercises the public API with every combination of mismatched lengths:

```rust
#![no_main]
use libfuzzer_sys::fuzz_target;
use libfuzzer_sys::arbitrary::{self, Arbitrary};

#[derive(Arbitrary, Debug)]
struct Input {
    data: Vec<u8>,
    output_len: u8,
}

fuzz_target!(|input: Input| {
    let data = &input.data;
    let out_len = input.output_len as usize;

    // encode_to_slice with potentially wrong output length
    let mut enc_out = vec![0u8; out_len];
    let enc_result = better_hex::encode_to_slice(data, &mut enc_out);
    if out_len == data.len() * 2 {
        assert!(enc_result.is_ok());
    } else {
        assert!(enc_result.is_err());
    }

    // decode_to_slice with potentially wrong lengths
    let mut dec_out = vec![0u8; out_len];
    let dec_result = better_hex::decode_to_slice(data, &mut dec_out);
    // Should succeed only if data.len() == out_len * 2 AND data is valid hex
    if data.len() == out_len * 2 {
        // Length is correct, but data might not be valid hex
        match dec_result {
            Ok(bytes) => assert_eq!(bytes.len(), out_len),
            Err(e) => assert!(matches!(e, better_hex::Error::InvalidChar { .. })),
        }
    } else {
        assert!(matches!(dec_result, Err(better_hex::Error::InvalidLength { .. })));
    }

    // decode_to_array with wrong length
    let arr_result = better_hex::decode_to_array::<4>(data);
    if data.len() == 8 {
        // Correct length for [u8; 4], but might have invalid chars
        match arr_result {
            Ok(arr) => assert_eq!(arr.len(), 4),
            Err(e) => assert!(matches!(e, better_hex::Error::InvalidChar { .. })),
        }
    } else {
        assert!(matches!(arr_result, Err(better_hex::Error::InvalidLength { .. })));
    }

    // CT decode with potentially wrong output length
    let mut ct_out = vec![0u8; out_len];
    let ct_result = better_hex::ct::decode(data, &mut ct_out);
    if data.len() == out_len * 2 {
        match ct_result {
            Ok(_) => {}
            Err(e) => assert!(matches!(e, better_hex::Error::InvalidEncoding)),
        }
    } else {
        assert!(matches!(ct_result, Err(better_hex::Error::InvalidLength { .. })));
    }
});
```

- [ ] **Step 3: Smoke test both**

Run: `cargo fuzz run roundtrip -- -max_total_time=10`
Run: `cargo fuzz run lengths -- -max_total_time=10`

- [ ] **Step 4: Commit**

```bash
git add fuzz/fuzz_targets/roundtrip.rs fuzz/fuzz_targets/lengths.rs
git commit -m "fuzz: roundtrip and length-mismatch targets"
```
