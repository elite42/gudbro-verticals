import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { generateLocalBusinessMeta } from '@/lib/seo/meta-tags'
import { generateLocalBusinessSchema } from '@/lib/seo/schema-org'

// Business data for SEO
const BUSINESS_DATA = {
  name: 'Da Nang Bike Rentals',
  description: 'Professional motorbike and scooter rentals in Da Nang, Vietnam. Honda Wave, Yamaha Exciter, VinFast electric scooters, and bicycles available. Book online with instant confirmation.',
  type: 'Bike Rental',
  city: 'Da Nang',
  country: 'Vietnam',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://danangbikes.gudbro.com',
  image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=630&fit=crop',
  phone: '+84905123456',
  address: {
    street: '123 Bach Dang Street',
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
    value: 4.8,
    count: 127
  },
  priceRange: '$$'
};

// Generate comprehensive meta tags
export const metadata: Metadata = generateLocalBusinessMeta(BUSINESS_DATA);

// Generate Schema.org structured data
const businessSchema = generateLocalBusinessSchema({
  ...BUSINESS_DATA,
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '08:00', close: '20:00' },
    { days: ['Saturday', 'Sunday'], open: '08:00', close: '21:00' }
  ],
  email: 'info@danangbikes.com'
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
      <body>{children}</body>
    </html>
  )
}
