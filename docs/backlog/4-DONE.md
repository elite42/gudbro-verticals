# ✅ DONE

> Archivio storico delle task completate.
> Organizzato per data (più recenti in alto).

**Last Updated:** 2026-01-18

---

## 2026-01-18

| ID                   | Feature                     | Descrizione                                                                                          | Completato |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------- | ---------- |
| SCALE-TRIGGER        | Trigger.dev Background Jobs | Background job system via Trigger.dev for notifications, analytics aggregation, AI briefings         | 2026-01-18 |
| SCALE-REALTIME       | Supabase Realtime Chat      | WebSocket real-time for chat conversations, replaced 5s polling                                      | 2026-01-18 |
| SCALE-PARTITIONING   | Analytics Partitioning      | Migration 060: Monthly partitions for analytics_events, auto-partition function                      | 2026-01-18 |
| SCALE-MAT-VIEWS      | Materialized Views          | Migration 061: Pre-computed dashboard aggregates (daily, top items, device, hourly)                  | 2026-01-18 |
| SCALE-OPTIMISTIC     | Optimistic Updates          | React Query with optimistic mutations, rollback on error, KDS integration                            | 2026-01-18 |
| SCALE-READ-REPLICA   | Read Replica Config         | lib/supabase-read-replica.ts with lazy proxy, analytics-service integration                          | 2026-01-18 |
| SCALE-SHARDING       | Sharding Preparation        | Migration 062: shard_id columns, assign_shard function, triggers, indexes, v_shard_distribution view | 2026-01-18 |
| SCALE-ARCHIVE        | Archive Strategy            | Migration 063: cold_storage schema, archive tables, archive functions, RLS                           | 2026-01-18 |
| SCALE-MULTI-REGION   | Multi-Region Deploy         | vercel.json with iad1/sfo1/cdg1 regions, function config, maintenance crons                          | 2026-01-18 |
| SCALE-EDGE-CACHE     | Edge Caching                | lib/cache/edge-cache.ts with Vercel KV support, LRU fallback                                         | 2026-01-18 |
| SCALE-COALESCING     | Request Coalescing          | lib/cache/request-coalescing.ts to prevent thundering herd                                           | 2026-01-18 |
| SCALE-TENANT-CONTEXT | Tenant Context              | lib/tenancy/tenant-context.ts with AsyncLocalStorage, tier/feature checks                            | 2026-01-18 |
| SCALE-PERF-BUDGETS   | Performance Budgets         | lib/observability/performance-budgets.ts with P50/P95/P99 targets per operation                      | 2026-01-18 |

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
