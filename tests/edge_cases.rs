use better_hex::{Error, NoPrefix, Prefix, WithPrefix};

#[test]
fn display_lower() {
    let s = format!("{}", better_hex::display(&[0xde, 0xad]));
    assert_eq!(s, "dead");
}

#[test]
fn display_upper_hex() {
    let s = format!("{:X}", better_hex::display(&[0xde, 0xad]));
    assert_eq!(s, "DEAD");
}

#[test]
fn display_lower_hex() {
    let s = format!("{:x}", better_hex::display(&[0xde, 0xad]));
    assert_eq!(s, "dead");
}

#[test]
fn display_alt_lower() {
    let s = format!("{:#x}", better_hex::display(&[0xde, 0xad]));
    assert_eq!(s, "0xdead");
}

#[test]
fn display_alt_upper() {
    let s = format!("{:#X}", better_hex::display(&[0xde, 0xad]));
    assert_eq!(s, "0xDEAD");
}

#[test]
fn display_empty() {
    let s = format!("{}", better_hex::display(&[]));
    assert_eq!(s, "");
}

#[test]
fn display_owned_data() {
    let d = better_hex::display(vec![0xde, 0xad]);
    let s = format!("{}", d);
    assert_eq!(s, "dead");
}

#[test]
fn error_display_invalid_char() {
    let e = Error::InvalidChar { byte: b'G', index: 5 };
    assert_eq!(e.to_string(), "invalid hex character 'G' (0x47) at index 5");
}

#[test]
fn error_display_invalid_encoding() {
    let e = Error::InvalidEncoding;
    assert_eq!(e.to_string(), "invalid hex encoding");
}

#[test]
fn error_display_invalid_length() {
    let e = Error::InvalidLength { expected: 64, got: 40 };
    assert_eq!(e.to_string(), "invalid length: expected 64, got 40");
}

#[test]
fn error_eq() {
    assert_eq!(Error::InvalidEncoding, Error::InvalidEncoding);
    assert_ne!(Error::InvalidEncoding, Error::InvalidLength { expected: 0, got: 0 });
}

#[test]
fn no_prefix_is_zst() {
    assert_eq!(core::mem::size_of::<NoPrefix>(), 0);
}

#[test]
fn with_prefix_is_2_bytes() {
    assert_eq!(core::mem::size_of::<WithPrefix>(), 2);
}

#[test]
fn no_prefix_len() {
    assert_eq!(NoPrefix::LEN, 0);
}

#[test]
fn with_prefix_len() {
    assert_eq!(WithPrefix::LEN, 2);
}

#[test]
fn with_prefix_value_is_0x() {
    assert_eq!(bytemuck::bytes_of(&WithPrefix::VALUE), b"0x");
}

#[test]
fn no_prefix_value() {
    let _ = NoPrefix::VALUE; // just verify it exists
}

// ── display.rs: UpperHex with alternate flag ──────────────────────────────────

#[test]
fn display_upper_hex_alternate_nonempty() {
    // Exercises UpperHex::fmt with f.alternate() == true on non-empty data.
    // Writes "0x" prefix then uppercase hex.
    let s = format!("{:#X}", better_hex::display(&[0x01, 0x23, 0x45, 0x67]));
    assert_eq!(s, "0x01234567");
}

#[test]
fn display_upper_hex_alternate_empty() {
    // Exercises UpperHex::fmt with f.alternate() == true on empty data.
    let s = format!("{:#X}", better_hex::display(&[] as &[u8]));
    assert_eq!(s, "0x");
}

#[test]
fn display_lower_hex_alternate_empty() {
    // Exercises LowerHex::fmt with f.alternate() == true on empty data.
    let s = format!("{:#x}", better_hex::display(&[] as &[u8]));
    assert_eq!(s, "0x");
}

#[test]
fn display_exactly_one_chunk() {
    // 128 bytes = exactly one full chunk (DEFAULT_BUF/2). Exercises the loop
    // body without hitting the remainder branch.
    let data: Vec<u8> = (0u8..128).collect();
    let s = format!("{}", better_hex::display(&data));
    assert_eq!(s.len(), 256);
    assert!(s.chars().all(|c| c.is_ascii_hexdigit()));
}

#[test]
fn display_one_byte_over_chunk() {
    // 129 bytes = one full chunk + 1 byte remainder. Exercises both the loop
    // body and the remainder path in write_hex_to.
    let data: Vec<u8> = (0u8..=128).collect();
    let s = format!("{}", better_hex::display(&data));
    assert_eq!(s.len(), 258);
}
