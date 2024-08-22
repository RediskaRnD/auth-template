import { ReactElement } from 'react';

import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const SettingsPage = async (): Promise<ReactElement> => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form action={async () => {
        'use server';

        await signOut();
      }}>
        <Button type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;