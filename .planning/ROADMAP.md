# Roadmap: GUDBRO Verticals

## Milestones

- ✅ **v1.0 QA Multi-Vertical PWAs** - Phases 1-3 (shipped 2026-01-29)
- ✅ **v1.1 In-Stay MVP Backend** - Phases 4-8 (shipped 2026-01-30)
- 🚧 **v1.2 Tech Debt Cleanup** - Phases 9-12 (in progress)

## Phases

<details>
<summary>✅ v1.0 QA Multi-Vertical PWAs (Phases 1-3) - SHIPPED 2026-01-29</summary>

See milestones/v1-ROADMAP.md for details.

</details>

<details>
<summary>✅ v1.1 In-Stay MVP Backend (Phases 4-8) - SHIPPED 2026-01-30</summary>

See milestones/v1.1-ROADMAP.md for details.

</details>

### 🚧 v1.2 Tech Debt Cleanup (In Progress)

**Milestone Goal:** Resolve all 7 tech debt items from v1.0 and establish automated E2E smoke testing across all 8 verticals with visual regression baselines.

#### Phase 9: Code Fixes

**Goal**: All v1.0 tech debt items resolved — every vertical compiles cleanly, uses consistent theming, and has zero placeholder links or lint warnings.
**Depends on**: Nothing (first phase of v1.2)
**Requirements**: CFIX-01, CFIX-02, CFIX-03, CFIX-04, CFIX-05
**Plans**: 2 plans

Plans:

- [x] 09-01-PLAN.md — Quick fixes: verify Tours TS compilation, Wellness back link, placeholder links
- [x] 09-02-PLAN.md — Tours brand color CSS variable migration, Wellness ESLint warnings

#### Phase 10: E2E Test Infrastructure

**Goal**: Playwright config and shared test utilities are ready for per-vertical smoke testing — validated with at least one vertical passing.
**Depends on**: Phase 9 (clean codebase before testing)
**Requirements**: E2EI-01, E2EI-02
**Success Criteria** (what must be TRUE):

1. `playwright.config.ts` defines per-vertical projects with isolated baseURL and viewport configs for all 8 verticals (mobile + desktop)
2. Shared fixtures (`BasePwaPage`, viewport helpers, vertical registry) exist in `tests/e2e/shared/` and are importable by any smoke test
3. At least one vertical's smoke test passes using the shared fixture, confirming the pattern works end-to-end
4. Existing 35 F&B/waiter/backoffice tests still pass without modification
   **Plans**: 2 plans

Plans:

- [x] 10-01-PLAN.md — Shared test utilities (vertical registry, BasePwaPage, fixtures, viewport helpers)
- [x] 10-02-PLAN.md — Playwright config vertical projects + wellness validation smoke test

#### Phase 11: E2E Smoke Tests

**Goal**: Every vertical has 3-5 passing smoke tests covering page load, navigation, and responsive viewports.
**Depends on**: Phase 10 (infrastructure must exist)
**Requirements**: E2EI-03, E2EI-04, E2EI-05
**Success Criteria** (what must be TRUE):

1. Every vertical has a page-load smoke test that confirms the page renders without JS console errors
2. Every vertical has a BottomNav navigation test that clicks each nav link and verifies the target page loads
3. Every vertical has responsive viewport tests at mobile (375px), tablet (768px), and desktop (1280px) confirming layout renders without horizontal overflow
4. All smoke tests pass when run together (`--project="smoke-*"`) with zero flaky failures across 3 consecutive runs
5. Tests use structural assertions (element counts, visibility) not content assertions (specific text from mock data)
   **Plans**: 2 plans

Plans:

- [x] 11-01-PLAN.md — Smoke tests for wellness (update), laundry, pharmacy, workshops (link-based nav)
- [x] 11-02-PLAN.md — Smoke tests for coffeeshop, gym, tours, accommodations + full suite 3x validation

#### Phase 12: Visual and Quality

**Goal**: Visual regression baselines captured, PWA manifests validated, and physical device QA checklist documented for all verticals.
**Depends on**: Phase 11 (smoke tests must be stable before capturing baselines)
**Requirements**: VISQ-01, VISQ-02, VISQ-03
**Success Criteria** (what must be TRUE):

1. Visual regression baselines (screenshots) are committed for every vertical at mobile and desktop viewports using `toHaveScreenshot()`
2. Every vertical's PWA manifest is validated: `name`, `short_name`, `icons` (with at least one 192px and one 512px), and `theme_color` are present and non-empty
3. A visual QA checklist document exists that lists what to verify on physical devices (layout, touch targets, font rendering, scroll behavior) with per-vertical items
4. Visual regression tests pass with a pixel threshold that produces less than 5% false positive rate
   **Plans**: 2 plans

Plans:

- [ ] 12-01-PLAN.md — Create PWA manifests for 6 missing verticals, placeholder icons, screenshot CSS, physical QA checklist
- [ ] 12-02-PLAN.md — Add visual regression screenshot tests + manifest validation tests to all 8 smoke specs

## Progress

**Execution Order:** Phases 9 → 10 → 11 → 12

| Phase                       | Milestone | Plans Complete | Status      | Completed  |
| --------------------------- | --------- | -------------- | ----------- | ---------- |
| 9. Code Fixes               | v1.2      | 2/2            | ✅ Complete | 2026-01-30 |
| 10. E2E Test Infrastructure | v1.2      | 2/2            | ✅ Complete | 2026-01-30 |
| 11. E2E Smoke Tests         | v1.2      | 2/2            | ✅ Complete | 2026-01-30 |
| 12. Visual and Quality      | v1.2      | 0/2            | Not started | -          |

---

_Roadmap created: 2026-01-30_
_Last updated: 2026-01-30 after Phase 12 planning_
