---
description: Scan tech debt strutturale, type safety e hygiene del codebase
---

# Tech Debt Scanner v2

Analisi tech debt su 3 livelli. Usa a fine sessione, prima di milestone, o su richiesta.

**Argomento opzionale:** `$ARGUMENTS`

- _(vuoto)_ — report completo (tutti i livelli)
- `quick` — solo Livello 1 (structural)
- `types` — solo Livello 2 (type safety)
- `save` — report completo + salva baseline per trend

---

## LIVELLO 1: Structural Debt [CRITICAL]

### 1.1 Componenti Monolitici (>500 LOC)

Trova file .tsx con piu di 500 righe — segnale di god component con responsabilita miste.

```bash
find apps/ -name "*.tsx" -not -path "*/node_modules/*" -not -path "*/.next/*" | xargs wc -l 2>/dev/null | sort -rn | awk '$1 > 500 {print}'
```

Classifica per severita:

- **>1000 LOC** = CRITICAL (es. workshops/page.tsx a 1256 righe)
- **500-1000 LOC** = HIGH
- **300-500 LOC** = WARN (segnala ma non urgente)

### 1.2 Funzioni Duplicate tra Apps

Cerca funzioni reimplementate in piu verticali invece di usare shared/:

```bash
# formatPrice — esiste in almeno 4 app con logica diversa
grep -rn "function formatPrice\|const formatPrice" apps/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next

# formatCurrency
grep -rn "function formatCurrency\|const formatCurrency" apps/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next

# Altre utility comuni duplicate
grep -rn "function slugify\|function truncate\|function debounce\|function formatDate" apps/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next
```

Per ogni funzione trovata in >1 app: segnala come candidata per `@gudbro/utils`.

### 1.3 Shared Package Adoption

Verifica quanti `@gudbro/*` packages ogni app importa. Le app mature (coffeeshop) ne usano 5+, le nuove spesso 0-1.

```bash
# Per ogni app, conta le dipendenze @gudbro/*
for dir in apps/*/frontend apps/backoffice apps/waiter; do
  if [ -f "$dir/package.json" ]; then
    count=$(grep -c "@gudbro/" "$dir/package.json" 2>/dev/null || echo 0)
    echo "$count @gudbro/* deps — $dir"
  fi
done | sort -n
```

Segnala app con <3 `@gudbro/*` imports — stanno probabilmente duplicando codice.

**Shared packages disponibili:** `@gudbro/config`, `@gudbro/hooks`, `@gudbro/types`, `@gudbro/ui`, `@gudbro/utils`, `@gudbro/components`

### 1.4 Config Consistency

```bash
# Apps con ignoreBuildErrors (debito TypeScript permanente)
grep -rl "ignoreBuildErrors.*true" apps/*/next.config.* apps/*/frontend/next.config.*

# Apps con config custom vs factory pattern
for f in $(find apps/ -name "next.config.*" -not -path "*/node_modules/*"); do
  lines=$(wc -l < "$f")
  uses_factory=$(grep -c "createNextConfig\|withNextConfig" "$f" 2>/dev/null || echo 0)
  echo "$lines LOC | factory=$uses_factory | $f"
done
```

Segnala: apps con `ignoreBuildErrors: true` (tutte), apps con config >30 LOC senza factory.

---

## LIVELLO 2: Type Safety & Code Quality [HIGH]

### 2.1 Type Escapes

```bash
# @ts-ignore e @ts-expect-error
grep -rn "@ts-ignore\|@ts-expect-error" apps/ shared/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next

# as any casts
grep -rn "as any" apps/ shared/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next

# : any type annotations
grep -rn ": any[^A-Za-z]" apps/ shared/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next
```

Conta per app. Mostra top 5 file per numero di escape. Target: 0 per shared/, <5 per app.

### 2.2 Service Proliferation

```bash
# Conta file *-service.ts per directory
for dir in apps/*/lib apps/*/frontend/lib; do
  if [ -d "$dir" ]; then
    count=$(find "$dir" -maxdepth 2 -name "*-service.ts" | wc -l)
    if [ "$count" -gt 10 ]; then
      echo "WARN: $count services in $dir"
    fi
  fi
done
```

Segnala directory con >30 service files — indica mancanza di service boundaries.

### 2.3 Migration Health

```bash
# Migration con "fix" nel nome (patch per errori precedenti)
ls shared/database/migrations/schema/*.sql 2>/dev/null | grep -i "fix\|patch\|hotfix"

# Totale migration count
ls shared/database/migrations/schema/*.sql 2>/dev/null | wc -l

# Ultime 5 migration (trend recente)
ls -t shared/database/migrations/schema/*.sql 2>/dev/null | head -5
```

Segnala: migration "fix" = instabilita schema. Controlla `.planning/STATE.md` per migration bloccate.

---

## LIVELLO 3: Hygiene [MEDIUM/LOW]

### 3.1 TODO/FIXME/HACK Markers

```bash
grep -rn "TODO\|FIXME\|HACK\|XXX\|WORKAROUND" apps/ shared/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next | wc -l
```

Mostra conteggio per categoria. Non tutti sono debt — quelli con date o issue number sono tracciati.

### 3.2 Deprecated Imports

```bash
# Lucide (dovrebbe essere Phosphor)
grep -rn "from 'lucide-react'" apps/ --include="*.tsx" --include="*.ts" | grep -v node_modules | wc -l

# Auth helpers deprecati
grep -rn "from '@supabase/auth-helpers'" apps/ --include="*.ts" --include="*.tsx" | grep -v node_modules | wc -l
```

### 3.3 Console.log Residui

```bash
# Solo console.log (non warn/error che possono essere intenzionali)
grep -rn "console\.log(" apps/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next | grep -v "// keep" | wc -l
```

---

## OUTPUT FORMAT

```
# Tech Debt Report - [DATA]

## Livello 1: Structural Debt 🔴

| Check | Count | Severity | Worst Offender |
|-------|-------|----------|----------------|
| Monolithic Components (>500 LOC) | X | CRITICAL | workshops/page.tsx (1256 LOC) |
| Duplicate Functions | X funzioni in Y apps | HIGH | formatPrice in 4 apps |
| Low Shared Adoption | X apps con <3 @gudbro/* | HIGH | wellness (1 pkg), workshops (0 pkg) |
| Config Inconsistency | X apps custom | MEDIUM | backoffice (142 LOC custom config) |

## Livello 2: Type Safety 🟡

| Check | Count | Severity | Worst Offender |
|-------|-------|----------|----------------|
| @ts-ignore / @ts-expect-error | X | HIGH | file.ts (Y occorrenze) |
| as any / : any | X | HIGH | file.ts (Y occorrenze) |
| Service Proliferation | X services in 1 dir | MEDIUM | backoffice/lib/ (141 services) |
| Fix Migrations | X | MEDIUM | 102-fix-orders-rls.sql |

## Livello 3: Hygiene 🟢

| Check | Count | Severity |
|-------|-------|----------|
| TODO/FIXME/HACK | X | LOW |
| Deprecated Imports (lucide) | X files | MEDIUM |
| Console.log | X | LOW |

## Trend vs Baseline
(solo se esiste .techdebt-baseline.json)

| Metrica | Precedente | Attuale | Delta |
|---------|------------|---------|-------|
| Monolithic Components | X | Y | +/-N |
| Type Escapes | X | Y | +/-N |
| ...

## Top 3 Azioni Prioritarie
1. [Azione piu impattante basata sui dati]
2. [Seconda azione]
3. [Terza azione]
```

---

## BASELINE (opzionale)

Se l'utente usa `/techdebt save`, salva i conteggi in `.techdebt-baseline.json`:

```json
{
  "date": "2026-02-03",
  "monolithic_500": 12,
  "duplicate_functions": 8,
  "low_shared_apps": 4,
  "ts_ignore": 40,
  "as_any": 35,
  "services_max": 141,
  "fix_migrations": 2,
  "todo_fixme": 89,
  "deprecated_imports": 15,
  "console_log": 120
}
```

Al prossimo scan, confronta e mostra delta con frecce (migliorato/peggiorato).

---

## CREA ISSUES (opzionale)

Se l'utente chiede, crea GitHub issues per i finding CRITICAL e HIGH:

```bash
gh issue create -R elite42/gudbro-verticals \
  --title "[Tech Debt] [descrizione]" \
  --label "infrastructure" \
  --body "Trovato da /techdebt scan..."
```
