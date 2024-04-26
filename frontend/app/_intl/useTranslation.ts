import { translations } from '@/_intl/translations';
import { useLang } from '@/_intl/intlContext';

export const useTranslation = () => {
  const { lang } = useLang();
  
  const translate = (key: string): string => {
    const dict: Record<string, string> = translations[lang];
    return dict[key] || key;
  };

  return { translate };
};