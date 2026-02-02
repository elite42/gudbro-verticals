import { Metadata } from 'next';
import { VerticalPageTemplate } from '@/components/verticals/VerticalPageTemplate';
import {
  Bed,
  CalendarBlank,
  Coffee,
  TShirt,
  Buildings,
  DeviceMobile,
  CurrencyCircleDollar,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Stays - Direct Bookings for Hotels & Guesthouses | GUDBRO',
  description: 'Zero commission accommodation bookings. Compete with Booking.com, digitize in-stay services, manage multiple properties.',
};

const staysData = {
  name: 'Stays',
  tagline: 'Direct Bookings, Zero Commission',
  description: 'Why pay 15-25% to Booking.com? Accept direct bookings, digitize your in-stay services, and keep 100% of what you earn.',
  icon: Bed,
  color: '#F59E0B',
  status: 'coming' as const,
  features: [
    {
      title: 'Availability Calendar',
      description: 'Real-time room availability. Sync with your existing calendar or use ours.',
      icon: CalendarBlank,
    },
    {
      title: 'In-Stay Services',
      description: 'Digitize minibar, laundry, breakfast, room service. Guests order from their phone.',
      icon: Coffee,
    },
    {
      title: 'Laundry Service',
      description: 'Guests see prices, select items, schedule pickup. No more paper forms.',
      icon: TShirt,
    },
    {
      title: 'Multi-Property Dashboard',
      description: 'Manage all your properties from one place. Perfect for portfolio owners.',
      icon: Buildings,
    },
    {
      title: 'Guest PWA',
      description: 'Guests get a mini-app with all property info, WiFi, house rules, local tips.',
      icon: DeviceMobile,
    },
    {
      title: 'Direct Payments',
      description: 'Accept payments directly. No middleman fees, no delayed payouts.',
      icon: CurrencyCircleDollar,
    },
  ],
  benefits: [
    '0% commission (vs 15-25% on Booking.com)',
    'Digitize all in-room services',
    'Multi-property support',
    'Build direct guest relationships',
    'Upsell services naturally',
  ],
  useCases: [
    {
      title: 'Boutique Guesthouses',
      description: 'Offer a premium digital experience that big hotels can\'t match.',
    },
    {
      title: 'Homestays & B&Bs',
      description: 'Share house rules, local tips, and personal recommendations.',
    },
    {
      title: 'Villa Rentals',
      description: 'Professional booking page with photos, amenities, and instant confirmation.',
    },
    {
      title: 'Hostel Operators',
      description: 'Manage dorm beds, private rooms, and common area bookings.',
    },
    {
      title: 'Serviced Apartments',
      description: 'Long-stay friendly with weekly/monthly rates and service requests.',
    },
    {
      title: 'Resort Managers',
      description: 'Showcase facilities, activities, and dining options digitally.',
    },
  ],
  cta: {
    primary: 'Join Waitlist',
    secondary: 'See Wireframes',
  },
};

export default function StaysPage() {
  return <VerticalPageTemplate vertical={staysData} />;
}
