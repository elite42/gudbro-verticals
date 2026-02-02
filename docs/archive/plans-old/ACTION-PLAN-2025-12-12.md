# GUDBRO Action Plan - 12 Dicembre 2025

**Generato da:** Claude Code Audit
**Obiettivo:** Portare tutti i sistemi a production-ready
**Ultimo aggiornamento:** 12 Dicembre 2025

---

## FASE 1: CRITICAL FIXES ✅ COMPLETATA
**Priorità:** BLOCCANTE

### 1.1 Fix Vulnerabilità PWA ✅
- [x] Eseguire `npm audit fix` in coffeeshop/frontend
- [x] Verificare build dopo fix (0 vulnerabilità)
- [x] Testare che PWA funzioni ancora

### 1.2 Sync Safety Filters ✅
- [x] Copiare `shared/database/safety-filters.ts` nelle 4 location:
  - `apps/coffeeshop/frontend/lib/safety/safety-filters.ts`
  - `apps/coffeeshop/safety-filters.ts`
  - `apps/backoffice/lib/shared/safety-filters.ts`
  - `apps/backoffice/lib/safety-filters.ts`
- [x] Verificato: 51 safety filters, 26 allergens consistenti

### 1.3 Cleanup Console.log (PWA) ✅
- [x] Rimossi 13 console.log da componenti produzione
- [x] Mantenuto solo error logging essenziale

---

## FASE 2: WEBSITE CRITICAL PAGES ✅ COMPLETATA
**Priorità:** ALTA

### 2.1 Pagine Autenticazione ✅
- [x] Creare `/app/sign-in/page.tsx`
- [x] Creare `/app/sign-up/page.tsx` (con Suspense boundary)
- [x] Redirect post-login a backoffice

### 2.2 Pagine Legal (obbligatorie) ✅
- [x] Creare `/app/privacy/page.tsx` - Privacy Policy
- [x] Creare `/app/terms/page.tsx` - Terms of Service
- [x] Creare `/app/cookies/page.tsx` - Cookie Policy

### 2.3 Pagina Contact ✅
- [x] Creare `/app/contact/page.tsx`
- [x] Form con: nome, email, messaggio, tipo richiesta
- [x] Success state UI (API endpoint da implementare separatamente)

### 2.4 SEO Essentials ✅
- [x] Creare `public/robots.txt`
- [x] Creare `app/sitemap.ts` (dynamic sitemap con 22 URL)

---

## FASE 3: WEBSITE SECONDARY PAGES ✅ COMPLETATA
**Priorità:** MEDIA

### 3.1 Solution Pages ✅
- [x] Creare `/app/solutions/[slug]/page.tsx` (dynamic)
- [x] Contenuto per: restaurants, hotels, airbnb, food-trucks
- [x] generateStaticParams per SSG

### 3.2 Resource Pages ✅
- [x] Creare `/app/demo/page.tsx` - Links a PWA e Backoffice live
- [x] Creare `/app/faq/page.tsx` - FAQ accordion (5 categorie, 20+ domande)
- [x] Creare `/app/about/page.tsx` - Chi siamo, valori, stats

### 3.3 Blog Setup
- [ ] Opzionale - non prioritario

---

## FASE 4: BACKOFFICE POLISH 🔄 IN CORSO
**Priorità:** MEDIA

### 4.1 Google OAuth ⚠️ RICHIEDE AZIONE MANUALE
- [x] Codice implementato in `/login/page.tsx`
- [ ] **MANUALE:** Configurare Google OAuth in Supabase Dashboard (vedi guida sotto)
- [ ] Testare login con Google

### 4.2 Completare Pagine Placeholder ✅
- [x] `/analytics` - Dashboard con grafici (mock data pronta)
- [x] `/orders` - Pagina esistente
- [x] Build completato: 37 pagine generate

### 4.3 Deploy Analytics Migration ⚠️ RICHIEDE AZIONE MANUALE
- [ ] **MANUALE:** Eseguire `017-analytics-system.sql` su Supabase SQL Editor
- [ ] Connettere Analytics Dashboard a dati reali

---

## 📋 AZIONI MANUALI RICHIESTE

### 1. Configurare Google OAuth (Supabase Dashboard)

1. Vai su [Supabase Dashboard](https://app.supabase.com) → Il tuo progetto
2. Navigare a **Authentication** → **Providers**
3. Cercare **Google** e abilitarlo
4. Ottenere le credenziali da [Google Cloud Console](https://console.cloud.google.com):
   - Creare un progetto o usarne uno esistente
   - Abilitare "Google+ API" o "Google Identity"
   - Creare credenziali OAuth 2.0
   - **Authorized JavaScript origins**:
     - `https://gudbro-backoffice.vercel.app`
     - `http://localhost:3001` (per sviluppo)
   - **Authorized redirect URIs**:
     - `https://vnaonebbuezrzvjekqxs.supabase.co/auth/v1/callback`
5. Copiare **Client ID** e **Client Secret** in Supabase
6. Salvare

### 2. Deploy Migration Analytics

1. Vai su [Supabase Dashboard](https://app.supabase.com) → Il tuo progetto
2. Navigare a **SQL Editor**
3. Copiare il contenuto di `shared/database/migrations/017-analytics-system.sql`
4. Eseguire la query
5. Verificare nella sezione **Table Editor** che esistano:
   - `analytics_events`
   - `analytics_daily_aggregates`
   - `improvement_suggestions`

---

## FASE 5: TESTING & QA (1-2 giorni)
**Tempo stimato:** 6-8 ore
**Priorità:** MEDIA

### 5.1 Cross-Browser Testing
- [ ] Chrome, Safari, Firefox, Edge
- [ ] iOS Safari, Android Chrome

### 5.2 Mobile Testing
- [ ] PWA installazione iOS
- [ ] PWA installazione Android
- [ ] Responsive su vari screen size

### 5.3 Performance
- [ ] Lighthouse audit (target: >80)
- [ ] Core Web Vitals check

---

## Checklist Deployment

### PWA Coffeeshop
- [ ] npm audit fix completato
- [ ] Build senza errori
- [ ] PWA installabile
- [ ] Ordini funzionanti
- [ ] Multi-lingua OK

### Backoffice
- [ ] Auth funzionante (email + Google)
- [ ] Menu CRUD OK
- [ ] Tenant switching OK
- [ ] Toast notifications OK

### Website
- [ ] Tutti i link funzionanti
- [ ] Legal pages presenti
- [ ] Contact form funzionante
- [ ] SEO basics OK
- [ ] Mobile responsive

### Database
- [ ] Migrations eseguite
- [ ] RLS attivo
- [ ] Backup configurato

---

## Ordine di Esecuzione Consigliato

```
OGGI (Fase 1):
├── 1.1 npm audit fix PWA
├── 1.2 Sync safety-filters
└── 1.3 Cleanup console.log

DOMANI (Fase 2):
├── 2.1 Sign-in/Sign-up pages
├── 2.2 Legal pages
├── 2.3 Contact page
└── 2.4 SEO (robots, sitemap)

GIORNO 3-4 (Fase 3):
├── 3.1 Solution pages
├── 3.2 Demo, FAQ, About
└── 3.3 Blog (se tempo)

GIORNO 5-6 (Fase 4):
├── 4.1 Google OAuth setup
├── 4.2 Analytics dashboard
└── 4.3 Orders workflow

GIORNO 7 (Fase 5):
├── 5.1 Browser testing
├── 5.2 Mobile testing
└── 5.3 Performance audit
```

---

## Note

- Ogni fase può essere eseguita indipendentemente
- Fase 1 è BLOCCANTE per production
- Fase 2 è BLOCCANTE per website pubblico
- Fasi 3-5 sono miglioramenti progressivi

---

**Approvato:** [ ] Si [ ] No, modifiche richieste
**Data inizio:** ___________
**Data target completamento:** ___________
