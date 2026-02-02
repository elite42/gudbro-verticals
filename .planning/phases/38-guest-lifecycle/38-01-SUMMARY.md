---
phase: 38-guest-lifecycle
plan: 01
subsystem: api, database, ui
tags:
  [
    supabase-rpc,
    jwt,
    checkout-requests,
    returning-guest,
    visa-alert,
    postgresql,
  ]

requires:
  - phase: 28-guest-documents
    provides: guest document upload and visa tracking
  - phase: 33-dashboard-refactor
    provides: ProfileView component with stub for Phase 38
  - phase: 37-conventions-vouchers
    provides: booking flow with voucher support

provides:
  - find_returning_guest() SQL function with multi-signal matching
  - accom_checkout_requests table for early/late checkout workflow
  - Backoffice returning guest badge, visa expiry alert, checkout request queue
  - Guest PWA checkout request form with status tracking
  - Guest country/nationality capture in booking flow

affects: [38-02, accommodations-notifications, owner-analytics]

tech-stack:
  added: []
  patterns:
    - 'Multi-signal guest matching (email OR name+phone OR name+country, never name alone)'
    - 'Checkout request flow: guest submits via JWT-auth API, owner approves/rejects via backoffice'
    - 'Conflict detection via adjacent booking lookup on same room'

key-files:
  created:
    - shared/database/migrations/schema/100-guest-lifecycle.sql
    - apps/backoffice/app/api/accommodations/checkout-requests/route.ts
    - apps/backoffice/app/api/accommodations/returning-guest/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/checkout-request/route.ts
  modified:
    - apps/backoffice/app/(dashboard)/accommodations/bookings/[id]/page.tsx
    - apps/backoffice/app/api/accommodations/bookings/[id]/route.ts
    - apps/accommodations/frontend/components/booking/BookingForm.tsx
    - apps/accommodations/frontend/hooks/useBookingForm.ts
    - apps/accommodations/frontend/app/api/booking/route.ts
    - apps/accommodations/frontend/types/property.ts
    - apps/accommodations/frontend/app/property/[slug]/PropertyPageClient.tsx
    - apps/accommodations/frontend/components/stay/ProfileView.tsx

key-decisions:
  - 'GUEST-01: Returning guest detection uses SECURITY DEFINER SQL function with 3 OR signals'
  - 'GUEST-02: Checkout request unique constraint per booking+type (one request per type)'
  - 'GUEST-03: Conflict detection runs on GET (lazy evaluation, not on insert)'
  - 'GUEST-04: Guest country field uses static select with ~27 common countries + Other'

patterns-established:
  - 'RPC proxy pattern: backoffice calls /api/returning-guest which calls supabase.rpc()'
  - 'Checkout request lifecycle: pending -> approved/rejected with responded_at timestamp'

duration: 9min
completed: 2026-02-02
---

# Phase 38 Plan 01: Guest Lifecycle Foundation Summary

**Multi-signal returning guest detection via SQL RPC, visa expiry alerts for owners, and early/late checkout request flow with conflict detection**

## Performance

- **Duration:** 9 min
- **Started:** 2026-02-02T02:42:38Z
- **Completed:** 2026-02-02T02:51:55Z
- **Tasks:** 3
- **Files modified:** 12

## Accomplishments

- find_returning_guest() SQL function with 3-signal matching (email, name+phone, name+country) — never matches on name alone
- Backoffice booking detail shows returning guest badge with visit count, visa expiry warning, and checkout request queue with approve/reject
- Guest PWA ProfileView replaced preferences stub with checkout request form (time picker + reason + status display)
- BookingForm captures optional guest country/nationality for improved returning guest matching

## Task Commits

Each task was committed atomically:

1. **Task 1: Database migration + guest country in booking flow** - `55c4134` (feat)
2. **Task 2: Backoffice booking detail enhancements** - `c7b688a` (feat)
3. **Task 3: Guest PWA checkout request form + API** - `7fee754` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/100-guest-lifecycle.sql` - SQL function + checkout requests table
- `apps/backoffice/app/api/accommodations/checkout-requests/route.ts` - Owner GET+PATCH for request management
- `apps/backoffice/app/api/accommodations/returning-guest/route.ts` - RPC proxy for returning guest detection
- `apps/accommodations/frontend/app/api/stay/[code]/checkout-request/route.ts` - Guest POST+GET for requests
- `apps/backoffice/app/(dashboard)/accommodations/bookings/[id]/page.tsx` - Badge, visa alert, request queue
- `apps/backoffice/app/api/accommodations/bookings/[id]/route.ts` - Added guest_country+property_id to select
- `apps/accommodations/frontend/components/booking/BookingForm.tsx` - Country selector
- `apps/accommodations/frontend/hooks/useBookingForm.ts` - guestCountry state
- `apps/accommodations/frontend/app/api/booking/route.ts` - Insert guest_country
- `apps/accommodations/frontend/types/property.ts` - guestCountry in BookingSubmission
- `apps/accommodations/frontend/app/property/[slug]/PropertyPageClient.tsx` - Pass guestCountry props
- `apps/accommodations/frontend/components/stay/ProfileView.tsx` - Checkout request form replacing stub

## Decisions Made

- GUEST-01: Returning guest detection uses SECURITY DEFINER SQL function with 3 OR signals (email, name+phone, name+country). Never matches on name alone to avoid false positives.
- GUEST-02: Unique constraint (booking_id, request_type) prevents duplicate checkout requests per type.
- GUEST-03: Conflict detection runs lazily on GET (when owner views requests) rather than on insert, to always show current state.
- GUEST-04: Guest country uses static select with ~27 most common SEA + Western countries plus "Other" option.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created returning-guest API endpoint for backoffice**

- **Found during:** Task 2 (Backoffice booking detail)
- **Issue:** Plan specified calling find_returning_guest() RPC from booking detail page, but the page is a client component that fetches via API routes, not directly from Supabase. Needed an API proxy.
- **Fix:** Created /api/accommodations/returning-guest/route.ts that proxies the RPC call
- **Files modified:** apps/backoffice/app/api/accommodations/returning-guest/route.ts
- **Verification:** TypeScript passes, endpoint returns correct shape
- **Committed in:** c7b688a (Task 2 commit)

**2. [Rule 3 - Blocking] Added guest_country and property_id to booking detail API select**

- **Found during:** Task 2 (Backoffice booking detail)
- **Issue:** Booking detail API did not return guest_country or property_id, needed for returning guest RPC call
- **Fix:** Added both fields to the Supabase select statement
- **Files modified:** apps/backoffice/app/api/accommodations/bookings/[id]/route.ts
- **Verification:** TypeScript passes
- **Committed in:** c7b688a (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both auto-fixes necessary to connect the client-side UI to the server-side RPC. No scope creep.

## Issues Encountered

None

## User Setup Required

- Migration 100 needs to be applied to live database (`100-guest-lifecycle.sql`)

## Next Phase Readiness

- Guest lifecycle foundation complete with returning guest detection and checkout request flow
- Ready for Phase 38-02 (if exists) or next milestone
- Migration 100 needs to be applied alongside pending migrations 095-099

---

_Phase: 38-guest-lifecycle_
_Completed: 2026-02-02_
