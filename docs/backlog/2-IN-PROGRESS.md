# 🔄 IN PROGRESS

> Task attualmente in lavorazione.
> **Max 3 task** alla volta per focus.
> Quando completata → spostala in `3-TESTING.md` o `4-DONE.md`

**Last Updated:** 2026-01-19

---

| ID            | Feature       | Descrizione                              | Priority | Started    | Assignee |
| ------------- | ------------- | ---------------------------------------- | -------- | ---------- | -------- |
| PWA-FULL-SITE | PWA → Website | Responsive desktop/tablet, nav, sections | P0.5     | 2026-01-19 | Claude   |

---

## Stato Iniziative

### ✅ SCALING INITIATIVE - Phase 1, 2 & 3 COMPLETATE

**Phase 1 (100→1K):** Caching, rate limiting, indexes, observability, async patterns
**Phase 2 (1K→10K):** Background jobs, real-time, partitioning, materialized views, optimistic updates
**Phase 3 (10K→100K):** Multi-region, edge caching, request coalescing, tenant context, sharding prep, archive strategy

### ✅ SECURITY HARDENING - Phase 1 COMPLETATA

**Security Headers:** CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Permissions-Policy
**Audit Log:** Migration 064, AuditService, /settings/audit-log page
**Alerts Dashboard:** /settings/system-alerts, /api/health/alerts, role-based access (system:alerts)

**⚠️ USER ACTION REQUIRED:**

```bash
# Add to Vercel Environment Variables:

# Phase 1 - Redis (Upstash - https://console.upstash.com/)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Phase 1 - Sentry (https://sentry.io/)
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=

# Phase 2 - Trigger.dev (https://trigger.dev/)
TRIGGER_API_KEY=

# Phase 3 - Vercel KV (optional, uses LRU fallback)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Phase 3 - Cron Security
CRON_SECRET=

# Security - Two-Factor Auth (SEC-2FA)
TOTP_ENCRYPTION_KEY=b28833a0024a56c899aa968ed60611868bb92c5350a824bd09d12e097b339380
```

### 📋 Next Up: Phase 4 (100K→1M users)

Quando pronto per Phase 4, vedere `1-TODO.md` sezione "SCALING INITIATIVE - Phase 4":

- SCALE-CITUS - Database sharding con Citus
- SCALE-EVENT-BUS - Event-driven architecture con Kafka
- SCALE-CQRS - CQRS pattern implementation
- SCALE-FEATURE-FLAGS - Feature flags system
- SCALE-AUDIT - Comprehensive audit logging
- SCALE-GDPR - GDPR compliance features

---

## Recentemente completati (vedi 4-DONE.md)

- ✅ SECURITY Phase 1 (3 task: headers, audit-log, alerts) - 2026-01-18
- ✅ SCALING Phase 2 & 3 (13 task) - 2026-01-18
- ✅ SCALING Phase 1 (12 task) - 2026-01-17
- ✅ SMART-MAP - Business Intelligence Map - 2026-01-16
- ✅ AI-CUSTOMER-CHAT (6 sprint) - 2026-01-15
- ✅ RESERVATIONS-SYSTEM (14 sprint) - 2026-01-15
