# Roadmap: GUDBRO Verticals QA

## Overview

This QA milestone ensures all 8 vertical PWAs (accommodations, tours, gym, wellness, laundry, pharmacy, workshops, coffeeshop) are production-ready with zero TypeScript errors, consistent UI/UX patterns, successful builds, and working navigation. The roadmap moves from quick fixes that unblock builds, through structural UI consistency improvements, to final verification and validation.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: TypeScript Fixes** - Resolve all compilation errors
- [x] **Phase 2: UI/UX Harmony** - Align components and patterns across verticals
- [x] **Phase 3: Verification** - Validate builds and navigation

## Phase Details

### Phase 1: TypeScript Fixes

**Goal**: All vertical PWAs and shared code compile without TypeScript errors
**Depends on**: Nothing (first phase)
**Requirements**: TS-01, TS-02, TS-03, TS-04, TS-05
**Plans:** 1 plan
**Success Criteria** (what must be TRUE):

1. Developer can run `pnpm typecheck` in any vertical workspace with zero errors
2. Wellness gym detail page correctly narrows pass.price type
3. Accommodations stay detail page correctly types deal.tag as ReactNode
4. Shared database files have no syntax errors (quotes, arrays)

Plans:

- [x] 01-01-PLAN.md — Fix all TS compilation errors (shared DB syntax + type narrowing)

### Phase 2: UI/UX Harmony

**Goal**: Fix known inconsistencies (Wellness, Accommodations) and verify all 8 verticals meet UI/UX criteria
**Depends on**: Phase 1
**Requirements**: UX-01, UX-02, UX-03, UX-04, UX-05, UX-06
**Plans:** 3 plans
**Success Criteria** (what must be TRUE):

1. All 8 verticals have a BottomNav — either as an extracted component (7 verticals) or inline nav (Tours, acceptable exception with 1 page)
2. BottomNav active states use CSS variables for brand color (no hardcoded hex), except Tours which uses Tailwind class (acceptable exception)
3. All BottomNavs have safe area padding via pb-safe class or inline env() equivalent
4. No PWA contains routes belonging to another vertical (wellness no /gym)
5. All vertical main pages have header sections following consistent structural patterns
6. Verification audit confirms all 8 verticals pass criteria (not just the 2 that were fixed)

**Scope note:** Research (02-RESEARCH.md) confirmed 6 of 8 verticals already meet all criteria. Plans 02-01 and 02-02 fix the 2 with actual issues. Plan 02-03 verifies all 8 pass.

Plans:

- [x] 02-01-PLAN.md — Fix Wellness BottomNav brand color + remove legacy /gym routes
- [x] 02-02-PLAN.md — Create Accommodations BottomNav component + add pb-safe
- [x] 02-03-PLAN.md — Verify all 8 verticals meet UI/UX consistency criteria

### Phase 3: Verification

**Goal**: All vertical PWAs build successfully and have working navigation
**Depends on**: Phase 2
**Requirements**: BLD-01, BLD-02, BLD-03, BLD-04, BLD-05, BLD-06, BLD-07, NAV-01, NAV-02, NAV-03
**Plans:** 2 plans
**Success Criteria** (what must be TRUE):

1. All 7 new vertical PWAs complete `next build` without errors
2. All BottomNav links point to routes that exist in each PWA
3. All internal page links (CTAs, cards, buttons) point to valid routes
4. Back navigation from detail pages returns to correct listing page
5. Developer can visit any PWA locally and navigate without 404s

Plans:

- [x] 03-01-PLAN.md — Build all 7 vertical PWAs, fix errors inline
- [x] 03-02-PLAN.md — Validate navigation links + produce verification report

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase               | Plans Complete | Status     | Completed  |
| ------------------- | -------------- | ---------- | ---------- |
| 1. TypeScript Fixes | 1/1            | ✓ Complete | 2026-01-29 |
| 2. UI/UX Harmony    | 3/3            | ✓ Complete | 2026-01-29 |
| 3. Verification     | 2/2            | ✓ Complete | 2026-01-29 |
