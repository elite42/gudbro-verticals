# Requirements Archive: v1 QA Multi-Vertical PWAs

**Archived:** 2026-01-29
**Status:** SHIPPED

This is the archived requirements specification for v1.
For current requirements, see `.planning/REQUIREMENTS.md` (created for next milestone).

---

# Requirements: GUDBRO Verticals QA

**Defined:** 2026-01-29
**Core Value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience

## v1 Requirements

Requirements for QA milestone. Each maps to roadmap phases.

### TypeScript

- [x] **TS-01**: All vertical PWAs compile without TypeScript errors
- [x] **TS-02**: Fix wellness gym/[slug]/page.tsx type narrowing (pass.price)
- [x] **TS-03**: Fix accommodations stay/[code]/page.tsx ReactNode type error (deal.tag)
- [x] **TS-04**: Fix shared/database beverages.ts unescaped quote
- [x] **TS-05**: Fix shared/database international-appetizers.ts corrupted ingredient_ids

### UI/UX Harmony

- [x] **UX-01**: Accommodations PWA has BottomNav consistent with other verticals
- [x] **UX-02**: Wellness PWA no longer has legacy /gym routes (gym is standalone)
- [x] **UX-03**: All vertical headers follow consistent pattern (language/currency selector where applicable)
- [x] **UX-04**: BottomNav active states use vertical brand color consistently
- [x] **UX-05**: Page structure follows shared pattern (hero, sections, spacing)
- [x] **UX-06**: All PWAs have consistent padding-bottom for safe area (pb-safe)

### Build Verification

- [x] **BLD-01**: Pharmacy PWA builds successfully (next build)
- [x] **BLD-02**: Workshops PWA builds successfully
- [x] **BLD-03**: Gym PWA builds successfully
- [x] **BLD-04**: Wellness PWA builds successfully
- [x] **BLD-05**: Laundry PWA builds successfully
- [x] **BLD-06**: Tours PWA builds successfully
- [x] **BLD-07**: Accommodations PWA builds successfully

### Navigation

- [x] **NAV-01**: All BottomNav links point to existing routes
- [x] **NAV-02**: All internal page links (CTAs, cards) point to valid routes
- [x] **NAV-03**: Back navigation works correctly on detail pages

## Traceability

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| TS-01       | Phase 1 | Complete |
| TS-02       | Phase 1 | Complete |
| TS-03       | Phase 1 | Complete |
| TS-04       | Phase 1 | Complete |
| TS-05       | Phase 1 | Complete |
| UX-01       | Phase 2 | Complete |
| UX-02       | Phase 2 | Complete |
| UX-03       | Phase 2 | Complete |
| UX-04       | Phase 2 | Complete |
| UX-05       | Phase 2 | Complete |
| UX-06       | Phase 2 | Complete |
| BLD-01      | Phase 3 | Complete |
| BLD-02      | Phase 3 | Complete |
| BLD-03      | Phase 3 | Complete |
| BLD-04      | Phase 3 | Complete |
| BLD-05      | Phase 3 | Complete |
| BLD-06      | Phase 3 | Complete |
| BLD-07      | Phase 3 | Complete |
| NAV-01      | Phase 3 | Complete |
| NAV-02      | Phase 3 | Complete |
| NAV-03      | Phase 3 | Complete |

**Coverage:** 100% (21/21 requirements mapped and completed)

---

## Milestone Summary

**Shipped:** 21 of 21 v1 requirements
**Adjusted:** None - all requirements shipped as originally specified
**Dropped:** None

---

_Archived: 2026-01-29 as part of v1 milestone completion_
