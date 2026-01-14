---
description: Quick QA check (5 min) - verifica stato progetto
allowed-tools: Bash(pnpm:*, git:*), mcp__supabase__get_advisors, Read
---

# Quick QA Check

Verifica veloce (~5 min) dello stato del progetto.

## 1. TypeScript Status

```bash
pnpm turbo typecheck 2>&1 | tail -20
```

**Target:** 0 errori

## 2. Build Status

```bash
pnpm turbo build 2>&1 | tail -30
```

**Target:** Build success

## 3. Security Advisors

```
mcp__supabase__get_advisors(type: "security")
```

**Target:** 0 critical, warning accettabili

## 4. Performance Advisors

```
mcp__supabase__get_advisors(type: "performance")
```

**Target:** Nessun bottleneck critico

## 5. Git Status

```bash
git status --short
```

**Target:** Working tree clean o cambiamenti intenzionali

## 6. IN-PROGRESS Tasks

```
Read: docs/backlog/2-IN-PROGRESS.md
```

**Target:** Max 3 task in progress

---

## Output Format

Dopo i check, riporta:

```
QA Quick Check - [DATA]

| Check | Status | Note |
|-------|--------|------|
| TypeScript | [OK/FAIL] | [X errori] |
| Build | [OK/FAIL] | [dettagli] |
| Security | [OK/WARN] | [N advisors] |
| Performance | [OK/WARN] | [N advisors] |
| Git | [CLEAN/DIRTY] | [N file] |
| Tasks | [OK/WARN] | [N in progress] |

Overall: [PASS/ISSUES]
```

---

## Red Flags (fermarsi e risolvere)

- TypeScript errors > 0
- Build fail
- Security advisors critical
- IN-PROGRESS > 3 tasks

## When to Run

- Inizio sessione
- Prima di commit importante
- Prima di deploy
- Quando hai dubbi sulla stabilita

---

_QA Quick Check v1.0_
