---
phase: 33-guest-dashboard-redesign
plan: 02
subsystem: ui
tags: [bottom-sheet, navigation, profile, phosphor-icons, bottom-nav]

# Dependency graph
requires:
  - phase: 33-01
    provides: DashboardGrid, DashboardCard, card-based homepage layout
provides:
  - HouseRulesSheet bottom sheet with check-in/out times
  - ProfileView with guest data, documents, order history, visa status
  - Contact Host button in DashboardHeader
  - Controlled ContactSheet (externally triggered)
  - 4-tab BottomNav (Home, Explore, Services, Profile)
  - checkInTime and checkoutProcedure on PropertyInfo type
affects: [34-local-services-expansion, 36-tourist-concierge, 38-returning-guest]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Controlled bottom sheet pattern (isOpen/onClose props)'
    - 'ProfileView aggregates guest data from multiple sources'

key-files:
  created:
    - apps/accommodations/frontend/components/stay/HouseRulesSheet.tsx
    - apps/accommodations/frontend/components/stay/ProfileView.tsx
  modified:
    - apps/accommodations/frontend/components/stay/ContactSheet.tsx
    - apps/accommodations/frontend/components/stay/DashboardHeader.tsx
    - apps/accommodations/frontend/components/stay/CheckoutInfo.tsx
    - apps/accommodations/frontend/components/BottomNav.tsx
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/property/route.ts
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts
    - apps/accommodations/frontend/app/stay/room/[roomCode]/page.tsx

key-decisions:
  - 'ContactSheet refactored to controlled mode (isOpen/onClose) -- room page updated with trigger buttons to maintain parity'
  - 'checkInTime and checkoutProcedure added to PropertyInfo type and all 4 API routes'
  - 'BottomNav reduced from 5 to 4 tabs, Menu removed, Map renamed to Explore'
  - 'ProfileView preferences section is a stub for Phase 38 returning guest detection'

patterns-established:
  - 'Controlled bottom sheet: isOpen/onClose props, z-[60], backdrop click to close'
  - 'Profile aggregation: single component consuming booking, room, property, documents, orders, visa'

# Metrics
duration: 8min
completed: 2026-02-01
---

# Phase 33 Plan 02: Navigation Restructure + Profile Page Summary

**HouseRulesSheet with check-in/out times, Contact Host in header, ProfileView with guest data/documents/orders/visa, 4-tab BottomNav**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-01T14:44:13Z
- **Completed:** 2026-02-01T14:52:20Z
- **Tasks:** 3
- **Files modified:** 13

## Accomplishments

- HouseRulesSheet bottom sheet renders check-in/out times in teal/amber cards plus house rules list
- Contact Host moved from homepage section to DashboardHeader icon button (ChatCircleDots)
- ProfileView assembles guest info, visa status, documents, full order history, and preferences stub
- BottomNav cleaned to 4 tabs (Home, Explore, Services, Profile) -- more spacious and focused
- All existing state contracts preserved (cart, orders, services, documents, catalog, token)

## Task Commits

Each task was committed atomically:

1. **Task 1: HouseRulesSheet + CheckoutInfo + Contact Host in header** - `994aa71` (feat)
2. **Task 2: ProfileView component + BottomNav update** - `63759c5` (feat)
3. **Task 3: Wire everything into page.tsx** - `5a28404` (feat)

## Files Created/Modified

- `components/stay/HouseRulesSheet.tsx` - Bottom sheet with check-in/out times, checkout procedure, house rules
- `components/stay/ProfileView.tsx` - Profile tab: guest info, visa, documents, orders, preferences
- `components/stay/ContactSheet.tsx` - Refactored to controlled mode (isOpen/onClose)
- `components/stay/DashboardHeader.tsx` - Added Contact Host icon button
- `components/stay/CheckoutInfo.tsx` - Added optional checkInTime prop
- `components/BottomNav.tsx` - 4 tabs, removed Menu, renamed Map to Explore
- `app/stay/[code]/page.tsx` - Wired all new components, cleaned imports
- `types/stay.ts` - Added checkInTime, checkoutProcedure to PropertyInfo
- `app/api/stay/*/route.ts` (4 routes) - Added checkInTime to responses
- `app/stay/room/[roomCode]/page.tsx` - Updated ContactSheet to controlled mode

## Decisions Made

- Added checkInTime and checkoutProcedure to PropertyInfo type since HouseRulesSheet needs both times. checkoutProcedure column may not exist in all DBs so accessed via safe cast.
- ContactSheet API change required updating the room page too (not in plan) to maintain backward compatibility.
- ProfileView preferences section kept as stub -- actual preference persistence deferred to Phase 38.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added checkInTime to PropertyInfo type and all API routes**

- **Found during:** Task 1 (HouseRulesSheet needs checkInTime)
- **Issue:** PropertyInfo type and API routes didn't include check_in_time from database
- **Fix:** Added checkInTime to PropertyInfo interface and all 4 API routes (verify, property, room, room/verify)
- **Files modified:** types/stay.ts, 4 API route files
- **Verification:** TypeScript compiles without errors
- **Committed in:** 994aa71 (Task 1 commit)

**2. [Rule 3 - Blocking] Updated room page for controlled ContactSheet**

- **Found during:** Task 1 (ContactSheet API changed)
- **Issue:** Room page used old ContactSheet API (self-contained with internal state)
- **Fix:** Added showContact state, trigger buttons, and controlled ContactSheet to room page
- **Files modified:** app/stay/room/[roomCode]/page.tsx
- **Verification:** TypeScript compiles without errors
- **Committed in:** 994aa71 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary for type safety and backward compatibility. No scope creep.

## Issues Encountered

- Pre-existing build failure in accommodations frontend due to `@shared/utils/qr/wifi` module resolution in WifiCard.tsx -- unrelated to this plan's changes, confirmed same error on prior commit.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 33 complete: dashboard has card-based homepage (33-01) + navigation restructure with profile (33-02)
- Ready for Phase 34 (Local Services Expansion) or Phase 36 (Tourist Concierge)
- Profile preferences stub ready for Phase 38 (Returning Guest Detection)

---

_Phase: 33-guest-dashboard-redesign_
_Completed: 2026-02-01_
