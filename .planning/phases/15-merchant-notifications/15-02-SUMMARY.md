---
phase: 15-merchant-notifications
plan: 02
subsystem: ui
tags: [react, hooks, polling, notifications, optimistic-updates]

# Dependency graph
requires:
  - phase: 15-01
    provides: GET/PATCH /api/feedback/notifications endpoints
provides:
  - useNotifications hook with 60s polling and optimistic mark-as-read
  - NotificationDropdown wired to real API data with type-appropriate icons
affects: [16-kanban-board]

# Tech tracking
tech-stack:
  added: []
  patterns:
    [
      optimistic-update-with-revert,
      polling-hook-with-ref,
      visual-dismiss-pattern,
    ]

key-files:
  created:
    - apps/backoffice/hooks/useNotifications.ts
  modified:
    - apps/backoffice/components/notifications/NotificationDropdown.tsx
    - apps/backoffice/components/notifications/index.ts
    - apps/backoffice/components/layout/Header.tsx

key-decisions:
  - 'D-1502-1: merchantId derived from location?.id || brand?.id (same pattern as feedback settings pages)'
  - 'D-1502-2: Visual-only dismiss (filters from display, marks as read) instead of DELETE from DB'

patterns-established:
  - 'Polling hook pattern: useRef for stable merchantId in interval callback, useCallback with empty deps'
  - 'Optimistic update with revert: snapshot prev state, apply optimistic change, revert on API failure'

# Metrics
duration: 3min
completed: 2026-01-30
---

# Phase 15 Plan 02: Notification UI Integration Summary

**useNotifications polling hook with optimistic updates wired into NotificationDropdown, replacing all mock data with real API calls**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-30T11:57:47Z
- **Completed:** 2026-01-30T12:00:26Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created useNotifications hook with 60-second polling, optimistic mark-as-read, and error recovery
- Replaced all mock data in NotificationDropdown with real API data from fb_merchant_notifications
- Mapped four DB notification types (acknowledged, status_changed, resolved, rejected) to appropriate icons
- Header passes merchantId to NotificationDropdown using existing tenant context pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useNotifications polling hook** - `6dd8d06` (feat)
2. **Task 2: Wire NotificationDropdown to real data** - `e9810c8` (feat)

## Files Created/Modified

- `apps/backoffice/hooks/useNotifications.ts` - Polling hook with optimistic updates and 60s interval
- `apps/backoffice/components/notifications/NotificationDropdown.tsx` - Replaced mock data with hook, new type icons, loading state
- `apps/backoffice/components/notifications/index.ts` - Updated exports (removed NotificationPriority)
- `apps/backoffice/components/layout/Header.tsx` - Passes merchantId prop to NotificationDropdown

## Decisions Made

- **D-1502-1:** merchantId derived from `location?.id || brand?.id` -- same pattern used by feedback settings, social settings, and useful numbers pages
- **D-1502-2:** Dismiss button uses visual-only filtering (local Set state) plus marks as read via API, rather than implementing a DELETE endpoint -- simpler and preserves notification history

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Notification bell shows live unread count with 60s polling
- All four notification types render with appropriate icons
- Ready for Phase 16 (kanban board) which will trigger status_changed notifications via notifyTaskStatusChange

---

_Phase: 15-merchant-notifications_
_Completed: 2026-01-30_
