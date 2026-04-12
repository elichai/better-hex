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
                bytes: const_encode_bytes(input, HEX_CHARS_LOWER),
            },
        }
    }

    /// Encode bytes to uppercase hex at compile time.
    pub const fn const_encode_upper(input: &[u8; N]) -> Self {
        Self {
            inner: RawHexStr {
                prefix: P::VALUE,
                bytes: const_encode_bytes(input, HEX_CHARS_UPPER),
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

const HEX_CHARS_LOWER: &[u8; 16] = b"0123456789abcdef";
const HEX_CHARS_UPPER: &[u8; 16] = b"0123456789ABCDEF";

/// Const-context encode helper. Fills `bytes` with hex for `input` using `table`.
///
/// Separate from `encode_with` because const fn cannot call backend (non-const)
/// functions or trait methods. Each nibble is looked up in `table` directly.
const fn const_encode_bytes<const N: usize>(input: &[u8; N], table: &[u8; 16]) -> [[u8; 2]; N] {
    let mut bytes = [[0u8; 2]; N];
    let mut i = 0;
    while i < N {
        bytes[i][0] = table[(input[i] >> 4) as usize];
        bytes[i][1] = table[(input[i] & 0x0f) as usize];
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
        // Verify and strip the prefix (no-op for NoPrefix where P::LEN == 0).
        let prefix = P::VALUE;
        let prefix_bytes = IntoBytes::as_bytes(&prefix);
        for i in 0..P::LEN {
            if s_bytes[i] != prefix_bytes[i] {
                return Err(Error::InvalidChar { byte: s_bytes[i], index: i });
            }
        }
        let hex_part = &s_bytes[P::LEN..];
        // Decode to validate hex content — captures InvalidChar errors.
        let mut scratch: [MaybeUninit<u8>; N] = maybe_uninit::uninit_array();
        backend::decode(hex_part, &mut scratch).map_err(|e| match e {
            Error::InvalidChar { byte, index } => Error::InvalidChar { byte, index: index + P::LEN },
            other => other,
        })?;
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

/// Decode hex at compile time.
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
    let mut i = 0;
    while i < N {
        let hi = const_decode_nibble(input[i * 2]);
        let lo = const_decode_nibble(input[i * 2 + 1]);
        if hi == u8::MAX {
            return Err(Error::InvalidChar {
                byte: input[i * 2],
                index: i * 2,
            });
        }
        if lo == u8::MAX {
            return Err(Error::InvalidChar {
                byte: input[i * 2 + 1],
                index: i * 2 + 1,
            });
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

/// Convert a single ASCII hex character to its 4-bit nibble value (0–15).
///
/// Returns `u8::MAX` for non-hex bytes. This is the const-fn equivalent of
/// the 256-byte [`DECODE_LUT`](crate::backend::scalar) — uses `match`
/// instead of a lookup table because it must be evaluable at compile time.
const fn const_decode_nibble(byte: u8) -> u8 {
    match byte {
        b'0'..=b'9' => byte - b'0',
        b'a'..=b'f' => byte - b'a' + 10,
        b'A'..=b'F' => byte - b'A' + 10,
        _ => u8::MAX,
    }
}
