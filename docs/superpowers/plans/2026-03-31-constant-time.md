# Constant-Time Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `ct` module providing constant-time hex encode/decode/check for cryptographic contexts. Scalar CT uses branchless arithmetic (no LUTs). SIMD CT reuses the existing register-LUT algorithms but removes all early returns and data-dependent branches.

**Architecture:** `src/ct.rs` is the public module exposing `encode_lower`, `encode_upper`, `decode`, `decode_to_array`, `check`. Internally it dispatches to CT-specific backend functions. The CT scalar backend lives in `src/backend/ct_scalar.rs`. For SIMD, the existing encode is already CT (register-only LUT); for decode, we add CT variants that accumulate error bits instead of early-returning.

**Tech Stack:** Same as the main crate. No new dependencies.

**Key CT insight:** The SIMD encode path (`pshufb`/`tbl`/`swizzle` with in-register LUT) is inherently constant-time — no memory-indexed lookups, no data-dependent branches. So `ct::encode` simply delegates to the normal SIMD encode. Only the scalar encode fallback and all decode/check paths need CT-specific implementations.

---

## File Structure

```
src/
  ct.rs                — public ct module: encode_lower/upper, decode, decode_to_array, check
  backend/
    ct_scalar.rs       — CT scalar encode (branchless arithmetic) and decode (range-check masks)
    neon.rs            — add ct_decode, ct_check functions (no early return)
    x86.rs             — add ct_decode_ssse3/avx2, ct_check_ssse3 (no early return)
    wasm.rs            — add ct_decode, ct_check (no early return)
    mod.rs             — add ct_encode, ct_decode, ct_check dispatch
```

---

### Task 1: CT Scalar Backend

**Files:**
- Create: `src/backend/ct_scalar.rs`
- Modify: `src/backend/mod.rs` (add module declaration)

The CT scalar encode uses branchless arithmetic instead of a lookup table.
The CT scalar decode uses range-check masks and error accumulation.

- [ ] **Step 1: Create `src/backend/ct_scalar.rs`**

```rust
//! Constant-time scalar hex encoding and decoding.
//!
//! # Encoding algorithm
//!
//! Converts each nibble (0–15) to its ASCII hex character using arithmetic:
//! ```text
//! ret = nibble + 0x30;                         // maps 0-9 → '0'-'9'
//! ret += ((0x39i16 - ret) >> 8) & offset;      // maps 10-15 → 'a'-'f' or 'A'-'F'
//! ```
//! The arithmetic right shift of `(0x39 - ret)` creates an all-zeros mask for
//! nibbles 0–9 (where `ret <= 0x39`) and an all-ones mask for nibbles 10–15
//! (where `ret > 0x39`). The mask selects the offset to add: 0x27 for lowercase
//! (jumps from `0x3A` to `0x61` = `'a'`), 0x07 for uppercase (`0x3A` to `0x41` = `'A'`).
//!
//! # Decoding algorithm
//!
//! For each byte, three branchless range checks determine the nibble value:
//! ```text
//! ret = -1;
//! ret += (((0x2F - byte) & (byte - 0x3A)) >> 8) & (byte - 47);  // '0'-'9' → 0-9
//! ret += (((0x40 - byte) & (byte - 0x47)) >> 8) & (byte - 54);  // 'A'-'F' → 10-15
//! ret += (((0x60 - byte) & (byte - 0x67)) >> 8) & (byte - 86);  // 'a'-'f' → 10-15
//! ```
//! The expression `((lower - x) & (x - upper)) >> 8` produces all-ones (0xFFFF)
//! when `x` is in the open range `(lower, upper)` and all-zeros otherwise,
//! exploiting the sign bit of the AND of two values that are both negative
//! only when `x` is between the bounds.
//!
//! Errors are accumulated: `err |= decoded >> 8` after each byte. Only after
//! processing ALL bytes is the error checked. This prevents timing leaks
//! about which byte position was invalid.
//!
//! # Constant-time properties
//!
//! - No lookup tables (all arithmetic)
//! - No data-dependent branches
//! - Error accumulation without early return
//! - NOT constant-time w.r.t. input length (only w.r.t. data values)

use crate::error::Error;
use core::mem::MaybeUninit;

/// Constant-time nibble-to-ASCII conversion.
///
/// Uses arithmetic instead of a lookup table. `UPPER` selects the case offset.
#[inline(always)]
const fn ct_encode_nibble<const UPPER: bool>(nibble: u8) -> u8 {
    let mut ret = nibble as i16 + 0x30;
    // For nibbles 0-9: 0x39 - ret >= 0, shift produces 0, no correction.
    // For nibbles 10-15: 0x39 - ret < 0, shift produces -1 (0xFFFF), adds offset.
    let offset = if UPPER { 0x07i16 } else { 0x27i16 };
    ret += ((0x39i16 - ret) >> 8) & offset;
    ret as u8
}

/// Constant-time ASCII-to-nibble conversion.
///
/// Returns the nibble value (0–15) as a `u16`. If the byte is not a valid hex
/// character, the result has bits above bit 7 set (specifically, it stays at
/// `0xFFFF` from the initial `-1`), which the caller detects via `err |= val >> 8`.
#[inline(always)]
const fn ct_decode_nibble(byte: u8) -> u16 {
    let b = byte as i16;
    let mut ret: i16 = -1;
    // '0' (0x30) ..= '9' (0x39) → 0..9
    ret += (((0x2Fi16 - b) & (b - 0x3A)) >> 8) & (b - 47);
    // 'A' (0x41) ..= 'F' (0x46) → 10..15
    ret += (((0x40i16 - b) & (b - 0x47)) >> 8) & (b - 54);
    // 'a' (0x61) ..= 'f' (0x66) → 10..15
    ret += (((0x60i16 - b) & (b - 0x67)) >> 8) & (b - 86);
    ret as u16
}

/// Constant-time hex encoder using branchless arithmetic.
///
/// No lookup tables. Each nibble is converted via [`ct_encode_nibble`].
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    debug_assert_eq!(output.len(), input.len() * 2);
    let mut out_idx = 0;
    for &byte in input {
        output[out_idx].write(ct_encode_nibble::<UPPER>(byte >> 4));
        output[out_idx + 1].write(ct_encode_nibble::<UPPER>(byte & 0x0f));
        out_idx += 2;
    }
}

/// Constant-time hex decoder using branchless range-check arithmetic.
///
/// Processes ALL input bytes regardless of validity, accumulating errors
/// into a single `err` variable. Only checks `err` after the full pass.
/// Returns `Error::InvalidEncoding` on failure (no position information).
pub(crate) fn decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    debug_assert_eq!(output.len(), input.len() / 2);
    debug_assert!(input.len().is_multiple_of(2));

    let mut err: u16 = 0;
    for (pair, out_byte) in input.chunks_exact(2).zip(output.iter_mut()) {
        let hi = ct_decode_nibble(pair[0]);
        let lo = ct_decode_nibble(pair[1]);
        err |= hi >> 8;
        err |= lo >> 8;
        out_byte.write(((hi as u8) << 4) | (lo as u8));
    }

    if err != 0 {
        Err(Error::InvalidEncoding)
    } else {
        Ok(())
    }
}

/// Constant-time hex check using branchless arithmetic.
///
/// Processes all bytes, accumulates errors, checks at end.
pub(crate) fn check(input: &[u8]) -> bool {
    let mut err: u16 = 0;
    for &byte in input {
        err |= ct_decode_nibble(byte) >> 8;
    }
    err == 0
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Verify CT encode nibble produces correct ASCII for all 16 nibble values.
    #[test]
    fn ct_encode_nibble_lower() {
        for i in 0..16u8 {
            let expected = b"0123456789abcdef"[i as usize];
            assert_eq!(ct_encode_nibble::<false>(i), expected, "nibble {i}");
        }
    }

    #[test]
    fn ct_encode_nibble_upper() {
        for i in 0..16u8 {
            let expected = b"0123456789ABCDEF"[i as usize];
            assert_eq!(ct_encode_nibble::<true>(i), expected, "nibble {i}");
        }
    }

    /// Verify CT decode nibble produces correct values for all valid hex chars.
    #[test]
    fn ct_decode_nibble_valid() {
        for (i, ch) in (b'0'..=b'9').enumerate() {
            assert_eq!(ct_decode_nibble(ch), i as u16, "char '{}'", ch as char);
        }
        for (i, ch) in (b'a'..=b'f').enumerate() {
            assert_eq!(ct_decode_nibble(ch), (10 + i) as u16, "char '{}'", ch as char);
        }
        for (i, ch) in (b'A'..=b'F').enumerate() {
            assert_eq!(ct_decode_nibble(ch), (10 + i) as u16, "char '{}'", ch as char);
        }
    }

    /// Verify CT decode nibble rejects all non-hex bytes (high bits set).
    #[test]
    fn ct_decode_nibble_invalid() {
        for byte in 0..=255u8 {
            let valid = matches!(byte, b'0'..=b'9' | b'a'..=b'f' | b'A'..=b'F');
            let result = ct_decode_nibble(byte);
            if valid {
                assert!(result <= 15, "byte 0x{byte:02x} should be valid but got {result}");
            } else {
                assert!(result >> 8 != 0, "byte 0x{byte:02x} should be invalid but got {result}");
            }
        }
    }
}
```

- [ ] **Step 2: Add module to `src/backend/mod.rs`**

Add `pub(crate) mod ct_scalar;` near the existing `pub(crate) mod scalar;` (outside any cfg gate — CT scalar is available on all platforms).

- [ ] **Step 3: Verify**

Run: `cargo test` — all tests pass (including new ct_scalar unit tests)

- [ ] **Step 4: Commit**

```bash
git add src/backend/ct_scalar.rs src/backend/mod.rs
git commit -m "feat: constant-time scalar encode/decode/check with branchless arithmetic"
```

---

### Task 2: CT SIMD Decode/Check (all backends)

**Files:**
- Modify: `src/backend/neon.rs` — add `ct_decode`, `ct_check`
- Modify: `src/backend/x86.rs` — add `ct_decode_ssse3`, `ct_decode_avx2`, `ct_check_ssse3`
- Modify: `src/backend/wasm.rs` — add `ct_decode`, `ct_check`

The CT SIMD variants reuse the same algorithms as the fast path but:
1. **No early return on validation failure** — accumulate error bits across all chunks, check at end
2. **Still write output even for invalid chunks** — values are garbage but we don't early-return
3. Return `Error::InvalidEncoding` (not `InvalidChar`) on failure

The SIMD encode is already constant-time (register LUT, no branches), so no CT encode variant is needed for SIMD.

For each backend, the pattern is the same. Here's what the NEON `ct_decode` looks like (x86 and WASM follow the same pattern with their respective intrinsics):

```rust
/// CT NEON decode: same Mula-Langdale algorithm but no early return.
/// Accumulates validation errors across all chunks, checks at end.
pub(crate) fn ct_decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    // ... same SIMD loop as decode() but:
    // - Instead of: if invalid { return scalar::decode(...) }
    // - Do: err_accum |= validation_bits; (continue processing)
    // After loop: if err_accum != 0 { return Err(Error::InvalidEncoding) }
    // Tail uses ct_scalar::decode (not scalar::decode)
}

/// CT NEON check: same range-check but no early return.
pub(crate) fn ct_check(input: &[u8]) -> bool {
    // Same SIMD loop but accumulate validity, don't short-circuit.
    // Tail uses ct_scalar::check.
}
```

- [ ] **Step 1: Add CT functions to each SIMD backend**

For NEON (`src/backend/neon.rs`):
- `pub(crate) fn ct_decode(input, output) -> Result<(), Error>` — same decode_chunk_neon, accumulate `err |= max_byte & 0x80`, no early return, tail via `ct_scalar::decode`
- `pub(crate) fn ct_check(input) -> bool` — same check_chunk_neon, accumulate `all_valid &= check_result`, no short-circuit, tail via `ct_scalar::check`

For x86 (`src/backend/x86.rs`):
- `pub(crate) unsafe fn ct_decode_ssse3(input, output) -> Result<(), Error>` — same Lemire algorithm, `err |= movemask`, no early return
- `pub(crate) unsafe fn ct_decode_avx2(input, output) -> Result<(), Error>` — same, 256-bit
- `pub(crate) unsafe fn ct_check_ssse3(input) -> bool` — same check, accumulate mask

For WASM (`src/backend/wasm.rs`):
- `pub(crate) fn ct_decode(input, output) -> Result<(), Error>` — accumulate bitmask
- `pub(crate) fn ct_check(input) -> bool` — accumulate validity

- [ ] **Step 2: Add CT dispatch to `src/backend/mod.rs`**

Add three new dispatch functions matching the pattern of the existing ones but routing to CT variants:

```rust
/// CT encode — for SIMD, the normal encode IS already CT (register LUT).
/// For scalar, uses ct_scalar.
pub(crate) fn ct_encode<const UPPER: bool>(input: &[u8], output: &mut [MaybeUninit<u8>]) {
    // Same dispatch as encode() but with ct_scalar fallback instead of scalar
    cfg_if! { ... }
}

/// CT decode — no early return, returns InvalidEncoding.
pub(crate) fn ct_decode(input: &[u8], output: &mut [MaybeUninit<u8>]) -> Result<(), Error> {
    cfg_if! { ... use ct_decode variants ... }
}

/// CT check — no early return.
pub(crate) fn ct_check(input: &[u8]) -> bool {
    cfg_if! { ... use ct_check variants ... }
}
```

- [ ] **Step 3: Verify**

Run: `cargo test` — all tests pass
Run: `cargo test --target x86_64-apple-darwin` — all pass

- [ ] **Step 4: Commit**

```bash
git add src/backend/
git commit -m "feat: CT SIMD decode/check — no early returns, error accumulation"
```

---

### Task 3: Public `ct` Module

**Files:**
- Create: `src/ct.rs`
- Modify: `src/lib.rs` (add `pub mod ct`)
- Create: `tests/ct.rs`

- [ ] **Step 1: Create `src/ct.rs`**

```rust
//! Constant-time hex operations for cryptographic contexts.
//!
//! # Guarantees
//!
//! - No lookup tables in memory (all arithmetic or register-only SIMD LUTs)
//! - No data-dependent branches
//! - Error accumulation without early return (no timing leak on error position)
//! - NOT constant-time w.r.t. input *length* (only w.r.t. data *values*)
//!
//! # SIMD
//!
//! On platforms with SIMD, the encode path uses the same register-based LUT
//! approach as the fast path (`pshufb`/`tbl`/`swizzle`), which is inherently
//! constant-time since SIMD register operations don't produce data-dependent
//! memory access patterns.
//!
//! The decode path uses the same Mula-Langdale / Lemire algorithm but with
//! error accumulation instead of early returns.
//!
//! # Scalar fallback
//!
//! Uses branchless arithmetic (base16ct-style). See [`crate::backend::ct_scalar`]
//! for the algorithm description.

use crate::backend;
use crate::error::Error;
use crate::maybe_uninit;
use core::mem::MaybeUninit;

/// Encode bytes to lowercase hex (constant-time).
pub fn encode_lower<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_inner::<false>(input, output)
}

/// Encode bytes to uppercase hex (constant-time).
pub fn encode_upper<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    encode_inner::<true>(input, output)
}

fn encode_inner<'a, const UPPER: bool>(
    input: &[u8],
    output: &'a mut [u8],
) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    let uninit = unsafe {
        core::slice::from_raw_parts_mut(
            output.as_mut_ptr().cast::<MaybeUninit<u8>>(),
            output.len(),
        )
    };
    backend::ct_encode::<UPPER>(input, uninit);
    debug_assert!(output.iter().all(|b| b.is_ascii()));
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Decode hex to bytes (constant-time).
///
/// Returns `Error::InvalidEncoding` if any byte is not valid hex.
/// Does **not** report which byte or position was invalid (that would
/// leak timing information).
pub fn decode<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    let expected = output.len() * 2;
    if input.len() != expected {
        return Err(Error::InvalidLength { expected, got: input.len() });
    }
    let uninit = unsafe {
        core::slice::from_raw_parts_mut(
            output.as_mut_ptr().cast::<MaybeUninit<u8>>(),
            output.len(),
        )
    };
    backend::ct_decode(input, uninit)?;
    Ok(output)
}

/// Decode hex to a fixed-size byte array (constant-time).
pub fn decode_to_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error> {
    let expected = N * 2;
    if input.len() != expected {
        return Err(Error::InvalidLength { expected, got: input.len() });
    }
    let mut out: [MaybeUninit<u8>; N] = maybe_uninit::array();
    backend::ct_decode(input, &mut out)?;
    Ok(unsafe { maybe_uninit::transpose(out).assume_init() })
}

/// Check if all bytes are valid hex characters (constant-time).
///
/// Processes all bytes even if an early one is invalid.
pub fn check(input: &[u8]) -> bool {
    backend::ct_check(input)
}
```

- [ ] **Step 2: Add to `src/lib.rs`**

```rust
pub mod ct;
```

- [ ] **Step 3: Create `tests/ct.rs`**

Tests that CT produces identical results to the fast path, plus CT-specific error behavior:

```rust
use better_hex::ct;

#[test]
fn ct_encode_lower_matches_fast() {
    let input = [0xde, 0xad, 0xbe, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];
    let mut ct_out = vec![0u8; input.len() * 2];
    let mut fast_out = vec![0u8; input.len() * 2];
    let ct_hex = ct::encode_lower(&input, &mut ct_out).unwrap();
    let fast_hex = better_hex::encode_to_slice(&input, &mut fast_out).unwrap();
    assert_eq!(ct_hex, fast_hex);
}

#[test]
fn ct_encode_upper_matches_fast() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let mut ct_out = vec![0u8; 8];
    let mut fast_out = vec![0u8; 8];
    let ct_hex = ct::encode_upper(&input, &mut ct_out).unwrap();
    let fast_hex = better_hex::encode_to_slice_upper(&input, &mut fast_out).unwrap();
    assert_eq!(ct_hex, fast_hex);
}

#[test]
fn ct_decode_matches_fast() {
    let hex = b"deadbeef0123456789abcdef";
    let mut ct_out = [0u8; 12];
    let mut fast_out = [0u8; 12];
    ct::decode(hex, &mut ct_out).unwrap();
    better_hex::decode_to_slice(hex, &mut fast_out).unwrap();
    assert_eq!(ct_out, fast_out);
}

#[test]
fn ct_decode_to_array() {
    let result: [u8; 4] = ct::decode_to_array(b"DeAdBeEf").unwrap();
    assert_eq!(result, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn ct_decode_invalid_returns_invalid_encoding() {
    let mut out = [0u8; 2];
    let err = ct::decode(b"abGH", &mut out).unwrap_err();
    // CT decode returns InvalidEncoding, NOT InvalidChar
    assert_eq!(err, better_hex::Error::InvalidEncoding);
}

#[test]
fn ct_decode_wrong_length() {
    let mut out = [0u8; 1];
    let err = ct::decode(b"abc", &mut out).unwrap_err();
    assert!(matches!(err, better_hex::Error::InvalidLength { .. }));
}

#[test]
fn ct_check_valid() {
    assert!(ct::check(b"deadbeef"));
    assert!(ct::check(b"DEADBEEF"));
    assert!(ct::check(b"0123456789abcdefABCDEF"));
}

#[test]
fn ct_check_invalid() {
    assert!(!ct::check(b"deadbeeG"));
    assert!(!ct::check(b"zz"));
}

#[test]
fn ct_check_empty() {
    assert!(ct::check(b""));
}

#[test]
fn ct_encode_empty() {
    let mut out = [];
    ct::encode_lower(&[], &mut out).unwrap();
}

#[test]
fn ct_encode_all_byte_values() {
    let input: Vec<u8> = (0..=255).collect();
    let mut ct_out = vec![0u8; 512];
    let mut fast_out = vec![0u8; 512];
    ct::encode_lower(&input, &mut ct_out).unwrap();
    better_hex::encode_to_slice(&input, &mut fast_out).unwrap();
    assert_eq!(ct_out, fast_out);
}

// Boundary lengths (SIMD chunk edges)
#[test]
fn ct_roundtrip_boundaries() {
    for size in [0, 1, 15, 16, 17, 31, 32, 33, 63, 64, 65, 255, 256, 257] {
        let input: Vec<u8> = (0..size).map(|i| (i & 0xFF) as u8).collect();
        let mut hex_buf = vec![0u8; size * 2];
        ct::encode_lower(&input, &mut hex_buf).unwrap();
        let mut decoded = vec![0u8; size];
        ct::decode(&hex_buf, &mut decoded).unwrap();
        assert_eq!(decoded, input, "CT roundtrip failed at size {size}");
    }
}
```

- [ ] **Step 4: Add proptest CT vs fast comparison**

Add to `tests/properties.rs`:

```rust
    #[test]
    fn ct_encode_matches_fast(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let fast = better_hex::encode(&input);
        let mut ct_out = vec![0u8; input.len() * 2];
        let ct = better_hex::ct::encode_lower(&input, &mut ct_out).unwrap();
        prop_assert_eq!(ct, fast.as_str());
    }

    #[test]
    fn ct_decode_matches_fast(input in proptest::collection::vec(any::<u8>(), 0..256)) {
        let hex = better_hex::encode(&input);
        let fast = better_hex::decode(&hex).unwrap();
        let mut ct_out = vec![0u8; input.len()];
        better_hex::ct::decode(hex.as_bytes(), &mut ct_out).unwrap();
        prop_assert_eq!(&ct_out, &fast);
    }

    #[test]
    fn ct_check_matches_fast(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let ct_result = better_hex::ct::check(&input);
        let fast_result = better_hex::check_raw(&input);
        prop_assert_eq!(ct_result, fast_result);
    }
```

- [ ] **Step 5: Verify all targets**

Run: `cargo test` — all tests pass (aarch64)
Run: `cargo test --target x86_64-apple-darwin` — all pass
Run: `CARGO_TARGET_WASM32_WASIP1_RUNNER='wasmtime' RUSTFLAGS="-C target-feature=+simd128" cargo test --target wasm32-wasip1 --no-default-features --features alloc`
Run: `cargo test --features force-generic` — all pass

- [ ] **Step 6: Commit**

```bash
git add src/ct.rs src/lib.rs tests/ct.rs tests/properties.rs
git commit -m "feat: public ct module — constant-time encode/decode/check"
```
