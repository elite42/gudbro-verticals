---
phase: 23-service-ordering
plan: 01
subsystem: accommodations-ordering
tags: [database, api, types, state-machine, orders]
dependency-graph:
  requires: [phase-22]
  provides: [migration-086, order-types, order-api, order-state-machine]
  affects: [23-02, 23-03, 23-04]
tech-stack:
  added: []
  patterns: [price-snapshot, auto-confirm, availability-hours, jwt-guest-auth]
key-files:
  created:
    - shared/database/migrations/schema/086-service-automation-level.sql
    - apps/accommodations/frontend/app/api/stay/[code]/orders/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/orders/[orderId]/route.ts
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/lib/stay-api.ts
    - apps/accommodations/frontend/app/api/stay/[code]/services/route.ts
    - apps/backoffice/lib/accommodations/helpers.ts
decisions:
  - Auto-confirm when ALL items in order belong to auto_confirm or whatsapp_notify categories
  - Property timezone used for availability hour checks via Intl.DateTimeFormat
  - ServiceCategoryResponseWithTimezone extends base type to include timezone field
metrics:
  duration: ~5 min
  completed: 2026-01-31
---

# Phase 23 Plan 01: Order Foundation (Types, API, State Machine) Summary

**Database migration for automation_level, full order types, guest order API with price snapshot and auto-confirm, order state machine in backoffice helpers**

## What Was Built

### Migration 086: Service Automation Level

- Added `automation_level` column to `accom_service_categories` with CHECK constraint (`auto_confirm`, `manual`, `whatsapp_notify`)
- Default: `manual` (owner must confirm/reject orders)

### TypeScript Types (stay.ts)

- `CartItem` - client-side cart item with name, price, currency, quantity, notes
- `ServiceOrder` - full order with status, pricing, items, timestamps
- `ServiceOrderItem` - line item with snapshot name/unitPrice/total
- `CreateOrderRequest` - POST body for order creation
- `OrdersResponse` - wrapper for order list
- `ServiceCategoryResponseWithTimezone` - extends categories with timezone
- Extended `ServiceItemResponse` with availability fields (isAlwaysAvailable, availableFrom, availableUntil)
- Extended `ServiceCategoryWithItems` with automationLevel
- Extended `ApiError` union with order_not_found, invalid_transition, outside_hours

### Order State Machine (helpers.ts)

- `ORDER_VALID_TRANSITIONS` - pending->confirmed/cancelled, confirmed->preparing/cancelled, preparing->ready, ready->delivered
- `ORDER_ACTION_TO_STATUS` - maps actions (confirm, reject, start_preparing, mark_ready, mark_delivered) to statuses
- `ORDER_STATUS_COLORS` - badge color classes per status
- `ORDER_STATUS_LABELS` - human-readable labels per status
- `isValidOrderTransition()` - validation function
- `buildOrderWhatsAppMessage()` - WhatsApp notification builder

### Guest Order API

- **POST /api/stay/[code]/orders** - Create order with:
  - DB price snapshot (never trusts client prices)
  - Item ownership verification (must belong to guest's property)
  - Stock check (in_stock flag)
  - Availability hour check (property timezone via Intl.DateTimeFormat)
  - Auto-confirm logic (all items from auto_confirm/whatsapp_notify categories -> status=confirmed)
  - Returns 201 with created order
- **GET /api/stay/[code]/orders** - List all orders for booking (reverse chronological)
- **GET /api/stay/[code]/orders/[orderId]** - Single order with booking ownership check (PGRST116 for 404)

### Services Endpoint Enhancement

- Returns `is_always_available`, `available_from`, `available_until` per item
- Returns `automation_level` per category
- Returns property `timezone` in response

### stay-api.ts Helpers

- `postStayAPI<T>()` - generic POST wrapper with Bearer auth + JSON body
- `fetchOrdersAPI()` - list orders convenience wrapper
- `createOrderAPI()` - create order convenience wrapper
- `fetchOrderStatusAPI()` - single order convenience wrapper

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

1. **Auto-confirm scope**: ALL items must belong to auto_confirm or whatsapp_notify categories for auto-confirm. Mixed categories default to pending.
2. **Timezone handling**: Used `Intl.DateTimeFormat` for timezone-aware availability checks (no external library needed).
3. **ServiceCategoryResponseWithTimezone**: Created as extension of base type to avoid breaking existing consumers.

## Verification

- [x] Migration 086 SQL valid with correct CHECK constraint
- [x] TypeScript compiles cleanly (accommodations + backoffice)
- [x] Order state machine exports verified
- [x] Services endpoint returns availability hours and timezone
- [x] All 7 success criteria met

## Next Phase Readiness

Plan 23-02 (Guest Cart & Order UI) can proceed - all types, API routes, and helpers are in place.
