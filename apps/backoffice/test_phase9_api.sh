#!/bin/bash

# AI Financial Management API (Phase 9) Test Script
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW9uZWJidWV6cnp2amVrcXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTQwNDksImV4cCI6MjA3OTkzMDA0OX0.j0IQeyHsNWNqpw4CYsxGIcLapQ9Rl5YkXn5KTpvZM84"
URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"

echo "========================================="
echo "AI FINANCIAL MANAGEMENT API - PHASE 9"
echo "========================================="
echo ""

# Test 1: Check ai_financial_summaries table
echo "1. Testing ai_financial_summaries table..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$URL/ai_financial_summaries?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

# Test 2: Check ai_budget_plans table
echo "2. Testing ai_budget_plans table..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$URL/ai_budget_plans?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

# Test 3: Check ai_cash_flow_forecasts table
echo "3. Testing ai_cash_flow_forecasts table..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$URL/ai_cash_flow_forecasts?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

# Test 4: Check ai_expenses table
echo "4. Testing ai_expenses table..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$URL/ai_expenses?limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY")
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

# Test 5: Try to INSERT into ai_financial_summaries
echo "5. Testing INSERT into ai_financial_summaries..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$URL/ai_financial_summaries" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "vertical_id": "00000000-0000-0000-0000-000000000000",
    "period_start": "2026-01-01",
    "period_end": "2026-01-31",
    "total_revenue": 10000.00,
    "total_expenses": 5000.00,
    "net_profit": 5000.00,
    "ai_insights": {"test": "data"},
    "recommendations": ["Test recommendation"]
  }')
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

# Test 6: Try to INSERT into ai_budget_plans
echo "6. Testing INSERT into ai_budget_plans..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$URL/ai_budget_plans" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "vertical_id": "00000000-0000-0000-0000-000000000000",
    "plan_name": "Test Budget Plan",
    "start_date": "2026-01-01",
    "end_date": "2026-12-31",
    "total_budget": 100000.00,
    "category_budgets": {"operations": 50000, "marketing": 30000, "other": 20000},
    "ai_recommendations": ["Optimize spending"]
  }')
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

# Test 7: Try to INSERT into ai_cash_flow_forecasts
echo "7. Testing INSERT into ai_cash_flow_forecasts..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$URL/ai_cash_flow_forecasts" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "vertical_id": "00000000-0000-0000-0000-000000000000",
    "forecast_date": "2026-02-01",
    "predicted_inflow": 15000.00,
    "predicted_outflow": 8000.00,
    "predicted_balance": 7000.00,
    "confidence_score": 0.85,
    "forecast_period": "monthly"
  }')
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

# Test 8: Try to INSERT into ai_expenses
echo "8. Testing INSERT into ai_expenses..."
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$URL/ai_expenses" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "vertical_id": "00000000-0000-0000-0000-000000000000",
    "expense_date": "2026-01-05",
    "category": "operations",
    "amount": 500.00,
    "description": "Test expense",
    "ai_categorization": {"confidence": 0.95}
  }')
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "HTTP_CODE:")
echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

echo "========================================="
echo "TEST COMPLETE"
echo "========================================="
