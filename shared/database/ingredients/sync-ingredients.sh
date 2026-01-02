#!/bin/bash
# ============================================
# SYNC INGREDIENTS FROM SUPABASE
# ============================================
# Run this script after adding new ingredients
# to keep the local cache updated
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_FILE="$SCRIPT_DIR/master-ingredients-cache.ts"
TEMP_FILE="/tmp/ingredients_sync.json"

# Load credentials
if [ -f "$SCRIPT_DIR/../../config/supabase.env" ]; then
  source "$SCRIPT_DIR/../../config/supabase.env"
else
  echo "Error: supabase.env not found"
  exit 1
fi

API_KEY="${SERVICE_ROLE_KEY:-$SUPABASE_SERVICE_ROLE_KEY}"
BASE_URL="${SUPABASE_URL}/rest/v1"

echo "🔄 Syncing ingredients from Supabase..."

# Fetch all ingredients (handling pagination)
echo "  Fetching batch 1..."
curl -s "$BASE_URL/ingredients?select=id,name,category&limit=2000" \
  -H "apikey: $API_KEY" \
  -H "Authorization: Bearer $API_KEY" > /tmp/ing_batch1.json

echo "  Fetching batch 2..."
curl -s "$BASE_URL/ingredients?select=id,name,category&offset=1000&limit=2000" \
  -H "apikey: $API_KEY" \
  -H "Authorization: Bearer $API_KEY" > /tmp/ing_batch2.json

# Merge and process with Python
python3 << 'PYTHON_SCRIPT'
import json
from datetime import datetime

# Read batches
with open('/tmp/ing_batch1.json') as f:
    batch1 = json.load(f)
with open('/tmp/ing_batch2.json') as f:
    batch2 = json.load(f)

# Combine and dedupe
all_ingredients = batch1 + batch2
seen = set()
unique = []
for ing in all_ingredients:
    if ing['id'] not in seen:
        seen.add(ing['id'])
        unique.append(ing)

unique.sort(key=lambda x: x['id'])
today = datetime.now().strftime('%Y-%m-%d')

# Generate TypeScript
ts = f'''// ============================================
// MASTER INGREDIENTS LIST - Local Cache
// ============================================
// Last synced: {today}
// Total: {len(unique)} ingredients
//
// HOW TO USE:
// 1. Import this file to check if ingredients exist
// 2. After adding new ingredients to Supabase, run: ./sync-ingredients.sh
// 3. Never manually edit - always sync from database
// ============================================

/**
 * All ingredient IDs currently in Supabase
 * Use this Set for O(1) lookup when creating new databases
 */
export const EXISTING_INGREDIENT_IDS = new Set<string>([
'''

for ing in unique:
    ts += f"  '{ing['id']}',\n"

ts += ''']);

/**
 * Quick lookup function
 */
export function ingredientExists(id: string): boolean {
  return EXISTING_INGREDIENT_IDS.has(id);
}

/**
 * Find missing ingredients from a list
 */
export function findMissingIngredients(ids: string[]): string[] {
  return ids.filter(id => !EXISTING_INGREDIENT_IDS.has(id));
}

/**
 * Total count
 */
export const TOTAL_INGREDIENTS = EXISTING_INGREDIENT_IDS.size;
'''

import os
output_path = os.environ.get('OUTPUT_FILE', '/Users/gianfrancodagostino/Desktop/gudbro-verticals/shared/database/ingredients/master-ingredients-cache.ts')
with open(output_path, 'w') as f:
    f.write(ts)

print(f"✅ Synced {len(unique)} ingredients to local cache")
PYTHON_SCRIPT

# Cleanup
rm -f /tmp/ing_batch1.json /tmp/ing_batch2.json

echo "✅ Done! Cache updated at $OUTPUT_FILE"
