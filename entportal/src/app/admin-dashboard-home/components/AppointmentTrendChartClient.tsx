'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const TREND_DATA = [
  { week: 'Mar W1', appointments: 22, newPatients: 6 },
  { week: 'Mar W2', appointments: 31, newPatients: 9 },
  { week: 'Mar W3', appointments: 28, newPatients: 7 },
  { week: 'Mar W4', appointments: 35, newPatients: 11 },
  { week: 'Apr W1', appointments: 29, newPatients: 8 },
  { week: 'Apr W2', appointments: 38, newPatients: 12 },
  { week: 'Apr W3', appointments: 33, newPatients: 10 },
  { week: 'Apr W4', appointments: 41, newPatients: 14 },
  { week: 'May W1', appointments: 36, newPatients: 9 },
  { week: 'May W2', appointments: 44, newPatients: 13 },
  { week: 'May W3', appointments: 38, newPatients: 11 },
  { week: 'May W4', appointments: 47, newPatients: 15 },
];

const SERVICE_DATA = [
  { service: 'Ear', count: 38 },
  { service: 'Sinus', count: 29 },
  { service: 'Throat', count: 24 },
  { service: 'Pediatric', count: 18 },
  { service: 'Allergy', count: 21 },
  { service: 'Hearing', count: 13 },
];

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border rounded-xl px-4 py-3 card-shadow-md">
      <p className="text-xs font-bold text-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <div key={`tp-${p.name}`} className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

interface AppointmentTrendChartClientProps {
  chartTitle?: string;
  chartSubtitle?: string;
}

export default function AppointmentTrendChartClient({
  chartTitle = 'Appointment Trends',
  chartSubtitle = 'Weekly volume — last 12 weeks',
}: AppointmentTrendChartClientProps) {
  return (
    <div className="bg-white rounded-2xl border card-shadow p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-base font-bold text-foreground">{chartTitle}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{chartSubtitle}</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <span className="w-3 h-3 rounded-sm" style={{ background: 'var(--primary)' }} />
            Appointments
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <span className="w-3 h-3 rounded-sm" style={{ background: 'var(--secondary)' }} />
            New Patients
          </span>
        </div>
      </div>

      <div className="mb-8">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="colorAppt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="appointments"
              name="Appointments"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#colorAppt)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="newPatients"
              name="New Patients"
              stroke="var(--secondary)"
              strokeWidth={2}
              fill="url(#colorNew)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t pt-5">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
          Appointments by Service Type (May)
        </p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={SERVICE_DATA} margin={{ top: 0, right: 4, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="service"
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
