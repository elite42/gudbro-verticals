/**
 * HTML Email Templates for Accommodations Booking Communication
 *
 * Both templates use inline CSS only (email client compatibility),
 * -apple-system font stack, max-width 600px centered, white card on light gray background.
 */

// --- Booking Confirmation Email ---

export interface BookingConfirmationEmailData {
  bookingCode: string;
  propertyName: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  roomType: string;
  guests: number;
  pricePerNight: number; // display-ready (already divided by minor units)
  nights: number;
  cleaningFee: number; // display-ready
  discount: number; // display-ready
  totalPrice: number; // display-ready
  currency: string;
  paymentStatus: string;
  propertyAddress: string | null;
  lat: number | null;
  lng: number | null;
  hostPhone: string | null;
  hostName: string | null;
  brandColor: string;
}

export function buildBookingConfirmationHtml(data: BookingConfirmationEmailData): string {
  const {
    bookingCode,
    propertyName,
    checkIn,
    checkOut,
    roomType,
    guests,
    pricePerNight,
    nights,
    cleaningFee,
    discount,
    totalPrice,
    currency,
    paymentStatus,
    propertyAddress,
    lat,
    lng,
    hostPhone,
    hostName,
    brandColor,
  } = data;

  const formatDate = (d: string) => {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'VND' ? 0 : 2,
      maximumFractionDigits: currency === 'VND' ? 0 : 2,
    }).format(amount);

  const mapLink =
    lat && lng
      ? `https://maps.google.com/?q=${lat},${lng}`
      : propertyAddress
        ? `https://maps.google.com/?q=${encodeURIComponent(propertyAddress)}`
        : null;

  const whatsappLink = hostPhone
    ? `https://wa.me/${hostPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi${hostName ? ` ${hostName}` : ''}, I just booked ${bookingCode} at ${propertyName}.`)}`
    : null;

  const subtotal = pricePerNight * nights;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:${brandColor};border-radius:12px 12px 0 0;padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Booking Confirmed</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${escapeHtml(propertyName)}</p>
              <div style="margin:16px auto 0;background:rgba(255,255,255,0.2);border-radius:8px;display:inline-block;padding:8px 20px;">
                <span style="color:#ffffff;font-size:28px;font-weight:800;letter-spacing:2px;font-family:monospace;">${escapeHtml(bookingCode)}</span>
              </div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:24px;">
              <!-- Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;width:40%;">Check-in</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#18181b;font-size:14px;font-weight:600;">${formatDate(checkIn)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">Check-out</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#18181b;font-size:14px;font-weight:600;">${formatDate(checkOut)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">Room Type</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#18181b;font-size:14px;font-weight:600;">${escapeHtml(roomType)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">Guests</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#18181b;font-size:14px;font-weight:600;">${guests}</td>
                </tr>
              </table>

              <!-- Price Breakdown -->
              <h3 style="margin:20px 0 12px;font-size:15px;color:#18181b;">Price Breakdown</h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:6px 0;color:#71717a;font-size:13px;">${formatAmount(pricePerNight)} x ${nights} night${nights !== 1 ? 's' : ''}</td>
                  <td style="padding:6px 0;color:#18181b;font-size:13px;text-align:right;">${formatAmount(subtotal)}</td>
                </tr>
                ${
                  cleaningFee > 0
                    ? `<tr>
                  <td style="padding:6px 0;color:#71717a;font-size:13px;">Cleaning fee</td>
                  <td style="padding:6px 0;color:#18181b;font-size:13px;text-align:right;">${formatAmount(cleaningFee)}</td>
                </tr>`
                    : ''
                }
                ${
                  discount > 0
                    ? `<tr>
                  <td style="padding:6px 0;color:#16a34a;font-size:13px;">Discount</td>
                  <td style="padding:6px 0;color:#16a34a;font-size:13px;text-align:right;">-${formatAmount(discount)}</td>
                </tr>`
                    : ''
                }
                <tr>
                  <td style="padding:12px 0 6px;border-top:2px solid #e4e4e7;color:#18181b;font-size:15px;font-weight:700;">Total</td>
                  <td style="padding:12px 0 6px;border-top:2px solid #e4e4e7;color:#18181b;font-size:15px;font-weight:700;text-align:right;">${formatAmount(totalPrice)}</td>
                </tr>
              </table>

              <!-- Payment Status -->
              <div style="margin:16px 0;padding:10px 16px;border-radius:8px;background-color:${paymentStatus === 'confirmed' ? '#f0fdf4' : '#fefce8'};text-align:center;">
                <span style="color:${paymentStatus === 'confirmed' ? '#16a34a' : '#ca8a04'};font-size:13px;font-weight:600;">
                  Payment: ${escapeHtml(paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1))}
                </span>
              </div>

              <!-- Address -->
              ${
                propertyAddress
                  ? `<div style="margin:16px 0;padding:12px;border-radius:8px;background-color:#f4f4f5;">
                <p style="margin:0;color:#71717a;font-size:12px;">Property Address</p>
                <p style="margin:4px 0 0;color:#18181b;font-size:14px;">${escapeHtml(propertyAddress)}</p>
                ${mapLink ? `<a href="${mapLink}" target="_blank" style="display:inline-block;margin-top:8px;color:${brandColor};font-size:13px;text-decoration:none;">View on Google Maps &rarr;</a>` : ''}
              </div>`
                  : ''
              }

              <!-- WhatsApp CTA -->
              ${
                whatsappLink
                  ? `<div style="text-align:center;margin:20px 0 8px;">
                <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#25D366;color:#ffffff;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">
                  Message Your Host on WhatsApp
                </a>
              </div>`
                  : ''
              }
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#ffffff;border-radius:0 0 12px 12px;padding:16px 24px;border-top:1px solid #e4e4e7;text-align:center;">
              <p style="margin:0;color:#a1a1aa;font-size:11px;">Powered by GUDBRO</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// --- Pre-Arrival Email ---

export interface PreArrivalEmailData {
  propertyName: string;
  checkInTime: string;
  qrDataUrl: string; // base64 data URL
  propertyAddress: string | null;
  wifiName: string | null;
  wifiPassword: string | null;
  hostPhone: string | null;
  hostName: string | null;
  brandColor: string;
}

export function buildPreArrivalHtml(data: PreArrivalEmailData): string {
  const {
    propertyName,
    checkInTime,
    qrDataUrl,
    propertyAddress,
    wifiName,
    wifiPassword,
    hostPhone,
    hostName,
    brandColor,
  } = data;

  const whatsappLink = hostPhone
    ? `https://wa.me/${hostPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi${hostName ? ` ${hostName}` : ''}, I'm arriving tomorrow at ${propertyName}.`)}`
    : null;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Stay Starts Tomorrow</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:${brandColor};border-radius:12px 12px 0 0;padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Your Stay Starts Tomorrow</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${escapeHtml(propertyName)}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:24px;">
              <!-- QR Code -->
              <div style="text-align:center;margin:0 0 20px;">
                <p style="margin:0 0 12px;color:#18181b;font-size:15px;font-weight:600;">Scan for your In-Stay Dashboard</p>
                <img src="${qrDataUrl}" alt="QR Code for In-Stay Dashboard" width="200" height="200" style="display:inline-block;border:1px solid #e4e4e7;border-radius:8px;" />
                <p style="margin:8px 0 0;color:#71717a;font-size:12px;">Scan this QR code on arrival to access your In-Stay Dashboard</p>
              </div>

              <!-- Check-in Info -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;width:40%;">Check-in Time</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#18181b;font-size:14px;font-weight:600;">${escapeHtml(checkInTime)}</td>
                </tr>
                ${
                  propertyAddress
                    ? `<tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">Address</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;color:#18181b;font-size:14px;font-weight:600;">${escapeHtml(propertyAddress)}</td>
                </tr>`
                    : ''
                }
              </table>

              <!-- WiFi -->
              ${
                wifiName
                  ? `<div style="margin:16px 0;padding:12px 16px;border-radius:8px;background-color:#f0fdf4;">
                <p style="margin:0;color:#16a34a;font-size:12px;font-weight:600;">WiFi Information</p>
                <p style="margin:4px 0 0;color:#18181b;font-size:14px;">Network: <strong>${escapeHtml(wifiName)}</strong></p>
                ${wifiPassword ? `<p style="margin:2px 0 0;color:#18181b;font-size:14px;">Password: <strong>${escapeHtml(wifiPassword)}</strong></p>` : ''}
              </div>`
                  : ''
              }

              <!-- WhatsApp CTA -->
              ${
                whatsappLink
                  ? `<div style="text-align:center;margin:20px 0 8px;">
                <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#25D366;color:#ffffff;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">
                  Contact Your Host on WhatsApp
                </a>
              </div>`
                  : ''
              }
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#ffffff;border-radius:0 0 12px 12px;padding:16px 24px;border-top:1px solid #e4e4e7;text-align:center;">
              <p style="margin:0;color:#a1a1aa;font-size:11px;">Powered by GUDBRO</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// --- Plain text builders ---

export function buildBookingConfirmationText(data: BookingConfirmationEmailData): string {
  const formatDate = (d: string) => {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return [
    `Booking Confirmed - ${data.propertyName}`,
    ``,
    `Booking Code: ${data.bookingCode}`,
    ``,
    `Check-in: ${formatDate(data.checkIn)}`,
    `Check-out: ${formatDate(data.checkOut)}`,
    `Room: ${data.roomType}`,
    `Guests: ${data.guests}`,
    `Total: ${data.totalPrice} ${data.currency}`,
    `Payment: ${data.paymentStatus}`,
    ``,
    data.propertyAddress ? `Address: ${data.propertyAddress}` : '',
    data.hostPhone ? `Contact host: https://wa.me/${data.hostPhone.replace(/[^0-9]/g, '')}` : '',
    ``,
    `Powered by GUDBRO`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildPreArrivalText(data: PreArrivalEmailData): string {
  return [
    `Your Stay Starts Tomorrow - ${data.propertyName}`,
    ``,
    `Check-in Time: ${data.checkInTime}`,
    data.propertyAddress ? `Address: ${data.propertyAddress}` : '',
    ``,
    data.wifiName
      ? `WiFi: ${data.wifiName}${data.wifiPassword ? ` / Password: ${data.wifiPassword}` : ''}`
      : '',
    ``,
    data.hostPhone ? `Contact host: https://wa.me/${data.hostPhone.replace(/[^0-9]/g, '')}` : '',
    ``,
    `Powered by GUDBRO`,
  ]
    .filter(Boolean)
    .join('\n');
}

// --- Helpers ---

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
