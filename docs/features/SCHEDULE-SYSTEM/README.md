# SCHEDULE-SYSTEM: Sistema Orari, Eventi & Prenotazioni

> **Status:** PLANNING
> **Created:** 2026-01-03
> **Task ID:** MT-OPENING-HOURS (esteso)

---

## 1. Overview

Sistema unificato per la gestione di:

- **Orari di apertura** (base settimanale)
- **Override orari** (festivi, stagionali, speciali)
- **Eventi** (con impatto su orari e menu)
- **Vista calendario** (stile Google Calendar)
- **Prenotazioni** (tavoli, eventi, servizi) - _predisposizione futura_

### User Stories

1. Come **gestore**, voglio impostare gli orari di apertura settimanali per ogni location
2. Come **gestore**, voglio aggiungere chiusure per festività (es. Natale, Capodanno)
3. Come **gestore**, voglio creare orari stagionali (es. orario estivo)
4. Come **gestore**, voglio che gli eventi modifichino automaticamente gli orari
5. Come **gestore**, voglio vedere tutto in un calendario unificato
6. Come **cliente PWA**, voglio vedere se il locale è aperto/chiuso in tempo reale
7. Come **gestore**, voglio gestire tavoli/aree e la loro capacità _(futuro)_
8. Come **cliente**, voglio prenotare un tavolo per data/ora/persone _(futuro)_
9. Come **gestore**, voglio vedere prenotazioni nel calendario _(futuro)_

---

## 2. Architettura Proposta

### 2.1 Entità e Relazioni

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              LOCATION                                    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ operating_hours (JSONB) - Orari base settimanali                 │    │
│  │ {                                                                 │    │
│  │   "mon": {"open": "09:00", "close": "22:00"},                    │    │
│  │   "tue": {"open": "09:00", "close": "22:00"},                    │    │
│  │   ...                                                             │    │
│  │   "sun": null  // chiuso                                          │    │
│  │ }                                                                 │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│         │                              │                                 │
│         │ 1:N                          │ 1:N                             │
│         ▼                              ▼                                 │
│  ┌──────────────────────┐    ┌─────────────────────────────────────┐    │
│  │ SEATING_AREAS        │    │ SCHEDULE_OVERRIDES                  │    │
│  │ (Risorse prenotabili)│    │ - Festività (Natale, Pasqua, etc.) │    │
│  │ - Sala principale    │    │ - Orari stagionali (estate)        │    │
│  │ - Terrazza           │    │ - Chiusure (ferie, ristrutturaz.)  │    │
│  │ - Bar                │    │ - Override generati da Eventi       │    │
│  │ - Private room       │    └─────────────────────────────────────┘    │
│  └──────────────────────┘                   │                            │
│         │                                   │ N:1 (opzionale)            │
│         │ 1:N                               ▼                            │
│         ▼                    ┌─────────────────────────────────────┐    │
│  ┌──────────────────────┐    │ EVENTS                              │    │
│  │ TABLES               │    │ - Live music, Happy hour, etc.     │    │
│  │ - Table 1 (4 posti)  │    │ - Può generare override automatici │    │
│  │ - Table 2 (2 posti)  │    │ - Impatta menu, capacità, promo    │    │
│  │ - Table 3 (6 posti)  │    │ - Può richiedere prenotazione      │    │
│  │ - ...                │    └─────────────────────────────────────┘    │
│  └──────────────────────┘                   │                            │
│         │                                   │                            │
│         │ N:1                               │ 1:N                        │
│         ▼                                   ▼                            │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ RESERVATIONS                                                      │   │
│  │ - Prenotazione tavolo (date, time, party_size, table_id)         │   │
│  │ - Prenotazione evento (event_id, tickets)                        │   │
│  │ - Stato: pending → confirmed → seated → completed / no_show      │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘

DIPENDENZE:
  Reservations → dipende da → Operating Hours (slot disponibili)
  Reservations → dipende da → Schedule Overrides (chiusure)
  Reservations → dipende da → Events (capacità ridotta, reservation_only)
  Reservations → dipende da → Tables/Areas (disponibilità fisica)
```

### 2.2 Database Schema

#### Tabella: `schedule_overrides`

```sql
CREATE TABLE schedule_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Tipo e identificazione
  override_type TEXT NOT NULL CHECK (override_type IN (
    'holiday',      -- Festività (Natale, Pasqua, etc.)
    'seasonal',     -- Orari stagionali (estate, inverno)
    'closure',      -- Chiusura temporanea (ferie, ristrutturazione)
    'special',      -- Orario speciale one-time
    'event'         -- Generato da un evento
  )),
  name TEXT NOT NULL,                    -- "Christmas Day", "Summer Hours", etc.
  description TEXT,

  -- Date range
  date_start DATE NOT NULL,
  date_end DATE,                         -- NULL = single day

  -- Ricorrenza
  recurrence TEXT DEFAULT 'none' CHECK (recurrence IN (
    'none',         -- Una tantum
    'yearly',       -- Ogni anno (es. Natale)
    'weekly',       -- Ogni settimana (es. chiuso lunedì)
    'monthly'       -- Ogni mese (es. primo lunedì del mese)
  )),
  recurrence_end_date DATE,              -- Quando termina la ricorrenza

  -- Orari modificati
  is_closed BOOLEAN DEFAULT false,       -- Se true, locale chiuso
  hours JSONB,                           -- {open: "10:00", close: "18:00"} o multi-slot
  -- Esempio multi-slot: [{open: "09:00", close: "12:00"}, {open: "15:00", close: "22:00"}]

  -- Priorità (per conflitti)
  priority INTEGER DEFAULT 10,           -- Higher = takes precedence
  -- Default priorities: base=0, seasonal=10, holiday=20, event=30, closure=40

  -- Link opzionale a evento
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,

  -- Metadata
  color TEXT,                            -- Colore per calendario (#FF5733)
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES accounts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici
CREATE INDEX idx_schedule_overrides_location ON schedule_overrides(location_id);
CREATE INDEX idx_schedule_overrides_dates ON schedule_overrides(date_start, date_end);
CREATE INDEX idx_schedule_overrides_type ON schedule_overrides(override_type);
```

#### Tabella: `events` (persistenza eventi esistenti)

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,              -- 'live_music', 'happy_hour', etc.
  event_category TEXT NOT NULL,          -- 'entertainment', 'food', 'promo', etc.
  status TEXT DEFAULT 'draft' CHECK (status IN (
    'draft', 'published', 'cancelled', 'completed'
  )),

  -- Timing
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone TEXT,

  -- Recurrence
  recurrence TEXT DEFAULT 'none',
  recurrence_days INTEGER[],             -- [1,3,5] for Mon,Wed,Fri
  recurrence_end_date DATE,

  -- Venue Impact
  venue_status TEXT DEFAULT 'open' CHECK (venue_status IN (
    'open', 'partial', 'reservation_only', 'members_only', 'closed'
  )),
  affected_areas TEXT[],
  reduced_capacity INTEGER,

  -- Hours Override (genera schedule_override automaticamente)
  hours_override JSONB,                  -- {open: "18:00", close: "02:00"}
  auto_create_schedule_override BOOLEAN DEFAULT true,

  -- Menu Impact
  menu_impact JSONB,                     -- {useSpecialMenu, disabledCategories, etc.}

  -- Access
  requires_reservation BOOLEAN DEFAULT false,
  entrance_fee DECIMAL(10,2),
  max_capacity INTEGER,

  -- Loyalty
  loyalty_bonus JSONB,                   -- {enabled, pointsMultiplier, bonusPoints}

  -- Performer/Sports
  performer JSONB,
  sports_info JSONB,

  -- Promotions (array of promotion objects)
  promotions JSONB,

  -- Visual
  image_url TEXT,
  color TEXT,
  tags TEXT[],

  -- Metadata
  created_by UUID REFERENCES accounts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici
CREATE INDEX idx_events_location ON events(location_id);
CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_type ON events(event_type);
```

#### Tabella: `seating_areas` (Predisposizione Prenotazioni)

```sql
CREATE TABLE seating_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  name TEXT NOT NULL,                    -- "Sala Principale", "Terrazza", "Bar"
  slug TEXT NOT NULL,
  description TEXT,

  -- Capacità
  total_capacity INTEGER NOT NULL,       -- Posti totali nell'area
  min_party_size INTEGER DEFAULT 1,      -- Min persone per prenotazione
  max_party_size INTEGER,                -- Max persone per prenotazione

  -- Disponibilità
  is_reservable BOOLEAN DEFAULT true,    -- Accetta prenotazioni?
  requires_deposit BOOLEAN DEFAULT false,
  deposit_amount DECIMAL(10,2),

  -- Orari specifici area (override location hours)
  operating_hours JSONB,                 -- Se diversi da location

  -- Caratteristiche
  is_outdoor BOOLEAN DEFAULT false,
  is_smoking BOOLEAN DEFAULT false,
  is_accessible BOOLEAN DEFAULT true,    -- Accessibilità disabili
  amenities TEXT[],                      -- ['wifi', 'power_outlets', 'tv', 'privacy']

  -- Visual
  floor_plan_position JSONB,             -- {x, y, width, height} per mappa
  image_url TEXT,

  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(location_id, slug)
);
```

#### Tabella: `tables` (Predisposizione Prenotazioni)

```sql
CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  seating_area_id UUID REFERENCES seating_areas(id) ON DELETE SET NULL,

  name TEXT NOT NULL,                    -- "Table 1", "A1", "Tavolo Romantico"
  table_number TEXT,                     -- "1", "A1", etc.

  -- Capacità
  min_capacity INTEGER DEFAULT 1,
  max_capacity INTEGER NOT NULL,         -- Posti massimi
  ideal_capacity INTEGER,                -- Posti ideali (per ottimizzazione)

  -- Caratteristiche
  table_type TEXT DEFAULT 'standard' CHECK (table_type IN (
    'standard', 'booth', 'bar', 'counter', 'private', 'outdoor', 'vip'
  )),
  is_combinable BOOLEAN DEFAULT false,   -- Può essere unito ad altri tavoli?
  combine_with UUID[],                   -- IDs tavoli combinabili

  -- Visual (per floor plan)
  shape TEXT DEFAULT 'rectangle' CHECK (shape IN (
    'rectangle', 'square', 'round', 'oval'
  )),
  floor_plan_position JSONB,             -- {x, y, width, height, rotation}

  -- Status
  status TEXT DEFAULT 'available' CHECK (status IN (
    'available', 'occupied', 'reserved', 'blocked', 'maintenance'
  )),

  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tables_location ON tables(location_id);
CREATE INDEX idx_tables_area ON tables(seating_area_id);
CREATE INDEX idx_tables_status ON tables(status);
```

#### Tabella: `reservations` (Predisposizione Prenotazioni)

```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Tipo prenotazione
  reservation_type TEXT NOT NULL CHECK (reservation_type IN (
    'table',        -- Prenotazione tavolo standard
    'event',        -- Prenotazione per evento specifico
    'service',      -- Prenotazione servizio (es. chef's table, degustazione)
    'private'       -- Evento privato (affitto sala)
  )),

  -- Link a risorse
  table_id UUID REFERENCES tables(id) ON DELETE SET NULL,
  seating_area_id UUID REFERENCES seating_areas(id) ON DELETE SET NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,

  -- Quando
  reservation_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,                         -- Calcolato o specificato
  duration_minutes INTEGER DEFAULT 90,   -- Durata standard

  -- Chi
  party_size INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  customer_id UUID,                      -- Link a customer se registrato

  -- Stato
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',      -- In attesa conferma
    'confirmed',    -- Confermata
    'waitlist',     -- Lista d'attesa
    'seated',       -- Cliente arrivato e seduto
    'completed',    -- Conclusa
    'cancelled',    -- Cancellata dal cliente
    'no_show'       -- Cliente non presentato
  )),

  -- Dettagli
  special_requests TEXT,                 -- Richieste speciali
  occasion TEXT,                         -- 'birthday', 'anniversary', 'business', etc.
  internal_notes TEXT,                   -- Note interne staff
  tags TEXT[],                           -- ['vip', 'allergie', 'highchair']

  -- Conferma
  confirmation_code TEXT UNIQUE,         -- "RES-ABC123"
  confirmed_at TIMESTAMPTZ,
  confirmed_by UUID,

  -- Pagamento (se richiesto deposito)
  deposit_required DECIMAL(10,2),
  deposit_paid DECIMAL(10,2),
  deposit_paid_at TIMESTAMPTZ,
  payment_method TEXT,

  -- Tracking
  source TEXT DEFAULT 'manual' CHECK (source IN (
    'manual',       -- Inserita manualmente
    'website',      -- Dal sito web
    'pwa',          -- Dalla PWA cliente
    'phone',        -- Telefonica
    'walkin',       -- Walk-in convertito
    'third_party'   -- Google, TheFork, etc.
  )),
  third_party_ref TEXT,                  -- Reference da sistema esterno

  -- Reminder
  reminder_sent_at TIMESTAMPTZ,
  feedback_requested_at TIMESTAMPTZ,

  created_by UUID REFERENCES accounts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per performance
CREATE INDEX idx_reservations_location_date ON reservations(location_id, reservation_date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_table ON reservations(table_id);
CREATE INDEX idx_reservations_customer ON reservations(customer_email);
CREATE INDEX idx_reservations_confirmation ON reservations(confirmation_code);

-- Vincolo: no overlap per stesso tavolo
-- (implementato via trigger o application logic)
```

#### Tabella: `reservation_time_slots` (Configurazione Slot)

```sql
CREATE TABLE reservation_time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Quando applicare questi slot
  day_of_week INTEGER,                   -- 0-6, NULL = tutti i giorni
  date_start DATE,                       -- Per slot stagionali
  date_end DATE,

  -- Configurazione slot
  slot_start TIME NOT NULL,              -- Es. 12:00
  slot_end TIME NOT NULL,                -- Es. 14:30
  slot_duration_minutes INTEGER DEFAULT 90,
  slot_interval_minutes INTEGER DEFAULT 15,  -- Ogni quanto uno slot

  -- Capacità per slot
  max_reservations INTEGER,              -- Max prenotazioni per slot
  max_covers INTEGER,                    -- Max persone per slot

  -- Tipo pasto
  meal_type TEXT CHECK (meal_type IN (
    'breakfast', 'brunch', 'lunch', 'afternoon', 'dinner', 'late_night'
  )),

  -- Booking rules
  min_advance_hours INTEGER DEFAULT 2,   -- Min ore anticipo prenotazione
  max_advance_days INTEGER DEFAULT 30,   -- Max giorni anticipo
  auto_confirm BOOLEAN DEFAULT false,    -- Conferma automatica?

  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.3 Logica di Priorità

Quando si calcola l'orario effettivo per un giorno specifico:

```
1. Parti dagli orari base (locations.operating_hours) - priority 0
2. Applica override stagionali attivi - priority 10
3. Applica override festività - priority 20
4. Applica override eventi - priority 30
5. Applica chiusure forzate - priority 40

Il valore con priorità più alta vince.
```

### 2.4 Funzione SQL: `get_location_hours`

```sql
CREATE OR REPLACE FUNCTION get_location_hours(
  p_location_id UUID,
  p_date DATE
) RETURNS JSONB AS $$
DECLARE
  v_base_hours JSONB;
  v_day_of_week TEXT;
  v_override RECORD;
  v_result JSONB;
BEGIN
  -- Get base hours for day of week
  SELECT operating_hours INTO v_base_hours FROM locations WHERE id = p_location_id;
  v_day_of_week := LOWER(TO_CHAR(p_date, 'Dy'));
  v_result := v_base_hours -> v_day_of_week;

  -- Check for overrides (ordered by priority DESC)
  FOR v_override IN
    SELECT * FROM schedule_overrides
    WHERE location_id = p_location_id
      AND is_active = true
      AND date_start <= p_date
      AND (date_end IS NULL OR date_end >= p_date)
      -- TODO: Handle recurrence logic
    ORDER BY priority DESC
    LIMIT 1
  LOOP
    IF v_override.is_closed THEN
      RETURN jsonb_build_object('is_closed', true, 'reason', v_override.name);
    ELSIF v_override.hours IS NOT NULL THEN
      RETURN v_override.hours || jsonb_build_object('override', v_override.name);
    END IF;
  END LOOP;

  RETURN COALESCE(v_result, jsonb_build_object('is_closed', true));
END;
$$ LANGUAGE plpgsql;
```

---

## 3. UI Components

### 3.1 Vista Calendario (Stile Google Calendar)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ◀ Gennaio 2026 ▶                    [Giorno] [Settimana] [Mese]   │
├─────────────────────────────────────────────────────────────────────┤
│  Lun    Mar    Mer    Gio    Ven    Sab    Dom                     │
├─────────────────────────────────────────────────────────────────────┤
│                              1       2       3       4              │
│                           ┌─────┐ ┌─────┐                          │
│                           │CAPOD│ │     │  Orario: 10-18           │
│                           │ANNO │ │     │                          │
│                           │CHIUS│ │     │                          │
│                           └─────┘ └─────┘                          │
├─────────────────────────────────────────────────────────────────────┤
│   5       6       7       8       9      10      11                │
│ ┌─────┐                         ┌─────┐                            │
│ │CHIUS│  09-22   09-22   09-22  │LIVE │  09-22   CHIUSO            │
│ │ LUN │                         │MUSIC│                            │
│ └─────┘                         │18-23│                            │
│                                 └─────┘                            │
├─────────────────────────────────────────────────────────────────────┤
│  ...                                                                │
└─────────────────────────────────────────────────────────────────────┘

LEGENDA:
  ██ Verde     = Aperto (orari normali)
  ██ Blu       = Evento
  ██ Arancione = Orario modificato
  ██ Rosso     = Chiuso
  ██ Viola     = Festività
```

### 3.2 Componenti UI Necessari

| Componente             | Descrizione                          | Priorità |
| ---------------------- | ------------------------------------ | -------- |
| `CalendarView`         | Vista calendario mensile/settimanale | P0       |
| `OperatingHoursEditor` | Editor orari base 7 giorni           | P0       |
| `TimeSlotPicker`       | Selettore orario con multi-slot      | P0       |
| `OverrideModal`        | Modal per creare/editare override    | P0       |
| `EventQuickView`       | Popup preview evento nel calendario  | P1       |
| `ConflictResolver`     | UI per risolvere conflitti orari     | P1       |
| `HolidayPresets`       | Template festività per paese         | P2       |
| `SeasonalTemplates`    | Template orari stagionali            | P2       |

### 3.3 Page Structure

```
/settings/schedule/
├── index.tsx              # Redirect to calendar
├── calendar/
│   └── page.tsx           # Vista calendario principale
├── operating-hours/
│   └── page.tsx           # Editor orari base
├── overrides/
│   ├── page.tsx           # Lista override
│   └── [id]/
│       └── page.tsx       # Edit singolo override
└── holidays/
    └── page.tsx           # Gestione festività
```

---

## 4. API Endpoints

### 4.1 Operating Hours

```
GET    /api/locations/:id/operating-hours
       → Ritorna orari base settimanali

PATCH  /api/locations/:id/operating-hours
       Body: { "mon": {"open": "09:00", "close": "22:00"}, ... }
       → Aggiorna orari base
```

### 4.2 Schedule Overrides

```
GET    /api/locations/:id/schedule-overrides
       Query: ?from=2026-01-01&to=2026-12-31&type=holiday
       → Lista override con filtri

POST   /api/locations/:id/schedule-overrides
       Body: { override_type, name, date_start, date_end, hours, ... }
       → Crea nuovo override

PATCH  /api/schedule-overrides/:id
       → Aggiorna override esistente

DELETE /api/schedule-overrides/:id
       → Elimina override
```

### 4.3 Merged Schedule (computed)

```
GET    /api/locations/:id/schedule
       Query: ?from=2026-01-01&to=2026-01-31
       → Ritorna orari effettivi per ogni giorno del range
       → Include: orari base + override applicati + eventi

Response:
{
  "2026-01-01": {
    "is_open": false,
    "reason": "New Year's Day",
    "override_type": "holiday"
  },
  "2026-01-02": {
    "is_open": true,
    "hours": {"open": "09:00", "close": "22:00"},
    "events": [
      {"id": "...", "title": "Live Jazz", "start": "19:00", "end": "23:00"}
    ]
  },
  ...
}
```

### 4.4 Events (CRUD)

```
GET    /api/locations/:id/events
POST   /api/locations/:id/events
PATCH  /api/events/:id
DELETE /api/events/:id
```

---

## 5. Integrazione con Sistema Esistente

### 5.1 Eventi Esistenti (Marketing)

Il sistema eventi esistente in `/marketing/events/` attualmente:

- Ha UI completa con wizard 4-step
- Usa mock data in memoria
- Ha 29 tipi di eventi definiti

**Piano di migrazione:**

1. Creare tabella `events` in DB
2. Aggiornare page esistente per usare DB invece di mock
3. Aggiungere campo `hours_override` agli eventi
4. Auto-generare `schedule_override` quando evento viene pubblicato

### 5.2 PWA (Customer-facing)

La PWA deve poter:

1. Chiamare `GET /api/locations/:id/schedule?date=today`
2. Mostrare stato aperto/chiuso in tempo reale
3. Mostrare prossimo orario di apertura se chiuso
4. Listare eventi del giorno

### 5.3 Backoffice Dashboard

Aggiungere widget:

- "Prossime chiusure" (override imminenti)
- "Eventi questa settimana"
- Mini-calendario nella sidebar

---

## 6. Fasi di Implementazione

### Fase 1: Foundation (P0)

- [ ] Migration: `schedule_overrides` table
- [ ] Migration: `events` table (persistenza)
- [ ] API: Operating hours CRUD
- [ ] API: Schedule overrides CRUD
- [ ] UI: `OperatingHoursEditor` component
- [ ] UI: Basic override management

### Fase 2: Calendar View (P0)

- [ ] UI: `CalendarView` component (month view)
- [ ] UI: `TimeSlotPicker` component
- [ ] UI: `OverrideModal` component
- [ ] API: Merged schedule endpoint
- [ ] Integration: Link calendar to data

### Fase 3: Events Integration (P1)

- [ ] Migrate events page to use DB
- [ ] Auto-generate schedule overrides from events
- [ ] Show events in calendar view
- [ ] Conflict detection & resolution

### Fase 4: Advanced Features (P2)

- [ ] Holiday presets per country
- [ ] Seasonal templates
- [ ] Week view
- [ ] Day view with hourly slots
- [ ] Drag & drop for events
- [ ] PWA integration

---

## 7. Domande Aperte

1. **Multi-slot orari**: Supportiamo pausa pranzo (es. 09-12, 15-22)?
   - Proposta: Sì, `hours` può essere array di slot

2. **Timezone**: Come gestiamo fusi orari diversi?
   - Proposta: Location ha `timezone`, tutti gli orari sono locali

3. **Conflitti eventi**: Due eventi nello stesso slot?
   - Proposta: Warning ma permesso (venue può avere aree separate)

4. **Ricorrenza eventi**: Weekly happy hour?
   - Proposta: Supportato via `recurrence` field

5. **Notifiche**: Avvisare staff di chiusure imminenti?
   - Proposta: Fase futura (P3)

---

## 8. Mockup Riferimento

### MenuTiger Opening Hours (da copiare)

- 7 giorni con toggle ON/OFF
- Time picker per apertura/chiusura
- Multi-slot per pausa pranzo
- Preview orari in tempo reale

### Google Calendar (ispirazione)

- Vista mese/settimana/giorno
- Colori per tipo evento
- Click per creare evento
- Drag per spostare/ridimensionare
- Popup preview on hover

---

---

## 9. Research: Best Practices del Settore

> Ricerca effettuata su sistemi leader: OpenTable, TheFork, Resy, Tock, SevenRooms

### 9.1 Architettura Database (Industry Standard)

Secondo [GeeksforGeeks](https://www.geeksforgeeks.org/dbms/how-to-design-a-database-for-online-restaurant-reservation-and-food-delivery/) e [Back4App](https://www.back4app.com/tutorials/how-to-build-a-database-schema-for-a-restaurant-reservation-app):

**Tabelle Core:**

- User (bio, avatar, phone, preferences)
- Restaurant/Location (name, cuisine, image)
- Reservation (date, time, guests, status)
- Table (capacity, area, status)
- Review (comment, rating)

**Best Practices:**

- Ogni tabella DEVE avere Primary Key
- SQL/RDBMS per dati critici (ACID compliance)
- NoSQL opzionale per dati meno critici (ratings, analytics)
- Real-time sync tra prenotazioni, cucina, inventario

### 9.2 Features OpenTable & TheFork

Da [TheFork Manager](https://www.theforkmanager.com/en/) e [OpenTable](https://www.opentable.com/restaurant-solutions/):

**OpenTable Features:**

- Real-time reservation management
- Table planning & floor plans
- Shift planning & summaries
- Guest profiling & preferences
- Automated reservation reminders
- Optimize turn times
- 27M+ diners network
- POS integration

**TheFork Features:**

- Multi-channel booking integration
- Automated marketing tools
- Restaurant CRM
- Data-driven insights
- Credit card imprints
- SMS/Email confirmations
- Guest reliability scores
- YUMS loyalty program
- 20M+ monthly visitors

### 9.3 Gestione No-Show (Critico!)

Da [SevenRooms](https://sevenrooms.com/blog/restaurant-reservation-deposits/) e [RotaCloud](https://rotacloud.com/blog/prevent-restaurant-no-shows/):

**Statistiche:**

- Benchmark globale: 11% cancellazioni, 3.5% no-show
- Perdere 20% dei clienti attesi non è sostenibile
- Depositi riducono no-show da 15% a 1% (caso Farmstead)
- Reminder automatici riducono no-show del 30%

**Strategie Anti No-Show:**

| Strategia                   | Quando Applicare              | Efficacia   |
| --------------------------- | ----------------------------- | ----------- |
| **Deposito fisso**          | Gruppi 6+, weekend, festivi   | Alta        |
| **Credit card hold**        | Peak hours, eventi            | Alta        |
| **Reminder SMS/Email**      | Sempre, 24h e 2h prima        | Media       |
| **Guest reliability score** | Clienti ricorrenti            | Progressiva |
| **Ticketed reservations**   | Eventi speciali, tasting menu | Massima     |

**Deposit Amounts (US Market):**

- Media cancellation fee: $52
- Sweet spot: $5-$20 per persona
- Private dining: deposito più alto

**Deposit Policy Suggestions:**

```
Applicare depositi SOLO per:
├── Gruppi 6+ persone
├── Peak times (es. 19:00-21:00 weekend)
├── Festivi (Natale, Capodanno, San Valentino)
├── Private dining rooms
├── Eventi speciali
└── Clienti con storico no-show
```

### 9.4 Features Avanzate da Considerare

**Guest Reliability Score** (TheFork):

```sql
-- Campi da aggiungere a customers
reliability_score INTEGER DEFAULT 100,    -- 0-100
total_reservations INTEGER DEFAULT 0,
completed_reservations INTEGER DEFAULT 0,
no_shows INTEGER DEFAULT 0,
late_cancellations INTEGER DEFAULT 0,     -- < 24h

-- Score calculation
-- +1 per completed
-- -10 per no_show
-- -5 per late_cancellation
```

**Waitlist Management:**

```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY,
  location_id UUID,
  reservation_date DATE,
  start_time TIME,
  party_size INTEGER,
  customer_name TEXT,
  customer_phone TEXT,
  position INTEGER,              -- Posizione in coda
  notified_at TIMESTAMPTZ,       -- Quando notificato
  expires_at TIMESTAMPTZ,        -- Timeout per risposta
  status TEXT                    -- waiting, notified, converted, expired
);
```

**Table Turn Optimization:**

- Track tempo medio per party size
- Suggerisci slot ottimali
- Overbooking intelligente basato su storico

### 9.5 Integrazioni Critiche

Da [DevTechnoSys](https://devtechnosys.com/insights/develop-a-restaurant-booking-app-like-thefork/):

```
Essential Integrations:
├── POS System (sync ordini)
├── Payment Gateway (Stripe, PayPal)
├── SMS Provider (Twilio, MessageBird)
├── Email Service (SendGrid, Mailgun)
├── Google Business Profile (sync availability)
├── Review Platforms (TripAdvisor, Google)
├── Calendar (Google, Apple, Outlook)
└── Analytics (Google Analytics, Mixpanel)
```

### 9.6 Considerazioni UX

**Per il Cliente:**

- Booking in max 3 tap
- Mostra disponibilità real-time
- Conferma immediata (quando possibile)
- Reminder automatici
- Easy cancellation (ma con policy chiara)
- Loyalty rewards visibili

**Per il Gestore:**

- Dashboard real-time prenotazioni
- Floor plan interattivo
- Drag & drop per modifiche
- Alerts per overbooking
- Quick actions (confirm, cancel, move)
- Mobile-friendly per gestione on-the-go

### 9.7 Aggiornamenti allo Schema Proposto

Basato sulla ricerca, aggiungo questi campi:

**Alla tabella `reservations`:**

```sql
-- Anti No-Show
deposit_policy TEXT,                     -- 'none', 'fixed', 'per_person', 'percentage'
card_last_four TEXT,                     -- Per holds
card_expires_at DATE,

-- Guest Experience
dietary_restrictions TEXT[],             -- ['vegetarian', 'gluten_free', 'nut_allergy']
accessibility_needs TEXT[],              -- ['wheelchair', 'hearing_loop']
celebration_type TEXT,                   -- 'birthday', 'anniversary', etc.
celebration_message TEXT,                -- "Happy 50th birthday Maria!"

-- Operations
estimated_end_time TIME,
actual_seated_at TIMESTAMPTZ,
actual_left_at TIMESTAMPTZ,
turn_time_minutes INTEGER,               -- Calcolato: left - seated

-- Follow-up
review_requested BOOLEAN DEFAULT false,
review_submitted BOOLEAN DEFAULT false
```

**Nuova tabella `customer_profiles`:**

```sql
CREATE TABLE customer_profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  phone TEXT,
  name TEXT,

  -- Reliability
  reliability_score INTEGER DEFAULT 100,
  total_reservations INTEGER DEFAULT 0,
  completed_reservations INTEGER DEFAULT 0,
  no_shows INTEGER DEFAULT 0,
  late_cancellations INTEGER DEFAULT 0,

  -- Preferences
  preferred_seating TEXT[],              -- ['window', 'quiet', 'outdoor']
  dietary_restrictions TEXT[],
  favorite_items TEXT[],
  notes TEXT,                            -- Staff notes

  -- Loyalty
  loyalty_tier TEXT,
  loyalty_points INTEGER DEFAULT 0,
  total_spend DECIMAL(10,2) DEFAULT 0,

  -- Tags
  tags TEXT[],                           -- ['vip', 'blogger', 'difficult']

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 10. Fasi di Implementazione (Revisionate)

### Fase 1: Foundation - Schedule System (Corrente Task)

- [ ] Migration: `schedule_overrides` table
- [ ] Migration: `events` table (persistenza)
- [ ] API: Operating hours CRUD
- [ ] API: Schedule overrides CRUD
- [ ] UI: `OperatingHoursEditor` component
- [ ] UI: Basic override management

### Fase 2: Calendar View

- [ ] UI: `CalendarView` component (month/week/day)
- [ ] UI: `TimeSlotPicker` component
- [ ] UI: `OverrideModal` component
- [ ] API: Merged schedule endpoint
- [ ] Integration: Events in calendar

### Fase 3: Table & Area Management

- [ ] Migration: `seating_areas` table
- [ ] Migration: `tables` table
- [ ] UI: Floor plan editor (basic)
- [ ] UI: Table management CRUD
- [ ] API: Tables CRUD

### Fase 4: Reservations Core

- [ ] Migration: `reservations` table
- [ ] Migration: `customer_profiles` table
- [ ] API: Reservations CRUD
- [ ] API: Availability check
- [ ] UI: Reservation form
- [ ] UI: Reservations list/calendar view

### Fase 5: Anti No-Show Features

- [ ] Deposit system (Stripe integration)
- [ ] Credit card hold
- [ ] SMS/Email reminders (Twilio/SendGrid)
- [ ] Guest reliability score
- [ ] Cancellation policy enforcement

### Fase 6: Customer-Facing Booking

- [ ] PWA: Booking widget
- [ ] Website: Booking page
- [ ] Real-time availability
- [ ] Confirmation flow
- [ ] My reservations area

### Fase 7: Advanced Features

- [ ] Waitlist management
- [ ] Table turn optimization
- [ ] Google Business sync
- [ ] Review solicitation
- [ ] Analytics dashboard

---

## Sources

- [GeeksforGeeks - Database for Restaurant Reservation](https://www.geeksforgeeks.org/dbms/how-to-design-a-database-for-online-restaurant-reservation-and-food-delivery/)
- [Back4App - Restaurant Reservation Schema](https://www.back4app.com/tutorials/how-to-build-a-database-schema-for-a-restaurant-reservation-app)
- [TheFork Manager Features](https://www.theforkmanager.com/en/)
- [OpenTable Solutions](https://www.opentable.com/restaurant-solutions/)
- [SevenRooms - Restaurant Deposits](https://sevenrooms.com/blog/restaurant-reservation-deposits/)
- [RotaCloud - Prevent No-Shows](https://rotacloud.com/blog/prevent-restaurant-no-shows/)
- [DevTechnoSys - Build App Like TheFork](https://devtechnosys.com/insights/develop-a-restaurant-booking-app-like-thefork/)

---

## Changelog

| Data       | Autore | Modifiche                                                  |
| ---------- | ------ | ---------------------------------------------------------- |
| 2026-01-03 | Claude | Documento iniziale                                         |
| 2026-01-03 | Claude | Aggiunto sistema prenotazioni (predisposizione)            |
| 2026-01-03 | Claude | Aggiunta ricerca best practices (OpenTable, TheFork, etc.) |
