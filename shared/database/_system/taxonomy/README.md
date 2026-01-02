# GUDBRO Product Taxonomy

> **Unified classification system for all 18+ product databases**

## Purpose

The `product_taxonomy` table provides a single source of truth for classifying all GUDBRO products (food and beverages) into a consistent hierarchy. This enables:

- **Unified queries**: "Get all main courses" across steaks, seafood, etc.
- **Menu building**: Construct traditional multi-course menus with proper ordering
- **Filtering**: Filter by food vs beverage, alcoholic vs non-alcoholic, etc.
- **UI display**: Consistent labels and icons across all product types

## Hierarchy

```
Level 1: service_type
├── food
└── beverage

Level 2: menu_type
├── traditional_course  (antipasto → primo → secondo → dolce)
├── standalone          (pizza, burger, sushi - single dish meals)
├── bar_menu            (cocktails, wines, beers)
├── cafe_menu           (coffee, tea)
└── side_dish           (salads, sides)

Level 3: category
├── appetizer, first_course, second_course, side, dessert
├── pizza, burger, sandwich, japanese, dumpling
└── cocktail, wine, beer, coffee, tea, soft_drink, juice, smoothie

Level 4: subcategory (optional)
├── pasta, risotto, soup, dumpling (within first_course)
├── meat, fish, poultry (within second_course)
└── salad, vegetable (within side)
```

## Current Classification (18 databases)

### Beverages (5)

| Database | Menu Type | Category | Alcoholic |
|----------|-----------|----------|-----------|
| cocktails | bar_menu | cocktail | ✅ |
| wines | bar_menu | wine | ✅ |
| beers | bar_menu | beer | ✅ |
| coffee | cafe_menu | coffee | ❌ |
| tea | cafe_menu | tea | ❌ |

### Food - Traditional Course (9)

| Database | Category | Subcategory | Course Order |
|----------|----------|-------------|--------------|
| appetizers | appetizer | - | 1 (Antipasti) |
| soups | first_course | soup | 2 (Primi) |
| pasta | first_course | pasta | 2 (Primi) |
| risotti | first_course | risotto | 2 (Primi) |
| dumplings | first_course | dumpling | 2 (Primi) |
| steaks | second_course | meat | 3 (Secondi) |
| seafood | second_course | fish | 3 (Secondi) |
| salads | side | salad | - (Contorni) |
| desserts | dessert | - | 4 (Dolci) |

### Food - Standalone (4)

| Database | Category | Notes |
|----------|----------|-------|
| pizzas | pizza | Single dish meal |
| burgers | burger | Single dish meal |
| sandwiches | sandwich | Includes piadine |
| sushi | sushi | Sushi, sashimi, rolls |

## Usage

### Import to Supabase

```bash
# Run in Supabase SQL Editor:
# shared/database/taxonomy/scripts/taxonomy-complete-import.sql
```

### Query Examples

```sql
-- Get all main courses (secondi)
SELECT * FROM product_taxonomy
WHERE category = 'second_course';

-- Get traditional menu in order
SELECT display_name_en, product_type, course_order
FROM product_taxonomy
WHERE menu_type = 'traditional_course'
ORDER BY course_order, display_order;

-- Get all alcoholic beverages
SELECT * FROM product_taxonomy
WHERE is_alcoholic = TRUE;

-- Get all hot beverages
SELECT * FROM product_taxonomy
WHERE service_type = 'beverage' AND is_hot_served = TRUE;
```

### TypeScript Usage

```typescript
import { DEFAULT_TAXONOMY, CourseOrder } from './types';

// Get taxonomy for a product type
const steaksTaxonomy = DEFAULT_TAXONOMY['steaks'];
// { service_type: 'food', menu_type: 'traditional_course', category: 'second_course', ... }

// Check if product is a main course
const isMainCourse = (productType: string) => {
  return DEFAULT_TAXONOMY[productType]?.course_order === CourseOrder.SECOND;
};
```

## File Structure

```
taxonomy/
├── README.md                              # This file
├── types.ts                               # TypeScript definitions
├── schema/
│   └── create-product-taxonomy-table.sql  # Schema only
└── scripts/
    └── taxonomy-complete-import.sql       # Schema + Data
```

## Adding New Product Types

When adding a new product database:

1. Add entry to `taxonomy-complete-import.sql`
2. Add type to `ProductType` in `types.ts`
3. Add entry to `DEFAULT_TAXONOMY` in `types.ts`
4. Run the complete import or add single INSERT

```sql
INSERT INTO product_taxonomy (
  product_type, service_type, menu_type, category, subcategory,
  course_order, display_order,
  display_name_en, display_name_it,
  description_en, icon, is_alcoholic, is_hot_served, requires_cooking
) VALUES (
  'new_type', 'food', 'standalone', 'new_category', NULL,
  NULL, 5,
  'New Type', 'Nuovo Tipo',
  'Description here', '🆕', FALSE, TRUE, TRUE
);
```

---

**Created:** 2025-12-18
**Version:** 1.0
