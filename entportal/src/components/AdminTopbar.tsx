'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations, SUPPORTED_LANGUAGES } from '@/lib/i18n';

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useAdminLanguage();
  const t = getTranslations(language);

  const notifications = [
    { id: 'notif-1', text: t.admin_notif_1, time: t.admin_notif_ago_5, icon: 'CalendarDaysIcon' },
    { id: 'notif-2', text: t.admin_notif_2, time: t.admin_notif_ago_1h, icon: 'CheckCircleIcon' },
    { id: 'notif-3', text: t.admin_notif_3, time: t.admin_notif_ago_2h, icon: 'ClockIcon' },
  ];

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden flex-shrink-0"
            aria-label={t.admin_open_menu_aria}
          >
            <Icon name="Bars3Icon" size={20} className="text-muted-foreground" />
          </button>
        )}
        <div className="relative hidden sm:block">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.admin_search_placeholder}
            className="pl-9 pr-4 py-2 text-sm rounded-lg border bg-muted/50 w-48 md:w-64 outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <span className="text-xs text-muted-foreground hidden md:block">
          Mon, May 17, 2026
        </span>

        {/* Language Toggle */}
        <div className="relative">
          <button
            onClick={() => { setLangOpen(!langOpen); setNotifOpen(false); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-muted hover:bg-muted transition-colors text-xs font-semibold text-foreground"
            aria-label={t.admin_change_language_aria}
          >
            <Icon name="GlobeAltIcon" size={14} className="text-muted-foreground" />
            <span>{language === 'en' ? 'EN' : 'NP'}</span>
            <Icon name="ChevronDownIcon" size={12} className="text-muted-foreground" />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-10 w-36 bg-white rounded-xl border card-shadow-lg z-50 animate-fade-in py-1">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-muted transition-colors flex items-center justify-between ${language === lang.code ? 'text-primary' : 'text-foreground'}`}
                >
                  <span>{lang.nativeLabel}</span>
                  {language === lang.code && <Icon name="CheckIcon" size={12} className="text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setLangOpen(false); }}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={t.admin_notifications_aria}
          >
            <Icon name="BellIcon" size={18} className="text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-10 w-64 sm:w-72 bg-white rounded-xl border card-shadow-lg z-50 animate-fade-in">
              <div className="p-3 border-b">
                <p className="text-sm font-semibold">{t.admin_notifications}</p>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={n.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center cursor-pointer flex-shrink-0">
          <span className="text-white text-xs font-bold">KK</span>
        </div>
      </div>
    </header>
  );
}