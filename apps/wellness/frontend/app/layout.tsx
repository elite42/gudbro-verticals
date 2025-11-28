import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { generateLocalBusinessMeta } from '@/lib/seo/meta-tags'
import { generateLocalBusinessSchema } from '@/lib/seo/schema-org'
import { BottomNav } from '@/components/BottomNav'

// Business data for SEO
const BUSINESS_DATA = {
  name: 'Da Nang Luxury Spa',
  description: 'Traditional Vietnamese spa and massage services in Da Nang. Our experienced therapists provide authentic Thai massage, aromatherapy, Korean facial treatments, and rejuvenating spa experiences. Book online with instant confirmation.',
  type: 'Spa',
  city: 'Da Nang',
  country: 'Vietnam',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://danangspa.gudbro.com',
  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=630&fit=crop',
  phone: '+84905234567',
  address: {
    street: '123 Tran Phu Street',
    city: 'Da Nang',
    region: 'Da Nang',
    postalCode: '550000',
    country: 'VN'
  },
  geo: {
    lat: 16.0544,
    lng: 108.2022
  },
  rating: {
    value: 4.9,
    count: 156
  },
  priceRange: '$$'
};

// Generate comprehensive meta tags
export const metadata: Metadata = generateLocalBusinessMeta(BUSINESS_DATA);

// Generate Schema.org structured data
const businessSchema = generateLocalBusinessSchema({
  ...BUSINESS_DATA,
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '09:00', close: '21:00' },
    { days: ['Saturday', 'Sunday'], open: '09:00', close: '22:00' }
  ],
  email: 'info@danangspa.com'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD for rich search results */}
        <Script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema)
          }}
        />
      </head>
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
