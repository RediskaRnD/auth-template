'use server';

import * as z from 'zod';

import { SignInSchema } from '@/schemas';

export const login = async (values: z.infer<typeof SignInSchema>): Promise<{ error?: string, success?: string }> => {
  const validatedFields = SignInSchema.safeParse(values);

  console.log(values);

  if (!validatedFields.success) {
    return { error: 'Login failed.' };
  }
  return { success: 'Email sent successfully.' };
};