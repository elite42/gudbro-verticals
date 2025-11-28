'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StaffPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3013/api/wellness';
  const hubId = '660e8400-e29b-41d4-a716-446655440000';

  useEffect(() => {
    async function fetchStaff() {
      try {
        const res = await fetch(`${apiUrl}/${hubId}/staff`);
        const data = await res.json();
        setStaff(data.data?.staff || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setLoading(false);
      }
    }
    fetchStaff();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading our team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-pink-600">Da Nang Luxury Spa</Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-pink-600">Home</Link>
              <Link href="/services" className="text-gray-600 hover:text-pink-600">Services</Link>
              <Link href="/staff" className="text-pink-600 font-semibold">Our Team</Link>
              <Link href="/#booking" className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">Book Now</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Expert Therapists</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Meet our skilled and certified wellness professionals dedicated to your relaxation and rejuvenation
          </p>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <Link
                key={member.id}
                href={`/staff/${member.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <img src={member.image} alt={member.name} className="w-full h-80 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-pink-600 font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

                  {member.specialties && member.specialties.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.slice(0, 3).map((specialty: string, idx: number) => (
                          <span key={idx} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                        {member.specialties.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            +{member.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {member.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(member.rating.average) ? 'text-yellow-400' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {member.rating.average} ({member.rating.count} reviews)
                      </span>
                    </div>
                  )}

                  <div className="text-pink-600 font-semibold text-sm flex items-center">
                    View Profile & Book
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book with Your Preferred Therapist</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose your favorite therapist or let us match you with the perfect professional for your needs.
          </p>
          <Link
            href="/#booking"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Da Nang Luxury Spa</h3>
          <p className="text-gray-400 mb-6">🌺 Your Wellness Sanctuary</p>
          <div className="flex justify-center gap-6 mb-6">
            <Link href="/" className="text-gray-400 hover:text-pink-400">Home</Link>
            <Link href="/services" className="text-gray-400 hover:text-pink-400">Services</Link>
            <Link href="/staff" className="text-gray-400 hover:text-pink-400">Our Team</Link>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 Da Nang Luxury Spa. Powered by <span className="text-pink-400">Gudbro</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
