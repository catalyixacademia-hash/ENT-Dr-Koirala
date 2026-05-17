'use client';
import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

interface NotifToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  channel: 'email' | 'sms' | 'both';
}

const NOTIF_DEFAULTS: Record<string, { enabled: boolean; channel: 'email' | 'sms' | 'both' }> = {
  'notif-new-booking': { enabled: true, channel: 'both' },
  'notif-confirm': { enabled: true, channel: 'email' },
  'notif-cancel': { enabled: true, channel: 'both' },
  'notif-reminder': { enabled: true, channel: 'email' },
  'notif-patient-new': { enabled: false, channel: 'email' },
  'notif-review': { enabled: true, channel: 'email' },
  'notif-weekly': { enabled: true, channel: 'email' },
};

export default function NotificationSettings() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const [prefs, setPrefs] = useState(NOTIF_DEFAULTS);
  const [saved, setSaved] = useState(false);

  const notifs = useMemo<NotifToggle[]>(
    () => [
      {
        id: 'notif-new-booking',
        label: t.settings_notif_new_booking,
        description: t.settings_notif_new_booking_desc,
        enabled: prefs['notif-new-booking'].enabled,
        channel: prefs['notif-new-booking'].channel,
      },
      {
        id: 'notif-confirm',
        label: t.settings_notif_confirm,
        description: t.settings_notif_confirm_desc,
        enabled: prefs['notif-confirm'].enabled,
        channel: prefs['notif-confirm'].channel,
      },
      {
        id: 'notif-cancel',
        label: t.settings_notif_cancel,
        description: t.settings_notif_cancel_desc,
        enabled: prefs['notif-cancel'].enabled,
        channel: prefs['notif-cancel'].channel,
      },
      {
        id: 'notif-reminder',
        label: t.settings_notif_reminder,
        description: t.settings_notif_reminder_desc,
        enabled: prefs['notif-reminder'].enabled,
        channel: prefs['notif-reminder'].channel,
      },
      {
        id: 'notif-patient-new',
        label: t.settings_notif_patient_new,
        description: t.settings_notif_patient_new_desc,
        enabled: prefs['notif-patient-new'].enabled,
        channel: prefs['notif-patient-new'].channel,
      },
      {
        id: 'notif-review',
        label: t.settings_notif_review,
        description: t.settings_notif_review_desc,
        enabled: prefs['notif-review'].enabled,
        channel: prefs['notif-review'].channel,
      },
      {
        id: 'notif-weekly',
        label: t.settings_notif_weekly,
        description: t.settings_notif_weekly_desc,
        enabled: prefs['notif-weekly'].enabled,
        channel: prefs['notif-weekly'].channel,
      },
    ],
    [t, prefs]
  );

  const channelLabel = (channel: 'email' | 'sms' | 'both') => {
    if (channel === 'both') return t.settings_channel_both;
    if (channel === 'email') return t.settings_channel_email;
    return t.settings_channel_sms;
  };

  const toggle = (id: string) => {
    setPrefs((prev) => ({
      ...prev,
      [id]: { ...prev[id], enabled: !prev[id].enabled },
    }));
  };

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="BellIcon" size={18} className="text-primary" />
          {t.settings_notif_title}
        </h2>
        <p className="text-xs text-muted-foreground mb-6">{t.settings_notif_desc}</p>

        <div className="space-y-3">
          {notifs.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${notif.enabled ? 'bg-white' : 'bg-muted/20'}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-foreground">{notif.label}</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      notif.channel === 'both'
                        ? 'bg-primary/10 text-primary'
                        : notif.channel === 'email'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {channelLabel(notif.channel)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{notif.description}</p>
              </div>
              <button
                onClick={() => toggle(notif.id)}
                className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${notif.enabled ? 'bg-secondary' : 'bg-muted-foreground/30'}`}
                aria-label={notif.enabled ? t.settings_disable_notif : t.settings_enable_notif}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${notif.enabled ? 'left-6' : 'left-1'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h3 className="text-sm font-bold text-foreground mb-4">{t.settings_notif_contact}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">{t.settings_notif_email}</label>
            <input type="email" defaultValue="dr.mehta@entportal.in" className="input-field" />
          </div>
          <div>
            <label className="label-text">{t.settings_sms_number}</label>
            <input type="tel" defaultValue="+91 98765 43210" className="input-field" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-secondary font-semibold">
            <Icon name="CheckCircleIcon" size={16} />
            {t.settings_notif_saved}
          </span>
        )}
        <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
          <Icon name="CheckIcon" size={15} />
          {t.settings_save_prefs}
        </button>
      </div>
    </div>
  );
}


