/**
 * Alerts Checker
 *
 * Periodically checks for alert conditions across all merchants.
 *
 * Schedule: Every 2 hours
 */

import { schedules, task, logger } from '@trigger.dev/sdk/v3';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { checkAlerts } from '@/lib/ai/proactivity-service';

// Scheduled task - runs every 2 hours
export const alertsChecker = schedules.task({
  id: 'alerts-checker',
  cron: '0 */2 * * *', // Every 2 hours
  run: async () => {
    const result = await checkAlertsForAllMerchants();
    logger.info('Alerts check completed', result);
    return result;
  },
});

// Also export as a regular task for manual triggering
export const checkAlertsTask = task({
  id: 'check-alerts',
  run: async () => {
    return await checkAlertsForAllMerchants();
  },
});

// Task to check alerts for a single merchant
export const checkMerchantAlertsTask = task({
  id: 'check-merchant-alerts',
  run: async (payload: { merchantId: string; locationId?: string }) => {
    const { merchantId, locationId } = payload;

    try {
      const alerts = await checkAlerts(merchantId, locationId);
      logger.info('Alerts checked', { merchantId, alertCount: alerts.length });
      return { success: true, alertCount: alerts.length, alerts };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to check alerts', { merchantId, error: message });
      return { success: false, error: message };
    }
  },
});

async function checkAlertsForAllMerchants(): Promise<{
  total: number;
  checked: number;
  totalAlerts: number;
  errors: { merchantId: string; error: string }[];
}> {
  const supabase = getSupabaseAdmin();

  // Get all active merchants
  const { data: merchants, error } = await supabase
    .from('merchants')
    .select('id, name')
    .eq('is_active', true);

  if (error) {
    logger.error('Failed to fetch merchants', { error });
    throw new Error(error.message);
  }

  if (!merchants || merchants.length === 0) {
    return { total: 0, checked: 0, totalAlerts: 0, errors: [] };
  }

  const result = {
    total: merchants.length,
    checked: 0,
    totalAlerts: 0,
    errors: [] as { merchantId: string; error: string }[],
  };

  // Process merchants in batches
  const batchSize = 10;
  for (let i = 0; i < merchants.length; i += batchSize) {
    const batch = merchants.slice(i, i + batchSize);

    const results = await Promise.allSettled(
      batch.map(async (merchant) => {
        const alerts = await checkAlerts(merchant.id);
        return { alertCount: alerts.length };
      })
    );

    for (let j = 0; j < results.length; j++) {
      const res = results[j];
      const merchant = batch[j];

      if (res.status === 'fulfilled') {
        result.checked++;
        result.totalAlerts += res.value.alertCount;
      } else {
        result.errors.push({
          merchantId: merchant.id,
          error: res.reason?.message || 'Unknown error',
        });
      }
    }

    // Small delay between batches
    if (i + batchSize < merchants.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return result;
}
