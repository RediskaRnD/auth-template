'use server';

import { ErrorMessage, SuccessMessage } from '@/actions/auth-messages';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { SignInSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const signInCredentials = async (values: z.infer<typeof SignInSchema>): Promise<{
  error?: string,
  success?: string
} | void> => {
  const validatedFields = SignInSchema.safeParse(values);

  console.log('Form:', values);

  if (!validatedFields.success) {
    return ErrorMessage.LOGIN_FAILED;
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.password) {
    return ErrorMessage.INVALID_CREDENTIALS;
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    return SuccessMessage.CONFIRMATION_EMAIL_SENT;
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return ErrorMessage.INVALID_CREDENTIALS;
      }
      return ErrorMessage.SOMETHING_WENT_WRONG;
    }
    // important! Don't remove it, otherwise you will not be redirected.
    throw error;
  }
};