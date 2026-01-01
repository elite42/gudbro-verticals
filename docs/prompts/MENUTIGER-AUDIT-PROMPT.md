# Prompt Audit MenuTiger Backoffice

> **Copia questo prompt in Claude Browser (Opus 4.5)**
>
> Hai accesso al backoffice di MenuTiger - naviga e documenta tutto

---

## PROMPT DA COPIARE

```
Sei un esperto UX/UI e product analyst. Esegui un audit completo del backoffice di MenuTiger (menu.tiger), competitor diretto nel settore QR menu digitali per ristorazione.

## CONTESTO
Sto sviluppando GudBro, una piattaforma di digital menu con QR code per ristoranti. MenuTiger è un competitor diretto. Ho bisogno di un'analisi dettagliata per:
1. Capire cosa funziona bene (da replicare)
2. Identificare punti deboli (opportunità per GudBro)
3. Mappare tutte le funzionalità

## ISTRUZIONI DI NAVIGAZIONE

Naviga sistematicamente attraverso OGNI sezione del backoffice. Per ogni area:
- Fai screenshot mentali dettagliati
- Documenta ogni campo, bottone, opzione
- Nota i micro-interactions (hover, loading, feedback)
- Identifica features premium vs free

---

## SEZIONI DA ANALIZZARE

### 1. DASHBOARD PRINCIPALE
- Quali metriche mostrano? (visite, ordini, revenue?)
- Layout delle cards/widgets
- Grafici disponibili
- Filtri temporali (oggi, settimana, mese?)
- Quick actions visibili
- Notifiche/alert

### 2. GESTIONE MENU
- Come si crea una categoria?
- Come si aggiunge un prodotto?
- Campi prodotto:
  - Nome (multilingua?)
  - Descrizione
  - Prezzo (varianti?)
  - Immagine (dimensioni, formati)
  - Allergeni
  - Modificatori/addon
  - Disponibilità/scheduling
- Ordinamento items (drag & drop?)
- Duplicazione prodotti
- Import/export menu

### 3. QR CODE MANAGEMENT
- Tipi di QR generabili
- Personalizzazione QR (colori, logo?)
- QR per tavolo singolo vs generale
- Download formati (PNG, SVG, PDF?)
- Tracking scansioni per QR

### 4. DESIGN & PERSONALIZZAZIONE
- Temi disponibili
- Colori personalizzabili
- Logo upload
- Font options
- Layout menu (lista, griglia, cards?)
- Preview live?
- CSS custom?

### 5. ORDINI (se presente)
- Vista ordini real-time
- Stati ordine
- Notifiche (suono, push?)
- Gestione tavoli
- Stampa comande
- Storico ordini

### 6. ANALYTICS
- Metriche disponibili:
  - Visite menu
  - Prodotti più visti
  - Tempo su pagina
  - Device breakdown
  - Orari di punta
- Export dati
- Grafici interattivi

### 7. CLIENTI/CRM
- Raccolta dati cliente
- Database clienti
- Segmentazione
- Marketing (email, SMS?)
- Feedback/recensioni

### 8. MULTI-LOCATION
- Gestione più sedi
- Menu condivisi vs separati
- Prezzi per location
- Staff per location

### 9. INTEGRAZIONI
- POS systems
- Delivery platforms
- Payment gateways
- Social media
- Google Business

### 10. IMPOSTAZIONI
- Profilo ristorante
- Orari apertura
- Lingue supportate
- Valute
- Tasse/IVA
- Metodi pagamento

### 11. TEAM & PERMESSI
- Ruoli disponibili
- Invito membri
- Permessi granulari
- Activity log

### 12. BILLING & PIANI
- Piani disponibili (nomi, prezzi)
- Features per piano
- Limiti (prodotti, QR, visite)
- Trial period
- Upgrade flow

### 13. TRADUZIONI
- Lingue supportate
- Come si traducono i menu?
- Traduzione automatica?
- Switch lingua cliente

### 14. MOBILE EXPERIENCE
- App nativa o PWA?
- Responsive backoffice?
- Funzionalità offline?

---

## OUTPUT RICHIESTO

Produci un report strutturato così:

### A. EXECUTIVE SUMMARY
- 5 punti di forza principali
- 5 punti deboli/opportunità
- Target user (piccolo ristorante vs catena)
- Pricing positioning

### B. FEATURE MATRIX
Tabella con tutte le funzionalità trovate:

| Categoria | Feature | Disponibile | Piano | Note |
|-----------|---------|-------------|-------|------|
| Menu | Prodotti illimitati | ✅ | Pro | ... |
| ... | ... | ... | ... | ... |

### C. UX ANALYSIS
Per ogni sezione principale, valuta (1-10):
- Facilità d'uso
- Design visivo
- Completezza
- Performance

### D. SCREENSHOTS DESCRITTI
Per le schermate più importanti, descrivi:
- Layout generale
- Elementi UI principali
- Colori e stile
- Cosa funziona/non funziona

### E. RACCOMANDAZIONI PER GUDBRO

**DA COPIARE:**
- Feature che funzionano bene
- Pattern UX efficaci
- Decisioni di design smart

**DA EVITARE:**
- UX confusa
- Feature mal implementate
- Errori di design

**DA MIGLIORARE:**
- Dove possiamo fare meglio
- Feature mancanti che possiamo aggiungere
- Differenziatori potenziali

### F. PRICING ANALYSIS
- Piani e prezzi
- Value proposition per piano
- Confronto con mercato
- Suggerimenti pricing GudBro

---

## NOTE IMPORTANTI

1. Sii MOLTO dettagliato - ogni campo, ogni bottone
2. Nota le micro-interactions (animazioni, feedback)
3. Testa i flussi completi (crea prodotto, genera QR, etc.)
4. Controlla la documentazione/help
5. Valuta l'onboarding (prima esperienza)
6. Cerca easter eggs o feature nascoste
7. Nota cosa richiede upgrade a piano superiore

Pronto? Inizia la navigazione sistematica del backoffice MenuTiger.
```

---

## DOPO L'AUDIT

Salva il report in: `docs/competitor-audits/MENUTIGER-AUDIT-REPORT.md`

---

**File:** `docs/prompts/MENUTIGER-AUDIT-PROMPT.md`
