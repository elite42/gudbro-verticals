---
description: Esegui typecheck TypeScript
allowed-tools: Bash(pnpm:*), Bash(npx:*)
---

# TypeScript Typecheck

Esegui typecheck su tutto il progetto:

```bash
pnpm turbo typecheck
```

## Se ci sono errori

1. Leggi l'errore attentamente
2. Identifica il file e la linea
3. Fix l'errore
4. Riesegui typecheck

## Errori comuni

| Errore                        | Causa              | Fix                  |
| ----------------------------- | ------------------ | -------------------- |
| `Cannot find module`          | Import sbagliato   | Verifica path        |
| `Type 'X' is not assignable`  | Type mismatch      | Controlla tipi       |
| `Property 'X' does not exist` | Proprieta mancante | Aggiungi a interface |
