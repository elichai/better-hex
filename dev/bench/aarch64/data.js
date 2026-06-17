window.BENCHMARK_DATA = {
  "lastUpdate": 1781704096418,
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
          "distinct": true,
          "id": "bf5104b4089697c679d5ecf593db61ef835b2258",
          "message": "test(ct): inline CT helpers and reuse input/output buffers\n\nTwo small refactors that don't change test semantics:\n\n- Switch helpers from generic `F: Fn(...)` closures to `unsafe fn`\n  pointers + `#[inline(always)]`. Safe scalar/neon `_inner` fns coerce\n  to `unsafe fn` at the call sites, so existing tests still compile.\n  Inlining the helper into each test means valgrind sees direct calls\n  into the backend under test rather than a generic trampoline, which\n  makes the resulting traces easier to read when a CT regression fires.\n\n- Hoist the `input` and `output` Vec allocations above the size loops\n  and call `resize(size, 0)` per iteration. Cuts per-iteration alloc\n  churn; valgrind runs are slow enough that this matters in practice.",
          "timestamp": "2026-05-10T17:10:28+03:00",
          "tree_id": "01cf0532e766131173d471832c2fd7434f36bf05",
          "url": "https://github.com/elichai/better-hex/commit/bf5104b4089697c679d5ecf593db61ef835b2258"
        },
        "date": 1778426276767,
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
            "value": 27,
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
            "value": 28,
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
            "value": 16,
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
            "value": 28,
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
            "value": 11490,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2130,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2129,
            "range": "± 1",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
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
            "value": 20,
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
            "value": 22,
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
            "value": 8,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 26,
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
            "value": 30,
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
            "value": 33,
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
            "value": 13,
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
            "value": 18,
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
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 37,
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
            "value": 41,
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
            "value": 9,
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
            "value": 190,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12131,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3487,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3488,
            "range": "± 1",
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
            "value": 13,
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
            "value": 38,
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
            "value": 38,
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
            "value": 35,
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
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 16,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 16,
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
            "value": 14,
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
            "value": 13,
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
            "value": 34,
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
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 35,
            "range": "± 1",
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
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 34,
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
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 35,
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
            "value": 2406,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1704,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1261,
            "range": "± 3",
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
            "value": 6,
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
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/256",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/256",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3537,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1453,
            "range": "± 62",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1397,
            "range": "± 76",
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
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1295,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 35,
            "range": "± 0",
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
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 78,
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
            "value": 80,
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
            "value": 87,
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
            "value": 93,
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
            "value": 99,
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
            "value": 76,
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
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 46,
            "range": "± 0",
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
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 94,
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
            "value": 88,
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
            "value": 98,
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
            "value": 101,
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
            "value": 108,
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
            "value": 82,
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
            "value": 88,
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
            "value": 94,
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
            "value": 96,
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
            "value": 102,
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
            "value": 108,
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
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 105,
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
            "value": 55,
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
            "value": 112,
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
            "value": 119,
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
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 214,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 210,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11803,
            "range": "± 50",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 10382,
            "range": "± 105",
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
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 207,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 266,
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
          "distinct": true,
          "id": "0e04fb3c099a26f83c5bbf40f450800d018e475d",
          "message": "fix(ct): accept unsafe fn pointer in test_check_ct\n\nCI break in 25630865253: the x86 CT modules call test_check_ct with\n`x86::check_*_inner`, which are `unsafe fn(&[u8]) -> {i32,u64}`.\ntest_check_ct still required `F: Fn(&[u8]) -> T`, and the closure\ntrait doesn't accept unsafe fn pointers without an explicit `||\nunsafe { ... }` wrapper.\n\nMatch the shape used by the four sibling helpers (test_encode_ct,\ntest_decode_ct, test_decode_invalid_ct, test_check_invalid_ct):\ntake `unsafe fn(&[u8]) -> T` directly, mark `#[inline(always)]`.\nSafe scalar/neon `check_inner` fns coerce to `unsafe fn` at the call\nsites, so existing tests still compile.\n\nVerified by `cargo check --target x86_64-unknown-linux-gnu --features\nct-test --tests --release` (the host build I used for the previous\ncommit only exercised the scalar+neon CT paths and missed this).",
          "timestamp": "2026-05-10T17:22:51+03:00",
          "tree_id": "874d2105ec5d87787a5db6622612b6934e4c9f43",
          "url": "https://github.com/elichai/better-hex/commit/0e04fb3c099a26f83c5bbf40f450800d018e475d"
        },
        "date": 1778427018124,
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
            "value": 16,
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
            "value": 28,
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
            "value": 188,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/256",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 11595,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2210,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2161,
            "range": "± 26",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
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
            "value": 20,
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
            "value": 22,
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
            "value": 8,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 26,
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
            "value": 30,
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
            "value": 33,
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
            "value": 13,
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
            "value": 18,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 37,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 41,
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
            "value": 9,
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
            "value": 191,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12184,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3600,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3567,
            "range": "± 37",
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
            "value": 13,
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
            "value": 38,
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
            "value": 37,
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
            "value": 35,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 14,
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
            "value": 13,
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 14,
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
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 13,
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
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 33,
            "range": "± 1",
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
            "value": 33,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 34,
            "range": "± 1",
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
            "range": "± 1",
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 13,
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
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 35,
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
            "value": 2720,
            "range": "± 61",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1734,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1312,
            "range": "± 16",
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
            "value": 3,
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
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/256",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/256",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3361,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1293,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1313,
            "range": "± 26",
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
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1293,
            "range": "± 10",
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
            "value": 66,
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
            "value": 73,
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
            "value": 78,
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
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/6",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/6",
            "value": 93,
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
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 43,
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
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 81,
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
            "value": 87,
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
            "value": 94,
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
            "value": 101,
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
            "value": 73,
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
            "value": 82,
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
            "value": 88,
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
            "value": 95,
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
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 96,
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
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 108,
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
            "value": 92,
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
            "value": 98,
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
            "value": 105,
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
            "value": 112,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 119,
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
            "value": 81,
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
            "value": 210,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11768,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 10139,
            "range": "± 76",
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
            "value": 59,
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
            "value": 71,
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
            "value": 94,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 209,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 266,
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
          "distinct": true,
          "id": "d06ec3d38ac5c728a642b206e26bf7b7eac2c18f",
          "message": "ci: enforce -D warnings on doctest compilation\n\nThe Docs job already runs `cargo doc -D warnings`, but `cargo doc`\ndoesn't compile or run doctests — rustdoc only compiles each doctest\nas part of `cargo test`, governed by RUSTDOCFLAGS rather than RUSTFLAGS.\nWithout this, warnings emitted while compiling doc examples (broken\nintra-doc links, unused imports, deprecations) slip past CI.\n\nAdd RUSTDOCFLAGS=\"-D warnings\" to both the main test matrix step and\nthe WASM test step. The WASM entry also keeps `-C target-feature=+simd128`\nso doctests compile against the same target feature as the regular test\nbinary.",
          "timestamp": "2026-05-12T13:39:49+03:00",
          "tree_id": "7b2a8c997ee1d453bece3c0e3e020dbdcb3635a4",
          "url": "https://github.com/elichai/better-hex/commit/d06ec3d38ac5c728a642b206e26bf7b7eac2c18f"
        },
        "date": 1778588100751,
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
            "value": 8,
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
            "value": 13,
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
            "value": 20,
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
            "value": 16,
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
            "value": 188,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/256",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 11637,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2382,
            "range": "± 325",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2382,
            "range": "± 24",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
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
            "value": 20,
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
            "value": 22,
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
            "value": 8,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/18",
            "value": 23,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 26,
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
            "value": 30,
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
            "value": 33,
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
            "value": 13,
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
            "value": 18,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 37,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 41,
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
            "value": 9,
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
            "value": 191,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12135,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3511,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3497,
            "range": "± 15",
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
            "value": 36,
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
            "value": 37,
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
            "value": 37,
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
            "value": 37,
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
            "value": 38,
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
            "value": 38,
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
            "value": 39,
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
            "range": "± 1",
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
            "value": 35,
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
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 33,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 35,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 33,
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
            "range": "± 1",
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 33,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 16,
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
            "value": 16,
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
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 33,
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
            "value": 35,
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
            "value": 2432,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1715,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1258,
            "range": "± 1",
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
            "value": 6,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3279,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1222,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1219,
            "range": "± 0",
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
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1257,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 35,
            "range": "± 0",
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
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 78,
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
            "value": 80,
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
            "value": 87,
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
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/7",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 99,
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
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 44,
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
            "value": 87,
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
            "value": 94,
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
            "value": 88,
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
            "value": 101,
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
            "value": 73,
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
            "value": 82,
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
            "value": 88,
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
            "value": 94,
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
            "value": 96,
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
            "value": 102,
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
            "value": 108,
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
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 54,
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
            "value": 112,
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
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 213,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 209,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11788,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 9899,
            "range": "± 10",
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
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 207,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 266,
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
          "id": "1234f7edd531307578bb3f6807150d3a4454be05",
          "message": "ci(miri): cover AVX-512 BW and VBMI backends under Miri\n\nRecent nightly Miri (>= 2026-05-16) added support for\n`_mm512_permutex2var_epi8` (`vpermi2b`), the intrinsic in\n`encode_avx512_inner` that previously forced the Miri matrix to stop at\nAVX2. Add two new matrix entries that toggle `+avx512bw` and\n`+avx512vbmi` so Miri now interprets `decode_avx512`, `check_avx512`,\nand `encode_avx512` directly. README matrix and surrounding prose\nupdated to match.",
          "timestamp": "2026-05-17T12:38:13+03:00",
          "tree_id": "7d068326055d77ef4c87cb5997091e8d6ec29207",
          "url": "https://github.com/elichai/better-hex/commit/1234f7edd531307578bb3f6807150d3a4454be05"
        },
        "date": 1779015180648,
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
            "value": 26,
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
            "value": 11493,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2134,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2145,
            "range": "± 9",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
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
            "value": 20,
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
            "value": 22,
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
            "value": 8,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 26,
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
            "value": 30,
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
            "value": 33,
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
            "value": 13,
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
            "value": 18,
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
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 29,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 37,
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
            "value": 41,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 45,
            "range": "± 1",
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
            "value": 9,
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
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12207,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3645,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3663,
            "range": "± 8",
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
            "value": 13,
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
            "value": 38,
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
            "value": 34,
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
            "value": 36,
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
            "value": 38,
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
            "value": 39,
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
            "value": 37,
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
            "value": 35,
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
            "value": 14,
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
            "value": 33,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 13,
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
            "value": 14,
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
            "value": 13,
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
            "value": 34,
            "range": "± 1",
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
            "value": 33,
            "range": "± 1",
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
            "value": 33,
            "range": "± 1",
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
            "value": 35,
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
            "value": 34,
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 13,
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
            "value": 2401,
            "range": "± 688",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1699,
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
            "value": 54,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/256",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3469,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1302,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1305,
            "range": "± 15",
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
            "value": 22,
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
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1269,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 35,
            "range": "± 0",
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
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 78,
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
            "value": 80,
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
            "value": 86,
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
            "value": 93,
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
            "value": 99,
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
            "value": 76,
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
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 94,
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
            "value": 88,
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
            "value": 101,
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
            "value": 73,
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
            "value": 82,
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
            "value": 88,
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
            "value": 94,
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
            "value": 90,
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
            "value": 96,
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
            "value": 102,
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
            "value": 108,
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
            "value": 98,
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
            "value": 105,
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
            "value": 55,
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
            "value": 112,
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
            "value": 119,
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
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 214,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 209,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11802,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 10172,
            "range": "± 140",
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
            "value": 59,
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
            "value": 45,
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 268,
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2236811ca09ac2eae47c356368caa7ec294414fe",
          "message": "Merge pull request #1 from elichai/miri-fuzz-corpus\n\nci(miri): replay fuzz corpus through fuzz_target bodies under Miri",
          "timestamp": "2026-05-17T14:20:18+03:00",
          "tree_id": "b22a9ab5dd428260963aa3a09929a9077617f3ce",
          "url": "https://github.com/elichai/better-hex/commit/2236811ca09ac2eae47c356368caa7ec294414fe"
        },
        "date": 1779020850317,
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
            "value": 18,
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
            "value": 20,
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
            "value": 28,
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
            "value": 11523,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2152,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2146,
            "range": "± 6",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
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
            "value": 20,
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
            "value": 22,
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
            "value": 8,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 26,
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
            "value": 30,
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
            "value": 33,
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
            "value": 13,
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
            "value": 18,
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
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 37,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 41,
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
            "value": 9,
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
            "value": 191,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12175,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3625,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3577,
            "range": "± 29",
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
            "value": 38,
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
            "value": 37,
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
            "value": 37,
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
            "value": 33,
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
            "value": 33,
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
            "value": 33,
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
            "value": 33,
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
            "value": 33,
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
            "value": 34,
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
            "value": 2402,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1685,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1258,
            "range": "± 1",
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
            "value": 3281,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1219,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1219,
            "range": "± 0",
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
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1259,
            "range": "± 1",
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
            "value": 66,
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
            "value": 72,
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
            "value": 78,
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
            "value": 80,
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
            "value": 86,
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
            "value": 93,
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
            "value": 99,
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
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 44,
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
            "value": 87,
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
            "value": 94,
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
            "value": 88,
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
            "value": 101,
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
            "value": 108,
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
            "value": 73,
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
            "value": 82,
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
            "value": 88,
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
            "value": 94,
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
            "value": 90,
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
            "value": 96,
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
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 108,
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
            "value": 98,
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
            "value": 105,
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
            "value": 107,
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
            "value": 112,
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
            "value": 119,
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
            "value": 81,
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
            "value": 209,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11764,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 10245,
            "range": "± 50",
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
            "value": 70,
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
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 209,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 267,
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
          "distinct": true,
          "id": "99c8fa4b4be808e9bee29785db90ad57a083217e",
          "message": "docs(readme): describe what oracle actually fuzzes\n\nThe README claimed the `oracle` fuzz target performs differential fuzzing\nagainst `hex`, `const-hex`, `faster-hex`, and `base16ct`. It doesn't —\nthose crates are only used in the `benches/compare.rs` benchmark. What\n`oracle` actually does is cross-check every SIMD tier the host CPU\nsupports (SSSE3, AVX2, AVX-512BW, AVX-512 VBMI on x86; NEON on aarch64)\nplus the runtime-dispatched API against an in-fuzz scalar naïve\nencoder / decoder defined in `fuzz/fuzz_targets/oracle_support.rs`.\n\nRewrite the bullet to match the actual behaviour.",
          "timestamp": "2026-05-17T15:39:58+03:00",
          "tree_id": "0e445fa353c2fa5c38de309c50210d93e85b5284",
          "url": "https://github.com/elichai/better-hex/commit/99c8fa4b4be808e9bee29785db90ad57a083217e"
        },
        "date": 1779025647291,
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
            "value": 16,
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
            "value": 28,
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
            "value": 11490,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2129,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2130,
            "range": "± 0",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
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
            "value": 20,
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
            "value": 22,
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
            "value": 8,
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
            "value": 17,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 26,
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
            "value": 30,
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
            "value": 33,
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
            "value": 13,
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
            "value": 18,
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
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 29,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 37,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 41,
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
            "value": 9,
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
            "value": 190,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12134,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3489,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3489,
            "range": "± 2",
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
            "value": 35,
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
            "value": 36,
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
            "value": 34,
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
            "value": 37,
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
            "value": 37,
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
            "value": 38,
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
            "value": 39,
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
            "value": 39,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 35,
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
            "value": 34,
            "range": "± 1",
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
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 35,
            "range": "± 1",
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 33,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 12,
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
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 34,
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
            "value": 16,
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
            "value": 2407,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1707,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1255,
            "range": "± 0",
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
            "value": 3277,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1218,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1216,
            "range": "± 0",
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
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1253,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 35,
            "range": "± 0",
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
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 78,
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
            "value": 80,
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
            "value": 87,
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
            "value": 93,
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
            "value": 99,
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
            "value": 76,
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
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 94,
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
            "value": 88,
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
            "value": 101,
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
            "value": 73,
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
            "value": 82,
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
            "value": 88,
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
            "value": 94,
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
            "value": 90,
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
            "value": 96,
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
            "value": 102,
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
            "value": 108,
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
            "value": 98,
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
            "value": 105,
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
            "value": 55,
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
            "value": 112,
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
            "value": 81,
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
            "value": 209,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11833,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 9843,
            "range": "± 6",
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
            "value": 59,
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
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 85,
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
            "value": 267,
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
          "distinct": true,
          "id": "5cfa0ce89019bf56a186157027e192c13a483da4",
          "message": "ci: drop Intel SDE AVX-512 jobs (covered by Miri)\n\nIntel bot-gates SDE downloads from CI runner IPs (the page/CDN return 403/HTML to automated clients), so the AVX-512-via-SDE matrix entries can no longer fetch the emulator. The same AVX-512BW/VBMI impls are exercised under Miri (see miri.yml), so remove the two SDE jobs and the setup step rather than chase Intel's gate. QEMU is not an alternative: its TCG SIGILLs on AVX-512.",
          "timestamp": "2026-06-16T18:09:01+03:00",
          "tree_id": "d2fe943ec0273e21deaaa7f321fc525a07948236",
          "url": "https://github.com/elichai/better-hex/commit/5cfa0ce89019bf56a186157027e192c13a483da4"
        },
        "date": 1781626699320,
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
            "value": 11,
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
            "value": 11,
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
            "value": 6,
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
            "value": 14,
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
            "value": 18,
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
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 14,
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
            "value": 18,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 23,
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
            "value": 25,
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
            "value": 26,
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
            "value": 27,
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
            "value": 29,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 13,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/31",
            "value": 16,
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
            "value": 25,
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
            "value": 183,
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
            "value": 11495,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2129,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2129,
            "range": "± 1",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 17,
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
            "value": 18,
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
            "value": 22,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/7",
            "value": 29,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 8,
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
            "value": 17,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 33,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/24",
            "value": 13,
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
            "value": 17,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 29,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 41,
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
            "value": 190,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12133,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3488,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3489,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 34,
            "range": "± 1",
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
            "value": 37,
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
            "value": 38,
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
            "value": 39,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 12,
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
            "value": 37,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 38,
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
            "value": 18,
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
            "value": 19,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 39,
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
            "value": 21,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 33,
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
            "value": 16,
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
            "value": 35,
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
            "value": 16,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 16,
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
            "value": 13,
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
            "value": 16,
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
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 35,
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
            "value": 2411,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1714,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1255,
            "range": "± 0",
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
            "value": 6,
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
            "value": 9,
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
            "value": 4,
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
            "value": 11,
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
            "value": 7,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3278,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1219,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1217,
            "range": "± 0",
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
            "value": 20,
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
            "value": 16,
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
            "value": 1254,
            "range": "± 0",
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
            "value": 74,
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
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 81,
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
            "value": 90,
            "range": "± 1",
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
            "value": 95,
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
            "value": 101,
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
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 83,
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
            "value": 89,
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
            "value": 96,
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
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 104,
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
            "value": 110,
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
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 83,
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
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 96,
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
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/21",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 115,
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
            "value": 121,
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
            "value": 84,
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
            "value": 210,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11778,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 9711,
            "range": "± 6",
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 73,
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
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 207,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 268,
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
          "distinct": true,
          "id": "6bc5a17161bde9001ce1727b2bc2d124caac94ac",
          "message": "ci: add Dependabot for cargo and github-actions\n\nWeekly updates for crate dependencies and workflow action refs; non-breaking cargo bumps are grouped into a single PR.",
          "timestamp": "2026-06-17T11:40:18+03:00",
          "tree_id": "797d964fc827fb63a5ffd952b63e34ec51fc6e58",
          "url": "https://github.com/elichai/better-hex/commit/6bc5a17161bde9001ce1727b2bc2d124caac94ac"
        },
        "date": 1781689694699,
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
            "value": 9,
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
            "value": 6,
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
            "value": 11,
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
            "value": 11,
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
            "value": 12,
            "range": "± 1",
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
            "value": 6,
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
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 14,
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
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/17",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/17",
            "value": 7,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 19,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 23,
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
            "value": 25,
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
            "value": 25,
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
            "value": 27,
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
            "value": 29,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 13,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/31",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 25,
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
            "value": 183,
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
            "value": 11501,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2136,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2134,
            "range": "± 1",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 17,
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
            "value": 18,
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
            "value": 22,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/7",
            "value": 29,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 8,
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
            "value": 17,
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
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/11",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/18",
            "value": 23,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 34,
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
            "value": 13,
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
            "value": 17,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/28",
            "value": 29,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/29",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/32",
            "value": 9,
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
            "value": 191,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12150,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3512,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3515,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 36,
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
            "value": 35,
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
            "value": 38,
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
            "value": 38,
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
            "value": 39,
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
            "value": 38,
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
            "value": 37,
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
            "value": 18,
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
            "value": 19,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 39,
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
            "value": 21,
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
            "value": 22,
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
            "value": 34,
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
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 15,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 16,
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
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 15,
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
            "value": 14,
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
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 14,
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
            "value": 34,
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
            "value": 106,
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
            "value": 2419,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1693,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1256,
            "range": "± 0",
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
            "value": 6,
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
            "value": 4,
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
            "value": 11,
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
            "value": 7,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3278,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1220,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1218,
            "range": "± 0",
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
            "value": 20,
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
            "value": 16,
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
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1255,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 35,
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
            "value": 74,
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
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 81,
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
            "value": 88,
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
            "value": 95,
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
            "value": 101,
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
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 82,
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
            "value": 89,
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
            "value": 96,
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
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 104,
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
            "value": 110,
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
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 83,
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
            "value": 89,
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
            "value": 96,
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
            "value": 91,
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
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 115,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 121,
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
            "value": 84,
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
            "value": 210,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11811,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 9769,
            "range": "± 36",
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 73,
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
            "value": 86,
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
            "value": 268,
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
          "distinct": true,
          "id": "d595cdc8aded6226334c58e34141dfed99c1df6e",
          "message": "ci: document close-and-reopen for release-PR CI (no PAT)\n\nAvoid a PAT/GitHub App token: keep the default GITHUB_TOKEN and rely on the manual close-and-reopen workaround to run on: pull_request CI on the release PR, per https://release-plz.dev/docs/github/token",
          "timestamp": "2026-06-17T15:34:06+03:00",
          "tree_id": "d56c37ed708adde5b22e1c9e0af86078870b2d2b",
          "url": "https://github.com/elichai/better-hex/commit/d595cdc8aded6226334c58e34141dfed99c1df6e"
        },
        "date": 1781703713292,
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
            "value": 6,
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
            "value": 10,
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
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 14,
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
            "value": 8,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 20,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 12,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 13,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/30",
            "value": 16,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 17,
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
            "value": 188,
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
            "value": 11565,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2234,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2196,
            "range": "± 14",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 17,
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
            "value": 18,
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
            "value": 22,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/7",
            "value": 29,
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
            "value": 8,
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
            "value": 17,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/17",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/17",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/18",
            "value": 23,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 34,
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
            "value": 13,
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
            "value": 17,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
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
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 41,
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
            "value": 9,
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
            "value": 190,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12131,
            "range": "± 539",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3487,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3488,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 36,
            "range": "± 1",
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
            "value": 37,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 12,
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
            "value": 38,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 39,
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
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 39,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 33,
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
            "value": 34,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 37,
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
            "value": 35,
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
            "value": 34,
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
            "value": 14,
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
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 14,
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
            "value": 34,
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
            "value": 2424,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1690,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1256,
            "range": "± 0",
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
            "value": 6,
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
            "value": 6,
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
            "value": 9,
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
            "value": 11,
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
            "value": 7,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3271,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1220,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1223,
            "range": "± 0",
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
            "value": 20,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 16,
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
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1262,
            "range": "± 8",
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
            "value": 66,
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
            "value": 73,
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
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 41,
            "range": "± 0",
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
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/5",
            "value": 87,
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
            "value": 93,
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
            "value": 99,
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
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 46,
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
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 95,
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
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 102,
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
            "value": 108,
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
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 82,
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
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 95,
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
            "value": 90,
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
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 106,
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
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 108,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 114,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 120,
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
            "value": 211,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 11771,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 9712,
            "range": "± 4",
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
            "value": 59,
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
            "value": 73,
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
            "value": 206,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 269,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "elichai.turkel@gmail.com",
            "name": "Elichai Turkel",
            "username": "elichai"
          },
          "distinct": true,
          "id": "46fa491ff8841be185cdc9780848f3e915beea0e",
          "message": "chore(deps): bump the cargo-minor-patch group with 5 updates\n\nBumps the cargo-minor-patch group with 5 updates:\n\n| Package | From | To |\n| --- | --- | --- |\n| [heapless](https://github.com/rust-embedded/heapless) | `0.9.2` | `0.9.3` |\n| [crabgrind](https://github.com/2dav/crabgrind) | `0.2.4` | `0.2.6` |\n| [rand_xoshiro](https://github.com/rust-random/rngs) | `0.8.0` | `0.8.1` |\n| [serde_json](https://github.com/serde-rs/json) | `1.0.149` | `1.0.150` |\n| [const-hex](https://github.com/danipopes/const-hex) | `1.18.1` | `1.19.1` |\n\n\nUpdates `heapless` from 0.9.2 to 0.9.3\n- [Release notes](https://github.com/rust-embedded/heapless/releases)\n- [Changelog](https://github.com/rust-embedded/heapless/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/rust-embedded/heapless/compare/v0.9.2...v0.9.3)\n\nUpdates `crabgrind` from 0.2.4 to 0.2.6\n- [Commits](https://github.com/2dav/crabgrind/commits)\n\nUpdates `rand_xoshiro` from 0.8.0 to 0.8.1\n- [Commits](https://github.com/rust-random/rngs/commits)\n\nUpdates `serde_json` from 1.0.149 to 1.0.150\n- [Release notes](https://github.com/serde-rs/json/releases)\n- [Commits](https://github.com/serde-rs/json/compare/v1.0.149...v1.0.150)\n\nUpdates `const-hex` from 1.18.1 to 1.19.1\n- [Commits](https://github.com/danipopes/const-hex/compare/v1.18.1...v1.19.1)\n\n---\nupdated-dependencies:\n- dependency-name: heapless\n  dependency-version: 0.9.3\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: cargo-minor-patch\n- dependency-name: crabgrind\n  dependency-version: 0.2.6\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: cargo-minor-patch\n- dependency-name: rand_xoshiro\n  dependency-version: 0.8.1\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: cargo-minor-patch\n- dependency-name: serde_json\n  dependency-version: 1.0.150\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: cargo-minor-patch\n- dependency-name: const-hex\n  dependency-version: 1.19.1\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n  dependency-group: cargo-minor-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>",
          "timestamp": "2026-06-17T15:39:29+03:00",
          "tree_id": "f4895c96d9814151d0adeeb297c6e8027d673a2b",
          "url": "https://github.com/elichai/better-hex/commit/46fa491ff8841be185cdc9780848f3e915beea0e"
        },
        "date": 1781704095400,
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
            "value": 26,
            "range": "± 1",
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
            "value": 28,
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
            "value": 11494,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "check/neon/16384",
            "value": 2144,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 2132,
            "range": "± 1",
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
            "value": 6,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 10,
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
            "value": 13,
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
            "value": 18,
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
            "value": 8,
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
            "value": 17,
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
            "value": 17,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 21,
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
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 25,
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
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 29,
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
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 33,
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
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 37,
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
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 6,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 10,
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
            "value": 14,
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
            "value": 18,
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
            "value": 22,
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
            "value": 30,
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
            "value": 33,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/24",
            "value": 13,
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
            "value": 17,
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
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/26",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/27",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 25,
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
            "value": 29,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/29",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 33,
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
            "value": 9,
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
            "value": 191,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/256",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 12185,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "decode/neon/16384",
            "value": 3641,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 3641,
            "range": "± 13",
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
            "value": 13,
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
            "value": 34,
            "range": "± 1",
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
            "value": 38,
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
            "value": 38,
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
            "value": 39,
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
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 12,
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
            "value": 37,
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
            "value": 38,
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
            "value": 39,
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
            "value": 38,
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
            "value": 21,
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
            "value": 22,
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
            "value": 37,
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
            "value": 16,
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
            "value": 16,
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
            "value": 35,
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
            "value": 13,
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
            "value": 34,
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
            "value": 35,
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
            "value": 106,
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
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2615,
            "range": "± 76",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1716,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 1266,
            "range": "± 16",
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
            "value": 6,
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
            "value": 6,
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
            "value": 9,
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
            "value": 10,
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
            "value": 11,
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
            "value": 3,
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
            "value": 52,
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
            "value": 3357,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "encode/neon/16384",
            "value": 1302,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 1296,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 21,
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
            "value": 16,
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
            "value": 16,
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
            "value": 16,
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
            "value": 16,
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
            "value": 16,
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
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 1305,
            "range": "± 5",
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
            "value": 65,
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
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 77,
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
            "value": 92,
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
            "value": 73,
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
            "value": 46,
            "range": "± 0",
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
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/12",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/12",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 51,
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
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 108,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 49,
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
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/20",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/21",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 113,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 120,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 232,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 212,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 12901,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 10742,
            "range": "± 32",
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
            "range": "± 1",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 224,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 269,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}