# Traits & Integrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the `HexTarget` trait for extensible zero-copy encoding output, `ToHex`/`FromHex` convenience traits, a `serde` module (fast + CT variants with submodule structure), feature-gated impls for `heapless` and `arrayvec`, and benchmarks for `DisplayHex` and the new APIs.

**Architecture:** Four independent subsystems that share the existing `backend::encode`/`backend::decode` infrastructure:

1. **HexTarget trait** (`src/hex_target.rs`) -- `unsafe trait` with `try_with_hex_len`, `spare_bytes_mut`, `assume_init`. Impls for `String` (alloc), `heapless::String<CAP>`, `arrayvec::ArrayString<CAP>`. Free functions `encode_to`/`encode_upper_to` use this trait.
2. **ToHex/FromHex traits** (`src/traits.rs`) -- `ToHex` with `write_hex<W: fmt::Write>`, `FromHex` with `from_hex`. Blanket impls for `AsRef<[u8]>`, `Vec<u8>`, `[u8; N]`.
3. **Serde module** (`src/serde_support.rs` + `src/serde_support/`) -- `serialize`/`deserialize` at top level, `upper`/`prefixed`/`upper_prefixed` submodules, and a `ct` module with the same structure. CT path pre-encodes fixed-size inputs to stack `HexStr<N>` before calling `serialize_str`.
4. **Benchmarks** (`benches/display.rs`, `benches/traits.rs`) -- criterion benchmarks for `encode_to_fmt` buffer sizes, `encode_to::<String>`, and serde round-trips.

**Tech Stack:** Rust 2024 edition, `serde` 1.x (optional dep), `heapless` 0.8 (optional dep), `arrayvec` 0.7 (optional dep), `criterion` 0.5 (dev-dep), `serde_json` 1.x (dev-dep for serde benchmarks).

**Dependency ordering:** Tasks 1-4 are independent of each other and can be parallelized. Task 5 (serde) depends on Task 3 (ToHex/FromHex) for the `serialize` display path. Task 6 (benchmarks) depends on Tasks 1, 2, and 5.

---

## File Structure

```
Cargo.toml                      -- add serde, heapless, arrayvec deps + features
src/lib.rs                      -- add mod declarations + re-exports
src/hex_target.rs               -- HexTarget trait + String impl + encode_to/encode_upper_to
src/traits.rs                   -- ToHex / FromHex traits + blanket impls
src/serde_support.rs            -- re-export module (named to avoid clashing with serde crate)
src/serde_support/mod.rs        -- serialize/deserialize + upper/prefixed/upper_prefixed submodules
src/serde_support/ct.rs         -- CT variants
src/serde_support/common.rs     -- shared helpers (DisplayAdapter, DeserializeVisitor)
benches/display.rs              -- DisplayHex buffer-size benchmarks
benches/traits.rs               -- encode_to, serde benchmarks
tests/hex_target.rs             -- HexTarget tests
tests/traits.rs                 -- ToHex/FromHex tests
tests/serde.rs                  -- serde round-trip tests
```

---

### Task 1: Feature Flags in Cargo.toml

**Files:**
- Modify: `Cargo.toml`

Add optional dependencies and feature flags for `serde`, `heapless`, and `arrayvec`. Also add `serde_json` as a dev-dependency for testing and benchmarking.

- [ ] **Step 1: Add features and dependencies**

In the `[features]` section, add:
```toml
serde = ["dep:serde"]
heapless = ["dep:heapless"]
arrayvec = ["dep:arrayvec"]
```

In the `[dependencies]` section, add:
```toml
serde = { version = "1", default-features = false, features = ["derive", "alloc"], optional = true }
heapless = { version = "0.8", default-features = false, optional = true }
arrayvec = { version = "0.7", default-features = false, optional = true }
```

In the `[dev-dependencies]` section, add:
```toml
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

Add bench harness entries:
```toml
[[bench]]
name = "display"
harness = false

[[bench]]
name = "traits"
harness = false
```

- [ ] **Step 2: Verify**

Run: `cargo check`
Run: `cargo check --features serde`
Run: `cargo check --features heapless`
Run: `cargo check --features arrayvec`
Run: `cargo check --no-default-features`

- [ ] **Step 3: Commit**

```bash
git add Cargo.toml
git commit -m "feat: add serde, heapless, arrayvec feature flags and dependencies"
```

---

### Task 2: HexTarget Trait

**Files:**
- Create: `src/hex_target.rs`
- Modify: `src/lib.rs`
- Create: `tests/hex_target.rs`

The `HexTarget` trait provides direct buffer access so the SIMD encode path can write hex bytes straight into the target's memory with zero intermediate copies.

- [ ] **Step 1: Write tests first (`tests/hex_target.rs`)**

```rust
//! Tests for HexTarget trait and encode_to/encode_upper_to.

#[test]
fn encode_to_string_lowercase() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let result: Option<String> = better_hex::encode_to(&input);
    assert_eq!(result, Some("deadbeef".to_string()));
}

#[test]
fn encode_to_string_uppercase() {
    let input = [0xde, 0xad, 0xbe, 0xef];
    let result: Option<String> = better_hex::encode_upper_to(&input);
    assert_eq!(result, Some("DEADBEEF".to_string()));
}

#[test]
fn encode_to_string_empty() {
    let input: [u8; 0] = [];
    let result: Option<String> = better_hex::encode_to(&input);
    assert_eq!(result, Some(String::new()));
}

#[test]
fn encode_to_string_single_byte() {
    let input = [0xff];
    let result: Option<String> = better_hex::encode_to(&input);
    assert_eq!(result, Some("ff".to_string()));
}

#[test]
fn encode_to_string_all_zeros() {
    let input = [0u8; 32];
    let result: Option<String> = better_hex::encode_to(&input);
    assert_eq!(result, Some("0".repeat(64)));
}

#[test]
fn encode_to_string_matches_encode() {
    let input: Vec<u8> = (0u8..=255).collect();
    let via_encode = better_hex::encode(&input);
    let via_encode_to: String = better_hex::encode_to(&input).unwrap();
    assert_eq!(via_encode, via_encode_to);
}

#[test]
fn encode_upper_to_string_matches_encode_upper() {
    let input: Vec<u8> = (0u8..=255).collect();
    let via_encode = better_hex::encode_upper(&input);
    let via_encode_to: String = better_hex::encode_upper_to(&input).unwrap();
    assert_eq!(via_encode, via_encode_to);
}

#[test]
fn encode_to_large_input() {
    let input = vec![0xab; 4096];
    let result: String = better_hex::encode_to(&input).unwrap();
    assert_eq!(result.len(), 8192);
    assert!(result.chars().all(|c| c == 'a' || c == 'b'));
}
```

- [ ] **Step 2: Create `src/hex_target.rs`**

```rust
//! Extensible output trait for hex encoding.
//!
//! [`HexTarget`] provides direct buffer access so the SIMD encode path can
//! write hex bytes straight into the target's memory -- no intermediate copy.

use crate::backend;
use core::mem::MaybeUninit;

/// A writable target for hex-encoded output.
///
/// Provides direct buffer access so the SIMD encode path can write
/// hex bytes straight into the target's memory -- no intermediate copy.
///
/// # Safety
///
/// Implementors must ensure:
/// - `spare_bytes_mut()` returns a buffer of at least `hex_len` bytes
///   (the value passed to `try_with_hex_len`).
/// - `assume_init(len)` correctly sets the internal string length
///   and the first `len` bytes form valid UTF-8 (guaranteed by the caller
///   to be hex ASCII).
pub unsafe trait HexTarget: Sized {
    /// Try to create a target pre-sized for `hex_len` hex characters.
    /// Returns `None` if capacity is insufficient (e.g., fixed-size buffer
    /// too small).
    fn try_with_hex_len(hex_len: usize) -> Option<Self>;

    /// The spare buffer to write hex ASCII into.
    /// Must be at least `hex_len` bytes long after a successful
    /// `try_with_hex_len` call.
    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>];

    /// Mark the first `len` bytes as initialized valid UTF-8.
    ///
    /// # Safety
    /// The first `len` bytes of `spare_bytes_mut()` must contain valid
    /// hex ASCII (which is always valid UTF-8).
    unsafe fn assume_init(&mut self, len: usize);
}

#[cfg(feature = "alloc")]
// SAFETY: String::with_capacity allocates `hex_len` bytes.
// spare_capacity_mut() returns that buffer. set_len() is correct
// because the caller writes valid hex ASCII.
unsafe impl HexTarget for alloc::string::String {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        Some(alloc::string::String::with_capacity(hex_len))
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: this is the standard pattern for accessing spare capacity
        // of a String's underlying Vec<u8>.
        unsafe { self.as_mut_vec() }.spare_capacity_mut()
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees first `len` spare bytes are valid hex ASCII
        // (valid UTF-8). new_len <= capacity because try_with_hex_len allocated
        // enough.
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}

#[cfg(feature = "heapless")]
// SAFETY: heapless::String<CAP> wraps heapless::Vec<u8, CAP> which has
// a [MaybeUninit<u8>; CAP] buffer. We compute spare capacity from the
// raw pointer + current length.
unsafe impl<const CAP: usize> HexTarget for heapless::String<CAP> {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        if hex_len > CAP {
            None
        } else {
            Some(heapless::String::new())
        }
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        // heapless::String does not have spare_capacity_mut().
        // We compute the spare region from the inner Vec's raw pointer + len.
        let vec = unsafe { self.as_mut_vec() };
        let len = vec.len();
        let cap = CAP;
        // SAFETY: as_mut_ptr() points to the start of the [MaybeUninit<u8>; CAP]
        // buffer. Bytes at indices [len..CAP) are spare (uninitialized).
        // MaybeUninit<u8> and u8 have the same layout.
        unsafe {
            let ptr = vec.as_mut_ptr().add(len).cast::<MaybeUninit<u8>>();
            core::slice::from_raw_parts_mut(ptr, cap - len)
        }
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees first `len` spare bytes are valid hex ASCII.
        // new_len <= CAP because try_with_hex_len checked.
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}

#[cfg(feature = "arrayvec")]
// SAFETY: ArrayString<CAP> holds a [MaybeUninit<u8>; CAP] + length.
// as_mut_ptr() returns a pointer to the start of the full buffer.
// set_len() is unsafe and directly available.
unsafe impl<const CAP: usize> HexTarget for arrayvec::ArrayString<CAP> {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        if hex_len > CAP {
            None
        } else {
            Some(arrayvec::ArrayString::new())
        }
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        let len = self.len();
        let cap = CAP;
        // SAFETY: as_mut_ptr() (safe method on ArrayString) returns a pointer
        // to the underlying buffer. Bytes at [len..CAP) are spare.
        unsafe {
            let ptr = (self.as_mut_ptr()).add(len).cast::<MaybeUninit<u8>>();
            core::slice::from_raw_parts_mut(ptr, cap - len)
        }
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees first `len` spare bytes are valid hex ASCII.
        unsafe { self.set_len(new_len) };
    }
}

/// Encode bytes to lowercase hex into any [`HexTarget`].
///
/// Returns `None` if the target cannot hold `input.len() * 2` hex characters
/// (e.g., a fixed-capacity buffer that's too small).
///
/// The SIMD encode path writes directly into the target's internal buffer.
/// No intermediate copies.
///
/// # Examples
///
/// ```
/// let s: String = better_hex::encode_to(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
/// ```
pub fn encode_to<T: HexTarget>(input: &[u8]) -> Option<T> {
    encode_to_inner::<T, false>(input)
}

/// Encode bytes to uppercase hex into any [`HexTarget`].
///
/// Returns `None` if the target cannot hold `input.len() * 2` hex characters.
///
/// # Examples
///
/// ```
/// let s: String = better_hex::encode_upper_to(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub fn encode_upper_to<T: HexTarget>(input: &[u8]) -> Option<T> {
    encode_to_inner::<T, true>(input)
}

/// Shared implementation for `encode_to` and `encode_upper_to`.
fn encode_to_inner<T: HexTarget, const UPPER: bool>(input: &[u8]) -> Option<T> {
    let hex_len = input.len() * 2;
    let mut target = T::try_with_hex_len(hex_len)?;
    let buf = target.spare_bytes_mut();
    debug_assert!(
        buf.len() >= hex_len,
        "HexTarget::spare_bytes_mut() returned fewer bytes than requested"
    );
    backend::encode::<UPPER>(input, &mut buf[..hex_len]);
    // SAFETY: backend::encode writes exactly `hex_len` bytes of valid hex ASCII
    // into the spare buffer.
    unsafe { target.assume_init(hex_len) };
    Some(target)
}
```

- [ ] **Step 3: Wire into `src/lib.rs`**

Add the module declaration and re-exports. Add after the existing `mod` declarations:

```rust
mod hex_target;
```

Add to the public re-exports:

```rust
pub use hex_target::{HexTarget, encode_to, encode_upper_to};
```

- [ ] **Step 4: Verify**

Run: `cargo test --test hex_target`
Run: `cargo test --test hex_target --no-default-features --features alloc`
Run: `cargo check --features heapless`
Run: `cargo check --features arrayvec`

- [ ] **Step 5: Commit**

```bash
git add src/hex_target.rs src/lib.rs tests/hex_target.rs
git commit -m "feat: add HexTarget trait with String/heapless/arrayvec impls and encode_to functions"
```

---

### Task 3: ToHex / FromHex Traits

**Files:**
- Create: `src/traits.rs`
- Modify: `src/lib.rs`
- Create: `tests/traits.rs`

These are convenience traits. `ToHex` uses `encode_to_fmt` (the display path) to write hex through any `fmt::Write`. `FromHex` provides a `from_hex` constructor.

- [ ] **Step 1: Write tests first (`tests/traits.rs`)**

```rust
//! Tests for ToHex and FromHex traits.
use better_hex::{FromHex, ToHex};

#[test]
fn to_hex_write_hex_lowercase() {
    let data = [0xde, 0xad, 0xbe, 0xef];
    let mut buf = String::new();
    data.write_hex(&mut buf, false).unwrap();
    assert_eq!(buf, "deadbeef");
}

#[test]
fn to_hex_write_hex_uppercase() {
    let data = [0xde, 0xad, 0xbe, 0xef];
    let mut buf = String::new();
    data.write_hex(&mut buf, true).unwrap();
    assert_eq!(buf, "DEADBEEF");
}

#[test]
fn to_hex_string_convenience() {
    let data = vec![0xca, 0xfe];
    assert_eq!(data.to_hex_string(), "cafe");
    assert_eq!(data.to_upper_hex_string(), "CAFE");
}

#[test]
fn to_hex_empty() {
    let data: &[u8] = &[];
    let mut buf = String::new();
    data.write_hex(&mut buf, false).unwrap();
    assert_eq!(buf, "");
}

#[test]
fn to_hex_single_byte() {
    let data = [0x00];
    assert_eq!(data.to_hex_string(), "00");
}

#[test]
fn to_hex_all_bytes() {
    let data: Vec<u8> = (0u8..=255).collect();
    let hex = data.to_hex_string();
    assert_eq!(hex.len(), 512);
    assert_eq!(&hex[0..2], "00");
    assert_eq!(&hex[510..512], "ff");
}

#[test]
fn from_hex_vec() {
    let result = Vec::<u8>::from_hex("deadbeef").unwrap();
    assert_eq!(result, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_hex_array() {
    let result = <[u8; 4]>::from_hex("deadbeef").unwrap();
    assert_eq!(result, [0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_hex_array_wrong_length() {
    let result = <[u8; 4]>::from_hex("dead");
    assert!(result.is_err());
}

#[test]
fn from_hex_vec_odd_length() {
    let result = Vec::<u8>::from_hex("abc");
    assert!(result.is_err());
}

#[test]
fn from_hex_invalid_char() {
    let result = Vec::<u8>::from_hex("zzzz");
    assert!(result.is_err());
}

#[test]
fn from_hex_empty() {
    let result = Vec::<u8>::from_hex("").unwrap();
    assert!(result.is_empty());
}

#[test]
fn from_hex_mixed_case() {
    let result = Vec::<u8>::from_hex("DeAdBeEf").unwrap();
    assert_eq!(result, vec![0xde, 0xad, 0xbe, 0xef]);
}

#[test]
fn from_hex_accepts_str_ref() {
    let hex_string = String::from("cafe");
    let result = Vec::<u8>::from_hex(&hex_string).unwrap();
    assert_eq!(result, vec![0xca, 0xfe]);
}

#[test]
fn from_hex_accepts_bytes() {
    let result = Vec::<u8>::from_hex(b"cafe" as &[u8]).unwrap();
    assert_eq!(result, vec![0xca, 0xfe]);
}

#[test]
fn to_hex_roundtrip() {
    let original: Vec<u8> = (0u8..=255).collect();
    let hex = original.to_hex_string();
    let decoded = Vec::<u8>::from_hex(&hex).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn write_hex_appends_to_existing() {
    let mut buf = String::from("prefix:");
    [0xab].write_hex(&mut buf, false).unwrap();
    assert_eq!(buf, "prefix:ab");
}
```

- [ ] **Step 2: Create `src/traits.rs`**

```rust
//! Convenience traits for hex encoding and decoding.
//!
//! [`ToHex`] provides `write_hex` (writes hex through `fmt::Write`) and
//! convenience methods `to_hex_string`/`to_upper_hex_string` (requires alloc).
//!
//! [`FromHex`] provides `from_hex` for constructing types from hex strings.

use crate::display::encode_to_fmt;
use crate::error::Error;
use core::fmt;

/// Trait for types that can be hex-encoded.
///
/// Automatically implemented for all types that implement `AsRef<[u8]>`
/// (byte slices, `Vec<u8>`, arrays, etc.).
pub trait ToHex {
    /// Write the hex encoding of this value into a `fmt::Write` sink.
    ///
    /// If `upper` is `true`, uses uppercase hex characters (`A-F`).
    /// Otherwise, uses lowercase (`a-f`).
    ///
    /// Uses the SIMD encode path internally, flushing through a stack buffer.
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result;

    /// Encode to a lowercase hex `String`.
    #[cfg(feature = "alloc")]
    fn to_hex_string(&self) -> alloc::string::String {
        let mut s = alloc::string::String::new();
        self.write_hex(&mut s, false).expect("fmt::Write on String is infallible");
        s
    }

    /// Encode to an uppercase hex `String`.
    #[cfg(feature = "alloc")]
    fn to_upper_hex_string(&self) -> alloc::string::String {
        let mut s = alloc::string::String::new();
        self.write_hex(&mut s, true).expect("fmt::Write on String is infallible");
        s
    }
}

/// Blanket impl: anything that can be viewed as `&[u8]` can be hex-encoded.
impl<T: AsRef<[u8]>> ToHex for T {
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        // We need to write through fmt::Write, not fmt::Formatter.
        // encode_to_fmt requires a Formatter, but we can use a shim.
        //
        // Actually, encode_to_fmt takes &mut fmt::Formatter which we don't
        // have. We need to re-implement the chunked write loop here using
        // fmt::Write instead.
        write_hex_to_fmt_write(self.as_ref(), w, upper)
    }
}

/// Internal: write hex encoding of `input` through any `fmt::Write`.
///
/// This mirrors `encode_to_fmt` but works with `fmt::Write` instead of
/// `fmt::Formatter`. Uses a 256-byte stack buffer to batch write_str calls.
fn write_hex_to_fmt_write<W: fmt::Write>(input: &[u8], w: &mut W, upper: bool) -> fmt::Result {
    use crate::backend;
    use core::mem::MaybeUninit;

    const BUF_SIZE: usize = 256;
    let mut buf = [MaybeUninit::<u8>::uninit(); BUF_SIZE];
    let chunk_size = BUF_SIZE / 2;

    for chunk in input.chunks(chunk_size) {
        let hex_len = chunk.len() * 2;
        let hex_buf = &mut buf[..hex_len];
        if upper {
            backend::encode::<true>(chunk, hex_buf);
        } else {
            backend::encode::<false>(chunk, hex_buf);
        }
        // SAFETY: the backend just initialized `hex_len` bytes with valid
        // hex ASCII, which is valid UTF-8.
        let s = unsafe {
            let initialized =
                core::slice::from_raw_parts(hex_buf.as_ptr().cast::<u8>(), hex_len);
            core::str::from_utf8_unchecked(initialized)
        };
        w.write_str(s)?;
    }
    Ok(())
}

/// Trait for types that can be constructed from hex-encoded data.
pub trait FromHex: Sized {
    /// The error type returned on decode failure.
    type Error;

    /// Decode a hex string into `Self`.
    ///
    /// Accepts any type that can be viewed as `&[u8]` (`&str`, `&[u8]`,
    /// `String`, etc.).
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

#[cfg(feature = "alloc")]
impl FromHex for alloc::vec::Vec<u8> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode(hex)
    }
}

impl<const N: usize> FromHex for [u8; N] {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode_to_array(hex)
    }
}
```

- [ ] **Step 3: Wire into `src/lib.rs`**

Add the module declaration after the existing `mod` declarations:

```rust
mod traits;
```

Add to the public re-exports:

```rust
pub use traits::{ToHex, FromHex};
```

- [ ] **Step 4: Verify**

Run: `cargo test --test traits`

- [ ] **Step 5: Commit**

```bash
git add src/traits.rs src/lib.rs tests/traits.rs
git commit -m "feat: add ToHex and FromHex traits with blanket impls"
```

---

### Task 4: DisplayHex Benchmarks

**Files:**
- Create: `benches/display.rs`
- Modify: `Cargo.toml` (already done in Task 1)
- Modify: `src/display.rs` (make `encode_to_fmt` accessible for benchmarks)

Benchmarks the `display()` formatting path with different stack buffer sizes to find the optimal `DEFAULT_FMT_BUF` value. Also benchmarks `format!("{}", display(&data))` for various data sizes.

- [ ] **Step 1: Make `encode_to_fmt` benchmarkable**

Currently `encode_to_fmt` is `pub(crate)`. We need to expose it through `bench_internals` for benchmarking different `BUF` values. In `src/lib.rs`, add to the `bench_internals` module:

```rust
pub use crate::display::encode_to_fmt;
```

Also in `src/display.rs`, change the visibility from `pub(crate)` to `pub`:

```rust
pub fn encode_to_fmt<const BUF: usize>(...)
```

(It's still only reachable via `bench_internals` since `display` is a private module.)

Wait -- `display` is a private `mod display` in lib.rs. The `bench_internals` module uses `pub use crate::display::encode_to_fmt` but that only works if `encode_to_fmt` is at least `pub` (even though the module is private, re-export from a public module works). Let me verify: in Rust, you can re-export a `pub` item from a private module into a public module. The function needs to be `pub`, but the containing module `display` can stay private. Currently `encode_to_fmt` is `pub(crate)`, which is sufficient for re-export within the crate. Actually `pub(crate)` items can be re-exported by `pub use` from within the same crate into a `#[doc(hidden)] pub mod`. This works.

So we just add the re-export in `bench_internals`. No visibility change needed on `encode_to_fmt`.

In `src/lib.rs`, inside the `bench_internals` module, add:

```rust
pub use crate::display::encode_to_fmt;
```

- [ ] **Step 2: Write `benches/display.rs`**

```rust
use criterion::{BenchmarkId, Criterion, Throughput, criterion_group, criterion_main};
use std::fmt;

#[cfg(feature = "_bench_internals")]
use better_hex::bench_internals::encode_to_fmt;

const DATA_SIZES: &[usize] = &[16, 32, 64, 256, 1024, 4096];

/// Wrapper that calls encode_to_fmt with a specific BUF size.
#[cfg(feature = "_bench_internals")]
struct FmtEncoder<'a, const BUF: usize> {
    data: &'a [u8],
    upper: bool,
}

#[cfg(feature = "_bench_internals")]
impl<const BUF: usize> fmt::Display for FmtEncoder<'_, BUF> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        encode_to_fmt::<BUF>(self.data, f, self.upper)
    }
}

#[cfg(feature = "_bench_internals")]
fn bench_display_buf_sizes(c: &mut Criterion) {
    let mut group = c.benchmark_group("display_buf_size");

    // Test with 1024 bytes of input to see buffer size impact
    let data: Vec<u8> = (0u8..=255).cycle().take(1024).collect();
    group.throughput(Throughput::Bytes(1024));

    group.bench_function("buf_64", |b| {
        b.iter(|| format!("{}", FmtEncoder::<64> { data: std::hint::black_box(&data), upper: false }))
    });

    group.bench_function("buf_128", |b| {
        b.iter(|| format!("{}", FmtEncoder::<128> { data: std::hint::black_box(&data), upper: false }))
    });

    group.bench_function("buf_256", |b| {
        b.iter(|| format!("{}", FmtEncoder::<256> { data: std::hint::black_box(&data), upper: false }))
    });

    group.bench_function("buf_512", |b| {
        b.iter(|| format!("{}", FmtEncoder::<512> { data: std::hint::black_box(&data), upper: false }))
    });

    group.bench_function("buf_1024", |b| {
        b.iter(|| format!("{}", FmtEncoder::<1024> { data: std::hint::black_box(&data), upper: false }))
    });

    group.bench_function("buf_2048", |b| {
        b.iter(|| format!("{}", FmtEncoder::<2048> { data: std::hint::black_box(&data), upper: false }))
    });

    group.finish();
}

#[cfg(feature = "_bench_internals")]
fn bench_display_data_sizes(c: &mut Criterion) {
    let mut group = c.benchmark_group("display_format");

    for &size in DATA_SIZES {
        let data: Vec<u8> = (0u8..=255).cycle().take(size).collect();
        group.throughput(Throughput::Bytes(size as u64));

        // Uses the default display() which uses DEFAULT_FMT_BUF (256)
        group.bench_with_input(BenchmarkId::new("lower", size), &data, |b, data| {
            b.iter(|| format!("{}", better_hex::display(std::hint::black_box(data.as_slice()))))
        });

        group.bench_with_input(BenchmarkId::new("upper", size), &data, |b, data| {
            b.iter(|| format!("{:X}", better_hex::display(std::hint::black_box(data.as_slice()))))
        });

        group.bench_with_input(BenchmarkId::new("prefixed", size), &data, |b, data| {
            b.iter(|| format!("{:#x}", better_hex::display(std::hint::black_box(data.as_slice()))))
        });
    }

    group.finish();
}

#[cfg(feature = "_bench_internals")]
fn bench_display_vs_encode(c: &mut Criterion) {
    let mut group = c.benchmark_group("display_vs_encode");

    for &size in DATA_SIZES {
        let data: Vec<u8> = (0u8..=255).cycle().take(size).collect();
        group.throughput(Throughput::Bytes(size as u64));

        // format! with display() -- allocates via fmt machinery
        group.bench_with_input(BenchmarkId::new("format_display", size), &data, |b, data| {
            b.iter(|| format!("{}", better_hex::display(std::hint::black_box(data.as_slice()))))
        });

        // encode() -- direct String allocation
        group.bench_with_input(BenchmarkId::new("encode_string", size), &data, |b, data| {
            b.iter(|| better_hex::encode(std::hint::black_box(data.as_slice())))
        });
    }

    group.finish();
}

#[cfg(not(feature = "_bench_internals"))]
fn bench_display_buf_sizes(_c: &mut Criterion) {
    panic!("Re-run with --features _bench_internals");
}

#[cfg(not(feature = "_bench_internals"))]
fn bench_display_data_sizes(_c: &mut Criterion) {
    panic!("Re-run with --features _bench_internals");
}

#[cfg(not(feature = "_bench_internals"))]
fn bench_display_vs_encode(_c: &mut Criterion) {
    panic!("Re-run with --features _bench_internals");
}

criterion_group!(benches, bench_display_buf_sizes, bench_display_data_sizes, bench_display_vs_encode);
criterion_main!(benches);
```

- [ ] **Step 3: Verify**

Run: `cargo bench --features _bench_internals --bench display`

- [ ] **Step 4: Commit**

```bash
git add benches/display.rs src/lib.rs
git commit -m "bench: DisplayHex buffer-size and format benchmarks"
```

---

### Task 5: Serde Module

**Files:**
- Create: `src/serde_support/mod.rs`
- Create: `src/serde_support/common.rs`
- Create: `src/serde_support/upper.rs`
- Create: `src/serde_support/prefixed.rs`
- Create: `src/serde_support/upper_prefixed.rs`
- Create: `src/serde_support/ct.rs`
- Modify: `src/lib.rs`
- Create: `tests/serde.rs`

The module is named `serde_support` internally but re-exported as `pub mod serde` to match the `#[serde(with = "better_hex::serde")]` usage. Actually, we can't name a module `serde` inside a crate that depends on `serde` -- the name collision would cause ambiguity in `use` paths. Instead, we name the internal module `serde_support` and re-export it:

```rust
// In lib.rs:
#[cfg(feature = "serde")]
mod serde_support;
#[cfg(feature = "serde")]
pub use serde_support as serde;
```

Wait -- `pub use serde_support as serde` would clash with the `serde` crate import. We need a different approach. The standard pattern is:

```rust
#[cfg(feature = "serde")]
pub mod serde_impl;
```

And users write `#[serde(with = "better_hex::serde_impl")]`. But the DESIGN.md specifies `better_hex::serde`. Let's use the approach that `hex` and `const-hex` use: the module file is `src/serde.rs` but we reference the `serde` crate via `::serde` (absolute path) or by using `extern crate serde as serde_crate;`.

Actually, the cleanest approach in Rust 2024 edition: name the file `src/serde.rs`, declare `pub mod serde;` in lib.rs, and inside `src/serde.rs` always reference the serde crate via `::serde` or `serde::` since `pub mod serde` shadows the crate name within its own module. But from within `src/serde.rs`, we can use `::serde` to refer to the external crate. Let me verify this is the right approach.

Actually in Rust 2024, `extern crate` is implicit, and `::serde` refers to the external crate. Inside our `pub mod serde`, the name `serde` refers to the module itself (self), but `::serde` refers to the external crate. This works.

We'll use a directory module: `src/serde/mod.rs`, `src/serde/ct.rs`, etc.

- [ ] **Step 1: Write tests first (`tests/serde.rs`)**

```rust
//! Tests for serde integration.
#![cfg(feature = "serde")]

use serde::{Deserialize, Serialize};

// --- Fast (variable-time) serde ---

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct HashContainer {
    #[serde(with = "better_hex::serde")]
    hash: Vec<u8>,
}

#[test]
fn serde_roundtrip_vec() {
    let original = HashContainer {
        hash: vec![0xde, 0xad, 0xbe, 0xef],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"hash":"deadbeef"}"#);
    let decoded: HashContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct ArrayContainer {
    #[serde(with = "better_hex::serde")]
    data: [u8; 4],
}

#[test]
fn serde_roundtrip_array() {
    let original = ArrayContainer {
        data: [0xca, 0xfe, 0xba, 0xbe],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":"cafebabe"}"#);
    let decoded: ArrayContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct EmptyContainer {
    #[serde(with = "better_hex::serde")]
    data: Vec<u8>,
}

#[test]
fn serde_empty() {
    let original = EmptyContainer { data: vec![] };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"data":""}"#);
    let decoded: EmptyContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// --- Upper-case serde ---

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct UpperContainer {
    #[serde(with = "better_hex::serde::upper")]
    hash: Vec<u8>,
}

#[test]
fn serde_upper_roundtrip() {
    let original = UpperContainer {
        hash: vec![0xde, 0xad],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"hash":"DEAD"}"#);
    // Deserialize should accept mixed case
    let decoded: UpperContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// --- Prefixed serde ---

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct PrefixedContainer {
    #[serde(with = "better_hex::serde::prefixed")]
    addr: Vec<u8>,
}

#[test]
fn serde_prefixed_roundtrip() {
    let original = PrefixedContainer {
        addr: vec![0xca, 0xfe],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"addr":"0xcafe"}"#);
    let decoded: PrefixedContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[test]
fn serde_prefixed_accepts_without_prefix() {
    // Deserialize should also accept hex without "0x" prefix
    let json = r#"{"addr":"cafe"}"#;
    let decoded: PrefixedContainer = serde_json::from_str(json).unwrap();
    assert_eq!(decoded.addr, vec![0xca, 0xfe]);
}

// --- Upper prefixed serde ---

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct UpperPrefixedContainer {
    #[serde(with = "better_hex::serde::upper_prefixed")]
    addr: Vec<u8>,
}

#[test]
fn serde_upper_prefixed_roundtrip() {
    let original = UpperPrefixedContainer {
        addr: vec![0xde, 0xad],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"addr":"0xDEAD"}"#);
    let decoded: UpperPrefixedContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// --- CT serde ---

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct CtContainer {
    #[serde(with = "better_hex::serde::ct")]
    secret: Vec<u8>,
}

#[test]
fn serde_ct_roundtrip_vec() {
    let original = CtContainer {
        secret: vec![0xab, 0xcd, 0xef, 0x01],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"secret":"abcdef01"}"#);
    let decoded: CtContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct CtArrayContainer {
    #[serde(with = "better_hex::serde::ct")]
    secret: [u8; 4],
}

#[test]
fn serde_ct_roundtrip_array() {
    let original = CtArrayContainer {
        secret: [0xab, 0xcd, 0xef, 0x01],
    };
    let json = serde_json::to_string(&original).unwrap();
    assert_eq!(json, r#"{"secret":"abcdef01"}"#);
    let decoded: CtArrayContainer = serde_json::from_str(&json).unwrap();
    assert_eq!(decoded, original);
}

// --- Deserialize error cases ---

#[test]
fn serde_deserialize_invalid_hex() {
    let json = r#"{"hash":"zzzz"}"#;
    let result: Result<HashContainer, _> = serde_json::from_str(json);
    assert!(result.is_err());
}

#[test]
fn serde_deserialize_odd_length() {
    let json = r#"{"hash":"abc"}"#;
    let result: Result<HashContainer, _> = serde_json::from_str(json);
    assert!(result.is_err());
}

#[test]
fn serde_deserialize_array_wrong_length() {
    let json = r#"{"data":"deadbeefcafe"}"#;
    let result: Result<ArrayContainer, _> = serde_json::from_str(json);
    assert!(result.is_err());
}
```

- [ ] **Step 2: Create `src/serde/common.rs`**

Shared helpers used by all serde variants.

```rust
//! Shared serde helpers.
//!
//! These are internal types used by the `serialize`/`deserialize` functions
//! in the serde module and its submodules.

use crate::error::Error;
use core::fmt;
use core::marker::PhantomData;

/// Adapter that implements `fmt::Display` by writing hex encoding of `T`.
///
/// Used with `serializer.collect_str()` to stream hex into the serializer
/// without pre-allocating a `String`.
pub(super) struct HexDisplayAdapter<'a, T: ?Sized> {
    pub(super) data: &'a T,
    pub(super) upper: bool,
    pub(super) prefix: bool,
}

impl<T: AsRef<[u8]> + ?Sized> fmt::Display for HexDisplayAdapter<'_, T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.prefix {
            f.write_str("0x")?;
        }
        crate::display::encode_to_fmt::<256>(self.data.as_ref(), f, self.upper)
    }
}

/// CT variant: adapter that uses ct_encode instead of the fast path.
pub(super) struct CtHexDisplayAdapter<'a, T: ?Sized> {
    pub(super) data: &'a T,
    pub(super) upper: bool,
    pub(super) prefix: bool,
}

impl<T: AsRef<[u8]> + ?Sized> fmt::Display for CtHexDisplayAdapter<'_, T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.prefix {
            f.write_str("0x")?;
        }
        ct_encode_to_fmt(self.data.as_ref(), f, self.upper)
    }
}

/// CT version of encode_to_fmt: writes hex through fmt::Formatter using
/// the constant-time backend.
fn ct_encode_to_fmt(input: &[u8], f: &mut fmt::Formatter<'_>, upper: bool) -> fmt::Result {
    use crate::backend;
    use core::mem::MaybeUninit;

    const BUF_SIZE: usize = 256;
    let mut buf = [MaybeUninit::<u8>::uninit(); BUF_SIZE];
    let chunk_size = BUF_SIZE / 2;

    for chunk in input.chunks(chunk_size) {
        let hex_len = chunk.len() * 2;
        let hex_buf = &mut buf[..hex_len];
        if upper {
            backend::ct_encode::<true>(chunk, hex_buf);
        } else {
            backend::ct_encode::<false>(chunk, hex_buf);
        }
        // SAFETY: ct_encode writes hex_len bytes of valid hex ASCII.
        let s = unsafe {
            let initialized =
                core::slice::from_raw_parts(hex_buf.as_ptr().cast::<u8>(), hex_len);
            core::str::from_utf8_unchecked(initialized)
        };
        f.write_str(s)?;
    }
    Ok(())
}

/// Visitor for deserializing hex strings into `Vec<u8>`.
#[cfg(feature = "alloc")]
pub(super) struct HexVecVisitor {
    pub(super) strip_prefix: bool,
}

#[cfg(feature = "alloc")]
impl<'de> ::serde::de::Visitor<'de> for HexVecVisitor {
    type Value = alloc::vec::Vec<u8>;

    fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str("a hex-encoded string")
    }

    fn visit_str<E: ::serde::de::Error>(self, v: &str) -> Result<Self::Value, E> {
        let hex = if self.strip_prefix {
            v.strip_prefix("0x").or_else(|| v.strip_prefix("0X")).unwrap_or(v)
        } else {
            v
        };
        crate::decode(hex).map_err(E::custom)
    }
}

/// Visitor for deserializing hex strings into `[u8; N]`.
pub(super) struct HexArrayVisitor<const N: usize> {
    pub(super) strip_prefix: bool,
}

impl<'de, const N: usize> ::serde::de::Visitor<'de> for HexArrayVisitor<N> {
    type Value = [u8; N];

    fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "a hex-encoded string of {} bytes ({} hex chars)", N, N * 2)
    }

    fn visit_str<E: ::serde::de::Error>(self, v: &str) -> Result<Self::Value, E> {
        let hex = if self.strip_prefix {
            v.strip_prefix("0x").or_else(|| v.strip_prefix("0X")).unwrap_or(v)
        } else {
            v
        };
        crate::decode_to_array(hex).map_err(E::custom)
    }
}

/// CT Visitor for `Vec<u8>` -- uses ct::decode instead of fast decode.
#[cfg(feature = "alloc")]
pub(super) struct CtHexVecVisitor {
    pub(super) strip_prefix: bool,
}

#[cfg(feature = "alloc")]
impl<'de> ::serde::de::Visitor<'de> for CtHexVecVisitor {
    type Value = alloc::vec::Vec<u8>;

    fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str("a hex-encoded string")
    }

    fn visit_str<E: ::serde::de::Error>(self, v: &str) -> Result<Self::Value, E> {
        let hex = if self.strip_prefix {
            v.strip_prefix("0x").or_else(|| v.strip_prefix("0X")).unwrap_or(v)
        } else {
            v
        };
        let bytes = hex.as_bytes();
        if bytes.len() % 2 != 0 {
            return Err(E::custom(Error::InvalidLength {
                expected: bytes.len() + 1,
                got: bytes.len(),
            }));
        }
        let out_len = bytes.len() / 2;
        let mut out = alloc::vec![0u8; out_len];
        crate::ct::decode(bytes, &mut out).map_err(E::custom)?;
        Ok(out)
    }
}

/// CT Visitor for `[u8; N]` -- uses ct::decode_to_array.
pub(super) struct CtHexArrayVisitor<const N: usize> {
    pub(super) strip_prefix: bool,
}

impl<'de, const N: usize> ::serde::de::Visitor<'de> for CtHexArrayVisitor<N> {
    type Value = [u8; N];

    fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "a hex-encoded string of {} bytes ({} hex chars)", N, N * 2)
    }

    fn visit_str<E: ::serde::de::Error>(self, v: &str) -> Result<Self::Value, E> {
        let hex = if self.strip_prefix {
            v.strip_prefix("0x").or_else(|| v.strip_prefix("0X")).unwrap_or(v)
        } else {
            v
        };
        crate::ct::decode_to_array(hex.as_bytes()).map_err(E::custom)
    }
}

/// Helper trait to dispatch between Vec<u8> and [u8; N] for serialization.
///
/// This lets `serialize` and `deserialize` work generically with both
/// `Vec<u8>` and `[u8; N]`.
pub(super) trait HexSerde: ::serde::Serialize {
    fn as_hex_bytes(&self) -> &[u8];
    fn deserialize_hex<'de, D: ::serde::Deserializer<'de>>(
        deserializer: D,
        strip_prefix: bool,
    ) -> Result<Self, D::Error>
    where
        Self: Sized;
    fn ct_deserialize_hex<'de, D: ::serde::Deserializer<'de>>(
        deserializer: D,
        strip_prefix: bool,
    ) -> Result<Self, D::Error>
    where
        Self: Sized;
}

#[cfg(feature = "alloc")]
impl HexSerde for alloc::vec::Vec<u8> {
    fn as_hex_bytes(&self) -> &[u8] {
        self
    }

    fn deserialize_hex<'de, D: ::serde::Deserializer<'de>>(
        deserializer: D,
        strip_prefix: bool,
    ) -> Result<Self, D::Error> {
        deserializer.deserialize_str(HexVecVisitor { strip_prefix })
    }

    fn ct_deserialize_hex<'de, D: ::serde::Deserializer<'de>>(
        deserializer: D,
        strip_prefix: bool,
    ) -> Result<Self, D::Error> {
        deserializer.deserialize_str(CtHexVecVisitor { strip_prefix })
    }
}

impl<const N: usize> HexSerde for [u8; N] {
    fn as_hex_bytes(&self) -> &[u8] {
        self
    }

    fn deserialize_hex<'de, D: ::serde::Deserializer<'de>>(
        deserializer: D,
        strip_prefix: bool,
    ) -> Result<Self, D::Error> {
        deserializer.deserialize_str(HexArrayVisitor::<N> { strip_prefix })
    }

    fn ct_deserialize_hex<'de, D: ::serde::Deserializer<'de>>(
        deserializer: D,
        strip_prefix: bool,
    ) -> Result<Self, D::Error> {
        deserializer.deserialize_str(CtHexArrayVisitor::<N> { strip_prefix })
    }
}
```

- [ ] **Step 3: Create `src/serde/mod.rs`**

```rust
//! Serde integration for hex encoding/decoding.
//!
//! Use `#[serde(with = "better_hex::serde")]` to serialize byte fields as
//! lowercase hex strings and deserialize hex strings back to bytes.
//!
//! # Allocation caveat
//!
//! Serialization uses `serializer.collect_str()` which streams hex through
//! `fmt::Display` into the serializer's buffer. Serializers that override
//! `collect_str` (e.g., `serde_json`, `serde_yaml`) avoid heap allocation.
//! However, serde's **default** `collect_str` impl falls back to
//! `serialize_str(&value.to_string())`, which heap-allocates an intermediate
//! `String`. If you use a serializer that doesn't override `collect_str`,
//! there will be one extra heap allocation per field.
//!
//! # Submodules
//!
//! - [`upper`] -- serialize as uppercase hex
//! - [`prefixed`] -- serialize with `"0x"` prefix (lowercase)
//! - [`upper_prefixed`] -- serialize with `"0x"` prefix (uppercase)
//! - [`ct`] -- constant-time variants (see [`ct`] module docs)

mod common;
pub mod ct;
pub mod upper;
pub mod prefixed;
pub mod upper_prefixed;

use common::{HexDisplayAdapter, HexSerde};

/// Serialize bytes as a lowercase hex string.
///
/// Uses `serializer.collect_str()` to stream hex without pre-allocation
/// (when the serializer supports it -- see module-level docs).
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    serializer.collect_str(&HexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: false,
        prefix: false,
    })
}

/// Deserialize a hex string into bytes.
///
/// Accepts both lowercase and uppercase hex. Does NOT accept `"0x"` prefix
/// (use [`prefixed::deserialize`] for that).
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::deserialize_hex(deserializer, false)
}
```

- [ ] **Step 4: Create `src/serde/upper.rs`**

```rust
//! Serialize as uppercase hex, deserialize accepts mixed case.

use super::common::{HexDisplayAdapter, HexSerde};

/// Serialize bytes as an uppercase hex string.
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    serializer.collect_str(&HexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: true,
        prefix: false,
    })
}

/// Deserialize a hex string (accepts mixed case, no prefix).
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::deserialize_hex(deserializer, false)
}
```

- [ ] **Step 5: Create `src/serde/prefixed.rs`**

```rust
//! Serialize as `"0x"` + lowercase hex. Deserialize accepts with or without prefix.

use super::common::{HexDisplayAdapter, HexSerde};

/// Serialize bytes as `"0x"` + lowercase hex.
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    serializer.collect_str(&HexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: false,
        prefix: true,
    })
}

/// Deserialize a hex string. Accepts with or without `"0x"`/`"0X"` prefix.
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::deserialize_hex(deserializer, true)
}
```

- [ ] **Step 6: Create `src/serde/upper_prefixed.rs`**

```rust
//! Serialize as `"0x"` + uppercase hex. Deserialize accepts with or without prefix.

use super::common::{HexDisplayAdapter, HexSerde};

/// Serialize bytes as `"0x"` + uppercase hex.
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    serializer.collect_str(&HexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: true,
        prefix: true,
    })
}

/// Deserialize a hex string. Accepts with or without `"0x"`/`"0X"` prefix.
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::deserialize_hex(deserializer, true)
}
```

- [ ] **Step 7: Create `src/serde/ct.rs`**

```rust
//! Constant-time serde variants.
//!
//! For **fixed-size** inputs (`[u8; N]`): pre-encodes to a stack `HexStr<N>`,
//! then calls `serialize_str` directly. No heap allocation regardless of
//! serializer implementation. No `collect_str` fallback.
//!
//! For **dynamic-size** inputs (`Vec<u8>`): uses `collect_str` with the CT
//! encode path. The `collect_str` allocation caveat applies (see parent
//! module docs).
//!
//! Deserialization uses CT decode (no data-dependent branches, no LUTs,
//! error accumulation without early return).
//!
//! # Submodules
//!
//! - [`upper`] -- CT uppercase
//! - [`prefixed`] -- CT with `"0x"` prefix (lowercase)
//! - [`upper_prefixed`] -- CT with `"0x"` prefix (uppercase)

pub mod upper;
pub mod prefixed;
pub mod upper_prefixed;

use super::common::{CtHexDisplayAdapter, HexSerde};

/// Serialize bytes as lowercase hex (constant-time encode path).
///
/// For `[u8; N]`: pre-encodes to stack `HexStr<N>` and calls `serialize_str`.
/// For `Vec<u8>`: uses `collect_str` with CT encode (serializer-dependent
/// allocation).
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    // For dynamic-sized data, we fall back to collect_str with CT encode.
    // The fixed-size optimization (stack HexStr) is handled by specialization
    // at the HexSerde impl level -- but Rust doesn't have specialization yet.
    //
    // For now, all paths use collect_str with the CT backend. The key
    // difference from the fast path is that ct_encode uses branchless
    // arithmetic (scalar) or register-only SIMD, not memory-indexed LUTs.
    //
    // TODO: When min_specialization stabilizes, specialize [u8; N] to
    // pre-encode to HexStr<N> on the stack and call serialize_str directly,
    // avoiding the collect_str allocation caveat entirely.
    serializer.collect_str(&CtHexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: false,
        prefix: false,
    })
}

/// Deserialize a hex string using constant-time decode.
///
/// Returns `Error::InvalidEncoding` (not `InvalidChar`) on invalid input --
/// no position information is leaked.
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::ct_deserialize_hex(deserializer, false)
}
```

- [ ] **Step 8: Create `src/serde/ct/upper.rs`**

```rust
//! CT uppercase hex serde.

use crate::serde::common::{CtHexDisplayAdapter, HexSerde};

/// Serialize bytes as uppercase hex (constant-time).
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    serializer.collect_str(&CtHexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: true,
        prefix: false,
    })
}

/// Deserialize hex (CT decode, accepts mixed case).
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::ct_deserialize_hex(deserializer, false)
}
```

- [ ] **Step 9: Create `src/serde/ct/prefixed.rs`**

```rust
//! CT prefixed (lowercase) hex serde.

use crate::serde::common::{CtHexDisplayAdapter, HexSerde};

/// Serialize bytes as `"0x"` + lowercase hex (constant-time).
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    serializer.collect_str(&CtHexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: false,
        prefix: true,
    })
}

/// Deserialize hex (CT decode, strips optional `"0x"` prefix).
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::ct_deserialize_hex(deserializer, true)
}
```

- [ ] **Step 10: Create `src/serde/ct/upper_prefixed.rs`**

```rust
//! CT upper-prefixed hex serde.

use crate::serde::common::{CtHexDisplayAdapter, HexSerde};

/// Serialize bytes as `"0x"` + uppercase hex (constant-time).
pub fn serialize<T, S>(data: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: HexSerde + ?Sized,
    S: ::serde::Serializer,
{
    serializer.collect_str(&CtHexDisplayAdapter {
        data: data.as_hex_bytes(),
        upper: true,
        prefix: true,
    })
}

/// Deserialize hex (CT decode, strips optional `"0x"` prefix).
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: HexSerde,
    D: ::serde::Deserializer<'de>,
{
    T::ct_deserialize_hex(deserializer, true)
}
```

- [ ] **Step 11: Wire into `src/lib.rs`**

Add the module declaration. Because we name the directory `src/serde/`, we declare:

```rust
#[cfg(feature = "serde")]
pub mod serde;
```

This will conflict with `extern crate serde`. To resolve the name collision, we add an explicit extern crate alias in lib.rs:

```rust
#[cfg(feature = "serde")]
extern crate serde as serde_crate;
```

Then inside all `src/serde/*.rs` files, replace `::serde` references to the serde crate with `serde_crate`. Alternatively, a cleaner approach: name our module `serde` and within it reference the external crate as `::serde`. Wait -- in Rust 2024 edition with `pub mod serde`, `::serde` from within `src/serde/mod.rs` would refer to the *external* `serde` crate (crate-level extern prelude), not our module. This should work.

Actually, let me reconsider. From lib.rs scope, `serde` now refers to our module. From within our `src/serde/mod.rs`, the module name `serde` refers to `self` (the current module). External crate `serde` is accessible via `::serde` (absolute path).

But there's a problem: we use `#[cfg(feature = "serde")]` which is the same name as the feature and the dependency. And inside `src/serde/common.rs`, we need `use ::serde::de::Visitor` etc.

Let me use a simpler approach that avoids the naming conflict entirely: keep the internal module as `serde_impl` and re-export as `serde`. No wait, re-exporting a module *as* another name doesn't create a module you can have submodules on.

Best approach: use `#[path]` attribute:

```rust
// In lib.rs:
#[cfg(feature = "serde")]
#[path = "serde_impl/mod.rs"]
pub mod serde;
```

And put the files in `src/serde_impl/`. This way the public API is `better_hex::serde::*` but the files don't conflict with the crate name. Inside the files, `::serde` refers to the external serde crate.

Actually, the cleanest well-known approach (used by many crates): just name the file `src/serde.rs` (flat module, not directory) for the re-exports, and a directory `src/serde_support/` for the implementation. But that gets messy with submodules.

Let me just go with the `#[path]` approach. The directory is `src/serde_impl/`, the module is `pub mod serde`.

So the actual file paths are:
- `src/serde_impl/mod.rs`
- `src/serde_impl/common.rs`
- `src/serde_impl/upper.rs`
- `src/serde_impl/prefixed.rs`
- `src/serde_impl/upper_prefixed.rs`
- `src/serde_impl/ct.rs` (this is also a directory module)
- `src/serde_impl/ct/mod.rs` -- wait, `ct.rs` can't be both a file and directory.

Let me use:
- `src/serde_impl/ct/mod.rs`
- `src/serde_impl/ct/upper.rs`
- `src/serde_impl/ct/prefixed.rs`
- `src/serde_impl/ct/upper_prefixed.rs`

And in `src/serde_impl/mod.rs`, declare `pub mod ct;`.

In lib.rs:
```rust
#[cfg(feature = "serde")]
#[path = "serde_impl/mod.rs"]
pub mod serde;
```

Inside all implementation files, reference the external serde crate as `::serde`.

Update all the file paths in Steps 2-10 to use `src/serde_impl/` instead of `src/serde/`. And inside the code, use `crate::serde::common::*` for intra-module references (since the module's canonical name is `crate::serde`, not `crate::serde_impl`).

Wait, actually with `#[path = "serde_impl/mod.rs"] pub mod serde;`, inside those files `super` refers to `crate` (the parent of `crate::serde`). And `self` or unqualified paths refer to `crate::serde`. So `use super::common::*` from `ct/mod.rs` refers to `crate::serde::common`. This is correct because within the module tree, the module is `crate::serde`, the fact that files live in `serde_impl/` is just a filesystem detail.

So: within `src/serde_impl/ct/mod.rs`, `super::common` = `crate::serde::common`. Correct.

And `::serde` = the external serde crate. Correct.

- [ ] **Step 12: Verify**

Run: `cargo test --test serde --features serde`
Run: `cargo check --features serde --no-default-features --features alloc,serde`

- [ ] **Step 13: Commit**

```bash
git add src/serde_impl/ src/lib.rs tests/serde.rs
git commit -m "feat: add serde module with fast + CT variants, upper/prefixed submodules"
```

---

### Task 6: Trait and Serde Benchmarks

**Files:**
- Create: `benches/traits.rs`
- Modify: `Cargo.toml` (already done in Task 1)

Benchmarks `encode_to::<String>` vs `encode()`, and serde serialize/deserialize round-trips.

- [ ] **Step 1: Create `benches/traits.rs`**

```rust
use criterion::{BenchmarkId, Criterion, Throughput, criterion_group, criterion_main};

const SIZES: &[usize] = &[16, 32, 64, 256, 1024, 4096];

fn make_input(size: usize) -> Vec<u8> {
    (0u8..=(size as u8).wrapping_sub(1))
        .cycle()
        .take(size)
        .collect()
}

fn bench_encode_to_string(c: &mut Criterion) {
    let mut group = c.benchmark_group("encode_to_string");

    for &size in SIZES {
        let input = make_input(size);
        group.throughput(Throughput::Bytes(size as u64));

        // encode() -- existing API, allocates String directly
        group.bench_with_input(BenchmarkId::new("encode", size), &input, |b, input| {
            b.iter(|| better_hex::encode(std::hint::black_box(input.as_slice())))
        });

        // encode_to::<String>() -- HexTarget path
        group.bench_with_input(BenchmarkId::new("encode_to", size), &input, |b, input| {
            b.iter(|| {
                better_hex::encode_to::<String>(std::hint::black_box(input.as_slice()))
                    .unwrap()
            })
        });

        // encode_upper_to::<String>()
        group.bench_with_input(
            BenchmarkId::new("encode_upper_to", size),
            &input,
            |b, input| {
                b.iter(|| {
                    better_hex::encode_upper_to::<String>(
                        std::hint::black_box(input.as_slice()),
                    )
                    .unwrap()
                })
            },
        );
    }

    group.finish();
}

#[cfg(feature = "serde")]
fn bench_serde(c: &mut Criterion) {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    struct Container {
        #[serde(with = "better_hex::serde")]
        data: Vec<u8>,
    }

    #[derive(Serialize, Deserialize)]
    struct CtContainer {
        #[serde(with = "better_hex::serde::ct")]
        data: Vec<u8>,
    }

    let mut group = c.benchmark_group("serde");

    for &size in SIZES {
        let input = make_input(size);
        let container = Container {
            data: input.clone(),
        };
        let json = serde_json::to_string(&container).unwrap();
        let ct_container = CtContainer {
            data: input.clone(),
        };

        group.throughput(Throughput::Bytes(size as u64));

        // Fast serialize
        group.bench_with_input(
            BenchmarkId::new("serialize_fast", size),
            &container,
            |b, c| {
                b.iter(|| serde_json::to_string(std::hint::black_box(c)).unwrap())
            },
        );

        // CT serialize
        group.bench_with_input(
            BenchmarkId::new("serialize_ct", size),
            &ct_container,
            |b, c| {
                b.iter(|| serde_json::to_string(std::hint::black_box(c)).unwrap())
            },
        );

        // Fast deserialize
        group.bench_with_input(
            BenchmarkId::new("deserialize_fast", size),
            &json,
            |b, j| {
                b.iter(|| {
                    serde_json::from_str::<Container>(std::hint::black_box(j)).unwrap()
                })
            },
        );

        // CT deserialize
        group.bench_with_input(
            BenchmarkId::new("deserialize_ct", size),
            &json,
            |b, j| {
                b.iter(|| {
                    serde_json::from_str::<CtContainer>(std::hint::black_box(j)).unwrap()
                })
            },
        );
    }

    group.finish();
}

#[cfg(not(feature = "serde"))]
fn bench_serde(_c: &mut Criterion) {
    // serde benchmarks require the serde feature
}

criterion_group!(benches, bench_encode_to_string, bench_serde);
criterion_main!(benches);
```

- [ ] **Step 2: Verify**

Run: `cargo bench --bench traits`
Run: `cargo bench --bench traits --features serde`

- [ ] **Step 3: Commit**

```bash
git add benches/traits.rs
git commit -m "bench: encode_to vs encode, serde serialize/deserialize benchmarks"
```

---

### Task 7: Heapless / Arrayvec Integration Tests

**Files:**
- Modify: `tests/hex_target.rs` (add feature-gated tests)

These tests verify the HexTarget impls for heapless and arrayvec. They run only when the respective features are enabled.

- [ ] **Step 1: Add heapless tests to `tests/hex_target.rs`**

Append to the existing test file:

```rust
#[cfg(feature = "heapless")]
mod heapless_tests {
    #[test]
    fn encode_to_heapless_string() {
        let input = [0xde, 0xad, 0xbe, 0xef];
        let result: Option<heapless::String<8>> = better_hex::encode_to(&input);
        assert_eq!(result.unwrap().as_str(), "deadbeef");
    }

    #[test]
    fn encode_to_heapless_string_exact_capacity() {
        let input = [0xff; 4];
        let result: Option<heapless::String<8>> = better_hex::encode_to(&input);
        assert!(result.is_some());
        assert_eq!(result.unwrap().len(), 8);
    }

    #[test]
    fn encode_to_heapless_string_insufficient_capacity() {
        let input = [0xde, 0xad, 0xbe, 0xef];
        let result: Option<heapless::String<7>> = better_hex::encode_to(&input);
        assert!(result.is_none());
    }

    #[test]
    fn encode_to_heapless_string_empty() {
        let input: [u8; 0] = [];
        let result: Option<heapless::String<0>> = better_hex::encode_to(&input);
        assert_eq!(result.unwrap().as_str(), "");
    }

    #[test]
    fn encode_upper_to_heapless_string() {
        let input = [0xca, 0xfe];
        let result: Option<heapless::String<4>> = better_hex::encode_upper_to(&input);
        assert_eq!(result.unwrap().as_str(), "CAFE");
    }
}

#[cfg(feature = "arrayvec")]
mod arrayvec_tests {
    #[test]
    fn encode_to_arrayvec_string() {
        let input = [0xde, 0xad, 0xbe, 0xef];
        let result: Option<arrayvec::ArrayString<8>> = better_hex::encode_to(&input);
        assert_eq!(result.unwrap().as_str(), "deadbeef");
    }

    #[test]
    fn encode_to_arrayvec_string_exact_capacity() {
        let input = [0xff; 4];
        let result: Option<arrayvec::ArrayString<8>> = better_hex::encode_to(&input);
        assert!(result.is_some());
        assert_eq!(result.unwrap().len(), 8);
    }

    #[test]
    fn encode_to_arrayvec_string_insufficient_capacity() {
        let input = [0xde, 0xad, 0xbe, 0xef];
        let result: Option<arrayvec::ArrayString<7>> = better_hex::encode_to(&input);
        assert!(result.is_none());
    }

    #[test]
    fn encode_to_arrayvec_string_empty() {
        let input: [u8; 0] = [];
        let result: Option<arrayvec::ArrayString<0>> = better_hex::encode_to(&input);
        assert_eq!(result.unwrap().as_str(), "");
    }

    #[test]
    fn encode_upper_to_arrayvec_string() {
        let input = [0xca, 0xfe];
        let result: Option<arrayvec::ArrayString<4>> = better_hex::encode_upper_to(&input);
        assert_eq!(result.unwrap().as_str(), "CAFE");
    }
}
```

- [ ] **Step 2: Add heapless and arrayvec as dev-dependencies**

In `Cargo.toml` `[dev-dependencies]`, add:

```toml
heapless = "0.8"
arrayvec = "0.7"
```

- [ ] **Step 3: Verify**

Run: `cargo test --test hex_target --features heapless,arrayvec`

- [ ] **Step 4: Commit**

```bash
git add tests/hex_target.rs Cargo.toml
git commit -m "test: add heapless and arrayvec HexTarget integration tests"
```

---

## Implementation Notes

### Naming: `src/serde_impl/` vs `src/serde/`

We use `src/serde_impl/` for the filesystem path but mount it as `pub mod serde` via `#[path]`. This avoids a name collision between our module and the `serde` crate. Inside implementation files, `::serde` refers to the external serde crate (Rust 2024 extern prelude).

### HexSerde trait (internal)

The `HexSerde` trait in `src/serde_impl/common.rs` is a private helper that lets `serialize`/`deserialize` work generically with both `Vec<u8>` and `[u8; N]`. It is NOT part of the public API. Users interact only with `#[serde(with = "better_hex::serde")]`.

### CT serde and specialization

The DESIGN.md envisions a CT serde path that pre-encodes `[u8; N]` into a stack `HexStr<N>` and calls `serialize_str` directly (avoiding `collect_str` allocation). This requires specialization (different behavior for `[u8; N]` vs `Vec<u8>` in the same generic function), which is unstable. The plan uses `collect_str` with the CT backend for now and documents this as a TODO. When `min_specialization` stabilizes, we can add the stack-encode optimization.

### encode_to_fmt visibility

`encode_to_fmt` is `pub(crate)` in `display.rs`. The `bench_internals` module re-exports it as `pub` for benchmarking. No external visibility change needed.

### Test matrix

Full verification requires testing feature combinations:
- `cargo test` (default features: std)
- `cargo test --features serde`
- `cargo test --features heapless,arrayvec`
- `cargo test --features serde,heapless,arrayvec`
- `cargo test --no-default-features --features alloc`
- `cargo test --no-default-features --features alloc,serde`
