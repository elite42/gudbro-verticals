# Phase 23: Service Ordering - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Guests can browse and order services from the In-Stay Dashboard, and owners can manage the service catalog and incoming orders from the backoffice. The database schema (service categories, items, orders, order items) already exists from Phase 18. This phase builds the full UI and API layer on top of it.

**Out of scope:** Advanced laundry form (PRD marks as v1.5+ ADV-02), payment processing for service orders (room_charge is default), analytics on service revenue (Phase 24).

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion (Full)

The user granted full discretion on all implementation decisions. The following captures Claude's intended approach based on project context, existing patterns, and PRD requirements.

### Service Catalog (Guest)

- Evolve existing ServicesCarousel into a full-page catalog modal/drawer
- Category tabs or sidebar navigation (horizontal scrollable tabs on mobile, consistent with coffeeshop PWA patterns)
- Item cards show: name, description, price (formatted per currency), image (if available), availability hours badge
- Items outside availability hours shown grayed out with "Available HH:MM - HH:MM" label (not hidden)
- Reuse existing GET /api/stay/[code]/services endpoint, extend response if needed

### Cart & Checkout (Guest)

- Floating cart button with item count badge (bottom-right, above existing nav)
- Cart as a drawer/sheet from bottom (mobile-first pattern)
- Per-item: quantity stepper (1-10), optional notes text field
- Delivery time: toggle between "ASAP" (default) and time picker (30-min slots within service hours)
- Order summary: itemized list, subtotal, total (no tax calculation for MVP -- room_charge default)
- Submit button with confirmation state
- Cart persists in React state (no localStorage needed -- session-scoped)

### Order Tracking (Guest)

- Order status timeline with step indicators: Submitted > Confirmed > Preparing > Ready > Delivered
- Cancelled shown as red terminal state
- Polling-based refresh (30s interval) -- no WebSocket needed for MVP
- Orders list accessible from In-Stay Dashboard (new section below ServicesCarousel)
- Most recent order shown prominently with live status

### Service Catalog Management (Owner)

- New page: /accommodations/services in backoffice sidebar
- Follow ChargesManager pattern (existing in backoffice)
- Two-panel layout: categories list (left), items for selected category (right)
- Category CRUD: name, icon (Phosphor icon picker or text), sort_order, is_active toggle, automation_level dropdown
- Item CRUD: name, description, price (major units input, stored as minor), image_url, availability hours (from/until time pickers), in_stock toggle, sort_order
- Automation level per category: auto_confirm (instant), manual (owner confirms), whatsapp_notify (auto-confirm + notify)
- Drag-to-reorder for both categories and items (or up/down arrows for simplicity)

### Order Management (Owner)

- New page: /accommodations/orders in backoffice sidebar
- Filterable table: status, room number, date range
- Default view: pending + confirmed orders (active)
- Order detail panel (slide-out or inline expand): guest info, room, items list, timestamps, notes
- Action buttons: Confirm (pending->confirmed), Start Preparing (confirmed->preparing), Mark Ready (preparing->ready), Mark Delivered (ready->delivered), Reject/Cancel with reason
- WhatsApp deep-link for guest communication on each order
- OrderStatusBadge component reused in both guest and owner views

### Database Extension

- Migration 086: Add `automation_level TEXT NOT NULL DEFAULT 'manual' CHECK (automation_level IN ('auto_confirm', 'manual', 'whatsapp_notify'))` to `accom_service_categories`
- RLS for guest order creation: SECURITY DEFINER function (pattern from Phase 18)
- Guest can read own orders (via booking_id from JWT)

### Notifications

- WhatsApp deep-link notification on new order (not actual WhatsApp API -- deep-link pattern consistent with booking notifications)
- Format: pre-filled message to owner's WhatsApp with order summary
- Auto-confirm orders for categories with automation_level = 'auto_confirm'

### Cross-Vertical Deep-Links (SERV-09)

- Buttons in In-Stay Dashboard linking to other GUDBRO verticals
- F&B link to coffeeshop PWA (already exists in ecosystem)
- Tours/Wellness links as configurable URL buttons (owner sets in property settings)
- Simple external link pattern -- no deep integration needed for MVP

</decisions>

<specifics>
## Specific Ideas

- ServicesCarousel already exists and fetches data correctly -- evolve it rather than replace
- ChargesManager in backoffice is the closest pattern for service catalog CRUD
- BookingStatusBadge pattern can be adapted for OrderStatusBadge
- Snapshot pricing already implemented in DB schema (order items store name + unit_price at order time)
- Guest JWT token already carries property_id and booking_id -- sufficient for order creation auth
- Sidebar navigation in backoffice already has accommodations section -- add Services and Orders entries

</specifics>

<deferred>
## Deferred Ideas

- Advanced laundry form with garment selection -- PRD marks as v1.5+ (ADV-02)
- Real-time WebSocket order updates -- polling sufficient for MVP
- Service order payment processing (Stripe for services) -- room_charge default for now
- Service revenue analytics -- Phase 24
- Image upload for service items -- URL-based for now, upload in future
- Multi-language service names -- translations table exists but UI deferred

</deferred>

---

_Phase: 23-service-ordering_
_Context gathered: 2026-01-31_
