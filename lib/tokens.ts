import { VerificationToken } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { prisma } from '@/lib/db';

export const generateVerificationToken = async (email: string): Promise<VerificationToken> => {
  const token = uuidv4();
  const hours = 1;
  const expires = new Date(new Date().getTime() + hours * 60 * 60 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });
  }

  return prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  });
};