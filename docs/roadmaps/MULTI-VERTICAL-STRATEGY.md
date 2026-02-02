# Strategia Multi-Verticale GUDBRO

> **Last Updated:** 2026-01-29
> **Version:** 1.0
> **Status:** Approvata (brainstorming sessione 2026-01-29)

---

## 1. Visione

GUDBRO fornisce PWA standalone per ogni categoria di attivita commerciale (F&B, alloggi, palestre, farmacie, lavanderie, wellness, workshops, tours). Ogni commerciante riceve la propria PWA con QR/link diretto come punto d'accesso per i clienti.

**NON siamo un hub/directory tipo Yelp o Google Maps.** Non orchestriamo la discovery. Il commerciante e il distributore naturale della propria PWA.

Il **sito web GUDBRO** resta marketing B2B per onboarding commercianti.

---

## 2. Architettura — Hub vs PWA Standalone

**Decisione:** PWA standalone per ogni commerciante, collegate tra loro tramite convenzioni.

```
Commerciante → registra attivita su GUDBRO
            → riceve PWA verticale con QR/link
            → stringe convenzioni con altri commercianti
            → i clienti passano da un commerciante all'altro
              tramite le convenzioni (non tramite un hub centrale)
```

**Motivi:**
- Non vogliamo competere con Google/Yelp sulla discovery
- Il valore e nel tool che il commerciante da al suo cliente
- Le convenzioni creano la rete organicamente dal basso
- Ogni verticale ha UX e dominio specifici

---

## 3. Il Ruolo Strategico degli Alloggi

L'alloggio e il **punto d'ingresso obbligato** di ogni turista. Chi controlla l'alloggio controlla il primo touchpoint.

### Flusso Turista

```
Turista arriva → CHECK-IN alloggio → scansiona QR in camera
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                  ▼
              Servizi In-Stay   Convenzioni Partner   Info Locale
              (laundry, breakfast)  (gym -20%, spa -15%)  (visa, numeri utili)
```

### Perche l'alloggio e centrale

1. **Distribuzione** — ogni check-in e un touchpoint per tutti i verticali partner
2. **Dati di domanda** — quanti turisti, da dove, quanto restano
3. **Trust** — il turista si fida delle raccomandazioni del suo alloggio
4. **Futuro booking diretto** — se tutti gli alloggi sono clienti GUDBRO, si puo fare booking diretto (vs 15-20% commissione Booking.com)

---

## 4. Sistema Convenzioni (MVP)

### Cosa e una convenzione

L'alloggio (o qualsiasi commerciante) stringe un accordo con un'altra attivita per offrire sconti ai propri clienti.

**Esempio:** Hotel Sunrise negozia con Iron Paradise Gym → ospiti dell'hotel ottengono 20% sconto day pass.

### MVP — Cosa serve

Il proprietario dell'alloggio configura:
- Lista attivita convenzionate (gym, ristorante, spa, tours...)
- Sconto negoziato per ogni convenzione
- Metodo di verifica (come l'ospite si fa riconoscere)

L'ospite vede nel dashboard In-Stay:
- Lista attivita convenzionate con sconti
- Processo per farsi riconoscere (codice, QR, mostrare booking...)

### MVP — Cosa NON serve (futuro)

- **Redistribuzione profitto / commissioni** — non e prioritario. L'alloggio non ha bisogno di una % sugli acquisti del suo ospite. GUDBRO riceve gia un pagamento mensile dal commerciante.
- **Tracking transazioni automatico** — nella v1 basta che lo sconto venga applicato manualmente
- **Settlement automatico** — nessun flusso di denaro tra commercianti tramite GUDBRO nella v1

### Database Esistente (Migration 050)

Il sistema B2B Conventions e gia implementato con 5 tabelle:
- `partner_conventions` — convenzioni attive con benefit type, validita, verifica
- `convention_vouchers` — voucher individuali con codice unico
- `convention_redemptions` — tracking riscatti
- `office_partners` — registry partner (estendibile)
- `merchant_office_outreach` — CRM pipeline

**Metodi di verifica supportati:** link, QR scan, daily_code, badge_id, automatic

---

## 5. Inventario Backend — Riutilizzabilita

### Riutilizzabile Subito (25-30%)

| Modulo | Migrazioni | Note |
|--------|-----------|------|
| Auth (2FA, passkeys, OAuth) | 065, 067 | Pronto per tutti i verticali |
| QR Codes (generazione, scan, analytics) | 042 | Estendibile a check-in gym, camere, etc. |
| Notifiche (7 canali) | 059 | WhatsApp, Zalo, Telegram, email, push, Kakao, Line |
| Analytics (partizioni, views) | 017, 060, 061 | Verticale-agnostico |
| B2B Conventions | 050 | 5 tabelle, gia pronto |
| Chat & Escalations | 057 | Customer support multi-canale |
| Audit Log | 064 | Tracking eventi |
| Multi-valuta | 009 | Exchange rates |
| Gift Cards / Promo / Coupons | 069 | Applicabile a retail, wellness, gym |
| Wallet / Loyalty | P5 (018) | Sistema punti unificato |
| Weather Intelligence | 047, 066 | Raccomandazioni basate su meteo |
| Customer Intelligence | 045 | CLV, churn risk, segmentazione |

### F&B-Specifico (non riutilizzabile) (70%)

| Modulo | Note |
|--------|------|
| Menu System | Ricette, ingredienti, modifiers, piatti |
| Food Cost | Costi ingredienti, COGS |
| Kitchen Display (KDS) | Ordini cucina/bar |
| Order Timing | Prep time, ETA prediction |
| Food Challenges | Promozioni menu-based |
| Hot Actions | Quick items |

### Dominio Specifico per Verticale (da creare)

| Verticale | Dominio | Priorita |
|-----------|---------|----------|
| **Accommodations** | Stanze, booking, check-in/out, servizi in-stay, convenzioni | ALTA |
| **Gym** | Corsi, abbonamenti, check-in, trainer, PT booking | MEDIA |
| **Wellness** | Servizi, staff scheduling, appuntamenti | MEDIA |
| **Pharmacy** | Inventario, OTC/Rx, ordini delivery | BASSA |
| **Workshops** | Corsi, posti, materiali, scheduling | BASSA |
| **Laundry** | Ordini, tracking stato, pickup/delivery | BASSA |
| **Tours** | Itinerari, disponibilita, booking, gruppi | BASSA |

---

## 6. Fasi di Implementazione

### Fase 1 — Frontend PWA (ATTUALE)
- ✅ 10 PWA create (7 verticali + 3 core)
- ✅ Mock data per tutti i verticali
- ✅ Design system per verticale
- ✅ BottomNav uniformato
- In corso: QA e fix delle PWA

### Fase 2 — Backend Accommodations (PROSSIMA)
- Primo verticale con backend reale
- Estendere backoffice con modulo Accommodations
- Dashboard proprietario alloggio (stanze, ospiti, convenzioni)
- In-Stay dashboard connesso a dati reali
- Sistema convenzioni attivo (lista partner, sconti, verifica)
- **Perche primo:** e il distributore naturale di tutti gli altri verticali

### Fase 3 — Connessione Verticali al Core
- Ogni verticale si connette gradualmente
- Riutilizza: auth + notifiche + convenzioni + wallet + analytics
- Aggiunge solo il dominio specifico (corsi gym, servizi wellness, etc.)
- Priorita basata su domanda mercato

### Fase 4 — Booking Diretto (Futuro)
- Se massa critica di alloggi raggiunta
- Booking diretto vs Booking.com/Airbnb
- Revenue model: commissione piu bassa (5-10% vs 15-20%)
- Valore aggiunto: convenzioni locali integrate, servizi in-stay

---

## 7. Revenue Model

| Fonte | Fase | Note |
|-------|------|------|
| **Abbonamento mensile** per commerciante | Fase 1+ | Pagamento fisso per PWA + backoffice |
| **Commissioni partner** (opzionale) | Fase 3+ | % su transazioni tra partner (non MVP) |
| **Booking diretto** | Fase 4 | Commissione ridotta vs OTA |
| **Premium features** | Fase 3+ | AI, analytics avanzate, multi-location |

---

## 8. Principi Guida

1. **Il commerciante e il distributore** — QR/link diretto, non discovery centralizzata
2. **Le convenzioni creano la rete** — bottom-up, non top-down
3. **L'alloggio e il nodo centrale** — primo touchpoint turista
4. **Incrementale** — un verticale alla volta, backend condiviso graduale
5. **MVP senza commissioni** — redistribuzione profitto e futura, non blocca il lancio
6. **Mock-first** — frontend completo con mock data, backend quando serve
