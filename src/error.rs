use core::fmt;

/// Errors that can occur during hex encoding/decoding.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    /// Invalid hex encoding detected (no position info).
    InvalidEncoding,
    /// Buffer or input has wrong length.
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
            Error::InvalidEncoding => f.write_str("invalid hex encoding"),
            Error::InvalidLength { expected, got } => {
                write!(f, "invalid length: expected {expected}, got {got}")
            }
        }
    }
}

// `core::error::Error` lives in `core` (stable since 1.81), so this impl is
// unconditional — available in `no_std` builds too, not just with `std`.
impl core::error::Error for Error {}

impl From<core::convert::Infallible> for Error {
    #[inline]
    fn from(v: core::convert::Infallible) -> Self {
        match v {}
    }
}
