/**
 * API Route: Escalation Settings
 *
 * Manages configurable escalation settings for hot action requests
 *
 * @route GET /api/settings/escalation - Get settings for a merchant
 * @route PUT /api/settings/escalation - Update settings
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// Preset configurations
const PRESETS = {
  minimal: {
    reminder_enabled: false,
    escalation_enabled: false,
    auto_reassign_enabled: false,
    critical_alert_enabled: false,
  },
  soft: {
    reminder_enabled: true,
    reminder_after_seconds: 180, // 3 min
    escalation_enabled: false,
    auto_reassign_enabled: false,
    critical_alert_enabled: false,
  },
  standard: {
    reminder_enabled: true,
    reminder_after_seconds: 120, // 2 min
    escalation_enabled: true,
    escalation_after_seconds: 300, // 5 min
    escalation_notify_push: true,
    escalation_notify_sms: false,
    escalation_notify_email: false,
    auto_reassign_enabled: false,
    critical_alert_enabled: false,
  },
  strict: {
    reminder_enabled: true,
    reminder_after_seconds: 60, // 1 min
    escalation_enabled: true,
    escalation_after_seconds: 180, // 3 min
    escalation_notify_push: true,
    escalation_notify_sms: true,
    escalation_notify_email: false,
    auto_reassign_enabled: true,
    auto_reassign_after_seconds: 300, // 5 min
    critical_alert_enabled: true,
    critical_alert_after_seconds: 600, // 10 min
    critical_alert_sound: true,
  },
};

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ success: false, error: 'Merchant ID required' }, { status: 400 });
    }

    // Get main settings
    const { data: settings, error } = await supabase
      .from('request_notification_settings')
      .select('*')
      .eq('merchant_id', merchantId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching settings:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    // Get type-specific overrides
    const { data: typeSettings } = await supabase
      .from('request_type_settings')
      .select('*')
      .eq('merchant_id', merchantId);

    // Get analytics summary (last 7 days)
    const { data: analytics } = await supabase
      .from('hot_action_requests')
      .select('created_at, acknowledged_at, completed_at, response_time_seconds')
      .eq('location_id', merchantId) // Assuming location_id matches for now
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .not('completed_at', 'is', null);

    // Calculate analytics
    const totalRequests = analytics?.length || 0;
    const avgResponseTime =
      totalRequests > 0
        ? Math.round(
            (analytics || []).reduce((sum, r) => sum + (r.response_time_seconds || 0), 0) /
              totalRequests
          )
        : 0;

    const within2min = analytics?.filter((r) => (r.response_time_seconds || 0) <= 120).length || 0;
    const within5min = analytics?.filter((r) => (r.response_time_seconds || 0) <= 300).length || 0;

    return NextResponse.json({
      success: true,
      settings: settings || {
        // Default settings if none exist
        merchant_id: merchantId,
        notify_assigned_staff: true,
        notify_dashboard: true,
        reminder_enabled: false,
        reminder_after_seconds: 120,
        escalation_enabled: false,
        escalation_after_seconds: 300,
        escalation_notify_push: true,
        escalation_notify_sms: false,
        escalation_notify_email: false,
        auto_reassign_enabled: false,
        auto_reassign_after_seconds: 300,
        critical_alert_enabled: false,
        critical_alert_after_seconds: 600,
        critical_alert_sound: true,
        active_preset: 'minimal',
      },
      typeSettings: typeSettings || [],
      analytics: {
        totalRequests,
        avgResponseTime,
        within2minPercent: totalRequests > 0 ? Math.round((within2min / totalRequests) * 100) : 0,
        within5minPercent: totalRequests > 0 ? Math.round((within5min / totalRequests) * 100) : 0,
      },
      presets: PRESETS,
    });
  } catch (error) {
    console.error('Error in escalation settings API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { merchantId, preset, settings, typeSettings } = body;

    if (!merchantId) {
      return NextResponse.json({ success: false, error: 'Merchant ID required' }, { status: 400 });
    }

    // If preset is specified, use preset values
    let settingsToSave = settings || {};
    if (preset && PRESETS[preset as keyof typeof PRESETS]) {
      settingsToSave = {
        ...settingsToSave,
        ...PRESETS[preset as keyof typeof PRESETS],
        active_preset: preset,
      };
    } else if (settings) {
      settingsToSave.active_preset = 'custom';
    }

    // Upsert main settings
    const { error: upsertError } = await supabase.from('request_notification_settings').upsert(
      {
        merchant_id: merchantId,
        ...settingsToSave,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'merchant_id',
      }
    );

    if (upsertError) {
      console.error('Error saving settings:', upsertError);
      return NextResponse.json(
        { success: false, error: 'Failed to save settings' },
        { status: 500 }
      );
    }

    // Update type-specific settings if provided
    if (typeSettings && Array.isArray(typeSettings)) {
      for (const ts of typeSettings) {
        if (!ts.request_type) continue;

        const { error: typeError } = await supabase.from('request_type_settings').upsert(
          {
            merchant_id: merchantId,
            request_type: ts.request_type,
            reminder_enabled: ts.reminder_enabled,
            reminder_after_seconds: ts.reminder_after_seconds,
            escalation_enabled: ts.escalation_enabled,
            escalation_after_seconds: ts.escalation_after_seconds,
            auto_reassign_enabled: ts.auto_reassign_enabled,
            auto_reassign_after_seconds: ts.auto_reassign_after_seconds,
            critical_alert_enabled: ts.critical_alert_enabled,
            critical_alert_after_seconds: ts.critical_alert_after_seconds,
            priority_multiplier: ts.priority_multiplier,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'merchant_id,request_type',
          }
        );

        if (typeError) {
          console.error('Error saving type settings:', typeError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Settings saved',
      activePreset: settingsToSave.active_preset,
    });
  } catch (error) {
    console.error('Error in escalation settings API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
