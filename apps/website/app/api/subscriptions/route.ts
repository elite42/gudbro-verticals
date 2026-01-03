import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/subscriptions
 * Get current user's subscription
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id, is_premium, premium_until')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get current subscription
    const { data: subscription } = await supabase.rpc('get_current_subscription', {
      p_account_id: account.id,
    });

    // Get available plans
    const { data: plans } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .eq('is_public', true)
      .order('sort_order');

    return NextResponse.json({
      subscription: subscription?.[0] || null,
      isPremium: account.is_premium,
      premiumUntil: account.premium_until,
      availablePlans: plans?.map(p => ({
        code: p.plan_code,
        name: p.plan_name,
        description: p.description,
        type: p.plan_type,
        priceMonthly: p.price_monthly,
        priceYearly: p.price_yearly,
        currency: p.currency,
        features: p.features,
        badge: p.badge_text,
      })) || [],
    });
  } catch (err) {
    console.error('[SubscriptionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/subscriptions
 * Create a new subscription (for free or internal use)
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

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
    const { planCode, billingCycle, trialDays } = body;

    if (!planCode) {
      return NextResponse.json({ error: 'planCode required' }, { status: 400 });
    }

    // Only allow free plans through this endpoint
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('price_monthly')
      .eq('plan_code', planCode)
      .single();

    if (plan && plan.price_monthly > 0) {
      return NextResponse.json(
        { error: 'Paid plans require checkout. Use /api/subscriptions/checkout' },
        { status: 400 }
      );
    }

    // Create subscription
    const { data: subscriptionId, error } = await supabase.rpc('create_subscription', {
      p_account_id: account.id,
      p_plan_code: planCode,
      p_billing_cycle: billingCycle || 'monthly',
      p_trial_days: trialDays || 0,
    });

    if (error) {
      console.error('[SubscriptionsAPI] Create error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      subscriptionId,
      message: 'Subscription created successfully',
    });
  } catch (err) {
    console.error('[SubscriptionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/subscriptions
 * Cancel current subscription
 */
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

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
    const immediately = searchParams.get('immediately') === 'true';
    const reason = searchParams.get('reason');

    // Get active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id, stripe_subscription_id')
      .eq('account_id', account.id)
      .in('status', ['active', 'trialing'])
      .single();

    if (!subscription) {
      return NextResponse.json({ error: 'No active subscription' }, { status: 404 });
    }

    // If Stripe subscription, cancel via Stripe
    if (subscription.stripe_subscription_id) {
      const { cancelSubscription } = await import('@/lib/stripe-service');
      await cancelSubscription(subscription.stripe_subscription_id, immediately);
    }

    // Cancel in our DB
    const { data: success, error } = await supabase.rpc('cancel_subscription', {
      p_subscription_id: subscription.id,
      p_cancel_immediately: immediately,
      p_reason: reason,
    });

    if (error) {
      console.error('[SubscriptionsAPI] Cancel error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: immediately 
        ? 'Subscription canceled immediately' 
        : 'Subscription will be canceled at period end',
    });
  } catch (err) {
    console.error('[SubscriptionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
