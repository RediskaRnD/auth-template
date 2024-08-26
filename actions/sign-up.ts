'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { ErrorMessage, ResultMessage, SuccessMessages } from '@/actions/auth-messages';
import { getUserByEmail } from '@/data/user';
import { prisma } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SignUpSchema } from '@/schemas';

export const signUp = async (values: z.infer<typeof SignUpSchema>): Promise<ResultMessage> => {
  const validatedFields = SignUpSchema.safeParse(values);
  console.log('Form:', values);

  if (!validatedFields.success) {
    return ErrorMessage.SIGN_UP_FAILED;
  }

  const { name, email, password } = validatedFields.data;
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

  if (!user) {
    return ErrorMessage.FAILED_TO_CREATE_USER;
  }
  console.log('id: ', user.id);

  const verificationToken = await generateVerificationToken(email);
  console.log({ verificationToken });

  await sendVerificationEmail(email, verificationToken.token);

  return SuccessMessages.CONFIRMATION_EMAIL_SENT;
};