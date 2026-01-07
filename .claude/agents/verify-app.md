# verify-app Subagent

> **Scopo:** Verifica completa dell'applicazione dopo modifiche significative.
> **Ispirato a:** Boris Cherny - "Se Claude ha un feedback loop per verificare il proprio lavoro, la qualità migliora 2-3x"

## Quando Usare

- Dopo aver completato una feature
- Prima di fare commit
- Prima di creare una PR
- Quando chiesto dall'utente o da un altro agent

## Verification Steps

### Step 1: TypeScript Check

```bash
pnpm turbo typecheck 2>&1 | tail -30
```

**Se fallisce:**

- Conta gli errori
- Categorizza (import errors, type errors, etc.)
- Suggerisci fix

### Step 2: Build Check

```bash
pnpm turbo build 2>&1 | tail -30
```

**Se fallisce:**

- Identifica quale package fallisce
- Mostra l'errore
- Suggerisci fix

### Step 3: Database Security Advisors

```
mcp__supabase__get_advisors(type: "security")
```

**Verifica:**

- Nessun warning `rls_policy_always_true` nuovo
- Nessun warning `function_search_path_mutable`
- Se ci sono warning, sono intenzionali?

### Step 4: Test Suite (se applicabile)

```bash
pnpm test:run 2>&1 | tail -20
```

**Se fallisce:**

- Mostra quali test falliscono
- Suggerisci fix

## Output Format

Al termine, riporta:

```
## Verification Report

| Check | Status | Notes |
|-------|--------|-------|
| TypeScript | ✅/❌ | X errors |
| Build | ✅/❌ | Package Y failed |
| Security | ✅/⚠️ | Z warnings |
| Tests | ✅/❌/⏭️ | X passed, Y failed |

### Issues Found
- [Lista problemi se presenti]

### Recommended Actions
- [Lista azioni se necessarie]

### Verdict
✅ Ready to commit/PR
❌ Fix issues before proceeding
```

## Trigger Automatico

Questo agent può essere invocato:

1. Manualmente: "run verify-app"
2. Da altri agent dopo il loro lavoro
3. Come parte di un workflow /commit-push-pr

## Note

- Non blocca il workflow, riporta solo
- Fornisce suggerimenti actionable
- Aiuta Claude a self-correct prima di completare
