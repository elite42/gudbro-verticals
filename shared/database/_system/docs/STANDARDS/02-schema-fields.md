# Schema Fields Reference

> Campi obbligatori e opzionali per database GUDBRO

---

## Schema Obbligatorio

```sql
-- IDENTIFICAZIONE
id TEXT PRIMARY KEY,
slug TEXT UNIQUE NOT NULL,

-- INFO BASE (SOLO INGLESE)
name TEXT NOT NULL,
description TEXT NOT NULL,

-- CLASSIFICAZIONE (TEXT + CHECK, non ENUM!)
category TEXT NOT NULL CHECK (category IN ('value1', 'value2')),
status TEXT NOT NULL DEFAULT 'active'
  CHECK (status IN ('active', 'classic', 'popular', 'seasonal')),

-- INGREDIENTI
ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

-- ALLERGENI & DIETARY
allergens TEXT[] NOT NULL DEFAULT '{}',
is_vegan BOOLEAN NOT NULL DEFAULT false,
is_vegetarian BOOLEAN NOT NULL DEFAULT false,
is_gluten_free BOOLEAN NOT NULL DEFAULT false,
is_dairy_free BOOLEAN NOT NULL DEFAULT false,
is_halal BOOLEAN NOT NULL DEFAULT false,
is_kosher BOOLEAN NOT NULL DEFAULT false,

-- SPICE & POPULARITY
spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

-- TIMESTAMPS (SEMPRE TIMESTAMPTZ!)
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

---

## Popularity Scale (0-100)

| Range | Significato | Esempio |
|-------|-------------|---------|
| 0-20 | Raro/Nicchia | Sperimentali |
| 21-40 | Poco comune | Regionali |
| 41-60 | Medio | Standard menu |
| 61-80 | Popolare | Best sellers |
| 81-100 | Iconico | Signature dishes |

---

## Spice Level (0-5)

| Level | Nome | Scoville | Esempio |
|-------|------|----------|---------|
| 0 | None | 0 | Margherita |
| 1 | Mild | 1-1,000 | Peperoncino dolce |
| 2 | Medium | 1K-10K | Jalapeño |
| 3 | Hot | 10K-50K | Serrano |
| 4 | Very Hot | 50K-100K | Thai chili |
| 5 | Extreme | 100K+ | Habanero |

---

## Data Format Rules

| Tipo | Formato | Esempio |
|------|---------|---------|
| Pesi | grammi (g) | `weight_g: 350` |
| Volume | millilitri (ml) | `volume_ml: 250` |
| Temperatura | Celsius (°C) | `serving_temp_c: 54` |
| Prezzi | Mai in ingredients | Tabella separata |

**NO unità imperiali** (oz, cups, °F)

---

## Allergeni (30)

```typescript
// EU 14 Mandatory
'gluten', 'crustaceans', 'eggs', 'fish', 'peanuts',
'soybeans', 'milk', 'nuts', 'celery', 'mustard',
'sesame', 'sulphites', 'lupin', 'molluscs',

// Korea 7
'pork', 'beef', 'chicken', 'squid', 'peach',

// Japan 7
'shrimp', 'crab', 'wheat', 'buckwheat', 'mackerel',
'salmon_roe', 'abalone',

// Custom
'alcohol', 'caffeine'
```

---

## Dietary Flags

| Flag | Implica |
|------|---------|
| `is_vegan` | `is_vegetarian` + `is_dairy_free` |
| `is_vegetarian` | No carne/pesce |
| `is_halal` | Conforme Islam |
| `is_kosher` | Conforme Ebraismo |

---

## Language Rule

```
DATABASE = SOLO INGLESE
TRADUZIONI = tabella `translations` separata
```

---

**File:** `docs/STANDARDS/02-schema-fields.md`
