use better_hex::hex_literal;

#[test]
fn decodes_in_const_static_and_expression_contexts() {
    const BYTES: [u8; 4] = hex_literal!("00aAfF19");
    static STATIC_BYTES: [u8; 4] = hex_literal!("00aAfF19");
    assert_eq!(BYTES, [0, 0xaa, 0xff, 0x19]);
    assert_eq!(STATIC_BYTES, BYTES);
    assert_eq!(
        hex_literal!("0123456789abcdefABCDEF"),
        [1, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xab, 0xcd, 0xef]
    );
}

#[test]
fn ignores_line_endings_even_between_nibbles() {
    assert_eq!(hex_literal!("\r\n0\n12\r34\r\n5\n"), [1, 0x23, 0x45]);
    assert_eq!(
        hex_literal!(
            r#"
001122
334455
"#
        ),
        [0, 0x11, 0x22, 0x33, 0x44, 0x55]
    );
}

#[test]
fn concatenates_adjacent_literals_and_handles_empty_input() {
    let empty: [u8; 0] = hex_literal!();
    assert_eq!(empty, []);
    assert_eq!(hex_literal!("" "\r\n" r""), []);
    assert_eq!(
        hex_literal!("" "00" r"AaBB" /* separator */ "cc" ""),
        [0, 0xaa, 0xbb, 0xcc]
    );
}

#[test]
fn accepts_one_optional_prefix_per_literal() {
    const BYTES: [u8; 6] = hex_literal!("0xDeAd" "0XbEEf" "0011");
    assert_eq!(BYTES, [0xde, 0xad, 0xbe, 0xef, 0, 0x11]);
    assert_eq!(hex_literal!("\r\n0x0\n102" r"0X0304"), [1, 2, 3, 4]);
    assert_eq!(hex_literal!("0x" "\n0X\r\n"), []);
}

#[test]
fn accepts_const_string_expressions() {
    const INPUT: &str = "dead";
    const BYTES: [u8; 4] = hex_literal!(INPUT, concat!("be", "ef"));
    assert_eq!(hex_literal!(INPUT), [0xde, 0xad]);
    assert_eq!(BYTES, [0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(hex_literal!(INPUT, "beef",), BYTES);
}

#[test]
fn expansion_is_hygienic() {
    use better_hex as renamed;
    use core::primitive::{u8 as str, u16 as u8, u32 as usize};

    let _: str = 0;
    let _: u8 = 0;
    let _: usize = 0;
    let strings = "unrelated";
    let bytes = renamed::hex_literal!("dead" "beef");
    assert_eq!(bytes, [0xde, 0xad, 0xbe, 0xef]);
    assert_eq!(strings, "unrelated");
}
