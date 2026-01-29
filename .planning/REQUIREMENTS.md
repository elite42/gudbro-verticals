# Requirements: GUDBRO Verticals v1.1

**Defined:** 2026-01-29
**Core Value:** Guests scan a QR in their room and instantly access WiFi, stay info, services, local deals, and host contact — all from real data.

## v1.1 Requirements

Requirements for In-Stay MVP Backend (Accommodations vertical).

### Database Schema

- [ ] **DB-01**: Properties table with name, slug, description, amenities, WiFi credentials, contact info, images
- [ ] **DB-02**: Rooms table linked to properties with room number, type, capacity, floor
- [ ] **DB-03**: Bookings table with guest name, email, phone, check-in/out dates, booking code (BK-XXXXXX), room assignment, status
- [ ] **DB-04**: Services table with categories (breakfast, minibar, laundry, room service), items, prices, availability hours
- [ ] **DB-05**: Service items table with name, description, price, category, image, availability
- [ ] **DB-06**: Local partnerships integrated with existing conventions system (migration 050) — link partner_conventions to properties
- [ ] **DB-07**: RLS policies for guest access (read-only via booking code) and owner access (full CRUD)
- [ ] **DB-08**: Seed data for one demo property with rooms, bookings, services, and partnerships

### API Routes

- [ ] **API-01**: GET /api/stay/[code] — verify booking code and return stay data (property, room, dates, WiFi)
- [ ] **API-02**: POST /api/stay/verify — verify guest identity (last name + booking code) and return session token
- [ ] **API-03**: GET /api/stay/[code]/services — return available services with items and prices
- [ ] **API-04**: GET /api/stay/[code]/deals — return local partnership deals for the property
- [ ] **API-05**: GET /api/stay/[code]/property — return property info (contact, house rules, checkout info)

### In-Stay Dashboard

- [ ] **STAY-01**: Booking verification screen — guest enters last name + booking code to access dashboard
- [ ] **STAY-02**: WiFi card prominently displayed — network name, password, copy-to-clipboard button
- [ ] **STAY-03**: Stay summary card — dates, room number, guest count, checkout time, countdown
- [ ] **STAY-04**: Services menu — browse categories (breakfast, minibar, laundry, room service) with items and prices (view only, no ordering)
- [ ] **STAY-05**: Local deals section — partner offers with discounts, descriptions, and contact/booking action
- [ ] **STAY-06**: Contact host — WhatsApp deep link with pre-filled message, phone call option
- [ ] **STAY-07**: Checkout info — time, procedure, key return instructions
- [ ] **STAY-08**: Replace all mock data in accommodations frontend with real API calls

### F&B Integration

- [ ] **FNB-01**: Deep-link from In-Stay dashboard to property's coffeeshop PWA — when property has linked F&B vertical, "Restaurant" / "Breakfast" service card opens the coffeeshop PWA with property context
- [ ] **FNB-02**: Property configuration flag: has_linked_fnb (boolean) + linked_fnb_slug (coffeeshop PWA slug) — determines whether services show simple menu or deep-link to F&B PWA
- [ ] **FNB-03**: Simple in-stay menu for properties WITHOUT linked F&B — static list of items with prices, no ordering (view-only catalog for B&B breakfast, minibar)

### Integration

- [ ] **INT-01**: Connect conventions system (migration 050) to accommodations — property_id as convention source
- [ ] **INT-02**: Supabase client configuration in accommodations frontend (env vars, client setup)
- [ ] **INT-03**: Error handling and loading states for all API calls
- [ ] **INT-04**: Multi-language support for service names and descriptions (at minimum English)

## v1.2 Requirements (Deferred)

### Booking Mode

- **BOOK-01**: Property page with photo gallery, pricing, amenities
- **BOOK-02**: Booking flow (date selection, guest info, confirmation)
- **BOOK-03**: WhatsApp/email booking confirmation

### Owner Dashboard

- **OWN-01**: Property management (add/edit details, photos)
- **OWN-02**: Room management (add rooms, assign to bookings)
- **OWN-03**: Service management (CRUD for services and items)
- **OWN-04**: Partnership management (add/edit local partners)
- **OWN-05**: QR code generation for rooms

### Service Ordering

- **ORD-01**: Guest can submit service requests (breakfast order, laundry pickup)
- **ORD-02**: Owner receives service request notifications
- **ORD-03**: Request status tracking (submitted → confirmed → fulfilled)

## Out of Scope

| Feature                    | Reason                                                        |
| -------------------------- | ------------------------------------------------------------- |
| Visa Tracker               | Complex feature, needs OCR/document handling — defer to v1.3+ |
| Digital Laundry Form       | Dedicated feature with tracking — defer to v1.2 with ordering |
| Online payments            | Cash/transfer only for MVP, reduces complexity                |
| GUDBRO Network integration | Requires multiple verticals with backend — future             |
| Review system              | Not needed for In-Stay MVP                                    |
| Calendar sync              | Owner feature, deferred with Owner Dashboard                  |
| Multi-property management  | Single property per owner for MVP                             |
| Self check-in automation   | QR + booking code is sufficient for MVP                       |

## Traceability

| Requirement | Phase | Status  |
| ----------- | ----- | ------- |
| DB-01       | TBD   | Pending |
| DB-02       | TBD   | Pending |
| DB-03       | TBD   | Pending |
| DB-04       | TBD   | Pending |
| DB-05       | TBD   | Pending |
| DB-06       | TBD   | Pending |
| DB-07       | TBD   | Pending |
| DB-08       | TBD   | Pending |
| API-01      | TBD   | Pending |
| API-02      | TBD   | Pending |
| API-03      | TBD   | Pending |
| API-04      | TBD   | Pending |
| API-05      | TBD   | Pending |
| STAY-01     | TBD   | Pending |
| STAY-02     | TBD   | Pending |
| STAY-03     | TBD   | Pending |
| STAY-04     | TBD   | Pending |
| STAY-05     | TBD   | Pending |
| STAY-06     | TBD   | Pending |
| STAY-07     | TBD   | Pending |
| STAY-08     | TBD   | Pending |
| FNB-01      | TBD   | Pending |
| FNB-02      | TBD   | Pending |
| FNB-03      | TBD   | Pending |
| INT-01      | TBD   | Pending |
| INT-02      | TBD   | Pending |
| INT-03      | TBD   | Pending |
| INT-04      | TBD   | Pending |

**Coverage:**

- v1.1 requirements: 28 total
- Mapped to phases: 0
- Unmapped: 28

---

_Requirements defined: 2026-01-29_
_Last updated: 2026-01-29 after initial definition_
