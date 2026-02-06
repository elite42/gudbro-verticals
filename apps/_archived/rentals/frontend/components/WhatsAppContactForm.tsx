import React, { useState } from 'react';

interface WhatsAppContactFormProps {
  hubId: string;
  whatsappNumber: string;
  selectedBike?: {
    brand: string;
    model: string;
  };
  apiUrl?: string;
}

export const WhatsAppContactForm: React.FC<WhatsAppContactFormProps> = ({
  hubId,
  whatsappNumber,
  selectedBike,
  apiUrl = '/api/rentals',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    bikeModel: selectedBike ? `${selectedBike.brand} ${selectedBike.model}` : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/${hubId}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success && data.whatsappUrl) {
        // Redirect to WhatsApp
        window.open(data.whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="whatsapp-contact"
      style={{
        padding: '4rem 2rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            Book Your Ride
          </h2>
          <p
            style={{
              color: '#6b7280',
              fontSize: '1.1rem',
            }}
          >
            Send us your details and we'll get back to you on WhatsApp instantly
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#f9fafb',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          {/* Name */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151',
              }}
            >
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
              }}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151',
              }}
            >
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+84 905 123 456"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
              }}
            />
          </div>

          {/* Bike Model */}
          {selectedBike && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#374151',
                }}
              >
                Selected Bike
              </label>
              <input
                type="text"
                value={formData.bikeModel}
                onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  backgroundColor: '#e5e7eb',
                }}
                readOnly
              />
            </div>
          )}

          {/* Message */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151',
              }}
            >
              Message *
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="I'd like to rent a bike for 3 days starting from..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#25D366', // WhatsApp green
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#128C7E';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366';
            }}
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <span>💬</span>
                <span>Contact via WhatsApp</span>
              </>
            )}
          </button>

          <p
            style={{
              marginTop: '1rem',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#6b7280',
            }}
          >
            You'll be redirected to WhatsApp to continue the conversation
          </p>
        </form>
      </div>
    </section>
  );
};
