---
phase: 07-fnb-integration
plan: 01
subsystem: database, api
tags: [postgresql, supabase, accommodations, fnb, migration, typescript]

# Dependency graph
requires:
  - phase: 04-database-foundation
    provides: accom_properties table schema
  - phase: 05-api-auth
    provides: property API route and guest auth
  - phase: 06-dashboard
    provides: PropertyInfo type and PropertyExtended interface
provides:
  - has_linked_fnb and linked_fnb_slug columns on accom_properties
  - PropertyInfo type with F&B linking fields
  - Property API route returning F&B config
  - Demo property linked to coffeeshop slug
affects: [07-02 frontend RestaurantSection, future F&B deep-linking]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'F&B linking via boolean flag + merchant slug (not FK to merchants)'

key-files:
  created:
    - shared/database/migrations/schema/080-accommodations-fnb-integration.sql
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/[code]/property/route.ts
    - apps/accommodations/frontend/app/api/stay/verify/route.ts

key-decisions:
  - 'F&B linking uses slug-based deep-linking (not FK to merchants table)'
  - 'INT-01 satisfied by existing partner_conventions polymorphic pattern (partner_id + partner_type)'
  - 'No redundant property_id column on partner_conventions (data drift risk)'

patterns-established:
  - 'Cross-vertical linking via slug: has_linked_X + linked_X_slug pattern'

# Metrics
duration: 3min
completed: 2026-01-30
---

# Phase 7 Plan 01: F&B Backend Integration Summary

**Migration 080 adds has_linked_fnb/linked_fnb_slug to accom_properties; property API returns F&B config for coffeeshop deep-linking**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-29T20:05:08Z
- **Completed:** 2026-01-29T20:08:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Migration 080 adds F&B linking columns to accom_properties with demo seed
- PropertyInfo type extended with hasLinkedFnb and linkedFnbSlug fields
- Property and verify API routes both return F&B configuration
- INT-01 documented as satisfied by existing conventions system pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Database migration and seed update for F&B linking** - `83e269c` (feat)
2. **Task 2: Extend types and property API route for F&B fields** - `d35a478` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/080-accommodations-fnb-integration.sql` - Migration adding has_linked_fnb, linked_fnb_slug columns and demo seed
- `apps/accommodations/frontend/types/stay.ts` - PropertyInfo with hasLinkedFnb and linkedFnbSlug
- `apps/accommodations/frontend/app/api/stay/[code]/property/route.ts` - SELECT and map F&B fields
- `apps/accommodations/frontend/app/api/stay/verify/route.ts` - Also returns F&B fields in verify response

## Decisions Made

- F&B linking uses slug-based deep-linking (merchant slug string) rather than FK to merchants table -- keeps accommodations decoupled from coffeeshop schema
- INT-01 (conventions system connection) is satisfied by existing polymorphic partner_id + partner_type='accommodation' pattern in partner_conventions -- no redundant FK needed
- Documented INT-01 decision as SQL comment in migration for future reference

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed verify/route.ts missing F&B fields**

- **Found during:** Task 2 (TypeScript check)
- **Issue:** verify/route.ts also constructs PropertyInfo but was missing hasLinkedFnb and linkedFnbSlug, causing TS2739
- **Fix:** Added has_linked_fnb and linked_fnb_slug to SELECT and PropertyInfo mapping in verify/route.ts
- **Files modified:** apps/accommodations/frontend/app/api/stay/verify/route.ts
- **Verification:** TypeScript compiles clean after fix
- **Committed in:** d35a478 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix -- verify route must match PropertyInfo type. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- F&B backend config ready for frontend RestaurantSection component (plan 07-02)
- PropertyInfo.hasLinkedFnb enables conditional rendering of restaurant section
- PropertyInfo.linkedFnbSlug enables deep-linking to coffeeshop PWA

---

_Phase: 07-fnb-integration_
_Completed: 2026-01-30_
