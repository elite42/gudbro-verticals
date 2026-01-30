---
phase: 12
plan: 02
subsystem: e2e-testing
tags: [visual-regression, pwa-manifest, playwright, screenshots, smoke-tests]
dependency-graph:
  requires: [12-01]
  provides: [visual-baselines, manifest-validation]
  affects: []
tech-stack:
  added: []
  patterns:
    [
      toHaveScreenshot-visual-regression,
      manifest-field-validation,
      screenshot-stable-css-injection,
    ]
file-tracking:
  key-files:
    modified:
      - tests/e2e/verticals/coffeeshop.smoke.spec.ts
      - tests/e2e/verticals/wellness.smoke.spec.ts
      - tests/e2e/verticals/laundry.smoke.spec.ts
      - tests/e2e/verticals/pharmacy.smoke.spec.ts
      - tests/e2e/verticals/workshops.smoke.spec.ts
      - tests/e2e/verticals/gym.smoke.spec.ts
      - tests/e2e/verticals/tours.smoke.spec.ts
      - tests/e2e/verticals/accommodations.smoke.spec.ts
    created:
      - tests/e2e/verticals/*.smoke.spec.ts-snapshots/ (26 baseline PNGs)
decisions:
  - id: baseline-project-scope
    choice: 'Run all specs under coffeeshop-mobile/desktop projects for baseline generation'
    reason: 'All verticals serve on localhost; coffeeshop project provides mobile+desktop viewports'
metrics:
  duration: ~4 minutes
  completed: 2026-01-30
---

# Phase 12 Plan 02: Visual Regression + Manifest Validation Summary

**One-liner:** toHaveScreenshot visual regression baselines and manifest.json field validation for all 8 verticals at mobile+desktop viewports

## What Was Done

### Task 1: Add visual regression + manifest tests to all 8 smoke specs

Extended all 8 vertical smoke spec files with two new test.describe blocks:

1. **Visual Regression** (`toHaveScreenshot`):
   - Homepage screenshot for every vertical (8 verticals x 2 viewports = 16 tests)
   - Key page screenshot for multi-route verticals (5 verticals x 2 viewports = 10 tests)
   - Home-only verticals (coffeeshop, tours, accommodations) self-skip the key page test
   - Uses `screenshot-stable.css` from Plan 01 via `stylePath` option
   - Threshold: 0.01 maxDiffPixelRatio, 0.2 threshold, animations disabled

2. **PWA Manifest Validation** (`manifest.json`):
   - Validates required fields: name, short_name, theme_color, display, start_url
   - Validates icon array has >= 2 icons with 192x192 and 512x512 sizes
   - 8 verticals x 2 viewports = 16 manifest tests

3. **Baseline Screenshots**:
   - 26 baseline PNG files generated and committed
   - Home-only: 3 verticals x 2 viewports = 6 PNGs
   - Multi-route: 5 verticals x 2 pages x 2 viewports = 20 PNGs
   - Cleaned cross-project baselines; only coffeeshop-mobile/desktop retained

### Test Results

- **42 passed, 6 skipped, 0 failed** per run
- **3x consecutive runs: zero flaky failures**
- 6 skips are expected (key page skip for 3 home-only verticals x 2 viewports)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Cross-project snapshot cleanup**

- **Found during:** Task 1 verification
- **Issue:** First `--update-snapshots` run with all 16 projects generated 16 baselines per screenshot (one per project), creating ~200+ unnecessary PNGs
- **Fix:** Removed non-coffeeshop-project baselines, keeping only the 26 correct ones
- **Files modified:** Snapshot directories cleaned

## Decisions Made

| Decision                                               | Rationale                                                                                                                   |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Run all specs under coffeeshop-mobile/desktop projects | All verticals serve on localhost; coffeeshop project provides the correct mobile (393x851) and desktop (1280x720) viewports |
| Self-skipping key page test pattern                    | Keeps consistent test structure across all specs while gracefully handling home-only verticals                              |

## Commit Log

| Hash    | Message                                                                       |
| ------- | ----------------------------------------------------------------------------- |
| 0b4506a | test(12-02): add visual regression + manifest validation to all 8 smoke specs |

## Requirements Satisfied

- **VISQ-01**: Visual regression baselines committed for all 8 verticals at mobile and desktop viewports
- **VISQ-02**: PWA manifest validation tests catch missing name, short_name, icons, or theme_color
- **<5% false positive rate**: 0% false positives across 3 consecutive runs
