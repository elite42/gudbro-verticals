---
description: Continua traduzioni ingredienti da dove interrotto
allowed-tools: mcp__supabase__execute_sql
---

# Continue Ingredient Translations

## 1. Verifica stato attuale

```sql
SELECT locale, COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / 2551, 1) as pct
FROM translations
WHERE entity_type = 'ingredient'
GROUP BY locale
ORDER BY count DESC;
```

## 2. Trova prossimo OFFSET

Cerca la lingua con meno traduzioni e calcola l'offset:

- Se tutte a ~277 → OFFSET 150 (dove ci siamo fermati)
- Altrimenti calcola: `COUNT / 9 lingue = batch completati * 50`

## 3. Fetch prossimi 50 ingredienti

```sql
SELECT id, name FROM ingredients ORDER BY id LIMIT 50 OFFSET [OFFSET];
```

## 4. Pattern INSERT

Per ogni ingrediente, genera traduzioni per 9 lingue:

- vi (Vietnamita), zh (Cinese), ja (Giapponese)
- ko (Coreano), th (Thailandese), ru (Russo)
- tr (Turco), hi (Hindi), ar (Arabo)

```sql
INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by)
VALUES
  ('ingredient', 'ING_XXX', 'name', 'vi', 'traduzione', false, 'openai-gpt4o-mini'),
  ('ingredient', 'ING_XXX', 'name', 'zh', '翻译', false, 'openai-gpt4o-mini'),
  -- ... altre lingue
ON CONFLICT DO NOTHING;
```

## 5. Verifica dopo ogni batch

```sql
SELECT locale, COUNT(*) FROM translations
WHERE entity_type = 'ingredient'
GROUP BY locale ORDER BY count DESC;
```

## Target

- 2551 ingredienti × 9 lingue = 22,959 traduzioni
- ~45 batch da 450 traduzioni (50 ing × 9 lang)
