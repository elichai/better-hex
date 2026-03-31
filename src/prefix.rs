use bytemuck::{Pod, Zeroable};

mod sealed {
    pub trait Sealed {}
}

/// A zero-sized prefix marker (no "0x" prefix).
#[derive(Debug, Copy, Clone, PartialEq, Eq, Pod, Zeroable)]
#[repr(C)]
pub struct NoPrefix;

/// A prefix marker that stores the "0x" prefix.
#[derive(Debug, Copy, Clone, PartialEq, Eq, Pod, Zeroable)]
#[repr(transparent)]
pub struct WithPrefix(pub(crate) [u8; 2]);

impl sealed::Sealed for NoPrefix {}
impl sealed::Sealed for WithPrefix {}

/// Sealed trait for hex string prefix types.
///
/// Only `NoPrefix` and `WithPrefix` implement this.
pub trait Prefix: sealed::Sealed + Pod + Copy + 'static {
    /// Length in bytes of the prefix (0 or 2).
    const LEN: usize;

    /// The prefix value. For `NoPrefix` this is a ZST, for `WithPrefix` this is `"0x"`.
    const VALUE: Self;
}

impl Prefix for NoPrefix {
    const LEN: usize = 0;
    const VALUE: Self = NoPrefix;
}

impl Prefix for WithPrefix {
    const LEN: usize = 2;
    const VALUE: Self = WithPrefix([b'0', b'x']);
}
