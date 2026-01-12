# GUDBRO Verticals

> **Contesto essenziale per Claude Code**
>
> **Last Updated:** 2026-01-10
> **Version:** 6.4 (Added product/UX patterns from service models session)

---

# HOW TO USE (IMPORTANTE)

> **⚠️ NON processare tutto questo documento in una volta.**
> Usalo a layer, sezione per sezione, in base al contesto.

## Principio: Layered Application

Documenti grandi (~740 righe) processati insieme → qualità diluita, dettagli persi.
Approccio corretto: **leggi solo le sezioni rilevanti al task corrente**.

## Layer per Tipo di Attività

```
INIZIO SESSIONE:
└── Sezione 0 (Current Focus) + Sezione 1 (Startup) → SEMPRE

SVILUPPO CODICE:
└── Sezione 2 (Workflow) + Sezione 3 (Validation Gates)
└── Sezione 3.5 (Compounding) → Se fai errori

DATABASE/SQL:
└── Sezione 5 (Database Critical) + Sezione 3.1 (Prima di SQL)

AI CO-MANAGER:
└── Sezione 11 (AI System)

DEPLOY/GIT:
└── Sezione 9 (Commands) + Sezione 11.5 (Slash Commands)

FINE SESSIONE:
└── Sezione 15 (Fine Sessione)
```

## Quick Reference

| Sezione           | Quando                |
| ----------------- | --------------------- |
| 0. Current Focus  | Sempre all'inizio     |
| 1. Startup        | Sempre all'inizio     |
| 2. Workflow       | Prima di sviluppare   |
| 3. Validation     | Prima di SQL/codice   |
| 3.5 Compounding   | Quando fai errori     |
| 4. Repo Structure | Se cerchi file        |
| 5. Database       | Prima di SQL          |
| 6. Documentation  | Se cerchi docs        |
| 9. Commands       | Per comandi specifici |
| 11. AI System     | Se lavori su AI       |
| 15. Fine Sessione | A fine lavoro         |

## Anti-Pattern

❌ "Leggo tutto CLAUDE.md prima di iniziare"
❌ "Devo ricordare tutte le 16 sezioni"

## Pattern Corretto

✅ "Inizio sessione → Sez. 0 + 1"
✅ "Devo scrivere SQL → Sez. 3.1 + 5"
✅ "Ho fatto un errore → Lo aggiungo a Sez. 3.5"

---

# 0. CURRENT FOCUS (Aggiorna quando cambi task)

> **Task attiva:** Nessuna
> **Stato:** AI-ZONE-INTEL completata (Phase 1-4)
> **Azione:** Nessuna
> **Ultima completata:** AI-ZONE-INTEL Phase 4 - Customer Detail, TriggerModal, Budget/ROI (2026-01-12)

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

FOCUS: [task da sezione 0, o "Nessuno"]
IN PROGRESS: [lista task da 2-IN-PROGRESS.md]

Vuoi continuare [FOCUS task] o fare altro?"
```

## 1.2 Esempio di Risposta Corretta

```
GUDBRO Ready.

FOCUS: ING-TRANSLATIONS-ALL (traduzioni ingredienti, ~10%, OFFSET 150)
IN PROGRESS: ING-TRANSLATIONS-ALL

Vuoi continuare le traduzioni o fare altro?
```

## 1.3 Se l'utente chiede contesto aggiuntivo

Solo se richiesto, leggi anche:

- `docs/DATABASE-INVENTORY.md` - Stato database
- `docs/DATABASE-SCHEMA.md` - Schema tabelle (prima di SQL)
- `docs/backlog/1-TODO.md` - Task da fare

---

# 2. DEVELOPMENT WORKFLOW

> **REGOLA D'ORO:** Explore → Plan → **Verify** → Validate → Implement → Document

**Mai saltare fasi.** Gli errori nascono saltando direttamente all'implementazione.

| Fase       | Azione                                | Output          |
| ---------- | ------------------------------------- | --------------- |
| EXPLORE    | Leggi, capisci, NON scrivere          | Comprensione    |
| PLAN       | Cosa, Come, Perche, Rischi            | Piano           |
| **VERIFY** | **Ricerca online se confidenza <95%** | **Cross-check** |
| VALIDATE   | Check PRIMA di implementare           | ✅ o ❌         |
| IMPLEMENT  | Codice con confidenza                 | Funziona        |
| DOCUMENT   | Mantieni la conoscenza                | Docs aggiornati |

## 2.1 VERIFY Online (Step Opzionale ma Raccomandato)

> **Principio:** "Measure twice, cut once" - 2 min di ricerca possono risparmiare ore di debug.

**QUANDO FARE RICERCA ONLINE:**

| Situazione              | Esempio                                        |
| ----------------------- | ---------------------------------------------- |
| Confidenza < 95%        | "Credo che si faccia così, ma non sono sicuro" |
| Tecnologie che cambiano | Supabase, Next.js, Vercel, PostgreSQL          |
| Errori criptici         | Messaggi di errore non chiari                  |
| Security-related        | RLS, auth, permessi                            |
| Edge cases              | Comportamenti non standard                     |

**QUANDO NON SERVE:**

| Situazione              | Esempio                            |
| ----------------------- | ---------------------------------- |
| Pattern consolidati     | CRUD, async/await, TypeScript base |
| Logica interna progetto | Come funziona GUDBRO               |
| Confidenza > 95%        | So esattamente cosa fare           |

**COME CERCARE:**

```
WebSearch("supabase RLS service_role best practice 2025")
WebFetch("https://supabase.com/docs/guides/auth/row-level-security")
```

**Riferimento completo:** `docs/DEVELOPMENT-WORKFLOW.md`
**Checklist per tipo task:** `docs/PROCEDURE-CHECKLIST.md`

## 2.2 PLAN MODE (Per Task Complesse)

> **Ispirato a Boris Cherny:** "Plan mode permette a Claude di esplorare e progettare prima di implementare."

**COS'È PLAN MODE:**

Plan mode è una modalità speciale di Claude Code che:

- Permette di esplorare il codebase senza scrivere
- Crea un piano dettagliato prima dell'implementazione
- Richiede approvazione utente prima di procedere
- Riduce errori e rework

**QUANDO USARE PLAN MODE:**

| Situazione                | Esempio                            |
| ------------------------- | ---------------------------------- |
| Nuove feature multi-file  | "Aggiungi sistema di prenotazioni" |
| Refactoring significativo | "Ristruttura il sistema di auth"   |
| Decisioni architetturali  | "Come integrare pagamenti?"        |
| Task > 30 min stimate     | Qualsiasi lavoro complesso         |
| Incertezza alta           | "Non so bene da dove partire"      |

**QUANDO NON SERVE:**

| Situazione         | Esempio                        |
| ------------------ | ------------------------------ |
| Bug fix singolo    | "Fixxa il typo in questo file" |
| Modifiche puntuali | "Cambia il colore del bottone" |
| Task < 10 min      | Lavoro triviale                |

**COME ATTIVARE:**

```
Metodo 1: Shift+Tab (due volte)
Metodo 2: Chiedere "entra in plan mode"
Metodo 3: Claude lo suggerisce per task complesse
```

**OUTPUT DI PLAN MODE:**

1. **Analisi** - Comprensione del problema
2. **Files coinvolti** - Lista file da creare/modificare
3. **Piano step-by-step** - Sequenza di azioni
4. **Rischi identificati** - Potenziali problemi
5. **Richiesta approvazione** - Prima di implementare

**ESEMPIO:**

```
User: "Aggiungi dark mode all'app"

Claude (Plan Mode):
## Piano: Dark Mode Implementation

### Analisi
- L'app usa Tailwind CSS
- Nessun sistema di temi presente
- 15 componenti da aggiornare

### Files da modificare
1. tailwind.config.js - aggiungere dark mode
2. lib/theme-context.tsx - nuovo context
3. components/ThemeToggle.tsx - nuovo componente
4. 15 componenti esistenti - classi dark:

### Steps
1. Configurare Tailwind per dark mode
2. Creare ThemeContext e provider
3. Aggiungere toggle in header
4. Aggiornare componenti uno alla volta

### Rischi
- Alcuni colori hardcoded potrebbero sfuggire
- Test manuale richiesto su tutti i componenti

Approvi questo piano?
```

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

# 3.5 COMPOUNDING ENGINEERING

> **Principio Boris Cherny:** "Ogni volta che Claude fa qualcosa di sbagliato, lo aggiungiamo qui."
> Questo file cresce nel tempo, Claude impara e non ripete gli stessi errori.

## Errori Passati (Aggiungi qui quando succedono!)

| Data    | Errore                       | Causa                                  | Soluzione                                                               | File/Area             |
| ------- | ---------------------------- | -------------------------------------- | ----------------------------------------------------------------------- | --------------------- |
| 2026-01 | UUID con lettere g-z         | Generazione manuale                    | Solo 0-9, a-f                                                           | Database seeds        |
| 2026-01 | Array `[]` invece `{}`       | Sintassi JS vs PG                      | PostgreSQL usa `'{a,b}'`                                                | SQL inserts           |
| 2026-01 | Import types sbagliati       | Path relativi errati                   | Usa `@/types/`                                                          | TypeScript            |
| 2026-01 | Feature gia esistente        | Non cercato prima                      | Grep/Glob PRIMA di implementare                                         | Tutto                 |
| 2026-01 | Pieces MCP timeout           | Server non ancora sincronizzato        | Aspetta ~4 giorni (fino ~11 Jan)                                        | End session           |
| 2026-01 | RLS policy `true`            | Permette accesso a tutti               | Usare `auth.role() = 'service_role'` per backend                        | AI tables             |
| 2026-01 | Policies "dev\_\*" in prod   | Lasciate da sviluppo                   | Rimuovere o sostituire con policies proper                              | events table          |
| 2026-01 | function search_path         | Vulnerabilità injection                | `ALTER FUNCTION x SET search_path = public`                             | Tutte le functions    |
| 2026-01 | MultiLangText vi required    | Traduzioni incomplete                  | Rendere `vi?` opzionale finché non completate                           | Tipi database         |
| 2026-01 | note vs notes                | Inconsistenza naming                   | Usare sempre plurale `notes` per chiarezza                              | Cocktail types        |
| 2026-01 | Export duplicati             | `export interface` + default export    | Mai duplicare - usare solo uno dei due                                  | menu-management.ts    |
| 2026-01 | Tentare senza verificare     | Confidenza < 95% ma procedo            | **VERIFY online** prima di implementare                                 | Workflow generale     |
| 2026-01 | Build fail senza env vars    | Client creato a import time            | **Proxy pattern** per lazy initialization                               | supabase-admin.ts     |
| 2026-01 | Type union incompleta        | Manca valore combinato                 | Includere `'both'` quando dominio lo richiede                           | Temperature type      |
| 2026-01 | Deploy fallito post-push     | Build error non catturato              | Pre-push hook con `turbo build` salva la giornata                       | Git hooks             |
| 2026-01 | Warning ignorati             | Visti ma non agiti (es. husky)         | **Agire subito** su warning/error, non aspettare                        | Tutto                 |
| 2026-01 | Doc grandi → qualità persa   | Processare tutto insieme               | **Layered approach**: leggi solo sezioni rilevanti                      | CLAUDE.md, PRODUCT.md |
| 2026-01 | MCP/API timeout misterioso   | Query complesse senza diagnostica      | **Debug incrementale**: query semplice → complessa                      | Supabase MCP          |
| 2026-01 | Traduzioni inline costose    | Generare testo con Claude              | **Usa OpenAI API** (gpt-4o-mini): $0.0015/200 trad                      | translate-only.ts     |
| 2026-01 | Contesto gonfiato = lento    | Output SQL ~450 righe × batch          | **Insert diretto** nel DB, output 1 riga                                | translate-only.ts     |
| 2026-01 | anon_key bloccata da RLS     | Script usa anon_key per INSERT         | Serve **service_role_key** per bypass RLS                               | Script locali         |
| 2026-01 | RLS bypass senza key         | No service_role_key in .env.local      | **MCP Supabase ha service_role**: script→SQL→MCP                        | translate-only.ts     |
| 2026-01 | Gap detection manuale        | Query ad-hoc ogni volta                | **Script automatico** con NOT EXISTS pattern                            | Traduzioni bulk       |
| 2026-01 | No validazione traduzioni    | AI può sbagliare, nomi propri          | **Flag is_verified** + sampling QA post-batch                           | translations table    |
| 2026-01 | Traduzioni identiche = bug?  | Prosciutto=Prosciutto è corretto       | **Distinguere** proper nouns vs translation errors                      | QA traduzioni         |
| 2026-01 | User Agent parsing errato    | Ordine check regex sbagliato           | Check specifici PRIMA di generici (iOS→macOS, Samsung→Chrome)           | parseUserAgent        |
| 2026-01 | Test scoprono bug nascosti   | Test suite trova bug non previsti      | **Test prima** scopre problemi → fix immediato                          | QR route helpers      |
| 2026-01 | Hydration error localStorage | Componente legge localStorage a render | **Pattern `mounted`**: stato false→true in useEffect                    | DevRoleSwitcher       |
| 2026-01 | Rimuovere link per fix 404   | Link "Manage accounts" → 404           | **Creare la pagina**, non rimuovere il link                             | Account management    |
| 2026-01 | Logica dev in comp prod      | RoleSwitcher con check isDevMode       | **Componente separato** DevRoleSwitcher per dev-only                    | Header components     |
| 2026-01 | Tentato save manuale Pieces  | Pieces cattura tutto automaticamente   | **Non serve** `create_memory`, solo `ask_pieces_ltm` per query          | Fine sessione         |
| 2026-01 | Audit incompleto 75%         | Route groups non considerati           | **Glob fresh** su `**/page.tsx`, non liste pre-esistenti                | Backoffice audit      |
| 2026-01 | Docs prodotto obsolete       | Backoffice cambia, docs no             | **PRODUCT.md Sez.6** solo per nuove capability areas, non ogni modifica | PRODUCT.md            |

## Pattern da Seguire

| Area            | Pattern Corretto                       | Anti-Pattern                 |
| --------------- | -------------------------------------- | ---------------------------- |
| SQL Arrays      | `'{\"a\",\"b\"}'`                      | `'["a","b"]'`                |
| UUID            | `a1b2c3d4-...` (solo hex)              | `ghij-klmn-...`              |
| Imports         | `import { X } from '@/lib/...'`        | Path relativi profondi       |
| Error handling  | `try/catch` con logging                | Silent failures              |
| RLS Backend     | `auth.role() = 'service_role'`         | `WITH CHECK (true)`          |
| RLS User        | `auth.uid() = user_id`                 | `USING (true)`               |
| RLS Public Read | `FOR SELECT USING (true)` OK           | `FOR ALL USING (true)` NO    |
| Env-dependent   | `Proxy` lazy init                      | `createClient()` a import    |
| Type unions     | Include tutti i valori validi          | Dimenticare `'both'` etc     |
| Warnings/Errors | Agire subito, fix o segnala            | Ignorare e proseguire        |
| Doc grandi      | Layered: sezioni rilevanti solo        | Leggere/processare tutto     |
| Debug API/MCP   | Query semplice → incrementale          | Query complessa subito       |
| Traduzioni bulk | Script OpenAI (gpt-4o-mini)            | Generare inline con Claude   |
| RLS bypass      | Script→SQL output→MCP execute          | Cercare service_role_key     |
| UA/Regex check  | Specifici prima, generici dopo         | Chrome prima di Samsung      |
| Test automatici | Scrivere test scopre bug               | Solo test manuali            |
| Hydration SSR   | `mounted` state + useEffect            | localStorage a render        |
| Feature 404     | Creare la pagina mancante              | Rimuovere il link            |
| Dev-only logic  | Componente separato `DevX`             | if(isDev) dentro comp prod   |
| Pieces MCP      | Query only (`ask_pieces_ltm`)          | `create_memory` (auto-save)  |
| Regional market | Considera piattaforme Asia             | Assumere default occidentali |
| Settings UX     | Tabs orizzontali per settings          | Submenu sidebar              |
| Service models  | Capire modello servizio locale         | One-size-fits-all            |
| Entry tier      | Tier base come piede nella porta       | Forzare full package         |
| QR value        | QR utile anche senza ordering          | QR = solo ordering           |
| Backoffice mod  | PRODUCT.md Sez.6 solo nuove areas      | Aggiornare per ogni modifica |
| Audit tecnico   | Snapshot datato, rigenera su richiesta | Mantenere aggiornato sempre  |

## Come Aggiornare

Quando Claude fa un errore, l'utente puo' dire:

- "questa e' una nuova lezione"
- "ricordati questo errore"
- "non farlo piu'"
- "segnati questo"
- "lesson learned"

Claude deve:

1. Aggiungere riga alla tabella "Errori Passati"
2. Se e' un pattern, aggiungere a "Pattern da Seguire"
3. Confermare: "Aggiunto a Compounding Engineering"

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

| Metrica           | Valore                       |
| ----------------- | ---------------------------- |
| Database Food     | 75                           |
| Prodotti          | ~4653                        |
| Ingredienti       | 2548 (100% nutrition)        |
| Migrations Schema | 42 (27 core + 11 AI + 4 sec) |
| AI Services       | 15                           |

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

| Area         | File                                              | Quando Usare                      |
| ------------ | ------------------------------------------------- | --------------------------------- |
| **Product**  | `docs/PRODUCT.md`                                 | **Valutazione multidimensionale** |
| **Partner**  | `docs/GIANFRANCO.md`                              | **Capire preferenze e stile**     |
| Workflow     | `docs/DEVELOPMENT-WORKFLOW.md`                    | Prima di ogni task                |
| Checklist    | `docs/PROCEDURE-CHECKLIST.md`                     | Gate di validazione               |
| DB Inventory | `docs/DATABASE-INVENTORY.md`                      | Stato database                    |
| DB Schema    | `docs/DATABASE-SCHEMA.md`                         | Prima di SQL                      |
| Lessons      | `shared/database/_system/docs/LESSONS-LEARNED.md` | Errori da evitare                 |
| Backlog      | `docs/backlog/`                                   | Task management                   |

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

## 10.1 UX Principles

| Principle                 | Rule                                                                 | Rationale                                                                                                        |
| ------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Centralized Analytics** | Stats in pagina Analytics dedicata, link contestuali da altre pagine | Dopo setup iniziale, utente visita frequentemente stats ma raramente pagine di creazione. Evita zapping inutile. |
| **Contextual Links**      | Ogni feature page ha link "📊 View Analytics" se ha statistiche      | Permette navigazione diretta senza cercare                                                                       |
| **Creation Pages = Lean** | Pagine di creazione focalizzate su CRUD, no stats inline             | Mental model: "QR Codes" = gestione QR, "Analytics" = vedere performance                                         |
| **No Redundant CTAs**     | Mai 3+ modi per fare la stessa azione nella stessa pagina            | Riduce confusione, rispetta spazio                                                                               |

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

# 11.5 SLASH COMMANDS & HOOKS

> **Ispirato a Boris Cherny** (creatore Claude Code): automazione e verifica integrata.

## Comandi Disponibili

| Comando            | Descrizione                                      |
| ------------------ | ------------------------------------------------ |
| `/start-session`   | Inizia sessione, legge backlog e CLAUDE.md       |
| `/end-session`     | Chiudi sessione, salva contesto                  |
| `/deploy`          | Build + push + verifica Vercel                   |
| `/typecheck`       | Esegui typecheck TypeScript                      |
| `/verify`          | Verifica completa (typecheck + build + advisors) |
| `/db-status`       | Stato database e traduzioni                      |
| `/translate-batch` | Continua traduzioni da dove interrotto           |

## Hooks Attivi

| Hook         | Trigger         | Azione                          |
| ------------ | --------------- | ------------------------------- |
| post-edit.sh | Edit/Write file | Reminder typecheck per .ts/.tsx |

## Come Aggiungere Comandi

```bash
# Crea nuovo comando
touch .claude/commands/nome-comando.md

# Struttura:
---
description: Breve descrizione
allowed-tools: Bash(*), mcp__supabase__*
---
# Contenuto del comando
```

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

# 14. MCP SERVERS (Model Context Protocol)

> **4 server MCP configurati** per potenziare le capacita di Claude Code.

## 14.1 Server Disponibili

| Server       | Tipo  | Scopo                          |
| ------------ | ----- | ------------------------------ |
| **Supabase** | HTTP  | Database operations dirette    |
| **GitHub**   | HTTP  | Repository, issues, PR         |
| **Vercel**   | stdio | Deployments, projects, domains |
| **Pieces**   | stdio | Long-term memory, context      |

## 14.2 Supabase MCP

**Quando usare:** Operazioni database senza passare da REST API

```
mcp__supabase__execute_sql      → Esegui query SQL dirette
mcp__supabase__apply_migration  → Applica migration DDL
mcp__supabase__list_tables      → Lista tabelle
mcp__supabase__get_logs         → Debug logs (auth, postgres, edge)
mcp__supabase__get_advisors     → Security/performance checks
mcp__supabase__deploy_edge_function → Deploy edge functions
mcp__supabase__generate_typescript_types → Genera types
```

**Best practice:**

- Usa `execute_sql` per SELECT, INSERT, UPDATE
- Usa `apply_migration` per DDL (CREATE, ALTER, DROP)
- Dopo DDL, esegui `get_advisors` per check RLS

## 14.3 GitHub MCP

**Quando usare:** Gestione repo senza uscire da Claude Code

```
mcp__github__list_issues        → Lista issues
mcp__github__issue_write        → Crea/aggiorna issues
mcp__github__create_pull_request → Crea PR
mcp__github__list_commits       → Storia commits
mcp__github__search_code        → Cerca nel codice
mcp__github__get_file_contents  → Leggi file da repo remoto
```

**Best practice:**

- Usa per sincronizzare issue tracking
- Crea PR direttamente dopo feature complete
- Search code per trovare pattern in altri repo

## 14.4 Vercel MCP

**Quando usare:** Gestione deployments e progetti Vercel

```
Capabilities:
- Lista progetti e deployments
- Controlla stato deploy
- Gestisci environment variables
- Gestisci domini
- Rollback deployments
```

**Best practice:**

- Verifica deploy status dopo push
- Check logs per errori di build
- Gestisci env vars per staging/production

## 14.5 Pieces MCP

> **Pieces e' un sistema di memoria a lungo termine che cattura automaticamente tutto.**
> Registra attivita' da terminal, browser, e altre app in background - senza intervento manuale.

**Come funziona:**

- Pieces gira in background sul Mac dell'utente
- Cattura automaticamente: comandi terminal, pagine browser, screenshot
- Crea "summaries" automatici delle sessioni di lavoro
- NON serve salvare manualmente - lo fa da solo

**Quando usare:**

```
mcp__Pieces__ask_pieces_ltm     → Query per recuperare contesto passato (USA QUESTO)
mcp__Pieces__create_pieces_memory → NON USARE (ridondante, Pieces salva automaticamente)
```

**Esempio query inizio sessione:**

```
mcp__Pieces__ask_pieces_ltm(
  question: "What did we work on yesterday on gudbro-verticals?",
  topics: ["gudbro", "session"]
)
```

**Complemento:** `docs/SESSION-LOG.md` per note strutturate che Pieces potrebbe non catturare

## 14.6 Configurazione

I server MCP sono configurati in `~/.claude.json`:

```bash
# Verifica stato
claude mcp list

# Aggiungi server
claude mcp add <name> -- <command>

# Rimuovi server
claude mcp remove <name>
```

---

# 15. FINE SESSIONE (Workflow)

> **IMPORTANTE:** Prima di terminare una sessione produttiva, aggiorna il Session Log.

## 15.1 Quando Aggiornare

- Dopo aver completato una feature significativa
- Dopo decisioni architetturali importanti
- Dopo aver risolto bug complessi
- A fine giornata di lavoro

## 15.2 File Session Log

**Location:** `docs/SESSION-LOG.md`

Diario di bordo strutturato con entry in ordine cronologico inverso (nuove in cima).

## 15.3 Template Entry

```markdown
## YYYY-MM-DD

**Focus:** [Cosa si e' lavorato]
**Durata:** ~Xh

### Completato

- [Task 1]
- [Task 2]

### Commits

- `hash` - message

### Decisioni

- [Decisione]: [Motivazione]

### Note tecniche

- [Pattern, soluzione, lesson learned]

### Prossima sessione

- [Cosa fare dopo]
```

## 15.4 Inizio Sessione

Per recuperare contesto dalla sessione precedente:

```bash
# Leggi ultima entry
head -80 docs/SESSION-LOG.md
```

Oppure chiedi a Claude: "Cosa abbiamo fatto l'ultima sessione?"

---

# 16. GITHUB ISSUES SYNC

> **Backlog locale + GitHub Issues per visibilita e tracking**

## 16.1 Mapping Labels

| Label GitHub  | File Locale      | Descrizione               |
| ------------- | ---------------- | ------------------------- |
| `P0`          | 1-TODO.md (P0)   | Critico, questa settimana |
| `P0.5`        | 1-TODO.md (P0.5) | Architettura da rivedere  |
| `P1`          | 1-TODO.md (P1)   | Alta priorita             |
| `P2`          | 1-TODO.md (P2)   | Media priorita            |
| `in-progress` | 2-IN-PROGRESS.md | In lavorazione            |
| `testing`     | 3-TESTING.md     | Da testare                |

## 16.2 Workflow

**Creare nuova task:**

1. Aggiungi a `1-TODO.md` locale
2. Crea issue su GitHub: `mcp__github__issue_write(...)`
3. Assegna labels corrette

**Iniziare task:**

1. Sposta in `2-IN-PROGRESS.md`
2. Aggiorna issue con label `in-progress`

**Completare task:**

1. Sposta in `4-DONE.md`
2. Chiudi issue: `mcp__github__issue_write(method: "update", state: "closed")`

## 16.3 Issues Attive

- #2 PWA-FULL-SITE (P0.5)
- #3 AI-CUSTOMER-CHAT (P0.5)
- #4 RESERVATIONS-SYSTEM (P0.5)
- #5 ING-TRANSLATIONS (P1)

---

**File:** `CLAUDE.md`
**Version:** 6.2
**Updated:** 2026-01-08
**Changes:**

- v6.2 - Added PRODUCT.md (docs/PRODUCT.md) for multidimensional feature evaluation
- v6.1 - Plan Mode (2.2), verify-app subagent, auto-format hook (Boris Cherny improvements)
- v6.0 - Compounding Engineering (3.5), Slash Commands & Hooks (11.5), Current Focus (0)
- v5.4 - Aggiunta sezione 16 GitHub Issues Sync per tracking pubblico.
