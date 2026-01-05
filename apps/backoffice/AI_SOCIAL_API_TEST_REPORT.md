# AI Social Media API Test Report (Phase 8)

**API Endpoint:** `/api/ai/social`
**Test Date:** 2026-01-05
**API Location:** `/Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice/app/api/ai/social/route.ts`

---

## API Overview

The AI Social Media API provides endpoints for:

- Retrieving social media posts and content calendars
- Generating AI-powered social media posts
- Creating content calendars
- Generating caption variations

**Supported HTTP Methods:**

- `GET` - Retrieve posts and calendars
- `POST` - Generate content
- `PATCH` - Update post status

---

## API Specification

### 1. GET Endpoints

#### GET Posts

```bash
GET /api/ai/social?merchantId=XXX
```

**Query Parameters:**

- `merchantId` (required): UUID of the merchant
- `type` (optional): "posts" (default) or "calendars"
- `status` (optional): Filter by status
- `platform` (optional): Filter by platform
- `limit` (optional): Number of results (default: 20)

**Expected Response (200):**

```json
{
  "success": true,
  "posts": [...],
  "count": 10
}
```

**Error Response (400):**

```json
{
  "error": "Missing required field: merchantId"
}
```

#### GET Calendars

```bash
GET /api/ai/social?merchantId=XXX&type=calendars
```

**Query Parameters:**

- `merchantId` (required): UUID of the merchant
- `type`: "calendars"
- `limit` (optional): Number of results (default: 20)

**Expected Response (200):**

```json
{
  "success": true,
  "calendars": [...],
  "count": 5
}
```

---

### 2. POST Endpoints

All POST endpoints require:

- `Content-Type: application/json` header
- `merchantId` in request body
- `action` field specifying the operation

#### POST Generate Post

```bash
POST /api/ai/social
```

**Request Body:**

```json
{
  "merchantId": "uuid",
  "action": "post",
  "platform": "instagram|facebook|twitter|linkedin",
  "contentType": "promotion|announcement|behind_scenes|...",
  "topic": "string",
  "style": "professional|casual|..." (optional),
  "menuItem": "string" (optional),
  "event": "string" (optional)
}
```

**Required Fields:**

- `merchantId`
- `platform`
- `contentType`
- `topic`

**Expected Response (200):**

```json
{
  "success": true,
  "post": {
    "id": "uuid",
    "content": "...",
    "platform": "instagram",
    ...
  }
}
```

**Error Response (400):**

```json
{
  "error": "Missing required fields: platform, contentType, topic"
}
```

#### POST Generate Calendar

```bash
POST /api/ai/social
```

**Request Body:**

```json
{
  "merchantId": "uuid",
  "action": "calendar",
  "weekStart": "YYYY-MM-DD",
  "platforms": ["instagram", "facebook"],
  "postsPerWeek": 7,
  "focusAreas": ["menu_highlights", "behind_scenes"] (optional)
}
```

**Required Fields:**

- `merchantId`
- `weekStart`
- `platforms`
- `postsPerWeek`

**Expected Response (200):**

```json
{
  "success": true,
  "calendar": {
    "id": "uuid",
    "weekStart": "2026-01-06",
    "posts": [...],
    ...
  }
}
```

**Error Response (400):**

```json
{
  "error": "Missing required fields: weekStart, platforms, postsPerWeek"
}
```

#### POST Generate Captions

```bash
POST /api/ai/social
```

**Request Body:**

```json
{
  "merchantId": "uuid",
  "action": "captions",
  "topic": "string",
  "platform": "instagram|facebook|twitter|linkedin",
  "numberOfVariations": 3 (optional, default: 3),
  "style": "professional|casual|..." (optional)
}
```

**Required Fields:**

- `merchantId`
- `topic`
- `platform`

**Expected Response (200):**

```json
{
  "success": true,
  "captions": [
    "Caption variation 1",
    "Caption variation 2",
    "Caption variation 3"
  ],
  "count": 3
}
```

**Error Response (400):**

```json
{
  "error": "Missing required fields: topic, platform"
}
```

---

### 3. PATCH Endpoint

#### Update Post Status

```bash
PATCH /api/ai/social
```

**Request Body:**

```json
{
  "postId": "uuid",
  "status": "draft|scheduled|published|archived",
  "scheduledFor": "ISO 8601 datetime" (optional, required for scheduled status)
}
```

**Required Fields:**

- `postId`
- `status`

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Post status updated to scheduled"
}
```

**Error Response (400):**

```json
{
  "error": "Missing required fields: postId, status"
}
```

---

## Test Cases

### Prerequisites

1. Server must be running on `http://localhost:3001`
2. Valid `merchantId` required for successful tests
3. Database must have necessary tables (see Dependencies section)

### Test Suite

Run the automated test suite:

```bash
./test-ai-social-api.sh
```

Or test manually with curl:

#### Test 1: GET without merchantId (should fail)

```bash
curl -X GET "http://localhost:3001/api/ai/social"
# Expected: 400 - Missing merchantId
```

#### Test 2: GET posts with merchantId

```bash
MERCHANT_ID="00000000-0000-0000-0000-000000000001"
curl -X GET "http://localhost:3001/api/ai/social?merchantId=$MERCHANT_ID"
# Expected: 200 - Returns posts array
```

#### Test 3: GET posts with filters

```bash
curl -X GET "http://localhost:3001/api/ai/social?merchantId=$MERCHANT_ID&status=draft&platform=instagram&limit=10"
# Expected: 200 - Returns filtered posts
```

#### Test 4: GET calendars

```bash
curl -X GET "http://localhost:3001/api/ai/social?merchantId=$MERCHANT_ID&type=calendars"
# Expected: 200 - Returns calendars array
```

#### Test 5: POST generate post (missing fields)

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "post"
  }'
# Expected: 400 - Missing required fields
```

#### Test 6: POST generate post (complete)

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "post",
    "platform": "instagram",
    "contentType": "promotion",
    "topic": "New seasonal menu launch",
    "style": "professional"
  }'
# Expected: 200 - Returns generated post
```

#### Test 7: POST generate calendar (missing fields)

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "calendar"
  }'
# Expected: 400 - Missing required fields
```

#### Test 8: POST generate calendar (complete)

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "calendar",
    "weekStart": "2026-01-06",
    "platforms": ["instagram", "facebook"],
    "postsPerWeek": 7,
    "focusAreas": ["menu_highlights", "behind_scenes"]
  }'
# Expected: 200 - Returns generated calendar
```

#### Test 9: POST generate captions (missing fields)

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "captions"
  }'
# Expected: 400 - Missing required fields
```

#### Test 10: POST generate captions (complete)

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "captions",
    "topic": "Fresh coffee beans arrival",
    "platform": "instagram",
    "numberOfVariations": 5,
    "style": "casual"
  }'
# Expected: 200 - Returns array of captions
```

#### Test 11: POST invalid action

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'"$MERCHANT_ID"'",
    "action": "invalid_action"
  }'
# Expected: 400 - Invalid action
```

#### Test 12: POST missing merchantId

```bash
curl -X POST "http://localhost:3001/api/ai/social" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "post",
    "platform": "instagram",
    "contentType": "promotion",
    "topic": "Test"
  }'
# Expected: 400 - Missing merchantId
```

---

## Dependencies

The API depends on these functions from `@/lib/ai`:

- `generatePost()` - Generate AI post content
- `generateContentCalendar()` - Create content calendar
- `generateCaptionVariations()` - Generate caption variations
- `getPosts()` - Retrieve posts from database
- `getContentCalendars()` - Retrieve calendars from database
- `updatePostStatus()` - Update post status

**Database Tables Required:**

- `merchants` - Merchant information
- `ai_social_posts` - Social media posts
- `ai_content_calendars` - Content calendars
- Related authentication/permission tables

---

## Known Issues / Limitations

1. **No Merchants in Database**:
   - Current Supabase instance has no merchants
   - Tests require creating test merchant first
   - Query: `curl -s "https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1/merchants?select=*" -H "apikey: KEY"` returns `[]`

2. **Server Not Running**:
   - Tests cannot run if dev server is not active
   - Start with: `npm run dev` from `/apps/backoffice`

3. **AI Function Dependencies**:
   - Success depends on implementation of `@/lib/ai` functions
   - May require OpenAI API keys or similar AI service credentials

4. **Error Handling**:
   - API properly validates required fields
   - Returns appropriate HTTP status codes (400, 500)
   - Error messages are descriptive

---

## Test Execution Steps

1. **Start the server:**

   ```bash
   cd /Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice
   npm run dev
   ```

2. **Wait for server to be ready** (usually runs on http://localhost:3001)

3. **Create a test merchant** (if none exists):

   ```bash
   # Use Supabase dashboard or API to create test merchant
   ```

4. **Run the test script:**

   ```bash
   ./test-ai-social-api.sh
   ```

5. **Review results** - Script will show:
   - Pass/Fail for each test
   - HTTP status codes
   - Response bodies
   - Summary of issues

---

## Expected Results Summary

| Test | Endpoint                 | Expected Status | Notes                       |
| ---- | ------------------------ | --------------- | --------------------------- |
| 1    | GET (no merchantId)      | 400             | Validation working          |
| 2    | GET posts                | 200             | Returns posts array         |
| 3    | GET posts (filtered)     | 200             | Filters working             |
| 4    | GET calendars            | 200             | Returns calendars array     |
| 5    | POST post (missing)      | 400             | Validation working          |
| 6    | POST post (complete)     | 200             | AI generation working       |
| 7    | POST calendar (missing)  | 400             | Validation working          |
| 8    | POST calendar (complete) | 200             | Calendar generation working |
| 9    | POST captions (missing)  | 400             | Validation working          |
| 10   | POST captions (complete) | 200             | Caption generation working  |
| 11   | POST invalid action      | 400             | Action validation working   |
| 12   | POST (no merchantId)     | 400             | Validation working          |

---

## Additional Notes

- The API uses Next.js 14.2.33 App Router (`app/api/ai/social/route.ts`)
- Dynamic rendering is forced with `export const dynamic = 'force-dynamic'`
- All responses use `NextResponse.json()`
- Error handling catches both validation and runtime errors
- The API is well-structured with clear separation of concerns

---

**File Location:** `/Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice/AI_SOCIAL_API_TEST_REPORT.md`
**Test Script:** `/Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice/test-ai-social-api.sh`
**API Implementation:** `/Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice/app/api/ai/social/route.ts`
