#![no_main]

use better_hex::bench_internals::{
    ct_scalar, dispatched_check, dispatched_ct_check, dispatched_ct_decode, dispatched_ct_encode,
    dispatched_decode, dispatched_encode, scalar,
};
use core::mem::MaybeUninit;
use libfuzzer_sys::fuzz_target;

fn naive_encode(input: &[u8], upper: bool) -> Vec<u8> {
    let table = if upper { b"0123456789ABCDEF" } else { b"0123456789abcdef" };
    let mut out = Vec::with_capacity(input.len() * 2);
    for &byte in input {
        out.push(table[(byte >> 4) as usize]);
        out.push(table[(byte & 0x0f) as usize]);
    }
    out
}

fn naive_decode(input: &[u8]) -> Option<Vec<u8>> {
    if input.len() % 2 != 0 {
        return None;
    }
    let mut out = Vec::with_capacity(input.len() / 2);
    for pair in input.chunks_exact(2) {
        let hi = naive_nibble(pair[0])?;
        let lo = naive_nibble(pair[1])?;
        out.push((hi << 4) | lo);
    }
    Some(out)
}

fn naive_nibble(b: u8) -> Option<u8> {
    match b {
        b'0'..=b'9' => Some(b - b'0'),
        b'a'..=b'f' => Some(b - b'a' + 10),
        b'A'..=b'F' => Some(b - b'A' + 10),
        _ => None,
    }
}

/// Encode `data` through `encode_fn`, assert it matches `expected`.
fn check_encode(
    label: &str,
    data: &[u8],
    expected: &[u8],
    encode_fn: impl Fn(&[u8], &mut [MaybeUninit<u8>]),
) {
    let mut buf = vec![MaybeUninit::uninit(); expected.len()];
    encode_fn(data, &mut buf);
    let result: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
    assert_eq!(result, expected, "{label} mismatch");
}

/// Decode `hex` through `decode_fn`, compare against `naive_result`.
fn check_decode(
    label: &str,
    hex: &[u8],
    naive_result: &Option<Vec<u8>>,
    decode_fn: impl Fn(&[u8], &mut [MaybeUninit<u8>]) -> Result<(), better_hex::Error>,
) {
    let mut buf = vec![MaybeUninit::uninit(); hex.len() / 2];
    let result = decode_fn(hex, &mut buf);
    match (naive_result, &result) {
        (Some(expected), Ok(())) => {
            let got: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
            assert_eq!(got, *expected, "{label} output mismatch");
        }
        (None, Err(_)) => {}
        (Some(_), Err(e)) => panic!("{label}: naive Ok but got Err({e:?})"),
        (None, Ok(())) => panic!("{label}: naive Err but got Ok"),
    }
}

fuzz_target!(|data: &[u8]| {
    let expected_lower = naive_encode(data, false);
    let expected_upper = naive_encode(data, true);

    // Encode: all paths must match naive oracle
    check_encode("scalar lower", data, &expected_lower, |d, o| scalar::encode::<false>(d, o));
    check_encode("scalar upper", data, &expected_upper, |d, o| scalar::encode::<true>(d, o));
    check_encode("ct_scalar lower", data, &expected_lower, |d, o| ct_scalar::encode::<false>(d, o));
    check_encode("dispatched lower", data, &expected_lower, |d, o| dispatched_encode::<false>(d, o));
    check_encode("dispatched upper", data, &expected_upper, |d, o| dispatched_encode::<true>(d, o));
    check_encode("dispatched_ct lower", data, &expected_lower, |d, o| dispatched_ct_encode::<false>(d, o));

    // Decode + check: only on even-length inputs
    if data.len() % 2 != 0 {
        return;
    }

    let naive_result = naive_decode(data);
    let naive_valid = naive_result.is_some();

    check_decode("scalar", data, &naive_result, scalar::decode);
    check_decode("ct_scalar", data, &naive_result, ct_scalar::decode);
    check_decode("dispatched", data, &naive_result, dispatched_decode);
    check_decode("dispatched_ct", data, &naive_result, dispatched_ct_decode);

    assert_eq!(scalar::check(data), naive_valid, "scalar check disagrees");
    assert_eq!(ct_scalar::check(data), naive_valid, "ct_scalar check disagrees");
    assert_eq!(dispatched_check(data), naive_valid, "dispatched check disagrees");
    assert_eq!(dispatched_ct_check(data), naive_valid, "dispatched_ct check disagrees");

    // Roundtrip: encode then decode must recover original
    if !data.is_empty() {
        let mut decoded = vec![0u8; data.len()];
        better_hex::decode_to_slice(&expected_lower, &mut decoded).expect("roundtrip decode failed");
        assert_eq!(decoded, data, "roundtrip mismatch");
    }
});
