'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3013/api/wellness';
  const hubId = '660e8400-e29b-41d4-a716-446655440000';

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${apiUrl}/${hubId}/services`);
        const data = await res.json();
        setServices(data.data?.services || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = services.filter(
      (service) =>
        service.name.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.category?.toLowerCase().includes(query)
    );
    setFilteredServices(results);
  }, [searchQuery, services]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-pink-600">
              Jennie SPA
            </Link>
            <Link href="/" className="text-gray-600 hover:text-pink-600">
              ← Indietro
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-800">🔍 Cerca Servizi</h1>
          <p className="text-xl text-gray-600">Trova il trattamento perfetto per te</p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca massaggi, trattamenti viso, unghie..."
              className="w-full rounded-full border-2 border-pink-300 px-6 py-4 text-lg outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
              autoFocus
            />
            <svg
              className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery.trim() === '' ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔎</div>
            <p className="text-xl text-gray-600">Inizia a digitare per cercare i nostri servizi</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">😕</div>
            <p className="mb-2 text-xl text-gray-600">Nessun risultato per "{searchQuery}"</p>
            <p className="text-gray-500">Prova con un termine di ricerca diverso</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-lg text-gray-700">
                Trovati <strong>{filteredServices.length}</strong> servizi
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="transform overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase text-pink-600">
                        {service.category}
                      </span>
                      <span className="text-sm text-gray-500">{service.duration} min</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">{service.name}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">{service.description}</p>

                    {service.pricing && Object.keys(service.pricing).length > 0 && (
                      <div className="mb-4 border-t pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Da:</span>
                          <span className="text-lg font-bold text-pink-600">
                            {(
                              Object.values(service.pricing)[0] as { base?: number }
                            )?.base?.toLocaleString()}{' '}
                            VND
                          </span>
                        </div>
                      </div>
                    )}

                    <Link
                      href={`https://zalo.me/0932594962?text=${encodeURIComponent(
                        `Vorrei prenotare: ${service.name} (${service.duration} min)`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg bg-pink-500 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-pink-600"
                    >
                      💬 Prenota su Zalo
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Quick Links */}
        <div className="mt-12 rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">🔥 Ricerche Popolari</h2>
          <div className="flex flex-wrap gap-3">
            {['Massaggio', 'Facial', 'Manicure', 'Pedicure', 'Thai Massage', 'Hot Stone'].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="rounded-full bg-pink-100 px-4 py-2 font-semibold text-pink-700 transition-colors hover:bg-pink-200"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
