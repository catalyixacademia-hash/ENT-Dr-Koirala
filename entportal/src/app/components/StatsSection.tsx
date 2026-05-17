import React from 'react';
import Icon from '@/components/ui/AppIcon';

const STATS = [
  { id: 'stat-exp', value: '20+', label: 'Years of Practice', icon: 'ClockIcon', color: 'text-primary' },
  { id: 'stat-patients', value: '10,000+', label: 'Patients Treated', icon: 'UserGroupIcon', color: 'text-accent' },
  { id: 'stat-surgeries', value: '2,000+', label: 'Surgeries Performed', icon: 'ScissorsIcon', color: 'text-secondary' },
  { id: 'stat-rating', value: '4.9/5', label: 'Patient Rating', icon: 'StarIcon', color: 'text-yellow-500' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-b" id="experience">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.id} className="text-center group">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={22} className={stat.color} />
              </div>
              <p className={`text-3xl lg:text-4xl font-extrabold font-tabular ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}