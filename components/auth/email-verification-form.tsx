'use client';

import { useSearchParams } from 'next/navigation';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { ErrorMessage, ResultMessage } from '@/actions/auth-messages';
import { emailVerification } from '@/actions/email-verification';
import { CardWrapper } from '@/components/auth/card-wrapper/card-wrapper';
import { FormErrorMessage, FormSuccessMessage } from '@/components/form-messages';
import { SIGN_IN_PAGE } from '@/routes';

export const EmailVerificationForm = (): ReactElement => {
  const [resultMessage, setResultMessage] = useState<ResultMessage | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    console.log({ token });
    if (token) {
      emailVerification(token)
        .then((resultMessage: ResultMessage) => {
          setResultMessage(resultMessage);
        })
        .catch(() => {
          setResultMessage(ErrorMessage.SOMETHING_WENT_WRONG);
        });
    } else {
      setResultMessage(ErrorMessage.SOMETHING_WENT_WRONG);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Confirming your verification"
      backButtonLabel="Back to Sign in"
      backButtonHref={SIGN_IN_PAGE}
    >
      <div className="flex w-full items-center justify-center">
        {resultMessage ?
          <>
            <FormSuccessMessage message={resultMessage?.success}/>
            <FormErrorMessage message={resultMessage?.error}/>
          </>
          : <BeatLoader/>
        }
      </div>
    </CardWrapper>
  );
};