'use client';

import React, { ReactElement } from 'react';

import { BackButton } from '@/components/auth/card-wrapper/back-button';
import { Header } from '@/components/auth/card-wrapper/header';
import { Title } from '@/components/auth/card-wrapper/title';
import { Social } from '@/components/auth/social';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CardWrapperProps {
  titleLabel?: string;
  headerLabel?: string;
  backButtonHref: string;
  backButtonLabel: string;
  children?: React.ReactNode;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  titleLabel,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps): ReactElement => {
  return (
    <Card className="w-[400px] shadow-md">
      {titleLabel ?
        <CardTitle>
          <Title label={titleLabel}/>
        </CardTitle> : null
      }
      {headerLabel ?
        <CardHeader>
          <Header label={headerLabel}/>
        </CardHeader> : null
      }
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
