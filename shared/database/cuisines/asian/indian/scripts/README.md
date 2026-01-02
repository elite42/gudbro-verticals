# Indian Database Import Scripts

## Overview
- **65 authentic Indian dishes** across 8 categories
- **40 new ingredients** specific to Indian cuisine
- **~650 product_ingredients links**

## Categories
| Category | Dishes | Description |
|----------|--------|-------------|
| Curries | 12 | Butter Chicken, Rogan Josh, Korma, Vindaloo, etc. |
| Biryani & Rice | 8 | Hyderabadi, Lucknowi, Kolkata, Thalassery Biryani |
| Tandoori | 10 | Tandoori Chicken, Tikka, Seekh Kebab, Malai Kebab |
| Breads | 8 | Naan, Roti, Paratha, Puri, Bhatura, Kulcha |
| Appetizers | 7 | Samosa, Pakora, Aloo Tikki |
| Dals | 6 | Dal Makhani, Tadka, Chana Masala, Rajma, Sambar |
| Vegetarian | 8 | Palak Paneer, Paneer Butter Masala, Malai Kofta |
| Street Food | 6 | Pav Bhaji, Vada Pav, Pani Puri, Dosa, Idli |

## Import Order

Run scripts in this exact order via Supabase SQL Editor:

```
1. 01-indian-missing-ingredients.sql  (~40 new ingredients)
2. 02-indian-complete-import.sql      (schema + 65 dishes)
3. 03-indian-product-ingredients.sql  (~650 junction links)
```

## New Ingredients Added

### Spices & Seasonings
- Ajwain, Amchur, Asafoetida, Black Salt, Cardamom
- Chaat Masala, Chole Masala, Fennel Seeds
- Fenugreek Leaves (Kasuri Methi), Fenugreek Seeds
- Green Cardamom, Mace, Pav Bhaji Masala, Poppy Seeds

### Grains & Flours
- All Purpose Flour, Basmati Rice, Jeerakasala Rice
- Puffed Rice, Whole Wheat Flour

### Lentils
- Black Lentils (Urad Dal), Masoor Dal

### Proteins
- Chicken Leg, Fish White, Lamb Ground, Lamb Shoulder, Large Shrimp

### Oils & Condiments
- Coconut Oil, Mustard Oil
- Ginger Garlic Paste, Green Chutney, Kokum
- Tamarind Chutney, Kewra Water, Rose Water, Raw Papaya

### Miscellaneous
- Bay Leaf, Dried Red Chili, Pav Bread, Raisins, Sev

## Verification

After import, run:

```sql
-- Check dish count
SELECT COUNT(*) FROM indian;  -- Should be 65

-- Check by category
SELECT category, COUNT(*) FROM indian GROUP BY category ORDER BY count DESC;

-- Check product_ingredients
SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'indian';  -- ~650
```

## Database Standards
- v1.1 compliant (TEXT+CHECK, no ENUM)
- Uses JSONB for arrays (ingredient_ids, allergens, tags)
- Includes all dietary flags and nutrition info
- Regional classification (North, South, Mughlai, Coastal, etc.)
