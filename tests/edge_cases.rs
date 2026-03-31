use better_hex::Error;

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
