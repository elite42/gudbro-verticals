---
phase: 14
plan: 01
subsystem: feedback-ui
tags: [backoffice, feedback, form, upload, api]
depends_on:
  requires: [13-01, 13-02]
  provides: [feedback-submission-form, feedback-submit-api]
  affects: [14-02]
tech-stack:
  added: []
  patterns: [settings-page-pattern, phosphor-icons-type-selector]
key-files:
  created:
    - apps/backoffice/app/(dashboard)/settings/feedback/page.tsx
    - apps/backoffice/components/settings/FeedbackSubmissionManager.tsx
    - apps/backoffice/app/api/feedback/submit/route.ts
  modified:
    - apps/backoffice/app/api/upload/image/route.ts
decisions: []
metrics:
  duration: ~2 minutes
  completed: 2026-01-30
---

# Phase 14 Plan 01: Feedback Submission Form Summary

**One-liner:** Merchant feedback form at /settings/feedback with type selector, screenshot upload, and async AI processing trigger

## What Was Built

### Task 1: Feedback submission API route and upload config

- **POST /api/feedback/submit** endpoint that inserts into `fb_submissions` table
- Validates required fields (title, body, type, merchant_id)
- Maps UI type values: `feedback` -> `improvement`, `bug` and `feature_request` pass through
- Sets `source: 'manual'`, `status: 'pending'` automatically
- Fire-and-forget async call to `/api/feedback/process` for AI pipeline processing
- Added `feedback-screenshots` folder config to `/api/upload/image` (5MB, PNG/JPG/WebP)

### Task 2: Feedback settings page and submission form component

- **Settings page** at `/settings/feedback` following existing UsefulNumbers page pattern
- **FeedbackSubmissionManager** component with:
  - Three-card type selector (Bug/Feature/Feedback) with Phosphor Icons and color-coded selection states
  - Title field (required, max 200 chars, character counter)
  - Description textarea (required, 5 rows)
  - Screenshot upload with client-side validation (5MB, image types), preview thumbnail, and remove button
  - Auto-captures `merchantId`, `vertical: 'backoffice'`, `page_path` without merchant input
  - Submit button with loading state and disabled validation
  - Success banner on completion, form auto-resets
  - Error banner for failures
  - Any language accepted (no language picker)

## Commits

| #   | Hash    | Message                                                           |
| --- | ------- | ----------------------------------------------------------------- |
| 1   | 98e6be2 | feat(14-01): feedback submission API route and upload config      |
| 2   | ccb3167 | feat(14-01): feedback settings page and submission form component |

## Deviations from Plan

None - plan executed exactly as written.

## Key Links Verified

- FeedbackSubmissionManager -> `/api/feedback/submit` via fetch POST on form submit
- FeedbackSubmissionManager -> `/api/upload/image` via FormData upload with folder `feedback-screenshots`
- `/api/feedback/submit` -> `fb_submissions` via supabase insert
- `/api/feedback/submit` -> `/api/feedback/process` via fire-and-forget async call

## Next Phase Readiness

Phase 14-02 (sidebar navigation and polish) can proceed. The feedback form is fully functional and the API pipeline is connected.
