'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';
import type { Patient } from './PatientCRM';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

interface Props {
  onClose: () => void;
  onAdd: (p: Patient) => void;
}

interface FormData {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  city: string;
  bloodGroup: string;
  diagnosisTags: string;
  allergies: string;
  notes: string;
}

export default function AddPatientModal({ onClose, onAdd }: Props) {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // BACKEND INTEGRATION: POST /api/patients with patient data
    await new Promise((r) => setTimeout(r, 800));
    const newPatient: Patient = {
      id: `pat-${Date.now()}`,
      name: data.name,
      age: Number(data.age),
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      city: data.city,
      bloodGroup: data.bloodGroup,
      lastVisit: new Date().toISOString().split('T')[0],
      nextAppointment: null,
      visitCount: 1,
      diagnosisTags: data.diagnosisTags ? data.diagnosisTags.split(',').map((t) => t.trim()) : [],
      allergies: data.allergies ? data.allergies.split(',').map((a) => a.trim()) : [],
      notes: data.notes,
      status: 'active',
      registeredOn: new Date().toISOString().split('T')[0],
    };
    onAdd(newPatient);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-2xl card-shadow-lg animate-slide-up overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold text-foreground">{t.patient_add_title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <Icon name="XMarkIcon" size={18} className="text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="label-text">{t.patient_full_name_label}</label>
                <input {...register('name', { required: t.patient_name_required })} type="text" placeholder={t.patient_ph_name} className="input-field" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="label-text">{t.patient_age_label}</label>
                <input {...register('age', { required: t.patient_age_required, min: { value: 0, message: t.patient_age_invalid }, max: { value: 120, message: t.patient_age_invalid } })} type="number" placeholder="35" className="input-field" />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
              </div>
              <div>
                <label className="label-text">{t.patient_gender_label}</label>
                <select {...register('gender', { required: t.patient_gender_required })} className="input-field">
                  <option value="">{t.patient_select_gender}</option>
                  <option value="Male">{t.gender_male}</option>
                  <option value="Female">{t.gender_female}</option>
                  <option value="Other">{t.gender_other}</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
              <div>
                <label className="label-text">{t.patient_phone_label}</label>
                <input {...register('phone', { required: t.patient_phone_required })} type="tel" placeholder="+91 98765 43210" className="input-field" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="label-text">{t.patient_email_label}</label>
                <input {...register('email', { pattern: { value: /^\S+@\S+\.\S+$/, message: t.patient_email_invalid } })} type="email" placeholder="patient@email.com" className="input-field" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="label-text">{t.patient_city_label}</label>
                <input {...register('city')} type="text" placeholder={t.patient_ph_city} className="input-field" />
              </div>
              <div>
                <label className="label-text">{t.patient_blood_label}</label>
                <select {...register('bloodGroup')} className="input-field">
                  <option value="">{t.patient_select_blood}</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                    <option key={`bg-${bg}`} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label-text">{t.patient_diagnosis_tags_label}</label>
              <p className="text-xs text-muted-foreground mb-1.5">{t.patient_diagnosis_tags_hint}</p>
              <input {...register('diagnosisTags')} type="text" placeholder={t.patient_ph_diagnosis} className="input-field" />
            </div>

            <div>
              <label className="label-text">{t.patient_allergies_label}</label>
              <p className="text-xs text-muted-foreground mb-1.5">{t.patient_allergies_hint}</p>
              <input {...register('allergies')} type="text" placeholder={t.patient_ph_allergies} className="input-field" />
            </div>

            <div>
              <label className="label-text">{t.patient_notes_label}</label>
              <textarea {...register('notes')} rows={3} placeholder={t.patient_notes_ph} className="input-field resize-none" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t bg-muted/10">
            <button type="button" onClick={onClose} className="btn-outline text-sm px-5 py-2.5">
              {t.admin_cancel}
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-5 py-2.5">
              {isSubmitting ? (
                <>
                  <Icon name="ArrowPathIcon" size={15} className="animate-spin" />
                  {t.admin_saving}
                </>
              ) : (
                <>
                  <Icon name="UserPlusIcon" size={15} />
                  {t.patient_add_btn}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}