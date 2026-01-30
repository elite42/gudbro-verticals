# GUDBRO Verticals

## What This Is

GUDBRO is a multi-vertical platform providing standalone PWAs for hospitality businesses (F&B, accommodations, gym, wellness, laundry, pharmacy, workshops, tours). Each merchant gets their own branded PWA with QR/link access. The platform includes a backoffice admin dashboard, AI Co-Manager, and a convention system linking merchants together. The Accommodations vertical now has a fully functional In-Stay Dashboard connected to Supabase, where guests scan a QR code to access WiFi, stay info, services, local deals, and host contact from real data.

## Core Value

Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.

## Requirements

### Validated

- PWA frontends created for 8 verticals (coffeeshop, accommodations, tours, gym, wellness, laundry, pharmacy, workshops)
- BottomNav pattern unified (flat center, no elevated buttons)
- Design systems defined per vertical (unique colors, fonts, identity)
- Multi-vertical strategy documented (PWA standalone, not hub)
- Backoffice with 52 pages, ~17,700 LOC
- AI Co-Manager with 15 services
- 2,418 tests passing (2,383 unit + 35 E2E)
- Scaling infrastructure Phase 1-3 complete
- Security hardening Phase 1 complete
- All vertical PWAs compile without TypeScript errors -- v1.0
- BottomNav brand colors unified via CSS variables across all 8 verticals -- v1.0
- Complete vertical separation (no cross-vertical routes) -- v1.0
- All 7 new vertical PWAs build successfully (next build) -- v1.0
- All navigation links validated (zero broken links) -- v1.0
- Accommodations database schema: properties, rooms, bookings, services, partnerships with RLS -- v1.1
- 6 JWT-protected API routes for In-Stay data (lookup, verify, services, deals, property, useful-numbers) -- v1.1
- In-Stay Dashboard with booking verification, WiFi card, stay summary, services, deals, contact, checkout -- v1.1
- F&B cross-vertical deep-linking (has_linked_fnb + linked_fnb_slug pattern) -- v1.1
- Schema-API alignment with migration 081 (9 renames, 7 new columns, house_rules JSONB) -- v1.1

### Active

No active milestone. Next: v1.2 Booking & Owner Dashboard (planned).

### Out of Scope

- New vertical creation -- all 8 frontends exist
- Booking Mode (property page, booking flow) -- deferred to v1.2
- Owner Dashboard (property management UI) -- deferred to v1.2
- Service Ordering (guest submits requests) -- deferred to v1.2
- Visa Tracker -- deferred to later milestone
- Digital Laundry Form -- deferred to later milestone
- Online payments -- cash/transfer only for MVP
- GUDBRO Network integration -- future
- Review system -- future
- Calendar sync -- future

## Context

- 8 vertical PWAs, all QA-verified (v1.0)
- Accommodations vertical has real backend: 6 DB tables, 6 API routes, JWT auth, In-Stay Dashboard (v1.1)
- Coffeeshop is most mature (v1+v2 coexistence, production data)
- All new verticals share DM Sans body font and CSS variable theming
- 4 BottomNav patterns documented: Coffeeshop v2 (advanced), Tours (bento), Template (6 verticals), Accommodations (tab-based)
- @shared/payment workspace package established as pattern for shared modules
- Icons: mix of Phosphor (coffeeshop) and custom SVG (other verticals)
- Migration chain: 077 (schema) → 078 (seed) → 079 (phase6 ext) → 080 (fnb) → 081 (alignment)
- 7 tech debt items carried from v1.0 (see MILESTONES.md)

## Constraints

- **Tech stack**: Next.js 14.2.33, Tailwind, Phosphor Icons preferred
- **Mock data**: All verticals except Accommodations use inline mock data, no DB connection yet
- **Port allocation**: Each vertical has assigned port (3003-3033)
- **Database conventions**: TEXT + CHECK (no ENUM), English column names, accom\_ namespace prefix

## Key Decisions

| Decision                          | Rationale                                                        | Outcome    |
| --------------------------------- | ---------------------------------------------------------------- | ---------- |
| PWA standalone (not hub)          | Not competing with Google/Yelp on discovery                      | -- Pending |
| Accommodation as strategic node   | First tourist touchpoint, distributes to other verticals         | Good       |
| Flat BottomNav pattern            | Uniform look across all verticals                                | Good       |
| DM Sans as shared body font       | Consistency across verticals while allowing unique display fonts | -- Pending |
| Type predicates for filtering     | TypeScript trusts them for narrowing, unlike type assertions     | Good       |
| CSS variables for brand colors    | Enables consistent theming and easy customization                | Good       |
| Complete vertical separation      | Each PWA is standalone, zero cross-vertical contamination        | Good       |
| @shared/payment workspace pkg     | Proper module resolution for shared TypeScript modules           | Good       |
| Selective tsconfig includes       | Prevent type pollution from unused shared modules                | Good       |
| SECURITY DEFINER for guest access | Safer than RLS on bookings; function-based access control        | Good       |
| BK-XXXXXX booking codes           | Excluding 0/O/1/I/L for readability                              | Good       |
| INTEGER price (minor currency)    | Avoids floating point issues with money                          | Good       |
| accom\_ table prefix              | Clear namespace separation for accommodations domain             | Good       |
| JWT with checkout+24h expiry      | Guest tokens auto-expire shortly after checkout                  | Good       |
| Slug-based F&B deep-linking       | Decouples accommodations from coffeeshop schema                  | Good       |
| Dashboard shell pattern           | 128-line shell composing 11 sections; easy to extend             | Good       |

---

_Last updated: 2026-01-30 after v1.1 milestone completion_
