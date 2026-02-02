---
phase: 37-conventions-vouchers
plan: 01
subsystem: database, api, ui
tags:
  [
    supabase,
    rpc,
    voucher,
    conventions,
    booking,
    plpgsql,
    phosphor-icons,
    framer-motion,
  ]

# Dependency graph
requires:
  - phase: 050-b2b-conventions (migration)
    provides: partner_conventions, convention_vouchers, convention_redemptions tables + validate_voucher() RPC
provides:
  - benefit_scope column on partner_conventions (per_order/per_night/per_stay/flat)
  - validate_accommodation_voucher() RPC with scope-aware discount calculation
  - POST /api/booking/validate-voucher endpoint for client preview
  - VoucherInput component for accommodations booking form
  - Voucher server re-validation in POST /api/booking
  - Convention redemption recording on successful booking
affects: [37-02 convention partner cards, backoffice convention management]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Two-step voucher validation: client preview via /api/booking/validate-voucher, server re-validation in POST /api/booking'
    - 'Scope-aware discount: benefit_scope determines how fixed_discount is multiplied (per_night * nights, per_stay = flat)'
    - 'Voucher discount applied AFTER weekly/monthly discounts, total never below 0'

key-files:
  created:
    - shared/database/migrations/schema/099-conventions-benefit-scope.sql
    - apps/accommodations/frontend/app/api/booking/validate-voucher/route.ts
    - apps/accommodations/frontend/components/booking/VoucherInput.tsx
  modified:
    - apps/accommodations/frontend/types/property.ts
    - apps/accommodations/frontend/lib/price-utils.ts
    - apps/accommodations/frontend/app/api/booking/route.ts
    - apps/accommodations/frontend/hooks/useBookingForm.ts

key-decisions:
  - 'VOUCHER-01: New validate_accommodation_voucher() RPC instead of extending validate_voucher() (coffeeshop backward compat)'
  - 'VOUCHER-02: Voucher discount applied AFTER existing weekly/monthly discounts with Math.max(0) floor'
  - 'VOUCHER-03: Convention redemption insert is fire-and-forget (non-blocking) to not break booking flow'
  - 'VOUCHER-04: validate-voucher endpoint is public (no auth) matching property page booking flow pattern'

patterns-established:
  - 'Two-step voucher validation: preview API + server re-validation on submit'
  - 'VoucherInput component pattern for accommodations (adapted from coffeeshop)'

# Metrics
duration: 4min
completed: 2026-02-02
---

# Phase 37 Plan 01: Voucher Validation + Booking Integration Summary

**benefit_scope column on partner_conventions with validate_accommodation_voucher() RPC, VoucherInput component, and two-step voucher validation in accommodations booking flow**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-02T02:06:12Z
- **Completed:** 2026-02-02T02:10:41Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Migration 099 adds benefit_scope column (per_order/per_night/per_stay/flat) to partner_conventions
- validate_accommodation_voucher() RPC calculates scope-aware discounts for both percentage and fixed discount types
- VoucherInput component with apply/remove/loading/error/success states using Phosphor icons + framer-motion
- Server re-validates voucher in POST /api/booking preventing client-side discount manipulation
- Convention redemption recorded after successful booking with voucher

## Task Commits

Each task was committed atomically:

1. **Task 1: Migration 099 - benefit_scope + RPC** - `73681a3` (feat)
2. **Task 2: Voucher validation API + booking flow + VoucherInput** - `5b736d9` (feat)

## Files Created/Modified

- `shared/database/migrations/schema/099-conventions-benefit-scope.sql` - benefit_scope column + validate_accommodation_voucher() RPC
- `apps/accommodations/frontend/app/api/booking/validate-voucher/route.ts` - POST endpoint for client-side voucher preview
- `apps/accommodations/frontend/components/booking/VoucherInput.tsx` - Voucher code input with apply/remove/loading/error states (203 lines)
- `apps/accommodations/frontend/types/property.ts` - Added ValidatedVoucher, voucherCode on BookingSubmission, voucherDiscount on PriceBreakdown
- `apps/accommodations/frontend/lib/price-utils.ts` - Added voucherDiscount parameter, Math.max(0) floor
- `apps/accommodations/frontend/app/api/booking/route.ts` - Server re-validation, discount application, redemption recording
- `apps/accommodations/frontend/hooks/useBookingForm.ts` - Voucher state (voucherDetails, voucherDiscount, setVoucherDetails)

## Decisions Made

- **VOUCHER-01:** Created new validate_accommodation_voucher() RPC rather than extending validate_voucher() to maintain coffeeshop backward compatibility
- **VOUCHER-02:** Voucher discount applied AFTER existing weekly/monthly discounts with Math.max(0, totalPrice) floor to prevent negative totals
- **VOUCHER-03:** Convention redemption insert is non-blocking (try/catch with console.error) so redemption tracking failure never blocks booking
- **VOUCHER-04:** validate-voucher endpoint is public (no auth required) because the property booking page is public -- matches existing pattern

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

- Migration 099 needs to be applied to live database (Supabase MCP/CLI not available during execution)

## Next Phase Readiness

- Voucher validation infrastructure complete, ready for Plan 02 (convention partner cards in guest dashboard)
- VoucherInput component ready to be rendered in BookingForm (parent component integration is a rendering concern)
- Existing validate_voucher() untouched -- coffeeshop backward compatible

---

_Phase: 37-conventions-vouchers_
_Completed: 2026-02-02_
