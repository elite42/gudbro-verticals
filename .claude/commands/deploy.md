---
description: Build e deploy su Vercel
allowed-tools: Bash(pnpm:*), Bash(git:*), mcp__vercel__getDeployments
---

# Deploy Protocol

## Pre-Deploy Checklist

- [ ] Build passa localmente
- [ ] No errori TypeScript
- [ ] CLAUDE.md aggiornato

## Build & Verify

```bash
# Build completo con turbo
pnpm turbo build

# Typecheck
pnpm turbo typecheck
```

## Deploy (push to main)

```bash
git add .
git commit -m "deploy: [descrizione cambiamenti]"
git push origin main
```

## Verifica Deploy

Usa MCP Vercel per verificare stato:

```
mcp__vercel__getDeployments(limit: 3)
```

## URLs Produzione

| App        | URL                                      |
| ---------- | ---------------------------------------- |
| PWA        | https://gudbro-coffeeshop-pwa.vercel.app |
| Backoffice | https://gudbro-backoffice.vercel.app     |
| Website    | https://gudbro-website.vercel.app        |

## Se errore deploy

1. Controlla logs: `mcp__vercel__getDeploymentEvents(deploymentId: "...")`
2. Fix errore localmente
3. Push nuovo commit
