'use client';

import React, { useState, ReactElement } from 'react';

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' }
];

interface LanguageSelectorProps {
  className?: string;
  onLanguageChange: (code: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  onLanguageChange
}): ReactElement => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <label htmlFor="language" className="text-sm font-medium text-gray-700">
        Select Language:
      </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={event => onLanguageChange(event.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
