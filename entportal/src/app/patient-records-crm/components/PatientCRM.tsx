'use client';
import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import PatientTable from './PatientTable';
import PatientDetailPanel from './PatientDetailPanel';
import AddPatientModal from './AddPatientModal';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  city: string;
  bloodGroup: string;
  lastVisit: string;
  nextAppointment: string | null;
  visitCount: number;
  diagnosisTags: string[];
  allergies: string[];
  notes: string;
  status: 'active' | 'inactive';
  registeredOn: string;
}

export const MOCK_PATIENTS: Patient[] = [
  { id: 'pat-001', name: 'Priya Sharma', age: 34, gender: 'Female', phone: '+977 98560 11001', email: 'priya.sharma@gmail.com', city: 'Pokhara', bloodGroup: 'B+', lastVisit: '2026-05-17', nextAppointment: '2026-06-14', visitCount: 8, diagnosisTags: ['Sinusitis', 'Nasal Polyps'], allergies: ['Dust Mites', 'Pollen'], notes: 'Post-FESS patient. Monitor for polyp recurrence every 3 months.', status: 'active', registeredOn: '2024-03-10' },
  { id: 'pat-002', name: 'Rohan Das', age: 28, gender: 'Male', phone: '+977 98460 22002', email: 'rohan.das@outlook.com', city: 'Baglung', bloodGroup: 'O+', lastVisit: '2026-05-17', nextAppointment: null, visitCount: 3, diagnosisTags: ['Otitis Media'], allergies: [], notes: 'Recurrent ear infections. 3rd episode in 12 months. Consider myringotomy.', status: 'active', registeredOn: '2025-11-05' },
  { id: 'pat-003', name: 'Neha Joshi', age: 22, gender: 'Female', phone: '+977 98060 33003', email: 'neha.joshi@gmail.com', city: 'Gorkha', bloodGroup: 'A+', lastVisit: '2026-05-17', nextAppointment: '2026-05-24', visitCount: 1, diagnosisTags: ['Tonsillitis'], allergies: ['Penicillin'], notes: 'New patient. Chronic tonsillitis. Discuss tonsillectomy candidacy.', status: 'active', registeredOn: '2026-05-17' },
  { id: 'pat-004', name: 'Amir Khan', age: 56, gender: 'Male', phone: '+977 98560 44004', email: 'amir.khan@yahoo.com', city: 'Pokhara', bloodGroup: 'AB+', lastVisit: '2026-05-17', nextAppointment: '2026-06-01', visitCount: 12, diagnosisTags: ['SNHL', 'Tinnitus'], allergies: ['NSAIDs'], notes: 'Bilateral sensorineural hearing loss. Hearing aid fitting in progress. Avoid loud environments.', status: 'active', registeredOn: '2023-08-22' },
  { id: 'pat-005', name: 'Sunita Patel', age: 41, gender: 'Female', phone: '+977 98460 55005', email: 'sunita.patel@gmail.com', city: 'Syangja', bloodGroup: 'O-', lastVisit: '2026-05-10', nextAppointment: '2026-05-18', visitCount: 5, diagnosisTags: ['Allergic Rhinitis'], allergies: ['Cat Dander', 'Mold'], notes: 'Seasonal allergic rhinitis. Immunotherapy started April 2026.', status: 'active', registeredOn: '2025-04-15' },
  { id: 'pat-006', name: 'Vikram Singh', age: 45, gender: 'Male', phone: '+977 98060 66006', email: 'vikram.singh@gmail.com', city: 'Tanahun', bloodGroup: 'B-', lastVisit: '2026-05-03', nextAppointment: '2026-05-18', visitCount: 6, diagnosisTags: ['Tympanic Perforation'], allergies: [], notes: 'Post-tympanoplasty. 2-week follow-up scheduled. No water in ear.', status: 'active', registeredOn: '2025-02-18' },
  { id: 'pat-007', name: 'Deepa Nair', age: 38, gender: 'Female', phone: '+977 98560 77007', email: 'deepa.nair@gmail.com', city: 'Pokhara', bloodGroup: 'A-', lastVisit: '2026-04-28', nextAppointment: '2026-05-18', visitCount: 9, diagnosisTags: ['Nasal Polyps', 'CRS'], allergies: ['Aspirin'], notes: 'Recurrent nasal polyps despite steroid sprays. Surgical intervention being planned.', status: 'active', registeredOn: '2023-12-01' },
  { id: 'pat-008', name: 'Arjun Thapa', age: 6, gender: 'Male', phone: '+977 98460 88008', email: 'arjun.thapa@outlook.com', city: 'Lamjung', bloodGroup: 'O+', lastVisit: '2026-04-15', nextAppointment: '2026-05-19', visitCount: 4, diagnosisTags: ['Otitis Media', 'Adenoid Hypertrophy'], allergies: [], notes: 'Pediatric patient. Parents: Sundar & Kavya Thapa. Ear tubes placed April 2026.', status: 'active', registeredOn: '2025-08-30' },
  { id: 'pat-009', name: 'Kavita Gurung', age: 29, gender: 'Female', phone: '+977 98060 99009', email: 'kavita.gurung@gmail.com', city: 'Kaski', bloodGroup: 'B+', lastVisit: '2026-03-20', nextAppointment: '2026-05-19', visitCount: 2, diagnosisTags: ['Acute Sinusitis'], allergies: [], notes: 'New booking online. First visit for sinusitis.', status: 'active', registeredOn: '2026-03-20' },
  { id: 'pat-010', name: 'Farhan Sheikh', age: 62, gender: 'Male', phone: '+977 98560 10010', email: 'farhan.sheikh@gmail.com', city: 'Butwal', bloodGroup: 'A+', lastVisit: '2026-02-14', nextAppointment: null, visitCount: 7, diagnosisTags: ['Presbycusis', 'Tinnitus'], allergies: ['Gentamicin'], notes: 'Age-related hearing loss. Hearing aid trial ongoing. Avoid ototoxic medications.', status: 'inactive', registeredOn: '2023-05-11' },
  { id: 'pat-011', name: 'Sanjay Adhikari', age: 47, gender: 'Male', phone: '+977 98460 11011', email: 'sanjay.adhikari@gmail.com', city: 'Pokhara', bloodGroup: 'AB-', lastVisit: '2026-05-20', nextAppointment: null, visitCount: 2, diagnosisTags: ['Vocal Cord Nodules'], allergies: [], notes: 'Walk-in patient. Referred to speech therapist. Follow-up in 6 weeks.', status: 'active', registeredOn: '2026-05-20' },
  { id: 'pat-012', name: 'Meera Rana', age: 31, gender: 'Female', phone: '+977 98060 12012', email: 'meera.rana@gmail.com', city: 'Nawalpur', bloodGroup: 'O+', lastVisit: '2026-05-10', nextAppointment: '2026-05-21', visitCount: 11, diagnosisTags: ['Allergic Rhinitis', 'Asthma'], allergies: ['Pollen', 'Dust', 'Cockroach'], notes: 'Immunotherapy month 3. Symptoms improving. Continue current protocol.', status: 'active', registeredOn: '2024-01-08' },
];

export default function PatientCRM() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const { language } = useAdminLanguage();
  const t = getTranslations(language);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search) ||
        p.diagnosisTags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        p.city.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [patients, search, statusFilter]);

  const addPatient = (p: Patient) => {
    // BACKEND INTEGRATION: POST /api/patients with patient data
    setPatients((prev) => [p, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.admin_patient_records}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{patients.length} {t.admin_patients_in_db}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-outline text-sm px-4 py-2">
            <Icon name="ArrowDownTrayIcon" size={16} />
            {t.admin_export}
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary text-sm px-4 py-2">
            <Icon name="UserPlusIcon" size={16} />
            {t.admin_add_patient}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { id: 'ps-total', label: t.admin_total_patients, value: patients.length.toString(), icon: 'UserGroupIcon', color: 'text-primary' },
          { id: 'ps-active', label: t.admin_active_patients, value: patients.filter((p) => p.status === 'active').length.toString(), icon: 'UserCircleIcon', color: 'text-secondary' },
          { id: 'ps-new', label: t.admin_new_this_month, value: '12', icon: 'UserPlusIcon', color: 'text-accent' },
          { id: 'ps-upcoming', label: t.admin_with_upcoming, value: patients.filter((p) => p.nextAppointment).length.toString(), icon: 'CalendarDaysIcon', color: 'text-blue-500' },
        ].map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border card-shadow p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={20} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-foreground font-tabular">{s.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border card-shadow p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.admin_search_patients}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field w-auto py-2.5 text-sm"
        >
          <option value="">{t.admin_all_patients}</option>
          <option value="active">{t.admin_active}</option>
          <option value="inactive">{t.admin_inactive}</option>
        </select>
        {(search || statusFilter) && (
          <button
            onClick={() => { setSearch(''); setStatusFilter(''); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors border border-red-200"
          >
            <Icon name="XMarkIcon" size={14} />
            {t.admin_clear}
          </button>
        )}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} {t.admin_results}</span>
      </div>

      <div className={`flex gap-5 ${selectedPatient ? 'items-start' : ''}`}>
        <div className={selectedPatient ? 'flex-1 min-w-0' : 'w-full'}>
          <PatientTable
            patients={filtered}
            selectedId={selectedPatient?.id ?? null}
            onSelect={setSelectedPatient}
          />
        </div>
        {selectedPatient && (
          <div className="w-80 xl:w-96 flex-shrink-0">
            <PatientDetailPanel
              patient={selectedPatient}
              onClose={() => setSelectedPatient(null)}
            />
          </div>
        )}
      </div>

      {showAddModal && (
        <AddPatientModal onClose={() => setShowAddModal(false)} onAdd={addPatient} />
      )}
    </div>
  );
}