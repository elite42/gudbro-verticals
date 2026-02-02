import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { generateLocalBusinessMeta } from '@/lib/seo/meta-tags';
import { generateLocalBusinessSchema } from '@/lib/seo/schema-org';
import ClientShell from '@/components/ClientShell';

const BUSINESS_DATA = {
  name: 'Iron Paradise Gym & Fitness',
  description: 'Modern gym & fitness center in Da Nang with day passes, monthly memberships, group classes, personal training, swimming pool, and full equipment. Open to locals, expats, and tourists.',
  type: 'HealthAndBeautyBusiness',
  city: 'Da Nang',
  country: 'Vietnam',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://gym.gudbro.com',
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop',
  phone: '+84935456789',
  address: {
    street: '88 Vo Nguyen Giap',
    city: 'Son Tra, Da Nang',
    region: 'Da Nang',
    postalCode: '550000',
    country: 'VN',
  },
  geo: {
    lat: 16.0600,
    lng: 108.2450,
  },
  rating: {
    value: 4.7,
    count: 214,
  },
  priceRange: '$$',
};

export const metadata: Metadata = generateLocalBusinessMeta(BUSINESS_DATA);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#E85D04',
};

const businessSchema = generateLocalBusinessSchema({
  ...BUSINESS_DATA,
  telephone: BUSINESS_DATA.phone,
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      open: '05:30',
      close: '22:00',
    },
    {
      days: ['Saturday'],
      open: '06:00',
      close: '21:00',
    },
    {
      days: ['Sunday'],
      open: '07:00',
      close: '20:00',
    },
  ],
  email: 'info@ironparadise.gudbro.com',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
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
