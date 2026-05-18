'use client';
import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_EMAIL, ADMIN_FULL_NAME } from '@/lib/admin-config';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginFormInner() {
  const { language } = useAdminLanguage();
  const tr = getTranslations(language);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/admin-dashboard-home';

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: { email: ADMIN_EMAIL },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setLoading(true);
    try {
      await signIn(data.email.trim(), data.password);
      router.push(redirectTo);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : tr.login_error_invalid;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const autofill = () => setValue('email', ADMIN_EMAIL);

  const features = [
    { id: 'feat-appt', icon: 'CalendarDaysIcon', label: tr.login_feat_appt },
    { id: 'feat-crm', icon: 'UserGroupIcon', label: tr.login_feat_crm },
    { id: 'feat-analytics', icon: 'ChartBarIcon', label: tr.login_feat_analytics },
  ];

  const trust = [
    { id: 'trust-1', icon: 'ShieldCheckIcon', label: tr.login_trust_hipaa },
    { id: 'trust-2', icon: 'LockClosedIcon', label: tr.login_trust_encrypted },
    { id: 'trust-3', icon: 'CheckBadgeIcon', label: tr.login_trust_verified },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0F766E 60%, #14B8A6 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
        </div>
        <div className="relative flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <AppLogo size={40} />
            <div>
              <span className="font-bold text-white text-lg block leading-tight">{tr.login_brand_name}</span>
              <span className="text-xs text-white/70">{tr.login_brand_subtitle}</span>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {tr.login_badge_secure}
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-tight text-balance">
              {tr.login_headline_1}<br />
              <span className="text-accent">{tr.login_headline_accent}</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-md">{tr.login_desc}</p>
            <div className="grid grid-cols-3 gap-4">
              {features.map((feat) => (
                <div key={feat.id} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                    <Icon name={feat.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-white" />
                  </div>
                  <p className="text-white text-xs font-semibold leading-snug">{feat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            {trust.map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-white/70 text-xs">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-accent" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={36} />
            <span className="font-bold text-foreground text-lg">{tr.login_brand_name}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">{tr.login_welcome}</h2>
          <p className="text-muted-foreground text-sm mb-8">{tr.login_subtitle}</p>
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <Icon name="ExclamationCircleIcon" size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label-text">{tr.login_email_label}</label>
              <div className="relative">
                <Icon name="EnvelopeIcon" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input {...register('email', { required: tr.login_email_required, pattern: { value: /^\S+@\S+\.\S+$/, message: tr.login_email_invalid } })} type="email" placeholder={ADMIN_EMAIL} className="input-field pl-10" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label-text mb-0">{tr.login_password_label}</label>
                <a href="#" className="text-xs font-semibold text-primary hover:underline">{tr.login_forgot_password}</a>
              </div>
              <div className="relative">
                <Icon name="LockClosedIcon" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input {...register('password', { required: tr.login_password_required, minLength: { value: 6, message: tr.login_password_min } })} type={showPassword ? 'text' : 'password'} placeholder="••••••••••" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showPassword ? tr.login_hide_password_aria : tr.login_show_password_aria}>
                  <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input {...register('rememberMe')} type="checkbox" id="rememberMe" className="w-4 h-4 rounded accent-primary cursor-pointer" />
              <label htmlFor="rememberMe" className="text-sm font-medium text-muted-foreground cursor-pointer">{tr.login_remember_me}</label>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
              {loading ? (<><Icon name="ArrowPathIcon" size={18} className="animate-spin" />{tr.login_signing_in}</>) : (<><Icon name="ArrowRightOnRectangleIcon" size={18} />{tr.login_submit}</>)}
            </button>
          </form>
          <div className="mt-6 p-4 rounded-2xl bg-accent/5 border border-accent/20">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">{tr.login_demo_title}</p>
              <button onClick={autofill} className="text-xs font-semibold text-accent hover:text-primary transition-colors flex items-center gap-1">
                <Icon name="BoltIcon" size={12} />
                {tr.login_demo_autofill}
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border">
                <div>
                  <p className="text-xs text-muted-foreground">{tr.login_demo_email_label}</p>
                  <p className="text-xs font-semibold text-foreground font-mono">{ADMIN_EMAIL}</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border">
                <div>
                  <p className="text-xs text-muted-foreground">{tr.login_demo_password_label}</p>
                  <p className="text-xs text-muted-foreground font-mono">{tr.login_demo_password_hint}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            {tr.login_footer_private}{' '}
            <Link href="/" className="text-primary font-semibold hover:underline">{tr.login_footer_public_link}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginForm() {
  const { language } = useAdminLanguage();
  const tr = getTranslations(language);
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">{tr.login_loading}</div>}>
      <LoginFormInner />
    </Suspense>
  );
}
