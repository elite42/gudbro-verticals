#!/usr/bin/env python3
"""
Generate SQL data import for Vietnamese database.
Reads TypeScript data files and outputs SQL INSERT statements.
"""

import re
import json
from pathlib import Path
from typing import List, Dict, Any

DATA_DIR = Path(__file__).parent.parent / "data"

def extract_items_from_ts(filepath: Path) -> List[Dict[str, Any]]:
    """Extract item objects from TypeScript file."""
    content = filepath.read_text()

    items = []
    # Find all object literals in the array
    # This regex finds {...} blocks that represent dish objects

    # Split by the pattern that starts each item
    item_pattern = r'\{\s*id:\s*[\'"]([^"\']+)[\'"]'

    # Find all items starting positions
    starts = [(m.start(), m.group(1)) for m in re.finditer(item_pattern, content)]

    for i, (start, item_id) in enumerate(starts):
        # Find the end of this object (next item or end of array)
        if i + 1 < len(starts):
            end = starts[i + 1][0]
        else:
            # Find the closing of the array
            end = content.rfind('];')

        item_text = content[start:end]
        # Clean up trailing comma and whitespace
        item_text = item_text.rstrip().rstrip(',')

        # Parse the item
        item = parse_ts_object(item_text, item_id)
        if item:
            items.append(item)

    return items


def parse_ts_object(text: str, item_id: str) -> Dict[str, Any]:
    """Parse a TypeScript object literal into a Python dict."""
    item = {'id': item_id}

    # Extract string fields
    string_fields = [
        'slug', 'name', 'description', 'vietnamese_name', 'category',
        'status', 'region', 'origin_city', 'protein_type', 'cooking_method',
        'broth_type'
    ]
    for field in string_fields:
        match = re.search(rf"{field}:\s*['\"]([^'\"]*)['\"]", text)
        if match:
            item[field] = match.group(1)
        else:
            item[field] = None

    # Extract boolean fields
    bool_fields = [
        'is_fusion', 'is_street_food', 'is_vegetarian_adaptable',
        'is_gluten_free', 'is_dairy_free', 'is_nut_free',
        'is_vegan', 'is_vegetarian', 'is_halal', 'is_pescatarian'
    ]
    for field in bool_fields:
        match = re.search(rf"{field}:\s*(true|false)", text)
        if match:
            item[field] = match.group(1) == 'true'
        else:
            item[field] = False

    # Extract numeric fields
    num_fields = ['calories_per_serving', 'protein_g', 'carbs_g', 'fat_g', 'spice_level', 'popularity']
    for field in num_fields:
        match = re.search(rf"{field}:\s*(\d+(?:\.\d+)?)", text)
        if match:
            item[field] = float(match.group(1)) if '.' in match.group(1) else int(match.group(1))
        else:
            item[field] = None

    # Extract array fields
    array_fields = ['ingredient_ids', 'allergens', 'tags', 'meal_types', 'cuisine_influences']
    for field in array_fields:
        match = re.search(rf"{field}:\s*\[([^\]]*)\]", text, re.DOTALL)
        if match:
            array_content = match.group(1)
            # Extract strings from array
            strings = re.findall(r"['\"]([^'\"]+)['\"]", array_content)
            item[field] = strings
        else:
            item[field] = []

    return item


def escape_sql(s: str) -> str:
    """Escape string for SQL."""
    if s is None:
        return "NULL"
    return s.replace("'", "''")


def array_to_sql(arr: List[str]) -> str:
    """Convert list to SQL array."""
    if not arr:
        return "ARRAY[]::TEXT[]"
    escaped = [f"'{escape_sql(x)}'" for x in arr]
    return f"ARRAY[{', '.join(escaped)}]"


def item_to_sql(item: Dict[str, Any]) -> str:
    """Convert item dict to SQL INSERT values."""

    def sql_val(v, is_str=False):
        if v is None:
            return "NULL"
        if isinstance(v, bool):
            return str(v).lower()
        if isinstance(v, (int, float)):
            return str(v)
        if is_str:
            return f"'{escape_sql(str(v))}'"
        return str(v)

    values = [
        sql_val(item.get('id'), True),                    # id
        sql_val(item.get('slug'), True),                  # slug
        sql_val(item.get('name'), True),                  # name
        sql_val(item.get('description'), True),           # description
        sql_val(item.get('vietnamese_name'), True),       # vietnamese_name
        sql_val(item.get('category'), True),              # category
        sql_val(item.get('status') or 'active', True),    # status
        sql_val(item.get('region'), True),                # region
        sql_val(item.get('origin_city'), True),           # origin_city
        array_to_sql(item.get('cuisine_influences', [])), # cuisine_influences
        sql_val(item.get('is_fusion', False)),            # is_fusion
        sql_val(item.get('protein_type'), True),          # protein_type
        sql_val(item.get('cooking_method'), True),        # cooking_method
        sql_val(item.get('broth_type'), True),            # broth_type
        array_to_sql(item.get('meal_types', [])),         # meal_types
        sql_val(item.get('is_street_food', False)),       # is_street_food
        sql_val(item.get('is_vegetarian_adaptable', False)), # is_vegetarian_adaptable
        array_to_sql(item.get('ingredient_ids', [])),     # ingredient_ids
        array_to_sql(item.get('allergens', [])),          # allergens
        sql_val(item.get('is_gluten_free', False)),       # is_gluten_free
        sql_val(item.get('is_dairy_free', False)),        # is_dairy_free
        sql_val(item.get('is_nut_free', False)),          # is_nut_free
        sql_val(item.get('is_vegan', False)),             # is_vegan
        sql_val(item.get('is_vegetarian', False)),        # is_vegetarian
        sql_val(item.get('is_halal', False)),             # is_halal
        sql_val(item.get('is_pescatarian', False)),       # is_pescatarian
        sql_val(item.get('calories_per_serving')),        # calories_per_serving
        sql_val(item.get('protein_g')),                   # protein_g
        sql_val(item.get('carbs_g')),                     # carbs_g
        sql_val(item.get('fat_g')),                       # fat_g
        sql_val(item.get('spice_level', 0)),              # spice_level
        array_to_sql(item.get('tags', [])),               # tags
        sql_val(item.get('popularity', 50)),              # popularity
    ]

    return f"  ({', '.join(values)})"


def main():
    """Generate SQL from all data files."""
    print("-- =============================================================================")
    print("-- VIETNAMESE DATABASE - DATA IMPORT")
    print("-- 80 authentic Vietnamese dishes")
    print("-- DATABASE-STANDARDS v1.1 compliant")
    print("-- =============================================================================")
    print()

    # Column list for INSERT
    columns = """id, slug, name, description, vietnamese_name, category, status,
    region, origin_city, cuisine_influences, is_fusion, protein_type, cooking_method,
    broth_type, meal_types, is_street_food, is_vegetarian_adaptable, ingredient_ids,
    allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian,
    is_halal, is_pescatarian, calories_per_serving, protein_g, carbs_g, fat_g,
    spice_level, tags, popularity"""

    print(f"INSERT INTO vietnamese ({columns})")
    print("VALUES")

    all_items = []

    # Process each data file
    data_files = ['pho.ts', 'bun.ts', 'banh.ts', 'cuon.ts', 'com.ts', 'other.ts']

    for filename in data_files:
        filepath = DATA_DIR / filename
        if filepath.exists():
            items = extract_items_from_ts(filepath)
            all_items.extend(items)
            print(f"-- {filename}: {len(items)} items", file=__import__('sys').stderr)

    # Generate SQL
    sql_values = [item_to_sql(item) for item in all_items]
    print(",\n".join(sql_values) + ";")

    print()
    print(f"-- Total: {len(all_items)} Vietnamese dishes imported")
    print()

    # Stats by category
    print("-- Statistics by category:")
    categories = {}
    for item in all_items:
        cat = item.get('category', 'unknown')
        categories[cat] = categories.get(cat, 0) + 1
    for cat, count in sorted(categories.items()):
        print(f"--   {cat}: {count}")


if __name__ == "__main__":
    main()
