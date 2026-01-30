# Roadmap: GUDBRO Verticals

## Milestones

- ✅ **v1.0 QA Multi-Vertical PWAs** - Phases 1-3 (shipped 2026-01-29)
- ✅ **v1.1 In-Stay MVP Backend** - Phases 4-8 (shipped 2026-01-30)
- ✅ **v1.2 Tech Debt Cleanup** - Phases 9-12 (shipped 2026-01-30)
- 🚧 **v1.3 Merchant Feedback Intelligence** - Phases 13-17 (in progress)

## Phases

<details>
<summary>✅ v1.0 QA Multi-Vertical PWAs (Phases 1-3) - SHIPPED 2026-01-29</summary>

See milestones/v1-ROADMAP.md for details.

</details>

<details>
<summary>✅ v1.1 In-Stay MVP Backend (Phases 4-8) - SHIPPED 2026-01-30</summary>

See milestones/v1.1-ROADMAP.md for details.

</details>

<details>
<summary>✅ v1.2 Tech Debt Cleanup (Phases 9-12) - SHIPPED 2026-01-30</summary>

See milestones/v1.2-ROADMAP.md for details.

</details>

### 🚧 v1.3 Merchant Feedback Intelligence

**Milestone Goal:** Merchants submit feedback in any language from the backoffice; AI translates, classifies, and groups similar submissions into tasks; admins manage tasks on a kanban board with full analytics visibility.

- [ ] **Phase 13: Foundation and AI Pipeline** - Database schema and AI processing service
- [ ] **Phase 14: Merchant Submission UI** - Feedback form, screenshot upload, and submission history
- [ ] **Phase 15: Merchant Notifications** - In-app notification system with bell icon and polling
- [ ] **Phase 16: Admin Kanban** - Drag-and-drop task board with detail panel and status notifications
- [ ] **Phase 17: Analytics Dashboard** - Submission volume, breakdowns, top features, and response time

## Phase Details

### Phase 13: Foundation and AI Pipeline

**Goal**: The database and AI backbone exist so submissions can be stored, translated, classified, tagged, matched to similar tasks, and aggregated — all without any UI yet
**Depends on**: Nothing (first phase of v1.3)
**Requirements**: FBAI-01, FBAI-02, FBAI-03, FBAI-04, FBAI-05
**Success Criteria** (what must be TRUE):

1. A submission inserted into fb_submissions is auto-translated to English with original language detected and stored
2. The AI service returns type, priority, and sentiment classification for any submission text
3. Topic tags are extracted and stored as an array on the submission record
4. When a submission shares tags or trigram similarity with an existing task, the system detects and links them
5. Unified tasks in fb_tasks have denormalized counts (submission count, language set, average sentiment) that update when submissions are linked

**Plans:** 2 plans

Plans:

- [ ] 13-01-PLAN.md — Database schema (fb_submissions, fb_tasks, fb_merchant_notifications + indexes + RLS + similarity function)
- [ ] 13-02-PLAN.md — AI processing service (translate, classify, tag, similarity detection, task aggregation + API route)

### Phase 14: Merchant Submission UI

**Goal**: Merchants can submit feedback from the backoffice in any language with screenshots and see their submission history
**Depends on**: Phase 13
**Requirements**: FBSUB-01, FBSUB-02, FBSUB-03, FBSUB-04, FBSUB-05
**Success Criteria** (what must be TRUE):

1. Merchant can open a feedback form, select type (bug/feature/feedback), enter title and description, and submit
2. Merchant can attach a screenshot that uploads and persists with the submission
3. Submission automatically captures current vertical, module/page path, and merchant ID without merchant input
4. Merchant can write in Italian, Thai, or any language and submission is accepted and processed (no language picker)
5. Merchant can view a list of their past submissions showing title, type, status, and submission date
   **Plans**: TBD

Plans:

- [ ] 14-01: Feedback submission form (type selector, title, description, screenshot upload, context capture)
- [ ] 14-02: Submission history list and API routes

### Phase 15: Merchant Notifications

**Goal**: Merchants receive and manage in-app notifications about their feedback status changes
**Depends on**: Phase 14
**Requirements**: FBNOT-01, FBNOT-02, FBNOT-03, FBNOT-04
**Success Criteria** (what must be TRUE):

1. When a submission is acknowledged (linked to a task), the merchant sees a notification in the bell dropdown
2. When a linked task moves to In Progress, Done, or Rejected, the merchant receives a corresponding notification
3. A bell icon in the backoffice global header displays an unread count badge that updates via 60-second polling
4. Merchant can open the notification dropdown, see all notifications, and mark them as read
   **Plans**: TBD

Plans:

- [ ] 15-01: Notification API routes and bell icon component with polling
- [ ] 15-02: Notification list UI with read/unread state management

### Phase 16: Admin Kanban

**Goal**: Admins can manage feedback-derived tasks on a kanban board, view all linked submissions, and trigger merchant notifications on status changes
**Depends on**: Phase 15
**Requirements**: FBADM-01, FBADM-02, FBADM-03, FBADM-04, FBADM-05
**Success Criteria** (what must be TRUE):

1. Admin sees a kanban board with five columns (New, Reviewing, In Progress, Done, Rejected) populated with tasks
2. Admin can drag a task card between columns and the status persists after page refresh
3. Each task card shows merchant count, languages involved, sentiment indicator, and priority badge
4. Admin can click a task card to open a detail panel showing all linked submissions with both original and translated text
5. Moving a task to Done or Rejected creates notifications for every merchant who submitted a linked feedback
   **Plans**: TBD

Plans:

- [ ] 16-01: Kanban board layout with @dnd-kit multi-column drag-and-drop
- [ ] 16-02: Task card design, detail panel, and status-change notification triggers

### Phase 17: Analytics Dashboard

**Goal**: Admins can view analytics about feedback volume, distribution, popular requests, and team response performance
**Depends on**: Phase 16
**Requirements**: FBAN-01, FBAN-02, FBAN-03, FBAN-04
**Success Criteria** (what must be TRUE):

1. Admin sees a time-series chart showing submission volume over configurable time ranges
2. Admin sees a breakdown view showing submission counts grouped by type (bug/feature/feedback) and by vertical
3. Admin sees a ranked list of top requested features ordered by linked submission count
4. Admin sees average response time metrics (time from submission to acknowledgment, time to resolution)
   **Plans**: TBD

Plans:

- [ ] 17-01: Analytics API routes (aggregation queries for volume, breakdown, top features, response time)
- [ ] 17-02: Analytics dashboard page with charts and metric cards

## Progress

| Phase                          | Milestone | Plans Complete | Status      | Completed  |
| ------------------------------ | --------- | -------------- | ----------- | ---------- |
| 1. TypeScript QA               | v1.0      | 2/2            | ✅ Complete | 2026-01-29 |
| 2. UI/UX QA                    | v1.0      | 2/2            | ✅ Complete | 2026-01-29 |
| 3. Build & Nav QA              | v1.0      | 2/2            | ✅ Complete | 2026-01-29 |
| 4. Accommodations Schema       | v1.1      | 2/2            | ✅ Complete | 2026-01-30 |
| 5. Seed Data                   | v1.1      | 2/2            | ✅ Complete | 2026-01-30 |
| 6. API Routes                  | v1.1      | 2/2            | ✅ Complete | 2026-01-30 |
| 7. Dashboard Frontend          | v1.1      | 4/4            | ✅ Complete | 2026-01-30 |
| 8. Integration & Polish        | v1.1      | 2/2            | ✅ Complete | 2026-01-30 |
| 9. Code Fixes                  | v1.2      | 2/2            | ✅ Complete | 2026-01-30 |
| 10. E2E Test Infrastructure    | v1.2      | 2/2            | ✅ Complete | 2026-01-30 |
| 11. E2E Smoke Tests            | v1.2      | 2/2            | ✅ Complete | 2026-01-30 |
| 12. Visual and Quality         | v1.2      | 2/2            | ✅ Complete | 2026-01-30 |
| 13. Foundation and AI Pipeline | v1.3      | 0/2            | Not started | -          |
| 14. Merchant Submission UI     | v1.3      | 0/2            | Not started | -          |
| 15. Merchant Notifications     | v1.3      | 0/2            | Not started | -          |
| 16. Admin Kanban               | v1.3      | 0/2            | Not started | -          |
| 17. Analytics Dashboard        | v1.3      | 0/2            | Not started | -          |

---

_Roadmap created: 2026-01-29_
_Last updated: 2026-01-30 after phase 13 planning_
