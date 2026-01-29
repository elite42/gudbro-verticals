---
phase: 05-api-layer
plan: 02
subsystem: api
tags:
  [nextjs, supabase, jwt, api-routes, accommodations, services, deals, property]

# Dependency graph
requires:
  - phase: 05-01
    provides: Supabase client, JWT auth helpers, API response types
provides:
  - Services endpoint with nested categories and items (GET /api/stay/[code]/services)
  - Local partnership deals endpoint (GET /api/stay/[code]/deals)
  - Property info endpoint with WiFi (GET /api/stay/[code]/property)
affects: [06-frontend-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'JWT auth guard pattern: extract Bearer token, verify, return 401 on failure'
    - 'Polymorphic partner_conventions query with partner_type = accommodation'
    - 'Snake_case to camelCase mapping for all DB results'

key-files:
  created:
    - apps/accommodations/frontend/app/api/stay/[code]/services/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/deals/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/property/route.ts
  modified: []

key-decisions:
  - 'Auth guard helper inlined per route (authenticateGuest function) for simplicity'
  - 'Services route fetches is_active on items and filters client-side for nested active items'
  - 'Deals route uses partner_conventions_merchant_id_fkey explicit FK for merchant join'
  - 'Property route returns { property, wifi } as separate objects matching verify route pattern'
  - 'Price returned as raw integer from DB; frontend handles formatting with currency code'

# Metrics
duration: 2min
completed: 2026-01-29
---

# Phase 5 Plan 2: Protected Stay Data Routes Summary

**Three JWT-protected API routes returning services with nested categories/items, local partnership deals from conventions system, and property info with WiFi credentials**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-29T12:48:47Z
- **Completed:** 2026-01-29T12:50:24Z
- **Tasks:** 2
- **Files created:** 3
- **Files modified:** 0

## Accomplishments

- Services route queries accom_service_categories with nested accom_service_items, filtering inactive items and sorting by sort_order
- Deals route queries partner_conventions with partner_type='accommodation' and joins merchants table for display names
- Property route returns full property info (contact, house rules, amenities, checkout time) plus WiFi credentials
- All three routes use consistent JWT auth guard pattern extracting propertyId from token (not URL)
- All routes return consistent { data, error } response shape
- Full Next.js production build passes with all 5 API routes visible as dynamic (f) routes

## Task Commits

Each task was committed atomically:

1. **Task 1: Services and deals routes** - `9f841cb` (feat)
   - app/api/stay/[code]/services/route.ts, app/api/stay/[code]/deals/route.ts
2. **Task 2: Property info route and build verification** - `5796d8f` (feat)
   - app/api/stay/[code]/property/route.ts

## Files Created/Modified

- `apps/accommodations/frontend/app/api/stay/[code]/services/route.ts` - GET handler: JWT-protected, queries service categories with nested items, filters inactive, maps to camelCase
- `apps/accommodations/frontend/app/api/stay/[code]/deals/route.ts` - GET handler: JWT-protected, queries partner_conventions joined with merchants, maps to DealResponse
- `apps/accommodations/frontend/app/api/stay/[code]/property/route.ts` - GET handler: JWT-protected, returns property info + WiFi as separate objects

## Decisions Made

- Auth guard helper (authenticateGuest) inlined in each route rather than extracted to shared file -- three routes is below the threshold where a shared module adds value
- Services query includes is_active on items to filter client-side, since Supabase nested filters have limitations
- Deals route uses explicit FK name (partner_conventions_merchant_id_fkey) for reliable merchant join
- Property route mirrors the verify route structure by returning { property, wifi } as separate top-level keys
- Empty results return 200 with empty array (not 404), since no services/deals is a valid state

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- All 5 API routes complete: lookup (public), verify (public+POST), services, deals, property (all protected)
- Phase 5 (API Layer) is fully complete
- Frontend integration (Phase 6) can now consume all endpoints using the JWT token from verify
- API contract is stable: types in types/stay.ts match route responses exactly

---

_Phase: 05-api-layer_
_Completed: 2026-01-29_
