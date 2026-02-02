# Roadmap: GUDBRO Verticals

## Milestones

- ✅ **v1.0 QA Multi-Vertical PWAs** - Phases 1-3 (shipped 2026-01-29)
- ✅ **v1.1 In-Stay MVP Backend** - Phases 4-8 (shipped 2026-01-30)
- ✅ **v1.2 Tech Debt Cleanup** - Phases 9-12 (shipped 2026-01-30)
- ✅ **v1.3 Merchant Feedback Intelligence** - Phases 13-17 (shipped 2026-01-30)
- ✅ **v1.4 Accommodations v2** - Phases 18-24 (shipped 2026-01-31)
- ✅ **v1.5 Frictionless Guest Access + Accommodations Polish** - Phases 25-39 (shipped 2026-02-02)
- 🚧 **v2.0 Codebase Hardening** - Phases 40-45 (in progress)

## Phases

<details>
<summary>v1.0 QA Multi-Vertical PWAs (Phases 1-3) - SHIPPED 2026-01-29</summary>

See milestones/v1-ROADMAP.md for details.

</details>

<details>
<summary>v1.1 In-Stay MVP Backend (Phases 4-8) - SHIPPED 2026-01-30</summary>

See milestones/v1.1-ROADMAP.md for details.

</details>

<details>
<summary>v1.2 Tech Debt Cleanup (Phases 9-12) - SHIPPED 2026-01-30</summary>

See milestones/v1.2-ROADMAP.md for details.

</details>

<details>
<summary>v1.3 Merchant Feedback Intelligence (Phases 13-17) - SHIPPED 2026-01-30</summary>

See milestones/v1.3-ROADMAP.md for details.

</details>

<details>
<summary>v1.4 Accommodations v2 (Phases 18-24) - SHIPPED 2026-01-31</summary>

See milestones/v1.4-ROADMAP.md for details.

</details>

<details>
<summary>v1.5 Frictionless Guest Access + Accommodations Polish (Phases 25-39) - SHIPPED 2026-02-02</summary>

See milestones/v1.5-ROADMAP.md for details.

</details>

### v2.0 Codebase Hardening (In Progress)

**Milestone Goal:** Resolve all critical and high-severity findings from the 360-degree audit to bring the codebase from 6.7/10 to 8.5+/10 across security, consistency, frontend resilience, architecture, and documentation.

#### Phase 40: Security Hardening

**Goal**: All public API endpoints are protected against abuse and all data access follows least-privilege principles
**Depends on**: Nothing (highest production risk, lowest effort)
**Requirements**: SEC-01, SEC-02, SEC-03, SEC-04, SEC-05
**Success Criteria** (what must be TRUE):

1. Public booking/order/charge endpoints reject requests exceeding rate limits (HTTP 429)
2. Orders table RLS policy restricts reads/writes to the owning session and merchant only
3. Admin API key comparison is timing-safe (no timing side-channel)
4. Supabase client throws on missing SERVICE_ROLE_KEY instead of silently falling back to ANON key
5. Booking code lookup rejects after 5 attempts per IP per minute

**Plans:** 2 plans

Plans:

- [x] 40-01-PLAN.md — Rate limiting + booking code throttle (SEC-01, SEC-05)
- [ ] 40-02-PLAN.md — RLS fix, timing-safe admin key, ANON key fallback removal (SEC-02, SEC-03, SEC-04)

#### Phase 41: Shared Foundation

**Goal**: All duplicated hooks, utils, configs, and UI components are consolidated into shared/ so every PWA imports from a single source of truth
**Depends on**: Phase 40
**Requirements**: SHR-01, SHR-02, SHR-03, SHR-04, SHR-05, SHR-06, SHR-07, SHR-08, SHR-09
**Success Criteria** (what must be TRUE):

1. shared/hooks/ exports usePriceFormat and all 5 original app copies are deleted
2. shared/utils/ exports currency-converter and currency-preferences with zero local duplicates remaining
3. shared/config/ provides base tsconfig, tailwind preset, and next.config that all 5 core PWAs extend
4. shared/ui/ exports a BottomNav component used by the 4 PWAs that previously had separate implementations
5. shared/types/ exports consolidated domain types (MenuItem, Order, MerchantCharge) imported by all apps

**Plans:** 6 plans

Plans:

- [x] 41-01-PLAN.md — Shared hooks (@gudbro/hooks) and currency utils in @gudbro/utils (SHR-01, SHR-02, SHR-03)
- [x] 41-02-PLAN.md — Shared config: base tsconfig, Tailwind preset, Next.js factory (SHR-04, SHR-05, SHR-06)
- [x] 41-03-PLAN.md — Shared BottomNav component and domain types (SHR-07, SHR-09)
- [x] 41-04-PLAN.md — Migrate coffeeshop, gym, laundry to shared hooks/utils (SHR-08)
- [x] 41-05-PLAN.md — Migrate pharmacy, workshops + BottomNav migration for 4 apps (SHR-08)
- [x] 41-06-PLAN.md — Migrate all config files for 5 PWAs (SHR-04, SHR-05, SHR-06)

#### Phase 42: Error Handling Library

**Goal**: A standard error handling library exists in shared/ that all API routes and frontend code can use for consistent, safe error handling
**Depends on**: Phase 41 (shared/ structure established)
**Requirements**: ARC-02, ARC-04
**Success Criteria** (what must be TRUE):

1. shared/utils/error-handling.ts exports AppError class, handleCatch utility, and safeParse helper
2. All API routes that previously used `.json().catch(() => ({}))` use safeParse instead
3. Error handling is consistent: thrown errors produce structured JSON responses with appropriate HTTP status codes
   **Plans**: TBD

Plans:

- [ ] 42-01: Error handling library + API route migration (ARC-02, ARC-04)

#### Phase 43: Frontend Resilience

**Goal**: All PWAs gracefully handle errors, load states, and accessibility requirements so no user hits a white screen or an inaccessible control
**Depends on**: Phase 42 (error handling library available for error boundaries)
**Requirements**: FE-01, FE-02, FE-03, FE-04, FE-05, FE-06, FE-07, FE-08, FE-09
**Success Criteria** (what must be TRUE):

1. Every PWA (9 apps) shows a user-friendly error page with retry button when a route throws
2. Every PWA (9 apps) shows a loading skeleton/spinner during route transitions
3. TypeScript strict mode flags (noUnusedLocals, noUnusedParameters, noImplicitReturns) are enabled and all apps compile clean
4. All icon-only buttons have aria-labels, all interactive elements have visible focus indicators, and --text-tertiary meets WCAG AA contrast (4.5:1)
5. Images in gym/laundry/pharmacy/workshops use next/image instead of CSS backgroundImage
   **Plans**: TBD

Plans:

- [ ] 43-01: Error boundaries and loading states for all PWAs (FE-01, FE-02)
- [ ] 43-02: TypeScript strict mode and dead code cleanup (FE-03, FE-04)
- [ ] 43-03: Image optimization, accessibility, and PWA manifest fix (FE-05, FE-06, FE-07, FE-08, FE-09)

#### Phase 44: Architecture Cleanup

**Goal**: The largest technical debt items are resolved — the god component is split, type safety is improved, and database types are auto-generated
**Depends on**: Phase 43 (benefits from shared patterns and strict mode)
**Requirements**: ARC-01, ARC-03, ARC-05
**Success Criteria** (what must be TRUE):

1. ModernChatMenuV3 is split into 4-5 focused components (none exceeding 250 lines) that compose together
2. Unsafe type assertions (as any, as unknown) are reduced by 50%+ with proper type guards replacing them
3. Supabase types are auto-generated via CLI and used as the single source of truth for database types
   **Plans**: TBD

Plans:

- [ ] 44-01: ModernChatMenuV3 refactor into focused components (ARC-01)
- [ ] 44-02: Type assertion cleanup and Supabase type codegen (ARC-03, ARC-05)

#### Phase 45: Documentation

**Goal**: Critical documentation gaps are filled so any developer can find API endpoints, understand product decisions, and follow established patterns
**Depends on**: Phase 44 (documents final state after all code changes)
**Requirements**: DOC-01, DOC-02, DOC-03, DOC-04, DOC-05
**Success Criteria** (what must be TRUE):

1. docs/reference/API.md lists every API endpoint with method, path, auth requirement, and rate limit
2. apps/gym/PRD.md and apps/waiter/PRD.md exist with product requirements matching the format of existing PRDs
3. docs/knowledge/decisions/ contains ADRs for zustand, phosphor-icons, and v2-architecture
4. docs/knowledge/patterns/ contains pattern docs for connected-component, tier-gating, and store-sync
   **Plans**: TBD

Plans:

- [ ] 45-01: API documentation index and missing PRDs (DOC-01, DOC-02, DOC-03)
- [ ] 45-02: ADRs and pattern documentation (DOC-04, DOC-05)

## Progress

| Phase                                     | Milestone | Plans Complete | Status      | Completed  |
| ----------------------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. TypeScript QA                          | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 2. UI/UX QA                               | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 3. Build & Nav QA                         | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 4. Accommodations Schema                  | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 5. Seed Data                              | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 6. API Routes                             | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 7. Dashboard Frontend                     | v1.1      | 4/4            | Complete    | 2026-01-30 |
| 8. Integration & Polish                   | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 9. Code Fixes                             | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 10. E2E Test Infrastructure               | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 11. E2E Smoke Tests                       | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 12. Visual and Quality                    | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 13. Foundation and AI Pipeline            | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 14. Merchant Submission UI                | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 15. Merchant Notifications                | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 16. Admin Kanban                          | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 17. Analytics Dashboard                   | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 18. Database Foundation                   | v1.4      | 2/2            | Complete    | 2026-01-31 |
| 19. Property Page & Booking Flow          | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 20. Payments                              | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 21. Owner Dashboard - Bookings & Property | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 22. Owner Dashboard - Calendar & Pricing  | v1.4      | 2/2            | Complete    | 2026-01-31 |
| 23. Service Ordering                      | v1.4      | 4/4            | Complete    | 2026-01-31 |
| 24. Analytics, Deals & Communication      | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 25. Room Code Foundation                  | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 26. Progressive Authentication            | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 27. Owner Security Configuration          | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 28. Document Upload + Visa Tracking       | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 29. Multi-Zone WiFi                       | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 30. Shared Module Audit                   | v1.5      | 1/1            | Complete    | 2026-02-01 |
| 31. Bug Fixes + Image Foundation          | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 32. Owner Dashboard Enhancements          | v1.5      | 4/4            | Complete    | 2026-02-01 |
| 33. Guest Dashboard Redesign              | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 34. Service Expansion + Minibar           | v1.5      | 5/5            | Complete    | 2026-02-02 |
| 35. Guest Feedback System                 | v1.5      | 2/2            | Complete    | 2026-02-02 |
| 36. Guest Requests + Concierge            | v1.5      | 3/3            | Complete    | 2026-02-02 |
| 37. Conventions + Vouchers                | v1.5      | 2/2            | Complete    | 2026-02-02 |
| 38. Guest Lifecycle                       | v1.5      | 2/2            | Complete    | 2026-02-02 |
| 39. Polish + Analytics                    | v1.5      | 2/2            | Complete    | 2026-02-02 |
| 40. Security Hardening                    | v2.0      | 2/2            | Complete    | 2026-02-02 |
| 41. Shared Foundation                     | v2.0      | 6/6            | Complete    | 2026-02-02 |
| 42. Error Handling Library                | v2.0      | 0/1            | Not started | -          |
| 43. Frontend Resilience                   | v2.0      | 0/3            | Not started | -          |
| 44. Architecture Cleanup                  | v2.0      | 0/2            | Not started | -          |
| 45. Documentation                         | v2.0      | 0/2            | Not started | -          |

---

_Roadmap created: 2026-01-29_
_Last updated: 2026-02-02 after Phase 41 Shared Foundation completed (6/6 plans) — audit fix_
