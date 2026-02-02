# GUDBRO Verticals — Audit 360°

> **Data:** 2026-02-02
> **Versione:** 1.0
> **Scope:** Intero monorepo (9 PWA, backoffice, shared, database, docs)
> **Metodo:** 7 agenti paralleli specializzati per area

---

## Score Complessivo: 6.7/10

| Area                            | Score      | Stato         |
| ------------------------------- | ---------- | ------------- |
| Cross-Vertical Consistency      | **4.0/10** | CRITICO       |
| Architecture & Patterns         | **6.5/10** | DA MIGLIORARE |
| Frontend Best Practices         | **6.5/10** | DA MIGLIORARE |
| TypeScript & Code Quality       | **7.2/10** | BUONO         |
| Documentation & Maintainability | **7.5/10** | BUONO         |
| Database & Migrations           | **7.5/10** | BUONO         |
| Security                        | **7.5/10** | BUONO         |

**Target post-fix:** 8.5+/10

---

## 1. CROSS-VERTICAL CONSISTENCY (4.0/10)

### Stato Attuale

Due tier di maturita:

- **Tier 1 (Production):** Coffeeshop, Accommodations — pattern sofisticati, middleware, provider, 50+ componenti
- **Tier 2 (Template/MVP):** Gym, Wellness, Laundry, Pharmacy, Workshops — 1-3 componenti, layout minimali

### Critical

| ID     | Problema                      | Dettaglio                                                                                                 |
| ------ | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| CON-C1 | Nessuna libreria UI condivisa | 4 implementazioni diverse di BottomNav, componenti duplicati ovunque                                      |
| CON-C2 | 3 librerie icone diverse      | Phosphor (accommodations), Lucide (coffeeshop legacy), SVG inline (gym/laundry/pharmacy/workshops)        |
| CON-C3 | 5 sistemi colori Tailwind     | CSS vars, HSL vars, hardcoded, default — ogni app diversa                                                 |
| CON-C4 | Config frammentate            | tsconfig aliases diversi (1-6 per app), next.config format misti (.js/.ts, module.exports/export default) |
| CON-C5 | Nessun middleware condiviso   | Solo coffeeshop e waiter hanno middleware, pattern incompatibili                                          |

### Warning

| ID     | Problema                     | Dettaglio                                                                          |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------- |
| CON-W1 | Dependency versioning misto  | Next.js ^14.0.0 (loose) vs 14.2.33 (pinned)                                        |
| CON-W2 | State management frammentato | localStorage (coffeeshop), Context (backoffice), Zustand (waiter), nessuno (altri) |
| CON-W3 | Layout root vuoti            | 4 app con layout.tsx quasi vuoto (wellness, laundry, pharmacy, workshops)          |

### Divergenze Giustificate vs Ingiustificate

**Giustificate (vertical-specific):**

- Coffeeshop: UI complessa per ordinazione (modali, sidebar, cart)
- Accommodations: Property listing + booking + Stripe
- Tours: Payment integration + catalogo tour
- Gym: Day pass drawer + membership

**Ingiustificate (da consolidare):**

- BottomNav (4 implementazioni)
- usePriceFormat (copiato 4 volte)
- currency-converter (copiato 4 volte)
- currency-preferences (copiato 6 volte)
- Tailwind theming (5 approcci diversi)
- TypeScript path aliases (nessuno standard)
- Layout provider pattern (ogni app reinventa)

### Top 3 Raccomandazioni

1. **Creare shared UI component library** — BottomNav, Button, Modal, Drawer, Card in `shared/ui/`
2. **Standardizzare config** — tsconfig.app.json, tailwind.preset.js, next.config.base.js in `shared/config/`
3. **Creare shared hooks/utils** — usePriceFormat, currency-converter, currency-preferences in `shared/hooks/` e `shared/utils/`

---

## 2. ARCHITECTURE & PATTERNS (6.5/10)

### Sub-scores

| Categoria              | Score |
| ---------------------- | ----- |
| Separation of Concerns | 7/10  |
| Component Composition  | 6/10  |
| Hook Patterns          | 7/10  |
| State Management       | 5/10  |
| API Routes             | 8/10  |
| Middleware             | 8/10  |
| Shared Modules         | 4/10  |
| Data Fetching          | 7/10  |

### Critical

| ID     | Problema                             | Dettaglio                                                                                                                              |
| ------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| ARC-C1 | God component ModernChatMenuV3       | 860 righe, 8 responsabilita (chat, menu, WiFi, cart, orders, profile, onboarding, language), 10+ props drilled, impossibile da testare |
| ARC-C2 | Duplicazione massiva cross-verticale | usePriceFormat x4, currency-converter x4, currency-preferences x6 — manutenzione 4x                                                    |

### Warning

| ID     | Problema                       | Dettaglio                                                                                            |
| ------ | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| ARC-W1 | State management inconsistente | 3 pattern diversi: localStorage stores con custom events, React Context, custom hooks senza standard |
| ARC-W2 | Missing loading/error states   | ChatWidget, ReservationCalendar, OrderManagement — operazioni async senza error recovery UI          |
| ARC-W3 | Prop drilling                  | ReservationCalendar -> ReservationDialog -> sub-components (3+ livelli, 5+ props)                    |
| ARC-W4 | API route handlers grandi      | ai/chat 100+ righe, accommodations routes mix di concerns                                            |

### Anti-pattern Trovati

1. **Prop drilling** (3+ livelli in alcune catene)
2. **God components** (ModernChatMenuV3: 860 righe)
3. **Code duplication** (usePriceFormat x4, currency-converter x4)
4. **Inconsistent state management** (3 pattern diversi)
5. **Missing error states** (operazioni async senza error handling)

### Pattern Positivi

- Middleware pattern eccellente (domain resolution, auth, 2FA)
- Custom hooks per data fetching ben progettati (useOrderTracking, useBookingForm)
- API route RESTful con rate limiting
- Realtime + polling fallback (ChatWidget)

### Top 3 Raccomandazioni

1. **Creare shared utilities library** — eliminare 95% duplicazione (usePriceFormat, currency-converter in shared/)
2. **Refactorare ModernChatMenuV3** — split in ChatContainer, MenuBrowser, CartManager, WiFiQR + standardizzare su Zustand
3. **Implementare unified error handling** — creare `useAsyncState` hook, aggiungere error states a tutti i componenti async

---

## 3. FRONTEND BEST PRACTICES (6.5/10)

### Performance

| Metrica            | Score | Dettaglio                                                                 |
| ------------------ | ----- | ------------------------------------------------------------------------- |
| Image Optimization | 4/10  | Solo Tours usa next/image. Gym/Laundry/Pharmacy usano CSS backgroundImage |
| Code Splitting     | 2/10  | Nessun Suspense boundary, no dynamic imports in main components           |
| Service Worker     | 1/10  | Solo Coffeeshop implementato (cache-first images, network-first API)      |
| CSS Variables      | 7/10  | Tutte le app usano vars, solo Coffeeshop completa dark mode               |
| Responsive         | 6/10  | Mobile-first OK, touch targets inconsistenti (32px vs 44px raccomandati)  |

### Critical

| ID    | Problema                    | Dettaglio                                                                                                                                    |
| ----- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| FE-C1 | Zero error boundaries       | Nessun error.tsx in nessuna delle 9 PWA. Crash componente = schermo bianco                                                                   |
| FE-C2 | Nessun loading.tsx          | No loading state a livello route, nessuno skeleton pattern (eccetto Tours TourCardSkeleton e Coffeeshop ProductCard)                         |
| FE-C3 | Image optimization mancante | 7/9 PWA non usano next/image. CSS backgroundImage URLs non ottimizzate                                                                       |
| FE-C4 | Accessibilita carente       | Workshops: 0 aria-labels. Pharmacy: no button roles. Nessun focus indicator visibile. Color contrast --text-tertiary (#a8a29e) sotto WCAG AA |

### Warning

| ID    | Problema                   | Dettaglio                                                                                                   |
| ----- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| FE-W1 | Dark mode frammentato      | Solo coffeeshop lo supporta (darkMode: 'class'). 8/9 app senza dark mode                                    |
| FE-W2 | PWA manifest inconsistente | Coffeeshop eccellente (8 icon sizes, screenshots, shortcuts). Gym ha path icone SBAGLIATE (192px per 512px) |
| FE-W3 | No offline support         | 8/9 app senza service worker                                                                                |
| FE-W4 | SEO: nessun sitemap        | Nessuna app genera sitemap.xml                                                                              |
| FE-W5 | Touch targets piccoli      | Molti bottoni h-8 w-8 (32px) vs raccomandato 44px+                                                          |

### Consistency Checklist

| Categoria           | Target | Attuale | Gap     |
| ------------------- | ------ | ------- | ------- |
| Error boundaries    | 100%   | 0%      | 9/9 app |
| Loading states      | 100%   | 20%     | 7/9 app |
| Image optimization  | 100%   | 22%     | 7/9 app |
| Dark mode           | 100%   | 11%     | 8/9 app |
| Service worker      | 100%   | 11%     | 8/9 app |
| Aria labels         | 100%   | 5%      | 9/9 app |
| Manifest icons (8+) | 100%   | 11%     | 8/9 app |
| Sitemap             | 100%   | 0%      | 9/9 app |

### Top 3 Raccomandazioni

1. **Implementare error boundaries** — creare shared error.tsx, aggiungere a tutte le PWA
2. **Standardizzare image optimization** — convertire CSS backgroundImage a next/image, aggiungere sizes prop
3. **Chiudere gap accessibilita** — aria-labels su bottoni icona, focus indicators, fix color contrast

---

## 4. TYPESCRIPT & CODE QUALITY (7.2/10)

### Sub-scores

| Categoria              | Score  |
| ---------------------- | ------ |
| Type Safety            | 7/10   |
| Error Handling         | 6.5/10 |
| Code Organization      | 8/10   |
| Strictness Consistency | 6/10   |
| Developer Experience   | 7.5/10 |

### Metriche

| Metrica                           | Valore   |
| --------------------------------- | -------- |
| File TypeScript/TSX               | 4,594    |
| Righe di codice                   | ~662K    |
| Catch block totali                | 1,083    |
| `as any/unknown`                  | 142      |
| `@ts-ignore` / `@ts-expect-error` | 11       |
| Tipi locali duplicati             | 531 file |

### Critical

| ID    | Problema                              | Dettaglio                                                                                                 |
| ----- | ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| TS-C1 | Strict mode disabilitato parzialmente | Backoffice e Coffeeshop: `noUnusedLocals: false`, `noUnusedParameters: false`, `noImplicitReturns: false` |
| TS-C2 | 142 type assertions non sicure        | `as CurrencyCode`, `as SortOption`, `as string` senza type guard                                          |
| TS-C3 | 426+ catch block senza type safety    | `catch (error)` generico, nessuna custom error class, nessun error discrimination                         |

### Warning

| ID    | Problema                           | Dettaglio                                                                                    |
| ----- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| TS-W1 | Dead code e blocchi commentati     | 954 file con codice commentato, nessuna regola ESLint per prevenirlo                         |
| TS-W2 | JSON parsing non sicuro            | `await request.json().catch(() => ({}))` — ritorna oggetto vuoto su errore parse             |
| TS-W3 | Tipi locali duplicati              | 531 file con interface locali (MenuItem, MerchantCharge, User) invece di importare da shared |
| TS-W4 | Solo 7 ErrorBoundary su 4,594 file | Nessun error boundary wrapper in shared/ui                                                   |
| TS-W5 | tsconfig inheritance inconsistente | Waiter standalone, gym/wellness/laundry inline, nessun extends base                          |

### Info

| ID    | Nota                   | Dettaglio                                                                        |
| ----- | ---------------------- | -------------------------------------------------------------------------------- |
| TS-I1 | Supabase types manuali | Non auto-generati con `supabase gen types` — rischio drift dallo schema          |
| TS-I2 | Nessun branded type    | AccountId, MerchantId, OrderId tutti `string` — no type safety dominio           |
| TS-I3 | Hook typing adeguato   | 24 custom hooks, 1,847 useState/useCallback, quasi tutti tipizzati correttamente |

### Top 3 Raccomandazioni

1. **Enforce strict mode su tutte le app** — abilitare `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
2. **Creare error handling standard library** — AppError class, handleCatch utility, safeParse helper in shared/utils
3. **Consolidare tipi in @gudbro/types con codegen** — auto-generare Supabase types, consolidare DTO, un source of truth

---

## 5. DOCUMENTATION & MAINTAINABILITY (7.5/10)

### Sub-scores

| Categoria            | Score |
| -------------------- | ----- |
| README/docs accuracy | 8/10  |
| Inline comments      | 6/10  |
| Component naming     | 10/10 |
| Folder navigability  | 8/10  |
| PRD completeness     | 5/10  |
| Knowledge base       | 6/10  |
| Lessons learned      | 8/10  |
| Backlog management   | 9/10  |
| Migration docs       | 9/10  |
| API documentation    | 2/10  |
| Architecture docs    | 7/10  |
| Onboarding           | 7/10  |

### Critical

| ID     | Problema                | Dettaglio                                                                          |
| ------ | ----------------------- | ---------------------------------------------------------------------------------- |
| DOC-C1 | 3 PRD mancanti          | Gym, Waiter, Rentals — prodotto esiste ma spec no                                  |
| DOC-C2 | Zero documentazione API | 141 endpoint in apps/backoffice/app/api/, nessun index centralizzato, nessun JSDoc |

### Warning

| ID     | Problema                  | Dettaglio                                                                                            |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| DOC-W1 | Knowledge base incompleta | 6 ADR/pattern marcati TODO: zustand, phosphor, v2-arch, connected-component, tier-gating, store-sync |
| DOC-W2 | Inline comments scarsi    | <10% delle API routes hanno JSDoc. Buoni naming, ma insufficiente per junior dev                     |
| DOC-W3 | Docs frammentazione       | File in docs/, docs/core/, docs/reference/ con duplicazione                                          |

### Punti di Forza

- Component naming eccellente (DisplayPreferencesModal, SafetyFilterIcons — auto-documentanti)
- Migration docs con header block esemplari (migration 050)
- Backlog ben gestito (4 file, max 3 in-progress, workflow chiaro)
- Onboarding doc strutturato (3 giorni, checklist)

### Top 3 Raccomandazioni

1. **Creare API documentation index** — docs/reference/API.md con tutti gli endpoint, auth requirements, rate limits
2. **Completare PRD mancanti** — Gym, Waiter, Rentals (usare accommodations/PRD.md come template)
3. **Popolare Knowledge Base ADR** — 6 file in docs/knowledge/decisions/ e docs/knowledge/patterns/

---

## 6. DATABASE & MIGRATIONS (7.5/10)

### Metriche

| Metrica                    | Valore      |
| -------------------------- | ----------- |
| Migrations totali          | 114         |
| Schema files               | 101         |
| SECURITY DEFINER functions | 139         |
| SECURITY INVOKER functions | 0           |
| Tabelle con RLS            | ~95%        |
| TIMESTAMPTZ usage          | 463 istanze |
| CREATE POLICY statements   | 673         |

### Critical

| ID    | Problema                            | Dettaglio                                                                                     |
| ----- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| DB-C1 | RLS WITH CHECK (true) su tabelle AI | ai_delegated_tasks, ai_task_templates, ai_workflow_definitions — INSERT senza restrizioni     |
| DB-C2 | Timestamp types misti               | 463 TIMESTAMPTZ (buono) ma alcune view usano `timestamp without time zone` — rischio timezone |
| DB-C3 | Naming convention inconsistente     | accom*\* per accommodations, ai*\* per AI, ma accounts/orders/events senza prefisso           |
| DB-C4 | FK CASCADE behavior non documentato | Mix di ON DELETE CASCADE vs SET NULL senza standard chiaro                                    |

### Warning

| ID    | Problema                                  | Dettaglio                                                                              |
| ----- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| DB-W1 | 139 SECURITY DEFINER, 0 INVOKER           | Tutte le funzioni bypassano RLS. User-facing functions dovrebbero usare INVOKER        |
| DB-W2 | Index mancanti su FK                      | ~70% FK con index, ma accom_bookings.property_id e merchant_users.merchant_id scoperti |
| DB-W3 | Nessun commento su RLS policy             | 673 policy, 0 con COMMENT ON POLICY                                                    |
| DB-W4 | JSONB senza schema validation             | operating_hours, crypto_wallets, permissions — nessun JSON schema documentato          |
| DB-W5 | Materialized views senza refresh strategy | Views analytics (migration 061, 075, 076) create ma non indicizzate                    |

### Punti di Forza

- RLS coverage ~95% delle tabelle
- Tutte le query nelle API route usano Supabase SDK parametrizzato (zero SQL injection)
- CHECK constraints al posto di ENUM (estensibili)
- TIMESTAMPTZ usato ampiamente (timezone-aware)

### Top 3 Raccomandazioni

1. **Hardening RLS tabelle AI** — sostituire WITH CHECK (true) con ownership checks espliciti
2. **Standardizzare timestamp e timezone** — audit e enforce TIMESTAMPTZ, utility function per calcoli
3. **Stabilire naming convention tabelle** — core*\* per tabelle base, {vertical}*\* per vertical-specifiche

---

## 7. SECURITY (7.5/10)

### Critical

| ID     | Problema                              | Rischio                                                | Location                                              |
| ------ | ------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| SEC-C1 | Orders SELECT permissiva              | Qualsiasi utente autenticato legge TUTTI gli ordini    | coffeeshop/api/orders/route.ts                        |
| SEC-C2 | No rate limiting su endpoint pubblici | DoS e booking spam                                     | /api/booking POST, /api/orders POST, /api/charges GET |
| SEC-C3 | Admin API key timing attack           | String comparison non constant-time                    | backoffice/lib/accommodations/helpers.ts:19           |
| SEC-C4 | Fallback Supabase a ANON key          | SERVICE_ROLE_KEY mancante = downgrade silenzioso       | coffeeshop/api/orders/route.ts:9                      |
| SEC-C5 | Booking code brute-force              | 6 char = ~31M combinazioni, fattibile senza rate limit | accommodations/api/stay/[code]/route.ts               |

### Warning

| ID     | Problema                           | Rischio                                              | Dettaglio                                       |
| ------ | ---------------------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| SEC-W1 | Guest JWT senza audience/issuer    | Token riutilizzabile cross-app                       | accommodations/lib/auth.ts                      |
| SEC-W2 | Template literal in payment script | XSS potenziale (mitigato da UUID validation)         | accommodations/app/booking/[code]/page.tsx      |
| SEC-W3 | Query param status non validato    | Injection in filtro Supabase (mitigato da admin key) | backoffice/api/accommodations/bookings/route.ts |
| SEC-W4 | PWA senza security headers         | Nessun CSP, HSTS, X-Frame-Options sulle PWA          | accommodations/frontend/next.config.js          |

### Punti di Forza

- Zero SQL injection (tutte query parametrizzate via Supabase SDK)
- Nessun rendering diretto di HTML non sanitizzato nei componenti customer-facing
- Webhook signature verification con timing-safe HMAC (Stripe, WhatsApp)
- Secrets ben protetti (SERVICE_ROLE_KEY, GUEST_JWT_SECRET mai NEXT_PUBLIC)
- Backoffice security headers eccellenti (HSTS, CSP, X-Frame-Options, Permissions-Policy)
- Rate limiter infrastructure esiste (solo da applicare ovunque)

### OWASP Top 10 Compliance

| Vulnerabilita                 | Stato                             |
| ----------------------------- | --------------------------------- |
| A01 Broken Access Control     | Warning (RLS permissiva ordini)   |
| A02 Cryptographic Failures    | OK                                |
| A03 Injection                 | OK (zero SQL injection)           |
| A04 Insecure Design           | Warning (booking code entropy)    |
| A05 Security Misconfiguration | Warning (PWA senza headers)       |
| A06 Vulnerable Components     | OK                                |
| A07 Auth Failures             | Warning (timing attack admin key) |
| A08 Data Integrity            | OK                                |
| A09 Logging Failures          | Warning (audit logs incompleti)   |
| A10 SSRF                      | OK                                |

### Top 3 Raccomandazioni

1. **Rate limiting su endpoint pubblici** — applicare withRateLimit a /api/booking, /api/orders, /api/charges
2. **Fix RLS orders** — filtrare per session_id/merchant_id, non USING (true)
3. **Fix Admin API key** — usare crypto.timingSafeEqual(), rimuovere fallback ANON key

---

## TOP 10 AZIONI PRIORITARIE (Riepilogo)

| #      | Azione                               | Area         | Impatto                     | Sforzo     |
| ------ | ------------------------------------ | ------------ | --------------------------- | ---------- |
| **1**  | Rate limiting su endpoint pubblici   | Security     | Previene DoS/enumeration    | Basso      |
| **2**  | Fix RLS orders (session_id filter)   | Security     | Previene data leak          | Basso      |
| **3**  | Creare shared/hooks/ e shared/utils/ | Architecture | -300+ righe duplicate       | Medio      |
| **4**  | Aggiungere error.tsx a tutte le PWA  | Frontend     | Previene crash bianco       | Basso      |
| **5**  | Fix Admin API key (timingSafeEqual)  | Security     | Previene timing attack      | Basso      |
| **6**  | Standardizzare config in shared/     | Consistency  | Una base, N app             | Medio      |
| **7**  | Creare BottomNav condiviso           | Consistency  | 4 impl in 1                 | Medio      |
| **8**  | Strict mode completo + cleanup       | TypeScript   | Previene bug silenziosi     | Medio-Alto |
| **9**  | Spezzare ModernChatMenuV3            | Architecture | Testabilita, manutenibilita | Alto       |
| **10** | API documentation index              | Docs         | Sblocca onboarding          | Basso      |

---

## PRODUCTION READINESS

| Criterio           | Stato    | Note                                  |
| ------------------ | -------- | ------------------------------------- |
| SQL Injection      | OK       | Supabase SDK parametrizzato           |
| XSS                | OK       | Nessun rendering HTML non sanitizzato |
| Auth & JWT         | Warning  | Fix timing attack e fallback          |
| HTTPS/HSTS         | Parziale | Backoffice OK, PWA da hardening       |
| RLS Coverage       | Warning  | 95% tabelle, policy permissive        |
| Error Recovery     | Critico  | Zero error boundaries                 |
| Rate Limiting      | Critico  | Infra esiste, non applicata           |
| Offline/PWA        | Critico  | Solo coffeeshop                       |
| Image Optimization | Warning  | Solo tours usa next/image             |
| Accessibility      | Warning  | Gaps significativi                    |
| Documentation      | Warning  | API docs mancanti                     |

**Verdetto:**

- **Coffeeshop + Accommodations:** Production-ready con riserve (fix security necessari)
- **Altre 7 PWA:** Template/MVP, necessitano consolidamento
- **Database:** Solido, miglioramenti incrementali
- **Backoffice:** Buono, security headers eccellenti

**Con le top 10 azioni implementate:** score da 6.7 a 8.5+/10

---

## METODOLOGIA

Audit condotto con 7 agenti specializzati in parallelo:

1. **Cross-Vertical Consistency** — confronto struttura, naming, config tra tutti i verticali
2. **TypeScript & Code Quality** — strictness, type safety, dead code, duplication
3. **Security** — RLS, auth, input validation, XSS, SQL injection, secrets
4. **Architecture & Patterns** — separation of concerns, composition, state management, API structure
5. **Database & Migrations** — schema design, RLS coverage, function security, index strategy
6. **Frontend Best Practices** — accessibilita, responsive, performance, PWA compliance, SEO
7. **Documentation & Maintainability** — accuracy, PRDs, knowledge base, onboarding

Ogni agente ha analizzato il codice sorgente direttamente (file read, grep, glob) senza eseguire build o test.

---

_Report generato il 2026-02-02. Prossima review consigliata: 2026-04-30 (trimestrale)._
