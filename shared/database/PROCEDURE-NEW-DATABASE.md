# Procedura: Creare un Nuovo Database Cucina

> **Guida step-by-step per aggiungere una nuova cucina a GUDBRO**
>
> **Version:** 5.0 (2025-12-25) - Workflow Semplificato

---

## Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW NUOVO DATABASE                          │
│                                                                     │
│  1. Ricerca online piatti iconici                                  │
│  2. Creare struttura cartelle                                      │
│  3. Creare types.ts + data files                                   │
│  4. Verificare ingredienti (cache locale)                          │
│  5. Generare script SQL (01, 02, 03, 04)                          │
│  6. Validare script (sintassi, valori)                            │
│  7. Utente esegue in Supabase                                      │
│  8. Aggiornare documentazione                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Checklist Rapida

```
PRIMA DI INIZIARE:
[ ] Leggere questo file (specialmente sezione Product Taxonomy!)
[ ] Consultare database recente come riferimento (nikkei/, texmex/)

WORKFLOW:
[ ] 1. Ricerca online piatti iconici
[ ] 2. Creare struttura cartelle
[ ] 3. Creare types.ts + data files
[ ] 4. Verificare ingredienti nella cache
[ ] 5. Generare script SQL
[ ] 6. Validare script (triple quotes, backslash, valori taxonomy)
[ ] 7. Utente esegue in Supabase (01, 02, 03, 04)
[ ] 8. Aggiornare DATABASE-INVENTORY.md
```

---

## File di Riferimento

| File | Contenuto |
|------|-----------|
| docs/LESSONS-LEARNED.md | Errori e soluzioni |
| DATABASE-STANDARDS.md | Standard e convenzioni |
| ingredients/master-ingredients-cache.ts | Cache ingredienti |

---

## Step 1: Ricerca Online

Query di ricerca:
```
"most famous {cucina} dishes traditional recipes"
"iconic {paese} food tasteatlas"
```

Fonti: TasteAtlas, Serious Eats, Wikipedia

---

## Step 2: Struttura Cartelle

```bash
# Per cucine nazionali/regionali:
mkdir -p shared/database/cuisines/{regione}/{nome}/{data,scripts}

# Regioni disponibili: asian, european, americas, african, oceania, fusion
```

```
shared/database/cuisines/{regione}/{nome}/
├── types.ts
├── data/
│   ├── index.ts
│   └── {categoria}.ts
└── scripts/
    ├── 01-new-ingredients.sql
    ├── 02-create-table.sql
    ├── 03-insert-dishes.sql
    └── 04-product-ingredients.sql
```

**Mapping Regioni:**
| Regione | Cucine |
|---------|--------|
| `asian` | japanese, korean, chinese, thai, vietnamese, indian, filipino, malaysian, indonesian |
| `european` | italian, french, spanish, german, british, polish, portuguese, dutch, swiss, belgian, scandinavian, russian, greek, turkish, lebanese, georgian, armenian |
| `americas` | mexican, brazilian, caribbean, cajun, cuban, colombian, argentinian, chilean, venezuelan, peruvian |
| `african` | moroccan, ethiopian, nigerian, southafrican, senegalese |
| `oceania` | australian, hawaiian |
| `fusion` | nikkei, indochinese, koreanmex, texmex |

---

## Step 3: Types e Data Files

Copiare struttura da database esistente (es: `cuisines/fusion/nikkei/types.ts`).

Campi obbligatori: vedi DATABASE-STANDARDS.md sezione 2.1

---

## Step 4: Verificare Ingredienti

1. Estrarre ingredienti usati:
```bash
grep -hoE "ING_[A-Z_]+" data/*.ts | sort -u
```

2. Verificare nella cache:
```bash
CACHE="shared/database/ingredients/master-ingredients-cache.ts"
grep "'ING_NOME'" "$CACHE"
```

3. Correggere naming comuni:
   - Plurali: `ING_BEANS` → `ING_BEAN`
   - Sinonimi: `ING_RUTABAGA` → `ING_SWEDE`
   - Varianti: `ING_SHIITAKE` → `ING_SHIITAKE_MUSHROOM`

4. Se ingrediente non esiste → aggiungerlo a script 01

---

## Step 5: Generare Script SQL

### Script 01: New Ingredients

Se tutti gli ingredienti esistono:
```sql
-- Nessun nuovo ingrediente necessario
SELECT 'No new ingredients needed' AS status;
```

Se servono nuovi ingredienti:
```sql
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_NOME', 'Nome Ingrediente', 'nome-ingrediente', 'category',
 'Descrizione breve dell''ingrediente',
 '{"calories": 100, "protein": 5, "fat": 2, "carbs": 15, "fiber": 3, "sodium": 10}')
ON CONFLICT (id) DO NOTHING;
```

**Campi OBBLIGATORI per nuovi ingredienti:**
- `id` - ING_NOME_INGREDIENTE (uppercase, underscores)
- `name` - Nome in inglese
- `slug` - nome-ingrediente (lowercase, hyphens)
- `category` - una delle categorie valide
- `description` - descrizione breve
- `nutrition` - JSONB con dati nutrizionali

**Riferimento:** Vedere `nigerian/scripts/01-new-ingredients.sql` come template

### Script 02: Create Table

**CRITICO - Usare questi valori per product_taxonomy:**

> **NOTA:** `product_taxonomy` NON ha un constraint UNIQUE su `product_type`.
> NON usare `ON CONFLICT (product_type)` - fallirà!

```sql
-- Usare INSERT ... WHERE NOT EXISTS (NO ON CONFLICT!)
INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
)
SELECT
  '{nome}',
  '{Nome} Cuisine',
  '{Nome} (Italiano)',
  'standalone',      -- NON 'food'!
  'food',            -- NON 'restaurant' o 'dine-in'!
  'second_course',   -- NON 'asian', 'european', etc.!
  {display_order}
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = '{nome}');
```

### Script 03: Insert Dishes

Convertire data files in INSERT SQL.

### Script 04: Product Ingredients

**CRITICO - Struttura corretta della tabella:**

```sql
DELETE FROM product_ingredients WHERE product_type = '{nome}';

INSERT INTO product_ingredients (
  product_type,      -- '{nome}'
  product_id,        -- 'DISH_ID'
  ingredient_id,     -- 'ING_ID'
  role,              -- 'main' | 'secondary' | 'seasoning' | 'garnish'
  quantity_amount,   -- numero (es: 200)
  quantity_unit,     -- 'g' | 'ml' | 'unit'
  is_optional,       -- true | false
  sort_order         -- 1, 2, 3...
) VALUES
('{nome}', 'DISH_ID', 'ING_ID', 'main', 200, 'g', false, 1),
...
```

**Valori per `role`:**
- `main` - ingrediente principale/pilastro
- `secondary` - ingrediente secondario
- `seasoning` - spezie, sale, condimenti
- `garnish` - guarnizione finale

---

## Step 6: Validare Script

Controlli obbligatori:
```bash
# 1. Triple quotes (devono essere '')
grep -n "'''" scripts/*.sql

# 2. Backslash
grep -n "\\\\" scripts/*.sql

# 3. Valori product_taxonomy corretti
grep -A5 "INSERT INTO product_taxonomy" scripts/02-*.sql
```

---

## Step 7: Eseguire in Supabase

> **L'utente esegue manualmente in Supabase SQL Editor**

Ordine: `01 → 02 → 03 → 04`

Se errore, consultare `docs/LESSONS-LEARNED.md`

---

## Step 8: Aggiornare Documentazione

1. DATABASE-INVENTORY.md - aggiungere entry e aggiornare totali
2. Se nuovi ingredienti → aggiornare cache

---

## Product Taxonomy - Valori Corretti

> **CRITICO:** Questi valori hanno CHECK constraints rigidi.

| Campo | Valori Permessi | Per Cucine Nazionali |
|-------|-----------------|---------------------|
| `menu_type` | `bar_menu`, `cafe_menu`, `traditional_course`, `side_dish`, `standalone` | `standalone` |
| `service_type` | `beverage`, `food` | `food` |
| `category` | `appetizer`, `first_course`, `second_course`, `side`, `dessert`, `pizza`, `burger`, `sandwich`, `sushi`, `cocktail`, `wine`, `beer`, `coffee`, `tea` | `second_course` |

### Errori Frequenti

| Errore | Valore Sbagliato | Valore Corretto |
|--------|------------------|-----------------|
| `menu_type_check` | `food` | `standalone` |
| `service_type_check` | `restaurant`, `dine-in` | `food` |
| `category_check` | `asian`, `european`, `food` | `second_course` |

---

## Regola SINGOLARE per Ingredienti

> **CRITICO:** Tutti gli ID ingredienti usano la forma SINGOLARE in inglese.

```
SBAGLIATO → CORRETTO
ING_RAISINS → ING_RAISIN
ING_CLOVES → ING_CLOVE
ING_BEANS → ING_BEAN
ING_ALMONDS → ING_ALMOND
ING_EGGS → ING_EGG
ING_ONIONS → ING_ONION
ING_TOMATOES → ING_TOMATO
ING_CARROTS → ING_CARROT
```

**Eccezioni note (già plurali nel DB):**
- `ING_CRANBERRIES`, `ING_BREADCRUMBS`, `ING_CHESTNUTS`
- `ING_CHICKEN_WINGS`, `ING_FRENCH_FRIES`

**Verifica obbligatoria:** Prima di usare un ingrediente, cerca nella cache:
```bash
grep "'ING_RAISIN" "$CACHE"  # Singolare
```

---

## Sinonimi Ingredienti Comuni

| Nome Usato | Esiste nel DB come |
|------------|-------------------|
| ING_RUTABAGA | ING_SWEDE |
| ING_SPRING_ONION | ING_SCALLION |
| ING_CORIANDER | ING_CILANTRO |
| ING_AUBERGINE | ING_EGGPLANT |
| ING_COURGETTE | ING_ZUCCHINI |
| ING_PRAWNS | ING_SHRIMP |
| ING_SHIITAKE | ING_SHIITAKE_MUSHROOM |
| ING_ROCOTO | ING_AJI_ROCOTO |
| ING_BEEF_JERKY | ING_CHARQUI |
| ING_CHERIMOYA | ING_CHIRIMOYA |

---

## Categorie Ingredienti Valide

`dairy`, `fats`, `fruits`, `grains`, `herbs`, `legumes`, `nuts`, `other`, `pasta`, `proteins`, `sauces`, `seafood`, `spices`, `spirits`, `sweeteners`, `vegetables`, `vinegars`, `wines`

**NON esistono:** `produce`, `bakery`, `liquids`, `baking`, `alcohol`

---

**File:** `shared/database/PROCEDURE-NEW-DATABASE.md`
**Version:** 6.0 (Nuova struttura cartelle)
**Updated:** 2025-12-28
