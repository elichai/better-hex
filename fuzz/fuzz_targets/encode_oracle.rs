#![no_main]

use better_hex::bench_internals::{
    ct_scalar, dispatched_ct_encode, dispatched_encode, scalar,
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
        scalar::encode::<false>(data, &mut buf);
        let result: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        assert_eq!(result, expected_lower, "scalar lower mismatch");
    }

    // ct_scalar::encode (lower)
    {
        let mut buf = vec![core::mem::MaybeUninit::uninit(); out_len];
        ct_scalar::encode::<false>(data, &mut buf);
        let result: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        assert_eq!(result, expected_lower, "ct_scalar lower mismatch");
    }

    // dispatched_encode (lower)
    {
        let mut buf = vec![core::mem::MaybeUninit::uninit(); out_len];
        dispatched_encode::<false>(data, &mut buf);
        let result: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        assert_eq!(result, expected_lower, "dispatched lower mismatch");
    }

    // dispatched_ct_encode (lower)
    {
        let mut buf = vec![core::mem::MaybeUninit::uninit(); out_len];
        dispatched_ct_encode::<false>(data, &mut buf);
        let result: Vec<u8> = buf.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        assert_eq!(result, expected_lower, "dispatched_ct lower mismatch");
    }

    // uppercase: dispatched vs scalar must match naive_upper
    let expected_upper = naive_encode_upper(data);

    {
        let mut buf_scalar = vec![core::mem::MaybeUninit::uninit(); out_len];
        let mut buf_dispatched = vec![core::mem::MaybeUninit::uninit(); out_len];

        scalar::encode::<true>(data, &mut buf_scalar);
        dispatched_encode::<true>(data, &mut buf_dispatched);

        let scalar_upper: Vec<u8> = buf_scalar.into_iter().map(|b| unsafe { b.assume_init() }).collect();
        let dispatched_upper: Vec<u8> = buf_dispatched.into_iter().map(|b| unsafe { b.assume_init() }).collect();

        assert_eq!(scalar_upper, expected_upper, "scalar upper mismatch");
        assert_eq!(dispatched_upper, expected_upper, "dispatched upper mismatch");
        assert_eq!(scalar_upper, dispatched_upper, "scalar vs dispatched upper mismatch");
    }
});
