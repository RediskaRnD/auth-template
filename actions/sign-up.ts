'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { prisma } from '@/lib/db';
import { SignUpSchema } from '@/schemas';

export const signUp = async (values: z.infer<typeof SignUpSchema>): Promise<{ error?: string, success?: string }> => {
  const validatedFields = SignUpSchema.safeParse(values);

  console.log('Form:', values);

  if (!validatedFields.success) {
    return { error: 'Sign up failed.' };
  }

  // const client = await pgPool?.connect();
  // if (!client) {
  //   return { error: 'Unable to connect to database.' };
  // }
  try {
    const { name, email, password } = validatedFields.data;
    // const existingUser = await getUserByEmail(client, { email });
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: 'Email already in use.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // const user = await createUser(client, { name, email });
    if (!user) {
      return { error: 'Failed to create new user.' };
    }
    console.log('id: ', user.id);

    // TODO: Send verification token email.

    return { success: 'User created successfully.' };
  } finally {
    // client.release();
  }
};