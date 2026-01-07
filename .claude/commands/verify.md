---
description: Verifica lavoro completato (typecheck + build + advisors)
allowed-tools: Bash(pnpm:*), mcp__supabase__get_advisors
---

# Verification Protocol

Esegui questa verifica dopo ogni cambiamento significativo.

## 1. TypeScript Check

```bash
pnpm turbo typecheck
```

## 2. Build Check

```bash
pnpm turbo build
```

## 3. Database Security (se modificato schema)

```
mcp__supabase__get_advisors(type: "security")
```

## 4. Checklist Manuale

- [ ] Typecheck passa
- [ ] Build passa
- [ ] No warning critici
- [ ] RLS policies presenti (se nuova tabella)

## Se fallisce

1. **Typecheck fail** → Fix errori TypeScript
2. **Build fail** → Controlla import e sintassi
3. **Security advisor** → Aggiungi RLS policy

## Quick Fix Commands

```bash
# Rigenera tipi Supabase
npx supabase gen types typescript --project-id vnaonebbuezrzvjekqxs > apps/backoffice/types/supabase.ts
```
