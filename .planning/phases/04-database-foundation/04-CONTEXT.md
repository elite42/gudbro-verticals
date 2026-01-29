# Phase 4: Database Foundation - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Accommodations database schema with properties, rooms, bookings, services, local partnerships, RLS policies, and demo seed data. No API routes, no frontend changes — pure database layer.

</domain>

<decisions>
## Implementation Decisions

### Booking Code & Verification

- Format: `BK-` + 6 uppercase alphanumeric characters (e.g., `BK-A3F7K2`)
- Characters: A-Z, 0-9 excluding ambiguous (0/O, 1/I/L) for readability
- Generated randomly at booking creation with uniqueness check
- Valid during stay: check-in date through check-out date + 24h grace period
- Verification: guest last name + booking code → dashboard access
- One code per booking, not per guest — shared by all guests in the room
- No password, no account creation required

### Service Structure

- Categories are dynamic per property (not hardcoded) — each property chooses which to activate
- Typical categories: Breakfast, Room Service, Minibar, Laundry, Spa, Transport
- Service items: name, description, price, availability (time slots or always available)
- Prices stored as integers (cents), currency from property configuration
- View-only in v1.1 — no online ordering. Guest sees menu, contacts via phone/WhatsApp
- Translations via separate table (standard GUDBRO pattern: English column names, translations table)

### Seed Data Demo

- 1 demo property: tourist apartment in Da Nang, Vietnam
- 3 rooms: Studio (101), Suite (201), Deluxe (301)
- 2 active bookings: one current (test dashboard), one future (test states)
- Services: Breakfast (3-4 items), Minibar (5-6 items with prices), Laundry (3 items)
- 3 local partnerships: restaurant, tour operator, airport transfer — with discounts like "10% for guests"
- WiFi credentials: realistic network name and password
- Host contact: fictitious WhatsApp number

### Local Partnerships & Deals

- Linked via property_id using existing conventions system (migration 050)
- Property acts as convention "source" (same pattern as merchant in coffeeshop)
- Deal structure: partner name, discount type (percentage or fixed), offer description, action (link, phone, WhatsApp)
- Partner categories: Restaurant, Transport, Activity, Shopping — for display organization
- Optional validity dates — some deals permanent, some seasonal
- No coupon tracking in v1.1 — guest sees deal and contacts partner directly

### Claude's Discretion

- Exact table column naming and constraints
- Index strategy for performance
- RLS policy implementation approach
- Migration file organization (single vs multiple)
- How to handle timezone for booking dates
- EXIF/metadata for property images storage approach

</decisions>

<specifics>
## Specific Ideas

- Property location: Da Nang, Vietnam — exotic and realistic for a tourist-facing product
- Booking code format inspired by airline PNR codes — familiar to travelers
- Services are view-only: the In-Stay Dashboard is an information hub, not an e-commerce platform (ordering comes later)
- Conventions system reuse avoids creating new tables for partnerships

</specifics>

<deferred>
## Deferred Ideas

- Online ordering through services menu — future milestone (v1.2+)
- Coupon/discount tracking and validation — future phase
- Multi-property management for owners — Phase 7+ or v1.2
- Guest messaging/chat with host — beyond v1.1 scope

</deferred>

---

_Phase: 04-database-foundation_
_Context gathered: 2026-01-29_
