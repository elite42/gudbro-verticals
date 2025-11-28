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
    const results = services.filter((service) =>
      service.name.toLowerCase().includes(query) ||
      service.description?.toLowerCase().includes(query) ||
      service.category?.toLowerCase().includes(query)
    );
    setFilteredServices(results);
  }, [searchQuery, services]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">🔍 Cerca Servizi</h1>
          <p className="text-xl text-gray-600">
            Trova il trattamento perfetto per te
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca massaggi, trattamenti viso, unghie..."
              className="w-full px-6 py-4 text-lg border-2 border-pink-300 rounded-full focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none transition-all"
              autoFocus
            />
            <svg
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔎</div>
            <p className="text-xl text-gray-600">
              Inizia a digitare per cercare i nostri servizi
            </p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <p className="text-xl text-gray-600 mb-2">
              Nessun risultato per "{searchQuery}"
            </p>
            <p className="text-gray-500">
              Prova con un termine di ricerca diverso
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-lg text-gray-700">
                Trovati <strong>{filteredServices.length}</strong> servizi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-pink-600 uppercase">
                        {service.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.duration} min
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {service.description}
                    </p>

                    {service.pricing && Object.keys(service.pricing).length > 0 && (
                      <div className="border-t pt-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Da:</span>
                          <span className="text-lg font-bold text-pink-600">
                            {Object.values(service.pricing)[0]?.base?.toLocaleString()} VND
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
                      className="block text-center bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
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
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔥 Ricerche Popolari</h2>
          <div className="flex flex-wrap gap-3">
            {['Massaggio', 'Facial', 'Manicure', 'Pedicure', 'Thai Massage', 'Hot Stone'].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors font-semibold"
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
