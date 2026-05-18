'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { FilterState } from './AppointmentsManager';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';
import { statusLabel, serviceLabel } from '@/lib/i18n-helpers';

const SERVICE_TYPES = [
  'Ear Disorders', 'Nose & Sinus', 'Throat & Voice',
  'Pediatric ENT', 'Allergy & Immunology', 'Hearing Solutions',
];

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

export default function AppointmentFilters({ filters, onChange }: Props) {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  const update = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  const hasActive = Object.values(filters).some((v) => v !== '');

  return (
    <div className="bg-white rounded-2xl border card-shadow p-4">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.admin_appointment_search_placeholder}
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => update('status', e.target.value)}
          className="input-field w-auto py-2.5 text-sm"
        >
          <option value="">{t.admin_filter_all_statuses}</option>
          {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
            <option key={s} value={s}>{statusLabel(language, s)}</option>
          ))}
        </select>

        {/* Service Type */}
        <select
          value={filters.serviceType}
          onChange={(e) => update('serviceType', e.target.value)}
          className="input-field w-auto py-2.5 text-sm"
        >
          <option value="">{t.admin_filter_all_services}</option>
          {SERVICE_TYPES.map((s) => (
            <option key={`svc-opt-${s}`} value={s}>{serviceLabel(language, s)}</option>
          ))}
        </select>

        {/* Date From */}
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => update('dateFrom', e.target.value)}
          className="input-field w-auto py-2.5 text-sm"
        />

        {/* Date To */}
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => update('dateTo', e.target.value)}
          className="input-field w-auto py-2.5 text-sm"
        />

        {hasActive && (
          <button
            onClick={() => onChange({ search: '', status: '', serviceType: '', dateFrom: '', dateTo: '' })}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors border border-red-200"
          >
            <Icon name="XMarkIcon" size={14} />
            {t.admin_clear_filters}
          </button>
        )}
      </div>
    </div>
  );
}