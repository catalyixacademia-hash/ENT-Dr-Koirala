'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';
import type { Patient } from './PatientCRM';

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
          <h2 className="text-lg font-bold text-foreground">Add New Patient</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <Icon name="XMarkIcon" size={18} className="text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="label-text">Full Name *</label>
                <input {...register('name', { required: 'Name is required' })} type="text" placeholder="Rajesh Kumar" className="input-field" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="label-text">Age *</label>
                <input {...register('age', { required: 'Age is required', min: { value: 0, message: 'Invalid age' }, max: { value: 120, message: 'Invalid age' } })} type="number" placeholder="35" className="input-field" />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
              </div>
              <div>
                <label className="label-text">Gender *</label>
                <select {...register('gender', { required: 'Gender is required' })} className="input-field">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
              <div>
                <label className="label-text">Phone Number *</label>
                <input {...register('phone', { required: 'Phone is required' })} type="tel" placeholder="+91 98765 43210" className="input-field" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="label-text">Email Address</label>
                <input {...register('email', { pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} type="email" placeholder="patient@email.com" className="input-field" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="label-text">City</label>
                <input {...register('city')} type="text" placeholder="Pokhara" className="input-field" />
              </div>
              <div>
                <label className="label-text">Blood Group</label>
                <select {...register('bloodGroup')} className="input-field">
                  <option value="">Select blood group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                    <option key={`bg-${bg}`} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label-text">Diagnosis Tags</label>
              <p className="text-xs text-muted-foreground mb-1.5">Separate multiple diagnoses with commas</p>
              <input {...register('diagnosisTags')} type="text" placeholder="Sinusitis, Nasal Polyps, Tinnitus" className="input-field" />
            </div>

            <div>
              <label className="label-text">Known Allergies</label>
              <p className="text-xs text-muted-foreground mb-1.5">Separate multiple allergies with commas</p>
              <input {...register('allergies')} type="text" placeholder="Penicillin, Dust Mites, Pollen" className="input-field" />
            </div>

            <div>
              <label className="label-text">Clinical Notes</label>
              <textarea {...register('notes')} rows={3} placeholder="Initial assessment notes, symptoms, referral source..." className="input-field resize-none" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t bg-muted/10">
            <button type="button" onClick={onClose} className="btn-outline text-sm px-5 py-2.5">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-5 py-2.5">
              {isSubmitting ? (
                <>
                  <Icon name="ArrowPathIcon" size={15} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Icon name="UserPlusIcon" size={15} />
                  Add Patient
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}