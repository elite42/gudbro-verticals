# GUDBRO Verticals

> **Contesto essenziale per Claude Code**
>
> **Last Updated:** 2026-01-27
> **Version:** 8.8 (Vertical PWAs Map)

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

> **Task attiva:** Nessuna (scegli da backlog)
> **Stato:** Infra solida, monitoring attivo (Sentry+UptimeRobot), pronto per nuove task
> **Ultima completata:** Order Timing Analytics (4 fasi) - 2026-01-24

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
│   ├── wellness/             # Wellness PWA - Spa, Hair, Nails, Tattoo
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

| File                         | Quando Usare                                         |
| ---------------------------- | ---------------------------------------------------- |
| `apps/accommodations/PRD.md` | **Stays PWA** - In-Stay Dashboard, visa, local deals |
| `docs/features/TOURS-PRD.md` | **Tours PWA** - Activities, experiences              |
| `apps/wellness/PRD.md`       | **Wellness PWA** - Spa, hair, nails, tattoo          |

## Roadmaps & Backlog

| File                                | Quando Usare       |
| ----------------------------------- | ------------------ |
| `docs/roadmaps/SCALE-ROADMAP.md`    | Scaling infra      |
| `docs/roadmaps/SECURITY-ROADMAP.md` | Security hardening |
| `docs/backlog/`                     | Task management    |

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

| Comando     | Descrizione                               |
| ----------- | ----------------------------------------- |
| `/qa-quick` | Check veloce (typecheck, build, advisors) |
| `/verify`   | Verifica completa pre-deploy              |
| `/deploy`   | Build + push + verifica                   |

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

**Version:** 8.8
**Changes:**

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
