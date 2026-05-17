'use client';
import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppointmentTable from './AppointmentTable';
import AppointmentFilters from './AppointmentFilters';
import AppointmentDetailModal from './AppointmentDetailModal';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  reason: string;
  serviceType: string;
  status: AppointmentStatus;
  notes: string;
  isNew: boolean;
  duration: string;
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-001',
    patientName: 'Priya Sharma',
    phone: '+977 98560 11001',
    email: 'priya.sharma@gmail.com',
    date: '2026-05-17',
    time: '9:00 AM',
    reason: 'Sinusitis Follow-up',
    serviceType: 'Nose & Sinus',
    status: 'confirmed',
    notes: 'Post-FESS review, check polyp recurrence',
    isNew: false,
    duration: '20 min',
  },
  {
    id: 'appt-002',
    patientName: 'Rohan Das',
    phone: '+977 98460 22002',
    email: 'rohan.das@outlook.com',
    date: '2026-05-17',
    time: '9:30 AM',
    reason: 'Ear Infection',
    serviceType: 'Ear Disorders',
    status: 'confirmed',
    notes: 'Recurrent otitis media, 3rd episode',
    isNew: false,
    duration: '30 min',
  },
  {
    id: 'appt-003',
    patientName: 'Neha Joshi',
    phone: '+977 98060 33003',
    email: 'neha.joshi@gmail.com',
    date: '2026-05-17',
    time: '10:00 AM',
    reason: 'Tonsil Assessment',
    serviceType: 'Throat & Voice',
    status: 'pending',
    notes: '',
    isNew: true,
    duration: '20 min',
  },
  {
    id: 'appt-004',
    patientName: 'Amir Khan',
    phone: '+977 98560 44004',
    email: 'amir.khan@yahoo.com',
    date: '2026-05-17',
    time: '10:30 AM',
    reason: 'Hearing Loss Evaluation',
    serviceType: 'Hearing Solutions',
    status: 'confirmed',
    notes: 'Bilateral sensorineural hearing loss suspected',
    isNew: false,
    duration: '45 min',
  },
  {
    id: 'appt-005',
    patientName: 'Sunita Patel',
    phone: '+977 98460 55005',
    email: 'sunita.patel@gmail.com',
    date: '2026-05-18',
    time: '9:00 AM',
    reason: 'Allergy Testing',
    serviceType: 'Allergy & Immunology',
    status: 'pending',
    notes: 'Seasonal rhinitis, first visit',
    isNew: true,
    duration: '30 min',
  },
  {
    id: 'appt-006',
    patientName: 'Vikram Singh',
    phone: '+977 98060 66006',
    email: 'vikram.singh@gmail.com',
    date: '2026-05-18',
    time: '10:00 AM',
    reason: 'Post-Surgery Review',
    serviceType: 'Ear Disorders',
    status: 'pending',
    notes: 'Tympanoplasty 2 weeks ago',
    isNew: false,
    duration: '20 min',
  },
  {
    id: 'appt-007',
    patientName: 'Deepa Nair',
    phone: '+977 98560 77007',
    email: 'deepa.nair@gmail.com',
    date: '2026-05-18',
    time: '11:00 AM',
    reason: 'Nasal Polyp Consult',
    serviceType: 'Nose & Sinus',
    status: 'confirmed',
    notes: 'Recurrent polyps, discuss surgical options',
    isNew: false,
    duration: '30 min',
  },
  {
    id: 'appt-008',
    patientName: 'Arjun Thapa',
    phone: '+977 98460 88008',
    email: 'arjun.thapa@outlook.com',
    date: '2026-05-19',
    time: '9:30 AM',
    reason: 'Pediatric ENT',
    serviceType: 'Pediatric ENT',
    status: 'confirmed',
    notes: 'Child 6yr, recurrent ear infections',
    isNew: false,
    duration: '25 min',
  },
  {
    id: 'appt-009',
    patientName: 'Kavita Gurung',
    phone: '+977 98060 99009',
    email: 'kavita.gurung@gmail.com',
    date: '2026-05-19',
    time: '10:00 AM',
    reason: 'Sinusitis Consultation',
    serviceType: 'Nose & Sinus',
    status: 'pending',
    notes: '',
    isNew: true,
    duration: '20 min',
  },
  {
    id: 'appt-010',
    patientName: 'Farhan Sheikh',
    phone: '+977 98560 10010',
    email: 'farhan.sheikh@gmail.com',
    date: '2026-05-20',
    time: '11:00 AM',
    reason: 'Hearing Aid Evaluation',
    serviceType: 'Hearing Solutions',
    status: 'cancelled',
    notes: 'Patient called to cancel — rescheduling',
    isNew: false,
    duration: '45 min',
  },
  {
    id: 'appt-011',
    patientName: 'Sanjay Adhikari',
    phone: '+977 98460 11011',
    email: 'sanjay.adhikari@gmail.com',
    date: '2026-05-20',
    time: '2:00 PM',
    reason: 'Voice Hoarseness',
    serviceType: 'Throat & Voice',
    status: 'completed',
    notes: 'Vocal cord nodules diagnosed, referred speech therapy',
    isNew: false,
    duration: '30 min',
  },
  {
    id: 'appt-012',
    patientName: 'Meera Rana',
    phone: '+977 98060 12012',
    email: 'meera.rana@gmail.com',
    date: '2026-05-21',
    time: '10:30 AM',
    reason: 'Allergic Rhinitis',
    serviceType: 'Allergy & Immunology',
    status: 'confirmed',
    notes: 'Immunotherapy month 3 check-in',
    isNew: false,
    duration: '20 min',
  },
];

export interface FilterState {
  search: string;
  status: string;
  serviceType: string;
  dateFrom: string;
  dateTo: string;
}

export default function AppointmentsManager() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    serviceType: '',
    dateFrom: '',
    dateTo: '',
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const { language } = useAdminLanguage();
  const t = getTranslations(language);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchSearch =
        !filters.search ||
        a.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        a.phone.includes(filters.search) ||
        a.reason.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = !filters.status || a.status === filters.status;
      const matchService = !filters.serviceType || a.serviceType === filters.serviceType;
      const matchFrom = !filters.dateFrom || a.date >= filters.dateFrom;
      const matchTo = !filters.dateTo || a.date <= filters.dateTo;
      return matchSearch && matchStatus && matchService && matchFrom && matchTo;
    });
  }, [appointments, filters]);

  const updateStatus = (id: string, status: AppointmentStatus) => {
    // BACKEND INTEGRATION: PATCH /api/appointments/:id { status }
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const bulkDelete = () => {
    setAppointments((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.admin_appointments_title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} {t.admin_appointments_found}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-xl p-1">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === 'list' ? 'bg-white card-shadow text-foreground' : 'text-muted-foreground'}`}
            >
              <Icon name="ListBulletIcon" size={14} className="inline mr-1" />
              {t.admin_view_list}
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === 'calendar' ? 'bg-white card-shadow text-foreground' : 'text-muted-foreground'}`}
            >
              <Icon name="CalendarDaysIcon" size={14} className="inline mr-1" />
              {t.admin_view_calendar}
            </button>
          </div>
          <button className="btn-outline text-sm px-4 py-2">
            <Icon name="ArrowDownTrayIcon" size={16} />
            {t.admin_export_csv}
          </button>
          <button className="btn-primary text-sm px-4 py-2">
            <Icon name="PlusIcon" size={16} />
            {t.admin_new_appointment}
          </button>
        </div>
      </div>

      <AppointmentFilters filters={filters} onChange={setFilters} />

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 flex items-center gap-4 animate-slide-up">
          <span className="text-sm font-semibold text-primary">
            {selectedIds.length} {t.admin_selected}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                selectedIds.forEach((id) => updateStatus(id, 'confirmed'));
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
            >
              {t.admin_confirm_all}
            </button>
            <button
              onClick={bulkDelete}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              {t.admin_delete_selected}
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t.admin_clear}
            </button>
          </div>
        </div>
      )}

      {view === 'list' ? (
        <AppointmentTable
          appointments={filtered}
          selectedIds={selectedIds}
          onSelectIds={setSelectedIds}
          onUpdateStatus={updateStatus}
          onViewDetail={setSelectedAppt}
        />
      ) : (
        <CalendarView appointments={filtered} onViewDetail={setSelectedAppt} />
      )}

      {selectedAppt && (
        <AppointmentDetailModal
          appointment={selectedAppt}
          onClose={() => setSelectedAppt(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </div>
  );
}

function CalendarView({
  appointments,
  onViewDetail,
}: {
  appointments: Appointment[];
  onViewDetail: (a: Appointment) => void;
}) {
  const days = [
    '2026-05-17',
    '2026-05-18',
    '2026-05-19',
    '2026-05-20',
    '2026-05-21',
    '2026-05-22',
    '2026-05-23',
  ];
  const dayLabels = [
    'Sun May 17',
    'Mon May 18',
    'Tue May 19',
    'Wed May 20',
    'Thu May 21',
    'Fri May 22',
    'Sat May 23',
  ];

  return (
    <div className="bg-white rounded-2xl border card-shadow overflow-hidden">
      <div className="grid grid-cols-7 border-b">
        {dayLabels.map((label, i) => (
          <div key={`day-header-${i}`} className="p-3 text-center border-r last:border-r-0">
            <p className="text-xs font-bold text-foreground">{label.split(' ')[0]}</p>
            <p className="text-xs text-muted-foreground">{label.split(' ').slice(1).join(' ')}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x min-h-64">
        {days.map((day, di) => {
          const dayAppts = appointments.filter((a) => a.date === day);
          return (
            <div key={`cal-day-${di}`} className="p-2 space-y-1.5 min-h-32">
              {dayAppts.map((appt) => (
                <button
                  key={appt.id}
                  onClick={() => onViewDetail(appt)}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-all hover:opacity-80 ${
                    appt.status === 'confirmed'
                      ? 'bg-secondary/10 border border-secondary/20'
                      : appt.status === 'pending'
                        ? 'bg-amber-50 border border-amber-200'
                        : appt.status === 'completed'
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className="font-bold text-foreground truncate">{appt.time}</p>
                  <p className="text-muted-foreground truncate">{appt.patientName}</p>
                </button>
              ))}
              {dayAppts.length === 0 && (
                <p className="text-xs text-muted-foreground/50 text-center pt-4">—</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
