# Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the core `better-hex` library — error type, prefix types, `HexStr<N, P>`, scalar generic encode/decode, const fn encode/decode, slice-based free functions, Display helper, and comprehensive tests.

**Architecture:** Scalar-only (no SIMD yet). The `src/arch/generic.rs` module provides the encode/decode/check implementations using lookup tables. `HexStr<N, P>` is a `repr(C)` stack-allocated hex string with zero-cost prefix via sealed trait. All public constructors guarantee hex ASCII, enforcing the invariant needed for `as_str()`.

**Tech Stack:** Rust 2024 edition, `bytemuck` (for prefix types only), `cfg-if`, no_std compatible with optional `alloc`.

**Scope note:** This is plan 1 of 5. SIMD backends, constant-time, serde, HexTarget, and fuzzing are separate plans. This plan delivers a fully working, tested scalar hex library.

---

## File Structure

```
src/
  lib.rs          — crate root: feature gates, re-exports, no_std setup
  error.rs        — Error enum
  prefix.rs       — NoPrefix, WithPrefix, Prefix trait (sealed)
  hex_str.rs      — HexStr<N, P> type and all its methods/trait impls
  encode.rs       — encode_to_slice, encode_to_slice_upper, encode (alloc)
  decode.rs       — decode_to_slice, decode_to_array, decode (alloc), check
  display.rs      — display() helper, DisplayHex type
  arch/
    mod.rs        — dispatch (for now just calls generic)
    generic.rs    — scalar LUT encode, scalar LUT decode, scalar check
tests/
  hex_str.rs      — HexStr unit tests
  encode.rs       — encode free function tests
  decode.rs       — decode free function tests
  edge_cases.rs   — boundary hex chars, empty input, single byte, etc.
Cargo.toml        — dependencies, features
```

---

### Task 1: Project Setup — Cargo.toml and lib.rs

**Files:**
- Modify: `Cargo.toml`
- Create: `src/lib.rs`

- [ ] **Step 1: Write Cargo.toml with features and dependencies**

```toml
[package]
name = "better-hex"
version = "0.1.0"
edition = "2024"
license = "MIT OR Apache-2.0"
description = "Fast hex encoding/decoding with SIMD, const fn, and constant-time support"

[features]
default = ["std"]
std = ["alloc"]
alloc = []
force-generic = []

[dependencies]
bytemuck = { version = "1", features = ["derive"] }
cfg-if = "1"

[dev-dependencies]
proptest = "1"
```

- [ ] **Step 2: Write lib.rs with no_std, feature gates, and module declarations**

```rust
#![no_std]
#![warn(missing_docs)]
#![doc = "Fast hex encoding/decoding with SIMD, const fn, and constant-time support."]

#[cfg(feature = "alloc")]
extern crate alloc;

#[cfg(feature = "std")]
extern crate std;

mod arch;
mod decode;
mod display;
mod encode;
mod error;
mod hex_str;
mod prefix;

pub use decode::{check, check_raw, decode_to_array, decode_to_slice};
pub use display::display;
pub use encode::{encode_to_slice, encode_to_slice_upper};
pub use error::Error;
pub use hex_str::HexStr;
pub use prefix::{NoPrefix, Prefix, WithPrefix};

/// Type alias for a hex string with "0x" prefix.
pub type PrefixedHexStr<const N: usize> = HexStr<N, WithPrefix>;

// Const fn re-exports
pub use hex_str::{const_decode_to_array, const_encode_lower, const_encode_upper};

#[cfg(feature = "alloc")]
pub use decode::decode;
#[cfg(feature = "alloc")]
pub use encode::{encode, encode_upper};
```

- [ ] **Step 3: Verify it compiles (will fail — modules don't exist yet, that's fine)**

Run: `cargo check 2>&1 | head -5`
Expected: errors about missing modules (not syntax errors in lib.rs)

- [ ] **Step 4: Commit**

```bash
git add Cargo.toml src/lib.rs .gitignore
git commit -m "feat: project skeleton with Cargo.toml, features, and lib.rs"
```

---

### Task 2: Error Type

**Files:**
- Create: `src/error.rs`
- Test: `tests/edge_cases.rs` (just error Display tests for now)

- [ ] **Step 1: Write the error tests**

Create `tests/edge_cases.rs`:

```rust
use better_hex::Error;

#[test]
fn error_display_odd_length() {
    let e = Error::OddLength;
    assert_eq!(e.to_string(), "odd-length hex string");
}

#[test]
fn error_display_invalid_char() {
    let e = Error::InvalidChar { byte: b'G', index: 5 };
    assert_eq!(e.to_string(), "invalid hex character 'G' (0x47) at index 5");
}

#[test]
fn error_display_invalid_encoding() {
    let e = Error::InvalidEncoding;
    assert_eq!(e.to_string(), "invalid hex encoding");
}

#[test]
fn error_display_invalid_length() {
    let e = Error::InvalidLength { expected: 64, got: 40 };
    assert_eq!(e.to_string(), "invalid length: expected 64, got 40");
}

#[test]
fn error_eq() {
    assert_eq!(Error::OddLength, Error::OddLength);
    assert_ne!(Error::OddLength, Error::InvalidEncoding);
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cargo test --test edge_cases 2>&1 | tail -3`
Expected: compilation errors (Error not defined yet)

- [ ] **Step 3: Implement error.rs**

Create `src/error.rs`:

```rust
use core::fmt;

/// Errors that can occur during hex encoding/decoding.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    /// Input hex string has odd length.
    OddLength,
    /// Invalid hex character at a known position (fast path only).
    InvalidChar {
        /// The invalid byte.
        byte: u8,
        /// Position in the input.
        index: usize,
    },
    /// Invalid hex encoding detected (constant-time path — no position info).
    InvalidEncoding,
    /// Output buffer has wrong length.
    InvalidLength {
        /// Expected length.
        expected: usize,
        /// Actual length.
        got: usize,
    },
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::OddLength => f.write_str("odd-length hex string"),
            Error::InvalidChar { byte, index } => {
                write!(f, "invalid hex character '{}' (0x{:02x}) at index {}", *byte as char, byte, index)
            }
            Error::InvalidEncoding => f.write_str("invalid hex encoding"),
            Error::InvalidLength { expected, got } => {
                write!(f, "invalid length: expected {expected}, got {got}")
            }
        }
    }
}

#[cfg(feature = "std")]
impl std::error::Error for Error {}
```

- [ ] **Step 4: Create stub modules so crate compiles**

We need empty stubs so `cargo test` can compile the crate. Create these files:

`src/prefix.rs`:
```rust
// Stub — implemented in Task 3.
```

`src/hex_str.rs`:
```rust
// Stub — implemented in Task 4.
```

`src/arch/mod.rs`:
```rust
pub(crate) mod generic;
```

`src/arch/generic.rs`:
```rust
// Stub — implemented in Task 5.
```

`src/encode.rs`:
```rust
// Stub — implemented in Task 6.
```

`src/decode.rs`:
```rust
// Stub — implemented in Task 7.
```

`src/display.rs`:
```rust
// Stub — implemented in Task 8.
```

Comment out all re-exports in `src/lib.rs` except `pub use error::Error;` so the crate compiles with just the error module.

- [ ] **Step 5: Run tests to verify they pass**

Run: `cargo test --test edge_cases -v`
Expected: all 5 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/error.rs src/prefix.rs src/hex_str.rs src/arch/ src/encode.rs src/decode.rs src/display.rs tests/edge_cases.rs src/lib.rs
git commit -m "feat: Error type with Display impl and tests"
```

---

### Task 3: Prefix Types

**Files:**
- Modify: `src/prefix.rs`
- Modify: `src/lib.rs` (uncomment prefix re-exports)

- [ ] **Step 1: Write prefix tests**

Add to `tests/edge_cases.rs`:

```rust
use better_hex::{NoPrefix, WithPrefix, Prefix};

#[test]
fn no_prefix_is_zst() {
    assert_eq!(core::mem::size_of::<NoPrefix>(), 0);
}

#[test]
fn with_prefix_is_2_bytes() {
    assert_eq!(core::mem::size_of::<WithPrefix>(), 2);
}

#[test]
fn no_prefix_len() {
    assert_eq!(NoPrefix::LEN, 0);
}

#[test]
fn with_prefix_len() {
    assert_eq!(WithPrefix::LEN, 2);
}

#[test]
fn with_prefix_new_is_0x() {
    let p = WithPrefix::new();
    assert_eq!(p.as_bytes(), b"0x");
}

#[test]
fn no_prefix_new_is_empty() {
    let p = NoPrefix::new();
    assert_eq!(p.as_bytes(), b"");
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cargo test --test edge_cases prefix 2>&1 | tail -3`
Expected: compilation error (types not yet defined)

- [ ] **Step 3: Implement prefix.rs**

```rust
use bytemuck::{Pod, Zeroable};

mod sealed {
    pub trait Sealed {}
}

/// A zero-sized prefix marker (no "0x" prefix).
#[derive(Debug, Copy, Clone, PartialEq, Eq, Pod, Zeroable)]
#[repr(C)]
pub struct NoPrefix;

/// A prefix marker that stores the "0x" prefix.
#[derive(Debug, Copy, Clone, PartialEq, Eq, Pod, Zeroable)]
#[repr(transparent)]
pub struct WithPrefix([u8; 2]);

impl sealed::Sealed for NoPrefix {}
impl sealed::Sealed for WithPrefix {}

/// Sealed trait for hex string prefix types.
///
/// Only `NoPrefix` and `WithPrefix` implement this.
pub trait Prefix: sealed::Sealed + Copy + 'static {
    /// Length in bytes of the prefix (0 or 2).
    const LEN: usize;

    /// Create a new prefix value.
    fn new() -> Self;

    /// View the prefix as a byte slice.
    fn as_bytes(&self) -> &[u8];
}

impl Prefix for NoPrefix {
    const LEN: usize = 0;

    fn new() -> Self {
        NoPrefix
    }

    fn as_bytes(&self) -> &[u8] {
        &[]
    }
}

impl Prefix for WithPrefix {
    const LEN: usize = 2;

    fn new() -> Self {
        WithPrefix(*b"0x")
    }

    fn as_bytes(&self) -> &[u8] {
        &self.0
    }
}
```

- [ ] **Step 4: Uncomment prefix re-exports in lib.rs**

In `src/lib.rs`, uncomment:
```rust
pub use prefix::{NoPrefix, Prefix, WithPrefix};
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cargo test --test edge_cases prefix -v`
Expected: all 6 prefix tests pass

- [ ] **Step 6: Commit**

```bash
git add src/prefix.rs src/lib.rs tests/edge_cases.rs
git commit -m "feat: NoPrefix and WithPrefix types with sealed Prefix trait"
```

---

### Task 4: Scalar Generic Encode/Decode (arch/generic.rs)

**Files:**
- Modify: `src/arch/generic.rs`
- Create: `tests/encode.rs` (just generic tests)
- Create: `tests/decode.rs` (just generic tests)

- [ ] **Step 1: Write encode tests**

Create `tests/encode.rs`:

```rust
#[test]
fn encode_empty() {
    let mut out = [];
    better_hex::encode_to_slice(&[], &mut out).unwrap();
}

#[test]
fn encode_single_byte() {
    let mut out = [0u8; 2];
    let s = better_hex::encode_to_slice(&[0xab], &mut out).unwrap();
    assert_eq!(s, "ab");
}

#[test]
fn encode_upper_single_byte() {
    let mut out = [0u8; 2];
    let s = better_hex::encode_to_slice_upper(&[0xab], &mut out).unwrap();
    assert_eq!(s, "AB");
}

#[test]
fn encode_multiple_bytes() {
    let mut out = [0u8; 8];
    let s = better_hex::encode_to_slice(&[0xde, 0xad, 0xbe, 0xef], &mut out).unwrap();
    assert_eq!(s, "deadbeef");
}

#[test]
fn encode_all_zeros() {
    let mut out = [0u8; 6];
    let s = better_hex::encode_to_slice(&[0, 0, 0], &mut out).unwrap();
    assert_eq!(s, "000000");
}

#[test]
fn encode_all_ff() {
    let mut out = [0u8; 4];
    let s = better_hex::encode_to_slice(&[0xff, 0xff], &mut out).unwrap();
    assert_eq!(s, "ffff");
}

#[test]
fn encode_output_too_short() {
    let mut out = [0u8; 3];
    let err = better_hex::encode_to_slice(&[0xab, 0xcd], &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::InvalidLength { expected: 4, got: 3 });
}

#[test]
fn encode_every_nibble_value() {
    // 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef
    let input = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];
    let mut out = [0u8; 16];
    let s = better_hex::encode_to_slice(&input, &mut out).unwrap();
    assert_eq!(s, "0123456789abcdef");
}
```

- [ ] **Step 2: Write decode tests**

Create `tests/decode.rs`:

```rust
#[test]
fn decode_empty() {
    let mut out = [];
    better_hex::decode_to_slice(b"", &mut out).unwrap();
}

#[test]
fn decode_single_byte() {
    let mut out = [0u8; 1];
    better_hex::decode_to_slice(b"ab", &mut out).unwrap();
    assert_eq!(out, [0xab]);
}

#[test]
fn decode_uppercase() {
    let mut out = [0u8; 1];
    better_hex::decode_to_slice(b"AB", &mut out).unwrap();
    assert_eq!(out, [0xab]);
}

#[test]
fn decode_mixed_case() {
    let mut out = [0u8; 2];
    better_hex::decode_to_slice(b"aB1f", &mut out).unwrap();
    assert_eq!(out, [0xab, 0x1f]);
}

#[test]
fn decode_odd_length() {
    let mut out = [0u8; 1];
    let err = better_hex::decode_to_slice(b"abc", &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::OddLength);
}

#[test]
fn decode_invalid_char() {
    let mut out = [0u8; 2];
    let err = better_hex::decode_to_slice(b"abGH", &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::InvalidChar { byte: b'G', index: 2 });
}

#[test]
fn decode_output_wrong_size() {
    let mut out = [0u8; 1];
    let err = better_hex::decode_to_slice(b"abcd", &mut out).unwrap_err();
    assert_eq!(err, better_hex::Error::InvalidLength { expected: 2, got: 1 });
}

#[test]
fn decode_to_array_works() {
    let result: [u8; 4] = better_hex::decode_to_array("deadbeef").unwrap();
    assert_eq!(result, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn check_valid() {
    assert!(better_hex::check(b"deadbeef"));
    assert!(better_hex::check(b"DEADBEEF"));
    assert!(better_hex::check(b"0123456789abcdefABCDEF"));
}

#[test]
fn check_invalid() {
    assert!(!better_hex::check(b"deadbeeG"));
    assert!(!better_hex::check(b"abc"));  // odd length
}

#[test]
fn check_raw_valid() {
    assert!(better_hex::check_raw(b"abc"));  // odd is ok for check_raw
    assert!(better_hex::check_raw(b"0123456789abcdefABCDEF"));
}

#[test]
fn check_raw_invalid() {
    assert!(!better_hex::check_raw(b"abcG"));
}

#[test]
fn decode_boundary_chars() {
    // Just below '0'
    let mut out = [0u8; 1];
    assert!(better_hex::decode_to_slice(b"/0", &mut out).is_err());
    // Just above '9'
    assert!(better_hex::decode_to_slice(b":0", &mut out).is_err());
    // Just below 'A'
    assert!(better_hex::decode_to_slice(b"@0", &mut out).is_err());
    // Just above 'F'
    assert!(better_hex::decode_to_slice(b"G0", &mut out).is_err());
    // Just below 'a'
    assert!(better_hex::decode_to_slice(b"`0", &mut out).is_err());
    // Just above 'f'
    assert!(better_hex::decode_to_slice(b"g0", &mut out).is_err());
}
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cargo test --test encode --test decode 2>&1 | tail -5`
Expected: compilation errors (functions not defined)

- [ ] **Step 4: Implement arch/generic.rs — lookup tables and scalar encode/decode**

```rust
use crate::error::Error;

/// 16-byte lookup table: nibble value -> lowercase ASCII hex char.
const HEX_LOWER: &[u8; 16] = b"0123456789abcdef";

/// 16-byte lookup table: nibble value -> uppercase ASCII hex char.
const HEX_UPPER: &[u8; 16] = b"0123456789ABCDEF";

/// 256-byte decode lookup table: ASCII byte -> nibble value (0-15), or 0xFF for invalid.
const NIL: u8 = u8::MAX;
static DECODE_LUT: [u8; 256] = {
    let mut lut = [NIL; 256];
    let mut i = 0u8;
    loop {
        lut[b'0'.wrapping_add(i) as usize] = i;
        if i == 9 { break; }
        i += 1;
    }
    let mut i = 0u8;
    loop {
        lut[b'a'.wrapping_add(i) as usize] = 10 + i;
        lut[b'A'.wrapping_add(i) as usize] = 10 + i;
        if i == 5 { break; }
        i += 1;
    }
    lut
};

/// Encode `input` bytes as hex into `output`. Caller must ensure `output.len() == input.len() * 2`.
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [u8]) {
    let table = if UPPER { HEX_UPPER } else { HEX_LOWER };
    for (byte, pair) in input.iter().zip(output.chunks_exact_mut(2)) {
        pair[0] = table[(byte >> 4) as usize];
        pair[1] = table[(byte & 0x0f) as usize];
    }
}

/// Decode hex `input` into `output`. Returns `Ok(())` or the first invalid char.
/// Caller must ensure `output.len() == input.len() / 2`.
pub(crate) fn decode(input: &[u8], output: &mut [u8]) -> Result<(), Error> {
    for (i, (pair, out_byte)) in input.chunks_exact(2).zip(output.iter_mut()).enumerate() {
        let hi = DECODE_LUT[pair[0] as usize];
        let lo = DECODE_LUT[pair[1] as usize];
        if hi == NIL {
            return Err(Error::InvalidChar { byte: pair[0], index: i * 2 });
        }
        if lo == NIL {
            return Err(Error::InvalidChar { byte: pair[1], index: i * 2 + 1 });
        }
        *out_byte = (hi << 4) | lo;
    }
    Ok(())
}

/// Check if all bytes in `input` are valid hex ASCII characters.
pub(crate) fn check(input: &[u8]) -> bool {
    input.iter().all(|&b| DECODE_LUT[b as usize] != NIL)
}
```

- [ ] **Step 5: Implement arch/mod.rs — dispatch (calls generic for now)**

```rust
pub(crate) mod generic;

use crate::error::Error;

/// Encode bytes to hex.
#[inline]
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [u8]) {
    generic::encode::<UPPER>(input, output);
}

/// Decode hex to bytes.
#[inline]
pub(crate) fn decode(input: &[u8], output: &mut [u8]) -> Result<(), Error> {
    generic::decode(input, output)
}

/// Check if input is valid hex.
#[inline]
pub(crate) fn check(input: &[u8]) -> bool {
    generic::check(input)
}
```

- [ ] **Step 6: Implement encode.rs — public free functions**

```rust
use crate::arch;
use crate::error::Error;

/// Encode bytes to lowercase hex into `output`. Returns the hex string.
pub fn encode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    arch::encode::<false>(input, output);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Encode bytes to uppercase hex into `output`. Returns the hex string.
pub fn encode_to_slice_upper<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a mut str, Error> {
    let expected = input.len() * 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    arch::encode::<true>(input, output);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    Ok(unsafe { core::str::from_utf8_unchecked_mut(output) })
}

/// Encode bytes to a lowercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode(input: &[u8]) -> alloc::string::String {
    let mut buf = alloc::vec![0u8; input.len() * 2];
    arch::encode::<false>(input, &mut buf);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}

/// Encode bytes to an uppercase hex `String`.
#[cfg(feature = "alloc")]
pub fn encode_upper(input: &[u8]) -> alloc::string::String {
    let mut buf = alloc::vec![0u8; input.len() * 2];
    arch::encode::<true>(input, &mut buf);
    // SAFETY: encode writes only hex ASCII bytes, which are valid UTF-8.
    unsafe { alloc::string::String::from_utf8_unchecked(buf) }
}
```

- [ ] **Step 7: Implement decode.rs — public free functions**

```rust
use crate::arch;
use crate::error::Error;

/// Decode hex `input` into `output`. Returns the written bytes.
pub fn decode_to_slice<'a>(input: &[u8], output: &'a mut [u8]) -> Result<&'a [u8], Error> {
    if input.len() % 2 != 0 {
        return Err(Error::OddLength);
    }
    let expected = input.len() / 2;
    if output.len() != expected {
        return Err(Error::InvalidLength { expected, got: output.len() });
    }
    arch::decode(input, output)?;
    Ok(output)
}

/// Decode hex to a fixed-size byte array.
pub fn decode_to_array<const N: usize>(input: impl AsRef<[u8]>) -> Result<[u8; N], Error> {
    let input = input.as_ref();
    if input.len() % 2 != 0 {
        return Err(Error::OddLength);
    }
    if input.len() / 2 != N {
        return Err(Error::InvalidLength { expected: N * 2, got: input.len() });
    }
    let mut out = [0u8; N];
    arch::decode(input, &mut out)?;
    Ok(out)
}

/// Decode hex to a `Vec<u8>`.
#[cfg(feature = "alloc")]
pub fn decode(input: impl AsRef<[u8]>) -> Result<alloc::vec::Vec<u8>, Error> {
    let input = input.as_ref();
    if input.len() % 2 != 0 {
        return Err(Error::OddLength);
    }
    let mut out = alloc::vec![0u8; input.len() / 2];
    arch::decode(input, &mut out)?;
    Ok(out)
}

/// Check if `input` is a valid hex string (even length + all hex chars).
pub fn check(input: &[u8]) -> bool {
    input.len() % 2 == 0 && arch::check(input)
}

/// Check if all bytes in `input` are valid hex ASCII characters (no length check).
pub fn check_raw(input: &[u8]) -> bool {
    arch::check(input)
}
```

- [ ] **Step 8: Uncomment re-exports in lib.rs**

In `src/lib.rs`, uncomment all the encode/decode/check re-exports:
```rust
pub use decode::{check, check_raw, decode_to_array, decode_to_slice};
pub use encode::{encode_to_slice, encode_to_slice_upper};

#[cfg(feature = "alloc")]
pub use decode::decode;
#[cfg(feature = "alloc")]
pub use encode::{encode, encode_upper};
```

(Keep hex_str, display, and const fn re-exports commented out for now.)

- [ ] **Step 9: Run all tests**

Run: `cargo test --test encode --test decode --test edge_cases -v`
Expected: all tests pass

- [ ] **Step 10: Commit**

```bash
git add src/arch/ src/encode.rs src/decode.rs src/lib.rs tests/encode.rs tests/decode.rs
git commit -m "feat: scalar encode/decode/check with 16-byte and 256-byte LUTs"
```

---

### Task 5: HexStr<N, P> Type

**Files:**
- Modify: `src/hex_str.rs`
- Create: `tests/hex_str.rs`
- Modify: `src/lib.rs` (uncomment hex_str re-exports)

- [ ] **Step 1: Write HexStr tests**

Create `tests/hex_str.rs`:

```rust
use better_hex::{HexStr, PrefixedHexStr};

#[test]
fn hex_str_size_no_prefix() {
    assert_eq!(core::mem::size_of::<HexStr<4>>(), 8);
    assert_eq!(core::mem::size_of::<HexStr<32>>(), 64);
    assert_eq!(core::mem::size_of::<HexStr<1>>(), 2);
    assert_eq!(core::mem::size_of::<HexStr<0>>(), 0);
}

#[test]
fn hex_str_size_with_prefix() {
    assert_eq!(core::mem::size_of::<PrefixedHexStr<4>>(), 10);
    assert_eq!(core::mem::size_of::<PrefixedHexStr<32>>(), 66);
    assert_eq!(core::mem::size_of::<PrefixedHexStr<0>>(), 2);
}

#[test]
fn encode_lower() {
    let hex: HexStr<4> = HexStr::encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(hex.as_str(), "deadbeef");
}

#[test]
fn encode_upper() {
    let hex: HexStr<4> = HexStr::encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(hex.as_str(), "DEADBEEF");
}

#[test]
fn encode_lower_prefixed() {
    let hex: PrefixedHexStr<4> = HexStr::encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(hex.as_str(), "0xdeadbeef");
}

#[test]
fn encode_upper_prefixed() {
    let hex: PrefixedHexStr<2> = HexStr::encode_upper(&[0xab, 0xcd]);
    assert_eq!(hex.as_str(), "0xABCD");
}

#[test]
fn as_bytes() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(hex.as_bytes(), b"abcd");
}

#[test]
fn as_bytes_prefixed() {
    let hex: PrefixedHexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(hex.as_bytes(), b"0xabcd");
}

#[test]
fn decode_roundtrip() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let hex: HexStr<4> = HexStr::encode_lower(&input);
    assert_eq!(hex.decode(), input);
}

#[test]
fn decode_roundtrip_upper() {
    let input = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];
    let hex: HexStr<8> = HexStr::encode_upper(&input);
    assert_eq!(hex.decode(), input);
}

#[test]
fn zero() {
    let hex: HexStr<4> = HexStr::zero();
    assert_eq!(hex.as_str(), "00000000");
}

#[test]
fn zero_prefixed() {
    let hex: PrefixedHexStr<2> = HexStr::zero();
    assert_eq!(hex.as_str(), "0x0000");
}

#[test]
fn len_const() {
    assert_eq!(HexStr::<4>::LEN, 8);
    assert_eq!(PrefixedHexStr::<4>::LEN, 10);
    assert_eq!(HexStr::<0>::LEN, 0);
    assert_eq!(PrefixedHexStr::<0>::LEN, 2);
}

#[test]
fn display_trait() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(format!("{hex}"), "abcd");
}

#[test]
fn deref_to_str() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    let s: &str = &hex;
    assert_eq!(s, "abcd");
}

#[test]
fn partial_eq_str() {
    let hex: HexStr<2> = HexStr::encode_lower(&[0xab, 0xcd]);
    assert_eq!(hex, *"abcd");
}

#[test]
fn from_str() {
    let hex: HexStr<4> = "deadbeef".parse().unwrap();
    assert_eq!(hex.decode(), [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_str_invalid() {
    let err = "deadbeeG".parse::<HexStr<4>>().unwrap_err();
    assert!(matches!(err, better_hex::Error::InvalidChar { .. }));
}

#[test]
fn from_str_wrong_length() {
    let err = "deadbe".parse::<HexStr<4>>().unwrap_err();
    assert!(matches!(err, better_hex::Error::InvalidLength { .. }));
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cargo test --test hex_str 2>&1 | tail -3`
Expected: compilation error

- [ ] **Step 3: Implement hex_str.rs**

```rust
use core::fmt;
use core::ops::Deref;
use core::str::FromStr;

use crate::arch;
use crate::error::Error;
use crate::prefix::{NoPrefix, Prefix, WithPrefix};

/// Stack-allocated hex string for `N` input bytes.
///
/// Stores `2*N` hex characters (+ 2 bytes for "0x" when using `WithPrefix`).
/// `N` is the **byte count**, not the hex character count.
#[repr(C)]
#[derive(Copy, Clone)]
pub struct HexStr<const N: usize, P: Prefix = NoPrefix> {
    prefix: P,
    bytes: [[u8; 2]; N],
}

impl<const N: usize, P: Prefix> HexStr<N, P> {
    /// Total string length in bytes.
    pub const LEN: usize = P::LEN + N * 2;

    /// Create a hex string representing all zeros ("00...00").
    pub fn zero() -> Self {
        let mut s = Self {
            prefix: P::new(),
            bytes: [[b'0'; 2]; N],
        };
        // prefix is already set by P::new()
        let _ = &mut s; // ensure no const eval issues
        s
    }

    /// Encode bytes into a lowercase hex string.
    pub fn encode_lower(input: &[u8; N]) -> Self {
        let mut s = Self {
            prefix: P::new(),
            bytes: [[0u8; 2]; N],
        };
        // SAFETY: bytes is [[u8; 2]; N] which has the same layout as [u8; N*2].
        let output = unsafe {
            core::slice::from_raw_parts_mut(s.bytes.as_mut_ptr() as *mut u8, N * 2)
        };
        arch::encode::<false>(input, output);
        s
    }

    /// Encode bytes into an uppercase hex string.
    pub fn encode_upper(input: &[u8; N]) -> Self {
        let mut s = Self {
            prefix: P::new(),
            bytes: [[0u8; 2]; N],
        };
        let output = unsafe {
            core::slice::from_raw_parts_mut(s.bytes.as_mut_ptr() as *mut u8, N * 2)
        };
        arch::encode::<true>(input, output);
        s
    }

    /// View the hex string as a byte slice (includes prefix if present).
    pub fn as_bytes(&self) -> &[u8] {
        // SAFETY: repr(C) struct of u8 arrays. No padding, alignment 1.
        unsafe { core::slice::from_raw_parts(self as *const Self as *const u8, Self::LEN) }
    }

    /// View the hex string as a `&str`.
    pub fn as_str(&self) -> &str {
        // SAFETY: all constructors write only hex ASCII (+ "0x" prefix), which is valid UTF-8.
        unsafe { core::str::from_utf8_unchecked(self.as_bytes()) }
    }

    /// Decode the hex content back to bytes.
    pub fn decode(&self) -> [u8; N] {
        let hex_bytes = unsafe {
            core::slice::from_raw_parts(self.bytes.as_ptr() as *const u8, N * 2)
        };
        let mut out = [0u8; N];
        // This cannot fail because our invariant guarantees valid hex content.
        let _ = arch::decode(hex_bytes, &mut out);
        out
    }
}

impl<const N: usize, P: Prefix> Deref for HexStr<N, P> {
    type Target = str;

    fn deref(&self) -> &str {
        self.as_str()
    }
}

impl<const N: usize, P: Prefix> AsRef<str> for HexStr<N, P> {
    fn as_ref(&self) -> &str {
        self.as_str()
    }
}

impl<const N: usize, P: Prefix> AsRef<[u8]> for HexStr<N, P> {
    fn as_ref(&self) -> &[u8] {
        self.as_bytes()
    }
}

impl<const N: usize, P: Prefix> fmt::Display for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_str())
    }
}

impl<const N: usize, P: Prefix> fmt::Debug for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "HexStr(\"{}\")", self.as_str())
    }
}

impl<const N: usize, P: Prefix> fmt::LowerHex for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Re-encode as lower and write through formatter
        let lower: HexStr<N, P> = HexStr::encode_lower(&self.decode());
        f.write_str(lower.as_str())
    }
}

impl<const N: usize, P: Prefix> fmt::UpperHex for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let upper: HexStr<N, P> = HexStr::encode_upper(&self.decode());
        f.write_str(upper.as_str())
    }
}

impl<const N: usize, P: Prefix> PartialEq<str> for HexStr<N, P> {
    fn eq(&self, other: &str) -> bool {
        self.as_str() == other
    }
}

impl<const N: usize, P: Prefix> PartialEq for HexStr<N, P> {
    fn eq(&self, other: &Self) -> bool {
        self.as_bytes() == other.as_bytes()
    }
}

impl<const N: usize, P: Prefix> Eq for HexStr<N, P> {}

impl<const N: usize> FromStr for HexStr<N, NoPrefix> {
    type Err = Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let input = s.as_bytes();
        if input.len() != N * 2 {
            return Err(Error::InvalidLength { expected: N * 2, got: input.len() });
        }
        let mut hex = Self {
            prefix: NoPrefix,
            bytes: [[0u8; 2]; N],
        };
        // Validate by decoding — if it succeeds, the input is valid hex
        let mut decoded = [0u8; N];
        arch::decode(input, &mut decoded)?;
        // Copy the validated hex chars
        let dst = unsafe {
            core::slice::from_raw_parts_mut(hex.bytes.as_mut_ptr() as *mut u8, N * 2)
        };
        dst.copy_from_slice(input);
        Ok(hex)
    }
}
```

- [ ] **Step 4: Uncomment hex_str re-exports in lib.rs**

```rust
pub use hex_str::HexStr;
```

- [ ] **Step 5: Run tests**

Run: `cargo test --test hex_str -v`
Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add src/hex_str.rs src/lib.rs tests/hex_str.rs
git commit -m "feat: HexStr<N, P> type with encode, decode, Display, FromStr"
```

---

### Task 6: Const Fn Encode/Decode

**Files:**
- Modify: `src/hex_str.rs` (add const_encode_lower, const_encode_upper, const_decode_to_array)
- Modify: `src/lib.rs` (uncomment const fn re-exports)
- Modify: `tests/hex_str.rs` (add const tests)

- [ ] **Step 1: Write const fn tests**

Add to `tests/hex_str.rs`:

```rust
#[test]
fn const_encode_lower() {
    const HEX: HexStr<4> = HexStr::const_encode_lower(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(HEX.as_str(), "deadbeef");
}

#[test]
fn const_encode_upper() {
    const HEX: HexStr<4> = HexStr::const_encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(HEX.as_str(), "DEADBEEF");
}

#[test]
fn const_decode_to_array() {
    const BYTES: [u8; 4] = match better_hex::const_decode_to_array(b"deadbeef") {
        Ok(b) => b,
        Err(_) => panic!("decode failed"),
    };
    assert_eq!(BYTES, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn const_decode_uppercase() {
    const BYTES: [u8; 2] = match better_hex::const_decode_to_array(b"ABCD") {
        Ok(b) => b,
        Err(_) => panic!("decode failed"),
    };
    assert_eq!(BYTES, [0xab, 0xcd]);
}

#[test]
fn const_check() {
    const VALID: bool = better_hex::const_check(b"deadbeef");
    const INVALID: bool = better_hex::const_check(b"deadbeeG");
    const ODD: bool = better_hex::const_check(b"abc");
    assert!(VALID);
    assert!(!INVALID);
    assert!(!ODD);
}

#[test]
fn const_encode_zero_len() {
    const HEX: HexStr<0> = HexStr::const_encode_lower(&[]);
    assert_eq!(HEX.as_str(), "");
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cargo test --test hex_str const_ 2>&1 | tail -5`
Expected: compilation error (const_encode_lower not defined)

- [ ] **Step 3: Add const encode/decode methods to hex_str.rs**

Add inside `impl<const N: usize, P: Prefix> HexStr<N, P>`:

```rust
    /// Encode bytes to lowercase hex at compile time.
    pub const fn const_encode_lower(input: &[u8; N]) -> Self {
        Self::const_encode::<false>(input)
    }

    /// Encode bytes to uppercase hex at compile time.
    pub const fn const_encode_upper(input: &[u8; N]) -> Self {
        Self::const_encode::<true>(input)
    }

    const fn const_encode<const UPPER: bool>(input: &[u8; N]) -> Self {
        let table = if UPPER {
            b"0123456789ABCDEF"
        } else {
            b"0123456789abcdef"
        };
        let prefix = P::new();
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = table[(input[i] >> 4) as usize];
            bytes[i][1] = table[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { prefix, bytes }
    }
```

Note: `P::new()` must be const. Modify the `Prefix` trait in `prefix.rs` — make `fn new() -> Self` a `const fn`:

In `src/prefix.rs`, the trait cannot have `const fn` methods on stable yet. Instead, add a separate const constructor to `HexStr`:

Actually — the simplest approach: add `const fn new() -> Self` as an inherent method on `NoPrefix` and `WithPrefix`, and use a const helper in `HexStr`:

Add to `src/prefix.rs`:

```rust
impl NoPrefix {
    /// Create a new NoPrefix (const).
    pub const fn const_new() -> Self {
        NoPrefix
    }
}

impl WithPrefix {
    /// Create a new WithPrefix with "0x" (const).
    pub const fn const_new() -> Self {
        WithPrefix(*b"0x")
    }
}
```

Then in `HexStr::const_encode`, we need `P::new()` but can't call trait methods in const context. So we'll make `const_encode_lower` and `const_encode_upper` available only as free functions for `NoPrefix`, and add separate impls. Actually, the simplest path: make the const methods on `HexStr<N, NoPrefix>` and `HexStr<N, WithPrefix>` separately:

```rust
impl<const N: usize> HexStr<N, NoPrefix> {
    /// Encode bytes to lowercase hex at compile time.
    pub const fn const_encode_lower(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_LOWER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_LOWER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { prefix: NoPrefix, bytes }
    }

    /// Encode bytes to uppercase hex at compile time.
    pub const fn const_encode_upper(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_UPPER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_UPPER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { prefix: NoPrefix, bytes }
    }
}

impl<const N: usize> HexStr<N, WithPrefix> {
    /// Encode bytes to lowercase hex at compile time (with "0x" prefix).
    pub const fn const_encode_lower(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_LOWER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_LOWER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { prefix: WithPrefix(*b"0x"), bytes }
    }

    /// Encode bytes to uppercase hex at compile time (with "0x" prefix).
    pub const fn const_encode_upper(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_UPPER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_UPPER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { prefix: WithPrefix(*b"0x"), bytes }
    }
}

const HEX_LOWER: &[u8; 16] = b"0123456789abcdef";
const HEX_UPPER: &[u8; 16] = b"0123456789ABCDEF";
```

- [ ] **Step 4: Add const free functions**

Add to `src/hex_str.rs` (or a new const section):

```rust
/// Decode hex at compile time.
pub const fn const_decode_to_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error> {
    if input.len() % 2 != 0 {
        return Err(Error::OddLength);
    }
    if input.len() / 2 != N {
        return Err(Error::InvalidLength { expected: N * 2, got: input.len() });
    }
    let mut out = [0u8; N];
    let mut i = 0;
    while i < N {
        let hi = const_decode_nibble(input[i * 2]);
        let lo = const_decode_nibble(input[i * 2 + 1]);
        if hi == u8::MAX {
            return Err(Error::InvalidChar { byte: input[i * 2], index: i * 2 });
        }
        if lo == u8::MAX {
            return Err(Error::InvalidChar { byte: input[i * 2 + 1], index: i * 2 + 1 });
        }
        out[i] = (hi << 4) | lo;
        i += 1;
    }
    Ok(out)
}

/// Check hex validity at compile time.
pub const fn const_check(input: &[u8]) -> bool {
    if input.len() % 2 != 0 {
        return false;
    }
    let mut i = 0;
    while i < input.len() {
        if const_decode_nibble(input[i]) == u8::MAX {
            return false;
        }
        i += 1;
    }
    true
}

const fn const_decode_nibble(byte: u8) -> u8 {
    match byte {
        b'0'..=b'9' => byte - b'0',
        b'a'..=b'f' => byte - b'a' + 10,
        b'A'..=b'F' => byte - b'A' + 10,
        _ => u8::MAX,
    }
}
```

- [ ] **Step 5: Add re-exports in lib.rs**

```rust
pub use hex_str::{const_decode_to_array, const_check};
```

Note: `const_encode_lower` and `const_encode_upper` are methods on `HexStr`, so they don't need free-function re-exports — users call `HexStr::const_encode_lower(...)`.

- [ ] **Step 6: Run tests**

Run: `cargo test --test hex_str -v`
Expected: all tests pass including const_ tests

- [ ] **Step 7: Commit**

```bash
git add src/hex_str.rs src/prefix.rs src/lib.rs tests/hex_str.rs
git commit -m "feat: const fn encode/decode for compile-time hex"
```

---

### Task 7: Display Helper

**Files:**
- Modify: `src/display.rs`
- Modify: `src/lib.rs` (uncomment display re-export)
- Modify: `tests/edge_cases.rs` (add display tests)

- [ ] **Step 1: Write display tests**

Add to `tests/edge_cases.rs`:

```rust
use better_hex::display;

#[test]
fn display_lower() {
    let s = format!("{}", display(&[0xde, 0xad]));
    assert_eq!(s, "dead");
}

#[test]
fn display_upper_hex() {
    let s = format!("{:X}", display(&[0xde, 0xad]));
    assert_eq!(s, "DEAD");
}

#[test]
fn display_lower_hex() {
    let s = format!("{:x}", display(&[0xde, 0xad]));
    assert_eq!(s, "dead");
}

#[test]
fn display_alt_lower() {
    let s = format!("{:#x}", display(&[0xde, 0xad]));
    assert_eq!(s, "0xdead");
}

#[test]
fn display_alt_upper() {
    let s = format!("{:#X}", display(&[0xde, 0xad]));
    assert_eq!(s, "0xDEAD");
}

#[test]
fn display_empty() {
    let s = format!("{}", display(&[]));
    assert_eq!(s, "");
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cargo test --test edge_cases display 2>&1 | tail -3`
Expected: compilation error

- [ ] **Step 3: Implement display.rs**

```rust
use core::fmt;

use crate::arch;

/// Returns a value that implements `Display`, `LowerHex`, and `UpperHex`
/// for the given byte slice.
pub fn display(data: &[u8]) -> DisplayHex<'_> {
    DisplayHex(data)
}

/// Opaque type implementing hex formatting traits.
pub struct DisplayHex<'a>(&'a [u8]);

impl fmt::Display for DisplayHex<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt::LowerHex::fmt(self, f)
    }
}

impl fmt::LowerHex for DisplayHex<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            f.write_str("0x")?;
        }
        encode_to_fmt(self.0, f, false)
    }
}

impl fmt::UpperHex for DisplayHex<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            f.write_str("0x")?;
        }
        encode_to_fmt(self.0, f, true)
    }
}

/// Internal: write hex through a fmt::Formatter.
/// Uses a stack buffer to reduce write_str calls.
pub(crate) fn encode_to_fmt(
    input: &[u8],
    f: &mut fmt::Formatter<'_>,
    upper: bool,
) -> fmt::Result {
    // Encode in chunks of 64 bytes (128 hex chars) through a stack buffer.
    const CHUNK: usize = 64;
    let mut buf = [0u8; CHUNK * 2];

    for chunk in input.chunks(CHUNK) {
        let hex_buf = &mut buf[..chunk.len() * 2];
        if upper {
            arch::encode::<true>(chunk, hex_buf);
        } else {
            arch::encode::<false>(chunk, hex_buf);
        }
        // SAFETY: encode writes valid hex ASCII, which is valid UTF-8.
        let s = unsafe { core::str::from_utf8_unchecked(hex_buf) };
        f.write_str(s)?;
    }
    Ok(())
}
```

- [ ] **Step 4: Uncomment display re-export in lib.rs**

```rust
pub use display::display;
```

- [ ] **Step 5: Run tests**

Run: `cargo test --test edge_cases display -v`
Expected: all display tests pass

- [ ] **Step 6: Commit**

```bash
git add src/display.rs src/lib.rs tests/edge_cases.rs
git commit -m "feat: display() helper with Display, LowerHex, UpperHex"
```

---

### Task 8: Property Tests

**Files:**
- Create: `tests/properties.rs`

- [ ] **Step 1: Write property tests**

Create `tests/properties.rs`:

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn roundtrip_encode_decode(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
        let decoded = better_hex::decode(&hex).unwrap();
        prop_assert_eq!(&decoded, &input);
    }

    #[test]
    fn encode_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
        for b in hex.bytes() {
            prop_assert!(
                matches!(b, b'0'..=b'9' | b'a'..=b'f'),
                "unexpected char: {} (0x{:02x})", b as char, b
            );
        }
    }

    #[test]
    fn encode_upper_only_hex_chars(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode_upper(&input);
        for b in hex.bytes() {
            prop_assert!(
                matches!(b, b'0'..=b'9' | b'A'..=b'F'),
                "unexpected char: {} (0x{:02x})", b as char, b
            );
        }
    }

    #[test]
    fn encode_length(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
        prop_assert_eq!(hex.len(), input.len() * 2);
    }

    #[test]
    fn check_accepts_encoded(input in proptest::collection::vec(any::<u8>(), 0..512)) {
        let hex = better_hex::encode(&input);
        prop_assert!(better_hex::check(hex.as_bytes()));
    }

    #[test]
    fn hex_str_roundtrip(input in proptest::collection::vec(any::<u8>(), 32..=32)) {
        let arr: [u8; 32] = input.try_into().unwrap();
        let hex: better_hex::HexStr<32> = better_hex::HexStr::encode_lower(&arr);
        prop_assert_eq!(hex.decode(), arr);
    }

    #[test]
    fn decode_rejects_invalid(input in proptest::collection::vec(any::<u8>(), 2..64)) {
        // Random bytes are very unlikely to be valid hex
        if !better_hex::check(&input) {
            prop_assert!(better_hex::decode(&input).is_err());
        }
    }
}
```

- [ ] **Step 2: Run property tests**

Run: `cargo test --test properties -v`
Expected: all property tests pass

- [ ] **Step 3: Commit**

```bash
git add tests/properties.rs
git commit -m "test: property-based tests for encode/decode roundtrip and invariants"
```

---

### Task 9: Alloc-gated encode/decode tests + no_std check

**Files:**
- Modify: `tests/encode.rs` (add alloc tests)
- Modify: `tests/decode.rs` (add alloc tests)

- [ ] **Step 1: Add alloc-dependent encode tests**

Add to `tests/encode.rs`:

```rust
#[test]
fn encode_string() {
    let s = better_hex::encode(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(s, "deadbeef");
}

#[test]
fn encode_upper_string() {
    let s = better_hex::encode_upper(&[0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(s, "DEADBEEF");
}

#[test]
fn encode_empty_string() {
    assert_eq!(better_hex::encode(&[]), "");
}
```

- [ ] **Step 2: Add alloc-dependent decode tests**

Add to `tests/decode.rs`:

```rust
#[test]
fn decode_vec() {
    let v = better_hex::decode("deadbeef").unwrap();
    assert_eq!(v, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn decode_vec_empty() {
    let v = better_hex::decode("").unwrap();
    assert!(v.is_empty());
}

#[test]
fn decode_vec_odd() {
    assert!(better_hex::decode("abc").is_err());
}
```

- [ ] **Step 3: Run all tests**

Run: `cargo test -v`
Expected: all tests pass

- [ ] **Step 4: Verify no_std compiles**

Run: `cargo check --no-default-features`
Expected: compiles (no std, no alloc — just core)

Run: `cargo check --no-default-features --features alloc`
Expected: compiles (alloc without std)

- [ ] **Step 5: Commit**

```bash
git add tests/encode.rs tests/decode.rs
git commit -m "test: alloc-gated tests and no_std verification"
```

---

### Task 10: Final Cleanup — Delete main.rs, Run Full Suite

**Files:**
- Delete: `src/main.rs`
- Modify: `src/lib.rs` (final uncomment pass)

- [ ] **Step 1: Delete src/main.rs**

Run: ask user to confirm deletion of `src/main.rs` (it's just `println!("Hello, world!")`)

- [ ] **Step 2: Ensure all re-exports in lib.rs are uncommented**

Review `src/lib.rs` and ensure every public API from the design is re-exported.

- [ ] **Step 3: Run the full test suite**

Run: `cargo test -v`
Expected: all tests pass

Run: `cargo test --no-default-features -v`
Expected: tests that don't require alloc pass

Run: `cargo clippy -- -D warnings`
Expected: no warnings

Run: `cargo doc --no-deps`
Expected: docs build successfully

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove stub main.rs, finalize foundation module structure"
```
