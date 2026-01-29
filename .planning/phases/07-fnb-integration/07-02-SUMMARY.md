---
phase: 07-fnb-integration
plan: 02
subsystem: frontend
tags: [react, typescript, accommodations, fnb, deep-link, phosphor-icons]

# Dependency graph
requires:
  - phase: 07-fnb-integration
    plan: 01
    provides: F&B linking fields on PropertyInfo type and property API
  - phase: 06-dashboard
    provides: Dashboard shell with section component pattern
provides:
  - RestaurantSection component with conditional F&B rendering
  - Deep-link to coffeeshop PWA for linked properties
  - Inline static menu for non-linked properties with F&B service items
  - .env.example with NEXT_PUBLIC_COFFEESHOP_BASE_URL
affects: [future F&B enhancements, coffeeshop PWA traffic from accommodations]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Conditional component branching: deep-link vs static menu vs hidden'
    - 'Internal sub-component for hooks isolation (StaticMenuBranch)'

key-files:
  created:
    - apps/accommodations/frontend/components/stay/RestaurantSection.tsx
    - apps/accommodations/frontend/.env.example
  modified:
    - apps/accommodations/frontend/app/stay/[code]/page.tsx

key-decisions:
  - 'Static menu rendered inline (not modal or separate route) per CONTEXT.md'
  - 'F&B category filtering by name.toLowerCase().includes(slug) for flexibility'
  - 'StaticMenuBranch as internal component to isolate hooks from conditional return'

patterns-established:
  - 'Cross-vertical deep-linking via env var base URL + merchant slug'

# Metrics
duration: 2min
completed: 2026-01-30
---

# Phase 7 Plan 02: F&B Frontend RestaurantSection Summary

**RestaurantSection conditionally deep-links to coffeeshop PWA or renders inline static menu from F&B service items**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-29T20:09:13Z
- **Completed:** 2026-01-29T20:11:15Z
- **Tasks:** 2
- **Files created:** 2
- **Files modified:** 1

## Accomplishments

- RestaurantSection component with three conditional branches (deep-link, static menu, hidden)
- Deep-link card opens coffeeshop PWA in new tab using NEXT_PUBLIC_COFFEESHOP_BASE_URL + merchant slug
- Static menu fetches services, filters to F&B categories, displays items with prices inline
- Dashboard page wires RestaurantSection between QuickActions and ServicesCarousel
- PropertyExtended merge explicitly extracts hasLinkedFnb and linkedFnbSlug (prevents undefined)
- .env.example documents all environment variables including F&B deep-link URL
- Full build passes with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: RestaurantSection component** - `8bafb21` (feat)
2. **Task 2: Wire RestaurantSection into dashboard and verify build** - `7952f32` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/components/stay/RestaurantSection.tsx` - Conditional F&B component (157 lines)
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - Dashboard with RestaurantSection integrated
- `apps/accommodations/frontend/.env.example` - Environment variable documentation

## Decisions Made

- Static menu displayed inline within the section card, not as a modal or separate route (per CONTEXT.md guidance and RESEARCH.md pitfall 3)
- F&B category filtering uses name.toLowerCase().includes(slug) for flexible matching (handles "Breakfast Menu", "Restaurant", "Mini Bar", etc.)
- StaticMenuBranch extracted as internal component to isolate React hooks from the conditional early return in the deep-link branch
- formatPrice helper copied into RestaurantSection (same as ServicesCarousel) rather than extracting to shared util -- keeps components self-contained

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

For local development with F&B deep-linking, set `NEXT_PUBLIC_COFFEESHOP_BASE_URL=http://localhost:3004` in `.env.local`. The `.env.example` file documents this.

## Success Criteria Met

- FNB-01: "Restaurant" card deep-links to coffeeshop PWA when has_linked_fnb=true
- FNB-03: Static menu shows F&B service items with prices when has_linked_fnb=false
- Criterion 2: Deep-link card opens coffeeshop PWA in new tab
- Criterion 3: Static menu displays items with prices (view-only)
- Criterion 5: Deep-link URL constructed correctly with merchant slug via env var
- Full build passes with zero errors

---

_Phase: 07-fnb-integration_
_Completed: 2026-01-30_
