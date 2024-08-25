'use server';

import { ErrorMessage, SuccessMessage } from '@/actions/auth-messages';
import { getUserByEmail } from '@/data/user';
import { prisma } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SignUpSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const signUp = async (values: z.infer<typeof SignUpSchema>): Promise<{ error?: string, success?: string }> => {
  const validatedFields = SignUpSchema.safeParse(values);

  console.log('Form:', values);

  if (!validatedFields.success) {
    return ErrorMessage.SIGN_UP_FAILED;
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
      return ErrorMessage.EMAIL_ALREADY_IN_USE;
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
      return ErrorMessage.FAILED_TO_CREATE_USER;
    }
    console.log('id: ', user.id);

    const verificationToken = await generateVerificationToken(email);
    console.log({ verificationToken });

    await sendVerificationEmail(email, verificationToken.token);
    return SuccessMessage.CONFIRMATION_EMAIL_SENT;
  } finally {
    // client.release();
  }
};