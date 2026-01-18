/**
 * Daily Briefing Generator
 *
 * Generates AI-powered daily briefings for all active merchants.
 *
 * Schedule: 6:00 AM daily (local time consideration via merchant timezone)
 */

import { schedules, task, logger } from '@trigger.dev/sdk/v3';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { generateDailyBriefing } from '@/lib/ai/proactivity-service';

interface MerchantForBriefing {
  id: string;
  name: string;
  timezone: string | null;
}

// Scheduled task - runs at 6 AM UTC (adjust for timezones in production)
export const dailyBriefingGenerator = schedules.task({
  id: 'daily-briefing-generator',
  cron: '0 6 * * *', // 6:00 AM UTC daily
  run: async () => {
    const result = await generateBriefingsForAllMerchants();
    logger.info('Daily briefings generated', result);
    return result;
  },
});

// Also export as a regular task for manual triggering
export const generateBriefingsTask = task({
  id: 'generate-daily-briefings',
  run: async () => {
    return await generateBriefingsForAllMerchants();
  },
});

// Task to generate briefing for a single merchant
export const generateMerchantBriefingTask = task({
  id: 'generate-merchant-briefing',
  run: async (payload: { merchantId: string; locationId?: string }) => {
    const { merchantId, locationId } = payload;

    try {
      const briefing = await generateDailyBriefing(merchantId, locationId);
      logger.info('Briefing generated', { merchantId, briefingId: briefing.id });
      return { success: true, briefingId: briefing.id };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to generate briefing', { merchantId, error: message });
      return { success: false, error: message };
    }
  },
});

async function generateBriefingsForAllMerchants(): Promise<{
  total: number;
  success: number;
  failed: number;
  errors: { merchantId: string; error: string }[];
}> {
  const supabase = getSupabaseAdmin();

  // Get all active merchants with briefings enabled
  const { data: merchants, error } = await supabase
    .from('merchants')
    .select('id, name, timezone')
    .eq('is_active', true);

  if (error) {
    logger.error('Failed to fetch merchants', { error });
    throw new Error(error.message);
  }

  if (!merchants || merchants.length === 0) {
    return { total: 0, success: 0, failed: 0, errors: [] };
  }

  const result = {
    total: merchants.length,
    success: 0,
    failed: 0,
    errors: [] as { merchantId: string; error: string }[],
  };

  // Process merchants in batches of 5 to avoid overwhelming OpenAI
  const batchSize = 5;
  for (let i = 0; i < merchants.length; i += batchSize) {
    const batch = merchants.slice(i, i + batchSize) as MerchantForBriefing[];

    const results = await Promise.allSettled(
      batch.map(async (merchant) => {
        // Check if merchant wants briefings (from preferences)
        const { data: prefs } = await supabase
          .from('ai_preferences')
          .select('daily_briefing_enabled')
          .eq('merchant_id', merchant.id)
          .single();

        // Skip if briefings disabled
        if (prefs && prefs.daily_briefing_enabled === false) {
          logger.info('Briefings disabled for merchant', { merchantId: merchant.id });
          return { skipped: true };
        }

        const briefing = await generateDailyBriefing(merchant.id);
        return { briefingId: briefing.id };
      })
    );

    for (let j = 0; j < results.length; j++) {
      const res = results[j];
      const merchant = batch[j];

      if (res.status === 'fulfilled') {
        if (!('skipped' in res.value)) {
          result.success++;
        }
      } else {
        result.failed++;
        result.errors.push({
          merchantId: merchant.id,
          error: res.reason?.message || 'Unknown error',
        });
      }
    }

    // Add small delay between batches to respect rate limits
    if (i + batchSize < merchants.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return result;
}
