# better-hex

Fast, constant-time hex encoding and decoding with SIMD and `const fn`.

`no_std` compatible. MIT OR Apache-2.0.

## Features

- **Constant-time** — all operations are constant-time w.r.t. input data values:
  - No lookup tables in memory (branchless arithmetic or register-only SIMD LUTs)
  - No data-dependent branches
  - Error accumulation without early return
  - Note: NOT constant-time w.r.t. input *length*, only w.r.t. data values
- **SIMD acceleration** — x86 (SSSE3 / AVX2 / AVX-512BW), AArch64 (NEON), WASM (SIMD128)
- **Compile-time** — `const fn` encode, decode, and validation via `const_fn`
- **Stack hex strings** — `HexStr<N>` / `PrefixedHexStr<N>` with zero overhead (no heap)
- **Extensible output** — `HexTarget` trait covers `String`, `heapless::String`, `arrayvec::ArrayString`, and downstream types
- **Serde** — constant-time serialize/deserialize helpers (optional feature)

## Quick start

```rust
// Encode
let hex: String = better_hex::encode(b"hello")?;       // "68656c6c6f"
let hex: String = better_hex::encode_upper(b"hello")?;  // "68656C6C6F"

// Stack-allocated, zero-copy
use better_hex::HexStr;
let s: HexStr<5> = HexStr::encode_lower(b"hello");
println!("{s}");                                       // "68656c6c6f"

// Const (compile time)
const HEX: HexStr<5> = HexStr::const_encode_lower(b"hello");

// Decode
let bytes: Vec<u8> = better_hex::decode(b"68656c6c6f")?;
let arr: [u8; 5] = better_hex::decode(b"68656c6c6f")?;
```

## Acknowledgments

This crate builds on algorithms, ideas, and API design from the following
crates and research. Licenses are noted; all are permissive.

### Crates inspected

- **[const-hex](https://github.com/danipopes/const-hex)** by DaniPopes —
  SSSE3/AVX2 `pshufb`-based SIMD encode; `const fn` encode; `Buffer<N>`
  stack-hex type; Mula–Langdale decode (used in earlier iterations of this
  crate's design) —
  **MIT OR Apache-2.0**

- **[faster-hex](https://github.com/nervosnetwork/faster-hex)** by Nervos Foundation —
  x86 SIMD encode/decode techniques; `pshufb` nibble LUT approach —
  **MIT**
  (Copyright © 2018 Nervos Foundation)

- **[hex](https://github.com/KokaKiwi/rust-hex)** by KokaKiwi / The rust-hex Developers —
  `FromHex` / `ToHex` trait API design, scalar decode LUT, serde helpers —
  **MIT OR Apache-2.0**
  (Copyright © 2013–2014 The Rust Project Developers; © 2015–2020 The rust-hex Developers)

- **[base16ct](https://github.com/RustCrypto/formats/tree/master/base16ct)** (RustCrypto) —
  constant-time scalar encode/decode arithmetic (the branchless nibble
  encoding and the three-range branchless decode used in `scalar.rs`);
  CT encode/decode API design —
  **MIT OR Apache-2.0**
  (Copyright © 2014 Steve "Sc00bz" Thomas; © 2022–2025 The RustCrypto Project Developers)

- **[hex-conservative](https://github.com/rust-bitcoin/hex-conservative)** (rust-bitcoin) —
  `HexStr`-style display formatting; `no_std` API design patterns —
  **CC0 1.0 Universal** (public domain dedication)

- **[data-encoding](https://github.com/ia0/data-encoding)** by Julien Cretin —
  general-purpose base-N encoding design; `no_std` / allocation-free
  patterns; validation-before-decode structure —
  **MIT**
  (Copyright © 2015–2020 Julien Cretin; © 2017–2020 Google Inc.)

### Algorithm references

- **Daniel Lemire** — "Fast hexadecimal decoding" (2023) —
  The subtract-1 + `pshufb` classification scheme used for x86 SIMD decode
  and validation (`delta_check` / `delta_rebase` tables in `x86.rs`).
  <https://lemire.me/blog/2023/12/22/fast-hexadecimal-decoding/>

- **Daniel Lemire** — "Decoding base16 sequences quickly" (2023) —
  Earlier analysis motivating the subtract-1 hashing trick.
  <https://lemire.me/blog/2023/07/27/decoding-base16-sequences-quickly/>

- **Daniel Lemire** — "Parsing short hexadecimal strings efficiently" (2019) —
  Branchless scalar nibble classification using signed-overflow range masks
  (influences the `ct_decode_nibble` function in `scalar.rs`).
  <https://lemire.me/blog/2019/04/17/parsing-short-hexadecimal-strings-efficiently/>

- **Wojciech Muła & Daniel Langdale** — SIMD nibble-decode algorithm —
  The min-of-two-paths approach (digit path + alpha path merged via
  `vminq_u8` / `u8x16_min`) used in the NEON and WASM decode backends.
  Referenced implementation: <https://github.com/WojciechMula/toys/tree/master/hex>

- **Steve "Sc00bz" Thomas** — ConstTimeEncoding —
  Original constant-time branchless hex arithmetic (encode: sign-bit mask
  for letter/digit selection; decode: three overlapping range-masked sums
  with error accumulation). Ported into Rust by the RustCrypto project in
  `base16ct` and adapted here in `src/backend/scalar.rs`.
  <https://tobtu.com/dectobase16ct.php>
