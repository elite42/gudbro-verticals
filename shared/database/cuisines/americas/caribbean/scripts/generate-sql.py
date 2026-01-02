#!/usr/bin/env python3
"""
Generate SQL for Caribbean database from TypeScript data files.
GUDBRO Database Standards v1.3
"""

import os
import re
import json

# Path to data files
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def parse_ts_items(filepath):
    """Parse TypeScript array from file."""
    with open(filepath, 'r') as f:
        content = f.read()

    # Find array content between [ and ]
    match = re.search(r'Items:\s*CaribbeanItem\[\]\s*=\s*\[(.*?)\];', content, re.DOTALL)
    if not match:
        return []

    array_content = match.group(1)
    items = []

    # Parse each item object
    item_matches = re.findall(r'\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}', array_content)

    for item_str in item_matches:
        item = {}

        # Parse string fields
        for field in ['id', 'slug', 'name', 'local_name', 'description', 'category',
                      'origin', 'status', 'protein_type', 'cooking_method']:
            match = re.search(rf"{field}:\s*'([^']*)'", item_str)
            if match:
                item[field] = match.group(1)

        # Parse boolean fields
        for field in ['is_spicy', 'is_vegetarian', 'is_vegan', 'is_gluten_free',
                      'is_dairy_free', 'is_nut_free', 'is_halal', 'is_kosher']:
            match = re.search(rf"{field}:\s*(true|false)", item_str)
            if match:
                item[field] = match.group(1) == 'true'

        # Parse number fields
        for field in ['spice_level', 'serving_size_g', 'calories_per_serving', 'popularity']:
            match = re.search(rf"{field}:\s*(\d+)", item_str)
            if match:
                item[field] = int(match.group(1))

        # Parse array fields
        for field in ['ingredient_ids', 'allergens', 'tags']:
            match = re.search(rf"{field}:\s*\[(.*?)\]", item_str, re.DOTALL)
            if match:
                arr_str = match.group(1)
                arr_items = re.findall(r"'([^']*)'", arr_str)
                item[field] = arr_items

        if item.get('id'):
            items.append(item)

    return items

def escape_sql(s):
    """Escape string for SQL."""
    if s is None:
        return 'NULL'
    return "'" + s.replace("'", "''") + "'"

def format_array(arr):
    """Format array for PostgreSQL."""
    if not arr:
        return "'{}'::TEXT[]"
    items = ', '.join(f"'{item}'" for item in arr)
    return f"ARRAY[{items}]"

def generate_insert(item):
    """Generate INSERT statement for item."""
    fields = [
        'id', 'slug', 'name', 'local_name', 'description',
        'category', 'origin', 'status', 'protein_type', 'cooking_method',
        'is_spicy', 'spice_level', 'serving_size_g', 'calories_per_serving',
        'is_vegetarian', 'is_vegan', 'is_gluten_free', 'is_dairy_free',
        'is_nut_free', 'is_halal', 'is_kosher',
        'allergens', 'ingredient_ids', 'tags', 'popularity'
    ]

    values = []
    for field in fields:
        val = item.get(field)
        if field in ['ingredient_ids', 'allergens', 'tags']:
            values.append(format_array(val if val else []))
        elif field in ['is_spicy', 'is_vegetarian', 'is_vegan', 'is_gluten_free',
                       'is_dairy_free', 'is_nut_free', 'is_halal', 'is_kosher']:
            values.append('true' if val else 'false')
        elif field in ['spice_level', 'serving_size_g', 'calories_per_serving', 'popularity']:
            values.append(str(val) if val is not None else 'NULL')
        else:
            values.append(escape_sql(val) if val else 'NULL')

    return f"({', '.join(values)})"

def main():
    # Collect all items
    all_items = []
    files = [
        'jamaica.ts', 'cuba.ts', 'puerto-rico.ts', 'trinidad.ts',
        'haiti.ts', 'dominican-republic.ts', 'other-islands.ts'
    ]

    for filename in files:
        filepath = os.path.join(DATA_DIR, filename)
        if os.path.exists(filepath):
            items = parse_ts_items(filepath)
            print(f"Parsed {len(items)} items from {filename}")
            all_items.extend(items)

    print(f"\nTotal items: {len(all_items)}")

    # Generate SQL
    output = """-- ============================================
-- CARIBBEAN Database Data Import
-- GUDBRO Database Standards v1.3
-- Generated: {count} items
-- ============================================

INSERT INTO caribbean (
  id, slug, name, local_name, description,
  category, origin, status, protein_type, cooking_method,
  is_spicy, spice_level, serving_size_g, calories_per_serving,
  is_vegetarian, is_vegan, is_gluten_free, is_dairy_free,
  is_nut_free, is_halal, is_kosher,
  allergens, ingredient_ids, tags, popularity
)
VALUES
""".format(count=len(all_items))

    inserts = []
    for item in all_items:
        inserts.append(generate_insert(item))

    output += ',\n'.join(inserts)
    output += "\nON CONFLICT (id) DO UPDATE SET\n"
    output += "  name = EXCLUDED.name,\n"
    output += "  description = EXCLUDED.description,\n"
    output += "  updated_at = NOW();\n"

    # Write output
    output_path = os.path.join(os.path.dirname(__file__), '03-caribbean-data.sql')
    with open(output_path, 'w') as f:
        f.write(output)

    print(f"\nGenerated: {output_path}")

    # Generate product_ingredients SQL
    pi_output = """-- ============================================
-- CARIBBEAN Product Ingredients Links
-- GUDBRO Database Standards v1.3
-- ============================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id)
VALUES
"""

    pi_values = []
    for item in all_items:
        for ing_id in item.get('ingredient_ids', []):
            pi_values.append(f"('caribbean', '{item['id']}', '{ing_id}')")

    pi_output += ',\n'.join(pi_values)
    pi_output += "\nON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;\n"

    pi_path = os.path.join(os.path.dirname(__file__), '04-caribbean-product-ingredients.sql')
    with open(pi_path, 'w') as f:
        f.write(pi_output)

    print(f"Generated: {pi_path}")
    print(f"Total product_ingredients links: {len(pi_values)}")

if __name__ == '__main__':
    main()
