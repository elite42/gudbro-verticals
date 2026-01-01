# Prompt per Audit Backoffice Competitor

> **Da usare con Claude Browser (Opus 4.5)**
>
> Copia questo prompt e usalo per analizzare il backoffice di un competitor

---

## Prompt

```
Sei un esperto UX/UI e product analyst. Devi eseguire un audit completo del backoffice di [NOME_COMPETITOR] per il settore hospitality/ristorazione.

## Obiettivo
Documentare ogni funzionalità, pattern UX, e decisione di design per informare lo sviluppo del backoffice GudBro.

## Istruzioni

### 1. NAVIGAZIONE PRINCIPALE
Per ogni voce del menu principale, documenta:
- Nome della sezione
- Icona usata (descrivi)
- Sottomenu (se presenti)
- Badge/indicatori (es. "NEW", numeri, pallini)

Formato:
```
📊 Dashboard
├── Overview
├── Analytics
└── Reports [PRO badge]
```

### 2. DASHBOARD PRINCIPALE
Analizza la dashboard home:
- Quali KPI sono mostrati?
- Layout (cards, grafici, tabelle?)
- Filtri temporali disponibili
- Quick actions visibili
- Stato vuoto (empty state) - come appare senza dati?

### 3. GESTIONE MENU/PRODOTTI
- Come si crea un nuovo prodotto?
- Campi disponibili (nome, prezzo, foto, descrizione, etc.)
- Gestione categorie
- Modificatori/varianti
- Gestione allergeni
- Traduzioni multilingua?
- Import/export funzionalità

### 4. GESTIONE ORDINI
- Vista ordini in tempo reale
- Stati ordine disponibili
- Notifiche (suoni, popup?)
- Storico ordini
- Filtri e ricerca
- Stampa comande

### 5. ANALYTICS & REPORTING
- Tipi di report disponibili
- Metriche tracciate
- Export formati (PDF, Excel, CSV?)
- Grafici interattivi?
- Comparazioni temporali

### 6. GESTIONE CLIENTI/CRM
- Database clienti
- Segmentazione
- Storico ordini per cliente
- Programmi fedeltà
- Comunicazioni/marketing

### 7. TEAM & PERMESSI
- Come si invitano utenti?
- Ruoli disponibili
- Permessi granulari?
- Audit log attività

### 8. IMPOSTAZIONI
- Profilo business
- Orari apertura
- Metodi pagamento
- Integrazioni disponibili
- Personalizzazione brand (colori, logo)
- Notifiche configurabili

### 9. BILLING & SUBSCRIPTION
- Piani disponibili (nomi e prezzi)
- Features per piano
- Upgrade/downgrade flow
- Fatturazione e storico

### 10. UX PATTERNS
Documenta pattern ricorrenti:
- Modali vs pagine separate
- Form validation (inline, on submit?)
- Loading states
- Error handling
- Success feedback (toast, redirect?)
- Keyboard shortcuts
- Responsive/mobile

### 11. DESIGN SYSTEM
- Palette colori principale
- Font utilizzati
- Stile bottoni (rounded, sharp?)
- Stile cards
- Spacing consistency
- Dark mode disponibile?

### 12. ONBOARDING
- Primo accesso experience
- Tutorial/guide
- Checklist setup
- Demo data disponibili?

### 13. FEATURE UNICHE
Cosa fa questo competitor che altri non fanno?
Quali sono i loro differenziatori?

### 14. PUNTI DEBOLI
Cosa manca o è fatto male?
Dove l'UX è confusa?
Features richieste ma mancanti?

## Output Richiesto

Produci un report strutturato con:

1. **Executive Summary** (3-5 bullet points)
2. **Screenshots descritti** (descrivi cosa vedi in ogni schermata)
3. **Feature Matrix** (tabella funzionalità)
4. **UX Score** (1-10 per categoria)
5. **Raccomandazioni per GudBro** (cosa copiare, cosa evitare, cosa migliorare)

## Competitors Suggeriti

- **Square for Restaurants** (squareup.com)
- **Toast** (pos.toasttab.com)
- **Lightspeed Restaurant** (lightspeedhq.com)
- **TouchBistro** (touchbistro.com)
- **Clover** (clover.com)
- **Revel Systems** (revelsystems.com)
- **Poster POS** (joinposter.com)
- **Zettle** (zettle.com)
- **SumUp** (sumup.com)
- **Deliverect** (deliverect.com) - focus delivery
- **Otter** (tryotter.com) - focus delivery

Per competitor italiani:
- **Tilby** (tilby.com)
- **Cassa in Cloud** (cassaincloud.it)
- **Scloby** (scloby.com)
- **iPratico** (ipratico.com)

## Note

- Fai screenshot mentali e descrivi dettagliatamente
- Nota i micro-interactions (hover, transitions)
- Identifica il target user (piccolo ristorante vs catena)
- Valuta la curva di apprendimento
- Controlla la documentazione/help center
```

---

## Come Usare

1. Apri Claude.ai con Browser capability (Opus 4.5)
2. Copia il prompt sopra
3. Sostituisci `[NOME_COMPETITOR]` con il nome del competitor
4. Fornisci l'URL del backoffice/dashboard
5. Se serve login, crea un account trial
6. Lascia che Claude navighi e documenti

## Esempio di Richiesta

```
Esegui l'audit del backoffice di Square for Restaurants.
URL: https://squareup.com/dashboard

[INCOLLA PROMPT COMPLETO]
```

---

## Competitors Prioritari per GudBro

### Tier 1 - Diretti (Digital Menu + POS)
1. **Square for Restaurants** - Leader USA, ottima UX
2. **Toast** - Specifico ristorazione, molto completo
3. **Lightspeed** - Forte in Europa

### Tier 2 - QR Menu Specifici
1. **me-qr.com** - QR menu semplice
2. **Menufy** - Menu digitale
3. **Chefly** - Menu + ordini

### Tier 3 - Italiani
1. **Tilby** - Italiano, buon design
2. **Cassa in Cloud** - Molto diffuso in Italia
3. **Scloby** - Focus piccoli esercizi

---

**File:** `docs/prompts/COMPETITOR-BACKOFFICE-AUDIT-PROMPT.md`
