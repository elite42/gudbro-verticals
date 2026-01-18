/**
 * Trigger.dev Client Setup
 *
 * Lazy-initialized client to avoid build-time errors when TRIGGER_SECRET_KEY
 * is not available (e.g., during static builds).
 */

import { configure } from '@trigger.dev/sdk/v3';

// Configure Trigger.dev with lazy initialization
let isConfigured = false;

export function ensureTriggerConfigured() {
  if (isConfigured) return;

  const secretKey = process.env.TRIGGER_SECRET_KEY;
  if (!secretKey) {
    console.warn('[Trigger.dev] TRIGGER_SECRET_KEY not set, tasks will not run');
    return;
  }

  configure({
    secretKey,
  });

  isConfigured = true;
}

// Auto-configure on module load if key is available
if (process.env.TRIGGER_SECRET_KEY) {
  ensureTriggerConfigured();
}
