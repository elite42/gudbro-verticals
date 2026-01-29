# Roadmap: GUDBRO Verticals v1.1

## Milestones

- ✅ **v1.0 QA Multi-Vertical PWAs** - Phases 1-3 (shipped 2026-01-29)
- 🚧 **v1.1 In-Stay MVP Backend** - Phases 4-7 (in progress)
- 📋 **v1.2 Booking & Owner Dashboard** - Phases TBD (planned)

## Overview

This milestone transforms the Accommodations vertical from a frontend-only prototype into a functional In-Stay Dashboard connected to a real backend. When complete, guests can scan a QR code in their room, verify their booking, and access WiFi credentials, stay information, property services, local partnership deals, and host contact — all from real Supabase data. The work proceeds in natural layers: database schema and security, API routes, frontend integration, and finally F&B cross-vertical connections.

## Phases

<details>
<summary>✅ v1.0 QA Multi-Vertical PWAs (Phases 1-3) - SHIPPED 2026-01-29</summary>

### Phase 1: TypeScript Verification

**Goal**: All 8 vertical PWAs compile without TypeScript errors
**Status**: Complete (2026-01-29)

### Phase 2: UI/UX Audit

**Goal**: Consistent navigation, branding, and BottomNav across all verticals
**Status**: Complete (2026-01-29)

### Phase 3: Build & Navigation Verification

**Goal**: All 7 new verticals build successfully and have zero broken navigation links
**Status**: Complete (2026-01-29)

</details>

## 🚧 v1.1 In-Stay MVP Backend (In Progress)

**Milestone Goal:** Connect Accommodations In-Stay Dashboard to Supabase, enabling guests to access real stay data via booking code verification.

### Phase 4: Database Foundation

**Goal**: Accommodations database schema with properties, rooms, bookings, services, partnerships, RLS policies, and demo seed data

**Depends on**: Phase 3 (v1.0 complete)

**Requirements**: DB-01, DB-02, DB-03, DB-04, DB-05, DB-06, DB-07, DB-08

**Success Criteria** (what must be TRUE):

1. Properties table exists with name, slug, WiFi credentials, contact info, and images
2. Rooms table exists with room numbers linked to properties
3. Bookings table exists with guest info, check-in/out dates, booking codes (BK-XXXXXX format), and room assignments
4. Services table exists with categories (breakfast, minibar, laundry, room service) and service items with prices
5. Local partnerships are linked to properties via existing conventions system (migration 050)
6. RLS policies enforce guest read-only access via booking code and owner full CRUD
7. One demo property exists with rooms, active bookings, services, and partnership deals
8. All tables follow GUDBRO database standards (TEXT + CHECK constraints, English column names, translations via separate tables)

**Plans:** 2 plans

Plans:

- [x] 04-01-PLAN.md — Complete schema: 6 tables, 3 functions, triggers, indexes, RLS policies, and grants
- [x] 04-02-PLAN.md — Seed data: demo property "Roots Da Nang" with rooms, bookings, services, partnerships

---

### Phase 5: API Layer

**Goal**: Five API routes serving stay data, verification, services, deals, and property info with error handling and Supabase integration

**Depends on**: Phase 4 (database schema exists)

**Requirements**: API-01, API-02, API-03, API-04, API-05, INT-02

**Success Criteria** (what must be TRUE):

1. GET /api/stay/[code] verifies booking code and returns stay data (property, room, dates, WiFi)
2. POST /api/stay/verify validates guest identity (last name + booking code) and returns session token
3. GET /api/stay/[code]/services returns available services with items and prices for the property
4. GET /api/stay/[code]/deals returns local partnership deals with discounts and booking actions
5. GET /api/stay/[code]/property returns property info (contact, house rules, checkout time)
6. All routes include proper error handling (invalid codes, expired bookings, server errors)

**Plans:** 2 plans

Plans:

- [x] 05-01-PLAN.md — Supabase client, JWT auth, types, public booking lookup, and guest verification routes
- [x] 05-02-PLAN.md — Protected routes: services, deals, and property info (JWT required)

---

### Phase 6: In-Stay Dashboard

**Goal**: Accommodations frontend displays real data from API routes instead of mock data

**Depends on**: Phase 5 (API routes exist)

**Requirements**: STAY-01, STAY-02, STAY-03, STAY-04, STAY-05, STAY-06, STAY-07, STAY-08, INT-03, INT-04

**Success Criteria** (what must be TRUE):

1. Booking verification screen accepts last name + booking code and grants dashboard access
2. WiFi card displays network name and password from real property data with copy-to-clipboard functionality
3. Stay summary card shows dates, room number, guest count, and checkout countdown from real booking data
4. Services menu displays categories and items with prices from API (view-only, no ordering)
5. Local deals section shows partner offers from conventions system with contact/booking actions
6. Contact host opens WhatsApp with pre-filled message using real property contact number
7. Checkout info shows time and procedure from property data
8. All mock data has been replaced with API calls to Phase 5 routes
9. Loading states are handled gracefully (no flash of wrong content)
10. Multi-language support works for service names and descriptions (English minimum)

**Plans:** 4 plans

Plans:

- [x] 06-01-PLAN.md — Backend extensions: migration for quick_actions/return_banner/guest_country, useful-numbers API route, lookup bug fix
- [x] 06-02-PLAN.md — Frontend foundation: session hook, typed API wrappers, verification landing page
- [x] 06-03-PLAN.md — Dashboard split + core sections: WiFi, welcome, quick actions, checkout, contact, visa, return banner
- [x] 06-04-PLAN.md — Data-fetching sections: services carousel, local deals, useful numbers + final build verification

---

### Phase 7: F&B Integration

**Goal**: Properties with linked F&B verticals deep-link to coffeeshop PWA; properties without F&B show simple in-stay menu

**Depends on**: Phase 6 (dashboard displays real data)

**Requirements**: FNB-01, FNB-02, FNB-03, INT-01

**Success Criteria** (what must be TRUE):

1. Property configuration includes has_linked_fnb flag and linked_fnb_slug field
2. When has_linked_fnb is true, "Restaurant" or "Breakfast" service card deep-links to coffeeshop PWA with property context
3. When has_linked_fnb is false, services show simple static menu (view-only items and prices)
4. Conventions system (migration 050) is connected to properties via property_id as convention source
5. Deep-link to coffeeshop PWA works correctly (opens PWA with merchant context)

**Plans:** 2 plans

Plans:

- [ ] 07-01-PLAN.md — Backend: migration for F&B linking columns, property API extension, type updates
- [ ] 07-02-PLAN.md — Frontend: RestaurantSection component (deep-link or static menu) + dashboard wiring

---

## Progress

**Execution Order:**
Phases execute in numeric order: 4 → 5 → 6 → 7

| Phase                      | Milestone | Plans Complete | Status      | Completed  |
| -------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. TypeScript Verification | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 2. UI/UX Audit             | v1.0      | 3/3            | Complete    | 2026-01-29 |
| 3. Build & Navigation      | v1.0      | 1/1            | Complete    | 2026-01-29 |
| 4. Database Foundation     | v1.1      | 2/2            | Complete    | 2026-01-29 |
| 5. API Layer               | v1.1      | 2/2            | Complete    | 2026-01-29 |
| 6. In-Stay Dashboard       | v1.1      | 4/4            | Complete    | 2026-01-29 |
| 7. F&B Integration         | v1.1      | 0/2            | Not started | -          |

---

_Last updated: 2026-01-30 (phase 7 planned)_
