//! Serde support for hex-encoded byte fields.
//!
//! This module is re-exported as `better_hex::serde`. Use it with
//! `#[serde(with = "better_hex::serde")]` on fields of type `Vec<u8>` or
//! `[u8; N]`.
//!
//! # Submodules
//!
//! | Module | Case | Prefix |
//! |---|---|---|
//! | `better_hex::serde` | lower | no |
//! | `better_hex::serde::upper` | upper | no |
//! | `better_hex::serde::prefixed` | lower | `0x` |
//! | `better_hex::serde::upper_prefixed` | upper | `0x` |
//!
//! # Constant-time notes
//!
//! All encode and decode operations are constant-time w.r.t. input data
//! values. The prefixed variants (`prefixed`, `upper_prefixed`) use a
//! constant-time comparison for the `"0x"` prefix bytes — the specific
//! content of an incorrect prefix is not leaked via timing. However,
//! *whether* the prefix matches `"0x"` or not IS observable (it is a
//! public format marker, not secret data).
//!
//! # Allocation behaviour
//!
//! `serialize` calls `serializer.collect_str(display_adapter)`.  Serializers
//! that override `collect_str` — e.g. `serde_json`, `serde_yaml` — write
//! directly into their output buffers without a heap allocation.  The default
//! `Serializer::collect_str` fallback formats into a temporary `String`,
//! which **does** allocate.
//!
//! # Example
//!
//! ```rust
//! # #[cfg(feature = "serde")] {
//! use serde::{Serialize, Deserialize};
//!
//! #[derive(Serialize, Deserialize, Debug, PartialEq)]
//! struct Tx {
//!     #[serde(with = "better_hex::serde")]
//!     pub hash: [u8; 4],
//!
//!     #[serde(with = "better_hex::serde::upper")]
//!     pub label: [u8; 4],
//! }
//! # }
//! ```

use core::fmt;
use serde::{Deserializer, Serializer, de};

// ── shared helpers ──────────────────────────────────────────────────────────

/// Display adapter for `collect_str`. Const generics select case and prefix.
struct HexDisplayAdapter<'a, const UPPER: bool, const PREFIX: bool> {
    data: &'a [u8],
}

impl<const UPPER: bool, const PREFIX: bool> fmt::Display for HexDisplayAdapter<'_, UPPER, PREFIX> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if PREFIX {
            f.write_str("0x")?;
        }
        crate::display::write_hex_to::<UPPER, { crate::display::DEFAULT_BUF }, _>(self.data, f)
    }
}

/// Serde visitor. Const generic selects prefix stripping.
struct HexVisitor<T, const PREFIX: bool>(core::marker::PhantomData<T>);

impl<'de, T: crate::FromHex, const PREFIX: bool> de::Visitor<'de> for HexVisitor<T, PREFIX> {
    type Value = T;

    fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if PREFIX {
            f.write_str("a \"0x\"-prefixed hex string")
        } else {
            f.write_str("a hex string")
        }
    }

    fn visit_str<E: de::Error>(self, v: &str) -> Result<Self::Value, E> {
        let hex = strip_prefix::<PREFIX>(v.as_bytes()).map_err(de::Error::custom)?;
        T::from_hex(hex).map_err(|e| de::Error::custom(e))
    }
}

/// Strip a `"0x"` prefix when `PREFIX` is true.
///
/// See [`crate::WithPrefix::strip_prefix`] for constant-time notes.
fn strip_prefix<const PREFIX: bool>(s: &[u8]) -> Result<&[u8], &'static str> {
    if !PREFIX {
        return Ok(s);
    }
    <crate::WithPrefix as crate::Prefix>::strip_prefix(s).ok_or("expected \"0x\" prefix in hex string")
}

// ── default: lowercase, no prefix ───────────────────────────────────────────

/// Serialize bytes as lowercase hex (no prefix).
pub fn serialize<T: AsRef<[u8]>, S: Serializer>(value: &T, serializer: S) -> Result<S::Ok, S::Error> {
    serializer.collect_str(&HexDisplayAdapter::<false, false> { data: value.as_ref() })
}

/// Deserialize bytes from a hex string (no prefix).
pub fn deserialize<'de, T: crate::FromHex, D: Deserializer<'de>>(deserializer: D) -> Result<T, D::Error> {
    deserializer.deserialize_str(HexVisitor::<T, false>(core::marker::PhantomData))
}

// ── submodules ──────────────────────────────────────────────────────────────

/// Uppercase hex serde support (no prefix).
///
/// Use as `#[serde(with = "better_hex::serde::upper")]`.
pub mod upper {
    use serde::{Deserializer, Serializer};

    /// Serialize bytes as uppercase hex (no prefix).
    pub fn serialize<T: AsRef<[u8]>, S: Serializer>(value: &T, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.collect_str(&super::HexDisplayAdapter::<true, false> { data: value.as_ref() })
    }

    /// Deserialize bytes from a hex string (no prefix).
    pub fn deserialize<'de, T: crate::FromHex, D: Deserializer<'de>>(deserializer: D) -> Result<T, D::Error> {
        deserializer.deserialize_str(super::HexVisitor::<T, false>(core::marker::PhantomData))
    }
}

/// Lowercase hex serde support with `"0x"` prefix.
///
/// Use as `#[serde(with = "better_hex::serde::prefixed")]`.
///
/// Prefix validation uses constant-time comparison — the content of an
/// incorrect prefix is not leaked, but whether the prefix is correct IS
/// observable (the `"0x"` prefix is a public format marker).
pub mod prefixed {
    use serde::{Deserializer, Serializer};

    /// Serialize bytes as lowercase hex with a `"0x"` prefix.
    pub fn serialize<T: AsRef<[u8]>, S: Serializer>(value: &T, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.collect_str(&super::HexDisplayAdapter::<false, true> { data: value.as_ref() })
    }

    /// Deserialize bytes from a `"0x"`-prefixed hex string.
    ///
    /// Prefix check is constant-time w.r.t. the incorrect prefix content,
    /// but whether the prefix matches `"0x"` or not is observable.
    pub fn deserialize<'de, T: crate::FromHex, D: Deserializer<'de>>(deserializer: D) -> Result<T, D::Error> {
        deserializer.deserialize_str(super::HexVisitor::<T, true>(core::marker::PhantomData))
    }
}

/// Uppercase hex serde support with `"0x"` prefix.
///
/// Use as `#[serde(with = "better_hex::serde::upper_prefixed")]`.
///
/// See [`prefixed`] for constant-time notes on prefix validation.
pub mod upper_prefixed {
    use serde::{Deserializer, Serializer};

    /// Serialize bytes as uppercase hex with a `"0x"` prefix.
    pub fn serialize<T: AsRef<[u8]>, S: Serializer>(value: &T, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.collect_str(&super::HexDisplayAdapter::<true, true> { data: value.as_ref() })
    }

    /// Deserialize bytes from a `"0x"`-prefixed hex string.
    ///
    /// See [`super::prefixed::deserialize`] for constant-time notes.
    pub fn deserialize<'de, T: crate::FromHex, D: Deserializer<'de>>(deserializer: D) -> Result<T, D::Error> {
        deserializer.deserialize_str(super::HexVisitor::<T, true>(core::marker::PhantomData))
    }
}
