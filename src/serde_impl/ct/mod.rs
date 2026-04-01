//! Constant-time hex serde support.
//!
//! All functions in this module use the constant-time encode/decode paths:
//! - No data-dependent branches
//! - No memory lookup tables (branchless arithmetic or register-only SIMD LUTs)
//! - Error accumulation without early return (no timing leak on error position)
//!
//! Use as `#[serde(with = "better_hex::serde::ct")]` for lowercase with no prefix.
//! Submodules follow the same pattern as the fast module:
//! - `better_hex::serde::ct::upper`
//! - `better_hex::serde::ct::prefixed`
//! - `better_hex::serde::ct::upper_prefixed`
//!
//! # Allocation note
//!
//! Serialization uses `serializer.collect_str(ct_display_adapter)`.
//! Serializers that override `collect_str` (serde_json does) avoid heap
//! allocation.  With the default `collect_str` fallback, a `String` holding
//! secret-derived hex is created on the heap.  If this is unacceptable, use a
//! serializer that overrides `collect_str`.

use crate::serde_impl::helpers::FromHexHelper;
use serde::{Deserializer, Serializer};

pub mod prefixed;
pub mod upper;
pub mod upper_prefixed;

/// Serialize bytes as lowercase hex (constant-time, no prefix).
pub fn serialize<T, S>(value: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: AsRef<[u8]>,
    S: Serializer,
{
    crate::serde_impl::helpers::do_ct_serialize(value.as_ref(), serializer, false, false)
}

/// Deserialize bytes from a lowercase hex string (constant-time, no prefix).
///
/// Returns [`Error::InvalidEncoding`](crate::Error::InvalidEncoding) on any
/// invalid byte — the CT path does not report which position was invalid.
///
/// Works for both `Vec<u8>` and `[u8; N]`.
pub fn deserialize<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: FromHexHelper,
    D: Deserializer<'de>,
{
    crate::serde_impl::helpers::do_ct_deserialize(deserializer, false)
}
