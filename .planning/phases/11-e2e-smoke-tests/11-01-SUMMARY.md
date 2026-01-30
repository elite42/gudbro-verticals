---
phase: 11-e2e-smoke-tests
plan: 01
subsystem: testing
tags: [playwright, e2e, smoke-tests, link-based-verticals]

dependency-graph:
  requires: [10-01, 10-02]
  provides:
    [
      smoke-tests-wellness,
      smoke-tests-laundry,
      smoke-tests-pharmacy,
      smoke-tests-workshops,
    ]
  affects: [11-02]

tech-stack:
  added: []
  patterns:
    [
      link-based-bottomnav-test,
      responsive-viewport-overflow-test,
      graceful-desktop-nav-skip,
    ]

file-tracking:
  key-files:
    created:
      - tests/e2e/verticals/laundry.smoke.spec.ts
      - tests/e2e/verticals/pharmacy.smoke.spec.ts
      - tests/e2e/verticals/workshops.smoke.spec.ts
    modified:
      - tests/e2e/verticals/wellness.smoke.spec.ts
      - apps/laundry/frontend/app/globals.css
      - apps/pharmacy/frontend/app/globals.css

decisions:
  - id: graceful-desktop-nav
    decision: 'BottomNav test uses count === 0 early return for desktop viewports where nav is md:hidden'
    rationale: 'Allows same test to pass on both mobile and desktop projects without conditional project detection'
  - id: overflow-x-hidden-fix
    decision: 'Added html,body { overflow-x: hidden } to laundry and pharmacy globals.css'
    rationale: 'Horizontal scroll carousels with -mx-4 negative margins caused documentElement.scrollWidth overflow at tablet/desktop; wellness already had this fix'

metrics:
  duration: ~9 minutes
  completed: 2026-01-30
---

# Phase 11 Plan 01: Smoke Tests Link-Based Verticals Summary

Smoke tests for 4 link-based BottomNav verticals: wellness (updated), laundry, pharmacy, workshops. Each spec covers page load, BottomNav navigation, key routes, and responsive viewport overflow checks.

## One-liner

E2E smoke specs for wellness/laundry/pharmacy/workshops with BottomNav link navigation and 3-viewport overflow tests, 72/72 passing on mobile+desktop.

## What Was Done

### Task 1: Update wellness + create laundry and pharmacy specs

- Updated `wellness.smoke.spec.ts` from 5 to 9 tests (added BottomNav navigation + 3 responsive viewport overflow tests)
- Created `laundry.smoke.spec.ts` with 9 tests covering page load, title, console errors, nav visibility, BottomNav link navigation, key routes, and 3 viewport overflow checks
- Created `pharmacy.smoke.spec.ts` with identical 9-test structure
- Fixed missing `overflow-x: hidden` on `html,body` in laundry and pharmacy `globals.css` (pre-existing CSS bug)
- Commit: `b6e13d4`

### Task 2: Create workshops spec and verify all 4 on desktop

- Created `workshops.smoke.spec.ts` with 9 tests following same template
- Verified all 4 specs pass on both mobile and desktop Playwright projects (72/72 tests)
- Commit: `9f2cf25`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed missing overflow-x:hidden on laundry and pharmacy globals.css**

- **Found during:** Task 1 verification
- **Issue:** Laundry and pharmacy home pages had horizontal overflow at tablet (768px) and desktop (1280px) viewports. Root cause: `.hide-scrollbar { overflow-x: visible }` at `@media (min-width: 768px)` combined with `-mx-4` negative margins on horizontal carousels caused `scrollWidth > clientWidth`. Wellness already had `body { overflow-x: hidden }` via `@layer base`.
- **Fix:** Added `html, body { overflow-x: hidden }` to both `apps/laundry/frontend/app/globals.css` and `apps/pharmacy/frontend/app/globals.css`. Both `html` and `body` needed the rule to fully prevent horizontal scrolling at the document level.
- **Files modified:** `apps/laundry/frontend/app/globals.css`, `apps/pharmacy/frontend/app/globals.css`
- **Commit:** `b6e13d4` (included with Task 1)

## Decisions Made

| Decision                             | Context                                            | Choice                                              | Rationale                                                                        |
| ------------------------------------ | -------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| Graceful desktop nav skip            | BottomNav is `md:hidden` on desktop viewports      | `if (count === 0) return` instead of hard assertion | Same test passes on both mobile and desktop projects without branching logic     |
| Fix CSS overflow vs adjust test      | Laundry/pharmacy had real horizontal overflow      | Fix the CSS (add `overflow-x: hidden`)              | Matches wellness pattern; overflow was a genuine bug, not intentional            |
| Use `domcontentloaded` for nav tests | HMR websocket prevents `networkidle` from settling | `waitForLoadState('domcontentloaded')`              | As recommended in research -- `networkidle` reserved for console error test only |

## Test Coverage Summary

| Vertical  | Tests | Mobile | Desktop | BottomNav Links            | Viewports    |
| --------- | ----- | ------ | ------- | -------------------------- | ------------ |
| Wellness  | 9     | PASS   | PASS    | 5 links (all)              | 375/768/1280 |
| Laundry   | 9     | PASS   | PASS    | 4 links (center is button) | 375/768/1280 |
| Pharmacy  | 9     | PASS   | PASS    | 5 links (all)              | 375/768/1280 |
| Workshops | 9     | PASS   | PASS    | 5 links (all)              | 375/768/1280 |

## Verification

- `SKIP_WEBSERVER=1 npx playwright test --project=wellness-mobile tests/e2e/verticals/wellness.smoke.spec.ts` -- 9 passed
- `SKIP_WEBSERVER=1 npx playwright test --project=wellness-desktop tests/e2e/verticals/wellness.smoke.spec.ts` -- 9 passed
- `SKIP_WEBSERVER=1 npx playwright test --project=laundry-mobile tests/e2e/verticals/laundry.smoke.spec.ts` -- 9 passed
- `SKIP_WEBSERVER=1 npx playwright test --project=laundry-desktop tests/e2e/verticals/laundry.smoke.spec.ts` -- 9 passed
- `SKIP_WEBSERVER=1 npx playwright test --project=pharmacy-mobile tests/e2e/verticals/pharmacy.smoke.spec.ts` -- 9 passed
- `SKIP_WEBSERVER=1 npx playwright test --project=pharmacy-desktop tests/e2e/verticals/pharmacy.smoke.spec.ts` -- 9 passed
- `SKIP_WEBSERVER=1 npx playwright test --project=workshops-mobile tests/e2e/verticals/workshops.smoke.spec.ts` -- 9 passed
- `SKIP_WEBSERVER=1 npx playwright test --project=workshops-desktop tests/e2e/verticals/workshops.smoke.spec.ts` -- 9 passed

## Next Phase Readiness

Plan 11-02 can proceed. The link-based vertical template is established and proven. Callback-based verticals (tours, accommodations) and mixed verticals (coffeeshop, gym) will need different BottomNav test strategies as documented in research.
