# File Structure Reference

> Struttura cartelle standard per database

---

## Struttura Cartelle

```
shared/database/{nome}/
├── types.ts                      # TypeScript types
├── data/
│   ├── index.ts                  # Export combinato + stats
│   ├── {categoria1}.ts           # Dati categoria 1
│   └── {categoria2}.ts           # Dati categoria 2
├── schema/
│   └── create-{nome}-table.sql   # Schema SQL
└── scripts/
    ├── generate-import-sql.py    # Script generazione
    └── {nome}-import.sql         # SQL INSERT
```

---

## Template types.ts

```typescript
// ============================================
// {DATABASE} Types - GUDBRO Database Standards
// ============================================

export type {Database}Category =
  | 'category1'
  | 'category2';

export type {Database}Status =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal';

export interface {Database}Item {
  // Identification
  id: string;
  slug: string;

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: {Database}Category;
  status: {Database}Status;

  // Ingredients
  ingredient_ids: string[];

  // Allergens & Dietary
  allergens: string[];
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_kosher: boolean;

  // Nutrition
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // Spice & Popularity
  spice_level: number;   // 0-5
  popularity: number;    // 0-100

  // Timestamps
  created_at?: string;
  updated_at?: string;
}
```

---

## Template data/index.ts

```typescript
// ============================================
// {DATABASE} Data Index
// ============================================

import { categoria1Items } from './categoria1';
import { categoria2Items } from './categoria2';

// Export singole collezioni
export { categoria1Items, categoria2Items };

// Export combinato
export const all{Database}s = [
  ...categoria1Items,
  ...categoria2Items,
];

// Statistiche
export const {database}Stats = {
  total: all{Database}s.length,
  byCategory: {
    categoria1: categoria1Items.length,
    categoria2: categoria2Items.length,
  },
};

console.log(`{Database}: ${all{Database}s.length} items loaded`);
```

---

**File:** `docs/STANDARDS/08-file-structure.md`
