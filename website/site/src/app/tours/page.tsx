import { Metadata } from 'next';
import { VerticalPageTemplate } from '@/components/verticals/VerticalPageTemplate';
import {
  MapTrifold,
  MapPin,
  Images,
  CalendarCheck,
  WhatsappLogo,
  Star,
  CurrencyCircleDollar,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Tours - Booking Platform for Tour Operators | GUDBRO',
  description: 'Zero commission tour bookings. Route maps, multi-currency, photo galleries, WhatsApp confirmations. Beat Klook at 0% fees.',
};

const toursData = {
  name: 'Tours',
  tagline: 'Your Tours, Zero Commission',
  description: 'Stop losing sales to language barriers and big booking platforms. Let tourists discover, understand, and book your tours directly—no 15-25% commission.',
  icon: MapTrifold,
  color: '#10B981',
  status: 'beta' as const,
  features: [
    {
      title: 'Route Maps',
      description: 'Show exact tour routes with stops, duration, and highlights. Tourists know exactly what to expect.',
      icon: MapPin,
    },
    {
      title: 'Photo Galleries',
      description: 'Upload beautiful photos of your tours. Let your experiences sell themselves.',
      icon: Images,
    },
    {
      title: 'Instant Booking',
      description: 'Customers book and pay directly. No more missed opportunities.',
      icon: CalendarCheck,
    },
    {
      title: 'WhatsApp/Zalo Confirmations',
      description: 'Automatic confirmations via WhatsApp or Zalo. Tourists get instant peace of mind.',
      icon: WhatsappLogo,
    },
    {
      title: 'Reviews & Ratings',
      description: 'Build trust with verified reviews from happy customers.',
      icon: Star,
    },
    {
      title: 'Multi-Currency Display',
      description: 'Show prices in VND and tourist\'s home currency simultaneously.',
      icon: CurrencyCircleDollar,
    },
  ],
  benefits: [
    '0% commission (vs 15-25% on Klook/GetYourGuide)',
    'Perfect for street vendors with QR signs',
    'No more language barriers',
    'Get paid directly to your account',
    'Build your own customer database',
  ],
  useCases: [
    {
      title: 'Motorbike Tour Guides',
      description: 'Show your routes, stops, and included meals. Customers book confidence.',
    },
    {
      title: 'Walking Tour Operators',
      description: 'Explain historical sites and cultural context in any language.',
    },
    {
      title: 'Boat & Cruise Tours',
      description: 'Display departure times, route maps, and what\'s included.',
    },
    {
      title: 'Food Tour Guides',
      description: 'Show all the delicious stops with photos and dietary info.',
    },
    {
      title: 'Adventure Activities',
      description: 'Kayaking, hiking, cycling—show difficulty levels and requirements.',
    },
    {
      title: 'Airport & Transport Services',
      description: 'Fixed pricing, vehicle photos, instant booking for transfers.',
    },
  ],
  cta: {
    primary: 'List Your Tours Free',
    secondary: 'See Example',
  },
};

export default function ToursPage() {
  return <VerticalPageTemplate vertical={toursData} />;
}
