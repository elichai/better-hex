use crate::{
    HexTarget, backend,
    error::Error,
    maybe_uninit,
    prefix::{NoPrefix, Prefix},
};
use core::{fmt, mem::MaybeUninit, ops::Deref, str::FromStr};
use zerocopy::{FromBytes, Immutable, IntoBytes};

/// Raw storage for [`HexStr`].
///
/// Not exposed publicly — `HexStr` wraps this and enforces the hex ASCII invariant.
#[derive(Copy, Clone, IntoBytes, Immutable)]
#[repr(C)]
pub(crate) struct RawHexStr<const N: usize, P: Prefix> {
    pub(crate) prefix: P,
    pub(crate) bytes: [[u8; 2]; N],
}

/// Stack-allocated hex string for `N` input bytes.
///
/// Stores `2*N` hex characters (+ 2 bytes for `"0x"` when using [`WithPrefix`]).
/// `N` is the **byte count**, not the hex character count.
///
/// The type parameter `P` defaults to [`NoPrefix`]. Use [`WithPrefix`] to
/// produce strings with a leading `"0x"` prefix.
///
/// All constructors guarantee that the stored bytes are valid hex ASCII,
/// so conversions to `&str` are always safe.
#[derive(Copy, Clone)]
pub struct HexStr<const N: usize, P: Prefix = NoPrefix> {
    pub(crate) inner: RawHexStr<N, P>,
}

// All construction and raw-byte access lives in this single `impl` block
// to keep the safety-critical code in one place.
impl<const N: usize, P: Prefix> HexStr<N, P> {
    /// Total string length in bytes (prefix + 2 hex chars per byte).
    pub const LEN: usize = P::LEN + N * 2;

    /// Create a hex string representing all zeros (`"00...00"`).
    pub const fn zero() -> Self {
        Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: [[b'0'; 2]; N],
            },
        }
    }

    /// Encode `input` bytes into a lowercase hex string.
    pub fn encode_lower(input: &[u8; N]) -> Self {
        HexTarget::encode_hex(input).expect("Cannot fail, sizes are exact")
    }

    /// Encode `input` bytes into an uppercase hex string.
    pub fn encode_upper(input: &[u8; N]) -> Self {
        HexTarget::encode_hex_upper(input).expect("Cannot fail, sizes are exact")
    }

    /// Encode bytes to lowercase hex at compile time.
    pub const fn const_encode_lower(input: &[u8; N]) -> Self {
        Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: const_encode_bytes(input, false),
            },
        }
    }

    /// Encode bytes to uppercase hex at compile time.
    pub const fn const_encode_upper(input: &[u8; N]) -> Self {
        Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: const_encode_bytes(input, true),
            },
        }
    }

    /// Construct a `HexStr` from a hex byte array.
    ///
    /// `M` must equal `N * 2` (enforced at compile time). Returns `None` if
    /// any byte is not valid hex ASCII (`[0-9a-fA-F]`).
    pub fn from_hex<const M: usize>(hex: [u8; M]) -> Option<Self> {
        const { assert!(M == N * 2, "hex input length must equal N * 2") };
        if !crate::check(&hex) {
            return None;
        }
        // SAFETY: `crate::check` confirmed all bytes are valid hex ASCII.
        Some(unsafe { Self::from_hex_unchecked(hex) })
    }

    /// Construct a `HexStr` from a hex byte array without validation.
    ///
    /// `M` must equal `N * 2` (enforced at compile time).
    ///
    /// # Safety
    ///
    /// Every byte in `hex` must be valid hex ASCII (`[0-9a-fA-F]`).
    /// Violating this is **undefined behavior**: the type's string conversion
    /// uses `from_utf8_unchecked`, so non-ASCII bytes would violate UTF-8
    /// validity invariants.
    pub const unsafe fn from_hex_unchecked<const M: usize>(hex: [u8; M]) -> Self {
        const { assert!(M == N * 2, "hex input length must equal N * 2") };
        // SAFETY: The caller must uphold the invariant that all bytes are valid
        // hex ASCII. The transmute is sound because [u8; M] and [[u8; 2]; N]
        // have identical layout when M == N * 2 (const-asserted above).
        Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: *zerocopy::transmute_ref!(&hex),
            },
        }
    }

    /// Construct a `HexStr` from a hex byte array at compile time.
    ///
    /// `M` must equal `N * 2` (enforced at compile time). Returns `None` if
    /// any byte is not valid hex ASCII.
    pub const fn const_from_hex<const M: usize>(hex: [u8; M]) -> Option<Self> {
        const { assert!(M == N * 2, "hex input length must equal N * 2") };
        if !const_check(&hex) {
            return None;
        }
        // SAFETY: We've const asserted that the bytes are valid hex ASCII, so this constructor's invariant is upheld.
        Some(unsafe { Self::from_hex_unchecked(hex) })
    }

    /// View the full string as a byte slice (includes prefix when present).
    pub fn as_bytes(&self) -> &[u8] {
        const { assert!(core::mem::size_of::<RawHexStr<N, P>>() == Self::LEN) };
        let res = IntoBytes::as_bytes(&self.inner);
        debug_assert_eq!(res.len(), Self::LEN);
        res
    }

    /// View the hex content (without prefix) as a byte slice.
    pub fn as_bytes_no_prefix(&self) -> &[u8] {
        let bytes = self.as_bytes();
        &bytes[P::LEN..]
    }

    /// View the full string as a `&str`.
    ///
    /// Always valid UTF-8 because the prefix is `b"0x"` (ASCII) and the hex
    /// characters are in `[0-9a-fA-F]` (ASCII).
    pub fn as_str(&self) -> &str {
        let bytes = self.as_bytes();
        debug_assert!(core::str::from_utf8(bytes).is_ok(), "HexStr contained invalid UTF-8");
        // SAFETY: all constructors guarantee hex ASCII content (valid UTF-8).
        unsafe { core::str::from_utf8_unchecked(bytes) }
    }

    /// Decode the hex content back to raw bytes, ignoring the prefix.
    pub fn decode(&self) -> [u8; N] {
        let hex_bytes = self.as_bytes_no_prefix();
        let mut out: [MaybeUninit<u8>; N] = maybe_uninit::uninit_array();
        let result = backend::decode(hex_bytes, &mut out);
        debug_assert!(result.is_ok(), "HexStr invariant violated: contained non-hex bytes");
        // SAFETY: all constructors guarantee `inner.bytes` contains valid hex
        // ASCII, so `backend::decode` always succeeds and initializes all N bytes.
        unsafe { maybe_uninit::transpose(out).assume_init() }
    }
}

use crate::backend::scalar::encode_nibble;

/// Const-context encode helper using branchless nibble arithmetic (no LUT).
const fn const_encode_bytes<const N: usize>(input: &[u8; N], upper: bool) -> [[u8; 2]; N] {
    let offset = if upper { 0x07 } else { 0x27 };
    let mut bytes = [[0u8; 2]; N];
    let mut i = 0;
    while i < N {
        bytes[i][0] = encode_nibble(input[i] >> 4, offset);
        bytes[i][1] = encode_nibble(input[i] & 0x0f, offset);
        i += 1;
    }
    bytes
}

impl<const N: usize, P: Prefix> Deref for HexStr<N, P> {
    type Target = str;

    fn deref(&self) -> &str {
        self.as_str()
    }
}

impl<const N: usize, P: Prefix> AsRef<str> for HexStr<N, P> {
    fn as_ref(&self) -> &str {
        self.as_str()
    }
}

impl<const N: usize, P: Prefix> AsRef<[u8]> for HexStr<N, P> {
    fn as_ref(&self) -> &[u8] {
        self.as_bytes()
    }
}

impl<const N: usize, P: Prefix> fmt::Display for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_str())
    }
}

impl<const N: usize, P: Prefix> fmt::Debug for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "HexStr(\"{}\")", self.as_str())
    }
}

impl<const N: usize, P: Prefix> PartialEq for HexStr<N, P> {
    fn eq(&self, other: &Self) -> bool {
        self.as_bytes() == other.as_bytes()
    }
}

impl<const N: usize, P: Prefix> Eq for HexStr<N, P> {}

impl<const N: usize, P: Prefix> PartialEq<str> for HexStr<N, P> {
    fn eq(&self, other: &str) -> bool {
        self.as_str() == other
    }
}

impl<const N: usize, P: Prefix> FromStr for HexStr<N, P> {
    type Err = Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let expected = Self::LEN; // P::LEN + N * 2
        if s.len() != expected {
            return Err(Error::InvalidLength { expected, got: s.len() });
        }
        let s_bytes = s.as_bytes();
        // Verify and strip prefix using constant-time comparison.
        let hex_part = P::strip_prefix(s_bytes).ok_or(Error::InvalidEncoding)?;
        // Decode to validate hex content — processes all bytes (CT).
        let mut scratch: [MaybeUninit<u8>; N] = maybe_uninit::uninit_array();
        backend::decode(hex_part, &mut scratch)?;
        // Input is valid hex — reinterpret as [[u8; 2]; N] and construct.
        let bytes: &[[u8; 2]; N] = FromBytes::ref_from_bytes(hex_part).expect("length already checked above");
        Ok(Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: *bytes,
            },
        })
    }
}

/// Decode hex at compile time using branchless arithmetic.
///
/// Uses error accumulation (no early return on invalid bytes) to remain
/// constant-time w.r.t. input data values.
///
/// Returns an error if the input length is not exactly `2 * N`, or if any
/// byte is not a valid hex character.
pub const fn const_decode_to_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error> {
    if !input.len().is_multiple_of(2) {
        return Err(Error::InvalidLength {
            expected: input.len() & !1,
            got: input.len(),
        });
    }
    if input.len() / 2 != N {
        return Err(Error::InvalidLength {
            expected: N * 2,
            got: input.len(),
        });
    }
    let mut out = [0u8; N];
    // SAFETY: `input.len() == N * 2` (checked above), so `input.as_ptr()` is
    // readable for `N * 2` bytes and `out.as_mut_ptr()` writable for `N` bytes.
    if unsafe { crate::backend::scalar::decode_inner(input.as_ptr(), out.as_mut_ptr(), N) } != 0 {
        Err(Error::InvalidEncoding)
    } else {
        Ok(out)
    }
}

/// Check hex validity at compile time using branchless arithmetic.
///
/// Returns `true` if `input` has even length and every byte is a valid hex
/// character (`[0-9a-fA-F]`). Processes all bytes without short-circuiting.
pub const fn const_check(input: &[u8]) -> bool {
    input.len().is_multiple_of(2) && crate::backend::scalar::check(input)
}
