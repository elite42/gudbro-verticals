# 📋 TODO

> Task da fare, ordinate per priorità.
> Quando inizi una task → spostala in `2-IN-PROGRESS.md`
> **Specs dettagliate:** `specs/` folder

**Last Updated:** 2026-01-24

---

## ⚠️ USER ACTIONS - Environment Variables da Configurare

> **Tutte le variabili da aggiungere su Vercel per attivare le features deployate**

### Phase 1 - Redis + Sentry

```bash
# Upstash Redis (https://console.upstash.com/)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Sentry (https://sentry.io/)
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
```

### Phase 2 - Trigger.dev

```bash
# Trigger.dev (https://trigger.dev/)
TRIGGER_API_KEY=
```

### Phase 3 - Edge Cache + Cron

```bash
# Vercel KV (optional - usa LRU fallback se non configurato)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Cron Secret (per sicurezza maintenance jobs)
CRON_SECRET=<genera-stringa-random>
```

### Security - Two-Factor Auth

```bash
# TOTP Encryption Key per 2FA (già generato in .env.local)
TOTP_ENCRYPTION_KEY=b28833a0024a56c899aa968ed60611868bb92c5350a824bd09d12e097b339380
```

---

## SCALING INITIATIVE - Phase 1 ✅ COMPLETE

> **🚀 Phase 1 (100→1K users) COMPLETATA** - 2026-01-17
> Roadmap completa: `docs/SCALE-ROADMAP.md`

| ID                | Feature               | Status  |
| ----------------- | --------------------- | ------- |
| SCALE-REDIS       | Upstash Redis caching | ✅ DONE |
| SCALE-RATE-LIMIT  | Rate limiting         | ✅ DONE |
| SCALE-DB-INDEX    | Database indexes      | ✅ DONE |
| SCALE-CDN         | CDN headers           | ✅ DONE |
| SCALE-SENTRY      | Error tracking        | ✅ DONE |
| SCALE-LOGGING     | Pino logging          | ✅ DONE |
| SCALE-NOTIF-QUEUE | Notification queue    | ✅ DONE |
| SCALE-ZOD         | API validation        | ✅ DONE |
| SCALE-N1-FIX      | N+1 query fixes       | ✅ DONE |

### ⚠️ USER ACTION - Variabili da aggiungere su Vercel

```bash
# Upstash Redis (https://console.upstash.com/)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Sentry (https://sentry.io/)
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
```

---

## SCALING INITIATIVE - Phase 2 ✅ COMPLETE

> **🚀 Phase 2 (1K→10K users) COMPLETATA** - 2026-01-18
> Roadmap completa: `docs/SCALE-ROADMAP.md#phase-2`

| ID                 | Feature                | Status  |
| ------------------ | ---------------------- | ------- |
| SCALE-TRIGGER      | Trigger.dev Jobs       | ✅ DONE |
| SCALE-REALTIME     | Supabase Realtime      | ✅ DONE |
| SCALE-PARTITIONING | Analytics Partitioning | ✅ DONE |
| SCALE-MAT-VIEWS    | Materialized Views     | ✅ DONE |
| SCALE-READ-REPLICA | Read Replicas          | ✅ DONE |
| SCALE-OPTIMISTIC   | Optimistic Updates     | ✅ DONE |

---

## SCALING INITIATIVE - Phase 3 ✅ COMPLETE

> **🚀 Phase 3 (10K→100K users) COMPLETATA** - 2026-01-18
> Roadmap completa: `docs/SCALE-ROADMAP.md#phase-3`

| ID                   | Feature              | Status  |
| -------------------- | -------------------- | ------- |
| SCALE-MULTI-REGION   | Multi-Region Deploy  | ✅ DONE |
| SCALE-EDGE-CACHE     | Edge Caching         | ✅ DONE |
| SCALE-COALESCING     | Request Coalescing   | ✅ DONE |
| SCALE-TENANT-CONTEXT | Tenant Context       | ✅ DONE |
| SCALE-SHARDING       | Sharding Preparation | ✅ DONE |
| SCALE-ARCHIVE        | Archive Strategy     | ✅ DONE |
| SCALE-PERF-BUDGETS   | Performance Budgets  | ✅ DONE |

### ⚠️ USER ACTION - New Environment Variables (Phase 3)

```bash
# Vercel KV (for edge caching - optional, uses LRU fallback)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Cron Secret (for maintenance jobs security)
CRON_SECRET=
```

---

## SCALING INITIATIVE - Phase 4 (100K→1M users)

> **🏗️ Hyper-scale + Enterprise Features**
> Target: Mese 7-12 | Roadmap: `docs/SCALE-ROADMAP.md#phase-4`

| ID                  | Feature           | Descrizione                               | Effort  | Status  |
| ------------------- | ----------------- | ----------------------------------------- | ------- | ------- |
| SCALE-CITUS         | Database Sharding | Citus extension for horizontal scaling    | 6 weeks | Pending |
| SCALE-EVENT-BUS     | Event-Driven Arch | Upstash Kafka for domain events           | 4 weeks | Pending |
| SCALE-CQRS          | CQRS Pattern      | Command/Query separation with read models | 4 weeks | Pending |
| SCALE-FEATURE-FLAGS | Feature Flags     | Statsig/LaunchDarkly for gradual rollout  | 2 weeks | Pending |
| SCALE-AUDIT         | Audit Logging     | Comprehensive audit trail for compliance  | 2 weeks | Pending |
| SCALE-GDPR          | GDPR Compliance   | Data export, deletion, anonymization      | 3 weeks | Pending |

---

## P0 - CI/CD Fix ✅ RISOLTO

> **✅ CI GITHUB ACTIONS FUNZIONA** - 2026-01-21
> Lezioni apprese: `CLAUDE.md` sezione 3.5 (Compounding Engineering)

| ID              | Feature                | Descrizione                                                    | Effort | Status  |
| --------------- | ---------------------- | -------------------------------------------------------------- | ------ | ------- |
| CI-IMPLICIT-ANY | Fix implicit any types | `useState<any[]>` → interface tipizzate                        | 2h     | ✅ DONE |
| CI-ESLINT-V8    | ESLint legacy config   | `.eslintrc.json` per tutti i frontend                          | 1h     | ✅ DONE |
| CI-PNPM-VERSION | Fix pnpm conflict      | Rimosso `version: 9` da ci.yml                                 | 15min  | ✅ DONE |
| CI-LOCAL-PARITY | Local/CI parity script | Script `ci-local.sh` per simulare CI (fresh install + --force) | 1h     | ✅ DONE |
| CI-NVMRC        | Pin Node version       | Aggiunto `.nvmrc` con Node 20 (come CI)                        | 15min  | ✅ DONE |
| CI-PRISMA-GEN   | Prisma in typecheck    | Aggiunto `prisma generate` a script typecheck                  | 15min  | ✅ DONE |
| CI-VITEST-E2E   | Escludi e2e da Vitest  | Aggiunto `'**/e2e/**'` a vitest exclude                        | 15min  | ✅ DONE |
| CI-SUPABASE-API | Supabase lazy-init     | 4 API routes fixate per usare `supabaseAdmin`                  | 30min  | ✅ DONE |

### 🔍 Post-Mortem: Perché ci abbiamo messo 2 giorni?

**PROBLEMA FONDAMENTALE:** Local vs CI divergence

| Locale                                      | CI                              |
| ------------------------------------------- | ------------------------------- |
| Cache TypeScript, Prisma types già generati | Fresh install, nessuna cache    |
| Node v22                                    | Node v20                        |
| `.turbo` cache presente                     | Nessuna cache                   |
| Build genera prima di typecheck             | Typecheck esegue prima di build |

**PERCHÉ I PROBLEMI SONO NATI:**

1. **Prisma types** - Il typecheck script era solo `tsc --noEmit`. Funzionava localmente perché Prisma types erano già generati da un `pnpm build` precedente. In CI, typecheck esegue PRIMA di build.

2. **e2e tests** - Playwright tests aggiunti in `/e2e/*.spec.ts` dopo la configurazione Vitest. Il pattern `**/*.spec.ts` li includeva. Vitest non sa eseguire `test.describe()` di Playwright.

3. **Supabase module-level** - Nuove API routes create copiando codice vecchio con `createClient()` inline. Il pattern `supabaseAdmin` lazy-init era documentato ma non seguito.

**PERCHÉ È STATO DIFFICILE DA DIAGNOSTICARE:**

- Errori a cascata: fix uno → appare un altro
- Errori criptici: "supabaseKey is required" durante build non dice "lazy-init problem"
- Divergenza locale/CI nascondeva i problemi fino al push

**LEZIONE PRINCIPALE:**

> **Usare SEMPRE `./scripts/ci-local.sh` prima di push importanti.**
> Il CI simula fresh install + --force per rivelare problemi nascosti dalla cache locale.

**Comandi per trovare problemi futuri:**

```bash
# Simula CI in locale (USARE QUESTO!)
./scripts/ci-local.sh

# Trova tutti useState<any[]>
grep -rn "useState<any\[\]>" --include="*.tsx" apps/backoffice/

# Trova createClient inline (DEVE essere 0 nei route files)
grep -rn "const.*=.*createClient(" --include="*.ts" apps/backoffice/app/api/
```

---

## P0 - Security Hardening

> **🔒 SECURITY HARDENING** - Fix critici pre-launch
> Roadmap completa: `docs/SECURITY-ROADMAP.md`

| ID                 | Feature            | Descrizione                                            | Effort | Status  |
| ------------------ | ------------------ | ------------------------------------------------------ | ------ | ------- |
| SEC-ZOD            | Input Validation   | Zod su tutti gli API routes                            | 3 days | ✅ DONE |
| SEC-WEBHOOKS       | Webhook Signatures | Fix Telegram + WhatsApp verification                   | 1 day  | ✅ DONE |
| SEC-HEADERS        | Security Headers   | CSP, HSTS, X-Frame-Options                             | 4h     | ✅ DONE |
| SEC-ERROR-HANDLING | API Error Handling | Try-catch su tutti i routes                            | 4h     | ✅ DONE |
| SEC-AUDIT-LOG      | Audit Logging      | Log azioni sensibili (login, payments, config changes) | 2 days | ✅ DONE |
| SEC-2FA            | Two-Factor Auth    | TOTP per account admin/owner                           | 2 days | Testing |

---

## P0 - Testing Initiative ✅ COMPLETE

> **🧪 TESTING INITIATIVE** - Da 1.5% a production-grade
> Roadmap completa: `docs/TESTING-STRATEGY.md`
> **Total Tests: 2418 passing** (2026-01-18)
>
> - Unit Tests (Vitest): 2383 tests
> - E2E Tests (Playwright): 35 tests

| ID                | Feature               | Descrizione                            | Effort   | Status  |
| ----------------- | --------------------- | -------------------------------------- | -------- | ------- |
| TEST-CI           | GitHub Actions CI     | Pipeline con coverage gates            | 4h       | ✅ DONE |
| TEST-WALLET       | Wallet Service Tests  | 117 test cases per financial logic     | 2 days   | ✅ DONE |
| TEST-LOYALTY      | Loyalty Service Tests | 187 test cases per points/redemption   | 1.5 days | ✅ DONE |
| TEST-AUTH         | Auth Flow Tests       | 76 test cases for auth business logic  | 1 day    | ✅ DONE |
| TEST-E2E-CRITICAL | E2E Critical Paths    | Playwright: 35 tests menu + order flow | 2 days   | ✅ DONE |

---

## Pre-Launch - Prima dei Primi Clienti

> Task da completare prima di andare live con clienti paganti.
> ⚠️ **Security tasks (password protection, rate limiting) → implementare SOLO prima del go-live, non durante dev/test**

| ID                    | Feature                    | Descrizione                                      | Effort | Requires | Status        |
| --------------------- | -------------------------- | ------------------------------------------------ | ------ | -------- | ------------- |
| LEAKED-PWD-PROTECTION | Leaked Password Protection | Blocca password compromesse (HaveIBeenPwned)     | Low    | Pro Plan | 🔒 Pre-Launch |
| RATE-LIMITING         | Rate Limiting              | Protezione brute force login                     | Low    | -        | ✅ DONE       |
| BACKOFFICE-UI-RESERV  | UI Prenotazioni Backoffice | Calendar view + Floor plan editor (Sprint 13-14) | High   | -        | ✅ DONE       |

---

## P0.5 - Strategia Prodotto & Onboarding

> Decisioni che impattano onboarding B2B, pricing tiers, e conversione.

| ID                        | Feature             | Descrizione                          | Effort | Status  | Spec                                                     |
| ------------------------- | ------------------- | ------------------------------------ | ------ | ------- | -------------------------------------------------------- |
| SERVICE-MODELS            | Modelli di Servizio | Come funziona il servizio nel locale | Medium | ✅ DONE | [spec](specs/P0.5-strategy/SERVICE-MODELS.md)            |
| TIER-MENU-ONLY            | Menu Only Tier      | Entry-level pricing tier             | Low    | ✅ DONE | [spec](specs/P0.5-strategy/TIER-MENU-ONLY.md)            |
| AI-ONBOARDING             | Onboarding AI       | Chat-based onboarding                | High   | ✅ DONE | [spec](specs/P0.5-strategy/AI-ONBOARDING.md)             |
| ORDER-READY-NOTIFICATIONS | Notifiche Ordine    | Sostituisce buzzer hardware          | Medium | ✅ DONE | [spec](specs/P0.5-strategy/ORDER-READY-NOTIFICATIONS.md) |

---

## P0.5 - Architettura da Rivedere

> **BLOCCO:** Richiedono revisione architetturale prima dell'implementazione.

| ID                  | Feature             | Descrizione                     | Effort | Status  | Spec                                                   |
| ------------------- | ------------------- | ------------------------------- | ------ | ------- | ------------------------------------------------------ |
| PWA-FULL-SITE       | PWA → Sito Web      | Responsive desktop/tablet       | High   | ✅ DONE | [spec](specs/P0.5-architecture/PWA-FULL-SITE.md)       |
| AI-CUSTOMER-CHAT    | AI Customer Chat    | Chat per clienti (multi-canale) | High   | ✅ DONE | [spec](specs/P0.5-architecture/AI-CUSTOMER-CHAT.md)    |
| RESERVATIONS-SYSTEM | Prenotazioni        | Sistema prenotazioni tavoli     | High   | ✅ DONE | [spec](specs/P0.5-architecture/RESERVATIONS-SYSTEM.md) |
| QR-BUILDER-V2       | QR Builder Avanzato | Contextual QR con analytics     | High   | ✅ DONE | [spec](specs/P0.5-architecture/QR-BUILDER-V2.md)       |
| SITE-CUSTOMIZATION  | Sezioni Custom      | Merchant personalizza sito      | Medium | Pending | [spec](specs/P0.5-architecture/SITE-CUSTOMIZATION.md)  |

---

## P1 - Alta Priorità

| ID                 | Feature                 | Descrizione                                     | Effort | Status  | Spec                                   |
| ------------------ | ----------------------- | ----------------------------------------------- | ------ | ------- | -------------------------------------- |
| AI-FIRST-REDESIGN  | Backoffice AI-First     | Dashboard operativa, non informativa (5 sprint) | High   | ✅ DONE | [spec](specs/P1/AI-FIRST-REDESIGN.md)  |
| KB-BACKOFFICE      | Knowledge Base          | Guida utente 52 pagine                          | Medium | ✅ DONE | [spec](specs/P1/KB-BACKOFFICE.md)      |
| AI-ZONE-INTEL      | Zone & Customer Intel   | AI conosce zona + pattern clienti               | High   | ✅ DONE | [spec](specs/P1/AI-ZONE-INTEL.md)      |
| WEATHER-INTEL      | Weather Intelligence    | Meteo in backoffice + AI                        | Medium | ✅ DONE | -                                      |
| TOURISM-B2B        | Partnership Hub         | AI trova tour op + hotel/Airbnb                 | High   | ✅ DONE | [spec](specs/P1/TOURISM-B2B.md)        |
| B2B-CONVENTIONS    | Corporate Conventions   | Convenzioni uffici/aziende                      | Medium | ✅ DONE | [spec](specs/P1/B2B-CONVENTIONS.md)    |
| HOTEL-AUTOCOMPLETE | Hotel Search Onboarding | Google Places per ricerca hotel in onboarding   | Medium | ✅ DONE | [spec](specs/P1/HOTEL-AUTOCOMPLETE.md) |

---

## P1.5 - Staff Management & Tips

> **🧑‍🍳 Sistema Staff Completo** - Gestione personale, mance, self-service
> Prerequisito: Migration 071 (tip distribution) già implementata

| ID                | Feature             | Descrizione                                     | Effort | Status  |
| ----------------- | ------------------- | ----------------------------------------------- | ------ | ------- |
| TIPS-APPLY-MIGR   | Apply Migration 071 | Applicare migration tip distribution a Supabase | 1h     | ✅ DONE |
| STAFF-INVITE      | Staff Invitation UI | UI backoffice per invitare staff via email      | 2 days | ✅ DONE |
| STAFF-ASSIGNMENTS | Staff Table Assign  | Manager assegna sezioni/tavoli a staff          | 2 days | ✅ DONE |
| STAFF-SELF-ASSIGN | Staff Self-Assign   | Cameriere scansiona QR tavolo → auto-assegna    | 1 day  | ✅ DONE |
| STAFF-ESCALATION  | Escalation System   | Sistema alert configurabile per richieste       | 1 day  | ✅ DONE |
| STAFF-PWA         | Staff App PWA       | App dedicata camerieri con dashboard richieste  | 5 days | Pending |

---

## PWA V2 - Completamento Migrazione

> **Design System v2 migrato** - 2026-01-24
> Redirect attivi: `/` → `/v2`, `/menu` → `/v2/menu`, `/cart` → `/v2/cart`, `/favorites` → `/v2/favorites`
> Opt-out: `?legacy=true` per tornare a v1

| ID                | Feature            | Descrizione                             | Effort | Status     |
| ----------------- | ------------------ | --------------------------------------- | ------ | ---------- |
| V2-WELCOME-MODAL  | Welcome Modal      | Modal benvenuto con opzioni login/guest | 1 day  | ✅ DONE    |
| V2-AUTH-MODAL     | Auth Modal v2      | Login/Register con Supabase Auth        | 1 day  | ✅ DONE    |
| V2-TABLE-CONTEXT  | QR Table Context   | Banner tavolo dopo scansione QR         | 4h     | ✅ DONE    |
| V2-SEARCH-OVERLAY | Search Full-screen | Overlay ricerca come v1                 | 4h     | ✅ DONE    |
| V2-DESKTOP-LAYOUT | Desktop Sidebar    | Layout desktop con sidebar categorie    | 1 day  | ✅ DONE    |
| V2-CLEANUP        | Rimuovi v1         | Cleanup componenti v1 quando v2 stabile | 2h     | Deferred\* |
| V2-TIER-TEST      | Test Tier System   | Testare BASIC, PRO, ENTERPRISE          | 2h     | ✅ DONE    |

> **\*V2-CLEANUP deferred:** I componenti v1 sono ancora usati da route legacy (contact, about, events, account) e dal fallback `?legacy=true`. Il cleanup va fatto dopo:
>
> 1. Migrazione delle route secondarie a v2 (contact, about, events)
> 2. Periodo di stabilizzazione v2 (almeno 2 settimane senza bug report)
> 3. Rimozione del fallback `?legacy=true` dal middleware

---

## P2 - Media Priorità

| ID                  | Feature             | Descrizione                                  | Effort | Spec                                       |
| ------------------- | ------------------- | -------------------------------------------- | ------ | ------------------------------------------ |
| USEFUL-NUMBERS      | Numeri Utili        | Emergenze + info utili in PWA, auto-tradotti | Medium | [spec](specs/P2/USEFUL-NUMBERS.md)         |
| QR-NFC-ORDERING     | QR/NFC Product Shop | Ordina supporti fisici QR+NFC dal backoffice | 5 days | Pending                                    |
| AI-ASSISTANT-MODULE | AI Prompt Generator | Perfect prompts per Midjourney/DALL-E/Vision | Medium | [spec](../features/AI-ASSISTANT-MODULE.md) |
| MT-GEOFENCING       | Location Geofencing | Radius-based location                        | High   | [spec](specs/P2/MENUTIGER-AUDIT.md)        |
| MT-KDS              | Kitchen Display     | Display ordini cucina                        | High   | ✅ DONE                                    |
| MT-WHITE-LABEL      | White-label Domain  | Custom domain merchant                       | Medium | ✅ DONE                                    |
| HOLIDAYS-DB         | Holidays Database   | DB festività per paese                       | Medium | ✅ DONE                                    |

---

## P3 - Bassa Priorità (Future)

| ID               | Feature           | Descrizione               | Spec                                |
| ---------------- | ----------------- | ------------------------- | ----------------------------------- |
| AUTH-PWD-PROTECT | Leaked Password   | HaveIBeenPwned check      | [spec](specs/P3/FUTURE-FEATURES.md) |
| DEPS-MAJOR       | Major Deps Update | React 19, Next 16, TW 4   | [spec](specs/P3/FUTURE-FEATURES.md) |
| W3-NFT-LOYALTY   | NFT Loyalty       | Collezione NFT loyalty    | [spec](specs/P3/FUTURE-FEATURES.md) |
| CRYPTO-P2        | Crypto Phase 2    | Wallet Connect, Lightning | [spec](specs/P3/FUTURE-FEATURES.md) |

---

## P8 - Future Tech to Watch

| ID  | Tech          | Descrizione                      | Spec                                |
| --- | ------------- | -------------------------------- | ----------------------------------- |
| RLM | Recursive LLM | Context illimitato (10M+ tokens) | [spec](specs/P3/FUTURE-FEATURES.md) |

---

## Specs Structure

```
docs/backlog/
├── 1-TODO.md              # Questo file (index)
├── 2-IN-PROGRESS.md
├── 3-TESTING.md
├── 4-DONE.md
└── specs/
    ├── P0.5-strategy/     # 4 specs
    ├── P0.5-architecture/ # 5 specs
    ├── P1/                # 7 specs (incl. SQL dettagliati)
    ├── P2/                # 1 spec (aggregata)
    └── P3/                # 1 spec (aggregata)
```

---

**Workflow:**

1. Guarda questa tabella per scegliere task
2. Leggi la spec corrispondente per dettagli
3. Sposta in `2-IN-PROGRESS.md`
4. Completa → sposta in `4-DONE.md`

## OPT-CLAUDE-MD - Ottimizzazione CLAUDE.md (P2)

**Stima:** 1h
**Descrizione:** Ridurre context usage spostando sezioni grandi in file separati

- Compounding Engineering → .claude/COMPOUNDING.md
- MCP Servers → .claude/MCP-GUIDE.md
- Risparmio stimato: ~150 righe (15%)
