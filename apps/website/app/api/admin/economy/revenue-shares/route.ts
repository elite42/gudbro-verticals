import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/economy/revenue-shares
 * Get merchant revenue share records
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
      .select('id, account_type')
      .eq('auth_id', user.id)
      .single();

    if (!account || account.account_type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const merchantId = searchParams.get('merchantId');

    let query = supabase
      .from('merchant_revenue_shares')
      .select(
        `
        *,
        merchant:merchants(id, business_name, partner_tier)
      `
      )
      .order('period_month', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (merchantId) {
      query = query.eq('merchant_id', merchantId);
    }

    const { data: shares, error } = await query.limit(100);

    if (error) {
      console.error('[RevenueSharesAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate totals by status
    const { data: statusCounts } = await supabase
      .from('merchant_revenue_shares')
      .select('status, total_revenue_share_eur')
      .order('status');

    const totals = {
      pending: 0,
      calculated: 0,
      approved: 0,
      paid: 0,
      held: 0,
    };

    statusCounts?.forEach((s) => {
      if (s.status in totals) {
        totals[s.status as keyof typeof totals] += parseFloat(s.total_revenue_share_eur || 0);
      }
    });

    return NextResponse.json({
      shares: shares || [],
      totals,
    });
  } catch (err) {
    console.error('[RevenueSharesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/economy/revenue-shares
 * Calculate revenue shares for a merchant/period
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-cron-secret');

    if (cronSecret !== process.env.CRON_SECRET) {
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
        .select('id, account_type')
        .eq('auth_id', user.id)
        .single();

      if (!account || account.account_type !== 'admin') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    const body = await request.json();
    const { merchantId, month } = body;

    if (!merchantId || !month) {
      return NextResponse.json({ error: 'merchantId and month required' }, { status: 400 });
    }

    // Call the database function
    const { data: shareId, error } = await supabase.rpc('calculate_merchant_revenue_share', {
      p_merchant_id: merchantId,
      p_month: month,
    });

    if (error) {
      console.error('[RevenueSharesAPI] Calculation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the created record
    const { data: share } = await supabase
      .from('merchant_revenue_shares')
      .select('*')
      .eq('id', shareId)
      .single();

    return NextResponse.json({
      success: true,
      shareId,
      share,
      message: `Revenue share calculated for ${month}`,
    });
  } catch (err) {
    console.error('[RevenueSharesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/economy/revenue-shares
 * Update revenue share status (approve, pay, hold)
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

    const { data: account } = await supabase
      .from('accounts')
      .select('id, account_type')
      .eq('auth_id', user.id)
      .single();

    if (!account || account.account_type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { shareId, action, payoutMethod, notes } = body;

    if (!shareId || !action) {
      return NextResponse.json({ error: 'shareId and action required' }, { status: 400 });
    }

    const validActions = ['approve', 'pay', 'hold', 'release'];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    switch (action) {
      case 'approve':
        updateData.status = 'approved';
        break;
      case 'pay':
        updateData.status = 'paid';
        updateData.paid_at = new Date().toISOString();
        updateData.payout_method = payoutMethod || 'bank_transfer';
        break;
      case 'hold':
        updateData.status = 'held';
        updateData.admin_notes = notes;
        break;
      case 'release':
        updateData.status = 'approved';
        updateData.admin_notes = null;
        break;
    }

    const { error } = await supabase
      .from('merchant_revenue_shares')
      .update(updateData)
      .eq('id', shareId);

    if (error) {
      console.error('[RevenueSharesAPI] Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log economy event
    await supabase.from('economy_events').insert({
      event_type: action === 'pay' ? 'payout' : 'revenue_share',
      reference_table: 'merchant_revenue_shares',
      reference_id: shareId,
      created_by: account.id,
      event_data: { action, payout_method: payoutMethod, notes },
    });

    return NextResponse.json({
      success: true,
      message: `Revenue share ${action}ed successfully`,
    });
  } catch (err) {
    console.error('[RevenueSharesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
