# Phase 15: Merchant Notifications - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Merchants receive in-app notifications about their feedback status changes. A bell icon in the backoffice global header shows unread count via 60-second polling. Merchants can view all notifications in a dropdown and mark them as read. The kanban board and analytics are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All areas left to Claude's judgment:

**Bell icon and badge:**

- Position, animation on new notifications, badge styling
- Polling interval implementation (60s as per requirements)
- Badge count display (exact number vs "9+" cap)

**Notification dropdown:**

- Layout, density, max items shown, scroll behavior
- Grouping strategy (chronological vs by submission)
- Mark-as-read behavior (individual, mark-all, auto on open)

**Notification content:**

- Message tone and detail level per status change type
- Whether to link back to the original submission
- Timestamp format and relative time display

**Status transitions that trigger notifications:**

- Which task status changes generate merchant notifications
- Message templates per transition type
- Handling of bulk status changes

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 15-merchant-notifications_
_Context gathered: 2026-01-30_
