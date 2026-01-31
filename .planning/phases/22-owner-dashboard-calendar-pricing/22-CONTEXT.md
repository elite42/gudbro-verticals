# Phase 22: Owner Dashboard - Calendar & Pricing - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Owners can visually manage room availability and configure flexible pricing strategies from the backoffice dashboard. This includes a monthly calendar view with color-coded statuses, date blocking/unblocking, base price per room, seasonal price overrides for date ranges, and weekly/monthly discount configuration.

NOT in scope: dynamic/algorithmic pricing, channel sync, revenue management analytics (Phase 24), service ordering (Phase 23).

</domain>

<decisions>
## Implementation Decisions

### Visualizzazione Calendario

- **Monthly grid view**, navigabile mese per mese con frecce avanti/indietro
- **Color coding**: booked = blu/indigo, available = bianco/verde chiaro, blocked = grigio con pattern tratteggiato, today = bordo accent
- **Desktop**: mostra 1 mese con sidebar per dettagli/azioni; **Mobile**: 1 mese full-width, dettagli sotto
- **Room filter**: dropdown per filtrare per stanza specifica o "Tutte le stanze" (vista aggregata)
- **Legenda colori** visibile sotto il calendario
- Riusa `react-day-picker` + `date-fns` (stessa libreria del BookingCalendar guest-facing, Phase 19)
- Ogni cella mostra: stato colore + prezzo della notte (se override attivo, mostra prezzo override)

### Interazione Blocco Date

- **Click su singola data** apre un popover/panel laterale con: stato attuale, prezzo, booking info (se presente)
- **Range selection** (click + drag o click start + click end) per selezionare periodo da bloccare/sbloccare
- **Motivo blocco**: campo opzionale con preset rapidi (Manutenzione, Uso personale, Altro) + campo libero
- **Sblocco**: selezione range bloccato + conferma unblocco
- **Nessun modal pesante** -- sidebar panel o inline actions, pattern leggero stile Airbnb
- Database: nuova tabella `accom_room_blocks` con room_id, date_from, date_to, reason, created_at

### Gestione Prezzi Stagionali

- **Base price** resta su `accom_rooms.base_price_per_night` (gia esistente)
- **Seasonal overrides**: nuova tabella `accom_seasonal_pricing` con room_id, date_from, date_to, price_per_night, label (es. "Alta Stagione", "Capodanno")
- **UI**: sezione dedicata sotto il calendario -- lista di override attivi con possibilita di aggiungere/modificare/eliminare
- **Form override**: data inizio, data fine, prezzo per notte, etichetta (opzionale)
- **Visualizzazione su calendario**: le date con override mostrano il prezzo override nella cella, con colore diverso (es. arancione per alta stagione)
- **Overlap handling**: se due override si sovrappongono, l'ultimo creato vince (o errore -- Claude's discretion sull'approccio migliore)
- Prezzi in minor currency units (INTEGER) come da convenzione esistente -- UI converte da/a major units

### Sconti Durata Soggiorno

- **Weekly discount** e **Monthly discount** gia presenti su `accom_properties` (weekly_discount_percent, monthly_discount_percent)
- **UI**: form semplice nella stessa pagina calendario/pricing, sezione "Sconti"
- **Slider o input numerico** per percentuale (0-50% range ragionevole)
- **Preview**: mostra esempio calcolo ("7 notti a 500k VND = 3.5M - 10% = 3.15M VND")
- **Soglia**: weekly = 7+ notti, monthly = 28+ notti (standard di settore, non configurabile per ora)

### Claude's Discretion

- Scelta esatta del layout sidebar vs sotto-calendario per il detail panel
- Animazioni/transizioni nella navigazione mesi
- Formato esatto della legenda colori
- Come gestire overlap di seasonal pricing (errore vs last-wins)
- Skeleton loading durante fetch dati calendario
- Se usare tabs (Calendar | Pricing | Discounts) o scroll continuo in una pagina

</decisions>

<specifics>
## Specific Ideas

- Pattern Airbnb: slider per sconti settimanali/mensili con preview del prezzo medio risultante
- Il calendario deve mostrare i prezzi nelle celle per dare all'owner visibilita immediata su quanto sta chiedendo per ogni notte
- Le date bloccate devono essere visivamente distinte dalle date prenotate (l'owner deve capire al volo cosa e un booking e cosa e un blocco manuale)
- Seguire i pattern UI del backoffice esistente: card layout, Phosphor icons duotone, Tailwind, stati loading/saving separati

</specifics>

<deferred>
## Deferred Ideas

- Dynamic pricing algoritmico basato su domanda/occupancy -- future phase o integrazione terze parti
- Channel sync (Airbnb, Booking.com) -- fuori scope GUDBRO v1
- Revenue management analytics e ADR trend -- Phase 24
- Early-bird e last-minute discounts automatici -- backlog futuro
- Multi-calendar view (tutte le stanze in una griglia orizzontale stile Gantt) -- enhancement futuro

</deferred>

---

_Phase: 22-owner-dashboard-calendar-pricing_
_Context gathered: 2026-01-31_
