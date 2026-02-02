# Roadmap: GUDBRO Verticals

## Milestones

- ✅ **v1.0 QA Multi-Vertical PWAs** - Phases 1-3 (shipped 2026-01-29)
- ✅ **v1.1 In-Stay MVP Backend** - Phases 4-8 (shipped 2026-01-30)
- ✅ **v1.2 Tech Debt Cleanup** - Phases 9-12 (shipped 2026-01-30)
- ✅ **v1.3 Merchant Feedback Intelligence** - Phases 13-17 (shipped 2026-01-30)
- ✅ **v1.4 Accommodations v2** - Phases 18-24 (shipped 2026-01-31)
- 🚧 **v1.5 Frictionless Guest Access + Accommodations Polish** - Phases 25-39 (in progress)

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

<details>
<summary>v1.4 Accommodations v2 (Phases 18-24) - SHIPPED 2026-01-31</summary>

See milestones/v1.4-ROADMAP.md for details.

</details>

### 🚧 v1.5 Frictionless Guest Access + Accommodations Polish (In Progress)

**Milestone Goal:** Replace booking-code verification with room-based QR access, progressive authentication for paid actions, owner-configurable security levels, document upload with GDPR compliance, multi-zone WiFi display, PLUS comprehensive bug fixes and feature additions from manual testing session (13 bugs, 38 features across guest PWA, backoffice owner dashboard, service ordering, Tourist Concierge, and guest lifecycle).

- [x] **Phase 25: Room Code Foundation** - Permanent room codes, browse-tier QR access, instant WiFi/info dashboard
- [x] **Phase 26: Progressive Authentication** - Two-tier JWT, inline verification for paid actions, multi-guest PIN support
- [x] **Phase 27: Owner Security Configuration** - Security presets, configurable verification methods, action-level gating
- [x] **Phase 28: Document Upload + Visa Tracking** - Passport/visa photo upload, expiry reminders, GDPR auto-delete
- [x] **Phase 29: Multi-Zone WiFi** - Per-zone WiFi credentials, room overrides, zone-organized display
- [x] **Phase 30: Shared Module Audit** - Catalog of reusable modules across verticals (ready/adaptable/to-build)
- [x] **Phase 31: Bug Fixes + Image Foundation** - 9 bugs fixed, service/item image upload, WiFi QR extraction
- [x] **Phase 32: Owner Dashboard Enhancements** - Gantt calendar, onboarding wizard, property data, policies, booking history
- [x] **Phase 33: Guest Dashboard Redesign** - Card-based homepage, dismissible WiFi box, profile page, navigation restructure
- [x] **Phase 34: Service Expansion + Minibar** - Catalog redesign, minibar self-service, included-in-rate, order improvements
- [x] **Phase 35: Guest Feedback System** - In-stay complaints channel, post-stay category ratings with AI pipeline
- [x] **Phase 36: Guest Requests + Concierge** - Tourist Concierge hub, Explore page, bottom nav overhaul, useful numbers
- [ ] **Phase 37: Conventions + Vouchers** - Benefit scope adaptation, convention cards, voucher validation in booking flow
- [ ] **Phase 38: Guest Lifecycle** - Returning guest badge, early/late checkout requests, visa alerts, delivery apps
- [ ] **Phase 39: Polish + Analytics** - Order performance tracking, guest receipt confirmation, final refinements

## Phase Details

### Phase 25: Room Code Foundation

**Goal**: Guests scan a permanent room QR and immediately access WiFi credentials and property info without any login or verification
**Depends on**: Phase 24 (v1.4 complete)
**Requirements**: QRA-01, QRA-02, QRA-03, QRA-05, AUTH-01
**Success Criteria** (what must be TRUE):

1. Guest scans room QR code and sees the in-stay dashboard with WiFi and property info within 2 seconds, with zero login forms
2. Same physical QR code resolves to the current active booking for that room (date-based resolution, not stale data)
3. When no booking is active for a room, the QR shows a read-only property info page (not an error)
4. Legacy `/stay/{booking-code}` URLs continue to work exactly as before (zero regressions)
5. Guest can browse WiFi, property info, contacts, and house rules without any verification prompt
   **Plans**: 2 plans

Plans:

- [x] 25-01: Database schema + room code generation + resolve_room_access() SECURITY DEFINER function
- [x] 25-02: /stay/room/[roomCode] route + browse-tier JWT + useRoomSession hook + QR generator update

### Phase 26: Progressive Authentication

**Goal**: Guests can place orders and access paid services after seamless inline verification that upgrades their session without page reload
**Depends on**: Phase 25
**Requirements**: QRA-04, AUTH-02, AUTH-03, AUTH-04, AUTH-05
**Success Criteria** (what must be TRUE):

1. Guest tapping a paid action (e.g., order service) sees an inline verification modal -- not a redirect or separate page
2. Guest can verify with last name or numeric PIN (configurable per property)
3. After successful verification, the original action proceeds without page reload and the session stays upgraded for the rest of the stay
4. Multiple guests in the same room can each verify independently using a shared PIN
5. After checkout, the previous guest's QR blocks all orders and paid actions (session invalidated)
   **Plans**: 2 plans

Plans:

- [x] 26-01-PLAN.md — Backend: migration (PIN + verification method), verify endpoint, requireFullAccess guard, tier gating on orders
- [x] 26-02-PLAN.md — Frontend: InlineVerification bottom sheet, useRoomSession upgrade, room dashboard services + verification trigger

### Phase 27: Owner Security Configuration

**Goal**: Property owners can select a security preset that matches their property type, with sensible defaults and optional customization
**Depends on**: Phase 26
**Requirements**: CONF-01, CONF-02, CONF-03, CONF-04
**Success Criteria** (what must be TRUE):

1. Owner can select from three security presets (Family / Standard / Structured) in the backoffice settings page
2. Each preset visibly defines which guest actions require verification and which are free -- owner sees this before saving
3. Owner can customize individual action gates beyond the selected preset
4. "Family" preset allows all actions without verification; "Structured" preset requires verification for every order -- safe defaults work out of the box
   **Plans**: 2 plans

Plans:

- [x] 27-01-PLAN.md — Migration 090 (access_settings JSONB + resolve_room_access update) + backoffice security settings page with preset selector and action toggles
- [x] 27-02-PLAN.md — Frontend integration: room resolve returns access_settings, room dashboard uses isActionGated() for conditional verification

### Phase 28: Document Upload + Visa Tracking

**Goal**: Guests can upload passport and visa documents from the dashboard, with automatic visa expiry reminders and GDPR-compliant auto-deletion
**Depends on**: Phase 26 (requires verified session for uploads)
**Requirements**: DOC-01, DOC-02, DOC-03, DOC-04, DOC-05
**Success Criteria** (what must be TRUE):

1. Verified guest can photograph and upload their passport from the in-stay dashboard (mobile camera or file picker)
2. Guest can upload a visa page with expiry date, and receives reminders at 14, 7, and 3 days before expiry if the visa expires during their stay
3. Owner sees uploaded documents in backoffice and receives a notification when a new document is uploaded
4. All guest documents are automatically deleted 30 days after checkout (no manual intervention, GDPR compliant)
   **Plans**: 2 plans

Plans:

- [x] 28-01-PLAN.md — Database migration (accom_guest_documents + storage bucket + property retention columns) + API routes (upload URL, list, download, delete) + cron job (visa reminders + GDPR auto-delete)
- [x] 28-02-PLAN.md — Image processing (HEIC + compression + blur detection) + guest upload UI (consent, camera, upload flow) + visa expiry alert + backoffice document urgency dashboard + booking detail integration

### Phase 29: Multi-Zone WiFi

**Goal**: Guests see WiFi credentials organized by zone, with their room network highlighted prominently
**Depends on**: Phase 25 (uses room resolution infrastructure)
**Requirements**: WIFI-01, WIFI-02, WIFI-03
**Success Criteria** (what must be TRUE):

1. Owner can configure multiple WiFi networks with zone labels (room, restaurant, pool, lobby) from the backoffice
2. Guest sees all WiFi networks organized by zone on their dashboard
3. The room-specific WiFi network appears highlighted at the top of the WiFi section
   **Plans**: 2 plans

Plans:

- [x] 29-01-PLAN.md — Migration 092 (wifi_zones JSONB + room override columns + data migration) + backoffice WiFi zone management UI + property/rooms API updates
- [x] 29-02-PLAN.md — WifiZoneInfo types + buildWifiInfo() shared helper + 4 guest API route updates + multi-zone WifiCard component + email template update

### Phase 30: Shared Module Audit

**Goal**: A comprehensive catalog of reusable modules across all verticals exists, enabling informed reuse decisions for all subsequent phases
**Depends on**: Nothing (informational, no code changes)
**Requirements**: INF-01
**Success Criteria** (what must be TRUE):

1. Catalog document lists every shared module (QR Builder, conventions, feedback pipeline, image utils, payment, etc.) with status: ready / needs adaptation / to-build
2. For each module marked "needs adaptation," the specific changes required for accommodations use are documented
3. Phase 31-39 plans can reference the catalog to decide build-vs-reuse without re-investigating
   **Plans**: 1 plan

Plans:

- [ ] 30-01-PLAN.md — Audit codebase shared modules and produce SHARED-MODULE-CATALOG.md

### Phase 31: Bug Fixes + Image Foundation

**Goal**: All 9 identified bugs from manual testing are fixed and image upload infrastructure is established for services, items, and WiFi QR codes
**Depends on**: Phase 30 (audit informs which shared modules to extract)
**Requirements**: BUG-01, BUG-02, BUG-03, BUG-04, BUG-05, BUG-06, BUG-07, BUG-08, BUG-09, OWN-02, INF-02
**Success Criteria** (what must be TRUE):

1. Guest name displays correctly without duplication in the in-stay dashboard header
2. All bottom nav tabs (Map, Menu, Profile, Services) show working content with correct Phosphor icons
3. Homepage shows visual cards instead of a text wall, and service category names display without icon name prefix
4. Service items show actual product images (not grey placeholders), time formats display as "7:00 - 10:30 AM", and currency selector is available in the PWA header
5. WiFi section includes a scannable QR code alongside the copy-password button, and room images can be uploaded in the backoffice (replacing "coming soon" placeholder)
   **Plans**: 2 plans

Plans:

- [ ] 31-01: PWA bug fixes (BUG-01 through BUG-08: guest name, bottom nav, homepage cards, icon prefix, time format, image placeholders, currency selector, WiFi QR) + QR code extraction from backoffice to shared util (INF-02)
- [ ] 31-02: Image upload infrastructure (OWN-02: property-images storage bucket, accom_property_images table, image compression fork, backoffice image upload replacing URL field) + room image upload fix (BUG-09)

### Phase 32: Owner Dashboard Enhancements

**Goal**: Property owners have a complete, professional dashboard with Gantt calendar, onboarding wizard, structured policies, and full property data management
**Depends on**: Phase 31 (image upload needed for onboarding wizard photo step)
**Requirements**: OWN-01, OWN-03, OWN-04, OWN-05, OWN-06, OWN-07
**Success Criteria** (what must be TRUE):

1. Owner sees a rooms-by-dates timeline grid (Gantt view) with color-coded bookings, clickable cells opening booking detail, and horizontal scroll for date navigation
2. New property owners are guided through an onboarding wizard (Basic Info, Photos, Rooms, WiFi, Services, Contact) with progress tracking, while existing configured properties skip the wizard
3. Owner can manage structured policies (checkbox house rules, dropdown cancellation policy) and complete property data (social links, Google Maps, communication methods, hours, staff languages)
4. Room CRUD includes a floor/level field, and booking history tab shows past stays with guest details
   **Plans**: 4 plans

Plans:

- [x] 32-01: Gantt calendar component + booking history component + room floor/level field + migrations (OWN-06, OWN-07, OWN-01)
- [x] 32-02: Onboarding wizard + structured policies component + property data form component (OWN-05, OWN-03, OWN-04)
- [ ] 32-03: [Gap closure] Wire GanttCalendar into calendar page + add History tab to bookings page
- [ ] 32-04: [Gap closure] Wire StructuredPolicies + PropertyDataForm into settings page

### Phase 33: Guest Dashboard Redesign

**Goal**: The guest in-stay dashboard uses a modern card-based layout with clear navigation hierarchy, preserving all existing state contracts for active guest sessions
**Depends on**: Phase 31 (bugs fixed first, image foundation in place)
**Requirements**: NAV-01, NAV-02, NAV-04, NAV-05, NAV-08
**Success Criteria** (what must be TRUE):

1. Homepage displays max 6-8 colored clickable cards (WiFi, Services, House Rules, Documents, Orders, Concierge) instead of a scrolling text wall
2. WiFi box is dismissible (guest taps X to hide after copying credentials) and recoverable from the Concierge hub
3. Check-in/out times appear inside House Rules (not as a separate homepage section), and Contact Host is accessible from menu/header (not prominent on homepage)
4. Profile page shows personal data, uploaded documents, order history, and preferences
   **Plans**: 2 plans

Plans:

- [x] 33-01-PLAN.md — DashboardGrid + DashboardCard components, card-based homepage layout, WiFi dismiss/recover logic (NAV-01, NAV-02)
- [x] 33-02-PLAN.md — HouseRulesSheet + Contact Host in header + ProfileView + BottomNav restructure (NAV-04, NAV-05, NAV-08)

### Phase 34: Service Expansion + Minibar

**Goal**: The service catalog is visually compelling with large photos and clear pricing, minibar self-service enables trust-based consumption tracking, and order management shows full detail
**Depends on**: Phase 33 (dashboard redesign provides home for minibar card and catalog entry points)
**Requirements**: SVC-01, SVC-02, SVC-03, SVC-04, SVC-05, SVC-06, SVC-09, SVC-10
**Success Criteria** (what must be TRUE):

1. Service catalog displays large product photos with visible add-to-cart buttons, and items flagged "included in rate" show a clear visual badge (not a price)
2. Minibar section lets guest mark consumed items (honor system), owner receives real-time notification, and owner confirms/adjusts from backoffice order queue
3. Order list shows category tags (food, beverage, laundry, minibar), filtered tabs with counts (no "All" tab), and tapping an order reveals full item/price breakdown
4. Dry cleaning appears as a laundry service option, and minibar/breakfast items can be imported from the F&B catalog picker
   **Plans**: 2-3 plans

Plans:

- [ ] 34-01: Service catalog redesign (large photos, add-to-cart button, included-in-rate badge, dry cleaning option) + order detail view with items/prices breakdown + order category tags and filtered tabs (SVC-01, SVC-02, SVC-04, SVC-05, SVC-06, SVC-09)
- [ ] 34-02: Minibar self-service (automation_level: 'self_service', mark-consumed UI, owner confirmation workflow, Supabase Realtime notification) + F&B catalog import picker for minibar/breakfast (SVC-03, SVC-10)

### Phase 35: Guest Feedback System

**Goal**: Guests can report issues during their stay for immediate resolution and provide structured post-stay ratings that feed into the AI feedback pipeline
**Depends on**: Phase 33 (feedback card in dashboard grid)
**Requirements**: GXP-02, GXP-03
**Success Criteria** (what must be TRUE):

1. Guest can submit in-stay feedback with category selection (maintenance, housekeeping, question, complaint), free text, and optional photo upload -- owner receives push notification
2. Post-stay feedback is triggered 2-24 hours after checkout with category star ratings (cleanliness, location, value, communication, WiFi) and optional comments
3. Backoffice shows feedback dashboard with aggregate scores, individual responses, and AI-processed tags (forked from F&B feedback pipeline with accommodations-specific taxonomy)
   **Plans**: 2 plans

Plans:

- [ ] 35-01: accom_guest_feedback table + in-stay feedback form (categories, photo upload, push to owner) + backoffice feedback queue with status tracking (GXP-02)
- [ ] 35-02: Post-stay feedback trigger (cron 2-24h after checkout) + category ratings form + AI pipeline fork (ACCOM_FEEDBACK_TAGS taxonomy) + backoffice aggregate dashboard (GXP-03)

### Phase 36: Guest Requests + Concierge

**Goal**: The Tourist Concierge hub is the central discovery point for guests, accessible from the bottom nav center button, combining local information, emergency contacts, safety tips, and navigation to useful numbers and the Explore page
**Depends on**: Phase 33 (dashboard redesign + bottom nav restructure), Phase 30 (audit for shared module reuse)
**Requirements**: NAV-03, NAV-06, NAV-07, CON-01, CON-02, CON-03, CON-04, CON-05
**Success Criteria** (what must be TRUE):

1. Center bottom nav button opens the Concierge hub with 5 sections: Discover, Emergency, Safety, Culture, Transport -- plus links to WiFi, Documents, and Contacts
2. Emergency numbers and embassy contacts display with click-to-call functionality, and safety tips are organized by category (transport, money, food, street, hotels, tours, digital) with accordion expand
3. Cultural tips (dos/don'ts) and recommended apps section are available, and merchant can toggle on/off each Concierge section from backoffice settings
4. Useful numbers live on a dedicated page linked from the Concierge hub, and the Explore/Map page shows local attractions, tours, and experiences
   **Plans**: 3 plans

Plans:

- [x] 36-01-PLAN.md — DB migration (concierge_sections JSONB) + BottomNav center button to Concierge + ConciergeHub overlay + guest/backoffice APIs + backoffice toggle settings (CON-01, CON-02, NAV-07)
- [x] 36-02-PLAN.md — Emergency contacts with click-to-call (CON-03) + safety tips accordion (CON-04) + cultural tips and recommended apps (CON-05) + useful numbers dedicated page (NAV-03)
- [x] 36-03-PLAN.md — Explore/Map page with card-based local attractions, tours, experiences, and cross-vertical deep-links (NAV-06)

### Phase 37: Conventions + Vouchers

**Goal**: The conventions system is adapted for accommodations with benefit scoping, and guests see convention partner cards with voucher validation in the booking flow
**Depends on**: Phase 30 (audit identifies conventions module adaptation needs), Phase 34 (service catalog for voucher-eligible items)
**Requirements**: INF-03, GXP-05
**Success Criteria** (what must be TRUE):

1. Convention system supports benefit_scope column (per_order, per_night, per_stay, flat) for accommodations-specific discount calculation
2. Guest sees convention restaurant/partner cards with visual display in the in-stay dashboard, linked to the conventions module
3. Voucher code field in booking flow validates via existing validate_voucher() RPC, calculates discount based on scope and stay duration, and records redemption with usage limits and expiration
   **Plans**: 2 plans

Plans:

- [ ] 37-01: Convention schema adaptation (benefit_scope column, accommodations-specific validation rules, usage limits, expiration, stacking rules) + voucher validation in booking flow (INF-03)
- [ ] 37-02: Convention partner cards in guest dashboard (visual display, deep-links) + owner convention management in backoffice (GXP-05)

### Phase 38: Guest Lifecycle

**Goal**: The platform recognizes returning guests, supports early/late checkout upsells, alerts owners about visa issues, and connects guests to local delivery services
**Depends on**: Phase 34 (order detail view for receipt context), Phase 28 (document upload for visa data)
**Requirements**: OWN-08, OWN-09, GXP-01, GXP-04
**Success Criteria** (what must be TRUE):

1. Returning guests are detected via multi-signal matching (name + nationality, avoiding false positives for common SEA surnames) and display a "Welcome back" badge in backoffice booking detail
2. Guest can request early check-in or late checkout from the PWA, and owner approves/rejects from backoffice with conflict detection against adjacent bookings
3. Owner receives a visa expiry alert if a guest's visa expires during their stay (before checkout), surfaced in the booking detail view
4. Delivery apps section (Grab, ShopeeFood, Baemin) shows branded cards with deep-links pre-filled with the property address -- link-out only, not a parallel order system
   **Plans**: 2 plans

Plans:

- [ ] 38-01: Returning guest detection (multi-signal SQL matching, badge in booking detail) + visa expiry alert for owner (query against uploaded visa dates) + early/late checkout request flow (guest form, owner approval queue, conflict detection) (OWN-08, OWN-09, GXP-01)
- [ ] 38-02: Delivery apps section in guest dashboard (Grab, ShopeeFood, Baemin cards with deep-links, property address pre-fill) (GXP-04)

### Phase 39: Polish + Analytics

**Goal**: Order performance is tracked with actionable metrics, guests receive digital receipts, and the milestone is ready for production use
**Depends on**: Phase 34 (order system improvements provide data for analytics)
**Requirements**: SVC-07, SVC-08
**Success Criteria** (what must be TRUE):

1. Order performance dashboard shows order-to-delivery average time, with counters (not charts) until sufficient data accumulates (3+ months), segmented by service category
2. Guest receipt confirmation is available via PWA (optional toggle in owner Settings, with auto-confirm timeout), showing itemized charges and payment method
   **Plans**: 1-2 plans

Plans:

- [ ] 39-01: Order performance tracking (timestamp-based metrics, backoffice counters/dashboard) + guest receipt confirmation (toggle in settings, PWA receipt view, auto-confirm with timeout) (SVC-07, SVC-08)

## Progress

**Execution Order:**
Phases execute in numeric order: 25 → 26 → 27 → 28 → 29 → 30 → 31 → 32 → 33 → 34 → 35 → 36 → 37 → 38 → 39

Notes:

- Phase 28 and 29 are independent (both depend on 25/26 respectively). Compliance (documents) prioritized over polish (WiFi).
- Phase 30 (audit) is a prerequisite for informed reuse in phases 31-39.
- Phase 31 (bugs) must complete before Phase 33 (dashboard redesign) to avoid fixing bugs in old AND new layouts.
- Phases 32 (owner dashboard) and 33 (guest dashboard) are independent and could run in parallel.
- Phases 35, 36, 37 depend on Phase 33 (dashboard redesign) for card placement.
- Phase 38 depends on Phase 28 (document upload) for visa data and Phase 34 (orders) for receipt context.

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
| 20. Payments                              | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 21. Owner Dashboard - Bookings & Property | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 22. Owner Dashboard - Calendar & Pricing  | v1.4      | 2/2            | Complete    | 2026-01-31 |
| 23. Service Ordering                      | v1.4      | 4/4            | Complete    | 2026-01-31 |
| 24. Analytics, Deals & Communication      | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 25. Room Code Foundation                  | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 26. Progressive Authentication            | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 27. Owner Security Configuration          | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 28. Document Upload + Visa Tracking       | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 29. Multi-Zone WiFi                       | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 30. Shared Module Audit                   | v1.5      | 1/1            | Complete    | 2026-02-01 |
| 31. Bug Fixes + Image Foundation          | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 32. Owner Dashboard Enhancements          | v1.5      | 4/4            | Complete    | 2026-02-01 |
| 33. Guest Dashboard Redesign              | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 34. Service Expansion + Minibar           | v1.5      | 5/5            | Complete    | 2026-02-02 |
| 35. Guest Feedback System                 | v1.5      | 2/2            | Complete    | 2026-02-02 |
| 36. Guest Requests + Concierge            | v1.5      | 3/3            | Complete    | 2026-02-02 |
| 37. Conventions + Vouchers                | v1.5      | 0/2            | Not started | -          |
| 38. Guest Lifecycle                       | v1.5      | 0/2            | Not started | -          |
| 39. Polish + Analytics                    | v1.5      | 0/1            | Not started | -          |

---

_Roadmap created: 2026-01-29_
_Last updated: 2026-02-02 after Phase 36 execution complete_
