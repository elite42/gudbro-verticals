---
phase: 14
plan: 02
subsystem: feedback-ui
tags: [backoffice, feedback, history, api, accordion]
depends_on:
  requires: [14-01]
  provides: [feedback-history-api, feedback-history-ui]
  affects: [15-01]
tech-stack:
  added: []
  patterns: [accordion-expand, badge-status-map, useCallback-fetch]
key-files:
  created:
    - apps/backoffice/app/api/feedback/history/route.ts
  modified:
    - apps/backoffice/components/settings/FeedbackSubmissionManager.tsx
decisions: []
metrics:
  duration: ~2 minutes
  completed: 2026-01-30
---

# Phase 14 Plan 02: Submission History List and Detail View Summary

**One-liner:** History list with accordion detail below feedback form, fetching from GET /api/feedback/history with colored type/status badges and Italian labels

## What Was Built

### Task 1: History API route

- GET /api/feedback/history?merchantId=X endpoint
- Queries fb_submissions table with select for id, original_title, type, status, created_at, screenshot_url, original_body
- Sorted by created_at descending (newest first)
- Returns { submissions: [] }, validates merchantId, handles errors
- Uses force-dynamic export

### Task 2: History list and detail view in FeedbackSubmissionManager

- Added Submission interface, history state (submissions, isLoadingHistory, expandedId)
- fetchHistory with useCallback, called on mount and after successful submit
- "Le tue segnalazioni" section header with count badge
- Each row: truncated title, colored type badge (Bug=red, Richiesta=blue, Feedback=green), colored status badge (5 statuses with Italian labels), formatted date (it-IT locale)
- Accordion expand: full original_body, screenshot thumbnail with link, status detail
- Empty state: "Nessuna segnalazione inviata"
- Loading state with Loader2 spinner
- Phosphor icons: CaretDown/CaretUp for expand, Image for screenshot link

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| #   | Hash    | Message                                              |
| --- | ------- | ---------------------------------------------------- |
| 1   | fe6a42f | feat(14-02): feedback history API route              |
| 2   | 1c76302 | feat(14-02): submission history list and detail view |

## Verification Results

- TypeScript compiles cleanly (both tasks verified)
- Pre-commit hooks pass (prettier, eslint, typecheck)
- GET route exports GET function with force-dynamic
- Component fetches /api/feedback/history on mount
- Submission rows display type badge, status badge, title, and date
- Expanded view shows original_body and screenshot if present
- History refreshes after new submission via fetchHistory()

## Next Phase Readiness

Phase 14 complete (2/2 plans done). Ready for Phase 15.
