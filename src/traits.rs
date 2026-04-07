//! Convenience traits for hex encoding and decoding.
//!
//! [`ToHex`] provides hex encoding via [`write_hex`](ToHex::write_hex) (any
//! [`fmt::Write`] sink) and [`encode_hex`](ToHex::encode_hex) (any
//! [`HexTarget`](crate::HexTarget), zero-copy).
//!
//! [`FromHex`] provides [`from_hex`](FromHex::from_hex) for constructing types
//! from hex strings — including `Vec<u8>`, `[u8; N]`, `heapless::Vec`, and
//! `arrayvec::ArrayVec`.

use crate::{HexStr, Prefix, display::write_hex_to, error::Error, maybe_uninit};
use core::fmt;
use core::mem::MaybeUninit;

/// Trait for types that can be hex-encoded.
///
/// Automatically implemented for all types that implement `AsRef<[u8]>`.
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
pub trait ToHex {
    /// Write hex encoding into any [`fmt::Write`] sink.
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result;

    /// Encode to lowercase hex into any [`HexTarget`] (zero-copy).
    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error>;

    /// Encode to uppercase hex into any [`HexTarget`] (zero-copy).
    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error>;
}

/// Trait for types that can be constructed from hex-encoded data.
///
/// # Examples
///
/// ```rust
/// use better_hex::FromHex;
///
/// let bytes = Vec::<u8>::from_hex("deadbeef").unwrap();
/// assert_eq!(bytes, [0xde, 0xad, 0xbe, 0xef]);
///
/// let arr = <[u8; 4]>::from_hex("deadbeef").unwrap();
/// assert_eq!(arr, [0xde, 0xad, 0xbe, 0xef]);
/// ```
pub trait FromHex: Sized {
    /// The error type returned on decode failure.
    type Error;

    /// Decode a hex string into `Self`.
    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error>;
}

/// A type that can be constructed by hex-encoding raw bytes into it.
///
/// Each implementor manages its own internal buffer. The SIMD encode path
/// writes directly into the target's memory — no intermediate copies.
///
/// # Examples
///
/// ```rust
/// use better_hex::HexTarget;
///
/// let s = String::encode_hex(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
///
/// let s = String::encode_hex_upper(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub trait HexTarget: Sized {
    /// Error returned when the target cannot hold the encoded output
    /// (e.g., fixed-capacity buffer too small).
    type Error;

    /// Encode `bytes` as lowercase hex into a new instance of `Self`.
    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error>;

    /// Encode `bytes` as uppercase hex into a new instance of `Self`.
    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error>;
}

impl<S: AsRef<[u8]>> ToHex for S {
    fn write_hex<W: fmt::Write>(&self, w: &mut W, upper: bool) -> fmt::Result {
        if upper {
            write_hex_to::<true, 128, W>(self.as_ref(), w)
        } else {
            write_hex_to::<false, 128, W>(self.as_ref(), w)
        }
    }

    fn encode_hex<T: HexTarget>(&self) -> Result<T, T::Error> {
        T::encode_hex(self.as_ref())
    }

    fn encode_hex_upper<T: HexTarget>(&self) -> Result<T, T::Error> {
        T::encode_hex_upper(self.as_ref())
    }
}

#[cfg(feature = "alloc")]
impl FromHex for alloc::vec::Vec<u8> {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        from_hex_container(hex.as_ref())
    }
}

impl<const N: usize> FromHex for [u8; N] {
    type Error = Error;

    fn from_hex(hex: impl AsRef<[u8]>) -> Result<Self, Self::Error> {
        crate::decode::decode_array(hex.as_ref())
    }
}

#[cfg(feature = "heapless")]
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
impl HexTarget for alloc::string::String {
    /// `String` allocation is infallible (barring OOM which panics).
    type Error = core::convert::Infallible;
    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error> {
        // String::new() never fails, so unwrap is safe.
        Ok(to_hex_container::<false, Self>(bytes).expect("Should never fail"))
    }
    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        Ok(to_hex_container::<true, Self>(bytes).expect("Should never fail"))
    }
}

#[cfg(feature = "heapless")]
impl<const CAP: usize> HexTarget for heapless::String<CAP> {
    type Error = crate::error::Error;
    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error> {
        to_hex_container::<false, Self>(bytes)
    }
    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        to_hex_container::<true, Self>(bytes)
    }
}

#[cfg(feature = "arrayvec")]
impl<const CAP: usize> HexTarget for arrayvec::ArrayString<CAP> {
    type Error = crate::error::Error;

    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error> {
        to_hex_container::<false, Self>(bytes)
    }

    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        to_hex_container::<true, Self>(bytes)
    }
}

impl<const N: usize, P: Prefix> HexTarget for HexStr<N, P> {
    type Error = crate::error::Error;

    fn encode_hex(bytes: &[u8]) -> Result<Self, Self::Error> {
        to_hex_container::<false, Self>(bytes)
    }

    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        to_hex_container::<true, Self>(bytes)
    }
}

#[inline]
fn to_hex_container<const UPPER: bool, C: Container>(input: &[u8]) -> Result<C, Error> {
    let hex_len = input.len() * 2;
    let mut out = C::new(hex_len)?;
    crate::backend::encode::<UPPER>(input, &mut C::as_mut_slice(&mut out)[..hex_len])?;
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
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `ArrayVec<u8, N>` has a backing array of N bytes.
        // `as_mut_ptr()` points to its start, and `capacity()` returns N.
        // `MaybeUninit<u8>` has the same layout as `u8`, so the cast is valid.
        let capacity = handle.capacity();
        let ptr = handle.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, capacity) }
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
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `ArrayString<N>` has a backing byte array of N bytes.
        // `as_mut_ptr()` points to its start, and `capacity()` returns N.
        // `MaybeUninit<u8>` has the same layout as `u8`, so the cast is valid.
        // `as_mut_ptr()` on ArrayString is unsafe because it allows writing
        // non-UTF-8; the caller (`to_hex_container`) will write valid hex ASCII
        // before calling `set_len`.
        let capacity = handle.capacity();
        let ptr = handle.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, capacity) }
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
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        // SAFETY: heapless 0.9 — as_mut_ptr() points to the backing [u8; N].
        // We expose the full buffer as MaybeUninit.
        let capacity = handle.capacity();
        let ptr = handle.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, capacity) }
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
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }
    #[inline]
    fn as_mut_slice(handle: &mut Self::Handle) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `as_mut_vec()` is unsafe because it allows writing non-UTF-8
        // bytes. Here we only access the backing buffer for the caller
        // (`to_hex_container`) to write valid hex ASCII before `set_len`.
        let vec = unsafe { handle.as_mut_vec() };
        // SAFETY: `as_mut_ptr()` points to the start of the heapless Vec's
        // backing [u8; N]. `MaybeUninit<u8>` has the same layout as `u8`.
        let capacity = vec.capacity();
        let ptr = vec.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, capacity) }
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
