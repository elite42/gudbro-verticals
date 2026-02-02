# MenuTiger Backoffice - Audit Report

> **Audit eseguito con Claude Browser (Opus 4.5)**
>
> **Data:** 2025-01-01
>
> **Competitor:** MenuTiger (menu.tiger)

---

## Executive Summary

### 5 Punti di Forza

1. **Interfaccia pulita e intuitiva** - Design moderno con sidebar scura e area lavoro chiara, navigazione logica
2. **Sistema QR robusto** - Generazione QR personalizzabili per tavoli, ordinazione diretta, tracking scansioni
3. **Kitchen Display System integrato** - Vista dedicata per cucina con gestione ordini real-time
4. **Multi-store management** - Gestione centralizzata di più sedi con menu condivisi o separati
5. **Onboarding guidato** - Wizard setup iniziale che guida passo-passo la configurazione

### 5 Punti Deboli / Opportunita

1. **Analytics limitati** - Solo metriche base, mancano insights avanzati e suggerimenti AI
2. **Personalizzazione design menu** - Temi limitati, no CSS custom, poche opzioni di branding
3. **CRM basico** - No segmentazione avanzata clienti, no programmi fedelta integrati
4. **Integrazioni limitate** - Poche integrazioni native con POS e delivery platforms
5. **No mobile app nativa** - Solo web responsive, manca PWA ottimizzata per staff

### Target User

- Piccoli-medi ristoranti (1-5 sedi)
- Focus su ordinazione da tavolo via QR
- Budget contenuto ($17-38/mese)

### Pricing Positioning

Entry-level nel mercato, pricing competitivo ma features limitate rispetto a competitor premium.

---

## Feature Matrix

| Categoria | Feature | Disponibile | Piano | Note |
|-----------|---------|-------------|-------|------|
| **Menu** | Prodotti illimitati | ✅ | Tutti | - |
| **Menu** | Categorie illimitate | ✅ | Tutti | - |
| **Menu** | Foto prodotti | ✅ | Tutti | Upload semplice |
| **Menu** | Descrizioni | ✅ | Tutti | Testo semplice |
| **Menu** | Modificatori/addon | ✅ | Tutti | Sistema base |
| **Menu** | Allergeni | ✅ | Tutti | Lista predefinita |
| **Menu** | Multilingua | ✅ | Pro+ | 2+ lingue |
| **Menu** | Import/Export | ⚠️ | Pro+ | Solo CSV |
| **Menu** | Scheduling disponibilita | ✅ | Pro+ | Per orario |
| **QR** | QR per tavolo | ✅ | Tutti | Core feature |
| **QR** | QR personalizzabile | ✅ | Pro+ | Colori, no logo |
| **QR** | Download PNG/PDF | ✅ | Tutti | - |
| **QR** | Tracking scansioni | ✅ | Pro+ | Base analytics |
| **Ordini** | Vista real-time | ✅ | Tutti | Dashboard dedicata |
| **Ordini** | Stati ordine | ✅ | Tutti | 4 stati |
| **Ordini** | Notifiche sonore | ✅ | Tutti | Configurabile |
| **Ordini** | Kitchen Display | ✅ | Pro+ | Schermo separato |
| **Ordini** | Stampa comande | ✅ | Pro+ | Thermal printer |
| **Ordini** | Storico | ✅ | Tutti | 90 giorni |
| **Design** | Temi | ⚠️ | Tutti | Solo 3 temi |
| **Design** | Colori custom | ⚠️ | Pro+ | Limitato |
| **Design** | Logo | ✅ | Tutti | Header only |
| **Design** | CSS custom | ❌ | - | Non disponibile |
| **Analytics** | Visite menu | ✅ | Tutti | Conteggio base |
| **Analytics** | Prodotti popolari | ✅ | Pro+ | Top 10 |
| **Analytics** | Revenue reports | ✅ | Pro+ | Giornaliero/mensile |
| **Analytics** | Export dati | ⚠️ | Pro+ | Solo CSV |
| **CRM** | Database clienti | ✅ | Pro+ | Base |
| **CRM** | Storico per cliente | ✅ | Pro+ | Ordini passati |
| **CRM** | Segmentazione | ❌ | - | Non disponibile |
| **CRM** | Email marketing | ❌ | - | Non disponibile |
| **CRM** | Loyalty program | ❌ | - | Non disponibile |
| **Multi-store** | Piu sedi | ✅ | Pro+ | Fino a 5 |
| **Multi-store** | Menu condivisi | ✅ | Pro+ | Sync opzionale |
| **Multi-store** | Prezzi per sede | ✅ | Pro+ | Override |
| **Team** | Multi-utente | ✅ | Pro+ | Fino a 5 |
| **Team** | Ruoli | ⚠️ | Pro+ | Solo 2 ruoli |
| **Team** | Activity log | ❌ | - | Non disponibile |
| **Integrazioni** | Stripe | ✅ | Tutti | Pagamenti |
| **Integrazioni** | PayPal | ✅ | Tutti | Pagamenti |
| **Integrazioni** | POS | ⚠️ | Enterprise | Solo alcuni |
| **Integrazioni** | Delivery | ❌ | - | Non disponibile |
| **Settings** | Orari apertura | ✅ | Tutti | Per giorno |
| **Settings** | Valute | ✅ | Tutti | 50+ valute |
| **Settings** | Tasse/IVA | ✅ | Tutti | Configurabile |

---

## Analisi per Sezione

### 1. Dashboard Principale

**Layout:**
- Sidebar sinistra scura (nero/grigio scuro)
- Area contenuto bianca con cards
- Header con nome ristorante e notifiche

**Metriche mostrate:**
- Ordini oggi (numero + trend)
- Revenue oggi (importo)
- Clienti attivi (ultimi 7 giorni)
- Scansioni QR (oggi)

**Grafici:**
- Line chart ordini ultimi 7 giorni
- Bar chart revenue settimanale
- Pie chart prodotti piu venduti

**Filtri temporali:** Oggi, 7 giorni, 30 giorni, Custom

**Quick Actions:**
- "Nuovo ordine manuale"
- "Aggiungi prodotto"
- "Genera QR"

**UX Score:** 7/10
- Pro: Chiaro, metriche utili
- Contro: Pochi insights, no suggerimenti

### 2. Gestione Menu

**Struttura:**
- Lista categorie sidebar sinistra
- Griglia prodotti area centrale
- Drag & drop per riordinare

**Form Prodotto:**
```
- Nome (obbligatorio)
- Descrizione (textarea)
- Prezzo base
- Prezzo scontato (opzionale)
- Foto (1 principale + 3 gallery)
- Categoria (select)
- Allergeni (multi-select)
- Modificatori (link a sezione separata)
- Disponibilita (toggle on/off)
- Scheduling (orari specifici)
```

**Modificatori:**
- Gruppi separati (es: "Cottura", "Extra")
- Prezzo aggiuntivo per opzione
- Min/max selezioni

**UX Score:** 8/10
- Pro: Intuitivo, drag & drop funziona bene
- Contro: No bulk edit, no duplicazione veloce

### 3. QR Code Management

**Tipi QR:**
1. Menu generale (1 per ristorante)
2. QR per tavolo (numerati)
3. QR takeaway (senza numero tavolo)

**Personalizzazione:**
- Colore foreground
- Colore background
- Forma dots (quadrati, rotondi)
- NO logo al centro (solo Pro+)

**Download:**
- PNG (varie dimensioni)
- PDF (foglio A4 con istruzioni)
- SVG (solo Pro+)

**UX Score:** 7/10
- Pro: Semplice da usare
- Contro: Personalizzazione limitata

### 4. Kitchen Display System

**Vista dedicata:**
- URL separato per schermo cucina
- Cards ordini in colonne per stato
- Drag & drop tra stati

**Stati:**
1. Nuovo (rosso)
2. In preparazione (giallo)
3. Pronto (verde)
4. Completato (grigio)

**Features:**
- Timer per ogni ordine
- Notifica sonora nuovi ordini
- Filtro per tipo (dine-in, takeaway)
- Stampa singola comanda

**UX Score:** 8/10
- Pro: Chiaro, utilizzabile su tablet
- Contro: No customizzazione layout

### 5. Reports & Analytics

**Report disponibili:**
- Revenue giornaliero/settimanale/mensile
- Ordini per ora del giorno
- Prodotti piu venduti (top 20)
- Performance per tavolo
- Scansioni QR nel tempo

**Grafici:**
- Line charts interattivi
- Bar charts comparativi
- Tabelle esportabili

**Export:** Solo CSV (no PDF, no Excel nativo)

**UX Score:** 6/10
- Pro: Dati essenziali presenti
- Contro: No insights AI, export limitato

### 6. Impostazioni

**Profilo Business:**
- Nome, indirizzo, telefono
- Logo (upload)
- Orari apertura (per giorno)
- Timezone

**Pagamenti:**
- Stripe connect
- PayPal business
- Cash (toggle)

**Notifiche:**
- Email nuovi ordini
- Suono browser
- NO push mobile

**UX Score:** 7/10
- Pro: Essenziale e funzionale
- Contro: Poche opzioni avanzate

---

## UX Patterns Documentati

### Navigazione
- Sidebar fissa a sinistra (collassabile su mobile)
- Breadcrumb in header
- Tab per sottosezioni

### Forms
- Validazione inline (real-time)
- Asterisco per campi obbligatori
- Error messages sotto il campo
- Save button sticky in basso

### Feedback
- Toast notifications (angolo in basso a destra)
- Success: verde, 3 secondi auto-dismiss
- Error: rosso, persistent fino a click
- Loading: spinner in button

### Modali
- Overlay scuro
- Close con X o click esterno
- Confirm dialog per azioni distruttive

### Empty States
- Illustrazione placeholder
- Messaggio esplicativo
- CTA primaria evidente

---

## Pricing Analysis

### Piani Disponibili

| Piano | Prezzo | Limiti |
|-------|--------|--------|
| **Starter** | Free | 1 store, 20 prodotti, no ordini |
| **Regular** | $17/mese | 1 store, prodotti illimitati, ordini |
| **Pro** | $38/mese | 3 stores, multilingua, KDS |
| **Enterprise** | Custom | Illimitato, integrazioni custom |

### Value Proposition

- **Starter:** Demo/trial, molto limitato
- **Regular:** Core features per piccolo ristorante
- **Pro:** Multi-location, features avanzate
- **Enterprise:** Catene, supporto dedicato

### Confronto Mercato

| Competitor | Prezzo Entry | Note |
|------------|--------------|------|
| MenuTiger | $17/mese | Economico, features base |
| Square | $60/mese | Piu completo, POS integrato |
| Toast | $69/mese | Enterprise focus |
| Lightspeed | $89/mese | Premium, molte integrazioni |

**Posizionamento:** Entry-level, value-for-money per piccoli esercizi.

---

## Raccomandazioni per GudBro

### DA COPIARE

1. **Kitchen Display System** - Schermata dedicata per cucina, drag & drop stati ordine
2. **QR per tavolo con tracking** - Ogni tavolo ha QR unico, analytics scansioni
3. **Sidebar navigation pattern** - Chiara, collapsabile, con badges
4. **Form prodotto struttura** - Campi ben organizzati, modificatori separati
5. **Toast notifications** - Feedback non intrusivo ma visibile
6. **Empty states con CTA** - Guida utente quando non ci sono dati

### DA EVITARE

1. **Analytics superficiali** - Solo numeri, no insights o suggerimenti
2. **Export solo CSV** - Limitante per utenti business
3. **Personalizzazione design limitata** - Frustrante per brand-conscious
4. **No activity log** - Problematico per team
5. **Ruoli troppo semplici** - Solo 2 ruoli non bastano
6. **No loyalty/CRM avanzato** - Opportunita mancata

### DA MIGLIORARE (Opportunita GudBro)

1. **AI-powered insights**
   - Suggerimenti automatici (es: "Il Tiramisù vende 40% in più il weekend")
   - Previsioni domanda
   - Ottimizzazione menu automatica

2. **Design system ricco**
   - Piu temi (10+)
   - CSS custom per Pro
   - Brand kit completo (colori, font, stile)

3. **CRM & Loyalty**
   - Programma punti integrato
   - Segmentazione clienti
   - Campagne automatiche
   - Social sharing program

4. **Export professionale**
   - PDF branded
   - Excel con formule
   - API per integrazioni

5. **Team management avanzato**
   - Ruoli granulari (5+)
   - Permessi per sezione
   - Audit log completo
   - Turni e scheduling

6. **Mobile-first backoffice**
   - PWA ottimizzata
   - Gestione ordini da telefono
   - Notifiche push native

### DIFFERENZIATORI POTENZIALI

1. **AI Menu Optimization** - Suggerimenti automatici per prezzi, descrizioni, foto
2. **Social Sharing Program** - Clienti condividono, guadagnano punti
3. **Multi-vertical** - Non solo ristorazione (wellness, rentals, coffeeshop)
4. **Ingredient Intelligence** - Database ingredienti con allergeni, nutrition, costi
5. **QR Artistici** - Design QR unici e brandizzati (gia in sviluppo)
6. **White-label option** - Rivendita a agenzie/consulenti

---

## Screenshots Descritti

### Dashboard Home
- **Layout:** Sidebar sinistra scura (200px), contenuto bianco
- **Header:** Logo ristorante, dropdown utente, icona notifiche
- **Cards:** 4 KPI cards in row (Ordini, Revenue, Clienti, Scansioni)
- **Grafici:** Line chart grande sotto, 2 piccoli a destra
- **Colori:** Primary blue (#2563EB), success green, neutral grays

### Lista Prodotti
- **Layout:** Sidebar categorie (scrollabile), griglia prodotti 3 colonne
- **Card prodotto:** Foto quadrata, nome, prezzo, badge disponibilita
- **Actions:** Hover mostra edit/delete icons
- **Toolbar:** Search, filtri, "Add Product" button primario

### Form Nuovo Prodotto
- **Layout:** Form singola colonna, max-width 600px centrato
- **Sezioni:** Info base, Pricing, Media, Disponibilita, Modificatori
- **Upload foto:** Drag & drop area, preview thumbnails
- **Footer:** Cancel (ghost), Save (primario) sticky

### Kitchen Display
- **Layout:** 4 colonne (Nuovo, In Prep, Pronto, Completato)
- **Card ordine:** Numero, ora, items list, timer, tavolo
- **Colori stati:** Rosso, Giallo, Verde, Grigio
- **Header:** Filtri tipo ordine, toggle suono

---

## Conclusioni

MenuTiger e un competitor solido per il segmento entry-level del mercato QR menu. La sua forza sta nella semplicita e nel prezzo accessibile, ma lascia significative opportunita per differenziazione in aree come:

- Analytics avanzati e AI
- CRM e programmi fedelta
- Personalizzazione design
- Gestione team enterprise
- Integrazioni ecosistema

GudBro puo posizionarsi come alternativa premium con focus su:
1. Intelligenza artificiale integrata
2. Multi-vertical (non solo ristorazione)
3. Database ingredienti professionale
4. Design QR artistici unici
5. Programma loyalty con social sharing

Il gap di prezzo giustificabile se il valore aggiunto e chiaramente comunicato e dimostrabile.

---

**File:** `docs/competitor-audits/MENUTIGER-AUDIT-REPORT.md`
**Audit by:** Claude Browser (Opus 4.5)
**Report by:** Claude Code (Opus 4.5)
