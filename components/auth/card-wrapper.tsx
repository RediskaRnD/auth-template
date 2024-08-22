'use client';

import React, { ReactElement } from 'react';

import { BackButton } from '@/components/auth/back-button';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader, CardTitle
} from '@/components/ui/card';

interface CardWrapperProps {
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
  headerLabel: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps): ReactElement => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social/>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
