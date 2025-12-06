import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-context';
import { DirectionProvider } from '@/components/DirectionProvider';
import { MerchantConfigProvider } from '@/lib/contexts/MerchantConfigContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ROOTS Plant-Based Cafe - Healthy Vegan Restaurant in Danang',
  description: 'Clean food opportunity for everyone. Modern plant-based dining using fresh, locally farmed produce in Đà Nẵng, Vietnam.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <MerchantConfigProvider>
            <DirectionProvider>{children}</DirectionProvider>
          </MerchantConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
