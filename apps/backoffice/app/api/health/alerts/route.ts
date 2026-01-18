/**
 * Alerts Check Cron Job
 *
 * Runs periodically to check all alerts and send notifications.
 * Schedule: Every 5 minutes (via vercel.json cron)
 *
 * Notifications sent via:
 * - Email (if configured)
 * - Push notification to admins
 * - Slack webhook (if configured)
 */

import { NextResponse } from 'next/server';
import { getTriggeredAlerts, type AlertStatus } from '@/lib/observability/alerts';
import { logger } from '@/lib/observability/logger';
import { redis, isRedisEnabled } from '@/lib/cache/redis';
import { sendEmail } from '@/lib/notifications/providers/email-provider';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// Cooldown period between notifications for same alert (1 hour)
const ALERT_COOLDOWN_MS = 3600000;

export async function GET(request: Request) {
  const startTime = Date.now();

  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const triggeredAlerts = await getTriggeredAlerts();

    if (triggeredAlerts.length === 0) {
      logger.info(
        {
          metric: 'alert_check',
          duration: Date.now() - startTime,
        },
        'Alert check: all systems healthy'
      );

      return NextResponse.json({
        status: 'healthy',
        alertsChecked: true,
        triggeredCount: 0,
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      });
    }

    // Filter alerts that are not in cooldown
    const alertsToNotify = await filterCooldownAlerts(triggeredAlerts);

    // Send notifications for new/updated alerts
    const notificationResults = await sendAlertNotifications(alertsToNotify);

    // Log all triggered alerts
    for (const alert of triggeredAlerts) {
      logger.warn(
        {
          alertId: alert.alert.id,
          alertName: alert.alert.name,
          level: alert.result.level,
          value: alert.result.currentValue,
          unit: alert.result.unit,
          message: alert.result.message,
          metric: 'alert_triggered',
        },
        'Alert triggered'
      );
    }

    return NextResponse.json({
      status: triggeredAlerts.some((a) => a.result.level === 'CRITICAL') ? 'critical' : 'warning',
      alertsChecked: true,
      triggeredCount: triggeredAlerts.length,
      notificationsSent: notificationResults.sent,
      notificationsSkipped: notificationResults.skipped,
      alerts: triggeredAlerts.map((a) => ({
        id: a.alert.id,
        name: a.alert.name,
        level: a.result.level,
        message: a.result.message,
      })),
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime,
      },
      'Alert check failed'
    );

    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Filter out alerts that are in cooldown period
 */
async function filterCooldownAlerts(alerts: AlertStatus[]): Promise<AlertStatus[]> {
  if (!isRedisEnabled()) {
    // Without Redis, always notify (can't track cooldowns)
    return alerts;
  }

  const alertsToNotify: AlertStatus[] = [];

  for (const alert of alerts) {
    const cooldownKey = `alert_cooldown:${alert.alert.id}:${alert.result.level}`;

    try {
      const lastNotified = await redis.get<number>(cooldownKey);

      if (!lastNotified || Date.now() - lastNotified > ALERT_COOLDOWN_MS) {
        alertsToNotify.push(alert);
        // Set cooldown
        await redis.set(cooldownKey, Date.now(), { ex: 7200 }); // 2 hours expiry
      }
    } catch {
      // On error, include alert to be safe
      alertsToNotify.push(alert);
    }
  }

  return alertsToNotify;
}

/**
 * Send notifications for triggered alerts
 */
async function sendAlertNotifications(
  alerts: AlertStatus[]
): Promise<{ sent: number; skipped: number }> {
  let sent = 0;
  let skipped = 0;

  for (const alert of alerts) {
    try {
      // Send to configured notification channels
      const notified = await notifyAlert(alert);
      if (notified) {
        sent++;
      } else {
        skipped++;
      }
    } catch (error) {
      logger.error(
        {
          alertId: alert.alert.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        'Failed to send alert notification'
      );
      skipped++;
    }
  }

  return { sent, skipped };
}

/**
 * Send notification for a single alert
 */
async function notifyAlert(alert: AlertStatus): Promise<boolean> {
  const message = formatAlertMessage(alert);

  // 1. Try Slack webhook
  if (process.env.SLACK_WEBHOOK_URL) {
    try {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: message.text,
          attachments: [
            {
              color: alert.result.level === 'CRITICAL' ? '#ff0000' : '#ffaa00',
              fields: [
                { title: 'Alert', value: alert.alert.name, short: true },
                { title: 'Level', value: alert.result.level, short: true },
                {
                  title: 'Value',
                  value: `${alert.result.currentValue} ${alert.result.unit}`,
                  short: true,
                },
                { title: 'Category', value: alert.alert.category, short: true },
              ],
              text: alert.result.action || '',
            },
          ],
        }),
      });
      return true;
    } catch (error) {
      logger.error({ error }, 'Slack notification failed');
    }
  }

  // 2. Try email notification
  if (process.env.ALERT_EMAIL) {
    try {
      const htmlContent = buildAlertEmailHtml(alert);
      const result = await sendEmail({
        to: process.env.ALERT_EMAIL,
        subject: message.subject,
        text: message.text,
        html: htmlContent,
      });

      if (result.success) {
        logger.info(
          {
            to: process.env.ALERT_EMAIL,
            alertId: alert.alert.id,
            messageId: result.messageId,
          },
          'Alert email sent'
        );
        return true;
      } else {
        logger.error(
          {
            to: process.env.ALERT_EMAIL,
            error: result.error,
          },
          'Alert email failed'
        );
      }
    } catch (error) {
      logger.error({ error }, 'Email notification failed');
    }
  }

  // 3. Store in notification_queue for push notifications
  try {
    const { createClient } = await import('@/lib/supabase-server');
    const supabase = createClient();

    await supabase.from('notification_queue').insert({
      type: 'system_alert',
      priority: alert.result.level === 'CRITICAL' ? 'high' : 'normal',
      payload: {
        alertId: alert.alert.id,
        alertName: alert.alert.name,
        level: alert.result.level,
        message: alert.result.message,
        action: alert.result.action,
      },
      status: 'pending',
    });

    return true;
  } catch (error) {
    logger.error({ error }, 'Failed to queue alert notification');
  }

  return false;
}

/**
 * Format alert message for notifications
 */
function formatAlertMessage(alert: AlertStatus): { subject: string; text: string } {
  const emoji = alert.result.level === 'CRITICAL' ? '🚨' : '⚠️';

  return {
    subject: `${emoji} [${alert.result.level}] ${alert.alert.name}`,
    text: `${emoji} **${alert.result.level}**: ${alert.alert.name}\n\n${alert.result.message}\n\nValue: ${alert.result.currentValue} ${alert.result.unit}`,
  };
}

/**
 * Build HTML email content for alert
 */
function buildAlertEmailHtml(alert: AlertStatus): string {
  const levelColor = alert.result.level === 'CRITICAL' ? '#DC2626' : '#F59E0B';
  const levelBg = alert.result.level === 'CRITICAL' ? '#FEE2E2' : '#FEF3C7';
  const emoji = alert.result.level === 'CRITICAL' ? '🚨' : '⚠️';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Alert - ${alert.alert.name}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f3f4f6;">

  <!-- Header -->
  <div style="background: ${levelColor}; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
    <span style="font-size: 40px;">${emoji}</span>
    <h1 style="margin: 10px 0 0 0; font-size: 22px;">System Alert: ${alert.result.level}</h1>
  </div>

  <!-- Content -->
  <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

    <!-- Alert Name -->
    <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px;">${alert.alert.name}</h2>

    <!-- Status Badge -->
    <div style="display: inline-block; background: ${levelBg}; color: ${levelColor}; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 14px; margin-bottom: 20px;">
      ${alert.result.level}
    </div>

    <!-- Message -->
    <p style="color: #4B5563; margin: 0 0 20px 0; font-size: 16px;">
      ${alert.result.message}
    </p>

    <!-- Metrics Table -->
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 12px; background: #F9FAFB; border-radius: 8px 0 0 0;">
          <span style="color: #6B7280; font-size: 12px;">Valore Attuale</span><br>
          <strong style="color: #111827; font-size: 18px;">${alert.result.currentValue.toFixed(1)} ${alert.result.unit}</strong>
        </td>
        <td style="padding: 12px; background: #FEF3C7;">
          <span style="color: #92400E; font-size: 12px;">Soglia Warning</span><br>
          <strong style="color: #92400E; font-size: 18px;">${alert.alert.warningThreshold} ${alert.result.unit}</strong>
        </td>
        <td style="padding: 12px; background: #FEE2E2; border-radius: 0 8px 0 0;">
          <span style="color: #991B1B; font-size: 12px;">Soglia Critical</span><br>
          <strong style="color: #991B1B; font-size: 18px;">${alert.alert.criticalThreshold} ${alert.result.unit}</strong>
        </td>
      </tr>
    </table>

    <!-- Category -->
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 20px 0;">
      <strong>Categoria:</strong> ${alert.alert.category}
    </p>

    ${
      alert.result.action
        ? `
    <!-- Action Box -->
    <div style="background: ${levelBg}; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid ${levelColor};">
      <h3 style="margin: 0 0 10px 0; color: ${levelColor}; font-size: 16px;">Azioni Consigliate</h3>
      <div style="color: #374151; font-size: 14px; white-space: pre-line;">${alert.result.action}</div>
    </div>
    `
        : ''
    }

    <!-- CTA Button -->
    <div style="text-align: center; margin-top: 30px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://backoffice.gudbro.com'}/settings/system-alerts"
         style="display: inline-block; background: ${levelColor}; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
        Visualizza Dashboard Alert
      </a>
    </div>

  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #9CA3AF; font-size: 12px;">
    <p>Questo è un messaggio automatico dal sistema di monitoraggio GUDBRO.</p>
    <p>Alert generato il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
  </div>

</body>
</html>
  `.trim();
}
