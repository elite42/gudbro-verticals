/**
 * Shared Playwright fixtures for per-vertical PWA smoke testing.
 *
 * Import { test, expect } from this module instead of '@playwright/test'
 * to get pre-wired pwaPage and verticalConfig fixtures.
 */

import { test as base } from '@playwright/test';
import { BasePwaPage } from './base-pwa-page';
import type { VerticalConfig } from './vertical-registry';

type PwaFixtures = {
  verticalConfig: VerticalConfig;
  pwaPage: BasePwaPage;
};

export const test = base.extend<PwaFixtures>({
  // Must be overridden per Playwright project via `use: { verticalConfig: ... }`
  verticalConfig: [
    // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-unused-vars
    async ({}, use) => {
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
