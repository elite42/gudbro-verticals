#!/usr/bin/env python3
"""
Generate SQL INSERT statements from Japanese database TypeScript files.
Run: python3 generate-data-sql.py > data-import.sql
"""

import re
import json
from pathlib import Path

def parse_ts_array(content: str) -> list:
    """Parse TypeScript array of objects into Python list."""
    # Extract the array content between [ and ]
    match = re.search(r'export const \w+: \w+\[\] = \[(.*)\];', content, re.DOTALL)
    if not match:
        return []

    array_content = match.group(1)

    # Convert TypeScript to JSON-like format
    # Replace single quotes with double quotes (for strings)
    # Handle special cases

    dishes = []
    # Split by },{ pattern to get individual objects
    obj_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    objects = re.findall(obj_pattern, array_content)

    for obj_str in objects:
        dish = {}

        # Extract id
        id_match = re.search(r"id:\s*'([^']+)'", obj_str)
        if id_match:
            dish['id'] = id_match.group(1)

        # Extract slug
        slug_match = re.search(r"slug:\s*'([^']+)'", obj_str)
        if slug_match:
            dish['slug'] = slug_match.group(1)

        # Extract name
        name_match = re.search(r"name:\s*'([^']+)'", obj_str)
        if name_match:
            dish['name'] = name_match.group(1)

        # Extract name_japanese
        name_jp_match = re.search(r"name_japanese:\s*'([^']+)'", obj_str)
        if name_jp_match:
            dish['name_japanese'] = name_jp_match.group(1)

        # Extract name_kanji
        name_kanji_match = re.search(r"name_kanji:\s*'([^']+)'", obj_str)
        if name_kanji_match:
            dish['name_kanji'] = name_kanji_match.group(1)

        # Extract description
        desc_match = re.search(r"description:\s*'([^']+)'", obj_str)
        if desc_match:
            dish['description'] = desc_match.group(1)

        # Extract category
        cat_match = re.search(r"category:\s*'([^']+)'", obj_str)
        if cat_match:
            dish['category'] = cat_match.group(1)

        # Extract protein_type
        protein_match = re.search(r"protein_type:\s*'([^']+)'", obj_str)
        if protein_match:
            dish['protein_type'] = protein_match.group(1)

        # Extract preparation
        prep_match = re.search(r"preparation:\s*'([^']+)'", obj_str)
        if prep_match:
            dish['preparation'] = prep_match.group(1)

        # Extract roll_style
        roll_match = re.search(r"roll_style:\s*'([^']+)'", obj_str)
        if roll_match:
            dish['roll_style'] = roll_match.group(1)

        # Extract origin
        origin_match = re.search(r"origin:\s*'([^']+)'", obj_str)
        if origin_match:
            dish['origin'] = origin_match.group(1)

        # Extract status
        status_match = re.search(r"status:\s*'([^']+)'", obj_str)
        if status_match:
            dish['status'] = status_match.group(1)

        # Extract pieces_per_serving
        pieces_match = re.search(r"pieces_per_serving:\s*(\d+)", obj_str)
        if pieces_match:
            dish['pieces_per_serving'] = int(pieces_match.group(1))

        # Extract nori_position
        nori_match = re.search(r"nori_position:\s*'([^']+)'", obj_str)
        if nori_match:
            dish['nori_position'] = nori_match.group(1)

        # Extract rice_type
        rice_match = re.search(r"rice_type:\s*'([^']+)'", obj_str)
        if rice_match:
            dish['rice_type'] = rice_match.group(1)

        # Extract arrays
        def extract_array(pattern, obj_str):
            match = re.search(pattern, obj_str)
            if match:
                arr_str = match.group(1)
                items = re.findall(r"'([^']+)'", arr_str)
                return items
            return []

        dish['main_ingredients'] = extract_array(r"main_ingredients:\s*\[([^\]]*)\]", obj_str)
        dish['filling_ingredients'] = extract_array(r"filling_ingredients:\s*\[([^\]]*)\]", obj_str)
        dish['topping_ingredients'] = extract_array(r"topping_ingredients:\s*\[([^\]]*)\]", obj_str)
        dish['sauce'] = extract_array(r"sauce:\s*\[([^\]]*)\]", obj_str)
        dish['garnish'] = extract_array(r"garnish:\s*\[([^\]]*)\]", obj_str)
        dish['ingredient_ids'] = extract_array(r"ingredient_ids:\s*\[([^\]]*)\]", obj_str)
        dish['allergens'] = extract_array(r"allergens:\s*\[([^\]]*)\]", obj_str)
        dish['tags'] = extract_array(r"tags:\s*\[([^\]]*)\]", obj_str)
        dish['sake_pairing'] = extract_array(r"sake_pairing:\s*\[([^\]]*)\]", obj_str)

        # Extract serving_style
        style_match = re.search(r"serving_style:\s*'([^']+)'", obj_str)
        if style_match:
            dish['serving_style'] = style_match.group(1)

        # Extract serving_temp
        temp_match = re.search(r"serving_temp:\s*'([^']+)'", obj_str)
        if temp_match:
            dish['serving_temp'] = temp_match.group(1)

        # Extract booleans
        dish['wasabi_included'] = 'wasabi_included: true' in obj_str
        dish['ginger_included'] = 'ginger_included: true' in obj_str
        dish['is_raw'] = 'is_raw: true' in obj_str
        dish['is_vegetarian'] = 'is_vegetarian: true' in obj_str
        dish['is_vegan'] = 'is_vegan: true' in obj_str
        dish['is_gluten_free'] = 'is_gluten_free: true' in obj_str
        dish['is_cooked'] = 'is_cooked: true' in obj_str
        dish['contains_raw_fish'] = 'contains_raw_fish: true' in obj_str

        # Extract numbers
        cal_match = re.search(r"calories_per_serving:\s*(\d+)", obj_str)
        if cal_match:
            dish['calories_per_serving'] = int(cal_match.group(1))

        protein_g_match = re.search(r"protein_g:\s*(\d+\.?\d*)", obj_str)
        if protein_g_match:
            dish['protein_g'] = float(protein_g_match.group(1))

        carbs_match = re.search(r"carbs_g:\s*(\d+\.?\d*)", obj_str)
        if carbs_match:
            dish['carbs_g'] = float(carbs_match.group(1))

        fat_match = re.search(r"fat_g:\s*(\d+\.?\d*)", obj_str)
        if fat_match:
            dish['fat_g'] = float(fat_match.group(1))

        omega_match = re.search(r"omega3_mg:\s*(\d+)", obj_str)
        if omega_match:
            dish['omega3_mg'] = int(omega_match.group(1))

        spice_match = re.search(r"spice_level:\s*(\d+)", obj_str)
        if spice_match:
            dish['spice_level'] = int(spice_match.group(1))
        else:
            dish['spice_level'] = 0

        pop_match = re.search(r"popularity:\s*(\d+)", obj_str)
        if pop_match:
            dish['popularity'] = int(pop_match.group(1))

        diff_match = re.search(r"difficulty:\s*'([^']+)'", obj_str)
        if diff_match:
            dish['difficulty'] = diff_match.group(1)

        # Extract history
        history_match = re.search(r"history:\s*'([^']+)'", obj_str)
        if history_match:
            dish['history'] = history_match.group(1)

        # Extract fun_fact
        fun_match = re.search(r"fun_fact:\s*'([^']+)'", obj_str)
        if fun_match:
            dish['fun_fact'] = fun_match.group(1)

        # Extract cut_style
        cut_match = re.search(r"cut_style:\s*'([^']+)'", obj_str)
        if cut_match:
            dish['cut_style'] = cut_match.group(1)

        # Extract soy_sauce_type
        soy_match = re.search(r"soy_sauce_type:\s*'([^']+)'", obj_str)
        if soy_match:
            dish['soy_sauce_type'] = soy_match.group(1)

        if dish.get('id'):
            dishes.append(dish)

    return dishes


def escape_sql(value):
    """Escape a string for SQL."""
    if value is None:
        return 'NULL'
    return "'" + str(value).replace("'", "''") + "'"


def to_sql_array(arr):
    """Convert Python list to PostgreSQL array literal."""
    if not arr:
        return "'{}'::TEXT[]"
    escaped = [v.replace("'", "''") for v in arr]
    return "ARRAY[" + ", ".join(f"'{v}'" for v in escaped) + "]"


def generate_insert(dish):
    """Generate INSERT statement for a dish."""
    fields = [
        'id', 'slug', 'name', 'name_japanese', 'name_kanji', 'description',
        'category', 'protein_type', 'preparation', 'roll_style', 'origin', 'status',
        'cut_style', 'pieces_per_serving', 'nori_position', 'rice_type',
        'main_ingredients', 'filling_ingredients', 'topping_ingredients', 'sauce', 'garnish', 'ingredient_ids',
        'serving_style', 'serving_temp', 'wasabi_included', 'ginger_included', 'soy_sauce_type',
        'is_raw', 'is_vegetarian', 'is_vegan', 'is_gluten_free', 'is_cooked', 'contains_raw_fish',
        'allergens', 'calories_per_serving', 'protein_g', 'carbs_g', 'fat_g', 'omega3_mg', 'spice_level',
        'tags', 'popularity', 'difficulty', 'sake_pairing', 'history', 'fun_fact'
    ]

    values = []
    for f in fields:
        v = dish.get(f)
        if f in ['main_ingredients', 'filling_ingredients', 'topping_ingredients', 'sauce', 'garnish',
                 'ingredient_ids', 'allergens', 'tags', 'sake_pairing']:
            values.append(to_sql_array(v if v else []))
        elif f in ['wasabi_included', 'ginger_included', 'is_raw', 'is_vegetarian', 'is_vegan',
                   'is_gluten_free', 'is_cooked', 'contains_raw_fish']:
            values.append('TRUE' if v else 'FALSE')
        elif f in ['pieces_per_serving', 'calories_per_serving', 'omega3_mg', 'spice_level', 'popularity']:
            values.append(str(v) if v is not None else 'NULL')
        elif f in ['protein_g', 'carbs_g', 'fat_g']:
            values.append(str(v) if v is not None else 'NULL')
        else:
            values.append(escape_sql(v) if v else 'NULL')

    return f"INSERT INTO japanese ({', '.join(fields)}) VALUES ({', '.join(values)});"


def main():
    data_dir = Path(__file__).parent.parent / 'data'

    # Files to process
    files = [
        'nigiri.ts',
        'sashimi.ts',
        'maki.ts',
        'specialty-rolls.ts',
        'temaki-gunkan.ts',
        'donburi-chirashi.ts',
        'other-styles.ts'
    ]

    all_dishes = []

    for filename in files:
        filepath = data_dir / filename
        if filepath.exists():
            content = filepath.read_text()
            dishes = parse_ts_array(content)
            all_dishes.extend(dishes)
            print(f"-- Loaded {len(dishes)} dishes from {filename}", file=__import__('sys').stderr)

    print(f"-- =====================================================")
    print(f"-- GUDBRO Japanese Cuisine Database - Data Import")
    print(f"-- Total dishes: {len(all_dishes)}")
    print(f"-- =====================================================")
    print()

    for i, dish in enumerate(all_dishes, 1):
        print(f"-- [{i}/{len(all_dishes)}] {dish.get('name', 'Unknown')}")
        print(generate_insert(dish))
        print()

    print(f"-- =====================================================")
    print(f"-- Import complete: {len(all_dishes)} dishes")
    print(f"-- =====================================================")


if __name__ == '__main__':
    main()
