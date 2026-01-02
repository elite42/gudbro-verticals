# Lessons Learned - Database Creation

> **Mappa Esperienziale organizzata per Contesto Operativo**
>
> Ogni contesto include: Procedura di riferimento + Lezioni (cosa evitare) + Fallback
>
> **Ultimo aggiornamento:** 2025-12-27
> **Versione:** 5.0 (Riorganizzazione contestuale - 50 lezioni da 76 originali)

---

## Navigazione Rapida

| Contesto | Quando Consultare | Lezioni |
|----------|-------------------|---------|
| [1. PRE-WORK](#1-pre-work) | Prima di iniziare qualsiasi lavoro | #1-4 |
| [2. INGREDIENTI](#2-ingredienti) | Verifica, naming, cache, duplicati | #5-14 |
| [3. SCRIPT SQL](#3-script-sql) | Sintassi, escape, formati | #15-19 |
| [4. PRODUCT_TAXONOMY](#4-product_taxonomy) | Template, valori corretti | #20-22 |
| [5. PRODUCT_INGREDIENTS](#5-product_ingredients) | Schema, ruoli, linking | #23-25 |
| [6. VALIDAZIONE](#6-validazione) | Checklist pre-esecuzione | #26-29 |
| [7. POST-ESECUZIONE](#7-post-esecuzione) | Documentazione, sync | #30-32 |
| [8. ESTENSIONE TABELLE](#8-estensione-tabelle) | Modifiche a tabelle esistenti | #33-37 |
| [9. MANUTENZIONE](#9-manutenzione) | Pulizia duplicati, ENUM | #38-41 |
| [10. AI-ASSISTED](#10-ai-assisted) | Workflow con Gemini/ChatGPT | #42-44 |
| [ARCHIVIO](#archivio-cronologia) | Cronologia storica per database | - |

---

## 1. PRE-WORK

> **Quando:** Prima di iniziare qualsiasi lavoro su database
>
> **Procedura:** `PROCEDURE-NEW-DATABASE.md` Step 1-2
>
> **Fallback:** Se non trovi la procedura, copia da database recente (nikkei/, texmex/)

### #1 - SEMPRE leggere documentazione PRIMA di generare codice
```
REGOLA FERREA - Prima di generare QUALSIASI file SQL:
1. Leggere PROCEDURE-NEW-DATABASE.md
2. Leggere DATABASE-STANDARDS.md (Quick Reference)
3. Consultare un database recente come template

MOTIVO: Gli errori piu costosi (tempo + token) derivano dal
        generare file senza conoscere le convenzioni correnti.

ERRORI TIPICI evitabili:
- Script 01=schema invece di 01=missing-ingredients
- Dimenticare campi obbligatori (ingredient_ids, description NOT NULL)
- Inventare strutture invece di copiare pattern esistenti
```

### #2 - Consultare database recente come TEMPLATE
```
Prima di creare un nuovo database:
1. Identificare il database piu simile e recente
2. Leggere TUTTI i suoi file come template
3. Copiare la struttura esatta, poi modificare contenuto

RIFERIMENTI:
- Bevande: smoothies/, softdrinks/, waters/
- Cucine nazionali: nikkei/, texmex/, cajun/
- Food generico: caribbean/, seafood/

MAI inventare strutture - sempre copiare pattern esistenti.
```

### #3 - Checklist struttura completa
```
VERIFICARE di creare TUTTO:

shared/database/{nome}/
├── types.ts                    <- spesso dimenticato!
├── data/                       <- spesso dimenticato!
├── schema/                     <- spesso dimenticato!
└── scripts/
    ├── 01-missing-ingredients.sql
    ├── 02-create-table.sql
    ├── 03-insert-data.sql
    └── 04-product-ingredients.sql

DOPO import, aggiornare:
[ ] DATABASE-INVENTORY.md (entry + totali)
[ ] Cache ingredienti (se nuovi ingredienti)
```

### #4 - Session Resume: MAI assumere lavoro precedente corretto
```
REGOLA: Quando riprendo una sessione interrotta, DEVO:
1. Rileggere PROCEDURE-NEW-DATABASE.md
2. Ri-eseguire Step 6 (validazione script) COMPLETO
3. Verificare TUTTI gli ingredienti estratti dallo script 04
4. Non procedere finche tutti i controlli non passano

PROTOCOLLO SESSION RESUME:
[ ] 1. Leggere PROCEDURE-NEW-DATABASE.md
[ ] 2. Verificare stato attuale dei file creati
[ ] 3. Eseguire validazione script (Step 6):
      - grep "'''" scripts/*.sql (triple quotes)
      - grep "\\\\" scripts/*.sql (backslash)
      - Verificare product_taxonomy valori
[ ] 4. Estrarre TUTTI gli ingredienti da script 04
[ ] 5. Verificare OGNI ingrediente nella cache
[ ] 6. Solo dopo tutti i check -> consegnare all'utente

MOTIVO: Il context precedente potrebbe avere errori non rilevati.
Ri-validare costa poco, correggere dopo costa molto.
```

---

## 2. INGREDIENTI

> **Quando:** Verifica ingredienti, naming, gestione cache
>
> **Procedura:** `PROCEDURE-NEW-DATABASE.md` Step 3-4
>
> **Fallback:** Usare `master-ingredients-cache.ts` come fonte primaria

### #5 - Convenzioni naming ingredienti (SINGOLARE, US English)
```
| Regola | Corretto | Sbagliato |
|--------|----------|-----------|
| US English | ING_SCALLION | ING_SPRING_ONION |
| SEMPRE singolare | ING_EGG, ING_CLOVE | ING_EGGS, ING_CLOVES |
| Nome completo funghi | ING_SHIITAKE_MUSHROOM | ING_SHIITAKE |
| Aggettivo dopo nome | ING_RUM_LIGHT | ING_LIGHT_RUM |

Pattern SINGOLARE frequenti:
| Corretto | Sbagliato |
|----------|-----------|
| ING_MUSHROOM | ING_MUSHROOMS |
| ING_OLIVE | ING_OLIVES |
| ING_ANCHOVY | ING_ANCHOVIES |
| ING_RAISIN | ING_RAISINS |

Eccezioni (gia plurali nel DB): ING_FRENCH_FRIES, ING_BAKED_BEANS
```

### #6 - Categorie ingredienti valide (ENUM)
```
CATEGORIE VALIDE:
fruits | vegetables | spices | grains | herbs | proteins | dairy | spirits
liqueurs | pasta | bread | juices | wines | mixers | eggs | rice | beers
nuts | sweeteners | oils | fats | condiments | legumes | powders | beverages
cheese | seafood | tea | sauces | supplements | other

DISTINZIONE IMPORTANTE:
- oils = liquidi a temperatura ambiente (olive oil, vegetable oil)
- fats = solidi a temperatura ambiente (duck fat, lard, bacon fat)

NON esistono: stocks, alcohol, sweets, produce, baking, liquids
```

### #7 - Mai assumere naming - SEMPRE verificare nella cache
```
ASSUNZIONI ERRATE COMUNI:
| Assunto | Realta DB |
|---------|-----------|
| ING_GREEN_TEA | ING_TEA_GREEN |
| ING_ROOIBOS_TEA | ING_ROOIBOS |
| ING_BLACK_PEPPER | ING_PEPPER_BLACK |
| ING_SPRING_ONION | ING_SCALLION |
| ING_LIGHT_RUM | ING_RUM_LIGHT |

PATTERN NAMING:
- Te: ING_TEA_{tipo} (non ING_{tipo}_TEA)
- Rum: ING_RUM_{tipo} (non ING_{tipo}_RUM)
- Spezie: verificare sempre con grep

SOLUZIONE - Cercare sinonimi:
grep -i "scallion\|spring.onion" master-ingredients-cache.ts
grep -i "swede\|rutabaga" master-ingredients-cache.ts
```

### #8 - Cache locale FIRST, API solo per mancanti
```
REGOLA FERREA:
Per verificare ingredienti, usare SEMPRE la cache locale come PRIMA fonte.
Le chiamate API sono LENTE e consumano risorse.

ORDINE DI VERIFICA:
1. Leggere master-ingredients-cache.ts (veloce, locale)
2. Cross-check ingredienti usati vs cache
3. SOLO per ingredienti non trovati -> query API singola batch

WORKFLOW CORRETTO:
# 1. Estrarre ingredienti usati
grep -oE "ING_[A-Z_]+" data/*.ts | sort -u > /tmp/used.txt

# 2. Estrarre ingredienti in cache locale
grep -oE "'ING_[A-Z_]+'" master-ingredients-cache.ts | tr -d "'" | sort -u > /tmp/cached.txt

# 3. Trovare mancanti dalla cache
comm -23 /tmp/used.txt /tmp/cached.txt > /tmp/to_verify.txt

# 4. SOLO ORA verificare i mancanti via API (batch singolo)
```

### #9 - Campi obbligatori nuovi ingredienti
```
TEMPLATE CORRETTO per script 01-missing-ingredients.sql:

INSERT INTO ingredients (id, slug, name, category, description, allergens, dietary, nutrition)
VALUES
  ('ING_EXAMPLE', 'example', 'Example Name', 'vegetables',
   'Description of the ingredient',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true}'::jsonb,
   '{"calories": 100, "protein": 2.0, "carbohydrates": 15.0, "fat": 0.5}'::jsonb)
ON CONFLICT DO NOTHING;

CAMPI OBBLIGATORI:
- id (PK)
- slug (UNIQUE, NOT NULL) <- SPESSO DIMENTICATO!
- name
- category (vedi #6)
- description <- SPESSO DIMENTICATO!
- allergens (JSONB)
- dietary (JSONB)
- nutrition (JSONB) - opzionale ma raccomandato
```

### #10 - Verificare slug collision PRIMA di creare ingredienti
```
PROBLEMA:
ID diverso + slug uguale = ERRORE DB
ING_CHARD != ING_SWISS_CHARD (ID diversi, sembra OK)
swiss-chard = swiss-chard (slug uguali, COLLISION!)

SOLUZIONE:
# Verifica per ID
grep "id: 'ING_CHARD'" master-ingredients-cache.ts

# Verifica per SLUG (CRITICO!)
grep "slug: 'swiss-chard'" master-ingredients-cache.ts
grep "slug: 'chard'" master-ingredients-cache.ts

# Se slug esiste -> usare ingrediente esistente, NON crearne uno nuovo
```

### #11 - Verificare ingredienti PRIMA di script 04
```
PROCEDURA OBBLIGATORIA prima di eseguire 04-product-ingredients.sql:

# 1. Estrarre ING_* usati in script 04
grep -oE "'ING_[A-Z_]+'" 04-product-ingredients.sql | tr -d "'" | sort -u > /tmp/used.txt

# 2. Estrarre ING_* definiti in script 01
grep -oE "'ING_[A-Z_]+'" 01-missing-ingredients.sql | tr -d "'" | sort -u > /tmp/new.txt

# 3. Estrarre ingredienti in cache
grep -oE "'ING_[A-Z_]+'" ../ingredients/master-ingredients-cache.ts | tr -d "'" | sort -u > /tmp/cached.txt

# 4. Combinare script01 + cache
cat /tmp/new.txt /tmp/cached.txt | sort -u > /tmp/available.txt

# 5. Trovare mancanti
comm -23 /tmp/used.txt /tmp/available.txt

# Se output non vuoto -> ERRORE GARANTITO!
# Aggiungere mancanti a script 01 PRIMA di eseguire script 04
```

### #12 - ON CONFLICT DO NOTHING (senza specificare colonna)
```sql
-- CORRETTO - gestisce sia id che slug
INSERT INTO ingredients (...) VALUES (...)
ON CONFLICT DO NOTHING;

-- INCOMPLETO - non gestisce slug duplicati
ON CONFLICT (id) DO NOTHING;
```

### #13 - Sincronizzare cache DOPO ogni import ingredienti
```
REGOLA: Dopo OGNI esecuzione di script con nuovi ingredienti:

1. Fetch tutti gli ingredienti da Supabase
2. Rigenerare master-ingredients-cache.ts
3. Verificare count corrisponde

CONSEGUENZE se non sincronizzi:
- Cache obsoleta -> ingredienti "mancanti" che in realta esistono
- Possibili INSERT duplicati
- Script 01 con ingredienti gia presenti
```

### #14 - Cercare sinonimi per ingredienti regionali
```
PRIMA di creare ingrediente regionale, cercare sinonimi:

SINONIMI COMUNI:
| Regionale | Esistente |
|-----------|-----------|
| rutabaga | ING_SWEDE |
| spring onion | ING_SCALLION |
| coriander leaf | ING_CILANTRO |
| aubergine | ING_EGGPLANT |
| courgette | ING_ZUCCHINI |
```

---

## 3. SCRIPT SQL

> **Quando:** Scrittura e validazione script SQL
>
> **Procedura:** `docs/TEMPLATES/` per copia-incolla
>
> **Fallback:** Copiare da database recente funzionante

### #15 - Schema ingredienti usa JSONB (non campi singoli)
```sql
-- SBAGLIATO (schema vecchio)
INSERT INTO ingredients (id, slug, name, is_vegan, is_dairy_free, ...)

-- CORRETTO (schema attuale)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
VALUES ('ING_EXAMPLE', 'example', 'Example', 'spices',
        '[]'::jsonb,
        '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

CAMPI CHE NON ESISTONO:
- is_vegan, is_vegetarian, is_gluten_free, is_dairy_free, is_halal, is_kosher
```

### #16 - Usare TEXT + CHECK, mai ENUM per nuove colonne
```sql
-- CORRETTO
category TEXT NOT NULL CHECK (category IN ('value1', 'value2'))

-- SBAGLIATO
category category_enum NOT NULL
```

### #17 - Triple quotes SQL escape error
```
PROBLEMA:
Nel TypeScript: Malaysia\'s (escape corretto per JS)
Conversione errata a SQL: Malaysia'''s invece di Malaysia''s
Triple quote ''' non e valido in SQL

FIX:
- In SQL, apostrofo dentro stringa = '' (doppio apice)
- Verificare SEMPRE la conversione JS escape -> SQL escape

REGEX per trovare triple quotes:
grep -n "'''" *.sql
```

### #18 - Esecuzione sequenziale degli script
```
Eseguire file in ordine numerico (01, 02, 03, 04) permette:
- Identificare errore esatto
- Debugging incrementale
- Rollback parziale

MAI usare file combinato in produzione.
```

### #19 - MAI tentare inserimento automatico script SQL
```
REGOLA FERREA:
GLI SCRIPT SQL VANNO ESEGUITI DALL'UTENTE IN SUPABASE SQL EDITOR.

Claude deve SOLO:
1. Generare gli script SQL
2. Validarli localmente
3. ASPETTARE che l'utente li esegua manualmente
4. MAI usare curl/REST API per INSERT massivi

PER OPERAZIONI BULK (>10 record):
- SBAGLIATO: Claude esegue N chiamate REST API
- CORRETTO: Claude genera 1 script SQL -> utente esegue in Supabase
```

---

## 4. PRODUCT_TAXONOMY

> **Quando:** Creazione/modifica product_taxonomy
>
> **Procedura:** `docs/TEMPLATES/01-product-taxonomy-cuisine.sql`
>
> **Fallback:** Copiare valori esatti dalla lezione #20

### #20 - Template DEFINITIVO per cucine nazionali
```sql
-- SEMPRE WHERE NOT EXISTS (MAI ON CONFLICT - non esiste UNIQUE!)

INSERT INTO product_taxonomy (
  product_type, display_name_en, display_name_it,
  menu_type, service_type, category, display_order
)
SELECT
  '{cuisine}', '{Cuisine} Cuisine', 'Cucina {Italiana}',
  'standalone',      -- NON 'food'!
  'food',            -- NON 'dine-in', 'restaurant'!
  'second_course',   -- NON 'asian', 'european', 'cuisines'!
  {display_order}    -- Prossimo numero disponibile
WHERE NOT EXISTS (
  SELECT 1 FROM product_taxonomy WHERE product_type = '{cuisine}'
);
```

### #21 - Valori CORRETTI per cucine etniche
```
| Campo | Valore CORRETTO | NON usare |
|-------|-----------------|-----------|
| menu_type | 'standalone' | 'food', 'ethnic_cuisine', 'restaurant_menu' |
| service_type | 'food' | 'dine-in', 'restaurant', 'dine_in' |
| category | 'second_course' | 'asian', 'european', 'cuisines', 'cuisine' |

VALORI menu_type validi:
bar_menu, cafe_menu, traditional_course, side_dish, standalone

VALORI category validi:
appetizer, first_course, second_course, side, dessert, pizza, burger,
sandwich, sushi, cocktail, wine, beer, coffee, tea
```

### #22 - ON CONFLICT NON funziona per product_taxonomy
```sql
-- SBAGLIATO - product_type non ha UNIQUE constraint
INSERT INTO product_taxonomy (...) VALUES (...)
ON CONFLICT (product_type) DO UPDATE SET ...;

-- CORRETTO - Opzione 1: DELETE + INSERT
DELETE FROM product_taxonomy WHERE product_type = '{cuisine}';
INSERT INTO product_taxonomy (...) VALUES (...);

-- CORRETTO - Opzione 2: WHERE NOT EXISTS (piu elegante)
INSERT INTO product_taxonomy (...)
SELECT ...
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = '{cuisine}');
```

---

## 5. PRODUCT_INGREDIENTS

> **Quando:** Creazione script 04-product-ingredients
>
> **Procedura:** `docs/TEMPLATES/04-product-ingredients.sql`
>
> **Fallback:** Verificare schema reale con query

### #23 - Schema COMPLETO product_ingredients
```sql
INSERT INTO product_ingredients (
  product_type,      -- nome tabella (es: 'cajun')
  product_id,        -- ID del piatto (es: 'CAJ_GUMBO')
  ingredient_id,     -- ID ingrediente (es: 'ING_OKRA')
  role,              -- 'main' | 'secondary' | 'seasoning' | 'garnish'
  quantity_amount,   -- numero (es: 200)
  quantity_unit,     -- 'g' | 'ml' | 'unit'
  is_optional,       -- true | false
  sort_order         -- 1, 2, 3...
) VALUES
('cajun', 'CAJ_GUMBO', 'ING_OKRA', 'main', 200, 'g', false, 1);
```

### #24 - Colonne CORRETTE (non inventare!)
```
| Corretto | Sbagliato (non esiste) |
|----------|------------------------|
| product_type | product_table |
| role | is_primary, is_essential, is_pilar |
| is_optional | is_garnish |
| sort_order | display_order |
| quantity_amount + quantity_unit | quantity (stringa singola) |

Valori role: 'main', 'secondary', 'garnish', 'seasoning'
```

### #25 - NON usare ON CONFLICT se fai DELETE prima
```sql
-- Lo script gia elimina i record esistenti:
DELETE FROM product_ingredients WHERE product_type = 'cajun';

-- Quindi NON serve ON CONFLICT
INSERT INTO product_ingredients (...) VALUES (...);
```

---

## 6. VALIDAZIONE

> **Quando:** Prima di consegnare script all'utente
>
> **Procedura:** `PROCEDURE-NEW-DATABASE.md` Step 6
>
> **Fallback:** Eseguire tutti i check manualmente

### #26 - PRE-FLIGHT CHECKS obbligatori
```
Prima di ogni import:
1. Query schema tabelle esistenti
2. Query valori CHECK constraints
3. Verificare ingredienti (vedi #11)
4. Verificare naming convention (vedi #7)
5. Validare escape caratteri (vedi #27)
```

### #27 - Validazione escape pre-Supabase
```bash
# Check 1: Triple quotes (ERRORE)
grep -n "'''" scripts/*.sql && echo "ERRORE: Triple quotes trovate!"

# Check 2: Backslash escape (ERRORE - non valido in SQL)
grep -n "\\\\'" scripts/*.sql && echo "ERRORE: Backslash escape trovato!"

# Check 3: Doppio quote corretto (OK)
grep -n "''" scripts/*.sql | head -5 && echo "OK: Escape corretti"
```

### #28 - Verificare CHECK del proprio schema prima di generare dati
```
PROBLEMA:
Lo schema definiva cooking_method e protein_type con valori limitati,
ma i data files usavano valori non inclusi.

SOLUZIONE:
Prima di eseguire script 03-data.sql:
1. Estrarre TUTTI i valori usati nei data files:
   grep -oh "cooking_method: '[^']*'" data/*.ts | sort -u
   grep -oh "protein_type: '[^']*'" data/*.ts | sort -u
   grep -oh "status: '[^']*'" data/*.ts | sort -u

2. Confrontare con valori nel CHECK constraint dello schema
3. Aggiornare schema OPPURE data files prima di eseguire
```

### #29 - Checklist pre-import NUOVA TABELLA
```
PRIMA di eseguire script per NUOVA tabella:

[ ] 1. Schema CHECK constraints coprono TUTTI i valori usati nei data files?
[ ] 2. Script ingredienti include campo 'slug'?
[ ] 3. Ingredienti esistono nel DB REALE (non solo cache)?
[ ] 4. Cache locale sincronizzata di recente?
[ ] 5. Escape caratteri validati (no triple quotes, no backslash)?
```

---

## 7. POST-ESECUZIONE

> **Quando:** Dopo che l'utente ha eseguito gli script
>
> **Procedura:** `PROCEDURE-NEW-DATABASE.md` Step 8
>
> **Fallback:** Aggiornare almeno DATABASE-INVENTORY.md

### #30 - Aggiornare DATABASE-INVENTORY.md IMMEDIATAMENTE
```
REGOLA FERREA:
- Appena un database e importato e validato -> aggiorna INVENTORY
- NON aspettare fine sessione
- NON assumere che "lo faro dopo"

Checklist:
[ ] Aggiungere entry nella sezione corretta
[ ] Aggiornare statistiche totali (databases, products, ingredients)
[ ] Aggiornare "Last Updated"
[ ] Aggiungere riga nel Changelog
```

### #31 - Sincronizzare cache ingredienti dopo import
```
DOPO ogni database con nuovi ingredienti:
1. Fetch TUTTI gli ingredienti da Supabase (con paginazione)
2. Rigenerare master-ingredients-cache.ts
3. Verificare count corrisponde

Se non sincronizzi, prossimo database potrebbe creare duplicati.
```

### #32 - Documentazione DRY e Single Source of Truth
```
STRUTTURA DOCUMENTAZIONE:
shared/database/
├── PROCEDURE-NEW-DATABASE.md  # Procedura snella
├── DATABASE-STANDARDS.md      # Quick Reference
└── docs/
    ├── STANDARDS/             # File dettagliati
    ├── TEMPLATES/             # SQL copia-incolla
    ├── LESSONS-LEARNED.md     # Errori (UNICO posto)
    └── archive/               # File obsoleti

PRINCIPI:
- DRY: Don't Repeat Yourself
- Single Source of Truth: una sola fonte per ogni informazione
```

---

## 8. ESTENSIONE TABELLE

> **Quando:** Aggiunta record a tabelle esistenti
>
> **Procedura:** Query per vedere struttura PRIMA di scrivere
>
> **Fallback:** Consultare record esistente come template

### #33 - Preferire estensione a nuova tabella
```
Quando aggiungere prodotti correlati (es. Asian Spirits -> Spirits):
- PREFERIRE: Aggiungere alla tabella esistente se lo schema e compatibile
- EVITARE: Creare nuova tabella separata

Vantaggi:
- Schema gia testato
- Query unificate
- Meno manutenzione
```

### #34 - SEMPRE verificare schema e constraint PRIMA
```bash
# PROCEDURA OBBLIGATORIA prima di aggiungere record a tabella esistente:

# 1. Query per vedere UN record completo (struttura reale)
curl -s "$URL/tablename?limit=1" -H "apikey: $KEY"

# 2. Query per vedere TUTTI i valori usati per ogni colonna con CHECK
curl -s "$URL/tablename?select=category&limit=100" -H "apikey: $KEY"
curl -s "$URL/tablename?select=status&limit=100" -H "apikey: $KEY"
# ... ripetere per ogni colonna TEXT che potrebbe avere CHECK

# SOLO DOPO aver verificato tutti i valori validi, scrivere lo script INSERT
```

### #35 - Checklist pre-scrittura script espansione
```
PRIMA di scrivere INSERT per tabella esistente, verificare:

[ ] 1. Struttura tabella (colonne reali, non assunte)
[ ] 2. Valori CHECK per: category, status, style, type, grade, cut, etc.
[ ] 3. Colonne nullable vs NOT NULL
[ ] 4. Nomi colonne esatti (singolare vs plurale: cooking_method vs cooking_methods)
[ ] 5. Tipi dati (TEXT vs TEXT[], INTEGER vs DECIMAL)
[ ] 6. Valori esistenti per ispezionare pattern naming

ERRORI TIPICI EVITABILI:
| Assunto | Realta |
|---------|--------|
| cooking_methods (array) | cooking_method (singolare) |
| style: 'argentine' | style: 'argentinian' |
| category: 'offal' | category: 'mixed_grill' |
```

### #36 - CHECK constraint non modificabili via REST API
```
PROBLEMA: Supabase REST API (PostgREST) NON supporta DDL operations

SOLUZIONE: Per modificare CHECK constraints:
1. Creare script SQL separato
2. Eseguire manualmente nel Supabase SQL Editor
3. Poi eseguire script dati
```

### #37 - Pattern per aggiungere valori a CHECK constraint
```sql
-- 1. Drop constraint esistente
ALTER TABLE tablename DROP CONSTRAINT IF EXISTS tablename_column_check;

-- 2. Ricreare con TUTTI i valori (vecchi + nuovi)
ALTER TABLE tablename ADD CONSTRAINT tablename_column_check
CHECK (column IN ('old_value1', 'old_value2', 'new_value1', 'new_value2'));

-- IMPORTANTE: Includere TUTTI i valori, non solo i nuovi!
```

---

## 9. MANUTENZIONE

> **Quando:** Pulizia duplicati, modifiche ENUM, manutenzione
>
> **Procedura:** Sempre in transaction con COMMIT finale
>
> **Fallback:** Backup prima di qualsiasi DELETE

### #38 - Script analisi duplicati
```sql
-- Trova duplicati plurale/singolare
SELECT i1.id as singular, i2.id as plural
FROM ingredients i1
JOIN ingredients i2 ON i2.id = i1.id || 'S'

-- Verifica usage prima di eliminare
SELECT ingredient_id, COUNT(*)
FROM product_ingredients
WHERE ingredient_id IN ('ING_CLOVES', 'ING_CLOVE')
GROUP BY ingredient_id
```

### #39 - Migrazione sicura link duplicati
```sql
-- SEMPRE in transaction
BEGIN;

-- 1. UPDATE: migra link (solo se non esiste gia)
UPDATE product_ingredients
SET ingredient_id = 'ING_SINGULAR'
WHERE ingredient_id = 'ING_PLURAL'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_SINGULAR'
  );

-- 2. DELETE: rimuovi residui e ingrediente
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_PLURAL';
DELETE FROM ingredients WHERE id = 'ING_PLURAL';

-- 3. VERIFY: controlla orphan links
SELECT COUNT(*) FROM product_ingredients pi
WHERE NOT EXISTS (SELECT 1 FROM ingredients i WHERE i.id = pi.ingredient_id);

COMMIT;
```

### #40 - Aggiornare cache locale dopo cleanup
```bash
# Dopo pulizia duplicati nel DB:
sed -i '' "/'ING_PLURAL'/d" master-ingredients-cache.ts
# Poi sincronizzare cache completa
```

### #41 - ENUM: nuovo valore richiede commit separato
```sql
-- PostgreSQL LIMITATION: new ENUM values must be committed before use

-- NON FUNZIONA (stesso script)
ALTER TYPE ingredient_category ADD VALUE 'fats';
UPDATE ingredients SET category = 'fats' WHERE ...;  -- ERRORE!

-- SOLUZIONE: Due script separati
-- Script 00a:
ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'fats';

-- Script 00b (eseguire DOPO):
UPDATE ingredients SET category = 'fats' WHERE ...;
```

---

## 10. AI-ASSISTED

> **Quando:** Workflow che coinvolgono Gemini/ChatGPT
>
> **Procedura:** Batch da 25 ingredienti con prompt strutturato
>
> **Fallback:** Ricerca manuale dati nutrizionali

### #42 - Nuovi ingredienti con campo nutrition
```
REGOLA:
Ogni NUOVO ingrediente aggiunto dovrebbe includere il campo 'nutrition'.

STRUTTURA JSONB (per 100g):
{
  "calories": 250,        // kcal (intero)
  "protein": 5.0,         // g (1 decimale)
  "carbohydrates": 20.0,  // g (1 decimale)
  "fat": 2.0,             // g (1 decimale)
  "fiber": 3.0,           // g (1 decimale)
  "sugar": 1.0,           // g (1 decimale)
  "sodium": 150           // mg (intero)
}
```

### #43 - Workflow nutrition con Gemini/ChatGPT
```
WORKFLOW TESTATO (Dic 2025):

1. Claude Code estrae ingredienti senza nutrition dal DB
2. Genera batch da 25 ingredienti con prompt strutturato
3. Utente passa batch a Gemini/ChatGPT (parallelizzabile)
4. AI restituisce JSON con dati nutrizionali
5. Utente salva JSON in nutrition-results/
6. Claude Code valida e genera script SQL UPDATE
7. Utente esegue script in Supabase

PROMPT TEMPLATE:
"""
Cerca i dati nutrizionali per 100g di ciascun ingrediente.

FORMATO OUTPUT (JSON valido):
{
  "ING_EXAMPLE": {
    "calories": 100,
    "protein": 5.0,
    "carbohydrates": 20.0,
    "fat": 2.0
  }
}

INGREDIENTI:
- ING_NAME: Display Name
...
"""
```

### #44 - Delegare ricerca dati a AI specializzate
```
VANTAGGI:
| Aspetto | Beneficio |
|---------|-----------|
| Velocita | Parallelismo su piu AI |
| Costi | Meno token Claude per ricerche |
| Qualita | Claude si concentra su validazione/SQL |
| Scalabilita | Stesso workflow per future espansioni |
```

---

## ARCHIVIO: Cronologia

### Audit per Database

| Database | Data | Efficienza | Errori | Lezioni |
|----------|------|------------|--------|---------|
| Cajun/Creole | 2025-12-27 | ~75% | 3 | #4, #7, #20 |
| Australian | 2025-12-27 | ~90% | 1 | - |
| South African | 2025-12-27 | ~90% | 1 | #22 |
| Senegalese | 2025-12-27 | ~85% | 1 | #9 |
| Cheese Expansion | 2025-12-27 | ~50% | 1 | #19 |
| Chilean | 2025-12-26 | ~90% | 4 | #23, #5 |
| Tex-Mex | 2025-12-25 | ~80% | 3 | #20 |
| Malaysian | 2025-12-25 | ~70% | 4 | #17, #19 |
| Indonesian | 2025-12-25 | ~75% | 3 | #20-22 |
| Swiss | 2025-12-25 | ~85% | 2 | #10 |
| Scandinavian | 2025-12-24 | ~25% | 7 | #8, #6, #14 |
| British | 2025-12-23 | ~70% | 5 | #8, #23, #6 |
| Italian | 2025-12-23 | ~75% | 4 | #8, #10, #28 |
| Steakhouse | 2025-12-21 | ~40% | 9 | #34, #35 |
| French | 2025-12-21 | ~80% | 3 | #41, #23 |
| Spanish | 2025-12-21 | ~85% | 2 | #5 |

### Cronologia Lezioni per Categoria

| Database | Data | Categoria Principale |
|----------|------|---------------------|
| Cajun | 2025-12-27 | Session Resume, Product Taxonomy |
| Korean | 2025-12-19 | Schema JSONB, product_taxonomy |
| Vietnamese | 2025-12-19 | PRE-FLIGHT CHECKS, id+slug |
| Peruvian | 2025-12-20 | Consultare procedure |
| Soft Drinks | 2025-12-20 | ON CONFLICT con DELETE |
| Caribbean | 2025-12-20 | product_taxonomy pattern |
| Asian Spirits | 2025-12-20 | CHECK constraint via SQL Editor |
| Mexican | 2025-12-20 | Pulizia duplicati ingredienti |
| Smoothies | 2025-12-21 | Leggere procedure PRIMA |
| Milkshakes | 2025-12-21 | Verifica ingredienti pre-exec |
| Hot Beverages | 2025-12-21 | Naming convention (ING_TEA_GREEN) |

---

## Legenda Mappatura Lezioni

> Questa sezione documenta come le 76 lezioni originali sono state consolidate in 44 lezioni.

### Lezioni Unificate

| Nuova | Originali Unificate | Concetto |
|-------|---------------------|----------|
| #4 | #75, #76 | Session Resume Protocol |
| #5 | #8, #72 | Naming singolare US English |
| #6 | #7, #50, #59 | Categorie ingredienti valide |
| #7 | #21, #60 | Naming e sinonimi |
| #8 | #47, #55 | Cache locale FIRST |
| #9 | #22, #43, #74 | Campi obbligatori ingredienti |
| #11 | #25, #26, #58 | Verifica ingredienti pre-script04 |
| #13 | #23, #48, #57 | Sync cache dopo import |
| #15 | #4, #56 | Schema JSONB ingredienti |
| #19 | #67, #69, #73 | Script SQL, non REST API |
| #20 | #11, #52, #63, #64, #65, #70 | Template product_taxonomy |
| #22 | #10, #62 | WHERE NOT EXISTS per taxonomy |
| #23 | #14, #15, #49, #71 | Schema product_ingredients |
| #26 | #27, #38 | PRE-FLIGHT checks |
| #29 | #39, #44 | Checklist pre-import |
| #34 | #37, #40 | Verificare schema e CHECK |

### Lezioni Archiviate (Contesto Storico)

Le seguenti lezioni sono state incorporate nella cronologia ma non sono piu regole attive separate:
- #51 (Workflow nutrition) -> integrato in #43
- #32 (Liquori vs Spirits) -> caso specifico, in archivio
- #53, #54 (Riorganizzazione docs) -> completata, in archivio

---

**File:** `shared/database/docs/LESSONS-LEARNED.md`
**Created:** 2025-12-20
**Updated:** 2025-12-27
**Versione:** 5.0 (Riorganizzazione contestuale)
**Lezioni totali:** 44 (da 76 originali, -42%)
