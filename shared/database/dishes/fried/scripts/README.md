# Fried Foods Database - Import Scripts

## Quick Start

Execute these SQL files **in Supabase SQL Editor** in the following order:

```
01-fried-missing-ingredients.sql  -> Creates ~50 new ingredients
02-fried-complete-import.sql      -> Creates table + inserts 48 dishes
03-fried-product-ingredients.sql  -> Creates junction table links
```

## File Descriptions

### 01-fried-missing-ingredients.sql
- Adds ~50 new ingredients required by fried foods
- Uses `ON CONFLICT DO NOTHING` to safely skip existing ingredients
- Categories: proteins (chicken, pork, seafood), fats/oils, flours, seasonings, sauces, wrappers

### 02-fried-complete-import.sql
- Creates the `fried` table with proper schema
- Inserts all 48 fried food dishes
- Includes indexes, triggers, and RLS policies
- DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)

### 03-fried-product-ingredients.sql
- Creates links in `product_ingredients` junction table
- Marks first ingredient as signature for each dish
- Includes verification queries

## Database Statistics

| Metric | Value |
|--------|-------|
| Total Dishes | 48 |
| Categories | 6 |
| New Ingredients | ~50 |
| Estimated Links | ~400 |

## Categories

| Category | Count | Description |
|----------|-------|-------------|
| fried_chicken | 8 | Wings, nuggets, karaage, fried chicken varieties |
| fried_seafood | 8 | Calamari, fish & chips, shrimp, crab cakes |
| fried_vegetables | 8 | Tempura, onion rings, fried pickles, bhaji |
| fried_appetizers | 8 | Mozzarella sticks, arancini, croquetas, poppers |
| fried_snacks | 8 | French fries, churros, donuts, spring rolls |
| fried_international | 8 | Falafel, samosas, empanadas, tonkatsu, schnitzel |

## Origins Covered

- American / Southern US
- British
- Italian
- Japanese
- Korean
- Chinese
- Spanish
- French
- Indian
- Middle Eastern
- Latin American
- International (multi-origin)

## Verification

After import, verify with:

```sql
SELECT COUNT(*) FROM fried;                                    -- Should be 48
SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'fried';  -- Should be ~400
SELECT category, COUNT(*) FROM fried GROUP BY category;        -- Distribution check
```

## Notes

- All dishes are in English (translations in separate table)
- Uses TEXT + CHECK constraints (no ENUM per v1.1 standards)
- Supports Sistema 5 Dimensioni (allergens, dietary, nutrition, spice)
- Frying methods: deep_fried, pan_fried, double_fried, shallow_fried
- Optional fields: serving_size_g, dipping_sauces, crispy_rating (1-5)
