# Chatbot AI Integration - Gemini File Search

## Current Implementation: ModernChatMenuV5

### Disponibile su `/chat`

La versione attuale del chatbot (V5) include:

| Feature | Stato | Descrizione |
|---------|-------|-------------|
| **Dati reali** | ✅ | Integrato con `sample-products.json` via server actions |
| **Multi-lingua** | ✅ | EN, IT, VI - sincronizzato con `languagePreferencesStore` |
| **Multi-valuta** | ✅ | VND, EUR, USD, GBP - sincronizzato con `currencyPreferencesStore` |
| **Carrello** | ✅ | Integrato con `selectionsStore` esistente |
| **Persistenza** | ✅ | Conversazione salvata in localStorage (30 min) |
| **Voice Input** | ✅ | Web Speech API con supporto multilingua |
| **Suggerimenti contestuali** | ✅ | Saluti basati su ora del giorno |
| **Filtro allergie** | ✅ | Gluten, Dairy, Nuts, Eggs, Soy |
| **Merchandise** | ✅ | Tab dedicata se presente nel menu |

### Versioni Disponibili

| Versione | Path | Descrizione |
|----------|------|-------------|
| V5 (raccomandata) | `/chat` | Integrata con dati reali e store |
| V4 | `/chat-preview` | Demo con dati hardcoded |

### Come Usare

```tsx
// app/chat/page.tsx
import { getMenuProducts } from '../actions';
import { ModernChatMenuV5 } from '@/components/ModernChatMenuV5';

export default async function ChatPage() {
  const menuItems = await getMenuProducts();
  return <ModernChatMenuV5 menuItems={menuItems} />;
}
```

---

## Obiettivo Futuro: Gemini AI
Integrare Google Gemini AI con File Search per creare un chatbot conversazionale che risponde **solo** basandosi sulla documentazione del locale (menu, info, allergeni, ecc.).

## Perché Gemini?
- **Costo ridotto** rispetto ad altre soluzioni (OpenAI GPT, Claude)
- **File Search / Grounding** - può essere limitato a rispondere solo basandosi su documenti specifici
- Evita allucinazioni - risponde solo con informazioni dal menu/documentazione
- API facile da integrare
- Supporto multilingua nativo

## Risorse
- [File Search Documentation (IT)](https://ai.google.dev/gemini-api/docs/file-search?hl=it)
- [File Search Blog Post](https://blog.google/technology/developers/file-search-gemini-api/)

## Use Case Specifico
### Documenti da caricare:
1. **Menu completo** (JSON/PDF)
   - Tutti i piatti con descrizioni, prezzi, ingredienti
   - Informazioni allergeni
   - Categorie (Phở, Bánh Mì, Rice Dishes, Drinks, Desserts)

2. **Merchandise** (JSON/PDF)
   - Prodotti disponibili (T-shirt, Mug, Cap, Tote Bag, Hoodie, Stickers)
   - Prezzi, taglie disponibili

3. **Info del Locale** (JSON/TXT)
   - Nome, indirizzo, orari
   - WiFi credentials
   - Numero tavolo
   - Regole (allergeni, personalizzazioni disponibili)

### Esempi di Query:
- "Cosa mi consigli di leggero?" → Gemini cerca nel menu piatti con meno calorie
- "Ho allergia al glutine" → Gemini filtra piatti senza glutine
- "Quanto costa il Phở Bò?" → Gemini trova prezzo esatto nel menu
- "Avete magliette?" → Gemini trova info merchandise
- "Vorrei ordinare un caffè" → Gemini identifica "Cà Phê Sữa Đá" dal menu

## Implementazione Prevista

### 1. Preparare i dati
```json
// menu-data.json
{
  "venue": {
    "name": "GUDBRO",
    "cuisine": "Vietnamese",
    "location": "District 1, Ho Chi Minh City"
  },
  "menu": [
    {
      "id": 1,
      "name": "Phở Bò",
      "category": "Noodles",
      "price": 65000,
      "currency": "VND",
      "description": "Traditional beef noodle soup with rice noodles, tender beef slices, and aromatic herbs",
      "allergens": ["gluten"],
      "spicy": false,
      "vegetarian": false,
      "popular": true
    },
    // ... altri piatti
  ],
  "merchandise": [
    {
      "id": 101,
      "name": "GUDBRO T-Shirt",
      "price": 250000,
      "description": "Premium cotton tee with logo",
      "sizes": ["S", "M", "L", "XL"]
    }
    // ... altri prodotti
  ]
}
```

### 2. API Integration
```typescript
// lib/gemini-chatbot.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function chatWithMenu(userMessage: string, conversationHistory: Message[]) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    // File search configuration
    tools: [{
      fileSearch: {
        files: ['menu-data.json', 'venue-info.json']
      }
    }]
  });

  const chat = model.startChat({
    history: conversationHistory,
    systemInstruction: `Sei un assistente virtuale per il ristorante GUDBRO.
    Rispondi SOLO basandoti sui documenti del menu caricati.
    Se non trovi l'informazione, dì "Non ho questa informazione nel menu".
    Sii cordiale e suggerisci piatti quando appropriato.`
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
```

### 3. Next Steps
- [ ] Creare API route `/api/chat` in Next.js
- [ ] Caricare menu e info su Gemini File Search
- [ ] Testare vari tipi di query
- [ ] Implementare gestione errori e fallback
- [ ] Aggiungere rate limiting
- [ ] Monitorare costi API

## Vantaggi per l'Utente
1. **Conversazione naturale**: "Voglio qualcosa di piccante" invece di navigare categorie
2. **Raccomandazioni intelligenti**: Il bot capisce preferenze e suggerisce
3. **Multilingua**: Clienti possono scrivere in inglese, italiano, vietnamita
4. **Sempre aggiornato**: Basta aggiornare il file JSON del menu
5. **Nessuna allucinazione**: Risponde SOLO con info reali dal menu

## Costi Stimati (da verificare)
- Gemini 1.5 Flash: molto economico per chat semplici
- File Search: costi aggiuntivi da valutare
- Confrontare con OpenAI GPT-3.5 Turbo

---

## Multi-Tenant Architecture - Gestione Multi-Locale

### Perché è Fondamentale
Ogni locale GUDBRO ha esigenze completamente diverse:

**Menu Diversi:**
- GUDBRO District 1 (Vietnam): Phở, Bánh Mì → VND
- GUDBRO Milano (Italia): Pasta, Pizza → EUR
- GUDBRO New York (USA): Fusion Vietnamese → USD

**Offerte Localizzate:**
- District 1: "Happy Hour 17:00-19:00: -30% drink"
- Milano: "Pranzo business €15"
- New York: "Lunch Special $12"

**Politiche e Compliance:**
- Orari diversi (pausa pranzo italiana vs orario continuato)
- Metodi pagamento locali (VNPay, Satispay, ecc.)
- Certificazioni (HACCP EU, NYC Health Grade)
- Allergeni secondo normative locali

### Implementazione Multi-Tenant

```typescript
// Architettura isolata per venue
interface VenueContext {
  venue_id: string;
  name: string;
  menu: MenuItem[];
  offers: Offer[];
  hours: OpeningHours;
  payments: PaymentMethod[];
  policies: VenuePolicy;
  language: string;
  currency: string;
}

// lib/gemini-multi-venue.ts
export async function chatWithVenue(
  venueId: string,
  tableNumber: string,
  userMessage: string,
  conversationHistory: Message[]
) {
  // 1. Carica contesto del locale specifico
  const venue = await getVenueById(venueId);

  // 2. File Search limitato a questo venue
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    tools: [{
      fileSearch: {
        // Metadata filtering per venue isolation
        metadata: {
          venue_id: venueId,
          language: venue.language
        }
      }
    }]
  });

  // 3. System instruction personalizzato
  const chat = model.startChat({
    systemInstruction: `
      Sei l'assistente virtuale per ${venue.name}.
      Il cliente è al tavolo ${tableNumber}.

      IMPORTANTE:
      - Rispondi SOLO con informazioni di ${venue.name} (venue_id: ${venueId})
      - NON menzionare altri ristoranti GUDBRO
      - Usa valuta ${venue.currency} per tutti i prezzi
      - Rispetta offerte attive: ${JSON.stringify(venue.offers)}
      - Orari apertura: ${JSON.stringify(venue.hours)}

      Se non trovi info nel menu di ${venue.name}, dì:
      "Non ho questa informazione nel nostro menu."
    `,
    history: conversationHistory
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
```

### Vantaggi Architettura Multi-Tenant

1. **Isolamento Totale**: Nessun rischio di "contaminazione" tra locali
2. **Autonomia Manager**: Ogni locale aggiorna il proprio menu indipendentemente
3. **Localizzazione**: Menu, prezzi, offerte adattate al mercato locale
4. **Compliance**: Rispetta normative locali (allergeni UE, FDA, ecc.)
5. **Scalabilità**: Funziona con 10 o 1000 locali
6. **Personalizzazione**: Ogni locale può avere stile comunicazione diverso

### URL Structure
```
QR Code scansionato → https://gudbro.app/menu?venue=123&table=12
                                                    ↑         ↑
                                                venue_id  table_number
```

Il chatbot riceve entrambi i parametri e sa:
- Quale menu caricare
- Quali offerte mostrare
- Quale lingua/valuta usare
- Personalizzazioni (es. "Il tuo tavolo 12 ha già ordinato...")

---

**Note**: Questa è una soluzione molto più potente del semplice pattern matching attuale. Il chatbot capirà davvero le richieste dei clienti e potrà fornire un'esperienza conversazionale vera, personalizzata per ogni locale.
