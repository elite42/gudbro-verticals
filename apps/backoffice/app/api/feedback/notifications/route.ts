import { createClient } from '@/lib/supabase-server';
import {
  withErrorHandling,
  successResponse,
  ValidationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Fetch merchant notifications
// ============================================================================

export const GET = withErrorHandling(
  async (request: Request) => {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      throw new ValidationError('merchantId is required');
    }

    const { data, error } = await supabase
      .from('fb_merchant_notifications')
      .select('id, type, title, body, is_read, submission_id, task_id, created_at')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      throw new DatabaseError('Failed to fetch notifications', { cause: error });
    }

    const notifications = data || [];
    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return successResponse({ notifications, unreadCount });
  },
  { context: 'feedback/notifications', logger: backofficeLogger }
);

// ============================================================================
// PATCH - Mark notifications as read
// ============================================================================

export const PATCH = withErrorHandling(
  async (request: Request) => {
    const supabase = await createClient();
    const body = await request.json();

    const now = new Date().toISOString();

    if (body.markAllRead === true && body.merchantId) {
      // Mark all unread notifications as read for a merchant
      const { error } = await supabase
        .from('fb_merchant_notifications')
        .update({ is_read: true, read_at: now } as Record<string, unknown>)
        .eq('merchant_id', body.merchantId)
        .eq('is_read', false);

      if (error) {
        throw new DatabaseError('Failed to mark all notifications as read', { cause: error });
      }

      return successResponse({ success: true });
    }

    if (body.notificationId) {
      // Mark single notification as read
      const { error } = await supabase
        .from('fb_merchant_notifications')
        .update({ is_read: true, read_at: now } as Record<string, unknown>)
        .eq('id', body.notificationId);

      if (error) {
        throw new DatabaseError('Failed to mark notification as read', { cause: error });
      }

      return successResponse({ success: true });
    }

    throw new ValidationError('Either notificationId or markAllRead with merchantId is required');
  },
  { context: 'feedback/notifications', logger: backofficeLogger }
);
