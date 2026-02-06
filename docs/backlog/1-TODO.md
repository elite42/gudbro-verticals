# 📋 TODO

> Task da fare, ordinate per priorità.
> Quando inizi una task → spostala in `2-IN-PROGRESS.md`
> **Primary tracker:** GitHub Projects → https://github.com/users/elite42/projects/1

**Last Updated:** 2026-02-06

---

## ⚠️ Env Variables da Configurare su Vercel

> Variabili necessarie per attivare features già deployate.

```bash
# Upstash Redis (caching)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Sentry (error tracking)
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=

# Trigger.dev (background jobs)
TRIGGER_API_KEY=

# Vercel KV (edge cache - optional, LRU fallback)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Cron Secret
CRON_SECRET=<genera-stringa-random>

# 2FA
TOTP_ENCRYPTION_KEY=<vedi .env.local>
```

---

## Codebase Cleanup (dall'audit 2026-02-06)

| ID              | Task                                                           | Effort | Priority |
| --------------- | -------------------------------------------------------------- | ------ | -------- |
| CLEANUP-ANY     | Abilitare `no-explicit-any` in ESLint (62 occorrenze)          | 2-3h   | Alta     |
| CLEANUP-SCHEMA  | Aggiornare DATABASE-SCHEMA.md (61 migration indietro)          | 2h     | Alta     |
| CLEANUP-TYPEGEN | Documentare workflow type generation Supabase                  | 30min  | Alta     |
| CLEANUP-LOGGER  | Implementare logging strutturato (sostituire 1.658 console.\*) | 4-6h   | Media    |
| CLEANUP-DOCS    | Consolidare docs duplicati + aggiungere timestamp              | 3-4h   | Media    |

---

## v2.0 Codebase Hardening (Phases 42-45)

> In pausa. Decidere se procedere dopo cleanup. Vedi `.planning/ROADMAP.md`

| Phase | Descrizione            | Status  |
| ----- | ---------------------- | ------- |
| 42    | Error Handling Library | Next    |
| 43    | Frontend Resilience    | Pending |
| 44    | Architecture Cleanup   | Pending |
| 45    | Documentation          | Pending |

---

## Feature Pending

| ID                    | Feature                 | Descrizione                            | Priority |
| --------------------- | ----------------------- | -------------------------------------- | -------- |
| STAFF-PWA             | Staff App PWA dedicata  | App camerieri con dashboard richieste  | P1.5     |
| V2-CLEANUP            | Rimuovi componenti v1   | Dopo stabilizzazione v2 (2+ settimane) | P2       |
| SITE-CUSTOMIZATION    | Sezioni Custom merchant | Personalizzazione sito                 | P2       |
| LEAKED-PWD-PROTECTION | Password compromesse    | HaveIBeenPwned check (pre-launch)      | P3       |
| DEPS-MAJOR            | Major deps update       | React 19, Next 16, TW 4                | P3       |

---

## Scaling Phase 4 (Future — 100K→1M users)

| ID                  | Feature                   | Effort  | Status |
| ------------------- | ------------------------- | ------- | ------ |
| SCALE-CITUS         | Database Sharding (Citus) | 6 weeks | Future |
| SCALE-EVENT-BUS     | Event-Driven Arch (Kafka) | 4 weeks | Future |
| SCALE-CQRS          | CQRS Pattern              | 4 weeks | Future |
| SCALE-FEATURE-FLAGS | Feature Flags (Statsig)   | 2 weeks | Future |
| SCALE-GDPR          | GDPR Compliance           | 3 weeks | Future |

---

## Verticals (Archiviati — Coming Soon)

> Codice in `apps/_archived/`. PRD in `docs/archive/verticals-prd/`.
> Riattivare spostando da `_archived/` ad `apps/` quando pronti.

| Vertical     | PRD disponibile                    |
| ------------ | ---------------------------------- |
| Wellness/Spa | ✅                                 |
| Tours        | ✅                                 |
| Laundry      | ✅                                 |
| Pharmacy     | ✅                                 |
| Workshops    | ✅                                 |
| Gym          | ❌ (usa wellness fitness addendum) |
| Rentals      | ❌ (solo context doc)              |

---

## OpenClaw (progetto separato)

> In `~/openclaw/` — sessione Claude Code dedicata.
> Non mischiare con GUDBRO.
