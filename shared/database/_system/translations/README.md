# Translations Structure

This folder will contain the translation system for cocktails, beers, and other content.

## Current Approach

**Phase 1 (Current):** English-only content in the database
- All cocktails and beers are seeded with English text only
- Simpler SQL, easier debugging, faster development

**Phase 2 (Future):** Add translations
- Option A: Separate `translations` table
- Option B: JSON files per language
- Option C: External translation service (i18next, Crowdin, etc.)

## Recommended Structure for Phase 2

### Option A: Database Table (Recommended)

```sql
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Reference to the source
  entity_type TEXT NOT NULL,  -- 'cocktail', 'beer', 'menu_item'
  entity_id UUID NOT NULL,

  -- Translation details
  field_name TEXT NOT NULL,   -- 'name', 'description', 'instructions'
  language_code TEXT NOT NULL, -- 'it', 'vi', 'ko', 'ja'
  translation TEXT NOT NULL,

  -- Metadata
  is_machine_translated BOOLEAN DEFAULT false,
  translator_id UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique translations
  UNIQUE(entity_type, entity_id, field_name, language_code)
);

-- Index for fast lookups
CREATE INDEX idx_translations_entity ON translations(entity_type, entity_id);
CREATE INDEX idx_translations_language ON translations(language_code);
```

### Query Example

```sql
-- Get cocktail with translations
SELECT
  c.*,
  t_name.translation as name_it,
  t_desc.translation as description_it
FROM cocktails c
LEFT JOIN translations t_name ON
  t_name.entity_type = 'cocktail'
  AND t_name.entity_id = c.id
  AND t_name.field_name = 'name'
  AND t_name.language_code = 'it'
LEFT JOIN translations t_desc ON
  t_desc.entity_type = 'cocktail'
  AND t_desc.entity_id = c.id
  AND t_desc.field_name = 'description'
  AND t_desc.language_code = 'it'
WHERE c.slug = 'alexander';
```

### Option B: JSON Files

```
shared/database/translations/
├── cocktails/
│   ├── it.json    # Italian translations
│   ├── vi.json    # Vietnamese translations
│   └── ko.json    # Korean translations
├── beers/
│   ├── it.json
│   └── vi.json
└── common/
    ├── it.json    # Common terms (glass types, methods, etc.)
    └── vi.json
```

Example `cocktails/it.json`:
```json
{
  "alexander": {
    "name": "Alexander",
    "description": "Un cocktail lussuoso e cremoso...",
    "instructions": "Versare tutti gli ingredienti..."
  },
  "negroni": {
    "name": "Negroni",
    "description": "Un aperitivo italiano classico..."
  }
}
```

## Fields to Translate

### Cocktails
- `name` - Cocktail name
- `description` - Main description
- `instructions` - How to make it
- `garnish` - Garnish description
- `history.story` - Historical background
- `taste.description` - Taste description
- `recommendations.food_pairings` - Food pairing suggestions

### Beers
- `name` - Beer name
- `description` - Main description
- `tagline` - Marketing tagline
- `brewery` - Brewery name
- `history.story` - Historical background
- `taste.description` - Taste description

## Migration Path

1. Keep TypeScript files with all translations (source of truth)
2. Generate English-only SQL for database
3. Create translation extraction script to populate translations table/files
4. Update frontend to fetch translations dynamically

## Scripts to Create

- `extract-translations.ts` - Extract translations from TypeScript files
- `import-translations.ts` - Import translations to database
- `export-translations.ts` - Export for external translation services
