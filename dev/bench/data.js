window.BENCHMARK_DATA = {
  "lastUpdate": 1778087544287,
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
      }
    ]
  }
}