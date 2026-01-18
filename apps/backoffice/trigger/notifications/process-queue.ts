/**
 * Notification Queue Processor
 *
 * Processes pending notifications from the queue and sends them
 * via the appropriate channel provider.
 *
 * Replaces: /api/notifications/process (cron endpoint)
 * Schedule: Every 1 minute
 */

import { schedules, task, logger } from '@trigger.dev/sdk/v3';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { sendNotification } from './send-notification';

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

// Scheduled task - runs every minute
export const notificationQueueProcessor = schedules.task({
  id: 'notification-queue-processor',
  cron: '* * * * *', // Every minute
  run: async () => {
    const result = await processNotificationQueue();
    logger.info('Notification queue processed', { ...result });
    return result;
  },
});

// Also export as a regular task for manual triggering
export const processNotificationQueueTask = task({
  id: 'process-notification-queue',
  run: async () => {
    return await processNotificationQueue();
  },
});

async function processNotificationQueue(): Promise<ProcessResult> {
  const supabase = getSupabaseAdmin();
  const result: ProcessResult = {
    processed: 0,
    sent: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Get pending notifications from queue
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
      logger.error('Error fetching queue', { error: fetchError });
      throw new Error(fetchError.message);
    }

    if (!queueItems || queueItems.length === 0) {
      logger.info('No pending notifications');
      return result;
    }

    // Process each notification
    for (const item of queueItems as unknown as QueueItem[]) {
      result.processed++;

      if (!item.notification) {
        await updateQueueStatus(supabase, item.id, 'failed', 'Notification not found');
        result.failed++;
        continue;
      }

      const notif = item.notification;

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
        })
        .eq('id', item.id);

      try {
        const sendResult = await sendNotification(notif);

        if (sendResult.success) {
          await supabase
            .from('reservation_notifications')
            .update({
              status: 'sent',
              sent_at: new Date().toISOString(),
              provider_message_id: sendResult.messageId,
            })
            .eq('id', notif.id);

          await updateQueueStatus(supabase, item.id, 'completed', null);
          result.sent++;
          logger.info('Notification sent', { id: notif.id, channel: notif.channel });
        } else {
          throw new Error(sendResult.error || 'Unknown send error');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const shouldRetry = item.attempts < 2;

        if (shouldRetry) {
          const backoffMinutes = Math.pow(2, item.attempts + 1);
          const nextAttempt = new Date();
          nextAttempt.setMinutes(nextAttempt.getMinutes() + backoffMinutes);

          await supabase
            .from('notification_queue')
            .update({
              status: 'pending',
              process_after: nextAttempt.toISOString(),
              error_message: errorMessage,
            })
            .eq('id', item.id);
        } else {
          await updateQueueStatus(supabase, item.id, 'failed', errorMessage);
          await supabase
            .from('reservation_notifications')
            .update({
              status: 'failed',
              error_message: errorMessage,
            })
            .eq('id', notif.id);
        }

        result.failed++;
        result.errors.push({
          id: notif.id,
          channel: notif.channel,
          error: errorMessage,
        });
        logger.error('Notification failed', { id: notif.id, error: errorMessage });
      }
    }

    return result;
  } catch (error) {
    logger.error('Queue processing error', { error });
    throw error;
  }
}

async function updateQueueStatus(
  supabase: ReturnType<typeof getSupabaseAdmin>,
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
    })
    .eq('id', queueId);
}
