-- ============================================
-- ITALIAN CUISINE - Data Import
-- GUDBRO Database Standards v1.7
-- ============================================
-- Total: 102 dishes

INSERT INTO italian (
    id, slug, name, local_name, description,
    category, region, status, origin,
    protein_type, cooking_method, spice_level, prep_time_min,
    dietary, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, is_nut_free, is_halal, is_kosher,
    allergens, intolerances, ingredient_ids, tags, popularity, is_public
) VALUES
(
    'ITA_TOS_RIBOLLITA', 'ribollita', 'Ribollita', 'Ribollita', 'Tuscan bread soup with cannellini beans, cavolo nero, and vegetables - reboiled',
    'zuppa', 'toscana', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Florence"}'::jsonb,
    NULL, 'stewed', 0, 90,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, false, true, true, true, true,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_BREAD', 'ING_CANNELLINI_BEANS', 'ING_CAVOLO_NERO', 'ING_CARROT', 'ING_ONION', 'ING_CELERY', 'ING_OLIVE_OIL', 'ING_TOMATO']::TEXT[], ARRAY['tuscan', 'bread-soup', 'winter', 'cucina-povera', 'iconic']::TEXT[], 92, true
),
(
    'ITA_ITA_MINESTRONE', 'minestrone', 'Minestrone', 'Minestrone', 'Hearty Italian vegetable soup with beans, pasta, and seasonal vegetables',
    'zuppa', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    NULL, 'stewed', 0, 60,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, false, true, true, true, true,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_CANNELLINI_BEANS', 'ING_CARROT', 'ING_CELERY', 'ING_ZUCCHINI', 'ING_POTATO', 'ING_TOMATO', 'ING_PASTA', 'ING_CABBAGE']::TEXT[], ARRAY['vegetable', 'hearty', 'classic', 'healthy']::TEXT[], 95, true
),
(
    'ITA_TOS_PAPPA_POMODORO', 'pappa-al-pomodoro', 'Pappa al Pomodoro', 'Pappa al Pomodoro', 'Thick Tuscan tomato and bread soup with basil - summer comfort',
    'zuppa', 'toscana', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Tuscany"}'::jsonb,
    NULL, 'stewed', 0, 40,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, false, true, true, true, true,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_BREAD', 'ING_TOMATO', 'ING_GARLIC', 'ING_BASIL', 'ING_OLIVE_OIL', 'ING_VEGETABLE_BROTH']::TEXT[], ARRAY['tuscan', 'tomato', 'summer', 'simple', 'cucina-povera']::TEXT[], 88, true
),
(
    'ITA_LAZ_STRACCIATELLA', 'stracciatella-alla-romana', 'Stracciatella alla Romana', 'Stracciatella', 'Roman egg drop soup with parmesan and spinach in chicken broth',
    'zuppa', 'lazio', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    NULL, 'boiled', 0, 20,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, true, false, true, true, true,
    '["eggs", "milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_EGG', 'ING_PARMESAN', 'ING_SPINACH', 'ING_CHICKEN_BROTH', 'ING_NUTMEG']::TEXT[], ARRAY['roman', 'light', 'comfort', 'egg']::TEXT[], 78, true
),
(
    'ITA_VEN_PASTA_FAGIOLI', 'pasta-e-fagioli', 'Pasta e Fagioli', 'Pasta e Fagioli', 'Thick hearty soup of small pasta and borlotti beans with tomato',
    'zuppa', 'veneto', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Veneto"}'::jsonb,
    NULL, 'stewed', 0, 75,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, false, true, true, false, false,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_PASTA', 'ING_BORLOTTI_BEAN', 'ING_TOMATO', 'ING_PANCETTA', 'ING_ROSEMARY', 'ING_CELERY', 'ING_CARROT', 'ING_ONION']::TEXT[], ARRAY['venetian', 'hearty', 'peasant', 'classic', 'comfort']::TEXT[], 90, true
),
(
    'ITA_TOS_ZUPPA_FARRO', 'zuppa-di-farro', 'Farro Soup', 'Zuppa di Farro', 'Tuscan ancient grain soup with farro, vegetables, and herbs',
    'zuppa', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Lucca"}'::jsonb,
    NULL, 'stewed', 0, 60,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, false, true, true, true, true,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_FARRO', 'ING_CARROT', 'ING_CELERY', 'ING_ONION', 'ING_TOMATO', 'ING_ROSEMARY', 'ING_SAGE']::TEXT[], ARRAY['tuscan', 'grain', 'healthy', 'winter', 'ancient-grain']::TEXT[], 75, true
),
(
    'ITA_TOS_ACQUACOTTA', 'acquacotta', 'Acquacotta', 'Acquacotta', 'Tuscan peasant soup with eggs, bread, onion, and pecorino',
    'zuppa', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Maremma"}'::jsonb,
    NULL, 'stewed', 0, 45,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["eggs", "gluten", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_EGG', 'ING_BREAD', 'ING_ONION', 'ING_CELERY', 'ING_TOMATO', 'ING_PECORINO']::TEXT[], ARRAY['tuscan', 'peasant', 'eggs', 'rustic', 'maremma']::TEXT[], 68, true
),
(
    'ITA_LIG_ZUPPA_PESCE', 'zuppa-di-pesce', 'Italian Fish Soup', 'Zuppa di Pesce', 'Aromatic fish soup with mixed seafood in tomato broth',
    'zuppa', 'liguria', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Liguria"}'::jsonb,
    'seafood', 'stewed', 0, 50,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish", "crustaceans", "molluscs"]'::jsonb, '[]'::jsonb, ARRAY['ING_MIXED_FISH', 'ING_SHRIMP', 'ING_MUSSELS', 'ING_CLAMS', 'ING_TOMATO', 'ING_WHITE_WINE', 'ING_GARLIC', 'ING_PARSLEY']::TEXT[], ARRAY['seafood', 'coastal', 'festive', 'elegant']::TEXT[], 82, true
),
(
    'ITA_EMR_ZUPPA_IMPERIALE', 'zuppa-imperiale', 'Zuppa Imperiale', 'Zuppa Imperiale', 'Rich broth with baked semolina, egg, and parmesan dumplings',
    'zuppa', 'emilia_romagna', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Bologna"}'::jsonb,
    NULL, 'boiled', 0, 45,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_SEMOLINA', 'ING_EGG', 'ING_PARMESAN', 'ING_BUTTER', 'ING_CHICKEN_BROTH', 'ING_NUTMEG']::TEXT[], ARRAY['emilian', 'christmas', 'festive', 'elegant']::TEXT[], 72, true
),
(
    'ITA_CAM_MINESTRA_MARITATA', 'minestra-maritata', 'Minestra Maritata', 'Minestra Maritata', 'Neapolitan wedding soup with mixed greens and various meats',
    'zuppa', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    'pork', 'stewed', 0, 180,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, false, true, false, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_PORK', 'ING_SAUSAGE', 'ING_ESCAROLE', 'ING_CHICORY', 'ING_CABBAGE', 'ING_PECORINO']::TEXT[], ARRAY['neapolitan', 'christmas', 'meat', 'winter']::TEXT[], 70, true
),
(
    'ITA_VEN_RISI_BISI', 'risi-e-bisi', 'Risi e Bisi', 'Risi e Bisi', 'Venetian rice and pea soup, traditionally served for the Feast of St. Mark',
    'zuppa', 'veneto', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Venice"}'::jsonb,
    NULL, 'stewed', 0, 35,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, false, true, false, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_RICE', 'ING_PEAS', 'ING_PANCETTA', 'ING_ONION', 'ING_PARMESAN', 'ING_BUTTER', 'ING_PARSLEY']::TEXT[], ARRAY['venetian', 'spring', 'st-mark', 'rice']::TEXT[], 80, true
),
(
    'ITA_EMR_PASSATELLI', 'passatelli-in-brodo', 'Passatelli in Brodo', 'Passatelli', 'Breadcrumb and parmesan pasta strands served in rich capon broth',
    'zuppa', 'emilia_romagna', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Emilia-Romagna"}'::jsonb,
    NULL, 'boiled', 0, 40,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, false, false, true, true, true,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_BREADCRUMB', 'ING_PARMESAN', 'ING_EGG', 'ING_NUTMEG', 'ING_LEMON_ZEST', 'ING_CHICKEN_BROTH']::TEXT[], ARRAY['emilian', 'christmas', 'brodo', 'traditional']::TEXT[], 78, true
),
(
    'ITA_VEN_TIRAMISU', 'tiramisu', 'Tiramisù', 'Tiramisù', 'Layered dessert with espresso-soaked ladyfingers and mascarpone cream',
    'dolce', 'veneto', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Treviso"}'::jsonb,
    NULL, NULL, 0, 30,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["eggs", "milk", "gluten"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_MASCARPONE', 'ING_LADYFINGERS', 'ING_ESPRESSO', 'ING_EGG', 'ING_COCOA', 'ING_SUGAR']::TEXT[], ARRAY['iconic', 'coffee', 'creamy', 'no-bake', 'world-famous']::TEXT[], 99, true
),
(
    'ITA_PIE_PANNA_COTTA', 'panna-cotta', 'Panna Cotta', 'Panna Cotta', 'Silky cooked cream pudding set with gelatin, served with berry coulis',
    'dolce', 'piemonte', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Piedmont"}'::jsonb,
    NULL, NULL, 0, 20,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, true, false, true, true, true,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_HEAVY_CREAM', 'ING_SUGAR', 'ING_VANILLA', 'ING_GELATIN', 'ING_MIXED_BERRIES']::TEXT[], ARRAY['creamy', 'elegant', 'piedmontese', 'simple']::TEXT[], 95, true
),
(
    'ITA_SIC_CANNOLI', 'cannoli-siciliani', 'Sicilian Cannoli', 'Cannoli', 'Crispy fried pastry tubes filled with sweetened ricotta cream and pistachios',
    'dolce', 'sicilia', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Palermo"}'::jsonb,
    NULL, 'deep_fried', 0, 60,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, false, true, true,
    '["milk", "gluten", "nuts"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_RICOTTA', 'ING_FLOUR', 'ING_SUGAR', 'ING_CANDIED_FRUIT', 'ING_PISTACHIO', 'ING_DARK_CHOCOLATE']::TEXT[], ARRAY['sicilian', 'fried', 'iconic', 'crispy']::TEXT[], 97, true
),
(
    'ITA_CAM_SFOGLIATELLA', 'sfogliatella', 'Sfogliatella', 'Sfogliatella', 'Shell-shaped Neapolitan pastry with flaky layers and ricotta semolina filling',
    'dolce', 'campania', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    NULL, 'baked', 0, 120,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["milk", "gluten", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_RICOTTA', 'ING_SEMOLINA', 'ING_CANDIED_ORANGE', 'ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR']::TEXT[], ARRAY['neapolitan', 'pastry', 'flaky', 'iconic']::TEXT[], 92, true
),
(
    'ITA_SIC_CASSATA', 'cassata-siciliana', 'Sicilian Cassata', 'Cassata', 'Elaborate Sicilian cake with ricotta, sponge, marzipan, and candied fruits',
    'dolce', 'sicilia', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Palermo"}'::jsonb,
    NULL, NULL, 0, 180,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, false, true, true,
    '["milk", "gluten", "nuts", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_RICOTTA', 'ING_SPONGE_CAKE', 'ING_MARZIPAN', 'ING_CANDIED_FRUIT', 'ING_SUGAR', 'ING_PISTACHIO']::TEXT[], ARRAY['sicilian', 'festive', 'elaborate', 'easter']::TEXT[], 85, true
),
(
    'ITA_CAM_BABA', 'baba-al-rum', 'Babà al Rum', 'Babà', 'Neapolitan yeast cake soaked in rum syrup until moist and fragrant',
    'dolce', 'campania', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    NULL, 'baked', 0, 90,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": true}'::jsonb, true, false, false, false, true, false, true,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_FLOUR', 'ING_EGG', 'ING_BUTTER', 'ING_RUM', 'ING_SUGAR', 'ING_YEAST']::TEXT[], ARRAY['neapolitan', 'rum', 'soaked', 'festive']::TEXT[], 88, true
),
(
    'ITA_PIE_ZABAIONE', 'zabaione', 'Zabaione', 'Zabaione', 'Warm frothy egg custard whipped with Marsala wine',
    'dolce', 'piemonte', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Piedmont"}'::jsonb,
    NULL, NULL, 0, 15,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": true}'::jsonb, true, false, true, true, true, false, true,
    '["eggs"]'::jsonb, '[]'::jsonb, ARRAY['ING_EGG_YOLK', 'ING_SUGAR', 'ING_MARSALA_WINE']::TEXT[], ARRAY['piedmontese', 'wine', 'warm', 'elegant', 'classic']::TEXT[], 78, true
),
(
    'ITA_CAM_TORTA_CAPRESE', 'torta-caprese', 'Torta Caprese', 'Torta Caprese', 'Flourless chocolate and almond cake from Capri, dense and fudgy',
    'dolce', 'campania', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Capri"}'::jsonb,
    NULL, 'baked', 0, 60,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, false, true, false, false, true, true,
    '["eggs", "milk", "nuts"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_DARK_CHOCOLATE', 'ING_ALMOND', 'ING_BUTTER', 'ING_EGG', 'ING_SUGAR']::TEXT[], ARRAY['gluten-free', 'chocolate', 'capri', 'almond']::TEXT[], 90, true
),
(
    'ITA_TOS_TORTA_NONNA', 'torta-della-nonna', 'Torta della Nonna', 'Torta della Nonna', 'Grandmother\',
    'dolce', 'toscana', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Tuscany"}'::jsonb,
    NULL, 'baked', 0, 75,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, false, true, true,
    '["milk", "gluten", "eggs", "nuts"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_PASTRY_CREAM', 'ING_SHORTCRUST_PASTRY', 'ING_PINE_NUTS', 'ING_LEMON_ZEST', 'ING_POWDERED_SUGAR']::TEXT[], ARRAY['tuscan', 'custard', 'grandmother', 'classic']::TEXT[], 88, true
),
(
    'ITA_LOM_AMARETTI', 'amaretti', 'Amaretti', 'Amaretti', 'Traditional Italian almond macaroons, crisp outside and chewy inside',
    'dolce', 'lombardia', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Saronno"}'::jsonb,
    NULL, 'baked', 0, 40,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, false, true, true, false, true, true,
    '["nuts", "eggs"]'::jsonb, '[]'::jsonb, ARRAY['ING_ALMOND', 'ING_SUGAR', 'ING_EGG_WHITE', 'ING_BITTER_ALMOND']::TEXT[], ARRAY['cookies', 'almond', 'gluten-free', 'crispy']::TEXT[], 82, true
),
(
    'ITA_TOS_CANTUCCI', 'cantucci', 'Cantucci', 'Cantucci', 'Tuscan almond biscotti, twice-baked, served with Vin Santo',
    'dolce', 'toscana', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Prato"}'::jsonb,
    NULL, 'baked', 0, 50,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, true, false, true, true,
    '["gluten", "eggs", "nuts"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_FLOUR', 'ING_ALMOND', 'ING_EGG', 'ING_SUGAR', 'ING_ORANGE_ZEST']::TEXT[], ARRAY['tuscan', 'biscotti', 'vin-santo', 'crunchy']::TEXT[], 88, true
),
(
    'ITA_LOM_PANETTONE', 'panettone', 'Panettone', 'Panettone', 'Milanese Christmas bread with candied fruits and raisins',
    'dolce', 'lombardia', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Milan"}'::jsonb,
    NULL, 'baked', 0, 360,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_FLOUR', 'ING_EGG', 'ING_BUTTER', 'ING_CANDIED_FRUIT', 'ING_RAISIN', 'ING_YEAST', 'ING_SUGAR']::TEXT[], ARRAY['milanese', 'christmas', 'festive', 'iconic']::TEXT[], 95, true
),
(
    'ITA_VEN_PANDORO', 'pandoro', 'Pandoro', 'Pandoro', 'Veronese golden Christmas cake, star-shaped and dusted with powdered sugar',
    'dolce', 'veneto', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Verona"}'::jsonb,
    NULL, 'baked', 0, 300,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_FLOUR', 'ING_EGG', 'ING_BUTTER', 'ING_SUGAR', 'ING_YEAST', 'ING_VANILLA', 'ING_POWDERED_SUGAR']::TEXT[], ARRAY['veronese', 'christmas', 'golden', 'festive']::TEXT[], 92, true
),
(
    'ITA_CAM_PASTIERA', 'pastiera-napoletana', 'Pastiera Napoletana', 'Pastiera', 'Neapolitan Easter tart with ricotta, wheat berries, and orange blossom',
    'dolce', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    NULL, 'baked', 0, 120,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_RICOTTA', 'ING_WHEAT_BERRIES', 'ING_SHORTCRUST_PASTRY', 'ING_EGG', 'ING_ORANGE_BLOSSOM', 'ING_CANDIED_ORANGE']::TEXT[], ARRAY['neapolitan', 'easter', 'traditional', 'aromatic']::TEXT[], 85, true
),
(
    'ITA_EMR_ZUPPA_INGLESE', 'zuppa-inglese', 'Zuppa Inglese', 'Zuppa Inglese', 'Italian trifle with alchermes-soaked sponge and two custards',
    'dolce', 'emilia_romagna', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Emilia-Romagna"}'::jsonb,
    NULL, NULL, 0, 60,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": true}'::jsonb, true, false, false, false, true, false, true,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_SPONGE_CAKE', 'ING_PASTRY_CREAM', 'ING_CHOCOLATE_CREAM', 'ING_ALCHERMES', 'ING_EGG']::TEXT[], ARRAY['emilian', 'trifle', 'layered', 'festive']::TEXT[], 78, true
),
(
    'ITA_CAM_CAPRESE', 'insalata-caprese', 'Caprese Salad', 'Insalata Caprese', 'Fresh buffalo mozzarella, ripe tomatoes, and basil drizzled with extra virgin olive oil',
    'antipasto_freddo', 'campania', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Capri"}'::jsonb,
    NULL, NULL, 0, 10,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, true, false, true, true, true,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_MOZZARELLA', 'ING_TOMATO', 'ING_BASIL', 'ING_OLIVE_OIL', 'ING_SALT']::TEXT[], ARRAY['fresh', 'summer', 'light', 'iconic']::TEXT[], 98, true
),
(
    'ITA_TOS_BRUSCHETTA', 'bruschetta-al-pomodoro', 'Bruschetta al Pomodoro', 'Bruschetta', 'Grilled bread rubbed with garlic and topped with fresh diced tomatoes, basil, and olive oil',
    'antipasto_freddo', 'toscana', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Tuscany"}'::jsonb,
    NULL, NULL, 0, 15,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, false, true, true, true, true,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_BREAD', 'ING_TOMATO', 'ING_GARLIC', 'ING_BASIL', 'ING_OLIVE_OIL']::TEXT[], ARRAY['classic', 'vegetarian', 'simple']::TEXT[], 95, true
),
(
    'ITA_PIE_CARPACCIO', 'carpaccio-di-manzo', 'Beef Carpaccio', 'Carpaccio di Manzo', 'Paper-thin slices of raw beef fillet with arugula, parmesan shavings, and lemon dressing',
    'antipasto_freddo', 'veneto', 'premium', '{"country": "Italy", "country_code": "IT", "city": "Venice"}'::jsonb,
    'beef', NULL, 0, 15,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, false, true, true, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_BEEF', 'ING_ARUGULA', 'ING_PARMESAN', 'ING_LEMON', 'ING_OLIVE_OIL']::TEXT[], ARRAY['raw', 'elegant', 'premium']::TEXT[], 88, true
),
(
    'ITA_PIE_VITELLO_TONNATO', 'vitello-tonnato', 'Vitello Tonnato', 'Vitello Tonnato', 'Chilled sliced veal tenderloin with creamy tuna, caper, and anchovy sauce',
    'antipasto_freddo', 'piemonte', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Piedmont"}'::jsonb,
    'veal', NULL, 0, 60,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, true, true, false, false,
    '["fish", "eggs"]'::jsonb, '[]'::jsonb, ARRAY['ING_VEAL', 'ING_TUNA', 'ING_MAYONNAISE', 'ING_CAPERS', 'ING_ANCHOVY']::TEXT[], ARRAY['piedmontese', 'elegant', 'cold', 'summer']::TEXT[], 82, true
),
(
    'ITA_EMR_PROSCIUTTO_MELONE', 'prosciutto-e-melone', 'Prosciutto e Melone', 'Prosciutto e Melone', 'Sweet ripe cantaloupe wrapped with aged Prosciutto di Parma DOP',
    'antipasto_freddo', 'emilia_romagna', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Parma"}'::jsonb,
    'pork', NULL, 0, 10,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, true, true, false, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_PROSCIUTTO', 'ING_CANTALOUPE']::TEXT[], ARRAY['summer', 'fresh', 'light', 'dop']::TEXT[], 90, true
),
(
    'ITA_PUG_BURRATA', 'burrata-con-pomodorini', 'Burrata with Cherry Tomatoes', 'Burrata con Pomodorini', 'Creamy burrata cheese from Puglia served with cherry tomatoes and basil pesto',
    'antipasto_freddo', 'puglia', 'popular', '{"country": "Italy", "country_code": "IT", "city": "Andria"}'::jsonb,
    NULL, NULL, 0, 10,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, false, true, false, false, true, true,
    '["milk", "nuts"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_BURRATA', 'ING_CHERRY_TOMATO', 'ING_BASIL', 'ING_PESTO_GENOVESE', 'ING_OLIVE_OIL']::TEXT[], ARRAY['creamy', 'fresh', 'premium', 'pugliese']::TEXT[], 94, true
),
(
    'ITA_ITA_ANTIPASTO_MISTO', 'antipasto-misto', 'Mixed Antipasto Platter', 'Antipasto Misto', 'Assorted Italian cured meats, cheeses, olives, and marinated vegetables',
    'antipasto_freddo', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    NULL, NULL, 0, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, false, true, false, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_PROSCIUTTO', 'ING_SALAMI', 'ING_MORTADELLA', 'ING_PROVOLONE', 'ING_OLIVE', 'ING_ARTICHOKE']::TEXT[], ARRAY['sharing', 'assorted', 'classic']::TEXT[], 88, true
),
(
    'ITA_SIC_CAPONATA', 'caponata-siciliana', 'Sicilian Caponata', 'Caponata', 'Sweet and sour eggplant stew with celery, capers, olives, and pine nuts',
    'antipasto_freddo', 'sicilia', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Palermo"}'::jsonb,
    NULL, NULL, 0, 45,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, false, true, true,
    '["nuts"]'::jsonb, '[]'::jsonb, ARRAY['ING_EGGPLANT', 'ING_CELERY', 'ING_CAPERS', 'ING_PINE_NUTS', 'ING_TOMATO', 'ING_VINEGAR', 'ING_OLIVE']::TEXT[], ARRAY['sicilian', 'sweet-sour', 'vegetarian', 'agrodolce']::TEXT[], 80, true
),
(
    'ITA_VEN_BACCALA_MANTECATO', 'baccala-mantecato', 'Creamed Salt Cod', 'Baccalà Mantecato', 'Venetian whipped salt cod with olive oil, served on grilled polenta',
    'antipasto_freddo', 'veneto', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Venice"}'::jsonb,
    'fish', NULL, 0, 90,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_SALT_COD', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_POLENTA']::TEXT[], ARRAY['venetian', 'creamy', 'traditional']::TEXT[], 75, true
),
(
    'ITA_TOS_PANZANELLA', 'panzanella', 'Tuscan Bread Salad', 'Panzanella', 'Tuscan summer salad with stale bread, tomatoes, cucumber, onion, and basil',
    'antipasto_freddo', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Tuscany"}'::jsonb,
    NULL, NULL, 0, 20,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, false, true, true, true, true,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_BREAD', 'ING_TOMATO', 'ING_CUCUMBER', 'ING_ONION', 'ING_BASIL', 'ING_OLIVE_OIL', 'ING_VINEGAR']::TEXT[], ARRAY['tuscan', 'summer', 'bread-salad', 'cucina-povera']::TEXT[], 78, true
),
(
    'ITA_PIE_CARNE_CRUDA', 'carne-cruda-allalbese', 'Carne Cruda all\', 'Carne Cruda', 'Piedmontese raw beef tartare with lemon, olive oil, and white truffle',
    'antipasto_freddo', 'piemonte', 'premium', '{"country": "Italy", "country_code": "IT", "city": "Alba"}'::jsonb,
    'beef', NULL, 0, 15,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, true, true, true, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_BEEF', 'ING_LEMON', 'ING_OLIVE_OIL', 'ING_TRUFFLE']::TEXT[], ARRAY['piedmontese', 'raw', 'premium', 'truffle']::TEXT[], 75, true
),
(
    'ITA_LIG_ACCIUGHE_LIMONE', 'acciughe-al-limone', 'Marinated Anchovies', 'Acciughe al Limone', 'Fresh anchovies marinated in lemon juice with garlic, parsley, and olive oil',
    'antipasto_freddo', 'liguria', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Liguria"}'::jsonb,
    'fish', NULL, 0, 30,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_ANCHOVY', 'ING_LEMON', 'ING_GARLIC', 'ING_PARSLEY', 'ING_OLIVE_OIL']::TEXT[], ARRAY['ligurian', 'seafood', 'marinated']::TEXT[], 70, true
),
(
    'ITA_CAM_MOZZARELLA_CARROZZA', 'mozzarella-in-carrozza', 'Mozzarella in Carrozza', 'Mozzarella in Carrozza', 'Fried mozzarella sandwiched between bread slices, a Neapolitan specialty',
    'antipasto_freddo', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    NULL, NULL, 0, 20,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["milk", "gluten", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_MOZZARELLA', 'ING_BREAD', 'ING_EGG', 'ING_FLOUR']::TEXT[], ARRAY['neapolitan', 'fried', 'comfort']::TEXT[], 82, true
),
(
    'ITA_EMR_GNOCCO_FRITTO', 'gnocco-fritto', 'Gnocco Fritto', 'Gnocco Fritto', 'Puffy fried dough pillows from Emilia, served with cured meats and cheese',
    'antipasto_freddo', 'emilia_romagna', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Modena"}'::jsonb,
    NULL, NULL, 0, 30,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_FLOUR', 'ING_LARD', 'ING_YEAST', 'ING_SALT']::TEXT[], ARRAY['emilian', 'fried', 'street-food']::TEXT[], 78, true
),
(
    'ITA_PUG_FRISELLA', 'frisella-pugliese', 'Frisella Pugliese', 'Frisella', 'Twice-baked bread ring soaked in water and topped with tomatoes, oregano, olive oil',
    'antipasto_freddo', 'puglia', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Puglia"}'::jsonb,
    NULL, NULL, 0, 15,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, false, true, true, true, true,
    '["gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_FRISELLA', 'ING_TOMATO', 'ING_OREGANO', 'ING_OLIVE_OIL', 'ING_SALT']::TEXT[], ARRAY['pugliese', 'summer', 'bread', 'cucina-povera']::TEXT[], 72, true
),
(
    'ITA_SIC_ARANCINI', 'arancini-siciliani', 'Sicilian Arancini', 'Arancini', 'Fried rice balls stuffed with ragù, mozzarella, and peas, coated in breadcrumbs',
    'antipasto_caldo', 'sicilia', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Palermo"}'::jsonb,
    NULL, 'deep_fried', 0, 60,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, false, false, true, false, false,
    '["gluten", "milk", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_RICE', 'ING_RAGU', 'ING_MOZZARELLA', 'ING_PEAS', 'ING_BREADCRUMB', 'ING_EGG']::TEXT[], ARRAY['sicilian', 'fried', 'street-food', 'iconic']::TEXT[], 95, true
),
(
    'ITA_LAZ_SUPPLI', 'suppli-al-telefono', 'Supplì al Telefono', 'Supplì', 'Roman fried rice croquettes with tomato sauce and stretchy mozzarella center',
    'antipasto_caldo', 'lazio', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    NULL, 'deep_fried', 0, 45,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "milk", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_RICE', 'ING_TOMATO_SAUCE', 'ING_MOZZARELLA', 'ING_BREADCRUMB', 'ING_EGG']::TEXT[], ARRAY['roman', 'fried', 'street-food']::TEXT[], 90, true
),
(
    'ITA_LAZ_CARCIOFI_GIUDIA', 'carciofi-alla-giudia', 'Jewish-Style Fried Artichokes', 'Carciofi alla Giudia', 'Whole artichokes deep-fried until crispy and golden, a Roman Jewish specialty',
    'antipasto_caldo', 'lazio', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    NULL, 'deep_fried', 0, 30,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_ARTICHOKE', 'ING_OLIVE_OIL', 'ING_LEMON', 'ING_SALT']::TEXT[], ARRAY['roman', 'jewish', 'fried', 'crispy', 'iconic']::TEXT[], 88, true
),
(
    'ITA_LAZ_CARCIOFI_ROMANA', 'carciofi-alla-romana', 'Roman-Style Braised Artichokes', 'Carciofi alla Romana', 'Artichokes stuffed with mint, garlic, and parsley, braised in olive oil',
    'antipasto_caldo', 'lazio', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    NULL, 'braised', 0, 45,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_ARTICHOKE', 'ING_MINT', 'ING_GARLIC', 'ING_PARSLEY', 'ING_OLIVE_OIL']::TEXT[], ARRAY['roman', 'braised', 'vegetarian']::TEXT[], 82, true
),
(
    'ITA_TOS_CROSTINI_FEGATINI', 'crostini-ai-fegatini', 'Tuscan Liver Crostini', 'Crostini Toscani', 'Toasted bread topped with creamy chicken liver pâté, capers, and anchovies',
    'antipasto_caldo', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Florence"}'::jsonb,
    'offal', 'sauteed', 0, 30,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, false, false, true, false, false,
    '["gluten", "fish", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_CHICKEN_LIVER', 'ING_BREAD', 'ING_ONION', 'ING_CAPERS', 'ING_ANCHOVY', 'ING_BUTTER']::TEXT[], ARRAY['tuscan', 'liver', 'traditional']::TEXT[], 75, true
),
(
    'ITA_LIG_FOCACCIA_RECCO', 'focaccia-di-recco', 'Focaccia di Recco', 'Focaccia col Formaggio', 'Paper-thin crispy focaccia filled with melted stracchino cheese, IGP protected',
    'antipasto_caldo', 'liguria', 'regional', '{"country": "Italy", "country_code": "IT", "city": "Recco"}'::jsonb,
    NULL, 'baked', 0, 25,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_FLOUR', 'ING_STRACCHINO', 'ING_OLIVE_OIL', 'ING_SALT']::TEXT[], ARRAY['ligurian', 'cheese', 'igp', 'crispy']::TEXT[], 80, true
),
(
    'ITA_CAM_FRITTATINA', 'frittatina-di-pasta', 'Frittatina di Pasta', 'Frittatina', 'Neapolitan fried pasta cake filled with béchamel, ham, and peas',
    'antipasto_caldo', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    NULL, 'deep_fried', 0, 40,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, false, false, true, false, false,
    '["gluten", "milk", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_PASTA', 'ING_BECHAMEL', 'ING_HAM', 'ING_PEAS', 'ING_EGG', 'ING_BREADCRUMB']::TEXT[], ARRAY['neapolitan', 'fried', 'street-food']::TEXT[], 78, true
),
(
    'ITA_CAM_CROCCHE', 'crocche-di-patate', 'Potato Croquettes', 'Crocchè', 'Neapolitan fried potato croquettes with parsley and cheese',
    'antipasto_caldo', 'campania', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    NULL, 'deep_fried', 0, 35,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "milk", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_POTATO', 'ING_EGG', 'ING_PARSLEY', 'ING_PARMESAN', 'ING_BREADCRUMB']::TEXT[], ARRAY['neapolitan', 'fried', 'potato']::TEXT[], 85, true
),
(
    'ITA_SIC_PANELLE', 'panelle-palermitane', 'Sicilian Chickpea Fritters', 'Panelle', 'Thin crispy fried chickpea flour fritters, a Palermo street food staple',
    'antipasto_caldo', 'sicilia', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Palermo"}'::jsonb,
    NULL, 'deep_fried', 0, 30,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_CHICKPEA_FLOUR', 'ING_PARSLEY', 'ING_OLIVE_OIL', 'ING_SALT']::TEXT[], ARRAY['sicilian', 'vegan', 'street-food', 'gluten-free']::TEXT[], 75, true
),
(
    'ITA_PUG_SGAGLIOZZE', 'sgagliozze', 'Fried Polenta Wedges', 'Sgagliozze', 'Bari street food - crispy fried polenta triangles served hot',
    'antipasto_caldo', 'puglia', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Bari"}'::jsonb,
    NULL, 'deep_fried', 0, 20,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_POLENTA', 'ING_OLIVE_OIL', 'ING_SALT']::TEXT[], ARRAY['pugliese', 'vegan', 'street-food', 'gluten-free']::TEXT[], 68, true
),
(
    'ITA_LIG_BRANZINO', 'branzino-al-forno', 'Roasted Sea Bass', 'Branzino al Forno', 'Whole sea bass roasted with herbs, lemon, and white wine',
    'secondo_pesce', 'liguria', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Liguria"}'::jsonb,
    'fish', 'roasted', 0, 35,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_SEA_BASS', 'ING_LEMON', 'ING_PARSLEY', 'ING_GARLIC', 'ING_WHITE_WINE', 'ING_OLIVE_OIL']::TEXT[], ARRAY['baked', 'whole-fish', 'elegant', 'light']::TEXT[], 90, true
),
(
    'ITA_CAM_ORATA_ACQUAPAZZA', 'orata-allacquapazza', 'Sea Bream in Crazy Water', 'Orata all\', 'Sea bream poached in a light broth of tomatoes, garlic, and olives',
    'secondo_pesce', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    'fish', 'braised', 0, 30,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_SEA_BREAM', 'ING_CHERRY_TOMATO', 'ING_GARLIC', 'ING_OLIVE', 'ING_PARSLEY', 'ING_WHITE_WINE']::TEXT[], ARRAY['neapolitan', 'poached', 'light', 'healthy']::TEXT[], 85, true
),
(
    'ITA_LIG_FRITTO_MISTO', 'fritto-misto-di-mare', 'Mixed Fried Seafood', 'Fritto Misto di Mare', 'Assorted lightly fried seafood including calamari, shrimp, and small fish',
    'secondo_pesce', 'liguria', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Liguria"}'::jsonb,
    'seafood', 'deep_fried', 0, 40,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, false, true, true, true, true,
    '["fish", "crustaceans", "molluscs", "gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_CALAMARI', 'ING_SHRIMP', 'ING_ANCHOVY', 'ING_FLOUR', 'ING_LEMON']::TEXT[], ARRAY['fried', 'seafood', 'sharing', 'coastal']::TEXT[], 92, true
),
(
    'ITA_VEN_BACCALA_VICENTINA', 'baccala-alla-vicentina', 'Vicenza-Style Salt Cod', 'Baccalà alla Vicentina', 'Creamy stewed salt cod with milk, onions, and parmesan, served with polenta',
    'secondo_pesce', 'veneto', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Vicenza"}'::jsonb,
    'fish', 'stewed', 0, 240,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, false, true, true, true,
    '["fish", "milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_SALT_COD', 'ING_MILK', 'ING_ONION', 'ING_PARMESAN', 'ING_OLIVE_OIL', 'ING_ANCHOVY']::TEXT[], ARRAY['venetian', 'creamy', 'traditional', 'slow-cooked']::TEXT[], 78, true
),
(
    'ITA_TOS_BACCALA_LIVORNESE', 'baccala-alla-livornese', 'Livorno-Style Salt Cod', 'Baccalà alla Livornese', 'Salt cod stewed with tomatoes, olives, and capers Livorno-style',
    'secondo_pesce', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Livorno"}'::jsonb,
    'fish', 'stewed', 0, 60,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_SALT_COD', 'ING_TOMATO', 'ING_OLIVE', 'ING_CAPERS', 'ING_GARLIC', 'ING_PARSLEY']::TEXT[], ARRAY['tuscan', 'stewed', 'rustic']::TEXT[], 75, true
),
(
    'ITA_TOS_CACCIUCCO', 'cacciucco', 'Livorno Fish Stew', 'Cacciucco', 'Hearty Tuscan fish stew with assorted seafood in spicy tomato broth',
    'secondo_pesce', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Livorno"}'::jsonb,
    'seafood', 'stewed', 2, 90,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, false, true, true, true, true,
    '["fish", "crustaceans", "molluscs", "gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_MIXED_FISH', 'ING_MUSSELS', 'ING_SHRIMP', 'ING_TOMATO', 'ING_GARLIC', 'ING_CHILI', 'ING_WHITE_WINE', 'ING_BREAD']::TEXT[], ARRAY['tuscan', 'stew', 'spicy', 'rustic', 'coastal']::TEXT[], 80, true
),
(
    'ITA_SIC_PESCE_SPADA', 'pesce-spada-alla-griglia', 'Grilled Swordfish', 'Pesce Spada alla Griglia', 'Grilled swordfish steaks with salmoriglio sauce of lemon, oregano, and olive oil',
    'secondo_pesce', 'sicilia', 'popular', '{"country": "Italy", "country_code": "IT", "city": "Messina"}'::jsonb,
    'fish', 'grilled', 0, 25,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_SWORDFISH', 'ING_LEMON', 'ING_OREGANO', 'ING_GARLIC', 'ING_OLIVE_OIL']::TEXT[], ARRAY['sicilian', 'grilled', 'summer', 'light']::TEXT[], 88, true
),
(
    'ITA_SIC_SARDE_BECCAFICO', 'sarde-a-beccafico', 'Stuffed Sardines Beccafico', 'Sarde a Beccafico', 'Sicilian sardines stuffed with breadcrumbs, pine nuts, raisins, and bay leaves',
    'secondo_pesce', 'sicilia', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Palermo"}'::jsonb,
    'fish', 'baked', 0, 45,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, false, false, false, true, false, true, true,
    '["fish", "gluten", "nuts"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_SARDINES', 'ING_BREADCRUMB', 'ING_PINE_NUTS', 'ING_RAISIN', 'ING_BAY_LEAVES', 'ING_ORANGE_ZEST']::TEXT[], ARRAY['sicilian', 'stuffed', 'sweet-savory']::TEXT[], 72, true
),
(
    'ITA_CAM_COZZE_MARINARA', 'cozze-alla-marinara', 'Mussels Marinara', 'Cozze alla Marinara', 'Mussels steamed in white wine with garlic, parsley, and cherry tomatoes',
    'secondo_pesce', 'campania', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Campania"}'::jsonb,
    'seafood', 'steamed', 0, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["molluscs"]'::jsonb, '[]'::jsonb, ARRAY['ING_MUSSELS', 'ING_WHITE_WINE', 'ING_GARLIC', 'ING_PARSLEY', 'ING_CHERRY_TOMATO', 'ING_OLIVE_OIL']::TEXT[], ARRAY['steamed', 'wine', 'coastal', 'quick']::TEXT[], 88, true
),
(
    'ITA_CAM_IMPEPATA_COZZE', 'impepata-di-cozze', 'Peppered Mussels', 'Impepata di Cozze', 'Neapolitan mussels steamed and seasoned generously with black pepper and lemon',
    'secondo_pesce', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    'seafood', 'steamed', 1, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["molluscs"]'::jsonb, '[]'::jsonb, ARRAY['ING_MUSSELS', 'ING_BLACK_PEPPER', 'ING_LEMON', 'ING_PARSLEY', 'ING_GARLIC']::TEXT[], ARRAY['neapolitan', 'peppered', 'simple']::TEXT[], 82, true
),
(
    'ITA_CAM_CALAMARI_RIPIENI', 'calamari-ripieni', 'Stuffed Calamari', 'Calamari Ripieni', 'Squid stuffed with breadcrumbs, garlic, parsley, braised in tomato sauce',
    'secondo_pesce', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Campania"}'::jsonb,
    'seafood', 'braised', 0, 50,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, false, true, true, true, true,
    '["molluscs", "gluten"]'::jsonb, '["gluten"]'::jsonb, ARRAY['ING_CALAMARI', 'ING_BREADCRUMB', 'ING_GARLIC', 'ING_PARSLEY', 'ING_TOMATO_SAUCE']::TEXT[], ARRAY['stuffed', 'neapolitan', 'braised']::TEXT[], 80, true
),
(
    'ITA_TOS_CALAMARI_ZIMINO', 'calamari-in-zimino', 'Calamari in Zimino', 'Calamari in Zimino', 'Squid braised with Swiss chard, tomatoes, and white wine - Tuscan style',
    'secondo_pesce', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Livorno"}'::jsonb,
    'seafood', 'braised', 0, 45,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["molluscs"]'::jsonb, '[]'::jsonb, ARRAY['ING_CALAMARI', 'ING_SWISS_CHARD', 'ING_TOMATO', 'ING_WHITE_WINE', 'ING_GARLIC']::TEXT[], ARRAY['tuscan', 'braised', 'greens']::TEXT[], 70, true
),
(
    'ITA_SIC_TONNO_SICILIANA', 'tonno-alla-siciliana', 'Sicilian-Style Tuna', 'Tonno alla Siciliana', 'Seared tuna with capers, olives, mint, and tomato sauce Sicilian-style',
    'secondo_pesce', 'sicilia', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Sicily"}'::jsonb,
    'fish', 'pan_fried', 0, 25,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_TUNA', 'ING_CAPERS', 'ING_OLIVE', 'ING_TOMATO', 'ING_MINT', 'ING_WHITE_WINE']::TEXT[], ARRAY['sicilian', 'seared', 'mediterranean']::TEXT[], 82, true
),
(
    'ITA_PUG_TIELLA', 'tiella-barese', 'Tiella Barese', 'Tiella', 'Baked layered dish of rice, potatoes, mussels, and tomatoes in a clay pot',
    'secondo_pesce', 'puglia', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Bari"}'::jsonb,
    'seafood', 'baked', 0, 90,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["molluscs"]'::jsonb, '[]'::jsonb, ARRAY['ING_RICE', 'ING_POTATO', 'ING_MUSSELS', 'ING_TOMATO', 'ING_ONION', 'ING_PECORINO']::TEXT[], ARRAY['pugliese', 'baked', 'one-pot', 'traditional']::TEXT[], 75, true
),
(
    'ITA_ITA_PESCE_SALE', 'pesce-al-sale', 'Salt-Crusted Fish', 'Pesce al Sale', 'Whole fish baked in a salt crust, retaining moisture and delicate flavor',
    'secondo_pesce', 'pan_italian', 'premium', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    'fish', 'baked', 0, 45,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '["fish"]'::jsonb, '[]'::jsonb, ARRAY['ING_SEA_BASS', 'ING_SEA_SALT', 'ING_EGG_WHITE', 'ING_LEMON', 'ING_HERBS']::TEXT[], ARRAY['elegant', 'technique', 'whole-fish', 'premium']::TEXT[], 78, true
),
(
    'ITA_ITA_PATATE_FORNO', 'patate-al-forno', 'Roasted Potatoes', 'Patate al Forno', 'Italian roasted potatoes with rosemary, garlic, and olive oil',
    'contorno', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    NULL, 'roasted', 0, 45,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_POTATO', 'ING_ROSEMARY', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_SALT']::TEXT[], ARRAY['roasted', 'classic', 'simple', 'comfort']::TEXT[], 95, true
),
(
    'ITA_ITA_VERDURE_GRIGLIATE', 'verdure-grigliate', 'Grilled Vegetables', 'Verdure Grigliate', 'Grilled seasonal vegetables with olive oil and herbs',
    'contorno', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    NULL, 'grilled', 0, 25,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_ZUCCHINI', 'ING_EGGPLANT', 'ING_BELL_PEPPER', 'ING_OLIVE_OIL', 'ING_HERBS']::TEXT[], ARRAY['grilled', 'healthy', 'summer', 'vegetarian']::TEXT[], 92, true
),
(
    'ITA_ITA_SPINACI_SALTATI', 'spinaci-saltati', 'Sautéed Spinach', 'Spinaci Saltati', 'Spinach sautéed with garlic, lemon, and olive oil',
    'contorno', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    NULL, 'sauteed', 0, 10,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_SPINACH', 'ING_GARLIC', 'ING_LEMON', 'ING_OLIVE_OIL']::TEXT[], ARRAY['green', 'healthy', 'quick', 'simple']::TEXT[], 85, true
),
(
    'ITA_CAM_PARMIGIANA', 'parmigiana-di-melanzane', 'Eggplant Parmigiana', 'Parmigiana di Melanzane', 'Layered fried eggplant with tomato sauce, mozzarella, and parmesan',
    'contorno', 'campania', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Campania"}'::jsonb,
    NULL, 'baked', 0, 75,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["milk", "gluten"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_EGGPLANT', 'ING_TOMATO_SAUCE', 'ING_MOZZARELLA', 'ING_PARMESAN', 'ING_BASIL', 'ING_FLOUR', 'ING_EGG']::TEXT[], ARRAY['baked', 'cheesy', 'classic', 'iconic', 'southern']::TEXT[], 95, true
),
(
    'ITA_TOS_FAGIOLI_UCCELLETTO', 'fagioli-alluccelletto', 'Tuscan White Beans', 'Fagioli all\', 'Cannellini beans stewed with tomato, sage, and garlic Tuscan-style',
    'contorno', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Tuscany"}'::jsonb,
    NULL, 'stewed', 0, 40,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_CANNELLINI_BEANS', 'ING_TOMATO', 'ING_SAGE', 'ING_GARLIC', 'ING_OLIVE_OIL']::TEXT[], ARRAY['tuscan', 'beans', 'traditional', 'vegan']::TEXT[], 80, true
),
(
    'ITA_PIE_PEPERONATA', 'peperonata', 'Stewed Peppers', 'Peperonata', 'Bell peppers stewed with tomatoes, onions, and olive oil',
    'contorno', 'piemonte', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Piedmont"}'::jsonb,
    NULL, 'stewed', 0, 35,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_BELL_PEPPER', 'ING_TOMATO', 'ING_ONION', 'ING_OLIVE_OIL', 'ING_BASIL']::TEXT[], ARRAY['stewed', 'vegetable', 'summer', 'colorful']::TEXT[], 78, true
),
(
    'ITA_CAM_FRIARIELLI', 'friarielli', 'Neapolitan Broccoli Rabe', 'Friarielli', 'Sautéed broccoli rabe with garlic and chili peppers, a Neapolitan staple',
    'contorno', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Naples"}'::jsonb,
    NULL, 'sauteed', 1, 20,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_BROCCOLI_RABE', 'ING_GARLIC', 'ING_CHILI', 'ING_OLIVE_OIL']::TEXT[], ARRAY['neapolitan', 'bitter', 'spicy', 'healthy']::TEXT[], 75, true
),
(
    'ITA_LAZ_CICORIA_RIPASSATA', 'cicoria-ripassata', 'Sautéed Chicory', 'Cicoria Ripassata', 'Roman-style chicory sautéed with garlic and chili peppers',
    'contorno', 'lazio', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    NULL, 'sauteed', 1, 25,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_CHICORY', 'ING_GARLIC', 'ING_CHILI', 'ING_OLIVE_OIL']::TEXT[], ARRAY['roman', 'bitter', 'healthy', 'traditional']::TEXT[], 70, true
),
(
    'ITA_LAZ_PISELLI_PROSCIUTTO', 'piselli-al-prosciutto', 'Peas with Prosciutto', 'Piselli al Prosciutto', 'Sweet peas braised with prosciutto, onion, and butter',
    'contorno', 'lazio', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    NULL, 'braised', 0, 25,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, false, true, false, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_PEAS', 'ING_PROSCIUTTO', 'ING_ONION', 'ING_BUTTER', 'ING_PARSLEY']::TEXT[], ARRAY['roman', 'spring', 'classic', 'comfort']::TEXT[], 78, true
),
(
    'ITA_VEN_RADICCHIO_GRIGLIA', 'radicchio-alla-griglia', 'Grilled Radicchio', 'Radicchio alla Griglia', 'Grilled Treviso radicchio with olive oil and balsamic vinegar',
    'contorno', 'veneto', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Treviso"}'::jsonb,
    NULL, 'grilled', 0, 15,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_RADICCHIO', 'ING_OLIVE_OIL', 'ING_BALSAMIC_VINEGAR', 'ING_SALT']::TEXT[], ARRAY['venetian', 'grilled', 'bitter', 'winter']::TEXT[], 72, true
),
(
    'ITA_SIC_CAPONATA_CONTORNO', 'caponata-contorno', 'Sicilian Caponata Side', 'Caponata', 'Sweet and sour eggplant side dish with capers and pine nuts',
    'contorno', 'sicilia', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Sicily"}'::jsonb,
    NULL, 'stewed', 0, 40,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, false, true, true,
    '["nuts"]'::jsonb, '[]'::jsonb, ARRAY['ING_EGGPLANT', 'ING_CELERY', 'ING_OLIVE', 'ING_CAPERS', 'ING_PINE_NUTS', 'ING_TOMATO', 'ING_VINEGAR', 'ING_SUGAR']::TEXT[], ARRAY['sicilian', 'agrodolce', 'sweet-sour', 'summer']::TEXT[], 82, true
),
(
    'ITA_LIG_TORTA_VERDURA', 'torta-di-verdura', 'Ligurian Vegetable Pie', 'Torta di Verdura', 'Savory pie filled with Swiss chard, ricotta, and parmesan',
    'contorno', 'liguria', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Liguria"}'::jsonb,
    NULL, 'baked', 0, 60,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, false, false, true, true, true,
    '["gluten", "milk", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_SWISS_CHARD', 'ING_RICOTTA', 'ING_PARMESAN', 'ING_EGG', 'ING_FLOUR', 'ING_OLIVE_OIL']::TEXT[], ARRAY['ligurian', 'vegetable-pie', 'savory', 'traditional']::TEXT[], 70, true
),
(
    'ITA_LOM_POLENTA', 'polenta', 'Creamy Polenta', 'Polenta', 'Traditional creamy cornmeal polenta with butter and cheese',
    'contorno', 'lombardia', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Lombardy"}'::jsonb,
    NULL, 'boiled', 0, 45,
    '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, false, true, false, true, true, true,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_POLENTA', 'ING_BUTTER', 'ING_PARMESAN', 'ING_SALT']::TEXT[], ARRAY['northern', 'comfort', 'winter', 'classic']::TEXT[], 88, true
),
(
    'ITA_ITA_INSALATA_MISTA', 'insalata-mista', 'Mixed Green Salad', 'Insalata Mista', 'Fresh mixed greens with olive oil and balsamic dressing',
    'contorno', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    NULL, NULL, 0, 10,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_MIXED_GREENS', 'ING_OLIVE_OIL', 'ING_BALSAMIC_VINEGAR', 'ING_SALT']::TEXT[], ARRAY['fresh', 'light', 'healthy', 'simple']::TEXT[], 85, true
),
(
    'ITA_ITA_FAGIOLINI', 'fagiolini-in-padella', 'Sautéed Green Beans', 'Fagiolini in Padella', 'Green beans sautéed with garlic, tomato, and olive oil',
    'contorno', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    NULL, 'sauteed', 0, 20,
    '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, true, true, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_GREEN_BEANS', 'ING_GARLIC', 'ING_TOMATO', 'ING_OLIVE_OIL']::TEXT[], ARRAY['vegetable', 'healthy', 'simple', 'summer']::TEXT[], 80, true
),
(
    'ITA_LOM_OSSOBUCO', 'ossobuco-alla-milanese', 'Ossobuco alla Milanese', 'Ossobuco', 'Braised veal shanks with gremolata, traditionally served with risotto alla milanese',
    'secondo_carne', 'lombardia', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Milan"}'::jsonb,
    'veal', 'braised', 0, 150,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, true, true, true, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_VEAL_SHANK', 'ING_WHITE_WINE', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_LEMON_ZEST', 'ING_PARSLEY', 'ING_GARLIC']::TEXT[], ARRAY['milanese', 'braised', 'iconic', 'slow-cooked']::TEXT[], 95, true
),
(
    'ITA_TOS_BISTECCA_FIORENTINA', 'bistecca-alla-fiorentina', 'Bistecca alla Fiorentina', 'Bistecca', 'Thick T-bone steak from Chianina beef, grilled rare over charcoal, seasoned with salt and olive oil',
    'secondo_carne', 'toscana', 'premium', '{"country": "Italy", "country_code": "IT", "city": "Florence"}'::jsonb,
    'beef', 'grilled', 0, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, true, true, true, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_BEEF_TBONE', 'ING_OLIVE_OIL', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY']::TEXT[], ARRAY['florentine', 'grilled', 'premium', 'iconic', 'chianina']::TEXT[], 98, true
),
(
    'ITA_LAZ_SALTIMBOCCA', 'saltimbocca-alla-romana', 'Saltimbocca alla Romana', 'Saltimbocca', 'Veal escalopes topped with prosciutto and sage, pan-fried in white wine and butter sauce',
    'secondo_carne', 'lazio', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    'veal', 'pan_fried', 0, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, false, true, false, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_VEAL', 'ING_PROSCIUTTO', 'ING_SAGE', 'ING_WHITE_WINE', 'ING_BUTTER']::TEXT[], ARRAY['roman', 'quick', 'elegant']::TEXT[], 92, true
),
(
    'ITA_LOM_COTOLETTA', 'cotoletta-alla-milanese', 'Cotoletta alla Milanese', 'Cotoletta', 'Bone-in breaded veal cutlet fried in clarified butter until golden and crispy',
    'secondo_carne', 'lombardia', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Milan"}'::jsonb,
    'veal', 'fried', 0, 30,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, false, false, true, true, false,
    '["gluten", "eggs", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_VEAL_CUTLET', 'ING_BREADCRUMB', 'ING_EGG', 'ING_BUTTER', 'ING_LEMON']::TEXT[], ARRAY['milanese', 'fried', 'iconic', 'breaded']::TEXT[], 94, true
),
(
    'ITA_PIE_BRASATO_BAROLO', 'brasato-al-barolo', 'Brasato al Barolo', 'Brasato', 'Beef braised slowly in Barolo wine with aromatic vegetables and herbs',
    'secondo_carne', 'piemonte', 'premium', '{"country": "Italy", "country_code": "IT", "region": "Piedmont"}'::jsonb,
    'beef', 'braised', 0, 240,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, true, true, true, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_BEEF_CHUCK', 'ING_RED_WINE', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_BAY_LEAVES', 'ING_CLOVE', 'ING_CINNAMON']::TEXT[], ARRAY['piedmontese', 'braised', 'wine', 'slow-cooked', 'premium']::TEXT[], 88, true
),
(
    'ITA_TOS_TAGLIATA', 'tagliata-di-manzo', 'Tagliata di Manzo', 'Tagliata', 'Sliced grilled beef steak served on a bed of arugula with parmesan and aged balsamic',
    'secondo_carne', 'toscana', 'popular', '{"country": "Italy", "country_code": "IT", "region": "Tuscany"}'::jsonb,
    'beef', 'grilled', 0, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, false, true, true, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_BEEF_STEAK', 'ING_ARUGULA', 'ING_PARMESAN', 'ING_BALSAMIC_VINEGAR', 'ING_ROSEMARY', 'ING_OLIVE_OIL']::TEXT[], ARRAY['tuscan', 'grilled', 'steak', 'elegant']::TEXT[], 90, true
),
(
    'ITA_PIE_BOLLITO_MISTO', 'bollito-misto', 'Bollito Misto', 'Bollito Misto', 'Grand platter of mixed boiled meats served with salsa verde, mostarda, and horseradish',
    'secondo_carne', 'piemonte', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Piedmont"}'::jsonb,
    'beef', 'boiled', 0, 180,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, true, true, false, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_BEEF', 'ING_VEAL', 'ING_CHICKEN', 'ING_COTECHINO', 'ING_CARROT', 'ING_CELERY', 'ING_ONION']::TEXT[], ARRAY['piedmontese', 'winter', 'traditional', 'boiled', 'festive']::TEXT[], 72, true
),
(
    'ITA_TOS_ARISTA', 'arista-di-maiale', 'Arista di Maiale', 'Arista', 'Tuscan roast pork loin with garlic, rosemary, and fennel seeds',
    'secondo_carne', 'toscana', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Florence"}'::jsonb,
    'pork', 'roasted', 0, 90,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, true, true, false, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_PORK_LOIN', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_FENNEL_SEED', 'ING_OLIVE_OIL', 'ING_SALT']::TEXT[], ARRAY['tuscan', 'roasted', 'pork', 'sunday-roast']::TEXT[], 82, true
),
(
    'ITA_TOS_POLLO_CACCIATORE', 'pollo-alla-cacciatora', 'Pollo alla Cacciatora', 'Pollo alla Cacciatora', 'Hunter-style chicken braised with tomatoes, olives, capers, and rosemary',
    'secondo_carne', 'toscana', 'classic', '{"country": "Italy", "country_code": "IT", "region": "Tuscany"}'::jsonb,
    'poultry', 'braised', 0, 60,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_CHICKEN', 'ING_TOMATO', 'ING_OLIVE', 'ING_CAPERS', 'ING_ONION', 'ING_WHITE_WINE', 'ING_ROSEMARY']::TEXT[], ARRAY['tuscan', 'rustic', 'braised', 'hunter-style']::TEXT[], 85, true
),
(
    'ITA_CAM_INVOLTINI', 'involtini-di-vitello', 'Involtini di Vitello', 'Involtini', 'Veal rolls stuffed with prosciutto and provolone, braised in tomato sauce',
    'secondo_carne', 'campania', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Campania"}'::jsonb,
    'veal', 'braised', 0, 50,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, false, true, false, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_VEAL', 'ING_PROSCIUTTO', 'ING_PROVOLONE', 'ING_TOMATO_SAUCE', 'ING_WHITE_WINE', 'ING_PARSLEY']::TEXT[], ARRAY['southern', 'stuffed', 'braised']::TEXT[], 78, true
),
(
    'ITA_LAZ_PORCHETTA', 'porchetta', 'Porchetta', 'Porchetta', 'Slow-roasted whole pig stuffed with fennel, garlic, rosemary, and sage',
    'secondo_carne', 'lazio', 'classic', '{"country": "Italy", "country_code": "IT", "city": "Ariccia"}'::jsonb,
    'pork', 'roasted', 0, 300,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, true, true, false, false,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_PORK_BELLY', 'ING_FENNEL_SEED', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_SAGE', 'ING_SALT', 'ING_BLACK_PEPPER']::TEXT[], ARRAY['roman', 'roasted', 'street-food', 'festive', 'iconic']::TEXT[], 90, true
),
(
    'ITA_LAZ_ABBACCHIO', 'abbacchio-scottadito', 'Abbacchio Scottadito', 'Abbacchio', 'Grilled Roman lamb chops, so hot they burn your fingers - a spring tradition',
    'secondo_carne', 'lazio', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    'lamb', 'grilled', 0, 25,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_LAMB_CHOPS', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_OLIVE_OIL', 'ING_LEMON']::TEXT[], ARRAY['roman', 'grilled', 'lamb', 'spring', 'easter']::TEXT[], 82, true
),
(
    'ITA_VEN_FEGATO_VENEZIANA', 'fegato-alla-veneziana', 'Fegato alla Veneziana', 'Fegato alla Veneziana', 'Venetian-style calf liver sautéed with sweet caramelized onions',
    'secondo_carne', 'veneto', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Venice"}'::jsonb,
    'offal', 'sauteed', 0, 30,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, false, true, true, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_CALF_LIVER', 'ING_ONION', 'ING_BUTTER', 'ING_WHITE_WINE', 'ING_PARSLEY', 'ING_SAGE']::TEXT[], ARRAY['venetian', 'offal', 'quick', 'classic']::TEXT[], 72, true
),
(
    'ITA_LAZ_TRIPPA_ROMANA', 'trippa-alla-romana', 'Trippa alla Romana', 'Trippa', 'Roman-style tripe stewed with tomatoes, mint, and pecorino romano',
    'secondo_carne', 'lazio', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    'offal', 'stewed', 0, 90,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, false, true, true, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_TRIPE', 'ING_TOMATO', 'ING_MINT', 'ING_PECORINO', 'ING_ONION', 'ING_CARROT', 'ING_CELERY']::TEXT[], ARRAY['roman', 'offal', 'traditional', 'quinto-quarto']::TEXT[], 68, true
),
(
    'ITA_LAZ_CODA_VACCINARA', 'coda-alla-vaccinara', 'Coda alla Vaccinara', 'Coda', 'Roman oxtail stewed in tomato sauce with celery and pine nuts',
    'secondo_carne', 'lazio', 'traditional', '{"country": "Italy", "country_code": "IT", "city": "Rome"}'::jsonb,
    'beef', 'stewed', 0, 240,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": false}'::jsonb, false, false, true, true, false, true, false,
    '["nuts"]'::jsonb, '[]'::jsonb, ARRAY['ING_OXTAIL', 'ING_TOMATO', 'ING_CELERY', 'ING_PINE_NUTS', 'ING_RAISIN', 'ING_COCOA']::TEXT[], ARRAY['roman', 'oxtail', 'slow-cooked', 'quinto-quarto']::TEXT[], 75, true
),
(
    'ITA_LIG_CONIGLIO', 'coniglio-alla-ligure', 'Coniglio alla Ligure', 'Coniglio', 'Ligurian rabbit braised with taggiasca olives, pine nuts, and white wine',
    'secondo_carne', 'liguria', 'traditional', '{"country": "Italy", "country_code": "IT", "region": "Liguria"}'::jsonb,
    'rabbit', 'braised', 0, 90,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, false, true, true,
    '["nuts"]'::jsonb, '[]'::jsonb, ARRAY['ING_RABBIT', 'ING_OLIVE', 'ING_PINE_NUTS', 'ING_WHITE_WINE', 'ING_THYME', 'ING_ROSEMARY']::TEXT[], ARRAY['ligurian', 'braised', 'rabbit']::TEXT[], 70, true
),
(
    'ITA_ABR_ARROSTICINI', 'arrosticini', 'Arrosticini', 'Arrosticini', 'Abruzzo lamb skewers, small cubes of mutton grilled over charcoal',
    'secondo_carne', 'abruzzo', 'regional', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    'lamb', 'grilled', 0, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, false, false, true, true, true, true, true,
    '[]'::jsonb, '[]'::jsonb, ARRAY['ING_LAMB', 'ING_SALT', 'ING_OLIVE_OIL']::TEXT[], ARRAY['abruzzese', 'grilled', 'skewers', 'street-food']::TEXT[], 85, true
),
(
    'ITA_EMR_ROSA_PARMA', 'rosa-di-parma', 'Rosa di Parma', 'Rosa di Parma', 'Beef tenderloin stuffed with Parma ham and parmigiano, cooked in Lambrusco wine',
    'secondo_carne', 'emilia_romagna', 'premium', '{"country": "Italy", "country_code": "IT", "city": "Parma"}'::jsonb,
    'beef', 'roasted', 0, 90,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, false, false, true, false, true, false, false,
    '["milk"]'::jsonb, '["lactose"]'::jsonb, ARRAY['ING_BEEF_TENDERLOIN', 'ING_PROSCIUTTO', 'ING_PARMESAN', 'ING_RED_WINE']::TEXT[], ARRAY['emilian', 'elegant', 'festive', 'premium']::TEXT[], 78, true
),
(
    'ITA_ITA_SCALOPPINE', 'scaloppine-al-limone', 'Scaloppine al Limone', 'Scaloppine', 'Thin veal cutlets sautéed in butter and lemon sauce',
    'secondo_carne', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    'veal', 'sauteed', 0, 20,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, false, false, true, true, false,
    '["gluten", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_VEAL', 'ING_BUTTER', 'ING_LEMON', 'ING_FLOUR', 'ING_WHITE_WINE', 'ING_PARSLEY']::TEXT[], ARRAY['classic', 'quick', 'elegant', 'lemon']::TEXT[], 85, true
),
(
    'ITA_ITA_SCALOPPINE_MARSALA', 'scaloppine-al-marsala', 'Scaloppine al Marsala', 'Scaloppine al Marsala', 'Thin veal cutlets sautéed with Marsala wine and mushrooms',
    'secondo_carne', 'pan_italian', 'classic', '{"country": "Italy", "country_code": "IT"}'::jsonb,
    'veal', 'sauteed', 0, 25,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, false, false, false, false, true, true, false,
    '["gluten", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, ARRAY['ING_VEAL', 'ING_BUTTER', 'ING_MARSALA_WINE', 'ING_MUSHROOM', 'ING_FLOUR']::TEXT[], ARRAY['classic', 'wine', 'mushroom']::TEXT[], 82, true
)

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    local_name = EXCLUDED.local_name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    region = EXCLUDED.region,
    status = EXCLUDED.status,
    origin = EXCLUDED.origin,
    protein_type = EXCLUDED.protein_type,
    cooking_method = EXCLUDED.cooking_method,
    spice_level = EXCLUDED.spice_level,
    prep_time_min = EXCLUDED.prep_time_min,
    dietary = EXCLUDED.dietary,
    is_vegetarian = EXCLUDED.is_vegetarian,
    is_vegan = EXCLUDED.is_vegan,
    is_gluten_free = EXCLUDED.is_gluten_free,
    is_dairy_free = EXCLUDED.is_dairy_free,
    is_nut_free = EXCLUDED.is_nut_free,
    is_halal = EXCLUDED.is_halal,
    is_kosher = EXCLUDED.is_kosher,
    allergens = EXCLUDED.allergens,
    intolerances = EXCLUDED.intolerances,
    ingredient_ids = EXCLUDED.ingredient_ids,
    tags = EXCLUDED.tags,
    popularity = EXCLUDED.popularity,
    is_public = EXCLUDED.is_public,
    updated_at = NOW();