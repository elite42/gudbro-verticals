---
phase: 15-merchant-notifications
plan: 01
subsystem: api
tags: [supabase, notifications, feedback, next-api-routes]

# Dependency graph
requires:
  - phase: 13-feedback-schema
    provides: fb_merchant_notifications table, fb_submissions table, fb_tasks table
  - phase: 14-merchant-submission-ui
    provides: submit route, feedback-intelligence-service
provides:
  - GET /api/feedback/notifications endpoint (fetch + unread count)
  - PATCH /api/feedback/notifications endpoint (mark read)
  - createFeedbackNotification utility (server-side notification insertion)
  - notifyTaskStatusChange utility (notify all linked submitters on task status change)
  - submitted_by_account_id population in submit route
  - Acknowledged notification creation in AI pipeline
affects: [15-02-notification-bell-ui, 16-kanban-board]

# Tech tracking
tech-stack:
  added: []
  patterns:
    [
      fire-and-forget notification creation,
      supabaseAdmin for service-side writes,
    ]

key-files:
  created:
    - apps/backoffice/app/api/feedback/notifications/route.ts
    - apps/backoffice/lib/feedback/notification-utils.ts
  modified:
    - apps/backoffice/app/api/feedback/submit/route.ts
    - apps/backoffice/lib/ai/feedback-intelligence-service.ts

key-decisions:
  - 'Fire-and-forget pattern for notification creation (never blocks main flow)'
  - 'supabaseAdmin for notification inserts (bypasses RLS for server-side writes)'
  - 'notifyTaskStatusChange designed for Phase 16 kanban handlers'

patterns-established:
  - 'Fire-and-forget notifications: createFeedbackNotification logs errors but never throws'
  - 'Account resolution pattern: auth session -> accounts table lookup -> account_id'

# Metrics
duration: 3min
completed: 2026-01-30
---

# Phase 15 Plan 01: Notification Backend Summary

**Notification API routes (GET/PATCH) with createFeedbackNotification and notifyTaskStatusChange utilities, wired into submit and AI pipeline**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-30T11:52:58Z
- **Completed:** 2026-01-30T11:56:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- GET /api/feedback/notifications returns notifications with unreadCount for a merchant
- PATCH /api/feedback/notifications marks single or all notifications as read
- createFeedbackNotification utility for fire-and-forget notification insertion
- notifyTaskStatusChange queries linked submissions and creates per-submitter notifications (FBNOT-02 ready)
- Submit route now resolves auth user to submitted_by_account_id
- AI service creates "acknowledged" notification after processing submissions

## Task Commits

Each task was committed atomically:

1. **Task 1: Notification API route and utility** - `ffb9c62` (feat)
2. **Task 2: Wire notification creation into submit route and AI service** - `0541647` (feat)

## Files Created/Modified

- `apps/backoffice/app/api/feedback/notifications/route.ts` - GET and PATCH handlers for notification CRUD
- `apps/backoffice/lib/feedback/notification-utils.ts` - createFeedbackNotification and notifyTaskStatusChange utilities
- `apps/backoffice/app/api/feedback/submit/route.ts` - Added auth session account_id resolution and submitted_by_account_id
- `apps/backoffice/lib/ai/feedback-intelligence-service.ts` - Imports and calls createFeedbackNotification after processing

## Decisions Made

- Fire-and-forget pattern: notification creation logs errors but never throws, ensuring it cannot block the main submission/processing flow
- supabaseAdmin used for notification inserts (service-side writes bypass RLS)
- notifyTaskStatusChange designed as a standalone utility for Phase 16 kanban board handlers to call

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Notification API ready for frontend consumption (Plan 15-02: notification bell UI)
- notifyTaskStatusChange utility ready for Phase 16 kanban board to call when admins change task status
- All TypeScript compilation passes

---

_Phase: 15-merchant-notifications_
_Completed: 2026-01-30_
