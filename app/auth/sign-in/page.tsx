import type { Metadata } from 'next';
import { ReactElement } from 'react';

import { SignInForm } from '@/components/auth/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Auth template',
};

const SignInPage = (): ReactElement => {
  return (
    <SignInForm/>
  );
};

export default SignInPage;