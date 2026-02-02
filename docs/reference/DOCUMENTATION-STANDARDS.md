# GUDBRO Documentation Standards

> **Standard per documentazione tecnica e cliente**
>
> Ogni feature deve essere documentata per due audience: sviluppatori e clienti.

**Last Updated:** 2026-01-05

---

## 1. Principio Fondamentale

> **"Se non è documentato, non esiste"**

Ogni feature completata richiede:

1. **Developer Documentation** - Come funziona tecnicamente
2. **Customer Documentation** - Come usarla (quando applicabile)

---

## 2. Struttura Directory

```
docs/
├── CLAUDE.md                    # AI context (root)
├── DEVELOPMENT-WORKFLOW.md      # Workflow sviluppo
├── PROCEDURE-CHECKLIST.md       # Gate di validazione
├── DOCUMENTATION-STANDARDS.md   # Questo file
├── DATABASE-SCHEMA.md           # Schema database
├── DATABASE-INVENTORY.md        # Stato database
├── AUDIT-FRAMEWORK.md           # Template audit
├── backlog/                     # Kanban
│   ├── 1-TODO.md
│   ├── 2-IN-PROGRESS.md
│   ├── 3-TESTING.md
│   └── 4-DONE.md
└── features/                    # Feature documentation
    ├── README.md                # Index delle feature
    ├── ai-co-manager/           # AI Co-Manager docs
    │   ├── DEV.md               # Developer docs
    │   ├── USER.md              # Customer docs
    │   └── API.md               # API reference
    ├── digital-menu/            # Digital Menu docs
    │   ├── DEV.md
    │   └── USER.md
    └── [feature-name]/          # Pattern per ogni feature
        ├── DEV.md
        ├── USER.md
        └── API.md (se ha API)
```

---

## 3. Developer Documentation (DEV.md)

### Template

```markdown
# [Feature Name] - Developer Documentation

> Documentazione tecnica per sviluppatori

**Last Updated:** YYYY-MM-DD
**Status:** [Active | Deprecated | Beta]
**Owner:** [chi mantiene questa feature]

---

## Overview

[1-2 paragrafi che spiegano cosa fa la feature]

---

## Architecture

### Components

| Component | Path                | Purpose                |
| --------- | ------------------- | ---------------------- |
| Service   | `lib/[service].ts`  | Business logic         |
| API Route | `app/api/[route]`   | HTTP interface         |
| UI        | `components/[name]` | User interface         |
| Types     | `types/[name].ts`   | TypeScript definitions |

### Data Flow
```

[Diagramma ASCII o descrizione del flusso dati]
User → UI Component → API Route → Service → Database
→ External API

````

### Database Tables

| Table | Purpose | Migration |
|-------|---------|-----------|
| table_name | Descrizione | XXX-name.sql |

---

## API Reference

### Endpoints

#### POST /api/[endpoint]

**Request:**
```json
{
  "field": "type - description"
}
````

**Response:**

```json
{
  "field": "type - description"
}
```

**Errors:**
| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing auth |

---

## Configuration

### Environment Variables

| Variable   | Required | Description  |
| ---------- | -------- | ------------ |
| `VAR_NAME` | Yes/No   | What it does |

### Feature Flags

| Flag        | Default | Description |
| ----------- | ------- | ----------- |
| `FEATURE_X` | false   | Enables X   |

---

## Dependencies

### Internal

- `lib/supabase` - Database client
- `lib/openai` - AI client

### External

- OpenAI API (GPT-4)
- Supabase (PostgreSQL)

---

## Testing

### Manual Testing

1. Step 1
2. Step 2
3. Expected result

### Automated Tests

- [ ] Unit tests: `tests/[feature].test.ts`
- [ ] Integration tests: `tests/[feature].integration.ts`

---

## Known Issues

| Issue       | Workaround         | Status     |
| ----------- | ------------------ | ---------- |
| Description | How to work around | Open/Fixed |

---

## Changelog

| Date       | Change                 | Author |
| ---------- | ---------------------- | ------ |
| YYYY-MM-DD | Initial implementation | Name   |

````

---

## 4. Customer Documentation (USER.md)

### Template

```markdown
# [Feature Name] - Guida Utente

> Come utilizzare [feature] per il tuo business

**Last Updated:** YYYY-MM-DD

---

## Cos'è [Feature]?

[Spiegazione semplice in 2-3 frasi]

---

## Come Iniziare

### Prerequisiti
- [ ] Prerequisito 1
- [ ] Prerequisito 2

### Setup Iniziale

1. **Step 1: [Nome]**

   [Screenshot o descrizione]

   Cosa fare: [istruzioni chiare]

2. **Step 2: [Nome]**

   [Screenshot o descrizione]

---

## Funzionalità Principali

### [Funzionalità 1]

**Cosa fa:** [descrizione]

**Come usarla:**
1. Vai a [location]
2. Clicca su [button]
3. [result]

**Esempio:**
[Screenshot o esempio concreto]

### [Funzionalità 2]

[Stesso pattern]

---

## Domande Frequenti (FAQ)

### Come faccio a [action]?
[Risposta]

### Cosa succede se [scenario]?
[Risposta]

### Posso [action]?
[Risposta]

---

## Risoluzione Problemi

### [Problema Comune 1]

**Sintomo:** [cosa vede l'utente]

**Causa:** [perché succede]

**Soluzione:**
1. Step 1
2. Step 2

### [Problema Comune 2]

[Stesso pattern]

---

## Limiti e Piani

| Piano | Limite | Note |
|-------|--------|------|
| Free | X/mese | - |
| Pro | Y/mese | - |
| Enterprise | Unlimited | - |

---

## Supporto

Per assistenza:
- Email: support@gudbro.com
- Chat: [link]
- Docs: [link]
````

---

## 5. API Documentation (API.md)

### Template

````markdown
# [Feature] API Reference

> Documentazione API per integrazioni

**Base URL:** `https://api.gudbro.com/v1`
**Authentication:** Bearer Token

---

## Endpoints

### [Resource Name]

#### List [Resources]

```http
GET /api/[resource]
```
````

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | integer | No | Max results (default: 20) |
| offset | integer | No | Skip results |

**Response 200:**

```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}
```

#### Create [Resource]

```http
POST /api/[resource]
```

**Body:**

```json
{
  "field1": "string (required)",
  "field2": "number (optional)"
}
```

**Response 201:**

```json
{
  "id": "uuid",
  "created_at": "ISO8601"
}
```

#### Get [Resource]

```http
GET /api/[resource]/:id
```

#### Update [Resource]

```http
PATCH /api/[resource]/:id
```

#### Delete [Resource]

```http
DELETE /api/[resource]/:id
```

---

## Error Codes

| Code | Name         | Description              |
| ---- | ------------ | ------------------------ |
| 400  | Bad Request  | Invalid input            |
| 401  | Unauthorized | Missing/invalid token    |
| 403  | Forbidden    | Insufficient permissions |
| 404  | Not Found    | Resource doesn't exist   |
| 429  | Rate Limited | Too many requests        |
| 500  | Server Error | Internal error           |

---

## Rate Limits

| Plan       | Requests/minute |
| ---------- | --------------- |
| Free       | 60              |
| Pro        | 300             |
| Enterprise | 1000            |

---

## Webhooks

### Available Events

| Event              | Description          |
| ------------------ | -------------------- |
| `resource.created` | New resource created |
| `resource.updated` | Resource updated     |
| `resource.deleted` | Resource deleted     |

### Payload Format

```json
{
  "event": "resource.created",
  "timestamp": "ISO8601",
  "data": { ... }
}
```

````

---

## 6. Naming Conventions

### File Names
- Lowercase con hyphen: `ai-co-manager`, `digital-menu`
- Standard files: `DEV.md`, `USER.md`, `API.md`

### Section Headers
- Title case per headers principali
- Sentence case per sub-headers

### Code Examples
- Sempre con syntax highlighting
- Include import statements
- Mostra output atteso

---

## 7. Quality Checklist

### Prima di considerare la documentazione completa:

```markdown
## Documentation Quality Check

### DEV.md
- [ ] Overview chiaro
- [ ] Tutti i componenti listati
- [ ] Data flow documentato
- [ ] API endpoints con esempi
- [ ] Error handling documentato
- [ ] Dependencies listate

### USER.md
- [ ] Linguaggio non-tecnico
- [ ] Step-by-step con screenshots
- [ ] FAQ con problemi comuni
- [ ] Troubleshooting section

### API.md (se applicabile)
- [ ] Tutti gli endpoints documentati
- [ ] Request/Response examples
- [ ] Error codes spiegati
- [ ] Authentication documentata
````

---

## 8. Maintenance

### Quando Aggiornare

| Evento              | Azione                             |
| ------------------- | ---------------------------------- |
| Nuova feature       | Crea nuova cartella in `features/` |
| Modifica API        | Aggiorna API.md                    |
| Bug fix user-facing | Aggiorna USER.md se rilevante      |
| Refactoring interno | Aggiorna DEV.md                    |
| Breaking change     | Aggiorna TUTTI i docs + CHANGELOG  |

### Review Periodica

- **Mensile:** Verifica che i docs siano allineati al codice
- **Quarterly:** Review completa della documentazione
- **On Release:** Aggiorna version numbers

---

**File:** `docs/DOCUMENTATION-STANDARDS.md`
**Version:** 1.0
**Related:** DEVELOPMENT-WORKFLOW.md, PROCEDURE-CHECKLIST.md
