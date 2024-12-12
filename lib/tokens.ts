import { PasswordResetToken, VerificationToken } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { prisma } from '@/lib/db';

const HOUR = 60 * 60 * 1000;  // one hour in ms

export const generatePasswordResetToken = async (email: string): Promise<PasswordResetToken> => {
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + HOUR);
  return prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });
};

export const generateVerificationToken = async (email: string): Promise<VerificationToken> => {
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });
    console.log('Existing token is deleted: ', existingToken.token);
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + HOUR);
  return prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  });
};