# GUDBRO Verticals

> **Contesto essenziale per Claude Code**
>
> **Last Updated:** 2026-01-23
> **Version:** 8.0 (Optimized Structure)

---

# HOW TO USE

> **Leggi solo le sezioni rilevanti al task corrente.**

| Attività        | Sezioni da leggere                        |
| --------------- | ----------------------------------------- |
| Inizio sessione | 0 + 1                                     |
| Sviluppo codice | 2 + 3                                     |
| Database/SQL    | 3 + 5 + `docs/LESSONS-LEARNED.md` (Sez.1) |
| AI Co-Manager   | `docs/AI-SYSTEM.md`                       |
| Deploy/Vercel   | 9 + `docs/LESSONS-LEARNED.md` (Sez.2)     |
| Errori/Debug    | `docs/LESSONS-LEARNED.md`                 |
| Fine sessione   | 11                                        |

---

# 0. CURRENT FOCUS

> **Task attiva:** Nessuna (scegli da backlog)
> **Stato:** Infra solida, monitoring attivo (Sentry+UptimeRobot), pronto per nuove task
> **Ultima completata:** Infrastructure Upgrade (7 fasi) + Sentry Verified - 2026-01-23

**Prossime opzioni (da 1-TODO.md):**

- SEC-2FA (2 days) - Two-Factor Auth per admin/owner (in Testing)
- SCALE-CITUS (6 weeks) - Database Sharding per Phase 4
- SITE-CUSTOMIZATION - Sezioni custom per merchant

---

# 1. STARTUP (Obbligatorio)

**OGNI nuova sessione:**

### Step 1: Leggi il Backlog

```
LEGGI con Read tool:
- docs/backlog/2-IN-PROGRESS.md
- docs/backlog/4-DONE.md (ultime 3)
```

### Step 2: Rispondi

```
GUDBRO Ready.

FOCUS: [task da sezione 0]
IN PROGRESS: [da 2-IN-PROGRESS.md]

Vuoi continuare o fare altro?
```

---

# 2. DEVELOPMENT WORKFLOW

> **REGOLA D'ORO:** Explore → Plan → **Verify** → Validate → Implement → Document

| Fase       | Azione                            |
| ---------- | --------------------------------- |
| EXPLORE    | Leggi, capisci, NON scrivere      |
| PLAN       | Cosa, Come, Perché, Rischi        |
| **VERIFY** | Ricerca online se confidenza <95% |
| VALIDATE   | Check PRIMA di implementare       |
| IMPLEMENT  | Codice con confidenza             |
| DOCUMENT   | Mantieni la conoscenza            |

**Quando cercare online:** Confidenza < 95%, tecnologie che cambiano, errori criptici, security-related.

**Plan Mode:** Usa per task > 30 min. Attiva con Shift+Tab (2x) o "entra in plan mode".

---

# 3. VALIDATION GATES

## Prima di SQL/Migration

```
VERIFICA SEMPRE:
- [ ] UUID solo hex (0-9, a-f)
- [ ] Colonne esistono nella tabella
- [ ] Array syntax: '{"a","b"}' NON '["a","b"]'
- [ ] FK references esistono
```

## Prima di Codice

```
VERIFICA SEMPRE:
- [ ] Types importati correttamente (@/types/)
- [ ] Pattern esistenti seguiti
- [ ] Error handling presente
```

> **Errori comuni?** Vedi `docs/LESSONS-LEARNED.md`

---

# 4. REPOSITORY STRUCTURE

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/  # Digital Menu PWA (:3004)
│   └── backoffice/           # Admin Dashboard (:3023)
├── shared/database/          # Database v6.0
│   ├── cuisines/, beverages/, dishes/
│   └── migrations/
├── docs/                     # Documentation
│   ├── backlog/              # Kanban
│   ├── LESSONS-LEARNED.md    # Errori e pattern ⭐
│   ├── AI-SYSTEM.md          # AI Co-Manager docs ⭐
│   ├── VERCEL-SETUP.md       # Vercel config ⭐
│   └── RUNBOOK.md            # Incident response ⭐
└── CLAUDE.md                 # Questo file
```

---

# 5. DATABASE CRITICAL

| Metrica     | Valore |
| ----------- | ------ |
| Prodotti    | ~4653  |
| Ingredienti | 2548   |
| Migrations  | 69     |
| AI Services | 15     |

**Schema:** `docs/DATABASE-SCHEMA.md`
**Errori SQL comuni:** `docs/LESSONS-LEARNED.md` (Sezione 1)

---

# 6. DOCUMENTATION MAP

| File                       | Quando Usare                                |
| -------------------------- | ------------------------------------------- |
| `docs/LESSONS-LEARNED.md`  | **Errori da evitare** (DB, Vercel, TS, Git) |
| `docs/AI-SYSTEM.md`        | **Lavoro su AI Co-Manager**                 |
| `docs/VERCEL-SETUP.md`     | **Config Vercel/Deploy**                    |
| `docs/RUNBOOK.md`          | **Incidenti/Recovery**                      |
| `docs/PRODUCT.md`          | Valutazione feature                         |
| `docs/GIANFRANCO.md`       | Preferenze utente                           |
| `docs/DATABASE-SCHEMA.md`  | Prima di SQL                                |
| `docs/SCALE-ROADMAP.md`    | Scaling infra                               |
| `docs/SECURITY-ROADMAP.md` | Security hardening                          |
| `docs/backlog/`            | Task management                             |

---

# 7. KANBAN

```
docs/backlog/
├── 1-TODO.md
├── 2-IN-PROGRESS.md  # Max 3
├── 3-TESTING.md
└── 4-DONE.md
```

---

# 8. TECH STACK

| Layer     | Technology            |
| --------- | --------------------- |
| Framework | Next.js 14.2.33       |
| Database  | Supabase (PostgreSQL) |
| Deploy    | Vercel                |
| AI        | OpenAI GPT-4          |

---

# 9. COMMANDS

## Dev Servers

```bash
pnpm dev:backoffice    # :3023
pnpm dev:coffeeshop    # :3004

# Verifica porta prima
lsof -i :3023 | grep LISTEN
```

## Build & Deploy

```bash
pnpm build
git push origin main   # Auto-deploy Vercel
```

## CI Simulation

```bash
./scripts/ci-local.sh          # Full
./scripts/ci-local.sh --quick  # Quick
```

## Slash Commands

| Comando     | Descrizione                               |
| ----------- | ----------------------------------------- |
| `/qa-quick` | Check veloce (typecheck, build, advisors) |
| `/verify`   | Verifica completa pre-deploy              |
| `/deploy`   | Build + push + verifica                   |

---

# 10. ARCHITECTURAL DECISIONS

| Decision     | Rule                   |
| ------------ | ---------------------- |
| DB Language  | English only           |
| Translations | Separate table         |
| Schema       | TEXT + CHECK (no ENUM) |
| Accounts     | P5 unified accounts    |

---

# 11. FINE SESSIONE

**Aggiorna `docs/SESSION-LOG.md`** dopo:

- Feature significativa completata
- Decisioni architetturali
- Bug complessi risolti

**Template:**

```markdown
## YYYY-MM-DD

**Focus:** [Cosa]
**Completato:** [Lista]
**Commits:** `hash` - message
**Prossima sessione:** [Cosa fare]
```

---

# 12. ANTI-PATTERNS

| Anti-Pattern        | Soluzione              |
| ------------------- | ---------------------- |
| "Scrivi subito"     | EXPLORE prima          |
| "Fixxa veloce"      | Capire causa root      |
| "Lo documento dopo" | DOCUMENT subito        |
| "Claude sa già"     | Dare context esplicito |

---

**Version:** 8.0
**Changes:**

- v8.0 - Optimized structure: content migrated to satellite files (LESSONS-LEARNED.md, AI-SYSTEM.md)
- v7.2 - CI/CD Pipeline Fix
- v7.1 - Scaling Phase 1-3, Security Phase 1
