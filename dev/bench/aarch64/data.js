window.BENCHMARK_DATA = {
  "lastUpdate": 1778152277376,
  "repoUrl": "https://github.com/elichai/better-hex",
  "entries": {
    "better-hex Benchmarks (aarch64)": [
      {
        "commit": {
          "author": {
            "email": "elichai.turkel@gmail.com",
            "name": "Elichai Turkel",
            "username": "elichai"
          },
          "committer": {
            "email": "elichai.turkel@gmail.com",
            "name": "Elichai Turkel",
            "username": "elichai"
          },
          "distinct": true,
          "id": "3871e416067c688ffaccf76462c0245823c82642",
          "message": "ci: replace macOS arm64 runners with Linux arm64 (Cobalt), add aarch64 bench coverage\n\nci.yml: the three NEON/aarch64 test entries (`Test (aarch64 NEON API)`,\n`Test (aarch64 NEON impl)`, `Test (aarch64 optional features)`) now run\non `ubuntu-24.04-arm` against `aarch64-unknown-linux-gnu` instead of\n`macos-14` against `aarch64-apple-darwin`. Same NEON coverage, cheaper\nrunner class, and consistent with the Linux x86_64 entries.\n\nbench.yml: matrix both `benchmark-pr` and `benchmark-push` over\n{x86_64, aarch64}. The PR job runs benches on both arches purely as a\nbuild/regression smoke test; the push job stores history per-arch:\n\n  - x86_64 → dev/bench/ (legacy path, existing dashboard URL preserved)\n  - aarch64 → dev/bench/aarch64/\n\nEach arch has its own data.js + index.html, so criterion's 115% alert\nthreshold compares like-for-like. The push matrix is serialized with\n`max-parallel: 1` because both arches push to gh-pages and a parallel\nrun would race on `git push`.\n\nNaming: github-action-benchmark `name:` includes the arch suffix so\nthe data series stay distinct even if a future migration colocates\nthe JS files.",
          "timestamp": "2026-05-06T23:48:53+03:00",
          "tree_id": "174488571817a440cb4c40b812cdff403dd3694b",
          "url": "https://github.com/elichai/better-hex/commit/3871e416067c688ffaccf76462c0245823c82642"
        },
        "date": 1778104621881,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/4",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/11",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/14",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/14",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/15",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/17",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/17",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/18",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/21",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/21",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/22",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/26",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/29",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 29,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/31",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 187,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/256",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 11506,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2143,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2171,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/2",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/3",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/4",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/5",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/6",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/7",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/9",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/12",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/13",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/14",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/15",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/18",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/20",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/21",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/22",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/25",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/28",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/29",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/30",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/31",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 192,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12187,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 4047,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 4025,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 33,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 34,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 33,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 34,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 34,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2417,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1698,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1259,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/3",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/6",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/10",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/11",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/14",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/17",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/18",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/19",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/20",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/21",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/22",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/23",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/25",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/26",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/27",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/28",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/29",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/30",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/31",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/32",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/256",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3288,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1227,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1227,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1268,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/5",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/6",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/6",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/7",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/12",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/12",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/20",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/21",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 118,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 213,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 215,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11749,
            "range": "± 47",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 10317,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 208,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 272,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "elichai.turkel@gmail.com",
            "name": "Elichai Turkel",
            "username": "elichai"
          },
          "committer": {
            "email": "elichai.turkel@gmail.com",
            "name": "Elichai Turkel",
            "username": "elichai"
          },
          "distinct": false,
          "id": "fdcfcced932239f4cea487fc4638c721a9fbe69b",
          "message": "perf(avx2): fuse two-chunk packus + vpermq in decode hot loop\n\ndecode_chunk_256 used to do its own pack+lane-fixup per chunk:\n  let packed16 = maddubs(...);      // 16 valid i16 in 256b reg\n  let packed8  = packus(p16, p16);  // self-pair → wastes half the output\n  let result   = permute4x64(p8, 0xD8);  // bring 16 valid bytes to low lane\nThat was 1 packus + 1 vpermq per chunk, plus a 128-bit store at the call\nsite (only the lower lane of `result` carried the valid bytes).\n\ndecode_avx2_inner always processes two chunks per loop iter, so the lane\nfixup now lives in the caller and combines both chunks at once:\n  packus(p0, p1) lane 0: [c0_lo_8B, c1_lo_8B]\n  packus(p0, p1) lane 1: [c0_hi_8B, c1_hi_8B]\n  permute4x64(combined, 0xD8): qwords (0, 2, 1, 3)\n    → [c0_lo_8B, c0_hi_8B, c1_lo_8B, c1_hi_8B] = full 32B output\n\nPer loop iter: 2× packus → 1×, 2× vpermq → 1×, 2× 128b store → 1× 256b\nstore. Per-iter `pmovmskb` is intentionally kept as documented in the\nmodule-level note (it runs on a port disjoint from the SIMD ALU on Zen\nand lifting it regresses by up to 43% on this μarch).\n\nCorrectness verified by the existing fuzz oracle and cross-arch\nproperty tests; SHA1-named corpus on the `fuzz-corpus` orphan branch\nexercises both lower- and upper-case decode paths.",
          "timestamp": "2026-05-07T00:04:46+03:00",
          "tree_id": "d079174abb92ab553760c35341dfde78c822f965",
          "url": "https://github.com/elichai/better-hex/commit/fdcfcced932239f4cea487fc4638c721a9fbe69b"
        },
        "date": 1778152276549,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/4",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/11",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/12",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/14",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/14",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/15",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/17",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/17",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/18",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/21",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/21",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/22",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/26",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/29",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/31",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 186,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/256",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 11501,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2146,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2141,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/2",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/3",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/4",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/5",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/6",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/7",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/9",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/12",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/13",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/14",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/15",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/18",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/20",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/21",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/22",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/25",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/28",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/29",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/30",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/31",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 192,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12173,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 4050,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 4022,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2407,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1687,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1261,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/3",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/6",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/10",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/11",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/14",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/17",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/18",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/19",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/20",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/21",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/22",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/23",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/25",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/26",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/27",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/28",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/29",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/30",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/31",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/32",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/256",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3283,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1223,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1221,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1268,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 43,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 46,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 48,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/5",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/6",
            "value": 50,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/6",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/7",
            "value": 52,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 50,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 50,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 51,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 51,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/12",
            "value": 53,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/12",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 55,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 57,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 58,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 53,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 53,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 53,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 55,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 55,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/20",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/21",
            "value": 56,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 56,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 57,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 57,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 58,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 59,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 59,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 60,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 61,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 61,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 62,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 118,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 63,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 218,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 215,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11815,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 10428,
            "range": "± 96",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 207,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 272,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}