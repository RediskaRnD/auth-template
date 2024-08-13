'use server';

import bcrypt from 'bcrypt';
import * as z from 'zod';

import { pgPool } from '@/lib/db';
import { SignUpSchema } from '@/schemas';
import { createUser, getUserByEmail } from '@/sqlc/db/query_sql';

export const signUp = async (values: z.infer<typeof SignUpSchema>): Promise<{ error?: string, success?: string }> => {
  const validatedFields = SignUpSchema.safeParse(values);

  console.log(values);

  if (!validatedFields.success) {
    return { error: 'Sign up failed.' };
  }

  const client = await pgPool?.connect();
  if (!client) {
    return { error: 'Unable to connect to database.' };
  }
  try {
    const { email, password, name } = validatedFields.data;
    const existingUser = await getUserByEmail(client, { email });
    if (existingUser) {
      return { error: 'Email already in use.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(client, { name, email });
    if (!user) {
      return { error: 'Failed to create new user.' };
    }
    console.log('id: ', user.id);

    // TODO: Send verification token email.

    return { success: 'User created successfully.' };
  } finally {
    client.release();
  }
};