---
phase: 19-property-page-booking-flow
plan: 01
subsystem: api
tags: [supabase, typescript, jwt, pricing, json-ld, seo, booking, date-fns]

# Dependency graph
requires:
  - phase: 18-database-foundation
    provides: accom_properties, accom_rooms, accom_bookings tables with exclusion constraint
provides:
  - TypeScript types for property page, booking form, and API responses
  - Price calculation with weekly/monthly discounts and currency formatting
  - JSON-LD structured data builder for SEO
  - GET /api/property/[slug] endpoint (public property data with rooms)
  - GET /api/property/[slug]/availability endpoint (booked date ranges)
  - POST /api/booking endpoint (submission with JWT, double-booking prevention)
  - Client API helpers (fetchPropertyBySlug, fetchAvailability, submitBooking)
affects: [19-02-property-components, 19-03-page-assembly, 19-04-booking-confirmation]

# Tech tracking
tech-stack:
  added: [embla-carousel-react, react-day-picker, react-international-phone, schema-dts, @phosphor-icons/react]
  patterns: [server-authoritative pricing, DB exclusion constraint for concurrency, expired inquiry filtering]

key-files:
  created:
    - apps/accommodations/frontend/types/property.ts
    - apps/accommodations/frontend/lib/price-utils.ts
    - apps/accommodations/frontend/lib/structured-data.ts
    - apps/accommodations/frontend/lib/property-api.ts
    - apps/accommodations/frontend/lib/booking-api.ts
    - apps/accommodations/frontend/app/api/property/[slug]/route.ts
    - apps/accommodations/frontend/app/api/property/[slug]/availability/route.ts
    - apps/accommodations/frontend/app/api/booking/route.ts
  modified:
    - apps/accommodations/frontend/package.json

key-decisions:
  - "Self-contained ApiResponse<T> in property types (not importing from stay.ts) for module independence"
  - "DB exclusion constraint (23P01) as sole double-booking guard -- no application-level availability check before insert"
  - "Query-time expired inquiry filtering (expires_at) instead of cron job for MVP"

patterns-established:
  - "Server-authoritative pricing: client calculates preview, server recalculates on submission"
  - "Public API routes with getSupabaseAdmin (no guest auth for property viewing)"
  - "Availability filtering excludes cancelled, no_show, and expired inquiry bookings"

# Metrics
duration: 4min
completed: 2026-01-31
---

# Phase 19 Plan 01: Data Layer & API Routes Summary

**TypeScript types, pricing utils, JSON-LD SEO, and 3 API routes (property, availability, booking) with DB-constraint double-booking prevention and JWT guest auth**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-31T03:40:58Z
- **Completed:** 2026-01-31T03:45:04Z
- **Tasks:** 8/8
- **Files created:** 8
- **Files modified:** 1 (package.json)

## Accomplishments

- Property page types covering full data model (PropertyPageData, rooms, pricing, booking, availability)
- Price calculation with weekly (>=7 nights) and monthly (>=28 nights) discounts, VND/USD currency formatting
- Three API routes: property data with room join, availability with expired inquiry exclusion, booking with full validation chain
- Booking endpoint uses DB exclusion constraint (PostgreSQL 23P01) for race-condition-safe double-booking prevention
- JSON-LD structured data for Schema.org LodgingBusiness SEO

## Task Commits

Each task was committed atomically:

1. **Task 1: Install new dependencies** - `53da87c` (chore)
2. **Task 2: Create property types** - `ba72cc1` (feat)
3. **Task 3: Create price-utils library** - `f197fd5` (feat)
4. **Task 4: Create structured-data library** - `5c96a21` (feat)
5. **Task 5: Create GET /api/property/[slug]** - `65d5e0d` (feat)
6. **Task 6: Create GET /api/property/[slug]/availability** - `74aae9c` (feat)
7. **Task 7: Create POST /api/booking** - `2141659` (feat)
8. **Task 8: Create client API helpers** - `a10a3e8` (feat)

## Files Created/Modified

- `types/property.ts` - TypeScript types for property page, booking, availability, pricing
- `lib/price-utils.ts` - calculatePriceBreakdown and formatPrice with Intl.NumberFormat
- `lib/structured-data.ts` - buildLodgingBusinessSchema for JSON-LD SEO
- `lib/property-api.ts` - fetchPropertyBySlug, fetchAvailability client helpers
- `lib/booking-api.ts` - submitBooking client helper
- `app/api/property/[slug]/route.ts` - Public property data endpoint with rooms join
- `app/api/property/[slug]/availability/route.ts` - Booked ranges with expired inquiry exclusion
- `app/api/booking/route.ts` - Booking submission with validation, pricing, JWT, double-booking prevention
- `package.json` - 5 new dependencies added

## Decisions Made

- Self-contained `ApiResponse<T>` in property types rather than importing from `stay.ts` -- keeps property module independent
- No application-level availability check before booking insert -- rely entirely on DB exclusion constraint (23P01) for atomicity
- Query-time expired inquiry filtering (`expires_at IS NULL OR expires_at >= NOW()`) instead of cron job -- sufficient for MVP
- Used non-`!inner` join for accom_rooms in property route to allow properties with mix of active/inactive rooms

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All types, utils, and API routes ready for Phase 19-02 (Property Page Components)
- Components can import types from `@/types/property`, use `fetchPropertyBySlug` for SSR, `fetchAvailability` for calendar, `submitBooking` for form
- Price utils available for both client preview and server authoritative calculation

---

_Phase: 19-property-page-booking-flow_
_Completed: 2026-01-31_
