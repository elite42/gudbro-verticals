# AI Weather & Seasonal Knowledge Base

> **Fonte:** Ricerca Claude + ChatGPT + Gemini (2026-01-13)
> **Scopo:** Knowledge base per AI Co-Manager - strategie weather e seasonal F&B
> **Versione:** 1.0

---

## 1. WEATHER IMPACT METRICS

### 1.1 Impatto su Canali di Vendita

| Condizione           | Delivery | Dine-In | Outdoor  | Note                                 |
| -------------------- | -------- | ------- | -------- | ------------------------------------ |
| Pioggia leggera      | +20-30%  | -10-15% | Chiuso   | Clienti 3x piu propensi a lamentarsi |
| Pioggia intensa      | +30-40%  | -20-30% | Chiuso   | Staff: +kitchen, -sala               |
| Neve/Blizzard        | +50-135% | -40-50% | Chiuso   | Pizza +135% (NY 2015 data)           |
| Freddo (<5C)         | +20-30%  | +5%     | Chiuso   | Comfort food demand                  |
| Caldo (>30C)         | +15-25%  | -10-20% | Limitato | Peak si sposta a sera                |
| Caldo estremo (>35C) | +25-35%  | -25-35% | Chiuso   | Bevande fredde priority              |
| Bel tempo (18-28C)   | -10%     | +15-20% | Aperto   | Aperitivo season                     |
| Umidita >80%         | +15-25%  | -10%    | Limitato | No fritture (perdono croccantezza)   |

### 1.2 Temperature Soglia per Decisioni

| Soglia  | Azione                                         |
| ------- | ---------------------------------------------- |
| < 5°C   | Attiva menu comfort, zuppe, bevande calde      |
| < 15°C  | Switch vini: privilegia rossi strutturati      |
| 18-28°C | Zona ottimale outdoor, aperitivo promo         |
| > 25°C  | Switch beverage: freddi/mocktail in cima menu  |
| > 30°C  | Attiva promo bevande, piatti leggeri           |
| > 35°C  | Emergenza caldo: chiudi outdoor, push delivery |

---

## 2. MARKETING WEATHER-TRIGGERED

### 2.1 Campagne per Tipo Meteo

#### Pioggia

- **Nome:** "Rainy Day Deals", "Umbrella Special"
- **Copy:** "Fuori piove, dentro si mangia meglio"
- **Timing:** 60-120 min prima del picco pioggia
- **Offerta:** Sconto a chi arriva bagnato, comfort food bundle

#### Freddo

- **Nome:** "Winter Comfort Bowl", "Soup & Soul"
- **Copy:** "Scaldati con noi"
- **Timing:** Mattino per pranzo, pomeriggio per cena
- **Offerta:** Piatti caldi + bevanda inclusa

#### Caldo

- **Nome:** "Heatwave Happy Hour", "No-Cook Day"
- **Copy:** "Non cucinare, ci pensiamo noi"
- **Timing:** 14:00-18:00
- **Offerta:** Bevande fredde + piatti leggeri

#### Umido/Afa

- **Nome:** "Fresh & Light Picks", "Hydration Menu"
- **Copy:** "Fresco e leggero"
- **Offerta:** Bowl, crudi, citrus, te freddi

### 2.2 Regole Marketing per AI

```
RULE: promo_duration_max = 6 hours
RULE: copy_max_words = 12
RULE: promo_trigger_rain = forecast_rain_2h_ahead
RULE: promo_trigger_heat = temp > 30C
RULE: promo_channels_priority = ["push_app", "sms", "instagram_stories", "whatsapp"]
```

---

## 3. PSICOLOGIA COMFORT FOOD

### 3.1 Mapping Meteo -> Desideri

| Meteo   | Desiderio                 | Categorie             | Esempi                     |
| ------- | ------------------------- | --------------------- | -------------------------- |
| Freddo  | Grassi, amidi, calore     | Zuppe, stufati, pasta | Ramen, lasagne, mac&cheese |
| Pioggia | Coccola, nostalgia        | Comfort classici      | Curry, risotto, dolci      |
| Caldo   | Fresco, acido, leggero    | Insalate, crudi       | Ceviche, poke, yogurt      |
| Umido   | Digestivo, rinfrescante   | Speziato leggero      | Pho, citrus dishes, menta  |
| Neve    | Ultra-comfort, indulgenza | Gratinati, formaggi   | Fondue, gratin, cioccolata |

### 3.2 Struttura Suggerimenti Menu

Per ogni condizione meteo, suggerire:

1. **1 Piatto Eroe** - Margine alto, fotografabile
2. **2 Alternative Sicure** - Per gusti diversi
3. **1 Comfort Add-on** - Pane, dolce, bevanda (upsell)

### 3.3 Regole per AI

```
RULE: meteo_negativo -> spingi_piatti_emotivi
RULE: meteo_estremo -> riduci_scelte (max 3-4 opzioni, decision fatigue)
RULE: sempre_associare_comfort + upsell
RULE: umidita_alta -> no_fritture_in_evidenza
```

---

## 4. STAFF SCHEDULING WEATHER-BASED

### 4.1 Timeline Decisioni

| Momento      | Azione                             |
| ------------ | ---------------------------------- |
| 24-36h prima | Decisione staff basata su forecast |
| 6-8h prima   | Revisione finale                   |
| 2h prima     | Conferma o on-call activation      |

### 4.2 Adjustment Guidelines

| Condizione      | Sala    | Kitchen | Delivery | Bar  |
| --------------- | ------- | ------- | -------- | ---- |
| Pioggia intensa | -20-30% | +10-15% | +15-20%  | -10% |
| Caldo estremo   | -10-20% | =       | +10%     | +10% |
| Bel tempo       | +10%    | +5%     | -10%     | +20% |
| Neve            | -40-50% | +20%    | +30%     | -20% |

### 4.3 Regole per AI

```
RULE: mai_tagliare_oltre_30%_senza_backup
RULE: staff_chiave_sempre_coperto (chef, manager)
RULE: meteo_incerto -> attiva_on_call_shift
RULE: staff_mandato_casa -> offri_turno_compensativo_7gg
```

---

## 5. GESTIONE UMORE CLIENTE

### 5.1 Bad Weather Protocol

Il cliente arriva gia stressato. Anticipare l'attrito.

#### Prevenzione

- Accoglienza piu calorosa (+sorriso, +eye contact)
- Servizio piu rapido (-15% tempo attesa target)
- Ambiente adattato (musica soft, luce calda)

#### Tocchi Speciali "Bad Weather Days"

- Mini amuse-bouche gratuito
- Bevanda calda di benvenuto (te, brodo)
- "Sorry weather treat" (biscotto, shot, cioccolatino)
- Salviette calde

### 5.2 Regole per AI

```
RULE: pioggia -> aumenta_gesti_gratuiti_low_cost
RULE: attesa_percepita -> riduci_con_comunicazione_proattiva
RULE: empower_staff -> risolvi_complaint_subito (budget €5/cliente)
RULE: meteo_negativo -> reminder_staff_briefing_pre_servizio
```

---

## 6. DYNAMIC PRICING

### 6.1 Principi F&B (Non e Uber!)

- **MAI** aumentare prezzi base in sala
- **MAI** usare la parola "surge"
- **SEMPRE** spiegare il perche
- **PREFERIRE** bundle a surcharge singolo

### 6.2 Strategie Accettabili

| Strategia               | Esempio                          | Accettabilita    |
| ----------------------- | -------------------------------- | ---------------- |
| Weather Fee trasparente | "Rainy Day Packaging Fee €1.50"  | OK se comunicato |
| Bundle premium          | "Storm Menu" con extra inclusi   | Ottimo           |
| Menu speciale           | Piatti premium weather-themed    | Ottimo           |
| Surge nascosto          | Aumento prezzi senza spiegazione | MAI              |

### 6.3 Regole per AI

```
RULE: price_increase_max_perceived = 8%
RULE: preferire_bundle_a_surcharge
RULE: comunicazione_trasparente_sempre
RULE: delivery_fee_weather -> max €2.00 extra
```

---

## 7. VARIAZIONI REGIONALI

### 7.1 Pattern per Regione

| Regione             | Driver Principale   | Focus F&B                          | Stagioni    |
| ------------------- | ------------------- | ---------------------------------- | ----------- |
| Europa/Nord America | Temperatura & Luce  | Comfort (inverno), fresco (estate) | 4 classiche |
| Sud-Est Asiatico    | Monsoni (Rainy/Dry) | Piccante per umidita, idratazione  | 2 (wet/dry) |
| Giappone/Corea      | Micro-stagionalita  | Estetica, ingredienti "shun"       | 24 (sekki)  |
| Tropicale           | Umidita & Piogge    | Speziato, cocco, succhi            | Wet/Dry     |

### 7.2 Focus Vietnam (Mercato GUDBRO)

| Evento          | Timing             | Impatto                     | Azione AI                            |
| --------------- | ------------------ | --------------------------- | ------------------------------------ |
| Tet (Capodanno) | Gen-Feb (lunare)   | Supply chain ferma 7-10gg   | Stock extra 3 settimane prima        |
| Monsone Sud     | Mag-Nov            | Delivery +40%, dine-in -30% | Bundle comfort, packaging waterproof |
| Monsone Nord    | Mag-Set            | Simile ma meno intenso      | Adatta per location                  |
| Mid-Autumn      | Settembre (lunare) | Mooncake season             | Menu speciale, pre-ordini            |

### 7.3 Focus Thailandia

| Evento        | Timing  | Impatto                        | Azione AI                     |
| ------------- | ------- | ------------------------------ | ----------------------------- |
| Songkran      | Aprile  | Chiusure, feste                | Menu take-away, staff ridotto |
| Durian Season | Apr-Giu | Flussi turistici, dessert boom | Feature durian desserts       |
| Monsone       | Giu-Ott | Delivery spike                 | Comfort bundles               |

### 7.4 Focus Indonesia

| Evento  | Timing             | Impatto               | Azione AI                    |
| ------- | ------------------ | --------------------- | ---------------------------- |
| Ramadan | Variabile (lunare) | Orari spostati a sera | Promo Iftar, menu energetico |
| Lebaran | Fine Ramadan       | Chiusure 1 settimana  | Stock pre-evento             |
| Monsone | Nov-Mar            | Delivery peak         | Packaging anti-umidita       |

---

## 8. CALENDARIO FESTIVITA GLOBALI

### 8.1 Eventi Alto Impatto F&B

| Evento           | Periodo   | Regioni                    | Lead Time | Azione AI                       |
| ---------------- | --------- | -------------------------- | --------- | ------------------------------- |
| Capodanno Cinese | Gen-Feb   | Asia, global               | 30 giorni | Set menu gruppi, stock secco    |
| Ramadan          | Variabile | MENA, Indonesia, EU cities | 14 giorni | Menu Iftar, orari serali        |
| Pasqua           | Mar-Apr   | Europa, Americas           | 21 giorni | Brunch menu, dolci tradizionali |
| Thanksgiving     | Novembre  | USA, Canada                | 28 giorni | Catering, pre-ordini            |
| Natale           | Dicembre  | Global (non Asia)          | 28 giorni | Set menu, party booking         |
| Capodanno        | 31 Dic    | Global                     | 14 giorni | Menu speciale, champagne stock  |

### 8.2 Regole per AI

```
RULE: evento_group_dining -> suggerisci_landing_page_prenotazioni 30gg prima
RULE: evento_chiusura_fornitori -> alert_stock 21gg prima
RULE: ramadan -> sposta_promo_a_tramonto
RULE: festivita_occidentale_in_asia -> impatto_ridotto (considera location)
```

---

## 9. BEVERAGE PROGRAM STAGIONALE

### 9.1 Cocktail per Stagione

| Stagione  | Profilo                | Ingredienti                | Esempi                               |
| --------- | ---------------------- | -------------------------- | ------------------------------------ |
| Primavera | Floreale, fresco       | Botaniche, fiori, agrumi   | Gin tonic elderflower, Hugo          |
| Estate    | Rinfrescante, fruttato | Frutta a nocciolo, menta   | Mojito, Aperol Spritz, Frozen        |
| Autunno   | Speziato, caldo        | Mela, cannella, zucca      | Apple cider cocktail, Pumpkin spice  |
| Inverno   | Ricco, warming         | Spezie calde, bourbon, rum | Hot toddy, Mulled wine, Irish coffee |

### 9.2 Coffee Program

| Condizione   | Focus  | Suggerimenti                          |
| ------------ | ------ | ------------------------------------- |
| Temp > 25°C  | Freddi | Cold brew nitro, iced latte, affogato |
| Temp 15-25°C | Mix    | Sia caldi che freddi in evidenza      |
| Temp < 15°C  | Caldi  | Cappuccino, latte speziati, mocha     |

### 9.3 Wine Pairing Temperature-Based

| Temperatura | Stile Vino                        | Esempi                              |
| ----------- | --------------------------------- | ----------------------------------- |
| > 25°C      | Bianchi minerali, Rose, Bollicine | Vermentino, Provence Rose, Prosecco |
| 15-25°C     | Mix equilibrato                   | Sia bianchi che rossi leggeri       |
| < 15°C      | Rossi strutturati                 | Barolo, Amarone, Bordeaux           |

### 9.4 Regole per AI

```
RULE: temp > 25C -> posiziona_mocktail_e_bianchi_in_cima_menu
RULE: temp < 15C -> evidenzia_rossi_e_bevande_calde
RULE: stagione_cambio -> suggerisci_cocktail_menu_refresh
```

---

## 10. SUPPLY CHAIN STAGIONALE

### 10.1 Ingredienti Critici

| Ingrediente     | Picco Prezzo | Causa                 | Strategia AI                 |
| --------------- | ------------ | --------------------- | ---------------------------- |
| Avocado         | Mag-Lug      | Transizione Messico   | Suggerisci hummus, edamame   |
| Gamberi         | Variabile    | Fermo pesca, tempeste | "Catch of the day" variabile |
| Frutti di bosco | Nov-Mar      | Fuori stagione        | Conserve, fermentazioni      |
| Pomodori        | Nov-Feb      | Serra, import         | Passata, pelati              |
| Burro           | Variabile    | Commodity trend       | Bulk purchase se trend up    |

### 10.2 Regole per AI

```
RULE: ingrediente_chiave_price > +15%_media_annuale -> alert_menu_engineering
RULE: suggerisci_riduzione_porzione OR cambio_ingrediente
RULE: trend_commodity_up -> suggerisci_acquisto_bulk
RULE: catch_of_day -> menu_variabile (no fisso per seafood volatile)
```

---

## 11. SOCIAL MEDIA CONTENT STAGIONALE

### 11.1 Visual Strategy

| Stagione  | Luce             | Styling                 | Contenuto                              |
| --------- | ---------------- | ----------------------- | -------------------------------------- |
| Inverno   | Calda, soffusa   | Legno, velluto, vapore  | Slow motion vapore, texture avvolgenti |
| Primavera | Naturale morbida | Fiori, colori pastello  | Fresh ingredients, plating colorato    |
| Estate    | Naturale "hard"  | Ghiaccio, colori saturi | Macro ghiaccio, freschezza             |
| Autunno   | Golden hour      | Foglie, zucche, terroso | Ingredienti stagionali, cozy vibes     |

### 11.2 Regole per AI

```
RULE: genera_3_hook_per_ingrediente_del_mese
RULE: esempio_hook: "La stagione degli asparagi e arrivata: scopri il nostro risotto limited edition"
RULE: hashtag_stagionali: #PumpkinSpice (autunno), #SummerVibes (estate)
```

---

## 12. QUICK REFERENCE - REGOLE AI AGGREGATE

### Temperature Triggers

```json
{
  "cold_extreme": {
    "temp_max": 5,
    "actions": ["comfort_menu", "hot_drinks", "soup_promo"]
  },
  "cold": {
    "temp_min": 5,
    "temp_max": 15,
    "actions": ["red_wine_priority", "warm_dishes"]
  },
  "optimal": {
    "temp_min": 18,
    "temp_max": 28,
    "actions": ["outdoor_seating", "aperitivo_promo"]
  },
  "hot": {
    "temp_min": 28,
    "temp_max": 35,
    "actions": ["cold_drinks_top", "light_dishes", "evening_peak"]
  },
  "hot_extreme": {
    "temp_min": 35,
    "actions": ["delivery_push", "close_outdoor", "hydration_focus"]
  }
}
```

### Weather Condition Triggers

```json
{
  "rain_light": {
    "delivery_boost": 0.25,
    "dine_in_drop": 0.12,
    "actions": ["comfort_promo"]
  },
  "rain_heavy": {
    "delivery_boost": 0.4,
    "dine_in_drop": 0.25,
    "staff_adjust": { "kitchen": 1.15, "sala": 0.75 }
  },
  "snow": {
    "delivery_boost": 0.8,
    "dine_in_drop": 0.45,
    "actions": ["ultra_comfort", "hot_drinks"]
  },
  "humidity_high": {
    "threshold": 80,
    "actions": ["no_fried_highlight", "warming_dishes", "light_spicy"]
  }
}
```

### Timing Rules

```json
{
  "promo_trigger": { "rain_forecast_hours_ahead": 2, "heat_threshold": 30 },
  "staff_decision": { "primary_hours_ahead": 30, "revision_hours_ahead": 7 },
  "event_prep": { "group_dining_days_ahead": 30, "supply_chain_days_ahead": 21 }
}
```

---

## 13. IMPLEMENTATION NOTES

### Per Weather Service (gia implementato)

- `calculateBusinessImpact()` usa queste regole
- Aggiungere temperature thresholds piu granulari
- Integrare humidity check

### Per AI Chat Context

- Includere weather summary + recommended actions
- Usare mapping comfort food per suggerimenti

### Per Trigger Engine

- Creare triggers weather-based automatici
- Integrare con marketing automation

### Per Menu Management

- Dynamic menu ordering basato su temperatura
- Seasonal rotation suggestions

---

**File:** `docs/features/AI-WEATHER-SEASONAL-KNOWLEDGE.md`
**Version:** 1.0
**Created:** 2026-01-13
**Sources:** Claude research + ChatGPT playbook + Gemini regional insights
