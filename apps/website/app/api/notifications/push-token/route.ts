import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * POST /api/notifications/push-token
 * Register a push notification token
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { pushToken, platform, deviceName, deviceId } = body;

    if (!pushToken || !platform) {
      return NextResponse.json({ error: 'pushToken and platform are required' }, { status: 400 });
    }

    if (!['ios', 'android', 'web'].includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform. Must be ios, android, or web' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc('register_push_token', {
      p_account_id: account.id,
      p_token: pushToken,
      p_platform: platform,
      p_device_name: deviceName || null,
      p_device_id: deviceId || null,
    });

    if (error) {
      console.error('[NotificationsAPI] Register token error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        tokenId: data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[NotificationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/notifications/push-token
 * Deactivate a push notification token
 */
export async function DELETE(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await request.json();
    const { pushToken } = body;

    if (!pushToken) {
      return NextResponse.json({ error: 'pushToken is required' }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('deactivate_push_token', {
      p_token: pushToken,
    });

    if (error) {
      console.error('[NotificationsAPI] Deactivate token error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: data === true });
  } catch (err) {
    console.error('[NotificationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
