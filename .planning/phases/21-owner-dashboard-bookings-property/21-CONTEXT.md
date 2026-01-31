# Phase 21: Owner Dashboard - Bookings & Property - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Owner can manage bookings and configure property/rooms from the backoffice app (`apps/backoffice/`). Includes: booking list with filters, booking detail with actions (confirm/decline/checkin/checkout/cancel), WhatsApp notifications for new bookings, room CRUD, and QR code generation for property and rooms.

NOT in scope: calendar/pricing (Phase 22), service ordering (Phase 23), analytics/deals (Phase 24).

</domain>

<decisions>
## Implementation Decisions

### Booking List

- Static HTML table following existing backoffice pattern (like orders page)
- Tab-based filtering: All | Pending | Confirmed | Checked-in | Cancelled
- Columns: Guest name, Room, Check-in/out dates, Status badge, Payment status badge, Amount, Actions
- Sort by check-in date descending (upcoming first)
- Color-coded status badges following existing palette (green=confirmed, amber=pending, blue=checked-in, gray=checked-out, red=cancelled)
- Search by guest name or booking code
- No pagination initially (owner properties are small — 1-20 rooms, manageable booking volumes)

### Booking Detail

- Slide-over panel or dedicated page (not modal) — enough space for all booking info
- Sections: Guest info, Stay dates, Room, Price breakdown, Payment info, Special requests, Timeline/history
- Action buttons contextual to status:
  - Pending → Confirm / Decline (with reason)
  - Confirmed → Mark Checked-in / Cancel (with reason)
  - Checked-in → Mark Checked-out / Cancel
- Decline/cancel requires reason text (free text, not predefined)
- Payment section shows: method, status, deposit amount, Stripe payment link if applicable
- Manual payment confirmation button for bank_transfer bookings (already exists in accommodations dashboard, reuse pattern)

### WhatsApp Notifications

- Use WhatsApp deep-link (wa.me) pattern, not WhatsApp Business API
- Notification trigger: new booking or inquiry submitted
- Pre-formatted message sent to owner's WhatsApp with: guest name, dates, room, booking code
- Implementation: client-side `window.open(whatsappUrl)` from guest booking flow (already partially implemented in Phase 19)
- For owner notification: webhook/API that constructs WhatsApp deep-link and could be sent via email or displayed in dashboard notification bell

### Room Management

- CRUD in backoffice settings section under Accommodations
- Form fields: name, type (single/double/suite/dorm/etc), capacity, description, price per night, images, active toggle
- Image upload using existing Supabase Storage pattern
- Deactivate (soft delete) instead of hard delete — preserve booking history
- Simple list with inline edit toggle (follow ChargesManager pattern for add/edit/deactivate)
- Sort order drag or manual number

### QR Code Generation

- Generate QR codes client-side using a library (qrcode.react or similar)
- Two QR types:
  1. Property QR → links to property page URL (`stays.gudbro.com/{slug}`) for booking
  2. Room QR → links to check-in page (`stays.gudbro.com/checkin/{propertyId}/{roomId}`) for in-stay access
- Download as PNG
- Print-friendly layout (QR + property name + room name below)
- No bulk generation needed initially — owner generates one at a time

### Navigation & Location

- New section in backoffice sidebar: "Accommodations" (or under existing Partnerships section)
- Sub-pages: Bookings, Rooms, Property Settings, QR Codes
- Auth: ADMIN_API_KEY pattern (already established in Phase 20)
- API routes in backoffice app under `/api/accommodations/`

### Claude's Discretion

- Exact spacing, typography, and card styling (follow existing backoffice design tokens)
- Loading states and skeleton patterns
- Error handling and empty states design
- Exact WhatsApp message template formatting
- QR code styling (colors, logo embed or plain)
- Whether booking detail is a slide-over panel or separate page (choose based on complexity)
- Timeline/history component design for booking status changes

</decisions>

<specifics>
## Specific Ideas

- Booking list should feel operational — owner opens it in the morning to see today's check-ins and pending inquiries
- Status transitions should be one-click with optional reason (not multi-step wizards)
- QR codes should be simple to print — one QR per page with clear labels, meant to be placed in rooms
- Room management should be minimal — these are small properties (1-20 rooms), not hotel chains
- Reuse existing `apps/accommodations/frontend/app/dashboard/bookings/page.tsx` patterns where possible, but rebuild in backoffice context with proper auth

</specifics>

<deferred>
## Deferred Ideas

- Bulk QR generation/download as PDF — add if owners request it
- Booking calendar view (visual timeline) — Phase 22
- Seasonal pricing per room — Phase 22
- Date blocking for maintenance — Phase 22
- Service order management — Phase 23
- Analytics and revenue reports — Phase 24
- Email notifications to owner — Phase 24
- Multi-property management — future milestone

</deferred>

---

_Phase: 21-owner-dashboard-bookings-property_
_Context gathered: 2026-01-31_
