# Roadmap: GUDBRO Verticals

## Milestones

- ✅ **v1.0 QA Multi-Vertical PWAs** - Phases 1-3 (shipped 2026-01-29)
- ✅ **v1.1 In-Stay MVP Backend** - Phases 4-8 (shipped 2026-01-30)
- ✅ **v1.2 Tech Debt Cleanup** - Phases 9-12 (shipped 2026-01-30)
- ✅ **v1.3 Merchant Feedback Intelligence** - Phases 13-17 (shipped 2026-01-30)
- **v1.4 Accommodations v2** - Phases 18-24 (in progress)

## Phases

<details>
<summary>v1.0 QA Multi-Vertical PWAs (Phases 1-3) - SHIPPED 2026-01-29</summary>

See milestones/v1-ROADMAP.md for details.

</details>

<details>
<summary>v1.1 In-Stay MVP Backend (Phases 4-8) - SHIPPED 2026-01-30</summary>

See milestones/v1.1-ROADMAP.md for details.

</details>

<details>
<summary>v1.2 Tech Debt Cleanup (Phases 9-12) - SHIPPED 2026-01-30</summary>

See milestones/v1.2-ROADMAP.md for details.

</details>

<details>
<summary>v1.3 Merchant Feedback Intelligence (Phases 13-17) - SHIPPED 2026-01-30</summary>

See milestones/v1.3-ROADMAP.md for details.

</details>

### v1.4 Accommodations v2

**Milestone Goal:** Complete the Accommodations vertical end-to-end: public property page with hybrid booking, full owner dashboard in backoffice, and configurable service ordering with cross-vertical deep-links.

- [x] **Phase 18: Database Foundation** - Schema extensions, availability constraint, service order tables, RLS (completed 2026-01-31)
- [x] **Phase 19: Property Page & Booking Flow** - Public property page with SEO, guest booking submission (completed 2026-01-31)
- [ ] **Phase 20: Payments** - Payment method configuration, Stripe checkout, webhook handling
- [ ] **Phase 21: Owner Dashboard - Bookings & Property** - Booking management, room CRUD, property settings, QR codes
- [ ] **Phase 22: Owner Dashboard - Calendar & Pricing** - Availability calendar, date blocking, seasonal pricing
- [ ] **Phase 23: Service Ordering** - Guest service catalog, cart, order lifecycle, owner order management
- [ ] **Phase 24: Analytics, Deals & Communication** - Owner analytics, local deals, guest email notifications

## Phase Details

### Phase 18: Database Foundation

**Goal**: All database tables, constraints, and policies are in place so every subsequent phase builds on correct schema
**Depends on**: Nothing (first phase of v1.4)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, INFRA-08
**Success Criteria** (what must be TRUE):

1. Double booking is impossible at the database level (exclusion constraint rejects overlapping date ranges for the same room)
2. Check-in and check-out dates are stored as DATE type, preventing timezone shift bugs
3. All new and extended tables have RLS policies that prevent cross-tenant data access
4. Service order tables exist with proper foreign keys to bookings and services
5. Stripe webhook endpoint path is registered and signature verification logic is in place
   **Plans**: 2 plans

Plans:

- [x] 18-01-PLAN.md -- SQL migration 083: table extensions, exclusion constraint, service order tables, RLS
- [x] 18-02-PLAN.md -- Stripe webhook endpoint with signature verification (stubbed handlers)

### Phase 19: Property Page & Booking Flow

**Goal**: Guests can discover a property via its public page and submit a booking request or get instant confirmation
**Depends on**: Phase 18
**Requirements**: PROP-01, PROP-02, PROP-03, PROP-04, PROP-05, PROP-06, BOOK-01, BOOK-02, BOOK-04, BOOK-05, BOOK-06, BOOK-07
**Success Criteria** (what must be TRUE):

1. Guest can open a property page by URL, see photos in a swipeable gallery, and read property details (description, amenities, house rules, host info, location)
2. Guest can select dates on a calendar, see which dates are unavailable, and view a price breakdown (per-night x nights + cleaning fee + discounts)
3. Guest can submit a booking with name, email, phone, dates, and guest count without creating an account
4. Property page is server-rendered with OG meta tags and structured data for SEO
5. Inquiry bookings auto-expire after the configured timeout, and booking confirmation is sent via WhatsApp deep-link and email
   **Plans**: 3 plans (wave 1 -> wave 2 -> wave 3)

Plans:

- [x] 19-01-PLAN.md -- Dependencies, types, lib utilities, API routes (property, availability, booking)
- [x] 19-02-PLAN.md -- Client components (gallery, property sections, calendar, form, confirmation)
- [x] 19-03-PLAN.md -- Server page (SSR, SEO, JSON-LD), client orchestrator, confirmation page, CSS theming

### Phase 20: Payments

**Goal**: Owners can configure accepted payment methods and guests can pay via cash, bank transfer, Stripe card, or crypto
**Depends on**: Phase 19
**Requirements**: BOOK-03, PAY-01, PAY-02, PAY-03, PAY-04, PAY-05, PAY-06, PAY-07
**Success Criteria** (what must be TRUE):

1. Owner can configure which payment methods are accepted for their property
2. Guest sees only the enabled payment methods and can select one during booking
3. Stripe card payments collect a deposit via Stripe Checkout with webhook confirmation handling payment success and failure
4. Cash bookings are confirmed immediately; bank transfer bookings stay pending until owner confirms payment manually
5. Crypto payment deep-links via @shared/payment are functional
   **Plans**: TBD

Plans:

- [ ] 20-01: TBD
- [ ] 20-02: TBD

### Phase 21: Owner Dashboard - Bookings & Property

**Goal**: Owners can manage bookings and configure their property and rooms from the backoffice
**Depends on**: Phase 19
**Requirements**: OBOOK-01, OBOOK-02, OBOOK-03, OBOOK-04, OBOOK-05, OBOOK-06, OMGMT-01, OMGMT-02, OMGMT-04
**Success Criteria** (what must be TRUE):

1. Owner can view a filterable list of all bookings and drill into any booking to see guest info, dates, payment status, and special requests
2. Owner can confirm or decline inquiry bookings, mark guests as checked-in or checked-out, and cancel bookings with a reason
3. Owner receives a WhatsApp notification when a new booking or inquiry arrives
4. Owner can add, edit, and deactivate rooms with capacity, description, and images
5. Owner can generate QR codes for the property and individual rooms
   **Plans**: TBD

Plans:

- [ ] 21-01: TBD
- [ ] 21-02: TBD
- [ ] 21-03: TBD

### Phase 22: Owner Dashboard - Calendar & Pricing

**Goal**: Owners can visually manage availability and set flexible pricing strategies
**Depends on**: Phase 21
**Requirements**: OCAL-01, OCAL-02, OCAL-03, OCAL-04, OCAL-05
**Success Criteria** (what must be TRUE):

1. Owner can view a monthly calendar with color-coded dates showing booked, available, and blocked status
2. Owner can block and unblock date ranges for maintenance or personal use
3. Owner can set base price per room type and override prices for specific date ranges (seasonal pricing)
4. Owner can set weekly and monthly discount percentages that automatically apply to qualifying bookings
   **Plans**: TBD

Plans:

- [ ] 22-01: TBD
- [ ] 22-02: TBD

### Phase 23: Service Ordering

**Goal**: Guests can browse and order services from the In-Stay Dashboard, and owners can manage service catalog and incoming orders
**Depends on**: Phase 18, Phase 21
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06, SERV-07, SERV-08, SERV-09, OMGMT-03, OMGMT-05
**Success Criteria** (what must be TRUE):

1. Guest can browse the full service catalog organized by category and add items to a cart with quantity and notes
2. Guest can submit a service order from the In-Stay Dashboard specifying ASAP or a time slot for delivery
3. Guest can track order status through the full lifecycle (submitted, confirmed, preparing, ready, delivered)
4. Owner can manage service categories and items (CRUD with pricing, availability hours) and configure automation level per category
5. Owner receives WhatsApp notification on new orders and can confirm, update status, or reject from the dashboard
   **Plans**: TBD

Plans:

- [ ] 23-01: TBD
- [ ] 23-02: TBD
- [ ] 23-03: TBD

### Phase 24: Analytics, Deals & Communication

**Goal**: Owners have visibility into business performance, guests discover local deals, and booking communication flows automatically
**Depends on**: Phase 21, Phase 23
**Requirements**: OANA-01, OANA-02, OANA-03, OANA-04, DEAL-01, DEAL-02, DEAL-03, COMM-01, COMM-02, COMM-03, COMM-04
**Success Criteria** (what must be TRUE):

1. Owner can view occupancy rate, revenue summary (total, by room type, by month), ADR trend, and service revenue breakdown
2. Owner can create, edit, and delete local deals with partner name, discount, and description
3. Referral clicks from the In-Stay Dashboard to partner deal links are logged for tracking
4. Guest receives booking confirmation email with booking code and property details, and a pre-arrival email with QR code one day before check-in
5. Guest can contact host via WhatsApp deep-link from both the property page and the In-Stay Dashboard, and owner receives WhatsApp notifications for bookings, inquiries, and service orders
   **Plans**: TBD

Plans:

- [ ] 24-01: TBD
- [ ] 24-02: TBD
- [ ] 24-03: TBD

## Progress

**Execution Order:** 18 > 19 > 20 > 21 > 22 > 23 > 24
(Phase 20 and 21 can partially overlap -- both depend on Phase 19 but are independent of each other)

| Phase                                     | Milestone | Plans Complete | Status      | Completed  |
| ----------------------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. TypeScript QA                          | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 2. UI/UX QA                               | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 3. Build & Nav QA                         | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 4. Accommodations Schema                  | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 5. Seed Data                              | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 6. API Routes                             | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 7. Dashboard Frontend                     | v1.1      | 4/4            | Complete    | 2026-01-30 |
| 8. Integration & Polish                   | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 9. Code Fixes                             | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 10. E2E Test Infrastructure               | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 11. E2E Smoke Tests                       | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 12. Visual and Quality                    | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 13. Foundation and AI Pipeline            | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 14. Merchant Submission UI                | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 15. Merchant Notifications                | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 16. Admin Kanban                          | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 17. Analytics Dashboard                   | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 18. Database Foundation                   | v1.4      | 2/2            | Complete    | 2026-01-31 |
| 19. Property Page & Booking Flow          | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 20. Payments                              | v1.4      | 0/2            | Not started | -          |
| 21. Owner Dashboard - Bookings & Property | v1.4      | 0/3            | Not started | -          |
| 22. Owner Dashboard - Calendar & Pricing  | v1.4      | 0/2            | Not started | -          |
| 23. Service Ordering                      | v1.4      | 0/3            | Not started | -          |
| 24. Analytics, Deals & Communication      | v1.4      | 0/3            | Not started | -          |

---

_Roadmap created: 2026-01-29_
_Last updated: 2026-01-31 after Phase 19 completion_
