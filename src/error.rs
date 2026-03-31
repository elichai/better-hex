use core::fmt;

/// Errors that can occur during hex encoding/decoding.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    /// Input hex string has odd length.
    OddLength,
    /// Invalid hex character at a known position (fast path only).
    InvalidChar {
        /// The invalid byte.
        byte: u8,
        /// Position in the input.
        index: usize,
    },
    /// Invalid hex encoding detected (constant-time path — no position info).
    InvalidEncoding,
    /// Output buffer has wrong length.
    InvalidLength {
        /// Expected length.
        expected: usize,
        /// Actual length.
        got: usize,
    },
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::OddLength => f.write_str("odd-length hex string"),
            Error::InvalidChar { byte, index } => {
                write!(f, "invalid hex character '{}' (0x{:02x}) at index {}", *byte as char, byte, index)
            }
            Error::InvalidEncoding => f.write_str("invalid hex encoding"),
            Error::InvalidLength { expected, got } => {
                write!(f, "invalid length: expected {expected}, got {got}")
            }
        }
    }
}

#[cfg(feature = "std")]
impl std::error::Error for Error {}
