#!/usr/bin/env python3
"""
Generate product_ingredients SQL for Vietnamese database.
Links Vietnamese dishes to ingredients with roles and sort_order.
"""

import re
from pathlib import Path
from typing import List, Dict, Tuple

DATA_DIR = Path(__file__).parent.parent / "data"

def extract_items_from_ts(filepath: Path) -> List[Dict]:
    """Extract item objects from TypeScript file."""
    content = filepath.read_text()
    items = []

    # Find all id and ingredient_ids patterns
    item_pattern = r'\{\s*id:\s*[\'"]([^"\']+)[\'"]'
    ingredient_pattern = r'ingredient_ids:\s*\[([^\]]*)\]'

    # Find all items
    for match in re.finditer(item_pattern, content):
        item_id = match.group(1)
        start = match.start()

        # Find the ingredient_ids for this item
        rest = content[start:start + 3000]  # Look ahead in current item
        ing_match = re.search(ingredient_pattern, rest, re.DOTALL)

        if ing_match:
            ing_content = ing_match.group(1)
            ingredients = re.findall(r"['\"]([^'\"]+)['\"]", ing_content)
            items.append({
                'id': item_id,
                'ingredients': ingredients
            })

    return items


def assign_role(ingredient_id: str, index: int, total: int) -> str:
    """Assign a role based on ingredient type and position."""
    ing = ingredient_id.upper()

    # Primary proteins
    if any(x in ing for x in ['BEEF', 'PORK', 'CHICKEN', 'DUCK', 'SHRIMP', 'FISH', 'CRAB', 'SQUID', 'GOAT', 'TOFU']):
        return 'main'

    # Carbs/base
    if any(x in ing for x in ['NOODLE', 'RICE', 'BAGUETTE', 'FLOUR', 'WRAPPER']):
        return 'base'

    # Broth
    if 'BONE' in ing or 'BROTH' in ing:
        return 'base'

    # Core aromatics
    if any(x in ing for x in ['GARLIC', 'GINGER', 'ONION', 'SHALLOT', 'LEMONGRASS']):
        return 'aromatic'

    # Key sauces
    if any(x in ing for x in ['FISH_SAUCE', 'SOY_SAUCE', 'HOISIN', 'OYSTER_SAUCE', 'NUOC_CHAM']):
        return 'sauce'

    # Herbs
    if any(x in ing for x in ['MINT', 'BASIL', 'CILANTRO', 'CORIANDER', 'PERILLA', 'DILL']):
        return 'garnish'

    # Vegetables as toppings
    if any(x in ing for x in ['LETTUCE', 'BEAN_SPROUT', 'CUCUMBER', 'CARROT', 'CABBAGE', 'BANANA_BLOSSOM']):
        return 'garnish'

    # Spices
    if any(x in ing for x in ['STAR_ANISE', 'CINNAMON', 'CARDAMOM', 'TURMERIC', 'PEPPER', 'CHILI', 'FIVE_SPICE']):
        return 'spice'

    # Condiments
    if any(x in ing for x in ['LIME', 'VINEGAR', 'SUGAR', 'SALT', 'HONEY', 'CARAMEL']):
        return 'optional'

    # Oils
    if 'OIL' in ing:
        return 'optional'

    # Default
    if index < 3:
        return 'main'
    elif index < 6:
        return 'supporting'
    else:
        return 'optional'


def main():
    """Generate product_ingredients SQL."""
    print("-- =============================================================================")
    print("-- VIETNAMESE DATABASE - PRODUCT_INGREDIENTS")
    print("-- Links Vietnamese dishes to ingredients")
    print("-- =============================================================================")
    print()
    print("INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)")
    print("VALUES")

    all_items = []
    data_files = ['pho.ts', 'bun.ts', 'banh.ts', 'cuon.ts', 'com.ts', 'other.ts']

    for filename in data_files:
        filepath = DATA_DIR / filename
        if filepath.exists():
            items = extract_items_from_ts(filepath)
            all_items.extend(items)

    values = []
    total_links = 0

    for item in all_items:
        product_id = item['id']
        ingredients = item['ingredients']

        for idx, ing_id in enumerate(ingredients):
            role = assign_role(ing_id, idx, len(ingredients))
            values.append(f"  ('vietnamese', '{product_id}', '{ing_id}', '{role}', {idx + 1})")
            total_links += 1

    print(",\n".join(values) + ";")
    print()
    print(f"-- Total: {total_links} product_ingredient links")
    print(f"-- Average: {total_links / len(all_items):.1f} ingredients per dish")


if __name__ == "__main__":
    main()
