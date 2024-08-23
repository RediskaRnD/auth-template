import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { ReactElement } from 'react';

import { CardWrapper } from '@/components/auth/card-wrapper/card-wrapper';
import { SIGNIN_PAGE } from '@/routes';


export const ErrorCard = (): ReactElement => {
  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to Sign in"
      backButtonHref={SIGNIN_PAGE}
    >
      ⛔ Error
    </CardWrapper>
  );
};
