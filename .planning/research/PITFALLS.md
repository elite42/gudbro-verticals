# Domain Pitfalls: Accommodations Extended Features (v1.4 Milestone)

**Domain:** Extending existing Accommodations PWA with Gantt calendar, minibar self-service, guest feedback, conventions/vouchers, UI overhaul, onboarding wizard, returning guest detection, early check-in/late checkout, delivery integration, performance tracking, and 13 bug fixes
**Researched:** 2026-02-01
**Overall Confidence:** HIGH (verified against existing GUDBRO codebase patterns, 14 migrations, ~30k LOC)
**Context:** Adding 38 features and 13 bug fixes to a working system with room-based QR access, progressive auth, service ordering state machine, and JWT-based guest sessions. Target: small SEA properties (1-25 rooms), non-technical owners.

---

## Critical Pitfalls

Mistakes that break the existing system, cause data loss, or require architectural rewrites.

### Pitfall 1: UI Overhaul Breaks Existing Guest Sessions Mid-Stay

**What goes wrong:** The PWA homepage redesign and bottom nav overhaul ship while guests are actively using the in-stay dashboard. Guest scans QR on Monday, gets the old layout. On Wednesday, the new layout deploys. Guest taps "Services" in the bottom nav -- but the nav item IDs changed (`services` -> `orders`), the tab handler references a state key that no longer exists, or the `showCatalog` overlay that was triggered by `activeTab === 'services'` no longer fires because the tab ID changed. The cart state stored in the hook is lost because the component tree restructured.

**Why it happens:** The `InStayDashboard` page (`app/stay/[code]/page.tsx`) manages extensive state: `activeTab`, `showCatalog`, `showCart`, `serviceCategories`, `serviceTimezone`, cart state via `useServiceCart`, orders via `useOrderPolling`. The `BottomNav` component has hardcoded nav item IDs (`home`, `map`, `menu`, `services`, `profile`). Changing any of these without preserving the state contract silently breaks the dashboard for active guests.

**Warning signs:**

- Bottom nav item IDs change without updating `handleTabChange` logic
- Component props change shape (e.g., `BottomNav` losing `onMenuToggle`)
- Cart hook (`useServiceCart`) state shape changes, invalidating in-memory carts
- Service catalog overlay trigger condition changes
- Active order polling (`useOrderPolling`) stops because props changed

**Prevention:**

- **Redesign the UI in additive phases, not replacement.** Phase 1: Add new components alongside old ones behind a feature flag. Phase 2: Switch the flag. Phase 3: Remove old components. Never deploy a rewrite in one shot.
- **Preserve all state contracts.** The `BottomNav` takes `activeTab`, `onTabChange`, `onMenuToggle`. If the new nav has different items, the new component must still accept the same prop interface (or extend it backward-compatibly).
- **Cart state must survive redesign.** The `useServiceCart` hook is pure in-memory state. If the component tree changes and the hook remounts, the cart is lost. Consider persisting cart to `sessionStorage` keyed by booking code.
- **Deploy UI changes on low-traffic days.** SEA accommodation check-ins cluster on Fridays and weekends. Deploy UI changes on Tuesday/Wednesday when fewest guests are mid-stay.
- **Test the deploy scenario explicitly.** Load the old dashboard in a browser tab. Deploy the new version. Refresh the tab. Everything must still work -- nav, cart, orders, catalog overlay.

**Detection:** Open the in-stay dashboard, add items to cart, navigate between tabs. Simulate a deploy (reload the page). If the cart is empty or the tab state is wrong, the redesign will break mid-stay guests.

**Severity:** CRITICAL -- broken dashboard for active guests means they cannot order services, which is the core revenue feature.
**Phase:** UI overhaul phase. Must be the last feature deployed, after all functional features are stable.

---

### Pitfall 2: Gantt Calendar Over-Engineering for 1-25 Room Properties

**What goes wrong:** The team builds a full-featured Gantt chart with horizontal scrolling, drag-to-resize bookings, room swimlanes, zoom levels, and keyboard navigation. For a 3-room property (the median GUDBRO customer), the Gantt shows 3 rows with sparse bookings. The chart takes 2 seconds to render because the Gantt library initializes a canvas-based rendering engine for what could be a simple table. The owner ("Mario", 35-55, medium tech comfort) does not understand what the colored bars mean. The calendar page already exists and works (`backoffice/accommodations/calendar/page.tsx`) -- the Gantt adds confusion, not clarity.

**Why it happens:** "Gantt view" sounds like a pro feature. Developers reach for a Gantt library (DHTMLX, Bryntum, or build from scratch) because the requirement says "Gantt." But for 1-25 rooms, a Gantt chart is the wrong abstraction. Hotels with 200+ rooms need Gantt. A 5-room guesthouse needs a grid calendar showing "which rooms are free this week."

**Warning signs:**

- Installing a heavy Gantt library (50-200KB+) for a simple grid
- Building horizontal scroll with drag-to-resize for properties where 80% have < 10 rooms
- Gantt rendering is noticeably slow on mobile (owners often manage from their phone)
- The existing `AvailabilityCalendar` component already shows booking/block/pricing data per room
- Owner cannot explain what the Gantt shows without training

**Prevention:**

- **Do NOT install a Gantt library.** Build a simple rooms-vs-dates grid using the existing `AvailabilityCalendar` pattern. The current calendar already handles bookings, blocks, and seasonal pricing per room. Extend it to show multiple rooms simultaneously in a grid (rooms on Y-axis, dates on X-axis) instead of a single-room calendar with a room filter dropdown.
- **Keep it simple: colored cells, not draggable bars.** Each cell = one room + one day. Colors: green (available), blue (booked with guest name), red (blocked), yellow (checkout day). Click to see details. No drag, no resize, no zoom.
- **Mobile-first.** The current calendar page uses `lg:grid-cols-3` for the layout. The Gantt/grid must work on a phone screen (320px wide). For 5 rooms and 7 days = 35 cells. That fits. For 25 rooms and 7 days = 175 cells. That needs horizontal scroll for rooms, which is fine.
- **If the owner asks "what does this mean?" the UI failed.** Test with a non-technical person. Show them the grid. Ask "which rooms are free this Friday?" If they cannot answer in 5 seconds, simplify.
- **Benchmark: the existing calendar page loads in < 1s.** The new grid must not regress this.

**Detection:** Count the rooms of your first 10 test properties. If the median is < 10, a Gantt chart is overkill. A colored grid does the job.

**Severity:** CRITICAL (from a business perspective) -- over-engineering wastes development time AND confuses the primary user. Both outcomes are expensive.
**Phase:** Calendar/Gantt phase. Descope to "room grid view" instead of "Gantt view."

---

### Pitfall 3: Minibar Self-Service Without Inventory Reconciliation Creates Revenue Leakage

**What goes wrong:** Guest opens the minibar tab on the in-stay dashboard. Sees "Coca-Cola - $2, Beer Bintang - $3." Taps "I took this." The order is recorded. But the owner never restocked the minibar after the previous guest. The current guest sees items that are not physically there. Or: guest takes 3 beers but only reports 1. Or: guest does not report at all (the honor system fails). The owner has no way to reconcile what was taken vs. what was reported.

**Why it happens:** Minibar self-service is fundamentally an honor system. Hotels with 200+ rooms have housekeeping staff who check minibars daily. A 5-room guesthouse relies on the guest to report consumption. The system records what the guest claims, not what was actually consumed. Without physical reconciliation, the data is unreliable.

**Warning signs:**

- No "minibar check" workflow for housekeeping/owner after checkout
- No inventory tracking per room (just a menu of items)
- System assumes 100% honest reporting by guests
- No reconciliation report comparing guest-reported vs. physically-checked consumption
- Owner disputes with guests over minibar charges with no evidence

**Prevention:**

- **Model minibar as a two-step process:**
  1. **Guest self-reports** via the dashboard (creates a draft order)
  2. **Owner confirms** during room check (marks the order as verified, can adjust quantities)
     This keeps the honor system but adds a verification layer. Guest sees "Minibar items reported: 2x Beer. Pending confirmation."
- **Per-room inventory is overkill for 1-25 rooms.** Do NOT build an inventory management system. Instead:
  - Owner sets the minibar menu (items + prices) per room type (not per room)
  - Guest self-reports consumption
  - Owner reviews at checkout or during room cleaning
  - Owner can add items the guest did not report
- **Minibar orders go through the existing service order state machine.** The existing `ServiceOrder` model has `pending -> confirmed -> ... -> delivered` states. Minibar orders start as `pending` (guest-reported) and the owner moves them to `confirmed`. This reuses existing infrastructure.
- **Checkout summary includes unconfirmed minibar items.** "You reported 2 beers from the minibar. These will be added to your stay total unless adjusted by your host." This creates accountability without friction.
- **Do NOT charge guests automatically for minibar.** The current system is cash/transfer-based. Minibar charges should appear on the checkout summary as "reported by guest, confirmed by host" -- not auto-charged.

**Detection:** Create a minibar order as a guest. Log in as the owner. If there is no way to review/adjust the order before finalizing, reconciliation is missing.

**Severity:** CRITICAL (revenue integrity) -- unreported minibar consumption is a known problem in hospitality. Building the self-service without reconciliation makes it worse because the owner thinks the system is tracking it (false sense of security).
**Phase:** Minibar/services phase. Must include the owner-side confirmation workflow, not just the guest-side reporting.

---

## Moderate Pitfalls

Mistakes that cause UX degradation, owner confusion, or technical debt.

### Pitfall 4: Guest Feedback Channel Timing Destroys Response Quality

**What goes wrong:** Guest gets a feedback prompt immediately at checkout. They are stressed (packing, rushing to airport, finding transport). They either skip it or tap 5 stars to dismiss it. The feedback is useless. Alternatively, guest gets a feedback request 7 days after checkout. They have already forgotten the stay details. "It was fine." Also useless.

**Why it happens:** Feedback timing is treated as a simple trigger ("send after checkout") without considering the guest's emotional state and memory curve. Research from hospitality industry consistently shows: the best feedback comes 2-24 hours after checkout, when the guest has decompressed but still remembers details.

**Warning signs:**

- Feedback prompt appears on the checkout info screen (too early, guest is busy)
- Feedback request is a one-time push notification with no follow-up
- Feedback is a simple 1-5 star rating with no structured questions
- No distinction between "during stay" micro-feedback and "post-stay" review
- Owner never sees or responds to feedback (no closed loop)

**Prevention:**

- **Two feedback channels, not one:**
  1. **During-stay micro-feedback:** A persistent "How is your stay?" widget on the dashboard. Simple: happy/neutral/sad face. If sad face, show a text field. This catches issues the owner can fix NOW (broken AC, noisy room, missing towels). Immediate value for both parties.
  2. **Post-stay review:** Push notification or WhatsApp message sent 4-6 hours after checkout. "How was your stay at [property]? Your feedback helps [owner name] improve." Link to a simple form: overall rating + 3 category ratings (cleanliness, comfort, communication) + optional text.
- **Never block checkout for feedback.** The feedback prompt must be optional and skippable. Guests who feel forced to rate will give dishonest ratings.
- **Owner sees feedback in real-time.** During-stay feedback (especially negative) should appear in the backoffice immediately, with a suggested action: "Guest in Room 203 reported an issue. Contact them?"
- **Keep it short.** Total feedback form: < 60 seconds to complete. 3 category ratings + optional text. No 20-question surveys.

**Detection:** Time yourself completing the feedback form. If it takes more than 45 seconds, guests will not complete it.

**Severity:** MODERATE -- bad feedback timing means you collect data that does not improve the product. No immediate harm, but a wasted feature.
**Phase:** Guest feedback phase. Design the two-channel approach from the start.

---

### Pitfall 5: Convention/Voucher System Becomes an Unauditable Discount Machine

**What goes wrong:** Owner creates a convention code "YOGA2026" that gives 15% off. They share it with the yoga retreat organizer. The organizer shares it on social media. 200 people use the code, including people not in the retreat. The owner intended it for 20 people. There is no cap, no tracking of who used it, and no way to disable it without also affecting the 15 legitimate bookings already made with it.

**Why it happens:** Voucher/convention systems are deceptively simple to build ("just apply a discount code") but have complex edge cases: usage limits, expiration, per-guest limits, group tracking, and reporting. Building the happy path without constraints creates an uncontrollable discount tool.

**Warning signs:**

- Voucher code with no usage limit
- No association between voucher and expected guest list
- No per-guest usage limit (same guest uses code multiple times)
- Owner cannot see who used the code or how many times
- No expiration date on voucher codes
- Voucher discount stacks with weekly/monthly discounts (double discount)

**Prevention:**

- **Every voucher code must have:**
  - Maximum total uses (e.g., 20 for a retreat group)
  - Optional per-guest limit (default: 1)
  - Expiration date
  - Associated property ID (cannot be used at other properties)
  - Creator tracking (who created it, when)
  - Usage log (who used it, when, for which booking)
- **Convention codes are voucher codes with a group label.** A "convention" is just a voucher with extra metadata: group name, expected headcount, contact person. Do NOT build a separate convention system -- extend vouchers.
- **Discount stacking rules must be explicit.**
  - Voucher discount + weekly/monthly discount: pick the best one, do not stack
  - The pricing engine (`lib/price-utils.ts`) already calculates weekly/monthly discounts. Vouchers must integrate into this, not bypass it.
- **Owner dashboard: voucher usage report.** Show: code, total uses, remaining uses, revenue impact (total discount given). This makes vouchers auditable.
- **Do NOT allow percentage discounts > 50%.** A typo (150% off instead of 15%) should be caught by validation, not discovered when someone books a room for negative money.

**Detection:** Create a voucher code. Use it 100 times. If the system does not stop you at the usage limit, this is broken.

**Severity:** MODERATE -- revenue leakage from uncontrolled discounts. Fixable but embarrassing.
**Phase:** Convention/voucher phase. Usage limits and expiration are mandatory from day one.

---

### Pitfall 6: Bottom Nav Overhaul Confuses Returning Guests

**What goes wrong:** Returning guests who used the old BottomNav (Home, Map, Menu, Services, Profile) suddenly see a different nav structure. The "Services" tab they used to order breakfast is now called "Orders" and is in a different position. The "Menu" center button now does something different. Muscle memory fails. The guest taps where "Services" used to be and gets "Profile" instead. They think the app is broken.

**Why it happens:** The current `BottomNav.tsx` has 5 items with specific IDs (`home`, `map`, `menu`, `services`, `profile`). Changing the order, labels, or icons disrupts the spatial memory of users who have used the app during a previous stay. For returning guests (a key differentiator in the accommodation space), this is particularly damaging.

**Warning signs:**

- Nav items reordered without considering existing users
- Tab IDs renamed (breaking `handleTabChange` and `activeTab` state)
- The center "Menu" button behavior changes (currently triggers `onMenuToggle`)
- No transition period or explanation for the new nav
- Guest-facing and owner-facing nav redesigned simultaneously (double confusion)

**Prevention:**

- **Keep the first and last nav items stable.** "Home" on the left, "Profile" on the right -- these are muscle memory anchors. Change middle items if needed.
- **Maintain the `onTabChange` contract.** The new BottomNav must emit the same tab IDs that `InStayDashboard.handleTabChange` expects. If adding new tabs, extend the handler -- do not rename existing IDs.
- **Functional parity first, visual redesign second.** If the new nav has the same items in the same order but with better icons/labels, it is a safe change. If items move or are removed, existing flows break.
- **Test with the RoomDashboard page too.** The `RoomDashboard` (`app/stay/room/[roomCode]/page.tsx`) does NOT currently use `BottomNav`, but if the redesign adds it there, ensure progressive auth still works (browse tier users should not see tabs for gated features).

**Detection:** Open the old dashboard. Memorize where "Services" is. Deploy the new nav. Tap where "Services" was. If you get a different feature, returning guests will be confused.

**Severity:** MODERATE -- confusion is temporary but hurts the "returning guest" value proposition.
**Phase:** Bottom nav overhaul. Ship as a visual refinement, not a restructure.

---

### Pitfall 7: Onboarding Wizard Blocks Existing Owners Who Already Configured Their Property

**What goes wrong:** The onboarding wizard is designed for new owners setting up for the first time. After deploying, ALL owners (including those with fully configured properties) see the wizard on their next login. The wizard asks them to "add your property name" -- which they already did 3 months ago. Some owners panic: "Did my data get deleted?" Others click through impatiently, accidentally overwriting their existing configuration with wizard defaults.

**Why it happens:** The wizard does not check if the property is already configured. It triggers for every owner who has not explicitly completed the wizard (since the wizard did not exist before, no one has "completed" it).

**Warning signs:**

- Wizard shows for all owners, not just new ones
- Wizard steps pre-fill with default values instead of existing data
- No "skip wizard" option for already-configured properties
- Wizard overwrites existing data if the owner clicks "Save" on a pre-filled step
- No detection of "this property is already set up"

**Prevention:**

- **Detect existing configuration and skip the wizard.** Check: does the property have a name, at least one room, and at least one service? If yes, the owner has already set up. Do NOT show the wizard.
- **Wizard status stored per-property, not per-owner.** An owner with 3 properties: 2 configured, 1 new. The wizard should show only for the new property.
- **Pre-fill wizard with existing data, not defaults.** If an owner does enter the wizard for an existing property (via a "Re-run setup" link), all fields should show current values.
- **Wizard is additive, never destructive.** Completing a wizard step should only write data if the field was explicitly changed. "Step 1: Property Name [Beach View Apartment]" -- if the owner clicks Next without changing it, do not re-save.
- **Mark existing properties as "wizard_completed" in a migration.** When deploying the wizard, run a migration that sets `wizard_completed = true` for all properties that have a name and at least one room.

**Detection:** Log in as an owner with a fully configured property. If the wizard appears, this is broken.

**Severity:** MODERATE -- confuses existing owners, potential data loss if wizard overwrites existing config.
**Phase:** Onboarding wizard phase. The "skip for existing" logic is the first thing to implement, not the last.

---

### Pitfall 8: Early Check-in / Late Checkout Creates Double-Booking Edge Cases

**What goes wrong:** Guest A has a booking: check-in Jan 10, check-out Jan 15. Guest B has a booking: check-in Jan 15, check-out Jan 20. Guest A requests late checkout (until 3 PM). Guest B requests early check-in (at 11 AM). The system approves both because it checks each request independently. Now two guests claim the same room on Jan 15 from 11 AM to 3 PM. The owner has to awkwardly ask one guest to wait in the lobby.

**Why it happens:** Early check-in and late checkout modify the effective occupation window but the booking system only tracks dates, not times. The existing calendar (`backoffice/accommodations/calendar/page.tsx`) resolves bookings as half-open date intervals: `check_in_date <= date < check_out_date`. Adding time-based flexibility to a date-based system creates conflicts the calendar cannot detect.

**Warning signs:**

- Early/late checkout stored as boolean flags without time specifications
- No conflict check against adjacent bookings when approving early/late requests
- Calendar still shows bookings by date, not by time slot
- Owner approves early check-in without seeing that previous guest has late checkout
- No buffer time between bookings for room cleaning

**Prevention:**

- **Early/late is a request, not automatic.** Guest requests early check-in or late checkout. Owner sees the request WITH a conflict warning if it overlaps an adjacent booking. Owner approves or denies. Never auto-approve.
- **Conflict detection query:** When Guest B requests early check-in on Jan 15:
  ```sql
  -- Check if Room X has a booking with late checkout on Jan 15
  SELECT * FROM accom_bookings
  WHERE room_id = $1
  AND check_out_date = '2026-01-15'
  AND late_checkout_approved = true;
  ```
  If a result exists, show the owner: "Warning: Guest A in this room has late checkout until 3 PM. Early check-in at 11 AM would overlap."
- **Add a cleaning buffer.** Between any checkout and the next check-in, require a minimum gap (configurable, default: 2 hours). This is independent of early/late checkout -- it is a property-level setting.
- **Do NOT modify the booking date fields.** `check_in_date` and `check_out_date` remain pure dates. Add separate fields: `early_checkin_time`, `late_checkout_time`, `early_checkin_approved`, `late_checkout_approved`. This preserves the existing date-based calendar logic.
- **Display in the calendar as a visual indicator**, not a date change. A booking with late checkout shows a small "Late CO 3PM" badge on the checkout date cell. The cell is still "available" for date-based queries, but the owner sees the time constraint.

**Detection:** Create two adjacent bookings (A checks out Jan 15, B checks in Jan 15). Approve late checkout for A and early check-in for B. If the system does not warn about the overlap, this is broken.

**Severity:** MODERATE -- creates real-world conflicts but does not break the system. Owner must resolve manually.
**Phase:** Early/late checkout phase. Conflict detection is mandatory, not a nice-to-have.

---

### Pitfall 9: Delivery App Integration Creates a Second Order Channel That Owners Cannot Manage

**What goes wrong:** Guest can now order via the in-stay dashboard (existing) AND via a delivery app integration (new). Owner receives orders in two places. They fulfill the delivery order but forget to mark the dashboard order as delivered. Or: guest orders via dashboard, then re-orders the same thing via the delivery app because the dashboard order was slow. Owner prepares both. Guest gets double food. Revenue from the delivery app order has a 30% commission. Revenue from the dashboard order is 100%. The owner cannot reconcile which channel is better.

**Why it happens:** Adding a second order channel without unified order management creates operational chaos for a small property owner who does not have a staff to monitor multiple systems.

**Warning signs:**

- Orders from delivery app and dashboard appear in different dashboards
- No unified order view for the owner
- Guest can place duplicate orders across channels with no dedup warning
- Delivery app orders not reflected in the in-stay order history
- No analytics comparing revenue/margin by channel

**Prevention:**

- **Delivery app integration should be a LINK, not a parallel system.** The in-stay dashboard shows: "Want food delivered? Order via [DeliveryApp]" with a deep link. The order happens entirely in the delivery app. GUDBRO does not track it, does not duplicate it, and does not try to reconcile it.
- **If you MUST track delivery orders:** ingest them via webhook/API and show them in the same order list with a "via [App]" badge. But do NOT build a parallel order-taking system.
- **Clear channel separation for the guest:** Dashboard = property's own services (breakfast, minibar, laundry). Delivery app = external food delivery. These are different things. Do not let the guest order the same breakfast through both channels.
- **Analytics: track which channel guests prefer.** Simple counter: "Orders via dashboard: 45. Orders via delivery app: 12." This informs whether the delivery integration is useful.
- **For the owner: one inbox.** All orders (dashboard + delivery if tracked) appear in the same backoffice order page (`backoffice/accommodations/orders/page.tsx`). No separate dashboards.

**Detection:** Place an order via the dashboard and an order via the delivery integration. Log in as the owner. If these appear in different places, the owner will miss one.

**Severity:** MODERATE -- operational confusion for the owner. Not a system failure, but a UX failure.
**Phase:** Delivery integration phase. Start with "link out" approach, not "ingest orders."

---

### Pitfall 10: Performance Tracking Dashboard Built Before There Is Enough Data

**What goes wrong:** The performance tracking feature ships with beautiful charts: occupancy rate, revenue per room, average booking value, service order conversion. For a property with 3 rooms and 2 months of data, every chart is either empty or misleading. "Occupancy rate: 100%" because the property had one booking last week and it filled 1 of 1 active rooms. "Average booking value: $450" based on a single luxury booking. The owner draws incorrect conclusions from statistically insignificant data.

**Why it happens:** Analytics features are designed for mature products with months of data. Shipping analytics on day one of a feature launch means showing charts with insufficient sample sizes, which is worse than showing no charts.

**Warning signs:**

- Charts render with 1-2 data points
- Percentage metrics calculated from sample sizes < 10
- Trend lines showing "growth" based on 2 weeks of data
- No minimum data threshold before showing analytics
- Owner makes pricing decisions based on 3 bookings worth of data

**Prevention:**

- **Minimum data thresholds for each metric.** Do not show:
  - Occupancy rate until at least 30 days of data
  - Average booking value until at least 10 bookings
  - Trend lines until at least 3 months of data
  - Conversion rates until at least 50 dashboard views
- **Show raw numbers first, charts later.** Instead of a misleading pie chart, show: "This month: 3 bookings, $450 total revenue, 2 service orders." Simple, accurate, useful.
- **Contextual benchmarks, not absolute metrics.** "Your occupancy this month: 60%. Similar properties in Da Nang: 72%." This gives the owner context. Without benchmarks, "60% occupancy" means nothing to a first-time property owner.
- **Phase the analytics:**
  - Month 1-3: Simple counters (bookings, revenue, orders)
  - Month 3-6: Monthly comparisons ("This month vs last month")
  - Month 6+: Trend charts, conversion funnels, revenue per room

**Detection:** Create a property with 2 bookings. Open the analytics dashboard. If you see charts with trend lines, the analytics are premature.

**Severity:** MODERATE -- misleading data is worse than no data. Owner makes bad decisions.
**Phase:** Performance tracking phase. Ship counters first, charts later.

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable without major rework.

### Pitfall 11: Returning Guest Detection Based on Email Matching Fails for Asian Names

**What goes wrong:** Guest "Nguyen Van Anh" books in January with email `anh123@gmail.com`. In March, they book again with `nguyenvananh@gmail.com` (different email, same person). The system does not detect them as a returning guest. Separately, "John Smith" books with `john@company.com`. A different "John Smith" books with `johnsmith@gmail.com`. The system incorrectly flags them as the same returning guest because both are "John Smith."

**Why it happens:** Name-based matching is unreliable due to common names (especially in SEA: Nguyen, Tran, Le are extremely common Vietnamese surnames). Email-based matching fails because guests use different emails. Phone-based matching is better but guests may use different numbers.

**Prevention:**

- **Multi-signal matching with confidence scoring:**
  - Same email = HIGH confidence (likely same person)
  - Same phone = HIGH confidence
  - Same name + same country = MEDIUM confidence (could be different person)
  - Same name only = LOW confidence (too many false positives for SEA names)
- **Never auto-apply returning guest benefits on LOW confidence.** Only HIGH confidence matches get automatic recognition. MEDIUM confidence: show the owner "Possible returning guest?" for manual confirmation.
- **Store a guest fingerprint hash.** Combine: email (normalized) + phone (normalized) + country. Hash it. Match on hash for fast lookup.
- **Do NOT use name alone for matching in Vietnam/Thailand/Indonesia.** Common family names (Nguyen: ~40% of Vietnamese population) make name-based matching useless.

**Detection:** Create two bookings with different emails but the same Vietnamese name. If the system flags them as returning, false positive rate is too high.

**Severity:** MINOR -- false positives are annoying but not harmful. False negatives (missing returning guests) are a missed opportunity, not a bug.
**Phase:** Returning guest detection phase. Multi-signal matching from the start.

---

### Pitfall 12: Image Upload Without Size/Format Validation Slows Down the PWA

**What goes wrong:** Owner uploads a 12MB DSLR photo as a property image. Or a guest uploads a 20MB RAW scan of their passport. The PWA loads these full-size images, causing 3-5 second load times on SEA mobile networks (which average 10-30 Mbps in urban areas, much less in rural tourism areas).

**Prevention:**

- **Max upload size: 5MB for property images, 10MB for documents.**
- **Auto-resize property images server-side** to max 1920px wide, WebP format, ~200KB each.
- **Lazy-load images** below the fold (especially in property gallery).
- **Document images: store original for compliance, serve compressed thumbnail for display.**
- **Validate on the client before upload.** The existing `image-utils.ts` should handle this. Show an error immediately, do not wait for the server.

**Detection:** Upload a 15MB image. If the upload succeeds and the full-size image is served to PWA users, this is broken.

**Severity:** MINOR -- slow load times on mobile. Fixable with image processing pipeline.
**Phase:** Image upload phase. Validation and resize are part of the upload API, not a follow-up.

---

### Pitfall 13: Bug Fixes to Existing Features Introduce Regressions in Adjacent Features

**What goes wrong:** Fix #7 corrects the booking calendar date handling. The fix changes how `check_in_date` is parsed in the API. This subtly breaks the in-stay dashboard's `WelcomeCard` component, which also parses `checkIn` from the booking object. The bug fix is tested in isolation (calendar works!) but the regression in the dashboard is not caught until a guest reports their stay dates look wrong.

**Why it happens:** The accommodations codebase has tight coupling between features. The booking object is shared across: booking page, in-stay dashboard, backoffice bookings list, calendar page, order system (for date validation), and analytics. A change to the booking data shape or parsing logic in one place can affect all others.

**Warning signs:**

- Bug fix changes a shared utility (e.g., `price-utils.ts`, `types.ts`, `stay-api.ts`)
- Bug fix modifies an API response shape
- Bug fix touches a Supabase query that multiple routes depend on
- No regression test for the adjacent features
- The 13 bug fixes are batched into one deploy

**Prevention:**

- **Ship bug fixes individually, not batched.** Each fix = one commit, one deploy, one verification. If fix #7 breaks something, you know exactly which commit caused it.
- **For each bug fix, list affected surfaces.** Before fixing a booking date bug, list: "This date is used in: calendar page, in-stay dashboard, backoffice booking detail, order validation, analytics." Test all of them.
- **Type safety is your friend.** The existing `types/stay.ts` defines shared types. If a bug fix changes a type, TypeScript will catch most downstream breakage. Run `tsc --noEmit` after every fix.
- **Keep shared utilities immutable when possible.** If `price-utils.ts` has a bug, fix it in place. But if the fix changes the function signature, create a new function and migrate callers one at a time.

**Detection:** After each bug fix, run the full typecheck (`pnpm tsc --noEmit`) and test the in-stay dashboard, booking page, and backoffice booking list. If any behave differently, the fix introduced a regression.

**Severity:** MINOR individually, but 13 bug fixes deployed together = HIGH regression risk collectively.
**Phase:** Bug fix phase. Ship one at a time, earliest in the milestone timeline.

---

## Integration Pitfalls with Existing System

These are specific to adding features to the EXISTING GUDBRO accommodations codebase (~30k LOC, 14 migrations, working progressive auth).

### State Management in InStayDashboard

The `app/stay/[code]/page.tsx` file is already 320+ lines with 15 state variables and 10+ components. Adding minibar, feedback, voucher display, and order detail view to this page will push it past maintainability limits.

| Current State Variables | Used By                                            |
| ----------------------- | -------------------------------------------------- |
| `activeTab`             | BottomNav, handleTabChange                         |
| `showCatalog`           | ServiceCatalog overlay                             |
| `showCart`              | CartDrawer                                         |
| `serviceCategories`     | ServicesCarousel, ServiceCatalog, CartDrawer       |
| `serviceTimezone`       | CartDrawer, ServiceCatalog                         |
| `documents`             | DocumentUpload section                             |
| `showUpload`            | DocumentUpload toggle                              |
| `propertyExtended`      | QuickActions, ReturnGuestBanner, RestaurantSection |
| `propertyLoading`       | Loading state                                      |

**Prevention:** Extract the dashboard into a compound component pattern BEFORE adding features:

- `DashboardProvider` (context with all shared state)
- `DashboardHome` (WiFi, welcome, quick actions)
- `DashboardServices` (carousel, catalog, cart, orders)
- `DashboardLocal` (deals, useful numbers, restaurant)
- `DashboardDocuments` (upload, visa status)

Add NEW features (minibar, feedback, voucher) as new dashboard sections that consume the provider. Do not add more state to the monolithic page component.

### Database Migration Risk

14 migrations (077-090) already exist. Adding 38 features will require 5-10 more migrations. Each migration runs against production data.

| Risk                                                                  | Prevention                                                             |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Migration adds NOT NULL column without default                        | Always add with DEFAULT, then backfill, then optionally remove DEFAULT |
| Migration modifies existing RLS policies                              | Test with both browse and full tier tokens                             |
| Migration adds FK to a table that does not exist yet (ordering issue) | Number migrations carefully, test in order                             |
| Migration is not idempotent                                           | Use `IF NOT EXISTS` for all CREATE statements                          |

### Existing API Routes That New Features Must Not Break

| Route                           | Current Behavior                                  | Risk from New Features                                                                                   |
| ------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `POST /api/stay/[code]/orders`  | Creates service order with items                  | Minibar orders must use SAME endpoint, not a new one                                                     |
| `GET /api/stay/[code]/services` | Returns service categories + items                | Minibar items must be a service category, not a separate model                                           |
| `GET /api/stay/[code]`          | Returns stay data (booking, room, wifi, property) | New fields (voucher, feedback URL, early checkout) must be added to existing response, not new endpoints |
| `GET /api/property/[slug]`      | Returns property page data                        | Convention info must extend this response                                                                |

---

## Phase-Specific Warnings

| Phase Topic                  | Likely Pitfall                             | Mitigation                                            |
| ---------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| Bug Fixes (first)            | Regression in adjacent features (P13)      | Ship individually, typecheck after each               |
| Gantt Calendar               | Over-engineering for small properties (P2) | Build a colored room grid, not a Gantt library        |
| Minibar Self-Service         | No inventory reconciliation (P3)           | Two-step: guest reports, owner confirms               |
| Guest Feedback               | Bad timing kills response quality (P4)     | Two channels: during-stay micro + post-stay review    |
| Conventions/Vouchers         | Unauditable discount machine (P5)          | Usage limits, expiration, stacking rules from day one |
| PWA Homepage Redesign        | Breaks active guest sessions (P1)          | Additive redesign, preserve state contracts           |
| Bottom Nav Overhaul          | Confuses returning guests (P6)             | Keep anchor positions, maintain tab IDs               |
| Onboarding Wizard            | Blocks existing configured owners (P7)     | Detect existing config, skip wizard                   |
| Early Check-in/Late Checkout | Double-booking edge cases (P8)             | Conflict detection against adjacent bookings          |
| Delivery Integration         | Second unmanaged order channel (P9)        | Link-out approach, not parallel order system          |
| Performance Tracking         | Premature charts mislead owners (P10)      | Counters first, charts after 3 months of data         |
| Returning Guest Detection    | False positives for common SEA names (P11) | Multi-signal matching with confidence scoring         |
| Image Uploads                | Large images slow PWA on mobile (P12)      | Size limits, auto-resize, lazy loading                |

---

## Summary: Top 5 Mistakes to Avoid

1. **Do not build a full Gantt chart for 1-25 room properties.** A colored rooms-vs-dates grid is the right abstraction. Gantt libraries add 50-200KB, render slowly on mobile, and confuse non-technical owners. The existing calendar component pattern is the right foundation.

2. **Do not ship the UI overhaul in one big deploy.** The in-stay dashboard has 15+ state variables and 10+ components that depend on specific state contracts. Break the redesign into additive phases (new components alongside old, then switch, then remove old). Mid-stay guests must never see a broken dashboard.

3. **Do not build minibar self-service without an owner confirmation step.** Self-reporting is an honor system. Without a "owner reviews and confirms" workflow, you create a false sense of tracking while revenue leaks through unreported consumption. Use the existing service order state machine (`pending -> confirmed`).

4. **Do not batch all 13 bug fixes into one deploy.** The accommodations codebase has tight coupling. Each bug fix should be a separate commit with regression testing on adjacent features. One bad fix in a batch of 13 is very hard to isolate.

5. **Do not show analytics charts before you have enough data.** A trend line based on 2 data points is worse than no trend line. Ship simple counters (bookings, revenue, orders) first. Add charts after 3 months of data accumulation.

---

## Sources

- Existing GUDBRO codebase analysis:
  - `apps/accommodations/frontend/app/stay/[code]/page.tsx` -- InStayDashboard (320 LOC, 15 state variables)
  - `apps/accommodations/frontend/app/stay/room/[roomCode]/page.tsx` -- RoomDashboard with progressive auth
  - `apps/accommodations/frontend/components/BottomNav.tsx` -- Current nav structure (5 items, hardcoded IDs)
  - `apps/backoffice/app/(dashboard)/accommodations/calendar/page.tsx` -- Existing calendar with AvailabilityCalendar component
  - `apps/accommodations/frontend/hooks/useServiceCart.ts` -- In-memory cart state
  - `apps/accommodations/frontend/hooks/useOrderPolling.ts` -- Order polling pattern
  - `apps/accommodations/frontend/lib/price-utils.ts` -- Pricing engine
  - `shared/database/migrations/schema/077-090` -- 14 existing migrations
- Hospitality industry patterns:
  - Minibar reconciliation is a known problem in hospitality -- self-service without verification leads to 15-30% revenue leakage (industry estimate from AHLA)
  - Guest feedback timing: 2-24 hours post-checkout yields highest quality responses (Cornell Hospitality Research)
  - Vietnamese surname distribution: Nguyen accounts for ~40% of the population, making name-based matching unreliable
