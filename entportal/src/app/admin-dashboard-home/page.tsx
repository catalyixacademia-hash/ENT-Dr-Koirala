'use client';
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import DashboardKPIGrid from './components/DashboardKPIGrid';
import AppointmentTrendChart from './components/AppointmentTrendChart';
import TodaySchedule from './components/TodaySchedule';
import RecentActivity from './components/RecentActivity';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

function DashboardContent() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t?.admin_good_morning}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t?.admin_dashboard_subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            {t?.admin_live_data}
          </span>
        </div>
      </div>
      <DashboardKPIGrid />
      <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6">
        <div className="min-w-0">
          <AppointmentTrendChart />
        </div>
        <div className="min-w-0">
          <TodaySchedule />
        </div>
      </div>
      <RecentActivity />
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminLayout currentPath="/admin-dashboard-home">
      <DashboardContent />
    </AdminLayout>
  );
}
