use core::fmt;
use core::ops::Deref;
use core::str::FromStr;

use crate::backend;
use crate::error::Error;
use crate::prefix::{NoPrefix, Prefix, WithPrefix};

/// Raw storage for [`HexStr`]. Implements [`Pod`](bytemuck::Pod) so we can use
/// `bytemuck::bytes_of()` to obtain a byte-slice view without raw pointer casts.
///
/// Not exposed publicly — `HexStr` wraps this and enforces the hex ASCII invariant.
#[repr(C)]
#[derive(Copy, Clone)]
pub(crate) struct RawHexStr<const N: usize, P: Prefix> {
    pub(crate) prefix: P,
    pub(crate) bytes: [[u8; 2]; N],
}

// SAFETY: `RawHexStr` is `repr(C)`, `P` is `Pod`, and `[[u8; 2]; N]` is all-`u8`.
// Alignment is 1 so there is no padding.
unsafe impl<const N: usize, P: Prefix> bytemuck::Zeroable for RawHexStr<N, P> {}
unsafe impl<const N: usize, P: Prefix> bytemuck::Pod for RawHexStr<N, P> {}

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
#[repr(transparent)]
#[derive(Copy, Clone)]
pub struct HexStr<const N: usize, P: Prefix = NoPrefix> {
    inner: RawHexStr<N, P>,
}

impl<const N: usize, P: Prefix> HexStr<N, P> {
    /// Total string length in bytes (prefix + 2 hex chars per byte).
    pub const LEN: usize = P::LEN + N * 2;

    /// Create a hex string representing all zeros (`"00...00"`).
    pub fn zero() -> Self {
        Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: [[b'0'; 2]; N],
            },
        }
    }

    /// Encode `input` bytes into a lowercase hex string.
    pub fn encode_lower(input: &[u8; N]) -> Self {
        let mut s = Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: [[0u8; 2]; N],
            },
        };
        // SAFETY: `inner.bytes` is `[[u8; 2]; N]`, so `N * 2` bytes of valid
        // initialized `u8` starting at `inner.bytes.as_mut_ptr()`.
        let output = unsafe {
            core::slice::from_raw_parts_mut(s.inner.bytes.as_mut_ptr().cast::<u8>(), N * 2)
        };
        backend::encode::<false>(input, output);
        s
    }

    /// Encode `input` bytes into an uppercase hex string.
    pub fn encode_upper(input: &[u8; N]) -> Self {
        let mut s = Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: [[0u8; 2]; N],
            },
        };
        // SAFETY: same layout reasoning as `encode_lower`.
        let output = unsafe {
            core::slice::from_raw_parts_mut(s.inner.bytes.as_mut_ptr().cast::<u8>(), N * 2)
        };
        backend::encode::<true>(input, output);
        s
    }

    /// View the full string as a byte slice (includes prefix when present).
    ///
    /// Uses `bytemuck::bytes_of` on the inner `repr(C)` storage, so no raw
    /// pointer arithmetic is needed.
    pub fn as_bytes(&self) -> &[u8] {
        bytemuck::bytes_of(&self.inner)
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
        // SAFETY: `inner.bytes` is `[[u8; 2]; N]` — `N * 2` contiguous `u8`.
        let hex_bytes = unsafe {
            core::slice::from_raw_parts(self.inner.bytes.as_ptr().cast::<u8>(), N * 2)
        };
        let mut out = [0u8; N];
        let result = backend::decode(hex_bytes, &mut out);
        debug_assert!(result.is_ok(), "HexStr invariant violated: contained non-hex bytes");
        out
    }
}

// ---------------------------------------------------------------------------
// Const encode
// ---------------------------------------------------------------------------

const HEX_CHARS_LOWER: &[u8; 16] = b"0123456789abcdef";
const HEX_CHARS_UPPER: &[u8; 16] = b"0123456789ABCDEF";

impl<const N: usize> HexStr<N, NoPrefix> {
    /// Encode bytes to lowercase hex at compile time.
    pub const fn const_encode_lower(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_CHARS_LOWER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_CHARS_LOWER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { inner: RawHexStr { prefix: NoPrefix, bytes } }
    }

    /// Encode bytes to uppercase hex at compile time.
    pub const fn const_encode_upper(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_CHARS_UPPER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_CHARS_UPPER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { inner: RawHexStr { prefix: NoPrefix, bytes } }
    }
}

impl<const N: usize> HexStr<N, WithPrefix> {
    /// Encode bytes to lowercase hex at compile time (with `"0x"` prefix).
    pub const fn const_encode_lower(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_CHARS_LOWER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_CHARS_LOWER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { inner: RawHexStr { prefix: WithPrefix([b'0', b'x']), bytes } }
    }

    /// Encode bytes to uppercase hex at compile time (with `"0x"` prefix).
    pub const fn const_encode_upper(input: &[u8; N]) -> Self {
        let mut bytes = [[0u8; 2]; N];
        let mut i = 0;
        while i < N {
            bytes[i][0] = HEX_CHARS_UPPER[(input[i] >> 4) as usize];
            bytes[i][1] = HEX_CHARS_UPPER[(input[i] & 0x0f) as usize];
            i += 1;
        }
        Self { inner: RawHexStr { prefix: WithPrefix([b'0', b'x']), bytes } }
    }
}

// ---------------------------------------------------------------------------
// Deref / AsRef
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

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

impl<const N: usize, P: Prefix> fmt::LowerHex for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Re-encode as lower to normalise any existing upper-case content.
        let lower = HexStr::<N, NoPrefix>::encode_lower(&self.decode());
        f.write_str(lower.as_str())
    }
}

impl<const N: usize, P: Prefix> fmt::UpperHex for HexStr<N, P> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let upper = HexStr::<N, NoPrefix>::encode_upper(&self.decode());
        f.write_str(upper.as_str())
    }
}

// ---------------------------------------------------------------------------
// Equality
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// FromStr (only for NoPrefix — the input string has no "0x")
// ---------------------------------------------------------------------------

impl<const N: usize> FromStr for HexStr<N, NoPrefix> {
    type Err = Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let expected = N * 2;
        if s.len() != expected {
            return Err(Error::InvalidLength { expected, got: s.len() });
        }

        let input = s.as_bytes();

        // Decode to validate the hex content; captures InvalidChar errors.
        let mut decoded = [0u8; N];
        backend::decode(input, &mut decoded)?;

        // Copy the validated input bytes directly into the HexStr.
        let mut result = Self {
            inner: RawHexStr {
                prefix: NoPrefix,
                bytes: [[0u8; 2]; N],
            },
        };
        // SAFETY: `inner.bytes` is `[[u8; 2]; N]` == `N * 2` contiguous `u8`.
        let dst = unsafe {
            core::slice::from_raw_parts_mut(result.inner.bytes.as_mut_ptr().cast::<u8>(), N * 2)
        };
        dst.copy_from_slice(input);
        debug_assert!(core::str::from_utf8(dst).is_ok(), "FromStr: validated input is not valid UTF-8");
        Ok(result)
    }
}

// ---------------------------------------------------------------------------
// Const decode free functions
// ---------------------------------------------------------------------------

/// Decode hex at compile time.
///
/// Returns an error if the input length is not exactly `2 * N`, or if any
/// byte is not a valid hex character.
pub const fn const_decode_to_array<const N: usize>(input: &[u8]) -> Result<[u8; N], Error> {
    if !input.len().is_multiple_of(2) {
        return Err(Error::InvalidLength { expected: input.len() & !1, got: input.len() });
    }
    if input.len() / 2 != N {
        return Err(Error::InvalidLength { expected: N * 2, got: input.len() });
    }
    let mut out = [0u8; N];
    let mut i = 0;
    while i < N {
        let hi = const_decode_nibble(input[i * 2]);
        let lo = const_decode_nibble(input[i * 2 + 1]);
        if hi == u8::MAX {
            return Err(Error::InvalidChar { byte: input[i * 2], index: i * 2 });
        }
        if lo == u8::MAX {
            return Err(Error::InvalidChar { byte: input[i * 2 + 1], index: i * 2 + 1 });
        }
        out[i] = (hi << 4) | lo;
        i += 1;
    }
    Ok(out)
}

/// Check hex validity at compile time.
///
/// Returns `true` if `input` has even length and every byte is a valid hex
/// character (`[0-9a-fA-F]`).
pub const fn const_check(input: &[u8]) -> bool {
    if !input.len().is_multiple_of(2) {
        return false;
    }
    let mut i = 0;
    while i < input.len() {
        if const_decode_nibble(input[i]) == u8::MAX {
            return false;
        }
        i += 1;
    }
    true
}

const fn const_decode_nibble(byte: u8) -> u8 {
    match byte {
        b'0'..=b'9' => byte - b'0',
        b'a'..=b'f' => byte - b'a' + 10,
        b'A'..=b'F' => byte - b'A' + 10,
        _ => u8::MAX,
    }
}
