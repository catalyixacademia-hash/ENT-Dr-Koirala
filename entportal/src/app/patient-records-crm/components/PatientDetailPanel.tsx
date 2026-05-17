'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Patient } from './PatientCRM';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

interface Props {
  patient: Patient;
  onClose: () => void;
}

const TAB_KEYS = [
  { id: 'tab-overview', labelKey: 'patient_tab_overview' as const },
  { id: 'tab-history', labelKey: 'patient_tab_history' as const },
  { id: 'tab-notes', labelKey: 'patient_tab_notes' as const },
];

const VISIT_HISTORY = [
  { id: 'vh-1', date: '2026-05-17', reason: 'Sinusitis Follow-up', diagnosis: 'Post-FESS monitoring', doctor: 'Dr. Krishna Koirala' },
  { id: 'vh-2', date: '2026-03-12', reason: 'Nasal Polyp Review', diagnosis: 'Polyp recurrence — small', doctor: 'Dr. Krishna Koirala' },
  { id: 'vh-3', date: '2025-12-08', reason: 'FESS Surgery', diagnosis: 'Functional endoscopic sinus surgery performed', doctor: 'Dr. Krishna Koirala' },
  { id: 'vh-4', date: '2025-11-20', reason: 'Pre-op Evaluation', diagnosis: 'Cleared for FESS', doctor: 'Dr. Krishna Koirala' },
  { id: 'vh-5', date: '2025-09-15', reason: 'Chronic Sinusitis', diagnosis: 'CT scan ordered', doctor: 'Dr. Krishna Koirala' },
];

export default function PatientDetailPanel({ patient, onClose }: Props) {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const [activeTab, setActiveTab] = useState('tab-overview');

  const translateGender = (gender: string) => {
    if (gender === 'Male') return t.gender_male;
    if (gender === 'Female') return t.gender_female;
    if (gender === 'Other') return t.gender_other;
    return gender;
  };

  const translateStatus = (status: string) =>
    status === 'active' ? t.admin_active : status === 'inactive' ? t.admin_inactive : status;

  return (
    <div className="bg-white rounded-2xl border card-shadow animate-slide-in-right h-fit sticky top-6">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">
              {patient.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-bold text-foreground">{patient.name}</p>
            <p className="text-xs text-muted-foreground">{patient.id} · {patient.age} {t.admin_age_yrs}, {translateGender(patient.gender)}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <Icon name="XMarkIcon" size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/20 border-b">
        <span className={`status-badge ${patient.status === 'active' ? 'status-confirmed' : 'status-cancelled'}`}>
          {translateStatus(patient.status)}
        </span>
        <span className="text-xs text-muted-foreground">{patient.visitCount} {t.patient_total_visits}</span>
        <span className="ml-auto text-xs text-muted-foreground">{t.patient_registered_since} {patient.registeredOn}</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b px-5">
        {TAB_KEYS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t[tab.labelKey]}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-4 overflow-y-auto scrollbar-thin" style={{ maxHeight: '520px' }}>
        {activeTab === 'tab-overview' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'pdi-phone', icon: 'PhoneIcon', label: t.patient_phone, value: patient.phone },
                { id: 'pdi-blood', icon: 'BeakerIcon', label: t.patient_blood_group, value: patient.bloodGroup },
                { id: 'pdi-city', icon: 'MapPinIcon', label: t.patient_city_label_short, value: patient.city },
                { id: 'pdi-last', icon: 'CalendarDaysIcon', label: t.patient_last_visit_label, value: patient.lastVisit },
              ].map((item) => (
                <div key={item.id} className="p-3 bg-muted/20 rounded-xl">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={12} className="text-primary" />
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                  <p className="text-xs font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{t.patient_diagnoses}</p>
              <div className="flex flex-wrap gap-1.5">
                {patient.diagnosisTags.map((tag) => (
                  <span key={`detail-diag-${tag}`} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {patient.allergies.length > 0 && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{t.patient_allergies}</p>
                <div className="flex flex-wrap gap-1.5">
                  {patient.allergies.map((allergy) => (
                    <span key={`detail-allergy-${allergy}`} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                      <Icon name="ExclamationTriangleIcon" size={10} className="inline mr-1" />
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {patient.nextAppointment && (
              <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-xl flex items-center gap-3">
                <Icon name="CalendarDaysIcon" size={16} className="text-secondary flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-secondary">{t.patient_next_appointment}</p>
                  <p className="text-xs font-semibold text-foreground">{patient.nextAppointment}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button className="flex-1 btn-primary text-xs py-2.5">
                <Icon name="CalendarPlusIcon" size={14} />
                {t.patient_book_appointment}
              </button>
              <button className="flex-1 btn-outline text-xs py-2.5">
                <Icon name="PencilSquareIcon" size={14} />
                {t.patient_edit_record}
              </button>
            </div>
          </>
        )}

        {activeTab === 'tab-history' && (
          <div className="space-y-3">
            {VISIT_HISTORY.map((visit) => (
              <div key={visit.id} className="p-3 bg-muted/20 rounded-xl border">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-foreground font-tabular">{visit.date}</p>
                  <span className="text-xs text-muted-foreground">{visit.doctor}</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{visit.reason}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{visit.diagnosis}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tab-notes' && (
          <div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
              <p className="text-xs font-bold text-amber-700 mb-2">{t.patient_clinical_notes}</p>
              <p className="text-sm text-amber-900 leading-relaxed">{patient.notes || t.patient_no_notes}</p>
            </div>
            <textarea
              placeholder={t.patient_note_placeholder}
              rows={4}
              className="input-field resize-none text-sm"
            />
            <button className="btn-primary text-sm mt-3 w-full py-2.5">
              <Icon name="DocumentPlusIcon" size={15} />
              {t.patient_save_note}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}