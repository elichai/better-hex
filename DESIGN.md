# better-hex Design Document

## Goals

A Rust hex encoding/decoding library that combines:
- SIMD acceleration across x86 (SSE2/SSSE3/AVX2/AVX-512), AArch64 (NEON), WASM (SIMD128)
- Compile-time (`const fn`) encoding and decoding
- Zero-allocation stack-based hex strings via const generics (`HexStr<N>`)
- Allocation-free serde
- Constant-time mode for cryptographic contexts (including CT SIMD — a first)
- Extensible output via traits (heapless, arrayvec, downstream types)

---

## Core Type: `HexStr<N, P>`

```rust
#[repr(C)]
pub struct HexStr<const N: usize, P: Prefix = NoPrefix> {
    prefix: P,            // P itself IS the storage
    bytes: [[u8; 2]; N],  // N pairs of hex ASCII digits
}

pub type PrefixedHexStr<const N: usize> = HexStr<N, WithPrefix>;
```

`N` = **byte count** (not hex char count). `HexStr<32>` holds 64 hex chars
for a 32-byte hash. `[[u8; 2]; N]` avoids the unstable `generic_const_exprs`
that `[u8; N * 2]` would require.

### Prefix types — zero-cost via `repr(transparent)` newtypes

```rust
#[derive(Copy, Clone, Pod, Zeroable)]
#[repr(C)]
pub struct NoPrefix;  // ZST, 0 bytes

#[derive(Copy, Clone, Pod, Zeroable)]
#[repr(transparent)]
pub struct WithPrefix([u8; 2]);  // 2 bytes: "0x"

mod sealed { pub trait Sealed {} }
impl sealed::Sealed for NoPrefix {}
impl sealed::Sealed for WithPrefix {}

pub trait Prefix: sealed::Sealed + Pod + Copy {
    const LEN: usize;
    fn new() -> Self;
}

impl Prefix for NoPrefix {
    const LEN: usize = 0;
    fn new() -> Self { NoPrefix }
}

impl Prefix for WithPrefix {
    const LEN: usize = 2;
    fn new() -> Self { WithPrefix(*b"0x") }
}
```

When `P = NoPrefix`, the ZST occupies 0 bytes. `repr(C)` places `bytes` at
offset 0. No wasted space, no pointer arithmetic to skip a dead prefix field.

Verified sizes:
- `size_of::<HexStr<4>>() == 8` (4 byte-pairs, no prefix overhead)
- `size_of::<HexStr<4, WithPrefix>>() == 10` (2 prefix + 8 hex)

### bytemuck — internal only, NOT on `HexStr`

`NoPrefix` and `WithPrefix` are concrete types — bytemuck derive works on
them and they are `Pod`/`Zeroable`.

**`HexStr` does NOT implement `Pod`/`Zeroable` publicly.** Reason: `Pod`
would allow safe code to construct a `HexStr` from arbitrary bytes (via
`bytemuck::cast`), violating the invariant that the content is valid hex
ASCII. That would make `as_str()` (which uses `from_utf8_unchecked`)
unsound.

Instead, bytemuck is used **internally** for the prefix types and for
safe byte-level access within the crate:

```rust
// Prefix types are Pod (public, fine — they're just [u8; 0] / [u8; 2])
#[derive(Copy, Clone, Pod, Zeroable)]
#[repr(C)]
pub struct NoPrefix;

#[derive(Copy, Clone, Pod, Zeroable)]
#[repr(transparent)]
pub struct WithPrefix([u8; 2]);

// HexStr uses a private as_bytes() that relies on repr(C) layout guarantees.
// Only one small unsafe: from_utf8_unchecked in as_str(), which is sound
// because all constructors (encode_lower, encode_upper, const_encode_*)
// only write valid hex ASCII.
impl<const N: usize, P: Prefix> HexStr<N, P> {
    pub fn as_bytes(&self) -> &[u8] {
        // SAFETY: repr(C), all fields are u8 arrays, no padding.
        unsafe { core::slice::from_raw_parts(self as *const Self as *const u8, Self::LEN) }
    }

    pub fn as_str(&self) -> &str {
        // SAFETY: all constructors guarantee hex ASCII content.
        unsafe { core::str::from_utf8_unchecked(self.as_bytes()) }
    }
}
```

The invariant is enforced by construction: `HexStr` has no public
constructor that accepts raw bytes. You can only create one via
`encode_lower`, `encode_upper`, `const_encode_*`, `FromStr`, or
deserialization — all of which guarantee valid hex ASCII content.

### HexStr methods

```rust
impl<const N: usize, P: Prefix> HexStr<N, P> {
    pub const LEN: usize = P::LEN + N * 2;

    pub const fn zero() -> Self;

    // Runtime encode (SIMD-accelerated)
    pub fn encode_lower(input: &[u8; N]) -> Self;
    pub fn encode_upper(input: &[u8; N]) -> Self;

    // Compile-time encode
    pub const fn const_encode_lower(input: &[u8; N]) -> Self;
    pub const fn const_encode_upper(input: &[u8; N]) -> Self;

    // Access
    pub fn as_str(&self) -> &str;       // via bytemuck::bytes_of + from_utf8_unchecked
    pub fn as_bytes(&self) -> &[u8];    // via bytemuck::bytes_of
    pub fn decode(&self) -> [u8; N];

    // std trait impls: Deref<Target=str>, AsRef<str>, AsRef<[u8]>,
    // Display, Debug, LowerHex, UpperHex, PartialEq<str>, FromStr
}
```

### Usage examples

```rust
let hex: HexStr<32> = HexStr::encode_lower(&hash_bytes);
println!("{hex}");  // 64 hex chars

let hex: PrefixedHexStr<20> = HexStr::encode_lower(&addr_bytes);
println!("{hex}");  // "0x" + 40 hex chars

const TX: HexStr<32> = HexStr::const_encode_lower(b"...32 bytes...");
```

---

## Free Functions (Slice-based)

For callers who don't know sizes at compile time:

```rust
// Encoding — into caller-provided buffer
pub fn encode_to_slice(input: &[u8], output: &mut [u8]) -> Result<&mut str, Error>;
pub fn encode_to_slice_upper(input: &[u8], output: &mut [u8]) -> Result<&mut str, Error>;

// Encoding — into HexStr (compile-time known size)
pub fn encode_to_array<const N: usize>(input: &[u8; N]) -> HexStr<N>;
pub fn encode_to_array_upper<const N: usize>(input: &[u8; N]) -> HexStr<N>;

// Encoding — into any HexTarget (trait-based, see below)
pub fn encode_to<T: HexTarget>(input: &[u8]) -> Result<T, Error>;
pub fn encode_upper_to<T: HexTarget>(input: &[u8]) -> Result<T, Error>;

// Encoding — convenience (requires alloc)
#[cfg(feature = "alloc")]
pub fn encode(input: &[u8]) -> String;
#[cfg(feature = "alloc")]
pub fn encode_upper(input: &[u8]) -> String;

// Decoding
pub fn decode_to_slice(input: &[u8], output: &mut [u8]) -> Result<&[u8], Error>;
pub fn decode_to_array<const N: usize>(input: impl AsRef<[u8]>) -> Result<[u8; N], Error>;
#[cfg(feature = "alloc")]
pub fn decode(input: impl AsRef<[u8]>) -> Result<Vec<u8>, Error>;

// Validation
pub fn check(input: &[u8]) -> bool;      // even length + all hex chars
pub fn check_raw(input: &[u8]) -> bool;  // chars only, no length check

// Const (compile-time)
pub const fn const_encode_lower<const N: usize>(input: &[u8; N]) -> HexStr<N>;
pub const fn const_encode_upper<const N: usize>(input: &[u8; N]) -> HexStr<N>;
pub const fn const_decode_to_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error>;
pub const fn const_check(input: &[u8]) -> bool;
```

---

## Display Helper

For formatting `&[u8]` without allocation:

```rust
pub fn display(data: &[u8]) -> impl Display + LowerHex + UpperHex + '_;
```

```rust
println!("{}", display(bytes));     // "dead"
println!("{:X}", display(bytes));   // "DEAD"
println!("{:#x}", display(bytes));  // "0xdead"
```

Uses the SIMD encode path internally via the `Output` trait (shared fast
path for buffer writes, `fmt::Display`, and serde — see Internal Architecture).

---

## HexTarget Trait (Extensible Output)

Instead of per-type encode functions, a trait that provides direct buffer
access for zero-copy SIMD writes:

```rust
/// A writable target for hex-encoded output.
///
/// Provides direct buffer access so the SIMD encode path can write
/// hex bytes straight into the target's memory — no intermediate copy.
///
/// # Safety
///
/// Implementors must ensure:
/// - `spare_bytes_mut()` returns a buffer of at least `hex_len` bytes
///   (the value passed to `try_with_hex_len`).
/// - `unsafe_assume_init(len)` correctly sets the internal string length
///   and the first `len` bytes form valid UTF-8 (guaranteed by the caller
///   to be hex ASCII).
pub unsafe trait HexTarget: Sized {
    /// Try to create a target pre-sized for `hex_len` hex characters.
    /// Returns `None` if capacity is insufficient.
    fn try_with_hex_len(hex_len: usize) -> Option<Self>;

    /// The spare buffer to write hex ASCII into.
    /// Must be at least `hex_len` bytes long.
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
unsafe impl HexTarget for String {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        Some(String::with_capacity(hex_len))
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        self.spare_capacity_mut()
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees first `len` spare bytes are valid hex ASCII.
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}

#[cfg(feature = "heapless")]
// SAFETY: heapless::String<CAP> wraps heapless::Vec<u8, CAP> which has
// a [MaybeUninit<u8>; CAP] buffer. as_mut_vec() gives access to the inner Vec,
// as_mut_ptr() returns a pointer to the start of the full buffer (including spare).
// Verified against heapless 0.8.0.
unsafe impl<const CAP: usize> HexTarget for heapless::String<CAP> {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        if hex_len > CAP { None } else { Some(heapless::String::new()) }
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        // heapless::Vec has as_mut_ptr() and set_len(), but no spare_capacity_mut().
        // We compute the spare region from raw pointer + len.
        let vec = unsafe { self.as_mut_vec() };
        let len = vec.len();
        let ptr = vec.as_mut_ptr().add(len) as *mut MaybeUninit<u8>;
        unsafe { core::slice::from_raw_parts_mut(ptr, CAP - len) }
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees first `len` spare bytes are valid hex ASCII (= valid UTF-8).
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}

#[cfg(feature = "arrayvec")]
// SAFETY: ArrayString<CAP> directly holds [MaybeUninit<u8>; CAP] + len.
// as_mut_ptr() returns a pointer to the start of the full buffer.
// set_len() is unsafe and directly available on ArrayString.
// Verified against arrayvec 0.7.6.
unsafe impl<const CAP: usize> HexTarget for arrayvec::ArrayString<CAP> {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        if hex_len > CAP { None } else { Some(arrayvec::ArrayString::new()) }
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        // ArrayString has as_mut_ptr() (safe) but no spare_capacity_mut().
        let len = self.len();
        let ptr = self.as_mut_ptr().add(len) as *mut MaybeUninit<u8>;
        unsafe { core::slice::from_raw_parts_mut(ptr, CAP - len) }
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees first `len` spare bytes are valid hex ASCII (= valid UTF-8).
        unsafe { self.set_len(new_len) };
    }
}
```

The encode path uses this directly — SIMD writes hex bytes straight into
the target's internal buffer. Zero intermediate copies.

```rust
pub fn encode_to<T: HexTarget>(input: &[u8]) -> Option<T> {
    let hex_len = input.len() * 2;
    let mut target = T::try_with_hex_len(hex_len)?;
    let buf = target.spare_bytes_mut();
    // SIMD encode writes directly into buf
    encode_into_uninit(input, buf);
    // SAFETY: encode_into_uninit writes exactly hex_len bytes of valid hex ASCII.
    unsafe { target.assume_init(hex_len) };
    Some(target)
}
```

Usage:
```rust
let s: String = better_hex::encode_to(&bytes).unwrap();
let s: heapless::String<64> = better_hex::encode_to(&bytes)?;
let s: MyCustomType = better_hex::encode_to(&bytes)?;  // downstream
```

---

## Encoding/Decoding Traits

```rust
pub trait ToHex {
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result;

    #[cfg(feature = "alloc")]
    fn to_hex_string(&self) -> String { .. }
    #[cfg(feature = "alloc")]
    fn to_upper_hex_string(&self) -> String { .. }
}

pub trait FromHex: Sized {
    type Error;
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

// Blanket impls:
impl<T: AsRef<[u8]>> ToHex for T { .. }
impl FromHex for Vec<u8> { .. }           // requires alloc
impl<const N: usize> FromHex for [u8; N] { .. }
```

---

## Serde (feature = "serde")

Serialization uses `serializer.collect_str()` which streams hex through
`fmt::Display` into the serializer's buffer. **Caveat:** serde's default
`collect_str` impl falls back to `serialize_str(&value.to_string())`,
which heap-allocates an intermediate `String`. Serializers that override
`collect_str` (e.g., `serde_json`, `serde_yaml`) avoid this. We document
this honestly and do not claim "allocation-free" unconditionally.

For the `serde::ct` path specifically, the serializer's `collect_str`
fallback would create a heap copy of secret-derived hex — undesirable.
To mitigate this, `serde::ct::serialize` pre-encodes into a stack
`HexStr<N>` when the input type has a known const size (e.g., `[u8; 32]`),
then calls `serialize_str` on the stack buffer directly. For dynamically-
sized inputs under `ct`, we fall back to `collect_str` and document the
caveat.

```rust
pub mod serde {
    // Fast — SIMD-accelerated, variable-time.
    // Uses collect_str (allocation depends on serializer implementation).
    pub fn serialize<T, S>(...) -> Result<S::Ok, S::Error>;
    pub fn deserialize<'de, T, D>(...) -> Result<T, D::Error>;
    pub mod upper { .. }
    pub mod prefixed { .. }
    pub mod upper_prefixed { .. }

    // Constant-time — no data-dependent branches or LUTs.
    // For fixed-size inputs ([u8; N]): pre-encodes to stack HexStr<N>,
    // then calls serialize_str directly. No heap allocation.
    // For dynamic inputs: uses collect_str (serializer-dependent).
    pub mod ct {
        pub fn serialize<T, S>(...) -> Result<S::Ok, S::Error>;
        pub fn deserialize<'de, T, D>(...) -> Result<T, D::Error>;
        pub mod upper { .. }
        pub mod prefixed { .. }
        pub mod upper_prefixed { .. }
    }
}
```

```rust
#[derive(Serialize, Deserialize)]
struct Tx {
    #[serde(with = "better_hex::serde")]
    pub hash: [u8; 32],

    // CT serialize: pre-encodes to HexStr<32> on stack, calls serialize_str.
    // No heap allocation regardless of serializer.
    #[serde(with = "better_hex::serde::ct")]
    pub secret_key: [u8; 32],

    #[serde(with = "better_hex::serde::prefixed")]
    pub address: [u8; 20],
}
```

---

## Constant-Time Module

```rust
/// Constant-time hex operations for cryptographic contexts.
///
/// Guarantees:
/// - No lookup tables in memory (all arithmetic or register-only SIMD LUTs)
/// - No data-dependent branches
/// - Error accumulation without early return (no timing leak on error position)
/// - NOT constant-time w.r.t. input *length* (only w.r.t. data *values*)
///
/// On platforms with SIMD: uses SIMD with register-based operations
/// (pshufb with in-register LUT is CT since there are no data-dependent
/// memory accesses). This is a first — base16ct is scalar-only CT.
///
/// Scalar fallback: branchless arithmetic (base16ct-style).
pub mod ct {
    // Encode is the same Error type (no data-dependent failure modes).
    pub fn encode_lower(input: &[u8], output: &mut [u8]) -> Result<&mut str, Error>;
    pub fn encode_upper(input: &[u8], output: &mut [u8]) -> Result<&mut str, Error>;

    // Decode returns Error::InvalidEncoding (not InvalidChar) on bad input.
    pub fn decode(input: &[u8], output: &mut [u8]) -> Result<&[u8], Error>;
    pub fn decode_to_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error>;
    pub fn check(input: &[u8]) -> bool;
}
```

### Constant-time algorithms

**CT Encode (scalar):** `ret = nibble + 0x30; ret += ((0x39 - ret) >> 8) & (0x61 - 0x3a);`
Arithmetic right shift of the sign bit creates an all-0 or all-1 mask.
No branches, no LUTs.

**CT Decode (scalar):** `((lower_bound - x) & (x - upper_bound)) >> 8` range-check
mask. Error accumulation: `err |= decoded >> 8` — processes ALL bytes before
returning error (no timing leak on which position is invalid).

**CT SIMD Encode:** `pshufb`/`tbl`/`swizzle` with in-register 16-byte LUT.
Register-only operations have no cache-timing side channel. The same fast
SIMD encode is already constant-time.

**CT SIMD Decode:** Same Lemire/Mula-Langdale algorithm but with two changes:
1. No early return on validation error — accumulate error bits, check at end
2. Register-only operations throughout (saturating arithmetic, no memory LUTs)

---

## Error Type

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    /// Input hex string has odd length.
    OddLength,
    /// Invalid hex character at a known position (fast path only).
    InvalidChar { byte: u8, index: usize },
    /// Invalid hex encoding detected (constant-time path — no position info).
    /// Returned by `ct::` functions to avoid leaking which byte was invalid.
    InvalidEncoding,
    /// Output buffer has wrong length.
    InvalidLength { expected: usize, got: usize },
}
```

The `InvalidEncoding` variant exists because constant-time decode
accumulates a single error bit across all bytes and checks at the end.
Reporting `byte`/`index` would require a second data-dependent scan,
defeating the CT guarantee. Fast-path functions return `InvalidChar`;
CT functions return `InvalidEncoding`.

---

## Feature Flags

| Feature | Default | Description |
|---------|---------|-------------|
| `std`   | yes     | Implies `alloc`. Runtime CPU detection, `std::error::Error` |
| `alloc` | via std | `String`/`Vec` APIs |
| `serde` | no      | Serde support (fast + CT variants; see serde section for allocation caveats) |
| `heapless` | no   | `HexTarget` impl for `heapless::String<N>` |
| `arrayvec` | no   | `HexTarget` impl for `arrayvec::ArrayString<N>` |
| `force-generic` | no | Disable all SIMD, force scalar fallback |

---

## Internal Architecture

### Encode paths

There are two internal encode paths that share the same SIMD core:

1. **Direct buffer path** — used by `encode_to_slice`, `HexStr::encode_*`,
   and `HexTarget::encode_to`. The SIMD encoder writes directly into
   `&mut [u8]` or `&mut [MaybeUninit<u8>]`. Zero copies.

2. **`fmt::Write` path** — used by `Display`, `LowerHex`, `UpperHex`, and
   serde `collect_str`. The SIMD encoder writes into a small stack buffer
   (e.g., 64 or 128 bytes), then flushes to `fmt::Formatter` via `write_str`.
   One copy per chunk, but unavoidable since `fmt::Formatter` owns its buffer.

```rust
/// Internal: write hex through a fmt::Formatter (for Display/serde).
pub(crate) fn encode_to_fmt(
    input: &[u8],
    f: &mut fmt::Formatter<'_>,
    upper: bool,
) -> fmt::Result;
```

### Architecture dispatch

```
src/arch/
  mod.rs       — runtime dispatch: pick best available backend
  generic.rs   — scalar fallback (always available)
  x86.rs       — SSE2, SSSE3, AVX2, AVX-512
  aarch64.rs   — NEON
  wasm32.rs    — SIMD128
```

Each backend exposes the same function signatures:

```rust
pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [u8]);
pub(crate) fn decode(input: &[u8], output: &mut [u8]) -> Result<(), Error>;
pub(crate) fn check(input: &[u8]) -> bool;

// Constant-time variants (no early return, no memory LUTs).
// ct_decode returns InvalidEncoding (not InvalidChar) on failure.
pub(crate) fn ct_encode<const UPPER: bool>(input: &[u8], output: &mut [u8]);
pub(crate) fn ct_decode(input: &[u8], output: &mut [u8]) -> Result<(), Error>;
```

### CPU feature detection — dual path

```rust
cfg_if::cfg_if! {
    if #[cfg(feature = "std")] {
        // std: is_x86_feature_detected! — has cfg!(target_feature) fast path,
        // branch eliminated entirely when compiling with -C target-cpu=native.
        // Caches ALL features in a global AtomicUsize bitset on first call.
        fn has_avx2() -> bool { std::arch::is_x86_feature_detected!("avx2") }
        fn has_ssse3() -> bool { std::arch::is_x86_feature_detected!("ssse3") }
    } else {
        // no_std: cpufeatures crate — same cfg!(target_feature) fast path.
        // Per-feature AtomicU8 cache, works without OS APIs on x86.
        cpufeatures::new!(cpuid_avx2, "avx2");
        cpufeatures::new!(cpuid_ssse3, "ssse3");
    }
}
```

Both paths compile the detection branch to nothing when `-C target-feature=+avx2`
is set (unlike faster-hex's manual CPUID approach which misses this optimization).

NEON: baseline on aarch64, just `cfg!(target_feature = "neon")`.
WASM: compile-time only, `cfg!(target_feature = "simd128")`.

---

## Algorithm Choices

### Encoding (SIMD) — pshufb register LUT

All architectures use the same approach:
1. Load 16-byte hex char table into a SIMD register
2. Split each input byte into high nibble (`>> 4`) and low nibble (`& 0x0F`)
3. `pshufb`/`tbl`/`swizzle` — look up each nibble in the register LUT
4. Interleave high+low results into output order

This is inherently constant-time (register-only, no memory-indexed LUT).

| Arch | Shuffle | Interleave |
|------|---------|------------|
| x86 SSSE3 | `_mm_shuffle_epi8` | `_mm_unpacklo/hi_epi8` |
| x86 AVX2 | `_mm256_shuffle_epi8` | `_mm256_unpacklo/hi_epi8` + `permute2x128` |
| AArch64 | `vqtbl1q_u8` | `vzipq_u8` |
| WASM | `u8x16_swizzle` | `u8x16_shuffle` (compile-time indices) |

### Encoding (scalar) — 16-byte LUT

```
table[byte >> 4], table[byte & 0x0F]
```

### Encoding (scalar CT) — branchless arithmetic

```
ret = nibble + 0x30;
ret += ((0x39 - ret) >> 8) & (0x61 - 0x3a);   // lowercase
ret += ((0x39 - ret) >> 8) & (0x41 - 0x3a);   // uppercase
```

### Decoding (SIMD) — Lemire 2023 subtract-1 + pshufb classification

Fewer instructions than the Mula-Langdale algo that const-hex currently uses:
1. `vm1 = input - 1` — shifts ASCII ranges for cleaner high-nibble distribution
2. `hash_key = (vm1 >> 4) & 0x0F` — 4-bit classifier
3. `check = vm1 + shuffle(delta_check, hash_key)` — single-instruction validation
4. `nibbles = vm1 + shuffle(delta_rebase, hash_key)` — single-instruction conversion
5. `bytes = maddubs(nibbles, 0x0110)` — packs pairs: `hi*16 + lo`
6. `packus_epi16` + lane fixup — 16-bit to 8-bit

WASM lacks `maddubs`, so step 5-6 become: deinterleave via `u8x16_shuffle`,
then `(hi << 4) | lo`. Also `* 9` in unhex becomes `(x << 3) + x` (no 8-bit mul).

### Decoding (scalar) — 256-byte LUT

```
LUT[ascii_byte] -> nibble value (0-15) or 0xFF (invalid)
output = (LUT[hi_char] << 4) | LUT[lo_char]
```

### Decoding (scalar CT) — branchless range-check (mixed case)

Handles '0'-'9', 'A'-'F', AND 'a'-'f' — three branchless range checks:

```
ret = -1;
ret += (((0x2F - byte) & (byte - 0x3A)) >> 8) & (byte - 47);  // '0'..'9' -> 0..9
ret += (((0x40 - byte) & (byte - 0x47)) >> 8) & (byte - 54);  // 'A'..'F' -> 10..15
ret += (((0x60 - byte) & (byte - 0x67)) >> 8) & (byte - 86);  // 'a'..'f' -> 10..15
// Error: ret stays -1 (0xFFFF as u16), detected via err |= ret >> 8
```

Each line uses the same technique: `((lower-x) & (x-upper)) >> 8` is
all-ones when x is in range, all-zeros otherwise. The three ranges are
mutually exclusive so at most one contributes. This matches base16ct's
`mixed` module approach.

### Validation — Mula-Langdale signed bias (x86), range cmp (NEON/WASM)

---

## Testing & Fuzzing Strategy

### Architecture-oracle fuzzing

Each SIMD backend is fuzzed against the naive scalar implementation.
`#[cfg(fuzzing)]` makes all arch-specific functions accessible.

Fuzz targets:

1. **encode_roundtrip**: `decode(encode(bytes)) == bytes`
2. **encode_cross_arch**: `generic(bytes) == ssse3(bytes) == avx2(bytes) == neon(bytes) == wasm(bytes)`
3. **decode_cross_arch**: `generic(hex) == avx2(hex) == neon(hex) == wasm(hex)`
4. **decode_invalid**: random bytes -> all backends agree on Ok/Err
5. **check_cross_arch**: all backends agree on valid/invalid
6. **ct_vs_fast**: `ct::encode(x) == encode(x)`, `ct::decode(x) == decode(x)`
7. **boundary_lengths**: target SIMD chunk edges (15/16/17, 31/32/33, 63/64/65)

### Deterministic edge-case tests

- Empty input
- Single byte (all 256 values)
- Odd-length hex -> OddLength error
- Every invalid ASCII byte in every position
- All-zeros, all-0xFF
- Mixed case decode
- Exact SIMD boundary lengths
- Very long input (> 4KB)
- Prefix handling ("0x" present/absent)
- Boundary hex chars: '/' (0x2F), ':' (0x3A), '@' (0x40), 'G' (0x47), '`' (0x60), 'g' (0x67)

### Property tests (proptest)

- `decode(encode(x)) == x` for all byte sequences
- `encode(x)` contains only `[0-9a-f]` (or `[0-9A-F]`)
- `encode(x).len() == 2 * x.len()`
- `check(encode(x)) == true`
- `ct::encode(x) == encode(x)`
- `ct::decode(h) == decode(h)`

---

## Crate Comparison (Why better-hex)

| Feature | hex | const-hex | faster-hex | base16ct | **better-hex** |
|---------|-----|-----------|------------|----------|----------------|
| SIMD | - | x86/ARM/WASM | x86/ARM (partial) | - | x86/ARM/WASM + AVX-512 |
| const fn | - | full | - | - | full |
| Stack hex string | - | `Buffer<N>` (wastes 2B) | heapless | - | `HexStr<N>` (zero waste) |
| Serde | - | yes (collect_str) | yes (allocates) | - | yes (collect_str + stack pre-encode for CT) |
| Constant-time | - | - | - | scalar only | **scalar + SIMD** |
| CT serde | - | - | - | - | **yes** |
| Extensible output | - | - | - | - | `HexTarget` trait |
| Decode algorithm | 256B LUT | Mula-Langdale | unhex+maddubs | CT arithmetic | **Lemire 2023** |
| Prefix zero-cost | - | no (2B waste) | - | - | **yes** (ZST) |
