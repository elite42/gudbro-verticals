#!/usr/bin/env python3
"""
Generates SQL INSERT statements for product_ingredients from Chinese data files.
"""

import re
import os

def extract_items_from_ts(file_path):
    """Extract item objects from a TypeScript file."""
    with open(file_path, 'r') as f:
        content = f.read()

    items = []
    in_array = False
    current_obj = ""
    brace_count = 0

    for line in content.split('\n'):
        if 'ChineseItem[] = [' in line:
            in_array = True
            continue

        if in_array:
            for char in line:
                if char == '{':
                    brace_count += 1
                    current_obj += char
                elif char == '}':
                    brace_count -= 1
                    current_obj += char
                    if brace_count == 0 and current_obj.strip():
                        items.append(current_obj)
                        current_obj = ""
                elif brace_count > 0:
                    current_obj += char

            if brace_count > 0:
                current_obj += '\n'

    return items

def parse_ts_object(ts_obj):
    """Parse TypeScript object to get id and ingredient_ids."""
    result = {}

    # Get id
    id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", ts_obj)
    if id_match:
        result['id'] = id_match.group(1)

    # Get ingredient_ids array
    ing_match = re.search(r"ingredient_ids:\s*\[([^\]]*)\]", ts_obj, re.DOTALL)
    if ing_match:
        array_content = ing_match.group(1)
        items = re.findall(r"['\"]([^'\"]+)['\"]", array_content)
        result['ingredient_ids'] = items
    else:
        result['ingredient_ids'] = []

    return result

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    scripts_dir = os.path.join(base_dir, 'scripts')

    files = [
        'stir-fries.ts', 'noodles.ts', 'dim-sum.ts', 'rice-dishes.ts',
        'roasted.ts', 'soups.ts', 'braised.ts', 'seafood.ts',
        'appetizers.ts', 'desserts.ts'
    ]

    all_links = []
    total_dishes = 0
    total_links = 0

    for filename in files:
        filepath = os.path.join(data_dir, filename)
        if not os.path.exists(filepath):
            continue

        items_raw = extract_items_from_ts(filepath)

        for raw in items_raw:
            item = parse_ts_object(raw)
            if item and 'id' in item:
                product_id = item['id']
                total_dishes += 1

                for idx, ing_id in enumerate(item.get('ingredient_ids', [])):
                    # Role: first 3 ingredients are 'main', rest are 'supporting'
                    role = 'main' if idx < 3 else 'supporting'
                    all_links.append({
                        'product_id': product_id,
                        'product_type': 'chinese',
                        'ingredient_id': ing_id,
                        'role': role,
                        'sort_order': idx + 1
                    })
                    total_links += 1

    # Write output file
    output_file = os.path.join(scripts_dir, '04-chinese-product-ingredients.sql')
    with open(output_file, 'w') as f:
        f.write("-- ============================================\n")
        f.write("-- CHINESE PRODUCT_INGREDIENTS LINKS\n")
        f.write("-- ============================================\n")
        f.write(f"-- Total dishes: {total_dishes}\n")
        f.write(f"-- Total links: {total_links}\n")
        f.write(f"-- Average ingredients per dish: {total_links/total_dishes:.1f}\n")
        f.write("-- ============================================\n\n")

        f.write("BEGIN;\n\n")

        # Batch inserts for better performance
        batch_size = 100
        for i in range(0, len(all_links), batch_size):
            batch = all_links[i:i+batch_size]
            f.write("INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES\n")
            values = []
            for link in batch:
                values.append(f"  ('{link['product_type']}', '{link['product_id']}', '{link['ingredient_id']}', '{link['role']}', {link['sort_order']})")
            f.write(",\n".join(values))
            f.write("\nON CONFLICT DO NOTHING;\n\n")

        f.write("COMMIT;\n\n")
        f.write("-- Verify\n")
        f.write("SELECT COUNT(*) as chinese_links FROM product_ingredients WHERE product_type = 'chinese';\n")
        f.write("SELECT COUNT(DISTINCT product_id) as chinese_dishes_with_ingredients FROM product_ingredients WHERE product_type = 'chinese';\n")

    print(f"Generated {output_file}")
    print(f"Total dishes: {total_dishes}")
    print(f"Total links: {total_links}")
    print(f"Average ingredients per dish: {total_links/total_dishes:.1f}")

if __name__ == '__main__':
    main()
