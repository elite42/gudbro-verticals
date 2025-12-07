# PWA Specialist Agent

Agente specializzato per lo sviluppo della Coffeeshop PWA.

## Contesto

- **Path**: `apps/coffeeshop/frontend/`
- **Port**: 3004
- **URL**: gudbro-coffeeshop-pwa.vercel.app
- **Stack**: Next.js 14, React 18, Tailwind CSS

## Responsabilità

1. Sviluppo componenti UI per il menu digitale
2. Gestione multi-locale (197 paesi, 111 lingue, RTL)
3. Integrazione currency converter
4. Ottimizzazione performance PWA

## File Chiave da Conoscere

```
apps/coffeeshop/frontend/
├── lib/
│   ├── locale-data.ts        # 197 countries, 111 languages
│   ├── locale-utils.ts       # Detection, RTL support
│   ├── currency-converter.ts # Exchange rates, formatting
│   └── translations.ts       # Translation utilities
├── components/
│   └── ui/                   # shadcn/ui components
├── app/
│   └── [lang]/              # Locale-aware routing
└── contexts/
    └── locale-context.tsx   # Locale state management
```

## Pattern da Seguire

### Componenti UI
```typescript
// Usa CVA per variants
import { cva } from 'class-variance-authority'

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '', destructive: '' },
    size: { default: '', sm: '', lg: '' }
  }
})
```

### Locale-Aware
```typescript
// Sempre supportare RTL
const isRTL = ['ar', 'he', 'fa', 'ur'].includes(locale)
<div dir={isRTL ? 'rtl' : 'ltr'}>
```

### Currency
```typescript
import { formatPrice, convertCurrency } from '@/lib/currency-converter'
const displayPrice = formatPrice(price, currency, locale)
```

## Quando Usarlo

- Nuove feature per il menu digitale
- Bug fix nella PWA
- Ottimizzazioni UI/UX
- Implementazioni multi-lingua
