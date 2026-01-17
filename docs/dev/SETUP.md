# Setup Ambiente di Sviluppo

> Guida completa per configurare l'ambiente locale.
> Tempo stimato: 30-45 minuti.

---

## Prerequisiti

### Software Richiesto

| Software | Versione Minima | Verifica         |
| -------- | --------------- | ---------------- |
| Node.js  | 18.0.0+         | `node --version` |
| pnpm     | 9.15.0+         | `pnpm --version` |
| Git      | 2.x             | `git --version`  |

### Installazione Prerequisiti

```bash
# macOS con Homebrew
brew install node
brew install pnpm
brew install git

# Oppure usa nvm per Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Installa pnpm globalmente
npm install -g pnpm@9.15.0
```

---

## 1. Clone Repository

```bash
# Clone con SSH (raccomandato)
git clone git@github.com:gudbro/gudbro-verticals.git

# Oppure con HTTPS
git clone https://github.com/gudbro/gudbro-verticals.git

# Entra nella directory
cd gudbro-verticals
```

---

## 2. Installa Dipendenze

```bash
# Installa tutte le dipendenze (monorepo)
pnpm install

# Questo installerà anche Husky per git hooks
```

**Output atteso:**

```
Packages: +1037
Done in 15s
```

---

## 3. Configura Variabili Ambiente

### Backoffice (.env.local)

```bash
# Copia il template
cp apps/backoffice/.env.example apps/backoffice/.env.local
```

**Contenuto di `.env.local`:**

```bash
# Supabase (RICHIESTO)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# OpenAI (per AI Co-Manager)
OPENAI_API_KEY=sk-xxx...

# Upstash Redis (opzionale in dev)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Weather API (opzionale)
VISUAL_CROSSING_API_KEY=xxx
```

**Dove ottenere le credenziali:**

- **Supabase:** Chiedi al team lead o accedi a [Supabase Dashboard](https://supabase.com/dashboard)
- **OpenAI:** Chiedi al team lead o crea account su [OpenAI Platform](https://platform.openai.com)
- **Upstash:** Opzionale in dev, il sistema usa no-op cache se mancante

### Coffeeshop PWA (.env.local)

```bash
# Se lavori sulla PWA
cp apps/coffeeshop/frontend/.env.example apps/coffeeshop/frontend/.env.local
```

---

## 4. Genera Prisma Client

```bash
# Il backoffice usa Prisma
cd apps/backoffice
pnpm prisma generate
cd ../..
```

---

## 5. Avvia Server di Sviluppo

### Opzione A: Solo Backoffice (più comune)

```bash
pnpm dev:backoffice

# Output:
# ▲ Next.js 14.2.35
# - Local: http://localhost:3023
```

Apri: **http://localhost:3023**

### Opzione B: Solo PWA Coffeeshop

```bash
pnpm dev:coffeeshop

# Output:
# - Local: http://localhost:3004
```

Apri: **http://localhost:3004**

### Opzione C: Tutto insieme

```bash
pnpm dev

# Avvia tutti i progetti in parallelo
```

---

## 6. Verifica Funzionamento

### Checklist

- [ ] Backoffice si apre su http://localhost:3023
- [ ] Pagina di login visibile
- [ ] Nessun errore rosso in console browser
- [ ] Nessun errore nel terminale

### Test Comandi

```bash
# TypeScript check
pnpm typecheck

# Build completo
pnpm build

# Lint
pnpm lint

# Test
pnpm test:run
```

---

## Porte Utilizzate

| App            | Porta | URL                   |
| -------------- | ----- | --------------------- |
| Backoffice     | 3023  | http://localhost:3023 |
| Coffeeshop PWA | 3004  | http://localhost:3004 |
| Website        | 3000  | http://localhost:3000 |

**Se una porta è occupata:**

```bash
# Trova il processo
lsof -i :3023

# Termina il processo
kill -9 <PID>
```

---

## IDE Setup

### VS Code (Raccomandato)

**Estensioni consigliate:**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

**Settings consigliati (`.vscode/settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### Cursor

Cursor funziona bene con il progetto. Le stesse estensioni di VS Code sono compatibili.

### Claude Code

Il progetto è ottimizzato per Claude Code. Leggi `CLAUDE.md` per il workflow completo.

---

## Database

Il database è su **Supabase** (PostgreSQL gestito). Non serve database locale.

**Per query SQL:**

- Usa Supabase Dashboard → SQL Editor
- Oppure usa il tool MCP `mcp__supabase__execute_sql` se usi Claude Code

**Schema attuale:** `docs/DATABASE-SCHEMA.md`

---

## Troubleshooting

### Errore: "Module not found"

```bash
# Reinstalla dipendenze
rm -rf node_modules
pnpm install
```

### Errore: "Port already in use"

```bash
# Trova e termina il processo
lsof -i :3023 | grep LISTEN
kill -9 <PID>
```

### Errore: Prisma client

```bash
cd apps/backoffice
pnpm prisma generate
```

### Errore: Supabase connection

1. Verifica che `.env.local` esista
2. Verifica che le credenziali siano corrette
3. Verifica che il progetto Supabase sia attivo

### Errore: TypeScript errors (pre-esistenti)

Alcuni test file hanno errori TypeScript pre-esistenti. Non bloccare il tuo lavoro per questi - il build funziona comunque.

---

## Prossimi Passi

Setup completato? Vai a:

1. `docs/dev/ARCHITECTURE.md` - Capire la struttura
2. `docs/dev/CODING-STANDARDS.md` - Convenzioni codice
3. `docs/dev/FIRST-TASK.md` - Prima task guidata
