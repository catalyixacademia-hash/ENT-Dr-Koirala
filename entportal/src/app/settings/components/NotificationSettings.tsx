'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NotifToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  channel: 'email' | 'sms' | 'both';
}

const DEFAULT_NOTIFS: NotifToggle[] = [
  {
    id: 'notif-new-booking',
    label: 'New Booking Alert',
    description: 'Get notified instantly when a patient submits a new appointment request',
    enabled: true,
    channel: 'both',
  },
  {
    id: 'notif-confirm',
    label: 'Appointment Confirmed',
    description: 'Receive confirmation when an appointment is confirmed in the system',
    enabled: true,
    channel: 'email',
  },
  {
    id: 'notif-cancel',
    label: 'Appointment Cancelled',
    description: 'Alert when a patient cancels their appointment',
    enabled: true,
    channel: 'both',
  },
  {
    id: 'notif-reminder',
    label: 'Daily Schedule Reminder',
    description: "Morning summary of today's appointments at 8:00 AM",
    enabled: true,
    channel: 'email',
  },
  {
    id: 'notif-patient-new',
    label: 'New Patient Registration',
    description: 'Notification when a new patient record is created',
    enabled: false,
    channel: 'email',
  },
  {
    id: 'notif-review',
    label: 'New Patient Review',
    description: 'Alert when a patient leaves a review on Google or social media',
    enabled: true,
    channel: 'email',
  },
  {
    id: 'notif-weekly',
    label: 'Weekly Analytics Report',
    description: 'Weekly summary of bookings, new patients, and website traffic',
    enabled: true,
    channel: 'email',
  },
];

export default function NotificationSettings() {
  const [notifs, setNotifs] = useState<NotifToggle[]>(DEFAULT_NOTIFS);
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)));
  };

  const handleSave = async () => {
    // BACKEND INTEGRATION: PUT /api/settings/notifications with notif preferences
    await new Promise((r) => setTimeout(r, 700));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="BellIcon" size={18} className="text-primary" />
          Notification Preferences
        </h2>
        <p className="text-xs text-muted-foreground mb-6">
          Choose how and when you receive alerts about your practice
        </p>

        <div className="space-y-3">
          {notifs.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${notif.enabled ? 'bg-white' : 'bg-muted/20'}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-foreground">{notif.label}</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      notif.channel === 'both'
                        ? 'bg-primary/10 text-primary'
                        : notif.channel === 'email'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {notif.channel === 'both'
                      ? 'Email + SMS'
                      : notif.channel === 'email'
                        ? 'Email'
                        : 'SMS'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{notif.description}</p>
              </div>
              <button
                onClick={() => toggle(notif.id)}
                className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${notif.enabled ? 'bg-secondary' : 'bg-muted-foreground/30'}`}
                aria-label={notif.enabled ? 'Disable notification' : 'Enable notification'}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${notif.enabled ? 'left-6' : 'left-1'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Details for Notifications */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h3 className="text-sm font-bold text-foreground mb-4">Notification Contact Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Notification Email</label>
            <input type="email" defaultValue="dr.mehta@entportal.in" className="input-field" />
          </div>
          <div>
            <label className="label-text">SMS Number</label>
            <input type="tel" defaultValue="+91 98765 43210" className="input-field" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-secondary font-semibold">
            <Icon name="CheckCircleIcon" size={16} />
            Notification preferences saved
          </span>
        )}
        <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
          <Icon name="CheckIcon" size={15} />
          Save Preferences
        </button>
      </div>
    </div>
  );
}
