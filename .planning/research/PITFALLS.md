# Domain Pitfalls: E2E Smoke Tests in Multi-Vertical PWA Monorepo

**Domain:** Adding E2E smoke tests to existing 8-app Next.js 14 pnpm monorepo
**Researched:** 2026-01-30
**Overall Confidence:** HIGH (well-documented problem space, verified against project config)

---

## Critical Pitfalls

Mistakes that cause rewrites, CI pipeline failures, or abandoned test suites.

### Pitfall 1: Over-Testing with E2E Instead of Smoke Tests

**What goes wrong:** Teams write comprehensive E2E test suites covering every user flow, edge case, and error state. The suite grows to 200+ tests, takes 30-60 minutes to run, developers stop waiting for CI, and tests become ignored or skipped. The test suite becomes a maintenance burden rather than a safety net.

**Why it happens:** Conflating "smoke tests" with "full E2E coverage." Smoke tests verify critical paths work (page loads, navigation, key user flow). Full E2E covers edge cases, error handling, and complex flows. For 8 PWAs, doing full E2E from the start is a trap.

**Warning signs:**

- Test count exceeds 5-8 per vertical for smoke tests
- CI pipeline exceeds 5 minutes for smoke suite
- Tests are being skipped or retried frequently
- Developers say "I'll push and see if CI passes"

**Prevention:**

- Define "smoke test" strictly: page loads, core navigation works, one critical user flow per vertical
- Cap at 3-5 smoke tests per vertical (24-40 total for 8 verticals)
- Reserve full E2E for the one vertical with real backend (accommodations)
- Use a naming convention: `*.smoke.spec.ts` vs `*.e2e.spec.ts` to enforce separation

**Detection:** Track test count per vertical. If any vertical exceeds 8 tests, review whether they are smoke-level or full E2E.

**Phase:** Address in Phase 1 (test strategy and scaffolding).

---

### Pitfall 2: Port Conflict Hell with 8 Apps

**What goes wrong:** Multiple Next.js apps compete for ports. Tests fail intermittently because a port is still occupied from a previous test run, or two test suites try to start the same app simultaneously. The current config already has hardcoded ports (3004, 3005, 3023) and adding 5+ more verticals multiplies the problem.

**Why it happens:** The existing `playwright.config.ts` uses `webServer` with fixed ports and `reuseExistingServer: !process.env.CI`. In CI, each app needs a fresh server, but starting 8 Next.js dev servers simultaneously is slow (120s timeout each) and resource-intensive. Locally, leftover processes from crashed test runs hold ports.

**Warning signs:**

- Tests fail with "EADDRINUSE" errors
- Tests pass locally but fail in CI (or vice versa)
- CI timeout at the webServer startup phase before any test runs
- `lsof -i :<port>` shows zombie processes

**Prevention:**

- Do NOT start all 8 apps simultaneously. Test verticals sequentially or in small groups.
- Use `webServer` array only for the 2-3 apps being tested in a given suite, not all 8.
- Create per-vertical Playwright projects that each start only their own server.
- In CI, use `--project=<vertical-name>` to run subsets.
- Add a port-cleanup step before test runs: `kill-port 3003 3004 3005 ...` or equivalent.
- Consider testing against `next build && next start` (production) rather than `next dev` for speed and stability.

**Detection:** CI logs showing webServer timeout or port-in-use errors. Test flakiness that disappears when run individually.

**Phase:** Address in Phase 1 (config architecture). The current config structure needs refactoring before adding more verticals.

---

### Pitfall 3: Testing Mock-Data Apps as if They Have a Backend

**What goes wrong:** Writing tests that assert on specific data values, API responses, or database state for the 7 mock-data verticals. When mock data changes (which it will, since these are active frontends), every test breaks. Teams then add data fixtures that duplicate the mock data, creating a maintenance nightmare.

**Why it happens:** Applying the same testing patterns to mock-data apps (coffeeshop, tours, wellness, laundry, pharmacy, workshops, gym) as to backend-connected apps (accommodations). The testing needs are fundamentally different.

**Warning signs:**

- Tests assert on specific product names, prices, or counts
- Test fixtures duplicate data already in the app's mock layer
- Tests break when someone updates placeholder content
- Different test strategies for mock vs backend apps are not documented

**Prevention:**

- For mock-data verticals: test structure, not content. Assert "menu has items" not "menu has Cappuccino at EUR 3.50."
- Use structural assertions: `expect(page.locator('[data-testid="menu-item"]')).toHaveCount.greaterThan(0)` not exact counts.
- For accommodations (real backend): use proper test data seeding and cleanup via Supabase API.
- Document the two-tier testing strategy explicitly in the test architecture docs.

**Detection:** Tests that break after content updates but no code changes. Tests with hardcoded strings matching app copy.

**Phase:** Address in Phase 1 (testing strategy) and enforce in Phase 2 (first vertical tests).

---

### Pitfall 4: Shared State Between Vertical Tests

**What goes wrong:** Tests for different verticals share browser context, localStorage, cookies, or service worker registrations. A test for coffeeshop sets a language preference that leaks into the wellness tests. Tests pass when run individually but fail when run together.

**Why it happens:** Playwright's `fullyParallel: true` (already enabled in the config) runs tests in parallel, but shared browser contexts or global setup can leak state. PWAs with service workers are especially vulnerable because service worker registration persists across navigations.

**Warning signs:**

- Tests pass individually (`npx playwright test <file>`) but fail in suite
- Order-dependent failures (reordering tests changes which ones fail)
- Tests that work on first run but fail on reruns without clearing browser data

**Prevention:**

- Each test file should use a fresh browser context (Playwright default, but verify no shared `storageState`).
- Never share `storageState` across different verticals.
- For PWA tests, explicitly unregister service workers in test teardown if testing SW behavior.
- Use Playwright's `test.describe.configure({ mode: 'serial' })` only within a single vertical, never across verticals.
- Set `serviceWorkers: 'block'` in test config unless explicitly testing PWA offline behavior.

**Detection:** Run the full suite 3 times. If different tests fail each time, state leakage is the cause.

**Phase:** Address in Phase 1 (test isolation setup).

---

## Moderate Pitfalls

Mistakes that cause delays, CI slowness, or accumulating tech debt.

### Pitfall 5: Starting Dev Servers Instead of Production Builds

**What goes wrong:** Using `next dev` for E2E tests (as the current config does) results in slow server startup, hot-reload interference during tests, and inconsistent behavior vs production. Dev servers compile pages on-demand, so the first navigation to each page is slow and may cause timeout flakiness.

**Why it happens:** It is easier to set up and mirrors the development workflow. The current `webServer` commands use `pnpm dev:*`.

**Warning signs:**

- First test per vertical is slow (server compiling page on first request)
- Intermittent timeouts on page navigation
- Tests pass with increased timeouts but are slow
- CI minutes are high relative to test count

**Prevention:**

- For CI: `next build && next start` instead of `next dev`. Pre-build all tested verticals.
- For local dev: keep `reuseExistingServer: true` so developers can run against their dev server.
- Use environment-based config: `process.env.CI ? 'next start' : 'next dev'`.
- Pre-build only the verticals being tested, not all 8.

**Detection:** Compare test runtime with dev server vs production server. If >2x difference, switch to production builds.

**Phase:** Address in Phase 2 (CI pipeline optimization).

---

### Pitfall 6: No Test Tagging or Selective Running

**What goes wrong:** Every PR runs every smoke test for every vertical, even when changes only affect one vertical. CI takes 10+ minutes for a CSS change to the coffeeshop. Developers learn to ignore CI or push without waiting.

**Why it happens:** The monorepo structure makes it easy to run everything, and "run all tests" feels safer. Without tagging, there is no way to run a subset.

**Warning signs:**

- CI time for tests exceeds 5 minutes on PRs
- Developers push multiple commits to "fix CI" without understanding failures
- Test output is long and hard to scan for relevant failures

**Prevention:**

- Tag tests by vertical: `test.describe('coffeeshop', { tag: '@coffeeshop' }, () => {...})`
- Use Playwright's `--grep` or `--project` flags in CI to run only affected verticals.
- Integrate with monorepo tooling: `turbo run test:e2e --filter=@gudbro/coffeeshop` or detect changed packages.
- Keep a "critical path" tag for the 5-10 most important cross-vertical tests that always run.
- Use Playwright v1.46+ `--only-changed` flag for test-impact analysis where applicable.

**Detection:** Measure CI time per PR. If it exceeds 5 minutes for single-vertical changes, selective running is needed.

**Phase:** Address in Phase 2 (CI integration) or Phase 3 (optimization).

---

### Pitfall 7: Brittle Selectors in Existing UI Without data-testid

**What goes wrong:** Smoke tests use CSS selectors, class names, or Tailwind utilities to locate elements. When someone updates the UI (class changes, component refactoring, Tailwind migration), tests break even though the feature still works. This is especially acute in a codebase that is actively resolving tech debt (TypeScript errors, ESLint warnings).

**Why it happens:** Adding `data-testid` attributes requires touching production code. Teams skip this step to "just get tests running" and use whatever selectors work now. With 8 PWAs actively being developed, UI changes are frequent.

**Warning signs:**

- Tests use selectors like `.flex.gap-2.items-center` or `nth-child(3)`
- Tests break after UI refactors that do not change functionality
- Test maintenance time exceeds test writing time

**Prevention:**

- Add `data-testid` attributes as part of the smoke test phase, not as a separate task.
- Prefer Playwright's role-based locators: `page.getByRole('button', { name: 'Add to cart' })` which also validates accessibility.
- Fallback order: `getByRole` > `getByText` > `data-testid` > CSS selector.
- Never use Tailwind class names or structural selectors (nth-child, etc.) in tests.
- Budget time for adding `data-testid` to the 2-3 key elements per page being tested.

**Detection:** Review test code for CSS class selectors. If >20% of locators use class names, refactor to stable selectors.

**Phase:** Address in Phase 2 (writing first tests). Budget explicit time for adding testid attributes.

---

### Pitfall 8: Ignoring the Accommodations Vertical's Auth Complexity

**What goes wrong:** The accommodations vertical has real Supabase backend with JWT auth. Teams either skip testing it (leaving the most complex vertical untested) or try to test it with the same mock-data approach as other verticals. Neither works. Real auth flows are slow, require test accounts, and introduce external dependencies.

**Why it happens:** It is easier to test the 7 mock-data verticals and defer accommodations. Or teams try to use `page.goto('/login')` and fill in real credentials in tests, which is slow and fragile.

**Warning signs:**

- Accommodations has zero smoke tests while other verticals have full coverage
- Tests use real Supabase credentials hardcoded or in env vars
- Auth flow tested via UI (slow) instead of API (fast)

**Prevention:**

- Use Playwright's `storageState` to save authenticated session and reuse across tests.
- Create a setup project that authenticates via Supabase API (not UI) and saves session state.
- Use a dedicated test Supabase user with known, stable data.
- Never put real credentials in test files. Use environment variables and CI secrets.
- Consider mocking the Supabase client for smoke tests (verify UI loads) and testing real auth separately.

**Detection:** If accommodations tests take >10x longer than other verticals, auth handling needs optimization.

**Phase:** Address in Phase 3 (backend-connected vertical testing). Requires separate strategy from mock-data verticals.

---

### Pitfall 9: CI Resource Exhaustion from Parallel Next.js Builds

**What goes wrong:** CI pipeline tries to build multiple Next.js apps in parallel, exhausting memory. GitHub Actions runners have 7GB RAM; each Next.js build can consume 1-2GB. Building 3+ apps simultaneously causes OOM kills, resulting in mysterious CI failures with no clear error message.

**Why it happens:** Monorepo CI naturally wants to parallelize. Turborepo and pnpm both encourage parallel execution. But Next.js builds are memory-heavy.

**Warning signs:**

- CI fails with "Killed" (no error message) or "JavaScript heap out of memory"
- CI passes on retry (OOM is timing-dependent)
- CI works locally on a 16GB machine but fails on CI runner

**Prevention:**

- Build verticals sequentially in CI, not in parallel: `turbo run build --concurrency=1`.
- Or shard: build 2-3 at a time max on standard GitHub Actions runners.
- Use `NODE_OPTIONS=--max-old-space-size=4096` in CI for Next.js builds.
- Cache `.next` build artifacts between CI runs to avoid full rebuilds.
- Only build the verticals being tested, not all 8.

**Detection:** Monitor CI memory usage. If builds fail intermittently with no clear error, suspect OOM.

**Phase:** Address in Phase 2 (CI pipeline setup).

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable without major rework.

### Pitfall 10: Screenshot/Video Artifacts Filling CI Storage

**What goes wrong:** The current config retains videos on failure and takes screenshots on failure. With 8 verticals and retries enabled (2 retries in CI), a bad run generates hundreds of MB of artifacts. CI storage fills up, artifact upload slows the pipeline, and old artifacts are never cleaned.

**Prevention:**

- Set `video: 'off'` for smoke tests (they should be fast and deterministic). Enable video only for complex E2E flows.
- Use `trace: 'on-first-retry'` (already configured) which is the right balance.
- Set artifact retention to 7 days in CI config.
- Only upload artifacts for failed tests, not the entire report.

**Phase:** Address in Phase 2 (CI config).

---

### Pitfall 11: Forgetting to Test Mobile Viewports

**What goes wrong:** Smoke tests only run on desktop Chrome. PWAs are primarily used on mobile devices. A navigation drawer works on desktop but is broken on mobile. The issue ships because smoke tests passed.

**Prevention:**

- The current config already has Mobile Chrome (Pixel 5) and Mobile Safari (iPhone 13) projects. Use them.
- For smoke tests, run at minimum: Desktop Chrome + one mobile viewport.
- Do not run all 3 browser projects for every test. Use desktop for structural tests, add mobile for navigation/layout tests.

**Phase:** Address in Phase 2 (test writing). Explicitly decide which tests run mobile.

---

### Pitfall 12: Not Handling i18n/RTL in Smoke Tests

**What goes wrong:** GUDBRO supports multiple languages and RTL layouts. Smoke tests only run in the default language. A deployment breaks the Arabic or Hebrew layout, and nobody catches it until a merchant reports.

**Prevention:**

- Add one smoke test per vertical that loads in an RTL language.
- Use Playwright's `locale` setting in test config to test non-default locales.
- Do not test every language. Test: default, one RTL, one non-Latin script.

**Phase:** Address in Phase 3 (expanded coverage). Not critical for initial smoke tests.

---

### Pitfall 13: Test File Organization That Does Not Scale

**What goes wrong:** All test files in a flat `tests/e2e/` directory. With 8 verticals, files are hard to find, and running tests for a single vertical requires grep-based filtering instead of directory-based.

**Prevention:**

- Organize tests by vertical: `tests/e2e/<vertical>/smoke.spec.ts`
- The existing config uses `testMatch` patterns per project. Align directory structure with these patterns.
- Example structure:
  ```
  tests/e2e/
    coffeeshop/smoke.spec.ts
    accommodations/smoke.spec.ts
    accommodations/auth.spec.ts
    tours/smoke.spec.ts
    ...
    shared/navigation.spec.ts
  ```

**Phase:** Address in Phase 1 (scaffolding).

---

## Phase-Specific Warnings

| Phase Topic                          | Likely Pitfall                           | Mitigation                                                                  |
| ------------------------------------ | ---------------------------------------- | --------------------------------------------------------------------------- |
| Phase 1: Test Strategy & Scaffolding | Over-scoping (full E2E instead of smoke) | Define "smoke" strictly: 3-5 tests per vertical, structural assertions only |
| Phase 1: Config Architecture         | Port conflict from current config        | Refactor to per-vertical projects with individual webServer configs         |
| Phase 2: First Vertical Tests        | Brittle selectors                        | Budget time for adding data-testid, prefer getByRole                        |
| Phase 2: CI Pipeline                 | OOM from parallel builds                 | Build sequentially, cache .next, only build tested verticals                |
| Phase 2: CI Pipeline                 | Slow dev server startup                  | Switch to `next build && next start` for CI                                 |
| Phase 3: Accommodations E2E          | Auth flow complexity                     | Use storageState + API auth, dedicated test user                            |
| Phase 3: Expanded Coverage           | i18n/RTL blind spots                     | Add one RTL test per vertical                                               |
| All Phases                           | Mock data coupling                       | Assert structure not content for 7 mock verticals                           |
| All Phases                           | Test maintenance burden                  | Cap test count, review quarterly, delete flaky tests                        |

---

## Summary: Top 3 Mistakes to Avoid

1. **Do not build a comprehensive E2E suite.** Build smoke tests. 3-5 per vertical, structural assertions, under 5 minutes total CI time. Full E2E comes later, if ever.

2. **Do not treat all 8 verticals the same.** 7 are mock-data frontends (test structure), 1 has real backend (test behavior). Two different testing strategies.

3. **Do not start all 8 servers simultaneously.** Test verticals in groups or sequentially. Pre-build for CI. Cache aggressively. CI should be fast enough that developers wait for it.

---

## Sources

- [BrowserStack: 15 Best Practices for Playwright Testing 2026](https://www.browserstack.com/guide/playwright-best-practices)
- [Better Stack: Avoiding Flaky Tests in Playwright](https://betterstack.com/community/guides/testing/avoid-flaky-playwright-tests/)
- [Semaphore: How to Avoid Flaky Tests in Playwright](https://semaphore.io/blog/flaky-tests-playwright)
- [Currents: How to Speed Up Playwright Tests](https://currents.dev/posts/how-to-speed-up-playwright-tests)
- [Endform: Why Your Playwright Tests Are Slow](https://endform.dev/blog/why-your-playwright-tests-are-slow)
- [Playwright GitHub Issue #11141: Multiple webServer Support](https://github.com/microsoft/playwright/issues/11141)
- [Playwright GitHub Issue #29273: Per-Project webServer Config](https://github.com/microsoft/playwright/issues/29273)
- [Turborepo: Playwright Guide](https://turborepo.com/docs/guides/tools/playwright)
- [Playwright Docs: Service Workers](https://playwright.dev/docs/service-workers)
- [Playwright GitHub Issue #19677: PWA Installation Testing](https://github.com/microsoft/playwright/issues/19677)
- [Next.js Docs: Testing with Playwright](https://nextjs.org/docs/pages/guides/testing/playwright)
- [TestDouble: E2E Testing Auth Flows with Playwright and Next.js](https://testdouble.com/insights/how-to-test-auth-flows-with-playwright-and-next-js)
- [Kyrre Gjerstad: E2E Testing Setup - Monorepo vs Standard](https://www.kyrre.dev/blog/end-to-end-testing-setup)
