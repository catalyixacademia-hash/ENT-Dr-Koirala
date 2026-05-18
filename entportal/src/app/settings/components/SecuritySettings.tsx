'use client';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations, type Language } from '@/lib/i18n';
import { pick } from '@/lib/i18n-helpers';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SESSION_RAW = [
  {
    id: 'sess-1',
    device: { en: 'Chrome on MacBook Pro', ne: 'म्याकबुक प्रोमा क्रोम' },
    location: { en: 'Mumbai, India', ne: 'मुम्बई, भारत' },
    hoursAgo: null as number | null,
    current: true,
  },
  {
    id: 'sess-2',
    device: { en: 'Safari on iPhone 15', ne: 'आइफोन १५ मा सफारी' },
    location: { en: 'Mumbai, India', ne: 'मुम्बई, भारत' },
    hoursAgo: 2,
    current: false,
  },
];

function sessionTimeLabel(lang: Language, hoursAgo: number | null, t: ReturnType<typeof getTranslations>): string {
  if (hoursAgo === null) return t.settings_session_active_now;
  return t.settings_session_hours_ago.replace('{n}', String(hoursAgo));
}

function timeoutOptionLabel(lang: Language, minutes: string, t: ReturnType<typeof getTranslations>): string {
  if (minutes === '480') return t.settings_timeout_hours;
  return t.settings_timeout_minutes.replace('{n}', minutes);
}

export default function SecuritySettings() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const sessions = useMemo(
    () =>
      SESSION_RAW.map((s) => ({
        id: s.id,
        device: pick(language, s.device),
        location: pick(language, s.location),
        time: sessionTimeLabel(language, s.hoursAgo, t),
        current: s.current,
      })),
    [language, t]
  );

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<PasswordFormData>();

  const onSubmit = async (data: PasswordFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setPwSaved(true);
    reset();
    setTimeout(() => setPwSaved(false), 4000);
    void data;
  };

  const newPw = watch('newPassword');

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="LockClosedIcon" size={18} className="text-primary" />
          {t.settings_change_password}
        </h2>
        <p className="text-xs text-muted-foreground mb-6">{t.settings_pw_hint}</p>

        {pwSaved && (
          <div className="mb-4 p-3 bg-secondary/10 border border-secondary/20 rounded-xl flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={16} className="text-secondary" />
            <p className="text-sm font-semibold text-secondary">{t.settings_pw_updated}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className="label-text">{t.settings_current_pw}</label>
            <div className="relative">
              <input
                {...register('currentPassword', { required: t.settings_pw_current_required })}
                type={showCurrent ? 'text' : 'password'}
                className="input-field pr-10"
                placeholder="••••••••••"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name={showCurrent ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
              </button>
            </div>
            {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="label-text">{t.settings_new_pw}</label>
            <div className="relative">
              <input
                {...register('newPassword', {
                  required: t.settings_pw_new_required,
                  minLength: { value: 8, message: t.settings_pw_min_8 },
                  pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, message: t.settings_pw_complexity },
                })}
                type={showNew ? 'text' : 'password'}
                className="input-field pr-10"
                placeholder="••••••••••"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name={showNew ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="label-text">{t.settings_confirm_pw}</label>
            <div className="relative">
              <input
                {...register('confirmPassword', {
                  required: t.settings_pw_confirm_required,
                  validate: (v) => v === newPw || t.settings_pw_mismatch,
                })}
                type={showConfirm ? 'text' : 'password'}
                className="input-field pr-10"
                placeholder="••••••••••"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name={showConfirm ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-5 py-2.5">
            {isSubmitting ? (
              <>
                <Icon name="ArrowPathIcon" size={15} className="animate-spin" /> {t.settings_updating_pw}
              </>
            ) : (
              <>
                <Icon name="LockClosedIcon" size={15} /> {t.settings_update_pw}
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
          {t.settings_access_security}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border">
            <div>
              <p className="text-sm font-semibold text-foreground">{t.settings_2fa}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.settings_2fa_desc}</p>
            </div>
            <button
              onClick={() => setTwoFA(!twoFA)}
              className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${twoFA ? 'bg-secondary' : 'bg-muted-foreground/30'}`}
              aria-label={twoFA ? t.settings_disable_2fa : t.settings_enable_2fa}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${twoFA ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{t.settings_auto_logout}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.settings_auto_logout_desc}</p>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="input-field w-auto text-sm py-2"
            >
              {['15', '30', '60', '120', '480'].map((mins) => (
                <option key={`timeout-${mins}`} value={mins}>
                  {timeoutOptionLabel(language, mins, t)}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-muted/20 rounded-xl border">
            <p className="text-sm font-semibold text-foreground mb-3">{t.settings_active_sessions}</p>
            <div className="space-y-2">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border">
                  <Icon name="ComputerDesktopIcon" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">{session.device}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.location} · {session.time}
                    </p>
                  </div>
                  {session.current ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary/10 text-secondary">
                      {t.settings_session_current}
                    </span>
                  ) : (
                    <button type="button" className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                      {t.settings_session_revoke}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
        <h2 className="text-base font-bold text-red-700 mb-2 flex items-center gap-2">
          <Icon name="ExclamationTriangleIcon" size={18} className="text-red-500" />
          {t.settings_danger_zone}
        </h2>
        <p className="text-xs text-red-600 mb-4">{t.settings_danger_hint}</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="px-4 py-2 rounded-xl text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-100 transition-colors">
            <Icon name="ArrowPathIcon" size={15} className="inline mr-1.5" />
            {t.settings_reset_all}
          </button>
          <button type="button" className="px-4 py-2 rounded-xl text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-100 transition-colors">
            <Icon name="TrashIcon" size={15} className="inline mr-1.5" />
            {t.settings_delete_account}
          </button>
        </div>
      </div>
    </div>
  );
}
