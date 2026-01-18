# 📋 TODO

> Task da fare, ordinate per priorità.
> Quando inizi una task → spostala in `2-IN-PROGRESS.md`
> **Specs dettagliate:** `specs/` folder

**Last Updated:** 2026-01-18

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
| SEC-2FA            | Two-Factor Auth    | TOTP per account admin/owner                           | 2 days | Pending |

---

## P0 - Testing Initiative

> **🧪 TESTING INITIATIVE** - Da 1.5% a production-grade
> Roadmap completa: `docs/TESTING-STRATEGY.md`

| ID                | Feature               | Descrizione                            | Effort   | Status  |
| ----------------- | --------------------- | -------------------------------------- | -------- | ------- |
| TEST-WALLET       | Wallet Service Tests  | 150 test cases per financial logic     | 2 days   | Pending |
| TEST-LOYALTY      | Loyalty Service Tests | 120 test cases per points/redemption   | 1.5 days | Pending |
| TEST-CI           | GitHub Actions CI     | Pipeline con coverage gates            | 4h       | Pending |
| TEST-AUTH         | Auth Flow Tests       | Login, signup, password reset, session | 1 day    | Pending |
| TEST-E2E-CRITICAL | E2E Critical Paths    | Playwright per order flow, menu view   | 2 days   | Pending |

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
| PWA-FULL-SITE       | PWA → Sito Web      | Responsive desktop/tablet       | High   | Pending | [spec](specs/P0.5-architecture/PWA-FULL-SITE.md)       |
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

## P2 - Media Priorità

| ID             | Feature             | Descrizione            | Effort | Spec                                |
| -------------- | ------------------- | ---------------------- | ------ | ----------------------------------- |
| MT-GEOFENCING  | Location Geofencing | Radius-based location  | High   | [spec](specs/P2/MENUTIGER-AUDIT.md) |
| MT-KDS         | Kitchen Display     | Display ordini cucina  | High   | ✅ DONE                             |
| MT-WHITE-LABEL | White-label Domain  | Custom domain merchant | Medium | ✅ DONE                             |
| HOLIDAYS-DB    | Holidays Database   | DB festività per paese | Medium | ✅ DONE                             |

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
