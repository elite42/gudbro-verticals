import React, { useState, useEffect } from 'react';
import type { ApiResponse } from '@gudbro/types';
import { formatPrice as _fp } from '@gudbro/utils';

interface VietQRPaymentProps {
  hubId: string;
  amount: number;
  description: string;
  customerName?: string;
  apiUrl?: string;
}

/** Response shape from VietQR generation endpoint */
type VietQRResponse = ApiResponse<{ qrUrl: string }>;

export const VietQRPayment: React.FC<VietQRPaymentProps> = ({
  hubId,
  amount,
  description,
  customerName,
  apiUrl = '/api/rentals',
}) => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const response = await fetch(`${apiUrl}/${hubId}/vietqr`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, description, customerName }),
        });

        if (!response.ok) throw new Error('Failed to generate VietQR');

        const result: VietQRResponse = await response.json();
        if (result.error) throw new Error(result.error);
        setQrUrl(result.data?.qrUrl ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (amount > 0) {
      generateQR();
    }
  }, [hubId, amount, description, customerName, apiUrl]);

  const formatPrice = (price: number) => _fp(price, 'VND');

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Generating payment QR code...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section
      className="vietqr-payment"
      style={{
        padding: '4rem 2rem',
        backgroundColor: '#f9fafb',
      }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            Payment
          </h2>
          <p
            style={{
              color: '#6b7280',
              fontSize: '1.1rem',
            }}
          >
            Scan QR code with your banking app
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          {/* Amount */}
          <div
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#f97316',
              marginBottom: '1rem',
            }}
          >
            {formatPrice(amount)}
          </div>

          {/* Description */}
          <p
            style={{
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1rem',
            }}
          >
            {description}
          </p>

          {/* QR Code */}
          {qrUrl && (
            <div
              style={{
                display: 'inline-block',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src={qrUrl}
                alt="VietQR Payment Code"
                style={{
                  width: '300px',
                  height: '300px',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Instructions */}
          <div
            style={{
              textAlign: 'left',
              backgroundColor: '#eff6ff',
              padding: '1.5rem',
              borderRadius: '8px',
              borderLeft: '4px solid #3b82f6',
            }}
          >
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#1e40af',
              }}
            >
              How to pay:
            </h3>
            <ol
              style={{
                paddingLeft: '1.5rem',
                color: '#4b5563',
                lineHeight: '1.8',
              }}
            >
              <li>Open your banking app (Vietcombank, TPBank, MBBank, etc.)</li>
              <li>Select "Scan QR" or "Transfer Money"</li>
              <li>Scan the QR code above</li>
              <li>Verify the amount and description</li>
              <li>Confirm payment</li>
            </ol>
          </div>

          {/* Supported Banks */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '0.5rem',
              }}
            >
              Supported by all Vietnamese banks
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span style={bankBadgeStyle}>Vietcombank</span>
              <span style={bankBadgeStyle}>TPBank</span>
              <span style={bankBadgeStyle}>MBBank</span>
              <span style={bankBadgeStyle}>Techcombank</span>
              <span style={bankBadgeStyle}>VietinBank</span>
            </div>
          </div>

          {/* Alternative Payment */}
          <div
            style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1rem',
              }}
            >
              Or pay with cash on pickup
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const bankBadgeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  backgroundColor: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  fontSize: '0.75rem',
  color: '#4b5563',
};
