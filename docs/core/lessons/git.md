# Lessons: Git & CI/CD

## Errori Comuni

| Errore                     | Causa                                                     | Soluzione                                      |
| -------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| ESLint CI fail, local pass | `eslint.config.mjs` (v9) con ESLint v8                    | Usare `.eslintrc.json` (legacy)                |
| pnpm version conflict CI   | `version: 9` in ci.yml + `packageManager` in package.json | Rimuovere `version` da ci.yml                  |
| Prisma types missing in CI | `typecheck` esegue prima di `build`                       | `prisma generate &&` a script typecheck        |
| e2e tests run by Vitest    | Playwright `.spec.ts` picked up                           | `'**/e2e/**'` a `exclude` in vitest.config.ts  |
| Typecheck locale≠CI        | Cache locale, CI fresh install                            | `ci-local.sh`: clean + install + turbo --force |

## Patterns Corretti

| Area            | Pattern Corretto                                    | Anti-Pattern                       |
| --------------- | --------------------------------------------------- | ---------------------------------- |
| ESLint Next.js  | `.eslintrc.json` (legacy) con ESLint v8             | `eslint.config.mjs` (v9 only)      |
| CI pnpm version | Solo `packageManager` in package.json               | Doppia spec (ci.yml + pkg.json)    |
| CI/Local parity | `pnpm i --frozen-lockfile` + `turbo --force` locale | Fidarsi cache locale vs CI fresh   |
| Prisma CI       | `"typecheck": "prisma generate && tsc --noEmit"`    | Solo `tsc --noEmit` senza generate |
| Test exclusion  | Vitest exclude: `'**/e2e/**'`                       | Lasciare che Vitest esegua e2e     |
| CI/Deploy debug | Chiedi a utente di coinvolgere **Cowork**           | Tentare di indovinare senza log    |

## CI Simulation Script

```bash
# Simula CI in locale
./scripts/ci-local.sh          # Full
./scripts/ci-local.sh --quick  # Solo checks
./scripts/ci-local.sh --clean  # Pulizia
```
