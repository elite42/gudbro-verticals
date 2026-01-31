# Phase 19: Property Page & Booking Flow - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Public property page that guests discover via URL (Google, social, referral) and use to evaluate and book an accommodation. Covers: photo gallery, property details, date selection with availability, price breakdown, and guest booking submission (no account required). Server-rendered for SEO with OG meta tags and structured data.

**Out of scope:** Payment processing (Phase 20), owner dashboard (Phase 21), calendar management (Phase 22), service ordering (Phase 23), reviews system (future).

</domain>

<decisions>
## Implementation Decisions

### Gallery & Property Presentation

- Hero section: full-width swipeable photo gallery (touch gestures on mobile, arrows on desktop)
- Gallery supports tap-to-fullscreen with pinch-to-zoom on mobile
- Photo counter indicator (e.g., "3/12") on gallery
- Below gallery: property name, location, key stats (guests, bedrooms, bathrooms) in a compact header
- Description section with "Read more" truncation for long text
- Amenities displayed as icon grid (Phosphor Icons duotone) — grouped by category (Essentials, Kitchen, Outdoor, Safety)
- House rules as a clean list with icons
- Host info card: photo, name, response time, languages spoken, WhatsApp deep-link
- Location section: static map image (no interactive map SDK to keep bundle small), address text, "Open in Google Maps" link
- Mobile-first single-column layout; on desktop, sidebar with booking widget (sticky)

### Calendar & Date Selection

- Inline calendar component (not a date picker popup) — always visible in booking section
- Two-month view on desktop, single month with swipe on mobile
- Unavailable dates grayed out and non-selectable (from availability data in DB)
- Selected range highlighted with accent color
- Check-in date tap → check-out date tap flow (two-tap selection)
- Minimum stay enforcement shown on calendar (if property has min_nights)
- Price per night shown below calendar after date selection
- Price breakdown: (per-night × nights) + cleaning fee − discount (weekly/monthly) = total
- Discount badges visible: "10% weekly discount" / "25% monthly discount" when applicable

### Booking Form & Guest Flow

- Single-page flow (no multi-step wizard) — scroll down from gallery → details → calendar → form → submit
- Form fields: full name, email, phone (with country code picker), number of guests, special requests (optional textarea)
- Guest count limited to property max_guests with clear indicator
- No account creation — booking generates a JWT token for the guest to track their booking
- Submit button shows "Request to Book" for inquiry mode, "Book Now" for instant confirmation (based on property setting)
- After submit: confirmation screen with booking code (BK-XXXXXX), summary, and two CTAs:
  - "WhatsApp Host" deep-link (pre-filled message with booking code)
  - "Check your email" note
- Inquiry bookings show "Waiting for host confirmation" status with auto-expire notice
- Form validation: inline errors, email format check, phone required

### SEO & Server Rendering

- Next.js server-rendered page with dynamic OG meta tags (property name, first photo, price range, location)
- JSON-LD structured data: LodgingBusiness schema with AggregateOffer for pricing
- URL pattern: `/property/[slug]` where slug is the property's URL-friendly name
- Canonical URL set correctly
- Page title format: "[Property Name] — [Location] | GUDBRO Stays"
- Meta description auto-generated from property description (first 155 chars)

### Claude's Discretion

- Exact animation/transition choices for gallery swipe
- Loading skeleton design while property data loads
- Error state design (property not found, network error)
- Exact spacing, typography scale, and color palette application
- How to handle properties with very few photos (1-2)
- Mobile bottom bar vs inline CTA for "Book Now" scroll behavior
- Exact phone country code picker implementation

</decisions>

<specifics>
## Specific Ideas

- Property page is the "sales page" — goal is CONVERT (from PRD). Every design choice should reduce friction toward booking.
- Two-mode PWA architecture: this is "Booking Mode" entry point, distinct from "In-Stay Mode" (QR code entry in Phase 23)
- URL entry: `stays.gudbro.com/[property-slug]` — clean, shareable, SEO-friendly
- Target users are international tourists (25-45) comparing options on mobile — fast load, clear pricing, trust signals are essential
- WhatsApp is the primary communication channel in SEA — WhatsApp deep-link for host contact is first-class, not an afterthought
- Cash/transfer is default payment method (from v1.4 decisions) — booking flow should not require payment at submission for these methods
- Half-open daterange `[checkin, checkout)` — checkout day is free for new checkin (from v1.4 architecture decisions)
- All prices in INTEGER minor currency units (from v1.4 decisions) — display formatting needed

</specifics>

<deferred>
## Deferred Ideas

- Guest reviews/ratings display — future phase (not in v1.4 scope)
- Interactive map with nearby points of interest — keep simple for now (static map + Google Maps link)
- Multi-room selection in a single booking — start with single room per booking
- Social sharing buttons — can add later, URL is already shareable
- Wishlist/favorites functionality — requires guest accounts, out of scope

</deferred>

---

_Phase: 19-property-page-booking-flow_
_Context gathered: 2026-01-31_
