import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Initialize Supabase client with service role for bypassing RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface PushSubscriptionData {
  endpoint: string;
  expirationTime?: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface SubscriptionRequest {
  subscription: PushSubscriptionData;
  orderId?: string;
  sessionId?: string;
}

/**
 * POST /api/push-subscription
 * Save a new push subscription
 */
export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionRequest = await request.json();
    const { subscription, sessionId } = body;

    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 });
    }

    // Get session ID from cookie or body
    const cookieSessionId = request.cookies.get('gudbro-session-id')?.value;
    const finalSessionId = sessionId || cookieSessionId || `anon-${Date.now()}`;

    // Get user agent for device identification
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Check if subscription already exists
    const { data: existing } = await supabase
      .from('notification_subscriptions')
      .select('id')
      .eq('endpoint', subscription.endpoint)
      .single();

    if (existing) {
      // Update existing subscription
      const { error: updateError } = await supabase
        .from('notification_subscriptions')
        .update({
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
          is_active: true,
          updated_at: new Date().toISOString(),
          last_used_at: new Date().toISOString(),
          expires_at: subscription.expirationTime
            ? new Date(subscription.expirationTime).toISOString()
            : null,
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Push subscription update error:', updateError);
        throw updateError;
      }

      return NextResponse.json({
        success: true,
        message: 'Subscription updated',
        subscriptionId: existing.id,
      });
    }

    // Create new subscription
    const subscriptionData = {
      session_id: finalSessionId,
      channel: 'web_push',
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
      is_active: true,
      user_agent: userAgent,
      expires_at: subscription.expirationTime
        ? new Date(subscription.expirationTime).toISOString()
        : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newSubscription, error: insertError } = await supabase
      .from('notification_subscriptions')
      .insert(subscriptionData)
      .select('id')
      .single();

    if (insertError) {
      console.error('Push subscription insert error:', insertError);
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription created',
      subscriptionId: newSubscription.id,
    });
  } catch (error) {
    console.error('Push subscription POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/push-subscription
 * Remove a push subscription
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint required' }, { status: 400 });
    }

    // Soft delete - mark as inactive
    const { error } = await supabase
      .from('notification_subscriptions')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('endpoint', endpoint);

    if (error) {
      console.error('Push subscription delete error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription removed',
    });
  } catch (error) {
    console.error('Push subscription DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/push-subscription
 * Check subscription status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const sessionId = searchParams.get('sessionId');

    if (!endpoint && !sessionId) {
      return NextResponse.json({ error: 'endpoint or sessionId required' }, { status: 400 });
    }

    let query = supabase
      .from('notification_subscriptions')
      .select('id, channel, is_active, created_at')
      .eq('is_active', true);

    if (endpoint) {
      query = query.eq('endpoint', endpoint);
    }
    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Push subscription GET error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      subscriptions: data || [],
      isSubscribed: (data?.length || 0) > 0,
    });
  } catch (error) {
    console.error('Push subscription GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
