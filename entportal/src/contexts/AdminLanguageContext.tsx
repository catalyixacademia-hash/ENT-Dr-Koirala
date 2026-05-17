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

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  return (
    <AdminLanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  return useContext(AdminLanguageContext);
}
