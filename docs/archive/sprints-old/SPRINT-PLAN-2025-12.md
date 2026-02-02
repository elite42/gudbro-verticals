# GUDBRO Sprint Plan - Dicembre 2025

**Data Creazione:** 2025-12-11
**Ultimo Aggiornamento:** 2025-12-11
**Autore:** Claude Code + Gianfranco

---

## Executive Summary

Audit completo eseguito su tutti i sistemi GUDBRO. Questo documento definisce i task prioritari per completare la piattaforma.

### Stato Attuale

| Sistema | Status | Completamento |
|---------|--------|---------------|
| **PWA Coffeeshop** | ⚠️ Quasi Pronto | 85% |
| **Backoffice** | ✅ Production Ready | 90% |
| **Database** | ✅ Completo | 95% |
| **Website** | ⚠️ Solo Marketing | 40% |

---

## SPRINT 1: PWA Critical Fixes (Priorità ALTA)

**Durata stimata:** 2-3 giorni
**Obiettivo:** Rendere la PWA completamente funzionale e installabile

### Task 1.1: PWA Manifest & Service Worker
**Priorità:** 🔴 CRITICO
**Stima:** 4 ore

- [ ] Creare `/public/manifest.json` con icone, theme_color, display: standalone
- [ ] Creare `/public/service-worker.js` con cache strategy
- [ ] Registrare SW in `app/layout.tsx`
- [ ] Testare installabilità su iOS/Android
- [ ] Aggiungere icone PWA (192x192, 512x512)

**Files:**
- `apps/coffeeshop/frontend/public/manifest.json` (nuovo)
- `apps/coffeeshop/frontend/public/service-worker.js` (nuovo)
- `apps/coffeeshop/frontend/public/icons/` (nuova cartella)
- `apps/coffeeshop/frontend/app/layout.tsx` (modifica)

### Task 1.2: Fix TypeScript Errors
**Priorità:** 🔴 CRITICO
**Stima:** 3 ore

- [ ] Rimuovere `ignoreBuildErrors: true` da next.config.js
- [ ] Risolvere errori in shared/database types
- [ ] Fix type conflicts tra monorepo packages
- [ ] Verificare build pulito

**Files:**
- `apps/coffeeshop/frontend/next.config.js`
- `shared/database/types.ts`

### Task 1.3: Completare Account Page
**Priorità:** 🟡 MEDIO
**Stima:** 4 ore

- [ ] Implementare UI profilo utente
- [ ] Lista favorites salvati
- [ ] Storico ordini
- [ ] Preferenze dietetiche
- [ ] Impostazioni notifiche

**Files:**
- `apps/coffeeshop/frontend/app/account/page.tsx` (riscrivere)

### Task 1.4: Completare TODO nel codice
**Priorità:** 🟡 MEDIO
**Stima:** 2 ore

- [ ] MoreMenuModal: Integrare WiFi modal
- [ ] MoreMenuModal: Integrare CallStaffModal
- [ ] Consolidare WelcomeModal (rimuovere V1, usare solo V2)

**Files:**
- `apps/coffeeshop/frontend/components/MoreMenuModal.tsx`
- `apps/coffeeshop/frontend/components/WelcomeModal.tsx` (eliminare?)
- `apps/coffeeshop/frontend/app/page.tsx`

### Task 1.5: Menu da Database (invece di JSON)
**Priorità:** 🟢 BASSO (può essere Sprint 2)
**Stima:** 6 ore

- [ ] Integrare menu-service.ts con Supabase
- [ ] Creare API per fetch menu items
- [ ] Rimuovere hardcoded roots-menu.ts
- [ ] Cache client-side con SWR/React Query

---

## SPRINT 2: Backoffice Polish (Priorità MEDIA)

**Durata stimata:** 2 giorni
**Obiettivo:** Migliorare UX e completare funzionalità minori

### Task 2.1: Auth Guards
**Priorità:** 🔴 CRITICO
**Stima:** 4 ore

- [ ] Verificare/implementare middleware auth
- [ ] Proteggere tutte le route dashboard
- [ ] Redirect non autenticati a login
- [ ] Session management

### Task 2.2: CSV Import Menu Items
**Priorità:** 🟡 MEDIO
**Stima:** 2 ore

- [ ] Completare handler CSV import in /content/menu
- [ ] Validazione dati CSV
- [ ] Error handling e feedback

### Task 2.3: Error Handling UX
**Priorità:** 🟡 MEDIO
**Stima:** 2 ore

- [ ] Sostituire console.log con toast notifications
- [ ] Aggiungere loading states consistenti
- [ ] Error boundaries per pagine

### Task 2.4: Prisma Schema Sync
**Priorità:** 🟢 BASSO
**Stima:** 3 ore

- [ ] Aggiungere models mancanti (partners, organizations, brands, locations)
- [ ] Sync con migrations SQL
- [ ] Generare Prisma client aggiornato

---

## SPRINT 3: Website Completion (Priorità MEDIA)

**Durata stimata:** 3-4 giorni
**Obiettivo:** Trasformare il sito marketing in funzionale

### Task 3.1: Pagine Mancanti
**Priorità:** 🔴 CRITICO
**Stima:** 8 ore

- [ ] `/sign-up` - Registrazione (connesso a Supabase Auth)
- [ ] `/sign-in` - Login
- [ ] `/demo` - Demo interattiva o video
- [ ] `/contact` - Form contatto

### Task 3.2: Pagine Solutions
**Priorità:** 🟡 MEDIO
**Stima:** 4 ore

- [ ] `/solutions/restaurants`
- [ ] `/solutions/hotels`
- [ ] `/solutions/airbnb`
- [ ] `/solutions/food-trucks`

### Task 3.3: Pagine Legal
**Priorità:** 🟡 MEDIO
**Stima:** 2 ore

- [ ] `/privacy` - Privacy Policy
- [ ] `/terms` - Terms of Service
- [ ] `/cookies` - Cookie Policy

### Task 3.4: Blog System
**Priorità:** 🟢 BASSO
**Stima:** 6 ore

- [ ] Setup blog con MDX o CMS
- [ ] `/blog` - Lista articoli
- [ ] `/blog/[slug]` - Singolo articolo

---

## SPRINT 4: Analytics & Monitoring (Priorità BASSA)

**Durata stimata:** 2 giorni
**Obiettivo:** Attivare sistema analytics

### Task 4.1: Deploy Migration Analytics
**Priorità:** 🟡 MEDIO
**Stima:** 1 ora

- [ ] Eseguire `017-analytics-system.sql` su Supabase
- [ ] Verificare tabelle create
- [ ] Test funzioni SQL

### Task 4.2: Analytics Dashboard Backoffice
**Priorità:** 🟡 MEDIO
**Stima:** 6 ore

- [ ] Creare `/analytics` page con grafici
- [ ] Metriche: sessions, conversions, revenue
- [ ] Filtri per data range
- [ ] Export CSV

### Task 4.3: PWA Event Tracking
**Priorità:** 🟡 MEDIO
**Stima:** 3 ore

- [ ] Integrare analytics-service.ts nella PWA
- [ ] Track: page_view, item_click, add_to_cart, order_placed
- [ ] Session tracking anonimo

---

## SPRINT 5: Testing & QA (Priorità MEDIA)

**Durata stimata:** 2-3 giorni
**Obiettivo:** Test coverage e stabilità

### Task 5.1: Unit Tests PWA
**Priorità:** 🟡 MEDIO
**Stima:** 4 ore

- [ ] Setup Jest + React Testing Library
- [ ] Test cart operations
- [ ] Test currency conversion
- [ ] Test i18n

### Task 5.2: E2E Tests
**Priorità:** 🟢 BASSO
**Stima:** 6 ore

- [ ] Setup Playwright
- [ ] Test user journey completo
- [ ] Test multi-language
- [ ] Test responsive

### Task 5.3: Performance Audit
**Priorità:** 🟡 MEDIO
**Stima:** 2 ore

- [ ] Lighthouse audit
- [ ] Bundle size analysis
- [ ] Image optimization check
- [ ] Core Web Vitals

---

## Priorità Riassunto

### 🔴 CRITICI (Fare subito)
1. PWA Manifest & Service Worker
2. Fix TypeScript Errors
3. Auth Guards Backoffice
4. Pagine Website mancanti (sign-up, sign-in)

### 🟡 IMPORTANTI (Fare questa settimana)
1. Account Page PWA
2. TODO nel codice
3. Error Handling UX
4. Analytics Dashboard

### 🟢 NICE-TO-HAVE (Fare quando possibile)
1. Menu da Database
2. Prisma Schema Sync
3. Blog System
4. E2E Tests

---

## Metriche di Successo

### PWA
- [ ] Lighthouse PWA score > 90
- [ ] Installabile su iOS/Android
- [ ] Offline basic support
- [ ] Build senza errori TypeScript

### Backoffice
- [ ] Tutte le route protette
- [ ] Nessun console.error in production
- [ ] CRUD completo per tutte le entità

### Website
- [ ] Tutte le pagine linkate esistono
- [ ] Form contatto funzionante
- [ ] Sign-up connesso a Supabase

### Database
- [ ] Analytics tracking attivo
- [ ] Nessuna tabella senza RLS
- [ ] Backup automatici configurati

---

## Note Tecniche

### Stack Condiviso
- Next.js 14.2.33
- React 18.3.1
- Tailwind CSS 3.4.1
- Supabase (PostgreSQL)
- Prisma 5.22.0 (backoffice)
- Vercel (deployment)

### Convenzioni
- Commit: emoji + descrizione concisa
- Branch: feature/nome-feature
- PR: Summary + Test Plan
- Deploy: auto su push a main

---

**Prossima Review:** Fine Sprint 1
