//! Helpers for working with `MaybeUninit` buffers.
//!
//! Consolidates the unsafe operations on uninitialized memory so callers
//! don't need to scatter `unsafe` blocks throughout the codebase.

use core::{mem::MaybeUninit, ptr, slice, str};

/// View a `MaybeUninit<T>` as a mutable slice of `MaybeUninit<u8>` bytes.
///
/// Useful for field-by-field initialization of a `MaybeUninit<Struct>`.
pub(crate) const fn as_bytes_mut<T>(mu: &mut MaybeUninit<T>) -> &mut [MaybeUninit<u8>] {
    // SAFETY: `as_mut_ptr()` returns a pointer valid for `size_of::<T>()` bytes.
    // `MaybeUninit<u8>` has alignment 1 (≤ any T's alignment) and the same
    // layout as `u8`, so the cast is valid. The resulting slice does not
    // require the bytes to be initialized.
    unsafe { slice::from_raw_parts_mut(mu.as_mut_ptr().cast::<MaybeUninit<u8>>(), size_of::<T>()) }
}

/// Create an uninitialized `[MaybeUninit<u8>; N]` array.
pub(crate) const fn uninit_array<const N: usize>() -> [MaybeUninit<u8>; N] {
    // SAFETY: `MaybeUninit::<[MaybeUninit<u8>; N]>::uninit().assume_init()` is
    // sound because `[MaybeUninit<u8>; N]` is valid for any bit pattern
    // (including uninitialized memory).
    const { unsafe { MaybeUninit::uninit().assume_init() } }
}

/// Transpose `[MaybeUninit<u8>; N]` → `MaybeUninit<[u8; N]>`.
///
/// Same layout, but lets us call `.assume_init()` to get `[u8; N]`.
pub(crate) const fn transpose<const N: usize>(mu: [MaybeUninit<u8>; N]) -> MaybeUninit<[u8; N]> {
    // SAFETY: `[MaybeUninit<u8>; N]` and `MaybeUninit<[u8; N]>` have identical
    // size and alignment (`MaybeUninit<u8>` is layout-identical to `u8`).
    // `read()` performs a bitwise copy; neither type has drop glue.
    unsafe { ptr::from_ref(&mu).cast::<MaybeUninit<[u8; N]>>().read() }
}

/// Reinterpret `&mut [u8]` as `&mut [MaybeUninit<u8>]`.
///
/// Safe because `MaybeUninit<u8>` has the same layout as `u8`, and going
/// from initialized to maybe-uninit is always valid (the backend will
/// overwrite every element anyway).
pub(crate) fn slice_as_uninit_mut(s: &mut [u8]) -> &mut [MaybeUninit<u8>] {
    // SAFETY: `MaybeUninit<u8>` has the same layout as `u8`. The pointer and
    // length come from a valid `&mut [u8]`. Converting initialized `u8` to
    // `MaybeUninit<u8>` is always valid (widening the validity invariant).
    unsafe { slice::from_raw_parts_mut(s.as_mut_ptr().cast::<MaybeUninit<u8>>(), s.len()) }
}

/// Reinterpret `&[MaybeUninit<u8>]` as `&[u8]`, assuming all elements are initialized.
///
/// # Safety
///
/// All elements must have been initialized.
pub(crate) unsafe fn assume_init_slice(s: &[MaybeUninit<u8>]) -> &[u8] {
    // SAFETY: caller guarantees all elements are initialized. `MaybeUninit<u8>`
    // has the same layout as `u8`, so the pointer cast is valid.
    unsafe { slice::from_raw_parts(s.as_ptr().cast::<u8>(), s.len()) }
}

/// Reinterpret `&[MaybeUninit<u8>]` as `&str`, assuming all elements are
/// initialized valid UTF-8 (e.g., hex ASCII).
///
/// Includes a `debug_assert!` that verifies UTF-8 validity.
///
/// # Safety
///
/// All elements must be initialized and contain valid UTF-8 bytes.
pub(crate) unsafe fn assume_init_str(s: &[MaybeUninit<u8>]) -> &str {
    // SAFETY: caller guarantees all elements are initialized.
    let bytes = unsafe { assume_init_slice(s) };
    debug_assert!(str::from_utf8(bytes).is_ok(), "assume_init_str: invalid UTF-8");
    // SAFETY: caller guarantees the initialized bytes are valid UTF-8.
    unsafe { str::from_utf8_unchecked(bytes) }
}

/// Reinterpret `&mut [u8]` that was just written by the hex encoder as `&mut str`.
///
/// Includes a `debug_assert!` that verifies all bytes are ASCII.
///
/// # Safety
///
/// The slice must contain only valid hex ASCII bytes.
pub(crate) unsafe fn bytes_to_hex_str_mut(s: &mut [u8]) -> &mut str {
    debug_assert!(s.iter().all(|b| b.is_ascii()), "bytes_to_hex_str_mut: non-ASCII");
    // SAFETY: caller guarantees all bytes are valid hex ASCII (`[0-9a-fA-F]`),
    // which is a subset of valid UTF-8.
    unsafe { str::from_utf8_unchecked_mut(s) }
}
