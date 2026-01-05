#!/bin/bash

# AI Inventory & Negotiation API Test Script
# Tests all 8 endpoints from Phase 12

# Configuration
API_URL="http://localhost:3023/api/ai/inventory"
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW9uZWJidWV6cnp2amVrcXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTQwNDksImV4cCI6MjA3OTkzMDA0OX0.j0IQeyHsNWNqpw4CYsxGIcLapQ9Rl5YkXn5KTpvZM84"
SUPABASE_URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
PASSED=0
FAILED=0

echo "========================================"
echo "AI Inventory & Negotiation API Tests"
echo "========================================"
echo ""

# Helper functions
print_test() {
    echo -e "${BLUE}TEST $1:${NC} $2"
}

print_success() {
    echo -e "${GREEN}✓ PASS${NC} - $1"
    ((PASSED++))
}

print_error() {
    echo -e "${RED}✗ FAIL${NC} - $1"
    echo -e "${RED}       Error: $2${NC}"
    ((FAILED++))
}

print_response() {
    echo -e "${YELLOW}Response:${NC}"
    echo "$1" | jq '.' 2>/dev/null || echo "$1"
    echo ""
}

# Step 1: Get or create a test merchant
print_test "0" "Get or create test merchant"
MERCHANT_RESPONSE=$(curl -s "$SUPABASE_URL/merchants?select=id,name&limit=1" -H "apikey: $KEY")
MERCHANT_ID=$(echo "$MERCHANT_RESPONSE" | jq -r '.[0].id' 2>/dev/null)

if [ "$MERCHANT_ID" = "null" ] || [ -z "$MERCHANT_ID" ]; then
    echo "No merchants found. Creating test merchant..."
    CREATE_MERCHANT=$(curl -s -X POST "$SUPABASE_URL/merchants" \
        -H "apikey: $KEY" \
        -H "Content-Type: application/json" \
        -H "Prefer: return=representation" \
        -d '{"name":"Test Restaurant","email":"test@restaurant.com","phone":"555-0100"}')

    MERCHANT_ID=$(echo "$CREATE_MERCHANT" | jq -r '.[0].id' 2>/dev/null)

    if [ "$MERCHANT_ID" = "null" ] || [ -z "$MERCHANT_ID" ]; then
        # If creation fails, use a test UUID
        MERCHANT_ID="00000000-0000-0000-0000-000000000001"
        echo "Using fallback test merchant ID: $MERCHANT_ID"
    else
        echo "Created merchant: $MERCHANT_ID"
    fi
else
    echo "Using existing merchant: $MERCHANT_ID"
fi
echo ""

# Test 1: GET /api/ai/inventory?merchantId=XXX
print_test "1" "GET /api/ai/inventory?merchantId=$MERCHANT_ID"
RESPONSE=$(curl -s "$API_URL?merchantId=$MERCHANT_ID")
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL?merchantId=$MERCHANT_ID")

if [ "$HTTP_CODE" = "200" ]; then
    if echo "$RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
        print_success "GET inventory data (HTTP $HTTP_CODE)"
    else
        print_error "GET inventory data" "Response missing 'success' field"
    fi
else
    print_error "GET inventory data" "HTTP $HTTP_CODE"
fi
print_response "$RESPONSE"

# Test 2: GET /api/ai/inventory?merchantId=XXX&analyze=true
print_test "2" "GET /api/ai/inventory?merchantId=$MERCHANT_ID&analyze=true"
RESPONSE=$(curl -s "$API_URL?merchantId=$MERCHANT_ID&analyze=true")
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL?merchantId=$MERCHANT_ID&analyze=true")

if [ "$HTTP_CODE" = "200" ]; then
    if echo "$RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
        print_success "GET inventory analysis (HTTP $HTTP_CODE)"
    else
        print_error "GET inventory analysis" "Response missing 'success' field"
    fi
else
    print_error "GET inventory analysis" "HTTP $HTTP_CODE"
fi
print_response "$RESPONSE"

# Test 3: POST add_supplier
print_test "3" "POST /api/ai/inventory - action=add_supplier"
RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"add_supplier\",\"name\":\"Fresh Foods Co\",\"categories\":[\"Vegetables\",\"Fruits\"],\"email\":\"contact@freshfoods.com\",\"phone\":\"555-1234\"}")
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"add_supplier\",\"name\":\"Fresh Foods Co\",\"categories\":[\"Vegetables\",\"Fruits\"]}")

if [ "$HTTP_CODE" = "200" ]; then
    SUPPLIER_ID=$(echo "$RESPONSE" | jq -r '.supplier.id' 2>/dev/null)
    if [ "$SUPPLIER_ID" != "null" ] && [ -n "$SUPPLIER_ID" ]; then
        print_success "POST add_supplier (HTTP $HTTP_CODE) - Supplier ID: $SUPPLIER_ID"
    else
        print_error "POST add_supplier" "Response missing supplier.id"
    fi
else
    print_error "POST add_supplier" "HTTP $HTTP_CODE"
fi
print_response "$RESPONSE"

# Test 4: POST add_item
print_test "4" "POST /api/ai/inventory - action=add_item"
RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"add_item\",\"name\":\"Olive Oil\",\"category\":\"Cooking Oil\",\"unit\":\"liters\",\"currentStock\":10,\"minStock\":5,\"maxStock\":50}")
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"add_item\",\"name\":\"Olive Oil\",\"category\":\"Cooking Oil\",\"unit\":\"liters\"}")

if [ "$HTTP_CODE" = "200" ]; then
    ITEM_ID=$(echo "$RESPONSE" | jq -r '.item.id' 2>/dev/null)
    if [ "$ITEM_ID" != "null" ] && [ -n "$ITEM_ID" ]; then
        print_success "POST add_item (HTTP $HTTP_CODE) - Item ID: $ITEM_ID"
    else
        print_error "POST add_item" "Response missing item.id"
    fi
else
    print_error "POST add_item" "HTTP $HTTP_CODE"
fi
print_response "$RESPONSE"

# Test 5: POST update_stock (using item from previous test or a test UUID)
print_test "5" "POST /api/ai/inventory - action=update_stock"
if [ "$ITEM_ID" != "null" ] && [ -n "$ITEM_ID" ]; then
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"update_stock\",\"itemId\":\"$ITEM_ID\",\"adjustment\":-5,\"reason\":\"Daily usage\"}")
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"update_stock\",\"itemId\":\"$ITEM_ID\",\"adjustment\":-5}")

    if [ "$HTTP_CODE" = "200" ]; then
        if echo "$RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
            print_success "POST update_stock (HTTP $HTTP_CODE)"
        else
            print_error "POST update_stock" "Response missing 'success' field"
        fi
    else
        print_error "POST update_stock" "HTTP $HTTP_CODE"
    fi
else
    # Try with a test UUID anyway
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"update_stock\",\"itemId\":\"00000000-0000-0000-0000-000000000001\",\"adjustment\":-5,\"reason\":\"Test\"}")
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"update_stock\",\"itemId\":\"00000000-0000-0000-0000-000000000001\",\"adjustment\":-5}")

    if [ "$HTTP_CODE" = "200" ]; then
        print_success "POST update_stock (HTTP $HTTP_CODE)"
    else
        print_error "POST update_stock" "HTTP $HTTP_CODE (expected to fail - no item found)"
    fi
fi
print_response "$RESPONSE"

# Test 6: POST find_suppliers
print_test "6" "POST /api/ai/inventory - action=find_suppliers"
RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"find_suppliers\",\"category\":\"Coffee Beans\",\"location\":\"New York\"}")
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"find_suppliers\",\"category\":\"Coffee Beans\"}")

if [ "$HTTP_CODE" = "200" ]; then
    if echo "$RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
        SUPPLIERS_COUNT=$(echo "$RESPONSE" | jq -r '.suppliers | length' 2>/dev/null)
        print_success "POST find_suppliers (HTTP $HTTP_CODE) - Found $SUPPLIERS_COUNT suppliers"
    else
        print_error "POST find_suppliers" "Response missing 'success' field"
    fi
else
    print_error "POST find_suppliers" "HTTP $HTTP_CODE"
fi
print_response "$RESPONSE"

# Test 7: POST purchase_order
print_test "7" "POST /api/ai/inventory - action=purchase_order"
if [ "$SUPPLIER_ID" != "null" ] && [ -n "$SUPPLIER_ID" ] && [ "$ITEM_ID" != "null" ] && [ -n "$ITEM_ID" ]; then
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"purchase_order\",\"supplierId\":\"$SUPPLIER_ID\",\"itemIds\":[\"$ITEM_ID\"]}")
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"purchase_order\",\"supplierId\":\"$SUPPLIER_ID\",\"itemIds\":[\"$ITEM_ID\"]}")

    if [ "$HTTP_CODE" = "200" ]; then
        ORDER_ID=$(echo "$RESPONSE" | jq -r '.order.id' 2>/dev/null)
        if [ "$ORDER_ID" != "null" ] && [ -n "$ORDER_ID" ]; then
            print_success "POST purchase_order (HTTP $HTTP_CODE) - Order ID: $ORDER_ID"
        else
            print_error "POST purchase_order" "Response missing order.id"
        fi
    else
        print_error "POST purchase_order" "HTTP $HTTP_CODE"
    fi
else
    # Try with test UUIDs
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"purchase_order\",\"supplierId\":\"00000000-0000-0000-0000-000000000001\",\"itemIds\":[\"00000000-0000-0000-0000-000000000002\"]}")
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"purchase_order\",\"supplierId\":\"00000000-0000-0000-0000-000000000001\",\"itemIds\":[\"00000000-0000-0000-0000-000000000002\"]}")

    if [ "$HTTP_CODE" = "200" ]; then
        print_success "POST purchase_order (HTTP $HTTP_CODE)"
    else
        print_error "POST purchase_order" "HTTP $HTTP_CODE (expected to fail - no supplier/items found)"
    fi
fi
print_response "$RESPONSE"

# Test 8: POST negotiate
print_test "8" "POST /api/ai/inventory - action=negotiate"
if [ "$SUPPLIER_ID" != "null" ] && [ -n "$SUPPLIER_ID" ]; then
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"negotiate\",\"supplierId\":\"$SUPPLIER_ID\",\"type\":\"price_reduction\",\"context\":{\"currentSpend\":5000,\"desiredDiscount\":10}}")
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"negotiate\",\"supplierId\":\"$SUPPLIER_ID\",\"type\":\"price_reduction\"}")

    if [ "$HTTP_CODE" = "200" ]; then
        DRAFT_ID=$(echo "$RESPONSE" | jq -r '.draft.id' 2>/dev/null)
        if [ "$DRAFT_ID" != "null" ] && [ -n "$DRAFT_ID" ]; then
            print_success "POST negotiate (HTTP $HTTP_CODE) - Draft ID: $DRAFT_ID"
        else
            print_error "POST negotiate" "Response missing draft.id"
        fi
    else
        print_error "POST negotiate" "HTTP $HTTP_CODE"
    fi
else
    # Try with test UUID
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"negotiate\",\"supplierId\":\"00000000-0000-0000-0000-000000000001\",\"type\":\"price_reduction\"}")
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"merchantId\":\"$MERCHANT_ID\",\"action\":\"negotiate\",\"supplierId\":\"00000000-0000-0000-0000-000000000001\",\"type\":\"price_reduction\"}")

    if [ "$HTTP_CODE" = "200" ]; then
        print_success "POST negotiate (HTTP $HTTP_CODE)"
    else
        print_error "POST negotiate" "HTTP $HTTP_CODE (expected to fail - no supplier found)"
    fi
fi
print_response "$RESPONSE"

# Summary
echo "========================================"
echo "TEST SUMMARY"
echo "========================================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed.${NC}"
    exit 1
fi
