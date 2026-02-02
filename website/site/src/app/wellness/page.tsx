import { Metadata } from 'next';
import { VerticalPageTemplate } from '@/components/verticals/VerticalPageTemplate';
import {
  Sparkle,
  Clock,
  User,
  Package,
  CalendarCheck,
  Translate,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Wellness - Booking System for Spas & Massage | GUDBRO',
  description: 'Digital booking for wellness businesses. Service menus, staff selection, time slots, package deals. End WhatsApp booking chaos.',
};

const wellnessData = {
  name: 'Wellness',
  tagline: 'Bookings Made Blissful',
  description: 'End the WhatsApp booking chaos. Let customers browse your services, pick their therapist, choose a time slot, and book—all from their phone.',
  icon: Sparkle,
  color: '#EC4899',
  status: 'coming' as const,
  features: [
    {
      title: 'Service Menu',
      description: 'Full menu with descriptions, durations, and prices. Customers know exactly what they\'re getting.',
      icon: Clock,
    },
    {
      title: 'Staff Selection',
      description: 'Let customers choose their preferred therapist. Show availability and specialties.',
      icon: User,
    },
    {
      title: 'Package Deals',
      description: 'Create bundles and promotions. Couples packages, day spa deals, membership discounts.',
      icon: Package,
    },
    {
      title: 'Time Slot Booking',
      description: 'Real-time availability. Customers book the exact time that works for them.',
      icon: CalendarCheck,
    },
    {
      title: 'Multi-Language',
      description: 'Service descriptions in 50+ languages. Serve international tourists effortlessly.',
      icon: Translate,
    },
    {
      title: 'Duration-Based Pricing',
      description: '60min, 90min, 120min options. Customers choose their preferred session length.',
      icon: Clock,
    },
  ],
  benefits: [
    'End WhatsApp booking chaos',
    'Reduce no-shows with confirmations',
    'Upsell packages naturally',
    'Manage staff schedules easily',
    'Serve international tourists in their language',
  ],
  useCases: [
    {
      title: 'Massage Shops',
      description: 'Thai, Vietnamese, oil massage—show all options with clear pricing.',
    },
    {
      title: 'Day Spas',
      description: 'Full service menus, facility photos, and package deals.',
    },
    {
      title: 'Nail Salons',
      description: 'Manicure, pedicure, nail art with photos and duration estimates.',
    },
    {
      title: 'Hair Salons',
      description: 'Cuts, coloring, treatments with stylist selection.',
    },
    {
      title: 'Yoga & Meditation',
      description: 'Class schedules, instructor profiles, drop-in and package pricing.',
    },
    {
      title: 'Traditional Medicine',
      description: 'Acupuncture, cupping, herbal treatments with practitioner info.',
    },
  ],
  cta: {
    primary: 'Join Waitlist',
    secondary: 'See Concept',
  },
};

export default function WellnessPage() {
  return <VerticalPageTemplate vertical={wellnessData} />;
}
