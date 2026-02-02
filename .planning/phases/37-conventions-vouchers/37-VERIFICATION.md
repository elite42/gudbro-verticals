---
phase: 37-conventions-vouchers
verified: 2026-02-02T10:30:00Z
status: gaps_found
score: 4/5 must-haves verified
gaps:
  - truth: 'Guest can enter a voucher code in the booking form and see a discount preview before submitting'
    status: failed
    reason: 'VoucherInput component exists but is NOT wired into BookingForm component'
    artifacts:
      - path: 'apps/accommodations/frontend/components/booking/VoucherInput.tsx'
        issue: 'Component exists (203 lines) but is not imported or rendered anywhere'
      - path: 'apps/accommodations/frontend/components/booking/BookingForm.tsx'
        issue: 'No VoucherInput import or render, no voucher-related props passed from parent'
    missing:
      - 'Import VoucherInput in BookingForm.tsx'
      - 'Add voucher-related props to BookingForm interface (propertyId, numNights, subtotal, voucherDetails, onVoucherApplied, formatPrice)'
      - 'Render VoucherInput component in the form (after special requests, before payment method)'
      - 'Wire voucherDetails and setVoucherDetails from useBookingForm hook to BookingForm component'
---

# Phase 37: Conventions + Vouchers Verification Report

**Phase Goal:** The conventions system is adapted for accommodations with benefit scoping, and guests see convention partner cards with voucher validation in the booking flow

**Verified:** 2026-02-02T10:30:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                                                                                                                           | Status     | Evidence                                                                                                                                                                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------- |
| 1   | Convention system supports benefit_scope column (per_order, per_night, per_stay, flat) for accommodations-specific discount calculation                                                         | ✓ VERIFIED | Migration 099 adds benefit_scope column with CHECK constraint. validate_accommodation_voucher() RPC has scope-aware calculation logic (lines 158-171).                                                                                                                       |
| 2   | Guest sees convention restaurant/partner cards with visual display in the in-stay dashboard, linked to the conventions module                                                                   | ✓ VERIFIED | ConventionPartnerCards component rendered in stay page (line 403). GET /api/stay/[code]/conventions endpoint returns active conventions. Cards show partner name, discount badge, benefit description.                                                                       |
| 3   | Voucher code field in booking flow validates via existing validate_voucher() RPC, calculates discount based on scope and stay duration, and records redemption with usage limits and expiration | ✗ FAILED   | Backend validation works (validate_accommodation_voucher RPC + /api/booking route lines 155-199). VoucherInput component exists (203 lines). BUT component is NOT wired into BookingForm — never imported or rendered. Guest cannot actually enter a voucher code in the UI. |
| 4   | benefit_scope column exists on partner_conventions with per_order/per_night/per_stay/flat options                                                                                               | ✓ VERIFIED | Migration 099 line 17: `ADD COLUMN benefit_scope TEXT DEFAULT 'per_order' CHECK (benefit_scope IN ('per_order', 'per_night', 'per_stay', 'flat'))`                                                                                                                           |
| 5   | Voucher discount is applied AFTER existing weekly/monthly discounts and never exceeds subtotal                                                                                                  | ✓ VERIFIED | price-utils.ts line 40: `Math.max(0, subtotal + cleaningFee - discountAmount - (voucherDiscount                                                                                                                                                                              |     | 0))`. RPC line 174-176: caps discount to never exceed subtotal. |

**Score:** 4/5 truths verified

### Required Artifacts

| Artifact                                                                  | Expected                                                             | Status      | Details                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shared/database/migrations/schema/099-conventions-benefit-scope.sql`     | benefit_scope column + validate_accommodation_voucher() RPC          | ✓ VERIFIED  | 195 lines. benefit_scope column added with CHECK constraint. RPC validates voucher, calculates scope-aware discounts, returns detailed result. SECURITY DEFINER with GRANT to authenticated.                                    |
| `apps/accommodations/frontend/app/api/booking/validate-voucher/route.ts`  | POST endpoint for client-side voucher preview validation             | ✓ VERIFIED  | 77 lines. Calls validate_accommodation_voucher RPC, returns ValidatedVoucher or error. No auth (public endpoint per plan).                                                                                                      |
| `apps/accommodations/frontend/components/booking/VoucherInput.tsx`        | Voucher code input with apply/remove/loading/error states            | ⚠️ ORPHANED | 203 lines. Substantive implementation with Phosphor icons, framer-motion, all states. BUT not imported or used anywhere. Component exists but never renders.                                                                    |
| `apps/accommodations/frontend/hooks/useBookingForm.ts`                    | Voucher state (code, discount, details) integrated into booking form | ✓ VERIFIED  | Lines 132-137: voucherDetails state, setVoucherDetails callback, voucherDiscount computed. Lines 189-192: voucher integrated into priceBreakdown calculation. Line 250: voucherCode passed to submitBooking.                    |
| `apps/accommodations/frontend/app/api/booking/route.ts`                   | Server re-validates voucher on submission                            | ✓ VERIFIED  | Lines 155-199: Server-authoritative re-validation via validate_accommodation_voucher RPC. Lines 284-307: Convention redemption recorded after successful booking.                                                               |
| `apps/accommodations/frontend/app/api/stay/[code]/conventions/route.ts`   | GET endpoint returning active conventions for property               | ✓ VERIFIED  | 82 lines. Authenticates guest JWT, queries partner_conventions filtered by property_id and date validity, returns camelCase response.                                                                                           |
| `apps/accommodations/frontend/components/stay/ConventionPartnerCards.tsx` | Convention partner card list component for guest dashboard           | ✓ VERIFIED  | 106 lines. Fetches conventions, renders cards with Storefront icon, discount badges (percentage/fixed/free item/special price/points), benefit descriptions, per_night suffix. Loading skeleton and empty state (returns null). |
| `apps/backoffice/app/(dashboard)/settings/conventions/page.tsx`           | Read-only conventions view for accommodation owners                  | ✓ VERIFIED  | 187 lines. Queries conventions via /api/settings/conventions, displays cards with partner name, benefit details, valid dates, redemption count. Empty state with Handshake icon.                                                |
| `apps/backoffice/app/api/settings/conventions/route.ts`                   | Backoffice API for owner's conventions                               | ✓ VERIFIED  | 76 lines. Looks up properties by owner_id, queries conventions targeting those properties, returns camelCase response.                                                                                                          |

### Key Link Verification

| From                     | To                                    | Via                                        | Status      | Details                                                                                                                                       |
| ------------------------ | ------------------------------------- | ------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `VoucherInput.tsx`       | `/api/booking/validate-voucher`       | fetch POST on apply                        | ✓ WIRED     | Line 38: POST with voucherCode, propertyId, numNights, subtotal. Response handling lines 49-61.                                               |
| `BookingForm.tsx`        | `VoucherInput.tsx`                    | import and render                          | ✗ NOT_WIRED | VoucherInput is NOT imported in BookingForm. Component never rendered. BookingForm has no voucher-related props.                              |
| `/api/booking` route     | `validate_accommodation_voucher` RPC  | supabase.rpc server-side re-validation     | ✓ WIRED     | Lines 156-164: RPC call with voucher code, property_id, nights, subtotal. Result validation lines 174-193.                                    |
| `useBookingForm` hook    | `price-utils calculatePriceBreakdown` | voucherDiscount subtracted from totalPrice | ✓ WIRED     | Line 190: voucherDiscount passed to calculatePriceBreakdown. price-utils.ts line 40: applied after existing discounts with Math.max(0) floor. |
| `ConventionPartnerCards` | `/api/stay/[code]/conventions`        | fetchConventions in stay-api.ts            | ✓ WIRED     | Line 46: fetchConventions called with bookingCode and token. stay-api.ts line 123: GET request to conventions endpoint.                       |
| `stay/[code]/page.tsx`   | `ConventionPartnerCards`              | import and render in home tab              | ✓ WIRED     | Line 38: import. Line 403: rendered with bookingCode and token props.                                                                         |

### Requirements Coverage

Phase requirements from ROADMAP.md:

| Requirement                                                             | Status      | Blocking Issue                                                |
| ----------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| INF-03: Convention system adapted for accommodations with benefit_scope | ✓ SATISFIED | Migration 099 complete, RPC functional.                       |
| GXP-05: Convention restaurant/partner cards with visual display         | ✓ SATISFIED | ConventionPartnerCards component rendered in guest dashboard. |
| Voucher validation in booking flow                                      | ✗ BLOCKED   | VoucherInput component not wired into BookingForm.            |

### Anti-Patterns Found

| File               | Line  | Pattern                                    | Severity   | Impact                                                                                                                                |
| ------------------ | ----- | ------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `VoucherInput.tsx` | 1-203 | Orphaned component (not imported anywhere) | 🛑 Blocker | Guest cannot enter voucher codes despite 100% backend support. Feature appears complete but is non-functional in UI.                  |
| `BookingForm.tsx`  | 1-217 | Missing voucher UI integration             | 🛑 Blocker | Form renders payment selector but no voucher input. Hook exposes voucherDetails/setVoucherDetails but form component never uses them. |

### Human Verification Required

None — the gap is structural and programmatically detectable. Once VoucherInput is wired into BookingForm, the feature should work without human testing (backend is complete and tested).

### Gaps Summary

**Critical Gap: VoucherInput component is orphaned**

The backend voucher validation infrastructure is 100% complete and correct:

- ✅ Migration 099 adds benefit_scope column with proper constraints
- ✅ validate_accommodation_voucher() RPC calculates scope-aware discounts correctly
- ✅ POST /api/booking/validate-voucher endpoint works (client preview)
- ✅ POST /api/booking server re-validates voucher and records redemption
- ✅ useBookingForm hook manages voucher state and integrates into price calculation
- ✅ Types (ValidatedVoucher, voucherCode on BookingSubmission, voucherDiscount on PriceBreakdown) are complete

The VoucherInput component is fully implemented:

- ✅ 203 lines, substantive implementation
- ✅ Phosphor icons (Ticket, Check, X, SpinnerGap, Tag, Percent)
- ✅ framer-motion animations for state transitions
- ✅ Apply/remove/loading/error/success states
- ✅ Calls /api/booking/validate-voucher on apply
- ✅ Displays discount amount and partner name on success

**BUT the component is never wired into the UI:**

- ❌ BookingForm.tsx does NOT import VoucherInput
- ❌ BookingForm.tsx does NOT render VoucherInput
- ❌ BookingForm component interface does NOT include voucher-related props (propertyId, numNights, subtotal, voucherDetails, onVoucherApplied, formatPrice)
- ❌ PropertyPageClient or parent component does NOT pass voucher state from useBookingForm to BookingForm

**What needs to be added:**

1. **BookingForm.tsx interface** — Add props:

   ```typescript
   propertyId: string;
   numNights: number;
   subtotal: number;
   voucherDetails: ValidatedVoucher | null;
   onVoucherApplied: (voucher: ValidatedVoucher | null) => void;
   formatPrice: (amount: number) => string;
   ```

2. **BookingForm.tsx import** — Top of file:

   ```typescript
   import { VoucherInput } from './VoucherInput';
   ```

3. **BookingForm.tsx render** — After special requests field, before payment method selector (around line 169):

   ```tsx
   {
     /* Voucher code */
   }
   <VoucherInput
     propertyId={propertyId}
     numNights={numNights}
     subtotal={subtotal}
     onVoucherApplied={onVoucherApplied}
     appliedVoucher={voucherDetails}
     formatPrice={formatPrice}
     disabled={isSubmitting}
   />;
   ```

4. **PropertyPageClient or parent** — Pass props from useBookingForm result to BookingForm:
   - `propertyId={property.id}`
   - `numNights={priceBreakdown?.nights || 0}`
   - `subtotal={priceBreakdown?.subtotal || 0}`
   - `voucherDetails={voucherDetails}`
   - `onVoucherApplied={setVoucherDetails}`
   - `formatPrice={(amount) => formatPrice(amount, room.currency)}`

**Phase goal achievement:** 80% complete. Convention partner cards work perfectly. Voucher validation backend is 100% complete. Only missing: 10 lines of wiring code to connect VoucherInput component to BookingForm.

---

_Verified: 2026-02-02T10:30:00Z_
_Verifier: Claude (gsd-verifier)_
