# 📋 TODO

> Task da fare, ordinate per priorità.
> Quando inizi una task → spostala in `2-IN-PROGRESS.md`

**Last Updated:** 2026-01-12

---

## P0 - Critico (Questa Settimana)

| ID  | Feature | Descrizione     | Area | Effort |
| --- | ------- | --------------- | ---- | ------ |
| -   | -       | Nessuna task P0 | -    | -      |

---

## P0.5 - Strategia Prodotto & Onboarding (2026-01-10)

> **Nuova sezione** emersa dalla sessione strategica sui modelli di servizio.
> Queste decisioni impattano onboarding B2B, pricing tiers, e conversione.

### SERVICE-MODELS - Modelli di Servizio Locale

**Vision:** Il modello di servizio del locale determina le feature necessarie.

**Modelli identificati:**

| Modello                   | Ordine                | Pagamento  | QR Serve Per             |
| ------------------------- | --------------------- | ---------- | ------------------------ |
| Table Service             | Cameriere             | Fine pasto | Consultazione menu       |
| Counter + Delivery        | Banco + numero tavolo | Prima/dopo | Pre-decisione            |
| Counter + Pickup          | Banco                 | Subito     | Pre-decisione            |
| Counter + Menu Illuminato | Banco                 | Subito     | Accessibilità, discovery |
| QR Ordering               | Telefono              | Telefono   | Tutto il flusso          |

**Implicazioni:**

- [ ] Prima domanda onboarding: "Come funziona il servizio nel tuo locale?"
- [ ] Feature e pain point mostrati in base al modello
- [ ] Configurazione automatica flusso pagamento/ordine

---

### AI-ONBOARDING - Onboarding Conversazionale con AI

**Vision:** Sito minimal con chat centrale. L'AI fa domande, capisce il business, configura il prodotto.

**Perché funziona:**

- **Continuità:** L'AI che fa onboarding diventa il co-manager
- **Demo live:** Il prospect sperimenta il valore AI prima di pagare
- **Zero form:** Conversazione naturale invece di 15 campi
- **Configurazione automatica:** Mentre chatta, AI costruisce il profilo
- **Qualificazione naturale:** Capisce subito se lead serio

**UI:**

```
┌─────────────────────────────────────────┐
│                 GUDBRO                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Ciao! Sono il tuo futuro        │   │
│  │ co-manager. Raccontami del tuo  │   │
│  │ locale - che tipo di attività è?│   │
│  └─────────────────────────────────┘   │
│                                         │
│  [___________________________] [Invia]  │
│                                         │
└─────────────────────────────────────────┘
```

**Dipendenze:** Infrastruttura AI Co-Manager esistente

---

### TIER-MENU-ONLY - Pricing Tier "Menu Only"

**Vision:** Per merchant che non vogliono cambiare flusso operativo.

**Include:**

- Menu consultabile via QR
- Promozioni visibili
- Traduzioni multilingua
- Analytics scansioni

**NON include:**

- Ordering digitale
- Pagamenti online
- Notifiche ordine pronto

**Argomenti di vendita:**

- "Non cambi nulla del tuo flusso. Solo un QR sul tavolo."
- "Code più veloci: cliente arriva deciso alla cassa"
- "Più secondi ordini: meno resistenza psicologica"
- "Accessibilità: chi non vede bene legge dal telefono"
- "Discovery: cliente scopre promozioni e novità"

**Strategia:** Entry point per upsell futuro verso ordering digitale.

---

### ORDER-READY-NOTIFICATIONS - Notifiche "Ordine Pronto"

**Vision:** Sostituire buzzer hardware con notifiche su telefono cliente.

**Opzioni implementative:**

| Metodo                 | Come funziona              | Pro                          | Contro                    |
| ---------------------- | -------------------------- | ---------------------------- | ------------------------- |
| Pagina stato ordine    | Cliente resta sulla pagina | Zero frizione                | Deve tenere pagina aperta |
| Web Push               | Solo permesso notifiche    | Funziona a browser chiuso    | Alcuni rifiutano          |
| SMS                    | Numero al checkout         | Affidabile sempre            | Costo per SMS             |
| **WhatsApp/Zalo/LINE** | Chat app                   | Affidabilità max, zero costo | Richiede integrazione     |

**Raccomandazione per Asia:** WhatsApp/Zalo/LINE - tutti li hanno aperti.

**Argomento vendita:**

> "Elimina i buzzer hardware. Niente batterie, niente dispositivi persi, niente manutenzione. Il telefono del cliente è già il suo buzzer."

---

### Percorso Upgrade Cliente

```
Menu Only → Table Ordering → Table Ordering + Notifiche
    ↓              ↓                    ↓
 Consulta      Ordina dal           Ordina + riceve
  e basta       tavolo              notifica pickup/delivery
```

---

## P0.5 - Architettura da Rivedere

> **BLOCCO:** Queste features richiedono revisione architetturale prima dell'implementazione.
> Valuteremo esempi UI/UX insieme prima di procedere.

### PWA-FULL-SITE - Evoluzione PWA → Sito Web Completo

**Vision:** Trasformare la PWA da "menu digitale" a "sito web completo per F&B"

| Aspetto | Stato Attuale       | Target                          |
| ------- | ------------------- | ------------------------------- |
| Mobile  | ✅ Ottimizzato      | Mantieni                        |
| Tablet  | ⚠️ Mobile stretched | Layout 2 colonne                |
| Desktop | ❌ Non adatto       | Layout completo con nav/sidebar |

**Componenti da ripensare:**

- [ ] Navigation (hamburger → desktop nav)
- [ ] Layout wrapper (responsive grid)
- [ ] Menu grid (1 → 2-3-4 colonne)
- [ ] Hero/Landing sections
- [ ] Typography scale per breakpoint
- [ ] Sidebar categorie (sempre visibile su desktop)

**Nuove sezioni sito:**

- [ ] Home page con hero
- [ ] Chi siamo / About
- [ ] Contatti / Mappa
- [ ] Prenotazioni
- [ ] Ordini takeaway

### AI-CUSTOMER-CHAT - AI Assistant Customer-Facing

**Vision:** Estendere AI Co-Manager per gestire chat con clienti

| Canale                 | Priorità |
| ---------------------- | -------- |
| Widget chat su PWA     | P1       |
| Chat su sito marketing | P2       |
| WhatsApp Business      | P2       |
| Instagram DM           | P3       |

**Funzionalità:**

- [ ] Prenotazioni via chat
- [ ] Info menu / allergeni
- [ ] Domande frequenti (orari, location, etc.)
- [ ] Ordini takeaway
- [ ] Escalation a merchant se necessario

**Architettura:**

```
Cliente (chat) → AI Customer Agent → [Escalation] → Merchant (backoffice)
```

**Dipendenze:**

- Richiede PWA-FULL-SITE per widget integrato
- Richiede sistema prenotazioni completato

### RESERVATIONS-SYSTEM - Sistema Prenotazioni

**Vision:** Sistema prenotazioni tavoli integrato

**Funzionalità:**

- [ ] Calendario disponibilità tavoli
- [ ] Form prenotazione (data, ora, persone, note)
- [ ] Conferma automatica / manuale
- [ ] Reminder via email/SMS
- [ ] Gestione no-show
- [ ] Integrazione con AI Chat per prenotazioni via conversazione

**Backoffice:**

- [ ] Vista calendario prenotazioni
- [ ] Gestione tavoli/coperti
- [ ] Blocco date/orari
- [ ] Report prenotazioni

### QR-BUILDER-V2 - Sistema QR Code Avanzato

**Vision:** QR Builder modulare riusabile in tutto il backoffice con contesti intelligenti

**Componente Core:** `<QRBuilderModal />` - lightbox riusabile da qualsiasi pagina

**Architettura:** Opzione B - Contextual + Hub centralizzato

---

#### QR Context Matrix (IMPORTANTE)

| Contesto        | Location     | Azioni Disponibili                                          |
| --------------- | ------------ | ----------------------------------------------------------- |
| 🪑 **Table**    | In-venue     | ✅ Ordina & Paga, ✅ Chiama staff, ✅ Menu, ✅ Feedback     |
| 📍 **External** | Fuori locale | ✅ Menu (view only), ✅ Prenota, ✅ Loyalty, ❌ Ordina      |
| 🥡 **Takeaway** | Fuori locale | ✅ Ordina, ✅ Pickup time, ✅ Paga online                   |
| 🛵 **Delivery** | Fuori locale | ✅ Ordina (se in zona), ✅ Tracking, ⚙️ Regole raggio/orari |

---

#### Traffic Sources (QR Dinamici)

| Source         | Landing Dedicata            | Promo Possibili                 |
| -------------- | --------------------------- | ------------------------------- |
| 📍 Google Maps | Welcome GMaps + CTA prenota | "Prenota da GMaps = 10% sconto" |
| 📸 Instagram   | Welcome IG + follow CTA     | "Follower = drink gratis"       |
| 📘 Facebook    | Welcome FB                  | Promo FB-only                   |
| 🎫 Evento      | Info evento + menu          | Sconto evento                   |
| 📰 Flyer       | Tracking campagna           | Codice flyer                    |
| 🪑 Tavolo X    | Menu + ordina               | Upsell dessert                  |

**URL Sistema:** `go.gudbro.com/qr/{shortcode}` → Redirect engine con analytics

---

#### Logo Handling (per manager non tecnici)

**Pipeline automatica:**

- [ ] Auto-resize a dimensioni ottimali (max 30% area QR)
- [ ] Detect aspect ratio → warning se troppo largo (>2:1)
- [ ] Opzioni per logo largo: usa icona, ritaglia, iniziali generate, versione alternativa
- [ ] Background removal automatico (AI)
- [ ] Upscale se troppo piccolo
- [ ] Genera varianti: originale, quadrato, bianco, nero

**UX semplificata:**

- [ ] "Usa logo del locale" come default
- [ ] Suggerimenti per non-tecnici
- [ ] "Crea logo con AI" per chi non ce l'ha

---

#### Customization Options

- [ ] Logo (default merchant, custom upload, icone libreria)
- [ ] Pattern (6+ stili)
- [ ] Eye Style (quadrato, rotondo, etc.)
- [ ] Colors (presets brand + custom picker)
- [ ] Frame (con testo customizzabile)
- [ ] Live Preview real-time

---

#### Multi-lingua Landing

- [ ] Auto-detect lingua device
- [ ] Fallback a English se lingua non disponibile
- [ ] Auto-detect currency

---

#### Features Aggiuntive

- [ ] QR Scadenza (per promo temporanee)
- [ ] QR con Password (eventi privati)
- [ ] Templates predefiniti (Brand Colors, Classic B&W, Seasonal)
- [ ] Templates salvabili dal merchant

---

#### Analytics Dashboard

- [ ] Scan count per QR/source
- [ ] Heatmap orari scansioni
- [ ] Device breakdown
- [ ] Location (se consenso)
- [ ] Conversion tracking (scan → ordine/prenotazione)
- [ ] Revenue attribution per source
- [ ] Insights automatici ("Google Maps ha ROI più alto")

---

#### Export

- [ ] PNG, SVG, PDF
- [ ] Batch export
- [ ] Print sheet (A4 con multipli QR)

---

#### Delivery Config (Futuro)

- [ ] Zona consegna diretta (raggio configurabile)
- [ ] **Multi-slot orari per giorno** (vedi sotto)
- [ ] Costi delivery per fascia distanza
- [ ] Ordine minimo / gratis sopra X€
- [ ] Redirect a partner (Glovo/Deliveroo) se fuori zona

**Multi-slot Delivery (IMPORTANTE):**

Un locale può avere più fasce orarie delivery nello stesso giorno:

```
Lunedì:
├── Slot 1: 11:30-14:00 │ Raggio: 2km │ Rider: 2 │ Min: €15
├── Slot 2: 15:00-16:30 │ Raggio: 1km │ Rider: 1 │ Min: €20
├── Slot 3: 18:00-21:00 │ Raggio: 2km │ Rider: 2 │ Min: €15
└── Slot 4: 21:00-23:00 │ Raggio: 1km │ Rider: 1 │ Min: €25
```

Ogni slot può avere configurazione diversa:

- [ ] Raggio delivery (può ridursi in orari con meno staff)
- [ ] Numero rider disponibili (per calcolo tempo stimato)
- [ ] Ordine minimo (può aumentare in orari di punta)
- [ ] Tempo stimato (basato su rider e ordini in coda)
- [ ] Pausa slot (es. 14:00-15:00 niente delivery)

---

#### Edge Cases da gestire

- [ ] Takeaway: ordina da fuori, ritira in locale
- [ ] Pre-order: ordina ora, consuma dopo (pranzi veloci)
- [ ] Multi-location: QR deve chiedere "quale sede?"
- [ ] Orari chiusura: cosa mostrare se locale chiuso?
- [ ] Menu diversi: pranzo vs cena vs brunch per orario

---

**Differenziatori vs MenuTiger:**

- Multi-QR illimitati (vs 1 solo)
- Contextual creation da ogni pagina
- Traffic source attribution
- Landing pages dedicate per source
- QR Templates salvabili
- Analytics con ROI per canale
- **AI Co-Manager integrato** (vedi sotto)

---

#### AI Co-Manager Integration

L'AI Co-Manager partecipa attivamente ai workflow QR:

**Analytics & Insights (Market Intelligence):**

- Analizza pattern scansioni QR
- Calcola ROI per traffic source
- "Google Maps porta 3x più prenotazioni di Instagram"
- Identifica trend stagionali/orari

**Proactive Alerts (Proactivity Service):**

- "Scansioni da Instagram calate 40% questa settimana"
- "QR tavolo 5 non scansionato da 2 giorni - verificare"
- "Picco scansioni 19-20 - considera promo happy hour"
- "QR flyer campagna X ha ROI negativo"

**Content Generation (Social Media Service):**

- Genera testo per landing pages
- Crea copy per frame QR ("Scansiona per 10% sconto!")
- Traduce automaticamente in lingue target
- Suggerisce CTA basate sul contesto

**Workflow Automation (Agentic Workflow):**

- Auto-crea QR per nuovi eventi
- Schedula campagne QR temporanee
- Aggiorna landing pages automaticamente
- Batch operations con approval merchant

**Customer-Facing (futuro AI-CUSTOMER-CHAT):**

- Cliente scansiona QR esterno → AI assiste per prenotazioni
- Domande menu/allergeni via chat
- Info orari/location
- Escalation a merchant se necessario

---

**Status:** ✅ Spec completata - pronta per implementazione

---

### SITE-CUSTOMIZATION - Sezioni Sito Customizzabili

**Vision:** Merchant può personalizzare le sezioni del proprio sito

**Sezioni configurabili da backoffice:**

- [ ] Hero (immagine, titolo, CTA)
- [ ] Chi siamo (testo, foto team)
- [ ] Gallery foto
- [ ] Orari apertura
- [ ] Contatti / Mappa
- [ ] Social links
- [ ] Recensioni (Google/TripAdvisor embed)

**Configurazione:**

- [ ] Drag & drop ordine sezioni
- [ ] Abilita/disabilita sezioni
- [ ] Preview live

---

## P1 - Alta Priorità

| ID                   | Feature                   | Descrizione                       | Area           | Effort     | Note                                                        |
| -------------------- | ------------------------- | --------------------------------- | -------------- | ---------- | ----------------------------------------------------------- |
| KB-BACKOFFICE        | Knowledge Base Backoffice | Guida utente 52 pagine            | Documentation  | Medium     | Sample pronto, formato da validare → vedi spec sotto        |
| AI-ZONE-INTEL        | Zone & Customer Intel     | AI conosce zona + pattern clienti | AI/Analytics   | High       | **COMPLETATO** Phase 1-4 (2026-01-12) - vedi limitazioni    |
| WEATHER-INTEL        | Weather Intelligence      | Meteo in backoffice + AI          | AI/Analytics   | Medium     | **NEW** - vedi spec sotto                                   |
| TOURISM-B2B          | Partnership Hub           | AI trova tour op + hotel/Airbnb   | AI/Sales       | High       | **NEW** - killer feature, ROI 203x - vedi spec sotto        |
| ING-TRANSLATIONS-ALL | Traduzioni Ingredienti    | 2551 ing × 14 lingue              | Database       | High       | **IN PROGRESS** → vedi `2-IN-PROGRESS.md` per dettagli      |
| ~~SEC-CLEANUP~~      | ~~Security Cleanup~~      | ~~37 functions + 65 RLS~~         | ~~Database~~   | ~~Medium~~ | **COMPLETATO** 2026-01-07 → vedi `docs/SEC-CLEANUP-PLAN.md` |
| ~~MT-NOTIF-SOUNDS~~  | ~~Notification Sounds~~   | ~~Sound selection per notifica~~  | ~~Backoffice~~ | ~~Low~~    | **COMPLETATO** 2026-01-05                                   |
| ~~GB-SPORTS-EVENTS~~ | ~~Sports Bar Calendar~~   | ~~25+ sport, broadcast~~          | ~~Backoffice~~ | ~~Medium~~ | **Incluso in SCHEDULE-SYSTEM** (vedi docs/features/)        |

---

### KB-BACKOFFICE - Knowledge Base Backoffice

**Vision:** Documentazione user-friendly per merchant su tutte le 52 pagine del backoffice.

**Sample creato:** `docs/BACKOFFICE-KNOWLEDGE-BASE-SAMPLE.md` (3 pagine di esempio)

**Formato per pagina:**

- Scopo
- Come arrivarci
- Azioni disponibili
- Workflow tipici (step-by-step)
- FAQ
- Tips

**Pagine da documentare (52 totali):**

| Area                 | Pagine | Status        |
| -------------------- | ------ | ------------- |
| Dashboard & Overview | 6      | 1/6 (sample)  |
| Content Management   | 12     | 1/12 (sample) |
| Food Costs           | 2      | 0/2           |
| Marketing            | 4      | 0/4           |
| Customers            | 3      | 0/3           |
| Orders               | 2      | 0/2           |
| Settings             | 8      | 0/8           |
| QR Codes             | 1      | 1/1 (sample)  |
| Other                | 14     | 0/14          |

**Prossimi passi:**

1. [ ] Validare formato sample con Gianfranco
2. [ ] Decidere lingua (IT o EN)
3. [ ] Completare tutte 52 pagine (~2-3h)
4. [ ] Opzionale: versione JSON per AI consumption

**Effort stimato:** Medium (2-3 ore per completamento)

---

### AI-ZONE-INTEL - Zone Intelligence & Customer Intelligence

**Vision:** Il Co-Manager conosce la zona meglio del manager. Analizza clienti, territorio, e crea strategie di fidelizzazione impossibili per un umano.

**Perché è una killer feature:**

| Manager Umano Vede   | Co-Manager Vede                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------- |
| "Marco viene spesso" | Marco vive a 300m, lavora a 500m, viene 3x/sett, spesa media €8.50, potenziale +€40/mese |
| "Zona tranquilla"    | 3 uffici (850 dipendenti), 2 scuole (1200 studenti), 1 palestra, flusso 8-9 e 17-19      |
| "Pochi delivery"     | 73% clienti entro 500m → potenziale dine-in, non delivery                                |

**Un umano non può fare questi calcoli su 500+ clienti. L'AI sì.**

---

#### Database Schema Proposto

**Zone Knowledge (statico, raccolto una tantum):**

```sql
CREATE TABLE zone_profiles (
  id UUID PRIMARY KEY,
  merchant_id UUID REFERENCES merchants(id),

  -- Tipo zona
  zone_type TEXT CHECK (zone_type IN ('residential', 'office', 'tourist', 'mixed', 'industrial')),
  population_density TEXT CHECK (population_density IN ('low', 'medium', 'high', 'very_high')),

  -- POI nel raggio (JSONB flessibile)
  points_of_interest JSONB DEFAULT '[]',
  /*
  [
    {"type": "office", "name": "TechCorp HQ", "distance_m": 200, "estimated_people": 500},
    {"type": "school", "name": "Liceo Scientifico", "distance_m": 400, "estimated_people": 800},
    {"type": "gym", "name": "FitLife", "distance_m": 150, "estimated_people": 300},
    {"type": "hotel", "name": "Hotel Marina", "distance_m": 300, "rooms": 45}
  ]
  */

  -- Competitor
  competitors JSONB DEFAULT '[]',
  /*
  [
    {"name": "Bar Roma", "type": "cafe", "distance_m": 100, "price_level": "€€"},
    {"name": "Pizzeria Napoli", "type": "restaurant", "distance_m": 250, "price_level": "€€€"}
  ]
  */

  -- Flussi pedonali per fascia oraria (AI-populated)
  pedestrian_flows JSONB DEFAULT '{}',
  /*
  {
    "07-09": "high",
    "09-12": "medium",
    "12-14": "very_high",
    "14-17": "low",
    "17-19": "high",
    "19-22": "medium"
  }
  */

  -- Eventi ricorrenti zona
  recurring_events JSONB DEFAULT '[]',
  /*
  [
    {"name": "Mercato settimanale", "day": "saturday", "impact": "high"},
    {"name": "Partite stadio", "frequency": "biweekly", "impact": "very_high"}
  ]
  */

  -- Metadata
  data_source TEXT, -- 'manual', 'google_places', 'ai_enriched'
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Customer Intelligence (dinamico, cresce automaticamente):**

```sql
CREATE TABLE customer_intelligence (
  id UUID PRIMARY KEY,
  account_id UUID REFERENCES accounts(id),
  merchant_id UUID REFERENCES merchants(id),

  -- Geolocalizzazione
  home_location GEOGRAPHY(POINT, 4326), -- PostGIS
  work_location GEOGRAPHY(POINT, 4326),
  distance_to_merchant_m INTEGER,

  -- Pattern visite
  visit_pattern JSONB DEFAULT '{}',
  /*
  {
    "total_visits": 47,
    "avg_per_week": 2.3,
    "preferred_days": ["monday", "wednesday", "friday"],
    "preferred_times": ["08:00-09:00", "12:30-13:30"],
    "avg_duration_min": 25,
    "last_visit": "2026-01-08"
  }
  */

  -- Pattern ordini
  order_pattern JSONB DEFAULT '{}',
  /*
  {
    "avg_ticket": 8.50,
    "total_spent": 399.50,
    "favorite_items": ["cappuccino", "cornetto integrale"],
    "dietary_preferences": ["vegetarian"],
    "payment_preference": "card",
    "delivery_vs_dinein": "dinein" -- 95% dine-in
  }
  */

  -- Scores AI-calculated
  customer_lifetime_value DECIMAL(10,2),
  churn_risk_score DECIMAL(3,2), -- 0.00 - 1.00
  upsell_potential_score DECIMAL(3,2),
  loyalty_score DECIMAL(3,2),

  -- Segmento AI-assigned
  segment TEXT, -- 'daily_regular', 'weekend_visitor', 'occasional', 'churning', 'vip'

  -- Raccomandazioni AI
  recommended_actions JSONB DEFAULT '[]',
  /*
  [
    {"action": "lunch_pass_promo", "reason": "Viene solo colazione, potenziale pranzo", "expected_uplift": 40},
    {"action": "loyalty_program", "reason": "Alta frequenza, non iscritto", "expected_uplift": 15}
  ]
  */

  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per query geospaziali
CREATE INDEX idx_customer_intel_location ON customer_intelligence USING GIST (home_location);
CREATE INDEX idx_customer_intel_merchant ON customer_intelligence(merchant_id);
CREATE INDEX idx_customer_intel_segment ON customer_intelligence(merchant_id, segment);
```

---

#### Integrazione con Loyalty System

| Customer Intel                 | Loyalty Action                                     |
| ------------------------------ | -------------------------------------------------- |
| Vive vicino ma ordina delivery | Promo "Vieni a trovarci, -10%"                     |
| Viene solo weekend             | "Ti manca il caffè? Weekday lunch deal"            |
| CLV alto, non viene da 2 sett  | "Ci manchi! Ecco un'offerta speciale"              |
| Nuovo nella zona               | "Benvenuto nel quartiere! Prima consumazione -20%" |
| Porta spesso amici             | "Porta un amico, entrambi guadagnate punti"        |
| Churn risk alto                | Alert al manager + promo personalizzata automatica |

---

#### AI Co-Manager Capabilities

**Analisi Automatiche:**

- Cluster clienti per comportamento
- Predizione domanda per fascia oraria/giorno
- Correlazione meteo → affluenza
- Efficacia promozioni per segmento
- Trend stagionali

**Alerts Proattivi:**

- "Lunedì prossimo previsto +30% affluenza (ponte festivo)"
- "5 clienti VIP non vengono da >2 settimane"
- "Nuovo competitor aperto a 200m - monitora"
- "Zona uffici: calo pranzi venerdì (-40%)"

**Azioni Suggerite:**

- "Crea promo Friday Lunch per recuperare calo venerdì"
- "Invia notifica ai 12 clienti churning questa settimana"
- "Hotel Marina ha 45 camere - proponi convenzione colazione"

---

#### Raccolta Dati

**Fase 1 - Dati già disponibili:**

- Pattern ordini dal sistema ordini esistente
- Customer registration (email, eventuale indirizzo)
- Loyalty program interactions

**Fase 2 - Onboarding Zone (AI-guided):**

- AI chiede al manager info sulla zona durante chat
- "Che tipo di zona è? Residenziale, uffici, turistica?"
- "Ci sono scuole o uffici importanti vicino?"
- "Quali sono i tuoi competitor principali?"

**Fase 3 - Enrichment automatico:**

- Google Places API per POI
- Geocoding indirizzi clienti
- Analisi pattern dalle transazioni

**Fase 4 - Self-learning:**

- Misura efficacia promozioni → adatta strategia
- A/B test automatici
- Feedback loop continuo

---

#### Merchant Knowledge Base (Memoria Persistente)

> **Pattern:** Stesso approccio di CLAUDE.md/PRODUCT.md/GIANFRANCO.md per il progetto GUDBRO.
> Il Co-Manager ha file di conoscenza persistenti che consulta all'inizio di ogni conversazione.

**Struttura per ogni merchant:**

```
merchants/{merchant_id}/knowledge/
├── zone.md              # Zona, POI, competitor, flussi
├── customers.md         # Insights clienti VIP, segmenti, pattern
├── manager.md           # Preferenze comunicazione, obiettivi, stile decisionale
├── history.md           # Decisioni passate, cosa ha funzionato/fallito
├── menu.md              # Note su piatti, stagionalità, margini, best seller
├── operations.md        # Orari picco, staff notes, problemi ricorrenti
└── strategies.md        # Strategie attive, promozioni in corso, obiettivi
```

**Database Schema:**

```sql
CREATE TABLE merchant_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Tipo documento
  document_type TEXT NOT NULL CHECK (document_type IN (
    'zone', 'customers', 'manager', 'history', 'menu', 'operations', 'strategies'
  )),

  -- Contenuto markdown
  content TEXT NOT NULL DEFAULT '',

  -- Metadata
  last_updated_by TEXT, -- 'ai', 'manager', 'system'
  version INTEGER DEFAULT 1,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, document_type)
);

-- RLS: solo il merchant può vedere i propri documenti
ALTER TABLE merchant_knowledge ENABLE ROW LEVEL SECURITY;
```

**Come funziona:**

```
Manager apre chat con Co-Manager
           ↓
Co-Manager legge merchant_knowledge (tutti i documenti)
           ↓
Context arricchito: "So che preferisci comunicazione concisa,
                    che la zona è uffici, che Marco è VIP..."
           ↓
Conversazione contestualizzata
           ↓
AI aggiorna documenti se scopre nuove info
```

**Esempi contenuto:**

**`manager.md`:**

```markdown
# Manager Profile

## Comunicazione

- Preferisce risposte concise, no fluff
- Lingua: Italiano
- Orari disponibili: 9-12, 15-18

## Obiettivi Q1 2026

- Aumentare pranzi weekday +20%
- Ridurre food waste sotto 5%
- Lanciare programma loyalty

## Decisioni passate

- 2026-01-05: Approvata promo Friday Lunch (-15%)
- 2026-01-03: Rifiutata partnership con Glovo (margini troppo bassi)
```

**`zone.md`:**

```markdown
# Zone Profile - ROOTS Cafe

## Tipo: Mixed (uffici + residenziale)

## POI nel raggio 500m

- TechCorp HQ (200m) - ~500 dipendenti, potenziale pranzi
- Liceo Scientifico (400m) - ~800 studenti, potenziale merende
- FitLife Gym (150m) - ~300 iscritti, potenziale colazioni healthy

## Competitor

- Bar Roma (100m) - Prezzi bassi, qualità media, sempre pieno 7-9
- Pizzeria Napoli (250m) - Solo pranzo/cena, no colazione

## Flussi

- 07-09: Alto (pendolari)
- 12-14: Molto alto (pranzi uffici)
- 17-19: Alto (uscita lavoro)

## Note

- Venerdì pranzo cala 40% (smart working)
- Sabato mattina mercato rionale porta traffico
```

**Aggiornamento automatico:**

| Trigger                      | Azione AI               |
| ---------------------------- | ----------------------- |
| Manager dice "preferisco..." | Aggiorna `manager.md`   |
| Nuovo competitor menzionato  | Aggiorna `zone.md`      |
| Decisione importante presa   | Aggiorna `history.md`   |
| Pattern cliente scoperto     | Aggiorna `customers.md` |

**Vantaggi:**

1. **Memoria infinita** - Il Co-Manager non dimentica mai
2. **Contesto immediato** - Non serve rispiegare ogni volta
3. **Personalizzazione** - Risposte su misura per quel manager
4. **Continuità** - Cambio dispositivo/sessione, stesso contesto
5. **Compounding** - Più si usa, più diventa intelligente

---

#### Privacy & Consent

- Geolocalizzazione solo con consenso esplicito
- Dati aggregati per analytics, mai venduti
- Cliente può vedere/cancellare i propri dati
- GDPR compliant

---

#### Effort Breakdown

| Fase | Descrizione                       | Effort |
| ---- | --------------------------------- | ------ |
| 1    | Database schema + migrations      | Medium |
| 2    | Zone profile UI nel backoffice    | Medium |
| 3    | Customer intelligence aggregation | High   |
| 4    | AI analysis service               | High   |
| 5    | Loyalty integration               | Medium |
| 6    | Dashboard visualizzazione         | Medium |

**Totale stimato:** High (ma valore altissimo)

---

#### Differenziatori vs Competitor

Nessun competitor F&B ha:

- Zone intelligence integrata
- Customer pattern analysis a questo livello
- AI che suggerisce azioni basate su geolocalizzazione
- Loyalty personalizzato su distanza/pattern

**Questo trasforma GUDBRO da "menu digitale" a "cervello del locale".**

---

#### Limitazioni Attuali (da risolvere)

> **IMPORTANTE:** Il sistema AI-ZONE-INTEL attuale ha limitazioni significative da comunicare.

| Limitazione                  | Descrizione                                                                        | Impatto                                           |
| ---------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Dati AI-Generated**        | Zone analysis, competitors, market pricing sono generati da OpenAI, NON dati reali | Manager potrebbe aspettarsi dati Google Maps/Yelp |
| **No Real-Time Market Data** | Prezzi competitor e POI sono stime AI, non prezzi effettivi                        | Decisioni basate su dati approssimativi           |
| **No Google Places API**     | POI e competitor scoperti via AI, non API strutturate                              | Meno accuratezza su nomi/indirizzi reali          |
| **Pedestrian Flows Stimati** | Flussi pedonali sono ipotesi AI basate su tipo zona                                | Non misurati realmente                            |

**Roadmap per risolvere:**

| Fase | Feature                                      | Effort | Valore                           |
| ---- | -------------------------------------------- | ------ | -------------------------------- |
| F1   | Google Places API integration                | High   | Competitor reali con nomi/rating |
| F2   | Real-time pricing (Deliveroo/Glovo scraping) | High   | Prezzi competitor aggiornati     |
| F3   | External data enrichment                     | Medium | Dati demografici, traffic        |
| F4   | Foot traffic analytics                       | High   | Misurazioni reali flussi         |

---

### WEATHER-INTELLIGENCE - Integrazione Meteo

**Vision:** Il meteo influenza drasticamente il business F&B. Il Co-Manager deve saperlo.

**Perché è importante:**

| Scenario             | Impatto Business            | Azione Possibile                             |
| -------------------- | --------------------------- | -------------------------------------------- |
| Pioggia prevista     | +40% delivery, -30% dine-in | Preparare più rider, push notifiche delivery |
| Ondata di caldo      | +60% gelati/bevande fredde  | Stock up, promo smoothies                    |
| Freddo intenso       | +50% zuppe/bevande calde    | Evidenziare comfort food                     |
| Bel tempo weekend    | +25% outdoor seating        | Aprire dehors, promo aperitivo               |
| Temporale improvviso | Clienti bloccati dentro     | Upsell dessert/caffè                         |

**Implementazione:**

**Fase 1 - Weather Service:**

```typescript
// apps/backoffice/lib/ai/weather-service.ts
interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    conditions: 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm';
    wind_speed: number;
  };
  forecast: DayForecast[]; // 7 giorni
  alerts: WeatherAlert[];
}

// API: OpenWeatherMap (free tier: 1000 calls/day)
// Costo: €0/mese per MVP, ~€15/mese per Pro
```

**Fase 2 - Backoffice Widget:**

```
┌─────────────────────────────────────────────┐
│ 🌤️ WEATHER IMPACT                           │
├─────────────────────────────────────────────┤
│ Today: 24°C ☀️ Sunny                        │
│ → Expected: +15% outdoor traffic            │
│                                             │
│ Tomorrow: 18°C 🌧️ Rain from 14:00          │
│ → Recommendation: Push delivery promos      │
│                                             │
│ Weekend: 28°C ☀️ Perfect weather            │
│ → Action: Open terrace, aperitivo special   │
└─────────────────────────────────────────────┘
```

**Fase 3 - AI Co-Manager Integration:**

- Weather data in daily briefing
- Proactive alerts: "Pioggia prevista domani, prepara promo delivery?"
- Correlazione storica: "Quando piove, il tuo delivery aumenta 45%"
- Suggerimenti inventory: "Ondata caldo: ordina +30% birre"

**Database:**

```sql
CREATE TABLE weather_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id),
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  current_data JSONB NOT NULL,
  forecast_data JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE weather_business_correlations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  weather_condition TEXT,
  business_metric TEXT, -- 'delivery_orders', 'dine_in', 'avg_ticket'
  correlation_factor DECIMAL(3,2), -- -1.00 to +1.00
  sample_size INTEGER,
  last_calculated TIMESTAMPTZ
);
```

**Effort:** Medium
**Valore:** High (differenziatore competitivo, nessun competitor F&B lo fa bene)
**API Cost:** Free (OpenWeatherMap) o ~€15/mese (premium)

---

### TOURISM-B2B-AUTOMATION - Partnership Hub (Tour Operator + Accommodation)

**Vision:** L'AI Co-Manager riconosce che il locale è perfetto per gruppi turistici e automatizza l'acquisizione di partnership B2B con tour operator E strutture ricettive (hotel, hostelli, Airbnb).

**Origine idea:** Conversazione con Gianfranco (2026-01-12) - "Se ho una pizzeria in Piazza Duomo, l'AI dovrebbe trovarmi tutti i tour operator che passano di lì" + "potrebbe anche funzionare per convenzionare gli ospiti degli hotel, hostelli, airbnb nelle vicinanze"

**Perché è rivoluzionario:**

| Oggi (Manuale)            | Con GUDBRO (Automatico)        |
| ------------------------- | ------------------------------ |
| Manager cerca su Google   | AI trova 500+ operatori        |
| Trova 10-15 nomi generici | Database strutturato per paese |
| Scrive email una per una  | Template multilingua generati  |
| Nessun tracking           | CRM integrato con follow-up    |
| Settimane di lavoro       | Minuti                         |

**Pattern Recognition Trigger:**

```
IF locale.nearTouristPOI = true
   AND locale.seatingCapacity >= 40
   AND locale.servesLunch = true
   AND locale.cuisineType IN ('pizzeria', 'trattoria', 'ristorante')
THEN
   → Suggerisci: "Il tuo locale è perfetto per gruppi turistici"
   → Offri: "Vuoi che trovi i tour operator per la tua zona?"
   → Esegui: Tourism Partnership Workflow
```

**Database Tour Operator:**

```sql
CREATE TABLE tour_operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identità
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,        -- ISO 3166-1 (IT, DE, US, CN, JP)
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,

  -- Tipo e specializzazione
  operator_type TEXT CHECK (operator_type IN (
    'bus_operator', 'luxury', 'religious', 'cultural',
    'budget', 'cruise', 'mice', 'school', 'senior'
  )),

  -- Copertura geografica
  regions_covered TEXT[],            -- ['lombardia', 'veneto', 'toscana']
  pois_visited TEXT[],               -- ['duomo_milano', 'colosseo', 'uffizi']

  -- Caratteristiche gruppi
  typical_group_size INT4RANGE,      -- [20, 50)
  meal_budget_per_person INT4RANGE,  -- [25, 45) EUR

  -- Booking
  booking_method TEXT CHECK (booking_method IN (
    'direct', 'viator', 'getyourguide', 'civitatis', 'email'
  )),

  -- Qualità e priorità
  volume_estimate TEXT,              -- 'high', 'medium', 'low'
  response_rate DECIMAL(3,2),        -- Storico risposte

  -- Metadata
  data_source TEXT,                  -- 'manual', 'scraped', 'ai_enriched'
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella relazione merchant-operator
CREATE TABLE merchant_tour_operator_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  operator_id UUID REFERENCES tour_operators(id),

  -- Stato outreach
  status TEXT CHECK (status IN (
    'suggested', 'contacted', 'responded', 'negotiating',
    'partnership_active', 'declined', 'no_response'
  )),

  -- Tracking
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  response_at TIMESTAMPTZ,

  -- Contenuto
  outreach_template_used TEXT,
  custom_message TEXT,

  -- Risultato
  partnership_terms JSONB,           -- Menu concordato, commissioni, etc.
  bookings_generated INTEGER DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- POI di interesse turistico (per matching)
CREATE TABLE tourist_pois (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,         -- 'duomo_milano', 'colosseo'
  city TEXT NOT NULL,
  country_code TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  annual_visitors INTEGER,           -- Stima visitatori/anno
  peak_seasons TEXT[],               -- ['spring', 'summer']
  typical_visit_duration INTEGER,    -- Minuti
  meal_opportunity TEXT              -- 'lunch', 'dinner', 'both'
);

-- ============================================
-- ACCOMMODATION PARTNERS (Hotel, Hostelli, Airbnb)
-- ============================================

CREATE TABLE accommodation_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identità
  name TEXT NOT NULL,
  accommodation_type TEXT CHECK (accommodation_type IN (
    'hotel', 'hostel', 'airbnb_host', 'b_and_b', 'aparthotel'
  )),

  -- Location
  address TEXT,
  city TEXT NOT NULL,
  country_code TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  distance_to_merchant_m INTEGER,    -- Calcolato

  -- Contatti
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,

  -- Capacità
  room_count INTEGER,                -- Camere/unità
  avg_guests_per_day INTEGER,        -- Stima ospiti/giorno
  star_rating DECIMAL(2,1),          -- 1.0 - 5.0

  -- Per Airbnb hosts
  properties_count INTEGER,          -- Numero proprietà gestite
  superhost BOOLEAN,

  -- Caratteristiche ospiti
  guest_nationality_mix JSONB,       -- {"DE": 25, "US": 20, "IT": 15}
  avg_stay_nights DECIMAL(3,1),
  business_vs_leisure TEXT,          -- 'business', 'leisure', 'mixed'

  -- Servizi che cercano
  needs_breakfast BOOLEAN DEFAULT false,
  needs_lunch BOOLEAN DEFAULT false,
  needs_dinner BOOLEAN DEFAULT false,
  needs_recommendations BOOLEAN DEFAULT true,

  -- Metadata
  data_source TEXT,                  -- 'google_maps', 'booking', 'airbnb', 'manual'
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach per accommodation (stesso pattern tour operators)
CREATE TABLE merchant_accommodation_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  accommodation_id UUID REFERENCES accommodation_partners(id),

  -- Stato pipeline
  status TEXT CHECK (status IN (
    'suggested',           -- AI ha suggerito
    'contacted',           -- Email/chiamata inviata
    'responded',           -- Hanno risposto
    'negotiating',         -- In trattativa
    'partnership_active',  -- Accordo attivo
    'declined',            -- Hanno rifiutato
    'no_response'          -- Nessuna risposta dopo X giorni
  )),

  -- Tipo convenzione proposta
  partnership_type TEXT CHECK (partnership_type IN (
    'breakfast_convention',    -- Colazione convenzionata
    'lunch_convention',        -- Pranzo
    'dinner_convention',       -- Cena
    'discount_guests',         -- Sconto % per ospiti
    'recommendation_only',     -- Solo raccomandazione
    'full_board'              -- Pensione completa
  )),

  -- Termini accordo
  discount_percent INTEGER,          -- Es: 10% sconto ospiti
  commission_percent INTEGER,        -- Es: 5% a hotel per referral
  fixed_price_menu DECIMAL(10,2),    -- Menu fisso convenzionato

  -- Tracking
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  response_at TIMESTAMPTZ,
  partnership_start_date DATE,
  partnership_end_date DATE,

  -- Risultati
  guests_referred INTEGER DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0,

  -- Note
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, accommodation_id)
);

-- Indici per query geospaziali
CREATE INDEX idx_accommodation_location ON accommodation_partners USING GIST (location);
CREATE INDEX idx_accommodation_city ON accommodation_partners(city);
CREATE INDEX idx_accommodation_type ON accommodation_partners(accommodation_type);
```

**Workflow Automatico Completo:**

```
STEP 1: Location Analysis
├── AI analizza indirizzo locale
├── Identifica: "Zona turistica - Duomo Milano"
├── Trova POI vicini: Duomo (50m), Galleria (100m), Scala (300m)
└── Score: "Tourism Partnership Potential: 95%"

STEP 2: Tourist Market Research
├── Ricerca: "Chi visita [POI]?" (dati statistici)
├── Breakdown per nazionalità:
│   ├── 🇩🇪 Germania: 18%
│   ├── 🇺🇸 USA: 15%
│   ├── 🇨🇳 Cina: 12%
│   └── ...
└── Ordina mercati per volume

STEP 3: Tour Operator Discovery (per nazione, top → bottom)
├── Per ogni mercato (DE, US, CN, FR, ES, UK, JP, KR...):
│   ├── Cerca operatori che visitano [POI]
│   ├── Filtra per budget compatibile
│   └── Salva con contatti e caratteristiche
└── Output: "Trovati 127 tour operator per Duomo Milano"

STEP 4: Accommodation Discovery (NUOVO!)
├── Cerca nel raggio configurabile (default 500m):
│   ├── 🏨 Hotel (Google Maps, Booking)
│   ├── 🏠 Hostelli (Hostelworld)
│   ├── 🏡 Airbnb hosts con 5+ proprietà
│   └── 🛏️ B&B
├── Per ogni struttura:
│   ├── Capacità (camere, ospiti/giorno)
│   ├── Target (business/leisure)
│   ├── Servizi mancanti (breakfast, dinner)
│   └── Contatti
└── Output: "Trovate 34 strutture ricettive entro 500m"

STEP 5: Media Kit Generation
├── Genera PDF professionale:
│   ├── Foto locale (da gallery esistente)
│   ├── Menu gruppi (3 fasce prezzo)
│   ├── Menu convenzione hotel (colazione/cena)
│   ├── Capacità e tempi servizio
│   ├── Policy driver/guida gratis
│   └── Contatti e mappa
└── Traduzioni automatiche: IT, EN, DE, FR, ES, ZH, JA, KO

STEP 6: Outreach Automation
├── Template email per:
│   ├── Tour operator (per lingua/mercato)
│   ├── Hotel (convenzione colazione/cena)
│   ├── Hostelli (sconto ospiti)
│   └── Airbnb hosts (raccomandazione)
├── Personalizzazione automatica
├── Scheduling invii (evita spam)
└── Tracking aperture e risposte

STEP 7: CRM Pipeline & Follow-up
├── Dashboard unificata:
│   ├── 📋 Suggeriti (AI ha trovato)
│   ├── 📧 Contattati (offerta inviata)
│   ├── ⏳ Senza risposta (reminder automatici)
│   ├── 💬 In trattativa
│   ├── ✅ Accordi attivi
│   └── ❌ Rifiutati
├── Revenue tracking per partner
├── Reminder follow-up automatici (7gg, 14gg, 30gg)
└── Report ROI mensile
```

**Operatori per Mercato (Database Iniziale):**

| Mercato        | Operatori Chiave                               | Volume     | Note                    |
| -------------- | ---------------------------------------------- | ---------- | ----------------------- |
| **Italia**     | Zani Viaggi, Neiade, Milanoguida, Autostradale | Alto       | Locale, risposta rapida |
| **Germania**   | Studiosus, Berge & Meer, DER Touristik         | Molto Alto | Amano cultura + cibo    |
| **USA/Canada** | Trafalgar, Perillo, Tauck, EF Go Ahead         | Alto       | Budget elevato          |
| **Francia**    | Voyageurs du Monde, Kuoni France               | Medio      | Premium                 |
| **Spagna**     | Europamundo, Special Tours                     | Alto       | Grandi volumi bus       |
| **UK**         | Titan Travel, Riviera Travel                   | Medio      | Senior, culturali       |
| **Cina**       | CTRIP, CTS, CYTS                               | Molto Alto | Menu fisso, veloce      |
| **Giappone**   | JTB, HIS, Kintetsu                             | Alto       | Altissimi standard      |
| **Corea**      | Hana Tour, Mode Tour                           | Medio      | Crescita rapida         |
| **Religioso**  | Opera Romana, Duomo Viaggi                     | Medio      | Pellegrinaggi           |

**UI Backoffice - Partnership Hub:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🤝 PARTNERSHIP HUB                                              │
├─────────────────────────────────────────────────────────────────┤
│ Tourism Potential Score: ████████████████ 95%                   │
│                                                                 │
│ 📍 Nearby POIs: Duomo (50m), Galleria (100m), Scala (300m)      │
│ 🪑 Capacity: 80 indoor + 40 terrace = 120 seats                 │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│ │    161    │ │     52    │ │     18    │ │     11    │         │
│ │ Suggested │ │   Sent    │ │ Responded │ │  Active   │         │
│ │           │ │           │ │           │ │ €11.2k/mo │         │
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘         │
├─────────────────────────────────────────────────────────────────┤
│ [🚌 Tour Operators] [🏨 Hotels] [🏠 Hostels] [🏡 Airbnb]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ACTIVE PARTNERSHIPS                                    Revenue  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🚌 Studiosus (DE)        Lunch groups      12 grp  €4,800   │ │
│ │ 🚌 Trafalgar (USA)       Dinner groups      8 grp  €3,200   │ │
│ │ 🏨 Hotel Duomo           Breakfast conv.  320 pax  €2,400   │ │
│ │ 🏠 Ostello Bello         10% discount      89 pax    €670   │ │
│ │ 🏡 Marco R. (Airbnb)     Recommendation    42 pax    €320   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                           Total: €11,390/mo     │
│                                                                 │
│ PENDING RESPONSES (18)                              Days Ago    │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🏨 Grand Hotel Milan     Breakfast conv.       5   [Remind] │ │
│ │ 🚌 Perillo Tours (USA)   Lunch groups          8   [Remind] │ │
│ │ 🚌 CTRIP (China)         Lunch groups          3   [Wait]   │ │
│ │ 🏡 Sara L. (Airbnb)      Recommendation        2   [Wait]   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [🔍 Find New Partners]  [📧 Bulk Outreach]  [📄 Media Kit]      │
└─────────────────────────────────────────────────────────────────┘
```

**Tab: Tour Operators**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🚌 TOUR OPERATORS                              [Filter ▾] 127   │
├─────────────────────────────────────────────────────────────────┤
│ Sort by: [Country ▾] [Volume ▾] [Budget ▾]                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 🇩🇪 GERMANY (23 operators)                                      │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Studiosus           Cultural    40-50 pax   €35-45   ✅ Active│
│ │ Berge & Meer        Budget      50-60 pax   €25-35   📧 Sent │ │
│ │ DER Touristik       Mixed       30-50 pax   €30-40   📋 New  │ │
│ │ [+ 20 more...]                                               │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ 🇺🇸 USA (19 operators)                                          │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Trafalgar           Luxury      30-40 pax   €50-70   ✅ Active│
│ │ Perillo Tours       Premium     35-45 pax   €45-60   ⏳ Pend │ │
│ │ Tauck               Luxury      25-35 pax   €60-80   📋 New  │ │
│ │ [+ 16 more...]                                               │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Select All New] [📧 Send Outreach to Selected]                 │
└─────────────────────────────────────────────────────────────────┘
```

**Tab: Accommodation**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🏨 ACCOMMODATION PARTNERS                      [Filter ▾] 34    │
├─────────────────────────────────────────────────────────────────┤
│ Radius: [500m ▾]  Type: [All ▾]  Needs: [All ▾]                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 🏨 HOTELS (12)                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Hotel Duomo Milano    ⭐⭐⭐⭐   120 rooms   50m   ✅ Active   │ │
│ │   → Breakfast conv. €12/pax   320 guests/mo   €2,400 rev    │ │
│ │                                                             │ │
│ │ Grand Hotel et Milan  ⭐⭐⭐⭐⭐  95 rooms   200m  ⏳ Pending  │ │
│ │   → Proposed: Dinner conv. €35/pax                          │ │
│ │                                                             │ │
│ │ Hotel Spadari         ⭐⭐⭐⭐   40 rooms   150m  📋 New      │ │
│ │   → Needs: Breakfast, Recommendations                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ 🏠 HOSTELS (5)                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Ostello Bello         ⭐⭐⭐⭐   200 beds   300m  ✅ Active   │ │
│ │   → 10% discount      89 guests/mo   €670 rev               │ │
│ │                                                             │ │
│ │ Queen Hostel          ⭐⭐⭐     80 beds   400m  📋 New      │ │
│ │   → Target: Budget travelers, needs breakfast               │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ 🏡 AIRBNB HOSTS (17)                                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Marco R.              🏅 Superhost   8 properties  ✅ Active │ │
│ │   → Recommendation card   42 guests/mo   €320 rev           │ │
│ │                                                             │ │
│ │ Sara L.               🏅 Superhost   12 properties ⏳ Pend   │ │
│ │   → Proposed: 10% discount card                             │ │
│ │                                                             │ │
│ │ [+ 15 more hosts with 5+ properties...]                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [🔍 Refresh Search]  [📧 Contact Selected]  [📄 Print Cards]    │
└─────────────────────────────────────────────────────────────────┘
```

**Effort Breakdown:**

| Fase | Descrizione                                     | Effort |
| ---- | ----------------------------------------------- | ------ |
| 1    | Database schema (5 tabelle)                     | Medium |
| 2    | Location analysis + POI discovery               | Medium |
| 3    | Tourist market research integration             | Medium |
| 4    | Tour operator discovery engine                  | High   |
| 5    | Accommodation discovery (Google/Booking/Airbnb) | High   |
| 6    | Media kit generator (PDF multilingua)           | Medium |
| 7    | Email templates per tipo partner                | Low    |
| 8    | CRM Pipeline UI (Partnership Hub)               | High   |
| 9    | Outreach automation + tracking                  | Medium |
| 10   | Revenue tracking + ROI reports                  | Medium |

**Totale Effort:** High (ma valore ENORME)
**Valore:** **ALTISSIMO** - Nessun competitor F&B lo fa. Letteralmente trova clienti B2B per il ristorante.

**Differenziatori:**

- MenuTiger: Non esiste
- Toast/Square: Non esiste
- Yelp for Business: Solo recensioni, zero B2B
- Resy/OpenTable: Solo prenotazioni, zero B2B outreach
- **GUDBRO: "Il software che ti trova clienti"**

**ROI per Merchant (esempio Pizzeria Duomo Milano):**

| Partner Type       | Deal                    | Volume            | Revenue/mese     |
| ------------------ | ----------------------- | ----------------- | ---------------- |
| Bus Operator (DE)  | Lunch €30/pax           | 4 gruppi × 45 pax | €5,400           |
| Bus Operator (USA) | Dinner €45/pax          | 3 gruppi × 35 pax | €4,725           |
| Hotel 4\*          | Breakfast conv. €12/pax | 300 ospiti        | €3,600           |
| Hotel 5\*          | Dinner conv. €40/pax    | 80 ospiti         | €3,200           |
| Hostel             | 10% discount            | 150 ospiti × €15  | €2,025           |
| Airbnb hosts       | Recommendation          | 100 ospiti × €12  | €1,200           |
| **TOTALE**         |                         |                   | **€20,150/mese** |

**Costo GUDBRO subscription:** €99/mese
**ROI:** **203x**

**Data Sources per Discovery:**

| Tipo           | Source                     | API/Scraping             |
| -------------- | -------------------------- | ------------------------ |
| Tour Operators | Web research + directories | AI-enriched              |
| Hotels         | Google Places API          | API                      |
| Hotels ratings | Booking.com                | Scraping                 |
| Hostels        | Hostelworld                | Scraping                 |
| Airbnb hosts   | Airbnb                     | API (partner) / Scraping |
| POI visitors   | Tourism statistics         | Public data              |

**Note Legali:**

- Scraping Booking/Airbnb: verificare ToS, preferire API ufficiali
- GDPR: contatti business sono generalmente OK per B2B outreach
- Opt-out: includere sempre unsubscribe in email

---

#### Shared Intelligence Database (Network Effect)

**Concetto:** Come il database centralizzato di ingredienti (2548) e prodotti (4653), i dati sui partner turistici vengono salvati in un DB condiviso GUDBRO. Più merchant usano il sistema, più ricco diventa il database, migliore il servizio per tutti.

**Pattern GUDBRO Platform:**

| Database Centralizzato | Entries | Beneficio                                |
| ---------------------- | ------- | ---------------------------------------- |
| Ingredienti            | 2,548   | Traduzioni, nutrizione, allergeni pronti |
| Prodotti F&B           | 4,653   | Catalogo pronto per nuovi merchant       |
| **Partner Turistici**  | Growing | Tour op + hotel + Airbnb per zona        |

**Come Funziona:**

```
PRIMO LOCALE A MILANO DUOMO:
├── AI fa ricerca completa (~5-10 min)
├── Trova 127 tour operator + 34 accommodation
├── SALVA in DB GUDBRO (shared) ← NUOVO
└── Merchant usa i dati

SECONDO LOCALE A MILANO DUOMO (1 settimana dopo):
├── AI check: "Ho già dati per questa zona!"
├── CARICA da DB GUDBRO (istantaneo) ← VANTAGGIO
├── Filtra per compatibilità locale
└── Pronto in 5 secondi invece di 10 minuti

MERCHANT #100 A ROMA:
├── DB già ha 200+ partner per Roma
├── Contribuisce feedback + nuovi partner
└── DB diventa sempre più accurato
```

**Network Effect:**

```
Merchant 1    → Contribuisce dati      → DB: 100 partner
Merchant 10   → Usa + contribuisce     → DB: 500 partner
Merchant 100  → Dati quasi completi IT → DB: 2,000 partner
Merchant 1000 → Database EU completo   → DB: 10,000+ partner
                                          ↓
                              MOAT COMPETITIVO IMBATTIBILE
```

**Dati Shared vs Private:**

| Dato              | Shared (GUDBRO DB)       | Private (Merchant)   |
| ----------------- | ------------------------ | -------------------- |
| Partner base info | ✅ Nome, contatti, tipo  |                      |
| Partner capacity  | ✅ Gruppi, budget        |                      |
| POI statistics    | ✅ Visitatori, stagioni  |                      |
| Quality score     | ✅ Aggregato da feedback |                      |
| Miei outreach     |                          | ✅ Chi ho contattato |
| Miei accordi      |                          | ✅ Termini specifici |
| Mio revenue       |                          | ✅ Quanto guadagno   |

**Schema Database Aggiuntivo:**

```sql
-- Tracking qualità dati shared
ALTER TABLE tour_operators ADD COLUMN
  discovered_by_merchant_id UUID,  -- Chi lo ha scoperto
  times_used INTEGER DEFAULT 0,    -- Quanti merchant lo usano
  last_verified_at TIMESTAMPTZ,
  verified_by TEXT,                -- 'ai', 'merchant_feedback', 'manual'
  quality_score DECIMAL(3,2);      -- 0.00-1.00

ALTER TABLE accommodation_partners ADD COLUMN
  discovered_by_merchant_id UUID,
  times_used INTEGER DEFAULT 0,
  last_verified_at TIMESTAMPTZ,
  verified_by TEXT,
  quality_score DECIMAL(3,2);

-- Feedback loop per migliorare dati
CREATE TABLE partner_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_type TEXT CHECK (partner_type IN ('tour_operator', 'accommodation')),
  partner_id UUID NOT NULL,
  merchant_id UUID NOT NULL REFERENCES merchants(id),

  feedback_type TEXT CHECK (feedback_type IN (
    'contact_verified',     -- Contatti funzionano ✅
    'contact_wrong',        -- Email/tel sbagliati ❌
    'closed_business',      -- Non esiste più ❌
    'successful_deal',      -- Accordo chiuso! 🎉
    'declined',             -- Non interessati
    'wrong_info'            -- Info sbagliate
  )),

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indice per partner lookup
CREATE INDEX idx_partner_feedback_partner ON partner_feedback(partner_type, partner_id);

-- Aggiorna quality_score automaticamente
CREATE OR REPLACE FUNCTION update_partner_quality_score()
RETURNS TRIGGER AS $$
BEGIN
  -- Calcola score basato su feedback
  -- positive: contact_verified, successful_deal
  -- negative: contact_wrong, closed_business, wrong_info
  IF NEW.partner_type = 'tour_operator' THEN
    UPDATE tour_operators SET
      quality_score = (
        SELECT
          CASE
            WHEN COUNT(*) = 0 THEN 0.5
            ELSE LEAST(1.0, GREATEST(0.0,
              0.5 +
              (COUNT(*) FILTER (WHERE feedback_type IN ('contact_verified', 'successful_deal')) * 0.1) -
              (COUNT(*) FILTER (WHERE feedback_type IN ('contact_wrong', 'closed_business', 'wrong_info')) * 0.15)
            ))
          END
        FROM partner_feedback
        WHERE partner_type = 'tour_operator' AND partner_id = NEW.partner_id
      ),
      times_used = times_used + 1,
      last_verified_at = NOW()
    WHERE id = NEW.partner_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_partner_quality
AFTER INSERT ON partner_feedback
FOR EACH ROW EXECUTE FUNCTION update_partner_quality_score();
```

**Vista Qualità Partner:**

```sql
CREATE VIEW v_partner_quality_summary AS
SELECT
  'tour_operator' as type,
  t.id,
  t.name,
  t.country_code,
  t.times_used,
  t.quality_score,
  COUNT(f.id) FILTER (WHERE f.feedback_type = 'successful_deal') as total_deals,
  COUNT(f.id) FILTER (WHERE f.feedback_type = 'contact_verified') as verified_contacts,
  COUNT(f.id) FILTER (WHERE f.feedback_type IN ('contact_wrong', 'wrong_info')) as reported_issues
FROM tour_operators t
LEFT JOIN partner_feedback f ON t.id = f.partner_id AND f.partner_type = 'tour_operator'
GROUP BY t.id

UNION ALL

SELECT
  'accommodation' as type,
  a.id,
  a.name,
  a.country_code,
  a.times_used,
  a.quality_score,
  COUNT(f.id) FILTER (WHERE f.feedback_type = 'successful_deal') as total_deals,
  COUNT(f.id) FILTER (WHERE f.feedback_type = 'contact_verified') as verified_contacts,
  COUNT(f.id) FILTER (WHERE f.feedback_type IN ('contact_wrong', 'wrong_info')) as reported_issues
FROM accommodation_partners a
LEFT JOIN partner_feedback f ON a.id = f.partner_id AND f.partner_type = 'accommodation'
GROUP BY a.id;
```

**Valore nel Tempo:**

| Timeline | Coverage        | Vantaggio Competitivo |
| -------- | --------------- | --------------------- |
| 6 mesi   | 20 città IT     | Buono                 |
| 1 anno   | Italia completa | Ottimo                |
| 2 anni   | EU principali   | Eccellente            |
| 3 anni   | Globale         | **Imbattibile**       |

**Nessun nuovo competitor potrà mai recuperare anni di dati accumulati.**

**Bonus Futuro: Discovery Credits**

Idea per incentivare contributi di qualità:

```
Merchant A scopre "Studiosus" e verifica contatti
  → Altri 15 merchant chiudono deal con Studiosus
  → Merchant A riceve €2 credit per ogni deal?
  → Incentivo a contribuire dati verificati
```

Crea economia circolare dove i merchant sono incentivati a:

1. Scoprire nuovi partner
2. Verificare contatti
3. Segnalare info sbagliate
4. Aggiornare dati obsoleti

---

#### AI Booking Coordinator (Revenue Management per F&B)

**Concetto:** L'AI Co-Manager non solo trova partner, ma **coordina attivamente le prenotazioni** ottimizzando per profitto nel breve, medio e lungo termine. È il primo **Revenue Management System per ristoranti** - quello che hotel e aerei fanno da decenni.

**Perché è rivoluzionario:**

| Settore        | Revenue Management                  | Da quando |
| -------------- | ----------------------------------- | --------- |
| Aerei          | Dynamic pricing, overbooking        | 1980s     |
| Hotel          | Yield management, last-minute deals | 1990s     |
| Ride-sharing   | Surge pricing                       | 2010s     |
| **Ristoranti** | **NIENTE**                          | Mai       |
| **GUDBRO**     | **PRIMO AL MONDO**                  | 2026      |

**Come Funziona:**

```
INPUT:
├── Calendario locale (capacità per slot orario)
├── Prenotazioni esistenti (gruppi confermati)
├── Walk-in previsti (storico per giorno/ora)
├── Richieste pending da tour operator/hotel
├── Storico partner: no-show rate, spending, affidabilità
├── Costi: food cost %, staff necessario per gruppo
├── Margini: per fascia prezzo e tipo gruppo
└── Obiettivi manager: revenue vs relazioni vs occupancy

OTTIMIZZAZIONE AI:
├── Breve termine: Massimizza revenue questa settimana
├── Medio termine: Bilancia tra partner (non favorire sempre uno)
├── Lungo termine: Costruisci relazioni con high-value partners
├── Considera: Stagionalità, eventi speciali, meteo forecast

OUTPUT:
├── Accetta / Rifiuta / Controproposta (automatico o suggerito)
├── Reasoning trasparente per ogni decisione
├── Calendario ottimizzato con forecast
├── Proactive outreach per slot sottoutilizzati
└── Revenue forecast vs actual tracking
```

**Esempio Decisione AI:**

```
SITUAZIONE: Martedì pranzo, 72 posti disponibili per gruppi

RICHIESTE PENDING:
├── Studiosus (DE): 45 pax @ €28/pax = €1,260
├── CTRIP (CN): 50 pax @ €22/pax = €1,100
└── Trafalgar (USA): 35 pax @ €45/pax = €1,575 (70% probabilità conferma)

CALCOLO AI:
├── Studiosus: €1,260 × 95% (reliability) = €1,197 expected
├── CTRIP: €1,100 × 85% (reliability) = €935 expected
├── Trafalgar: €1,575 × 70% (probability) = €1,102 expected
├── Studiosus + wait for others: Risk of losing slot
└── CTRIP low margin, affects brand positioning

DECISIONE AI:
→ "Accetta Studiosus (€1,260 guaranteed, reliable partner)"
→ "Declina CTRIP (margine troppo basso per brand)"
→ "Se Studiosus declina, ricontatta Trafalgar con urgenza"
```

**Livelli di Automazione:**

| Livello          | Comportamento                                        | Per chi                        |
| ---------------- | ---------------------------------------------------- | ------------------------------ |
| **Suggest**      | AI suggerisce, manager decide sempre                 | Nuovi utenti, controllo totale |
| **Auto-routine** | AI decide per richieste standard, escalate eccezioni | Utenti intermedi               |
| **Full auto**    | AI gestisce tutto, manager riceve report             | Power users, alta fiducia      |

**Database Aggiuntivo:**

```sql
-- Configurazione booking AI per merchant
CREATE TABLE ai_booking_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID UNIQUE REFERENCES merchants(id),

  -- Automation level
  automation_level TEXT DEFAULT 'suggest' CHECK (automation_level IN (
    'suggest', 'auto_routine', 'full_auto'
  )),

  -- Optimization weights (0-100, total = 100)
  weight_revenue INTEGER DEFAULT 50,        -- Priorità revenue
  weight_occupancy INTEGER DEFAULT 30,      -- Priorità riempimento
  weight_relationships INTEGER DEFAULT 20,  -- Priorità relazioni partner

  -- Constraints
  min_margin_percent INTEGER DEFAULT 20,    -- Non accettare sotto X% margine
  max_group_percent INTEGER DEFAULT 60,     -- Max % capacità a gruppi
  blackout_dates DATE[],                    -- Date no gruppi (es. San Valentino)

  -- Partner preferences
  preferred_partners UUID[],                -- Partner da favorire
  blocked_partners UUID[],                  -- Partner da evitare

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Richieste prenotazione gruppi
CREATE TABLE group_booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),

  -- Source
  partner_type TEXT CHECK (partner_type IN ('tour_operator', 'accommodation', 'direct')),
  partner_id UUID,                          -- FK to tour_operators or accommodation_partners

  -- Request details
  requested_date DATE NOT NULL,
  requested_slot TEXT CHECK (requested_slot IN ('breakfast', 'lunch', 'dinner')),
  party_size INTEGER NOT NULL,
  price_per_person DECIMAL(10,2),
  total_value DECIMAL(10,2) GENERATED ALWAYS AS (party_size * price_per_person) STORED,

  -- Menu/requirements
  menu_type TEXT,                           -- 'silver', 'gold', 'platinum', 'custom'
  dietary_requirements TEXT[],
  special_requests TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',              -- In attesa decisione
    'ai_suggested_accept',  -- AI suggerisce accettare
    'ai_suggested_decline', -- AI suggerisce rifiutare
    'ai_suggested_counter', -- AI suggerisce controproposta
    'accepted',             -- Confermato
    'declined',             -- Rifiutato
    'countered',            -- Controproposta inviata
    'expired',              -- Scaduta senza risposta
    'cancelled'             -- Cancellata
  )),

  -- AI reasoning
  ai_recommendation TEXT,
  ai_reasoning TEXT,
  ai_expected_value DECIMAL(10,2),
  ai_confidence DECIMAL(3,2),               -- 0.00-1.00

  -- Counter offer (if any)
  counter_price_per_person DECIMAL(10,2),
  counter_date DATE,
  counter_slot TEXT,

  -- Tracking
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  decided_at TIMESTAMPTZ,
  decided_by TEXT,                          -- 'ai_auto', 'manager'

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storico performance per ottimizzazione
CREATE TABLE booking_performance_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),

  date DATE NOT NULL,
  slot TEXT NOT NULL,

  -- Capacity
  total_capacity INTEGER,
  group_covers INTEGER,
  walkin_covers INTEGER,
  total_covers INTEGER,
  occupancy_percent DECIMAL(5,2),

  -- Revenue
  group_revenue DECIMAL(10,2),
  walkin_revenue DECIMAL(10,2),
  total_revenue DECIMAL(10,2),

  -- Averages
  avg_group_spend DECIMAL(10,2),
  avg_walkin_spend DECIMAL(10,2),

  -- For ML optimization
  day_of_week INTEGER,
  is_holiday BOOLEAN,
  weather_conditions TEXT,
  special_events TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, date, slot)
);

-- Indici per query veloci
CREATE INDEX idx_booking_requests_merchant_date ON group_booking_requests(merchant_id, requested_date);
CREATE INDEX idx_booking_requests_status ON group_booking_requests(status);
CREATE INDEX idx_booking_performance_merchant ON booking_performance_history(merchant_id, date);
```

**UI - AI Booking Coordinator:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 📅 AI BOOKING COORDINATOR                    Week of Jan 13-19  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ CAPACITY HEATMAP                              Optimization: 87% │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │         Mon   Tue   Wed   Thu   Fri   Sat   Sun            │ │
│ │ Lunch   ████  ██░░  ███░  ████  ████  ████  ███░           │ │
│ │ Dinner  ██░░  ███░  ██░░  ███░  ████  ████  ████           │ │
│ │                                                             │ │
│ │ ████ Optimal   ███░ Available   ██░░ Underutilized         │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ PENDING DECISIONS (3)                          [Auto-decide All]│
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🚌 Studiosus       Wed Lunch   45 pax   €28/pax   €1,260   │ │
│ │    AI: "ACCEPT - slot 40% full, reliable partner (98%)"    │ │
│ │    Expected value: €1,197                                   │ │
│ │    [✅ Accept] [💬 Counter] [❌ Decline]                    │ │
│ │                                                             │ │
│ │ 🚌 CTRIP           Thu Lunch   60 pax   €20/pax   €1,200   │ │
│ │    AI: "COUNTER €25 - high demand day, margin too low"     │ │
│ │    Your margin at €20: 15% ⚠️  At €25: 28% ✅              │ │
│ │    [✅ Accept] [💬 Counter €25] [❌ Decline]                │ │
│ │                                                             │ │
│ │ 🏨 Grand Hotel     Sat Dinner  15 pax   €55/pax   €825     │ │
│ │    AI: "ACCEPT - premium slot, small group fits gaps"      │ │
│ │    Saturday 85% full, 15 pax fits perfectly                │ │
│ │    [✅ Accept] [💬 Counter] [❌ Decline]                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ THIS WEEK                                                       │
│ ┌───────────────┬───────────────┬───────────────┐              │
│ │ Groups        │ Walk-in Est.  │ Total         │              │
│ │ 8 confirmed   │ ~1,400 covers │               │              │
│ │ 312 pax       │               │               │              │
│ │ €9,840        │ €18,200       │ €28,040       │              │
│ │               │               │ +12% vs LW 📈 │              │
│ └───────────────┴───────────────┴───────────────┘              │
│                                                                 │
│ AI PROACTIVE ACTIONS                                            │
│ • Tue dinner underutilized → Contacted 5 partners              │
│ • Countered CTRIP €20→€25 → Waiting response                   │
│ • Declined 2 Sat dinner requests → Already optimal             │
│                                                                 │
│ [⚙️ Settings]  [📊 Analytics]  [🎯 Optimization Rules]         │
└─────────────────────────────────────────────────────────────────┘
```

**Settings - Optimization Rules:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎯 AI BOOKING OPTIMIZATION RULES                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ AUTOMATION LEVEL                                                │
│ ○ Suggest only - I decide everything                           │
│ ● Auto-routine - AI handles standard, asks for exceptions      │
│ ○ Full auto - AI manages all, I review reports                 │
│                                                                 │
│ OPTIMIZATION PRIORITIES                     [Balanced ▾]        │
│ Revenue     ████████████████░░░░  70%                          │
│ Occupancy   ████████░░░░░░░░░░░░  20%                          │
│ Relations   ████░░░░░░░░░░░░░░░░  10%                          │
│                                                                 │
│ CONSTRAINTS                                                     │
│ Minimum margin per group:        [20%] ⚠️ Below this = decline │
│ Maximum capacity to groups:      [60%] 🪑 Reserve for walk-in  │
│ Advance booking required:        [48h] ⏰ Last-minute = premium │
│                                                                 │
│ BLACKOUT DATES (no groups)                                      │
│ • Feb 14 (Valentine's) - Premium walk-in                       │
│ • Dec 31 (NYE) - Special menu only                             │
│ • [+ Add date]                                                  │
│                                                                 │
│ PARTNER PREFERENCES                                             │
│ ⭐ Preferred: Studiosus, Trafalgar, Hotel Duomo                │
│ 🚫 Blocked: [none]                                              │
│                                                                 │
│ PRICING RULES                                                   │
│ • High demand (>80% capacity): +15% minimum                    │
│ • Low demand (<40% capacity): Accept -10% if fills slot        │
│ • Last minute (<24h): +20% premium                             │
│ • Repeat partner (5+ bookings): -5% loyalty discount           │
│                                                                 │
│                                    [Save Rules] [Reset Default] │
└─────────────────────────────────────────────────────────────────┘
```

**Revenue Impact:**

| Senza AI                 | Con AI Coordinator          |
| ------------------------ | --------------------------- |
| Accetta prima richiesta  | Ottimizza per valore        |
| No controproposte        | Counter automatici          |
| Slot vuoti restano vuoti | Proactive outreach          |
| Nessun yield management  | Dynamic pricing             |
| **€20k/mese gruppi**     | **€28k/mese gruppi (+40%)** |

**Effort:** High (ma valore ENORME - primo al mondo!)

**Dipendenze:**

- TOURISM-B2B Partnership Hub (partner database)
- Sistema prenotazioni esistente
- Storico dati per ML optimization

---

#### Multi-Venue Type Support (Non Solo Ristoranti)

**Concetto:** Il sistema Tourism B2B funziona per QUALSIASI tipo di locale F&B in zona turistica, non solo ristoranti. Ogni tipo ha prodotti diversi da offrire.

**Prodotti per Tipo Locale:**

| Tipo Locale             | Prodotto Tour Operator    | Prodotto Hotel/Airbnb       |
| ----------------------- | ------------------------- | --------------------------- |
| **Ristorante/Pizzeria** | Pranzo/cena gruppi        | Convenzione ospiti          |
| **Bar/Caffetteria**     | Coffee break, colazione   | Colazione convenzionata     |
| **Gelateria**           | Gelato stop (15 min)      | Voucher gelato ospiti       |
| **Pasticceria**         | Degustazione dolci tipici | Breakfast pastries delivery |
| **Enoteca**             | Wine tasting experience   | Wine & cheese evening       |
| **Cocktail Bar**        | Aperitivo experience      | Happy hour ospiti           |
| **Pub/Birreria**        | Beer tasting, pub lunch   | After-dinner drinks         |
| **Rooftop Bar**         | Sunset experience premium | Exclusive access            |
| **Bakery/Forno**        | Fresh bread experience    | Morning delivery            |
| **Food Truck**          | Festival/evento catering  | -                           |

**Esempi Revenue per Tipo:**

```
GELATERIA A ROMA (Fontana di Trevi):
├── Prodotto: "Gelato Stop" 15 min, €5/pax
├── Volume: 6 gruppi/giorno × 40 pax = 240 gelati
├── Revenue: €1,200/giorno = €36,000/mese
└── AI coordina slot per evitare code

ENOTECA A FIRENZE (Ponte Vecchio):
├── Prodotto: Wine Tasting 45 min, €25/pax
├── Volume: 3 gruppi/giorno × 20 pax = 60 tasting
├── Revenue: €1,500/giorno + €500 vendita bottiglie
└── AI: gruppi piccoli = premium price

ROOFTOP BAR A MILANO (vista Duomo):
├── Prodotto: Sunset Aperitivo €35/pax
├── Slot: Solo 18:00-20:00, capacità limitata
├── AI: "Slot premium, accetta solo luxury tour"
├── Revenue: €2,100/sera = €42,000/mese
└── Yield management per scarcity

CAFFETTERIA A VENEZIA (San Marco):
├── Prodotti: Colazione hotel €12 + Coffee break €8
├── Volume: 200 colazioni + 150 coffee break/giorno
├── Revenue: €3,600/giorno = €108,000/mese
└── AI bilancia stabili (hotel) vs volume (tour)
```

**Database - Product Templates per Venue Type:**

```sql
-- Template prodotti per tipo venue
CREATE TABLE tourism_product_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  venue_type TEXT NOT NULL,          -- 'gelateria', 'enoteca', 'rooftop_bar'
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,

  -- Caratteristiche
  target TEXT CHECK (target IN ('tour_operator', 'accommodation', 'both')),
  duration_minutes INTEGER,

  -- Pricing suggerito
  suggested_price_min DECIMAL(10,2),
  suggested_price_max DECIMAL(10,2),

  -- Capacità
  min_group_size INTEGER,
  max_group_size INTEGER,

  -- Descrizione
  description_template TEXT,         -- Con placeholder {venue_name}, {location}
  includes TEXT[],                   -- Cosa è incluso

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prodotti configurati dal merchant
CREATE TABLE merchant_tourism_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  template_id UUID REFERENCES tourism_product_templates(id),

  -- Override del template
  custom_name TEXT,
  custom_price DECIMAL(10,2),
  custom_duration INTEGER,
  custom_min_group INTEGER,
  custom_max_group INTEGER,
  custom_description TEXT,
  custom_includes TEXT[],

  -- Disponibilità
  available_days INTEGER[],          -- 0=Sun, 1=Mon, etc.
  available_slots TEXT[],            -- ['morning', 'afternoon', 'evening']
  max_per_day INTEGER,               -- Max gruppi/giorno per questo prodotto

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed esempi per gelateria
INSERT INTO tourism_product_templates (venue_type, product_name, product_slug, target, duration_minutes, suggested_price_min, suggested_price_max, min_group_size, max_group_size, includes) VALUES
('gelateria', 'Gelato Stop', 'gelato-stop', 'tour_operator', 15, 4, 6, 10, 50, '{"1 scoop any flavor", "Cone or cup"}'),
('gelateria', 'Gelato Experience', 'gelato-experience', 'tour_operator', 30, 10, 15, 8, 25, '{"Tasting 3 flavors", "History of gelato", "1 full gelato"}'),
('gelateria', 'Gelato Making Class', 'gelato-class', 'tour_operator', 90, 40, 60, 6, 12, '{"Learn to make gelato", "Take home container", "Recipe card"}'),
('gelateria', 'Guest Voucher', 'guest-voucher', 'accommodation', NULL, 4, 6, 1, 1, '{"€5 voucher for any gelato"}'),
('gelateria', 'Welcome Amenity', 'welcome-amenity', 'accommodation', NULL, 3, 5, 10, 100, '{"Small cup delivered to room"}');

-- Seed esempi per enoteca
INSERT INTO tourism_product_templates (venue_type, product_name, product_slug, target, duration_minutes, suggested_price_min, suggested_price_max, min_group_size, max_group_size, includes) VALUES
('enoteca', 'Wine Tasting Classic', 'wine-tasting', 'tour_operator', 45, 20, 35, 8, 30, '{"4 wine tasting", "Cheese & salumi board", "Sommelier guide"}'),
('enoteca', 'Premium Wine Experience', 'wine-premium', 'tour_operator', 90, 50, 80, 6, 16, '{"6 premium wines", "Full food pairing", "Cellar tour"}'),
('enoteca', 'Wine & Cheese Evening', 'wine-evening', 'accommodation', 60, 30, 45, 2, 20, '{"3 wines", "Cheese selection", "10% bottle discount"}');

-- Seed esempi per rooftop bar
INSERT INTO tourism_product_templates (venue_type, product_name, product_slug, target, duration_minutes, suggested_price_min, suggested_price_max, min_group_size, max_group_size, includes) VALUES
('rooftop_bar', 'Sunset Aperitivo', 'sunset-aperitivo', 'tour_operator', 60, 30, 50, 10, 40, '{"Welcome drink", "Appetizer selection", "Best view seats"}'),
('rooftop_bar', 'Exclusive Buyout', 'exclusive-buyout', 'tour_operator', 120, 2000, 5000, 30, 80, '{"Private venue", "Open bar", "Catering included"}'),
('rooftop_bar', 'VIP Access', 'vip-access', 'accommodation', NULL, 15, 25, 2, 10, '{"Skip the line", "Reserved seating", "Welcome cocktail"}');
```

**UI - Configure Products:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎯 TOURISM PRODUCTS                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Your venue type: [Gelateria ▾]      Location: Roma, Trevi       │
│                                                                 │
│ FOR TOUR OPERATORS                                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ✅ Gelato Stop (Quick)                           [Edit]     │ │
│ │    ⏱️ 15 min │ 💰 €5/pax │ 👥 10-50 pax                     │ │
│ │    Includes: 1 scoop any flavor                             │ │
│ │    Available: Mon-Sun, All day │ Max: 8 groups/day          │ │
│ │                                                              │ │
│ │ ✅ Gelato Experience (Premium)                   [Edit]     │ │
│ │    ⏱️ 30 min │ 💰 €12/pax │ 👥 8-25 pax                     │ │
│ │    Includes: Tasting + history + full gelato                │ │
│ │    Available: Mon-Sat, 10:00-18:00 │ Max: 4 groups/day      │ │
│ │                                                              │ │
│ │ ⬜ Gelato Making Class                           [Enable]   │ │
│ │    ⏱️ 90 min │ 💰 €45/pax │ 👥 6-12 pax                     │ │
│ │    Premium experience - requires kitchen space              │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ FOR HOTELS & AIRBNB                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ✅ Guest Voucher                                 [Edit]     │ │
│ │    💰 €5 value │ Your cost: €3.50 │ Margin: 30%             │ │
│ │    Hotel gives voucher → Guest redeems at your shop         │ │
│ │                                                              │ │
│ │ ⬜ Welcome Amenity (Delivery)                    [Enable]   │ │
│ │    💰 €4/room │ Min order: 10 │ Delivery radius: 500m       │ │
│ │    Small cup delivered to hotel for guest arrival           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [+ Create Custom Product]                                       │
│                                                                 │
│ 💡 AI TIP: "Gelato Stop" is perfect for your location.         │
│    Tour groups at Trevi average 15 min stops.                  │
│    Suggested price for your area: €5-6/pax                     │
└─────────────────────────────────────────────────────────────────┘
```

**Revenue Potential per Tipo (zona turistica top):**

| Venue Type  | Monthly Revenue Potential | Key Product                 |
| ----------- | ------------------------- | --------------------------- |
| Ristorante  | €20,000 - €40,000         | Lunch/dinner groups         |
| Gelateria   | €30,000 - €50,000         | Gelato stop (high volume)   |
| Enoteca     | €40,000 - €60,000         | Wine tasting (high margin)  |
| Rooftop Bar | €40,000 - €80,000         | Sunset experience (premium) |
| Caffetteria | €50,000 - €100,000        | Colazioni (volume)          |
| Pasticceria | €15,000 - €25,000         | Degustazioni                |

**Nota:** Revenue potential dipende da location, capacità, e stagionalità.

---

#### Convention Verification System (Riconoscimento Clienti Convenzionati)

**Problema:** Come fa il locale a riconoscere un cliente convenzionato (ospite hotel, dipendente ufficio, membro tour)?

**Soluzione tradizionale:** Voucher cartacei, carte sconto → Facili da perdere, falsificare, gestire.

**Soluzione GUDBRO:** Sistema digitale multi-layer integrato nella PWA.

**Metodi di Verifica (dal più smart al fallback):**

```
LIVELLO 1: Link Diretto (Zero friction)
├── Partner manda link all'utente (email/WhatsApp/app)
├── Link: locale.gudbro.com/c/PARTNER-abc123
├── Contiene: partner_id + codice crittografato + scadenza
├── Cliente clicca → PWA aperta → Convenzione già attiva
└── Mostra QR al banco → Staff scansiona → Sconto applicato

LIVELLO 2: QR Dinamico Partner
├── QR alla reception hotel / ingresso ufficio
├── Dipendente/ospite scansiona → Inserisce ID (camera/badge)
├── Convenzione attivata per X ore/giorni
└── Valido per quel partner

LIVELLO 3: Codice Giornaliero (Fallback semplice)
├── Ogni giorno: TECHCORP-1301 (prefisso + data)
├── Staff locale conosce i partner attivi
├── Cliente dice codice → Staff verifica
└── Veloce, no tech required

LIVELLO 4: Riconoscimento Automatico (Magic - futuro)
├── Cliente già follower GUDBRO + lavora in azienda partner
├── Geofencing: è vicino all'ufficio E al locale
├── Sistema attiva convenzione automaticamente
└── "Ciao Mario! Il tuo sconto TechCorp è attivo"
```

**Database:**

```sql
-- Convenzioni attive tra merchant e partner
CREATE TABLE partner_conventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),

  -- Partner (può essere tour_op, hotel, o office)
  partner_type TEXT CHECK (partner_type IN (
    'tour_operator', 'accommodation', 'office', 'school', 'gym', 'other'
  )),
  partner_id UUID,              -- FK to respective table
  partner_name TEXT,            -- Denormalized for quick display

  -- Benefit
  benefit_type TEXT CHECK (benefit_type IN (
    'percentage_discount',      -- 10% off
    'fixed_discount',           -- €2 off
    'free_item',                -- Free coffee with lunch
    'special_price',            -- Fixed menu €8
    'points_multiplier'         -- 2x loyalty points
  )),
  benefit_value DECIMAL(10,2),
  benefit_description TEXT,     -- "10% off all orders"
  benefit_conditions TEXT,      -- "Minimum €10 order"

  -- Validity
  valid_from DATE,
  valid_until DATE,             -- NULL = no expiry
  valid_days INTEGER[],         -- [1,2,3,4,5] = Mon-Fri only
  valid_hours TSRANGE,          -- 12:00-14:30 lunch only

  -- Verification
  verification_method TEXT DEFAULT 'link' CHECK (verification_method IN (
    'link',           -- Direct link with embedded code
    'qr_scan',        -- Partner has QR that users scan
    'daily_code',     -- Daily rotating code
    'badge_id',       -- Employee badge number
    'automatic'       -- Geofencing/recognition
  )),
  daily_code_prefix TEXT,       -- "TECHCORP" → TECHCORP-1301

  -- Limits
  max_uses_total INTEGER,       -- NULL = unlimited
  max_uses_per_user INTEGER,    -- Per day/week/month
  max_uses_period TEXT,         -- 'day', 'week', 'month'

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Voucher/link individuali
CREATE TABLE convention_vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  convention_id UUID REFERENCES partner_conventions(id),

  -- Unique identifier
  voucher_code TEXT UNIQUE NOT NULL,
  short_url TEXT,
  qr_data TEXT,                 -- For QR generation

  -- User info
  user_id UUID REFERENCES accounts(id),
  user_identifier TEXT,         -- Room 305, Badge #12345
  user_name TEXT,
  user_email TEXT,

  -- Validity
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  max_uses INTEGER DEFAULT 1,
  times_used INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ
);

-- Ogni utilizzo tracciato
CREATE TABLE convention_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id UUID REFERENCES convention_vouchers(id),
  convention_id UUID REFERENCES partner_conventions(id),
  merchant_id UUID REFERENCES merchants(id),

  -- Transaction details
  order_id UUID,
  original_amount DECIMAL(10,2),
  discount_amount DECIMAL(10,2),
  final_amount DECIMAL(10,2),

  -- How verified
  verification_method TEXT,
  verified_by_staff UUID,

  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici
CREATE INDEX idx_conventions_merchant ON partner_conventions(merchant_id);
CREATE INDEX idx_conventions_partner ON partner_conventions(partner_type, partner_id);
CREATE INDEX idx_vouchers_code ON convention_vouchers(voucher_code);
CREATE INDEX idx_redemptions_date ON convention_redemptions(redeemed_at);
```

**UI - Cliente (PWA):**

```
┌─────────────────────────────────────────┐
│ 🎫 YOUR BENEFITS                        │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏢 TECHCORP                         │ │
│ │                                     │ │
│ │ ✅ 15% Discount on Lunch            │ │
│ │                                     │ │
│ │ Valid: Mon-Fri, 12:00-14:30         │ │
│ │ Badge: #12345                       │ │
│ │                                     │ │
│ │ ┌───────────────────────────────┐   │ │
│ │ │         [QR CODE]             │   │ │
│ │ │    Show this to staff         │   │ │
│ │ └───────────────────────────────┘   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏨 HOTEL DUOMO (Guest)              │ │
│ │ 10% off • Valid until Jan 15       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏋️ FITLIFE GYM                      │ │
│ │ Free protein shake with meal        │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

**UI - Staff (POS/Backoffice):**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎫 VERIFY CONVENTION                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [📷 Scan QR]     [⌨️ Enter Code]     [🔍 Search Partner]        │
│                                                                 │
│ ═══════════════════════════════════════════════════════════════ │
│                                                                 │
│ ✅ VALID CONVENTION                                             │
│                                                                 │
│ Partner:    🏢 TechCorp S.r.l.                                  │
│ Employee:   Mario Rossi (Badge #12345)                          │
│ Benefit:    15% Discount                                        │
│ Valid:      Mon-Fri, 12:00-14:30                                │
│ Uses today: 0/1                                                 │
│                                                                 │
│              [✅ Apply 15% Discount]                            │
│                                                                 │
│ ═══════════════════════════════════════════════════════════════ │
│                                                                 │
│ TODAY'S QUICK CODES:                                            │
│ • TECHCORP-1301                                                 │
│ • DUOMO-1301                                                    │
│ • FITLIFE-1301                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

#### Office/Corporate Conventions (Espansione B2B)

**Concetto:** Le convenzioni non sono solo per turisti! Gli **uffici e aziende** nella zona sono un mercato enorme e stabile.

**Collegamento con AI-ZONE-INTEL:**

```
AI-ZONE-INTEL già identifica:
├── "TechCorp HQ a 200m, ~500 dipendenti"
├── "Studio Legale Rossi a 150m, ~30 dipendenti"
├── "Banca XYZ a 300m, ~200 dipendenti"
└── "Coworking Space a 100m, ~150 membri"

                    ↓

B2B-PARTNERSHIPS suggerisce:
"Hai 880 potenziali clienti lunch in 300m.
 Vuoi proporre convenzioni aziendali?"

                    ↓

Sistema genera outreach personalizzato per HR/Office Manager
```

**Tipi di Convenzioni Aziendali:**

| Tipo                 | Descrizione           | Benefit Tipico  |
| -------------------- | --------------------- | --------------- |
| **Lunch Convention** | Pranzo dipendenti     | 10-15% sconto   |
| **Meal Vouchers**    | Buoni pasto digitali  | Valore fisso €8 |
| **Coffee Break**     | Pausa caffè team      | €2/persona      |
| **Meeting Catering** | Riunioni/eventi       | Menu fisso €15  |
| **Friday Aperitivo** | Team building         | €10/persona     |
| **Birthday Benefit** | Compleanno dipendente | Dolce gratis    |

**Database - Office Partners:**

```sql
-- Uffici/aziende partner (estensione di accommodation_partners logic)
CREATE TABLE office_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identità
  company_name TEXT NOT NULL,
  industry TEXT,                -- 'tech', 'legal', 'finance', 'healthcare'

  -- Location
  address TEXT,
  city TEXT,
  location GEOGRAPHY(POINT, 4326),
  distance_to_merchant_m INTEGER,

  -- Size
  employee_count INTEGER,
  floors_occupied INTEGER,

  -- Contacts
  hr_contact_name TEXT,
  hr_contact_email TEXT,
  hr_contact_phone TEXT,
  office_manager_name TEXT,
  office_manager_email TEXT,

  -- Characteristics
  has_canteen BOOLEAN DEFAULT false,   -- Competition!
  lunch_break_time TSRANGE,            -- Typical lunch hours
  wfh_policy TEXT,                     -- 'full_office', 'hybrid', 'remote'

  -- Metadata
  data_source TEXT,
  verified BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach per uffici (stesso pattern hotel)
CREATE TABLE merchant_office_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  office_id UUID REFERENCES office_partners(id),

  -- Pipeline status
  status TEXT CHECK (status IN (
    'suggested', 'contacted', 'meeting_scheduled',
    'negotiating', 'active', 'declined', 'no_response'
  )),

  -- Proposed convention
  proposed_benefit_type TEXT,
  proposed_benefit_value DECIMAL(10,2),

  -- Tracking
  first_contact_at TIMESTAMPTZ,
  meeting_date DATE,
  contract_signed_at DATE,

  -- Results
  employees_enrolled INTEGER DEFAULT 0,
  monthly_visits INTEGER DEFAULT 0,
  monthly_revenue DECIMAL(10,2) DEFAULT 0,

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**AI Discovery Flow:**

```
STEP 1: AI-ZONE-INTEL identifica uffici
├── Google Places API: "offices near [location]"
├── Stima dipendenti da dimensione building
└── Salva in office_partners

STEP 2: AI analizza potenziale
├── 500 dipendenti × 20% adoption = 100 clienti
├── 100 clienti × 3 pranzi/sett × €10 = €3,000/sett
├── €12,000/mese potenziale da TechCorp
└── Score: "High potential - recommend outreach"

STEP 3: AI suggerisce outreach
├── "TechCorp non ha mensa interna"
├── "Orario pranzo 12:30-14:00"
├── "Suggerisco: 15% sconto pranzo weekday"
└── "Contatto HR: hr@techcorp.com"

STEP 4: Merchant approva → AI genera email
├── Template professionale
├── Proposta convenzione allegata
├── Tracking risposta
└── Follow-up automatico se no response
```

**UI - Partnership Hub (espanso):**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🤝 PARTNERSHIP HUB                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [🚌 Tour Operators] [🏨 Hotels] [🏢 Offices] [🏋️ Gyms] [🎓 Schools]│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ 🏢 OFFICE PARTNERS                               [+ Find More]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ACTIVE CONVENTIONS (3)                           Revenue/month  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🏢 TechCorp S.r.l.        500 emp   200m    ✅ Active       │ │
│ │    15% lunch discount     87 enrolled       €4,200          │ │
│ │    Started: Oct 2025      Visits: 320/mo                    │ │
│ │                                                             │ │
│ │ 🏢 Studio Legale Rossi    30 emp    150m    ✅ Active       │ │
│ │    10% all day            12 enrolled       €890            │ │
│ │                                                             │ │
│ │ 🏢 Banca XYZ              200 emp   300m    ✅ Active       │ │
│ │    Meal voucher €8        45 enrolled       €2,160          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                          Total: €7,250/month    │
│                                                                 │
│ SUGGESTED BY AI (5)                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🏢 Coworking Hub          150 memb  100m    📋 Suggested    │ │
│ │    No canteen, perfect for lunch convention                 │ │
│ │    Potential: €3,000/mo                    [📧 Contact]     │ │
│ │                                                             │ │
│ │ 🏢 Insurance Co.          300 emp   400m    📋 Suggested    │ │
│ │    Has canteen but poor reviews - opportunity!              │ │
│ │    Potential: €5,000/mo                    [📧 Contact]     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ PENDING OUTREACH (2)                                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🏢 Accounting Firm        50 emp    250m    ⏳ Contacted    │ │
│ │    Sent: 5 days ago                        [📧 Remind]      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Revenue Model - Office Conventions:**

| Azienda       | Dipendenti | Enrolled | Visits/mo | Avg Ticket | Revenue/mo    |
| ------------- | ---------- | -------- | --------- | ---------- | ------------- |
| TechCorp      | 500        | 87 (17%) | 320       | €12        | €3,840        |
| Studio Legale | 30         | 12 (40%) | 48        | €15        | €720          |
| Banca XYZ     | 200        | 45 (22%) | 180       | €10        | €1,800        |
| **TOTALE**    | **730**    | **144**  | **548**   |            | **€6,360/mo** |

**Vantaggi vs Turismo:**

| Aspetto       | Turismo            | Uffici                |
| ------------- | ------------------ | --------------------- |
| Stagionalità  | Alta (estate peak) | Bassa (tutto l'anno)  |
| Prevedibilità | Media              | Alta (stessi clienti) |
| Frequenza     | 1 volta            | 3-5 volte/settimana   |
| Relazione     | Transazionale      | Fidelizzazione        |
| Revenue       | Picchi alti        | Flusso costante       |

**Best Strategy: Combinare entrambi!**

- Turismo → Revenue alto in stagione
- Uffici → Base stabile tutto l'anno

---

**Riepilogo Partner Types Supportati:**

| Tipo          | Target               | Prodotto               | Volume           |
| ------------- | -------------------- | ---------------------- | ---------------- |
| Tour Operator | Gruppi turistici     | Pranzo/cena/experience | Alto stagionale  |
| Hotel         | Ospiti               | Colazione/cena conv.   | Medio stabile    |
| Hostel        | Budget travelers     | Sconto                 | Alto volume      |
| Airbnb        | Turisti indipendenti | Voucher/sconto         | Medio            |
| **Uffici**    | Dipendenti           | Lunch/coffee           | **Alto stabile** |
| Palestre      | Membri               | Post-workout           | Medio            |
| Scuole        | Studenti/genitori    | Merende/pranzi         | Alto (term time) |

---

---

## P2 - Media Priorità

### Features da MenuTiger Audit

| ID                  | Feature               | Descrizione                            | Effort  |
| ------------------- | --------------------- | -------------------------------------- | ------- | -------------------------------------- |
| MT-GEOFENCING       | Location Geofencing   | Radius-based location + GPS validation | High    |
| MT-SURVEY-BUILDER   | Survey Builder        | Question builder con live preview      | Medium  |
| MT-CRM-ADVANCED     | CRM Avanzato          | Customer profiles, LTV, segments       | Medium  |
| MT-THEMES-VARIETY   | 15+ Temi Website      | Layout diversi, non solo colori        | Medium  |
| MT-POS-INTEGRATIONS | POS Integrations      | Square, Toast, Lightspeed, Tilby       | High    |
| ~~MT-WIFI-QR~~      | ~~WiFi QR Generator~~ | ~~WPA/WPA2/WPA3 support~~              | ~~Low~~ | **GIA ESISTENTE** WiFiQuickConnect.tsx |

### Features da MenuTiger Audit v2 (2026-01-08)

| ID               | Feature                 | Descrizione                                      | Effort | Priorità |
| ---------------- | ----------------------- | ------------------------------------------------ | ------ | -------- |
| MT-KDS           | Kitchen Display System  | Display ordini real-time per cucina              | High   | P2       |
| MT-WHITE-LABEL   | White-label Domain      | Custom domain per merchant (es. menu.miobar.com) | Medium | P2       |
| MT-EMAIL-REPORTS | Automated Email Reports | Report vendite/feedback giornalieri/settimanali  | Low    | P2       |
| MT-ZAPIER        | Zapier Integration      | Connessione con 5000+ app esterne                | Medium | P3       |
| MT-QR-CUSTOM     | QR Code Customization   | Logo, colori, pattern, frame sul QR code         | Low    | P2       |

### UX Patterns da Adottare

| ID                  | Pattern                  | Dove Applicare       | Note                      |
| ------------------- | ------------------------ | -------------------- | ------------------------- |
| ~~MT-EMPTY-STATES~~ | ~~Empty States con CTA~~ | ~~Tutto backoffice~~ | **COMPLETATO** 2026-01-05 |
| MT-SOFT-DELETE      | Archive/Soft Delete      | Menu, Products       |                           |
| MT-FILTER-PATTERN   | Apply/Reset Filters      | Orders, Reports      |                           |
| MT-LIVE-PREVIEW     | Live Preview             | QR Builder, Forms    |                           |

### Backoffice Features

| ID             | Feature            | Descrizione                           | Effort |
| -------------- | ------------------ | ------------------------------------- | ------ |
| CUISINE-FILTER | Filtro cucina      | Campo cuisine_tags, filtro visibilità | Medium |
| WINE-MGMT-UI   | Wine Management UI | Vini custom per ristoranti            | Medium |

---

## P3 - Bassa Priorità (Future)

### Security

| ID               | Feature                    | Descrizione                                        | Effort |
| ---------------- | -------------------------- | -------------------------------------------------- | ------ |
| AUTH-PWD-PROTECT | Leaked Password Protection | Abilita check HaveIBeenPwned in Supabase Dashboard | Low    |
| DB-FK-INDEXES    | Foreign Key Indexes        | 46 FK senza indice (ottimizza JOIN)                | Low    |
| DEPS-MAJOR       | Major Dependencies Update  | React 19, Next 16, Tailwind 4, Zod 4               | High   |

### P6 - Schedule System (Future)

| ID          | Feature          | Descrizione                          |
| ----------- | ---------------- | ------------------------------------ |
| SCHED-STAFF | Staff Scheduling | Turni personale + Google Calendar    |
| SCHED-BREAK | Break System     | Gestione pause + override automatici |

### P7 - Web3 (Post-Validazione)

| ID                | Feature             | Descrizione                                    |
| ----------------- | ------------------- | ---------------------------------------------- |
| W3-NFT-LOYALTY    | NFT Loyalty Cards   | Collezione NFT per loyalty                     |
| ~~W3-CRYPTO-PAY~~ | ~~Crypto Payments~~ | **COMPLETATO Phase 1** 2026-01-10 - vedi sotto |

---

### CRYPTO-PAYMENTS-P2 - Evoluzione Pagamenti Crypto (Phase 2)

**Status:** Phase 1 completata. Queste sono le evoluzioni future.

**Phase 1 (COMPLETATO 2026-01-10):**

- [x] Database schema (merchant_payment_settings, crypto_order_payments, supported_cryptocurrencies)
- [x] Backoffice Settings > Payments page (Fiat + Crypto tabs)
- [x] CryptoWalletInput component con validazione
- [x] PWA crypto-price-service (CoinGecko API)
- [x] PWA CryptoPaymentModal (QR code + tx hash)
- [x] 7 crypto supportate: BTC, ETH, USDC, USDT, SOL, TON, BNB
- [x] Block explorer links per verifica

**Phase 2 Features:**

| ID                    | Feature                     | Descrizione                                               | Effort |
| --------------------- | --------------------------- | --------------------------------------------------------- | ------ |
| CRYPTO-ACCOUNTING     | Export Contabilita          | CSV/PDF export pagamenti crypto per commercialista        | Low    |
| CRYPTO-CUSTOMER-PREF  | Customer Payment Preference | Tracciare se cliente preferisce crypto/fiat nel profilo   | Low    |
| CRYPTO-PROMOS         | Promozioni Crypto-Only      | Sconti/cashback per chi paga in crypto                    | Medium |
| CRYPTO-WALLET-CONNECT | Wallet Connect              | Phantom, MetaMask one-click payment                       | Medium |
| CRYPTO-AUTO-VERIFY    | Verifica Automatica         | Check blockchain API per conferma automatica tx           | High   |
| CRYPTO-PRICE-MENU     | Prezzi Crypto su Menu       | Mostra prezzi in mBTC/ETH accanto a EUR                   | Low    |
| CRYPTO-GATEWAY        | Payment Gateway             | Integrazione NOWPayments/BitPay per auto-conversione fiat | High   |
| CRYPTO-LIGHTNING      | Lightning Network           | BTC Lightning per pagamenti istantanei low-fee            | High   |

**Marketing/Website:**

- [x] Feature aggiunta a FeaturesSection homepage (badge NEW)
- [x] Landing page dedicata `/solutions/crypto-payments` per SEO
- [ ] Case study: "Come [locale] ha aumentato revenue con crypto"

---

## P8 - Future Tech to Watch

> **Tecnologie da monitorare per implementazione futura.**
> Studiare ora, implementare quando i dati/scale lo giustificano.

---

### RLM - Recursive Language Models

**Repo:** https://github.com/alexzhang13/rlm
**Minimal:** https://github.com/alexzhang13/rlm-minimal
**Paper:** arXiv 2512.24601 (Dec 2025)
**Autori:** Alex L. Zhang, Tim Kraska, Omar Khattab (MIT)

#### Cos'è

Framework che permette agli LLM di gestire contesti **illimitati** (10M+ tokens) tramite chiamate ricorsive a se stessi in un ambiente REPL Python.

#### Come funziona

```
Query → Root LLM (NON vede il contesto!)
              ↓
        Contesto caricato come variabile Python in REPL
              ↓
        Root LLM esegue codice per esplorare:
        - peek(context[:2000])  → capisce struttura
        - grep("keyword")       → trova parti rilevanti
        - chunk + map           → divide e distribuisce
              ↓
        Sub-LLM calls (depth=1) → processano chunk specifici
              ↓
        Root LLM aggrega risultati → FINAL(answer)
```

**Insight chiave:** Il context window del root LLM non si riempie mai perché non vede mai il contesto completo.

#### Benchmark (impressionanti)

| Test                 | Risultato                            |
| -------------------- | ------------------------------------ |
| OOLONG 132K tokens   | RLM(GPT-mini) batte GPT-5: **+114%** |
| OOLONG 263K tokens   | RLM(GPT-mini) batte GPT-5: **+49%**  |
| BrowseComp 1000 docs | RLM: **100%** vs GPT-5: **20%**      |
| Context 10M+ tokens  | Funziona senza degradazione          |

**Costo:** RLM(GPT-mini) costa come GPT-5 ma performa meglio.

#### Strategie emergenti (l'LLM le scopre autonomamente)

1. **Peeking** - Guarda i primi 2000 char per capire struttura dati
2. **Grepping** - Cerca keyword con regex per trovare info rilevanti
3. **Partition + Map** - Divide contesto in chunk, distribuisce a sub-LLM
4. **Summarization** - Estrae riassunti per decision-making del root
5. **Long-Output Generation** - Processa task complessi one-shot

#### Limitazioni

| Limite          | Impatto                                     |
| --------------- | ------------------------------------------- |
| **Latenza**     | Secondi → minuti per query complesse        |
| **Costi**       | Nessuna garanzia sul totale (può esplodere) |
| **Blocking**    | Chiamate sincrone, no async                 |
| **Complessità** | Serve ambiente REPL sicuro                  |

#### Quando ha senso per GUDBRO

| Scenario                                     | Utile? | Motivazione                        |
| -------------------------------------------- | ------ | ---------------------------------- |
| AI-ZONE-INTEL con 1000+ clienti per merchant | ✅     | Pattern recognition su dati enormi |
| Analisi aggregata 500+ merchant              | ✅     | Multi-hop reasoning cross-database |
| Co-Manager conversazioni 100+ messaggi       | ✅     | Context illimitato senza perdita   |
| Query real-time checkout                     | ❌     | Troppo lento, serve <1s            |
| MVP con 50 merchant                          | ❌     | SQL normale è sufficiente          |

#### Implementazione suggerita

**Ora (P8 - Watch):**

- [x] Studiato e documentato
- [ ] Bookmark repo per aggiornamenti

**Quando 500+ merchant (rivalutare):**

- [ ] Testare su subset dati reali GUDBRO
- [ ] Benchmark latenza/costi con nostri use case
- [ ] Valutare implementazione custom vs framework

**Pattern utili anche senza framework:**
Il concetto di "context offloading + recursive decomposition" può essere implementato manualmente:

```python
# Pseudo-codice pattern RLM-like semplificato
def analyze_large_dataset(query, data):
    # 1. Chunking
    chunks = split_into_chunks(data, size=1000)

    # 2. Map: ogni chunk processato da sub-LLM
    partial_results = [llm.analyze(query, chunk) for chunk in chunks]

    # 3. Reduce: root LLM aggrega
    return llm.synthesize(query, partial_results)
```

#### Riferimenti

- **Full repo:** https://github.com/alexzhang13/rlm (868 stars)
- **Minimal (~100 righe):** https://github.com/alexzhang13/rlm-minimal
- **Paper:** https://arxiv.org/abs/2512.24601v1
- **Blog:** https://alexzhang13.github.io/blog/2025/rlm/

#### Note Claude (2026-01-11)

> RLM risolve un problema reale: context rot su contesti enormi. I benchmark sono impressionanti.
> Per GUDBRO oggi non serve - SQL fa il lavoro pesante e l'LLM riceve solo risultati filtrati.
> Diventa interessante quando: (1) AI-ZONE-INTEL scala a migliaia di clienti, (2) serve reasoning
> cross-merchant aggregato, (3) conversazioni Co-Manager diventano molto lunghe.
> Il pattern "chunk + map + reduce con sub-LLM" è utile anche senza il framework completo.

---
