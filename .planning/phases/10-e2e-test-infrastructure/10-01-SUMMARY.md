---
phase: 10-e2e-test-infrastructure
plan: 01
subsystem: testing
tags: [playwright, e2e, fixtures, page-object-model, smoke-tests]

# Dependency graph
requires: []
provides:
  - Vertical registry mapping 8 PWAs to port, baseURL, routes, pnpmFilter
  - BasePwaPage class with 5 reusable smoke check methods
  - Extended Playwright test fixtures (verticalConfig + pwaPage)
  - Mobile/desktop viewport presets from Playwright built-in devices
affects: [10-02 (smoke tests + playwright config)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Playwright test.extend() fixtures for per-vertical config injection'
    - 'Page Object Model (BasePwaPage) for reusable smoke assertions'
    - 'Vertical registry as single source of truth for PWA port/URL/route config'

key-files:
  created:
    - tests/e2e/shared/vertical-registry.ts
    - tests/e2e/shared/viewport-helpers.ts
    - tests/e2e/shared/base-pwa-page.ts
    - tests/e2e/shared/fixtures.ts
  modified: []

key-decisions:
  - 'ESLint no-empty-pattern disable for Playwright fixture convention'

patterns-established:
  - 'Vertical registry: single Record<string, VerticalConfig> for all 8 verticals'
  - 'BasePwaPage: page object with benign error allowlist for console error checks'
  - 'Shared fixtures: import { test, expect } from shared/fixtures instead of @playwright/test'

# Metrics
duration: 3min
completed: 2026-01-30
---

# Phase 10 Plan 01: Shared Test Utilities Summary

**Vertical registry (8 PWAs), BasePwaPage with 5 smoke methods, extended Playwright fixtures, and viewport presets**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-30T03:38:37Z
- **Completed:** 2026-01-30T03:41:37Z
- **Tasks:** 2
- **Files created:** 4

## Accomplishments

- Vertical registry with all 8 PWA configs (port, baseURL, routes, pnpmFilter)
- BasePwaPage class with goto, expectPageLoads, expectNoConsoleErrors, expectNavigationVisible, expectTitle
- Extended Playwright test object with verticalConfig and pwaPage fixtures
- Mobile (Pixel 5) and desktop (Desktop Chrome) viewport presets

## Task Commits

Each task was committed atomically:

1. **Task 1: Create vertical registry and viewport helpers** - `f205064` (feat)
2. **Task 2: Create BasePwaPage and shared fixtures** - `20c7a81` (feat)

## Files Created/Modified

- `tests/e2e/shared/vertical-registry.ts` - VerticalConfig interface + VERTICALS record (8 entries) + VERTICAL_SLUGS array
- `tests/e2e/shared/viewport-helpers.ts` - VIEWPORTS const (mobile + desktop) + ViewportName type
- `tests/e2e/shared/base-pwa-page.ts` - BasePwaPage class with 5 smoke check methods and benign error allowlist
- `tests/e2e/shared/fixtures.ts` - Extended test object with verticalConfig/pwaPage fixtures + re-exported expect

## Decisions Made

- Added `no-empty-pattern` ESLint disable for the Playwright fixture convention of `async ({}, use)` -- this is standard Playwright pattern where the empty destructuring is intentional for option fixtures

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] ESLint no-empty-pattern error on fixture convention**

- **Found during:** Task 2 (shared fixtures)
- **Issue:** Playwright's `async ({}, use)` pattern for option fixtures triggers ESLint `no-empty-pattern` rule
- **Fix:** Added `eslint-disable-next-line no-empty-pattern` inline comment
- **Files modified:** tests/e2e/shared/fixtures.ts
- **Verification:** Commit passed lint-staged + typecheck hooks
- **Committed in:** 20c7a81 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minor lint fix necessary for Playwright convention compatibility. No scope creep.

## Issues Encountered

None beyond the ESLint fix documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 4 shared utility files ready for consumption by Plan 02
- Plan 02 will add per-vertical projects to playwright.config.ts and create smoke spec files
- Vertical registry exports are typed and ready for programmatic project generation

---

_Phase: 10-e2e-test-infrastructure_
_Completed: 2026-01-30_
