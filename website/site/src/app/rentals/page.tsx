import { Metadata } from 'next';
import { VerticalPageTemplate } from '@/components/verticals/VerticalPageTemplate';
import {
  Car,
  CurrencyCircleDollar,
  FileText,
  Shield,
  Camera,
  CalendarBlank,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Rentals - Vehicle & Equipment Rental Management | GUDBRO',
  description: 'Digital rental management. Vehicle catalogs, flexible pricing, digital contracts, deposit management, damage documentation.',
};

const rentalsData = {
  name: 'Rentals',
  tagline: 'Rentals Without the Paperwork',
  description: 'Digitize your entire rental operation. From vehicle catalogs to contracts to damage documentation—all paperless, all professional.',
  icon: Car,
  color: '#8B5CF6',
  status: 'coming' as const,
  features: [
    {
      title: 'Vehicle Catalog',
      description: 'Show your full fleet with photos, specs, and availability.',
      icon: Car,
    },
    {
      title: 'Flexible Pricing',
      description: 'Hourly, daily, weekly, monthly rates. Automatic discounts for longer rentals.',
      icon: CurrencyCircleDollar,
    },
    {
      title: 'Digital Contracts',
      description: 'E-signatures on rental agreements. No more paper forms.',
      icon: FileText,
    },
    {
      title: 'Deposit Management',
      description: 'Track deposits, refunds, and damage deductions digitally.',
      icon: Shield,
    },
    {
      title: 'Damage Documentation',
      description: 'Photo-based condition reports at pickup and return. Clear evidence if needed.',
      icon: Camera,
    },
    {
      title: 'Availability Calendar',
      description: 'Real-time fleet availability. Prevent double-bookings automatically.',
      icon: CalendarBlank,
    },
  ],
  benefits: [
    'Eliminate paper contracts',
    'Clear damage documentation',
    'Automatic pricing calculations',
    'Professional customer experience',
    'Manage multiple vehicles easily',
  ],
  useCases: [
    {
      title: 'Motorbike Rentals',
      description: 'Show scooters, semi-automatics, and manual bikes with clear pricing.',
    },
    {
      title: 'Car Rentals',
      description: 'Fleet photos, specs, insurance options, and add-ons.',
    },
    {
      title: 'Bicycle Rentals',
      description: 'City bikes, mountain bikes, e-bikes with hourly and daily rates.',
    },
    {
      title: 'Surfboard & Beach Gear',
      description: 'Boards, kayaks, snorkel gear with size guides and availability.',
    },
    {
      title: 'Camera & Equipment',
      description: 'Drone rentals, GoPros, photography gear with deposit tracking.',
    },
    {
      title: 'Event Equipment',
      description: 'Speakers, lights, tents with delivery and setup options.',
    },
  ],
  cta: {
    primary: 'Join Waitlist',
    secondary: 'See Concept',
  },
};

export default function RentalsPage() {
  return <VerticalPageTemplate vertical={rentalsData} />;
}
