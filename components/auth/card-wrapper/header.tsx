import { Poppins } from 'next/font/google';
import { ReactElement } from 'react';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps): ReactElement => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <p className={cn('text-muted-foreground text-sm', font.className)}>
        {label}
      </p>
    </div>
  );
};