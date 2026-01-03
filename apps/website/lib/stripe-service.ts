import Stripe from 'stripe';

// Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Types
export interface CreateCustomerParams {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface CreateSubscriptionParams {
  customerId: string;
  priceId: string;
  trialDays?: number;
  promoCode?: string;
  metadata?: Record<string, string>;
}

export interface CreateCheckoutSessionParams {
  customerId?: string;
  customerEmail?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
  promoCode?: string;
  metadata?: Record<string, string>;
}

// Customer Management
export async function createCustomer(params: CreateCustomerParams): Promise<Stripe.Customer> {
  return stripe.customers.create({
    email: params.email,
    name: params.name,
    metadata: params.metadata,
  });
}

export async function getCustomer(customerId: string): Promise<Stripe.Customer | null> {
  try {
    return (await stripe.customers.retrieve(customerId)) as Stripe.Customer;
  } catch {
    return null;
  }
}

export async function updateCustomer(
  customerId: string,
  params: Partial<CreateCustomerParams>
): Promise<Stripe.Customer> {
  return stripe.customers.update(customerId, {
    email: params.email,
    name: params.name,
    metadata: params.metadata,
  });
}

// Subscription Management
export async function createSubscription(
  params: CreateSubscriptionParams
): Promise<Stripe.Subscription> {
  const subscriptionParams: Stripe.SubscriptionCreateParams = {
    customer: params.customerId,
    items: [{ price: params.priceId }],
    metadata: params.metadata,
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  };

  if (params.trialDays && params.trialDays > 0) {
    subscriptionParams.trial_period_days = params.trialDays;
  }

  if (params.promoCode) {
    // Look up promotion code
    const promoCodes = await stripe.promotionCodes.list({
      code: params.promoCode,
      active: true,
      limit: 1,
    });
    if (promoCodes.data.length > 0) {
      subscriptionParams.promotion_code = promoCodes.data[0].id;
    }
  }

  return stripe.subscriptions.create(subscriptionParams);
}

export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription | null> {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch {
    return null;
  }
}

export async function cancelSubscription(
  subscriptionId: string,
  cancelImmediately = false
): Promise<Stripe.Subscription> {
  if (cancelImmediately) {
    return stripe.subscriptions.cancel(subscriptionId);
  }
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}

export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  return stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'create_prorations',
  });
}

// Checkout Sessions
export async function createCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<Stripe.Checkout.Session> {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: params.metadata,
  };

  if (params.customerId) {
    sessionParams.customer = params.customerId;
  } else if (params.customerEmail) {
    sessionParams.customer_email = params.customerEmail;
  }

  if (params.trialDays && params.trialDays > 0) {
    sessionParams.subscription_data = {
      trial_period_days: params.trialDays,
    };
  }

  if (params.promoCode) {
    sessionParams.allow_promotion_codes = true;
  }

  return stripe.checkout.sessions.create(sessionParams);
}

// Customer Portal
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

// Payment Methods
export async function listPaymentMethods(
  customerId: string,
  type: Stripe.PaymentMethodListParams.Type = 'card'
): Promise<Stripe.PaymentMethod[]> {
  const result = await stripe.paymentMethods.list({
    customer: customerId,
    type,
  });
  return result.data;
}

export async function attachPaymentMethod(
  paymentMethodId: string,
  customerId: string
): Promise<Stripe.PaymentMethod> {
  return stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });
}

export async function setDefaultPaymentMethod(
  customerId: string,
  paymentMethodId: string
): Promise<Stripe.Customer> {
  return stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
}

export async function detachPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod> {
  return stripe.paymentMethods.detach(paymentMethodId);
}

// Invoices
export async function listInvoices(customerId: string, limit = 10): Promise<Stripe.Invoice[]> {
  const result = await stripe.invoices.list({
    customer: customerId,
    limit,
  });
  return result.data;
}

export async function getInvoice(invoiceId: string): Promise<Stripe.Invoice | null> {
  try {
    return await stripe.invoices.retrieve(invoiceId);
  } catch {
    return null;
  }
}

export async function getUpcomingInvoice(
  customerId: string
): Promise<Stripe.UpcomingInvoice | null> {
  try {
    return await stripe.invoices.retrieveUpcoming({ customer: customerId });
  } catch {
    return null;
  }
}

// Prices
export async function listPrices(productId?: string): Promise<Stripe.Price[]> {
  const params: Stripe.PriceListParams = {
    active: true,
    expand: ['data.product'],
  };
  if (productId) {
    params.product = productId;
  }
  const result = await stripe.prices.list(params);
  return result.data;
}

export async function getPrice(priceId: string): Promise<Stripe.Price | null> {
  try {
    return await stripe.prices.retrieve(priceId);
  } catch {
    return null;
  }
}

// Promotion Codes
export async function validatePromoCode(code: string): Promise<{
  valid: boolean;
  promoCode?: Stripe.PromotionCode;
  coupon?: Stripe.Coupon;
}> {
  try {
    const promoCodes = await stripe.promotionCodes.list({
      code,
      active: true,
      limit: 1,
    });

    if (promoCodes.data.length === 0) {
      return { valid: false };
    }

    const promoCode = promoCodes.data[0];
    const coupon = promoCode.coupon as Stripe.Coupon;

    // Check if coupon is still valid
    if (coupon.redeem_by && coupon.redeem_by < Math.floor(Date.now() / 1000)) {
      return { valid: false };
    }

    if (coupon.max_redemptions && coupon.times_redeemed >= coupon.max_redemptions) {
      return { valid: false };
    }

    return { valid: true, promoCode, coupon };
  } catch {
    return { valid: false };
  }
}

// Webhook handling
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// Usage Records (for metered billing)
export async function createUsageRecord(
  subscriptionItemId: string,
  quantity: number,
  timestamp?: number
): Promise<Stripe.UsageRecord> {
  return stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
    quantity,
    timestamp: timestamp || Math.floor(Date.now() / 1000),
    action: 'increment',
  });
}

// Export stripe instance for advanced usage
export { stripe };
