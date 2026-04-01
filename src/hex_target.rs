//! Free functions for encoding into [`HexTarget`](crate::HexTarget) types.
//!
//! These are thin wrappers over [`HexTarget::encode_hex`](crate::HexTarget::encode_hex)
//! / [`HexTarget::encode_hex_upper`](crate::HexTarget::encode_hex_upper)
//! that enable turbofish syntax: `encode_to::<String>(&bytes)`.

use crate::traits::HexTarget;

/// Encode bytes to lowercase hex into any [`HexTarget`].
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode_to(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "dead");
/// ```
pub fn encode_to<T: HexTarget>(input: &[u8]) -> Result<T, T::Error> {
    T::encode_hex(input)
}

/// Encode bytes to uppercase hex into any [`HexTarget`].
///
/// # Examples
///
/// ```rust
/// let s: String = better_hex::encode_upper_to(&[0xde, 0xad]).unwrap();
/// assert_eq!(s, "DEAD");
/// ```
pub fn encode_upper_to<T: HexTarget>(input: &[u8]) -> Result<T, T::Error> {
    T::encode_hex_upper(input)
}
