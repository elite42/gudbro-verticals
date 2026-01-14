# ORDER-READY-NOTIFICATIONS - Notifiche "Ordine Pronto"

**Priority:** P0.5 - Strategia Prodotto
**Status:** DONE (Phase 1 + Phase 2)
**Effort:** Medium
**Updated:** 2026-01-15

---

## Vision

Sostituire buzzer hardware con notifiche su telefono cliente.

## Implementazione (2026-01-14)

### Phase 1 - Audio Alert (DONE)

**File:** `apps/coffeeshop/frontend/app/orders/page.tsx`

Funzionalità implementate:

- **Audio beep** quando ordine passa a status `ready`
- **Web Audio API fallback** se file audio non disponibile
- **Sound toggle** button nella hero per abilitare/disabilitare
- **Smart trigger** - suona solo alla transizione verso `ready`, non al refresh

Codice chiave:

```typescript
const playReadySound = useCallback(() => {
  // Try audio file, fallback to Web Audio API beep (800Hz, 300ms)
  const audioContext = new AudioContext();
  // ...oscillator setup...
}, [soundEnabled]);
```

### Phase 2 - Web Push (DONE)

**Database:** `notification_subscriptions` table creata (migration applicata)

**Files creati:**

- `apps/coffeeshop/frontend/public/service-worker.js` - Push event listener
- `apps/coffeeshop/frontend/hooks/usePushNotifications.ts` - Push subscription hook
- `apps/coffeeshop/frontend/app/api/push-subscription/route.ts` - Save subscriptions
- `apps/coffeeshop/frontend/app/api/send-push/route.ts` - Send notifications
- `apps/backoffice/app/api/send-push/route.ts` - Backend push sender

**Features implementate:**

- Service Worker push event handling con notification display
- Notification click/close handlers
- Push subscription management (subscribe/unsubscribe)
- VAPID authentication setup
- Kitchen display trigger quando ordine diventa 'ready'
- UI toggle nella pagina ordini (Push ON/OFF)
- Gestione permessi (denied/granted/default)

### Phase 3 - Messaging Channels (FUTURE)

WhatsApp/Zalo/LINE integration - da valutare dopo Phase 2.

## Opzioni implementative

| Metodo                 | Come funziona              | Pro                          | Contro                    |
| ---------------------- | -------------------------- | ---------------------------- | ------------------------- |
| Pagina stato ordine    | Cliente resta sulla pagina | Zero frizione                | Deve tenere pagina aperta |
| Web Push               | Solo permesso notifiche    | Funziona a browser chiuso    | Alcuni rifiutano          |
| SMS                    | Numero al checkout         | Affidabile sempre            | Costo per SMS             |
| **WhatsApp/Zalo/LINE** | Chat app                   | Affidabilità max, zero costo | Richiede integrazione     |

## Raccomandazione per Asia

WhatsApp/Zalo/LINE - tutti li hanno aperti.

## Argomento vendita

> "Elimina i buzzer hardware. Niente batterie, niente dispositivi persi, niente manutenzione. Il telefono del cliente è già il suo buzzer."

---

**Related:** TIER-MENU-ONLY, SERVICE-MODELS
