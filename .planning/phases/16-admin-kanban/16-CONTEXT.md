# Phase 16: Admin Kanban - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Admin kanban board for managing feedback-derived tasks. Five columns (New, Reviewing, In Progress, Done, Rejected), drag-and-drop between columns, task detail panel with linked submissions, and merchant notifications on status changes. Analytics dashboard is Phase 17.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

User delegated all implementation decisions to Claude. The following areas should be resolved during planning based on best practices and backoffice consistency:

**Layout & Card Design**

- Board layout approach (horizontal scroll vs responsive columns)
- Card density and information hierarchy (merchant count, languages, sentiment, priority)
- Column headers with task counts
- Empty column states

**Drag-and-Drop Interaction**

- @dnd-kit implementation approach (as specified in roadmap plan 16-01)
- Visual feedback during drag (placeholder, opacity, drop zones)
- Whether Done/Rejected moves require confirmation dialog
- Animation and transition behavior
- Undo capability (snackbar with undo vs no undo)

**Detail Panel**

- Slide-over panel vs modal approach
- Information architecture: task metadata, linked submissions list, original + translated text
- Navigation between tasks from within the panel
- Available actions in panel (status change, notes)

**Status Change & Notifications**

- Confirmation UX for critical status changes (Done/Rejected → triggers merchant notifications)
- Whether admin can add a custom message when closing a task
- Visual feedback after notification dispatch (toast/snackbar)
- Batch operations (select multiple tasks, change status) — include if natural, skip if over-engineered

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Follow existing backoffice patterns (Radix UI + Tailwind, Phosphor Icons duotone).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 16-admin-kanban_
_Context gathered: 2026-01-30_
