---
phase: 23-service-ordering
plan: 04
subsystem: backoffice-accommodations
tags: [backoffice, orders, management, state-machine, whatsapp, sidebar]
dependency-graph:
  requires: [23-01, 23-02]
  provides:
    [order-management-ui, order-api-backoffice, sidebar-nav-services-orders]
  affects: []
tech-stack:
  added: []
  patterns:
    [
      slide-out-detail-panel,
      quick-action-buttons,
      auto-refresh-polling,
      tab-filters,
    ]
key-files:
  created:
    - apps/backoffice/app/api/accommodations/orders/route.ts
    - apps/backoffice/app/api/accommodations/orders/[id]/route.ts
    - apps/backoffice/components/accommodations/OrderStatusBadge.tsx
    - apps/backoffice/components/accommodations/OrderDetailPanel.tsx
    - apps/backoffice/components/accommodations/OrderManagement.tsx
    - apps/backoffice/app/(dashboard)/accommodations/orders/page.tsx
  modified:
    - apps/backoffice/components/layout/Sidebar.tsx
decisions:
  - Orders placed after Bookings in sidebar (most logical flow), Services placed after Rooms
  - Slide-out panel for order detail (not separate page) for quick workflow
  - 30-second auto-refresh polling for new orders
  - Inline quick-action buttons in table rows for fastest status progression
  - Supabase join arrays handled via Array.isArray check for type safety
metrics:
  duration: ~5 min
  completed: 2026-01-31
---

# Phase 23 Plan 04: Order Management Dashboard Summary

**Owner-facing order management page with filterable table, slide-out detail panel, state machine status actions, WhatsApp deep-links, and sidebar navigation for Services and Orders**

## What Was Built

### Order List API (GET /api/accommodations/orders)

- Paginated order listing with property_id filter
- Comma-separated status filter support (e.g. "pending,confirmed")
- Search by guest name or order ID
- Joins accom_bookings for guest info and accom_rooms for room number
- Returns camelCase response with itemCount, guestName, roomNumber

### Order Detail + Status Update API (GET/PATCH /api/accommodations/orders/[id])

- GET returns full order with items array, guest contact info, room details
- PATCH validates action against ORDER_VALID_TRANSITIONS state machine
- Invalid transitions return 400 with currentStatus and requestedAction
- Rejection reason stored in delivery_notes field
- All mutations update the updated_at timestamp

### OrderStatusBadge Component

- Follows BookingStatusBadge pattern exactly
- Uses ORDER_STATUS_COLORS and ORDER_STATUS_LABELS from helpers
- Colored pill badge per status (amber/blue/indigo/green/gray/red)

### OrderDetailPanel Component

- Slide-out panel from right (max-w-md, z-50, backdrop overlay)
- Shows guest info with click-to-call and click-to-email
- Room number and type display
- Items table with quantity, name, unit price, total
- Order total prominently displayed
- Action buttons based on current status (only valid transitions shown)
- Reject flow with optional reason textarea
- WhatsApp deep-link button for guest communication

### OrderManagement Component

- Filterable table with tabs: All, Active (pending+confirmed+preparing+ready), Completed, Cancelled
- Search input for guest name or order ID
- Paginated with prev/next controls and total count
- 30-second auto-refresh polling for new orders
- Inline quick-action buttons per row (Confirm/Prepare/Ready/Delivered)
- WhatsApp icon button per row
- Click row to open detail panel
- Empty states for each filter scenario

### Orders Page + Sidebar Navigation

- Page at /accommodations/orders with breadcrumbs
- Sidebar updated: "Orders" after "Bookings", "Services" after "Rooms"

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compiles cleanly
- Next.js build passes
- All 6 files created, 1 modified
- Sidebar shows Services and Orders entries under Accommodations

## Next Phase Readiness

Phase 23 (Service Ordering) is now complete with all 4 plans delivered:

- 23-01: Order foundation (types, API, state machine)
- 23-02: Backoffice service catalog manager
- 23-03: Guest ordering flow
- 23-04: Owner order management dashboard
