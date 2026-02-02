/**
 * V2 Reset Password Page Route (Server Component)
 *
 * Pagina per reimpostare la password.
 *
 * @route /v2/auth/reset-password
 */

import V2ResetPasswordClient from './V2ResetPasswordClient';

export const metadata = {
  title: 'Reset Password - ROOTS',
  description: 'Set your new password',
};

export default function V2ResetPasswordPage() {
  return <V2ResetPasswordClient />;
}
