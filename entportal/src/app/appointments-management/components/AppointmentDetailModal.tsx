'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Appointment, AppointmentStatus } from './AppointmentsManager';

interface Props {
  appointment: Appointment;
  onClose: () => void;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
}

export default function AppointmentDetailModal({ appointment: appt, onClose, onUpdateStatus }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-lg card-shadow-lg animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold text-foreground">Appointment Details</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <Icon name="XMarkIcon" size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Patient */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">
                {appt.patientName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-bold text-foreground text-base">{appt.patientName}</p>
              <p className="text-sm text-muted-foreground">{appt.phone}</p>
              <p className="text-sm text-muted-foreground">{appt.email}</p>
            </div>
            {appt.isNew && (
              <span className="ml-auto px-2.5 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent">NEW PATIENT</span>
            )}
          </div>

          {/* Appointment Info */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'di-date', icon: 'CalendarDaysIcon', label: 'Date', value: appt.date },
              { id: 'di-time', icon: 'ClockIcon', label: 'Time', value: appt.time },
              { id: 'di-duration', icon: 'ArrowPathIcon', label: 'Duration', value: appt.duration },
              { id: 'di-service', icon: 'BeakerIcon', label: 'Service', value: appt.serviceType },
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-xl">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-muted/20 rounded-xl">
            <p className="text-xs text-muted-foreground font-medium mb-1">Reason for Visit</p>
            <p className="text-sm font-semibold text-foreground">{appt.reason}</p>
          </div>

          {appt.notes && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs font-bold text-amber-700 mb-1">Clinical Notes</p>
              <p className="text-sm text-amber-800">{appt.notes}</p>
            </div>
          )}

          {/* Status Change */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {(['pending', 'confirmed', 'completed', 'cancelled'] as AppointmentStatus[]).map((s) => (
                <button
                  key={`modal-status-${s}`}
                  onClick={() => onUpdateStatus(appt.id, s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    appt.status === s
                      ? 'gradient-primary text-white border-transparent' :'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-muted/10">
          <button onClick={onClose} className="btn-outline text-sm px-5 py-2.5">
            Close
          </button>
          <button className="btn-primary text-sm px-5 py-2.5">
            <Icon name="PencilSquareIcon" size={15} />
            Edit Appointment
          </button>
        </div>
      </div>
    </div>
  );
}