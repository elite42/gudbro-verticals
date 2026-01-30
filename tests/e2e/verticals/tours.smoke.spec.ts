/**
 * Tours PWA Smoke Tests
 *
 * Validates that the tours vertical loads correctly, has proper navigation,
 * no console errors, all key routes are accessible, BottomNav tabs are interactive,
 * and no horizontal overflow at responsive viewports.
 *
 * Nav pattern: callback-based (all nav items are buttons with onClick callbacks, not links)
 * Tours is a full SPA with a single route /.
 *
 * Run: SKIP_WEBSERVER=1 npx playwright test --project=tours-mobile
 */

import path from 'path';
import { test, expect } from '../shared/fixtures';
import { VERTICALS } from '../shared/vertical-registry';

const SCREENSHOT_CSS = path.join(__dirname, '../shared/screenshot-stable.css');

const vertical = VERTICALS.tours;

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

  test('BottomNav tabs are interactive', async ({ page, pwaPage }) => {
    await pwaPage.goto();
    const navButtons = page.locator('nav button');
    const count = await navButtons.count();
    // On desktop viewport, BottomNav may be hidden (md:hidden)
    if (count === 0) return;

    for (let i = 0; i < count; i++) {
      await navButtons.nth(i).click();
      // Structural: nav still visible after click (no crash)
      await expect(page.locator('nav').first()).toBeVisible();
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

      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Horizontal overflow at ${vp.width}px`).toBe(false);
    });
  }
});

test.describe(`${vertical.name} Visual Regression`, () => {
  test('homepage visual baseline', async ({ page, pwaPage }) => {
    await pwaPage.goto();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${vertical.slug}-home.png`, {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
      stylePath: SCREENSHOT_CSS,
    });
  });

  test('key page visual baseline', async ({ page }) => {
    const nonHomeRoutes = Object.entries(vertical.routes).filter(([k]) => k !== 'home');
    if (nonHomeRoutes.length === 0) {
      test.skip();
      return;
    }
    const [routeName, routePath] = nonHomeRoutes[0];
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
    expect(icons.length, 'must have at least 2 icons').toBeGreaterThanOrEqual(2);

    const sizes = icons.map((i) => i.sizes || '');
    const has192 = sizes.some((s) => s.includes('192'));
    const has512 = sizes.some((s) => s.includes('512'));
    expect(has192, 'must include 192x192 icon').toBeTruthy();
    expect(has512, 'must include 512x512 icon').toBeTruthy();
  });
});
