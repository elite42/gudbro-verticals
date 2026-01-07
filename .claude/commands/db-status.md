---
description: Controlla stato database e traduzioni
allowed-tools: mcp__supabase__execute_sql, mcp__supabase__list_tables, mcp__supabase__get_advisors
---

# Database Status Check

## 1. Stato Traduzioni Ingredienti

```sql
SELECT locale, COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / 2551, 1) as percentage
FROM translations
WHERE entity_type = 'ingredient'
GROUP BY locale
ORDER BY count DESC;
```

## 2. Totali Database

```sql
SELECT
  (SELECT COUNT(*) FROM ingredients) as total_ingredients,
  (SELECT COUNT(*) FROM translations WHERE entity_type = 'ingredient') as total_translations,
  (SELECT COUNT(DISTINCT locale) FROM translations WHERE entity_type = 'ingredient') as languages;
```

## 3. Security Check

Esegui: `mcp__supabase__get_advisors(type: "security")`

## 4. Performance Check

Esegui: `mcp__supabase__get_advisors(type: "performance")`

## Target Traduzioni

| Lingua | Target | Obiettivo |
| ------ | ------ | --------- |
| 5 EU   | 2551   | 100%      |
| 9 Asia | 2551   | 100%      |
| Totale | 35,714 | 14 lingue |
