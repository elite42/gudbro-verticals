/**
 * Notification creation utilities for the merchant feedback system.
 *
 * These functions use supabaseAdmin (service role) to bypass RLS,
 * allowing server-side notification creation from any context.
 *
 * All functions are fire-and-forget safe: they log errors but never throw.
 */

import { supabaseAdmin } from '../supabase-admin';

// =============================================================================
// TYPES
// =============================================================================

type NotificationType = 'acknowledged' | 'status_changed' | 'resolved' | 'rejected';

interface CreateNotificationParams {
  merchantId: string;
  accountId: string;
  submissionId?: string;
  taskId?: string;
  type: NotificationType;
  title: string;
  body?: string;
}

// =============================================================================
// createFeedbackNotification
// =============================================================================

/**
 * Insert a single notification into fb_merchant_notifications.
 * Fire-and-forget safe: logs errors but never throws.
 */
export async function createFeedbackNotification(params: CreateNotificationParams): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from('fb_merchant_notifications').insert({
      merchant_id: params.merchantId,
      account_id: params.accountId,
      submission_id: params.submissionId || null,
      task_id: params.taskId || null,
      type: params.type,
      title: params.title,
      body: params.body || null,
    });

    if (error) {
      console.error('[NotificationUtils] Failed to create notification:', error.message);
    }
  } catch (err) {
    console.error(
      '[NotificationUtils] Unexpected error creating notification:',
      err instanceof Error ? err.message : err
    );
  }
}

// =============================================================================
// notifyTaskStatusChange
// =============================================================================

/** Map task status to notification type */
const STATUS_TO_TYPE: Record<string, NotificationType> = {
  in_progress: 'status_changed',
  done: 'resolved',
  rejected: 'rejected',
};

/** Map task status to notification title */
const STATUS_TO_TITLE: Record<string, string> = {
  in_progress: 'Your feedback is being worked on',
  done: 'Your feedback has been resolved',
  rejected: 'Your feedback was not accepted',
};

/**
 * Notify all submitters linked to a task when its status changes.
 *
 * Queries fb_submissions by task_id, then creates a notification for each
 * submitter that has a submitted_by_account_id.
 *
 * Designed to be called by Phase 16 kanban board handlers.
 * Fire-and-forget safe: logs errors but never throws.
 */
export async function notifyTaskStatusChange(taskId: string, newStatus: string): Promise<void> {
  try {
    const notificationType = STATUS_TO_TYPE[newStatus];
    const notificationTitle = STATUS_TO_TITLE[newStatus];

    if (!notificationType || !notificationTitle) {
      console.warn(`[NotificationUtils] Unknown status for notification: ${newStatus}`);
      return;
    }

    // Find all submissions linked to this task
    const { data: submissions, error } = await supabaseAdmin
      .from('fb_submissions')
      .select('id, merchant_id, submitted_by_account_id, original_title')
      .eq('task_id', taskId);

    if (error) {
      console.error(
        '[NotificationUtils] Failed to query submissions for task:',
        taskId,
        error.message
      );
      return;
    }

    if (!submissions || submissions.length === 0) {
      return;
    }

    // Create a notification for each submitter with an account_id
    for (const sub of submissions) {
      if (!sub.submitted_by_account_id) continue;

      await createFeedbackNotification({
        merchantId: sub.merchant_id,
        accountId: sub.submitted_by_account_id,
        submissionId: sub.id,
        taskId,
        type: notificationType,
        title: notificationTitle,
        body: `Your submission "${sub.original_title || 'Feedback'}" status updated.`,
      });
    }
  } catch (err) {
    console.error(
      '[NotificationUtils] Unexpected error in notifyTaskStatusChange:',
      err instanceof Error ? err.message : err
    );
  }
}
