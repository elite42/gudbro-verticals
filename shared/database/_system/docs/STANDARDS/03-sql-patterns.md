# SQL Patterns Reference

> Pattern SQL corretti per GUDBRO database

---

## TEXT + CHECK (NON ENUM!)

> **Decisione architetturale (2025-12-18):** Sempre TEXT con CHECK, mai ENUM per nuove tabelle.

### Pattern Raccomandato

```sql
-- CORRETTO: TEXT con CHECK constraint
category TEXT NOT NULL
  CHECK (category IN ('beef_steak', 'lamb_game', 'poultry_grill', 'ribs_bbq')),

status TEXT NOT NULL DEFAULT 'active'
  CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional')),

style TEXT NOT NULL DEFAULT 'international'
  CHECK (style IN ('american', 'italian', 'french', 'japanese', 'korean', 'international')),
```

### Pattern Deprecato

```sql
-- DEPRECATO - NON USARE
DO $$ BEGIN
  CREATE TYPE steaks_category AS ENUM (...);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
```

### Problemi con ENUM

| Problema | Descrizione |
|----------|-------------|
| `ALTER TYPE ADD VALUE` | Non può essere eseguito in una transazione |
| **Non esiste** `DELETE VALUE` | Impossibile rimuovere valori! |
| ORM compatibility | Prisma, TypeORM, Sequelize hanno problemi |
| Supabase SQL Editor | Blocchi DO $$ non funzionano bene |

### Vantaggi TEXT + CHECK

- Modifiche facili: `ALTER TABLE ... DROP CONSTRAINT / ADD CONSTRAINT`
- Funziona in transazioni
- Nessun problema con migration tools
- Import in un singolo file SQL

**Quando usare ENUM:** Solo per valori VERAMENTE immutabili (giorni settimana, continenti)

---

## Indexes Obbligatori

```sql
-- Category e popularity
CREATE INDEX IF NOT EXISTS idx_{table}_category ON {table}(category);
CREATE INDEX IF NOT EXISTS idx_{table}_popularity ON {table}(popularity DESC);

-- GIN per arrays (OBBLIGATORI!)
CREATE INDEX IF NOT EXISTS idx_{table}_tags ON {table} USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_{table}_ingredient_ids ON {table} USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_{table}_allergens ON {table} USING GIN(allergens);

-- Partial per filtri comuni
CREATE INDEX IF NOT EXISTS idx_{table}_vegan ON {table}(is_vegan) WHERE is_vegan = true;
CREATE INDEX IF NOT EXISTS idx_{table}_gluten_free ON {table}(is_gluten_free) WHERE is_gluten_free = true;
```

---

## RLS (Row Level Security) - OBBLIGATORIO

```sql
-- SEMPRE abilitare RLS su nuove tabelle
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;

-- Policy per lettura pubblica (naming standard!)
DROP POLICY IF EXISTS "Public read access" ON {table};
CREATE POLICY "Public read access" ON {table}
  FOR SELECT USING (true);

-- Policy per scrittura (solo service_role)
DROP POLICY IF EXISTS "Service write access" ON {table};
CREATE POLICY "Service write access" ON {table}
  FOR ALL USING (auth.role() = 'service_role');
```

**Naming policy:** Sempre `"Public read access"` e `"Service write access"` (senza suffisso tabella)

---

## Trigger updated_at

```sql
-- Funzione riutilizzabile (creare una volta)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per ogni tabella
CREATE TRIGGER set_{table}_updated_at
  BEFORE UPDATE ON {table}
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## product_taxonomy (CRITICO!)

Ogni nuovo database food/bevande DEVE essere registrato in `product_taxonomy`.

> **Template completo:** `docs/TEMPLATES/01-product-taxonomy-cuisine.sql`

### Valori VALIDI per `menu_type`

| Valore | Uso |
|--------|-----|
| `bar_menu` | Bevande alcoliche (cocktails, wines, beers, spirits) |
| `cafe_menu` | Coffee, tea |
| `traditional_course` | Cucina tradizionale con portate (appetizers, pasta, steaks, desserts) |
| `standalone` | **Cucine etniche** (turkish, lebanese, korean, vietnamese, german, etc.) |
| `side_dish` | Contorni (salads) |

### Valori VALIDI per `service_type`

| Valore | Uso |
|--------|-----|
| `food` | Tutti i cibi |
| `beverage` | Tutte le bevande |

### Valori VALIDI per `category`

| Valore | Uso |
|--------|-----|
| `appetizer` | Antipasti |
| `first_course` | Primi (pasta, soups, risotti, dumplings) |
| `second_course` | **Secondi e cucine etniche** (steaks, seafood, german, french, etc.) |
| `side` | Contorni |
| `dessert` | Dolci |
| `pizza`, `burger`, `sandwich`, `sushi` | Standalone |
| `cocktail`, `wine`, `beer`, `coffee`, `tea` | Bevande |

### Pattern INSERT Corretto

```sql
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, ...)
SELECT 'german', 'standalone', 'food', 'second_course', ...
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'german');
```

**NON usare ON CONFLICT** (product_type non è UNIQUE)

---

## product_ingredients (Junction Table)

```sql
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional)
VALUES ('german', 'GER_SCHNITZEL', 'ING_VEAL', 200, 'g', 'main', false);
```

### Colonne Disponibili

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `product_type` | TEXT | Nome tabella (es. 'german') |
| `product_id` | TEXT | ID prodotto (es. 'GER_SCHNITZEL') |
| `ingredient_id` | TEXT | ID ingrediente (es. 'ING_VEAL') |
| `quantity_amount` | DECIMAL | Quantità (opzionale) |
| `quantity_unit` | TEXT | Unità: 'g', 'ml', 'pieces' |
| `role` | TEXT | Vedi sotto |
| `is_optional` | BOOLEAN | Se opzionale |
| `sort_order` | INTEGER | Ordine visualizzazione |

### Valori `role`

| Valore | Uso |
|--------|-----|
| `main` | Ingrediente principale |
| `secondary` | Ingrediente secondario |
| `seasoning` | Condimenti, spezie |
| `garnish` | Guarnizione |
| `sauce` | Salse |

**Errore comune:** `is_primary` NON ESISTE → usare `role = 'main'`

---

## ingredient_category (ENUM)

Le categorie ingredienti sono ENUM fisso. **Valori validi:**

```
fruits, vegetables, spices, grains, herbs, proteins, dairy, spirits,
liqueurs, pasta, bread, juices, wines, mixers, eggs, rice, beers,
nuts, sweeteners, oils, condiments, legumes, powders, beverages,
dairy_alternatives, syrups, fats, other
```

**Errori comuni:**
- `nuts_seeds` NON ESISTE → usare `nuts`
- `seasonings` NON ESISTE → usare `spices`

---

## Comments

```sql
-- Documentare ogni tabella
COMMENT ON TABLE {table} IS 'GUDBRO {Database} catalog - {N} items, Sistema 5 Dimensioni compliant';

-- Esempio
COMMENT ON TABLE german IS 'GUDBRO German Cuisine catalog - 50 items, Sistema 5 Dimensioni compliant';
```

---

## Functions Security

```sql
-- TUTTE le funzioni devono avere search_path
CREATE OR REPLACE FUNCTION my_function()
RETURNS void
SECURITY DEFINER
SET search_path = public  -- OBBLIGATORIO!
AS $$
...
$$ LANGUAGE plpgsql;
```

---

**File:** `docs/STANDARDS/03-sql-patterns.md`
