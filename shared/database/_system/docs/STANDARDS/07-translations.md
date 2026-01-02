# Language & Translations

> Regole per gestione lingue nel database

---

## Regola Fondamentale

```
DATABASE PRINCIPALE = SOLO INGLESE
TRADUZIONI = TABELLA SEPARATA `translations`
```

---

## Nel Database

```typescript
// CORRETTO
{
  name: 'Spaghetti Carbonara',
  description: 'Classic Roman pasta with eggs, pecorino, guanciale'
}

// SBAGLIATO - MAI multilingua nel DB principale
{
  name: {
    en: 'Spaghetti Carbonara',
    it: 'Spaghetti alla Carbonara'
  }
}
```

---

## Tabella Translations

```sql
translations (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL,  -- 'steaks', 'coffee', etc.
  entity_id TEXT NOT NULL,    -- 'STK_RIBEYE'
  field TEXT NOT NULL,        -- 'name', 'description'
  locale TEXT NOT NULL,       -- 'it', 'vi', 'ko', 'ja'
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, field, locale)
)
```

---

## Locales Supportati

```
it (Italian)     vi (Vietnamese)   ko (Korean)
ja (Japanese)    es (Spanish)      fr (French)
de (German)      zh (Chinese)      pt (Portuguese)
ru (Russian)     ar (Arabic - RTL)
```

---

## Query di Esempio

```sql
-- Ottenere traduzione italiana
SELECT value FROM translations
WHERE entity_type = 'pasta'
AND entity_id = 'PST_CARBONARA'
AND field = 'name'
AND locale = 'it';

-- Inserire traduzione
INSERT INTO translations (entity_type, entity_id, field, locale, value)
VALUES ('pasta', 'PST_CARBONARA', 'name', 'it', 'Spaghetti alla Carbonara');
```

---

**File:** `docs/STANDARDS/07-translations.md`
