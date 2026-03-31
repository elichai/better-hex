use core::fmt;

use crate::arch;

/// Returns a value that implements `Display`, `LowerHex`, and `UpperHex`
/// for the given byte slice.
pub fn display(data: &[u8]) -> DisplayHex<'_> {
    DisplayHex(data)
}

/// Opaque type implementing hex formatting traits.
pub struct DisplayHex<'a>(&'a [u8]);

impl fmt::Display for DisplayHex<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt::LowerHex::fmt(self, f)
    }
}

impl fmt::LowerHex for DisplayHex<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            f.write_str("0x")?;
        }
        encode_to_fmt(self.0, f, false)
    }
}

impl fmt::UpperHex for DisplayHex<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            f.write_str("0x")?;
        }
        encode_to_fmt(self.0, f, true)
    }
}

/// Internal: write hex through a fmt::Formatter.
/// Uses a stack buffer to reduce write_str calls.
pub(crate) fn encode_to_fmt(
    input: &[u8],
    f: &mut fmt::Formatter<'_>,
    upper: bool,
) -> fmt::Result {
    const CHUNK: usize = 64;
    let mut buf = [0u8; CHUNK * 2];

    for chunk in input.chunks(CHUNK) {
        let hex_buf = &mut buf[..chunk.len() * 2];
        if upper {
            arch::encode::<true>(chunk, hex_buf);
        } else {
            arch::encode::<false>(chunk, hex_buf);
        }
        // SAFETY: encode writes valid hex ASCII, which is valid UTF-8.
        let s = unsafe { core::str::from_utf8_unchecked(hex_buf) };
        f.write_str(s)?;
    }
    Ok(())
}
