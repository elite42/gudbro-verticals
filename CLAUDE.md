# GUDBRO Verticals - Claude Code Context

**Repository:** gudbro-verticals
**Purpose:** Standalone vertical business applications
**Status:** Production (3 apps deployed on Vercel)
**Last Updated:** 2025-12-03

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

### 2025-12-03: Supabase Security Fixes

**Problem:** Supabase Security Advisor reported 9 errors + 8 warnings + 11 suggestions.

**Created Migrations:**
- `shared/database/migrations/001-enable-rls-all-tables.sql` - Enables RLS on 9 tables with policies
- `shared/database/migrations/002-fix-function-search-path.sql` - Adds search_path to 8 functions
- `shared/database/migrations/003-review-unused-indexes.sql` - Analysis script (no changes)

**Status:**
- 9 RLS Errors: Migration ready, run in Supabase SQL Editor
- 8 Function Warnings: Migration ready, run in Supabase SQL Editor
- 11 Index Suggestions: Analyzed, keeping all indexes (app is new, will be useful later)

**To Apply Fixes:**
```bash
# In Supabase Dashboard → SQL Editor → New Query
# Run migrations in order:
# 1. 001-enable-rls-all-tables.sql
# 2. 002-fix-function-search-path.sql
# 3. (Optional) 003-review-unused-indexes.sql (analysis only)
```

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

**Last Updated:** 2025-12-03

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
