/**
 * Viewport helpers — mobile and desktop device presets from Playwright built-in devices.
 *
 * Use these presets in Playwright project configs instead of hardcoding viewport dimensions.
 */

import { devices } from '@playwright/test';

export const VIEWPORTS = {
  mobile: devices['Pixel 5'],
  desktop: devices['Desktop Chrome'],
} as const;

export type ViewportName = keyof typeof VIEWPORTS;
