//! Convenience traits for hex encoding and decoding.
//!
//! [`ToHex`] provides hex encoding via [`write_hex`](ToHex::write_hex) (any
//! [`fmt::Write`] sink) and [`encode_hex`](ToHex::encode_hex) (any
//! [`HexTarget`](crate::HexTarget), zero-copy).
//!
//! [`FromHex`] provides [`from_hex`](FromHex::from_hex) for constructing types
//! from hex strings — including `Vec<u8>`, `[u8; N]`, `heapless::Vec`, and
//! `arrayvec::ArrayVec`.

use crate::{HexStr, Prefix, error::Error, maybe_uninit};
use core::fmt;
use core::mem::MaybeUninit;

/// Trait for types that can be hex-encoded.
///
/// Implemented for `[u8; N]`, `[u8]`, and (with `alloc`) `Vec<u8>`,
/// `Box<[u8]>`, and `Cow<'_, [u8]>`. The `[u8]` impl covers `&[u8]`
/// callers via auto-deref on method calls. Downstream byte containers
/// can implement `ToHex` themselves to plug into [`write_hex`],
/// [`encode_hex`], and the serde [`serialize`] path uniformly.
///
/// # Examples
///
/// ```rust
/// use better_hex::ToHex;
///
/// let mut buf = String::new();
/// [0xde, 0xad_u8].write_hex(&mut buf, false).unwrap();
/// assert_eq!(buf, "dead");
///
/// let s: String = [0xde, 0xad_u8].encode_hex().unwrap();
/// assert_eq!(s, "dead");
/// ```
///
/// [`write_hex`]: ToHex::write_hex
/// [`encode_hex`]: ToHex::encode_hex
/// [`serialize`]: ToHex::serialize
pub trait ToHex {
    /// Write hex encoding into any [`fmt::Write`] sink.
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result;

    /// Encode to lowercase hex into any [`HexTarget`] (zero-copy).
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error>;

    /// Encode to uppercase hex into any [`HexTarget`] (zero-copy).
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error>;

    /// Serialize as a hex string via serde.
    ///
    /// Only available with the `serde` feature.
    ///
    /// `PREFIX` selects `"0x"` prefixing (compile-time); `upper` selects
    /// uppercase vs lowercase digits (runtime).
    ///
    /// Default body: `collect_str` over an adapter that calls
    /// [`write_hex`](Self::write_hex). Alloc-free with serializers that
    /// override `Serializer::collect_str` (e.g. `serde_json`,
    /// `serde_yaml`); the default `collect_str` falls back to a temporary
    /// `String`. Implementors with a known compile-time hex length can
    /// override this to stack-encode and call `serialize_str` directly,
    /// avoiding any allocation regardless of serializer.
    ///
    /// Asymmetry note: [`encode_hex`](Self::encode_hex) carries prefix
    /// info in the *target* type ([`HexStr<N, WithPrefix>`](crate::HexStr)
    /// includes it; `String` / `ArrayString` etc. do not). `serialize`
    /// has nowhere to compose the prefix at the call site, so it takes
    /// the prefix as a `const PREFIX` parameter instead.
    #[cfg(feature = "serde")]
    #[cfg_attr(docsrs, doc(cfg(feature = "serde")))]
    fn serialize<S, const PREFIX: bool>(&self, serializer: S, upper: bool) -> Result<S::Ok, S::Error>
    where
        S: ::serde::Serializer,
    {
        serializer.collect_str(&HexAdapter::<Self> {
            value: self,
            upper,
            prefix: PREFIX,
        })
    }
}

/// `Display` adapter used by the default [`ToHex::serialize`] body —
/// streams hex (with optional `"0x"` prefix) through `collect_str`.
#[cfg(feature = "serde")]
struct HexAdapter<'a, T: ToHex + ?Sized> {
    value: &'a T,
    upper: bool,
    prefix: bool,
}

#[cfg(feature = "serde")]
impl<T: ToHex + ?Sized> fmt::Display for HexAdapter<'_, T> {
    #[inline]
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.prefix {
            f.write_str("0x")?;
        }
        self.value.write_hex(f, self.upper)
    }
}

/// Trait for types that can be constructed from hex-encoded data.
///
/// All built-in implementations accept upper, lower, and mixed case
/// hex characters (`[0-9a-fA-F]`).
///
/// # Built-in implementations
///
/// - `[u8; N]` — always available.
/// - `Vec<u8>` — with the `alloc` feature.
/// - `Cow<'_, [u8]>` — with the `alloc` feature. Always returns
///   [`Cow::Owned`](alloc::borrow::Cow::Owned) wrapping a freshly-decoded
///   `Vec<u8>`; the borrowed variant is never produced because decoding
///   inherently allocates fresh output bytes (the hex input is twice as
///   long as the decoded output and is consumed as a byte stream, so there
///   is nothing to borrow from).
/// - `heapless::Vec<u8, N>` — with the `heapless` feature. Returns
///   [`Error::InvalidLength`] if the decoded length exceeds capacity `N`.
/// - `arrayvec::ArrayVec<u8, N>` — with the `arrayvec` feature. Returns
///   [`Error::InvalidLength`] if the decoded length exceeds capacity `N`.
///
/// # Examples
///
/// ```rust
/// use better_hex::FromHex;
///
/// let bytes = Vec::<u8>::from_hex("deadbeef").unwrap();
/// assert_eq!(bytes, [0xde, 0xad, 0xbe, 0xef]);
///
/// let arr = <[u8; 4]>::from_hex("DEADBEEF").unwrap();
/// assert_eq!(arr, [0xde, 0xad, 0xbe, 0xef]);
/// ```
pub trait FromHex: Sized {
    /// The error type returned on decode failure.
    type Error: core::fmt::Display;

    /// Decode a hex string into `Self`.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

/// A type that can be constructed by hex-encoding raw bytes into it.
///
/// Each implementor manages its own internal buffer. The SIMD encode path
/// writes directly into the target's memory — no intermediate copies.
///
/// See the [crate-level features table](crate#cargo-features) for the
/// full list of built-in implementors and the feature gating each one
/// (`HexStr<N, P>`, `String`, `heapless::String<CAP>`,
/// `arrayvec::ArrayString<CAP>`).
///
/// Most callers will not invoke this trait directly — the free functions
/// [`encode`](crate::encode) / [`encode_upper`](crate::encode_upper) and
/// [`ToHex::encode_hex`] dispatch through it with `T` inferred from the
/// binding type.
///
/// # Examples
///
/// ```rust
/// // Typical call site — type is inferred from the binding.
/// let s: String = better_hex::encode(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
///
/// let s: String = better_hex::encode_upper(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
///
/// // Calling the trait method directly also works.
/// use better_hex::HexTarget;
/// let s = String::encode_hex(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
/// ```
pub trait HexTarget: Sized {
    /// Error returned when the target cannot hold the encoded output.
    ///
    /// For dynamically-sized implementors backed by allocation (`String`),
    /// this is [`core::convert::Infallible`] — construction cannot fail
    /// (allocator OOM still panics in `alloc`, as elsewhere). For
    /// fixed-capacity implementors (`heapless::String<CAP>`,
    /// `arrayvec::ArrayString<CAP>`, `HexStr<N, P>`), this is the crate
    /// [`Error`](crate::Error), and overflow surfaces as
    /// [`Error::InvalidLength`](crate::Error::InvalidLength).
    type Error;

    /// Encode `bytes` as lowercase hex into a new instance of `Self`.
    fn encode_hex(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error>;

    /// Encode `bytes` as uppercase hex into a new instance of `Self`.
    fn encode_hex_upper(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

impl<const N: usize> ToHex for [u8; N] {
    #[inline]
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        crate::display::write_hex_to::<{ crate::display::DEFAULT_BUF }, _>(self, w, upper)
    }
    #[inline]
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        T::encode_hex(self)
    }
    #[inline]
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
        T::encode_hex_upper(self)
    }

    /// Fast path: stack-encode into a [`HexStr<N, P>`](crate::HexStr) and
    /// hand a complete `&str` to `serialize_str`. Alloc-free regardless of
    /// the serializer's `collect_str` implementation.
    #[cfg(feature = "serde")]
    #[inline]
    fn serialize<S, const PREFIX: bool>(&self, serializer: S, upper: bool) -> Result<S::Ok, S::Error>
    where
        S: ::serde::Serializer,
    {
        if PREFIX {
            let hex = if upper {
                HexStr::<N, crate::WithPrefix>::encode_upper(self)
            } else {
                HexStr::<N, crate::WithPrefix>::encode_lower(self)
            };
            serializer.serialize_str(hex.as_str())
        } else {
            let hex = if upper {
                HexStr::<N>::encode_upper(self)
            } else {
                HexStr::<N>::encode_lower(self)
            };
            serializer.serialize_str(hex.as_str())
        }
    }
}

impl ToHex for [u8] {
    #[inline]
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        crate::display::write_hex_to::<{ crate::display::DEFAULT_BUF }, _>(self, w, upper)
    }
    #[inline]
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        T::encode_hex(self)
    }
    #[inline]
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
        T::encode_hex_upper(self)
    }
}

/// Reference forwarding so `&[u8]`, `&[u8; N]`, `&Vec<u8>` etc. all
/// implement [`ToHex`] — and a `&[u8; N]` field still hits the fixed-size
/// [`serialize`](ToHex::serialize) fast path through the inner `[u8; N]`
/// impl.
impl<U: ToHex + ?Sized> ToHex for &U {
    #[inline]
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        <U as ToHex>::write_hex(*self, w, upper)
    }
    #[inline]
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        <U as ToHex>::encode_hex(*self)
    }
    #[inline]
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
        <U as ToHex>::encode_hex_upper(*self)
    }

    #[cfg(feature = "serde")]
    #[inline]
    fn serialize<S, const PREFIX: bool>(&self, serializer: S, upper: bool) -> Result<S::Ok, S::Error>
    where
        S: ::serde::Serializer,
    {
        <U as ToHex>::serialize::<S, PREFIX>(*self, serializer, upper)
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl ToHex for alloc::vec::Vec<u8> {
    #[inline]
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        <[u8] as ToHex>::write_hex(self, w, upper)
    }
    #[inline]
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        <[u8] as ToHex>::encode_hex(self)
    }
    #[inline]
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
        <[u8] as ToHex>::encode_hex_upper(self)
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl ToHex for alloc::boxed::Box<[u8]> {
    #[inline]
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        <[u8] as ToHex>::write_hex(self, w, upper)
    }
    #[inline]
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        <[u8] as ToHex>::encode_hex(self)
    }
    #[inline]
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
        <[u8] as ToHex>::encode_hex_upper(self)
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl ToHex for alloc::borrow::Cow<'_, [u8]> {
    #[inline]
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        <[u8] as ToHex>::write_hex(self, w, upper)
    }
    #[inline]
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        <[u8] as ToHex>::encode_hex(self)
    }
    #[inline]
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
        <[u8] as ToHex>::encode_hex_upper(self)
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl FromHex for alloc::vec::Vec<u8> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        from_hex_container(hex.as_ref())
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl<'a> FromHex for alloc::borrow::Cow<'a, [u8]> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        alloc::vec::Vec::<u8>::from_hex(hex).map(alloc::borrow::Cow::Owned)
    }
}

impl<const N: usize> FromHex for [u8; N] {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode::decode_array(hex.as_ref())
    }
}

#[cfg(feature = "heapless")]
#[cfg_attr(docsrs, doc(cfg(feature = "heapless")))]
impl<const N: usize> FromHex for heapless::Vec<u8, N> {
    type Error = Error;

    /// Decode hex into a `heapless::Vec<u8, N>`.
    ///
    /// Returns [`Error::InvalidLength`] if the decoded output would exceed
    /// capacity `N`, or if the input has odd length.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        from_hex_container(hex.as_ref())
    }
}

#[cfg(feature = "arrayvec")]
#[cfg_attr(docsrs, doc(cfg(feature = "arrayvec")))]
impl<const N: usize> FromHex for arrayvec::ArrayVec<u8, N> {
    type Error = Error;

    /// Decode hex into an `arrayvec::ArrayVec<u8, N>`.
    ///
    /// Returns [`Error::InvalidLength`] if the decoded output would exceed
    /// capacity `N`, or if the input has odd length.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        from_hex_container(hex.as_ref())
    }
}

#[cfg(feature = "alloc")]
#[cfg_attr(docsrs, doc(cfg(feature = "alloc")))]
impl HexTarget for alloc::string::String {
    /// `String` allocation is infallible (barring OOM which panics).
    type Error = core::convert::Infallible;
    fn encode_hex(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        // String::new() never fails, so unwrap is safe.
        Ok(to_hex_container(bytes.as_ref(), false).expect("Should never fail"))
    }
    fn encode_hex_upper(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        Ok(to_hex_container(bytes.as_ref(), true).expect("Should never fail"))
    }
}

#[cfg(feature = "heapless")]
#[cfg_attr(docsrs, doc(cfg(feature = "heapless")))]
impl<const CAP: usize> HexTarget for heapless::String<CAP> {
    type Error = crate::error::Error;
    fn encode_hex(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        to_hex_container(bytes.as_ref(), false)
    }
    fn encode_hex_upper(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        to_hex_container(bytes.as_ref(), true)
    }
}

#[cfg(feature = "arrayvec")]
#[cfg_attr(docsrs, doc(cfg(feature = "arrayvec")))]
impl<const CAP: usize> HexTarget for arrayvec::ArrayString<CAP> {
    type Error = crate::error::Error;

    fn encode_hex(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        to_hex_container(bytes.as_ref(), false)
    }

    fn encode_hex_upper(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        to_hex_container(bytes.as_ref(), true)
    }
}

impl<const N: usize, P: Prefix> HexTarget for HexStr<N, P> {
    type Error = crate::error::Error;

    fn encode_hex(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        to_hex_container(bytes.as_ref(), false)
    }

    fn encode_hex_upper(bytes: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        to_hex_container(bytes.as_ref(), true)
    }
}

#[inline]
fn to_hex_container<C: Container>(input: &[u8], upper: bool) -> Result<C, Error> {
    let hex_len = input.len() * 2;
    let mut out = C::new(hex_len)?;
    crate::backend::encode(input, &mut C::as_mut_slice(&mut out)[..hex_len], upper)?;
    // SAFETY: the first `hex_len` bytes of the spare capacity have been
    // initialized by `backend::encode` with valid hex ASCII characters.
    // Hex ASCII is a subset of UTF-8, satisfying `set_len`'s requirement
    // for `REQUIRES_UTF8` containers.
    Ok(unsafe { C::set_len(out, hex_len) })
}

#[cfg(any(feature = "alloc", feature = "heapless", feature = "arrayvec"))]
#[inline]
fn from_hex_container<C: Container>(hex: &[u8]) -> Result<C, Error> {
    const {
        assert!(
            !C::REQUIRES_UTF8,
            "from_hex_container writes raw decoded bytes, not valid UTF-8; use only with byte containers"
        )
    }
    let out_len = hex.len() / 2;
    let mut out = C::new(out_len)?;
    crate::backend::decode(hex, &mut C::as_mut_slice(&mut out)[..out_len])?;
    // SAFETY: the first `out_len` bytes of the spare capacity have been
    // initialized by `backend::decode`. The const assertion above guarantees
    // `C::REQUIRES_UTF8` is false (i.e. only byte containers like `Vec<u8>`,
    // `heapless::Vec`, `arrayvec::ArrayVec`), so raw bytes are acceptable.
    Ok(unsafe { C::set_len(out, out_len) })
}

/// Internal trait abstracting over growable byte/string containers.
///
/// Allows `to_hex_container` and `from_hex_container` to work generically
/// across `Vec<u8>`, `String`, `heapless::Vec`, `heapless::String`,
/// `arrayvec::ArrayVec`, and `arrayvec::ArrayString`.
///
/// # Safety
///
/// Implementors must ensure:
/// - `Handle` returned by `new(n)` has `len() == 0` so the spare capacity
///   returned by `as_mut_slice` does not alias any already-initialized
///   bytes. Current callers (`to_hex_container` / `from_hex_container`)
///   always construct a fresh handle, so this invariant matches their
///   usage; implementors must not rely on pre-existing content.
/// - `as_mut_slice()` returns a slice covering the full spare capacity.
/// - After `set_len(n)`, the first `n` bytes are treated as initialized.
///   For string types, those bytes must be valid UTF-8.
/// - `REQUIRES_UTF8` is `true` for types where `set_len` requires the
///   written bytes to be valid UTF-8 (e.g. `String`, `ArrayString`),
///   and `false` for types that accept arbitrary bytes (e.g. `Vec<u8>`).
///   This is used by `from_hex_container` to reject string-typed containers
///   at compile time, since decoded hex output is raw bytes, not UTF-8.
unsafe trait Container: Sized {
    /// `true` if `set_len` requires the written bytes to be valid UTF-8.
    #[allow(dead_code)] // Read by `from_hex_container`, which is feature-gated.
    const REQUIRES_UTF8: bool;
    type Handle;
    /// Allocate or create a container with at least `min_capacity` bytes.
    /// Returns `Err(Error::InvalidLength)` if the capacity is insufficient
    /// (fixed-capacity types).
    fn new(min_capacity: usize) -> Result<Self::Handle, Error>;

    /// Return the spare (uninitialized) capacity as a mutable slice.
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>];

    /// Mark the first `new_len` bytes as initialized.
    ///
    /// # Safety
    ///
    /// The first `new_len` bytes of the spare capacity must have been
    /// written. For string types, those bytes must be valid UTF-8.
    unsafe fn set_len(handle: Self::Handle, new_len: usize) -> Self;
}

#[cfg(feature = "alloc")]
unsafe impl Container for alloc::vec::Vec<u8> {
    const REQUIRES_UTF8: bool = false;
    type Handle = Self;

    #[inline]
    fn new(min_capacity: usize) -> Result<Self, Error> {
        Ok(Self::with_capacity(min_capacity))
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        handle.spare_capacity_mut()
    }
    #[inline]
    unsafe fn set_len(mut handle: Self::Handle, new_len: usize) -> Self {
        // SAFETY: caller guarantees the first `new_len` bytes of `handle` are initialized and valid.
        unsafe { handle.set_len(new_len) };
        handle
    }
}

#[cfg(feature = "alloc")]
unsafe impl Container for alloc::string::String {
    const REQUIRES_UTF8: bool = true;
    type Handle = Self;
    #[inline]
    fn new(min_capacity: usize) -> Result<Self, Error> {
        Ok(Self::with_capacity(min_capacity))
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `as_mut_vec()` is unsafe because it allows writing non-UTF-8
        // bytes. Here we only access the spare capacity (beyond the string's
        // current length); the caller (`to_hex_container`) will write valid
        // hex ASCII before calling `set_len`.
        unsafe { handle.as_mut_vec().spare_capacity_mut() }
    }
    #[inline]
    unsafe fn set_len(mut handle: Self::Handle, new_len: usize) -> Self {
        // SAFETY: caller guarantees the first `new_len` bytes of `handle` are initialized and valid UTF-8.
        unsafe { handle.as_mut_vec().set_len(new_len) };
        handle
    }
}

#[cfg(feature = "arrayvec")]
unsafe impl<const N: usize> Container for arrayvec::ArrayVec<u8, N> {
    const REQUIRES_UTF8: bool = false;
    type Handle = Self;
    #[inline]
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        let capacity = handle.capacity();
        // SAFETY: `ArrayVec<u8, N>` owns a backing `[u8; N]`; `as_mut_ptr()`
        // points to its start and `capacity()` returns `N`. No other pointer
        // aliases this region for the lifetime of `handle`.
        unsafe { maybe_uninit::spare_capacity_raw(handle.as_mut_ptr(), capacity) }
    }
    #[inline]
    unsafe fn set_len(mut handle: Self::Handle, new_len: usize) -> Self {
        // SAFETY: caller guarantees the first `new_len` bytes of `handle` are initialized and valid.
        unsafe { handle.set_len(new_len) };
        handle
    }
}

#[cfg(feature = "arrayvec")]
unsafe impl<const N: usize> Container for arrayvec::ArrayString<N> {
    const REQUIRES_UTF8: bool = true;
    type Handle = Self;
    #[inline]
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        let capacity = handle.capacity();
        // SAFETY: `ArrayString<N>` owns a backing `[u8; N]`; `as_mut_ptr()`
        // points to its start and `capacity()` returns `N`. The caller
        // (`to_hex_container`) writes valid hex ASCII before `set_len`,
        // restoring the UTF-8 invariant.
        unsafe { maybe_uninit::spare_capacity_raw(handle.as_mut_ptr(), capacity) }
    }
    #[inline]
    unsafe fn set_len(mut handle: Self::Handle, new_len: usize) -> Self {
        // SAFETY: caller guarantees the first `new_len` bytes of `handle` are initialized and valid.
        unsafe { handle.set_len(new_len) };
        handle
    }
}

#[cfg(feature = "heapless")]
unsafe impl<const N: usize> Container for heapless::Vec<u8, N> {
    const REQUIRES_UTF8: bool = false;
    type Handle = Self;
    #[inline]
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        let capacity = handle.capacity();
        // SAFETY: heapless 0.9 — `as_mut_ptr()` points to the backing `[u8; N]`;
        // `capacity()` returns `N`. No other pointer aliases this region.
        unsafe { maybe_uninit::spare_capacity_raw(handle.as_mut_ptr(), capacity) }
    }

    unsafe fn set_len(mut handle: Self::Handle, new_len: usize) -> Self {
        // SAFETY: caller guarantees the first `new_len` bytes of `handle` are initialized.
        unsafe { handle.set_len(new_len) };
        handle
    }
}

#[cfg(feature = "heapless")]
unsafe impl<const N: usize> Container for heapless::String<N> {
    const REQUIRES_UTF8: bool = true;
    type Handle = Self;
    #[inline]
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `as_mut_vec()` is unsafe because it allows writing non-UTF-8
        // bytes. The caller (`to_hex_container`) writes valid hex ASCII before
        // `set_len`, restoring the UTF-8 invariant.
        let vec = unsafe { handle.as_mut_vec() };
        let capacity = vec.capacity();
        // SAFETY: `as_mut_ptr()` points to the backing `[u8; N]`;
        // `capacity()` returns `N`. No other pointer aliases this region.
        unsafe { maybe_uninit::spare_capacity_raw(vec.as_mut_ptr(), capacity) }
    }
    #[inline]
    unsafe fn set_len(mut handle: Self::Handle, new_len: usize) -> Self {
        // SAFETY: caller guarantees first new_len bytes are valid UTF-8.
        unsafe { handle.as_mut_vec().set_len(new_len) };
        handle
    }
}

unsafe impl<const N: usize, P: Prefix> Container for HexStr<N, P> {
    const REQUIRES_UTF8: bool = true;
    type Handle = MaybeUninit<crate::hex_str::RawHexStr<N, P>>;
    #[inline]
    fn new(min_capacity: usize) -> Result<Self::Handle, Error> {
        if min_capacity != N * 2 {
            return Err(Error::InvalidLength {
                expected: N * 2,
                got: min_capacity,
            });
        }
        let mut out = MaybeUninit::<crate::hex_str::RawHexStr<N, P>>::uninit();
        let bytes = maybe_uninit::as_bytes_mut(&mut out);
        let prefix = P::VALUE;
        let prefix_bytes = prefix.bytes();
        bytes[..prefix_bytes.len()].copy_from_slice(prefix_bytes);
        Ok(out)
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        let bytes = maybe_uninit::as_bytes_mut(handle);
        &mut bytes[P::LEN..]
    }
    #[inline]
    unsafe fn set_len(handle: Self::Handle, new_len: usize) -> Self {
        debug_assert_eq!(
            new_len,
            N * 2,
            "set_len receives hex content length, not total length with prefix"
        );
        // SAFETY: prefix was initialized in new(), hex content (new_len bytes)
        // was initialized by the caller — the full RawHexStr is now init.
        Self {
            inner: unsafe { handle.assume_init() },
        }
    }
}
