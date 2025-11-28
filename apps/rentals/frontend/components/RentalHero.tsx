import React from 'react';

interface RentalHeroProps {
  businessName: string;
  description: string;
  logo?: string;
  coverImage?: string;
  tagline?: string;
  onBookNow?: () => void;
}

export const RentalHero: React.FC<RentalHeroProps> = ({
  businessName,
  description,
  logo,
  coverImage,
  tagline,
  onBookNow
}) => {
  return (
    <section className="rental-hero">
      {/* Cover Image Background */}
      {coverImage && (
        <div
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <div className="hero-content">
            {logo && (
              <img
                src={logo}
                alt={businessName}
                className="hero-logo"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  marginBottom: '1.5rem',
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              />
            )}

            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              {businessName}
            </h1>

            {tagline && (
              <p style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                {tagline}
              </p>
            )}

            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              {description}
            </p>

            {onBookNow && (
              <button
                onClick={onBookNow}
                style={{
                  backgroundColor: '#f97316',
                  color: 'white',
                  padding: '1rem 3rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(249,115,22,0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(249,115,22,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(249,115,22,0.4)';
                }}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
