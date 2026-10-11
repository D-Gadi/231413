import { useState } from 'react';
import translations from './translations';
import { LanguageContext } from './context';

function interpolate(str, vars = {}) {
  return str.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? vars[key] : `{${key}}`));
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const t = (path, vars) => {
    const value = path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), translations[lang]);
    if (typeof value === 'string') return interpolate(value, vars);
    return value;
  };

  const toggle = () => setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
