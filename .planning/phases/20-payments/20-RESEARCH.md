# Phase 20: Payments - Research

**Researched:** 2026-01-31
**Domain:** Payment integration (Stripe Checkout, manual payments, crypto deep-links) for accommodation bookings
**Confidence:** HIGH

## Summary

Phase 20 adds payment method configuration for property owners and payment processing for guests during the booking flow. The codebase already has significant infrastructure in place: the `accom_bookings` table has `payment_method`, `payment_status`, `stripe_payment_intent_id`, and `stripe_checkout_session_id` columns (migration 083); the `accom_properties` table has `accepted_payment_methods` (TEXT[]) and `stripe_account_id`; a stubbed Stripe webhook handler exists at `/api/webhooks/stripe/route.ts`; and `@shared/payment` provides types, crypto currency configs, and utility functions. The `stripe` package (v14.x) is already installed.

The standard approach is: (1) extend the DB schema with deposit/cancellation config columns, (2) add payment method selection to the guest booking form, (3) create a Stripe Checkout Session API route for card payments, (4) implement the webhook handler for payment confirmation/expiry, (5) add bank transfer instructions display, (6) add crypto deep-link generation, and (7) build owner payment configuration UI in backoffice + manual payment status management.

**Primary recommendation:** Use Stripe Checkout (hosted page redirect) for card payments -- do NOT build a custom card form. Set `unit_amount` to the deposit amount (not full price). For bank transfer and crypto, use "pending_payment" status with manual owner confirmation. Leverage existing `@shared/payment` types and `CRYPTO_CURRENCIES` config.

## Standard Stack

### Core

| Library                | Version  | Purpose                                  | Why Standard                                     |
| ---------------------- | -------- | ---------------------------------------- | ------------------------------------------------ |
| `stripe` (Node.js SDK) | ^14.0.0  | Server-side Stripe API calls             | Already installed in accommodations + backoffice |
| `@shared/payment`      | local    | Payment types, crypto config, formatting | Existing shared module in monorepo               |
| Supabase (PostgreSQL)  | existing | Payment state persistence                | Already the DB layer                             |

### Supporting

| Library                               | Version  | Purpose                    | When to Use                          |
| ------------------------------------- | -------- | -------------------------- | ------------------------------------ |
| `@phosphor-icons/react`               | existing | Payment method icons in UI | Guest payment selector, owner config |
| `@web3icons/react`                    | existing | Crypto token icons         | Crypto payment option display        |
| `react-svg-credit-card-payment-icons` | existing | Visa/MC/Amex icons         | Card payment branding                |

### Alternatives Considered

| Instead of                    | Could Use                   | Tradeoff                                                                                                                                  |
| ----------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Stripe Checkout (redirect)    | Stripe Elements (embedded)  | Checkout is simpler, handles PCI compliance, but less customizable. For deposits on accommodation bookings, Checkout is the right choice. |
| Manual crypto confirmation    | On-chain verification       | V1 uses manual confirmation (same as bank transfer). On-chain adds complexity with no immediate ROI.                                      |
| Separate payment_config table | Columns on accom_properties | Adding columns is simpler and the config is small (6-8 fields). Separate table would be over-engineering.                                 |

**Installation:**
No new packages needed. `stripe` ^14.0.0 already installed.

## Architecture Patterns

### Recommended Project Structure

```
apps/accommodations/frontend/
├── app/
│   ├── api/
│   │   ├── booking/route.ts              # EXTEND: add payment_method to submission
│   │   ├── checkout/route.ts             # NEW: create Stripe Checkout Session
│   │   └── webhooks/stripe/route.ts      # EXTEND: implement event handlers
│   └── booking/[code]/page.tsx           # EXTEND: show payment status + instructions
├── components/
│   └── booking/
│       ├── PaymentMethodSelector.tsx      # NEW: guest selects payment method
│       ├── BankTransferInstructions.tsx   # NEW: bank details display
│       ├── CryptoPaymentOptions.tsx       # NEW: crypto deep-link generation
│       └── BookingForm.tsx               # EXTEND: integrate payment step
├── lib/
│   └── stripe.ts                         # NEW: Stripe client singleton
└── types/
    └── property.ts                       # EXTEND: payment fields

apps/backoffice/
├── app/
│   └── (dashboard)/
│       └── accommodations/
│           ├── bookings/page.tsx          # EXTEND: payment status column + manual update
│           └── settings/page.tsx          # NEW or EXTEND: payment config section
```

### Pattern 1: Stripe Checkout Session Flow (Deposit)

**What:** Guest selects "card" payment -> server creates Checkout Session with deposit amount -> guest redirected to Stripe -> webhook confirms payment -> booking status updated.
**When to use:** Card payments via Stripe.
**Example:**

```typescript
// POST /api/checkout - Create Stripe Checkout Session
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Calculate deposit amount
const depositAmount = Math.round(totalPrice * (depositPercent / 100));

const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  payment_method_types: ['card'],
  customer_email: guestEmail,
  line_items: [
    {
      price_data: {
        currency: currency.toLowerCase(), // 'usd', 'vnd', etc.
        product_data: {
          name: `Booking deposit - ${propertyName}`,
          description: `${nights} nights, ${checkIn} to ${checkOut}`,
        },
        unit_amount: depositAmount, // INTEGER minor units
      },
      quantity: 1,
    },
  ],
  metadata: {
    booking_id: bookingId,
    property_id: propertyId,
    deposit_percent: depositPercent.toString(),
    total_price: totalPrice.toString(),
  },
  success_url: `${baseUrl}/booking/${bookingCode}?payment=success`,
  cancel_url: `${baseUrl}/booking/${bookingCode}?payment=cancelled`,
  expires_after_completion: { enabled: false }, // Don't expire the session object
});
```

### Pattern 2: Payment Status State Machine

**What:** Booking payment progresses through defined states based on payment method and events.
**When to use:** All payment flows.
**State transitions:**

```
                                    ┌──────────────┐
                         cash ──────│  confirmed   │ (immediate, pay at check-in)
                                    └──────────────┘
                                    ┌──────────────┐
     bank_transfer / crypto ────────│pending_payment│──── owner confirms ────→ confirmed
                                    └──────────────┘──── owner rejects  ────→ cancelled
                                    ┌──────────────┐
             card (Stripe) ─────────│pending_payment│──── webhook success ──→ confirmed
                                    └──────────────┘──── webhook expired ──→ payment_expired
                                                    ──── webhook failed  ──→ payment_failed
```

**DB changes needed:**

- Add `'pending_payment'` and `'payment_failed'` to `accom_bookings.status` CHECK constraint
- Add deposit config columns to `accom_properties`

### Pattern 3: Manual Payment Confirmation (Owner Dashboard)

**What:** Owner sees bookings with `pending_payment` status and can click "Confirm Payment" or "Reject".
**When to use:** Bank transfer and crypto payments.
**Example:**

```typescript
// PATCH /api/bookings/[id]/payment - Owner updates payment status
// Requires authenticated owner who owns the property
await supabase
  .from('accom_bookings')
  .update({
    payment_status: 'paid',
    status: 'confirmed',
    updated_at: new Date().toISOString(),
  })
  .eq('id', bookingId)
  .eq('property_id', propertyId); // RLS ensures ownership
```

### Anti-Patterns to Avoid

- **Custom card form in the Tours PaymentSelector:** The existing `apps/tours/frontend/components/payment/PaymentForm.tsx` has a custom card form that collects card number, expiry, CVC directly. This is a PCI compliance risk. For accommodations, use Stripe Checkout (redirect to Stripe-hosted page) instead.
- **Storing card details:** Never store raw card data. Stripe Checkout handles this entirely.
- **Trusting client-side price calculations:** The booking API already recalculates prices server-side. The deposit amount must also be calculated server-side in the checkout session creation route.
- **Using the same webhook secret for all verticals:** The codebase already correctly uses `STRIPE_ACCOM_WEBHOOK_SECRET` (separate from the wallet webhook).

## Don't Hand-Roll

| Problem                        | Don't Build                                    | Use Instead                                                | Why                                                                     |
| ------------------------------ | ---------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| Card payment form              | Custom input fields for card number/expiry/CVC | Stripe Checkout (hosted page)                              | PCI compliance, fraud protection, 3D Secure, international card support |
| Webhook signature verification | Custom HMAC comparison                         | `stripe.webhooks.constructEvent()`                         | Handles timing attacks, signature versioning                            |
| Price formatting for Stripe    | Manual currency conversion                     | `unit_amount` in minor units (already used in codebase)    | Stripe expects minor units; our DB already stores this way              |
| Crypto wallet deep-links       | Custom URL construction                        | Standard URI schemes (`bitcoin:`, `ethereum:`)             | Well-established protocol URIs for wallet apps                          |
| Idempotency for webhooks       | Custom dedup logic                             | Check `stripe_checkout_session_id` existence before update | Stripe may send the same event multiple times                           |

**Key insight:** Stripe Checkout eliminates PCI compliance burden entirely. The guest leaves your site, pays on Stripe's hosted page, and returns. You never touch card data. This is the correct pattern for a booking platform.

## Common Pitfalls

### Pitfall 1: Webhook Event Ordering and Idempotency

**What goes wrong:** Stripe can send events out of order or duplicate them. Processing `checkout.session.completed` twice could double-update.
**Why it happens:** Network retries, Stripe's event delivery system.
**How to avoid:** Check if `stripe_checkout_session_id` already exists on the booking before updating. Use a transaction or check-and-set pattern.
**Warning signs:** Duplicate booking confirmations, payment_status jumping back and forth.

### Pitfall 2: Currency Mismatch Between DB and Stripe

**What goes wrong:** DB stores VND as integer (500000 = 500,000 VND), Stripe expects minor units. For VND, minor unit IS the unit (no cents). For USD, minor unit is cents.
**Why it happens:** Different currencies have different decimal places.
**How to avoid:** The existing `price-utils.ts` already handles this. When creating Stripe session, pass the `unit_amount` directly from DB (it's already in minor units). Stripe's `currency` parameter expects lowercase ISO code.
**Warning signs:** Charges 100x too high or too low.

### Pitfall 3: Checkout Session Expiration vs Booking Expiration

**What goes wrong:** Stripe Checkout sessions expire after 24h by default. The booking `expires_at` (inquiry timeout) is separate. If the Stripe session expires but the booking is still valid, or vice versa.
**Why it happens:** Two different timeout systems.
**How to avoid:** Set `expires_at` on the Stripe session to match the booking expiry, or at minimum ensure the `checkout.session.expired` webhook handler also handles the booking appropriately (e.g., revert to `pending` so guest can try again).
**Warning signs:** Ghost bookings that are "confirmed" but never paid, or paid bookings that show as expired.

### Pitfall 4: Missing `pending_payment` Status in CHECK Constraint

**What goes wrong:** The current `accom_bookings.status` CHECK constraint only allows: `pending`, `confirmed`, `checked_in`, `checked_out`, `cancelled`, `no_show`. Inserting `pending_payment` fails.
**Why it happens:** Migration 077 didn't anticipate the payment flow states.
**How to avoid:** New migration must ALTER the CHECK constraint to add `pending_payment` and optionally `payment_failed`.
**Warning signs:** PostgreSQL CHECK violation errors on booking insert/update.

### Pitfall 5: Webhook Route Not Receiving Raw Body

**What goes wrong:** Stripe signature verification fails because the body was parsed as JSON before verification.
**Why it happens:** Framework middleware parsing request body.
**How to avoid:** In Next.js App Router, use `await request.text()` (NOT `request.json()`). The existing webhook handler already does this correctly.
**Warning signs:** "Invalid signature" errors on every webhook call.

### Pitfall 6: Deposit Percentage of Zero

**What goes wrong:** If deposit is 0% or not configured, creating a Stripe Checkout Session with `unit_amount: 0` fails.
**Why it happens:** Owner hasn't configured deposit percentage.
**How to avoid:** Default deposit to 100% if not set. Validate `depositPercent > 0` before creating Stripe session.
**Warning signs:** Stripe API error "Amount must be at least 50 cents" or similar.

## Code Examples

### Stripe Checkout Session Creation (Server-side)

```typescript
// Source: Stripe docs + codebase pattern
// POST /api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  const { bookingId } = await request.json();
  const supabase = getSupabaseAdmin();

  // Fetch booking + property
  const { data: booking } = await supabase
    .from('accom_bookings')
    .select(
      `
      id, booking_code, total_price, currency, guest_email,
      num_nights, check_in_date, check_out_date,
      property:accom_properties!accom_bookings_property_id_fkey (
        id, name, deposit_percent, stripe_account_id
      )
    `
    )
    .eq('id', bookingId)
    .single();

  if (!booking) {
    return NextResponse.json({ error: 'booking_not_found' }, { status: 404 });
  }

  const depositPercent = booking.property.deposit_percent || 100;
  const depositAmount = Math.round(
    booking.total_price * (depositPercent / 100)
  );

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: booking.guest_email,
    line_items: [
      {
        price_data: {
          currency: booking.currency.toLowerCase(),
          product_data: {
            name: `Booking deposit - ${booking.property.name}`,
            description: `${booking.num_nights} nights, ${booking.check_in_date} to ${booking.check_out_date}`,
          },
          unit_amount: depositAmount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      booking_id: booking.id,
      property_id: booking.property.id,
      deposit_percent: depositPercent.toString(),
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/${booking.booking_code}?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/${booking.booking_code}?payment=cancelled`,
  });

  // Store session ID on booking
  await supabase
    .from('accom_bookings')
    .update({
      stripe_checkout_session_id: session.id,
      payment_status: 'unpaid',
      status: 'pending_payment',
    })
    .eq('id', bookingId);

  return NextResponse.json({ url: session.url });
}
```

### Webhook Handler (Complete Implementation)

```typescript
// Source: Existing stub + Stripe docs
// POST /api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_ACCOM_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !endpointSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;
      if (!bookingId) break;

      // Idempotency: check if already processed
      const { data: existing } = await supabase
        .from('accom_bookings')
        .select('payment_status')
        .eq('id', bookingId)
        .single();

      if (existing?.payment_status === 'paid') break; // Already processed

      await supabase
        .from('accom_bookings')
        .update({
          payment_status:
            session.metadata?.deposit_percent === '100' ? 'paid' : 'partial',
          status: 'confirmed',
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .eq('id', bookingId);

      // TODO: Send confirmation notification (WhatsApp/email)
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;
      if (!bookingId) break;

      await supabase
        .from('accom_bookings')
        .update({ status: 'pending' }) // Revert to pending so guest can retry
        .eq('id', bookingId)
        .eq('status', 'pending_payment'); // Only if still pending_payment
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

### Crypto Deep-Link Generation

```typescript
// Source: Standard crypto URI schemes
function generateCryptoDeepLink(
  cryptoId: string,
  address: string,
  amount: number, // in crypto units (e.g., 0.001 BTC)
  label?: string
): string {
  switch (cryptoId) {
    case 'btc':
      return `bitcoin:${address}?amount=${amount}${label ? `&label=${encodeURIComponent(label)}` : ''}`;
    case 'eth':
    case 'usdc':
    case 'usdt':
      // EIP-681 format for Ethereum-based tokens
      return `ethereum:${address}?value=${amount}`;
    case 'sol':
      return `solana:${address}?amount=${amount}`;
    case 'ton':
      return `ton://transfer/${address}?amount=${amount}`;
    case 'bnb':
      return `bnb:${address}?amount=${amount}`;
    default:
      return address; // Fallback: just show address
  }
}
```

### Payment Method Selector (Guest-Facing)

```typescript
// Pattern: Filter by property's accepted_payment_methods
// accepted_payment_methods from accom_properties: e.g., ['cash', 'bank_transfer', 'card', 'crypto']

type AccomPaymentMethod = 'cash' | 'bank_transfer' | 'card' | 'crypto';

const PAYMENT_METHOD_CONFIG: Record<
  AccomPaymentMethod,
  {
    label: string;
    description: string;
    icon: string; // Phosphor icon name
    color: string;
  }
> = {
  cash: {
    label: 'Cash',
    description: 'Pay at check-in',
    icon: 'Money',
    color: 'bg-emerald-500',
  },
  bank_transfer: {
    label: 'Bank Transfer',
    description: 'Transfer before arrival',
    icon: 'Bank',
    color: 'bg-blue-500',
  },
  card: {
    label: 'Credit/Debit Card',
    description: 'Secure payment via Stripe',
    icon: 'CreditCard',
    color: 'bg-indigo-600',
  },
  crypto: {
    label: 'Cryptocurrency',
    description: 'BTC, ETH, USDC, SOL, TON',
    icon: 'CurrencyBtc',
    color: 'bg-orange-500',
  },
};
```

## State of the Art

| Old Approach                                       | Current Approach               | When Changed           | Impact                                                               |
| -------------------------------------------------- | ------------------------------ | ---------------------- | -------------------------------------------------------------------- |
| Stripe Elements (embedded card form)               | Stripe Checkout (hosted page)  | 2023+                  | Better conversion, automatic 3D Secure, less PCI scope               |
| `stripe.webhooks.constructEvent` with micro buffer | `request.text()` in App Router | Next.js 13+ App Router | No need for micro package or bodyParser config                       |
| PaymentIntents API for one-time                    | Checkout Sessions for one-time | 2020+ (recommended)    | Checkout handles the full flow; PaymentIntents better for custom UIs |

**Deprecated/outdated:**

- Custom card forms (as in tours PaymentSelector) -- use Stripe Checkout or Stripe Elements with PaymentElement
- `micro` package for raw body in webhook -- App Router's `request.text()` handles this natively
- `apiVersion: '2022-xx-xx'` -- current codebase uses `2023-10-16` which is fine for stripe v14

## Open Questions

1. **Stripe MCC 7011 for extended authorization**
   - What we know: Hotels can use MCC 7011 for extended card authorization (hold + capture later). Mentioned in STATE.md as needing validation with SEA property owners.
   - What's unclear: Whether this is needed for v1 since we're doing deposits via Checkout, not card-on-file holds.
   - Recommendation: Not needed for Phase 20. Deposits via Checkout Session capture immediately. Extended auth is for "authorize now, capture at checkout" which is a future enhancement.

2. **Bank transfer: which bank details to display?**
   - What we know: Property owners have their own bank accounts. The system needs to display these to the guest.
   - What's unclear: How to store bank details securely (bank name, account number, account holder, SWIFT/routing).
   - Recommendation: Add a JSONB `bank_transfer_info` column to `accom_properties`. Display as-is to the guest. No encryption needed since it's the owner's receiving account info (not sensitive like card numbers).

3. **Cancellation refund via Stripe**
   - What we know: Decision says "deposit non-refundable after 48h before check-in". Stripe supports refunds via API.
   - What's unclear: Whether automatic Stripe refunds should be implemented in Phase 20 or handled manually.
   - Recommendation: Phase 20 should add cancellation policy display and the DB columns. Automatic Stripe refunds can be deferred -- owner can manually refund via Stripe Dashboard for v1.

4. **Notification system (WhatsApp/email)**
   - What we know: On payment events, owner and guest should be notified.
   - What's unclear: Whether notification infrastructure exists yet for accommodations.
   - Recommendation: Add TODO comments in webhook handler. Notifications can be a follow-up task after the payment flow works.

## DB Schema Changes Required

### Migration: accom_properties payment config

```sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS deposit_percent INTEGER NOT NULL DEFAULT 100
    CHECK (deposit_percent BETWEEN 1 AND 100),
  ADD COLUMN IF NOT EXISTS bank_transfer_info JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS crypto_wallets JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS cancellation_window_hours INTEGER NOT NULL DEFAULT 48,
  ADD COLUMN IF NOT EXISTS cancellation_penalty_percent INTEGER NOT NULL DEFAULT 100
    CHECK (cancellation_penalty_percent BETWEEN 0 AND 100);
```

### Migration: accom_bookings status extension

```sql
-- Drop and recreate CHECK constraint to add new statuses
ALTER TABLE accom_bookings
  DROP CONSTRAINT IF EXISTS accom_bookings_status_check;

ALTER TABLE accom_bookings
  ADD CONSTRAINT accom_bookings_status_check
  CHECK (status IN (
    'pending', 'pending_payment', 'confirmed',
    'checked_in', 'checked_out',
    'cancelled', 'no_show', 'payment_failed'
  ));

-- Add deposit tracking columns
ALTER TABLE accom_bookings
  ADD COLUMN IF NOT EXISTS deposit_amount INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS deposit_percent INTEGER DEFAULT 100;
```

## Sources

### Primary (HIGH confidence)

- Codebase: `shared/payment/types.ts`, `shared/payment/utils.ts` -- existing payment types and utilities
- Codebase: `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` -- existing schema with payment columns
- Codebase: `apps/accommodations/frontend/app/api/webhooks/stripe/route.ts` -- existing webhook stub
- Codebase: `apps/accommodations/frontend/app/api/booking/route.ts` -- existing booking API
- Codebase: `apps/tours/frontend/components/payment/PaymentSelector.tsx` -- reference pattern for payment selection UI
- [Stripe API: Create Checkout Session](https://docs.stripe.com/api/checkout/sessions/create) -- session creation parameters
- [Stripe Webhooks Documentation](https://docs.stripe.com/webhooks) -- webhook handling best practices

### Secondary (MEDIUM confidence)

- [Stripe Hospitality Payment Processing](https://stripe.com/resources/more/hospitality-payment-processing) -- hotel-specific patterns
- [Stripe Booking Systems Guide](https://stripe.com/resources/more/booking-systems-with-payments-101-what-they-are-and-how-they-work) -- deposit collection patterns
- [Next.js App Router + Stripe Webhook Verification](https://kitson-broadhurst.medium.com/next-js-app-router-stripe-webhook-signature-verification-ea9d59f3593f) -- request.text() pattern

### Tertiary (LOW confidence)

- None -- all findings verified with codebase or official docs

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- stripe v14 already installed, @shared/payment exists, schema has payment columns
- Architecture: HIGH -- clear patterns from existing codebase (booking API, webhook stub, tours payment UI)
- Pitfalls: HIGH -- verified against actual codebase constraints (CHECK constraints, currency handling, webhook body parsing)

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable domain, no fast-moving dependencies)
