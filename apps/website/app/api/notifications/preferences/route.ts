import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/notifications/preferences
 * Get notification preferences for the authenticated user
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

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { data, error } = await supabase.rpc('get_notification_preferences', {
      p_account_id: account.id,
    });

    if (error) {
      console.error('[NotificationsAPI] Get preferences error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const row = data?.[0];
    return NextResponse.json({
      preferences: row ? {
        emailEnabled: row.email_enabled,
        emailMarketing: row.email_marketing,
        emailOrders: row.email_orders,
        emailLoyalty: row.email_loyalty,
        emailContributions: row.email_contributions,
        emailTeam: row.email_team,
        emailDigestFrequency: row.email_digest_frequency,
        pushEnabled: row.push_enabled,
        pushOrders: row.push_orders,
        pushLoyalty: row.push_loyalty,
        pushPromotions: row.push_promotions,
        pushReminders: row.push_reminders,
        inappEnabled: row.inapp_enabled,
        quietHoursEnabled: row.quiet_hours_enabled,
        quietHoursStart: row.quiet_hours_start,
        quietHoursEnd: row.quiet_hours_end,
        timezone: row.timezone,
        notificationLocale: row.notification_locale,
      } : null,
    });
  } catch (err) {
    console.error('[NotificationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT /api/notifications/preferences
 * Update notification preferences
 */
export async function PUT(request: NextRequest) {
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

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();

    // Convert camelCase to snake_case
    const dbPreferences: Record<string, unknown> = {};
    const keyMap: Record<string, string> = {
      emailEnabled: 'email_enabled',
      emailMarketing: 'email_marketing',
      emailOrders: 'email_orders',
      emailLoyalty: 'email_loyalty',
      emailContributions: 'email_contributions',
      emailTeam: 'email_team',
      emailDigestFrequency: 'email_digest_frequency',
      pushEnabled: 'push_enabled',
      pushOrders: 'push_orders',
      pushLoyalty: 'push_loyalty',
      pushPromotions: 'push_promotions',
      pushReminders: 'push_reminders',
      inappEnabled: 'inapp_enabled',
      quietHoursEnabled: 'quiet_hours_enabled',
      quietHoursStart: 'quiet_hours_start',
      quietHoursEnd: 'quiet_hours_end',
      timezone: 'timezone',
      notificationLocale: 'notification_locale',
    };

    for (const [key, value] of Object.entries(body)) {
      if (key in keyMap && value !== undefined) {
        dbPreferences[keyMap[key]] = value;
      }
    }

    const { error } = await supabase.rpc('update_notification_preferences', {
      p_account_id: account.id,
      p_preferences: dbPreferences,
    });

    if (error) {
      console.error('[NotificationsAPI] Update preferences error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[NotificationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
