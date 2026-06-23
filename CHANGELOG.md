# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1](https://github.com/elichai/better-hex/compare/v1.0.0...v1.0.1) - 2026-06-23

### Added

- *(hex_str)* [**breaking**] make HexStr::const_decode infallible

### Other

- fail-fast on clippy — drop continue-on-error and the aggregate gate
- lint the benches by enabling bench features in the all-targets step
- fold per-target clippy into one multi-target feature powerset
- use cargo-hack feature powerset for clippy; trim test matrix
- lint cross targets with --lib instead of installing cross gcc
- collapse clippy matrix into one sequential job; fix aarch64 toolchain
- run clippy on all supported targets
- Make `Error: core::error::Error` impl unconditional
- Add Tier 1 lint policy (Cargo.toml [lints] + lib-scoped no_std hygiene)
- Accept `impl AsRef<[u8]>` for byte inputs across encode/decode/check
- Add pre-commit hook mirroring CI fmt + clippy
- *(exhaustive)* cover HexStr::const_decode across sizes under Miri
- *(cargo)* add repository, keywords, and categories metadata
- align release-plz workflow with upstream quickstart
