# GUDBRO Verticals - Claude Code Context

**Repository:** gudbro-verticals
**Purpose:** Standalone vertical business applications
**Status:** Production (3 apps deployed on Vercel)
**Last Updated:** 2025-12-06

---

## Quick Context

This monorepo contains **standalone vertical business apps** - complete applications for specific industries that can be white-labeled and deployed independently.

**Deployed Applications:**
| App | URL | Status |
|-----|-----|--------|
| Coffeeshop PWA | https://gudbro-coffeeshop-pwa.vercel.app | LIVE |
| Website | https://gudbro-website.vercel.app | LIVE |
| Backoffice | https://gudbro-backoffice.vercel.app | LIVE |

**Relationship to other repos:**
- `gudbro-verticals` → This repo - vertical business apps
- `gudbro-qr-core` → QR Platform services (separate deployment)
- `qr-platform-complete` → ARCHIVED - Do not use

---

## Repository Structure

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/
│   │   └── frontend/         # Digital Menu PWA (Port 3004)
│   │       ├── app/          # Next.js App Router
│   │       ├── components/   # React components + Design System
│   │       ├── lib/          # Business logic, stores, i18n
│   │       └── CLAUDE.md     # Detailed app context
│   │
│   ├── website/              # Marketing Website
│   │   ├── app/              # Next.js pages
│   │   └── components/       # UI components
│   │
│   ├── backoffice/           # Admin Dashboard
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # Admin UI components
│   │   ├── prisma/           # Database schema
│   │   └── lib/shared/       # Copied shared utilities
│   │
│   ├── wellness/             # Wellness/Spa vertical (planned)
│   │   └── CLAUDE.md
│   │
│   └── rentals/              # Rental business vertical (planned)
│       └── CLAUDE.md
│
├── shared/                   # Shared code (monorepo internal)
│   └── database/
│       ├── safety-filters.ts # 51 allergen/diet filters
│       ├── types.ts          # Shared TypeScript types
│       ├── recipes/
│       │   └── recipes-database.json  # 22 professional barista recipes
│       ├── migrations/       # SQL migrations for Supabase
│       └── utils/
│           └── auto-compute.ts
│
├── package.json              # Root package.json
└── CLAUDE.md                 # This file
```

---

## Deployed Apps

### 1. Coffeeshop PWA
**URL:** https://gudbro-coffeeshop-pwa.vercel.app
**Purpose:** Digital menu for restaurants/cafes
**Tech:** Next.js 14 + React 18 + Tailwind v3
**Features:**
- Multi-language (EN/VI/IT)
- Product customization (size, sugar, ice, milk)
- Shopping cart with localStorage persistence
- Order submission to Supabase
- Sistema 51 Filtri (allergens/diets)
- AI Chat assistant
- Design System Hub at `/design-system`

### 2. Website
**URL:** https://gudbro-website.vercel.app
**Purpose:** GUDBRO marketing/landing page
**Tech:** Next.js 14 + React 18 + Tailwind v3

### 3. Backoffice
**URL:** https://gudbro-backoffice.vercel.app
**Purpose:** Admin dashboard for managing restaurants
**Tech:** Next.js 14 + React 18 + Tailwind v3 + Prisma
**Database:** Supabase (PostgreSQL)
**Features:**
- Content management (Menu, Recipes, Ingredients, Categories)
- Recipe management with 22 professional barista recipes
- Order management with kitchen display
- QR code generation
- Multi-language translations
- Analytics dashboard
- Team and billing management

---

## Tech Stack (All Apps)

After stack standardization (2025-12-01):

```json
{
  "framework": "Next.js 14.2.33",
  "react": "18.3.1",
  "styling": "Tailwind CSS 3.4.1",
  "database": "Supabase (PostgreSQL)",
  "orm": "Prisma 5.22.0 (backoffice only)",
  "deployment": "Vercel"
}
```

**Note:** Original apps used Next.js 16 + React 19 + Tailwind v4 but were downgraded for stability.

---

## Sistema 51 Filtri (Safety Filters)

GUDBRO's proprietary allergen and dietary filter system:

**30 Allergens:**
Gluten, Crustaceans, Eggs, Fish, Peanuts, Soybeans, Milk, Nuts (8 types), Celery, Mustard, Sesame, Sulfites, Lupin, Mollusks, etc.

**10 Intolerances:**
Lactose, Fructose, Histamine, Sorbitol, Caffeine, etc.

**11 Diets:**
Vegan, Vegetarian, Halal, Kosher, Keto, Paleo, etc.

**Location:** `shared/database/safety-filters.ts`

---

## Environment Variables

### Coffeeshop
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### Backoffice
```bash
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

---

## Recent Changes

### 2025-12-06: Backoffice Multi-Tenant Dashboard COMPLETED

**Sprint: Multi-Tenant UI Components**

Created TenantContext for state management (`lib/contexts/TenantContext.tsx`):
- Central React Context for Organization/Brand/Location state
- Provides `useTenant()` hook for all components
- Persists selections to localStorage
- Auto-fetches child entities when parent changes
- Auto-selects first entity when lists load

Created TenantSwitcher component (`components/tenant/TenantSwitcher.tsx`):
- 3-tab dropdown (Organization, Brand, Location)
- Shows current selection with name and type
- Lists all available entities with selection indicator
- Handles empty states with "Create" navigation links
- Clicking entity advances to next level tab

Updated Dashboard Layout (`app/(dashboard)/layout.tsx`):
- Wrapped with TenantProvider at root level
- All dashboard pages now have access to tenant context

Updated Header (`components/layout/Header.tsx`):
- Integrated TenantSwitcher component
- Dynamic preview URL based on brand/location slugs
- Uses `useTenant()` hook for brand and location data

Updated Sidebar (`components/layout/Sidebar.tsx`):
- Displays current brand info in footer
- Shows brand name with primary color avatar
- Shows subscription plan and location city
- Loading skeleton while tenant data loads

Updated Dashboard Page (`app/(dashboard)/dashboard/page.tsx`):
- 3 tenant overview cards (Organization, Brand, Location)
- Shows brand count and location count
- Displays current location details (currency, language, country)
- Dynamic welcome message with brand/location names
- CTA to onboarding if no organization exists

**Files Created:**
- `lib/contexts/TenantContext.tsx`
- `components/tenant/TenantSwitcher.tsx`
- `components/tenant/index.ts`

**Files Modified:**
- `app/(dashboard)/layout.tsx`
- `components/layout/Header.tsx`
- `components/layout/Sidebar.tsx`
- `app/(dashboard)/dashboard/page.tsx`

**Build Status:** VERIFIED

### 2025-12-06: Multi-Tenant Architecture (ADR-003) IMPLEMENTED

**Database Migration (012-multi-tenant-architecture.sql):**
- Created `partners` table - National/regional licensees
- Created `organizations` table - Paying customers (standard/enterprise)
- Created `brands` table - Business identities (logo, colors, business type)
- Created `locations` table - Physical points of sale with locale settings
- Created `enterprise_leads` table - Pre-sales pipeline for enterprise clients
- 12 indexes for performance
- 5 triggers for updated_at auto-update
- RLS policies for all tables
- Helper function `find_partner_for_country()`

**API Endpoints Created:**
- `/api/organizations` - POST, GET, PATCH for organization management
- `/api/brands` - POST, GET, PATCH, DELETE for brand management
- `/api/locations` - POST, GET, PATCH, DELETE for location management
- `/api/partners` - POST, GET, PATCH for partner management
- `/api/enterprise-leads` - POST, GET, PATCH for lead tracking

**Onboarding Flow Updated:**
- 5-step multi-tenant onboarding:
  1. Account Type (Standard/Enterprise)
  2. Organization (name, country)
  3. Brand (business type, name, colors)
  4. Location (address, languages)
  5. Review & Create
- Enterprise clients redirected to sales contact
- Creates Organization → Brand → Location in sequence
- Build verified successfully

**TypeScript Types (lib/supabase.ts):**
- Added Partner, Organization, Brand, Location, EnterpriseLead interfaces
- Added type aliases for all enums
- Added expanded types with relations (OrganizationWithBrands, etc.)

### 2025-12-06: Multi-Locale System Sprint 2 (Onboarding API) COMPLETED

**Sprint 2 - Onboarding API:**
- Created `CountrySelector` component - searchable dropdown with 197 countries, flag emojis, grouped by continent
- Created `LanguageMultiSelect` component - multi-select with 111 languages, RTL support, primary language protection
- Created `/api/countries` - GET endpoint with search, continent filter, supported filter
- Created `/api/languages` - GET endpoint with search, direction filter (ltr/rtl)
- Created `/api/merchants` - POST endpoint for merchant registration with locale data
- Created `lib/supabase.ts` - Supabase client with Country/Language TypeScript types
- Updated onboarding flow at `/onboarding`:
  - Step 2: Country selector auto-populates currency + primary language
  - Step 3: Language multi-select with primary language locked
  - Submit calls POST /api/merchants with full locale data
- Build verified successfully

### 2025-12-05: Multi-Locale System Sprint 1 (Database) COMPLETED

**Sprint 1 - Database Foundation:**
- Executed migrations on Supabase successfully
- Created `languages` table with 70 languages (4 RTL: Arabic, Hebrew, Persian, Urdu)
- Created `countries` table with 43 countries and currency/language defaults
- Created `menu_item_translations` and `category_translations` tables
- Created `exchange_rates` table with 33 currencies (USD base)
- Updated `merchants` table with locale columns (country_code, currency_code, primary_language, enabled_languages)
- Added helper functions: `convert_currency()`, `get_merchant_locale()`
- RLS policies enabled on all new tables

**Migration Files:**
- `007a-languages-only.sql` - Languages (executed first to satisfy FK constraints)
- `STEP2-remaining-migrations.sql` - All remaining tables and columns

### 2025-12-05: Modifiers System & Base Currency Architecture

**Modifiers System (Backoffice):**
- Created complete modifiers system for product customizations
- Database: `modifier_groups`, `modifiers`, `category_modifier_groups` tables
- Migration: `005-modifiers-system.sql` with RLS policies
- UI: `/content/modifiers` page with two-column layout (groups + modifiers)
- Features: Create/edit/delete groups and modifiers, link to categories
- Category page updated to show modifier group assignments

**Optimistic Updates (Backoffice):**
- Implemented optimistic UI pattern for better UX
- Modal closes immediately on save (no waiting for DB response)
- UI updates optimistically, rollback on error
- Applied to: `handleSaveGroup`, `handleSaveModifier`, `toggleGroupActive`, `toggleModifierAvailable`

**Base Currency Architecture (PWA):**
- Each locale now has a `baseCurrency` (the currency prices are stored in)
- Vietnam locales use VND as base currency
- Currency converter now converts FROM base currency TO tourist's selected currency
- VND displays in compact "k" format (65000 → "65k")
- Tourists can select USD/EUR/etc. to see equivalent prices

**Key Files Modified:**
- `coffeeshop.config.ts` - Added `baseCurrency: 'VND'`
- `currency-converter.ts` - Rates relative to VND, `getBaseCurrency()` function
- `currency-preferences.ts` - Default to base currency
- `usePriceFormat.ts` - Format prices based on locale's base currency

**Security Fix:**
- Migration `006-fix-modifier-groups-rls.sql` - Enabled RLS on modifier_groups table

### 2025-12-04: Recipes Database & Backoffice Management

**New Features:**
- Created comprehensive recipes database (`shared/database/recipes/recipes-database.json`)
- 22 professional barista recipes with detailed preparation methods
- Added Recipe and ProductRecipe tables to Supabase
- Implemented recipes management UI in backoffice

**Recipes Include:**
- Espresso-based: Espresso, Americano, Cappuccino, Latte, Flat White, Mocha
- Cold coffee: Cold Brew, Nitro Cold Brew, Iced Latte, Espresso Tonic, Shakerato
- Italian specialties: Marocchino, Bicerin
- Vietnamese: Egg Coffee (Cà Phê Trứng), Cà Phê Sữa Đá
- Matcha, Chai, Smoothies, Milkshakes

**Each Recipe Contains:**
- Multi-language names (EN/IT/VI)
- Ingredients with exact quantities
- Step-by-step method with timings
- Equipment required
- Technical parameters (temperature, pressure, ratios)
- Nutrition info (calories, caffeine)
- Professional barista tips
- Variations and latte art suggestions

**Backoffice Pages:**
- `/content/recipes` - Recipe list with filters (category, temperature, search)
- `/content/recipes/[slug]` - Detailed recipe view with tabs (Method, Ingredients, Tips)

**Database:**
- Created migration `003-recipes-tables.sql`
- Tables: Recipe, ProductRecipe (FK to menu_items)
- RLS policies enabled
- 81 products linked to recipes via `recipeId` field

**Coffeeshop Products Updated:**
- New category structure: hot-coffee, iced-coffee, matcha, tea, smoothie, milkshake
- Added subcategories and temperature field
- Temperature icons (🔥/❄️) for visual differentiation

### 2025-12-03: Supabase Security Fixes

**Problem:** Supabase Security Advisor reported 9 errors + 8 warnings + 11 suggestions.

**Created Migrations:**
- `shared/database/migrations/001-enable-rls-all-tables.sql` - Enables RLS on 9 tables with policies
- `shared/database/migrations/002-fix-function-search-path.sql` - Adds search_path to 8 functions
- `shared/database/migrations/003-review-unused-indexes.sql` - Analysis script (no changes)

**Status: ALL RESOLVED** ✅
- 9 RLS Errors → **0 Errors** (RLS enabled + 18 policies created)
- 8 Function Warnings → **0 Warnings** (search_path added to all functions)
- 11 Index Suggestions → **0 Suggestions** (indexes kept, Supabase cleared them)

**Applied via Supabase SQL Editor on 2025-12-03**

### 2025-12-01: Stack Standardization & Vercel Deployment

**Problem:** Apps used experimental Next.js 16 + React 19 + Tailwind v4 causing build failures.

**Solution:** Downgraded all apps to:
- Next.js 14.2.33
- React 18.3.1
- Tailwind v3.4.1

**Backoffice Specific Fixes:**
- Copied shared libs locally (safety-filters.ts, types.ts, auto-compute.ts)
- Created Prisma schema for PostgreSQL/Supabase
- Removed duplicate route pages
- Added `force-dynamic` export for database pages
- Fixed Label component for React 18

### 2025-11-29: Coffeeshop Order Submission
- Added Supabase integration
- Order submission from SelectionsSidebar
- Session-based order history

### 2025-11-28: Coffeeshop Bug Fixes
- Fixed "Add to Cart" functionality
- Fixed category "See All" pages
- Redesigned SelectionsSidebar (compact layout)
- Fixed edit flow z-index issues

---

## Development

### Start Individual App
```bash
# Coffeeshop
cd apps/coffeeshop/frontend
npm run dev  # http://localhost:3004

# Website
cd apps/website
npm run dev  # http://localhost:3000

# Backoffice
cd apps/backoffice
npm run dev  # http://localhost:3001
```

### Build for Production
```bash
cd apps/[app-name]
npm run build
```

---

## Vercel Deployment Configuration

Each app deployed separately with:

| App | Root Directory | Build Command |
|-----|----------------|---------------|
| Coffeeshop | `apps/coffeeshop/frontend` | `npm run build` |
| Website | `apps/website` | `npm run build` |
| Backoffice | `apps/backoffice` | `npm run build` |

**Install Command (all):** `npm install --prefix [root-dir]`

---

## Known Issues

### Backoffice
- [ ] No authentication implemented
- [ ] TypeScript errors ignored (`ignoreBuildErrors: true`)
- [ ] Some monorepo type conflicts with React types

### Coffeeshop
- [ ] Port should be 3020 (currently 3004)
- [ ] i18n duplicated from Module 10

### General
- [ ] Wellness and Rentals apps are planned but not started

---

## Getting Help

**Per-App Documentation:**
- `apps/coffeeshop/frontend/CLAUDE.md` - Detailed coffeeshop context
- `apps/wellness/CLAUDE.md` - Wellness app context
- `apps/rentals/CLAUDE.md` - Rentals app context

**Project-Wide:**
- This file (CLAUDE.md) - Overall verticals context
- `shared/database/` - Shared code reference

**Related Repos:**
- `gudbro-qr-core/CLAUDE.md` - QR Platform context

---

**This file provides repository-wide context for Claude Code sessions.**

**Last Updated:** 2025-12-06

---

## 🏢 Multi-Tenant Architecture (ADR-003)

### Architecture Decision Record (ADR-003)
**Decision Date:** 2025-12-06
**Status:** IMPLEMENTED (2025-12-06)

### Context
GUDBRO needs to support multiple business scenarios:
- Single restaurant owners (1 location)
- Multi-location chains (same brand, multiple locations)
- Multi-brand organizations (holding companies)
- Franchise operations (mix of owned and franchised)
- Marketing agencies managing multiple clients
- National/regional partners (licensees)
- Global enterprise clients

### Decision: Hierarchical Multi-Tenant with Partner Network

```
GUDBRO Platform (Super Admin)
         │
    ┌────┴────┐
    ▼         ▼
 Partners   Direct Clients
 (Licensees)  (Enterprise)
    │
    ▼
 Organizations ──→ Brands ──→ Locations
 (Clients)
```

### Entity Hierarchy

| Level | Entity | Description |
|-------|--------|-------------|
| 0 | **Partner** | National/regional licensee, manages clients in territory |
| 1 | **Organization** | Paying customer (company/individual) |
| 2 | **Brand** | Business identity (logo, colors, menu template) |
| 3 | **Location** | Physical point of sale with locale settings |

### Business Rules

1. **Standard Clients** (self-service signup):
   - Auto-assigned to Partner of their territory (if exists)
   - Pay fees to Partner
   - Partner pays royalty % to GUDBRO monthly

2. **Enterprise Clients** (sales-driven):
   - Sign directly with GUDBRO
   - NOT subject to Partner territorial rights
   - Pay 100% to GUDBRO
   - Can operate in any country

3. **Partner Revenue Model**:
   - Partner collects 100% from their clients
   - GUDBRO invoices Partner monthly for royalty %
   - Royalty covers: platform, hosting, development

### Database Schema

```sql
-- Partners (licensees)
partners
  ├─ id UUID PK
  ├─ name VARCHAR(255)
  ├─ slug VARCHAR(100) UNIQUE
  ├─ territory_type 'country' | 'region' | 'city'
  ├─ territory_codes TEXT[]
  ├─ is_exclusive BOOLEAN
  ├─ royalty_pct DECIMAL(5,2)
  ├─ contact_email, contact_phone
  ├─ status 'active' | 'suspended' | 'terminated'
  └─ created_at, updated_at

-- Organizations (paying customers)
organizations
  ├─ id UUID PK
  ├─ name VARCHAR(255)
  ├─ slug VARCHAR(100) UNIQUE
  ├─ type 'standard' | 'enterprise'
  ├─ partner_id UUID FK (NULL for enterprise)
  ├─ subscription_plan 'free' | 'starter' | 'pro' | NULL
  ├─ billing_email, billing_address
  ├─ stripe_customer_id
  └─ status, created_at, updated_at

-- Brands (business identities)
brands
  ├─ id UUID PK
  ├─ organization_id UUID FK
  ├─ name VARCHAR(255)
  ├─ slug VARCHAR(100) UNIQUE
  ├─ business_type 'fnb' | 'hotel' | 'rental' | 'other'
  ├─ logo_url, primary_color, secondary_color
  ├─ default_menu_id UUID FK (optional)
  └─ is_active, created_at, updated_at

-- Locations (physical points of sale)
locations
  ├─ id UUID PK
  ├─ brand_id UUID FK
  ├─ name VARCHAR(255)
  ├─ slug VARCHAR(100)
  ├─ address, city, postal_code
  ├─ country_code FK, currency_code
  ├─ primary_language, enabled_languages[]
  ├─ timezone VARCHAR(50)
  ├─ phone, email
  ├─ menu_id UUID FK (overrides brand default)
  ├─ latitude, longitude
  └─ is_active, created_at, updated_at

-- Enterprise leads (pre-sales)
enterprise_leads
  ├─ id UUID PK
  ├─ company_name, contact_name
  ├─ contact_email, contact_phone
  ├─ estimated_locations INT
  ├─ countries TEXT[]
  ├─ message TEXT
  ├─ status 'new' | 'contacted' | 'qualified' | 'won' | 'lost'
  ├─ assigned_to UUID
  └─ created_at, updated_at
```

### Migration from Current Schema

The current `merchants` table will be deprecated. Existing merchants will be migrated to:
- 1 Organization (type: standard, no partner initially)
- 1 Brand (same name as merchant)
- 1 Location (with current locale settings)

---

## 🌍 Multi-Locale Architecture (ACTIVE)

### Architecture Decision Record (ADR-002)
**Decision Date:** 2025-12-05
**Status:** Sprint 1 COMPLETED - Database migrations executed

### Context
GUDBRO serves merchants globally. Each merchant operates in their own country with:
- Their own **currency** (EUR in Italy, USD in USA, VND in Vietnam)
- Their own **primary language** (Italian, English, Vietnamese)
- Multiple **customer languages** (tourists visiting the restaurant)

### Decision: Merchant-Centric Approach

**Principle:** The merchant defines their locale settings during onboarding. The system auto-detects defaults from country but allows overrides.

```
MERCHANT (Roma, Italia)
  ├─ Country: Italy → Auto-set:
  │   ├─ Currency: EUR
  │   ├─ Primary Language: Italian (it)
  │   ├─ Timezone: Europe/Rome
  │   └─ Suggested Languages: it, en, de, fr
  │
  └─ Merchant chooses enabled languages: it, en, fr
```

### Currency Flow

```
Merchant inserts prices in EUR (€12.50)
    │
    ▼
Database stores: price=12.50, currency='EUR'
    │
    ▼
Tourist (American) sees:
  - Default: €12.50 (merchant's currency)
  - Toggle: "Show in USD" → ~$13.50 (converted)
    │
    ▼
Payment: Tourist pays €12.50 at restaurant
(Conversion is INFORMATIONAL only, not transactional)
```

### Exchange Rate Strategy

**Update Frequency:** 1x per day (00:05 UTC)
**Rationale:**
- Use case is informational (not trading/booking)
- Daily currency fluctuation ~0.3-0.5% (negligible for menu prices)
- Free API tier supports 1,500 requests/month
- Cached in Supabase `exchange_rates` table

**API Provider:** exchangerate-api.com (free tier)

### Language Strategy

**Database-driven languages:**
- `countries` table: 197 countries with primary language
- `languages` table: 30+ languages with RTL support
- `menu_item_translations` table: Per-item translations

**Merchant controls:**
- `primary_language`: Main language for backoffice/receipts
- `enabled_languages`: Languages shown in customer PWA

**Fallback chain:** Requested → Primary → English → Original

### Database Schema (Sprint 1)

```sql
-- New tables
countries (197 rows - all ISO 3166-1)
  ├─ code: VARCHAR(2) PK (ISO 3166-1)
  ├─ currency_code: VARCHAR(3) (ISO 4217)
  ├─ primary_language: VARCHAR(5) (BCP 47)
  └─ common_languages: VARCHAR(5)[]

languages (111 rows)
  ├─ code: VARCHAR(5) PK (BCP 47)
  ├─ direction: 'ltr' | 'rtl' (6 RTL languages)
  └─ native_name: VARCHAR(50)

exchange_rates (1 row, updated daily)
  ├─ base_currency: 'USD'
  ├─ rates: JSONB {EUR: 0.92, VND: 25000, ...}
  └─ fetched_at: TIMESTAMPTZ

menu_item_translations
  ├─ menu_item_id: UUID FK
  ├─ language_code: VARCHAR(5) FK
  ├─ name: VARCHAR(255)
  └─ description: TEXT
```

### Migrations Required

| Migration | Description | Status |
|-----------|-------------|--------|
| `007a-languages-only.sql` | Initial 70 languages | ✅ EXECUTED (2025-12-05) |
| `STEP2-remaining-migrations.sql` | Initial 43 countries, translations, rates | ✅ EXECUTED (2025-12-05) |
| `011a-additional-languages.sql` | Additional 41 languages | ✅ EXECUTED (2025-12-06) |
| `011-all-remaining-countries.sql` | Remaining 154 countries | ✅ EXECUTED (2025-12-06) |

**Final Database State (2025-12-06):**
- `languages` - **111 languages** (includes RTL: ar, he, fa, ur, ps, dv)
- `countries` - **197 countries** (all ISO 3166-1 countries)
  - Africa: 54 | Asia: 49 | Europe: 45 | North America: 23 | Oceania: 14 | South America: 12
- `menu_item_translations` - Per-item translations (ready for data)
- `category_translations` - Per-category translations (ready for data)
- `exchange_rates` - 33 currencies (USD base)

**Merchant Table Updated:**
- Added `country_code`, `currency_code`, `primary_language`, `enabled_languages` columns
- Auto-populate trigger from country defaults

---

## 📋 Sprint Plan: Multi-Locale System

### Sprint 1: Database Foundation (Week 1) ✅ COMPLETED
**Goal:** Create core tables for countries, languages, translations

| Task | Effort | Status |
|------|--------|--------|
| Create `countries` table (197 countries) | 3h | ✅ Done |
| Create `languages` table (30+ languages) | 2h | ✅ Done |
| Create `menu_item_translations` table | 2h | ✅ Done |
| Create `exchange_rates` table | 1h | ✅ Done |
| Auto-populate trigger for merchants | 2h | ✅ Done |
| RLS policies for all tables | 2h | ✅ Done |
| Seed data for key countries | 2h | ✅ Done |

**Migrations EXECUTED:**
- 2025-12-05: `007a-languages-only.sql` + `STEP2-remaining-migrations.sql`
- 2025-12-06: `011a-additional-languages.sql` + `011-all-remaining-countries.sql`

**Final Database State:**
- Languages: **111 rows** (6 RTL languages)
- Countries: **197 rows** (all ISO 3166-1)
- Exchange rates: 33 currencies
- Merchant table: 4 new locale columns added

### Sprint 2: Onboarding API (Week 2) ✅ COMPLETED
**Goal:** Complete merchant registration with country/language

| Task | Effort | Status |
|------|--------|--------|
| Country selector with search | 3h | ✅ Done |
| Auto-populate currency/language/timezone | 2h | ✅ Done |
| Language multi-select component | 3h | ✅ Done |
| POST /merchants API endpoint | 4h | ✅ Done |
| GET /countries and /languages APIs | 2h | ✅ Done |
| Validation and error handling | 2h | ✅ Done |

**Files Created (2025-12-06):**
- `components/locale/CountrySelector.tsx` - Searchable country dropdown with flags, grouped by continent
- `components/locale/LanguageMultiSelect.tsx` - Multi-select with RTL support, primary language lock
- `app/api/countries/route.ts` - GET endpoint with search, continent, supported filters
- `app/api/languages/route.ts` - GET endpoint with search, direction (ltr/rtl) filter
- `app/api/merchants/route.ts` - POST/GET endpoints for merchant creation
- `lib/supabase.ts` - Supabase client with Country/Language types
- Updated `app/(onboarding)/onboarding/page.tsx` - Integrated locale components

### Sprint 3: PWA Dynamic Languages (Week 3)
**Goal:** Languages fetched from merchant config

| Task | Effort | Status |
|------|--------|--------|
| Refactor useTranslation hook | 4h | Pending |
| Dynamic language selector | 3h | Pending |
| Translation fallback logic | 2h | Pending |
| RTL support (Arabic, Hebrew) | 4h | Pending |
| Fetch translations from database | 3h | Pending |

### Sprint 4: Backoffice Translation Editor (Week 4)
**Goal:** Merchants can manage translations

| Task | Effort | Status |
|------|--------|--------|
| Translation editor UI | 6h | Pending |
| Bulk translation import (CSV) | 3h | Pending |
| Language settings page | 2h | Pending |
| Preview in multiple languages | 3h | Pending |

### Sprint 5: Currency System Refactor (Week 5)
**Goal:** Proper merchant→tourist conversion + live rates

| Task | Effort | Status |
|------|--------|--------|
| Refactor currency-converter.ts | 4h | Pending |
| Exchange rate API integration | 3h | Pending |
| Supabase Edge Function for rates | 4h | Pending |
| Decimal.js for precision | 2h | Pending |
| Multi-currency testing | 3h | Pending |

---

## Claude Code Session Rules

### Auto-Update Rule

**IMPORTANTE:** Claude deve aggiornare questo file CLAUDE.md automaticamente dopo:
1. Ogni **deploy** completato
2. Ogni **fix critico** risolto
3. Ogni **nuova feature** implementata
4. Ogni **decisione architetturale** importante
5. Prima di **chiudere sessioni lunghe** (quando il contesto si riempie)

### Come Aggiornare
- Aggiornare la sezione "Recent Changes" con data e descrizione
- Aggiornare "Deployed Applications" se cambia
- Aggiornare "Known Issues" se risolti o nuovi
- Aggiornare "Last Updated" con la data corrente
- Fare commit delle modifiche

### Trigger Frase
Se l'utente dice "Aggiorna CLAUDE.md" o "salva contesto", Claude deve aggiornare immediatamente questo file con lo stato attuale della sessione
