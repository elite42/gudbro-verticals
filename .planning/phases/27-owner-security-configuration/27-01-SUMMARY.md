---
phase: 27-owner-security-configuration
plan: 01
subsystem: database, ui, api
tags: [jsonb, supabase, access-control, backoffice, security-presets]

requires:
  - phase: 26-progressive-authentication
    provides: guest_verification_method column, resolve_room_access() function, AccessTier types
provides:
  - access_settings JSONB column on accom_properties with preset + actions shape
  - resolve_room_access() updated to return access_settings
  - AccessSettings type and ACCESS_PRESETS constant in stay.ts
  - Backoffice security settings page at /accommodations/security
  - Property API accepts access_settings and guest_verification_method in PUT
affects:
  [
    27-02 (frontend enforcement),
    phase-28 (document upload may check access_settings),
  ]

tech-stack:
  added: []
  patterns: [JSONB preset+actions pattern for per-action gating configuration]

key-files:
  created:
    - shared/database/migrations/schema/090-access-settings.sql
    - apps/backoffice/app/(dashboard)/accommodations/security/page.tsx
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/backoffice/app/api/accommodations/property/route.ts

key-decisions:
  - 'access_settings stored as JSONB with preset name + individual action booleans (not just preset name) to support custom overrides'
  - 'Preset definitions duplicated in backoffice page (not imported from accommodations frontend) to avoid cross-app dependency'
  - 'CHECK constraint allows NULL access_settings for backward compat with existing properties'
  - 'true = gated (requires verification), false = free for browse tier — consistent with security-first mental model'

patterns-established:
  - 'JSONB preset+actions: Store both the preset name and individual overrides so UI can detect custom state'
  - 'Auto-detect preset: When toggles match a known preset exactly, auto-select that preset card'

duration: 3min
completed: 2026-02-01
---

# Phase 27 Plan 01: Owner Security Configuration Summary

**access_settings JSONB schema with 3 presets (Family/Standard/Structured), backoffice security page with preset cards and per-action toggle switches, property API updated for read/write**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-31T23:49:37Z
- **Completed:** 2026-01-31T23:52:23Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Migration 090 adds access_settings JSONB column with standard preset default and CHECK constraint on preset values
- resolve_room_access() updated to return access_settings alongside guest_verification_method
- Backoffice security page with verification method selector, 3 preset cards, and 5 per-action toggle switches
- Property API GET/PUT both support access_settings and guest_verification_method fields

## Task Commits

Each task was committed atomically:

1. **Task 1: Migration 090 + AccessSettings types** - `c673fe5` (feat)
2. **Task 2: Backoffice security settings page + API update** - `a69358b` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/090-access-settings.sql` - JSONB column, CHECK constraint, updated resolve_room_access()
- `apps/accommodations/frontend/types/stay.ts` - AccessSettings interface, ACCESS_PRESETS constant, accessSettings on RoomStayData
- `apps/backoffice/app/(dashboard)/accommodations/security/page.tsx` - Security settings page with preset selector and action toggles
- `apps/backoffice/app/api/accommodations/property/route.ts` - Added access_settings and guest_verification_method to GET select and PUT allowedFields

## Decisions Made

- access_settings JSONB stores both preset name and individual action booleans to support custom overrides beyond presets
- Preset definitions duplicated in backoffice page rather than importing from accommodations frontend (avoids cross-app dependency)
- CHECK constraint allows NULL for backward compatibility with existing properties that haven't configured settings yet
- Boolean convention: true = gated (requires verification), false = free — security-first mental model

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. Migration 090 must be applied to Supabase before the security page can persist settings.

## Next Phase Readiness

- access_settings column ready for frontend enforcement in Plan 02
- resolve_room_access() returns access_settings so frontend can gate actions per-owner configuration
- Backoffice page ready for owner use once migration is applied

---

_Phase: 27-owner-security-configuration_
_Completed: 2026-02-01_
