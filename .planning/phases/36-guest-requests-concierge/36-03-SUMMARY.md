---
phase: 36
plan: 03
subsystem: accommodations-concierge
tags: [concierge, attractions, tours, discover, explore, pwa]
depends_on:
  requires: [36-01]
  provides: [concierge-discover-component, attractions-data, explore-tab]
  affects: [36-02]
tech-stack:
  added: []
  patterns:
    [dual-mode-component, category-filter-pills, horizontal-scroll-cards]
key-files:
  created:
    - apps/accommodations/frontend/components/stay/ConciergeDiscover.tsx
  modified:
    - apps/accommodations/frontend/lib/concierge-data.ts
    - apps/accommodations/frontend/components/stay/ConciergeHub.tsx
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
decisions:
  - id: DISC-01
    description: ConciergeDiscover uses dual-mode via optional onBack prop (tab mode vs sub-view mode)
  - id: DISC-02
    description: Attractions data hardcoded for VN with country-keyed registry pattern matching concierge-data.ts
metrics:
  duration: ~3.5 min
  completed: 2026-02-02
---

# Phase 36 Plan 03: Explore & Discover Attractions Summary

**One-liner:** Card-based attractions explorer with category filters, 14 Vietnam POIs, 8 tour experiences with Tours PWA deep-links, dual-mode rendering for both Explore tab and Concierge hub.

## What Was Done

### Task 1: Attractions data + ConciergeDiscover component

- Added `LocalAttraction` and `TourExperience` interfaces to concierge-data.ts
- Added 14 Vietnam attractions across 8 categories (landmark, market, temple, museum, nature, food, nightlife, beach)
- Added 8 tour experiences with duration, price range, and optional deep-links to Tours PWA
- Added `getLocalAttractions()` and `getTourExperiences()` country-keyed helpers
- Created ConciergeDiscover.tsx (220+ lines):
  - Category filter pills with horizontal scroll (All, Landmarks, Markets, Temples, etc.)
  - 2-column attraction card grid with emoji, category badge, distance, truncated description
  - Expandable cards for attractions without deep-links
  - Tours section with horizontal scroll cards showing duration, price, and "Book on Tours" button
  - Empty state for unsupported countries
  - Dual-mode: tab header (no back) vs sub-view header (with back button)

### Task 2: Wire into hub + Explore tab

- ConciergeHub.tsx: Added ConciergeDiscover import, renders it when `activeSection === 'discover'` with onBack handler
- page.tsx: Replaced map/Explore tab placeholder with `<ConciergeDiscover country={...} />` (no onBack, tab mode)
- Same component serves both contexts with different header treatment

## Decisions Made

| ID      | Decision                               | Rationale                                                            |
| ------- | -------------------------------------- | -------------------------------------------------------------------- |
| DISC-01 | Dual-mode via optional onBack prop     | Avoids duplicating component; onBack presence toggles header style   |
| DISC-02 | Country-keyed registry for attractions | Matches existing concierge-data.ts pattern (CONCIERGE_DATA registry) |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- Attractions data: 14 entries in VN_ATTRACTIONS, 8 in VN_TOURS
- ConciergeDiscover created with category filter and tours section
- ConciergeHub renders ConciergeDiscover for discover section
- page.tsx map case renders ConciergeDiscover in tab mode
- Pre-existing build failure (@shared/utils/qr/wifi) unrelated to changes
- Lint and prettier pass on all modified files

## Commits

| Hash    | Message                                                       |
| ------- | ------------------------------------------------------------- |
| 2b423c3 | feat(36-03): attractions data and ConciergeDiscover component |
| e26823e | feat(36-03): wire ConciergeDiscover into hub and Explore tab  |
