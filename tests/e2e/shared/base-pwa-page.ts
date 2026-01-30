/**
 * BasePwaPage — reusable page object for PWA smoke checks.
 *
 * Provides common assertions: page loads, no console errors,
 * navigation visible, and title present.
 */

import { type Page, expect } from '@playwright/test';
import type { VerticalConfig } from './vertical-registry';

/** Patterns that are benign and should not fail the "no console errors" check. */
const BENIGN_ERROR_PATTERNS = [
  'favicon',
  'next-dev',
  'hydration',
  'Download the React DevTools',
  'ERR_CONNECTION_REFUSED', // dev proxy noise
];

export class BasePwaPage {
  readonly page: Page;
  readonly config: VerticalConfig;

  constructor(page: Page, config: VerticalConfig) {
    this.page = page;
    this.config = config;
  }

  /** Navigate to a path (defaults to the vertical's home route). */
  async goto(path?: string) {
    const url = path || this.config.routes.home;
    await this.page.goto(url);
  }

  /** Assert the home page responds with HTTP 200. */
  async expectPageLoads() {
    const response = await this.page.goto(this.config.routes.home);
    expect(response?.status()).toBe(200);
  }

  /**
   * Assert no real console errors are emitted on home page load.
   * Filters out known benign errors (favicon 404, Next.js dev warnings, hydration).
   */
  async expectNoConsoleErrors() {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await this.page.goto(this.config.routes.home);
    await this.page.waitForLoadState('networkidle');

    const realErrors = errors.filter(
      (e) => !BENIGN_ERROR_PATTERNS.some((pattern) => e.includes(pattern))
    );
    expect(realErrors, 'Unexpected console errors found').toHaveLength(0);
  }

  /** Assert that a nav, header, or [role="navigation"] element is visible. */
  async expectNavigationVisible() {
    const nav = this.page.locator('nav, header, [role="navigation"]').first();
    await expect(nav).toBeVisible({ timeout: 10_000 });
  }

  /** Assert the page has a non-empty title. */
  async expectTitle() {
    await expect(this.page).toHaveTitle(/.+/);
  }
}
