# WAITER PWA - Specifiche UI/UX

**Version:** 2.0
**Data:** 2026-01-23
**Status:** In Development

---

## 1. Service Models e Adattamento UI

La PWA Waiter si adatta al modello di servizio configurato dal manager.

| Service Model | `locations.service_style` | Vista Default | Funzioni Principali |
|---------------|---------------------------|---------------|---------------------|
| **Table Service** | `dine_in` | Grid tavoli | Richieste, ordini, pagamento completo |
| **Counter + Delivery** | `counter` | Lista numeri + Grid | Trova numero, consegna, conferma |
| **Counter + Pickup** | `takeaway` | Coda ordini | Chiama cliente, consegna banco |
| **QR Ordering** | `qr_ordering` | Monitor richieste | Solo assistenza se chiamato |
| **Mixed** | `mixed` | Configurabile | Tutte le funzioni |

---

## 2. UI Compatta - Grid Tavoli

### 2.1 Layout Grid

```
┌─────────────────────────────────────────┐
│  TAVOLI (12)              [📱⊞] [⚙️]   │
├─────────────────────────────────────────┤
│                                         │
│  ╭─────╮  ╭─────╮  ╭─────╮  ╭─────╮    │
│  │     │  │  ²  │  │  ³  │  │     │    │
│  │  1  │  │  2  │  │  3  │  │  4  │    │
│  ╰─────╯  ╰─────╯  ╰─────╯  ╰─────╯    │
│                                         │
│  ╭─────╮  ╭─────╮  ╭─────╮  ╭─────╮    │
│  │  €  │  │  !  │  │     │  │  ¹  │    │
│  │  5  │  │  6  │  │  7  │  │  8  │    │
│  ╰─────╯  ╰─────╯  ╰─────╯  ╰─────╯    │
│                                         │
└─────────────────────────────────────────┘
```

### 2.2 Codice Colori Tavolo

| Colore | CSS Class | Hex Light | Hex Dark | Significato |
|--------|-----------|-----------|----------|-------------|
| Verde | `table-ok` | `#22C55E` | `#4ADE80` | Nessuna azione richiesta |
| Giallo | `table-pending` | `#EAB308` | `#FACC15` | Richiesta pendente <2min |
| Rosso | `table-urgent` | `#EF4444` | `#F87171` | Urgente >2min attesa |
| Blu | `table-payment` | `#3B82F6` | `#60A5FA` | Richiesta pagamento |
| Arancio | `table-ready` | `#F97316` | `#FB923C` | Ordine pronto da servire |
| Grigio | `table-empty` | `#9CA3AF` | `#6B7280` | Tavolo vuoto/non assegnato |

### 2.3 Badge Notifica (Top-Right)

| Badge | Significato | Priorità |
|-------|-------------|----------|
| `¹²³...` | Numero richieste pendenti | Media |
| `€` | Cliente vuole pagare | Alta |
| `!` | Ordine pronto da servire | Alta |
| (vuoto) | Nessuna azione | Bassa |

### 2.4 Auto-Switch View

```typescript
const viewMode = useMemo(() => {
  if (userPreference !== 'auto') return userPreference;
  return assignments.length <= 6 ? 'cards' : 'compact';
}, [assignments.length, userPreference]);
```

| Tavoli | Vista Default |
|--------|---------------|
| 1-6 | Cards (più dettagli) |
| 7+ | Grid compatta |

---

## 3. Bottom Sheet - Dettaglio Tavolo

### 3.1 Layout

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  TAVOLO {n}                  {status_badge}
  Assegnato {time}            {request_count} richieste

┌─────────────────────────────────────────┐
│ {icon} {request_type}           {time}  │  <- Per ogni richiesta
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ORDINE #{id} • €{total}                 │
│ {items_summary}                         │
│ {status_icon} {status}                  │
└─────────────────────────────────────────┘

┌─────────┐ ┌─────────┐ ┌─────────┐
│✓ Gestito│ │ € Conto │ │ ⋯ Altro │
└─────────┘ └─────────┘ └─────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3.2 Azioni Rapide

| Azione | Icona | Descrizione |
|--------|-------|-------------|
| Gestito | ✓ | Marca tutte le richieste come gestite |
| Conto | € | Apre flusso pagamento |
| Altro | ⋯ | Menu secondario (riassegna, note, storico) |

---

## 4. Flusso Pagamento

### 4.1 Metodi di Pagamento

```
┌─────────────────────────────────────────┐
│  Come vuole pagare?                     │
│                                         │
│  ┌───────┐ ┌───────┐ ┌───────┐         │
│  │  💵   │ │  💳   │ │  ₿    │         │
│  │ Cash  │ │ Carta │ │Crypto │         │
│  └───────┘ └───────┘ └───────┘         │
│                                         │
│  ┌───────┐ ┌───────┐                   │
│  │  ➗   │ │  📱   │                   │
│  │Dividi │ │QR Pay │                   │
│  └───────┘ └───────┘                   │
└─────────────────────────────────────────┘
```

### 4.2 Flusso per Metodo

#### Cash
```
1. Tap "Cash"
2. Mostra totale + eventuale resto da dare
3. Input importo ricevuto (opzionale)
4. Calcolo resto automatico
5. Conferma → Tavolo chiuso
```

#### Carta
```
1. Tap "Carta"
2. Opzioni:
   a) POS al tavolo → Conferma manuale
   b) Vai in cassa → Redirect cliente
3. Conferma pagamento → Tavolo chiuso
```

#### Crypto
```
1. Tap "Crypto"
2. Selezione chain (configurate dal manager)
3. Genera QR code con importo
4. Attesa conferma on-chain
5. Conferma automatica → Tavolo chiuso
```

#### Split Bill
```
1. Tap "Dividi"
2. Opzioni:
   a) Dividi equo (N persone)
   b) Dividi per item (chi ha ordinato cosa)
   c) Importi custom
3. Genera N pagamenti parziali
4. Track pagamenti completati
5. Tutti pagati → Tavolo chiuso
```

#### QR Pay (Self-service)
```
1. Tap "QR Pay"
2. Mostra QR al cliente
3. Cliente paga dal suo device
4. Notifica push al cameriere
5. Conferma automatica → Tavolo chiuso
```

### 4.3 Stati Pagamento

| Stato | Icona | Descrizione |
|-------|-------|-------------|
| `unpaid` | ⚪ | Non pagato |
| `partial` | 🟡 | Parzialmente pagato (split) |
| `processing` | 🔄 | In elaborazione |
| `paid` | ✅ | Pagato completamente |
| `failed` | ❌ | Pagamento fallito |

---

## 5. Configurazione Crypto (da Backoffice)

### 5.1 Chain Supportate

| Chain | Token | Icona | Note |
|-------|-------|-------|------|
| Ethereum | ETH, USDC, USDT | ◊ | Gas fee alte |
| Solana | SOL, USDC | ◎ | Fee basse, veloce |
| TON | TON, USDT | 💎 | Telegram integration |
| BNB Chain | BNB, BUSD | ⬡ | Fee basse |
| Bitcoin | BTC | ₿ | Lightning consigliato |
| Polygon | MATIC, USDC | ⬡ | Fee molto basse |

### 5.2 Configurazione Manager

```typescript
interface CryptoConfig {
  enabled: boolean;
  chains: {
    chainId: string;
    enabled: boolean;
    walletAddress: string;
    acceptedTokens: string[];
  }[];
  autoConvert: boolean; // Convert to fiat
  autoConvertCurrency: string; // EUR, USD, etc.
}
```

---

## 6. Varianti per Service Model

### 6.1 Table Service (Default)

- Grid tavoli completa
- Tutte le funzioni pagamento
- Ordini e richieste

### 6.2 Counter + Delivery

```
┌─────────────────────────────────────────┐
│  NUMERI IN ATTESA (5)         [refresh] │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 23  │ │ 24  │ │ 25  │ │ 27  │       │
│  │ 🟡  │ │ 🟢  │ │ 🟢  │ │ 🔴  │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
│                                         │
│  Tap numero → Dettaglio ordine          │
│  Swipe → Consegnato                     │
└─────────────────────────────────────────┘
```

- Focus su numeri, non tavoli
- Pagamento già avvenuto (solitamente)
- Azione principale: "Consegnato"

### 6.3 Counter + Pickup

```
┌─────────────────────────────────────────┐
│  PRONTI DA RITIRARE (3)                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ #127 • Mario                    │    │
│  │ 2x Cappuccino, 1x Cornetto      │    │
│  │ [🔔 Chiama] [✓ Ritirato]        │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

- Lista ordini pronti
- Azione: Chiama cliente (notifica/display)
- Azione: Marca come ritirato

### 6.4 QR Ordering

```
┌─────────────────────────────────────────┐
│  RICHIESTE ASSISTENZA (2)               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🛎️ Tavolo 5 chiede assistenza   │    │
│  │ "Ho una domanda sul menu"       │    │
│  │ [Vai al tavolo]                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  La maggior parte degli ordini e        │
│  pagamenti avviene via QR autonomo.     │
└─────────────────────────────────────────┘
```

- Minimo intervento cameriere
- Solo richieste assistenza
- Monitoraggio eccezioni

---

## 7. Settings Cameriere

```
┌─────────────────────────────────────────┐
│  IMPOSTAZIONI                           │
├─────────────────────────────────────────┤
│                                         │
│  Vista tavoli                           │
│  ○ Auto (consigliato)                   │
│  ○ Cards (dettagliata)                  │
│  ○ Grid compatta                        │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Notifiche                              │
│  [x] Vibrazione nuove richieste         │
│  [x] Suono richieste urgenti            │
│  [ ] Suono ogni richiesta               │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Tema                                   │
│  ○ Sistema                              │
│  ○ Chiaro                               │
│  ○ Scuro                                │
│                                         │
└─────────────────────────────────────────┘
```

---

## 8. Accessibilità

| Requisito | Implementazione |
|-----------|-----------------|
| Contrasto | WCAG AA (4.5:1 testo, 3:1 UI) |
| Touch target | Min 44x44px |
| Screen reader | aria-label su tutti i bottoni |
| Reduced motion | Rispetta prefers-reduced-motion |
| Font size | Rispetta impostazioni sistema |

---

## 9. Performance

| Metrica | Target |
|---------|--------|
| First Load | < 3s su 3G |
| TTI | < 5s |
| Bundle size | < 200KB gzipped |
| Offline | Tutte le azioni in coda |

---

## 10. Files da Modificare/Creare

### Fase 1: UI Compatta
- `components/tables/CompactTableGrid.tsx` (nuovo)
- `components/tables/TableTile.tsx` (nuovo)
- `components/tables/TableBottomSheet.tsx` (nuovo)
- `app/(dashboard)/tables/page.tsx` (update)
- `lib/stores/settings-store.ts` (nuovo)

### Fase 2: Flusso Pagamento
- `components/payment/PaymentSheet.tsx` (nuovo)
- `components/payment/CashPayment.tsx` (nuovo)
- `components/payment/CardPayment.tsx` (nuovo)
- `components/payment/CryptoPayment.tsx` (nuovo)
- `components/payment/SplitBillPayment.tsx` (nuovo)
- `components/payment/QRPayment.tsx` (nuovo)
- `lib/services/payment-service.ts` (nuovo)

### Fase 3: Varianti Service Model
- `components/counter/DeliveryQueue.tsx` (nuovo)
- `components/counter/PickupQueue.tsx` (nuovo)
- `components/qr-ordering/AssistanceMonitor.tsx` (nuovo)
- `app/(dashboard)/page.tsx` (update per routing)

---

_Ultimo aggiornamento: 2026-01-23_
