# Architettura Sistema GUDBRO

> Overview tecnica dell'architettura per nuovi sviluppatori.
> Aggiornato: 2026-01-17

---

## Stack Tecnologico

| Layer           | Tecnologia            | Versione |
| --------------- | --------------------- | -------- |
| Frontend        | Next.js               | 14.2.x   |
| UI Library      | React                 | 18.3.x   |
| Styling         | Tailwind CSS          | 3.4.x    |
| Database        | PostgreSQL (Supabase) | 15.x     |
| Auth            | Supabase Auth         | -        |
| Storage         | Supabase Storage      | -        |
| AI              | OpenAI GPT-4          | -        |
| Caching         | Upstash Redis         | -        |
| Deploy          | Vercel                | -        |
| Monorepo        | Turborepo             | 2.x      |
| Package Manager | pnpm                  | 9.15.x   |

---

## Struttura Monorepo

```
gudbro-verticals/
├── apps/                    # Applicazioni
│   ├── backoffice/          # Dashboard merchant (:3023) ⭐ PRINCIPALE
│   ├── coffeeshop/          # Digital menu PWA (:3004)
│   ├── website/             # Marketing site (:3000)
│   ├── rentals/             # Vertical noleggi (futuro)
│   └── wellness/            # Vertical wellness (futuro)
│
├── shared/                  # Codice condiviso
│   └── database/            # Schema DB, migrations, seeds
│       ├── migrations/      # 58+ migrations SQL
│       ├── cuisines/        # Dati cucine (asian, european, etc.)
│       ├── beverages/       # Dati bevande
│       └── ingredients/     # 2548 ingredienti master
│
├── packages/                # Pacchetti condivisi (futuro)
│
├── docs/                    # Documentazione
│   ├── backlog/             # Kanban system
│   ├── dev/                 # Docs per sviluppatori
│   ├── features/            # Feature documentation
│   └── qa/                  # Quality assurance
│
└── CLAUDE.md                # Guida Claude Code
```

---

## Applicazioni Principali

### 1. Backoffice (apps/backoffice)

**Scopo:** Dashboard gestionale per merchant (ristoranti, café, bar)

**URL Produzione:** https://backoffice.gudbro.com
**URL Dev:** http://localhost:3023

**Struttura:**

```
apps/backoffice/
├── app/                     # Next.js App Router
│   ├── (auth)/              # Pagine auth (login, signup)
│   ├── (dashboard)/         # Pagine dashboard (protette)
│   │   ├── analytics/       # Statistiche
│   │   ├── chat/            # AI Co-Manager chat
│   │   ├── customers/       # Gestione clienti
│   │   ├── events/          # Eventi e promozioni
│   │   ├── intelligence/    # Smart Map, Zone Intel
│   │   ├── menu/            # Gestione menu
│   │   ├── orders/          # Ordini
│   │   ├── qr-codes/        # QR Builder
│   │   ├── reservations/    # Prenotazioni + Floor Plan
│   │   ├── settings/        # Impostazioni
│   │   └── team/            # Gestione staff
│   └── api/                 # API Routes
│       ├── ai/              # 20+ AI endpoints
│       ├── chat/            # Customer chat + webhooks
│       └── ...
│
├── components/              # Componenti React
│   ├── ui/                  # Componenti base (Button, Card, etc.)
│   ├── chat/                # Chat components
│   ├── map/                 # Map components (Leaflet)
│   ├── menu/                # Menu management
│   ├── qr/                  # QR Builder
│   └── reservations/        # Reservations UI
│
├── lib/                     # Business logic
│   ├── ai/                  # 15+ AI services ⭐
│   ├── auth/                # Auth utilities
│   ├── cache/               # Redis caching
│   ├── notifications/       # Push notifications
│   ├── reservations/        # Booking logic
│   ├── security/            # Rate limiting, encryption
│   └── ...
│
└── types/                   # TypeScript types
```

### 2. Coffeeshop PWA (apps/coffeeshop/frontend)

**Scopo:** Menu digitale per clienti finali (scan QR → ordina)

**URL Dev:** http://localhost:3004

**Features:**

- Menu browsing con filtri
- Carrello e checkout
- Login cliente (opzionale)
- Loyalty points
- Multi-lingua

### 3. Website (apps/website)

**Scopo:** Marketing site per acquisizione merchant

---

## AI Co-Manager System

Il cuore dell'applicazione è l'**AI Co-Manager**, un assistente AI che aiuta i merchant nelle operazioni quotidiane.

### AI Services (apps/backoffice/lib/ai/)

| Service                         | Scopo                                   |
| ------------------------------- | --------------------------------------- |
| `chat-service`                  | Chat principale con merchant            |
| `knowledge-service`             | Accesso dati (menu, ordini, clienti)    |
| `actions-service`               | Azioni (crea evento, traduci, aggiorna) |
| `proactivity-service`           | Briefing giornalieri, alert             |
| `bootstrap-service`             | Zone analysis, competitor discovery     |
| `market-intelligence-service`   | Prezzi mercato, partnership             |
| `social-media-service`          | Generazione post, calendari             |
| `financial-service`             | P&L, budget, forecast                   |
| `customer-intelligence-service` | Analisi comportamento clienti           |
| `onboarding-service`            | Setup guidato nuovo merchant            |
| `agentic-workflow-service`      | Automazioni multi-step                  |
| `inventory-negotiation-service` | Gestione fornitori, ordini              |
| `feedback-loop-service`         | Raccolta feedback                       |
| `learning-progress-service`     | Tracking apprendimento AI               |
| `holidays-service`              | Gestione festività                      |
| `conventions-service`           | Convenzioni B2B                         |

### AI Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Merchant  │────▶│  Chat API    │────▶│  OpenAI     │
│   (Browser) │     │  /api/ai/    │     │  GPT-4      │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Knowledge   │
                    │  Service     │
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Supabase    │
                    │  (Postgres)  │
                    └──────────────┘
```

---

## Database Architecture

### Supabase (PostgreSQL)

**~100 tabelle** organizzate in categorie:

| Categoria    | Esempi Tabelle                         | Descrizione       |
| ------------ | -------------------------------------- | ----------------- |
| Core         | merchants, locations, accounts         | Entità principali |
| Menu         | menu_items, menu_categories, modifiers | Sistema menu      |
| Orders       | orders, order_items                    | Gestione ordini   |
| Reservations | reservations, tables, blocked_slots    | Prenotazioni      |
| Loyalty      | loyalty_points, loyalty_transactions   | Punti fedeltà     |
| AI           | ai\_\*, 20+ tabelle                    | Dati AI system    |
| Analytics    | analytics_events                       | Tracking eventi   |
| Chat         | conversations, messages                | Customer chat     |

**Schema completo:** `docs/DATABASE-SCHEMA.md`
**Migrations:** `shared/database/migrations/schema/`

### Row Level Security (RLS)

Tutte le tabelle hanno RLS attivo. Pattern comune:

```sql
-- Merchant può vedere solo i propri dati
CREATE POLICY "merchant_isolation" ON orders
  USING (merchant_id = auth.jwt() ->> 'merchant_id');
```

---

## API Architecture

### Next.js API Routes

Tutti gli endpoint sono in `apps/backoffice/app/api/`

**Pattern standard:**

```typescript
// app/api/[resource]/route.ts
export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = await withRateLimit(request, 'api');
  if (rateLimitResult) return rateLimitResult;

  // Auth check
  const session = await getSession();
  if (!session) return unauthorized();

  // Business logic
  const data = await fetchData();

  return NextResponse.json(data);
}
```

### Webhooks

| Channel  | Endpoint                     | Signature                       |
| -------- | ---------------------------- | ------------------------------- |
| Telegram | `/api/chat/webhook/telegram` | X-Telegram-Bot-Api-Secret-Token |
| WhatsApp | `/api/chat/webhook/whatsapp` | X-Hub-Signature-256             |
| LINE     | `/api/chat/webhook/line`     | x-line-signature                |
| Zalo     | `/api/chat/webhook/zalo`     | x-zalo-signature                |

---

## Caching Layer

### Upstash Redis

```
┌─────────┐     ┌─────────┐     ┌─────────────┐
│ Request │────▶│  Cache  │────▶│  Database   │
└─────────┘     │  Check  │     │  (if miss)  │
                └─────────┘     └─────────────┘
```

**Cache keys pattern:**

- `menu:{slug}` - Menu data (TTL: 5 min)
- `merchant:{id}:config` - Config (TTL: 1 hour)
- `session:{id}` - Session data (TTL: 24 hours)

**Implementazione:** `lib/cache/redis.ts`

---

## Authentication

### Supabase Auth

- Email/Password
- Magic Link
- OAuth (Google, Facebook)

### Session Flow

```
1. User login → Supabase Auth
2. JWT token → Cookie
3. API request → Validate JWT
4. RLS → Filter data by merchant_id
```

---

## Deploy Architecture

### Vercel

```
┌─────────────────────────────────────────────┐
│                   Vercel                     │
│  ┌─────────────┐  ┌─────────────┐           │
│  │  Backoffice │  │  PWA        │           │
│  │  (Next.js)  │  │  (Next.js)  │           │
│  └─────────────┘  └─────────────┘           │
│         │                │                   │
│         └────────┬───────┘                   │
│                  ▼                           │
│         ┌─────────────┐                      │
│         │  Edge       │                      │
│         │  Network    │                      │
│         └─────────────┘                      │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│              Supabase                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │Postgres │ │  Auth   │ │ Storage │       │
│  └─────────┘ └─────────┘ └─────────┘       │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│              Upstash Redis                   │
│         (Caching + Rate Limiting)            │
└─────────────────────────────────────────────┘
```

---

## Convenzioni Chiave

### File Naming

- Componenti: `PascalCase.tsx` (es. `QRPreview.tsx`)
- Utilities: `kebab-case.ts` (es. `rate-limiter.ts`)
- Types: `kebab-case.ts` (es. `qr-types.ts`)

### Import Paths

```typescript
// Usa alias @/
import { Button } from '@/components/ui/Button';
import { redis } from '@/lib/cache';
```

### API Response Format

```typescript
// Success
{ success: true, data: {...} }

// Error
{ error: 'Error message', code: 'ERROR_CODE' }
```

---

## Prossimi Passi

1. **Coding Standards** → `docs/dev/CODING-STANDARDS.md`
2. **Prima Task** → `docs/dev/FIRST-TASK.md`
3. **Database Schema** → `docs/DATABASE-SCHEMA.md`
