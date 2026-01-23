# GUDBRO INFRASTRUCTURE UPGRADE PLAN

**Data creazione:** 2026-01-21
**Da eseguire:** 2026-01-22 ore 15:00
**Status:** ✅ FASE 1-5 COMPLETATE (2026-01-23)

> **Nota Fase 1:** Upgrade a Vercel Pro ($20/mo) necessario per sbloccare i deploy.
> **Nota Fase 2:** Website separato in `elite42/gudbro-website`, CI verde, produzione funzionante.
> **Nota Fase 3:** Supabase staging project creato (`gudbro-staging`), isolamento verificato.
> **Nota Fase 4:** vercel.json aggiornati con framework, regions, git config.
> **Nota Fase 5:** Sentry + UptimeRobot configurati, GitHub Action verify-deploy attivo.

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

### 🛡️ Security Checkpoints (OBBLIGATORI)

> **REGOLA:** Ogni checkpoint deve essere ✅ PRIMA di procedere al successivo.
> **Se un checkpoint fallisce:** STOP, risolvi, poi riprova.

| #   | Checkpoint                         | Verifica                                         | Rollback Plan                   |
| --- | ---------------------------------- | ------------------------------------------------ | ------------------------------- |
| 2.1 | **Pre-separazione backup**         | `git stash` o branch backup del codice website   | N/A                             |
| 2.2 | **Website builda standalone**      | `cd gudbro-website && pnpm build` → Exit 0       | Non procedere, fix errori build |
| 2.3 | **Website deploya con successo**   | Vercel deploy → Status "Ready"                   | Verifica env vars, logs         |
| 2.4 | **Website funziona in produzione** | Visita gudbro.com, verifica tutte le pagine      | Rollback DNS a vecchio deploy   |
| 2.5 | **Monorepo builda SENZA website**  | Dopo `rm -rf apps/website`, esegui `pnpm build`  | Ripristina da git               |
| 2.6 | **Nessun broken import**           | `grep -r "apps/website" .` deve dare 0 risultati | Fix imports prima di commit     |
| 2.7 | **CI passa**                       | Push su branch test, verifica GitHub Actions     | Fix CI prima di merge           |

**Sequenza:**

```
2.1 → 2.2 → 2.3 → 2.4 → (SOLO ORA) → 2.5 → 2.6 → 2.7
         ↑
    PUNTO DI NON RITORNO: dopo 2.4 puoi rimuovere dal monorepo
```

### Verifica Finale

- [ ] gudbro-website builda standalone
- [ ] Deploy Vercel funziona
- [ ] gudbro.com punta al nuovo progetto
- [ ] Monorepo funziona senza website
- [ ] **TUTTI i checkpoint 2.1-2.7 completati**

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

### 🛡️ Security Checkpoints (OBBLIGATORI)

> **⚠️ CRITICO:** Staging MAI deve toccare dati di produzione.
> Un errore qui può corrompere dati reali dei clienti.

| #   | Checkpoint                                 | Verifica                                                      | Conseguenza se saltato          |
| --- | ------------------------------------------ | ------------------------------------------------------------- | ------------------------------- |
| 3.1 | **Supabase staging è progetto SEPARATO**   | Dashboard Supabase → sono 2 progetti distinti                 | Rischio: scritture su prod      |
| 3.2 | **URL staging ≠ URL prod**                 | Confronta `NEXT_PUBLIC_SUPABASE_URL` staging vs prod          | Rischio: merge dati             |
| 3.3 | **Service key staging ≠ Service key prod** | Le chiavi devono essere diverse                               | Rischio: bypass RLS su prod     |
| 3.4 | **Test connessione isolata**               | Da staging, `SELECT current_database()` → nome staging        | Rischio: query su prod          |
| 3.5 | **Seed data NON contiene dati prod**       | Verifica seed script usa SOLO dati fake/test                  | Rischio: leak dati sensibili    |
| 3.6 | **Dry-run INSERT**                         | Inserisci record test in staging, verifica NON appare in prod | Rischio: corruzione dati        |
| 3.7 | **Dry-run DELETE**                         | Elimina record test da staging, verifica prod invariato       | Rischio: perdita dati           |
| 3.8 | **Env vars Vercel separate**               | Preview env vars ≠ Production env vars                        | Rischio: staging scrive su prod |

**Test di Isolamento Obbligatorio:**

```sql
-- Esegui su STAGING
INSERT INTO test_isolation (id, env) VALUES (gen_random_uuid(), 'staging-test');

-- Poi verifica su PROD
SELECT * FROM test_isolation WHERE env = 'staging-test';
-- DEVE restituire 0 righe!
```

**Sequenza:**

```
3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 3.6 → 3.7 → 3.8
                    ↑
              SOLO dopo 3.4 inizia a usare staging
```

### Verifica Finale

- [ ] Supabase staging project creato
- [ ] Branch staging esiste
- [ ] Push su staging → deploy su staging.admin.gudbro.com
- [ ] Staging usa DB staging (non prod!)
- [ ] Workflow documentato
- [ ] **Test isolamento eseguito e verificato**
- [ ] **TUTTI i checkpoint 3.1-3.8 completati**

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

### 🛡️ Security Checkpoints (OBBLIGATORI)

> **Principio:** IaC deve produrre lo STESSO risultato della config manuale.
> Qualsiasi differenza = potenziale problema.

| #   | Checkpoint                 | Verifica                                         | Azione se fallisce   |
| --- | -------------------------- | ------------------------------------------------ | -------------------- |
| 4.1 | **Backup config manuale**  | Screenshot/export della config Vercel attuale    | N/A (prerequisito)   |
| 4.2 | **vercel.json valido**     | `npx vercel pull` non dà errori di parsing       | Fix JSON syntax      |
| 4.3 | **Deploy test su branch**  | Push vercel.json su branch test, verifica deploy | Non pushare su main  |
| 4.4 | **Confronto output**       | Build output identico a prima di vercel.json     | Analizza differenze  |
| 4.5 | **Env vars preservate**    | Tutte le env vars esistenti ancora funzionano    | Ripristina da backup |
| 4.6 | **Regions corrette**       | `"regions": ["fra1"]` → verifica deploy in EU    | Fix region config    |
| 4.7 | **Build command corretto** | Turbo build filtra correttamente l'app           | Fix filter pattern   |

**Test Pre-Merge:**

```bash
# Su branch test (NON main)
git checkout -b test-vercel-json
git add apps/backoffice/vercel.json
git commit -m "test: vercel.json config"
git push origin test-vercel-json

# Aspetta deploy Vercel preview
# Verifica: funziona come prima?
# Se SI → merge to main
# Se NO → fix o rollback
```

### Verifica Finale

- [ ] vercel.json committati
- [ ] Deploy usa config da file (non dashboard)
- [ ] Cambiare config = PR review
- [ ] **Build output identico a config manuale**
- [ ] **TUTTI i checkpoint 4.1-4.7 completati**

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

### 🛡️ Security Checkpoints (OBBLIGATORI)

> **Filosofia:** Il monitoring che non viene testato non funziona quando serve.
> DEVI simulare errori per verificare che gli alert arrivino.

| #   | Checkpoint                   | Verifica                                                  | Azione se fallisce              |
| --- | ---------------------------- | --------------------------------------------------------- | ------------------------------- |
| 5.1 | **Health endpoint risponde** | `curl https://admin.gudbro.com/api/health` → 200          | Fix endpoint prima di procedere |
| 5.2 | **Health mostra version**    | Response contiene `VERCEL_GIT_COMMIT_SHA`                 | Aggiungere env var              |
| 5.3 | **Sentry cattura errori**    | Trigger errore test, appare in Sentry dashboard           | Verifica DSN e config           |
| 5.4 | **Slack webhook funziona**   | Test message arriva nel canale                            | Verifica URL webhook            |
| 5.5 | **UptimeRobot configurato**  | Monitor attivo per tutti gli endpoint                     | Completare setup                |
| 5.6 | **SIMULAZIONE DOWN**         | Metti temporaneamente offline un endpoint, verifica alert | Fix alert config                |
| 5.7 | **GitHub Action funziona**   | Push su main, action esegue e verifica SHA                | Fix workflow yaml               |
| 5.8 | **Alert entro 10 min**       | Dal momento del problema all'alert < 10 min               | Riduci intervallo check         |

**Test Obbligatorio - Simulazione Errore:**

```bash
# 1. Crea errore intenzionale
# In api/health/route.ts temporaneamente:
# return Response.json({ status: 'error' }, { status: 500 })

# 2. Push e aspetta deploy

# 3. Verifica:
# - [ ] Sentry ha catturato l'errore?
# - [ ] Slack ha ricevuto notifica?
# - [ ] UptimeRobot ha rilevato down?
# - [ ] GitHub Action ha fallito come previsto?

# 4. IMPORTANTE: Ripristina health endpoint!
```

**Tempi di Risposta Target:**

| Canale        | Tempo Massimo | Azione             |
| ------------- | ------------- | ------------------ |
| Sentry        | < 1 min       | Capture automatico |
| Slack         | < 5 min       | Webhook Vercel     |
| UptimeRobot   | < 10 min      | Check ogni 5 min   |
| GitHub Action | < 3 min       | Post-deploy check  |

### Verifica Finale

- [ ] Health endpoints funzionano
- [ ] Sentry configurato
- [ ] Notifiche Slack attive
- [ ] Uptime monitoring attivo
- [ ] GitHub Action verifica deploy
- [ ] **Simulazione errore eseguita**
- [ ] **Tutti gli alert ricevuti entro i tempi target**
- [ ] **TUTTI i checkpoint 5.1-5.8 completati**

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

### 🛡️ Security Checkpoints (OBBLIGATORI)

> **Principio:** Documentazione non testata = documentazione falsa.
> Ogni procedura scritta DEVE essere eseguibile.

| #   | Checkpoint                          | Verifica                                      | Azione se fallisce        |
| --- | ----------------------------------- | --------------------------------------------- | ------------------------- |
| 6.1 | **VERCEL-SETUP.md testabile**       | Segui ogni passo, funziona al primo tentativo | Fix documentazione        |
| 6.2 | **DEPLOYMENT-WORKFLOW.md accurato** | Workflow descritto = workflow reale           | Aggiorna doc              |
| 6.3 | **RUNBOOK.md completo**             | Ogni scenario ha procedura chiara             | Aggiungi scenari mancanti |
| 6.4 | **Env vars documentate**            | Ogni env var ha descrizione e esempio         | Completa lista            |
| 6.5 | **Backup verificato**               | Restore da backup funziona                    | Test restore              |
| 6.6 | **User review**                     | Gianfranco legge e approva ogni doc           | Revisione obbligatoria    |

**Test Documentazione - Checklist:**

```markdown
Per ogni documento, verifica:

- [ ] Posso seguire i passi senza chiedere chiarimenti?
- [ ] I comandi funzionano se copiati/incollati?
- [ ] Gli screenshot/esempi sono aggiornati?
- [ ] I link interni funzionano?
- [ ] Un nuovo developer capirebbe?
```

### Verifica Finale

- [ ] VERCEL-SETUP.md completo
- [ ] DEPLOYMENT-WORKFLOW.md completo
- [ ] RUNBOOK.md completo
- [ ] Env vars backed up
- [ ] **User review completata**
- [ ] **TUTTI i checkpoint 6.1-6.6 completati**

---

## FASE 7: Aggiornamento Documentazione Esistente

**Tempo: ~6-8h | Priorità: CRITICA**

### Obiettivo

Aggiornare TUTTA la documentazione esistente per riflettere la nuova architettura. Questa fase è critica perché CLAUDE.md è la "memoria" che guida lo sviluppo futuro - se non è precisa, causerà errori.

### Principi Guida

1. **Single Source of Truth** - Ogni informazione in un solo posto, riferimenti altrove
2. **Versionamento** - Data e versione su ogni documento
3. **Esempi concreti** - Non "esegui il comando", ma `pnpm dev:backoffice`
4. **Testabile** - Ogni comando/procedura deve funzionare se copiato
5. **Struttura consistente** - Stessi pattern in tutti i docs
6. **Cross-reference** - Link tra documenti correlati

### File da Aggiornare

#### 1. CLAUDE.md (Priorità: MASSIMA)

| Sezione                        | Modifiche Richieste                                       |
| ------------------------------ | --------------------------------------------------------- |
| **Sezione 0 (Current Focus)**  | Aggiornare stato progetto post-migrazione                 |
| **Sezione 4 (Repo Structure)** | Nuova struttura: 2 repo, gudbro-platform + gudbro-website |
| **Sezione 9 (Commands)**       | Rimuovere comandi website, aggiungere comandi staging     |
| **Sezione 2 (Workflow)**       | Nuovo workflow Dev → Staging → Prod                       |
| **Nuova Sezione**              | Aggiungere "Staging Environment" con dettagli             |
| **Sezione 3.5 (Compounding)**  | Aggiungere lezioni apprese da questo upgrade              |
| **Sezione 8 (Tech Stack)**     | Aggiungere info su Supabase staging                       |

```markdown
# Esempio nuova Sezione 4 (Repo Structure)

## Repository

GUDBRO usa 2 repository separati:

### gudbro-platform (backoffice + PWA)
```

elite42/gudbro-platform/
├── apps/
│ ├── backoffice/ # Admin Dashboard (:3023)
│ └── pwa/ # Digital Menu PWA (:3004)
├── packages/
│ ├── database/ # Schema, migrations, types
│ ├── types/ # Shared TypeScript types
│ ├── utils/ # Shared utilities
│ └── ui/ # Shared UI components
└── docs/ # Documentazione

```

### gudbro-website (standalone)
```

elite42/gudbro-website/
├── app/ # Next.js app
├── components/ # React components
└── public/ # Static assets

```

```

#### 2. docs/DEVELOPMENT-WORKFLOW.md

| Sezione              | Modifiche                                     |
| -------------------- | --------------------------------------------- |
| Workflow principale  | Dev → Staging → Prod (non più direct to prod) |
| Branching strategy   | Aggiungere branch `staging`                   |
| Pre-deploy checklist | Test su staging obbligatorio                  |

#### 3. docs/PROCEDURE-CHECKLIST.md

| Aggiunta           | Contenuto                                                    |
| ------------------ | ------------------------------------------------------------ |
| Checklist staging  | Verifiche prima di merge staging → main                      |
| Checklist hotfix   | Procedura per fix urgenti (bypass staging quando necessario) |
| Checklist rollback | Come tornare indietro se qualcosa va storto                  |

#### 4. docs/backlog/\*.md

| File      | Azione                                                     |
| --------- | ---------------------------------------------------------- |
| 1-TODO.md | Rimuovere task completate, aggiungere task post-migrazione |
| 4-DONE.md | Documentare TUTTE le 7 fasi con dettagli                   |

#### 5. File di Configurazione

| File                     | Modifiche                             |
| ------------------------ | ------------------------------------- |
| turbo.json               | Rimuovere riferimenti a website       |
| package.json (root)      | Aggiornare scripts, rimuovere website |
| .github/workflows/ci.yml | Aggiornare per nuova struttura        |
| pnpm-workspace.yaml      | Rimuovere apps/website                |

#### 6. README.md (root)

Aggiornare con:

- Nuova struttura repository
- Link a gudbro-website repo
- Quick start aggiornato
- Architettura staging

### Verifica Qualità

Prima di considerare Fase 7 completa:

- [ ] **Test CLAUDE.md**: Leggo da zero e verifico ogni comando funzioni
- [ ] **Test workflow**: Simulo push → staging → prod
- [ ] **Test onboarding**: Un nuovo dev può seguire i docs senza errori?
- [ ] **Zero riferimenti obsoleti**: Grep per "gudbro-verticals" deve dare 0 risultati (tranne storico)
- [ ] **Cross-reference check**: Tutti i link interni funzionano
- [ ] **Version bump**: Aggiornare versione CLAUDE.md (es. v8.0)

### Template Aggiornamento Versione

```markdown
**File:** `CLAUDE.md`
**Version:** 8.0
**Updated:** 2026-01-XX
**Changes:**

- v8.0 - Infrastructure Upgrade: 2 repo (platform + website), staging environment, monitoring
- v7.2 - CI/CD Pipeline Fix
- ...
```

### Output Fase 7

| Deliverable             | Descrizione                                     |
| ----------------------- | ----------------------------------------------- |
| CLAUDE.md v8.0          | Completamente aggiornato per nuova architettura |
| DEVELOPMENT-WORKFLOW.md | Nuovo workflow con staging                      |
| PROCEDURE-CHECKLIST.md  | Checklist aggiornate                            |
| Backlog sync            | TODO e DONE aggiornati                          |
| Config files            | turbo.json, package.json, CI aggiornati         |
| README.md               | Quick start per nuova struttura                 |

### 🛡️ Security Checkpoints (OBBLIGATORI)

> **CRITICO:** CLAUDE.md è la "memoria" del progetto.
> Se contiene informazioni sbagliate, ogni sessione futura partirà con presupposti errati.

| #   | Checkpoint                    | Verifica                                                 | Conseguenza se saltato        |
| --- | ----------------------------- | -------------------------------------------------------- | ----------------------------- |
| 7.1 | **Zero riferimenti obsoleti** | `grep -r "gudbro-verticals" docs/` → 0 (escluso storico) | Claude confuso su struttura   |
| 7.2 | **Comandi testati**           | Ogni comando in CLAUDE.md funziona se copiato            | Developer bloccati            |
| 7.3 | **Sezione repo corretta**     | Riflette 2 repo: platform + website                      | Assunzioni sbagliate          |
| 7.4 | **Workflow staging presente** | Dev → Staging → Prod documentato                         | Deploy diretto in prod        |
| 7.5 | **Cross-reference validi**    | Tutti i link interni funzionano                          | Docs orfani                   |
| 7.6 | **Version bump**              | CLAUDE.md version = 8.0                                  | Confusione versione           |
| 7.7 | **User review finale**        | Gianfranco approva CLAUDE.md v8.0                        | Docs non allineati con vision |
| 7.8 | **Test onboarding**           | Simula: "nuovo dev legge docs, riesce a fare setup?"     | Onboarding fallito            |

**Test Comandi - Script:**

```bash
#!/bin/bash
# test-claude-md-commands.sh

echo "Testing CLAUDE.md commands..."

# Test dev servers
echo "1. Testing dev servers..."
cd apps/backoffice && timeout 10 pnpm dev &
sleep 5
curl -s http://localhost:3023 > /dev/null && echo "✅ backoffice" || echo "❌ backoffice"
pkill -f "next dev"

# Test build
echo "2. Testing build..."
pnpm build && echo "✅ build" || echo "❌ build"

# Test CI simulation
echo "3. Testing CI simulation..."
./scripts/ci-local.sh --quick && echo "✅ ci-local" || echo "❌ ci-local"

echo "Done!"
```

**Grep Check Obbligatorio:**

```bash
# Deve restituire 0 risultati (escluso questo file e storico)
grep -r "gudbro-verticals" . \
  --include="*.md" \
  --exclude-dir=".git" \
  --exclude="VERCEL-RECOVERY-PLAN.md" \
  --exclude="4-DONE.md" \
  --exclude="SESSION-LOG.md"

# Se > 0 risultati → aggiorna quei file!
```

### Verifica Finale Fase 7

- [ ] CLAUDE.md aggiornato a v8.0 con nuova struttura
- [ ] Sezione repo structure riflette 2 repo
- [ ] Sezione commands aggiornata (no website, +staging)
- [ ] Sezione workflow include staging
- [ ] Compounding Engineering aggiornato con lezioni
- [ ] docs/DEVELOPMENT-WORKFLOW.md aggiornato
- [ ] docs/PROCEDURE-CHECKLIST.md aggiornato
- [ ] turbo.json senza website
- [ ] package.json root aggiornato
- [ ] pnpm-workspace.yaml aggiornato
- [ ] .github/workflows aggiornati
- [ ] README.md aggiornato
- [ ] Backlog sincronizzato (TODO + DONE)
- [ ] **Zero riferimenti a vecchia struttura (grep check)**
- [ ] **Tutti i comandi testati e funzionanti**
- [ ] **User review completata e approvata**
- [ ] **TUTTI i checkpoint 7.1-7.8 completati**

---

## TIMELINE ESECUZIONE

| Giorno       | Fase                         | Tempo | Chi          |
| ------------ | ---------------------------- | ----- | ------------ |
| 22 Gen 15:00 | Fase 1: Recovery             | 45min | Cowork       |
| 22 Gen 16:00 | Fase 2: Separazione Website  | 3h    | Claude + Dev |
| 23 Gen       | Fase 3: Staging              | 6h    | Claude + Dev |
| 23 Gen       | Fase 4: IaC                  | 2h    | Claude       |
| 24 Gen       | Fase 5: Monitoring           | 3h    | Claude + Dev |
| 24 Gen       | Fase 6: Nuova Documentazione | 2h    | Claude       |
| 25 Gen       | Fase 7: Aggiornamento Docs   | 6-8h  | Claude       |

**Totale: ~23-25h su 4 giorni**

---

## CHECKLIST FINALE

### 🛡️ Security Checkpoints Summary

> **REGOLA ASSOLUTA:** Nessuna fase è completa senza TUTTI i suoi checkpoint ✅

| Fase   | Checkpoints | Critico                             |
| ------ | ----------- | ----------------------------------- |
| Fase 2 | 2.1 → 2.7   | 2.4 (punto di non ritorno)          |
| Fase 3 | 3.1 → 3.8   | 3.6, 3.7 (test isolamento)          |
| Fase 4 | 4.1 → 4.7   | 4.4 (confronto output)              |
| Fase 5 | 5.1 → 5.8   | 5.6 (simulazione down)              |
| Fase 6 | 6.1 → 6.6   | 6.6 (user review)                   |
| Fase 7 | 7.1 → 7.8   | 7.7, 7.8 (review + onboarding test) |

### Infrastruttura

- [ ] Backoffice deploy automatico funziona
- [ ] Website in repo separato
- [ ] Staging environment attivo
- [ ] vercel.json per ogni app
- [ ] Health endpoints attivi
- [ ] Monitoring configurato
- [ ] **Tutti i checkpoint Fase 2-5 completati**

### Workflow

- [ ] Branch staging esiste
- [ ] Dev → Staging → Prod documentato
- [ ] Team sa come usare staging
- [ ] **Test isolamento staging/prod eseguito**

### Nuova Documentazione (Fase 6)

- [ ] VERCEL-SETUP.md completo
- [ ] DEPLOYMENT-WORKFLOW.md completo
- [ ] RUNBOOK.md completo
- [ ] Env vars backed up
- [ ] **User review completata**
- [ ] **Tutti i checkpoint 6.1-6.6 completati**

### Aggiornamento Docs Esistenti (Fase 7)

- [ ] CLAUDE.md aggiornato a v8.0 con nuova struttura
- [ ] Sezione repo structure riflette 2 repo
- [ ] Sezione commands aggiornata (no website, +staging)
- [ ] Sezione workflow include staging
- [ ] Compounding Engineering aggiornato con lezioni
- [ ] docs/DEVELOPMENT-WORKFLOW.md aggiornato
- [ ] docs/PROCEDURE-CHECKLIST.md aggiornato
- [ ] turbo.json senza website
- [ ] package.json root aggiornato
- [ ] pnpm-workspace.yaml aggiornato
- [ ] .github/workflows aggiornati
- [ ] README.md aggiornato
- [ ] Backlog sincronizzato (TODO + DONE)
- [ ] Zero riferimenti a vecchia struttura
- [ ] Tutti i comandi testati e funzionanti
- [ ] **User review finale completata**
- [ ] **Tutti i checkpoint 7.1-7.8 completati**

### Test Finali

- [ ] Push su website → solo website builda
- [ ] Push su platform → backoffice e/o pwa buildano
- [ ] Push su staging → deploy su staging
- [ ] Errore → alert arriva
- [ ] Nuovo dev può fare onboarding seguendo docs
- [ ] **Simulazione errore completata con alert ricevuti**

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
**Ultimo aggiornamento:** 2026-01-22
**Autori:** Claude + Gianfranco

**Changelog:**

- 2026-01-22: Aggiunti Security Checkpoints obbligatori per Fasi 2-7
- 2026-01-21: Documento iniziale con 7 fasi
