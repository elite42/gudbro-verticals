---
phase: 39-polish-analytics
plan: 02
subsystem: accommodations-receipts
tags: [receipt-confirmation, guest-pwa, backoffice-settings, patch-endpoint]

dependency-graph:
  requires: [39-01]
  provides: [guest-receipt-confirmation, receipt-settings-ui, receipt-patch-api]
  affects: []

tech-stack:
  added: []
  patterns: [receipt-view-component, receipt-confirmation-flow]

file-tracking:
  key-files:
    created:
      - apps/accommodations/frontend/components/stay/ReceiptView.tsx
    modified:
      - apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx
      - apps/backoffice/app/api/accommodations/property/route.ts
      - apps/accommodations/frontend/types/stay.ts
      - apps/accommodations/frontend/app/api/stay/[code]/orders/route.ts
      - apps/accommodations/frontend/app/api/stay/[code]/orders/[orderId]/route.ts
      - apps/accommodations/frontend/components/stay/OrderDetailSheet.tsx
      - apps/accommodations/frontend/components/stay/OrderListView.tsx
      - apps/accommodations/frontend/app/stay/[code]/page.tsx

decisions:
  - id: RECEIPT-01
    decision: ReceiptView rendered inside OrderDetailSheet for delivered orders with receiptAutoConfirmAt (signals receipts enabled)
  - id: RECEIPT-02
    decision: OrderListView passes propertyName/bookingCode/token/onOrderUpdated through to OrderDetailSheet (optional props for backward compat)
  - id: RECEIPT-03
    decision: Auto-confirmed detection is client-side (receiptAutoConfirmAt <= now) without extra API call

metrics:
  duration: ~4 min
  completed: 2026-02-02
---

# Phase 39 Plan 02: Guest Receipt Confirmation Summary

**One-liner:** Receipt toggle in backoffice settings, itemized receipt view in guest PWA with confirm/auto-confirm flow via PATCH endpoint.

## What Was Done

### Task 1: Receipt settings toggle in backoffice + property API

- Added `receipt_enabled` and `receipt_auto_confirm_hours` to property GET SELECT and PUT allowed fields
- Added Guest Receipts section to settings page with toggle switch and auto-confirm hours input
- Toggle conditionally shows timeout config (1-168 hours, default 24)
- Extended `PropertySettings` interface with new fields

### Task 2: Guest receipt view + confirm action in PWA

- Extended `ServiceOrder` type with `receiptConfirmedAt`, `receiptAutoConfirmAt`, `paymentMethod`
- Added receipt fields to GET query SELECT and `mapOrder()` function
- Created PATCH handler for receipt confirmation with auth, ownership, status, and idempotency checks
- Created `ReceiptView` component (receipt-style layout with itemized charges, payment method, confirm button, auto-confirm countdown)
- Integrated ReceiptView in OrderDetailSheet for delivered orders where receipts are enabled
- Passed propertyName, bookingCode, token, onOrderUpdated through OrderListView to OrderDetailSheet
- Fixed [orderId] route to include new ServiceOrder fields (blocking Rule 3)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed orderId route missing new ServiceOrder fields**

- **Found during:** Task 2 typecheck
- **Issue:** `app/api/stay/[code]/orders/[orderId]/route.ts` builds ServiceOrder manually and was missing the 3 new fields
- **Fix:** Added receiptConfirmedAt, receiptAutoConfirmAt, paymentMethod to the order object
- **Files modified:** `apps/accommodations/frontend/app/api/stay/[code]/orders/[orderId]/route.ts`
- **Commit:** 28a8536

## Commits

| Hash    | Message                                                           |
| ------- | ----------------------------------------------------------------- |
| 50211fb | feat(39-02): receipt settings toggle in backoffice + property API |
| 28a8536 | feat(39-02): guest receipt view + confirm action in PWA           |

## Verification

- [x] `apps/backoffice` TypeScript: zero errors
- [x] `apps/accommodations/frontend` TypeScript: only pre-existing @shared/ module errors
- [x] Settings page has receipt toggle and auto-confirm hours input
- [x] Property API reads/writes receipt_enabled and receipt_auto_confirm_hours
- [x] Guest PWA shows receipt view for delivered orders with confirm button
- [x] PATCH endpoint handles receipt confirmation with proper validation
- [x] Auto-confirm logic: receiptAutoConfirmAt shown as countdown, treated as confirmed when passed
