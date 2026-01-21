# VERCEL BACKOFFICE RECOVERY PLAN

**Data creazione:** 2026-01-21
**Da eseguire:** 2026-01-22 ore 15:00
**Status:** PENDING

---

## Contesto

Il progetto `gudbro-backoffice` su Vercel è bloccato da ~60 commits. Nonostante 2 giorni di tentativi (disconnessione/riconnessione GitHub, ignore-build.sh, trigger manuali), il webhook GitHub → Vercel non funziona.

**Prima di eliminare e ricreare**, dobbiamo:

1. Capire cosa è andato storto (root cause)
2. Documentare la configurazione corretta
3. Creare procedure preventive per il futuro

---

## FASE 1: Root Cause Analysis

**Domande da investigare:**

1. **Quando si è rotto esattamente?**
   - Qual è stato l'ultimo deployment automatico da GitHub (non "redeploy")?
   - Cosa è cambiato in quel momento? (configurazione, commit, Vercel update?)

2. **Perché la riconnessione non ha funzionato?**
   - Il webhook GitHub esiste? Sta inviando payload?
   - Vercel riceve i payload ma li ignora? Perché?

3. **Perché coffeeshop e website funzionano ma backoffice no?**
   - Qual è la differenza di configurazione tra i 3 progetti?
   - Hanno tutti lo stesso owner/permissions?

**Cowork può verificare:**

- GitHub → Settings → Webhooks → Recent Deliveries per `gudbro-verticals`
- Vercel → Activity Log per vedere se ci sono eventi ignorati
- Confrontare configurazione dei 3 progetti Vercel

---

## FASE 2: Configurazione Target

**Prima di ricreare, documentiamo la configurazione corretta:**

| Setting             | Valore                                             |
| ------------------- | -------------------------------------------------- |
| Repository          | `elite42/gudbro-verticals`                         |
| Root Directory      | `apps/backoffice`                                  |
| Framework Preset    | Next.js                                            |
| Build Command       | `cd ../.. && pnpm turbo build --filter=backoffice` |
| Output Directory    | `.next`                                            |
| Install Command     | `pnpm install`                                     |
| Node.js Version     | 20.x                                               |
| Branch (Production) | `main`                                             |
| Ignored Build Step  | Vuoto (rimuovere completamente)                    |

**Environment Variables necessarie:**

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
VISUAL_CROSSING_API_KEY=
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
GOOGLE_PLACES_API_KEY=
```

> **NOTA:** Esportare le env vars dal progetto attuale PRIMA di eliminarlo!

---

## FASE 3: Prevenzione Futura

**Checklist Pre-Deploy (da aggiungere a CI):**

- [ ] Build locale passa
- [ ] TypeScript check passa
- [ ] Tutti i progetti Vercel sono in sync con main

**Monitoring da implementare:**

- [ ] Alert se deployment fallisce
- [ ] Alert se deployment non avviene entro X minuti da push
- [ ] Weekly check: confronta commit deployato vs main

**Documentazione da creare:**

- [ ] `docs/VERCEL-SETUP.md` - Configurazione completa per ogni progetto
- [ ] `docs/DEPLOYMENT-TROUBLESHOOTING.md` - Guida debug deployment
- [ ] Backup delle env vars in password manager sicuro

---

## FASE 4: Piano Ricreazione

**Solo dopo aver completato Fasi 1-3:**

1. **Backup**
   - Screenshot configurazione attuale
   - Export env vars (Settings → Environment Variables → Copy all)
   - Nota domini custom configurati

2. **Eliminazione**
   - Vercel → gudbro-backoffice → Settings → Delete Project

3. **Ricreazione**
   - "Add New Project" → Import `elite42/gudbro-verticals`
   - Root Directory: `apps/backoffice`
   - Configura con settings documentati in Fase 2
   - **NON configurare Ignored Build Step** (lasciare vuoto)

4. **Verifica**
   - Push di test
   - Verifica deployment automatico parte
   - Test funzionalità (tooltips, team, i18n)

5. **Domini**
   - Riconfigura `admin.gudbro.com` (se usato)

---

## Output Richiesti

Al termine di questa sessione vogliamo:

1. **Root cause documentato** - Perché si è rotto
2. **docs/VERCEL-SETUP.md** - Configurazione reference
3. **Checklist deployment** - Procedure operative
4. **Progetto ricreato** - Funzionante con auto-deploy

---

## Cronologia Tentativi Precedenti

| Data       | Tentativo                            | Risultato               |
| ---------- | ------------------------------------ | ----------------------- |
| 2026-01-17 | Commit `76777ebc` deployato          | OK (ultimo funzionante) |
| 2026-01-19 | Disconnessione/riconnessione GitHub  | Non ha risolto          |
| 2026-01-19 | Creazione ignore-build.sh            | Non ha risolto          |
| 2026-01-19 | Trigger manuali multipli             | Non ha risolto          |
| 2026-01-20 | Fix CI (Prisma, vitest, Supabase)    | CI OK, deploy no        |
| 2026-01-21 | Deploy hook + push trigger           | Non ha risolto          |
| 2026-01-22 | **PIANIFICATO: Ricreazione da zero** | -                       |

---

## Lezione Appresa

> Quando un collegamento Vercel ↔ GitHub si rompe e la riconnessione non funziona,
> la soluzione più efficace è **eliminare e ricreare il progetto**.
>
> **Prevenzione:** Monitoring attivo sui deployment, alert se nessun deploy in 24h dopo push.
