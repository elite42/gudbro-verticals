# Feature Landscape: Accommodations Extended Features

**Domain:** Hospitality guest experience, property management, in-stay services for small SEA accommodations (1-25 rooms)
**Researched:** 2026-02-01
**Confidence:** MEDIUM-HIGH (patterns well-established in hospitality tech; some features are novel combinations for small properties)

## Context

GUDBRO Accommodations already has:

- Public property page with SEO, photo gallery, availability calendar
- Hybrid booking flow (instant-confirm or inquiry), multi-payment
- Owner dashboard: booking management, room CRUD, property settings, QR codes, calendar, pricing, analytics
- Service ordering: guest catalog + cart, order state machine, owner order management
- In-Stay Dashboard: WiFi card, stay summary, services, deals, contact, checkout
- Room-based QR access with progressive authentication
- Owner-configurable security presets (Family/Standard/Structured)
- Analytics: occupancy, revenue, ADR, service breakdown
- Local deals CRUD with referral tracking
- Guest communication: confirmation + pre-arrival emails, WhatsApp

This milestone adds 15 extended features across guest experience, owner operations, and service refinements.

### Industry Context

The hospitality guest app market continues to consolidate around web-based, no-download experiences. Duve (#1 Hotel Guest App 2026, $85M raised) and Canary Technologies lead. For small properties (1-25 rooms), the competitive set is Little Hotelier, eviivo, Smoobu, and Mini Hotel PMS -- but none offer the integrated guest-facing PWA + owner backoffice that GUDBRO provides. Most small property solutions focus on PMS/channel management and lack in-stay guest experience features.

Key 2025-2026 trends: AI concierge, instant loyalty (not points-based), digital voucher redemption via QR, card-based mobile UX, and order-to-delivery performance tracking.

---

## Table Stakes

Features that guests and owners expect once you offer the adjacent capability. Missing these creates friction or feels incomplete given what GUDBRO already has.

| #   | Feature                                      | Why Expected                                                                                                                                                                                                                                               | Complexity | Dependencies                                           | Notes                                                                                                                       |
| --- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 9   | **Guest PWA homepage redesign (card-based)** | Current text-wall layout feels dated; every competitor (Duve, STAY, DigitalGuest) uses card-based grids with icons. Guests expect visual, tappable navigation -- not scrolling text.                                                                       | Medium     | Existing In-Stay Dashboard                             | Must work on all phone sizes. Card order should be configurable per owner. This is the "front door" for all other features. |
| 13  | **Order detail view with items breakdown**   | Owners already manage orders but see no line-item detail. Standard in any order management system -- without it, disputes are unresolvable.                                                                                                                | Low        | Existing order state machine                           | Simple UI addition. Both guest-side (receipt) and owner-side (management).                                                  |
| 11  | **Service items "included in rate" flag**    | Properties that include breakfast or airport transfer need to distinguish "included" from "purchasable" items. Without this, guests are confused about what they already paid for. Standard in Duve, STAY, DigitalGuest.                                   | Low        | Existing service catalog                               | Boolean flag on service items + "Included" badge in UI. May need per-booking or per-room-type configuration.                |
| 12  | **Room floor/level field**                   | Basic property data. Every PMS has this. Guests expect to know which floor their room is on, especially for accessibility. Owners need it for housekeeping routing.                                                                                        | Low        | Existing room CRUD                                     | Simple field addition to room schema + display in guest dashboard.                                                          |
| 15  | **Guest receipt confirmation via PWA**       | Guests expect a digital record of what they ordered/consumed. 68% of travelers prefer mobile confirmations (Skift/Oracle). Without receipts, trust erodes.                                                                                                 | Low-Medium | Order detail view (#13)                                | Show in PWA + optional email. Include itemized charges, dates, payment method.                                              |
| 7   | **Owner onboarding wizard**                  | 92% of hotels reduce staff onboarding time with guided setup (HotelTechReport 2026). Non-technical SEA property owners will abandon GUDBRO if setup feels overwhelming. Every competitor (Cloudbeds, eviivo, Little Hotelier) has step-by-step onboarding. | Medium     | Existing property settings, room CRUD, service catalog | Progress indicator showing completion %. Checklist: property info, photos, rooms, pricing, services, payment, QR codes.     |

---

## Differentiators

Features that set GUDBRO apart. Not expected at this price point for small properties, but deliver outsized value.

| #   | Feature                                                    | Value Proposition                                                                                                                                                                                                                                                                                                                  | Complexity  | Dependencies                                                   | Notes                                                                                                                                                                                                                                                              |
| --- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Minibar self-service via PWA**                           | No competitor in the small-property space offers digital minibar tracking. Large hotel solutions (INTELITY, Bowo) do, but cost 10-50x more. Guests mark consumed items on their phone -- no honor bar confusion, no staff counting bottles. Owner gets real-time consumption data.                                                 | Medium      | Service catalog, order state machine, room assignment          | Display as checklist/counter per item (not cart-style). Auto-adds to guest folio. Should support "mark as consumed" not "add to cart" UX. Real differentiator for hostels/guesthouses.                                                                             |
| 2   | **Timeline/Gantt calendar for room bookings**              | The #1 most-requested feature in small property PMS tools. Cloudbeds, RoomRaccoon, Little Hotelier all have it. GUDBRO's current calendar is date-based, not visual-timeline. A drag-and-drop Gantt view with color-coded bookings is the industry standard for 5+ room properties.                                                | High        | Existing booking data, room list                               | Rooms on Y-axis, dates on X-axis, color-coded reservation bars. Needs drag-and-drop for date changes, click to open booking. This is the "wow" feature for owner onboarding. Consider using a library (e.g., react-calendar-timeline).                             |
| 3   | **In-stay guest requests/complaints channel**              | Flexkeeping, Botshot ComplaintTrackr, and Xenia all offer this for large hotels. For small properties, nobody does it well. Most rely on WhatsApp which is unstructured. A simple in-app request system (categories: maintenance, housekeeping, question, complaint) with owner notification creates accountability.               | Medium      | In-Stay Dashboard, push notifications or WhatsApp integration  | Categories with optional photo upload. Owner sees queue with timestamps. Resolution tracking (open/in-progress/resolved). Key: must be SIMPLER than WhatsApp, not more complex.                                                                                    |
| 4   | **Post-stay feedback with category ratings**               | GuestRevu, Customer Alliance, and Zonka dominate this space but charge $100-500/month. A built-in feedback system that sends automatically at checkout with category ratings (cleanliness, location, value, communication, facilities) gives owners actionable data. DigitalGuest uses NPS + star ratings + conditional questions. | Medium      | Booking lifecycle (checkout trigger), guest email              | Auto-triggered at checkout. Star ratings per category + free text. Owner dashboard with aggregate scores. Optional: prompt happy guests to leave Google/TripAdvisor review (redirect). This drives retention and improvement.                                      |
| 6   | **Returning guest detection and badge**                    | Revinate's badge system is the gold standard but costs $10k+/year. For small properties, recognizing returning guests is deeply personal -- "Welcome back, Sarah!" with a loyalty badge. Staff sees returning guest flag on arrivals. No points, no tiers -- just recognition.                                                     | Low-Medium  | Guest email/phone matching across bookings                     | Match by email or phone number. Show badge in owner's booking view + arrivals list. Guest sees "Welcome back" in PWA. Track visit count. Consider small perk: "Returning guest discount" option for owner.                                                         |
| 8   | **Voucher system for accommodations**                      | DigitalGuest's voucher feature shows strong adoption (3,856 redeems at a single hotel). Breakfast vouchers with date, welcome drink vouchers, partner discount vouchers -- all redeemable via QR scan. Brandnamic and STAAH offer this for large properties. For small properties, this is unique.                                 | Medium-High | Service catalog, booking lifecycle, QR infrastructure          | Voucher types: included-in-stay (breakfast per date), promotional (welcome drink), partner (local deals). QR scan to redeem. Track redemption. Must support date-specific vouchers (breakfast Day 1, Day 2, etc.).                                                 |
| 5   | **Early check-in / late checkout request flow**            | Revenue opportunity that small properties leave on the table. Little Hotelier and RoomRaccoon support this natively. Guest requests via PWA, owner approves/denies based on availability. Auto-charges fee to folio. Industry data: late checkout bundled with upsells increases room revenue.                                     | Medium      | Booking lifecycle, room availability logic, payment/folio      | Guest sees option in PWA pre-arrival or during stay. Owner gets notification with availability context. Configurable pricing (free/fixed fee/hourly). Must check next booking on that room before approving.                                                       |
| 10  | **Delivery app integration (Grab, ShopeeFood deep-links)** | No hospitality platform does this yet -- verified by research. In SEA, Grab has 50%+ food delivery market share. ShopeeFood is #2. A simple deep-link to GrabFood/ShopeeFood pre-filled with property address saves guests the hassle of typing addresses in a foreign language. Zero API integration needed -- just URL schemes.  | Low         | In-Stay Dashboard                                              | Deep-link URLs: `grab://food?dropoff_lat=X&dropoff_lng=Y` or web fallback `food.grab.com/...`. Show as card in guest dashboard: "Order food delivery to your room". Include property address for copy-paste fallback. Unique GUDBRO differentiator for SEA market. |
| 14  | **Order performance tracking (order-to-delivery time)**    | No small-property tool tracks this. Large hotel ops tools (Flexkeeping, ALICE) do. Gives owners data on service speed. Tracks time from order placed to order delivered. Helps identify slow services, peak times, and staff performance.                                                                                          | Low-Medium  | Order state machine (needs timestamp on each state transition) | Calculate from order_created to order_delivered timestamps. Show average times per service category. Dashboard widget: "Average delivery time: 12 min". Alert if order exceeds threshold.                                                                          |

---

## Anti-Features

Features to explicitly NOT build. Common mistakes in this domain that would waste effort or harm the product.

| Anti-Feature                               | Why Avoid                                                                                                                                                                                                                                                                     | What to Do Instead                                                                                                                                      |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Full loyalty program with points/tiers** | Points-based loyalty is dying (70% of travelers prefer personalized experiences over points -- Amadeus 2025). Complex to build, confusing for 1-5 property owners, and guests at small SEA properties rarely return enough to accumulate meaningful points.                   | Simple returning guest badge + optional owner-configured discount. Recognition, not gamification.                                                       |
| **Built-in chat/messaging system**         | WhatsApp is ubiquitous in SEA. Building a proprietary chat means competing with WhatsApp's reliability, notification delivery, and user familiarity. Botshot and Kipsu exist because large hotels need omnichannel -- small properties just need WhatsApp.                    | Deep-link to WhatsApp with pre-filled message. Keep the request/complaint system structured (categories, not chat).                                     |
| **Complex voucher marketplace**            | Brandnamic and The Hotels Network build voucher marketplaces with gifting, multi-currency, expiration management. This is B2C gifting complexity that small properties don't need.                                                                                            | Simple voucher system: owner creates vouchers tied to bookings. No marketplace, no gifting to third parties, no complex expiration rules.               |
| **AI-powered review response generation**  | Duve invested heavily in AI agents ($60M Series B). Tempting to add, but small property owners write authentic, personal responses that guests value more than AI-generated ones. Over-automation erodes the "personal touch" that is their competitive advantage vs. chains. | Provide review notification + easy response prompts/templates. Let the owner's personality shine through.                                               |
| **Channel manager / OTA sync**             | This is the domain of Cloudbeds, Little Hotelier, and Smoobu. Building a channel manager requires maintaining integrations with 400+ OTAs, handling rate parity, and managing inventory sync. Massive ongoing maintenance burden.                                             | GUDBRO focuses on direct bookings. If owners need OTA sync, they use a dedicated channel manager alongside GUDBRO.                                      |
| **Housekeeping management system**         | Flexkeeping, Optii, and ALICE own this space. Room status boards, task assignment, cleaning checklists -- this is operational software that requires real-time staff coordination tools. Overkill for 1-10 room properties where the owner IS the housekeeper.                | Show room status (occupied/vacant/checkout-today) on timeline calendar. That's enough for small properties.                                             |
| **Dynamic pricing engine**                 | Beyond Pricing, Wheelhouse, and PriceLabs are mature products. Building dynamic pricing requires demand forecasting, competitor rate monitoring, and market data feeds.                                                                                                       | Let owners set manual rates with simple weekly/monthly discounts (already built). Link to external pricing tools via documentation if owners want more. |
| **Minibar IoT/sensor integration**         | Some luxury hotels use smart fridges with weight sensors. Massive hardware dependency, unreliable in SEA environments, and overkill for a hostel minibar.                                                                                                                     | Self-report via PWA is the right abstraction. Trust + occasional spot-check is how small properties work.                                               |

---

## Feature Dependencies

```
                    ┌──────────────────────────┐
                    │  9. Homepage Redesign     │ ← Foundation for all guest-facing features
                    │     (card-based PWA)      │
                    └────────────┬─────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                   │
     ┌────────▼───────┐  ┌──────▼──────┐  ┌────────▼────────┐
     │ 1. Minibar     │  │ 3. Requests │  │ 10. Delivery    │
     │    Self-Service │  │    Channel  │  │     App Links   │
     └────────┬───────┘  └─────────────┘  └─────────────────┘
              │
     ┌────────▼───────┐
     │ 11. Included   │ ← Needed to distinguish minibar items
     │     in Rate    │    that are complimentary
     └────────────────┘

     ┌────────────────┐
     │ 13. Order      │ ← Prerequisite for receipts and performance
     │     Detail     │
     └───────┬────────┘
             │
     ┌───────┼────────────────┐
     │       │                │
     ▼       ▼                ▼
  ┌──────┐ ┌──────────┐ ┌──────────┐
  │ 15.  │ │ 14.      │ │ 8.       │
  │Recpt │ │ Perf     │ │ Voucher  │ ← Vouchers need order/redemption tracking
  └──────┘ │ Tracking │ │ System   │
           └──────────┘ └──────────┘

     ┌────────────────┐       ┌────────────────┐
     │ 12. Room       │       │ 2. Timeline    │
     │     Floor/Level│───────▶   Calendar     │ ← Floor info enriches timeline display
     └────────────────┘       └────────────────┘

     ┌────────────────┐       ┌────────────────┐
     │ 6. Returning   │       │ 4. Post-Stay   │
     │    Guest Badge │       │    Feedback     │ ← Both need booking lifecycle hooks
     └────────────────┘       └────────────────┘

     ┌────────────────┐
     │ 5. Early/Late  │ ← Needs room availability + timeline calendar for owner decision
     │    Check-in/out│
     └────────────────┘

     ┌────────────────┐
     │ 7. Onboarding  │ ← Independent, but should showcase all other features
     │    Wizard      │
     └────────────────┘
```

---

## Detailed Feature Analysis

### Feature 1: Minibar Self-Service via PWA

**How it works in hospitality:**

- Large hotels: INTELITY, Bowo offer tablet-based minibar with real-time billing. Some use IoT sensors (weight-based detection). Costs $50-200/room/month.
- Mid-range: Honor bar with manual staff count at checkout. Error-prone, labor-intensive.
- Small properties: Paper checklist or nothing. Guests forget to report consumption.

**GUDBRO approach:**

- Guest opens minibar section in PWA (card on homepage)
- Sees list of items with prices and photos
- Taps "I consumed this" with quantity selector
- Item added to stay folio automatically
- Owner sees real-time consumption in booking detail
- At checkout, minibar charges are part of receipt

**Key UX decisions:**

- Use "mark consumed" pattern, NOT shopping cart. Guest is reporting, not ordering.
- Show running total: "Your minibar: $12.50"
- Allow owner to configure: trust guest (auto-charge) vs. verify first
- Include "Report empty/missing item" for restocking

**Complexity: MEDIUM** -- Needs new UI component, folio integration, real-time sync.

---

### Feature 2: Timeline/Gantt Calendar

**How it works in hospitality:**

- Industry standard: Rooms on Y-axis, dates on X-axis, colored bars per booking
- Drag to extend/shorten stay, drag between rooms to reassign
- Color coding: confirmed (green), pending (yellow), checked-in (blue), checked-out (gray)
- Click bar to open booking details
- Cloudbeds, RoomRaccoon, Little Hotelier, Beds24, Lodgify, Hostaway ALL have this

**GUDBRO approach:**

- Replace or augment current date-based calendar in backoffice
- Show all rooms with booking bars
- Click to open booking detail sidebar
- Drag to change dates (with availability check)
- Color code by status
- Show today line, occupancy percentage per day

**Key UX decisions:**

- Mobile-responsive is hard for Gantt -- consider "list view" on mobile, Gantt on desktop/tablet
- Zoom levels: day, week, month
- Must handle 1-25 rooms without scrolling issues
- Consider library: `react-calendar-timeline` or custom with canvas

**Complexity: HIGH** -- Most complex feature in this set. Drag-and-drop, responsive, performance.

---

### Feature 3: In-Stay Guest Requests/Complaints

**How it works in hospitality:**

- Large hotels: Flexkeeping, ALICE, Xenia -- full ticketing systems with department routing, escalation, SLA tracking
- Mid-range: Botshot ComplaintTrackr -- AI-powered omnichannel
- Small properties: WhatsApp messages, verbal requests, forgotten promises

**GUDBRO approach:**

- Guest taps "Request" card on homepage
- Selects category: Maintenance, Housekeeping, Question, Complaint, Other
- Adds description + optional photo
- Owner gets push notification / WhatsApp alert
- Owner sees request queue with status: New > In Progress > Resolved
- Guest sees status updates in PWA
- Resolution time tracked automatically

**Key UX decisions:**

- Must be FASTER than WhatsApp for the guest (2 taps + text, not "open WhatsApp, find contact, type message")
- Categories help owner triage without reading every message
- Photo upload is critical for maintenance (show the broken thing)
- Do NOT build chat -- this is structured requests, not conversation
- Auto-close after 24h of "Resolved" status

**Complexity: MEDIUM** -- New data model (requests table), notification integration, simple state machine.

---

### Feature 4: Post-Stay Feedback

**How it works in hospitality:**

- Industry standard: Auto-email at checkout with link to survey
- Categories: Cleanliness, Location, Value, Communication, Facilities (Booking.com standard)
- Scale: 1-5 stars or 1-10 (NPS)
- Smart redirect: Happy guests (4-5 stars) → prompted to leave Google/TripAdvisor review
- Unhappy guests (1-3 stars) → private feedback to owner only
- DigitalGuest, GuestRevu, Customer Alliance charge $100-500/month for this

**GUDBRO approach:**

- Auto-trigger email/WhatsApp 2 hours after checkout
- Link opens feedback form in PWA (no login needed, token-based)
- Rate 5 categories: Cleanliness, Comfort, Location, Value, Communication
- Overall rating + free text comment
- If overall >= 4: "Would you share this on Google?" with direct link
- If overall < 4: "Thank you, we'll improve" (private to owner)
- Owner dashboard: average scores per category, trend over time

**Key UX decisions:**

- Keep it SHORT: 5 category stars + 1 comment field. No multi-page surveys.
- Mobile-first: big tap targets for stars
- Anonymous option for honest feedback
- Owner sees aggregate, not just individual reviews

**Complexity: MEDIUM** -- New data model, email trigger, dashboard widget, optional Google review redirect.

---

### Feature 5: Early Check-in / Late Checkout

**How it works in hospitality:**

- Revenue opportunity: typically $10-30 for small properties, $50-150 for hotels
- Flow: Guest requests > System checks availability > Owner approves > Fee added to folio
- Little Hotelier: guests set expected arrival time, owner sees and manages
- RoomRaccoon: automated approval based on room availability + pricing rules
- Key constraint: Must check if room is available (no incoming booking before the request time)

**GUDBRO approach:**

- Guest sees option in PWA pre-arrival ("Request early check-in") or during stay ("Request late checkout")
- Selects desired time
- System checks: is the room free before/after?
- If free: Owner gets notification with recommendation ("Room is available, suggest $15 fee")
- Owner approves with price, or denies with message
- Guest sees approval + fee in PWA
- Fee added to folio

**Key UX decisions:**

- Show availability context to owner (not just the request)
- Allow free, fixed-price, or custom price per request
- Pre-arrival: include in pre-arrival email as option
- During stay: show only if room availability allows late checkout
- Auto-deny if room has same-day incoming booking (save owner's time)

**Complexity: MEDIUM** -- Needs availability check logic, request/approval flow, folio integration.

---

### Feature 6: Returning Guest Detection

**How it works in hospitality:**

- Revinate: automatic badges on guest profiles, arrivals report shows loyalty tier
- Daniel Thwaites hotels: "invisible loyalty" -- staff sees badge, guest gets perks without formal enrollment
- Industry shift: away from points/tiers toward recognition and personalization
- 5% increase in retention = up to 75% profit increase (Cornell study)

**GUDBRO approach:**

- Match guests by email or phone across bookings
- First return: "Welcome back!" badge on booking (visible to owner)
- Guest PWA shows "Welcome back, Sarah! Visit #3" on homepage
- Owner configurable: auto-apply returning guest discount (e.g., 5% off)
- Arrivals list shows returning guest icon
- Track: visit count, total spent, last visit date

**Key UX decisions:**

- No enrollment, no points, no tiers. Pure recognition.
- Owner controls perks (optional discount, room upgrade priority)
- Guest matching must handle email changes (phone as fallback)
- Show on arrivals report so staff knows before guest arrives

**Complexity: LOW-MEDIUM** -- Guest matching logic, badge display, optional discount mechanism.

---

### Feature 7: Owner Onboarding Wizard

**How it works in hospitality:**

- eviivo: guided step-by-step, no IT required, fast go-live
- Cloudbeds: claims 88% training time reduction
- Hotelogix: quick onboarding, properties live fast
- Industry standard: progress bar with checklist sections

**GUDBRO approach:**

- New property setup → wizard activates
- Steps: (1) Property info + photos, (2) Rooms + floor/level, (3) Pricing + availability, (4) Services + menu, (5) Payment setup, (6) QR codes + WiFi, (7) Test guest view
- Progress bar showing X/7 complete
- Each step validates before allowing next
- "Skip for now" option on optional steps
- Dashboard shows overall setup completion %
- Reminder notifications for incomplete setup

**Key UX decisions:**

- Must work on mobile (owners in SEA often don't have desktop)
- Preview of guest view at each step ("This is what your guest will see")
- Photo upload with compression (SEA bandwidth can be limited)
- Pre-filled templates for common service items (breakfast, laundry, minibar)

**Complexity: MEDIUM** -- Multi-step wizard UI, validation, progress tracking. Mostly orchestration of existing features.

---

### Feature 8: Voucher System

**How it works in hospitality:**

- DigitalGuest: vouchers tied to guest stay, redeemable via slide-to-redeem in PWA, tracked per guest
- Brandnamic: voucher app with templates, QR redemption, automated reminders
- STAAH: QR-scanned vouchers for packages and offers
- Common types: breakfast voucher (per night), welcome drink, partner discount, late checkout

**GUDBRO approach:**

- Owner creates voucher templates: name, type, quantity per stay, valid dates
- Types: (a) Included services (breakfast Day 1, Day 2...), (b) Welcome perks (free drink), (c) Partner deals (10% off tour)
- At check-in, vouchers auto-assigned to booking
- Guest sees vouchers in PWA with status (available/redeemed/expired)
- Redemption: guest shows PWA screen to staff, staff marks as redeemed (or guest self-redeems for digital services)
- Date-specific vouchers: "Breakfast - Jan 15" can only be used on Jan 15

**Key UX decisions:**

- Visual voucher cards with clear status
- Date-locked vouchers prevent "saving up" breakfasts
- Easy owner creation: "Add breakfast voucher for every night of stay" (auto-generate)
- Partner vouchers link to local deals system (existing)

**Complexity: MEDIUM-HIGH** -- New data model (voucher templates, voucher instances, redemptions), date logic, auto-generation.

---

### Feature 9: Guest PWA Homepage Redesign

**How it works in hospitality:**

- Duve: card-based grid with branded colors, icon per service category
- STAY App: tiled layout with property branding, quick-access buttons
- DigitalGuest: modular cards, configurable order, property-branded
- All competitors: visual, tappable, icon-heavy, minimal text

**GUDBRO approach:**

- Replace current text-list layout with card grid
- Cards: WiFi, Services, Requests, Vouchers, Local Deals, Minibar, Contact, Check-out Info
- Owner configurable: card order, visibility (show/hide per card)
- Property branding: colors from property settings
- Quick-info bar at top: guest name, room, checkout date
- Responsive: 2-column grid on phone, 3-4 on tablet

**Key UX decisions:**

- WiFi card ALWAYS first (most common first action)
- Cards show preview info (e.g., "2 active vouchers", "3 local deals")
- Animation: subtle, not distracting
- Must load fast on 3G (SEA rural areas)
- Icon library: Phosphor Icons (duotone weight) per GUDBRO standards

**Complexity: MEDIUM** -- Frontend redesign, configurable card system, responsive grid.

---

### Feature 10: Delivery App Integration

**How it works in hospitality:**

- No hospitality platform currently does this (verified by research). This is a true GUDBRO innovation.
- Grab dominates SEA food delivery (50%+ market share, $22.7B regional GMV)
- ShopeeFood is #2 (14% share), strong in Vietnam and Indonesia
- Guests struggle with: typing foreign addresses, navigating unfamiliar apps, finding their accommodation

**GUDBRO approach:**

- Card on guest homepage: "Order food delivery to your room"
- Shows available delivery apps for the property's country
- Deep-link to GrabFood/ShopeeFood with pre-filled property address
- Fallback: copy address to clipboard + open web version
- Country-specific: Grab (all SEA), ShopeeFood (VN, ID, MY, TH), Foodpanda (where available)

**Key UX decisions:**

- Deep-link format: `grab://food?lat=X&lng=Y` with web fallback
- Pre-fill delivery address in the guest's language AND local language
- Show property name + room number as delivery note suggestion
- No API integration needed -- just URLs. Keep it simple.
- Owner configures: which apps to show, property address for delivery

**Complexity: LOW** -- Just deep-links and address copy. The value is in the idea, not the implementation.

---

### Feature 11: "Included in Rate" Flag

**How it works in hospitality:**

- Standard in every hotel: "Breakfast included", "Airport transfer included"
- Duve/STAY: show included items clearly separated from purchasable items
- Booking.com: "Free breakfast" badge on listing
- Key distinction: included items are per-booking or per-room-type, not universal

**GUDBRO approach:**

- Boolean flag on service items: `included_in_rate`
- Display in guest PWA: "Included" badge, no price shown, cannot add to cart
- Configuration: per-room-type or per-booking (e.g., deluxe rooms include breakfast, standard don't)
- Owner sets in service catalog: "Breakfast - Included for Deluxe Room"
- Interacts with voucher system: included items could generate date-specific vouchers

**Key UX decisions:**

- Green "Included" badge, clearly distinct from purchasable items
- Show included items FIRST in service catalog (guest sees value immediately)
- If per-room-type: auto-detect from guest's booking which items are included
- Don't hide purchasable items -- show them below included items

**Complexity: LOW** -- Flag on service items, conditional display logic. Slightly more complex if per-room-type.

---

### Feature 12: Room Floor/Level Field

**How it works in hospitality:**

- Every PMS has floor/level as a room attribute
- Used for: housekeeping routing, guest preference (high floor), accessibility (ground floor)
- Displayed in: room assignment, guest confirmation, timeline calendar

**GUDBRO approach:**

- Add `floor` field to room schema (integer or string for "Ground", "1", "2", "Rooftop")
- Display in: guest PWA (room info card), owner booking detail, timeline calendar (group by floor)
- Optional: owner can label floors ("Ground Floor", "Pool Level", "Rooftop Suite")

**Key UX decisions:**

- String field, not integer (to support "Ground", "Mezzanine", "Rooftop")
- Optional field (some properties are single-floor)
- Timeline calendar can optionally group rooms by floor

**Complexity: LOW** -- Single field addition to schema + display.

---

### Feature 14: Order Performance Tracking

**How it works in hospitality:**

- Large hotel ops: ALICE, Flexkeeping track task completion time, SLA breaches
- Industry KPIs: room turnaround time, check-in efficiency, request resolution time
- No small-property tool tracks service delivery time

**GUDBRO approach:**

- Timestamps already exist on order state transitions (order_created, order_accepted, order_delivered)
- Calculate: order-to-acceptance time, acceptance-to-delivery time, total fulfillment time
- Dashboard widget: "Average delivery time: 12 min" (today/week/month)
- Per-service breakdown: "Breakfast avg 18 min, Laundry avg 2 hours"
- Alert threshold: configurable "notify if order not accepted in X minutes"

**Key UX decisions:**

- Show only to owner (not guest-facing)
- Simple metrics: average time, slowest order, orders exceeding threshold
- Weekly digest: "This week: 23 orders, avg 15 min, 2 exceeded 30 min threshold"
- Don't over-engineer: start with averages, add percentiles later

**Complexity: LOW-MEDIUM** -- Mostly analytics queries on existing timestamp data. Dashboard widget.

---

## MVP Recommendation

### Phase 1: Foundation (do first)

These unlock or enhance everything else:

1. **#9 Homepage redesign** -- All new features need a home in the card grid
2. **#12 Room floor/level** -- Simple, enriches timeline calendar
3. **#13 Order detail view** -- Prerequisite for receipts and performance tracking
4. **#11 Included in rate flag** -- Simple, high guest satisfaction impact

### Phase 2: Guest Experience

High-value guest-facing features:

5. **#1 Minibar self-service** -- True differentiator, medium effort
6. **#3 Requests channel** -- Structured alternative to WhatsApp chaos
7. **#15 Guest receipts** -- Trust and transparency
8. **#10 Delivery app links** -- Low effort, high SEA value

### Phase 3: Owner Operations

Owner-facing improvements:

9. **#2 Timeline calendar** -- Highest complexity, but highest impact for owners
10. **#7 Onboarding wizard** -- Improves activation for new properties
11. **#14 Performance tracking** -- Analytics on existing data

### Phase 4: Lifecycle & Retention

Features that drive repeat business:

12. **#4 Post-stay feedback** -- Drives improvement and reviews
13. **#6 Returning guest badge** -- Recognition without complexity
14. **#5 Early/late check-in/out** -- Revenue opportunity
15. **#8 Voucher system** -- Most complex, but ties everything together

### Defer to post-milestone:

- AI-powered anything (review responses, concierge)
- Channel manager integration
- Dynamic pricing
- Full housekeeping management

---

## Complexity Summary

| Complexity      | Features                                                                        | Count |
| --------------- | ------------------------------------------------------------------------------- | ----- |
| **Low**         | #10 Delivery links, #11 Included flag, #12 Floor/level                          | 3     |
| **Low-Medium**  | #6 Returning guest, #13 Order detail, #14 Performance, #15 Receipts             | 4     |
| **Medium**      | #1 Minibar, #3 Requests, #4 Feedback, #5 Early/late, #7 Onboarding, #9 Homepage | 6     |
| **Medium-High** | #8 Vouchers                                                                     | 1     |
| **High**        | #2 Timeline calendar                                                            | 1     |

**Total estimate:** 15 features, weighted toward medium complexity. The timeline calendar (#2) is the riskiest and should be carefully scoped.

---

## Sources

- [INTELITY - PWA vs Mobile Apps in Hotels 2026](https://intelity.com/blog/pwa-vs-mobile-apps-hotel-industry-what-hotels-need-to-know-2026/)
- [HotelTechReport - Best Hotel Guest Apps 2026](https://hoteltechreport.com/guest-experience/hotel-guest-apps)
- [HotelTechReport - Best PMS 2026](https://hoteltechreport.com/operations/property-management-systems)
- [Canary Technologies - Hospitality Trends 2026](https://www.canarytechnologies.com/post/hospitality-technology-trends-for-2026)
- [LobbyPMS - Booking Calendar](https://lobbypms.com/en/learn-about-hotel-software/booking-calendar-and-its-importance-within-a-pms/)
- [RoomRaccoon PMS](https://roomraccoon.com/platform/pms)
- [STAY App](https://www.stay-app.com/)
- [Botshot ComplaintTrackr](https://botshot.ai/products/complainttrackr)
- [Flexkeeping Guest Feedback](https://flexkeeping.com/products/hotel-guest-feedback-software/)
- [DigitalGuest Voucher Cases](https://digitalguest.com/voucher-cases/)
- [DigitalGuest Room Service](https://digitalguest.com/room-service/)
- [Brandnamic Voucher App](https://www.brandnamic.com/en/voucher-app)
- [Duve Platform](https://duve.com/)
- [Duve $60M Raise](https://hoteltechnologynews.com/2025/12/duve-raises-60-million-to-scale-its-unified-ai-driven-hotel-guest-experience-platform-globally/)
- [Amadeus - Hotel Guest Loyalty 2025](https://www.amadeus-hospitality.com/guest-loyalty/)
- [Revinate - Loyalty Programs](https://www.revinate.com/blog/next-level-hotel-loyalty-programs-what-we-learned-at-navigate-2024/)
- [HotelTechReport - Guest Survey Software](https://hoteltechreport.com/operations/guest-feedback)
- [HotelTechReport - PMS Impact Study 2026](https://www.hospitalitynet.org/opinion/4130137.html)
- [Grab SEA Market Data](https://www.dealstreetasia.com/stories/southeast-asia-food-delivery-470756)
- [Little Hotelier](https://www.littlehotelier.com/best-hotel-check-in-software/)
- [Roommaster Guest Engagement](https://www.roommaster.com/guest-engagement-software)
- [Priority Software - Hotel Metrics 2026](https://www.priority-software.com/resources/hotel-performance-metrics/)
