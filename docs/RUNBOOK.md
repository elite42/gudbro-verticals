# GUDBRO RUNBOOK

**Last Updated:** 2026-01-23
**Version:** 1.0

Procedure operative per la gestione di incidenti e manutenzione.

---

## Contatti Emergenza

| Ruolo            | Nome                  | Contatto                     |
| ---------------- | --------------------- | ---------------------------- |
| Owner/Dev        | Gianfranco D'Agostino | mysistem@gmail.com           |
| Vercel Support   | -                     | https://vercel.com/support   |
| Supabase Support | -                     | https://supabase.com/support |

---

## Quick Links

| Servizio           | URL                                         |
| ------------------ | ------------------------------------------- |
| Vercel Dashboard   | https://vercel.com/mysistem-2076s-projects  |
| Supabase Dashboard | https://supabase.com/dashboard              |
| Sentry             | https://gudbro.sentry.io                    |
| UptimeRobot        | https://uptimerobot.com                     |
| GitHub Repo        | https://github.com/elite42/gudbro-verticals |

---

## INCIDENTI

### 🔴 SITO DOWN (500 Error)

**Sintomi:** Utenti vedono errore 500, UptimeRobot alert

**Diagnosi:**

```bash
# 1. Check health endpoint
curl -v https://admin.gudbro.com/api/health

# 2. Check Vercel deployment status
# Vai su Vercel Dashboard → Deployments

# 3. Check Sentry per errori recenti
# https://gudbro.sentry.io → Issues
```

**Azioni:**

1. **Rollback immediato** se deploy recente:
   - Vercel Dashboard → Deployments
   - Trova ultimo deploy funzionante
   - Click "..." → "Promote to Production"

2. **Se non è un deploy:**
   - Check Supabase status: https://status.supabase.com
   - Check Vercel status: https://www.vercel-status.com
   - Verifica env vars su Vercel

---

### 🔴 DATABASE NON RAGGIUNGIBILE

**Sintomi:** Errori "Connection refused", "timeout" nei log

**Diagnosi:**

```bash
# Check Supabase status
# https://status.supabase.com

# Check da Supabase Dashboard
# SQL Editor → SELECT 1;
```

**Azioni:**

1. Verifica status Supabase (potrebbe essere manutenzione)
2. Verifica `NEXT_PUBLIC_SUPABASE_URL` è corretto
3. Verifica `SUPABASE_SERVICE_ROLE_KEY` non è scaduto
4. Se problema persiste, contatta Supabase support

---

### 🟡 PERFORMANCE DEGRADATA

**Sintomi:** Pagine lente (> 3s), health endpoint mostra latency alta

**Diagnosi:**

```bash
# Check health con dettagli
curl "https://admin.gudbro.com/api/health?detailed=true"
```

**Azioni:**

1. Check Redis status (se latency alta):
   - Verifica Upstash dashboard
   - Considera flush cache se corrotto

2. Check Database:
   - Supabase Dashboard → Database → System Health
   - Verifica query lente in Performance Advisor

3. Check Vercel Functions:
   - Vercel Dashboard → Analytics → Functions
   - Identifica funzioni lente

---

### 🟡 BUILD FALLISCE

**Sintomi:** Deploy bloccato, GitHub Actions rosso

**Diagnosi:**

```bash
# Locale: riproduci l'errore
cd /path/to/gudbro-verticals
pnpm install --frozen-lockfile
pnpm turbo build --filter=backoffice
```

**Azioni:**

1. Leggi error message completo nei log
2. Errori comuni:
   - TypeScript: fix type errors
   - Import: fix path imports
   - Env vars: aggiungi variabili mancanti
3. Push fix e attendi nuovo build

---

### 🟡 ERRORI SENTRY IN AUMENTO

**Sintomi:** Alert Sentry, spike di errori

**Azioni:**

1. Vai su https://gudbro.sentry.io
2. Identifica l'errore più frequente
3. Check se correlato a deploy recente
4. Se sì: considera rollback
5. Se no: fix e deploy

---

## MANUTENZIONE

### Rollback Deployment

```bash
# Via Vercel Dashboard (raccomandato)
1. Vercel Dashboard → Deployments
2. Trova deploy precedente funzionante
3. Click "..." → "Promote to Production"

# Via Git (alternativo)
git revert HEAD
git push origin main
```

### Aggiornare Environment Variables

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit variabile
3. Save
4. **IMPORTANTE:** Trigger redeploy per applicare:
   - Push commit vuoto: `git commit --allow-empty -m "trigger redeploy" && git push`
   - Oppure: Vercel Dashboard → Deployments → "..." → Redeploy

### Flush Redis Cache

```bash
# Via Upstash Dashboard
1. https://console.upstash.com
2. Select database
3. CLI → FLUSHALL

# Oppure via API
curl -X POST "https://[your-redis-url]/flushall" \
  -H "Authorization: Bearer [token]"
```

### Database Migration

```bash
# 1. Test su staging PRIMA
cd gudbro-verticals
npx supabase link --project-ref [staging-ref]
npx supabase db push

# 2. Verifica staging funziona
# 3. Poi su production
npx supabase link --project-ref [prod-ref]
npx supabase db push
```

---

## MONITORING

### Health Checks

| Endpoint                  | Frequenza | Timeout |
| ------------------------- | --------- | ------- |
| /api/health               | 5 min     | 30s     |
| /api/health?detailed=true | On-demand | 60s     |

### Metriche Chiave

| Metrica       | Warning | Critical |
| ------------- | ------- | -------- |
| Response time | > 1s    | > 3s     |
| Error rate    | > 1%    | > 5%     |
| DB latency    | > 100ms | > 500ms  |
| Redis latency | > 50ms  | > 200ms  |

### Log Locations

| Tipo           | Location                       |
| -------------- | ------------------------------ |
| Build logs     | Vercel Dashboard → Deployments |
| Runtime logs   | Vercel Dashboard → Logs        |
| Error tracking | Sentry Dashboard               |
| Uptime         | UptimeRobot Dashboard          |

---

## CHECKLIST PRE-DEPLOY

- [ ] Build passa in locale (`pnpm turbo build`)
- [ ] TypeScript passa (`pnpm turbo typecheck`)
- [ ] Lint passa (`pnpm turbo lint`)
- [ ] Test passano (`pnpm test:run`)
- [ ] Env vars necessarie sono su Vercel
- [ ] Migration applicata su staging (se necessario)

---

## CHECKLIST POST-INCIDENT

- [ ] Incidente documentato
- [ ] Root cause identificata
- [ ] Fix implementato
- [ ] Monitoring verificato
- [ ] Team notificato
- [ ] Lesson learned aggiunta a CLAUDE.md sezione 3.5

---

## ESCALATION

| Livello | Tempo     | Azione                                        |
| ------- | --------- | --------------------------------------------- |
| L1      | 0-15 min  | Check logs, tentare rollback                  |
| L2      | 15-30 min | Contattare Gianfranco                         |
| L3      | 30+ min   | Contattare support provider (Vercel/Supabase) |

---

## Appendice: Comandi Utili

```bash
# Check deployment status
curl -s https://admin.gudbro.com/api/health | jq

# Check specific version
curl -s https://admin.gudbro.com/api/health | jq '.version'

# Local build test
pnpm turbo build --filter=backoffice --force

# CI simulation
./scripts/ci-local.sh --quick

# View recent git history
git log --oneline -10

# Revert last commit
git revert HEAD --no-edit && git push
```
