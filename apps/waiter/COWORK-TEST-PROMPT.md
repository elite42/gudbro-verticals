# Prompt per Cowork - Test Waiter PWA

Copia questo prompt e incollalo in una nuova sessione Cowork per fare un test completo.

---

## Prompt

```
Devo testare la nuova funzionalità "Tavoli" e "Pagamento" della Waiter PWA.

**Contesto:**
- App: apps/waiter (porta 3005)
- Nuovi componenti creati in:
  - components/tables/ (TableTile, CompactTableGrid, TableBottomSheet)
  - components/payment/ (PaymentSheet, CashPayment, CardPayment, CryptoPayment, SplitPayment, QRPayment)
- Store: lib/stores/settings-store.ts

**Verifica richiesta:**

1. **Build Check:**
   - Esegui `pnpm --filter=waiter build` e verifica che compili senza errori
   - Verifica che la route /tables sia inclusa nel build output

2. **Import Check:**
   - Verifica che tutti gli import in `app/(dashboard)/tables/page.tsx` siano corretti
   - Verifica che non ci siano import circolari

3. **TypeScript Check:**
   - Esegui `pnpm --filter=waiter typecheck` (se disponibile) o verifica manualmente i tipi
   - Controlla che i tipi in TableTile.tsx (TableStatus, getTableStatus) siano esportati correttamente

4. **Component Dependencies:**
   - Verifica che framer-motion sia installato (usato per animazioni)
   - Verifica che @phosphor-icons/react sia disponibile
   - Verifica che zustand sia configurato correttamente

5. **Store Integration:**
   - Leggi settings-store.ts e verifica che:
     - ViewMode type sia 'auto' | 'cards' | 'compact'
     - getEffectiveViewMode funzioni correttamente
     - Il persist middleware sia configurato

6. **Missing Files:**
   - Verifica che esistano:
     - components/tables/TableTile.tsx
     - components/tables/CompactTableGrid.tsx
     - components/tables/TableBottomSheet.tsx
     - components/payment/PaymentSheet.tsx
     - components/payment/CashPayment.tsx
     - components/payment/CardPayment.tsx
     - components/payment/CryptoPayment.tsx
     - components/payment/SplitPayment.tsx
     - components/payment/QRPayment.tsx

**Output richiesto:**
- Lista di eventuali errori trovati
- Suggerimenti per fix
- Conferma che il codice è pronto per il test manuale
```

---

## Alternative: Test Automatico con Playwright (se disponibile)

Se hai Playwright configurato, puoi chiedere a Cowork:

```
Scrivi un test Playwright per testare:
1. Login con account dev
2. Navigazione a /tables
3. Apertura bottom sheet cliccando su un tavolo
4. Apertura payment sheet
5. Selezione metodo pagamento "Contanti"

Il test dovrebbe essere in: apps/waiter/tests/tables.spec.ts
```
