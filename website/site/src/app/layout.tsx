import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "GUDBRO - Zero Commission PWAs for Southeast Asian Businesses",
  description: "Digital menus, tour bookings, accommodation management & more. Zero commission platform empowering cafes, hotels, and tour operators across Vietnam, Thailand, and Indonesia.",
  keywords: ["digital menu", "QR menu", "tour booking", "hotel booking", "Vietnam", "Thailand", "Bali", "PWA", "zero commission"],
  openGraph: {
    title: "GUDBRO - Your Business, Beautifully Digital",
    description: "Zero commission PWAs for cafes, tours, hotels & more in Southeast Asia.",
    type: "website",
    locale: "en_US",
    siteName: "GUDBRO",
  },
  twitter: {
    card: "summary_large_image",
    title: "GUDBRO - Your Business, Beautifully Digital",
    description: "Zero commission PWAs for cafes, tours, hotels & more in Southeast Asia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
