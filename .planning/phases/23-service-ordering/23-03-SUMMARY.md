---
phase: 23
plan: 03
subsystem: accommodations-guest-ordering
tags: [react, hooks, cart, order-tracking, polling, ui-components]
dependency-graph:
  requires: [23-01]
  provides: [guest-cart, service-catalog-ui, order-tracking-ui, cart-drawer]
  affects: [23-04]
tech-stack:
  added: []
  patterns:
    [
      page-level-state-management,
      overlay-pattern,
      polling-hook,
      minor-unit-pricing,
    ]
key-files:
  created:
    - apps/accommodations/frontend/hooks/useServiceCart.ts
    - apps/accommodations/frontend/hooks/useOrderPolling.ts
    - apps/accommodations/frontend/components/stay/ServiceCatalog.tsx
    - apps/accommodations/frontend/components/stay/ServiceItemCard.tsx
    - apps/accommodations/frontend/components/stay/CartFAB.tsx
    - apps/accommodations/frontend/components/stay/CartDrawer.tsx
    - apps/accommodations/frontend/components/stay/OrderStatusTimeline.tsx
    - apps/accommodations/frontend/components/stay/ActiveOrders.tsx
  modified:
    - apps/accommodations/frontend/components/stay/ServicesCarousel.tsx
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
decisions:
  - id: cart-page-level
    decision: Cart state managed at page level via useServiceCart hook (not localStorage)
    reason: Survives tab navigation within dashboard without persistence complexity
  - id: overlay-pattern
    decision: ServiceCatalog and CartDrawer render as fixed overlays (not route changes)
    reason: Cart state preserved, no navigation complexity, instant open/close
  - id: polling-auto-stop
    decision: Order polling auto-stops when no active orders remain
    reason: Avoid unnecessary network requests when all orders delivered/cancelled
metrics:
  duration: ~5 min
  completed: 2026-01-31
---

# Phase 23 Plan 03: Guest Cart & Order UI Summary

**One-liner:** Full guest ordering flow with cart hook, catalog overlay, cart drawer with ASAP/scheduled delivery, and live order tracking via 30s polling.

## What Was Built

### Hooks

- **useServiceCart** -- React state cart with add/remove/updateQuantity/updateNotes/clearCart. Clamped 1-10 range. Returns itemCount and subtotal computed from minor currency units.
- **useOrderPolling** -- Polls fetchOrdersAPI every 30s when enabled. Auto-stops when no active orders (all delivered/cancelled). Cleanup on unmount.

### Components

- **ServiceCatalog** -- Full-screen overlay with horizontal category tabs (pill buttons), item grid (1 col mobile, 2 cols tablet+), availability checking against property timezone. Available items sorted first, unavailable grayed out.
- **ServiceItemCard** -- Card layout with image/fallback, name, description (2-line clamp), price, availability badges (time range for outside-hours, "Out of stock" for !inStock). Quantity stepper when in cart, add button when not.
- **CartFAB** -- Fixed round button (bottom-20 right-4, above BottomNav), z-40, red badge with count. Hidden when empty, scale animation on appear.
- **CartDrawer** -- Bottom sheet (max 80vh) with items list (quantity stepper, notes input, remove), delivery time toggle (ASAP vs scheduled 30-min slots), delivery notes, total, "Place Order" button with loading/error/success states.
- **OrderStatusTimeline** -- 5-step horizontal timeline (Submitted > Confirmed > Preparing > Ready > Delivered). Completed steps checkmarked, current highlighted with ring, cancelled shows red badge.
- **ActiveOrders** -- Dashboard section showing primary active order with full timeline, other active orders as compact cards with status badge. Hidden when no active orders.

### Integration

- **ServicesCarousel** enhanced with "View All" button, quick-add (+) buttons, and onCategoriesLoaded callback to share loaded data with parent.
- **Dashboard page** now manages cart at page level, shows CartFAB, opens CartDrawer/ServiceCatalog as overlays, renders ActiveOrders below ServicesCarousel. BottomNav "services" tab opens catalog.

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

1. **Cart at page level** -- useServiceCart called in page component, passed down to overlays. Survives tab changes without localStorage.
2. **Overlay pattern** -- Catalog and cart render as fixed overlays, not route changes. Preserves all state.
3. **Polling auto-stop** -- useOrderPolling stops interval when all orders are delivered/cancelled to reduce network load.
4. **Currency from service items** -- Property currency derived from first service item's currency field (fallback EUR).
5. **Categories shared via callback** -- ServicesCarousel loads data once and shares via onCategoriesLoaded, avoiding duplicate fetch when opening catalog.

## Verification

- TypeScript compiles cleanly (tsc --noEmit passes)
- Next.js build compiles successfully (pre-existing Suspense issue on /dashboard/bookings is unrelated)
- All 8 new files created, 2 existing files modified
- Lint and prettier pass via pre-commit hooks

## Next Phase Readiness

Plan 23-04 (Owner Order Management) can proceed. Guest ordering flow is complete -- owners need backoffice UI to see and manage incoming orders.
