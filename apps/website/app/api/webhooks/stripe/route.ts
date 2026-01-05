import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';
import { constructWebhookEvent } from '@/lib/stripe-service';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = constructWebhookEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('[StripeWebhook] Signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Log the event
    await supabase.from('billing_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      event_data: event.data.object as object,
    });

    // Handle specific events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'customer.updated':
        await handleCustomerUpdated(event.data.object as Stripe.Customer);
        break;

      default:
        console.log(`[StripeWebhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[StripeWebhook] Error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = getSupabase();
  const accountId = session.metadata?.account_id;
  const planCode = session.metadata?.plan_code;
  const billingCycle = session.metadata?.billing_cycle || 'monthly';

  if (!accountId || !planCode) {
    console.error('[StripeWebhook] Missing metadata in checkout session');
    return;
  }

  // Create subscription in our DB
  await supabase.rpc('create_subscription', {
    p_account_id: accountId,
    p_plan_code: planCode,
    p_billing_cycle: billingCycle,
    p_stripe_subscription_id: session.subscription as string,
    p_stripe_customer_id: session.customer as string,
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const supabase = getSupabase();
  const statusMap: Record<string, string> = {
    active: 'active',
    trialing: 'trialing',
    past_due: 'past_due',
    canceled: 'canceled',
    unpaid: 'past_due',
    incomplete: 'past_due',
    incomplete_expired: 'expired',
  };

  await supabase
    .from('subscriptions')
    .update({
      status: statusMap[subscription.status] || subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = getSupabase();
  await supabase
    .from('subscriptions')
    .update({
      status: 'expired',
      ended_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const supabase = getSupabase();
  // Get subscription
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('id, account_id')
    .eq('stripe_subscription_id', invoice.subscription)
    .single();

  if (!sub) return;

  // Create invoice record
  await supabase.from('invoices').upsert(
    {
      account_id: sub.account_id,
      subscription_id: sub.id,
      stripe_invoice_id: invoice.id,
      stripe_payment_intent_id: invoice.payment_intent as string,
      subtotal: invoice.subtotal,
      tax: invoice.tax || 0,
      total: invoice.total,
      amount_paid: invoice.amount_paid,
      amount_due: invoice.amount_due,
      currency: invoice.currency,
      status: 'paid',
      invoice_date: new Date(invoice.created * 1000).toISOString(),
      paid_at: new Date().toISOString(),
      invoice_pdf_url: invoice.invoice_pdf,
      hosted_invoice_url: invoice.hosted_invoice_url,
      billing_name: invoice.customer_name,
      billing_email: invoice.customer_email,
    },
    {
      onConflict: 'stripe_invoice_id',
    }
  );
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const supabase = getSupabase();
  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', invoice.subscription);

  // Send notification to user
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('account_id')
    .eq('stripe_subscription_id', invoice.subscription)
    .single();

  if (sub) {
    await supabase.rpc('send_notification', {
      p_account_id: sub.account_id,
      p_template_code: 'payment_failed',
      p_data: {
        amount: (invoice.amount_due / 100).toFixed(2),
        currency: invoice.currency.toUpperCase(),
      },
    });
  }
}

async function handleCustomerUpdated(customer: Stripe.Customer) {
  // Sync payment method updates
  if (customer.invoice_settings?.default_payment_method) {
    // Could sync default payment method here
  }
}
