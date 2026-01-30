# Milestones

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
