import { ReactElement } from 'react';

import { auth } from '@/auth';

const SettingsPage = async (): Promise<ReactElement> => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
};

export default SettingsPage;