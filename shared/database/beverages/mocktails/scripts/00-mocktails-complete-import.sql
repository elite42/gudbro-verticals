-- ============================================
-- MOCKTAILS Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create mocktails table
CREATE TABLE IF NOT EXISTS mocktails (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('virgin_classics', 'fruit_based', 'sparkling', 'creamy', 'tea_based', 'herbal', 'tropical', 'citrus')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium')),
    base TEXT NOT NULL CHECK (base IN ('soda', 'juice', 'tea', 'coconut', 'cream', 'tonic', 'ginger_ale', 'sparkling_water')),
    glass_type TEXT NOT NULL CHECK (glass_type IN ('highball', 'collins', 'hurricane', 'martini', 'margarita', 'wine', 'champagne', 'rocks', 'copper_mug', 'mason_jar')),
    serving_size_ml INTEGER NOT NULL,

    -- Garnish
    garnish TEXT,

    -- Nutritional Info
    calories_per_serving INTEGER DEFAULT 0,
    sugar_g INTEGER DEFAULT 0,

    -- Product Flags
    is_carbonated BOOLEAN DEFAULT false,
    is_frozen BOOLEAN DEFAULT false,
    is_kid_friendly BOOLEAN DEFAULT true,

    -- Flavor profile and inspiration
    flavor_profile TEXT[] DEFAULT '{}',
    inspired_by TEXT,

    -- Sistema 5 Dimensioni - Standard fields
    allergens TEXT[] DEFAULT '{}',
    is_gluten_free BOOLEAN DEFAULT true,
    is_dairy_free BOOLEAN DEFAULT true,
    is_nut_free BOOLEAN DEFAULT true,
    is_vegan BOOLEAN DEFAULT true,
    is_vegetarian BOOLEAN DEFAULT true,
    is_halal BOOLEAN DEFAULT true,
    is_kosher BOOLEAN DEFAULT true,
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- Metadata
    tags TEXT[] DEFAULT '{}',
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    origin_country TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_mocktails_category ON mocktails(category);
CREATE INDEX IF NOT EXISTS idx_mocktails_status ON mocktails(status);
CREATE INDEX IF NOT EXISTS idx_mocktails_base ON mocktails(base);
CREATE INDEX IF NOT EXISTS idx_mocktails_glass_type ON mocktails(glass_type);
CREATE INDEX IF NOT EXISTS idx_mocktails_is_carbonated ON mocktails(is_carbonated);
CREATE INDEX IF NOT EXISTS idx_mocktails_is_frozen ON mocktails(is_frozen);
CREATE INDEX IF NOT EXISTS idx_mocktails_is_kid_friendly ON mocktails(is_kid_friendly);
CREATE INDEX IF NOT EXISTS idx_mocktails_popularity ON mocktails(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_mocktails_tags ON mocktails USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_mocktails_allergens ON mocktails USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_mocktails_flavor_profile ON mocktails USING GIN(flavor_profile);

-- Enable RLS
ALTER TABLE mocktails ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON mocktails;
CREATE POLICY "Public read access" ON mocktails
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON mocktails;
CREATE POLICY "Service write access" ON mocktails
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_mocktails_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mocktails_updated_at ON mocktails;
CREATE TRIGGER mocktails_updated_at
    BEFORE UPDATE ON mocktails
    FOR EACH ROW
    EXECUTE FUNCTION update_mocktails_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'mocktails', 'bar_menu', 'beverage', 'cocktail', 'Mocktails', 34, '🍹', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'mocktails');

-- Grant permissions
GRANT SELECT ON mocktails TO anon;
GRANT SELECT ON mocktails TO authenticated;

-- Comments
COMMENT ON TABLE mocktails IS 'GUDBRO Mocktails catalog - 38 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN mocktails.category IS 'virgin_classics, fruit_based, sparkling, creamy, tea_based, herbal, tropical, citrus';
COMMENT ON COLUMN mocktails.base IS 'soda, juice, tea, coconut, cream, tonic, ginger_ale, sparkling_water';
COMMENT ON COLUMN mocktails.glass_type IS 'highball, collins, hurricane, martini, margarita, wine, champagne, rocks, copper_mug, mason_jar';
-- ============================================
-- MOCKTAILS - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- Total: 32 new ingredients
-- ============================================

-- Insert missing ingredients for mocktails (JSONB format)
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES

-- Syrups & Sweeteners
('ING_GRENADINE', 'grenadine', 'Grenadine', 'Sweet pomegranate-flavored syrup with red color', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_SIMPLE_SYRUP', 'simple-syrup', 'Simple Syrup', 'Basic sugar and water syrup for sweetening drinks', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_AGAVE_SYRUP', 'agave-syrup', 'Agave Syrup', 'Natural sweetener from agave plant', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_LAVENDER_SYRUP', 'lavender-syrup', 'Lavender Syrup', 'Floral syrup infused with culinary lavender', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Sodas & Mixers
('ING_SODA_WATER', 'soda-water', 'Soda Water', 'Carbonated water for mixing', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_SPARKLING_WATER', 'sparkling-water', 'Sparkling Water', 'Naturally carbonated mineral water', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_GINGER_ALE', 'ginger-ale', 'Ginger Ale', 'Carbonated ginger-flavored soft drink', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_GINGER_BEER', 'ginger-beer', 'Ginger Beer', 'Spicy fermented ginger beverage', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_COLA', 'cola', 'Cola', 'Classic carbonated cola beverage', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_LEMONADE', 'lemonade', 'Lemonade', 'Classic lemon and sugar drink', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Juices & Purees
('ING_CRANBERRY_JUICE', 'cranberry-juice', 'Cranberry Juice', 'Tart juice from cranberries', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_TOMATO_JUICE', 'tomato-juice', 'Tomato Juice', 'Savory juice from ripe tomatoes', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_APPLE_JUICE', 'apple-juice', 'Apple Juice', 'Sweet juice from pressed apples', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_APPLE_CIDER', 'apple-cider', 'Apple Cider', 'Unfiltered apple juice with spices', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_WATERMELON_JUICE', 'watermelon-juice', 'Watermelon Juice', 'Fresh juice from ripe watermelon', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_PEACH_NECTAR', 'peach-nectar', 'Peach Nectar', 'Sweet thick peach juice', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_PEACH_PUREE', 'peach-puree', 'Peach Puree', 'Smooth pureed peach for cocktails', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_MANGO_PUREE', 'mango-puree', 'Mango Puree', 'Smooth pureed mango for cocktails', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_STRAWBERRY_PUREE', 'strawberry-puree', 'Strawberry Puree', 'Smooth pureed strawberries', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_PASSION_FRUIT_PUREE', 'passion-fruit-puree', 'Passion Fruit Puree', 'Exotic passion fruit puree', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_MIXED_BERRIES', 'mixed-berries', 'Mixed Berries', 'Blend of strawberries, blueberries, raspberries', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Garnishes & Extras
('ING_MARASCHINO_CHERRY', 'maraschino-cherry', 'Maraschino Cherry', 'Preserved cherry for cocktail garnish', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_ICE', 'ice', 'Ice', 'Frozen water cubes for drinks', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Herbs & Aromatics
('ING_ROSEMARY', 'rosemary', 'Rosemary', 'Aromatic herb with pine-like fragrance', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_LEMONGRASS', 'lemongrass', 'Lemongrass', 'Citrusy tropical herb', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Tea & Infusions
('ING_HIBISCUS_TEA', 'hibiscus-tea', 'Hibiscus Tea', 'Tart red tea from hibiscus flowers', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_MATCHA_POWDER', 'matcha-powder', 'Matcha Powder', 'Finely ground green tea powder', 'herbs',
 '[]'::jsonb, '["caffeine"]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Dairy & Alternatives
('ING_VANILLA_ICE_CREAM', 'vanilla-ice-cream', 'Vanilla Ice Cream', 'Classic vanilla flavored ice cream', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

('ING_WHIPPED_CREAM', 'whipped-cream', 'Whipped Cream', 'Aerated sweetened cream', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

('ING_YOGURT', 'yogurt', 'Yogurt', 'Cultured dairy product', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- Spices & Sauces
('ING_HOT_SAUCE', 'hot-sauce', 'Hot Sauce', 'Spicy pepper-based sauce', 'condiments',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_BLUE_SPIRULINA', 'blue-spirulina', 'Blue Spirulina', 'Natural blue coloring from algae', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Chocolate & Dessert
('ING_CHOCOLATE_SYRUP', 'chocolate-syrup', 'Chocolate Syrup', 'Sweet chocolate flavored syrup for drinks and desserts', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
-- ============================================
-- MOCKTAILS - Data Import
-- GUDBRO Database Standards v1.3
-- Total: 38 mocktails
-- ============================================

INSERT INTO mocktails (id, slug, name, description, category, status, base, glass_type, serving_size_ml, garnish, calories_per_serving, sugar_g, is_carbonated, is_frozen, is_kid_friendly, flavor_profile, inspired_by, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- ============================================
-- VIRGIN CLASSICS (8 items)
-- ============================================
('MCK_VIRGIN_MOJITO', 'virgin-mojito', 'Virgin Mojito', 'Refreshing Cuban-inspired mocktail with fresh mint, lime, and soda water. All the refreshment of a classic mojito without the rum.', 'virgin_classics', 'classic', 'soda', 'highball', 350, 'Fresh mint sprig and lime wheel', 80, 18, true, false, true, ARRAY['refreshing', 'citrus', 'herbal', 'sweet'], 'Mojito', '{}', true, true, true, true, true, true, true, 0, ARRAY['summer', 'refreshing', 'mint', 'classic'], 95, 'Cuba'),
('MCK_VIRGIN_MARGARITA', 'virgin-margarita', 'Virgin Margarita', 'Tangy and refreshing lime-based mocktail with a salted rim. The perfect alcohol-free version of the world''s most popular cocktail.', 'virgin_classics', 'popular', 'juice', 'margarita', 300, 'Lime wedge and salt rim', 120, 24, false, false, true, ARRAY['tangy', 'citrus', 'sweet', 'sour'], 'Margarita', '{}', true, true, true, true, true, true, true, 0, ARRAY['mexican', 'citrus', 'classic', 'summer'], 90, 'Mexico'),
('MCK_VIRGIN_PINA_COLADA', 'virgin-pina-colada', 'Virgin Pina Colada', 'Creamy tropical blend of coconut cream and pineapple juice. A Caribbean paradise in a glass without the rum.', 'virgin_classics', 'classic', 'coconut', 'hurricane', 400, 'Pineapple wedge and maraschino cherry', 280, 42, false, true, true, ARRAY['tropical', 'creamy', 'sweet', 'coconut'], 'Pina Colada', '{}', true, true, false, true, true, true, true, 0, ARRAY['tropical', 'caribbean', 'frozen', 'summer'], 88, 'Puerto Rico'),
('MCK_VIRGIN_BLOODY_MARY', 'virgin-bloody-mary', 'Virgin Mary', 'Savory tomato-based mocktail with celery, Worcestershire, and a kick of hot sauce. Perfect brunch companion.', 'virgin_classics', 'classic', 'juice', 'highball', 350, 'Celery stalk, lemon wedge, olives', 50, 8, false, false, false, ARRAY['savory', 'spicy', 'tangy', 'umami'], 'Bloody Mary', '{}', false, true, true, false, true, true, false, 2, ARRAY['brunch', 'savory', 'spicy', 'classic'], 75, 'United States'),
('MCK_VIRGIN_COSMOPOLITAN', 'virgin-cosmopolitan', 'Virgin Cosmopolitan', 'Elegant pink mocktail with cranberry, lime, and a hint of orange. Sophisticated and refreshing.', 'virgin_classics', 'popular', 'juice', 'martini', 240, 'Orange twist or lime wheel', 110, 22, false, false, true, ARRAY['fruity', 'tart', 'citrus', 'elegant'], 'Cosmopolitan', '{}', true, true, true, true, true, true, true, 0, ARRAY['elegant', 'pink', 'classic', 'sophisticated'], 82, 'United States'),
('MCK_VIRGIN_PALOMA', 'virgin-paloma', 'Virgin Paloma', 'Refreshing Mexican-inspired grapefruit and lime mocktail topped with sparkling water. Tangy and effervescent.', 'virgin_classics', 'popular', 'sparkling_water', 'highball', 350, 'Grapefruit slice and salt rim', 95, 18, true, false, true, ARRAY['tangy', 'citrus', 'refreshing', 'bitter'], 'Paloma', '{}', true, true, true, true, true, true, true, 0, ARRAY['mexican', 'citrus', 'refreshing', 'summer'], 78, 'Mexico'),
('MCK_VIRGIN_MOSCOW_MULE', 'virgin-moscow-mule', 'Virgin Moscow Mule', 'Spicy ginger beer mixed with fresh lime juice, served in a copper mug. Bold ginger flavor without the vodka.', 'virgin_classics', 'popular', 'ginger_ale', 'copper_mug', 350, 'Lime wheel and fresh mint', 140, 32, true, false, true, ARRAY['spicy', 'ginger', 'citrus', 'refreshing'], 'Moscow Mule', '{}', true, true, true, true, true, true, true, 1, ARRAY['ginger', 'copper-mug', 'classic', 'spicy'], 80, 'United States'),
('MCK_VIRGIN_DAIQUIRI', 'virgin-daiquiri', 'Virgin Daiquiri', 'Frozen or shaken lime and sugar mocktail. The pure essence of a Cuban classic without the rum.', 'virgin_classics', 'classic', 'juice', 'martini', 280, 'Lime wheel', 90, 20, false, true, true, ARRAY['citrus', 'sweet', 'tart', 'refreshing'], 'Daiquiri', '{}', true, true, true, true, true, true, true, 0, ARRAY['cuban', 'frozen', 'classic', 'lime'], 72, 'Cuba'),

-- ============================================
-- ICONIC MOCKTAILS (8 items)
-- ============================================
('MCK_SHIRLEY_TEMPLE', 'shirley-temple', 'Shirley Temple', 'The original mocktail from 1930s Hollywood. Ginger ale with grenadine and a maraschino cherry. Named after the famous child actress.', 'sparkling', 'classic', 'ginger_ale', 'highball', 350, 'Maraschino cherry and orange slice', 150, 35, true, false, true, ARRAY['sweet', 'fruity', 'fizzy'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['classic', 'kids', 'retro', 'hollywood'], 98, 'United States'),
('MCK_ROY_ROGERS', 'roy-rogers', 'Roy Rogers', 'The masculine counterpart to Shirley Temple. Cola with grenadine and a maraschino cherry. Named after the cowboy actor.', 'sparkling', 'classic', 'soda', 'highball', 350, 'Maraschino cherry', 180, 42, true, false, true, ARRAY['sweet', 'cola', 'fizzy'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['classic', 'kids', 'retro', 'cowboy'], 85, 'United States'),
('MCK_ARNOLD_PALMER', 'arnold-palmer', 'Arnold Palmer', 'The legendary half-and-half of iced tea and lemonade. Named after the golf legend who popularized this refreshing combination.', 'tea_based', 'classic', 'tea', 'highball', 400, 'Lemon wedge', 100, 24, false, false, true, ARRAY['refreshing', 'citrus', 'tea', 'sweet'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['golf', 'summer', 'classic', 'american'], 92, 'United States'),
('MCK_CINDERELLA', 'cinderella', 'Cinderella', 'A fairytale blend of pineapple, orange, and lemon juices with a splash of grenadine. Elegant and refreshing.', 'fruit_based', 'classic', 'juice', 'champagne', 250, 'Orange twist and cherry', 130, 28, true, false, true, ARRAY['fruity', 'sweet', 'citrus', 'elegant'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['elegant', 'kids', 'party', 'fairytale'], 75, 'United States'),
('MCK_SAFE_SEX_ON_THE_BEACH', 'safe-sex-on-the-beach', 'Safe Sex on the Beach', 'The virgin version of the famous beach cocktail. Peach nectar with orange and cranberry juices.', 'fruit_based', 'popular', 'juice', 'highball', 350, 'Orange slice and cherry', 160, 36, false, false, true, ARRAY['fruity', 'sweet', 'tropical', 'peachy'], 'Sex on the Beach', '{}', true, true, true, true, true, true, true, 0, ARRAY['beach', 'summer', 'fruity', 'party'], 78, 'United States'),
('MCK_VIRGIN_MIMOSA', 'virgin-mimosa', 'Virgin Mimosa', 'Brunch favorite without the champagne. Fresh orange juice with sparkling water for a bubbly, refreshing experience.', 'sparkling', 'popular', 'sparkling_water', 'champagne', 200, 'Orange twist', 60, 12, true, false, true, ARRAY['citrus', 'fizzy', 'light', 'refreshing'], 'Mimosa', '{}', true, true, true, true, true, true, true, 0, ARRAY['brunch', 'elegant', 'morning', 'celebration'], 85, 'France'),
('MCK_VIRGIN_BELLINI', 'virgin-bellini', 'Virgin Bellini', 'Venetian elegance without the prosecco. White peach puree topped with sparkling water.', 'sparkling', 'popular', 'sparkling_water', 'champagne', 200, 'Peach slice', 70, 14, true, false, true, ARRAY['peachy', 'fizzy', 'elegant', 'sweet'], 'Bellini', '{}', true, true, true, true, true, true, true, 0, ARRAY['italian', 'brunch', 'elegant', 'celebration'], 80, 'Italy'),
('MCK_NOJITO', 'nojito', 'Nojito', 'A popular branded name for virgin mojito. Extra refreshing with muddled mint and lime.', 'herbal', 'popular', 'soda', 'highball', 350, 'Mint bouquet and lime wheel', 85, 18, true, false, true, ARRAY['refreshing', 'minty', 'citrus', 'fizzy'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['branded', 'mint', 'summer', 'refreshing'], 88, 'United States'),

-- ============================================
-- TROPICAL & FRUITY (8 items)
-- ============================================
('MCK_TROPICAL_SUNRISE', 'tropical-sunrise', 'Tropical Sunrise', 'A layered masterpiece of orange juice, pineapple, and grenadine creating a beautiful sunrise effect.', 'tropical', 'popular', 'juice', 'highball', 350, 'Orange slice and cherry', 140, 32, false, false, true, ARRAY['tropical', 'sweet', 'fruity', 'citrus'], 'Tequila Sunrise', '{}', true, true, true, true, true, true, true, 0, ARRAY['sunrise', 'layered', 'colorful', 'summer'], 85, 'United States'),
('MCK_MANGO_TANGO', 'mango-tango', 'Mango Tango', 'Vibrant mango puree blended with orange and passion fruit juices. A tropical dance of flavors.', 'tropical', 'popular', 'juice', 'hurricane', 400, 'Mango slice', 180, 38, false, true, true, ARRAY['tropical', 'mango', 'sweet', 'exotic'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['tropical', 'mango', 'summer', 'frozen'], 82, 'United States'),
('MCK_BERRY_BLAST', 'berry-blast', 'Berry Blast', 'A burst of mixed berries blended with apple juice and a hint of lime. Deep purple and packed with antioxidants.', 'fruit_based', 'popular', 'juice', 'highball', 350, 'Fresh berries on a pick', 130, 28, false, true, true, ARRAY['berry', 'sweet', 'tangy', 'fruity'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['berries', 'antioxidants', 'healthy', 'colorful'], 80, 'United States'),
('MCK_PASSION_FRUIT_FIZZ', 'passion-fruit-fizz', 'Passion Fruit Fizz', 'Exotic passion fruit puree topped with sparkling water. Tart, tropical, and effervescent.', 'tropical', 'signature', 'sparkling_water', 'collins', 300, 'Passion fruit half', 100, 20, true, false, true, ARRAY['tropical', 'tart', 'fizzy', 'exotic'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['passion-fruit', 'exotic', 'fizzy', 'tropical'], 78, 'Brazil'),
('MCK_WATERMELON_COOLER', 'watermelon-cooler', 'Watermelon Cooler', 'Fresh watermelon juice with a hint of mint and lime. The ultimate summer refreshment.', 'fruit_based', 'seasonal', 'juice', 'highball', 400, 'Watermelon wedge and mint sprig', 90, 18, false, false, true, ARRAY['refreshing', 'watermelon', 'light', 'minty'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['summer', 'watermelon', 'refreshing', 'seasonal'], 85, 'United States'),
('MCK_STRAWBERRY_LEMONADE', 'strawberry-lemonade', 'Strawberry Lemonade', 'Classic lemonade elevated with fresh strawberry puree. Sweet, tart, and perfectly balanced.', 'fruit_based', 'popular', 'juice', 'mason_jar', 400, 'Strawberry and lemon wheel', 120, 26, false, false, true, ARRAY['sweet', 'tart', 'fruity', 'refreshing'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['lemonade', 'strawberry', 'summer', 'classic'], 90, 'United States'),
('MCK_BLUE_LAGOON_MOCKTAIL', 'blue-lagoon-mocktail', 'Blue Lagoon Mocktail', 'Stunning blue curacao-free version using blue spirulina. Citrusy and visually striking.', 'citrus', 'signature', 'soda', 'highball', 350, 'Lemon wheel and cherry', 110, 24, false, false, true, ARRAY['citrus', 'sweet', 'refreshing', 'tropical'], 'Blue Lagoon', '{}', true, true, true, true, true, true, true, 0, ARRAY['blue', 'colorful', 'party', 'instagram'], 82, 'United States'),
('MCK_VIRGIN_PINEAPPLE_COCONUT', 'virgin-pineapple-coconut', 'Pineapple Coconut Bliss', 'Creamy coconut milk blended with fresh pineapple juice. A tropical escape in every sip.', 'tropical', 'popular', 'coconut', 'hurricane', 350, 'Pineapple leaf and toasted coconut', 220, 32, false, true, true, ARRAY['tropical', 'creamy', 'coconut', 'sweet'], NULL, '{}', true, true, false, true, true, true, true, 0, ARRAY['tropical', 'coconut', 'frozen', 'beach'], 80, 'United States'),

-- ============================================
-- SPECIALTY (8 items)
-- ============================================
('MCK_LAVENDER_LEMONADE', 'lavender-lemonade', 'Lavender Lemonade', 'Elegant lemonade infused with culinary lavender. Floral, refreshing, and sophisticated.', 'herbal', 'premium', 'juice', 'wine', 300, 'Fresh lavender sprig', 90, 20, false, false, true, ARRAY['floral', 'citrus', 'elegant', 'refreshing'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['lavender', 'elegant', 'floral', 'premium'], 75, 'France'),
('MCK_CUCUMBER_MINT_COOLER', 'cucumber-mint-cooler', 'Cucumber Mint Cooler', 'Spa-inspired refreshment with muddled cucumber and fresh mint. Light, hydrating, and incredibly refreshing.', 'herbal', 'premium', 'sparkling_water', 'collins', 350, 'Cucumber ribbon and mint sprig', 45, 8, true, false, true, ARRAY['refreshing', 'light', 'herbal', 'crisp'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['spa', 'cucumber', 'healthy', 'refreshing'], 78, 'United States'),
('MCK_GINGER_LEMONGRASS_COOLER', 'ginger-lemongrass-cooler', 'Ginger Lemongrass Cooler', 'Asian-inspired mocktail with fresh ginger and lemongrass. Aromatic, spicy, and invigorating.', 'herbal', 'signature', 'sparkling_water', 'highball', 350, 'Lemongrass stalk and ginger slice', 60, 12, true, false, false, ARRAY['spicy', 'aromatic', 'citrus', 'refreshing'], NULL, '{}', true, true, true, true, true, true, true, 1, ARRAY['asian', 'ginger', 'lemongrass', 'aromatic'], 72, 'Thailand'),
('MCK_CRANBERRY_FIZZ', 'cranberry-fizz', 'Cranberry Fizz', 'Festive and elegant cranberry mocktail with sparkling water and rosemary. Perfect for celebrations.', 'sparkling', 'seasonal', 'sparkling_water', 'champagne', 250, 'Fresh cranberries and rosemary sprig', 85, 18, true, false, true, ARRAY['tart', 'festive', 'herbal', 'fizzy'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['holiday', 'festive', 'cranberry', 'elegant'], 88, 'United States'),
('MCK_CHAI_SPICED_CIDER', 'chai-spiced-cider', 'Chai Spiced Cider', 'Warm apple cider infused with chai spices. Cozy, aromatic, and perfect for cool weather.', 'tea_based', 'seasonal', 'juice', 'rocks', 300, 'Cinnamon stick and star anise', 140, 28, false, false, true, ARRAY['spiced', 'warm', 'apple', 'cozy'], NULL, '{}', true, true, true, true, true, true, true, 1, ARRAY['fall', 'winter', 'warm', 'chai', 'seasonal'], 82, 'United States'),
('MCK_HIBISCUS_COOLER', 'hibiscus-cooler', 'Hibiscus Cooler', 'Vibrant red hibiscus tea cooler with citrus. Tart, floral, and visually stunning.', 'tea_based', 'premium', 'tea', 'highball', 350, 'Dried hibiscus flower and orange wheel', 80, 16, false, false, true, ARRAY['floral', 'tart', 'citrus', 'refreshing'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['hibiscus', 'floral', 'colorful', 'healthy'], 75, 'Mexico'),
('MCK_VIRGIN_SANGRIA', 'virgin-sangria', 'Virgin Sangria', 'Spanish-inspired fruit punch with grape juice and fresh fruits. Festive and refreshing.', 'fruit_based', 'popular', 'juice', 'wine', 350, 'Assorted fresh fruit', 130, 28, true, false, true, ARRAY['fruity', 'sweet', 'refreshing', 'festive'], 'Sangria', '{}', true, true, true, true, true, true, true, 0, ARRAY['spanish', 'party', 'fruity', 'punch'], 85, 'Spain'),
('MCK_MATCHA_LEMONADE', 'matcha-lemonade', 'Matcha Lemonade', 'Japanese-inspired fusion of earthy matcha and bright lemon. Unique, energizing, and Instagram-worthy.', 'tea_based', 'premium', 'tea', 'highball', 350, 'Lemon wheel', 70, 14, false, false, true, ARRAY['earthy', 'citrus', 'unique', 'refreshing'], NULL, '{}', true, true, true, true, true, true, true, 0, ARRAY['japanese', 'matcha', 'healthy', 'trendy'], 78, 'Japan'),

-- ============================================
-- CREAMY & FROZEN (6 items)
-- ============================================
('MCK_VIRGIN_MUDSLIDE', 'virgin-mudslide', 'Virgin Mudslide', 'Rich and creamy chocolate mocktail blended with vanilla ice cream. Indulgent dessert in a glass.', 'creamy', 'popular', 'cream', 'hurricane', 350, 'Whipped cream and chocolate drizzle', 380, 48, false, true, true, ARRAY['chocolate', 'creamy', 'sweet', 'indulgent'], 'Mudslide', ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['dessert', 'chocolate', 'frozen', 'indulgent'], 80, 'United States'),
('MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'strawberry-milkshake-mocktail', 'Strawberry Dream', 'Luscious strawberry milkshake meets mocktail. Fresh strawberries blended with vanilla cream.', 'creamy', 'popular', 'cream', 'highball', 400, 'Fresh strawberry and whipped cream', 320, 42, false, true, true, ARRAY['strawberry', 'creamy', 'sweet', 'vanilla'], NULL, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['milkshake', 'strawberry', 'kids', 'dessert'], 85, 'United States'),
('MCK_ORANGE_CREAMSICLE', 'orange-creamsicle', 'Orange Creamsicle', 'Nostalgic orange cream flavor in mocktail form. Orange juice blended with vanilla cream.', 'creamy', 'classic', 'cream', 'highball', 350, 'Orange wheel and vanilla wafer', 290, 38, false, true, true, ARRAY['orange', 'vanilla', 'creamy', 'nostalgic'], NULL, ARRAY['dairy'], false, false, true, false, true, true, true, 0, ARRAY['classic', 'orange', 'nostalgic', 'kids'], 82, 'United States'),
('MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'frozen-strawberry-daiquiri', 'Frozen Strawberry Daiquiri', 'Fresh strawberries blended with lime into a frosty, slushy delight. Summer in a glass.', 'fruit_based', 'popular', 'juice', 'hurricane', 400, 'Fresh strawberry and lime wheel', 140, 32, false, true, true, ARRAY['strawberry', 'citrus', 'icy', 'refreshing'], 'Strawberry Daiquiri', '{}', true, true, true, true, true, true, true, 0, ARRAY['frozen', 'strawberry', 'summer', 'slushy'], 88, 'Cuba'),
('MCK_COCONUT_CREAM_DREAM', 'coconut-cream-dream', 'Coconut Cream Dream', 'Silky coconut cream mocktail with a hint of vanilla. Tropical indulgence without the rum.', 'creamy', 'signature', 'coconut', 'hurricane', 350, 'Toasted coconut flakes', 260, 28, false, true, true, ARRAY['coconut', 'creamy', 'tropical', 'vanilla'], NULL, '{}', true, true, false, true, true, true, true, 0, ARRAY['coconut', 'tropical', 'vegan', 'creamy'], 75, 'Thailand'),
('MCK_MANGO_LASSI_MOCKTAIL', 'mango-lassi-mocktail', 'Mango Lassi Mocktail', 'Indian-inspired yogurt drink with ripe mango. Creamy, tangy, and tropical.', 'creamy', 'classic', 'cream', 'highball', 350, 'Mango slice and cardamom dust', 220, 32, false, false, true, ARRAY['mango', 'creamy', 'tangy', 'spiced'], NULL, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['indian', 'mango', 'yogurt', 'classic'], 80, 'India')

ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    base = EXCLUDED.base,
    glass_type = EXCLUDED.glass_type,
    serving_size_ml = EXCLUDED.serving_size_ml,
    garnish = EXCLUDED.garnish,
    calories_per_serving = EXCLUDED.calories_per_serving,
    sugar_g = EXCLUDED.sugar_g,
    is_carbonated = EXCLUDED.is_carbonated,
    is_frozen = EXCLUDED.is_frozen,
    is_kid_friendly = EXCLUDED.is_kid_friendly,
    flavor_profile = EXCLUDED.flavor_profile,
    inspired_by = EXCLUDED.inspired_by,
    allergens = EXCLUDED.allergens,
    is_gluten_free = EXCLUDED.is_gluten_free,
    is_dairy_free = EXCLUDED.is_dairy_free,
    is_nut_free = EXCLUDED.is_nut_free,
    is_vegan = EXCLUDED.is_vegan,
    is_vegetarian = EXCLUDED.is_vegetarian,
    is_halal = EXCLUDED.is_halal,
    is_kosher = EXCLUDED.is_kosher,
    spice_level = EXCLUDED.spice_level,
    tags = EXCLUDED.tags,
    popularity = EXCLUDED.popularity,
    origin_country = EXCLUDED.origin_country,
    updated_at = NOW();
-- ============================================
-- MOCKTAILS - Product Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Clean existing product_ingredients for mocktails
DELETE FROM product_ingredients WHERE product_type = 'mocktails';

-- Insert product ingredients
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES

-- ============================================
-- VIRGIN CLASSICS
-- ============================================
-- Virgin Mojito
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_MINT', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_SUGAR', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_SODA_WATER', 'main', false, 4),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_ICE', 'secondary', false, 5),

-- Virgin Margarita
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_ORANGE_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_AGAVE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_SALT', 'garnish', true, 4),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_ICE', 'secondary', false, 5),

-- Virgin Pina Colada
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_PINEAPPLE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_COCONUT_CREAM', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_COCONUT_MILK', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_ICE', 'secondary', false, 4),

-- Virgin Mary
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_TOMATO_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_LEMON_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_WORCESTERSHIRE_SAUCE', 'seasoning', false, 3),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_HOT_SAUCE', 'seasoning', true, 4),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_CELERY_SALT', 'seasoning', false, 5),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_BLACK_PEPPER', 'seasoning', false, 6),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_ICE', 'secondary', false, 7),

-- Virgin Cosmopolitan
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_CRANBERRY_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_ORANGE_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_ICE', 'secondary', false, 5),

-- Virgin Paloma
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_GRAPEFRUIT_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_SPARKLING_WATER', 'main', false, 4),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_SALT', 'garnish', true, 5),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_ICE', 'secondary', false, 6),

-- Virgin Moscow Mule
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_GINGER_BEER', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_SIMPLE_SYRUP', 'secondary', true, 3),
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_ICE', 'secondary', false, 4),

-- Virgin Daiquiri
('mocktails', 'MCK_VIRGIN_DAIQUIRI', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_DAIQUIRI', 'ING_SIMPLE_SYRUP', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_DAIQUIRI', 'ING_ICE', 'secondary', false, 3),

-- ============================================
-- ICONIC MOCKTAILS
-- ============================================
-- Shirley Temple
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_GINGER_ALE', 'main', false, 1),
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_GRENADINE', 'main', false, 2),
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_MARASCHINO_CHERRY', 'garnish', false, 3),
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_ICE', 'secondary', false, 4),

-- Roy Rogers
('mocktails', 'MCK_ROY_ROGERS', 'ING_COLA', 'main', false, 1),
('mocktails', 'MCK_ROY_ROGERS', 'ING_GRENADINE', 'main', false, 2),
('mocktails', 'MCK_ROY_ROGERS', 'ING_MARASCHINO_CHERRY', 'garnish', false, 3),
('mocktails', 'MCK_ROY_ROGERS', 'ING_ICE', 'secondary', false, 4),

-- Arnold Palmer
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_BLACK_TEA', 'main', false, 1),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_LEMON_JUICE', 'main', false, 2),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_SUGAR', 'secondary', false, 3),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_WATER', 'secondary', false, 4),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_ICE', 'secondary', false, 5),

-- Cinderella
('mocktails', 'MCK_CINDERELLA', 'ING_PINEAPPLE_JUICE', 'main', false, 1),
('mocktails', 'MCK_CINDERELLA', 'ING_ORANGE_JUICE', 'main', false, 2),
('mocktails', 'MCK_CINDERELLA', 'ING_LEMON_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_CINDERELLA', 'ING_GRENADINE', 'secondary', false, 4),
('mocktails', 'MCK_CINDERELLA', 'ING_SODA_WATER', 'secondary', false, 5),
('mocktails', 'MCK_CINDERELLA', 'ING_ICE', 'secondary', false, 6),

-- Safe Sex on the Beach
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_PEACH_NECTAR', 'main', false, 1),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_ORANGE_JUICE', 'main', false, 2),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_CRANBERRY_JUICE', 'main', false, 3),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_GRENADINE', 'secondary', true, 4),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_ICE', 'secondary', false, 5),

-- Virgin Mimosa
('mocktails', 'MCK_VIRGIN_MIMOSA', 'ING_ORANGE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MIMOSA', 'ING_SPARKLING_WATER', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MIMOSA', 'ING_ICE', 'secondary', true, 3),

-- Virgin Bellini
('mocktails', 'MCK_VIRGIN_BELLINI', 'ING_PEACH_PUREE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_BELLINI', 'ING_SPARKLING_WATER', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_BELLINI', 'ING_ICE', 'secondary', true, 3),

-- Nojito
('mocktails', 'MCK_NOJITO', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_NOJITO', 'ING_MINT', 'main', false, 2),
('mocktails', 'MCK_NOJITO', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_NOJITO', 'ING_SODA_WATER', 'main', false, 4),
('mocktails', 'MCK_NOJITO', 'ING_ICE', 'secondary', false, 5),

-- ============================================
-- TROPICAL & FRUITY
-- ============================================
-- Tropical Sunrise
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_ORANGE_JUICE', 'main', false, 1),
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_PINEAPPLE_JUICE', 'main', false, 2),
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_GRENADINE', 'secondary', false, 3),
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_ICE', 'secondary', false, 4),

-- Mango Tango
('mocktails', 'MCK_MANGO_TANGO', 'ING_MANGO_PUREE', 'main', false, 1),
('mocktails', 'MCK_MANGO_TANGO', 'ING_ORANGE_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_MANGO_TANGO', 'ING_PASSION_FRUIT_PUREE', 'main', false, 3),
('mocktails', 'MCK_MANGO_TANGO', 'ING_LIME_JUICE', 'secondary', false, 4),
('mocktails', 'MCK_MANGO_TANGO', 'ING_ICE', 'secondary', false, 5),

-- Berry Blast
('mocktails', 'MCK_BERRY_BLAST', 'ING_MIXED_BERRIES', 'main', false, 1),
('mocktails', 'MCK_BERRY_BLAST', 'ING_APPLE_JUICE', 'main', false, 2),
('mocktails', 'MCK_BERRY_BLAST', 'ING_LIME_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_BERRY_BLAST', 'ING_SIMPLE_SYRUP', 'secondary', true, 4),
('mocktails', 'MCK_BERRY_BLAST', 'ING_ICE', 'secondary', false, 5),

-- Passion Fruit Fizz
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_PASSION_FRUIT_PUREE', 'main', false, 1),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_SPARKLING_WATER', 'main', false, 4),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_ICE', 'secondary', false, 5),

-- Watermelon Cooler
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_WATERMELON_JUICE', 'main', false, 1),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_MINT', 'secondary', false, 3),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_SIMPLE_SYRUP', 'secondary', true, 4),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_ICE', 'secondary', false, 5),

-- Strawberry Lemonade
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_STRAWBERRY_PUREE', 'main', false, 1),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_LEMON_JUICE', 'main', false, 2),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_SUGAR', 'secondary', false, 3),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_WATER', 'secondary', false, 4),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_ICE', 'secondary', false, 5),

-- Blue Lagoon Mocktail
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_LEMON_JUICE', 'main', false, 1),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_BLUE_SPIRULINA', 'secondary', false, 4),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_LEMONADE', 'main', false, 5),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_ICE', 'secondary', false, 6),

-- Pineapple Coconut Bliss
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_PINEAPPLE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_COCONUT_MILK', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_COCONUT_CREAM', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_SIMPLE_SYRUP', 'secondary', true, 4),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_ICE', 'secondary', false, 5),

-- ============================================
-- SPECIALTY
-- ============================================
-- Lavender Lemonade
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_LEMON_JUICE', 'main', false, 1),
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_LAVENDER_SYRUP', 'main', false, 2),
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_WATER', 'secondary', false, 3),
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_ICE', 'secondary', false, 4),

-- Cucumber Mint Cooler
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_CUCUMBER', 'main', false, 1),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_MINT', 'main', false, 2),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_LIME_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_SPARKLING_WATER', 'main', false, 5),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_ICE', 'secondary', false, 6),

-- Ginger Lemongrass Cooler
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_GINGER', 'main', false, 1),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_LEMONGRASS', 'main', false, 2),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_LIME_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_HONEY', 'secondary', false, 4),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_SPARKLING_WATER', 'main', false, 5),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_ICE', 'secondary', false, 6),

-- Cranberry Fizz
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_CRANBERRY_JUICE', 'main', false, 1),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_ROSEMARY', 'garnish', false, 4),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_SPARKLING_WATER', 'main', false, 5),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_ICE', 'secondary', false, 6),

-- Chai Spiced Cider
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_APPLE_CIDER', 'main', false, 1),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_CINNAMON', 'seasoning', false, 2),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_CARDAMOM', 'seasoning', false, 3),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_GINGER', 'seasoning', false, 4),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_CLOVES', 'seasoning', false, 5),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_HONEY', 'secondary', false, 6),

-- Hibiscus Cooler
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_HIBISCUS_TEA', 'main', false, 1),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_ORANGE_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_ICE', 'secondary', false, 5),

-- Virgin Sangria
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_GRAPE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_ORANGE_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_LEMON_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_APPLE', 'garnish', false, 4),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_ORANGE', 'garnish', false, 5),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_SPARKLING_WATER', 'secondary', false, 6),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_ICE', 'secondary', false, 7),

-- Matcha Lemonade
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_MATCHA_POWDER', 'main', false, 1),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_LEMON_JUICE', 'main', false, 2),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_WATER', 'secondary', false, 4),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_ICE', 'secondary', false, 5),

-- ============================================
-- CREAMY & FROZEN
-- ============================================
-- Virgin Mudslide
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_CHOCOLATE_SYRUP', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_VANILLA_ICE_CREAM', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_WHIPPED_CREAM', 'garnish', true, 4),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_ICE', 'secondary', false, 5),

-- Strawberry Dream
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_STRAWBERRY_PUREE', 'main', false, 1),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_VANILLA_ICE_CREAM', 'main', false, 2),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_WHIPPED_CREAM', 'garnish', true, 4),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_ICE', 'secondary', false, 5),

-- Orange Creamsicle
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_ORANGE_JUICE', 'main', false, 1),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_VANILLA_ICE_CREAM', 'main', false, 2),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_VANILLA_EXTRACT', 'seasoning', false, 4),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_ICE', 'secondary', false, 5),

-- Frozen Strawberry Daiquiri
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_STRAWBERRY_PUREE', 'main', false, 1),
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_ICE', 'secondary', false, 4),

-- Coconut Cream Dream
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_COCONUT_CREAM', 'main', false, 1),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_COCONUT_MILK', 'main', false, 2),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_VANILLA_EXTRACT', 'seasoning', false, 3),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_ICE', 'secondary', false, 5),

-- Mango Lassi Mocktail
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_MANGO_PUREE', 'main', false, 1),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_YOGURT', 'main', false, 2),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_HONEY', 'secondary', false, 4),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_CARDAMOM', 'seasoning', false, 5),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_ICE', 'secondary', true, 6);
