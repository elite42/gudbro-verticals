# AI Social API - Quick Test Guide

## 1. Setup (Do Once)

```bash
# Get a merchant ID from database
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW9uZWJidWV6cnp2amVrcXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTQwNDksImV4cCI6MjA3OTkzMDA0OX0.j0IQeyHsNWNqpw4CYsxGIcLapQ9Rl5YkXn5KTpvZM84"
URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"
curl -s "$URL/merchants?select=id,name&limit=1" -H "apikey: $KEY"

# If no merchants, create test merchant first
# Then set the ID:
export MERCHANT_ID="paste-merchant-id-here"
```

## 2. Start Server

```bash
cd /Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice
npm run dev
# Wait for "Ready on http://localhost:3001"
```

## 3. Run Quick Tests

### Test 1: GET Posts ✓

```bash
curl "http://localhost:3001/api/ai/social?merchantId=$MERCHANT_ID" | jq
# Expected: 200, { success: true, posts: [...], count: N }
```

### Test 2: GET Calendars ✓

```bash
curl "http://localhost:3001/api/ai/social?merchantId=$MERCHANT_ID&type=calendars" | jq
# Expected: 200, { success: true, calendars: [...], count: N }
```

### Test 3: Generate Post ✓

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "post",
    "platform": "instagram",
    "contentType": "promotion",
    "topic": "Weekend brunch special"
  }' | jq
# Expected: 200, { success: true, post: {...} }
# Time: 2-5 seconds (OpenAI call)
```

### Test 4: Generate Calendar ✓

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "calendar",
    "weekStart": "2026-01-06",
    "platforms": ["instagram", "facebook"],
    "postsPerWeek": 7
  }' | jq
# Expected: 200, { success: true, calendar: {...} }
# Time: 3-6 seconds
```

### Test 5: Generate Captions ✓

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "captions",
    "topic": "Fresh coffee arrival",
    "platform": "instagram",
    "numberOfVariations": 3
  }' | jq
# Expected: 200, { success: true, captions: ["...", "...", "..."], count: 3 }
```

## 4. Automated Test Suite

```bash
./test-ai-social-api.sh
# Runs all 12 tests automatically
# Shows pass/fail with color coding
```

## Expected Results

| Test                   | Status | Response Time |
| ---------------------- | ------ | ------------- |
| GET posts              | 200    | <100ms        |
| GET calendars          | 200    | <100ms        |
| POST generate post     | 200    | 2-5s          |
| POST generate calendar | 200    | 3-6s          |
| POST generate captions | 200    | 3-5s          |

## Troubleshooting

**Server not running?**

```bash
cd /Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice
npm run dev
```

**No merchants?**
Create test merchant in Supabase dashboard or use SQL

**OpenAI errors?**
Check `.env.local` has `OPENAI_API_KEY`

**Database errors?**
Run schema SQL to create `ai_social_posts` and `ai_content_calendars` tables

## Files

- Test Script: `./test-ai-social-api.sh`
- Full Docs: `./AI_SOCIAL_API_ANALYSIS.md`
- Test Report: `./AI_SOCIAL_API_TEST_REPORT.md`
