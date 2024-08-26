import { VerificationToken } from '@prisma/client';

import { prisma } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string): Promise<VerificationToken | null> => {
  try {
    return await prisma.verificationToken.findUnique({
      where: { email }
    });
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string): Promise<VerificationToken | null> => {
  try {
    return await prisma.verificationToken.findUnique({
      where: { token }
    });
  } catch {
    return null;
  }
};