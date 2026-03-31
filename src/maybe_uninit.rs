//! Helpers for working with `MaybeUninit` buffers.
//!
//! These utilities allow the backend to write into uninitialized memory
//! without unnecessary zeroing, then safely "assume init" after the write.

use core::{mem::MaybeUninit, ptr, slice};

/// View a `MaybeUninit<T>` as a mutable slice of `MaybeUninit<u8>` bytes.
///
/// This is useful for writing into a `MaybeUninit<SomeStruct>` field-by-field
/// through raw byte offsets, which is how [`HexStr::encode_with`](crate::hex_str::HexStr)
/// initializes its `RawHexStr` without zeroing first.
///
/// Note: even if `T` has been initialized, padding bytes remain uninitialized.
pub(crate) const fn as_bytes_mut<T>(mu: &mut MaybeUninit<T>) -> &mut [MaybeUninit<u8>] {
    // SAFETY: `MaybeUninit<u8>` is always valid (no invalid bit patterns),
    // and the returned slice covers exactly `size_of::<T>()` bytes.
    unsafe { slice::from_raw_parts_mut(mu.as_mut_ptr().cast::<MaybeUninit<u8>>(), size_of::<T>()) }
}

/// Create an uninitialized `[MaybeUninit<u8>; N]` array.
///
/// Equivalent to `[MaybeUninit::uninit(); N]` but works in const context
/// without requiring `Copy` bounds on the element type.
pub(crate) const fn array<const N: usize>() -> [MaybeUninit<u8>; N] {
    // SAFETY: an array of `MaybeUninit` values does not require initialization.
    const { unsafe { MaybeUninit::uninit().assume_init() } }
}

/// Transpose `[MaybeUninit<u8>; N]` into `MaybeUninit<[u8; N]>`.
///
/// These two types have identical layout (N contiguous `u8`-sized slots),
/// but `MaybeUninit<[u8; N]>` lets us call `.assume_init()` to get a
/// plain `[u8; N]` after we know all elements are initialized.
pub(crate) const fn transpose<const N: usize>(mu: [MaybeUninit<u8>; N]) -> MaybeUninit<[u8; N]> {
    // SAFETY: `[MaybeUninit<u8>; N]` and `MaybeUninit<[u8; N]>` have the
    // same size, alignment, and validity invariants.
    unsafe { ptr::from_ref(&mu).cast::<MaybeUninit<[u8; N]>>().read() }
}
