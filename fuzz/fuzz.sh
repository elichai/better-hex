#!/usr/bin/env bash
# Run cargo-fuzz targets with a consistent build/sanitizer configuration.
# Used both locally and from .github/workflows/fuzz.yml so the two never
# drift apart.
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

usage() {
    cat <<EOF
Usage: $0 [-h|--help] [-l|--list] [TARGET...]

Run cargo-fuzz targets locally with the same configuration CI uses.

Positional args:
  TARGET    one or more targets to run.
            With no targets, every entry from --list is run sequentially.

Options:
  -h, --help    show this help and exit
  -l, --list    print the default target list and exit

Environment:
  FUZZ_SECONDS    time per target in seconds (default ${SECONDS_PER_TARGET})
  RSS_LIMIT_MB    libfuzzer RSS limit in MB (default ${RSS_LIMIT})

Examples:
  $0                            # run every default target for ${SECONDS_PER_TARGET}s each
  $0 oracle                     # run a single target
  FUZZ_SECONDS=300 $0 oracle    # five-minute campaign on one target
EOF
}

case "${1:-}" in
    -h|--help)
        usage
        exit 0
        ;;
    -l|--list)
        printf "%s\n" "${DEFAULT_TARGETS[@]}"
        exit 0
        ;;
esac

if [ $# -gt 0 ]; then
    TARGETS=("$@")
else
    TARGETS=("${DEFAULT_TARGETS[@]}")
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# Run from inside fuzz/ so rustup picks up fuzz/rust-toolchain.toml and uses
# the pinned nightly. cargo-fuzz finds the workspace via --manifest-path, so it
# works fine from here — running from the workspace root would bypass the
# toolchain file (rustup walks up from cwd, not from the manifest dir).
cd "$SCRIPT_DIR"

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
