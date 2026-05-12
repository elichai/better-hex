window.BENCHMARK_DATA = {
  "lastUpdate": 1778586258926,
  "repoUrl": "https://github.com/elichai/better-hex",
  "entries": {
    "better-hex Benchmarks": [
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
          "id": "426ebb0aa4a0560e8555a5e515cb0a3e8c5231c8",
          "message": "bench: cut CI runtime by alternating upper/lower in encode and trimming sizes\n\n- encode: per (variant, size) bench now toggles upper/lower per iter,\n  halving encode case count without losing coverage of either path.\n- common: drop 64 and 1024 from BENCH_SIZES (well past SIMD lane edges).\n- traits: drop matching <64> and <1024> serde_array points.\n- workflow: pass --noplot to skip plot rendering on CI.\n\nPrevious push run took ~1h44m total; encode alone was ~37m. Expected\nnew total ~1h, with encode roughly halved.",
          "timestamp": "2026-05-06T19:34:18+03:00",
          "tree_id": "3477b18604ec0ac47d33adb204d3dff2c444b8f5",
          "url": "https://github.com/elichai/better-hex/commit/426ebb0aa4a0560e8555a5e515cb0a3e8c5231c8"
        },
        "date": 1778087543829,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 15,
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
            "name": "check/ssse3/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "name": "check/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/14",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
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
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 10,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 14,
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
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
            "value": 15,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 6519,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1434,
            "range": "± 56",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 632,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 649,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 12,
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
            "name": "decode/ssse3/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 6,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 112,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 6878,
            "range": "± 318",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 2006,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1173,
            "range": "± 53",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1192,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 47,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2384,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1665,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 808,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
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
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3487,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 1022,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 677,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 678,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 30,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 739,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 52,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 54,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 57,
            "range": "± 2",
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
            "value": 59,
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
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 57,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 62,
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
            "value": 65,
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
            "value": 67,
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
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 72,
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
            "value": 73,
            "range": "± 6",
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
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 78,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 94,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 75,
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
            "value": 78,
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
            "value": 81,
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
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 112,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 337,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 208,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 18488,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 8110,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 69,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 80,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 67,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 309,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 301,
            "range": "± 2",
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
          "id": "9f3220f0b6bba5774d0c8c183297491342d5c2ee",
          "message": "fuzz(ci): seed corpus from fuzz-corpus orphan branch and push back additions\n\nThe fuzz-corpus branch is now an orphan (no shared history with main) so it\ncan grow indefinitely without rebasing concerns. The smoke workflow:\n\n  - Checks fuzz-corpus out into ./fuzz-corpus/ as a second checkout.\n  - Copies seed inputs into fuzz/corpus/<target>/ before fuzzing.\n  - On schedule + post-merge-to-main, pushes any newly-found inputs back\n    to fuzz-corpus, gated by repo identity so fork PRs stay read-only.\n\nEach matrix job (3 targets × 2 archs = 6 jobs) commits only its own target\nsubdir. A pull-rebase-push retry loop handles the parallel pushes — libFuzzer\nsha1 filenames mean different jobs touch disjoint files, so rebases never\nconflict at the content level. permissions: contents: write is needed for\nthe push step; PR runs keep the default read-only token regardless.",
          "timestamp": "2026-05-06T20:15:20+03:00",
          "tree_id": "befed5af0b6dce8a2c32b6b2462d50ad6958b9ba",
          "url": "https://github.com/elichai/better-hex/commit/9f3220f0b6bba5774d0c8c183297491342d5c2ee"
        },
        "date": 1778089966746,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 15,
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
            "name": "check/ssse3/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "name": "check/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/14",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
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
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 10,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
            "value": 15,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 105,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 6501,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1328,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 605,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 608,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 12,
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
            "name": "decode/ssse3/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 6,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 112,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 6853,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 1961,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1132,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1142,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 3612,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 2689,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 740,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
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
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3471,
            "range": "± 134",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 983,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 622,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 619,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 684,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 56,
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
            "value": 58,
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
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/12",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/12",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 66,
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
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 87,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 69,
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
            "value": 71,
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
            "value": 73,
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
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 72,
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
            "value": 75,
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
            "value": 77,
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
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 337,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 208,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 18386,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 7733,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 313,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 302,
            "range": "± 4",
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
          "id": "45d72083b39c4d4918785bf4ee04a367e39070ec",
          "message": "ct: drop valgrind suppressions by exposing raw error accumulators\n\nThe previous CT test harness called the *public* SIMD wrappers, which\nend with `if accum != 0 { Err } else { Ok }` — a Cond branch on\npoisoned input. The suppression file silenced these via wide wildcards\n(`fun:*better_hex*decode_ssse3*` etc.), which also masked any future\ncontent-dependent branch that might land in the same function.\n\nRefactor to push the validity-bit comparison out to the caller:\n\n- `scalar::check` extracted into `check_inner -> u16` + thin wrapper.\n- `x86::check_{ssse3,avx2,avx512}_inner` now return raw `i32`/`i32`/\n  `u64` accumulators instead of `bool`. Composition between layers is\n  `or`-on-int rather than `and`-on-bool, and the public wrappers do\n  `inner(...) == 0` at the boundary.\n- `x86::decode_*_inner` marked `#[doc(hidden)] pub` (signatures\n  unchanged — they were already integer accumulators).\n- `neon::decode` extracted into `decode_inner -> u8` + wrapper.\n- `neon::check` extracted into `check_inner -> u8` (uses `!vminvq_u8`\n  to flip valid-bit semantics into accumulator semantics) + wrapper.\n\nVisibility: every inner is `#[doc(hidden)] pub`. They live in the\nprivate `crate::backend::*` modules, so external access is only via\nthe feature-gated, doc-hidden `bench_internals` re-exports.\n\nCT tests (`tests/ct_valgrind.rs`) now call the inners directly,\nunpoison the integer accumulator, and assert `== 0` / `!= 0`. The\nhelpers became generic over the accumulator type. The HexStr suite\nis unchanged — its public-API contract still goes through `check` /\n`const_check`, where the validity bit is the documented public output.\n\nWorkflow: `--suppressions=` flag dropped, suppression file deleted.\nMatrix added so the same suite runs on `ubuntu-24.04-arm` for NEON\ncoverage in addition to the x86 runner.\n\nCodegen impact on the public `check_*` wrappers (verified against\n`x86_64-unknown-linux-gnu` --emit=asm at -O3):\n\n  - check_ssse3:  -2 insns/iter (testl/sete/andb -> orl)\n  - check_avx2:   composition flattened, fewer end-of-fn insns\n  - check_avx512: -1 insn/iter (kortestq/sete/andb -> kmovq/orq),\n                  saves push/pop %rbp at prologue/epilogue\n\n`decode_*` codegen unchanged (those wrappers already had this shape).\n\nLocal verification: `cargo test --release` and\n`cargo test --features ct-test --release` both pass. Cannot run\nvalgrind on darwin; CI on x86_64 + aarch64 will validate that no\nsuppressions are needed.",
          "timestamp": "2026-05-06T21:45:48+03:00",
          "tree_id": "5531072c4d4d85c4d00da744cd6ae49fc7f09fa1",
          "url": "https://github.com/elichai/better-hex/commit/45d72083b39c4d4918785bf4ee04a367e39070ec"
        },
        "date": 1778095431668,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 15,
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
            "name": "check/ssse3/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 9,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
            "value": 7,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 7,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
            "value": 15,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 6493,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1251,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 587,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 589,
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
            "name": "decode/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 12,
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
            "name": "decode/ssse3/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 6,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/24",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/25",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 18,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 6832,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 1946,
            "range": "± 91",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1127,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1133,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 25,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 50,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 27,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2230,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1577,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 735,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 15,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
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
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3466,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 978,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 622,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 620,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 27,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 30,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 683,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 57,
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
            "value": 58,
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
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 61,
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
            "value": 64,
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
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 97,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 99,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 96,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 71,
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
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 94,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 98,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 77,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 104,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 90,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 96,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 100,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 105,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 80,
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
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 101,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 110,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 333,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 206,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 18496,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 8067,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 80,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 310,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 286,
            "range": "± 2",
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
          "id": "cd3415bb5b99b5fdfe44f600a52981d48048290a",
          "message": "perf(neon): hoist horizontal reduce + invert out of check_inner loop\n\nAND-accumulate the per-chunk `valid` vectors and reduce + invert once\nat function exit. Per chunk drops from `uminv + fmov + mvn + orr`\n(cross-lane reduce + cross-domain move + 2 scalar ops) to a single\n`and.16b` (single-cycle vector AND). The horizontal reduce now runs\nonce per call instead of once per 16-byte chunk.\n\nCorrectness: lane i of `acc_valid` stays 0xFF iff every chunk had\nlane i = 0xFF. `vminvq_u8(acc_valid) == 0xFF` iff every lane stayed\nvalid in every chunk; `!` flips to error semantics for the OR-chain\nwith the scalar tail.",
          "timestamp": "2026-05-06T22:36:56+03:00",
          "tree_id": "05c1d116a39e090f48bd1bf9a8956292ab11c685",
          "url": "https://github.com/elichai/better-hex/commit/cd3415bb5b99b5fdfe44f600a52981d48048290a"
        },
        "date": 1778098436487,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 15,
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
            "name": "check/ssse3/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 9,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 7,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
            "value": 15,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 6515,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1282,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 624,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 627,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 12,
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
            "name": "decode/ssse3/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/17",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 6,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 112,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 6868,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 1985,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1175,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1179,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 26,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 27,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 29,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 29,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2227,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1578,
            "range": "± 47",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 749,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
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
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3474,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 991,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 635,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 632,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 720,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 57,
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
            "value": 59,
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
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 95,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 61,
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
            "value": 64,
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
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 69,
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
            "value": 71,
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
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 90,
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
            "value": 92,
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
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 104,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 97,
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
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 334,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 211,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 18370,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 8041,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 50,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 85,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 67,
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
            "value": 306,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 294,
            "range": "± 1",
            "unit": "ns/iter"
          }
        ]
      }
    ],
    "better-hex Benchmarks (x86_64)": [
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
        "date": 1778102761223,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 15,
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
            "name": "check/ssse3/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 9,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
            "value": 7,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 7,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
            "value": 15,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 6518,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1291,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 625,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 621,
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
            "name": "decode/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 12,
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
            "name": "decode/ssse3/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 22,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 6,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 112,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 6856,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 1979,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1176,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1187,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 21,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 27,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 29,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2206,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1547,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 738,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
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
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3477,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 990,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 637,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 634,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 692,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 47,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 49,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 52,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 56,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 59,
            "range": "± 1",
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
            "value": 60,
            "range": "± 1",
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
            "value": 63,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 57,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 58,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 60,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 63,
            "range": "± 1",
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
            "value": 65,
            "range": "± 2",
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
            "value": 67,
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
            "value": 69,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 104,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 71,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 61,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 67,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 69,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 95,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 72,
            "range": "± 3",
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
            "value": 75,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 77,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 79,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 71,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 74,
            "range": "± 1",
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
            "value": 76,
            "range": "± 1",
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
            "value": 79,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 81,
            "range": "± 1",
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
            "value": 83,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 86,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 94,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 82,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 334,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 208,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 18307,
            "range": "± 100",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 7868,
            "range": "± 77",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 36,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 41,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 46,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 68,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 94,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 301,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 295,
            "range": "± 2",
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
        "date": 1778150432376,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/2",
            "value": 10,
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
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/3",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/4",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/4",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/4",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/4",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/5",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/5",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/6",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/7",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/8",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/9",
            "value": 5,
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
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/10",
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/12",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/13",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/14",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/14",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/15",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/17",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/18",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/18",
            "value": 9,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/19",
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/21",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/21",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/22",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/23",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/24",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/25",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/26",
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/27",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/30",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/30",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/32",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/256",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 5586,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1100,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 543,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx512/16384",
            "value": 535,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 535,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/2",
            "value": 6,
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
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/9",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/10",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/10",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/11",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/12",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/13",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/14",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/15",
            "value": 33,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/16",
            "value": 4,
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
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/17",
            "value": 6,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/24",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/27",
            "value": 22,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/28",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/29",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/30",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 101,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/256",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 6023,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 1619,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 904,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx512/16384",
            "value": 923,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 929,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 27,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 26,
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
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 27,
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
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 28,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 29,
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
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 26,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 27,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 26,
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
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 30,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2393,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 2807,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 614,
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
            "name": "encode/ssse3/1",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 4,
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
            "name": "encode/ssse3/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/3",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 6,
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
            "name": "encode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 8,
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
            "name": "encode/ssse3/5",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/6",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 11,
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
            "name": "encode/ssse3/8",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 5,
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
            "name": "encode/ssse3/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/9",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/10",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/11",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/14",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/17",
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/18",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/19",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/21",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/22",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/23",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 12,
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
            "name": "encode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/25",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/27",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/28",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/30",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/32",
            "value": 3,
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
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/256",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3033,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 862,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 504,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx512vbmi/16384",
            "value": 479,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 482,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 558,
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
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/5",
            "value": 71,
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
            "value": 75,
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
            "value": 81,
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
            "value": 78,
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
            "value": 84,
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
            "value": 88,
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
            "value": 91,
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
            "value": 86,
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
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 56,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 68,
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
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 53,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/20",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/21",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 95,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 96,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 95,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 97,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 100,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 101,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 266,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 165,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 15899,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 6851,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 33,
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
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 255,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 226,
            "range": "± 2",
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
        "date": 1778424436335,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 17,
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
            "name": "check/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 4,
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
            "name": "check/ssse3/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 10,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 14,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 11,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
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
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 114,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 7227,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1417,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 682,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 674,
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
            "name": "decode/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 10,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
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
            "name": "decode/ssse3/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 12,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/17",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/18",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
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
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 126,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 7694,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 2033,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1147,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1136,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 93,
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
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2284,
            "range": "± 34",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1706,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 798,
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
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
            "value": 3,
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
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3902,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 1115,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 658,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 676,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 752,
            "range": "± 34",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/5",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/6",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/6",
            "value": 104,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/7",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 90,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 99,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/12",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/12",
            "value": 100,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 108,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 113,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/20",
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/21",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 79,
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
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 110,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 87,
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
            "value": 90,
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
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 350,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 215,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 20425,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 8734,
            "range": "± 58",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 330,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 274,
            "range": "± 4",
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
        "date": 1778425176023,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 15,
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
            "name": "check/ssse3/4",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/9",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/9",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 9,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
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
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/21",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/23",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/29",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/30",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
            "value": 15,
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
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 6500,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1256,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 595,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 597,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
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
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/3",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 10,
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
            "name": "decode/ssse3/9",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/9",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/10",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/17",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 6,
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
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/24",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 112,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 6851,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 1824,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1091,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1089,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 24,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 33,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/256",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/256",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 2409,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 1562,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 765,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
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
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3463,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 983,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 625,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 622,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 36,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 675,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 84,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 57,
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
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/6",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/7",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 61,
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
            "value": 63,
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
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/15",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 69,
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
            "value": 71,
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
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/23",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/24",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 75,
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
            "value": 78,
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
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/29",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/30",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/30",
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/31",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/31",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/32",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 347,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 200,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 19098,
            "range": "± 65",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 7668,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 102,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 309,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 275,
            "range": "± 2",
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
        "date": 1778586258525,
        "tool": "cargo",
        "benches": [
          {
            "name": "check/scalar/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/1",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/1",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/2",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/2",
            "value": 12,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/3",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/3",
            "value": 17,
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
            "name": "check/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/4",
            "value": 5,
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
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/5",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/6",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/6",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/6",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/7",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/7",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/8",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/8",
            "value": 4,
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
            "name": "check/ssse3/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/9",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/10",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/10",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/10",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/11",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/11",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/12",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/12",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/12",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/12",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/13",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/13",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/13",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/14",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/14",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/15",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/15",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16",
            "value": 3,
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/17",
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
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/18",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/18",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/19",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/19",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/19",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/19",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/20",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/20",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/20",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/21",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/21",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/21",
            "value": 10,
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
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/22",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/22",
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/23",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/23",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/23",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/24",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/24",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/24",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/24",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/25",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/25",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/26",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/26",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/26",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/26",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/27",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/27",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/27",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/27",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/28",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/28",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/28",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/28",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/29",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/29",
            "value": 11,
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
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/30",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/30",
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
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/31",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/31",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/256",
            "value": 114,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/256",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/256",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/256",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "check/scalar/16384",
            "value": 7220,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "check/ssse3/16384",
            "value": 1416,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "check/avx2/16384",
            "value": 675,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "check/dispatched/16384",
            "value": 677,
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
            "name": "decode/ssse3/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/1",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/2",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/2",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/3",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/3",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/3",
            "value": 10,
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
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/4",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/4",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/4",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/5",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/5",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/5",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/6",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/6",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/7",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/8",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/8",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/9",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/9",
            "value": 10,
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
            "name": "decode/ssse3/10",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/10",
            "value": 12,
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
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/11",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/11",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/11",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/12",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/12",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/12",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/12",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/13",
            "value": 24,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/13",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/13",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/14",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/14",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/14",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/14",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/15",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/17",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/17",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/17",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/17",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/18",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/18",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/18",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/19",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/19",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/19",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/20",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/20",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/21",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/21",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/21",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/21",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/22",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/22",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/22",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/22",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/23",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/23",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/24",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/24",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/24",
            "value": 9,
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
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/25",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/25",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/26",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/26",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/26",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/26",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/27",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/27",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/27",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/27",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/28",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/28",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/28",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/28",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/29",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/29",
            "value": 20,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/29",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/29",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/30",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/30",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/30",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/31",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/32",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/32",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/32",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/32",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/256",
            "value": 126,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/256",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/256",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/256",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "decode/scalar/16384",
            "value": 7648,
            "range": "± 36",
            "unit": "ns/iter"
          },
          {
            "name": "decode/ssse3/16384",
            "value": 2029,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "decode/avx2/16384",
            "value": 1097,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "decode/dispatched/16384",
            "value": 1103,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/1",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/1",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/2",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/2",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/2",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/3",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/3",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/3",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/4",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/4",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/4",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/5",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/5",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/5",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/6",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/6",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/6",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/7",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/7",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/7",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/8",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/8",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/8",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/9",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/9",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/9",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/10",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/10",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/10",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/11",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/11",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/11",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/12",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/12",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/12",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/13",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/13",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/13",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/14",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/14",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/14",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/15",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/15",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/15",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/17",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/17",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/17",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/18",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/18",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/18",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/19",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/19",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/19",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/20",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/20",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/20",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/21",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/21",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/21",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/22",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/22",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/22",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/23",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/23",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/23",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/24",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/24",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/24",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/25",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/25",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/25",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/26",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/26",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/26",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/27",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/27",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/27",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/28",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/28",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/28",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/29",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/29",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/29",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/30",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/30",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/30",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/31",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/31",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/31",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/32",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/32",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/32",
            "value": 38,
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
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/256",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "display/format/16384",
            "value": 3963,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "display/write_reuse/16384",
            "value": 3379,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "display/encode_direct/16384",
            "value": 823,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/1",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/1",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/2",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/2",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/3",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/4",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/4",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/5",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/5",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/6",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/6",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/8",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/8",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/9",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/9",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/10",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/10",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/11",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/11",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/11",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/12",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/12",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/13",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/13",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/13",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/14",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/14",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/15",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/17",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/17",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/17",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/18",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/18",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/18",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/19",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/19",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/20",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/20",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/20",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/21",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/21",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/21",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/22",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/22",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/22",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/23",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/23",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/24",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/24",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/24",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/24",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/25",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/25",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/25",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/26",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/26",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/26",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/26",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/27",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/27",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/27",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/27",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/28",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/28",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/28",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/29",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/29",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/29",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/29",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/30",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/30",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/30",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/31",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/31",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/31",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/32",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/32",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/32",
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
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/256",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/256",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/256",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "encode/scalar/16384",
            "value": 3907,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "encode/ssse3/16384",
            "value": 1120,
            "range": "± 39",
            "unit": "ns/iter"
          },
          {
            "name": "encode/avx2/16384",
            "value": 671,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "encode/dispatched/16384",
            "value": 668,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/1",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/2",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/3",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/4",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/5",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/6",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/7",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/8",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/9",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/10",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/11",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/12",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/13",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/14",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/15",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/17",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/18",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/19",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/20",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/21",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/22",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/23",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/24",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/25",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/26",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/27",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/28",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/29",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/30",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/31",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/32",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/256",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "to_hex/hex_target_string/16384",
            "value": 755,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/1",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/1",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/2",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/2",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/3",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/3",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/4",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/4",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/5",
            "value": 56,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/5",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/6",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/6",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/7",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/7",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/8",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/8",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/9",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/9",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/10",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/10",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/11",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/11",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/12",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/12",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/13",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/13",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/14",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/14",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/15",
            "value": 71,
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
            "value": 61,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/17",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/17",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/18",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/18",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/19",
            "value": 73,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/19",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/20",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/20",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/21",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/21",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/22",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/22",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/23",
            "value": 79,
            "range": "± 4",
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
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/24",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/25",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/25",
            "value": 100,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/26",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/26",
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/27",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/27",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/28",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/28",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/29",
            "value": 85,
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
            "value": 87,
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
            "value": 90,
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
            "value": 82,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/32",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/256",
            "value": 351,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/256",
            "value": 209,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/serialize/16384",
            "value": 20826,
            "range": "± 265",
            "unit": "ns/iter"
          },
          {
            "name": "serde_vec/deserialize/16384",
            "value": 8754,
            "range": "± 60",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/1",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/1",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/4",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/4",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/16",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/16",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/32",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/32",
            "value": 99,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/serialize/256",
            "value": 329,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serde_array/deserialize/256",
            "value": 273,
            "range": "± 1",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}