# Lessons: Vercel & Deploy

## Errori Comuni

| Errore                      | Causa                                    | Soluzione                                      |
| --------------------------- | ---------------------------------------- | ---------------------------------------------- |
| Vercel auto-deploy bloccato | Ignored Build Step = stringa vuota `""`  | `bash ignore-build.sh` o rimuovere             |
| Build fail senza env vars   | Client creato a import time              | **Proxy pattern** per lazy init                |
| Deploy fallito post-push    | Build error non catturato                | Pre-push hook con `turbo build`                |
| Vercel Hobby blocca deploy  | Limitazioni non documentate per monorepo | **Upgrade a Pro** ($20/mo)                     |
| ERR_PNPM_OUTDATED_LOCKFILE  | pnpm version mismatch locale/Vercel      | `--no-frozen-lockfile` o allineare versioni    |
| pnpm 10 build scripts block | pnpm 10 blocca lifecycle scripts default | `onlyBuiltDependencies` in pnpm-workspace.yaml |
| BUILD_UTILS_SPAWN_1         | Errore generico build - **LEGGI I LOG**  | Vercel Dashboard → Build Logs → errore esatto  |
| Dashboard override nascosto | installCommand override in dashboard     | Verificare projectSettings in deployment API   |

## Patterns Corretti

| Area            | Pattern Corretto                                       | Anti-Pattern                             |
| --------------- | ------------------------------------------------------ | ---------------------------------------- |
| Env-dependent   | `Proxy` lazy init                                      | `createClient()` a import                |
| Vercel Ignored  | `bash script.sh` o rimuovere (null)                    | Stringa vuota `""` blocca builds         |
| Vercel monorepo | **Piano Pro** per progetti complessi                   | Piano Hobby (UI/Hook bloccati)           |
| API Supabase    | `import { supabaseAdmin } from '@/lib/supabase-admin'` | `const supabase = createClient()` inline |
| pnpm 10 scripts | `onlyBuiltDependencies` in pnpm-workspace.yaml         | Ignorare warning "Ignored build scripts" |
| pnpm lockfile   | Allineare packageManager con lockfileVersion           | Mismatch locale/CI versioni pnpm         |
| Build error     | **Leggere Build Logs** su Vercel Dashboard             | Ipotizzare causa senza log               |
| Debug deploy    | Chiedere log all'utente se non accessibili via API     | Tentare fix al buio per ore              |

## API Route Pattern

```typescript
// CORRETTO
import { supabaseAdmin } from '@/lib/supabase-admin';

// SBAGLIATO - causa build fail
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```
