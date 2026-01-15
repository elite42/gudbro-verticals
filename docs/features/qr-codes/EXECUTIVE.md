# QR Codes - Executive Summary

> Sistema completo per creare, gestire e tracciare QR codes per il tuo locale.

---

## Cosa Fa

QR Codes permette di creare codici QR per diverse situazioni business: **menu ai tavoli** (i clienti scansionano e vedono il menu digitale), **WiFi** (connessione automatica senza digitare password), **marketing** (volantini, social, biglietti da visita con tracking). Ogni scansione viene tracciata con analytics dettagliati.

---

## Perche E' Importante

| Impatto                    | Descrizione                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **Customer Experience**    | I clienti accedono al menu digitale istantaneamente, senza app da scaricare            |
| **Marketing Intelligence** | Vedi esattamente quale canale (Instagram, Google Maps, volantino) porta clienti        |
| **Efficienza Operativa**   | Genera tutti i QR dei tavoli in un click, attiva/disattiva promozioni senza ristampare |
| **Riduzione Costi**        | Meno menu cartacei, meno richieste WiFi allo staff                                     |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                                   |
| -------------- | ----------- | ------------------------------------------------------ |
| Funzionalita   | ✅ Completo | 2 tipi QR, 4 contesti business, 10 marketing sources   |
| Test Coverage  | ~40%        | Componenti e utilities testati, service layer parziale |
| Documentazione | 🟡 Parziale | Tipi documentati, manca USER.md e DEV.md completi      |
| Performance    | ✅ Ottima   | Operazioni bulk, tracking async                        |

---

## Funzionalita Chiave

### Tipi di QR Code

- **URL QR**: Link al menu digitale con short URL tracciabile
- **WiFi QR**: Connessione automatica alla rete del locale

### Contesti Business

- **Tavoli**: QR sul tavolo per ordinazioni dine-in
- **Marketing**: Volantini, social media, Google Maps
- **Takeaway**: Packaging per asporto
- **Delivery**: Packaging per consegne

### Personalizzazione Design

- Colori personalizzati (foreground/background)
- Pattern (quadrato, punti, arrotondato)
- Logo al centro
- Cornice con testo

### Export

- PNG (standard e HD)
- SVG (vettoriale)
- PDF con preset materiali (carta, maglietta, adesivo, banner, menu, tent card)

### Analytics

- Scansioni per QR code
- Device type, OS, browser
- Timeline temporale
- UTM parameters per campagne

---

## Metriche Chiave

| Metrica                 | Valore        |
| ----------------------- | ------------- |
| Tipi QR supportati      | 2 (URL, WiFi) |
| Contesti business       | 4             |
| Marketing sources       | 10            |
| Formati export          | 4             |
| Preset materiali        | 8             |
| Dati tracciati per scan | 14 campi      |

---

## Competitivita

| Aspetto              | GUDBRO | Toast | Square | Lightspeed |
| -------------------- | ------ | ----- | ------ | ---------- |
| QR per menu digitale | ✅     | ✅    | 🟡     | ✅         |
| QR WiFi integrato    | ✅     | ❌    | ❌     | ❌         |
| Analytics per QR     | ✅     | 🟡    | ❌     | 🟡         |
| Short URL tracking   | ✅     | ❌    | ❌     | ❌         |
| Bulk creation        | ✅     | ❌    | ❌     | 🟡         |
| Design customization | ✅     | 🟡    | 🟡     | 🟡         |

---

## Roadmap

### Completato

- [x] Creazione QR URL e WiFi
- [x] Short URL con redirect tracking
- [x] Design customization completo
- [x] Export multi-formato
- [x] Analytics scansioni
- [x] Bulk creation per tavoli
- [x] Toggle attivo/inattivo
- [x] Scadenza e limite scansioni

### In Progress

- [ ] Aumentare test coverage service layer

### Planned

- [ ] Rate limiting su redirect
- [ ] Location tracking da IP
- [ ] Batch export (ZIP con tutti i QR)
- [ ] E2E tests workflow completo

---

## Rischi & Mitigazioni

| Rischio             | Probabilita | Impatto | Mitigazione                   |
| ------------------- | ----------- | ------- | ----------------------------- |
| Spam scansioni      | Media       | Basso   | Implementare rate limiting    |
| Test coverage basso | Alta        | Medio   | Aggiungere test service layer |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                               | Scopo                |
| ---------------------------------- | -------------------- |
| `app/(routes)/qr-codes/page.tsx`   | Dashboard principale |
| `components/qr/QRBuilderModal.tsx` | Wizard creazione QR  |
| `lib/qr/qr-service.ts`             | CRUD e analytics     |
| `lib/qr/qr-generator.ts`           | Generazione QR       |
| `app/api/qr/r/[code]/route.ts`     | Redirect short URL   |

---

_Ultimo aggiornamento: 2026-01-14_
