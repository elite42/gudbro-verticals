import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * POST /api/analytics/track
 * Track an analytics event
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventName,
      eventCategory,
      accountId,
      anonymousId,
      sessionId,
      pagePath,
      properties,
      deviceType,
      platform,
      merchantId,
      utmSource,
      utmMedium,
      utmCampaign,
      clientTimestamp,
    } = body;

    if (!eventName || !eventCategory) {
      return NextResponse.json(
        { error: 'eventName and eventCategory are required' },
        { status: 400 }
      );
    }

    // Optionally verify auth if accountId is provided
    let verifiedAccountId = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const { data: { user } } = await supabase.auth.getUser(token);

      if (user) {
        const { data: account } = await supabase
          .from('accounts')
          .select('id')
          .eq('auth_id', user.id)
          .single();

        if (account) {
          verifiedAccountId = account.id;
        }
      }
    }

    const { data, error } = await supabase.rpc('track_event', {
      p_event_name: eventName,
      p_event_category: eventCategory,
      p_account_id: verifiedAccountId || accountId || null,
      p_anonymous_id: anonymousId || null,
      p_session_id: sessionId || null,
      p_page_path: pagePath || null,
      p_properties: properties || {},
      p_device_type: deviceType || null,
      p_platform: platform || 'web',
      p_merchant_id: merchantId || null,
      p_utm_source: utmSource || null,
      p_utm_medium: utmMedium || null,
      p_utm_campaign: utmCampaign || null,
      p_client_timestamp: clientTimestamp || null,
    });

    if (error) {
      console.error('[AnalyticsAPI] Track event error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      eventId: data,
    }, { status: 201 });
  } catch (err) {
    console.error('[AnalyticsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
