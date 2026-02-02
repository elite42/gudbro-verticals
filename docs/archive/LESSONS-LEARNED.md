# LESSONS LEARNED

**Last Updated:** 2026-01-25
**Version:** 1.1

> **Principio Boris Cherny:** "Ogni volta che Claude fa qualcosa di sbagliato, lo aggiungiamo qui."
> Questo file cresce nel tempo, Claude impara e non ripete gli stessi errori.

---

## Come Usare Questo File

**Leggi solo la sezione rilevante al contesto:**

| Se stai lavorando su... | Leggi sezione...       |
| ----------------------- | ---------------------- |
| Database/Supabase/RLS   | 1. Database & Supabase |
| Deploy/Vercel/CI        | 2. Vercel & Deploy     |
| TypeScript/Types        | 3. TypeScript & Types  |
| Git/GitHub Actions      | 4. Git & CI/CD         |
| Traduzioni/i18n         | 5. Translations & i18n |
| AI Services             | 6. AI System           |
| General patterns        | 7. Workflow & Patterns |

---

## 1. Database & Supabase

### Errori Comuni

| Errore                      | Causa                          | Soluzione                                   |
| --------------------------- | ------------------------------ | ------------------------------------------- |
| UUID con lettere g-z        | Generazione manuale            | Solo 0-9, a-f                               |
| Array `[]` invece `{}`      | Sintassi JS vs PG              | PostgreSQL usa `'{"a","b"}'`                |
| RLS policy `true`           | Permette accesso a tutti       | `auth.role() = 'service_role'` per backend  |
| Policies "dev\_\*" in prod  | Lasciate da sviluppo           | Rimuovere o sostituire                      |
| function search_path        | Vulnerabilità injection        | `ALTER FUNCTION x SET search_path = public` |
| anon_key bloccata da RLS    | Script usa anon_key per INSERT | Serve service_role_key                      |
| Weather cache RLS violation | Service usa client anon key    | Usare `supabaseAdmin`                       |

### Patterns Corretti

| Area            | Pattern Corretto                                    | Anti-Pattern                  |
| --------------- | --------------------------------------------------- | ----------------------------- |
| SQL Arrays      | `'{"a","b"}'`                                       | `'["a","b"]'`                 |
| UUID            | `a1b2c3d4-...` (solo hex)                           | `ghij-klmn-...`               |
| RLS Backend     | `auth.role() = 'service_role'`                      | `WITH CHECK (true)`           |
| RLS User        | `auth.uid() = user_id`                              | `USING (true)`                |
| RLS Public Read | `FOR SELECT USING (true)` OK                        | `FOR ALL USING (true)` NO     |
| Schema inspect  | `information_schema.columns` per tabelle specifiche | `list_tables` su schema large |
| RLS bypass      | Script→SQL output→MCP execute                       | Cercare service_role_key      |
| Server cache    | Services che scrivono cache usano `supabaseAdmin`   | `supabase` bloccato da RLS    |

### Quick Reference Errori SQL

| Errore                               | Causa              | Fix               |
| ------------------------------------ | ------------------ | ----------------- |
| `invalid input syntax for type uuid` | Caratteri g-z      | Solo 0-9, a-f     |
| `column "X" does not exist`          | Colonna sbagliata  | Verifica schema   |
| `violates check constraint`          | Valore non ammesso | Leggi CHECK       |
| `malformed array literal`            | `[]` invece `{}`   | Usa `'{"a","b"}'` |

---

## 2. Vercel & Deploy

### Errori Comuni

| Errore                      | Causa                                    | Soluzione                                      |
| --------------------------- | ---------------------------------------- | ---------------------------------------------- |
| Vercel auto-deploy bloccato | Ignored Build Step = stringa vuota `""`  | `bash ignore-build.sh` o rimuovere             |
| Build fail senza env vars   | Client creato a import time              | **Proxy pattern** per lazy init                |
| Deploy fallito post-push    | Build error non catturato                | Pre-push hook con `turbo build`                |
| Vercel Hobby blocca deploy  | Limitazioni non documentate per monorepo | **Upgrade a Pro** ($20/mo)                     |
| ERR_PNPM_OUTDATED_LOCKFILE  | pnpm version mismatch locale/Vercel      | `--no-frozen-lockfile` o allineare versioni    |
| pnpm 10 build scripts block | pnpm 10 blocca lifecycle scripts default | `onlyBuiltDependencies` in pnpm-workspace.yaml |
| BUILD_UTILS_SPAWN_1         | Errore generico build - **LEGGI I LOG**  | Vercel Dashboard → Build Logs → errore esatto  |
| Dashboard override nascosto | installCommand override in dashboard     | Verificare projectSettings in deployment API   |

### Patterns Corretti

| Area            | Pattern Corretto                                       | Anti-Pattern                             |
| --------------- | ------------------------------------------------------ | ---------------------------------------- |
| Env-dependent   | `Proxy` lazy init                                      | `createClient()` a import                |
| Vercel Ignored  | `bash script.sh` o rimuovere (null)                    | Stringa vuota `""` blocca builds         |
| Vercel monorepo | **Piano Pro** per progetti complessi                   | Piano Hobby (UI/Hook bloccati)           |
| API Supabase    | `import { supabaseAdmin } from '@/lib/supabase-admin'` | `const supabase = createClient()` inline |
| pnpm 10 scripts | `onlyBuiltDependencies` in pnpm-workspace.yaml         | Ignorare warning "Ignored build scripts" |
| pnpm lockfile   | Allineare packageManager con lockfileVersion           | Mismatch locale/CI versioni pnpm         |
| Build error     | **Leggere Build Logs** su Vercel Dashboard             | Ipotizzare causa senza log               |
| Debug deploy    | Chiedere log all'utente se non accessibili via API     | Tentare fix al buio per ore              |

### API Route Pattern

```typescript
// CORRETTO
import { supabaseAdmin } from '@/lib/supabase-admin';

// SBAGLIATO - causa build fail
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

---

## 3. TypeScript & Types

### Errori Comuni

| Errore                         | Causa                               | Soluzione                                   |
| ------------------------------ | ----------------------------------- | ------------------------------------------- |
| Import types sbagliati         | Path relativi errati                | Usa `@/types/`                              |
| Type union incompleta          | Manca valore combinato              | Include `'both'` quando dominio lo richiede |
| `useState<any[]>` implicit any | Locale passa, CI fallisce           | Definire sempre interface tipizzata         |
| Export duplicati               | `export interface` + default export | Mai duplicare                               |

### Patterns Corretti

| Area        | Pattern Corretto                               | Anti-Pattern                   |
| ----------- | ---------------------------------------------- | ------------------------------ |
| Imports     | `import { X } from '@/lib/...'`                | Path relativi profondi         |
| Type unions | Include tutti i valori validi                  | Dimenticare `'both'` etc       |
| React state | `useState<MyInterface[]>([])` sempre tipizzato | `useState<any[]>([])` implicit |

---

## 4. Git & CI/CD

### Errori Comuni

| Errore                     | Causa                                                     | Soluzione                                      |
| -------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| ESLint CI fail, local pass | `eslint.config.mjs` (v9) con ESLint v8                    | Usare `.eslintrc.json` (legacy)                |
| pnpm version conflict CI   | `version: 9` in ci.yml + `packageManager` in package.json | Rimuovere `version` da ci.yml                  |
| Prisma types missing in CI | `typecheck` esegue prima di `build`                       | `prisma generate &&` a script typecheck        |
| e2e tests run by Vitest    | Playwright `.spec.ts` picked up                           | `'**/e2e/**'` a `exclude` in vitest.config.ts  |
| Typecheck locale≠CI        | Cache locale, CI fresh install                            | `ci-local.sh`: clean + install + turbo --force |

### Patterns Corretti

| Area            | Pattern Corretto                                    | Anti-Pattern                       |
| --------------- | --------------------------------------------------- | ---------------------------------- |
| ESLint Next.js  | `.eslintrc.json` (legacy) con ESLint v8             | `eslint.config.mjs` (v9 only)      |
| CI pnpm version | Solo `packageManager` in package.json               | Doppia spec (ci.yml + pkg.json)    |
| CI/Local parity | `pnpm i --frozen-lockfile` + `turbo --force` locale | Fidarsi cache locale vs CI fresh   |
| Prisma CI       | `"typecheck": "prisma generate && tsc --noEmit"`    | Solo `tsc --noEmit` senza generate |
| Test exclusion  | Vitest exclude: `'**/e2e/**'`                       | Lasciare che Vitest esegua e2e     |
| CI/Deploy debug | Chiedi a utente di coinvolgere **Cowork**           | Tentare di indovinare senza log    |

### CI Simulation Script

```bash
# Simula CI in locale
./scripts/ci-local.sh          # Full
./scripts/ci-local.sh --quick  # Solo checks
./scripts/ci-local.sh --clean  # Pulizia
```

---

## 5. Translations & i18n

### Errori Comuni

| Errore                       | Causa                             | Soluzione                          |
| ---------------------------- | --------------------------------- | ---------------------------------- |
| MultiLangText vi required    | Traduzioni incomplete             | Rendere `vi?` opzionale            |
| Translation `t()` null error | Valori opzionali in interpolation | Usare `?? ''` o `?? 0`             |
| Traduzioni inline costose    | Generare testo con Claude         | **Usa OpenAI API** (gpt-4o-mini)   |
| Traduzioni identiche = bug?  | Prosciutto=Prosciutto             | Distinguere proper nouns vs errors |

### Patterns Corretti

| Area            | Pattern Corretto                             | Anti-Pattern                   |
| --------------- | -------------------------------------------- | ------------------------------ |
| i18n interp     | `t('key', { val: data ?? '' })` con fallback | `t('key', { val: data })` null |
| Traduzioni bulk | Script OpenAI (gpt-4o-mini)                  | Generare inline con Claude     |
| Gap detection   | Script automatico con NOT EXISTS pattern     | Query ad-hoc ogni volta        |

---

## 6. AI System

### Errori Comuni

| Errore                      | Causa                                  | Soluzione                                |
| --------------------------- | -------------------------------------- | ---------------------------------------- |
| MCP/API timeout misterioso  | Query complesse senza diagnostica      | Debug incrementale: semplice → complessa |
| list_tables blocca Claude   | Schema public troppo grande (~100 tab) | Query mirata su tabelle specifiche       |
| Pieces MCP timeout          | Server non ancora sincronizzato        | Aspetta sincronizzazione                 |
| Tentato save manuale Pieces | Pieces cattura tutto automaticamente   | Solo `ask_pieces_ltm` per query          |

### Patterns Corretti

| Area          | Pattern Corretto              | Anti-Pattern                |
| ------------- | ----------------------------- | --------------------------- |
| Debug API/MCP | Query semplice → incrementale | Query complessa subito      |
| Pieces MCP    | Query only (`ask_pieces_ltm`) | `create_memory` (auto-save) |

---

## 7. Workflow & Patterns

### Errori Comuni

| Errore                       | Causa                              | Soluzione                                |
| ---------------------------- | ---------------------------------- | ---------------------------------------- |
| Feature già esistente        | Non cercato prima                  | Grep/Glob PRIMA di implementare          |
| Tentare senza verificare     | Confidenza < 95% ma procedo        | **VERIFY online** prima                  |
| Warning ignorati             | Visti ma non agiti                 | **Agire subito** su warning/error        |
| Doc grandi → qualità persa   | Processare tutto insieme           | **Layered approach**                     |
| Blocco senza commit          | Task troppo lunga senza checkpoint | **Commit incrementali** ogni ~30 min     |
| CLAUDE.md non trovato        | Sessione avviata da ~              | `cd progetto && claude` o alias          |
| Roadmap/docs non committati  | Sessione lunga senza commit        | **Commit docs subito**                   |
| Backlog non sync con roadmap | Task create ma non aggiunte        | **Sync backlog** dopo planning           |
| Rimuovere link per fix 404   | Link → 404                         | **Creare la pagina**, non rimuovere link |
| Audit incompleto 75%         | Route groups non considerati       | **Glob fresh** su `**/page.tsx`          |
| **Procedere per tentativi**  | Ipotesi senza dati/log             | **LEGGI I LOG PRIMA** di ipotizzare      |
| File non committati          | Creati ma non `git add`            | **`git status`** prima di debug build    |
| Debug cieco su CI/Deploy     | Non ho accesso diretto ai log      | **CHIEDI i log all'utente** subito       |

### Patterns Corretti

| Area            | Pattern Corretto                       | Anti-Pattern                  |
| --------------- | -------------------------------------- | ----------------------------- |
| Error handling  | `try/catch` con logging                | Silent failures               |
| Warnings/Errors | Agire subito, fix o segnala            | Ignorare e proseguire         |
| Doc grandi      | Layered: sezioni rilevanti solo        | Leggere/processare tutto      |
| Task lunghe     | Commit ogni ~30 min                    | Task 2h+ senza checkpoint     |
| MCP heavy ops   | Prima commit, poi type gen             | Type gen durante sviluppo     |
| Dev server port | Verifica `lsof -i :3023` prima         | Assumere porta libera         |
| Hydration SSR   | `mounted` state + useEffect            | localStorage a render         |
| Feature 404     | Creare la pagina mancante              | Rimuovere il link             |
| Dev-only logic  | Componente separato `DevX`             | if(isDev) dentro comp prod    |
| Planning docs   | Commit roadmaps/specs subito           | Creare file senza commit      |
| Backlog sync    | Aggiorna 1-TODO + 4-DONE dopo planning | Roadmap senza sync            |
| Session start   | `cd progetto && claude` o alias        | Avviare Claude da ~           |
| KB Backoffice   | Aggiorna `lib/kb/kb-content.ts`        | Dimenticare docs utente       |
| **Debug CI**    | **Dati → Analisi → Piano → Azione**    | Tentativi casuali senza dati  |
| **Pre-deploy**  | `git status` per file non committati   | Debug build senza check files |
| **Log access**  | Chiedi log all'utente se serve         | Ipotizzare per ore senza dati |

### UX Patterns

| Area            | Pattern Corretto                 | Anti-Pattern            |
| --------------- | -------------------------------- | ----------------------- |
| Settings UX     | Tabs orizzontali                 | Submenu sidebar         |
| Regional market | Considera piattaforme Asia       | Default occidentali     |
| Service models  | Capire modello servizio locale   | One-size-fits-all       |
| Entry tier      | Tier base come piede nella porta | Forzare full package    |
| QR value        | QR utile anche senza ordering    | QR = solo ordering      |
| UA/Regex check  | Specifici prima, generici dopo   | Chrome prima di Samsung |

---

## Come Aggiornare

Quando Claude fa un errore, l'utente può dire:

- "questa è una nuova lezione"
- "ricordati questo errore"
- "non farlo più"
- "segnati questo"
- "lesson learned"

Claude deve:

1. Aggiungere alla sezione appropriata di questo file
2. Confermare: "Aggiunto a Lessons Learned (sezione X)"
3. Evitare di ripetere l'errore

---

**File:** `docs/LESSONS-LEARNED.md`
**Maintainer:** Claude Code + Team
