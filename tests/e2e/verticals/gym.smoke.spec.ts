/**
 * Gym PWA Smoke Tests
 *
 * Validates that the gym vertical loads correctly, has proper navigation,
 * no console errors, all key routes are accessible, BottomNav links navigate,
 * and no horizontal overflow at responsive viewports.
 *
 * Nav pattern: link-based (4 links: Home, Courses, Shop, Account; center "Day Pass" has href="#")
 * The href="#" center button is filtered out by the a[href]:not([href="#"]) selector.
 *
 * Run: SKIP_WEBSERVER=1 npx playwright test --project=gym-mobile
 */

import { test, expect } from '../shared/fixtures';
import { VERTICALS } from '../shared/vertical-registry';

const vertical = VERTICALS.gym;

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
    const navLinks = page.locator('nav a[href]:not([href="#"])');
    const count = await navLinks.count();
    // On desktop viewport, BottomNav may be hidden (md:hidden)
    if (count === 0) return;

    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }

    for (const href of hrefs) {
      await page.goto(href);
      await page.waitForLoadState('domcontentloaded');
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

      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Horizontal overflow at ${vp.width}px`).toBe(false);
    });
  }
});
