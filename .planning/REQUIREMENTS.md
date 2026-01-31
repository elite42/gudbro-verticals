# Requirements: GUDBRO Accommodations v2

**Defined:** 2026-01-31
**Core Value:** Complete the Accommodations vertical end-to-end: zero-commission booking, owner management, and in-stay service ordering with configurable automation.

## v1.4 Requirements

Requirements for Accommodations v2 milestone. Each maps to roadmap phases.

### Property Page

- [ ] **PROP-01**: Guest can view property page with photo gallery (swipeable, fullscreen)
- [ ] **PROP-02**: Guest can see property description, amenities, house rules, and host info
- [ ] **PROP-03**: Guest can check room availability via date picker calendar
- [ ] **PROP-04**: Guest can see price breakdown (per-night x nights + cleaning fee + discounts)
- [ ] **PROP-05**: Guest can view property location (static map or Google Maps link)
- [ ] **PROP-06**: Property page is server-rendered for SEO (OG meta tags, structured data)

### Booking Flow

- [ ] **BOOK-01**: Guest can submit booking request with name, email, phone, dates, guest count
- [ ] **BOOK-02**: Property supports hybrid booking mode (instant-confirm or inquiry, owner-configured)
- [ ] **BOOK-03**: Guest can select payment method (cash, bank transfer, card via Stripe, crypto)
- [ ] **BOOK-04**: Guest receives booking confirmation via WhatsApp and email with booking code
- [ ] **BOOK-05**: Inquiry bookings auto-expire after configurable timeout (default 24h)
- [ ] **BOOK-06**: Double booking is prevented at database level (exclusion constraint on date ranges)
- [ ] **BOOK-07**: Guest can book without creating an account (guest checkout)

### Payments

- [ ] **PAY-01**: Owner can configure accepted payment methods per property
- [ ] **PAY-02**: Cash payment: booking confirmed, guest pays at check-in
- [ ] **PAY-03**: Bank transfer: booking pending, owner confirms payment manually
- [ ] **PAY-04**: Stripe card payment: deposit collected at booking via Stripe Checkout
- [ ] **PAY-05**: Crypto payment: deep-link to crypto payment via @shared/payment
- [ ] **PAY-06**: Stripe webhook handles payment confirmation and failure
- [ ] **PAY-07**: Owner can update payment status manually in dashboard

### Owner Dashboard -- Bookings

- [ ] **OBOOK-01**: Owner can view list of all bookings with status filters
- [ ] **OBOOK-02**: Owner can view booking detail (guest info, dates, payment, special requests)
- [ ] **OBOOK-03**: Owner can confirm or decline inquiry bookings
- [ ] **OBOOK-04**: Owner can mark guest as checked-in or checked-out
- [ ] **OBOOK-05**: Owner can cancel a booking with reason
- [ ] **OBOOK-06**: Owner receives WhatsApp notification on new booking/inquiry

### Owner Dashboard -- Calendar & Pricing

- [ ] **OCAL-01**: Owner can view availability calendar with color-coded booking status
- [ ] **OCAL-02**: Owner can block/unblock date ranges (maintenance, personal use)
- [ ] **OCAL-03**: Owner can set base price per room type
- [ ] **OCAL-04**: Owner can set seasonal price overrides per date range
- [ ] **OCAL-05**: Owner can set weekly/monthly discount percentages

### Owner Dashboard -- Property Management

- [ ] **OMGMT-01**: Owner can manage rooms (CRUD: add, edit, deactivate rooms with capacity, description, images)
- [ ] **OMGMT-02**: Owner can edit property settings (booking mode, check-in/out times, policies)
- [ ] **OMGMT-03**: Owner can manage service categories and items (CRUD with pricing, availability hours)
- [ ] **OMGMT-04**: Owner can generate QR codes for property and individual rooms
- [ ] **OMGMT-05**: Owner can configure automation level per service category (auto-confirm, manual, WhatsApp)

### Owner Dashboard -- Analytics

- [ ] **OANA-01**: Owner can view occupancy rate over time
- [ ] **OANA-02**: Owner can view revenue summary (total, by room type, by month)
- [ ] **OANA-03**: Owner can view average daily rate (ADR) trend
- [ ] **OANA-04**: Owner can view service revenue breakdown by category

### Service Ordering

- [ ] **SERV-01**: Guest can browse full service catalog organized by category
- [ ] **SERV-02**: Guest can add items to cart with quantity and notes
- [ ] **SERV-03**: Guest can specify delivery time (ASAP or time slot)
- [ ] **SERV-04**: Guest can submit service order from In-Stay Dashboard
- [ ] **SERV-05**: Guest can track order status (submitted > confirmed > preparing > ready > delivered)
- [ ] **SERV-06**: Owner receives WhatsApp notification on new service order
- [ ] **SERV-07**: Owner can manage incoming service orders (confirm, update status, reject)
- [ ] **SERV-08**: Service availability respects configured hours (prevent ordering outside hours)
- [ ] **SERV-09**: Cross-vertical deep-links from In-Stay Dashboard (F&B menu, tours, wellness)

### Local Deals & Partnerships

- [ ] **DEAL-01**: Owner can manage local deals in dashboard (CRUD: partner name, discount, description)
- [ ] **DEAL-02**: Guest can view local deals in In-Stay Dashboard (already exists, needs real data)
- [ ] **DEAL-03**: Referral tracking: log when guest taps a partner deal link

### Guest Communication

- [ ] **COMM-01**: Guest can contact host via WhatsApp deep-link from property page and In-Stay Dashboard
- [ ] **COMM-02**: Owner receives WhatsApp notifications for bookings, inquiries, and service orders
- [ ] **COMM-03**: Guest receives booking confirmation email with booking code and property details
- [ ] **COMM-04**: Guest receives pre-arrival email (1 day before check-in) with QR code and check-in info

### Database & Infrastructure

- [ ] **INFRA-01**: New migration: accom_availability table with exclusion constraint for double-booking prevention
- [ ] **INFRA-02**: New migration: accom_service_orders + accom_service_order_items tables
- [ ] **INFRA-03**: Extend accom_properties with booking_mode, accepted_payment_methods, pricing config
- [ ] **INFRA-04**: Extend accom_rooms with base_price, images, beds JSONB
- [ ] **INFRA-05**: Extend accom_bookings with pricing, payment fields
- [ ] **INFRA-06**: RLS policies on all new tables (owner manages via property_id, guest reads via booking)
- [ ] **INFRA-07**: Check-in/check-out dates stored as DATE (not TIMESTAMPTZ) to prevent timezone shifts
- [ ] **INFRA-08**: Stripe webhook endpoint with signature verification

## Future Requirements (v1.5+)

### Reviews

- **REV-01**: Guest can leave a review after checkout (rating + comment)
- **REV-02**: Owner can reply to reviews
- **REV-03**: Reviews visible on property page

### Advanced Features

- **ADV-01**: Visa expiry tracker in In-Stay Dashboard
- **ADV-02**: Digital laundry form (garment selection, pricing, status tracking)
- **ADV-03**: Partner commission tracking with monthly reconciliation
- **ADV-04**: Template-based property setup (hostel, villa, apartment presets)
- **ADV-05**: Calendar sync (iCal export)
- **ADV-06**: Dynamic pricing algorithm

## Out of Scope

| Feature                            | Reason                                                             |
| ---------------------------------- | ------------------------------------------------------------------ |
| Channel manager (OTA sync)         | Enterprise complexity, not needed for 1-5 property owners          |
| Built-in chat system               | WhatsApp dominates SEA, avoid duplicating existing workflow        |
| Guest account system               | Friction kills conversion; booking code is sufficient              |
| Stripe Connect marketplace         | Commission splits manual for MVP; Connect adds weeks of complexity |
| Multi-property portfolio page      | Most target owners have 1-2 properties                             |
| Automated check-in (keyless entry) | Hardware integration, different domain                             |
| NPS/CSAT surveys                   | Different methodology, separate feature                            |
| Public voting/roadmap              | Creates entitlement, GUDBRO is team-driven                         |

## Traceability

| Requirement | Phase    | Status  |
| ----------- | -------- | ------- |
| PROP-01     | Phase 19 | Pending |
| PROP-02     | Phase 19 | Pending |
| PROP-03     | Phase 19 | Pending |
| PROP-04     | Phase 19 | Pending |
| PROP-05     | Phase 19 | Pending |
| PROP-06     | Phase 19 | Pending |
| BOOK-01     | Phase 19 | Pending |
| BOOK-02     | Phase 19 | Pending |
| BOOK-03     | Phase 20 | Pending |
| BOOK-04     | Phase 19 | Pending |
| BOOK-05     | Phase 19 | Pending |
| BOOK-06     | Phase 19 | Pending |
| BOOK-07     | Phase 19 | Pending |
| PAY-01      | Phase 20 | Pending |
| PAY-02      | Phase 20 | Pending |
| PAY-03      | Phase 20 | Pending |
| PAY-04      | Phase 20 | Pending |
| PAY-05      | Phase 20 | Pending |
| PAY-06      | Phase 20 | Pending |
| PAY-07      | Phase 20 | Pending |
| OBOOK-01    | Phase 21 | Pending |
| OBOOK-02    | Phase 21 | Pending |
| OBOOK-03    | Phase 21 | Pending |
| OBOOK-04    | Phase 21 | Pending |
| OBOOK-05    | Phase 21 | Pending |
| OBOOK-06    | Phase 21 | Pending |
| OCAL-01     | Phase 22 | Pending |
| OCAL-02     | Phase 22 | Pending |
| OCAL-03     | Phase 22 | Pending |
| OCAL-04     | Phase 22 | Pending |
| OCAL-05     | Phase 22 | Pending |
| OMGMT-01    | Phase 21 | Pending |
| OMGMT-02    | Phase 21 | Pending |
| OMGMT-03    | Phase 23 | Pending |
| OMGMT-04    | Phase 21 | Pending |
| OMGMT-05    | Phase 23 | Pending |
| OANA-01     | Phase 24 | Pending |
| OANA-02     | Phase 24 | Pending |
| OANA-03     | Phase 24 | Pending |
| OANA-04     | Phase 24 | Pending |
| SERV-01     | Phase 23 | Pending |
| SERV-02     | Phase 23 | Pending |
| SERV-03     | Phase 23 | Pending |
| SERV-04     | Phase 23 | Pending |
| SERV-05     | Phase 23 | Pending |
| SERV-06     | Phase 23 | Pending |
| SERV-07     | Phase 23 | Pending |
| SERV-08     | Phase 23 | Pending |
| SERV-09     | Phase 23 | Pending |
| DEAL-01     | Phase 24 | Pending |
| DEAL-02     | Phase 24 | Pending |
| DEAL-03     | Phase 24 | Pending |
| COMM-01     | Phase 24 | Pending |
| COMM-02     | Phase 24 | Pending |
| COMM-03     | Phase 24 | Pending |
| COMM-04     | Phase 24 | Pending |
| INFRA-01    | Phase 18 | Pending |
| INFRA-02    | Phase 18 | Pending |
| INFRA-03    | Phase 18 | Pending |
| INFRA-04    | Phase 18 | Pending |
| INFRA-05    | Phase 18 | Pending |
| INFRA-06    | Phase 18 | Pending |
| INFRA-07    | Phase 18 | Pending |
| INFRA-08    | Phase 18 | Pending |

**Coverage:**

- v1.4 requirements: 64 total
- Mapped to phases: 64
- Unmapped: 0

---

_Requirements defined: 2026-01-31_
_Last updated: 2026-01-31 after roadmap creation (traceability populated)_
