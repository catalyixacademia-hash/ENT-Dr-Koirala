'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProfileSettings from './ProfileSettings';
import ClinicHoursSettings from './ClinicHoursSettings';
import AvailabilitySettings from './AvailabilitySettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function SettingsPanel() {
  const [active, setActive] = useState('profile');
  const { language } = useAdminLanguage();
  const t = getTranslations(language);

  const SETTINGS_NAV = [
    {
      id: 'sn-profile',
      label: t.admin_settings_profile,
      icon: 'UserCircleIcon',
      component: 'profile',
    },
    { id: 'sn-hours', label: t.admin_settings_hours, icon: 'ClockIcon', component: 'hours' },
    {
      id: 'sn-availability',
      label: t.admin_settings_availability,
      icon: 'CalendarDaysIcon',
      component: 'availability',
    },
    {
      id: 'sn-notifications',
      label: t.admin_settings_notifications,
      icon: 'BellIcon',
      component: 'notifications',
    },
    {
      id: 'sn-security',
      label: t.admin_settings_security,
      icon: 'ShieldCheckIcon',
      component: 'security',
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t.admin_settings_title}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{t.admin_settings_subtitle}</p>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left Nav */}
        <div className="w-52 flex-shrink-0">
          <nav className="bg-white rounded-2xl border card-shadow p-2 space-y-1">
            {SETTINGS_NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.component)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.component
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {active === 'profile' && <ProfileSettings />}
          {active === 'hours' && <ClinicHoursSettings />}
          {active === 'availability' && <AvailabilitySettings />}
          {active === 'notifications' && <NotificationSettings />}
          {active === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}
