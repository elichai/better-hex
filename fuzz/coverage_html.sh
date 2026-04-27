#!/usr/bin/env bash
# Render the merged fuzz profdata as an HTML report covering both
# better-hex/src and the fuzz harnesses. Open it after generation.
#
# Prereqs: cargo llvm-cov runs with --dep-coverage better-hex have populated
# target/llvm-cov-target/fuzz.profdata and the three instrumented binaries.
set -euo pipefail

SYSROOT="$(rustc --print sysroot)"
HOST="$(rustc -vV | sed -n 's|host: ||p')"
LLVM_COV="$SYSROOT/lib/rustlib/$HOST/bin/llvm-cov"

PROFDATA="target/llvm-cov-target/fuzz.profdata"
BIN_DIR="target/llvm-cov-target/debug"
OUT_DIR="target/llvm-cov/html"

"$LLVM_COV" show \
  -instr-profile="$PROFDATA" \
  -Xdemangler=rustfilt \
  -format=html \
  -output-dir="$OUT_DIR" \
  -show-line-counts-or-regions \
  -show-instantiations \
  -ignore-filename-regex='/\.cargo/(registry|git)|/rustc/|rustlib/src/rust/' \
  "$BIN_DIR/oracle" \
  -object="$BIN_DIR/api" \
  -object="$BIN_DIR/hex_str"

echo "Wrote: $OUT_DIR/index.html"
open "$OUT_DIR/index.html"
