---
phase: 06-in-stay-dashboard
plan: 01
subsystem: accommodations-backend
tags: [database, api, useful-numbers, quick-actions, bug-fix]
dependency-graph:
  requires: [04-01, 04-02, 05-01, 05-02]
  provides: [useful-numbers-api, phase6-schema-extensions, lookup-bug-fix]
  affects: [06-02, 06-03, 06-04]
tech-stack:
  added: []
  patterns: [parallel-fetch, inline-auth-guard]
key-files:
  created:
    - shared/database/migrations/schema/079-accommodations-phase6-extensions.sql
    - apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/[code]/route.ts
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
decisions:
  - 'City useful numbers seeded via city_useful_numbers table from migration 073 (reuse existing infrastructure)'
  - 'Quick actions stored as JSONB array on accom_properties (flexible, no extra table needed)'
  - 'Guest country stored as TEXT on accom_bookings (ISO code, no CHECK constraint for flexibility)'
  - 'Property contact in useful numbers includes emergency_phone fallback to host_phone'
metrics:
  duration: '4 minutes'
  completed: '2026-01-29'
---

# Phase 6 Plan 1: Backend Extensions for Dashboard Sections Summary

Schema extensions + useful numbers API + bug fixes for Phase 6 in-stay dashboard sections.

## One-liner

DB migration adding quick_actions/return_banner/guest_country columns, Da Nang useful numbers seed, new useful-numbers API route, and column name bug fixes in lookup + verify routes.

## What Was Built

### Task 1: Database Migration (079)

- Added 3 columns to `accom_properties`: `quick_actions` (JSONB), `return_banner_text` (TEXT), `return_banner_url` (TEXT)
- Added 1 column to `accom_bookings`: `guest_country` (TEXT)
- Seeded 8 Da Nang city useful numbers (police, ambulance, fire, tourist police, immigration, hospital, 2x taxi)
- Seeded demo property quick actions (room service, concierge, housekeeping, report issue) and return banner
- Set demo booking guest_country to 'US'
- All seeds use ON CONFLICT DO NOTHING for idempotent re-runs

### Task 2: Useful Numbers API + Types + Bug Fixes

- Created `GET /api/stay/[code]/useful-numbers` with JWT auth guard
- Parallel fetches emergency_numbers (by country) and city_useful_numbers (by country + city)
- Returns `{ emergency, city, property }` with property contact fallback
- Extended types: `UsefulNumbersResponse`, `EmergencyNumber`, `CityNumber`, `QuickAction`, `PropertyExtended`
- Added `guestCountry` to `BookingInfo` type
- Fixed lookup route: `guest_first_name` -> `guest_name`, `check_in` -> `check_in_date`, `check_out` -> `check_out_date`
- Fixed verify route: same column name corrections + added `guest_country` select

## Commits

| #   | Hash    | Message                                                               |
| --- | ------- | --------------------------------------------------------------------- |
| 1   | aa3a9b7 | feat(06-01): database migration for Phase 6 extensions                |
| 2   | 2393717 | feat(06-01): useful numbers API route, extended types, lookup bug fix |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed column names in verify route**

- **Found during:** Task 2 (build failed)
- **Issue:** verify/route.ts used wrong column names (`guest_first_name`, `check_in`, `check_out`) that didn't match schema (`guest_name`, `check_in_date`, `check_out_date`). Same bug as lookup route but not listed in plan.
- **Fix:** Corrected all column references in verify route + added `guest_country` to select and BookingInfo mapping
- **Files modified:** apps/accommodations/frontend/app/api/stay/verify/route.ts
- **Commit:** 2393717

## Verification

- [x] Migration file exists at `shared/database/migrations/schema/079-accommodations-phase6-extensions.sql`
- [x] New API route exists at `apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts`
- [x] Types file extended with new response types
- [x] Lookup route uses `guest_name` (not `guest_first_name`)
- [x] `pnpm --filter accommodations-frontend build` succeeds
- [x] Typecheck passes

## Next Phase Readiness

No blockers. Phase 6 Plan 2 can proceed with frontend component integration using these backend extensions.
