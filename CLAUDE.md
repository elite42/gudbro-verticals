# GUDBRO Verticals

> **Contesto essenziale per Claude Code**
>
> **Last Updated:** 2025-12-30

---

## COMANDO: "leggi gudbro"

> **IMPORTANTE:** Questo è l'UNICO file CLAUDE.md del progetto.
> I verticali (rentals, wellness, coffeeshop) hanno file `VERTICAL-CONTEXT.md` separati.

**Quando l'utente dice "leggi gudbro" o "riavvia":**

```
ESEGUI IMMEDIATAMENTE (senza cercare altri file):

1. LEGGI questo file: /gudbro-verticals/CLAUDE.md
2. LEGGI docs/BACKLOG.md
3. LEGGI docs/DATABASE-INVENTORY.md
4. LEGGI docs/ECOSYSTEM-MAP.md (mappa completa repo esterni, tools, assets)

POI conferma all'utente:
"Ho letto la documentazione GUDBRO.

STATO SISTEMA:
- Database: 75 | Prodotti: ~4653 | Ingredienti: ~2548
- Nutrition coverage: 100%
- QR Platform: gudbro-qr-core (19 tipi QR, AI Artistic)
- Tools: Savings Calculator, Strategic Report
- [Prossimo task dal BACKLOG se presente]

Pronto per lavorare."
```

**NON cercare altri CLAUDE.md** - questo è l'unico.

---

## QUICK START (Protocollo Riavvio Esteso)

**Per lavoro su DATABASE, leggi anche:**

```
4. shared/database/PROCEDURE-NEW-DATABASE.md (procedura operativa)
5. shared/database/_system/docs/LESSONS-LEARNED.md (mappa esperienziale)
```

**Comando rapido utente:** `"leggi gudbro"` o `"riavvia sessione"`

### Session Resume (Ripresa Sessione Interrotta)

Se riprendo una sessione precedente su un database:
1. **Ri-leggere** PROCEDURE-NEW-DATABASE.md
2. **Ri-validare** tutti gli script creati (Step 6 della procedura)
3. **Verificare** ingredienti estratti da script 04
4. **Non procedere** finche tutti i check non passano

> Vedi LESSONS-LEARNED.md #4 per checklist completa

---

## All'Inizio di Ogni Sessione

```
LEGGI SEMPRE:
1. CLAUDE.md (questo file)
2. docs/BACKLOG.md - task pending
3. docs/DATABASE-INVENTORY.md - stato database
```

---

## Documentazione di Riferimento

| Area | File | Descrizione |
|------|------|-------------|
| **Ecosystem** | `docs/ECOSYSTEM-MAP.md` | **MAPPA COMPLETA** tutti i repo, assets, tools esterni |
| **Database** | `docs/DATABASE-INVENTORY.md` | Stato tutti i database (SOURCE OF TRUTH) |
| **Backlog** | `docs/BACKLOG.md` | Task pending e completati |
| **Standards** | `shared/database/DATABASE-STANDARDS.md` | Regole naming, schema, convenzioni |
| **Procedure** | `shared/database/PROCEDURE-NEW-DATABASE.md` | Guida step-by-step nuovi database |
| **Lezioni** | `shared/database/_system/docs/LESSONS-LEARNED.md` | 44 lezioni organizzate per contesto (v5.0) |
| **Strategic** | `docs/STRATEGIC-REPORT-5-DIMENSIONS.md` | Report 5 dimensioni, compliance, revenue streams |

### LESSONS-LEARNED: Mappa Esperienziale

Le lezioni sono organizzate per **contesto operativo**. Consulta la sezione pertinente:

| Contesto | Quando Consultare |
|----------|-------------------|
| **1. PRE-WORK** | Prima di iniziare qualsiasi lavoro |
| **2. INGREDIENTI** | Verifica naming, cache, duplicati |
| **3. SCRIPT SQL** | Sintassi, escape, formati |
| **4. PRODUCT_TAXONOMY** | Template e valori corretti per cucine |
| **5. PRODUCT_INGREDIENTS** | Schema, ruoli, linking |
| **6. VALIDAZIONE** | Checklist pre-esecuzione |
| **7. POST-ESECUZIONE** | Aggiornare docs dopo import |
| **8. ESTENSIONE TABELLE** | Modifiche a tabelle esistenti |
| **9. MANUTENZIONE** | Pulizia duplicati, ENUM |
| **10. AI-ASSISTED** | Workflow con Gemini/ChatGPT |

> **Non leggere tutto** - consulta solo il contesto rilevante per il task corrente

---

## Regole Fondamentali

### Prima di Lavorare su Database

```
OBBLIGATORIO:
1. Leggere PROCEDURE-NEW-DATABASE.md (specialmente Product Taxonomy!)
2. Consultare database recente come riferimento (cuisines/fusion/nikkei/, cuisines/americas/texmex/)
```

### Dopo Ogni Import

```
AGGIORNARE IMMEDIATAMENTE:
1. DATABASE-INVENTORY.md (entry + totali)
2. Cache ingredienti (se nuovi ingredienti)
```

### Database Template di Riferimento

Quando creo un nuovo database, copiare struttura da:

| Tipo | Template | Note |
|------|----------|------|
| Cucina nazionale | `cuisines/americas/cajun/`, `cuisines/fusion/nikkei/` | Struttura completa con origin |
| Bevande | `beverages/smoothies/`, `beverages/cocktails/` | Schema beverage |
| Food generico | `dishes/seafood/`, `dishes/steaks/` | Schema food standard |

### Credenziali Supabase

```
URL: https://vnaonebbuezrzvjekqxs.supabase.co
File: config/supabase.env
```

---

## Quick Reference

### Apps

| App | URL | Port |
|-----|-----|------|
| Coffeeshop PWA | gudbro-coffeeshop-pwa.vercel.app | 3004 |
| Backoffice | gudbro-backoffice.vercel.app | 3001 |
| Website | gudbro-website.vercel.app | 3000 |

### Stack

- **Framework:** Next.js 14.2.33, React 18.3.1
- **Styling:** Tailwind CSS 3.4.1
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

### Repository Structure

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/  # Digital Menu PWA
│   ├── backoffice/           # Admin Dashboard
│   └── website/              # Marketing Site
├── shared/database/          # Database v6.0
│   ├── cuisines/             # asian, european, americas, african, oceania, fusion
│   ├── beverages/            # cocktails, wines, spirits, coffee, tea, etc.
│   ├── dishes/               # pasta, pizzas, steaks, burgers, etc.
│   ├── sides/                # salads, soups, desserts, etc.
│   ├── ingredients/          # Master ingredients (2548)
│   ├── migrations/           # schema/, ingredients/, nutrition/
│   └── _system/              # types, scripts, docs, schema, utils
└── docs/                     # Documentazione progetto
```

---

## Stato Attuale (2025-12-28)

### Numeri Verificati

| Metrica | Valore |
|---------|--------|
| **Database** | 75 |
| **Prodotti** | ~4653 |
| **Ingredienti** | 2548 |
| **Ingredienti con Nutrition** | 2548 (100%) |
| **Product_Ingredients** | ~25169 |
| **Formaggi** | 226 |

### Database Recenti

| Database | Records | Data |
|----------|---------|------|
| Nutrition 100% | +58 | 2025-12-28 |
| Cajun/Creole | 42 | 2025-12-27 |
| Australian | 29 | 2025-12-27 |
| Hawaiian | 29 | 2025-12-27 |

> **Lista completa:** vedi `docs/DATABASE-INVENTORY.md`

---

## Decisioni Architetturali

| Decisione | Regola |
|-----------|--------|
| Lingua Base | SOLO INGLESE nel DB |
| Traduzioni | Tabella `translations` separata |
| Pesi/Misure | Sempre METRICO (g, ml) |
| Costi | MAI in master ingredients |
| Schema | TEXT + CHECK (no ENUM per nuove tabelle) |

> **Dettagli completi:** vedi `shared/database/DATABASE-STANDARDS.md`

---

## Convenzioni

- **Commits:** emoji + descrizione concisa
- **PR:** Summary + Test Plan
- **Files:** No emojis unless requested

---

## Commands

```bash
# Dev servers
cd apps/coffeeshop/frontend && npm run dev  # :3004
cd apps/backoffice && npm run dev           # :3001

# Deploy (auto on push to main)
git push origin main
```

---

**File:** `CLAUDE.md`
**Version:** 4.1 (Folder Restructuring v6.0)
**Updated:** 2025-12-28
