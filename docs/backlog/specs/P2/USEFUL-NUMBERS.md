# USEFUL-NUMBERS - Numeri Utili in PWA

> **ID:** USEFUL-NUMBERS
> **Priorità:** P2
> **Effort:** Medium (3-4 days)
> **Status:** In Progress

---

## Problema

I turisti in vacanza fanno fatica a trovare:
- Numeri emergenza del paese (112? 911? 999?)
- Servizi locali (taxi, farmacia, ospedale)
- Info pratiche (prefisso, fuso orario)

## Soluzione

Sezione "Numeri Utili" nella PWA con modello dati a 3 livelli:

| Livello | Gestito da | Esempio | Editabile da Merchant |
|---------|------------|---------|----------------------|
| **Paese** | GUDBRO (seed) | 112, 113, 118 | No |
| **Citta** | GUDBRO (quando apriamo) | Taxi Roma, Ospedale S.Camillo | No (puo segnalare errori) |
| **Locale** | Merchant | Farmacia vicina, taxi zona | Si |

---

## User Stories

### Turista
```
Come turista in un paese straniero
Voglio trovare rapidamente i numeri di emergenza e servizi locali
Per poter chiamare aiuto o servizi senza cercare su Google
```

### Merchant
```
Come merchant
Voglio vedere i numeri utili della mia citta gia precompilati
E poter aggiungere numeri specifici della mia zona
```

### GUDBRO Operations
```
Come team GUDBRO
Quando apriamo una nuova citta
Voglio precaricare i numeri utili principali
Cosi tutti i merchant di quella citta ne beneficiano
```

---

## Modello Dati a 3 Livelli

### Livello 1: Paese (Emergency Numbers)

Numeri emergenza per paese. Seed data gestito da GUDBRO, non editabile.

```sql
CREATE TABLE emergency_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT NOT NULL,           -- 'IT', 'ES', 'US', 'DE'
  service_type TEXT NOT NULL,           -- 'general', 'police', 'ambulance', 'fire'
  phone_number TEXT NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(country_code, service_type)
);

-- Seed examples
INSERT INTO emergency_numbers (country_code, service_type, phone_number) VALUES
-- Italia
('IT', 'general', '112'),
('IT', 'police', '113'),
('IT', 'ambulance', '118'),
('IT', 'fire', '115'),
-- EU Standard
('EU', 'general', '112'),
-- Altri paesi
('US', 'general', '911'),
('UK', 'general', '999'),
('DE', 'general', '112'),
('ES', 'general', '112'),
('FR', 'general', '112');
```

### Livello 2: Citta (City Useful Numbers)

Numeri utili per citta. Gestito da GUDBRO quando apriamo nuovi mercati.

```sql
CREATE TABLE city_useful_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Location
  country_code TEXT NOT NULL,           -- 'IT'
  city_name TEXT NOT NULL,              -- 'Roma', 'Milano'

  -- Content
  label TEXT NOT NULL,                  -- 'Taxi Roma - Radiotaxi 3570'
  phone_number TEXT NOT NULL,           -- '+39 06 3570'
  category TEXT NOT NULL DEFAULT 'other', -- 'taxi', 'pharmacy', 'hospital', 'police_local', 'other'

  -- Display
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_city_useful_numbers_location ON city_useful_numbers(country_code, city_name);
```

### Livello 3: Locale (Merchant Useful Numbers)

Numeri specifici del merchant. Gestito dal merchant stesso.

```sql
CREATE TABLE merchant_useful_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Content
  label TEXT NOT NULL,                  -- 'Farmacia sotto il locale'
  phone_number TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',

  -- Display
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_merchant_useful_numbers_merchant ON merchant_useful_numbers(merchant_id);
```

### Tabella: Error Reports

Per segnalazioni errori dai merchant sui dati citta.

```sql
CREATE TABLE useful_numbers_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Chi segnala
  merchant_id UUID NOT NULL REFERENCES merchants(id),
  reported_by UUID NOT NULL REFERENCES accounts(id),

  -- Cosa segnala
  reference_type TEXT NOT NULL,         -- 'city' o 'emergency'
  reference_id UUID NOT NULL,           -- ID del record segnalato

  -- Dettagli
  report_type TEXT NOT NULL,            -- 'wrong_number', 'outdated', 'closed', 'other'
  description TEXT,
  suggested_fix TEXT,                   -- Nuovo numero suggerito

  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'reviewed', 'fixed', 'rejected'
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,                     -- Nome admin GUDBRO

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Flusso Operativo

### Quando GUDBRO Apre una Nuova Citta

```
1. Inserire in city_useful_numbers:
   - Taxi principale (es. Radiotaxi 3570 per Roma)
   - Ospedale/i principale/i
   - Guardia medica
   - Farmacia di turno (se servizio centralizzato)
   - Polizia locale / Vigili urbani

2. I merchant di quella citta vedono automaticamente questi numeri
```

### Quando Merchant Si Iscrive

```
1. Sistema rileva citta dal suo indirizzo
2. Mostra automaticamente:
   - Emergency numbers del paese
   - City numbers della sua citta
3. Merchant puo aggiungere numeri locali specifici
```

### Quando Merchant Trova Errore

```
1. Nella pagina Numeri Utili vede bottone "Segnala errore"
2. Compila form: tipo errore + descrizione + suggerimento
3. Noi riceviamo notifica
4. Correggiamo → tutti i merchant della citta vedono fix
```

---

## UI Design

### PWA - Sezione Numeri Utili

```
┌─────────────────────────────────────┐
│  Numeri Utili                    ⓘ │
├─────────────────────────────────────┤
│                                     │
│  🚨 EMERGENZE                       │
│  ┌─────────────────────────────────┐│
│  │ Emergenza Generale    📞 112   ││
│  │ Polizia               📞 113   ││
│  │ Ambulanza             📞 118   ││
│  │ Vigili del Fuoco      📞 115   ││
│  └─────────────────────────────────┘│
│                                     │
│  🏙️ ROMA                            │
│  ┌─────────────────────────────────┐│
│  │ 🚕 Radiotaxi 3570     📞 06... ││
│  │ 🏥 Ospedale S.Camillo 📞 06... ││
│  │ 💊 Farmacia di Turno  📞 800...││
│  └─────────────────────────────────┘│
│                                     │
│  📍 ZONA TRASTEVERE (dal locale)    │
│  ┌─────────────────────────────────┐│
│  │ 💊 Farmacia Centrale  📞 06... ││
│  │ 🚕 Taxi Privato       📞 333...││
│  └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘
```

### Backoffice - Gestione Numeri

```
┌─────────────────────────────────────────────────────┐
│  Numeri Utili                                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ━━━ EMERGENZE ITALIA (non modificabili) ━━━       │
│  ┌─────────────────────────────────────────────────┐│
│  │ Emergenza Generale  112                         ││
│  │ Polizia             113                         ││
│  │ Ambulanza           118                         ││
│  │ Vigili del Fuoco    115                         ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  ━━━ ROMA (gestiti da GUDBRO) ━━━    [Segnala err] │
│  ┌─────────────────────────────────────────────────┐│
│  │ Radiotaxi 3570      +39 06 3570                 ││
│  │ Ospedale S.Camillo  +39 06 58701               ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  ━━━ I TUOI NUMERI ━━━                  + Aggiungi │
│  ┌─────────────────────────────────────────────────┐│
│  │ Farmacia Centrale   +39 06 123...    ✏️ 🗑️     ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Implementazione

### Phase 1: Database + Seed (Day 1)
- [ ] Migration: 3 tabelle principali + reports
- [ ] Seed: emergency_numbers per paesi EU principali
- [ ] Seed: city_useful_numbers per Roma (prima citta test)
- [ ] RLS policies

### Phase 2: API Routes (Day 1)
- [ ] GET /api/useful-numbers (aggregato per PWA)
- [ ] CRUD /api/settings/useful-numbers (merchant)
- [ ] POST /api/useful-numbers/report (segnalazioni)

### Phase 3: Backoffice UI (Day 2)
- [ ] Pagina Settings → Numeri Utili
- [ ] Vista 3 sezioni (emergenze, citta, locali)
- [ ] CRUD per numeri merchant
- [ ] Modal segnalazione errori

### Phase 4: PWA UI (Day 2-3)
- [ ] Sezione in menu/info PWA
- [ ] Tap-to-call functionality
- [ ] Traduzione automatica labels
- [ ] Raggruppamento visivo per livello

### Phase 5: Traduzioni (Day 3)
- [ ] Labels service_type (Ambulanza, Polizia, etc.)
- [ ] Labels category (Taxi, Farmacia, etc.)
- [ ] Auto-traduzione label merchant via AI

---

## Categorie Supportate

```typescript
type UsefulNumberCategory =
  | 'taxi'
  | 'pharmacy'
  | 'hospital'
  | 'police_local'
  | 'medical_guard'  // Guardia medica
  | 'embassy'
  | 'tourist_info'
  | 'other';
```

---

## Seed Data Iniziale

### Emergency Numbers (Paesi EU + Principali)

| Paese | Generale | Polizia | Ambulanza | Vigili |
|-------|----------|---------|-----------|--------|
| IT | 112 | 113 | 118 | 115 |
| DE | 112 | 110 | 112 | 112 |
| FR | 112 | 17 | 15 | 18 |
| ES | 112 | 091 | 061 | 080 |
| UK | 999 | 999 | 999 | 999 |
| US | 911 | 911 | 911 | 911 |

### Roma (Prima Citta)

| Categoria | Nome | Numero |
|-----------|------|--------|
| taxi | Radiotaxi 3570 | +39 06 3570 |
| taxi | Samarcanda | +39 06 5551 |
| hospital | Policlinico Umberto I | +39 06 49971 |
| hospital | Ospedale San Camillo | +39 06 58701 |
| medical_guard | Guardia Medica Roma | +39 06 570600 |
| tourist_info | Turismo Roma | +39 06 0608 |

---

## Edge Cases

| Caso | Soluzione |
|------|-----------|
| Merchant in citta senza dati | Mostra solo emergenze paese |
| Paese senza dati emergenza | Fallback a 112 (EU standard) |
| Numero non valido | Validazione formato E.164 |
| PWA offline | Cache numeri in service worker |
| Merchant cambia citta | Refresh automatico city numbers |

---

## Metriche Successo

- [ ] 100% citta aperte hanno numeri precaricati
- [ ] 50%+ merchant aggiungono almeno 1 numero locale
- [ ] < 24h tempo risposta segnalazioni errori
- [ ] Tap-to-call rate > 5% visitatori sezione

---

## Note

**Valore differenziante:** Nessun competitor offre questa feature. Crea stickiness - il turista tiene la PWA installata anche dopo aver lasciato il locale.

**Scalabilita:** Quando apriamo nuova citta, 15 minuti di data entry → tutti i merchant ne beneficiano.
