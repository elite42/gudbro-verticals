import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/billing/payment-methods
 * Get user's payment methods
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

    const { data: methods, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('account_id', account.id)
      .eq('is_valid', true)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[PaymentMethodsAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      paymentMethods:
        methods?.map((pm) => ({
          id: pm.id,
          type: pm.type,
          isDefault: pm.is_default,
          card:
            pm.type === 'card'
              ? {
                  brand: pm.card_brand,
                  last4: pm.card_last4,
                  expMonth: pm.card_exp_month,
                  expYear: pm.card_exp_year,
                }
              : null,
          sepa:
            pm.type === 'sepa_debit'
              ? {
                  last4: pm.sepa_last4,
                  bankCode: pm.sepa_bank_code,
                }
              : null,
        })) || [],
    });
  } catch (err) {
    console.error('[PaymentMethodsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/billing/payment-methods?id=xxx
 * Remove a payment method
 */
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const methodId = searchParams.get('id');

    if (!methodId) {
      return NextResponse.json({ error: 'id parameter required' }, { status: 400 });
    }

    // Get payment method
    const { data: method } = await supabase
      .from('payment_methods')
      .select('stripe_payment_method_id, is_default')
      .eq('id', methodId)
      .eq('account_id', account.id)
      .single();

    if (!method) {
      return NextResponse.json({ error: 'Payment method not found' }, { status: 404 });
    }

    if (method.is_default) {
      return NextResponse.json({ error: 'Cannot remove default payment method' }, { status: 400 });
    }

    // Detach from Stripe
    if (method.stripe_payment_method_id) {
      const { detachPaymentMethod } = await import('@/lib/stripe-service');
      await detachPaymentMethod(method.stripe_payment_method_id);
    }

    // Mark as invalid in our DB
    const { error } = await supabase
      .from('payment_methods')
      .update({ is_valid: false, updated_at: new Date().toISOString() })
      .eq('id', methodId);

    if (error) {
      console.error('[PaymentMethodsAPI] Delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment method removed',
    });
  } catch (err) {
    console.error('[PaymentMethodsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
