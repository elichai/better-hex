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

mod helpers;

pub mod prefixed;
pub mod upper;
pub mod upper_prefixed;

use helpers::FromHexHelper;
use serde::{Deserializer, Serializer};

/// Serialize bytes as lowercase hex (no prefix).
///
/// Use as `#[serde(with = "better_hex::serde")]` or call directly as
/// `better_hex::serde::serialize(value, serializer)`.
pub fn serialize<T, S>(value: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: AsRef<[u8]>,
    S: Serializer,
{
    helpers::do_serialize(value.as_ref(), serializer, false, false)
}

/// Deserialize bytes from a lowercase hex string (no prefix).
///
/// Works for both `Vec<u8>` and `[u8; N]`.
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: FromHexHelper,
    D: Deserializer<'de>,
{
    helpers::do_deserialize(deserializer, false)
}
