# Session Log - GUDBRO Verticals

> Diario di bordo delle sessioni di sviluppo.
> Nuove entry in cima (ordine cronologico inverso).

---

## 2026-01-18 (Session 12) - Backlog Remediation

**Focus:** Fix backlog inconsistency from scaling audit session
**Durata:** ~30min
**Tipo:** Documentation / Process Fix

### Completato

**Problem Identified:**

- Session 11 (scaling audit) created 3 major roadmap docs but NEVER committed them
- Files were untracked in git (5310 lines of documentation missing from repo)
- Backlog not synchronized with roadmaps
- Session log entry missing
- Root cause: Task too large without checkpoints (anti-pattern from CLAUDE.md 3.5)

**Remediation:**

- Committed 3 roadmap files: SCALE-ROADMAP.md, SECURITY-ROADMAP.md, TESTING-STRATEGY.md
- Updated 4-DONE.md with 12 Phase 1 completed tasks
- Updated 1-TODO.md with Phase 2 and Phase 3 tasks
- Updated 2-IN-PROGRESS.md to reflect current state
- Added missing session log entry for scaling audit (Session 11)
- Added lesson learned to CLAUDE.md compounding section

### Commits

- `b94e613` - docs: add scaling, security, and testing roadmaps
- (current session) - docs: backlog sync after scaling audit

### Lesson Learned

**Anti-pattern:** Task too large (scaling audit ~3h) without incremental commits
**Fix:** Commit every ~30min or after completing a major deliverable
**Added to:** CLAUDE.md Section 3.5 "Compounding Engineering"

### Prossima sessione

- Continue with SmartMap + AI Co-Manager testing (Step 5-6)
- Or start Phase 2 scaling tasks

---

## 2026-01-17 (Session 11) - Scaling Audit + Infrastructure Roadmaps

**Focus:** Comprehensive audit for scaling from 100 to 10M users
**Durata:** ~3h
**Tipo:** Architecture / Planning / Implementation

### Completato

**Audit Findings - 10 Critical Problems:**

1. Zero caching (no Redis) - CRITICAL
2. N+1 queries everywhere - HIGH
3. Synchronous notifications - HIGH
4. No rate limiting - CRITICAL
5. ~32% test coverage - MEDIUM
6. No background job system - HIGH
7. Polling instead of WebSocket - MEDIUM
8. Missing database indexes - HIGH
9. No CDN - MEDIUM
10. No observability (console.log) - HIGH

**Documents Created:**

- `docs/SCALE-ROADMAP.md` (~1800 lines) - 5-phase plan from 100 to 10M users
- `docs/SECURITY-ROADMAP.md` (~1100 lines) - 4-phase security hardening
- `docs/TESTING-STRATEGY.md` (~1400 lines) - Test coverage from 1.5% to 80%

**Phase 1 Implementation (COMPLETED):**

- Upstash Redis caching layer (`lib/cache/redis.ts`, `lib/cache/keys.ts`)
- Rate limiting with @upstash/ratelimit (`lib/security/rate-limiter.ts`)
- Database indexes (migration 057)
- CDN headers in next.config.js
- Sentry integration for error tracking
- Pino structured logging (`lib/observability/logger.ts`)
- Notification queue table (migration 058)
- Zod validation schemas (`lib/validation/`)
- N+1 query fixes (5 services optimized)

### Commits

- `b94e613` - docs: add scaling, security, and testing roadmaps (committed Session 12)

### Decisioni

- **Caching:** Upstash Redis (serverless, Vercel-native, pay-per-request)
- **Background Jobs:** Trigger.dev for Phase 2 (better Supabase integration)
- **Observability:** Sentry + Pino (cost-effective for early stage)
- **Rate Limiting:** Sliding window algorithm, different limits per endpoint type

### Note tecniche

- Menu data highest priority for caching (5 min TTL)
- Rate limits: API 100/min, Auth 10/min, AI 20/min
- Partitioning for analytics_events in Phase 2 (by month)
- Read replicas require Supabase Pro plan

### Issue

- ⚠️ Session ended without committing docs or updating backlog
- ⚠️ Fixed in Session 12

---

## 2026-01-17 (Session 10) - SmartMap UI + Tourist Tracking + Places API

**Focus:** SmartMap UI, Tourist accommodation tracking, Google Places API integration
**Durata:** ~2h
**Tipo:** Feature / UX / Database

### Completato

**SmartMap UI Redesign:**

- Compact filter bar with chip-style toggles (replaced large blocks)
- Modern cluster markers with count badges and gradient styling
- Pulse animations for clusters
- CartoDB Positron tiles for cleaner map appearance
- Fixed z-index issue (dropdowns appearing behind map)
- Consistent distance formatting: <1km shows meters, >=1km shows km

**Database - Tourist Tracking Fields:**

- `home_country` / `nationality` - where tourists come from
- `accommodation_type` - hotel, rental, hostel, friend, resident, other
- `hotel_name`, `hotel_place_id`, `hotel_address`, `hotel_lat/lng` - for delivery
- `room_number` - hotel room for delivery
- `arrival_date` / `departure_date` - tourist dates
- `lifecycle_status` - active, departed, returning
- `accommodation_partner_id` - link to partner hotels

**Data Updates:**

- Fixed ROOTS location to correct coordinates (16.048672, 108.247856)
- Moved customers out of sea (lng > 108.252)
- Updated 21 tourists with realistic nationalities (JP, KR, CN, US, AU, DE, FR, GB)
- 12 tourists in hotels with room numbers
- 6 tourists in rentals, 3 in hostels

**Google Places API (HOTEL-AUTOCOMPLETE):**

- `lib/google-places.ts` - Client API for autocomplete + details
- `app/api/places/autocomplete/route.ts` - Proxy endpoint (hides API key)
- `app/api/places/details/route.ts` - Proxy for place details
- `components/onboarding/PlaceSearch.tsx` - React component with:
  - `<HotelSearch />` for hotels/hostels (type=lodging)
  - `<AddressSearch />` for any address
  - Debounced search, loading states, location bias

**Spec updated:**

- `docs/backlog/specs/P1/HOTEL-AUTOCOMPLETE.md` - Due modalità (lodging + address)

### Commits

- `a519435` - fix(map): z-index for filter dropdowns
- `bd64283` - feat(map): tourist origin tracking + distance formatting
- `dab6e8c` - feat(accounts): tourist accommodation tracking
- `c4a0444` - docs: HOTEL-AUTOCOMPLETE spec update
- `76777eb` - feat(places): Google Places API integration

### Decisioni

- **Tourist delivery**: Hotel guests need hotel_name + room_number, rentals use regular address
- **Lifecycle tracking**: After departure_date, tourists become "departed" but records kept for analytics
- **Partner linking**: accommodation_partner_id links to partner hotels for special offers
- **Places search modes**: Lodging filter for hotels, address autocomplete for rentals/friends

### Note tecniche

- Leaflet z-index is 400-1000, so dropdowns need z-[1000+]
- `formatDistance()` helper: <1000m shows meters, >=1000m shows km
- Google Places API: `includedPrimaryTypes: ['lodging']` for hotels only
- Requires `GOOGLE_PLACES_API_KEY` in .env.local

### Prossima sessione

- Implement HOTEL-AUTOCOMPLETE feature (Google Places API)
- Or choose another task from backlog

---

## 2026-01-16 (Session 9) - SmartMap Test Data & AI Bootstrap

**Focus:** Create test data for SmartMap + fix merchant-location relationship
**Durata:** ~1.5h
**Tipo:** Testing / Bug Fix

### Completato

**Test Data Created (via Supabase MCP):**

- 35 fake customers around ROOTS My Khe (21 tourists, 14 residents)
- Distribution: 14 active, 11 at-risk, 10 churned
- Tiers: 12 bronze, 11 silver, 9 gold, 3 platinum
- 6 competitors within 1km radius
- 4 hotel partners (Fusion Suites, Melia, Hostel, Boutique)
- Partnership records with different statuses
- Zone analysis for My Khe beach/tourist area
- AI bootstrap results with menu/marketing suggestions

**Bug Fixes:**

- `getMerchantCenter()`: Fixed to use merchant→brand→location relationship
- Map page: Updated demo merchant ID to ROOTS Cafe

**Lesson Learned:**

- `mcp__supabase__list_tables` on large schemas causes context overflow
- Solution: Use `information_schema.columns` queries for specific tables

### Commits

- `f7def50` - fix(map): correct merchant-location relationship and add test data

### Note tecniche

- Temporarily disabled account triggers during bulk insert (welcome_bonus, referral_code)
- Customer status calculated from last order date (30d=active, 90d=at_risk, >90d=churned)
- Vietnamese names for residents, international names for tourists

### Testing URLs

- SmartMap: http://localhost:3023/intelligence/map
- AI Bootstrap: http://localhost:3023/api/ai/bootstrap?merchantId=11111111-1111-1111-1111-111111111111

---

## 2026-01-16 (Session 8) - SmartMap Business Intelligence

**Focus:** Complete SmartMap feature implementation
**Durata:** ~2h
**Tipo:** Major Feature

### Completato

**SmartMap Feature (13 components):**

- `components/map/SmartMap.tsx` - Main wrapper with filters, stats panel
- `components/map/MapContainer.tsx` - Leaflet map with clustering
- `components/map/MapFilters.tsx` - Entity/date/status/radius filters
- `components/map/MapStatsPanel.tsx` - Aggregated statistics
- `components/map/MapLegend.tsx` - Color-coded legend
- `components/map/hooks/useMapData.ts` - Data fetching hook
- `components/map/types.ts` - Shared types (server-safe)
- `components/map/markers/*` - Customer, Competitor, Partner markers
- `components/map/panels/QuickActionPanel.tsx` - Wallet/loyalty quick actions

**API Routes:**

- `/api/intelligence/map` - Map data endpoint (~420 lines)
- `/api/quick-actions` - Wallet top-up, loyalty points (~190 lines)

**Services:**

- `lib/geocoding-service.ts` - Nominatim (OpenStreetMap) geocoding (~360 lines)
- `lib/loyalty-service.ts` - Full loyalty points management (~700 lines)

**Infrastructure:**

- Leaflet + react-leaflet-cluster installed
- Sidebar updated with "Intelligence" link + "new" badge

### Commits

- `74ccf16` - feat(intelligence): add SmartMap business intelligence feature

### Decisioni

- **Server/client separation**: Types in `types.ts` (server-safe), hooks in `hooks/` (client-only)
- **Geocoding**: Nominatim (free, no API key) with 1req/sec rate limiting
- **Markers**: DivIcon colored circles (no external SVG files needed)
- **Clustering**: react-leaflet-cluster for performance with many markers

### Note tecniche

- Fix: API route can't import React hooks - separated types from useMapData hook
- Leaflet icon fix: Delete `_getIconUrl` and merge CDN options
- MapBoundsHandler component for auto-fitting radius circle

### Prossima sessione

- Test SmartMap with real location data
- Add marker SVG icons (optional visual upgrade)
- Export map as image feature

---

## 2026-01-16 (Session 7) - Weather Fix & Cleanup

**Focus:** Fix weather widget + remove demo data
**Durata:** ~1h
**Tipo:** Bug Fixes / Cleanup

### Completato

**Weather Widget Fix:**

- Root cause: weather-service.ts used regular `supabase` client blocked by RLS
- Fix 1: Changed to `supabaseAdmin` for cache table write operations
- Fix 2: Added `Math.round()` for humidity (DB expects INTEGER, API returns float)
- Weather now shows live data from Visual Crossing API for Da Nang

**Demo Data Removal:**

- Removed Demo Enterprise Corp, Demo Brand, Demo Location from database
- Removed from seed file (001-test-data.sql) to prevent recreation
- Location selector now shows only real locations (ROOTS, Scallywags)

**Previous Session Fixes (carried over):**

- Dev accounts auth (getSession + middleware)
- ThemeProvider for marketing pages
- useSearchParams Suspense boundaries (4 pages)

### Commits

- `8c39190` - fix(weather): use admin client for cache operations and round humidity
- `c38f521` - docs(claude): add weather cache RLS lesson
- `0b58800` - chore: remove demo data from database and seeds

### Decisioni

- Server-side services that write to cache tables must use `supabaseAdmin`
- Demo data not needed - real locations sufficient for testing

### Prossima Sessione

- QR Batch Export feature (requires JSZip installation)
- Sprint 13-14 ReservationCalendar UI polish (if needed)

---

## 2026-01-16 (Session 6) - QR Builder V2 Fixes & Sprint 13-14 Verification

**Focus:** QR types fixes + Reservation system verification
**Durata:** ~45min
**Tipo:** Bug Fixes / Verification

### Completato

**QR Builder V2 Fixes:**

- Fixed `generateWiFiString` to properly escape special characters (`;:,\`)
- Fixed `generateWiFiString` to always output `H:true` or `H:false`
- Aligned test expectations with actual types:
  - Pattern: `'square'` → `'squares'`
  - MaterialPreset count: 8 → 11 (added metal, glass, fabric)
- All 87 QR type tests now pass

**Sprint 13-14 Verification:**

- Discovered Sprint 13-14 (Reservations UI) was already fully implemented
- Verified all components exist and work:
  - ReservationCalendar with Day/Week/Month views
  - FloorPlanEditor with drag-drop tables
  - All supporting components (filters, dialogs, cards)
- Updated plan file status to COMPLETE
- No TypeScript errors in reservation components

### Commits

- `c215e3b` - fix(qr): fix generateWiFiString and align tests with types

### Prossima Sessione

- QR Batch Export feature (requires JSZip installation)
- QR Templates (saveable presets)
- Custom landing pages per traffic source

---

## 2026-01-15 (Session 5) - Reservation System Security & Data Fixes

**Focus:** P0 Security + P1 Data Integrity fixes for reservation system
**Durata:** ~1.5h
**Tipo:** Bug Fixes / Security

### Completato

**P0 Security Fixes (Critical):**

- Auth checks added to `/api/reservations` (GET/POST/PATCH)
- Auth checks added to `/api/tables` (GET/POST/PATCH/DELETE)
- Auth checks added to `/api/sections` (GET/POST/PATCH/DELETE)
- Error handling try-catch in FloorPlanEditor
- Fixed section_id data loss in TableDialog (nullish coalescing)
- Added EmptyState UI when no tables/sections exist
- Past date validation in ReservationDialog

**P1 Data Integrity Fixes:**

- Fixed tableId param in floor-plan DELETE (was using 'id')
- Fixed data transform to include section_id, is_reservable, notes
- Added locationId to floor-plan API calls via useTenant hook
- Added dependency array for locationId in fetchData

### Audit Results

5 parallel agents audited the reservation system finding 58 issues total:

| Category       | Issues Found | Critical |
| -------------- | ------------ | -------- |
| UX/Flow        | 12           | 3        |
| Security       | 8            | 4        |
| Integration    | 15           | 5        |
| Business Logic | 11           | 3        |
| Technical Debt | 12           | 2        |

P0 critical issues fixed this session. Remaining issues documented for future sprints.

### Commits

- `88be2e6` - fix(reservations): P0 security + P1 data integrity fixes
- `2c68157` - docs: update session log with P0/P1 fixes summary
- `5902df3` - fix(notifications): support Vercel Cron header for auth
- `77581d1` - fix(security): remove dev mode auth bypass in notification processor

### Sprint 12.5 Verification

Investigated notification pipeline - found it was already fully implemented:

- `sendReservationNotification()` wired in `createReservation()`
- `scheduleReminders()` wired
- Templates seeded in DB
- Vercel Cron configured (`*/5 * * * *` in vercel.json)
- Only fix needed: Vercel Cron auth header support (`x-vercel-cron: 1`)

### Security Hardening

- Removed dev mode auth bypass from `/api/notifications/process`
- Wallet API already had proper auth (audit was outdated)
- Remaining: credential encryption, rate limiting

### Note tecniche

- useTenant hook pattern for locationId: `const { location, brand } = useTenant(); const locationId = location?.id || brand?.id;`
- API routes require getSession() check at start of each handler
- Pre-existing TS errors in test files (onboarding-service.test.ts, auto-compute.test.ts) - not related to this work

### Prossima sessione

- P1-3: Add loading skeleton to calendar views (nice-to-have)
- P1-4: Add keyboard shortcuts to FloorPlanEditor (nice-to-have)
- Notification pipeline integration (from audit findings)
- Business logic gaps (overbooking prevention)

---

## 2026-01-15 (Session 4) - WHITE-LABEL-FULL Feature

**Focus:** White-Label Multi-Tier Implementation (Merchant, Catena, Agency)
**Durata:** ~3h
**Tipo:** Major Feature

### Completato

**WHITE-LABEL-FULL (8 Sprint):**

- Sprint 1: Database Migration `052-custom-domains.sql`
  - brands/locations: custom_domain, domain_verified fields
  - partners: logo_url, primary_color, backoffice_domain
  - domain_verifications table (status, SSL, Vercel integration)
  - domain_blacklist table (reserved domains)
  - subscription_plan_limits table (domain quotas per tier)
  - Helper functions: resolve_custom_domain(), is_domain_blacklisted(), can_add_custom_domain()

- Sprint 2: Domain Resolution Service
  - `domain-resolution-service.ts` (~600 lines)
  - `vercel-api.ts` (Vercel domain management)
  - DNS verification (CNAME, TXT via Cloudflare DoH)

- Sprint 3: Middleware Domain Resolution
  - Coffeeshop: Custom domain → brand/location resolution
  - Backoffice: Partner domain → white-label branding
  - Headers: x-tenant-type, x-brand-id, x-location-id, etc.

- Sprint 4: Frontend Branding Integration
  - Extended MerchantLocaleConfig with branding
  - useBrandTheme hook (CSS variables injection)
  - useMerchantBranding hook

- Sprint 5: Domain Management UI
  - `/settings/domain/page.tsx`
  - API routes: POST/DELETE domain, POST verify
  - DNS instructions with copy-to-clipboard
  - Plan upgrade notice

- Sprint 6: Multi-Location Landing Page
  - LocationPicker component (geolocation, nearest)
  - useTenantContext hook
  - `/api/tenant-context` endpoint

- Sprint 7: Partner Portal Foundation
  - `partner-service.ts` (organizations, metrics, billing)
  - `/partner` dashboard page
  - `/partner/organizations` list page

- Sprint 8: Partner White-Label Backoffice
  - PartnerBrandingContext
  - `/api/partner-branding` endpoint
  - BrandingLogo component (conditional)

### File Creati

| File                                      | Descrizione                      |
| ----------------------------------------- | -------------------------------- |
| `052-custom-domains.sql`                  | Migration completa (~400 righe)  |
| `lib/domain-resolution-service.ts`        | Domain resolution + registration |
| `lib/vercel-api.ts`                       | Vercel API wrapper               |
| `lib/partner-service.ts`                  | Partner portal operations        |
| `lib/contexts/PartnerBrandingContext.tsx` | White-label context              |
| `lib/hooks/useBrandTheme.ts`              | CSS variables injection          |
| `lib/hooks/useTenantContext.ts`           | Tenant from middleware           |
| `components/LocationPicker.tsx`           | Multi-location landing           |
| `components/layout/BrandingLogo.tsx`      | Conditional logo                 |
| `settings/domain/page.tsx`                | Domain management UI             |
| `partner/page.tsx`                        | Partner dashboard                |
| `partner/organizations/page.tsx`          | Org list                         |
| `api/settings/domain/*`                   | Domain API routes                |
| `api/partner-branding/route.ts`           | Partner branding API             |
| `api/tenant-context/route.ts`             | Tenant context API               |
| Middleware updates                        | coffeeshop + backoffice          |
| merchant-config.ts                        | Extended with branding           |
| MerchantConfigContext.tsx                 | + branding hook                  |

### Pricing Structure Implementata

| Plan       | Domains   | Monthly |
| ---------- | --------- | ------- |
| Free       | 0         | $0      |
| Starter    | 0         | $29     |
| Pro        | 1         | $79     |
| Business   | 3         | $149    |
| Enterprise | unlimited | custom  |

### Architettura

```
Custom Domain Request
        ↓
    Middleware
        ↓
resolve_custom_domain() RPC
        ↓
Headers: x-tenant-type, x-brand-id...
        ↓
   Frontend (MerchantConfig / PartnerBranding)
        ↓
  CSS Variables + Conditional Logo
```

### Note Tecniche

- Edge Runtime: Middleware usa fetch() diretto a Supabase REST API
- DNS over HTTPS: Cloudflare per CNAME/TXT verification
- Vercel API: v9/v10 per domain management
- Cache: TODO Redis/Upstash per domain resolution

### Prossima Sessione

- Test end-to-end con dominio reale
- Applicare migration a Supabase prod
- Aggiornare 1-TODO.md per marcare WHITE-LABEL come DONE

---

## 2026-01-15 (Session 3) - HOLIDAYS-DB Feature

**Focus:** Centralized Holidays Database for AI Intelligence
**Durata:** ~45min
**Tipo:** New Feature

### Completato

**Holidays Database (HOLIDAYS-DB):**

- Database Migration `051-holidays-database.sql`:
  - `holidays` table (country/region/city, type, impact_level)
  - `merchant_holiday_overrides` (custom impact per merchant)
  - `merchant_custom_holidays` (anniversaries, local events)
  - 11 Vietnamese holidays seeded (Tet, Reunification Day, etc.)
  - RLS policies via account_roles pattern
- Service Layer `holidays-service.ts`:
  - `getUpcomingHolidays()` - by country/region with days ahead
  - `getHolidaysForDate()` - specific date lookup
  - `getMerchantCustomHolidays()` - merchant-specific holidays
  - `createCustomHoliday()` / `deleteCustomHoliday()`
  - `getDateImpact()` - combined impact analysis
  - `getUpcomingHolidaysContext()` - AI context with alerts
  - `searchHolidays()` / `getHolidaysForYear()`
- API Route `/api/ai/holidays`:
  - GET actions: upcoming, date, custom, impact, context, ai-context, search, year
  - POST: create-custom
  - DELETE: by holidayId
- Knowledge Service Integration:
  - `MerchantKnowledge` type extended with `holidays`
  - `fetchMerchantKnowledge()` includes holidays context
  - `formatKnowledgeForAI()` includes holidays section

### File Creati/Modificati

| File                                   | Azione   | Descrizione                         |
| -------------------------------------- | -------- | ----------------------------------- |
| `migrations/051-holidays-database.sql` | Created  | 3 tables + indexes + RLS + seeds    |
| `lib/ai/holidays-service.ts`           | Created  | ~500 righe, full service layer      |
| `app/api/ai/holidays/route.ts`         | Created  | GET/POST/DELETE endpoints           |
| `lib/ai/knowledge-service.ts`          | Modified | +holidays integration               |
| `lib/ai/index.ts`                      | Modified | +holidays-service export            |
| `__tests__/knowledge-service.test.ts`  | Modified | +holidays property in test fixtures |

### Note Tecniche

- Supabase query can't do computed columns like `(date - CURRENT_DATE) as days_until`
- daysUntil calculated in TypeScript after query
- RLS uses `account_roles.tenant_id` pattern (not merchant_id)
- Impact levels: critical, high, medium, low, none
- Holiday types: national, religious, local, regional, sporting, cultural, observance, school, bank

### Prossimi Passi

- UI per gestire custom holidays (merchant_custom_holidays)
- API per bulk import holidays da external sources (Calendarific, etc.)
- Calendar view in backoffice

---

## 2026-01-15 (Session 2) - MT-KDS Kitchen Display Enhancement

**Focus:** Kitchen Display System enhancements (from MenuTiger Audit)
**Durata:** ~30min
**Tipo:** Feature Enhancement

### Completato

**Kitchen Display System (MT-KDS):**

- Audio alerts per nuovi ordini (Web Audio API)
  - Chime sound con due toni (A5 + C#6)
  - Triggered automaticamente su realtime subscription
- Keyboard shortcuts "bump bar" style:
  - `1-9` per Queue → Preparing
  - `Q,W,E,R,T` per Preparing → Ready
  - `A,S,D,F,G` per Ready → Picked Up
  - `M` toggle suono on/off
  - `L` toggle layout grid/columns
  - `F` fullscreen
- Flash animation per nuovi ordini (ring-4 ring-yellow-400 animate-pulse)
- Sound toggle button in header (🔊/🔇)
- 2 layout modes:
  - Grid: layout originale responsive
  - Columns: 3 colonne fisse (Queue | Preparing | Ready)
- Keyboard shortcut hints su ogni order card (kbd tags)
- Settings panel espandibile con legenda shortcuts

### File Modificati

| File                                      | Modifiche                             |
| ----------------------------------------- | ------------------------------------- |
| `app/(dashboard)/orders/kitchen/page.tsx` | +200 righe, audio, shortcuts, layouts |

### Note Tecniche

- Web Audio API per suoni (no file mp3 necessari)
- AudioContext inizializzato al primo click/keydown (policy browser)
- Keyboard shortcut effect senza dependency array (re-runs ogni render per latest state)
- Column layout mostra keyboard hints integrati nelle card
- Flash animation usa Tailwind animate-pulse + ring

### Prossimi Passi

- Test con ordini reali
- Eventualmente: multi-station support (cucina/bar separati)
- Eventualmente: print ticket integration

---

## 2026-01-15 - B2B-CONVENTIONS + ORDER-READY-NOTIFICATIONS

**Focus:** B2B Corporate Conventions System + Web Push Notifications
**Durata:** ~3h
**Tipo:** Feature Implementation

### Completato

**B2B-CONVENTIONS (tutti 6 sprint):**

- Sprint 1: Database Migration (5 tabelle + RLS + triggers)
- Sprint 2: Service Layer (conventions-service.ts ~700 righe)
- Sprint 3: API Routes (/api/ai/conventions - GET/POST/PATCH)
- Sprint 4: UI Hub + Offices pages
- Sprint 5: UI Conventions + Vouchers pages
- Sprint 6: Staff Verification tool

**KB-BACKOFFICE Update:**

- Aggiunte 5 pagine Conventions alla Knowledge Base
- Totale pagine KB: 57 (52 + 5 nuove)

**ORDER-READY-NOTIFICATIONS Phase 2 (Web Push):**

- Service Worker push event handler
- Push subscription hook (usePushNotifications)
- API endpoint per salvare subscriptions
- Backend push sender con web-push library
- Kitchen display trigger automatico
- UI toggle per Push ON/OFF nella pagina ordini
- VAPID keys setup

### File Creati

| File                                          | Descrizione                    |
| --------------------------------------------- | ------------------------------ |
| `migrations/050-b2b-conventions.sql`          | 5 tabelle, triggers, RLS       |
| `lib/ai/conventions-service.ts`               | Service layer completo         |
| `app/api/ai/conventions/route.ts`             | API endpoints                  |
| `/partnerships/conventions/page.tsx`          | Hub dashboard                  |
| `/partnerships/conventions/offices/page.tsx`  | Office partners + AI Discovery |
| `/partnerships/conventions/active/page.tsx`   | Active conventions             |
| `/partnerships/conventions/vouchers/page.tsx` | Voucher management             |
| `/partnerships/conventions/verify/page.tsx`   | Staff verification tool        |
| `lib/kb/kb-content.ts`                        | +5 pagine conventions          |
| `hooks/usePushNotifications.ts`               | Push subscription hook         |
| `app/api/push-subscription/route.ts`          | Save/delete subscriptions      |
| `app/api/send-push/route.ts` (coffeeshop)     | Send push (client-side)        |
| `app/api/send-push/route.ts` (backoffice)     | Send push from kitchen         |
| `public/service-worker.js`                    | Push event handler             |

### Tabelle Database Create

- `office_partners` - Registro uffici/aziende partner
- `merchant_office_outreach` - Pipeline CRM per outreach
- `partner_conventions` - Convenzioni attive con benefici
- `convention_vouchers` - Voucher individuali con QR
- `convention_redemptions` - Tracking utilizzo voucher

### Commit

- `6d77eca` - feat(conventions): add B2B corporate conventions system
- (pending) - feat(notifications): add web push notifications Phase 2

### Decisioni

- **RLS pattern**: Usa `account_roles.tenant_id WHERE role_type = 'merchant'` (come TOURISM-B2B)
- **Daily codes**: Formato `COMPANY-MMDD` (es. TECHCORP-0115)
- **Verification methods**: link, qr_scan, daily_code, badge_id
- **VAPID**: Keys generate con web-push CLI, salvate in .env.local
- **Push trigger**: Kitchen display chiama API quando status → 'ready'

### Prossima Sessione

- Commit e push ORDER-READY-NOTIFICATIONS
- Eventuale altro task da backlog P1/P2

---

## 2026-01-14/15 - AI-First Redesign Sprint 1

**Focus:** Completamento P0.5 Strategy + AI-FIRST-REDESIGN Sprint 1
**Durata:** ~3h (sessione lunga con continuation)
**Tipo:** Implementation

### Completato

**P0.5 Strategy:**

- ORDER-READY-NOTIFICATIONS Phase 1 (audio beep, Web Audio API) → 🟡 PARTIAL
- AI-ONBOARDING completo (chat conversazionale con GPT-4o-mini) → ✅ DONE

**AI-FIRST-REDESIGN Sprint 1:**

- Verificato componenti esistenti (AIPriorityCard, AIPrioritiesHero, OpportunityBanner)
- Aggiunto Food Cost triggers a AIPrioritiesHero (alert >35%, critical >45%)
- Aggiunto OpportunityBannerWrapper a dashboard
- AIStatusHeader già presente in Header.tsx (pulsante AI con notifiche)

### File Creati/Modificati

| File                                                 | Azione                          |
| ---------------------------------------------------- | ------------------------------- |
| `apps/website/lib/ai/openai.ts`                      | Creato - OpenAI client          |
| `apps/website/lib/ai/onboarding-chat-service.ts`     | Creato - Chat service           |
| `apps/website/app/api/ai/onboarding-chat/route.ts`   | Creato - API endpoint           |
| `apps/website/components/onboarding/ChatWidget.tsx`  | Creato - Chat UI                |
| `apps/website/app/onboarding/page.tsx`               | Creato - Pagina onboarding AI   |
| `apps/backoffice/components/ai/AIPrioritiesHero.tsx` | Modificato - Food Cost triggers |
| `apps/backoffice/app/(dashboard)/dashboard/page.tsx` | Modificato - OpportunityBanner  |

### Decisioni

- **Food Cost threshold 35%**: Alert warning, >45% diventa critical
- **Fetch parallelo**: Weather + Food Cost in Promise.all per performance
- **AIStatusHeader**: Il pulsante AI esistente con notifiche è sufficiente per Sprint 1

### Prossima Sessione

- Sprint 2: AI Triggers v2 inline (template 5 domande obbligatorie)
- Oppure altro task da backlog

---

## 2026-01-10 - Sessione Strategica: Modelli di Servizio

**Focus:** Discussione strategica su modelli di servizio locali e impatto su prodotto
**Durata:** ~2h
**Tipo:** Product strategy / Discovery

### Completato

- Mappatura 5 modelli di servizio (Table Service, Counter+Delivery, Counter+Pickup, Counter+Menu Illuminato, QR Ordering)
- Definizione tier "Menu Only" per merchant che non vogliono cambiare flusso
- Concept AI Conversational Onboarding (chat-based onboarding che diventa co-manager)
- Sistema notifiche "Ordine Pronto" (sostituzione buzzer hardware)
- Percorso upgrade cliente: Menu Only → Table Ordering → Notifiche
- Aggiunto backlog items in `docs/backlog/1-TODO.md` sezione P0.5

### Decisioni

- **Modello di servizio come prima domanda onboarding**: determina feature mostrate e pain point rilevanti
- **Menu Only come entry tier**: mercato più ampio, conversione più facile, upsell futuro
- **WhatsApp/Zalo/LINE per notifiche in Asia**: tutti li hanno aperti, zero costo
- **AI onboarding = demo live del prodotto**: il prospect sperimenta prima di pagare

### Lezioni Apprese (Cosa Claude ha imparato)

| Lezione                                     | Insight                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Regional market awareness**               | Asia ha piattaforme diverse (Zalo, LINE, KakaoTalk, WeChat). Non assumere default occidentali.        |
| **Modelli di servizio ≠ one-size-fits-all** | Ogni tipo di locale ha bisogno di feature diverse. L'onboarding deve capirlo subito.                  |
| **QR ha valore indipendente dall'ordering** | Anche senza ordering digitale, QR menu offre: accessibilità, discovery, pre-decisione.                |
| **Resistenza psicologica = costi nascosti** | Cliente che deve rialzarsi per ordinare di nuovo → meno secondi ordini. Frizione invisibile ma reale. |
| **Entry tier → upgrade path**               | Menu Only non è un tier "povero", è un piede nella porta per upsell futuro.                           |
| **AI onboarding = demo + configurazione**   | L'AI che fa onboarding È il prodotto. Il prospect lo prova prima di pagare.                           |
| **Sostituire hardware con software**        | Buzzer → notifiche telefono. Meno costi, meno manutenzione per merchant.                              |
| **UX Settings: tabs > sidebar submenu**     | Meno click, tutto vicino, meno movimento mouse. Pattern da applicare ovunque.                         |

### Argomenti di Vendita Scoperti

| Target                    | Argomento                                                          |
| ------------------------- | ------------------------------------------------------------------ |
| Counter + Menu Illuminato | "I tuoi clienti scoprono di più, ordinano di più, code più veloci" |
| Chi ha buzzer hardware    | "Elimina batterie e dispositivi persi. Il telefono è il buzzer"    |
| Chi non vuole cambiare    | "Non cambi nulla. Solo un QR sul tavolo. Risultati subito"         |

### Note

- Sessione più strategica che tecnica - focus su product thinking
- L'utente ha fatto una passeggiata per "schiarirsi la mente" e ha avuto insight importanti
- Discussione emergente, non pianificata - valore alto

### Prossima sessione

- Review backoffice changes (tabbed settings, social page)
- Eventuale implementazione delle feature discusse

---

## 2026-01-09

**Focus:** Vercel deployment fixes
**Durata:** ~2h (sessione continuata)

### Completato

- Fix website build su Vercel (mancava vercel.json per pnpm monorepo)
- Fix login backoffice su Vercel (aggiunto ENABLE_DEV_AUTH env var)
- Fix DevRoleSwitcher non visibile su Vercel (ora controlla cookie invece di NODE_ENV)
- Aggiornato docs/backlog/4-DONE.md con task completate
- Aggiunte 3 lezioni a Compounding Engineering

### Commits

- `d5b7b77` - fix(DevRoleSwitcher): show when dev session cookie exists
- `f5663a4` - feat(auth): allow dev mode via ENABLE_DEV_AUTH env var
- `b699956` - fix(website): add vercel.json for pnpm monorepo support

### Decisioni

- DevRoleSwitcher usa cookie `gudbro_dev_session` per rilevare dev mode (non NODE_ENV)
- ENABLE_DEV_AUTH=true settato su Vercel backoffice per staging/demo
- Creato SESSION-LOG.md come alternativa a Pieces MCP (non funzionante)

### Note tecniche

- Pattern per client components che devono sapere se dev mode: controllare cookie, non env vars
- Vercel monorepo: ogni app deve avere vercel.json con installCommand e buildCommand

### Prossima sessione

- Verificare che DevRoleSwitcher appaia su Vercel dopo deploy
- Continuare con task da backlog

---

## 2026-01-09 (mattina)

**Focus:** QR Builder v2 + UI improvements
**Durata:** ~4h

### Completato

- QR Builder v2 completo (313 test, 4-step wizard, export PNG/SVG/PDF)
- Sidebar collapsible con pin/unpin e hover expand
- Account page con profilo, ruoli, loyalty points
- DevRoleSwitcher per testing ruoli in development

### Commits

- `a79f2d5` - feat: QR Builder v2 + Sidebar improvements + Account page

### Decisioni

- QR usa merchant subdomain (qr.pizzeria.gudbro.com)
- Export con preset per materiali stampa (paper, tshirt, sticker, etc.)
- Sidebar state persistito in localStorage

### Files principali

- `apps/backoffice/components/qr/*` - QR Builder components
- `apps/backoffice/lib/qr/*` - QR service layer
- `apps/backoffice/components/layout/Sidebar.tsx` - New sidebar
- `apps/backoffice/app/(dashboard)/account/page.tsx` - Account page

---

## Template Entry

```markdown
## YYYY-MM-DD

**Focus:** [Cosa si e' lavorato]
**Durata:** ~Xh

### Completato

- [Task 1]
- [Task 2]

### Commits

- `hash` - message

### Decisioni

- [Decisione]: [Motivazione]

### Note tecniche

- [Pattern, soluzione, lesson learned]

### Prossima sessione

- [Cosa fare dopo]
```
