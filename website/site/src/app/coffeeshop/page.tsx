import { Metadata } from 'next';
import { VerticalPageTemplate } from '@/components/verticals/VerticalPageTemplate';
import {
  Coffee,
  QrCode,
  Translate,
  CurrencyCircleDollar,
  Leaf,
  DeviceMobile,
  WifiHigh,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Coffeeshop - Digital Menus for Cafes & Restaurants | GUDBRO',
  description: 'Transform your cafe with digital QR menus. 50+ languages auto-translated, allergen filters, multi-currency pricing. Setup in 10 minutes.',
};

const coffeeshopData = {
  name: 'Coffeeshop',
  tagline: 'Digital Menus That Speak Every Language',
  description: 'Replace paper menus forever. Let tourists explore your menu in their own language, see allergen info, and understand exactly what they\'re ordering.',
  icon: Coffee,
  color: '#2563EB',
  status: 'live' as const,
  features: [
    {
      title: 'QR Code Access',
      description: 'Customers scan once, access your menu instantly. No app download needed.',
      icon: QrCode,
    },
    {
      title: '50+ Languages',
      description: 'Auto-translate your entire menu. Vietnamese, English, Korean, Japanese, Chinese & more.',
      icon: Translate,
    },
    {
      title: 'Multi-Currency Pricing',
      description: 'Show prices in VND, USD, EUR, KRW, JPY. Tourists see prices in their currency.',
      icon: CurrencyCircleDollar,
    },
    {
      title: 'Allergen & Dietary Filters',
      description: 'Gluten-free, vegan, halal, nut-free. Customers filter by their dietary needs.',
      icon: Leaf,
    },
    {
      title: 'Mobile-First Design',
      description: 'Beautiful on any phone. Fast loading even on 3G connections.',
      icon: DeviceMobile,
    },
    {
      title: 'Offline Support',
      description: 'Works even with spotty WiFi. Perfect for busy markets and rural areas.',
      icon: WifiHigh,
    },
  ],
  benefits: [
    'Setup in under 10 minutes',
    'No technical skills required',
    'Zero commission on orders',
    'Update menu anytime from your phone',
    'Professional digital presence',
  ],
  useCases: [
    {
      title: 'Street Food Vendors',
      description: 'Show your full menu with photos and prices. No more pointing and hand gestures.',
    },
    {
      title: 'Specialty Cafes',
      description: 'Explain your Vietnamese coffee culture, bean origins, and brewing methods.',
    },
    {
      title: 'Tourist-Heavy Restaurants',
      description: 'Serve Korean, Japanese, and Chinese tourists in their native language.',
    },
    {
      title: 'Health-Conscious Eateries',
      description: 'Highlight vegan, gluten-free, and allergen info prominently.',
    },
    {
      title: 'Multi-Location Chains',
      description: 'Manage all your menus from a single dashboard.',
    },
    {
      title: 'Food Courts & Markets',
      description: 'Stand out with a professional digital menu when competitors have paper.',
    },
  ],
  cta: {
    primary: 'Create Your Menu Free',
    secondary: 'See Live Demo',
  },
};

export default function CoffeeshopPage() {
  return <VerticalPageTemplate vertical={coffeeshopData} />;
}
