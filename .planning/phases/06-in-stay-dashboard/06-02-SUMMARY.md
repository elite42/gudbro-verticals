---
phase: 06-in-stay-dashboard
plan: 02
subsystem: frontend-auth
tags: [jwt, session, api-wrappers, verification, accommodations]
dependency-graph:
  requires: [05-01, 05-02]
  provides: [session-hook, api-wrappers, verification-page]
  affects: [06-03, 06-04]
tech-stack:
  added: []
  patterns: [jwt-client-decode, typed-fetch-wrappers, localStorage-session]
key-files:
  created:
    - apps/accommodations/frontend/hooks/useStaySession.ts
    - apps/accommodations/frontend/lib/stay-api.ts
  modified:
    - apps/accommodations/frontend/app/page.tsx
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/route.ts
decisions:
  - id: client-jwt-decode
    decision: Use atob for client-side JWT decode instead of jose library
    reason: No verification needed client-side, avoids importing crypto library to browser
  - id: localStorage-keys
    decision: gudbro_stay_token and gudbro_stay_data as localStorage keys
    reason: Namespaced to avoid collisions with other apps in monorepo
  - id: booking-code-normalize
    decision: Auto-uppercase and auto-prefix BK- on verification input
    reason: Reduces user friction, accepts codes with or without prefix
metrics:
  duration: 4m 44s
  completed: 2026-01-29
---

# Phase 6 Plan 2: Session Hook, API Wrappers & Verification Page Summary

Frontend auth foundation with JWT session management, typed API fetch wrappers for all stay routes, and verification landing page replacing mock property listing.

## Completed Tasks

| #   | Task                                | Commit  | Key Changes                                                                                |
| --- | ----------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| 1   | Session hook and typed API wrappers | 131d64c | useStaySession.ts (JWT lifecycle, localStorage), stay-api.ts (typed fetch for 4 endpoints) |
| 2   | Verification landing page rewrite   | b480f93 | page.tsx rewritten from 900-line mock listing to 210-line verification form                |

## What Was Built

### useStaySession Hook

- JWT lifecycle: store after verify, restore on mount, clear on expire
- Token expiry check via `atob` decode of JWT `exp` claim (no jose on client)
- `isLoading` starts `true` to prevent redirect loops during localStorage check
- Exports: `token`, `stay`, `isLoading`, `isAuthenticated`, `verify()`, `logout()`

### stay-api.ts Typed Wrappers

- Generic `fetchStayAPI<T>(path, token)` with Bearer auth and error handling
- `fetchServices(code, token)` - service categories with items
- `fetchDeals(code, token)` - local deals
- `fetchProperty(code, token)` - property info + WiFi
- `fetchUsefulNumbers(code, token)` - ready for future API route

### Verification Page (app/page.tsx)

- Clean form: booking code + last name
- Booking code auto-uppercases and accepts with/without BK- prefix
- Auto-redirect for returning guests with valid JWT
- Loading states for session check and redirect
- Error handling: user-friendly messages, no booking code enumeration
- Page size reduced from 7.65 kB to 2.47 kB

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed lookup route column names**

- **Found during:** Task 1 (build verification)
- **Issue:** `/api/stay/[code]/route.ts` used wrong DB column names (`guest_name` instead of `guest_first_name`, `check_in_date`/`check_out_date` instead of `check_in`/`check_out`). Pre-existing bug from Phase 5.
- **Fix:** Corrected select query and response mapping to use actual DB column names
- **Files modified:** `apps/accommodations/frontend/app/api/stay/[code]/route.ts`
- **Commit:** 131d64c

**2. [Rule 1 - Bug] Fixed verify route missing guestCountry and column mismatch**

- **Found during:** Task 1 (build verification)
- **Issue:** `BookingInfo` type requires `guestCountry` but verify route didn't include it. Also had column name mismatches with actual DB schema.
- **Fix:** Added `guest_country` to select, included in BookingInfo mapping, corrected all column references
- **Files modified:** `apps/accommodations/frontend/app/api/stay/verify/route.ts`
- **Commit:** 131d64c

## Verification

- [x] `pnpm --filter accommodations-frontend build` passes
- [x] No client-side jose imports
- [x] hooks/useStaySession.ts exists with full JWT lifecycle
- [x] lib/stay-api.ts exists with typed wrappers for 4 endpoints
- [x] app/page.tsx is a verification form (not property listing)
- [x] TypeScript typecheck passes (lint-staged + turbo typecheck)

## Next Phase Readiness

Phase 6 Plan 3 (Dashboard Data Wiring) can proceed. The session hook and API wrappers are ready to be consumed by the dashboard page at `/stay/[code]`.
