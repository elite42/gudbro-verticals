-- ============================================================================
-- CHEESE GLOBAL EXPANSION
-- Date: 2025-12-26
-- Description: Add ~115 new cheeses from around the world with nutrition data
--
-- Sources: TasteAtlas, Wikipedia, Cheese.com, regional cheese associations
-- Research: 4 parallel agents covering Italy/France/Spain, Central Europe,
--           UK/Mediterranean/Nordic, and Americas/Middle East/Asia
-- ============================================================================

-- Already existing (86 cheeses) - DO NOT INSERT:
-- Mozzarella, Feta, Swiss, Taleggio, Mascarpone, Gorgonzola, Parmesan, Fontina,
-- Brie, Pecorino (all variants), Gouda, Emmental, Gruyère, Halloumi, Manchego,
-- Cheddar, Burrata, Provolone, Ricotta, Roquefort, Camembert, Comté, etc.

BEGIN;

-- ============================================================================
-- BATCH 1: ITALY (13 cheeses) - DOP/IGP varieties
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_GRANA_PADANO', 'Grana Padano', 'grana-padano', 'cheese',
 'Italian hard cheese from Po Valley with PDO status, aged 9-24 months with granular texture and nutty flavor.',
 '{"calories": 384, "protein": 33, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 650}'::jsonb),

('ING_ASIAGO', 'Asiago', 'asiago', 'cheese',
 'Italian DOP cheese from Veneto, available fresh (pressato) or aged (d''allevo) with sweet to sharp flavor profile.',
 '{"calories": 392, "protein": 32, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 740}'::jsonb),

('ING_CACIOCAVALLO', 'Caciocavallo', 'caciocavallo', 'cheese',
 'Southern Italian stretched-curd cheese in distinctive gourd shape, aged for piquant flavor.',
 '{"calories": 380, "protein": 26, "fat": 31, "carbs": 0.5, "fiber": 0, "sodium": 720}'::jsonb),

('ING_MONTASIO', 'Montasio', 'montasio', 'cheese',
 'Italian DOP cheese from Friuli-Venezia Giulia, used fresh for frico or aged for grating.',
 '{"calories": 370, "protein": 28, "fat": 29, "carbs": 0, "fiber": 0, "sodium": 680}'::jsonb),

('ING_TOMA', 'Toma', 'toma', 'cheese',
 'Piedmontese semi-soft cow milk cheese with mild earthy flavor and supple texture.',
 '{"calories": 355, "protein": 25, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 600}'::jsonb),

('ING_CASTELMAGNO', 'Castelmagno', 'castelmagno', 'cheese',
 'Rare Italian DOP cheese from Piedmont with crumbly texture and complex tangy flavor with blue veins.',
 '{"calories": 390, "protein": 27, "fat": 32, "carbs": 0, "fiber": 0, "sodium": 750}'::jsonb),

('ING_ROBIOLA', 'Robiola', 'robiola', 'cheese',
 'Soft-ripened Italian cheese from Langhe region made from cow, goat, or sheep milk.',
 '{"calories": 330, "protein": 18, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 450}'::jsonb),

('ING_CRESCENZA', 'Crescenza', 'crescenza', 'cheese',
 'Fresh Italian cheese from Lombardy with creamy spreadable texture and mild tangy flavor.',
 '{"calories": 280, "protein": 16, "fat": 24, "carbs": 2, "fiber": 0, "sodium": 380}'::jsonb),

('ING_SCAMORZA', 'Scamorza', 'scamorza', 'cheese',
 'Southern Italian pasta filata cheese, often smoked, with pear shape and mild flavor.',
 '{"calories": 334, "protein": 25, "fat": 26, "carbs": 1, "fiber": 0, "sodium": 512}'::jsonb),

('ING_CACIOTTA', 'Caciotta', 'caciotta', 'cheese',
 'Central Italian semi-soft cheese with mild creamy flavor, made from cow, sheep, or goat milk.',
 '{"calories": 350, "protein": 24, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 550}'::jsonb),

('ING_PIAVE', 'Piave', 'piave', 'cheese',
 'Hard Italian DOP cheese from Belluno with aged versions developing intense nutty flavor.',
 '{"calories": 387, "protein": 32, "fat": 29, "carbs": 0, "fiber": 0, "sodium": 700}'::jsonb),

('ING_RAGUSANO', 'Ragusano', 'ragusano', 'cheese',
 'Sicilian DOP stretched-curd cheese aged in rectangular blocks with spicy notes.',
 '{"calories": 365, "protein": 27, "fat": 28, "carbs": 0.5, "fiber": 0, "sodium": 680}'::jsonb),

('ING_CANESTRATO', 'Canestrato', 'canestrato', 'cheese',
 'Southern Italian sheep milk cheese aged in woven reed baskets giving distinctive rind pattern.',
 '{"calories": 392, "protein": 30, "fat": 31, "carbs": 0, "fiber": 0, "sodium": 750}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 2: FRANCE (15 cheeses) - AOP varieties
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_BEAUFORT', 'Beaufort', 'beaufort', 'cheese',
 'French Alpine cheese from Savoie with AOP status, firm texture and complex fruity flavor.',
 '{"calories": 401, "protein": 27, "fat": 33, "carbs": 0.5, "fiber": 0, "sodium": 640}'::jsonb),

('ING_REBLOCHON', 'Reblochon', 'reblochon', 'cheese',
 'Soft washed-rind French cheese from Savoie, essential for tartiflette with creamy nutty flavor.',
 '{"calories": 328, "protein": 20, "fat": 27, "carbs": 0.5, "fiber": 0, "sodium": 550}'::jsonb),

('ING_MORBIER', 'Morbier', 'morbier', 'cheese',
 'Semi-soft French cheese with distinctive ash layer through the middle and fruity flavor.',
 '{"calories": 340, "protein": 23, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 600}'::jsonb),

('ING_MUNSTER', 'Munster', 'munster', 'cheese',
 'Strong-smelling washed-rind French cheese from Alsace with creamy interior and pungent aroma.',
 '{"calories": 368, "protein": 23, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 720}'::jsonb),

('ING_EPOISSES', 'Époisses', 'epoisses', 'cheese',
 'Pungent French washed-rind cheese from Burgundy, considered one of France''s smelliest cheeses.',
 '{"calories": 303, "protein": 19, "fat": 25, "carbs": 0.5, "fiber": 0, "sodium": 580}'::jsonb),

('ING_PONT_LEVEQUE', 'Pont-l''Évêque', 'pont-leveque', 'cheese',
 'Norman soft cheese with AOP status, one of France''s oldest, with creamy texture and earthy flavor.',
 '{"calories": 335, "protein": 21, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 620}'::jsonb),

('ING_LIVAROT', 'Livarot', 'livarot', 'cheese',
 'Norman washed-rind cheese nicknamed "The Colonel" for its reed straps, strong flavor and soft interior.',
 '{"calories": 312, "protein": 22, "fat": 25, "carbs": 0, "fiber": 0, "sodium": 710}'::jsonb),

('ING_CANTAL', 'Cantal', 'cantal', 'cheese',
 'Ancient French cheese from Auvergne, firm texture ranging from mild (jeune) to sharp (vieux).',
 '{"calories": 387, "protein": 23, "fat": 33, "carbs": 0.1, "fiber": 0, "sodium": 820}'::jsonb),

('ING_SAINT_NECTAIRE', 'Saint-Nectaire', 'saint-nectaire', 'cheese',
 'Semi-soft French AOP cheese from Auvergne with creamy supple texture and nutty mushroom notes.',
 '{"calories": 347, "protein": 21, "fat": 29, "carbs": 0, "fiber": 0, "sodium": 580}'::jsonb),

('ING_OSSAU_IRATY', 'Ossau-Iraty', 'ossau-iraty', 'cheese',
 'Basque sheep milk cheese from Pyrenees with AOP status, firm texture and nutty sweet flavor.',
 '{"calories": 378, "protein": 25, "fat": 31, "carbs": 0.5, "fiber": 0, "sodium": 680}'::jsonb),

('ING_TOMME_DE_SAVOIE', 'Tomme de Savoie', 'tomme-de-savoie', 'cheese',
 'Traditional Alpine cheese with gray-brown rind, semi-firm with mild grassy earthy flavor.',
 '{"calories": 339, "protein": 24, "fat": 27, "carbs": 0.5, "fiber": 0, "sodium": 550}'::jsonb),

('ING_BANON', 'Banon', 'banon', 'cheese',
 'Provençal goat cheese wrapped in chestnut leaves with AOP status, creamy with nutty flavor.',
 '{"calories": 290, "protein": 18, "fat": 24, "carbs": 1, "fiber": 0, "sodium": 420}'::jsonb),

('ING_CHAOURCE', 'Chaource', 'chaource', 'cheese',
 'Soft French cheese from Champagne with bloomy rind and rich creamy interior with fruity notes.',
 '{"calories": 298, "protein": 17, "fat": 25, "carbs": 1, "fiber": 0, "sodium": 480}'::jsonb),

('ING_ABONDANCE', 'Abondance', 'abondance', 'cheese',
 'French Alpine cheese from Haute-Savoie with AOP status, semi-hard with fruity complex flavor.',
 '{"calories": 381, "protein": 26, "fat": 31, "carbs": 0, "fiber": 0, "sodium": 610}'::jsonb),

('ING_BLEU_DAUVERGNE', 'Bleu d''Auvergne', 'bleu-dauvergne', 'cheese',
 'French blue cheese from Auvergne with AOP status, creamy texture and pungent sharp flavor.',
 '{"calories": 353, "protein": 19, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 850}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 3: SPAIN (14 cheeses) - DOP varieties
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_CABRALES', 'Cabrales', 'cabrales', 'cheese',
 'Asturian blue cheese aged in mountain caves with DOP status, intense sharp flavor.',
 '{"calories": 390, "protein": 21, "fat": 33, "carbs": 0.5, "fiber": 0, "sodium": 900}'::jsonb),

('ING_MAHON', 'Mahón', 'mahon', 'cheese',
 'Menorcan DOP cheese with distinctive orange rind, ranging from soft fresh to hard aged varieties.',
 '{"calories": 378, "protein": 25, "fat": 31, "carbs": 0.5, "fiber": 0, "sodium": 720}'::jsonb),

('ING_TORTA_DEL_CASAR', 'Torta del Casar', 'torta-del-casar', 'cheese',
 'Extremaduran sheep milk cheese with thistle rennet, creamy spreadable interior with bitter notes.',
 '{"calories": 365, "protein": 21, "fat": 31, "carbs": 0.5, "fiber": 0, "sodium": 650}'::jsonb),

('ING_MAJORERO', 'Majorero', 'majorero', 'cheese',
 'Canarian goat cheese from Fuerteventura with DOP status, firm texture with piquant flavor.',
 '{"calories": 358, "protein": 26, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 680}'::jsonb),

('ING_SAN_SIMON', 'San Simón da Costa', 'san-simon', 'cheese',
 'Galician smoked cow milk cheese with distinctive pear shape and smoky birchwood flavor.',
 '{"calories": 345, "protein": 24, "fat": 27, "carbs": 0.5, "fiber": 0, "sodium": 590}'::jsonb),

('ING_ZAMORANO', 'Zamorano', 'zamorano', 'cheese',
 'Castilian sheep milk cheese with DOP status, hard granular texture and intense nutty flavor.',
 '{"calories": 398, "protein": 28, "fat": 32, "carbs": 0, "fiber": 0, "sodium": 750}'::jsonb),

('ING_RONCAL', 'Roncal', 'roncal', 'cheese',
 'Navarrese sheep milk cheese with DOP status, Spain''s first protected cheese with buttery piquant notes.',
 '{"calories": 405, "protein": 27, "fat": 34, "carbs": 0, "fiber": 0, "sodium": 720}'::jsonb),

('ING_QUESO_DE_LA_SERENA', 'Queso de la Serena', 'queso-de-la-serena', 'cheese',
 'Extremaduran sheep milk cheese with thistle rennet, creamy paste similar to Torta del Casar.',
 '{"calories": 358, "protein": 22, "fat": 30, "carbs": 0.5, "fiber": 0, "sodium": 640}'::jsonb),

('ING_GARROTXA', 'Garrotxa', 'garrotxa', 'cheese',
 'Catalan goat cheese with distinctive gray mold rind, semi-firm with mild herbaceous flavor.',
 '{"calories": 342, "protein": 25, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 580}'::jsonb),

('ING_AFUEGAL_PITU', 'Afuega''l Pitu', 'afuegal-pitu', 'cheese',
 'Asturian cow milk cheese with DOP status, name means "chokes the chicken" due to dense paste.',
 '{"calories": 310, "protein": 20, "fat": 25, "carbs": 1, "fiber": 0, "sodium": 520}'::jsonb),

('ING_MURCIA_AL_VINO', 'Murcia al Vino', 'murcia-al-vino', 'cheese',
 'Murcian goat cheese with DOP status, rind washed with red wine giving purple exterior.',
 '{"calories": 350, "protein": 24, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 600}'::jsonb),

('ING_ARZUA_ULLOA', 'Arzúa-Ulloa', 'arzua-ulloa', 'cheese',
 'Galician cow milk cheese with DOP status, soft creamy texture with mild buttery flavor.',
 '{"calories": 325, "protein": 21, "fat": 26, "carbs": 1, "fiber": 0, "sodium": 480}'::jsonb),

('ING_VALDEON', 'Valdeón', 'valdeon', 'cheese',
 'Leonese blue cheese wrapped in maple or sycamore leaves, intense sharp flavor with creamy texture.',
 '{"calories": 382, "protein": 20, "fat": 32, "carbs": 0.5, "fiber": 0, "sodium": 880}'::jsonb),

('ING_PAYOYO', 'Payoyo', 'payoyo', 'cheese',
 'Andalusian artisanal cheese from Payoya goat and Merina sheep milk, rich complex flavor.',
 '{"calories": 368, "protein": 26, "fat": 29, "carbs": 0.5, "fiber": 0, "sodium": 650}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 4: CENTRAL EUROPE - Germany, Switzerland, Netherlands, Belgium, Austria (31 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
-- Germany (8)
('ING_ALLGAUER_BERGKASE', 'Allgäuer Bergkäse', 'allgauer-bergkase', 'cheese',
 'German Alpine cheese from Allgäu with PDO status, hard texture with nutty aromatic flavor.',
 '{"calories": 401, "protein": 29, "fat": 32, "carbs": 0, "fiber": 0, "sodium": 600}'::jsonb),

('ING_LIMBURGER', 'Limburger', 'limburger', 'cheese',
 'German washed-rind cheese with strong aroma and creamy texture, milder flavor than its smell suggests.',
 '{"calories": 327, "protein": 20, "fat": 27, "carbs": 0, "fiber": 0, "sodium": 800}'::jsonb),

('ING_TILSITER', 'Tilsiter', 'tilsiter', 'cheese',
 'German semi-hard cheese with small holes, mildly pungent with tangy buttery flavor.',
 '{"calories": 340, "protein": 26, "fat": 26, "carbs": 0, "fiber": 0, "sodium": 700}'::jsonb),

('ING_BUTTERKASE', 'Butterkäse', 'butterkase', 'cheese',
 'German semi-soft cheese meaning "butter cheese", extremely mild with creamy buttery flavor.',
 '{"calories": 350, "protein": 22, "fat": 29, "carbs": 0.5, "fiber": 0, "sodium": 450}'::jsonb),

('ING_BERGADER', 'Bergader', 'bergader', 'cheese',
 'Bavarian blue cheese with creamy texture and mild blue flavor, made in the Chiemgau Alps.',
 '{"calories": 353, "protein": 19, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 820}'::jsonb),

('ING_HANDKASE', 'Handkäse', 'handkase', 'cheese',
 'Traditional Hessian sour milk cheese, low-fat with pungent aroma, often marinated with onions.',
 '{"calories": 125, "protein": 30, "fat": 0.5, "carbs": 0.5, "fiber": 0, "sodium": 700}'::jsonb),

('ING_HARZER', 'Harzer', 'harzer', 'cheese',
 'German sour milk cheese from Harz region, very low fat with strong pungent flavor.',
 '{"calories": 128, "protein": 30, "fat": 0.7, "carbs": 0.5, "fiber": 0, "sodium": 800}'::jsonb),

('ING_WEISSLACKER', 'Weisslacker', 'weisslacker', 'cheese',
 'Bavarian semi-soft cheese with strong aroma, white ripened cheese with pungent flavor.',
 '{"calories": 345, "protein": 23, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 850}'::jsonb),

-- Switzerland (7)
('ING_APPENZELLER', 'Appenzeller', 'appenzeller', 'cheese',
 'Swiss cheese from Appenzell with secret herbal brine wash, firm with tangy complex flavor.',
 '{"calories": 395, "protein": 28, "fat": 31, "carbs": 0, "fiber": 0, "sodium": 720}'::jsonb),

('ING_SBRINZ', 'Sbrinz', 'sbrinz', 'cheese',
 'Swiss hard cheese aged 18+ months, extra-hard with intense flavor similar to Parmesan.',
 '{"calories": 429, "protein": 32, "fat": 35, "carbs": 0, "fiber": 0, "sodium": 580}'::jsonb),

('ING_TETE_DE_MOINE', 'Tête de Moine', 'tete-de-moine', 'cheese',
 'Swiss semi-hard cheese traditionally shaved into rosettes, tangy with robust flavor.',
 '{"calories": 382, "protein": 26, "fat": 31, "carbs": 0, "fiber": 0, "sodium": 680}'::jsonb),

('ING_ETIVAZ', 'L''Etivaz', 'etivaz', 'cheese',
 'Swiss Alpine cheese with AOP status made only in summer chalets, smoky notes from wood fire.',
 '{"calories": 403, "protein": 27, "fat": 33, "carbs": 0, "fiber": 0, "sodium": 620}'::jsonb),

('ING_TILSIT_SWISS', 'Swiss Tilsit', 'swiss-tilsit', 'cheese',
 'Swiss semi-hard cheese with small holes and fruity tangy flavor, milder than German version.',
 '{"calories": 340, "protein": 26, "fat": 26, "carbs": 0, "fiber": 0, "sodium": 650}'::jsonb),

('ING_SCHABZIGER', 'Schabziger', 'schabziger', 'cheese',
 'Swiss green cheese flavored with blue fenugreek, very hard and sharp, grated over dishes.',
 '{"calories": 247, "protein": 37, "fat": 3, "carbs": 18, "fiber": 0, "sodium": 1200}'::jsonb),

('ING_MUTSCHLI', 'Mutschli', 'mutschli', 'cheese',
 'Swiss semi-soft Alpine cheese with edible rind, mild creamy flavor with earthy notes.',
 '{"calories": 350, "protein": 24, "fat": 28, "carbs": 0.5, "fiber": 0, "sodium": 520}'::jsonb),

-- Netherlands (6)
('ING_LEYDEN', 'Leyden', 'leyden', 'cheese',
 'Dutch semi-hard cheese with cumin and caraway seeds, firm texture with spicy aromatic flavor.',
 '{"calories": 357, "protein": 27, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 1450}'::jsonb),

('ING_MAASDAM', 'Maasdam', 'maasdam', 'cheese',
 'Dutch cheese with large holes similar to Swiss Emmental, sweet nutty flavor and creamy texture.',
 '{"calories": 357, "protein": 26, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 540}'::jsonb),

('ING_BOERENKAAS', 'Boerenkaas', 'boerenkaas', 'cheese',
 'Traditional Dutch farmhouse cheese made from raw milk, rich complex flavor with PDO status.',
 '{"calories": 385, "protein": 26, "fat": 31, "carbs": 0, "fiber": 0, "sodium": 680}'::jsonb),

('ING_KERNHEM', 'Kernhem', 'kernhem', 'cheese',
 'Dutch semi-soft cheese with bloomy rind, creamy texture and mild mushroomy flavor.',
 '{"calories": 335, "protein": 22, "fat": 27, "carbs": 0.5, "fiber": 0, "sodium": 520}'::jsonb),

('ING_GRASKAAS', 'Graskaas', 'graskaas', 'cheese',
 'Dutch spring cheese made when cows return to pasture, young mild with bright grassy flavor.',
 '{"calories": 360, "protein": 25, "fat": 29, "carbs": 0.5, "fiber": 0, "sodium": 580}'::jsonb),

('ING_OLD_AMSTERDAM', 'Old Amsterdam', 'old-amsterdam', 'cheese',
 'Premium aged Dutch Gouda with caramel notes and crunchy protein crystals.',
 '{"calories": 398, "protein": 27, "fat": 33, "carbs": 0, "fiber": 0, "sodium": 720}'::jsonb),

-- Belgium (4)
('ING_HERVE', 'Herve', 'herve', 'cheese',
 'Belgian washed-rind cheese from Liège with AOP status, strong aroma and creamy pungent flavor.',
 '{"calories": 320, "protein": 20, "fat": 26, "carbs": 0.5, "fiber": 0, "sodium": 750}'::jsonb),

('ING_CHIMAY', 'Chimay', 'chimay', 'cheese',
 'Belgian Trappist cheese made by monks at Chimay Abbey, semi-hard with mild creamy flavor.',
 '{"calories": 345, "protein": 24, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 620}'::jsonb),

('ING_PASSENDALE', 'Passendale', 'passendale', 'cheese',
 'Belgian semi-soft cheese with distinctive bread-like loaf shape, mild buttery flavor.',
 '{"calories": 340, "protein": 23, "fat": 27, "carbs": 0.5, "fiber": 0, "sodium": 550}'::jsonb),

('ING_ORVAL', 'Orval', 'orval', 'cheese',
 'Belgian Trappist cheese from Orval Abbey, semi-soft with mild creamy flavor and orange rind.',
 '{"calories": 335, "protein": 22, "fat": 27, "carbs": 0, "fiber": 0, "sodium": 580}'::jsonb),

-- Austria (6)
('ING_VORARLBERGER_BERGKASE', 'Vorarlberger Bergkäse', 'vorarlberger-bergkase', 'cheese',
 'Austrian Alpine cheese with PDO status, hard texture with intense aromatic flavor.',
 '{"calories": 405, "protein": 28, "fat": 33, "carbs": 0, "fiber": 0, "sodium": 640}'::jsonb),

('ING_TYROLEAN_GREY', 'Tyrolean Grey', 'tyrolean-grey', 'cheese',
 'Austrian sour milk cheese with distinctive grey mold rind, tangy acidic flavor.',
 '{"calories": 158, "protein": 30, "fat": 2, "carbs": 0.5, "fiber": 0, "sodium": 700}'::jsonb),

('ING_GAILTALER_ALMKASE', 'Gailtaler Almkäse', 'gailtaler-almkase', 'cheese',
 'Austrian Alpine cheese from Carinthia with PDO status, made in summer pastures.',
 '{"calories": 378, "protein": 27, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 600}'::jsonb),

('ING_MONDSEER', 'Mondseer', 'mondseer', 'cheese',
 'Austrian washed-rind cheese from Salzburg region, semi-soft with mild pungent flavor.',
 '{"calories": 345, "protein": 23, "fat": 28, "carbs": 0.5, "fiber": 0, "sodium": 720}'::jsonb),

('ING_BERGKASE_AUSTRIAN', 'Austrian Bergkäse', 'austrian-bergkase', 'cheese',
 'Traditional Austrian mountain cheese with firm texture and nutty Alpine flavor.',
 '{"calories": 395, "protein": 28, "fat": 32, "carbs": 0, "fiber": 0, "sodium": 620}'::jsonb),

('ING_PINZGAUER', 'Pinzgauer', 'pinzgauer', 'cheese',
 'Austrian cheese from Salzburg region, semi-hard with rich buttery flavor.',
 '{"calories": 365, "protein": 25, "fat": 29, "carbs": 0.5, "fiber": 0, "sodium": 580}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 5: UK & IRELAND (13 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_STILTON', 'Stilton', 'stilton', 'cheese',
 'English blue cheese with PDO status from Derbyshire, Leicestershire, and Nottinghamshire, crumbly yet creamy with complex tangy flavor.',
 '{"calories": 410, "protein": 25, "fat": 36, "carbs": 0, "fiber": 0, "sodium": 590}'::jsonb),

('ING_WENSLEYDALE', 'Wensleydale', 'wensleydale', 'cheese',
 'Traditional Yorkshire cheese dating to 12th century, white crumbly texture with slight honey aroma.',
 '{"calories": 375, "protein": 23, "fat": 31, "carbs": 0.1, "fiber": 0, "sodium": 620}'::jsonb),

('ING_RED_LEICESTER', 'Red Leicester', 'red-leicester', 'cheese',
 'English cheese from Leicestershire with vibrant orange color from annatto, sweet mellow nutty flavor.',
 '{"calories": 396, "protein": 23, "fat": 34, "carbs": 0.1, "fiber": 0, "sodium": 730}'::jsonb),

('ING_DOUBLE_GLOUCESTER', 'Double Gloucester', 'double-gloucester', 'cheese',
 'British territorial cheese from Gloucestershire with firm texture and rich creamy flavor.',
 '{"calories": 405, "protein": 23, "fat": 33, "carbs": 0.1, "fiber": 0, "sodium": 650}'::jsonb),

('ING_CAERPHILLY', 'Caerphilly', 'caerphilly', 'cheese',
 'Welsh cheese with crumbly texture and mild salty flavor, traditionally eaten by coal miners.',
 '{"calories": 375, "protein": 23, "fat": 31, "carbs": 0.1, "fiber": 0, "sodium": 620}'::jsonb),

('ING_LANCASHIRE', 'Lancashire', 'lancashire', 'cheese',
 'English cheese from Lancashire with crumbly texture when young, mild buttery flavor with slight tang.',
 '{"calories": 381, "protein": 24, "fat": 32, "carbs": 0.1, "fiber": 0, "sodium": 600}'::jsonb),

('ING_CHESHIRE', 'Cheshire', 'cheshire', 'cheese',
 'Britain''s oldest named cheese from the Cheshire Plain, crumbly with subtle citrus hints and salty taste.',
 '{"calories": 423, "protein": 24, "fat": 35, "carbs": 3, "fiber": 0, "sodium": 1850}'::jsonb),

('ING_SAGE_DERBY', 'Sage Derby', 'sage-derby', 'cheese',
 'England''s oldest flavored cheese, smooth creamy Derby marbled with sage, made for special occasions.',
 '{"calories": 409, "protein": 23, "fat": 34, "carbs": 2, "fiber": 0, "sodium": 1870}'::jsonb),

('ING_CASHEL_BLUE', 'Cashel Blue', 'cashel-blue', 'cheese',
 'Ireland''s original farmhouse blue cheese, semi-soft with creamy texture and mild flavor from grass-fed milk.',
 '{"calories": 348, "protein": 20, "fat": 29, "carbs": 1, "fiber": 0, "sodium": 2000}'::jsonb),

('ING_DUBLINER', 'Dubliner', 'dubliner', 'cheese',
 'Irish hard cheese similar to Cheddar made from grass-fed cow''s milk, nutty to sharp sweet flavor.',
 '{"calories": 381, "protein": 24, "fat": 33, "carbs": 0, "fiber": 0, "sodium": 680}'::jsonb),

('ING_COOLEA', 'Coolea', 'coolea', 'cheese',
 'Irish farmhouse cheese from County Cork using Dutch Gouda recipe, semi-hard evolving into delightful sweetness.',
 '{"calories": 380, "protein": 26, "fat": 31, "carbs": 1, "fiber": 0, "sodium": 650}'::jsonb),

('ING_GUBBEEN', 'Gubbeen', 'gubbeen', 'cheese',
 'Irish semi-soft washed rind cheese from County Cork with pinkish-white rind and elastic texture.',
 '{"calories": 271, "protein": 21, "fat": 31, "carbs": 1, "fiber": 0, "sodium": 769}'::jsonb),

('ING_ARDRAHAN', 'Ardrahan', 'ardrahan', 'cheese',
 'Irish semi-soft vegetarian cheese from County Cork with 25% fat content from pedigree Friesians.',
 '{"calories": 320, "protein": 22, "fat": 25, "carbs": 0.5, "fiber": 0, "sodium": 600}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 6: GREECE (6 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_GRAVIERA', 'Graviera', 'graviera', 'cheese',
 'Greek hard cheese resembling Gruyère, Greece''s second most popular after feta, with PDO varieties from Crete and Naxos.',
 '{"calories": 396, "protein": 29, "fat": 30, "carbs": 3, "fiber": 0, "sodium": 650}'::jsonb),

('ING_KEFALOGRAVIERA', 'Kefalograviera', 'kefalograviera', 'cheese',
 'Greek hard table cheese with PDO status from Western Macedonia and Epirus, from sheep or mixed milk.',
 '{"calories": 300, "protein": 32, "fat": 24, "carbs": 0, "fiber": 0, "sodium": 1120}'::jsonb),

('ING_KEFALOTYRI', 'Kefalotyri', 'kefalotyri', 'cheese',
 'Greek hard salty cheese from sheep or goat milk, traditional choice for saganaki with sharp dry texture.',
 '{"calories": 371, "protein": 27, "fat": 29, "carbs": 0.5, "fiber": 0, "sodium": 4000}'::jsonb),

('ING_MANOURI', 'Manouri', 'manouri', 'cheese',
 'Greek semi-soft cheese from whey leftover from feta with added cream, creamier and less salty with lemony notes.',
 '{"calories": 280, "protein": 16, "fat": 23, "carbs": 3, "fiber": 0, "sodium": 450}'::jsonb),

('ING_ANTHOTYRO', 'Anthotyro', 'anthotyro', 'cheese',
 'Traditional Greek whey cheese from sheep and goat milk, white creamy texture with mild sweetness and low calories.',
 '{"calories": 180, "protein": 14, "fat": 12, "carbs": 4, "fiber": 0, "sodium": 350}'::jsonb),

('ING_METSOVONE', 'Metsovone', 'metsovone', 'cheese',
 'Greek smoked semi-hard cheese with high protein content, rich flavor and firm texture from Metsovo region.',
 '{"calories": 442, "protein": 29, "fat": 29, "carbs": 0, "fiber": 0, "sodium": 636}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 7: TURKEY (5 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_TULUM', 'Tulum', 'tulum', 'cheese',
 'Traditional Turkish goat milk cheese ripened in a goatskin casing, full-fat aged with strong distinctive flavor.',
 '{"calories": 330, "protein": 22, "fat": 27, "carbs": 1.5, "fiber": 0, "sodium": 2500}'::jsonb),

('ING_MIHALIC', 'Mihaliç', 'mihalic', 'cheese',
 'Turkish hard cheese from Bursa Province with 200-year Ottoman heritage, great Parmesan substitute stored in brine.',
 '{"calories": 347, "protein": 25, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 4500}'::jsonb),

('ING_DIL', 'Dil', 'dil', 'cheese',
 'Turkish string cheese from Bilecik and Bursa, fresh white with stringy texture similar to mozzarella.',
 '{"calories": 314, "protein": 25, "fat": 23, "carbs": 1.5, "fiber": 0, "sodium": 1700}'::jsonb),

('ING_LOR', 'Lor', 'lor', 'cheese',
 'Turkish white whey cheese made from strained milk curds, very dry crumbly with high protein popular with health-conscious.',
 '{"calories": 150, "protein": 17, "fat": 8, "carbs": 2, "fiber": 0, "sodium": 400}'::jsonb),

('ING_CIVIL', 'Civil', 'civil', 'cheese',
 'Turkish string cheese from Erzurum region made from skim milk, low-fat with aged version developing kef exterior.',
 '{"calories": 220, "protein": 28, "fat": 10, "carbs": 2, "fiber": 0, "sodium": 800}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 8: PORTUGAL (8 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_SERRA_DA_ESTRELA', 'Serra da Estrela', 'serra-da-estrela', 'cheese',
 'Portugal''s king of cheeses with PDO status, semi-soft spreadable sheep milk using thistle rennet from Serra da Estrela mountains.',
 '{"calories": 370, "protein": 22, "fat": 30, "carbs": 1.5, "fiber": 0, "sodium": 650}'::jsonb),

('ING_AZEITAO', 'Azeitão', 'azeitao', 'cheese',
 'Portuguese PDO sheep milk cheese from Arrábida Mountains with thistle rennet, rich creamy slightly sour flavor.',
 '{"calories": 360, "protein": 20, "fat": 29, "carbs": 2, "fiber": 0, "sodium": 700}'::jsonb),

('ING_SAO_JORGE', 'São Jorge', 'sao-jorge', 'cheese',
 'Portuguese artisan cow milk cheese from São Jorge island in Azores, firm with strong clean aroma and lightly spicy taste.',
 '{"calories": 395, "protein": 26, "fat": 32, "carbs": 0.5, "fiber": 0, "sodium": 720}'::jsonb),

('ING_RABACAL', 'Rabaçal', 'rabacal', 'cheese',
 'Portuguese PDO semi-hard cheese from Coimbra, mixed sheep and goat milk in 2:1 ratio with smooth clear flavor.',
 '{"calories": 342, "protein": 20, "fat": 28, "carbs": 2, "fiber": 0, "sodium": 1100}'::jsonb),

('ING_NISA', 'Nisa', 'nisa', 'cheese',
 'Portuguese PDO sheep milk cheese from Alentejo using Merina Branca breed and thistle rennet, robust acidic finish.',
 '{"calories": 365, "protein": 23, "fat": 29, "carbs": 1.5, "fiber": 0, "sodium": 680}'::jsonb),

('ING_SERPA', 'Serpa', 'serpa', 'cheese',
 'Portuguese PDO sheep milk cheese from Alentejo with brick-orange rind brushed with olive oil and paprika.',
 '{"calories": 375, "protein": 22, "fat": 31, "carbs": 1, "fiber": 0, "sodium": 750}'::jsonb),

('ING_CASTELO_BRANCO', 'Castelo Branco', 'castelo-branco', 'cheese',
 'Portuguese PDO sheep milk cheese from Beira Baixa curdled with thistle flowers, intense and spicy when aged.',
 '{"calories": 380, "protein": 24, "fat": 31, "carbs": 1, "fiber": 0, "sodium": 700}'::jsonb),

('ING_TERRINCHO', 'Terrincho', 'terrincho', 'cheese',
 'Portuguese PDO cheese from Trás-os-Montes with Churra da Terra Quente sheep milk, smooth creamy nutty flavor.',
 '{"calories": 390, "protein": 25, "fat": 32, "carbs": 1, "fiber": 0, "sodium": 650}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 9: SCANDINAVIA (10 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_JARLSBERG', 'Jarlsberg', 'jarlsberg', 'cheese',
 'Norwegian mild Swiss-type cheese with yellow wax rind and semi-firm interior, buttery with characteristic holes, naturally lactose-free.',
 '{"calories": 350, "protein": 27, "fat": 27, "carbs": 0, "fiber": 0, "sodium": 600}'::jsonb),

('ING_GJETOST', 'Gjetost', 'gjetost', 'cheese',
 'Norwegian brown whey cheese with sweet caramel flavor from slow simmering that caramelizes milk sugars, rich in iron and B vitamins.',
 '{"calories": 466, "protein": 10, "fat": 30, "carbs": 43, "fiber": 0, "sodium": 600}'::jsonb),

('ING_HAVARTI', 'Havarti', 'havarti', 'cheese',
 'Danish semi-soft cheese aged minimum 3 months with small holes, creamy buttery aroma becoming sharper with hints of hazelnut.',
 '{"calories": 371, "protein": 23, "fat": 33, "carbs": 0, "fiber": 0, "sodium": 467}'::jsonb),

('ING_VASTERBOTTEN', 'Västerbotten', 'vasterbotten', 'cheese',
 'Swedish hard cheese known as Emperor of Cheeses with one-year aging, crumbly texture with sharp bitter nutty flavor.',
 '{"calories": 385, "protein": 28, "fat": 31, "carbs": 0, "fiber": 0, "sodium": 650}'::jsonb),

('ING_NOKKELOST', 'Nøkkelost', 'nokkelost', 'cheese',
 'Norwegian semi-hard cheese flavored with cumin and cloves, 3-month maturation, milder than Dutch Leiden.',
 '{"calories": 351, "protein": 27, "fat": 26, "carbs": 0, "fiber": 0, "sodium": 1400}'::jsonb),

('ING_DANABLU', 'Danablu', 'danablu', 'cheese',
 'Danish blue cheese aged 8-12 weeks with salty tangy flavor and creamy texture, blue-green mold veins throughout.',
 '{"calories": 350, "protein": 21, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 800}'::jsonb),

('ING_RIDDER', 'Ridder', 'ridder', 'cheese',
 'Norwegian semi-soft cheese considered most elite Norwegian cheese, creamy rich similar to Port Salut with edible washed rind.',
 '{"calories": 340, "protein": 22, "fat": 28, "carbs": 0.5, "fiber": 0, "sodium": 620}'::jsonb),

('ING_PRASTOST', 'Prästost', 'prastost', 'cheese',
 'Swedish traditional cheese with 12-month aging, good source of protein and calcium, firm mild texture.',
 '{"calories": 400, "protein": 22, "fat": 35, "carbs": 0, "fiber": 0, "sodium": 1200}'::jsonb),

('ING_HERRGARD', 'Herrgård', 'herrgard', 'cheese',
 'Swedish semi-hard cheese with mild slightly sweet nutty flavor, 28% fat, similar to Swiss-style cheese.',
 '{"calories": 360, "protein": 27, "fat": 28, "carbs": 0, "fiber": 0, "sodium": 1200}'::jsonb),

('ING_JUUSTOLEIPA', 'Juustoleipä', 'juustoleipa', 'cheese',
 'Finnish squeaky cheese (bread cheese), traditionally baked until slightly charred, served warm with cloudberry jam.',
 '{"calories": 350, "protein": 26, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 580}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 10: AMERICAS (12 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
-- Mexico (6)
('ING_QUESO_PANELA', 'Queso Panela', 'queso-panela', 'cheese',
 'Mexican fresh cheese from skim milk with firm flexible texture that doesn''t melt, often sliced or crumbled.',
 '{"calories": 250, "protein": 21, "fat": 18, "carbs": 4, "fiber": 0, "sodium": 180}'::jsonb),

('ING_QUESO_ASADERO', 'Queso Asadero', 'queso-asadero', 'cheese',
 'Mexican melting cheese from Chihuahua with mild flavor, ideal for quesadillas and queso fundido.',
 '{"calories": 356, "protein": 23, "fat": 28, "carbs": 3, "fiber": 0, "sodium": 705}'::jsonb),

('ING_REQUESON', 'Requesón', 'requeson', 'cheese',
 'Mexican whey cheese similar to ricotta, soft cottage cheese-like texture for filling gorditas and empanadas.',
 '{"calories": 214, "protein": 12, "fat": 17, "carbs": 2, "fiber": 0, "sodium": 120}'::jsonb),

('ING_QUESO_ANEJO', 'Queso Añejo', 'queso-anejo', 'cheese',
 'Aged Mexican cheese with hard dry texture and strong salty flavor, often coated in paprika for enchiladas.',
 '{"calories": 373, "protein": 21, "fat": 30, "carbs": 5, "fiber": 0, "sodium": 1131}'::jsonb),

('ING_QUESO_MANCHEGO_MEX', 'Mexican Manchego', 'mexican-manchego', 'cheese',
 'Mexican adaptation with cow or goat milk, flavor reminiscent of sharp cheddar for sandwiches and crackers.',
 '{"calories": 423, "protein": 25, "fat": 35, "carbs": 0, "fiber": 0, "sodium": 850}'::jsonb),

('ING_QUESO_BLANCO', 'Queso Blanco', 'queso-blanco', 'cheese',
 'Creamy white Mexican cheese from skimmed cow milk, cross between mozzarella and cottage cheese.',
 '{"calories": 310, "protein": 22, "fat": 24, "carbs": 2, "fiber": 0, "sodium": 400}'::jsonb),

-- Argentina (4)
('ING_REGGIANITO', 'Reggianito', 'reggianito', 'cheese',
 'Argentine hard grana-type cheese inspired by Parmigiano Reggiano, produced in smaller wheels aged 5-6 months.',
 '{"calories": 360, "protein": 30, "fat": 27, "carbs": 0, "fiber": 0, "sodium": 700}'::jsonb),

('ING_PATEGRAS', 'Pategrás', 'pategras', 'cheese',
 'Argentina''s most popular semi-hard cow milk cheese with white-yellowish color, sweet elastic texture similar to Gouda.',
 '{"calories": 380, "protein": 27, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 650}'::jsonb),

('ING_PROVOLETA', 'Provoleta', 'provoleta', 'cheese',
 'Argentine grilled cheese variant of provolone created in 1940s, traditionally cooked as appetizer during asado.',
 '{"calories": 351, "protein": 26, "fat": 27, "carbs": 2, "fiber": 0, "sodium": 876}'::jsonb),

('ING_SARDO', 'Sardo', 'sardo', 'cheese',
 'Argentine firm cow milk cheese named after Italian Pecorino Sardo but made from cow milk, mellow and hearty.',
 '{"calories": 365, "protein": 28, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 720}'::jsonb),

-- Brazil (2)
('ING_CATUPIRY', 'Catupiry', 'catupiry', 'cheese',
 'Brazil''s most popular soft cream cheese developed by Italian immigrant in 1911, essential for Brazilian pizza.',
 '{"calories": 267, "protein": 10, "fat": 27, "carbs": 0, "fiber": 0, "sodium": 450}'::jsonb),

('ING_MINAS_FRESCAL', 'Queijo Minas Frescal', 'queijo-minas-frescal', 'cheese',
 'Brazilian fresh cheese from Minas Gerais with mild slightly tangy flavor and soft texture.',
 '{"calories": 264, "protein": 17, "fat": 20, "carbs": 3, "fiber": 0, "sodium": 380}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 11: MIDDLE EAST & AFRICA (8 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_NABULSI', 'Nabulsi', 'nabulsi', 'cheese',
 'Palestinian white brined cheese from Nablus flavored with mahleb and mastic, essential for knafeh dessert.',
 '{"calories": 308, "protein": 20, "fat": 24, "carbs": 3, "fiber": 0, "sodium": 640}'::jsonb),

('ING_JIBNEH_ARABIEH', 'Jibneh Arabieh', 'jibneh-arabieh', 'cheese',
 'Semi-hard Middle Eastern cheese meaning ''Arabic cheese'' with firm texture and mild flavor from cow or sheep milk.',
 '{"calories": 310, "protein": 21, "fat": 25, "carbs": 2, "fiber": 0, "sodium": 580}'::jsonb),

('ING_KASHKAVAL', 'Kashkaval', 'kashkaval', 'cheese',
 'Smooth semi-hard yellow cheese from Balkans and Middle East, traditionally sheep milk with excellent melting properties.',
 '{"calories": 353, "protein": 25, "fat": 28, "carbs": 4, "fiber": 0, "sodium": 680}'::jsonb),

('ING_DOMIATI', 'Domiati', 'domiati', 'cheese',
 'Egypt''s most common white brined cheese from Damietta with salt added before coagulation, documented since 332 BCE.',
 '{"calories": 357, "protein": 20, "fat": 30, "carbs": 2, "fiber": 0, "sodium": 850}'::jsonb),

('ING_KARIESH', 'Kariesh', 'kariesh', 'cheese',
 'Egyptian fresh cheese from cow or buffalo milk produced since pharaonic times, soft texture with mild flavor.',
 '{"calories": 220, "protein": 18, "fat": 15, "carbs": 3, "fiber": 0, "sodium": 380}'::jsonb),

('ING_RUMI', 'Rumi', 'rumi', 'cheese',
 'Egyptian aged hard cheese with sharp salty flavor, often eaten in sandwiches with Egyptian flatbread, similar to Romano.',
 '{"calories": 380, "protein": 28, "fat": 30, "carbs": 1, "fiber": 0, "sodium": 950}'::jsonb),

('ING_JBEN', 'Jben', 'jben', 'cheese',
 'Moroccan fresh cheese from cow, goat or sheep milk with slightly sour taste, consumed with bread or in salads.',
 '{"calories": 240, "protein": 16, "fat": 18, "carbs": 4, "fiber": 0, "sodium": 320}'::jsonb),

('ING_WAGASI', 'Wagasi', 'wagasi', 'cheese',
 'West African cheese from Benin and Nigeria made by Fulani people, coagulated with enzymes from Sodom apple leaves.',
 '{"calories": 290, "protein": 20, "fat": 22, "carbs": 3, "fiber": 0, "sodium": 420}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BATCH 12: ASIA (8 cheeses)
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition_per_100g) VALUES
('ING_RUSHAN', 'Rushan', 'rushan', 'cheese',
 'Chinese milk fan from Yunnan made by Bai people, stretched into translucent sheets over bamboo, crispy when deep-fried.',
 '{"calories": 320, "protein": 24, "fat": 22, "carbs": 8, "fiber": 0, "sodium": 180}'::jsonb),

('ING_RUBING', 'Rubing', 'rubing', 'cheese',
 'Chinese milk cake from Yunnan traditionally made from goat milk by Yi minority, firm texture like Indian paneer.',
 '{"calories": 310, "protein": 22, "fat": 24, "carbs": 3, "fiber": 0, "sodium": 160}'::jsonb),

('ING_SAKURA', 'Sakura', 'sakura', 'cheese',
 'Japanese soft yeast-ripened cheese from Hokkaido matured on cherry blossom leaves, gold medal winner at Mountain Cheese Olympics.',
 '{"calories": 280, "protein": 18, "fat": 23, "carbs": 2, "fiber": 0, "sodium": 340}'::jsonb),

('ING_BYASLAG', 'Byaslag', 'byaslag', 'cheese',
 'Mongolian firm un-aged cheese from cow, yak or goat milk with mild flavor, comparable to fresh mozzarella or dried Edam.',
 '{"calories": 295, "protein": 21, "fat": 23, "carbs": 2, "fiber": 0, "sodium": 150}'::jsonb),

('ING_AARUUL', 'Aaruul', 'aaruul', 'cheese',
 'Mongolian dried milk curd, rock-hard and nutrient-dense designed for longevity and portability, stored for months.',
 '{"calories": 350, "protein": 30, "fat": 20, "carbs": 10, "fiber": 0, "sodium": 100}'::jsonb),

('ING_CHHURPI', 'Chhurpi', 'chhurpi', 'cheese',
 'Tibetan yak milk cheese, world''s hardest cheese, dried and smoked then aged 6 months to 1 year with 20-year shelf life.',
 '{"calories": 370, "protein": 35, "fat": 18, "carbs": 12, "fiber": 0, "sodium": 140}'::jsonb),

('ING_KURUT', 'Kurut', 'kurut', 'cheese',
 'Chinese Uyghur cheese from Xinjiang made from naturally soured milk, dried into hard balls with tangy Parmesan-like funkiness.',
 '{"calories": 340, "protein": 28, "fat": 16, "carbs": 15, "fiber": 0, "sodium": 450}'::jsonb),

('ING_KESONG_PUTI', 'Kesong Puti', 'kesong-puti', 'cheese',
 'Filipino fresh cheese from carabao milk, soft white with mild slightly salty taste, traditional breakfast cheese.',
 '{"calories": 265, "protein": 18, "fat": 20, "carbs": 3, "fiber": 0, "sodium": 380}'::jsonb)

ON CONFLICT (id) DO NOTHING;

COMMIT;

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- Total new cheeses: 115
--
-- By region:
-- - Italy: 13 (Grana Padano, Asiago, Caciocavallo, Montasio, Toma, etc.)
-- - France: 15 (Beaufort, Reblochon, Morbier, Munster, Époisses, etc.)
-- - Spain: 14 (Cabrales, Mahón, Torta del Casar, Majorero, etc.)
-- - Germany: 8 (Allgäuer Bergkäse, Limburger, Tilsiter, Butterkäse, etc.)
-- - Switzerland: 7 (Appenzeller, Sbrinz, Tête de Moine, L'Etivaz, etc.)
-- - Netherlands: 6 (Leyden, Maasdam, Boerenkaas, Kernhem, etc.)
-- - Belgium: 4 (Herve, Chimay, Passendale, Orval)
-- - Austria: 6 (Vorarlberger Bergkäse, Tyrolean Grey, Gailtaler, etc.)
-- - UK: 8 (Stilton, Wensleydale, Red Leicester, Double Gloucester, etc.)
-- - Ireland: 5 (Cashel Blue, Dubliner, Coolea, Gubbeen, Ardrahan)
-- - Greece: 6 (Graviera, Kefalograviera, Kefalotyri, Manouri, etc.)
-- - Turkey: 5 (Tulum, Mihaliç, Dil, Lor, Civil)
-- - Portugal: 8 (Serra da Estrela, Azeitão, São Jorge, Rabaçal, etc.)
-- - Scandinavia: 10 (Jarlsberg, Gjetost, Havarti, Västerbotten, etc.)
-- - Mexico: 6 (Queso Panela, Asadero, Requesón, Añejo, etc.)
-- - Argentina: 4 (Reggianito, Pategrás, Provoleta, Sardo)
-- - Brazil: 2 (Catupiry, Minas Frescal)
-- - Middle East/Africa: 8 (Nabulsi, Domiati, Rumi, Jben, Wagasi, etc.)
-- - Asia: 8 (Rushan, Rubing, Sakura, Byaslag, Aaruul, Chhurpi, etc.)
-- ============================================================================

-- VERIFICATION QUERIES:
-- SELECT COUNT(*) FROM ingredients WHERE category = 'cheese';
-- SELECT id, name FROM ingredients WHERE category = 'cheese' ORDER BY name;
