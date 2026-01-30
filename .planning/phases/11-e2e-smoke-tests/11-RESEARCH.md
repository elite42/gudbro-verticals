# Phase 11: E2E Smoke Tests - Research

**Researched:** 2026-01-30
**Domain:** Playwright smoke tests for 8 PWA verticals
**Confidence:** HIGH

## Summary

Phase 11 writes the actual smoke tests for all 8 verticals using the infrastructure built in Phase 10. The infrastructure is complete and well-structured: `BasePwaPage` provides reusable page-load, console-error, navigation-visible, and title assertions. Shared fixtures inject `pwaPage` and `verticalConfig` per Playwright project. The vertical registry maps all 8 verticals to ports, routes, and pnpm filters. One wellness smoke test already exists and passes as the Phase 10 validation artifact.

The key finding is that verticals fall into two navigation categories: **Link-based** (wellness, laundry, pharmacy, workshops, gym, coffeeshop) where BottomNav items use Next.js `<Link>` with `href` attributes navigating to real routes, and **callback-based** (tours, accommodations) where BottomNav items use `<button>` with `onTabChange` callbacks that switch in-page state without URL navigation. This distinction is critical for navigation tests -- Link-based verticals can be tested by clicking links and asserting URL changes, while callback-based verticals must assert DOM state changes instead.

**Primary recommendation:** Create one smoke spec file per vertical following the wellness pattern. Add BottomNav navigation tests and responsive viewport overflow tests beyond what the wellness smoke already covers. Handle the two navigation patterns (Link vs callback) with different assertion strategies, not different test structures.

## Standard Stack

### Core

| Library           | Version                   | Purpose                                | Why Standard                                                                                                             |
| ----------------- | ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Playwright        | (inherited from Phase 10) | Test runner                            | Already configured in playwright.config.ts                                                                               |
| BasePwaPage       | N/A (custom)              | Page object for smoke checks           | Built in Phase 10, provides `expectPageLoads()`, `expectNoConsoleErrors()`, `expectNavigationVisible()`, `expectTitle()` |
| Shared fixtures   | N/A (custom)              | `pwaPage` + `verticalConfig` injection | Built in Phase 10, test files import `{ test, expect }` from `../shared/fixtures`                                        |
| Vertical registry | N/A (custom)              | Port/route/config mapping              | Built in Phase 10, `VERTICALS` object with all 8 verticals                                                               |

### Supporting

No additional libraries needed. All infrastructure exists.

## Architecture Patterns

### Existing Test File Structure

```
tests/e2e/
  shared/
    base-pwa-page.ts      # BasePwaPage class
    fixtures.ts            # test.extend with pwaPage, verticalConfig
    vertical-registry.ts   # VERTICALS config map
    viewport-helpers.ts    # VIEWPORTS.mobile, VIEWPORTS.desktop
  verticals/
    wellness.smoke.spec.ts # Existing pattern (Phase 10 validation)
    # Phase 11 adds 7 more spec files here
```

### Pattern 1: One Spec File Per Vertical (Replicate Wellness Pattern)

**What:** Each vertical gets `{slug}.smoke.spec.ts` in `tests/e2e/verticals/`
**When to use:** Always -- this is the established pattern from Phase 10.
**Example (existing wellness.smoke.spec.ts):**

```typescript
import { test, expect } from '../shared/fixtures';
import { VERTICALS } from '../shared/vertical-registry';

const vertical = VERTICALS.wellness;

test.describe(`${vertical.name} PWA Smoke`, () => {
  test('home page loads successfully', async ({ pwaPage }) => {
    await pwaPage.expectPageLoads();
  });

  test('page has title', async ({ pwaPage }) => {
    await pwaPage.goto();
    await pwaPage.expectTitle();
  });

  test('navigation is visible', async ({ pwaPage }) => {
    await pwaPage.goto();
    await pwaPage.expectNavigationVisible();
  });

  test('no console errors on home', async ({ pwaPage }) => {
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

### Pattern 2: BottomNav Navigation Tests

**What:** Click each BottomNav link and verify the target page loads.
**Key distinction:** Two types of BottomNav exist across verticals.

**Type A -- Link-based (6 verticals):** Uses `<Link href="/path">`. Can click and assert `page.url()` changes.

```typescript
test('BottomNav links navigate correctly', async ({ page, pwaPage }) => {
  await pwaPage.goto();
  const navLinks = page.locator('nav a[href]');
  const count = await navLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const href = await navLinks.nth(i).getAttribute('href');
    if (!href || href === '#') continue;
    await navLinks.nth(i).click();
    await page.waitForURL(`**${href}*`);
    expect(page.url()).toContain(href);
    // Navigate back to home for next iteration
    await pwaPage.goto();
  }
});
```

**Type B -- Callback-based (tours, accommodations):** Uses `<button onClick>`. Must assert DOM changes, not URL changes.

```typescript
test('BottomNav tabs are interactive', async ({ page, pwaPage }) => {
  await pwaPage.goto();
  const navButtons = page.locator('nav button');
  const count = await navButtons.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await navButtons.nth(i).click();
    // Structural assertion: page content changed (no crash, nav still visible)
    await expect(
      page.locator('nav, header, [role="navigation"]').first()
    ).toBeVisible();
  }
});
```

### Pattern 3: Responsive Viewport No-Overflow Tests

**What:** At each viewport (375px, 768px, 1280px), verify no horizontal overflow.
**Key insight:** The Playwright config already creates mobile + desktop projects per vertical. But it uses `Pixel 5` (393px) and `Desktop Chrome` (1280x720). The success criteria specifically require 375px, 768px, and 1280px. Tests should explicitly set viewport within the test.

```typescript
const RESPONSIVE_VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const vp of RESPONSIVE_VIEWPORTS) {
  test(`no horizontal overflow at ${vp.name} (${vp.width}px)`, async ({
    page,
    pwaPage,
  }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await pwaPage.goto();
    await page.waitForLoadState('networkidle');

    const hasOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    expect(hasOverflow, `Horizontal overflow detected at ${vp.width}px`).toBe(
      false
    );
  });
}
```

### Anti-Patterns to Avoid

- **Content assertions:** Do NOT assert specific text like "Welcome" or menu item names. Use structural assertions (element visibility, counts, URL patterns). This is locked in success criteria #5.
- **Hardcoded selectors:** Do NOT use selectors tied to specific text content or mock data. Use semantic selectors (`nav`, `a[href]`, `button`, `[role="navigation"]`).
- **Separate test runs per viewport:** Do NOT create separate test files for mobile/tablet/desktop. Use `page.setViewportSize()` within a single spec to test all 3 viewports. The Playwright projects already provide mobile and desktop contexts.

## Don't Hand-Roll

| Problem                 | Don't Build                 | Use Instead                         | Why                                                          |
| ----------------------- | --------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| Page load checks        | Custom fetch + status check | `pwaPage.expectPageLoads()`         | Already handles HTTP status assertion                        |
| Console error filtering | Custom error collector      | `pwaPage.expectNoConsoleErrors()`   | Already filters benign errors (favicon, hydration, DevTools) |
| Navigation visibility   | Custom DOM query            | `pwaPage.expectNavigationVisible()` | Already handles nav/header/role="navigation" fallback        |
| Route accessibility     | Per-route page.goto         | Loop over `vertical.routes`         | Registry already defines all routes per vertical             |

## Common Pitfalls

### Pitfall 1: Callback-Based BottomNav Has No URL Changes

**What goes wrong:** Writing navigation tests that assert URL changes for tours/accommodations will fail because their BottomNav uses buttons with state callbacks, not links.
**Why it happens:** The codebase has two BottomNav patterns -- some use `<Link href>` (actual navigation), others use `<button onClick>` (state change within single page).
**How to avoid:** Detect which pattern each vertical uses. For callback-based verticals, assert DOM state changes (button click doesn't crash, content area updates, nav stays visible) instead of URL changes.
**Warning signs:** Test hangs waiting for URL change that never happens.

### Pitfall 2: networkidle Flakiness in Dev Mode

**What goes wrong:** `waitForLoadState('networkidle')` can be flaky when dev servers have HMR websockets that never truly go idle.
**Why it happens:** Next.js dev mode maintains persistent websocket connections for HMR. `networkidle` waits for 500ms of no network activity, which may not happen.
**How to avoid:** Use `waitForLoadState('domcontentloaded')` as primary, with `networkidle` only when needed for console error tests. Or use `waitForSelector` on a known element.
**Warning signs:** Intermittent test timeouts on `waitForLoadState`.

### Pitfall 3: BottomNav Hidden on Desktop (md:hidden)

**What goes wrong:** BottomNav navigation tests fail on desktop viewport because the nav is hidden with `md:hidden` CSS class.
**Why it happens:** All BottomNav components use `md:hidden` (hidden above 768px). Desktop viewport tests at 1280px will not see the BottomNav.
**How to avoid:** BottomNav navigation tests should only run at mobile viewport or be conditional on viewport width. For desktop, test that a different navigation (header/sidebar) is present, or skip BottomNav-specific tests. The `expectNavigationVisible()` in BasePwaPage already handles this by looking for `nav, header, [role="navigation"]` generically.
**Warning signs:** "Element is not visible" errors only in desktop projects.

### Pitfall 4: Accommodations Stay Page Requires Dynamic Route

**What goes wrong:** Accommodations only has two pages: `/` (landing) and `/stay/[code]` (dashboard). The real app experience is behind a dynamic route segment.
**Why it happens:** Accommodations is a stay-management PWA; the home page is a landing/booking page. The actual in-stay dashboard requires a stay code.
**How to avoid:** For accommodations smoke tests, test only the `/` route for page-load. Do NOT attempt to test `/stay/[code]` without valid mock data. The registry already only lists `home: '/'` and `stay: '/stay'` -- the `/stay` route without a code will likely 404 or redirect.
**Warning signs:** 404 on `/stay` route.

### Pitfall 5: Tours Single-Page Architecture

**What goes wrong:** Tours only has one page.tsx (`/`). All content (home, map, deals, profile) renders on the same page via state changes.
**Why it happens:** Tours uses a tab-based SPA pattern -- everything is on the home page, BottomNav switches state, no routing.
**How to avoid:** For tours, the "key routes accessible" test only checks `/`. Navigation test must use button clicks + DOM assertions, not route navigation.
**Warning signs:** Registry only has `routes: { home: '/' }`.

### Pitfall 6: Center Button Is Not a Navigation Link

**What goes wrong:** Clicking the center BottomNav button triggers a modal, drawer, or no-op (not navigation). Test expects URL change or new page.
**Why it happens:** Most verticals have an `isCenter: true` item in their BottomNav that triggers a callback (menu toggle, center click handler) rather than navigation. Some (pharmacy, workshops) make the center item a Link; others (coffeeshop, laundry, gym, accommodations, tours) use buttons.
**How to avoid:** When iterating over nav items, skip or handle center buttons separately. Filter nav links by `a[href]` (only actual links), not all `button` elements.
**Warning signs:** Test clicks center button and nothing visible happens, or a modal opens unexpectedly.

## Code Examples

### Complete Smoke Spec for a Link-Based Vertical (Template)

```typescript
import { test, expect } from '../shared/fixtures';
import { VERTICALS } from '../shared/vertical-registry';

const vertical = VERTICALS.{slug};

test.describe(`${vertical.name} PWA Smoke`, () => {
  // === Page Load ===
  test('home page loads successfully', async ({ pwaPage }) => {
    await pwaPage.expectPageLoads();
  });

  test('page has title', async ({ pwaPage }) => {
    await pwaPage.goto();
    await pwaPage.expectTitle();
  });

  test('no console errors on home', async ({ pwaPage }) => {
    await pwaPage.expectNoConsoleErrors();
  });

  // === Navigation ===
  test('navigation is visible', async ({ pwaPage }) => {
    await pwaPage.goto();
    await pwaPage.expectNavigationVisible();
  });

  test('BottomNav links navigate correctly', async ({ page, pwaPage }) => {
    await pwaPage.goto();
    // Get all actual navigation links (not buttons)
    const navLinks = page.locator('nav a[href]:not([href="#"])');
    const count = await navLinks.count();
    expect(count, 'BottomNav should have navigation links').toBeGreaterThan(0);

    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }

    for (const href of hrefs) {
      await page.goto(href);
      const response = await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain(href);
    }
  });

  test('key routes are accessible', async ({ page }) => {
    for (const [name, path] of Object.entries(vertical.routes)) {
      const response = await page.goto(path);
      expect(response?.status(), `Route ${name} (${path}) should return 200`).toBe(200);
    }
  });

  // === Responsive Viewports ===
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
  ];

  for (const vp of viewports) {
    test(`no horizontal overflow at ${vp.name} (${vp.width}px)`, async ({ page, pwaPage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await pwaPage.goto();
      await page.waitForLoadState('domcontentloaded');

      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Horizontal overflow at ${vp.width}px`).toBe(false);
    });
  }
});
```

### Callback-Based Vertical Variant (Tours/Accommodations)

For tours and accommodations, replace the BottomNav link test with:

```typescript
test('BottomNav tabs are interactive', async ({ page, pwaPage }) => {
  await pwaPage.goto();
  const navButtons = page.locator('nav button');
  const count = await navButtons.count();
  expect(count, 'BottomNav should have tab buttons').toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await navButtons.nth(i).click();
    // Structural: nav stays visible after each click (no crash)
    await expect(page.locator('nav').first()).toBeVisible();
  }
});
```

## Vertical-by-Vertical Analysis

### 1. Coffeeshop (port 3004)

| Aspect           | Detail                                                                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BottomNav type   | **Link-based** (`BottomNavLocal.tsx`)                                                                                                                                       |
| Nav items        | Home (`/`), Menu (`/menu`), More (button/action), Order (button/action), Account (`/account`)                                                                               |
| Clickable links  | Home, Menu, Account = 3 links                                                                                                                                               |
| Center item      | "More" button -- opens `MoreMenuModal`                                                                                                                                      |
| Registry routes  | `{ home: '/' }`                                                                                                                                                             |
| Pages that exist | `/`, `/menu`, `/account`, `/cart`, `/offers`, `/about`, `/contact`, `/team`, `/events`, many more                                                                           |
| Special notes    | Complex BottomNav with scroll-hide behavior, selections sidebar, modal. Has v1 and v2 versions. BottomNav uses `role="navigation"` explicitly. Hidden on `lg:` (not `md:`). |

### 2. Accommodations (port 3028)

| Aspect           | Detail                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| BottomNav type   | **Callback-based** (`onTabChange`)                                                                            |
| Nav items        | Home, Map, Menu (center), Services, Profile -- all buttons                                                    |
| Clickable links  | 0 links -- all are buttons with `onTabChange`                                                                 |
| Center item      | "Menu" button -- `onMenuToggle` callback                                                                      |
| Registry routes  | `{ home: '/', stay: '/stay' }`                                                                                |
| Pages that exist | `/`, `/stay/[code]`                                                                                           |
| Special notes    | `/stay` without a code will likely fail. Only test `/`. SPA-like tab switching on stay page. Hidden on `md:`. |

### 3. Tours (port 3026)

| Aspect           | Detail                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| BottomNav type   | **Callback-based** (`onTabChange`)                                        |
| Nav items        | Home, Map, Bento Menu (center), Deals, Profile -- all buttons             |
| Clickable links  | 0 links -- all are buttons                                                |
| Center item      | Bento grid button -- `onMenuClick` callback                               |
| Registry routes  | `{ home: '/' }`                                                           |
| Pages that exist | Only `/`                                                                  |
| Special notes    | Full SPA with tab switching. All content on single page. Hidden on `md:`. |

### 4. Wellness (port 3003) -- ALREADY DONE

| Aspect           | Detail                                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| BottomNav type   | **Link-based**                                                                                                                                 |
| Nav items        | Home (`/`), Servizi (`/services`), Pacchetti (`/packages`), Promo (`/promotions`), Search (`/search`)                                          |
| Clickable links  | All 5 are links (including center)                                                                                                             |
| Registry routes  | `{ home: '/', services: '/services', staff: '/staff' }`                                                                                        |
| Pages that exist | `/`, `/services`, `/staff`, `/packages`, `/promotions`, `/search`                                                                              |
| Special notes    | Existing smoke test covers page load, title, nav, console errors, key routes. Missing: BottomNav navigation test and responsive viewport test. |

### 5. Laundry (port 3030)

| Aspect           | Detail                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| BottomNav type   | **Link-based**                                                                                       |
| Nav items        | Home (`/`), Services (`/services`), Menu (center, button), Promo (`/promotions`), Search (`/search`) |
| Clickable links  | Home, Services, Promo, Search = 4 links                                                              |
| Center item      | "Menu" button -- `onCenterClick` callback, has bag count badge                                       |
| Registry routes  | `{ home: '/', services: '/services' }`                                                               |
| Pages that exist | `/`, `/services`, `/promotions`, `/search`                                                           |
| Special notes    | Center button with dynamic badge (localStorage). Hidden on `md:`.                                    |

### 6. Pharmacy (port 3031)

| Aspect           | Detail                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| BottomNav type   | **Link-based**                                                                                           |
| Nav items        | Home (`/`), Products (`/products`), Symptoms (`/search`, center), Offers (`/promotions`), Info (`/info`) |
| Clickable links  | All 5 are links (center "Symptoms" is also a Link)                                                       |
| Registry routes  | `{ home: '/', products: '/products', search: '/search' }`                                                |
| Pages that exist | `/`, `/products`, `/search`, `/promotions`, `/info`                                                      |
| Special notes    | Center item is a Link (not a button), unusual compared to other verticals. Hidden on `md:`.              |

### 7. Workshops (port 3032)

| Aspect           | Detail                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| BottomNav type   | **Link-based**                                                                                             |
| Nav items        | Home (`/`), Workshops (`/workshops`), Explore (`/search`, center), Deals (`/promotions`), About (`/about`) |
| Clickable links  | All 5 are links (center "Explore" is also a Link)                                                          |
| Registry routes  | `{ home: '/', workshops: '/workshops' }`                                                                   |
| Pages that exist | `/`, `/workshops`, `/search`, `/promotions`, `/about`                                                      |
| Special notes    | Center item is a Link (like pharmacy). Hidden on `md:`.                                                    |

### 8. Gym (port 3033)

| Aspect           | Detail                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| BottomNav type   | **Link-based**                                                                                                         |
| Nav items        | Home (`/`), Courses (`/courses`), Day Pass (center, `href="#"`, button behavior), Shop (`/shop`), Account (`/account`) |
| Clickable links  | Home, Courses, Shop, Account = 4 links                                                                                 |
| Center item      | "Day Pass" button -- `isCenter: true` with `onCenterClick` callback, href is `#`                                       |
| Registry routes  | `{ home: '/', courses: '/courses', passes: '/passes' }`                                                                |
| Pages that exist | `/`, `/courses`, `/passes`, `/shop`, `/account`, `/promotions`, `/info`, `/search`, `/register`                        |
| Special notes    | Center button uses `onCenterClick` but rendered with Link-like structure in code (has `href: '#'`). Hidden on `md:`.   |

## Vertical Registry Gap Analysis

The vertical registry `routes` object does NOT include all pages that exist. It only lists key routes. This is fine for the "key routes accessible" test. For BottomNav tests, we need to know the actual BottomNav `href` values (documented above).

| Vertical       | Registry routes             | Missing from registry (pages exist)           |
| -------------- | --------------------------- | --------------------------------------------- |
| coffeeshop     | `/`                         | `/menu`, `/account`, `/cart`, `/offers`, etc. |
| accommodations | `/`, `/stay`                | None (only 2 pages)                           |
| tours          | `/`                         | None (SPA)                                    |
| wellness       | `/`, `/services`, `/staff`  | `/packages`, `/promotions`, `/search`         |
| laundry        | `/`, `/services`            | `/promotions`, `/search`                      |
| pharmacy       | `/`, `/products`, `/search` | `/promotions`, `/info`                        |
| workshops      | `/`, `/workshops`           | `/search`, `/promotions`, `/about`            |
| gym            | `/`, `/courses`, `/passes`  | `/shop`, `/account`, `/promotions`, etc.      |

**Recommendation:** The BottomNav navigation tests should verify the actual BottomNav links work, regardless of whether routes are in the registry. The "key routes accessible" test uses registry routes. Both are valid and complementary.

## Wellness Smoke Test Gap Analysis

The existing wellness smoke test covers 5 tests:

1. Home page loads successfully
2. Page has title
3. Navigation is visible
4. No console errors on home
5. Key routes are accessible

**Missing per success criteria:**

- BottomNav navigation test (click each link, verify target loads) -- E2EI-04
- Responsive viewport tests at 375px, 768px, 1280px -- E2EI-05

**Recommendation:** Update the wellness smoke test to add these two test categories. All other verticals should include all tests from the start.

## State of the Art

| Old Approach                            | Current Approach                      | When Changed | Impact                                                         |
| --------------------------------------- | ------------------------------------- | ------------ | -------------------------------------------------------------- |
| Manual test files with hardcoded config | Shared fixtures + vertical registry   | Phase 10     | All test files use same fixtures, config comes from project    |
| Random viewport sizes                   | Standardized Pixel 5 / Desktop Chrome | Phase 10     | Consistent but does not match 375/768/1280 requirement exactly |

## Open Questions

1. **Wellness test update scope**: Should the existing wellness smoke test be updated to include BottomNav and viewport tests (aligning it with all other verticals), or should it stay as-is since it was a Phase 10 validation artifact?
   - What we know: Success criteria says "every vertical" must have all 3 test types
   - Recommendation: Update wellness to match the full template. It would be inconsistent to have wellness with 5 tests and all others with 8+.

2. **Accommodations /stay route**: The registry lists `stay: '/stay'` but the actual page is `/stay/[code]`. Will `/stay` return 200 or 404?
   - What we know: No standalone `/stay/page.tsx` exists, only `/stay/[code]/page.tsx`
   - Recommendation: Remove `/stay` from the "key routes accessible" test for accommodations, or expect it may 404 and handle gracefully. Alternatively, update the registry to only list `{ home: '/' }`.

3. **Running all smoke tests together**: Success criteria #4 requires `--project="smoke-*"`. Current project names are `{slug}-mobile` and `{slug}-desktop`. These don't start with "smoke-".
   - What we know: Playwright config uses names like `coffeeshop-mobile`, `wellness-desktop`
   - Recommendation: Either rename projects to `smoke-coffeeshop-mobile` etc., or use a different grep pattern. The success criteria likely means "run all vertical smoke projects together" regardless of exact naming. Verify with `--grep` or adjust project names.

## Sources

### Primary (HIGH confidence)

- Codebase: `tests/e2e/shared/base-pwa-page.ts` -- BasePwaPage API verified
- Codebase: `tests/e2e/shared/fixtures.ts` -- Fixture structure verified
- Codebase: `tests/e2e/shared/vertical-registry.ts` -- All 8 verticals with ports/routes verified
- Codebase: `tests/e2e/shared/viewport-helpers.ts` -- Pixel 5 + Desktop Chrome presets verified
- Codebase: `tests/e2e/verticals/wellness.smoke.spec.ts` -- Existing pattern verified
- Codebase: `playwright.config.ts` -- Project structure verified
- Codebase: All 8 BottomNav components read and analyzed

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - all infrastructure is in the codebase, no external dependencies needed
- Architecture: HIGH - pattern established by wellness smoke test, all BottomNav components analyzed
- Pitfalls: HIGH - found through direct code analysis (callback vs link patterns, md:hidden, center buttons, SPA architecture)

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable -- infrastructure is fixed, verticals rarely change navigation structure)
