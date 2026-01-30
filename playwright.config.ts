import { defineConfig, devices } from '@playwright/test';
import { VERTICALS } from './tests/e2e/shared/vertical-registry';
import { VIEWPORTS } from './tests/e2e/shared/viewport-helpers';

/**
 * Playwright configuration for GUDBRO Verticals E2E tests
 *
 * Supports multi-system testing:
 * - Backoffice (:3023)
 * - Waiter PWA (:3005)
 * - Customer PWA (:3004)
 * - Kitchen Display (:3023/orders/kitchen)
 * - Bar Display (:3023/orders/bar)
 *
 * Per-vertical smoke testing (8 verticals x 2 viewports = 16 projects):
 * - Each vertical has mobile + desktop projects
 * - testMatch isolates vertical tests to tests/e2e/verticals/*.smoke.spec.ts
 *
 * @see https://playwright.dev/docs/test-configuration
 */

// System URLs for multi-system tests
export const SYSTEM_URLS = {
  backoffice: 'http://localhost:3023',
  waiter: 'http://localhost:3005',
  customer: 'http://localhost:3004',
  kitchen: 'http://localhost:3023/orders/kitchen',
  bar: 'http://localhost:3023/orders/bar',
};

// Per-vertical projects: 8 verticals x 2 viewports (mobile + desktop)
const verticalProjects = Object.entries(VERTICALS).flatMap(([slug, config]) => [
  {
    name: `${slug}-mobile`,
    testMatch: /verticals\/.*\.smoke\.spec\.ts/,
    use: {
      ...VIEWPORTS.mobile,
      baseURL: config.baseURL,
      verticalConfig: config,
    },
  },
  {
    name: `${slug}-desktop`,
    testMatch: /verticals\/.*\.smoke\.spec\.ts/,
    use: {
      ...VIEWPORTS.desktop,
      baseURL: config.baseURL,
      verticalConfig: config,
    },
  },
]);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],
  use: {
    // Default to customer PWA for backward compatibility
    baseURL: process.env.PLAYWRIGHT_BASE_URL || SYSTEM_URLS.customer,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Single-system tests (legacy) — exclude vertical smoke tests
    {
      name: 'chromium',
      testIgnore: /verticals\//,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      testIgnore: /verticals\//,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      testIgnore: /verticals\//,
      use: { ...devices['iPhone 13'] },
    },

    // Multi-system tests
    {
      name: 'multi-system',
      testMatch: /scenarios\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        // Multi-system tests manage their own URLs
        baseURL: undefined,
      },
    },

    // Waiter PWA specific tests
    {
      name: 'waiter-pwa',
      testMatch: /waiter\/.*\.spec\.ts/,
      use: {
        ...devices['Pixel 5'], // Mobile device for PWA
        baseURL: SYSTEM_URLS.waiter,
      },
    },

    // Backoffice specific tests
    {
      name: 'backoffice',
      testMatch: /backoffice\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: SYSTEM_URLS.backoffice,
      },
    },

    // Per-vertical smoke test projects (8 verticals x 2 viewports)
    ...verticalProjects,
  ],

  // Global setup for multi-system tests
  globalSetup: process.env.MULTI_SYSTEM_TEST ? './tests/e2e/global-setup.ts' : undefined,

  // Web server configuration
  // For multi-system tests, start all servers
  webServer: process.env.SKIP_WEBSERVER
    ? undefined
    : process.env.MULTI_SYSTEM_TEST
      ? [
          {
            command: 'pnpm dev:backoffice',
            url: SYSTEM_URLS.backoffice,
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
            stdout: 'ignore',
            stderr: 'pipe',
          },
          {
            command: 'pnpm dev:waiter',
            url: SYSTEM_URLS.waiter,
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
            stdout: 'ignore',
            stderr: 'pipe',
          },
          {
            command: 'pnpm dev:coffeeshop',
            url: SYSTEM_URLS.customer,
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
            stdout: 'ignore',
            stderr: 'pipe',
          },
        ]
      : {
          command: 'pnpm --filter @gudbro/coffeeshop dev',
          url: SYSTEM_URLS.customer,
          reuseExistingServer: !process.env.CI,
          timeout: 120 * 1000,
          stdout: 'ignore',
          stderr: 'pipe',
        },
});
