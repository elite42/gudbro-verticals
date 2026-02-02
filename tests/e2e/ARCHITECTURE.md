# Architettura Test E2E Multi-Sistema

## Overview Sistemi

```
┌─────────────────────────────────────────────────────────────────┐
│                         SUPABASE                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ orders   │ │order_items│ │hot_action│ │ table_assignments│   │
│  └────┬─────┘ └────┬─────┘ │_requests │ └────────┬─────────┘   │
│       │            │       └────┬─────┘          │              │
│       └────────────┴────────────┴────────────────┘              │
│                         │ Real-time Subscriptions               │
└─────────────────────────┼───────────────────────────────────────┘
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
    ▼                     ▼                     ▼
┌─────────┐         ┌─────────┐          ┌─────────┐
│BACKOFFICE│         │ WAITER  │          │CUSTOMER │
│  :3023   │         │  :3005  │          │  :3004  │
└────┬────┘         └────┬────┘          └────┬────┘
     │                   │                    │
     │    ┌──────────────┴──────────────┐    │
     │    │                             │    │
     ▼    ▼                             ▼    │
┌─────────────┐                   ┌──────────┴──┐
│   KITCHEN   │                   │     BAR     │
│/orders/kitchen│                 │ /orders/bar │
└─────────────┘                   └─────────────┘
```

---

## 1. Flusso Ordine Misto (Cibo + Bevande)

### Problema
Quando un cliente ordina cibo E bevande insieme:
- L'ordine deve essere splittato tra Kitchen e Bar
- Kitchen e Bar lavorano in parallelo
- Il cameriere deve sapere quando TUTTO è pronto
- Le bevande sono tipicamente pronte prima del cibo

### Flusso Attuale

```
[Customer] → Crea ordine con items misti
                    │
                    ▼
            ┌───────────────┐
            │    orders     │
            │ status:pending│
            └───────┬───────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│  order_items  │       │  order_items  │
│ is_beverage=F │       │ is_beverage=T │
│ → KITCHEN     │       │ → BAR         │
└───────┬───────┘       └───────┬───────┘
        │                       │
        ▼                       ▼
    [Kitchen]               [Bar]
    preparing...            preparing...
        │                       │
        │    ┌──────────────────┘
        │    │ (bar finisce prima)
        │    ▼
        │   [Bar items: READY]
        │    │
        │    └─→ Notifica waiter?
        │        "Bevande pronte per T5"
        │
        ▼
    [Kitchen items: READY]
        │
        └─→ Notifica waiter:
            "Ordine completo per T5"
```

### Domande Aperte

1. **Notifiche intermedie?**
   - Opzione A: Notifica solo quando TUTTO è pronto
   - Opzione B: Notifica per ogni parte (bevande, poi cibo)
   - Opzione C: Configurabile per locale

2. **Servizio bevande anticipato?**
   - Alcuni ristoranti servono bevande subito
   - Altri aspettano che tutto sia pronto
   - Deve essere configurabile?

3. **Status ordine aggregato**
   - Come calcolare lo status dell'ordine completo?
   - `order.status` = min(items status) o logica custom?

### Proposta Soluzione

```typescript
// order_items aggiunge campo
interface OrderItem {
  // ... existing fields
  station: 'kitchen' | 'bar' | 'pass'; // dove preparare
  item_status: 'pending' | 'preparing' | 'ready' | 'served';
}

// Logica status ordine
function getOrderStatus(items: OrderItem[]): OrderStatus {
  const allReady = items.every(i => i.item_status === 'ready');
  const anyPreparing = items.some(i => i.item_status === 'preparing');
  const allServed = items.every(i => i.item_status === 'served');

  if (allServed) return 'served';
  if (allReady) return 'ready';
  if (anyPreparing) return 'preparing';
  return 'pending';
}

// Notifiche
interface OrderNotification {
  orderId: string;
  tableNumber: string;
  type: 'partial_ready' | 'all_ready' | 'served';
  station?: 'kitchen' | 'bar';
  readyItems: string[];
  pendingItems: string[];
}
```

---

## 2. Sincronizzazione Kitchen ↔ Bar

### Scenario: Ordine con 2 pizze + 2 birre

```
Timeline:
─────────────────────────────────────────────────────►
t=0        t=1m       t=2m       t=10m      t=12m
│          │          │          │          │
▼          ▼          ▼          ▼          ▼
Order      Bar        Bar        Kitchen    Order
received   starts     READY      READY      complete

           │          │          │
           │          ▼          │
           │    [Bevande pronte] │
           │    Servire ora?     │
           │    O aspettare?     │
           │                     │
           └─────────────────────┘
                    │
                    ▼
           [Tutto pronto - Servire]
```

### Opzioni di Configurazione

```typescript
interface LocationSettings {
  // ... other settings

  orderFlow: {
    // Servire bevande appena pronte?
    serveBeveragesImmediately: boolean;

    // Notificare per ogni stazione?
    notifyPartialReady: boolean;

    // Timeout per "tutto insieme" (se bar aspetta kitchen)
    maxWaitForKitchen: number; // minuti, 0 = sempre aspetta

    // Ordine servizio
    serviceOrder: 'beverages_first' | 'all_together' | 'as_ready';
  };
}
```

---

## 3. Notifiche Waiter

### Tipi di Notifica

| Evento | Destinatario | Priorità | Messaggio |
|--------|--------------|----------|-----------|
| Nuovo ordine | Waiter assegnato | Alta | "Nuovo ordine T5" |
| Bevande pronte | Waiter assegnato | Media | "🍹 Bevande pronte T5" |
| Cibo pronto | Waiter assegnato | Alta | "🍳 Cibo pronto T5" |
| Tutto pronto | Waiter assegnato | Alta | "✅ Ordine completo T5" |
| Richiesta cliente | Waiter assegnato | Alta/Media | Dipende dal tipo |
| Ordine in ritardo | Waiter + Manager | Alta | "⚠️ Ordine T5 > 20min" |

### Real-time Subscriptions

```typescript
// Waiter PWA subscriptions
const subscriptions = [
  // Ordini dei propri tavoli
  supabase.channel('my-orders')
    .on('postgres_changes', {
      event: '*',
      table: 'orders',
      filter: `table_id=in.(${myTableIds.join(',')})`
    }),

  // Status items (per sapere quando bar/kitchen finiscono)
  supabase.channel('my-items')
    .on('postgres_changes', {
      event: 'UPDATE',
      table: 'order_items',
      filter: `order_id=in.(${myOrderIds.join(',')})`
    }),

  // Richieste clienti
  supabase.channel('my-requests')
    .on('postgres_changes', {
      event: 'INSERT',
      table: 'hot_action_requests',
      filter: `table_id=in.(${myTableIds.join(',')})`
    }),
];
```

---

## 4. Stati e Transizioni

### Order Status Flow

```
                    ┌─────────────┐
                    │   pending   │
                    └──────┬──────┘
                           │ waiter confirms
                           ▼
                    ┌─────────────┐
                    │  confirmed  │
                    └──────┬──────┘
                           │ kitchen/bar starts
                           ▼
                    ┌─────────────┐
                    │  preparing  │
                    └──────┬──────┘
                           │ all items ready
                           ▼
                    ┌─────────────┐
                    │    ready    │
                    └──────┬──────┘
                           │ waiter serves
                           ▼
                    ┌─────────────┐
                    │   served    │
                    └──────┬──────┘
                           │ payment complete
                           ▼
                    ┌─────────────┐
                    │  completed  │
                    └─────────────┘
```

### Order Item Status (per stazione)

```
Kitchen Item:     pending → preparing → ready → served
Bar Item:         pending → preparing → ready → served

Tempi tipici:
- Bar:     1-5 min
- Kitchen: 5-20 min
```

---

## 5. Scenari di Test Critici

### 5.1 Ordine Misto - Flusso Base
```
1. Customer ordina: pizza + birra
2. Bar riceve: birra
3. Kitchen riceve: pizza
4. Bar: START → DONE (2 min)
5. Waiter: notifica "bevande pronte" (se configurato)
6. Kitchen: START → DONE (12 min)
7. Waiter: notifica "ordine completo"
8. Waiter: serve tutto insieme
```

### 5.2 Bevande Servite Prima
```
1. Customer ordina: pasta + cocktail
2. Bar: prepara cocktail (3 min)
3. Waiter: serve cocktail
4. Kitchen: prepara pasta (15 min)
5. Waiter: serve pasta
```

### 5.3 Ordine Solo Bar
```
1. Customer ordina: 2 spritz + acqua
2. Solo Bar riceve ordine
3. Kitchen: nessun item
4. Bar: prepara tutto
5. Waiter: serve
```

### 5.4 Modifica Ordine In Corso
```
1. Ordine in preparazione
2. Customer aggiunge: dessert + caffè
3. Kitchen: riceve dessert
4. Bar: riceve caffè
5. Sincronizzare con ordine esistente
```

### 5.5 Annullamento Item
```
1. Ordine con 3 items in preparazione
2. Customer annulla 1 item
3. Quale stazione deve essere notificata?
4. Come aggiornare ordine?
```

### 5.6 Multi-Waiter Handoff
```
1. Waiter A assegnato a T5
2. Ordine in preparazione
3. Waiter A va in pausa
4. Waiter B prende in carico T5
5. Notifiche vanno a Waiter B
```

---

## 6. Edge Cases

### 6.1 Network Offline
- Waiter perde connessione
- Ordini vengono creati
- Al reconnect: sincronizzare stato

### 6.2 Display Disconnesso
- Kitchen display si disconnette
- Ordini si accumulano
- Al reconnect: mostrare tutti pending

### 6.3 Ordini Simultanei
- 5 tavoli ordinano nello stesso minuto
- Kitchen/Bar gestiscono coda
- Priorità FIFO o configurabile?

### 6.4 Item Esaurito
- Kitchen marca item come esaurito
- Notifica waiter immediatamente
- Waiter informa cliente
- Ordine modificato

---

## 7. Metriche da Tracciare

### Per Test E2E
- Tempo totale ordine (submit → served)
- Tempo per stazione (kitchen, bar)
- Latenza notifiche (< 2 sec)
- Sincronizzazione corretta (0 errori)

### Per Produzione
- Orders/hour per stazione
- Average prep time per item type
- Notification delivery rate
- Error rate per flow

---

## 8. Implementazione Test

### Setup Required
```bash
# Start all systems
pnpm dev:backoffice &  # :3023
pnpm dev:waiter &      # :3005
pnpm dev:coffeeshop &  # :3004

# Verify all up
curl http://localhost:3023/api/health
curl http://localhost:3005/api/health
curl http://localhost:3004/api/health
```

### Test Data
- Usare FAKE_ACCOUNTS da mock-data.ts
- Non richiede Supabase reale
- Zustand stores con dati mock

### Automazione
```typescript
// Con Playwright
test('ordine misto kitchen + bar', async ({ page }) => {
  // 1. Customer PWA: crea ordine
  await page.goto('http://localhost:3004');
  // ... add items, submit

  // 2. Waiter PWA: conferma
  await page.goto('http://localhost:3005');
  // ... verify notification, confirm

  // 3. Kitchen: prepara
  await page.goto('http://localhost:3023/orders/kitchen');
  // ... start, done

  // 4. Bar: prepara
  await page.goto('http://localhost:3023/orders/bar');
  // ... start, done

  // 5. Waiter: verifica ready
  await page.goto('http://localhost:3005/tables');
  // ... verify status, serve
});
```

---

## 9. Prossimi Passi

1. **Decidere** opzioni configurazione (bevande prima? notifiche parziali?)
2. **Implementare** logica split ordine kitchen/bar
3. **Aggiungere** subscription items per waiter
4. **Testare** flussi base con mock data
5. **Playwright** test per automazione completa
