import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

/**
 * Send Push Notification API
 *
 * Uses Web Push protocol to send notifications to subscribed devices.
 * Called when order status changes to 'ready'.
 */

// VAPID keys for web push authentication
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@gudbro.com';

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
 * Send a web push notification
 */
async function sendWebPush(
  endpoint: string,
  p256dh: string,
  auth: string,
  payload: PushPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    // Web Push requires JWT signing and encryption
    // For production, use the 'web-push' npm package
    // This is a simplified implementation that requires the package

    // Dynamic import to avoid bundling issues
    const webPush = await import('web-push').catch(() => null);

    if (!webPush || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      console.log('[Push] Web push not configured, skipping...');
      return { success: false, error: 'Web push not configured' };
    }

    webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

    const subscription = {
      endpoint,
      keys: {
        p256dh,
        auth,
      },
    };

    await webPush.sendNotification(subscription, JSON.stringify(payload));
    return { success: true };
  } catch (error) {
    console.error('[Push] Send error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Check if subscription is expired/invalid
    if (message.includes('410') || message.includes('404')) {
      return { success: false, error: 'subscription_expired' };
    }

    return { success: false, error: message };
  }
}

/**
 * POST /api/send-push
 * Send push notification for an order
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  try {
    const body: SendPushRequest = await request.json();
    const { orderId, sessionId, orderCode } = body;

    if (!orderId && !sessionId) {
      return NextResponse.json({ error: 'orderId or sessionId required' }, { status: 400 });
    }

    // Get the order details if not provided
    const orderDetails = { orderCode };
    if (orderId && !orderCode) {
      const { data: order } = await supabase
        .from('orders')
        .select('order_code, session_id')
        .eq('id', orderId)
        .single();

      if (order) {
        orderDetails.orderCode = order.order_code;
      }
    }

    // Find subscriptions for this session/order
    let query = supabase
      .from('notification_subscriptions')
      .select('id, endpoint, p256dh, auth')
      .eq('channel', 'web_push')
      .eq('is_active', true);

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data: subscriptions, error: subError } = await query;

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
      body: orderDetails.orderCode
        ? `Order ${orderDetails.orderCode} is ready for pickup!`
        : 'Your order is ready for pickup!',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png',
      tag: `order-ready-${orderId || 'generic'}`,
      data: {
        orderId,
        orderCode: orderDetails.orderCode,
        url: '/orders',
      },
    };

    // Send to all subscriptions
    const results = await Promise.all(
      subscriptions.map(async (sub) => {
        if (!sub.endpoint || !sub.p256dh || !sub.auth) {
          return { id: sub.id, success: false, error: 'incomplete_subscription' };
        }

        const result = await sendWebPush(sub.endpoint, sub.p256dh, sub.auth, payload);

        // If subscription is expired, mark it as inactive
        if (result.error === 'subscription_expired') {
          await supabase
            .from('notification_subscriptions')
            .update({ is_active: false, updated_at: new Date().toISOString() })
            .eq('id', sub.id);
        } else if (result.success) {
          // Update last_used_at
          await supabase
            .from('notification_subscriptions')
            .update({ last_used_at: new Date().toISOString() })
            .eq('id', sub.id);
        }

        return { id: sub.id, ...result };
      })
    );

    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return NextResponse.json({
      success: true,
      message: `Sent ${sent} notifications`,
      sent,
      failed,
      results,
    });
  } catch (error) {
    console.error('[Push] API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
