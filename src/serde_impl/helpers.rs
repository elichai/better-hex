//! Shared serialization and deserialization helpers.
//!
//! All public functions in `better_hex::serde` and its submodules are thin
//! wrappers around the generic helpers defined here, parameterised on case
//! (upper/lower), prefix (with/without `"0x"`), and timing behaviour (fast/CT).

use crate::{error::Error, maybe_uninit};
use core::fmt;
use serde::{Deserializer, Serializer, de};

// ── serialization ────────────────────────────────────────────────────────────

/// Display adapter that formats `data` as hex when passed to `collect_str`.
///
/// `collect_str` on well-known serializers (serde_json, serde_yaml, …) writes
/// directly into the serializer's output buffer without a heap allocation.
/// The default `Serializer::collect_str` fallback calls `.to_string()`, which
/// **does** heap-allocate an intermediate `String`; see the module-level docs.
struct HexDisplayAdapter<'a> {
    data: &'a [u8],
    upper: bool,
    prefix: bool,
}

impl fmt::Display for HexDisplayAdapter<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.prefix {
            f.write_str("0x")?;
        }
        if self.upper {
            crate::display::write_hex_to::<true, 128, _>(self.data, f)
        } else {
            crate::display::write_hex_to::<false, 128, _>(self.data, f)
        }
    }
}

/// Display adapter that uses the constant-time encode path.
///
/// Encodes through a 256-byte stack buffer in 128-input-byte chunks, with no
/// data-dependent branches or memory lookup tables.
struct CtHexDisplayAdapter<'a> {
    data: &'a [u8],
    upper: bool,
    prefix: bool,
}

impl fmt::Display for CtHexDisplayAdapter<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use crate::backend;
        use core::mem::MaybeUninit;

        if self.prefix {
            f.write_str("0x")?;
        }

        const BUF: usize = 256;
        let mut buf = [MaybeUninit::<u8>::uninit(); BUF];
        let chunk_size = BUF / 2;
        for chunk in self.data.chunks(chunk_size) {
            let hex_len = chunk.len() * 2;
            let hex_buf = &mut buf[..hex_len];
            // Length invariant: hex_buf.len() == chunk.len() * 2.
            if self.upper {
                backend::encode::<true>(chunk, hex_buf).expect("buf is correctly sized");
            } else {
                backend::encode::<false>(chunk, hex_buf).expect("buf is correctly sized");
            }
            // SAFETY: encode wrote `hex_len` bytes of valid hex ASCII (= valid UTF-8).
            let s = unsafe {
                let init = maybe_uninit::assume_init_slice(hex_buf);
                core::str::from_utf8_unchecked(init)
            };
            f.write_str(s)?;
        }
        Ok(())
    }
}

/// Serialize `bytes` as hex using the fast (variable-time) SIMD path.
pub(crate) fn serialize_fast<S>(bytes: &[u8], serializer: S, upper: bool, prefix: bool) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.collect_str(&HexDisplayAdapter {
        data: bytes,
        upper,
        prefix,
    })
}

/// Serialize `bytes` as hex using the constant-time path.
pub(crate) fn serialize_ct<S>(bytes: &[u8], serializer: S, upper: bool, prefix: bool) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.collect_str(&CtHexDisplayAdapter {
        data: bytes,
        upper,
        prefix,
    })
}

// ── deserialization — sealed dispatch trait ───────────────────────────────────

mod sealed {
    pub trait Sealed {}
    #[cfg(feature = "alloc")]
    impl Sealed for alloc::vec::Vec<u8> {}
    impl<const N: usize> Sealed for [u8; N] {}
}

/// Sealed trait that enables a single `deserialize<T, D>` to work for both
/// `Vec<u8>` and `[u8; N]`.
///
/// This trait is sealed — it cannot be implemented outside of this crate.
/// It is an implementation detail; users interact with it only implicitly
/// via `#[serde(with = "better_hex::serde")]`.
pub trait FromHexHelper: Sized + sealed::Sealed {
    /// Decode a (possibly prefix-stripped) hex str into `Self`, fast path.
    fn from_hex_fast<E: de::Error>(hex: &str) -> Result<Self, E>;
    /// Decode a (possibly prefix-stripped) hex str into `Self`, CT path.
    fn from_hex_ct<E: de::Error>(hex: &str) -> Result<Self, E>;
}

#[cfg(feature = "alloc")]
impl FromHexHelper for alloc::vec::Vec<u8> {
    fn from_hex_fast<E: de::Error>(hex: &str) -> Result<Self, E> {
        crate::decode(hex).map_err(|e| de::Error::custom(FmtError(e)))
    }

    fn from_hex_ct<E: de::Error>(hex: &str) -> Result<Self, E> {
        crate::decode(hex).map_err(|e| de::Error::custom(FmtError(e)))
    }
}

impl<const N: usize> FromHexHelper for [u8; N] {
    fn from_hex_fast<E: de::Error>(hex: &str) -> Result<Self, E> {
        crate::decode(hex).map_err(|e| de::Error::custom(FmtError(e)))
    }

    fn from_hex_ct<E: de::Error>(hex: &str) -> Result<Self, E> {
        crate::decode(hex).map_err(|e| de::Error::custom(FmtError(e)))
    }
}

// ── visitors ─────────────────────────────────────────────────────────────────

/// Serde visitor that deserializes a hex string using the fast path.
pub(crate) struct HexVisitor<T> {
    pub prefix: bool,
    pub _marker: core::marker::PhantomData<T>,
}

impl<'de, T: FromHexHelper> de::Visitor<'de> for HexVisitor<T> {
    type Value = T;

    fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.prefix {
            f.write_str("a \"0x\"-prefixed hex string")
        } else {
            f.write_str("a hex string")
        }
    }

    fn visit_str<E: de::Error>(self, v: &str) -> Result<Self::Value, E> {
        let hex = strip_prefix(v, self.prefix).map_err(de::Error::custom)?;
        T::from_hex_fast(hex)
    }
}

/// Serde visitor that deserializes a hex string using the CT path.
pub(crate) struct CtHexVisitor<T> {
    pub prefix: bool,
    pub _marker: core::marker::PhantomData<T>,
}

impl<'de, T: FromHexHelper> de::Visitor<'de> for CtHexVisitor<T> {
    type Value = T;

    fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.prefix {
            f.write_str("a \"0x\"-prefixed hex string (constant-time)")
        } else {
            f.write_str("a hex string (constant-time)")
        }
    }

    fn visit_str<E: de::Error>(self, v: &str) -> Result<Self::Value, E> {
        let hex = strip_prefix(v, self.prefix).map_err(de::Error::custom)?;
        T::from_hex_ct(hex)
    }
}

// ── public-facing generic entry points ───────────────────────────────────────

/// Serialize `bytes` as hex (fast path).
#[inline]
pub(crate) fn do_serialize<S: Serializer>(
    bytes: &[u8],
    serializer: S,
    upper: bool,
    prefix: bool,
) -> Result<S::Ok, S::Error> {
    serialize_fast(bytes, serializer, upper, prefix)
}

/// Deserialize hex into `T` (fast path).
#[inline]
pub(crate) fn do_deserialize<'de, D: Deserializer<'de>, T: FromHexHelper>(
    deserializer: D,
    prefix: bool,
) -> Result<T, D::Error> {
    deserializer.deserialize_str(HexVisitor::<T> {
        prefix,
        _marker: core::marker::PhantomData,
    })
}

/// Serialize `bytes` as hex (CT path).
#[inline]
pub(crate) fn do_ct_serialize<S: Serializer>(
    bytes: &[u8],
    serializer: S,
    upper: bool,
    prefix: bool,
) -> Result<S::Ok, S::Error> {
    serialize_ct(bytes, serializer, upper, prefix)
}

/// Deserialize hex into `T` (CT path).
#[inline]
pub(crate) fn do_ct_deserialize<'de, D: Deserializer<'de>, T: FromHexHelper>(
    deserializer: D,
    prefix: bool,
) -> Result<T, D::Error> {
    deserializer.deserialize_str(CtHexVisitor::<T> {
        prefix,
        _marker: core::marker::PhantomData,
    })
}

// ── utilities ─────────────────────────────────────────────────────────────────

/// Strip a `"0x"` prefix when `prefix` is `true`.
fn strip_prefix(s: &str, prefix: bool) -> Result<&str, &'static str> {
    if prefix {
        s.strip_prefix("0x").ok_or("expected \"0x\" prefix in hex string")
    } else {
        Ok(s)
    }
}

/// Wraps [`Error`] so it can be used as a serde `Display` error message.
struct FmtError(Error);

impl fmt::Display for FmtError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Delegate to the Error's own Display impl.
        fmt::Display::fmt(&self.0, f)
    }
}
