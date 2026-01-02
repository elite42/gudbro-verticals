-- Argentinian Cuisine Database - Script 04: Product Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total: 47 dishes, ~280 ingredient links

-- Clear existing links
DELETE FROM product_ingredients WHERE product_type = 'argentinian';

-- ===========================================
-- ASADO (8 dishes)
-- ===========================================

-- ARG_ASADO_COMPLETO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_ASADO_COMPLETO', 'ING_BEEF_RIBS'),
('argentinian', 'ARG_ASADO_COMPLETO', 'ING_CHORIZO'),
('argentinian', 'ARG_ASADO_COMPLETO', 'ING_MORCILLA'),
('argentinian', 'ARG_ASADO_COMPLETO', 'ING_BEEF_FLANK'),
('argentinian', 'ARG_ASADO_COMPLETO', 'ING_CHIMICHURRI'),
('argentinian', 'ARG_ASADO_COMPLETO', 'ING_SALT');

-- ARG_COSTILLAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_COSTILLAS', 'ING_BEEF_RIBS'),
('argentinian', 'ARG_COSTILLAS', 'ING_SALT'),
('argentinian', 'ARG_COSTILLAS', 'ING_CHIMICHURRI');

-- ARG_VACIO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_VACIO', 'ING_BEEF_FLANK'),
('argentinian', 'ARG_VACIO', 'ING_SALT'),
('argentinian', 'ARG_VACIO', 'ING_CHIMICHURRI');

-- ARG_ENTRAÑA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_ENTRAÑA', 'ING_BEEF_SKIRT'),
('argentinian', 'ARG_ENTRAÑA', 'ING_SALT'),
('argentinian', 'ARG_ENTRAÑA', 'ING_CHIMICHURRI'),
('argentinian', 'ARG_ENTRAÑA', 'ING_OLIVE_OIL');

-- ARG_CHORIZO_CRIOLLO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_CHORIZO_CRIOLLO', 'ING_CHORIZO'),
('argentinian', 'ARG_CHORIZO_CRIOLLO', 'ING_CHIMICHURRI'),
('argentinian', 'ARG_CHORIZO_CRIOLLO', 'ING_BREAD');

-- ARG_MORCILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MORCILLA', 'ING_MORCILLA'),
('argentinian', 'ARG_MORCILLA', 'ING_BREAD');

-- ARG_PROVOLETA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_PROVOLETA', 'ING_PROVOLONE'),
('argentinian', 'ARG_PROVOLETA', 'ING_OREGANO'),
('argentinian', 'ARG_PROVOLETA', 'ING_CHILI_FLAKES'),
('argentinian', 'ARG_PROVOLETA', 'ING_OLIVE_OIL');

-- ARG_MATAMBRE_ARROLLADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MATAMBRE_ARROLLADO', 'ING_BEEF_FLANK'),
('argentinian', 'ARG_MATAMBRE_ARROLLADO', 'ING_EGG'),
('argentinian', 'ARG_MATAMBRE_ARROLLADO', 'ING_CARROT'),
('argentinian', 'ARG_MATAMBRE_ARROLLADO', 'ING_BELL_PEPPER'),
('argentinian', 'ARG_MATAMBRE_ARROLLADO', 'ING_PARSLEY'),
('argentinian', 'ARG_MATAMBRE_ARROLLADO', 'ING_GARLIC'),
('argentinian', 'ARG_MATAMBRE_ARROLLADO', 'ING_OLIVE_OIL');

-- ===========================================
-- EMPANADAS (7 dishes)
-- ===========================================

-- ARG_EMPANADA_CARNE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_BEEF'),
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_ONION'),
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_OLIVE'),
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_EGG'),
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_CUMIN'),
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_PAPRIKA'),
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_FLOUR'),
('argentinian', 'ARG_EMPANADA_CARNE', 'ING_LARD');

-- ARG_EMPANADA_SALTEÑA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_BEEF'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_POTATO'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_ONION'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_SCALLION'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_CUMIN'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_PAPRIKA'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_CHILI'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_FLOUR'),
('argentinian', 'ARG_EMPANADA_SALTEÑA', 'ING_LARD');

-- ARG_EMPANADA_TUCUMANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_BEEF'),
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_ONION'),
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_SCALLION'),
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_CUMIN'),
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_PAPRIKA'),
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_FLOUR'),
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_LARD'),
('argentinian', 'ARG_EMPANADA_TUCUMANA', 'ING_VEGETABLE_OIL');

-- ARG_EMPANADA_POLLO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_EMPANADA_POLLO', 'ING_CHICKEN_BREAST'),
('argentinian', 'ARG_EMPANADA_POLLO', 'ING_ONION'),
('argentinian', 'ARG_EMPANADA_POLLO', 'ING_BELL_PEPPER'),
('argentinian', 'ARG_EMPANADA_POLLO', 'ING_OREGANO'),
('argentinian', 'ARG_EMPANADA_POLLO', 'ING_FLOUR'),
('argentinian', 'ARG_EMPANADA_POLLO', 'ING_BUTTER');

-- ARG_EMPANADA_JAMON_QUESO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_EMPANADA_JAMON_QUESO', 'ING_HAM'),
('argentinian', 'ARG_EMPANADA_JAMON_QUESO', 'ING_MOZZARELLA'),
('argentinian', 'ARG_EMPANADA_JAMON_QUESO', 'ING_FLOUR'),
('argentinian', 'ARG_EMPANADA_JAMON_QUESO', 'ING_BUTTER');

-- ARG_EMPANADA_HUMITA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_EMPANADA_HUMITA', 'ING_CORN'),
('argentinian', 'ARG_EMPANADA_HUMITA', 'ING_ONION'),
('argentinian', 'ARG_EMPANADA_HUMITA', 'ING_HEAVY_CREAM'),
('argentinian', 'ARG_EMPANADA_HUMITA', 'ING_CHEESE'),
('argentinian', 'ARG_EMPANADA_HUMITA', 'ING_FLOUR'),
('argentinian', 'ARG_EMPANADA_HUMITA', 'ING_BUTTER');

-- ARG_EMPANADA_VERDURA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_EMPANADA_VERDURA', 'ING_SWISS_CHARD'),
('argentinian', 'ARG_EMPANADA_VERDURA', 'ING_ONION'),
('argentinian', 'ARG_EMPANADA_VERDURA', 'ING_CHEESE'),
('argentinian', 'ARG_EMPANADA_VERDURA', 'ING_EGG'),
('argentinian', 'ARG_EMPANADA_VERDURA', 'ING_FLOUR'),
('argentinian', 'ARG_EMPANADA_VERDURA', 'ING_BUTTER');

-- ===========================================
-- MAINS (7 dishes)
-- ===========================================

-- ARG_MILANESA_NAPOLITANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MILANESA_NAPOLITANA', 'ING_BEEF'),
('argentinian', 'ARG_MILANESA_NAPOLITANA', 'ING_BREADCRUMBS'),
('argentinian', 'ARG_MILANESA_NAPOLITANA', 'ING_EGG'),
('argentinian', 'ARG_MILANESA_NAPOLITANA', 'ING_HAM'),
('argentinian', 'ARG_MILANESA_NAPOLITANA', 'ING_TOMATO_SAUCE'),
('argentinian', 'ARG_MILANESA_NAPOLITANA', 'ING_MOZZARELLA'),
('argentinian', 'ARG_MILANESA_NAPOLITANA', 'ING_OREGANO');

-- ARG_MILANESA_CLASICA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MILANESA_CLASICA', 'ING_BEEF'),
('argentinian', 'ARG_MILANESA_CLASICA', 'ING_BREADCRUMBS'),
('argentinian', 'ARG_MILANESA_CLASICA', 'ING_EGG'),
('argentinian', 'ARG_MILANESA_CLASICA', 'ING_GARLIC'),
('argentinian', 'ARG_MILANESA_CLASICA', 'ING_PARSLEY'),
('argentinian', 'ARG_MILANESA_CLASICA', 'ING_LEMON');

-- ARG_BIFE_CHORIZO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_BIFE_CHORIZO', 'ING_BEEF_SIRLOIN'),
('argentinian', 'ARG_BIFE_CHORIZO', 'ING_SALT'),
('argentinian', 'ARG_BIFE_CHORIZO', 'ING_CHIMICHURRI');

-- ARG_OJO_BIFE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_OJO_BIFE', 'ING_BEEF_RIBEYE'),
('argentinian', 'ARG_OJO_BIFE', 'ING_SALT'),
('argentinian', 'ARG_OJO_BIFE', 'ING_BLACK_PEPPER'),
('argentinian', 'ARG_OJO_BIFE', 'ING_CHIMICHURRI');

-- ARG_LOMO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_LOMO', 'ING_BEEF_TENDERLOIN'),
('argentinian', 'ARG_LOMO', 'ING_SALT'),
('argentinian', 'ARG_LOMO', 'ING_BUTTER'),
('argentinian', 'ARG_LOMO', 'ING_GARLIC');

-- ARG_POLLO_GRILLADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_POLLO_GRILLADO', 'ING_CHICKEN'),
('argentinian', 'ARG_POLLO_GRILLADO', 'ING_LEMON'),
('argentinian', 'ARG_POLLO_GRILLADO', 'ING_GARLIC'),
('argentinian', 'ARG_POLLO_GRILLADO', 'ING_OREGANO'),
('argentinian', 'ARG_POLLO_GRILLADO', 'ING_OLIVE_OIL'),
('argentinian', 'ARG_POLLO_GRILLADO', 'ING_SALT');

-- ARG_MATAMBRE_PIZZA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MATAMBRE_PIZZA', 'ING_BEEF_FLANK'),
('argentinian', 'ARG_MATAMBRE_PIZZA', 'ING_TOMATO_SAUCE'),
('argentinian', 'ARG_MATAMBRE_PIZZA', 'ING_MOZZARELLA'),
('argentinian', 'ARG_MATAMBRE_PIZZA', 'ING_OREGANO'),
('argentinian', 'ARG_MATAMBRE_PIZZA', 'ING_OLIVE_OIL');

-- ===========================================
-- PASTA (6 dishes)
-- ===========================================

-- ARG_NOQUIS_29
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_NOQUIS_29', 'ING_POTATO'),
('argentinian', 'ARG_NOQUIS_29', 'ING_FLOUR'),
('argentinian', 'ARG_NOQUIS_29', 'ING_EGG'),
('argentinian', 'ARG_NOQUIS_29', 'ING_TOMATO_SAUCE'),
('argentinian', 'ARG_NOQUIS_29', 'ING_PARMESAN'),
('argentinian', 'ARG_NOQUIS_29', 'ING_BASIL');

-- ARG_SORRENTINOS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_SORRENTINOS', 'ING_FLOUR'),
('argentinian', 'ARG_SORRENTINOS', 'ING_EGG'),
('argentinian', 'ARG_SORRENTINOS', 'ING_HAM'),
('argentinian', 'ARG_SORRENTINOS', 'ING_MOZZARELLA'),
('argentinian', 'ARG_SORRENTINOS', 'ING_RICOTTA'),
('argentinian', 'ARG_SORRENTINOS', 'ING_HEAVY_CREAM'),
('argentinian', 'ARG_SORRENTINOS', 'ING_PARMESAN');

-- ARG_RAVIOLES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_RAVIOLES', 'ING_FLOUR'),
('argentinian', 'ARG_RAVIOLES', 'ING_EGG'),
('argentinian', 'ARG_RAVIOLES', 'ING_RICOTTA'),
('argentinian', 'ARG_RAVIOLES', 'ING_SPINACH'),
('argentinian', 'ARG_RAVIOLES', 'ING_TOMATO_SAUCE'),
('argentinian', 'ARG_RAVIOLES', 'ING_PARMESAN');

-- ARG_TALLARINES_SALSA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_FLOUR'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_EGG'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_BEEF'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_TOMATO'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_ONION'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_CARROT'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_CELERY'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_RED_WINE'),
('argentinian', 'ARG_TALLARINES_SALSA', 'ING_PARMESAN');

-- ARG_CANELONES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_CANELONES', 'ING_FLOUR'),
('argentinian', 'ARG_CANELONES', 'ING_EGG'),
('argentinian', 'ARG_CANELONES', 'ING_BEEF'),
('argentinian', 'ARG_CANELONES', 'ING_SPINACH'),
('argentinian', 'ARG_CANELONES', 'ING_BECHAMEL'),
('argentinian', 'ARG_CANELONES', 'ING_MOZZARELLA'),
('argentinian', 'ARG_CANELONES', 'ING_PARMESAN');

-- ARG_LASAGNA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_LASAGNA', 'ING_LASAGNE_SHEETS'),
('argentinian', 'ARG_LASAGNA', 'ING_BEEF'),
('argentinian', 'ARG_LASAGNA', 'ING_TOMATO_SAUCE'),
('argentinian', 'ARG_LASAGNA', 'ING_BECHAMEL'),
('argentinian', 'ARG_LASAGNA', 'ING_MOZZARELLA'),
('argentinian', 'ARG_LASAGNA', 'ING_PARMESAN'),
('argentinian', 'ARG_LASAGNA', 'ING_ONION');

-- ===========================================
-- SOUPS (5 dishes)
-- ===========================================

-- ARG_LOCRO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_LOCRO', 'ING_HOMINY'),
('argentinian', 'ARG_LOCRO', 'ING_WHITE_BEAN'),
('argentinian', 'ARG_LOCRO', 'ING_BEEF'),
('argentinian', 'ARG_LOCRO', 'ING_CHORIZO'),
('argentinian', 'ARG_LOCRO', 'ING_PORK'),
('argentinian', 'ARG_LOCRO', 'ING_PUMPKIN'),
('argentinian', 'ARG_LOCRO', 'ING_ONION'),
('argentinian', 'ARG_LOCRO', 'ING_CUMIN'),
('argentinian', 'ARG_LOCRO', 'ING_PAPRIKA');

-- ARG_CARBONADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_CARBONADA', 'ING_BEEF'),
('argentinian', 'ARG_CARBONADA', 'ING_PEACH'),
('argentinian', 'ARG_CARBONADA', 'ING_CORN'),
('argentinian', 'ARG_CARBONADA', 'ING_PUMPKIN'),
('argentinian', 'ARG_CARBONADA', 'ING_POTATO'),
('argentinian', 'ARG_CARBONADA', 'ING_SWEET_POTATO'),
('argentinian', 'ARG_CARBONADA', 'ING_ONION'),
('argentinian', 'ARG_CARBONADA', 'ING_TOMATO'),
('argentinian', 'ARG_CARBONADA', 'ING_BEEF_BROTH');

-- ARG_GUISO_LENTEJAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_LENTILS'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_CHORIZO'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_POTATO'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_CARROT'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_ONION'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_TOMATO'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_GARLIC'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_BAY_LEAF'),
('argentinian', 'ARG_GUISO_LENTEJAS', 'ING_PAPRIKA');

-- ARG_PUCHERO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_PUCHERO', 'ING_BEEF'),
('argentinian', 'ARG_PUCHERO', 'ING_CHICKEN'),
('argentinian', 'ARG_PUCHERO', 'ING_CHORIZO'),
('argentinian', 'ARG_PUCHERO', 'ING_POTATO'),
('argentinian', 'ARG_PUCHERO', 'ING_SWEET_POTATO'),
('argentinian', 'ARG_PUCHERO', 'ING_CORN'),
('argentinian', 'ARG_PUCHERO', 'ING_CABBAGE'),
('argentinian', 'ARG_PUCHERO', 'ING_CARROT'),
('argentinian', 'ARG_PUCHERO', 'ING_PUMPKIN');

-- ARG_CAZUELA_MONDONGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_TRIPE'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_CHICKPEA'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_POTATO'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_CARROT'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_TOMATO'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_ONION'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_GARLIC'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_PAPRIKA'),
('argentinian', 'ARG_CAZUELA_MONDONGO', 'ING_OREGANO');

-- ===========================================
-- APPETIZERS (5 dishes)
-- ===========================================

-- ARG_CHIMICHURRI
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_CHIMICHURRI', 'ING_PARSLEY'),
('argentinian', 'ARG_CHIMICHURRI', 'ING_OREGANO'),
('argentinian', 'ARG_CHIMICHURRI', 'ING_GARLIC'),
('argentinian', 'ARG_CHIMICHURRI', 'ING_RED_WINE_VINEGAR'),
('argentinian', 'ARG_CHIMICHURRI', 'ING_OLIVE_OIL'),
('argentinian', 'ARG_CHIMICHURRI', 'ING_CHILI_FLAKES'),
('argentinian', 'ARG_CHIMICHURRI', 'ING_SALT');

-- ARG_SALSA_CRIOLLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_SALSA_CRIOLLA', 'ING_TOMATO'),
('argentinian', 'ARG_SALSA_CRIOLLA', 'ING_ONION'),
('argentinian', 'ARG_SALSA_CRIOLLA', 'ING_BELL_PEPPER'),
('argentinian', 'ARG_SALSA_CRIOLLA', 'ING_RED_WINE_VINEGAR'),
('argentinian', 'ARG_SALSA_CRIOLLA', 'ING_OLIVE_OIL'),
('argentinian', 'ARG_SALSA_CRIOLLA', 'ING_PARSLEY'),
('argentinian', 'ARG_SALSA_CRIOLLA', 'ING_OREGANO');

-- ARG_PAPAS_FRITAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_PAPAS_FRITAS', 'ING_POTATO'),
('argentinian', 'ARG_PAPAS_FRITAS', 'ING_VEGETABLE_OIL'),
('argentinian', 'ARG_PAPAS_FRITAS', 'ING_SALT');

-- ARG_ENSALADA_MIXTA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_ENSALADA_MIXTA', 'ING_LETTUCE'),
('argentinian', 'ARG_ENSALADA_MIXTA', 'ING_TOMATO'),
('argentinian', 'ARG_ENSALADA_MIXTA', 'ING_ONION'),
('argentinian', 'ARG_ENSALADA_MIXTA', 'ING_OLIVE_OIL'),
('argentinian', 'ARG_ENSALADA_MIXTA', 'ING_RED_WINE_VINEGAR'),
('argentinian', 'ARG_ENSALADA_MIXTA', 'ING_SALT');

-- ARG_TORTILLA_PAPA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_TORTILLA_PAPA', 'ING_POTATO'),
('argentinian', 'ARG_TORTILLA_PAPA', 'ING_EGG'),
('argentinian', 'ARG_TORTILLA_PAPA', 'ING_ONION'),
('argentinian', 'ARG_TORTILLA_PAPA', 'ING_OLIVE_OIL'),
('argentinian', 'ARG_TORTILLA_PAPA', 'ING_SALT');

-- ===========================================
-- DESSERTS (9 dishes)
-- ===========================================

-- ARG_DULCE_LECHE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_DULCE_LECHE', 'ING_MILK'),
('argentinian', 'ARG_DULCE_LECHE', 'ING_SUGAR'),
('argentinian', 'ARG_DULCE_LECHE', 'ING_VANILLA');

-- ARG_ALFAJORES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_ALFAJORES', 'ING_FLOUR'),
('argentinian', 'ARG_ALFAJORES', 'ING_CORN_STARCH'),
('argentinian', 'ARG_ALFAJORES', 'ING_BUTTER'),
('argentinian', 'ARG_ALFAJORES', 'ING_EGG'),
('argentinian', 'ARG_ALFAJORES', 'ING_DULCE_DE_LECHE'),
('argentinian', 'ARG_ALFAJORES', 'ING_CHOCOLATE'),
('argentinian', 'ARG_ALFAJORES', 'ING_COCONUT');

-- ARG_FLAN_MIXTO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_FLAN_MIXTO', 'ING_MILK'),
('argentinian', 'ARG_FLAN_MIXTO', 'ING_EGG'),
('argentinian', 'ARG_FLAN_MIXTO', 'ING_SUGAR'),
('argentinian', 'ARG_FLAN_MIXTO', 'ING_VANILLA'),
('argentinian', 'ARG_FLAN_MIXTO', 'ING_DULCE_DE_LECHE'),
('argentinian', 'ARG_FLAN_MIXTO', 'ING_HEAVY_CREAM');

-- ARG_PANQUEQUES_DDL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_PANQUEQUES_DDL', 'ING_FLOUR'),
('argentinian', 'ARG_PANQUEQUES_DDL', 'ING_MILK'),
('argentinian', 'ARG_PANQUEQUES_DDL', 'ING_EGG'),
('argentinian', 'ARG_PANQUEQUES_DDL', 'ING_BUTTER'),
('argentinian', 'ARG_PANQUEQUES_DDL', 'ING_DULCE_DE_LECHE'),
('argentinian', 'ARG_PANQUEQUES_DDL', 'ING_HEAVY_CREAM');

-- ARG_CHOCOTORTA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_CHOCOTORTA', 'ING_COOKIE'),
('argentinian', 'ARG_CHOCOTORTA', 'ING_CREAM_CHEESE'),
('argentinian', 'ARG_CHOCOTORTA', 'ING_DULCE_DE_LECHE'),
('argentinian', 'ARG_CHOCOTORTA', 'ING_MILK'),
('argentinian', 'ARG_CHOCOTORTA', 'ING_COCOA_POWDER');

-- ARG_VIGILANTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_VIGILANTE', 'ING_QUINCE_PASTE'),
('argentinian', 'ARG_VIGILANTE', 'ING_FRESH_CHEESE');

-- ARG_ARROZ_LECHE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_ARROZ_LECHE', 'ING_RICE'),
('argentinian', 'ARG_ARROZ_LECHE', 'ING_MILK'),
('argentinian', 'ARG_ARROZ_LECHE', 'ING_SUGAR'),
('argentinian', 'ARG_ARROZ_LECHE', 'ING_CINNAMON'),
('argentinian', 'ARG_ARROZ_LECHE', 'ING_VANILLA'),
('argentinian', 'ARG_ARROZ_LECHE', 'ING_DULCE_DE_LECHE');

-- ARG_FACTURAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_FACTURAS', 'ING_FLOUR'),
('argentinian', 'ARG_FACTURAS', 'ING_BUTTER'),
('argentinian', 'ARG_FACTURAS', 'ING_SUGAR'),
('argentinian', 'ARG_FACTURAS', 'ING_EGG'),
('argentinian', 'ARG_FACTURAS', 'ING_YEAST'),
('argentinian', 'ARG_FACTURAS', 'ING_DULCE_DE_LECHE'),
('argentinian', 'ARG_FACTURAS', 'ING_QUINCE_PASTE');

-- ARG_MEDIALUNAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MEDIALUNAS', 'ING_FLOUR'),
('argentinian', 'ARG_MEDIALUNAS', 'ING_BUTTER'),
('argentinian', 'ARG_MEDIALUNAS', 'ING_SUGAR'),
('argentinian', 'ARG_MEDIALUNAS', 'ING_EGG'),
('argentinian', 'ARG_MEDIALUNAS', 'ING_YEAST'),
('argentinian', 'ARG_MEDIALUNAS', 'ING_MILK'),
('argentinian', 'ARG_MEDIALUNAS', 'ING_VANILLA');

-- ===========================================
-- BEVERAGES (5 dishes)
-- ===========================================

-- ARG_MATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MATE', 'ING_YERBA_MATE'),
('argentinian', 'ARG_MATE', 'ING_WATER');

-- ARG_MATE_COCIDO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_MATE_COCIDO', 'ING_YERBA_MATE'),
('argentinian', 'ARG_MATE_COCIDO', 'ING_WATER'),
('argentinian', 'ARG_MATE_COCIDO', 'ING_MILK');

-- ARG_FERNET_COLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_FERNET_COLA', 'ING_FERNET_BRANCA'),
('argentinian', 'ARG_FERNET_COLA', 'ING_COLA');

-- ARG_CLERICO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_CLERICO', 'ING_WHITE_WINE'),
('argentinian', 'ARG_CLERICO', 'ING_APPLE'),
('argentinian', 'ARG_CLERICO', 'ING_ORANGE'),
('argentinian', 'ARG_CLERICO', 'ING_PEACH'),
('argentinian', 'ARG_CLERICO', 'ING_SUGAR');

-- ARG_SUBMARINO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('argentinian', 'ARG_SUBMARINO', 'ING_MILK'),
('argentinian', 'ARG_SUBMARINO', 'ING_CHOCOLATE');

-- Success message
SELECT 'Argentinian product_ingredients inserted: 47 dishes' AS status;
