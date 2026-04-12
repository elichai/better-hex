//! Uppercase hex serde support (no prefix).
//!
//! Use as `#[serde(with = "better_hex::serde::upper")]`.

use crate::serde_impl::helpers::FromHexHelper;
use serde::{Deserializer, Serializer};

/// Serialize bytes as uppercase hex (no prefix).
pub fn serialize<T, S>(value: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: AsRef<[u8]>,
    S: Serializer,
{
    crate::serde_impl::helpers::do_serialize(value.as_ref(), serializer, true, false)
}

/// Deserialize bytes from an uppercase (or mixed-case) hex string (no prefix).
///
/// Works for both `Vec<u8>` and `[u8; N]`.
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: FromHexHelper,
    D: Deserializer<'de>,
{
    crate::serde_impl::helpers::do_deserialize(deserializer, false)
}
