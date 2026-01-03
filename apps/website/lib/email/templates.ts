/**
 * Email Templates
 *
 * HTML templates for transactional emails
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gudbro-website.vercel.app';
const BACKOFFICE_URL = 'https://gudbro-backoffice.vercel.app';

// Common styles
const styles = {
  container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;',
  header: 'text-align: center; padding: 20px 0; border-bottom: 1px solid #e5e7eb;',
  logo: 'font-size: 24px; font-weight: bold; color: #111827;',
  content: 'padding: 30px 20px;',
  title: 'font-size: 24px; font-weight: 600; color: #111827; margin: 0 0 16px 0;',
  text: 'font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;',
  button: 'display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;',
  buttonSecondary: 'display: inline-block; padding: 12px 24px; background: #f3f4f6; color: #374151; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 14px;',
  footer: 'text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;',
  card: 'background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0;',
  highlight: 'background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 12px; text-align: center;',
};

/**
 * Base email wrapper
 */
function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GUDBRO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
  <div style="${styles.container}">
    <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <!-- Header -->
      <div style="${styles.header}">
        <div style="${styles.logo}">📱 GUDBRO</div>
      </div>

      <!-- Content -->
      <div style="${styles.content}">
        ${content}
      </div>

      <!-- Footer -->
      <div style="${styles.footer}">
        <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} GUDBRO. Tutti i diritti riservati.</p>
        <p style="margin: 0;">
          <a href="${BASE_URL}" style="color: #6b7280; text-decoration: none;">Website</a> ·
          <a href="${BASE_URL}/privacy" style="color: #6b7280; text-decoration: none;">Privacy</a> ·
          <a href="${BASE_URL}/terms" style="color: #6b7280; text-decoration: none;">Termini</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Welcome email - sent after registration
 */
export function welcomeEmail(params: {
  name: string;
  email: string;
  bonusPoints: number;
}): { subject: string; html: string } {
  const content = `
    <div style="${styles.highlight}">
      <p style="font-size: 48px; margin: 0;">🎉</p>
      <h1 style="font-size: 28px; margin: 16px 0 8px 0;">Benvenuto su GUDBRO!</h1>
      <p style="margin: 0; opacity: 0.9;">Ciao ${params.name}, il tuo account è stato creato con successo.</p>
    </div>

    <div style="${styles.card}">
      <p style="font-size: 14px; color: #6b7280; margin: 0 0 8px 0;">Bonus di benvenuto</p>
      <p style="font-size: 32px; font-weight: bold; color: #8b5cf6; margin: 0;">+${params.bonusPoints} punti</p>
      <p style="font-size: 14px; color: #6b7280; margin: 8px 0 0 0;">Già accreditati sul tuo account!</p>
    </div>

    <p style="${styles.text}">
      Ora puoi esplorare menu digitali, scoprire ricette personalizzate e accumulare punti fedeltà.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${BASE_URL}" style="${styles.button}">Inizia a Esplorare</a>
    </div>

    <p style="${styles.text}; font-size: 14px; color: #9ca3af;">
      Hai domande? Rispondi a questa email e saremo felici di aiutarti.
    </p>
  `;

  return {
    subject: `Benvenuto su GUDBRO, ${params.name}! 🎉`,
    html: baseTemplate(content),
  };
}

/**
 * Staff invitation email
 */
export function staffInviteEmail(params: {
  inviteeName: string;
  inviteeEmail: string;
  organizationName: string;
  roleTitle: string;
  inviterName: string;
  inviteToken: string;
  message?: string;
  expiresAt: string;
}): { subject: string; html: string } {
  const inviteUrl = `${BASE_URL}/invite?token=${params.inviteToken}`;
  const expiryDate = new Date(params.expiresAt).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const roleIcons: Record<string, string> = {
    owner: '👑',
    manager: '💼',
    chef: '👨‍🍳',
    waiter: '🍽️',
    viewer: '👁️',
    staff: '👤',
  };
  const roleIcon = roleIcons[params.roleTitle] || '👤';

  const content = `
    <h1 style="${styles.title}">Sei stato invitato!</h1>

    <p style="${styles.text}">
      Ciao${params.inviteeName ? ` ${params.inviteeName}` : ''},
    </p>

    <p style="${styles.text}">
      <strong>${params.inviterName}</strong> ti ha invitato a unirti al team di <strong>${params.organizationName}</strong> su GUDBRO.
    </p>

    <div style="${styles.card}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 32px;">${roleIcon}</span>
        <div>
          <p style="margin: 0; font-weight: 600; color: #111827;">${params.organizationName}</p>
          <p style="margin: 4px 0 0 0; color: #6b7280; text-transform: capitalize;">${params.roleTitle}</p>
        </div>
      </div>
    </div>

    ${params.message ? `
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0; font-size: 14px; color: #92400e;">Messaggio personale:</p>
      <p style="margin: 8px 0 0 0; color: #78350f; font-style: italic;">"${params.message}"</p>
    </div>
    ` : ''}

    <div style="text-align: center; margin: 30px 0;">
      <a href="${inviteUrl}" style="${styles.button}">Accetta Invito</a>
    </div>

    <p style="${styles.text}; font-size: 14px; color: #9ca3af; text-align: center;">
      Questo invito scade il ${expiryDate}
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

    <p style="${styles.text}; font-size: 14px; color: #9ca3af;">
      Se non ti aspettavi questo invito, puoi ignorare questa email.
      <br><br>
      Link diretto: <a href="${inviteUrl}" style="color: #8b5cf6;">${inviteUrl}</a>
    </p>
  `;

  return {
    subject: `${params.inviterName} ti ha invitato a ${params.organizationName}`,
    html: baseTemplate(content),
  };
}

/**
 * Invitation accepted notification (to inviter)
 */
export function inviteAcceptedEmail(params: {
  inviterName: string;
  inviteeName: string;
  inviteeEmail: string;
  organizationName: string;
  roleTitle: string;
}): { subject: string; html: string } {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="font-size: 48px;">✅</span>
    </div>

    <h1 style="${styles.title}; text-align: center;">Invito Accettato!</h1>

    <p style="${styles.text}">
      Ciao ${params.inviterName},
    </p>

    <p style="${styles.text}">
      Ottime notizie! <strong>${params.inviteeName}</strong> (${params.inviteeEmail}) ha accettato il tuo invito
      e ora fa parte del team di <strong>${params.organizationName}</strong> come <strong>${params.roleTitle}</strong>.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${BACKOFFICE_URL}/team" style="${styles.button}">Vai al Team</a>
    </div>
  `;

  return {
    subject: `${params.inviteeName} ha accettato il tuo invito`,
    html: baseTemplate(content),
  };
}

/**
 * Invitation declined notification (to inviter)
 */
export function inviteDeclinedEmail(params: {
  inviterName: string;
  inviteeEmail: string;
  organizationName: string;
}): { subject: string; html: string } {
  const content = `
    <h1 style="${styles.title}">Invito Rifiutato</h1>

    <p style="${styles.text}">
      Ciao ${params.inviterName},
    </p>

    <p style="${styles.text}">
      L'utente <strong>${params.inviteeEmail}</strong> ha rifiutato l'invito a unirsi a <strong>${params.organizationName}</strong>.
    </p>

    <p style="${styles.text}">
      Puoi sempre inviare un nuovo invito dalla pagina Team del backoffice.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${BACKOFFICE_URL}/team" style="${styles.buttonSecondary}">Gestisci Team</a>
    </div>
  `;

  return {
    subject: `Invito rifiutato da ${params.inviteeEmail}`,
    html: baseTemplate(content),
  };
}

/**
 * Contribution approved email
 */
export function contributionApprovedEmail(params: {
  contributorName: string;
  ingredientName: string;
  pointsEarned: number;
  totalPoints: number;
}): { subject: string; html: string } {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="font-size: 48px;">🎉</span>
    </div>

    <h1 style="${styles.title}; text-align: center;">Contributo Approvato!</h1>

    <p style="${styles.text}">
      Ciao ${params.contributorName},
    </p>

    <p style="${styles.text}">
      Il tuo contributo per l'ingrediente <strong>"${params.ingredientName}"</strong> è stato approvato e aggiunto al database GUDBRO!
    </p>

    <div style="${styles.highlight}">
      <p style="font-size: 14px; margin: 0; opacity: 0.9;">Punti guadagnati</p>
      <p style="font-size: 36px; font-weight: bold; margin: 8px 0;">+${params.pointsEarned}</p>
      <p style="font-size: 14px; margin: 0; opacity: 0.9;">Totale: ${params.totalPoints} punti</p>
    </div>

    <p style="${styles.text}">
      Grazie per aiutarci a costruire il database alimentare più completo d'Italia!
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${BASE_URL}/account/profile" style="${styles.button}">Vedi i Tuoi Punti</a>
    </div>
  `;

  return {
    subject: `Il tuo contributo "${params.ingredientName}" è stato approvato! +${params.pointsEarned} punti`,
    html: baseTemplate(content),
  };
}

/**
 * Contribution rejected email
 */
export function contributionRejectedEmail(params: {
  contributorName: string;
  ingredientName: string;
  reason?: string;
}): { subject: string; html: string } {
  const content = `
    <h1 style="${styles.title}">Contributo Non Approvato</h1>

    <p style="${styles.text}">
      Ciao ${params.contributorName},
    </p>

    <p style="${styles.text}">
      Purtroppo il tuo contributo per l'ingrediente <strong>"${params.ingredientName}"</strong> non è stato approvato.
    </p>

    ${params.reason ? `
    <div style="${styles.card}">
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Motivo:</p>
      <p style="margin: 8px 0 0 0; color: #111827;">${params.reason}</p>
    </div>
    ` : ''}

    <p style="${styles.text}">
      Non scoraggiarti! Puoi sempre provare a contribuire con altri ingredienti.
      Ogni contributo ci aiuta a migliorare.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${BASE_URL}/account/profile" style="${styles.buttonSecondary}">Contribuisci di Nuovo</a>
    </div>
  `;

  return {
    subject: `Aggiornamento sul tuo contributo "${params.ingredientName}"`,
    html: baseTemplate(content),
  };
}

/**
 * Merchant onboarding complete email
 */
export function onboardingCompleteEmail(params: {
  ownerName: string;
  businessName: string;
  planName: string;
}): { subject: string; html: string } {
  const content = `
    <div style="${styles.highlight}">
      <p style="font-size: 48px; margin: 0;">🚀</p>
      <h1 style="font-size: 28px; margin: 16px 0 8px 0;">Il tuo locale è attivo!</h1>
      <p style="margin: 0; opacity: 0.9;">${params.businessName} è ora su GUDBRO</p>
    </div>

    <p style="${styles.text}">
      Ciao ${params.ownerName},
    </p>

    <p style="${styles.text}">
      Complimenti! La registrazione di <strong>${params.businessName}</strong> è stata completata con successo.
      Ora puoi accedere al backoffice e iniziare a configurare il tuo menu digitale.
    </p>

    <div style="${styles.card}">
      <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827;">Prossimi passi:</p>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Carica il tuo menu</li>
        <li style="margin-bottom: 8px;">Personalizza il QR code</li>
        <li style="margin-bottom: 8px;">Invita il tuo staff</li>
        <li>Attiva il programma fedeltà</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${BACKOFFICE_URL}" style="${styles.button}">Vai al Backoffice</a>
    </div>

    <p style="${styles.text}; font-size: 14px; color: #9ca3af;">
      Piano attivo: <strong>${params.planName}</strong>
    </p>
  `;

  return {
    subject: `${params.businessName} è attivo su GUDBRO! 🚀`,
    html: baseTemplate(content),
  };
}
