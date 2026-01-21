# GUDBRO INFRASTRUCTURE UPGRADE PLAN

**Data creazione:** 2026-01-21
**Da eseguire:** 2026-01-22 ore 15:00
**Status:** READY TO EXECUTE

---

## Obiettivo

Trasformare l'infrastruttura da "quasi pronta" a **pronta per produzione**:

- Zero single points of failure
- Ambiente staging per test sicuri
- Monitoring e alerting
- Deploy isolati e indipendenti

---

## PANORAMICA CAMBIAMENTI

### Prima (Fragile)

```
1 Repo (gudbro-verticals)
         ↓
    3 Progetti Vercel
    (webhook condiviso, fragile)
         ↓
    1 Database Supabase
         ↓
    Deploy diretto in PROD
    🙏 Speriamo funzioni
```

### Dopo (Solido)

```
2 Repo Separati
├── gudbro-platform (backoffice + PWA)
└── gudbro-website (standalone)
         ↓
    3 Progetti Vercel (isolati)
         ↓
    2 Database Supabase
    ├── Produzione
    └── Staging
         ↓
    Workflow: Dev → Staging → Prod
    ✅ Testato prima di produzione
```

---

## FASE 1: Recovery Backoffice

**Tempo: ~45 min | Priorità: URGENTE**

### Obiettivo

Ripristinare deploy automatico del backoffice.

### Task per Cowork

1. **Investigazione (10 min)**
   - GitHub → Webhooks → Recent Deliveries
   - Confronto config: website vs backoffice vs pwa
   - Documentare differenze trovate

2. **Backup (5 min)**
   - Export TUTTE le env vars da Vercel
   - Screenshot configurazione attuale
   - Salvare in luogo sicuro

3. **Eliminazione (2 min)**
   - Vercel → gudbro-backoffice → Settings → Delete Project

4. **Ricreazione (10 min)**

   ```
   Project Name: gudbro-backoffice
   Repository: elite42/gudbro-verticals
   Root Directory: apps/backoffice
   Framework: Next.js
   Ignored Build Step: VUOTO (non configurare!)
   ```

   - Aggiungere tutte le env vars dal backup

5. **Verifica (10 min)**
   - Primo deploy completa con successo
   - Push di test → deploy automatico parte
   - Verificare tooltips, i18n, team page funzionano

---

## FASE 2: Separazione Website

**Tempo: ~3h | Priorità: ALTA**

### Obiettivo

Isolare completamente il sito marketing.

### Struttura Target

```
GitHub:
├── elite42/gudbro-platform     (rinomina da gudbro-verticals)
│   ├── apps/
│   │   ├── backoffice/
│   │   └── pwa/
│   └── packages/
│       ├── database/
│       ├── types/
│       ├── utils/
│       └── ui/
│
└── elite42/gudbro-website      (NUOVO - standalone)
    ├── app/
    ├── components/
    ├── public/
    ├── package.json
    └── vercel.json
```

### Steps

1. **Creare nuovo repo `gudbro-website`**

   ```bash
   # Su GitHub: Create new repository "gudbro-website"
   # Clone in locale
   git clone git@github.com:elite42/gudbro-website.git
   ```

2. **Copiare codice website**

   ```bash
   # Dal monorepo, copia apps/website
   cp -r gudbro-verticals/apps/website/* gudbro-website/
   ```

3. **Rimuovere dipendenze shared non necessarie**
   - Il website non ha bisogno di @gudbro/database
   - Mantenere solo dipendenze essenziali
   - Aggiornare imports

4. **Creare vercel.json**

   ```json
   {
     "buildCommand": "pnpm build",
     "outputDirectory": ".next",
     "framework": "nextjs"
   }
   ```

5. **Setup Vercel**
   - Add New Project → Import gudbro-website
   - Configurare env vars (solo quelle necessarie per website)
   - Deploy

6. **Rimuovere website dal monorepo**

   ```bash
   cd gudbro-verticals
   rm -rf apps/website
   git add -A
   git commit -m "chore: remove website (moved to dedicated repo)"
   ```

7. **Rinominare repo principale** (opzionale)
   - GitHub → gudbro-verticals → Settings → Rename to `gudbro-platform`

### Verifica

- [ ] gudbro-website builda standalone
- [ ] Deploy Vercel funziona
- [ ] gudbro.com punta al nuovo progetto
- [ ] Monorepo funziona senza website

---

## FASE 3: Ambiente Staging

**Tempo: ~6h | Priorità: ALTA**

### Obiettivo

Mai più deploy diretto in produzione senza test.

### Architettura

```
                    ┌─────────────────┐
                    │   Development   │
                    │  (localhost)    │
                    └────────┬────────┘
                             │ push feature branch
                             ▼
                    ┌─────────────────┐
                    │    Preview      │
                    │ (auto per PR)   │
                    └────────┬────────┘
                             │ merge to staging
                             ▼
┌─────────────────┐ ┌─────────────────┐
│ Supabase        │ │    Staging      │
│ Staging DB      │◄│ staging.admin   │
└─────────────────┘ │ .gudbro.com     │
                    └────────┬────────┘
                             │ merge to main (dopo QA)
                             ▼
┌─────────────────┐ ┌─────────────────┐
│ Supabase        │ │   Production    │
│ Production DB   │◄│ admin.gudbro.com│
└─────────────────┘ └─────────────────┘
```

### Steps

1. **Creare Supabase Staging Project**
   - Supabase Dashboard → New Project
   - Name: `gudbro-staging`
   - Region: stesso di prod
   - Applicare tutte le migrations
   - Seed con dati di test

2. **Configurare Branch Staging su GitHub**

   ```bash
   git checkout -b staging
   git push -u origin staging
   ```

3. **Configurare Vercel per Staging**
   - gudbro-backoffice → Settings → Git
   - Production Branch: `main`
   - Preview Branches: tutti
   - Aggiungere dominio: `staging.admin.gudbro.com`

4. **Environment Variables per Staging**

   ```
   # Su Vercel, per Preview/Staging:
   NEXT_PUBLIC_SUPABASE_URL=https://xxx-staging.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=staging_anon_key
   SUPABASE_SERVICE_ROLE_KEY=staging_service_key
   # ... altre keys staging
   ```

5. **Creare Seed Data Script**

   ```bash
   # scripts/seed-staging.ts
   # Popola staging con dati di test realistici
   # - Merchant demo
   # - Menu items
   # - Ordini di esempio
   ```

6. **Documentare Workflow**

   ```markdown
   ## Deploy Workflow

   1. Feature branch → PR → Preview automatico
   2. Review code + test su preview
   3. Merge to staging → Deploy su staging.admin.gudbro.com
   4. QA completo su staging
   5. Merge staging → main → Deploy produzione
   ```

### Ripetere per PWA

- staging.menu.gudbro.com
- Stesse env vars staging

### Verifica

- [ ] Supabase staging project creato
- [ ] Branch staging esiste
- [ ] Push su staging → deploy su staging.admin.gudbro.com
- [ ] Staging usa DB staging (non prod!)
- [ ] Workflow documentato

---

## FASE 4: Infrastructure as Code

**Tempo: ~2h | Priorità: MEDIA**

### Obiettivo

Configurazione Vercel versionata, non manuale.

### Files da Creare

**apps/backoffice/vercel.json**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd ../.. && pnpm turbo build --filter=backoffice",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["fra1"],
  "env": {
    "NEXT_PUBLIC_APP_ENV": "production"
  },
  "git": {
    "deploymentEnabled": {
      "main": true,
      "staging": true
    }
  }
}
```

**apps/pwa/vercel.json**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd ../.. && pnpm turbo build --filter=@gudbro/coffeeshop",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["fra1"]
}
```

### Verifica

- [ ] vercel.json committati
- [ ] Deploy usa config da file (non dashboard)
- [ ] Cambiare config = PR review

---

## FASE 5: Monitoring & Alerting

**Tempo: ~3h | Priorità: ALTA**

### Obiettivo

Sapere immediatamente quando qualcosa si rompe.

### Componenti

1. **Health Endpoints**

   ```typescript
   // app/api/health/route.ts
   export async function GET() {
     return Response.json({
       status: 'ok',
       version: process.env.VERCEL_GIT_COMMIT_SHA,
       timestamp: new Date().toISOString(),
     });
   }
   ```

2. **Sentry Error Tracking**
   - Già in backlog (Phase 1 scaling)
   - Cattura errori runtime
   - Alert su Slack/email

3. **Vercel Deployment Notifications**
   - Vercel → Settings → Notifications
   - Slack webhook per deploy success/fail

4. **Uptime Monitoring**
   - Servizio: UptimeRobot (free) o Better Stack
   - Check ogni 5 min:
     - admin.gudbro.com/api/health
     - menu.gudbro.com/api/health
     - gudbro.com
   - Alert se down > 2 check consecutivi

5. **GitHub Action: Verify Deploy**
   ```yaml
   # .github/workflows/verify-deploy.yml
   name: Verify Deployment
   on:
     push:
       branches: [main]
   jobs:
     verify:
       runs-on: ubuntu-latest
       steps:
         - name: Wait for Vercel
           run: sleep 120
         - name: Check deployment
           run: |
             DEPLOYED=$(curl -s https://admin.gudbro.com/api/health | jq -r '.version')
             if [ "$DEPLOYED" != "${{ github.sha }}" ]; then
               echo "::error::Deployment mismatch!"
               exit 1
             fi
   ```

### Verifica

- [ ] Health endpoints funzionano
- [ ] Sentry configurato
- [ ] Notifiche Slack attive
- [ ] Uptime monitoring attivo
- [ ] GitHub Action verifica deploy

---

## FASE 6: Documentazione

**Tempo: ~2h | Priorità: MEDIA**

### Files da Creare

1. **docs/VERCEL-SETUP.md**
   - Configurazione completa ogni progetto
   - Env vars necessarie
   - Troubleshooting comune

2. **docs/DEPLOYMENT-WORKFLOW.md**
   - Workflow dev → staging → prod
   - Come fare rollback
   - Checklist pre-deploy

3. **docs/RUNBOOK.md**
   - Cosa fare se X si rompe
   - Contatti emergenza
   - Procedure recovery

4. **Backup Env Vars**
   - Export in password manager (1Password/Bitwarden)
   - Aggiornare quando cambiano

---

## TIMELINE ESECUZIONE

| Giorno       | Fase                        | Tempo | Chi          |
| ------------ | --------------------------- | ----- | ------------ |
| 22 Gen 15:00 | Fase 1: Recovery            | 45min | Cowork       |
| 22 Gen 16:00 | Fase 2: Separazione Website | 3h    | Claude + Dev |
| 23 Gen       | Fase 3: Staging             | 6h    | Claude + Dev |
| 23 Gen       | Fase 4: IaC                 | 2h    | Claude       |
| 24 Gen       | Fase 5: Monitoring          | 3h    | Claude + Dev |
| 24 Gen       | Fase 6: Docs                | 2h    | Claude       |

**Totale: ~17h su 3 giorni**

---

## CHECKLIST FINALE

### Infrastruttura

- [ ] Backoffice deploy automatico funziona
- [ ] Website in repo separato
- [ ] Staging environment attivo
- [ ] vercel.json per ogni app
- [ ] Health endpoints attivi
- [ ] Monitoring configurato

### Workflow

- [ ] Branch staging esiste
- [ ] Dev → Staging → Prod documentato
- [ ] Team sa come usare staging

### Documentazione

- [ ] VERCEL-SETUP.md completo
- [ ] DEPLOYMENT-WORKFLOW.md completo
- [ ] RUNBOOK.md completo
- [ ] Env vars backed up

### Test

- [ ] Push su website → solo website builda
- [ ] Push su platform → backoffice e/o pwa buildano
- [ ] Push su staging → deploy su staging
- [ ] Errore → alert arriva

---

## RISULTATO ATTESO

Dopo queste fasi:

| Aspetto          | Prima                | Dopo                      |
| ---------------- | -------------------- | ------------------------- |
| Deploy rotto     | Giorni per scoprirlo | Alert in 5 min            |
| Bug in prod      | Frequenti            | Rari (testato in staging) |
| Paura di pushare | Alta                 | Zero                      |
| Recovery time    | Giorni               | Ore                       |
| Documentazione   | Sparsa               | Centralizzata             |
| Confidence       | Bassa                | Alta                      |

**Da "quasi pronti" a "pronti per produzione".**

---

## LEZIONI APPRESE

> 1. Mai configurazione manuale senza backup
> 2. Sempre ambiente staging prima di prod
> 3. Monitoring non è opzionale
> 4. Separare quando ha senso (website indipendente)
> 5. Infrastructure as Code sempre

---

**Documento creato:** 2026-01-21
**Ultimo aggiornamento:** 2026-01-21
**Autori:** Claude + Gianfranco
