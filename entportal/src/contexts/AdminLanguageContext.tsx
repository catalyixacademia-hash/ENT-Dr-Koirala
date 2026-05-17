'use client';
import React, { createContext, useContext, useState } from 'react';
import type { Language } from '@/lib/i18n';

interface AdminLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const AdminLanguageContext = createContext<AdminLanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

const LANG_STORAGE_KEY = 'entportal-lang';

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  return stored === 'ne' ? 'ne' : 'en';
}

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  React.useEffect(() => {
    setLanguageState(readStoredLanguage());
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    }
  };

  return (
    <AdminLanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  return useContext(AdminLanguageContext);
}
