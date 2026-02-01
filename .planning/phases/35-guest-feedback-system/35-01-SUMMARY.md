---
phase: 35-guest-feedback-system
plan: 01
subsystem: api, ui, database
tags:
  [
    supabase,
    feedback,
    accommodations,
    phosphor-icons,
    bottom-sheet,
    notification-queue,
  ]

requires:
  - phase: 28-guest-documents
    provides: image-utils pipeline (HEIC, compression, blur detection)
  - phase: 33-dashboard-refactor
    provides: DashboardCard grid pattern, bottom sheet patterns
  - phase: 34-service-expansion-minibar
    provides: latest migration numbering (096)

provides:
  - accom_guest_feedback table with in-stay and post-stay support
  - Guest feedback submission form with photo upload
  - Backoffice feedback queue with status management and owner response
  - Feedback API routes (guest-facing POST/GET + backoffice GET/PATCH)
  - Client-side feedback-api.ts helpers

affects: [36-tourist-concierge, 38-returning-guest-detection]

tech-stack:
  added: []
  patterns:
    - 'Bottom sheet feedback form with multi-step flow (category -> details -> photo -> submit)'
    - 'Notification queue integration for real-time owner alerts on guest feedback'

key-files:
  created:
    - shared/database/migrations/schema/097-accom-guest-feedback.sql
    - apps/accommodations/frontend/app/api/stay/[code]/feedback/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/feedback/upload-url/route.ts
    - apps/accommodations/frontend/components/stay/FeedbackForm.tsx
    - apps/accommodations/frontend/lib/feedback-api.ts
    - apps/backoffice/app/(dashboard)/accommodations/feedback/page.tsx
    - apps/backoffice/app/api/accommodations/feedback/route.ts
    - apps/backoffice/app/api/accommodations/feedback/[id]/route.ts
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
    - apps/backoffice/components/layout/Sidebar.tsx

key-decisions:
  - 'FB-01: feedback-screenshots storage bucket (separate from guest-documents for access control)'
  - 'FB-02: Denormalized guest_name and guest_room_number on feedback for display without joins'
  - 'FB-03: Complaints trigger high-priority notifications, other categories use normal priority'
  - 'FB-04: Feedback card shown only when booking exists (not browse-tier sessions)'

patterns-established:
  - 'Multi-step bottom sheet: category selection grid -> textarea -> optional photo -> submit'
  - 'Backoffice feedback queue: expandable rows with inline status update and response textarea'

duration: 6min
completed: 2026-02-02
---

# Phase 35 Plan 01: In-Stay Guest Feedback System Summary

**Guest feedback form with category selection, photo upload, owner notification, and backoffice queue with status tracking and response capability**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-01T19:51:21Z
- **Completed:** 2026-02-01T19:57:38Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- Migration 097 creates accom_guest_feedback table with full schema (categories, ratings, AI fields, status tracking)
- Guest can submit in-stay feedback with category + message + optional photo via bottom sheet form
- Owner receives notification (high priority for complaints) when feedback is submitted
- Backoffice feedback queue with status filters (All/New/In Progress/Resolved), expandable detail, and owner response capability
- Sidebar navigation updated with Feedback link under Accommodations

## Task Commits

Each task was committed atomically:

1. **Task 1: Database migration + API routes** - `ce89582` (feat)
2. **Task 2: Guest feedback form + dashboard card + backoffice queue** - `c9d8571` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/097-accom-guest-feedback.sql` - Full table with indexes, RLS, constraints, updated_at trigger
- `apps/accommodations/frontend/app/api/stay/[code]/feedback/route.ts` - POST submit + GET list for guest
- `apps/accommodations/frontend/app/api/stay/[code]/feedback/upload-url/route.ts` - Signed URL for photo upload
- `apps/accommodations/frontend/components/stay/FeedbackForm.tsx` - Multi-step bottom sheet (category -> details -> photo -> submit)
- `apps/accommodations/frontend/lib/feedback-api.ts` - Client fetch helpers (submitFeedback, getFeedback, getFeedbackUploadUrl)
- `apps/accommodations/frontend/types/stay.ts` - GuestFeedback, FeedbackCategory, FeedbackStatus types
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - Added Feedback DashboardCard + FeedbackForm overlay
- `apps/backoffice/app/(dashboard)/accommodations/feedback/page.tsx` - Feedback queue with filters and response UI
- `apps/backoffice/app/api/accommodations/feedback/route.ts` - GET feedback list for property
- `apps/backoffice/app/api/accommodations/feedback/[id]/route.ts` - PATCH status and owner response
- `apps/backoffice/components/layout/Sidebar.tsx` - Added Feedback nav link

## Decisions Made

- **FB-01:** Used separate `feedback-screenshots` storage bucket (needs manual creation in Supabase dashboard)
- **FB-02:** Denormalized guest_name and guest_room_number on feedback records for fast display without joins
- **FB-03:** Complaints trigger `high` priority notifications via queue_notification RPC; other categories use `normal`
- **FB-04:** Feedback card only shown when booking exists (browse-tier room sessions cannot submit feedback)
- **FB-05:** Added `checked_out_at` column to accom_bookings for future post-stay feedback cron timing

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added backoffice API routes for feedback management**

- **Found during:** Task 2 (Backoffice feedback queue page)
- **Issue:** Plan specified backoffice page but did not include backoffice API routes for fetching/updating feedback
- **Fix:** Created GET /api/accommodations/feedback and PATCH /api/accommodations/feedback/[id] routes
- **Files modified:** apps/backoffice/app/api/accommodations/feedback/route.ts, apps/backoffice/app/api/accommodations/feedback/[id]/route.ts
- **Verification:** TypeScript compiles, routes follow existing backoffice patterns
- **Committed in:** c9d8571 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for backoffice page to function. No scope creep.

## Issues Encountered

None.

## User Setup Required

- Migration 097 needs to be applied to live database
- Storage bucket `feedback-screenshots` needs to be created in Supabase dashboard (private bucket)

## Next Phase Readiness

- Feedback system complete for in-stay use
- Post-stay feedback (ratings) can be triggered by checkout cron using checked_out_at column (future phase)
- AI processing fields (ai_tags, ai_sentiment, ai_priority) ready for Phase 36 Tourist Concierge integration

---

_Phase: 35-guest-feedback-system_
_Completed: 2026-02-02_
