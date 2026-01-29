---
phase: 04-database-foundation
plan: 02
subsystem: database
tags: [postgresql, seed-data, accommodations, demo-data, partnerships]

# Dependency graph
requires:
  - phase: 04-01
    provides: Accommodations schema (tables, functions, triggers, RLS)
provides:
  - Complete demo property "Roots Da Nang" with rooms, bookings, services, partnerships
  - Testable booking codes BK-T3ST01 (current) and BK-F8TR02 (future)
  - 3 partner merchants with convention deals
affects: [05-api-layer, 06-frontend-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Deterministic UUIDs for seed data (aa..01, bb..01 pattern)'
    - 'ON CONFLICT DO NOTHING for idempotent merchant/account inserts'
    - 'CURRENT_DATE arithmetic for always-valid test bookings'

key-files:
  created:
    - shared/database/migrations/schema/078-accommodations-seed.sql

key-decisions:
  - 'Created demo host account (a0..10) to satisfy accom_properties.owner_id NOT NULL FK'
  - '13 service items instead of 12 (added Express Wash for realistic laundry tier)'
  - 'Merchant inserts use ON CONFLICT DO NOTHING for idempotency'

patterns-established:
  - 'Seed UUID pattern: aa/bb/cc/dd/ee/ff prefixes map to rooms/bookings/categories/items/merchants/conventions'

# Metrics
duration: 3min
completed: 2026-01-29
---

# Phase 4 Plan 2: Accommodations Seed Data Summary

**Complete demo property "Roots Da Nang" with 3 rooms, 2 bookings, 13 services, and 3 local partnership deals via conventions system**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-29T11:48:18Z
- **Completed:** 2026-01-29T11:51:30Z
- **Tasks:** 1
- **Files created:** 1

## Accomplishments

- Demo property with WiFi credentials, amenities, house rules, host contact
- Current booking BK-T3ST01 testable via verify_booking_access() immediately
- Future booking BK-F8TR02 correctly returns invalid (check_in > CURRENT_DATE)
- Local partnerships use existing B2B conventions system (migration 050)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create seed data migration** - `d0b7492` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/078-accommodations-seed.sql` - Complete demo data: 1 property, 3 rooms, 2 bookings, 3 service categories, 13 service items, 3 merchants, 3 partner conventions

## Decisions Made

- Created a dedicated demo host account (`a0000000-0000-0000-0000-000000000010`) because `accom_properties.owner_id` is NOT NULL with FK to accounts table
- Used 13 service items (plan said ~12): added Express Wash and Fold to give laundry category 3 tiers (standard/iron/express) for realistic pricing
- Merchant inserts use `ON CONFLICT (id) DO NOTHING` for idempotent re-runs
- Account insert also uses `ON CONFLICT (id) DO NOTHING` for safety

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Created demo host account for owner_id FK**

- **Found during:** Task 1 (property insert)
- **Issue:** `accom_properties.owner_id` is NOT NULL REFERENCES accounts(id), but no account existed for the demo host
- **Fix:** Added INSERT INTO accounts with deterministic UUID before property insert
- **Files modified:** 078-accommodations-seed.sql (Section 0 added)
- **Verification:** Property insert references valid account UUID
- **Committed in:** d0b7492

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for FK constraint satisfaction. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Database foundation complete (schema + seed data)
- Ready for Phase 5: API layer (Next.js API routes for guest verification, property data, services)
- Booking codes BK-T3ST01 and BK-F8TR02 provide immediate test fixtures

---

_Phase: 04-database-foundation_
_Completed: 2026-01-29_
