'use client';
import React from 'react';
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
import WhatsAppButton from './components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { language, setLanguage } = useLanguage();

  return (
    <main>
      <PublicNavbar language={language} onLanguageChange={setLanguage} />
      <HeroSection language={language} />
      <AboutSection language={language} />
      <ServicesSection language={language} />
      <StatsSection />
      <TestimonialsSection />
      <SocialMediaHub />
      <BlogSection />
      <BookingSection language={language} />
      <PublicFooter language={language} />
      <WhatsAppButton language={language} />
    </main>
  );
}
