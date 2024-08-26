import { ErrorMessages, ResultMessage } from '@/actions/auth-messages';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { prisma } from '@/lib/db';

const setEmailVerified = async (userId: string) => {
  prisma.user.update({
    where: { id: userId },
    data: {
      emailVerified: new Date()
    }
  });
};

const deleteVerificationTokenById = async (id: string): Promise<void> => {
  prisma.verificationToken.delete({
    where: { id }
  });
};

export const emailVerification = async (token: string): Promise<ResultMessage> => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return ErrorMessages.TOKEN_DOES_NOT_EXIST;
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return ErrorMessages.TOKEN_HAS_EXPIRED;
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return ErrorMessages.USER_DOES_NOT_EXIST;
  }

  await setEmailVerified(existingUser.id);
  await deleteVerificationTokenById(existingToken.id);

  return { success: 'Email verified!' };
};

