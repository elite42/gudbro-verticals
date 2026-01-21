import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import webPush from 'web-push';

export const dynamic = 'force-dynamic';

/**
 * Send Push Notification API - Backoffice
 *
 * Called from kitchen display when order status changes to 'ready'.
 * Sends web push notifications to subscribed customer devices.
 */

// VAPID keys for web push authentication
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@gudbro.com';

// Configure web-push with VAPID keys
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

interface SendPushRequest {
  orderId: string;
  sessionId?: string;
  orderCode?: string;
}

interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, unknown>;
}

/**
 * POST /api/send-push
 * Send push notification for an order
 */
export async function POST(request: NextRequest) {
  try {
    // Check if VAPID is configured
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      console.log('[Push] VAPID keys not configured, skipping...');
      return NextResponse.json({
        success: true,
        message: 'Push notifications not configured',
        sent: 0,
      });
    }

    const body: SendPushRequest = await request.json();
    const { orderId, sessionId, orderCode } = body;

    if (!sessionId) {
      return NextResponse.json({
        success: true,
        message: 'No sessionId provided',
        sent: 0,
      });
    }

    // Find subscriptions for this session
    const { data: subscriptions, error: subError } = await supabaseAdmin
      .from('notification_subscriptions')
      .select('id, endpoint, p256dh, auth')
      .eq('channel', 'web_push')
      .eq('is_active', true)
      .eq('session_id', sessionId);

    if (subError) {
      console.error('[Push] Subscription query error:', subError);
      throw subError;
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active subscriptions found',
        sent: 0,
      });
    }

    // Prepare notification payload
    const payload: PushPayload = {
      title: '🔔 Your Order is Ready!',
      body: orderCode
        ? `Order ${orderCode} is ready for pickup!`
        : 'Your order is ready for pickup!',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png',
      tag: `order-ready-${orderId || 'generic'}`,
      data: {
        orderId,
        orderCode,
        url: '/orders',
      },
    };

    // Send to all subscriptions
    const results = await Promise.all(
      subscriptions.map(async (sub) => {
        if (!sub.endpoint || !sub.p256dh || !sub.auth) {
          return { id: sub.id, success: false, error: 'incomplete_subscription' };
        }

        try {
          const subscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          };

          await webPush.sendNotification(subscription, JSON.stringify(payload));

          // Update last_used_at
          await supabaseAdmin
            .from('notification_subscriptions')
            .update({ last_used_at: new Date().toISOString() })
            .eq('id', sub.id);

          return { id: sub.id, success: true };
        } catch (error) {
          console.error('[Push] Send error:', error);
          const message = error instanceof Error ? error.message : 'Unknown error';

          // If subscription is expired/invalid, mark as inactive
          if (message.includes('410') || message.includes('404')) {
            await supabaseAdmin
              .from('notification_subscriptions')
              .update({ is_active: false, updated_at: new Date().toISOString() })
              .eq('id', sub.id);
            return { id: sub.id, success: false, error: 'subscription_expired' };
          }

          return { id: sub.id, success: false, error: message };
        }
      })
    );

    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    console.log(`[Push] Sent ${sent} notifications (${failed} failed) for order ${orderCode}`);

    return NextResponse.json({
      success: true,
      message: `Sent ${sent} notifications`,
      sent,
      failed,
    });
  } catch (error) {
    console.error('[Push] API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
