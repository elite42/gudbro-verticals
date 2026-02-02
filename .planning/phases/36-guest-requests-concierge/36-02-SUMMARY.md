---
phase: 36-guest-requests-concierge
plan: 02
subsystem: ui
tags: [react, phosphor-icons, tel-links, accordion, pwa, concierge]

requires:
  - phase: 36-01
    provides: ConciergeHub overlay, concierge-data.ts, section card grid, API endpoints
provides:
  - Emergency sub-view with click-to-call for all numbers and embassies
  - Safety sub-view with 7-category accordion pattern
  - Culture sub-view with dos/donts and recommended apps
  - Transport sub-view with ride options and safety guidance
  - Useful Numbers page fetching from existing API
  - Full sub-view routing in ConciergeHub via switch statement
affects: [36-03-discover-attractions]

tech-stack:
  added: []
  patterns:
    - 'Sub-view routing via activeSection switch in ConciergeHub'
    - 'Accordion expand/collapse with per-category useState'
    - 'Click-to-call tel: links with number sanitization'

key-files:
  created:
    - apps/accommodations/frontend/components/stay/ConciergeEmergency.tsx
    - apps/accommodations/frontend/components/stay/ConciergeSafety.tsx
    - apps/accommodations/frontend/components/stay/ConciergeCulture.tsx
    - apps/accommodations/frontend/components/stay/ConciergeTransport.tsx
    - apps/accommodations/frontend/components/stay/UsefulNumbersPage.tsx
  modified:
    - apps/accommodations/frontend/components/stay/ConciergeHub.tsx

key-decisions:
  - 'CON-05: Sub-view components manage their own full-screen overlay (z-60) rather than rendering inside ConciergeHub container'
  - "CON-06: activeSection type extended with 'useful-numbers' union (not added to ConciergeSection type which controls merchant toggles)"
  - 'CON-07: Emergency contacts split into 3 visual groups (emergency/hotlines/embassies) with color-coded cards'

patterns-established:
  - 'Concierge sub-view pattern: { country, city?, onBack } props, full-screen z-60 overlay, back arrow header'
  - 'Accordion pattern: Record<string, boolean> state for independent expand/collapse'

duration: 6min
completed: 2026-02-02
---

# Phase 36 Plan 02: Concierge Section Content Components Summary

**4 concierge sub-views (Emergency/Safety/Culture/Transport) with click-to-call, accordion tips, and Useful Numbers page wired into ConciergeHub**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-02T01:08:20Z
- **Completed:** 2026-02-02T01:14:28Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Emergency contacts display with tel: links grouped by type (emergency, hotlines, embassies) with color-coded sections
- Safety tips organized in 7 accordion categories (Transport, Money, Food, Street, Hotels, Tours, Digital) with protection advice
- Culture section shows dos/donts lists and recommended apps with iOS/Android platform badges
- Transport section displays ride options with recommended badges and price ranges
- Useful Numbers page fetches from existing API and displays categorized numbers
- All sub-views wired into ConciergeHub with switch-based routing

## Task Commits

1. **Task 1: Emergency + Safety + Transport + Culture sub-views** - `b6c5bf0` (feat)
2. **Task 2: Useful Numbers page + wire all sections into ConciergeHub** - `a92217a` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/components/stay/ConciergeEmergency.tsx` - Emergency contacts with 3 sections (emergency/hotlines/embassies), click-to-call tel: links
- `apps/accommodations/frontend/components/stay/ConciergeSafety.tsx` - 7-category safety accordion with per-tip protection advice and location info
- `apps/accommodations/frontend/components/stay/ConciergeCulture.tsx` - Cultural dos/donts with checkmark/X icons, recommended apps with platform badges
- `apps/accommodations/frontend/components/stay/ConciergeTransport.tsx` - Transport options with recommended badges, price ranges, and type-specific icons
- `apps/accommodations/frontend/components/stay/UsefulNumbersPage.tsx` - Full sub-view for API-fetched useful numbers grouped by emergency/city/property
- `apps/accommodations/frontend/components/stay/ConciergeHub.tsx` - Replaced placeholder with switch routing to all sub-views, added Useful Numbers card

## Decisions Made

- CON-05: Each sub-view component renders its own full-screen overlay (z-60) rather than being wrapped by ConciergeHub, keeping components self-contained and independently testable
- CON-06: `useful-numbers` added as union type to activeSection state (not to ConciergeSection) since it is not a merchant-togglable section
- CON-07: Emergency contacts split into 3 visual groups with color coding (red for emergency, amber for hotlines, blue for embassies) for quick visual scanning

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Pre-existing build failure in accommodations frontend due to `@shared/utils/qr/wifi` module resolution error in WifiCard.tsx (unrelated to concierge work)
- Pre-existing coffeeshop typecheck errors (unrelated)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All concierge content sections complete and functional
- ConciergeHub fully wired with discover placeholder ready for 36-03 (already implemented)
- Phase 36 is complete: all 3 plans (01 foundation, 02 content, 03 discover) are done

---

_Phase: 36-guest-requests-concierge_
_Completed: 2026-02-02_
