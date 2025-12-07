# GUDBRO Inventory

> **CRITICAL:** Consulta questo file PRIMA di esplorare il codebase per evitare di "riscoprire" feature esistenti.

**Last Updated:** 2025-12-07

---

## PWA Coffeeshop (apps/coffeeshop/frontend)

### Core Services (lib/)

| File | Purpose | Status |
|------|---------|--------|
| `supabase.ts` | Supabase client, anonymous sessions, device fingerprint | ✅ |
| `menu-service.ts` | Fetch menu items from Supabase with JSON fallback | ✅ |
| `order-service.ts` | Submit orders to Supabase with retry and fallback | ✅ |
| `translations-service.ts` | Fetch translated menu items from Supabase RPC | ✅ |
| `modifier-service.ts` | Product customizations from Supabase with caching | ✅ |

### i18n & Locale (lib/)

| File | Purpose | Status |
|------|---------|--------|
| `use-translation.ts` | Translation hook with English fallback, merchant validation | ✅ |
| `translations.ts` | Static translations (EN/VI/IT) | ✅ |
| `language-preferences.ts` | User language selection with localStorage | ✅ |
| `currency-converter.ts` | Exchange rates from Supabase, 24h cache, VND "k" format | ✅ |
| `currency-preferences.ts` | User currency preference storage | ✅ |
| `merchant-config.ts` | Merchant locale settings from Supabase | ✅ |

### Hooks (lib/hooks/)

| File | Purpose | Status |
|------|---------|--------|
| `useDirection.ts` | RTL/LTR direction based on language | ✅ |
| `useMenuFilters.ts` | Menu filtering logic | ✅ |
| `useMenuStores.ts` | Menu store management | ✅ |
| `useMenuUI.ts` | Menu UI state | ✅ |

### State Management (lib/)

| File | Purpose | Status |
|------|---------|--------|
| `cart-store.ts` | Shopping cart with localStorage | ✅ |
| `selections-store.ts` | Digital notepad for selections | ✅ |
| `favorites-store.ts` | Favorite items with localStorage | ✅ |
| `order-history-store.ts` | Order history with session tracking | ✅ |
| `feedback-store.ts` | Customer feedback with cooldown | ✅ |
| `engagement-store.ts` | Engagement tracking with anti-spam | ✅ |
| `user-profile-store.ts` | User profile with visit tracking | ✅ |
| `dish-preferences.ts` | Per-dish customization preferences | ✅ |
| `user-preferences.ts` | Allergen/dietary preferences | ✅ |

### Context Providers (lib/contexts/)

| File | Purpose | Status |
|------|---------|--------|
| `MerchantConfigContext.tsx` | Merchant locale config for all components | ✅ |

### Theme (lib/theme/)

| File | Purpose | Status |
|------|---------|--------|
| `theme-context.tsx` | Light/dark theme React context | ✅ |
| `theme-store.ts` | Theme persistence with localStorage | ✅ |
| `theme-definitions.ts` | WCAG AA compliant color palettes | ✅ |

### Business Logic (lib/)

| File | Purpose | Status |
|------|---------|--------|
| `tier-system.ts` | 3-tier SaaS subscription levels | ✅ |
| `category-system.ts` | Type-safe categories with validation | ✅ |
| `table-context-store.ts` | QR-based table identification | ✅ |
| `venue-config.ts` | Venue onboarding configuration | ✅ |

### Menu Data (lib/)

| File | Purpose | Status |
|------|---------|--------|
| `coffee-house-menu.ts` | 81 Coffee House products | ✅ |
| `roots-menu.ts` | 13 ROOTS restaurant products | ✅ |

---

## Backoffice (apps/backoffice)

### Dashboard Pages

| Route | Purpose | Status |
|-------|---------|--------|
| `/dashboard` | Main dashboard with tenant overview | ✅ |
| `/analytics` | Analytics and metrics | ✅ |
| `/orders` | Order management | ✅ |
| `/orders/kitchen` | Kitchen display system | ✅ |
| `/content` | Content overview | ✅ |
| `/content/menu` | Menu items CRUD | ✅ |
| `/content/menu/[slug]` | Single menu item edit | ✅ |
| `/content/categories` | Category management | ✅ |
| `/content/ingredients` | Ingredient management | ✅ |
| `/content/recipes` | Recipe list (22 barista recipes) | ✅ |
| `/content/recipes/[slug]` | Single recipe view | ✅ |
| `/content/modifiers` | Product customization groups | ✅ |
| `/content/menu-builder` | Visual menu builder | ✅ |
| `/translations` | Translation editor with CSV import/export | ✅ |
| `/food-costs` | Food cost dashboard | ✅ |
| `/food-costs/ingredients` | Ingredient cost management | ✅ |
| `/qr-codes` | QR code generation | ✅ |
| `/team` | Team management | ✅ |
| `/billing` | Billing and subscription | ✅ |
| `/settings` | Settings overview | ✅ |
| `/settings/languages` | Enable/disable languages, set primary | ✅ |
| `/settings/currency` | Exchange rates table, refresh button | ✅ |

### API Endpoints

| Endpoint | Methods | Purpose |
|----------|---------|---------|
| `/api/organizations` | POST, GET, PATCH | Organization CRUD |
| `/api/brands` | POST, GET, PATCH, DELETE | Brand management |
| `/api/locations` | POST, GET, PATCH, DELETE | Location management |
| `/api/partners` | POST, GET, PATCH | Partner/licensee management |
| `/api/merchants` | POST, GET | Merchant registration |
| `/api/countries` | GET | Countries with search/filter |
| `/api/languages` | GET | Languages with RTL filter |
| `/api/exchange-rates/refresh` | POST, GET | Exchange rate update |
| `/api/menu/[merchantSlug]` | GET | Public menu API |
| `/api/enterprise-leads` | POST, GET, PATCH | Lead management |

### Components (Highlights)

| Component | Purpose | Status |
|-----------|---------|--------|
| `TenantSwitcher` | Organization/Brand/Location dropdown | ✅ |
| `TenantContext` | Multi-tenant state management | ✅ |
| `CountrySelector` | Searchable country dropdown with flags | ✅ |
| `LanguageMultiSelect` | Multi-select with RTL badges | ✅ |

---

## Database (Supabase)

### Tables

| Table | Purpose | Rows |
|-------|---------|------|
| `languages` | 111 languages with RTL support | 111 |
| `countries` | 197 ISO countries with defaults | 197 |
| `exchange_rates` | Daily exchange rates (USD base) | 33 currencies |
| `exchange_rate_history` | Historical rate snapshots | - |
| `menu_item_translations` | Per-item translations | - |
| `category_translations` | Per-category translations | - |
| `merchants` | Merchant locale settings | - |
| `modifier_groups` | Product customization groups | - |
| `modifiers` | Individual modifiers | - |
| `partners` | National/regional licensees | - |
| `organizations` | Paying customers | - |
| `brands` | Business identities | - |
| `locations` | Physical points of sale | - |
| `enterprise_leads` | Pre-sales pipeline | - |
| `ingredients` | 69 ingredients with costs | 69 |
| `recipes` | Professional barista recipes | 22 |

### Migrations (Executed)

| # | Migration | Purpose |
|---|-----------|---------|
| 001 | enable-rls-all-tables | RLS on all tables |
| 002 | fix-function-search-path | Security fix |
| 003 | recipes-tables | Recipe management |
| 004 | add-menu-type-to-categories | Food/Drinks/Merch tabs |
| 005 | modifiers-system | Product customizations |
| 006 | fix-modifier-groups-rls | RLS security fix |
| 007a | languages-only | 70 initial languages |
| 008 | menu-translations | Translation storage |
| 009 | exchange-rates | Currency conversion |
| 010 | merchant-locale-fields | Locale columns |
| 011 | all-remaining-countries | 154 more countries |
| 011a | additional-languages | 41 more languages |
| 012 | multi-tenant-architecture | Partners/Orgs/Brands/Locations |
| 013 | fix-merchant-users-recursion | RLS recursion fix |
| 014 | food-cost-system | Cost tracking |
| 015 | seed-ingredients-with-costs | 69 ingredients |
| 016 | fix-ingredients-rls | Public read access |

### SQL Helper Functions

| Function | Purpose |
|----------|---------|
| `convert_currency(amount, from, to)` | Convert between currencies |
| `get_exchange_rate(from, to)` | Get rate between pair |
| `are_exchange_rates_stale()` | Check if rates need refresh |
| `get_merchant_locale(slug)` | Get merchant locale settings |

---

## Shared (shared/)

| Path | Purpose |
|------|---------|
| `database/safety-filters.ts` | 51 allergen/dietary filters |
| `database/types.ts` | Shared TypeScript types |
| `database/recipes/recipes-database.json` | 22 barista recipes |
| `database/utils/auto-compute.ts` | Auto-compute utilities |
| `database/migrations/` | All SQL migrations |

---

## Deployed URLs

| App | URL | Port (dev) |
|-----|-----|------------|
| Coffeeshop PWA | https://gudbro-coffeeshop-pwa.vercel.app | 3004 |
| Backoffice | https://gudbro-backoffice.vercel.app | 3001 |
| Website | https://gudbro-website.vercel.app | 3000 |

---

## RTL Languages Supported

Arabic (ar), Hebrew (he), Persian (fa), Urdu (ur), Pashto (ps), Divehi (dv)

---

## Feature Completion Summary

| System | Status | Notes |
|--------|--------|-------|
| Multi-Locale (5 sprints) | ✅ Complete | 197 countries, 111 languages |
| Multi-Tenant | ✅ Complete | Partner → Org → Brand → Location |
| Currency Conversion | ✅ Complete | 33 currencies, manual refresh |
| Translation Editor | ✅ Complete | Inline edit + CSV |
| Food Cost System | ✅ Complete | 69 ingredients with VND costs |
| Recipe Management | ✅ Complete | 22 barista recipes |
| Order System | ✅ Complete | Supabase with fallback |
| Design System | ✅ Complete | CVA + shadcn/ui pattern |
| Claude Workflow | ✅ Complete | Commands + Agents |

---

## Claude Code Workflow (.claude/)

### Slash Commands (.claude/commands/)

| Command | Purpose |
|---------|---------|
| `inventory.md` | Check inventory before implementing |
| `start-session.md` | Session start protocol |
| `end-session.md` | Session end protocol |
| `new-feature.md` | New feature implementation guide |
| `deploy.md` | Vercel deployment instructions |

### Custom Agents (.claude/agents/)

| Agent | Purpose |
|-------|---------|
| `inventory-checker.md` | Verify existing code before writing new |
| `pwa-specialist.md` | Coffeeshop PWA development |
| `backoffice-specialist.md` | Admin dashboard development |
| `code-reviewer.md` | Pre-deploy code review |
| `database-expert.md` | SQL, Prisma, migrations |
