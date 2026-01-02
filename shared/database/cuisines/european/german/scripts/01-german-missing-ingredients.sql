-- ============================================
-- German Cuisine - Missing Ingredients
-- Created: 2025-12-24
-- New ingredients: 5
-- Note: Nutrition data will be added in batch at project end
-- ============================================

-- ING_MARJORAM - herb used in German sausages
INSERT INTO ingredients (id, slug, name, category, description)
VALUES (
    'ING_MARJORAM',
    'marjoram',
    'Marjoram',
    'herbs',
    'Sweet, aromatic herb with a mild oregano-like flavor. Essential in German sausages, especially Thuringian and Nuremberg bratwurst.'
)
ON CONFLICT (id) DO NOTHING;

-- ING_RYE_BERRIES - whole rye grain for pumpernickel
INSERT INTO ingredients (id, slug, name, category, description)
VALUES (
    'ING_RYE_BERRIES',
    'rye-berries',
    'Rye Berries',
    'grains',
    'Whole rye kernels used in traditional German pumpernickel bread. Slow-cooked to develop sweet, malty flavor.'
)
ON CONFLICT (id) DO NOTHING;

-- ING_RYE_FLOUR - essential for German bread
INSERT INTO ingredients (id, slug, name, category, description)
VALUES (
    'ING_RYE_FLOUR',
    'rye-flour',
    'Rye Flour',
    'grains',
    'Ground rye grain flour used in traditional German breads. Produces dense, flavorful loaves like roggenbrot.'
)
ON CONFLICT (id) DO NOTHING;

-- ING_SMOKED_PORK - for Erbsensuppe and other dishes
INSERT INTO ingredients (id, slug, name, category, description)
VALUES (
    'ING_SMOKED_PORK',
    'smoked-pork',
    'Smoked Pork',
    'proteins',
    'Cured and smoked pork meat, essential in German soups like Erbsensuppe. Adds rich, smoky flavor to dishes.'
)
ON CONFLICT (id) DO NOTHING;

-- ING_SMOKED_SAUSAGE - for Linsensuppe
INSERT INTO ingredients (id, slug, name, category, description)
VALUES (
    'ING_SMOKED_SAUSAGE',
    'smoked-sausage',
    'Smoked Sausage',
    'proteins',
    'German-style smoked sausage used in soups and stews. Common in lentil soup and other traditional dishes.'
)
ON CONFLICT (id) DO NOTHING;

-- Verification
SELECT id, name, category FROM ingredients
WHERE id IN ('ING_MARJORAM', 'ING_RYE_BERRIES', 'ING_RYE_FLOUR', 'ING_SMOKED_PORK', 'ING_SMOKED_SAUSAGE')
ORDER BY id;
