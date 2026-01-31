# Feature Landscape: Accommodations v2 (Booking, Owner Dashboard, Service Ordering)

**Domain:** Accommodation booking systems, property management dashboards, guest service ordering
**Researched:** 2026-01-31
**Confidence:** HIGH (well-established patterns from Airbnb, Booking.com, Cloudbeds, Lodgify, Hostaway; existing GUDBRO In-Stay Dashboard already built)

## Context

GUDBRO Accommodations v1 (In-Stay Dashboard) is already built and functional with:

- Guest dashboard accessed via QR + booking code verification
- WiFi card, stay summary, services carousel, local deals, contact host, checkout info
- 6 JWT-protected API routes (verify, property, services, deals, useful-numbers, stay data)
- Database schema: `accom_properties`, `accom_rooms`, `accom_bookings`, `accom_service_categories`, `accom_service_items`, `accom_service_translations`
- F&B deep-linking integration (migration 080)
- Quick actions, return guest banner, visa status card

Accommodations v2 adds three major capabilities:

1. **Public Property Page** with hybrid booking (instant/inquiry, owner-configured)
2. **Owner Dashboard** for property, booking, service, and partnership management
3. **Service Ordering** with configurable automation levels per service

### Target User: Small SEA Property Owner (1-5 properties)

The target market is NOT large hotel chains. It is small property owners in Southeast Asia (Vietnam, Thailand, Bali) who currently pay 15-25% to OTAs and manage bookings manually via WhatsApp. They need simplicity over feature depth.

---

## Table Stakes

Features that competing products universally offer. Missing any of these makes the product feel incomplete to both guests and property owners.

### A. Public Property Page (Booking Mode)

| Feature                                                        | Why Expected                                                               | Complexity | Notes                                                                                                                                |
| -------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Photo gallery (swipeable, 5-20 images)                         | Airbnb, Booking.com, every listing site has this. No photos = no bookings. | Medium     | Use Supabase Storage. Lazy-loading, touch-optimized carousel. Cover image + gallery.                                                 |
| Property description with amenities grid                       | Guests evaluate based on description + amenity icons. Universal pattern.   | Low        | Amenities stored as JSONB array (already in schema). Icon grid with Phosphor icons.                                                  |
| Location display with area name                                | "Where is this?" is the second question after photos. Map embed essential. | Medium     | Leaflet/Mapbox for map. Show area name prominently (e.g., "My Khe Beach, Da Nang"). No Google Maps (cost).                           |
| Date picker (check-in/out)                                     | Cannot book without selecting dates. Core interaction.                     | Medium     | Use a calendar component. Block unavailable dates. Minimum/maximum stay enforcement.                                                 |
| Guest count selector                                           | Pricing and availability depend on guest count. Universal.                 | Low        | Simple +/- counter. Max from room capacity.                                                                                          |
| Price display with breakdown                                   | Airbnb shows per-night + fees + total. Guests expect transparent pricing.  | Medium     | Calculate: nights x rate + cleaning fee + taxes. Show weekly/monthly discounts if applicable.                                        |
| Booking submission form (name, email, phone, special requests) | Minimum guest info needed for any booking. No account creation required.   | Low        | Keep minimal. Name, email, phone, guest count, special requests. NO forced account creation (key differentiator).                    |
| Booking confirmation (WhatsApp + email)                        | Guests need proof of booking. WhatsApp is primary in SEA.                  | Medium     | WhatsApp Business API message with booking code. Email as fallback. Booking code format already exists (BK-XXXXXX).                  |
| House rules section                                            | Guests need to know rules before booking. Airbnb requires acceptance.      | Low        | Text display from `house_rules` column. Consider structured rules (no_smoking, quiet_hours, etc).                                    |
| Host profile section                                           | Trust signal. Guests want to know who they're staying with.                | Low        | Host name, photo, joined date, response rate. Pull from accounts table.                                                              |
| Mobile-responsive layout                                       | 80%+ of bookings are mobile in SEA. Must be mobile-first.                  | Medium     | Already PWA. Property page must be single-column, touch-optimized, fast.                                                             |
| Multi-language property display                                | Tourists from KR, JP, ZH, RU, DE, FR need translated content.              | Medium     | Property descriptions need translation support. Service translations table already exists. Extend pattern to property-level content. |

**Dependency:** `accom_properties` table already has `images`, `amenities`, `house_rules`, `cover_image_url`. New tables needed: `accom_availability` (date-level availability/pricing), `accom_property_translations`.

### B. Hybrid Booking System (Instant + Inquiry)

| Feature                                              | Why Expected                                                                                   | Complexity | Notes                                                                                                                                                    |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Owner-configured booking mode (instant/inquiry/both) | Airbnb offers both Instant Book and Request to Book. Small owners often want approval control. | Medium     | New column on `accom_properties`: `booking_mode` ('instant', 'inquiry', 'hybrid'). Hybrid = instant for verified guests, inquiry for others.             |
| Instant booking: immediate confirmation              | Standard for Booking.com, Airbnb Instant Book. Guest gets confirmed immediately.               | Medium     | On submit: check availability, create booking with status 'confirmed', send confirmation. Need race condition prevention (SELECT FOR UPDATE or similar). |
| Inquiry booking: owner approval required             | Many small SEA owners want to vet guests first. Airbnb Request to Book works this way.         | Medium     | On submit: create booking with status 'pending', notify owner via WhatsApp. Owner has 24h to approve/decline. Auto-expire if no response.                |
| Owner notification on new booking/inquiry            | Airbnb notifies hosts immediately. Owners cannot miss bookings.                                | Low        | WhatsApp notification with guest details + approve/decline link. Already have WhatsApp Business API pattern in GUDBRO.                                   |
| Availability calendar for guests                     | Guests must see which dates are available before attempting to book.                           | Medium     | New `accom_availability` table. One row per room per date. Visual calendar on property page showing available/blocked dates.                             |
| Payment method selection                             | Owner configures accepted methods. Guest chooses at booking.                                   | Medium     | Owner sets: cash on arrival, bank transfer, Stripe card, crypto. Guest sees only owner-enabled methods. Use existing `shared/payment/` infrastructure.   |
| Booking code delivery                                | Guests need their code for check-in and in-stay dashboard access.                              | Low        | Already implemented (BK-XXXXXX format). Send via WhatsApp + email on confirmation.                                                                       |

**Dependency:** Existing `accom_bookings` table has `status` field with correct states. Need new `accom_availability` table and `booking_mode` + `accepted_payment_methods` columns on properties.

### C. Owner Dashboard (Property Management)

| Feature                                       | Why Expected                                                                                     | Complexity | Notes                                                                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Booking list with status filters              | Every PMS shows bookings list. Columns: guest, dates, status, room, amount.                      | Medium     | Filterable table: upcoming, current, past, cancelled. Search by guest name or booking code.                                         |
| Booking detail view with actions              | Owner needs to see full booking details + take action (confirm, cancel, mark as checked-in/out). | Medium     | Detail page with guest info, dates, payment status, special requests, action buttons. Status transitions with validation.           |
| Availability calendar management              | Core PMS feature. Owners block dates, set custom pricing per date.                               | High       | Interactive calendar. Click date to toggle available/blocked. Drag to set date ranges. Bulk operations for seasonal pricing.        |
| Room/unit management (CRUD)                   | Owners manage their rooms/units. Add, edit, deactivate rooms.                                    | Medium     | Already have `accom_rooms` table. Build CRUD interface. Room type, capacity, description, images.                                   |
| Property settings editor                      | Edit property details, photos, amenities, house rules, WiFi, check-in/out times.                 | Medium     | Form-based editor. Photo upload/reorder. Amenity checkbox grid. Already have schema columns for all of this.                        |
| Service management (categories + items)       | Owners configure in-stay services. Already have schema. Need UI.                                 | Medium     | CRUD for `accom_service_categories` and `accom_service_items`. Drag to reorder. Price/availability settings.                        |
| Basic analytics: occupancy rate + revenue     | Every PMS shows at minimum: occupancy %, revenue this month, average daily rate (ADR).           | Medium     | Calculate from bookings data. Show: occupancy rate, total revenue, ADR, bookings count. Monthly trend chart.                        |
| QR code generation (property + room-specific) | Owners need printable QR codes for rooms (in-stay dashboard access). Already mentioned in PRD.   | Low        | Generate QR for `stays.gudbro.com/stay/BK-XXXXXX` or generic `stays.gudbro.com/checkin/{propertyId}/{roomId}`. Download as PNG/PDF. |
| Guest communication (WhatsApp deep-link)      | Small SEA owners primarily communicate via WhatsApp. Not a built-in chat, just quick links.      | Low        | "Message Guest" button opens WhatsApp with pre-filled message. Use guest phone from booking.                                        |

**Dependency:** Existing `accom_*` tables. Backoffice auth system. Owner access pattern via RLS (already configured in migration 077).

### D. Service Ordering (Guest-Facing)

| Feature                             | Why Expected                                                                                                                     | Complexity | Notes                                                                                                                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browse service catalog by category  | Guest sees organized services: Breakfast, Minibar, Laundry, Room Service, etc.                                                   | Low        | Already have `accom_service_categories` + `accom_service_items`. ServicesCarousel component exists. Extend to full catalog view.                                                                          |
| Add items to order with quantity    | Standard e-commerce cart pattern. Guest selects items, adjusts quantity.                                                         | Medium     | In-memory cart (no table needed until submit). Show running total. Item notes field.                                                                                                                      |
| Specify delivery time               | "Breakfast at 7:30 AM" is a core accommodation service pattern. Hotels and digital concierge apps all offer this.                | Low        | Time picker or preset slots ("ASAP", "7:00 AM", "7:30 AM", "8:00 AM"). Store as `requested_time` on order.                                                                                                |
| Order submission with confirmation  | Guest submits, gets confirmation, owner gets notified.                                                                           | Medium     | New `accom_service_orders` + `accom_service_order_items` tables. On submit: create order, notify owner via WhatsApp.                                                                                      |
| Order status tracking               | Guest wants to know: is my breakfast being prepared? Hotels like Duve and IRIS all show order status.                            | Medium     | Status flow: submitted > confirmed > preparing > ready > delivered. Real-time update via polling (SSE overkill for small scale).                                                                          |
| Configurable automation per service | Owner decides per service: auto-confirm, manual approval, or WhatsApp-only. Three automation levels cover all owner preferences. | Medium     | New column on `accom_service_categories`: `automation_level` ('auto_confirm', 'manual_approval', 'whatsapp_only'). Auto-confirm = instant. Manual = owner approves. WhatsApp-only = redirect to WhatsApp. |
| Service availability hours          | Breakfast: 6:30-10:00. Laundry: 8-18. Already in schema (`available_from`, `available_until`).                                   | Low        | Show "Available 6:30-10:00 AM" or "Closed" based on current time. Prevent ordering outside hours.                                                                                                         |
| Cross-vertical deep-links           | Guest orders from linked F&B PWA, books tour from partner. GUDBRO network strength.                                              | Low        | Already have F&B deep-link (migration 080). Extend pattern for tours, wellness. URL parameters pass guest context.                                                                                        |

**Dependency:** Existing `accom_service_categories` + `accom_service_items` tables. New tables: `accom_service_orders`, `accom_service_order_items`.

---

## Differentiators

Features that set GUDBRO apart from generic PMS/booking engines. Not universally expected, but high value for the target market.

### 1. Zero-Commission Direct Booking

| Feature                     | Value Proposition                                                                                                       | Complexity | Notes                                                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| No booking fee for owners   | Airbnb charges 14-16%, Booking.com 15-25%. GUDBRO charges 0% on direct bookings. This is THE value prop.                | N/A        | Business model, not a feature. But the property page must communicate this clearly: "Book direct. No commission."          |
| Shareable booking link + QR | Owner shares `stays.gudbro.com/beach-view-apartment` on social media, business cards, flyers. No app download required. | Low        | Already in URL structure. Generate clean, shareable links. OG meta tags for social media preview (photo, price, location). |

### 2. In-Stay Revenue Ecosystem

| Feature                        | Value Proposition                                                                                                                                 | Complexity | Notes                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Local partnership management   | Owner adds local tour operators, restaurants, spas with discount + commission. Guest gets deals, owner earns. No competitor offers this natively. | High       | Already designed in PRD (Type 2 partnerships). New tables: `accom_partnerships`, `accom_referrals`. Owner CRUD in dashboard. |
| Commission tracking dashboard  | Owner sees: "$42 earned from referrals this month." Tangible value beyond booking revenue.                                                        | Medium     | Aggregate from referrals table. Monthly summary. Per-partner breakdown.                                                      |
| GUDBRO Network cross-promotion | Properties refer to each other. "Heading to Hoi An? Stay at Mario's City Loft." No competitor does cross-property referrals.                      | Medium     | Use existing GUDBRO partnership infrastructure. Link accommodation-to-accommodation with commission model.                   |

### 3. Visa Compliance Tools (SEA-Specific)

| Feature                        | Value Proposition                                                                                                                   | Complexity | Notes                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Visa expiry tracker for guests | In-stay dashboard shows days remaining on visa with progress bar. Push notifications at 14/7/3 days. Vietnam-specific but valuable. | Medium     | Already have VisaStatusCard component. Needs guest_country (migration 079 adds this). Visa rules database per country. |
| NA17 pre-fill assistance       | Vietnamese law requires registering foreign guests with police within 12-24h. Digital data collection streamlines this.             | Medium     | Export guest data (passport, visa type, dates) in format suitable for NA17 registration. Owner compliance dashboard.   |
| Visa service partner referrals | Connect guests needing extensions to trusted visa agents. Owner earns commission.                                                   | Low        | Subset of local partnerships with `partner_type = 'visa_services'`. Already in PRD data model.                         |

### 4. Digital Laundry Form (Hospitality Innovation)

| Feature                             | Value Proposition                                                                                                    | Complexity | Notes                                                                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Visual garment selection with icons | Eliminates paper laundry forms. Multi-language. Pre-filled guest data. No competitor does this for small properties. | Medium     | Already fully designed in PRD (Section 7.2.1). Garment type grid with quantities. Service type per garment. Express toggle. |
| Laundry status tracking             | Guest sees: submitted > received > washing > ready > delivered. Replaces "ask at reception."                         | Low        | Simple status column on laundry order. Owner updates via dashboard or WhatsApp notification flow.                           |

### 5. Intelligent Owner Onboarding

| Feature                        | Value Proposition                                                                                                                                                        | Complexity | Notes                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Template-based property setup  | Pre-filled service catalogs by property type. "Hostel" template has: dorm bed, locker, laundry, common kitchen. "Villa" template has: pool, breakfast, airport transfer. | Medium     | JSON template library. Owner selects property type, gets pre-populated services/amenities they can customize. Reduces setup from 30 min to 5 min. |
| Step-by-step onboarding wizard | Guided flow: create account > add property > upload photos > set pricing > configure services > generate QR.                                                             | Medium     | Multi-step form with progress indicator. Already designed in VERTICAL-CONTEXT.md (Steps 1-7). Save progress between steps.                        |

---

## Anti-Features

Features to explicitly NOT build. Common mistakes that add complexity without proportional value for small SEA property owners.

| Anti-Feature                                         | Why Avoid                                                                                                                                                           | What to Do Instead                                                                                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Channel manager (OTA sync)                           | Extremely complex to build (Airbnb, Booking.com, Expedia APIs all different). Hostaway and Cloudbeds charge $20-100/month for this. Not MVP scope.                  | Manual booking entry. Owner can add bookings from any source with `booking_source` field (already in schema: direct, booking_com, airbnb, etc). iCal export for one-way sync later. |
| Built-in messaging/chat system                       | Turns GUDBRO into a support desk. Small SEA owners already use WhatsApp for everything. Building a chat duplicates their workflow.                                  | WhatsApp deep-links everywhere. Pre-filled messages with context (booking code, guest name). Owner's WhatsApp number prominent on all pages.                                        |
| Review/rating system (v2)                            | Requires critical mass of bookings to be meaningful. Fake review prevention is a whole product. Too early.                                                          | "Leave a review on Google" link. Collect testimonials manually. Build reviews system only after 500+ bookings on platform.                                                          |
| Dynamic pricing algorithm                            | Requires market data, competitor pricing, demand forecasting. Airbnb's Price Tips took years to build. Overkill for 1-5 property owners.                            | Manual seasonal pricing: owner sets price overrides per date range. Weekly/monthly discounts. That is sufficient for the target market.                                             |
| Calendar sync (iCal import)                          | iCal sync has 1-3 hour delays. Causes double bookings (25% of first-year Booking.com partners experience this). API sync is reliable but requires OTA partnerships. | Owners manually block dates that are booked elsewhere. Clear UI to quickly block/unblock date ranges. Double-booking prevention within GUDBRO (SELECT FOR UPDATE on availability).  |
| Multi-currency dynamic conversion                    | Exchange rates change constantly. Showing wrong prices creates disputes. Financial liability.                                                                       | Owner sets one currency per property (already in schema). Guest sees prices in owner's currency. Add display-only conversion note: "~$45 USD" without liability.                    |
| Guest account system                                 | Forces guests to create an account before booking. Every extra step loses ~20% of conversions. Airbnb requires it but GUDBRO is competing on simplicity.            | Book without account. Guest identifies with name + email + phone. For return guests, booking code + last name is sufficient (already implemented via `verify_booking_access()`).    |
| Online payment processing (Stripe, crypto) in v2 MVP | Payment integration adds PCI compliance, refund handling, dispute resolution complexity. Cash and bank transfer dominate SEA small accommodation payments.          | Phase as v2.1 post-launch. v2 MVP supports: cash on arrival, bank transfer details displayed, owner WhatsApp for payment arrangement. Add Stripe/crypto as post-MVP enhancement.    |
| Multi-property portfolio page                        | Extra routing complexity. Most owners in target market have 1-2 properties.                                                                                         | Each property has its own standalone page. If owner has multiple, they share individual links. Portfolio page is a v3 feature when owners have 5+ properties.                       |
| Automated guest check-in (keyless entry)             | Requires hardware integration (smart locks, keypads). Different technology domain entirely.                                                                         | Digital check-in info: send check-in instructions + access codes via WhatsApp before arrival. Property's QR code in room handles the rest.                                          |

---

## Feature Dependencies

```
EXISTING (v1 - Already Built)
    |
    +---> In-Stay Dashboard (QR + booking code access)
    |       +---> WiFi Card, Stay Summary, Services Carousel
    |       +---> Local Deals, Contact Host, Checkout Info
    |       +---> Visa Status Card, Quick Actions, Return Banner
    |       +---> F&B Deep-Link Integration
    |
    +---> Database Schema (migrations 077-081)
    |       +---> accom_properties, accom_rooms, accom_bookings
    |       +---> accom_service_categories, accom_service_items
    |       +---> accom_service_translations
    |
    +---> 6 API Routes (verify, property, services, deals, useful-numbers, stay)

NEW (v2 - To Build)
    |
    +---> A. Public Property Page
    |       +---> Photo gallery, amenities, description
    |       +---> Date picker + availability calendar
    |       +---> Price calculator with breakdown
    |       +---> Guest booking form
    |       |
    |       +---> B. Hybrid Booking System
    |               +---> Instant booking path (auto-confirm)
    |               +---> Inquiry booking path (owner approval)
    |               +---> Owner notification (WhatsApp)
    |               +---> Booking confirmation (WhatsApp + email)
    |               +---> NEW TABLE: accom_availability
    |
    +---> C. Owner Dashboard
    |       +---> Booking management (list + detail + actions)
    |       +---> Availability calendar editor
    |       +---> Property settings editor (photos, amenities, pricing)
    |       +---> Room/unit CRUD
    |       +---> Service management (categories + items CRUD)
    |       +---> QR code generation
    |       +---> Basic analytics (occupancy, revenue, ADR)
    |       +---> DEPENDS ON: Backoffice auth system
    |
    +---> D. Service Ordering
    |       +---> Service catalog (full view, extends ServicesCarousel)
    |       +---> Cart + order submission
    |       +---> Order status tracking
    |       +---> Automation level per service
    |       +---> Owner order management
    |       +---> NEW TABLES: accom_service_orders, accom_service_order_items
    |
    +---> [LATER] Local Partnerships Management
    |       +---> Partner CRUD in owner dashboard
    |       +---> Referral tracking + commission reporting
    |       +---> NEW TABLES: accom_partnerships, accom_referrals
    |
    +---> [LATER] Payment Integration
            +---> Stripe card payments
            +---> Crypto payments
            +---> Configurable per property
```

---

## Competitor Feature Matrix

Features mapped to what competitors offer and what GUDBRO needs.

| Feature                 | Airbnb                 | Booking.com          | Cloudbeds          | Lodgify          | GUDBRO v2                          |
| ----------------------- | ---------------------- | -------------------- | ------------------ | ---------------- | ---------------------------------- |
| Photo gallery           | Yes                    | Yes                  | Yes                | Yes              | **Must have**                      |
| Instant booking         | Yes (toggle)           | Yes (default)        | Yes                | Yes              | **Must have (hybrid)**             |
| Request to book         | Yes (toggle)           | Yes (new 2026)       | N/A                | N/A              | **Must have**                      |
| Availability calendar   | Yes                    | Yes                  | Yes                | Yes              | **Must have**                      |
| Seasonal pricing        | Yes (smart)            | Yes (rate plans)     | Yes (revenue mgmt) | Yes (manual)     | **Manual overrides**               |
| Guest messaging         | Built-in chat          | Built-in chat        | Built-in           | Built-in         | **WhatsApp deep-links**            |
| Review system           | Yes (required)         | Yes (required)       | Yes                | Yes              | **Deferred**                       |
| Channel manager         | N/A (is the channel)   | N/A (is the channel) | Yes (300+)         | Yes (major OTAs) | **Not building**                   |
| In-stay services        | New in 2025 (Services) | Limited              | Yes (POS)          | No               | **Core differentiator**            |
| Local partnerships      | No                     | No                   | No                 | No               | **Unique to GUDBRO**               |
| Commission on bookings  | 14-16%                 | 15-25%               | $0 (SaaS fee)      | $0 (SaaS fee)    | **0%**                             |
| Digital laundry form    | No                     | No                   | No                 | No               | **Unique to GUDBRO**               |
| Visa compliance tools   | No                     | No                   | No                 | No               | **Unique to GUDBRO**               |
| No guest account needed | No (required)          | No (required)        | N/A                | Configurable     | **Yes (differentiator)**           |
| Multi-language          | Yes (100+)             | Yes (40+)            | Yes                | Yes (limited)    | **8 languages (tourism priority)** |

---

## MVP Recommendation

### Phase 1: Public Property Page + Booking (Priority)

Build the guest-facing booking flow -- this is the revenue-generating feature:

1. **Property page** -- photo gallery, description, amenities, location, host info, house rules
2. **Availability display** -- calendar showing available dates (new `accom_availability` table)
3. **Booking form** -- date selection, guest info, price breakdown, submit
4. **Hybrid booking flow** -- owner chooses instant or inquiry mode per property
5. **Booking confirmation** -- WhatsApp + email with booking code
6. **Owner notification** -- WhatsApp alert on new booking/inquiry with approve/decline actions

### Phase 2: Owner Dashboard (Management)

Build the owner tools to manage what Phase 1 generates:

7. **Booking management** -- list, detail, status transitions (confirm, check-in, check-out, cancel)
8. **Availability calendar editor** -- block dates, set price overrides, bulk operations
9. **Property editor** -- update photos, amenities, description, pricing, booking mode
10. **Room/unit management** -- CRUD for rooms
11. **QR code generation** -- for rooms and property

### Phase 3: Service Ordering (In-Stay Revenue)

Extend the existing in-stay dashboard with ordering capability:

12. **Full service catalog** -- expand ServicesCarousel to full browsable catalog
13. **Order flow** -- cart, time selection, notes, submit
14. **Owner order management** -- incoming orders, status updates, notification
15. **Automation levels** -- auto-confirm, manual, WhatsApp-only per service category
16. **Service management UI** -- CRUD for categories and items in owner dashboard

### Phase 4: Analytics + Partnerships (Growth)

17. **Basic analytics** -- occupancy rate, revenue, ADR, booking trends
18. **Local partnerships CRUD** -- owner adds/manages partners with discounts + commissions
19. **Referral tracking** -- track guest usage of partner deals, commission reporting
20. **Digital laundry form** -- specialized ordering flow for laundry service

### Defer to Post-MVP (v2.1+)

- **Online payments (Stripe/crypto):** Add after proving booking flow works with cash/transfer
- **Review system:** Need 500+ bookings first for meaningful reviews
- **Calendar sync (iCal):** Risk of double bookings outweighs convenience at small scale
- **Channel manager:** Enterprise feature, not needed for 1-5 property owners
- **Dynamic pricing:** Manual overrides sufficient for target market
- **Portfolio page:** Build when owners have 5+ properties
- **Template-based onboarding:** Nice optimization but not blocking launch

---

## New Database Tables Required

| Table                         | Purpose                                          | Phase   |
| ----------------------------- | ------------------------------------------------ | ------- |
| `accom_availability`          | Per-room per-date availability + price overrides | Phase 1 |
| `accom_property_translations` | Multi-language property descriptions             | Phase 1 |
| `accom_service_orders`        | Guest service orders with status tracking        | Phase 3 |
| `accom_service_order_items`   | Line items within service orders                 | Phase 3 |
| `accom_partnerships`          | Local partner businesses with commission config  | Phase 4 |
| `accom_referrals`             | Referral tracking per guest per partner          | Phase 4 |

### Schema Changes to Existing Tables

| Table                      | Change                                                                                                                                | Phase   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `accom_properties`         | Add `booking_mode`, `accepted_payment_methods`, `min_stay`, `max_stay`, `cleaning_fee`, `weekly_discount_pct`, `monthly_discount_pct` | Phase 1 |
| `accom_rooms`              | Add `base_price`, `images`, `beds` (JSONB), `amenities` (JSONB)                                                                       | Phase 1 |
| `accom_bookings`           | Add `total_price`, `cleaning_fee`, `nights`, `payment_method`, `payment_status`, `inquiry_expires_at`                                 | Phase 1 |
| `accom_service_categories` | Add `automation_level` ('auto_confirm', 'manual_approval', 'whatsapp_only')                                                           | Phase 3 |

---

## Sources

- [Airbnb Host Dashboard & Booking Management](https://www.airbnb.com/resources/hosting-homes/a/exploring-your-hosting-tools-738) - HIGH confidence
- [Airbnb Instant Book vs Request to Book](https://www.airbnb.com/help/article/523) - HIGH confidence
- [Airbnb Booking Settings for Hosts](https://www.airbnb.com/help/article/3728) - HIGH confidence
- [Airbnb Host Tools October 2025 Update](https://www.rentalscaleup.com/airbnb-host-tools-october-2025-update/) - MEDIUM confidence
- [Airbnb 2025 Summer Release](https://touchstay.com/blog/airbnb-2025-summer-release) - MEDIUM confidence
- [Booking.com Extranet Guide 2026](https://bnbmanagementlondon.co.uk/booking-com-extranet-guide/) - MEDIUM confidence
- [Booking.com Extranet Essential Guide 2025](https://holidayhomesindubai.ae/booking-com-extranet-guide/) - MEDIUM confidence
- [Booking.com Double Booking Prevention](https://partner.booking.com/en-us/help/reservations/manage/all-you-need-know-about-double-bookings) - HIGH confidence
- [Guesty vs Hostaway vs Lodgify Comparison 2026](https://www.guesty.com/blog/guesty-vs-hostaway-vs-lodgify/) - MEDIUM confidence
- [Hotel Digital Concierge Complete Guide 2026](https://www.sunver.app/blog/hotel-digital-concierge-the-complete-guide-for-hotels-in-2026) - MEDIUM confidence
- [10 Best Mobile Ordering & Room Service Software 2026](https://hoteltechreport.com/food-and-beverage/mobile-ordering-room-service) - MEDIUM confidence
- [Hotel Guest Apps 2025: What Guests Actually Use](https://www.hotelspeak.com/2025/03/hotel-guest-apps-in-2025-what-the-data-says-about-features-guests-actually-use/) - MEDIUM confidence
- [Hidden Cost of Double Bookings 2025](https://holidayhomesindubai.ae/double-bookings/) - MEDIUM confidence
- [Lodgify: How to Avoid Double Bookings](https://www.lodgify.com/blog/avoid-double-bookings/) - MEDIUM confidence
- [OwnerRez: Instant Book vs Request to Book](https://www.ownerrez.com/support/articles/instant-book-vs-request-to-book) - HIGH confidence
- GUDBRO internal: `apps/accommodations/PRD.md` v2.3
- GUDBRO internal: `apps/accommodations/VERTICAL-CONTEXT.md`
- GUDBRO internal: `shared/database/migrations/schema/077-accommodations-schema.sql`
- GUDBRO internal: `shared/database/migrations/schema/079-accommodations-phase6-extensions.sql`
- GUDBRO internal: `shared/database/migrations/schema/080-accommodations-fnb-integration.sql`
