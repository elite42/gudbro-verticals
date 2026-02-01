# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-01)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** v1.5 Frictionless Guest Access + Accommodations Polish — Phase 32 (Owner Dashboard Enhancements)

## Current Position

Phase: 32 of 39 (Owner Dashboard Enhancements)
Plan: 4 of 4 (includes gap closure plans 03, 04)
Status: Phase complete (gap closure done)
Last activity: 2026-02-01 — Completed 32-04-PLAN.md (gap closure)

Progress: v1.0-v1.4 [██████████████████████████████████████████████████] 57/57 plans
Progress: v1.5 [██████████████░░░░░░] 17/29 plans

## Performance Metrics

**Velocity:**

- Total plans completed: 74 (+ 1 quick task)
- Average duration: ~3.4 min/plan
- Total execution time: ~5.6 hours

**By Milestone:**

| Milestone | Plans | Total Time | Avg/Plan |
| --------- | ----- | ---------- | -------- |
| v1.0      | 6     | ~20 min    | 3.3 min  |
| v1.1      | 12+1  | ~32 min    | 2.7 min  |
| v1.2      | 8     | ~62 min    | 7.8 min  |
| v1.3      | 10    | ~33 min    | 3.3 min  |
| v1.4      | 21    | ~87 min    | 4.1 min  |
| v1.5      | 17/29 | ~85 min    | 5.0 min  |

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table and milestone archives.

Recent decisions for v1.5 extended roadmap:

- Phase 30 = Shared Module Audit (user-approved prerequisite before implementation)
- Bug fixes BEFORE features (from pitfalls research, Phase 31 before 33)
- Dashboard refactor BEFORE adding new sections (Phase 33 before 34/35/36)
- Tourist Concierge for accommodations only (5 CON-\* requirements in Phase 36)
- Gantt/Timeline calendar via CSS Grid, not library (Phase 32)
- Zero new npm packages confirmed by research (except browser-image-compression + heic2any for Phase 28)
- Backoffice multi-verticale and fatturazione DEFERRED (out of scope)
- WIFI-01: wifi_zones as JSONB array on accom_properties (max 8 zones)
- WIFI-02: Legacy wifi_network/wifi_password columns preserved (not dropped)
- WIFI-03: Room WiFi overrides as simple nullable TEXT columns
- WIFI-04: buildWifiInfo() shared helper ensures all routes return identical WifiInfo shape
- WIFI-05: Property route returns zones without room override (no room context in JWT)
- WIFI-06: Pre-arrival email uses primary zone via buildWifiInfo, not all zones
- AUDIT-01: Do NOT consolidate duplicated patterns during v1.5 (use @shared/payment for new work)
- AUDIT-02: QR extraction: move generator + types to shared, leave CRUD service in backoffice
- AUDIT-03: Phase 31 currency selector should use @shared/payment directly (not copy converter pattern)
- AUDIT-04: Notification Dispatcher is highest-priority extraction (needed by phases 34, 35, 38)
- IMG-01: Room images stored as string[] in room.images JSONB, single primary image for now
- IMG-02: New rooms show 'save first' message instead of upload (no room ID yet)
- IMG-03: Added feedback-screenshots to ImageUploadFolder type (was in route but missing from type)
- GANTT-01: GanttCalendar manages own date navigation, notifies parent via onDateRangeChange callback
- GANTT-02: 14-day desktop / 7-day mobile view with CSS Grid and sticky room labels
- ONBOARD-01: Onboarding wizard uses link-out pattern for rooms/photos/wifi steps (not embedded components)
- ONBOARD-02: shouldShowWizard checks name + contact as minimum configured threshold
- POLICY-01: StructuredPolicies stores house_rules as string[] (backward compatible with existing data)

### Pending Todos

None.

### Blockers/Concerns

- Stripe MCC 7011 extended authorization needs validation with SEA property owners
- ADMIN_API_KEY auth pattern needs migration to session-based auth
- Phase 28: HEIC conversion reliability on Android needs device testing (Samsung, Xiaomi, Oppo)
- Phase 28: Vietnam-specific document retention rules (NA17) need local legal validation
- Phase 33: Dashboard redesign deployment must preserve InStayDashboard state contracts (15+ state vars)
- Phase 32: Gantt calendar mobile UX needs validation on phone screens

## Session Continuity

Last session: 2026-02-01
Stopped at: Phase 32 fully complete (all 4 plans including gap closure 32-03, 32-04)
Resume file: None
Next: `/gsd:plan-phase 33` (Dashboard Redesign)

---

_Last updated: 2026-02-01 after 32-03 gap closure completion_
