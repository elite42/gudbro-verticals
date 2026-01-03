import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as stripeService from '@/lib/stripe-service';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * POST /api/subscriptions/checkout
 * Create Stripe Checkout session for paid subscription
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
      .select('id, email, display_name')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();
    const { planCode, billingCycle, promoCode, successUrl, cancelUrl } = body;

    if (!planCode) {
      return NextResponse.json({ error: 'planCode required' }, { status: 400 });
    }

    // Get plan with Stripe price ID
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('plan_code', planCode)
      .eq('is_active', true)
      .single();

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    const priceId = billingCycle === 'yearly' 
      ? plan.stripe_price_id_yearly 
      : plan.stripe_price_id_monthly;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price not configured for this plan' },
        { status: 400 }
      );
    }

    // Check for existing Stripe customer
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('account_id', account.id)
      .not('stripe_customer_id', 'is', null)
      .limit(1)
      .single();

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gudbro.com';
    
    const session = await stripeService.createCheckoutSession({
      customerId: existingSubscription?.stripe_customer_id,
      customerEmail: existingSubscription ? undefined : account.email,
      priceId,
      successUrl: successUrl || `${baseUrl}/account/subscription?success=true`,
      cancelUrl: cancelUrl || `${baseUrl}/pricing?canceled=true`,
      promoCode,
      metadata: {
        account_id: account.id,
        plan_code: planCode,
        billing_cycle: billingCycle || 'monthly',
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    console.error('[CheckoutAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
