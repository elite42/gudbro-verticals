import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/economy/config
 * Get all economy configuration (admin only)
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

    // Check if admin
    const { data: account } = await supabase
      .from('accounts')
      .select('id, account_type')
      .eq('auth_id', user.id)
      .single();

    if (!account || account.account_type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { data: configs, error } = await supabase
      .from('points_economy_config')
      .select('*')
      .order('config_key');

    if (error) {
      console.error('[AdminConfigAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ configs: configs || [] });
  } catch (err) {
    console.error('[AdminConfigAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/economy/config
 * Update economy configuration
 */
export async function PATCH(request: NextRequest) {
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

    // Check if admin
    const { data: account } = await supabase
      .from('accounts')
      .select('id, account_type')
      .eq('auth_id', user.id)
      .single();

    if (!account || account.account_type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { configKey, configValue } = body;

    if (!configKey || !configValue) {
      return NextResponse.json({ error: 'configKey and configValue required' }, { status: 400 });
    }

    // Update config
    const { error } = await supabase
      .from('points_economy_config')
      .update({
        config_value: configValue,
        updated_at: new Date().toISOString(),
        updated_by: account.id,
      })
      .eq('config_key', configKey);

    if (error) {
      console.error('[AdminConfigAPI] Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log economy event
    await supabase.from('economy_events').insert({
      event_type: 'config_change',
      created_by: account.id,
      event_data: { config_key: configKey, new_value: configValue },
    });

    return NextResponse.json({ success: true, message: `Config ${configKey} updated` });
  } catch (err) {
    console.error('[AdminConfigAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
