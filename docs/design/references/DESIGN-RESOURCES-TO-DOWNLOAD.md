# Design Resources - Links Utili da Scaricare

> **Data:** 2026-01-24
> **Scopo:** Solo risorse VERAMENTE utili che non abbiamo già

---

## ⚠️ RISORSE GIÀ DISPONIBILI NEL PROGETTO

**NON serve scaricare icone!** Abbiamo già tutto:

| Package | Uso | Icone |
|---------|-----|-------|
| `@phosphor-icons/react` | UI generale | 7,000+ icone |
| `lucide-react` | UI componenti | 1,000+ icone |
| `@web3icons/react` | Crypto (BTC, ETH, USDC, USDT) | Tutte le crypto |
| `react-svg-credit-card-payment-icons` | Carte pagamento | Visa, Mastercard, etc. |

**Per allergeni:** Usa combinazione di Phosphor icons + testo o crea SVG custom semplici.

---

## Screenshot App Reali (UTILI)

Questi sono utili perché mostrano **layout reali funzionanti**, non mockup teorici.

### Bill Splitting - Pattern Reali

| Link | Nome File | Motivazione |
|------|-----------|-------------|
| https://www.behance.net/gallery/34733541/Restaurant-Bill-Splitting-Payment-App-UX-UI-iOS | `billsplit-behance-ios-01.png` | **Case study completo** con flow reale: selezione items, divisione per persona, calcolo real-time. Pattern da analizzare per la nostra feature già nel backend. |
| https://uxdesign.cc/splitting-a-bill-at-a-restaurant-4eab00b42795 | `billsplit-uxcollective-akm.png` | **Redesign con focus UX**: mostra come rendere cliccabili gli items già pagati da altri (cambiano colore + iniziale). Real-time collaboration. |

### Loyalty Tier Progress - Pattern Reali

| Link | Nome File | Motivazione |
|------|-----------|-------------|
| https://dribbble.com/shots/17170968-Starbucks-Rewards | `loyalty-starbucks-dribbble.png` | **Starbucks Rewards UI** - Il gold standard per loyalty program. Progress bar, stars, tier badges. |
| https://dribbble.com/shots/15394862-Loyalty-Program-App | `loyalty-tier-progress-dribbble.png` | **Tier Progress UI** - Mostra Bronze→Silver→Gold→Platinum con progress visuale. Esattamente i 4 tier che abbiamo. |

### Dietary Filter Modal - Pattern Reali

| Link | Nome File | Motivazione |
|------|-----------|-------------|
| https://dribbble.com/shots/16866510-Filter-Component | `filter-dietary-modal-dribbble.png` | **Filter modal pulito** - Checkboxes per dietary restrictions con icone. Pattern per il nostro filtro allergeni/dietary. |

---

## Behance Case Studies (UTILI per UX Flow)

| Link | Nome File | Motivazione |
|------|-----------|-------------|
| https://www.behance.net/gallery/148726857/Food-Delivery-App-UIUX-Case-Study | `casestudy-food-delivery.png` | **Flow completo** dalla home al checkout. 89K views, validato dalla community. |
| https://www.behance.net/gallery/176587729/Restaurant-App-Design | `casestudy-restaurant-app.png` | **Restaurant app 2024** - Design trends recenti per menu digitali. |

---

## NON Scaricare (Ridondanti)

❌ **Icon packs generici** - Abbiamo Phosphor + Lucide
❌ **Figma allergen icons** - Li creiamo custom
❌ **Crypto UI kits** - Abbiamo @web3icons
❌ **Credit card icons** - Abbiamo react-svg-credit-card-payment-icons
❌ **Generic UI kits** - Usiamo shadcn/ui già configurato

---

## Naming Convention

```
[feature]-[fonte]-[descrizione].png

Esempi:
- billsplit-behance-ios-01.png
- loyalty-starbucks-dribbble.png
- filter-dietary-modal-dribbble.png
```

---

## Quando hai scaricato, avvisami e:
1. Analizzo le immagini per estrarre pattern specifici
2. Aggiorno il Design Sprint Report
3. Creo component specs basate sui pattern
