'use client';

import { useState } from 'react';
import Link from 'next/link';
import { wellnessConfig } from '../config/wellness.config';

export default function HomePage() {
  const [language, setLanguage] = useState(wellnessConfig.i18n?.defaultLanguage || 'en');
  const [currency, setCurrency] = useState(wellnessConfig.i18n?.defaultCurrency || 'VND');

  // Extract config values for easier access
  const { business, contact, social, location, reviews, paymentMethods, i18n, ui } = wellnessConfig;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          {/* Logo + Name */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={business.logo}
              alt={business.name}
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-pink-600">{business.name}</h1>
              <p className="text-sm text-gray-600">{business.tagline}</p>
            </div>
          </div>

          {/* Social Icons + Language/Currency Selectors */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <a href={social?.facebook} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform">
                📘
              </a>
              <a href={social?.instagram} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform">
                📷
              </a>
              <a href={social?.tiktok} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform">
                🎵
              </a>
            </div>

            <div className="flex gap-2">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {(i18n?.supportedLanguages || []).map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.code.toUpperCase()}
                  </option>
                ))}
              </select>

              {/* Currency Selector */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {(i18n?.supportedCurrencies || []).map((curr) => (
                  <option key={curr} value={curr}>
                    💱 {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Card Grid */}
      <div className="container mx-auto px-4 py-6 space-y-4">

        {/* Row 1: Servizi + Promozioni */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Servizi Card */}
          <Link href="/services" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-5xl">💆</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Servizi</h2>
                <p className="text-sm text-gray-600">Browse categorie & prezzi</p>
              </div>
            </div>
            <p className="text-gray-600 mb-3">
              Massaggi, trattamenti viso, unghie e molto altro
            </p>
            <div className="flex items-center justify-between text-pink-600 font-semibold">
              <span>Vedi tutti i servizi</span>
              <span>→</span>
            </div>
          </Link>

          {/* Promozioni Card */}
          <Link href="/promotions" className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 text-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-5xl">🎁</div>
              <div>
                <h2 className="text-2xl font-bold">Promozioni</h2>
                <p className="text-sm opacity-90">Offerte speciali</p>
              </div>
            </div>
            <p className="mb-3 opacity-90">
              -20% su tutti i massaggi a Febbraio!
            </p>
            <div className="flex items-center justify-between font-semibold">
              <span>Scopri le promo</span>
              <span>→</span>
            </div>
          </Link>
        </div>

        {/* Row 2: Pacchetti VIP */}
        <Link href="/packages" className="block bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 text-white">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-5xl">📦</div>
            <div>
              <h2 className="text-2xl font-bold">Pacchetti VIP</h2>
              <p className="text-sm opacity-90">Combo da 400.000 VND</p>
            </div>
          </div>
          <p className="mb-3 opacity-90">
            VIP 1: Ear cleaning + Facial + Shampoo (60min) | VIP 2: Full package (90min)
          </p>
          <div className="flex items-center justify-between font-semibold">
            <span>Vedi i pacchetti</span>
            <span>→</span>
          </div>
        </Link>

        {/* Row 3: Recensioni */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">⭐</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Lascia una Recensione</h2>
              <p className="text-sm text-gray-600">Aiutaci a crescere!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={reviews?.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
            >
              📱 Google
            </a>
            <a
              href={reviews?.tripadvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
            >
              ✈️ TripAdvisor
            </a>
          </div>
        </div>

        {/* Row 4: Contatti */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">📞</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Contattaci</h2>
              <p className="text-sm text-gray-600">Prenota il tuo trattamento</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a
              href={`https://zalo.me/${contact?.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
            >
              💬 Zalo
            </a>
            <a
              href={`https://wa.me/${contact?.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
            >
              📱 WhatsApp
            </a>
            <a
              href={`tel:${contact?.phone}`}
              className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
            >
              📞 Call
            </a>
          </div>
        </div>

        {/* Row 5: Metodi di Pagamento */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">💳</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Accettiamo</h2>
              <p className="text-sm text-gray-600">Metodi di pagamento disponibili</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold text-sm"
              >
                {method === 'Cash' && '💵'}
                {method === 'Card' && '💳'}
                {method === 'MoMo' && '📱'}
                {method === 'ZaloPay' && '💰'}
                {method === 'GrabPay' && '🚗'}
                {' '}{method}
              </span>
            ))}
          </div>
        </div>

        {/* Row 6: Come Raggiungerci */}
        <a
          href={location?.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="text-5xl">📍</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Come Raggiungerci</h2>
              <p className="text-sm text-gray-600">{location?.address}</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-3">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location?.address || '')}`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
          <div className="flex items-center justify-between text-pink-600 font-semibold">
            <span>Apri su Google Maps</span>
            <span>→</span>
          </div>
        </a>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 {business.name}. Powered by <span className="text-pink-400">Gudbro</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
