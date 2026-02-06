import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { generateLocalBusinessMeta } from '@/lib/seo/meta-tags';
import { generateLocalBusinessSchema } from '@/lib/seo/schema-org';
import ClientShell from '@/components/ClientShell';

// Business data for SEO
const BUSINESS_DATA = {
  name: 'GUDBRO Workshops & Experiences',
  description:
    'Discover authentic artisan workshops and cultural experiences in Da Nang & Hoi An, Vietnam. Cooking classes, pottery, lantern making, silk weaving, and more — taught by local masters. Book via WhatsApp or Zalo.',
  type: 'TouristAttraction',
  city: 'Da Nang & Hoi An',
  country: 'Vietnam',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://workshops.gudbro.com',
  image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&h=630&fit=crop',
  phone: '+84905456789',
  address: {
    street: 'Da Nang & Hoi An Corridor',
    city: 'Da Nang',
    region: 'Central Vietnam',
    postalCode: '550000',
    country: 'VN',
  },
  geo: {
    lat: 16.0471,
    lng: 108.2068,
  },
  rating: {
    value: 4.9,
    count: 312,
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
  themeColor: '#C2703E',
};

// Generate Schema.org structured data
const businessSchema = generateLocalBusinessSchema({
  ...BUSINESS_DATA,
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      open: '08:00',
      close: '18:00',
    },
  ],
  email: 'workshops@gudbro.com',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DM Serif Display + DM Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />

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
      <body className="antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
