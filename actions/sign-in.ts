'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import * as z from 'zod';

import { ErrorMessages, ResultMessage, SuccessMessages } from '@/actions/auth-messages';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { SignInSchema } from '@/schemas';

export const signInCredentials = async (values: z.infer<typeof SignInSchema>): Promise<ResultMessage> => {
  const validatedFields = SignInSchema.safeParse(values);

  console.log('Form:', values);

  if (!validatedFields.success) {
    return ErrorMessages.LOGIN_FAILED;
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.password) {
    return ErrorMessages.INVALID_CREDENTIALS;
  }
  const passwordMatched = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatched) {
    return ErrorMessages.INVALID_CREDENTIALS;
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    return SuccessMessages.CONFIRMATION_EMAIL_SENT;
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
    return SuccessMessages.SIGN_IN_SUCCESS;
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return ErrorMessages.INVALID_CREDENTIALS;
      }
      return ErrorMessages.SOMETHING_WENT_WRONG;
    }
    // important! Don't remove it, otherwise you will not be redirected.
    throw error;
  }
};