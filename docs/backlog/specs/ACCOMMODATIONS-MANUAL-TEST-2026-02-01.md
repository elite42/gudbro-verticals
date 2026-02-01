# Accommodations Manual Test Results — 2026-02-01

> Output della sessione di test manuale completa: Backoffice + PWA Guest.
> Usare come input per il prossimo milestone (`/gsd:new-milestone`).

---

## BUG (13)

| #   | Area       | Descrizione                                                                                                                                             | Priorità |
| --- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | Backoffice | Pagine caricano lentamente                                                                                                                              | Alta     |
| 2   | Backoffice | Nome ospite duplicato "John Smith Smith" — `OrderManagement.tsx` concatena `guest_name + guest_last_name` ma `guest_name` contiene già il nome completo | Alta     |
| 3   | Backoffice | Upload immagini camere non funziona (placeholder "coming soon")                                                                                         | Media    |
| 4   | PWA        | Currency selector mancante (era presente nella versione precedente)                                                                                     | Media    |
| 5   | PWA        | WiFi QR code mancante — solo copia password, manca generazione QR scansionabile (era nel F&B)                                                           | Media    |
| 6   | PWA        | Homepage è un muro di testo — troppe sezioni testuali, nessuna card visiva                                                                              | Alta     |
| 7   | PWA        | Tab "Map" nella bottom nav è vuoto — nessun contenuto collegato                                                                                         | Alta     |
| 8   | PWA        | Tab "Menu" centrale non fa nulla — `onMenuToggle` è `() => {}`                                                                                          | Alta     |
| 9   | PWA        | Tab "Profile" non ha contenuto                                                                                                                          | Alta     |
| 10  | PWA        | Icona bottom nav "Services" è un pacco regalo — dovrebbe essere campanello/concierge                                                                    | Media    |
| 11  | PWA        | Nomi categorie mostrano nome icona Phosphor come testo ("CookingPot Breakfast" → dovrebbe essere solo "Breakfast")                                      | Media    |
| 12  | PWA        | Formato orari brutto (`07:00:00 - 10:30:00` → dovrebbe essere `7:00 - 10:30 AM`)                                                                        | Bassa    |
| 13  | PWA        | Nessuna immagine prodotti servizi — solo placeholder box grigie                                                                                         | Alta     |

---

## FEATURE (41)

### Bookings (3)

| #   | Descrizione                             | Note                                                     |
| --- | --------------------------------------- | -------------------------------------------------------- |
| 1   | Alert scadenza visto prima del checkout | Avvisare proprietario se visto scade prima del check-out |
| 2   | Tab storico soggiorni passati           | Utile per vedere prenotazioni passate                    |
| 3   | Badge "Returning Guest"                 | Basato su nome + cognome + nazionalità                   |

### Orders (6)

| #   | Descrizione                                            | Note                                                                           |
| --- | ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| 4   | Rimuovere tab "All" + mostrare conteggi su tutti i tab | "All" crea confusione, i tab filtrati bastano                                  |
| 5   | Vista dettaglio ordine                                 | Click per vedere items, note, prezzi                                           |
| 6   | Performance tracking ordine → consegna                 | Tempo medio dall'ordine alla consegna                                          |
| 7   | Conferma ricezione ospite via PWA (opzionale)          | Toggle in Settings, auto-confirm con timeout                                   |
| 8   | Colonna/tag categoria nella lista ordini               | Sapere se è cibo, bevande, lavanderia, etc.                                    |
| 9   | Minibar self-service via PWA                           | Ospite marca prodotti consumati, proprietario riceve notifica per rifornimento |

### Rooms (1)

| #   | Descrizione                 | Note                                                             |
| --- | --------------------------- | ---------------------------------------------------------------- |
| 10  | Campo "Piano" per le camere | Il numero camera può essere fuorviante, il piano è un dato certo |

### Services (4)

| #   | Descrizione                                            | Note                                               |
| --- | ------------------------------------------------------ | -------------------------------------------------- |
| 11  | Upload immagini per servizi/items                      | Sostituire campo Image URL con upload diretto      |
| 12  | Flag "incluso nella tariffa" per colazione             | Distinguere items inclusi da extra a pagamento     |
| 13  | Picker "Importa da catalogo F&B" per minibar/colazione | Riusare database condiviso piatti/bevande con foto |
| 14  | Dry cleaning come opzione lavanderia                   | Aggiungere ai servizi lavanderia                   |

### Analytics (1)

| #   | Descrizione        | Note                                                                  |
| --- | ------------------ | --------------------------------------------------------------------- |
| 15  | Analytics avanzati | Revenue per camera/tipo, per servizio, settimanale/stagionale, RevPAR |

### Feedback (2)

| #   | Descrizione                       | Note                                                          |
| --- | --------------------------------- | ------------------------------------------------------------- |
| 16  | Richieste/reclami in-stay via PWA | Canale diretto ospite → proprietario, senza filtro dipendenti |
| 17  | Feedback post-stay                | Rating per categoria, commenti, trend nel backoffice          |

### Deals (1)

| #   | Descrizione                                        | Note                                                                    |
| --- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| 18  | Adattare modulo B2B Conventions per accommodations | Voucher con data, batch creation, no commissioni. Riusare migration 050 |

### Calendar (1)

| #   | Descrizione         | Note                                                      |
| --- | ------------------- | --------------------------------------------------------- |
| 19  | Timeline/Gantt view | FEATURE FUTURA — necessaria sopra 5-8 camere, target 1-25 |

### Settings (3)

| #   | Descrizione                    | Note                                                                   |
| --- | ------------------------------ | ---------------------------------------------------------------------- |
| 20  | Policies form strutturato      | Checkbox predefinite per house rules, dropdown per cancellation policy |
| 21  | Dati proprietà completi        | Social links, Google Maps, metodi comunicazione, orari, lingue staff   |
| 22  | Onboarding wizard proprietario | Campi obbligatori vs opzionali, progress bar completamento profilo     |

### Shared / Cross-Verticale (4)

| #   | Descrizione                                 | Note                                                                                                   |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 23  | Sistema fatturazione multi-verticale        | `shared/invoicing/` — PDF, numerazione, dati fiscali, richiesta da PWA. Riusabile da tutti i verticali |
| 24  | QR Code da modulo F&B                       | Collegare al sistema esistente (DB persistence, analytics, design, export, short URL)                  |
| 25  | Audit moduli riutilizzabili cross-verticale | Mappare tutti i moduli shared esistenti e candidati                                                    |
| 26  | Processo "Shared Module First"              | Regole: check catalogo prima di costruire, promozione a shared, template standard                      |

### Architettura (2)

| #   | Descrizione                                      | Note                                                                                  |
| --- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| 27  | Backoffice multi-verticale                       | Onboarding scelta verticali, menu dinamico, permessi per ruolo, 1 account N verticali |
| 28  | Audit funzionalità backoffice per accommodations | Verificare sezioni non-accommodations (Marketing, Customers, Team, Billing)           |

### PWA Homepage (8)

| #   | Descrizione                                      | Note                                                       |
| --- | ------------------------------------------------ | ---------------------------------------------------------- |
| 29  | WiFi box dismissibile                            | Rimuovere dopo connessione, recuperabile dal menu centrale |
| 30  | Homepage redesign con card colorate e immagini   | Vetrina visiva, max 6-8 card cliccabili, no muro di testo  |
| 31  | Numeri utili in pagina dedicata                  | Togliere da homepage, link nel menu                        |
| 32  | Check-in/out dentro House Rules                  | Non come sezione separata                                  |
| 33  | Richiesta early check-in / late checkout via PWA | Proprietario approva/rifiuta dal backoffice                |
| 34  | Sezione Delivery (Grab, ShopeeFood, etc.)        | Ripristinare dalla versione precedente, card visive        |
| 35  | Convenzioni ristoranti con card visive           | Ripristinare, collegato al modulo conventions              |
| 36  | Contact Host spostato in menu/header             | Non in homepage come sezione prominente                    |

### PWA Navigation (3)

| #   | Descrizione                               | Note                                                                            |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------- |
| 37  | Pagina Explore/Map                        | Attrazioni, tour, esperienze locali con mappa o lista card                      |
| 38  | Menu centrale come hub navigazione rapida | Grid icone: WiFi, Documenti, Numeri utili, Contatti, House Rules, etc.          |
| 39  | Pagina Profile completa                   | Dati personali, social login, documenti, storico, preferenze, fattura, feedback |

### PWA Services (2)

| #   | Descrizione               | Note                                                          |
| --- | ------------------------- | ------------------------------------------------------------- |
| 40  | Redesign card servizi     | Foto grandi, pulsante add to cart visibile, design stimolante |
| 41  | Icone bottom nav coerenti | Rivedere tutte e 5 per rispecchiare contenuto reale           |

---

## Decisioni Prese Durante il Test

1. **Returning Guest**: identificato tramite nome + cognome + nazionalità (non documento, che può cambiare)
2. **Commissioni scartate**: modello 85/10/5 eliminato — GUDBRO carica mensile SaaS
3. **Voucher con data**: buoni colazione associati alla data, non trasferibili al giorno dopo
4. **Conferma ricezione**: opzionale, toggle in Settings, auto-confirm con timeout
5. **Minibar**: il proprietario controlla comunque manualmente, la PWA ottimizza il processo
6. **Target camere**: clienti tipici GUDBRO hanno < 25 camere
7. **Fatturazione**: modulo shared, non software contabilità — genera PDF con dati fiscali
8. **Backoffice unico**: un merchant con più verticali ha un solo backoffice con permessi

---

## Prossimo Step

Eseguire `/gsd:new-milestone` per strutturare bug fix + feature in roadmap con fasi prioritizzate.
