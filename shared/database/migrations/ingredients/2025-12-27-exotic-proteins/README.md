# Migration: Exotic Proteins Expansion

**Date:** 2025-12-27
**Purpose:** Add ~33 exotic protein ingredients to expand game and proteins categories

## Summary

| Batch | Category | Count | Examples |
|-------|----------|-------|----------|
| Exotic Mammals | `game` | 11 | bison, buffalo, yak, venison, moose, elk |
| Exotic Birds | `game` | 7 | ostrich, quail, pheasant, guinea fowl |
| Reptiles & Amphibians | `game` | 5 | crocodile, frog legs, turtle, snake |
| Edible Insects | `proteins` | 10 | crickets, grasshoppers, mealworms, silkworms |
| **Total** | | **33** | |

## Post-Migration Counts

| Category | Before | After |
|----------|--------|-------|
| `game` | 12 | 35 (+23) |
| `proteins` | 98 | 108 (+10) |

## Execution

Execute in Supabase SQL Editor:

```
01-add-exotic-ingredients.sql
```

## Notes

- All ingredients include nutrition data (per 100g)
- Insects placed in `proteins` (sustainable protein source, not traditional game)
- All use `WHERE NOT EXISTS` pattern (safe to re-run)

## Verification

The script includes verification queries at the end showing counts per batch.
