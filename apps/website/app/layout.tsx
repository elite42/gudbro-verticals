import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GUDBRO - QR-Powered Digital Experiences for Hospitality",
  description: "Transform your restaurant, hotel, or rental property with QR-based digital menus, room info, and guest services. Multi-language, multi-currency, AI-powered.",
  keywords: ["QR menu", "digital menu", "hotel QR", "restaurant technology", "hospitality SaaS", "Vietnam", "Da Nang"],
  authors: [{ name: "GUDBRO Team" }],
  openGraph: {
    title: "GUDBRO - QR-Powered Digital Experiences",
    description: "Transform your hospitality business with QR-based digital experiences",
    url: "https://gudbro.com",
    siteName: "GUDBRO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GUDBRO - QR-Powered Digital Experiences",
    description: "Transform your hospitality business with QR-based digital experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
