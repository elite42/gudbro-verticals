# Phase 10: E2E Test Infrastructure - Research

**Researched:** 2026-01-30
**Domain:** Playwright E2E testing, multi-vertical PWA smoke tests
**Confidence:** HIGH

## Summary

This phase extends the existing Playwright config and test infrastructure to support per-vertical smoke testing across all 8 PWA verticals. The codebase already has Playwright 1.58.0 installed with a config covering coffeeshop/waiter/backoffice (3 legacy projects + multi-system + waiter-pwa + backoffice projects). The existing test directory at `tests/e2e/` has mock data, multi-system helpers, and a full-lunch-flow scenario -- all F&B-focused.

The task is to: (1) add per-vertical projects to `playwright.config.ts` with correct baseURL and viewport configs, (2) create shared fixtures (`BasePwaPage`, viewport helpers, vertical registry) in `tests/e2e/shared/`, and (3) validate the pattern with at least one vertical's smoke test passing. All 35 existing tests must remain unmodified and passing.

**Primary recommendation:** Use Playwright's `test.extend()` fixture pattern with a `BasePwaPage` class that encapsulates common PWA smoke checks (page loads, nav visible, no console errors, mobile viewport correct). Define a vertical registry mapping each vertical to its port, name, routes, and package filter. Add projects per vertical (mobile + desktop) using `testMatch` to isolate vertical tests from legacy tests.

## Standard Stack

### Core

| Library          | Version | Purpose               | Why Standard                     |
| ---------------- | ------- | --------------------- | -------------------------------- |
| @playwright/test | 1.58.0  | E2E testing framework | Already installed, actively used |

### Supporting

| Library            | Version    | Purpose                         | When to Use                    |
| ------------------ | ---------- | ------------------------------- | ------------------------------ |
| Playwright devices | (built-in) | Mobile/desktop viewport presets | Device emulation for PWA tests |

### Alternatives Considered

| Instead of                         | Could Use                    | Tradeoff                                                                                      |
| ---------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------- |
| Custom viewport sizes              | Playwright `devices` presets | Presets are more realistic and maintained; use Pixel 5 for mobile, Desktop Chrome for desktop |
| Separate config files per vertical | Single config with projects  | Single config is simpler to maintain, Playwright projects handle isolation                    |

**Installation:** No new packages needed. Playwright 1.58.0 is already installed.

## Architecture Patterns

### Recommended Project Structure

```
tests/e2e/
├── shared/                        # NEW: shared fixtures & utilities
│   ├── base-pwa-page.ts           # BasePwaPage class (Page Object)
│   ├── fixtures.ts                # test.extend() with shared fixtures
│   ├── vertical-registry.ts       # Vertical config registry (ports, routes, names)
│   └── viewport-helpers.ts        # Mobile/desktop viewport utilities
├── verticals/                     # NEW: per-vertical smoke tests
│   ├── coffeeshop.smoke.spec.ts
│   ├── accommodations.smoke.spec.ts
│   ├── tours.smoke.spec.ts
│   ├── wellness.smoke.spec.ts
│   ├── laundry.smoke.spec.ts
│   ├── pharmacy.smoke.spec.ts
│   ├── workshops.smoke.spec.ts
│   └── gym.smoke.spec.ts
├── fixtures/                      # EXISTING: legacy mock data
│   └── mock-data.ts
├── utils/                         # EXISTING: multi-system helpers
│   └── multi-system-helper.ts
├── scenarios/                     # EXISTING: F&B scenarios
│   ├── full-lunch-flow.ts
│   └── full-lunch-flow.spec.ts
├── global-setup.ts                # EXISTING
└── ARCHITECTURE.md                # EXISTING
```

### Pattern 1: Vertical Registry

**What:** A single source of truth mapping vertical names to their config (port, baseURL, routes, pnpm filter name).
**When to use:** Every test and config reference uses this registry instead of hardcoded values.
**Example:**

```typescript
// tests/e2e/shared/vertical-registry.ts
export interface VerticalConfig {
  name: string;
  slug: string;
  port: number;
  baseURL: string;
  pnpmFilter: string;
  routes: {
    home: string;
    [key: string]: string;
  };
}

export const VERTICALS: Record<string, VerticalConfig> = {
  coffeeshop: {
    name: 'Coffeeshop',
    slug: 'coffeeshop',
    port: 3004,
    baseURL: 'http://localhost:3004',
    pnpmFilter: '@gudbro/coffeeshop',
    routes: { home: '/' },
  },
  accommodations: {
    name: 'Accommodations',
    slug: 'accommodations',
    port: 3028,
    baseURL: 'http://localhost:3028',
    pnpmFilter: '@gudbro/accommodations-frontend',
    routes: { home: '/', stay: '/stay' },
  },
  tours: {
    name: 'Tours',
    slug: 'tours',
    port: 3026,
    baseURL: 'http://localhost:3026',
    pnpmFilter: '@gudbro/tours-frontend',
    routes: { home: '/' },
  },
  wellness: {
    name: 'Wellness',
    slug: 'wellness',
    port: 3003,
    baseURL: 'http://localhost:3003',
    pnpmFilter: '@gudbro/wellness-frontend',
    routes: { home: '/', services: '/services', staff: '/staff' },
  },
  laundry: {
    name: 'Laundry',
    slug: 'laundry',
    port: 3030,
    baseURL: 'http://localhost:3030',
    pnpmFilter: '@gudbro/laundry-frontend',
    routes: { home: '/', services: '/services' },
  },
  pharmacy: {
    name: 'Pharmacy',
    slug: 'pharmacy',
    port: 3031,
    baseURL: 'http://localhost:3031',
    pnpmFilter: '@gudbro/pharmacy-frontend',
    routes: { home: '/', products: '/products', search: '/search' },
  },
  workshops: {
    name: 'Workshops',
    slug: 'workshops',
    port: 3032,
    baseURL: 'http://localhost:3032',
    pnpmFilter: '@gudbro/workshops-frontend',
    routes: { home: '/', workshops: '/workshops' },
  },
  gym: {
    name: 'Gym',
    slug: 'gym',
    port: 3033,
    baseURL: 'http://localhost:3033',
    pnpmFilter: '@gudbro/gym-frontend',
    routes: { home: '/', courses: '/courses', passes: '/passes' },
  },
};

export const VERTICAL_SLUGS = Object.keys(VERTICALS) as Array<
  keyof typeof VERTICALS
>;
```

### Pattern 2: BasePwaPage (Page Object Model)

**What:** A base page object class that encapsulates common PWA smoke test operations.
**When to use:** Every vertical smoke test extends or uses this base class.
**Example:**

```typescript
// tests/e2e/shared/base-pwa-page.ts
import { type Page, type Locator, expect } from '@playwright/test';
import { VerticalConfig } from './vertical-registry';

export class BasePwaPage {
  readonly page: Page;
  readonly config: VerticalConfig;

  constructor(page: Page, config: VerticalConfig) {
    this.page = page;
    this.config = config;
  }

  async goto(path?: string) {
    const url = path || this.config.routes.home;
    await this.page.goto(url);
  }

  async expectPageLoads() {
    // Page responds with 200
    const response = await this.page.goto(this.config.routes.home);
    expect(response?.status()).toBe(200);
  }

  async expectNoConsoleErrors() {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await this.page.goto(this.config.routes.home);
    await this.page.waitForLoadState('networkidle');
    // Filter out known benign errors (e.g., favicon 404)
    const realErrors = errors.filter((e) => !e.includes('favicon'));
    expect(realErrors).toHaveLength(0);
  }

  async expectNavigationVisible() {
    // Most PWAs have nav or header
    const nav = this.page.locator('nav, header, [role="navigation"]').first();
    await expect(nav).toBeVisible({ timeout: 10000 });
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(/.+/);
  }
}
```

### Pattern 3: Shared Fixtures via test.extend()

**What:** Export a custom `test` object with pre-wired fixtures for vertical testing.
**When to use:** All vertical smoke tests import from `shared/fixtures.ts` instead of `@playwright/test`.
**Example:**

```typescript
// tests/e2e/shared/fixtures.ts
import { test as base } from '@playwright/test';
import { BasePwaPage } from './base-pwa-page';
import { VERTICALS, VerticalConfig } from './vertical-registry';

type PwaFixtures = {
  verticalConfig: VerticalConfig;
  pwaPage: BasePwaPage;
};

export const test = base.extend<PwaFixtures>({
  verticalConfig: [
    async ({}, use) => {
      // Derived from project name at runtime
      // Project names follow pattern: "vertical-name-mobile" or "vertical-name-desktop"
      throw new Error('verticalConfig must be overridden per project');
    },
    { option: true },
  ],

  pwaPage: async ({ page, verticalConfig }, use) => {
    const pwaPage = new BasePwaPage(page, verticalConfig);
    await use(pwaPage);
  },
});

export { expect } from '@playwright/test';
```

### Pattern 4: Per-Vertical Playwright Projects

**What:** Each vertical gets two projects (mobile + desktop) in `playwright.config.ts` with isolated `testMatch`.
**When to use:** The config file generates projects programmatically from the vertical registry.
**Example:**

```typescript
// In playwright.config.ts, generate vertical projects:
import { VERTICALS } from './tests/e2e/shared/vertical-registry';

const verticalProjects = Object.entries(VERTICALS).flatMap(([slug, config]) => [
  {
    name: `${slug}-mobile`,
    testMatch: /verticals\/.*\.smoke\.spec\.ts/,
    use: {
      ...devices['Pixel 5'],
      baseURL: config.baseURL,
      verticalConfig: config,
    },
  },
  {
    name: `${slug}-desktop`,
    testMatch: /verticals\/.*\.smoke\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: config.baseURL,
      verticalConfig: config,
    },
  },
]);
```

**Important nuance:** Each vertical's smoke spec file will filter itself to only run when the matching project is active, using the `verticalConfig` fixture to check `config.slug` matches the file.

### Anti-Patterns to Avoid

- **Duplicating port/URL values:** Use the vertical registry as single source of truth. The existing `SYSTEM_URLS` in `playwright.config.ts` and `multi-system-helper.ts` must NOT be duplicated -- they cover legacy F&B/waiter/backoffice and remain separate.
- **Modifying existing test files:** Success criterion #4 requires all 35 existing tests pass without modification. New projects must use `testMatch` patterns that don't overlap with existing test file locations.
- **Starting all 8 dev servers for every test run:** Use `SKIP_WEBSERVER` env var or run tests per-project with `--project=wellness-mobile`. The config should NOT add `webServer` entries for all 8 verticals simultaneously.
- **Hardcoding viewport dimensions:** Use Playwright's built-in `devices` presets (Pixel 5 for mobile, Desktop Chrome for desktop) rather than manual width/height.

## Don't Hand-Roll

| Problem                     | Don't Build                       | Use Instead                                       | Why                                             |
| --------------------------- | --------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Device viewport presets     | Custom viewport objects           | `devices['Pixel 5']`, `devices['Desktop Chrome']` | Maintained by Playwright team, realistic values |
| Test isolation per vertical | Custom test runners               | Playwright `projects` with `testMatch`            | Built-in, parallel-ready                        |
| Page object fixtures        | Manual instantiation in each test | `test.extend()` with fixture pattern              | Automatic setup/teardown, composable            |
| Console error collection    | Custom event listeners per test   | BasePwaPage method with page.on('console')        | Encapsulated, reusable                          |

**Key insight:** Playwright's project + fixture system already solves the "run the same smoke tests against different apps" problem. The registry pattern maps verticals to configs; projects wire configs to test runs; fixtures provide page objects.

## Common Pitfalls

### Pitfall 1: testMatch Overlap with Legacy Tests

**What goes wrong:** New vertical projects accidentally match existing test files in `scenarios/` or root `tests/e2e/`.
**Why it happens:** Overly broad `testMatch` patterns like `*.spec.ts`.
**How to avoid:** Use specific patterns: `/verticals\/.*\.smoke\.spec\.ts/` for vertical tests. Existing projects use `/scenarios\/.*\.spec\.ts/` and `/waiter\/.*\.spec\.ts/`.
**Warning signs:** Running `--project=wellness-mobile` also picks up F&B tests.

### Pitfall 2: webServer Configuration Explosion

**What goes wrong:** Trying to start all 8 vertical dev servers + backoffice + waiter + coffeeshop in webServer config. Port conflicts, timeouts, memory issues.
**Why it happens:** Copying the existing multi-system webServer pattern.
**How to avoid:** Do NOT add webServer entries for verticals. Tests assume the developer starts the relevant vertical dev server manually (or via a script). Use `SKIP_WEBSERVER=1` when running vertical tests.
**Warning signs:** `pnpm test:e2e` tries to start 11 dev servers.

### Pitfall 3: Importing Shared Fixtures Breaks Legacy Tests

**What goes wrong:** Modifying the existing test infrastructure (e.g., re-exporting `test` from shared/) causes existing `full-lunch-flow.spec.ts` to break.
**Why it happens:** Legacy tests import directly from `@playwright/test` and expect standard `test` object.
**How to avoid:** Shared fixtures are in `tests/e2e/shared/` and only imported by new `tests/e2e/verticals/` files. Legacy tests in `scenarios/` are untouched.
**Warning signs:** Existing tests fail with fixture-related errors.

### Pitfall 4: Project Name / Config Mismatch

**What goes wrong:** The `verticalConfig` fixture doesn't know which vertical it's running for because project names don't encode the vertical slug.
**Why it happens:** Fixture needs to derive vertical context from somewhere.
**How to avoid:** Two approaches: (a) pass `verticalConfig` as a project `use` option, or (b) have each smoke spec file import its own config from the registry. Approach (b) is simpler -- each `coffeeshop.smoke.spec.ts` imports `VERTICALS.coffeeshop` directly and the project's `baseURL` handles routing.
**Warning signs:** Smoke tests pass for wrong vertical or use wrong port.

### Pitfall 5: Console Error False Positives

**What goes wrong:** Smoke tests fail due to benign console errors (favicon 404, third-party script warnings, Next.js dev warnings).
**Why it happens:** Strict "no console errors" check without allowlist.
**How to avoid:** `BasePwaPage.expectNoConsoleErrors()` should have a configurable allowlist of known-benign patterns (e.g., `favicon.ico`, `next-dev`, `hydration`).
**Warning signs:** Tests fail on dev-only warnings that won't appear in production.

## Code Examples

### Smoke Test for a Single Vertical

```typescript
// tests/e2e/verticals/wellness.smoke.spec.ts
import { test, expect } from '../shared/fixtures';
import { VERTICALS } from '../shared/vertical-registry';

const vertical = VERTICALS.wellness;

test.describe(`${vertical.name} PWA Smoke`, () => {
  test('home page loads successfully', async ({ pwaPage }) => {
    await pwaPage.goto();
    await pwaPage.expectPageLoads();
    await pwaPage.expectTitle();
  });

  test('navigation is visible', async ({ pwaPage }) => {
    await pwaPage.goto();
    await pwaPage.expectNavigationVisible();
  });

  test('no console errors', async ({ pwaPage }) => {
    await pwaPage.expectNoConsoleErrors();
  });

  test('key routes are accessible', async ({ page }) => {
    for (const [name, path] of Object.entries(vertical.routes)) {
      const response = await page.goto(path);
      expect(
        response?.status(),
        `Route ${name} (${path}) should return 200`
      ).toBe(200);
    }
  });
});
```

### Viewport Helpers

```typescript
// tests/e2e/shared/viewport-helpers.ts
import { devices } from '@playwright/test';

export const VIEWPORTS = {
  mobile: devices['Pixel 5'],
  desktop: devices['Desktop Chrome'],
} as const;

export type ViewportName = keyof typeof VIEWPORTS;
```

### Running Specific Vertical Tests

```bash
# Run one vertical, mobile only
SKIP_WEBSERVER=1 pnpm test:e2e --project=wellness-mobile

# Run one vertical, both viewports
SKIP_WEBSERVER=1 pnpm test:e2e --project=wellness-mobile --project=wellness-desktop

# Run all verticals
SKIP_WEBSERVER=1 pnpm test:e2e --grep smoke

# Run legacy tests (unchanged)
pnpm test:e2e --project=chromium
```

## State of the Art

| Old Approach                           | Current Approach                | When Changed     | Impact                                 |
| -------------------------------------- | ------------------------------- | ---------------- | -------------------------------------- |
| Manual POM instantiation in test body  | `test.extend()` fixtures        | Playwright 1.18+ | Cleaner, composable, automatic cleanup |
| One config per project                 | Projects array in single config | Playwright 1.13+ | Single config manages all targets      |
| `mergeTests()` for fixture composition | Available since 1.39+           | Playwright 1.39  | Can combine fixture modules            |

**Deprecated/outdated:**

- `experimentalCT` (component testing): Not relevant here, we do full E2E
- Manual `beforeEach` for page setup: Replaced by fixtures for reusable patterns

## Open Questions

1. **Per-vertical webServer automation**
   - What we know: The existing config supports `SKIP_WEBSERVER` and `MULTI_SYSTEM_TEST` env vars. Adding 8 more webServer entries is impractical.
   - What's unclear: Should we add a helper script that starts just the vertical being tested? Or rely on manual `pnpm dev:*` startup?
   - Recommendation: Keep it manual for now. Add a `scripts/e2e-vertical.sh <vertical>` convenience script as a future enhancement. The config already supports `SKIP_WEBSERVER=1`.

2. **How many smoke checks per vertical**
   - What we know: Phase requires "at least one vertical's smoke test passes."
   - What's unclear: Should all 8 verticals have smoke specs in this phase, or just the infrastructure + one example?
   - Recommendation: Create the infrastructure (registry, fixtures, base page) + one complete example (e.g., wellness or coffeeshop). Leave the other 7 smoke specs as a separate task or do them all if time permits.

3. **Rentals vertical inclusion**
   - What we know: The requirement says "8 verticals." Current frontends: coffeeshop, accommodations, tours, wellness, laundry, pharmacy, workshops, gym = 8. Rentals exists but has a legacy package name (`qr-platform-rentals-frontend`) and minimal routes.
   - What's unclear: Is rentals the 9th or does it replace one of the 8?
   - Recommendation: The 8 verticals are the ones listed above. Rentals can be added later. It has port 3013 if needed.

## Vertical Port Registry (Verified)

| Vertical       | Port | Package Name                    | Key Routes                                   |
| -------------- | ---- | ------------------------------- | -------------------------------------------- |
| coffeeshop     | 3004 | @gudbro/coffeeshop              | /, /about, /cart, /contact                   |
| accommodations | 3028 | @gudbro/accommodations-frontend | /, /stay                                     |
| tours          | 3026 | @gudbro/tours-frontend          | /                                            |
| wellness       | 3003 | @gudbro/wellness-frontend       | /, /services, /staff, /packages, /promotions |
| laundry        | 3030 | @gudbro/laundry-frontend        | /, /services, /promotions, /search           |
| pharmacy       | 3031 | @gudbro/pharmacy-frontend       | /, /products, /search, /info, /promotions    |
| workshops      | 3032 | @gudbro/workshops-frontend      | /, /workshops, /promotions, /search, /about  |
| gym            | 3033 | @gudbro/gym-frontend            | /, /courses, /passes, /info, /promotions     |

## Existing Test Infrastructure (Must Preserve)

| File                                          | Purpose                                                                                  | Tests     |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- | --------- |
| `playwright.config.ts`                        | 6 projects: chromium, Mobile Chrome, Mobile Safari, multi-system, waiter-pwa, backoffice | Config    |
| `tests/e2e/scenarios/full-lunch-flow.spec.ts` | Multi-system F&B flow                                                                    | ~35 tests |
| `tests/e2e/scenarios/full-lunch-flow.ts`      | Scenario runner (non-spec)                                                               | 0         |
| `tests/e2e/utils/multi-system-helper.ts`      | System health, coordination                                                              | Utility   |
| `tests/e2e/fixtures/mock-data.ts`             | F&B mock data                                                                            | Utility   |
| `tests/e2e/global-setup.ts`                   | Multi-system health check                                                                | Setup     |

**Critical:** New vertical projects must use `testMatch: /verticals\/.*\.smoke\.spec\.ts/` to avoid picking up existing tests. Existing projects must NOT be modified.

## Sources

### Primary (HIGH confidence)

- Playwright official docs: Page Object Model pattern (https://playwright.dev/docs/pom)
- Playwright official docs: Test fixtures (https://playwright.dev/docs/test-fixtures)
- Playwright official docs: Projects (https://playwright.dev/docs/test-projects)
- Codebase: `playwright.config.ts` (existing config, 6 projects)
- Codebase: `tests/e2e/` (existing test files, structure)
- Codebase: `apps/*/frontend/package.json` (port numbers, package names)

### Secondary (MEDIUM confidence)

- None needed; all findings verified from official docs + codebase

### Tertiary (LOW confidence)

- None

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Playwright 1.58.0 already installed, official docs verified
- Architecture: HIGH - Patterns derived from official Playwright docs (POM, fixtures, projects)
- Pitfalls: HIGH - Derived from analysis of existing codebase constraints (legacy tests, port assignments)

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (Playwright stable, patterns well-established)
