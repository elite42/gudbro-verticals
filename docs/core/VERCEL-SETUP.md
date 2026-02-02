# VERCEL SETUP GUIDE

**Last Updated:** 2026-01-23
**Version:** 1.0

Guida completa per la configurazione dei progetti Vercel per GUDBRO.

---

## Progetti Vercel

| Progetto          | Repository               | Root Directory           | Domain           |
| ----------------- | ------------------------ | ------------------------ | ---------------- |
| gudbro-backoffice | elite42/gudbro-verticals | apps/backoffice          | admin.gudbro.com |
| gudbro-menu       | elite42/gudbro-verticals | apps/coffeeshop/frontend | menu.gudbro.com  |
| gudbro-website    | elite42/gudbro-website   | /                        | gudbro.com       |

---

## Environment Variables

### Backoffice (Production)

| Variable                        | Description                              | Required    |
| ------------------------------- | ---------------------------------------- | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                     | Yes         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key                   | Yes         |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key (backend only) | Yes         |
| `NEXT_PUBLIC_SENTRY_DSN`        | Sentry DSN for error tracking            | Yes         |
| `OPENAI_API_KEY`                | OpenAI API key for AI features           | Yes         |
| `VISUAL_CROSSING_API_KEY`       | Weather API key                          | Optional    |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY`  | Push notifications public key            | Optional    |
| `VAPID_PRIVATE_KEY`             | Push notifications private key           | Optional    |
| `UPSTASH_REDIS_REST_URL`        | Redis cache URL                          | Recommended |
| `UPSTASH_REDIS_REST_TOKEN`      | Redis cache token                        | Recommended |

### Backoffice (Staging/Preview)

Le stesse variabili di Production, ma con valori del progetto Supabase **staging**:

- `NEXT_PUBLIC_SUPABASE_URL` → URL del progetto staging
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Anon key del progetto staging
- `SUPABASE_SERVICE_ROLE_KEY` → Service role key del progetto staging

### PWA (menu.gudbro.com)

| Variable                        | Description            | Required |
| ------------------------------- | ---------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL   | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes      |

---

## vercel.json Configuration

### Backoffice (`apps/backoffice/vercel.json`)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && pnpm install",
  "buildCommand": "cd ../.. && pnpm turbo build --filter=backoffice",
  "regions": ["fra1", "iad1"],
  "git": {
    "deploymentEnabled": {
      "main": true,
      "staging": true
    }
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30,
      "memory": 1024
    },
    "app/api/ai/**/*.ts": {
      "maxDuration": 60,
      "memory": 3008
    }
  },
  "crons": [
    {
      "path": "/api/notifications/process",
      "schedule": "0 8 * * *"
    }
  ]
}
```

### PWA (`apps/coffeeshop/frontend/vercel.json`)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "installCommand": "cd ../../.. && pnpm install",
  "buildCommand": "cd ../../.. && pnpm turbo build --filter=@gudbro/coffeeshop",
  "regions": ["fra1", "iad1"]
}
```

---

## Configurazione Nuovo Progetto

### Step 1: Import da GitHub

1. Vai su https://vercel.com/new
2. Import repository `elite42/gudbro-verticals`
3. **Root Directory:** `apps/[nome-app]`
4. Framework: Next.js (auto-detected)

### Step 2: Build Settings

- **Build Command:** Lascia vuoto (usa vercel.json)
- **Output Directory:** Lascia vuoto (usa vercel.json)
- **Install Command:** Lascia vuoto (usa vercel.json)

### Step 3: Environment Variables

1. Vai in Settings → Environment Variables
2. Aggiungi tutte le variabili richieste
3. Seleziona gli environment appropriati (Production, Preview, Development)

### Step 4: Ignored Build Step (Monorepo)

Per evitare build inutili quando cambiano altri progetti nel monorepo:

1. Vai in Settings → Git → Ignored Build Step
2. Inserisci: `bash ignore-build.sh`

Il file `ignore-build.sh` controlla se ci sono cambiamenti nella directory del progetto.

---

## Branching Strategy

| Branch      | Environment | Supabase       | URL                                   |
| ----------- | ----------- | -------------- | ------------------------------------- |
| `main`      | Production  | gudbro-prod    | admin.gudbro.com                      |
| `staging`   | Preview     | gudbro-staging | staging.admin.gudbro.com              |
| `feature/*` | Preview     | gudbro-staging | [branch].gudbro-backoffice.vercel.app |

---

## Domains

### Configurazione Domini Personalizzati

1. Vai in Settings → Domains
2. Add domain: `admin.gudbro.com`
3. Configura DNS:
   - Type: CNAME
   - Name: admin
   - Value: cname.vercel-dns.com

### SSL/TLS

Vercel gestisce automaticamente i certificati SSL. Non serve configurazione manuale.

---

## Monitoring

### Sentry (Error Tracking)

- Dashboard: https://gudbro.sentry.io
- Progetto: gudbro-backoffice
- DSN configurato in `NEXT_PUBLIC_SENTRY_DSN`

### UptimeRobot (Uptime Monitoring)

- Dashboard: https://uptimerobot.com
- Monitor: gudbro-backoffice.vercel.app/api/health
- Check interval: 5 minuti
- Status page: stats.uptimerobot.com/IQrR3gr5Re

### Health Endpoint

```bash
# Check health
curl https://admin.gudbro.com/api/health

# Response
{
  "status": "healthy",
  "timestamp": "2026-01-23T...",
  "services": {
    "redis": { "status": "up", "latencyMs": 5 },
    "database": { "status": "up", "latencyMs": 20 }
  },
  "version": "abc1234"
}
```

---

## Troubleshooting

### Build Fails: "Cannot find module"

**Causa:** Dipendenze mancanti o path errati nel monorepo.

**Fix:**

```bash
# Locale
pnpm install --frozen-lockfile
pnpm turbo build --filter=backoffice
```

### Build Fails: "NEXT*PUBLIC*\* undefined"

**Causa:** Environment variable mancante su Vercel.

**Fix:**

1. Vai in Settings → Environment Variables
2. Verifica che tutte le variabili richieste siano presenti
3. Verifica che siano abilitate per l'environment corretto

### Deploy Success ma 500 Error

**Causa:** Runtime error, spesso env vars mancanti o DB non raggiungibile.

**Fix:**

1. Check Vercel Functions logs
2. Check Sentry per errori
3. Verifica connessione Supabase

### Ignored Build Step Non Funziona

**Causa:** Script non ha permessi di esecuzione o path errato.

**Fix:**

```bash
# Verifica script esiste
cat apps/backoffice/ignore-build.sh

# Verifica exit codes
# Exit 0 = skip build
# Exit 1 = proceed with build
```

---

## Riferimenti

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Monorepo Support](https://vercel.com/docs/monorepos)
- [Environment Variables](https://vercel.com/docs/environment-variables)
