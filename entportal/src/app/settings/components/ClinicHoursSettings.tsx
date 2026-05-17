'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';
import { dayLabel } from '@/lib/i18n-helpers';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface DaySchedule {
  isOpen: boolean;
  morning: { from: string; to: string };
  evening: { from: string; to: string };
}

const DEFAULT_HOURS: Record<string, DaySchedule> = {
  Monday: { isOpen: true, morning: { from: '09:00', to: '13:00' }, evening: { from: '17:00', to: '20:00' } },
  Tuesday: { isOpen: true, morning: { from: '09:00', to: '13:00' }, evening: { from: '17:00', to: '20:00' } },
  Wednesday: { isOpen: true, morning: { from: '09:00', to: '13:00' }, evening: { from: '17:00', to: '20:00' } },
  Thursday: { isOpen: true, morning: { from: '09:00', to: '13:00' }, evening: { from: '17:00', to: '20:00' } },
  Friday: { isOpen: true, morning: { from: '09:00', to: '13:00' }, evening: { from: '17:00', to: '20:00' } },
  Saturday: { isOpen: true, morning: { from: '09:00', to: '13:00' }, evening: { from: '17:00', to: '19:00' } },
  Sunday: { isOpen: false, morning: { from: '', to: '' }, evening: { from: '', to: '' } },
};

export default function ClinicHoursSettings() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [saved, setSaved] = useState(false);

  const toggle = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen },
    }));
  };

  const updateTime = (day: string, session: 'morning' | 'evening', field: 'from' | 'to', value: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [session]: { ...prev[day][session], [field]: value } },
    }));
  };

  const handleSave = async () => {
    // BACKEND INTEGRATION: PUT /api/clinic/hours with hours data
    await new Promise((r) => setTimeout(r, 700));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Icon name="ClockIcon" size={18} className="text-primary" />
          {t.settings_clinic_hours_title}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">{t.settings_clinic_hours_desc}</p>

        <div className="space-y-3">
          {DAYS.map((day) => {
            const schedule = hours[day];
            return (
              <div
                key={`day-sched-${day}`}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${schedule.isOpen ? 'bg-white' : 'bg-muted/20 opacity-60'}`}
              >
                <div className="w-24 flex-shrink-0">
                  <p className="text-sm font-semibold text-foreground">{dayLabel(language, day)}</p>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => toggle(day)}
                  className={`relative w-10 h-5 rounded-full transition-all flex-shrink-0 ${schedule.isOpen ? 'bg-secondary' : 'bg-muted-foreground/30'}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${schedule.isOpen ? 'left-5' : 'left-0.5'}`}
                  />
                </button>

                {schedule.isOpen ? (
                  <div className="flex flex-wrap items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">{t.settings_morning}</span>
                      <input
                        type="time"
                        value={schedule.morning.from}
                        onChange={(e) => updateTime(day, 'morning', 'from', e.target.value)}
                        className="input-field py-1.5 px-2 text-xs w-28"
                      />
                      <span className="text-xs text-muted-foreground">{t.common_to}</span>
                      <input
                        type="time"
                        value={schedule.morning.to}
                        onChange={(e) => updateTime(day, 'morning', 'to', e.target.value)}
                        className="input-field py-1.5 px-2 text-xs w-28"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">{t.settings_evening}</span>
                      <input
                        type="time"
                        value={schedule.evening.from}
                        onChange={(e) => updateTime(day, 'evening', 'from', e.target.value)}
                        className="input-field py-1.5 px-2 text-xs w-28"
                      />
                      <span className="text-xs text-muted-foreground">{t.common_to}</span>
                      <input
                        type="time"
                        value={schedule.evening.to}
                        onChange={(e) => updateTime(day, 'evening', 'to', e.target.value)}
                        className="input-field py-1.5 px-2 text-xs w-28"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground">{t.settings_closed}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-secondary font-semibold">
            <Icon name="CheckCircleIcon" size={16} />
            {t.settings_hours_saved}
          </span>
        )}
        <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
          <Icon name="CheckIcon" size={15} />
          {t.settings_save_hours}
        </button>
      </div>
    </div>
  );
}
