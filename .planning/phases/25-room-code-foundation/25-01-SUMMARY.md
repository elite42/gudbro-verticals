---
phase: 25-room-code-foundation
plan: 01
subsystem: database
tags: [postgres, plpgsql, security-definer, room-codes, qr-access, timezone]

# Dependency graph
requires:
  - phase: accommodations-schema (migration 077)
    provides: accom_rooms, accom_bookings, accom_properties tables, generate_booking_code() pattern
provides:
  - room_code column on accom_rooms (RM-XXXXXXXX format, permanent, unique)
  - generate_room_code() SECURITY DEFINER function
  - set_room_code() trigger for auto-assignment on INSERT
  - resolve_room_access(TEXT) SECURITY DEFINER function for QR-based room access
  - Backfill of all existing rooms with generated codes
affects:
  - 25-02 (API route + frontend consuming resolve_room_access via supabase.rpc())
  - Phase 26 (two-tier JWT auth using resolve_room_access output)
  - Phase 27 (in-stay dashboard rendering based on resolved booking data)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Room code generation: RM-XXXXXXXX with retry loop (follows BK-XXXXXX pattern)'
    - 'Timezone-aware date resolution: (NOW() AT TIME ZONE property.timezone)::DATE'
    - 'Three-shape return pattern: invalid / valid+booking / valid+no-booking'

key-files:
  created:
    - shared/database/migrations/schema/088-room-codes.sql
  modified: []

key-decisions:
  - '8-char room codes (vs 6 for bookings) for larger keyspace since codes are permanent'
  - 'Timezone-aware date comparison using property timezone, not CURRENT_DATE'
  - 'Asia/Ho_Chi_Minh fallback when property timezone is NULL'
  - 'No guest_last_name in resolve_room_access return (browse tier privacy)'
  - 'ORDER BY check_in_date DESC LIMIT 1 as safety net against impossible overlaps'

patterns-established:
  - 'resolve_room_access three-shape return: invalid(false,false,nulls), valid-with-booking(true,true,data), valid-no-booking(true,false,room-data)'
  - 'Room code format: RM- prefix + 8 chars from ABCDEFGHJKMNPQRSTUVWXYZ23456789'

# Metrics
duration: 4min
completed: 2026-02-01
---

# Phase 25 Plan 01: Room Codes Migration Summary

**Migration 088 with permanent RM-XXXXXXXX room codes, auto-generation trigger, and resolve_room_access() SECURITY DEFINER for timezone-aware QR-based booking resolution**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-31T18:54:42Z
- **Completed:** 2026-01-31T18:58:36Z
- **Tasks:** 1
- **Files created:** 1

## Accomplishments

- Created migration 088 with generate_room_code() producing RM-XXXXXXXX codes (8 chars, no ambiguous 0/O/1/I/L)
- Added room_code column to accom_rooms with UNIQUE constraint, NOT NULL after backfill
- Built resolve_room_access(TEXT) SECURITY DEFINER with timezone-aware date comparison and three distinct return shapes
- Granted EXECUTE to anon + authenticated roles for QR-based unauthenticated access

## Task Commits

Each task was committed atomically:

1. **Task 1: Create migration 088 - Room codes and resolve_room_access** - `ccdabc7` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/088-room-codes.sql` - Complete migration: room_code column, generate_room_code(), set_room_code() trigger, backfill, resolve_room_access(), index, grants, comments

## Decisions Made

- **8-char codes:** Room codes use 8 characters (vs 6 for booking codes) because room codes are permanent and need a larger keyspace to avoid collisions over time
- **Timezone-aware dates:** Uses `(NOW() AT TIME ZONE property.timezone)::DATE` instead of `CURRENT_DATE` to avoid timezone mismatch near midnight (critical for SEA properties in UTC+7)
- **Asia/Ho_Chi_Minh fallback:** COALESCE to Vietnam timezone when property timezone is NULL (all current properties are in Vietnam)
- **No PII in browse tier:** resolve_room_access returns guest_name but NOT guest_last_name (browse tier should not expose PII via QR scan)
- **Safety net ordering:** ORDER BY check_in_date DESC LIMIT 1 handles impossible overlap edge cases

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Supabase CLI not available locally for migration application. Migration file created correctly and will be applied via Supabase dashboard or deployment pipeline. Not a blocker for the plan.

## User Setup Required

Migration needs to be applied to Supabase. Run the SQL in `shared/database/migrations/schema/088-room-codes.sql` via Supabase SQL Editor or migration pipeline.

## Next Phase Readiness

- Database foundation complete: room_code column, generation, trigger, resolve function all ready
- Plan 25-02 can build the `/api/stay/room/[roomCode]` API route that calls `supabase.rpc('resolve_room_access', { p_room_code })`
- All existing rooms will have room codes after migration runs (backfill included)

---

_Phase: 25-room-code-foundation_
_Completed: 2026-02-01_
