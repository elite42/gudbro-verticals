---
phase: 04-database-foundation
plan: 01
subsystem: database
tags:
  [postgresql, supabase, rls, accommodations, security-definer, booking-codes]

# Dependency graph
requires:
  - phase: none
    provides: accounts table (P5 unified accounts from existing codebase)
provides:
  - accom_properties table for property identity, WiFi, contact, settings
  - accom_rooms table for room inventory per property
  - accom_bookings table with auto-generated BK-XXXXXX codes
  - accom_service_categories and accom_service_items for dynamic services
  - accom_service_translations for multi-language support
  - verify_booking_access() SECURITY DEFINER function for guest authentication
  - RLS policies enforcing owner CRUD via P5 accounts pattern
affects: [04-02-seed-data, 05-api-layer, 06-frontend, 07-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'SECURITY DEFINER function for guest access (no RLS on bookings for anon)'
    - 'Booking code generation with ambiguous character exclusion'
    - 'Owner access via accounts.auth_id = auth.uid() subquery pattern'

key-files:
  created:
    - shared/database/migrations/schema/077-accommodations-schema.sql
  modified: []

key-decisions:
  - 'Guest access via SECURITY DEFINER function, not RLS policy on bookings table'
  - 'Booking codes use BK-XXXXXX format excluding 0/O/1/I/L for readability'
  - 'Price stored as INTEGER (minor currency unit) not DECIMAL'
  - 'Functions created before tables to enable trigger references'

patterns-established:
  - 'Accommodations tables prefixed with accom_ namespace'
  - 'Owner RLS via nested subquery: owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())'
  - 'Child table RLS via property ownership chain'

# Metrics
duration: 2min
completed: 2026-01-29
---

# Phase 4 Plan 1: Accommodations Schema Summary

**6-table accommodations schema with booking code generation, SECURITY DEFINER guest verification, and P5-pattern RLS policies**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-29T11:42:36Z
- **Completed:** 2026-01-29T11:44:37Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Complete accommodations database schema in single migration (077)
- 3 SECURITY DEFINER functions for booking code generation and guest access verification
- RLS policies enforcing owner CRUD via P5 accounts pattern, anon read on public tables
- 10 indexes covering FKs, slugs, booking codes, and date range queries

## Task Commits

Each task was committed atomically:

1. **Task 1: Create tables, functions, and triggers** - `28dc593` (feat)
   - Note: Task 2 (RLS, indexes, grants) was included in this commit since all content belongs to a single migration file

**Plan metadata:** pending

## Files Created/Modified

- `shared/database/migrations/schema/077-accommodations-schema.sql` - Complete accommodations schema: 6 tables, 3 functions, 7 triggers, 10 indexes, 11 RLS policies, 13 grants

## Decisions Made

- Guest access via SECURITY DEFINER function rather than RLS on bookings — prevents anon from querying bookings table directly while allowing controlled access through booking code + last name verification
- Booking codes use BK-XXXXXX with ambiguous character exclusion (0/O, 1/I/L) for human readability when guests type codes
- Price as INTEGER (minor currency unit) — consistent with existing coffeeshop patterns, avoids floating point issues
- Tasks 1 and 2 combined into single commit since both target the same file and SQL migration must be atomic

## Deviations from Plan

None - plan executed exactly as written. Tasks 1 and 2 were logically combined since they modify the same migration file and SQL migrations are inherently atomic.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required. Migration is ready to apply to Supabase when needed.

## Next Phase Readiness

- Schema ready for seed data (04-02) — all tables, functions, constraints, and RLS in place
- verify_booking_access() ready for API layer (Phase 5) to call from Next.js routes
- Owner RLS pattern ready for backoffice CRUD endpoints

---

_Phase: 04-database-foundation_
_Completed: 2026-01-29_
