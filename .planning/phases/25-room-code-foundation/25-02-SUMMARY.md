---
phase: 25-room-code-foundation
plan: 02
subsystem: api, auth, ui
tags: [jwt, browse-tier, room-code, qr, next.js, supabase, rpc]

# Dependency graph
requires:
  - phase: 25-01
    provides: resolve_room_access RPC, accom_room_codes table, generate_room_code function
provides:
  - GET /api/stay/room/[roomCode] endpoint for room code resolution
  - useRoomSession hook for client-side room session management
  - /stay/room/[roomCode] browse-tier dashboard page
  - Browse-tier JWT with accessTier claim (backward-compatible)
  - RoomStayData, RoomResolveResponse, AccessTier types
affects: [26-inline-verification, 27-ordering-upgrade, room-code-admin]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Browse-tier JWT: accessTier claim defaults to 'full' for backward compat"
    - 'Room session shares localStorage keys with booking session (latest wins)'
    - 'Privacy-first browse tier: no guest name, booking code, or guest count exposed'

key-files:
  created:
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts
    - apps/accommodations/frontend/hooks/useRoomSession.ts
    - apps/accommodations/frontend/app/stay/room/[roomCode]/page.tsx
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/lib/auth.ts

key-decisions:
  - 'Browse tier hides all PII (guest name, booking code, guest count) for privacy'
  - 'signGuestToken accepts null bookingId for no-booking room sessions'
  - 'RestaurantSection gets empty bookingCode/token in browse tier (deep-link only, no static menu)'
  - 'Room code format validation: /^RM-[A-HJ-NP-Z2-9]{8}$/ matches generate_room_code() charset'
  - 'No-booking token expires 7 days from now; active-booking token expires checkout+24h'

patterns-established:
  - "AccessTier pattern: optional claim in JWT, defaults to 'full' for backward compat"
  - 'Room session auto-resolves on mount (no manual verify step)'
  - 'Two render paths in dashboard: no-booking (property info) vs active-booking (browse dashboard)'

# Metrics
duration: 5min
completed: 2026-02-01
---

# Phase 25 Plan 02: Room Code Frontend Summary

**Browse-tier JWT, room resolution API, useRoomSession hook, and /stay/room/[roomCode] dashboard with privacy-first QR scan experience**

## Performance

- **Duration:** 5 min
- **Started:** 2026-01-31T19:03:52Z
- **Completed:** 2026-01-31T19:08:50Z
- **Tasks:** 4
- **Files modified:** 5

## Accomplishments

- Extended GuestTokenPayload with accessTier (defaults to 'full' for backward compat) and roomCode claims
- Created GET /api/stay/room/[roomCode] that validates format, calls resolve_room_access RPC, returns browse-tier JWT
- Built useRoomSession hook with auto-resolve on mount, session caching, and room code matching
- Created /stay/room/[roomCode] page with two render paths: no-booking property info and active-booking browse dashboard
- Zero changes to existing /stay/[code] route and /api/stay/verify route

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend types and auth for browse-tier JWT** - `f0282b8` (feat)
2. **Task 2: Create room code resolution API route** - `3499b8a` (feat)
3. **Task 3: Create useRoomSession hook** - `bb293c0` (feat)
4. **Task 4: Create room dashboard page** - `8566412` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/types/stay.ts` - Added AccessTier, RoomResolveResponse, RoomStayData types, invalid_room_code error
- `apps/accommodations/frontend/lib/auth.ts` - Extended GuestTokenPayload, signGuestToken (null bookingId), verifyGuestToken (accessTier default)
- `apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts` - Room code resolution endpoint with RPC call and browse-tier JWT
- `apps/accommodations/frontend/hooks/useRoomSession.ts` - Client-side room session management with auto-resolve and caching
- `apps/accommodations/frontend/app/stay/room/[roomCode]/page.tsx` - Browse-tier dashboard with WiFi, property info, contacts, house rules

## Decisions Made

- Adapted page component props to match actual existing component interfaces (CheckoutInfo takes checkoutTime+houseRules, ContactSheet takes phone+whatsapp+roomNumber+propertyName, RestaurantSection takes hasLinkedFnb+linkedFnbSlug+bookingCode+token)
- RestaurantSection receives empty bookingCode/token in browse tier -- this triggers the deep-link branch (Branch A) when hasLinkedFnb is true, and renders nothing otherwise (Branch C with empty token)
- Used existing design system colors (#FAF8F5, #2D2016, #8B7355, #3D8B87, #E07A5F) instead of generic Tailwind grays
- Loading and error states match existing stay/[code] page visual style

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed component prop interfaces in page**

- **Found during:** Task 4 (room dashboard page)
- **Issue:** Plan specified incorrect prop interfaces for CheckoutInfo (checkOut+checkoutTime), ContactSheet (phone+email+whatsapp), and RestaurantSection (slug only)
- **Fix:** Used actual component prop signatures: CheckoutInfo(checkoutTime, houseRules), ContactSheet(phone, whatsapp, roomNumber, propertyName), RestaurantSection(hasLinkedFnb, linkedFnbSlug, bookingCode, token)
- **Files modified:** apps/accommodations/frontend/app/stay/room/[roomCode]/page.tsx
- **Verification:** TypeScript compiles, build passes
- **Committed in:** 8566412 (Task 4 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Component prop fix was necessary for type safety. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Room QR flow is complete end-to-end: scan -> resolve -> dashboard
- Ready for Phase 26: inline verification to upgrade browse-tier to full-tier for ordering
- Ready for Phase 27: ordering capability in full-tier dashboard
- Admin room code management (generate, view, print QR) can be built independently

---

_Phase: 25-room-code-foundation_
_Completed: 2026-02-01_
