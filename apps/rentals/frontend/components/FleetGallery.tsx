import React, { useState, useEffect } from 'react';

interface FleetItem {
  id: string;
  type: string;
  brand: string;
  model: string;
  year?: number;
  color?: string;
  specs?: Record<string, any>;
  photos?: string[];
  thumbnail?: string;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  isAvailable: boolean;
  condition?: string;
}

interface FleetGalleryProps {
  hubId: string;
  apiUrl?: string;
  onSelectBike?: (bike: FleetItem) => void;
}

export const FleetGallery: React.FC<FleetGalleryProps> = ({
  hubId,
  apiUrl = '/api/rentals',
  onSelectBike
}) => {
  const [fleet, setFleet] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await fetch(`${apiUrl}/${hubId}/fleet`);
        if (!response.ok) throw new Error('Failed to fetch fleet');
        const data = await response.json();
        setFleet(data.fleet || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFleet();
  }, [hubId, apiUrl]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p>Loading fleet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="fleet-gallery" style={{ padding: '4rem 2rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          Our Fleet
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          marginBottom: '3rem',
          fontSize: '1.1rem'
        }}>
          Choose from our well-maintained bikes and scooters
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {fleet.map((bike) => (
            <div
              key={bike.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onClick={() => onSelectBike?.(bike)}
            >
              {/* Bike Image */}
              <div style={{
                height: '200px',
                backgroundColor: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {bike.thumbnail || bike.photos?.[0] ? (
                  <img
                    src={bike.thumbnail || bike.photos?.[0]}
                    alt={`${bike.brand} ${bike.model}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                    <p>🏍️</p>
                    <p>No image</p>
                  </div>
                )}
              </div>

              {/* Bike Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {bike.brand} {bike.model}
                </h3>

                {bike.year && (
                  <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                    {bike.year} • {bike.color}
                  </p>
                )}

                {/* Specs */}
                {bike.specs && (
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    color: '#4b5563'
                  }}>
                    {bike.specs.engine && <span>⚙️ {bike.specs.engine}</span>}
                    {bike.specs.transmission && <span>🔧 {bike.specs.transmission}</span>}
                  </div>
                )}

                {/* Price */}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '1rem',
                  marginTop: '1rem'
                }}>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: '#f97316',
                    marginBottom: '0.5rem'
                  }}>
                    {formatPrice(bike.dailyRate)}/day
                  </div>

                  {(bike.weeklyRate || bike.monthlyRate) && (
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                      {bike.weeklyRate && <div>Week: {formatPrice(bike.weeklyRate)}</div>}
                      {bike.monthlyRate && <div>Month: {formatPrice(bike.monthlyRate)}</div>}
                    </div>
                  )}
                </div>

                {/* Select Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBike?.(bike);
                  }}
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#f97316',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ea580c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f97316';
                  }}
                >
                  Select This Bike
                </button>
              </div>
            </div>
          ))}
        </div>

        {fleet.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            <p>No bikes available at the moment. Please check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
};
