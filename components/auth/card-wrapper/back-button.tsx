'use client';

import Link from 'next/link';
import { ReactElement } from 'react';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({
  href,
  label
}: BackButtonProps): ReactElement => {
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
};