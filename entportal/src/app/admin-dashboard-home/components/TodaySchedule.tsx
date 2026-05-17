'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

const TODAY_APPOINTMENTS = [
  { id: 'ta-1', time: '9:00 AM', patient: 'Priya Sharma', reason: 'Sinusitis Follow-up', status: 'confirmed', duration: '20 min' },
  { id: 'ta-2', time: '9:30 AM', patient: 'Rohan Das', reason: 'Ear Infection', status: 'confirmed', duration: '30 min' },
  { id: 'ta-3', time: '10:00 AM', patient: 'Neha Joshi', reason: 'Tonsil Assessment', status: 'pending', duration: '20 min' },
  { id: 'ta-4', time: '10:30 AM', patient: 'Amir Khan', reason: 'Hearing Loss Eval', status: 'confirmed', duration: '45 min' },
  { id: 'ta-5', time: '11:00 AM', patient: 'Sunita Patel', reason: 'Allergy Testing', status: 'confirmed', duration: '30 min' },
  { id: 'ta-6', time: '11:30 AM', patient: 'Vikram Singh', reason: 'Post-Surgery Review', status: 'pending', duration: '20 min' },
  { id: 'ta-7', time: '5:00 PM', patient: 'Deepa Nair', reason: 'Nasal Polyp Consult', status: 'confirmed', duration: '30 min' },
  { id: 'ta-8', time: '5:30 PM', patient: 'Arjun Thapa', reason: 'Pediatric ENT', status: 'confirmed', duration: '25 min' },
];

export default function TodaySchedule() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const now = 9;

  return (
    <div className="bg-white rounded-2xl border card-shadow p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-foreground">{t?.admin_todays_schedule}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{t?.admin_appointments_count}</p>
        </div>
        <a href="/appointments-management" className="text-xs font-semibold text-primary hover:underline">
          {t?.admin_view_all}
        </a>
      </div>
      <div className="space-y-2.5 overflow-y-auto scrollbar-thin" style={{ maxHeight: '420px' }}>
        {TODAY_APPOINTMENTS?.map((appt) => {
          const apptHour = parseInt(appt?.time?.split(':')?.[0]);
          const isPM = appt?.time?.includes('PM') && apptHour !== 12;
          const adjustedHour = isPM ? apptHour + 12 : apptHour;
          const isPast = adjustedHour < now;

          return (
            <div
              key={appt?.id}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                isPast ? 'opacity-50 bg-muted/30' : 'bg-muted/20 hover:bg-muted/40'
              }`}
            >
              <div className="text-center w-12 xl:w-14 flex-shrink-0">
                <p className="text-xs font-bold text-foreground">{appt?.time?.split(' ')?.[0]}</p>
                <p className="text-xs text-muted-foreground">{appt?.time?.split(' ')?.[1]}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate xl:truncate-none xl:whitespace-normal">
                  {appt?.patient}
                </p>
                <p className="text-xs text-muted-foreground truncate xl:truncate-none xl:whitespace-normal">
                  {appt?.reason}
                </p>
              </div>
              <div className="flex-shrink-0 xl:max-w-[7.5rem]">
                <span className={`status-badge ${appt?.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}`}>
                  {appt?.status === 'confirmed' ? (
                    <Icon name="CheckCircleIcon" size={10} />
                  ) : (
                    <Icon name="ClockIcon" size={10} />
                  )}
                  {appt?.status === 'confirmed' ? t?.admin_status_confirmed : t?.admin_status_pending}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}