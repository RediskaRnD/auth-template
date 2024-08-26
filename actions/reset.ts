'use server';

import * as z from 'zod';

import { ErrorMessage, ResultMessage, SuccessMessages } from '@/actions/auth-messages';
import { getUserByEmail } from '@/data/user';
import { ResetSchema } from '@/schemas';

export const reset = async (values: z.infer<typeof ResetSchema>): Promise<ResultMessage> => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return ErrorMessage.INVALID_EMAIL;
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    // return ErrorMessage.SOMETHING_WENT_WRONG;
  }

  // TODO: Generate token and send email
  return SuccessMessages.RESET_EMAIL_SENT;
};

