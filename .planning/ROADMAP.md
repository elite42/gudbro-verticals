# Roadmap: GUDBRO Verticals QA

## Overview

This QA milestone ensures all 8 vertical PWAs (accommodations, tours, gym, wellness, laundry, pharmacy, workshops, coffeeshop) are production-ready with zero TypeScript errors, consistent UI/UX patterns, successful builds, and working navigation. The roadmap moves from quick fixes that unblock builds, through structural UI consistency improvements, to final verification and validation.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: TypeScript Fixes** - Resolve all compilation errors
- [ ] **Phase 2: UI/UX Harmony** - Align components and patterns across verticals
- [ ] **Phase 3: Verification** - Validate builds and navigation

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

- [ ] 01-01-PLAN.md — Fix all TS compilation errors (shared DB syntax + type narrowing)

### Phase 2: UI/UX Harmony

**Goal**: All vertical PWAs follow consistent UI patterns and component structure
**Depends on**: Phase 1
**Requirements**: UX-01, UX-02, UX-03, UX-04, UX-05, UX-06
**Success Criteria** (what must be TRUE):

1. All 8 verticals have BottomNav with identical layout pattern (flat center)
2. BottomNav active states consistently use each vertical's brand color
3. All vertical headers follow the same structural pattern
4. No PWA contains routes belonging to another vertical (wellness no /gym)
5. All PWAs have safe area padding on bottom (pb-safe for iOS)
   **Plans**: TBD

Plans:

- [ ] 02-01: TBD during planning

### Phase 3: Verification

**Goal**: All vertical PWAs build successfully and have working navigation
**Depends on**: Phase 2
**Requirements**: BLD-01, BLD-02, BLD-03, BLD-04, BLD-05, BLD-06, BLD-07, NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):

1. All 7 new vertical PWAs complete `next build` without errors
2. All BottomNav links point to routes that exist in each PWA
3. All internal page links (CTAs, cards, buttons) point to valid routes
4. Back navigation from detail pages returns to correct listing page
5. Developer can visit any PWA locally and navigate without 404s
   **Plans**: TBD

Plans:

- [ ] 03-01: TBD during planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase               | Plans Complete | Status      | Completed |
| ------------------- | -------------- | ----------- | --------- |
| 1. TypeScript Fixes | 0/1            | Not started | -         |
| 2. UI/UX Harmony    | 0/?            | Not started | -         |
| 3. Verification     | 0/?            | Not started | -         |
