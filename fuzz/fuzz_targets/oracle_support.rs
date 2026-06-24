use better_hex::bench_internals::scalar;
use core::mem::MaybeUninit;

pub fn naive_encode(input: &[u8], upper: bool) -> Vec<u8> {
    let table = if upper {
        b"0123456789ABCDEF"
    } else {
        b"0123456789abcdef"
    };
    let mut out = Vec::with_capacity(input.len() * 2);
    for &byte in input {
        out.push(table[(byte >> 4) as usize]);
        out.push(table[(byte & 0x0f) as usize]);
    }
    out
}

pub fn naive_decode(input: &[u8]) -> Result<Vec<u8>, ()> {
    if input.len() % 2 != 0 {
        return Err(());
    }

    let mut out = Vec::with_capacity(input.len() / 2);
    for pair in input.chunks_exact(2) {
        let hi = decode_nibble(pair[0]).ok_or(())?;
        let lo = decode_nibble(pair[1]).ok_or(())?;
        out.push((hi << 4) | lo);
    }
    Ok(out)
}

pub fn is_hex_ascii(input: &[u8]) -> bool {
    input.iter().all(|byte| byte.is_ascii_hexdigit())
}

pub fn assert_encode_matches(
    label: &str,
    data: &[u8],
    expected: &[u8],
    upper: bool,
    encode_fn: impl FnOnce(&[u8], &mut [MaybeUninit<u8>], bool),
) {
    let mut buf = vec![MaybeUninit::uninit(); expected.len()];
    encode_fn(data, &mut buf, upper);
    let result = assume_init_vec(buf);
    assert_eq!(result, expected, "{label} mismatch");
}

pub fn assert_decode_matches(
    label: &str,
    hex: &[u8],
    expected: &Result<Vec<u8>, ()>,
    decode_fn: impl FnOnce(&[u8], &mut [MaybeUninit<u8>]) -> bool,
) {
    let mut buf = vec![MaybeUninit::uninit(); hex.len() / 2];
    let decoded = decode_fn(hex, &mut buf);
    match (expected, decoded) {
        (Ok(expected), true) => {
            let got = assume_init_vec(buf);
            assert_eq!(got, *expected, "{label} output mismatch");
        }
        (Err(()), false) => {}
        (Ok(_), false) => panic!("{label}: naive Ok but decode failed"),
        (Err(()), true) => panic!("{label}: naive Err but decode succeeded"),
    }
}

pub fn scalar_encode(data: &[u8], out: &mut [MaybeUninit<u8>], upper: bool) {
    // SAFETY: `data` and `out` are valid slices, out.len() == data.len() * 2 by caller contract.
    unsafe { scalar::encode(data.as_ptr(), out.as_mut_ptr().cast(), data.len(), upper) }
}

pub fn scalar_decode(hex: &[u8], out: &mut [MaybeUninit<u8>]) -> bool {
    // SAFETY: `hex` and `out` are valid slices, hex.len() == out.len() * 2 by caller contract.
    unsafe { scalar::decode(hex.as_ptr(), out.as_mut_ptr().cast(), out.len()) }.to_bool_vartime()
}

fn decode_nibble(byte: u8) -> Option<u8> {
    match byte {
        b'0'..=b'9' => Some(byte - b'0'),
        b'a'..=b'f' => Some(byte - b'a' + 10),
        b'A'..=b'F' => Some(byte - b'A' + 10),
        _ => None,
    }
}

fn assume_init_vec(buf: Vec<MaybeUninit<u8>>) -> Vec<u8> {
    buf.into_iter()
        .map(|byte| {
            // SAFETY: callers only pass buffers after successful encode/decode paths that initialize all bytes.
            unsafe { byte.assume_init() }
        })
        .collect()
}
