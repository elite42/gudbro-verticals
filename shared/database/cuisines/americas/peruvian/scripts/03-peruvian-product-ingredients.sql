-- ============================================
-- Peruvian Product Ingredients Links
-- GUDBRO Database Standards v1.2
-- Links peruvian dishes to master ingredients
-- ============================================

-- Delete existing links for peruvian products
DELETE FROM product_ingredients WHERE product_type = 'peruvian';

-- === CEVICHES ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Ceviche Clásico
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_CORVINA', 'main', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_AJI_LIMO', 'main', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_RED_ONION', 'main', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_CAMOTE', 'secondary', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_CANCHA', 'secondary', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_CHOCLO', 'secondary', true),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_SALT', 'secondary', false),
('peruvian', 'PER_CEVICHE_CLASICO', 'ING_GARLIC', 'secondary', false),

-- Ceviche Mixto
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_CORVINA', 'main', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_SHRIMP', 'main', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_OCTOPUS', 'main', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_SQUID', 'main', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_AJI_LIMO', 'main', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_RED_ONION', 'secondary', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_CAMOTE', 'secondary', false),
('peruvian', 'PER_CEVICHE_MIXTO', 'ING_CANCHA', 'secondary', false),

-- Ceviche de Camarones
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_SHRIMP', 'main', false),
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_AJI_ROCOTO', 'main', false),
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_HUACATAY', 'main', false),
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_RED_ONION', 'secondary', false),
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_CAMOTE', 'secondary', false),
('peruvian', 'PER_CEVICHE_CAMARONES', 'ING_CHOCLO', 'secondary', false),

-- Ceviche Conchas Negras
('peruvian', 'PER_CEVICHE_CONCHAS_NEGRAS', 'ING_CONCHAS_NEGRAS', 'main', false),
('peruvian', 'PER_CEVICHE_CONCHAS_NEGRAS', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_CEVICHE_CONCHAS_NEGRAS', 'ING_AJI_LIMO', 'main', false),
('peruvian', 'PER_CEVICHE_CONCHAS_NEGRAS', 'ING_RED_ONION', 'secondary', false),
('peruvian', 'PER_CEVICHE_CONCHAS_NEGRAS', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_CEVICHE_CONCHAS_NEGRAS', 'ING_GARLIC', 'secondary', false),

-- Ceviche de Pulpo
('peruvian', 'PER_CEVICHE_PULPO', 'ING_OCTOPUS', 'main', false),
('peruvian', 'PER_CEVICHE_PULPO', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_CEVICHE_PULPO', 'ING_OLIVE_OIL', 'main', false),
('peruvian', 'PER_CEVICHE_PULPO', 'ING_BLACK_OLIVES', 'secondary', false),
('peruvian', 'PER_CEVICHE_PULPO', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CEVICHE_PULPO', 'ING_RED_ONION', 'secondary', false),
('peruvian', 'PER_CEVICHE_PULPO', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_CEVICHE_PULPO', 'ING_GARLIC', 'secondary', false),

-- Leche de Tigre
('peruvian', 'PER_LECHE_TIGRE', 'ING_CORVINA', 'main', false),
('peruvian', 'PER_LECHE_TIGRE', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_LECHE_TIGRE', 'ING_AJI_LIMO', 'main', false),
('peruvian', 'PER_LECHE_TIGRE', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_LECHE_TIGRE', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_LECHE_TIGRE', 'ING_CELERY', 'secondary', false),
('peruvian', 'PER_LECHE_TIGRE', 'ING_SALT', 'secondary', false);

-- === TIRADITOS ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Tiradito Clásico
('peruvian', 'PER_TIRADITO_CLASICO', 'ING_LENGUADO', 'main', false),
('peruvian', 'PER_TIRADITO_CLASICO', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_TIRADITO_CLASICO', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_TIRADITO_CLASICO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_TIRADITO_CLASICO', 'ING_OLIVE_OIL', 'secondary', false),
('peruvian', 'PER_TIRADITO_CLASICO', 'ING_SALT', 'secondary', false),

-- Tiradito al Rocoto
('peruvian', 'PER_TIRADITO_ROCOTO', 'ING_LENGUADO', 'main', false),
('peruvian', 'PER_TIRADITO_ROCOTO', 'ING_AJI_ROCOTO', 'main', false),
('peruvian', 'PER_TIRADITO_ROCOTO', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_TIRADITO_ROCOTO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_TIRADITO_ROCOTO', 'ING_OLIVE_OIL', 'secondary', false),
('peruvian', 'PER_TIRADITO_ROCOTO', 'ING_CILANTRO', 'secondary', false),

-- Tiradito Nikkei
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_SALMON', 'main', false),
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_SOY_SAUCE', 'main', false),
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_SESAME_OIL', 'main', false),
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_MISO', 'main', false),
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_GINGER', 'secondary', false),
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_SESAME_SEEDS', 'secondary', false),
('peruvian', 'PER_TIRADITO_NIKKEI', 'ING_GREEN_ONION', 'secondary', false),

-- Tiradito al Maracuyá
('peruvian', 'PER_TIRADITO_MARACUYA', 'ING_LENGUADO', 'main', false),
('peruvian', 'PER_TIRADITO_MARACUYA', 'ING_MARACUYA', 'main', false),
('peruvian', 'PER_TIRADITO_MARACUYA', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_TIRADITO_MARACUYA', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_TIRADITO_MARACUYA', 'ING_OLIVE_OIL', 'secondary', false),
('peruvian', 'PER_TIRADITO_MARACUYA', 'ING_SALT', 'secondary', false),

-- Tiradito al Olivo
('peruvian', 'PER_TIRADITO_OLIVO', 'ING_LENGUADO', 'main', false),
('peruvian', 'PER_TIRADITO_OLIVO', 'ING_BLACK_OLIVES', 'main', false),
('peruvian', 'PER_TIRADITO_OLIVO', 'ING_MAYONNAISE', 'main', false),
('peruvian', 'PER_TIRADITO_OLIVO', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_TIRADITO_OLIVO', 'ING_OLIVE_OIL', 'secondary', false),
('peruvian', 'PER_TIRADITO_OLIVO', 'ING_GARLIC', 'secondary', false),

-- Tiradito Acevichado
('peruvian', 'PER_TIRADITO_ACEVICHADO', 'ING_CORVINA', 'main', false),
('peruvian', 'PER_TIRADITO_ACEVICHADO', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_TIRADITO_ACEVICHADO', 'ING_AJI_LIMO', 'main', false),
('peruvian', 'PER_TIRADITO_ACEVICHADO', 'ING_RED_ONION', 'secondary', false),
('peruvian', 'PER_TIRADITO_ACEVICHADO', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_TIRADITO_ACEVICHADO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_TIRADITO_ACEVICHADO', 'ING_SALT', 'secondary', false);

-- === CAUSAS ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Causa Limeña
('peruvian', 'PER_CAUSA_LIMENA', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_CHICKEN_BREAST', 'main', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_MAYONNAISE', 'main', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_AVOCADO', 'secondary', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_RED_ONION', 'secondary', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_OLIVE_OIL', 'secondary', false),
('peruvian', 'PER_CAUSA_LIMENA', 'ING_SALT', 'secondary', false),

-- Causa de Atún
('peruvian', 'PER_CAUSA_ATUN', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_ATUN', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_ATUN', 'ING_TUNA', 'main', false),
('peruvian', 'PER_CAUSA_ATUN', 'ING_MAYONNAISE', 'main', false),
('peruvian', 'PER_CAUSA_ATUN', 'ING_AVOCADO', 'secondary', false),
('peruvian', 'PER_CAUSA_ATUN', 'ING_BLACK_OLIVES', 'secondary', false),
('peruvian', 'PER_CAUSA_ATUN', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_CAUSA_ATUN', 'ING_RED_ONION', 'secondary', false),

-- Causa de Camarones
('peruvian', 'PER_CAUSA_CAMARONES', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_CAMARONES', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_CAMARONES', 'ING_SHRIMP', 'main', false),
('peruvian', 'PER_CAUSA_CAMARONES', 'ING_MAYONNAISE', 'main', false),
('peruvian', 'PER_CAUSA_CAMARONES', 'ING_AJI_ROCOTO', 'secondary', false),
('peruvian', 'PER_CAUSA_CAMARONES', 'ING_AVOCADO', 'secondary', false),
('peruvian', 'PER_CAUSA_CAMARONES', 'ING_LIME_JUICE', 'secondary', false),

-- Causa de Pulpo
('peruvian', 'PER_CAUSA_PULPO', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_PULPO', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_PULPO', 'ING_OCTOPUS', 'main', false),
('peruvian', 'PER_CAUSA_PULPO', 'ING_BLACK_OLIVES', 'main', false),
('peruvian', 'PER_CAUSA_PULPO', 'ING_MAYONNAISE', 'secondary', false),
('peruvian', 'PER_CAUSA_PULPO', 'ING_OLIVE_OIL', 'secondary', false),
('peruvian', 'PER_CAUSA_PULPO', 'ING_LIME_JUICE', 'secondary', false),

-- Causa de Cangrejo
('peruvian', 'PER_CAUSA_CANGREJO', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_CANGREJO', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_CANGREJO', 'ING_CRAB_MEAT', 'main', false),
('peruvian', 'PER_CAUSA_CANGREJO', 'ING_MAYONNAISE', 'main', false),
('peruvian', 'PER_CAUSA_CANGREJO', 'ING_AVOCADO', 'secondary', false),
('peruvian', 'PER_CAUSA_CANGREJO', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_CAUSA_CANGREJO', 'ING_CILANTRO', 'secondary', false),

-- Causa de Lomo Saltado
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_BEEF_SIRLOIN', 'main', false),
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_RED_ONION', 'main', false),
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_TOMATO', 'secondary', false),
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_SOY_SAUCE', 'secondary', false),
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_VINEGAR', 'secondary', false),
('peruvian', 'PER_CAUSA_LOMO_SALTADO', 'ING_CILANTRO', 'secondary', false),

-- Causa Nikkei
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_SALMON', 'main', false),
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_NORI', 'main', false),
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_WASABI', 'secondary', false),
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_MAYONNAISE', 'secondary', false),
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_SOY_SAUCE', 'secondary', false),
('peruvian', 'PER_CAUSA_NIKKEI', 'ING_SESAME_SEEDS', 'secondary', false),

-- Causa Vegetariana
('peruvian', 'PER_CAUSA_VEGETARIANA', 'ING_PAPA_AMARILLA', 'main', false),
('peruvian', 'PER_CAUSA_VEGETARIANA', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_CAUSA_VEGETARIANA', 'ING_AVOCADO', 'main', false),
('peruvian', 'PER_CAUSA_VEGETARIANA', 'ING_TOMATO', 'secondary', false),
('peruvian', 'PER_CAUSA_VEGETARIANA', 'ING_BLACK_OLIVES', 'secondary', false),
('peruvian', 'PER_CAUSA_VEGETARIANA', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_CAUSA_VEGETARIANA', 'ING_OLIVE_OIL', 'secondary', false);

-- === ANTICUCHOS ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Anticucho de Corazón
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_BEEF_HEART', 'main', false),
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_CUMIN', 'main', false),
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_VINEGAR', 'main', false),
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_OREGANO', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_SALT', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_CORAZON', 'ING_VEGETABLE_OIL', 'secondary', false),

-- Anticucho de Res
('peruvian', 'PER_ANTICUCHO_RES', 'ING_BEEF_SIRLOIN', 'main', false),
('peruvian', 'PER_ANTICUCHO_RES', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_ANTICUCHO_RES', 'ING_CUMIN', 'main', false),
('peruvian', 'PER_ANTICUCHO_RES', 'ING_VINEGAR', 'main', false),
('peruvian', 'PER_ANTICUCHO_RES', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_RES', 'ING_OREGANO', 'secondary', false),

-- Anticucho de Pollo
('peruvian', 'PER_ANTICUCHO_POLLO', 'ING_CHICKEN_THIGH', 'main', false),
('peruvian', 'PER_ANTICUCHO_POLLO', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_ANTICUCHO_POLLO', 'ING_CUMIN', 'main', false),
('peruvian', 'PER_ANTICUCHO_POLLO', 'ING_VINEGAR', 'main', false),
('peruvian', 'PER_ANTICUCHO_POLLO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_POLLO', 'ING_OREGANO', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_POLLO', 'ING_LIME_JUICE', 'secondary', false),

-- Rachi
('peruvian', 'PER_ANTICUCHO_RACHI', 'ING_BEEF_TRIPE', 'main', false),
('peruvian', 'PER_ANTICUCHO_RACHI', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_ANTICUCHO_RACHI', 'ING_CUMIN', 'main', false),
('peruvian', 'PER_ANTICUCHO_RACHI', 'ING_VINEGAR', 'main', false),
('peruvian', 'PER_ANTICUCHO_RACHI', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_RACHI', 'ING_SALT', 'secondary', false),

-- Choncholínes
('peruvian', 'PER_ANTICUCHO_CHONCHOLINES', 'ING_BEEF_INTESTINE', 'main', false),
('peruvian', 'PER_ANTICUCHO_CHONCHOLINES', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_ANTICUCHO_CHONCHOLINES', 'ING_CUMIN', 'main', false),
('peruvian', 'PER_ANTICUCHO_CHONCHOLINES', 'ING_VINEGAR', 'main', false),
('peruvian', 'PER_ANTICUCHO_CHONCHOLINES', 'ING_GARLIC', 'secondary', false),

-- Anticucho de Mariscos
('peruvian', 'PER_ANTICUCHO_MARISCOS', 'ING_SHRIMP', 'main', false),
('peruvian', 'PER_ANTICUCHO_MARISCOS', 'ING_SQUID', 'main', false),
('peruvian', 'PER_ANTICUCHO_MARISCOS', 'ING_OCTOPUS', 'main', false),
('peruvian', 'PER_ANTICUCHO_MARISCOS', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_ANTICUCHO_MARISCOS', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_MARISCOS', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_MARISCOS', 'ING_OLIVE_OIL', 'secondary', false),

-- Anticucho de Pulpo
('peruvian', 'PER_ANTICUCHO_PULPO', 'ING_OCTOPUS', 'main', false),
('peruvian', 'PER_ANTICUCHO_PULPO', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_ANTICUCHO_PULPO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_PULPO', 'ING_OLIVE_OIL', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_PULPO', 'ING_LIME_JUICE', 'secondary', false),
('peruvian', 'PER_ANTICUCHO_PULPO', 'ING_OREGANO', 'secondary', false);

-- === LOMO SALTADO & MAIN DISHES ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Lomo Saltado
('peruvian', 'PER_LOMO_SALTADO', 'ING_BEEF_TENDERLOIN', 'main', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_RED_ONION', 'main', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_TOMATO', 'main', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_SOY_SAUCE', 'main', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_VINEGAR', 'main', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_AJI_AMARILLO', 'secondary', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_CILANTRO', 'secondary', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_RICE', 'secondary', false),
('peruvian', 'PER_LOMO_SALTADO', 'ING_POTATO', 'secondary', false),

-- Tallarín Saltado
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_SPAGHETTI', 'main', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_BEEF_SIRLOIN', 'main', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_RED_ONION', 'main', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_TOMATO', 'main', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_SOY_SAUCE', 'main', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_GREEN_ONION', 'secondary', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_GINGER', 'secondary', false),
('peruvian', 'PER_TALLARIN_SALTADO', 'ING_AJI_AMARILLO', 'secondary', false),

-- Pollo Saltado
('peruvian', 'PER_POLLO_SALTADO', 'ING_CHICKEN_BREAST', 'main', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_RED_ONION', 'main', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_TOMATO', 'main', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_SOY_SAUCE', 'main', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_VINEGAR', 'main', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_AJI_AMARILLO', 'secondary', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_RICE', 'secondary', false),
('peruvian', 'PER_POLLO_SALTADO', 'ING_POTATO', 'secondary', false),

-- Saltado de Mariscos
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_SHRIMP', 'main', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_SQUID', 'main', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_OCTOPUS', 'main', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_RED_ONION', 'main', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_TOMATO', 'main', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_SOY_SAUCE', 'main', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_OYSTER_SAUCE', 'secondary', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_AJI_AMARILLO', 'secondary', false),
('peruvian', 'PER_SALTADO_MARISCOS', 'ING_RICE', 'secondary', false),

-- Ají de Gallina
('peruvian', 'PER_AJI_GALLINA', 'ING_CHICKEN_BREAST', 'main', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_WALNUTS', 'main', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_BREAD', 'main', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_EVAPORATED_MILK', 'main', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_PARMESAN', 'secondary', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_RICE', 'secondary', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_POTATO', 'secondary', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_BLACK_OLIVES', 'secondary', false),
('peruvian', 'PER_AJI_GALLINA', 'ING_BOILED_EGG', 'secondary', false);

-- === CRIOLLO DISHES ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Seco de Cordero
('peruvian', 'PER_SECO_CORDERO', 'ING_LAMB_SHOULDER', 'main', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_CILANTRO', 'main', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_CHICHA_JORA', 'main', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_CUMIN', 'secondary', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_CANARIO_BEANS', 'secondary', false),
('peruvian', 'PER_SECO_CORDERO', 'ING_RICE', 'secondary', false),

-- Seco de Res
('peruvian', 'PER_SECO_RES', 'ING_BEEF_CHUCK', 'main', false),
('peruvian', 'PER_SECO_RES', 'ING_CILANTRO', 'main', false),
('peruvian', 'PER_SECO_RES', 'ING_CHICHA_JORA', 'main', false),
('peruvian', 'PER_SECO_RES', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_SECO_RES', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_SECO_RES', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_SECO_RES', 'ING_CANARIO_BEANS', 'secondary', false),
('peruvian', 'PER_SECO_RES', 'ING_RICE', 'secondary', false),

-- Carapulcra
('peruvian', 'PER_CARAPULCRA', 'ING_PAPA_SECA', 'main', false),
('peruvian', 'PER_CARAPULCRA', 'ING_PORK_SHOULDER', 'main', false),
('peruvian', 'PER_CARAPULCRA', 'ING_PEANUTS', 'main', false),
('peruvian', 'PER_CARAPULCRA', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_CARAPULCRA', 'ING_AJI_MIRASOL', 'main', false),
('peruvian', 'PER_CARAPULCRA', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_CARAPULCRA', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_CARAPULCRA', 'ING_CUMIN', 'secondary', false),
('peruvian', 'PER_CARAPULCRA', 'ING_CLOVES', 'secondary', false),

-- Tacu Tacu
('peruvian', 'PER_TACU_TACU', 'ING_RICE', 'main', false),
('peruvian', 'PER_TACU_TACU', 'ING_CANARIO_BEANS', 'main', false),
('peruvian', 'PER_TACU_TACU', 'ING_ONION', 'main', false),
('peruvian', 'PER_TACU_TACU', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_TACU_TACU', 'ING_AJI_AMARILLO', 'secondary', false),
('peruvian', 'PER_TACU_TACU', 'ING_VEGETABLE_OIL', 'secondary', false),
('peruvian', 'PER_TACU_TACU', 'ING_EGG', 'secondary', true),

-- Rocoto Relleno
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_AJI_ROCOTO', 'main', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_GROUND_BEEF', 'main', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_ONION', 'main', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_PEANUTS', 'secondary', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_RAISINS', 'secondary', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_BLACK_OLIVES', 'secondary', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_QUESO_FRESCO', 'secondary', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_EVAPORATED_MILK', 'secondary', false),
('peruvian', 'PER_ROCOTO_RELLENO', 'ING_EGGS', 'secondary', false);

-- === CHIFA (Chinese-Peruvian) ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Arroz Chaufa
('peruvian', 'PER_CHAUFA', 'ING_RICE', 'main', false),
('peruvian', 'PER_CHAUFA', 'ING_CHICKEN_BREAST', 'main', false),
('peruvian', 'PER_CHAUFA', 'ING_CHAR_SIU', 'main', false),
('peruvian', 'PER_CHAUFA', 'ING_EGG', 'main', false),
('peruvian', 'PER_CHAUFA', 'ING_GREEN_ONION', 'secondary', false),
('peruvian', 'PER_CHAUFA', 'ING_SOY_SAUCE', 'secondary', false),
('peruvian', 'PER_CHAUFA', 'ING_SESAME_OIL', 'secondary', false),
('peruvian', 'PER_CHAUFA', 'ING_GINGER', 'secondary', false),
('peruvian', 'PER_CHAUFA', 'ING_GARLIC', 'secondary', false),

-- Aeropuerto
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_RICE', 'main', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_CHOW_MEIN_NOODLES', 'main', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_CHICKEN_BREAST', 'main', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_CHAR_SIU', 'main', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_EGG', 'main', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_GREEN_ONION', 'secondary', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_SOY_SAUCE', 'secondary', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_OYSTER_SAUCE', 'secondary', false),
('peruvian', 'PER_CHAUFA_AEROPUERTO', 'ING_BEAN_SPROUTS', 'secondary', false),

-- Kam Lu Wantán
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_WONTON_WRAPPERS', 'main', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_GROUND_PORK', 'main', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_PINEAPPLE', 'main', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_BELL_PEPPER', 'secondary', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_VINEGAR', 'secondary', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_SUGAR', 'secondary', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_KETCHUP', 'secondary', false),
('peruvian', 'PER_KAM_LU_WANTAN', 'ING_SOY_SAUCE', 'secondary', false),

-- Sopa Wantán
('peruvian', 'PER_SOPA_WANTAN', 'ING_WONTON_WRAPPERS', 'main', false),
('peruvian', 'PER_SOPA_WANTAN', 'ING_GROUND_PORK', 'main', false),
('peruvian', 'PER_SOPA_WANTAN', 'ING_CHAR_SIU', 'main', false),
('peruvian', 'PER_SOPA_WANTAN', 'ING_BOK_CHOY', 'secondary', false),
('peruvian', 'PER_SOPA_WANTAN', 'ING_CHICKEN_STOCK', 'secondary', false),
('peruvian', 'PER_SOPA_WANTAN', 'ING_GREEN_ONION', 'secondary', false),
('peruvian', 'PER_SOPA_WANTAN', 'ING_GINGER', 'secondary', false),
('peruvian', 'PER_SOPA_WANTAN', 'ING_SOY_SAUCE', 'secondary', false);

-- === ANDEAN DISHES ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Cuy Chactado
('peruvian', 'PER_CUY_CHACTADO', 'ING_CUY', 'main', false),
('peruvian', 'PER_CUY_CHACTADO', 'ING_GARLIC', 'main', false),
('peruvian', 'PER_CUY_CHACTADO', 'ING_CUMIN', 'main', false),
('peruvian', 'PER_CUY_CHACTADO', 'ING_HUACATAY', 'main', false),
('peruvian', 'PER_CUY_CHACTADO', 'ING_SALT', 'secondary', false),
('peruvian', 'PER_CUY_CHACTADO', 'ING_VEGETABLE_OIL', 'secondary', false),
('peruvian', 'PER_CUY_CHACTADO', 'ING_POTATO', 'secondary', false),
('peruvian', 'PER_CUY_CHACTADO', 'ING_CORN', 'secondary', false),

-- Pachamanca
('peruvian', 'PER_PACHAMANCA', 'ING_PORK_SHOULDER', 'main', false),
('peruvian', 'PER_PACHAMANCA', 'ING_CHICKEN_THIGH', 'main', false),
('peruvian', 'PER_PACHAMANCA', 'ING_LAMB_SHOULDER', 'main', false),
('peruvian', 'PER_PACHAMANCA', 'ING_POTATO', 'main', false),
('peruvian', 'PER_PACHAMANCA', 'ING_CAMOTE', 'main', false),
('peruvian', 'PER_PACHAMANCA', 'ING_CHOCLO', 'main', false),
('peruvian', 'PER_PACHAMANCA', 'ING_FAVA_BEANS', 'secondary', false),
('peruvian', 'PER_PACHAMANCA', 'ING_HUACATAY', 'secondary', false),
('peruvian', 'PER_PACHAMANCA', 'ING_CHINCHO', 'secondary', false),
('peruvian', 'PER_PACHAMANCA', 'ING_AJI_PANCA', 'secondary', false),

-- Alpaca Steak
('peruvian', 'PER_ALPACA_STEAK', 'ING_ALPACA', 'main', false),
('peruvian', 'PER_ALPACA_STEAK', 'ING_GARLIC', 'main', false),
('peruvian', 'PER_ALPACA_STEAK', 'ING_OLIVE_OIL', 'main', false),
('peruvian', 'PER_ALPACA_STEAK', 'ING_ROSEMARY', 'secondary', false),
('peruvian', 'PER_ALPACA_STEAK', 'ING_CHIMICHURRI', 'secondary', false),
('peruvian', 'PER_ALPACA_STEAK', 'ING_SALT', 'secondary', false),
('peruvian', 'PER_ALPACA_STEAK', 'ING_POTATO', 'secondary', false),
('peruvian', 'PER_ALPACA_STEAK', 'ING_QUINOA', 'secondary', false);

-- === AMAZONIAN DISHES ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Juane
('peruvian', 'PER_JUANE', 'ING_RICE', 'main', false),
('peruvian', 'PER_JUANE', 'ING_CHICKEN_THIGH', 'main', false),
('peruvian', 'PER_JUANE', 'ING_EGGS', 'main', false),
('peruvian', 'PER_JUANE', 'ING_TURMERIC', 'main', false),
('peruvian', 'PER_JUANE', 'ING_BIJAO_LEAVES', 'main', false),
('peruvian', 'PER_JUANE', 'ING_OLIVES', 'secondary', false),
('peruvian', 'PER_JUANE', 'ING_SACHA_CULANTRO', 'secondary', false),
('peruvian', 'PER_JUANE', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_JUANE', 'ING_CUMIN', 'secondary', false),

-- Tacacho con Cecina
('peruvian', 'PER_TACACHO_CECINA', 'ING_PLANTAIN', 'main', false),
('peruvian', 'PER_TACACHO_CECINA', 'ING_PORK_LARD', 'main', false),
('peruvian', 'PER_TACACHO_CECINA', 'ING_CECINA', 'main', false),
('peruvian', 'PER_TACACHO_CECINA', 'ING_CHORIZO_AMAZONICO', 'secondary', false),
('peruvian', 'PER_TACACHO_CECINA', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_TACACHO_CECINA', 'ING_SALT', 'secondary', false),

-- Patarashca
('peruvian', 'PER_PATARASHCA', 'ING_DONCELLA', 'main', false),
('peruvian', 'PER_PATARASHCA', 'ING_BIJAO_LEAVES', 'main', false),
('peruvian', 'PER_PATARASHCA', 'ING_SACHA_CULANTRO', 'main', false),
('peruvian', 'PER_PATARASHCA', 'ING_AJI_CHARAPITA', 'main', false),
('peruvian', 'PER_PATARASHCA', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_PATARASHCA', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_PATARASHCA', 'ING_TOMATO', 'secondary', false),
('peruvian', 'PER_PATARASHCA', 'ING_COCONA', 'secondary', false),

-- Inchicapi
('peruvian', 'PER_INCHICAPI', 'ING_CHICKEN_THIGH', 'main', false),
('peruvian', 'PER_INCHICAPI', 'ING_PEANUTS', 'main', false),
('peruvian', 'PER_INCHICAPI', 'ING_SACHA_CULANTRO', 'main', false),
('peruvian', 'PER_INCHICAPI', 'ING_YUCA', 'secondary', false),
('peruvian', 'PER_INCHICAPI', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_INCHICAPI', 'ING_CUMIN', 'secondary', false),
('peruvian', 'PER_INCHICAPI', 'ING_SALT', 'secondary', false);

-- === SOUPS ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Caldo de Gallina
('peruvian', 'PER_CALDO_GALLINA', 'ING_HEN', 'main', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_POTATO', 'main', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_NOODLES', 'main', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_BOILED_EGG', 'main', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_CELERY', 'secondary', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_OREGANO', 'secondary', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_CUMIN', 'secondary', false),
('peruvian', 'PER_CALDO_GALLINA', 'ING_GREEN_ONION', 'secondary', false),

-- Parihuela
('peruvian', 'PER_PARIHUELA', 'ING_CORVINA', 'main', false),
('peruvian', 'PER_PARIHUELA', 'ING_SHRIMP', 'main', false),
('peruvian', 'PER_PARIHUELA', 'ING_CRAB', 'main', false),
('peruvian', 'PER_PARIHUELA', 'ING_MUSSELS', 'main', false),
('peruvian', 'PER_PARIHUELA', 'ING_SQUID', 'main', false),
('peruvian', 'PER_PARIHUELA', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_PARIHUELA', 'ING_AJI_AMARILLO', 'main', false),
('peruvian', 'PER_PARIHUELA', 'ING_CHICHA_JORA', 'secondary', false),
('peruvian', 'PER_PARIHUELA', 'ING_ONION', 'secondary', false),
('peruvian', 'PER_PARIHUELA', 'ING_GARLIC', 'secondary', false),
('peruvian', 'PER_PARIHUELA', 'ING_CILANTRO', 'secondary', false),

-- Chupe de Camarones
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_SHRIMP', 'main', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_EVAPORATED_MILK', 'main', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_QUESO_FRESCO', 'main', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_AJI_PANCA', 'main', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_HUACATAY', 'main', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_POTATO', 'secondary', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_RICE', 'secondary', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_EGGS', 'secondary', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_OREGANO', 'secondary', false),
('peruvian', 'PER_CHUPE_CAMARONES', 'ING_FAVA_BEANS', 'secondary', false);

-- === DESSERTS ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Suspiro a la Limeña
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_DULCE_DE_LECHE', 'main', false),
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_EVAPORATED_MILK', 'main', false),
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_CONDENSED_MILK', 'main', false),
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_EGG_YOLKS', 'main', false),
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_EGG_WHITE', 'main', false),
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_PORT_WINE', 'main', false),
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_SUGAR', 'secondary', false),
('peruvian', 'PER_SUSPIRO_LIMENA', 'ING_CINNAMON', 'secondary', false),

-- Mazamorra Morada
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_MAIZ_MORADO', 'main', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_PINEAPPLE', 'main', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_QUINCE', 'secondary', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_DRIED_PEACH', 'secondary', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_DRIED_APRICOT', 'secondary', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_CINNAMON', 'secondary', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_CLOVES', 'secondary', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_SUGAR', 'secondary', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_CORNSTARCH', 'secondary', false),
('peruvian', 'PER_MAZAMORRA_MORADA', 'ING_LIME_JUICE', 'secondary', false),

-- Lucuma Ice Cream
('peruvian', 'PER_LUCUMA_HELADO', 'ING_LUCUMA', 'main', false),
('peruvian', 'PER_LUCUMA_HELADO', 'ING_CREAM', 'main', false),
('peruvian', 'PER_LUCUMA_HELADO', 'ING_CONDENSED_MILK', 'main', false),
('peruvian', 'PER_LUCUMA_HELADO', 'ING_SUGAR', 'secondary', false),
('peruvian', 'PER_LUCUMA_HELADO', 'ING_VANILLA', 'secondary', false);

-- === DRINKS ===
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES
-- Pisco Sour
('peruvian', 'PER_PISCO_SOUR', 'ING_PISCO', 'main', false),
('peruvian', 'PER_PISCO_SOUR', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_PISCO_SOUR', 'ING_SIMPLE_SYRUP', 'main', false),
('peruvian', 'PER_PISCO_SOUR', 'ING_EGG_WHITE', 'main', false),
('peruvian', 'PER_PISCO_SOUR', 'ING_ANGOSTURA_BITTERS', 'secondary', false),

-- Chilcano de Pisco
('peruvian', 'PER_CHILCANO_PISCO', 'ING_PISCO', 'main', false),
('peruvian', 'PER_CHILCANO_PISCO', 'ING_GINGER_ALE', 'main', false),
('peruvian', 'PER_CHILCANO_PISCO', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_CHILCANO_PISCO', 'ING_ANGOSTURA_BITTERS', 'secondary', false),
('peruvian', 'PER_CHILCANO_PISCO', 'ING_LIME', 'secondary', false),

-- Chicha Morada
('peruvian', 'PER_CHICHA_MORADA_DRINK', 'ING_MAIZ_MORADO', 'main', false),
('peruvian', 'PER_CHICHA_MORADA_DRINK', 'ING_PINEAPPLE', 'main', false),
('peruvian', 'PER_CHICHA_MORADA_DRINK', 'ING_QUINCE', 'secondary', false),
('peruvian', 'PER_CHICHA_MORADA_DRINK', 'ING_CINNAMON', 'secondary', false),
('peruvian', 'PER_CHICHA_MORADA_DRINK', 'ING_CLOVES', 'secondary', false),
('peruvian', 'PER_CHICHA_MORADA_DRINK', 'ING_SUGAR', 'secondary', false),
('peruvian', 'PER_CHICHA_MORADA_DRINK', 'ING_LIME_JUICE', 'secondary', false),

-- Maracuyá Sour
('peruvian', 'PER_MARACUYA_SOUR', 'ING_PISCO', 'main', false),
('peruvian', 'PER_MARACUYA_SOUR', 'ING_MARACUYA', 'main', false),
('peruvian', 'PER_MARACUYA_SOUR', 'ING_LIME_JUICE', 'main', false),
('peruvian', 'PER_MARACUYA_SOUR', 'ING_SIMPLE_SYRUP', 'main', false),
('peruvian', 'PER_MARACUYA_SOUR', 'ING_EGG_WHITE', 'main', false),

-- Algarrobina
('peruvian', 'PER_ALGARROBINA', 'ING_PISCO', 'main', false),
('peruvian', 'PER_ALGARROBINA', 'ING_ALGARROBINA', 'main', false),
('peruvian', 'PER_ALGARROBINA', 'ING_EVAPORATED_MILK', 'main', false),
('peruvian', 'PER_ALGARROBINA', 'ING_EGG', 'main', false),
('peruvian', 'PER_ALGARROBINA', 'ING_SUGAR', 'secondary', false),
('peruvian', 'PER_ALGARROBINA', 'ING_CINNAMON', 'secondary', false);

-- Verification
SELECT
  'Total product_ingredients for peruvian' as info,
  COUNT(*) as count
FROM product_ingredients
WHERE product_type = 'peruvian';

SELECT
  product_id,
  COUNT(*) as ingredient_count
FROM product_ingredients
WHERE product_type = 'peruvian'
GROUP BY product_id
ORDER BY ingredient_count DESC
LIMIT 10;
