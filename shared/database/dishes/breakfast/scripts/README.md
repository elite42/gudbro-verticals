# Breakfast Database Import

## Overview
- **Database:** breakfast
- **Prefix:** BRK
- **Total:** 65 dishes
- **Standard:** DATABASE-STANDARDS v1.1 compliant

## Categories
| Category | Count | Examples |
|----------|-------|----------|
| eggs | 10 | Eggs Benedict, Shakshuka, Huevos Rancheros |
| pancakes_waffles | 10 | American Pancakes, Belgian Waffles, Crepes |
| pastries | 10 | Croissant, Pain au Chocolat, Cinnamon Roll |
| cereals_bowls | 10 | Acai Bowl, Overnight Oats, Congee |
| savory | 10 | Full English, Avocado Toast, Bacon Egg Cheese |
| international | 15 | Japanese, Turkish, Israeli, Korean Breakfast |

## Import Order (CRITICAL!)

Execute files in this EXACT order in Supabase SQL Editor:

```
1. 01-breakfast-missing-ingredients.sql  (58 new ingredients)
2. 02-breakfast-complete-import.sql      (65 dishes + schema)
3. 03-breakfast-product-ingredients.sql  (~485 links)
```

## Step-by-Step Instructions

### Step 1: Import Missing Ingredients
```
File: 01-breakfast-missing-ingredients.sql
Expected: 58 new ingredients added
Verify: SELECT COUNT(*) FROM ingredients; (should increase by ~58)
```

### Step 2: Import Breakfast Dishes
```
File: 02-breakfast-complete-import.sql
Expected: breakfast table created with 65 records
Verify:
  SELECT COUNT(*) FROM breakfast;  -- Should be 65
  SELECT category, COUNT(*) FROM breakfast GROUP BY category;
```

### Step 3: Import Product Ingredients
```
File: 03-breakfast-product-ingredients.sql
Expected: ~485 links in product_ingredients
Verify:
  SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'breakfast';
```

## Post-Import Checklist

- [ ] Verify breakfast table has 65 records
- [ ] Verify product_ingredients has ~485 breakfast links
- [ ] Run sync-ingredients.sh to update local cache
- [ ] Update DATABASE-INVENTORY.md
- [ ] Update BACKLOG.md (move to completed)

## Origins Coverage

| Origin | Count |
|--------|-------|
| american | 15 |
| french | 8 |
| british | 5 |
| international | 5 |
| japanese | 3 |
| mexican | 3 |
| turkish | 3 |
| scandinavian | 3 |
| brazilian | 2 |
| chinese | 2 |
| korean | 1 |
| australian | 2 |
| indian | 1 |
| spanish | 2 |
| german | 2 |
| middle_eastern | 2 |
| israeli | 2 |
| italian | 1 |

## Troubleshooting

### Error: "invalid input value for enum ingredient_category"
- Check ingredient category is valid (see PROCEDURE-NEW-DATABASE.md)
- Valid categories: proteins, dairy, grains, fruits, vegetables, condiments, etc.

### Error: "duplicate key value violates unique constraint"
- All INSERT statements use `ON CONFLICT DO NOTHING`
- Re-running is safe

### Error: "relation breakfast does not exist"
- Run 02-breakfast-complete-import.sql first
- This creates the table

---
**Created:** 2024-12-18
**Author:** Claude Code
