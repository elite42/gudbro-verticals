# Phase 12: Visual and Quality - Research

**Researched:** 2026-01-30
**Domain:** Playwright visual regression testing, PWA manifest validation, QA documentation
**Confidence:** HIGH

## Summary

This phase adds visual regression baselines, PWA manifest validation tests, and a physical device QA checklist for all 8 verticals. The existing Playwright infrastructure (v1.58.0) already has per-vertical project configuration with mobile and desktop viewports, shared fixtures (`BasePwaPage`, `vertical-registry`), and 8 smoke spec files. This provides a solid foundation to build upon.

The most important discovery is that **5 out of 8 customer-facing verticals are missing `manifest.json` files entirely** (wellness, laundry, pharmacy, workshops, tours, accommodations). Only coffeeshop, gym, and waiter have physical manifest files. All 8 layouts reference `/manifest.json` via `<link>` or Next.js `metadata.manifest`, but the files simply do not exist. This means VISQ-02 (PWA manifest validation) will require creating manifest files for the missing verticals before tests can validate them.

The visual regression approach is straightforward using Playwright's built-in `toHaveScreenshot()`. The main risk is false positives from dynamic content (dates, random images, font loading differences). The mitigation strategy of masking dynamic regions, disabling animations, and using `threshold: 0.2` with `maxDiffPixelRatio: 0.01` is well-established.

**Primary recommendation:** Extend the existing vertical smoke specs with visual screenshot tests and manifest validation tests. Create missing manifest.json files for 5 verticals as a prerequisite.

## Standard Stack

### Core

| Library            | Version | Purpose                            | Why Standard                                         |
| ------------------ | ------- | ---------------------------------- | ---------------------------------------------------- |
| `@playwright/test` | 1.58.0  | Visual regression + manifest tests | Already installed, has built-in `toHaveScreenshot()` |

### Supporting

| Library     | Version | Purpose | When to Use                            |
| ----------- | ------- | ------- | -------------------------------------- |
| None needed | -       | -       | All capabilities built into Playwright |

**No new dependencies required.** Playwright 1.58.0 includes everything needed: `toHaveScreenshot()`, `page.request` for manifest fetching, `page.evaluate()` for assertions.

**Installation:** No installation needed.

## Architecture Patterns

### Recommended Test File Structure

```
tests/e2e/
├── shared/
│   ├── base-pwa-page.ts          # Existing - extend with screenshot helpers
│   ├── fixtures.ts               # Existing - add manifest fixture
│   ├── vertical-registry.ts      # Existing - add secondaryRoute per vertical
│   ├── viewport-helpers.ts       # Existing
│   └── screenshot-helpers.ts     # NEW - shared screenshot stabilization
├── verticals/
│   ├── coffeeshop.smoke.spec.ts  # Existing - add visual + manifest tests
│   ├── wellness.smoke.spec.ts    # Existing - add visual + manifest tests
│   ├── ... (8 files total)
│   └── visual-regression.spec.ts # ALTERNATIVE: single file for all verticals
└── ...
```

### Pattern 1: Per-Vertical Screenshot Tests (Recommended)

**What:** Add `test.describe('Visual Regression')` block inside each existing smoke spec.
**When to use:** Keeps visual tests colocated with their vertical, follows existing pattern.
**Example:**

```typescript
// Inside coffeeshop.smoke.spec.ts
import { test, expect } from '../shared/fixtures';
import { VERTICALS } from '../shared/vertical-registry';

const vertical = VERTICALS.coffeeshop;

test.describe(`${vertical.name} Visual Regression`, () => {
  test('homepage visual baseline - mobile', async ({ page }) => {
    await page.goto(vertical.routes.home);
    await page.waitForLoadState('networkidle');
    // Mask dynamic content
    await expect(page).toHaveScreenshot(`${vertical.slug}-home.png`, {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
      mask: [
        page.locator('[data-testid="dynamic-date"]'),
        page.locator('img[src*="unsplash"]'),
      ],
    });
  });
});
```

### Pattern 2: Data-Driven Visual Tests (Alternative)

**What:** Single spec file iterates over all verticals from registry.
**When to use:** Less duplication, but less per-vertical control over masking.
**Example:**

```typescript
// visual-regression.spec.ts
import { test, expect } from '../shared/fixtures';
import { VERTICALS, VERTICAL_SLUGS } from '../shared/vertical-registry';

for (const slug of VERTICAL_SLUGS) {
  const vertical = VERTICALS[slug];

  test.describe(`${vertical.name} Visual`, () => {
    test('homepage baseline', async ({ page }) => {
      await page.goto(vertical.routes.home);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${slug}-home.png`, {
        maxDiffPixelRatio: 0.01,
        animations: 'disabled',
      });
    });
  });
}
```

### Pattern 3: Manifest Validation via Playwright Request

**What:** Use Playwright's `page.request` or `page.goto` to fetch and validate manifest.json.
**Example:**

```typescript
test('PWA manifest has required fields', async ({ page }) => {
  const response = await page.request.get('/manifest.json');
  expect(response.ok()).toBeTruthy();

  const manifest = await response.json();

  // Required fields
  expect(manifest.name).toBeTruthy();
  expect(manifest.short_name).toBeTruthy();
  expect(manifest.theme_color).toBeTruthy();
  expect(manifest.display).toBeTruthy();
  expect(manifest.start_url).toBeTruthy();

  // Icon validation - must have 192px and 512px
  const icons = manifest.icons || [];
  const has192 = icons.some((i: any) => i.sizes?.includes('192'));
  const has512 = icons.some((i: any) => i.sizes?.includes('512'));
  expect(has192, 'Must have 192px icon').toBeTruthy();
  expect(has512, 'Must have 512px icon').toBeTruthy();
});
```

### Pattern 4: Screenshot Stabilization CSS

**What:** Use `stylePath` to inject CSS that hides dynamic content.
**When to use:** When masking individual locators is fragile or incomplete.
**Example:**

```css
/* tests/e2e/shared/screenshot-stable.css */
/* Hide elements that change between runs */
[data-dynamic],
.timestamp,
.random-image {
  visibility: hidden !important;
}
/* Disable all animations */
*,
*::before,
*::after {
  animation-duration: 0s !important;
  transition-duration: 0s !important;
}
```

```typescript
await expect(page).toHaveScreenshot('home.png', {
  stylePath: path.join(__dirname, '../shared/screenshot-stable.css'),
  animations: 'disabled',
});
```

### Anti-Patterns to Avoid

- **Full-page screenshots for long pages:** Use viewport-only screenshots. Full-page captures are fragile and produce huge files. Scroll-based content changes between runs.
- **Screenshot assertions without `waitForLoadState('networkidle')`:** Images and fonts may not be loaded, causing false failures on every run.
- **Hardcoded viewport sizes in tests:** Use the existing `VIEWPORTS` helper and project config. The Playwright projects already set Pixel 5 (393x851) for mobile and Desktop Chrome (1280x720) for desktop.
- **Testing every route:** Stick to 2 pages per vertical (home + one key internal page). More baselines = more maintenance.

## Don't Hand-Roll

| Problem                 | Don't Build               | Use Instead                   | Why                                                        |
| ----------------------- | ------------------------- | ----------------------------- | ---------------------------------------------------------- |
| Visual comparison       | Custom pixel-diff library | `toHaveScreenshot()` built-in | Handles retries, threshold, reporting, snapshot management |
| Manifest validation     | Manual fetch + JSON parse | `page.request.get()`          | Already available in Playwright, handles cookies/session   |
| Dynamic content masking | Custom element hiding     | `mask` option + `stylePath`   | Built into Playwright, declarative, maintained             |
| Snapshot updates        | Manual file management    | `--update-snapshots` CLI flag | One command updates all baselines                          |

**Key insight:** Playwright's visual comparison is mature and handles the hard parts (retry on first run, platform-aware naming, diff reporting). Custom solutions add complexity with no benefit.

## Common Pitfalls

### Pitfall 1: Snapshot Platform Mismatch

**What goes wrong:** Baselines generated on macOS look different when run on Linux CI. Font rendering, anti-aliasing, and subpixel rendering differ across OS.
**Why it happens:** Playwright snapshots encode the platform in the filename (e.g., `home-chromium-darwin.png`). Running on a different OS generates a new baseline instead of comparing.
**How to avoid:** Either (a) always generate baselines in the same environment as CI, or (b) use generous thresholds (`threshold: 0.2`, `maxDiffPixelRatio: 0.01`). Since this project runs tests locally (no CI pipeline mentioned), option (b) is practical.
**Warning signs:** Tests pass locally but would fail in CI, or vice versa.

### Pitfall 2: Missing Manifest Files for 5 Verticals

**What goes wrong:** Manifest validation tests fail immediately because `manifest.json` does not exist for wellness, laundry, pharmacy, workshops, tours, and accommodations.
**Why it happens:** These verticals reference `/manifest.json` in their layouts but never created the actual file. Next.js does NOT auto-generate `manifest.json` from metadata -- the `metadata.manifest` property only generates the `<link>` tag, not the file itself.
**How to avoid:** Create `manifest.json` files for all 5 missing verticals BEFORE writing manifest validation tests. Use coffeeshop's manifest as a template (it has the most complete structure).
**Warning signs:** 404 responses when fetching `/manifest.json` for wellness, laundry, pharmacy, workshops, tours, accommodations.

### Pitfall 3: Dynamic Content Causing False Positives

**What goes wrong:** Screenshots differ on every run because of: random hero images (Unsplash URLs with random params), dates/times, animated elements, lazy-loaded content not yet visible.
**Why it happens:** PWAs often show dynamic content like "Today's specials" or time-based greetings.
**How to avoid:** (1) Use `animations: 'disabled'`, (2) Use `mask` for known dynamic locators, (3) Create a shared `screenshot-stable.css` that hides timestamps and random images, (4) Wait for `networkidle` before capturing.
**Warning signs:** Visual tests are "flaky" -- they pass sometimes and fail sometimes with no code changes.

### Pitfall 4: Snapshot File Bloat in Git

**What goes wrong:** 32+ PNG screenshots (8 verticals x 2 pages x 2 viewports) added to git, potentially 50-200KB each, bloating the repo.
**Why it happens:** Binary files in git accumulate -- every update doubles storage.
**How to avoid:** (1) Use viewport-only screenshots, not full-page (smaller files), (2) Consider using CSS scale to reduce resolution, (3) Accept the tradeoff -- visual regression baselines SHOULD be committed per Playwright docs. ~32 files at ~100KB each = ~3.2MB, which is acceptable.
**Warning signs:** Git operations become slow, repo clone time increases.

### Pitfall 5: Viewport Mismatch Between Projects and Screenshots

**What goes wrong:** The existing Playwright projects use `devices['Pixel 5']` (393x851) for mobile and `devices['Desktop Chrome']` (1280x720) for desktop. But the CONTEXT.md mentions 375px mobile and 1280px desktop.
**Why it happens:** Pixel 5 has a 393px viewport, not 375px. iPhone SE/13 mini is 375px.
**How to avoid:** Use the existing VIEWPORTS helper (Pixel 5 for mobile, Desktop Chrome for desktop) rather than custom viewport sizes. This matches the existing smoke test infrastructure. The exact width (393 vs 375) matters less than consistency.
**Warning signs:** Screenshots captured at different sizes than smoke tests, causing confusion.

## Code Examples

### Complete Visual Regression Test (per vertical)

```typescript
// Source: Playwright official docs + project conventions
import { test, expect } from '../shared/fixtures';
import { VERTICALS } from '../shared/vertical-registry';
import path from 'path';

const vertical = VERTICALS.coffeeshop;
const SCREENSHOT_CSS = path.join(__dirname, '../shared/screenshot-stable.css');

test.describe(`${vertical.name} Visual Regression`, () => {
  test.beforeEach(async ({ page }) => {
    // Ensure consistent rendering
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('homepage visual baseline', async ({ page }) => {
    await page.goto(vertical.routes.home);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot(`${vertical.slug}-home.png`, {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
      stylePath: SCREENSHOT_CSS,
    });
  });

  test('key page visual baseline', async ({ page }) => {
    // Use the first non-home route as the "key internal page"
    const routes = Object.entries(vertical.routes).filter(
      ([k]) => k !== 'home'
    );
    if (routes.length === 0) {
      test.skip(); // Tours and accommodations only have home
      return;
    }
    const [routeName, routePath] = routes[0];

    await page.goto(routePath);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot(`${vertical.slug}-${routeName}.png`, {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
      stylePath: SCREENSHOT_CSS,
    });
  });
});
```

### Complete PWA Manifest Validation Test

```typescript
// Source: Playwright docs for page.request
test.describe(`${vertical.name} PWA Manifest`, () => {
  test('manifest.json has required fields', async ({ page }) => {
    const response = await page.request.get('/manifest.json');
    expect(response.ok(), 'manifest.json should be accessible').toBeTruthy();

    const manifest = await response.json();

    // Required string fields
    expect(manifest.name, 'name must be non-empty').toBeTruthy();
    expect(manifest.short_name, 'short_name must be non-empty').toBeTruthy();
    expect(manifest.theme_color, 'theme_color must be non-empty').toBeTruthy();
    expect(manifest.display, 'display must be set').toBeTruthy();
    expect(manifest.start_url, 'start_url must be set').toBeTruthy();

    // Icon validation
    const icons: Array<{ sizes?: string }> = manifest.icons || [];
    expect(icons.length, 'must have at least 2 icons').toBeGreaterThanOrEqual(
      2
    );

    const sizes = icons.map((i) => i.sizes || '');
    const has192 = sizes.some((s) => s.includes('192'));
    const has512 = sizes.some((s) => s.includes('512'));
    expect(has192, 'must include 192x192 icon').toBeTruthy();
    expect(has512, 'must include 512x512 icon').toBeTruthy();
  });
});
```

### Minimal manifest.json Template (for missing verticals)

```json
{
  "name": "[Vertical Full Name]",
  "short_name": "[Short Name]",
  "description": "[One-line description]",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "[vertical theme color from layout.tsx viewport export]",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Screenshot Stabilization CSS

```css
/* tests/e2e/shared/screenshot-stable.css */

/* Disable all animations and transitions */
*,
*::before,
*::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
}

/* Hide elements that change between runs */
[data-dynamic],
[data-testid='timestamp'],
time {
  visibility: hidden !important;
}

/* Stabilize images that use random Unsplash URLs */
img[src*='unsplash'] {
  visibility: hidden !important;
}

/* Hide scroll indicators */
::-webkit-scrollbar {
  display: none !important;
}
```

## State of the Art

| Old Approach                        | Current Approach                            | When Changed            | Impact                                                           |
| ----------------------------------- | ------------------------------------------- | ----------------------- | ---------------------------------------------------------------- |
| Percy/Applitools for visual testing | Playwright built-in `toHaveScreenshot()`    | Playwright 1.22+ (2022) | No external service needed, free, integrated                     |
| Custom pixel-diff with pixelmatch   | `toHaveScreenshot()` with threshold options | Playwright 1.22+        | Built-in retry, platform-aware naming, better DX                 |
| `animations: 'allow'` default       | `animations: 'disabled'` default            | Playwright 1.34+        | Animations are disabled by default now -- no extra config needed |

**Note:** `animations` defaults to `'disabled'` in Playwright 1.34+. Since this project uses 1.58.0, animations are already disabled by default. Explicitly setting it is still good practice for readability.

## Codebase-Specific Findings

### Existing Infrastructure to Leverage

| Asset                 | Location                                | How to Use                                                           |
| --------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| Vertical registry     | `tests/e2e/shared/vertical-registry.ts` | Iterate over verticals for screenshots + manifest tests              |
| Viewport presets      | `tests/e2e/shared/viewport-helpers.ts`  | Already configured in Playwright projects (Pixel 5 + Desktop Chrome) |
| Shared fixtures       | `tests/e2e/shared/fixtures.ts`          | Extend with manifest validation helper                               |
| Per-vertical projects | `playwright.config.ts`                  | 16 projects already exist (8 verticals x 2 viewports)                |
| Smoke specs           | `tests/e2e/verticals/*.smoke.spec.ts`   | Add visual + manifest test blocks to existing files                  |

### Manifest Status per Vertical

| Vertical       | Has manifest.json | Location                                        | Missing Fields                             |
| -------------- | ----------------- | ----------------------------------------------- | ------------------------------------------ |
| coffeeshop     | YES               | `apps/coffeeshop/frontend/public/manifest.json` | None -- complete                           |
| gym            | YES               | `apps/gym/frontend/public/manifest.json`        | None, but 512px icon reuses 192px src      |
| waiter         | YES               | `apps/waiter/public/manifest.json`              | None -- complete (not in scope, staff PWA) |
| wellness       | NO                | -                                               | Entire file missing                        |
| laundry        | NO                | -                                               | Entire file missing                        |
| pharmacy       | NO                | -                                               | Entire file missing                        |
| workshops      | NO                | -                                               | Entire file missing                        |
| tours          | NO                | -                                               | Entire file missing                        |
| accommodations | NO                | -                                               | Entire file missing                        |

### Key Internal Page per Vertical (for second screenshot)

| Vertical       | Home | Key Internal Page       | Route        |
| -------------- | ---- | ----------------------- | ------------ |
| coffeeshop     | `/`  | (home only in registry) | `/` only     |
| wellness       | `/`  | Services catalog        | `/services`  |
| laundry        | `/`  | Services catalog        | `/services`  |
| pharmacy       | `/`  | Products catalog        | `/products`  |
| workshops      | `/`  | Workshop listing        | `/workshops` |
| gym            | `/`  | Course schedule         | `/courses`   |
| tours          | `/`  | (home only in registry) | `/` only     |
| accommodations | `/`  | (home only in registry) | `/` only     |

**Note:** Coffeeshop, tours, and accommodations only have `home` registered. For these, either add routes to the registry or screenshot only the homepage. The CONTEXT.md says "homepage + one key internal page" but 3 verticals may only have the homepage route registered.

### Viewport Dimensions (from existing projects)

| Project Suffix | Device         | Viewport | Notes                         |
| -------------- | -------------- | -------- | ----------------------------- |
| `*-mobile`     | Pixel 5        | 393x851  | NOT 375px as CONTEXT mentions |
| `*-desktop`    | Desktop Chrome | 1280x720 | Matches CONTEXT               |

**Recommendation:** Use existing Pixel 5 (393px) for mobile rather than a custom 375px viewport. Consistency with smoke tests is more valuable than matching an arbitrary width.

## Open Questions

1. **Icon files for missing manifests:** The 5 verticals with missing manifests likely also lack the actual icon PNG files (192px, 512px). Creating manifest.json alone is not enough -- the referenced icon files must exist or the manifest is technically invalid. Need to check if placeholder icons exist in each vertical's public directory.

2. **Coffeeshop/tours/accommodations second page:** These only have `home` in the vertical registry. Should we add a second route to the registry, or accept 1 screenshot for these verticals? Coffeeshop actually has `/menu`, `/account`, etc. in the app but they are not in the registry.

3. **Snapshot storage location:** Playwright stores snapshots in `*.spec.ts-snapshots/` directory next to the spec file. With 8 spec files x 2 viewports x 2 pages = potentially 32 snapshot directories. This is the default behavior and is fine but worth noting.

## Sources

### Primary (HIGH confidence)

- Playwright official docs: [Visual comparisons](https://playwright.dev/docs/test-snapshots) - `toHaveScreenshot()` API, options, behavior
- Playwright official docs: [PageAssertions](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-2) - Full API reference
- Direct codebase investigation: `playwright.config.ts`, `tests/e2e/shared/`, all 8 smoke specs, all layout.tsx files, all manifest.json files

### Secondary (MEDIUM confidence)

- [BrowserStack: Snapshot Testing with Playwright 2026](https://www.browserstack.com/guide/playwright-snapshot-testing) - Best practices, stabilization patterns
- [BrowserStack: 15 Best Practices for Playwright 2026](https://www.browserstack.com/guide/playwright-best-practices) - General patterns

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Playwright 1.58.0 already installed, `toHaveScreenshot()` is built-in, verified via official docs
- Architecture: HIGH - Existing test infrastructure examined directly, patterns derived from codebase
- Pitfalls: HIGH - Missing manifests discovered by direct filesystem check; platform mismatch and dynamic content are well-documented issues
- Manifest gaps: HIGH - Verified by `ls` and `grep` that 5 verticals lack manifest.json files

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable domain, Playwright API unlikely to change)
