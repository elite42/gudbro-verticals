---
phase: 33-guest-dashboard-redesign
plan: 01
subsystem: ui
tags: [react, phosphor-icons, css-grid, localStorage, dashboard, cards]

# Dependency graph
requires:
  - phase: 31-currency-selector
    provides: DashboardHeader with currency support
  - phase: 26-wifi-zones
    provides: WifiCard multi-zone support
provides:
  - DashboardGrid 2-column CSS grid wrapper
  - DashboardCard reusable tappable card with icon/color/badge
  - Card-based homepage replacing scrolling text wall
  - WiFi dismiss/recover via localStorage
  - isWifiDismissed() exported helper for Concierge hub
affects:
  [
    33-02 (HouseRulesSheet,
    profile rewire),
    36-tourist-concierge (WiFi recovery),
  ]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'DashboardCard: color-accented tappable card with Phosphor icon and optional badge'
    - 'Card-to-section scroll targeting via document.getElementById().scrollIntoView()'
    - 'WiFi dismiss with localStorage persistence and exported isWifiDismissed() helper'

key-files:
  created:
    - apps/accommodations/frontend/components/stay/DashboardGrid.tsx
    - apps/accommodations/frontend/components/stay/DashboardCard.tsx
  modified:
    - apps/accommodations/frontend/components/stay/WifiCard.tsx
    - apps/accommodations/frontend/app/stay/[code]/page.tsx

key-decisions:
  - 'GRID-01: Cards use borderTop 3px color accent instead of full background tint for cleaner look'
  - 'GRID-02: Commented out WelcomeCard/CheckoutInfo/ContactSheet/QuickActions/VisaStatusCard/VisaExpiryAlert imports with migration notes for 33-02'
  - 'GRID-03: WiFi dismiss starts hidden (dismissed=true) then checks localStorage in useEffect to avoid flash'

patterns-established:
  - 'DashboardCard: min-h-[88px] flex-col center layout with active:scale-[0.97] press feedback'
  - "Scroll targeting: id='section-name' + scrollIntoView({ behavior: 'smooth' })"
  - "WiFi dismiss: localStorage key 'gudbro_wifi_dismissed', isWifiDismissed() export"

# Metrics
duration: 4min
completed: 2026-02-01
---

# Phase 33 Plan 01: Card-Based Homepage Summary

**2-column card grid homepage with 6 colored cards (WiFi, Services, House Rules, Documents, Orders, Concierge) replacing scrolling text wall, plus WiFi dismiss/recover via localStorage**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-01T14:36:57Z
- **Completed:** 2026-02-01T14:41:03Z
- **Tasks:** 2
- **Files modified:** 4 (2 created, 2 modified)

## Accomplishments

- Replaced scrolling text wall homepage with modern 2-column card grid
- Created reusable DashboardGrid and DashboardCard components
- Added WiFi dismiss X button with localStorage persistence
- Preserved all 15+ state contracts (cart, orders, services, documents, token)
- Cards scroll to detail sections or open overlays when tapped

## Task Commits

Each task was committed atomically:

1. **Task 1: Create DashboardGrid and DashboardCard components** - `d663a6b` (feat)
2. **Task 2: Rewire homepage to card grid + WiFi dismiss logic** - `cca1fe4` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/components/stay/DashboardGrid.tsx` - 2-column CSS grid wrapper for dashboard cards
- `apps/accommodations/frontend/components/stay/DashboardCard.tsx` - Reusable colored card with icon, label, badge/count
- `apps/accommodations/frontend/components/stay/WifiCard.tsx` - Added dismiss X button, localStorage persistence, isWifiDismissed() export
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - Homepage renders card grid with scroll targeting to detail sections

## Decisions Made

- Used 3px colored top border accent on cards (cleaner than full background tint)
- WiFi dismiss state starts as hidden (true) to prevent flash, then reads localStorage in useEffect
- Commented out removed components with migration notes for 33-02 rather than deleting imports entirely
- House Rules and Concierge cards are placeholder no-ops (wired in 33-02 and Phase 36 respectively)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Pre-existing build failure in accommodations frontend: `@shared/utils/qr/wifi` module not found (WifiCard.tsx line 21). This is NOT caused by this plan's changes -- verified by running build on main without changes. Same failure exists.
- Pre-existing TS errors in DashboardHeader.tsx (2) and WifiCard.tsx (1) from @shared/ module resolution. Zero new errors introduced.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Card grid is ready for 33-02 to wire HouseRulesSheet (BookOpen card onClick)
- Profile tab and ContactSheet header migration ready for 33-02
- isWifiDismissed() exported and ready for Phase 36 Concierge hub WiFi recovery
- Pre-existing @shared/ build issue should be resolved before production deploy

---

_Phase: 33-guest-dashboard-redesign_
_Completed: 2026-02-01_
