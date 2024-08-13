'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { SignInSchema } from '@/schemas';

export const login = async (values: z.infer<typeof SignInSchema>): Promise<{
  error?: string,
  success?: string
} | void> => {
  const validatedFields = SignInSchema.safeParse(values);

  console.log(values);

  if (!validatedFields.success) {
    return { error: 'Login failed.' };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalid credentials.' };
        }
        default: {
          return { error: 'Something went wrong.' };
        }
      }
    }
    // Don't remove it, otherwise you will not be redirected.
    throw error;
  }
};