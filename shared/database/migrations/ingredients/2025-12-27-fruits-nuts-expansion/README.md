# Migration: Fruits & Nuts Expansion

**Date:** 2025-12-27
**Purpose:** Add missing common fruits, tropical fruits, nuts and seeds

## Summary

| Batch | Category | Count | Examples |
|-------|----------|-------|----------|
| Melons | `fruits` | 5 | cantaloupe, honeydew, galia, canary, crenshaw |
| Citrus & Stone | `fruits` | 8 | nectarine, clementine, tangerine, pomelo, blood orange |
| Tropical | `fruits` | 13 | durian, rambutan, longan, mangosteen, starfruit |
| Berries | `fruits` | 9 | mulberry, gooseberry, boysenberry, elderberry, acerola |
| Nuts | `nuts` | 9 | brazil nut, coconut meat, roasted varieties |
| Seeds | `seeds` | 10 | poppy, caraway, fennel, lotus, quinoa, sacha inchi |
| **Total New** | | **54** | |

## Category Fixes

- `ING_CASHEW`: moved from `other` to `nuts`
- `ING_CHESTNUT`: moved from `spices` to `nuts`

## Post-Migration Counts (Expected)

| Category | Before | After |
|----------|--------|-------|
| `fruits` | 232 | ~267 (+35) |
| `nuts` | 25 | ~36 (+11, includes fixes) |
| `seeds` | ~15 | ~25 (+10) |

## Execution

```
01-add-fruits-nuts.sql
```

## Notes

- All ingredients include nutrition data (per 100g)
- Uses `ON CONFLICT (id) DO NOTHING` pattern (safe to re-run)
- Includes verification queries at the end
