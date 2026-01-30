import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Fetch merchant notifications
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('fb_merchant_notifications')
      .select('id, type, title, body, is_read, submission_id, task_id, created_at')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching notifications:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const notifications = data || [];
    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error('Error in GET /api/feedback/notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PATCH - Mark notifications as read
// ============================================================================

export async function PATCH(request: NextRequest) {
  try {
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
        console.error('Error marking all notifications as read:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    if (body.notificationId) {
      // Mark single notification as read
      const { error } = await supabase
        .from('fb_merchant_notifications')
        .update({ is_read: true, read_at: now } as Record<string, unknown>)
        .eq('id', body.notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Either notificationId or markAllRead with merchantId is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in PATCH /api/feedback/notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
