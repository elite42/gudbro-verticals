# Requirements: GUDBRO Merchant Feedback Intelligence

**Defined:** 2026-01-30
**Core Value:** Enable merchants to submit feedback and receive updates, with AI-powered processing and internal team task management

## v1.3 Requirements

Requirements for Merchant Feedback Intelligence milestone. Each maps to roadmap phases.

### Feedback Submission

- [ ] **FBSUB-01**: Merchant can submit feedback with type selector (bug/feature/feedback), title, and description
- [ ] **FBSUB-02**: Merchant can attach a screenshot to feedback submission
- [ ] **FBSUB-03**: Submission auto-captures context (vertical, module/page, merchant ID)
- [ ] **FBSUB-04**: Merchant can write in any language (no language picker required)
- [ ] **FBSUB-05**: Merchant can view list of own past submissions with current status

### AI Processing

- [ ] **FBAI-01**: System auto-translates submission to English (storing original language + translated fields)
- [ ] **FBAI-02**: System classifies submission by type, priority, and sentiment
- [ ] **FBAI-03**: System extracts topic tags from submission content
- [ ] **FBAI-04**: System detects similar existing tasks via tag overlap + trigram similarity
- [ ] **FBAI-05**: System aggregates similar submissions into unified tasks with denormalized metrics

### Admin Kanban

- [ ] **FBADM-01**: Admin can view kanban board with columns (New, Reviewing, In Progress, Done, Rejected)
- [ ] **FBADM-02**: Admin can drag-and-drop tasks between columns
- [ ] **FBADM-03**: Task cards display aggregated info (merchant count, languages, sentiment, priority)
- [ ] **FBADM-04**: Admin can open task detail panel showing all linked submissions with original + translated text
- [ ] **FBADM-05**: Moving task to Done/Rejected triggers merchant notifications for all linked submissions

### Notifications

- [ ] **FBNOT-01**: Merchant receives in-app notification when submission is acknowledged
- [ ] **FBNOT-02**: Merchant receives notification when linked task moves to In Progress, Done, or Rejected
- [ ] **FBNOT-03**: Bell icon in global header shows unread notification count
- [ ] **FBNOT-04**: Merchant can view and mark notifications as read

### Analytics

- [ ] **FBAN-01**: Admin can view submission volume over time chart
- [ ] **FBAN-02**: Admin can view breakdown by type and vertical
- [ ] **FBAN-03**: Admin can view top requested features (by linked submission count)
- [ ] **FBAN-04**: Admin can view average response time metrics

## Future Requirements

Deferred to later milestones. Tracked but not in current roadmap.

### Advanced AI

- **FBAI-F01**: Semantic clustering via embeddings (pgvector) for improved duplicate detection
- **FBAI-F02**: Cross-vertical pattern recognition (surface themes across verticals)
- **FBAI-F03**: Auto-generated weekly/monthly trend summaries via Trigger.dev

### Public Features

- **FBPUB-F01**: Public roadmap visible to merchants
- **FBPUB-F02**: Merchant voting on feature requests
- **FBPUB-F03**: Real-time chat between team and merchant

### Integrations

- **FBINT-F01**: GitHub issue sync (auto-create issues from tasks)
- **FBINT-F02**: Email notifications (in addition to in-app)
- **FBINT-F03**: NPS/CSAT survey integration

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature                         | Reason                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------- |
| Public roadmap / voting         | Creates entitlement, GUDBRO is early-stage — keep product direction team-driven |
| Real-time chat                  | Turns feedback into support desk, different problem space                       |
| GitHub integration              | Wait until dev workflow stabilizes                                              |
| NPS/CSAT surveys                | Different methodology, separate feature                                         |
| Multi-step wizards              | Friction kills submissions, keep single-page form                               |
| Merchant-to-merchant discussion | Out of scope, use existing WhatsApp channels                                    |
| Embeddings / pgvector           | Over-engineering for <1000 submissions, tag overlap + trigram sufficient for V1 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| FBSUB-01    | Pending | Pending |
| FBSUB-02    | Pending | Pending |
| FBSUB-03    | Pending | Pending |
| FBSUB-04    | Pending | Pending |
| FBSUB-05    | Pending | Pending |
| FBAI-01     | Pending | Pending |
| FBAI-02     | Pending | Pending |
| FBAI-03     | Pending | Pending |
| FBAI-04     | Pending | Pending |
| FBAI-05     | Pending | Pending |
| FBADM-01    | Pending | Pending |
| FBADM-02    | Pending | Pending |
| FBADM-03    | Pending | Pending |
| FBADM-04    | Pending | Pending |
| FBADM-05    | Pending | Pending |
| FBNOT-01    | Pending | Pending |
| FBNOT-02    | Pending | Pending |
| FBNOT-03    | Pending | Pending |
| FBNOT-04    | Pending | Pending |
| FBAN-01     | Pending | Pending |
| FBAN-02     | Pending | Pending |
| FBAN-03     | Pending | Pending |
| FBAN-04     | Pending | Pending |

**Coverage:**

- v1.3 requirements: 23 total
- Mapped to phases: 0
- Unmapped: 23 ⚠️

---

_Requirements defined: 2026-01-30_
_Last updated: 2026-01-30 after initial definition_
