//! Valgrind-based constant-time verification.
//!
//! The trick: mark secret data as "uninitialized" via Valgrind client requests.
//! Any branch or memory-index dependent on that data triggers a Valgrind
//! "Conditional jump or move depends on uninitialised value(s)" error.
//! This catches exactly the class of bugs we care about: data-dependent
//! branches and secret-dependent memory accesses.
//!
//! When NOT running under Valgrind the client request instructions are
//! effectively no-ops (they execute as a harmless rotate+xchg sequence),
//! so the test binary works normally — it just doesn't verify CT.
//!
//! Run with:
//! ```sh
//! cargo test --features ct-test --test ct_valgrind --no-run
//! valgrind --tool=memcheck --error-exitcode=1 --leak-check=no \
//!     target/debug/deps/ct_valgrind-*
//! ```

#![cfg(feature = "ct-test")]

// Sizes that exercise scalar (1), SSSE3 (16), AVX2 (32), and larger tails.
const SIZES: &[usize] = &[1, 16, 32, 64, 128, 256];

// ── Valgrind client request helpers ────────────────────────────────────────
//
// These implement the Valgrind client request mechanism using inline
// assembly. The "magic" instruction sequence is intercepted by Valgrind;
// on bare hardware it executes as a harmless no-op (rotate + xchg).
//
// Reference: valgrind/valgrind.h, valgrind/memcheck.h
//
// Memcheck request IDs (from memcheck.h):
//   VG_USERREQ__MAKE_MEM_NOACCESS  = VG_USERREQ_TOOL_BASE('M','C')     = 0x4D43_0000
//   VG_USERREQ__MAKE_MEM_UNDEFINED = VG_USERREQ_TOOL_BASE('M','C') + 1 = 0x4D43_0001
//   VG_USERREQ__MAKE_MEM_DEFINED   = VG_USERREQ_TOOL_BASE('M','C') + 2 = 0x4D43_0002

const VG_MAKE_MEM_UNDEFINED: usize = 0x4D43_0001;
const VG_MAKE_MEM_DEFINED: usize = 0x4D43_0002;

/// Issue a Valgrind client request (x86_64).
///
/// The args array is `[request, arg1, arg2, arg3, arg4, arg5]`.
/// Returns the Valgrind-provided "default" value (0 when not under Valgrind).
#[cfg(target_arch = "x86_64")]
#[inline(always)]
fn valgrind_do_client_request(default: usize, args: &[usize; 6]) -> usize {
    let result: usize;
    unsafe {
        core::arch::asm!(
            // Load the pointer to the args array into rax
            // The magic sequence: Valgrind intercepts this rotate+xchg
            "rol rdi, 3",
            "rol rdi, 13",
            "rol rdi, 61",
            "rol rdi, 51",
            "xchg rbx, rbx",
            // rdx = default, rax = &args -> result in rdx
            inout("rdx") default => result,
            in("rax") args.as_ptr(),
            // rdi is used as scratch by the preamble rotates
            out("rdi") _,
            options(nostack),
        );
    }
    result
}

/// Issue a Valgrind client request (aarch64).
#[cfg(target_arch = "aarch64")]
#[inline(always)]
fn valgrind_do_client_request(default: usize, args: &[usize; 6]) -> usize {
    let result: usize;
    unsafe {
        core::arch::asm!(
            // Magic sequence for aarch64
            "ror x12, x12, #3",
            "ror x12, x12, #13",
            "ror x12, x12, #61",
            "ror x12, x12, #51",
            "orr x10, x10, x10",
            inout("x3") default => result,
            in("x4") args.as_ptr(),
            out("x12") _,
            options(nostack),
        );
    }
    result
}

/// Stub for unsupported architectures — always returns default.
#[cfg(not(any(target_arch = "x86_64", target_arch = "aarch64")))]
#[inline(always)]
fn valgrind_do_client_request(default: usize, _args: &[usize; 6]) -> usize {
    default
}

/// Tell Valgrind to treat `data` as uninitialized ("poisoned").
fn poison(data: &[u8]) {
    let args = [VG_MAKE_MEM_UNDEFINED, data.as_ptr() as usize, data.len(), 0, 0, 0];
    valgrind_do_client_request(0, &args);
}

/// Tell Valgrind to treat `data` as fully defined ("unpoisoned").
fn unpoison(data: &[u8]) {
    let args = [VG_MAKE_MEM_DEFINED, data.as_ptr() as usize, data.len(), 0, 0, 0];
    valgrind_do_client_request(0, &args);
}

/// Unpoison an arbitrary value by reinterpreting it as a byte slice.
fn unpoison_val<T>(val: &T) {
    let ptr = val as *const T as *const u8;
    let len = core::mem::size_of_val(val);
    let args = [VG_MAKE_MEM_DEFINED, ptr as usize, len, 0, 0, 0];
    valgrind_do_client_request(0, &args);
}

// ── Encode CT ──────────────────────────────────────────────────────────────

#[test]
fn encode_ct() {
    for &size in SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let mut output = vec![0u8; size * 2];

        // Poison the input — encode must not branch on these values.
        poison(&input);

        let result = better_hex::encode_to_slice(&input, &mut output);

        // Unpoison the Result (which borrows output) via raw pointer
        // before calling is_ok(), then release the borrow.
        unpoison_val(&result);
        let ok = result.is_ok();
        unpoison(&output);

        assert!(ok, "encode failed at size {size}");
    }
}

// ── Decode CT ──────────────────────────────────────────────────────────────

#[test]
fn decode_ct() {
    for &size in SIZES {
        // First, produce valid hex to decode.
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let hex: String = better_hex::encode_string(&input);
        let hex_bytes = hex.into_bytes();

        let mut output = vec![0u8; size];

        // Poison the hex input — decode must not branch on data values.
        poison(&hex_bytes);

        let result = better_hex::decode_to_slice(&hex_bytes, &mut output);

        // Unpoison the Result before inspecting, then release the borrow.
        unpoison_val(&result);
        let ok = result.is_ok();
        unpoison(&output);

        assert!(ok, "decode failed at size {size}");
    }
}

// ── Check CT ───────────────────────────────────────────────────────────────

#[test]
fn check_ct() {
    for &size in SIZES {
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let hex: String = better_hex::encode_string(&input);
        let hex_bytes = hex.into_bytes();

        // Poison the hex input — check must not branch on data values.
        poison(&hex_bytes);

        let result = better_hex::check(&hex_bytes);

        // Unpoison the bool before branching on it.
        unpoison_val(&result);

        assert!(result, "check returned false at size {size}");
    }
}

// ── Decode-invalid CT (error accumulation must not early-exit) ─────────────

#[test]
fn decode_invalid_ct() {
    for &size in SIZES {
        // Build a hex string then corrupt some bytes to make it invalid.
        let input: Vec<u8> = (0..size).map(|i| (i as u8).wrapping_mul(37)).collect();
        let hex: String = better_hex::encode_string(&input);
        let mut hex_bytes = hex.into_bytes();

        // Sprinkle invalid bytes. Use 0xFF which is never valid hex ASCII.
        for i in (0..hex_bytes.len()).step_by(7) {
            hex_bytes[i] = 0xFF;
        }

        let mut output = vec![0u8; size];

        // Poison the hex input — the decoder must process every byte
        // without early-exiting based on which byte was invalid.
        poison(&hex_bytes);

        let result = better_hex::decode_to_slice(&hex_bytes, &mut output);

        // The Result carries taint from the error accumulator.
        // Unpoison it before branching on Ok/Err.
        unpoison_val(&result);
        let ok = result.is_ok();
        unpoison(&output);

        assert!(!ok, "decode should have failed at size {size}");
    }
}
