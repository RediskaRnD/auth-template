'use client';

import { useTranslate } from '@ayub-begimkulov/i18n';
import React, { ChangeEvent, ReactElement, useState } from 'react';

import { i18n } from '@/lib/i18n/i18n';

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  // { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  // { code: 'es', label: 'Español', flag: '🇪🇸' },
  // { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' }
];

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className
}): ReactElement => {
  const t = useTranslate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const updateLang = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    i18n.setLang(event.target.value as 'en' | 'ru').then();
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <label htmlFor="language" className="text-sm font-medium">
        Select Language:
      </label>
      <select
        value={i18n.getLang()}
        onChange={updateLang}
        style={{ marginBottom: 8 }}
      >
        <option value={'ru'}>Ru</option>
        <option value={'en'}>En</option>
      </select>
      <p>{t('test')}</p>
      {/*<select*/}
      {/*  id="language"*/}
      {/*  value={selectedLanguage}*/}
      {/*  onChange={event => onLanguageChange(event.target.value)}*/}
      {/*  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
      {/*>*/}
      {/*  {languages.map((lang) => (*/}
      {/*    <option key={lang.code} value={lang.code}>*/}
      {/*      {lang.flag} {lang.label}*/}
      {/*    </option>*/}
      {/*  ))}*/}
      {/*</select>*/}
    </div>
  );
};

export default LanguageSelector;
