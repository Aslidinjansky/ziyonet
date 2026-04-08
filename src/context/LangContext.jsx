import { createContext, useContext, useState } from 'react';
import ru from '../locales/ru';
import tj from '../locales/tj';

const locales = { ru, tj };

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const t = locales[lang];

  const toggleLang = () => setLang((l) => (l === 'ru' ? 'tj' : 'ru'));

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

export default LangContext;

