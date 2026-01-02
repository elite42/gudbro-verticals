# Checklists & Errori Comuni

> Verifiche obbligatorie e problemi frequenti

---

## Pre-Creazione

- [ ] Letto DATABASE-STANDARDS.md?
- [ ] Consultato DATABASE-INVENTORY.md?
- [ ] Identificato database simile come riferimento?
- [ ] Definiti tutti i category values?
- [ ] Verificato che prefix ID non sia già usato?
- [ ] Accesso a Supabase (MCP o exec_sql)?

---

## Durante Creazione Dati

- [ ] ID format: `PREFIX_NAME` uppercase?
- [ ] Slug format: `lowercase-hyphens`?
- [ ] Name: Title Case in inglese?
- [ ] Description: inglese completa?
- [ ] Popularity: scala 0-100?
- [ ] Spice level: scala 0-5?
- [ ] Tutti i boolean NOT NULL con default?
- [ ] Arrays vuoti come `[]` (no null)?
- [ ] ingredient_ids esistono tutti?
- [ ] allergens lowercase array?
- [ ] Timestamps: TIMESTAMPTZ?

---

## Schema SQL

- [ ] TEXT + CHECK (non ENUM!) per category, style, status?
- [ ] Tutti i campi obbligatori presenti?
- [ ] CHECK constraints su category, status, popularity, spice?
- [ ] NOT NULL DEFAULT su tutti i boolean?
- [ ] GIN indexes per tutti gli array?
- [ ] RLS abilitato?
- [ ] Policy lettura pubblica?
- [ ] Trigger updated_at?
- [ ] COMMENT ON TABLE?

---

## Post-Import

- [ ] Import completato senza errori?
- [ ] Conteggio record corretto?
- [ ] Query test funzionano?
- [ ] product_ingredients links creati?
- [ ] DATABASE-INVENTORY.md aggiornato?
- [ ] BACKLOG.md aggiornato?

---

## Errori Comuni Generali

| Errore | Problema | Soluzione |
|--------|----------|-----------|
| `popularity: 5` | Scala sbagliata | `popularity: 85` (0-100) |
| `is_vegan: null` | Boolean nullable | `is_vegan: false` |
| `tags: null` | Array null | `tags: []` |
| `TIMESTAMP` | No timezone | `TIMESTAMPTZ` |
| No RLS | Security risk | `ENABLE ROW LEVEL SECURITY` |
| No GIN index | Performance | `USING GIN(array_column)` |

---

## Errori product_taxonomy

| Errore | Soluzione |
|--------|-----------|
| `column "table_name" does not exist` | Usare `product_type` |
| `no unique constraint for ON CONFLICT` | Usare `WHERE NOT EXISTS` |
| `violates product_taxonomy_menu_type_check` | Cucine: `menu_type = 'standalone'` |
| `violates product_taxonomy_category_check` | Cucine: `category = 'second_course'` |

---

## Errori product_ingredients

| Errore | Soluzione |
|--------|-----------|
| `column "is_primary" does not exist` | Usare `role = 'main'` |
| `column "display_order" does not exist` | Rimuovere dalla query |

---

## Errori ingredients

| Errore | Soluzione |
|--------|-----------|
| `invalid value for enum: "nuts_seeds"` | Usare `nuts` |
| `invalid value for enum: "seasonings"` | Usare `spices` |
| `null value in column "slug"` | Includere `slug` |

---

## Errori Naming

| Errore | Corretto |
|--------|----------|
| `stk-ribeye` | `STK_RIBEYE` (ID) |
| `STK_RIBEYE` | `stk-ribeye` (slug) |
| `ribeye steak` | `Ribeye Steak` (name) |

---

## Errori Dati

| Errore | Corretto |
|--------|----------|
| `weight_oz: 12` | `weight_g: 340` |
| `spice_level: 3.5` | `spice_level: 3` |
| `calories: 450.5` | `calories_per_serving: 450` |
| `allergens: "gluten,dairy"` | `allergens: ['gluten', 'dairy']` |

---

## Edge Cases

### Prodotti Stagionali
```typescript
{
  status: 'seasonal',
  tags: ['seasonal', 'winter-2024'],
  available_from?: '2024-12-01',
  available_until?: '2025-02-28'
}
```

### Prodotti con Allergeni Variabili
```typescript
{
  allergens: ['gluten'],           // Allergeni certi
  potential_allergens: ['nuts'],   // Cross-contamination
  allergen_notes: 'May contain traces of nuts'
}
```

---

**File:** `docs/STANDARDS/09-checklists.md`
