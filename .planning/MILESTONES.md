# Milestones

## v1.3 — Merchant Feedback Intelligence (Shipped: 2026-01-30)

**Delivered:** Merchants submit feedback in any language from the backoffice; AI translates, classifies, and groups similar submissions into tasks; admins manage tasks on a kanban board with full analytics visibility.

**Phases completed:** 13-17 (10 plans total)

**Key accomplishments:**

- Database schema feedback intelligence (fb_submissions, fb_tasks, fb_merchant_notifications) with pg_trgm similarity
- AI pipeline OpenAI GPT-4o-mini (translation, classification, tagging, deduplication) in single call
- Merchant feedback form with screenshot upload and submission history
- In-app notification system with bell icon and 60s polling
- Admin kanban board with @dnd-kit drag-and-drop and task detail slide-over
- Analytics dashboard with Recharts (volume, breakdown, top features, response times)

**Stats:**

- 63 files created/modified (+9,661 / -221 lines)
- 5 phases, 10 plans, ~20 tasks
- 1 day (2026-01-30)

**Git range:** `44fafe7` → `d0596a7`

**Audit:** 23/23 requirements, 5/5 phases, 12/12 integration, 3/3 E2E flows — all passed

**What's next:** TBD (next milestone via `/gsd:new-milestone`)

**Archive:** `milestones/v1.3-ROADMAP.md`, `milestones/v1.3-REQUIREMENTS.md`

---

## v1.2 — Tech Debt Cleanup (Shipped: 2026-01-30)

**Delivered:** All 7 v1.0 tech debt items resolved and automated E2E smoke testing established across all 8 verticals with visual regression baselines, PWA manifest validation, and physical QA checklist.

**Phases completed:** 9-12 (8 plans total)

**Key accomplishments:**

- Resolved all 7 tech debt items: Tours TS compilation, CSS variable migration, Wellness back link, ESLint warnings, placeholder links
- Built E2E test infrastructure: vertical registry, BasePwaPage, shared fixtures, 16 Playwright projects
- 72 smoke tests across 8 verticals (page load, BottomNav nav, responsive viewports) — 3x zero-flaky validation
- Visual regression baselines (26 PNGs) + PWA manifest validation for all 8 verticals
- PWA manifests created for 6 missing verticals + 78-item physical device QA checklist
- Tours brand colors migrated to CSS variable-backed Tailwind tokens (~50 hardcoded values)

**Stats:**

- 104 files created/modified (+10,031 / -190 lines)
- 4 phases, 8 plans, ~17 tasks
- 1 day (2026-01-30)

**Git range:** `30850c1` → `829d430`

**Audit:** 13/13 requirements, 4/4 phases, 9/9 integration, 1/1 E2E flows — all passed

**What's next:** TBD (next milestone via `/gsd:new-milestone`)

**Archive:** `milestones/v1.2-ROADMAP.md`, `milestones/v1.2-REQUIREMENTS.md`

---

## v1.1 — In-Stay MVP Backend (Shipped: 2026-01-30)

**Delivered:** Guests scan a QR in their room and access WiFi, stay info, services, local deals, and host contact — all from real Supabase data via JWT-authenticated API routes.

**Phases completed:** 4-8 (12 plans total) + 1 quick task

**Key accomplishments:**

- Complete accommodations database schema: 6 tables, 3 SECURITY DEFINER functions, RLS policies, P5 accounts pattern
- 6 JWT-protected API routes (lookup, verify, services, deals, property, useful-numbers) with consistent error handling
- In-Stay Dashboard refactored from 1387 lines to 128-line shell composing 11 section components — zero mock data
- Cross-vertical F&B deep-linking via slug-based pattern (has_linked_fnb + linked_fnb_slug)
- Schema-API alignment: migration 081 with 9 column renames, 7 new columns, house_rules TEXT→JSONB conversion

**Stats:**

- 72 files created/modified (+10,673 / -2,324 lines)
- 5 phases, 12 plans, 1 quick task
- 2 days (2026-01-29 → 2026-01-30)

**Git range:** `28dc593` → `33a7fc7`

**Audit:** 28/28 requirements, 22/22 integration, 8/8 E2E flows — all passed

**What's next:** v1.2 Booking & Owner Dashboard

**Archive:** `milestones/v1.1-ROADMAP.md`, `milestones/v1.1-REQUIREMENTS.md`

---

## v1.0 — QA Multi-Vertical PWAs (Shipped: 2026-01-29)

**Delivered:** All 8 vertical PWAs production-ready with zero TypeScript errors, consistent UI/UX patterns, successful builds, and working navigation.

**Phases completed:** 1-3 (6 plans total)

**Key accomplishments:**

- Fixed all TypeScript compilation errors across 8 verticals (type predicates, ternary patterns)
- Unified BottomNav brand colors using CSS variables across all 8 verticals (4 patterns documented)
- Removed cross-vertical contamination (gym routes from wellness, complete vertical separation)
- Extracted Accommodations BottomNav component (112 lines inline -> reusable component)
- All 7 new vertical PWAs verified building successfully (next build, exit code 0)
- Fixed 7 broken navigation links across 4 verticals via static analysis

**Stats:**

- 43 files created/modified
- 10,872 lines added, 370 removed
- 3 phases, 6 plans, 34 commits
- ~3 hours (2026-01-29)

**Git range:** `2c23305` -> `82a4530`

**What's next:** Backend implementation for verticals (starting with Accommodations)

**Archive:** `milestones/v1-ROADMAP.md`, `milestones/v1-REQUIREMENTS.md`

---

## Pre-GSD Work (before 2026-01-29)

All work before GSD initialization was tracked in `docs/backlog/`. Key milestones:

- 75 food databases (~4,653 products)
- P5 Account System (18 migrations)
- AI Co-Manager (15 services, 13 phases)
- Scaling Phase 1-3 (100 -> 100K users)
- Security Hardening Phase 1
- Testing Initiative (2,418 tests)
- PWA v2 Migration + Feature Parity
- 8 Vertical PWAs created (frontend mock)
- BottomNav uniforming
- Multi-Vertical Strategy defined

Last phase number before GSD: 0

---

_Milestones are recorded in reverse chronological order._
