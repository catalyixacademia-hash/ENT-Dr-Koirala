'use client';
import React, { useState, useEffect } from 'react';
import PublicNavbar from './components/PublicNavbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogSection';
import SocialMediaHub from './components/SocialMediaHub';
import BookingSection from './components/BookingSection';
import PublicFooter from './components/PublicFooter';
import type { Language } from '@/lib/i18n';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem('entportal-lang');
    if (stored === 'ne' || stored === 'en') setLanguage(stored);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    window.localStorage.setItem('entportal-lang', lang);
  };

  return (
    <main>
      <PublicNavbar language={language} onLanguageChange={handleLanguageChange} />
      <HeroSection language={language} />
      <AboutSection language={language} />
      <ServicesSection language={language} />
      <StatsSection language={language} />
      <TestimonialsSection language={language} />
      <SocialMediaHub language={language} />
      <BlogSection language={language} />
      <BookingSection language={language} />
      <PublicFooter language={language} />
    </main>
  );
}