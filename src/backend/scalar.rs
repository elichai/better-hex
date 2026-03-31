use crate::error::Error;

const HEX_LOWER: [u8; 16] = *b"0123456789abcdef";
const HEX_UPPER: [u8; 16] = *b"0123456789ABCDEF";

const NIL: u8 = u8::MAX;
static DECODE_LUT: [u8; 256] = {
    let mut lut = [NIL; 256];
    let mut i = 0u8;
    loop {
        lut[b'0'.wrapping_add(i) as usize] = i;
        if i == 9 { break; }
        i += 1;
    }
    let mut i = 0u8;
    loop {
        lut[b'a'.wrapping_add(i) as usize] = 10 + i;
        lut[b'A'.wrapping_add(i) as usize] = 10 + i;
        if i == 5 { break; }
        i += 1;
    }
    lut
};

pub(crate) fn encode<const UPPER: bool>(input: &[u8], output: &mut [u8]) {
    let table = if UPPER { HEX_UPPER } else { HEX_LOWER };
    for (byte, pair) in input.iter().zip(output.chunks_exact_mut(2)) {
        pair[0] = table[(byte >> 4) as usize];
        pair[1] = table[(byte & 0x0f) as usize];
    }
}

pub(crate) fn decode(input: &[u8], output: &mut [u8]) -> Result<(), Error> {
    for (i, (pair, out_byte)) in input.chunks_exact(2).zip(output.iter_mut()).enumerate() {
        let hi = DECODE_LUT[pair[0] as usize];
        let lo = DECODE_LUT[pair[1] as usize];
        if hi == NIL {
            return Err(Error::InvalidChar { byte: pair[0], index: i * 2 });
        }
        if lo == NIL {
            return Err(Error::InvalidChar { byte: pair[1], index: i * 2 + 1 });
        }
        *out_byte = (hi << 4) | lo;
    }
    Ok(())
}

pub(crate) fn check(input: &[u8]) -> bool {
    input.iter().all(|&b| DECODE_LUT[b as usize] != NIL)
}
