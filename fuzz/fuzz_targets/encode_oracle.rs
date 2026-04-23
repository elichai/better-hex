//! Narrow encode-only oracle.
//!
//! Strict subset of `oracle.rs` — kept as a standalone target so an
//! encode-path fuzz campaign doesn't pay the overhead of the full
//! oracle's decode + roundtrip work. Any bug this finds will also be
//! reachable via `oracle.rs`; this target just iterates faster.

#![no_main]

use better_hex::bench_internals::{
    dispatched_encode, scalar,
};
use libfuzzer_sys::fuzz_target;

fn naive_encode_lower(input: &[u8]) -> Vec<u8> {
    let mut out = Vec::with_capacity(input.len() * 2);
    for &byte in input {
        out.push(b"0123456789abcdef"[(byte >> 4) as usize]);
        out.push(b"0123456789abcdef"[(byte & 0x0f) as usize]);
    }
    out
}

fn naive_encode_upper(input: &[u8]) -> Vec<u8> {
    let mut out = Vec::with_capacity(input.len() * 2);
    for &byte in input {
        out.push(b"0123456789ABCDEF"[(byte >> 4) as usize]);
        out.push(b"0123456789ABCDEF"[(byte & 0x0f) as usize]);
    }
    out
}

fuzz_target!(|data: &[u8]| {
    let expected_lower = naive_encode_lower(data);
    let out_len = data.len() * 2;

    // scalar::encode (lower)
    {
        let mut buf = vec![core::mem::MaybeUninit::uninit(); out_len];
        // SAFETY: `data` and `buf` are valid slices with matching lengths.
        unsafe { scalar::encode(data.as_ptr(), buf.as_mut_ptr().cast(), data.len(), false) };
        let result: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        assert_eq!(result, expected_lower, "scalar lower mismatch");
    }

    // dispatched_encode (lower)
    {
        let mut buf = vec![core::mem::MaybeUninit::uninit(); out_len];
        dispatched_encode(data, &mut buf, false).unwrap();
        let result: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        assert_eq!(result, expected_lower, "dispatched lower mismatch");
    }

    // uppercase: dispatched vs scalar must match naive_upper
    let expected_upper = naive_encode_upper(data);

    {
        let mut buf_scalar = vec![core::mem::MaybeUninit::uninit(); out_len];
        let mut buf_dispatched = vec![core::mem::MaybeUninit::uninit(); out_len];

        // SAFETY: valid slices with matching lengths.
        unsafe { scalar::encode(data.as_ptr(), buf_scalar.as_mut_ptr().cast(), data.len(), true) };
        dispatched_encode(data, &mut buf_dispatched, true).unwrap();

        let scalar_upper: Vec<u8> = buf_scalar.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        let dispatched_upper: Vec<u8> = buf_dispatched.into_iter().map(|b| unsafe { b.assume_init() }).collect();

        assert_eq!(scalar_upper, expected_upper, "scalar upper mismatch");
        assert_eq!(dispatched_upper, expected_upper, "dispatched upper mismatch");
        assert_eq!(scalar_upper, dispatched_upper, "scalar vs dispatched upper mismatch");
    }
});
