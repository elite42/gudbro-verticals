# Feature Landscape: E2E Smoke Tests for PWA Verticals

**Domain:** E2E testing for 8 standalone PWA verticals in a monorepo
**Researched:** 2026-01-30
**Confidence:** HIGH (Playwright patterns well-established, project structure known)

## Context

GUDBRO has 8 PWA verticals (coffeeshop, accommodations, tours, gym, wellness, laundry, pharmacy, workshops) plus backoffice and waiter apps. Each PWA is standalone, accessed via QR/link. All share: BottomNav pattern, DM Sans font, CSS variable theming, Next.js 14. Only accommodations has a real backend (6 API routes, JWT auth). Coffeeshop is most mature (v1+v2 coexistence).

### App Ports (for test configuration)

| App            | Port | Backend             |
| -------------- | ---- | ------------------- |
| Coffeeshop     | 3004 | Mock/Supabase       |
| Wellness       | 3003 | Mock                |
| Waiter         | 3005 | Mock/Supabase       |
| Backoffice     | 3023 | Supabase            |
| Tours          | 3026 | Mock                |
| Accommodations | 3028 | Real (6 API routes) |
| Laundry        | 3030 | Mock                |
| Pharmacy       | 3031 | Mock                |
| Workshops      | 3032 | Mock                |
| Gym            | 3033 | Mock                |

---

## Table Stakes

Features every E2E smoke test suite MUST have. Missing = no confidence in deployments.

### 1. Page Load Smoke Tests (per vertical)

| Test                                 | Why Expected                                             | Complexity | Notes                                                                              |
| ------------------------------------ | -------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| Homepage renders without errors      | Catches build failures, missing env vars, broken imports | Low        | One test per vertical. Check for no console errors + visible content.              |
| All navigation pages render          | Catches broken routes, missing components                | Low        | Visit each route defined in BottomNav, assert no 500/404, assert page has content. |
| BottomNav renders and is interactive | Shared component, critical for all PWAs                  | Low        | Assert nav items present, clickable, active state changes.                         |
| No JavaScript errors on load         | Catches import errors, undefined references              | Low        | Use `page.on('pageerror')` listener in Playwright.                                 |

**Implementation pattern (Playwright):**

```typescript
// Parameterized test across all verticals
const verticals = [
  { name: 'coffeeshop', port: 3004, pages: ['/', '/menu', '/orders'] },
  { name: 'wellness', port: 3003, pages: ['/', '/services', '/staff'] },
  // ... etc
];

for (const vertical of verticals) {
  test.describe(`${vertical.name} smoke`, () => {
    for (const page of vertical.pages) {
      test(`${page} loads without errors`, async ({ page: pw }) => {
        const errors: string[] = [];
        pw.on('pageerror', (err) => errors.push(err.message));
        await pw.goto(`http://localhost:${vertical.port}${page}`);
        await expect(pw.locator('body')).toBeVisible();
        expect(errors).toHaveLength(0);
      });
    }
  });
}
```

**Confidence:** HIGH -- standard Playwright pattern, well-documented.

### 2. Tag-Based Test Organization (@smoke, @full)

| Test                                      | Why Expected                              | Complexity | Notes                                                           |
| ----------------------------------------- | ----------------------------------------- | ---------- | --------------------------------------------------------------- |
| `@smoke` tag on critical tests            | Enables fast CI runs (< 2 min)            | Low        | Tag with `test('name @smoke', ...)` or use `test.describe` tags |
| `@vertical:name` tag per app              | Enables selective testing per changed app | Low        | Run only affected vertical's tests on PRs                       |
| Separate Playwright projects per vertical | Proper isolation, parallel execution      | Medium     | One project per vertical in `playwright.config.ts`              |

**Confidence:** HIGH -- Playwright's native tagging via `grep` is well-documented. Projects-per-app pattern recommended by Playwright docs.

### 3. Responsive Viewport Testing

| Test                                                     | Why Expected                             | Complexity | Notes                                          |
| -------------------------------------------------------- | ---------------------------------------- | ---------- | ---------------------------------------------- |
| Mobile viewport renders correctly                        | PWAs are mobile-first, QR access = phone | Low        | Use Playwright's `devices['iPhone 13']` preset |
| Desktop viewport renders correctly                       | Some users access via laptop             | Low        | Use `devices['Desktop Chrome']`                |
| BottomNav visible on mobile, hidden/different on desktop | Key UX pattern                           | Low        | Assert visibility per viewport                 |

**Confidence:** HIGH -- Playwright devices presets handle this natively.

### 4. Visual Content Assertions

| Test                           | Why Expected                              | Complexity | Notes                                        |
| ------------------------------ | ----------------------------------------- | ---------- | -------------------------------------------- |
| Critical text/headings present | Catches broken translations, missing data | Low        | Assert key headings with `toBeVisible()`     |
| Images load (no broken images) | Catches broken asset paths                | Low        | Check `img` elements have `naturalWidth > 0` |
| DM Sans font loads             | Brand consistency                         | Low        | Check computed style or font-face load event |

**Confidence:** HIGH

### 5. Navigation Flow Testing

| Test                              | Why Expected                     | Complexity | Notes                                                         |
| --------------------------------- | -------------------------------- | ---------- | ------------------------------------------------------------- |
| BottomNav navigates between pages | Core UX flow                     | Low        | Click each nav item, assert URL changes, page content changes |
| Back button works                 | Browser history integrity        | Low        | Navigate forward, go back, assert previous page               |
| Deep link to specific page works  | QR codes point to specific pages | Low        | Go directly to `/services/slug`, assert renders               |

**Confidence:** HIGH

### 6. HTTP Status & API Health (Accommodations)

| Test                  | Why Expected                    | Complexity | Notes                                      |
| --------------------- | ------------------------------- | ---------- | ------------------------------------------ |
| API routes return 200 | Only vertical with real backend | Medium     | Test all 6 API endpoints on accommodations |
| Auth flow works (JWT) | Accommodations uses JWT auth    | Medium     | Test login/token/protected route cycle     |
| API error handling    | Graceful degradation            | Medium     | Test with invalid tokens, missing params   |

**Confidence:** HIGH -- Standard API testing patterns.

---

## Differentiators

Features that add significant value beyond basic smoke. Not expected in v1, but worth planning for.

### 7. Visual Regression Testing (Screenshot Comparison)

| Feature                        | Value Proposition                                        | Complexity | Notes                                                                    |
| ------------------------------ | -------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| Screenshot comparison per page | Catches CSS regressions, layout shifts across all 8 PWAs | Medium     | Playwright has built-in `toHaveScreenshot()`. Needs baseline management. |
| Per-vertical visual baselines  | Each PWA has its own theme/colors                        | Medium     | Store baselines in `tests/e2e/snapshots/{vertical}/`                     |
| Mobile + Desktop screenshots   | Different layouts need separate baselines                | Medium     | 2x the baselines, but Playwright handles this via projects               |

**Implementation pattern:**

```typescript
test('homepage visual', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.01,
  });
});
```

**Confidence:** HIGH -- `toHaveScreenshot()` is built into Playwright. Main complexity is baseline management across 8 apps.

### 8. PWA Manifest Validation

| Feature                                | Value Proposition                           | Complexity | Notes                                                 |
| -------------------------------------- | ------------------------------------------- | ---------- | ----------------------------------------------------- |
| Manifest file exists and is valid JSON | PWA installability requirement              | Low        | Fetch `/manifest.json`, parse, assert required fields |
| Required manifest fields present       | name, short_name, icons, start_url, display | Low        | Simple JSON field checks                              |
| Icons referenced in manifest exist     | Broken icon paths = broken install          | Low        | Fetch each icon URL, assert 200                       |

**Confidence:** HIGH -- Simple HTTP/JSON assertions. No Playwright-specific complexity.

### 9. Performance Budget Smoke

| Feature                        | Value Proposition               | Complexity | Notes                                                  |
| ------------------------------ | ------------------------------- | ---------- | ------------------------------------------------------ |
| Page load time under threshold | Catches performance regressions | Low        | Use `page.evaluate(() => performance.timing)`          |
| No layout shift (CLS check)    | Mobile UX quality               | Medium     | Requires PerformanceObserver or Lighthouse integration |
| Bundle size monitoring         | Prevents bloat across 8 apps    | Medium     | Check `_next/static` asset sizes                       |

**Confidence:** MEDIUM -- Basic timing is easy. CLS/Lighthouse integration adds complexity.

### 10. Shared Fixture Architecture

| Feature                                     | Value Proposition             | Complexity | Notes                                                          |
| ------------------------------------------- | ----------------------------- | ---------- | -------------------------------------------------------------- |
| Custom `test.extend()` with vertical config | DRY test setup across 8 apps  | Medium     | One fixture provides port, pages, theme, features per vertical |
| Page Object Model for BottomNav             | Shared component = shared POM | Low        | `BottomNavPOM` reusable across all verticals                   |
| Mock data fixtures per vertical             | Consistent test data          | Medium     | Extend existing `mock-data.ts`                                 |

**Confidence:** HIGH -- Playwright fixtures are well-documented, existing `mock-data.ts` in project.

### 11. Cross-Vertical Consistency Checks

| Feature                              | Value Proposition             | Complexity | Notes                                          |
| ------------------------------------ | ----------------------------- | ---------- | ---------------------------------------------- |
| All verticals use same font          | Brand consistency             | Low        | Check computed font-family across all apps     |
| CSS variable theming works           | Theme engine integrity        | Low        | Check `--primary-color` etc. resolve correctly |
| Shared components render identically | Component library consistency | Medium     | Compare BottomNav structure across verticals   |

**Confidence:** HIGH

### 12. Accessibility Smoke Tests

| Feature                                      | Value Proposition             | Complexity | Notes                                           |
| -------------------------------------------- | ----------------------------- | ---------- | ----------------------------------------------- |
| No critical a11y violations                  | Legal compliance, user access | Medium     | Use `@axe-core/playwright` for automated checks |
| Interactive elements are keyboard-accessible | Basic a11y                    | Low        | Tab through BottomNav, assert focus visible     |
| Images have alt text                         | Screen reader support         | Low        | Query `img:not([alt])`, assert none             |

**Confidence:** HIGH -- `axe-core` integration is standard.

---

## Anti-Features

Things to explicitly NOT test in E2E smoke tests. Common mistakes that waste time.

| Anti-Feature                                      | Why Avoid                                                                                                       | What to Do Instead                                                                         |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Unit-level logic in E2E                           | Slow, brittle, wrong layer. E2E should test user flows, not functions.                                          | Write unit tests separately with Vitest.                                                   |
| Full Supabase database integration                | Requires real DB, flaky, slow, credential management nightmare.                                                 | Mock at API boundary. Test DB separately.                                                  |
| Service Worker offline caching                    | Playwright's SW support is limited. Installation testing not natively supported (open Playwright issue #26875). | Validate manifest manually or with Lighthouse in CI as separate step.                      |
| Push notification flows                           | Requires browser permissions, OS-level interaction. Fragile.                                                    | Test notification UI components in isolation. Mock push events.                            |
| Real payment processing                           | Security risk, flaky, external dependency.                                                                      | Mock payment APIs. Test UI flow only.                                                      |
| Cross-browser parity (Safari + Firefox)           | Diminishing returns for smoke tests. Safari WebKit in Playwright is approximation, not real Safari.             | Run smoke on Chromium only. Add WebKit/Firefox for release gates only.                     |
| Pixel-perfect visual tests across OS              | Font rendering differs macOS vs Linux (CI). Causes false failures.                                              | Use generous `maxDiffPixelRatio` (0.01-0.02) or skip visual tests in CI initially.         |
| Testing third-party integrations (WhatsApp, Maps) | External services are unreliable, can't control state.                                                          | Assert link href is correct, don't click through to external.                              |
| E2E tests for every page state variation          | Combinatorial explosion across 8 apps.                                                                          | Test golden path only. Unit test edge cases.                                               |
| Real-time/WebSocket testing in smoke              | Complex setup, timing-dependent, flaky.                                                                         | Defer to integration tests. Existing `full-lunch-flow.spec.ts` covers this for coffeeshop. |

---

## Feature Dependencies

```
Playwright Config (projects per vertical)
    |
    +---> Page Load Smoke Tests (per vertical)
    |         |
    |         +---> Navigation Flow Tests
    |         |
    |         +---> Visual Content Assertions
    |         |
    |         +---> Responsive Viewport Tests
    |
    +---> Tag Organization (@smoke, @vertical)
    |         |
    |         +---> CI Integration (run @smoke on every push)
    |
    +---> Shared Fixtures (test.extend)
    |         |
    |         +---> Page Object Models (BottomNavPOM)
    |         |
    |         +---> Cross-Vertical Consistency Checks
    |
    +---> [DIFFERENTIATOR] Visual Regression
    |
    +---> [DIFFERENTIATOR] PWA Manifest Validation
    |
    +---> [DIFFERENTIATOR] Accessibility Smoke
    |
    +---> [ACCOMMODATIONS ONLY] API Route Tests
```

---

## MVP Recommendation

For the first smoke test milestone, prioritize in this order:

### Phase 1 -- Foundation (must have)

1. **Playwright config with projects per vertical** -- 10 projects (8 PWAs + backoffice + waiter), each with correct port and mobile viewport
2. **Page load smoke tests** -- Every page in every vertical loads without JS errors
3. **BottomNav navigation tests** -- Shared component, click-through all nav items
4. **Tag organization** -- `@smoke` for fast CI, `@vertical:name` for selective runs

### Phase 2 -- Confidence (should have)

5. **Responsive viewport tests** -- Mobile + Desktop for each vertical
6. **Visual content assertions** -- Headings, images, font loading
7. **API route tests for accommodations** -- The only vertical with real backend
8. **Shared fixtures** -- `test.extend()` with vertical config, BottomNavPOM

### Phase 3 -- Quality (nice to have)

9. **Visual regression screenshots** -- Baseline per vertical per viewport
10. **PWA manifest validation** -- Fetch and validate manifest.json per app
11. **Accessibility smoke** -- axe-core integration, keyboard nav
12. **Cross-vertical consistency** -- Font, theme variables, shared components

### Defer to separate milestone

- Performance budgets / Lighthouse integration
- Real-time WebSocket flow testing (already partially covered by existing `full-lunch-flow.spec.ts`)
- Cross-browser testing (Safari, Firefox)

---

## Existing Infrastructure

The project already has:

| Asset                | Location                                      | Status                                                                                   |
| -------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Playwright config    | `playwright.config.ts`                        | Exists, configured for coffeeshop/waiter/backoffice. Needs expansion to all 8 verticals. |
| Test directory       | `tests/e2e/`                                  | Exists with scenarios/, fixtures/, utils/                                                |
| Mock data            | `tests/e2e/fixtures/mock-data.ts`             | Exists, needs expansion per vertical                                                     |
| Multi-system helper  | `tests/e2e/utils/multi-system-helper.ts`      | Exists for cross-app flows                                                               |
| E2E architecture doc | `tests/e2e/ARCHITECTURE.md`                   | Exists, focused on coffeeshop order flow                                                 |
| Global setup         | `tests/e2e/global-setup.ts`                   | Exists for multi-system tests                                                            |
| Full flow test       | `tests/e2e/scenarios/full-lunch-flow.spec.ts` | Exists, covers coffeeshop order lifecycle                                                |

**Key gap:** No smoke tests for any of the 8 vertical PWAs. Current tests are coffeeshop-specific flow tests only.

---

## Estimated Complexity by Vertical

| Vertical       | Smoke Test Complexity | Why                                          |
| -------------- | --------------------- | -------------------------------------------- |
| Coffeeshop     | Medium                | Most mature, v1+v2 coexistence, most pages   |
| Accommodations | Medium-High           | Real backend, JWT auth, 6 API routes to test |
| Tours          | Low                   | Standard pages, no backend                   |
| Gym            | Low                   | Standard pages, no backend                   |
| Wellness       | Low                   | Standard pages, no backend                   |
| Laundry        | Low                   | Standard pages, LaundryForm drawer           |
| Pharmacy       | Low                   | Standard pages, search/symptom UI            |
| Workshops      | Low                   | Standard pages, booking via WhatsApp link    |

---

## Sources

- [BrowserStack: Playwright Best Practices 2026](https://www.browserstack.com/guide/playwright-best-practices)
- [Playwright Docs: Test Projects](https://playwright.dev/docs/test-projects)
- [Playwright Docs: Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright Docs: Page Object Models](https://playwright.dev/docs/pom)
- [Tim Deschryver: Playwright tags and grep](https://timdeschryver.dev/blog/create-and-run-playwright-test-sets-using-tags-and-grep)
- [Makerkit: Smoke Testing SaaS with Playwright](https://makerkit.dev/blog/tutorials/smoke-testing-saas-playwright)
- [Graphite: Testing Strategies for Monorepos](https://graphite.com/guides/testing-strategies-for-monorepos)
- [Kyrre Gjerstad: E2E Testing Setup Monorepo vs Standard](https://www.kyrre.dev/blog/end-to-end-testing-setup)
- [Greg Pabian: E2E Tests with Mono Repositories](https://greg-pabian.medium.com/e2e-tests-with-mono-repositories-f9ef02b3cd3b)
- [Playwright GitHub Issue #26875: PWA Installation Validation](https://github.com/microsoft/playwright/issues/26875)
- [BrowserStack: How to Test PWA](https://www.browserstack.com/guide/how-to-test-pwa)
- [CloudQA: Testing Your PWA](https://cloudqa.io/testing-your-pwa-progressive-web-application/)
