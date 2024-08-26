'use client';

import { useSearchParams } from 'next/navigation';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { ResultMessage } from '@/actions/auth-messages';
import { emailVerification } from '@/actions/email-verification';
import { CardWrapper } from '@/components/auth/card-wrapper/card-wrapper';
import { FormErrorMessage, FormSuccessMessage } from '@/components/form-messages';
import { SIGN_IN_PAGE } from '@/routes';

export const EmailVerificationForm = (): ReactElement => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    console.log({ token });
    if (token) {
      emailVerification(token)
        .then((resultMessage: ResultMessage) => {
          setSuccess(resultMessage.success);
          setError(resultMessage.error);
        })
        .catch(() => {
          setSuccess(undefined);
          setError('Something went wrong!');
        });
    } else {
      setError('Missing token!');
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
        {success || error ?
          <>
            <FormSuccessMessage message={success}/>
            <FormErrorMessage message={error}/>
          </>
          : <BeatLoader/>
        }
      </div>
    </CardWrapper>
  );
};