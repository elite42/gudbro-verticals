# GUDBRO Core Library

Shared infrastructure for all GUDBRO hospitality applications.

## Overview

```
shared/core/
├── translation-engine/     # AI-powered translation system
│   ├── types.ts           # Type definitions
│   ├── providers/         # Provider implementations
│   │   ├── base-provider.ts
│   │   ├── claude-provider.ts
│   │   └── openai-provider.ts
│   └── index.ts           # Main entry point
│
├── modules/               # Reusable UI modules
│   ├── types.ts          # All module type definitions
│   ├── components/       # React components
│   │   ├── WiFiCard.tsx
│   │   ├── PriceListCard.tsx
│   │   ├── ContactsCard.tsx
│   │   └── AttractionsCard.tsx
│   └── index.ts
│
├── templates/            # Pre-configured templates
│   ├── hotel-room.example.ts
│   ├── airbnb.example.ts
│   └── index.ts
│
└── index.ts              # Main entry point
```

## Translation Engine

AI-powered, provider-agnostic translation system.

### Supported Providers

| Provider | Cost (per 50K words) | Quality | Best For |
|----------|---------------------|---------|----------|
| `gpt-4o-mini` | ~$0.30 | ⭐⭐⭐⭐ | **Recommended** - Best value |
| `claude-haiku` | ~$0.50 | ⭐⭐⭐⭐ | Good quality, fast |
| `claude-sonnet` | ~$15 | ⭐⭐⭐⭐⭐ | Highest quality |
| `deepl` | ~$10 | ⭐⭐⭐⭐⭐ | European languages |
| `google` | ~$1 | ⭐⭐⭐ | Basic, cheap |

### Usage

```typescript
import { TranslationEngine } from '@gudbro/core/translation-engine';

// Initialize with your preferred provider
const engine = new TranslationEngine({
  provider: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
});

// Single translation
const result = await engine.translate({
  text: 'Espresso with oat milk',
  sourceLanguage: 'en',
  targetLanguages: ['vi', 'ko', 'zh'],
  context: 'menu_item',
});

console.log(result.translations);
// { vi: 'Espresso với sữa yến mạch', ko: '귀리 우유 에스프레소', zh: '燕麦奶意式浓缩咖啡' }

// Batch translation (more efficient)
const batchResult = await engine.translateBatch({
  items: [
    { text: 'Cappuccino', sourceLanguage: 'en', targetLanguages: ['vi', 'ko'], context: 'menu_item' },
    { text: 'Fresh orange juice', sourceLanguage: 'en', targetLanguages: ['vi', 'ko'], context: 'menu_item' },
  ],
});

// Switch provider at runtime
engine.switchProvider('claude-haiku', process.env.ANTHROPIC_API_KEY);
```

### Translation Contexts

Use the right context for better translations:

| Context | Use For |
|---------|---------|
| `menu_item` | Food/drink names |
| `menu_description` | Food descriptions |
| `hotel_service` | Hotel services |
| `hotel_amenity` | Room amenities |
| `attraction` | Tourist spots |
| `transport` | Transportation info |
| `price_list` | Price listings |
| `instruction` | How-to guides |
| `legal` | Terms & policies |
| `marketing` | Promotional content |
| `ui_label` | Buttons, labels |

## Modules

Reusable React components for hospitality apps.

### Available Components

| Component | Description | Props |
|-----------|-------------|-------|
| `WiFiCard` | WiFi credentials with QR code | `config`, `language` |
| `PriceListCard` | Categorized price lists | `config`, `language`, `title` |
| `ContactsCard` | Business & emergency contacts | `config`, `language` |
| `AttractionsCard` | Nearby attractions & POIs | `config`, `language`, `title` |

### Usage

```tsx
import {
  WiFiCard,
  PriceListCard,
  ContactsCard,
  AttractionsCard,
} from '@gudbro/core/modules';

function RoomInfoPage({ config }) {
  const language = 'en';

  return (
    <div className="space-y-6">
      <WiFiCard config={config.wifi} language={language} />
      <PriceListCard config={config.priceList} language={language} title="Minibar" />
      <ContactsCard config={config.contacts} language={language} />
      <AttractionsCard config={config.attractions} language={language} title="Nearby" />
    </div>
  );
}
```

## Templates

Pre-configured templates for different hospitality verticals.

### Hotel Room Template

Perfect for hotel rooms accessed via QR code.

**Enabled Modules:**
- WiFi (room-specific)
- Price List (minibar, laundry)
- Services (room service, spa)
- Contacts (reception, concierge)
- Attractions (nearby places)
- Transport (taxi, airport shuttle)
- Deals (partner discounts)

```typescript
import { hotelRoomTemplate } from '@gudbro/core/templates';

// Customize for your hotel
const myHotelConfig = {
  ...hotelRoomTemplate,
  name: { en: 'Grand Hotel Da Nang', vi: 'Khách sạn Grand Đà Nẵng' },
  modules: {
    ...hotelRoomTemplate.modules,
    wifi: {
      networks: [
        { id: 'room', ssid: 'GrandHotel_Room_505', password: 'Welcome!', security: 'WPA2' },
      ],
      showPassword: true,
      showQrCode: true,
    },
  },
};
```

### Airbnb Template

Perfect for vacation rentals (Airbnb, VRBO, etc.)

**Enabled Modules:**
- WiFi (property credentials)
- House Rules (check-in/out, policies)
- Contacts (host, emergency)
- Attractions (local recommendations)
- Transport (getting around)
- Deals (host's favorite places)

```typescript
import { airbnbTemplate } from '@gudbro/core/templates';

const myPropertyConfig = {
  ...airbnbTemplate,
  name: { en: 'Cozy Beach Apartment', vi: 'Căn hộ Biển Ấm Cúng' },
  modules: {
    ...airbnbTemplate.modules,
    houseRules: {
      ...airbnbTemplate.modules.houseRules,
      maxGuests: 2,
      checkInTime: '15:00',
      checkOutTime: '10:00',
    },
  },
};
```

## Type Definitions

All types are exported for TypeScript:

```typescript
import type {
  // Languages
  LanguageCode,
  Language,
  MultiLangText,

  // Translation
  TranslationRequest,
  TranslationResult,
  TranslationContext,

  // Modules
  WiFiConfig,
  WiFiNetwork,
  PriceListConfig,
  PriceCategory,
  PriceItem,
  ContactsConfig,
  ContactNumber,
  EmergencyContact,
  AttractionsConfig,
  Attraction,
  TransportConfig,
  TransportOption,
  ServicesConfig,
  HouseRulesConfig,
  HouseRule,
  CheckInOutConfig,
  DealsConfig,
  PartnerDeal,

  // Templates
  TemplateType,
  TemplateConfig,
  ModuleType,
  ModuleConfig,
} from '@gudbro/core/modules';
```

## Supported Languages

| Code | Language | Flag |
|------|----------|------|
| `en` | English | 🇬🇧 |
| `vi` | Vietnamese | 🇻🇳 |
| `it` | Italian | 🇮🇹 |
| `ko` | Korean | 🇰🇷 |
| `zh` | Chinese | 🇨🇳 |
| `ja` | Japanese | 🇯🇵 |
| `th` | Thai | 🇹🇭 |
| `fr` | French | 🇫🇷 |
| `de` | German | 🇩🇪 |
| `es` | Spanish | 🇪🇸 |
| `pt` | Portuguese | 🇵🇹 |
| `ru` | Russian | 🇷🇺 |
| `ar` | Arabic | 🇸🇦 |
| `hi` | Hindi | 🇮🇳 |
| `id` | Indonesian | 🇮🇩 |
| `ms` | Malay | 🇲🇾 |

## Roadmap

### Phase 1 (Current)
- [x] Translation Engine (Claude, OpenAI)
- [x] WiFi Module
- [x] Price List Module
- [x] Contacts Module
- [x] Attractions Module
- [x] Hotel Room Template
- [x] Airbnb Template

### Phase 2 (Next)
- [ ] DeepL provider
- [ ] Google Translate provider
- [ ] Transport Module component
- [ ] Services Module component
- [ ] House Rules Module component
- [ ] Deals Module component
- [ ] F&B Template
- [ ] Hostel Template

### Phase 3 (Future)
- [ ] Local LLM provider (cost-free)
- [ ] Translation memory (reduce API calls)
- [ ] Batch translation UI in backoffice
- [ ] Export/import translations
- [ ] Integration with major PMS systems
