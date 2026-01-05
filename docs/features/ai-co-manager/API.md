# AI Co-Manager API Reference

> API per integrazioni con AI Co-Manager

**Base URL:** `/api/ai`
**Authentication:** Supabase Auth (Bearer Token)

---

## Authentication

Tutte le richieste richiedono un token JWT valido da Supabase Auth.

```http
Authorization: Bearer <supabase_jwt_token>
```

---

## Endpoints

### Chat

#### Send Message

```http
POST /api/ai/chat
```

Invia un messaggio all'AI e riceve una risposta.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

```json
{
  "message": "Qual è stato il piatto più venduto oggi?",
  "merchantId": "550e8400-e29b-41d4-a716-446655440000",
  "conversationId": "optional-uuid-for-context"
}
```

**Response 200:**

```json
{
  "response": "Il piatto più venduto oggi è la Margherita con 25 ordini.",
  "conversationId": "550e8400-e29b-41d4-a716-446655440001",
  "actions": [
    {
      "type": "show_chart",
      "data": {
        "chartType": "bar",
        "data": [...]
      }
    }
  ],
  "suggestions": [
    "Vuoi vedere i trend settimanali?",
    "Posso mostrarti anche i margini?"
  ]
}
```

---

### Briefing

#### Get Daily Briefing

```http
GET /api/ai/briefing?merchantId=<uuid>
```

Ottieni il briefing giornaliero.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| merchantId | uuid | Yes | Merchant ID |
| date | string | No | Data specifica (YYYY-MM-DD) |

**Response 200:**

```json
{
  "briefing": {
    "id": "uuid",
    "date": "2026-01-05",
    "summary": "Ieri hai avuto una buona giornata con 45 ordini totali.",
    "highlights": [
      "Vendite +15% rispetto a venerdì scorso",
      "3 nuovi clienti registrati"
    ],
    "alerts": ["Scorte basse: Mozzarella di bufala"],
    "recommendations": ["Considera una promozione per il pranzo di lunedì"],
    "metrics": {
      "orders": 45,
      "revenue": 1250.0,
      "avgTicket": 27.78
    }
  }
}
```

---

### Suggestions

#### List Suggestions

```http
GET /api/ai/suggestions
```

Ottieni i suggerimenti di miglioramento.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| merchantId | uuid | Yes | Merchant ID |
| status | string | No | pending, accepted, rejected |
| category | string | No | menu, marketing, operations, financial |
| limit | integer | No | Max results (default: 20) |

**Response 200:**

```json
{
  "suggestions": [
    {
      "id": "uuid",
      "category": "menu",
      "title": "Aggiungi opzione vegetariana",
      "description": "I dati mostrano richieste crescenti per piatti vegetariani",
      "impact": "medium",
      "effort": "low",
      "status": "pending",
      "created_at": "2026-01-05T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "limit": 20,
    "offset": 0
  }
}
```

#### Submit Feedback

```http
POST /api/ai/feedback
```

Invia feedback su un suggerimento.

**Body:**

```json
{
  "suggestionId": "uuid",
  "rating": "accepted",
  "notes": "Implementeremo questa settimana"
}
```

**rating values:** `accepted`, `rejected`, `modified`

**Response 200:**

```json
{
  "success": true,
  "message": "Feedback recorded"
}
```

---

### Social Media

#### List Posts

```http
GET /api/ai/social/posts
```

Ottieni i post social.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| merchantId | uuid | Yes | Merchant ID |
| status | string | No | draft, scheduled, published |
| platform | string | No | instagram, facebook, tiktok |

**Response 200:**

```json
{
  "posts": [
    {
      "id": "uuid",
      "platform": "instagram",
      "content": "Weekend speciale! Prova la nostra nuova pizza...",
      "status": "scheduled",
      "scheduled_for": "2026-01-06T12:00:00Z",
      "hashtags": ["#pizza", "#weekend", "#gudbro"]
    }
  ]
}
```

#### Generate Post

```http
POST /api/ai/social/generate
```

Genera un nuovo post.

**Body:**

```json
{
  "merchantId": "uuid",
  "topic": "Weekend promotion",
  "platform": "instagram",
  "tone": "casual"
}
```

**tone values:** `casual`, `professional`, `fun`, `elegant`

**Response 200:**

```json
{
  "post": {
    "id": "uuid",
    "content": "Generated post content...",
    "hashtags": ["#tag1", "#tag2"],
    "suggested_image": "description for image",
    "status": "draft"
  }
}
```

---

### Tasks

#### List Tasks

```http
GET /api/ai/tasks
```

Ottieni i task delegati.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| merchantId | uuid | Yes | Merchant ID |
| status | string | No | pending, in_progress, completed, cancelled |
| assigneeId | uuid | No | Filter by assignee |
| priority | string | No | low, medium, high, urgent |

**Response 200:**

```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Ordinare forniture",
      "description": "Contattare fornitore per riordino settimanale",
      "assignee": {
        "id": "uuid",
        "name": "Mario Rossi"
      },
      "due_date": "2026-01-06T18:00:00Z",
      "priority": "medium",
      "status": "pending",
      "category": "inventory"
    }
  ]
}
```

#### Create Task

```http
POST /api/ai/tasks
```

Crea un nuovo task.

**Body:**

```json
{
  "merchantId": "uuid",
  "title": "Pulire magazzino",
  "description": "Riorganizzare scaffali e verificare scadenze",
  "assigneeId": "uuid",
  "dueDate": "2026-01-07T17:00:00Z",
  "priority": "medium",
  "category": "operations"
}
```

**category values:** `inventory`, `marketing`, `staff`, `financial`, `menu`

**Response 201:**

```json
{
  "task": {
    "id": "uuid",
    "title": "Pulire magazzino",
    "status": "pending",
    "created_at": "2026-01-05T10:00:00Z"
  }
}
```

---

### Inventory

#### Get Inventory Status

```http
GET /api/ai/inventory
```

Ottieni lo stato dell'inventario.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| merchantId | uuid | Yes | Merchant ID |
| lowStock | boolean | No | Solo items con scorte basse |
| category | string | No | Filtra per categoria |

**Response 200:**

```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Mozzarella di bufala",
      "category": "dairy",
      "quantity": 5,
      "unit": "kg",
      "min_quantity": 10,
      "supplier": {
        "id": "uuid",
        "name": "Caseificio Campano"
      },
      "low_stock": true
    }
  ],
  "summary": {
    "total_items": 45,
    "low_stock_count": 3,
    "pending_orders": 2
  }
}
```

#### Create Purchase Order

```http
POST /api/ai/inventory/orders
```

Crea un ordine di acquisto.

**Body:**

```json
{
  "merchantId": "uuid",
  "supplierId": "uuid",
  "items": [
    {
      "itemId": "uuid",
      "quantity": 20,
      "unit_price": 8.5
    }
  ],
  "notes": "Consegna prima delle 10"
}
```

**Response 201:**

```json
{
  "order": {
    "id": "uuid",
    "status": "draft",
    "total": 170.0,
    "created_at": "2026-01-05T10:00:00Z"
  }
}
```

---

### Financial

#### Get Summary

```http
GET /api/ai/financial/summary
```

Ottieni il riepilogo finanziario.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| merchantId | uuid | Yes | Merchant ID |
| period | string | Yes | week, month, quarter, year |

**Response 200:**

```json
{
  "summary": {
    "period": "month",
    "revenue": 45000.0,
    "expenses": 28000.0,
    "profit": 17000.0,
    "margin": 37.8,
    "comparison": {
      "revenue_change": 12.5,
      "expenses_change": 8.2,
      "profit_change": 18.3
    },
    "breakdown": {
      "food_cost": 15000.0,
      "labor": 8000.0,
      "utilities": 2500.0,
      "other": 2500.0
    }
  }
}
```

---

### Onboarding

#### Start/Continue Onboarding

```http
POST /api/ai/onboarding
```

Avvia o continua il flusso di onboarding.

**Body:**

```json
{
  "merchantId": "uuid",
  "step": 1,
  "data": {
    "businessName": "Pizzeria da Mario",
    "businessType": "restaurant",
    "address": "Via Roma 123, Milano"
  }
}
```

**Steps:**

1. Basic info (name, type, address)
2. Logo upload
3. Initial menu setup
4. AI preferences

**Response 200:**

```json
{
  "currentStep": 1,
  "completed": false,
  "nextStep": {
    "step": 2,
    "title": "Upload Logo",
    "description": "Carica il logo del tuo locale"
  },
  "progress": 25
}
```

---

## Error Codes

| Code | Name          | Description                     |
| ---- | ------------- | ------------------------------- |
| 400  | Bad Request   | Input non valido                |
| 401  | Unauthorized  | Token mancante o non valido     |
| 403  | Forbidden     | Permessi insufficienti          |
| 404  | Not Found     | Risorsa non trovata             |
| 422  | Unprocessable | Dati validi ma non processabili |
| 429  | Rate Limited  | Troppe richieste                |
| 500  | Server Error  | Errore interno                  |

**Error Response Format:**

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "merchantId is required",
    "details": {
      "field": "merchantId"
    }
  }
}
```

---

## Rate Limits

| Plan       | Requests/minute | Daily limit |
| ---------- | --------------- | ----------- |
| Free       | 10              | 100         |
| Pro        | 60              | 1000        |
| Enterprise | 300             | Unlimited   |

---

## Webhooks (Coming Soon)

### Available Events

| Event                 | Description                |
| --------------------- | -------------------------- |
| `briefing.generated`  | Nuovo briefing disponibile |
| `suggestion.created`  | Nuovo suggerimento AI      |
| `task.completed`      | Task completato            |
| `inventory.low_stock` | Alert scorte basse         |

---

**File:** `docs/features/ai-co-manager/API.md`
