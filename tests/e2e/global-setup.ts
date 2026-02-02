/**
 * Global Setup for Multi-System E2E Tests
 *
 * This file runs before all tests when MULTI_SYSTEM_TEST=1
 * It verifies all systems are running and healthy.
 */

import { chromium, FullConfig } from '@playwright/test';

const SYSTEM_URLS = {
  backoffice: 'http://localhost:3023',
  waiter: 'http://localhost:3005',
  customer: 'http://localhost:3004',
  kitchen: 'http://localhost:3023/orders/kitchen',
  bar: 'http://localhost:3023/orders/bar',
};

const TIMEOUT = 30000; // 30 seconds per system

async function checkSystemHealth(name: string, url: string): Promise<boolean> {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const response = await page.goto(url, { timeout: TIMEOUT });
    const isOk = response?.ok() ?? false;

    if (!isOk) {
      console.error(`[${name}] Failed to load: ${url} (status: ${response?.status()})`);
    } else {
      console.log(`[${name}] OK: ${url}`);
    }

    await page.close();
    return isOk;
  } catch (error) {
    console.error(`[${name}] Error connecting to ${url}:`, error);
    return false;
  } finally {
    await browser.close();
  }
}

async function globalSetup(config: FullConfig): Promise<void> {
  console.log('\n========================================');
  console.log('Multi-System E2E Test Setup');
  console.log('========================================\n');

  // Check which systems to verify
  const systemsToCheck: Array<{ name: string; url: string }> = [];

  // In multi-system mode, check all systems
  if (process.env.MULTI_SYSTEM_TEST) {
    systemsToCheck.push(
      { name: 'Backoffice', url: SYSTEM_URLS.backoffice },
      { name: 'Waiter PWA', url: SYSTEM_URLS.waiter },
      { name: 'Customer PWA', url: SYSTEM_URLS.customer }
    );
  } else {
    // Single system mode - just check customer
    systemsToCheck.push({ name: 'Customer PWA', url: SYSTEM_URLS.customer });
  }

  console.log('Checking system health...\n');

  const results = await Promise.all(
    systemsToCheck.map(({ name, url }) => checkSystemHealth(name, url))
  );

  const failedCount = results.filter((r) => !r).length;

  console.log('\n----------------------------------------');
  if (failedCount > 0) {
    console.error(`\n${failedCount} system(s) failed health check!`);
    console.log('\nMake sure all systems are running:');
    console.log('  pnpm dev:backoffice   # Port 3023');
    console.log('  pnpm dev:waiter       # Port 3005');
    console.log('  pnpm dev:coffeeshop   # Port 3004');
    console.log('\nOr run all at once:');
    console.log('  MULTI_SYSTEM_TEST=1 pnpm test:e2e --project=multi-system');
    console.log('  (this will start servers automatically)\n');

    // Don't fail - let the tests handle it with better error messages
    // throw new Error('System health check failed');
  } else {
    console.log('\nAll systems healthy! Starting tests...\n');
  }

  console.log('========================================\n');
}

export default globalSetup;
