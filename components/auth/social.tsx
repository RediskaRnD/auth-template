'use client';

import { signIn } from 'next-auth/react'; // in case we use client side component
import { ReactElement } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = (): ReactElement => {

  const onClick = async (provider: string): Promise<void> => {
    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5"/>
      </Button>
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => onClick('github')}
      >
        <FaGithub className="h-5 w-5"/>
      </Button>
    </div>
  );
};