# Test Manuale - Waiter PWA Tables & Payment

## Pre-requisiti
- Server in esecuzione su porta 3005: `pnpm dev:waiter`

---

## Test 1: Login e Accesso Dashboard

### Steps:
1. Apri http://localhost:3005/login
2. Dovrebbe apparire la pagina di login con:
   - Form email/password
   - Sezione "Account di sviluppo" con 2 bottoni (Mario Rossi, Luigi Verdi)
3. Clicca su **"Mario Rossi"** (staff)
4. Dovrebbe reindirizzare a `/` (dashboard)

### Expected:
- ✅ Header con nome "Mario Rossi" e ruolo "staff"
- ✅ Bottom navigation con 5 tab: Home, Richieste, Scan, Ordini, Tavoli
- ✅ Dashboard con statistiche

---

## Test 2: Navigazione a Tavoli

### Steps:
1. Dalla dashboard, clicca sul tab **"Tavoli"** (icona sedia) nella bottom nav
2. Dovrebbe navigare a `/tables`

### Expected:
- ✅ Pagina Tavoli con header "I miei tavoli"
- ✅ Vista può essere:
  - **Compact**: Griglia di tile colorati (se > 6 tavoli)
  - **Cards**: Card più grandi (se ≤ 6 tavoli)
- ✅ Legenda colori in basso (se compact view)
- ✅ Bottone "+" per aggiungere tavolo

---

## Test 3: Vista Compact (Tile Colorati)

### Expected nella vista compact:
- ✅ Tile quadrati con numero tavolo al centro
- ✅ Colori basati su stato:
  - 🟢 Verde = OK (nessuna richiesta)
  - 🟡 Giallo = Pending (richieste in attesa)
  - 🔴 Rosso = Urgent (richiesta vecchia > 3 min)
  - 🔵 Blu = Payment (conto richiesto)
  - 🟠 Arancione = Ready (ordine pronto)
  - ⚪ Grigio = Empty (tavolo vuoto)
- ✅ Badge notifica (come social) su tile con richieste
- ✅ Tap su tile apre bottom sheet

---

## Test 4: Bottom Sheet Dettaglio Tavolo

### Steps:
1. Tap su un tavolo qualsiasi
2. Dovrebbe aprirsi un bottom sheet dal basso

### Expected:
- ✅ Header con numero tavolo e durata sessione
- ✅ Tab "Richieste" e "Ordini"
- ✅ Lista richieste/ordini (o messaggio "nessuna richiesta")
- ✅ Bottoni azione in basso:
  - "Gestisci tutte" (se ci sono richieste)
  - "Pagamento" (sempre visibile)
  - "..." (altre opzioni)

---

## Test 5: Flusso Pagamento

### Steps:
1. Dal bottom sheet di un tavolo, clicca su **"Pagamento"**
2. Dovrebbe aprirsi il Payment Sheet

### Expected:
- ✅ Header con totale e numero tavolo
- ✅ 5 metodi di pagamento:
  1. **Contanti** (verde)
  2. **Carta** (blu)
  3. **Crypto** (arancione)
  4. **Dividi conto** (viola)
  5. **QR Self-service** (indigo)

---

## Test 6: Pagamento Contanti

### Steps:
1. Nel Payment Sheet, clicca su **"Contanti"**
2. Dovrebbe mostrare la vista pagamento contanti

### Expected:
- ✅ Totale da pagare
- ✅ Tastierino numerico o importi rapidi (€50, €100, €200)
- ✅ Calcolo resto in tempo reale
- ✅ Bottone "Conferma pagamento"

---

## Test 7: Pagamento Crypto

### Steps:
1. Nel Payment Sheet, clicca su **"Crypto"**
2. Dovrebbe mostrare selezione blockchain

### Expected:
- ✅ Totale in EUR
- ✅ Selezione blockchain: ETH, SOL, BTC, TON
- ✅ Selezione token: nativo o stablecoin (USDC/USDT se disponibile)
- ✅ Bottone "Genera QR Code"
- ✅ Dopo generazione: QR code, indirizzo wallet, stato "In attesa..."

---

## Test 8: Dividi Conto (Split)

### Steps:
1. Nel Payment Sheet, clicca su **"Dividi conto"**
2. Dovrebbe mostrare la vista split payment

### Expected:
- ✅ Totale da dividere
- ✅ Selettore numero persone (+/-)
- ✅ Calcolo "Ciascuno paga: €X.XX"
- ✅ Bottone "Inizia divisione"
- ✅ Dopo start: lista persone con checkbox pagato/non pagato
- ✅ Progress bar pagamenti

---

## Test 9: Auto-Switch View Mode

### Verifica:
- Con ≤ 6 tavoli attivi → dovrebbe mostrare vista "cards"
- Con > 6 tavoli attivi → dovrebbe mostrare vista "compact" (tile)
- Il toggle manuale dovrebbe funzionare

---

## Bug Report Template

Se trovi bug, usa questo formato:

```
### Bug: [Titolo breve]
**Pagina:** /tables
**Steps:**
1.
2.
3.

**Expected:**
**Actual:**
**Screenshot:** [se possibile]
```

---

## Risultati Test

| Test | Stato | Note |
|------|-------|------|
| 1. Login | ⬜ | |
| 2. Navigazione Tavoli | ⬜ | |
| 3. Vista Compact | ⬜ | |
| 4. Bottom Sheet | ⬜ | |
| 5. Payment Sheet | ⬜ | |
| 6. Contanti | ⬜ | |
| 7. Crypto | ⬜ | |
| 8. Split | ⬜ | |
| 9. Auto-Switch | ⬜ | |

**Legenda:** ✅ Pass | ❌ Fail | ⬜ Not tested
