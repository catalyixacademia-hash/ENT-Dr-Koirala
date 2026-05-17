'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function DashboardKPIGrid() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);

  const KPI_CARDS = [
    {
      id: 'kpi-today',
      label: t.kpi_today_appts,
      value: '8',
      change: t.kpi_change_vs_yesterday,
      changeType: 'positive',
      icon: 'CalendarDaysIcon',
      bgClass: 'bg-white',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      id: 'kpi-pending',
      label: t.kpi_pending,
      value: '4',
      change: t.kpi_action_required,
      changeType: 'alert',
      icon: 'ClockIcon',
      bgClass: 'bg-amber-50 border-amber-200',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 'kpi-patients',
      label: t.kpi_total_patients,
      value: '1,284',
      change: t.kpi_this_week,
      changeType: 'positive',
      icon: 'UserGroupIcon',
      bgClass: 'bg-white',
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent',
    },
    {
      id: 'kpi-monthly',
      label: t.kpi_monthly_bookings,
      value: '143',
      change: t.kpi_vs_last_month_pos,
      changeType: 'positive',
      icon: 'ChartBarIcon',
      bgClass: 'bg-white',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
    },
    {
      id: 'kpi-completion',
      label: t.kpi_completion,
      value: '91.4%',
      change: t.kpi_vs_last_month_neg,
      changeType: 'negative',
      icon: 'CheckCircleIcon',
      bgClass: 'bg-white',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'kpi-new-patients',
      label: t.kpi_new_patients,
      value: '38',
      change: t.kpi_vs_april,
      changeType: 'positive',
      icon: 'UserPlusIcon',
      bgClass: 'bg-white',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      {KPI_CARDS.map((card) => (
        <div
          key={card.id}
          className={`${card.bgClass} rounded-2xl p-4 sm:p-5 border card-shadow hover:card-shadow-md transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}
            >
              <Icon
                name={card.icon as Parameters<typeof Icon>[0]['name']}
                size={18}
                className={card.iconColor}
              />
            </div>
            {card.changeType === 'alert' && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-foreground font-tabular mb-1">
            {card.value}
          </p>
          <p className="text-xs font-semibold text-muted-foreground mb-2 leading-snug">
            {card.label}
          </p>
          <p
            className={`text-xs font-semibold flex items-center gap-1 ${
              card.changeType === 'positive'
                ? 'text-secondary'
                : card.changeType === 'negative'
                  ? 'text-red-500'
                  : 'text-amber-600'
            }`}
          >
            {card.changeType === 'positive' && <Icon name="ArrowTrendingUpIcon" size={12} />}
            {card.changeType === 'negative' && <Icon name="ArrowTrendingDownIcon" size={12} />}
            {card.changeType === 'alert' && <Icon name="ExclamationTriangleIcon" size={12} />}
            <span className="truncate">{card.change}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
