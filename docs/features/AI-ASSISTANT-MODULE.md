# AI Assistant Module

**Status:** Design Phase
**Created:** 2026-01-19
**Last Updated:** 2026-01-19
**Priority:** P1 (High Value Feature)

---

## Executive Summary

Il modulo AI Assistant è un **orchestratore intelligente** che aiuta i manager di ristoranti a sfruttare le migliori AI sul mercato senza dover essere esperti di prompt engineering.

**Value Proposition:**

- Manager risparmia **tempo** (prompt già ottimizzati)
- Manager risparmia **denaro** (usa free tier delle AI esterne)
- Manager ottiene **risultati professionali** (prompt di qualità = output di qualità)
- GUDBRO si **differenzia** dalla concorrenza

---

## Problem Statement

### Pain Points dei Manager

| Problema                            | Impatto                                |
| ----------------------------------- | -------------------------------------- |
| Non sanno scrivere prompt efficaci  | Risultati AI mediocri o inutilizzabili |
| Devono assumere designer/freelancer | Costo €50-200 per immagine promo       |
| Onboarding menu lento               | Giorni per inserire menu manualmente   |
| Foto prodotti di bassa qualità      | Immagine non professionale del locale  |
| Non conoscono i tool giusti         | Tempo perso a cercare/provare          |

### Perché Non Costruiamo AI Interna

| Approccio             | Problema                                                            |
| --------------------- | ------------------------------------------------------------------- |
| API Midjourney/DALL-E | €0.02-0.20 per immagine × migliaia di clienti = costi insostenibili |
| Modello custom        | Mesi di sviluppo, competenze ML, infrastruttura                     |
| One-size-fits-all     | Qualità inferiore ai tool specializzati                             |

### La Nostra Soluzione

**Essere il "cervello" che orchestra, non il "muscolo" che esegue.**

GUDBRO genera prompt perfetti → Manager usa free tier AI esterne → Risultato professionale a costo zero

---

## Vision

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│    "Trasformiamo ogni manager in un power user dell'AI,         │
│     senza che debba imparare nulla di tecnico"                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Principi Guida

1. **Zero Learning Curve** - Il manager seleziona opzioni, non scrive prompt
2. **Best Tool for the Job** - Raccomandiamo l'AI giusta per ogni task
3. **Context-Aware** - Prompt pre-popolati con dati del locale
4. **Copy-Paste Ready** - Output immediato, nessuna modifica necessaria
5. **Import Pipeline** - Risultati AI tornano in GUDBRO facilmente

---

## Use Cases

### UC-1: Generazione Immagini Promozionali

**Scenario:** Manager crea promozione Happy Hour e serve immagine accattivante

**Flow:**

```
1. Manager crea promozione nel backoffice
2. Sistema suggerisce "Genera immagine per questa promo"
3. Manager seleziona:
   - Emozioni da evocare (urgenza, convivialità, appetito)
   - Formato (1:1 Instagram, 16:9 banner, 9:16 story)
   - Stile (già pre-impostato dal brand)
4. Click "Genera Prompt"
5. Sistema mostra:
   - Prompt ottimizzato
   - Link diretto a Midjourney/Leonardo/DALL-E
   - Guida rapida (30 sec) su come usare il tool
6. Manager genera immagine nel tool esterno
7. Torna e uploada → immagine collegata alla promo
```

**Input Automatici (dal sistema):**

- Nome locale
- Colori brand (hex)
- Stile locale (rustico, moderno, elegante...)
- Tipo promozione
- Prodotti coinvolti
- Orari/date

**Input Manuali (dal manager):**

- 2-3 emozioni target
- Formato output
- Elementi specifici da includere (opzionale)

---

### UC-2: Estrazione Menu da PDF/Foto

**Scenario:** Nuovo cliente vuole migrare menu esistente in GUDBRO

**Flow:**

```
1. Manager accede a "Importa Menu Esistente"
2. Carica PDF o foto del menu cartaceo
3. Sistema genera prompt ottimizzato per Claude Vision/GPT-4V:

   "Analizza questo menu di ristorante [tipo cucina].
   Estrai ogni piatto in formato JSON:
   {
     "name": "nome piatto",
     "description": "descrizione se presente",
     "price": numero,
     "category": "antipasti|primi|secondi|contorni|dolci|bevande",
     "allergens": ["lista se menzionati"]
   }

   Regole:
   - Prezzi in formato numerico (es: 12.50)
   - Se prezzo non chiaro, metti null
   - Categorie in italiano
   - Una entry per ogni piatto"

4. Manager copia prompt + allega immagine in Claude.ai (free)
5. Riceve JSON strutturato
6. Incolla JSON in GUDBRO
7. Sistema valida, mostra preview, permette correzioni
8. Import completato in minuti invece che ore
```

**Valore:** Onboarding che richiedeva 2-4 ore → 15-20 minuti

---

### UC-3: Miglioramento Foto Prodotti

**Scenario:** Manager ha foto dei piatti ma qualità bassa/sfondo disordinato

**Flow:**

```
1. Manager seleziona foto da migliorare
2. Sistema analizza e suggerisce:
   - "Sfondo da rimuovere" → Remove.bg (free tier: 1 img/mese HD)
   - "Risoluzione bassa" → Upscayl (free, locale) o Let's Enhance
   - "Colori spenti" → Istruzioni per filtri automatici
3. Per ogni suggerimento:
   - Link diretto al tool
   - Guida visuale 30 secondi
   - Impostazioni consigliate
4. Manager processa immagini
5. Ri-uploada versioni migliorate
```

---

### UC-4: Generazione Descrizioni Piatti

**Scenario:** Manager ha 50 piatti senza descrizione appetitosa

**Flow:**

```
1. Manager seleziona piatti senza descrizione
2. Sistema genera prompt per batch processing:

   "Sei un copywriter esperto di food & beverage.
   Per ogni piatto genera una descrizione:
   - 15-25 parole
   - Tono: [casual/elegante/tradizionale]
   - Evidenzia: ingredienti chiave, metodo cottura, sensazioni
   - Lingua: italiano

   Piatti:
   1. Tagliatelle al ragù - pasta fresca, ragù bolognese
   2. Tiramisù - mascarpone, savoiardi, caffè
   ..."

3. Manager copia in ChatGPT/Claude
4. Riceve descrizioni
5. Copia in GUDBRO → mapping automatico per nome piatto
```

---

### UC-5: Contenuti Social

**Scenario:** Manager vuole postare su Instagram ma non sa cosa scrivere

**Flow:**

```
1. Manager seleziona "Crea Post Social"
2. Sceglie:
   - Cosa promuovere (piatto, evento, promo, behind-the-scenes)
   - Tono (divertente, professionale, emozionale)
   - Call to action (prenotazione, visita, engagement)
3. Sistema genera:
   - Prompt per immagine (se serve)
   - Caption con emoji e hashtag
   - Varianti A/B per testing
4. Manager copia, adatta se vuole, posta
```

---

## Architettura Tecnica

### Struttura Modulo

```
lib/ai-assistant/
│
├── core/
│   ├── types.ts                    # Tipi TypeScript
│   ├── prompt-engine.ts            # Engine costruzione prompt
│   ├── context-builder.ts          # Raccoglie context dal sistema
│   └── output-validator.ts         # Valida output AI per import
│
├── generators/
│   ├── image-prompt-generator.ts   # Prompt per immagini
│   ├── extraction-prompt-generator.ts  # Prompt per OCR/parsing
│   ├── content-prompt-generator.ts     # Prompt per testi
│   └── social-prompt-generator.ts      # Prompt per social
│
├── knowledge/
│   ├── emotions.ts                 # Emozione → elementi visivi
│   ├── restaurant-styles.ts        # Stili ristorazione
│   ├── food-photography.ts         # Best practices foto food
│   ├── color-psychology.ts         # Psicologia colori marketing
│   └── platform-specs.ts           # Specifiche formati social
│
├── tools/
│   ├── midjourney.ts               # Sintassi e tips Midjourney
│   ├── dalle.ts                    # Sintassi DALL-E
│   ├── leonardo.ts                 # Sintassi Leonardo.ai
│   ├── ideogram.ts                 # Sintassi Ideogram
│   ├── claude-vision.ts            # Tips Claude Vision
│   └── tool-recommender.ts         # Raccomanda tool giusto
│
├── import/
│   ├── menu-json-parser.ts         # Parsing JSON menu estratto
│   ├── image-processor.ts          # Gestione immagini uploadate
│   └── validation-rules.ts         # Regole validazione import
│
└── ui/
    ├── components/
    │   ├── PromptGeneratorModal.tsx
    │   ├── EmotionSelector.tsx
    │   ├── FormatSelector.tsx
    │   ├── ToolRecommendation.tsx
    │   ├── PromptOutput.tsx
    │   ├── QuickGuide.tsx
    │   └── ImportWizard.tsx
    │
    └── hooks/
        ├── usePromptGenerator.ts
        ├── useToolRecommendation.ts
        └── useImportPipeline.ts
```

### Database Schema

```sql
-- Storico prompt generati (per analytics e miglioramento)
CREATE TABLE ai_assistant_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),

  -- Tipo e contesto
  prompt_type TEXT NOT NULL, -- 'image', 'extraction', 'content', 'social'
  use_case TEXT NOT NULL,    -- 'promo_image', 'menu_extraction', etc.

  -- Input
  input_context JSONB NOT NULL,  -- Dati usati per generare
  emotions TEXT[],               -- Emozioni selezionate

  -- Output
  generated_prompt TEXT NOT NULL,
  recommended_tool TEXT,         -- 'midjourney', 'dalle', etc.

  -- Feedback (opzionale)
  was_used BOOLEAN DEFAULT NULL,
  user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Template prompt personalizzabili
CREATE TABLE ai_assistant_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  prompt_type TEXT NOT NULL,
  use_case TEXT NOT NULL,

  template_name TEXT NOT NULL,
  template_content TEXT NOT NULL,  -- Con placeholder {{variable}}

  variables JSONB NOT NULL,  -- Schema variabili richieste

  is_system BOOLEAN DEFAULT true,  -- true = default, false = custom merchant
  merchant_id UUID REFERENCES merchants(id),  -- NULL per system templates

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Knowledge Base: Emozioni → Elementi Visivi

### Mapping Emozioni

```typescript
// lib/ai-assistant/knowledge/emotions.ts

export const emotionMappings = {
  urgency: {
    name: 'Urgenza',
    icon: '⚡',
    description: 'Stimola azione immediata',
    visualElements: {
      colors: ['warm reds', 'bright oranges', 'golden yellows'],
      lighting: 'dramatic, high contrast',
      composition: 'dynamic angles, diagonal lines',
      mood: 'energetic, time-sensitive',
      textSpace: 'prominent area for countdown/deadline',
    },
    promptSnippet:
      'sense of urgency, warm dramatic lighting, dynamic composition with space for promotional text',
  },

  appetite: {
    name: 'Appetito',
    icon: '🤤',
    description: 'Fa venire fame/sete',
    visualElements: {
      colors: ['rich browns', 'cream', 'fresh greens', 'sauce reds'],
      lighting: 'warm side lighting, steam visible',
      composition: 'close-up, shallow depth of field, texture focus',
      mood: 'inviting, sensory, tactile',
      textSpace: 'minimal, let food speak',
    },
    promptSnippet:
      'appetizing food photography, close-up with steam rising, rich textures visible, warm side lighting, shallow depth of field',
  },

  conviviality: {
    name: 'Convivialità',
    icon: '👥',
    description: 'Senso di comunità e condivisione',
    visualElements: {
      colors: ['warm earth tones', 'soft ambers', 'natural wood'],
      lighting: 'warm ambient, candlelight feel',
      composition: 'shared plates, multiple hands, group setting',
      mood: 'friendly, welcoming, social',
      textSpace: 'integrated naturally',
    },
    promptSnippet:
      'convivial atmosphere, friends sharing food, warm ambient lighting, rustic table setting, sense of togetherness',
  },

  exclusivity: {
    name: 'Esclusività',
    icon: '👑',
    description: 'Premium, lusso, esperienza unica',
    visualElements: {
      colors: ['deep blacks', 'gold accents', 'rich burgundy'],
      lighting: 'dramatic spots, dark background',
      composition: 'minimal, elegant plating, negative space',
      mood: 'sophisticated, luxurious, refined',
      textSpace: 'clean, minimal text',
    },
    promptSnippet:
      'luxury fine dining, dramatic dark background, elegant minimal plating, gold accents, sophisticated atmosphere',
  },

  nostalgia: {
    name: 'Nostalgia',
    icon: '📷',
    description: 'Ricordi, tradizione, comfort',
    visualElements: {
      colors: ['warm sepia tones', 'faded pastels', 'vintage cream'],
      lighting: 'soft, diffused, golden hour feel',
      composition: 'traditional setup, family style, vintage props',
      mood: 'comforting, familiar, heartwarming',
      textSpace: 'handwritten style integrates well',
    },
    promptSnippet:
      'nostalgic vintage atmosphere, warm sepia tones, traditional family-style setting, soft diffused lighting, comforting mood',
  },

  curiosity: {
    name: 'Curiosità',
    icon: '🔍',
    description: 'Intriga, scoperta, novità',
    visualElements: {
      colors: ['unexpected color pops', 'mysterious darks'],
      lighting: 'partial lighting, shadows, reveal effect',
      composition: 'unusual angles, partial view, mystery element',
      mood: 'intriguing, playful, surprising',
      textSpace: 'teasing, question-provoking',
    },
    promptSnippet:
      'intriguing composition, unusual camera angle, partial reveal, mysterious shadows, sense of discovery',
  },

  joy: {
    name: 'Gioia',
    icon: '😊',
    description: 'Felicità, celebrazione, positività',
    visualElements: {
      colors: ['bright and saturated', 'party colors', 'confetti vibes'],
      lighting: 'bright, natural, airy',
      composition: 'movement, action, celebration',
      mood: 'happy, celebratory, uplifting',
      textSpace: 'playful, can be bold',
    },
    promptSnippet:
      'joyful celebration atmosphere, bright natural lighting, vibrant colors, sense of movement and happiness',
  },

  romance: {
    name: 'Romanticismo',
    icon: '❤️',
    description: 'Amore, intimità, momenti speciali',
    visualElements: {
      colors: ['soft pinks', 'deep reds', 'candlelight warm'],
      lighting: 'soft, intimate, candlelit',
      composition: 'couple-focused, intimate table, roses',
      mood: 'romantic, intimate, special',
      textSpace: 'elegant script works well',
    },
    promptSnippet:
      'romantic intimate setting, soft candlelight, couple dining, elegant atmosphere, roses and warm tones',
  },
};
```

---

## Knowledge Base: Stili Ristorazione

```typescript
// lib/ai-assistant/knowledge/restaurant-styles.ts

export const restaurantStyles = {
  rustic_italian: {
    name: 'Rustico Italiano',
    keywords: ['trattoria', 'osteria', 'famiglia'],
    visualElements: {
      materials: [
        'wood tables',
        'terracotta',
        'copper pots',
        'checkered tablecloths',
      ],
      colors: ['warm browns', 'terra cotta', 'olive green', 'cream'],
      props: ['wine bottles', 'bread baskets', 'olive oil', 'fresh herbs'],
      lighting: 'warm tungsten, natural window light',
    },
    promptBase:
      'rustic Italian trattoria style, warm wood surfaces, terracotta accents, Mediterranean atmosphere',
  },

  modern_minimal: {
    name: 'Moderno Minimalista',
    keywords: ['contemporary', 'design', 'urban'],
    visualElements: {
      materials: ['concrete', 'steel', 'glass', 'white ceramics'],
      colors: ['white', 'grey', 'black accents', 'single color pop'],
      props: ['geometric plates', 'single stem flowers', 'clean lines'],
      lighting: 'bright, even, architectural',
    },
    promptBase:
      'modern minimalist restaurant, clean lines, contemporary plating, architectural lighting',
  },

  cozy_cafe: {
    name: 'Caffetteria Accogliente',
    keywords: ['coffee shop', 'breakfast', 'brunch'],
    visualElements: {
      materials: ['reclaimed wood', 'exposed brick', 'chalkboards'],
      colors: ['coffee browns', 'cream', 'sage green', 'dusty pink'],
      props: ['coffee cups', 'pastries', 'books', 'plants'],
      lighting: 'soft natural light, pendant lamps',
    },
    promptBase:
      'cozy cafe atmosphere, warm and inviting, artisanal coffee shop vibes, natural light',
  },

  fine_dining: {
    name: 'Fine Dining',
    keywords: ['gourmet', 'stellato', 'haute cuisine'],
    visualElements: {
      materials: ['white linens', 'crystal', 'silver', 'fine china'],
      colors: ['white', 'black', 'gold accents', 'jewel tones'],
      props: ['elegant glassware', 'artistic plating', 'micro herbs'],
      lighting: 'dramatic, focused, sophisticated',
    },
    promptBase:
      'fine dining elegance, Michelin-star presentation, artistic plating, sophisticated atmosphere',
  },

  street_food: {
    name: 'Street Food / Fast Casual',
    keywords: ['casual', 'grab-and-go', 'trendy'],
    visualElements: {
      materials: ['paper containers', 'neon signs', 'graffiti walls'],
      colors: ['bold primaries', 'neon accents', 'urban palette'],
      props: ['food trucks', 'market stalls', 'hands holding food'],
      lighting: 'bright, punchy, editorial',
    },
    promptBase:
      'vibrant street food style, casual urban atmosphere, bold colors, editorial food photography',
  },

  asian_fusion: {
    name: 'Asian / Fusion',
    keywords: ['sushi', 'ramen', 'contemporary asian'],
    visualElements: {
      materials: ['dark wood', 'bamboo', 'ceramic', 'lacquer'],
      colors: ['black', 'red accents', 'natural wood', 'white'],
      props: ['chopsticks', 'sake bottles', 'bonsai', 'steam'],
      lighting: 'moody, dramatic, focused',
    },
    promptBase:
      'contemporary Asian aesthetic, zen minimalism, dramatic lighting, elegant simplicity',
  },

  plant_based: {
    name: 'Plant-Based / Health',
    keywords: ['vegan', 'organic', 'wellness'],
    visualElements: {
      materials: ['natural wood', 'recycled materials', 'ceramics'],
      colors: ['greens', 'earth tones', 'fresh whites', 'natural'],
      props: ['fresh vegetables', 'smoothie bowls', 'plants', 'seeds'],
      lighting: 'bright, fresh, natural daylight',
    },
    promptBase:
      'fresh plant-based aesthetic, vibrant greens, healthy and natural, bright daylight photography',
  },
};
```

---

## Tool Recommendations - Research 2026

> **Ricerca aggiornata:** 2026-01-19
> **Fonti:** Web research su free tier, qualità, e accessibilità internazionale

---

### Panoramica AI Image Generation 2026

#### Tier 1: Premium Quality (Occidentali)

| Tool                                        | Qualità    | Forza Principale                               | Free Tier           | Limitazioni Free                              |
| ------------------------------------------- | ---------- | ---------------------------------------------- | ------------------- | --------------------------------------------- |
| **[Midjourney](https://midjourney.com)**    | ⭐⭐⭐⭐⭐ | Qualità artistica, "anima" nelle immagini      | ❌ **NESSUNO**      | Trial eliminato dal 2023. Min $10/mese        |
| **[DALL-E 3](https://chat.openai.com)**     | ⭐⭐⭐⭐   | Comprensione semantica, integrato ChatGPT      | ✅ 2-3 img/giorno   | Solo standard quality, no HD                  |
| **[Flux Pro](https://bfl.ai)**              | ⭐⭐⭐⭐⭐ | Fotorealismo top, open-source schnell          | ✅ Schnell gratuito | Flux.1 schnell (Apache 2.0) illimitato locale |
| **[Ideogram](https://ideogram.ai)**         | ⭐⭐⭐⭐   | **#1 per testo in immagini** (85-90% accuracy) | ✅ ~5-10 img/giorno | Immagini pubbliche, 70% quality download      |
| **[Leonardo.ai](https://leonardo.ai)**      | ⭐⭐⭐⭐   | Controllo, realismo, varietà modelli           | ✅ 150 token/giorno | Queue 8-20 min, watermark, pubbliche          |
| **[Canva Magic Studio](https://canva.com)** | ⭐⭐⭐     | Template social, all-in-one                    | ✅ ~50 uses/mese    | Feature avanzate Pro-only                     |

#### Tier 2: AI Cinesi (Accessibili Internazionalmente)

| Tool                                                           | Qualità    | Forza Principale                         | Free Tier                    | Note Accessibilità                                  |
| -------------------------------------------------------------- | ---------- | ---------------------------------------- | ---------------------------- | --------------------------------------------------- |
| **[Dreamina](https://www.capcut.com/dreamina)** (Jimeng int'l) | ⭐⭐⭐⭐   | Top per testo cinese, qualità ByteDance  | ✅ Free trial                | Versione internazionale di Jimeng, UI inglese       |
| **[Kling AI](https://klingai.com)**                            | ⭐⭐⭐⭐⭐ | **Text-to-video leader**, image-to-video | ✅ Free tier                 | 3.76M utenti globali, ~$0.04/sec (vs Sora più caro) |
| **[ERNIE-ViLG](https://yige.baidu.com)**                       | ⭐⭐⭐⭐   | Estetica asiatica, ink painting          | ✅ **Gratuito** dal Apr 2025 | Canvas infinito, ottimo per stili asiatici          |
| **[Tongyi Wanxiang](https://tongyi.aliyun.com)**               | ⭐⭐⭐     | Integrato con Alibaba ecosystem          | ✅ Free tier                 | Buono per e-commerce product shots                  |

#### Studio HKU Rankings (2025)

Secondo lo [studio University of Hong Kong](https://english.dotdotnews.com/a/202503/06/AP67c94f7de4b0e343b0e25f62.html):

1. **Dreamina (ByteDance)** - Top score 1,123 per content quality
2. **ERNIE Bot V3.2.0 (Baidu)** - Secondo posto
3. **Midjourney v6.1** - Terzo posto
4. **Doubao** - Forte su image modification

---

### Dettaglio Free Tier per Tool

#### Midjourney - ❌ NO FREE TIER

```
Stato: Trial eliminato permanentemente (Aprile 2023)
Motivo: Server sovraccarichi, GPU scarse

Piani disponibili:
├── Basic:    $10/mese (200 img) - $8/mese annual
├── Standard: $30/mese (15h fast, unlimited relax)
├── Pro:      $60/mese (30h fast, stealth mode)
└── Mega:     $120/mese (60h fast)

Workaround: Rating images può dare 1h bonus/giorno (top 2000 utenti)
```

**Raccomandazione:** Per manager con budget zero, NON consigliare Midjourney come prima opzione.

#### DALL-E 3 (via ChatGPT) - ✅ FREE MA LIMITATO

```
Free Tier:
├── 2-3 immagini/giorno (rolling 24h)
├── Solo qualità standard (no HD)
├── No style variations
└── Server availability variabile

Plus ($20/mese):
├── 50 img ogni 3 ore (rolling window)
├── HD disponibile
└── Peak hours: throttled a 40-45 img
```

**Raccomandazione:** Ottimo per **iterazioni rapide** e **prompt test**. Comprensione semantica eccellente.

#### Ideogram - ✅ MIGLIOR FREE TIER PER TESTO

```
Free Tier:
├── ~5-10 generazioni/giorno (varia con traffico)
├── Slow credits (queue più lunga)
├── TUTTE le immagini pubbliche
├── Prompt pubblici (altri possono remixare)
├── Download 70% quality JPEG
└── NO uso commerciale

Paid ($8/mese):
├── Generazioni private
├── Full quality download
└── Uso commerciale OK
```

**Raccomandazione:** **#1 per immagini con testo** (menu boards, signage, promo con scritte). 85-90% accuracy vs competitors che sbagliano spesso.

#### Leonardo.ai - ✅ FREE CON LIMITAZIONI

```
Free Tier (Dicembre 2025):
├── 150 token/giorno (refresh daily)
├── Queue time: 8-20 minuti (business hours)
├── Max resolution: 1536x1024
├── Watermark su immagini
├── Tutte le immagini pubbliche
├── Leonardo può usare/rivendere tue immagini
└── Modelli avanzati (Lucid Realism): ~66 credits/img

Pro tip: Generare tra 22:00-06:00 UTC per queue più veloci
```

**Raccomandazione:** Buon bilanciamento qualità/controllo. Ottimo per **product shots realistici**.

#### Flux (Black Forest Labs) - ✅ OPEN SOURCE

```
Modelli:
├── Flux.1 [schnell]: Apache 2.0, 100% FREE
│   ├── 12B parametri
│   ├── 1-4 steps per immagine
│   └── Uso commerciale OK
├── Flux.1 [dev]: Non-commercial license
└── Flux.1 [pro]: API a pagamento

Flux.2 (Nov 2025):
├── Klein: Apache 2.0, più veloce
└── Pro/Flex: API pricing
```

**Raccomandazione:** Per utenti tecnici che possono runnare localmente. **Fotorealismo top tier**.

#### AI Cinesi - Accessibilità Internazionale

```
Dreamina (ByteDance):
├── Versione int'l di Jimeng
├── UI in inglese (dal Apr 2025)
├── Free trial disponibile
├── Accessibile via capcut.com/dreamina
└── Top per testo in cinese/multilingue

Kling AI (Kuaishou):
├── Web: klingai.com (3.76M utenti globali)
├── App iOS internazionale
├── Free tier per video generation
├── $0.04/sec vs Sora molto più caro
├── 600M+ video generati, 60M utenti
└── Usato da film studios, marketers

ERNIE-ViLG (Baidu):
├── yige.baidu.com
├── GRATUITO dal 1 Aprile 2025
├── Canvas infinito
├── Ottimo per stili asiatici/ink painting
└── Può richiedere VPN per alcune features
```

**Raccomandazione:** Kling AI eccellente per **video promozionali**. ERNIE gratuito per esperimenti.

---

### Vision/OCR per Menu Extraction

| Tool                | Accuracy       | Hallucination Rate | Costo                  | Best For                              |
| ------------------- | -------------- | ------------------ | ---------------------- | ------------------------------------- |
| **GPT-4o**          | Edit dist 0.02 | 0.15%              | $7.50/1000 img         | Raw accuracy, documenti standard      |
| **Claude Sonnet 4** | Edit dist 0.03 | **0.09%**          | $6.00/1000 img         | **Bassa allucinazione**, multilingual |
| **Qwen 2.5 VL**     | ~75% (=GPT-4o) | TBD                | **Free** (open source) | Budget option, self-hosted            |
| **Amazon Textract** | Eccellente     | Basso              | Pay per page           | Menu creativi, layout complessi       |

**Raccomandazione per Menu:**

- **Claude.ai free tier** per singoli menu (manager)
- **Claude API** se scale (noi)
- Claude 20% più economico e **migliore su non-Latin scripts** (94.2% Thai, ottimo per Vietnam)

---

### Social Media Content Tools

| Tool                   | Free Tier                | Best For                         |
| ---------------------- | ------------------------ | -------------------------------- |
| **Canva Magic Studio** | ~50 AI uses/mese         | Template social, design completo |
| **ChatGPT**            | Illimitato (GPT-4o mini) | Captions, hashtags, copy         |
| **Claude.ai**          | Free tier generoso       | Long-form content, traduzioni    |
| **Kling AI**           | Free tier                | Video Reels/TikTok               |

---

### Matrice Decisionale per Prompt Generator

| Use Case                     | Tool #1       | Tool #2 (backup) | Perché                          |
| ---------------------------- | ------------- | ---------------- | ------------------------------- |
| **Immagine promo (qualità)** | Leonardo.ai   | DALL-E 3         | Free tier utilizzabili          |
| **Immagine con testo**       | **Ideogram**  | Canva            | Ideogram #1 per testo accuracy  |
| **Video promo 15-30s**       | **Kling AI**  | Dreamina         | Free tier, qualità cinema       |
| **Estrazione menu**          | **Claude.ai** | GPT-4o           | Meno allucinazioni, multilingue |
| **Descrizioni piatti**       | ChatGPT       | Claude           | Entrambi eccellenti, free       |
| **Caption social**           | ChatGPT       | Claude           | Free, veloce                    |
| **Upscaling foto**           | Upscayl       | Let's Enhance    | Upscayl 100% free locale        |
| **Rimozione sfondo**         | Remove.bg     | Canva            | 1 HD free/mese                  |
| **Stile asiatico/ink**       | ERNIE-ViLG    | Dreamina         | Gratuito, culturally accurate   |

---

### ⚠️ Avvertenze per Manager

```
DO:
✅ Usare free tier per test e iterazioni
✅ Ideogram per qualsiasi testo in immagine
✅ Claude per estrazione menu (meno errori)
✅ Kling per video promo (gratuito, qualità)

DON'T:
❌ Raccomandare Midjourney (no free tier!)
❌ Aspettarsi testo perfetto da DALL-E/Leonardo
❌ Usare free tier per contenuti sensibili (pubblici)
❌ Ignorare watermark sui free tier
```

---

### Fonti Research

- [WaveSpeed AI - Best AI Image Generators 2026](https://wavespeed.ai/blog/posts/best-ai-image-generators-2026/)
- [Lovart - Midjourney vs DALL-E vs Stable Diffusion](https://www.lovart.ai/blog/ai-illustration-tools-review)
- [HKU Study - Chinese AI Models Performance](https://english.dotdotnews.com/a/202503/06/AP67c94f7de4b0e343b0e25f62.html)
- [Second Talent - Chinese LLMs for Image Generation](https://www.secondtalent.com/resources/chinese-llms-for-ai-image-generation/)
- [CodeSOTA - Claude vs GPT-4o OCR](https://www.codesota.com/ocr/claude-vs-gpt4o-ocr)
- [Eesel - Ideogram Pricing](https://www.eesel.ai/blog/ideogram-pricing)
- [TheRightGPT - Leonardo AI Pricing 2026](https://therightgpt.com/leonardo-ai-guide/pricing/)

---

### Aggiornamento Tabella Raccomandazioni

| Task                             | Tool Consigliato   | Perché                                 | Free Tier          |
| -------------------------------- | ------------------ | -------------------------------------- | ------------------ |
| **Immagini promo artistiche**    | Leonardo.ai        | Buona qualità, free tier usabile       | 150 token/giorno   |
| **Immagini con testo leggibile** | **Ideogram**       | #1 per testo (85-90% accuracy)         | ~5-10 img/giorno   |
| **Video promozionali**           | **Kling AI**       | Qualità cinema, $0.04/sec              | Free tier generoso |
| **Iterazioni rapide**            | DALL-E 3 (ChatGPT) | Integrato, comprensione top            | 2-3 img/giorno     |
| **Estrazione menu**              | **Claude.ai**      | Meno allucinazioni, multilingue        | Free tier generoso |
| **Stile asiatico**               | ERNIE-ViLG         | **100% gratuito**, culturally accurate | Illimitato         |
| **Rimozione sfondo**             | Remove.bg          | Specializzato, automatico              | 1 HD/mese          |
| **Upscaling**                    | Upscayl (desktop)  | Gratuito, locale, illimitato           | 100% free          |
| **Descrizioni prodotti**         | ChatGPT/Claude     | Eccellente per copy                    | Free tier generosi |
| **Caption social**               | ChatGPT            | Veloce, free, hashtag ottimizzati      | Illimitato         |

### Sintassi per Tool

```typescript
// lib/ai-assistant/tools/midjourney.ts

export const midjourneyGuide = {
  name: 'Midjourney',
  website: 'https://midjourney.com',
  howToUse: 'Discord bot o midjourney.com/imagine',

  syntax: {
    aspectRatio: '--ar 1:1 | --ar 16:9 | --ar 9:16',
    version: '--v 6.1',
    style: '--style raw (più fotografico) | default (più artistico)',
    quality: '--q 1 (standard) | --q 2 (più dettaglio)',
    noElements: '--no text, words, letters, watermark',
  },

  bestPractices: [
    'Inizia con il soggetto principale',
    'Descrivi atmosfera e lighting',
    'Specifica stile fotografico',
    'Usa --no per escludere elementi indesiderati',
    'Per food: menziona sempre "appetizing", "professional food photography"',
  ],

  templatePrompt: `{subject}, {atmosphere}, {style} photography, {lighting}, {colors}, {composition} --ar {aspectRatio} --style raw --v 6.1 --no text, words, letters`,
};
```

---

## UX Flow: Image Prompt Generator

### Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  ✨ Genera Immagine Promozionale                          [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Promozione: Happy Hour -30%                                    │
│  Prodotti: Spritz, Negroni, Tagliere misto                      │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Che emozioni vuoi trasmettere? (max 3)                         │
│                                                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ ⚡      │ │ 🤤      │ │ 👥      │ │ 👑      │               │
│  │ Urgenza │ │Appetito │ │Convivia.│ │Esclusiv.│               │
│  │  [✓]    │ │  [✓]    │ │  [ ]    │ │  [ ]    │               │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘               │
│                                                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ 📷      │ │ 🔍      │ │ 😊      │ │ ❤️      │               │
│  │Nostalgia│ │Curiosità│ │ Gioia   │ │Romantic.│               │
│  │  [ ]    │ │  [✓]    │ │  [ ]    │ │  [ ]    │               │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘               │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Formato immagine:                                               │
│  ○ 1:1 Instagram Post    ◉ 16:9 Banner/Cover                    │
│  ○ 9:16 Story/Reel       ○ 4:5 Instagram Portrait               │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Elementi aggiuntivi (opzionale):                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Lascia spazio a sinistra per testo "HAPPY HOUR"         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│         [ Genera Prompt ]                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

                              ▼

┌─────────────────────────────────────────────────────────────────┐
│  ✅ Prompt Generato                                        [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🎯 Tool Consigliato: Midjourney                                │
│     (Migliore per immagini promozionali di alta qualità)        │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ A warm Italian aperitivo scene at golden hour,          │   │
│  │ elegant Aperol Spritz cocktails and Negroni glasses     │   │
│  │ on rustic wooden table with artisanal cheese board,     │   │
│  │ appetizing food photography, dramatic warm lighting,    │   │
│  │ sense of urgency and exclusivity, rich textures,        │   │
│  │ intriguing composition with empty space on left for     │   │
│  │ promotional text overlay, Mediterranean terrace         │   │
│  │ atmosphere --ar 16:9 --style raw --v 6.1                │   │
│  │ --no text, words, letters, watermark                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   [ 📋 Copia Prompt ]    [ 🔗 Apri Midjourney ]                 │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  📚 Guida Rapida (30 secondi)                                   │
│                                                                  │
│  1. Clicca "Apri Midjourney" → accedi con Discord               │
│  2. Vai su #newbies o crea server privato                       │
│  3. Scrivi /imagine e incolla il prompt                         │
│  4. Attendi ~60 sec → scegli variante preferita                 │
│  5. Click U1/U2/U3/U4 per upscale                               │
│  6. Salva immagine e caricala qui sotto                         │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  📤 Carica Immagine Generata                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │            [ Trascina immagine qui ]                     │   │
│  │                  o clicca per sfogliare                  │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│                                            [ Completa ]          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: MVP - Image Prompt Generator (2-3 settimane)

- [ ] Core prompt engine
- [ ] Emotion mappings
- [ ] Restaurant style presets
- [ ] Midjourney/Leonardo syntax
- [ ] Basic UI modal
- [ ] Integration con creazione promozioni

### Phase 2: Menu Extraction (2 settimane)

- [ ] Extraction prompt templates
- [ ] Claude Vision optimization
- [ ] JSON validation & parsing
- [ ] Import wizard UI
- [ ] Error handling & corrections

### Phase 3: Content & Social (1-2 settimane)

- [ ] Description generator
- [ ] Social caption generator
- [ ] Multi-language support
- [ ] Tone/style options

### Phase 4: Enhancement & Polish (1 settimana)

- [ ] Image enhancement recommendations
- [ ] Tool guides & tutorials
- [ ] Analytics & feedback collection
- [ ] A/B testing prompts

---

## Success Metrics

| Metric                | Target                           | Come Misurare              |
| --------------------- | -------------------------------- | -------------------------- |
| **Adoption Rate**     | 60% nuovi merchant usano feature | Tracking uso modulo        |
| **Time Saved**        | -70% tempo onboarding menu       | Before/after comparison    |
| **User Satisfaction** | 4.5/5 rating prompt quality      | Feedback in-app            |
| **Cost Saved**        | €100+/mese per merchant          | Survey savings vs designer |
| **Completion Rate**   | 80% completa flow dopo start     | Funnel analytics           |

---

## Open Questions

1. **Dovremmo cachare i prompt generati?** Per analytics e miglioramento continuo
2. **Vogliamo suggerire alternative?** "Prova anche con Leonardo per più controllo"
3. **Template custom per merchant?** Salvare stili preferiti del singolo locale
4. **Integrazione diretta API?** In futuro, opzione premium con API key del merchant

---

## Appendix: Prompt Templates

### Template: Immagine Promozionale

```
{restaurant_style_base}, featuring {products} on {surface_description},
{emotion_snippets}, {lighting_style}, professional food photography,
{composition_notes}, {color_palette} color palette
--ar {aspect_ratio} --style raw --v 6.1 --no text, words, letters, watermark
```

### Template: Estrazione Menu

```
You are a professional menu data extractor. Analyze this restaurant menu image.

Extract each menu item into this exact JSON format:
{
  "products": [
    {
      "name": "item name exactly as written",
      "description": "description if present, null otherwise",
      "price": numeric_value_or_null,
      "category": "one of: antipasti|primi|secondi|contorni|dolci|bevande|altro",
      "allergens": ["list", "if", "mentioned"]
    }
  ],
  "metadata": {
    "detected_language": "it|en|other",
    "total_items": number,
    "currency_symbol": "€|$|other"
  }
}

Rules:
- Keep names exactly as written (preserve language)
- Prices as numbers only (12.50, not "€12,50")
- If price unclear or "ask" -> null
- Categories in Italian
- Only include allergens if explicitly mentioned
```

---

**Document Version:** 1.0
**Authors:** GUDBRO Team + Claude
**Next Review:** After Phase 1 completion
