---
phase: 16-admin-kanban
plan: 02
subsystem: backoffice-feedback-kanban
tags: [kanban, detail-panel, status-dialog, radix, slide-over]
requires: [16-01]
provides: [task-detail-panel, status-change-dialog, integrated-kanban]
affects: []
tech-stack:
  added: []
  patterns:
    [slide-over-panel, radix-dialog-confirmation, optimistic-status-sync]
key-files:
  created:
    - apps/backoffice/components/feedback-kanban/TaskDetailPanel.tsx
    - apps/backoffice/components/feedback-kanban/StatusChangeDialog.tsx
  modified:
    - apps/backoffice/components/feedback-kanban/KanbanBoard.tsx
decisions: []
metrics:
  duration: ~3 minutes
  completed: 2026-01-30
---

# Phase 16 Plan 02: Task Detail Panel and Status Dialog Summary

Slide-over detail panel with linked submissions and Radix confirmation dialog for terminal status changes, fully integrated into the kanban board.

## Tasks Completed

| Task | Name                                                 | Commit  | Key Files                                   |
| ---- | ---------------------------------------------------- | ------- | ------------------------------------------- |
| 1    | TaskDetailPanel slide-over and StatusChangeDialog    | 12d66db | TaskDetailPanel.tsx, StatusChangeDialog.tsx |
| 2    | Wire detail panel and status dialog into KanbanBoard | 4375633 | KanbanBoard.tsx                             |

## What Was Built

### TaskDetailPanel (TaskDetailPanel.tsx)

- Fixed-position slide-over panel (z-40 backdrop, z-50 panel) opening from the right
- Fetches submissions from `/api/feedback/tasks/{id}/submissions` on open
- Displays task metadata: type badge, priority badge, status badge, tags, dates (formatDistanceToNow), submission count, languages
- Status action buttons with valid transitions: new->reviewing, reviewing->in_progress/rejected, in_progress->done/rejected, done/rejected->reviewing (reopen)
- Linked submissions list showing original_body, translated_body (when different), detected_language, screenshot link, sentiment/priority scores
- Uses Phosphor Icons (X, Globe, ChatCircle, Clock, CalendarBlank) with duotone weight

### StatusChangeDialog (StatusChangeDialog.tsx)

- Radix Dialog from `@/components/ui/dialog` for Done/Rejected confirmation
- Explains notification impact: "This will notify N merchant(s)..."
- Optional resolution note textarea passed via onConfirm callback
- Green confirm button for Done, red for Rejected

### KanbanBoard Integration

- Removed browser `window.confirm()` entirely
- Added `selectedTask` state for detail panel open/close
- Added `pendingMove` state for deferred terminal status changes
- Shared `applyStatusChange` handles optimistic update, API call, and revert on failure
- Panel status changes sync `selectedTask` state so panel reflects new status immediately
- Removed unused `onTaskClick` prop (board manages its own state)

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compilation passes (`npx tsc --noEmit`)
- `window.confirm()` completely removed from codebase (verified via grep)
- Pre-commit hooks (prettier, eslint, typecheck) passed on both commits
- All five FBADM requirements satisfied:
  1. Admin clicks card to open detail panel with submissions
  2. Submissions show original and translated text
  3. Done/Rejected moves show Radix confirmation dialog
  4. Dialog explains notification impact with optional resolution note
  5. Status changes update optimistically with revert on failure
