import type { Metadata } from 'next';
import { ReactElement } from 'react';

import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Auth template',
};

const SignUpPage = (): ReactElement => {
  return (
    <SignUpForm/>
  );
};

export default SignUpPage;