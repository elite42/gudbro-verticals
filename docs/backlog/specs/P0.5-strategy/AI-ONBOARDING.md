# AI-ONBOARDING - Onboarding Conversazionale con AI

**Priority:** P0.5 - Strategia Prodotto
**Status:** DONE
**Effort:** High
**Completed:** 2026-01-14
**Dipendenze:** Infrastruttura AI Co-Manager esistente

---

## Vision

Sito minimal con chat centrale. L'AI fa domande, capisce il business, configura il prodotto.

## Perché funziona

- **Continuità:** L'AI che fa onboarding diventa il co-manager
- **Demo live:** Il prospect sperimenta il valore AI prima di pagare
- **Zero form:** Conversazione naturale invece di 15 campi
- **Configurazione automatica:** Mentre chatta, AI costruisce il profilo
- **Qualificazione naturale:** Capisce subito se lead serio

## Implementazione (2026-01-14)

### Files Creati

**Backend:**

- `apps/website/lib/ai/openai.ts` - OpenAI client per website
- `apps/website/lib/ai/onboarding-chat-service.ts` - Servizio chat conversazionale
- `apps/website/app/api/ai/onboarding-chat/route.ts` - API endpoint

**Frontend:**

- `apps/website/components/onboarding/ChatWidget.tsx` - Componente chat
- `apps/website/app/onboarding/page.tsx` - Pagina onboarding AI

### Funzionalità

1. **Chat conversazionale** con GPT-4o-mini
2. **Field capture** automatico tramite OpenAI tools
3. **Progress bar** che mostra % completamento
4. **Session management** con sessionToken
5. **Rate limiting** in-memory (20 req/min)
6. **Multi-lingua** - risponde nella lingua dell'utente

### Campi Raccolti

| Campo            | Priorità | Required |
| ---------------- | -------- | -------- |
| business_name    | 1        | Yes      |
| business_type    | 2        | Yes      |
| country_code     | 3        | Yes      |
| city             | 4        | No       |
| location_address | 5        | No       |
| phone            | 6        | No       |
| primary_color    | 7        | No       |

### Flow

```
1. Utente va a /onboarding
2. Inserisce email → startOnboarding() crea session
3. AI saluta e chiede nome business
4. Utente risponde → AI usa save_business_info tool
5. AI conferma e chiede prossimo campo
6. Quando required completi → redirect a /sign-up
```

### URL

- **Produzione:** `gudbro.com/onboarding`
- **Alternativa:** Link "Prefer AI setup?" da /sign-up

## UI

```
┌─────────────────────────────────────────┐
│  GUDBRO              [Skip to form]     │
├─────────────────────────────────────────┤
│  Setup Progress                    33%  │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Ciao! Sono il tuo futuro        │   │
│  │ co-manager. Raccontami del tuo  │   │
│  │ locale - che tipo di attività è?│   │
│  └─────────────────────────────────┘   │
│                                         │
│                    ┌───────────────────┐│
│                    │ È un caffè a Roma ││
│                    └───────────────────┘│
│                                         │
│  [Type your message...        ] [Send]  │
│                                         │
└─────────────────────────────────────────┘
```

---

**Related:** SERVICE-MODELS, TIER-MENU-ONLY
