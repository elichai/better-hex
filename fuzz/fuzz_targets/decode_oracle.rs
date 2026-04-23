//! Narrow decode-only oracle.
//!
//! Strict subset of `oracle.rs` — kept as a standalone target so a
//! decode-path fuzz campaign doesn't pay the overhead of the full
//! oracle's encode + roundtrip work. Any bug this finds will also be
//! reachable via `oracle.rs`; this target just iterates faster.

#![no_main]

use better_hex::bench_internals::{
    dispatched_check, dispatched_decode, scalar,
};
use libfuzzer_sys::fuzz_target;

fn naive_decode(input: &[u8]) -> Result<Vec<u8>, ()> {
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

fn decode_nibble(b: u8) -> Option<u8> {
    match b {
        b'0'..=b'9' => Some(b - b'0'),
        b'a'..=b'f' => Some(b - b'a' + 10),
        b'A'..=b'F' => Some(b - b'A' + 10),
        _ => None,
    }
}

fuzz_target!(|data: &[u8]| {
    // Only test even-length inputs: backend functions require even length.
    if data.len() % 2 != 0 {
        return;
    }

    let naive_result = naive_decode(data);
    let out_len = data.len() / 2;

    //  scalar::decode
    {
        let mut buf = vec![core::mem::MaybeUninit::uninit(); out_len];
        // SAFETY: `data` and `buf` are valid slices, data.len() == out_len * 2.
        let scalar_result =
            unsafe { scalar::decode(data.as_ptr(), buf.as_mut_ptr().cast(), out_len) };
        match (&naive_result, scalar_result.is_ok()) {
            (Ok(expected), true) => {
                let got: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
                assert_eq!(got, *expected, "scalar decode output mismatch");
            }
            (Err(()), false) => {}
            (Ok(_), false) => panic!("scalar decode: naive Ok but scalar Err"),
            (Err(()), true) => panic!("scalar decode: naive Err but scalar Ok"),
        }
    }

    //  dispatched_decode
    {
        let mut buf = vec![core::mem::MaybeUninit::uninit(); out_len];
        let disp_result = dispatched_decode(data, &mut buf);
        match (&naive_result, &disp_result) {
            (Ok(expected), Ok(())) => {
                let got: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
                assert_eq!(got, *expected, "dispatched decode output mismatch");
            }
            (Err(()), Err(_)) => {}
            (Ok(_), Err(e)) => panic!("dispatched decode: naive Ok but dispatched Err({e:?})"),
            (Err(()), Ok(())) => panic!("dispatched decode: naive Err but dispatched Ok"),
        }
    }

    //  check functions: all must agree with naive validity
    let naive_valid = naive_result.is_ok();

    let scalar_valid = scalar::check(data);
    assert_eq!(
        scalar_valid, naive_valid,
        "scalar check disagrees: input={data:?}"
    );

    let disp_valid = dispatched_check(data);
    assert_eq!(
        disp_valid, naive_valid,
        "dispatched check disagrees: input={data:?}"
    );
});
