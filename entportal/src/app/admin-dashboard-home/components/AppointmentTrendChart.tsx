'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

const Chart = dynamic(() => import('./AppointmentTrendChartClient'), { ssr: false });

export default function AppointmentTrendChart() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  return (
    <Chart
      language={language}
      chartTitle={t.admin_chart_title}
      chartSubtitle={t.admin_chart_subtitle_weekly}
      legendAppointments={t.admin_chart_legend_appointments}
      legendNewPatients={t.admin_chart_legend_new_patients}
      serviceChartTitle={t.admin_chart_by_service_title}
      countLabel={t.admin_chart_count}
    />
  );
}