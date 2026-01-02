#!/usr/bin/env python3
"""
Import steaks to Supabase using REST API.
Since we can't run raw SQL via REST API, we create the table using
a simplified structure without custom ENUMs.
"""

import json
import re
import requests
from pathlib import Path

# Supabase config
SUPABASE_URL = "https://vnaonebbuezrzvjekqxs.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW9uZWJidWV6cnp2amVrcXhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM1NDA0OSwiZXhwIjoyMDc5OTMwMDQ5fQ.tVvhJiYaSTYoKRPXDCV6Q2-jr5w2oMM-oOJ_VxtlgPI"

headers = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}


def parse_ts_file(filepath):
    """Parse a TypeScript file and extract steak objects."""
    content = filepath.read_text()
    steaks = []

    # Split by object start pattern
    blocks = re.split(r'\n  \{', content)

    for block in blocks[1:]:
        block = '{' + block
        steak = {}

        # Extract string fields
        for field in ['id', 'slug', 'name', 'description', 'category', 'style', 'status', 'history']:
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
        steak['is_spicy'] = bool(re.search(r"is_spicy:\s*true", block))
        steak['includes_sides'] = bool(re.search(r"includes_sides:\s*true", block))

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

        # Serving
        serving_match = re.search(r"serving:\s*\{([^}]+)\}", block, re.DOTALL)
        if serving_match:
            serving_block = serving_match.group(1)
            portion = re.search(r"portion_size:\s*['\"]([^'\"]+)['\"]", serving_block)
            serves = re.search(r"serves:\s*(\d+)", serving_block)

            steak['portion_size'] = portion.group(1) if portion else 'regular'
            steak['serves'] = int(serves.group(1)) if serves else 1

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


def insert_steaks(steaks):
    """Insert steaks via REST API."""
    url = f"{SUPABASE_URL}/rest/v1/steaks"

    # Insert in batches
    batch_size = 10
    total = len(steaks)
    inserted = 0

    for i in range(0, total, batch_size):
        batch = steaks[i:i+batch_size]
        response = requests.post(url, headers=headers, json=batch)

        if response.status_code in [200, 201]:
            inserted += len(batch)
            print(f"Inserted {inserted}/{total} steaks")
        else:
            print(f"Error inserting batch: {response.status_code}")
            print(response.text)
            # Try one by one for debugging
            for steak in batch:
                single_response = requests.post(url, headers=headers, json=[steak])
                if single_response.status_code in [200, 201]:
                    inserted += 1
                else:
                    print(f"  Failed: {steak['id']} - {single_response.text}")

    return inserted


def main():
    base_path = Path(__file__).parent.parent / 'data'

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
            print(f"Parsing {ts_file}...")
            steaks = parse_ts_file(file_path)
            all_steaks.extend(steaks)
            print(f"  Found {len(steaks)} steaks")

    print(f"\nTotal steaks to import: {len(all_steaks)}")

    # Check if table exists first
    check_url = f"{SUPABASE_URL}/rest/v1/steaks?select=id&limit=1"
    check_response = requests.get(check_url, headers=headers)

    if check_response.status_code == 404 or 'PGRST' in check_response.text:
        print("\n⚠️  Table 'steaks' does not exist!")
        print("Please create the table first using the SQL schema in Supabase Dashboard:")
        print("  File: schema/create-steaks-table.sql")
        return

    print("\nInserting steaks...")
    inserted = insert_steaks(all_steaks)
    print(f"\n✅ Successfully inserted {inserted} steaks")


if __name__ == '__main__':
    main()
