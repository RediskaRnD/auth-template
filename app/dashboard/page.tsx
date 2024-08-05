import { ReactElement } from 'react';

import { Button } from '@/components/ui/button';

const DashboardPage = (): ReactElement => {
  return (
    <div>
      <p className="font-semibold">Dashboard</p>
      <Button size="lg">Click me</Button>
    </div>
  );
};

export default DashboardPage;
