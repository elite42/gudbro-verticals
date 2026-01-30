---
phase: 12
plan: 01
subsystem: pwa-infrastructure
tags: [manifest, pwa, icons, visual-regression, qa-checklist]
dependency-graph:
  requires: []
  provides: [manifest-files, screenshot-css, qa-checklist]
  affects: [12-02]
tech-stack:
  added: []
  patterns: [pwa-manifest-template, screenshot-stabilization]
file-tracking:
  key-files:
    created:
      - apps/wellness/frontend/public/manifest.json
      - apps/laundry/frontend/public/manifest.json
      - apps/pharmacy/frontend/public/manifest.json
      - apps/workshops/frontend/public/manifest.json
      - apps/tours/frontend/public/manifest.json
      - apps/accommodations/frontend/public/manifest.json
      - tests/e2e/shared/screenshot-stable.css
      - docs/reference/PHYSICAL-QA-CHECKLIST.md
    modified: []
decisions:
  - id: VISQ-01-theme-array
    description: 'Tours and accommodations use array-format themeColor in layout.tsx; used light-mode value as manifest theme_color'
    rationale: 'manifest.json theme_color is a single string; light mode is the primary brand color'
metrics:
  duration: ~3 minutes
  completed: 2026-01-30
---

# Phase 12 Plan 01: PWA Manifests, Screenshot CSS, QA Checklist Summary

**One-liner:** PWA manifest.json for 6 missing verticals with placeholder icons, screenshot stabilization CSS, and 78-item physical device QA checklist.

## What Was Done

### Task 1: Create manifest.json for 6 missing verticals + placeholder icons

- Created manifest.json for wellness, laundry, pharmacy, workshops, tours, accommodations
- Each manifest includes: name, short_name, description, start_url, display, background_color, theme_color, orientation, icons (192+512), categories
- Theme colors verified against each vertical's layout.tsx themeColor
- Generated minimal valid PNG placeholder icons (69 bytes each) for all 7 verticals needing them (6 new + gym which had manifest but missing icon files)
- **Commit:** 1da9f0b

### Task 2: Screenshot stabilization CSS + physical device QA checklist

- Created `tests/e2e/shared/screenshot-stable.css` that disables animations, transitions, caret blinking, scrollbars, and hides dynamic content (timestamps, Unsplash images)
- Created `docs/reference/PHYSICAL-QA-CHECKLIST.md` with 78 checkbox items: common checks (layout, touch targets, typography, navigation, scroll, images, forms, PWA) plus per-vertical specific items for all 8 verticals
- Target devices specified: iPhone SE, mid-range Android, iPad, desktop
- **Commit:** e084f6b

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

| Decision                  | Context                                            | Choice                      | Rationale                                                   |
| ------------------------- | -------------------------------------------------- | --------------------------- | ----------------------------------------------------------- |
| Array themeColor handling | Tours/accommodations use `[{media, color}]` format | Used light-mode color value | manifest.json requires single string; light mode is primary |
| Gym icon fix included     | Gym had manifest but missing icon PNGs             | Created icons for gym too   | Deviation Rule 1 - fixing existing broken reference         |

## Verification Results

- All 6 new manifests: valid JSON, all required fields present, theme_color matches layout.tsx
- All 14 icon files (7 verticals x 2 sizes) exist as valid PNGs
- Screenshot CSS contains animation-duration: 0s and all stabilization rules
- QA checklist mentions all 8 verticals with checkbox format (78 items)

## Next Phase Readiness

Plan 12-02 can now reference manifest files for validation tests and use screenshot-stable.css for visual regression baselines.
