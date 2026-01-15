/**
 * Email Notification Provider
 *
 * Supports multiple email services:
 * - Resend (recommended)
 * - SendGrid
 * - SMTP (fallback)
 */

export interface EmailOptions {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email via Resend
 */
async function sendViaResend(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: options.from || process.env.EMAIL_FROM || 'noreply@gudbro.com',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        reply_to: options.replyTo,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to send email' };
    }

    return { success: true, messageId: data.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send email via SendGrid
 */
async function sendViaSendGrid(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    return { success: false, error: 'SendGrid API key not configured' };
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: options.to }] }],
        from: { email: options.from || process.env.EMAIL_FROM || 'noreply@gudbro.com' },
        subject: options.subject,
        content: [
          { type: 'text/plain', value: options.text },
          ...(options.html ? [{ type: 'text/html', value: options.html }] : []),
        ],
        reply_to: options.replyTo ? { email: options.replyTo } : undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Failed to send email' };
    }

    // SendGrid returns message ID in headers
    const messageId = response.headers.get('X-Message-Id') || undefined;
    return { success: true, messageId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send email - automatically selects provider based on configuration
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  // Try Resend first (preferred for simplicity)
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(options);
  }

  // Fall back to SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return sendViaSendGrid(options);
  }

  // No email provider configured
  console.warn('No email provider configured. Skipping email send.');
  return { success: false, error: 'No email provider configured' };
}

/**
 * Build HTML email from plain text
 */
export function textToHtml(text: string, brandColor: string = '#3B82F6'): string {
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notification</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Reservation Notification</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
    <p style="margin: 0; white-space: pre-line;">${escapedText}</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
    <p>This is an automated message. Please do not reply directly to this email.</p>
  </div>
</body>
</html>
  `.trim();
}
