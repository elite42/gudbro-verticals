# Database Hygiene & Maintenance

> Un database ordinato facilita audit, debugging e onboarding di nuovi sviluppatori.

---

## Principi Fondamentali

| Principio | Descrizione |
|-----------|-------------|
| **Consistenza** | Stesse convenzioni di naming in tutto il database |
| **Minimalismo** | Nessun duplicato, nessuna ridondanza inutile |
| **Documentazione** | Ogni tabella/funzione ha uno scopo chiaro e documentato |
| **Auditabilità** | Struttura chiara per facilitare security audit |

---

## Policy Standards (RLS)

Ogni tabella food/bevande DEVE avere esattamente **2 policies**:

```sql
-- Policy 1: Lettura pubblica
CREATE POLICY "Public read access" ON {table}
  FOR SELECT USING (true);

-- Policy 2: Scrittura service role
CREATE POLICY "Service write access" ON {table}
  FOR ALL USING (auth.role() = 'service_role');
```

**Naming policy:** Sempre `"Public read access"` e `"Service write access"` (senza suffisso tabella).

---

## Function Standards

Ogni trigger function DEVE avere:

```sql
CREATE OR REPLACE FUNCTION update_{table}_updated_at()
RETURNS TRIGGER
SECURITY DEFINER          -- Obbligatorio
SET search_path = public  -- Obbligatorio per sicurezza
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Pulizia Periodica

Checklist da eseguire periodicamente:

```
[ ] Verificare RLS abilitato su tutte le tabelle
[ ] Verificare 2 policies per tabella (no duplicati)
[ ] Verificare search_path su tutte le functions
[ ] Rimuovere tabelle/funzioni non utilizzate
[ ] Verificare indexes necessari presenti
[ ] Aggiornare DATABASE-INVENTORY.md
```

---

## Comandi di Verifica

### Verifica RLS

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

### Conta Policies per Tabella

```sql
-- Deve essere 2 per ogni tabella
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
HAVING COUNT(*) != 2;
```

### Verifica Functions con search_path

```sql
SELECT proname, prosecdef, proconfig
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname LIKE 'update_%';
```

### Trova Tabelle senza RLS

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = false
AND tablename NOT LIKE 'pg_%';
```

### Trova Indexes Mancanti

```sql
-- Tabelle senza index su category
SELECT tablename
FROM pg_tables t
WHERE schemaname = 'public'
AND NOT EXISTS (
  SELECT 1 FROM pg_indexes i
  WHERE i.tablename = t.tablename
  AND i.indexname LIKE '%category%'
);
```

---

## Versionamento & Migrazioni

### Schema Migrations

```
shared/database/migrations/
├── 001_create_steaks_table.sql
├── 002_add_steaks_indexes.sql
├── 003_enable_steaks_rls.sql
└── ...
```

**Naming:** `{NNN}_{action}_{table}.sql`

### Data Migrations

Per modifiche massive ai dati:

```sql
-- Esempio: correggere popularity scale
UPDATE steaks
SET popularity = popularity * 20
WHERE popularity <= 5;
```

### Changelog Format

```markdown
## Changelog

### v1.0 (2025-12-17)
- Versione definitiva dopo review
- Decisioni architetturali confermate
```

---

## Edge Cases

### Prodotti Stagionali

```typescript
{
  status: 'seasonal',
  tags: ['seasonal', 'winter-2024', 'limited-edition'],
  available_from?: '2024-12-01',
  available_until?: '2025-02-28'
}
```

### Varianti di Prodotto

```typescript
{
  id: 'PIZ_MARGHERITA',
  variants: [
    { size: 'small', price_modifier: 0 },
    { size: 'large', price_modifier: 5 }
  ]
}
```

O tabella separata `product_variants`.

### Combo/Bundle

```typescript
{
  id: 'CMB_LUNCH_SPECIAL',
  category: 'combo',
  includes_products: ['SND_BLT', 'SOP_TOMATO', 'COF_ESPRESSO'],
  combo_discount_percent: 15
}
```

### Prodotti Personalizzabili

```typescript
{
  id: 'BRG_BUILD_YOUR_OWN',
  is_customizable: true,
  base_ingredient_ids: ['ING_BUN', 'ING_BEEF_PATTY'],
  optional_ingredient_ids: ['ING_CHEESE', 'ING_BACON'],
  max_toppings: 5
}
```

### Prodotti con Allergeni Variabili

```typescript
{
  allergens: ['gluten'],              // Allergeni certi
  potential_allergens: ['nuts'],      // Cross-contamination
  allergen_notes: 'May contain traces of nuts'
}
```

---

## Database di Riferimento

### Per Food
- **japanese** - Pattern più recente (100 items)
- **appetizers** - Pattern con origin (51 items)
- **pasta** - Pattern classico (87 items)

### Per Bevande
- **coffee** - Pattern con customization (76 items)
- **tea** - Pattern con bubble tea (62 items)
- **cocktails** - Pattern con IBA categories (227 items)

---

**File:** `docs/STANDARDS/11-database-hygiene.md`
