/**
 * Wellness PWA Smoke Tests
 *
 * Validates that the wellness vertical loads correctly, has proper navigation,
 * no console errors, and all key routes are accessible.
 *
 * Run: SKIP_WEBSERVER=1 npx playwright test --project=wellness-mobile
 */

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
      expect(response?.status(), `Route ${name} (${path}) should return 200`).toBe(200);
    }
  });
});
