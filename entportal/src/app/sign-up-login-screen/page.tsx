import React from 'react';
import LoginForm from './components/LoginForm';
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext';

export default function SignUpLoginPage() {
  return (
    <AdminLanguageProvider>
      <LoginForm />
    </AdminLanguageProvider>
  );
}