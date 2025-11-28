'use client';

import { RentalServiceTemplate } from '@/components/RentalServiceTemplate';

export default function HomePage() {
  // Demo hub configuration (Da Nang Bike Rentals)
  const hubId = '550e8400-e29b-41d4-a716-446655440000';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3012/api/rentals';

  const businessConfig = {
    hubId,
    businessName: 'Da Nang Bike Rentals',
    description: 'Best motorbike & scooter rentals in Da Nang. Honda, Yamaha, VinFast available.',
    tagline: '🏍️ Your Freedom on Two Wheels',
    logo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=120&h=120&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=800&fit=crop',
    whatsappNumber: '+84905123456',
    apiUrl,
    features: [
      { icon: '✅', text: 'New & Well-Maintained Bikes' },
      { icon: '🛡️', text: 'Full Insurance Coverage' },
      { icon: '⚡', text: 'Instant Booking' },
      { icon: '💰', text: 'Best Rates in Da Nang' }
    ],
    pricing: {
      '1 Day': '120,000 - 200,000 VND',
      '1 Week': '700,000 - 1,200,000 VND',
      '1 Month': '2,500,000 - 4,000,000 VND',
      'Long-term (3+ months)': 'Special rates available'
    }
  };

  return (
    <main>
      <RentalServiceTemplate {...businessConfig} />
    </main>
  );
}
