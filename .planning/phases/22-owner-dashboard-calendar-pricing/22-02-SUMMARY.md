---
phase: 22-owner-dashboard-calendar-pricing
plan: 02
subsystem: ui
tags:
  [
    calendar,
    pricing,
    date-fns,
    phosphor-icons,
    availability,
    seasonal-pricing,
    discounts,
  ]

# Dependency graph
requires:
  - phase: 22-01
    provides: Calendar API, room-blocks API, seasonal-pricing API, property discount fields
provides:
  - AvailabilityCalendar month grid with color-coded status cells
  - CalendarDetailPanel with block/unblock actions
  - SeasonalPricingManager inline CRUD component
  - DiscountSettings with slider controls and preview
  - Calendar & Pricing page orchestrating all components
  - Sidebar navigation link under Accommodations
affects: [23-owner-dashboard-settings-analytics]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'CalendarDay data transform with half-open date range logic'
    - 'Range selection pattern: click-to-start, click-to-end'
    - 'Minor-to-major currency conversion in pricing forms'

key-files:
  created:
    - apps/backoffice/components/accommodations/AvailabilityCalendar.tsx
    - apps/backoffice/components/accommodations/CalendarDetailPanel.tsx
    - apps/backoffice/components/accommodations/SeasonalPricingManager.tsx
    - apps/backoffice/components/accommodations/DiscountSettings.tsx
    - apps/backoffice/app/(dashboard)/accommodations/calendar/page.tsx
  modified:
    - apps/backoffice/components/layout/Sidebar.tsx

key-decisions:
  - 'dateTo +1 day conversion for block API (UI shows inclusive range, API uses half-open)'
  - 'Status priority: blocked > booked > partial > available'
  - 'Partial status only when viewing all rooms and some rooms booked'
  - 'Price input in major units, converted to minor (*100) on submit'

patterns-established:
  - 'CalendarDay interface as shared contract between calendar and detail panel'
  - 'Range selection state (rangeStart/rangeEnd) managed at page level'

# Metrics
duration: 5min
completed: 2026-01-31
---

# Phase 22 Plan 02: Calendar & Pricing UI Summary

**Custom month grid calendar with color-coded availability, date blocking, seasonal pricing CRUD, and length-of-stay discount sliders**

## Performance

- **Duration:** 5 min
- **Started:** 2026-01-31T07:19:41Z
- **Completed:** 2026-01-31T07:24:34Z
- **Tasks:** 2/2
- **Files modified:** 6

## Accomplishments

- AvailabilityCalendar renders custom month grid with 4 status colors, price labels, range selection, and legend
- CalendarDetailPanel shows date details with booking info, block management, and price info
- SeasonalPricingManager provides inline add/edit/delete for pricing overrides with overlap error handling
- DiscountSettings offers weekly/monthly discount sliders (0-50%) with live preview calculations
- Calendar page orchestrates all components with room filter, month navigation, and API integration
- Sidebar navigation updated with "Calendar & Pricing" link under Accommodations

## Task Commits

Each task was committed atomically:

1. **Task 1: AvailabilityCalendar + CalendarDetailPanel** - `46b835e` (feat)
2. **Task 2: SeasonalPricingManager + DiscountSettings + Calendar page + Sidebar** - `5541f85` (feat)

## Files Created/Modified

- `apps/backoffice/components/accommodations/AvailabilityCalendar.tsx` - Custom month grid with color-coded cells, range selection, price labels
- `apps/backoffice/components/accommodations/CalendarDetailPanel.tsx` - Date detail panel with block/unblock actions
- `apps/backoffice/components/accommodations/SeasonalPricingManager.tsx` - Seasonal pricing CRUD with inline form
- `apps/backoffice/components/accommodations/DiscountSettings.tsx` - Weekly/monthly discount sliders with preview
- `apps/backoffice/app/(dashboard)/accommodations/calendar/page.tsx` - Page orchestrator with data fetching and transforms
- `apps/backoffice/components/layout/Sidebar.tsx` - Added Calendar & Pricing nav item

## Decisions Made

- dateTo +1 day conversion when calling block API: UI shows inclusive date range, API expects half-open [) range
- Status priority: blocked > booked > partial > available (blocked always wins)
- "Partial" status only shown when viewing all rooms and not all rooms are booked on that date
- Price inputs in major currency units with \*100 conversion to minor units on submit (consistent with RoomManager pattern)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 5 OCAL requirements met (OCAL-01 through OCAL-05)
- Calendar UI fully consumes APIs from plan 22-01
- Phase 22 complete - ready for phase 23 (Settings & Analytics)

---

_Phase: 22-owner-dashboard-calendar-pricing_
_Completed: 2026-01-31_
