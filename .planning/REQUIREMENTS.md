# Requirements: GUDBRO Verticals v1.1

**Defined:** 2026-01-29
**Core Value:** Guests scan a QR in their room and instantly access WiFi, stay info, services, local deals, and host contact — all from real data.

## v1.1 Requirements

Requirements for In-Stay MVP Backend (Accommodations vertical).

### Database Schema

- [x] **DB-01**: Properties table with name, slug, description, amenities, WiFi credentials, contact info, images
- [x] **DB-02**: Rooms table linked to properties with room number, type, capacity, floor
- [x] **DB-03**: Bookings table with guest name, email, phone, check-in/out dates, booking code (BK-XXXXXX), room assignment, status
- [x] **DB-04**: Services table with categories (breakfast, minibar, laundry, room service), items, prices, availability hours
- [x] **DB-05**: Service items table with name, description, price, category, image, availability
- [x] **DB-06**: Local partnerships integrated with existing conventions system (migration 050) — link partner_conventions to properties
- [x] **DB-07**: RLS policies for guest access (read-only via booking code) and owner access (full CRUD)
- [x] **DB-08**: Seed data for one demo property with rooms, bookings, services, and partnerships

### API Routes

- [x] **API-01**: GET /api/stay/[code] — verify booking code and return stay data (property, room, dates, WiFi)
- [x] **API-02**: POST /api/stay/verify — verify guest identity (last name + booking code) and return session token
- [x] **API-03**: GET /api/stay/[code]/services — return available services with items and prices
- [x] **API-04**: GET /api/stay/[code]/deals — return local partnership deals for the property
- [x] **API-05**: GET /api/stay/[code]/property — return property info (contact, house rules, checkout info)

### In-Stay Dashboard

- [x] **STAY-01**: Booking verification screen — guest enters last name + booking code to access dashboard
- [x] **STAY-02**: WiFi card prominently displayed — network name, password, copy-to-clipboard button
- [x] **STAY-03**: Stay summary card — dates, room number, guest count, checkout time, countdown
- [x] **STAY-04**: Services menu — browse categories (breakfast, minibar, laundry, room service) with items and prices (view only, no ordering)
- [x] **STAY-05**: Local deals section — partner offers with discounts, descriptions, and contact/booking action
- [x] **STAY-06**: Contact host — WhatsApp deep link with pre-filled message, phone call option
- [x] **STAY-07**: Checkout info — time, procedure, key return instructions
- [x] **STAY-08**: Replace all mock data in accommodations frontend with real API calls

### F&B Integration

- [x] **FNB-01**: Deep-link from In-Stay dashboard to property's coffeeshop PWA — when property has linked F&B vertical, "Restaurant" / "Breakfast" service card opens the coffeeshop PWA with property context
- [x] **FNB-02**: Property configuration flag: has_linked_fnb (boolean) + linked_fnb_slug (coffeeshop PWA slug) — determines whether services show simple menu or deep-link to F&B PWA
- [x] **FNB-03**: Simple in-stay menu for properties WITHOUT linked F&B — static list of items with prices, no ordering (view-only catalog for B&B breakfast, minibar)

### Integration

- [x] **INT-01**: Connect conventions system (migration 050) to accommodations — property_id as convention source
- [x] **INT-02**: Supabase client configuration in accommodations frontend (env vars, client setup)
- [x] **INT-03**: Error handling and loading states for all API calls
- [x] **INT-04**: Multi-language support for service names and descriptions (at minimum English)

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

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| DB-01       | Phase 4 | Complete |
| DB-02       | Phase 4 | Complete |
| DB-03       | Phase 4 | Complete |
| DB-04       | Phase 4 | Complete |
| DB-05       | Phase 4 | Complete |
| DB-06       | Phase 4 | Complete |
| DB-07       | Phase 4 | Complete |
| DB-08       | Phase 4 | Complete |
| API-01      | Phase 5 | Complete |
| API-02      | Phase 5 | Complete |
| API-03      | Phase 5 | Complete |
| API-04      | Phase 5 | Complete |
| API-05      | Phase 5 | Complete |
| INT-02      | Phase 5 | Complete |
| INT-03      | Phase 6 | Complete |
| INT-04      | Phase 6 | Complete |
| STAY-01     | Phase 6 | Complete |
| STAY-02     | Phase 6 | Complete |
| STAY-03     | Phase 6 | Complete |
| STAY-04     | Phase 6 | Complete |
| STAY-05     | Phase 6 | Complete |
| STAY-06     | Phase 6 | Complete |
| STAY-07     | Phase 6 | Complete |
| STAY-08     | Phase 6 | Complete |
| FNB-01      | Phase 7 | Complete |
| FNB-02      | Phase 7 | Complete |
| FNB-03      | Phase 7 | Complete |
| INT-01      | Phase 7 | Complete |

**Coverage:**

- v1.1 requirements: 28 total
- Mapped to phases: 28 (100%)
- Unmapped: 0

**Phase Distribution:**

- Phase 4 (Database Foundation): 8 requirements
- Phase 5 (API Layer): 8 requirements
- Phase 6 (In-Stay Dashboard): 8 requirements
- Phase 7 (F&B Integration): 4 requirements

---

_Requirements defined: 2026-01-29_
_Last updated: 2026-01-30 after phase 7 completion (v1.1 milestone complete — 28/28 requirements)_
