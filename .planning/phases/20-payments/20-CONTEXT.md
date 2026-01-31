# Phase 20: Payments - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Owner configures which payment methods are accepted for their property. Guest sees only enabled methods during booking and completes payment. Supported methods: cash, bank transfer, Stripe card, crypto deep-link. Stripe webhook handles payment confirmation. This phase does NOT include owner payout/settlement or recurring billing.

</domain>

<decisions>
## Implementation Decisions

### Deposit configuration

- Owner chooses the deposit percentage (e.g., 20%, 50%, 100%)
- Deposit applies to Stripe card payments
- Cash and bank transfer: owner decides if deposit or full amount is required (configurable)

### Bank transfer flow

- Owner manually confirms payment received (clicks "payment received" in dashboard)
- Booking stays in "pending_payment" status until owner confirms
- No auto-confirmation timeout (owner is in control)

### Crypto payments

- Use existing @shared/payment deep-link approach (BTC, ETH, USDC, SOL, TON, BNB, USDT)
- Generate payment link that opens guest's wallet app
- No on-chain verification in v1 — owner manually confirms receipt (same as bank transfer)

### Cancellation policy

- Default cancellation policy: free cancellation up to 48h before check-in, then deposit non-refundable
- Owner can customize: cancellation window (hours before check-in) and penalty (percentage of total or deposit forfeiture)
- Cancellation policy displayed to guest before booking confirmation

### Claude's Discretion

- Payment method configuration UI in backoffice (form layout, toggle design)
- Guest payment selection UX (inline vs step, visual hierarchy)
- Stripe Checkout session parameters (metadata, success/cancel URLs)
- Webhook handler implementation details (idempotency, retry handling)
- Payment status state machine (transitions, edge cases)
- Error handling and retry UX for failed payments
- Email/WhatsApp notification content for payment events
- Bank transfer instructions display format

</decisions>

<specifics>
## Specific Ideas

- Owner wants full customizability — every payment-related setting should be configurable per property
- Keep it simple for the guest: show only what's enabled, clear amounts, no confusion
- Crypto uses existing shared/payment infrastructure, no new integrations needed

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 20-payments_
_Context gathered: 2026-01-31_
