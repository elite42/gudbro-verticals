# Technology Stack: E2E Smoke Testing Across 8 PWA Verticals

**Project:** GUDBRO Multi-Vertical E2E Smoke Tests
**Researched:** 2026-01-30
**Overall Confidence:** HIGH

---

## Recommended Stack

### Core Testing Framework

| Technology         | Version                     | Purpose         | Why                                                                                                                                     |
| ------------------ | --------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `@playwright/test` | ^1.57.0 (already installed) | E2E test runner | Already in project, latest stable. v1.57 switched to Chrome for Testing builds for more reliable headless execution. No upgrade needed. |

**No new test framework dependencies required.** Playwright 1.57 already provides everything needed for multi-project configuration, visual regression, mobile emulation, and parallel execution.

### Visual Regression (Built-in)

| Technology                           | Version                     | Purpose                       | Why                                                                                                                                                                 |
| ------------------------------------ | --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expect(page).toHaveScreenshot()`    | Built into @playwright/test | Visual regression baselines   | Zero additional dependencies. Pixel-level comparison is sufficient for 8 verticals at our scale. Commercial tools (Applitools, Percy) are overkill for smoke tests. |
| `expect(locator).toHaveScreenshot()` | Built into @playwright/test | Component-level visual checks | Target specific sections (hero, nav, footer) to reduce false positives from dynamic content.                                                                        |

**Why NOT Applitools/Percy:** These services cost $199+/month, require cloud accounts, add external dependencies to CI, and solve a problem we do not have (cross-browser rendering at scale). Our 8 verticals share the same design system and stack -- Playwright's built-in pixel comparison with masking handles this fine. Revisit only if false positive rate exceeds 10% of test runs.

### Device Emulation (Built-in)

| Technology           | Version  | Purpose                        | Why                                                                                          |
| -------------------- | -------- | ------------------------------ | -------------------------------------------------------------------------------------------- |
| `playwright.devices` | Built-in | Mobile/tablet/desktop profiles | Predefined profiles for Pixel 5, iPhone 13, iPad, Desktop Chrome. No extra libraries needed. |

### CI Integration

| Technology     | Version | Purpose   | Why                                                                                                                      |
| -------------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| GitHub Actions | N/A     | CI runner | Already used by project. Playwright has first-class GH Actions support with `mcr.microsoft.com/playwright` Docker image. |

### Supporting Utilities (New, zero-dependency)

These are patterns/helpers to write, not libraries to install:

| Utility                | Purpose                                                                 | Implementation                                  |
| ---------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
| `vertical-registry.ts` | Maps all 8 verticals to ports, routes, and expected elements            | TypeScript config file in `tests/e2e/fixtures/` |
| `smoke-helpers.ts`     | Shared assertions for navigation, page load, responsive checks          | Playwright test helper using built-in APIs      |
| `visual-config.ts`     | Screenshot comparison settings (threshold, masking, naming conventions) | Playwright config extension                     |

---

## Configuration Architecture

### Multi-Project Setup for 8 Verticals

The existing `playwright.config.ts` has 6 projects (chromium, Mobile Chrome, Mobile Safari, multi-system, waiter-pwa, backoffice). For 8-vertical smoke testing, use a **per-vertical project** pattern:

```typescript
// Pattern: one project per vertical x device combination
// This gives granular control and parallel execution

const VERTICALS = {
  coffeeshop: { port: 3004, name: 'Coffeeshop' },
  accommodations: { port: 3028, name: 'Accommodations' },
  tours: { port: 3026, name: 'Tours' },
  gym: { port: 3033, name: 'Gym' },
  wellness: { port: 3003, name: 'Wellness' },
  laundry: { port: 3030, name: 'Laundry' },
  pharmacy: { port: 3031, name: 'Pharmacy' },
  workshops: { port: 3032, name: 'Workshops' },
} as const;

// Projects generated per vertical:
// - {vertical}-mobile   (Pixel 5, touch, mobile viewport)
// - {vertical}-desktop  (Desktop Chrome, 1280x720)
```

**Why per-vertical projects instead of a single project with parameterized tests:**

1. Run one vertical at a time: `npx playwright test --project=coffeeshop-mobile`
2. Independent failure isolation -- pharmacy failing does not block coffeeshop results
3. Separate screenshot baselines per vertical per device
4. Parallel execution across verticals in CI

### WebServer Configuration

**Problem:** Starting 8 Next.js dev servers simultaneously requires significant memory (~500MB each = ~4GB total).

**Recommendation:** Use `SKIP_WEBSERVER=1` and manage servers externally:

```bash
# In CI: start only the verticals being tested
# In local dev: start servers manually with pnpm dev:*
```

For CI, use a matrix strategy in GitHub Actions to test verticals in parallel jobs (each job starts only its own server). This keeps memory per job under 1GB.

### Visual Regression Settings

```typescript
// Recommended settings for PWA smoke tests
{
  // Allow 0.5% pixel difference (font rendering, anti-aliasing)
  maxDiffPixelRatio: 0.005,

  // Threshold for individual pixel color difference (0-1)
  threshold: 0.2,

  // Reduce motion to eliminate animation flakiness
  reducedMotion: 'reduce',

  // Mask dynamic content (timestamps, counters)
  // Use locator-based masking per test
}
```

**Screenshot naming convention:** `{vertical}-{page}-{device}.png`
Example: `coffeeshop-menu-mobile.png`, `pharmacy-search-desktop.png`

**Baseline storage:** Commit to `tests/e2e/__screenshots__/` in git. Playwright's default behavior. At 8 verticals x ~5 pages x 2 devices = ~80 baseline images (~10MB total). Acceptable for git.

---

## What NOT to Add

### Anti-Recommendations

| Tool/Library                                               | Why NOT                                                                                 | What to Do Instead                                       |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Applitools Eyes**                                        | $500+/month, overkill for smoke tests across same-stack verticals                       | Use built-in `toHaveScreenshot()` with pixel threshold   |
| **Percy (BrowserStack)**                                   | $199/month, requires cloud account, adds external dependency to CI                      | Built-in visual comparison is sufficient                 |
| **Cypress**                                                | Different paradigm, would fragment test tooling. Playwright already installed.          | Stay with Playwright                                     |
| **Storybook visual tests**                                 | Requires Storybook setup across 8 apps, component-level not page-level                  | Page-level Playwright screenshots cover smoke test needs |
| **Docker for local testing**                               | Adds complexity. Docker only needed if cross-platform baseline consistency is an issue. | Run locally, use CI baselines as source of truth         |
| **playwright-lighthouse**                                  | Performance testing is a separate concern from smoke tests                              | Add later as separate milestone if needed                |
| **@axe-core/playwright**                                   | Accessibility testing is valuable but separate scope                                    | Add as separate milestone; do not mix with smoke tests   |
| **Custom screenshot diffing libraries** (pixelmatch, etc.) | Playwright already uses pixelmatch internally                                           | Built-in is sufficient                                   |
| **Test parallelization services** (Currents, etc.)         | 80 smoke tests complete in <5 min on GH Actions. Not a bottleneck.                      | Use Playwright's built-in `fullyParallel: true`          |

### Anti-Patterns to Avoid

| Anti-Pattern                               | Why Bad                                                                        | Do This Instead                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| One giant config with all 8 webServers     | 4GB+ RAM, slow startup, coupled failures                                       | Matrix strategy in CI, one vertical per job                             |
| Screenshot baselines in CI artifacts only  | Lost on every run, no diff tracking                                            | Commit baselines to git                                                 |
| Testing full user flows in smoke tests     | Smoke tests must be fast (<30s per vertical); full flows are integration tests | Smoke = "does it load and look right?" Only navigation + visual checks. |
| Sharing browser context across verticals   | Cookie/state leakage between apps                                              | Fresh context per vertical (Playwright default)                         |
| `networkidle` waits everywhere             | Flaky, deprecated-ish pattern                                                  | Use `domcontentloaded` + explicit element waits                         |
| Hardcoded viewport sizes                   | Diverges from real device profiles                                             | Use `playwright.devices` presets                                        |
| Testing all 8 verticals in a single CI job | Memory pressure, slow feedback, all-or-nothing failure                         | Matrix strategy: parallel jobs per vertical                             |

---

## Vertical Port Registry

For reference during implementation:

| Vertical       | Port | Package Filter           | PWA Type                |
| -------------- | ---- | ------------------------ | ----------------------- |
| Coffeeshop     | 3004 | `@gudbro/coffeeshop`     | Customer menu, ordering |
| Wellness       | 3003 | `@gudbro/wellness`       | Services, booking       |
| Tours          | 3026 | `@gudbro/tours`          | Tour catalog, booking   |
| Accommodations | 3028 | `@gudbro/accommodations` | Stay dashboard, booking |
| Laundry        | 3030 | `@gudbro/laundry`        | Service catalog         |
| Pharmacy       | 3031 | `@gudbro/pharmacy`       | Product catalog, search |
| Workshops      | 3032 | `@gudbro/workshops`      | Workshop catalog        |
| Gym            | 3033 | `@gudbro/gym`            | Fitness, day passes     |
| Waiter         | 3005 | `@gudbro/waiter`         | Staff order-taking      |
| Backoffice     | 3023 | `@gudbro/backoffice`     | Admin dashboard         |

---

## CI Configuration Pattern

```yaml
# GitHub Actions matrix strategy (recommended pattern)
strategy:
  fail-fast: false
  matrix:
    vertical:
      [
        coffeeshop,
        wellness,
        tours,
        accommodations,
        laundry,
        pharmacy,
        workshops,
        gym,
      ]

steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
  - run: npx playwright install --with-deps chromium
  - run: pnpm install
  - run: |
      # Start only the vertical under test
      pnpm --filter @gudbro/${{ matrix.vertical }} dev &
      npx wait-on http://localhost:${{ matrix.vertical_port }}
      npx playwright test --project=${{ matrix.vertical }}-mobile --project=${{ matrix.vertical }}-desktop
  - uses: actions/upload-artifact@v4
    if: failure()
    with:
      name: playwright-report-${{ matrix.vertical }}
      path: playwright-report/
```

---

## Installation

```bash
# Nothing new to install. Playwright 1.57 is already in package.json.
# Just ensure browsers are installed:
npx playwright install --with-deps chromium

# For visual regression on CI, also install WebKit for Safari baseline diversity:
npx playwright install --with-deps chromium webkit
```

**Total new npm dependencies: 0**

---

## Sources

- [Playwright Projects Documentation](https://playwright.dev/docs/test-projects) - Multi-project configuration (HIGH confidence)
- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots) - Built-in toHaveScreenshot() API (HIGH confidence)
- [Playwright Emulation](https://playwright.dev/docs/emulation) - Device profiles and mobile emulation (HIGH confidence)
- [Playwright Release Notes](https://playwright.dev/docs/release-notes) - v1.57 changelog (HIGH confidence)
- [Turborepo Playwright Guide](https://turborepo.com/docs/guides/tools/playwright) - Monorepo patterns (MEDIUM confidence)
- [BrowserStack - Playwright Best Practices 2026](https://www.browserstack.com/guide/playwright-best-practices) - General best practices (MEDIUM confidence)
- [BrowserStack - Snapshot Testing with Playwright 2026](https://www.browserstack.com/guide/playwright-snapshot-testing) - Visual regression patterns (MEDIUM confidence)
- [Ash Connolly - Playwright Visual Regression in Next.js](https://ashconnolly.com/blog/playwright-visual-regression-testing-in-next) - Next.js-specific setup (MEDIUM confidence)
- [DEV Community - Visual Regression Testing](https://dev.to/subito/how-we-catch-ui-bugs-early-with-visual-regression-testing-and-playwright-5h2a) - Real-world patterns (MEDIUM confidence)
