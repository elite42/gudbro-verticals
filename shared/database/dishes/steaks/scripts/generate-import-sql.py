#!/usr/bin/env python3
"""
Generate SQL import statements for steaks database from TypeScript files.
"""

import re
import os
from pathlib import Path

def parse_ts_array(content: str) -> list:
    """Extract steak objects from TypeScript array."""
    steaks = []

    # Find all object blocks
    pattern = r'\{\s*id:\s*[\'"]([^"\']+)[\'"].*?popularity:\s*(\d+).*?price_level:\s*[\'"]([^"\']+)[\'"].*?\}'

    # More detailed parsing
    obj_pattern = re.compile(
        r'\{\s*'
        r'id:\s*[\'"]([^"\']+)[\'"],\s*'
        r'slug:\s*[\'"]([^"\']+)[\'"],\s*'
        r'name:\s*[\'"]([^"\']+)[\'"],\s*'
        r'description:\s*[\'"]([^"\']+)[\'"],\s*'
        r'category:\s*[\'"]([^"\']+)[\'"],\s*'
        r'style:\s*[\'"]([^"\']+)[\'"],\s*'
        r'status:\s*[\'"]([^"\']+)[\'"]',
        re.DOTALL
    )

    # Split content into individual steak blocks
    blocks = re.split(r'\n  \{', content)

    for block in blocks[1:]:  # Skip first empty block
        block = '{' + block

        # Extract all fields
        steak = {}

        # Basic fields
        for field in ['id', 'slug', 'name', 'description', 'category', 'style', 'status']:
            match = re.search(rf"{field}:\s*['\"]([^'\"]+)['\"]", block)
            if match:
                steak[field] = match.group(1)

        # cut_info
        cut_match = re.search(r"cut_info:\s*\{([^}]+)\}", block)
        if cut_match:
            cut_block = cut_match.group(1)
            cut = re.search(r"cut:\s*['\"]([^'\"]+)['\"]", cut_block)
            weight = re.search(r"weight_g:\s*(\d+)", cut_block)
            bone_in = re.search(r"bone_in:\s*(true|false)", cut_block)
            thickness = re.search(r"thickness_cm:\s*([\d.]+)", cut_block)
            grade = re.search(r"grade:\s*['\"]([^'\"]+)['\"]", cut_block)
            aging = re.search(r"aging_days:\s*(\d+)", cut_block)

            steak['cut'] = cut.group(1) if cut else 'other'
            steak['weight_g'] = int(weight.group(1)) if weight else None
            steak['bone_in'] = bone_in.group(1) == 'true' if bone_in else False
            steak['thickness_cm'] = float(thickness.group(1)) if thickness else None
            steak['grade'] = grade.group(1) if grade else None
            steak['aging_days'] = int(aging.group(1)) if aging else None

        # cooking
        cooking_match = re.search(r"cooking:\s*\{([^}]+)\}", block)
        if cooking_match:
            cooking_block = cooking_match.group(1)
            method = re.search(r"method:\s*['\"]([^'\"]+)['\"]", cooking_block)
            doneness = re.search(r"recommended_doneness:\s*['\"]([^'\"]+)['\"]", cooking_block)
            resting = re.search(r"resting_time_min:\s*(\d+)", cooking_block)
            temp = re.search(r"internal_temp_c:\s*(\d+)", cooking_block)

            steak['cooking_method'] = method.group(1) if method else 'grilled'
            steak['recommended_doneness'] = doneness.group(1) if doneness else None
            steak['resting_time_min'] = int(resting.group(1)) if resting else None
            steak['internal_temp_c'] = int(temp.group(1)) if temp else None

        # Arrays
        for arr_field in ['seasoning', 'sauces', 'recommended_sides', 'wine_pairing', 'tags', 'allergens', 'ingredient_ids']:
            match = re.search(rf"{arr_field}:\s*\[([^\]]*)\]", block)
            if match:
                items = re.findall(r"['\"]([^'\"]+)['\"]", match.group(1))
                steak[arr_field] = items
            else:
                steak[arr_field] = []

        # Booleans
        for bool_field in ['is_spicy', 'includes_sides']:
            match = re.search(rf"{bool_field}:\s*(true|false)", block)
            steak[bool_field] = match.group(1) == 'true' if match else False

        # Spice level
        spice_match = re.search(r"spice_level:\s*(\d+)", block)
        steak['spice_level'] = int(spice_match.group(1)) if spice_match else 0

        # Origin
        origin_match = re.search(r"origin:\s*\{([^}]+)\}", block)
        if origin_match:
            origin_block = origin_match.group(1)
            country = re.search(r"country:\s*['\"]([^'\"]+)['\"]", origin_block)
            code = re.search(r"country_code:\s*['\"]([^'\"]+)['\"]", origin_block)
            region = re.search(r"region:\s*['\"]([^'\"]+)['\"]", origin_block)
            city = re.search(r"city:\s*['\"]([^'\"]+)['\"]", origin_block)

            steak['origin_country'] = country.group(1) if country else None
            steak['origin_country_code'] = code.group(1) if code else None
            steak['origin_region'] = region.group(1) if region else None
            steak['origin_city'] = city.group(1) if city else None

        # History
        history_match = re.search(r"history:\s*['\"]([^'\"]+)['\"]", block)
        steak['history'] = history_match.group(1) if history_match else None

        # Serving
        serving_match = re.search(r"serving:\s*\{([^}]+)\}", block, re.DOTALL)
        if serving_match:
            serving_block = serving_match.group(1)
            portion = re.search(r"portion_size:\s*['\"]([^'\"]+)['\"]", serving_block)
            serves = re.search(r"serves:\s*(\d+)", serving_block)
            sides_inc = re.search(r"includes_sides:\s*(true|false)", serving_block)

            steak['portion_size'] = portion.group(1) if portion else 'regular'
            steak['serves'] = int(serves.group(1)) if serves else 1
            steak['includes_sides'] = sides_inc.group(1) == 'true' if sides_inc else False

        # Dietary
        dietary_match = re.search(r"dietary:\s*\{([^}]+)\}", block, re.DOTALL)
        if dietary_match:
            dietary_block = dietary_match.group(1)
            for d_field in ['is_gluten_free', 'is_dairy_free', 'is_nut_free', 'is_halal', 'is_kosher',
                           'is_low_carb', 'is_keto_friendly', 'is_high_protein']:
                match = re.search(rf"{d_field}:\s*(true|false)", dietary_block)
                steak[d_field] = match.group(1) == 'true' if match else False

            for n_field in ['calories_estimate', 'protein_g', 'carbs_g', 'fat_g']:
                match = re.search(rf"{n_field}:\s*(\d+)", dietary_block)
                steak[n_field] = int(match.group(1)) if match else None

        # Metadata
        pop_match = re.search(r"popularity:\s*(\d+)", block)
        steak['popularity'] = int(pop_match.group(1)) if pop_match else 3

        price_match = re.search(r"price_level:\s*['\"]([^'\"]+)['\"]", block)
        steak['price_level'] = price_match.group(1) if price_match else 'medium'

        if 'id' in steak:
            steaks.append(steak)

    return steaks


def escape_sql(value):
    """Escape single quotes for SQL."""
    if value is None:
        return 'NULL'
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, list):
        if not value:
            return "ARRAY[]::TEXT[]"
        escaped = [str(v).replace("'", "''") for v in value]
        return "ARRAY[" + ", ".join(f"'{e}'" for e in escaped) + "]"
    return f"'{str(value).replace(chr(39), chr(39)+chr(39))}'"


def generate_insert(steak: dict) -> str:
    """Generate INSERT statement for a steak."""
    columns = [
        'id', 'slug', 'name', 'description', 'category', 'style', 'status',
        'cut', 'weight_g', 'thickness_cm', 'bone_in', 'grade', 'aging_days',
        'cooking_method', 'recommended_doneness', 'resting_time_min', 'internal_temp_c',
        'seasoning', 'sauces', 'is_spicy', 'spice_level',
        'origin_country', 'origin_country_code', 'origin_region', 'origin_city', 'history',
        'portion_size', 'serves', 'includes_sides', 'recommended_sides', 'wine_pairing',
        'is_gluten_free', 'is_dairy_free', 'is_nut_free', 'is_halal', 'is_kosher',
        'is_low_carb', 'is_keto_friendly', 'is_high_protein', 'allergens',
        'calories_estimate', 'protein_g', 'carbs_g', 'fat_g',
        'ingredient_ids', 'tags', 'popularity', 'price_level'
    ]

    values = []
    for col in columns:
        val = steak.get(col)
        values.append(escape_sql(val))

    return f"INSERT INTO steaks ({', '.join(columns)}) VALUES ({', '.join(values)});"


def main():
    base_path = Path(__file__).parent.parent / 'data'
    output_path = Path(__file__).parent / 'steaks-import.sql'

    ts_files = [
        'beef-steaks.ts',
        'italian-grills.ts',
        'south-american-grills.ts',
        'asian-grills.ts',
        'lamb-game.ts',
        'ribs-bbq.ts',
        'middle-eastern-grills.ts',
        'european-grills.ts',
        'poultry-grills.ts'
    ]

    all_steaks = []

    for ts_file in ts_files:
        file_path = base_path / ts_file
        if file_path.exists():
            print(f"Processing {ts_file}...")
            content = file_path.read_text()
            steaks = parse_ts_array(content)
            all_steaks.extend(steaks)
            print(f"  Found {len(steaks)} steaks")

    print(f"\nTotal steaks: {len(all_steaks)}")

    # Generate SQL
    sql_lines = [
        "-- GUDBRO Steaks & Grills Database Import",
        f"-- Generated: {Path(__file__).name}",
        f"-- Total records: {len(all_steaks)}",
        "",
        "BEGIN;",
        ""
    ]

    for steak in all_steaks:
        sql_lines.append(generate_insert(steak))

    sql_lines.extend([
        "",
        "COMMIT;",
        "",
        f"-- Imported {len(all_steaks)} steaks"
    ])

    output_path.write_text('\n'.join(sql_lines))
    print(f"\nSQL written to: {output_path}")


if __name__ == '__main__':
    main()
