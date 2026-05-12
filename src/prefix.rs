use bytemuck::{NoUninit, Zeroable};
use core::{hint::black_box, mem::MaybeUninit};

mod sealed {
    pub trait Sealed {}
}

/// A zero-sized prefix marker indicating no `"0x"` prefix.
///
/// This is the default second generic parameter of [`HexStr<N>`](crate::HexStr),
/// so callers rarely name `NoPrefix` directly — `HexStr<N>` already means
/// `HexStr<N, NoPrefix>`. The type exists primarily so the prefix can be
/// expressed in the type system at zero runtime cost (it occupies no bytes).
#[derive(Debug, Copy, Clone, PartialEq, Eq, NoUninit, Zeroable)]
#[repr(transparent)]
pub struct NoPrefix;

/// A prefix marker that stores the two-byte `"0x"` prefix inline.
///
/// Callers typically use the [`PrefixedHexStr<N>`](crate::PrefixedHexStr)
/// type alias rather than spelling `HexStr<N, WithPrefix>` directly. The
/// stored prefix bytes are part of the contiguous string buffer, so
/// [`as_str`](crate::HexStr::as_str) returns the `"0x…"` form with no
/// extra concatenation.
#[derive(Debug, Copy, Clone, PartialEq, Eq, NoUninit, Zeroable)]
#[repr(transparent)]
pub struct WithPrefix(pub(crate) [u8; 2]);

impl sealed::Sealed for NoPrefix {}
impl sealed::Sealed for WithPrefix {}

/// Sealed trait for hex string prefix types.
///
/// Only `NoPrefix` and `WithPrefix` implement this.
pub trait Prefix: sealed::Sealed + NoUninit + Copy + 'static {
    /// The canonical prefix value. `NoPrefix` is a ZST; `WithPrefix` is `"0x"`.
    const VALUE: Self;

    /// Length of the prefix in bytes (0 for `NoPrefix`, 2 for `WithPrefix`).
    const LEN: usize = core::mem::size_of::<Self>();

    /// View the prefix as a `MaybeUninit<u8>` slice for initialization of
    /// uninitialized buffers (e.g., writing prefix bytes into a `MaybeUninit`
    /// output before the hex content).
    #[doc(hidden)]
    fn bytes(&self) -> &[MaybeUninit<u8>] {
        let bytes: &[u8] = bytemuck::bytes_of(self);
        debug_assert_eq!(bytes.len(), Self::LEN);
        crate::maybe_uninit::slice_as_uninit(bytes)
    }

    /// Constant-time prefix strip.
    ///
    /// Returns `Some(rest)` if `input` starts with this prefix, `None` otherwise.
    /// Uses XOR accumulation so the specific bytes of an incorrect prefix are
    /// not leaked via timing. Whether the prefix matches or not IS observable
    /// (the prefix is a public format marker, not secret data).
    ///
    /// For `NoPrefix` this always returns `Some(input)`.
    fn strip_prefix(input: &[u8]) -> Option<&[u8]>;
}

impl Prefix for NoPrefix {
    const VALUE: Self = NoPrefix;

    #[inline]
    fn strip_prefix(input: &[u8]) -> Option<&[u8]> {
        Some(input)
    }
}

impl Prefix for WithPrefix {
    const VALUE: Self = WithPrefix([b'0', b'x']);

    #[inline]
    fn strip_prefix(input: &[u8]) -> Option<&[u8]> {
        let (&[first, second], rest) = input.split_first_chunk()?;
        let err = (first ^ b'0') | (second ^ b'x');
        if black_box(err) != 0 { None } else { Some(rest) }
    }
}
