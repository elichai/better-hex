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
pub struct WithPrefix([u8; 2]);

impl sealed::Sealed for NoPrefix {}
impl sealed::Sealed for WithPrefix {}

/// Sealed trait for hex string prefix types.
///
/// Only `NoPrefix` and `WithPrefix` implement this.
pub trait Prefix: sealed::Sealed + Copy + 'static {
    /// Length in bytes of the prefix (0 or 2).
    const LEN: usize;

    /// Create a new prefix value.
    fn new() -> Self;

    /// View the prefix as a byte slice.
    fn as_bytes(&self) -> &[u8];
}

impl Prefix for NoPrefix {
    const LEN: usize = 0;

    fn new() -> Self {
        NoPrefix
    }

    fn as_bytes(&self) -> &[u8] {
        &[]
    }
}

impl Prefix for WithPrefix {
    const LEN: usize = 2;

    fn new() -> Self {
        WithPrefix(*b"0x")
    }

    fn as_bytes(&self) -> &[u8] {
        &self.0
    }
}
