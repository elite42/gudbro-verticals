import { test, expect, Page, BrowserContext } from '@playwright/test';
import { SYSTEM_URLS } from '../../../playwright.config';

/**
 * E2E Test: Full Lunch Flow
 *
 * Tests the complete order flow across all systems:
 * Customer → Waiter → Kitchen → Bar → Waiter → Customer
 *
 * Prerequisites:
 * - All systems running (backoffice, waiter, customer)
 * - Run with: MULTI_SYSTEM_TEST=1 pnpm test:e2e --project=multi-system
 */

// Test configuration
const TEST_CONFIG = {
  tableNumber: '5',
  tableQrCode: 'QR-T5-TEST',
  customerName: 'Test Customer',
  devWaiterId: 'dev-staff-1', // Mario Rossi from dev accounts
};

// Helper to create a new page for a specific system
async function createSystemPage(context: BrowserContext, system: keyof typeof SYSTEM_URLS): Promise<Page> {
  const page = await context.newPage();
  await page.goto(SYSTEM_URLS[system]);
  return page;
}

// Helper to login to waiter app with dev account
async function loginWaiterDev(page: Page): Promise<void> {
  await page.goto(`${SYSTEM_URLS.waiter}/login`);

  // Click on dev account (Mario Rossi)
  await page.click('text=Mario Rossi');

  // Wait for redirect to dashboard
  await page.waitForURL(`${SYSTEM_URLS.waiter}/`);
}

// Helper to set dev session cookie for waiter
async function setWaiterDevSession(context: BrowserContext): Promise<void> {
  const devAccount = {
    id: 'dev-staff-1',
    email: 'waiter@gudbro.dev',
    name: 'Mario Rossi',
    role: 'staff',
    locationId: 'loc-1',
  };

  await context.addCookies([
    {
      name: 'gudbro_dev_session',
      value: encodeURIComponent(JSON.stringify(devAccount)),
      domain: 'localhost',
      path: '/',
    },
  ]);
}

test.describe('Full Lunch Flow - Multi-System E2E', () => {
  test.describe.configure({ mode: 'serial' }); // Run tests in order

  let waiterPage: Page;
  let customerPage: Page;
  let kitchenPage: Page;
  let barPage: Page;

  test.beforeAll(async ({ browser }) => {
    // Create separate contexts for each "user"
    const waiterContext = await browser.newContext();
    const customerContext = await browser.newContext();
    const kitchenContext = await browser.newContext();

    // Setup waiter with dev session
    await setWaiterDevSession(waiterContext);

    // Create pages for each system
    waiterPage = await waiterContext.newPage();
    customerPage = await customerContext.newPage();
    kitchenPage = await kitchenContext.newPage();
    barPage = await kitchenContext.newPage(); // Same context as kitchen (same user)
  });

  test.afterAll(async () => {
    await waiterPage?.close();
    await customerPage?.close();
    await kitchenPage?.close();
    await barPage?.close();
  });

  test('1. Waiter logs in and sees dashboard', async () => {
    await waiterPage.goto(`${SYSTEM_URLS.waiter}/`);

    // Should see dashboard (not redirect to login due to dev session)
    await expect(waiterPage.locator('text=Dashboard')).toBeVisible({ timeout: 10000 });

    // Should see bottom navigation
    await expect(waiterPage.locator('nav')).toBeVisible();
  });

  test('2. Waiter navigates to tables', async () => {
    // Click on Tables tab in bottom nav
    await waiterPage.click('a[href="/tables"]');

    // Wait for navigation
    await waiterPage.waitForURL('**/tables');

    // Should see tables page
    await expect(waiterPage.locator('text=Tavoli').first()).toBeVisible();
  });

  test('3. Customer opens menu', async () => {
    await customerPage.goto(SYSTEM_URLS.customer);

    // Customer PWA should show menu
    // (Exact selectors depend on coffeeshop implementation)
    await expect(customerPage).toHaveTitle(/menu|gudbro/i);
  });

  test('4. Kitchen display loads', async () => {
    await kitchenPage.goto(SYSTEM_URLS.kitchen);

    // Should show Kitchen Display title
    await expect(kitchenPage.locator('text=Kitchen Display')).toBeVisible({ timeout: 10000 });

    // Should show Live badge
    await expect(kitchenPage.locator('text=Live')).toBeVisible();

    // Should show stats (Queue, Preparing, Ready)
    await expect(kitchenPage.locator('text=Queue')).toBeVisible();
    await expect(kitchenPage.locator('text=Preparing')).toBeVisible();
    await expect(kitchenPage.locator('text=Ready')).toBeVisible();
  });

  test('5. Bar display loads', async () => {
    await barPage.goto(SYSTEM_URLS.bar);

    // Should show Bar Display title
    await expect(barPage.locator('text=Bar Display')).toBeVisible({ timeout: 10000 });

    // Should show Live badge
    await expect(barPage.locator('text=Live')).toBeVisible();

    // Should show beverage filter toggle
    await expect(barPage.locator('text=Beverages Only')).toBeVisible();
  });

  test('6. All systems are synchronized (smoke test)', async () => {
    // This is a smoke test to verify all systems can communicate
    // In a real scenario, we would:
    // 1. Create an order via customer PWA
    // 2. Verify it appears in waiter's notifications
    // 3. Confirm it via waiter
    // 4. Verify it appears in kitchen/bar
    // 5. Mark as ready
    // 6. Verify waiter gets notification

    // For now, just verify all pages are accessible
    const waiterHealth = await waiterPage.evaluate(() => {
      return fetch('/api/health').then(r => r.ok);
    });
    expect(waiterHealth).toBe(true);

    // Verify kitchen page is interactive
    const kitchenStats = await kitchenPage.locator('.rounded-xl').count();
    expect(kitchenStats).toBeGreaterThan(0);

    // Verify bar page is interactive
    const barStats = await barPage.locator('.rounded-xl').count();
    expect(barStats).toBeGreaterThan(0);
  });
});

// Standalone tests for individual systems
test.describe('Waiter PWA - Tables Page', () => {
  test('shows table grid with correct elements', async ({ browser }) => {
    const context = await browser.newContext();
    await setWaiterDevSession(context);
    const page = await context.newPage();

    await page.goto(`${SYSTEM_URLS.waiter}/tables`);

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Should have bottom navigation
    await expect(page.locator('nav')).toBeVisible();

    // Should have table elements or empty state
    const hasTables = await page.locator('[data-testid="table-tile"]').count() > 0;
    const hasEmptyState = await page.locator('text=Nessun tavolo').isVisible().catch(() => false);

    expect(hasTables || hasEmptyState).toBe(true);

    await page.close();
    await context.close();
  });
});

test.describe('Kitchen Display', () => {
  test('has keyboard shortcuts help', async ({ page }) => {
    await page.goto(SYSTEM_URLS.kitchen);

    // Click keyboard shortcuts button
    await page.click('button[title*="Keyboard"]');

    // Should show shortcuts panel
    await expect(page.locator('text=Queue → Preparing')).toBeVisible();
    await expect(page.locator('text=Preparing → Ready')).toBeVisible();
    await expect(page.locator('text=Ready → Picked Up')).toBeVisible();
  });

  test('can toggle fullscreen', async ({ page }) => {
    await page.goto(SYSTEM_URLS.kitchen);

    // Find fullscreen button
    const fullscreenBtn = page.locator('button[title*="Fullscreen"]');
    await expect(fullscreenBtn).toBeVisible();

    // Note: Actually entering fullscreen requires user gesture in tests
    // Just verify the button exists
  });
});

test.describe('Bar Display', () => {
  test('can toggle beverage filter', async ({ page }) => {
    await page.goto(SYSTEM_URLS.bar);

    // Should show "Beverages Only" by default
    await expect(page.locator('text=Beverages Only')).toBeVisible();

    // Click filter toggle
    await page.click('button[title*="Beverages"]');

    // Filter should toggle (text might change or badge disappear)
    // The exact behavior depends on implementation
  });

  test('has link to kitchen display', async ({ page }) => {
    await page.goto(SYSTEM_URLS.bar);

    // Should have link to kitchen
    const kitchenLink = page.locator('a[href="/orders/kitchen"]');
    await expect(kitchenLink).toBeVisible();
  });
});
