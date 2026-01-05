#!/bin/bash

# Test Script for AI Financial Management API (Phase 9)
# /api/ai/finance endpoint testing

set -e

# Configuration
BASE_URL="http://localhost:3023"
API_ENDPOINT="/api/ai/finance"

# Dev session (for authentication bypass in development)
DEV_SESSION='{"id":"550e8400-e29b-41d4-a716-446655440000","role":"merchant_owner"}'
ENCODED_SESSION=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$DEV_SESSION'))")

# Test merchantId (using UUID format)
MERCHANT_ID="550e8400-e29b-41d4-a716-446655440000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}AI Financial Management API Test${NC}"
echo -e "${BLUE}Phase 9: Finance Endpoints${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# Function to make authenticated requests
make_request() {
    curl -s -w "\nHTTP_STATUS:%{http_code}" \
        -H "Cookie: gudbro_dev_session=$ENCODED_SESSION" \
        -H "Content-Type: application/json" \
        "$@"
}

# Test counter
PASSED=0
FAILED=0

# Test 1: GET /api/ai/finance - Get financial data
echo -e "${YELLOW}[TEST 1] GET /api/ai/finance?merchantId=XXX${NC}"
echo "Endpoint: GET $BASE_URL$API_ENDPOINT?merchantId=$MERCHANT_ID"
echo ""

RESPONSE=$(make_request "$BASE_URL$API_ENDPOINT?merchantId=$MERCHANT_ID")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Test 2: POST /api/ai/finance - Generate financial summary
echo -e "${YELLOW}[TEST 2] POST /api/ai/finance - action=summary${NC}"
echo "Endpoint: POST $BASE_URL$API_ENDPOINT"
echo "Payload: action=summary, period=monthly, periodStart, periodEnd"
echo ""

PAYLOAD='{
  "merchantId": "'$MERCHANT_ID'",
  "action": "summary",
  "period": "monthly",
  "periodStart": "2026-01-01",
  "periodEnd": "2026-01-31"
}'

RESPONSE=$(make_request -X POST -d "$PAYLOAD" "$BASE_URL$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Test 3: POST /api/ai/finance - Generate budget plan
echo -e "${YELLOW}[TEST 3] POST /api/ai/finance - action=budget${NC}"
echo "Endpoint: POST $BASE_URL$API_ENDPOINT"
echo "Payload: action=budget, year=2026, month=1, totalBudget=50000"
echo ""

PAYLOAD='{
  "merchantId": "'$MERCHANT_ID'",
  "action": "budget",
  "year": 2026,
  "month": 1,
  "totalBudget": 50000
}'

RESPONSE=$(make_request -X POST -d "$PAYLOAD" "$BASE_URL$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Test 4: POST /api/ai/finance - Generate cash flow forecast
echo -e "${YELLOW}[TEST 4] POST /api/ai/finance - action=forecast${NC}"
echo "Endpoint: POST $BASE_URL$API_ENDPOINT"
echo "Payload: action=forecast, months=3"
echo ""

PAYLOAD='{
  "merchantId": "'$MERCHANT_ID'",
  "action": "forecast",
  "months": 3
}'

RESPONSE=$(make_request -X POST -d "$PAYLOAD" "$BASE_URL$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Test 5: POST /api/ai/finance - Missing merchantId
echo -e "${YELLOW}[TEST 5] POST /api/ai/finance - Missing merchantId (should fail)${NC}"
echo "Endpoint: POST $BASE_URL$API_ENDPOINT"
echo "Payload: action=summary (no merchantId)"
echo ""

PAYLOAD='{
  "action": "summary",
  "period": "monthly",
  "periodStart": "2026-01-01",
  "periodEnd": "2026-01-31"
}'

RESPONSE=$(make_request -X POST -d "$PAYLOAD" "$BASE_URL$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}✓ PASSED (correctly rejected)${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED (should return 400)${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Test 6: POST /api/ai/finance - Invalid action
echo -e "${YELLOW}[TEST 6] POST /api/ai/finance - Invalid action (should fail)${NC}"
echo "Endpoint: POST $BASE_URL$API_ENDPOINT"
echo "Payload: action=invalid"
echo ""

PAYLOAD='{
  "merchantId": "'$MERCHANT_ID'",
  "action": "invalid"
}'

RESPONSE=$(make_request -X POST -d "$PAYLOAD" "$BASE_URL$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}✓ PASSED (correctly rejected)${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED (should return 400)${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Test 7: POST /api/ai/finance - Missing required fields for summary
echo -e "${YELLOW}[TEST 7] POST /api/ai/finance - Missing summary fields (should fail)${NC}"
echo "Endpoint: POST $BASE_URL$API_ENDPOINT"
echo "Payload: action=summary (missing periodStart, periodEnd)"
echo ""

PAYLOAD='{
  "merchantId": "'$MERCHANT_ID'",
  "action": "summary",
  "period": "monthly"
}'

RESPONSE=$(make_request -X POST -d "$PAYLOAD" "$BASE_URL$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}✓ PASSED (correctly rejected)${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED (should return 400)${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Test 8: POST /api/ai/finance - Missing required fields for budget
echo -e "${YELLOW}[TEST 8] POST /api/ai/finance - Missing budget fields (should fail)${NC}"
echo "Endpoint: POST $BASE_URL$API_ENDPOINT"
echo "Payload: action=budget (missing totalBudget)"
echo ""

PAYLOAD='{
  "merchantId": "'$MERCHANT_ID'",
  "action": "budget",
  "year": 2026,
  "month": 1
}'

RESPONSE=$(make_request -X POST -d "$PAYLOAD" "$BASE_URL$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_CODE"
echo "Response:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}✓ PASSED (correctly rejected)${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED (should return 400)${NC}"
    ((FAILED++))
fi
echo ""
echo "---"
echo ""

# Summary
echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}TEST SUMMARY${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""
echo -e "Total Tests: $((PASSED + FAILED))"
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
