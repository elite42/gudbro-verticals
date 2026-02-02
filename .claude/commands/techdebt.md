---
description: Scan codebase per tech debt e code smells
---

# Tech Debt Scanner

Scansiona il codebase per debito tecnico. Usa a fine sessione o su richiesta.

## 1. TODO/FIXME/HACK Comments

Cerca in `apps/` e `shared/` (escludi node_modules, .next):

```bash
grep -rn "TODO\|FIXME\|HACK\|XXX\|WORKAROUND" apps/ shared/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next
```

Conta per categoria e per file.

## 2. Deprecated Imports

```bash
# Lucide invece di Phosphor (dovrebbe usare @phosphor-icons/react)
grep -rn "from 'lucide-react'" apps/ --include="*.tsx" --include="*.ts" | grep -v node_modules

# Auth helpers deprecati
grep -rn "from '@supabase/auth-helpers'" apps/ --include="*.ts" --include="*.tsx" | grep -v node_modules
```

## 3. File Troppo Lunghi (>300 righe)

```bash
find apps/ shared/ -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .next | xargs wc -l | sort -rn | awk '$1 > 300'
```

## 4. Componenti Duplicati tra Apps

```bash
find apps/ -name "*.tsx" -not -path "*/node_modules/*" -not -path "*/.next/*" | xargs -I {} basename {} | sort | uniq -d
```

## 5. Console.log Residui

```bash
grep -rn "console\.log" apps/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next | grep -v "// keep"
```

---

## Output Format

Presenta i risultati in questa struttura:

```
## Tech Debt Report - [DATA]

| Categoria | Count | Severita | Top Esempio |
|-----------|-------|----------|-------------|
| TODO/FIXME | X | Medium | file.ts:42 |
| Deprecated imports | X | High | lucide-react in Y files |
| File >300 righe | X | Low | file.ts (450 lines) |
| Duplicati | X | Medium | Component.tsx in N apps |
| Console.log | X | Low | file.ts:15 |

**Totale: X findings**

### Critical (da risolvere subito)
- [lista]

### High (prossima sessione)
- [lista]

### Medium/Low (backlog)
- [lista]
```

## 6. Crea Issues (Opzionale)

Se l'utente chiede, crea GitHub issues per i finding critici:

```bash
gh issue create -R elite42/gudbro-verticals \
  --title "[Tech Debt] [descrizione]" \
  --label "infrastructure" \
  --body "Trovato da /techdebt scan..."
```
