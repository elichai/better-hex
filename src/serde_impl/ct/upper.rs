//! Uppercase constant-time hex serde support (no prefix).
//!
//! Use as `#[serde(with = "better_hex::serde::ct::upper")]`.

use crate::serde_impl::helpers::FromHexHelper;
use serde::{Deserializer, Serializer};

/// Serialize bytes as uppercase hex (constant-time, no prefix).
pub fn serialize<T, S>(value: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: AsRef<[u8]>,
    S: Serializer,
{
    crate::serde_impl::helpers::do_ct_serialize(value.as_ref(), serializer, true, false)
}

/// Deserialize bytes from an uppercase (or mixed-case) hex string (constant-time, no prefix).
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: FromHexHelper,
    D: Deserializer<'de>,
{
    crate::serde_impl::helpers::do_ct_deserialize(deserializer, false)
}
