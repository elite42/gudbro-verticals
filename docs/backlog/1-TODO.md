# 📋 TODO

> Task da fare, ordinate per priorità.
> Quando inizi una task → spostala in `2-IN-PROGRESS.md`

**Last Updated:** 2026-01-10

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

| ID                   | Feature                 | Descrizione                       | Area           | Effort     | Note                                                        |
| -------------------- | ----------------------- | --------------------------------- | -------------- | ---------- | ----------------------------------------------------------- |
| AI-ZONE-INTEL        | Zone & Customer Intel   | AI conosce zona + pattern clienti | AI/Analytics   | High       | **KILLER FEATURE** - vedi spec sotto                        |
| ING-TRANSLATIONS-ALL | Traduzioni Ingredienti  | 2551 ing × 14 lingue              | Database       | High       | **IN PROGRESS** → vedi `2-IN-PROGRESS.md` per dettagli      |
| ~~SEC-CLEANUP~~      | ~~Security Cleanup~~    | ~~37 functions + 65 RLS~~         | ~~Database~~   | ~~Medium~~ | **COMPLETATO** 2026-01-07 → vedi `docs/SEC-CLEANUP-PLAN.md` |
| ~~MT-NOTIF-SOUNDS~~  | ~~Notification Sounds~~ | ~~Sound selection per notifica~~  | ~~Backoffice~~ | ~~Low~~    | **COMPLETATO** 2026-01-05                                   |
| ~~GB-SPORTS-EVENTS~~ | ~~Sports Bar Calendar~~ | ~~25+ sport, broadcast~~          | ~~Backoffice~~ | ~~Medium~~ | **Incluso in SCHEDULE-SYSTEM** (vedi docs/features/)        |

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
