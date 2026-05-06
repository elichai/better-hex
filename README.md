# better-hex fuzz corpus

This is an **orphan branch** of [`better-hex`](https://github.com/elichai/better-hex)
— it has no shared history with `main`, so it can grow indefinitely without
ever needing to be rebased.

It contains only fuzzing corpus data. There is no source code, no Cargo files,
no CI config here.

## Layout

Each top-level directory is the libFuzzer corpus for one fuzz target:

```
oracle/    fuzz/fuzz_targets/oracle.rs
api/       fuzz/fuzz_targets/api.rs
hex_str/   fuzz/fuzz_targets/hex_str.rs
```

Filenames follow libFuzzer convention: `sha1(file_contents)`. Identical inputs
collide on filename, so adding a duplicate is a no-op at the filesystem level
and `cp -n` between corpus sets is free deduplication.

## How CI uses it

`.github/workflows/fuzz.yml` on `main` checks this branch out into
`fuzz/corpus/` before running `./fuzz/fuzz.sh`, then pushes any newly-found
inputs back here at the end of each run. PRs from forks read but do not push.

## Local workflow

```sh
# Once, in your better-hex clone:
git worktree add ../better-hex-corpus fuzz-corpus

# Each time you fuzz locally and want to share findings:
cd ../better-hex-corpus
cp -n ../better-hex/fuzz/corpus/oracle/* oracle/
git add oracle/
git commit -m "corpus: oracle additions from local run"
git push
```

## Cross-architecture minimization

`cargo fuzz cmin` only retains inputs that contribute coverage on the
*current* architecture, so minimizing on one host can drop inputs that
exercise SIMD paths only present on another. The recommended periodic
maintenance flow is:

1. Pool {host A corpus + host B corpus} into one dir per target.
2. `cargo fuzz cmin <target>` on each target architecture independently.
3. Union the per-architecture minimized sets (`cp -n` between dirs — SHA1
   filenames make this a free deduplication).

This preserves inputs that matter on either architecture's code path.
