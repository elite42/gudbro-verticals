/**
 * Notification Queue Processor
 *
 * POST /api/notifications/process
 *
 * Processes pending notifications from the queue and sends them
 * via the appropriate channel provider.
 *
 * This endpoint should be called by:
 * - A cron job (Vercel Cron)
 * - A Supabase Edge Function
 * - Manual trigger for testing
 *
 * Security: Requires CRON_SECRET header for automated calls
 */

import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { sendEmail, textToHtml } from '@/lib/notifications/providers/email-provider';
import { sendPushNotification } from '@/lib/notifications/providers/push-provider';
import {
  sendTelegramMessage,
  formatReservationForTelegram,
} from '@/lib/notifications/providers/telegram-provider';
import {
  sendZaloMessage,
  formatReservationForZalo,
} from '@/lib/notifications/providers/zalo-provider';
import {
  sendLineText,
  formatReservationForLine,
} from '@/lib/notifications/providers/line-provider';
import {
  sendKakaoMessage,
  formatReservationForKakao,
} from '@/lib/notifications/providers/kakao-provider';
import {
  sendWhatsAppTemplate,
  formatReservationForWhatsApp,
} from '@/lib/notifications/providers/whatsapp-provider';

interface QueueItem {
  id: string;
  notification_id: string;
  priority: number;
  attempts: number;
  last_attempt: string | null;
  notification: {
    id: string;
    reservation_id: string;
    notification_type: string;
    channel: string;
    recipient: string;
    recipient_name: string | null;
    subject: string | null;
    body: string;
    status: string;
  };
}

interface ProcessResult {
  processed: number;
  sent: number;
  failed: number;
  errors: { id: string; channel: string; error: string }[];
}

export async function POST(request: NextRequest) {
  // Verify authorization
  const cronSecret = request.headers.get('x-cron-secret');
  const authHeader = request.headers.get('authorization');

  // Allow either cron secret or service role key
  const isAuthorized =
    cronSecret === process.env.CRON_SECRET ||
    authHeader === `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`;

  // In development, allow without auth for testing
  const isDev = process.env.NODE_ENV === 'development';

  if (!isAuthorized && !isDev) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const result: ProcessResult = {
      processed: 0,
      sent: 0,
      failed: 0,
      errors: [],
    };

    // Get pending notifications from queue
    // - status = 'pending'
    // - process_after <= now
    // - attempts < max_attempts (3)
    const { data: queueItems, error: fetchError } = await supabase
      .from('notification_queue')
      .select(
        `
        id,
        notification_id,
        priority,
        attempts,
        last_attempt,
        notification:reservation_notifications (
          id,
          reservation_id,
          notification_type,
          channel,
          recipient,
          recipient_name,
          subject,
          body,
          status
        )
      `
      )
      .eq('status', 'pending')
      .lte('process_after', new Date().toISOString())
      .lt('attempts', 3)
      .order('priority', { ascending: true })
      .order('created_at', { ascending: true })
      .limit(50);

    if (fetchError) {
      console.error('Error fetching queue:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!queueItems || queueItems.length === 0) {
      return NextResponse.json({
        message: 'No pending notifications',
        ...result,
      });
    }

    // Process each notification
    for (const item of queueItems as unknown as QueueItem[]) {
      result.processed++;

      // Skip if notification not found
      if (!item.notification) {
        await updateQueueStatus(supabase, item.id, 'failed', 'Notification not found');
        result.failed++;
        continue;
      }

      const notif = item.notification;

      // Skip if already processed
      if (notif.status !== 'pending' && notif.status !== 'queued') {
        await updateQueueStatus(supabase, item.id, 'completed', null);
        continue;
      }

      // Mark as processing
      await supabase
        .from('notification_queue')
        .update({
          status: 'processing',
          last_attempt: new Date().toISOString(),
          attempts: item.attempts + 1,
        } as Record<string, unknown>)
        .eq('id', item.id);

      try {
        // Send via appropriate channel
        const sendResult = await sendNotification(notif);

        if (sendResult.success) {
          // Update notification status
          await supabase
            .from('reservation_notifications')
            .update({
              status: 'sent',
              sent_at: new Date().toISOString(),
              provider_message_id: sendResult.messageId,
            } as Record<string, unknown>)
            .eq('id', notif.id);

          // Mark queue item as completed
          await updateQueueStatus(supabase, item.id, 'completed', null);
          result.sent++;
        } else {
          throw new Error(sendResult.error || 'Unknown send error');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        // Check if we should retry
        const shouldRetry = item.attempts < 2;

        if (shouldRetry) {
          // Calculate exponential backoff
          const backoffMinutes = Math.pow(2, item.attempts + 1); // 2, 4, 8 minutes
          const nextAttempt = new Date();
          nextAttempt.setMinutes(nextAttempt.getMinutes() + backoffMinutes);

          await supabase
            .from('notification_queue')
            .update({
              status: 'pending',
              process_after: nextAttempt.toISOString(),
              error_message: errorMessage,
            } as Record<string, unknown>)
            .eq('id', item.id);
        } else {
          // Max attempts reached - mark as failed
          await updateQueueStatus(supabase, item.id, 'failed', errorMessage);

          await supabase
            .from('reservation_notifications')
            .update({
              status: 'failed',
              error_message: errorMessage,
            } as Record<string, unknown>)
            .eq('id', notif.id);
        }

        result.failed++;
        result.errors.push({
          id: notif.id,
          channel: notif.channel,
          error: errorMessage,
        });
      }
    }

    return NextResponse.json({
      message: 'Processing complete',
      ...result,
    });
  } catch (error) {
    console.error('Notification processing error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Send notification via appropriate channel
 */
async function sendNotification(
  notification: QueueItem['notification']
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { channel, recipient, recipient_name, subject, body, notification_type } = notification;

  switch (channel) {
    case 'email':
      return sendEmail({
        to: recipient,
        subject: subject || 'Reservation Notification',
        text: body,
        html: textToHtml(body),
      });

    case 'push':
      return sendPushNotification({
        accountId: recipient,
        title: subject || 'Reservation Update',
        body,
        data: {
          type: notification_type,
          reservationId: notification.reservation_id,
        },
      });

    case 'telegram': {
      const formattedMessage = formatReservationForTelegram(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant', // Would come from reservation data
        date: '', // Would come from reservation data
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const telegramResult = await sendTelegramMessage({
        chatId: recipient,
        text: formattedMessage || body,
        parseMode: 'HTML',
      });

      return {
        success: telegramResult.success,
        messageId: telegramResult.messageId?.toString(),
        error: telegramResult.error,
      };
    }

    case 'sms':
      // SMS provider not implemented yet - skip
      return { success: false, error: 'SMS provider not configured' };

    case 'whatsapp': {
      const whatsappData = formatReservationForWhatsApp(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const whatsappResult = await sendWhatsAppTemplate(
        recipient,
        whatsappData.templateName,
        whatsappData.languageCode,
        whatsappData.variables
      );

      return {
        success: whatsappResult.success,
        messageId: whatsappResult.messageId,
        error: whatsappResult.error,
      };
    }

    case 'line': {
      const lineMessage = formatReservationForLine(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const lineResult = await sendLineText(recipient, lineMessage);
      return {
        success: lineResult.success,
        error: lineResult.error,
      };
    }

    case 'zalo': {
      const zaloMessage = formatReservationForZalo(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const zaloResult = await sendZaloMessage({
        userId: recipient,
        text: zaloMessage,
      });

      return {
        success: zaloResult.success,
        messageId: zaloResult.messageId,
        error: zaloResult.error,
      };
    }

    case 'kakao': {
      const kakaoMessage = formatReservationForKakao(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const kakaoResult = await sendKakaoMessage({
        userId: recipient,
        message: kakaoMessage,
      });

      return {
        success: kakaoResult.success,
        messageId: kakaoResult.messageId,
        error: kakaoResult.error,
      };
    }

    default:
      return { success: false, error: `Unknown channel: ${channel}` };
  }
}

/**
 * Update queue item status
 */
async function updateQueueStatus(
  supabase: SupabaseClient,
  queueId: string,
  status: string,
  errorMessage: string | null
) {
  await supabase
    .from('notification_queue')
    .update({
      status,
      error_message: errorMessage,
      processed_at: status === 'completed' || status === 'failed' ? new Date().toISOString() : null,
    } as Record<string, unknown>)
    .eq('id', queueId);
}

// Also support GET for manual check/health
export async function GET() {
  return NextResponse.json({
    service: 'notification-processor',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
