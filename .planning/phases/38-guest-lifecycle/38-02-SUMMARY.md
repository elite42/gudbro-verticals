---
phase: 38-guest-lifecycle
plan: 02
subsystem: ui
tags: [delivery-apps, deep-links, clipboard, country-data, guest-dashboard]

# Dependency graph
requires:
  - phase: 36-tourist-concierge
    provides: Country-keyed data registry pattern (concierge-data.ts)
  - phase: 33-dashboard-refactor
    provides: DashboardCard grid, card border accent pattern (GRID-01)
provides:
  - Country-keyed delivery app configuration (VN, TH)
  - DeliveryAppsSection component with copy-address and deep-links
  - PropertyInfo now includes address, city, country fields across all 4 API routes
affects: [future-country-expansion, room-code-dashboard]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Country-keyed static data registry (matching concierge-data.ts pattern)'
    - 'Self-hiding section pattern (returns null when no data for country)'

key-files:
  created:
    - apps/accommodations/frontend/lib/delivery-apps-data.ts
    - apps/accommodations/frontend/components/stay/DeliveryAppsSection.tsx
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/[code]/property/route.ts
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts
    - apps/accommodations/frontend/app/stay/[code]/page.tsx

key-decisions:
  - 'DELIV-01: Added address/city/country to PropertyInfo type and all 4 API routes (was selected from DB but not mapped)'

patterns-established:
  - 'Delivery apps registry: country-keyed Record<string, DeliveryApp[]> with getDeliveryApps() helper'

# Metrics
duration: 5min
completed: 2026-02-02
---

# Phase 38 Plan 02: Delivery Apps Section Summary

**Country-specific food delivery app cards (VN: Grab/ShopeeFood/Baemin, TH: Grab/foodpanda/LINE MAN) with universal deep-links and clipboard address copy for guest dashboard**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-02T02:43:28Z
- **Completed:** 2026-02-02T02:48:04Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Country-keyed delivery app data config for Vietnam and Thailand markets
- Branded delivery app cards with colored left borders, emoji icons, and universal deep-links
- Copyable property address with clipboard feedback for paste into delivery apps
- PropertyInfo type now exposes address, city, country across all 4 API routes

## Task Commits

Each task was committed atomically:

1. **Task 1: Delivery apps data config + DeliveryAppsSection component** - `835eae0` (feat)
2. **Task 2: Wire DeliveryAppsSection into guest stay page** - `51ea1fb` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/lib/delivery-apps-data.ts` - Country-keyed delivery app registry (VN, TH) with types and helper
- `apps/accommodations/frontend/components/stay/DeliveryAppsSection.tsx` - Branded cards, copy-address, deep-links, self-hiding
- `apps/accommodations/frontend/types/stay.ts` - Added address, city, country to PropertyInfo
- `apps/accommodations/frontend/app/api/stay/[code]/property/route.ts` - Map address/city/country in response
- `apps/accommodations/frontend/app/api/stay/verify/route.ts` - Select and map address/city/country
- `apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts` - Select and map address/city/country
- `apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts` - Select and map address/city/country
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - Import and render DeliveryAppsSection

## Decisions Made

- DELIV-01: Added address/city/country to PropertyInfo type and all 4 API routes. These fields were already SELECTed from accom_properties in the property route but not mapped to the response type. Extended to all routes for consistency.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added address/city/country to PropertyInfo type and all API routes**

- **Found during:** Task 1 (DeliveryAppsSection needs property address and country)
- **Issue:** PropertyInfo type lacked address, city, country fields. Property route SELECTed them from DB but never mapped them. Other routes (verify, room-code) did not select them at all.
- **Fix:** Added 3 fields to PropertyInfo, updated all 4 API routes to select and map these fields
- **Files modified:** types/stay.ts, 4 API route files
- **Verification:** TypeScript typecheck passes (only pre-existing @shared/ errors)
- **Committed in:** 835eae0 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential for delivering property address to the component. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Delivery apps section renders for VN and TH properties
- Adding new countries requires only adding entries to the DELIVERY_APPS registry in delivery-apps-data.ts
- Pre-existing @shared/ module resolution errors in DashboardHeader.tsx and WifiCard.tsx remain (project-level config issue)

---

_Phase: 38-guest-lifecycle_
_Completed: 2026-02-02_
