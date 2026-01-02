-- Indo-Chinese Database - Script 01: New Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-25
--
-- 1 nuovo ingrediente necessario: Schezwan Sauce
--
-- Ingredienti auto-corretti:
-- ING_HAKKA_NOODLES → ING_CHOW_MEIN_NOODLES (esiste già)
-- ING_TOMATO_KETCHUP → ING_KETCHUP (esiste già)

INSERT INTO ingredients (id, slug, name, category, description)
SELECT 'ING_SCHEZWAN_SAUCE', 'schezwan-sauce', 'Schezwan Sauce', 'sauces', 'Spicy Indo-Chinese sauce made with Sichuan peppercorns, dried red chilies, garlic, and ginger'
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SCHEZWAN_SAUCE');

SELECT 'Added 1 new ingredient for Indo-Chinese' AS status;
