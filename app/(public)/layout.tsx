'use client';

import { I18NProvider } from '@ayub-begimkulov/i18n';
import { ReactElement, ReactNode } from 'react';

import LanguageSelector from '@/components/language-selector';
import { i18n } from '@/lib/i18n/i18n';

const PublicLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <I18NProvider i18n={i18n}>
      <div className="flex flex-col gap-y-4">
        <nav className="bg-black text-white">
          <LanguageSelector/>
        </nav>
        {children}
      </div>
    </I18NProvider>
  );
};

export default PublicLayout;
