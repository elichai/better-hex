//! Convenience traits for hex encoding and decoding.
//!
//! [`ToHex`] provides hex encoding via [`write_hex`](ToHex::write_hex) (any
//! [`fmt::Write`] sink) and [`encode_hex`](ToHex::encode_hex) (any
//! [`HexTarget`](crate::HexTarget), zero-copy).
//!
//! [`FromHex`] provides [`from_hex`](FromHex::from_hex) for constructing types
//! from hex strings — including `Vec<u8>`, `[u8; N]`, `heapless::Vec`, and
//! `arrayvec::ArrayVec`.

use crate::{display::write_hex_to, error::Error};
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
        Ok(to_hex_container::<false, Self>(bytes).unwrap())
    }
    fn encode_hex_upper(bytes: &[u8]) -> Result<Self, Self::Error> {
        Ok(to_hex_container::<true, Self>(bytes).unwrap())
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

fn to_hex_container<const UPPER: bool, C: Container>(input: &[u8]) -> Result<C, Error> {
    let hex_len = input.len() * 2;
    let mut out = C::new(hex_len)?;
    crate::backend::encode::<UPPER>(input, &mut out.as_mut_slice()[..hex_len]);
    // SAFETY: backend wrote hex_len bytes of valid hex ASCII (valid UTF-8 for string types).
    unsafe { out.set_len(hex_len) };
    Ok(out)
}

fn from_hex_container<C: Container>(hex: &[u8]) -> Result<C, Error> {
    if !hex.len().is_multiple_of(2) {
        return Err(Error::InvalidLength {
            expected: hex.len() + 1,
            got: hex.len(),
        });
    }
    let out_len = hex.len() / 2;
    let mut out = C::new(out_len)?;
    crate::backend::decode(hex, &mut out.as_mut_slice()[..out_len])?;
    // SAFETY: backend wrote out_len bytes of valid decoded hex.
    // For string types this is raw bytes, not UTF-8, so only byte
    // containers (Vec, heapless::Vec, arrayvec::ArrayVec) use this path.
    unsafe { out.set_len(out_len) };
    Ok(out)
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
trait Container: Sized {
    /// Allocate or create a container with at least `min_capacity` bytes.
    /// Returns `Err(Error::InvalidLength)` if the capacity is insufficient
    /// (fixed-capacity types).
    fn new(min_capacity: usize) -> Result<Self, Error>;

    /// Return the spare (uninitialized) capacity as a mutable slice.
    fn as_mut_slice(&mut self) -> &mut [MaybeUninit<u8>];

    /// Mark the first `new_len` bytes as initialized.
    ///
    /// # Safety
    ///
    /// The first `new_len` bytes of the spare capacity must have been
    /// written. For string types, those bytes must be valid UTF-8.
    unsafe fn set_len(&mut self, new_len: usize);
}

#[cfg(feature = "alloc")]
impl Container for alloc::vec::Vec<u8> {
    fn new(min_capacity: usize) -> Result<Self, Error> {
        Ok(Self::with_capacity(min_capacity))
    }

    fn as_mut_slice(&mut self) -> &mut [MaybeUninit<u8>] {
        self.spare_capacity_mut()
    }

    unsafe fn set_len(&mut self, new_len: usize) {
        // SAFETY: caller guarantees the first `new_len` bytes of `self` are initialized and valid.
        unsafe { self.set_len(new_len) };
    }
}

#[cfg(feature = "alloc")]
impl Container for alloc::string::String {
    
    fn new(min_capacity: usize) -> Result<Self, Error> {
        Ok(Self::with_capacity(min_capacity))
    }
    fn as_mut_slice(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `String`'s spare capacity is valid for `MaybeUninit<u8>` since `String` is guaranteed to have a contiguous buffer of bytes.
        unsafe { self.as_mut_vec().spare_capacity_mut() }
    }

    unsafe fn set_len(&mut self, new_len: usize) {
        // SAFETY: caller guarantees the first `new_len` bytes of `self` are initialized and valid UTF-8.
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}

#[cfg(feature = "arrayvec")]
impl<const N: usize> Container for arrayvec::ArrayVec<u8, N> {
    
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }

    fn as_mut_slice(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `ArrayVec` guarantees that its uninitialized capacity is valid for `MaybeUninit<u8>`.
        let capacity = self.capacity();
        let ptr = self.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, capacity) }
    }

    unsafe fn set_len(&mut self, new_len: usize) {
        // SAFETY: caller guarantees the first `new_len` bytes of `self` are initialized and valid.
        unsafe { self.set_len(new_len) };
    }
}

#[cfg(feature = "arrayvec")]
impl<const N: usize> Container for arrayvec::ArrayString<N> {
    
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }

    fn as_mut_slice(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `ArrayString` guarantees that its uninitialized capacity is valid for `MaybeUninit<u8>`.
        let capacity = self.capacity();
        let ptr = self.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, capacity) }
    }

    unsafe fn set_len(&mut self, new_len: usize) {
        // SAFETY: caller guarantees the first `new_len` bytes of `self` are initialized and valid.
        unsafe { self.set_len(new_len) };
    }
}

#[cfg(feature = "heapless")]
impl<const N: usize> Container for heapless::Vec<u8, N> {
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }

    fn as_mut_slice(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: heapless 0.9 — as_mut_ptr() points to the backing [u8; N].
        // We expose the full buffer as MaybeUninit.
        let ptr = self.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, N) }
    }

    unsafe fn set_len(&mut self, new_len: usize) {
        unsafe { self.set_len(new_len) };
    }
}

#[cfg(feature = "heapless")]
impl<const N: usize> Container for heapless::String<N> {
    fn new(min_capacity: usize) -> Result<Self, Error> {
        if min_capacity > N {
            return Err(Error::InvalidLength {
                expected: N * 2,
                got: min_capacity,
            });
        }
        Ok(Self::new())
    }

    fn as_mut_slice(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: heapless 0.9 — as_mut_vec() gives mutable access to the
        // inner Vec. We expose the full backing buffer as MaybeUninit.
        let vec = unsafe { self.as_mut_vec() };
        let capacity = vec.capacity();
        let ptr = vec.as_mut_ptr().cast::<MaybeUninit<u8>>();
        unsafe { core::slice::from_raw_parts_mut(ptr, capacity) }
    }

    unsafe fn set_len(&mut self, new_len: usize) {
        // SAFETY: caller guarantees first new_len bytes are valid UTF-8.
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}
