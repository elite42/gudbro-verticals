# Audit Knowledge Base - GUDBRO Verticals

> **Scopo:** Mappare TUTTA la conoscenza utile per Claude, organizzata per rapido accesso.
> **Data Audit:** 2026-01-26
> **Versione:** 1.0

---

## Executive Summary

| Metrica | Valore |
|---------|--------|
| **File totali progetto** | ~70,000 |
| **File TypeScript (apps)** | 1,163 |
| **File Markdown (docs)** | 152 |
| **Migrations SQL** | 89 (29,263 righe) |
| **Apps principali** | 6 (coffeeshop, backoffice, waiter, rentals, wellness, website) |
| **Stato documentazione** | BUONO - ben strutturata, CLAUDE.md eccellente |

### Aree Principali

```
gudbro-verticals/
├── apps/                    # 6 applicazioni
│   ├── coffeeshop/frontend/ # PWA Digital Menu (335 file .ts/.tsx)
│   ├── backoffice/          # Admin Dashboard (725 file .ts/.tsx)
│   ├── waiter/              # Waiter PWA
│   ├── rentals/             # Rental verticale
│   ├── wellness/            # Wellness verticale
│   └── website/             # Marketing site
├── shared/                  # Packages condivisi
│   ├── database/            # Schema, migrations, seed data
│   ├── types/               # TypeScript types (Supabase)
│   ├── ui/                  # Componenti UI condivisi
│   ├── utils/               # Utility functions
│   └── config/              # Config condivisi
├── docs/                    # 152 file di documentazione
└── .claude/                 # Claude commands & skills
```

---

## 1. PWA Coffeeshop (`apps/coffeeshop/frontend/`)

### 1.1 Struttura Directory

```
apps/coffeeshop/frontend/
├── app/                     # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── auth/passkey/    # WebAuthn passkey auth
│   │   ├── charges/         # Payment charges
│   │   ├── feedback/        # Customer feedback
│   │   ├── loyalty/         # Loyalty points
│   │   ├── orders/          # Order management
│   │   ├── push-subscription/
│   │   ├── send-push/
│   │   ├── staff/           # Staff reviews
│   │   └── tenant-context/  # Multi-tenant
│   ├── v2/                  # ⭐ NUOVA VERSIONE UI
│   │   ├── menu/            # Menu pages
│   │   ├── cart/            # Cart
│   │   ├── orders/          # Order history
│   │   ├── account/         # User account
│   │   ├── favorites/       # Favorites
│   │   └── [altre pagine]
│   ├── about/
│   ├── account/
│   ├── cart/
│   ├── menu/
│   ├── orders/
│   └── [altre routes legacy]
├── components/
│   ├── v2/                  # ⭐ COMPONENTI V2 (33 file)
│   │   ├── connected/       # Componenti con data fetching
│   │   └── [componenti presentational]
│   ├── challenges/          # Food challenges
│   ├── chat/                # AI Chat widget
│   ├── customizations/      # Product customizations
│   ├── events/              # Events system
│   ├── layout/              # Layout components
│   ├── loyalty/             # Loyalty UI
│   ├── menu/                # Menu layout
│   ├── passkey/             # WebAuthn UI
│   ├── reservations/        # Reservation widget
│   ├── site/                # Site sections
│   ├── ui/                  # shadcn/ui base
│   └── [80+ altri componenti]
└── lib/
    ├── hooks/               # 13 custom hooks
    ├── contexts/            # React contexts
    ├── theme/               # Theme system
    ├── safety/              # Safety filters
    └── [30+ services/stores]
```

### 1.2 Componenti Chiave

| Componente | Path | Scopo |
|------------|------|-------|
| **CartSidebar** | `components/CartSidebar.tsx` | Carrello laterale (26KB) |
| **ProductBottomSheet** | `components/ProductBottomSheet.tsx` | Dettaglio prodotto bottom sheet |
| **AuthModal** | `components/AuthModal.tsx` | Modal autenticazione |
| **SearchOverlay** | `components/SearchOverlay.tsx` | Ricerca full-screen |
| **MenuHeader** | `components/MenuHeader.tsx` | Header menu con filtri |
| **StickyCartBar** | `components/StickyCartBar.tsx` | Barra carrello sticky |
| **ReservationWidget** | `components/reservations/ReservationWidget.tsx` | Sistema prenotazioni (32KB) |
| **ChatWidget** | `components/chat/ChatWidget.tsx` | Chat AI (13KB) |

### 1.3 Componenti V2 (Nuovi)

| Componente | Path | Scopo |
|------------|------|-------|
| **HomePage** | `components/v2/HomePage.tsx` | Home page redesign |
| **MenuPage** | `components/v2/MenuPage.tsx` | Menu page redesign |
| **ProductCard** | `components/v2/ProductCard.tsx` | Card prodotto nuovo design |
| **ProductBottomSheet** | `components/v2/ProductBottomSheet.tsx` | Bottom sheet prodotto |
| **CartPage** | `components/v2/CartPage.tsx` | Pagina carrello |
| **OrderHistoryPage** | `components/v2/OrderHistoryPage.tsx` | Storico ordini |
| **WelcomeModal** | `components/v2/WelcomeModal.tsx` | Modal benvenuto (19KB) |
| **SearchOverlay** | `components/v2/SearchOverlay.tsx` | Ricerca (23KB) |
| **DesktopMenuLayout** | `components/v2/DesktopMenuLayout.tsx` | Layout desktop |
| **TableContextBanner** | `components/v2/TableContextBanner.tsx` | Banner tavolo |

### 1.4 Services e Stores

| Service/Store | Path | Scopo |
|---------------|------|-------|
| **cart-store** | `lib/cart-store.ts` | Zustand store carrello |
| **menu-service** | `lib/menu-service.ts` | Fetch menu da Supabase (17KB) |
| **order-service** | `lib/order-service.ts` | Gestione ordini (16KB) |
| **loyalty-service** | `lib/loyalty-service.ts` | Sistema loyalty |
| **auth-service** | `lib/auth-service.ts` | Autenticazione |
| **passkey-service** | `lib/passkey-service.ts` | WebAuthn |
| **analytics-service** | `lib/analytics-service.ts` | Analytics tracking |
| **translations** | `lib/translations.ts` | i18n (39KB di traduzioni) |
| **tier-system** | `lib/tier-system.ts` | Sistema tier merchant |
| **merchant-config** | `lib/merchant-config.ts` | Config merchant |

### 1.5 Hooks Disponibili

| Hook | Path | Scopo |
|------|------|-------|
| `useAuth` | `lib/hooks/useAuth.ts` | Auth state |
| `useBrandTheme` | `lib/hooks/useBrandTheme.ts` | Theme dinamico |
| `useMenu` | `lib/hooks/useMenu.ts` | Menu data (12KB) |
| `useMenuFilters` | `lib/hooks/useMenuFilters.ts` | Filtri menu |
| `usePreferenceSync` | `lib/hooks/usePreferenceSync.ts` | Sync preferenze |
| `useTenantContext` | `lib/hooks/useTenantContext.ts` | Multi-tenant |
| `useTierFeature` | `lib/hooks/useTierFeature.ts` | Feature gating per tier |
| `useTierLimits` | `lib/hooks/useTierLimits.ts` | Limiti tier |
| `useDirection` | `lib/hooks/useDirection.ts` | RTL support |
| `useMenuTranslations` | `lib/hooks/useMenuTranslations.ts` | Traduzioni menu |

### 1.6 Pattern e Convenzioni

#### Pattern Componenti

- **V2 Components**: Nuovi componenti in `components/v2/`, seguono design system Me&U
- **Connected Components**: In `components/v2/connected/`, hanno data fetching interno
- **Presentational**: Ricevono props, non fanno fetch
- **UI Base**: `components/ui/` contiene shadcn/ui

#### Convenzioni Naming

```typescript
// Componenti: PascalCase
ProductCard.tsx
AuthModal.tsx

// Hooks: camelCase con "use" prefix
useAuth.ts
useMenu.ts

// Services: kebab-case con "-service" suffix
menu-service.ts
order-service.ts

// Stores: kebab-case con "-store" suffix
cart-store.ts
```

#### State Management

- **Zustand** per client-side state (cart, selections, preferences)
- **Server Components** + **Server Actions** per data fetching
- **Context** solo per theme, direction, tenant

### 1.7 Flow Principali

#### Order Flow

```
1. Menu browse → ProductCard click
2. ProductBottomSheet apre → selezione customizations
3. "Add to Cart" → cart-store.addItem()
4. CartSidebar/CartPage → review
5. Checkout → order-service.createOrder()
6. API /api/orders → Supabase insert
7. OrderConfirmation → push notification setup
```

#### Auth Flow

```
1. Action richiede auth → AuthModal apre
2. Email input → magic link/OTP
3. Supabase Auth verifica
4. auth-service.getUser() aggiorna stato
5. Optional: passkey registration

Passkey Flow:
1. /api/auth/passkey/register/start
2. WebAuthn browser API
3. /api/auth/passkey/register/complete
4. Login via /api/auth/passkey/authenticate
```

#### Cart Flow

```
1. ProductBottomSheet → "Add to Cart"
2. cart-store.addItem({ product, quantity, customizations })
3. StickyCartBar/CartSidebar mostra count + total
4. CartPage per checkout
5. Zustand persist in localStorage
```

### 1.8 Gap di Conoscenza

| Area | Problema | Azione Suggerita |
|------|----------|------------------|
| V2 vs Legacy | Coesistono due versioni UI | Documentare quale usare quando |
| Customizations | Sistema complesso, poco documentato | Creare doc customizations |
| Tier System | Logica sparsa tra hooks e services | Centralizzare documentazione |
| Safety Filters | 66 parametri, documentazione incompleta | Aggiornare SISTEMA-FILTRI.md |

---

## 2. Backoffice (`apps/backoffice/`)

### 2.1 Struttura Directory

```
apps/backoffice/
├── app/
│   ├── (auth)/              # Auth routes
│   │   └── verify-2fa/
│   ├── (dashboard)/         # Main dashboard
│   │   ├── account/
│   │   ├── ai/              # AI Co-Manager
│   │   │   └── triggers/
│   │   ├── analytics/
│   │   │   └── prep-time/
│   │   ├── billing/
│   │   ├── chat/
│   │   │   ├── conversations/
│   │   │   └── escalations/
│   │   ├── content/         # Menu management
│   │   │   ├── categories/
│   │   │   ├── contributions/
│   │   │   ├── ingredients/
│   │   │   ├── menu/[slug]
│   │   │   ├── menu-builder/
│   │   │   ├── modifiers/
│   │   │   ├── recipes/
│   │   │   └── wines/
│   │   ├── customers/
│   │   ├── food-cost/
│   │   ├── help/
│   │   ├── hot-actions/
│   │   ├── intelligence/
│   │   ├── marketing/
│   │   ├── orders/
│   │   ├── partner/
│   │   ├── partnerships/
│   │   ├── platform/
│   │   ├── qr-codes/
│   │   ├── reservations/
│   │   ├── settings/        # 17 sotto-sezioni
│   │   ├── team/
│   │   └── translations/
│   ├── (onboarding)/
│   ├── (public)/
│   ├── (staff)/
│   ├── api/                 # 48 cartelle API
│   └── catalog/
├── components/
│   ├── ai/                  # 16 componenti AI
│   ├── auth/
│   ├── customers/
│   ├── food-cost/
│   ├── layout/
│   ├── locale/
│   ├── map/                 # 12 componenti mappa
│   ├── notifications/
│   ├── onboarding/
│   ├── qr/
│   ├── reservations/        # 15 componenti
│   ├── schedule/            # 9 componenti
│   ├── settings/
│   ├── team/
│   ├── tenant/
│   ├── ui/                  # 15 componenti
│   └── wallet/
└── lib/
    ├── ai/                  # 33 services AI
    ├── auth/
    ├── cache/
    ├── contexts/
    ├── hooks/
    ├── i18n/
    ├── kb/                  # Knowledge base
    ├── notifications/
    ├── observability/
    ├── qr/
    ├── query/
    ├── realtime/
    ├── reservations/
    ├── security/
    ├── shared/
    └── [altri services]
```

### 2.2 Pagine Principali

| Sezione | Path | Scopo | File Size |
|---------|------|-------|-----------|
| **AI Co-Manager** | `(dashboard)/ai/` | Chat AI, triggers | 29KB |
| **Menu Editor** | `(dashboard)/content/menu/[slug]/` | Editor prodotti | 76KB |
| **Categories** | `(dashboard)/content/categories/` | Gestione categorie | 29KB |
| **Modifiers** | `(dashboard)/content/modifiers/` | Sistema modificatori | 48KB |
| **Recipes** | `(dashboard)/content/recipes/` | Gestione ricette | 17KB |
| **Orders** | `(dashboard)/orders/` | Gestione ordini | - |
| **Analytics** | `(dashboard)/analytics/` | Dashboard analytics | 15KB |
| **Prep Time** | `(dashboard)/analytics/prep-time/` | Analytics tempo prep | 23KB |
| **Reservations** | `(dashboard)/reservations/` | Sistema prenotazioni | - |
| **Settings** | `(dashboard)/settings/` | 17 pagine settings | - |
| **Team** | `(dashboard)/team/` | Gestione staff | - |
| **QR Codes** | `(dashboard)/qr-codes/` | Generatore QR | - |
| **Marketing** | `(dashboard)/marketing/` | 10 sotto-sezioni | - |

### 2.3 Services Principali

| Service | Path | Scopo |
|---------|------|-------|
| **AI Chat** | `lib/ai/chat-service.ts` | Main AI interface |
| **AI Knowledge** | `lib/ai/knowledge-service.ts` | Data access layer |
| **AI Actions** | `lib/ai/actions-service.ts` | Action execution |
| **AI Proactivity** | `lib/ai/proactivity-service.ts` | Daily briefings |
| **AI Social** | `lib/ai/social-media-service.ts` | Social posts |
| **AI Financial** | `lib/ai/financial-service.ts` | P&L, budgets |
| **Analytics** | `lib/analytics-service.ts` | Business analytics |
| **Loyalty** | `lib/loyalty-service.ts` | Loyalty program |
| **Reservations** | `lib/reservations/` | 7 file sistema prenotazioni |
| **Schedule** | `lib/schedule-service.ts` | Orari apertura |
| **Events** | `lib/events-service.ts` | Eventi merchant |
| **Staff** | `lib/staff-service.ts` | Gestione staff |
| **Coupons** | `lib/coupon-service.ts` | Sistema coupon |
| **Gift Cards** | `lib/gift-card-service.ts` | Gift cards |
| **ETA Prediction** | `lib/eta-prediction-service.ts` | ML prep time |

### 2.4 Features Chiave

| Feature | Status | Note |
|---------|--------|------|
| AI Co-Manager | LIVE | 15 services AI |
| Multi-tenant | LIVE | Domain-based + subdomain |
| Reservations | LIVE | 14 sprint completati |
| QR Builder | LIVE | v2 in planning |
| Analytics | LIVE | Prep time, orders, revenue |
| i18n | LIVE | EN/IT completo |
| 2FA | TESTING | TOTP-based |
| Push Notifications | LIVE | Web Push |
| Audit Log | LIVE | Activity tracking |

---

## 3. Database (`shared/database/`)

### 3.1 Overview

| Metrica | Valore |
|---------|--------|
| **Migrations** | 89 file |
| **Righe SQL** | 29,263 |
| **Tabelle principali** | 70+ |
| **RLS Policies** | Attive su tutte le tabelle |

### 3.2 Tabelle Principali

| Tabella | Sistema | Scopo | Relazioni Chiave |
|---------|---------|-------|------------------|
| `accounts` | P5 | Account unificato | `account_roles`, `health_profiles` |
| `account_roles` | P5 | Ruoli utente | `accounts`, `merchants` |
| `health_profiles` | P5 | Preferenze alimentari | `accounts` |
| `merchants` | Core | Merchant/ristoranti | `locations`, `menu_items` |
| `locations` | Core | Sedi fisiche | `merchants` |
| `menu_items` | Menu | Prodotti | `categories`, `ingredients` |
| `categories` | Menu | Categorie menu | `merchants` |
| `orders` | Orders | Ordini | `accounts`, `locations` |
| `order_items` | Orders | Righe ordine | `orders`, `menu_items` |
| `ai_conversations` | AI | Chat history | `merchants` |
| `ai_daily_briefings` | AI | Briefing giornalieri | `merchants` |
| `ai_alerts` | AI | Alert proattivi | `merchants` |
| `reservations` | Reservations | Prenotazioni | `locations`, `accounts` |
| `events` | Events | Eventi merchant | `merchants` |
| `hot_action_requests` | Hot Actions | Richieste clienti | `locations` |
| `customer_feedback` | Feedback | Reviews | `accounts`, `merchants` |
| `merchant_followers` | Social | Followers | `accounts`, `merchants` |

### 3.3 Schema Patterns

| Pattern | Uso | Esempio |
|---------|-----|---------|
| **UUID Primary Keys** | Tutte le tabelle | `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` |
| **Soft Delete** | Entità principali | `deleted_at TIMESTAMPTZ` |
| **Audit Fields** | Tutte le tabelle | `created_at`, `updated_at` |
| **JSONB Metadata** | Flessibilità | `metadata JSONB DEFAULT '{}'` |
| **TEXT + CHECK** | No ENUM | `status TEXT CHECK (status IN ('pending', 'completed'))` |
| **RLS Policies** | Security | `FOR SELECT USING (auth.uid() = user_id)` |

### 3.4 Migrations Importanti

| Migration | Descrizione |
|-----------|-------------|
| `001-enable-rls-all-tables.sql` | RLS su tutte le tabelle |
| `005-modifiers-system.sql` | Sistema modificatori (21KB) |
| `012-multi-tenant-architecture.sql` | Multi-tenancy |
| `020-food-databases-schema.sql` | Food DB schema (27KB) |
| `027-ai-comanager.sql` | AI Co-Manager tables |
| `041-fix-core-rls-policies.sql` | Fix RLS policies |
| `064-audit-log.sql` | Audit logging |
| `076-order-timing-aggregates.sql` | Analytics timing |

### 3.5 Convenzioni

- **Lingua**: English only nel database
- **Naming**: snake_case per tabelle e colonne
- **IDs**: UUID, mai caratteri g-z
- **Arrays**: PostgreSQL syntax `'{"a","b"}'` non `'["a","b"]'`
- **Translations**: Tabella separata, non colonne duplicate

---

## 4. Documentazione Esistente

### 4.1 Utili (da preservare)

| File | Path | Contenuto | Valore |
|------|------|-----------|--------|
| **CLAUDE.md** | `/CLAUDE.md` | Context file principale | CRITICO |
| **DATABASE-SCHEMA.md** | `docs/reference/` | Schema completo | ALTO |
| **PRODUCT.md** | `docs/reference/` | Spec prodotto (63KB) | ALTO |
| **IMPLEMENTATION-GUIDE.md** | `docs/design/` | Guida PWA v2 | ALTO |
| **AI-SYSTEM.md** | `docs/core/` | Sistema AI | ALTO |
| **RUNBOOK.md** | `docs/core/` | Incident response | ALTO |
| **VERCEL-SETUP.md** | `docs/core/` | Config Vercel | MEDIO |
| **lessons/*.md** | `docs/core/lessons/` | 7 file di lezioni | ALTO |
| **SCALE-ROADMAP.md** | `docs/roadmaps/` | Scaling roadmap (67KB) | ALTO |
| **SECURITY-ROADMAP.md** | `docs/roadmaps/` | Security roadmap | ALTO |
| **TESTING-STRATEGY.md** | `docs/reference/` | Testing patterns (43KB) | MEDIO |
| **GIANFRANCO.md** | `docs/` | User preferences | MEDIO |

### 4.2 Obsoleti (da archiviare)

| File | Path | Motivo |
|------|------|--------|
| **LESSONS-LEARNED.md** | `docs/archive/` | Migrato a `lessons/*.md` |
| **DATABASE-INVENTORY-OLD.md** | `docs/archive/` | Sostituito da nuovo |
| **DEVELOPMENT-PROCEDURE.md** | `docs/archive/` | Integrato in CLAUDE.md |
| **SESSION-LOG.md** | `docs/archive/` | Log storico, non operativo |
| **VERCEL-RECOVERY-PLAN.md** | `docs/archive/` | Completato |
| **Audits vecchi** | `docs/archive/audits-old/` | Superati |

### 4.3 Mancanti (da creare)

| Argomento | Perche Serve | Priorita |
|-----------|--------------|----------|
| **CUSTOMIZATIONS-SYSTEM.md** | Sistema complesso, non documentato | ALTA |
| **V2-MIGRATION-GUIDE.md** | Transizione v1→v2 non chiara | ALTA |
| **TIER-SYSTEM.md** | Logica tier sparsa | MEDIA |
| **MULTI-TENANT.md** | Architettura multi-tenant | MEDIA |
| **COMPONENT-CATALOG.md** | Catalogo componenti v2 | MEDIA |
| **API-REFERENCE.md** | Documentazione API routes | BASSA |

---

## 5. Config e Infra

### 5.1 Vercel Setup

| App | Project | Domain |
|-----|---------|--------|
| Backoffice | gudbro-backoffice | gudbro-backoffice.vercel.app |
| Coffeeshop | gudbro-coffeeshop-pwa | gudbro-coffeeshop-pwa.vercel.app |
| Website | gudbro-website | gudbro-website.vercel.app |

### 5.2 Environment Variables Chiave

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
OPENAI_API_KEY=

# Caching
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Monitoring
SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Background Jobs
TRIGGER_API_KEY=

# Security
TOTP_ENCRYPTION_KEY=
CRON_SECRET=
```

### 5.3 Scripts Utili

| Script | Comando | Scopo |
|--------|---------|-------|
| Dev servers | `pnpm dev:backoffice`, `pnpm dev:coffeeshop` | Start dev |
| Build | `pnpm build` | Build all |
| Typecheck | `pnpm typecheck` | TypeScript check |
| Test | `pnpm test:run` | Run tests |
| E2E | `pnpm test:e2e` | Playwright tests |
| Type gen | `pnpm generate:types` | Supabase types |

### 5.4 Claude Commands

| Comando | Path | Scopo |
|---------|------|-------|
| `/start-session` | `.claude/commands/` | Inizio sessione |
| `/end-session` | `.claude/commands/` | Fine sessione |
| `/deploy` | `.claude/commands/` | Build + push |
| `/verify` | `.claude/commands/` | Verifica pre-deploy |
| `/qa-quick` | `.claude/commands/` | Quick QA |
| `/db-status` | `.claude/commands/` | Status database |
| `/new-feature` | `.claude/commands/` | Template nuova feature |
| `/ralph-loop` | `.claude/commands/` | Loop iterativo |

---

## 6. Raccomandazioni

### 6.1 Struttura Second Brain Proposta

```
docs/
├── core/                    # ⭐ Uso quotidiano
│   ├── lessons/             # Lezioni per argomento (OK)
│   ├── RUNBOOK.md           # Incident response (OK)
│   ├── VERCEL-SETUP.md      # Config (OK)
│   └── AI-SYSTEM.md         # AI docs (OK)
├── reference/               # Consultazione
│   ├── DATABASE-SCHEMA.md   # Schema (OK)
│   ├── PRODUCT.md           # Product spec (OK)
│   ├── SISTEMA-FILTRI.md    # Safety filters (OK)
│   ├── CUSTOMIZATIONS.md    # 🆕 DA CREARE
│   ├── TIER-SYSTEM.md       # 🆕 DA CREARE
│   └── API-REFERENCE.md     # 🆕 DA CREARE
├── design/                  # Design & UI
│   ├── IMPLEMENTATION-GUIDE.md  # v2 guide (OK)
│   ├── COMPONENT-CATALOG.md # 🆕 DA CREARE
│   └── references/          # Screenshots (OK)
├── architecture/            # 🆕 NUOVA CARTELLA
│   ├── MULTI-TENANT.md      # Multi-tenant arch
│   ├── AUTH-FLOW.md         # Auth documentation
│   └── DATA-FLOW.md         # Data flow diagrams
├── roadmaps/                # Pianificazione (OK)
├── backlog/                 # Kanban (OK)
├── features/                # Feature specs (OK)
└── archive/                 # Obsoleti (OK)
```

### 6.2 Priorita Azioni

#### Priorita 1 (Questa Settimana)

1. **Creare CUSTOMIZATIONS-SYSTEM.md**
   - Documentare sistema modificatori
   - Esempi di configurazione
   - Pattern di implementazione

2. **Creare V2-MIGRATION-GUIDE.md**
   - Mappatura componenti v1 → v2
   - Pattern da seguire
   - Cosa evitare

#### Priorita 2 (Prossime 2 Settimane)

3. **Creare TIER-SYSTEM.md**
   - Documentare tutti i tier
   - Feature per tier
   - Logica gating

4. **Creare MULTI-TENANT.md**
   - Domain resolution
   - Data isolation
   - RLS patterns

#### Priorita 3 (Prossimo Mese)

5. **Creare COMPONENT-CATALOG.md**
   - Lista componenti v2
   - Props documentate
   - Esempi di uso

6. **Creare API-REFERENCE.md**
   - Documentare API routes
   - Request/Response examples
   - Error handling

### 6.3 Quick Reference per Claude

Quando Claude inizia una sessione, deve leggere:

| Task Type | File da Leggere |
|-----------|-----------------|
| **Sempre** | `CLAUDE.md` (sezioni 0-1) |
| **Sviluppo PWA** | `docs/design/IMPLEMENTATION-GUIDE.md` |
| **Database** | `docs/reference/DATABASE-SCHEMA.md` + `docs/core/lessons/database.md` |
| **AI System** | `docs/core/AI-SYSTEM.md` |
| **Deploy** | `docs/core/VERCEL-SETUP.md` + `docs/core/lessons/vercel.md` |
| **Errori** | `docs/core/lessons/[topic].md` |

---

## Appendice A: File Counts per App

| App | .ts/.tsx | .css | .json | Total |
|-----|----------|------|-------|-------|
| coffeeshop/frontend | 335 | ~5 | ~10 | ~350 |
| backoffice | 725 | ~5 | ~10 | ~740 |
| waiter | ~50 | ~2 | ~5 | ~57 |
| rentals | ~30 | ~2 | ~5 | ~37 |
| wellness | ~30 | ~2 | ~5 | ~37 |
| website | ~10 | ~2 | ~3 | ~15 |
| **Totale apps** | **1,163** | | | |

## Appendice B: Supabase Tables Count

```
Core: ~15 tabelle
P5 Account: ~5 tabelle
Menu: ~10 tabelle
Orders: ~5 tabelle
AI: ~20 tabelle
Reservations: ~5 tabelle
Analytics: ~5 tabelle
Other: ~10 tabelle
---
Total: ~75 tabelle
```

---

**Fine Audit**

*Questo documento dovrebbe essere aggiornato ogni volta che ci sono cambiamenti strutturali significativi al progetto.*
