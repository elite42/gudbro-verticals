---
phase: 20-payments
plan: 01
subsystem: database, payments
tags:
  [
    postgresql,
    typescript,
    payment-methods,
    stripe,
    crypto,
    bank-transfer,
    deposit,
  ]

# Dependency graph
requires:
  - phase: 19-property-booking
    provides: PropertyPageData, BookingSubmission, BookingResponse types and property page
provides:
  - SQL migration 084 with payment config columns and extended booking status
  - AccomPaymentMethod type and PAYMENT_METHOD_CONFIG constant
  - BankTransferInfo interface
  - Extended PropertyPageData with deposit/cancellation fields
  - Extended BookingResponse with stripeCheckoutUrl, payment details
  - Extended BookingStatus with pending_payment, payment_failed
affects:
  [20-02 payment-method-selector, 20-03 stripe-integration, backoffice-payments]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Payment method config as typed constant with label/description/icon/color'
    - 'Deposit as percentage of total (1-100), stored as snapshot on booking'
    - 'Cancellation window + penalty percent for flexible policy'

key-files:
  created:
    - shared/database/migrations/schema/084-payment-config.sql
  modified:
    - apps/accommodations/frontend/types/property.ts
    - apps/accommodations/frontend/lib/types.ts
    - apps/accommodations/frontend/app/property/[slug]/page.tsx

key-decisions:
  - 'Deposit percent 1-100 range (no 0% -- at least 1% required for commitment)'
  - 'Payment method CHECK allows NULL for legacy bookings'
  - 'BankTransferInfo as JSONB (flexible for different banking systems)'
  - 'Cancellation penalty as percent of deposit (not total price)'

patterns-established:
  - 'PAYMENT_METHOD_CONFIG: centralized config for payment method UI rendering'
  - 'Deposit snapshot: booking stores deposit_percent at time of creation'

# Metrics
duration: 3min
completed: 2026-01-31
---

# Phase 20 Plan 01: Schema & Types for Payment System Summary

**SQL migration 084 extending booking status with pending_payment/payment_failed, deposit tracking columns, and TypeScript types for AccomPaymentMethod with PAYMENT_METHOD_CONFIG**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-31T05:02:15Z
- **Completed:** 2026-01-31T05:05:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- SQL migration 084 with extended booking status CHECK (pending_payment, payment_failed)
- Deposit tracking columns on accom_bookings and payment config on accom_properties
- AccomPaymentMethod type, PAYMENT_METHOD_CONFIG constant, BankTransferInfo interface
- BookingResponse extended with stripeCheckoutUrl, depositAmount, cryptoWallets fields

## Task Commits

Each task was committed atomically:

1. **Task 1: Create SQL migration 084 for payment config** - `ccd38f9` (feat)
2. **Task 2: Update TypeScript types for payment flow** - `4221bc6` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/084-payment-config.sql` - Payment config migration (status CHECK, deposit columns, property payment settings)
- `apps/accommodations/frontend/types/property.ts` - AccomPaymentMethod, PAYMENT_METHOD_CONFIG, BankTransferInfo, extended PropertyPageData/BookingSubmission/BookingResponse
- `apps/accommodations/frontend/lib/types.ts` - Extended BookingStatus and PaymentStatus with payment states
- `apps/accommodations/frontend/app/property/[slug]/page.tsx` - Added new payment columns to Supabase select and PropertyPageData mapping

## Decisions Made

- Deposit percent range 1-100 (no zero -- at minimum 1% for booking commitment)
- Payment method CHECK on accom_bookings allows NULL for legacy bookings without payment method set
- BankTransferInfo stored as JSONB for flexibility across different banking systems globally
- Cancellation penalty expressed as percent of deposit amount (not total booking price)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed property page TypeScript compilation**

- **Found during:** Task 2 (TypeScript types update)
- **Issue:** Adding required fields to PropertyPageData broke the property page that constructs this object from Supabase data
- **Fix:** Added new columns to Supabase select query and mapping object with sensible defaults (deposit_percent: 100, cancellation_window_hours: 48)
- **Files modified:** apps/accommodations/frontend/app/property/[slug]/page.tsx
- **Verification:** `tsc --noEmit` passes cleanly
- **Committed in:** 4221bc6 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix for TypeScript compilation. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All payment types and DB schema in place for Plan 02 (Payment Method Selector UI)
- PAYMENT_METHOD_CONFIG ready for rendering payment options in the booking flow
- BookingResponse.stripeCheckoutUrl ready for Plan 03 (Stripe integration)

---

_Phase: 20-payments_
_Completed: 2026-01-31_
