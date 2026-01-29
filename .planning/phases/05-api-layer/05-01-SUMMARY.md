---
phase: 05-api-layer
plan: 01
subsystem: api
tags: [nextjs, supabase, jwt, jose, api-routes, accommodations, guest-auth]

# Dependency graph
requires:
  - phase: 04-01
    provides: Accommodations schema with verify_booking_access() function
  - phase: 04-02
    provides: Seed data with testable booking codes (BK-T3ST01)
provides:
  - Supabase service role client (lazy singleton) for server-side API routes
  - JWT sign/verify helpers using jose with HS256 and checkout-based expiry
  - TypeScript types for all API responses (stay, services, deals)
  - GET /api/stay/[code] public booking lookup endpoint
  - POST /api/stay/verify guest verification with JWT issuance
affects: [05-02-protected-routes, 06-frontend-integration]

# Tech tracking
tech-stack:
  added:
    - 'jose ^6.x (JWT sign/verify, edge-compatible)'
    - '@supabase/supabase-js ^2.39.0'
  patterns:
    - 'Lazy singleton Supabase client via Proxy (copied from backoffice)'
    - 'JWT guest tokens with checkout-date-based expiry (checkout + 24h)'
    - 'Consistent { data, error } API response shape'
    - 'Generic error on verification failure to prevent booking code enumeration'

key-files:
  created:
    - apps/accommodations/frontend/lib/supabase.ts
    - apps/accommodations/frontend/lib/auth.ts
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/[code]/route.ts
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
  modified:
    - apps/accommodations/frontend/package.json

key-decisions:
  - 'Used lazy singleton Proxy pattern from backoffice for Supabase client'
  - 'JWT secret via GUEST_JWT_SECRET env var (server-only, no NEXT_PUBLIC prefix)'
  - 'Token expiry = checkout date + 24h buffer via date-fns addHours'
  - 'Generic verification_failed error on both wrong code and wrong last name'
  - 'Booking code regex validates BK- plus 6 chars excluding ambiguous 0/O/1/I/L'

patterns-established:
  - 'API response types in types/stay.ts covering all Phase 5 endpoints'
  - 'RPC result accessed as data[0] (array return from Supabase .rpc())'
  - 'force-dynamic export on all API routes'

# Metrics
duration: 3min
completed: 2026-01-29
---

# Phase 5 Plan 1: Supabase Client, JWT Auth, and Core Stay Routes Summary

**Supabase service role client, jose-based JWT guest auth, TypeScript API types, and two core stay routes (booking lookup + guest verification with JWT issuance)**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-29T12:43:29Z
- **Completed:** 2026-01-29T12:46:30Z
- **Tasks:** 2
- **Files created:** 5
- **Files modified:** 1

## Accomplishments

- Supabase service role client with lazy singleton Proxy pattern (identical to backoffice)
- JWT sign/verify helpers using jose HS256 with checkout-date + 24h expiry
- Complete TypeScript types for all Phase 5 API responses (stay, services, deals)
- Public booking lookup route with code format validation and expiry check
- Guest verification route calling verify_booking_access RPC, returning JWT + full stay data
- Both routes build successfully in Next.js (shown as dynamic `f` routes)

## Task Commits

Each task was committed atomically:

1. **Task 1: Supabase client, JWT auth helpers, and API types** - `05c7dbf` (feat)
   - lib/supabase.ts, lib/auth.ts, types/stay.ts, package.json, pnpm-lock.yaml
2. **Task 2: Public booking lookup and guest verification routes** - `545a31c` (feat)
   - app/api/stay/[code]/route.ts, app/api/stay/verify/route.ts

## Files Created/Modified

- `apps/accommodations/frontend/lib/supabase.ts` - Supabase service role client (lazy singleton via Proxy)
- `apps/accommodations/frontend/lib/auth.ts` - signGuestToken and verifyGuestToken using jose HS256
- `apps/accommodations/frontend/types/stay.ts` - API response types: StayLookupResponse, VerifyResponse, StayData, ServiceCategoryResponse, DealResponse, ApiResponse<T>, ApiError
- `apps/accommodations/frontend/app/api/stay/[code]/route.ts` - GET handler: public booking lookup with code validation, expiry check
- `apps/accommodations/frontend/app/api/stay/verify/route.ts` - POST handler: RPC verification, JWT signing, full stay data fetch and mapping
- `apps/accommodations/frontend/package.json` - Added jose ^6.x and @supabase/supabase-js ^2.39.0

## Decisions Made

- Copied Proxy-based lazy singleton pattern from backoffice supabase-admin.ts for consistency across apps
- JWT secret stored in GUEST_JWT_SECRET (no NEXT_PUBLIC prefix) to prevent browser exposure
- Token expiry calculated as checkout date + 24 hours using date-fns addHours (simpler than combining with checkout_time)
- Verification returns generic error for both invalid code and wrong last name to prevent booking code enumeration
- Booking code regex uses /^BK-[A-HJ-NP-Z2-9]{6}$/ matching the database generation pattern
- Verify route fetches full stay data in a second query after RPC validation succeeds (property, room, booking, WiFi)
- differenceInCalendarDays used for nights calculation instead of manual date math

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

Before testing against live Supabase, add these environment variables to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GUEST_JWT_SECRET=your-random-32-byte-secret
```

## Next Phase Readiness

- Supabase client and auth helpers ready for Plan 05-02 (protected routes: services, deals, property)
- verifyGuestToken exported and ready for auth guard pattern on protected routes
- All API response types already defined in types/stay.ts including ServiceCategoryResponse and DealResponse
- getSupabaseAdmin() shared across all routes

---

_Phase: 05-api-layer_
_Completed: 2026-01-29_
