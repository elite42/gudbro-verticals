#!/bin/bash
# Find missing Korean ingredients

# Get Korean ingredients
cat ../data/bbq.ts ../data/rice.ts ../data/stews.ts ../data/noodles.ts ../data/pancakes.ts ../data/chicken.ts ../data/street-food.ts ../data/banchan.ts ../data/desserts.ts 2>/dev/null | grep -o "ING_[A-Z_]*" | sort | uniq > /tmp/korean_ing.txt

# Get existing ingredients
cat ../../ingredients/master-ingredients-cache.ts | grep -o "ING_[A-Z_]*" | sort | uniq > /tmp/existing_ing.txt

echo "=== KOREAN INGREDIENTS ANALYSIS ==="
echo ""
echo "Total Korean ingredients needed: $(wc -l < /tmp/korean_ing.txt)"
echo "Total existing ingredients: $(wc -l < /tmp/existing_ing.txt)"
echo ""
echo "=== MISSING INGREDIENTS ==="
comm -23 /tmp/korean_ing.txt /tmp/existing_ing.txt

echo ""
echo "Total missing: $(comm -23 /tmp/korean_ing.txt /tmp/existing_ing.txt | wc -l)"
