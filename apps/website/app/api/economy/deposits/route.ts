import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/economy/deposits
 * Get user's prepaid deposit history
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
      .select('id, points_balance, points_earned, points_spent')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get deposits
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const {
      data: deposits,
      error,
      count,
    } = await supabase
      .from('prepaid_deposits')
      .select('*', { count: 'exact' })
      .eq('account_id', account.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[DepositsAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate totals
    const totalDeposited = deposits?.reduce((sum, d) => sum + parseFloat(d.amount_eur), 0) || 0;

    return NextResponse.json({
      deposits: deposits || [],
      total: count || 0,
      summary: {
        totalDeposited,
        pointsBalance: account.points_balance,
        pointsEarned: account.points_earned,
        pointsSpent: account.points_spent,
      },
    });
  } catch (err) {
    console.error('[DepositsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/economy/deposits
 * Create a new prepaid deposit
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
    const { amountEur, paymentMethod, paymentReference } = body;

    if (!amountEur || amountEur <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!paymentMethod) {
      return NextResponse.json({ error: 'Payment method required' }, { status: 400 });
    }

    // Call the database function to process deposit
    const { data: depositId, error } = await supabase.rpc('process_prepaid_deposit', {
      p_account_id: account.id,
      p_amount_eur: amountEur,
      p_payment_method: paymentMethod,
      p_payment_reference: paymentReference || null,
    });

    if (error) {
      console.error('[DepositsAPI] Deposit error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Get updated account balance
    const { data: updatedAccount } = await supabase
      .from('accounts')
      .select('points_balance')
      .eq('id', account.id)
      .single();

    return NextResponse.json({
      success: true,
      depositId,
      pointsCredited: Math.floor(amountEur * 100), // 1 EUR = 100 points
      newBalance: updatedAccount?.points_balance || 0,
      message: `Successfully added €${amountEur} (${Math.floor(amountEur * 100)} points)`,
    });
  } catch (err) {
    console.error('[DepositsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
