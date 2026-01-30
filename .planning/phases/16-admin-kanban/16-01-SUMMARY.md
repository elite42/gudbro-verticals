---
phase: 16-admin-kanban
plan: 01
subsystem: backoffice-feedback
tags: [kanban, dnd-kit, feedback-tasks, admin, drag-and-drop]
dependency-graph:
  requires: [15-01, 15-02]
  provides: [admin-kanban-board, feedback-task-api]
  affects: [16-02]
tech-stack:
  added: []
  patterns: [optimistic-updates, fire-and-forget-notifications, dnd-kit-kanban]
key-files:
  created:
    - apps/backoffice/app/api/feedback/tasks/route.ts
    - apps/backoffice/app/api/feedback/tasks/[id]/route.ts
    - apps/backoffice/app/api/feedback/tasks/[id]/submissions/route.ts
    - apps/backoffice/app/(dashboard)/platform/feedback-tasks/page.tsx
    - apps/backoffice/components/feedback-kanban/KanbanBoard.tsx
    - apps/backoffice/components/feedback-kanban/KanbanColumn.tsx
    - apps/backoffice/components/feedback-kanban/TaskCard.tsx
  modified: []
decisions: []
metrics:
  duration: ~3 minutes
  completed: 2026-01-30
---

# Phase 16 Plan 01: Admin Kanban Board Summary

**Admin kanban board with 5-column drag-and-drop, API routes for cross-merchant task management, and optimistic status updates with fire-and-forget notifications.**

## What Was Built

### Task 1: API Routes for Feedback Tasks

Three API route files providing full CRUD for admin task management:

- **GET /api/feedback/tasks** - Returns all fb_tasks sorted by priority (ascending) then last_submitted_at (descending), using supabaseAdmin for cross-merchant access
- **PATCH /api/feedback/tasks** - Updates task status with validation, sets resolved_at for done/rejected, fires notifyTaskStatusChange as fire-and-forget for in_progress/done/rejected
- **GET /api/feedback/tasks/[id]** - Returns single task detail
- **GET /api/feedback/tasks/[id]/submissions** - Returns linked submissions with selected fields

All routes verify auth via createClient().auth.getUser() before proceeding.

### Task 2: Kanban Board UI Components

Four UI files implementing the full kanban experience:

- **KanbanBoard** - DndContext with closestCorners collision detection, PointerSensor (distance: 8) + KeyboardSensor, DragOverlay with dropAnimation={null}, optimistic updates with snapshot-based revert on API failure
- **KanbanColumn** - useDroppable with isOver visual feedback (blue ring), colored dot header with task count badge, scrollable card list
- **TaskCard** - useDraggable with disabled state for done/rejected, priority badge (P1-P5 color-coded), sentiment dot (green/yellow/red), submission count with ChatCircle icon, language codes with Globe icon, type badge
- **Page shell** - Server component at /platform/feedback-tasks with breadcrumb header

Key UX decisions:

- Done/Rejected moves show browser confirm() before proceeding (to be upgraded to Radix dialog in 16-02)
- Done/Rejected cards have drag disabled (not draggable)
- DragOverlay uses dropAnimation={null} for instant snap-back

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| #   | Hash    | Description                                                     |
| --- | ------- | --------------------------------------------------------------- |
| 1   | dc1928e | feat(16-01): API routes for feedback tasks CRUD                 |
| 2   | 3072576 | feat(16-01): kanban board UI with drag-and-drop task management |

## Verification

- TypeScript compilation: PASSED (both tasks verified with `npx tsc --noEmit`)
- All three API routes export correct HTTP methods
- KanbanBoard uses useDroppable per column, useDraggable per card
- closestCorners collision detection confirmed
- DragOverlay with dropAnimation={null} confirmed
- PointerSensor with distance: 8 confirmed
- Optimistic updates with revert on failure confirmed
- Fire-and-forget notifyTaskStatusChange confirmed
- Done/Rejected drag disabled confirmed

## Next Phase Readiness

Plan 16-02 (Task Detail Panel) can proceed. The KanbanBoard accepts an `onTaskClick` callback prop that will be wired to the detail panel.
