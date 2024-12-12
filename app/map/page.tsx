import type { Metadata } from 'next';
import React, { ReactElement } from 'react';

import { auth } from '@/auth';
import { WorldMap } from '@/components/map/world-map';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Auth template'
};

const MapPage = async (): Promise<ReactElement> => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <WorldMap/>
    </div>
  );
};

export default MapPage;