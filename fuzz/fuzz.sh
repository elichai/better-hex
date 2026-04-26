#!/usr/bin/env bash
# Run cargo-fuzz targets with a consistent build/sanitizer configuration.
# Used both locally and from .github/workflows/fuzz.yml so the two never
# drift apart.
#
# Usage:
#     ./fuzz/fuzz.sh                # run every target in DEFAULT_TARGETS
#     ./fuzz/fuzz.sh oracle         # run a single target
#     ./fuzz/fuzz.sh oracle api     # run a subset
#
# Environment:
#     FUZZ_SECONDS    time budget per target in seconds (default 60)
#     RSS_LIMIT_MB    libfuzzer RSS limit in MB (default 2048)
#
# Build flags rationale:
#     --release            keep SIMD-optimized hot paths on the fuzz target
#     --debug-assertions   keep debug_assert! and integer overflow checks
#     --careful            instrument std with extra runtime checks
#                          (requires the rust-src component on nightly)
#     --sanitizer address  catch heap/stack/global out-of-bounds accesses

set -euo pipefail

DEFAULT_TARGETS=(oracle api hex_str)
SECONDS_PER_TARGET=${FUZZ_SECONDS:-60}
RSS_LIMIT=${RSS_LIMIT_MB:-2048}

if [ $# -gt 0 ]; then
    TARGETS=("$@")
else
    TARGETS=("${DEFAULT_TARGETS[@]}")
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$SCRIPT_DIR/.."

for target in "${TARGETS[@]}"; do
    echo "==> fuzz: $target (${SECONDS_PER_TARGET}s)"
    cargo fuzz run \
        --release \
        --debug-assertions \
        --careful \
        --sanitizer address \
        "$target" \
        -- \
        -max_total_time="$SECONDS_PER_TARGET" \
        -rss_limit_mb="$RSS_LIMIT"
done
