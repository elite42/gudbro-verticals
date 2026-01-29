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

- [ ] **BLD-01**: Pharmacy PWA builds successfully (next build)
- [ ] **BLD-02**: Workshops PWA builds successfully
- [ ] **BLD-03**: Gym PWA builds successfully
- [ ] **BLD-04**: Wellness PWA builds successfully
- [ ] **BLD-05**: Laundry PWA builds successfully
- [ ] **BLD-06**: Tours PWA builds successfully
- [ ] **BLD-07**: Accommodations PWA builds successfully

### Navigation

- [ ] **NAV-01**: All BottomNav links point to existing routes
- [ ] **NAV-02**: All internal page links (CTAs, cards) point to valid routes
- [ ] **NAV-03**: Back navigation works correctly on detail pages

## v2 Requirements

Deferred to Backend Accommodations milestone.

- **ACCOM-01**: Backoffice module for accommodations management
- **ACCOM-02**: Room/property management with real data
- **ACCOM-03**: Convention system active (partner linking, discounts)
- **ACCOM-04**: In-Stay dashboard connected to real data

## Out of Scope

| Feature                    | Reason                                      |
| -------------------------- | ------------------------------------------- |
| New pages/routes           | QA only, not adding features                |
| Database migrations        | Frontend QA, no schema changes              |
| Backend API connections    | Verticals use mock data                     |
| Coffeeshop changes         | Already production-ready, separate concerns |
| Rentals/Waiter             | Minimal PWAs, not priority                  |
| Icon migration to Phosphor | Cosmetic, defer to future                   |

## Traceability

Updated during roadmap creation.

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
| BLD-01      | Phase 3 | Pending  |
| BLD-02      | Phase 3 | Pending  |
| BLD-03      | Phase 3 | Pending  |
| BLD-04      | Phase 3 | Pending  |
| BLD-05      | Phase 3 | Pending  |
| BLD-06      | Phase 3 | Pending  |
| BLD-07      | Phase 3 | Pending  |
| NAV-01      | Phase 3 | Pending  |
| NAV-02      | Phase 3 | Pending  |
| NAV-03      | Phase 3 | Pending  |

**Coverage:**

- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0

✓ 100% coverage achieved

---

_Requirements defined: 2026-01-29_
_Last updated: 2026-01-29 after roadmap creation_
