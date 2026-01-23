# ✅ DONE

> Archivio storico delle task completate.
> Organizzato per data (più recenti in alto).

**Last Updated:** 2026-01-23

---

## 2026-01-23

| ID            | Feature                | Descrizione                                                                                                                                             | Completato |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| INFRA-UPGRADE | Infrastructure Upgrade | 7 fasi: Vercel Pro, website separation, staging env, vercel.json, monitoring (Sentry+UptimeRobot), docs (VERCEL-SETUP, RUNBOOK), CLAUDE.md optimization | 2026-01-23 |
| SENTRY-VERIFY | Sentry Verification    | Test endpoint `/api/test/sentry`, verificato errori arrivano su dashboard, CRON_SECRET configurato                                                      | 2026-01-23 |
| CLAUDE-V8     | CLAUDE.md Optimization | Ridotto da 1063→265 righe (-75%), creati satellite files: LESSONS-LEARNED.md, AI-SYSTEM.md                                                              | 2026-01-23 |

> **INFRA-UPGRADE Details:**
>
> **7 Fasi Completate:**
>
> 1. Recovery backoffice - Upgrade Vercel Pro ($20/mo)
> 2. Website separation - Repo standalone `elite42/gudbro-website`
> 3. Staging environment - Supabase `gudbro-staging` project
> 4. Infrastructure as Code - vercel.json con framework, regions, git config
> 5. Monitoring - Sentry error tracking + UptimeRobot uptime + GitHub Action verify-deploy
> 6. Documentation - VERCEL-SETUP.md + RUNBOOK.md
> 7. CLAUDE.md optimization - Satellite files per lettura contestuale
>
> **Files Created:**
>
> - `docs/VERCEL-SETUP.md` - Guida configurazione Vercel
> - `docs/RUNBOOK.md` - Procedure incident response
> - `docs/LESSONS-LEARNED.md` - Errori categorizzati (DB, Vercel, TS, Git)
> - `docs/AI-SYSTEM.md` - Documentazione AI Co-Manager
> - `.github/workflows/verify-deploy.yml` - Post-deploy health check
> - `apps/backoffice/app/api/test/sentry/route.ts` - Sentry test endpoint

---

## 2026-01-21

| ID              | Feature            | Descrizione                                                                                                                             | Completato |
| --------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| CI-PIPELINE-FIX | CI/CD Pipeline Fix | Risolto problema CI che falliva mentre locale passava. 3 fix: Prisma generate in typecheck, e2e exclusion da Vitest, Supabase lazy-init | 2026-01-21 |

> **CI-PIPELINE-FIX Details:**
>
> **Root Causes Identified & Fixed:**
>
> 1. **Prisma types not generated** - CI runs typecheck before build, but only build had `prisma generate`
>    - Fix: `"typecheck": "prisma generate && tsc --noEmit"` in package.json
> 2. **Playwright e2e tests picked up by Vitest** - `.spec.ts` files in `/e2e/` folder
>    - Fix: Added `'**/e2e/**'` to vitest.config.ts exclude array
> 3. **API routes creating Supabase client at module level** - Build fails when env vars not available
>    - Fix: Use `import { supabaseAdmin } from '@/lib/supabase-admin'` (lazy-init via Proxy)
>    - Files fixed: `/api/customers/[accountId]/accommodation`, `/api/exchange-rates/refresh`, `/api/qr/r/[code]`, `/api/send-push`
>
> **Files Modified:**
>
> - `apps/backoffice/package.json` - Added prisma generate to typecheck
> - `vitest.config.ts` - Added e2e exclusion
> - 4 API route files - Changed to use supabaseAdmin
> - `scripts/ci-local.sh` - CI simulation script (created earlier)
> - `.nvmrc` - Node version pinning (created earlier)
>
> **Commits:**
>
> - `5b73880` - fix(backoffice): add prisma generate to typecheck script
> - `540a391` - fix(tests): exclude e2e folder from vitest
> - `64584be` - fix(api): use lazy-initialized supabaseAdmin in API routes
>
> **Result:** GitHub Actions CI #150 and Test Suite #38 both GREEN

---

## 2026-01-20

| ID                  | Feature                | Descrizione                                                                                                                | Completato |
| ------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- |
| AI-KNOWLEDGE        | AI Platform Knowledge  | AI Co-Manager ora conosce la piattaforma: navigazione sidebar, dove trovare feature, how-to guides per task comuni.        | 2026-01-20 |
| DATA-CONSISTENCY    | Customer Data Fix      | Fix Intelligence Map API per filtrare per merchant_id. Prima mostrava tutti i 49 account, ora solo quelli del merchant.    | 2026-01-20 |
| BACKOFFICE-TOOLTIPS | Contextual Help System | Sistema tooltips contestuali con InfoTooltip component. ~65 pagine con help icons + KB links. Radix UI Tooltip base.       | 2026-01-20 |
| BACKOFFICE-I18N     | Internazionalizzazione | Sistema i18n completo con next-intl. EN/IT supportate. ~45 pagine tradotte, LanguageSwitcher, middleware locale detection. | 2026-01-20 |

> **AI-KNOWLEDGE Files:**
>
> - New: `lib/ai/platform-knowledge.ts` - Complete navigation structure, feature finder, how-to guides
> - Modified: `lib/ai/knowledge-service.ts` - Integrates platform knowledge into AI context
> - Modified: `lib/ai/prompts.ts` - Added platform navigation guidance to system prompt
>
> **Features:**
>
> - AI knows where every feature is (sidebar navigation)
> - Answers "where is X?" questions (promo codes, gift cards, loyalty, etc.)
> - Provides step-by-step how-to instructions
> - Includes URLs for direct navigation

> **DATA-CONSISTENCY Files:**
>
> - Fixed: `app/api/intelligence/map/route.ts`
>
> **Issue:**
>
> - Intelligence Map showed 49 customers, Customers page showed 0
> - Root cause: API queried ALL accounts without merchant_id filter
> - Security concern: Cross-merchant data visibility
>
> **Fix:**
>
> - Now filters accounts by merchant relationship (followers, loyalty, wallets, orders)
> - Only shows customers who have interacted with this merchant

> **BACKOFFICE-TOOLTIPS Files:**
>
> - Dependency: `@radix-ui/react-tooltip`
> - Components: `components/ui/tooltip.tsx`, `components/ui/info-tooltip.tsx`
> - Provider: `app/providers.tsx` (TooltipProvider wrapper)
> - Sidebar: `components/layout/Sidebar.tsx` (nav item tooltips)
> - i18n: `messages/en.json`, `messages/it.json` (tooltips section)
> - Pages: ~65 dashboard pages updated with InfoTooltip
>
> **Features:**
>
> - Help icon (ℹ️) next to page titles and nav items
> - Hover tooltip with brief explanation
> - "Learn more" link to Knowledge Base page
> - Fully i18n integrated (EN/IT)
> - Excluded: Dynamic routes ([id], [slug]) and help page itself

> **BACKOFFICE-I18N Files:**
>
> - Config: `lib/i18n/config.ts`, `lib/i18n/request.ts`, `middleware.ts`
> - Provider: `app/providers.tsx`, `app/layout.tsx`
> - Messages: `messages/en.json`, `messages/it.json` (~2500 keys each)
> - Component: `components/settings/LanguageSwitcher.tsx`
> - Pages Updated: ~45 pages (dashboard, orders, marketing, content, customers, settings, analytics, team, billing, partnerships, qr-codes)
>
> **Features:**
>
> - Locale detection via middleware (Accept-Language header)
> - User preference persistence (localStorage + cookie)
> - Server-side locale via next-intl
> - Extensible for future languages (zh, es, fr, etc.)

---

## 2026-01-19

| ID                       | Feature                 | Descrizione                                                                                                                                 | Completato |
| ------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| GIFT-CARDS-PROMO-COUPONS | Sistema Sconti Completo | Gift Cards (acquisto/riscatto wallet), Promo Codes (marketing), Coupons (personali). Migration 069, 4 services, 9 API routes, 3 UI pages.   | 2026-01-19 |
| PWA-FULL-SITE            | PWA → Sito Web          | Responsive website transformation: DesktopNav, Footer, responsive grids, MenuSidebar, About/Contact pages, color customization system       | 2026-01-19 |
| WEATHER-GEO-CACHE        | Geo-Based Weather Cache | Ottimizzazione cache meteo per area geografica (~10km). 500 locali stessa citta = 1 API call invece di 500. Migration 066, weather-service. | 2026-01-19 |

> **GIFT-CARDS-PROMO-COUPONS Files:**
>
> - Migration: `shared/database/migrations/schema/069-gift-cards-promo-coupons.sql` (8 tabelle + RLS + funzioni)
> - Services: `gift-card-service.ts`, `promo-code-service.ts`, `coupon-service.ts`, `checkout-discount-service.ts`
> - API Routes: `/api/gift-cards/*` (6), `/api/promo-codes/*` (4), `/api/coupons/*` (4)
> - UI Pages: `/marketing/gift-cards`, `/marketing/promo-codes`, `/marketing/coupons`
>
> **Features:**
>
> - Gift Cards: Acquisto → Email delivery → Riscatto → Credito wallet
> - Promo Codes: Marketing codes con limiti uso, validità, condizioni
> - Coupons: Template + emissione personale, auto-distribution (birthday)
> - Checkout Integration: Stacking rules, calcolo sconti, order_discounts tracking

> **PWA-FULL-SITE Files:**
>
> - Hook: `hooks/useBreakpoint.ts` - SSR-safe breakpoint detection
> - Layout: `components/layout/Container.tsx`, `DesktopNav.tsx`, `ResponsiveNav.tsx`, `Footer.tsx`
> - Menu: `components/menu/MenuSidebar.tsx`, `MenuDesktopLayout.tsx`
> - Pages: `app/about/page.tsx`, `app/contact/page.tsx`
> - Color: `lib/theme/color-generator.ts` - HSL palette generation
> - Modified: `CategorySection.tsx`, `PopularSection.tsx` (responsive grids), `BottomNavLocal.tsx` (lg:hidden)
>
> **Impact:** Mobile-only PWA → Full responsive website for desktop/tablet with brand color customization

> **WEATHER-GEO-CACHE Files:**
>
> - Migration: `shared/database/migrations/schema/066-weather-geo-cache.sql`
> - Service: `apps/backoffice/lib/ai/weather-service.ts`
>
> **Impact:** ~99% reduction in Visual Crossing API calls for clustered locations

---

## 2026-01-18

| ID                   | Feature                     | Descrizione                                                                                                     | Completato |
| -------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------- |
| TEST-CI              | GitHub Actions CI           | Pipeline CI con lint, typecheck, unit tests. Fixed 14 failing tests (canvas mock, QR panel). 2003 tests passing | 2026-01-18 |
| TEST-WALLET          | Wallet Service Tests        | 117 test cases for financial logic: currency formatting, cents conversion, bonus calculations, balance logic    | 2026-01-18 |
| TEST-LOYALTY         | Loyalty Service Tests       | 187 test cases: tier calculation, points earning, social sharing URLs, referrals, stats. Types + service tests  | 2026-01-18 |
| TEST-AUTH            | Auth Flow Tests             | 76 test cases: user conversion, error messages, email/password validation, session state, token handling        | 2026-01-18 |
| TEST-E2E-CRITICAL    | Playwright E2E Tests        | 35 E2E tests: menu view (23 tests), order flow (12 tests). Config, mobile/tablet responsive, performance        | 2026-01-18 |
| SEC-ERROR-HANDLING   | API Error Handling          | Try-catch su tutti i routes API (3 file fixati: escalations, conversations, partner-branding)                   | 2026-01-18 |
| SEC-HEADERS          | Security HTTP Headers       | Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, HSTS, Permissions-Policy via next.config.js   | 2026-01-18 |
| SEC-AUDIT-LOG        | Audit Log System            | Migration 064, audit_logs table, AuditService, /settings/audit-log page with filters                            | 2026-01-18 |
| ALERTS-DASHBOARD     | System Alerts Dashboard     | /settings/system-alerts, /api/health/alerts, performance/error/capacity alerts with thresholds                  | 2026-01-18 |
| SCALE-METRICS        | Metrics Collection          | lib/observability/metrics.ts with Redis time-series, P50/P95/P99 calculations                                   | 2026-01-18 |
| SCALE-TRIGGER        | Trigger.dev Background Jobs | Background job system via Trigger.dev for notifications, analytics aggregation, AI briefings                    | 2026-01-18 |
| SCALE-REALTIME       | Supabase Realtime Chat      | WebSocket real-time for chat conversations, replaced 5s polling                                                 | 2026-01-18 |
| SCALE-PARTITIONING   | Analytics Partitioning      | Migration 060: Monthly partitions for analytics_events, auto-partition function                                 | 2026-01-18 |
| SCALE-MAT-VIEWS      | Materialized Views          | Migration 061: Pre-computed dashboard aggregates (daily, top items, device, hourly)                             | 2026-01-18 |
| SCALE-OPTIMISTIC     | Optimistic Updates          | React Query with optimistic mutations, rollback on error, KDS integration                                       | 2026-01-18 |
| SCALE-READ-REPLICA   | Read Replica Config         | lib/supabase-read-replica.ts with lazy proxy, analytics-service integration                                     | 2026-01-18 |
| SCALE-SHARDING       | Sharding Preparation        | Migration 062: shard_id columns, assign_shard function, triggers, indexes, v_shard_distribution view            | 2026-01-18 |
| SCALE-ARCHIVE        | Archive Strategy            | Migration 063: cold_storage schema, archive tables, archive functions, RLS                                      | 2026-01-18 |
| SCALE-MULTI-REGION   | Multi-Region Deploy         | vercel.json with iad1/sfo1/cdg1 regions, function config, maintenance crons                                     | 2026-01-18 |
| SCALE-EDGE-CACHE     | Edge Caching                | lib/cache/edge-cache.ts with Vercel KV support, LRU fallback                                                    | 2026-01-18 |
| SCALE-COALESCING     | Request Coalescing          | lib/cache/request-coalescing.ts to prevent thundering herd                                                      | 2026-01-18 |
| SCALE-TENANT-CONTEXT | Tenant Context              | lib/tenancy/tenant-context.ts with AsyncLocalStorage, tier/feature checks                                       | 2026-01-18 |
| SCALE-PERF-BUDGETS   | Performance Budgets         | lib/observability/performance-budgets.ts with P50/P95/P99 targets per operation                                 | 2026-01-18 |

> **SCALING INITIATIVE Phase 2 & 3 Files:**
>
> - Phase 2 Migrations: `060-analytics-partitioning.sql`, `061-analytics-materialized-views.sql`
> - Phase 3 Migrations: `062-sharding-preparation.sql`, `063-archive-strategy.sql`
> - Background Jobs: `trigger.config.ts`, `lib/triggers/` (notifications, ai, analytics)
> - Realtime: `lib/realtime/chat-channel.ts`
> - Query: `lib/query/` (QueryProvider, use-order-mutations, use-menu-mutations)
> - Caching: `lib/cache/edge-cache.ts`, `lib/cache/request-coalescing.ts`
> - Tenancy: `lib/tenancy/tenant-context.ts`
> - Observability: `lib/observability/performance-budgets.ts`
> - Read Replica: `lib/supabase-read-replica.ts`
> - Maintenance: `/api/maintenance/archive`, `/api/maintenance/refresh-views`
>
> **Phase 2 Summary:** Background jobs (Trigger.dev), real-time chat, analytics partitioning, materialized views, optimistic updates
> **Phase 3 Summary:** Multi-region deployment, edge caching, request coalescing, tenant isolation, sharding prep, archive strategy

> **TESTING INITIATIVE Files:**
>
> - CI Pipeline: `.github/workflows/test.yml`
> - Wallet Tests: `apps/backoffice/lib/__tests__/wallet-service.test.ts` (117 tests)
> - Loyalty Tests: `apps/coffeeshop/frontend/types/__tests__/loyalty.test.ts` (92 tests), `apps/backoffice/lib/__tests__/loyalty-service.test.ts` (95 tests)
> - Auth Tests: `apps/coffeeshop/frontend/lib/__tests__/auth-service.test.ts` (76 tests)
> - E2E Config: `playwright.config.ts`
> - E2E Menu Tests: `e2e/menu.spec.ts` (23 tests)
> - E2E Order Tests: `e2e/order-flow.spec.ts` (12 tests)
>
> **Testing Summary:** Total 2418 tests passing (2383 unit + 35 E2E). Focus on pure function testing, business logic, and critical user flows.

---

## 2026-01-17

| ID                | Feature                      | Descrizione                                                                                 | Completato |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------------------- | ---------- |
| SCALE-ROADMAP     | Scaling Roadmap Document     | 5-phase roadmap 100→10M users, 10 critical problems identified, Phase 1-5 planning          | 2026-01-17 |
| SECURITY-ROADMAP  | Security Roadmap Document    | 4-phase security hardening plan, authentication, authorization, audit logging               | 2026-01-17 |
| TESTING-STRATEGY  | Testing Strategy Document    | Test coverage strategy from 1.5% to 80%, unit/integration/e2e planning                      | 2026-01-17 |
| SCALE-REDIS       | Upstash Redis Caching        | Redis caching layer with @upstash/redis, cache keys pattern, TTLs, menu caching             | 2026-01-17 |
| SCALE-RATE-LIMIT  | Rate Limiting                | @upstash/ratelimit for API/auth/AI endpoints, sliding window algorithm                      | 2026-01-17 |
| SCALE-INDEXES     | Database Performance Indexes | Migration 057: indexes for menu, analytics, orders, accounts, JSONB                         | 2026-01-17 |
| SCALE-CDN         | CDN Headers                  | next.config.js headers for static assets and API caching (s-maxage, stale-while-revalidate) | 2026-01-17 |
| SCALE-SENTRY      | Sentry Error Tracking        | Sentry integration for error tracking, performance monitoring, AI error capture             | 2026-01-17 |
| SCALE-LOGGING     | Structured Logging           | Pino logger with request context, redaction, log levels, pino-pretty for dev                | 2026-01-17 |
| SCALE-NOTIF-QUEUE | Notification Queue           | Async notification system, notification_queue table, non-blocking order creation            | 2026-01-17 |
| SCALE-ZOD         | Zod API Validation           | Zod schema validation for API routes, type inference, error responses                       | 2026-01-17 |
| SCALE-N1-FIX      | N+1 Query Fixes              | Optimized queries with JOINs instead of N+1 loops, cache integration                        | 2026-01-17 |

> **SCALING INITIATIVE Phase 1 Files:**
>
> - Roadmaps: `docs/SCALE-ROADMAP.md`, `docs/SECURITY-ROADMAP.md`, `docs/TESTING-STRATEGY.md`
> - Caching: `lib/cache/redis.ts`, `lib/cache/keys.ts`
> - Security: `lib/security/rate-limiter.ts`, `middleware.ts` (rate limit integration)
> - Database: `migrations/schema/057-performance-indexes.sql`, `migrations/schema/058-notification-queue.sql`
> - Observability: `lib/observability/logger.ts`, `lib/observability/sentry.ts`, `sentry.*.config.ts`
> - Validation: `lib/validation/schemas.ts`, API route updates
>
> **Phase 1 Summary:** Foundation layer for scaling - caching, rate limiting, indexes, observability, async patterns

---

## 2026-01-16

| ID        | Feature                   | Descrizione                                                                                                                  | Completato |
| --------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| SMART-MAP | Business Intelligence Map | Interactive Leaflet map: customers, competitors, partners, leads. Filters, clustering, quick actions, geocoding, loyalty svc | 2026-01-16 |

> **SMART-MAP Files:**
>
> - Components: `components/map/` (13 files - SmartMap, MapContainer, MapFilters, MapStatsPanel, MapLegend, markers/_, panels/_, hooks/\*, types)
> - APIs: `/api/intelligence/map`, `/api/quick-actions`
> - Services: `lib/geocoding-service.ts`, `lib/loyalty-service.ts`
> - Infrastructure: Leaflet + react-leaflet-cluster, Sidebar with Intelligence link
> - Features: Radius filter (1-25km), date filters, customer status, entity toggles, wallet/loyalty quick actions
>
> **Test Data (ROOTS My Khe):**
>
> - 35 fake customers (21 tourists, 14 residents) with varied tiers and statuses
> - 6 competitors within 1km radius
> - 4 hotel partners with different partnership statuses
> - Zone analysis and AI bootstrap results populated

---

## 2026-01-15

| ID                        | Feature                | Descrizione                                                                                                       | Completato |
| ------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------- |
| AI-CUSTOMER-CHAT          | AI Customer Chat       | 6 sprint: DB schema, chat service, actions (reservations/menu), channel webhooks, escalation, chat widget PWA     | 2026-01-15 |
| RESERVATIONS-SYSTEM       | Sistema Prenotazioni   | 14 sprint: tavoli, floor plan, prenotazioni, wallet, notifiche multi-canale, calendar UI, floor plan editor       | 2026-01-15 |
| WHITE-LABEL-FULL          | White-Label Multi-Tier | 8 sprint: custom domains, domain resolution, middleware, branding, domain UI, multi-location, partner portal      | 2026-01-15 |
| AI-FIRST-REDESIGN         | Backoffice AI-First    | 5 sprint: AI priorities, inline triggers, confidence scores, mobile command center, scenario detection            | 2026-01-15 |
| HOLIDAYS-DB               | Holidays Database      | DB festività centralizzato, 3 tabelle (holidays, overrides, custom), service layer, API, AI context integration   | 2026-01-15 |
| MT-KDS                    | Kitchen Display        | Audio alerts, keyboard shortcuts (bump bar), flash animation, sound toggle, 2 layout modes (grid/columns)         | 2026-01-15 |
| B2B-CONVENTIONS           | Corporate Conventions  | Sistema convenzioni B2B: offices, gyms, schools. 5 tabelle DB, service layer, API, 5 UI pages, staff verification | 2026-01-15 |
| ORDER-READY-NOTIFICATIONS | Web Push Phase 2       | Service Worker push, subscription API, backend sender, kitchen trigger, UI toggle ordini                          | 2026-01-15 |

> **AI-CUSTOMER-CHAT Files:**
>
> - Migration: `056-customer-chat.sql` (customer_conversations, customer_messages, conversation_escalations)
> - Services: `customer-chat-service.ts`, `customer-context-service.ts`, `customer-actions-service.ts`, `customer-prompts.ts`, `channel-router.ts`
> - API Routes: `/api/chat/customer`, `/api/chat/conversations/*`, `/api/chat/escalations`, `/api/chat/webhook/*` (whatsapp, telegram, line, zalo)
> - Backoffice UI: `/chat/escalations/page.tsx`
> - Widget: `ChatWidget.tsx`, `ChatWindow.tsx` (coffeeshop PWA)
> - Features: Multi-language (EN/VI/IT), OpenAI gpt-4o-mini, function calling for reservations/menu, escalation detection, quick replies

> **WHITE-LABEL-FULL Files:**
>
> - Migration: `052-custom-domains.sql` (custom_domain su brands/locations, domain_verifications, subscription_plan_limits)
> - Services: `domain-resolution-service.ts`, `vercel-api.ts`, `partner-service.ts`
> - Middleware: Updated coffeeshop + backoffice middleware for domain resolution
> - Contexts: `PartnerBrandingContext.tsx`, `useTenantContext.ts`, `useBrandTheme.ts`
> - UI Pages: `/settings/domain`, `/partner/*` (dashboard, organizations)
> - Components: `LocationPicker.tsx`, `BrandingLogo.tsx`
> - APIs: `/api/partner-branding`, `/api/settings/domain`, `/api/tenant-context`
>
> **AI-FIRST-REDESIGN Files:**
>
> - Components: `AIPriorityCard.tsx`, `AIInlineTrigger.tsx`, `MobileCommandCenter.tsx`, `ScenarioBanner.tsx`
> - Services: `scenario-detection.ts`
> - Hooks: `useIsMobile.ts`
> - Sprint 1: Food Cost triggers, Weather integration
> - Sprint 2: 5-question template, inline triggers
> - Sprint 3: Confidence scores, feedback buttons, humanized language
> - Sprint 4: Mobile-first command center
> - Sprint 5: Scenario detection (5 mother scenarios)

> **HOLIDAYS-DB Files:**
>
> - Migration: `051-holidays-database.sql` (3 tabelle + RLS + seed 11 Vietnamese holidays)
> - Service: `lib/ai/holidays-service.ts` (CRUD, impact analysis, AI context)
> - API: `/api/ai/holidays` (GET: upcoming, date, custom, impact, context, search, year)
> - Integration: `knowledge-service.ts` esteso con holidays context

> **B2B-CONVENTIONS Files:**
>
> - Migration: `050-b2b-conventions.sql` (5 tabelle + RLS)
> - Service: `lib/ai/conventions-service.ts`
> - API: `/api/ai/conventions`
> - UI Pages: `/partnerships/conventions/*` (hub, offices, active, vouchers, verify)
> - KB: 5 nuove pagine in `lib/kb/kb-content.ts`

> **ORDER-READY-NOTIFICATIONS Files:**
>
> - Service Worker: `public/service-worker.js` (push handler)
> - Hook: `hooks/usePushNotifications.ts`
> - API: `/api/push-subscription`, `/api/send-push`
> - Backoffice: `/api/send-push`, kitchen display trigger
> - UI: Push toggle in orders page

---

## 2026-01-13

| ID                   | Feature              | Descrizione                                                                                                                                                                  | Completato |
| -------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| AI-WEATHER-INTEL     | Weather Intelligence | Migration 047: location_weather_cache, Visual Crossing API, weather-service.ts, WeatherWidget, /api/ai/weather, business impact analysis, caching con TTL                    | 2026-01-13 |
| AI-LEARNING-PROGRESS | Learning Progress    | Migration 048: ai_learning_progress, autonomy levels 1-4, learning-progress-service.ts, LearningProgressWidget + Badge, /api/ai/learning-progress, skill domains, milestones | 2026-01-13 |

> **Files:**
>
> - Migrations: `047-weather-intelligence.sql`, `048-ai-learning-progress.sql`
> - Services: `weather-service.ts`, `learning-progress-service.ts`
> - API: `/api/ai/weather`, `/api/ai/learning-progress`
> - UI: `WeatherWidget.tsx`, `LearningProgressWidget.tsx`
> - Features: Weather caching, business impact (delivery/dine-in), autonomy progression, skill tracking

---

## 2026-01-12

| ID                | Feature                   | Descrizione                                                                                                                                                                                  | Completato |
| ----------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| AI-ZONE-INTEL-DB  | Zone Intelligence Phase 1 | Migration 045: 5 tabelle (ai_customer_intelligence, ai_zone_profiles, ai_merchant_knowledge, ai_customer_triggers, ai_customer_trigger_executions), 8 funzioni, 2 views, RLS completo        | 2026-01-12 |
| AI-ZONE-INTEL-SVC | Zone Intelligence Phase 2 | 2 services (customer-intelligence-service.ts, trigger-engine-service.ts), 2 API routes (/api/ai/customer-intelligence, /api/ai/triggers), CLV calc, churn risk, segmentation, CRM automation | 2026-01-12 |
| AI-ZONE-INTEL-UI  | Zone Intelligence Phase 3 | 2 UI pages (/customers/intelligence, /ai/triggers), AI widgets on main AI page, currency formatting from location settings, links from customers page                                        | 2026-01-12 |

> **Files:**
>
> - Migration: `shared/database/migrations/schema/045-ai-zone-intel.sql`
> - Services: `apps/backoffice/lib/ai/customer-intelligence-service.ts`, `apps/backoffice/lib/ai/trigger-engine-service.ts`
> - API: `apps/backoffice/app/api/ai/customer-intelligence/route.ts`, `apps/backoffice/app/api/ai/triggers/route.ts`
> - UI Pages: `apps/backoffice/app/(dashboard)/customers/intelligence/page.tsx`, `apps/backoffice/app/(dashboard)/ai/triggers/page.tsx`
> - AI Page Widgets: Customer Intelligence + Automated Triggers widgets
> - Tabelle: customer_intelligence (CLV, churn risk, segmentation), zone_profiles (POIs, flows), merchant_knowledge (AI memory), customer_triggers (CRM automation), trigger_executions (tracking)
> - Funzioni: get_customers_at_risk, is_customer_trigger_eligible, sync_customer_intelligence_from_analytics, get_merchant_knowledge_context

---

## 2026-01-09

| ID               | Feature               | Descrizione                                                                                                   | Completato |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| UI-SIDEBAR       | Sidebar Improvements  | Sidebar collapsible con pin/unpin, hover expand, unified account dropdown in header, DevRoleSwitcher          | 2026-01-09 |
| UI-ACCOUNT       | Account Page          | Pagina /account per gestione profilo utente, info, email, ruoli, loyalty points                               | 2026-01-09 |
| QR-BUILDER-V2    | QR Builder System     | Sistema completo QR: modal 4-step, URL/WiFi types, design panel, export PNG/SVG/PDF, 313 test, redirect API   | 2026-01-09 |
| QR-BUILDER-TESTS | QR Builder Test Suite | 313 test automatici per QR Builder. 7 file test, 3 bug trovati e fixati (UA parsing). Vedi PRODUCT.md Sez. 15 | 2026-01-09 |

> **Files:**
>
> - QR: `apps/backoffice/lib/qr/`, `apps/backoffice/components/qr/`, `apps/backoffice/app/api/qr/`
> - Sidebar: `apps/backoffice/lib/contexts/SidebarContext.tsx`, `apps/backoffice/components/layout/Sidebar.tsx`
> - Account: `apps/backoffice/app/(dashboard)/account/page.tsx`, `apps/backoffice/components/account/DevRoleSwitcher.tsx`

---

## 2026-01-08

| ID                   | Feature                | Descrizione                                                                                  | Completato |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------------------- | ---------- |
| ING-TRANSLATIONS-ALL | Traduzioni Ingredienti | 2575 ingredienti × 14 lingue = 35,680 traduzioni (it,es,fr,de,pt,vi,zh,ja,ko,th,ru,tr,hi,ar) | 2026-01-08 |

> **Note:** Solo INGREDIENTI tradotti. Piatti e bevande (~4653 prodotti) ancora da fare come task separata.

---

## 2026-01-07

| ID          | Feature             | Descrizione                                                                                           | Completato |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------- | ---------- |
| SEC-CLEANUP | Security Cleanup    | Migrations 039-041: fix function search_path (37), RLS policies AI tables (30+), RLS core tables (12) | 2026-01-07 |
| MAINT-DEPS  | Dependencies Update | Minor deps updated, React 19/Next 16/TW4/Zod 4 documented as future                                   | 2026-01-07 |
| MAINT-TS    | TypeScript Fixes    | Cocktail types extended, export conflicts fixed, vi optional                                          | 2026-01-07 |

---

## 2026-01-06

| ID               | Feature              | Descrizione                                                                             | Completato |
| ---------------- | -------------------- | --------------------------------------------------------------------------------------- | ---------- |
| ING-TRANSLATIONS | Ingredient Transl.   | 1684 traduzioni (137 ingredienti core × 13 lingue: it,vi,ko,ja,ru,zh,th,fr,es,pt,de,tr) | 2026-01-06 |
| LP-SECTIONS      | Landing Page Updates | AICoManagerSection, FoodCostsSection, AnalyticsSection, KitchenDisplaySect              | 2026-01-06 |
| GB-AI-DASH       | AI Dashboard         | Pagina dedicata AI Co-Manager con widgets briefing, tasks, alerts, finance              | 2026-01-06 |

> **Note:** GB-STAFF-MGT spostato in TESTING per validazione completa

---

## 2026-01-05

| ID              | Feature                 | Descrizione                                                                    | Completato |
| --------------- | ----------------------- | ------------------------------------------------------------------------------ | ---------- |
| MT-EMPTY-STATES | Empty States            | EmptyState component + applicato a Orders, Team, Analytics                     | 2026-01-05 |
| MT-NOTIF-SOUNDS | Notification Sounds     | Audio alerts per toast, settings UI, localStorage persistence                  | 2026-01-05 |
| GB-AI-SEED      | AI Seed Data            | Test data per organizations, brands, locations, accounts, merchants, AI tables | 2026-01-05 |
| GB-AI-P13       | AI-Assisted Onboarding  | onboarding-service.ts, /api/ai/onboarding, /api/upload/logo                    | 2026-01-05 |
| GB-AI-P12       | Inventory & Negotiation | Migration 036, inventory-negotiation-service.ts                                | 2026-01-05 |
| GB-AI-P11       | Agentic Workflows       | Migration 035, agentic-workflow-service.ts                                     | 2026-01-05 |
| GB-AI-P10       | Task Delegation         | Migration 034, task-delegation-service.ts                                      | 2026-01-05 |
| GB-AI-P9        | Financial Management    | Migration 033, financial-service.ts                                            | 2026-01-05 |
| GB-AI-P8        | Social Media Automation | Migration 032, social-media-service.ts                                         | 2026-01-05 |
| GB-AI-P7        | Market Intelligence     | Migration 031, market-intelligence-service.ts                                  | 2026-01-05 |
| GB-AI-P6        | AI Bootstrap            | Migration 030, bootstrap-service.ts                                            | 2026-01-05 |
| GB-AI-P5        | AI Feedback Loop        | Migration 029, feedback-loop-service.ts                                        | 2026-01-05 |
| GB-AI-P4        | AI Proactivity          | Migration 028, proactivity-service.ts                                          | 2026-01-05 |
| GB-AI-P3        | AI Actions              | actions-service.ts + function calling                                          | 2026-01-05 |
| GB-AI-P2        | AI Knowledge Base       | knowledge-service.ts integrato                                                 | 2026-01-05 |
| KANBAN-SETUP    | Backlog Kanban          | Riorganizzazione backlog in 4 file separati                                    | 2026-01-05 |

---

## 2026-01-04

| ID                     | Feature            | Descrizione                                  | Completato |
| ---------------------- | ------------------ | -------------------------------------------- | ---------- |
| GB-AI-P1               | AI Co-Manager MVP  | Migration 027 + Chat UI + OpenAI integration | 2026-01-04 |
| GB-PROMO-FOODCHALLENGE | Food Challenges    | Migration 026 + Wall of Fame                 | 2026-01-04 |
| MT-HOT-ACTIONS         | Hot Actions System | Migration 023 + PWA + Backoffice dashboard   | 2026-01-04 |
| GB-TOURIST-LIFECYCLE   | Tourist Lifecycle  | Migration 024-025 + UI flows                 | 2026-01-04 |

---

## 2026-01-03

| ID             | Feature              | Descrizione                    | Completato |
| -------------- | -------------------- | ------------------------------ | ---------- |
| ANALYTICS-DASH | Analytics Dashboard  | Real-time dashboard backoffice | 2026-01-03 |
| PWA-TRACKING   | Event Tracking       | Analytics integration PWA      | 2026-01-03 |
| MENU-FROM-DB   | Menu da Database     | Supabase connection PWA        | 2026-01-03 |
| MT-ONBOARDING  | Onboarding Checklist | 4-step wizard                  | 2026-01-03 |
| P6-SCHEDULE    | Schedule System      | Phase 1-4 complete             | 2026-01-03 |

---

## Pre-2026

### Database Food (75 database, ~4653 prodotti)

| Regione        | Database                                                                                           | Records |
| -------------- | -------------------------------------------------------------------------------------------------- | ------- |
| Europa         | Spanish, French, British, German, Portuguese, Polish, Scandinavian, Russian, Swiss, Belgian, Dutch | 569     |
| America Latina | Argentinian, Colombian, Venezuelan, Chilean, Cuban                                                 | 218     |
| Africa         | Nigerian, Senegalese, South African                                                                | 117     |
| Asia           | Indonesian, Malaysian, Filipino                                                                    | 171     |
| Fusion         | Tex-Mex, Nikkei, Indo-Chinese, Korean-Mexican                                                      | 132     |
| Oceania        | Australian, Hawaiian                                                                               | 58      |
| Americas       | Cajun/Creole                                                                                       | 42      |

### P5 - Account System (18 Migrations)

| Phase     | Feature                    | Status |
| --------- | -------------------------- | ------ |
| Phase 1   | Unified Account Foundation | ✅     |
| Phase 2   | Unified Loyalty System     | ✅     |
| Phase 2.5 | User-Generated Ingredients | ✅     |
| Phase 2.6 | Points Economy System      | ✅     |
| Phase 3   | User Value Features        | ✅     |
| Phase 4   | Premium Subscriptions      | ✅     |
| Phase 5   | Cross-Selling & Ecosystem  | ✅     |

### Infrastructure

| ID                     | Feature                 | Completato |
| ---------------------- | ----------------------- | ---------- |
| NUTRITION-BACKFILL     | 2548 ingredienti (100%) | 2025-12-28 |
| CHARCUTERIE-CATEGORY   | Proteins restructure    | 2025-12-27 |
| ORIGIN-STANDARDIZATION | Origin System           | 2025-12-22 |

---

## Quick Stats

| Metrica           | Valore                |
| ----------------- | --------------------- |
| Database Food     | 75                    |
| Prodotti          | ~4653                 |
| Ingredienti       | 2548 (100% nutrition) |
| Migrazioni Schema | 38 (27 core + 11 AI)  |
| AI Services       | 15                    |
| AI API Routes     | 15                    |
