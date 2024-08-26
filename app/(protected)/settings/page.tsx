import type { Metadata } from 'next';
import { ReactElement } from 'react';

import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { SIGN_IN_PAGE } from '@/routes';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Auth template',
};

const SettingsPage = async (): Promise<ReactElement> => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form action={async () => {
        'use server';

        await signOut({ redirectTo: SIGN_IN_PAGE });
      }}>
        <Button type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;