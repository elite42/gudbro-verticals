#!/usr/bin/env python3
"""
Generates SQL INSERT statements for Thai dishes from TypeScript data files.
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
        if 'ThaiItem[] = [' in line:
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
    """Parse a TypeScript object string into a dictionary."""
    obj = ts_obj.strip()
    result = {}

    # String fields
    string_patterns = {
        'id': r"id:\s*['\"]([^'\"]+)['\"]",
        'slug': r"slug:\s*['\"]([^'\"]+)['\"]",
        'name': r"name:\s*['\"]([^'\"]+)['\"]",
        'description': r"description:\s*['\"](.+?)['\"],?\s*\n",
        'thai_name': r"thai_name:\s*['\"]([^'\"]+)['\"]",
        'thai_script': r"thai_script:\s*['\"]([^'\"]+)['\"]",
        'category': r"category:\s*['\"]([^'\"]+)['\"]",
        'status': r"status:\s*['\"]([^'\"]+)['\"]",
        'region': r"region:\s*['\"]([^'\"]+)['\"]",
        'protein_type': r"protein_type:\s*['\"]([^'\"]+)['\"]",
        'cooking_method': r"cooking_method:\s*['\"]([^'\"]+)['\"]",
        'curry_type': r"curry_type:\s*['\"]([^'\"]+)['\"]",
    }

    for field, pattern in string_patterns.items():
        match = re.search(pattern, obj, re.DOTALL)
        if match:
            result[field] = match.group(1)

    # Boolean fields
    bool_patterns = {
        'is_street_food': r"is_street_food:\s*(true|false)",
        'has_coconut_milk': r"has_coconut_milk:\s*(true|false)",
        'is_gluten_free': r"is_gluten_free:\s*(true|false)",
        'is_dairy_free': r"is_dairy_free:\s*(true|false)",
        'is_nut_free': r"is_nut_free:\s*(true|false)",
        'is_vegan': r"is_vegan:\s*(true|false)",
        'is_vegetarian': r"is_vegetarian:\s*(true|false)",
        'is_halal': r"is_halal:\s*(true|false)",
        'is_pescatarian': r"is_pescatarian:\s*(true|false)",
    }

    for field, pattern in bool_patterns.items():
        match = re.search(pattern, obj)
        if match:
            result[field] = match.group(1)

    # Number fields
    num_patterns = {
        'calories_per_serving': r"calories_per_serving:\s*(\d+)",
        'protein_g': r"protein_g:\s*(\d+)",
        'carbs_g': r"carbs_g:\s*(\d+)",
        'fat_g': r"fat_g:\s*(\d+)",
        'spice_level': r"spice_level:\s*(\d+)",
        'popularity': r"popularity:\s*(\d+)",
    }

    for field, pattern in num_patterns.items():
        match = re.search(pattern, obj)
        if match:
            result[field] = int(match.group(1))

    # Array fields
    array_patterns = {
        'ingredient_ids': r"ingredient_ids:\s*\[([^\]]*)\]",
        'allergens': r"allergens:\s*\[([^\]]*)\]",
        'tags': r"tags:\s*\[([^\]]*)\]",
    }

    for field, pattern in array_patterns.items():
        match = re.search(pattern, obj, re.DOTALL)
        if match:
            array_content = match.group(1)
            items = re.findall(r"['\"]([^'\"]+)['\"]", array_content)
            result[field] = items
        else:
            result[field] = []

    return result

def escape_sql(s):
    """Escape single quotes for SQL."""
    if s is None:
        return None
    return s.replace("'", "''")

def format_array(arr):
    """Format Python list as PostgreSQL array literal."""
    if not arr:
        return "'{}'::TEXT[]"
    escaped = [escape_sql(item) for item in arr]
    return "ARRAY[" + ", ".join(f"'{item}'" for item in escaped) + "]"

def generate_insert(item):
    """Generate SQL INSERT statement for a Thai dish."""
    required = ['id', 'slug', 'name', 'description', 'category', 'status',
                'region', 'protein_type', 'cooking_method', 'curry_type']

    for field in required:
        if field not in item:
            print(f"Missing required field: {field} in {item.get('id', 'unknown')}")
            return None

    sql = f"""INSERT INTO thai (
  id, slug, name, description, thai_name, thai_script,
  category, status, region, protein_type, cooking_method, curry_type,
  is_street_food, has_coconut_milk,
  ingredient_ids, allergens,
  is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_pescatarian,
  calories_per_serving, protein_g, carbs_g, fat_g,
  spice_level, tags, popularity
) VALUES (
  '{escape_sql(item['id'])}',
  '{escape_sql(item['slug'])}',
  '{escape_sql(item['name'])}',
  '{escape_sql(item['description'])}',
  {f"'{escape_sql(item['thai_name'])}'" if item.get('thai_name') else 'NULL'},
  {f"'{escape_sql(item['thai_script'])}'" if item.get('thai_script') else 'NULL'},
  '{escape_sql(item['category'])}',
  '{escape_sql(item['status'])}',
  '{escape_sql(item['region'])}',
  '{escape_sql(item['protein_type'])}',
  '{escape_sql(item['cooking_method'])}',
  '{escape_sql(item['curry_type'])}',
  {item.get('is_street_food', 'false')},
  {item.get('has_coconut_milk', 'false')},
  {format_array(item.get('ingredient_ids', []))},
  {format_array(item.get('allergens', []))},
  {item.get('is_gluten_free', 'false')},
  {item.get('is_dairy_free', 'true')},
  {item.get('is_nut_free', 'true')},
  {item.get('is_vegan', 'false')},
  {item.get('is_vegetarian', 'false')},
  {item.get('is_halal', 'false')},
  {item.get('is_pescatarian', 'false')},
  {item.get('calories_per_serving', 'NULL')},
  {item.get('protein_g', 'NULL')},
  {item.get('carbs_g', 'NULL')},
  {item.get('fat_g', 'NULL')},
  {item.get('spice_level', 0)},
  {format_array(item.get('tags', []))},
  {item.get('popularity', 50)}
);"""

    return sql

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    scripts_dir = os.path.join(base_dir, 'scripts')

    files = [
        'curries.ts', 'stir-fries.ts', 'soups.ts', 'salads.ts',
        'noodles.ts', 'rice-dishes.ts', 'appetizers.ts', 'grilled.ts',
        'seafood.ts', 'desserts.ts'
    ]

    all_inserts = []
    counts = {}

    for filename in files:
        filepath = os.path.join(data_dir, filename)
        if not os.path.exists(filepath):
            print(f"File not found: {filename}")
            continue

        print(f"Processing {filename}...")

        items_raw = extract_items_from_ts(filepath)
        count = 0

        for raw in items_raw:
            item = parse_ts_object(raw)
            if item and 'id' in item:
                insert = generate_insert(item)
                if insert:
                    all_inserts.append(insert)
                    count += 1

        counts[filename] = count
        print(f"  Extracted {count} items")

    # Write output file
    output_file = os.path.join(scripts_dir, '03-thai-data.sql')
    with open(output_file, 'w') as f:
        f.write("-- ============================================\n")
        f.write("-- THAI DATA IMPORT\n")
        f.write("-- ============================================\n")
        f.write(f"-- Total: {len(all_inserts)} Thai dishes\n")
        for filename, count in counts.items():
            f.write(f"-- {filename}: {count}\n")
        f.write("-- ============================================\n\n")

        f.write("BEGIN;\n\n")

        for insert in all_inserts:
            f.write(insert)
            f.write("\n\n")

        f.write("COMMIT;\n\n")
        f.write("-- Verify\n")
        f.write("SELECT category, COUNT(*) as count FROM thai GROUP BY category ORDER BY count DESC;\n")
        f.write("SELECT COUNT(*) as total_thai_dishes FROM thai;\n")

    print(f"\nGenerated {output_file}")
    print(f"Total Thai dishes: {len(all_inserts)}")

if __name__ == '__main__':
    main()
