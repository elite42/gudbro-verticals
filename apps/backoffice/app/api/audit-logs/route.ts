/**
 * Audit Logs API
 *
 * GET /api/audit-logs - Get audit logs for the current merchant
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { getSession } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const action = searchParams.get('action');

    const supabase = createClient();

    // Get user's merchant
    const { data: merchantUser } = await supabase
      .from('merchant_users')
      .select('merchant_id, role')
      .eq('user_id', session.user.id)
      .single();

    // Only allow owners/admins to view audit logs
    if (!merchantUser || !['owner', 'admin'].includes(merchantUser.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch audit logs
    let query = supabase
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .eq('merchant_id', merchantUser.merchant_id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (action) {
      query = query.eq('action', action);
    }

    const { data: logs, error, count } = await query;

    if (error) {
      console.error('Audit logs fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }

    return NextResponse.json({
      logs: logs || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Audit logs API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
