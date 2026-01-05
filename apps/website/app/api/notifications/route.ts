import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/notifications
 * Get in-app notifications for the authenticated user
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Get notifications
    const { data: notifications } = await supabase.rpc('get_inapp_notifications', {
      p_account_id: account.id,
      p_limit: limit,
      p_offset: offset,
    });

    // Get unread count
    const { data: unreadCount } = await supabase.rpc('get_unread_notifications_count', {
      p_account_id: account.id,
    });

    return NextResponse.json({
      notifications: (notifications || []).map((n: any) => ({
        notificationId: n.notification_id,
        category: n.category,
        title: n.title,
        body: n.body,
        data: n.data || {},
        isRead: n.is_read,
        createdAt: n.created_at,
      })),
      unreadCount: unreadCount || 0,
    });
  } catch (err) {
    console.error('[NotificationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
