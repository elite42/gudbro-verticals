#!/bin/bash

# AI Social Media API Test Suite (Phase 8)
# Run this script with the server running on http://localhost:3001

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test configuration
API_URL="http://localhost:3001/api/ai/social"
TEST_MERCHANT_ID="00000000-0000-0000-0000-000000000001"

echo "================================================"
echo "AI Social Media API Test Suite"
echo "================================================"
echo ""

# Function to print test result
print_result() {
    local test_name=$1
    local status_code=$2
    local expected_code=$3
    local response=$4

    echo "Test: $test_name"
    echo "Expected: $expected_code | Got: $status_code"

    if [ "$status_code" == "$expected_code" ]; then
        echo -e "${GREEN}✓ PASSED${NC}"
    else
        echo -e "${RED}✗ FAILED${NC}"
    fi

    echo "Response:"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    echo ""
    echo "------------------------------------------------"
    echo ""
}

# Wait for server to be ready
echo "Checking if server is running..."
if ! curl -s -o /dev/null -w "%{http_code}" "$API_URL" | grep -q "400\|405"; then
    echo -e "${RED}Server not running at $API_URL${NC}"
    echo "Please start the server with: npm run dev"
    exit 1
fi
echo -e "${GREEN}Server is running${NC}"
echo ""

# ================================================
# TEST 1: GET Posts (without merchantId - should fail)
# ================================================
echo "Test 1: GET /api/ai/social (missing merchantId)"
response=$(curl -s -w "\n%{http_code}" "$API_URL")
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "GET without merchantId" "$status_code" "400" "$body"

# ================================================
# TEST 2: GET Posts (with merchantId)
# ================================================
echo "Test 2: GET /api/ai/social?merchantId=$TEST_MERCHANT_ID"
response=$(curl -s -w "\n%{http_code}" "$API_URL?merchantId=$TEST_MERCHANT_ID")
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "GET posts" "$status_code" "200" "$body"

# ================================================
# TEST 3: GET Posts with filters
# ================================================
echo "Test 3: GET /api/ai/social?merchantId=$TEST_MERCHANT_ID&status=draft&platform=instagram&limit=10"
response=$(curl -s -w "\n%{http_code}" "$API_URL?merchantId=$TEST_MERCHANT_ID&status=draft&platform=instagram&limit=10")
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "GET posts with filters" "$status_code" "200" "$body"

# ================================================
# TEST 4: GET Calendars
# ================================================
echo "Test 4: GET /api/ai/social?merchantId=$TEST_MERCHANT_ID&type=calendars"
response=$(curl -s -w "\n%{http_code}" "$API_URL?merchantId=$TEST_MERCHANT_ID&type=calendars")
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "GET calendars" "$status_code" "200" "$body"

# ================================================
# TEST 5: POST Generate Post (missing fields)
# ================================================
echo "Test 5: POST /api/ai/social (missing required fields)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$TEST_MERCHANT_ID"'",
    "action": "post"
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST generate post (missing fields)" "$status_code" "400" "$body"

# ================================================
# TEST 6: POST Generate Post (complete)
# ================================================
echo "Test 6: POST /api/ai/social (generate post)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$TEST_MERCHANT_ID"'",
    "action": "post",
    "platform": "instagram",
    "contentType": "promotion",
    "topic": "New seasonal menu launch",
    "style": "professional"
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST generate post" "$status_code" "200" "$body"

# ================================================
# TEST 7: POST Generate Calendar (missing fields)
# ================================================
echo "Test 7: POST /api/ai/social (calendar - missing fields)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$TEST_MERCHANT_ID"'",
    "action": "calendar"
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST generate calendar (missing fields)" "$status_code" "400" "$body"

# ================================================
# TEST 8: POST Generate Calendar (complete)
# ================================================
echo "Test 8: POST /api/ai/social (generate calendar)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$TEST_MERCHANT_ID"'",
    "action": "calendar",
    "weekStart": "2026-01-06",
    "platforms": ["instagram", "facebook"],
    "postsPerWeek": 7,
    "focusAreas": ["menu_highlights", "behind_scenes"]
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST generate calendar" "$status_code" "200" "$body"

# ================================================
# TEST 9: POST Generate Captions (missing fields)
# ================================================
echo "Test 9: POST /api/ai/social (captions - missing fields)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$TEST_MERCHANT_ID"'",
    "action": "captions"
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST generate captions (missing fields)" "$status_code" "400" "$body"

# ================================================
# TEST 10: POST Generate Captions (complete)
# ================================================
echo "Test 10: POST /api/ai/social (generate captions)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$TEST_MERCHANT_ID"'",
    "action": "captions",
    "topic": "Fresh coffee beans arrival",
    "platform": "instagram",
    "numberOfVariations": 5,
    "style": "casual"
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST generate captions" "$status_code" "200" "$body"

# ================================================
# TEST 11: POST Invalid action
# ================================================
echo "Test 11: POST /api/ai/social (invalid action)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$TEST_MERCHANT_ID"'",
    "action": "invalid_action"
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST invalid action" "$status_code" "400" "$body"

# ================================================
# TEST 12: POST Missing merchantId
# ================================================
echo "Test 12: POST /api/ai/social (missing merchantId)"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "post",
    "platform": "instagram",
    "contentType": "promotion",
    "topic": "Test"
  }')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')
print_result "POST missing merchantId" "$status_code" "400" "$body"

echo "================================================"
echo "Test Suite Complete"
echo "================================================"
