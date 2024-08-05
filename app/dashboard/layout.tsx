import { ReactElement, ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="bg-black text-white">liaw</nav>
      {children}
    </div>
  );
};

export default DashboardLayout;
