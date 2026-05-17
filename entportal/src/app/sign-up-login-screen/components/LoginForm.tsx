'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const DEMO_CREDENTIAL = {
  email: 'dr.krishna@entportal.np',
  password: 'ENTAdmin@2026',
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/login with email + password
    await new Promise((r) => setTimeout(r, 1400));
    if (data.email === DEMO_CREDENTIAL.email && data.password === DEMO_CREDENTIAL.password) {
      window.location.href = '/admin-dashboard-home';
    } else {
      setError('Invalid credentials — use the demo account below to sign in');
    }
    setLoading(false);
  };

  const autofill = () => {
    setValue('email', DEMO_CREDENTIAL.email);
    setValue('password', DEMO_CREDENTIAL.password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0F766E 60%, #14B8A6 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
        </div>
        <div className="relative flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <AppLogo size={40} />
            <div>
              <span className="font-bold text-white text-lg block leading-tight">ENTPortal</span>
              <span className="text-xs text-white/70">Admin Panel</span>
            </div>
          </div>

          {/* Center content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Secure Doctor Dashboard
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-tight text-balance">
              Manage Your Practice<br />
              <span className="text-accent">From One Place</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-md">
              Access your appointment calendar, patient records, and clinic analytics — all secured with medical-grade access controls.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'feat-appt', icon: 'CalendarDaysIcon', label: 'Appointment\nManagement' },
                { id: 'feat-crm', icon: 'UserGroupIcon', label: 'Patient\nRecords CRM' },
                { id: 'feat-analytics', icon: 'ChartBarIcon', label: 'Analytics\n& Insights' },
              ].map((feat) => (
                <div key={feat.id} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                    <Icon name={feat.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-white" />
                  </div>
                  <p className="text-white text-xs font-semibold whitespace-pre-line leading-snug">{feat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom trust */}
          <div className="flex items-center gap-6">
            {[
              { id: 'trust-1', icon: 'ShieldCheckIcon', label: 'HIPAA Compliant' },
              { id: 'trust-2', icon: 'LockClosedIcon', label: 'End-to-End Encrypted' },
              { id: 'trust-3', icon: 'CheckBadgeIcon', label: 'Verified Access Only' },
            ].map((t) => (
              <div key={t.id} className="flex items-center gap-2 text-white/70 text-xs">
                <Icon name={t.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-accent" />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={36} />
            <span className="font-bold text-foreground text-lg">ENTPortal</span>
          </div>

          <h2 className="text-2xl font-extrabold text-foreground mb-2">Welcome back, Doctor</h2>
          <p className="text-muted-foreground text-sm mb-8">Sign in to access your admin dashboard</p>

          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <Icon name="ExclamationCircleIcon" size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label-text">Email Address</label>
              <div className="relative">
                <Icon name="EnvelopeIcon" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                  type="email"
                  placeholder="dr.krishna@entportal.np"
                  className="input-field pl-10"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label-text mb-0">Password</label>
                <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Icon name="LockClosedIcon" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input
                {...register('rememberMe')}
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 rounded accent-primary cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm font-medium text-muted-foreground cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
            >
              {loading ? (
                <>
                  <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Icon name="ArrowRightOnRectangleIcon" size={18} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-6 p-4 rounded-2xl bg-accent/5 border border-accent/20">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">Demo Credentials</p>
              <button
                onClick={autofill}
                className="text-xs font-semibold text-accent hover:text-primary transition-colors flex items-center gap-1"
              >
                <Icon name="BoltIcon" size={12} />
                Autofill
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border">
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-xs font-semibold text-foreground font-mono">{DEMO_CREDENTIAL.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border">
                <div>
                  <p className="text-xs text-muted-foreground">Password</p>
                  <p className="text-xs font-semibold text-foreground font-mono">{DEMO_CREDENTIAL.password}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            This is a private medical admin portal.{' '}
            <Link href="/" className="text-primary font-semibold hover:underline">
              View public website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}