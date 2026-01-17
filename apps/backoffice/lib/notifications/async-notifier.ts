/**
 * Async Notification System
 *
 * Queues notifications for async processing to avoid blocking API requests.
 * Uses existing notification_queue and internal_notifications tables.
 *
 * Usage:
 * ```ts
 * import { queueNotification, queueEmailNotification, queuePushNotification } from '@/lib/notifications/async-notifier';
 *
 * // Queue a generic notification
 * await queueNotification({
 *   type: 'order_created',
 *   subject: 'New Order #123',
 *   body: 'A new order has been placed',
 *   priority: 'high',
 *   referenceType: 'order',
 *   referenceId: orderId,
 * });
 *
 * // Queue an email specifically
 * await queueEmailNotification({
 *   to: 'merchant@example.com',
 *   subject: 'Daily Report',
 *   body: 'Your daily report is ready',
 * });
 * ```
 */

import { createServiceLogger } from '@/lib/observability/logger';
import { supabaseAdmin } from '@/lib/supabase-admin';

const log = createServiceLogger('async-notifier');

// Types
export interface NotificationPayload {
  type: string;
  subject: string;
  body: string;
  priority?: 'high' | 'normal' | 'low';
  referenceType?: string;
  referenceId?: string;
  metadata?: Record<string, unknown>;
}

export interface EmailNotificationPayload {
  to: string;
  subject: string;
  body: string;
  html?: string;
  priority?: 'high' | 'normal' | 'low';
  metadata?: Record<string, unknown>;
}

export interface PushNotificationPayload {
  userId?: string;
  merchantId?: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  priority?: 'high' | 'normal' | 'low';
}

export interface WebhookNotificationPayload {
  channel: 'telegram' | 'whatsapp' | 'line' | 'zalo';
  recipientId: string;
  message: string;
  data?: Record<string, unknown>;
  priority?: 'high' | 'normal' | 'low';
}

// Priority mapping (text to integer)
const priorityMap = {
  high: 1,
  normal: 2,
  low: 3,
} as const;

/**
 * Queue an internal notification for async processing
 */
export async function queueNotification(
  payload: NotificationPayload
): Promise<{ notificationId: string; queued: boolean }> {
  try {
    const priority = priorityMap[payload.priority || 'normal'];

    // Create the internal notification
    const { data: notification, error: notifError } = await supabaseAdmin
      .from('internal_notifications')
      .insert({
        type: payload.type,
        subject: payload.subject,
        body: payload.body,
        priority,
        reference_type: payload.referenceType,
        reference_id: payload.referenceId,
        is_read: false,
      })
      .select('id')
      .single();

    if (notifError || !notification) {
      log.error({ err: notifError }, 'Failed to create notification');
      return { notificationId: '', queued: false };
    }

    // Add to processing queue
    const { error: queueError } = await supabaseAdmin.from('notification_queue').insert({
      notification_id: notification.id,
      priority,
      status: 'pending',
      attempts: 0,
      max_attempts: 3,
      process_after: new Date().toISOString(),
    });

    if (queueError) {
      log.error({ err: queueError }, 'Failed to queue notification');
      return { notificationId: notification.id, queued: false };
    }

    log.info(
      { notificationId: notification.id, type: payload.type, priority: payload.priority },
      'Notification queued'
    );

    return { notificationId: notification.id, queued: true };
  } catch (error) {
    log.error({ err: error }, 'Error queueing notification');
    return { notificationId: '', queued: false };
  }
}

/**
 * Queue an email notification
 * Stores in notification_log for email-specific processing
 */
export async function queueEmailNotification(
  payload: EmailNotificationPayload
): Promise<{ queued: boolean; error?: string }> {
  try {
    const priority = priorityMap[payload.priority || 'normal'];

    // Store in notification_log with email channel
    const { error } = await supabaseAdmin.from('notification_log').insert({
      channel: 'email',
      recipient: payload.to,
      subject: payload.subject,
      body: payload.html || payload.body,
      status: 'pending',
      metadata: payload.metadata || {},
      priority,
    });

    if (error) {
      log.error({ err: error }, 'Failed to queue email notification');
      return { queued: false, error: error.message };
    }

    log.info({ to: payload.to, subject: payload.subject }, 'Email notification queued');
    return { queued: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    log.error({ err: error }, 'Error queueing email notification');
    return { queued: false, error: message };
  }
}

/**
 * Queue a push notification
 */
export async function queuePushNotification(
  payload: PushNotificationPayload
): Promise<{ queued: boolean; error?: string }> {
  try {
    const priority = priorityMap[payload.priority || 'normal'];

    const { error } = await supabaseAdmin.from('notification_log').insert({
      channel: 'push',
      recipient: payload.userId || payload.merchantId,
      subject: payload.title,
      body: payload.body,
      status: 'pending',
      metadata: {
        userId: payload.userId,
        merchantId: payload.merchantId,
        data: payload.data,
      },
      priority,
    });

    if (error) {
      log.error({ err: error }, 'Failed to queue push notification');
      return { queued: false, error: error.message };
    }

    log.info({ userId: payload.userId, title: payload.title }, 'Push notification queued');
    return { queued: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    log.error({ err: error }, 'Error queueing push notification');
    return { queued: false, error: message };
  }
}

/**
 * Queue a webhook notification (Telegram, WhatsApp, etc.)
 */
export async function queueWebhookNotification(
  payload: WebhookNotificationPayload
): Promise<{ queued: boolean; error?: string }> {
  try {
    const priority = priorityMap[payload.priority || 'normal'];

    const { error } = await supabaseAdmin.from('notification_log').insert({
      channel: payload.channel,
      recipient: payload.recipientId,
      subject: payload.channel,
      body: payload.message,
      status: 'pending',
      metadata: payload.data || {},
      priority,
    });

    if (error) {
      log.error({ err: error }, 'Failed to queue webhook notification');
      return { queued: false, error: error.message };
    }

    log.info(
      { channel: payload.channel, recipientId: payload.recipientId },
      'Webhook notification queued'
    );
    return { queued: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    log.error({ err: error }, 'Error queueing webhook notification');
    return { queued: false, error: message };
  }
}

/**
 * Batch queue multiple notifications
 * More efficient than individual calls for bulk operations
 */
export async function queueBatchNotifications(
  notifications: NotificationPayload[]
): Promise<{ queued: number; failed: number }> {
  let queued = 0;
  let failed = 0;

  // Process in chunks to avoid overwhelming the database
  const chunkSize = 50;
  for (let i = 0; i < notifications.length; i += chunkSize) {
    const chunk = notifications.slice(i, i + chunkSize);

    const results = await Promise.allSettled(chunk.map((n) => queueNotification(n)));

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.queued) {
        queued++;
      } else {
        failed++;
      }
    }
  }

  log.info({ queued, failed, total: notifications.length }, 'Batch notifications processed');
  return { queued, failed };
}

/**
 * Non-blocking notification - fire and forget
 * Use when you don't need to wait for confirmation
 */
export function queueNotificationAsync(payload: NotificationPayload): void {
  queueNotification(payload).catch((error) => {
    log.error({ err: error, type: payload.type }, 'Background notification failed');
  });
}

/**
 * Convenience wrapper for order notifications
 */
export function notifyOrderCreated(orderId: string, merchantId: string, orderNumber: string): void {
  queueNotificationAsync({
    type: 'order_created',
    subject: `New Order #${orderNumber}`,
    body: `A new order has been placed and is waiting for confirmation.`,
    priority: 'high',
    referenceType: 'order',
    referenceId: orderId,
    metadata: { merchantId },
  });
}

/**
 * Convenience wrapper for reservation notifications
 */
export function notifyReservationCreated(
  reservationId: string,
  merchantId: string,
  guestName: string,
  dateTime: string
): void {
  queueNotificationAsync({
    type: 'reservation_created',
    subject: `New Reservation from ${guestName}`,
    body: `A new reservation has been made for ${dateTime}.`,
    priority: 'normal',
    referenceType: 'reservation',
    referenceId: reservationId,
    metadata: { merchantId, guestName, dateTime },
  });
}

export default {
  queueNotification,
  queueEmailNotification,
  queuePushNotification,
  queueWebhookNotification,
  queueBatchNotifications,
  queueNotificationAsync,
  notifyOrderCreated,
  notifyReservationCreated,
};
