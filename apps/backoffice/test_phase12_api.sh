#!/bin/bash

# AI Inventory & Negotiation API Test (Phase 12)
# Credentials
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW9uZWJidWV6cnp2amVrcXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTQwNDksImV4cCI6MjA3OTkzMDA0OX0.j0IQeyHsNWNqpw4CYsxGIcLapQ9Rl5YkXn5KTpvZM84"
URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"

echo "====================================="
echo "Phase 12 API Test - AI Inventory & Negotiation"
echo "====================================="
echo ""

# 1. Check ai_suppliers table
echo "1. Checking ai_suppliers table..."
curl -s -X GET "$URL/ai_suppliers?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | jq '.'
echo ""

# 2. Check ai_inventory_items table
echo "2. Checking ai_inventory_items table..."
curl -s -X GET "$URL/ai_inventory_items?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | jq '.'
echo ""

# 3. Check ai_stock_movements table
echo "3. Checking ai_stock_movements table..."
curl -s -X GET "$URL/ai_stock_movements?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | jq '.'
echo ""

# 4. Check ai_stock_alerts table
echo "4. Checking ai_stock_alerts table..."
curl -s -X GET "$URL/ai_stock_alerts?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | jq '.'
echo ""

# 5. Check ai_purchase_orders table
echo "5. Checking ai_purchase_orders table..."
curl -s -X GET "$URL/ai_purchase_orders?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | jq '.'
echo ""

# 6. Check ai_negotiation_drafts table
echo "6. Checking ai_negotiation_drafts table..."
curl -s -X GET "$URL/ai_negotiation_drafts?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | jq '.'
echo ""

# 7. Try INSERT into ai_suppliers
echo "7. Testing INSERT into ai_suppliers..."
curl -s -X POST "$URL/ai_suppliers" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "name": "Test Supplier Co.",
    "contact_email": "test@supplier.com",
    "contact_phone": "+1-555-0100",
    "address": "123 Test St, Test City",
    "rating": 4.5,
    "payment_terms": "Net 30",
    "is_active": true
  }' | jq '.'
echo ""

# 8. Try SELECT from ai_inventory_items
echo "8. Testing SELECT from ai_inventory_items..."
curl -s -X GET "$URL/ai_inventory_items?limit=5" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | jq '.'
echo ""

# Get counts for all tables
echo "====================================="
echo "Table Record Counts:"
echo "====================================="

echo -n "ai_suppliers: "
curl -s -X GET "$URL/ai_suppliers?select=count" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Prefer: count=exact" -I | grep -i "content-range" | awk -F'/' '{print $2}'

echo -n "ai_inventory_items: "
curl -s -X GET "$URL/ai_inventory_items?select=count" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Prefer: count=exact" -I | grep -i "content-range" | awk -F'/' '{print $2}'

echo -n "ai_stock_movements: "
curl -s -X GET "$URL/ai_stock_movements?select=count" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Prefer: count=exact" -I | grep -i "content-range" | awk -F'/' '{print $2}'

echo -n "ai_stock_alerts: "
curl -s -X GET "$URL/ai_stock_alerts?select=count" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Prefer: count=exact" -I | grep -i "content-range" | awk -F'/' '{print $2}'

echo -n "ai_purchase_orders: "
curl -s -X GET "$URL/ai_purchase_orders?select=count" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Prefer: count=exact" -I | grep -i "content-range" | awk -F'/' '{print $2}'

echo -n "ai_negotiation_drafts: "
curl -s -X GET "$URL/ai_negotiation_drafts?select=count" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Prefer: count=exact" -I | grep -i "content-range" | awk -F'/' '{print $2}'

echo ""
echo "====================================="
echo "Test Complete"
echo "====================================="
