//! Extensible output trait for hex encoding.
//!
//! [`HexTarget`] provides direct buffer access so the SIMD encode path can
//! write hex bytes straight into the target's memory — no intermediate copy.
//!
//! # Implementing `HexTarget`
//!
//! Downstream crates can implement this trait for custom string types. The
//! invariant is simple: after `try_with_hex_len(n)` succeeds, `spare_bytes_mut()`
//! must return a slice of at least `n` bytes, and `assume_init(n)` must correctly
//! commit those bytes as valid string content.

use crate::backend;
use core::mem::MaybeUninit;

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
/// - `assume_init(len)` correctly advances the internal length by `len`
///   and the first `len` bytes of the spare region form valid UTF-8
///   (the caller guarantees they are hex ASCII).
pub unsafe trait HexTarget: Sized {
    /// Try to create a target pre-sized for `hex_len` hex characters.
    ///
    /// Returns `None` if the target cannot accommodate `hex_len` bytes
    /// (e.g., a fixed-capacity buffer that is too small).
    fn try_with_hex_len(hex_len: usize) -> Option<Self>;

    /// Return the spare (uninitialized) buffer to write hex ASCII into.
    ///
    /// Must be at least `hex_len` bytes long after a successful
    /// `try_with_hex_len(hex_len)` call.
    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>];

    /// Mark the first `len` bytes of the spare region as initialized valid UTF-8.
    ///
    /// # Safety
    ///
    /// The caller must have written `len` bytes of valid hex ASCII (which is
    /// always valid UTF-8) into the beginning of the slice returned by
    /// `spare_bytes_mut()`.
    unsafe fn assume_init(&mut self, len: usize);
}

/// Encode bytes to lowercase hex into any [`HexTarget`].
///
/// Returns `None` if the target cannot hold `input.len() * 2` hex characters
/// (e.g., a fixed-capacity buffer that is too small).
///
/// The SIMD encode path writes directly into the target's internal buffer.
/// No intermediate copies.
///
/// # Examples
///
/// ```rust
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
/// ```rust
/// let s: String = better_hex::encode_upper_to(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub fn encode_upper_to<T: HexTarget>(input: &[u8]) -> Option<T> {
    encode_to_inner::<T, true>(input)
}

/// Shared implementation for [`encode_to`] and [`encode_upper_to`].
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
    // into the spare buffer; hex ASCII is valid UTF-8.
    unsafe { target.assume_init(hex_len) };
    Some(target)
}

// ── `String` impl ───────────────────────────────────────────────────────────

#[cfg(feature = "alloc")]
// SAFETY: `String::with_capacity(hex_len)` allocates at least `hex_len` bytes
// of spare capacity. `spare_capacity_mut()` exposes that buffer directly.
// `set_len` is correct because the caller writes valid hex ASCII (valid UTF-8).
unsafe impl HexTarget for alloc::string::String {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        Some(alloc::string::String::with_capacity(hex_len))
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: obtaining spare capacity from the inner Vec<u8>.
        unsafe { self.as_mut_vec() }.spare_capacity_mut()
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees the first `len` spare bytes are valid hex
        // ASCII (valid UTF-8). `new_len <= capacity` because `try_with_hex_len`
        // allocated enough.
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}

// ── `heapless::String<CAP>` impl ────────────────────────────────────────────

#[cfg(feature = "heapless")]
// SAFETY: `heapless::String<CAP>` wraps a `heapless::Vec<u8, CAP>` which
// stores its elements in a `[MaybeUninit<u8>; CAP]` array.
// `as_mut_vec()` exposes the inner Vec. We compute the spare region from
// the raw pointer at `[len..CAP)` — heapless does not provide
// `spare_capacity_mut()`.
// `set_len()` is sound because the caller writes valid hex ASCII.
// Verified against heapless 0.8.0.
unsafe impl<const CAP: usize> HexTarget for heapless::String<CAP> {
    fn try_with_hex_len(hex_len: usize) -> Option<Self> {
        if hex_len > CAP {
            None
        } else {
            Some(heapless::String::new())
        }
    }

    fn spare_bytes_mut(&mut self) -> &mut [MaybeUninit<u8>] {
        // SAFETY: `as_mut_vec()` is an `unsafe fn` in heapless 0.8 that gives
        // mutable access to the underlying `Vec<u8, CAP>`. The pointer
        // arithmetic accesses indices `[len..CAP)` which are spare (not yet
        // initialized). Casting `*mut u8` to `*mut MaybeUninit<u8>` is valid
        // because `MaybeUninit<u8>` has the same layout as `u8`.
        let vec = unsafe { self.as_mut_vec() };
        let len = vec.len();
        let spare = CAP - len;
        unsafe {
            let ptr = vec.as_mut_ptr().add(len).cast::<MaybeUninit<u8>>();
            core::slice::from_raw_parts_mut(ptr, spare)
        }
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees the first `len` spare bytes are valid hex
        // ASCII (valid UTF-8). `new_len <= CAP` because `try_with_hex_len` checked.
        unsafe { self.as_mut_vec().set_len(new_len) };
    }
}

// ── `arrayvec::ArrayString<CAP>` impl ───────────────────────────────────────

#[cfg(feature = "arrayvec")]
// SAFETY: `arrayvec::ArrayString<CAP>` holds a `[MaybeUninit<u8>; CAP]` plus
// a length field. `as_mut_ptr()` returns a `*mut u8` to the start of the full
// buffer. We compute the spare region as `[len..CAP)`. `set_len()` is `unsafe`
// on `ArrayString` and sets the internal length directly.
// Verified against arrayvec 0.7.6.
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
        let spare = CAP - len;
        // SAFETY: `as_mut_ptr()` (safe method on `ArrayString`) returns a
        // `*mut u8` to the start of the backing array. Bytes at `[len..CAP)`
        // are spare. Casting to `*mut MaybeUninit<u8>` is valid — same layout.
        unsafe {
            let ptr = self.as_mut_ptr().add(len).cast::<MaybeUninit<u8>>();
            core::slice::from_raw_parts_mut(ptr, spare)
        }
    }

    unsafe fn assume_init(&mut self, len: usize) {
        let new_len = self.len() + len;
        // SAFETY: caller guarantees the first `len` spare bytes are valid hex
        // ASCII (valid UTF-8). `new_len <= CAP` because `try_with_hex_len` checked.
        unsafe { self.set_len(new_len) };
    }
}
