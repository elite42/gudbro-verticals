# Vegetarian Database - Import Scripts

## Quick Start

Execute these SQL files **in Supabase SQL Editor** in the following order:

```
01-vegetarian-missing-ingredients.sql  → Creates ~86 new ingredients
02-vegetarian-complete-import.sql      → Creates table + inserts 65 dishes
03-vegetarian-product-ingredients.sql  → Creates junction table links
```

## File Descriptions

### 01-vegetarian-missing-ingredients.sql
- Adds ~86 new ingredients required by vegetarian dishes
- Uses `ON CONFLICT DO NOTHING` to safely skip existing ingredients
- Categories: vegetables, fruits, grains, legumes, proteins, dairy, herbs, spices, sauces

### 02-vegetarian-complete-import.sql
- Creates the `vegetarian` table with proper schema
- Inserts all 65 vegetarian dishes
- Includes indexes, triggers, and RLS policies
- DATABASE-STANDARDS v1.1 compliant

### 03-vegetarian-product-ingredients.sql
- Creates links in `product_ingredients` junction table
- Marks first ingredient as signature for each dish
- Includes verification queries

## Database Statistics

| Metric | Value |
|--------|-------|
| Total Dishes | 65 |
| Categories | 9 |
| New Ingredients | ~86 |
| Estimated Links | ~450 |

## Categories

| Category | Count | Description |
|----------|-------|-------------|
| tofu_dishes | 8 | Tofu-based main dishes |
| tempeh_dishes | 4 | Tempeh-based dishes |
| seitan_dishes | 5 | Seitan (wheat gluten) dishes |
| legume_dishes | 8 | Bean, lentil, chickpea mains |
| grain_bowls | 8 | Buddha bowls, grain bowls |
| vegetable_mains | 8 | Cauliflower steak, mushroom dishes |
| indian_mains | 8 | Paneer dishes, Indian curries |
| asian_mains | 8 | Stir-fries, curries, noodles |
| mediterranean_mains | 8 | Falafel, moussaka, shakshuka |

## Verification

After import, verify with:

```sql
SELECT COUNT(*) FROM vegetarian;                                    -- Should be 65
SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'vegetarian';  -- Should be ~450
SELECT category, COUNT(*) FROM vegetarian GROUP BY category;        -- Distribution check
```

## Notes

- All dishes are in English (translations in separate table)
- Uses TEXT + CHECK constraints (no ENUM per v1.1 standards)
- Supports Sistema 5 Dimensioni (allergens, dietary, nutrition, spice)
- Protein sources: tofu, tempeh, seitan, legumes, paneer, eggs, mushrooms, jackfruit, cauliflower, nuts_seeds, quinoa, mixed
