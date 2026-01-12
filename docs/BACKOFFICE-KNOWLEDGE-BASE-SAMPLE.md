# GUDBRO Backoffice - Knowledge Base (Sample)

> **Tipo:** Documento di esempio per validazione formato
> **Data:** 2026-01-11
> **Pagine coperte:** 3 (Dashboard, Menu Editor, QR Codes)
> **Target:** Merchant (utente finale)

---

## Come usare questa guida

Ogni pagina ha:

- **Scopo** - Cosa puoi fare qui
- **Come arrivarci** - Navigazione
- **Azioni disponibili** - Lista funzionalita
- **Workflow tipici** - Procedure passo-passo
- **FAQ** - Domande frequenti
- **Tips** - Consigli per uso ottimale

---

# /dashboard

## Scopo

La tua home page dopo il login. Vedi a colpo d'occhio lo stato del tuo ristorante e accedi rapidamente alle funzioni principali.

## Come arrivarci

- Login automatico
- Click sul logo GUDBRO (da qualsiasi pagina)
- URL: `/dashboard`

## Cosa vedi

### Checklist Onboarding

Se sei nuovo, vedrai una checklist con i passi per configurare il ristorante:

1. Dettagli ristorante (nome, logo, contatti)
2. Crea menu (categorie)
3. Aggiungi piatti
4. Personalizza QR code

### Cards Organizzazione

- **Organization** - Nome e tipo della tua organizzazione
- **Brand** - Il brand attivo con colore primario
- **Location** - La location selezionata con valuta e lingua

### Statistiche Rapide

| Stat         | Significato                 |
| ------------ | --------------------------- |
| Menu Items   | Totale piatti nel menu      |
| Active Items | Piatti attualmente visibili |
| Categories   | Categorie create            |
| Ingredients  | Ingredienti nel database    |

### Attivita Recente

Lista degli ultimi piatti aggiunti con nome, prezzo e data.

### Quick Actions

Scorciatoie per:

- Aggiungere nuovo piatto
- Gestire categorie
- Tradurre contenuti
- Vedere analytics

## Workflow Tipici

### Primo accesso

1. Completa la checklist onboarding nell'ordine suggerito
2. Clicca su ogni step per essere guidato alla pagina giusta
3. Lo step si segna automaticamente come completato

### Check giornaliero

1. Guarda le statistiche per anomalie
2. Controlla attivita recente
3. Usa Quick Actions per task comuni

## FAQ

**D: Come cambio brand/location?**
R: Usa il selettore nel menu laterale (sidebar) per cambiare brand o location attiva.

**D: Le statistiche sono in tempo reale?**
R: Si aggiornano al caricamento della pagina. Refresh per dati aggiornati.

**D: Posso nascondere la checklist onboarding?**
R: Completa tutti gli step e scomparira automaticamente.

## Tips

- Usa Quick Actions invece di navigare nel menu per task frequenti
- La card "Sistema 5 Dimensioni" ti ricorda che i tuoi piatti sono protetti con dati di sicurezza alimentare completi

---

# /content/menu/[slug]

## Scopo

Editor completo per modificare un singolo piatto del menu. Gestisci nome, prezzo, ingredienti, allergeni, personalizzazioni e disponibilita.

## Come arrivarci

- Da `/content/menu` click su un piatto
- URL: `/content/menu/cappuccino` (dove "cappuccino" e lo slug del piatto)

## Struttura (6 Tab)

### Tab 1: Basic Info

**Cosa puoi fare:**

- Nome del piatto in 3 lingue (EN, VI, IT)
- Descrizione in 3 lingue
- Categoria di appartenenza
- Immagine prodotto
- Prezzo e prezzo barrato (per sconti)

### Tab 2: Ingredients

**Cosa puoi fare:**

- Aggiungere ingredienti dalla libreria
- Specificare quantita in grammi per ingrediente
- Marcare ingredienti come "opzionali"
- Il sistema calcola automaticamente:
  - Allergeni (30 tipi)
  - Intolleranze (10 tipi)
  - Flag dietetici (12 tipi)
  - Calorie totali

### Tab 3: Safety & Dietary

**Cosa puoi fare:**

- Vedere/modificare allergeni (EU 14 + Korea 7 + Japan 7 + GUDBRO 2)
- Vedere/modificare intolleranze
- Impostare compatibilita dietetiche (vegano, halal, kosher...)
- Selezionare livello di piccantezza (0-5)
- Inserire valori nutrizionali

### Tab 4: Customizations

**Cosa puoi fare:**

- Creare gruppi di personalizzazione (es: "Dimensione", "Tipo di latte")
- Per ogni gruppo: opzioni con nome e sovrapprezzo
- Impostare se obbligatorio o opzionale
- Definire opzione default

### Tab 5: Availability

**Cosa puoi fare:**

- Attivare/disattivare il piatto
- Impostare come "disponibile" o "esaurito"
- Marcare come "Featured" o "New"
- Impostare orari disponibilita (es: solo pranzo)
- Gestire inventario con soglia low-stock

### Tab 6: SEO & Tags

**Cosa puoi fare:**

- Modificare URL slug
- Aggiungere tag per ricerca
- Impostare ordine di visualizzazione

## Workflow Tipici

### Aggiungere nuovo piatto completo

1. Basic Info: nome EN (obbligatorio), prezzo, categoria
2. Ingredients: aggiungi ingredienti con quantita
3. Safety: verifica allergeni calcolati, aggiungi manuali se necessario
4. Customizations: crea opzioni se il piatto le prevede
5. Availability: attiva e imposta come "New"
6. Salva

### Segnare piatto esaurito (veloce)

1. Vai su tab Availability
2. Disattiva toggle "Available"
3. Salva

### Calcolo automatico allergeni

1. Vai su tab Ingredients
2. Aggiungi tutti gli ingredienti con quantita
3. Il sistema calcola automaticamente allergeni e nutrizione
4. Vai su tab Safety per verificare

## FAQ

**D: Come funziona il calcolo automatico degli allergeni?**
R: Ogni ingrediente nel database ha allergeni pre-configurati. Quando aggiungi ingredienti, il sistema fa l'OR logico: se almeno un ingrediente contiene glutine, il piatto contiene glutine.

**D: Posso sovrascrivere gli allergeni calcolati?**
R: Si, vai su tab Safety e modifica manualmente. Il sistema mostrera "Computed from ingredients" o "Manual".

**D: Come aggiungo un ingrediente che non esiste?**
R: Vai su `/content/ingredients` per aggiungere nuovi ingredienti al database.

**D: Cosa sono gli ingredienti "Optional"?**
R: Non vengono contati nel calcolo allergeni. Utile per guarnizioni a scelta.

## Tips

- Completa sempre il tab Ingredients: oltre agli allergeni, calcola anche le calorie
- Usa tag per raggruppare piatti (es: "summer", "bestseller", "spicy")
- Il badge "Unsaved changes" ti avvisa se hai modifiche non salvate

---

# /qr-codes

## Scopo

Crea e gestisci i QR code del tuo ristorante. Ogni QR puo linkare al menu, a una pagina specifica, o fornire credenziali WiFi.

## Come arrivarci

- Sidebar > QR Codes
- URL: `/qr-codes`

## Azioni Disponibili

### Quick Create (3 preset)

| Tipo             | Uso                   | Cosa crea                               |
| ---------------- | --------------------- | --------------------------------------- |
| **Table QR**     | Stampa per tavoli     | QR con numero tavolo, apre menu         |
| **Marketing QR** | Flyer, social, eventi | QR tracciato per campagne               |
| **WiFi QR**      | Poster in locale      | QR che connette automaticamente al WiFi |

### Custom QR

Click "Custom QR" per opzioni avanzate:

- Tipo (URL o WiFi)
- Contesto (table, takeaway, delivery, external)
- Limiti di scansione
- Design personalizzato (colori, logo)
- Date di validita

### Per ogni QR esistente

| Azione   | Icona       | Cosa fa                   |
| -------- | ----------- | ------------------------- |
| Download | freccia giu | Scarica PNG 512px         |
| Edit     | matita      | Modifica impostazioni     |
| Copy URL | copia       | Copia link negli appunti  |
| Toggle   | occhio      | Attiva/disattiva          |
| Delete   | cestino     | Elimina (chiede conferma) |

### Filtri

Filtra la lista per:

- Tipo (URL, WiFi)
- Contesto (Table, Marketing, Takeaway, Delivery)
- Status (Active, Inactive)

## Workflow Tipici

### Creare QR per tutti i tavoli

1. Click "Table QR"
2. Inserisci numero tavolo (es: "5")
3. Personalizza design se vuoi
4. Salva e scarica
5. Ripeti per ogni tavolo

### Creare QR per campagna marketing

1. Click "Marketing QR"
2. Dai un nome descrittivo (es: "Flyer Estate 2026")
3. Opzionale: imposta limite scansioni o data scadenza
4. Salva e scarica
5. Monitora scansioni in Analytics

### Disattivare QR temporaneamente

1. Trova il QR nella lista
2. Click icona occhio (toggle)
3. Il QR diventa grigio e non funziona piu
4. Click di nuovo per riattivare

## FAQ

**D: Cosa succede quando qualcuno scansiona un QR disattivato?**
R: Vede una pagina "QR Inactive" con link al menu e contatti del ristorante.

**D: Posso modificare un QR dopo averlo stampato?**
R: Si! Il QR punta a un URL fisso (`go.gudbro.com/xxx`). Puoi cambiare la destinazione senza ristampare.

**D: Come vedo le statistiche di un QR?**
R: Click "View Analytics" in alto a destra, oppure vai su `/analytics?tab=qr`.

**D: Posso creare QR con il mio logo?**
R: Si, nel Custom QR c'e l'opzione per caricare logo e personalizzare colori.

**D: C'e un limite di QR che posso creare?**
R: Dipende dal piano. Free: 10 QR, Pro: illimitati.

## Tips

- Usa nomi descrittivi per i QR: "Tavolo 5" e meglio di "QR 001"
- I QR Marketing sono ottimi per A/B test: crea 2 QR diversi per lo stesso flyer e confronta
- Scarica sempre in PNG 512px per stampa di qualita

---

# /customers/intelligence

## Scopo

Dashboard AI per analizzare i tuoi clienti. Vedi segmentazione, clienti a rischio churn, e raccomandazioni AI per massimizzare il Customer Lifetime Value (CLV).

## Come arrivarci

- Sidebar > Customers > Intelligence
- URL: `/customers/intelligence`

## Cosa vedi

### Statistiche principali

| Stat               | Significato                    |
| ------------------ | ------------------------------ |
| Total CLV          | Valore totale dei tuoi clienti |
| Customers Analyzed | Quanti clienti hanno dati AI   |
| At Risk            | Clienti ad alto rischio churn  |
| Average CLV        | Media del valore cliente       |

### Banner urgente

Se hai clienti ad alto rischio, appare un banner rosso con il valore potenzialmente a rischio.

### Segmenti clienti

7 segmenti automatici basati su comportamento:

- **Champion** - Acquirenti frequenti alto valore
- **Loyal** - Clienti fedeli regolari
- **Potential** - Potrebbero diventare champion
- **New** - Appena acquisiti
- **At Risk** - Stanno diminuendo frequenza
- **Dormant** - Non visitano da tempo
- **Lost** - Considerati persi

### Top Recommended Actions

Le 3 azioni piu urgenti suggerite dall'AI, cliccabili per vedere i dettagli del cliente.

### Tabella At-Risk

Lista clienti ad alto rischio ordinati per CLV, con link diretto al profilo cliente.

## Azioni disponibili

| Azione       | Cosa fa                          |
| ------------ | -------------------------------- |
| Sync         | Aggiorna dati da analytics       |
| Analyze All  | Ricalcola AI per tutti i clienti |
| View Details | Apre profilo cliente completo    |

## Workflow Tipici

### Check settimanale clienti

1. Guarda il banner urgente per revenue a rischio
2. Controlla i top 3 recommended actions
3. Click su clienti at-risk per vedere dettagli
4. Usa "Send Promo" o "Message" per riattivare

### Setup iniziale

1. Click "Sync" per importare dati analytics
2. Click "Analyze All" per generare intelligence AI
3. Aspetta qualche secondo per il calcolo
4. Rivedi segmenti e azioni suggerite

## FAQ

**D: Come viene calcolato il CLV?**
R: Basato su storico ordini, frequenza visite, valore medio ordine, e pattern comportamentali.

**D: Cosa significa churn risk score?**
R: Probabilita (0-100%) che il cliente smetta di visitare. Alto = azione urgente.

**D: I dati si aggiornano automaticamente?**
R: No, usa "Sync" e "Analyze All" per aggiornare manualmente.

---

# /customers/[accountId]

## Scopo

Profilo completo di un singolo cliente. Vedi tutte le metriche, rischio churn, storico trigger e raccomandazioni AI personalizzate.

## Come arrivarci

- Da `/customers/intelligence` click su un cliente
- URL: `/customers/[uuid-del-cliente]`

## Cosa vedi

### Header

- Avatar cliente (o iniziali)
- Nome e email
- Data di follow
- Segment badge (Champion, Loyal, etc.)
- CLV stimato

### Metriche (4 cards)

| Metrica        | Significato              |
| -------------- | ------------------------ |
| Lifetime Value | Valore totale stimato    |
| Total Orders   | Numero ordini effettuati |
| Avg Order      | Valore medio per ordine  |
| Loyalty Points | Punti fedelta accumulati |

### Churn Risk

- Gauge visuale 0-100%
- Badge livello (LOW/MEDIUM/HIGH/CRITICAL)
- Giorni dall'ultima visita
- Prossima visita prevista
- Fattori di rischio specifici

### AI Recommendations

Lista azioni suggerite con priorita e ROI atteso. Ogni azione ha un bottone per eseguirla.

### Activity Summary

- Total visits
- Last visit date
- Feedback count
- Average rating (stelle)

### Trigger History

Tabella con tutti i trigger automatici eseguiti su questo cliente:

- Data
- Nome trigger
- Tipo (churn, birthday, etc.)
- Status (sent, converted, failed)
- Valore conversione

## Azioni disponibili

| Azione         | Cosa fa                         |
| -------------- | ------------------------------- |
| Message        | Invia messaggio diretto         |
| Send Promo     | Invia promozione personalizzata |
| Execute Action | Esegue azione AI suggerita      |

## Workflow Tipici

### Riattivare cliente dormiente

1. Controlla churn risk score
2. Leggi i fattori di rischio
3. Guarda le raccomandazioni AI
4. Click "Send Promo" con offerta personalizzata
5. Monitora nella Trigger History se converte

### Analizzare cliente VIP

1. Guarda il CLV e segment
2. Controlla frequenza ordini e average
3. Vedi se ha feedback/rating
4. Considera per programma loyalty speciale

---

# /ai/triggers

## Scopo

Crea e gestisci trigger automatici basati su AI. Automatizza promozioni, alert e azioni in base a comportamento cliente.

## Come arrivarci

- Sidebar > AI > Triggers
- URL: `/ai/triggers`

## Tipi di Trigger

### 1. Churn Risk

Si attiva quando un cliente raggiunge un certo livello di rischio churn.

- Livelli: Medium, High, Critical
- Azione tipica: Invia promo win-back

### 2. Inactivity

Si attiva dopo X giorni senza visite.

- Configurabile: 7, 14, 30, 60 giorni
- Azione tipica: Reminder con incentivo

### 3. Birthday

Si attiva il giorno del compleanno cliente.

- Richiede data nascita in profilo
- Azione tipica: Sconto compleanno

### 4. Milestone

Si attiva al raggiungimento di obiettivi.

- Es: 10 ordini, 500 euro spesi
- Azione tipica: Reward loyalty

### 5. Segment Change

Si attiva quando cliente cambia segmento.

- Es: Da "At Risk" a "Lost"
- Azione tipica: Alert staff

### 6. Custom

Regole personalizzate con condizioni multiple.

## Azioni disponibili per ogni trigger

| Tipo Azione    | Cosa fa              |
| -------------- | -------------------- |
| Notification   | Invia push/email/SMS |
| Promo          | Invia codice sconto  |
| Loyalty Reward | Aggiunge punti       |
| Alert Manager  | Notifica staff       |

## Budget & Limiti

Ogni trigger puo avere:

- **Budget totale** - Spesa massima campagna
- **Max redemptions** - Limite utilizzi (es: "primi 1000 caffe")
- **Date range** - Validita temporale
- Auto-pause quando limiti raggiunti

## Workflow Tipici

### Creare trigger win-back

1. Click "Create Trigger"
2. Step 1: Seleziona "Churn Risk"
3. Step 2: Imposta condizioni (es: High + Critical)
4. Step 3: Seleziona azione "Promo" con 15% sconto
5. Step 4: Imposta budget (es: 500 euro, max 100 usi)
6. Step 5: Rivedi e attiva

### Monitorare performance

1. Guarda le cards ROI sulla pagina
2. Click su trigger per vedere dettagli
3. Controlla: triggered, converted, conversion rate
4. Adjust budget o condizioni se necessario

## FAQ

**D: I trigger si eseguono automaticamente?**
R: Si, il sistema monitora i clienti e attiva i trigger quando le condizioni sono soddisfatte.

**D: Posso mettere in pausa un trigger?**
R: Si, usa il toggle Active/Inactive o il dropdown menu > Pause.

**D: Come vedo il ROI di un trigger?**
R: Ogni card trigger mostra: cost, revenue, ROI ratio, conversions.

**D: Cosa succede quando finisce il budget?**
R: Il trigger si mette automaticamente in pausa con motivo "budget_exhausted".

## Tips

- Inizia con trigger semplici (churn risk) prima di quelli custom
- Usa il budget per controllare la spesa
- Monitora il ROI e disattiva trigger con basso ritorno
- Il pulsante "AI Suggestion" suggerisce trigger basati sui tuoi dati

---

# Prossimi passi

Se questo formato funziona, posso espandere a tutte le 55+ pagine organizzate per area:

1. **Dashboard & Overview** (6 pagine)
2. **Content Management** (12 pagine)
3. **Food Costs** (2 pagine)
4. **Marketing** (4 pagine)
5. **Customers** (6 pagine) - includes Intelligence, Detail
6. **AI** (2 pagine) - Triggers, Hub
7. **Orders** (2 pagine)
8. **Settings** (8 pagine)
9. **Other** (15 pagine)

Tempo stimato: ~2-3 ore per completare tutte le pagine.
