'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { type Language, SUPPORTED_LANGUAGES } from '@/lib/i18n';

const NAV_LINKS = [
  { id: 'nav-home', labelKey: 'nav_home', href: '#hero' },
  { id: 'nav-about', labelKey: 'nav_about', href: '#about' },
  { id: 'nav-services', labelKey: 'nav_services', href: '#services' },
  { id: 'nav-experience', labelKey: 'nav_experience', href: '#experience' },
  { id: 'nav-contact', labelKey: 'nav_contact', href: '#booking' },
];

const NAV_LABELS: Record<string, { en: string; ne: string }> = {
  nav_home: { en: 'Home', ne: 'गृहपृष्ठ' },
  nav_about: { en: 'About', ne: 'परिचय' },
  nav_services: { en: 'Services', ne: 'सेवाहरू' },
  nav_experience: { en: 'Experience', ne: 'अनुभव' },
  nav_contact: { en: 'Contact', ne: 'सम्पर्क' },
};

const LANG_SHORT: Record<Language, string> = {
  en: 'EN',
  ne: 'NP',
};

interface PublicNavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function PublicNavbar({ language, onLanguageChange }: PublicNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bookLabel = language === 'ne' ? 'अपोइन्टमेन्ट बुक' : 'Book Appointment';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md card-shadow' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 min-w-0">
              <AppLogo size={32} className="flex-shrink-0" />
              <div className="min-w-0">
                <span className={`font-bold text-sm sm:text-base tracking-tight block leading-tight truncate ${scrolled ? 'text-foreground' : 'text-white'}`}>
                  Dr. Krishna Koirala
                </span>
                <span className={`text-xs font-medium hidden sm:block ${scrolled ? 'text-muted-foreground' : 'text-white/80'}`}>ENT &amp; Head-Neck Surgeon</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    scrolled
                      ? 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {NAV_LABELS[link.labelKey][language]}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen((o) => !o)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    scrolled
                      ? 'border-border text-foreground hover:bg-muted/50'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  {LANG_SHORT[language]}
                  <Icon name="ChevronDownIcon" size={12} className={langDropdownOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </button>
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-24 bg-white rounded-lg shadow-lg border border-border overflow-hidden z-50">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { onLanguageChange(lang.code); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted/60 ${
                          language === lang.code ? 'text-primary bg-muted/40' : 'text-foreground'
                        }`}
                      >
                        {LANG_SHORT[lang.code]} — {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a
                href="tel:061553150"
                className={`flex items-center gap-2 text-sm font-semibold ${scrolled ? 'text-primary' : 'text-white'}`}
              >
                <Icon name="PhoneIcon" size={15} />
                <span>061-553150</span>
              </a>
              <a href="#booking" className="btn-primary text-sm px-5 py-2.5">
                {bookLabel}
              </a>
              <Link
                href="/sign-up-login-screen"
                className={`text-xs font-semibold hover:underline ${scrolled ? 'text-muted-foreground' : 'text-white/80'}`}
              >
                Admin
              </Link>
            </div>

            {/* Mobile Right: Language + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Language Toggle */}
              <div className="flex items-center rounded-lg border overflow-hidden"
                style={{ borderColor: scrolled ? 'var(--border)' : 'rgba(255,255,255,0.3)' }}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-2 py-1 text-xs font-semibold transition-colors ${
                      language === lang.code
                        ? scrolled ? 'bg-primary text-white' : 'bg-white text-primary' : scrolled ?'text-muted-foreground' : 'text-white/80'
                    }`}
                  >
                    {LANG_SHORT[lang.code]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} className={scrolled ? 'text-foreground' : 'text-white'} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-white animate-slide-in-right shadow-2xl flex flex-col">
            <div className="p-5 border-b flex items-center justify-between flex-shrink-0">
              <span className="font-bold text-foreground">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <Icon name="XMarkIcon" size={20} className="text-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-1 flex-1 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {NAV_LABELS[link.labelKey][language]}
                </a>
              ))}
              <div className="pt-4 border-t mt-4 space-y-3">
                <a href="tel:061553150" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary hover:bg-muted rounded-lg transition-colors">
                  <Icon name="PhoneIcon" size={16} />
                  061-553150
                </a>
                <a href="#booking" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center">
                  {bookLabel}
                </a>
                <Link
                  href="/sign-up-login-screen"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <Icon name="LockClosedIcon" size={16} />
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}