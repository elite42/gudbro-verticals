# QR-BUILDER-V2 - Sistema QR Code Avanzato

**Priority:** P0.5 - Architettura da Rivedere
**Status:** ✅ DONE
**Effort:** High
**Completed:** 2026-01-17

---

## Implementation Summary

**Implemented 2026-01-17:**

| Component                                                 | Status |
| --------------------------------------------------------- | ------ |
| `QRBuilderModal` - Modal completo con stepper             | ✅     |
| `QRDesignPanel` - Colors, Pattern, Eye Style, Logo, Frame | ✅     |
| `QRPreview` - Rendering real-time con customizzazioni     | ✅     |
| `QRExportPanel` - Quick export + Material presets         | ✅     |
| True PDF export con jsPDF + svg2pdf.js                    | ✅     |
| QR Analytics page (`/qr-codes/analytics`)                 | ✅     |
| Eye style rendering (square, circle, rounded)             | ✅     |
| Logo overlay con padding e error correction               | ✅     |
| Frame rendering con testo customizzabile                  | ✅     |
| Traffic source attribution                                | ✅     |
| Device/OS/Country breakdown                               | ✅     |

**Files implementati:**

- `components/qr/QRBuilderModal.tsx`
- `components/qr/QRDesignPanel.tsx`
- `components/qr/QRExportPanel.tsx`
- `components/qr/QRPreview.tsx`
- `lib/qr/qr-generator.ts`
- `lib/qr/qr-service.ts`
- `lib/qr/qr-types.ts`
- `app/(dashboard)/qr-codes/page.tsx`
- `app/(dashboard)/qr-codes/analytics/page.tsx`

**Features implementate:**

- QR Context types: table, external, takeaway, delivery
- Traffic sources: google_maps, instagram, facebook, tiktok, tripadvisor, etc.
- Design customization: colors, patterns, eye styles, logo, frame
- Export formats: PNG, PNG-HD, SVG, PDF
- Material presets: paper, sticker, tent-card, menu, t-shirt, banner, etc.
- Analytics: scans over time, device breakdown, source performance, top performers

**Dipendenze aggiunte:**

- `jspdf` - PDF generation
- `svg2pdf.js` - SVG to PDF conversion

---

## Vision

QR Builder modulare riusabile in tutto il backoffice con contesti intelligenti

**Componente Core:** `<QRBuilderModal />` - lightbox riusabile da qualsiasi pagina

**Architettura:** Opzione B - Contextual + Hub centralizzato

---

## QR Context Matrix (IMPORTANTE)

| Contesto        | Location     | Azioni Disponibili                                          |
| --------------- | ------------ | ----------------------------------------------------------- |
| 🪑 **Table**    | In-venue     | ✅ Ordina & Paga, ✅ Chiama staff, ✅ Menu, ✅ Feedback     |
| 📍 **External** | Fuori locale | ✅ Menu (view only), ✅ Prenota, ✅ Loyalty, ❌ Ordina      |
| 🥡 **Takeaway** | Fuori locale | ✅ Ordina, ✅ Pickup time, ✅ Paga online                   |
| 🛵 **Delivery** | Fuori locale | ✅ Ordina (se in zona), ✅ Tracking, ⚙️ Regole raggio/orari |

---

## Traffic Sources (QR Dinamici)

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

## Logo Handling (per manager non tecnici)

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

## Customization Options

- [ ] Logo (default merchant, custom upload, icone libreria)
- [ ] Pattern (6+ stili)
- [ ] Eye Style (quadrato, rotondo, etc.)
- [ ] Colors (presets brand + custom picker)
- [ ] Frame (con testo customizzabile)
- [ ] Live Preview real-time

---

## Multi-lingua Landing

- [ ] Auto-detect lingua device
- [ ] Fallback a English se lingua non disponibile
- [ ] Auto-detect currency

---

## Features Aggiuntive

- [ ] QR Scadenza (per promo temporanee)
- [ ] QR con Password (eventi privati)
- [ ] Templates predefiniti (Brand Colors, Classic B&W, Seasonal)
- [ ] Templates salvabili dal merchant

---

## Analytics Dashboard

- [ ] Scan count per QR/source
- [ ] Heatmap orari scansioni
- [ ] Device breakdown
- [ ] Location (se consenso)
- [ ] Conversion tracking (scan → ordine/prenotazione)
- [ ] Revenue attribution per source
- [ ] Insights automatici ("Google Maps ha ROI più alto")

---

## Export

- [ ] PNG, SVG, PDF
- [ ] Batch export
- [ ] Print sheet (A4 con multipli QR)

---

## Delivery Config (Futuro)

- [ ] Zona consegna diretta (raggio configurabile)
- [ ] **Multi-slot orari per giorno**
- [ ] Costi delivery per fascia distanza
- [ ] Ordine minimo / gratis sopra X€
- [ ] Redirect a partner (Glovo/Deliveroo) se fuori zona

**Multi-slot Delivery (IMPORTANTE):**

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

## Edge Cases da gestire

- [ ] Takeaway: ordina da fuori, ritira in locale
- [ ] Pre-order: ordina ora, consuma dopo (pranzi veloci)
- [ ] Multi-location: QR deve chiedere "quale sede?"
- [ ] Orari chiusura: cosa mostrare se locale chiuso?
- [ ] Menu diversi: pranzo vs cena vs brunch per orario

---

## Differenziatori vs MenuTiger

- Multi-QR illimitati (vs 1 solo)
- Contextual creation da ogni pagina
- Traffic source attribution
- Landing pages dedicate per source
- QR Templates salvabili
- Analytics con ROI per canale
- **AI Co-Manager integrato**

---

## AI Co-Manager Integration

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

**Related:** AI-CUSTOMER-CHAT, SITE-CUSTOMIZATION, Analytics Dashboard
