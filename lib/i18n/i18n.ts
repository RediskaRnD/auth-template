import { createPluralize, I18N } from '@ayub-begimkulov/i18n';

import { en } from '@/lib/i18n/keys/en';
import { ru } from '@/lib/i18n/keys/ru';

const pluralizeEn = createPluralize('en');
const pluralizeRu = createPluralize('ru');

export const i18n = new I18N({
  defaultLang: 'ru',
  languages: {
    en: {
      keyset: en,
      pluralize: pluralizeEn
    },
    ru: {
      keyset: ru,
      pluralize: pluralizeRu
    }
  }
});