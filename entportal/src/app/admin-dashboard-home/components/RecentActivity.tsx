'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function RecentActivity() {
  const { language } = useAdminLanguage();
  const t = getTranslations(language);

  const ACTIVITIES = [
    {
      id: 'act-1',
      icon: 'CalendarPlusIcon',
      color: 'text-primary bg-primary/10',
      text: t.act_1,
      sub: t.act_1_sub,
      time: t.act_ago_4m,
    },
    {
      id: 'act-2',
      icon: 'CheckCircleIcon',
      color: 'text-secondary bg-secondary/10',
      text: t.act_2,
      sub: t.act_2_sub,
      time: t.act_ago_22m,
    },
    {
      id: 'act-3',
      icon: 'UserPlusIcon',
      color: 'text-accent bg-accent/10',
      text: t.act_3,
      sub: t.act_3_sub,
      time: t.act_ago_1h,
    },
    {
      id: 'act-4',
      icon: 'XCircleIcon',
      color: 'text-red-500 bg-red-50',
      text: t.act_4,
      sub: t.act_4_sub,
      time: t.act_ago_2h,
    },
    {
      id: 'act-5',
      icon: 'DocumentTextIcon',
      color: 'text-blue-500 bg-blue-50',
      text: t.act_5,
      sub: t.act_5_sub,
      time: t.act_ago_3h,
    },
    {
      id: 'act-6',
      icon: 'StarIcon',
      color: 'text-yellow-500 bg-yellow-50',
      text: t.act_6,
      sub: t.act_6_sub,
      time: t.act_ago_5h,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border card-shadow p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-foreground">{t.admin_recent_activity}</h3>
        <span className="text-xs text-muted-foreground">{t.admin_last_24h}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {ACTIVITIES.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${act.color}`}
            >
              <Icon name={act.icon as Parameters<typeof Icon>[0]['name']} size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground leading-snug">{act.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{act.sub}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
