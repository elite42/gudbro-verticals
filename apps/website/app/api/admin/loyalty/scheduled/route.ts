import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Check if user is GudBro admin
 */
async function isGudBroAdmin(accountId: string): Promise<boolean> {
  const { data } = await supabase
    .from('account_roles')
    .select('role_type, permissions')
    .eq('account_id', accountId)
    .eq('role_type', 'admin')
    .eq('is_active', true)
    .single();

  return !!data;
}

/**
 * Verify cron secret for automated jobs
 */
function verifyCronSecret(request: NextRequest): boolean {
  const cronSecret = request.headers.get('x-cron-secret');
  const expectedSecret = process.env.CRON_SECRET;

  // If no secret configured, require admin auth instead
  if (!expectedSecret) {
    return false;
  }

  return cronSecret === expectedSecret;
}

/**
 * POST /api/admin/loyalty/scheduled
 * Run scheduled loyalty jobs (expire redemptions, award anniversaries)
 *
 * Can be called by:
 * 1. Admin user with Bearer token
 * 2. Cron job with x-cron-secret header
 */
export async function POST(request: NextRequest) {
  try {
    const isCronJob = verifyCronSecret(request);

    // If not a cron job, verify admin auth
    if (!isCronJob) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const token = authHeader.substring(7);
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }

      const { data: account } = await supabase
        .from('accounts')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      if (!account || !(await isGudBroAdmin(account.id))) {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    const body = await request.json().catch(() => ({}));
    const jobs = body.jobs || ['expire_redemptions', 'subscription_anniversaries'];

    const results: Record<string, unknown> = {};

    // Run requested jobs
    if (jobs.includes('expire_redemptions')) {
      const { data, error } = await supabase.rpc('expire_old_redemptions');
      if (error) {
        results.expire_redemptions = { error: error.message };
      } else {
        results.expire_redemptions = { expired: data };
      }
    }

    if (jobs.includes('subscription_anniversaries')) {
      const { data, error } = await supabase.rpc('award_subscription_anniversaries');
      if (error) {
        results.subscription_anniversaries = { error: error.message };
      } else {
        results.subscription_anniversaries = { awarded: data };
      }
    }

    return NextResponse.json({
      success: true,
      executedAt: new Date().toISOString(),
      source: isCronJob ? 'cron' : 'admin',
      results,
    });
  } catch (err) {
    console.error('[ScheduledJobsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/admin/loyalty/scheduled
 * Get status of scheduled jobs
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get pending items for each job
    const { count: pendingExpirations } = await supabase
      .from('reward_redemptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')
      .lt('valid_until', new Date().toISOString());

    // Get today's anniversaries count (approximate)
    const today = new Date();
    const { data: anniversaryData } = await supabase
      .from('merchant_roles')
      .select('subscription_start')
      .not('subscription_start', 'is', null);

    const anniversariesToday = (anniversaryData || []).filter((mr: { subscription_start: string }) => {
      if (!mr.subscription_start) return false;
      const subDate = new Date(mr.subscription_start);
      return subDate.getMonth() === today.getMonth() &&
             subDate.getDate() === today.getDate();
    }).length;

    return NextResponse.json({
      jobs: [
        {
          name: 'expire_redemptions',
          description: 'Expire redemptions past valid_until date',
          suggestedSchedule: 'Every hour',
          pendingItems: pendingExpirations || 0,
          endpoint: 'POST /api/admin/loyalty/scheduled',
          payload: { jobs: ['expire_redemptions'] },
        },
        {
          name: 'subscription_anniversaries',
          description: 'Award anniversary points to merchants',
          suggestedSchedule: 'Daily at midnight',
          pendingItems: anniversariesToday,
          endpoint: 'POST /api/admin/loyalty/scheduled',
          payload: { jobs: ['subscription_anniversaries'] },
        },
      ],
      cronSetup: {
        note: 'Set CRON_SECRET env var and pass as x-cron-secret header',
        example: 'curl -X POST -H "x-cron-secret: YOUR_SECRET" /api/admin/loyalty/scheduled',
      },
    });
  } catch (err) {
    console.error('[ScheduledJobsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
