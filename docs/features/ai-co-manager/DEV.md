# AI Co-Manager - Developer Documentation

> Sistema AI per gestione autonoma del business

**Last Updated:** 2026-01-05
**Status:** Active
**Owner:** GUDBRO Team

---

## Overview

AI Co-Manager è un sistema basato su GPT-4 che agisce come "co-manager" per i merchant GUDBRO. Fornisce insights proattivi, automazione delle operazioni quotidiane, e supporto decisionale attraverso un'interfaccia chat conversazionale.

Il sistema è composto da 13 servizi specializzati che coprono diversi aspetti della gestione del business.

---

## Architecture

### Components

| Component                     | Path                                      | Purpose                               |
| ----------------------------- | ----------------------------------------- | ------------------------------------- |
| Chat Service                  | `lib/ai/chat-service.ts`                  | Main chat interface, orchestration    |
| Knowledge Service             | `lib/ai/knowledge-service.ts`             | Menu, orders, events, feedback access |
| Actions Service               | `lib/ai/actions-service.ts`               | Function calling for actions          |
| Proactivity Service           | `lib/ai/proactivity-service.ts`           | Daily briefings, alerts               |
| Feedback Loop Service         | `lib/ai/feedback-loop-service.ts`         | Collect merchant feedback             |
| Bootstrap Service             | `lib/ai/bootstrap-service.ts`             | Zone analysis, competitors            |
| Market Intelligence Service   | `lib/ai/market-intelligence-service.ts`   | Pricing, partnerships                 |
| Social Media Service          | `lib/ai/social-media-service.ts`          | Auto posts, calendars                 |
| Financial Service             | `lib/ai/financial-service.ts`             | P&L, budgets, forecasts               |
| Task Delegation Service       | `lib/ai/task-delegation-service.ts`       | Staff task management                 |
| Agentic Workflow Service      | `lib/ai/agentic-workflow-service.ts`      | Multi-step automations                |
| Inventory Negotiation Service | `lib/ai/inventory-negotiation-service.ts` | Stock, suppliers, POs                 |
| Onboarding Service            | `lib/ai/onboarding-service.ts`            | Guided setup                          |
| Index                         | `lib/ai/index.ts`                         | Export barrel                         |

### Data Flow

```
User Message
     │
     ▼
┌─────────────┐
│ Chat Service │ ◄──── OpenAI GPT-4
└─────────────┘
     │
     ▼
┌─────────────────────┐
│ Function Calling    │
│ (Actions Service)   │
└─────────────────────┘
     │
     ├──► Knowledge Service ──► Supabase (read)
     ├──► Proactivity Service ──► ai_daily_briefings
     ├──► Social Media Service ──► ai_social_posts
     ├──► Financial Service ──► ai_financial_*
     ├──► Task Delegation ──► ai_delegated_tasks
     ├──► Workflow Service ──► ai_workflow_*
     └──► Inventory Service ──► ai_inventory_*, ai_suppliers
```

### Database Tables

| Table                   | Purpose              | Migration |
| ----------------------- | -------------------- | --------- |
| ai_merchant_preferences | Merchant AI settings | 027       |
| ai_daily_briefings      | Daily insights       | 028       |
| improvement_suggestions | AI suggestions       | 029       |
| zone_analysis           | Location insights    | 030       |
| competitors             | Competitor tracking  | 030       |
| market_prices           | Price benchmarks     | 031       |
| potential_partnerships  | Partnership opps     | 031       |
| ai_social_posts         | Social content       | 032       |
| ai_content_calendars    | Content scheduling   | 032       |
| ai_financial_summaries  | P&L summaries        | 033       |
| ai_budget_plans         | Budget planning      | 033       |
| ai_expenses             | Expense tracking     | 033       |
| ai_delegated_tasks      | Staff tasks          | 034       |
| ai_workflow_definitions | Workflow templates   | 035       |
| ai_workflow_executions  | Workflow runs        | 035       |
| ai_workflow_schedules   | Workflow scheduling  | 035       |
| ai_suppliers            | Supplier management  | 036       |
| ai_inventory_items      | Stock tracking       | 036       |
| ai_purchase_orders      | Purchase orders      | 036       |

---

## API Reference

### Endpoints

All endpoints follow pattern: `/api/ai/[feature]`

#### POST /api/ai/chat

Main chat endpoint.

**Request:**

```json
{
  "message": "string - user message",
  "merchantId": "uuid - merchant ID",
  "conversationId": "uuid - optional conversation ID"
}
```

**Response:**

```json
{
  "response": "string - AI response",
  "conversationId": "uuid",
  "actions": [
    {
      "type": "string",
      "data": {}
    }
  ]
}
```

#### GET /api/ai/briefing

Get daily briefing.

**Query:**

```
?merchantId=uuid
```

**Response:**

```json
{
  "briefing": {
    "summary": "string",
    "highlights": ["string"],
    "alerts": ["string"],
    "recommendations": ["string"]
  }
}
```

#### POST /api/ai/actions/[action]

Execute specific action.

**Actions available:**

- `create-event`
- `translate-menu`
- `update-menu-item`
- `generate-social-post`
- `create-task`
- `create-workflow`

#### POST /api/ai/feedback

Submit feedback on AI suggestion.

**Request:**

```json
{
  "suggestionId": "uuid",
  "rating": "accepted | rejected | modified",
  "notes": "string - optional"
}
```

#### GET /api/ai/suggestions

Get improvement suggestions.

**Query:**

```
?merchantId=uuid&status=pending|accepted|rejected
```

#### POST /api/ai/bootstrap

Run initial zone analysis.

**Request:**

```json
{
  "merchantId": "uuid",
  "address": "string",
  "businessType": "string"
}
```

#### GET /api/ai/social/posts

Get scheduled social posts.

**Query:**

```
?merchantId=uuid&status=draft|scheduled|published
```

#### POST /api/ai/social/generate

Generate social content.

**Request:**

```json
{
  "merchantId": "uuid",
  "topic": "string",
  "platform": "instagram|facebook|tiktok"
}
```

#### GET /api/ai/financial/summary

Get financial summary.

**Query:**

```
?merchantId=uuid&period=week|month|quarter
```

#### POST /api/ai/tasks

Create delegated task.

**Request:**

```json
{
  "merchantId": "uuid",
  "title": "string",
  "description": "string",
  "assigneeId": "uuid",
  "dueDate": "ISO8601",
  "priority": "low|medium|high|urgent"
}
```

#### GET /api/ai/inventory

Get inventory status.

**Query:**

```
?merchantId=uuid&lowStock=true
```

#### POST /api/ai/onboarding

Start onboarding flow.

**Request:**

```json
{
  "merchantId": "uuid",
  "step": "number - 1-4"
}
```

---

## Configuration

### Environment Variables

| Variable                        | Required | Description                         |
| ------------------------------- | -------- | ----------------------------------- |
| `OPENAI_API_KEY`                | Yes      | OpenAI API key for GPT-4            |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes      | Supabase project URL                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes      | Supabase anon key                   |
| `SUPABASE_SERVICE_ROLE_KEY`     | Yes      | Supabase service role (server only) |

### AI Settings (per merchant)

Stored in `ai_merchant_preferences`:

| Setting               | Type    | Default   | Description                  |
| --------------------- | ------- | --------- | ---------------------------- |
| proactivity_level     | string  | balanced  | low, balanced, high          |
| notification_channels | array   | ['email'] | email, push, sms             |
| auto_actions_enabled  | boolean | false     | Allow AI to act autonomously |
| preferred_language    | string  | en        | Response language            |
| business_hours        | jsonb   | {}        | Operating hours              |
| goals                 | array   | []        | Business goals               |

---

## Dependencies

### Internal

- `lib/supabase/client.ts` - Database client
- `lib/supabase/server.ts` - Server-side client
- `types/database.ts` - Generated types

### External

- OpenAI API (GPT-4, GPT-4-vision)
- Supabase (PostgreSQL + Auth + Storage)

---

## Services Detail

### 1. Chat Service (P1)

Orchestrates all AI interactions:

- Message routing
- Context management
- Function calling dispatch
- Response formatting

### 2. Knowledge Service (P2)

Provides read access to:

- Menu items and categories
- Order history and patterns
- Events and schedules
- Customer feedback

### 3. Actions Service (P3)

Enables AI to perform actions:

- Create/update events
- Translate content
- Update menu items
- Generate content

Uses OpenAI function calling.

### 4. Proactivity Service (P4)

Generates unsolicited insights:

- Daily briefings
- Performance alerts
- Opportunity detection
- Weather/event impacts

### 5. Feedback Loop Service (P5)

Collects and learns from feedback:

- Track suggestion acceptance
- Adjust recommendations
- Improve over time

### 6. Bootstrap Service (P6)

Initial setup and analysis:

- Zone demographics
- Competitor mapping
- Market positioning
- Initial recommendations

### 7. Market Intelligence Service (P7)

Ongoing market insights:

- Price benchmarking
- Trend detection
- Partnership opportunities

### 8. Social Media Service (P8)

Content automation:

- Post generation
- Content calendars
- Multi-platform support
- Engagement tracking

### 9. Financial Service (P9)

Financial management:

- P&L summaries
- Budget planning
- Expense tracking
- Cash flow forecasts

### 10. Task Delegation Service (P10)

Staff management:

- Task creation
- Assignment
- Progress tracking
- Deadline management

### 11. Agentic Workflow Service (P11)

Complex automations:

- Multi-step workflows
- Conditional logic
- Scheduled execution
- Trigger-based actions

### 12. Inventory Negotiation Service (P12)

Supply chain:

- Stock tracking
- Low stock alerts
- Supplier management
- Purchase orders

### 13. Onboarding Service (P13)

Guided setup:

- Step-by-step wizard
- Logo upload
- Initial configuration
- First insights

---

## Testing

### Manual Testing

1. Navigate to `/dashboard/ai`
2. Enter test message
3. Verify response is relevant
4. Test function calling actions
5. Check database for created records

### Test Accounts

See `shared/database/migrations/seeds/001-test-data.sql` for test data.

---

## Known Issues

| Issue                      | Workaround           | Status |
| -------------------------- | -------------------- | ------ |
| Rate limits on heavy usage | Implement queuing    | Open   |
| Context window limits      | Summarization needed | Open   |

---

## Changelog

| Date       | Change                      | Author |
| ---------- | --------------------------- | ------ |
| 2026-01-05 | P13 Onboarding complete     | Team   |
| 2026-01-05 | P2-P12 implemented          | Team   |
| 2026-01-04 | P1 MVP (chat + preferences) | Team   |

---

**File:** `docs/features/ai-co-manager/DEV.md`
