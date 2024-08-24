import { VerificationToken } from '@prisma/client';

import { prisma } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { email }
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });
    return verificationToken;
  } catch {
    return null;
  }
};