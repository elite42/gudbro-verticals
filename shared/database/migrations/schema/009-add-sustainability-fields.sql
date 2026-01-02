-- ============================================
-- SUSTAINABILITY - Campi sostenibilità su ingredients
-- Campi opzionali (NULL default) per uso futuro
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- NOTA IMPORTANTE:
-- Questi campi sono OPZIONALI. La maggior parte dei ristoranti
-- non ha accesso a questi dati. I campi sono predisposti per:
-- 1. Clienti enterprise con supply chain tracciata
-- 2. Integrazione futura con database LCA (Klimato, Eaternity)
-- 3. Ristoranti con certificazioni (bio, MSC, fair trade)
--
-- NON popolare con dati inventati - rischio greenwashing.
-- =====================================================

-- =====================================================
-- STEP 1: Aggiungere campi su ingredients
-- =====================================================

-- Score generale sostenibilità (0-100)
-- Considera: impatto ambientale, etica, certificazioni
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS sustainability_score INTEGER
CHECK (sustainability_score >= 0 AND sustainability_score <= 100);

-- Carbon footprint in kg CO2 equivalente per kg di prodotto
-- Fonte tipica: database LCA (Life Cycle Assessment)
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS carbon_footprint_kg DECIMAL(6,3);

-- Metodo di produzione (opzionale)
-- Influenza significativamente il carbon footprint
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS production_method TEXT
CHECK (production_method IN (
  'conventional',      -- Agricoltura/allevamento convenzionale
  'organic',           -- Biologico certificato
  'biodynamic',        -- Biodinamico
  'greenhouse',        -- Serra (può avere alto impatto energetico)
  'open_field',        -- Campo aperto
  'wild_caught',       -- Pescato (non allevato)
  'farm_raised',       -- Allevato (acquacoltura)
  'free_range',        -- Allevamento all'aperto
  'cage_free',         -- Senza gabbie
  'grass_fed',         -- Alimentato a erba
  'grain_fed',         -- Alimentato a cereali
  'hydroponic',        -- Idroponico
  'vertical_farm'      -- Vertical farming
));

-- Stagionalità
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS is_seasonal BOOLEAN DEFAULT NULL;

-- Mesi di stagione (1-12, es. {6,7,8,9} = giu-set)
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS season_months INTEGER[] DEFAULT NULL;

-- =====================================================
-- STEP 2: Creare indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_ingredients_sustainability
ON ingredients(sustainability_score)
WHERE sustainability_score IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ingredients_carbon
ON ingredients(carbon_footprint_kg)
WHERE carbon_footprint_kg IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ingredients_production
ON ingredients(production_method)
WHERE production_method IS NOT NULL;

-- =====================================================
-- STEP 3: Commenti per documentazione
-- =====================================================

COMMENT ON COLUMN ingredients.sustainability_score IS
'Score 0-100. NULL = dato non disponibile. Fonti: certificazioni, database LCA.';

COMMENT ON COLUMN ingredients.carbon_footprint_kg IS
'kg CO2eq per kg di prodotto. NULL = dato non disponibile. Fonti: Klimato, Eaternity, Our World in Data.';

COMMENT ON COLUMN ingredients.production_method IS
'Metodo di produzione. Influenza carbon footprint. NULL = non specificato.';

COMMENT ON COLUMN ingredients.is_seasonal IS
'TRUE = prodotto stagionale, FALSE = disponibile tutto anno, NULL = non specificato.';

COMMENT ON COLUMN ingredients.season_months IS
'Array mesi disponibilità (1-12). Es: {6,7,8,9} = giugno-settembre. NULL = non specificato.';

-- =====================================================
-- STEP 4: Query di esempio
-- =====================================================

-- Ingredienti con dati sostenibilità disponibili
-- SELECT id, name, sustainability_score, carbon_footprint_kg, production_method
-- FROM ingredients
-- WHERE sustainability_score IS NOT NULL
-- ORDER BY sustainability_score DESC;

-- Carbon footprint totale di un piatto (quando i dati sono disponibili)
-- SELECT
--   p.name as dish,
--   SUM(i.carbon_footprint_kg * pi.quantity_amount / 1000) as total_carbon_kg,
--   COUNT(CASE WHEN i.carbon_footprint_kg IS NULL THEN 1 END) as missing_data_count
-- FROM pasta p
-- JOIN product_ingredients pi ON pi.product_id = p.id AND pi.product_type = 'pasta'
-- JOIN ingredients i ON i.id = pi.ingredient_id
-- WHERE p.id = 'PAS_CARBONARA'
-- GROUP BY p.name;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
