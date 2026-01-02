-- ============================================
-- SPANISH CUISINE - Product Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================
-- Junction table linking Spanish dishes to ingredients
-- Total: ~280 links for 55 products

INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES

-- ============================================
-- TAPAS
-- ============================================
-- Patatas Bravas
('spanish', 'SPA_PATATAS_BRAVAS', 'ING_POTATO'),
('spanish', 'SPA_PATATAS_BRAVAS', 'ING_OLIVE_OIL'),
('spanish', 'SPA_PATATAS_BRAVAS', 'ING_SALSA_BRAVA'),
('spanish', 'SPA_PATATAS_BRAVAS', 'ING_GARLIC'),
('spanish', 'SPA_PATATAS_BRAVAS', 'ING_SMOKED_PAPRIKA'),

-- Gambas al Ajillo
('spanish', 'SPA_GAMBAS_AJILLO', 'ING_GAMBAS'),
('spanish', 'SPA_GAMBAS_AJILLO', 'ING_GARLIC'),
('spanish', 'SPA_GAMBAS_AJILLO', 'ING_OLIVE_OIL'),
('spanish', 'SPA_GAMBAS_AJILLO', 'ING_CHILI_FLAKES'),
('spanish', 'SPA_GAMBAS_AJILLO', 'ING_PARSLEY'),

-- Pimientos de Padrón
('spanish', 'SPA_PIMIENTOS_PADRON', 'ING_PADRON_PEPPERS'),
('spanish', 'SPA_PIMIENTOS_PADRON', 'ING_OLIVE_OIL'),
('spanish', 'SPA_PIMIENTOS_PADRON', 'ING_SALT'),

-- Albóndigas
('spanish', 'SPA_ALBONDIGAS', 'ING_GROUND_BEEF'),
('spanish', 'SPA_ALBONDIGAS', 'ING_GROUND_PORK'),
('spanish', 'SPA_ALBONDIGAS', 'ING_BREADCRUMB'),
('spanish', 'SPA_ALBONDIGAS', 'ING_EGG'),
('spanish', 'SPA_ALBONDIGAS', 'ING_TOMATO_SAUCE'),
('spanish', 'SPA_ALBONDIGAS', 'ING_GARLIC'),
('spanish', 'SPA_ALBONDIGAS', 'ING_PARSLEY'),

-- Boquerones en Vinagre
('spanish', 'SPA_BOQUERONES', 'ING_ANCHOVY'),
('spanish', 'SPA_BOQUERONES', 'ING_WHITE_VINEGAR'),
('spanish', 'SPA_BOQUERONES', 'ING_GARLIC'),
('spanish', 'SPA_BOQUERONES', 'ING_OLIVE_OIL'),
('spanish', 'SPA_BOQUERONES', 'ING_PARSLEY'),

-- Croquetas de Jamón
('spanish', 'SPA_JAMON_CROQUETAS', 'ING_SERRANO_HAM'),
('spanish', 'SPA_JAMON_CROQUETAS', 'ING_BUTTER'),
('spanish', 'SPA_JAMON_CROQUETAS', 'ING_FLOUR'),
('spanish', 'SPA_JAMON_CROQUETAS', 'ING_MILK'),
('spanish', 'SPA_JAMON_CROQUETAS', 'ING_BREADCRUMB'),
('spanish', 'SPA_JAMON_CROQUETAS', 'ING_EGG'),

-- Calamares a la Romana
('spanish', 'SPA_CALAMARES_FRITOS', 'ING_SQUID'),
('spanish', 'SPA_CALAMARES_FRITOS', 'ING_FLOUR'),
('spanish', 'SPA_CALAMARES_FRITOS', 'ING_LEMON'),

-- Pulpo a la Gallega
('spanish', 'SPA_PULPO_GALLEGO', 'ING_OCTOPUS'),
('spanish', 'SPA_PULPO_GALLEGO', 'ING_POTATO'),
('spanish', 'SPA_PULPO_GALLEGO', 'ING_OLIVE_OIL'),
('spanish', 'SPA_PULPO_GALLEGO', 'ING_SMOKED_PAPRIKA'),
('spanish', 'SPA_PULPO_GALLEGO', 'ING_SALT'),

-- Pan con Tomate
('spanish', 'SPA_PAN_TOMATE', 'ING_BREAD'),
('spanish', 'SPA_PAN_TOMATE', 'ING_TOMATO'),
('spanish', 'SPA_PAN_TOMATE', 'ING_GARLIC'),
('spanish', 'SPA_PAN_TOMATE', 'ING_OLIVE_OIL'),
('spanish', 'SPA_PAN_TOMATE', 'ING_SALT'),

-- Aceitunas Aliñadas
('spanish', 'SPA_ACEITUNAS', 'ING_OLIVE'),
('spanish', 'SPA_ACEITUNAS', 'ING_GARLIC'),
('spanish', 'SPA_ACEITUNAS', 'ING_ORANGE'),
('spanish', 'SPA_ACEITUNAS', 'ING_MIXED_HERBS'),

-- Piquillos Rellenos
('spanish', 'SPA_PIQUILLOS_RELLENOS', 'ING_PIQUILLO'),
('spanish', 'SPA_PIQUILLOS_RELLENOS', 'ING_BACALAO'),
('spanish', 'SPA_PIQUILLOS_RELLENOS', 'ING_CREAM'),
('spanish', 'SPA_PIQUILLOS_RELLENOS', 'ING_GARLIC'),

-- Chopitos
('spanish', 'SPA_CHOPITOS', 'ING_SQUID'),
('spanish', 'SPA_CHOPITOS', 'ING_FLOUR'),
('spanish', 'SPA_CHOPITOS', 'ING_LEMON'),
('spanish', 'SPA_CHOPITOS', 'ING_SALT'),

-- Manchego con Membrillo
('spanish', 'SPA_MANCHEGO', 'ING_MANCHEGO'),
('spanish', 'SPA_MANCHEGO', 'ING_QUINCE'),

-- Escalivada
('spanish', 'SPA_ESCALIVADA', 'ING_EGGPLANT'),
('spanish', 'SPA_ESCALIVADA', 'ING_BELL_PEPPER'),
('spanish', 'SPA_ESCALIVADA', 'ING_ONION'),
('spanish', 'SPA_ESCALIVADA', 'ING_OLIVE_OIL'),

-- Banderillas
('spanish', 'SPA_BANDERILLAS', 'ING_OLIVE'),
('spanish', 'SPA_BANDERILLAS', 'ING_PICKLED_ONION'),
('spanish', 'SPA_BANDERILLAS', 'ING_ANCHOVY'),
('spanish', 'SPA_BANDERILLAS', 'ING_BELL_PEPPER'),

-- Champiñones al Ajillo
('spanish', 'SPA_CHAMPIÑONES', 'ING_MUSHROOM'),
('spanish', 'SPA_CHAMPIÑONES', 'ING_GARLIC'),
('spanish', 'SPA_CHAMPIÑONES', 'ING_OLIVE_OIL'),
('spanish', 'SPA_CHAMPIÑONES', 'ING_PARSLEY'),

-- ============================================
-- RICE DISHES
-- ============================================
-- Paella Valenciana
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_BOMBA_RICE'),
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_RABBIT'),
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_CHICKEN'),
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_GREEN_BEANS'),
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_SAFFRON'),
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_OLIVE_OIL'),
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_TOMATO'),
('spanish', 'SPA_PAELLA_VALENCIANA', 'ING_ROSEMARY'),

-- Paella Mixta
('spanish', 'SPA_PAELLA_MIXTA', 'ING_BOMBA_RICE'),
('spanish', 'SPA_PAELLA_MIXTA', 'ING_CHICKEN'),
('spanish', 'SPA_PAELLA_MIXTA', 'ING_SHRIMP'),
('spanish', 'SPA_PAELLA_MIXTA', 'ING_MUSSELS'),
('spanish', 'SPA_PAELLA_MIXTA', 'ING_SQUID'),
('spanish', 'SPA_PAELLA_MIXTA', 'ING_SAFFRON'),
('spanish', 'SPA_PAELLA_MIXTA', 'ING_BELL_PEPPER'),

-- Arroz Negro
('spanish', 'SPA_ARROZ_NEGRO', 'ING_BOMBA_RICE'),
('spanish', 'SPA_ARROZ_NEGRO', 'ING_SQUID'),
('spanish', 'SPA_ARROZ_NEGRO', 'ING_SQUID_INK'),
('spanish', 'SPA_ARROZ_NEGRO', 'ING_GARLIC'),
('spanish', 'SPA_ARROZ_NEGRO', 'ING_OLIVE_OIL'),

-- Arroz a Banda
('spanish', 'SPA_ARROZ_BANDA', 'ING_BOMBA_RICE'),
('spanish', 'SPA_ARROZ_BANDA', 'ING_FISH_STOCK'),
('spanish', 'SPA_ARROZ_BANDA', 'ING_SAFFRON'),
('spanish', 'SPA_ARROZ_BANDA', 'ING_GARLIC'),

-- Fideuà
('spanish', 'SPA_FIDEUA', 'ING_VERMICELLI'),
('spanish', 'SPA_FIDEUA', 'ING_SHRIMP'),
('spanish', 'SPA_FIDEUA', 'ING_MUSSELS'),
('spanish', 'SPA_FIDEUA', 'ING_SQUID'),
('spanish', 'SPA_FIDEUA', 'ING_FISH_STOCK'),
('spanish', 'SPA_FIDEUA', 'ING_ROMESCO'),

-- Arroz Caldoso
('spanish', 'SPA_ARROZ_CALDOSO', 'ING_BOMBA_RICE'),
('spanish', 'SPA_ARROZ_CALDOSO', 'ING_LOBSTER'),
('spanish', 'SPA_ARROZ_CALDOSO', 'ING_SHRIMP'),
('spanish', 'SPA_ARROZ_CALDOSO', 'ING_FISH_STOCK'),
('spanish', 'SPA_ARROZ_CALDOSO', 'ING_SAFFRON'),

-- Arroz al Horno
('spanish', 'SPA_ARROZ_HORNO', 'ING_BOMBA_RICE'),
('spanish', 'SPA_ARROZ_HORNO', 'ING_CHICKPEA'),
('spanish', 'SPA_ARROZ_HORNO', 'ING_MORCILLA'),
('spanish', 'SPA_ARROZ_HORNO', 'ING_PORK_RIBS'),
('spanish', 'SPA_ARROZ_HORNO', 'ING_TOMATO'),

-- Arroz con Verduras
('spanish', 'SPA_ARROZ_VERDURAS', 'ING_BOMBA_RICE'),
('spanish', 'SPA_ARROZ_VERDURAS', 'ING_ARTICHOKE_HEARTS'),
('spanish', 'SPA_ARROZ_VERDURAS', 'ING_BELL_PEPPER'),
('spanish', 'SPA_ARROZ_VERDURAS', 'ING_GREEN_BEANS'),
('spanish', 'SPA_ARROZ_VERDURAS', 'ING_SAFFRON'),

-- ============================================
-- SEAFOOD
-- ============================================
-- Bacalao al Pil Pil
('spanish', 'SPA_BACALAO_PILPIL', 'ING_BACALAO'),
('spanish', 'SPA_BACALAO_PILPIL', 'ING_GARLIC'),
('spanish', 'SPA_BACALAO_PILPIL', 'ING_OLIVE_OIL'),
('spanish', 'SPA_BACALAO_PILPIL', 'ING_CHILI'),

-- Bacalao a la Vizcaína
('spanish', 'SPA_BACALAO_VIZCAINA', 'ING_BACALAO'),
('spanish', 'SPA_BACALAO_VIZCAINA', 'ING_BELL_PEPPER'),
('spanish', 'SPA_BACALAO_VIZCAINA', 'ING_TOMATO'),
('spanish', 'SPA_BACALAO_VIZCAINA', 'ING_ONION'),

-- Merluza en Salsa Verde
('spanish', 'SPA_MERLUZA_SALSA_VERDE', 'ING_HAKE'),
('spanish', 'SPA_MERLUZA_SALSA_VERDE', 'ING_CLAMS'),
('spanish', 'SPA_MERLUZA_SALSA_VERDE', 'ING_PARSLEY'),
('spanish', 'SPA_MERLUZA_SALSA_VERDE', 'ING_WHITE_WINE'),
('spanish', 'SPA_MERLUZA_SALSA_VERDE', 'ING_GARLIC'),

-- Almejas a la Marinera
('spanish', 'SPA_ALMEJAS_MARINERA', 'ING_CLAMS'),
('spanish', 'SPA_ALMEJAS_MARINERA', 'ING_WHITE_WINE'),
('spanish', 'SPA_ALMEJAS_MARINERA', 'ING_GARLIC'),
('spanish', 'SPA_ALMEJAS_MARINERA', 'ING_PARSLEY'),
('spanish', 'SPA_ALMEJAS_MARINERA', 'ING_ONION'),

-- Vieiras a la Gallega
('spanish', 'SPA_VIEIRAS_GALLEGAS', 'ING_SCALLOP'),
('spanish', 'SPA_VIEIRAS_GALLEGAS', 'ING_ONION'),
('spanish', 'SPA_VIEIRAS_GALLEGAS', 'ING_SERRANO_HAM'),
('spanish', 'SPA_VIEIRAS_GALLEGAS', 'ING_BREADCRUMB'),

-- Txangurro
('spanish', 'SPA_TXANGURRO', 'ING_CRAB'),
('spanish', 'SPA_TXANGURRO', 'ING_ONION'),
('spanish', 'SPA_TXANGURRO', 'ING_TOMATO'),
('spanish', 'SPA_TXANGURRO', 'ING_BRANDY'),
('spanish', 'SPA_TXANGURRO', 'ING_BREADCRUMB'),

-- Pescado Frito
('spanish', 'SPA_PESCADO_FRITO', 'ING_WHITE_FISH'),
('spanish', 'SPA_PESCADO_FRITO', 'ING_FLOUR'),
('spanish', 'SPA_PESCADO_FRITO', 'ING_LEMON'),

-- Sardinas a la Brasa
('spanish', 'SPA_SARDINAS_BRASA', 'ING_SARDINES'),
('spanish', 'SPA_SARDINAS_BRASA', 'ING_OLIVE_OIL'),
('spanish', 'SPA_SARDINAS_BRASA', 'ING_SALT'),
('spanish', 'SPA_SARDINAS_BRASA', 'ING_LEMON'),

-- ============================================
-- MEAT DISHES
-- ============================================
-- Cochinillo Asado
('spanish', 'SPA_COCHINILLO', 'ING_PORK'),
('spanish', 'SPA_COCHINILLO', 'ING_GARLIC'),
('spanish', 'SPA_COCHINILLO', 'ING_BAY_LEAVES'),
('spanish', 'SPA_COCHINILLO', 'ING_WHITE_WINE'),

-- Chuletón
('spanish', 'SPA_CHULETON', 'ING_BEEF_RIBEYE'),
('spanish', 'SPA_CHULETON', 'ING_SALT'),
('spanish', 'SPA_CHULETON', 'ING_OLIVE_OIL'),

-- Rabo de Toro
('spanish', 'SPA_RABO_TORO', 'ING_OXTAIL'),
('spanish', 'SPA_RABO_TORO', 'ING_RED_WINE'),
('spanish', 'SPA_RABO_TORO', 'ING_ONION'),
('spanish', 'SPA_RABO_TORO', 'ING_CARROT'),
('spanish', 'SPA_RABO_TORO', 'ING_TOMATO'),

-- Cordero Asado
('spanish', 'SPA_CORDERO_ASADO', 'ING_LAMB'),
('spanish', 'SPA_CORDERO_ASADO', 'ING_GARLIC'),
('spanish', 'SPA_CORDERO_ASADO', 'ING_ROSEMARY'),
('spanish', 'SPA_CORDERO_ASADO', 'ING_WHITE_WINE'),

-- Secreto Ibérico
('spanish', 'SPA_SECRETO_IBERICO', 'ING_PORK'),
('spanish', 'SPA_SECRETO_IBERICO', 'ING_SALT'),
('spanish', 'SPA_SECRETO_IBERICO', 'ING_OLIVE_OIL'),

-- Carrillera de Cerdo
('spanish', 'SPA_CARRILLERA', 'ING_PORK'),
('spanish', 'SPA_CARRILLERA', 'ING_RED_WINE'),
('spanish', 'SPA_CARRILLERA', 'ING_ONION'),
('spanish', 'SPA_CARRILLERA', 'ING_CARROT'),

-- ============================================
-- SOUPS & STEWS
-- ============================================
-- Cocido Madrileño
('spanish', 'SPA_COCIDO_MADRILENO', 'ING_CHICKPEA'),
('spanish', 'SPA_COCIDO_MADRILENO', 'ING_BEEF'),
('spanish', 'SPA_COCIDO_MADRILENO', 'ING_CHICKEN'),
('spanish', 'SPA_COCIDO_MADRILENO', 'ING_CHORIZO'),
('spanish', 'SPA_COCIDO_MADRILENO', 'ING_MORCILLA'),
('spanish', 'SPA_COCIDO_MADRILENO', 'ING_CABBAGE'),
('spanish', 'SPA_COCIDO_MADRILENO', 'ING_POTATO'),

-- Fabada Asturiana
('spanish', 'SPA_FABADA', 'ING_FABES'),
('spanish', 'SPA_FABADA', 'ING_CHORIZO'),
('spanish', 'SPA_FABADA', 'ING_MORCILLA'),
('spanish', 'SPA_FABADA', 'ING_PORK_SHOULDER'),
('spanish', 'SPA_FABADA', 'ING_SAFFRON'),

-- Sopa de Ajo
('spanish', 'SPA_SOPA_CASTELLANA', 'ING_GARLIC'),
('spanish', 'SPA_SOPA_CASTELLANA', 'ING_BREAD'),
('spanish', 'SPA_SOPA_CASTELLANA', 'ING_SMOKED_PAPRIKA'),
('spanish', 'SPA_SOPA_CASTELLANA', 'ING_EGG'),
('spanish', 'SPA_SOPA_CASTELLANA', 'ING_CHICKEN_BROTH'),

-- Salmorejo
('spanish', 'SPA_SALMOREJO', 'ING_TOMATO'),
('spanish', 'SPA_SALMOREJO', 'ING_BREAD'),
('spanish', 'SPA_SALMOREJO', 'ING_GARLIC'),
('spanish', 'SPA_SALMOREJO', 'ING_OLIVE_OIL'),
('spanish', 'SPA_SALMOREJO', 'ING_SHERRY_VINEGAR'),
('spanish', 'SPA_SALMOREJO', 'ING_SERRANO_HAM'),
('spanish', 'SPA_SALMOREJO', 'ING_EGG'),

-- Porrusalda
('spanish', 'SPA_PORRUSALDA', 'ING_LEEK'),
('spanish', 'SPA_PORRUSALDA', 'ING_POTATO'),
('spanish', 'SPA_PORRUSALDA', 'ING_BACALAO'),
('spanish', 'SPA_PORRUSALDA', 'ING_CARROT'),

-- ============================================
-- EGG DISHES
-- ============================================
-- Tortilla Española
('spanish', 'SPA_TORTILLA_ESPANOLA', 'ING_EGG'),
('spanish', 'SPA_TORTILLA_ESPANOLA', 'ING_POTATO'),
('spanish', 'SPA_TORTILLA_ESPANOLA', 'ING_ONION'),
('spanish', 'SPA_TORTILLA_ESPANOLA', 'ING_OLIVE_OIL'),
('spanish', 'SPA_TORTILLA_ESPANOLA', 'ING_SALT'),

-- Huevos Rotos
('spanish', 'SPA_HUEVOS_ROTOS', 'ING_EGG'),
('spanish', 'SPA_HUEVOS_ROTOS', 'ING_POTATO'),
('spanish', 'SPA_HUEVOS_ROTOS', 'ING_IBERICO_HAM'),
('spanish', 'SPA_HUEVOS_ROTOS', 'ING_OLIVE_OIL'),

-- Revuelto de Gambas
('spanish', 'SPA_REVUELTO_GAMBAS', 'ING_EGG'),
('spanish', 'SPA_REVUELTO_GAMBAS', 'ING_GAMBAS'),
('spanish', 'SPA_REVUELTO_GAMBAS', 'ING_GARLIC'),
('spanish', 'SPA_REVUELTO_GAMBAS', 'ING_OLIVE_OIL'),

-- Pisto Manchego
('spanish', 'SPA_PISTO_MANCHEGO', 'ING_TOMATO'),
('spanish', 'SPA_PISTO_MANCHEGO', 'ING_BELL_PEPPER'),
('spanish', 'SPA_PISTO_MANCHEGO', 'ING_ZUCCHINI'),
('spanish', 'SPA_PISTO_MANCHEGO', 'ING_ONION'),
('spanish', 'SPA_PISTO_MANCHEGO', 'ING_EGG'),

-- ============================================
-- CURED MEATS
-- ============================================
-- Jamón Ibérico
('spanish', 'SPA_JAMON_IBERICO', 'ING_IBERICO_HAM'),

-- Tabla de Ibéricos
('spanish', 'SPA_TABLA_IBERICA', 'ING_IBERICO_HAM'),
('spanish', 'SPA_TABLA_IBERICA', 'ING_LOMO'),
('spanish', 'SPA_TABLA_IBERICA', 'ING_CHORIZO'),

-- Tabla de Quesos
('spanish', 'SPA_TABLA_QUESOS', 'ING_MANCHEGO'),
('spanish', 'SPA_TABLA_QUESOS', 'ING_IDIAZABAL'),
('spanish', 'SPA_TABLA_QUESOS', 'ING_TETILLA'),

-- ============================================
-- DESSERTS
-- ============================================
-- Crema Catalana
('spanish', 'SPA_CREMA_CATALANA', 'ING_EGG_YOLK'),
('spanish', 'SPA_CREMA_CATALANA', 'ING_MILK'),
('spanish', 'SPA_CREMA_CATALANA', 'ING_SUGAR'),
('spanish', 'SPA_CREMA_CATALANA', 'ING_CINNAMON'),
('spanish', 'SPA_CREMA_CATALANA', 'ING_LEMON'),

-- Churros con Chocolate
('spanish', 'SPA_CHURROS_CHOCOLATE', 'ING_FLOUR'),
('spanish', 'SPA_CHURROS_CHOCOLATE', 'ING_WATER'),
('spanish', 'SPA_CHURROS_CHOCOLATE', 'ING_SALT'),
('spanish', 'SPA_CHURROS_CHOCOLATE', 'ING_CHOCOLATE'),
('spanish', 'SPA_CHURROS_CHOCOLATE', 'ING_MILK'),

-- Flan de Huevo
('spanish', 'SPA_FLAN', 'ING_EGG'),
('spanish', 'SPA_FLAN', 'ING_MILK'),
('spanish', 'SPA_FLAN', 'ING_SUGAR'),
('spanish', 'SPA_FLAN', 'ING_VANILLA'),

-- Tarta de Santiago
('spanish', 'SPA_TARTA_SANTIAGO', 'ING_ALMOND'),
('spanish', 'SPA_TARTA_SANTIAGO', 'ING_EGG'),
('spanish', 'SPA_TARTA_SANTIAGO', 'ING_SUGAR'),
('spanish', 'SPA_TARTA_SANTIAGO', 'ING_LEMON'),
('spanish', 'SPA_TARTA_SANTIAGO', 'ING_CINNAMON'),

-- Leche Frita
('spanish', 'SPA_LECHE_FRITA', 'ING_MILK'),
('spanish', 'SPA_LECHE_FRITA', 'ING_FLOUR'),
('spanish', 'SPA_LECHE_FRITA', 'ING_SUGAR'),
('spanish', 'SPA_LECHE_FRITA', 'ING_CINNAMON'),
('spanish', 'SPA_LECHE_FRITA', 'ING_EGG')

ON CONFLICT DO NOTHING;
