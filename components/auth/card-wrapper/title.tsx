import { Poppins } from 'next/font/google';
import { ReactElement } from 'react';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
});

interface TitleProps {
  label: string;
}

export const Title = ({ label }: TitleProps): ReactElement => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        'text-3xl font-semibold',
        font.className
      )}>
        {label}
      </h1>
    </div>
  );
};