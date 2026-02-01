---
phase: 34-service-expansion-minibar
plan: 05
subsystem: ui, api
tags: [minibar, realtime, supabase, import, f&b, accommodations, backoffice]

requires:
  - phase: 34-03
    provides: Service catalog UI with ServicesCarousel and ServiceCatalog overlay
  - phase: 34-04
    provides: MinibarSection component, minibar API, migration 096 with is_minibar_consumption/owner_confirmed

provides:
  - MinibarSection wired into guest dashboard with DashboardCard entry point
  - Backoffice Realtime subscription for minibar order notifications
  - Owner minibar confirmation flow in backoffice order management
  - F&B catalog import picker API (GET/POST) for cross-vertical item import
  - ImportFromMenuDialog component for backoffice services page

affects: [35-tourist-services, 36-concierge]

tech-stack:
  added: []
  patterns:
    - 'Supabase Realtime channel subscription for cross-app notifications'
    - 'Cross-vertical import pattern: F&B products -> accommodation service items'

key-files:
  created:
    - apps/backoffice/app/api/settings/services/import-from-menu/route.ts
    - apps/backoffice/components/accommodations/ImportFromMenuDialog.tsx
  modified:
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
    - apps/backoffice/components/accommodations/OrderManagement.tsx
    - apps/backoffice/app/api/accommodations/orders/route.ts

key-decisions:
  - 'SVC-10-01: Import API uses validateAdminApiKey pattern consistent with existing accommodation APIs'
  - 'SVC-10-02: ImportFromMenuDialog is standalone component (not embedded in OrderManagement) for reusability'

patterns-established:
  - 'Cross-vertical import: GET products from source vertical, POST to create items in target vertical'
  - 'Realtime minibar channel: property-scoped INSERT filter on accom_service_orders'

duration: 4min
completed: 2026-02-02
---

# Phase 34 Plan 05: Dashboard Wiring + Minibar Backoffice + F&B Import Summary

**MinibarSection wired into guest dashboard with DashboardCard, backoffice Realtime notifications for minibar orders, owner confirmation flow, and cross-vertical F&B catalog import picker (SVC-10)**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-01T18:39:41Z
- **Completed:** 2026-02-01T18:43:46Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- MinibarSection conditionally rendered on guest dashboard for properties with self_service categories
- Wine icon DashboardCard scrolls to minibar section on tap
- Backoffice order table shows pink "Minibar" badge on minibar consumption orders
- Supabase Realtime subscription auto-refreshes backoffice when new minibar orders arrive
- Owner can confirm minibar consumption directly from the order row
- Import from Menu API: GET fetches F&B products, POST imports selected items into accommodation service categories
- ImportFromMenuDialog: searchable, category-grouped product picker with bulk import

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire MinibarSection into dashboard + backoffice Realtime + minibar confirmation** - `75ca9e0` (feat)
2. **Task 2: F&B catalog import picker for backoffice services (SVC-10)** - `7705bf1` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - MinibarSection + Wine DashboardCard wired into home tab
- `apps/backoffice/components/accommodations/OrderManagement.tsx` - Minibar badge, confirm button, Realtime subscription
- `apps/backoffice/app/api/accommodations/orders/route.ts` - Added is_minibar_consumption/owner_confirmed to SELECT and response
- `apps/backoffice/app/api/settings/services/import-from-menu/route.ts` - GET/POST for F&B product import
- `apps/backoffice/components/accommodations/ImportFromMenuDialog.tsx` - Full import dialog with search, grouping, bulk import

## Decisions Made

- SVC-10-01: Import API uses `validateAdminApiKey` pattern (consistent with existing accommodation APIs) rather than session-based auth
- SVC-10-02: ImportFromMenuDialog is a standalone component with props interface, not embedded in OrderManagement, for reuse across services pages

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added is_minibar_consumption/owner_confirmed to backoffice orders API**

- **Found during:** Task 1 (OrderManagement backoffice)
- **Issue:** Backoffice orders API route did not include is_minibar_consumption or owner_confirmed in SELECT or response mapping, so the frontend would receive undefined for these fields
- **Fix:** Added both columns to the Supabase SELECT clause and camelCase mapping in the response
- **Files modified:** apps/backoffice/app/api/accommodations/orders/route.ts
- **Verification:** TypeScript compiles cleanly, fields appear in response type
- **Committed in:** 75ca9e0 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for minibar badge and confirm button to work. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 34 (Service Expansion + Minibar) is now complete (5/5 plans done)
- All minibar features implemented: migration, API, self-service UI, dashboard wiring, backoffice Realtime, F&B import
- Ready for Phase 35 (Tourist Services) or Phase 36 (Concierge)
- Migration 096 still needs to be applied to live database

---

_Phase: 34-service-expansion-minibar_
_Completed: 2026-02-02_
