# Waters Database

> GUDBRO Database Standards v1.3 Compliant

## Overview

Database di 64 acque premium da tutto il mondo, organizzate in 7 categorie.

## Statistics

| Category | Count | Description |
|----------|-------|-------------|
| still_natural | 12 | Acque naturali non gassate |
| sparkling_natural | 8 | Acque naturalmente frizzanti |
| sparkling_added | 9 | Acque con gas aggiunto |
| mineral_rich | 7 | Acque ad alto contenuto minerale |
| low_mineral | 7 | Acque leggerissime |
| alkaline | 6 | Acque alcaline (pH > 8) |
| flavored | 15 | Acque aromatizzate |
| **TOTAL** | **64** | |

## Schema Fields

### Water Properties
- `carbonation`: none, natural, added
- `source_type`: spring, artesian, glacier, volcanic, mineral, iceberg, well
- `tds_mg_l`: Total Dissolved Solids (residuo fisso) in mg/L
- `ph_level`: pH level (6.0-9.5)

### Minerals (mg/L)
- `calcium_mg_l`
- `magnesium_mg_l`
- `sodium_mg_l`
- `potassium_mg_l`
- `bicarbonate_mg_l`
- `silica_mg_l`

### Flavor (for flavored waters)
- `flavor`: Text description
- `has_real_fruit`: Boolean

## Import Instructions

### Execution Order (CRITICAL!)

```bash
# 1. Create schema and table
01-waters-schema.sql

# 2. Cleanup waters from softdrinks
02-cleanup-softdrinks.sql

# 3. Import all 64 waters
03-waters-data.sql

# 4. Verify import
04-verify-import.sql
```

### Expected Results

After import:
- Waters table: 64 records
- Softdrinks table: 35 records (was 38, minus 3 waters moved)
- Product_ingredients softdrinks: reduced accordingly

### Note: No Product_Ingredients

Waters don't have product_ingredients entries because:
- Waters are simple, single-ingredient products
- Their "ingredients" are natural minerals, not added components
- No complex recipes to track

## File Structure

```
waters/
├── README.md
├── types.ts
├── data/
│   ├── index.ts
│   ├── still-natural.ts      # 12 items
│   ├── sparkling-natural.ts  # 8 items
│   ├── sparkling-added.ts    # 9 items
│   ├── mineral-rich.ts       # 7 items
│   ├── low-mineral.ts        # 7 items
│   ├── alkaline.ts           # 6 items
│   └── flavored.ts           # 15 items
└── scripts/
    ├── 01-waters-schema.sql
    ├── 02-cleanup-softdrinks.sql
    ├── 03-waters-data.sql
    └── 04-verify-import.sql
```

## Prefix Convention

- Waters: `WTR_` (e.g., WTR_EVIAN, WTR_SAN_PELLEGRINO)
- Previous softdrinks waters: Migrated from `SDR_` to `WTR_`

## Brands Included

### Premium Still Waters
- Evian (France), Fiji (Fiji), Voss (Norway), Icelandic Glacial (Iceland)
- Acqua Panna (Italy), Hildon (UK), Antipodes (New Zealand)

### Premium Sparkling Waters
- San Pellegrino (Italy), Perrier (France), Badoit (France)
- Gerolsteiner (Germany), Ferrarelle (Italy), Lurisia (Italy)

### Italian Mineral Waters
- Levissima, Uliveto, Fiuggi, Rocchetta, Sant'Anna, Lauretana

### Alkaline Waters
- Essentia, Flow, Core Hydration

### Flavored Waters
- LaCroix, Hint Water, Perrier Flavored

## Created

- Date: 2025-12-20
- Version: v1.3 Compliant
- Author: Claude Code

