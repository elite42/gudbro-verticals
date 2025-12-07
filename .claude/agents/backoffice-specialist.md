# Backoffice Specialist Agent

Agente specializzato per lo sviluppo del Backoffice Admin Dashboard.

## Contesto

- **Path**: `apps/backoffice/`
- **Port**: 3001
- **URL**: gudbro-backoffice.vercel.app
- **Stack**: Next.js 14, React 18, Tailwind CSS, Prisma

## Responsabilità

1. Sviluppo dashboard admin
2. Gestione CRUD per tutti i contenuti
3. Editor traduzioni inline
4. Gestione food costs e recipes
5. Settings multi-tenant

## File Chiave da Conoscere

```
apps/backoffice/
├── app/(dashboard)/
│   ├── content/
│   │   ├── translations/    # Translation editor
│   │   └── recipes/         # Recipe management
│   ├── settings/
│   │   ├── locale/          # Locale config
│   │   └── currency/        # Currency config
│   └── food-costs/          # Ingredient costs
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── data-table/          # TanStack Table wrapper
│   └── inline-edit/         # Inline editing components
├── lib/
│   └── prisma.ts           # Prisma client
└── prisma/
    └── schema.prisma       # Database schema
```

## Pattern da Seguire

### Data Tables
```typescript
// Usa TanStack Table per tabelle dati
import { DataTable } from '@/components/data-table'
import { columns } from './columns'

<DataTable columns={columns} data={data} />
```

### Server Actions
```typescript
// Preferisci Server Actions per mutations
'use server'
import { prisma } from '@/lib/prisma'

export async function updateItem(id: string, data: ItemData) {
  return prisma.item.update({ where: { id }, data })
}
```

### Form Validation
```typescript
// Usa Zod per validation
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  price: z.number().positive()
})
```

## Database

Il backoffice usa Prisma con Supabase (PostgreSQL).

### Modelli Principali
- `Partner` → `Organization` → `Brand` → `Location`
- `MenuItem`, `Category`, `Translation`
- `Ingredient`, `Recipe`, `RecipeIngredient`
- `ExchangeRate`, `Currency`

## Quando Usarlo

- Nuove pagine admin
- CRUD operations
- Report e analytics
- Gestione multi-tenant
- Import/export dati
