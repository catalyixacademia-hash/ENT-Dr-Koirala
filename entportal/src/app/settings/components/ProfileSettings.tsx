'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface ProfileFormData {
  fullName: string;
  designation: string;
  qualifications: string;
  phone: string;
  email: string;
  clinicName: string;
  clinicAddress: string;
  bio: string;
  tiktokHandle: string;
  instagramHandle: string;
  facebookUrl: string;
  yearsExperience: string;
  specializations: string;
}

export default function ProfileSettings() {
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: 'Dr. Krishna Koirala',
      designation: 'Professor & Head of ENT, Senior ENT Consultant',
      qualifications: 'MBBS, MS (ENT-HNS)',
      phone: '061-553150',
      email: 'dr.krishnakoirala@mcoms.edu.np',
      clinicName: 'Nayabazar ENT Care Center / Shree Krishna ENT Care',
      clinicAddress: 'Nayabazar, Pokhara, Gandaki Pradesh, Nepal',
      bio: 'Professor and Head of the ENT Department at Manipal College of Medical Sciences (MCOMS), Pokhara, with 20+ years of specialized experience in Otorhinolaryngology and Head-Neck Surgery. Senior ENT Consultant at Nayabazar ENT Care Center. Expert in thyroid and head-neck surgery, deeply committed to patient education through social media.',
      tiktokHandle: '@dr_krishna_koirala_ent',
      instagramHandle: '',
      facebookUrl: 'https://www.facebook.com/drkrishnakoirala/',
      yearsExperience: '20',
      specializations: 'ENT, Head-Neck Surgery, Thyroid Surgery, Sinusitis, Ear Disorders, Pediatric ENT',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setSaveState('saving');
    // BACKEND INTEGRATION: PUT /api/doctor/profile with form data
    await new Promise((r) => setTimeout(r, 1000));
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 3000);
    void data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Basic Info */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Icon name="UserCircleIcon" size={18} className="text-primary" />
          Doctor Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label-text">Full Name</label>
            <input {...register('fullName', { required: 'Required' })} type="text" className="input-field" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="label-text">Designation</label>
            <input {...register('designation')} type="text" className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Qualifications</label>
            <p className="text-xs text-muted-foreground mb-1.5">Degrees, fellowships, and certifications</p>
            <input {...register('qualifications')} type="text" className="input-field" />
          </div>
          <div>
            <label className="label-text">Years of Experience</label>
            <input {...register('yearsExperience')} type="number" className="input-field" />
          </div>
          <div>
            <label className="label-text">Phone Number</label>
            <input {...register('phone')} type="tel" className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Specializations</label>
            <p className="text-xs text-muted-foreground mb-1.5">Comma-separated list of specialties</p>
            <input {...register('specializations')} type="text" className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Professional Bio</label>
            <p className="text-xs text-muted-foreground mb-1.5">Shown on public website about section</p>
            <textarea {...register('bio')} rows={4} className="input-field resize-none" />
          </div>
        </div>
      </div>

      {/* Clinic Info */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Icon name="BuildingOfficeIcon" size={18} className="text-primary" />
          Clinic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label-text">Clinic Name</label>
            <input {...register('clinicName')} type="text" className="input-field" />
          </div>
          <div>
            <label className="label-text">Contact Email</label>
            <input {...register('email')} type="email" className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Clinic Address</label>
            <input {...register('clinicAddress')} type="text" className="input-field" />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Icon name="GlobeAltIcon" size={18} className="text-primary" />
          Social Media Handles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="label-text">TikTok Handle</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">@</span>
              <input {...register('tiktokHandle')} type="text" className="input-field pl-7" />
            </div>
          </div>
          <div>
            <label className="label-text">Instagram Handle</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">@</span>
              <input {...register('instagramHandle')} type="text" className="input-field pl-7" />
            </div>
          </div>
          <div>
            <label className="label-text">Facebook Page Name</label>
            <input {...register('facebookUrl')} type="text" className="input-field" />
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="sticky bottom-0 bg-white border-t rounded-b-2xl px-6 py-4 flex items-center justify-between">
        {isDirty && saveState === 'idle' && (
          <span className="text-xs text-amber-600 font-semibold flex items-center gap-1.5">
            <Icon name="ExclamationCircleIcon" size={14} />
            You have unsaved changes
          </span>
        )}
        {saveState === 'saving' && (
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Icon name="ArrowPathIcon" size={14} className="animate-spin" />
            Saving...
          </span>
        )}
        {saveState === 'saved' && (
          <span className="text-xs text-secondary flex items-center gap-1.5">
            <Icon name="CheckCircleIcon" size={14} />
            Profile saved successfully
          </span>
        )}
        {saveState === 'idle' && !isDirty && <span />}
        <div className="flex items-center gap-3">
          <button type="button" className="btn-outline text-sm px-4 py-2">Discard</button>
          <button type="submit" disabled={saveState === 'saving'} className="btn-primary text-sm px-5 py-2">
            {saveState === 'saving' ? (
              <><Icon name="ArrowPathIcon" size={15} className="animate-spin" /> Saving...</>
            ) : (
              <><Icon name="CheckIcon" size={15} /> Save Profile</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}