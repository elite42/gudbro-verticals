-- ============================================
-- ORIGIN STANDARDIZATION - Fase 2 Part 2: Other Beverages
-- Aggiunge origin JSONB a: cocktails, coffee, tea, smoothies,
-- milkshakes, hotbeverages, mocktails, softdrinks, waters
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- STEP 1: Aggiungere colonna origin JSONB a tutte le tabelle
-- =====================================================

ALTER TABLE cocktails ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE coffee ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE tea ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE smoothies ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE milkshakes ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE hotbeverages ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE mocktails ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE softdrinks ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE waters ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;

-- =====================================================
-- STEP 2: COCKTAILS - Assegnare origine basata sul nome/tipo
-- La maggior parte dei cocktails classici ha origine nota
-- =====================================================

-- Cocktails cubani
UPDATE cocktails SET origin = '{"region_type": "country", "country": "Cuba", "country_code": "CU", "continent": "North America", "continent_code": "NA", "region": "Caribbean", "region_code": "CAR"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%mojito%' OR
  name->>'en' ILIKE '%daiquiri%' OR
  name->>'en' ILIKE '%cuba libre%' OR
  name->>'en' ILIKE '%havana%'
);

-- Cocktails americani
UPDATE cocktails SET origin = '{"region_type": "country", "country": "USA", "country_code": "US", "continent": "North America", "continent_code": "NA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%manhattan%' OR
  name->>'en' ILIKE '%martini%' OR
  name->>'en' ILIKE '%old fashioned%' OR
  name->>'en' ILIKE '%whiskey sour%' OR
  name->>'en' ILIKE '%bourbon%' OR
  name->>'en' ILIKE '%mint julep%' OR
  name->>'en' ILIKE '%sazerac%' OR
  name->>'en' ILIKE '%cosmopolitan%' OR
  name->>'en' ILIKE '%long island%' OR
  name->>'en' ILIKE '%margarita%' OR
  name->>'en' ILIKE '%tom collins%' OR
  name->>'en' ILIKE '%whisky%'
);

-- Cocktails italiani
UPDATE cocktails SET origin = '{"region_type": "country", "country": "Italy", "country_code": "IT", "continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%negroni%' OR
  name->>'en' ILIKE '%spritz%' OR
  name->>'en' ILIKE '%bellini%' OR
  name->>'en' ILIKE '%americano%' OR
  name->>'en' ILIKE '%rossini%' OR
  name->>'en' ILIKE '%garibaldi%' OR
  name->>'en' ILIKE '%sgroppino%'
);

-- Cocktails britannici
UPDATE cocktails SET origin = '{"region_type": "country", "country": "United Kingdom", "country_code": "GB", "continent": "Europe", "continent_code": "EU", "region": "British Isles", "region_code": "BRI"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%gin fizz%' OR
  name->>'en' ILIKE '%pimm%' OR
  name->>'en' ILIKE '%bramble%'
);

-- Cocktails francesi
UPDATE cocktails SET origin = '{"region_type": "country", "country": "France", "country_code": "FR", "continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%french%' OR
  name->>'en' ILIKE '%champagne%' OR
  name->>'en' ILIKE '%kir%' OR
  name->>'en' ILIKE '%sidecar%'
);

-- Cocktails brasiliani
UPDATE cocktails SET origin = '{"region_type": "country", "country": "Brazil", "country_code": "BR", "continent": "South America", "continent_code": "SA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%caipirinha%' OR
  name->>'en' ILIKE '%batida%'
);

-- Cocktails messicani
UPDATE cocktails SET origin = '{"region_type": "country", "country": "Mexico", "country_code": "MX", "continent": "North America", "continent_code": "NA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%paloma%' OR
  name->>'en' ILIKE '%tequila%' OR
  name->>'en' ILIKE '%mezcal%'
);

-- Cocktails giapponesi
UPDATE cocktails SET origin = '{"region_type": "country", "country": "Japan", "country_code": "JP", "continent": "Asia", "continent_code": "AS", "region": "East Asia", "region_code": "EAS"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%sake%' OR
  name->>'en' ILIKE '%japanese%' OR
  name->>'en' ILIKE '%yuzu%'
);

-- Cocktails caraibici (generici)
UPDATE cocktails SET origin = '{"region_type": "region", "region": "Caribbean", "region_code": "CAR", "continent": "North America", "continent_code": "NA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%rum%' OR
  name->>'en' ILIKE '%zombie%' OR
  name->>'en' ILIKE '%painkiller%' OR
  name->>'en' ILIKE '%pina colada%' OR
  name->>'en' ILIKE '%mai tai%' OR
  name->>'en' ILIKE '%planter%'
);

-- Cocktails tiki/tropicali (regione Pacifico/globale)
UPDATE cocktails SET origin = '{"region_type": "region", "region": "Pacific Islands", "region_code": "PAC", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name->>'en' ILIKE '%tiki%' OR
  name->>'en' ILIKE '%tropical%' OR
  name->>'en' ILIKE '%blue lagoon%' OR
  name->>'en' ILIKE '%sex on the beach%'
);

-- Default per cocktails rimanenti: internazionale
UPDATE cocktails SET origin = '{"region_type": "global", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 3: COFFEE - Origine basata sul tipo
-- =====================================================

-- Espresso e derivati italiani
UPDATE coffee SET origin = '{"region_type": "country", "country": "Italy", "country_code": "IT", "continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%espresso%' OR
  name ILIKE '%cappuccino%' OR
  name ILIKE '%macchiato%' OR
  name ILIKE '%ristretto%' OR
  name ILIKE '%affogato%' OR
  name ILIKE '%corretto%' OR
  name ILIKE '%romano%'
);

-- Caffè americano
UPDATE coffee SET origin = '{"region_type": "country", "country": "USA", "country_code": "US", "continent": "North America", "continent_code": "NA", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%americano%' OR
  name ILIKE '%drip%' OR
  name ILIKE '%cold brew%' OR
  name ILIKE '%iced coffee%'
);

-- Latte e Flat White (Australia/NZ)
UPDATE coffee SET origin = '{"region_type": "country", "country": "Australia", "country_code": "AU", "continent": "Oceania", "continent_code": "OC"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%flat white%'
);

-- Caffè turco
UPDATE coffee SET origin = '{"region_type": "country", "country": "Turkey", "country_code": "TR", "continent": "Asia", "continent_code": "AS", "region": "Middle East", "region_code": "MEA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%turkish%' OR
  name ILIKE '%ibrik%'
);

-- Caffè vietnamita
UPDATE coffee SET origin = '{"region_type": "country", "country": "Vietnam", "country_code": "VN", "continent": "Asia", "continent_code": "AS", "region": "Southeast Asia", "region_code": "SEA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%vietnam%' OR
  name ILIKE '%ca phe%'
);

-- Default per caffè rimanenti: Italia (patria dell'espresso moderno)
UPDATE coffee SET origin = '{"region_type": "country", "country": "Italy", "country_code": "IT", "continent": "Europe", "continent_code": "EU", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 4: TEA - Origine basata sul tipo
-- =====================================================

-- Matcha giapponese
UPDATE tea SET origin = '{"region_type": "country", "country": "Japan", "country_code": "JP", "continent": "Asia", "continent_code": "AS", "region": "East Asia", "region_code": "EAS"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%matcha%' OR
  name ILIKE '%sencha%' OR
  name ILIKE '%genmaicha%' OR
  name ILIKE '%hojicha%' OR
  name ILIKE '%gyokuro%'
);

-- Tè cinesi
UPDATE tea SET origin = '{"region_type": "country", "country": "China", "country_code": "CN", "continent": "Asia", "continent_code": "AS", "region": "East Asia", "region_code": "EAS"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%oolong%' OR
  name ILIKE '%pu-erh%' OR
  name ILIKE '%dragon%' OR
  name ILIKE '%jasmine%' OR
  name ILIKE '%gunpowder%' OR
  name ILIKE '%longjing%'
);

-- Tè indiani
UPDATE tea SET origin = '{"region_type": "country", "country": "India", "country_code": "IN", "continent": "Asia", "continent_code": "AS", "region": "South Asia", "region_code": "SAS"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%chai%' OR
  name ILIKE '%darjeeling%' OR
  name ILIKE '%assam%' OR
  name ILIKE '%masala%'
);

-- Tè britannici
UPDATE tea SET origin = '{"region_type": "country", "country": "United Kingdom", "country_code": "GB", "continent": "Europe", "continent_code": "EU", "region": "British Isles", "region_code": "BRI"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%earl grey%' OR
  name ILIKE '%english breakfast%' OR
  name ILIKE '%afternoon%'
);

-- Bubble tea taiwanese
UPDATE tea SET origin = '{"region_type": "country", "country": "Taiwan", "country_code": "TW", "continent": "Asia", "continent_code": "AS", "region": "East Asia", "region_code": "EAS"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%bubble%' OR
  name ILIKE '%boba%' OR
  name ILIKE '%tapioca%' OR
  name ILIKE '%milk tea%'
);

-- Default per tè rimanenti: Asia (origine del tè)
UPDATE tea SET origin = '{"region_type": "continent", "continent": "Asia", "continent_code": "AS"}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 5: SMOOTHIES - Mostly global/tropical
-- =====================================================

-- Smoothies tropicali
UPDATE smoothies SET origin = '{"region_type": "region", "region": "Tropical", "region_code": "TRO", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%tropical%' OR
  name ILIKE '%mango%' OR
  name ILIKE '%pineapple%' OR
  name ILIKE '%papaya%' OR
  name ILIKE '%passion%' OR
  name ILIKE '%coconut%'
);

-- Açaí brasiliano
UPDATE smoothies SET origin = '{"region_type": "country", "country": "Brazil", "country_code": "BR", "continent": "South America", "continent_code": "SA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%acai%' OR
  name ILIKE '%açaí%'
);

-- Default smoothies: globale
UPDATE smoothies SET origin = '{"region_type": "global", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 6: MILKSHAKES - USA origin (invented there)
-- =====================================================

UPDATE milkshakes SET origin = '{"region_type": "country", "country": "USA", "country_code": "US", "continent": "North America", "continent_code": "NA", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 7: HOT BEVERAGES
-- =====================================================

-- Cioccolata calda (Messico/Spagna origine storica)
UPDATE hotbeverages SET origin = '{"region_type": "country", "country": "Mexico", "country_code": "MX", "continent": "North America", "continent_code": "NA", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%chocolate%' OR
  name ILIKE '%cocoa%' OR
  name ILIKE '%cacao%'
);

-- Chai indiano
UPDATE hotbeverages SET origin = '{"region_type": "country", "country": "India", "country_code": "IN", "continent": "Asia", "continent_code": "AS", "region": "South Asia", "region_code": "SAS"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%chai%' OR
  name ILIKE '%masala%'
);

-- Default hot beverages: globale
UPDATE hotbeverages SET origin = '{"region_type": "global", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 8: MOCKTAILS - Mostly global
-- =====================================================

-- Virgin versions of famous cocktails inherit origin
UPDATE mocktails SET origin = '{"region_type": "country", "country": "Cuba", "country_code": "CU", "continent": "North America", "continent_code": "NA", "region": "Caribbean", "region_code": "CAR"}'::jsonb
WHERE origin = '{}'::jsonb AND name ILIKE '%mojito%';

UPDATE mocktails SET origin = '{"region_type": "region", "region": "Caribbean", "region_code": "CAR", "continent": "North America", "continent_code": "NA"}'::jsonb
WHERE origin = '{}'::jsonb AND name ILIKE '%colada%';

-- Default mocktails: globale
UPDATE mocktails SET origin = '{"region_type": "global", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 9: SOFT DRINKS - Origine per brand
-- =====================================================

-- Coca-Cola, Pepsi, etc. (USA)
UPDATE softdrinks SET origin = '{"region_type": "country", "country": "USA", "country_code": "US", "continent": "North America", "continent_code": "NA", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%coca%' OR
  name ILIKE '%pepsi%' OR
  name ILIKE '%sprite%' OR
  name ILIKE '%fanta%' OR
  name ILIKE '%dr pepper%' OR
  name ILIKE '%mountain dew%' OR
  name ILIKE '%7up%' OR
  name ILIKE '%ginger ale%'
);

-- Irn-Bru (Scozia)
UPDATE softdrinks SET origin = '{"region_type": "country", "country": "United Kingdom", "country_code": "GB", "continent": "Europe", "continent_code": "EU", "local_region": "Scotland"}'::jsonb
WHERE origin = '{}'::jsonb AND name ILIKE '%irn%bru%';

-- Orangina (Francia)
UPDATE softdrinks SET origin = '{"region_type": "country", "country": "France", "country_code": "FR", "continent": "Europe", "continent_code": "EU"}'::jsonb
WHERE origin = '{}'::jsonb AND name ILIKE '%orangina%';

-- Default soft drinks: globale
UPDATE softdrinks SET origin = '{"region_type": "global", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 10: WATERS - Origine per brand/sorgente
-- =====================================================

-- Acque italiane
UPDATE waters SET origin = '{"region_type": "country", "country": "Italy", "country_code": "IT", "continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%san pellegrino%' OR
  name ILIKE '%acqua panna%' OR
  name ILIKE '%ferrarelle%' OR
  name ILIKE '%lurisia%'
);

-- Acque francesi
UPDATE waters SET origin = '{"region_type": "country", "country": "France", "country_code": "FR", "continent": "Europe", "continent_code": "EU"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%evian%' OR
  name ILIKE '%perrier%' OR
  name ILIKE '%vittel%' OR
  name ILIKE '%volvic%' OR
  name ILIKE '%badoit%'
);

-- Fiji Water
UPDATE waters SET origin = '{"region_type": "country", "country": "Fiji", "country_code": "FJ", "continent": "Oceania", "continent_code": "OC", "region": "Pacific Islands", "region_code": "PAC"}'::jsonb
WHERE origin = '{}'::jsonb AND name ILIKE '%fiji%';

-- Acque norvegesi
UPDATE waters SET origin = '{"region_type": "country", "country": "Norway", "country_code": "NO", "continent": "Europe", "continent_code": "EU", "region": "Scandinavia", "region_code": "SCA"}'::jsonb
WHERE origin = '{}'::jsonb AND name ILIKE '%voss%';

-- Acque tedesche
UPDATE waters SET origin = '{"region_type": "country", "country": "Germany", "country_code": "DE", "continent": "Europe", "continent_code": "EU", "region": "Central Europe", "region_code": "CEU"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%gerolsteiner%' OR
  name ILIKE '%apollinaris%'
);

-- Acque spagnole
UPDATE waters SET origin = '{"region_type": "country", "country": "Spain", "country_code": "ES", "continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
WHERE origin = '{}'::jsonb AND name ILIKE '%vichy catalan%';

-- Acque USA
UPDATE waters SET origin = '{"region_type": "country", "country": "USA", "country_code": "US", "continent": "North America", "continent_code": "NA"}'::jsonb
WHERE origin = '{}'::jsonb AND (
  name ILIKE '%poland spring%' OR
  name ILIKE '%dasani%' OR
  name ILIKE '%aquafina%' OR
  name ILIKE '%smartwater%'
);

-- Default waters: generico
UPDATE waters SET origin = '{"region_type": "global", "is_international": true}'::jsonb
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 11: Creare indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_cocktails_origin_country ON cocktails ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_coffee_origin_country ON coffee ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_tea_origin_country ON tea ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_smoothies_origin_country ON smoothies ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_milkshakes_origin_country ON milkshakes ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_hotbeverages_origin_country ON hotbeverages ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_mocktails_origin_country ON mocktails ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_softdrinks_origin_country ON softdrinks ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_waters_origin_country ON waters ((origin->>'country_code'));

-- =====================================================
-- END OF SCRIPT
-- =====================================================
