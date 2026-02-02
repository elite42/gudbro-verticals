# GudBro Backoffice - Sistema di Autenticazione

> **Documentazione completa del sistema auth per il backoffice**
>
> **Ultimo aggiornamento:** 2025-01-01

---

## Quick Start (Sviluppo)

### Accesso Rapido

1. Vai su `http://localhost:3001/login`
2. Clicca **"Show Dev Accounts"** (in basso)
3. Inserisci PIN: **`260775`**
4. Seleziona un account:
   - 👑 **GudBro Admin** - Accesso piattaforma completo
   - 🏪 **Mario Rossi** - Business owner
   - 👔 **Luigi Bianchi** - Manager
   - 👤 **Anna Verdi** - Staff

---

## Architettura

### Struttura File

```
apps/backoffice/lib/auth/
├── index.ts          # Public API + documentazione
├── types.ts          # TypeScript types (AuthUser, Permission, UserRole)
├── permissions.ts    # ROLE_PERMISSIONS, ROLE_HIERARCHY
├── dev-accounts.ts   # Test accounts + PIN gate

apps/backoffice/lib/contexts/
└── AuthContext.tsx   # React Context Provider

apps/backoffice/
├── middleware.ts     # Route protection
└── app/login/page.tsx # Login UI con dev accounts
```

### Import Pattern

```typescript
// Raccomandato: import dal modulo auth
import { useAuth, hasPermission, DEV_ACCOUNTS } from '@/lib/auth';

// Tipi
import type { AuthUser, Permission, UserRole } from '@/lib/auth';
```

---

## Ruoli e Permessi

### Gerarchia Ruoli

```
gudbro_owner > business_owner > manager > staff
```

| Ruolo | Descrizione | Accesso |
|-------|-------------|---------|
| `staff` | Camerieri, cassieri | Solo lettura |
| `manager` | Responsabili turno | Content + Orders |
| `business_owner` | Proprietari locali | Tutto tranne Platform |
| `gudbro_owner` | Admin piattaforma | Tutto + Platform Admin |

### Permessi per Ruolo

#### Staff
- `content:read`
- `orders:read`

#### Manager
- Tutti i permessi Staff +
- `content:write`
- `orders:manage`
- `analytics:read`
- `team:read`
- `settings:read`

#### Business Owner
- Tutti i permessi Manager +
- `content:delete`
- `analytics:export`
- `team:manage`, `team:invite`
- `billing:read`, `billing:manage`
- `settings:manage`

#### GudBro Owner
- Tutti i permessi Business Owner +
- `platform:read`
- `platform:manage`
- `platform:merchants`
- `platform:revenue`
- `platform:support`

---

## Uso nel Codice

### Hook useAuth

```tsx
import { useAuth } from '@/lib/auth';

function MyComponent() {
  const {
    user,           // AuthUser | null
    isLoading,      // boolean
    isDevMode,      // boolean
    hasPermission,  // (permission: Permission) => boolean
    isAtLeastRole,  // (role: UserRole) => boolean
    signOut,        // () => Promise<void>
  } = useAuth();

  // Check singolo permesso
  if (!hasPermission('content:write')) {
    return <AccessDenied />;
  }

  // Check ruolo minimo
  if (!isAtLeastRole('manager')) {
    return <AccessDenied />;
  }

  return <Editor />;
}
```

### Protezione Route (Componente)

```tsx
function ProtectedPage() {
  const { hasPermission } = useAuth();

  if (!hasPermission('analytics:read')) {
    return (
      <div className="text-center py-20">
        <h2>Accesso Negato</h2>
        <p>Non hai i permessi per questa sezione</p>
      </div>
    );
  }

  return <AnalyticsDashboard />;
}
```

### Navigazione Condizionale (Sidebar)

```tsx
// In Sidebar.tsx
const { hasPermission } = useAuth();
const isPlatformAdmin = hasPermission('platform:read');

// Mostra Platform solo a gudbro_owner
const navigation = isPlatformAdmin
  ? [...platformNavigation, ...merchantNavigation]
  : merchantNavigation;
```

---

## Dev Mode

### Configurazione

| Variabile | Valore | Effetto |
|-----------|--------|---------|
| `NODE_ENV` | `development` | Dev mode abilitato |
| `NODE_ENV` | `production` | Dev mode disabilitato |
| `NEXT_PUBLIC_ENABLE_DEV_AUTH` | `false` | Forza disabilitazione |

### PIN Gate

- **PIN:** `260775`
- **Dove:** `lib/auth/dev-accounts.ts`
- **Validazione:** `validateDevPin(pin: string): boolean`

### Accounts di Test

| ID | Nome | Email | Ruolo |
|----|------|-------|-------|
| `dev-gudbro-owner` | GudBro Admin | admin@gudbro.com | gudbro_owner |
| `dev-business-owner` | Mario Rossi | mario@cafferossi.it | business_owner |
| `dev-manager` | Luigi Bianchi | luigi@cafferossi.it | manager |
| `dev-staff` | Anna Verdi | anna@cafferossi.it | staff |

### Come Funziona

1. **Login Page:** Click "Show Dev Accounts"
2. **PIN Input:** Inserisci `260775`
3. **Account Selection:** Click su un account
4. **Storage:**
   - `localStorage.gudbro_dev_session` (client)
   - `Cookie: gudbro_dev_session` (middleware)
5. **Redirect:** Dashboard con ruolo selezionato

### Switching Ruoli (In-App)

Quando sei loggato in dev mode, la sidebar mostra un dropdown per cambiare ruolo al volo:

```
[DEV] Role Switcher
▼ 👑 GudBro Admin (gudbro owner)
  🏪 Mario Rossi (business owner)
  👔 Luigi Bianchi (manager)
  👤 Anna Verdi (staff)
```

---

## Produzione Checklist

### Prima del Deploy

- [ ] Verificare `NODE_ENV=production` su Vercel
- [ ] Oppure settare `NEXT_PUBLIC_ENABLE_DEV_AUTH=false`
- [ ] Rimuovere dev accounts hardcoded (opzionale, sono già disabilitati)
- [ ] Configurare Supabase Auth providers
- [ ] Creare tabella ruoli utente in database

### Database Schema (TODO)

```sql
-- Da creare prima della produzione
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  organization_id UUID REFERENCES organizations(id),
  role TEXT CHECK (role IN ('staff', 'manager', 'business_owner', 'gudbro_owner')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, organization_id)
);
```

### Fetch Ruolo da Database (TODO)

```typescript
// In AuthContext.tsx - checkSupabaseSession()
const { data: roleData } = await supabase
  .from('user_roles')
  .select('role, organization_id')
  .eq('user_id', session.user.id)
  .single();

setUser({
  id: session.user.id,
  email: session.user.email,
  role: roleData?.role || 'staff',
  organizationId: roleData?.organization_id,
  permissions: ROLE_PERMISSIONS[roleData?.role || 'staff'],
});
```

---

## Platform Admin Dashboard

### Accesso

- **URL:** `/platform`
- **Ruolo richiesto:** `gudbro_owner`
- **Permesso:** `platform:read`

### Sezioni

| Tab | Descrizione |
|-----|-------------|
| **Overview** | KPI principali, MRR, ARR, merchants |
| **Merchants** | Lista merchant con filtri |
| **Revenue** | Breakdown revenue streams |
| **Countries** | Espansione geografica |
| **Support** | Ticket management |

### Metriche Mock (da collegare a DB)

```typescript
const PLATFORM_STATS = {
  totalMerchants: 247,
  activeMerchants: 198,
  mrr: 12450,           // €
  arr: 149400,          // €
  churnRate: 2.3,       // %
  countries: 12,
};
```

---

## Troubleshooting

### "Dev accounts non visibili"

1. Verifica `NODE_ENV !== 'production'`
2. Verifica `NEXT_PUBLIC_ENABLE_DEV_AUTH !== 'false'`
3. Ricarica la pagina

### "PIN non funziona"

- PIN corretto: `260775`
- Case sensitive: no (solo numeri)

### "Ruolo non cambia dopo switch"

- La pagina si ricarica automaticamente
- Se non funziona, clear localStorage e cookies

### "Platform non visibile in sidebar"

- Devi essere loggato come `gudbro_owner`
- Usa il role switcher per cambiare

---

## Changelog

| Data | Versione | Modifiche |
|------|----------|-----------|
| 2025-01-01 | 1.0 | Sistema auth iniziale |
| 2025-01-01 | 1.1 | Refactoring moduli + JSDoc |
| 2025-01-01 | 1.2 | PIN gate `260775` |

---

**File:** `docs/BACKOFFICE-AUTH-SYSTEM.md`
**Maintainer:** Claude Code
