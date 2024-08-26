import * as process from 'node:process';

import { Resend } from 'resend';

import { EMAIL_VERIFICATION_PAGE } from '@/routes';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  if (!process.env.AUTH_URL) {
    throw new Error('AUTH_URL is not defined in environment variables.');
  }
  const confirmationUrl = new URL(EMAIL_VERIFICATION_PAGE, process.env.AUTH_URL);
  confirmationUrl.searchParams.append('token', encodeURIComponent(token));
  console.log('Confirmation URL: ', confirmationUrl);

  const resendEmail = process.env.RESEND_EMAIL;
  if (!resendEmail) {
    throw new Error('RESEND_EMAIL is not defined in environment variables.');
  }
  await resend.emails.send({
    from: resendEmail,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmationUrl}">here</a> to confirm email.</p>`
  });
};