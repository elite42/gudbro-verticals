# GUDBRO Verticals

> **IMPORTANTE:** Prima di ogni nuova feature, consulta `docs/inventory.md`

## Quick Reference

| App | URL | Port | Status |
|-----|-----|------|--------|
| Coffeeshop PWA | gudbro-coffeeshop-pwa.vercel.app | 3004 | LIVE |
| Backoffice | gudbro-backoffice.vercel.app | 3001 | LIVE |
| Website | gudbro-website.vercel.app | 3000 | LIVE |

## Stack

- **Framework:** Next.js 14.2.33, React 18.3.1
- **Styling:** Tailwind CSS 3.4.1
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma 5.22.0 (backoffice only)
- **Deployment:** Vercel

## Repository Structure

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/  # Digital Menu PWA
│   ├── backoffice/           # Admin Dashboard
│   └── website/              # Marketing Site
├── shared/database/          # Migrations, types, filters
├── docs/                     # Extended documentation
│   ├── inventory.md          # CRITICAL: All features list
│   └── sprints/              # Sprint tracking
└── .claude/commands/         # Workflow slash commands
```

## Session Protocol

### Start Session
1. Read `docs/inventory.md` - see what exists
2. Ask user what to work on
3. Create todo list

### End Session
1. Update `docs/inventory.md` with new features
2. Commit with: `docs: update inventory`

## Key Systems (Summary)

| System | Status | Details |
|--------|--------|---------|
| Multi-Locale | ✅ | 197 countries, 111 languages, 6 RTL |
| Multi-Tenant | ✅ | Partner → Org → Brand → Location |
| Currency | ✅ | 33 currencies, manual refresh |
| Translations | ✅ | Inline editor + CSV import |
| Food Costs | ✅ | 69 ingredients with VND costs |
| Recipes | ✅ | 22 barista recipes |
| Design System | ✅ | CVA + shadcn/ui pattern |

## Environment Variables

### Coffeeshop
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### Backoffice
```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

## Commands

```bash
# Dev servers
cd apps/coffeeshop/frontend && npm run dev  # :3004
cd apps/backoffice && npm run dev           # :3001

# Build
npm run build

# Deploy (auto on push to main)
git push origin main
```

## Conventions

- **Commits:** emoji + descrizione concisa
- **PR:** Summary + Test Plan + `Generated with Claude Code`
- **No emojis** in code/files unless requested

## Documentation

| File | Purpose |
|------|---------|
| `docs/inventory.md` | Complete feature inventory |
| `docs/CLAUDE-archive-*.md` | Historical context |
| `apps/*/CLAUDE.md` | App-specific context |

## Auto-Update Rule

Claude DEVE aggiornare `docs/inventory.md` dopo ogni:
- Nuova feature implementata
- File creato/modificato significativamente
- Sprint completato

---

## Sessione Corrente (2025-12-11)

### Lavoro Completato Oggi
1. **Bottom Nav Riorganizzata**: Home, Menu, More (+), Order, Account
2. **MoreMenuModal creato**: WiFi, Staff, Language, Currency, Reset tools
3. **Header semplificati**: Rimossi AI e Account icons
4. **Audit Completo Eseguito**: PWA, Backoffice, Database, Website

### Sprint Plan Attivo
Vedi: `docs/sprints/SPRINT-PLAN-2025-12.md`

### Sprint 1 COMPLETATO ✅
**PWA Critical Fixes** - Tutti i task completati:
1. ✅ Creare manifest.json + service-worker.js
2. ✅ Fix TypeScript errors critici (13 errori minori in moduli secondari)
3. ✅ Completare Account page (profilo, preferenze, impostazioni)
4. ✅ Generare icone PNG per PWA (8 sizes + apple-touch-icon)
5. ✅ Completare TODO nel codice (WiFi modal + CallStaff integration)

### Errori TypeScript Corretti (sessione 2)
- `HomeHeader.tsx` - defaultCurrency → baseCurrency
- `MenuHeader.tsx` - defaultCurrency → baseCurrency
- `MoreMenuModal.tsx` - favoritesStore.getAll() → favoritesStore.get().favoriteIds
- `WelcomeModal.tsx` - handleSkip hoisting fix
- `WelcomeModalV2.tsx` - defaultCurrency → baseCurrency
- `StickyCartBar.tsx` - formatPriceCompactCompact typo
- `ProductIndicators.tsx` - import path fix
- `SearchOverlay.tsx` - dietaryLabels → dietary
- `safety-badge.tsx` - null index fix
- `cart/page.tsx` e `SelectionsSidebar.tsx` - SubmitOrderResult handling
- `order-service.ts` - supabase null check
- `coffeeshop.config.ts` - removed unused import
- `useQuickCustomizeState.ts` - local type definition

### File Modificati Oggi
- `apps/coffeeshop/frontend/components/BottomNavLocal.tsx` - Nav riorganizzata
- `apps/coffeeshop/frontend/components/MoreMenuModal.tsx` - NUOVO
- `apps/coffeeshop/frontend/components/HomeHeader.tsx` - Rimosso Account + fix TS
- `apps/coffeeshop/frontend/components/MenuHeader.tsx` - Rimossi AI + Account + fix TS
- `docs/sprints/SPRINT-PLAN-2025-12.md` - NUOVO Sprint Plan
- `apps/coffeeshop/frontend/public/manifest.json` - NUOVO PWA manifest
- `apps/coffeeshop/frontend/public/service-worker.js` - NUOVO Service Worker
- `apps/coffeeshop/frontend/components/PWAProvider.tsx` - NUOVO SW registration
- `apps/coffeeshop/frontend/app/layout.tsx` - Aggiunto PWA meta tags
- `apps/coffeeshop/frontend/app/account/page.tsx` - COMPLETAMENTE RIFATTA
- `apps/coffeeshop/frontend/scripts/generate-pwa-icons.js` - NUOVO script icone
- `apps/coffeeshop/frontend/public/icons/pwa/*.png` - NUOVE 9 icone PNG
- Multiple TS error fixes across components

### Sprint 2 COMPLETATO ✅
**Menu da Database + WelcomeModal** - Tutti i task completati:
1. ✅ Menu Service già pronto per Supabase (fallback a JSON se vuoto)
2. ✅ Creato script `seed-menu-to-supabase.js` per popolare DB
3. ✅ Creato script `seed-menu-items.sql` per SQL Editor
4. ✅ WelcomeModal consolidato (V1 eliminato, V2 rinominato a WelcomeModal)

### File Modificati (Sprint 2)
- `apps/coffeeshop/frontend/scripts/seed-menu-to-supabase.js` - NUOVO
- `apps/coffeeshop/frontend/scripts/seed-menu-items.sql` - NUOVO
- `apps/coffeeshop/frontend/components/WelcomeModal.tsx` - Rinominato da V2
- `apps/coffeeshop/frontend/app/page.tsx` - Usa WelcomeModal
- `apps/coffeeshop/frontend/app/onboarding-demo/page.tsx` - Usa WelcomeModal

### Sprint 3 COMPLETATO ✅
**Backoffice Polish** - Tutti i task completati:
1. ✅ Auth Guards con middleware Supabase SSR
2. ✅ Login page completa (email/password + Google OAuth)
3. ✅ CSV Import per menu items con validazione
4. ✅ Toast notification system per UX feedback

### File Modificati (Sprint 3)
- `apps/backoffice/lib/supabase-server.ts` - NUOVO Server-side client
- `apps/backoffice/lib/supabase-browser.ts` - NUOVO Browser-side client
- `apps/backoffice/middleware.ts` - NUOVO Auth middleware
- `apps/backoffice/app/login/page.tsx` - NUOVO Login completo
- `apps/backoffice/app/auth/callback/route.ts` - NUOVO OAuth callback
- `apps/backoffice/components/layout/Header.tsx` - Aggiunto logout
- `apps/backoffice/lib/contexts/ToastContext.tsx` - NUOVO Toast context
- `apps/backoffice/components/ui/Toast.tsx` - NUOVO Toast component
- `apps/backoffice/app/(dashboard)/layout.tsx` - Aggiunto ToastProvider
- `apps/backoffice/app/(dashboard)/content/menu/page.tsx` - CSV Import + Toast

### Note per Ripresa Sessione
- **Sprint 1 + 2 + 3 COMPLETATI**
- Per popolare menu in Supabase:
  1. Vai su Supabase Dashboard > SQL Editor
  2. Esegui `scripts/seed-menu-items.sql`
  3. Oppure usa service_role key con `seed-menu-to-supabase.js`
- Menu-service: prova Supabase → fallback JSON automatico
- 13 errori TypeScript rimanenti in moduli secondari (non bloccanti)
- `ignoreBuildErrors: true` ancora attivo per errori in shared/database
- Auth backoffice richiede configurazione Google OAuth in Supabase Dashboard

### Prossimo: Sprint 4 (da definire)
Vedi: `docs/sprints/SPRINT-PLAN-2025-12.md`

---

**Last Updated:** 2025-12-11
