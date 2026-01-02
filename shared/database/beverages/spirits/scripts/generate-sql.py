#!/usr/bin/env python3
"""
Generates SQL INSERT statements for spirits from TypeScript data files.
Reads the .ts files and outputs SQL that can be pasted into Supabase SQL Editor.
"""

import re
import json
import os

def extract_spirits_from_ts(file_path):
    """Extract spirit objects from a TypeScript file."""
    with open(file_path, 'r') as f:
        content = f.read()

    # Find all objects in the array
    spirits = []

    # Pattern to match each spirit object
    pattern = r'\{\s*id:\s*[\'"]([^"\']+)[\'"].*?ingredient_ids:\s*\[[^\]]*\]\s*\}'

    # Use a different approach - find each object block
    in_array = False
    current_obj = ""
    brace_count = 0

    for line in content.split('\n'):
        if 'SpiritItem[] = [' in line:
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
                        spirits.append(current_obj)
                        current_obj = ""
                elif brace_count > 0:
                    current_obj += char

            if brace_count > 0:
                current_obj += '\n'

    return spirits

def parse_ts_object(ts_obj):
    """Parse a TypeScript object string into a dictionary."""
    # Clean up the object
    obj = ts_obj.strip()

    result = {}

    # Extract each field using regex patterns
    patterns = {
        'id': r"id:\s*['\"]([^'\"]+)['\"]",
        'slug': r"slug:\s*['\"]([^'\"]+)['\"]",
        'name': r"name:\s*['\"]([^'\"]+)['\"]",
        'brand': r"brand:\s*['\"]([^'\"]+)['\"]",
        'description': r"description:\s*['\"](.+?)['\"],?\s*\n\s*(?:category|$)",
        'category': r"category:\s*['\"]([^'\"]+)['\"]",
        'subcategory': r"subcategory:\s*['\"]([^'\"]+)['\"]",
        'status': r"status:\s*['\"]([^'\"]+)['\"]",
        'country': r"country:\s*['\"]([^'\"]+)['\"]",
        'region': r"region:\s*['\"]([^'\"]+)['\"]",
        'distillery': r"distillery:\s*['\"]([^'\"]+)['\"]",
        'abv': r"abv:\s*(\d+(?:\.\d+)?)",
        'age_years': r"age_years:\s*(\d+)",
        'age_statement': r"age_statement:\s*['\"]([^'\"]+)['\"]",
        'volume_ml': r"volume_ml:\s*(\d+)",
        'base_ingredient': r"base_ingredient:\s*['\"]([^'\"]+)['\"]",
        'production_method': r"production_method:\s*['\"]([^'\"]+)['\"]",
        'cask_type': r"cask_type:\s*['\"]([^'\"]+)['\"]",
        'tasting_notes': r"tasting_notes:\s*['\"]([^'\"]+)['\"]",
        'color': r"color:\s*['\"]([^'\"]+)['\"]",
        'nose': r"nose:\s*['\"]([^'\"]+)['\"]",
        'palate': r"palate:\s*['\"]([^'\"]+)['\"]",
        'finish': r"finish:\s*['\"]([^'\"]+)['\"]",
        'optimal_temperature': r"optimal_temperature:\s*['\"]([^'\"]+)['\"]",
        'is_gluten_free': r"is_gluten_free:\s*(true|false)",
        'is_vegan': r"is_vegan:\s*(true|false)",
        'is_organic': r"is_organic:\s*(true|false)",
        'is_kosher': r"is_kosher:\s*(true|false)",
        'price_tier': r"price_tier:\s*['\"]([^'\"]+)['\"]",
        'popularity': r"popularity:\s*(\d+)",
        'year_established': r"year_established:\s*(\d+)",
    }

    for field, pattern in patterns.items():
        match = re.search(pattern, obj, re.DOTALL)
        if match:
            result[field] = match.group(1)

    # Handle arrays
    array_patterns = {
        'flavor_profiles': r"flavor_profiles:\s*\[([^\]]*)\]",
        'serving_suggestions': r"serving_suggestions:\s*\[([^\]]*)\]",
        'cocktail_uses': r"cocktail_uses:\s*\[([^\]]*)\]",
        'food_pairings': r"food_pairings:\s*\[([^\]]*)\]",
        'allergens': r"allergens:\s*\[([^\]]*)\]",
        'tags': r"tags:\s*\[([^\]]*)\]",
        'awards': r"awards:\s*\[([^\]]*)\]",
        'ingredient_ids': r"ingredient_ids:\s*\[([^\]]*)\]",
    }

    for field, pattern in array_patterns.items():
        match = re.search(pattern, obj, re.DOTALL)
        if match:
            array_content = match.group(1)
            # Extract quoted strings
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

def generate_insert(spirit):
    """Generate SQL INSERT statement for a spirit."""

    # Required fields
    required = ['id', 'slug', 'name', 'brand', 'description', 'category',
                'subcategory', 'status', 'country', 'region', 'abv',
                'base_ingredient', 'price_tier', 'popularity']

    for field in required:
        if field not in spirit:
            print(f"Missing required field: {field} in {spirit.get('id', 'unknown')}")
            return None

    # Build the INSERT statement
    sql = f"""INSERT INTO spirits (
  id, slug, name, brand, description,
  category, subcategory, status, country, region, distillery,
  abv, age_years, age_statement, volume_ml,
  base_ingredient, production_method, cask_type,
  flavor_profiles, tasting_notes, color, nose, palate, finish,
  serving_suggestions, cocktail_uses, food_pairings, optimal_temperature,
  allergens, is_gluten_free, is_vegan, is_organic, is_kosher,
  price_tier, tags, popularity, awards, year_established, ingredient_ids
) VALUES (
  '{escape_sql(spirit['id'])}',
  '{escape_sql(spirit['slug'])}',
  '{escape_sql(spirit['name'])}',
  '{escape_sql(spirit['brand'])}',
  '{escape_sql(spirit['description'])}',
  '{escape_sql(spirit['category'])}',
  '{escape_sql(spirit['subcategory'])}',
  '{escape_sql(spirit['status'])}',
  '{escape_sql(spirit['country'])}',
  '{escape_sql(spirit['region'])}',
  {f"'{escape_sql(spirit['distillery'])}'" if spirit.get('distillery') else 'NULL'},
  {spirit['abv']},
  {spirit.get('age_years', 'NULL')},
  {f"'{escape_sql(spirit['age_statement'])}'" if spirit.get('age_statement') else 'NULL'},
  {spirit.get('volume_ml', 700)},
  '{escape_sql(spirit['base_ingredient'])}',
  {f"'{escape_sql(spirit['production_method'])}'" if spirit.get('production_method') else 'NULL'},
  {f"'{escape_sql(spirit['cask_type'])}'" if spirit.get('cask_type') else 'NULL'},
  {format_array(spirit.get('flavor_profiles', []))},
  {f"'{escape_sql(spirit['tasting_notes'])}'" if spirit.get('tasting_notes') else 'NULL'},
  {f"'{escape_sql(spirit['color'])}'" if spirit.get('color') else 'NULL'},
  {f"'{escape_sql(spirit['nose'])}'" if spirit.get('nose') else 'NULL'},
  {f"'{escape_sql(spirit['palate'])}'" if spirit.get('palate') else 'NULL'},
  {f"'{escape_sql(spirit['finish'])}'" if spirit.get('finish') else 'NULL'},
  {format_array(spirit.get('serving_suggestions', []))},
  {format_array(spirit.get('cocktail_uses', []))},
  {format_array(spirit.get('food_pairings', []))},
  {f"'{escape_sql(spirit['optimal_temperature'])}'" if spirit.get('optimal_temperature') else 'NULL'},
  {format_array(spirit.get('allergens', []))},
  {spirit.get('is_gluten_free', 'true')},
  {spirit.get('is_vegan', 'true')},
  {spirit.get('is_organic', 'false')},
  {spirit.get('is_kosher', 'false')},
  '{escape_sql(spirit['price_tier'])}',
  {format_array(spirit.get('tags', []))},
  {spirit['popularity']},
  {format_array(spirit.get('awards', []))},
  {spirit.get('year_established', 'NULL')},
  {format_array(spirit.get('ingredient_ids', []))}
);"""

    return sql

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    scripts_dir = os.path.join(base_dir, 'scripts')

    files = ['whisky.ts', 'gin.ts', 'rum.ts', 'amari-liqueurs.ts', 'vodka.ts', 'tequila-mezcal.ts', 'brandy-cognac.ts', 'rare-premium.ts']

    all_inserts = []
    counts = {}

    for filename in files:
        filepath = os.path.join(data_dir, filename)
        print(f"Processing {filename}...")

        spirits_raw = extract_spirits_from_ts(filepath)
        count = 0

        for raw in spirits_raw:
            spirit = parse_ts_object(raw)
            if spirit and 'id' in spirit:
                insert = generate_insert(spirit)
                if insert:
                    all_inserts.append(insert)
                    count += 1

        counts[filename] = count
        print(f"  Extracted {count} spirits")

    # Write output file
    output_file = os.path.join(scripts_dir, '02-spirits-data.sql')
    with open(output_file, 'w') as f:
        f.write("-- ============================================\n")
        f.write("-- SPIRITS DATA IMPORT\n")
        f.write("-- ============================================\n")
        f.write(f"-- Total: {len(all_inserts)} spirits\n")
        for filename, count in counts.items():
            f.write(f"-- {filename}: {count}\n")
        f.write("-- ============================================\n\n")

        f.write("BEGIN;\n\n")

        for insert in all_inserts:
            f.write(insert)
            f.write("\n\n")

        f.write("COMMIT;\n")

    print(f"\nGenerated {output_file}")
    print(f"Total spirits: {len(all_inserts)}")

if __name__ == '__main__':
    main()
