# Session Log - GUDBRO Verticals

> Diario di bordo delle sessioni di sviluppo.
> Nuove entry in cima (ordine cronologico inverso).

---

## 2026-01-15 - B2B-CONVENTIONS + ORDER-READY-NOTIFICATIONS

**Focus:** B2B Corporate Conventions System + Web Push Notifications
**Durata:** ~3h
**Tipo:** Feature Implementation

### Completato

**B2B-CONVENTIONS (tutti 6 sprint):**

- Sprint 1: Database Migration (5 tabelle + RLS + triggers)
- Sprint 2: Service Layer (conventions-service.ts ~700 righe)
- Sprint 3: API Routes (/api/ai/conventions - GET/POST/PATCH)
- Sprint 4: UI Hub + Offices pages
- Sprint 5: UI Conventions + Vouchers pages
- Sprint 6: Staff Verification tool

**KB-BACKOFFICE Update:**

- Aggiunte 5 pagine Conventions alla Knowledge Base
- Totale pagine KB: 57 (52 + 5 nuove)

**ORDER-READY-NOTIFICATIONS Phase 2 (Web Push):**

- Service Worker push event handler
- Push subscription hook (usePushNotifications)
- API endpoint per salvare subscriptions
- Backend push sender con web-push library
- Kitchen display trigger automatico
- UI toggle per Push ON/OFF nella pagina ordini
- VAPID keys setup

### File Creati

| File                                          | Descrizione                    |
| --------------------------------------------- | ------------------------------ |
| `migrations/050-b2b-conventions.sql`          | 5 tabelle, triggers, RLS       |
| `lib/ai/conventions-service.ts`               | Service layer completo         |
| `app/api/ai/conventions/route.ts`             | API endpoints                  |
| `/partnerships/conventions/page.tsx`          | Hub dashboard                  |
| `/partnerships/conventions/offices/page.tsx`  | Office partners + AI Discovery |
| `/partnerships/conventions/active/page.tsx`   | Active conventions             |
| `/partnerships/conventions/vouchers/page.tsx` | Voucher management             |
| `/partnerships/conventions/verify/page.tsx`   | Staff verification tool        |
| `lib/kb/kb-content.ts`                        | +5 pagine conventions          |
| `hooks/usePushNotifications.ts`               | Push subscription hook         |
| `app/api/push-subscription/route.ts`          | Save/delete subscriptions      |
| `app/api/send-push/route.ts` (coffeeshop)     | Send push (client-side)        |
| `app/api/send-push/route.ts` (backoffice)     | Send push from kitchen         |
| `public/service-worker.js`                    | Push event handler             |

### Tabelle Database Create

- `office_partners` - Registro uffici/aziende partner
- `merchant_office_outreach` - Pipeline CRM per outreach
- `partner_conventions` - Convenzioni attive con benefici
- `convention_vouchers` - Voucher individuali con QR
- `convention_redemptions` - Tracking utilizzo voucher

### Commit

- `6d77eca` - feat(conventions): add B2B corporate conventions system
- (pending) - feat(notifications): add web push notifications Phase 2

### Decisioni

- **RLS pattern**: Usa `account_roles.tenant_id WHERE role_type = 'merchant'` (come TOURISM-B2B)
- **Daily codes**: Formato `COMPANY-MMDD` (es. TECHCORP-0115)
- **Verification methods**: link, qr_scan, daily_code, badge_id
- **VAPID**: Keys generate con web-push CLI, salvate in .env.local
- **Push trigger**: Kitchen display chiama API quando status → 'ready'

### Prossima Sessione

- Commit e push ORDER-READY-NOTIFICATIONS
- Eventuale altro task da backlog P1/P2

---

## 2026-01-14/15 - AI-First Redesign Sprint 1

**Focus:** Completamento P0.5 Strategy + AI-FIRST-REDESIGN Sprint 1
**Durata:** ~3h (sessione lunga con continuation)
**Tipo:** Implementation

### Completato

**P0.5 Strategy:**

- ORDER-READY-NOTIFICATIONS Phase 1 (audio beep, Web Audio API) → 🟡 PARTIAL
- AI-ONBOARDING completo (chat conversazionale con GPT-4o-mini) → ✅ DONE

**AI-FIRST-REDESIGN Sprint 1:**

- Verificato componenti esistenti (AIPriorityCard, AIPrioritiesHero, OpportunityBanner)
- Aggiunto Food Cost triggers a AIPrioritiesHero (alert >35%, critical >45%)
- Aggiunto OpportunityBannerWrapper a dashboard
- AIStatusHeader già presente in Header.tsx (pulsante AI con notifiche)

### File Creati/Modificati

| File                                                 | Azione                          |
| ---------------------------------------------------- | ------------------------------- |
| `apps/website/lib/ai/openai.ts`                      | Creato - OpenAI client          |
| `apps/website/lib/ai/onboarding-chat-service.ts`     | Creato - Chat service           |
| `apps/website/app/api/ai/onboarding-chat/route.ts`   | Creato - API endpoint           |
| `apps/website/components/onboarding/ChatWidget.tsx`  | Creato - Chat UI                |
| `apps/website/app/onboarding/page.tsx`               | Creato - Pagina onboarding AI   |
| `apps/backoffice/components/ai/AIPrioritiesHero.tsx` | Modificato - Food Cost triggers |
| `apps/backoffice/app/(dashboard)/dashboard/page.tsx` | Modificato - OpportunityBanner  |

### Decisioni

- **Food Cost threshold 35%**: Alert warning, >45% diventa critical
- **Fetch parallelo**: Weather + Food Cost in Promise.all per performance
- **AIStatusHeader**: Il pulsante AI esistente con notifiche è sufficiente per Sprint 1

### Prossima Sessione

- Sprint 2: AI Triggers v2 inline (template 5 domande obbligatorie)
- Oppure altro task da backlog

---

## 2026-01-10 - Sessione Strategica: Modelli di Servizio

**Focus:** Discussione strategica su modelli di servizio locali e impatto su prodotto
**Durata:** ~2h
**Tipo:** Product strategy / Discovery

### Completato

- Mappatura 5 modelli di servizio (Table Service, Counter+Delivery, Counter+Pickup, Counter+Menu Illuminato, QR Ordering)
- Definizione tier "Menu Only" per merchant che non vogliono cambiare flusso
- Concept AI Conversational Onboarding (chat-based onboarding che diventa co-manager)
- Sistema notifiche "Ordine Pronto" (sostituzione buzzer hardware)
- Percorso upgrade cliente: Menu Only → Table Ordering → Notifiche
- Aggiunto backlog items in `docs/backlog/1-TODO.md` sezione P0.5

### Decisioni

- **Modello di servizio come prima domanda onboarding**: determina feature mostrate e pain point rilevanti
- **Menu Only come entry tier**: mercato più ampio, conversione più facile, upsell futuro
- **WhatsApp/Zalo/LINE per notifiche in Asia**: tutti li hanno aperti, zero costo
- **AI onboarding = demo live del prodotto**: il prospect sperimenta prima di pagare

### Lezioni Apprese (Cosa Claude ha imparato)

| Lezione                                     | Insight                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Regional market awareness**               | Asia ha piattaforme diverse (Zalo, LINE, KakaoTalk, WeChat). Non assumere default occidentali.        |
| **Modelli di servizio ≠ one-size-fits-all** | Ogni tipo di locale ha bisogno di feature diverse. L'onboarding deve capirlo subito.                  |
| **QR ha valore indipendente dall'ordering** | Anche senza ordering digitale, QR menu offre: accessibilità, discovery, pre-decisione.                |
| **Resistenza psicologica = costi nascosti** | Cliente che deve rialzarsi per ordinare di nuovo → meno secondi ordini. Frizione invisibile ma reale. |
| **Entry tier → upgrade path**               | Menu Only non è un tier "povero", è un piede nella porta per upsell futuro.                           |
| **AI onboarding = demo + configurazione**   | L'AI che fa onboarding È il prodotto. Il prospect lo prova prima di pagare.                           |
| **Sostituire hardware con software**        | Buzzer → notifiche telefono. Meno costi, meno manutenzione per merchant.                              |
| **UX Settings: tabs > sidebar submenu**     | Meno click, tutto vicino, meno movimento mouse. Pattern da applicare ovunque.                         |

### Argomenti di Vendita Scoperti

| Target                    | Argomento                                                          |
| ------------------------- | ------------------------------------------------------------------ |
| Counter + Menu Illuminato | "I tuoi clienti scoprono di più, ordinano di più, code più veloci" |
| Chi ha buzzer hardware    | "Elimina batterie e dispositivi persi. Il telefono è il buzzer"    |
| Chi non vuole cambiare    | "Non cambi nulla. Solo un QR sul tavolo. Risultati subito"         |

### Note

- Sessione più strategica che tecnica - focus su product thinking
- L'utente ha fatto una passeggiata per "schiarirsi la mente" e ha avuto insight importanti
- Discussione emergente, non pianificata - valore alto

### Prossima sessione

- Review backoffice changes (tabbed settings, social page)
- Eventuale implementazione delle feature discusse

---

## 2026-01-09

**Focus:** Vercel deployment fixes
**Durata:** ~2h (sessione continuata)

### Completato

- Fix website build su Vercel (mancava vercel.json per pnpm monorepo)
- Fix login backoffice su Vercel (aggiunto ENABLE_DEV_AUTH env var)
- Fix DevRoleSwitcher non visibile su Vercel (ora controlla cookie invece di NODE_ENV)
- Aggiornato docs/backlog/4-DONE.md con task completate
- Aggiunte 3 lezioni a Compounding Engineering

### Commits

- `d5b7b77` - fix(DevRoleSwitcher): show when dev session cookie exists
- `f5663a4` - feat(auth): allow dev mode via ENABLE_DEV_AUTH env var
- `b699956` - fix(website): add vercel.json for pnpm monorepo support

### Decisioni

- DevRoleSwitcher usa cookie `gudbro_dev_session` per rilevare dev mode (non NODE_ENV)
- ENABLE_DEV_AUTH=true settato su Vercel backoffice per staging/demo
- Creato SESSION-LOG.md come alternativa a Pieces MCP (non funzionante)

### Note tecniche

- Pattern per client components che devono sapere se dev mode: controllare cookie, non env vars
- Vercel monorepo: ogni app deve avere vercel.json con installCommand e buildCommand

### Prossima sessione

- Verificare che DevRoleSwitcher appaia su Vercel dopo deploy
- Continuare con task da backlog

---

## 2026-01-09 (mattina)

**Focus:** QR Builder v2 + UI improvements
**Durata:** ~4h

### Completato

- QR Builder v2 completo (313 test, 4-step wizard, export PNG/SVG/PDF)
- Sidebar collapsible con pin/unpin e hover expand
- Account page con profilo, ruoli, loyalty points
- DevRoleSwitcher per testing ruoli in development

### Commits

- `a79f2d5` - feat: QR Builder v2 + Sidebar improvements + Account page

### Decisioni

- QR usa merchant subdomain (qr.pizzeria.gudbro.com)
- Export con preset per materiali stampa (paper, tshirt, sticker, etc.)
- Sidebar state persistito in localStorage

### Files principali

- `apps/backoffice/components/qr/*` - QR Builder components
- `apps/backoffice/lib/qr/*` - QR service layer
- `apps/backoffice/components/layout/Sidebar.tsx` - New sidebar
- `apps/backoffice/app/(dashboard)/account/page.tsx` - Account page

---

## Template Entry

```markdown
## YYYY-MM-DD

**Focus:** [Cosa si e' lavorato]
**Durata:** ~Xh

### Completato

- [Task 1]
- [Task 2]

### Commits

- `hash` - message

### Decisioni

- [Decisione]: [Motivazione]

### Note tecniche

- [Pattern, soluzione, lesson learned]

### Prossima sessione

- [Cosa fare dopo]
```
