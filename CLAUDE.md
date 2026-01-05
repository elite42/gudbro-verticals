# GUDBRO Verticals

> **Contesto essenziale per Claude Code**
>
> **Last Updated:** 2026-01-05
> **Version:** 5.0 (Numbered sections for reliable memorization)

---

# 1. STARTUP COMMAND (OBBLIGATORIO)

> **IMPORTANTE:** Questo e' l'UNICO file CLAUDE.md del progetto.
> Claude Code legge automaticamente questo file all'avvio.

## 1.1 Procedura di Avvio

**DEVI eseguire questi passaggi OGNI volta che inizi una nuova sessione:**

### Step 1: Leggi il Backlog (USA IL TOOL READ)

```
LEGGI questi file con il tool Read:
- docs/backlog/2-IN-PROGRESS.md  → Task attualmente in corso
- docs/backlog/4-DONE.md         → Ultime 3 task completate (per contesto)
```

### Step 2: Conferma all'utente

```
RISPONDI con questo formato ESATTO:

"GUDBRO Ready.

IN PROGRESS: [lista task da 2-IN-PROGRESS.md, o "Nessuna"]
ULTIME COMPLETATE: [ultime 3 da 4-DONE.md con data]

Cosa facciamo?"
```

## 1.2 Esempio di Risposta Corretta

```
GUDBRO Ready.

IN PROGRESS: GB-AI-P14 (AI Reports Dashboard)
ULTIME COMPLETATE:
- 2026-01-05: MT-EMPTY-STATES (Empty State component)
- 2026-01-05: MT-NOTIF-SOUNDS (Notification Sounds)
- 2026-01-05: GB-AI-SEED (AI Seed Data)

Cosa facciamo?
```

## 1.3 Se l'utente chiede contesto aggiuntivo

Solo se richiesto, leggi anche:

- `docs/DATABASE-INVENTORY.md` - Stato database
- `docs/DATABASE-SCHEMA.md` - Schema tabelle (prima di SQL)
- `docs/backlog/1-TODO.md` - Task da fare

---

# 2. DEVELOPMENT WORKFLOW

> **REGOLA D'ORO:** Explore → Plan → Validate → Implement → Document

**Mai saltare fasi.** Gli errori nascono saltando direttamente all'implementazione.

| Fase      | Azione                       | Output          |
| --------- | ---------------------------- | --------------- |
| EXPLORE   | Leggi, capisci, NON scrivere | Comprensione    |
| PLAN      | Cosa, Come, Perche, Rischi   | Piano           |
| VALIDATE  | Check PRIMA di implementare  | ✅ o ❌         |
| IMPLEMENT | Codice con confidenza        | Funziona        |
| DOCUMENT  | Mantieni la conoscenza       | Docs aggiornati |

**Riferimento completo:** `docs/DEVELOPMENT-WORKFLOW.md`
**Checklist per tipo task:** `docs/PROCEDURE-CHECKLIST.md`

---

# 3. VALIDATION GATES (Obbligatori)

## 3.1 Prima di SQL/Migration

```
VERIFICA SEMPRE:
- [ ] UUID solo hex (0-9, a-f) - MAI lettere g-z
- [ ] Colonne esistono nella tabella (leggi migration)
- [ ] CHECK constraints rispettati (leggi migration)
- [ ] Array syntax: '{"a","b"}' NON '["a","b"]'
- [ ] FK references esistono
```

## 3.2 Prima di Codice

```
VERIFICA SEMPRE:
- [ ] Types importati correttamente
- [ ] Pattern esistenti seguiti
- [ ] Error handling presente
```

## 3.3 Quick Reference Errori SQL

| Errore                               | Causa              | Fix               |
| ------------------------------------ | ------------------ | ----------------- |
| `invalid input syntax for type uuid` | Caratteri g-z      | Solo 0-9, a-f     |
| `column "X" does not exist`          | Colonna sbagliata  | Verifica schema   |
| `violates check constraint`          | Valore non ammesso | Leggi CHECK       |
| `malformed array literal`            | `[]` invece `{}`   | Usa `'{"a","b"}'` |

---

# 4. REPOSITORY STRUCTURE

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/  # Digital Menu PWA (:3004)
│   ├── backoffice/           # Admin Dashboard (:3001)
│   └── website/              # Marketing Site (:3000)
├── shared/database/          # Database v6.0
│   ├── cuisines/             # asian, european, americas, african, oceania, fusion
│   ├── beverages/            # cocktails, wines, spirits, coffee, tea
│   ├── dishes/               # pasta, pizzas, steaks, burgers
│   ├── sides/                # salads, soups, desserts
│   ├── ingredients/          # Master ingredients (2548)
│   ├── migrations/           # schema/, ingredients/, nutrition/, seeds/
│   └── _system/              # types, scripts, docs
├── docs/                     # Documentazione progetto
│   ├── backlog/              # Kanban (1-TODO, 2-IN-PROGRESS, 3-TESTING, 4-DONE)
│   ├── features/             # Feature documentation
│   ├── DEVELOPMENT-WORKFLOW.md
│   ├── PROCEDURE-CHECKLIST.md
│   ├── DATABASE-INVENTORY.md
│   └── DATABASE-SCHEMA.md
└── CLAUDE.md                 # Questo file
```

---

# 5. DATABASE CRITICAL INFO

## 5.1 Stato Attuale (2026-01-05)

| Metrica           | Valore                |
| ----------------- | --------------------- |
| Database Food     | 75                    |
| Prodotti          | ~4653                 |
| Ingredienti       | 2548 (100% nutrition) |
| Migrations Schema | 37 (27 core + 10 AI)  |
| AI Services       | 13                    |

## 5.2 Schema Source of Truth

**SEMPRE leggere prima di scrivere SQL:**

- `docs/DATABASE-SCHEMA.md` - Schema completo tabelle
- `shared/database/migrations/schema/` - Migration files

## 5.3 AI Tables (027-036)

| Migration | Tabella                                              |
| --------- | ---------------------------------------------------- |
| 027       | ai_merchant_preferences                              |
| 028       | ai_daily_briefings                                   |
| 029       | improvement_suggestions                              |
| 030       | zone_analysis, competitors                           |
| 031       | market_prices, partnerships                          |
| 032       | ai_social_posts, ai_content_calendars                |
| 033       | ai_financial_summaries, ai_budget_plans              |
| 034       | ai_delegated_tasks                                   |
| 035       | ai_workflow_definitions, ai_workflow_executions      |
| 036       | ai_suppliers, ai_inventory_items, ai_purchase_orders |

---

# 6. DOCUMENTATION MAP

| Area         | File                                              | Quando Usare        |
| ------------ | ------------------------------------------------- | ------------------- |
| Workflow     | `docs/DEVELOPMENT-WORKFLOW.md`                    | Prima di ogni task  |
| Checklist    | `docs/PROCEDURE-CHECKLIST.md`                     | Gate di validazione |
| DB Inventory | `docs/DATABASE-INVENTORY.md`                      | Stato database      |
| DB Schema    | `docs/DATABASE-SCHEMA.md`                         | Prima di SQL        |
| Lessons      | `shared/database/_system/docs/LESSONS-LEARNED.md` | Errori da evitare   |
| Backlog      | `docs/backlog/`                                   | Task management     |

---

# 7. KANBAN SYSTEM

```
docs/backlog/
├── 1-TODO.md         # Task da fare
├── 2-IN-PROGRESS.md  # Max 3 task
├── 3-TESTING.md      # Da testare
└── 4-DONE.md         # Archivio
```

**Workflow:** TODO → IN-PROGRESS → TESTING → DONE

**Regole:**

- Max 3 IN-PROGRESS
- Aggiorna status durante il lavoro
- Non eliminare da DONE

---

# 8. TECH STACK

| Layer     | Technology            |
| --------- | --------------------- |
| Framework | Next.js 14.2.33       |
| UI        | React 18.3.1          |
| Styling   | Tailwind CSS 3.4.1    |
| Database  | Supabase (PostgreSQL) |
| Auth      | Supabase Auth         |
| Deploy    | Vercel                |
| AI        | OpenAI GPT-4          |

---

# 9. COMMANDS

## 9.1 Dev Servers

```bash
# From repo root with turbo
pnpm dev:backoffice    # :3001
pnpm dev:coffeeshop    # :3004

# Or directly
cd apps/backoffice && pnpm dev
cd apps/coffeeshop/frontend && pnpm dev
```

## 9.2 Build & Deploy

```bash
pnpm build             # Build all
git push origin main   # Auto-deploy to Vercel
```

## 9.3 Database

```bash
# Supabase CLI
npx supabase db push
npx supabase gen types typescript
```

---

# 10. ARCHITECTURAL DECISIONS

| Decision     | Rule                                           |
| ------------ | ---------------------------------------------- |
| DB Language  | English only                                   |
| Translations | Separate `translations` table                  |
| Measurements | Metric (g, ml)                                 |
| Costs        | Never in master ingredients                    |
| Schema       | TEXT + CHECK (no ENUM for new tables)          |
| Accounts     | P5 unified accounts (not gudbro_user_profiles) |
| RLS          | Via account_roles (not merchant_users)         |

---

# 11. AI CO-MANAGER SYSTEM

## 11.1 Services (apps/backoffice/lib/ai/)

| Service                       | Purpose                               |
| ----------------------------- | ------------------------------------- |
| chat-service                  | Main chat interface                   |
| knowledge-service             | Menu, orders, events, feedback access |
| actions-service               | Create events, translate, update menu |
| proactivity-service           | Daily briefings, alerts               |
| feedback-loop-service         | Collect merchant feedback             |
| bootstrap-service             | Zone analysis, competitors            |
| market-intelligence-service   | Pricing, partnerships                 |
| social-media-service          | Auto posts, calendars                 |
| financial-service             | P&L, budgets, forecasts               |
| task-delegation-service       | Staff task management                 |
| agentic-workflow-service      | Multi-step automations                |
| inventory-negotiation-service | Stock, suppliers, POs                 |
| onboarding-service            | Guided setup                          |

## 11.2 API Routes (apps/backoffice/app/api/ai/)

All routes follow pattern: `/api/ai/[feature]`

---

# 12. ANTI-PATTERNS (Evitare)

| Anti-Pattern        | Problema             | Soluzione              |
| ------------------- | -------------------- | ---------------------- |
| "Scrivi subito"     | Errori da assunzioni | EXPLORE prima          |
| "Fixxa veloce"      | Fix su fix           | Capire causa root      |
| "Tanto funziona"    | Technical debt       | VALIDATE sempre        |
| "Lo documento dopo" | Conoscenza persa     | DOCUMENT subito        |
| "Claude sa gia"     | Context loss         | Dare context esplicito |

---

# 13. FILE REFERENCES

Per includere contesto aggiuntivo in conversazioni:

```
@docs/DATABASE-SCHEMA.md
@shared/database/migrations/schema/036-ai-inventory-negotiation.sql
@apps/backoffice/lib/ai/index.ts
```

---

**File:** `CLAUDE.md`
**Version:** 5.1
**Updated:** 2026-01-05
**Changes:** v5.1 - Startup command reso esplicito con step obbligatori e formato risposta definito.
