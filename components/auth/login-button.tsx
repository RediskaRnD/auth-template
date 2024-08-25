'use client';

import { SIGN_IN_PAGE } from '@/routes';
import { useRouter } from 'next/navigation';
import { ReactElement, ReactNode } from 'react';

interface LoginButtonProps {
  children: ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild
}: LoginButtonProps): ReactElement => {
  const router = useRouter();

  const onClick = () => {
    console.log('Login button clicked');
    router.push(SIGN_IN_PAGE);
  };

  if (mode === 'modal') {
    return (
      <span>
                TODO: Implement modal
      </span>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};