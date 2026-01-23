# AI CO-MANAGER SYSTEM

**Last Updated:** 2026-01-23
**Version:** 1.0

Documentazione tecnica del sistema AI Co-Manager per il backoffice GUDBRO.

---

## Overview

L'AI Co-Manager è un assistente intelligente che aiuta i ristoratori a gestire il loro business. Fornisce:

- **Daily Briefings** - Riepiloghi giornalieri con insights
- **Proactive Alerts** - Avvisi su situazioni critiche
- **Action Execution** - Esecuzione di azioni sul menu, eventi, traduzioni
- **Knowledge Access** - Accesso a dati menu, ordini, feedback, eventi

---

## Services Architecture

### Location

```
apps/backoffice/lib/ai/
├── index.ts                          # Main exports
├── chat-service.ts                   # Main chat interface
├── knowledge-service.ts              # Data access layer
├── actions-service.ts                # Action execution
├── proactivity-service.ts            # Daily briefings, alerts
├── feedback-loop-service.ts          # Merchant feedback collection
├── bootstrap-service.ts              # Zone analysis, competitors
├── market-intelligence-service.ts    # Pricing, partnerships
├── social-media-service.ts           # Auto posts, calendars
├── financial-service.ts              # P&L, budgets, forecasts
├── task-delegation-service.ts        # Staff task management
├── agentic-workflow-service.ts       # Multi-step automations
├── inventory-negotiation-service.ts  # Stock, suppliers, POs
└── onboarding-service.ts             # Guided setup
```

### Service Responsibilities

| Service                       | Purpose                               | Database Tables                                      |
| ----------------------------- | ------------------------------------- | ---------------------------------------------------- |
| chat-service                  | Main conversation interface           | -                                                    |
| knowledge-service             | Menu, orders, events, feedback access | menu_items, orders, events, customer_feedback        |
| actions-service               | Create events, translate, update menu | events, translations, menu_items                     |
| proactivity-service           | Daily briefings, alerts               | ai_daily_briefings                                   |
| feedback-loop-service         | Collect merchant feedback             | ai_merchant_preferences                              |
| bootstrap-service             | Zone analysis, competitors            | zone_analysis, competitors                           |
| market-intelligence-service   | Pricing, partnerships                 | market_prices, partnerships                          |
| social-media-service          | Auto posts, calendars                 | ai_social_posts, ai_content_calendars                |
| financial-service             | P&L, budgets, forecasts               | ai_financial_summaries, ai_budget_plans              |
| task-delegation-service       | Staff task management                 | ai_delegated_tasks                                   |
| agentic-workflow-service      | Multi-step automations                | ai_workflow_definitions, ai_workflow_executions      |
| inventory-negotiation-service | Stock, suppliers, POs                 | ai_suppliers, ai_inventory_items, ai_purchase_orders |
| onboarding-service            | Guided setup                          | ai_merchant_preferences                              |

---

## API Routes

### Pattern

All AI routes follow: `/api/ai/[feature]`

### Location

```
apps/backoffice/app/api/ai/
├── chat/                    # Main chat endpoint
├── briefing/                # Daily briefing generation
├── actions/                 # Action execution
├── suggestions/             # Improvement suggestions
├── social/                  # Social media generation
├── financial/               # Financial analysis
├── tasks/                   # Task management
├── workflows/               # Workflow execution
└── inventory/               # Inventory management
```

### Important: Supabase Client Usage

**SEMPRE** usare il pattern lazy-init per evitare build failures:

```typescript
// CORRETTO
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  const { data, error } = await supabaseAdmin.from('table').select();
  // ...
}

// SBAGLIATO - causa build failure
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

---

## Database Tables (AI-specific)

### Migration Range: 027-036

| Migration | Tables                                               |
| --------- | ---------------------------------------------------- |
| 027       | ai_merchant_preferences                              |
| 028       | ai_daily_briefings                                   |
| 029       | improvement_suggestions                              |
| 030       | zone_analysis, competitors                           |
| 031       | market_prices, partnerships                          |
| 032       | ai_social_posts, ai_content_calendars                |
| 033       | ai_financial_summaries, ai_budget_plans              |
| 034       | ai_delegated_tasks                                   |
| 035       | ai_workflow_definitions, ai_workflow_executions      |
| 036       | ai_suppliers, ai_inventory_items, ai_purchase_orders |

### RLS Policies for AI Tables

**Pattern per tabelle AI:**

```sql
-- SELECT: Solo il merchant owner
CREATE POLICY "select_own" ON ai_table
FOR SELECT USING (auth.uid() = user_id);

-- INSERT/UPDATE: Solo service_role (backend)
CREATE POLICY "service_insert" ON ai_table
FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- MAI usare:
-- WITH CHECK (true)  -- Permette a chiunque
-- USING (true)       -- Per SELECT su dati sensibili
```

---

## OpenAI Integration

### Configuration

```typescript
// apps/backoffice/lib/ai/openai-client.ts
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

### Models Used

| Purpose        | Model                  | Cost                      |
| -------------- | ---------------------- | ------------------------- |
| Chat/Reasoning | gpt-4o                 | $5/$15 per 1M tokens      |
| Translations   | gpt-4o-mini            | $0.15/$0.60 per 1M tokens |
| Embeddings     | text-embedding-3-small | $0.02 per 1M tokens       |

### Best Practice: Translations

Per traduzioni bulk, usare gpt-4o-mini direttamente invece di Claude:

```typescript
// ~$0.0015 per 200 traduzioni con gpt-4o-mini
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'Translate to Italian. Return only the translation.',
    },
    { role: 'user', content: textToTranslate },
  ],
});
```

---

## MCP Integration

### Supabase MCP per AI

```
mcp__supabase__execute_sql      → Query AI tables
mcp__supabase__apply_migration  → Create new AI tables
mcp__supabase__get_advisors     → Check RLS policies
```

### Pattern per Query AI Tables

```sql
-- Query mirata (veloce)
SELECT * FROM ai_daily_briefings
WHERE merchant_id = 'uuid'
ORDER BY created_at DESC
LIMIT 5;

-- MAI fare list_tables su schema con 100+ tabelle
-- Usa information_schema per tabelle specifiche
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'ai_daily_briefings';
```

---

## Slash Commands

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `/ralph-loop`   | Loop iterativo Ralph Wiggum per task autonome |
| `/cancel-ralph` | Cancella loop Ralph attivo                    |

### Ralph Wiggum Pattern

Per task AI complesse che richiedono multiple iterazioni:

1. Attiva con `/ralph-loop`
2. Claude continua autonomamente fino a completamento
3. Cancella con `/cancel-ralph` se necessario

---

## Environment Variables

| Variable                    | Description                 | Required |
| --------------------------- | --------------------------- | -------- |
| `OPENAI_API_KEY`            | OpenAI API key              | Yes      |
| `NEXT_PUBLIC_SUPABASE_URL`  | Supabase URL                | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role per backend AI | Yes      |

---

## Development Guidelines

### Adding New AI Service

1. **Create service file:** `lib/ai/new-service.ts`
2. **Export from index:** Add to `lib/ai/index.ts`
3. **Create API route:** `app/api/ai/new-feature/route.ts`
4. **Create migration:** If new tables needed (027+ range)
5. **Add RLS policies:** Follow patterns above
6. **Test:** Verify with Supabase advisors

### Error Handling

```typescript
export async function POST(request: Request) {
  try {
    // AI logic
  } catch (error) {
    console.error('AI Service Error:', error);

    // Return structured error
    return NextResponse.json(
      { error: 'AI service temporarily unavailable' },
      { status: 500 }
    );
  }
}
```

### Rate Limiting Considerations

- OpenAI ha rate limits per organizzazione
- Implementare retry con exponential backoff
- Cache responses dove possibile (Redis)

---

## Troubleshooting

### AI Chat Non Risponde

1. Check `OPENAI_API_KEY` è valida
2. Check Supabase connection
3. Check logs: `mcp__supabase__get_logs(service: "postgres")`

### RLS Errors su AI Tables

1. Verificare che API route usa `supabaseAdmin`
2. Check policy con `mcp__supabase__get_advisors(type: "security")`
3. Pattern corretto: `auth.role() = 'service_role'`

### Timeout su Query AI

1. Query troppo complessa → semplificare
2. Usare LIMIT e paginazione
3. Debug incrementale: query semplice → aggiungere condizioni

---

**File:** `docs/AI-SYSTEM.md`
**Maintainer:** Claude Code + Team
