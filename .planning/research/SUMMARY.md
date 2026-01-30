# Project Research Summary

**Project:** GUDBRO v1.2 - E2E Smoke Testing Ecosystem
**Domain:** E2E testing infrastructure for 8 PWA verticals in Next.js monorepo
**Researched:** 2026-01-30
**Confidence:** HIGH

## Executive Summary

The research reveals a well-defined path for adding E2E smoke tests to GUDBRO's 8 PWA verticals using the existing Playwright infrastructure. The key insight is that this is fundamentally a **smoke testing ecosystem**, not a comprehensive E2E testing suite - a critical distinction that determines scope, architecture, and success criteria. With 7 mock-data verticals and 1 backend-connected app (accommodations), the project requires a two-tier testing strategy: structural assertions for mock apps ("does it render and navigate?") versus behavioral testing for the real backend.

The recommended approach extends the existing root-level `playwright.config.ts` with per-vertical projects rather than creating separate packages. This preserves the working 35-test suite for coffeeshop/waiter/backoffice while adding 8 new smoke projects. Playwright 1.57 already provides all needed capabilities - no new dependencies required. The critical architectural decision is to avoid starting all 8 dev servers simultaneously (2-3GB RAM, port conflicts) by using CI matrix strategy where each vertical tests in its own job.

The primary risks are scope creep (building comprehensive E2E instead of smoke tests), port conflict hell from multiple Next.js apps, and treating mock-data verticals as if they have backends. Mitigation: cap at 3-5 tests per vertical (24-40 total), use per-vertical projects with isolated webServer configs, and enforce structural assertions for the 7 mock apps. The project is well-positioned for success given the existing Playwright setup, clear vertical boundaries, and well-documented testing patterns.

## Key Findings

### Recommended Stack

Research confirms that **zero new dependencies are needed**. Playwright 1.57 (already installed) provides all required capabilities including multi-project configuration, built-in visual regression via `toHaveScreenshot()`, device emulation presets, and CI integration. The v1.57 release switched to Chrome for Testing builds, improving headless execution reliability - a fortunate timing for this project.

**Core technologies:**

- **Playwright @playwright/test ^1.57.0** - Already installed, provides E2E runner, visual regression, mobile emulation, parallel execution
- **GitHub Actions** - Already in use, first-class Playwright support with official Docker images
- **pnpm workspace** - Already configured, enables per-vertical test filtering

**What NOT to add:**

- Commercial visual testing services (Applitools, Percy) - $199-500/month, unnecessary for same-stack verticals with shared design system
- Separate test frameworks (Cypress, Storybook visual tests) - would fragment tooling, existing Playwright setup is sufficient
- Performance testing (Lighthouse integration) - separate concern, defer to separate milestone
- Accessibility testing (@axe-core/playwright) - valuable but separate scope, add as Phase 3 or later

**Critical decision:** Use Playwright's built-in `toHaveScreenshot()` with pixel threshold (0.5% diff) rather than commercial services. Revisit only if false positive rate exceeds 10% of test runs.

### Expected Features

Research identified 13 feature categories with clear prioritization. The distinction between "table stakes" (what smoke tests must have) and "differentiators" (quality enhancers) is critical for scope control.

**Must have (table stakes):**

- **Page load smoke tests** - All pages render without JS errors, visible content loads (one test per page per vertical)
- **Navigation flow testing** - BottomNav works, back button, deep links (shared component across all 8 PWAs)
- **Responsive viewport testing** - Mobile (Pixel 5) + Desktop (Chrome) viewports (PWAs are mobile-first, QR access)
- **Tag-based organization** - @smoke, @vertical:name tags for selective CI runs (enables fast feedback)
- **Visual content assertions** - Critical headings present, images load, DM Sans font loads (catches broken assets)
- **HTTP status checks** - API routes return 200 for accommodations only (the one backend-connected vertical)

**Should have (competitive):**

- **Visual regression screenshots** - Per-vertical baselines, mobile + desktop, catches CSS regressions (built-in `toHaveScreenshot()`)
- **Shared fixture architecture** - Custom `test.extend()` with vertical config, reusable page objects (DRY, maintainability)
- **PWA manifest validation** - Fetch manifest.json, validate required fields, check icon paths (installability requirement)
- **Cross-vertical consistency checks** - Same font, theme variables work, shared components render identically (brand consistency)

**Defer (v2+):**

- **Accessibility smoke tests** - axe-core integration, keyboard nav (valuable but separate milestone)
- **Performance budgets** - Page load timing, CLS checks, bundle size monitoring (separate concern)
- **Real-time/WebSocket testing** - Already covered by existing `full-lunch-flow.spec.ts` for coffeeshop
- **Cross-browser testing** - Safari WebKit, Firefox (diminishing returns for smoke, reserve for release gates)

**Anti-features (explicitly avoid):**

- Unit-level logic in E2E (use Vitest instead)
- Full Supabase database integration (mock at API boundary)
- Service worker offline testing (Playwright SW support limited, open issue #26875)
- Push notification flows (requires OS interaction, fragile)
- Real payment processing (security risk, use mocks)
- Testing every page state variation (combinatorial explosion, unit test edge cases)

**MVP Recommendation:** Phases 1-2 features (foundation + confidence) deliver 90% of value. Phase 3 (quality enhancers) can be added incrementally based on observed failure patterns.

### Architecture Approach

Research strongly recommends **extending the existing root-level Playwright config** with per-vertical projects rather than creating separate Playwright packages per app. This decision preserves backward compatibility with the existing 35 F&B tests while enabling selective execution and parallel CI jobs.

The architecture leverages Playwright's native `projects` feature to map verticals to ports and test files. Each project declares its `baseURL`, `testMatch` pattern, and device profile. The existing `webServer` array remains for coffeeshop/waiter/backoffice; new verticals use `SKIP_WEBSERVER=1` and manage server lifecycle externally via CI scripts.

**Major components:**

1. **Playwright Config with Per-Vertical Projects** - 16 projects total: 8 x (mobile + desktop), plus existing projects (chromium, multi-system, waiter-pwa, backoffice). Each project isolated: own baseURL, testMatch, device profile.

2. **Shared Test Infrastructure (`tests/e2e/shared/`)** - Custom fixture extending base test with PWA helpers, base page object modeling common elements (header, footer nav, language switcher), assertion helpers for responsive/a11y checks. Enables DRY across 8 verticals.

3. **Per-Vertical Smoke Tests (`tests/e2e/smoke/`)** - One file per vertical (`coffeeshop.smoke.spec.ts`, `wellness.smoke.spec.ts`, etc.). Each file: 3-5 tests max, structural assertions (not content-specific), uses shared fixtures and page objects.

4. **CI Matrix Strategy** - GitHub Actions matrix with 8 parallel jobs (one per vertical). Each job: builds only its vertical, starts only its server, runs only its smoke tests. `fail-fast: false` ensures all verticals test even if one fails.

**Critical architectural decision:** Do NOT start all 8 dev servers simultaneously. Each Next.js dev server consumes 200-400MB RAM; 8 servers = 2-3GB plus port conflicts. Solution: CI matrix runs one vertical per job (each starts only its server), locally use `reuseExistingServer: true` to test against running dev server.

**Directory structure preserves existing tests:**

```
tests/e2e/
  ├── smoke/                    # NEW: per-vertical smoke tests
  ├── shared/                   # NEW: fixtures, page objects, helpers
  ├── fixtures/                 # EXISTING: F&B mock data (untouched)
  ├── utils/                    # EXISTING: multi-system helper (untouched)
  ├── scenarios/                # EXISTING: full-lunch-flow (untouched)
  ├── backoffice/               # EXISTING: admin tests (untouched)
  └── waiter/                   # EXISTING: waiter tests (untouched)
```

**Execution strategy:**

- Local: `pnpm test:e2e --project=smoke-wellness` (single vertical)
- Local: `pnpm test:e2e --project="smoke-*"` (all smoke tests, pre-commit)
- CI: Matrix strategy, each vertical in parallel job, 5-8 minutes total
- Backward compat: `pnpm test:e2e` still runs existing tests

### Critical Pitfalls

Research identified 13 pitfalls ranging from critical (cause rewrites) to minor (annoyance). The top 5 below represent the highest risk areas based on similar monorepo E2E projects.

1. **Over-Testing with E2E Instead of Smoke Tests** - Teams write comprehensive E2E suites covering every flow, edge case, error state. Suite grows to 200+ tests, takes 30-60 minutes, developers stop waiting, tests ignored. **Prevention:** Define "smoke" strictly (page loads, navigation, one critical flow). Cap at 3-5 tests per vertical (24-40 total). Name files `*.smoke.spec.ts` to enforce separation. Track test count; if any vertical exceeds 8, review scope. Address in Phase 1.

2. **Port Conflict Hell with 8 Apps** - Multiple Next.js apps compete for ports. Tests fail intermittently with EADDRINUSE. Current config already has 3 hardcoded ports; adding 5+ more multiplies the problem. **Prevention:** Do NOT start all 8 apps simultaneously. Use per-vertical projects with isolated webServer configs. Test sequentially or in small groups. In CI, matrix strategy starts one server per job. Add port-cleanup before tests. Consider production builds (`next build && next start`) instead of dev servers. Address in Phase 1 config architecture.

3. **Testing Mock-Data Apps as if They Have Backends** - Writing tests that assert specific data values for the 7 mock verticals. When mock data changes (which it will), every test breaks. Teams add fixture data duplicating mock layer, creating maintenance nightmare. **Prevention:** For mock verticals, test structure not content (assert "menu has items" not "menu has Cappuccino at EUR 3.50"). Use structural assertions: `toHaveCount.greaterThan(0)`. For accommodations (real backend), use proper test data seeding. Document two-tier strategy explicitly. Address in Phase 1 strategy.

4. **Shared State Between Vertical Tests** - Tests share browser context, localStorage, cookies, service worker registrations. Language preference from coffeeshop leaks into wellness tests. Tests pass individually, fail in suite. **Prevention:** Fresh browser context per test file (Playwright default, verify no shared storageState). Never share storageState across verticals. Set `serviceWorkers: 'block'` unless explicitly testing PWA offline. Use `test.describe.configure({ mode: 'serial' })` only within one vertical, never across. Address in Phase 1 isolation setup.

5. **Starting Dev Servers Instead of Production Builds** - Using `next dev` (as current config does) results in slow startup, hot-reload interference, inconsistent behavior vs production. Dev compiles pages on-demand, causing first-navigation timeouts. **Prevention:** For CI, use `next build && next start`. For local, keep `reuseExistingServer: true` for dev workflow. Pre-build only tested verticals, not all 8. Cache `.next` artifacts in CI. Address in Phase 2 CI optimization.

**Moderate pitfalls:**

- No test tagging = all verticals test on every PR (add @vertical:name tags, selective CI)
- Brittle CSS selectors in UI without data-testid (budget time to add testid, prefer getByRole)
- Accommodations auth complexity ignored (use storageState + API auth, dedicated test user)
- CI resource exhaustion from parallel Next.js builds (build sequentially `--concurrency=1`, cache)

**Minor pitfalls:**

- Screenshot/video artifacts filling CI storage (set `video: 'off'` for smoke, 7-day retention)
- Forgetting mobile viewports (use existing Mobile Chrome project for key tests)
- Not handling i18n/RTL (add one RTL test per vertical in Phase 3)

## Implications for Roadmap

Based on research, suggested phase structure balances foundation-building, validation of patterns, and incremental scaling:

### Phase 1: Test Infrastructure Foundation

**Rationale:** Everything depends on the shared test utilities and config architecture. Build and validate the pattern with one vertical before scaling to 8. Addresses the highest-risk architectural pitfalls (port conflicts, isolation, scope definition) upfront.

**Delivers:**

- `playwright.config.ts` extended with per-vertical projects pattern
- Shared test infrastructure (`pwa-smoke.fixture.ts`, `base-pwa.page.ts`, viewport helpers)
- First vertical smoke test (coffeeshop) validating the pattern
- Test strategy doc explicitly defining smoke vs E2E, mock vs backend testing

**Addresses from FEATURES.md:**

- Shared fixture architecture (foundational for all other features)
- Tag-based organization (enables all selective execution)

**Avoids from PITFALLS.md:**

- Pitfall 1 (over-testing) - explicit scope definition in strategy doc
- Pitfall 2 (port conflicts) - per-vertical projects with isolated configs
- Pitfall 4 (shared state) - fresh context per vertical, serviceWorkers: 'block'

**Success criteria:**

- Coffeeshop has 3-5 smoke tests passing locally
- Tests can run individually and in suite without state leakage
- Shared fixture used successfully by all coffeeshop tests
- Zero new npm dependencies added

### Phase 2: Scale to All Verticals

**Rationale:** With the pattern validated in Phase 1, replicating to the remaining 7 verticals is mechanical. Group the 7 mock-data verticals together (wellness, tours, gym, laundry, pharmacy, workshops, accommodations frontend) since they share testing strategy. Address CI integration while scaling to catch performance issues early.

**Delivers:**

- Smoke tests for all 8 verticals (24-40 tests total)
- CI matrix strategy with parallel vertical jobs
- Production builds in CI (`next build && next start`)
- Selective test execution via --project flag

**Addresses from FEATURES.md:**

- Page load smoke tests (all verticals)
- Navigation flow testing (shared BottomNav component)
- Responsive viewport testing (mobile + desktop per vertical)
- Visual content assertions (headings, images, font)

**Avoids from PITFALLS.md:**

- Pitfall 3 (mock-data coupling) - structural assertions enforced across 7 verticals
- Pitfall 5 (slow dev servers) - production builds in CI
- Pitfall 6 (no selective running) - matrix strategy, --project flags
- Pitfall 9 (CI OOM) - build sequentially, cache .next, only build tested verticals

**Uses from STACK.md:**

- Playwright device emulation (Pixel 5, Desktop Chrome)
- CI matrix pattern from GitHub Actions
- pnpm workspace filtering

**Success criteria:**

- All 8 verticals have 3-5 passing smoke tests
- CI completes all verticals in under 8 minutes
- Matrix strategy: individual vertical failures don't block others
- Zero port conflicts in CI or local runs

### Phase 3: Quality Enhancements

**Rationale:** With structural smoke tests working across all verticals, add quality enhancements that catch regressions the basic tests miss. Visual regression catches CSS changes, PWA manifest validation ensures installability, accommodations backend tests validate the one real API surface.

**Delivers:**

- Visual regression screenshots (per-vertical baselines, mobile + desktop)
- PWA manifest validation for all 8 verticals
- Accommodations backend API smoke tests (6 routes + JWT auth)
- Cross-vertical consistency checks (font, theme, shared components)

**Addresses from FEATURES.md:**

- Visual regression testing (differentiator, catches CSS regressions)
- PWA manifest validation (installability requirement)
- HTTP status checks for accommodations (backend-connected vertical)
- Cross-vertical consistency (brand compliance)

**Avoids from PITFALLS.md:**

- Pitfall 7 (brittle selectors) - budget testid additions with visual tests
- Pitfall 8 (accommodations complexity) - separate strategy, storageState pattern

**Implements from ARCHITECTURE.md:**

- Visual config with pixel threshold, masking
- Accommodations-specific page objects (if needed beyond BasePwaPage)
- API-level auth for accommodations tests

**Success criteria:**

- Visual baselines committed for all 8 verticals (80 screenshots ~10MB)
- Visual tests have <5% false positive rate
- Accommodations tests cover all 6 API routes + auth flow
- Manifest validation catches missing required fields

### Phase 4 (Optional): Advanced Coverage

**Rationale:** Only pursue if Phase 3 reveals gaps or if product requires higher confidence. These are valuable but not essential for smoke testing.

**Delivers:**

- Accessibility smoke tests (axe-core integration, keyboard nav)
- i18n/RTL testing (one RTL language per vertical)
- Performance budgets (page load timing, CLS thresholds)

**Deferred to separate milestones:**

- Full E2E user flows (existing `full-lunch-flow.spec.ts` pattern)
- Real-time/WebSocket testing (already partially covered)
- Cross-browser testing (Safari, Firefox - reserve for release gates)

### Phase Ordering Rationale

1. **Foundation before scale** - Building shared infrastructure and validating with one vertical (Phase 1) prevents multiplying mistakes across 8 verticals. The architectural decisions (per-vertical projects, shared fixtures, isolation strategy) must be proven before replication.

2. **Mock verticals grouped together** - The 7 mock-data verticals (wellness, tours, gym, laundry, pharmacy, workshops, basic accommodations UI) share testing strategy (structural assertions, no backend). Grouping in Phase 2 enables consistent pattern application. Accommodations backend testing separated to Phase 3 due to auth complexity.

3. **CI integration during scale** - Waiting until Phase 2 to add CI avoids premature optimization. The matrix strategy, build caching, and production-build pattern are validated with 8 verticals, not tuned for one. CI feedback during scale-out catches resource issues (OOM, timeouts) when they matter.

4. **Quality enhancements after smoke coverage** - Visual regression and manifest validation (Phase 3) require the basic smoke tests to be stable. Adding visual tests while still debugging port conflicts or state leakage creates noise. Baselines must be committed after smoke tests are passing reliably.

5. **Avoids common pitfall progression** - This ordering directly addresses the pitfall analysis: Phase 1 prevents over-scoping and config mistakes, Phase 2 enforces mock-vs-backend distinction during scale, Phase 3 adds complexity only after foundation proves solid.

### Research Flags

**Phases needing deeper research during planning:**

- **Phase 3 (Accommodations backend)** - JWT auth testing with storageState, Supabase test user setup, API data seeding/cleanup patterns. Current research covers strategy but not Supabase-specific implementation details.
- **Phase 4 (i18n/RTL)** - Best practices for testing RTL layouts, which locales to test, handling translation loading in tests. Minor concern, well-documented patterns exist.

**Phases with standard patterns (skip research-phase):**

- **Phase 1 (Foundation)** - Playwright fixtures and page objects are well-documented, existing codebase already uses Playwright. Implementation is straightforward extension.
- **Phase 2 (Scale)** - Replication of Phase 1 pattern is mechanical. CI matrix strategy is standard GitHub Actions pattern with official Playwright examples.
- **Phase 3 (Visual regression)** - `toHaveScreenshot()` is built-in Playwright feature with extensive documentation. Baseline management patterns are well-established.

## Confidence Assessment

| Area         | Confidence | Notes                                                                                                                                                                                                          |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH       | Playwright 1.57 already installed, zero new dependencies needed. Official docs for all features. Existing config provides working foundation.                                                                  |
| Features     | HIGH       | Clear distinction between smoke (3-5 per vertical) and E2E (separate milestone). MVP features all have documented Playwright patterns. Anti-features list prevents scope creep.                                |
| Architecture | HIGH       | Per-vertical projects pattern verified in Playwright docs and community examples. Existing 35-test suite provides working model. Directory structure preserves backward compatibility.                         |
| Pitfalls     | HIGH       | Pitfalls sourced from 10+ real-world monorepo E2E articles, Playwright GitHub issues, and BrowserStack/Semaphore best practices. Top 5 pitfalls directly address the most common failures in similar projects. |

**Overall confidence:** HIGH

All four research dimensions converge on a consistent approach: extend existing Playwright setup with per-vertical projects, cap at 3-5 smoke tests per vertical, use shared test infrastructure for DRY, apply two-tier strategy for mock vs backend verticals. No conflicts or contradictions across research files. The project benefits from existing Playwright infrastructure (35 working tests, configured webServer, retries, screenshots) - this is enhancement not greenfield.

### Gaps to Address

**Minor gaps requiring validation during implementation:**

1. **Exact port numbers for Tours and Accommodations** - STACK.md shows "TBD" for these two verticals. Resolution: Check package.json scripts or .env.local in each app's directory during Phase 2. Low impact: worst case is updating a port number in config.

2. **Service worker strategy for PWA offline testing** - FEATURES.md identifies service worker testing as anti-feature due to Playwright limitations (open issue #26875), but PWAs by definition have service workers. Resolution: Set `serviceWorkers: 'block'` in test config to prevent interference with smoke tests. If offline functionality needs testing later, use Lighthouse in separate workflow. Address during Phase 1 config setup.

3. **Screenshot baseline platform consistency** - PITFALLS.md warns about font rendering differences macOS vs Linux CI. Resolution: Generate all baselines in CI environment (GitHub Actions Ubuntu runner), not locally on macOS. Use `threshold: 0.2` and `maxDiffPixelRatio: 0.005` to allow minor rendering differences. Address during Phase 3 visual regression setup.

4. **Accommodations Supabase test user credentials** - Phase 3 requires dedicated test user with known data. Resolution: Create test user during Phase 3 planning, document in test README, store credentials in GitHub Secrets for CI. Use `storageState` to save authenticated session and reuse. Medium priority: accommodations is Phase 3, can be resolved when planned.

5. **Baseline storage git size** - 80 screenshots at ~100KB each = ~8MB committed to git. Research says acceptable but worth monitoring. Resolution: If baseline size exceeds 20MB, revisit storage strategy (git LFS, artifact storage, reduce screenshot dimensions). Track during Phase 3.

## Sources

### Primary (HIGH confidence)

- **Playwright Official Documentation** - Test projects, visual comparisons, emulation, fixtures, best practices
  - [Test Projects](https://playwright.dev/docs/test-projects)
  - [Visual Comparisons](https://playwright.dev/docs/test-snapshots)
  - [Emulation](https://playwright.dev/docs/emulation)
  - [Fixtures](https://playwright.dev/docs/test-fixtures)
  - [Test Parallelism](https://playwright.dev/docs/test-parallel)
  - [Best Practices](https://playwright.dev/docs/best-practices)
  - [Service Workers](https://playwright.dev/docs/service-workers)
- **Project Codebase** - Existing `playwright.config.ts`, `tests/e2e/` directory structure, working 35-test suite
- **Playwright Release Notes** - v1.57 changelog, Chrome for Testing migration
- **GitHub Actions** - Matrix strategy documentation, Playwright official actions

### Secondary (MEDIUM confidence)

- **BrowserStack Guides** - Playwright best practices 2026, snapshot testing guide, PWA testing guide
- **Turborepo Documentation** - Playwright monorepo patterns, per-app vs root-level config tradeoffs
- **Community Patterns** - Ash Connolly (Next.js visual regression), Kyrre Gjerstad (monorepo E2E setup), Tim Deschryver (Playwright tagging), Makerkit (SaaS smoke testing), Graphite (monorepo testing strategies)
- **Better Stack/Semaphore** - Avoiding flaky tests, test speed optimization
- **TestDouble** - Auth flow testing with Playwright and Next.js

### Tertiary (LOW confidence)

- **Currents/Endform** - Test speed optimization (commercial services, patterns applicable but service-specific)
- **Playwright GitHub Issues** - Open issues for PWA installation testing (#26875, #19677), webServer config evolution (#11141, #29273)

**Source quality notes:**

- Zero reliance on outdated content (all sources 2024-2026)
- Primary sources (Playwright docs, project codebase) provide 80% of needed information
- Secondary sources used for validation and real-world patterns, not core strategy
- No conflicts between primary and secondary sources
- Tertiary sources used only to identify what NOT to do (commercial services) or document known limitations (GitHub issues)

---

_Research completed: 2026-01-30_
_Ready for roadmap: yes_
_Estimated implementation: 3-4 weeks (Phase 1: 1 week, Phase 2: 1.5 weeks, Phase 3: 1 week, buffer: 0.5 weeks)_
