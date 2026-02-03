# 🔄 IN PROGRESS

> Task attualmente in lavorazione.
> **Max 3 task** alla volta per focus.
> Quando completata → spostala in `3-TESTING.md` o `4-DONE.md`

**Last Updated:** 2026-02-03

---

| ID             | Feature                 | Descrizione                                               | Priority | Started    | Assignee |
| -------------- | ----------------------- | --------------------------------------------------------- | -------- | ---------- | -------- |
| ACCOM-PWA-TEST | Test PWA Accommodations | Test completo della PWA in-stay dopo bugfix session       | P0       | 2026-02-02 | Claude   |
| BO-DEPLOY-FIX  | Fix Backoffice Vercel   | Deploy backoffice in errore su Vercel (stale build cache) | P0       | 2026-02-02 | Claude   |
| OPENCLAW-SETUP | OpenClaw Installazione  | Progetto separato in `~/openclaw/` — vedi CLAUDE.md li'   | P1       | 2026-02-03 | Claude   |

---

## ACCOM-PWA-TEST — Dettaglio

**Contesto:** Session del 2026-02-02 — trovati e fixati bug critici nella PWA accommodations.

### Fix già applicate (non committate)

1. **Token null safety** — aggiunto `!token` al guard in `page.tsx:158`, rimossi tutti `token!`
2. **Empty card spaces** — aggiunto `empty:hidden` Tailwind ai wrapper div (nasconde card vuote quando componente ritorna null)
3. **Workspace resolution** — aggiunto `apps/accommodations/*` a `pnpm-workspace.yaml` (mancava, impediva la risoluzione di `@gudbro/utils`)
4. **Path alias** — aggiunto `@shared/*` al tsconfig di accommodations (risolveva `@shared/payment` not found)
5. **WiFi import** — cambiato import in `WifiCard.tsx` da `@shared/utils/qr/wifi` a `@gudbro/utils`, esportato `qr/wifi` da `shared/utils/index.ts`

### Da testare domani

- [ ] Ri-autenticarsi su `/stay/BK-T3ST01` (token probabilmente scaduto — serve login dalla landing page)
- [ ] Verificare che i Services si caricano (Breakfast, Minibar, Laundry sono nel DB)
- [ ] Verificare che le card vuote non appaiono (ConventionPartnerCards, LocalDeals, UsefulNumbers nascosti quando vuoti)
- [ ] Verificare che la WiFi card si mostra correttamente
- [ ] Verificare che il QR code WiFi funziona
- [ ] Test Restaurant section
- [ ] Test Documents upload
- [ ] Test Orders view
- [ ] Test Concierge hub
- [ ] Test bottom nav (home, map, profile)
- [ ] Test responsive su mobile viewport

### Da investigare

- [ ] Se "Loading your stay..." persiste dopo login, controllare console browser per errori
- [ ] Conventions date filter — verificato che la sintassi `.or()` è corretta, ma testare con dati reali
- [ ] Deals vuoti (0 righe nel DB) — è previsto o mancano seed data?

---

## BO-DEPLOY-FIX — Dettaglio

**Contesto:** Backoffice su Vercel dà errore `ENOENT` per file `.next` cache stale dopo push dei 42 commit.

### Da fare

- [ ] Triggare redeploy su Vercel senza cache (`vercel deployments` → cancel + redeploy)
- [ ] Verificare che il backoffice si carica su Vercel dopo redeploy
- [ ] Configurare Vercel per accommodations (attualmente non configurato)

---

## OPENCLAW-SETUP — Progetto Separato

> **Tutto spostato in `~/openclaw/`** — aprire sessione Claude Code dedicata su quella cartella.
> Step 1 completato (2026-02-03). Step 2 (installazione) e' il prossimo.

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

### 📋 v2.0 Codebase Hardening — In Pausa

Phases 42-45 (Error Handling, Frontend Resilience, Architecture Cleanup, Documentation) in attesa dopo test delle app. Basate su `docs/AUDIT-360.md` (score 6.7/10). Decidere se procedere dopo i test.

---

## Recentemente completati (vedi 4-DONE.md)

- ✅ ACCOM-INSTAY - Accommodations In-Stay PWA (WiFi, visa dinamico, local deals, partner GUDBRO) - 2026-01-27
- ✅ PWA-V2-PARITY - PWA v2 Feature Parity (14 feature: navigation, tracking, notifications, info pages) - 2026-01-25
- ✅ AI-KNOWLEDGE - AI Platform Knowledge (navigation, features, how-to) - 2026-01-20
- ✅ DATA-CONSISTENCY - Fix cross-merchant data leak in Intelligence Map - 2026-01-20
