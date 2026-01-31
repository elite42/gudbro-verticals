---
phase: 20-payments
plan: 02
subsystem: frontend, payments, booking
tags:
  [
    payment-method-selector,
    bank-transfer,
    crypto,
    booking-api,
    booking-confirmation,
    phosphor-icons,
  ]

# Dependency graph
requires:
  - phase: 20-01
    provides: SQL migration 084, AccomPaymentMethod type, PAYMENT_METHOD_CONFIG, extended PropertyPageData/BookingResponse
provides:
  - PaymentMethodSelector radio-card component filtered by property config
  - BankTransferInstructions with copy buttons and detail display
  - CryptoPaymentOptions with deep-links for BTC/ETH/SOL/TON/BNB/USDT/USDC
  - Booking API validates payment method and routes status by method
  - BookingConfirmation shows payment-specific instructions
affects: [20-03 stripe-integration, backoffice-payment-management]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Radio-card payment selector with auto-select for single method'
    - 'Payment method determines booking status (cash->mode, bank/crypto/card->pending_payment)'
    - 'Deep-links for crypto wallets (bitcoin:, ethereum:, solana:, ton://transfer/)'
    - 'Deposit snapshot on booking record for historical accuracy'

key-files:
  created:
    - apps/accommodations/frontend/components/booking/PaymentMethodSelector.tsx
    - apps/accommodations/frontend/components/booking/BankTransferInstructions.tsx
    - apps/accommodations/frontend/components/booking/CryptoPaymentOptions.tsx
  modified:
    - apps/accommodations/frontend/components/booking/BookingForm.tsx
    - apps/accommodations/frontend/hooks/useBookingForm.ts
    - apps/accommodations/frontend/app/property/[slug]/PropertyPageClient.tsx
    - apps/accommodations/frontend/app/api/booking/route.ts
    - apps/accommodations/frontend/app/api/property/[slug]/route.ts
    - apps/accommodations/frontend/components/booking/BookingConfirmation.tsx

key-decisions:
  - 'Crypto currencies inlined in component (not imported from @shared/payment) to avoid cross-package config issues'
  - 'Card payment creates booking with pending_payment then redirects to /api/checkout (Plan 03)'
  - 'Auto-select payment method when only one is accepted (still shown, non-interactive)'
  - 'Pending payment shows amber clock icon; confirmed shows green checkmark'

patterns-established:
  - 'PaymentMethodSelector: radio-card pattern with icon, label, description, radio indicator'
  - 'Deep-link generation per crypto type for mobile wallet apps'
  - 'Copy-to-clipboard pattern with per-field feedback state'

# Metrics
duration: 7min
completed: 2026-01-31
---

# Phase 20 Plan 02: Payment Method Selector UI Summary

**Radio-card payment selector, bank transfer instructions, crypto wallet deep-links, and booking API routing by payment method with status-aware confirmation page**

## Performance

- **Duration:** 7 min
- **Started:** 2026-01-31T05:10:41Z
- **Completed:** 2026-01-31T05:17:42Z
- **Tasks:** 2
- **Files created:** 3
- **Files modified:** 6

## Accomplishments

- PaymentMethodSelector renders filtered payment options as radio-cards with Phosphor icons
- BankTransferInstructions displays bank details with per-field copy buttons
- CryptoPaymentOptions shows wallet addresses with deep-links for 7 cryptocurrencies
- BookingForm integrates PaymentMethodSelector with method-aware submit button text
- useBookingForm tracks selectedPaymentMethod state, validates selection, passes to API
- Booking API validates payment method against property config and routes status accordingly
- Property API returns deposit_percent, bank_transfer_info, crypto_wallets, cancellation config
- BookingConfirmation shows method-specific instructions (cash: "pay at check-in", bank: bank details, crypto: wallet addresses)
- Pending payment status shows amber clock icon instead of green checkmark

## Task Commits

Each task was committed atomically:

1. **Task 1: Create payment UI components and integrate into booking form** - `f7c5b2d` (feat)
2. **Task 2: Extend booking API and property API for payment flow** - `61a0f95` (feat)

## Files Created/Modified

**Created:**

- `apps/accommodations/frontend/components/booking/PaymentMethodSelector.tsx` - Radio-card payment method selector with Phosphor icons
- `apps/accommodations/frontend/components/booking/BankTransferInstructions.tsx` - Bank transfer details with copy buttons
- `apps/accommodations/frontend/components/booking/CryptoPaymentOptions.tsx` - Crypto wallet addresses with deep-links

**Modified:**

- `apps/accommodations/frontend/components/booking/BookingForm.tsx` - Integrates PaymentMethodSelector, method-aware submit text
- `apps/accommodations/frontend/hooks/useBookingForm.ts` - Payment method state, validation, API submission, card redirect
- `apps/accommodations/frontend/app/property/[slug]/PropertyPageClient.tsx` - Wires payment props to BookingForm and useBookingForm
- `apps/accommodations/frontend/app/api/booking/route.ts` - Payment validation, status routing, deposit calculation, response enrichment
- `apps/accommodations/frontend/app/api/property/[slug]/route.ts` - Added deposit/cancellation/payment config to SELECT
- `apps/accommodations/frontend/components/booking/BookingConfirmation.tsx` - Payment-specific instructions, pending_payment status

## Decisions Made

- Crypto currencies config inlined in CryptoPaymentOptions rather than importing from @shared/payment (avoids cross-package tsconfig/transpile complexity)
- Card payment flow: booking API returns stripeCheckoutUrl: null; frontend calls /api/checkout separately (Plan 03 scope)
- Auto-select when single payment method accepted (shown but non-interactive)
- Pending payment amber clock icon vs green checkmark for confirmed bookings

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

Minor TypeScript type issues with Phosphor icon map (IconProps vs custom interface) and optional copyKey field -- both fixed inline during Task 1.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All payment UI components ready for Stripe integration (Plan 03)
- Booking API already returns stripeCheckoutUrl field (null) -- Plan 03 will populate it
- /api/checkout endpoint referenced in useBookingForm redirect logic -- Plan 03 will create it
- Card bookings land in pending_payment status, ready for Stripe webhook to confirm

---

_Phase: 20-payments_
_Completed: 2026-01-31_
