import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-context';
import { DirectionProvider } from '@/components/DirectionProvider';
import { MerchantConfigProvider } from '@/lib/contexts/MerchantConfigContext';
import { PWAProvider } from '@/components/PWAProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ROOTS Plant-Based Cafe - Healthy Vegan Restaurant in Danang',
  description: 'Clean food opportunity for everyone. Modern plant-based dining using fresh, locally farmed produce in Đà Nẵng, Vietnam.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ROOTS',
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#DC2626',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/pwa/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <PWAProvider>
          <ThemeProvider>
            <MerchantConfigProvider>
              <DirectionProvider>{children}</DirectionProvider>
            </MerchantConfigProvider>
          </ThemeProvider>
        </PWAProvider>
      </body>
    </html>
  );
}
