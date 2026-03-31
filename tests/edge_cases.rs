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
fn error_display_odd_length() {
    let e = Error::OddLength;
    assert_eq!(e.to_string(), "odd-length hex string");
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
    assert_eq!(Error::OddLength, Error::OddLength);
    assert_ne!(Error::OddLength, Error::InvalidEncoding);
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
fn with_prefix_new_is_0x() {
    let p = WithPrefix::new();
    assert_eq!(p.as_bytes(), b"0x");
}

#[test]
fn no_prefix_new_is_empty() {
    let p = NoPrefix::new();
    assert_eq!(p.as_bytes(), b"");
}
