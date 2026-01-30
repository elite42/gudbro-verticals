# Architecture: E2E Test Infrastructure for 8 PWA Verticals

**Domain:** E2E smoke testing across multi-vertical pnpm monorepo
**Researched:** 2026-01-30
**Confidence:** HIGH (existing codebase examined + Playwright official docs + community patterns)

---

## Current State Assessment

### What Exists Today

The monorepo already has a Playwright setup at the root level:

| Asset                                    | Location  | Purpose                                                                                               |
| ---------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `playwright.config.ts`                   | Repo root | Config with 6 projects (chromium, mobile chrome, mobile safari, multi-system, waiter-pwa, backoffice) |
| `tests/e2e/`                             | Repo root | Test directory with ~5 files                                                                          |
| `tests/e2e/fixtures/mock-data.ts`        | Repo root | F&B-specific mock data (menu items, orders, tables)                                                   |
| `tests/e2e/utils/multi-system-helper.ts` | Repo root | Health checks, scenario runner, event logging                                                         |
| `tests/e2e/scenarios/`                   | Repo root | Multi-system scenarios (e.g., full-lunch-flow)                                                        |
| `tests/e2e/global-setup.ts`              | Repo root | Health check before multi-system tests                                                                |

### Key Observations

1. **F&B-centric:** Current setup is entirely oriented around coffeeshop/waiter/backoffice. Mock data has menus, orders, tables -- none of this applies to wellness, tours, pharmacy, etc.
2. **No vertical awareness:** The Playwright `projects` array defines device/browser combos and system targets (backoffice, waiter), not verticals (coffeeshop, wellness, tours).
3. **Single testDir:** All tests live under `tests/e2e/` with no per-vertical separation.
4. **webServer config** starts only coffeeshop (port 3004), waiter (3005), and backoffice (3023). The other 7 verticals have no dev server configuration.
5. **35 tests mentioned** in milestone context -- these are likely all F&B/coffeeshop related.

### Ports Map (from codebase)

| Vertical       | Port | Has Backend |
| -------------- | ---- | ----------- |
| coffeeshop     | 3004 | Mock data   |
| waiter         | 3005 | Mock data   |
| backoffice     | 3023 | Supabase    |
| wellness       | 3003 | Mock data   |
| laundry        | 3030 | Mock data   |
| pharmacy       | 3031 | Mock data   |
| workshops      | 3032 | Mock data   |
| gym            | 3033 | Mock data   |
| tours          | TBD  | Mock data   |
| accommodations | TBD  | Supabase    |

---

## Recommended Architecture

### Approach: Single Root Config with Per-Vertical Projects

**Decision:** Extend the existing root `playwright.config.ts` with per-vertical projects rather than creating separate Playwright packages per app.

**Rationale:**

- The monorepo already has a working root-level Playwright config. Splitting to per-app packages would break the existing 35 tests.
- Turborepo recommends per-app packages for large teams, but this is a single-developer project where a unified config is simpler.
- Playwright's `projects` feature natively supports running different test sets against different baseURLs, which maps perfectly to "different verticals on different ports."
- Shared utilities (page objects, fixtures, assertions) are easier to share from a single location than across packages.

### Directory Structure

```
tests/
  e2e/
    # --- Existing (keep as-is) ---
    global-setup.ts
    fixtures/
      mock-data.ts              # Existing F&B mock data
    utils/
      multi-system-helper.ts    # Existing multi-system helper
    scenarios/
      full-lunch-flow.spec.ts   # Existing scenario

    # --- New: Per-Vertical Smoke Tests ---
    smoke/
      coffeeshop.smoke.spec.ts
      wellness.smoke.spec.ts
      tours.smoke.spec.ts
      gym.smoke.spec.ts
      laundry.smoke.spec.ts
      pharmacy.smoke.spec.ts
      workshops.smoke.spec.ts
      accommodations.smoke.spec.ts

    # --- New: Shared Test Utilities ---
    shared/
      pwa-smoke.fixture.ts     # Custom fixture: extends base test with PWA helpers
      page-objects/
        base-pwa.page.ts       # Abstract: navigation, header, footer, language
        menu-catalog.page.ts   # Shared: product/service listing pages
        detail.page.ts         # Shared: detail/product pages
        booking.page.ts        # Shared: booking/order flows
      assertions/
        pwa-assertions.ts      # Custom matchers: responsive, a11y, PWA manifest
      helpers/
        viewport.ts            # Mobile/desktop viewport presets
        i18n.ts                # Language switching helpers
        navigation.ts          # Common nav patterns (tabs, back, drawer)

    # --- Existing dirs unchanged ---
    backoffice/                # Existing backoffice tests
    waiter/                    # Existing waiter tests
```

### Why This Structure

1. **`smoke/` directory** -- All smoke tests are co-located. Easy to run all smoke tests at once (`--grep @smoke` or `--project=smoke-*`). Each file tests one vertical.

2. **`shared/` directory** -- Page objects and fixtures are shared across verticals. A wellness PWA and a pharmacy PWA both have "catalog page," "detail page," "navigation" -- the page objects model these commonalities.

3. **Existing directories untouched** -- `fixtures/`, `utils/`, `scenarios/`, `backoffice/`, `waiter/` remain as-is. Zero breakage of existing 35 tests.

---

## Configuration Strategy

### Extended playwright.config.ts

The existing config should be extended (not replaced) with vertical-specific projects:

```typescript
// New projects to ADD to existing projects array:

// Smoke test projects - one per vertical
{
  name: 'smoke-coffeeshop',
  testMatch: /smoke\/coffeeshop\.smoke\.spec\.ts/,
  use: {
    ...devices['Pixel 5'],  // Mobile-first (PWAs)
    baseURL: 'http://localhost:3004',
  },
},
{
  name: 'smoke-wellness',
  testMatch: /smoke\/wellness\.smoke\.spec\.ts/,
  use: {
    ...devices['Pixel 5'],
    baseURL: 'http://localhost:3003',
  },
},
// ... one per vertical

// Smoke ALL verticals (convenience grouping)
{
  name: 'smoke-all',
  testMatch: /smoke\/.*\.smoke\.spec\.ts/,
  use: {
    ...devices['Pixel 5'],
  },
  // Each test file sets its own baseURL via test.use()
},
```

### Per-Test baseURL Override Pattern

For the `smoke-all` project where all smoke tests run, each test file declares its own baseURL:

```typescript
// tests/e2e/smoke/wellness.smoke.spec.ts
import { test, expect } from '../shared/pwa-smoke.fixture';

test.use({ baseURL: 'http://localhost:3003' });

test('wellness PWA loads and shows services', async ({ page }) => {
  // ...
});
```

### webServer Configuration

**Problem:** Starting 8+ dev servers simultaneously is expensive (RAM, CPU, startup time).

**Solution:** Use `SKIP_WEBSERVER=1` in CI and start servers externally, or use a selective approach:

```typescript
// Only start servers for the vertical being tested
const VERTICAL_SERVERS: Record<string, WebServerConfig> = {
  coffeeshop: {
    command: 'pnpm --filter @gudbro/coffeeshop dev',
    url: 'http://localhost:3004',
  },
  wellness: {
    command: 'pnpm --filter @gudbro/wellness dev',
    url: 'http://localhost:3003',
  },
  // ...
};

// Determine which servers to start based on project filter
const requestedVertical = process.env.TEST_VERTICAL; // e.g., "wellness"
```

**Recommendation:** For smoke tests, use `SKIP_WEBSERVER=1` and manage server lifecycle externally (CI script or manual). This is simpler and more reliable than Playwright managing 8 servers.

---

## Execution Strategy

### Local Development

| Command                                                    | What Runs                                     | Use Case             |
| ---------------------------------------------------------- | --------------------------------------------- | -------------------- |
| `pnpm test:e2e`                                            | Existing tests (chromium project, coffeeshop) | Backward compatible  |
| `pnpm test:e2e --project=smoke-wellness`                   | Single vertical smoke                         | Testing one vertical |
| `pnpm test:e2e --project="smoke-*"`                        | All vertical smoke tests                      | Pre-commit check     |
| `MULTI_SYSTEM_TEST=1 pnpm test:e2e --project=multi-system` | Cross-system scenarios                        | Integration testing  |

### CI Pipeline

**Recommended: Matrix strategy with parallel vertical jobs.**

```yaml
# .github/workflows/e2e-smoke.yml
jobs:
  smoke-tests:
    strategy:
      fail-fast: false
      matrix:
        vertical:
          [
            coffeeshop,
            wellness,
            tours,
            gym,
            laundry,
            pharmacy,
            workshops,
            accommodations,
          ]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm --filter @gudbro/${{ matrix.vertical }} build
      - run: pnpm --filter @gudbro/${{ matrix.vertical }} start &
      - run: npx wait-on http://localhost:${{ env.PORT }}
      - run: npx playwright test --project=smoke-${{ matrix.vertical }}
```

**Why matrix over sequential:**

- Each vertical is independent. If wellness fails, tours should still run.
- `fail-fast: false` ensures all verticals get tested even if one breaks.
- GitHub Actions runs matrix jobs in parallel (up to concurrency limit).
- Each job starts only its own dev server, keeping resource usage low.

### Parallel Execution Details

**Within a vertical:** Tests run in parallel (`fullyParallel: true` is already set). A smoke suite for one vertical should have 5-10 tests, all independent.

**Across verticals:** Playwright's `fullyParallel` does NOT mean projects run simultaneously. Per research, Playwright assigns tasks from its internal queue to workers -- it does not guarantee cross-project parallelism. The CI matrix approach above achieves true parallelism at the job level.

**Worker count:**

- Local: Default (half CPU cores). Good enough for smoke tests.
- CI: `workers: 1` is already set in config for CI. For smoke tests this is fine since each vertical has few tests. Could increase to 2-3 if test count grows.

---

## Shared Test Utilities Design

### Custom Fixture: `pwa-smoke.fixture.ts`

This is the core shared infrastructure. It extends Playwright's base `test` with PWA-specific capabilities:

```typescript
// tests/e2e/shared/pwa-smoke.fixture.ts
import { test as base, expect } from '@playwright/test';
import { BasePwaPage } from './page-objects/base-pwa.page';

type PwaSmokeFixtures = {
  pwaPage: BasePwaPage;
};

export const test = base.extend<PwaSmokeFixtures>({
  pwaPage: async ({ page }, use) => {
    const pwaPage = new BasePwaPage(page);
    await use(pwaPage);
  },
});

export { expect };
```

### Base Page Object: `base-pwa.page.ts`

Models what ALL GUDBRO PWAs have in common:

```typescript
// tests/e2e/shared/page-objects/base-pwa.page.ts
export class BasePwaPage {
  constructor(private page: Page) {}

  // Navigation
  async navigate(path = '/') { ... }
  async getTitle(): Promise<string> { ... }

  // Common PWA elements
  async hasHeader(): Promise<boolean> { ... }
  async hasFooterNav(): Promise<boolean> { ... }
  async hasLanguageSwitcher(): Promise<boolean> { ... }

  // Responsive checks
  async isResponsive(): Promise<boolean> { ... }

  // Basic health
  async hasNoConsoleErrors(): Promise<boolean> { ... }
  async hasNoA11yViolations(): Promise<boolean> { ... }
}
```

### Vertical-Specific Page Objects (only where needed)

Most smoke tests will NOT need vertical-specific page objects. A smoke test checks "does it load, render, navigate?" -- generic enough for `BasePwaPage`. As tests grow beyond smoke, add:

```
shared/page-objects/
  catalog.page.ts        # Shared: listing pages (menus, services, products)
  detail.page.ts         # Shared: item detail pages
  search.page.ts         # Shared: search functionality
  booking-flow.page.ts   # Shared: booking/order creation
```

---

## Integration Points with Existing Setup

### Files to MODIFY

| File                   | Change                                                              | Risk                                              |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| `playwright.config.ts` | Add smoke-\* projects to `projects` array                           | LOW -- additive only, existing projects unchanged |
| `package.json`         | Add convenience scripts (`test:smoke`, `test:smoke:wellness`, etc.) | LOW -- additive                                   |

### Files to CREATE

| File                                             | Purpose                                     |
| ------------------------------------------------ | ------------------------------------------- |
| `tests/e2e/smoke/*.smoke.spec.ts` (x8)           | Per-vertical smoke test files               |
| `tests/e2e/shared/pwa-smoke.fixture.ts`          | Custom fixture extending base test          |
| `tests/e2e/shared/page-objects/base-pwa.page.ts` | Base page object for all PWAs               |
| `tests/e2e/shared/assertions/pwa-assertions.ts`  | Custom expect matchers                      |
| `tests/e2e/shared/helpers/viewport.ts`           | Viewport presets                            |
| `tests/e2e/shared/helpers/navigation.ts`         | Common navigation helpers                   |
| `.github/workflows/e2e-smoke.yml`                | CI workflow for smoke tests (if CI desired) |

### Files NOT Modified

| File                                     | Why                                                         |
| ---------------------------------------- | ----------------------------------------------------------- |
| `tests/e2e/fixtures/mock-data.ts`        | F&B-specific, not relevant to smoke tests                   |
| `tests/e2e/utils/multi-system-helper.ts` | Multi-system coordination, orthogonal to per-vertical smoke |
| `tests/e2e/global-setup.ts`              | Only used for multi-system mode                             |
| `tests/e2e/scenarios/*`                  | Existing F&B scenarios, untouched                           |

---

## Suggested Build Order

Phases ordered by dependency and value delivered:

### Phase 1: Shared Foundation (build first)

- `tests/e2e/shared/pwa-smoke.fixture.ts`
- `tests/e2e/shared/page-objects/base-pwa.page.ts`
- `tests/e2e/shared/helpers/viewport.ts`

**Rationale:** Everything depends on the shared fixture and base page object. Build and test these with one vertical before scaling.

### Phase 2: First Vertical Smoke (validate pattern)

- `tests/e2e/smoke/coffeeshop.smoke.spec.ts`
- Update `playwright.config.ts` with `smoke-coffeeshop` project

**Rationale:** Coffeeshop is the most mature PWA with existing dev server scripts. Validate the smoke test pattern here before replicating.

### Phase 3: Remaining Verticals (scale pattern)

- `tests/e2e/smoke/*.smoke.spec.ts` for remaining 7 verticals
- Add all `smoke-*` projects to config

**Rationale:** Once the pattern works for coffeeshop, replicating to other verticals is mechanical.

### Phase 4: CI Integration (optional, after verticals work locally)

- `.github/workflows/e2e-smoke.yml`
- Add `test:smoke` scripts to `package.json`

**Rationale:** CI is valuable but not blocking. Local smoke tests provide value immediately.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Separate Playwright Package Per App

**What:** Creating `apps/wellness/e2e/playwright.config.ts`, `apps/tours/e2e/playwright.config.ts`, etc.
**Why bad:** For a single-developer project with 8 similar PWAs, this creates massive duplication. Shared utilities become hard to share. Divergent configs drift over time.
**Instead:** Single root config with projects. Shared utilities in `tests/e2e/shared/`.

### Anti-Pattern 2: Starting All Dev Servers Simultaneously

**What:** Configuring `webServer` to start 8+ Next.js dev servers.
**Why bad:** Each Next.js dev server consumes ~200-400MB RAM. 8 servers = 2-3GB just for test servers. Startup time: 30-60 seconds each.
**Instead:** Use `SKIP_WEBSERVER=1` and start only the server you need. In CI, matrix strategy starts one server per job.

### Anti-Pattern 3: Sharing F&B Mock Data Across Verticals

**What:** Extending `mock-data.ts` with wellness services, tour packages, pharmacy products.
**Why bad:** The existing mock data models restaurants (tables, menus, orders). Wellness models services and appointments. These are fundamentally different domains.
**Instead:** Smoke tests should not need domain-specific mock data. They test "does the page load and render?" not "can I order a pizza." If needed later, create per-vertical fixture files.

### Anti-Pattern 4: Testing Backend Logic in E2E Smoke

**What:** Writing smoke tests that require Supabase connections, database seeding, or API mocking.
**Why bad:** 7 of 8 verticals use mock data -- no backend to test. Smoke tests should validate UI rendering, navigation, and basic interactivity, not backend integration.
**Instead:** Keep smoke tests frontend-only. Add backend integration tests separately for accommodations (the one vertical with real backend).

### Anti-Pattern 5: One Giant Smoke Test File

**What:** `all-verticals.smoke.spec.ts` with 80 tests covering all verticals.
**Why bad:** Cannot run individual verticals. One failure blocks all. No parallelism benefit.
**Instead:** One file per vertical. Each can run independently.

---

## Scalability Considerations

| Concern               | At 8 verticals (now)                         | At 15+ verticals (future)                                                          |
| --------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------- |
| Config complexity     | Simple: 8 projects in one config             | Manageable: generate projects programmatically from a verticals array              |
| Test execution time   | Fast: ~5-10 tests per vertical, seconds each | Consider sharding: `--shard=N/M` for CI                                            |
| Shared page objects   | `BasePwaPage` covers most cases              | May need category-specific base classes (e.g., `CatalogPwaPage`, `BookingPwaPage`) |
| Dev server management | Manual or CI matrix                          | Consider a `start-vertical.sh` script that maps vertical name to port              |
| Flakiness             | Low risk with mock data                      | Add retry config and screenshot-on-failure (already in base config)                |

---

## Sources

- [Playwright Projects documentation](https://playwright.dev/docs/test-projects) -- project configuration, testMatch patterns
- [Playwright Parallelism](https://playwright.dev/docs/test-parallel) -- how workers and parallel execution actually work
- [Playwright Best Practices](https://playwright.dev/docs/best-practices) -- fixtures over beforeEach, POM pattern
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures) -- custom fixture extension pattern
- [Turborepo Playwright guide](https://turborepo.com/docs/guides/tools/playwright) -- monorepo-specific recommendations
- [Why Playwright projects don't run in parallel](https://pratik01.medium.com/why-arent-my-playwright-projects-running-in-parallel-4c767446d54b) -- fullyParallel misconception
- [Monorepo E2E setup guide](https://www.kyrre.dev/blog/end-to-end-testing-setup) -- root-level vs per-app config tradeoffs
- Existing codebase: `playwright.config.ts`, `tests/e2e/` directory (examined directly)
