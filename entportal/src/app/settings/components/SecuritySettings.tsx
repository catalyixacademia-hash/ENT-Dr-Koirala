'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SecuritySettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<PasswordFormData>();

  const onSubmit = async (data: PasswordFormData) => {
    // BACKEND INTEGRATION: POST /api/auth/change-password with currentPassword + newPassword
    await new Promise((r) => setTimeout(r, 1000));
    setPwSaved(true);
    reset();
    setTimeout(() => setPwSaved(false), 4000);
    void data;
  };

  const newPw = watch('newPassword');

  return (
    <div className="space-y-5">
      {/* Password Change */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="LockClosedIcon" size={18} className="text-primary" />
          Change Password
        </h2>
        <p className="text-xs text-muted-foreground mb-6">Choose a strong password with a mix of letters, numbers, and symbols</p>

        {pwSaved && (
          <div className="mb-4 p-3 bg-secondary/10 border border-secondary/20 rounded-xl flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={16} className="text-secondary" />
            <p className="text-sm font-semibold text-secondary">Password updated successfully</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className="label-text">Current Password</label>
            <div className="relative">
              <input
                {...register('currentPassword', { required: 'Current password is required' })}
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
            <label className="label-text">New Password</label>
            <div className="relative">
              <input
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Minimum 8 characters' },
                  pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, message: 'Must include uppercase, number, and symbol' },
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
            <label className="label-text">Confirm New Password</label>
            <div className="relative">
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your new password',
                  validate: (v) => v === newPw || 'Passwords do not match',
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
              <><Icon name="ArrowPathIcon" size={15} className="animate-spin" /> Updating...</>
            ) : (
              <><Icon name="LockClosedIcon" size={15} /> Update Password</>
            )}
          </button>
        </form>
      </div>

      {/* 2FA & Session */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
          Access & Security
        </h2>
        <div className="space-y-4">
          {/* 2FA Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border">
            <div>
              <p className="text-sm font-semibold text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your admin account via SMS OTP</p>
            </div>
            <button
              onClick={() => setTwoFA(!twoFA)}
              className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${twoFA ? 'bg-secondary' : 'bg-muted-foreground/30'}`}
              aria-label={twoFA ? 'Disable 2FA' : 'Enable 2FA'}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${twoFA ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          {/* Session Timeout */}
          <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Auto Logout After Inactivity</p>
              <p className="text-xs text-muted-foreground mt-0.5">Automatically sign out after a period of inactivity</p>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="input-field w-auto text-sm py-2"
            >
              {['15', '30', '60', '120', '480'].map((t) => (
                <option key={`timeout-${t}`} value={t}>{t === '480' ? '8 hours' : `${t} minutes`}</option>
              ))}
            </select>
          </div>

          {/* Active Sessions */}
          <div className="p-4 bg-muted/20 rounded-xl border">
            <p className="text-sm font-semibold text-foreground mb-3">Active Sessions</p>
            <div className="space-y-2">
              {[
                { id: 'sess-1', device: 'Chrome on MacBook Pro', location: 'Mumbai, India', time: 'Active now', current: true },
                { id: 'sess-2', device: 'Safari on iPhone 15', location: 'Mumbai, India', time: '2 hours ago', current: false },
              ].map((session) => (
                <div key={session.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border">
                  <Icon name="ComputerDesktopIcon" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">{session.device}</p>
                    <p className="text-xs text-muted-foreground">{session.location} · {session.time}</p>
                  </div>
                  {session.current ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary/10 text-secondary">Current</span>
                  ) : (
                    <button className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
        <h2 className="text-base font-bold text-red-700 mb-2 flex items-center gap-2">
          <Icon name="ExclamationTriangleIcon" size={18} className="text-red-500" />
          Danger Zone
        </h2>
        <p className="text-xs text-red-600 mb-4">These actions are irreversible. Please proceed with caution.</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-xl text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-100 transition-colors">
            <Icon name="ArrowPathIcon" size={15} className="inline mr-1.5" />
            Reset All Settings
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-100 transition-colors">
            <Icon name="TrashIcon" size={15} className="inline mr-1.5" />
            Delete Admin Account
          </button>
        </div>
      </div>
    </div>
  );
}