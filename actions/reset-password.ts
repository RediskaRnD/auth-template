'use server';

import * as z from 'zod';

import { ErrorMessage, ResultMessage, SuccessMessage } from '@/actions/auth-messages';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { enforceMinExecutionTime } from '@/lib/server-utils';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from '@/schemas';

export const resetPassword = async (values: z.infer<typeof ResetSchema>): Promise<ResultMessage> => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return ErrorMessage.INVALID_EMAIL;
  }

  let resultMessage: ResultMessage = SuccessMessage.RESET_EMAIL_SENT;
  const startTime = Date.now();

  try {
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      const passwordResetToken = await generatePasswordResetToken(email);
      await sendPasswordResetEmail(email, passwordResetToken.token);
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    resultMessage = ErrorMessage.SOMETHING_WENT_WRONG;
  }

  await enforceMinExecutionTime(startTime, 3000);
  return resultMessage;
};