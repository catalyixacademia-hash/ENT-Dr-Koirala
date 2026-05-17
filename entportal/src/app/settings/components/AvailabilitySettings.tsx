'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
];

const DEFAULT_BLOCKED = ['2026-05-24', '2026-05-25', '2026-06-01'];

export default function AvailabilitySettings() {
  const [enabledSlots, setEnabledSlots] = useState<string[]>(TIME_SLOTS.filter((_, i) => i !== 5 && i !== 11));
  const [blockedDates, setBlockedDates] = useState<string[]>(DEFAULT_BLOCKED);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [slotDuration, setSlotDuration] = useState('20');
  const [saved, setSaved] = useState(false);

  const toggleSlot = (slot: string) => {
    setEnabledSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const addBlockedDate = () => {
    if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
      setBlockedDates((prev) => [...prev, newBlockedDate].sort());
      setNewBlockedDate('');
    }
  };

  const removeBlockedDate = (date: string) => {
    setBlockedDates((prev) => prev.filter((d) => d !== date));
  };

  const handleSave = async () => {
    // BACKEND INTEGRATION: PUT /api/clinic/availability with slots + blocked dates
    await new Promise((r) => setTimeout(r, 700));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Slot Duration */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Icon name="CalendarDaysIcon" size={18} className="text-primary" />
          Appointment Slot Settings
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label className="label-text">Default Slot Duration</label>
            <p className="text-xs text-muted-foreground mb-1.5">Duration for standard appointments</p>
            <select
              value={slotDuration}
              onChange={(e) => setSlotDuration(e.target.value)}
              className="input-field w-auto"
            >
              {['15', '20', '30', '45', '60'].map((d) => (
                <option key={`dur-${d}`} value={d}>{d} minutes</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-xl">
            <Icon name="InformationCircleIcon" size={16} className="text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">Patients will see available slots based on this duration during online booking.</p>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="ClockIcon" size={18} className="text-primary" />
          Available Time Slots
        </h2>
        <p className="text-xs text-muted-foreground mb-5">Click to enable or disable individual time slots for online booking</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {TIME_SLOTS.map((slot) => {
            const isEnabled = enabledSlots.includes(slot);
            return (
              <button
                key={`slot-toggle-${slot}`}
                onClick={() => toggleSlot(slot)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  isEnabled
                    ? 'gradient-primary text-white border-transparent' :'bg-white text-muted-foreground border-border hover:border-primary'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {enabledSlots.length} of {TIME_SLOTS.length} slots enabled
        </p>
      </div>

      {/* Blocked Dates */}
      <div className="bg-white rounded-2xl border card-shadow p-6">
        <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="NoSymbolIcon" size={18} className="text-red-500" />
          Blocked Dates (Leave / Holidays)
        </h2>
        <p className="text-xs text-muted-foreground mb-5">These dates will show as unavailable for online booking</p>

        <div className="flex gap-3 mb-4">
          <input
            type="date"
            value={newBlockedDate}
            onChange={(e) => setNewBlockedDate(e.target.value)}
            className="input-field w-auto"
          />
          <button
            onClick={addBlockedDate}
            disabled={!newBlockedDate}
            className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
          >
            <Icon name="PlusIcon" size={15} />
            Block Date
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {blockedDates.map((date) => (
            <div
              key={`blocked-${date}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-sm"
            >
              <Icon name="CalendarDaysIcon" size={13} className="text-red-500" />
              <span className="text-xs font-semibold text-red-700 font-tabular">{date}</span>
              <button
                onClick={() => removeBlockedDate(date)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <Icon name="XMarkIcon" size={13} />
              </button>
            </div>
          ))}
          {blockedDates.length === 0 && (
            <p className="text-xs text-muted-foreground">No blocked dates — all days are open for booking.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-secondary font-semibold">
            <Icon name="CheckCircleIcon" size={16} />
            Availability saved
          </span>
        )}
        <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
          <Icon name="CheckIcon" size={15} />
          Save Availability
        </button>
      </div>
    </div>
  );
}