# GUDBRO Verticals

> **Contesto essenziale per Claude Code**
>
> **Last Updated:** 2026-01-30
> **Version:** 9.3 (New plugins: superpowers, backend-development, debugging-toolkit, developer-essentials)

---

# HOW TO USE

> **Leggi solo le sezioni rilevanti al task corrente.**

| Attività            | Sezioni da leggere                                |
| ------------------- | ------------------------------------------------- |
| Inizio sessione     | 0 + 1 + 1.5                                       |
| Sviluppo codice     | 2 + 3                                             |
| **PWA Frontend v2** | `docs/knowledge/systems/V2-MIGRATION-GUIDE.md` ⭐ |
| **Customizations**  | `docs/knowledge/systems/CUSTOMIZATIONS-SYSTEM.md` |
| Database/SQL        | 3 + 5 + `docs/core/lessons/database.md`           |
| AI Co-Manager       | `docs/core/AI-SYSTEM.md`                          |
| Deploy/Vercel       | 9 + `docs/core/lessons/vercel.md`                 |
| Errori/Debug        | `docs/core/lessons/` (file per argomento)         |
| Fine sessione       | 12                                                |
| Skills/Plugin       | 10                                                |

---

# 0. CURRENT FOCUS

> **Task attiva:** Nessuna — pronto per nuovo milestone
> **Stato:** v1.3 Merchant Feedback Intelligence completato e archiviato. 4 milestones shipped (v1.0-v1.3).
> **Ultima completata:** v1.3 Merchant Feedback Intelligence - 2026-01-30

**Prossimo milestone (da strategia):**

- Definire con `/gsd:new-milestone`
- Vedi `docs/roadmaps/MULTI-VERTICAL-STRATEGY.md` per roadmap completa
- GitHub Board: https://github.com/users/elite42/projects/1

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

# 1.5 MCP TOOLS (Regole Critiche)

> **Queste regole sono OBBLIGATORIE. Ignorarle causa errori ripetuti e spreco di token.**

| Tool                                | Azione       | Note                         |
| ----------------------------------- | ------------ | ---------------------------- |
| `mcp__Pieces__ask_pieces_ltm`       | ✅ USA       | Interroga memoria storica    |
| `mcp__Pieces__create_pieces_memory` | ❌ MAI USARE | Pieces salva automaticamente |

**Per salvare ricerche/note:** Scrivi in `docs/research/` o `docs/knowledge/`, NON tentare di salvare in Pieces.

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

**GSD Framework:** Per feature complesse o nuovi progetti, usa GSD (Get Shit Done) per planning e building strutturato con sub-agent e context pulito. Vedi sezione 10.4.

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

> **Errori comuni?** Vedi `docs/core/lessons/` (file per argomento)

---

# 4. REPOSITORY STRUCTURE

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/  # Digital Menu PWA (:3004) - Food & Beverage
│   ├── accommodations/       # Stays PWA - Hotels, Apartments, Hostels
│   │   ├── frontend/         # Booking Mode + In-Stay Dashboard
│   │   └── PRD.md            # Product Requirements v2.2
│   ├── tours/                # Tours PWA - Activities, Experiences
│   ├── gym/                  # Gym PWA (:3033) - Fitness, PT, day passes, shop
│   ├── wellness/             # Wellness PWA (:3003) - Spa, Hair, Nails, Tattoo
│   ├── laundry/              # Laundry PWA (:3030) - Wash & fold, dry clean
│   │   ├── frontend/         # Service catalog + LaundryForm drawer
│   │   └── PRD.md
│   ├── pharmacy/             # Pharmacy PWA (:3031) - Tourist medicines
│   │   ├── frontend/         # Symptom search, product catalog
│   │   └── PRD.md
│   ├── workshops/            # Workshops PWA (:3032) - Artisan experiences
│   │   ├── frontend/         # Workshop catalog, booking via WhatsApp
│   │   └── PRD.md
│   ├── waiter/               # Waiter PWA - Staff order taking
│   ├── rentals/              # Rentals PWA - Vehicles, Equipment
│   ├── website/              # Landing pages
│   └── backoffice/           # Admin Dashboard (:3023)
├── shared/database/          # Database v6.0
│   ├── cuisines/, beverages/, dishes/
│   └── migrations/
├── docs/
│   ├── core/                 # ⭐ Operativi quotidiani
│   │   ├── lessons/          # Errori per argomento
│   │   │   ├── database.md
│   │   │   ├── vercel.md
│   │   │   ├── typescript.md
│   │   │   └── ...
│   │   ├── RUNBOOK.md
│   │   ├── VERCEL-SETUP.md
│   │   └── AI-SYSTEM.md
│   ├── reference/            # Consultazione
│   │   ├── DATABASE-SCHEMA.md
│   │   ├── PRODUCT.md
│   │   └── TESTING-STRATEGY.md
│   ├── roadmaps/             # Pianificazione
│   ├── features/             # Feature specs
│   ├── backlog/              # Kanban
│   └── archive/              # File datati/obsoleti
└── CLAUDE.md                 # Questo file
```

---

# 5. DATABASE CRITICAL

| Metrica     | Valore |
| ----------- | ------ |
| Prodotti    | ~4653  |
| Ingredienti | 2548   |
| Migrations  | 76     |
| AI Services | 15     |

**Schema:** `docs/DATABASE-SCHEMA.md`
**Errori SQL comuni:** `docs/LESSONS-LEARNED.md` (Sezione 1)

---

# 6. DOCUMENTATION MAP

## Core (Uso Quotidiano) ⭐

| File                                  | Quando Usare                          |
| ------------------------------------- | ------------------------------------- |
| `docs/core/lessons/database.md`       | **Errori DB/Supabase/RLS**            |
| `docs/core/lessons/vercel.md`         | **Errori Deploy/Vercel**              |
| `docs/core/lessons/typescript.md`     | **Errori TypeScript**                 |
| `docs/core/lessons/git.md`            | **Errori Git/CI/CD**                  |
| `docs/core/lessons/patterns.md`       | **Workflow & UX patterns**            |
| `docs/core/RUNBOOK.md`                | **Incidenti/Recovery**                |
| `docs/core/VERCEL-SETUP.md`           | **Config Vercel/Deploy**              |
| `docs/core/AI-SYSTEM.md`              | **Lavoro su AI Co-Manager**           |
| `docs/design/IMPLEMENTATION-GUIDE.md` | **PWA Frontend v2** - Guida esecutiva |

## Reference (Consultazione)

| File                                 | Quando Usare        |
| ------------------------------------ | ------------------- |
| `docs/reference/DATABASE-SCHEMA.md`  | Prima di SQL        |
| `docs/reference/PRODUCT.md`          | Valutazione feature |
| `docs/reference/TESTING-STRATEGY.md` | Testing patterns    |
| `docs/GIANFRANCO.md`                 | Preferenze utente   |

## Knowledge Base (Sistemi & Pattern)

| File                                              | Quando Usare                                           |
| ------------------------------------------------- | ------------------------------------------------------ |
| `docs/knowledge/systems/CUSTOMIZATIONS-SYSTEM.md` | **Personalizzazioni merchant** (colori, temi, sezioni) |
| `docs/knowledge/systems/V2-MIGRATION-GUIDE.md`    | **PWA v2** - Pattern 4-tier, middleware                |
| `docs/knowledge/CONTRIBUTING.md`                  | **Regole** per espandere/modificare KB                 |

## Vertical PWAs (Product Requirements)

| File                                    | Quando Usare                                               |
| --------------------------------------- | ---------------------------------------------------------- |
| `apps/accommodations/PRD.md`            | **Stays PWA** - In-Stay Dashboard, visa, local deals       |
| `docs/features/TOURS-PRD.md`            | **Tours PWA** - Activities, experiences                    |
| `apps/wellness/PRD.md`                  | **Wellness PWA** - Spa, hair, nails, tattoo                |
| `apps/laundry/PRD.md`                   | **Laundry PWA** - Lavanderie standalone, pricing, tracking |
| `apps/pharmacy/PRD.md`                  | **Pharmacy PWA** - Tourist medicines, symptom search       |
| `apps/workshops/PRD.md`                 | **Workshops PWA** - Artisan experiences, booking           |
| `apps/wellness/PRD-FITNESS-ADDENDUM.md` | **Gym/Fitness** - Day passes, hotel partnerships           |

## Roadmaps & Backlog

| File                                       | Quando Usare                     |
| ------------------------------------------ | -------------------------------- |
| `docs/roadmaps/MULTI-VERTICAL-STRATEGY.md` | **Strategia multi-verticale** ⭐ |
| `docs/roadmaps/SCALE-ROADMAP.md`           | Scaling infra                    |
| `docs/roadmaps/SECURITY-ROADMAP.md`        | Security hardening               |
| `docs/backlog/`                            | Task management                  |

---

# 7. KANBAN (GitHub Projects)

> **Board:** https://github.com/users/elite42/projects/1
> **Repo:** elite42/gudbro-verticals

## Processo Obbligatorio

**Quando AGGIORNARE il board:**

| Evento                  | Azione                            | Comando                                                                                                                                         |
| ----------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Inizio lavoro su issue  | Sposta in **In Progress**         | `gh project item-edit --project-id PVT_kwHOAPbSG84BNwg5 --id <ITEM_ID> --field-id <STATUS_FIELD_ID> --single-select-option-id <IN_PROGRESS_ID>` |
| Lavoro completato       | Sposta in **Done** + chiudi issue | `gh issue close <N> -R elite42/gudbro-verticals`                                                                                                |
| Nuovo task identificato | Crea issue + aggiungi al board    | `gh issue create` + `gh project item-add 1 --owner elite42 --url <URL>`                                                                         |
| Bug trovato             | Crea issue con label `bug`        | `gh issue create -R elite42/gudbro-verticals`                                                                                                   |

**Custom Fields disponibili:**

- **Priority**: Alta, Media, Bassa
- **Vertical**: Hospitality, F&B, Shared
- **Type**: Feature, Bug, Improvement, Infrastructure

**Labels in uso:** `QA`, `enhancement`, `feature`, `F&B`, `backend`, `infrastructure`, `launch`, `expansion`, `bug`

**Convenzione titoli issue:** `[Categoria] Titolo` (es. `[F&B] Table-Specific Ordering`, `[QA] Build Verification`)

## Legacy (docs/backlog/)

```
docs/backlog/
├── 1-TODO.md
├── 2-IN-PROGRESS.md  # Max 3
├── 3-TESTING.md
└── 4-DONE.md
```

> **Nota:** Il backlog in `docs/backlog/` resta per compatibilità ma il sistema primario è ora GitHub Projects.

---

# 8. TECH STACK

| Layer     | Technology            |
| --------- | --------------------- |
| Framework | Next.js 14.2.33       |
| Database  | Supabase (PostgreSQL) |
| Deploy    | Vercel                |
| AI        | OpenAI GPT-4          |
| Icons     | **Phosphor Icons** ⭐ |
| UI        | Radix UI + Tailwind   |

## 8.1 ICONS - Phosphor Icons (PREFERITO)

> **IMPORTANTE:** Usa Phosphor Icons invece di Lucide per nuovi componenti.
> Phosphor ha 9,000+ icone con 6 stili diversi (duotone è il più bello).

```tsx
// ✅ CORRETTO - Phosphor Icons
import { House, ShoppingCart, User } from '@phosphor-icons/react'

<House size={24} weight="duotone" />        // Duotone - consigliato
<ShoppingCart size={24} weight="fill" />    // Filled
<User size={24} weight="regular" />         // Regular (default)

// Pesi disponibili: thin, light, regular, bold, fill, duotone
```

```tsx
// ⚠️ LEGACY - Lucide (solo per componenti esistenti)
import { Home } from 'lucide-react';
```

**Documentazione:** https://phosphoricons.com

## 8.2 PAYMENT ICONS - Crypto & Fiat

> Per i metodi di pagamento, usa queste librerie dedicate.

### Crypto (BTC, ETH, USDC, SOL, TON, BNB, USDT)

```tsx
import { TokenIcon, NetworkIcon } from '@web3icons/react'

<TokenIcon symbol="BTC" variant="branded" size={32} />   // Bitcoin colored
<TokenIcon symbol="ETH" variant="mono" size={32} />      // Ethereum mono
<TokenIcon symbol="USDC" variant="branded" size={32} />  // USDC colored
<NetworkIcon network="solana" variant="branded" />        // Solana network
```

### Fiat (Visa, Mastercard, PayPal, Stripe, etc.)

```tsx
import { Visa, Mastercard, Paypal, Stripe, Amex } from 'react-svg-credit-card-payment-icons'

<Visa width={40} />
<Mastercard width={40} />
<Paypal width={40} />
<Stripe width={40} />

// Formati disponibili: flat, flatRounded, logo, mono, monoOutline
```

**Documentazione:**

- Crypto: https://web3icons.io
- Fiat: https://github.com/marcovoliveira/react-svg-credit-card-payment-icons

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

## Slash Commands (Custom)

| Comando                | Descrizione                                           |
| ---------------------- | ----------------------------------------------------- |
| `/qa-quick`            | Check veloce (typecheck, build, advisors)             |
| `/verify`              | Verifica completa pre-deploy                          |
| `/deploy`              | Build + push + verifica                               |
| `/start-session`       | Avvio sessione GUDBRO (legge backlog e focus)         |
| `/end-session`         | Checklist fine sessione per categoria                 |
| `/new-feature`         | Workflow completo nuova feature (plan→build→test→doc) |
| `/db-status`           | Stato database, traduzioni, security e performance    |
| `/inventory`           | Inventario progetto (DB, backlog, features, repo)     |
| `/typecheck`           | TypeScript typecheck con guida errori                 |
| `/translate-batch`     | Continua traduzioni ingredienti (9 lingue, batch 50)  |
| `/gsd:new-project`     | GSD: inizializza nuovo progetto                       |
| `/gsd:plan-phase N`    | GSD: pianifica fase N                                 |
| `/gsd:execute-phase N` | GSD: esegui fase N                                    |
| `/gsd:progress`        | GSD: stato avanzamento                                |
| `/gsd:quick`           | GSD: task rapido con garanzie atomiche                |

---

# 10. SKILLS & PLUGINS

> **Skills e comandi disponibili da plugin installati.**
> Usa queste risorse per task specifici.

## 10.1 Skills (Invocabili)

| Skill                   | Quando Usare                                                         | Come Invocare                   |
| ----------------------- | -------------------------------------------------------------------- | ------------------------------- |
| `frontend-design`       | **UI/UX nuovo, redesign, componenti customer-facing** ⭐             | Automatica o `/frontend-design` |
| `ui-ux-pro-max`         | UI/UX avanzato alternativo                                           | Skill tool                      |
| `ralph-loop`            | Task iterativi con criteri di successo chiari (es. far passare test) | `/ralph-loop`                   |
| `stripe-best-practices` | Integrazione Stripe                                                  | Skill tool                      |
| `gsd`                   | **Feature complesse, nuovi progetti, milestone** ⭐                  | `/gsd:*` comandi                |
| `superpowers`           | **TDD, debugging sistematico, collaboration patterns**               | Automatica                      |
| `backend-development`   | **API design, architecture patterns, GraphQL, TDD backend**          | Automatica                      |
| `debugging-toolkit`     | **Smart debugging, developer experience optimization**               | Automatica                      |
| `developer-essentials`  | **Git avanzato, SQL optimization, monorepo, E2E testing, auth**      | Automatica                      |

### Regola UI/UX (OBBLIGATORIA)

```
Quando lavoro su UI/UX DEVO usare skill `frontend-design`:
- ✅ Nuova pagina/componente UI
- ✅ Redesign significativo
- ✅ Componenti customer-facing
- ❌ Piccole modifiche (segui pattern esistenti)
- ❌ Fix bug UI minori
```

## 10.2 Slash Commands (Plugin)

| Comando                                     | Plugin            | Descrizione              |
| ------------------------------------------- | ----------------- | ------------------------ |
| `/ralph-loop "<prompt>" --max-iterations N` | ralph-loop        | Loop iterativo autonomo  |
| `/cancel-ralph`                             | ralph-loop        | Ferma loop attivo        |
| `/commit`                                   | commit-commands   | Commit con messaggio     |
| `/commit-push-pr`                           | commit-commands   | Commit, push e crea PR   |
| `/code-review`                              | code-review       | Review del codice        |
| `/review-pr`                                | pr-review-toolkit | Review di una PR GitHub  |
| `/feature-dev`                              | feature-dev       | Sviluppo feature guidato |
| `/hookify`                                  | hookify           | Gestione hooks           |

## 10.3 Ralph Loop - Uso Consigliato

```bash
# Esempio: Task iterativo con test
/ralph-loop "Implementa feature X con TDD.
1. Scrivi test
2. Implementa
3. Esegui test
4. Se falliscono, correggi
5. Output <promise>COMPLETE</promise> quando tutti i test passano" --completion-promise "COMPLETE" --max-iterations 20
```

**Buono per:** Task ben definiti, iterazione su test, progetti greenfield
**Non buono per:** Task con giudizio umano, criteri vaghi, debugging production

## 10.35 Agents (Sub-agent locali)

> **Agent specializzati in `.claude/agents/`.** Claude li usa come sub-agent per task specifici.

| Agent                   | Funzione                                                                        | Quando Usare                                         |
| ----------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `analyst`               | Analizza dati analytics, genera report settimanali, identifica trend e anomalie | Report, analisi metriche, funnel conversion          |
| `backoffice-specialist` | Sviluppo Backoffice Admin (CRUD, TanStack Table, Prisma, multi-tenant)          | Nuove pagine admin, gestione dati, import/export     |
| `proposer`              | Genera suggerimenti miglioramento basati su dati (prioritizzati per impatto)    | Dopo report analyst, sprint planning, ottimizzazioni |
| `pwa-specialist`        | Sviluppo Coffeeshop PWA (multi-locale, RTL, currency, UI)                       | Feature menu digitale, multi-lingua, PWA             |
| `verify-app`            | Verifica completa post-modifiche (typecheck, build, security, test)             | Dopo feature, prima di commit/PR, QA                 |

### Quando Claude USA gli Agents

```
✅ USA agent automaticamente:
- verify-app → dopo ogni feature significativa
- pwa-specialist → lavoro su PWA coffeeshop
- backoffice-specialist → lavoro su admin dashboard
- analyst → richiesta analisi dati
- proposer → dopo report analyst, prima di sprint planning

❌ NON serve agent:
- Fix rapidi (usa direttamente)
- Task cross-verticale (gestisce Claude direttamente)
```

## 10.4 GSD Framework (Get Shit Done)

> **Meta-prompting e context engineering per task complessi.**
> Installato globalmente in `~/.claude/`. Claude decide autonomamente quando usarlo.

### Cos'è

GSD è un layer di orchestrazione che combatte il **context rot** (degrado qualità quando il context window si riempie). Ogni task viene eseguito in un sub-agent fresco con 200k token di context pulito.

### Come Funziona

```
1. PLANNING  → Gap analysis (spec vs codice), genera TODO prioritizzata. Zero codice.
2. BUILDING  → Prende i task, implementa, testa, committa (atomic commits).
3. LOOP      → Ripete finché tutti i task sono completati.
```

Ogni piano ha max 3 task. Ogni commit è atomico, indipendentemente revertabile, e git bisect trova l'esatto task fallito.

### Quando Claude USA GSD

```
✅ USA GSD (ciclo completo):
- Nuova feature complessa (multi-file, multi-step)
- Nuovo progetto o milestone
- Refactoring significativo
- Task che richiedono planning strutturato

✅ USA GSD Quick Mode (/gsd:quick):
- Bug fix con garanzie (atomic commit, state tracking)
- Piccola feature ben definita
- Config changes tracciabili

❌ NON usare GSD:
- Fix di una riga
- Piccole modifiche CSS/copy
- Task esplorativo/ricerca
- QA rapido
```

### Comandi Principali

| Comando                | Descrizione                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `/gsd:new-project`     | Inizializza progetto (questioning → research → requirements → roadmap) |
| `/gsd:new-milestone`   | Nuovo ciclo per codebase esistente                                     |
| `/gsd:plan-phase N`    | Crea piano dettagliato per fase N                                      |
| `/gsd:execute-phase N` | Esegui fase N                                                          |
| `/gsd:progress`        | Stato avanzamento e prossima azione                                    |
| `/gsd:quick`           | Task rapido con garanzie GSD                                           |
| `/gsd:help`            | Lista completa comandi                                                 |

### Trade-off

- **Più token consumati** (sub-agent freschi) ma **qualità costante** e zero context rot
- Investimento che ripaga su task non banali dove il rework costerebbe di più

---

# 11. ARCHITECTURAL DECISIONS

| Decision     | Rule                   |
| ------------ | ---------------------- |
| DB Language  | English only           |
| Translations | Separate table         |
| Schema       | TEXT + CHECK (no ENUM) |
| Accounts     | P5 unified accounts    |

---

# 12. FINE SESSIONE

**Usa `/end-session <categoria>` per checklist guidata.**

| Categoria  | Quando                        |
| ---------- | ----------------------------- |
| `feature`  | Nuova funzionalita completata |
| `bugfix`   | Bug risolto                   |
| `database` | Migration applicata           |
| `infra`    | Config Vercel/CI/Deploy       |
| `refactor` | Refactoring significativo     |
| `ai`       | Modifiche AI Co-Manager       |
| `security` | Hardening/fix sicurezza       |

**Senza categoria:** `/end-session` esegue checklist universale.

**Knowledge Capture:** Rispondi alle domande in `docs/knowledge/CONTRIBUTING.md` (sezione "Domande Fine Sessione") per migliorare la Knowledge Base.

**Vedi:** `docs/END-SESSION-CHECKLIST.md` per dettagli.

---

# 13. ANTI-PATTERNS

| Anti-Pattern        | Soluzione              |
| ------------------- | ---------------------- |
| "Scrivi subito"     | EXPLORE prima          |
| "Fixxa veloce"      | Capire causa root      |
| "Lo documento dopo" | DOCUMENT subito        |
| "Claude sa già"     | Dare context esplicito |

---

**Version:** 9.0
**Changes:**

- v9.3 - New Plugins: installed superpowers (TDD, debugging, collaboration), backend-development (API design, architecture, GraphQL), debugging-toolkit (smart debug, DX), developer-essentials (Git, SQL, monorepo, E2E, auth). Added to skills table.
- v9.2 - Complete Documentation: added all 5 local agents (analyst, backoffice-specialist, proposer, pwa-specialist, verify-app), 6 missing custom commands (db-status, inventory, start-session, new-feature, translate-batch, typecheck) to CLAUDE.md.
- v9.1 - GSD Framework: added GSD (Get Shit Done) to skills, commands, and workflow. Updated ai-employee.md (M4→M5, Clawdbot→Moltbot→OpenClaw, timeline Luglio-Ottobre 2026).
- v9.0 - Gym Standalone PWA: gym as independent PWA (:3033), removed from wellness. Updated repo structure, current focus.
- v8.9 - New Verticals: added Pharmacy, Workshops, Gym/Fitness to repo structure, doc map, workspace config. Updated current focus.
- v8.8 - Vertical PWAs Map: added apps structure with accommodations, tours, wellness, waiter, rentals + Vertical PWAs section in doc map
- v8.7 - MCP Tools Rules: added section 1.5 with critical Pieces MCP rules (never use create_pieces_memory)
- v8.6 - Knowledge Base: added docs/knowledge/ with CUSTOMIZATIONS-SYSTEM.md and V2-MIGRATION-GUIDE.md
- v8.5 - Modular Lessons: split LESSONS-LEARNED.md into 7 topic-specific files
- v8.4 - Added Skills & Plugins section (frontend-design, ralph-loop, slash commands)
- v8.3 - Added PWA v2 Implementation Guide with executable checklist, component specs, and API connections
- v8.2 - Added Payment Icons (@web3icons/react for crypto, react-svg-credit-card-payment-icons for fiat)
- v8.1 - Added Phosphor Icons (9,000+ icons, 6 weights) as preferred icon library
- v8.0 - Optimized structure: content migrated to satellite files (LESSONS-LEARNED.md, AI-SYSTEM.md)
- v7.2 - CI/CD Pipeline Fix
- v7.1 - Scaling Phase 1-3, Security Phase 1
