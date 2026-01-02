# GUDBRO Ecosystem Map

> **Mappa completa di tutti i repository, assets e documenti GUDBRO**
> **Ultimo aggiornamento:** 2025-12-30

---

## Convenzione Percorsi

Tutti i percorsi usano `~/Desktop/` come base:
- `~/Desktop/gudbro-verticals/` = questo repository
- `~/Desktop/gudbro-qr-core/` = QR Platform
- `~/Desktop/docs and research gudbro/` = Ricerche
- `~/Desktop/brandkit/` = Brand assets

**Per trovare il percorso assoluto:** `echo ~/Desktop`

---

## Repository Principali

### 1. gudbro-verticals (PRINCIPALE)
**Percorso:** `~/Desktop/gudbro-verticals/`
**Scopo:** Monorepo principale con tutte le apps verticali

| App | Percorso | Port | URL Produzione | Stato |
|-----|----------|------|----------------|-------|
| Website | `apps/website/` | 3000 | gudbro-website.vercel.app | LIVE |
| Backoffice | `apps/backoffice/` | 3001 | gudbro-backoffice.vercel.app | LIVE |
| Coffeeshop PWA | `apps/coffeeshop/frontend/` | 3004 | gudbro-coffeeshop-pwa.vercel.app | LIVE |
| Rentals | `apps/rentals/` | 3012-3013 | - | MVP |
| Wellness | `apps/wellness/` | 3023-3024 | - | Backend OK |

**Database:** `shared/database/` - 75 DB, 4653 prodotti, 2548 ingredienti

---

### 2. gudbro-qr-core (QR Platform)
**Percorso:** `~/Desktop/gudbro-qr-core/`
**Scopo:** Piattaforma QR Code completa con 19 tipi QR
**URL Produzione:** https://gudbro-qr-platform.vercel.app

| Servizio | Port | Descrizione |
|----------|------|-------------|
| Frontend | 3000 | Admin UI Next.js 15 |
| QR Engine | 3001 | 19 tipi QR + AI Artistic |
| Analytics | 3002 | Scan tracking |
| Auth | 3003 | Autenticazione |
| Bulk | 3006 | Generazione batch |
| Customization | 3007 | Design QR |
| Dynamic QR | 3008 | Redirect dinamici |
| Filters | 3009 | Safety filters |
| Hub | 3010 | Admin dashboard |
| i18n | 3011 | Multi-lingua |
| Menu | 3012 | Menu management |
| Templates | 3013 | Template library |

**19 Tipi QR Supportati:**
- Standard: URL, WiFi, vCard, Email, SMS, Event, Social
- Asia: VietQR, WeChat Pay, Zalo, KakaoTalk, LINE
- Media: PDF, Video, Audio, App Store
- Business: Multi-URL, Business Page, Coupon, Feedback Form
- AI: Artistic QR (Replicate)

---

### 3. qr-platform-complete (ARCHIVIATO)
**Percorso:** `~/Desktop/qr-platform-complete/`
**Stato:** ARCHIVIATO - Non usare
**Note:** Monorepo originale 1.9GB, sostituito da gudbro-qr-core

---

## Documenti e Ricerche

### Cartella Research
**Percorso:** `~/Desktop/docs and research gudbro/`

| File | Contenuto | Valore |
|------|-----------|--------|
| `GUDBRO_Paper_v6.1_FINAL_with_ExecSummary.docx` | Business plan completo | Executive Summary |
| `Ricerca: Risparmio e ROI dei Menu Digitali.md` | Dati ROI documentati | 70% preferenza, +22% AOV, +20% ordini |
| `Ricerca: NFC vs QR Code per Menu Digitali.md` | Comparazione tecnologie | Decisione QR |
| `SEA_Allergen_Regulations_Research_2025-10-15.md` | Regolamenti allergeni Asia | Compliance 50+ paesi |
| `Thai_Competitor_Analysis_Deep_Dive.md` | Analisi competitor Thailandia | Market intelligence |
| `Philippines_Competitor_Analysis.md` | Analisi competitor Filippine | Market intelligence |
| `QR_ENGINE_DEV_BRIEF.md` | Specifiche tecniche QR | Development reference |
| `Instant Feedback System - Complete Project Specification.docx` | Sistema feedback | Feature spec |

---

## Assets Brand

### Brand Kit
**Percorso:** `~/Desktop/brandkit/`

| Asset | File | Uso |
|-------|------|-----|
| Logo CMYK | `GUDBRO - CMYK (1).ai` | Stampa |
| Logo RGB | `GUDBRO RGB (1).ai` | Digital |
| Brand Guidelines | `Gudbro Master Template.pdf` | Riferimento brand |
| Logos vari | `logos/` (103 file) | Varianti logo |
| Presentazione | `gudbroppt.pptx` | Pitch deck |

---

## Tools Nascosti (da integrare nel website)

### 1. Savings Calculator
**Percorso:** `gudbro-verticals/apps/coffeeshop/frontend/public/savings-calculator.html`
**Stato:** Completo ma non linkato
**Features:**
- ROI calculator multi-scenario
- Multi-lingua (EN, VI, KO)
- Multi-valuta (VND, USD, EUR, GBP, THB, KRW)
- Lead capture modal
- Hybrid approach recommendation

### 2. QR Code Generator (esterno)
**URL:** https://gudbro-qr-platform.vercel.app
**Stato:** LIVE ma non linkato dal website principale

---

## Dati Chiave per Marketing

### ROI / Risparmio (da ricerca)
- **70%** clienti preferisce menu digitali (Tableo 2025)
- **+22%** AOV con QR menus (ComQI 2023)
- **+20%** ordini con menu digitali (Qamarero)
- **€8-40/mese** risparmio stampa
- **<30 giorni** payback period
- **2-4kg carta/anno** evitati per venue

### Database Stats
- **75** database cucine
- **4,653** prodotti
- **2,548** ingredienti
- **100%** copertura nutrizionale
- **30** allergeni tracciati
- **11** filtri dietetici
- **50+** paesi compliant

### Competitor Positioning
- Unico con **Asia QR codes** (VietQR, WeChat, Zalo, KakaoTalk, LINE)
- Unico con **AI Artistic QR**
- Unico con **51 health filters** (30 allergeni + 10 intolleranze + 11 diete)

---

## Azioni Pendenti (Website Integration)

### Alta Priorità
- [ ] Integrare Savings Calculator nel website (`/savings-calculator` o homepage)
- [ ] Creare landing page QR Generator (`/tools/qr-generator`)
- [ ] Aggiungere dati ROI alla homepage
- [ ] Comunicare le 5 dimensioni prominentemente

### Media Priorità
- [ ] Creare pagina `/tools` con tutti i tools
- [ ] Aggiungere link a QR Platform nel header
- [ ] Usare dati ricerca nelle solutions pages

### Bassa Priorità
- [ ] Unificare i repository (considerare)
- [ ] Migrare Savings Calculator da HTML standalone a Next.js component

---

## Quick Reference Commands

```bash
# Avviare Website
cd ~/Desktop/gudbro-verticals/apps/website && npm run dev

# Avviare QR Platform
cd ~/Desktop/gudbro-qr-core/frontend && npm run dev

# Trovare file specifico
find ~/Desktop -name "*.md" | xargs grep -l "keyword"

# Vedere savings calculator
open ~/Desktop/gudbro-verticals/apps/coffeeshop/frontend/public/savings-calculator.html

# Leggere ricerca ROI
cat ~/Desktop/docs\ and\ research\ gudbro/Ricerca:\ Risparmio\ e\ ROI\ dei\ Menu\ Digitali\ per\ Ristoranti\ e\ Hotel.md
```

---

## Note per Claude Code

Quando lavori su GUDBRO:
1. **Leggi sempre** `gudbro-verticals/CLAUDE.md` per contesto database
2. **Consulta questo file** per trovare assets esterni
3. **QR Platform** è in repo separato (`gudbro-qr-core`)
4. **Ricerche e dati** sono in `Desktop/docs and research gudbro/`
5. **Brand assets** sono in `Desktop/brandkit/`

---

**File:** `docs/ECOSYSTEM-MAP.md`
**Creato:** 2025-12-30
