# Food Costing Knowledge Base

> **Per AI Co-Manager** - Conoscenza di dominio per educare e assistere i ristoratori
>
> **Fonti:** Ricerca Gemini + ChatGPT (Gennaio 2026)
> **Uso:** Training AI, suggerimenti proattivi, onboarding manager

---

## 1. COMPONENTI DEL COSTO REALE

### Full Plate Cost (Costo Pieno del Piatto)

| Componente       | Descrizione                                                      | Tracciato?              |
| ---------------- | ---------------------------------------------------------------- | ----------------------- |
| **Food Cost**    | Ingredienti, condimenti, spezie, perdite cottura, scarti pulizia | ✅ Quasi sempre         |
| **Labor Cost**   | Prep time, cooking time, impiattamento, lavaggio                 | ❌ Quasi mai per piatto |
| **Energia**      | Gas, elettricità, forni, piastre, frigo                          | ❌ Solo come overhead   |
| **Packaging**    | Contenitori, shopper, posate (delivery)                          | ⚠️ Spesso sottostimato  |
| **Waste/Scarti** | Invenduto, errori, ritorni, overproduction                       | ❌ Solo cucine mature   |
| **Commissioni**  | Delivery platform (20-35%), POS (1-2%)                           | ❌ Raramente per piatto |
| **Overhead**     | Affitto, attrezzature, software, assicurazioni                   | ❌ Mai per piatto       |

### Verità Brutale

> **Il 90% dei ristoranti calcola SOLO il food cost ingredienti**
> e prende decisioni su dati incompleti.

---

## 2. FORMULE STANDARD

### Food Cost %

```
Food Cost % = (Costo ingredienti / Prezzo vendita netto IVA) × 100
```

**Esempio:**

- Costo ingredienti: €4.00
- Prezzo vendita: €15.00
- IVA 10% scorporata: €13.64 netto
- **Food Cost % = 29.3%**

### Labor Cost per Piatto

```
Labor Cost = (Costo orario staff / 60) × minuti lavoro
```

**Esempio:**

- Cuoco: €15/h
- Tempo prep+cooking: 8 min
- **Labor Cost = €2.00**

### Full Plate Cost (Delivery)

```
Food + Labor + Packaging + Commissioni + Quota Overhead
```

**Esempio reale delivery:**
| Voce | Costo |
|------|-------|
| Ingredienti | €4.50 |
| Labor | €2.00 |
| Packaging | €1.20 |
| Commissione delivery (30%) | €4.50 |
| Quota overhead | €1.00 |
| **TOTALE** | **€13.20** |

→ Prezzo vendita €15 = **profitto quasi zero**

> ⚠️ Questo è il motivo per cui "vendiamo tanto ma non guadagniamo"

---

## 3. BENCHMARK DI SETTORE

### Food Cost % Target

| Tipo Ristorante | Target |
| --------------- | ------ |
| Fast Food       | 25-30% |
| Casual Dining   | 28-35% |
| Fine Dining     | 30-40% |
| Pizzeria        | 20-28% |

### Labor Cost % Target

| Tipo          | Target |
| ------------- | ------ |
| Fast Food     | 20-25% |
| Casual Dining | 25-30% |
| Fine Dining   | 30-35% |

### Prime Cost (Food + Labor) - KPI SACRO

| Livello         | Prime Cost |
| --------------- | ---------- |
| **Ottimo**      | < 55%      |
| **Accettabile** | 55-60%     |
| **Pericoloso**  | > 65%      |

---

## 4. MENU ENGINEERING (Matrice BCG)

### Classificazione Piatti

| Categoria         | Margine | Vendite | Azione                             |
| ----------------- | ------- | ------- | ---------------------------------- |
| ⭐ **Stars**      | Alto    | Alte    | Mantieni qualità, non toccare      |
| ❓ **Puzzles**    | Alto    | Basse   | Promuovi, cambia nome, forma staff |
| 🐴 **Plowhorses** | Basso   | Alte    | Alza prezzo o riduci porzione      |
| 💀 **Dogs**       | Basso   | Basse   | **Rimuovi dal menu**               |

### Regola d'Oro

> Un piatto con food cost basso ma labor altissimo = **falso profitto**
>
> Il software DEVE mostrare entrambi.

---

## 5. PRASSI REALE (Pain Points)

### Cosa Tracciano DAVVERO

- ✅ Food cost ingredienti (base)
- ✅ Fatturato giornaliero
- ✅ Costi staff mensili
- ✅ Acquisti fornitori

### Cosa NON Tracciano

- ❌ Labor per piatto
- ❌ Scarti reali
- ❌ Margine per canale (dine-in vs delivery)
- ❌ Tempo reale di prep
- ❌ Profitto per piatto
- ❌ Calo peso in cottura (carne perde 20-30%)
- ❌ Variazioni prezzo fornitori

### Perché Non Tracciano

- "Non ho tempo"
- "È troppo complicato"
- "Vado a sensazione"
- "Lo facciamo da 20 anni così"

### Pain Points Enormi

1. **Non so quali piatti mi fanno perdere soldi**
2. **Delivery sembra profittevole ma non lo è**
3. **Aumenti prezzi ingredienti non riflessi nel menu**
4. **Menu troppo grande, margini bassi**
5. **Data entry noioso** (inserire fatture)
6. **Dati frammentati** (magazzino non parla con POS)

---

## 6. TEMPO DI PREPARAZIONE

### Standard Operativi (Best Practice)

| Complessità      | Tempo     |
| ---------------- | --------- |
| Piatto semplice  | 3-5 min   |
| Piatto medio     | 6-9 min   |
| Piatto complesso | 10-15 min |

### Approccio Consigliato: Costing per Fase

1. **Mise en place (Batch):** Tempo per preparare X kg di ingrediente → costo spalmato su N piatti
2. **Assemblaggio (On-demand):** Tempo per cuocere e impiattare singolo ordine

---

## 7. COSTI NASCOSTI

### Scarto Tecnico vs Operativo

| Tipo                 | Descrizione                     | Prevedibilità |
| -------------------- | ------------------------------- | ------------- |
| **Scarto tecnico**   | Bucce, ossa, grasso, pulizia    | Prevedibile   |
| **Scarto operativo** | Piatti rifatti, errori, scaduto | Imprevedibile |

### Calo Peso Cottura

- Carne: **20-30%** di perdita peso
- Quasi nessuno ne tiene conto nel costo porzione finale

### Commissioni Platform

| Platform         | Commissione |
| ---------------- | ----------- |
| Delivery apps    | 20-35%      |
| Carte di credito | 1-3%        |

---

## 8. VARIANZA: LA METRICA CHIAVE

```
Varianza = Food Cost Teorico (Ricette) - Food Cost Reale (Acquisti/Inventario)
```

### Interpretazione

| Varianza     | Significato                                  |
| ------------ | -------------------------------------------- |
| Bassa (< 2%) | Controllo eccellente                         |
| Media (2-5%) | Normale, monitorare                          |
| Alta (> 5%)  | Problema: furti, sprechi, porzioni eccessive |

### Messaggio AI Vincente

> "Hai perso €400 questo mese in gamberetti che non risultano venduti"
>
> Un software che dice questo **si ripaga da solo**.

---

## 9. OPPORTUNITÀ SOFTWARE (Gap di Mercato)

### Cosa Fanno Bene i Competitor

- ✅ Food costing ingredienti
- ✅ Magazzino
- ✅ Ordini fornitori
- ✅ Gestione allergeni

### Cosa Manca (Nostra Opportunità)

1. **OCR Fatture** - Scatto foto → aggiorna food cost automaticamente
2. **Labor per piatto** - Stima tempo prep e cooking
3. **Margine per canale** - Dine-in vs Delivery vs Takeaway
4. **Tracking sprechi semplificato** - "10 piatti buttati" → aggiorna costo reale
5. **Predizione AI** - "Pomodori saliranno, aumenta bruschetta di €0.50"
6. **Alert automatici** - "Questo piatto ti sta fregando"
7. **Weather-aware costing** - Demand prediction

---

## 10. SOTTO-RICETTE E STRUTTURA DATI

### Concetto Chiave

Una **salsa base** usata in 10 piatti diversi deve essere:

1. Definita UNA volta con costi e tempi
2. Referenziata come componente nelle ricette
3. Aggiornata automaticamente quando cambiano ingredienti

### Struttura Consigliata

```
recipes (piatto finale)
  └── recipe_components (link a sotto-ricette o ingredienti)
       ├── sub_recipes (salse, basi, marinature)
       │    └── sub_recipe_ingredients
       └── ingredients (ingredienti diretti)
```

---

## 11. MESSAGGI AI PER EDUCAZIONE

### Onboarding Food Cost

> "Sai che il 90% dei ristoranti calcola solo il costo ingredienti?
> Con GUDBRO puoi vedere il **vero margine** includendo tempo, packaging e commissioni."

### Alert Margine Basso

> "Il tuo **Burger Deluxe** ha un food cost del 28% ma il labor cost aggiunge un altro 15%.
> Margine reale: solo 12%. Considera di aumentare il prezzo di €1.50."

### Opportunità Menu Engineering

> "Hai 3 piatti **Dogs** (basso margine + basse vendite): Insalata Cesar, Soup del Giorno, Carpaccio.
> Rimuovendoli liberi spazio menu per promuovere i tuoi **Puzzles** ad alto margine."

### Varianza Alert

> "Questo mese hai usato €340 di salmone in più rispetto al venduto.
> Possibili cause: porzioni troppo grandi, scarti, o errori di inventario."

### Delivery Profit Reality

> "Il tuo **Poke Bowl** a €14 sembra profittevole (food cost 25%).
> Ma con commissioni delivery 30% + packaging €1.80, il margine reale è solo €0.70."

---

## 12. GAMIFICATION DATA ENTRY

### Problema

Inserire ingredienti e pesi è noioso. Il manager non lo fa.

### Soluzione

1. **Progress bar visibile** - "Menu completato al 65%"
2. **Feature locking** - "Sblocca Menu Engineering inserendo i costi"
3. **Quick wins** - "Inserisci 5 piatti oggi e scopri il tuo margine medio"
4. **Delegation** - Account chef con permessi limitati per inserimento

### Messaggio Motivazionale

> "Investire 2 ore con il tuo chef per inserire i dati corretti
> può farti scoprire €500/mese di margine nascosto."

---

**File:** `docs/knowledge/FOOD-COSTING-KNOWLEDGE.md`
**Version:** 1.0
**Created:** 2026-01-14
**Source:** Gemini + ChatGPT research synthesis
