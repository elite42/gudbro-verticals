import React, { useState } from 'react';
import { RentalHero } from './RentalHero';
import { FleetGallery } from './FleetGallery';
import { WhatsAppContactForm } from './WhatsAppContactForm';
import { VietQRPayment } from './VietQRPayment';

interface RentalServiceTemplateProps {
  hubId: string;
  businessName: string;
  description: string;
  logo?: string;
  coverImage?: string;
  tagline?: string;
  whatsappNumber: string;
  features?: Array<{ icon: string; text: string }>;
  pricing?: Record<string, string>;
  apiUrl?: string;
}

export const RentalServiceTemplate: React.FC<RentalServiceTemplateProps> = ({
  hubId,
  businessName,
  description,
  logo,
  coverImage,
  tagline,
  whatsappNumber,
  features = [],
  pricing = {},
  apiUrl,
}) => {
  const [selectedBike, setSelectedBike] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingAmount, setBookingAmount] = useState(0);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectBike = (bike: any) => {
    setSelectedBike(bike);
    scrollToBooking();
  };

  return (
    <div className="rental-service-template" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <RentalHero
        businessName={businessName}
        description={description}
        logo={logo}
        coverImage={coverImage}
        tagline={tagline}
        onBookNow={scrollToBooking}
      />

      {/* Features Section */}
      {features.length > 0 && (
        <section
          style={{
            padding: '3rem 2rem',
            backgroundColor: 'white',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                textAlign: 'center',
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#374151',
                    }}
                  >
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fleet Gallery */}
      <FleetGallery hubId={hubId} apiUrl={apiUrl} onSelectBike={handleSelectBike} />

      {/* Pricing Table */}
      {Object.keys(pricing).length > 0 && (
        <section
          style={{
            padding: '4rem 2rem',
            backgroundColor: 'white',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              Pricing
            </h2>

            <div
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: '#f97316', color: 'white' }}>
                    <th
                      style={{
                        padding: '1rem',
                        textAlign: 'left',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                      }}
                    >
                      Duration
                    </th>
                    <th
                      style={{
                        padding: '1rem',
                        textAlign: 'right',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                      }}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(pricing).map(([duration, price], index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                        borderBottom: '1px solid #e5e7eb',
                      }}
                    >
                      <td style={{ padding: '1rem', fontSize: '1rem' }}>{duration}</td>
                      <td
                        style={{
                          padding: '1rem',
                          textAlign: 'right',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#f97316',
                        }}
                      >
                        {price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p
              style={{
                marginTop: '1.5rem',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '1rem',
              }}
            >
              💡 Long-term rentals get the best rates!
            </p>
          </div>
        </section>
      )}

      {/* Booking Section */}
      <div id="booking-section">
        <WhatsAppContactForm
          hubId={hubId}
          whatsappNumber={whatsappNumber}
          selectedBike={selectedBike}
          apiUrl={apiUrl}
        />
      </div>

      {/* Payment Section (Optional - shown when booking confirmed) */}
      {showPayment && bookingAmount > 0 && (
        <VietQRPayment
          hubId={hubId}
          amount={bookingAmount}
          description={`Rental deposit - ${selectedBike?.brand} ${selectedBike?.model}`}
          apiUrl={apiUrl}
        />
      )}

      {/* Footer */}
      <footer
        style={{
          padding: '2rem',
          backgroundColor: '#1f2937',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <p style={{ marginBottom: '0.5rem' }}>{businessName}</p>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Powered by Gudbro 🚀</p>
      </footer>
    </div>
  );
};
