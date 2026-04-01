//! Lowercase hex serde support with `"0x"` prefix (fast SIMD path).
//!
//! Use as `#[serde(with = "better_hex::serde::prefixed")]`.

use crate::serde_impl::helpers::FromHexHelper;
use serde::{Deserializer, Serializer};

/// Serialize bytes as lowercase hex with a `"0x"` prefix (fast SIMD path).
pub fn serialize<T, S>(value: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: AsRef<[u8]>,
    S: Serializer,
{
    crate::serde_impl::helpers::do_serialize(value.as_ref(), serializer, false, true)
}

/// Deserialize bytes from a `"0x"`-prefixed hex string (fast path).
///
/// Returns an error if the `"0x"` prefix is missing.
/// Works for both `Vec<u8>` and `[u8; N]`.
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: FromHexHelper,
    D: Deserializer<'de>,
{
    crate::serde_impl::helpers::do_deserialize(deserializer, true)
}
