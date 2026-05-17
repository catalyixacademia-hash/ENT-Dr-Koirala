'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Appointment, AppointmentStatus } from './AppointmentsManager';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

interface Props {
  appointments: Appointment[];
  selectedIds: string[];
  onSelectIds: (ids: string[]) => void;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onViewDetail: (a: Appointment) => void;
}

const STATUS_OPTIONS: AppointmentStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusBadgeClass = (status: AppointmentStatus) => {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'confirmed': return 'status-confirmed';
    case 'completed': return 'status-completed';
    case 'cancelled': return 'status-cancelled';
  }
};

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

export default function AppointmentTable({ appointments, selectedIds, onSelectIds, onUpdateStatus, onViewDetail }: Props) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<keyof Appointment>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null);
  const { language } = useAdminLanguage();
  const t = getTranslations(language);

  const sorted = [...appointments].sort((a, b) => {
    const av = a[sortKey] as string;
    const bv = b[sortKey] as string;
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (key: keyof Appointment) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const toggleAll = () => {
    if (selectedIds.length === paginated.length) onSelectIds([]);
    else onSelectIds(paginated.map((a) => a.id));
  };

  const toggleOne = (id: string) => {
    onSelectIds(selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]);
  };

  const SortIcon = ({ col }: { col: keyof Appointment }) => (
    <span className="ml-1 inline-flex flex-col">
      <Icon
        name="ChevronUpIcon"
        size={10}
        className={sortKey === col && sortDir === 'asc' ? 'text-primary' : 'text-muted-foreground/40'}
      />
      <Icon
        name="ChevronDownIcon"
        size={10}
        className={sortKey === col && sortDir === 'desc' ? 'text-primary' : 'text-muted-foreground/40'}
      />
    </span>
  );

  return (
    <div className="bg-white rounded-2xl border card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
              </th>
              {[
                { key: 'patientName' as keyof Appointment, label: t.admin_col_patient },
                { key: 'date' as keyof Appointment, label: t.admin_col_date },
                { key: 'time' as keyof Appointment, label: t.admin_col_time },
                { key: 'serviceType' as keyof Appointment, label: t.admin_col_service },
                { key: 'reason' as keyof Appointment, label: t.admin_col_reason },
                { key: 'duration' as keyof Appointment, label: t.admin_col_duration },
                { key: 'status' as keyof Appointment, label: t.admin_col_status },
              ].map((col) => (
                <th
                  key={`th-${col.key}`}
                  className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.label}
                  <SortIcon col={col.key} />
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t.admin_col_actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                      <Icon name="CalendarDaysIcon" size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{t.admin_no_appointments}</p>
                    <p className="text-xs text-muted-foreground">{t.admin_no_appointments_sub}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((appt) => (
                <tr
                  key={appt.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(appt.id)}
                      onChange={() => toggleOne(appt.id)}
                      className="w-4 h-4 rounded accent-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">
                          {appt.patientName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground whitespace-nowrap">{appt.patientName}</p>
                        <p className="text-xs text-muted-foreground">{appt.phone}</p>
                      </div>
                      {appt.isNew && (
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-accent/10 text-accent">NEW</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground font-tabular">
                    {appt.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground font-tabular">
                    {appt.time}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground whitespace-nowrap">
                      {appt.serviceType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs">
                    <span className="truncate block max-w-[160px]">{appt.reason}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                    {appt.duration}
                  </td>
                  <td className="px-4 py-3 relative">
                    <div className="relative">
                      <button
                        onClick={() => setStatusDropdown(statusDropdown === appt.id ? null : appt.id)}
                        className={`status-badge ${statusBadgeClass(appt.status)} cursor-pointer hover:opacity-80 transition-opacity`}
                      >
                        {appt.status}
                        <Icon name="ChevronDownIcon" size={10} />
                      </button>
                      {statusDropdown === appt.id && (
                        <div className="absolute top-8 left-0 z-20 bg-white border rounded-xl card-shadow-md w-36 py-1 animate-fade-in">
                          {STATUS_OPTIONS.map((s) => (
                            <button
                              key={`status-opt-${s}`}
                              onClick={() => { onUpdateStatus(appt.id, s); setStatusDropdown(null); }}
                              className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-muted transition-colors ${appt.status === s ? 'text-primary' : 'text-foreground'}`}
                            >
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onViewDetail(appt)}
                        title="View appointment details"
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Icon name="EyeIcon" size={15} className="text-muted-foreground" />
                      </button>
                      <button
                        title="Edit appointment"
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Icon name="PencilSquareIcon" size={15} className="text-muted-foreground" />
                      </button>
                      <button
                        title="Cancel appointment"
                        onClick={() => onUpdateStatus(appt.id, 'cancelled')}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Icon name="XCircleIcon" size={15} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sorted.length > 0 && (
        <div className="border-t px-4 py-3 flex items-center justify-between flex-wrap gap-3 bg-muted/10">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t.admin_rows_per_page}</span>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="text-xs border rounded-lg px-2 py-1 bg-white outline-none"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                <option key={`pp-${n}`} value={n}>{n}</option>
              ))}
            </select>
            <span className="text-xs text-muted-foreground">
              {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} {t.admin_of} {sorted.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <Icon name="ChevronDoubleLeftIcon" size={14} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <Icon name="ChevronLeftIcon" size={14} className="text-muted-foreground" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, idx, arr) => (
                <React.Fragment key={`page-${p}`}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="px-1 text-xs text-muted-foreground">…</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                      page === p ? 'gradient-primary text-white' : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <Icon name="ChevronDoubleRightIcon" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}