# Japanese Database - Migration Instructions

## Overview

This migration unifies the existing **sushi** table (100 records) with new **Japanese non-sushi dishes** (73 records) into a single `japanese` table.

**Final result: 173 Japanese dishes** in one unified table.

## Scripts (Execute in Order)

| Script | Purpose | Records |
|--------|---------|---------|
| `00-japanese-unified-schema.sql` | Create unified table schema | - |
| `01-migrate-sushi-to-japanese.sql` | Migrate 100 sushi records | 100 |
| `02-japanese-missing-ingredients.sql` | Add 51 new Japanese ingredients | 51 |
| `03-japanese-data.sql` | Insert 73 new Japanese dishes | 73 |
| `04-japanese-product-ingredients.sql` | Create ~620 ingredient links | ~620 |
| `05-migrate-sushi-product-ingredients.sql` | Migrate 500 sushi ingredient links | ~500 |
| `06-cleanup-old-sushi-table.sql` | Verify & drop old sushi table | - |

## Execution Steps

### Step 1: Create the Schema
1. Open Supabase SQL Editor
2. Copy the content of `00-japanese-unified-schema.sql`
3. Execute
4. Expected: "Japanese unified schema created successfully"

### Step 2: Migrate Sushi Data
1. Copy the content of `01-migrate-sushi-to-japanese.sql`
2. Execute
3. Expected: `migrated_count: 100`

### Step 3: Add Missing Ingredients
1. Copy the content of `02-japanese-missing-ingredients.sql`
2. Execute
3. Expected: No errors (51 ingredients added)

### Step 4: Insert New Japanese Dishes
1. Copy the content of `03-japanese-data.sql`
2. Execute
3. Expected: Total count should show 173 (100 sushi + 73 new)

### Step 5: Add Product Ingredients for New Dishes
1. Copy the content of `04-japanese-product-ingredients.sql`
2. Execute
3. Expected: ~620 new links created

### Step 6: Migrate Sushi Product Ingredients
1. Copy the content of `05-migrate-sushi-product-ingredients.sql`
2. Execute
3. Expected: ~500 sushi links migrated to japanese type

### Step 7: Verify and Cleanup (IMPORTANT!)
1. Copy the content of `06-cleanup-old-sushi-table.sql`
2. Execute the verification queries FIRST (uncommented)
3. Verify counts are correct:
   - Japanese sushi items: 100
   - Japanese non-sushi items: 73
   - Total Japanese items: 173
   - Sushi product_ingredients (should be 0): 0
4. ONLY AFTER verification, uncomment the DROP TABLE line and re-execute

## Verification Queries

After migration, run these queries to verify:

```sql
-- Count by category type
SELECT
  CASE
    WHEN category IN ('nigiri', 'sashimi', 'maki', 'uramaki', 'temaki', 'gunkan', 'chirashi', 'oshizushi', 'inari', 'temari', 'specialty_roll')
    THEN 'sushi'
    ELSE 'non-sushi'
  END as type,
  COUNT(*) as count
FROM japanese
GROUP BY 1;

-- Expected:
-- sushi: 100
-- non-sushi: 73

-- Total count
SELECT COUNT(*) as total FROM japanese;
-- Expected: 173

-- Product ingredients by type
SELECT product_type, COUNT(*)
FROM product_ingredients
WHERE product_type = 'japanese'
GROUP BY product_type;
-- Expected: ~1120 links (500 sushi + 620 new)
```

## Rollback

If something goes wrong:
1. The old `sushi` table is NOT dropped until Step 7
2. You can restart from Step 1 (schema has DROP TABLE IF EXISTS)
3. Product ingredients are updated, not deleted, so sushi links can be recovered

## ID Format

- Old sushi IDs: `nigiri-maguro-akami`
- New sushi IDs: `JPN_SUSHI_NIGIRI_MAGURO_AKAMI`
- New non-sushi IDs: `JPN_SHOYU_RAMEN`, `JPN_TONKATSU`, etc.

The `JPN_SUSHI_` prefix distinguishes migrated sushi items from new Japanese dishes.
