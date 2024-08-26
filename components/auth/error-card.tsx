import { ReactElement } from 'react';

import { CardWrapper } from '@/components/auth/card-wrapper/card-wrapper';
import { SIGN_IN_PAGE } from '@/routes';


export const ErrorCard = (): ReactElement => {
  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to Sign in"
      backButtonHref={SIGN_IN_PAGE}
    >
      ⛔ Error
    </CardWrapper>
  );
};
