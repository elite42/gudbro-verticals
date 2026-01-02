# Origin Field Reference

> Campo OBBLIGATORIO per tracciare origine geografica prodotti

---

## Schema

```sql
-- Campo OBBLIGATORIO in ogni tabella food/bevande
origin JSONB NOT NULL DEFAULT '{}'::jsonb
```

---

## Formato JSONB

```json
{
  "region_type": "country",
  "country": "Italy",
  "country_code": "IT",
  "continent": "Europe",
  "continent_code": "EU",
  "region": "Mediterranean",
  "region_code": "MED",
  "local_region": "Lazio",
  "city": "Rome",
  "year_created": "1940s",
  "creator": "Nome Inventore",
  "certification": "DOP/IGP/STG",
  "is_international": false
}
```

---

## Campi Origin (Dettaglio)

| Campo | Tipo | Descrizione | Esempio |
|-------|------|-------------|---------|
| `region_type` | **Obbligatorio** | Tipo di origine | `"country"`, `"continent"`, `"region"`, `"global"` |
| `country` | Per type=country | Nome paese in inglese | `"Italy"`, `"France"`, `"Japan"` |
| `country_code` | Per type=country | ISO 3166-1 alpha-2 | `"IT"`, `"FR"`, `"JP"` |
| `continent` | Opzionale | Continente | `"Europe"`, `"Asia"`, `"Africa"` |
| `continent_code` | Opzionale | Codice continente | `"EU"`, `"AS"`, `"AF"` |
| `region` | Per type=region | Area geografica | `"Caribbean"`, `"Middle East"` |
| `region_code` | Per type=region | Codice regione | `"CAR"`, `"MEA"` |
| `local_region` | Opzionale | Regione/Stato locale | `"Lazio"`, `"Provence"`, `"Oaxaca"` |
| `city` | Opzionale | Città di origine | `"Rome"`, `"Naples"`, `"Osaka"` |
| `year_created` | Opzionale | Anno/periodo creazione | `"1889"`, `"1940s"`, `"19th century"` |
| `creator` | Opzionale | Inventore/creatore | `"Raffaele Esposito"` |
| `certification` | Opzionale | Certificazioni ufficiali | `"DOP"`, `"IGP"`, `"STG"`, `"UNESCO"` |
| `is_international` | Opzionale | Prodotto globalizzato | `true` per Coca-Cola, Starbucks drinks |

---

## Tipi di Origine (region_type)

| Valore | Quando usare | Campi obbligatori | Esempio |
|--------|--------------|-------------------|---------|
| `country` | Origine nazionale specifica | country, country_code | Sake (JP), Tequila (MX), Espresso (IT) |
| `continent` | Origine continentale | continent, continent_code | African Coffee, Asian Tea |
| `region` | Area multi-paese | region, region_code | Caribbean Rum, Middle Eastern |
| `global` | Senza origine specifica | is_international: true | Smoothie generico, bevande inventate |

---

## Country Codes (ISO 3166-1 alpha-2)

| Paese | Codice | | Paese | Codice |
|-------|--------|---|-------|--------|
| Italy | IT | | Japan | JP |
| France | FR | | Korea | KR |
| Spain | ES | | China | CN |
| USA | US | | Thailand | TH |
| Mexico | MX | | Vietnam | VN |
| Brazil | BR | | India | IN |
| Morocco | MA | | Turkey | TR |
| Ethiopia | ET | | Lebanon | LB |
| Greece | GR | | Georgia | GE |
| Jamaica | JM | | Peru | PE |
| Germany | DE | | UK | GB |
| Portugal | PT | | Argentina | AR |
| Cuba | CU | | Colombia | CO |
| Indonesia | ID | | Malaysia | MY |
| Philippines | PH | | Ireland | IE |
| Czech Republic | CZ | | Belgium | BE |
| Netherlands | NL | | Austria | AT |
| Switzerland | CH | | Poland | PL |
| Russia | RU | | Sweden | SE |
| Norway | NO | | Denmark | DK |

---

## Continent Codes

| Continente | Codice | Descrizione |
|------------|--------|-------------|
| Africa | AF | Continente africano |
| Asia | AS | Continente asiatico |
| Europe | EU | Continente europeo |
| North America | NA | USA, Canada, Messico |
| South America | SA | Sud America |
| Oceania | OC | Australia, NZ, Pacifico |
| Antarctica | AN | Antartide (raro) |

---

## Region Codes (Aree Multi-Paese)

| Regione | Codice | Paesi/Aree incluse |
|---------|--------|-------------------|
| Caribbean | CAR | Jamaica, Cuba, Trinidad, Barbados, Puerto Rico, Haiti |
| Central America | CAM | Guatemala, Honduras, El Salvador, Costa Rica, Panama |
| South America | SAM | Brazil, Argentina, Peru, Colombia, Chile, Venezuela |
| Middle East | MEA | Lebanon, Syria, Jordan, Iraq, Iran, Saudi Arabia, UAE |
| Southeast Asia | SEA | Thailand, Vietnam, Indonesia, Malaysia, Philippines, Singapore |
| East Asia | EAS | Japan, China, Korea, Taiwan, Hong Kong |
| South Asia | SAS | India, Pakistan, Bangladesh, Sri Lanka, Nepal |
| Mediterranean | MED | Italy, Greece, Spain, Turkey, Croatia, Tunisia, Morocco |
| Scandinavia | SCA | Sweden, Norway, Denmark, Finland, Iceland |
| Central Europe | CEU | Germany, Austria, Switzerland, Poland, Czech Republic |
| Eastern Europe | EEU | Russia, Ukraine, Poland, Romania, Bulgaria |
| British Isles | BRI | UK, Ireland |
| Pacific Islands | PAC | Hawaii, Fiji, Samoa, Tahiti, Tonga |
| Andean | AND | Peru, Bolivia, Ecuador, Colombia (highlands) |
| Tropical | TRO | Area tropicale globale (non specifica) |

---

## Esempi Dettagliati per Tipo

### country - Con dettagli completi
```json
// Pizza Margherita con certificazione
{
  "region_type": "country",
  "country": "Italy",
  "country_code": "IT",
  "continent": "Europe",
  "continent_code": "EU",
  "region": "Mediterranean",
  "region_code": "MED",
  "local_region": "Campania",
  "city": "Naples",
  "year_created": "1889",
  "creator": "Raffaele Esposito",
  "certification": "STG"
}

// Tequila messicana
{
  "region_type": "country",
  "country": "Mexico",
  "country_code": "MX",
  "continent": "North America",
  "continent_code": "NA",
  "local_region": "Jalisco",
  "certification": "DO"
}

// Sake giapponese
{
  "region_type": "country",
  "country": "Japan",
  "country_code": "JP",
  "continent": "Asia",
  "continent_code": "AS"
}
```

### continent - Origine continentale
```json
// African Coffee Blend
{
  "region_type": "continent",
  "continent": "Africa",
  "continent_code": "AF"
}

// Asian Tea Blend
{
  "region_type": "continent",
  "continent": "Asia",
  "continent_code": "AS"
}
```

### region - Area multi-paese
```json
// Caribbean Rum Punch
{
  "region_type": "region",
  "region": "Caribbean",
  "region_code": "CAR",
  "continent": "North America",
  "continent_code": "NA"
}

// Middle Eastern Hummus
{
  "region_type": "region",
  "region": "Middle East",
  "region_code": "MEA",
  "continent": "Asia",
  "continent_code": "AS"
}

// Mediterranean Salad
{
  "region_type": "region",
  "region": "Mediterranean",
  "region_code": "MED"
}
```

### global - Prodotti internazionali
```json
// Coca-Cola (inventata in USA ma globale)
{
  "region_type": "country",
  "country": "USA",
  "country_code": "US",
  "city": "Atlanta",
  "year_created": "1886",
  "is_international": true
}

// Tropical Smoothie generico
{
  "region_type": "global",
  "is_international": true
}
```

---

## Query di Esempio

### Query Base
```sql
-- Per paese
SELECT * FROM pasta WHERE origin->>'country_code' = 'IT';

-- Per continente
SELECT * FROM coffee WHERE origin->>'continent_code' = 'AF';

-- Per regione
SELECT * FROM cocktails WHERE origin->>'region_code' = 'CAR';

-- Prodotti globali
SELECT * FROM smoothies WHERE origin->>'region_type' = 'global';

-- Prodotti internazionali
SELECT * FROM softdrinks WHERE origin->>'is_international' = 'true';
```

### Query Combinate
```sql
-- Piatti italiani con certificazione DOP/IGP
SELECT * FROM pizzas
WHERE origin->>'country_code' = 'IT'
AND origin->>'certification' IS NOT NULL;

-- Bevande asiatiche (tutti i tipi)
SELECT * FROM tea
WHERE origin->>'continent_code' = 'AS'
   OR origin->>'region_code' IN ('EAS', 'SEA', 'SAS');

-- Query cross-table per cucina italiana
SELECT 'pasta' as source, id, name, origin FROM pasta WHERE origin->>'country_code' = 'IT'
UNION ALL
SELECT 'pizzas' as source, id, name, origin FROM pizzas WHERE origin->>'country_code' = 'IT'
UNION ALL
SELECT 'risotti' as source, id, name, origin FROM risotti WHERE origin->>'country_code' = 'IT';
```

---

## Index Consigliati

```sql
-- Index per country_code (query più comune)
CREATE INDEX IF NOT EXISTS idx_{table}_origin_country
  ON {table} ((origin->>'country_code'));

-- Index per continent_code
CREATE INDEX IF NOT EXISTS idx_{table}_origin_continent
  ON {table} ((origin->>'continent_code'));

-- Index per region_code
CREATE INDEX IF NOT EXISTS idx_{table}_origin_region
  ON {table} ((origin->>'region_code'));

-- Index per region_type
CREATE INDEX IF NOT EXISTS idx_{table}_origin_type
  ON {table} ((origin->>'region_type'));

-- GIN index completo (per query JSONB complesse)
CREATE INDEX IF NOT EXISTS idx_{table}_origin_gin
  ON {table} USING GIN(origin);
```

---

## Migrazione Tabelle Esistenti

Per tabelle che non hanno ancora il campo `origin`:

```sql
-- Step 1: Aggiungere colonna
ALTER TABLE {table} ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Step 2: Backfill per cucine nazionali (esempio French)
UPDATE french SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'France',
  'country_code', 'FR',
  'continent', 'Europe',
  'continent_code', 'EU'
) WHERE origin = '{}'::jsonb;

-- Step 3: Creare index
CREATE INDEX IF NOT EXISTS idx_{table}_origin_country
  ON {table} ((origin->>'country_code'));
```

---

## Stato Tabelle (Dic 2025)

| Stato | Tabelle |
|-------|---------|
| ✅ **HA origin JSONB completo** | pasta, pizzas, risotti, piadine, appetizers, desserts, salads, soups, burgers, sandwiches, dumplings |
| ✅ **HA origin JSONB base** | french, spanish, moroccan, ethiopian, lebanese, turkish, greek, georgian, brazilian, peruvian, vietnamese, korean, british, german, italian |
| ⚠️ **HA origin TEXT** (da migrare) | breakfast, caribbean |
| ❌ **DA AGGIUNGERE** | ~15 tabelle (bevande, steaks, seafood, bakery, etc.) |

---

**File:** `docs/STANDARDS/04-origin-field.md`
