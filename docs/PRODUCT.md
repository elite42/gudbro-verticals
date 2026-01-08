# PRODUCT.md - GUDBRO Product Knowledge Base

> **Scopo:** Conoscenza del prodotto per pianificazione multidimensionale.
> Questo documento mi permette di valutare features e decisioni da più prospettive,
> non solo tecnica ma anche operativa, umana, competitiva e di business.
>
> **Last Updated:** 2026-01-08
> **Version:** 1.1

---

## 1. VISION & PRINCIPI

### 1.1 Cosa è GUDBRO

GUDBRO è una piattaforma per il settore Food & Beverage che combina:

- **Digital Menu (PWA)** - Menu digitale per clienti
- **Backoffice** - Gestione completa per merchant
- **AI Co-Manager** - Assistente AI per operazioni quotidiane

### 1.2 Problema che risolviamo

| Problema                     | Come lo risolviamo              |
| ---------------------------- | ------------------------------- |
| Menu cartacei obsoleti       | Menu digitale sempre aggiornato |
| Traduzioni manuali           | 15+ lingue automatiche          |
| Gestione allergeni rischiosa | Sistema allergeni strutturato   |
| Analytics assenti            | Dashboard real-time             |
| Operazioni frammentate       | Piattaforma unificata           |
| Manager sovraccarico         | AI Co-Manager che assiste       |

### 1.3 Principi Guida

| Principio                         | Significato                                    |
| --------------------------------- | ---------------------------------------------- |
| **Mobile-First**                  | PWA ottimizzata per smartphone (80%+ traffico) |
| **AI-Assisted, Human-Controlled** | AI suggerisce, manager decide                  |
| **Operational Reality**           | Features devono funzionare durante rush hour   |
| **Progressive Complexity**        | Semplice per iniziare, potente per chi vuole   |
| **Data-Driven**                   | Decisioni basate su analytics, non intuizioni  |
| **Multi-tenant Ready**            | Scalabile da 1 locale a catene                 |
| **Privacy by Design**             | GDPR-compliant, dati sensibili protetti        |

#### Privacy by Design - Dettaglio

Il settore F&B gestisce dati sensibili che richiedono attenzione particolare:

| Tipo Dato             | Sensibilità | Protezione                             |
| --------------------- | ----------- | -------------------------------------- |
| Allergie/intolleranze | Alta        | Solo merchant, mai condiviso           |
| Preferenze dietetiche | Media       | Opt-in esplicito per personalizzazione |
| Storico ordini        | Media       | Retention policy, diritto all'oblio    |
| Location (GPS)        | Alta        | Solo quando necessario, mai salvato    |
| Dati pagamento        | Altissima   | Mai salvati, solo provider (Stripe)    |

**Principi operativi:**

- **Minimizzazione:** Raccogliere solo dati necessari
- **Consenso esplicito:** Mai opt-in automatico
- **Trasparenza:** Privacy policy chiara e leggibile
- **Portabilità:** Export dati su richiesta
- **Cancellazione:** Diritto all'oblio implementato
- **Sicurezza:** Encryption at rest e in transit

### 1.4 Differenziatori vs Competitor

| Noi                               | Competitor (es. MenuTiger) |
| --------------------------------- | -------------------------- |
| AI Co-Manager integrato           | Nessuna AI                 |
| QR illimitati con analytics       | 1 QR base                  |
| Traffic source attribution        | No tracking avanzato       |
| 15+ lingue automatiche            | Traduzioni manuali         |
| Sistema allergeni completo        | Basico                     |
| Contextual QR (table vs external) | QR generici                |

### 1.5 Product Phasing

> **Principio:** Focus su ciò che genera valore oggi, non su ciò che potrebbe servire domani.

#### P0 - Core MVP (Must Have)

Senza queste features, il prodotto non ha senso:

| Feature           | Perché Core                           |
| ----------------- | ------------------------------------- |
| Menu digitale     | Funzione base, senza menu non c'è PWA |
| Multi-lingua      | Differenziatore chiave vs carta       |
| Sistema allergeni | Compliance e safety                   |
| QR codes          | Entry point principale per clienti    |
| Dashboard base    | Manager deve vedere cosa succede      |

#### P1 - Value Add (Should Have)

Features che aumentano valore e retention:

| Feature    | Valore Aggiunto               |
| ---------- | ----------------------------- |
| Analytics  | Dati per decisioni informate  |
| AI Chat    | Differenziatore vs competitor |
| Promozioni | Strumento di marketing        |
| Feedback   | Loop di miglioramento         |
| Events     | Engagement, ritorno clienti   |

#### P2 - Growth (Nice to Have)

Features per crescita e scale:

| Feature         | Obiettivo            |
| --------------- | -------------------- |
| KDS             | Efficienza operativa |
| Pre-order       | Nuovo canale revenue |
| Loyalty         | Retention long-term  |
| White-label     | Enterprise/Upsell    |
| POS Integration | Ecosistema completo  |

#### P3 - Future Bets (Could Have)

Features sperimentali o long-term:

| Feature           | Rischio/Opportunità             |
| ----------------- | ------------------------------- |
| Pagamenti         | Complesso, regolamentato        |
| Delivery          | Richiede logistica              |
| Multi-location    | Complessità architetturale      |
| Account unificato | Cross-merchant richiede network |
| AI Customer Chat  | Richiede AI molto matura        |

**Regola decisionale:**

- P0: Sviluppa subito, blocca tutto il resto
- P1: Dopo P0 stabile, in parallelo se risorse
- P2: Solo con traction validata
- P3: Solo con funding/partnership

---

## 2. PERSONAS

### 2.1 Manager/Owner Types

#### Il Tecnofobo Pratico

- **Età:** 45-60
- **Carattere:** Diffidente verso tecnologia, ma pragmatico
- **Comportamento:** Vuole risultati senza complessità
- **Pain points:** "Non ho tempo per imparare software"
- **Come aiutarlo:** UI semplicissima, onboarding guidato, AI che fa il lavoro

#### Il Manager Multitasking

- **Età:** 30-45
- **Carattere:** Sempre di corsa, 10 cose insieme
- **Comportamento:** Controlla il telefono tra un tavolo e l'altro
- **Pain points:** "Non ho mai 5 minuti liberi consecutivi"
- **Come aiutarlo:** Quick actions, notifiche smart, dashboard at-a-glance

#### Il Data-Driven Owner

- **Età:** 25-40
- **Carattere:** Vuole numeri, analytics, ROI
- **Comportamento:** Analizza report, ottimizza
- **Pain points:** "Voglio sapere cosa funziona e cosa no"
- **Come aiutarlo:** Analytics dettagliati, insights automatici, export dati

#### Il Chain Manager

- **Età:** 35-50
- **Carattere:** Gestisce più sedi, delega
- **Comportamento:** Supervisione da remoto, interviene su eccezioni
- **Pain points:** "Devo vedere tutto ma non posso essere ovunque"
- **Come aiutarlo:** Multi-location dashboard, alerts, report comparativi

### 2.2 Staff Types

#### Il Cameriere Esperto

- **Esperienza:** 5+ anni
- **Carattere:** Sa tutto a memoria, resistente al cambiamento
- **Comportamento:** Preferisce carta e penna
- **Come coinvolgerlo:** Mostrare che il digitale lo aiuta, non lo sostituisce

#### Il Giovane Tech-Savvy

- **Esperienza:** 0-2 anni
- **Carattere:** A suo agio con app e device
- **Comportamento:** Impara velocemente nuovi tool
- **Come coinvolgerlo:** Features avanzate, gamification

#### Il Barista/Bartender Creativo

- **Focus:** Qualità del prodotto, non burocrazia
- **Carattere:** Artistico, poco paziente con admin
- **Pain points:** "Voglio fare cocktail, non compilare form"
- **Come aiutarlo:** Input minimo, AI che completa i dettagli

### 2.3 Customer Types (Clienti Finali)

#### Il Turista

- **Comportamento:** Scansiona QR, cerca traduzione, foto-friendly
- **Aspettative:** Menu in sua lingua, info allergeni chiare
- **Frustrazione:** Menu solo in italiano, staff che non parla inglese
- **Opportunità:** Traduzione automatica, immagini piatti, recensioni

#### Il Cliente Abituale

- **Comportamento:** Sa già cosa vuole, velocità è chiave
- **Aspettative:** Riconoscimento, preferenze salvate, loyalty rewards
- **Frustrazione:** Ripartire da zero ogni volta
- **Opportunità:** Account unificato, storico ordini, promo personalizzate

#### Il Cliente Indeciso

- **Comportamento:** Legge tutto il menu, chiede consiglio
- **Aspettative:** Descrizioni dettagliate, suggerimenti
- **Frustrazione:** Menu scarni, staff frettoloso
- **Opportunità:** AI recommendations, "Più popolari", filtri

#### Il Cliente con Restrizioni Alimentari

- **Comportamento:** Cerca disperatamente info allergeni/dieta
- **Aspettative:** Filtri chiari (vegano, gluten-free, etc.)
- **Frustrazione:** Informazioni vaghe, "chiedi al cameriere"
- **Opportunità:** Sistema allergeni robusto, filtri dietetici, badge chiari

#### Il Cliente Social

- **Comportamento:** Fotografa tutto, condivide su Instagram
- **Aspettative:** Piatti instagrammabili, esperienza da raccontare
- **Frustrazione:** Piatti che non corrispondono alle foto
- **Opportunità:** Gallery foto UGC, share rewards, check-in social

#### Il Cliente Frettoloso

- **Comportamento:** Pranzo veloce, 30 minuti max
- **Aspettative:** Ordine rapido, pagamento veloce
- **Frustrazione:** Attese, cameriere introvabile
- **Opportunità:** Pre-order, pagamento da tavolo, "pronto in X minuti"

#### La Famiglia con Bambini

- **Composizione:** 1-2 adulti + 1-3 bambini (0-12 anni)
- **Comportamento:** Decisioni veloci per placare bimbi, cerca menu kids
- **Aspettative:**
  - Menu bambini chiaro e visibile
  - Info allergeni dettagliate (bambini più sensibili)
  - Seggioloni/seggiolini disponibili
  - Piatti veloci da preparare
  - Porzioni kids
- **Frustrazione:**
  - Menu bambini nascosto o assente
  - Attese lunghe (bimbi si annoiano)
  - Nessuna info su seggioloni
  - Porzioni adulte troppo grandi/care per bambini
- **Opportunità:**
  - Filtro "Family Friendly" prominente
  - Badge "Kids Menu" su prodotti
  - Info facilities (seggioloni, fasciatoio, area giochi)
  - "Happy Meal" style combos
  - Coloring placemats digitali
  - Stima tempo preparazione visibile

**Nota:** Segmento sottovalutato ma ad alto valore:

- Ticket medio alto (famiglia = 3-5 coperti)
- Fedeltà alta se esperienza positiva
- Passaparola forte tra genitori
- Review online molto dettagliate

---

## 3. VENUE TYPES

### 3.1 Caffetteria / Coffee Shop

| Aspetto         | Caratteristica                       |
| --------------- | ------------------------------------ |
| **Volume**      | Alto turnover, ordini piccoli        |
| **Peak**        | 7:30-9:30, 12:30-14:30               |
| **Staff**       | 2-4 persone                          |
| **Menu**        | Bevande, pasticceria, light lunch    |
| **Sfide**       | Coda al bancone, velocità servizio   |
| **Opportunità** | Pre-order, loyalty frequente, upsell |

### 3.2 Ristorante Casual

| Aspetto         | Caratteristica                        |
| --------------- | ------------------------------------- |
| **Volume**      | Medio, ordini strutturati             |
| **Peak**        | 12:30-14:30, 19:30-21:30              |
| **Staff**       | 4-10 persone                          |
| **Menu**        | Antipasti, primi, secondi, dessert    |
| **Sfide**       | Coordinamento cucina-sala, allergeni  |
| **Opportunità** | Menu completo, wine pairing, feedback |

### 3.3 Bar / Cocktail Bar

| Aspetto         | Caratteristica                                |
| --------------- | --------------------------------------------- |
| **Volume**      | Variabile, picchi serali                      |
| **Peak**        | 18:00-22:00 (aperitivo), 22:00-02:00 (serata) |
| **Staff**       | 2-6 persone                                   |
| **Menu**        | Cocktail, spirits, snack                      |
| **Sfide**       | Rumore, luce bassa, clienti in piedi          |
| **Opportunità** | Menu visivo, eventi, promo happy hour         |

### 3.4 Ristorante Fine Dining

| Aspetto         | Caratteristica                                  |
| --------------- | ----------------------------------------------- |
| **Volume**      | Basso, alto valore per coperto                  |
| **Peak**        | 20:00-22:00                                     |
| **Staff**       | 6-15 persone, ruoli specializzati               |
| **Menu**        | Degustazione, wine list estesa                  |
| **Sfide**       | Esperienza premium, aspettative altissime       |
| **Opportunità** | Storytelling piatti, sommelier AI, prenotazioni |

### 3.5 Fast Food / Quick Service

| Aspetto         | Caratteristica                         |
| --------------- | -------------------------------------- |
| **Volume**      | Altissimo, margini bassi               |
| **Peak**        | 12:00-14:00, 18:00-20:00               |
| **Staff**       | 5-15 persone, alta rotazione           |
| **Menu**        | Standardizzato, combo                  |
| **Sfide**       | Velocità, errori ordini, coda          |
| **Opportunità** | Self-order kiosk, order ahead, loyalty |

### 3.6 Hotel F&B

| Aspetto         | Caratteristica                              |
| --------------- | ------------------------------------------- |
| **Volume**      | Variabile, multi-outlet                     |
| **Peak**        | Colazione 7-10, cena 19-22                  |
| **Staff**       | Team esteso, multi-reparto                  |
| **Menu**        | Room service, ristorante, bar, eventi       |
| **Sfide**       | Coordinamento outlet, ospiti internazionali |
| **Opportunità** | Multi-lingua, room charge, concierge AI     |

### 3.7 Food Truck

| Aspetto         | Caratteristica                            |
| --------------- | ----------------------------------------- |
| **Volume**      | Alto durante eventi/pranzo                |
| **Peak**        | Dipende da location/evento                |
| **Staff**       | 1-3 persone                               |
| **Menu**        | Limitato, specializzato                   |
| **Sfide**       | Spazio, connettività, pagamenti           |
| **Opportunità** | Menu veloce, pre-order, location tracking |

---

## 4. OPERATIONAL REALITY

### 4.1 Peak Hours Dynamics

#### Il Caos Controllato (Rush Hour)

```
12:30 - Inizia il pranzo
├── Sala: 80% tavoli occupati, 3 in attesa
├── Cucina: 15 comande attive, 5 in coda
├── Cassa: 2 pagamenti simultanei
├── Manager: Al telefono per prenotazione + supervisione sala
└── Stress Level: 8/10

13:00 - Picco massimo
├── Sala: 100% + lista attesa
├── Cucina: 25 comande, chef urla "marcheeee!"
├── Cassa: Coda di 4 persone
├── Manager: Aiuta a servire, risponde a complaint
└── Stress Level: 10/10

Cosa NON funziona durante rush:
❌ Features che richiedono >30 secondi
❌ Notifiche non urgenti
❌ Form complessi da compilare
❌ Decisioni che richiedono riflessione

Cosa FUNZIONA durante rush:
✅ One-tap actions
✅ Alert critici e basta
✅ Automazioni silenziose
✅ Info at-a-glance
```

#### Implicazioni per il Prodotto

| Regola             | Esempio                           |
| ------------------ | --------------------------------- |
| **3-Second Rule**  | Ogni azione core < 3 secondi      |
| **Thumb-Friendly** | Bottoni grandi, zone tap ampie    |
| **Glanceable**     | Info chiave visibile senza scroll |
| **Interruptible**  | Workflow salvabili, riprendibili  |
| **Error-Tolerant** | Undo facile, conferme smart       |

### 4.2 Off-Peak Dynamics

#### La Calma Produttiva (Pomeriggio)

```
15:00-18:00 - Calma
├── Sala: 10-20% occupata
├── Cucina: Prep per sera
├── Manager: Tempo per admin, planning
└── Stress Level: 3/10

Cosa funziona:
✅ Report e analytics
✅ Pianificazione menu
✅ Training staff
✅ Setup promozioni
✅ Conversazioni AI approfondite
```

### 4.3 Stress Patterns

| Momento       | Stress      | Capacità Cognitiva | Tipo Feature Adatta   |
| ------------- | ----------- | ------------------ | --------------------- |
| Pre-apertura  | Basso       | Alta               | Setup, planning       |
| Apertura soft | Medio       | Media              | Verifica, quick check |
| Rush pranzo   | Altissimo   | Minima             | One-tap, automazioni  |
| Post-pranzo   | Basso       | Alta               | Report, analisi       |
| Pre-cena      | Medio       | Media              | Prep, briefing        |
| Rush cena     | Alto        | Bassa              | Essenziale only       |
| Chiusura      | Medio-Basso | Media              | Recap, chiusure       |

### 4.4 Team Coordination

#### Comunicazione Durante Rush

```
Problemi comuni:
- Chef: "Comanda 15 è uscita!" → Cameriere non sente
- Cameriere: "Tavolo 7 ha fretta" → Cucina non sa
- Manager: "Chi ha preso tavolo 12?" → Silenzio

Come aiutiamo:
- Kitchen Display System con status
- Notifiche push per urgenze
- Assegnazione tavoli visibile
- Timer comande automatici
```

#### Passaggio Turno

```
Fine turno pranzo → Inizio turno cena
Problemi:
- "C'era una prenotazione alle 20?" - persa
- "Il tavolo 5 aveva un complaint" - non passato
- "Abbiamo finito il branzino" - non comunicato

Come aiutiamo:
- Briefing automatico AI
- Note persistenti per tavolo
- Inventory alerts
- Handover checklist
```

---

## 5. ACCOUNT & PERMISSIONS

### 5.1 Gerarchia Account

```
Organization (Catena/Gruppo)
└── Brand
    └── Location (Singolo locale)
        └── Merchant Account
            ├── Owner (full access)
            ├── Manager (operations)
            ├── Staff (limited)
            └── Kitchen (kitchen only)
```

### 5.2 Permissions Matrix

| Azione          | Owner | Manager | Staff    | Kitchen   |
| --------------- | ----- | ------- | -------- | --------- |
| Modifica menu   | ✅    | ✅      | ❌       | ❌        |
| Vedi analytics  | ✅    | ✅      | Limitato | ❌        |
| Gestisci ordini | ✅    | ✅      | ✅       | ✅ (view) |
| Modifica prezzi | ✅    | ⚙️      | ❌       | ❌        |
| Gestisci staff  | ✅    | ⚙️      | ❌       | ❌        |
| Billing         | ✅    | ❌      | ❌       | ❌        |
| AI Co-Manager   | ✅    | ✅      | Limitato | ❌        |

### 5.3 Account Unificato (⚠️ FUTURE BET - P3)

> **⚠️ Future Bet:** Questa feature richiede network effect significativo per avere valore.
> Valutare solo con base utenti consolidata e partnership merchant.

**Visione:** Il cliente finale ha un account unico cross-merchant:

- Loyalty points accumulati ovunque
- Preferenze salvate
- Storico ordini
- Dietary preferences
- Single sign-on

**Perché è una Future Bet:**

| Sfida               | Impatto                                       |
| ------------------- | --------------------------------------------- |
| Network effect      | Serve massa critica di merchant               |
| Complessità loyalty | Punti cross-merchant = accounting complesso   |
| Privacy concerns    | Dati condivisi tra merchant diversi           |
| Business model      | Revenue share? Fee per transazione?           |
| Competitor lock-in  | Merchant potrebbero preferire loyalty proprio |

**Prerequisiti:**

- [ ] 100+ merchant attivi su piattaforma
- [ ] Sistema loyalty per singolo merchant stabile
- [ ] Legal framework per data sharing
- [ ] Business model validato

**Milestone per attivazione:**

1. Implementa loyalty singolo merchant (P2)
2. Valida interesse merchant per cross-loyalty
3. Pilot con 3-5 merchant partner
4. Scale se metriche positive

---

## 6. FEATURES MAP

### 6.1 Backoffice

| Sezione       | Scopo                        | Utente Primario |
| ------------- | ---------------------------- | --------------- |
| Dashboard     | Overview at-a-glance         | Manager         |
| Menu          | Gestione prodotti, categorie | Manager         |
| Orders        | Ordini real-time             | Staff/Manager   |
| Analytics     | Report e insights            | Owner/Manager   |
| AI Co-Manager | Assistente operativo         | Manager         |
| Team          | Gestione staff               | Owner/Manager   |
| Customers     | CRM, feedback                | Manager         |
| Marketing     | Promo, eventi, challenges    | Manager         |
| Settings      | Configurazione locale        | Owner           |
| QR Codes      | Generazione e tracking       | Manager         |

### 6.2 PWA (Cliente)

| Sezione | Scopo               | Momento d'uso     |
| ------- | ------------------- | ----------------- |
| Menu    | Browse prodotti     | Al tavolo         |
| Cart    | Carrello ordine     | Prima di ordinare |
| Orders  | Storico ordini      | Post-ordine       |
| Account | Profilo, preferenze | Setup/gestione    |
| Offers  | Promozioni attive   | Decisione         |
| Events  | Eventi del locale   | Scoperta          |
| Team    | Staff del locale    | Curiosità/tip     |

### 6.3 AI Co-Manager Capabilities

| Capability          | Esempio                                        |
| ------------------- | ---------------------------------------------- |
| Daily Briefing      | "Oggi previsti 45 coperti, 2 eventi sportivi"  |
| Proactive Alerts    | "Scorte mozzarella basse, ordina entro domani" |
| Chat Assistance     | "Come traduco il menu in giapponese?"          |
| Task Delegation     | "Crea task per staff: prep tavoli evento"      |
| Market Intelligence | "Il competitor ha alzato i prezzi del 5%"      |
| Financial Summary   | "Questa settimana +12% vs scorsa"              |
| Social Media        | "Post suggerito per Instagram"                 |
| Workflow Automation | "Reminder prenotazioni domani ore 18"          |

---

## 7. USER STORIES & SCENARIOS

### 7.1 Scenario: Pranzo Rush con Turista

```
Situazione:
- 13:15, ristorante pieno
- Tavolo 8: coppia giapponese, zero italiano
- Cameriere occupato con altri 4 tavoli

Senza GUDBRO:
1. Cameriere corre al tavolo
2. Gesticola, mostra menu cartaceo italiano
3. Turisti confusi, puntano foto a caso
4. Ordinano, arriva piatto con allergene
5. Complaint, stress, rimborso

Con GUDBRO:
1. Turisti scansionano QR
2. Menu in giapponese automatico
3. Filtrano per "no seafood" (allergia)
4. Ordinano con foto e descrizioni
5. Cucina riceve ordine con note allergeni
6. Piatto giusto, recensione 5 stelle
```

### 7.2 Scenario: Manager in Day Off

```
Situazione:
- Domenica, manager a casa
- Staff junior al locale
- Evento imprevisto: partita Italia

Senza GUDBRO:
1. Staff non sa come gestire afflusso
2. Chiamano manager che deve correre
3. Caos, clienti insoddisfatti

Con GUDBRO:
1. AI Alert: "Partita Italia alle 18, aspettati +40% affluenza"
2. Suggestion: "Attiva promo aperitivo, prepara extra Spritz"
3. Manager approva da app con un tap
4. Staff riceve istruzioni chiare
5. Manager monitora da remoto, interviene solo se serve
```

### 7.3 Scenario: QR da Google Maps

```
Situazione:
- Cliente trova locale su Google Maps
- Vede QR nel profilo, lo scansiona
- È in metro, a 3km dal locale

Comportamento SBAGLIATO:
→ Mostra menu con "Ordina Ora"
→ Cliente ordina
→ Arriva al locale, ordine già pronto da 30 min
→ Freddo, da buttare

Comportamento CORRETTO (nostro):
→ QR External detected
→ Mostra menu in modalità "view only"
→ CTA: "Prenota un tavolo" o "Salva per dopo"
→ Se vuole ordinare: "Scansiona il QR al tavolo quando arrivi"
→ Welcome page: "Benvenuto da Google Maps! 10% sconto prima visita"
```

---

## 8. COMPETITIVE INTELLIGENCE

### 8.1 Competitor: MenuTiger

**Analisi:** 2026-01-08

| Aspetto      | MenuTiger    | GUDBRO                 | Vantaggio |
| ------------ | ------------ | ---------------------- | --------- |
| QR Codes     | 1 base       | Illimitati + analytics | Noi       |
| AI Assistant | No           | AI Co-Manager          | Noi       |
| Traduzioni   | Manuali      | 15+ automatiche        | Noi       |
| KDS          | Sì           | Planned                | Loro      |
| White-label  | Sì (premium) | Planned                | Loro      |
| Prezzo       | $$$$         | TBD                    | TBD       |

**Features interessanti da loro:**

- Kitchen Display System (real-time orders)
- Email reports automatici
- Zapier integration
- QR customization (logo, colori, pattern)

**Nostre risposte pianificate:**

- KDS: In roadmap P2
- QR Customization: Spec completa (QR-BUILDER-V2)
- White-label: In roadmap P2

### 8.2 Competitor Analysis Framework

Per ogni competitor, valutare:

1. **Core features** - Cosa fanno bene
2. **Gaps** - Cosa manca
3. **Pricing** - Posizionamento
4. **Target** - Chi servono
5. **UX** - Qualità esperienza
6. **AI** - Livello automazione
7. **Integration** - Ecosistema

---

## 9. BEST PRACTICES LIBRARY

> Consigli generabili da AI Co-Manager per merchant

### 9.1 Operations

| Situazione           | Best Practice                                      |
| -------------------- | -------------------------------------------------- |
| Rush hour            | Prepara mise en place completa prima, menu ridotto |
| Staff shortage       | Semplifica menu, comunica attese ai clienti        |
| Complaint            | LAST: Listen, Apologize, Solve, Thank              |
| No-show prenotazione | Conferma 2h prima, overbooking 10%                 |

### 9.2 Menu Management

| Situazione           | Best Practice                             |
| -------------------- | ----------------------------------------- |
| Troppi piatti        | 80/20 rule: 20% piatti = 80% vendite      |
| Piatto che non vende | Test 2 settimane poi elimina o rinomina   |
| Stagionalità         | Rotazione trimestrale, evidenzia "nuovo"  |
| Pricing              | Charm pricing (€9.90 vs €10), anchor alto |

### 9.3 Customer Experience

| Situazione        | Best Practice                                 |
| ----------------- | --------------------------------------------- |
| Attesa lunga      | Comunica tempo stimato, offri drink           |
| Cliente indeciso  | Suggerisci "più popolari" o "chef recommends" |
| Allergie          | Mai improvvisare, verifica sempre in cucina   |
| Feedback negativo | Rispondi entro 24h, offri soluzione           |

---

## 10. PRICING PHILOSOPHY

> **Principio:** Il pricing deve essere comprensibile in 5 secondi e percepito come fair.

### 10.1 Modelli Considerati

| Modello           | Pro                            | Contro                        | Fit    |
| ----------------- | ------------------------------ | ----------------------------- | ------ |
| **Per-seat/mese** | Predicibile, scalabile         | Frizione per piccoli locali   | ⭐⭐   |
| **Per-order %**   | Allineato al valore            | Complesso, richiede pagamenti | ⭐     |
| **Flat mensile**  | Semplice, predicibile          | Non scala con uso             | ⭐⭐⭐ |
| **Freemium**      | Bassa barriera, viralità       | Conversione difficile         | ⭐⭐   |
| **Tiered**        | Upsell naturale, segmentazione | Complessità, "quale piano?"   | ⭐⭐⭐ |

### 10.2 Direzione Raccomandata

**Modello: Tiered Flat + Usage-based AI**

```
FREE TIER (Lead generation)
├── 1 location
├── Menu digitale base
├── 3 lingue
├── QR codes (3)
├── Analytics base (7 giorni)
└── Watermark "Powered by GUDBRO"

STARTER (€29/mese)
├── 1 location
├── Tutte le lingue
├── QR codes illimitati
├── Analytics 90 giorni
├── No watermark
├── Support email
└── AI: 50 query/mese

PROFESSIONAL (€79/mese)
├── Tutto Starter +
├── AI Co-Manager illimitato
├── Events & Promozioni
├── Feedback system
├── Analytics avanzati
├── Priority support
└── Customizzazione brand

ENTERPRISE (Custom)
├── Multi-location
├── API access
├── White-label
├── Dedicated support
├── SLA garantito
└── Custom integrations
```

### 10.3 Principi di Pricing

| Principio              | Implementazione                           |
| ---------------------- | ----------------------------------------- |
| **Trasparenza**        | Nessun costo nascosto, tutto visibile     |
| **Valore percepito**   | Feature costose in tier alti              |
| **Facilità downgrade** | Mai bloccare l'uscita                     |
| **Grandfathering**     | Chi entra a un prezzo lo mantiene 12 mesi |
| **Annual discount**    | -20% per pagamento annuale                |
| **Trial period**       | 14 giorni full-featured, no CC richiesta  |

### 10.4 Decisioni Aperte

- [ ] Pricing in € o $ (mercato target)?
- [ ] Discount per non-profit/charity?
- [ ] Referral program?
- [ ] Partner/reseller pricing?

---

## 11. INTEGRATION STRATEGY

> **Principio:** Integrazioni devono moltiplicare valore, non aggiungere complessità.

### 11.1 Priorità Integrazioni

| Tier       | Integrazioni           | Razionale                       |
| ---------- | ---------------------- | ------------------------------- |
| **Must**   | Google Maps, Instagram | Discovery e social proof        |
| **Should** | Stripe, Apple Pay      | Pagamenti (quando pronti)       |
| **Could**  | POS (Square, Toast)    | Sincronizzazione inventario     |
| **Won't**  | Sistemi legacy custom  | ROI negativo, supporto infinito |

### 11.2 API Strategy

```
Fase 1: Consumer Only (Ora)
└── Noi consumiamo API di terzi (Google, OpenAI, etc.)

Fase 2: Read API (P2)
└── Esponiamo dati in sola lettura per integrazioni

Fase 3: Full API (P3)
└── API bidirezionale per partner e enterprise
```

### 11.3 POS Integration Deep Dive

**Perché è complesso:**

- Ogni POS ha API diversa (o nessuna)
- Sincronizzazione real-time vs batch
- Mapping prodotti non 1:1
- Gestione conflitti inventario
- Certificazioni richieste (alcuni POS)

**Approccio suggerito:**

1. **Fase 1:** Export manuale (CSV)
2. **Fase 2:** Integrazione con 2-3 POS principali (Square, Toast)
3. **Fase 3:** Middleware/iPaaS per altri (Zapier, Make)
4. **Fase 4:** API propria per integrazioni custom

### 11.4 Third-Party Dependencies

| Servizio    | Criticità | Fallback              |
| ----------- | --------- | --------------------- |
| OpenAI      | Alta      | Anthropic, Gemini     |
| Supabase    | Critica   | Self-hosted Postgres  |
| Vercel      | Alta      | Cloudflare, Netlify   |
| Stripe      | Media     | PayPal, Mollie        |
| Google Maps | Bassa     | OpenStreetMap, Mapbox |

---

## 12. OFFLINE RESILIENCE

> **Principio:** Un ristorante non può fermarsi se internet cade.

### 12.1 Scenari Offline

| Scenario          | Frequenza  | Impatto    |
| ----------------- | ---------- | ---------- |
| WiFi locale down  | Comune     | Alto       |
| Problemi ISP      | Raro       | Molto alto |
| Supabase outage   | Molto raro | Critico    |
| Device senza rete | Comune     | Medio      |

### 12.2 Strategia PWA

**Service Worker Capabilities:**

```
CACHE FIRST (Sempre disponibili):
├── Menu completo
├── Immagini prodotti
├── Traduzioni
├── UI assets
└── Last-known prices

NETWORK FIRST (Preferisce aggiornato):
├── Ordini attivi
├── Disponibilità real-time
├── Promozioni
└── Analytics

OFFLINE FALLBACK:
├── Banner "Modalità offline"
├── Ordini salvati localmente
├── Sync automatico al ritorno online
└── Timestamp "Aggiornato X minuti fa"
```

### 12.3 Backoffice Offline

**Criticità:** Il backoffice è web-based, più complesso da rendere offline.

**Approccio pragmatico:**

- Dashboard: Cache ultimi dati (lettura)
- Ordini: Queue locale, sync al ritorno
- Menu edit: Sconsigliato offline (conflitti)
- AI Chat: Non disponibile offline

### 12.4 Comunicazione Stato

| Stato              | UI Feedback                          |
| ------------------ | ------------------------------------ |
| Online             | Nessun indicatore (default)          |
| Offline temporaneo | Toast giallo "Riconnessione..."      |
| Offline prolungato | Banner persistente + timestamp       |
| Sincronizzazione   | Spinner con "Aggiornamento in corso" |
| Errore sync        | Alert rosso + retry manuale          |

---

## 13. AI LIMITATIONS & EXPECTATIONS

> **Principio:** Meglio underpromise e overdeliver che il contrario.

### 13.1 Cosa l'AI Co-Manager PUÒ Fare

| Capability        | Affidabilità | Note                              |
| ----------------- | ------------ | --------------------------------- |
| Traduzioni menu   | Alta (95%+)  | Verificare termini tecnici locali |
| Daily briefing    | Alta         | Basato su dati storici reali      |
| Suggerimenti post | Media-Alta   | Richiede review umana             |
| Analisi trends    | Alta         | Dati oggettivi dal sistema        |
| Risposta FAQ      | Alta         | Su domande standard               |
| Alert proattivi   | Alta         | Soglie configurabili              |

### 13.2 Cosa l'AI Co-Manager NON PUÒ Fare (Ancora)

| Limitazione           | Perché                           | Workaround                     |
| --------------------- | -------------------------------- | ------------------------------ |
| Prenotazioni autonome | Richiede integrazione calendario | Suggerisce, umano conferma     |
| Gestione pagamenti    | Compliance, sicurezza            | Redirect a sistemi certificati |
| Risposte mediche      | Responsabilità legale (allergie) | "Verifica sempre con lo staff" |
| Predizioni revenue    | Troppi fattori esterni           | Range, non numeri precisi      |
| Ordini a fornitori    | Impatto economico diretto        | Bozza ordine, umano approva    |
| Risoluzione conflitti | Richiede empatia umana           | Escalation immediata           |

### 13.3 Gestione Aspettative Utente

**Onboarding messaging:**

- "AI Co-Manager è un assistente, non un sostituto"
- "Verifica sempre suggerimenti prima di agire"
- "L'AI impara dalle tue preferenze nel tempo"

**Error handling:**

- Quando AI non sa: "Non ho abbastanza dati per rispondere con sicurezza. Contatta [supporto/staff]"
- Mai inventare: Se non sa, dice "non so"
- Confidence score: Mostra livello di certezza quando appropriato

### 13.4 Roadmap AI Capabilities

```
ORA (v1):
└── Chat assistente, briefing, alert, traduzioni

PROSSIMO (v2):
└── Task delegation, workflow automation

FUTURO (v3+):
└── Customer-facing chat (con supervisione)
└── Predizioni avanzate
└── Integrazioni autonome (con approval)
```

---

## 14. MY OBSERVATIONS

### 14.1 Session Insights

#### 2026-01-08 - QR System Design

**Insight chiave:** QR Context Matrix

La distinzione tra QR contexts non è tecnica ma **operativa**:

- **Table QR** = cliente seduto → può ordinare
- **External QR** = cliente altrove → può solo vedere/prenotare

Perché importante: evita "ordini fantasma" da gente in metro che scansiona QR da Google Maps.

**Insight:** Multi-slot Delivery

Un locale può avere configurazioni delivery diverse per fascia oraria:

- 11:30-14:00: 2 rider, raggio 2km
- 15:00-16:30: 1 rider, raggio 1km
- Questo riflette disponibilità staff reale

**Insight:** AI Integration Points

L'AI può partecipare a QR workflow:

- Analizza performance per source
- Genera contenuti landing page
- Alert su cali performance
- Suggerisce ottimizzazioni

#### 2026-01-08 - PRODUCT.md Review (Gemini/ChatGPT)

**Feedback integrato:**

- Privacy by Design aggiunto ai principi
- Product Phasing (P0-P3) per evitare scope creep
- Pricing Philosophy con tier structure
- Integration Strategy con POS roadmap
- Offline Resilience per PWA
- AI Limitations chiariti (underpromise/overdeliver)
- Account unificato marcato come Future Bet

### 14.2 Research Findings

#### MenuTiger (2026-01-08)

- KDS è feature differenziante per loro
- QR customization è table stakes ormai
- Il loro pricing è alto → opportunità di undercut

### 14.3 Feature Ideas

| Idea               | Razionale                                | Priorità Stimata |
| ------------------ | ---------------------------------------- | ---------------- |
| "Rush Mode" UI     | Durante peak, UI semplificata al massimo | P2               |
| AI Coaching        | Tips contestuali per manager nuovi       | P3               |
| Predictive Prep    | AI suggerisce prep basata su storico     | P2               |
| Staff Gamification | Punti per performance, classifiche       | P3               |

### 14.4 Open Questions

- [x] ~~Quale pricing model (per-seat, per-order, flat)?~~ → Tiered Flat (Sezione 10)
- [ ] Come gestiamo chain con menu diversi per location?
- [ ] Qual è il limite di complessità UI accettabile durante rush?
- [ ] Come bilanciamo automazione AI vs controllo umano?

---

## APPENDIX: Evaluation Framework

### Per valutare una nuova feature:

```
1. OPERATIONAL FIT
   □ Funziona durante rush hour?
   □ Richiede training?
   □ Quanti tap per completare?

2. USER VALUE
   □ Chi ne beneficia? (Owner/Manager/Staff/Customer)
   □ Quanto frequentemente?
   □ Problema risolto è reale?

3. COMPETITIVE POSITION
   □ Competitor ce l'hanno?
   □ Ci differenzia?
   □ È table stakes o wow factor?

4. TECHNICAL FEASIBILITY
   □ Complessità implementazione?
   □ Dipendenze?
   □ Rischi tecnici?

5. BUSINESS VALUE
   □ Aumenta revenue?
   □ Riduce churn?
   □ Acquisition o retention?

6. STRESS TEST
   □ Cosa succede se usata male?
   □ Edge cases pericolosi?
   □ Recovery da errori?
```

---

**File:** `docs/PRODUCT.md`
**Version:** 1.1
**Created:** 2026-01-08
**Author:** Claude (con input da sessioni con Gianfranco)

**Changelog:**

- v1.1 (2026-01-08): Integrato feedback Gemini/ChatGPT
  - Privacy by Design nei principi
  - Famiglia con Bambini nelle personas
  - Product Phasing (P0-P3)
  - Pricing Philosophy (Sezione 10)
  - Integration Strategy (Sezione 11)
  - Offline Resilience (Sezione 12)
  - AI Limitations & Expectations (Sezione 13)
  - Account Unificato marcato come Future Bet
- v1.0 (2026-01-08): Versione iniziale
