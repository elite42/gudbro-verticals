# ROOTS Coffeeshop - Feature Backlog

**Last Updated**: 2025-11-10
**Status**: Competitive features from market research

---

## TIER 1: In-Venue Operations (Competitive Features)

### Table-Specific Ordering - 8-10h
**Inspirato da**: POKÉ WOW (Sapo F&B)
**Priority**: HIGH (core restaurant feature)

- QR unico per ogni tavolo
- Auto-rilevamento tavolo/area da QR code
- Session persistence per tavolo
- Order history per sessione

**DB Schema**:
```sql
CREATE TABLE tables (
  id UUID PRIMARY KEY,
  table_number INTEGER,
  area_name TEXT,
  qr_code_url TEXT,
  status TEXT -- 'available', 'occupied', 'reserved'
);

CREATE TABLE table_sessions (
  id UUID PRIMARY KEY,
  table_id UUID REFERENCES tables(id),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  total_amount DECIMAL,
  status TEXT -- 'active', 'completed', 'cancelled'
);
```

**Endpoints**:
- `GET /api/tables/:tableId/session` - Get active session
- `POST /api/tables/:tableId/orders` - Place order for table
- `PATCH /api/tables/:tableId/session/close` - Close session

**Implementation Notes**:
- Integrate with existing cart system
- Add table context to order flow
- Update BottomNav to show table info when in-venue

---

### Call Staff Button - 2-3h
**Inspirato da**: POKÉ WOW
**Priority**: MEDIUM (convenience feature)

- Fixed button sempre visibile
- Rate limiting (1 richiesta ogni 2 minuti)
- Notification a staff dashboard/app
- Stato richiesta: pending → acknowledged → completed

**DB Schema**:
```sql
CREATE TABLE staff_calls (
  id UUID PRIMARY KEY,
  table_id UUID REFERENCES tables(id),
  call_type TEXT, -- 'assistance', 'payment', 'complaint'
  status TEXT,
  created_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);
```

**UI Component**:
- Floating action button (bottom-right)
- Modal per selezionare tipo richiesta
- Toast notification quando staff acknowledged

---

### Order Status Tracking - 6-8h
**Priority**: HIGH (customer experience)

- Real-time status updates via WebSocket/polling
- Stati: ordered → confirmed → preparing → ready → served
- Push notifications (optional)
- Estimated time display

**DB Schema**:
```sql
CREATE TABLE order_status_history (
  order_id UUID,
  status TEXT,
  changed_at TIMESTAMPTZ,
  notes TEXT
);
```

**Frontend**:
- Status timeline component
- Live updates senza refresh
- Estimated time countdown

---

## TIER 2: Kitchen Integration (Backend Heavy)

### POS/Kitchen Display Integration - 15-20h
**Priority**: HIGH (operational efficiency)

- API per inviare ordini a sistema cucina
- Webhook per status updates da POS
- Order grouping per tipo (cucina/bar)
- Printer integration (receipt/kitchen tickets)

**Integrazioni**:
- Sapo POS API (competitor locale)
- Generic REST webhook
- Print API (Epson/Star Micronics)

---

### Multi-Payment Support - 8-10h
**Priority**: MEDIUM

- Split bill per persona
- Split bill custom amounts
- Group payment coordination
- Payment confirmation flow

**DB Schema**:
```sql
CREATE TABLE payment_splits (
  session_id UUID,
  user_id UUID,
  amount DECIMAL,
  paid_at TIMESTAMPTZ,
  payment_method TEXT
);
```

---

## TIER 3: Admin Dashboard (Backoffice)

### Live Orders Dashboard - 10-12h
**Priority**: HIGH

- Real-time order queue
- Table status overview
- Quick order management
- Kitchen view vs Service view

**Features**:
- Drag-drop order prioritization
- Bulk status updates
- Order search/filter
- Print queue management

---

### Table Management UI - 6-8h
**Priority**: MEDIUM

- Visual table layout editor
- Table status management
- Session history per table
- QR code generation/regeneration

---

## TIER 4: Customer Experience Enhancements

### Order History (Registered Users) - 4-5h
**Priority**: MEDIUM

- View past orders
- Re-order favoriti
- Receipt download
- Spending analytics

---

### Wait Time Estimates - 5-7h
**Priority**: LOW

- ML-based preparation time prediction
- Historical data analysis
- Display estimated wait on menu items
- Update estimates based on kitchen load

---

## Implementation Priority

**Phase 1 (MVP Restaurant)**: 25-33h
1. Table-Specific Ordering (8-10h)
2. Order Status Tracking (6-8h)
3. POS Integration (15-20h)

**Phase 2 (Operations)**: 18-23h
1. Call Staff Button (2-3h)
2. Live Orders Dashboard (10-12h)
3. Table Management UI (6-8h)

**Phase 3 (Advanced)**: 17-22h
1. Multi-Payment Support (8-10h)
2. Order History (4-5h)
3. Wait Time Estimates (5-7h)

---

## Notes

Questi sono features competitive identificati dall'analisi di POKÉ WOW (Sapo F&B).
Il focus è su **operational efficiency** per ristoranti con servizio al tavolo.

**Differenziazione ROOTS**:
- Manteniamo Engagement Hub (unico nel mercato)
- WiFi Quick Connect (value-add immediato)
- Frictionless UX (browse-first approach)
- Dietary preferences (allergen awareness)

**Strategic Position**:
Competitor = Operations-first
ROOTS = Experience-first + Operations

Il nostro valore unico è nel **customer engagement** e **brand storytelling**,
con operations come feature aggiuntiva, non core.
