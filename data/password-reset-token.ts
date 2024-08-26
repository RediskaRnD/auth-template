import { PasswordResetToken } from '@prisma/client';

import { prisma } from '@/lib/db';

export const getPasswordResetTokenByEmail = async (email: string): Promise<PasswordResetToken | null> => {
  try {
    return prisma.passwordResetToken.findUnique({
      where: { email }
    });
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string): Promise<PasswordResetToken | null> => {
  try {
    return prisma.passwordResetToken.findUnique({
      where: { token }
    });
  } catch {
    return null;
  }
};