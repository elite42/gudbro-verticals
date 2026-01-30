---
phase: 10-e2e-test-infrastructure
plan: 02
subsystem: testing
tags: [playwright, e2e, smoke-tests, vertical-projects, config]

# Dependency graph
requires:
  - phase: 10-01
    provides: Vertical registry, BasePwaPage, shared fixtures, viewport helpers
provides:
  - 16 per-vertical Playwright projects (8 verticals x 2 viewports)
  - Wellness smoke test validating full pattern end-to-end
  - testMatch/testIgnore isolation between legacy and vertical tests
affects: [future vertical smoke tests, CI pipeline]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Per-vertical Playwright projects generated from VERTICALS registry'
    - 'testIgnore on legacy projects to prevent vertical test overlap'
    - 'Smoke spec pattern: import from shared/fixtures, use pwaPage fixture'

key-files:
  created:
    - tests/e2e/verticals/wellness.smoke.spec.ts
  modified:
    - playwright.config.ts

key-decisions:
  - 'Added testIgnore to legacy projects (chromium, Mobile Chrome, Mobile Safari) to prevent them from picking up vertical smoke tests'
  - 'verticalConfig passed via project use option, overriding the throwing default in fixtures.ts'

patterns-established:
  - 'Vertical smoke spec: import { test, expect } from shared/fixtures + VERTICALS[slug] for config'
  - 'Project naming: {slug}-mobile / {slug}-desktop'
  - 'testMatch isolation: verticals/*.smoke.spec.ts for vertical projects only'

# Metrics
duration: 5min
completed: 2026-01-30
---

# Phase 10 Plan 02: Playwright Vertical Projects + Wellness Smoke Test Summary

**16 per-vertical Playwright projects with testMatch isolation and 5-test wellness smoke validation passing on mobile and desktop**

## Performance

- **Duration:** 5 min
- **Started:** 2026-01-30T03:42:55Z
- **Completed:** 2026-01-30T03:48:00Z
- **Tasks:** 2
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments

- 16 vertical projects (8 verticals x 2 viewports) generated from VERTICALS registry
- testMatch + testIgnore isolation: vertical projects only run smoke specs, legacy projects ignore verticals/
- Wellness smoke test with 5 checks: page load, title, navigation, console errors, route accessibility
- All 5 tests pass on both wellness-mobile and wellness-desktop against running dev server

## Task Commits

Each task was committed atomically:

1. **Task 1: Add vertical projects to playwright.config.ts** - `aeae484` (feat)
2. **Task 2: Create wellness validation smoke test** - `ee4e93c` (feat)

## Files Created/Modified

- `playwright.config.ts` - Added VERTICALS/VIEWPORTS imports, verticalProjects generation, testIgnore on legacy projects, spread into projects array
- `tests/e2e/verticals/wellness.smoke.spec.ts` - 5 smoke tests using shared fixtures and pwaPage page object

## Decisions Made

- Added `testIgnore: /verticals\//` to legacy projects (chromium, Mobile Chrome, Mobile Safari) to prevent them from picking up vertical smoke tests -- without testMatch filters, these projects would match all spec files including vertical ones
- verticalConfig is passed as a project `use` option, which Playwright wires at runtime to override the throwing default in fixtures.ts

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Legacy projects picking up vertical smoke tests**

- **Found during:** Task 2 (wellness smoke test verification)
- **Issue:** chromium, Mobile Chrome, and Mobile Safari projects have no testMatch filter, so they matched all spec files including the new vertical smoke tests
- **Fix:** Added `testIgnore: /verticals\//` to the 3 legacy projects
- **Files modified:** playwright.config.ts
- **Verification:** `--project=chromium` no longer lists vertical smoke tests
- **Committed in:** ee4e93c (Task 2 commit)

**2. [Rule 3 - Blocking] Playwright browsers not installed**

- **Found during:** Task 2 (running smoke tests)
- **Issue:** Chromium browser executable missing after Playwright version update
- **Fix:** Ran `npx playwright install chromium` to download browser binaries
- **Files modified:** None (system-level browser cache)
- **Verification:** All 5 smoke tests pass after install

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both fixes necessary for correct test execution. The testIgnore addition improves isolation beyond what the plan specified. No scope creep.

## Issues Encountered

None beyond the deviations documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Full E2E test infrastructure complete for all 8 verticals
- Any developer can run `SKIP_WEBSERVER=1 npx playwright test --project=wellness-mobile` to smoke test
- Additional vertical smoke specs follow the same pattern: create `tests/e2e/verticals/{slug}.smoke.spec.ts`
- Phase 10 (E2E Test Infrastructure) is fully complete

---

_Phase: 10-e2e-test-infrastructure_
_Completed: 2026-01-30_
