/**
 * Stripe Client Singleton for Accommodations
 *
 * Lazy initialization pattern (same as supabase.ts).
 * Build passes without STRIPE_SECRET_KEY; fails at runtime if missing.
 *
 * USE ONLY in server-side API routes (never import in client components).
 */
import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.warn('STRIPE_SECRET_KEY not set. Stripe client will not work. Add it to .env.local');
    // Return instance with empty key -- will fail on API calls but allows build
    _stripe = new Stripe('', { apiVersion: '2023-10-16' });
    return _stripe;
  }

  _stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' });
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const client = getStripe();
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
