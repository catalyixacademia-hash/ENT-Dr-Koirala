'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

const TODAY_APPOINTMENTS = [
  { id: 'ta-1', hour: 9, minute: 0, patient: 'Priya Sharma', reasonKey: 'schedule_reason_1' as const, status: 'confirmed' as const, durationMin: 20 },
  { id: 'ta-2', hour: 9, minute: 30, patient: 'Rohan Das', reasonKey: 'schedule_reason_2' as const, status: 'confirmed' as const, durationMin: 30 },
  { id: 'ta-3', hour: 10, minute: 0, patient: 'Neha Joshi', reasonKey: 'schedule_reason_3' as const, status: 'pending' as const, durationMin: 20 },
  { id: 'ta-4', hour: 10, minute: 30, patient: 'Amir Khan', reasonKey: 'schedule_reason_4' as const, status: 'confirmed' as const, durationMin: 45 },
  { id: 'ta-5', hour: 11, minute: 0, patient: 'Sunita Patel', reasonKey: 'schedule_reason_5' as const, status: 'confirmed' as const, durationMin: 30 },
  { id: 'ta-6', hour: 11, minute: 30, patient: 'Vikram Singh', reasonKey: 'schedule_reason_6' as const, status: 'pending' as const, durationMin: 20 },
  { id: 'ta-7', hour: 17, minute: 0, patient: 'Deepa Nair', reasonKey: 'schedule_reason_7' as const, status: 'confirmed' as const, durationMin: 30 },
  { id: 'ta-8', hour: 17, minute: 30, patient: 'Arjun Thapa', reasonKey: 'schedule_reason_8' as const, status: 'confirmed' as const, durationMin: 25 },
];

function formatTime(hour: number, minute: number, am: string, pm: string) {
  const isPM = hour >= 12;
  const h12 = hour % 12 || 12;
  const min = minute.toString().padStart(2, '0');
  return { time: `${h12}:${min}`, period: isPM ? pm : am };
}

export default function TodaySchedule() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const now = 9;

  return (
    <div className="bg-white rounded-2xl border card-shadow p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-foreground">{t.admin_todays_schedule}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{t.admin_appointments_count}</p>
        </div>
        <a href="/appointments-management" className="text-xs font-semibold text-primary hover:underline">
          {t.admin_view_all}
        </a>
      </div>
      <div className="space-y-2.5 overflow-y-auto scrollbar-thin" style={{ maxHeight: '420px' }}>
        {TODAY_APPOINTMENTS.map((appt) => {
          const adjustedHour = appt.hour;
          const isPast = adjustedHour < now;
          const { time, period } = formatTime(appt.hour, appt.minute, t.time_am, t.time_pm);

          return (
            <div
              key={appt.id}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                isPast ? 'opacity-50 bg-muted/30' : 'bg-muted/20 hover:bg-muted/40'
              }`}
            >
              <div className="text-center w-12 xl:w-14 flex-shrink-0">
                <p className="text-xs font-bold text-foreground">{time}</p>
                <p className="text-xs text-muted-foreground">{period}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate xl:truncate-none xl:whitespace-normal">
                  {appt.patient}
                </p>
                <p className="text-xs text-muted-foreground truncate xl:truncate-none xl:whitespace-normal">
                  {t[appt.reasonKey]}
                </p>
              </div>
              <div className="flex-shrink-0 xl:max-w-[7.5rem]">
                <span className={`status-badge ${appt.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}`}>
                  {appt.status === 'confirmed' ? (
                    <Icon name="CheckCircleIcon" size={10} />
                  ) : (
                    <Icon name="ClockIcon" size={10} />
                  )}
                  {appt.status === 'confirmed' ? t.admin_status_confirmed : t.admin_status_pending}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
