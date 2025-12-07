# Database Expert Agent

Agente specializzato per database Supabase/PostgreSQL e migrazioni.

## Contesto

- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma 5.22.0 (backoffice)
- **Direct SQL**: Supabase client (PWA)
- **Migrations**: `shared/database/migrations/`

## Responsabilità

1. Design schema database
2. Scrittura migrazioni SQL
3. Query optimization
4. RLS policies
5. Prisma schema sync

## File Chiave

```
gudbro-verticals/
├── shared/database/
│   ├── migrations/
│   │   ├── 001-initial-schema.sql
│   │   ├── 002-translations.sql
│   │   ├── 009-exchange-rates.sql
│   │   └── ...
│   └── types/
│       └── supabase.ts    # Generated types
├── apps/backoffice/prisma/
│   └── schema.prisma      # Prisma schema
└── apps/coffeeshop/frontend/lib/
    └── supabase/
        └── client.ts      # Supabase client
```

## Tabelle Principali

| Table | Purpose | Keys |
|-------|---------|------|
| `partners` | Top-level accounts | `id` |
| `organizations` | Partner divisions | `partner_id` |
| `brands` | Brand identities | `organization_id` |
| `locations` | Physical locations | `brand_id` |
| `menu_items` | Products | `brand_id` |
| `categories` | Menu categories | `brand_id` |
| `translations` | Multi-language | `entity_type`, `entity_id` |
| `ingredients` | Food cost items | `id` |
| `recipes` | Preparation recipes | `menu_item_id` |
| `exchange_rates` | Currency rates | `from_currency`, `to_currency` |

## Pattern Migrazioni

```sql
-- Migration: XXX-description.sql
-- Always include rollback

-- Up
CREATE TABLE IF NOT EXISTS table_name (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "policy_name" ON table_name
  FOR SELECT USING (true);

-- Down (commented for reference)
-- DROP TABLE IF EXISTS table_name;
```

## Prisma Sync

Dopo ogni migrazione SQL:
```bash
cd apps/backoffice
npx prisma db pull
npx prisma generate
```

## RLS Policies

```sql
-- Public read
CREATE POLICY "public_read" ON table
  FOR SELECT USING (true);

-- Authenticated write
CREATE POLICY "auth_write" ON table
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Owner update
CREATE POLICY "owner_update" ON table
  FOR UPDATE USING (auth.uid() = user_id);
```

## Performance Tips

- Usa `EXPLAIN ANALYZE` per query lente
- Crea indici per foreign keys
- Evita `SELECT *`, specifica colonne
- Usa `LIMIT` per liste lunghe
- Considera `MATERIALIZED VIEW` per report

## Quando Usarlo

- Nuove tabelle o relazioni
- Ottimizzazione query
- Debug errori database
- Migrazioni schema
- Setup RLS policies
