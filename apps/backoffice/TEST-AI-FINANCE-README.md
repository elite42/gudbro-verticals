# Testing AI Financial Management API (Phase 9)

## Quick Start

### 1. Prerequisites Check

Ensure you have:

- [x] Next.js dev server running on port 3023
- [x] OpenAI API key configured in `.env.local`
- [x] Supabase credentials configured
- [x] Node.js and curl installed

### 2. Start the Server

```bash
cd /Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice
npm run dev
```

Verify it's running on port 3023 by checking the terminal output.

### 3. Run the Test Script

```bash
# Make executable (first time only)
chmod +x test-ai-finance-api.sh

# Run all tests
./test-ai-finance-api.sh
```

### 4. Expected Output

You should see 8 test cases:

- Test 1-4: Valid requests (should PASS with 200 OK)
- Test 5-8: Validation tests (should PASS with 400 Bad Request)

**Example successful output:**

```
======================================
AI Financial Management API Test
Phase 9: Finance Endpoints
======================================

[TEST 1] GET /api/ai/finance?merchantId=XXX
Status Code: 200
Response: { "success": true, "summaries": [], ... }
✓ PASSED

...

======================================
TEST SUMMARY
======================================
Total Tests: 8
Passed: 8
Failed: 0
All tests passed!
```

---

## Manual Testing with curl

If you prefer to test manually:

### Setup Dev Session Cookie

```bash
# Create dev session
DEV_SESSION='{"id":"550e8400-e29b-41d4-a716-446655440000","role":"merchant_owner"}'
ENCODED_SESSION=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$DEV_SESSION'))")

# Use in requests
COOKIE="Cookie: gudbro_dev_session=$ENCODED_SESSION"
```

### Test 1: GET Financial Data

```bash
curl -X GET "http://localhost:3023/api/ai/finance?merchantId=550e8400-e29b-41d4-a716-446655440000" \
  -H "$COOKIE" \
  -H "Content-Type: application/json" | jq
```

### Test 2: Generate Financial Summary

```bash
curl -X POST "http://localhost:3023/api/ai/finance" \
  -H "$COOKIE" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "550e8400-e29b-41d4-a716-446655440000",
    "action": "summary",
    "period": "monthly",
    "periodStart": "2026-01-01",
    "periodEnd": "2026-01-31"
  }' | jq
```

### Test 3: Generate Budget Plan

```bash
curl -X POST "http://localhost:3023/api/ai/finance" \
  -H "$COOKIE" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "550e8400-e29b-41d4-a716-446655440000",
    "action": "budget",
    "year": 2026,
    "month": 1,
    "totalBudget": 50000
  }' | jq
```

### Test 4: Generate Cash Flow Forecast

```bash
curl -X POST "http://localhost:3023/api/ai/finance" \
  -H "$COOKIE" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "550e8400-e29b-41d4-a716-446655440000",
    "action": "forecast",
    "months": 3
  }' | jq
```

---

## Troubleshooting

### Issue: Connection Refused

**Error:** `curl: (7) Failed to connect to localhost port 3023`

**Solution:**

1. Check if server is running: `ps aux | grep next`
2. Start server: `npm run dev`
3. Verify port in terminal output

### Issue: 401 Unauthorized / Redirect to /login

**Error:** Response contains `/login?redirectTo=%2Fapi%2Fai%2Ffinance`

**Solution:**

- Ensure you're using the dev session cookie
- Check that `NODE_ENV=development` is set
- Use the test script which handles authentication

### Issue: 500 Internal Server Error - OpenAI

**Error:** `{"error": "OpenAI API key not configured"}`

**Solution:**

1. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
2. Restart the dev server

### Issue: 500 Internal Server Error - Database

**Error:** Database connection or table not found

**Solution:**

1. Verify Supabase credentials in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://vnaonebbuezrzvjekqxs.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```
2. Check if required tables exist:
   - `ai_financial_summaries`
   - `ai_budget_plans`
   - `ai_cash_flow_forecasts`
   - `merchants`

### Issue: Empty Response or No Data

**Expected:** This is normal if no data exists yet

**Explanation:**

- GET endpoint returns empty arrays if no financial data exists
- POST endpoints create new data and save to database
- Run POST tests first to generate data, then GET to retrieve it

---

## Database Setup (Optional)

If you want to test with real merchant data:

```sql
-- Create test merchant
INSERT INTO merchants (id, name, business_type)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Test Restaurant',
  'restaurant'
);

-- Create sample analytics data
INSERT INTO analytics_daily_aggregates (
  merchant_id,
  date,
  total_revenue,
  order_count
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '2026-01-01',
  5000,
  120
);
```

---

## Files Generated

After running tests:

1. **Test Script:** `test-ai-finance-api.sh` - Automated test suite
2. **Test Report:** `AI-FINANCE-API-TEST-REPORT.md` - Detailed analysis
3. **This README:** `TEST-AI-FINANCE-README.md` - Quick start guide

---

## Next Steps

After successful testing:

1. Review test results in the terminal
2. Check `AI-FINANCE-API-TEST-REPORT.md` for detailed analysis
3. Verify data was saved to database
4. Test the UI integration (if available)
5. Review any errors or issues found

---

**Need Help?**

Check the full test report: `AI-FINANCE-API-TEST-REPORT.md`
