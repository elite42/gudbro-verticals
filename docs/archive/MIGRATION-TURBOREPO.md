# Migration Plan: Turborepo + pnpm

> **Principio guida:** "È più facile costruire bene da zero che sistemare dopo"

---

## Situazione Attuale

### Struttura

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/   # Next.js PWA
│   ├── website/               # Next.js Marketing + API
│   ├── backoffice/            # Next.js Admin
│   ├── wellness/              # (placeholder)
│   └── rentals/               # (placeholder)
├── shared/
│   ├── config/                # @gudbro/config
│   ├── types/                 # @gudbro/types
│   ├── utils/                 # @gudbro/utils
│   ├── ui/                    # @gudbro/ui
│   ├── database/              # SQL scripts
│   └── menu-template/         # (legacy?)
└── package.json               # npm workspaces
```

### Dimensioni node_modules (prima)

| Location            | Size        |
| ------------------- | ----------- |
| Root                | 531 MB      |
| coffeeshop/frontend | 279 MB      |
| backoffice          | 20 MB       |
| website             | 18 MB       |
| **TOTALE**          | **~848 MB** |

### Problemi attuali

1. **Duplicazione dipendenze** - Stesso pacchetto in più node_modules
2. **No caching** - Ogni build riparte da zero
3. **Script manuali** - `cd apps/xxx && npm run dev`
4. **No parallelismo** - Build sequenziali

---

## Obiettivi della Migrazione

1. **pnpm** - Risparmio spazio (symlink invece di copie)
2. **Turborepo** - Caching build, parallelismo, pipeline
3. **Struttura pulita** - Workspace config standardizzata
4. **DX migliorata** - Comandi semplici (`turbo dev`, `turbo build`)

---

## Piano di Migrazione (4 Steps)

### Step 1: Setup pnpm

**Rischio: BASSO | Tempo: 10 min**

1. Verificare pnpm installato globalmente
2. Creare `pnpm-workspace.yaml`
3. Rimuovere tutti i `node_modules` e `package-lock.json`
4. Eseguire `pnpm install`
5. Verificare che le app funzionino

**Rollback:** Basta cancellare `pnpm-lock.yaml` e reinstallare con npm

### Step 2: Configurare Turborepo

**Rischio: BASSO | Tempo: 15 min**

1. Aggiungere `turbo` come devDependency
2. Creare `turbo.json` con pipeline
3. Aggiornare scripts in root `package.json`
4. Testare `turbo dev`, `turbo build`

**Rollback:** Rimuovere turbo.json e turbo dependency

### Step 3: Aggiornare tutti i packages

**Rischio: MEDIO | Tempo: 20 min**

1. Standardizzare nomi pacchetti (`@gudbro/xxx`)
2. Aggiungere script mancanti (dev, build, lint, typecheck)
3. Configurare dipendenze interne correttamente
4. Verificare path aliases funzionino

**Rollback:** Git revert dei package.json modificati

### Step 4: Verifica e Test

**Rischio: BASSO | Tempo: 15 min**

1. Build tutte le app
2. Dev server per ogni app
3. Verificare caching funziona
4. Misurare risparmio spazio
5. Aggiornare documentazione

---

## Configurazioni da Creare

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'apps/coffeeshop/*'
  - 'shared/*'
```

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env*"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

---

## Rischi e Mitigazioni

| Rischio                    | Probabilità | Impatto | Mitigazione                 |
| -------------------------- | ----------- | ------- | --------------------------- |
| Dipendenze non compatibili | Bassa       | Alto    | Test incrementale           |
| Path resolution rotto      | Media       | Medio   | Verificare tsconfig         |
| CI/CD da aggiornare        | Bassa       | Basso   | GitHub Actions già presente |
| Husky non funziona         | Bassa       | Basso   | Riconfigurare se necessario |

---

## Checklist Pre-Migrazione

```markdown
[x] Backup: Git commit di tutto il lavoro corrente
[x] Documentazione: Piano scritto e approvato
[ ] Verifica: pnpm installato globalmente
[ ] Tempo: Almeno 1 ora disponibile senza interruzioni
```

---

## Metriche di Successo

- [ ] `pnpm install` completa senza errori
- [ ] `turbo build` compila tutte le app
- [ ] `turbo dev --filter=website` avvia solo website
- [ ] Caching funziona (secondo build più veloce)
- [ ] Spazio node_modules ridotto (target: -40%)

---

**Pronto per esecuzione: SÌ/NO**

---

_File: docs/MIGRATION-TURBOREPO.md_
_Created: 2025-01-03_
