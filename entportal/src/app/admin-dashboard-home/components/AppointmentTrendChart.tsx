'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

const Chart = dynamic(() => import('./AppointmentTrendChartClient'), { ssr: false });

export default function AppointmentTrendChart() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);
  return <Chart chartTitle={t?.admin_chart_title} chartSubtitle={t?.admin_chart_subtitle} />;
}
