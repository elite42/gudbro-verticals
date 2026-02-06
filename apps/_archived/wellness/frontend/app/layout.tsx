import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { generateLocalBusinessMeta } from '@/lib/seo/meta-tags';
import { generateLocalBusinessSchema } from '@/lib/seo/schema-org';

// Business data for SEO
const BUSINESS_DATA = {
  name: 'Serene Wellness & Beauty',
  description:
    'Premium spa, massage, hair salon, and beauty services in Da Nang. Traditional Vietnamese massage, luxury hair treatments, nail art, and wellness packages. Book online with instant confirmation.',
  type: 'Spa',
  city: 'Da Nang',
  country: 'Vietnam',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://serenewellness.gudbro.com',
  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=630&fit=crop',
  phone: '+84123456789',
  address: {
    street: '123 Nguyen Van Linh',
    city: 'Hai Chau, Da Nang',
    region: 'Da Nang',
    postalCode: '550000',
    country: 'VN',
  },
  geo: {
    lat: 16.0544,
    lng: 108.2022,
  },
  rating: {
    value: 4.8,
    count: 247,
  },
  priceRange: '$$',
};

// Generate comprehensive meta tags
export const metadata: Metadata = generateLocalBusinessMeta(BUSINESS_DATA);

// Viewport configuration for mobile-first PWA
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#8BA888',
};

// Generate Schema.org structured data
const businessSchema = generateLocalBusinessSchema({
  ...BUSINESS_DATA,
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      open: '09:00',
      close: '21:00',
    },
  ],
  email: 'hello@serenewellness.com',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* Schema.org JSON-LD for rich search results */}
        <Script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
